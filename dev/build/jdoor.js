/* ================= jdoor: ONE FEATURE = ONE BUTTON on a person (act-merge J1, owner OD 26/11 ~07:25Z + ~07:32Z) =================
   Plan: dev/handover/reports/act-merge.md §2 G1–G11 (handover branch); dup-report doors P2/P3/P4 (review/dup-report HANHSU_MERGE §3.1).
   Owner (verbatim, ~07:32Z): "Tức là không phải là cái hành động nào cũng bắt buộc phải gộp đâu nha. Những cái nào mà cần phải để riêng đó, để cho game
   mình nó hay là bắt buộc phải để riêng thì vẫn cứ để riêng" → ONLY true duplicates fold into a door; every act the plan keeps (ĐỂ RIÊNG) stays a button.
   HOW (no act is rewritten, no number typed — law 4):
   (1) talkOpts (the outermost wrapper; loaded right after jdf) folds the options of ONE feature into ONE door option {door:k, open} placed where its first
       member stood. A door needs ≥ 2 members on that person today; a lone member stays a plain button. The raw list stays reachable by NEGATIVE keys:
       talkOpts(p)[-1-j] === raw[j] (array properties, not indexes: map / forEach / length never see them), so talk(-1-j) runs member j through the SAME
       talk() path (price, lock, roll, result card, co-op intent «talk» with a number, log sync) as the old button did.
   (2) a door tap opens the standard choice card (pushDil + PEND «door»: saveable, kit option rows via dilLine, ✕ = Thôi): one row per member with the
       member's own line (optLine: odds word · tốn · thành · hỏng) and its own lock / bạc / khắc reason. Opening costs nothing; the member pays as before.
   (3) the focus view (jdf/jdfv, BAL.df.on): a picked member plays the SAME on-figure game its button played (dfEng / DF_RULE / dfGame / dfStep), then runs.
   (4) two-way law (law 1): NPCs keep their own keys and button names (AGC3BTN unchanged); DOOR.of(name) maps any act name — hers or an NPC's — to the
       same door, and AGC3DOOR[key] = the door an NPC act sits in (role-parity / ag-par3 scans read the same names as before).
   Other jobs (J2 harm doors, J3 Hành sự) may add rows with DOOR.add({k,n,kinds,re,h}); ONE engine for every door. ===================================== */
const DOOR={raw:0,T:[]};window.DOOR=DOOR;
/* E-GAIN3-LIVE law 3 + law 11: ONE reading of «her regard / trust for someone» for every door gain filter (doorGain TG + filter, DOOR.TGT, the
   door-row-hint test): every pronoun form the game prints — «quý / tin / thương / nể / mến / kính» + «ngươi / ta / bổn cung / nàng», and «thiện cảm».
   Before only «quý ngươi / tin ngươi» were known, so LIVE's «nàng quý ta −−» (Bàn tán về <X>, the kit's ngươi→ta pass) read as Được. */
DOOR.REG=/(?:quý|tin|thương|nể|mến|kính)\s+(?:ngươi|ta|bổn cung|nàng)(?![\p{L}\d])|thiện cảm|quý nhau/u;
DOOR.HOST=/oán|ghen|thù|nghi|nắm|biết|đoán|khai/;/* hostility / knowledge words: never a harm that is her gain */
DOOR.add=function(r){if(r&&r.k&&r.re&&!DOOR.T.some(x=>x.k===r.k))DOOR.T.push(r);return DOOR};
/* the doors of the talk side (J1). n = the button; h = the line on top of the choice card; rep = the member whose picture / category the door shows */
[{k:"talk",n:"Trò chuyện",kinds:["rival","hh"],rep:"Hỏi han sức khỏe",h:"Chọn chuyện để nói với nàng.",
  re:/^(Hỏi han sức khỏe|Khen tài nghệ nàng|Bàn tán về |Chia sẻ bí mật|Thử lòng|Cảnh báo nàng|Rỉ tai chuyện trong cung|Nương theo|Tạ lỗi|Nhún nhường|Nhắc lại ân xưa)/},
 {k:"gh",n:"Giao hảo",kinds:["rival","hh"],rep:"Tặng quà",h:"Chọn cách kết thân với nàng.",
  re:/^(Kết giao|Tặng quà|Giúp đỡ nàng|Giúp chăm thú nuôi của nàng|Nhờ giúp đỡ|Mượn son phấn|Ghé chơi)/},
 {k:"play",n:"Cùng chơi / Thách đấu",kinds:["rival","hh"],rep:"Cùng chơi",h:"Chơi cho vui, hay đặt cược ngang giá.",re:/^(Cùng chơi|Thách đấu)/},
 {k:"hau",n:"Hầu chuyện",kinds:["emp"],rep:"Tâng bốc",h:"Chọn lời thưa với Hoàng thượng.",re:/^(Tâng bốc|Nói thật lòng|Bàn chuyện triều chính)$/},
 {k:"pho",n:"Phô tài",kinds:["emp"],rep:null,h:"Chọn môn để phô tài trước Hoàng thượng.",re:/^Phô tài/},
 {k:"so",n:"Xem sổ Kính sự phòng",kinds:["ksp"],rep:"Xem sổ thị tẩm",h:"Chọn sổ muốn xem, và cách xem.",re:/^(Xem sổ thị tẩm|Xem sổ nguyệt sự|Hầu chuyện, xem lén sổ nguyệt sự)/},
 {k:"dola",n:"Dò la tin tức",kinds:["serv","maid"],rep:"Sai đi dò la",h:"Nghe ngóng chung trong cung, hay sai đi dò la một người.",re:/^(Nghe ngóng chung|Sai đi dò la)$/}
].forEach(DOOR.add);
const doorTxt=h=>String(h==null?"":h).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
/* the door of one act name (her button or an NPC's AGC3BTN label), for a person kind (kind omitted = any) */
/* a row may carry fields of its owner (J2: cat, tiers, card keys …): DOOR keeps them; the talk fold reads only k, n, kinds (omitted = every kind), re, rep, h, tier */
DOOR.of=function(n,kind){const t=doorTxt(n);if(!t)return null;for(const r of DOOR.T)if(r.re&&(!kind||!r.kinds||r.kinds.includes(kind))&&r.re.test(t))return r;return null};
DOOR.byK=k=>DOOR.T.find(r=>r.k===k)||null;
DOOR.names=new Set();DOOR.T.forEach(r=>DOOR.names.add(r.n));
/* the raw option list of a person (every member as its own option), the one the fold reads */
function doorRaw(p){DOOR.raw++;try{return talkOpts(p)}finally{DOOR.raw--}}
window.doorRaw=doorRaw;
function doorFold(p,A){if(!p||!Array.isArray(A)||!A.length)return A;
 const R=A.map(a=>a&&!a.k61&&!a.door?DOOR.of(a.n,p.kind):null);const cnt={};R.forEach(r=>{if(r)cnt[r.k]=(cnt[r.k]||0)+1});
 const out=[],made={};
 /* J2 ext (c): a row's non-talk members (DOOR.more: her in-person acts) count toward the ≥ 2 rule and the lock */const xn=r=>r&&r.acts&&typeof DOOR.more==="function"?DOOR.more(p,r).length:0;
 A.forEach((a,j)=>{const r=R[j];if(!r||cnt[r.k]+xn(r)<2){out.push(a);return}
  if(!made[r.k]){const M=A.filter((x,i)=>R[i]===r);const free=M.filter(x=>!x.lock);
   const d={n:r.n,door:r.k,o:100,fix:1,act:M.every(x=>x&&x.act)?1:0,x:`chọn một trong ${M.length} việc: ${M.map(x=>doorTxt(x.n)).join(", ")}`,
    open:()=>doorOpen(p,r.k)};Object.defineProperty(d,"m",{value:M,enumerable:false});/* its members (tests, DOOR.flat) */
   const XM=r.acts&&typeof DOOR.more==="function"?DOOR.more(p,r):[];/* J2 ext (c) */
   if(!free.length&&!XM.some(x=>!x.off)){d.lock=true;d.t=M[0].t||(XM[0]&&XM[0].why)||"chưa làm được"}
   {const OL=x=>{if(!x||doorGain([x.x]))return x&&x.x;try{return optLine(x)}catch(e){return x.x}};/* E-GAIN3b: a way whose x names no gain (its gain sits in w / its «thành:»: Khiêu khích Danh +, Vu oan) is read from its OWN full line (optLine, the line its option card shows in doorOpen) */const dg=doorGain(free.concat(M.filter(x=>x.lock)).map(OL).concat(XM.filter(x=>!x.off).concat(XM.filter(x=>x.off)).map(x=>x.x)));if(dg)d.x+=" · "+dg}/* LAW 3 (E-GAIN3): the door's Được = its ways' main gains */
   made[r.k]=d;out.push(d)}});
 /* J2 ext (c): a door made only of her in-person acts (no talk member), at the end */for(const r of DOOR.T)if(r.acts&&!made[r.k]&&!cnt[r.k]&&(!r.kinds||r.kinds.includes(p.kind))&&xn(r)>=2){const XM=DOOR.more(p,r);const d={n:r.n,door:r.k,o:100,fix:1,x:"chọn mức và cách",open:()=>doorOpen(p,r.k)};{const dg=doorGain(XM.filter(x=>!x.off).concat(XM.filter(x=>x.off)).map(x=>x.x));if(dg)d.x+=" · "+dg}/* LAW 3 (E-GAIN3) */if(!XM.some(x=>!x.off)){d.lock=true;d.t=(XM[0]&&XM[0].why)||"chưa làm được"}made[r.k]=d;out.push(d)}
 A.forEach((a,j)=>{out[-1-j]=a});return out}
