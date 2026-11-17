/* Twin-socket probe: B's first socket is held 3 s before it reaches the Worker; B joins again meanwhile (link + tap).
   Old jcoop: the late twin replaces the live socket (4001) → B "moved". Fixed: B ends "open". usage: python3 dev/build/assemble.py && node dev/test/coop-twin.js [workerURL] (review/coop-stable) */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
const W=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch({args:['--disable-web-security','--disable-features=PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults']});
 const mk=async()=>{const c=await b.newContext();await serve(c);await c.addInitScript(u=>{window.COOP_URL=u},W);const p=await c.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.COOP&&COOP.create,null,{timeout:120000});return p};
 const A=await mk();const code=await A.evaluate(async()=>(await COOP.create()).room);
 const B=await mk();
 await B.evaluate(c=>{COOP.join(c).catch(()=>{});setTimeout(()=>COOP.join(c).catch(()=>{}),300)},code);
 await sleep(2500);/* the abandoned first socket of B arrives late at the Worker (same pid): opened here from A's page */
 const pid=await B.evaluate(c=>COOP.pidFor(c),code);await A.evaluate(([u,c,pid])=>{window.__twin=new WebSocket(u.replace(/^http/,'ws')+'/api/room/'+c+'/ws?pid='+pid+'&name=')},[W,code,pid]);await sleep(5000);const r=await B.evaluate(()=>({status:COOP.state.status,you:COOP.state.you}));const ok=r.status==='open'&&r.you==='b';console.log((ok?'ok  ':'FAIL')+' guest keeps her seat after her own late twin socket',JSON.stringify(r));await b.close();process.exit(ok?0:1)})();
