/* next-label-fit.js (KK47; owner OD 26/11 ~21:41Z (c) «Sang buổi» text overflowing to 5 lines «Có tin đang chờ · xong việc đang làm đã»; law 10 one fixed button size):
   family scan of every label the bottom-bar «Sang buổi» button (#next) can show (normal + every #next.kcwait cue: dqHeldBtn / dqRoomBtn + the co-op waits):
   at most 2 lines, nothing clipped, the button keeps its size; the held cue (jdayq) shows the SHORT label and puts the reason in the kit notice line (kitNotice id dqcue), dropped when it clears.
   usage: node dev/test/next-label-fit.js <index.html> [WxH,...]   exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;try{render()}catch(e){}
   const sl=ms=>new Promise(r=>setTimeout(r,ms));const n=document.getElementById('next');n.classList.remove('kcwait');delete n.dataset.dqCue;n.style.maxWidth='';n.textContent='Sang buổi';if(window.kitNextSize)kitNextSize();await sl(50);const W=window.CTM_WAIT;const r0=n.getBoundingClientRect();const base={w:Math.round(r0.width),h:Math.round(r0.height)};
   const keys=['dqHeldBtn','dqRoomBtn','coopWaitPeer','coopWaitPeer2','coopWaitBuild','coopMoved','coopRelink','coopLinking','coopAbsent'];const labels=[['Sang buổi',''],['Sang ngày mới','']].concat(keys.map(k=>[W[k],'kcwait']));
   const out=[];const t0=n.textContent,mw=n.style.maxWidth;for(const [t,c] of labels){if(c){n.style.maxWidth=base.w+'px';n.classList.add(c)}n.textContent=t;await sl(30);const cs=getComputedStyle(n),lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.2;const rr=n.getBoundingClientRect();
    const range=document.createRange();range.selectNodeContents(n);const lines=new Set([...range.getClientRects()].map(q=>Math.round(q.top))).size;out.push({t,lines,clip:n.scrollHeight>n.clientHeight+1||n.scrollWidth>n.clientWidth+1,w:Math.round(rr.width),h:Math.round(rr.height)});if(c){n.classList.remove(c);n.style.maxWidth=mw}}
   n.textContent=t0;
   /* the held cue, live: a card waits while nothing on screen shows it */let cue=null;try{Q.push({t:'Thử',h:'<p>thử</p>',o:[{n:'Ừ',fx:{},go:()=>{}}]});document.getElementById('modal').hidden=true;n.disabled=true;const dh=window.dqHidden;window.dqHidden=()=>true;dqNextCue();await sl(50);
    cue={txt:n.textContent,note:(typeof kitNoticeList==='function'?kitNoticeList():[]).some(x=>x.id==='dqcue'&&/Có tin đang chờ/.test(x.line)),title:n.title};Q.length=0;n.disabled=false;dqNextCue();await sl(50);cue.after=n.textContent;cue.noteAfter=(kitNoticeList()||[]).some(x=>x.id==='dqcue');window.dqHidden=dh}catch(e){cue={err:String(e)}}
   return {base,out,cue}});
  for(const o of r.out)chk(`${wh} «${o.t}» ≤2 lines, not clipped, size kept`,o.lines<=2&&!o.clip&&Math.abs(o.w-r.base.w)<=1&&Math.abs(o.h-r.base.h)<=1,{lines:o.lines,clip:o.clip,w:o.w,h:o.h,base:r.base});
  chk(wh+' held cue = short label + reason in the notice line, dropped after',r.cue&&r.cue.txt==='Chờ tin'&&r.cue.note&&!r.cue.noteAfter&&/Sang/.test(r.cue.after),r.cue);
  chk(wh+' no page errors',errs.length===0,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'FAIL '+fails:'PASS');process.exit(fails?1:0)})();
