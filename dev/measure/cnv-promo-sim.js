/* cnv-exit-promo (2): is the cung nữ promotion road (j42 srvMonth: Công lao ≥ srvMpNeed(rk) = (rk+1)*BAL.srvMp, Chủ tin ≥ BAL.srvx.tinUp,
   rk < srvMax() (srkMax of the master), then the Nội vụ phủ exam jexam exSrvGate, window BAL.ex.win weeks, pass bar BAL.ex.srvBar) reachable?
   Headless lives on the built dev/index.html (exam auto-simulated: window.__exAuto=1, same odds as the kit card).
   policy work = a sensible cautious maid: each buổi plays the exam card when open, else up to `per` cards that give Công lao / Chủ tin
             and cost no harm (x without hỏng-risk words); dialogs: first answer that is not a life-exit road and loses no Chủ tin if one exists.
   policy idle = never plays a card (the robot «quiet» bot), dialogs as above.
   usage: node dev/measure/cnv-promo-sim.js <url-of-dev/index.html> [lives=4] [years=7] [policy=work,idle] */
/* review/srv-rank: policy climb = work + once a month, when she has OUTGROWN the house (at the cap below Nữ quan, Công lao full), «Xin chủ cho đi hầu cung khác» if the card is open (srvTalk mis); stuck = months trusted (Chủ tin >= BAL.sp.leaveLoyal) at the cap below Nữ quan, stuckMax = the longest such run; capM = months at her
   house's cap; midN = house changes; moves / dem / kept = the master's answers; mrk = master rank in the yearly rows */
