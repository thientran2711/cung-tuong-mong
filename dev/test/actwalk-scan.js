/* actwalk-scan (W10, LAW 11 «shown == applied», RV wave 2 residual c): after an act card, jstagehere actMove walks her into the act's
   place (ACT_PLACE) through goTo. Any stat goTo changes on that walk is NOT on the act's result card. For every ACT_PLACE act, with the
   Emperor (and every rival) present at the place and every roll forced fail and then pass, this records her stat deltas of the walk alone.
   W10b round 4: also S.known — every familiarity step (K61STN) that rises on the walk must be on a result card afterwards, in both paths:
   «merge» = the act's card still up (the step joins its Được line), «closed» = the card already gone (the kit result card shows it).
   Part 2 (W10b): the REAL act(i) of every ACT_PLACE act the deck deals (j61's audience wrapper raises S.known after the base act's card:
   Thỉnh an Hoàng hậu / Thái hậu), rolls forced fail and pass, in «dau» (strangers) and «hau»: every step risen since the tap must be on
   one of the result cards it made (act card merged, or the kit result card).
   usage: python3 dev/build/assemble.py && node dev/test/actwalk-scan.js [index.html]   exit 1 when any walk changes a stat or a familiarity step unshown */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');const LIB=fs.readFileSync(path.join(__dirname,'act-audit.js'),'utf8').match(/String\.raw`([\s\S]*?)`;/)[1];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext();await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+path.resolve(GAME));
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(3000);await p.evaluate(LIB);
 const rows=await p.evaluate(()=>{AA.scen("dau");quiet=true;recAt=()=>null;/* the roster schedule would decide who is there: S.where (set below) puts the Emperor and every rival at the place */const K=["sung","danh","suc","bac","duc","th","hh","an","mat","tamco","sac","tai"];const out=[];
  const acts=Object.entries(window.ACT_PLACE||{});
  if(typeof actKn!=="function")window.actKn=()=>{};/* a build before W10b (before/after table) */window.__bot=0;const KW=K61STN.slice(1).map(w=>w.toLowerCase());const pl=x=>String(x).replace(/<[^>]*>/g,"");
  const duocN=()=>{const L=window.kaLastResult;const r=L&&Array.isArray(L.rows)&&L.rows.find(x=>x.k==="duoc");if(!r)return 0;let c=0;for(const it of r.items){const t=pl(it);for(const w of KW)c+=(t.match(new RegExp(w,"g"))||[]).length}return c};
  for(const [n,k] of acts)for(const F of [false,true])for(const M of ["merge","closed"]){S.place="home";const kn0=Object.assign({},S.known||{});
   const t0=document.getElementById("rtoast");if(M==="merge"&&typeof kitResultCard==="function")kitResultCard({title:n,ok:true,rows:[{k:"mat",label:"Mất",items:['<span class="ef r">Sức −1</span>']}]});else{if(t0)t0.classList.remove("on");window.kaLastResult=undefined}const c0=duocN();S.where=S.where||{};S.where.emp=k;for(const v of liveRivals(true))S.where[v.id]=k;
   S.sung=20;const s0={};K.forEach(x=>s0[x]=S[x]);const by=[];Error.stackTraceLimit=50;
   const val={};K.forEach(x=>{val[x]=S[x];Object.defineProperty(S,x,{configurable:true,enumerable:true,get(){return val[x]},set(y){if(y!==val[x])by.push(x+" "+(new Error().stack.split("\n").slice(2).map(z=>(z.match(/at ([\w.$<>]+) /)||[])[1]).filter(z=>z&&!/^(goTo|window|Object|apply|ap|eval|actMove|cl)$/.test(z)).slice(0,3).join("<")||"?"));val[x]=y}})});const l0=(S.log||[]).length;AA.force=F;Q.length=0;let moved=false;
   try{moved=actMove(k);actKn(kn0,n)}catch(e){out.push({n,k,F,M,err:e.message});continue}
   const rose=Object.keys(S.known||{}).filter(x=>x!=="me"&&(+S.known[x]||0)>(+kn0[x]||0)&&K61STN[+S.known[x]]&&KREG[x]&&KREG[x]!==S);const kd=rose.map(x=>`${x} ${kn0[x]==null?"None":kn0[x]}→${S.known[x]}`).join(", ");
   const shown=duocN()-c0;const knBad=rose.length>shown;
   K.forEach(x=>{const y=val[x];delete S[x];S[x]=y});const d=K.filter(x=>S[x]!==s0[x]).map(x=>`${x} ${s0[x]}→${S[x]}`);/* RV5: a Kỳ ngộ on arrival (jky kyArrive → fireMe, Math.random, not a forced roll) pushes its OWN «Kỳ ngộ» card with the gain words (runOpt «Danh +2»):
      own card when every stat it moved is printed with that delta on a Q ky card (was the 1-in-16 «hidden» hit of W10b) */
   const KYN={danh:"Danh",sung:"Sủng",duc:"Đức",tamco:"Tâm cơ",suc:"Sức",bac:"Bạc"},kyQ=Q.filter(q=>q&&q.ky).map(q=>pl(q.h||"")).join(" ");
   const kyOk=x=>{const dd=S[x]-s0[x];return KYN[x]&&kyQ.includes(`${KYN[x]} ${dd>0?"+":"−"}${Math.abs(dd)}`)||kyQ.includes(`${KYN[x]} ${dd>0?"+":"-"}${Math.abs(dd)}`)};
   const quest=by.length>0&&by.every(t=>/ note/.test(t)||/^bac note/.test(t)||(/kyArrive/.test(t)&&kyOk(t.split(" ")[0])));
   out.push({n,k,F,M,moved,d:d.join(", "),quest,by:[...new Set(by)].join("; "),kd,rose:rose.length,shown,knBad});K.forEach(x=>S[x]=s0[x]);for(const x in S.known)if(!(x in kn0))delete S.known[x];Object.assign(S.known,kn0);Q.length=0}
  AA.force=null;return out});
 const R2=[];await p.evaluate(()=>{window.__awF={};for(const sc of ["hau","dau"]){AA.scen(sc);for(let i=0;i<80;i++){try{deal()}catch(e){}for(const a of deck||[])if(a&&ACT_PLACE[a.n]&&!window.__awF[a.n])window.__awF[a.n]=a}}});
 for(const sc of ["dau","hau"])R2.push(...await p.evaluate(async(sc)=>{AA.scen(sc);quiet=true;window.__bot=0;const pl=x=>String(x).replace(/<[^>]*>/g,"");const KW=K61STN.slice(1).map(w=>w.toLowerCase());
  const seen=[];const rs0=resultShow;resultShow=function(){const r=rs0.apply(this,arguments);if(window.kaLastResult&&!seen.includes(window.kaLastResult))seen.push(window.kaLastResult);return r};
  const kc0=window.kitResultCard;window.kitResultCard=function(){const r=kc0.apply(this,arguments);if(window.kaLastResult&&!seen.includes(window.kaLastResult))seen.push(window.kaLastResult);return r};
  const words=()=>{let c=0;for(const L of seen)for(const r of (L.rows||[]))if(r.k==="duoc")for(const it of r.items){const t=pl(it);for(const w of KW)c+=(t.match(new RegExp(w,"g"))||[]).length}return c};
  const found=window.__awF;/* the cards of both scenarios' deals (Thỉnh an … is dealt in «hau»; its wrappers key on the name) */
  const snap=AA.snap?null:null;void snap;const out=[];
  for(const [n,a0] of Object.entries(found))for(const F of [false,true]){AA.restore&&AA.restore();AA.hide&&AA.hide();S.place="home";used=0;S.suc=80;Q.length=0;window.__actPend=null;
   const t0=document.getElementById("rtoast");if(t0)t0.classList.remove("on");window.kaLastResult=undefined;seen.length=0;
   let i=deck.findIndex(x=>x&&x.n===n);if(i<0){deck.push(a0);i=deck.length-1}deck[i].done=false;const kn0=Object.assign({},S.known||{});AA.force=F;let err="";
   try{act(i)}catch(e){err=e.message}for(let j=0;j<4&&Q.length;j++){Q.length=0;try{actPendRun()}catch(e){}}await new Promise(r=>setTimeout(r,30));
   const rose=Object.keys(S.known||{}).filter(x=>x!=="me"&&(+S.known[x]||0)>(+kn0[x]||0)&&K61STN[+S.known[x]]&&KREG[x]&&KREG[x]!==S);
   out.push({sc,n,F,err,place:S.place,kd:rose.map(x=>`${x} ${kn0[x]==null?"None":kn0[x]}→${S.known[x]}`).join(", "),rose:rose.length,shown:words(),cards:seen.length})}
  AA.force=null;resultShow=rs0;window.kitResultCard=kc0;return out},sc));
 const kbad2=R2.filter(r=>r.rose>r.shown);
 console.log('\n### part 2 — real act(i)\n| scen | act | rolls | at | familiarity risen | named on a card | cards |\n|---|---|---|---|---|---|---|');
 for(const r of R2)console.log(`| ${r.sc} | ${r.n} | ${r.F?'pass':'fail'} | ${r.place} | ${r.err||r.kd||''} | ${r.rose?`${r.shown}/${r.rose}${r.rose>r.shown?' ✗':' ✓'}`:''} | ${r.cards} |`);
 console.log(`part 2: acts dealt ${new Set(R2.map(r=>r.sc+r.n)).size} · taps ${R2.length} · with familiarity risen ${R2.filter(r=>r.rose).length} · NOT on a card ${kbad2.length}`);
 const bad=rows.filter(r=>r.d&&!r.quest&&r.M==="merge"),kbad=rows.filter(r=>r.knBad);/* stats: one count per act × rolls (the stat walk is the same in both card paths) */
 console.log('| act | place | rolls | card | moved | stat change on the walk | cause (call site) | familiarity risen | named on a card |\n|---|---|---|---|---|---|---|---|---|');
 for(const r of rows)if(r.d||r.err||r.kd)console.log(`| ${r.n} | ${r.k} | ${r.F?'pass':'fail'} | ${r.M} | ${r.moved} | ${r.err||r.d||''}${r.quest?(/kyArrive/.test(r.by)?' (quest reward / Kỳ ngộ, own card)':' (ma ma quest reward, own card)'):''} | ${r.by||''} | ${r.kd||''} | ${r.rose?`${r.shown}/${r.rose}${r.knBad?' ✗':' ✓'}`:''} |`);
 console.log(`acts ${rows.length/4} · walks ${rows.length/2} (×2 card paths) · walks that change a stat (not a quest reward): ${bad.length} · walks with familiarity risen: ${rows.filter(r=>r.rose).length} · familiarity NOT on a card: ${kbad.length} · page errors ${errs.length}`);
 await b.close();process.exit(bad.length||kbad.length||kbad2.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
