/* time-advance-save-scan (review/save-year-rollback, LAW 11 whole family): every place where time moves (buổi / tuần / tháng / năm, night,
   new life, death, co-op week) and every gate that can stop the autosave written after it. A step is SAFE when the save written right after it
   (j6 render() ends with save()) reaches the sổ, or the hold is bounded by a card ON SCREEN (time cannot move while Q has a card: j9 nextBuoi).
   A gate that can hold the save while the screen is free (no card open) across a time step = FAIL (robot M2: Year 4 on screen, Year 3 in the sổ).
   usage: node dev/measure/time-advance-save-scan.js [buildDir=dev/build]      exit 1 = a FAIL row or a save gate this scan does not know.
   Before/after: run it on the old build dir (git archive origin/main dev/build) and on this branch. */
const fs=require('fs'),path=require('path');const DIR=process.argv[2]||path.join(__dirname,'../build');
const files=fs.readdirSync(DIR).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');
const src={};for(const f of files)src[f]=fs.readFileSync(path.join(DIR,f),'utf8');
const lineOf=(f,i)=>src[f].slice(0,i).split('\n').length;
const find=(re)=>{const out=[];for(const f of files){const s=src[f];let m;const g=new RegExp(re.source,re.flags.includes('g')?re.flags:re.flags+'g');while((m=g.exec(s)))out.push({f,l:lineOf(f,m.index),t:m[0]})}return out};
/* 1) the time-advance paths (writers of the calendar) */
const ADV=[
 ['buổi','j9.js',/function nextBuoi\(\)\{[\s\S]{0,200}?S\.buoi=\(S\.buoi\|\|0\)\+1/,'nextBuoi → render() → save()'],
 ['day / tuần (solo)','j3.js',/function endTurn\(\)/,'endTurn → render() → save()'],
 ['tháng / năm (solo)','j3.js',/function monthTick\(\)/,'monthTick (inside endTurn) → render() → save()'],
 ['day / tuần / tháng / năm (cung nữ road)','j42.js',/function srvEndTurn\(\)/,'srvEndTurn → render() → save()'],
 ['day / tuần / tháng / năm (khuê các)','jkc.js',/function kcEndTurn\(\)/,'kcEndTurn → render() → save()'],
 ['tháng / năm (khuê các part 2)','jkc2.js',/S\.month\+\+;S\.tuan=0/,'inside kcEndTurn → render() → save()'],
 ['night (thị tẩm / her night)','jnf.js',/function (hold|herNight)\(\)\{S\.buoi=B4\(\)/,'render() → save()'],
 ['new life (start / Luân hồi)','j52.js',/function nlBegin\(\)/,'nlCard open: save held (j52 gate) until «Nhận thân phận» → render() → save()'],
 ['death','j32.js',/function over\(h,t,fate,alive\)\{if\(S\.dead\)return"";[^\n]{0,80}S\.dead=true/,'S.dead → j6 save() removes the sổ (the life is over)'],
 ['co-op week (merged)','jcoopworld.js',/function snapSave\(/,'room server is the save; seat copy ctm-coop-wk at each sync + pagehide'],
];
/* 2) the save gates: every wrapper of save() (or a quiet flag) that can return WITHOUT writing */
const GATES=[
 {id:'j6 base',f:'j6.js',re:/function save\(\)\{if\(!S\|\|quiet\)return;/,why:'quiet (a load / rebuild in progress), S.dead removes the sổ',bound:'quiet is set only around a load/rebuild',
  bad:[/quiet=true;d\.tab="act";[^\n]*?deser\(d\);quiet=false/],badWhy:'j6 «Tiếp tục»: quiet=true; deser(d); quiet=false with no finally — a throw in any load step leaves quiet on, NO save for the rest of the life'},
 {id:'j42 cung nữ start',f:'j42.js',re:/quiet=true;(try\{)?srvInit\(\)/,why:'quiet around srvInit at a cung nữ start',bound:'one call',bad:[/\{quiet=true;srvInit\(\);quiet=false;/],badWhy:'quiet=true; srvInit(); quiet=false with no finally — a throw leaves quiet on'},
 {id:'j52 new life card',f:'j52.js',re:/save=function\(\)\{if\(NLP/,why:'the identity card «Thân phận kiếp này» is open',bound:'card on screen (Q has the nl card)',
  bad:[/save=function\(\)\{if\(NLP\)return;/],badWhy:'held while NLP is set, even if the nl card left Q some other way (then never released: no save for the life)'},
 {id:'jcloud stale / title',f:'jcloud.js',re:/save=function\(\)\{if\(STALE/,why:'Sổ mây: the cloud copy just replaced the PLAYING sổ (she chose it on the title), or the title is up',bound:'by design: that life object is no longer the sổ; title up = she is not playing',bad:[]},
 {id:'jcoopworld co-op',f:'jcoopworld.js',re:/save=function\(\)\{if\(!CW\.on\)return f\.apply/,why:'in a co-op room the solo sổ is not written',bound:'co-op: the room server holds the life (seat copy ctm-coop-wk)',bad:[]},
 {id:'jslots co-op life',f:'jslots.js',re:/if\(S&&S\.coopRoom\)\{if\(CW\.on\)/,why:'a life built in a room is never written into a solo sổ',bound:'by design (owner save-slots rule)',bad:[]},
 {id:'jqsave open code card',f:'jqsave.js',re:/if\(Q\.some\(m=>!jqSaveable\(m\)\)\)\{JQ\.held=1/,why:'a card whose options run code is in Q (cannot be written down)',bound:'card in Q: time cannot move (j9 nextBuoi returns while Q.length); flushed by render() once answered — a reload lands before the card, never more than the one step that brought it',bad:[]},
 {id:'jspread waiting code card',f:'jspread.js',re:/const sv0=save;save=function\(\)\{if\(!S\|\|quiet\|\|S\.dead\|\|SP13\.off\(\)\)return sv0\.apply/,why:'a code card D13 moved to a later buổi waits unseen',bound:'-',
  bad:[/if\(SP13\.L\.some\(x=>x\.code\)\)\{SP13\.held=1;SP13\.stat\.held\+\+;return\}/],badWhy:'HELD while the card waits UNSEEN (screen free, she plays on): chained over buổi / tuần / the new year → reload goes back to before the step (robot M2 Year 4 → 3)'},
];
const rows=[];let fail=0;
console.log('## time-advance paths ('+path.relative(process.cwd(),DIR)+')');console.log('| step | where | persisted by |');console.log('|---|---|---|');
for(const [n,f,re,how] of ADV){const s=src[f];const m=s&&re.exec(s);const at=m?`${f}:${lineOf(f,m.index)}`:`${f}: NOT FOUND`;if(!m){fail++}console.log(`| ${n} | ${at} | ${how} |`)}
/* every other calendar writer in the build (so a new one is seen) */
const other=find(/S\.(month|year)\+\+|S\.tuan\+\+/g).filter(x=>!['j3.js','j42.js','jkc.js','jkc2.js'].includes(x.f));
console.log(`| other S.tuan++/month++/year++ writers | ${other.map(x=>x.f+':'+x.l).join(', ')||'none'} | ${other.length?'UNREVIEWED':'—'} |`);if(other.length)fail++;
console.log('\n## save gates (every save() wrapper / quiet) — can the save be held while the screen is free across a step?');
console.log('| gate | where | holds when | bounded by | verdict |');console.log('|---|---|---|---|---|');
const known=new Set();
for(const g of GATES){const s=src[g.f]||'';const m=g.re.exec(s);const at=m?`${g.f}:${lineOf(g.f,m.index)}`:`${g.f}: not found`;known.add(g.f);
 const hit=g.bad.find(b=>b.test(s));const v=!m?'MISSING (gate gone?)':hit?'FAIL — '+g.badWhy:'OK';if(hit)fail++;console.log(`| ${g.id} | ${at} | ${g.why} | ${g.bound} | ${v} |`)}
const wr=find(/(^|[^.\w])save=function/gm).filter(x=>!known.has(x.f));
for(const x of wr){fail++;console.log(`| UNKNOWN save wrapper | ${x.f}:${x.l} | ? | ? | UNREVIEWED — add it to this scan |`)}
console.log(fail?`\nTIME-ADVANCE-SAVE SCAN FAIL ${fail}`:`\nTIME-ADVANCE-SAVE SCAN PASS (${ADV.length} paths, ${GATES.length} gates)`);process.exit(fail?1:0);
