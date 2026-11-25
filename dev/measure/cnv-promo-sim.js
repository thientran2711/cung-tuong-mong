/* cnv-exit-promo (2): is the cung nữ promotion road (j42 srvMonth: Công lao ≥ srvMpNeed(rk) = (rk+1)*BAL.srvMp, Chủ tin ≥ BAL.srvx.tinUp,
   rk < srvMax() (srkMax of the master), then the Nội vụ phủ exam jexam exSrvGate, window BAL.ex.win weeks, pass bar BAL.ex.srvBar) reachable?
   Headless lives on the built dev/index.html (exam auto-simulated: window.__exAuto=1, same odds as the kit card).
   policy work = a sensible cautious maid: each buổi plays the exam card when open, else up to `per` cards that give Công lao / Chủ tin
             and cost no harm (x without hỏng-risk words); dialogs: first answer that is not a life-exit road and loses no Chủ tin if one exists.
   policy idle = never plays a card (the robot «quiet» bot), dialogs as above.
   usage: node dev/measure/cnv-promo-sim.js <url-of-dev/index.html> [lives=4] [years=7] [policy=work,idle] */
const {chromium}=require('playwright');
const [,,URL,N0,Y0,P0]=process.argv;const N=+(N0||4),YRS=+(Y0||7),POL=(P0||'work,idle').split(',');
(async()=>{const b=await chromium.launch();const out=[];
 for(const pol of POL)for(let li=0;li<N;li++){const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{window.__nlInner=1;window.__exAuto=1;window.__bot=1});const p=await ctx.newPage();
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1000);
  const r=await p.evaluate(async([pol,YRS])=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   window.__forceOrigin="cnv";for(let i=0;i<20;i++){start();if(isSrv())break}Q.length=0;render=()=>{};/* headless: no drawing */
   const EX=/xuất cung|về quê|kết thúc|xuất giá|thành thân|vương phủ|tự vẫn|bỏ trốn|cao chạy/i;const y0=S.year;const Y=[];let lauM=0,lauN=0,inLau=0,err="",promos=[];
   const pick=m=>{const ok=m.opts.map((o,k)=>[o,k]).filter(([o])=>!o.off&&!EX.test((o.n||'')+' '+(o.x||''))&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));const safe=ok.filter(([o])=>!(o.fx&&o.fx.tin<0));return (safe[0]||ok[0]||[null,0])[1]};
   const good=a=>a&&!a.done&&!a.off&&/công lao|Chủ tin \+|Chủ tin<\/b> \+/i.test(String(a.x||'')+' '+String(a.t||''))&&!/hỏng|bị phạt|Tân Giả/i.test(String(a.x||''));
   let g=0,lastRk=S.srv.rk;
   while(!S.dead&&!S.over&&S.year-y0<YRS&&g<40000){g++;
    if(Q.length){const m=Q[0];try{if(m.opts)chooseM(pick(m));else closeModal()}catch(e){Q.shift()}continue}
    if(pol==='work'){let n=0;for(let i=0;i<deck.length&&n<3;i++){const a=deck[i];if(!a||a.done)continue;if(a.exam===2||good(a)){try{act(i)}catch(e){}n++;if(Q.length)break}}if(Q.length)continue}
    const t=S.turn;try{S.mg=null;nextBuoi()}catch(e){err=err||e.message;break}
    if(S.turn!==t){if(S.srv.lau>0){lauM++;if(!inLau){lauN++;inLau=1}}else inLau=0;
     if(S.srv.rk!==lastRk){promos.push((S.srv.rk>lastRk?'+':'-')+S.srv.rk+'@y'+(S.year-y0+1)+'m'+S.month);lastRk=S.srv.rk}
     if(S.month===1)Y.push({y:S.year-y0,rk:S.srv.rk,tin:S.tin|0,mp:Math.floor(S.srv.mp),need:srvMpNeed(S.srv.rk),max:srvMax(),danh:S.danh|0,lau:S.srv.lau})}}
   const X=window.__exN||{};return{g,turn:S.turn,buoi:S.buoi,mg:!!S.mg,Q0:Q[0]&&Q[0].t,pol,end:S.dead?'dead':S.over?'over':'alive',age:S.age,rk:S.srv.rk,title:SRK.maid[S.srv.rk],tin:S.tin|0,danh:S.danh|0,lauN,lauM,exSit:X.srvSit||0,exPass:X.srvPass||0,promos,Y,err}},[pol,YRS]).catch(e=>({pol,err:e.message.slice(0,200)}));
  out.push(r);console.log(JSON.stringify(r));await ctx.close()}
 await b.close()})();