window.doorFold=doorFold;
/* (1) the outermost talkOpts wrapper */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(DOOR.raw>0)return A;try{return doorFold(p,A)}catch(e){console.error("jdoor fold",e);return A}}})();
/* lists built BY NAME from the raw options (Hành sự cards from the pop-up: directActs, adMaidCards) keep reading the raw list */
["directActs","adMaidCards"].forEach(f=>{if(typeof window[f]!=="function")return;const f0=window[f];window[f]=function(){DOOR.raw++;try{return f0.apply(this,arguments)}finally{DOOR.raw--}}});
/* (2) the door tap: opens the choice card, costs nothing (each member pays its own khắc / bạc when it runs) */
function doorWho(p){try{const v=p&&p.ref;if((p.kind==="rival"||p.kind==="hh")&&v&&v.id!=null)return["r",v.id];if(p.kind==="emp")return["e"];if(p.kind==="th")return["t"];if(p.kind==="maid")return["m"];if(p.kind==="ty")return["d"]}catch(e){}return null}
/* the person of a door card is held by WHO she is (the visit list can shift while the card is up: someone leaves, co-op refreshHere), never by a frozen index */
function doorPP(p,i,k){return{i,k,kind:p&&p.kind,rid:p&&p.ref&&p.ref.id!=null?p.ref.id:null,nm:p&&p.name||""}}
function doorIdx(pp){try{const P=curPeople();if(pp.kind==null)return pp.i;const f=x=>x&&x.kind===pp.kind&&(pp.rid!=null?!!x.ref&&x.ref.id===pp.rid:x.name===pp.nm);if(f(P[pp.i]))return pp.i;return P.findIndex(f)}catch(e){return -1}}
function doorOpen(p,k){const i=curPeople().indexOf(p);const pi=i>=0?i:popIdx;if(pi==null)return;const r=DOOR.byK(k);pushDil(mkP("door",doorPP(curPeople()[pi]||p,pi,k)),r?r.n:"Chọn việc");/* the card shows at once (render shows a queued card only on its own redraw path; the focus scene takes it in-scene, jdfv) *//* a door is HER tap inside the person view (jdayq (c): «a card she opens from inside the activity still shows»; the hidden pop-up button jdf clicks is not inside .kfoc, so the tap is marked as hers, as jdayq's own kitModal wrapper does) */
 try{const M=document.getElementById("modal");if(Q.length===1&&M&&M.hidden){const dq=typeof DQ==="object"&&DQ?DQ:null;if(dq)dq.user=(dq.user||0)+1;try{showModal()}finally{if(dq)dq.user--}}}catch(e){}}
window.doorOpen=doorOpen;
(function(){const t0=talk;talk=function(oi){try{if(typeof oi==="number"&&oi>=0&&popIdx!=null&&S&&S.visit&&!S.dead&&!Q.length){const p=curPeople()[popIdx];const a=p&&talkOpts(p)[oi];
  if(a&&a.door){if(a.lock||(S.visit.tk||{})[popIdx]||S.visit.talked===true)return;a.open();render();return}}}catch(e){console.error("jdoor talk",e)}return t0.apply(this,arguments)}})();
/* the choice card: one row per member, its own line and its own reason when it cannot be done now */
/* E-GAIN3c law 3 + law 11: the «Gợi ý» of EVERY door way row (both door paths: the talk door below and the J2 door, E-GAIN3b moved only the J2 one).
   The kit hint (kitHint, read-only) of the way itself; when that says «chẳng được gì / không được mất gì», the hint of its full line; when that too says
   nothing gained but the way's OWN line shows a real gain (doorGain: the card's green «Được»), that gain leads the hint and the kit's «nhưng …» part stays.
   Before: the talk-door rows had no hint → the kit read their marks line → «chẳng được gì» for Nương theo, Rỉ tai, Nghe ngóng chung, Phạt vô cớ, Đổi người. */
