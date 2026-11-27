/* DOOR-ONETAP robot (worker DOOR-ONETAP, MAIN CHÍNH 168; owner OD 27/11 ~01:03Z / ~01:07Z / ~01:12Z / ~01:14Z; plan dev/handover/reports/door-onetap.md).
   Sweep: scenarios dau / cao / hh / con × buổi 0–2 × state variations (arts, bạc, tâm cơ, his likes known) × every place (home, tn, kn, ksp, tyv, nvp,
   vuon, each consort's palace) × every person there; + the Hành sự deck in 6 states; + every NPC's harm options.
     A. a ONE door carries the pick's odds (no o:100 «sure» mask unless the pick is sure); a TIER card has ≤ 3 rows, distinct tiers, nhẹ→nặng order;
        a SPLIT row never stands as a door (Quyền Hoàng hậu, Thỉnh an, Cáo bệnh, An thai, Xin chủ).
     B. FAVOUR doors: the picked member's odds ≥ the best odds of every runnable member (never worse than her best old option).
     C. HARM tiers are bounded: every pick of a tier row is a member of that tier; equal chance → over the seeds every runnable member of the tier is picked.
     D. law 6c: every old member seen (raw list / DOOR.more / deck ways) happens as a RESULT somewhere (picked by a ONE door or a tier row) — a member
        never picked = listed (FAIL unless it is a favour member that is always strictly worse than another, listed as «dominated» for MAIN).
     E. real taps: one ONE tap and one tier-row tap per door kind run the member's own road; Nhật ký gets «<door>: <member thật>»; 0 page errors.
     F. NPC parity (law 1): an NPC's harm options hold at most ONE option per (door, tier, target), each from that tier; at least one grouped choice made.
   usage: node dev/test/door-onetap.js [index.html]   (default dev/index.html — python3 dev/build/assemble.py first) → exit 1 on any failure */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');const {chromium}=require('playwright');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL='file://'+path.resolve(process.argv[2]||path.join(ROOT,'dev/index.html'));
