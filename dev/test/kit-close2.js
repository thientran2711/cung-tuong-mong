/* review/kit-close (owner 11/15, round 2):
   A. NO TAP-THROUGH: a closable card is open over an act button; a tap on the button's position ONLY closes the card — the act does not
      run (khắc used, Sức / Bạc / Danh / Sủng and the log unchanged), also no ghost click 400 ms later. Cards: the act result card
      (#rtoast), an info card, a choice card with Thôi, the shop, an item card, a person card, the news card. Taps by touchscreen.tap
      (touch → click) and by mouse.
   B. TƯ TRANG sub-tabs: "Túi đồ" (default; bag + Bên mình slots on screen without scrolling) · "Việc" (acts, doable ones first).
   C. NEWS CARD "Tin trong cung buổi này": ✕ (no "Đã hiểu"), picture of its main item (not "Triều chính"), no "X → X" no-change
      lines, no "Sủng nàng", closes on a tap outside.
   usage: node dev/test/kit-close2.js <build page url> <outdir> [WxH@dpr,…]   (default 755x1000@2,1000x755@2,1180x820@2,844x390@3) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
/* start() may finish after the loading screen: wait for the life, and start again while it is a servant life */
async function kcWait(p){for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});await new Promise(r=>setTimeout(r,1500));
 /* r6: the life can be replaced after the loading screen; check again after it settles, and never test a servant life (no Tư trang tab) */
 if(!(await p.evaluate(()=>typeof isSrv==="function"&&isSrv()||(S&&S.origin&&S.origin.k==="cnv"))))return;await p.evaluate(()=>{S=null;try{nlNew()}catch(e){}start()})}}