function doorHint(a,x){/* E-GAIN3-LIVE (E-GAIN3c-RV 6): no `a.hint` short-circuit — a way's own hint goes through the gate below (DOOR.rowHint → DOOR.hintGain) like every row */return lv=>{const NO=/^(chẳng được gì|không được mất gì)/;
  /* 1. the E-GAIN3b-FIX gate (DOOR.rowHint: the row's own line first; the way's own hint only when it names a REAL gain — never a need text, a tip, a stat she pays) */
  let h0="";try{h0=typeof DOOR==="object"&&DOOR.rowHint?DOOR.rowHint(a,x,lv):kitHint({x,o:a.o,c:a.c},null,lv).hint}catch(e){}if(h0&&!NO.test(h0))return h0;
  /* 2. nothing gained by the kit's reading, but the way's OWN line shows a green gain (doorGain = the card's «Được»): that gain leads */
  let g="";try{const d=document.createElement("div");d.innerHTML=doorGain([a.x||"",x||""].filter(Boolean),2).replace(/^được:\s*/,"");g=d.textContent.replace(/\s+/g," ").trim()}catch(e){}
  if(!g)return h0;/* the «nhưng …» part: the kit hint of the way WITHOUT its green gain pieces (else the kit's misread of the gain itself lands there) */
  let h3="";try{h3=kitHint({x:String(a.x||"").replace(/<span class="g">[\s\S]*?<\/span>/g,""),o:a.o,c:a.c,risk:a.risk},null,lv).hint}catch(e){}
  const rest=String(h3||"").replace(NO,"").replace(/^;\s*/,"");return rest?`${g}; ${rest}`:g}}
window.doorHint=doorHint;
PEND.door=pp=>{pp.i=doorIdx(pp);const p=curPeople()[pp.i];const r=DOOR.byK(pp.k);if(!p||!r||!S.visit)return null;let A;try{A=doorRaw(p)}catch(e){return null}
 const o=[];A.forEach((a,j)=>{if(!a||a.k61||a.door||DOOR.of(a.n,p.kind)!==r)return;const tc=talkK(a);const poor=!!(a.c&&a.c.bac&&S.bac+a.c.bac<0);
  const why=a.lock?doorTxt(a.t)||"chưa làm được":poor?"không đủ bạc":!can(tc)?(doorTxt(typeof whyTime==="function"?whyTime(tc):"")||"hết khắc buổi này"):"";
  let x="";try{x=optLine(a)}catch(e){}const tw=typeof r.tier==="function"?r.tier(a):"";/* KIT §7.1 (J0): a tier sits in the option TITLE «<việc> · nặng» */
  const row={n:tw?`${a.n} · ${tw}`:a.n,x:x||"chọn rồi xem kết quả ở bước sau",ton:tc?{khac:-tc}:null,hint:doorHint(a,x),go:()=>doorPick(pp,j,a.n)};if(why)row.off={why};o.push(row)});
 if(!o.length)return null;o.push({n:"Thôi"});
 const nm=(typeof k61Named!=="function"||!p.ref||k61Named(p.ref))?(p.name||""):"";
 const w=doorWho(p);let who=null;try{who=w&&typeof WHO==="function"?WHO(w):null}catch(e){}
 return{t:`${r.h}${nm?` <b>${nm}</b>`:""}`,o,who}};
/* (3) a picked member: the same road as its old button (talk with the raw key), through the focus game when the focus view is up */
function doorPick(pp,j,n){const i=typeof pp==="object"?doorIdx(pp):pp;if(i<0)return;popIdx=i;/* the raw list can be built in another order on the next call (a random topic / person): the member is found again by its NAME */
 try{const p=curPeople()[popIdx];const R=p?doorRaw(p):[];if(n!=null&&(!R[j]||R[j].n!==n)){const k=R.findIndex(a=>a&&a.n===n);if(k>=0)j=k}}catch(e){}const oi=-1-j;
 try{const fv=document.querySelector(".kfoc");if(typeof DF==="object"&&DF&&DF.F&&fv&&fv.getClientRects().length&&(typeof dfSame!=="function"||dfSame(DF.p,curPeople()[i]))&&typeof dfViewOn==="function"&&dfViewOn()&&doorFocus(i,j))return/* only while the person view is ON SCREEN */}catch(e){console.error("jdoor focus",e)}
 /* a card that arrived while the door card was up (a notice painted with it) waits behind her pick, as it would behind her old button tap */
 const keep=Q.length?Q.splice(0):[];try{talk(oi)}finally{if(keep.length){Q.push(...keep);try{render()}catch(e){}}}}
window.doorPick=doorPick;
function doorFocus(i,j){const F=DF.F;if(!F||DF.play||typeof dfGame!=="function"||typeof dfPlay!=="function")return false;const p=curPeople()[i];if(!p)return false;
 let a=null;try{a=doorRaw(p)[j]}catch(e){}if(!a)return false;const cls=typeof dfCls==="function"?dfCls(a):"C";const eng=typeof dfEng==="function"?dfEng(a.n):"words";
 const nm=doorTxt(a.n);const fake={n:nm,cls,eng};
 const run=res=>{const k=typeof dfHere==="function"?dfHere():i;if(k<0)return;popIdx=k;DF.step=typeof dfStep==="function"?dfStep(res):0;try{talk(-1-j)}finally{DF.step=0}try{dfAfter(fake,res)}catch(e){}};
 if(cls!=="A"){run();return true}/* sure / delegated / own-flow acts: no game, as on their old button */
 const layer=dfPlay(F,()=>{if(DF.play)DF.play.skip()},()=>{const h=DF.play;DF.play=null;if(h)h.destroy()});if(!layer){run();return true}
 const go=()=>{DF.play=dfGame(eng,{box:layer,fig:dfFigBox(F,layer),rank:typeof rkOf==="function"?rkOf(S):S.rank,at:/Ngáng chân/.test(nm)?"feet":null,hud:o=>dfHud(F,o),
  onDone:res=>{DF.play=null;dfUnplay(F);run(res)}});if(!DF.play){dfUnplay(F);run()}};
 DF.play={skip(){DF.play=null;dfUnplay(F);run({raw:null,skipped:true})},destroy(){}};
 const R=(typeof DF_RULE==="object"&&(DF_RULE[eng]||DF_RULE.words))||null;
 if(!R||!F.intro({title:R[0],rows:[["Việc",nm,"t"],["Chạm",R[1],"t"],["Được",R[2],"t"]],go:"Sẵn sàng",sub:"bắt đầu chơi",onGo:()=>{DF.play=null;go()}})){DF.play=null;go()}
 return true}
