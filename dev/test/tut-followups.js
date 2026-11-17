/* tut-followups (review/tut-followups): two follow-ups of review-tut-quests-r1.
   1) OLD bd SAVE: a bd life saved mid-game by the build BEFORE this fix (no chapter frame, v1 story slot) loads in this build, plays on
      (months pass, story tab renders, no page errors) and keeps its old story (the wrap only acts for a NEW life).
   2) KIT §46: the chapter steps «Các bước» in the j67 chapter card (card67) and the Mệnh truyện panel (rows67 / panel67) are kit
      kitChecks (.kchecks .kchk), no typed ✓/✗ text line; the card holds them as their own kit section.
   Shots (optional dir): the chapter card and the Mệnh truyện tab at Fold 755x1000@2 and iPad 1180x820@2.
   usage: NODE_PATH=$(npm root -g) node dev/test/tut-followups.js <this build url> <build before the fix url> [shots dir] */
const {chromium}=require('playwright');const {autoDismissRoulette,dismissRoulette}=require('./lib/roulette');
const [,,URL,OLD,SHOTS]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,700))};
 const boot=async(url,vw,dsf)=>{const ctx=await b.newContext({viewport:vw||{width:1180,height:820},deviceScaleFactor:dsf||1,serviceWorkers:'block'});await autoDismissRoulette(ctx);const p=await ctx.newPage();p.setDefaultTimeout(30000);
  p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.goto(url+(url.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(800);return p};
 const life=async(p,k)=>{await p.evaluate(k=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__forceOrigin=k;start()},k);
  await dismissRoulette(p);await p.waitForFunction(k=>typeof S!=='undefined'&&S&&S.origin&&S.origin.k===k&&S.st,k,{timeout:60000});
  await p.evaluate(()=>{window.__clear=()=>{Q.length=0;try{const md=document.getElementById('modal');if(md)md.hidden=true}catch(e){}try{showModal()}catch(e){}};
   window.__month=()=>{const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){__clear();used=0;if(S.dead){S.dead=false;S.suc=60}S.suc=Math.max(S.suc||0,60);try{nextBuoi()}catch(e){return e.message}}__clear();return null};__clear()})};
 /* typed marks outside the kit mark (kitMark .kmk inside .kchecks / kit chips) */
 const typed=`(root=>{const out=[];const W=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=W.nextNode()){if(/[✓✗✔✘]/.test(n.nodeValue)&&!n.parentElement.closest('.kmk,.kchecks,.kchip,.kr-why'))out.push(n.nodeValue.slice(0,60))}return out})`;
 /* ===== 1) old bd save ===== */
 {const po=await boot(OLD);await life(po,'bd');
  const sv=await po.evaluate(()=>{for(let i=0;i<4;i++)__month();return{v:JSON.stringify(ser()),turn:S.turn,v2:S.st.v2||0,f14:!!S.st.f14}});
  chk('1 old build: a bd life has no chapter frame (the bug)',!sv.f14&&!sv.v2,sv);await po.context().close();
  const p=await boot(URL);await life(p,'tt');
  const r=await p.evaluate(sv=>{__clear();deser(JSON.parse(sv.v));__clear();const a={k:S.origin.k,turn:S.turn,v2:S.st.v2||0,f14:!!S.st.f14,goal:String(STORY.bd.goal).slice(0,40)};
   const e=[];for(let i=0;i<3;i++){const x=__month();if(x)e.push(x)}tab='story';try{render()}catch(x){e.push(x.message)}
   return{a,e,turn:S.turn,dead:!!S.dead,story:($('panel').textContent||'').slice(0,120)}},sv);
  chk('1 old bd save loads in this build, keeps its old story, 3 months pass, story tab renders',r.a.k==='bd'&&r.a.turn===sv.turn&&!r.a.f14&&!r.e.length&&r.turn>=sv.turn+3&&r.story.length>10,r);
  await p.context().close()}
 /* ===== 2) kit §46 kitChecks in the chapter card + Mệnh truyện panel ===== */
 for(const [vw,dsf,tag] of [[{width:1180,height:820},1,'ipad'],...(SHOTS?[[{width:755,height:1000},2,'fold'],[{width:1180,height:820},2,'ipad2x']]:[])]){
  const p=await boot(URL,vw,dsf);await life(p,'tt');
  const r=await p.evaluate(typed=>{__clear();let spec=null;const k0=kitPanel;kitPanel=function(sp){spec=sp;return k0.apply(this,arguments)};
   const m=S.st.ms,d=MS67[m.id];card67("info",`Chương ${S.st.ch.n}: ${d.t()}`,[["Mục tiêu",d.g()],["Các bước",steps67(d.steps(m))],msHan67(m,1)],pMe(),Q0n67());kitPanel=k0;
   try{showModal()}catch(e){}const md=document.getElementById('modal');const sec=(spec.sections||[]).find(s=>s.h==='Các bước');
   return{sec:!!sec&&/class="kchecks"/.test(sec.html||''),rowsTyped:(spec.sections||[]).some(s=>(s.rows||[]).some(x=>/[✓✗]/.test(String(x[1])))),dom:md?md.querySelectorAll('.kchecks .kchk').length:0,typed:md?eval(typed)(md):['no modal']}},typed);
  chk(`2 [${tag}] chapter card «Các bước» = kit section with kitChecks, no typed ✓/✗ rows`,r.sec&&!r.rowsTyped&&r.dom>=1&&!r.typed.length,r);
  if(SHOTS)await p.screenshot({path:`${SHOTS}/card67-${tag}.png`});
  const t=await p.evaluate(typed=>{__clear();tab='story';render();const el=document.getElementById('panel');const h=typeof panel67==='function'?panel67():'';
   const ov=document.documentElement.scrollWidth>innerWidth+1;return{panel:/Các bước/.test(h)&&/class="kchecks"/.test(h)&&!/[✓✗] /.test(h.replace(/<span class="kmk[^>]*><b>[✓✗]<\/b><\/span>/g,'')),dom:el.querySelectorAll('.kchecks').length,typed:eval(typed)(el),ov}},typed);
  chk(`2 [${tag}] Mệnh truyện panel: «Các bước» via kitChecks (panel67), tab shows kit checks, no typed ✓/✗, no h-overflow`,t.panel&&t.dom>=1&&!t.typed.length&&!t.ov,t);
  if(SHOTS){await p.evaluate(()=>{const e=document.querySelector('#panel .kchecks');if(e)e.scrollIntoView({block:'center'})});await p.waitForTimeout(400);await p.screenshot({path:`${SHOTS}/story-${tag}.png`})}
  await p.context().close()}
 /* ===== 3) cung nữ road tab (j42 srvRoadHTML): kit rows, not the raw srvRows array (pre-existing bug found here) ===== */
 {const p=await boot(URL,{width:755,height:1000});await life(p,'cnv');
  const r=await p.evaluate(()=>{__clear();tab='story';render();const el=document.getElementById('panel');const t=el.textContent||'';return{raw:/,t[A-ZĐ]/.test(t)||/,tCông lao/.test(t),rows:el.querySelectorAll('.kchecks').length,ov:document.documentElement.scrollWidth>innerWidth+1}});
  chk('3 cung nữ «Thân phận» tab: road rows as kit rows (no raw array text), steps via kitChecks, no h-overflow',!r.raw&&r.rows>=1&&!r.ov,r);await p.context().close()}
 const f=ok.filter(x=>!x[1]).map(x=>x[0]);console.log(JSON.stringify({pass:ok.length-f.length,fail:f}),'errors:',JSON.stringify(errs.slice(0,6)));
 await b.close();process.exit(f.length||errs.length?1:0)})();
