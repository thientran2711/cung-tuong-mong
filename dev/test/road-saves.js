/* road-saves (review/road-map): saves and the full origin roads (jroad.js).
   1) a save from the MAIN build (before the frame and the roads) loads, keeps its plan, has no S.st.f14.rd, plays 60 buổi;
   2) a save of this build in a life whose road is NOT full (phase-1 frame, an origin whose road is not full) loads, keeps its plan, plays on;
   3) a full-road life (tt, dtq, muoi, cn; argv origins or env ROADS=nc,bd,td,ch,thd,cnv for other origins) saved in the middle of the road (ser → deser) keeps the road, its cast and its plan, and plays on.
   usage: node dev/test/road-saves.js <url> <main url> [origins, default tt,dtq,muoi,cn] */
const {chromium}=require('playwright');
const [,,URL,MAIN,OR]=process.argv;/* OR = comma list of origins for the full-road mid-road save (default tt; B3: thd,cnv) */
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,700))};
 const boot=async url=>{const [VW,VH]=(process.env.VP||'1180x820').split('x').map(Number);const ctx=await b.newContext({viewport:{width:VW,height:VH},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
  p.on('pageerror',e=>errs.push(url.slice(-20)+': '+e.message.slice(0,200)));await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);return p};
 const mk=async(url,k,months)=>{for(let t=0;t<4;t++){const r=await mk1(url,k,months);if(!r||!r.retry)return r}return{retry:1}};/* boot can reset S after a rebuild: retried */
 const mk1=async(url,k,months)=>{const q=await boot(url);const s=await q.evaluate(async([k,months])=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
   SLOT=3;window.__forceOrigin=k;document.getElementById('title').hidden=true;quiet=true;start();quiet=false;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});/* start() can set S a tick later (fresh storage) */if(typeof S==='undefined'||!S)return{retry:1};
   for(let m=0;m<months;m++){const t=S.turn;for(let g=0;g<40&&S&&S.turn===t;g++){Q.length=0;used=0;nextBuoi()}
    const A=S&&S.st&&S.st.M;if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);res67(thKey67(A),A.cur,0,O[0]&&O[0].o!=null?oOf67(A,O[0],bd):100)}
    if(S&&S.st&&S.st.ms&&typeof msDone67==='function'){S.st.ms.t0=-99}}
   Q.length=0;if(!S)return{retry:1};return{save:JSON.stringify(ser()),rd:S.st.f14?S.st.f14.rd||'':'-',plan:S.st.ch&&S.st.ch.plan.join(','),n:S.st.ch&&S.st.ch.n,act:S.st.f14&&S.st.f14.act?JSON.stringify(S.st.f14.act):''}},[k,months]);
  await q.context().close();return s};
 const olds=[];if(MAIN)olds.push(['main build (dtq)',await mk(MAIN,'dtq',3),'old']);olds.push(['this build, phase-1 frame (td: road not full on this branch)',await mk(URL,'td',3),'p1']);
 try{localStorage}catch(e){}
 for(const k of (OR||process.env.ROADS||'tt,dtq,muoi,cn').split(','))olds.push([`this build, full road (${k}) mid-road`,await mk(URL,k,40),'full']);
 const q=await boot(URL);
 for(const [nm,o,kind] of olds){if(o.retry){chk(`${nm}: save built`,false,o);continue}
  const r=await q.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;deser(JSON.parse(s));
   const plan=S.st.ch&&S.st.ch.plan.join(','),rd=S.st.f14?S.st.f14.rd||'':'-',act=S.st.f14&&S.st.f14.act?JSON.stringify(S.st.f14.act):'';const n0=S.st.ch&&S.st.ch.n;
   for(let i=0;i<60;i++){Q.length=0;used=0;try{nextBuoi()}catch(e){return{err:e.message}}}Q.length=0;tab='story';render();const st=(document.getElementById('panel')||{}).textContent||'';tab='act';render();
   return{rd,act,plan0:plan,same:plan===(S.st.ch&&S.st.ch.plan.join(',')),n0,n:S.st.ch&&S.st.ch.n,story:st.length}},o.save);
  console.log(nm,JSON.stringify({rd:r.rd,n0:r.n0,n:r.n,same:r.same,err:r.err}));
  if(kind==='old')chk(`${nm}: loads, no road state, plays on`,!r.err&&(r.rd==='-'||r.rd==='')&&r.n>=r.n0,r);
  if(kind==='p1')chk(`${nm}: loads, keeps the phase-1 plan, plays on`,!r.err&&!r.rd&&/o,o,o,o,fin|o,.*fin/.test(r.plan0)&&r.n>=r.n0,r);
  if(kind==='full')chk(`${nm}: keeps road ${o.rd}, its cast and plan, plays on`,!r.err&&r.rd===o.rd&&!!o.rd&&r.act===o.act&&r.plan0===o.plan&&r.n>=r.n0&&r.story>0,{r,o:{rd:o.rd,act:o.act,n:o.n}})}
 chk('no page errors',!errs.length,errs.slice(0,5));
 const nb=ok.filter(x=>!x[1]).length;console.log(`road-saves: ${ok.length-nb}/${ok.length} pass`);await b.close();process.exit(nb?1:0)})();