/* the door's picture + category = its representative member's (one picture per feature; same rule as jact's shared-door twins) */
function doorRep(n){const t=doorTxt(n);const L=DOOR.T.filter(x=>x.n===t);if(!L.length)return null;let k=null;try{const p=popIdx!=null&&curPeople()[popIdx];k=p&&p.kind}catch(e){}/* two jobs may name a door alike for different people (J5b srv «Giao hảo»): the row of the person in front wins */const r=(k&&L.find(x=>!x.kinds||x.kinds.includes(k)))||L[0];return r.rep||null}
if(typeof kitActArt==="function"){const k0=kitActArt;kitActArt=function(name){try{const m=doorRep(name);if(m)return k0.call(this,m)}catch(e){}return k0.apply(this,arguments)};window.kitActArt=kitActArt}
if(typeof kitActCat==="function"){const k0=kitActCat;kitActCat=function(name){try{const rc=DOOR.T.find(x=>x.n===doorTxt(name)&&x.cat);if(rc)return rc.cat;/* J2 ext: a harm door names its kit group */const m=doorRep(name);if(m)return k0.call(this,m)}catch(e){}return k0.apply(this,arguments)};window.kitActCat=kitActCat}
/* (4) two-way: the door an NPC act key sits in (her label of that key → DOOR.of) */
const AGC3DOOR={};try{for(const k in (window.AGC3BTN||{})){const r=DOOR.of(AGC3BTN[k]);if(r)AGC3DOOR[k]=r.n}}catch(e){}
window.AGC3DOOR=AGC3DOOR;
/* ---------- DECK / LIST HOOK (J5 roads: cung nữ Phận sự, lãnh cung, khuê các decks, srvTalk lists; any other list of act objects) ----------
   DOOR.fold(list, rows, o): the SAME fold rule on any list of act objects {n, …}: rows [{k, n, re, h, rep}] (regex on the act NAME → door);
   a door replaces its members where the first one stood when ≥ 2 members are AVAILABLE (not lock / off); a lone available member stays bare
   (with the locked twins dropped beside it only if o.dropLocked). The door object = o.mk ? o.mk(row, members) : {n, door:k, inner:1, k:cheapest khắc,
   x:"được: kết quả tùy việc chọn"} + o.extra; its members on d.m (non-enumerable). Opening it = o.open(row, members) (the deck's own pick card, e.g.
   DOOR.card below); each member then runs through the deck's own act()/runCard chain, paying its own khắc (the door pays nothing).
   DOOR.card(t, h, rows, who): the standard choice card (pushDil shape, kit option rows, ✕ = Thôi): rows [{n, x, off:{why}, go}] — not saveable (a deck
   is dealt again on load), use PEND «door» for talk lists.
   DOOR.flat(list): every door back to its members (tests); DOOR.find(list, name): the member of that name, in a door or bare. */
DOOR.fold=function(list,rows,o){o=o||{};if(!Array.isArray(list)||!Array.isArray(rows)||!rows.length)return list;const nm=a=>doorTxt(a&&a.n);
 const R=list.map(a=>{if(!a||a.door)return null;const t=nm(a);for(const r of rows)if(r&&r.re&&r.re.test(t))return r;return null});
 const ok=a=>!!a&&!a.lock&&!a.off;const cnt={};R.forEach((r,i)=>{if(r&&ok(list[i]))cnt[r.k]=(cnt[r.k]||0)+1});
 const out=[],made={};list.forEach((a,i)=>{const r=R[i];if(!r||(cnt[r.k]||0)<2){if(r&&o.dropLocked&&!ok(a)&&(cnt[r.k]||0)===1)return;out.push(a);return}
  if(made[r.k])return;const M=list.filter((x,j)=>R[j]===r);const ks=M.filter(ok).map(x=>typeof x.k==="number"?x.k:null).filter(x=>x!=null);
  const d=o.mk?o.mk(r,M):Object.assign({n:r.n,door:r.k,inner:1,o:100,x:"được: kết quả tùy việc chọn"},ks.length?{k:Math.min(...ks)}:{},o.extra||{});
  if(o.open&&!d.open)d.open=()=>o.open(r,M);Object.defineProperty(d,"m",{value:M,enumerable:false});made[r.k]=d;out.push(d)});return out};
DOOR.card=function(t,h,rows,who){const o=(rows||[]).map(r=>Object.assign({},r));o.push({n:"Thôi"});pushDil({t:h||"",o,who:who||null},t||"Chọn việc");try{const m=Q[Q.length-1];if(m)m.tabdoor=1}catch(e){}/* R11 (owner 27/11 ~06:42Z): a door launched from a tab is NOT an event — it stays the LIVE frame, never a Bàn bài hand / stage */
 try{const M=document.getElementById("modal");if(Q.length===1&&M&&M.hidden){const dq=typeof DQ==="object"&&DQ?DQ:null;if(dq)dq.user=(dq.user||0)+1;try{showModal()}finally{if(dq)dq.user--}}}catch(e){}};
DOOR.flat=list=>Array.isArray(list)?[].concat(...list.map(a=>a&&a.m?a.m:[a])):list;/* list doors (d.m); deck doors never enter the deck (display only) */
DOOR.find=(list,name)=>(DOOR.flat(list)||[]).find(a=>a&&doorTxt(a.n)===name)||null;
/* ================= DECK doors — ONE path for every deck (act-merge J1 owner of the engine; MAIN 158 RV-ACT-MERGE F2: was built 3×) =================
   Roads: hs = Hành sự (consort life), srv = cung nữ Phận sự, cold = lãnh cung (S.out), kc = khuê các. Rows (registered by the deck's job):
     DOOR.deck({k, n, roads:[…], h, re | key(card, deckList) → door name | null})  — re names the door n; key() names it per group (letters by person, twins …).
   RULE (same as the talk side): only true duplicates fold; a door shows when ≥ 2 of its ways are DEALT today (a greyed way shows greyed inside, with its reason);
   a lone way stays its own card. DISPLAY ONLY: the deck keeps every original card object (filters, co-op deck sync, exam drops, AD_DOOR stamps untouched);
   the door is drawn at render from the dealt cards (cardH, kit card) and its choice card is DOOR.card (kit option rows: khắc · tốn · thành · hỏng, the
   card's own reason when it cannot be done); a picked way runs the SAME act(i) as a tap on its old card, in its own task. No number typed (law 4).
   Tests: DOOR.run(name) = act() of the card of that name; DOOR.deckDoors() = the doors on the panel now [{n, k, ways:[names], free:[names]}]. */
