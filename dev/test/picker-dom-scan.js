/* picker-dom family scan (law 11, MAIN 164 play-stopper 26/11): every dialog whose OPTION LIST is built from her chest (S.inv entries,
   tsGiftPieces …) = an item picker. Each must be on the ONE KIT 28.13i grid (options carry `ik`, jgpick) and that grid must be PAGED
   (whole rows: columns × BAL.kip.rows) and draw only that page's cards through the real draw (j3 m.kipOnly + jgpick kipRedraw) — so no picker draws hundreds
   of tiles / hidden cards at once, at any chest size.
   usage: node dev/test/picker-dom-scan.js [ref]   (ref = git ref for the "before" column, e.g. origin/main; default the working tree)
   Prints a markdown table; exit 1 (working tree only) when a chest picker is not on the grid, or the grid is not paged. */
const fs=require('fs'),cp=require('child_process'),path=require('path');const ref=process.argv[2];const dir=path.join(__dirname,'../build');
const files=ref?cp.execSync(`git ls-tree --name-only ${ref} dev/build/`).toString().split('\n').filter(f=>/\/j\w*\.js$/.test(f)).map(f=>[path.basename(f),cp.execSync(`git show ${ref}:${f}`,{maxBuffer:1<<26}).toString()])
 :fs.readdirSync(dir).filter(f=>/^j\w*\.js$/.test(f)).map(f=>[f,fs.readFileSync(path.join(dir,f),'utf8')]);
const F=Object.fromEntries(files);const g=F['jgpick.js']||'',b3=F['j3.js']||'',bal=F['jbal2.js']||'';
const paged=/BAL\.kip\.rows/.test(g)&&/data-kippg/.test(g)&&/kip:\{rows:\d+/.test(bal);const lazy=/m\.kipOnly instanceof Set/.test(b3)&&/function kipRedraw/.test(g)&&!/insertAdjacentHTML\("beforeend",optBtnHTML/.test(g);/* the page's cards come from the ONE real draw (showModal), never hand-built */
const rows=[];let bad=0;
for(const [f,src] of files){const re=/PEND\.(\w+)\s*=/g;let m;
 while((m=re.exec(src))){const rest=src.slice(m.index+5);const e=rest.search(/\nPEND\.\w+\s*=|\n\/\* =|\nfunction /);const b=rest.slice(0,e>0?e:3000);
  if(!(/\bik\s*:/.test(b)||/(S|a)\.inv\b[^;]*\.(map|filter)\(|tsGiftPieces\(/.test(b)&&/\bo\s*:|opts\s*:/.test(b)))continue;/* an ik option = a chest piece (KIT 28.13i trigger) */
  const ik=/\bik\s*:/.test(b);const fixed=!ik&&/o:\[tsOpt\(/.test(b);/* a fixed choice of roads (tsgift), not a list of pieces */
  const ok=fixed||ik&&paged&&lazy;if(!ok)bad++;
  rows.push(`| ${m[1]} | ${f} | ${fixed?'fixed roads (no list)':ik?'KIT 28.13i grid':'TEXT LIST'} | ${fixed?'-':ik&&paged?`yes (whole rows, BAL.kip.rows)`:'NO: every entry'} | ${fixed?'-':ik&&lazy?'its page only, real draw':'one per entry'} | ${ok?'ok':'FAIL'} |`)}}
console.log(`| picker | file | shows as | paged | hidden act cards | verdict |\n|---|---|---|---|---|---|\n${rows.join('\n')}`);
console.log(`grid paged: ${paged} · cards on demand: ${lazy} · ${bad?`FAIL ${bad}`:'PASS'}`);process.exit(bad&&!ref?1:0);
