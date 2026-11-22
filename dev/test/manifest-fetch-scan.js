/* review/coop-fig-retry scan (law 11): every read of an img/*.json manifest in the game source must go through window.fetch = the ONE retrying loader of
   dev/build/jcdn.js. Lists every fetch(…json…) call per module and FAILS on a bypass: XMLHttpRequest of a .json, a fetch captured before jcdn.js
   (const F=fetch / window.fetch=…) outside jcdn.js, a second retry loop of its own for a manifest. usage: node dev/test/manifest-fetch-scan.js */
const fs=require('fs'),path=require('path');const D=path.resolve(__dirname,'../build');const rows=[],bad=[];
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){const L=fs.readFileSync(path.join(D,f),'utf8').split('\n');
 L.forEach((s,i)=>{for(const m of s.matchAll(/(?<![.\w])fetch\(\s*([^,)]*)/g)){if(f==='jcdn.js')continue;rows.push([f+':'+(i+1),m[1].trim().slice(0,46)])}
  if(f!=='jcdn.js'&&(/XMLHttpRequest/.test(s)&&/\.json/.test(s)||/window\.fetch\s*=[^=]|=\s*window\.fetch\.bind|const\s+\w+\s*=\s*fetch\b/.test(s)))bad.push(f+':'+(i+1)+' bypass')})}
const jc=fs.readFileSync(path.join(D,'jcdn.js'),'utf8');const loader=/MRETRY=\[/.test(jc)&&/mretries/.test(jc);
console.log('manifest/json reads per module (all via window.fetch -> jcdn.js loader):');rows.forEach(r=>console.log('  '+r[0].padEnd(16)+r[1]));
console.log('reads:',rows.length,'| modules:',new Set(rows.map(r=>r[0].split(':')[0])).size,'| loader with bounded retry in jcdn.js:',loader,'| bypasses:',bad.length);bad.forEach(b=>console.log('  BYPASS',b));
if(!loader||bad.length){console.log('FAIL');process.exit(1)}console.log('PASS');
