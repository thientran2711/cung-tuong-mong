/* robot10 E-FIX-2 r2 proof (E76r FAIL 1: «Sủng −5» flagged vs fx sung −4 when Hoàng thượng is nồng nàn): HER Sủng is drawn and applied through sg()
   (j1: ×1.3 nongnay, ×0.7 on gains with lanhlung). For each trait set (none / nongnay / lanhlung) and each raw Sủng (−4 −2 +2 +5) this builds the option
   the way the game does (dilLineRaw draws fx with the kit), applies the fx with apply() and checks: (a) the line she sees = the real change in S.sung,
   (b) the robot's auditOpt (R10IN= or dev/measure/robot10-in.js) raises NO row, (c) a WRONG line (the raw number typed with a trait on, i.e. not the
   change she gets) IS flagged. usage: node dev/test/r10e-audit-trait.js <save.json>   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const save=process.argv[2];let IN=fs.readFileSync(process.env.R10IN||path.join(__dirname,'../measure/robot10-in.js'),'utf8');
if(!/R\.auditOpt=/.test(IN))IN=IN.replace('R.bug=bug;','R.bug=bug;R.auditOpt=(o,m)=>auditOpt(o,m||{});');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},fs.readFileSync(save,'utf8'));
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 await p.evaluate(()=>{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click()});await p.waitForTimeout(2500);
 await p.evaluate(s=>{window.__r10cfg={};(0,eval)(s)},IN);
 const r=await p.evaluate(()=>{const R=window.__r10,N=()=>R.bugs.reduce((a,x)=>a+x.n,0)/* bug() counts a repeated message in n */,T0=S.emp.traits.slice(),rows=[];const pl=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  for(const tr of [[],["nongnay"],["lanhlung"],["nongnay","lanhlung"]])for(const v of [-4,-2,2,5]){
   S.emp.traits=T0.filter(t=>t!=="nongnay"&&t!=="lanhlung").concat(tr);const o={n:"Thử "+tr.join("+")+" "+v,fx:{sung:v}};
   const line=pl(dilLineRaw(o));const m=line.match(/Sủng\s*([+\-−–])\s*(\d+)/);const shown=m?(m[1]==="+"?1:-1)*+m[2]:null;
   const s0=S.sung=50;apply({sung:v});const real=S.sung-s0;
   const b0=N();R.auditOpt(o,{t:"trait"});const flagged=N()>b0;
   const wrong=sgNow(v)!==v?{n:"Sai "+tr.join("+")+" "+v,fx:{sung:v},x:"Sủng "+(v>0?"+":"−")+Math.abs(v)}:null;let wFlag=null;
   if(wrong){wrong.j67=wrong.x;const b1=N();R.auditOpt(wrong,{t:"trait wrong"});wFlag=N()>b1}
   rows.push({tr:tr.join("+")||"-",v,shown,real,flagged,wrongFlagged:wFlag,line:line.slice(0,60)})}
  S.emp.traits=T0;return rows});
 let fail=0;for(const x of r){const ok=x.shown===x.real&&!x.flagged&&x.wrongFlagged!==false;if(!ok)fail++;console.log((ok?'ok  ':'FAIL')+` trait ${x.tr.padEnd(17)} raw ${String(x.v).padStart(2)} shown ${x.shown} real ${x.real} audit-row ${x.flagged} wrong-line-flagged ${x.wrongFlagged}  «${x.line}»`)}
 console.log(fail?`FAIL ${fail}`:'ALL OK');await b.close();process.exit(fail?1:0)})();
