/* hue-dead (save round-trip family, robot10-coop row `R[].staff[].hue: 0 → undefined`): `hue` is a dead field — j17 ageInit deletes it
   from S, every consort and every servant on load, and no code reads it on saved objects (portrait records keep their own `hue`).
   The creators of saved people (j10 mkServ, j3 drawFace → new consorts, jstaff elder servant, jcoopworld friend servant) must not write it,
   else a save → load → save changes the state. Checks: the creators' output has no own `hue`; after a fresh life + buổi steps no saved person
   (S, rivals, every servant) holds `hue`; the source of those creators has no `hue:` key.
   usage: node dev/test/hue-dead.js [dev/index.html]   → exit 1 on FAIL or page error */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');const HTML=process.argv[2]||'dev/index.html';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{let sd=20261124;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;
  const has=o=>!!o&&Object.prototype.hasOwnProperty.call(o,'hue');
  const made={mkServMaid:has(mkServ('maid')),mkServEun:has(mkServ('eunuch')),drawFace:has(drawFace())};
  const scan=()=>{const L=[];if(has(S))L.push('S');(rivals||[]).forEach((v,i)=>{if(has(v))L.push('R'+i)});(typeof allServ==='function'?allServ():[]).forEach(s=>{if(has(s))L.push('srv:'+s.sid)});return L};
  const at0=scan();for(let i=0;i<12;i++){try{const n=document.getElementById('next');if(typeof closeM==='function')closeM();if(n&&!n.disabled)n.click()}catch(e){}}
  return{made,at0,after:scan()}});
 ok(!r.made.mkServMaid&&!r.made.mkServEun,'mkServ (j10) makes a servant without `hue`',r.made);
 ok(!r.made.drawFace,'drawFace (j3, merged into new consorts) has no `hue`',r.made);
 ok(!r.at0.length&&!r.after.length,'no saved person holds `hue` (fresh life, after buổi steps)',{at0:r.at0.slice(0,5),after:r.after.slice(0,5)});
 const src=['j10.js','j3.js','jstaff.js','jcoopworld.js'].map(f=>fs.readFileSync(path.join(__dirname,'../build',f),'utf8')).join('\n');
 ok(!/af:\{\},hue:0/.test(src)&&!/face:0,hue:0,age:/.test(src)&&!/\.length,hue:0,/.test(src)&&!/face:-?1?f?,hue:0\}/.test(src.replace(/face:f,hue/,'face:-1,hue')),'creators of saved people write no `hue:` key (j10 / j3 / jstaff / jcoopworld)');
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();
 const pass=res.every(Boolean);console.log(pass?'HUE-DEAD PASS':'HUE-DEAD FAIL');process.exit(pass?0:1)})();
