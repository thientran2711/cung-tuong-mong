/* review/srv-rank — side effect check on the CONSORT road: how often do servants ask to leave (her card «Kẻ hầu xin đi» from her own household,
   NPC masters' answers keep / demote / let) and how many servants change house, per game year — LIVE vs branch (BAL.srvCap).
   usage: node dev/measure/srv-rank-hh.js <URL> [lives=2] [months=24] [label] */
const {chromium}=require('playwright');
const [,,URL,N0,M0,LBL]=process.argv;const N=+(N0||2),MO=+(M0||24);
(async()=>{const b=await chromium.launch();const out=[];
 for(let li=0;li<N;li++){const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{window.__nlInner=1;window.__exAuto=1;window.__bot=1});const p=await ctx.newPage();
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1000);
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<40;i++){start();if(!isSrv()&&S.rank!=null&&!S.out)break}Q.length=0;render=()=>{};
   window.__hh={card:0,ask:0,moves:0,swaps:0,m0:S.turn};const c0=spLeaveCard;spLeaveCard=function(){window.__hh.card++;return c0.apply(this,arguments)};
   const a0=spAsk;spAsk=function(o,s){window.__hh.ask++;return a0.apply(this,arguments)};
   const mv=spMove;spMove=function(o,s,v){if(v)window.__hh.moves++;return mv.apply(this,arguments)}});
  const r=await p.evaluate(async(MO)=>{const t0=S.turn;let g=0;while(!S.dead&&!S.over&&S.turn-t0<MO&&g<20000){g++;
    if(Q.length){const m=Q[0];try{if(m.opts){const k=m.opts.findIndex(o=>!o.off&&!o.lock);chooseM(k<0?0:k)}else closeModal()}catch(e){Q.shift()}continue}
    try{S.mg=null;nextBuoi()}catch(e){return{err:e.message.slice(0,150)}}}
   const N=window.__stf2N||{};return{months:S.turn-t0,rank:S.rank,dead:!!S.dead,card:__hh.card,ask:__hh.ask,moves:__hh.moves,let:N.leave_let||0,keep:N.leave_keep||0,demote:N.leave_demote||0}},MO).catch(e=>({err:e.message.slice(0,150)}));
  out.push(r);console.error(JSON.stringify(r));await ctx.close().catch(()=>{})}
 const s=k=>out.reduce((a,r)=>a+(r[k]||0),0),mo=s('months')||1;
 console.log(`| ${LBL||URL} | ${out.length} lives, ${mo} months | her card «Kẻ hầu xin đi» ${(s('card')*12/mo).toFixed(2)}/yr | asks (all houses) ${(s('ask')*12/mo).toFixed(1)}/yr | NPC answers let/keep/demote ${s('let')}/${s('keep')}/${s('demote')} | servants changing house ${(s('moves')*12/mo).toFixed(1)}/yr |`);
 await b.close()})().catch(e=>{console.error(e);process.exit(2)});
