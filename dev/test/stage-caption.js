/* review/stage-caption: the stage caption never names a person who is not among the people shown (one presence source = j95 record),
   across goTo and the buổi turn-over (stay line), with and without the Emperor. usage: node dev/test/stage-caption.js <page URL>  → JSON {n,bad:[...],emp:{with,without},errs}; bad must be [] */
const {chromium}=require('./lib/pw-roulette');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:1180,height:820}});p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(1500)}
 const out=await p.evaluate(async()=>{window.__forceOrigin="thd";SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,800));
  const R={n:0,bad:[],emp:{with:0,without:0}};const CLAIM=/tình cờ gặp Hoàng thượng|đang phê tấu chương|cho ngươi vào hầu/;
  const chk=(tag)=>{const V=S.visit;if(!V)return;R.n++;const has=V.people.some(p=>p.kind==="emp");has?R.emp.with++:R.emp.without++;const m=V.msg||"";
   if(CLAIM.test(m)&&!has)R.bad.push(tag+" claims Emperor, not on stage: "+m);
   const c=m.match(/Ở đây có (\d+) người/);if(c&&+c[1]!==V.people.filter(p=>p.kind!=="chest").length)R.bad.push(tag+" count "+c[1]+" vs "+V.people.length)};
  for(let rep=0;rep<14;rep++){try{placeWhere()}catch(e){}
   for(const k of ["vuon","thu","dtd"]){Q.length=0;S.dead=false;S.confined=0;S.place="home";S.visit=null;used=0;S.sung=70;S.suc=100;S.buoi=rep%3;
    try{goTo(k)}catch(e){R.err=String(e);continue}Q.length=0;if(S.place!==k||!S.visit)continue;chk("goTo "+k+" b"+S.buoi);
    /* the buổi turns over while she stays */
    try{const b0=S.buoi;nextBuoi();Q.length=0;if(S.place===k&&S.visit&&S.visit.k===k)chk("stay "+k+" b"+b0+"→"+S.buoi)}catch(e){R.err2=String(e)}}}
  /* force: record says Emperor is elsewhere but the old S.where still says garden */
  try{placeWhere();S.where=S.where||{};S.where.emp="vuon";Q.length=0;S.place="home";S.visit=null;used=0;goTo("vuon");chk("stale-where vuon")}catch(e){R.err3=String(e)}
  return R});
 out.errs=errs;console.log(JSON.stringify(out));await b.close()})();
