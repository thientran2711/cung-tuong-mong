/* FLIGHT-DAYQ family scan (LUẬT SỬA CẢ NHÓM): every popup source that can fire around a buổi / day turn, grouped by the channel it goes
   through, with the two gates of owner bug (5): (A) "the day never turns while it is pending" and (B) "never painted over the title card /
   Tuần lục book; after the book «Tin trong cung» first", plus DAYQ-2 (owner 24/11 ~22:02Z item (1)) gate (C) "nothing starts or is painted
   while she is inside an activity (mini-game intro / play / result, a scene on screen, podium, roulette, her own person view)" and a second
   table: every khắc / buổi event SOURCE (a module that hooks the khắc / buổi clock and posts a card or a scene) with the route it takes.
   Counts call sites in dev/build/j*.js (all.js excluded); gate columns are read from
   the code (BEFORE = origin/main as given by --before <dir>, AFTER = this tree).
   usage: node dev/measure/dayq-family.js [--before <dev/build dir of LIVE>]   → markdown table on stdout */
const fs=require('fs'),path=require('path');
const AFTER=path.join(__dirname,'..','build');const bi=process.argv.indexOf('--before');const BEFORE=bi>0?process.argv[bi+1]:null;
function src(dir){const o={};for(const f of fs.readdirSync(dir))if(/^j.*\.js$/.test(f)&&f!=='all.js')o[f]=fs.readFileSync(path.join(dir,f),'utf8');return o}
function count(S,re){let n=0;const files=new Set();for(const [f,t] of Object.entries(S)){const m=t.match(re);if(m){n+=m.length;files.add(f)}}return{n,files:[...files].sort()}}
/* channels: [name, call-site regex, gate A probe, gate B probe, gate C probe] — a probe returns true when the gate is in the code */
const has=(S,f,re)=>!!(S[f]&&re.test(S[f]));
const CH=[
 ['Q card (event / news / result / edict / stipend card, kitModal, kitPanel)',/\bQ\.(push|unshift|splice)\(|\bkitModal\(|\bkitPanel\(/g,
  S=>has(S,'j9.js',/function nextBuoi\(\)\{if\(!S\|\|S\.dead\|\|Q\.length/),
  S=>has(S,'jdayq.js',/if\(dqUi\(\)&&Q\.length&&dqDawn\(\)&&!DQ\.user\)/),
  S=>has(S,'jdayq.js',/function dqActBlocks/)&&has(S,'jdayq.js',/function dqPull/)],
 ['kit motion scene via kmPush (kitGain «Nhận», kitReward chest/tray/gift, edict, gloom, bloom, ink, tablet flip, night card, card-flip …)',/\bkmPush\(/g,
  S=>has(S,'jdayq.js',/KMQ\.length\)return true/)&&has(S,'jdayq.js',/kmBusy/),
  S=>has(S,'j93.js',/function kmFree\(\)\{const d=document\.getElementById\("dawn"\)/),
  S=>has(S,'jdayq.js',/DQ\.kmTap/)],
 ['mini-game screen + its result (#ov, openMG / kg82)',/\bopenMG\(|\bkg82Play\(|\bplayArt\(/g,
  S=>has(S,'jdayq.js',/getElementById\("ov"\)/),
  S=>true /* a mini-game is opened by her, never at a turn */,
  S=>has(S,'jdayq.js',/function dqActEl/)],
 ['podium (kitPodium, j90) / roulette',/\bkitPodium\(|\bkitRoulette\(/g,
  S=>has(S,'jdayq.js',/kpodov/),
  S=>has(S,'j93.js',/kpodov/),
  S=>has(S,'jdayq.js',/function dqActEl[\s\S]{0,400}kpodov/)],
 ['person view she opened herself / its on-figure game (jdfv kitFocus) — a visitor card does not take it over',/\bdfOpen\(/g,
  S=>true,S=>true,
  S=>has(S,'jdayq.js',/DQ\.fo=/)&&has(S,'jdayq.js',/D\.play/)],
 ['visitor shown as the jdfv stage «say» scene (her v9 case)',/F\.say\(/g,
  S=>true,S=>true,
  S=>has(S,'jdayq.js',/m\.dfSeen=0;D\.encM=null/)],
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
const yn=v=>v?'yes':'**NO**';const C=(g,S)=>g?yn(g(S)):'n/a';
let out='| channel | call sites (files) | A: day waits — before | after | B: not over card/book — before | after | C: not inside an activity — before | after |\n|---|---|---|---|---|---|---|---|\n';
for(const [name,re,ga,gb,gc] of CH){const c=count(A,re);out+=`| ${name} | ${c.n} (${c.files.length}) | ${B?yn(ga(B)):'?'} | ${yn(ga(A))} | ${B?yn(gb(B)):'?'} | ${yn(gb(A))} | ${B?C(gc,B):'?'} | ${C(gc,A)} |\n`}
/* (2) every khắc / buổi event SOURCE: a module that hooks the clock (spend / endTurn / nextBuoi / dawn / agTick / agWatch / j95 khắc tick)
   and posts a card (Q) or a scene (kmPush). Route: the only painter of #modal is j3 showModal (direct paints counted: must be 0), the only
   starter of a kit scene is j93 kmPump → both gated by (C). */
const HOOK=/\b(spend|endTurn|nextBuoi|dawn|agTick|agWatch|j95tick|ptTick|errTick|menWatch|approaches|evRelease|gmTick)\s*=\s*function|const \w+=(spend|endTurn|nextBuoi|dawn|agTick|agWatch);|function (approaches|evRelease|gmTick|gmWatch|actPendRun|stayRoll)\(/;
const POST=/\bQ\.(push|unshift)\(|\bkmPush\(|\bshowModal\(\)/;
const paint=t=>(t.match(/\$\("modal"\)\.hidden=false|getElementById\("modal"\)\.hidden=false/g)||[]).length;
let src2='\n| khắc / buổi event source (file) | posts card (Q) | posts scene (kmPush) | paints #modal itself | route | gated by (C) |\n|---|---|---|---|---|---|\n';let nS=0,bad=0;
for(const [f,t] of Object.entries(A).sort()){if(f==='jdayq.js'||!HOOK.test(t)||!POST.test(t))continue;nS++;const q=(t.match(/\bQ\.(push|unshift)\(/g)||[]).length,k=(t.match(/\bkmPush\(/g)||[]).length,pm=f==='j3.js'?0:paint(t);if(pm)bad++;
 src2+=`| ${f} | ${q} | ${k} | ${pm} | ${q?'Q → showModal':''}${q&&k?' · ':''}${k?'kmPush → kmPump':''} | ${pm?'**NO**':(A['jdayq.js']&&/function dqActBlocks/.test(A['jdayq.js'])?'yes':'**NO**')} |\n`}
src2+=`\n${nS} source files; direct #modal paints outside j3 showModal: ${bad}.\n`;out+=src2;
console.log(out);
