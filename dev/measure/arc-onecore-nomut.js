/* arc-onecore-nomut (review/one-core-arcs r2 reviewer): BAL.arc after the game has loaded must equal dev/build/jbalarc.js as written (arcOpt / the story halving may not mutate the rulebook). usage: node dev/measure/arc-onecore-nomut.js (repo root, after assemble.py) */
const fs=require('fs'),path=require('path');
(async()=>{const BAL={};Function('BAL',fs.readFileSync('dev/build/jbalarc.js','utf8'))(BAL);
const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve('dev/index.html'),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000});
// also run a story halving pass if exposed: touch every ARC67 option o.c by reading
const live=JSON.parse(await p.evaluate(()=>JSON.stringify(BAL.arc)));await b.close();
const src=JSON.parse(JSON.stringify(BAL.arc));const bad=[];
const walk=(a,c,k)=>{if(JSON.stringify(a)===JSON.stringify(c))return;if(a&&c&&typeof a==='object'&&typeof c==='object'){for(const x of new Set([...Object.keys(a),...Object.keys(c)]))walk(a[x],c[x],k+'.'+x)}else bad.push(k+': src '+JSON.stringify(a)+' live '+JSON.stringify(c))};
walk(src,live,'BAL.arc');console.log('keys',Object.keys(src).join(','),'| diffs',bad.length,bad.slice(0,10).join('\n'),'| pageerr',errs.length)})();
