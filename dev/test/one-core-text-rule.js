/* one-core-text-rule gate (review/one-core-jkc r1, ONE CORE OD:L1267 + LUẬT SỬA CẢ NHÓM): the whole-game text↔rule family of the tiểu thư fault
   (help «tới 85 cha định hôn» while the rule reads 90) may not come back. Runs dev/measure/one-core-text-rule.js on the build and FAILS when
   (a) any DIFF: a player text types a threshold next to a stat word that no rule of that stat uses (the text lies), or
   (b) a TYPED hit (a typed copy of a rule cut; print the BAL key instead) in a module beyond the frozen list below (may only shrink).
   FROZEN = the «thiếu bạc (cần N)» lock family left for the successor (dev/handover/reports/one-core-jkc.md §6.1); SAMPLE (kit pages) is ignored.
   usage: node dev/test/one-core-text-rule.js   (env OC_BUILD = build dir, default dev/build)        exit 0 = PASS, 1 = FAIL */
const path=require('path'),{execFileSync}=require('child_process');
const B=process.env.OC_BUILD||path.join(__dirname,'..','build');
const FROZEN={'j15.js':1,'j24.js':1,'j25.js':3,'j42.js':1,'j54.js':3,'j55.js':3,'jinv.js':1,'jht.js':1};
const out=JSON.parse(execFileSync('node',[path.join(__dirname,'..','measure','one-core-text-rule.js'),B,'--json'],{encoding:'utf8',maxBuffer:64<<20}));
const row=o=>`${o.kind} ${o.f}:${o.line} ${o.word}=${o.n} [${o.props}: ${o.cuts}] «${o.text}»`;
const diff=out.filter(o=>o.kind==='DIFF'),typed=out.filter(o=>o.kind==='TYPED'),per={};typed.forEach(o=>per[o.f]=(per[o.f]||0)+1);
const over=Object.keys(per).filter(f=>per[f]>(FROZEN[f]||0));
console.log(JSON.stringify({DIFF:diff.length,TYPED:typed.length,frozen:Object.values(FROZEN).reduce((a,b)=>a+b,0),per}));
if(diff.length||over.length){
 if(diff.length)console.log('FAIL: a player text types a threshold that no rule of that stat uses (fix the TEXT to print the BAL key the rule reads):\n  '+diff.map(row).join('\n  '));
 if(over.length)console.log('FAIL: a player text types a copy of a rule cut (print the BAL key instead):\n  '+typed.filter(o=>over.includes(o.f)).map(row).join('\n  '));
 process.exit(1)}
console.log('PASS: every help / gloss / tip / card threshold matches a rule cut and prints its key (frozen «thiếu bạc (cần N)» family only)');
