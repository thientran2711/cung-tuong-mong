/* map-here-scan (map-fix-2, law 11 whole group): HER PLACE on the Dư đồ plan, every rank x {at home, away at Ngự hoa viên} x size.
   Exactly ONE plan spot is «her place» (.mspot.here) and it carries the ONE «ta ở đây» marker (.kmmapmk); on a portrait page (kv1) it is inside the open view.
   Her place = mapHereK (jres): at home while housed in a chủ vị's phối điện (below Tần, OD 17/11 04:08Z) = that chủ vị's palace spot; otherwise S.place.
   usage: node dev/test/map-here-scan.js <page URL> [WxH,..] [ranks default 0,1,2,3,4,5,6,7] ; exit 1 on any FAIL */
const {chromium}=require('playwright');const [,,URL,SIZES,RK]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;const rows=[];
 for(const sz of (SIZES||'755x1000,1180x820,390x844').split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#krottip,#klife,#kload{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)try{nlNew()}catch(e){}start();return s});if(!s)break}
  for(const rk of (RK||'0,1,2,3,4,5,6,7').split(',').map(Number))for(const at of ['home','vuon']){
   await p.evaluate(([rk,at])=>{S.rank=Math.min(rk,RANKS.length-1);try{palFix()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;S.out=0;S.confined=0;S.place=at;S.visit={k:at,people:[],talked:false,tk:{}};window.__mapZ=0;tab='go';render()},[rk,at]);
   await sleep(1800);
   const r=await p.evaluate(()=>{const sc=document.querySelector('.game.maptab .mapsc');if(!sc)return{nomap:1};const sr=sc.getBoundingClientRect();const H=[...document.querySelectorAll('.mapw .mspot.here')];
    const want=typeof mapHereK==='function'?mapHereK():S.place;const h=H[0],hr=h&&h.getBoundingClientRect();const housed=typeof resMeHoused==='function'&&!!resMeHoused();
    return{rank:RANKS[S.rank].n,at:S.place,housed,want,here:H.map(e=>e.dataset.go||e.dataset.ak),mk:document.querySelectorAll('.mapw .kmmapmk').length,mkIn:!!(h&&h.querySelector('.kmmapmk')),one:kitView().pages===1,in:!!hr&&hr.left>=sr.left-1&&hr.right<=sr.right+1}});
   const ok=!r.nomap&&r.here.length===1&&r.here[0]===r.want&&r.mk===1&&r.mkIn&&(!r.one||r.in);if(!ok)bad++;
   rows.push([sz,r.rank,r.at,r.housed?'housed':'own',r.want,r.here.join('+')||'-',r.mk,r.one?(r.in?'in view':'OUT'):'whole map',ok?'PASS':'FAIL'])}
  if(errs.length){bad++;rows.push([sz,'page errors',errs.slice(0,3).join('|')])}await ctx.close()}
 console.log('| size | rank | at | housing | her spot | .here | markers | view | result |\n|---|---|---|---|---|---|---|---|---|');for(const r of rows)console.log('| '+r.join(' | ')+' |');
 await b.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})();
