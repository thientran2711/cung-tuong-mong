/* ACT-MOVE robot (worker ACT-MOVE-2, MAIN CHÍNH 168; owner OD 27/11 ~00:32Z / ~00:42Z / ~00:54Z; design dev/handover/reports/act-move.md §7).
   Law 6c / «không delete»: every act the Hậu cung consort card offered on LIVE is still reachable — now only where it happens:
     PERSON-bound (BAL.df.person + personE) → on HER pop-up where she really is (together, real schedule)
     PALACE-bound (BAL.df.palace)           → at her palace: her own pop-up when home, her chest «Rương của …» when out
     EITHER (BAL.df.either, remote ways)    → both
     NIGHT (steal / road)                   → the card flip at the end of tối (jnf, owner OD 16/11 22:45Z); road also on the Emperor's pop-up
   Asserts, over scenarios dau / cao / hh / con × 4 buổi:
     A. every Hậu cung consort card and the Chí tôn cards carry 0 act buttons (only «Tìm gặp» / «Ghé cung»: data-see / scout / visit / kgmgo / acask / amoff)
     B. every act key of the old card (raw rvGroups) is classified in exactly one list (or NIGHT)
     C. every PALACE + EITHER key the old card offered is offered at her palace (door member / standalone act / same-name talk member)
     D. every PERSON + EITHER + personE key is offered on her pop-up where she is (when that place lets her in)
     E. a person who is NOT there is not actable face to face (her chest offers no PERSON key; no pop-up for her elsewhere)
     F. the Emperor's pop-up = exactly the 6 moves (OD 00:54Z); the Thái hậu pop-up has «Dâng lễ vật»
   usage: node dev/test/act-move-reach.js [index.html]      (default dev/index.html — run python3 dev/build/assemble.py first)  → exit 1 on any failure */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');
