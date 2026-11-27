/* review/men-forbidden (owner OD:L168 + 18/11 ~02:20Z): no outside man stands in the hậu cung (jmen menZone "hc") unless he has a lawful
   reason there (thái y summoned, craftsman's work order, a prince's visit to Thái hậu) or he is a STRAY (then the 'Nam nhân nơi cấm địa' card fires);
   officials (kind "min") never stand in the hậu cung; no woman of the harem stands in the outer court ("ngt").
   Scans 2 game years x 3 tuần x 4 buổi (festival days included) on the schedule (S.menW / S.minW / S.where) AND on the stage (goTo each hc place).
   usage: node dev/test/men-forbidden.js <page URL>  → JSON {checked, bad:[...], table}; bad must be [] */
const {chromium}=require('playwright');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:1180,height:820}});await require('./lib/veil').guard(p);p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(600000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<20;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(1500)}
 const out=await p.evaluate(async()=>{window.__bot=1;window.__forceOrigin="thd";SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,800));
  const LAWFUL={summons:1,order:1,stray:1};const R={checked:0,stage:0,bad:[],table:{}};const T=R.table;const bump=k=>T[k]=(T[k]||0)+1;
  const y0=S.year;for(let n=0;n<72;n++){S.year=y0+Math.floor(n/36);S.month=1+Math.floor((n%36)/3);S.tuan=n%3;
   for(let bu=0;bu<4;bu++){Q.length=0;S.dead=false;S.confined=0;S.place="home";S.visit=null;used=0;S.buoi=bu;try{placeWhere()}catch(e){R.err=String(e);continue}Q.length=0;
    const f=(typeof festToday==="function"&&festToday())||null,tag=`${S.month}/${S.tuan} b${bu}${f?" "+f.k:""}`;R.checked++;
    for(const m of S.men||[]){const k=(S.menW||{})[m.id];if(!k||menZone(k)!=="hc")continue;const y=(S.menWhy||{})[m.id]||{};const ok=LAWFUL[y.w]||(y.w==="visit"&&k==="tn");bump(`man ${m.rw} @hc:${k} why=${y.w||"?"}${ok?"":" BAD"}`);
     if(!ok)R.bad.push(`${tag}: ${m.rw} at ${k} (${y.w||"no reason"})`)}
    for(const c in (S.minW||{})){const k=S.minW[c];bump(`official @${menZone(k)}:${k}${menZone(k)==="hc"?" BAD":""}`);if(menZone(k)==="hc")R.bad.push(`${tag}: official ${c} at ${k}`)}
    for(const v of rivals){if(!v.alive)continue;const k=(S.where||{})[v.id];if(k&&menZone(k)==="nt"){bump("consort @nt BAD");R.bad.push(`${tag}: consort ${v.name} in outer court`)}}
    /* the stage: walk into the hậu cung places that hold a man or an official; every non-stray man on stage must be lawful there */
    const hc=new Set();for(const id in (S.menW||{}))if(menZone(S.menW[id])==="hc")hc.add(S.menW[id]);for(const c in (S.minW||{}))if(menZone(S.minW[c])==="hc")hc.add(S.minW[c]);
    for(const k of hc){if(!placeOf(k)||k==="home")continue;Q.length=0;S.place="home";S.visit=null;used=0;S.sung=70;S.suc=100;try{goTo(k)}catch(e){continue}const card=Q.length>0;Q.length=0;if(S.place!==k||!S.visit)continue;R.stage++;
     for(const q of S.visit.people||[]){if(q.kind==="min"){bump("stage official @hc BAD");R.bad.push(`${tag}: stage ${k} shows official ${q.info||""}`)}
      if(q.kind==="man"&&q.ref){const y=(S.menWhy||{})[q.ref.id]||{};const ok=(y.w==="stray"&&card)||y.w==="summons"||y.w==="order"||(y.w==="visit"&&k==="tn")||y.w==="stray";bump(`stage man ${q.ref.rw} @${k} why=${y.w||"?"}${ok?"":" BAD"}`);
       if(!ok)R.bad.push(`${tag}: stage ${k} shows ${q.ref.rw} (${y.w||"no reason"})`)}}}}}
  /* (b) a stray: a planned man in Ngự hoa viên at night must fire the 'Nam nhân nơi cấm địa' card, never stand there as a plain greetable person */
  try{const m=(S.men||[]).find(x=>x.rw==="thị vệ"&&x.alive)||S.men[0];m.ban=0;S.buoi=B4L;Q.length=0;S.place="home";S.visit=null;used=0;placeWhere();
   S.menPlans=(S.menPlans||[]).filter(P=>P.w!==wk());S.menPlans.push({id:9999,m:m.id,v:null,r:"seek",w:wk(),b:B4L,h:1,k:"vuon",from:"thu",hide:0});S.menW[m.id]="vuon";S.menWhy[m.id]={w:"stray",k:"vuon",r:"seek",h:1,hide:0};S.menMet={};
   goTo("vuon");const card=Q.length>0||!!document.querySelector('.kmodal,#modal:not([hidden]),.modal.show');R.stray={card,q:Q.map(x=>x&&(x.t||x.ev||x.id)||"?").slice(0,3)};if(!card)R.bad.push("stray in vuon at night: no card");Q.length=0}catch(e){R.bad.push("stray test: "+e.message)}
  return R});
 out.errs=errs.slice(0,5);console.log(JSON.stringify(out,null,1));await b.close();process.exit(out.bad.length||out.errs.length?1:0)})();
