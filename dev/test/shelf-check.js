/* dev/test/shelf-check.js — DISPLAY SHELF (jshelf.js) checks, review/display-shelf. Run after dev/site/build_site.sh:  node dev/test/shelf-check.js
   1 lock · 2 dwelling xa xỉ table (ranks × scores) · 3 visitor effects table · 4 NPC visit timeline (agent "call" deed lands at her palace)
   5 accuse path (proof / rumour / false charge / NPC) · 6 plants (no servant → withered → dead pot; loyal servant keeps it) · 7 water minigame
   8 old save (no p.shelf) · 9 item ledger (jil census keeps displayed pieces). Exit 1 on any FAIL. Prints tables for the report. */
const {chromium}=require('playwright');const D=require('./lib/device');
const sl=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,srv.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
 await g.evaluate(()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<40;i++){window.__forceOrigin=null;start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}window.__nlInner=0;
  ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});for(let j=0;j<10&&Q.length;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(0);else closeModal()}catch(e){Q.shift()}}});
 const R=await g.evaluate(()=>{const out={fail:[],T:{}};const F=(c,m)=>{if(!c)out.fail.push(m)};const v=liveRivals(false).filter(x=>x.alive)[0],w=liveRivals(false).filter(x=>x.alive)[1];
  /* 1 LOCK */
  S.inv.push({k:"chuongngoc",from:"emp"});const ix=S.inv.length-1;const e=S.inv[ix];const r1=shelfPut(S,ix);F(r1.ok,"put failed: "+r1.why);F(!S.inv.includes(e),"displayed entry still in chest");
  F(!kitShopSellable(S).some(x=>x.k==="chuongngoc"),"displayed piece sellable");F(ilSlots(S).includes(e),"ledger lost the displayed piece");
  S.inv.push({k:"chuonggio"});const r2=shelfPut(S,S.inv.length-1);F(r2.ok&&r2.old==="Chuông gió lưu ly"&&S.inv.includes(e),"same group swap did not return the old piece");
  S.inv.push({k:"vongngoc",w:1});F(shelfWhyNot(S,S.inv[S.inv.length-1])!=="","worn / non-décor piece accepted");S.inv.pop();
  const tk=shelfTake(S,"chuong");F(tk&&S.inv.some(x=>x.k==="chuonggio"),"take down failed");out.T.lock={put:r1.ok,swap:r2.old,take:tk};
  /* 2 DWELLING TABLE: for each rank, the level word for a set of scores (allowance hidden from the player; numbers for the report only) */
  const keep={rank:S.rank,g:JSON.stringify(shelfOf(S).g)};out.T.lux=[];
  for(const rk of [0,2,4,7]){S.rank=rk;const row={rank:rk,bud:shelfLux(S).bud,lv:{}};for(const set of [[],["remtruc"],["remchau","binhsu"],["remchau","bpthue","nhuy","chuongngoc","binhsu","caytung"]]){shelfOf(S).g={};for(const k of set){S.inv.push({k});shelfPut(S,S.inv.length-1)}const x=shelfLux(S);row.lv[set.join("+")||"(none)"]=x.sc+" "+x.name}out.T.lux.push(row)}
  S.rank=keep.rank;shelfOf(S).g={};
  F(out.T.lux[0].lv["remchau+bpthue+nhuy+chuongngoc+binhsu+caytung"].includes("Quá xa xỉ"),"rank 0 full shelf not Quá xa xỉ");
  /* 3 EFFECTS: a superior and a peer see a lavish room; then a fitting one */
  const sup=liveRivals(true).find(x=>x.alive&&rkOf(x)>S.rank)||null,peer=liveRivals(true).find(x=>x.alive&&rkOf(x)<=S.rank)||v;
  for(const k of ["remchau","bpthue","nhuy","chuongngoc","binhsu"]){S.inv.push({k,from:k==="nhuy"?"emp":"me"});shelfPut(S,S.inv.length-1)}
  const a0=sup?sup.rel:0,g0=peer.ghen||0;if(sup){sup.shR={};shelfSee(sup,S,"test")}peer.shR={};shelfSee(peer,S,"test");
  out.T.fx={lv:shelfLux(S).name,supRel:sup?[a0,sup.rel]:"no superior",peerGhen:[g0,peer.ghen],peerProof:!!(peer.shn&&peer.shn.me&&peer.shn.me.pf)};
  F(!sup||sup.rel<a0,"superior did not frown on a lavish room");F(peer.ghen>g0,"peer did not envy");
  /* mood */
  S.emo=null;shelfMood(S);out.T.mood=S.emo?S.emo.k+" "+S.emo.v+" ("+S.emo.why+")":"none";F(S.emo&&S.emo.k==="vui","lavish room did not lift her mood");
  /* 5 ACCUSE: proof (visit) → act ok; rumour only → not ok; false charge when the room is within allowance */
  F(!!(ACT.xx&&ACT.xx.ok(peer,S)),"Tố xa xỉ not open to a visitor with proof");
  const rm=w&&w!==peer?w:liveRivals(true).find(x=>x!==peer&&x.alive);if(rm){rm.shn={};shelfLook(rm,S,"tin đồn",false);F(!ACT.xx.ok(rm,S)||(typeof dressNow==="function"&&dressNow(rm,S)),"a rumour counted as proof")}
  const st0=shelfList(S).length;const res=shelfAccuse(peer,S);out.T.acc={res:res.replace(/<[^>]+>/g,""),left:[st0,shelfList(S).length]};
  shelfOf(S).g={};S.inv.push({k:"remtruc"});shelfPut(S,S.inv.length-1);peer.shn={me:Object.assign(shelfRec(S,"test",true),{sc:999})};/* a belief the inquiry will not bear out */const fr=shelfAccuse(peer,S);out.T.accFalse=fr.replace(/<[^>]+>/g,"");F(/không quá mức/.test(fr),"false charge not detected");
  /* NPC → NPC: same act both ways */
  const n1=liveRivals(true).filter(x=>x.alive&&!x.out).sort((a,b)=>rkOf(b)-rkOf(a));if(n1.length>=2){const A1=n1[0],B1=n1[1];shelfOf(B1).g={};for(const k of ["remchau","bpthue","nhuy","chuongngoc","binhsu","caytung","dancoc","tranhco"]){B1.inv=B1.inv||[];B1.inv.push({k});shelfPut(B1,B1.inv.length-1)}
   A1.shn={};shelfSee(A1,B1,"test");out.T.npcAcc={ok:!!ACT.xx.ok(A1,B1),lv:shelfLux(B1).name,a:rkOf(A1),b:rkOf(B1)};F(shelfLux(B1).lv<2||out.T.npcAcc.ok,"NPC with proof cannot accuse an NPC")}
  /* 6 PLANTS: no servant → withers → dead pot; a loyal servant keeps it */
  shelfOf(S).g={};S.inv.push({k:"lanquy"});shelfPut(S,S.inv.length-1);const st=S.staff,md=S.maid;S.staff=[];S.maid=null;const tl=[];
  for(let i=0;i<12;i++){shelfPlantWeek(S);const e2=shelfOf(S).g.cay;tl.push(e2.k==="caykho"?"dead":Math.round(e2.pc))}out.T.plantNone=tl.join(" ");F(shelfOf(S).g.cay.k==="caykho","neglected plant did not die");
  shelfOf(S).g={};S.inv.push({k:"lanquy"});shelfPut(S,S.inv.length-1);S.maid={name:"Thử",loyal:90};const tl2=[];for(let i=0;i<12;i++){shelfPlantWeek(S);tl2.push(Math.round(shelfOf(S).g.cay.pc))}
  out.T.plantLoyal=tl2.join(" ");F(shelfOf(S).g.cay.pc>=BAL.shelf.plant.wither,"loyal servant let the plant wither");
  S.maid={name:"Lười",loyal:10,traits:["Lười biếng"]};shelfOf(S).g.cay.pc=80;const tl3=[];for(let i=0;i<8;i++){shelfPlantWeek(S);tl3.push(Math.round(shelfOf(S).g.cay.pc))}out.T.plantLazy=tl3.join(" ");
  S.staff=st;S.maid=md;
  /* 8 OLD SAVE: people without p.shelf (old save) run the week */
  for(const x of [S].concat(rivals))delete x.shelf;let ok8=true;try{shelfWeek();shelfView(S);shelfView(v)}catch(e){ok8=false;out.fail.push("old save week: "+e.message)}out.T.oldSave=ok8;
  /* 9 LEDGER census with displayed pieces */
  try{ilCensus();out.T.ledger="ok"}catch(e){out.fail.push("ilCensus: "+e.message)}
  return out});
 /* 7 WATER GAME: stop inside the band each round → score 1 */
 const wg=await g.evaluate(()=>new Promise(res=>{const box=document.createElement('div');document.body.appendChild(box);let n=0;shelfWaterGame(box,s=>res(s));
   const iv=setInterval(()=>{const lv=SHPC.peek?SHPC.peek():0;if(lv>=BAL.shelf.plant.game.band[0]&&lv<=BAL.shelf.plant.game.band[1]){const b2=box.querySelector('[data-shw]');if(b2){b2.click();n++}}if(n>=BAL.shelf.plant.game.rounds)clearInterval(iv)},40)}));
 R.T.waterScore=wg;if(!(wg>=0.99))R.fail.push('water game in-band score '+wg);
 /* 4 NPC VISIT TIMELINE: play buổi until an agent "call" lands; record who/where/khắc */
 const tl=[];for(let i=0;i<40;i++){const r=await g.evaluate(async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));for(let j=0;j<6;j++){Q.length=0;S.mg=null;try{closeModal()}catch(e){}try{nextBuoi()}catch(e){}await sl(30);try{if(typeof agFlush==='function')agFlush()}catch(e){}
    /* the khắc pass: land what is due (the loop lands a planned deed when its khắc passes; here we pass the whole buổi) */try{for(const q of (S.ag&&S.ag.pend||[]).slice())agLand(q)}catch(e){}}
   const L=((S.ag||{}).log||[]).filter(x=>x.k==="call");return{w:wk(),b:S.buoi,dead:S.dead,calls:L.map(x=>`w${x.w} b${x.b} k${x.kh} ${x.id}→${x.t}@${x.pl}`),seenMe:liveRivals(true).filter(x=>x.shn&&x.shn.me).length,by:Object.assign({},(window.AG&&AG.stat.by)||{}),agOn:typeof agOn==='function'&&agOn()}});
  tl.push(r);if(r.calls.some(c=>/→me@/.test(c)))break}
 const last=tl[tl.length-1];R.T.visits=last;if(!last.calls.some(c=>/→me@home/.test(c)))R.fail.push('no NPC came to HER room (Ghé chơi) in '+tl.length+' buổi');R.T.visitBuoi=tl.length;
 if(last.calls.some(c=>!/@(home|r\d+|kn)$/.test(c)))R.fail.push('a call landed away from a palace: '+last.calls.join('; '));
 const e2=errs.concat(await g.evaluate(()=>window.__qcErr||[]).catch(()=>[]));if(e2.length)R.fail.push('page errors: '+e2.slice(0,3).join(' | '));
 console.log(JSON.stringify(R.T,null,1));console.log(R.fail.length?'SHELF FAIL · '+R.fail.join(' · '):'SHELF PASS');await b.close();srv.close();process.exit(R.fail.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
