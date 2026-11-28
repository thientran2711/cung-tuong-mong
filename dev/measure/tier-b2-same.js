/* tier-b2-same (review/f-tier-b2, WORKLIST row 42 batch 2): robot proof that the BAL-only tier retune changed ONLY the batch-2 beats,
   and each of them exactly as planned. Compares two runtime registry dumps (dev/handover/reports/tier-audit/regdump.js: every ARC67 option
   list with its BAL-filled c / w / l / odds base) — BEFORE (LIVE base) and AFTER (this branch, built) — against the plan list written by
   dev/tools/tier-b2-retune.js --list. Checks: (1) same sets, same option count and names everywhere; (2) every set NOT in the plan is
   identical (c, w, l, odds, flag, exit mark); (3) every planned option reads exactly its played target (c / w / l) and keeps its odds,
   flag and exit mark; (4) the cancel options of a planned set are unchanged.
   usage: node dev/measure/tier-b2-same.js <before reg.json> <after reg.json> <plan list.json>   (exit 1 on any difference) */
const fs=require('fs');const [B0,B1,PL]=process.argv.slice(2);
const rd=f=>JSON.parse(fs.readFileSync(f,'utf8')).out.filter(x=>!x.err);
const A=rd(B0),B=rd(B1),plan=JSON.parse(fs.readFileSync(PL,'utf8'));
const key=s=>s.src+'|'+s.id+'|'+s.path,bm=new Map(B.map(s=>[key(s),s]));
const fmt=o=>Object.entries(o).filter(([k,v])=>v).map(([k,v])=>k+(v>0?'+':'')+v).join(',');
const want=new Map();for(const q of plan)for(const r of q.rows){const [id,p]=r.split(' ');want.set('ARC67|'+id+'|'+p,q)}
const bad=[];let same=0,planned=0,opts=0;const fam={};
for(const s of A){const k=key(s),t=bm.get(k);if(!t){bad.push('set gone '+k);continue}
 if(t.o.length!==s.o.length||t.o.some((o,i)=>o.n!==s.o[i].n)){bad.push('options differ '+k);continue}
 const q=want.get(k);
 if(!q){if(JSON.stringify(s.o)!==JSON.stringify(t.o))bad.push('changed but not planned '+k);else same++;continue}
 planned++;const f=(s.id.match(/^[a-z]+\d*/)||[''])[0];fam[f]=(fam[f]||0)+1;
 s.o.forEach((o,i)=>{const n=t.o[i],p=q.P.find(p=>p.i===i);
  for(const x of ['od','f','ex','wx','lx'])if(o[x]!==n[x])bad.push(`${k}[${i}].${x} ${o[x]} → ${n[x]}`);
  if(!p){if(o.c!==n.c||o.w!==n.w||o.l!==n.l)bad.push(`${k}[${i}] cancel option changed`);return}
  opts++;for(const x of ['c','w','l'])if(fmt(p[x])!==n[x])bad.push(`${k}[${i}].${x} want ${fmt(p[x])} got ${n[x]}`)})}
if(B.length!==A.length)bad.push(`set count ${A.length} → ${B.length}`);
console.log('| | sets |');console.log('|---|---|');console.log(`| unchanged (not in batch 2) | ${same} |`);console.log(`| batch-2 sets retuned (as planned) | ${planned} |`);
console.log(`| batch-2 options checked | ${opts} |`);console.log('by road / arc family:',JSON.stringify(fam));
console.log(bad.length?'DIFFERENT:\n  '+bad.slice(0,40).join('\n  ')+(bad.length>40?`\n  … ${bad.length} in all`:''):'SAME: every set outside batch 2 identical; every batch-2 option reads exactly its planned tier numbers (odds, flags, exits untouched)');
process.exit(bad.length?1:0);
