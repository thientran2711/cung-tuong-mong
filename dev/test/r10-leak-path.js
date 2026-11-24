/* robot-fix-cnv F4 helper: after 3 in-place loads, take a heap snapshot and print the retainer path(s) from GC roots to an OLD S (tagged with a
   LeakMark instance before the load). usage: node dev/test/r10-leak-path.js <save.json> */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},fs.readFileSync(process.argv[2],'utf8'));
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 await p.evaluate(()=>{$("title").hidden=false;showTitle();document.querySelector('#slots [data-load="1"]').click();class LeakMark{};window.LeakMark=LeakMark;
  for(let i=0;i<3;i++){Object.defineProperty(S,'__lk',{value:new LeakMark(),enumerable:false});const s=JSON.stringify(ser());quiet=true;deser(JSON.parse(s));quiet=false;try{render()}catch(e){}}});
 const cdp=await ctx.newCDPSession(p);await cdp.send('HeapProfiler.enable');await cdp.send('HeapProfiler.collectGarbage');
 let chunks=[];cdp.on('HeapProfiler.addHeapSnapshotChunk',e=>chunks.push(e.chunk));await cdp.send('HeapProfiler.takeHeapSnapshot',{reportProgress:false});
 const snap=JSON.parse(chunks.join(''));chunks=null;const m=snap.snapshot.meta;const NF=m.node_fields.length,EF=m.edge_fields.length;const N=snap.nodes,E=snap.edges,STR=snap.strings;
 const nType=m.node_types[0],eType=m.edge_types[0];const iName=m.node_fields.indexOf('name'),iEC=m.node_fields.indexOf('edge_count'),iT=m.node_fields.indexOf('type');
 const iEN=m.edge_fields.indexOf('name_or_index'),iTo=m.edge_fields.indexOf('to_node'),iET=m.edge_fields.indexOf('type');
 const n=N.length/NF;const first=new Uint32Array(n+1);for(let i=0,e=0;i<n;i++){first[i]=e;e+=N[i*NF+iEC]*EF}first[n]=E.length;
 const rev=new Map();const name=i=>STR[N[i*NF+iName]];
 for(let i=0;i<n;i++)for(let e=first[i];e<first[i+1];e+=EF){const to=E[e+iTo]/NF;const t=eType[E[e+iET]];if(t==='weak')continue;let a=rev.get(to);if(!a)rev.set(to,a=[]);a.push([i,e])}
 const marks=[];for(let i=0;i<n;i++)if(nType[N[i*NF+iT]]==='object'&&name(i)==='LeakMark')marks.push(i);
 const en=e=>{const t=eType[E[e+iET]];return t==='element'||t==='hidden'?'['+E[e+iEN]+']':String(STR[E[e+iEN]])};
 console.log('LeakMark objects alive: '+marks.length);
 for(const mk of marks){/* BFS from the mark back to a root (synthetic node "(GC roots)" or Window) */const prev=new Map([[mk,null]]);const q=[mk];let hit=null;
  while(q.length&&!hit){const x=q.shift();for(const [fr,e] of (rev.get(x)||[])){if(prev.has(fr))continue;prev.set(fr,[x,e]);const nm=name(fr);if(/^\(GC roots\)|^Window /.test(nm)||nm==='(Global handles)'){hit=fr;break}q.push(fr)}}
  if(!hit){console.log('  no root path');continue}const path=[];let c=hit;while(c!==mk){const [x,e]=prev.get(c);path.push(name(c).slice(0,40)+' -'+en(e)+'->');c=x}path.push('LeakMark');console.log('  '+path.join(' '))}
 await b.close()})();
