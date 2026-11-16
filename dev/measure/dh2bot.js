/* Title system phase 2 bot (jdh2.js, review/title-sys2). usage: node dev/measure/dh2bot.js <url of dev/index.html or root index.html> [lives=4] [weeks=216]
   The world runs as usual (every dialog dropped, as the other bots), she answers the atonement dialog "Dâng biểu sám hối" when it comes.
   Prints per life and in total: hiệu granted (her / NPC, by route), month of her first hiệu, confiscations (kind, hiệu / title taken),
   atonements opened / restored (her / NPC, road), book/seal losses (cases, rival share), lost-for-good penalties, census repairs;
   CONSERVATION at the end of every life: every hiệu (held or confiscated) has exactly one Sắc phong and one Ngọc ấn somewhere; page errors. */
const {chromium}=require('playwright');const [,,URL,LIVES,WEEKS,ME]=process.argv;/* ME=me: she starts as a Phi with the hiệu thresholds met (her own path) */
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{timeout:0});await p.addStyleTag({content:'#kroul,#kroulw,#kload,.krbox,#dawn,#curtain,.fxo{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof dhHieuOK==='function',null,{timeout:0});
 const r=await p.evaluate(([L,W,M])=>{document.getElementById('title').hidden=true;
  const T={lives:0,weeks:0,grant:{me:0,npc:0},route:{},firstMonth:[],conf:{},confHieu:0,confTitle:0,confMe:0,open:0,restore:{me:0,npc:0},lose:{me:0,npc:0,riv:0},pen:0,repair:0,bad:[],npcHieuEnd:[]};
  const g0=dhHieuGrant;dhHieuGrant=window.dhHieuGrant=function(pp,why){const h=g0.apply(this,arguments);if(h){T.grant[pp===S?"me":"npc"]++;T.route[why]=(T.route[why]||0)+1;if(pp===S&&!T._f){T._f=1;T.firstMonth.push(S.turn)}}return h};
  const c0=dhConfiscate;dhConfiscate=window.dhConfiscate=function(pp,kind){const o=c0.apply(this,arguments);if(o){T.conf[kind]=(T.conf[kind]||0)+1;if(o.hieu)T.confHieu++;if(o.title)T.confTitle++;if(pp===S)T.confMe++}return o};
  const r0=dhRestore;dhRestore=window.dhRestore=function(pp){T.restore[pp===S?"me":"npc"]++;return r0.apply(this,arguments)};
  const l0=dhLose;dhLose=window.dhLose=function(pp){const c=l0.apply(this,arguments);if(c){T.lose[pp===S?"me":"npc"]++;if(c.cause==="riv")T.riv=(T.riv||0)+1}return c};
  const pd0=pushDil;pushDil=function(d,t){if(d&&d.pid==="dhatone"){try{d.o[0].go()}catch(e){}return""}return pd0.apply(this,arguments)};
  const check=()=>{const P=[S].concat(rivals.filter(v=>v&&!v.coop));for(const q of P){const h=q.hieu||(q.dhConf&&q.dhConf.hieu);if(!h)continue;const own=q===S?"me":String(q.id);
    for(const k of ["sacphong","ngocan"]){const ids=[];const m=e=>{if(e&&e.dhid&&e.k===k&&e.own===own)ids.push(e.dhid)};for(const x of P)(x.inv||[]).forEach(m);((S.il&&S.il.box)||[]).forEach(x=>m(x.e));
     const inv=new Set(ids);(S.lost||[]).forEach(c=>{if(c.st!=="done"&&c.e&&!inv.has(c.e.dhid))m(c.e)});const n=ids.length;if(n!==1)T.bad.push(`w${wk()} ${own}${q.alive===false?"(dead)":q.out?"(out)":""}:${k}=${n}`)}}};
  for(let l=0;l<L;l++){for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();let ok=false;try{ok=!isSrv()}catch(e){}if(ok)break}T.lives++;T._f=0;if(M){S.rank=4;S.lastPromo=S.turn-3;const N=dhHieuNeed(S);S.sung=N.sung+5;S.danh=N.danh+5}
   for(let w=0;w<W&&!S.dead;w++){Q.length=0;try{endTurn()}catch(e){console.error(e)}T.weeks++;if(w%12===11)check()}
   const pens=(S.lost||[]).filter(c=>c.dh&&c.dhPen).length;T.pen+=pens;T.repair+=((S.il&&S.il.box)||[]).filter(x=>x.dh&&x.why==="net").length;
   T.open+=[S].concat(rivals).filter(q=>q&&q.dhConf&&q.dhConf.open).length;check();T.npcHieuEnd.push(rivals.filter(v=>v&&v.alive!==false&&v.hieu).length);Q.length=0}
  delete T._f;T.bad=T.bad.slice(0,20);return T},[+(LIVES||4),+(WEEKS||216),ME==='me']);
 console.log(JSON.stringify({r,errs:errs.slice(0,8)},null,1));await b.close()})();
