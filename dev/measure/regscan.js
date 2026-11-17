// regscan.js <regscan.html>: loads the instrumented game, prints every load-time Object.keys/values/entries over a NAMED global
// whose key set grew after the call (= a later module extended a registry the loop never saw). Exit 1 if any.
const {chromium}=require('playwright');
/* reviewed load-time reads that are NOT a missed registry pass (review/story-frame family table): key mod|how|name -> reason */
const OK={
 'j30.js|findIndex|RVGRP':'lookup by name; the 5th group is j78\'s own splice',
 'j78.js|for-of|RVGRP':'the group it adds right after the loop is its own (no later module adds groups)',
 'jrd_cnv.js|for-in|ARC67':'CNV_QFIX(road) sits after that road\'s last rdDef; later keys belong to other roads (checked)',
 'j83.js|keys|WILL':'IROUTE route lists are per route; jpoison adds its goods to maid/cho itself on purpose',
 'j85.js|find|ARTS':'check-then-push of its own two arts',
 'j85.js|forEach|ARTS':'"find" is a property, not an art',
 'jbal2.js|for-in|KG':'kgOf / tab sync are runtime lookups (called during load, read live each call)',
 'jhc.js|for-in|KG':'clears KG and rebuilds it (not a pass)',
 'j94.js|for-in|SCIMG':'sync() runs again whenever SCIMG changes (live)',
 'jwdinv.js|find|KINV_CATS':'lookup','jwdinv.js|some|KINV_CATS':'check-then-add','jecon.js|some|KINV_CATS':'check-then-add','jmark.js|some|KINV_CATS':'check-then-add',
 'jecon.js|for-in|ACT':'jtsb schemes (thathu/phonghoa/thaopet) keep their own Bạc gates (jtsb:213-215 print them); repricing them would contradict that text - one-core note to the coordinator',
 'jts.js|keys|IT':'luxThemeTags re-runs when IT grows (jts tsTagsFresh)',
 'j84.js|for-in|IT':'itRx() rebuilds every 4 s (runtime cache)',
 'jwkr.js|for-in|WKR':'later kinds (jtds) arrive already normalised (jtds:37, other raw shape)',
 'jwkpics.js|findIndex|KIT_EVFIT':'lookup for an insert position','jorigins.js|findIndex|ORIGINS':'lookup for an insert position'};const fs=require('fs'),path=require('path');
(async()=>{const f=path.resolve(process.argv[2]);const names=fs.readFileSync(path.join(path.dirname(f),'regscan-names.txt'),'utf8').split('\n').filter(Boolean);
 const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('file://'+f);await p.waitForFunction(()=>window.__ctmBuilt,null,{timeout:60000});
 const r=await p.evaluate(names=>{const nm=new Map();for(const n of names){try{const v=(0,eval)(n);if(v&&typeof v==="object"&&!nm.has(v))nm.set(v,n)}catch(e){}}
  let RE=[];try{RE=(0,eval)("REG_EACH")}catch(e){}const reg=new Set(RE.map(R=>R.obj));/* regEach's own reads (jreg run) are swept at the end: covered */
  const seen=new Set(),out=[];for(const x of window.__RS){const n=nm.get(x.o);if(!n)continue;if(reg.has(x.o)&&/^at (Object\.)?run /.test(x.st))continue;const now=Object.keys(x.o);const had=new Set(x.keys);const add=now.filter(k=>!had.has(k));
   const key=x.mod+"|"+n+"|"+x.st;if(seen.has(key))continue;seen.add(key);out.push({mod:x.mod,name:n,how:x.how,had:x.keys.length,added:add.length,ex:add.slice(0,6),st:x.st})}return out},names);
 const bad=r.filter(x=>x.added&&!OK[x.mod+'|'+x.how+'|'+x.name]);const okd=r.filter(x=>x.added&&OK[x.mod+'|'+x.how+'|'+x.name]);console.log('load-time iterations over named globals:',r.length,' missed later keys:',bad.length);
 for(const x of bad)console.log(`MISS ${x.mod} ${x.how}(${x.name}) saw ${x.had}, +${x.added} later: ${x.ex.join(',')}  @${x.st}`);
 if(process.env.ALL)for(const x of okd)console.log(`seen ${x.mod} ${x.how}(${x.name}) +${x.added} later: ${OK[x.mod+'|'+x.how+'|'+x.name]}`);
 if(process.env.ALL)for(const x of r.filter(x=>!x.added))console.log(`ok   ${x.mod} ${x.how}(${x.name}) ${x.had}`);
 if(errs.length)console.log('pageerrors:',errs.slice(0,3));await b.close();process.exit(bad.length?1:0)})();
