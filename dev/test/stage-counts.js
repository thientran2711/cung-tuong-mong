/* review/stage-slots: the Dư đồ count of a place (countAt, "N bóng") must equal the people she meets there (kitHereCount, the stage
   title "Ở đây còn N người", the page chips). Walks every place for 12 reshuffles (placeWhere) on the consort road and the maid road (cnv).
   usage: node dev/test/stage-counts.js <page URL>   → JSON {thd:{n,mism}, cnv:{n,mism}, errs} ; mism must be {}
   LEDCNT=arrive|now sets BAL.led.cnt (people ledger switch, QUESTION FOR MAIN in review-people-ledger): this test's reading ("the map number
   = the people met on arrival") holds with "arrive"; with "now" (owner 13:50Z one-moment counts) only the walk's khắc shift differs */
const {chromium}=require('./lib/pw-roulette');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const out={};const errs=[];
 for(const o of ["thd","cnv"]){const p=await b.newPage({viewport:{width:1180,height:820}});p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
  for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
  await sleep(1500);
  out[o]=await p.evaluate(async([o,LC])=>{window.__forceOrigin=o;if(LC&&typeof BAL!=="undefined"&&BAL.led)BAL.led.cnt=LC;SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render();
   await new Promise(r=>setTimeout(r,800));const R={n:0,mism:{}};const ks=()=>["home",...places().map(p=>p.k)];
   for(let rep=0;rep<12;rep++){try{placeWhere()}catch(e){}
    for(const k of ks()){Q.length=0;S.dead=false;S.confined=0;S.place=k==="home"?"vuon":"home";S.visit=null;used=0;S.sung=60;S.suc=100;
     const pre=countAt(k);try{goTo(k)}catch(e){R.err=String(e);continue}Q.length=0;if(S.place!==k||!S.visit)continue;
     const got=kitHereCount();R.n++;if(pre!==got){const key=k;R.mism[key]=R.mism[key]||[];if(R.mism[key].length<3)R.mism[key].push(pre+"→"+got+" "+S.visit.people.map(p=>p.kind+(p.sk?":"+p.sk:"")).join(","))}}}
   return R},[o,process.env.LEDCNT||""]);await p.close()}
 out.errs=errs;console.log(JSON.stringify(out));await b.close()})();
