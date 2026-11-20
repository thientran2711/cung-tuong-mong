/* opt-frame-scroll-diff.js — ev-pic-followups r2 (review FAIL 2): regression column, LIVE vs branch, same frame + device.
   usage: node dev/test/opt-frame-scroll-diff.js live.json branch.json   (outputs of opt-frame-scroll-scan.js, same SZ)
   FAIL row = #mb scrolls | last card clipped | owner scrolls and no hint. REGRESSION = LIVE row passes and branch row FAILs, or LIVE fits (owner none)
   and the branch scrolls (law 10: a frame that fits must keep fitting). Exit 1 when any regression. */
const fs=require('fs');const [,,A,B]=process.argv;const L=JSON.parse(fs.readFileSync(A)),R=JSON.parse(fs.readFileSync(B));
const k=o=>o.dev+' '+o.name,fail=o=>o.owner==='#mb'||!o.lastVis||(o.owner!=='none'&&!o.hint);const lm=new Map(L.map(o=>[k(o),o]));
const st=o=>o?(o.owner+'/'+(o.lastVis?'vis':'CLIP')+'/'+(o.picc||'-')+(fail(o)?'/FAIL':'')):'absent';let reg=[],fixed=0,both=0,only=[];
for(const o of R){const l=lm.get(k(o));if(!l){only.push(k(o));continue}const fb=fail(o),fl=fail(l);if(fl&&!fb)fixed++;if(fl&&fb)both++;
 if((!fl&&fb)||(l.owner==='none'&&l.lastVis&&o.owner!=='none'))reg.push([k(o),st(l),st(o)])}
console.log('rows live',L.length,'branch',R.length,'| FAIL live',L.filter(fail).length,'branch',R.filter(fail).length,'| fixed',fixed,'still',both,'| REGRESSIONS',reg.length);
for(const r of reg)console.log('REG',r[0].padEnd(36),'LIVE',r[1].padEnd(22),'BRANCH',r[2]);
for(const o of R.filter(fail)){const l=lm.get(k(o));console.log('FAIL',k(o).padEnd(36),'LIVE',st(l).padEnd(22),'BRANCH',st(o),'stay',o.stay)}
if(only.length)console.log('branch-only rows',only.join(', '));process.exit(reg.length?1:0)
