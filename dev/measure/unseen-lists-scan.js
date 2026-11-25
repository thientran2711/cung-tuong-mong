/* unseen-lists-scan (review/save-unseen-lists, LAW 11 «fix the whole group»): every runtime list / queue the player can still open, or that still
   waits to be shown to her, and whether a TRUE reload (the slot) and the co-op seat snap (CW.snap = ser(), restored by deser) carry it.
   Order: MAIN 140 25/11 ~13:10Z «anything the player has not seen yet must survive save/load (and co-op snap). Audit every runtime list the player
   can still open (Tin báo, pending notices, letters, results) for save coverage; keep the size budget».
   Each row: the list, where it lives, a proof pattern per build (regex on the source file) for «in the sổ», and the kind:
     UNSEEN  = holds things she has not seen / can still open → MUST be in the sổ (else FAIL)
     ACCEPT  = cannot be written down (code); the trade is ruled and counted (named report) → listed, not a FAIL
     NOLIST  = not a list she can open (same-tick batch, animation, transport, pointer) → listed for completeness
   The co-op seat snap is ser() itself (jcoopworld CW.snap / CW.restore → deser), so «in the sổ» through ser()/S = «in the snap»; a list kept on S
   also rides in the room blob (myBlob copies S), a top-level ser() field rides only in the seat snap (her own device + seat copy).
   usage: node dev/measure/unseen-lists-scan.js [buildDir=dev/build]   exit 1 = an UNSEEN list without save coverage (or a row whose file is gone). */
