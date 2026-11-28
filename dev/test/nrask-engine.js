/* nrask-engine (Q1, review/questline-q1a): the help hồi reads NRASK (jnroad nrAskPick / nrAskOf) — engine checks on the BUILT game.
   1. kinds: with BAL.nroad.kinds (default, «bac» off) nrKind never deals «bac» for any chapter of any road (women + men templates);
      one key flip (kinds + "bac") deals it again where the cast maps to it.
   2. offer: an NPC consort at a help chapter that has asks → the queued j72 follow-up carries p.av ≥ 0 and its tid = nr_<ask kind>;
      the card text = that ask (slots filled, no «{»), step title / option labels / loss lines = the ask's, costs = the stock ones.
   3. every ask of every jnrask*.js file renders on a live quest (h, labels, loss lines) with no raw slot, no code, both voices
      (a peer consort tỷ/muội; the Hoàng hậu bổn cung/muội muội).
   4. fallback: a chapter with no ask (or av −1, or av of a kind that no longer matches) → today's stock card, unchanged.
   5. old save: a queued/active nr_* quest without p.av (and an old «nr_bac» quest) still opens, renders the stock text and plays to the end.
   6. played to the end: option 0 of an NRASK quest → her chapter bonus hb>0 (or an honest fail); betrayal → hb<0.
   usage: node dev/test/nrask-engine.js      (serves the built repo root; run bash dev/site/build_site.sh first) */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const D=require('./lib/device');
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ok=[];const errs=[];
 const chk=(n,c,x)=>{ok.push([n,!!c]);console.log((c?'PASS ':'FAIL ')+n);if(!c)console.error('   ',JSON.stringify(x).slice(0,1200))};
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
 p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
 await D.openDirect(p,srv.url);const g=p;
 await g.waitForFunction(()=>typeof start==='function'&&typeof nrAskPick==='function'&&window.NRASK,null,{timeout:0});await g.waitForTimeout(1500);
 const FS=require('fs'),PA=require('path');const BD=PA.join(__dirname,'..','build');const NRF=FS.readdirSync(BD).filter(f=>/^jnrask.*\.js$/.test(f)).sort();
 for(const f of NRF)await g.addScriptTag({content:FS.readFileSync(PA.join(BD,f),'utf8')});console.log('jnrask files scanned:',NRF.join(' '));
 const R=await g.evaluate(()=>{window.__sqoff=1;/* sideq-trim: content test, any asker (the rank gate has its own test) */const out={};document.getElementById('title').hidden=true;quiet=true;window.__forceOrigin='thd';start();quiet=false;Q.length=0;
  const roads=Object.keys(ROAD14).concat(Object.keys(NRM));
  /* 1. kinds */
  const seen={};for(const r of roads)for(let n=BAL.road.first;n<=BAL.road.last;n++){const A=nrCh(r,n);if(!A)continue;for(let t=0;t<6;t++){const k=nrKind(A);seen[k]=(seen[k]||0)+1}}
  out.kinds=seen;const K0=BAL.nroad.kinds.slice();BAL.nroad.kinds=K0.concat("bac");const seen2={};
  for(const r of roads)for(let n=BAL.road.first;n<=BAL.road.last;n++){const A=nrCh(r,n);if(A){const k=nrKind(A);seen2[k]=(seen2[k]||0)+1}}BAL.nroad.kinds=K0;out.kinds2=seen2;
  const L=liveRivals(false);const v=L[0],w=L[1];if(!v||!w)return{err:'no rivals'};
  const q=q72();const clear=()=>{q.ch.length=0;q.a.length=0};
  /* a live quest of v (or of the queen) on chapter id → X */
  const mk=(tid,av,id,asQ)=>{const m=id.match(/^(.+)_(\d+)$/);const road=m[1],n=+m[2];v.nr=v.nr||nrInit(v)||{};Object.assign(v.nr,{r:road,n,o:road.split('_')[0],c:w.id,hs:1,x:0});
   v.queen=!!asQ;const x=q72Make(T72I[tid],q72A(asQ?'hh':'rv',v.id));if(!x)return null;x.bk='rv';x.bi=w.id;x.p={nr:road,nn:n};if(av!=null)x.p.av=av;return x};
  const render=x=>{const X=q72X(x);const st=X.T.s[0];return{h:plain(q72Txt(X.T.h,X)),c:plain(q72Txt(st.n,X)),o:st.ch.map(o=>plain(q72Txt(o.n,X))),lx:st.ch.map(o=>o.lx?plain(q72Txt(o.lx,X)):''),
   cost:st.ch.map(o=>JSON.stringify(o.c||{})),ask:!!nrAskOf(X)}};
  /* 2. offer at a help chapter with asks */
  const id0=Object.keys(NRASK).find(k=>/^tt_co_/.test(k));const m0=id0.match(/^(.+)_(\d+)$/);clear();
  v.queen=false;v.nr=nrInit(v)||v.nr;Object.assign(v.nr,{r:m0[1],n:+m0[2],h:+m0[2],hs:0,c:w.id,x:0});S.st&&0;
  const offered=nrOffer(v);const c0=q.ch.find(c=>/^nr_/.test(c.tid));out.offer={offered,c0:c0&&{tid:c0.tid,p:c0.p},id0,kinds:[].concat(NRASK[id0]).map(a=>a.k)};
  /* 3. every ask renders, two voices */
  const bad=[];let n=0;const stock={};for(const k of Object.keys(T72I).filter(t=>/^nr_/.test(t))){const x=mk(k,-1,id0,false);if(x)stock[k]=render(x)}
  for(const id of Object.keys(NRASK))[].concat(NRASK[id]).forEach((a,i)=>{for(const asQ of [false,true]){clear();const x=mk('nr_'+a.k,i,id,asQ);if(!x){bad.push([id,i,'make']);continue}
   const r=render(x);n++;const txt=[r.h,r.c,...r.o,...r.lx].join(' | ');
   if(!r.ask||/[{}]|=>|function|undefined|null/.test(txt))bad.push([id,i,asQ,txt]);
   if(r.o[0]===stock['nr_'+a.k].o[0]||r.h===stock['nr_'+a.k].h)bad.push([id,i,'stock text shown',txt]);
   if(r.cost.join()!==stock['nr_'+a.k].cost.join())bad.push([id,i,'cost changed',r.cost]);
   if(asQ?!/bổn cung/i.test(r.h)&&/\{me\}/.test(a.h):false)bad.push([id,i,'queen voice',r.h]);
   if(i===0&&!asQ&&id===id0)out.sample=r;if(i===1&&asQ&&id===id0)out.sampleQ=r}});
  out.render={n,bad:bad.slice(0,8),nb:bad.length};
  /* 4. fallback: no ask / av −1 / av of another kind */
  const noAsk=roads.flatMap(r=>[5,6,7,8,9,10].map(k=>nrAskId(r,k))).find(id=>!NRASK[id]&&/_\d+$/.test(id)&&nrCh(id.replace(/_\d+$/,''),+id.match(/\d+$/)[0]));
  const fb=[];for(const [tid,av,id] of [['nr_emp',-1,id0],['nr_do',undefined,id0],[ 'nr_th',0,id0],['nr_hh',0,noAsk||id0]]){clear();const x=mk(tid,av,id,false);if(!x){fb.push([tid,'make']);continue}
   const r=render(x);const s0=stock[tid];const same=r.h===s0.h&&r.o.join()===s0.o.join();
   const shouldAsk=av!=null&&av>=0&&NRASK[id]&&[].concat(NRASK[id])[av]&&'nr_'+[].concat(NRASK[id])[av].k===tid;if(shouldAsk?same:!same)fb.push([tid,av,id,r.h])}
  out.fb={noAsk,bad:fb};
  /* 5. old save: nr_* quest without p.av and an old nr_bac one: open, render stock, play to the end */
  const old=[];for(const tid of ['nr_emp','nr_bac']){clear();const x=mk(tid,undefined,id0,false);if(!x){old.push([tid,'make']);continue}delete x.p.av;
   const s=JSON.parse(JSON.stringify(x));q.a.push(s);const r=render(s);if(r.ask||/[{}]/.test(r.h))old.push([tid,'not stock',r.h]);
   let t=0;S.bac=9999;S.suc=95;while(q.a.includes(s)&&t++<12){used=0;S.suc=95;Q.length=0;/* an NPC popup that landed while khắc passed (jagent) would block the step */q72Do(s.u,0)}if(q.a.includes(s))old.push([tid,'did not end'])}
  out.old=old;
  /* 6. played to the end with an ask: option 0 → hb>0 or honest fail; betrayal (option 2) → hb<0 */
  const play=[];for(const oi of [0,2]){clear();const a=[].concat(NRASK[id0])[0];const x=mk('nr_'+a.k,0,id0,false);v.nr.hb=0;q.a.push(x);let t=0;
   while(q.a.includes(x)&&t++<12){used=0;S.suc=95;S.bac=9999;Q.length=0;q72Do(x.u,oi)}const hist=q.h[0]&&q.h[0].res;play.push({oi,hb:v.nr.hb,hist,done:!q.a.includes(x)})}
  out.play=play;
  /* 7. no asker is sent to herself (NRSELF, whole family): for every chapter of every road, each self role, many draws → never its own kind;
     and the live offer of a queen consort never queues nr_hh */
  const self=[];for(const role of Object.keys(NRSELF))for(const r of roads)for(let n=BAL.road.first;n<=BAL.road.last;n++){const A=nrCh(r,n);if(!A)continue;
   for(let t=0;t<8;t++){const K=nrAskPick({r,n},A,role);if(NRSELF[role].includes(K.hk)){self.push([role,r,n,K]);break}}}
  let qOff=0;const qs=[];for(const id of Object.keys(NRASK)){const m=id.match(/^(.+)_(\d+)$/);if(!ROAD14[m[1]])continue;for(let t=0;t<3;t++){clear();v.queen=true;
   v.nr=v.nr||{};Object.assign(v.nr,{r:m[1],n:+m[2],h:+m[2],hs:0,c:w.id,x:0,o:m[1].split('_')[0]});if(nrOffer(v)){qOff++;const c=q.ch.find(c=>/^nr_/.test(c.tid));if(c&&c.tid==="nr_hh")qs.push(id)}}}
  /* 7b. the player is Hoàng hậu → nobody deals her an hh ask or stock card */
  const r0=S.rank;S.rank=BAL.voice.hq;const meQ=[];for(const r of roads)for(let n=BAL.road.first;n<=BAL.road.last;n++){const A=nrCh(r,n);if(!A)continue;
   for(let t=0;t<6;t++){const K=nrAskPick({r,n},A,"",true);if(K.hk==="hh"){meQ.push([r,n]);break}}}S.rank=r0;out.meQ=meQ.slice(0,5);out.nMeQ=meQ.length;
  /* 8. voice = jvoice kAddr (VANPHONG §2) for consort askers, by rank pairs; men by trade */
  const RI=nm=>RANKS.findIndex(x=>x.n===nm);const pairs=[["Quý phi","Thường tại",/bổn cung/,/muội muội/],["Thường tại","Quý phi",/tần thiếp/,/nương nương/],["Quý phi","HH",/thần thiếp/,/Hoàng hậu nương nương/],["QUEEN","Quý nhân",/bổn cung/,/./]];
  const vb=[];const vs=[];const idv=Object.keys(NRASK).find(id=>[].concat(NRASK[id]).some(a=>/\{me\}/.test(a.h)&&/\{call\}|\{Call\}/.test(a.h)&&!/\{B\}/.test(a.h)));const iv=[].concat(NRASK[idv]).findIndex(a=>/\{me\}/.test(a.h)&&/\{call\}|\{Call\}/.test(a.h)&&!/\{B\}/.test(a.h));const av=[].concat(NRASK[idv])[iv];
  for(const [ar,pr,rx,rc] of pairs){const rk0=v.rank,sr=S.rank;v.rank=ar==="QUEEN"?v.rank:RI(ar);S.rank=pr==="HH"?BAL.voice.hq:RI(pr);clear();const x=mk('nr_'+av.k,iv,idv,ar==="QUEEN");const r=render(x);
   vs.push(`${ar}→${pr}: ${r.h.slice(0,150)}`);if(!rx.test(r.h)||!rc.test(r.h)||/\btỷ\b|\bmuội\b(?! muội)/.test(r.h.replace(/muội muội/g,"")))vb.push([ar,pr,r.h]);v.rank=rk0;S.rank=sr;v.queen=false}
  const mv=[];for(const [role,want] of [["Thị vệ","nô tài"],["Thái y","vi thần"],["Vương gia","bản vương"],["Họa sư","vi thần"]]){const X={A:{k:"man",o:{role}}};const r=nrVoiceM(X,()=>"tiểu chủ");if(!r||r.me!==want)mv.push([role,r])}
  out.voice={bad:vb,samples:vs,men:mv};
  /* 9. no real rival {B} → never an ask naming {B}, never the stock «do»; nothing prints «kẻ kia» */
  const nb=[];for(const id of Object.keys(NRASK)){const m=id.match(/^(.+)_(\d+)$/);const A=nrCh(m[1],+m[2]);if(!A)continue;for(let t=0;t<6;t++){const K=nrAskPick({r:m[1],n:+m[2]},A,"",false);
   const a=K.av>=0?[].concat(NRASK[id])[K.av]:null;if(K.hk==="do"||a&&/\{B\}/.test(a.h+a.o.join(" "))){nb.push([id,K]);break}}}
  v.nr=v.nr||{};Object.assign(v.nr,{r:"tt_tranh",n:7,h:7,hs:0,c:"me",x:0,o:"tt"});clear();const offB=nrOffer(v);const cB=q.ch.find(c=>/^nr_/.test(c.tid));let kk="";if(cB){const X=q72X(cB);kk=plain(q72Txt(X.T.h,X))}
  out.noB={nb:nb.slice(0,5),n:nb.length,offB,cB:cB&&{tid:cB.tid,bk:cB.bk,av:cB.p.av},kk};
  /* 7c. (fix 2, review E7ar2 FIX 1) the queen is never spoken of as a third person to herself: queen asker (who "queen") or player Hoàng hậu
     → no drawn ask (any kind, any jnrask*.js file) whose text names her by an alias of NRQX; the live offer of a queen consort neither */
  const qx=[];let qn=0;const qhits=Object.keys(NRASK).filter(id=>[].concat(NRASK[id]).some(a=>NRQX.test(nrAskTxt(a))));
  for(const mode of ["asker","player"]){const r0=S.rank;if(mode==="player")S.rank=BAL.voice.hq;
   for(const id of qhits){const m=id.match(/^(.+)_(\d+)$/);const A=nrCh(m[1],+m[2]);if(!A)continue;for(let t=0;t<12;t++){qn++;
    const K=nrAskPick({r:m[1],n:+m[2]},A,mode==="asker"?"queen":"",true);const a=K.av>=0?[].concat(NRASK[id])[K.av]:null;
    if(a&&NRQX.test(nrAskTxt(a))){qx.push([mode,id,K.av,a.h.slice(0,90)]);break}}}S.rank=r0}
  const qo=[];for(const id of qhits){const m=id.match(/^(.+)_(\d+)$/);if(!ROAD14[m[1]])continue;for(let t=0;t<4;t++){clear();v.queen=true;
   v.nr=v.nr||{};Object.assign(v.nr,{r:m[1],n:+m[2],h:+m[2],hs:0,c:w.id,x:0,o:m[1].split('_')[0]});if(nrOffer(v)){const c=q.ch.find(c=>/^nr_/.test(c.tid));
    const a=c&&c.p&&c.p.av>=0?[].concat(NRASK[id])[c.p.av]:null;if(a&&NRQX.test(nrAskTxt(a)))qo.push([id,c.p.av])}}}
  /* a non-queen asker still gets those asks (the filter is for the queen only) */
  let other=0;for(const id of qhits){const m=id.match(/^(.+)_(\d+)$/);const A=nrCh(m[1],+m[2]);if(!A)continue;for(let t=0;t<8;t++){const K=nrAskPick({r:m[1],n:+m[2]},A,"",true);
   const a=K.av>=0?[].concat(NRASK[id])[K.av]:null;if(a&&NRQX.test(nrAskTxt(a))){other++;break}}}
  out.qx={hits:qhits.length,draws:qn,bad:qx.slice(0,6),nb:qx.length,off:qo.slice(0,6),no:qo.length,other};
  v.queen=false;out.self={bad:self.slice(0,6),nb:self.length,qOff,qs:qs.slice(0,6),nq:qs.length};clear();return out});
 if(R.err){chk('setup',false,R.err)}else{
  console.log('kinds dealt (default):',JSON.stringify(R.kinds));console.log('kinds dealt (+bac):',JSON.stringify(R.kinds2));
  chk('1. default kinds never deal «bac»',!R.kinds.bac,R.kinds);chk('1. one key flip (+bac) deals «bac» again',R.kinds2.bac>0,R.kinds2);
  chk('2. offer at a help chapter with asks carries p.av and the ask kind',R.offer.offered&&R.offer.c0&&R.offer.c0.p.av>=0&&R.offer.c0.tid==='nr_'+R.offer.kinds[R.offer.c0.p.av],R.offer);
  console.log('   sample (peer):',JSON.stringify(R.sample));console.log('   sample (queen):',JSON.stringify(R.sampleQ));
  chk(`3. every ask renders in both voices (${R.render.n} cards), no raw slot, stock costs kept`,R.render.n>0&&!R.render.nb,R.render);
  chk('4. fallback to the stock card (no ask / av −1 / wrong kind)',!R.fb.bad.length,R.fb);
  chk('5. old save quests (no p.av, nr_bac) open with stock text and end',!R.old.length,R.old);
  chk('6. ask quest played: option 0 → hb>0 or honest fail',R.play[0].done&&(R.play[0].hb>0||R.play[0].hist==='fail'),R.play[0]);
  chk('6. ask quest betrayed → hb<0',R.play[1].done&&R.play[1].hb<0&&R.play[1].hist==='bad',R.play[1])
  chk(`7c. queen asker / player Hoàng hậu → no ask naming the queen (NRQX; ${R.qx.hits} chapters with such asks, ${R.qx.draws} draws, live queen offers)`,R.qx.nb===0&&R.qx.no===0&&R.qx.hits>0,R.qx);
  chk(`7c. other askers still draw those asks (${R.qx.other} chapters)`,R.qx.other>0,R.qx);
  chk(`7b. player is Hoàng hậu → no hh ask / stock card`,R.nMeQ===0,R.meQ);
  for(const z of R.voice.samples)console.log('   voice',z);
  chk('8. consort voice = jvoice kAddr by rank pair (bổn cung / tần thiếp / thần thiếp …), never a bare tỷ/muội across ranks',!R.voice.bad.length,R.voice.bad);
  chk('8. men voice by trade (Thị vệ nô tài, Thái y / Họa sư vi thần, Vương gia bản vương)',!R.voice.men.length,R.voice.men);
  chk('9. no real rival → no {B} ask, no stock «do», no «kẻ kia» on the card',R.noB.n===0&&!/kẻ kia/i.test(R.noB.kk),R.noB);
  chk(`7. no asker is sent to herself (NRSELF ${JSON.stringify(R.self&&R.self.qOff)} queen offers): queen never hh, Thái y never y`,R.self.nb===0&&R.self.nq===0&&R.self.qOff>0,R.self)}
 chk('no page errors',!errs.length,errs);
 await b.close();srv.close();const f=ok.filter(z=>!z[1]).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
