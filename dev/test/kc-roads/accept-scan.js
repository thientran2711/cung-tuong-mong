/* review/kc-coop-select (law 1 + law 11, whole family): every step a new life gets in solo hangs on nlAccept (after "Nhận thân phận") or on
   nlRun (the seeded build behind the identity card). A co-op THIN guest (jcoopthinb, room level >= 2) has her life built and accepted on
   the HOST, so each of those hooks must run there too, or her seat skips a step the other seat gets (the kc2Sel selection after
   "Vào cung ngay", the Tiền truyện / origin intros, the kiếp baseline, rank tracking, the weighted origin, her Độ khó, her pid, her dead
   life's pieces). This scan lists every hook in the assembled order and says whether the thin host path runs it.
   usage: node dev/test/kc-roads/accept-scan.js [git-ref]   (no ref = the working tree; e.g. origin/main for the "before" column)
   exit 1 if any hook is skipped. */
const fs=require('fs'),path=require('path'),{execSync}=require('child_process');
const ROOT=path.resolve(__dirname,'../../..'),ref=process.argv[2]||null;
const rd=f=>ref?execSync(`git -C ${ROOT} show ${ref}:dev/build/${f}`,{encoding:'utf8',maxBuffer:64<<20}):fs.readFileSync(path.join(ROOT,'dev/build',f),'utf8');
const asm=rd('assemble.py');const files=[...asm.matchAll(/'(j[a-z0-9_]+\.js)'/g)].map(m=>m[1]).filter((f,i,a)=>a.indexOf(f)===i);
const thin=rd('jcoopthinb.js');
/* the thin host path: accept() runs the chain when it calls nlAcc0; core() runs the chain when it calls nlRun */
const acc=(thin.match(/function accept\(a\)\{[\s\S]*?\n function |function accept\(a\)\{[\s\S]*?return r\}/)||[''])[0];
const cor=(thin.match(/function core\(K\)\{[\s\S]*?K\.done=1\}/)||[''])[0];
const accChain=/nlAcc0\(/.test(acc),runChain=/\bnlRun\(/.test(cor);
/* what the old hand-copied accept() covered (by name): the j52 core steps + jkc's kcInit */
const accCopied=f=>(f==='j52.js'&&/pdBase\(\)/.test(acc))||(f==='jkc.js'&&/kcInit\(\)/.test(acc));
const rows=[];
for(const f of files.concat(['jcoopthinb.js'])){let s;try{s=rd(f)}catch(e){continue}
 for(const [fn,re] of [['nlAccept',/nlAccept=function/g],['nlRun',/nlRun=function/g]]){
  if(fn==='nlAccept'&&f==='j52.js'&&/function nlAccept\(/.test(s))rows.push([f,fn,'base']);
  if(fn==='nlRun'&&f==='j52.js'&&/function nlRun\(/.test(s))rows.push([f,fn,'base']);
  for(const m of s.matchAll(re)){if(f==='jcoopthinb.js')continue;const line=s.slice(0,m.index).split('\n').length;rows.push([f+':'+line,fn,'hook'])}}}
let bad=0;const out=[];
for(const [w,fn,k] of rows){const f=w.split(':')[0];
 /* jcoopworld's own hooks return at once in the host context (CW.ctx): they are the co-op send, not a life step */
 const coop=f==='jcoopworld.js',jr=f==='jrbatch.js';
 const runs=fn==='nlAccept'?(accChain||accCopied(f)):(runChain||(k==='base'&&/_start52\(\)/.test(cor)));
 const st=coop?'n/a (co-op send)':jr?(runs?'runs (render batch, a no-op in her context)':'n/a (render batch)'):runs?'runs':'SKIPPED';
 if(st==='SKIPPED')bad++;out.push(`${w.padEnd(20)} ${fn.padEnd(9)} ${st}`)}
console.log(`thin host path (${ref||'working tree'}): accept() ${accChain?'runs the nlAccept chain':'hand-copied steps'}; core() ${runChain?'runs the nlRun chain':'_start52 only'}`);
console.log(out.join('\n'));console.log(`\n${rows.length} hooks, ${bad} skipped on the thin guest`);process.exit(bad?1:0);
