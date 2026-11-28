// review/rank-pace test (MAIN 171 / Foreman D JOB 3): the exam window cannot be missed — WHOLE FAMILY of window openers.
// (0) static scan: every exam window opener in dev/build (a write «w1=w+BAL.ex.win») must call exAsk in the same statement (that line or the next) → table;
// runtime, on the built page: every way her window opens puts the ONE kit event card «Thi ngay / Để sau» in front of her:
//   (1) ordinary window (kỳ open) · (2) son grace (pbGrant "m") · (3) daughter grace ("f") · (4) Hoàng hậu special exam ("hh") ·
//   (5) serving-maid window (exSrvOpen) · (6) the last-tuần reminder (once) · (7) «Để sau» keeps the card in Hành sự ·
//   (8) «Thi ngay» runs the exam (auto) and spends the card's Sức · (9) a window never sat waits BAL.ex.cdLapse months (a fail keeps exCd) ·
//   (10) BAL.ex.win is the window length · (11) old save with a lapsed / open window (no e.rem) loads and ticks without error ·
//   (12) no «%» and the odds word is one of the 7 KIT_ODDS words (law 7).
// usage: node dev/test/rank-pace.js [dev/index.html]
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const HTML=process.argv[2]||'dev/index.html';let fail=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fail++};
/* (0) static scan */
{const dir=path.join(__dirname,'..','build');const rows=[];
 for(const f of fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){const L=fs.readFileSync(path.join(dir,f),'utf8').split('\n');L.forEach((l,i)=>{if(/w1\s*=\s*w\s*\+\s*BAL\.ex\.win/.test(l))rows.push({f,l:i+1,ask:/exAsk\(/.test(L.slice(i,i+2).join(' '))})})}
 console.log('opener scan:');for(const r of rows)console.log(`  ${r.f}:${r.l}  exAsk ${r.ask?'yes':'NO'}`);
 ok(rows.length>=2&&rows.every(r=>r.ask),`(0) every exam window opener calls exAsk (${rows.length} sites)`)}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const out={};localStorage.clear();document.getElementById('title').hidden=true;
  const fresh=()=>{window.__nlInner=1;for(let i=0;i<60;i++){start();if(!isSrv())break}window.__nlInner=0;Q.length=0;used=0;
   S.sung=90;S.danh=90;S.duc=90;S.th=60;S.hh=60;S.lastPromo=-99;S.rank=0;S.suc=90;S.confined=0;S.ex=null};
  const kyOpen=window.pbKyAt;const card=()=>Q.find(m=>m&&m.exAsk);const deckHas=()=>deck.some(a=>a&&a.exam===1);
  const words=new Set(KIT_ODDS);const wordOk=m=>m&&m.opts.every(o=>!/%/.test(o.x||'')&&!/%/.test(m.h||''))&&words.has((m.opts[0].x.split(' · ')[0]||'').trim());
  /* (1) ordinary window: the kỳ is open */
  fresh();window.pbKyAt=()=>"newyear";exTick();let m=card();out.ord={t:m&&m.t,n:m&&m.opts.map(o=>o.n),w:wordOk(m),win:S.ex&&S.ex.w1-S.ex.w0+1,deck:deckHas()};
  /* (7) «Để sau» keeps the card */
  if(m){chooseM(m.opts.findIndex(o=>o.n==="Để sau"))}out.later={q:!!card(),deck:deckHas(),w1:S.ex.w1};
  /* (6) last-tuần reminder: jump to the window's last tuần */
  {const e=S.ex;window.wk0=wk;const W=e.w1;wk=()=>W;Q.length=0;exTick();const m2=card();exTick();out.rem={t:m2&&m2.t,once:Q.filter(x=>x&&x.exAsk).length===1};Q.length=0;
   /* (9) lapse: past the window, never sat */
   wk=()=>W+1;const t0=S.turn;const want=Math.max(BAL.ex.cdLapse,typeof pbCdKy==="function"?(pbCdKy()||0):0);exTick();out.lapse={cd:S.ex.cd-t0,want,lapse:S.ex.lapse,deck:deckHas()};wk=window.wk0}
  window.pbKyAt=kyOpen;
  /* (8) «Thi ngay» runs the exam (auto) */
  fresh();window.pbKyAt=()=>"newyear";window.__exAuto=1;exTick();m=card();const s0=S.suc,u0=used;if(m)chooseM(0);out.now={sit:!!(S.ex&&(S.ex.pass||S.ex.n)),suc:s0-S.suc,khac:used-u0,deck:deckHas()};window.__exAuto=0;window.pbKyAt=kyOpen;
  /* (2)(3)(4) grace / special windows (outside a kỳ) */
  for(const src of ["m","f","hh"]){fresh();try{pbGrant(S,src,src==="hh"?{cut:0,q:S,me:1}:{birth:1})}catch(e){out['g'+src+'err']=e.message}Q.length=0;exTick();m=card();out['g'+src]={t:m&&m.t,open:!!(S.ex&&S.ex.w1!=null),grace:S.ex&&S.ex.grace}}
  /* (5) serving maid window */
  {window.__nlInner=1;let n=0;for(let i=0;i<80;i++){start();if(isSrv())break;n++}window.__nlInner=0;Q.length=0;out.srvLife=isSrv();if(isSrv()){S.srv.ex={};used=0;exSrvOpen(1);m=Q.find(x=>x&&x.exAsk===2);out.srv={t:m&&m.t,n:m&&m.opts.map(o=>o.n),w:wordOk(m)}}}
  /* (11) old save: an open window from before this branch (no e.rem) and a lapsed one */
  fresh();window.pbKyAt=()=>"newyear";exTick();Q.length=0;delete S.ex.rem;let d=JSON.parse(JSON.stringify(ser()));try{quiet=true;deser(d);quiet=false;deal();exTick();render();out.old1='ok'}catch(e){out.old1=e.message}
  S.ex.w1=wk()-1;S.ex.w0=S.ex.w1-1;d=JSON.parse(JSON.stringify(ser()));try{quiet=true;deser(d);quiet=false;deal();exTick();render();out.old2='ok lapse='+S.ex.lapse}catch(e){out.old2=e.message}
  window.pbKyAt=kyOpen;out.win=BAL.ex.win;out.cdLapse=BAL.ex.cdLapse;return out});
 console.log(JSON.stringify(R));
 ok(R.ord.t==="Khảo hạch tấn phong"&&R.ord.n.join('/')==='Thi ngay/Để sau'&&R.ord.deck,'(1) ordinary (kỳ) window → kit card «Thi ngay / Để sau» + Hành sự card');
 ok(R.ord.win===R.win,`(10) window = BAL.ex.win ${R.win} tuần`);
 ok(R.ord.w,'(12) odds word is a KIT_ODDS word, no %');
 ok(!R.later.q&&R.later.deck,'(7) «Để sau» closes the card, the exam card stays in Hành sự');
 ok(R.rem.t==="Sắp hết hạn khảo hạch"&&R.rem.once,'(6) last-tuần reminder shown once');
 ok(R.lapse.lapse===1&&R.lapse.cd===R.lapse.want&&!R.lapse.deck,`(9) window never sat waits max(BAL.ex.cdLapse ${R.cdLapse}, months to the next kỳ) = ${R.lapse.cd}`);
 ok(R.now.sit&&R.now.suc>0&&R.now.khac>0&&!R.now.deck,'(8) «Thi ngay» sits the exam, spends Sức and khắc, card leaves Hành sự');
 for(const s of ['m','f','hh'])ok(R['g'+s]&&R['g'+s].open&&R['g'+s].t==="Khảo hạch tấn phong",`(${{m:2,f:3,hh:4}[s]}) grace/special window «${s}» → kit card`);
 ok(R.srvLife&&R.srv&&R.srv.t==="Khảo hạch Nội vụ phủ"&&R.srv.w,'(5) serving-maid window → kit card');
 ok(R.old1==='ok'&&/^ok/.test(R.old2),'(11) old save with an open / lapsed window loads and ticks: '+R.old1+' / '+R.old2);
 ok(!errs.length,'no page errors '+errs.slice(0,3).join(' | '));
 await b.close();console.log(fail?`FAIL ${fail}`:'ALL PASS');process.exit(fail?1:0)})();
