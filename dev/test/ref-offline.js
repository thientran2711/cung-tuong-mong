/* dev/test/ref-offline.js — review/offline-fast (MAIN 127, owner flight 25/11): EVERY picture the game can name is in the offline set (assets.json),
   so «Tải hết để chơi offline» really brings all of it and nothing is asked for that does not exist (a 404 online = a hole offline).
   1. STATIC  every literal img/….webp|png|jpg|mp4|webm in the game code (comments stripped) is in assets.json.
   2. RUNTIME (built root, Fold): after the title and one new life, the picture tables the game draws names from —
        FPOOL (every face pool, j17/j22/j25), SCN_HAVE (every scene variant j94 may show), SCIMG + SCN_FALL bases, AIMG / item icons —
      each name is in assets.json; the face pools must also be group 'core' (probed at every start: offline without «Tải hết» too).
   3. no request of the session got a 404 for an img/ file.
   ALLOW: names a probe asks for ONLY once kitAssetHas() lists them (j94 scnLive: nvp-ha-sang, tu-ninh-cung-ngu-ha-sang — art pending Foreman C).
   usage: node dev/test/ref-offline.js   (needs the built root: bash dev/site/build_site.sh). Exit 1 on any miss. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const D=require('./lib/device');
const ROOT=path.resolve(__dirname,'../..');let fails=0;const ok=(c,m,x)=>{console.log((c?'PASS ':'FAIL ')+m+(x!==undefined?' · '+JSON.stringify(x).slice(0,900):''));if(!c)fails++};
const MAN=JSON.parse(fs.readFileSync(path.join(ROOT,'assets.json'),'utf8'));const G=new Map(MAN.files.map(f=>[f[0],f[3]]));
const ALLOW=new Set(['img/nvp-ha-sang.webp','img/tu-ninh-cung-ngu-ha-sang.webp']);
const norm=u=>{u=String(u||'');const m=/(img\/[^?#"')\s]+)/.exec(u);return m?decodeURIComponent(m[1]):null};
(async()=>{
 /* 1. static */
 const code=fs.readFileSync(path.join(ROOT,'dev/index.html'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/(^|[^:\\])\/\/[^\n]*/g,'$1');
 const lits=[...new Set(code.match(/img\/[A-Za-z0-9_\-\/]+\.(?:webp|png|jpg|mp4|webm)/g)||[])].filter(l=>!/(^|\/)(x|item-X|islot-frame-G)\.webp$/.test(l));
 const sm=lits.filter(l=>!G.has(l)&&!ALLOW.has(l));ok(!sm.length,`static: ${lits.length} literal picture paths in the code are in assets.json`,sm);
 /* 2 + 3. runtime */
 const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{serviceWorkers:'block'});
 const p=await ctx.newPage();const n404=new Set();ctx.on('response',r=>{if(r.status()===404){const k=norm(r.url());if(k)n404.add(k)}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));
 const g=await D.openDirect(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&typeof FPOOL==='object',null,{timeout:120000});
 await g.evaluate(()=>{try{window.KLIFE&&(KLIFE.off=true);document.getElementById('title').hidden=true;start()}catch(e){}});await p.waitForTimeout(6000);
 const R=await g.evaluate(()=>{const out={faces:[],scenes:[],icons:[]};const W=x=>x&&typeof x==='string'&&x[0]!=='@'?x:null;
  for(const k in FPOOL)for(const f of (FPOOL[k]||[]))if(W(f))out.faces.push('img/'+f+'.webp');
  try{for(const k in SCN_HAVE)out.scenes.push('img/'+k+'.webp')}catch(e){}
  try{for(const k in SCIMG)out.scenes.push('img/'+SCIMG[k]+'.webp')}catch(e){}
  try{if(typeof AIMG==='object')for(const k in AIMG){const v=AIMG[k];if(typeof v==='string'&&v)out.icons.push(/\//.test(v)?v:'img/'+v+(/\.\w+$/.test(v)?'':'.webp'))}}catch(e){}
  return out});
 const chk=(L,name,core)=>{const u=[...new Set(L.map(norm).filter(Boolean))];const miss=u.filter(x=>!G.has(x)&&!ALLOW.has(x));ok(!miss.length,`runtime: every ${name} (${u.length}) is in assets.json`,miss);
  if(core){const nc=u.filter(x=>G.has(x)&&G.get(x)!=='core');ok(!nc.length,`runtime: every ${name} is in the start-up (core) set`,nc)}};
 chk(R.faces,'face of every pool (FPOOL)',true);chk(R.scenes,'scene variant (SCN_HAVE + SCIMG)',false);chk(R.icons,'AIMG icon',false);
 const b404=[...n404].filter(x=>!ALLOW.has(x));ok(!b404.length,'no img/ request answered 404 in the session',b404);
 ok(!errs.length,'no page errors',errs);
 await b.close();srv.close();console.log(fails?`FAILED ${fails}`:'ALL PASS');process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(1)});