const {chromium}=require('playwright');
const [,,URL,N0,Y0,P0]=process.argv;const N=+(N0||4),YRS=+(Y0||7),POL=(P0||'work,idle').split(',');
(async()=>{const b=await chromium.launch();const out=[];
 for(const pol of POL)for(let li=0;li<N;li++){const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{window.__nlInner=1;window.__exAuto=1;window.__bot=1});const p=await ctx.newPage();
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1000);
  await p.evaluate(([pol])=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   window.__forceOrigin="cnv";for(let i=0;i<20;i++){start();if(isSrv())break}Q.length=0;render=()=>{};/* headless: no drawing */
   window.W={};const EX=/xuất cung|về quê|kết thúc|xuất giá|thành thân|vương phủ|tự vẫn|bỏ trốn|cao chạy/i;window.W={y0:S.year,Y:[],lauM:0,lauN:0,inLau:0,err:'',promos:[],lastRk:S.srv.rk,lvT:-1,stuck:0,stuckMax:0,lvLock:0,lvAsk:0,moves:[],dem:0,kept:0,mid0:S.srv.mid,midN:0,lastMid:S.srv.mid,capM:0};
   const pick=m=>{const ok=m.opts.map((o,k)=>[o,k]).filter(([o])=>!o.off&&!EX.test((o.n||'')+' '+(o.x||''))&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));const safe=ok.filter(([o])=>!(o.fx&&o.fx.tin<0));return (safe[0]||ok[0]||[null,0])[1]};
   const good=a=>a&&!a.done&&!a.off&&/công lao|Chủ tin \+|Chủ tin<\/b> \+/i.test(String(a.x||'')+' '+String(a.t||''))&&!/hỏng|bị phạt|Tân Giả/i.test(String(a.x||''));
window.W.pick=pick;window.W.good=good;window.W.EX=EX},[pol]);
  let r;for(let yy=0;yy<YRS;yy++){const t0=Date.now();const st=await Promise.race([new Promise(r=>setTimeout(()=>r({err:'HANG: one year > 240 s in page'}),240000)),p.evaluate(([pol])=>{const W=window.W,pick=W.pick,good=W.good;   const yEnd=S.year+1;let g=0;while(!S.dead&&!S.over&&S.year<yEnd&&g<6000){g++;
    if(Q.length){const m=Q[0];try{if(m.opts)chooseM(pick(m));else closeModal()}catch(e){Q.shift()}continue}
    if(pol==='climb'&&S.turn!==W.lvT&&isSrv()&&!(S.srv.lau>0)&&S.srv.rk>=srvMax()&&S.srv.rk<BAL.srvRk.nq&&S.srv.mp>=srvMpNeed(S.srv.rk)){W.lvT=S.turn;try{const o=srvTalk({kind:'srv',sk:'mis'}).find(x=>x.n==='Xin chủ cho đi hầu cung khác');if(o){if(o.lock)W.lvLock++;else{W.lvAsk++;const m0=S.srv.mid,r0=S.srv.rk;o.run();if(S.srv.mid!==m0)W.moves.push('mv@y'+(S.year-W.y0+1)+'m'+S.month+':rk'+S.srv.rk);else if(S.srv.rk<r0)W.dem++;else W.kept++}}}catch(e){W.err=W.err||('lv '+e.message)}if(Q.length)continue}
    if(pol==='work'||pol==='climb'){let n=0;for(let i=0;i<deck.length&&n<3;i++){const a=deck[i];if(!a||a.done)continue;if(a.exam===2||good(a)){try{act(i)}catch(e){}n++;if(Q.length)break}}if(Q.length)continue}
    const t=S.turn;try{S.mg=null;nextBuoi()}catch(e){W.err=W.err||e.message;break}
    if(S.turn!==t){if(S.srv.lau>0){W.lauM++;if(!W.inLau){W.lauN++;W.inLau=1}}else W.inLau=0;
     if(S.srv.mid!==W.lastMid){W.midN++;W.lastMid=S.srv.mid}if(isSrv()&&S.srv.rk>=srvMax())W.capM++;if(isSrv()&&!(S.srv.lau>0)&&S.srv.rk>=srvMax()&&S.srv.rk<BAL.srvRk.nq&&(S.tin|0)>=BAL.sp.leaveLoyal){W.stuck++;W.stk=(W.stk||0)+1;W.stuckMax=Math.max(W.stuckMax||0,W.stk)}else W.stk=0;
     if(S.srv.rk!==W.lastRk){W.promos.push((S.srv.rk>W.lastRk?'+':'-')+S.srv.rk+'@y'+(S.year-W.y0+1)+'m'+S.month);W.lastRk=S.srv.rk}
     if(S.month===1&&isSrv())W.Y.push({y:S.year-W.y0,rk:S.srv.rk,tin:S.tin|0,mp:Math.floor(S.srv.mp),need:srvMpNeed(S.srv.rk),max:srvMax(),mrk:rkOf(srvM()),danh:S.danh|0,lau:S.srv.lau})}}
return{g,y:S.year-W.y0,age:S.age,rk:S.srv.rk,end:S.dead||S.over}},[pol]).catch(e=>({err:e.message.slice(0,150)}))]);console.error('  ',pol,li,'year',yy+1,JSON.stringify(st),Math.round((Date.now()-t0)/1000)+'s');if(String(st.err).startsWith('HANG')){r={pol,err:st.err,hangYear:yy+1};break}if(st.err||st.end)break}
  if(!r)r=await p.evaluate(()=>{const W=window.W;const X=window.__exN||{};return{end:S.dead?'dead':S.over?'over':'alive',age:S.age,rk:S.srv.rk,title:SRK.maid[S.srv.rk],tin:S.tin|0,danh:S.danh|0,lauN:W.lauN,lauM:W.lauM,exSit:X.srvSit||0,exPass:X.srvPass||0,promos:W.promos,Y:W.Y,err:W.err,srv:isSrv(),risen:!!(S.srv&&S.srv.risen),mama:!!(S.srv&&S.srv.mama),capM:W.capM,stuck:W.stuck,stuckMax:W.stuckMax,midN:W.midN,lvAsk:W.lvAsk,lvLock:W.lvLock,moves:W.moves,dem:W.dem,kept:W.kept}}).catch(e=>({err:e.message.slice(0,200)}));r.pol=pol;
  out.push(r);console.log(JSON.stringify(r));await ctx.close().catch(()=>{})}
 await b.close()})();