const [,,PAGE,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ALL=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,844x390@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.route('**/*',async rt=>{const u=new URL(rt.request().url());
   if(/^(127\.0\.0\.1|localhost)$/.test(u.hostname)&&/\.html$/.test(u.pathname)&&fs.existsSync(process.cwd()+u.pathname))return rt.fulfill({status:200,body:fs.readFileSync(process.cwd()+u.pathname),contentType:'text/html; charset=utf-8'});
   return rt.continue()});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitCloseSync==='function');await sleep(2500);
  const clean=()=>p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');md.hidden=true;md.className='modal';
   const dw=document.getElementById('dawn');if(dw){dw.hidden=true;dw.innerHTML="";dw.classList.remove("on")}document.body.classList.remove("kbk-open");
   const t=document.getElementById('rtoast');if(t)t.classList.remove('on');try{popIdx=null}catch(e){}try{NLP=null}catch(e){}render()});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   start()});await kcWait(p);await p.evaluate(()=>{S.bac=400;S.suc=90});
  await sleep(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});await clean();await sleep(400);
  const shot=async n=>{await sleep(500);try{await p.screenshot({path:`${OUT}/${n}-${wh}.jpg`,type:'jpeg',quality:74,timeout:60000})}catch(e){}};
  const R={sz,through:{},inv:{},news:{}};
  /* ---------- A. tap-through ---------- */
  const state=()=>p.evaluate(()=>({used,buoi:S.buoi,tuan:S.tuan,suc:S.suc,bac:S.bac,danh:S.danh,sung:S.sung,seq:S.logSeq||0,q:Q.length,tab,logs:S.logs.slice(0,4).map(x=>String(x).replace(/<[^>]+>/g,""))}));
  /* an enabled act button in the Hành sự panel that the card does NOT cover (its centre is outside the card box) */
  const target=box=>p.evaluate(box=>{/* an act card first; where the card covers the whole panel (phones), a bottom tab or the big red button (a tap there would switch tab /
   pass the buổi) */
   const L=[...document.querySelectorAll('#panel .cards > button:not([disabled]), #panel button.ka:not([disabled]), #panel button.card:not([disabled]), #next:not([disabled]), #tabs button:not(.kghide):not([aria-selected="true"])')].filter(b=>b.offsetParent);
   for(const b of L){const r=b.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+Math.min(r.height/2,30);if(y<0||y>innerHeight||x<0||x>innerWidth)continue;
    if(box&&x>=box[0]-4&&x<=box[0]+box[2]+4&&y>=box[1]-4&&y<=box[1]+box[3]+4)continue;return{x,y,n:b.textContent.trim().slice(0,24)}}return null},box);
  const CARDS=[
   ["result",async()=>{await p.evaluate(()=>{const b=rsnap();S.danh+=2;resultShow("Thỉnh an Hoàng hậu",b,true);S.__d=S.danh})},
    ()=>p.evaluate(()=>{const t=document.getElementById('rtoast');if(!t||!t.classList.contains('on'))return null;const r=t.getBoundingClientRect();return[r.left,r.top,r.width,r.height]}),
    ()=>p.evaluate(()=>{const t=document.getElementById('rtoast');return !!(t&&t.classList.contains('on'))})],
   ["info",async()=>{await p.evaluate(()=>{Q.push({t:"Tin nhỏ",h:"<p>Ngự hoa viên hoa nở sớm.</p>"});showModal()})}],
   ["choice",async()=>{await p.evaluate(()=>{Q.push({t:"Việc nhỏ",h:"<p>Nên đi hay không?</p>",opts:[{n:"Đi xem",fx:{},x:"không đổi gì",go:()=>{}},{n:"Thôi",fx:{},x:""}]});showModal()})}],
   ["self",async()=>{await p.evaluate(()=>showSelf())}],
   ["shop",async()=>{await p.evaluate(()=>{invAct("shop");tab="act";render()})}],
   ["item",async()=>{await p.evaluate(()=>{const x=kinvItems()[0];if(x)kinvOpen(x)})}],
  ];
  const mBox=()=>p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return null;const r=M.querySelector('.dlg').getBoundingClientRect();return[r.left,r.top,r.width,r.height]});
  const mOpen=()=>p.evaluate(()=>!document.getElementById('modal').hidden);
  for(const [name,open,boxF,isOpen] of CARDS){const res={};R.through[name]=res;
   for(const how of ["touch","mouse"]){await clean();await p.evaluate(()=>{tab="act";render()});await sleep(300);
    await open();await sleep(700);const box=await (boxF||mBox)();if(!box){res[how]="did not open";continue}
    const tg=await target(box);if(!tg){res[how]="card covers every act (no free act under it)";continue}
    const s0=await state();if(how==="touch")await p.touchscreen.tap(tg.x,tg.y);else await p.mouse.click(tg.x,tg.y);
    await sleep(120);const closed=!(await (isOpen||mOpen)());await sleep(450);const s1=await state();
    /* the act would spend khắc / Sức / Bạc / Sủng or write its own name into the log (closing a card with "Thôi" may log "Thôi." as before) */
    const newLogs=s1.logs.slice(0,Math.max(0,s1.seq-s0.seq));const key=tg.n.split(/\s|·/)[0];
    const ran=s1.used!==s0.used||s1.tab!==s0.tab||s1.buoi!==s0.buoi||s1.tuan!==s0.tuan||s1.suc!==s0.suc||s1.bac!==s0.bac||s1.sung!==s0.sung||(name!=="result"&&s1.danh!==s0.danh)||newLogs.some(l=>key&&l.includes(key))||(s1.q>s0.q);
    /* a second tap now DOES reach the act (the catcher is gone) */
    res[how]={act:tg.n,closed,actRan:ran,ok:closed&&!ran};if(how==="touch"&&name==="result")await shot('through-result-open')}}
  /* ---------- B. Tư trang sub-tabs ---------- */
  /* r6: a servant life has no Tư trang: make sure this is a consort life before section B (the life can still be replaced late) */
  await p.evaluate(()=>{for(let i=0;i<40&&typeof isSrv==="function"&&isSrv();i++){S=null;try{nlNew()}catch(e){}start()}S.bac=400;S.suc=90});
  await clean();await p.evaluate(()=>{tab="inv";render()});await sleep(700);
  R.inv.tui=await p.evaluate(()=>{const subs=[...document.querySelectorAll('#panel .kinvsub .ksubb')].map(x=>x.textContent+(x.classList.contains('on')?'*':''));
   const k=document.querySelector('#panel .keq');const g=document.querySelector('#panel .kinvpane[data-kinvpane="tui"]');const r=k&&k.getBoundingClientRect();const pr=document.getElementById('panel').getBoundingClientRect();
   const acts=[...document.querySelectorAll('#panel [data-kinvpane="viec"] button')].filter(b=>b.offsetParent).length;
   return{subs,slotsTop:r&&Math.round(r.top),slotsHeadVisible:!!r&&r.top+40<=Math.min(innerHeight,pr.bottom),panelBottom:Math.round(pr.bottom),actsVisible:acts}});
  await shot('inv-tuido');
  await p.evaluate(()=>document.querySelector('#panel [data-kinvsub="viec"]').click());await sleep(500);
  R.inv.viec=await p.evaluate(()=>{const pane=document.querySelector('#panel [data-kinvpane="viec"]');const B=[...pane.querySelectorAll('button')].filter(b=>b.offsetParent&&!b.closest('.kinvsub'));
   const off=B.map(b=>b.disabled);const firstOff=off.indexOf(true);return{n:B.length,doableFirst:firstOff<0||off.slice(firstOff).every(Boolean),names:B.map(b=>(b.disabled?"✗ ":"")+((b.querySelector('.kan')||b).textContent||"").trim().slice(0,22))}});
  await shot('inv-viec');await p.evaluate(()=>document.querySelector('#panel [data-kinvsub="tui"]').click());await sleep(200);
  /* ---------- C. news card ---------- */
  await clean();
  R.news=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));let m=null;
   for(let i=0;i<60&&!m;i++){Q.length=0;document.getElementById('modal').hidden=true;S.buoi=i%2?0:B4L;used=4;S.suc=90;nextBuoi();await W(40);m=Q.find(x=>x&&/^Tin trong cung/.test(x.t||""))||null;
    const dw=document.getElementById('dawn');if(dw){dw.hidden=true;dw.innerHTML="";dw.classList.remove("on")}document.body.classList.remove("kbk-open");if(S.dead)break}
   if(!m)return{none:true};Q.length=0;Q.push(m);showModal();await W(1200);const d=document.querySelector('#modal .dlg');const txt=d.innerText;
   return{t:m.t,lab:((d.querySelector('.ksart .ksartl, .ksart figcaption, .ksart b')||{}).textContent||"").trim(),art:((d.querySelector('.ksart img')||{}).src||"").replace(/.*\//,""),
    x:d.querySelectorAll('.kit-x').length,closeWords:[...d.querySelectorAll('button')].filter(b=>b.offsetParent&&/^(Đã hiểu|Đã rõ|Lui|Thôi)$/.test(b.textContent.trim())).length,
    noChange:(txt.match(/\b(\d+) → \1\b/g)||[]).length,sungNang:/Sủng nàng/.test(txt),text:txt.replace(/\s+/g," ").slice(0,300)}});
  await shot('news');
  if(!R.news.none){const pt=await p.evaluate(()=>{const r=document.querySelector('#modal .dlg').getBoundingClientRect();for(const [x,y] of [[6,innerHeight/2],[innerWidth-6,innerHeight/2],[innerWidth/2,6],[innerWidth/2,innerHeight-6]])if((x<r.left||x>r.right||y<r.top||y>r.bottom)&&document.elementFromPoint(x,y)===document.getElementById('modal'))return[x,y];return null});
   if(pt){const s0=await state();await p.touchscreen.tap(pt[0],pt[1]);await sleep(500);const s1=await state();R.news.outside=(await mOpen())?"STILL OPEN":"closed";R.news.outsideRan=s1.used!==s0.used||s1.seq!==s0.seq}else R.news.outside="box fills the screen"}
  R.errs=errs;ALL.push(R);await ctx.close()}
 console.log(JSON.stringify(ALL,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
