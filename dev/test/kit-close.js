/* review/kit-close — KIT 32.10: every closable panel has ONE ✕ (kit-x) at the top right of its header, closes on a tap outside the box
   (dimmed ground) and on Esc; a forced panel (an event that must be chosen) has no ✕ and ignores both; a drag / scroll that ends on the
   ground never closes; no "Thôi" / "Lui" / "Đóng" / "Đã hiểu" button that only closes; the big red button reads "Sang buổi" by day and
   "Sang ngày mới" at night; an old save loads.
   usage: node dev/test/kit-close.js <url of a build page> <outdir> [WxH@dpr,…] [oldsave.json]
   (default 755x1000@2,1000x755@2,1180x820@2,844x390@3). Images missing from a sparse checkout are fetched from the live site. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const https=require('https');
/* start() may finish after the loading screen: wait for the life, and start again while it is a servant life */
async function kcWait(p){for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});await new Promise(r=>setTimeout(r,1500));
 /* r6: the life can be replaced after the loading screen; check again after it settles, and never test a servant life (no Tư trang tab) */
 if(!(await p.evaluate(()=>typeof isSrv==="function"&&isSrv()||(S&&S.origin&&S.origin.k==="cnv"))))return;await p.evaluate(()=>{S=null;try{nlNew()}catch(e){}start()})}}
