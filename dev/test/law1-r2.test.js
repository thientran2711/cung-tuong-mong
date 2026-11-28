/* LAW-1 r2 (row11-law1 r2; owner law 1 OD:L33, L1534 «whatever others can do to her, she can do back, and the reverse»): the family
   «an NPC's target list drops HER» found by the door-era direction scan (dev/tools/law1-dir-scan.js) — each act now judged by ONE rule for both targets:
   (1) cx3:tell «Kể tội … với Thái hậu» (jagacts3 P3C.tell): an NPC holding evidence and spite on HER may tell on her; she pays the same Sủng (BAL.ag.par3.tell.sung)
   (2) cx3:petcare «Giúp chăm thú nuôi của nàng» (jagacts3 p3PetFr): an NPC friend may help with HER pet (the same ACT.petcare gate as her button)
   (3) Hòa giải (j28 SOC.mediate = jtwoway TW mediate): an NPC mediates ANY grudge the target holds (TW req twFoeOf) — between two NPCs, and for HER grudge too;
       it used to be only «the target's grudge against her».
   usage: node dev/test/law1-r2.test.js [index.html]   → exit 1 on FAIL */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'index.html';const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{let sd=20261128;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
  for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const V=liveRivals(true).filter(v=>v!==S&&!v.coop&&v.alive&&!v.out&&!v.queen);const v=V[0],x=V[1],y=V[2];const out={};
  /* (1) tell: v holds proof + spite on HER only; no other target qualifies */
  /* she and the doer have met (j61 npcKnows: an NPC acts only on people she knows — the same gate for every target) */try{npcLearn(v,S)}catch(e){}
  S.rank=Math.min(S.rank||0,5);v.oan=90;for(const z of V)if(z!==v){v.ro=v.ro||{};v.ro[z.id]=0}/* proof is capped by her REAL deeds (j8 evA deedCap, law 6a): she did schemes worth it in this test world — v holds 3 pieces */v.evm=v.evm||{};v.evm[key(S)]=3;
  const N={};try{for(const k of Object.keys(agNeedsC(v)))N[k]=100}catch(e){}
  let L=[];try{L=agOptsG(v,N,null)||[]}catch(e){out.err=String(e)}
  out.tellHer=L.some(o=>o&&o.k==="cx3:tell"&&o.t===S);if(!out.tellHer)out.dbg={keys:L.map(o=>o.k).slice(0,40),evG:evG(v,S),sp:agSpite(v,S),th:S.thDead,g:BAL.ag.par3.tell.g};
  const s0=S.sung;let line="";try{line=P3C.tell(v,S).go()}catch(e){out.goErr=String(e)}out.tellSung=s0-S.sung;out.tellWant=BAL.ag.par3.tell.sung;out.tellLine=line;
  /* (2) petcare: she keeps a pet, v likes her */
  const p0=S.pets;S.pets=[{t:PETK[0]}];v.rel=90;out.petHer=p3PetFr(v).includes(S);S.pets=p0;
  /* (3) mediate: x holds a grudge on y (no grudge on her) → v may mediate for x; she holds a grudge on y → v may mediate for her */
  x.ro=x.ro||{};x.ro[y.id]=60;x.oan=0;v.rl=v.rl||{};v.rl[x.id]=60;
  out.medNpc=!!(SOC.mediate&&SOC.mediate.ok(v,x));
  S.ro=S.ro||{};S.ro[y.id]=60;out.medHer=!!(SOC.mediate&&SOC.mediate.ok(v,S));
  out.twFoeX=!!twFoeOf(v,x);out.twFoeS=!!twFoeOf(v,S);
  return out});
 ok(r.tellHer,'(1) an NPC with proof + spite on her gets «Kể tội» aimed at HER (cx3:tell, t = her)',r);
 ok(r.tellSung===r.tellWant&&/kể tội ngươi/.test(r.tellLine||""),'(1) told on, she loses the same Sủng BAL.ag.par3.tell.sung and is told by name',{lost:r.tellSung,want:r.tellWant,line:r.tellLine});
 ok(r.petHer,'(2) an NPC friend may come to help with HER pet (p3PetFr includes her)',r.petHer);
 ok(r.twFoeX&&r.medNpc,'(3) Hòa giải between two NPCs: the TW rule holds (twFoeOf) and the NPC option is open',{tw:r.twFoeX,ok:r.medNpc});
 ok(r.twFoeS&&r.medHer,'(3) Hòa giải for HER grudge: the NPC option is open',{tw:r.twFoeS,ok:r.medHer});
 ok(!errs.length&&!r.err&&!r.goErr,'no page errors',{errs:errs.slice(0,3),e:r.err,g:r.goErr});
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
