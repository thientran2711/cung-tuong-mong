/* auto-pick check: when a painted state file is added to KPM_DATA.have, kpmArt() must choose it (festival x buổi, mourning). usage: node dev/test/pl-courtyards-autopick.js <url> <WxH@dpr> <outdir> <tag> */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,TAG,FULL]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200)});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&!!rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.pal=null;S.place='home';used=0;tab='go';window.__mapZ=1;render();setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50)});

 const R=await p.evaluate(()=>{const out=[];const slot="p:home";const dir="nhat-cac";const H=KPM_DATA.have[dir];
  const set=(m,t,bu)=>{S.month=m;S.tuan=t;S.buoi=bu};const st=()=>{const A=kpmArt(slot);return A&&A.src.replace(/^.*img\/pl2\//,'')};
  set(7,1,3);out.push(["vulan toi before",st()]);H.push("vulan-toi");out.push(["vulan toi after (expect nhat-cac-vulan-toi.webp)",st()]);
  set(3,0,1);out.push(["thanhminh trua before",st()]);H.push("thanhminh-trua");out.push(["thanhminh trua after",st()]);
  set(2,1,0);const old=S.wdTang,t0=S.turn;out.push(["plain day",st()]);S.wdTang=(S.turn||0)+3;out.push(["mourning, no tang file (expect season)",st()]);H.push("tang-sang");out.push(["mourning, tang-sang painted (expect tang-sang)",st()]);
  set(1,0,0);out.push(["mourning wins over newyear sang",st()]);S.wdTang=old;out.push(["mourning off, newyear sang",st()]);return out});
 console.log(JSON.stringify({R,errs}));await b.close()})();