DOOR.D=[];DOOR.deck=function(r){if(r&&r.k&&r.roads&&(r.re||r.key)&&!DOOR.D.some(x=>x.k===r.k))DOOR.D.push(r);return DOOR};
DOOR.road=function(){try{if(typeof isKc==="function"&&isKc())return"kc";if(typeof isSrv==="function"&&isSrv())return(S.srv&&S.srv.lau>0)?null:"srv";if(S.out)return"cold";return"hs"}catch(e){return null}};
(function(){const DART={};
 const nm=a=>doorTxt(a&&a.n);
 function keyOf(a,L,R){for(const r of R){const k=r.key?r.key(a,L):(r.re.test(nm(a))?r.n:null);if(k)return[k,r]}return null}
 function lineOf(a){const sp=String(a.x||"").split(/ · kèm: /);const ton=[`${cardCost(a)} khắc`];try{const c=fmt(a.c||{});if(c)ton.push(c)}catch(e){}
  let gain="";try{gain=[fmt(a.w||{}),sp[0]].filter(Boolean).join(" · ")}catch(e){}const P=["tốn: "+ton.join(" · "),"thành: "+(gain||doorTxt(a.t)||"")];if(sp[1])P.push("kèm: "+sp[1]);
  const rolled=a.o!=null&&a.o<100&&!a.lock;if(rolled){let f="";try{f=[fmt(a.l||{}),typeof a.lx==="string"?a.lx:""].filter(Boolean).join(" · ")}catch(e){}P.push("hỏng: "+(f||"không mất gì"))}return P.join(" · ")}
 function whyOf(a,dis){if(!dis)return"";let w="";try{w=cardWhy(a)}catch(e){}return doorTxt(w)||doorTxt(a.lock&&a.t)||"chưa làm được lúc này"}
 function build(){const road=DOOR.road();if(!road||typeof tab==="undefined"||!S||S.dead)return;const R=DOOR.D.filter(r=>r.roads.includes(road));if(!R.length)return;
  const P=document.getElementById("panel");if(!P||!Array.isArray(deck))return;
  /* every deck card drawn on the panel (cardH: button.kcard[data-i]) — the Hành sự grid, and on the khuê các road the cards a family / friend / letter section
     lists on its own tab (J5b G13); one door per key on the panel, placed where its first way stood */
  const grp=new Map();
  for(const b of P.querySelectorAll("button.kcard[data-i]")){const a=deck[+b.dataset.i];if(!a||b.closest("[data-ddoor]"))continue;const kr=keyOf(a,deck,R);if(!kr)continue;const [k,r]=kr;
   const host=P;/* one door per key on the panel: the kit panes wrap cards one by one (kpanec), so siblings are not a list; the door stands where its first way stood */let hm=grp.get(host);if(!hm){hm=new Map();grp.set(host,hm)}if(!hm.has(k))hm.set(k,{k,r,mem:[]});hm.get(k).mem.push(b)}
  for(const hm of grp.values())for(const g of hm.values()){if(g.mem.length<2)continue;
   const W=g.mem.map(b=>({i:+b.dataset.i,dis:!!(b.disabled||b.classList.contains("kdis"))}));const ok=W.filter(w=>!w.dis);const lead=deck[(ok[0]||W[0]).i];DART[g.k]=lead.n;
   const o={n:g.k,t:g.r.h||"",k:Math.min(...(ok.length?ok:W).map(w=>cardCost(deck[w.i]))),c:{},w:{},x:W.map(w=>String(deck[w.i].n).split(", ")[0]).join(" · "),dom:lead.dom,lock:!ok.length};
   try{const Ro=ok.map(w=>deck[w.i]).filter(a=>a.o!=null&&a.o<100);if(ok.length&&Ro.length===ok.length)o.o=Math.max(...Ro.map(a=>a.o))}catch(e){}/* every usable way rolls: the best way's odds; a sure way keeps the sure look */
   const tp=document.createElement("template");tp.innerHTML=cardH(o,W[0].i).trim();const b=tp.content.querySelector("button");if(!b)continue;
   b.removeAttribute("data-i");b.dataset.ddoor=g.k;b.dataset.ddh=g.r.h||"";b.dataset.ddi=W.map(w=>w.i).join(",");b.dataset.ddx=W.map(w=>w.dis?0:1).join(",");
   b.querySelectorAll("[data-kinfo]").forEach(e=>e.remove());if(!ok.length)b.disabled=true;g.mem[0].before(b);g.mem.forEach(m=>m.remove())}}
 function open(b){if(!S||S.dead||Q.length)return;const I=b.dataset.ddi.split(",").map(Number),X=b.dataset.ddx.split(",").map(Number);
  const rows=I.map((i,j)=>{const a=deck[i];if(!a)return null;const o={n:a.n,x:lineOf(a),ddoor:1,go:()=>{setTimeout(()=>{try{act(i)}catch(e){console.error("jdoor deck way",e)}},0)}};/* its OWN task, like a tap on its old card (no dialog-choice context wraps it) */
   try{if(a.o!=null&&a.o<100&&!a.lock)o.p=optOdds(a)}catch(e){}const w=whyOf(a,!X[j]);if(w)o.off={why:w};return o}).filter(Boolean);
  let who=null;try{who=typeof pMe==="function"?pMe():null}catch(e){}/* RV F4: her own act → her figure speaks, like every self-act door */
  DOOR.card(b.dataset.ddoor,b.dataset.ddh,rows,who)}
 DOOR.deckDoors=()=>[...document.querySelectorAll("#panel button[data-ddoor]")].map(b=>{const I=b.dataset.ddi.split(",").map(Number),X=b.dataset.ddx.split(",").map(Number);return{n:b.dataset.ddoor,ways:I.map(i=>deck[i]&&deck[i].n),free:I.filter((i,j)=>X[j]).map(i=>deck[i]&&deck[i].n)}});
 DOOR.refold=build;/* a panel drawn outside renderPanel (a pager, a section switch) folds again */
 DOOR.run=n=>{const i=Array.isArray(deck)?deck.findIndex(a=>a&&a.n===n):-1;if(i<0)return false;act(i);return true};
 if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{build()}catch(e){console.error("jdoor deck",e)}return r};window.renderPanel=renderPanel}
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#panel button[data-ddoor]");if(!b)return;e.stopPropagation();e.preventDefault();if(b.disabled)return;try{open(b)}catch(x){console.error("jdoor deck open",x)}},true);
 /* a greyed door says why each way is closed (the kit popover, as a greyed card does) */
 document.addEventListener("pointerup",e=>{try{const b=e.target.closest&&e.target.closest("#panel .kcard[disabled][data-ddoor]");if(!b||typeof kpPop!=="function"||!S||S.dead)return;
  const I=b.dataset.ddi.split(",").map(Number);const rows=I.map(i=>{const a=deck[i];return a?`<span class="ef n">${a.n}: ${whyOf(a,1)}</span>`:""}).join("");
  window.__adGreyT=Date.now();window.__adGreyR=b.getBoundingClientRect();kpPop(b,`<div class="kpopt">${(b.querySelector(".kan")||{}).textContent||""}</div><div class="kpopx">${rows}</div>`,{inside:true})}catch(x){}},true);
 /* the way's own act logs its own line (as when it was a card): the door card adds no «Door: way» line */
 if(typeof logChoice==="function"){const l0=logChoice;logChoice=function(m){if(m&&m.opts&&m.opts.some(o=>o&&o.ddoor))return;return l0.apply(this,arguments)}}
 if(typeof kitActArt==="function"){const k0=kitActArt;kitActArt=function(name){try{const d=DART[name];if(d){const A=(typeof KIT_ACTS==="object"&&KIT_ACTS.acts)||{};if(!A[name]&&A[d])return k0.call(this,d)}}catch(e){}return k0.apply(this,arguments)};window.kitActArt=kitActArt}
})();
/* ================= J2 ext (act-merge J2, harm / scheme / accuse doors P5–P14; plan review/act-merge §2 G1–G3, dup-report HANHSU_MERGE §3.1 + §3.4) =================
   The SAME engine (rows in DOOR.T, DOOR.of, PEND «door», doorFold, doorPick) with four optional row fields, ignored by rows that do not carry them:
     acts  = members that are ACT keys, not talk options: {a:[ACT keys on the Hậu cung card / her in-person acts], e:[Quyền Hoàng hậu keys]}
             (member ids: "t:<talk option name>", "a:<ACT key>", "e:<empAct key>")
     tiers = {id:"nhẹ"|"vừa"|"nặng"} — the tier is said in the option title «<name> · <tier>» (KIT §7.1 J0: no tier header) and orders the rows
     roll  = [[rep, …rolls]] — the tier offers ONE act, picked among the group's members that can run now, fixed per target and buổi (§3.4 «roll»)
     hide  = [ids] folded into another way, never a row (spyk «Tự đi dò la» → «sai người», MAIN 153 per OD ~05:35Z)
     cat   = the kit group of the door button (KIT_CAT key)
   Card mode: PEND «door» {r:<rivals index>, k} takes its members from DOOR.cardM (jdf.js: the Hậu cung card buttons, each runs its old click path);
   the pop-up {i, k} takes the talk members (doorPick, as J1) + DOOR.more (jdf.js: her in-person acts, run through doAct). Two-way: DOOR.ofKey(k)
   = the door + tier of an ACT key, for her acts and NPC deeds alike (jagharm haDoor). Rows add no number (law 4): each row shows its old button's line. */
