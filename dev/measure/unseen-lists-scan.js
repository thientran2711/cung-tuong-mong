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
 ['Q code cards (options run code, no generator)','jqsave.js',/function jqSaveable/,'ACCEPT',null,'only the ACT / PANEL / COOP rows of the code-card census below (made by her own act inside a buổi: the in-buổi hold keeps the sổ before the act); every card a step makes is inside a generator (census UNCLASSIFIED 0, save-residue-probe 0)','—'],
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
 ['composed world cards (jworldc wcCard)','jworldc.js',/function wcCard\(w\)/,'UNSEEN',/const wcCardK=rcpReg\("wc"/,'rcpReg wc: the window id','≈ 10 chars'],
 ['NT.list — «Tin báo» notices (the top-bar «!» box)','jnotice.js',/const NT=window\.NT=\{list:\[\]/,'UNSEEN',/d\.nt=ntSer\(\)/,'ser() nt (≤ BAL.noticeMax rows; go made again from the id)','≈ 3 KB at 20 rows'],
 ['NT.pend — the chip waiting for a dialog to close','jnotice.js',/NT\.pend=it/,'UNSEEN',/d\.nt=ntSer\(\)/,'= an NT.list row: after a load it is in the box (unread), no second chip','0'],
 ['KB — kitKnow batch («Ngươi biết thêm N điều»)','jnotice.js',/const KB=\{m:new Map\(\)/,'NOLIST',null,'flushed into NT.list in the same tick (setTimeout 0)','0'],
 ['EVHOLD — held optional event cards (j68)','j68.js',/let EVHOLD=\[\]/,'UNSEEN',/d\.evh=EVHOLD/,'ser() evh (≤ E68S.hold rows, serQ form)','≈ 0.3 KB per card'],
 ['SP13.L — world cards moved to a later buổi (jspread)','jspread.js',/const SP13=\{vo:0,L:\[\]/,'UNSEEN',/z\.q=SP13\.L\.filter\(x=>!x\.code\)/,'S.sp13.q (data cards); code cards = ACCEPT row below','≈ cards × 0.3 KB'],
 ['SP13.L code cards','jspread.js',/function sp13Code/,'ACCEPT',null,'SP13 takes only world cards (made at a step); every such code card is inside a generator now (census UNCLASSIFIED 0) — a left-out one would show as LOST-AT-WRITE SP13 in dev/test/save-residue-probe.js','—'],
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
/* CODE-CARD CENSUS (save-unseen-lists r4, rv FIX 2, LAW 11 / 6c): EVERY place in the game code that makes a card whose options run code — a literal
   card, a card pushed through a variable, tsPanel / kitPanel / kitModal / pushModal specs, a card returned from a table function — is found by
   parsing (object literals with an `opts` key whose options carry a function, or whose opts come from a call / variable; pid cards and cards whose
   only function is an empty `go:()=>{}` are data, jqsave jqNoop). Each site must be either INSIDE a registered generator (j3 rcpReg: written as
   {rk,ra} and made again on load) or match one CLASS row below with its reason; an unclassified site = SCAN FAIL (a new code card nobody routed). */
const CLASS=[/* [file, regex on «enclosing function chain + title», class, reason] — classes: ROUTE (made again by a named generator elsewhere, the regex
   proof must hold in the code) · ACT (made only by her own act / tap inside a buổi: the in-buổi hold keeps the sổ before the act, a step never sees it)
   · PANEL (a look-up / view panel she opens herself, never saved by design: jqsave isLookCard / view) · KIT (a kit builder / sample page, not a card
   source) · COOP (a co-op room: no slot write, the seat snap; made live from a relay message) · NOTCARD (a parse hit that is not a card) */
 ['j24.js',/^ /,'ROUTE','approach cards in AP_MK: each kind wrapped by rcpReg("ap."+k) (j24 AP_MK loop)',/AP_MK\[k\]=rcpReg\("ap\."\+k/],
 ['j31.js',/^ /,'ROUTE','FESTEV rows: made by festEvCard (rcpReg festEv)',/const festEvCard=rcpReg\("festEv"/],
 ['jworld.js',/^ /,'ROUTE','world window cards (meCons rows): worldCardK remakes from the window id',/const worldCardK=rcpReg\("world"/],
 ['jworld2.js',/^ /,'ROUTE','world batch-2 window cards: the same window layer (worldCardK)',/const worldCardK=rcpReg\("world"/],
 ['jworldc.js',/wcCard/,'ROUTE','composed world cards: wcCardK remakes from the window id',/const wcCardK=rcpReg\("wc"/],
 ['jeitem.js',/eitPilEvent/,'ROUTE','«Kẻ hầu ăn bớt»: eitPilCard (rcpReg eitPil) builds it',/const eitPilCard=rcpReg\("eitPil"/],
 ['jdc.js',/dcGateItem/,'ROUTE','«Y phục dự <tết>»: dcGateK (rcpReg dcGate) builds it',/const dcGateK=rcpReg\("dcGate"/],
 ['jstip.js',/stipEvent/,'ROUTE','Nội vụ phủ skim answers: merged into the stipend card (econStipCard, rcpReg stipCard); stipShow is only called merged (jecon)',/stipShow\(G,net,SK,1\)/],
 ['jrcv.js',/^ /,'ROUTE','RCVK receiver cards: queued as pid «rcvAsk» (PEND.rcvAsk) from S.rcvPend',/PEND\.rcvAsk=/],
 ['jpma.js',/^ /,'ROUTE','RCVK pmPlay / pmDuel: the same pid route (PEND.rcvAsk)',/PEND\.rcvAsk=/],
 ['j52.js',/nlCardM/,'ROUTE','identity card: ser() nl mark, the same card opens again on load',/d\.nl=\{seed:NLP\.seed\}/],
 ['j29.js',/hireCard/,'ACT','«Nội vụ phủ đưa người»: her tap on a [data-hire] row'],
 ['j41.js',/goTo/,'ACT','«không vào được»: her walk (goTo)'],
 ['j55.js',/tdAct/,'ACT','her Tông đường act (tdAct)'],
 ['j77.js',/j77Card|j77LastWalk|accEtqCard/,'ACT','her walk / place tap'],
 ['j83.js',/wkAsk|illAsk/,'ACT','her lesson / [data-ill] tap'],
 ['jclose.js',/cbGreetCard/,'ACT','her place tap (j77Tap)'],
 ['jcycle.js',/cyBook/,'ACT','her «Xem sổ nguyệt sự» act'],
 ['jeitem.js',/eitReDialog/,'ACT','her [data-eitre] tap'],
 ['jemoact.js',/eaScoldPick/,'ACT','her pick inside her own outburst card (same buổi)'],
 ['jgift.js',/giftE/,'ACT','her court act with the Emperor ([data-kmemp])'],
 ['jkiep.js',/kpGate/,'ACT','in front of her own choice (chooseM)'],
 ['jpromsv.js',/spOpen/,'ACT','her «Đề bạt» tap'],
 ['jrcp.js',/rcpTchAsk|rcpAskQ/,'ACT','her lesson / [data-rcpq] tap'],
 ['jreign.js',/rgSwitchOpen/,'ACT','her [data-rgsw] tap'],
 ['jtds.js',/tdsTchAsk|wkrMat/,'ACT','her lesson / craft'],
 ['jwkr.js',/wkrMat/,'ACT','her craft ([data-kwr])'],
 ['jts.js',/tsDenWish/,'ACT','her deck card «Thả đèn hoa đăng»'],
 ['jty.js',/goTo/,'ACT','her walk in trung y'],
 ['jwhy.js',/spyPick/,'ACT','her «Sai đi dò la» act'],
 ['jdh.js',/dhPick|dhPanel/,'PANEL','«Danh hiệu» panel she opens'],
 ['jerr.js',/errPanel/,'PANEL','errand panel she opens'],
 ['jge.js',/geBoardPanel/,'PANEL','«Thiên mệnh» board she opens'],
 ['jgoal.js',/kitGoalDetail/,'PANEL','goal detail she opens'],
 ['jload.js',/dlPanel/,'PANEL','look panel (spec.look)'],
 ['jmen.js',/menNtCard/,'PANEL','rule panel at a closed gate'],
 ['jnotice.js',/kitNoticeOpen/,'PANEL','«Tin báo» view (spec.view, never saved; its rows are NT.list = nt)'],
 ['jptime.js',/ptPanel|ptOrdOpen/,'PANEL','orders panel she opens (S.ordQ is on S)'],
 ['jts.js',/tsDangerPanel/,'PANEL','«Nguy hiểm chung» panel she opens'],
 ['j79.js',/kitPanel/,'KIT','kitPanel itself (its callers are counted at their own site)'],
 ['jts.js',/^tsPanel /,'KIT','tsPanel itself (its callers are counted at their own site)'],
 ['jksize.js',/kszLevels3|kitFrameLive3|kszSheet|kszSpecs3/,'KIT','kit frame internals / size-sheet samples'],
 ['jkitpage.js',/kitPopSample/,'KIT','kit sample page'],
 ['jcoopworld.js',/onAct|bribe/,'COOP','the friend\'s act arriving in a co-op room (no slot write)'],
 ['jcoopthin.js',/standIn/,'COOP','co-op thin card stand-in'],
 ['jagent.js',/^ /,'NOTCARD','the AG state object (opts = timing stats)'],
 ['jbancung.js',/^ /,'NOTCARD','BAL.banCung numbers'],
];
const CEN={sites:0,reg:0,cls:{},un:[]};
{const files=fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');const reg=new Set();
 const blank=s=>{let t='';let i=0;const n=s.length;
  while(i<n){const c=s[i];
   if(c==='/'&&s[i+1]==='*'){const e=s.indexOf('*/',i+2);const j=e<0?n:e+2;t+=s.slice(i,j).replace(/[^\n]/g,' ');i=j;continue}
   if(c==='/'&&s[i+1]==='/'&&/[;{}(,=\n]\s*$/.test(t.slice(-3))){const e=s.indexOf('\n',i);const j=e<0?n:e;t+=' '.repeat(j-i);i=j;continue}
   if(c==='"'||c==="'"){let j=i+1;while(j<n&&s[j]!==c){if(s[j]==='\\')j++;if(s[j]==='\n')break;j++}t+=c+s.slice(i+1,j).replace(/[^\n]/g,' ')+(s[j]||'');i=j+1;continue}
   if(c==='`'){let j=i+1,d=0;let buf='`';while(j<n){if(s[j]==='\\'){buf+='  ';j+=2;continue}if(d===0&&s[j]==='`')break;if(s[j]==='$'&&s[j+1]==='{'){d++;buf+='${';j+=2;continue}if(d>0&&s[j]==='{'){d++;buf+='{';j++;continue}if(d>0&&s[j]==='}'){d--;buf+='}';j++;continue}buf+=d>0?s[j]:(s[j]==='\n'?'\n':' ');j++}t+=buf+'`';i=j+1;continue}
   t+=c;i++}return t};
 const bal=(t,i)=>{let d=0;for(let j=i;j<t.length;j++){const c=t[j];if(c==='{'||c==='('||c==='[')d++;else if(c==='}'||c===')'||c===']'){d--;if(d===0)return j}}return t.length};
 for(const f of files){const s=fs.readFileSync(path.join(dir,f),'utf8');const t=blank(s);let q;
  const rr=/(?:const\s+|let\s+|window\.)?([\w$.\[\]]+)\s*=\s*rcpReg\(/g;while((q=rr.exec(t)))reg.add(f+':'+q[1].replace(/^window\./,''));
  const D=[];const fr=/(?:function\s+([\w$]+)\s*\(|([\w$.\[\]]+)\s*=\s*(function\b|\([^()]*\)\s*=>|[\w$]+\s*=>|rcpReg\())/g;let r;
  while((r=fr.exec(t))){const nm=(r[1]||r[2]).replace(/^window\./,'');let i=r.index+r[0].length;if(r[3]==='rcpReg('){D.push({n:nm,a:r.index,b:bal(t,i-1)});continue}
   if(r[1]||r[3]==='function'){i=t.indexOf('(',i-1);i=bal(t,i)+1}const j=t.slice(i).search(/[{(]/);if(j<0)continue;D.push({n:nm,a:r.index,b:bal(t,i+j)})}
  const re=/[{,]\s*opts\s*(:|[,}])/g;let m;
  while((m=re.exec(t))){let d=0,k;for(k=m.index;k>=0;k--){const c=t[k];if(c==='}'||c===')'||c===']')d++;else if(c==='{'||c==='('||c==='['){if(d===0&&c==='{')break;d--}}
   if(t[m.index]==='{')k=m.index;if(k<0)continue;const e=bal(t,k);const body=t.slice(k,e+1);
   let top='';{let dd=0;for(let i=0;i<body.length;i++){const c=body[i];if(c==='{'||c==='('||c==='[')dd++;else if(c==='}'||c===')'||c===']')dd--;else if(dd===1)top+=c;if(dd===1&&(c==='{'||c==='('||c==='['))top+=' '}}
   if(/(^|[,{\s])pid\s*:/.test(top))continue;
   const ob=body.slice(body.search(/\bopts\s*[:,}]/));const lit=/^opts\s*:\s*\[/.test(ob);
   if(lit){const fns=ob.replace(/go\s*:\s*\(\s*\)\s*=>\s*\{\s*\}/g,'').replace(/\$\{[^}]*\}/g,'');
    /* elements that are not object literals (opts:[o1,o2], opts:[tsOpt(…)]) are unknown = code (r4: jmood «Có người đến an ủi» hid as opts:[o1,o2]) */
    const a0=ob.indexOf('['),arr=ob.slice(a0+1,bal(ob,a0));let bare=arr,pr;do{pr=bare;bare=bare.replace(/\{[^{}]*\}/g,'')}while(bare!==pr);
    if(!/\bgo\s*:|=>|function\s*\(/.test(fns)&&!/[A-Za-z_$]/.test(bare))continue}
   const chain=D.filter(x=>x.a<=k&&k<=x.b).sort((x,y)=>x.a-y.a).map(x=>x.n);const line=s.slice(0,k).split('\n').length;
   const title=(s.slice(k,k+300).match(/\bt(?:itle)?\s*:\s*[`"']([^`"'\n]{0,36})/)||[])[1]||'';CEN.sites++;
   if(chain.some(n=>reg.has(f+':'+n))){CEN.reg++;continue}
   const key=chain.join('>')+' '+title;let c=CLASS.find(([cf,cr])=>cf===f&&cr.test(key));
   if(c&&c[3]==='ROUTE'&&c[4]&&!c[4].test(ALL))c=null;
   if(!c){CEN.un.push(`${f}:${line} ${chain.join('>')||'(table row)'} «${title}»`);continue}CEN.cls[c[2]]=(CEN.cls[c[2]]||0)+1}}
 CEN.gen=reg.size}
console.log(`code-card census: ${CEN.sites} sites with code options · ${CEN.reg} inside a registered generator (${CEN.gen} rcpReg) · ${Object.entries(CEN.cls).map(([k,v])=>k+' '+v).join(' · ')} · UNCLASSIFIED ${CEN.un.length}`);
for(const u of CEN.un)console.log('  UNCLASSIFIED code card (route it through rcpReg, or add a CLASS row with its reason):',u);
if(CEN.un.length)fail++;
console.log(fail?`UNSEEN-LISTS SCAN FAIL ${fail}`:`UNSEEN-LISTS SCAN PASS (${ROWS.length} lists, ${ROWS.filter(r=>r[3]==='UNSEEN').length} unseen-kind covered)`);process.exit(fail?1:0);