const [,,PAGE,OUT,SIZES,OLD]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));const LIVE='https://thientran2711.github.io/cung-tuong-mong/';const cache=new Map();
const live=p=>cache.has(p)?Promise.resolve(cache.get(p)):new Promise(res=>https.get(LIVE+p,r=>{const c=[];r.on('data',d=>c.push(d));r.on('end',()=>{const v={status:r.statusCode,body:Buffer.concat(c),ct:r.headers['content-type']||''};if(cache.size<500)cache.set(p,v);res(v)})}).on('error',()=>res({status:404,body:Buffer.alloc(0),ct:''})));
(async()=>{const b=await chromium.launch();const ALL=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,844x390@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.route('**/*',async rt=>{const u=new URL(rt.request().url());const m=u.pathname.match(/\/((?:img|audio|icons)\/.*)$/);
   if(/^(127\.0\.0\.1|localhost)$/.test(u.hostname)&&m&&!fs.existsSync(process.cwd()+'/'+m[1])){const v=await live(m[1]);return rt.fulfill({status:v.status,body:v.body,contentType:v.ct})}
   if(/^(127\.0\.0\.1|localhost)$/.test(u.hostname)&&/\.html$/.test(u.pathname)&&fs.existsSync(process.cwd()+u.pathname))return rt.fulfill({status:200,body:fs.readFileSync(process.cwd()+u.pathname),contentType:'text/html; charset=utf-8'});
   return rt.continue()});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('crash',()=>console.error('PAGE CRASH'));p.on('close',()=>console.error('PAGE CLOSE'));
  await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof kitCloseSync==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   start()});await kcWait(p);await p.evaluate(()=>{Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}S.bac=400;render();const kr=document.getElementById("kroul");if(kr)kr.remove()});
  await sleep(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}if(typeof tab!=='undefined'&&tab==='inv')render();else render()});await sleep(300);
  const imgs=()=>p.evaluate(()=>Promise.all([...document.querySelectorAll('img')].filter(i=>i.offsetParent).map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,6000)}))));
  const shot=async n=>{await imgs();await sleep(400);for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${n}-${wh}.jpg`,type:'jpeg',quality:74,timeout:60000});break}catch(e){await sleep(1500)}}};
  const st=()=>p.evaluate(()=>{const M=document.getElementById('modal');const open=!M.hidden;const d=M.querySelector('.dlg');const vis=e=>e&&e.offsetParent!==null;
   const xs=open?[...d.querySelectorAll('.kit-x')].filter(vis):[];const x=xs[0];let xin=null;
   if(x){const r=x.getBoundingClientRect(),q=d.getBoundingClientRect(),h=d.querySelector(':scope > .kph');const hr=h&&h.getBoundingClientRect();xin={right:Math.round(q.right-r.right),top:Math.round(r.top-q.top),inHead:!!(h&&x.parentElement===h),headH:hr?Math.round(hr.height):null}}
   const btns=open?[...M.querySelectorAll('button')].filter(vis).map(b=>b.textContent.trim()):[];
   return{open,x:xs.length,xin,closeBtns:btns.filter(t=>/^(✕\s*)?(‹\s*)?(Thôi|Lui|Đóng|Đã hiểu|Đã rõ)$/.test(t)),thoi:btns.filter(t=>/^Thôi\b/.test(t)),q:typeof Q!=='undefined'?Q.length:0}});
  /* where to tap "outside": a point on the dimmed ground (not in the box); null when the box fills the screen */
  const outPt=()=>p.evaluate(()=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg').getBoundingClientRect();
   const c=[[6,6],[innerWidth-6,innerHeight-6],[6,innerHeight-6],[innerWidth-6,6],[innerWidth/2,6],[innerWidth/2,innerHeight-4],[4,innerHeight/2],[innerWidth-4,innerHeight/2]];
   for(const [x,y] of c){if(x<d.left||x>d.right||y<d.top||y>d.bottom){if(document.elementFromPoint(x,y)===M)return[x,y]}}return null});
  const R={sz,cases:{}};
  /* open = a function run in the page that opens one panel; kind: "close" | "forced" */
  const CASES=[
   ["info","close",()=>{Q.push({t:"Tin trong cung",h:"<p>Ngự hoa viên hoa nở sớm.</p>"});showModal()}],
   ["choice-thoi","close",()=>{Q.push({t:"Việc nhỏ",h:"<p>Nên đi hay không?</p>",opts:[{n:"Đi xem",fx:{},x:"không đổi gì",go:()=>{window.__went=1}},{n:"Thôi",fx:{},x:""}]});showModal()}],
   ["self","close",()=>showSelf()],
   ["emp","close",()=>showEmp()],
   ["place","close",()=>j77Card("kn")],
   ["place-night","close",()=>{S.buoi=B4L;used=0;j77Card("dtd")}],
   ["shop","close",()=>{tab="inv";render();invAct("shop")}],
   ["item","close",()=>{tab="inv";render();const x=kinvItems()[0];if(x)kinvOpen(x);else return'no item'}],
   ["slot-hair","close",()=>{tab="inv";render();const o=KEQ.reg.tutrang;const x=o&&o.slots.find(s=>s.k==="hair");if(x)keqPick(x);else return'no slot'}],
   ["slot-wrist","close",()=>{tab="inv";render();const o=KEQ.reg.tutrang;const x=o&&o.slots.find(s=>s.k==="wrist");if(x)keqPick(x);else return'no slot'}],
   ["forced","forced",()=>{Q.push({t:"Việc khó xử",h:"<p>Hoàng hậu hỏi ngươi một câu, phải đáp.</p>",pid:"x",pp:{},opts:[{n:"Thưa thật",fx:{},x:"không đổi gì"},{n:"Nói tránh",fx:{},x:"không đổi gì"}]});showModal()}],
  ];
  for(const [name,kind,fn] of CASES.filter(c=>!process.env.ONLY||process.env.ONLY.split(",").includes(c[0]))){const c={};R.cases[name]=c;
   for(const how of ["x","out","esc"]){
    await p.evaluate(()=>{try{getSelection().removeAllRanges()}catch(e){}});const pre=await p.evaluate(`(${fn})()`);await sleep(700);const s0=await st();
    if(how==="x"){c.state=s0;if(pre)c.pre=pre;await shot(`${name}`)}
    if(!s0.open){c[how]="did not open";continue}
    if(how==="x"){if(s0.x)await p.evaluate(()=>{const x=[...document.querySelectorAll('#modal .dlg .kit-x')].find(e=>e.offsetParent);x.click()});else c.xNone=true}
    else if(how==="out"){const pt=await outPt();if(!pt){c.out="box fills the screen";await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});continue}
     /* first: a drag that starts in the box and ends on the ground must NOT close */
     const dr=await p.evaluate(()=>{const r=document.querySelector('#modal .dlg').getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});
     await p.mouse.move(dr[0],dr[1]);await p.mouse.down();await p.mouse.move(pt[0],pt[1],{steps:6});await p.mouse.up();await sleep(250);c.dragStays=(await st()).open;
     await p.mouse.click(pt[0],pt[1]);}
    else{await p.keyboard.press('Escape')}
    await sleep(500);const s1=await st();c[how]=kind==="close"?(!s1.open||s1.q<s0.q?"closed":"STILL OPEN"):(s1.open?"stays (ok)":"CLOSED (bad)");
    await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;try{popIdx=null}catch(e){}render()});await sleep(200)}}
  /* person card from the room (#popw): ✕ / tap on the scene / Esc */
  const pop={};R.cases.roomCard=pop;
  for(const how of ["x","out","esc"]){await p.evaluate(()=>{tab="act";render()});await sleep(300);
   const ok=await p.evaluate(()=>{const b=document.querySelector('#stage [data-p]');if(!b)return false;b.click();return true});await sleep(600);
   if(!ok){pop[how]="no person in the room";break}
   const s0=await p.evaluate(()=>{const x=document.getElementById('popx');return x?{vis:!!x.offsetParent,txt:x.textContent.trim(),cls:x.className}:null});if(how==="x"){pop.btn=s0;await shot('room-card')}
   if(!s0||!s0.vis){pop[how]="no ✕";continue}
   if(how==="x")await p.click('#popx');
   else if(how==="out"){const pt=await p.evaluate(()=>{const s=document.getElementById('scimg')||document.getElementById('stage');const r=s.getBoundingClientRect();if(r.width<20||r.height<20||!s.offsetParent)return null;
     for(const [fx,fy] of [[.5,.12],[.2,.1],[.8,.1],[.5,.5]]){const x=r.left+r.width*fx,y=r.top+r.height*fy;const e=document.elementFromPoint(x,y);if(e&&e.closest("#stage")&&!e.closest('button,#popw,.pop,.hud2,.k3p'))return[x,y]}return null});
     if(!pt){pop.out="no free scene point (card full screen)";await p.evaluate(()=>{popIdx=null;renderStage()});continue}await p.mouse.click(pt[0],pt[1])}
   else await p.keyboard.press('Escape');
   await sleep(400);pop[how]=await p.evaluate(()=>{const x=document.getElementById('popx');return x&&x.offsetParent?"STILL OPEN":"closed"})}
  /* week book: ✕ instead of "Lui" */
  R.cases.book=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const bk=kitBook({pages:[{kind:"cover",title:"Sổ tuần",sub:"thử"},{kind:"text",title:"Trang một",blocks:[{html:"<p>Một dòng.</p>"}]},{kind:"end"}],label:"Sổ tuần",onClose:()=>{window.__bkc=(window.__bkc||0)+1;bk.root.remove()}});
   await W(500);const x=bk.root.querySelector('.kit-x');const lui=[...bk.root.querySelectorAll('button')].filter(b=>/^(Lui|Thôi|Đóng)$/.test(b.textContent.trim())).length;const r=x&&x.getBoundingClientRect();
   window.__bkc=0;x.click();await W(200);return{x:!!x,lui,xTopRight:r?[Math.round(innerWidth-r.right),Math.round(r.top)]:null,closedByX:window.__bkc===1}});
  /* the big red button */
  R.next=await p.evaluate(()=>{S.buoi=0;render();const a=document.getElementById('next').textContent;S.buoi=B4L;render();const n=document.getElementById('next').textContent;S.buoi=0;render();return{day:a,night:n}});
  /* no close-only words anywhere on the main screen (tabs) */
  R.tabsCloseWords=[];for(const t of ['act','go','rv','rel','staff','inv','skill','story','kids','log']){await p.evaluate(t=>{tab=t;render()},t);await sleep(150);
   const w=await p.evaluate(()=>[...document.querySelectorAll('button')].filter(b=>b.offsetParent&&/^(✕\s*)?(Thôi|Lui|Đóng|Đã hiểu|Đã rõ)$/.test(b.textContent.trim())).map(b=>b.textContent.trim()));if(w.length)R.tabsCloseWords.push([t,w])}
  if(OLD){const d=fs.readFileSync(OLD,'utf8');R.oldsave=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;deal();Q.length=0;showModal();render();return'ok '+S.name}catch(e){return'ERR '+e.message}},d);
   await sleep(800);await shot('oldsave')}
  R.hovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);R.errs=errs;ALL.push(R);await ctx.close()}
 console.log(JSON.stringify(ALL,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
