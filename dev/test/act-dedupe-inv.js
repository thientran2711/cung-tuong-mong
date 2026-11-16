/* ACT DEDUPE INVENTORY: render every act deck (no taps) in several game states and dump name, rows (Tốn/Được/Mất/Kèm), home surface.
   usage: node dev/test/act-dedupe-inv.js <url> <out.json> [W]x[H]@dpr   (reuses the LIB of act-audit.js) */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [,,URL,OUT,SZ]=process.argv;const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');await p.waitForTimeout(1500);
 await p.evaluate(LIB);const res=[];
 for(const sc of ['dau','toi','cao','con','hau','hh']){await p.evaluate(n=>AA.scen(n),sc);const SF=await p.evaluate(()=>AA.surfaces());
  for(const sf of SF){let subs=[sf];if(sf.place){const n=await p.evaluate(s=>{AA.restore();AA.show(s);return S.visit&&S.visit.people?S.visit.people.length:0},sf);subs=[];for(let i=0;i<n;i++)subs.push(Object.assign({},sf,{pop:i,id:sf.id+"#"+i}))}
   for(const s2 of subs){
    /* each period of the day: sáng / chiều / tối change the deck */
    for(const buoi of [0,1,2]){
    const r=await p.evaluate(([s,bu])=>{AA.restore();S.buoi=Math.min(bu,BUOI.length-1);AA.show(s);const P=s.pop!=null&&S.visit&&S.visit.people[s.pop];
      const hz=[...document.querySelectorAll("#panel .kcattabs button,#panel .pctabs button")].map(e=>e.innerText.replace(/\s+/g," ").trim());
      return{who:P?(P.name||P.kind):"",hz,c:AA.btns(s).map(AA.rowsOf)}},[s2,buoi]);
    for(const c of r.c)res.push({sc,sf:s2.id,buoi,who:r.who,name:c.name,why:c.why,ton:c.ton,duoc:c.duoc,mat:c.mat,kem:c.kem,odds:c.odds,dis:c.dis,text:c.text});
    }
   }
  }
 }
 fs.writeFileSync(OUT,JSON.stringify({res,perr}));console.log('rows',res.length,'errs',perr.length);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
