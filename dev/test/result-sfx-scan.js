/* result-sfx scan (LUẬT SỬA CẢ NHÓM): every place the player SEES a result must make exactly one result sound.
   Static part: every kg82ShowRes( call site in dev/build/j*.js must pass the 2nd arg `ok`; every resultShow wrapper is covered centrally (jsfx kitResultSfx).
   Prints the before/after table (before = the same scan on a git ref, default origin/main^ — i.e. any ref without the change; pass REF=<sha>).
   usage: node dev/test/result-sfx-scan.js [REF]   (REF default 41899d048 = branch start; dev/build files are read with `git show REF:path`) */
const fs=require('fs'),cp=require('child_process'),path=require('path');
const root=path.join(__dirname,'..','..');const REF=process.argv[2]||'41899d048';
const files=fs.readdirSync(path.join(root,'dev/build')).filter(f=>/^j.*\.js$/.test(f));
function calls(src){src=src.replace(/\/\*[\s\S]*?\*\//g,m=>m.replace(/[^\n]/g,' '));const out=[];const re=/kg82ShowRes\(/g;let m;while((m=re.exec(src))){const i=m.index;
  const pre=src.slice(Math.max(0,i-9),i);if(/function\s+$/.test(pre)||/\.\s*$/.test(pre)&&false)continue;
  let d=1,j=i+m[0].length,top=0,args=[],cur=j;/* split top-level args (aware of strings/templates) */
  let q=null,tpl=[];for(;j<src.length&&d>0;j++){const c=src[j];
   if(q){if(c==="\\"){j++;continue}if(q==="`"&&c==="$"&&src[j+1]==="{"){tpl.push(d);d++;j++;q=null;continue}if(c===q)q=null;continue}
   if(c==='"'||c==="'"||c==="`"){q=c;continue}
   if(c==="}"&&tpl.length&&d===tpl[tpl.length-1]+1){d--;tpl.pop();q="`";continue}
   if("([{".includes(c))d++;else if(")]}".includes(c)){d--;if(d===0)break}else if(c===","&&d===1){args.push(src.slice(cur,j));cur=j+1}}
  args.push(src.slice(cur,j));const line=src.slice(0,i).split('\n').length;
  /* skip the definition and the j90 wrapper (kg82ShowRes=function / function kg82ShowRes) */
  if(/function\s+kg82ShowRes\s*\($/.test(src.slice(Math.max(0,i-12),i+m[0].length)))continue;
  out.push({line,n:args.length,ok:args.length>1?args[args.length-1].trim().replace(/\s+/g,' ').slice(0,60):''})}return out}
function scan(get){const rows=[];for(const f of files){let s;try{s=get(f)}catch(e){continue}if(!s)continue;for(const c of calls(s))rows.push(Object.assign({file:f},c))}return rows}
const before=scan(f=>cp.execSync(`git -C ${root} show ${REF}:dev/build/${f}`,{stdio:['ignore','pipe','ignore'],maxBuffer:1<<26}).toString());
const after=scan(f=>fs.readFileSync(path.join(root,'dev/build',f),'utf8'));
const key=r=>r.file+':'+r.line;let bad=0;
console.log('| call site | before (ok arg) | after (ok arg) | meaning |\n|---|---|---|---|');
const mean={'j82.js':'contest: top 3 = win','jexam.js':'exam round raw>=5 / final null (exDone)','j92.js':'grooming zone ok','jtoil.js':'toilette good/bad (null = mirror)','jts.js':'tsGame raw>=5 or luck'};
for(const r of after){const b=before.find(x=>x.file===r.file&&Math.abs(x.line-r.line)<40);const has=r.n>1;if(!has)bad++;
 console.log(`| ${r.file}:${r.line} | ${b?(b.n>1?b.ok:'none'):'new'} | ${has?r.ok:'MISSING'} | ${r.file==='j82.js'?(r.ok.startsWith('place')?'contest: top 3 = win (podium owns the sound when it shows)':'lesson / work: raw>=5 = win'):mean[r.file]||''} |`)}
console.log(`\ncall sites: ${after.length}, with ok arg: ${after.length-bad}, missing: ${bad} (before: ${before.length} sites, ${before.filter(x=>x.n>1).length} with ok)`);
/* resultShow wrappers: all are re-entered through the one central wrapper (jsfx) */
const js=fs.readFileSync(path.join(root,'dev/build/jsfx.js'),'utf8');
const central=/const RS=o=>[\s\S]{0,400}kitResultSfx[\s\S]{0,250}W\("resultShow",RS\)[\s\S]{0,400}W\("__aaR0",RS\)/.test(js)&&/W\("kg82ShowRes"/.test(js);
const rsB=files.filter(f=>/(^|[^\w.])resultShow\s*=\s*function|W\("resultShow"/.test(fs.readFileSync(path.join(root,'dev/build',f),'utf8')));
console.log(`resultShow definitions/wrappers: ${rsB.join(' ')} -> central sound wrapper in jsfx.js: ${central?'yes':'NO'}`);
process.exit(bad||!central?1:0);
