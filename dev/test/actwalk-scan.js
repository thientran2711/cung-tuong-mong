/* actwalk-scan (W10, LAW 11 «shown == applied», RV wave 2 residual c): after an act card, jstagehere actMove walks her into the act's
   place (ACT_PLACE) through goTo. Any stat goTo changes on that walk is NOT on the act's result card. For every ACT_PLACE act, with the
   Emperor (and every rival) present at the place and every roll forced fail and then pass, this records her stat deltas of the walk alone.
   usage: python3 dev/build/assemble.py && node dev/test/actwalk-scan.js [index.html]   exit 1 when any walk changes a stat */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');const LIB=fs.readFileSync(path.join(__dirname,'act-audit.js'),'utf8').match(/String\.raw`([\s\S]*?)`;/)[1];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext();await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+path.resolve(GAME));
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(3000);await p.evaluate(LIB);
 const rows=await p.evaluate(()=>{AA.scen("dau");quiet=true;recAt=()=>null;/* the roster schedule would decide who is there: S.where (set below) puts the Emperor and every rival at the place */const K=["sung","danh","suc","bac","duc","th","hh","an","mat","tamco","sac","tai"];const out=[];
  const acts=Object.entries(window.ACT_PLACE||{});
  for(const [n,k] of acts)for(const F of [false,true]){S.place="home";S.where=S.where||{};S.where.emp=k;for(const v of liveRivals(true))S.where[v.id]=k;
   S.sung=20;const s0={};K.forEach(x=>s0[x]=S[x]);const by=[];Error.stackTraceLimit=50;
   const val={};K.forEach(x=>{val[x]=S[x];Object.defineProperty(S,x,{configurable:true,enumerable:true,get(){return val[x]},set(y){if(y!==val[x])by.push(x+" "+(new Error().stack.split("\n").slice(2).map(z=>(z.match(/at ([\w.$<>]+) /)||[])[1]).filter(z=>z&&!/^(goTo|window|Object|apply|ap|eval|actMove|cl)$/.test(z)).slice(0,3).join("<")||"?"));val[x]=y}})});const l0=(S.log||[]).length;AA.force=F;Q.length=0;let moved=false;
   try{moved=actMove(k)}catch(e){out.push({n,k,F,err:e.message});continue}
   K.forEach(x=>{const y=val[x];delete S[x];S[x]=y});const d=K.filter(x=>S[x]!==s0[x]).map(x=>`${x} ${s0[x]}→${S[x]}`);const quest=by.length>0&&by.every(t=>/ note/.test(t)||/^bac note/.test(t));
   out.push({n,k,F,moved,d:d.join(", "),quest,by:[...new Set(by)].join("; ")});K.forEach(x=>S[x]=s0[x]);Q.length=0}
  AA.force=null;return out});
 const bad=rows.filter(r=>r.d&&!r.quest);
 console.log('| act | place | rolls | moved | stat change on the walk | cause (call site) |\n|---|---|---|---|---|---|');
 for(const r of rows)if(r.d||r.err)console.log(`| ${r.n} | ${r.k} | ${r.F?'pass':'fail'} | ${r.moved} | ${r.err||r.d}${r.quest?' (ma ma quest reward, own card)':''} | ${r.by||''} |`);
 console.log(`acts ${rows.length/2} · walks ${rows.length} · walks that change a stat (not a quest reward): ${bad.length} · page errors ${errs.length}`);
 await b.close();process.exit(bad.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
