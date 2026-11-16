/* review/servant-system (LUẬT SỬA CẢ NHÓM): every place her household (trusted maid + S.staff maids / eunuchs) should appear.
   usage: node dev/test/house-scan.js <url>   (run on main's build = before, on the branch build = after). Pictures are not loaded. */
const {chromium}=require('./lib/pw-roulette');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage','--blink-settings=imagesEnabled=false']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(240000);
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<200;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 const r=await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;Q.length=0;
  S.rank=5;S.prSeen={r:5,s:null};S.bac=300;fillStaff(S,true);S.buoi=0;used=0;goTo("home");render();const R={};const N=S.staff.length;const names=S.staff.map(s=>s.name);
  const serv=L=>L.filter(p=>p&&(p.kind==="serv"||p.kind==="hsv")).length;
  R.household=`trusted maid + ${N} (${S.staff.filter(s=>s.role==="maid").length} maids, ${S.staff.filter(s=>s.role==="eunuch").length} eunuchs)`;
  R.roomStage=`${curPeople().some(p=>p.kind==="maid")?"maid":"no maid"} + ${serv(curPeople())}/${N} servants`;
  R.headCount=`${typeof kitHereCount==="function"?kitHereCount():"?"} (Dư đồ ${countAt("home")})`;
  const i=curPeople().findIndex(p=>p.kind==="serv");R.servantCardActs=i<0?"no card (not on stage)":talkOpts(curPeople()[i]).map(a=>a.n).join(", ");
  R.maidCardActs=talkOpts(curPeople().find(p=>p.kind==="maid")).map(a=>a.n).join(", ");
  {popIdx=curPeople().findIndex(p=>p.kind==="maid");const j=talkOpts(curPeople()[popIdx]).findIndex(a=>a.n==="Sai đi dò la");const u0=used;talk(j);const m=Q[Q.length-1];const go=m&&m.opts&&m.opts[0];if(go&&go.go)go.go();Q.length=0;R.maidSpyKhac=`paid ${used-u0} (card says 2)`;
   used=1;S.payOnPick=0;S.visit.tk={};talk(j);const m2=Q[Q.length-1];const no=m2&&m2.opts&&m2.opts[m2.opts.length-1];if(no&&no.go)no.go();Q.length=0;R.maidSpyCancel=`khắc used 1 → open + "Thôi" → ${used} (1 = honest, less = free khắc)`;popIdx=null;used=0}
  tab="staff";let h="";try{h=staffTabHTML()}catch(e){}R.cungNhanTab=`${names.filter(n=>h.includes(typeof shortN==="function"?shortN(n):n)).length}/${N} names in the tab`;
  try{const g=giftPeople({wk:{}}).filter(x=>x[0]==="cn");R.giftRecipients=`${g.length} (${g.map(x=>x[3]).join("; ")})`}catch(e){R.giftRecipients="err"}
  R.servEvents=`sv6 draws from ${(S.staff||[]).length} servants, trusted maid ${"excluded"}`;
  const v=liveRivals(true).find(x=>(x.staff||[]).length&&!sameHouse(S,x));if(v){const W=S.where||(S.where={});W[v.id]="r"+v.id;used=0;try{goTo("r"+v.id)}catch(e){}R.npcPalaceVisit=S.visit.k!=="r"+v.id?"no stage opened in this probe; code: goTo (j2) never adds the host's servants":`${v.name}: ${curPeople().filter(p=>p.ref&&v.staff.includes(p.ref)).length}/${v.staff.length} of her servants on the stage`;goTo("home")}
  /* lãnh cung: one loyal servant stays */
  if(S.staff[0])S.staff[0].loyal=90;cold("Thử");Q.length=0;R.coldStage=`${S.staff.length} servant(s) stayed, ${serv(curPeople())} on the stage`;
  return R});
 console.log(JSON.stringify({r,errs:errs.slice(0,4)},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