[{k:"P5",n:"Dò la",cat:"muu-ke",kinds:["rival","hh","card"],rep:"Dò la",h:"Chọn cách dò la nàng.",re:/^(Dò la|Nghe lén câu chuyện)$/,acts:{a:["spy","bribe","bribel","spyk"]},hide:["a:spyk"]},
 {k:"P6",n:"Khiêu khích",cat:"giao-thiep",kinds:["rival","hh"],rep:"Khiêu khích",h:"Chọn lời nói thẳng trước mặt nàng.",re:/^(Khoe quà ngự ban|Khiêu khích|Trút giận|Hạ nhục)$/,acts:{},
  tiers:{"t:Khoe quà ngự ban":"nhẹ","t:Khiêu khích":"vừa","t:Trút giận":"vừa","t:Hạ nhục":"nặng"}},
 {k:"P7",n:"Hãm hại",cat:"hai-nguoi",kinds:["rival","hh","card"],rep:"Hạ độc",h:"Chọn mức và cách hãm hại nàng.",re:/^(Hạ độc|Ngáng chân|Đẩy xuống hồ sen)$/,
  acts:{a:["tea","nuoc","ink","trip","huydung","rash","thathu","poison","slowpoison","pgift","pushp"]},
  chT:["t:Ngáng chân","t:Hạ độc","t:Đẩy xuống hồ sen"],
  roll:[["a:tea","a:nuoc","a:ink","a:trip","t:Ngáng chân"],["a:huydung","a:rash"]]},
 {k:"P8",n:"Hạ uy thế",cat:"muu-ke",kinds:["rival","hh","card"],rep:"Tung tin đồn",h:"Chọn mức và cách hạ uy thế nàng.",re:/^(Tung tin đồn|Vu oan)$/,
  acts:{a:["rumor","block","blockf","lygian","frame","plant","giahoa","xinhh"]},
  chT:["t:Tung tin đồn","t:Vu oan"],tiers0:{"a:xinhh":"nặng"}},
 {k:"P9",n:"Hại hoàng tự",cat:"hai-nguoi",kinds:["rival","hh","card"],rep:"Hạ độc con nàng",h:"Chọn mức và cách hại con nàng.",re:/^Đẩy con nàng xuống hồ$/,
  acts:{a:["ksab","musk","kframe","kpoison","catswap","pond"]},
  chT:["t:Đẩy con nàng xuống hồ"]},
 {k:"P10",n:"Lấy của",cat:"hai-nguoi",kinds:["card"],rep:"Sai người lấy trộm đồ",h:"Chọn mức và cách lấy của nàng.",re:/^$/,
  acts:{a:["batnat","laydo","laydol","petsteal","thaopet","phonghoa"]},chT:[]},
 {k:"P11",n:"Tố cáo",cat:"muu-ke",kinds:["rival","hh","card"],rep:"Tố giác",h:"Chọn tội để tố.",re:/^(Tố xa xỉ|Hặc ăn mặc sai phẩm)$/,
  acts:{a:["accuse","xx","vp"]}},/* split-merge B1: ONE «Tố giác» (accuse; listener by chTo) + the two visible-fault reports */
 {k:"P12",n:"Mặc cả chứng cứ",cat:"muu-ke",kinds:["card"],rep:"Uy hiếp đòi bạc",h:"Chọn cách dùng chứng cứ đang nắm.",re:/^$/,acts:{a:["uyhiep","banphe"]}},/* split-merge B2: «Trả chứng cứ lấy lòng» folded away */
 {k:"P13",n:"Quyền Hoàng hậu",cat:"trung-phat",kinds:["card"],rep:"Xử tội",h:"Chọn việc xử phân với nàng.",re:/^$/,acts:{e:["judge","conf","reward","pardon","cutpay"],a:["takeaway"]}},
 {k:"P14",n:"Ra uy",cat:"trung-phat",kinds:["rival","hh","card"],rep:"Phạt quỳ",h:"Chọn cách ra uy với nàng.",re:/^$/,acts:{a:["tat","phatquy"]},tiers:{"a:tat":"nhẹ","a:phatquy":"vừa"}}
].forEach(DOOR.add);
DOOR.names=new Set();DOOR.T.forEach(r=>DOOR.names.add(r.n));
DOOR.TIER=["nhẹ","vừa","nặng"];
/* split-merge P3 (law 4 one core): the weight of a harm / scheme door member (P7–P10, rows with chT) is READ from BAL.charge (deed → charge → C[c].tier), the same
   weight the charge, the punishment and the cover trace use — never a second typed table. chT = the talk members (t:<name>) with the deed they are; tiers0 = a
   member that is no crime (no BAL.charge.deed key) keeps its own tier. */
DOOR.CHT={"t:Ngáng chân":"trip","t:Hạ độc":"poison","t:Đẩy xuống hồ sen":"pushp","t:Tung tin đồn":"rumor","t:Vu oan":"frame","t:Đẩy con nàng xuống hồ":"pond"};
DOOR.chTier=function(id){const k=DOOR.CHT[id]||(id.slice(0,2)==="a:"?id.slice(2):null);const B=typeof BAL==="object"&&BAL.charge;const c=k&&B&&B.deed[k];const C=c&&B.C[c];return C?{nhe:"nhẹ",vua:"vừa",nang:"nặng",tu:"nặng"}[C.tier]||null:null};
for(const r of DOOR.T)if(r.chT){const L=(r.acts.a||[]).map(k=>"a:"+k).concat(r.chT);Object.defineProperty(r,"tiers",{configurable:true,enumerable:true,get(){const o={};for(const id of L){const t=DOOR.chTier(id)||(r.tiers0||{})[id];if(t)o[id]=t}return o}})}
/* the row + tier + role of a member id */
DOOR.ofId=function(id){for(const r of DOOR.T){if(!r.acts)continue;const [t,x]=[id.slice(0,1),id.slice(2)];
 const inR=t==="t"?r.re.test(x):((r.acts[t]||[]).includes(x));if(!inR)continue;const roll=(r.roll||[]).find(g=>g.includes(id));
 return {r,tier:(r.tiers||{})[id]||null,role:(r.hide||[]).includes(id)?"hide":roll?(roll[0]===id?"rep":"roll"):"way"}}return null};
