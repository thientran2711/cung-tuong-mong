/* krx-diff (review boot-flash r1): kRx old-Safari emulation (kRxEmu, j0) must give the SAME results as native lookbehind.
   1) every pattern the game builds through kRx (logged at boot) x a corpus of game strings (string literals of dev/build/*.js + synthetic
      edge cases): replace("[$&]"), replace(fn with groups), split, test, match — native RegExp vs kRxEmu, in one Chromium page;
   2) VP.fix over the corpus in a native boot vs an "old Safari" boot (RegExp throws on lookbehind).
   usage: node dev/test/krx-diff.js <baseURL>   (exit 1 on any difference) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');let acorn;try{acorn=require('acorn')}catch(e){acorn=require('/opt/node-tools/node_modules/acorn')}
const BASE=process.argv[2];const B=path.join(__dirname,'../build');
const set=new Set();
for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f))){let toks;try{toks=[...acorn.tokenizer(fs.readFileSync(B+'/'+f,'utf8'),{ecmaVersion:'latest'})]}catch(e){continue}
 for(const t of toks){if((t.type.label==='string'||t.type.label==='template')&&typeof t.value==='string'){const v=t.value;if(v.length>=3&&v.length<=600&&/[À-ỹ]/.test(v))set.add(v)}}}
const SYN=["Nàng quý ngươi hơn","Ngươi quý nàng 12","thân +5","thân −3","Bồ tát phù hộ","bị tát một cái","Tát nàng","bồ tát","vờ nhận lỗi","vờ nhận quà","nhận quà","Nhận","đã đốt thư","đốt thư","Thư.. rồi...","a. b. c","Ô 3 trống","Ô 12","Trang điểm 5 điểm","điểm tâm","“ngươi đi” ngươi về","ngươi","Ngươi.","Nàng oán ta","nàng ta ghen +2","Nàng ta oán ta","Thiện cảm 5","thiện cảm: 3","Ta → Lan Phi: thiện cảm +3","Hoàng hậu → ta: thiện cảm −2","nàng → ta","độc dược","hại người","Xuất bản điểm","Kết điểm","cần Chủ tin","Lòng +3","Hắn với ngươi -3","x.</span> y</b> z. w","Câu một. Câu hai! Câu ba? “Câu bốn.” (Năm.)","","   "," nhận","vờ nhận","ngươi ngươi ngươi","NGƯƠI","Ngươi quý nàng ta 3","nàng quý ta: 5"];
const CORPUS=[...SYN,...set];
/* kRx("…","…") literals in the source too (some are built only when a feature runs, not at boot) */
const LIT=[];for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f))){const t=fs.readFileSync(B+'/'+f,'utf8');for(const m of t.matchAll(/kRx\(("(?:[^"\\]|\\.)*"),"([a-z]*)"\)/g)){try{LIT.push([JSON.parse(m[1]),m[2]])}catch(e){}}}
console.log("kRx literals in source",LIT.length);
console.log("corpus",CORPUS.length);
(async()=>{const b=await chromium.launch();let fails=0;
 async function page(old,log){const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  if(old)await p.addInitScript(()=>{const N=RegExp;const W=function RegExp(p,f){const s=p instanceof N?p.source:String(p);if(/\(\?<[=!]/.test(s))throw new SyntaxError("lookbehind");return new N(p,f)};W.prototype=N.prototype;Object.setPrototypeOf(W,N);window.RegExp=W});
  if(log)await p.route(/\/(index\.html)?(\?.*)?$/,async r=>{const resp=await r.fetch();const t=(await resp.text()).replace("function kRx(src,flags){","function kRx(src,flags){(window.__KRXL=window.__KRXL||[]).push([src,flags||\"\"]);");await r.fulfill({response:resp,body:t})});
  await p.goto(BASE+"?khost=0",{timeout:180000});await p.waitForFunction(()=>window.__ctmBuilt&&window.VP,null,{timeout:180000});return {ctx,p,errs}}
 /* 1: pattern-level */
 const A=await page(false,true);
 const r1=await A.p.evaluate(([C,LIT])=>{const L=(window.__KRXL||[]).concat(LIT);const seen=new Set(),out={n:0,checks:0,diffs:[]};
  for(const [src,fl] of L){const k=src+"/"+fl;if(seen.has(k))continue;seen.add(k);out.n++;const N=()=>new RegExp(src,fl),E=()=>kRxEmu(src,fl);
   for(const s of C){const ops={rep:x=>s.replace(x(),"[$&]"),repg:x=>s.replace(x(),"<$1|$2>"),fn:x=>s.replace(x(),(...a)=>"{"+a.slice(0,-2).map(v=>v==null?"~":v).join(",")+"@"+a[a.length-2]+"}"),
     split:x=>JSON.stringify(s.split(x())),test:x=>String(x().test(s)),match:x=>JSON.stringify(s.match(x())&&[...s.match(x())]),exec2:x=>{const r=x();const a=r.exec(s),c=r.exec(s);return JSON.stringify([a&&[a.index,...a],c&&[c.index,...c],r.lastIndex])}};
    for(const [o,f] of Object.entries(ops)){let a,b;try{a=f(N)}catch(e){a="ERR "+e.message}try{b=f(E)}catch(e){b="ERR "+e.message}out.checks++;if(a!==b&&out.diffs.length<40)out.diffs.push({src,fl,o,s:s.slice(0,120),nat:String(a).slice(0,200),emu:String(b).slice(0,200)})}}}
  return out},[CORPUS,LIT]);
 console.log("kRx patterns",r1.n,"checks",r1.checks,"diffs",r1.diffs.length);for(const d of r1.diffs)console.log(" DIFF",JSON.stringify(d));if(r1.diffs.length)fails++;
 const fixN=await A.p.evaluate(C=>C.map(s=>{try{return VP.fix(s)}catch(e){return "ERR"}}),CORPUS);await A.ctx.close();
 /* 2: whole VP.fix native vs old-Safari boot */
 const O=await page(true,false);const fixO=await O.p.evaluate(C=>C.map(s=>{try{return VP.fix(s)}catch(e){return "ERR"}}),CORPUS);
 const lb=await O.p.evaluate(()=>KRX_LB);await O.ctx.close();
 const dd=CORPUS.map((s,i)=>fixN[i]===fixO[i]?null:[s,fixN[i],fixO[i]]).filter(Boolean);
 console.log("VP.fix native vs old-Safari (KRX_LB="+lb+"):",CORPUS.length,"texts, diffs",dd.length,"page errors",O.errs.length,A.errs.length);for(const d of dd.slice(0,30))console.log(" FIXDIFF",JSON.stringify(d));
 if(dd.length||lb!==false||O.errs.length)fails++;
 await b.close();console.log(fails?"FAIL":"PASS");process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(1)});