const fs=require('fs'),path=require('path');const dir=process.argv[2]||path.join(__dirname,'../build');
const rd=f=>{try{return fs.readFileSync(path.join(dir,f),'utf8')}catch(e){return null}};
const ALL=fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)).map(f=>fs.readFileSync(path.join(dir,f),'utf8')).join('\n');/* a proof may live in another module (ser() in j6, a wrapper in its owner) */
const lineOf=(src,re)=>{if(!src)return 0;const m=re.exec(src);return m?src.slice(0,m.index).split('\n').length:0};
/* [name, file, where (regex for the list itself), kind, in-sổ proof (regex) | null, how it rides, size note] */
const ROWS=[
 ['Q — the dialog queue (open + waiting cards)','j3.js',/function serQ\(/,'UNSEEN',/P:serQ\(\)/,'ser() P (pid / generator / data cards; jqsave $full)','≈ cards × 0.3–4 KB'],
 ['Q code cards (options run code, no generator)','jqsave.js',/function jqSaveable/,'ACCEPT',null,'held within the buổi; a step / life start writes at once without them (reports/save-year-rollback.md)','—'],
 /* save-unseen-lists r2 (rv r2 FIX 1, LAW 11): every CODE card family that is open / waiting right after a step (month / year flip) carries its
    generator (j3 rcpReg kind + plain args) and is made again on load; jqSaveable counts rk cards as saveable (Q + SP13.L + EVHOLD write them) */
 ['Q/SP13 rk cards — generator cards are saveable','jqsave.js',/function jqSaveable/,'UNSEEN',/function jqSaveable\(m\)\{return !m\|\|!!m\.pid\|\|!!m\.rk/,'jqSaveable: rk → written {rk,ra} (serM), remade by rcpMk','≈ 0.1–3 KB per card'],
 ['«Bổng lộc tháng …» stipend card (+ Nội vụ phủ skim answers)','jecon.js',/const ttl=`Bổng lộc tháng/,'UNSEEN',/const econStipCard=rcpReg\("stipCard"/,'rcpReg stipCard: rows + numbers + skim (sup id, goods by inv index); builds only, money paid before','≈ 1–3 KB'],
 ['«Bổng lộc tháng … · Lễ nghĩa» cost card','jecon.js',/· Lễ nghĩa`/,'UNSEEN',/const econDutyCard=rcpReg\("stipDuty"/,'rcpReg stipDuty: d / bt / sk / dd numbers; cost paid on answer only (LAW 2/3: not skippable by reload)','≈ 0.2 KB'],
 ['«Danh hiệu mới / lên bậc» reward panel','jdh.js',/function dhNotice\(key\)/,'UNSEEN',/dhNotice=rcpReg\("dhNotice",dhNotice\)/,'rcpReg dhNotice: the title key (granted before; remake = panel only, no log)','≈ 30 chars'],
 ['«Y phục dự <tết>» dress gate','jdc.js',/function dcGateItem\(/,'UNSEEN',/const dcGateK=rcpReg\("dcGate"/,'rcpReg dcGate: the festival key; rebuilt from the live chest','≈ 30 chars'],
 ['«<tết> · Chuyện bên lề hội» side story','j71c.js',/function compCard\(/,'UNSEEN',/compCard=rcpReg\("j71cComp",compCard\)/,'rcpReg j71cComp: festival key + {seed id, rival id}','≈ 60 chars'],
 ['«Có người đến» visits (+ Thái hậu triệu, Kẻ hầu xin …)','j24.js',/const AP_MK=\{/,'UNSEEN',/AP_MK\[k\]=rcpReg\("ap\."\+k,AP_MK\[k\]\)/,'rcpReg ap.<kind>: o with people as ids (gift / warning cards have no options = notices)','≈ 0.1 KB'],
 ['«Nghe đồn» rumour card (j95b)','j95b.js',/function j95bHear\(r\)/,'UNSEEN',/const j95bRumCard=rcpReg\("j95bRum"/,'rcpReg j95bRum: the rumour id (S.j95b.rum)','≈ 20 chars'],
 ['«Kẻ hầu ăn bớt» pilfer card (jeitem)','jeitem.js',/function eitPilEvent\(X\)/,'UNSEEN',/const eitPilCard=rcpReg\("eitPil"/,'rcpReg eitPil: servant id + piece kind + price (the piece left the chest before)','≈ 40 chars'],
 ['«Kính sự phòng ghi sổ» / «Lời ra tiếng vào» morning card (jne)','jne.js',/function morningAfter\(\)/,'UNSEEN',/const neMornCard=rcpReg\("neMorn"/,'rcpReg neMorn: tier + mocker id (Danh applied before, in the same write)','≈ 30 chars'],
 ['world event cards «Hỏa hoạn lớn», «Sứ đoàn vào triều» … (jworld)','jworld.js',/function startCard\(w\)/,'UNSEEN',/const worldCardK=rcpReg\("world"/,'rcpReg world: the window id (remade from the live window)','≈ 15 chars'],
 ['NT.list — «Tin báo» notices (the top-bar «!» box)','jnotice.js',/const NT=window\.NT=\{list:\[\]/,'UNSEEN',/d\.nt=ntSer\(\)/,'ser() nt (≤ BAL.noticeMax rows; go made again from the id)','≈ 3 KB at 20 rows'],
 ['NT.pend — the chip waiting for a dialog to close','jnotice.js',/NT\.pend=it/,'UNSEEN',/d\.nt=ntSer\(\)/,'= an NT.list row: after a load it is in the box (unread), no second chip','0'],
 ['KB — kitKnow batch («Ngươi biết thêm N điều»)','jnotice.js',/const KB=\{m:new Map\(\)/,'NOLIST',null,'flushed into NT.list in the same tick (setTimeout 0)','0'],
 ['EVHOLD — held optional event cards (j68)','j68.js',/let EVHOLD=\[\]/,'UNSEEN',/d\.evh=EVHOLD/,'ser() evh (≤ E68S.hold rows, serQ form)','≈ 0.3 KB per card'],
 ['SP13.L — world cards moved to a later buổi (jspread)','jspread.js',/const SP13=\{vo:0,L:\[\]/,'UNSEEN',/z\.q=SP13\.L\.filter\(x=>!x\.code\)/,'S.sp13.q (data cards); code cards = ACCEPT row below','≈ cards × 0.3 KB'],
 ['SP13.L code cards','jspread.js',/function sp13Code/,'ACCEPT',null,'≤ BAL.spread.codeWait buổi, counted SP13.stat.unsaved (reports/save-year-rollback.md)','—'],
 ['S.rcvPend — requests waiting for her answer (jrcv)','jrcv.js',/S\.rcvPend=S\.rcvPend\|\|\[\]/,'UNSEEN',/S\.rcvPend/,'on S; re-raised as notices after a load','small'],
 ['S.ordQ — orders / requests to her (jptime)','jptime.js',/function ptOrdQ\(\)/,'UNSEEN',/S\.ordQ=\[\]/,'on S','small'],
 ['S.erra — errands out / back (jerr)','jerr.js',/function errZ\(\)/,'UNSEEN',/S\.erra=\[\]/,'on S','small'],
 ['S.tb — Tai mắt news (jagknow)','jagknow.js',/function tinBaoList\(\)/,'UNSEEN',/Personal state S\.tb/,'on S','small'],
 ['S.mg — an open mini-game (resumeMG)','j6.js',/if\(S\.mg\)resumeMG\(\)/,'UNSEEN',/if\(S\.mg\)resumeMG\(\)/,'on S; the title «Tiếp tục» resumes it','small'],
 ['identity card «Thân phận kiếp này» (j52 NLP)','j52.js',/function nlCard\(\)/,'UNSEEN',/d\.nl=\{seed:NLP\.seed\}/,'ser() nl {seed}: the same card opens again on load','≈ 20 chars'],
 ['KMQ — big-moment scenes waiting (j93 kmPush)','j93.js',/const KMQ=\[\]/,'NOLIST',null,'closures that SHOW what is already applied + logged (rewards given before the scene); kmReset empties it on load','0'],
 ['DQ.want — a turn held behind a scene (jdayq)','jdayq.js',/const DQ=\{want:null/,'NOLIST',null,'the turn has not run yet: nothing applied, she taps again after a load','0'],
 ['AGL.L — deferred agent jobs (jagent)','jagent.js',/const AGL=\{L:\[\]/,'NOLIST',null,'run in the same tick (setTimeout 0)','0'],
 ['KSF.q — stat fly / glow animations (jstatfx)','jstatfx.js',/const KSF=\{q:\[\]/,'NOLIST',null,'animation of a change already in S','0'],
 ['NHQ — month lines logged after the palace news (jnroadhp)','jnroadhp.js',/const NHQ=\[\]/,'NOLIST',null,'written into the log in the same month tick','0'],
 ['LDQ — co-op ledger lines waiting for the merged week (jledger)','jledger.js',/let LDQ=\[\]/,'NOLIST',null,'co-op transport, settled right after the merged week (by design not in S)','0'],
 ['RQ — co-op relay queue (jkcco)','jkcco.js',/const RQ=\[\]/,'NOLIST',null,'transport until the peer acks','0'],
];
let fail=0;const out=[];
for(const [name,file,where,kind,proof,how,size] of ROWS){const src=rd(file);const ln=lineOf(src,where);
 let ins;if(!src||!ln){ins='ROW GONE';fail++}else if(kind!=='UNSEEN')ins=kind==='ACCEPT'?'no (accepted)':'n/a';else{const ok=proof.test(ALL);ins=ok?'yes':'NO';if(!ok)fail++}
 out.push(`| ${name} | ${file}:${ln||'?'} | ${kind} | ${ins} | ${kind==='UNSEEN'&&ins==='yes'?'yes (snap = ser())':kind==='UNSEEN'?'NO':'—'} | ${how} | ${size} |`)}
console.log('| list | file:line | kind | in sổ (reload) | in co-op snap | how | size |\n|---|---|---|---|---|---|---|\n'+out.join('\n'));
/* census (LAW 11 before/after, informational): code-card pushes — a card literal pushed straight into Q (Q.push / Q.unshift({…}) whose options carry a
   go: closure, i.e. cards that are not made by a registered generator. Each is either carried by a pid (mkP) or a generator elsewhere, or stays
   ACCEPT (within the buổi hold / a step writes without it). Counted per file so a later round sees the family shrink. */
{const C={};for(const f of fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){const src=fs.readFileSync(path.join(dir,f),'utf8');const re=/Q\.(push|unshift)\(\{/g;let m;
  while((m=re.exec(src))){const seg=src.slice(m.index,m.index+2500);const end=seg.search(/\}\)\s*[;}]/);const body=end>0?seg.slice(0,end):seg;if(/opts\s*:/.test(body)&&/go\s*:\s*\(/.test(body))C[f]=(C[f]||0)+1}}
 const L=Object.entries(C).sort((a,b)=>b[1]-a[1]);const n=L.reduce((a,b)=>a+b[1],0);
 const RK=(ALL.match(/rcpReg\("/g)||[]).length;console.log(`census: ${RK} registered card generators (rcpReg) · ${n} literal code-card pushes (opts with go:) in ${L.length} files: ${L.map(([f,k])=>f+' '+k).join(', ')}`)}
console.log(fail?`UNSEEN-LISTS SCAN FAIL ${fail}`:`UNSEEN-LISTS SCAN PASS (${ROWS.length} lists, ${ROWS.filter(r=>r[3]==='UNSEEN').length} unseen-kind covered)`);process.exit(fail?1:0);
