/* ACT-MOVE batch 2 inventory: every button on the Hậu cung › Cung nhân / Nam nhân cards, the Hoàng tự cards and the lãnh cung (out) consort cards,
   over scenarios cao / con / hh. usage: node dev/test/act-move-inv2.js [index.html] → prints "tab | card rank | button label | data attrs" lines. */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');const {chromium}=require('playwright');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL='file://'+path.resolve(process.argv[2]||path.join(ROOT,'dev/index.html'));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);await p.evaluate(LIB);
 const out=new Set();
 for(const sc of ['cao','con','hh']){const L=await p.evaluate(sc=>{AA.scen(sc);if(sc==="hh"){const v=rivals.find(x=>x.alive&&!x.queen);if(v){v.out=1}}try{menInit();for(const m of S.men||[])S.menMet&&(S.menMet[m.id]=1)}catch(e){}
   const R=[];const T=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();const P0=pcard;let cur="";
   pcard=function(o){const h=P0.apply(this,arguments);try{const d=document.createElement("div");d.innerHTML=h;for(const bt of d.querySelectorAll("button")){if(bt.classList.contains("pct"))continue;const a=[...bt.attributes].filter(x=>/^data-/.test(x.name)).map(x=>x.name+"="+x.value).join(" ");if(/data-(pg|pgo|pager)=/.test(a))continue;R.push([cur,T(o.rank).slice(0,30),T(bt.childNodes[0]&&bt.childNodes[0].textContent||bt.textContent).slice(0,40),a.replace(/="?\d+"?/g,"=#").slice(0,80)].join(" | "))}}catch(e){}return h};
   try{for(const t of ["staff","men","kid","rv"]){cur=t;tab=t;for(let i=0;i<60;i++){for(const k in PG)PG[k]=i;try{render()}catch(e){R.push(t+" ERR "+e.message)}}}
    /* Hoàng tự sub-tabs (jht) */for(const k of Object.keys(window.__hts||{}))0;}finally{pcard=P0}return R},sc);L.forEach(x=>out.add(sc+" | "+x))}
 [...out].sort().forEach(x=>console.log(x));console.log("perr",perr.length,perr.slice(0,3).join(" / "));await b.close()})();