const {chromium}=require('playwright');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL='file://'+path.resolve(process.argv[2]||path.join(ROOT,'dev/index.html'));
const RUN=String.raw`(()=>{window.__bot=1;const R={fail:[],n:{card:0,keys:0,pal:0,palOk:0,per:0,perOk:0,perSkip:0,absent:0,emp:0},skip:{},classes:{}};
 const F=(t)=>{if(R.fail.length<80)R.fail.push(t)};const T=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
 const go=k=>{Q.splice(0);used=0;S.confined=0;popIdx=null;window.__j77etq=1;window.__accStay=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0}return S.place===k};
 const B=BAL.df,LS={person:B.person,palace:B.palace,either:B.either,personE:B.personE};const NIGHT=["steal","road"];
 const cls=id=>{const t=id[0],k=id.slice(2);const L=[];if(t==="e"){if(LS.personE.includes(k))L.push("personE")}else for(const n of ["person","palace","either"])if(LS[n].includes(k))L.push(n);if(t==="a"&&NIGHT.includes(k))L.push("night");return L};
 const OKB=/data-(see|scout|visit|kgmgo|acask|amoff|ladder|pct|pg|pgo|pager)=/;
 const cardActs=h=>{const d=document.createElement("div");d.innerHTML=h;return [...d.querySelectorAll("button")].filter(b=>!b.classList.contains("pct")&&!OKB.test(b.outerHTML.slice(0,b.outerHTML.indexOf(">")+1))).map(b=>T(b.childNodes[0]&&b.childNodes[0].textContent||b.textContent).slice(0,40))};
 const rawIds=(v,i)=>{DOORC.raw++;let G=[];try{G=rvGroups(v,i)}finally{DOORC.raw--}const s=new Set();for(const g of G)for(const h of g[1]||[]){const id=doorCardId(h);if(id)s.add(id)}return s};
 /* what a pop-up offers for this person: door members (DOOR.more) + standalone acts (dfInPerson) + talk names (same-name members are one act) */
 const offered=p=>{const s=new Set(),names=new Set();for(const r of DOOR.T){if(!r.acts)continue;for(const b of DOOR.more(p,r)){s.add(b.id);names.add(T(b.n))}}for(const x of dfInPerson(p))s.add("a:"+x.k);
  try{for(const a of doorRaw(p))if(a&&a.n)names.add(T(a.n))}catch(e){}return {s,names}};
 const btnName=(v,i,id)=>{const b=doorCardAll(i).find(x=>x.id===id);return b?T(b.n):""};
 for(const sc of ["dau","cao","hh","con"])for(let bu=0;bu<4;bu++){AA.scen(sc);S.buoi=bu;used=0;try{render()}catch(e){}
  /* A: cards */
  rivals.forEach((v,i)=>{if(!v)return;R.n.card++;const a=cardActs(rvCard(v,i));if(a.length)F(sc+"/"+bu+" card "+v.name+": "+a.join(", "))});
  {const d=courtTabHTML();const a=cardActs(d);R.n.card++;if(a.length)F(sc+"/"+bu+" Chí tôn card: "+a.join(", "))}
  const named=v=>typeof k61Named!=="function"||k61Named(v);
  for(let i=0;i<rivals.length;i++){const v=rivals[i];if(!v||!v.alive||v.out||sameHouse(S,v))continue;const ids=rawIds(v,i);
   /* B */for(const id of ids){R.n.keys++;const c=cls(id);R.classes[id]=c.join("+")||"?";if(c.length!==1&&!(c.includes("night")&&c.length===1))F("unclassified/dup "+id+" → "+(c.join("+")||"none"))}
   if(!named(v)){R.skip.unnamed=(R.skip.unnamed||0)+1;continue}/* j61: an act on a person she cannot name is never offered (old card: greyed) */
   /* C + E at her palace */
   if(go(palaceOf(v))){const p=curPeople().find(x=>x.ref===v&&(x.kind==="rival"||x.kind==="hh"))||curPeople().find(x=>x.ref===v&&x.kind==="chest");
    if(!p)F(sc+"/"+bu+" palace "+palaceOf(v)+": no entry (her or her chest) for "+v.name);
    else{const O=offered(p);for(const id of ids){const c=cls(id)[0];if(c!=="palace"&&c!=="either")continue;R.n.pal++;if(O.s.has(id)||O.names.has(btnName(v,i,id)))R.n.palOk++;else F(sc+"/"+bu+" palace miss "+id+" ("+v.name+", "+p.kind+")")}
     if(p.kind==="chest"){R.n.absent++;for(const id of O.s){const c=cls(id)[0];if(c==="person"||c==="personE")F(sc+"/"+bu+" ABSENT actable face-to-face "+id+" on chest of "+v.name)}}}}
   else R.skip.palaceDenied=(R.skip.palaceDenied||0)+1;
   /* D where she is */
   const w=whereOf(v);if(w&&w!==palaceOf(v)||true){if(go(w)){const p=curPeople().find(x=>x.ref===v&&x.kind!=="chest");
     if(!p){R.n.perSkip++;R.skip["notOnStage@"+w]=(R.skip["notOnStage@"+w]||0)+1}
     else{const O=offered(p);for(const id of ids){const c=cls(id)[0];if(c!=="person"&&c!=="either"&&c!=="personE")continue;R.n.per++;if(O.s.has(id)||O.names.has(btnName(v,i,id)))R.n.perOk++;else F(sc+"/"+bu+" person miss "+id+" ("+v.name+" @"+w+")")}}
     /* E: nobody else's pop-up stands for her here, and at a place where she is not there is no pop-up of her */
     const other=["vuon","tyv","nvp","tn"].find(k=>k!==w&&k!==palaceOf(v));if(other&&go(other)&&curPeople().some(x=>x.ref===v&&x.kind!=="chest")&&whereOf(v)!==other)F(sc+"/"+bu+" "+v.name+" on stage at "+other+" but lives at "+whereOf(v))}
    else{R.n.perSkip++;R.skip["denied@"+w]=(R.skip["denied@"+w]||0)+1}}}
  /* F: the Emperor + Thái hậu pop-ups (day only) */
  if(bu<3){S.where.emp="vuon";if(go("vuon")){let p=curPeople().find(x=>x.kind==="emp");if(!p){S.visit.people.push({kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:""});p=curPeople()[curPeople().length-1]}
    const A=talkOpts(p).filter(a=>a&&!a.k61).map(a=>T(a.n));R.n.emp++;const SIX=["Hầu chuyện","Hiến nghệ","Dâng lễ vật","Chặn ngự giá","Xin ân điển","Đút lót lật thẻ"];
    if(A.length!==6||SIX.some(n=>!A.includes(n)))F(sc+"/"+bu+" Emperor pop-up ≠ 6 moves: "+A.join(" | "))}
   if(!S.thDead&&go("tn")){const p=curPeople().find(x=>x.kind==="th");if(p&&!talkOpts(p).some(a=>a&&a.n==="Dâng lễ vật"))F(sc+"/"+bu+" Thái hậu pop-up lacks Dâng lễ vật")}}}
 return R})()`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);const R=await p.evaluate(RUN);await b.close();
 const N=R.n;console.log(`ACT-MOVE REACH · ${URL}`);
 console.log(`A cards checked ${N.card} · B card keys ${N.keys} · C palace ${N.palOk}/${N.pal} · D person ${N.perOk}/${N.per} (skipped ${N.perSkip}) · E absent chests ${N.absent} · F Emperor pop-ups ${N.emp}`);
 console.log('skips',JSON.stringify(R.skip));const C={};for(const id in R.classes)(C[R.classes[id]]=C[R.classes[id]]||[]).push(id);for(const c in C)console.log(`  ${c}: ${C[c].sort().join(' ')}`);
 console.log('page errors',perr.length,perr.slice(0,3).join(' | '));
 if(R.fail.length||perr.length){console.log('FAIL',R.fail.length);R.fail.forEach(f=>console.log('  - '+f));process.exit(1)}console.log('PASS')})();
