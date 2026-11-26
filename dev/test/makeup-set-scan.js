/* review/makeup-set — LUẬT SỬA CẢ NHÓM scan (owner OD 25/11 ~23:20Z / ~23:24Z). Static, no browser.
   A. every picker row filter tied to the inventory: does it DROP a set/group row or item (bad) or grey it (good)?
   B. every mini-game / board wait: does a timeout PLAY the round for her (bad) or keep waiting / give her the choice (good)?
   usage: node dev/test/makeup-set-scan.js [worktree]   prints a table; exit 1 when a bad row remains */
const fs=require('fs'),path=require('path');const R=path.resolve(process.argv[2]||'.');const B=path.join(R,'dev/build');
const files=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f));let bad=0;const rows=[];
const src=f=>fs.readFileSync(path.join(B,f),'utf8');
/* A. pickers: functions wrapping kitSwatches / preset rows / dress & jewel grids */
const A=[
 ['jration.js','lxColRows (makeup sets by cosmetics box)',s=>/\/\^pre-\/\.test\(r\.k\)\)\{let n=0;const it=r\.items\.map/.test(s)&&!/it\.length\?Object\.assign\(\{\},r,\{items:it\}\):null\}\s*\n?\s*const L=own/.test(s.split('function lxColRows')[1].split('function lxColPick')[0].split('const L=own')[0])],
 ['jallot.js','lxColRows wrap (Kiểu cầu kỳ by hair oil)',s=>/R\.map\(r=>\{if\(!\(r&&\/\^pre-\//.test(s)&&!/return R\.filter\(r=>!\(r&&\/\^pre-\//.test(s)],
 ['jtoil.js','toilDressUI (dress / jewels: fixed tabs Trâm cài · Y phục · Trang sức, owned pieces)',s=>/const tabs=\[\{k:"tram",label:"Trâm cài"\},\{k:"y",label:"Y phục"\},\{k:"trang",label:"Trang sức"\}\]/.test(s)],
 ['jtoil.js','kitSwatches (kit: set block + off item, never hides)',s=>/kswt-rset/.test(s)&&/classList\.contains\("off"\)/.test(s)]];
for(const [f,what,good] of A){const ok=good(src(f));if(!ok)bad++;rows.push(['A',f,what,ok?'OK (sets/groups kept; missing = greyed + why)':'BAD (drops rows)'])}
/* B. waits that end by playing for her: any toilNpcPlay / auto-finish inside a wait-for-assets branch of a player board */
for(const f of files){const s=src(f);const re=/meshWait\)\{const h0=/g;let m;while((m=re.exec(s))){bad++;rows.push(['B',f,'board timeout plays her sitting','BAD'])}
 if(/BAL\.toil\.meshWait/.test(s))rows.push(['B',f,'waits on BAL.toil.meshWait',/meshWait\)\{const h0=/.test(s)?'BAD (auto-play)':'OK (keeps waiting / her choice / real anchor)'])}
console.log('| part | file | what | verdict |\n|---|---|---|---|');for(const r of rows)console.log('| '+r.join(' | ')+' |');
console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0);
