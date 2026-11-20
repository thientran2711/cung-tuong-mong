/* NPC-PURPOSE scan (owner OD 18/11 ~04:08Z: every NPC deed has a goal, no luck; LUẬT SỬA CẢ NHÓM).
   Rows = dev/test/npc-purpose-rows.json: one row per dice line of the report table (dev/handover/reports/npc-purpose.md, handover branch),
   fp = the code fingerprint at the scan base. For each row:
   - fp still in its file → the row is OPEN (DICE-ONLY / PARTIAL still to convert; LIVE-OFF = dead while the agent layer is on);
   - fp gone → the row must carry "done": the text of its new line, which must still be in the file and call npcWhy / npcWhyAll / npcWit /
     npcTell / npwPick (jagwhy), or "out": a reason (the line was not an NPC choice). Anything else = FAIL (a row changed without a goal).
   Also: jagwhy.js may use Math.random only inside npwPick (weighting between goal-valid options).
   usage: node dev/test/npc-purpose-scan.js [--strict] [--group G1]   --strict: FAIL on any OPEN DICE-ONLY / PARTIAL row (the end state of PHASE 2)
   exit 0 = PASS */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');
const A=process.argv.slice(2);const strict=A.includes('--strict');const gi=A.indexOf('--group');const only=gi>=0?A[gi+1]:null;
const J=JSON.parse(fs.readFileSync(path.join(__dirname,'npc-purpose-rows.json'),'utf8'));const src={};const rd=f=>src[f]||(src[f]=fs.existsSync(path.join(D,f))?fs.readFileSync(path.join(D,f),'utf8'):'');
const GOAL=/\b(npcWhy|npcWhyAll|npcWit|npcTell|npwPick)\s*\(/;const bad=[],open=[],cnt={};
for(const r of J.rows){if(only&&r.group!==only)continue;const t=rd(r.f);const c=cnt[r.group]||(cnt[r.group]={open:0,off:0,done:0,out:0});
 if(r.fp&&t.includes(r.fp)){if(r.status==='LIVE-OFF')c.off++;else{c.open++;open.push(r)}continue}
 if(r.out){c.out++;continue}
 if(r.done){if(!t.includes(r.done))bad.push(r.f+':'+r.line0+' done-text not found');else if(!GOAL.test(r.done))bad.push(r.f+':'+r.line0+' done-text has no npcWhy/npcWit/npcTell/npwPick');else c.done++;continue}
 bad.push(r.f+':'+r.line0+' ('+r.event+') changed without a goal source (no done/out)')}
const W=rd('jagwhy.js');if(!W)bad.push('jagwhy.js missing');else W.split('\n').forEach((l,i)=>{/* the one allowed draw: npwPick's weighted choice among goal-valid options */
 if(/\bMath\.random\(|\broll\(|\bpick\(/.test(l)&&!/^ const w=top\.map/.test(l))bad.push('jagwhy.js:'+(i+1)+' dice outside npwPick')});
for(const g of Object.keys(cnt).sort())console.log(g+': open '+cnt[g].open+' · live-off '+cnt[g].off+' · done '+cnt[g].done+' · out '+cnt[g].out);
if(strict)for(const r of open)bad.push(r.f+':'+r.line0+' OPEN '+r.status+' ('+r.event+')');
if(bad.length){for(const b of bad.slice(0,80))console.log('FAIL '+b);console.log('FAIL npc-purpose-scan: '+bad.length+' problem(s)'+(bad.length>80?' (first 80 shown)':''));process.exit(1)}
console.log('PASS npc-purpose-scan ('+J.rows.length+' rows'+(strict?', strict':'')+')');
