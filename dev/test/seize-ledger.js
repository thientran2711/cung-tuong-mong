/* review/charge-followups (a) LAW 6c REAL OBJECTS — every «tịch thu» road routes the piece through the ONE item ledger (jil ilGone):
   for each confiscation road (her on an NPC, an NPC on her, NPC on NPC) a real piece (with a ledger id) is put in the target's chest, the
   road runs through the game's own function with the odds forced to «thành», then the weekly census ilCensus() runs. PASS = the piece is
   in the jil box (Nội vụ phủ «nvp» or Cung Chính ti «cct») or in a chest, and the census «net» count (piece vanished without a route,
   «Nội vụ phủ nhặt được») did not grow. usage: node dev/test/seize-ledger.js <index.html path or url> → exit 1 on a fail / page error */
const {chromium}=require('playwright');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv[2]||require('path').join(__dirname,'..','..','index.html');const URL=/^(file|https?):/.test(A)?A:'file://'+require('path').resolve(A);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1000);
 const R=await p.evaluate(()=>{BAL.charge.rep.n=99;/* PUNISH-TIER: the repeat-nhẹ rule is tested in punish-tier.js; these steps punish the same people many times */const out=[];const ks=Object.keys(IT);
  const ilK=ks.find(k=>itm(k).il&&!itm(k).dr),tjK=ks.filter(k=>IT[k].kd==="Trang sức"&&!itm(k).dr).sort((x,y)=>itm(y).rk-itm(x).rk)[0];
  const L=liveRivals(true).filter(x=>!x.queen&&!x.coop);const v=L[0],w=L[1];
  const where=e=>{const I=ilS();const x=I.box.find(z=>z.e&&z.e.iu===e.iu);if(x)return x.at;for(const q of ilPeople())for(const a of ilSlots(q))if(a&&a.iu===e.iu)return "chest:"+ilKey(q);for(const c of ilCases())if(c.e&&c.e.iu===e.iu)return "lost";return "NOWHERE"};
  const r0=Math.random,roll0=roll,aRoll0=aRoll;
  const run=(tag,holder,mk,act)=>{let res;try{Q.length=0;holder.inv=[];if(holder.wd){holder.wd.tram=null;holder.wd.y=null}holder.vl=null;holder.dress=null;ilCensus();/* only this piece on her: the road must take THIS one (the cleared pieces are netted BEFORE net0) */const net0=ilS().net;const e=mk();holder.inv.push(e);ilUid(e,holder);ilCensus();
    Math.random=()=>0;roll=()=>true;aRoll=()=>true;let txt="";try{txt=String(act()||"")}finally{Math.random=r0;roll=roll0;aRoll=aRoll0}
    const inHand=ilSlots(holder).includes(e);ilCensus();const at=where(e),net=ilS().net-net0;
    res={tag,taken:!inHand,at,net,txt:txt.replace(/<[^>]+>/g,"").slice(0,90),ok:net===0&&!inHand&&/^(nvp|cct)$/.test(at),vp:typeof vpItems==="function"?vpItems(holder).length:-1}}catch(x){res={tag,err:String(x&&x.message||x).slice(0,150),ok:false}}
   Q.length=0;out.push(res)};
  const reset=t=>{t.out=t===S?0:false;t.confined=0;t.punWk=null;t.dead=false;if(t!==S)t.alive=true};
  const tj=t=>({k:tjK,w:1}),il=()=>({k:ilK});
  const q=(rivals||[]).find(x=>x&&x.queen&&x.alive!==false);
  /* 1 Tố vượt phẩm (j8 vpAccuse): her on an NPC, an NPC on her, NPC on NPC */
  v.rank=0;reset(v);run("vpAccuse S→NPC",v,tj,()=>vpAccuse(S,v));
  S.rank=0;reset(S);run("vpAccuse NPC→S",S,tj,()=>vpAccuse(v,S));reset(S);
  w.rank=0;reset(w);run("vpAccuse NPC→NPC",w,tj,()=>vpAccuse(v,w));
  /* 2 proven charge Vượt phẩm xa xỉ (jcharge chPunish vp) */
  v.rank=0;reset(v);run("chPunish vp → NPC",v,tj,()=>chPunish(v,"vp","bị tố giác",S));
  S.rank=0;reset(S);run("chPunish vp → S",S,tj,()=>chPunish(S,"vp","bị tố giác",v));reset(S);
  /* 3 proven charge Giấu đồ cấm (jcharge chPunish il) */
  reset(v);run("chPunish il → NPC",v,il,()=>chPunish(v,"il","bị tố giác",S));
  reset(S);run("chPunish il → S",S,il,()=>chPunish(S,"il","bị tố giác",v));reset(S);
  /* 4 Hoàng hậu «Tịch thu trang sức» (jagacts hhAct conf): NPC queen on her / an NPC; her as Hoàng hậu (empAct) */
  if(q){reset(S);run("hhAct conf NPC queen→S",S,tj,()=>hhAct(q,S,"conf"));reset(v);run("hhAct conf NPC queen→NPC",v,tj,()=>hhAct(q,v,"conf"))}else out.push({tag:"hhAct NPC queen",skip:1,ok:true});
  {const r0k=S.rank;S.rank=7;S.queen=true;reset(v);const i=rivals.indexOf(v);run("empAct conf S(Hoàng hậu)→NPC",v,tj,()=>{empAct(i,"conf");return ""});S.rank=r0k;S.queen=false}
  /* 5 handmade piece sold out of the palace and caught (j83 wkSell): «đồ bị tịch thu» */
  {reset(S);const mk=()=>({k:tjK,wk:{n:"Túi thơm tự may",p:null}});run("wkSell caught → S",S,mk,()=>{const ix=S.inv.length-1;const ar=aRoll;aRoll=()=>false;try{return wkSell(S,ix)}finally{aRoll=ar}})}
  return {ilK,tjK,out}});
 let bad=0;console.log(`items: forbidden ${R.ilK} · jewellery ${R.tjK}`);
 for(const r of R.out){const ok=r.ok!==false;if(!ok)bad++;console.log(`${ok?'PASS':'FAIL'} ${r.tag}: ${r.skip?'skipped (no NPC queen)':r.err?'ERR '+r.err:`taken ${r.taken} · at ${r.at} · vpLeft ${r.vp} · net +${r.net} · ${r.txt}`}`)}
 console.log(`page errors: ${errs.length} ${JSON.stringify(errs.slice(0,3))}`);if(errs.length)bad++;
 console.log(bad?`seize-ledger: ${bad} FAIL`:'seize-ledger: ALL PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