/* two-way (law 1): an ACT key's door + tier, hers and an NPC's */
DOOR.ofKey=function(k){const m=DOOR.ofId("a:"+k);return m?{k:m.r.k,n:m.r.n,tier:m.tier,role:m.role}:null};
/* ONE act per roll group: among the members that can run now, fixed per target and buổi (no re-roll by a redraw) */
DOOR.pickRoll=function(L,seed){const ok=L.filter(x=>!x.off);const P=ok.length?ok:L.slice(0,1);if(P.length<2)return P[0]||null;let h=0;for(const c of String(seed))h=(h*31+c.charCodeAt(0))|0;return P[Math.abs(h)%P.length]};
/* the rows of a J2 door from its members [{id, n, x, off, go}]: hide / roll / tier title / order */
DOOR.rowsJ2=function(r,M,v){const out=[];const seen=new Set();const seed=[S.turn||0,S.buoi||0,v&&v.id,r.k].join(":");
 for(const g of r.roll||[]){const L=M.filter(m=>g.includes(m.id));if(!L.length)continue;L.forEach(m=>seen.add(m.id));const one=DOOR.pickRoll(L,seed+":"+g[0]);if(one)out.push(one)}
 for(const m of M)if(!seen.has(m.id)&&!(r.hide||[]).includes(m.id))out.push(m);
 const T=(r.tiers||{}),ti=m=>{const t=T[m.id];return t?DOOR.TIER.indexOf(t):-1};
 return out.map((m,j)=>({m,j})).sort((a,b)=>(ti(a.m)-ti(b.m))||(a.j-b.j)).map(({m})=>{const t=T[m.id];const row={n:t?`${m.n} · ${t}`:m.n,x:m.x||"chọn rồi xem kết quả ở bước sau",go:m.go};if(m.hint)row.hint=m.hint;if(m.c)Object.defineProperty(row,"__c",{value:m.c,enumerable:false});/* the way's price (tests: a stat she pays is no gain) */if(m.off)row.off={why:m.why||"chưa làm được"};return row})};
/* E-GAIN3b-FIX (law 3, reviewer FAIL 1): the hint of a pop-up door-dialog row. FIRST the row's own line (kitHint of {n, x = optLine}: what the row
   always showed); only when that says nothing gained («chẳng được gì» / «không được mất gì» / empty: Khoe quà ngự ban, Khiêu khích, Vu oan, Dò la) the
   way's own hint (its fx / BAL numbers / a.hint), or the hint of its full data, and ONLY when it names a REAL gain (DOOR.hintGain). A need text
   («cần nguyên cớ …»), a tip («có … thì khỏi …») or a stat she PAYS («Danh» of Hạ nhục) is never shown as a gain. */
DOOR.HINT_NO=/^(chẳng được gì|không được mất gì)/;
DOOR.HINT_STAT={"Sủng":"sung","Danh":"danh","Đức":"duc","Bạc":"bac","Sức":"suc","Tâm cơ":"tamco"};
DOOR.hintGain=function(h,c){const g=String(h||"").split("; ")[0];if(!g||DOOR.HINT_NO.test(g))return false;
 return g.split(/,\s+/).some(p=>{p=p.trim();if(/^cần\b|^có .* thì\b|\bthì khỏi\b/.test(p))return false;
  const m=p.match(/^(\S+(?: \S+)?)\s(\+{1,3})$/);if(m&&!/\snàng$/.test(m[1])){const k=DOOR.HINT_STAT[m[1]];return !(k&&c&&(c[k]||0)<0)}/* «Danh +» she pays for = no gain */
  return /(^|\s)nàng(\s|$)/.test(p)&&!DOOR.REG.test(p)&&!DOOR.HOST.test(p)&&/(−|mất|trúng|ngã|bị|giảm|quở|phạt|quỳ|bẽ)/.test(p)})};/* E-GAIN3-LIVE: «nàng quý ta −» is her regard falling, never a harm to the target; a harm to the target («Danh nàng −−», «nàng bị quở …») */
/* a row line that is already kit HTML (optLine of a way drawn as rows: «Hạ nhục», «Nghe lén câu chuyện») read as a labelled text line, so the hint
   never glues the row heads («Danh nàng −−Bạichỉ uổng công…»). The Tốn row is left out (the hint names the price beyond Tốn); a Mất / Bại / Kèm piece
   whose subject is the TARGET and that harms her («Danh nàng −−») is the gain (same reading as doorGain). */
DOOR.TGT=p=>/^(\S+ )?nàng\s/.test(p)&&!DOOR.HOST.test(p)&&!DOOR.REG.test(p)&&!/quý/.test(p)&&/(−|mất|trúng|ngã|bị|giảm|quở|phạt|quỳ|bẽ)/.test(p);
DOOR.lineOf=function(x){x=String(x||"");const at=x.search(/<span class="kb"/);if(at<0||!/class="kr[ "]/.test(x))return x;
 const d=document.createElement("div");d.innerHTML=x.slice(at);const T=e=>e.textContent.replace(/\s+/g," ").trim();const B={thành:[],hỏng:[],kèm:[]};
 const pre=x.slice(0,at).replace(/<[^>]*>/g,"").replace(/[\s·]+$/,"").trim();const od=pre||T(d.querySelector(".kodds")||document.createElement("i"));
 d.querySelectorAll(".kr").forEach(r=>{const l=T(r.querySelector(".krl")||r).toLowerCase();const k=/^(thành|được|thắng)/.test(l)?"thành":/^(bại|mất|hỏng)/.test(l)?"hỏng":/^kèm/.test(l)?"kèm":null;if(!k)return;
  if(/^bại/.test(l)&&!od)return;/* a «Bại» with no odds word cannot be read as a roll: the hint leaves it out (as the row's line always did) */
  [...r.querySelectorAll(".krv .ef")].map(T).join(", ").split(/,\s+/).filter(Boolean).forEach(p=>{let z=k;if(k!=="thành"&&DOOR.TGT(p))z="thành";else if(k==="thành"&&od&&!DOOR.TGT(p)){try{if(kitHintSign(p,"thành")<0)z="kèm"}catch(e){}}B[z].push(p)})});/* a price inside a rolled «Thành» («thiện cảm −−−» of Khiêu khích) stays named in the hint («nhưng …») */
 return [od].concat(Object.keys(B).filter(k=>B[k].length).map(k=>k+": "+B[k].join("; "))).filter(Boolean).join(" · ")};/* «; » keeps each kit piece its own item (marks hold no digit) */
