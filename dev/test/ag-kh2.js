/* AG-ALL-2 part 2b checks: G8 khắc parity, G9 timing, G12 Empress rule. node dev/test/ag-kh2.js [dev/index.html] [buổi]
   1 several deeds per buổi for some NPCs, never more khắc than the buổi has (BAL.time.khac); each deed's window k1-kh+1 = agKhC (the player's khắc)
   2 a deed's row holds its place for every khắc of its window (shadow follows); it lands only after its END khắc; '!' list holds no deed that is over
   3 NPCs who stand there react (agSeeNpc: hear / join / mediate) — histogram; reactions take a khắc of theirs (never two things in one khắc)
   4 the player's khắc costs read the same BAL.time.cost (talk / harm) the NPC side reads
   5 G12: hhAct(a, v, "reward") moves v.hh and liking by the same BAL numbers whoever is the Empress (player or NPC)
   6 BAL.ag.kh2.on = 0 → one deed per buổi (old path); no page errors */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const NB=+process.argv[3]||40;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==="function"&&isSrv()))break}
  window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(async(NB)=>{const out={per:{},over:0,spanBad:0,spanN:0,rowBad:0,early:0,hapOver:0,see:{},more0:AGD.stat.more||0,kcHist:{},errs:[]};
  const lastLand={};const l0=agLand0;agLand0=function(pp){const k=agKh();if(pp.k1!=null&&k<=pp.k1&&!arguments[1]&&!pp.gone&&!pp.drop&&agRec()&&agRec().key===pp.key)out.early++;return l0.apply(this,arguments)};
  for(let i=0;i<NB;i++){placeWhere();agFlush();const R=agRec();const z=agZ();const key=agKey();const C={};
   for(const pp of z.pend){if(pp.key!==key)continue;C[pp.id]=(C[pp.id]||0)+(pp.k1!=null?pp.k1-pp.kh+1:(pp.kc||1));/* 2d3: the khắc it holds IN this buổi (a deed that runs on holds the rest in the next one) */out.kcHist[pp.kc||1]=(out.kcHist[pp.kc||1]||0)+1;
    if(pp.k1!=null){out.spanN++;const want=Math.min(J95.KH-1,pp.kh+(pp.kc!=null?pp.kc:agKhC({k:pp.k},agDoer(pp)))-1);if(pp.k1>want)out.spanBad++;
     if(R&&R.P[pp.id])for(let q=pp.kh;q<=pp.k1;q++)if(!R.P[pp.id][q]||R.P[pp.id][q][0]!==pp.pl)out.rowBad++}}
   const nd={};for(const pp of z.pend)if(pp.key===key)nd[pp.id]=(nd[pp.id]||0)+1;for(const id in nd){const n=nd[id];out.per[n]=(out.per[n]||0)+1}
   for(const id in C)if(C[id]>J95.KH)out.over++;
   /* walk her clock through the buổi: the '!' list never holds a deed that is over */
   for(let k=0;k<J95.KH;k++){try{const L=haHapDeeds();for(const {p:pp} of L)if(agK1(pp)<agKh())out.hapOver++}catch(e){}if(k<J95.KH-1){try{spend(1);j95sync()}catch(e){}}}
   Q.length=0;S.mg=0;try{nextBuoi()}catch(e){out.nb=e.message}Q.length=0}
  /* 2d3: a reaction is rare by design (~2 % of presences): keep living buổi until one is seen (bounded), so G9 is not a coin toss */
  for(let i=0;i<400&&!Object.keys(AGD.stat.see||{}).length;i++){placeWhere();agFlush();for(let k=0;k<J95.KH-1;k++){try{spend(1);j95sync()}catch(e){}}Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}
  for(const a of (agRec()&&agRec().acts)||[])if(/^ag:see:/.test(a.k))out.see[a.k]=(out.see[a.k]||0)+1;
  out.more=(AGD.stat.more||0)-out.more0;out.seeS=AGD.stat.see||{};out.seeN=AGD.stat.seeN||0;out.witNpc=AG.stat.witNpc;
  /* 4 one source */
  out.cost={talk:BAL.time.cost.talk,harm:BAL.time.cost.harm,};
  /* 5 G12 */
  try{const L=liveRivals(true).filter(x=>x.alive&&!x.out);const q=L[0],v=L[1];q.bac=999;S.bac=999;let hv=50;/* 2d3: away from the 0..100 clamp (a v near 100 made G12 a coin toss) */const st=[];Object.defineProperty(v,"hh",{get(){return hv},set(x){st.push([x-hv,new Error().stack.split("\n").slice(2,4).join("|").slice(0,300)]);hv=x},configurable:true,enumerable:true});const h0=v.hh||0,a0=aff(v,q);hhAct(q,v,"reward");out.g12st=st.slice();const dN={hh:(v.hh||0)-h0,aff:aff(v,q)-a0};
   const h1=v.hh||0,a1=aff(v,S);hhAct(S,v,"reward");const dP={hh:(v.hh||0)-h1,aff:aff(v,S)-a1};out.g12={npc:dN,me:dP,exp:BAL.tw.g.reward[1]}}catch(e){out.g12={e:e.message}}
  /* 6 off switch */
  BAL.ag.kh2.on=0;let multi=0;for(let i=0;i<4;i++){placeWhere();agFlush();const z=agZ(),key=agKey();const nd={};for(const pp of z.pend)if(pp.key===key&&pp.vid!=null)nd[pp.id]=(nd[pp.id]||0)+1;for(const id in nd)if(nd[id]>1)multi++;Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}
  BAL.ag.kh2.on=1;out.offMulti=multi;out.errs=AGD.errs.concat(AG.errs).slice(0,6);return out},NB);
 console.log(JSON.stringify(r));
 ok((r.per[2]||0)+(r.per[3]||0)+(r.per[4]||0)>0&&r.more>0,'G8 several deeds in one buổi for some NPCs (deeds per NPC per buổi histogram)',{per:r.per,more:r.more});
 ok(r.over===0,'G8 never more khắc of deeds than the buổi has',r.over);
 ok(r.spanBad===0&&r.spanN>0,'G8 each deed window = the player khắc for that act (agKhC)',{n:r.spanN,bad:r.spanBad,kc:r.kcHist});
 ok(r.rowBad===0,'G9 the row holds the deed place for every khắc of its window',r.rowBad);
 ok(r.early===0,'G9 no deed lands before its end khắc (while her clock is inside its window)',r.early);
 ok(r.hapOver===0,'G9 the ! list never holds a deed that is over',r.hapOver);
 ok(Object.keys(r.seeS).length>0,'G9 NPCs who stand there react (hear / join / mediate)',{see:r.seeS,present:r.seeN});
 {const fs=require('fs');const j2=fs.readFileSync('dev/build/j2.js','utf8'),j8=fs.readFileSync('dev/build/j8.js','utf8');r.cost.talkSrc=/const tcost=a\.act\?BAL\.time\.cost\.talkAct:BAL\.time\.cost\.talk/.test(j2);r.cost.harmSrc=/function doAct[^\n]*can\(BAL\.time\.cost\.harm\)/.test(j8)&&/spend\(BAL\.time\.cost\.harm\);const r=runAct/.test(j8)}
 ok(r.cost.talkSrc&&r.cost.harmSrc,'player talk / harm khắc read BAL.time.cost (one source with the NPC side)',r.cost);
 ok(r.g12&&r.g12.npc&&r.g12.me&&r.g12.npc.hh===r.g12.me.hh&&r.g12.npc.hh===r.g12.exp,'G12 Empress reward: the target regard for the Empress moves by the same BAL number, NPC or player Empress (liking: the same relAdd; the player-only mood bar may add to liking of her)',r.g12);
 ok(r.offMulti===0,'off switch BAL.ag.kh2.on=0 → one deed per buổi',r.offMulti);
 /* review ag-all-2 r2 B2: a present NPC sees in khắc k and reacts in k+1 (a deed through the ledger), never in the same khắc; same for her */
 const rb2=await p.evaluate(()=>{const o={};placeWhere();agFlush();const R=agRec();const kh=0;const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined&&R.P["v"+v.id]&&!agBound("v"+v.id,0,R.key)&&!agBound("v"+v.id,1,R.key));const d=L[0],w=L[1],w2=L[2];if(!w2)return{skip:1};
  const z=agZ();const clr=v=>{z.pend=z.pend.filter(x=>x.vid!==v.id);if(z.did)delete z.did[v.id]};[d,w,w2].forEach(clr);const pl="vuon";
  for(const v of [d,w,w2]){const row=R.P["v"+v.id];row[kh]=[pl,"go",null,""];row[kh+1]=[pl,"go",null,""]}
  const mp=window.mindPick;window.mindPick=()=>"hear";try{
   const pd={key:R.key,id:"v"+d.id,vid:d.id,k:"chat",kd:"",t:null,kh,pl,act:"trò chuyện",why:"thử"};const ev0=JSON.stringify(w.evm||{});agSeeNpc(pd,d);
   const q=z.pend.find(x=>x.vid===w.id&&x.k==="see:hear");o.npc={pend:!!q,kh:q&&q.kh,rowK:R.P["v"+w.id][kh][1],rowK1:R.P["v"+w.id][kh+1][1],noNow:JSON.stringify(w.evm||{})===ev0};
   /* her: she stands there in khắc kh */const me0=R.P.me[kh];R.P.me[kh]=[pl,"go",null,""];const k0=agKh;agKh=()=>kh;clr(w2);R.P["v"+w2.id][kh+1]=[pl,"go",null,""];try{agSeeHer("chat",null,false)}finally{agKh=k0;R.P.me[kh]=me0}
   const q2=z.pend.find(x=>x.vid===w2.id&&x.k==="see:hearMe");o.her={pend:!!q2,kh:q2&&q2.kh,rowK1:R.P["v"+w2.id][kh+1][1]};
   /* the last khắc of the day cannot hold a next-khắc reaction: no deed (agFitDay) */
  }finally{window.mindPick=mp}return o});
 ok(rb2.skip||(rb2.npc.pend&&rb2.npc.kh===1&&rb2.npc.rowK==="go"&&rb2.npc.rowK1==="ag_see:hear"&&rb2.npc.noNow),'B2 a present NPC sees at khắc k and reacts at k+1 (deed in the ledger, nothing applied in k)',rb2.npc);
 ok(rb2.skip||(rb2.her.pend&&rb2.her.kh===1&&rb2.her.rowK1==="ag_see:hearMe"),'B2 seeing HER: the reaction is a deed of the next khắc too',rb2.her);
 ok(!errs.length&&!r.errs.length,'no page / agent errors',errs.concat(r.errs).slice(0,6));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
