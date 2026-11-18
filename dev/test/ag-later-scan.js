/* AG LATER family scan (npc-chain-land #2, LUẬT SỬA CẢ NHÓM): every deferred path of the ag modules must go through agLater (jagent):
   pinned to its world + buổi, drained at each buổi / week boundary, its dialogs shown at once. A raw setTimeout / requestIdleCallback /
   queueMicrotask in an ag / NPC-world module (jag*, jmoodknow, jfeel, jworld*, jnpcd; view-only paints like jfigseal are out of scope) is a FAIL, except the load-time wrapper installs listed in ALLOW (they run once at page load, not in play).
   usage: node dev/test/ag-later-scan.js   (exit 0 = PASS) */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');
const files=fs.readdirSync(D).filter(f=>/^(jag|jmoodknow|jfeel|jworld|jnpcd)[\w]*\.js$/.test(f));
const ALLOW=[/W1: the weather hit on NPCs/, /outermost: installed after every module/, /function agLater\(/, /function agLaterRun\(/];
let bad=[],rows=[];
for(const f of files){const L=fs.readFileSync(path.join(D,f),'utf8').split('\n');
 L.forEach((l,i)=>{const n=(l.match(/\b(setTimeout|requestIdleCallback|queueMicrotask)\s*\(/g)||[]).length;if(!n)return;
  const ctx=(L[i-1]||'')+'\n'+l;const ok=ALLOW.some(r=>r.test(ctx));rows.push([f+':'+(i+1),n,ok?'allowed (load-time / helper)':'RAW']);if(!ok)bad.push(f+':'+(i+1))})}
const later=files.reduce((a,f)=>a+(fs.readFileSync(path.join(D,f),'utf8').match(/agLater\("/g)||[]).length,0);
for(const r of rows)console.log(r.join(' · '));console.log('agLater call sites: '+later);
console.log(bad.length?'FAIL ag-later-scan: raw deferred calls '+bad.join(', '):'PASS ag-later-scan ('+files.length+' files, '+later+' agLater sites)');process.exit(bad.length?1:0)
