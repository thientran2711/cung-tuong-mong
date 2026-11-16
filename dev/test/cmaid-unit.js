/* review/close-maid (D58): unit checks of the close maid by origin + 2 screenshots (the pick card, her stage card).
   usage: node dev/test/cmaid-unit.js <url> <outdir> [WxH@dpr]. Prints JSON {checks}; exit 1 if a check fails or a page error. */
const {chromium}=require('playwright');const [,,URL,OUT,VP='755x1000@2']=process.argv;const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(300000);await p.goto(URL,{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]')||document.querySelector('#kload [data-kl="skip"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(800);
 const C=await p.evaluate(()=>{const C={};const go=o=>{window.__forceOrigin=o;SLOT=3;quiet=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true};
  const forceRoll=(v,f)=>{const r0=roll;roll=()=>v;try{return f()}finally{roll=r0}};
  /* 1 thd: a pick card with BAL.cmaid.pickN options; picking sets the maid */
  go('thd');const q=Q.find(x=>x.pid==="cmPick");C.pickCard=!!q&&q.opts.length===BAL.cmaid.pickN;if(q){const o=q.opts[1];o.go();C.picked=S.maid.src==="pick"&&o.n.includes(S.maid.name)&&!!S.maid.tal&&!!S.maid.sec}
  /* 2 tt: a home maid with loyalty in range; the Nhập cung row names the source */
  go('tt');const L=BAL.cmaid.loy.home;C.ttHome=S.maid.src==="home"&&S.maid.loyal>=L[0]&&S.maid.loyal<=L[1];C.ttRow=cmRow().includes("từ nhà");C.thdRow=(()=>{go('thd');const n=Q.find(x=>x.t==="Nhập cung");return !!n&&/Chưa có ai theo từ nhà/.test(n.h)})();
  /* 2b (r1) her maid's state must not touch S.cm (jcmood court mood): a new life, then the court-mood month runs */
  go('tt');C.moodKey=(()=>{try{cmMonth();return !!(S.cm&&S.cm.th&&S.cm.hh)&&!!S.cmaid}catch(e){return false}})();
  /* 3 old save: no S.cmaid, maid without src → kept, loyalty kept */
  go('dtq');delete S.cmaid;S.maid={name:"Tiểu Đào",loyal:57,fc:""};render=()=>{};servMonth();C.oldSave=S.maid.name==="Tiểu Đào"&&S.maid.loyal>=55&&S.maid.src==="home";
  /* 4 dtq guard: an NPC's hit on her household is stopped */
  go('dtq');for(let i=0;i<2;i++){const s=mkServ('maid');S.staff.push(s)}const v=liveRivals(true).find(x=>x!==S);const pt0=pickTarget;pickTarget=()=>S;
  const g=forceRoll(true,()=>mlHit(v));pickTarget=pt0;C.dtqGuard=/chắn trước/.test(g);
  /* 5 ch: a wrong she does → Thái hậu thiện cảm − */
  go('ch');const th0=S.th;forceRoll(true,()=>deedAdd(S,"poison",v));C.chKnow=S.th===th0-BAL.cmaid.chThDown;
  /* 6 muoi: part of the bribe comes back */
  go('muoi');const w=liveRivals(true).find(x=>x!==S&&(x.staff||[]).length);let back=false;if(w){const s=w.staff[0];const b0=S.bac;bribeServ(S,s);const paid=b0-S.bac;back=paid>0&&paid<30}C.muoiBack=back;
  /* 7 td: the old family servant: loyalty 100, chứng cứ vụ án +tdCase, old maid moves to her staff */
  go('td');const n0=(S.staff||[]).length,ce=S.caseEv||0;cmTdTake();C.tdOld=S.maid.src==="old"&&S.maid.loyal===100&&S.caseEv===ce+BAL.cmaid.tdCase&&S.staff.length===n0+1;
  /* 8 land: cannot be bought (maidMonthP with low loyalty) */
  go('nc');S.maid.loyal=10;const mm=S.maid;forceRoll(true,()=>maidMonthP(S));C.landNoBuy=S.maid===mm;
  /* 9 cn: a turned roommate costs Danh */
  go('cn');S.maid.loyal=10;S.maid.tal="theu"/* not kín miệng (forced rolls would make her refuse the buyer) */;S.schemes=0;const d0=S.danh;const r=forceRoll(true,()=>maidMonthP(S));C.cnTurn=S.danh<=d0-BAL.cmaid.cnTurn&&/chuyện cũ/.test(r);
  /* 10 cnv: rises → pick card */
  go('cnv');S.cmaid={v:1};const isS=isSrv;isSrv=()=>false;S.maid=newMaid("Ngọc Lan",50);Q.length=0;cmMonthMe();isSrv=isS;C.cnvPick=Q.some(x=>x.pid==="cmPick");
  /* 11 secret dilemma builds for each kind */
  go('tt');C.secCards=["debt","family","spy"].every(k=>{S.maid.sec={k,by:v.id};const d=mkP("cmSec",{});return d&&d.o.length===2});
  return C});
 /* screenshots: the pick card, then her home stage card */
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;quiet=false;window.__nlInner=1;start();window.__nlInner=0;document.getElementById('title').hidden=true;Q.splice(0,Q.length,...Q.filter(x=>x.pid==="cmPick"));render();showModal();try{const k=document.getElementById('kload');if(k)k.remove()}catch(e){}});await sleep(1500);
 const ovf1=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);await p.screenshot({path:`${OUT}/cmaid-pick-${m[1]}x${m[2]}.jpg`,type:'jpeg',quality:70});
 await p.evaluate(()=>{const q=Q[0];if(q&&q.opts)q.opts[0].go();Q.length=0;showModal();render()});await sleep(600);
 const info=await p.evaluate(()=>{try{return homePeople()[0].info}catch(e){return String(e)}});
 await p.screenshot({path:`${OUT}/cmaid-home-${m[1]}x${m[2]}.jpg`,type:'jpeg',quality:70});
 const ok=Object.values(C).every(x=>x===true)&&!ovf1&&!errs.length;console.log(JSON.stringify({C,ovf1,info,errs:errs.slice(0,6),ok}));await b.close();process.exit(ok?0:1)})().catch(e=>{console.error(e);process.exit(1)});