const RUN=String.raw`(()=>{window.__bot=1;const R={fail:[],warn:[],n:{door:0,one:0,tier:0,best:0,pick:0,taps:0,deck:0,npcG:0,npcO:0},seen:{},picked:{},domin:{},split:{}};
 const F=t=>{if(R.fail.length<120&&!R.fail.includes(t))R.fail.push(t)};const T=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
 const go=k=>{Q.splice(0);used=0;S.confined=0;popIdx=null;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo(k)}catch(e){}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}return S.place===k};
 const SPLIT=new Set(["Quyền Hoàng hậu","Xin chủ"]);const SPLITD=new Set(["Thỉnh an","Cáo bệnh","An thai"]);
 const key=(r,m)=>r.k+"|"+T(m.n).replace(/ (cho|với) .+$/,"").replace(/^Bàn tán về .+$/,"Bàn tán về …");
 const see=(r,L)=>{if(r.one1)return;L.forEach(m=>{if(!m.off)R.seen[key(r,m)]=1})};const got=(r,m)=>{if(m)R.picked[key(r,m)]=1};
 const VAR=[()=>{},()=>{for(const a in S.arts)S.arts[a]=20},()=>{S.bac=0},()=>{S.tamco=80;S.bac=9999},()=>{try{for(const k in S.emp.likes)S.emp.known[k]=1}catch(e){}},()=>{for(const a in S.arts)S.arts[a]=Math.floor(Math.random()*12)}];
 const places=()=>["home","tn","kn","ksp","tyv","nvp","vuon"].concat(rivals.filter(v=>v&&v.alive&&!v.out).map(v=>palaceOf(v))).filter((x,i,a)=>x&&a.indexOf(x)===i);
 const check=(p,i)=>{let A=[];try{A=talkOpts(p)}catch(e){F("talkOpts "+e.message);return}
  for(const d of A){if(!d||!d.door)continue;const r=DOOR.byK(d.door);if(!r)continue;R.n.door++;if(SPLIT.has(d.n))F("split door still shown: "+d.n+" ("+p.kind+")");
   const md=ONE.mode(r.k);if(md==="keep"){R.n.keep=(R.n.keep||0)+1;continue}const pp=doorPP(p,i,r.k);const {L}=ONE.members(pp,r);see(r,L);const harm=!!(ONE.M[r.k]||{}).harm;
   const tiers=["nhẹ","vừa","nặng"].filter(t=>L.some(m=>ONE.tierOf(r,m)===t));
   if(md==="tier"&&tiers.length>=2){R.n.tier++;const rows=ONE.tierRows(r,L,"x");if(rows.length>3)F("tier card >3 rows "+r.k);
    const ts=rows.map(x=>x.t);if(new Set(ts).size!==ts.length)F("tier dup "+r.k);
    for(const x of rows){const free=x.T.filter(m=>!m.off);for(let s=0;s<12;s++){const m=ONE.pick(r,x.T,"s"+s+":"+Math.random());if(!m)continue;R.n.pick++;got(r,m);
      if(ONE.tierOf(r,m)!==x.t)F("HARM tier not bounded: "+r.k+" "+x.t+" picked "+T(m.n)+" ("+ONE.tierOf(r,m)+")");
      if(!harm){const best=Math.max(...free.map(ONE.lv));if(ONE.lv(m)<best)F("tier pick worse than best: "+r.k+" "+x.t+" "+T(m.n));free.forEach(o=>{if(ONE.lv(o)<ONE.lv(m))R.domin[key(r,o)]=1})}}}}
   else{R.n.one++;const free=L.filter(m=>!m.off);if(!free.length)continue;
    for(let s=0;s<12;s++){const m=ONE.pick(r,L,"s"+s+":"+Math.random());got(r,m);R.n.pick++;
     if(!harm){const best=Math.max(...free.map(ONE.lv));if(ONE.lv(m)<best)F("ONE pick worse than best: "+r.k+" "+T(m.n));else R.n.best++;
      free.forEach(o=>{if(ONE.lv(o)<ONE.lv(m))R.domin[key(r,o)]=(R.domin[key(r,o)]||0)+1})}}
    if(!harm&&d.o!=null){const best=Math.max(...free.map(ONE.lv));const dl=d.o>=100?KIT_ODDS.length:oddsLv(d.o);if(dl<best&&!(d.o>=100))F("door word worse than best: "+r.k)}}}};
 for(const sc of ["dau","cao","hh","con"])for(let bu=0;bu<3;bu++)for(let vi=0;vi<VAR.length;vi++){AA.scen(sc);S.buoi=bu;S.turn=(S.turn||0)+vi*7+bu;try{VAR[vi]()}catch(e){}used=0;
  for(const k of places()){if(!go(k))continue;curPeople().forEach((p,i)=>{if(p&&p.kind!=="chest"||p&&p.kind==="chest")check(p,i)})}
  /* the Emperor where he stands (day) */if(bu<3){S.where.emp="vuon";if(go("vuon")){const i=curPeople().findIndex(x=>x.kind==="emp");if(i>=0)check(curPeople()[i],i)}}}
 /* E: real taps (one ONE + one tier row per door key) */
 const tapped={};for(const sc of ["cao","dau","hh"])for(const k of places()){AA.scen(sc);if(!go(k))continue;const P=curPeople();
  for(let i=0;i<P.length;i++){const p=P[i];let A=[];try{A=talkOpts(p)}catch(e){continue}
   for(let j=0;j<A.length;j++){const d=A[j];if(!d||!d.door||d.lock||tapped[d.door])continue;tapped[d.door]=1;popIdx=i;Q.splice(0);ONE.last=null;const L0=(S.log||[]).length;
    try{talk(j)}catch(e){F("tap "+d.door+": "+e.message);continue}R.n.taps++;
    if(ONE.mode(d.door)==="keep"){if(!Q.length)F("KEEP door opened no card: "+d.door)}else if(d.one==="one"&&!ONE.last)F("ONE tap ran nothing: "+d.door);
    if(d.one==="tier"){const c=Q[0];if(!c||!c.opts||c.opts.filter(o=>o.go).length>3)F("tier tap no card / >3 rows: "+d.door);else{const o=c.opts.find(x=>x.go&&!x.off);Q.splice(0);if(o){o.go();if(!ONE.last)F("tier row ran nothing: "+d.door)}}}
    if(ONE.last){const hd=d.door;const lg=JSON.stringify((S.logs||[]).slice(0,8));if(!lg.includes(T(ONE.last.n)))R.warn.push("log lacks member "+hd+": "+ONE.last.n)}
    Q.splice(0);popIdx=null;AA.scen(sc);go(k);break}}}
 R.tapped=Object.keys(tapped);
 /* deck doors (Hành sự) */
 const DS=[()=>{},()=>{for(const a in S.arts)S.arts[a]=20},()=>{S.ill={k:Object.keys(ILL)[0],st:2,at:wk()};S.arts.y=5},()=>{S.preg=0;S.tamco=80},()=>{S.buoi=3},()=>{for(const k of S.kids||[]){k.age=Math.max(k.age,4);k.hp=10}}];
 for(const sc of ["cao","con"])for(let s=0;s<DS.length;s++)for(let t=0;t<4;t++){AA.scen(sc);S.turn=(S.turn||0)+t*3;DS[s]();deal();render();const sf=AA.surfaces().find(x=>x.id==="act");AA.show(sf);
  for(const b of document.querySelectorAll("#panel button[data-ddoor]")){R.n.deck++;const nm=b.dataset.ddoor;if(SPLITD.has(nm))F("split deck door still shown: "+nm);
   const r0=ONE.deckRow(b);const r=r0?Object.assign({},r0,{n:nm}):{k:"?",n:nm};const md=ONE.mode(r.k);if(md==="keep")continue;const L=ONE.deckM(b);see(r,L);
   const tiers=["nhẹ","vừa","nặng"].filter(x=>L.some(m=>ONE.tierOf(r,m)===x));
   if(md==="tier"&&tiers.length>=2){for(const x of ONE.tierRows(r,L,"me")){const m=ONE.pick(r,x.T,"d"+Math.random());got(r,m);if(m&&ONE.tierOf(r,m)!==x.t)F("deck tier not bounded "+nm);if(m)x.T.filter(o=>!o.off).forEach(o=>{if(ONE.lv(o)<ONE.lv(m))R.domin[key(r,o)]=1})}}
   else{const free=L.filter(m=>!m.off);const m=ONE.pick(r,L,"d"+Math.random());got(r,m);if(m){const best=Math.max(...free.map(ONE.lv));if(ONE.lv(m)<best)F("deck pick worse "+nm);free.forEach(o=>{if(ONE.lv(o)<ONE.lv(m))R.domin[key(r,o)]=1})}}}}
 /* one real deck tap per door name */{AA.scen("cao");deal();render();AA.show(AA.surfaces().find(x=>x.id==="act"));const b=document.querySelector("#panel button[data-ddoor]:not([disabled])");
  if(b){Q.splice(0);ONE.last=null;b.click();if(Q.length&&Q[0].opts){const o=Q[0].opts.find(x=>x.go&&!x.off);Q.splice(0);if(o)o.go()}if(!ONE.last)F("deck tap ran nothing: "+b.dataset.ddoor);R.n.taps++}}
 /* F: NPCs */
 for(const sc of ["cao","dau","hh","con","cao","dau","hh","con","cao","dau","hh","con"]){if(R.n.npcG>=3)break;AA.scen(sc);S.sung=100;S.rank=Math.max(S.rank,6);for(const v of rivals){if(!v||!v.alive||v.out)continue;try{v.oan=BAL.linkRange.ro[1]/* ALLOT-PACE-2 (RV-163L finding): an EXACT setup write of a full grudge — oanAdd(v,S,100) lands one paced step (stat-pace band cap → ~12) and since oan-pace (f) an NPC plans harm only at grudge heat ≥ BAL.oanPace.act, so the old setup left most NPCs with no harm road at all (3b 3/15 runs vs 3a 13/15); with a real grudge 3a = 3b (10/10, ~79 options / ~31 grouped). The heat gate itself: dev/test/npc-harm-heat.js */}catch(e){}let O=[];try{O=haOpts0(v,agNeeds(v),null)}catch(e){F("haOpts0 "+e.message);continue}
  const G={};for(const o of O){if(!o.door||!o.door.tier||!(ONE.M[o.door.k]||{}).harm)continue;R.n.npcO++;const k=[o.door.k,o.door.tier,o.t&&o.t.id].join("|");if(G[k])F("NPC two options same door+tier+target "+k);G[k]=1;
   if(o.oneOf){R.n.npcG++;const r=DOOR.byK(o.door.k);for(const ak of o.oneOf){const m=DOOR.ofKey(ak);if(!m||m.tier!==o.door.tier)F("NPC group mixes tiers "+k+" "+ak)}}}}}
 R.npcGroups=ONE.npc||0;if(!R.n.npcG)F("NPC: no grouped door+tier choice seen");
 /* D: coverage */
 R.never=Object.keys(R.seen).filter(k=>!R.picked[k]);R.neverDom=R.never.filter(k=>R.domin[k]);R.neverReal=R.never.filter(k=>!R.domin[k]);
 return R})()`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);const R=await p.evaluate(RUN);await b.close();const N=R.n;
 console.log(`DOOR-ONETAP · ${URL}`);
 console.log(`doors seen ${N.door} (ONE ${N.one} · TIER ${N.tier} · KEEP ${N.keep||0}) · picks ${N.pick} · favour picks = best ${N.best} · deck doors ${N.deck} · real taps ${N.taps} (${R.tapped.join(' ')}) · NPC harm options ${N.npcO}, grouped ${N.npcG} (calls ${R.npcGroups})`);
 console.log(`members seen ${Object.keys(R.seen).length} · picked ${Object.keys(R.picked).length} · never picked ${R.never.length} (dominated ${R.neverDom.length})`);
 if(R.neverDom.length)console.log('  dominated (always a better way runnable):',R.neverDom.join(' · '));
 if(R.neverReal.length)console.log('  NEVER PICKED:',R.neverReal.join(' · '));
 if(R.warn.length)console.log('warn',[...new Set(R.warn)].slice(0,12).join(' | '));
 console.log('page errors',perr.length,perr.slice(0,3).join(' | '));
 if(R.neverReal.length)R.fail.push('members never picked (law 6c): '+R.neverReal.length);
 if(R.fail.length||perr.length){console.log('FAIL',R.fail.length);R.fail.forEach(f=>console.log('  - '+f));process.exit(1)}console.log('PASS')})();
