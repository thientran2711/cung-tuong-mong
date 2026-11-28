/* coop-host-lag SCAN (law 11, family "a HOST-only world write reaches the guest one merged week late").
   A merged week reaches each seat as fromCanon -> deser(C) -> the deser hooks -> render (lazy picks). Every world write in that path
   that the HOST makes and the GUEST does not make the same way lands only in the host's NEXT week's C: the guest sees it one merged
   week late. This scan replays that path on ONE page from the same saved world, once as the host (seat a) and once as the guest
   (seat b), with different random streams, and diffs the canonical world (W of C: the W_KEYS of S + the NPCs, viewer rows dropped)
   against the world before the replay.
     host-only  = changed on the host, not (or differently) on the guest  -> a family member (must reach the guest in the same week)
     same       = both seats wrote the same value (deterministic fix-up)  -> fine
     guest-only = the guest wrote a world value the host did not           -> the merge drops it (host wins): a guest-side divergence
   usage: node dev/test/coop-host-lag-scan.js [lives=4] [months=14]
   A LISTER (it finds the family members; it runs no co-op room, so the relay of jcoophl is not in it): exit 0 with the table. The GATE is
   dev/test/coop-e2e.js 'the same world on both seats' (two seats, the LIVE Worker) + COOP_HL_FORCE=1 (forced members (a) and (b)). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
const LIVES=+process.argv[2]||4,MONTHS=+process.argv[3]||14;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});await serve(ctx);
 const p=await ctx.newPage();p.setDefaultTimeout(600000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:180000});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true});
 /* the face rows (FIGIX) arrive from the CDN: wait for them, so the lazy face picks can run as on a phone */
 await p.waitForFunction(()=>typeof figxReady!=='function'||figxReady(),null,{timeout:60000}).catch(()=>{});
 const all={};let bad=0;
 for(let life=0;life<LIVES;life++){
  const r=await p.evaluate(([life,MONTHS])=>{localStorage.clear();window.__forceOrigin=ORIGINS[life%ORIGINS.length].k;start();Q.length=0;const sm=showModal;showModal=()=>{};
   for(let m=0;m<MONTHS;m++)for(let t=0;t<3;t++){Q.length=0;S.mg=null;S.dead=0;S.suc=100;S.buoi=0;used=0;try{endTurn()}catch(e){}}
   Q.length=0;const D=JSON.stringify(ser());
   const wc=()=>{const X=COOPW.X,J=X.J;const d=ser();const sS=d.S;const W={};for(const k of X.W_KEYS)if(k in sS){const v=J(sS[k]);if(k==='cm'&&v)for(const f of X.CM_P)delete v[f];if(k==='men'&&Array.isArray(v))for(const x of v)if(x)for(const f of X.MEN_P)delete x[f];W[k]=v}
    if(W.emp)delete W.emp.known;const R=d.R.filter(r=>!r.coop).map(r=>{for(const f of ['rel','oan','ghen','ev','rl','ro','gp','ep','evm','evR'])delete r[f];return r});
    const out={};const fl=(v,p)=>{if(v&&typeof v==='object'){const ks=Object.keys(v);if(!ks.length)out[p]=Array.isArray(v)?'[]':'{}';for(const k of ks)fl(v[k],p+'.'+(Array.isArray(v)&&v[k]&&(v[k].id!=null||v[k].sid!=null)?'#'+(v[k].id!=null?v[k].id:'s'+v[k].sid):k))}else out[p]=v};
    fl(W,'S');R.forEach(r=>fl(r,'R#'+r.id));return out};
   /* every lazy face pick a screen can make: the Thái hậu, every NPC, her staff, the court (what render draws over a week) */
   const picks=()=>{try{if(S.thO&&typeof figFor==='function')figFor({kind:'th'},'fig')}catch(e){}
    try{for(const v of rivals){if(v.coop)continue;figPick(v);(v.staff||[]).forEach(s=>{try{figPick(s)}catch(e){}});(v.kids||[]).forEach(k=>{try{figPick(k)}catch(e){}})}}catch(e){}
    try{(S.staff||[]).forEach(s=>{try{figPick(s)}catch(e){}})}catch(e){}};
   const seedR=n=>{let s=n>>>0;Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}};const R0=Math.random;
   const run=(seat,seed)=>{const CW=COOPW;const was={on:CW.on,seat:CW.seat};CW.on=true;CW.seat=seat;seedR(seed);let w=null,err=null;
    try{deser(JSON.parse(D));try{render()}catch(e){err='render '+e.message}picks();w=wc()}catch(e){err=e.message}finally{CW.on=was.on;CW.seat=was.seat;Math.random=R0}return{w,err}};
   deser(JSON.parse(D));const w0=wc();
   const A=run('a',1234+life),B=run('b',98765+life);showModal=sm;
   const keys=[...new Set(Object.keys(w0).concat(Object.keys(A.w||{}),Object.keys(B.w||{})))];const js=x=>JSON.stringify(x);
   const host=[],guest=[],same=[];for(const k of keys){const a=A.w&&A.w[k],g=B.w&&B.w[k],o=w0[k];const ca=js(a)!==js(o),cg=js(g)!==js(o);
    if(ca&&cg&&js(a)===js(g))same.push(k);else if(ca)host.push(k+' '+js(o)+' -> A '+js(a)+' / B '+js(g));else if(cg)guest.push(k+' '+js(o)+' -> B '+js(g))}
   return{life,origin:S.origin&&S.origin.k,errA:A.err,errB:B.err,host,guest,same:same.length}},[life,MONTHS]);
  const cut=L=>L.map(s=>s.slice(0,220));console.log(JSON.stringify({life:r.life,origin:r.origin,errA:r.errA,errB:r.errB,host:r.host.length,guest:r.guest.length,same:r.same,hostEx:cut(r.host.slice(0,12)),guestEx:cut(r.guest.slice(0,8))}));
  /* family table: the path with ids stripped -> count */
  const fam=s=>s.split(' ')[0].replace(/#s?\d+/g,'#').replace(/\.\d+(\.|$)/g,'.n$1');
  for(const s of r.host){const k='host-only '+fam(s);all[k]=(all[k]||0)+1}for(const s of r.guest){const k='guest-only '+fam(s);all[k]=(all[k]||0)+1}
  bad+=r.host.length+r.guest.length}
 console.log('\n| side | world path (ids stripped) | hits |\n|---|---|---|');for(const [k,n] of Object.entries(all).sort((a,b)=>b[1]-a[1])){const [s,...q]=k.split(' ');console.log(`| ${s} | ${q.join(' ')} | ${n} |`)}
 console.log('page errors',errs.length,errs.slice(0,4));console.log('LISTED '+bad+' differing paths');await b.close();process.exit(errs.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
