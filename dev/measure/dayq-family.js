/* FLIGHT-DAYQ family scan (LUẬT SỬA CẢ NHÓM): every popup source that can fire around a buổi / day turn, grouped by the channel it goes
   through, with the two gates of owner bug (5): (A) "the day never turns while it is pending" and (B) "never painted over the title card /
   Tuần lục book; after the book «Tin trong cung» first". Counts call sites in dev/build/j*.js (all.js excluded); gate columns are read from
   the code (BEFORE = origin/main as given by --before <dir>, AFTER = this tree).
   usage: node dev/measure/dayq-family.js [--before <dev/build dir of LIVE>]   → markdown table on stdout */
const fs=require('fs'),path=require('path');
const AFTER=path.join(__dirname,'..','build');const bi=process.argv.indexOf('--before');const BEFORE=bi>0?process.argv[bi+1]:null;
function src(dir){const o={};for(const f of fs.readdirSync(dir))if(/^j.*\.js$/.test(f)&&f!=='all.js')o[f]=fs.readFileSync(path.join(dir,f),'utf8');return o}
function count(S,re){let n=0;const files=new Set();for(const [f,t] of Object.entries(S)){const m=t.match(re);if(m){n+=m.length;files.add(f)}}return{n,files:[...files].sort()}}
/* channels: [name, call-site regex, gate A probe, gate B probe] — a probe returns true when the gate is in the code */
const has=(S,f,re)=>!!(S[f]&&re.test(S[f]));
const CH=[
 ['Q card (event / news / result / edict / stipend card, kitModal, kitPanel)',/\bQ\.(push|unshift|splice)\(|\bkitModal\(|\bkitPanel\(/g,
  S=>has(S,'j9.js',/function nextBuoi\(\)\{if\(!S\|\|S\.dead\|\|Q\.length/),
  S=>has(S,'jdayq.js',/showModal=function\(\)\{if\(dqUi\(\)&&Q\.length&&dqDawn\(\)/)],
 ['kit motion scene via kmPush (kitGain «Nhận», kitReward chest/tray/gift, edict, gloom, bloom, ink, tablet flip, night card, card-flip …)',/\bkmPush\(/g,
  S=>has(S,'jdayq.js',/KMQ\.length\)return true/)&&has(S,'jdayq.js',/kmBusy/),
  S=>has(S,'j93.js',/function kmFree\(\)\{const d=document\.getElementById\("dawn"\)/)],
 ['mini-game screen + its result (#ov, openMG / kg82)',/\bopenMG\(|\bkg82Play\(|\bplayArt\(/g,
  S=>has(S,'jdayq.js',/getElementById\("ov"\)/),
  S=>true /* a mini-game is opened by her, never at a turn */],
 ['podium (kitPodium, j90) / roulette',/\bkitPodium\(|\bkitRoulette\(/g,
  S=>has(S,'jdayq.js',/kpodov/),
  S=>has(S,'j93.js',/kpodov/)],
 ['«Tin trong cung» first after the book',/Tin trong cung buổi này/g,
  S=>true,
  S=>has(S,'jdayq.js',/function dqNewsFirst/)],
 ['new-day motion scenes wait for «Tin trong cung» (stipend chest, rewards)',/\bkitReward\(/g,
  S=>true,
  S=>has(S,'jdayq.js',/DQ\.newsHold/)],
 ['optional j68 event at the first buổi of a day',/atDayStart/g,
  S=>true,
  S=>has(S,'j68.js',/BAL\.spread\.dawnOpt/)],
 ['unslotted world card at the first buổi of a day (D13 jspread)',/\bsp13Slot\(/g,
  S=>true,
  S=>has(S,'jspread.js',/BAL\.spread\.dawnSlot/)]];
const A=src(AFTER),B=BEFORE?src(BEFORE):null;
const yn=v=>v?'yes':'**NO**';
let out='| channel | call sites (files) | A: day waits — before | after | B: not over card/book — before | after |\n|---|---|---|---|---|---|\n';
for(const [name,re,ga,gb] of CH){const c=count(A,re);out+=`| ${name} | ${c.n} (${c.files.length}) | ${B?yn(ga(B)):'?'} | ${yn(ga(A))} | ${B?yn(gb(B)):'?'} | ${yn(gb(A))} |\n`}
console.log(out);
