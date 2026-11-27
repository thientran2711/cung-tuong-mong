/* mg-skip-all audit (owner 18/11 ~05:55Z: "bất kỳ một cái mini game nào cũng có cái option đó hết"; KIT §13.6, BAL.skip).
   Static scan of dev/build (or MS_BUILD=<dir>): lists EVERY mini-game / mini-game-like choice, whether it offers the quick option through the ONE
   kit part (kitQuick / kitQuickSub on #mgskip), and what a quick pick gives. FAILS when
     1. a listed game has no kit quick button;
     2. a file opens a game frame (kg82Open / kitGameFrame / openMG) but never builds the kit quick button (a new game without it);
     3. a playArt caller does not name its quick option (quick:{…});
     4. a quick roll is made by anything but kitQuickRoll() (the one BAL.skip.od roll) or the old keys BAL.odb.j5 / BAL.odb.j83 are still read;
   5. (m-fix-1, owner OD 18/11 ~05:55Z "a quick result never beats a good own play") a skip / "Để tài nghệ quyết định" / not-played MARK is not
      passed through the ONE cap kitSkipCap (j79, BAL.skip.cap), or the words still promise "như người cùng bậc" (her median, uncapped: M4 10/10).
   usage: node dev/test/mg-skip-audit.js [--md]   (prints the table; exit 1 on a failure). Before / after: MS_BUILD=<old build dir>. */
