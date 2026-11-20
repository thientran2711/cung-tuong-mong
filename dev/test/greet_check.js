/* GREET-MEET checks (jgreet): the ONE greeting name rule (rank × nết × one-seat title), two-way, AG-MEET at places, old save.
   1 table: she greets a consort lower / equal / higher × the consort's Tính tình (Kiêu ngạo / Lạnh lùng / Ân cần) × one-seat title (Hoàng hậu, Hoàng quý phi)
     → who learns whose name = the rule (lower names herself; one seat = known at once; higher/equal give by nết: BAL.net.n.greetName)
   2 two-way: NPC → her and NPC ↔ NPC go through the same greetName with the same answers
   3 words: every result line carries "Vì sao:", no digits, no %, no "???"
   4 herald: o.ann (thỉnh an) names both ways
   5 AG-MEET: over many buổi, consorts present come to someone (her included), not every buổi, not everyone; the card = person-dialog option + replies
   6 perf: gmTick p95 ≤ BAL.ag.perf.p95 ms
   7 old save without S.gmeet loads and plays a buổi; 8 co-op guest: gmOn false
   usage: node dev/test/greet_check.js <page URL or file> → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,900):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* 1 + 3 */
 const r1=await p.evaluate(()=>{const out=[],bad=[],lines=[];const v=liveRivals(true).find(x=>!x.queen&&!sameHouse(S,x));const q0=v.queen,r0=v.rank,n0=v.net.slice(),me0=S.rank,mn0=S.net.slice();
  const reset=()=>{S.known[kOf61(v)]=0;S.nkn=S.nkn||{};S.nkn.me={};delete S.met[v.id]};
  const cases=[];for(const rel of ["lower","equal","higher"])for(const tt of ["Kiêu ngạo","Lạnh lùng","Ân cần"])for(const uq of [0,1])for(const mt of ["Ân cần","Kiêu ngạo"])cases.push({rel,tt,uq,mt});
  for(const c of cases){/* her rank 3 (Tần); consort's rank by rel; one seat = Hoàng quý phi (6) / she Hoàng quý phi when higher */
   S.rank=c.rel==="higher"&&c.uq?3:3;let vr=c.rel==="lower"?1:c.rel==="equal"?3:(c.uq?6:4);if(c.rel==="lower"&&c.uq){S.rank=6;vr=1}if(c.rel==="equal"&&c.uq)continue;
   v.rank=vr;v.queen=false;v.net=[c.tt,n0[1],n0[2]];S.net=[c.mt,mn0[1],mn0[2]];reset();
   const G=greetName(S,v);const sheKnows=k61Named(v),vKnows=npcKnows(v,S);
   const vHi=vr>S.rank,eq=vr===S.rank;const uqV=BAL.seatCap[vr]===1,uqMe=BAL.seatCap[S.rank]===1;
   const wantShe=!vHi&&!eq||uqV||BAL.net.n.greetName[c.tt]!==0;const wantV=vHi||uqMe||(BAL.net.n.greetName[c.mt]!==0);
   const ex={...c,vr,me:S.rank,sheKnows,vKnows,wantShe,wantV,why:G.A.w+"/"+G.B.w};out.push(ex);if(sheKnows!==wantShe||vKnows!==wantV)bad.push(ex);lines.push(G.line)}
  v.rank=r0;v.queen=q0;v.net=n0;S.rank=me0;S.net=mn0;
  const badW=lines.filter(l=>{const t=l.replace(/<[^>]+>/g,"");return !/Vì sao:/.test(t)||/\d|%|\?\?\?/.test(t)});
  return{n:out.length,bad,badW:badW.slice(0,3),sample:[lines[0],lines[3],lines[9]].map(x=>x.replace(/<[^>]+>/g,""))}});
 ok(r1.n>=24&&r1.bad.length===0,'table: rank × nết × one-seat → names learnt by the rule',{n:r1.n,bad:r1.bad.slice(0,3)});
 ok(r1.badW.length===0,'words: every line says Vì sao, no digits / % / ???',r1);console.log('   lines:',r1.sample.join(' || '));
 /* 2 two-way */
 const r2=await p.evaluate(()=>{const L=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x));const v=L[0],w=L[1];const keep=[v.rank,w.rank,v.net.slice(),w.net.slice()];const bad=[];
  for(const tt of ["Kiêu ngạo","Ân cần"])for(const [rv,rw] of [[1,3],[3,3],[4,1]]){v.rank=rv;w.rank=rw;w.net=[tt,keep[3][1],keep[3][2]];v.net=["Ân cần",keep[2][1],keep[2][2]];
   S.nkn["r"+v.id]={};S.nkn["r"+w.id]={};greetName(v,w);const vk=npcKnows(v,w),wk_=npcKnows(w,v);
   const wantVk=rw<rv||BAL.net.n.greetName[tt]!==0;const wantWk=rv<rw||true;if(vk!==wantVk||wk_!==wantWk)bad.push({tt,rv,rw,vk,wk:wk_})}
  /* NPC → her: same function, she is the lower one: she names herself, learns a proud higher one's name only by her nết */
  v.rank=4;v.net=["Kiêu ngạo",keep[2][1],keep[2][2]];S.rank=1;S.known[kOf61(v)]=0;S.nkn.me={};const G=greetName(v,S);const her={she:k61Named(v),v:npcKnows(v,S)};
  v.rank=keep[0];w.rank=keep[1];v.net=keep[2];w.net=keep[3];return{bad,her,line:G.line.replace(/<[^>]+>/g,"")}});
 ok(r2.bad.length===0,'two-way NPC ↔ NPC: same rule',r2);ok(!r2.her.she&&r2.her.v,'two-way NPC → her: she (lower) names herself; a proud higher one gives no name',r2);
 /* 4 herald */
 const r4=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.queen&&!sameHouse(S,x));const n0=v.net.slice(),r0=v.rank;v.rank=5;v.net=["Kiêu ngạo",n0[1],n0[2]];S.rank=0;S.known[kOf61(v)]=0;S.nkn.me={};
  greetName(S,v,{ann:1});const r={she:k61Named(v),v:npcKnows(v,S)};v.net=n0;v.rank=r0;return r});
 ok(r4.she&&r4.v,'herald (thỉnh an): both names called',r4);
 /* 5 + 6 AG-MEET */
 const r5=await p.evaluate(async()=>{const s0=JSON.parse(JSON.stringify(GM.stat));let cards=0,optsOk=0,buoi=0,presentMax=0;const per=[];
  /* the bot never walks: every other buổi she stands all buổi where most consorts are (as a player at the garden would): moved inside the real tick */
  const gp=gmPlaces;let tk=0;gmPlaces=function(){const R=agRec();if(R&&R.P.me&&(tk++)%2===0){const kh0=agKh();const M={};for(const id in R.P){const e=R.P[id][kh0];if(e&&e[0]&&id[0]==="v")M[e[0]]=(M[e[0]]||0)+1}
   const pl=Object.keys(M).sort((a,b)=>M[b]-M[a])[0];if(pl)for(let kh=kh0;kh<J95.KH;kh++)R.P.me[kh]=[pl,"here",null,"thử"]}return gp.apply(this,arguments)};
  for(let i=0;i<80;i++){Q.length=0;try{placeWhere()}catch(e){}try{agFlush()}catch(e){}buoi++;
   const R=S.roster;let pres=0;if(R){const kh=j95kh();const M={};for(const id in R.P){const e=R.P[id][kh];if(e&&e[0]&&id[0]==="v")(M[e[0]]=M[e[0]]||0,M[e[0]]++)}for(const k in M)if(M[k]>=2)pres+=M[k]}presentMax=Math.max(presentMax,pres);
   const m0=GM.stat.meet;per.push(GM.stat.meet);
   /* stand where a planned approacher is: she walks to it at its khắc */
   const z=gmZ();const pd=z.pend[0];if(pd){try{R.P.me[pd.kh]=[pd.pl,"here",null,"thử"];used=pd.kh*(4/J95.KH)|0}catch(e){}const k0=j95kh;j95kh=()=>pd.kh;try{gmWatch()}finally{j95kh=k0}
    const m=Q.find(x=>x.t==="Có người đến");if(m){cards++;if(m.opts&&m.opts.length>=1&&m.opts.every(o=>o.n&&typeof o.go==="function"))optsOk++;try{m.opts[0].go()}catch(e){}}Q.length=0;try{closeModal()}catch(e){}}
   try{endTurn()}catch(e){}Q.length=0;try{closeModal()}catch(e){}if(S.dead)break}
  gmPlaces=gp;
  const st=GM.stat;const d=k=>st[k]-(s0[k]||0);const L=GM.ms.slice().sort((a,b)=>a-b);
  return{buoi,meet:d("meet"),stay:d("stay"),her:d("her"),npc:d("npc"),cards,optsOk,byPl:st.byPl,byOpt:st.byOpt,p95:L.length?L[Math.floor(.95*(L.length-1))]:0,max:L[L.length-1],budget:BAL.ag.perf.p95,presentMax}});
 ok(r5.meet>0&&r5.stay>0,'AG-MEET: consorts present approach someone, others keep their schedule (not everyone)',r5);
 ok(r5.meet/r5.buoi<12,'AG-MEET: not every consort every buổi',{perBuoi:+(r5.meet/r5.buoi).toFixed(2)});
 ok(r5.her>0&&r5.npc>0,'AG-MEET: she is picked sometimes, other people too',r5);ok(r5.cards>0&&r5.optsOk===r5.cards,'AG-MEET: she gets the kit card with reply options',r5);
 ok(r5.p95<=r5.budget,'perf: gmTick p95 within the agent budget',{p95:r5.p95,max:r5.max,budget:r5.budget});
 /* 7 old save */
 const r7=await p.evaluate(()=>{quiet=false;save();const k=SK(SLOT);const d=JSON.parse(localStorage.getItem(k));const strip=o=>{if(o&&typeof o==="object"){delete o.gmeet;for(const x in o)if(o[x]&&typeof o[x]==="object"&&x!=="logs")strip(o[x])}};strip(d);localStorage.setItem(k,JSON.stringify(d));
  let e=null;try{loadSlot(SLOT);Q.length=0;placeWhere();agFlush();endTurn();Q.length=0}catch(x){e=x.message}return{e,has:!!S.gmeet}});
 ok(!r7.e,'old save without S.gmeet loads and plays a buổi',r7);
 /* 8 co-op guest */
 const r8=await p.evaluate(()=>{const c0=window.COOPW;window.COOPW={on:1,seat:"b"};const g=gmOn();window.COOPW=c0;return{g}});ok(r8.g===false,'co-op guest: AG-MEET does not run (host only)',r8);
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:`ALL ${res.length} PASS`);process.exit(f?1:0)})();
