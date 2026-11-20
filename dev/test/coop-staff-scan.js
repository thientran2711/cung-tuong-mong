/* coop-staff-split (law 11, fix the whole group): every place where a co-op player can sit in a WORLD list on one seat only.
   A player is S on her own seat and a coop entry (coop:true) on the other: as a consort (rivals) or as a cung nữ (her mistress's staff).
   (1) game code: every site that PUTS a coop entry into a world list must be matched by a take-out before the world is serialised
       (pullFriend in toCanon; npcMine / C.apply filter on the thin guest) -> listed with its counterpart.
   (2) tests: every cross-seat comparison of world people (names / staff of rivals) must treat the coop entry as the other seat's S
       (filter x.coop, or add S to her mistress's list) -> a comparison that counts raw staff names is a FALSE split.
   usage: node dev/test/coop-staff-scan.js [ref]   (ref: a git ref to scan instead of the working tree, e.g. origin/main) */
const {execSync}=require('child_process');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const ref=process.argv[2]||null;
const files=dir=>ref?execSync(`git -C ${ROOT} ls-tree --name-only ${ref} ${dir}/`).toString().trim().split('\n'):fs.readdirSync(path.join(ROOT,dir)).map(f=>dir+'/'+f);
const read=f=>ref?execSync(`git -C ${ROOT} show ${ref}:${f}`,{maxBuffer:64e6}).toString():fs.readFileSync(path.join(ROOT,f),'utf8');
const rows=[];
/* (1) game code */
for(const f of files('dev/build').filter(f=>/\/j[^/]*\.js$/.test(f))){const L=read(f).split('\n');L.forEach((l,i)=>{
  if(/buildFriendSrv\(/.test(l)&&/staff\.push/.test(l))rows.push(['code',f+':'+(i+1),'puts her coop entry into her mistress staff','taken out by pullFriend (toCanon / world loops) / npcMine filter',/pullFriend|staff\.filter\(s=>!s\.coop\)/.test(read(f))?'PAIRED':'UNPAIRED']);
  if(/rivals\.(push|unshift)\(v\)/.test(l)&&/buildFriend|placeFriend/.test(L.slice(Math.max(0,i-3),i+1).join('\n')))rows.push(['code',f+':'+(i+1),'puts her coop entry into rivals','taken out by pullFriend / R.filter(!coop)',/pullFriend/.test(read(f))?'PAIRED':'UNPAIRED']);
  if(/staff\.filter\(s=>plain\(s\)&&s\.coop\)/.test(l))rows.push(['code',f+':'+(i+1),'guest keeps the host\'s coop entry across a host delta','host delta drops it (npcMine staff.filter(!coop))','PAIRED']);})}
/* (1b) household counts: the ONE count hhHas (j10) must leave her coop entry out (fill / trim / room / promotion gifts / hire all read it) */
{const f='dev/build/j10.js';const L=read(f).split('\n');const i=L.findIndex(l=>/^function hhHas\(/.test(l));if(i>=0){const l=L[i];rows.push(['code',f+':'+(i+1),'household count hhHas (cap table)','her coop entry is no allotted servant',/!s\.coop/.test(l)?'EXCLUDES coop':'UNPAIRED (counts her: host-only trim / churn)'])}
 for(const g of files('dev/build').filter(f=>/\/j[^/]*\.js$/.test(f)&&!/\/jcoop/.test(f))){read(g).split('\n').forEach((l,j)=>{if(/hhHas\(/.test(l)&&!/function hhHas/.test(l))rows.push(['code',g+':'+(j+1),'reads hhHas','one count (j10)','PAIRED'])})}}
/* (2) tests: cross-seat comparisons of world staff names */
for(const f of files('dev/test').filter(f=>/\.js$/.test(f)&&!/coop-staff-scan/.test(f))){const s=read(f);const L=s.split('\n');L.forEach((l,i)=>{
  const re=/\(v\.staff\|\|\[\]\)(\.filter\([^)]*\))?\.map\(x=>x\.name\)/g;let m;while((m=re.exec(l))){const cross=/A\.p\.evaluate|B\.p\.evaluate|a\.N===c\.N|same\(/.test(l)||/a\.N===c\.N/.test(s);
    if(!cross)continue;const norm=/!x\.coop/.test(m[0])||/x\.coop/.test(l.slice(m.index,m.index+400));rows.push(['test',f+':'+(i+1),'cross-seat staff-name list','coop entry = the other seat\'s S',norm?'NORMALISED':'RAW (false split)'])}})}
console.log('| kind | site | what | counterpart | state |\n|---|---|---|---|---|');for(const r of rows)console.log('| '+r.join(' | ')+' |');
const bad=rows.filter(r=>/UNPAIRED|RAW/.test(r[4]));console.log(`\n${rows.length} sites, ${bad.length} open`);process.exit(bad.length?1:0);