const fs=require('fs'),path=require('path');
const B=process.env.MS_BUILD||path.join(__dirname,'..','build'),MD=process.argv.includes('--md');
const rd=f=>{try{return fs.readFileSync(path.join(B,f),'utf8')}catch(e){return ''}};
const Q=/kitQuick\(|kitQuickSub\(/;
/* [game, file, entry marker, quick marker (regex in that file), rule family, a quick pick gives] */
const G=[
 ['Tài nghệ lesson, old overlay (Cầm/Kỳ/Họa/Vũ, j5 openMG)','j5.js',/function openMG/,/kitQuickSub\(\{win:(?:"tiến bộ một phần"|`tiến bộ )/,'roll','thành: tiến bộ một phần (1 of 3 pts) · hỏng: 0'],
 ['Tài nghệ lesson with a work (j83 «Học nhanh», every art)','j83.js',/playArt\(\{art:k,title:`\$\{m\.mode/,/n:"Học nhanh",roll:1/,'roll','thành: tiến bộ một phần, no work · hỏng: 0'],
 ['Tài nghệ practice at bậc 5 (j83 tự học, jrcp học với thầy)','jrcp.js',/title:`Học \$\{an\} với thầy`/,/n:"Học nhanh",sure:1/,'sure','no work (sure, no roll)'],
 ['Tu đức lesson (jtd: Công/Dung/Ngôn/Hạnh games)','jtd.js',/function tdPlay/,/kitQuick\(\{n:"Học nhanh",win:(?:"tiến bộ một phần"|`tiến bộ )/,'roll','thành: progress of a 5/10 play · hỏng: 0'],
 ['Tu đức work (jtds, through jtd)','jtds.js',/function tdsFinish/,/TDV\.skip/,'via jtd','no work (the jtd quick button)'],
 ['Kết mạng che mặt (jveil craft)','jveil.js',/title:"Kết mạng che mặt"/,/n:"Kết nhanh",sure:1/,'sure','no veil, material back (sure)'],
 ['Điểm trang buổi sáng (jtoil, dress + colour screens)','jtoil.js',/function toilOpen/,/toilRollBtn\("toilquick2?"\)/,'roll: Dung (mg-trim)','one tap = the face table on her hand (Dung, Họa, Sắc, rank, colours, hoa điền); «Tự tay điểm trang» = the mirror game; Để mặt mộc stays'],
 ['Điểm trang before a contest (jmkt → toilColUI)','jmkt.js',/toilColUI\(\)/,null,'roll','same button as jtoil colour screen'],
 ['Chăm thú cưng: cho ăn / tắm / chơi (jpetcare)','jpetcare.js',/function petcGameBox/,/id:"kpcquick",n:"Chăm nhanh"/,'roll «Chăm nhanh»','thành: BAL.skip.care of the gain · hỏng: nothing (+ «Giao … chăm»)'],
 ['Chăm cây: tưới (jshelf)','jshelf.js',/kshpgame/,/id:"kshpquick",n:"Chăm nhanh"/,'roll «Chăm nhanh»','thành: BAL.skip.care of the gain · hỏng: nothing (+ «Giao … chăm»)'],
 ['Hội thi / thi tài (j82 startContest)','j82.js',/function startContest/,/n:"Để tài nghệ quyết định"/,'own: peer','her median, capped at BAL.skip.cap (Khá)'],
 ['Tự luyện / lesson frame default (j82 playArt)','j82.js',/function playArt/,/kitQuick\(QK\)/,'per caller','the caller\'s quick (o.quick), mark capped'],
 ['Tuyển chọn entry round (jentry)','jentry.js',/kg82go/,/n:"Để tài nghệ quyết định"/,'own: peer','her median, capped at BAL.skip.cap (Khá)'],
 ['Khảo hạch thăng phẩm (jexam, jnwq games)','jexam.js',/kg82go/,/n:"Để tài nghệ quyết định"/,'own: peer','her median per round, capped at BAL.skip.cap'],
 ['Phúc tuyển / tuyển chọn at home (jkc, jkc2 playArt)','jkc2.js',/playArt\(\{art,title,note/,/n:"Để tài nghệ quyết định"/,'own: peer','her median, capped at BAL.skip.cap'],
 ['Court act games (jts tsGame)','jts.js',/function tsGame/,/id:"kg82skip",n:"Bỏ qua"/,'own: act odds','the act\'s own odds; won = capped mark'],
 ['Phối đồ hội (jts dress)','jts.js',/id="tsdgo"/,/id:"tsdskip"/,'own: maid','the maid picks (by her goodwill)'],
 ['Tát / né (jslap, jlooks, Dư đồ class B)','jslap.js',/function slapGame/,/SLAP\.next=slapNpcTier\(S,v\)/,'cut: one draw (mg-trim)','her tier = the NPC draw (slapNpcTier); Né = one roll of the card odds'],
 ['Nghiệm thân sleight (jroute)','jroute.js',/function rtNgSleight/,/n:"Để Tâm cơ quyết định"/,'own: Tâm cơ odds','the act\'s Tâm cơ odds'],
 ['Mưu kế games (jsgame)','jsgame.js',/kg82Open\(\{art:J\.art/,/id:"sgskip"/,'own: hand off','a helper does it at today\'s odds'],
 ['Chải chuốt (j92 wdGroomUI)','j92.js',/function wdGroomUI/,/id:"kg92skip"/,'own: auto dress','as Tự chọn đồ'],
];
const fails=[],rows=[];
for(const [n,f,entry,qm,fam,gives] of G){const s=rd(f);const has=!!s&&entry.test(s);let q;
 if(f==='jmkt.js')q=has&&/toilRollBtn\("toilquick2"\)/.test(rd('jtoil.js'));
 else if(f==='jtds.js')q=has&&/kitQuick\(\{n:"Học nhanh"/.test(rd("jtd.js"));
 else q=has&&qm.test(s);
 const old=!q&&has&&/id="(?:mgskip|kg82skip|kg92skip|tsdskip|sgskip|toilmoc2?)"|Để trời định|Học nhanh|Chăm nhanh/.test(s);
 rows.push([n,f,has?(q?'yes (kit)':old?'own button':'NO'):'not in build',q?fam:'',q?gives:'']);if(has&&!q)fails.push(`no kit quick: ${n} (${f})`)}
/* 2. discovery: a game frame in a file that never builds the kit quick button */
const files=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f));
const SKIPF=new Set(['j79.js','jcui.js','jaudit.js','jmkt.js','j91.js','jnwq.js','jmgt.js','jcal.js','jwkg.js','jkitpage.js','jmgcal.js']);/* m-fix-1: + jkitpage (the kit sample page, not a game) + jmgcal (her hand-test calibration: a skip would fake her measured hand) *//* kit itself, samples, audit wrappers, engines / kind routers (their games run inside a listed frame: jwkg picks the game of a j83 work) */
for(const f of files){if(SKIPF.has(f))continue;const s=rd(f).replace(/\/\*[\s\S]*?\*\//g,'');
 if(/kg82Open\(\{|kitGameFrame\(\{|\bopenMG=function|function openMG/.test(s)&&!Q.test(s)&&!(f==='jroute.js')&&!(f==='jtoil.js'&&/toilRollBtn\(/.test(s))/* mg-trim: the mirror's quick = the one-tap Điểm trang roll */)fails.push(`game frame without the kit quick button: ${f}`);
 if(f==='jroute.js'&&/function rtNgScene/.test(s)){/* rtNgScene = the blood-bowl cut-scene (no play): not a game */}
 for(const m of s.matchAll(/playArt\(\{([^]*?)onDone/g))if(!/quick:/.test(m[1]))fails.push(`playArt caller without quick: ${f}: ${m[1].slice(0,60)}`);
 if(/BAL\.odb\.j5\b|BAL\.odb\.j83\b/.test(s))fails.push(`old skip key still read: ${f}`)}
const kit=rd('j79.js');if(!/function kitQuickRoll\(\)\{return roll\(od\(BAL\.skip\.od\)\)\}/.test(kit))fails.push('kitQuickRoll is not the one BAL.skip.od roll');
/* 5. the cap (m-fix-1): every skip MARK reads kitSkipCap */
if(!/function kitSkipCap\(raw\)\{[^}]*BAL\.skip\.cap/.test(kit))fails.push('kitSkipCap (BAL.skip.cap) missing in j79');
const CAP=[['j82.js',/const SK=kitSkipCap\(/],['j82.js',/done\(kitSkipCap\(o\.quick/],['jentry.js',/function entSkipRaw\(\)\{[^\n]*kitSkipCap/],['jentry.js',/const SK=\(typeof kitSkipCap/],
 ['jexam.js',/function exSkipRaw\([^\n]*kitSkipCap/],['jpma.js',/function pmSk\([^\n]*kitSkipCap/],['jkcg.js',/fin\(o&&o\.skipped\?kitSkipCap\(/],['jts.js',/raw:ok\?kitSkipCap\(/]];
for(const [f,re] of CAP)if(rd(f)&&!re.test(rd(f)))fails.push(`skip mark not capped by kitSkipCap: ${f} ${re}`);
for(const f of files){const s=rd(f).replace(/\/\*[\s\S]*?\*\//g,'');if(/như người cùng bậc/.test(s))fails.push(`skip words still say "như người cùng bậc" (uncapped median): ${f}`)}
const bal=rd('jbal2.js');if(!/skip:\{od:\d+[^}]*cap:\d+/.test(bal))fails.push('BAL.skip.cap missing');if(!/skip:\{od:\d+/.test(bal))fails.push('BAL.skip.od missing');
const nQ=rows.filter(r=>/kit/.test(r[2])).length,nG=rows.filter(r=>r[2]!=='not in build').length;
if(MD){console.log('| Game | File | Quick | Rule | A quick pick gives |\n|---|---|---|---|---|');for(const r of rows)console.log(`| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} |`)}
else for(const r of rows)console.log(r.join(' | '));
console.log(JSON.stringify({games:nG,withKitQuick:nQ,odds:(bal.match(/skip:\{od:(\d+)/)||[])[1]||null,fails:fails.length}));
if(fails.length){console.log('FAIL:\n '+fails.join('\n '));process.exit(1)}console.log('PASS: every mini-game has the ONE kit quick option');
