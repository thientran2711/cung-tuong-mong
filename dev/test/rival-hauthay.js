/* rival hầu-thay (law 1 two-way, OD:L33 / L1534; law 4 one core): an NPC consort who sends her maid «hầu thay» on her night is bound by the
   SAME rule as her own «Tiến cử hầu thay» (j8 PEND.ksp option 2 → sendMaid):
   1 NPC sends (tablet night): the mistress gets NOTHING of the night (Sủng, Ân, nights / nightLog, jealousy pg, conception roll night(),
     prep spend Bạc / Sức, bestow, pillow talk, tablet kept); the maid gets the night (amNightGain) — same delta as the player's maid
   2 the player's «Tiến cử»: unchanged — she gets nothing of the night, her maid gets the same gain (same Sắc → same number, Math.random fixed)
   3 a free seat: the maid is raised Đáp ứng, the raised maid holds the ONE night record of the day + the conception roll; the mistress none
   4 no «Tiến cử» on a night she took (Tranh sủng / Chặn ngự giá: nightWhy cause stolen) or on his visit (S.visNpc) — her cards offer none;
     amSendQ is not even asked and her night plays as before; the same when her maid is busy elsewhere (jptime ptMaidOut: nobody to send)
   5 her maids' «Hầu trà khi ngự giá» (amNightTea) runs only on HER night, not when her maid served in her place
   6 not sending: her night as before (nights +1, conception roll on her)
   7 agents off (amOn false → npcWhy fallback + j8 sendMaid): the same two-way result for her and the NPC
   usage: node dev/test/rival-hauthay.js <url or file>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,U0]=process.argv;const URL=/^(https?|file):/.test(U0)?U0:'file://'+require('path').resolve(U0);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof amOn==='function'&&typeof htCan==='function',null,{timeout:0});await p.waitForTimeout(2000);
 const r=await p.evaluate(()=>{const out={};window.__bot=1;
  const fresh=()=>{for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;S.ntk=null;S.visNpc=null};
  const pickV=()=>rivals.find(x=>x.alive&&!x.out&&x.maid&&!x.preg&&!x.coop);
  const tabletFor=v=>{S.nightWhy={wk:wk(),pick:v.id,flip0:v.id,cause:"tablet",rows:[]};S.ntk=null;S.visNpc=null};
  const snap=v=>({sung:v.sung,an:v.an,nights:v.nights||0,log:(v.nightLog||[]).length,preg:v.preg||0,bac:v.bac,suc:v.suc,pg:v.pg||0,tablet:v.tablet||0});
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  /* spies: night() (conception), bestow, amNightTea, amSendQ, sendMaid callers */
  const SP={night:[],bestow:0,tea:0,ask:0,send:[]};const ng0=night,bs0=bestow,at0=amNightTea,aq0=amSendQ,sm0=sendMaid,MR0=Math.random,rf0=roomFor,ao0=amOn,nw0=npcWhy;
  night=function(x){SP.night.push(x===S?"me":x&&x.id);return ng0.apply(this,arguments)};bestow=function(){SP.bestow++;return bs0.apply(this,arguments)};
  amNightTea=function(){SP.tea++;return at0.apply(this,arguments)};sendMaid=function(a){SP.send.push(a===S?"me":a&&a.id);return sm0.apply(this,arguments)};
  const reset=()=>{SP.night=[];SP.bestow=0;SP.tea=0;SP.ask=0;SP.send=[]};
  const askAs=ans=>{amSendQ=function(){SP.ask++;return ans}};
  const maidPrep=m=>{m.sac=40;m.tai=40;m.sung=0;delete m.fav};
  try{
   /* 1 + 2: NPC and player, seats full (the maid stays, favoured), R fixed */
   fresh();let v=pickV();tabletFor(v);maidPrep(v.maid);const vm=v.maid;const a0=snap(v);reset();askAs(true);roomFor=()=>false;Math.random=()=>.3;
   const txt=rivalNight(v);const a1=snap(v);
   out.npc={same:same(a0,a1),a0,a1,night:SP.night.slice(),bestow:SP.bestow,tea:SP.tea,send:SP.send.slice(),maidSung:vm.sung,fav:!!vm.fav,htCan:htCan(v),txt:txt.slice(0,160)};
   S.tonight="me";maidPrep(S.maid);const pm=S.maid;const s0=snap(S);reset();const d=PEND.ksp();const opt=d.o[1];opt.go();const s1=snap(S);
   out.me={same:same(s0,s1),s0,s1,tonight:S.tonight,night:SP.night.slice(),send:SP.send.slice(),maidSung:pm.sung,fav:!!pm.fav,opt:opt.n};
   Math.random=MR0;
   /* 3 a free seat: the maid raised holds the one record + conception roll */
   fresh();v=pickV();tabletFor(v);const b0=snap(v);reset();askAs(true);roomFor=()=>true;const n0=rivals.length;rivalNight(v);roomFor=rf0;const nw=rivals.length>n0?rivals[rivals.length-1]:null;
   const all=[S].concat(rivals);out.rise={same:same(b0,snap(v)),rose:!!nw,nwN:nw&&nw.nights,nwRoll:!!nw&&SP.night.includes(nw.id),vRoll:SP.night.includes(v.id),
    day:all.reduce((s,x)=>s+((x.nightLog||[]).filter(z=>z===wk()).length),0)};
   /* 1b the real entry: S.tonight = her, resolveTonight (j75 writes S.ntk for the holder, jagmaid / jnf wrappers) → she sends, no night of her own */
   fresh();v=pickV();tabletFor(v);S.tonight=v;const r0=snap(v);reset();askAs(true);roomFor=()=>false;resolveTonight();roomFor=rf0;
   out.entry={same:same(r0,snap(v)),ask:SP.ask,send:SP.send.slice(),night:SP.night.slice(),ntk:!!(S.ntk&&S.ntk.who===v.id)};
   /* 4 stolen / visit / maid busy: no «Tiến cử» */
   const K={};for(const k of ["stolen","visit"]){fresh();v=pickV();tabletFor(v);if(k==="stolen")S.nightWhy.cause="stolen";if(k==="visit")S.visNpc={w:wk(),id:v.id};
    const c0=snap(v);reset();askAs(true);rivalNight(v);K[k]={can:htCan(v),ask:SP.ask,send:SP.send.length,nights:(v.nights||0)-c0.nights,roll:SP.night.includes(v.id)}}{fresh();v=pickV();tabletFor(v);const po=window.ptMaidOut;window.ptMaidOut=x=>x===v;const c0=snap(v);reset();askAs(true);try{rivalNight(v)}finally{window.ptMaidOut=po}
    K.busy={can:null,ask:SP.ask,send:SP.send.length,nights:(v.nights||0)-c0.nights,roll:SP.night.includes(v.id)}}out.took=K;
   /* 5 + 6 not sending: her night as before, her maids' tea asked */
   fresh();v=pickV();tabletFor(v);const e0=snap(v);reset();askAs(false);rivalNight(v);out.keep={nights:(v.nights||0)-e0.nights,log:(v.nightLog||[]).length-e0.log,roll:SP.night.includes(v.id),tea:SP.tea,ask:SP.ask};
   /* 7 agents off: fallback npcWhy + j8 sendMaid, both ways */
   fresh();v=pickV();tabletFor(v);amOn=()=>false;npcWhy=function(k){return k==="sendMaid"?{s:1,r:"x"}:nw0.apply(this,arguments)};roomFor=()=>false;
   const f0=snap(v);reset();rivalNight(v);const f1=snap(v);const fN={same:same(f0,f1),night:SP.night.slice(),send:SP.send.slice()};
   S.tonight="me";const g0=snap(S);reset();PEND.ksp().o[1].go();out.off={npc:fN,me:{same:same(g0,snap(S)),tonight:S.tonight,night:SP.night.slice(),send:SP.send.slice()}};
  }finally{night=ng0;bestow=bs0;amNightTea=at0;amSendQ=aq0;sendMaid=sm0;Math.random=MR0;roomFor=rf0;amOn=ao0;npcWhy=nw0}
  return out});
 const T=[];const ck=(c,m,x)=>{T.push(!!c);console.log((c?"PASS":"FAIL")+" | "+m+" "+JSON.stringify(x))};
 const n=r.npc,m=r.me;
 ck(n.same&&!n.night.length&&!n.bestow&&n.htCan,"1 NPC hầu thay: the mistress gets nothing of the night (Sủng/Ân/nights/pg/conception/prep/bestow/tablet)",n);
 ck(n.send.length===1&&n.fav&&n.maidSung>0&&n.tea===0,"1 NPC hầu thay: the maid serves (one sendMaid), gets his regard, favoured; no tea on a night that is not hers",{send:n.send,maidSung:n.maidSung,fav:n.fav,tea:n.tea});
 ck(m.same&&m.tonight===null&&!m.night.length&&m.send.join()==="me"&&/hầu thay/.test(m.opt),"2 player «Tiến cử»: unchanged — she gets nothing of the night, the one sendMaid",m);
 ck(m.maidSung===n.maidSung&&m.fav===n.fav,"2 two-way: her maid and the NPC's maid get the SAME night gain from the same code (same Sắc, same roll)",{me:m.maidSung,npc:n.maidSung});
 ck(r.entry.same&&r.entry.ask===1&&r.entry.send.length===1&&!r.entry.night.length,"1b real entry resolveTonight (S.ntk written for the holder): she sends, no night of her own",r.entry);
 ck(r.rise.same&&r.rise.rose&&r.rise.nwN===1&&r.rise.nwRoll&&!r.rise.vRoll&&r.rise.day===1,"3 free seat: the raised maid holds the one night record + the conception roll; the mistress none",r.rise);
 for(const k of ["stolen","visit","busy"]){const x=r.took[k];ck(!x.can&&x.ask===0&&x.send===0&&x.nights===1&&x.roll,`4 ${k}: a night she took / his visit / her maid busy elsewhere (jptime) offers no «Tiến cử»; her night plays`,x)}
 ck(r.keep.nights===1&&r.keep.log===1&&r.keep.roll&&r.keep.tea===1&&r.keep.ask===1,"5+6 not sending: her night as before (record, conception roll, her maids' tea)",r.keep);
 ck(r.off.npc.same&&!r.off.npc.night.length&&r.off.npc.send.length===1&&r.off.me.same&&r.off.me.tonight===null&&r.off.me.send.join()==="me","7 agents off: the same two-way result (npcWhy + j8 sendMaid)",r.off);
 console.log("page errors:",errs.length,errs.slice(0,3));const pass=T.every(Boolean)&&!errs.length;console.log(pass?"ALL PASS":"FAILED",T.filter(Boolean).length+"/"+T.length);
 await b.close();process.exit(pass?0:1)})();