DOOR.rowHint=function(a,x,lv){x=DOOR.lineOf(x);let h0="";try{h0=kitHint({n:a.n,x},null,lv).hint}catch(e){}if(h0&&!DOOR.HINT_NO.test(h0))return h0;
 for(const f of [()=>kitHint(a,null,lv).hint,()=>kitHint({x,o:a.o,c:a.c},null,lv).hint]){let h="";try{h=f()}catch(e){}if(DOOR.hintGain(h,a.c))return h}return h0};
(function(){const P0=PEND.door;PEND.door=pp=>{const r=DOOR.byK(pp&&pp.k);if(!r||!r.acts)return P0(pp);let M=[],v=null,who=null,nm="";
 if(pp.r!=null){v=typeof rivals!=="undefined"?rivals[pp.r]:null;if(!v||typeof DOOR.cardM!=="function")return null;M=DOOR.cardM(pp.r,r);nm=v.name;try{who=typeof WHO==="function"?WHO(["r",v.id]):null}catch(e){}}
 else{if(pp.kind!=null)pp.i=doorIdx(pp);const p=curPeople()[pp.i];if(!p||!S.visit)return null;v=p.ref;let A=[];try{A=doorRaw(p)}catch(e){return null}
  A.forEach((a,j)=>{if(!a||a.k61||a.door||DOOR.of(a.n,p.kind)!==r)return;const tc=talkK(a);const poor=!!(a.c&&a.c.bac&&S.bac+a.c.bac<0);
   const why=a.lock?doorTxt(a.t)||"chưa làm được":poor?"không đủ bạc":!can(tc)?(doorTxt(typeof whyTime==="function"?whyTime(tc):"")||"hết khắc buổi này"):"";
   let x="";try{x=optLine(a)}catch(e){}M.push({id:"t:"+doorTxt(a.n),n:a.n,x,c:a.c,hint:doorHint(a,x)/* E-GAIN3b-FIX law 3 (DOOR.rowHint: base hint first, the way's own hint only when it names a real gain) + E-GAIN3c doorHint (both door paths) */,off:!!why,why,go:()=>doorPick(pp,j,a.n)})});
  if(typeof DOOR.more==="function")M=M.concat(DOOR.more(p,r));nm=(typeof k61Named!=="function"||!p.ref||k61Named(p.ref))?(p.name||""):"";
  const w=doorWho(p);try{who=w&&typeof WHO==="function"?WHO(w):null}catch(e){}}
 const o=DOOR.rowsJ2(r,M,v);if(!o.length)return null;o.push({n:"Thôi"});return{t:`${r.h}${nm?` <b>${nm}</b>`:""}`,o,who}}})();
/* LAW 3 «Được» of a DOOR card (E-GAIN3, MAIN 171 / KK54 census): a door card (the ways sit inside its dialog) shows what opening it gets her = the
   MAIN gain of each way, read from that way's OWN line (the same kit parse its option card uses, so every number is the way's BAL number, law 4).
   lines = the ways' lines, usable ways first; returns «được: <g>a</g>; <g>b</g>» (at most `max` gains, one per way, deduplicated) or "".
   A one-word piece of a split list («Văn» of «Văn, Đức, Võ tăng …») is not a gain by itself; a band mark keeps no decimal tail («++,5» → «++»). Each way gives its FIRST gain (a way whose first gain is already listed adds nothing). Skipped: a risk («có thể …», «khả năng …», KA_RISK), a line that says nothing (KA_NOTHING), the shared runner side gain «Chủ tin với …», a paid «Chứng cứ n», «… không đổi». */
function doorGain(lines,max){max=max||3;const seen=new Set(),G=[];const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 for(const x of lines||[]){if(!x||G.length>=max)continue;let h="";try{h=kitParse(String(x))}catch(e){continue}const d=document.createElement("div");d.innerHTML=h;
  const TG=e=>{const t=e.textContent.replace(/\s+/g," ").trim();return /^(nàng|Sắc nàng|Danh nàng|Sủng nàng|Sức nàng)\s/.test(t)&&!DOOR.HOST.test(t)&&!DOOR.REG.test(t)};/* E-GAIN3b: a door built from card buttons reads their plain text (no writer class): a «thành» / «kèm» piece whose subject is the TARGET («nàng quỳ phạt: Sức −−») and that is no hostility / risk is her gain */const c=[...d.querySelectorAll(".kr-duoc .ef, .kr-thanh .ef.g")].concat([...d.querySelectorAll(".kr-thanh .ef:not(.g), .kr-kem .ef")].filter(TG))/* E-GAIN3b: in a rolled «Thành» row only the green pieces are her gain (a red «thiện cảm −−−» there is a loss) */.map(e=>e.textContent.replace(/\s+/g," ").trim().split(/\s+—\s+|\s*\(/)[0].replace(/([+−-]+),\d+/g,"$1").replace(/[\s,;:·]+$/,"")).map(t=>{/* E-GAIN3b: a piece «Danh +, thiện cảm −−−, oán ta ++» keeps only its leading gains (the kit sentence colour, j63 kaSent, read-only) */if(typeof kaSent!=="function"||!/,\s/.test(t))return t;const F=t.split(/,\s+/);if(/(^|\s)nàng(\s|$)/.test(F[0]))return t;/* a list about HER (the target: «nàng bị quở: Đức −−, Danh −−») is all gain */let n=0;while(n<F.length&&kaSent(F[n])!=="r")n++;return n&&n<F.length?F.slice(0,n).join(", "):t})
   .filter(t=>t&&/\S\s+\S/.test(t)&&!(typeof KA_NOTHING!=="undefined"&&KA_NOTHING.test(t))&&!/^không( |$)/i.test(t)&&!/^Chủ tin với /.test(t)&&!new RegExp("(?:"+DOOR.REG.source+")\\s*[−-]","u").test(t)&&!/(?:oán|ghét|thù|ghen)\s+(?:ngươi|ta|bổn cung)\s*\+/u.test(t)/* E-GAIN3-LIVE: every pronoun form (DOOR.REG); «oán ta +» is a loss too *//* E-GAIN3b: «nàng quý ngươi −−» is her LOSS (the kit colours it green: KIT REQUEST 27/11 E-GAIN3b #3) */&&!/^Chứng cứ \d/.test(t)&&!/không đổi/.test(t)&&!/(^|\s)(có thể|khả năng)(\s|$)/.test(t)&&!(typeof KA_RISK!=="undefined"&&KA_RISK.test(t)));
  const t=c[0];if(t&&!seen.has(t)){seen.add(t);G.push(t)}}
 return G.length?"được: "+G.map(t=>`<span class="g">${E(t)}</span>`).join("; "):""}
window.doorGain=doorGain;
