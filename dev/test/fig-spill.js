/* fig-spill (KIT 56.4b, D4 review 26/11: Fold «Người bên cạnh» visitor frame drew the Hoàng hậu figure over the scene picture and the story text).
   Whole family = every kit frame with a person figure column (.kszfig, kszFigHtml): the «Người bên cạnh» visitor card (Hoàng hậu + a consort) and EVERY
   PEND event frame (+ c2a), each opened twice: as built (a hand/stage when it qualifies) and with ONE option (never a hand → the figure-column frame).
   SPILL = px the painted figure reaches past its column's right edge; FAIL when > KIT_SIZE.figSpill + 2 or when the figure's head box (top 30 %) lies under the right column.
   usage: node dev/test/fig-spill.js <index.html> [WxH,...]  exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const A=process.argv.slice(2);const SRC=path.resolve(A[0]);const SIZES=(A[1]||'755x1000,1180x820').split(',');
(async()=>{const b=await chromium.launch();const out=[];let nfr=0,bad=0;
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const dev=W<H?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>{errs++;console.log('PAGEERROR',e.message.slice(0,160))});await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
   try{kn();for(const v of rivals){S.met[v.id]=1};for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render();
   window.popKind=k=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';S.out=0;S.confined=0;render();const ps=curPeople();const i=ps.findIndex(x=>x.kind===k);if(i<0)return 'none';popIdx=i;popMsg='';renderStage();return 'ok'};
   window.invViec=()=>{Q.length=0;document.getElementById('modal').hidden=true;tab='inv';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};const v=[...document.querySelectorAll('#panel button,#panel .pct,#panel .ksubb')].find(x=>x.textContent.trim()==='Việc');if(v)v.click();return 'ok'};
   window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};return 'ok'}});
  await p.addStyleTag({content:'#kload,#klife,#kroulw,.kroul,#curtain,#dawn,#kdaytc{display:none!important}'});
  const meas=where=>p.evaluate(where=>{const d=document.querySelector('#modal .dlg');if(!d||document.getElementById('modal').hidden)return null;const im=d.querySelector('.kszfig>.kszfs>img');if(!im||!im.getClientRects().length)return {where,fig:0};
   const L=d.querySelector('.kszfig').getBoundingClientRect(),I=im.getBoundingClientRect(),Rr=d.querySelector('.k3right,.kszright');const R=Rr?Rr.getBoundingClientRect():null;const sp=Math.round(I.right-L.right);
   const headR=I.left+I.width*.5+I.width*.2;/* the face sits around the middle of the painting width */const head=R&&I.top+I.height*.3>R.top&&headR>R.left+4;
   return {where,fig:1,ksz:d.dataset.ksz,sp,head,lim:KIT_SIZE.figSpill||40,w:Math.round(I.width),cw:Math.round(L.width)}},where);
  const visit=async(who,one)=>{const ok=await p.evaluate(([who,one])=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;
   const v=who==='queen'?queenP():(liveRivals(true)||[])[0];if(!v)return false;S.met[v.id]=1;const pp={pl:S.place||'home',act:'trò chuyện cùng',k:'talk',kh:0,id:'v'+v.id,vid:v.id,t:'me'};const c=agSeekCard(pp,v);c.t='Người bên cạnh';if(one)c.opts=c.opts.slice(0,1);Q.push(c);showModal();return true},[who,one]);
   if(!ok)return;await p.waitForTimeout(1500);const m=await meas('visit:'+who+(one?':1opt':''));if(m)rows.push([dev,m])};
  const rows=[];for(const who of ['queen','rival'])for(const one of [0,1])await visit(who,one);
  const open=id=>p.evaluate(id=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');const kp=document.getElementById('kpop');if(kp)kp.remove();
   if(id==='c2a'){try{if(rgFire('c2a')){Q.length=1;showModal();return true}}catch(e){}return false}
   const v=(liveRivals(true)||[])[0];const C=[...(liveRivals(true)||[]).map(x=>x.id),...((S.srvs||S.servants||[]).map(x=>x&&x.id)),null,0,1,2,'emp','th','hh'];const E6=typeof EV6!=='undefined'?EV6[id]:null;let p6=null;
   if(E6&&typeof A6==='function'){p6={vi:0};for(let i=0;i<(E6.a||[]).length;i++){const c=C.find(x=>{try{return !!A6(E6.a[i],x)}catch(e){return false}});if(c===undefined){p6=null;break}p6['a'+i]=c}}
   for(const pp of [...(p6?[p6]:[]),{v:v&&v.id},{q:2,vp:0},{a0:v&&v.id,vi:0},{}]){let d=null;const pc=Object.assign({},pp);try{d=PEND[id](pc)}catch(e){d=null}if(!d)continue;try{Q.length=0;pushDil(mkP(id,pc),'Tuyến truyện');showModal();if(Q.length&&!document.getElementById('modal').hidden)return true}catch(e){}}return false},id).catch(()=>false);
  const one1=()=>p.evaluate(()=>{const m=Q[0];if(!m||!m.opts||m.opts.length<2)return false;m.opts=m.opts.slice(0,1);showModal();return true});
  const ids=await p.evaluate(()=>['c2a'].concat(Object.keys(PEND)));const re=process.env.ONLY?new RegExp(process.env.ONLY):null;
  for(const id of ids.filter(i=>!re||re.test(i))){if(!(await open(id)))continue;nfr++;await p.waitForTimeout(700);let m=await meas('ev:'+id);if(process.env.SHOT)await p.waitForTimeout(2500);if(m)rows.push([dev,m]);
   if(await one1().catch(()=>false)){await p.waitForTimeout(700);m=await meas('ev:'+id+':1opt');if(m)rows.push([dev,m]);if(process.env.SHOT){await p.waitForTimeout(2500);await p.screenshot({path:process.env.SHOT+'-'+dev+'-'+id+'.png'})}}}
  for(const [d,m] of rows){if(!m.fig)continue;const f=m.sp>m.lim+2||m.head;if(f)bad++;console.log([d,m.where,m.ksz,'w '+m.w+' col '+m.cw,'spill '+m.sp,m.head?'HEAD UNDER TEXT':'',f?'FAIL':'ok'].join(' | '))}
  console.log(dev,'frames',nfr,'figure frames',rows.filter(r=>r[1].fig).length);await ctx.close()}
 console.log(bad?`FIG-SPILL FAIL ${bad}`:'FIG-SPILL PASS');await b.close();process.exit(bad?1:0)})();
