/* ACT DEDUPE: union of the Hành sự deck over many deals (seeds x buổi x states) + every Tài nghệ sub-tab, as card names + rows.
   usage: node dev/test/act-dedupe-deck.js <url> <out.json> [W]x[H]@dpr */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [,,URL,OUT,SZ]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);const res=[];
 for(const sc of ['dau','cao','con','hau','hh']){await p.evaluate(n=>AA.scen(n),sc);
  const r=await p.evaluate(()=>{const out=[];
   for(let seed=1;seed<=24;seed++)for(const bu of [0,1,2]){AA.restore(seed);S.buoi=Math.min(bu,BUOI.length-1);try{deal()}catch(e){}tab="act";AA.show({tab:"act"});
     const cats=[...document.querySelectorAll("#panel .kcattabs [data-kcat],#panel .kcattabs button")];
     const grab=()=>AA.btns({tab:"act"}).map(AA.rowsOf);
     let seen=new Set();for(const c of grab())if(!seen.has(c.name)){seen.add(c.name);out.push({where:"act",...c})}
     for(const c of cats){try{c.click()}catch(e){};for(const x of grab())if(!seen.has(x.name)){seen.add(x.name);out.push({where:"act",...x})}}}
   for(const sub of ["duc","cktt","nc","wk"]){AA.restore();KTSUB.art=sub;AA.show({tab:"art"});for(const c of AA.btns({tab:"art"}).map(AA.rowsOf))out.push({where:"art:"+sub,...c})}
   return out},);
  for(const c of r)res.push({sc,...c});console.error(sc,r.length)}
 fs.writeFileSync(OUT,JSON.stringify({res,perr}));console.log('rows',res.length,'errs',perr.length);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
