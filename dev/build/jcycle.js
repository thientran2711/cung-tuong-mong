/* ================= jcycle: KỲ NGUYỆT SỰ · the monthly cycle + the Kính sự phòng cycle book (owner 15/11 ~20:25Z, review/cycle) =================
   1. EVERY WOMAN has her own cycle (her, every consort, the co-op friend entry): a pure function of her name (cyBase) + the month index
      (small monthly jitter), so old saves need nothing, and host / guest of a co-op room compute the same days for everyone.
      TIME MODEL (as jmcal): a month = 3 tuần (1–10 thượng, 11–20 trung, 21–30 hạ); her cycle = 5–7 days inside ONE tuần (cyBase.t).
      No cycle while truly pregnant (preg && !fake) or from age 50 (đã dứt kỳ).
   2. THE NIGHT FLIP: during her cycle tuần her card is out of the flip (nightCh → 0), however favoured; she cannot steal a night
      (Tranh sủng / Chặn ngự giá, NPC stealNight), the "Thắp đèn hầu rượu" option of the late visit and the ksp tablet card are locked
      with the reason, and nightWhy rows get the reason "đang kỳ nguyệt sự". Her week starts with a kitLine notice + Sổ ghi line.
   3. THE BOOK (sổ nguyệt sự, kept by Kính sự phòng from the palace mamas' reports): what each woman REPORTED this month and last
      (days / chưa tới kỳ / không báo / đã dứt kỳ) + her nights this month. A truly pregnant woman stops reporting (unless her report is
      forged: her own S.cyb.hide, a clever rival's cyHide). Reading it (Kính sự phòng, Tổng quản: two roads, bạc ↔ khắc + Sức + risk):
      - a rival who stopped reporting → note + she KNOWS (S.cyKnow) → "Bỏ xạ hương" becomes possible against that hidden pregnancy;
      - a rival whose pregnancy does not fit the book (pregMismatch, tư thông) → chứng cứ +2 (once per pregnancy);
      - a rival who "is pregnant" but still reports (fake) → chứng cứ +1;
      - a false "không báo" written against HER by a rival (S.cyb.rum) → option to have it corrected (rumour cancelled, chứng cứ on the forger).
   4. HER FORGERIES (deck cards, two roads each): hide a hidden pregnancy behind false reports ("Sửa sổ nguyệt sự" bạc / "Dặn ma ma báo
      ngày giả" Đức + ma ma's loyalty); a non-bạc twin of j22 "Hối lộ Kính sự phòng sửa sổ" (pregMismatch): "Khai lùi ngày nguyệt sự".
   5. NPCs (monthly, per player, monthPay hook): a hostile rival may read the book and guess her hidden pregnancy (then may plot musk),
      or forge a "không báo" against her (rumour; if not corrected → "mừng hụt" next month: Sủng / Danh down); world-level rival-vs-rival
      reading in rivalsMonth (host only in co-op).
   6. (review r2, owner 16/11) the book is also two HÀNH SỰ deck cards "Xem sổ nguyệt sự" (bạc) / "Xem lén sổ nguyệt sự" (Sức + risk), same
      numbers as the Kính sự phòng talk cards (kept there as a shortcut); and every month when her cycle tuần starts a pop-up (her maid,
      kit dialog + option cards via c6) asks: báo đúng / báo lùi / báo sớm / giấu — see BAL.cyc.rep. The week's flip waits for her answer.
   API: cycleDaysOf(person, month[, ahead]) → [days 1..30] of that calendar month (1..12; next occurrence from now, or `ahead` months
        ahead), [] = no cycle expected. cycleLate(person) → number of cycles truly missed (0 = not late). cycOn(person) → in her cycle tuần.
   Numbers: BAL.cyc. No kit part of its own: kitModal/kitFacts/kitChip/kitLine, act cards (talkOpts, deck), j75 lock pattern. ===== */
(function(){
if(typeof BAL==="object")BAL.cyc={
 read:[10,14,18,24,31,41,54,70],  /* bạc road "Xem sổ nguyệt sự" by rank (≈ 1/4 of BAL.pay[rank]; review r1: 1/8 made the free road a dead pick); 1 khắc, sure */
 peekSuc:4,peekO:50,peekAf:1,peekTc:4, /* her road (2 khắc): Sức lost; odds = peekO + thiện cảm of the Tổng quản × peekAf + Tâm cơ / peekTc */
 peekDanh:2,peekAfLoss:2,          /* caught peeking: Danh lost, Tổng quản thiện cảm lost */
 hide:[12,16,20,28,36,48,64,84],   /* bạc road "Sửa sổ nguyệt sự" (hide her hidden pregnancy) by rank (≈ 1/3 of pay); odds hideO */
 hideO:80,hideDuc:4,hideMaid:2,hideMaidO:35, /* her road: Đức lost; odds = hideMaidO + ma ma's loyalty / hideMaid (review r1: base 25 → 35, a loyal ma ma beats the bribe) */
 backDuc:6,backO:35,backTc:3,      /* "Khai lùi ngày nguyệt sự" (non-bạc twin of j22's 80-bạc bribe): Đức, odds base + Tâm cơ / backTc + loyalty/5 */
 backDanh:3,                       /* its failure: Danh lost (and the Tổng quản knows: S.ksKnows) */
 foeHost:50,npcRead:12,npcForge:4,forgeBac:30, /* NPC: hostility that makes a foe; monthly % she reads the book / forges a "không báo"; bạc it costs */
 rumSung:3,rumDanh:2,              /* uncorrected false "không báo": Sủng / Danh lost next month (mừng hụt) */
 fixAf:20,rvRead:6,rvHideTc:60,rvHide:40, /* correction names the forger when the Tổng quản's thiện cảm ≥ fixAf; rival-vs-rival monthly %; clever rival hides */
 /* MONTHLY REPORT pop-up (owner 16/11, review/cycle-r2): her maid asks how to report the cycle to Kính sự phòng.
    báo đúng: sure, card off this tuần. báo lùi: odds = "Khai lùi" (backO + Tâm cơ/backTc + loyalty/5), Đức -luiDuc, card off this tuần AND
    next tuần's flip × luiNext; a pregnancy begun within luiCover tuần after it reads one missed cycle later (foes, thái y) and its dates fit a
    real night (pregMismatch cleared like "Khai lùi"); fail = Danh -backDanh + the Tổng quản knows (S.ksKnows), as "Khai lùi".
    báo sớm: Đức -somDuc, card stays on the tray; giấu: free, card stays, the book says "không báo" (palace ghen +giauGhen; no real pregnancy
    by the month's end → mừng hụt rumSung/rumDanh, the same as a rival's forged "không báo"). Both lies: flipped during the cycle → the
    Kính sự phòng mama checks: passes with lieO + loyalty/lieLoyal + Tâm cơ/lieTc, caught = Sủng -lieSung, Danh -lieDanh, night lost, S.ksKnows;
    and the false line is FORGERY EVIDENCE: at the month's end each foe reading the book (npcRead) gets chứng cứ +1 on her. */
 rep:{luiDuc:2,luiNext:.5,luiCover:3,somDuc:3,giauGhen:4,lieO:50,lieLoyal:4,lieTc:5,lieSung:6,lieDanh:4},
 /* FERTILE WINDOW (owner 16/11 s9, D57 review/preg-rate, option 4 = 1+3): conception per night × by where the night falls in HER TRUE cycle
    (not what she reported): peak = the tuần after her cycle tuần (≈ 10–17 days after it starts), low = the tuần before it, cyc = her cycle
    tuần itself (a tryst / stolen night). No cycle (age ≥ 50, pregnant) → × 1. The base itself was doubled in BAL.conc (jbal.js). */
 fert:{peak:1.6,low:.5,cyc:.1}};
const B=()=>(typeof BAL==="object"&&BAL.cyc)||{};
const cl_=(x,a,b)=>Math.max(a,Math.min(b,x));
function cyH(s){s=String(s==null?"":s);let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h>>>0}
function cyName(p){return p===S?(S.name||"ta"):(p&&p.name)||""}
function cyBase(p){const h=cyH("cyc|"+cyName(p));return{t:h%3,o:1+((h>>>3)%4),l:5+((h>>>7)%3)}}
/* days (1..30) of month index mi (S.turn based) */
function cyDaysM(p,mi){const b=cyBase(p);const j=(cyH("cyj|"+cyName(p)+"|"+mi)%3)-1;const o=cl_(b.o+j,1,11-b.l);const d0=b.t*10+o;const L=[];for(let i=0;i<b.l;i++)L.push(d0+i);return L}
function cyAge(p){return p===S?(S.age||18):(p&&p.age)||20}
function cyPreg(p){return !!(p&&p.preg&&!p.fake)}
function cyCur(){return S&&S.turn!=null?S.turn:0}
/* does she have a cycle in month index mi (relative to now; only now/future are known for pregnancy) */
function cyHas(p,mi){if(!p)return false;if(cyAge(p)>=50)return false;if(cyPreg(p)){const left=9-(p.preg||0);if(mi-cyCur()<=left)return false}return true}
function cycOn(p){try{if(!S||!p)return false;if(p===S&&typeof isSrv==="function"&&isSrv())return false;return cyHas(p,cyCur())&&(S.tuan||0)===cyBase(p).t}catch(e){return false}}
/* cycles truly missed since conception (counts cycle tuần passed after the conception week, up to now) */
function cycleLate(p){try{p=p||S;if(!cyPreg(p)||cyAge(p)>=50||p.pregWk==null)return 0;const W=wk(),m0=W-(S.tuan||0),t=cyBase(p).t;let n=0;
 for(let k=0;k<12;k++){const w=m0-3*k+t;if(w<=p.pregWk)break;if(w<=W)n++}return n}catch(e){return 0}}
/* calendar: month m (1..12) → days in its next occurrence (or `ahead` months ahead) */
function cycleDaysOf(p,m,ahead){try{p=p||S;if(!S)return[];let o=ahead!=null?+ahead:((+m-(S.month||1))%12+12)%12;if(!(o>=0))o=0;const mi=cyCur()+o;return cyHas(p,mi)?cyDaysM(p,mi):[]}catch(e){return[]}}
/* the TRAY (Kính sự phòng's view): her card is off while in her cycle tuần, unless she reported falsely this tuần (báo sớm / giấu) */
function cyTray(p){if(!cycOn(p))return false;const c=cybOf(p);if(c&&c.lie===wk())return false;return true}
/* co-op (review/coop-b1b5-fix): the OTHER player's entry carries her own report too — her S.cyb, relayed at once by jcoopworld (ctm-p2
   "cyb", COOPW.fcyb) and in her blob after every merge — so the host's flip, nightCh, the book and the rivals read ONE fact (OD:L96):
   her "báo sớm / giấu" keeps her card on the host's tray, her "báo lùi" halves her next flip and makes the book read late, her
   "Sửa sổ" hides her pregnancy from the host's rivals, her "giấu" / a forged line shows as "không báo" in the other player's book.
   null = an NPC (no report of her own; the book follows the truth / cyHideOf's clever-rival rule). */
function cybOf(p){if(p===S)return S.cyb||{};if(p&&p.coop&&window.COOPW&&typeof COOPW.fcyb==="function")try{return COOPW.fcyb()||{}}catch(e){}return null}
const CYK=["lie","lieM","back","rk","rv","df","hide","rum","giauM"];
/* what jcoopworld relays: this week's flags + whether her maid's card is still waiting for her answer (the host's flip waits for it) */
function cyRec(){const c=S&&S.cyb||{},o={};for(const k of CYK)if(c[k]!==undefined)o[k]=c[k];const w=wk();return{w,c:o,pend:c.df===w&&c.rk!==w}}
window.cyRec=cyRec;window.cyWk=()=>wk();
/* lateness as the BOOK shows it: a pregnancy begun within luiCover tuần after a "báo lùi" reads one cycle later (foes, thái y) */
function cyLateSeen(p){p=p||S;const n=cycleLate(p);return n&&cyCover(p)?Math.max(0,n-1):n}
window.cyNoFriend=(f)=>cyNoFriend(f);window.cycleDaysOf=cycleDaysOf;window.cycleLate=cyLateSeen;window.cycleLateTrue=cycleLate;window.cyTray=cyTray;window.cycOn=cycOn;window.cyBase=cyBase;window.cyAge=cyAge;
function cyb(){S.cyb=S.cyb||{};return S.cyb}
const TU=["thượng tuần","trung tuần","hạ tuần"];
function dName(L){if(!L.length)return"";const a=L[0],b=L[L.length-1];return `${a<=10?"mồng ":"ngày "}${a}\u2060–\u2060${b}`}
const RSN="Đang kỳ nguyệt sự, thẻ bài tạm cất, không tiện hầu giá";

/* ---------- 2. the flip: off the tray during her cycle tuần ---------- */
const nc0=nightCh;nightCh=function(p){const c=nc0.apply(this,arguments);try{if(c&&cyTray(p||S))return 0;const q=p||S,k=cybOf(q);if(c&&k&&k.back!=null&&wk()-k.back===1)return c*((B().rep||{}).luiNext||.5)}catch(e){}return c};
const sn0=stealNight;stealNight=function(a){if(a&&cyTray(a))return "";return sn0.apply(this,arguments)};
for(const k of ["steal","road"]){const A0=typeof ACT==="object"&&ACT[k];if(!A0)continue;const ok0=A0.ok;A0.ok=function(a){if(a&&cyTray(a))return false;return ok0.apply(this,arguments)}}
if(typeof LACK==="object")for(const k of ["steal","road"]){const l0=LACK[k];LACK[k]=function(){if(cyTray(S))return RSN;return l0?l0.apply(this,arguments):""}}
const ns0=nightScene;nightScene=function(){if(cyTray(S)){log(`${RSN}.`);if(S.tonight==="me")S.tonight=null;return}
 /* she lied to the book (báo sớm / giấu) and is called during her cycle: the Kính sự phòng mama checks before the sedan comes */
 try{if(cycOn(S)){const c=cyb(),R=B().rep||{};if(c.lie===wk()&&c.lck!==wk()){c.lck=wk();const po=cyLieO();
   if(!roll(po)){const b=S.sung,d=S.danh;apply({sung:-R.lieSung,danh:-R.lieDanh});S.ksKnows=1;if(S.tonight==="me")S.tonight=null;
    const t=`Ma ma Kính sự phòng soát người trước khi lên kiệu, thấy ngươi đang kỳ nguyệt sự mà sổ ghi khác: tội khai man. Đêm nay mất, Sủng ${b} → ${S.sung}, Danh ${d} → ${S.danh}; Tổng quản biết chuyện của ngươi.`;
    log(t);try{Q.push({t:"Kính sự phòng",who:typeof pEunCourt==="function"?pEunCourt("ksp"):null,h:`<p>${t}</p>`})}catch(e){}return}
   log("Ma ma Kính sự phòng soát người qua loa, không nhận ra điều gì.")}}}catch(e){console.error(e)}
 return ns0.apply(this,arguments)};
function cyLieO(){const R=B().rep||{},loyal=(S.maid&&S.maid.loyal)||50;return cl_(Math.round(R.lieO+loyal/R.lieLoyal+(S.tamco||0)/R.lieTc),5,95)}
function lockCyc(id,re){const p0=PEND[id];if(!p0)return;PEND[id]=function(){const d=p0.apply(this,arguments);try{if(d&&d.o){const o=d.o.find(o=>re.test(o.n||""));if(o){const lk0=o.lk;o.lk=()=>cyTray(S)?RSN:(typeof lk0==="function"?lk0():"")}}}catch(e){}return d}}
lockCyc("ksp",/^Tắm gội chờ giá/);lockCyc("empnight",/^Thắp đèn hầu rượu/);
const fl0=flip;flip=function(){const r=fl0.apply(this,arguments);try{if(!S||S.dead)return r;
  const d=S.nightWhy;if(d&&d.wk===wk()&&Array.isArray(d.rows))for(const row of d.rows){const p=row.id==="me"?S:(rivals||[]).find(v=>v.id===row.id);if(p&&cyTray(p)&&!(row.reasons||[]).some(x=>x.k==="cyc"))(row.reasons=row.reasons||[]).push({k:"cyc",t:"đang kỳ nguyệt sự",pub:p===S})}
  if(typeof isSrv==="function"&&isSrv())return r;const c=cyb();
  if(cycOn(S)&&c.nt!==wk()){c.nt=wk();const k=c.rk===wk()?c.rv:"";log(k==="som"||k==="giau"?"Kỳ nguyệt sự đã đến, mà sổ Kính sự phòng ghi khác: thẻ bài của ngươi vẫn nằm trên khay.":"Kỳ nguyệt sự đã đến: tuần này Kính sự phòng tạm cất thẻ bài của ngươi.")}
  else if(cyPreg(S)&&S.pregUnk&&(S.tuan||0)===cyBase(S).t&&cycleLate(S)>=1&&c.lt!==wk()){c.lt=wk();log("Tuần này đáng lẽ tới kỳ nguyệt sự, mà chưa thấy.")}
 }catch(e){console.error(e)}return r};
/* ---------- 7. FERTILE WINDOW (D57): conceiveCh × BAL.cyc.fert by her cycle phase this tuần; one notice when her peak tuần starts ---------- */
function cyPhase(p){try{p=p||S;if(!S||!p||!cyHas(p,cyCur()))return"";const d=(((S.tuan||0)-cyBase(p).t)%3+3)%3;return d===1?"peak":d===0?"cyc":"low"}catch(e){return""}}
window.cyPhase=cyPhase;
const cc0=conceiveCh;conceiveCh=function(p){const c=cc0.apply(this,arguments);try{const h=cyPhase(p||S),F=B().fert||{};if(h&&F[h]!=null)return Math.round(c*F[h])}catch(e){}return c};
/* a tryst / affair (trystCh, jbal): the BAL.trystC floor/cap bound the chance BEFORE the cycle factor, so her cycle tuần stays near nil and the peak still rises */
trystCh=function(p){p=p||S;const T=BAL.trystC,v=cl_(cc0(p),T[0],T[1]);try{const h=cyPhase(p),F=B().fert||{};if(h&&F[h]!=null)return Math.min(T[1],Math.round(v*F[h]))}catch(e){}return v};
const flF=flip;flip=function(){const r=flF.apply(this,arguments);try{if(!S||S.dead||(typeof isSrv==="function"&&isSrv()))return r;const c=cyb();
  if(!S.preg&&cyPhase(S)==="peak"&&c.ft!==wk()){c.ft=wk();let w="";try{w=chanceLvl(conceiveCh(S))}catch(e){}log(`Ma ma dặn nhỏ: qua kỳ nguyệt sự chừng mươi ngày, tuần này là lúc dễ đậu thai nhất${w?` (có thai mỗi lần thị tẩm: ${w})`:""}.`)}
 }catch(e){console.error(e)}return r};
/* Tranh sủng / Chặn ngự giá deck cards (j75 getters): closed with the reason during her cycle */
const dl0=deal;deal=function(){const r=dl0.apply(this,arguments);try{if(!S||!Array.isArray(deck))return r;
  for(const a of deck){if(!a||!(a.n==="Tranh sủng"||a.n==="Chặn ngự giá")||a.__cyc)continue;a.__cyc=1;
   const lD=Object.getOwnPropertyDescriptor(a,"lock"),tD=Object.getOwnPropertyDescriptor(a,"t");const lg=lD&&lD.get?lD.get:(()=>lD&&lD.value),tg=tD&&tD.get?tD.get:(()=>tD&&tD.value);
   Object.defineProperty(a,"lock",{get:()=>cyTray(S)||!!lg.call(a),set:()=>{},enumerable:true,configurable:true});
   Object.defineProperty(a,"t",{get:()=>cyTray(S)?RSN:tg.call(a),set:()=>{},enumerable:true,configurable:true})}
  cyDeck()}catch(e){console.error(e)}return r};

/* ---------- 2b. THE MONTHLY REPORT (owner 16/11): when her cycle tuần starts, her maid asks how to report it to Kính sự phòng.
   The week's flip waits for the answer (flip() is called again from the option), so a false report really puts her card back on the tray. ---------- */
function cyAsk(){if(!S||S.dead||S.out||(typeof isSrv==="function"&&isSrv())||!S.maid)return false;if(!cycOn(S))return false;const c=cyb();if(c.rk===wk()||c.df===wk())return false;
 if(typeof PEND!=="object"||typeof pushDil!=="function")return false;
 /* review r3: never on the first screen of a new life (start() runs flip right after "Nhập cung"): that week the maid reports truly */
 if(Array.isArray(Q)&&Q.some(m=>m&&m.t==="Nhập cung")){c.rk=wk();c.rv="dung";return false}
 c.df=wk();pushDil(mkP("cyrep"),"Kỳ nguyệt sự");return true}
PEND.cyrep=()=>{if(!S||!S.maid||!cycOn(S))return null;const R=B().rep,c=cyb(),loyal=S.maid.loyal||50,po=cyLieO(),
  lo=cl_(od(B().backO+Math.round((S.tamco||0)/B().backTc)+Math.round(loyal/5)),5,95),xg=S.rank>=7?"Hoàng hậu nương nương":S.rank>=3?"nương nương":"tiểu chủ";
 const done=k=>{c.rk=wk();c.rv=k;try{cyNoFriend(flip)}catch(e){console.error(e)}try{render()}catch(e){}};
 const mk=(n,s,k,pre)=>{const o=c6(n,s);const g=o.go;o.go=()=>{try{if(pre)pre()}catch(e){console.error(e)}g();done(k)};return o};
 const risk=`được lật thẻ mà bị ma ma soát ra (${chanceW(100-po)}): mất đêm ấy, Sủng -${R.lieSung} Danh -${R.lieDanh}`,evi="kẻ thù tra sổ có thể nắm chứng cứ";
 const lie=k=>()=>{c.lie=wk();c.lieM=cyCur();c.lieEv=0;if(k==="giau"){c.giauM=cyCur();c.rum={by:"me",m:cyCur(),self:1};try{ghenAll(R.giauGhen)}catch(e){}}};
 /* the option card is a palace-event card (kit hidden-outcome mode, KIT 28.6): Tốn row + one truthful HINT + risk chip; the hint names the
    odds word of the one rolled road and every risk in words; the full numbers come on the result card. (Full Được/Mất/Kèm rows overflow
    the kit option card in a scrolling dialog: KIT REQUEST in PROGRESS_cycle.md.) */
 const H=[["sổ ghi đúng, không ai bắt bẻ được; nhưng thẻ bài tạm cất tuần này","an toàn"], /* review r3: hints shortened to fit the kit option card at 755 (KIT REQUEST K11 aside); giấu now names the evidence risk too */
  [`${word(lo).toLowerCase()}; có thai thì người ngoài muộn đoán ra; tổn Đức, tuần sau khó được lật thẻ; hỏng thì Tổng quản biết`,"có rủi ro"],
  [`thẻ bài vẫn trên khay; tổn Đức; bị ma ma soát ra (${chanceW(100-po)}) thì mất sủng; kẻ thù có thể nắm chứng cứ`,"có rủi ro"],
  [`thẻ bài vẫn trên khay; cả cung đồn có tin vui, không có thai thì mừng hụt; bị soát ra thì mất sủng; kẻ thù có thể nắm chứng cứ`,"liều"]];
 const O=[
  mk("Báo đúng ngày",{wt:[G6("sổ ghi đúng")],k:["thẻ bài tạm cất tuần này"],wl:"Ma ma báo đúng ngày; Kính sự phòng tạm cất thẻ bài của ngươi tuần này."},"dung"),
  mk("Báo lùi vài hôm",{c:{duc:-R.luiDuc},p:lo,wt:[G6("nếu sắp có thai: ngày khớp đêm thị tẩm"),G6("người ngoài muộn một tháng mới đoán ra")],l:{danh:-B().backDanh},lt:[R6("Tổng quản biết chuyện của ngươi")],
    k:["thẻ bài tạm cất tuần này và khó được lật tuần sau","thái y cũng muộn nhận ra tin vui"],ok:()=>{c.back=wk();return "Ma ma báo lùi vài hôm; sổ ghi kỳ của ngươi muộn hơn thật."},no:()=>{S.ksKnows=1;return "Tổng quản thấy ngày ma ma báo lệch với tháng trước; hắn biết chuyện của ngươi."}},"lui"),
  mk("Báo sớm, nói đã sạch kỳ",{c:{duc:-R.somDuc},wt:[G6("thẻ bài vẫn nằm trên khay")],k:[risk,evi],wl:"Ma ma báo kỳ của ngươi đã qua; thẻ bài vẫn nằm trên khay."},"som",lie("som")),
  mk("Giấu, không báo",{wt:[G6("thẻ bài vẫn nằm trên khay")],k:[`cả cung đồn có tin vui: phi tần ghen +${R.giauGhen}`,`cuối tháng chưa có thai thì mừng hụt: Sủng -${B().rumSung} Danh -${B().rumDanh}`,risk,evi],
    wl:"Ma ma không lên Kính sự phòng báo kỳ; trong cung bắt đầu xì xào ngươi có tin vui."},"giau",lie("giau"))];
 O.forEach((o,i)=>{o.hint=H[i][0];o.risk=H[i][1]});
 return{who:pMaid(),t:`<p>${S.maid.name} khẽ thưa: “Kỳ nguyệt sự của ${xg} đã tới (${dName(cyDaysM(S,cyCur()))}). Nô tỳ lên Kính sự phòng báo thế nào ạ?”</p><p class="past">Kính sự phòng ghi sổ theo lời ma ma các cung báo lên; ai đang kỳ thì thẻ bài tạm cất.</p>`,o:O}};
/* co-op (review r3): the deferred flip runs outside endTurn's withoutFriend (jcoopworld), so take the friend entry out here too:
   otherwise the Emperor could "pick" the other player's card in MY world (rivalNight would then write Sủng/thai deltas into her row) */
function cyNoFriend(f){if(!(window.COOPW&&COOPW.on)||COOPW.tnShared/* reviewer r2: jcoopworld B2 (one host-drawn night, friend in the host deck, guest draws nothing) */||!Array.isArray(rivals))return f();const out=[];for(let i=rivals.length-1;i>=0;i--)if(rivals[i]&&rivals[i].coop)out.push([i,rivals.splice(i,1)[0]]);
 try{return f()}finally{for(const [i,v] of out.reverse())if(!rivals.includes(v))rivals.splice(Math.min(i,rivals.length),0,v)}}
/* act-card tab (KIT_ACT_CATS data line, as jexam does): the cycle-book cards are intel / forgery = "Mưu kế", not the default "Giao thiệp" */
try{if(typeof KIT_ACT_CATS!=="undefined"&&Array.isArray(KIT_ACT_CATS))KIT_ACT_CATS.unshift(["muu-ke",/nguyệt sự|báo ngày giả|xem sổ/i])}catch(e){}
const fl1=flip;flip=function(){try{if(cyAsk()){S.tonight=null;return}}catch(e){console.error(e)}return fl1.apply(this,arguments)};
/* never answered (closed, reloaded): the week ends with the true report */
const et0=endTurn;endTurn=function(){try{const c=S&&S.cyb;if(c&&!(typeof Q!=="undefined"&&Q.length)&&c.df===wk()&&c.rk!==wk()){c.rk=wk();c.rv="dung"}}catch(e){}return et0.apply(this,arguments)};

/* ---------- 3. the book ---------- */
function cyHideOf(p){const k=p===S?cyb():cybOf(p);if(k){const h=k.hide;return !!(h&&p.preg&&h===p.pregWk)}
 if(!p.preg||p.fake||p.pregWk==null)return false;return (p.tamco||0)>=B().rvHideTc&&cyH("cyh|"+p.id+"|"+p.pregWk)%100<B().rvHide}
/* what the book says for p in month offset k (0 = this month, -1 = last month) */
function cyRep(p,k){const mi=cyCur()+k,t=cyBase(p).t;if(cyAge(p)>=50)return{s:"old"};
 const k0=cybOf(p),rum=k0&&k0.rum;if(rum&&rum.m===mi&&k===0&&!rum.fixed)return{s:"miss",forged:1};
 if(k===0&&(S.tuan||0)<t)return{s:"wait",t};
 /* truly pregnant at that month's cycle week? */
 const cw=wk()-(S.tuan||0)+3*k+t;const preg=cyPreg(p)&&p.pregWk!=null&&cw>p.pregWk;
 if(preg&&k0&&cyCover(p)&&cw-p.pregWk<=((B().rep||{}).luiCover||3))return{s:"ok",d:cyDaysM(p,mi)}; /* báo lùi: the first missed cycle still reads as reported (late) */
 if(preg&&!cyHideOf(p))return{s:"miss"};return{s:"ok",d:cyDaysM(p,mi),fake:!!(p.preg&&p.fake)}}
/* evidence-truth (main, jtruth): evidence only for a real wrong in the ledger; write the deed first, announce what evA really gave */
function cyDeed(p,id,k,x){try{if(typeof deedOnce==="function")deedOnce(p,id,k,1,x)}catch(e){}}
function cyCover(p){p=p||S;const c=cybOf(p);return !!c&&c.back!=null&&p.pregWk!=null&&p.pregWk-c.back>=0&&p.pregWk-c.back<=((B().rep||{}).luiCover||3)}
function cyRepText(r){if(r.s==="old")return kitChip("đã dứt kỳ","n");if(r.s==="wait")return `chưa tới kỳ (${TU[r.t]})`;if(r.s==="miss")return kitChip("không báo","r");return `đã báo, ${dName(r.d)}`}
function cyNights(p){const m0=wk()-(S.tuan||0);return (p.nightLog||[]).filter(w=>w>=m0&&w<=wk()).length}
function cyBook(how){const c=cyb();c.read=cyCur();const F=[];const L=consorts().filter(p=>p===S||(p.alive&&!p.out));S.cyKnow=S.cyKnow||{};let found=[];
 for(const p of L){const a=cyRep(p,0),b=cyRep(p,-1);const n=cyNights(p);
  F.push({who:p,kind:p===S?"me":"person",text:`${p===S?"Ta":p.name}: tháng này ${cyRepText(a)} · tháng trước: ${cyRepText(b)}${n?` · ${n} đêm thị tẩm`:""}`});
  if(p===S)continue;
  if(a.s==="miss"||b.s==="miss"){if(cyPreg(p)&&S.cyKnow[p.id]!==p.pregWk){S.cyKnow[p.id]=p.pregWk;try{noteAdd(p.id,"Sổ nguyệt sự: tháng này không báo; e là đã có tin vui")}catch(e){}found.push(`${p.name} tháng này không báo nguyệt sự: e là đã có tin vui.`)}}
  if(p.preg&&p.pregMismatch&&!p.fake&&p.cyEvi!==p.pregWk){p.cyEvi=p.pregWk;const g=evA(S,p,2);if(g){try{noteAdd(p.id,`Sổ nguyệt sự: ngày nàng ta có thai không khớp đêm thị tẩm nào (chứng cứ +${g})`)}catch(e){}found.push(`Ngày ${p.name} có thai không khớp đêm thị tẩm nào trong sổ: chứng cứ +${g}.`)}}
  if(p.preg&&p.fake&&a.s==="ok"&&p.cyEvi!=="f"+p.pregWk){p.cyEvi="f"+p.pregWk;cyDeed(p,"cyfk:"+p.pregWk,"cyfake","báo có thai giả mà ma ma cung ấy vẫn báo nguyệt sự");const g=evA(S,p,1);if(g)found.push(`${p.name} báo có thai mà ma ma cung ấy vẫn báo nguyệt sự: chứng cứ +${g}.`)}}
 const opts=[];const rum=c.rum;
 if(rum&&rum.m===cyCur()&&!rum.fixed&&!rum.self){const fx=rum;opts.push({n:"Xin Kính sự phòng chép lại cho đúng",fx:{},x:`sổ ghi đúng, tin đồn tắt · biết kẻ sửa sổ: ${typeof chanceW==="function"?chanceW(((S.court&&S.court.ksp&&S.court.ksp.af.me)||0)>=B().fixAf?90:40):""}`,
  go:()=>{fx.fixed=1;const v=(rivals||[]).find(x=>x.id===fx.by);const af=(S.court&&S.court.ksp&&S.court.ksp.af.me)||0;
   if(v&&roll(af>=B().fixAf?90:40)){cyDeed(v,"cyfo:"+fx.m,"cyforge","đút lót Kính sự phòng ghi sai sổ nguyệt sự của người khác");const g=evA(S,v,1);if(g)try{noteAdd(v.id,`Đút lót Kính sự phòng ghi sai sổ nguyệt sự của ta (chứng cứ +${g})`)}catch(e){}log(`Kính sự phòng chép lại sổ nguyệt sự cho ngươi; Tổng quản khai ${v.name} đã đút lót ghi sai.${g?` Chứng cứ +${g}.`:""}`)}
   else log("Kính sự phòng chép lại sổ nguyệt sự cho ngươi; không rõ ai đã ghi sai.")}})}
 const facts=F.concat(found.map(t=>({text:t,kind:"world"})));
 if(rum&&rum.m===cyCur()&&!rum.fixed&&!rum.self)facts.push({text:`Sổ ghi ngươi tháng này ${kitChip("không báo","r")}, mà ngươi đã báo: có kẻ sửa sổ.`,kind:"world"});
 kitModal({kind:"intel",title:"Sổ nguyệt sự",sub:`Kính sự phòng · ma ma các cung báo lên · ${how}`,facts,opts:opts.length?opts:undefined});
 return found.length?found.join(" "):"đã xem sổ nguyệt sự."}
window.cyBook=cyBook;
/* Kính sự phòng (Tổng quản): two roads to the book */
const to0=talkOpts;talkOpts=function(p){const A=to0.apply(this,arguments);try{if(!p||p.kind!=="ksp"||!S||(typeof isSrv==="function"&&isSrv()))return A;
  const r=Math.min(7,S.rank||0),cost=B().read[r],af=(S.court&&S.court.ksp&&S.court.ksp.af.me)||0;const po=cl_(Math.round(B().peekO+af*B().peekAf+(S.tamco||0)/B().peekTc),5,95);
  const lk=A[0]&&A[0].k61?{lock:true,t:"Chưa biết người này là ai"}:{};/* j61 stranger gate: greet first, like every other talk card */
  A.push(Object.assign({n:"Xem sổ nguyệt sự",c:{bac:-cost},o:100,x:"thấy từng người báo kỳ ngày nào, ai tháng này không báo",run:()=>cyBook("đút lót xem sổ")},lk));
  A.push(Object.assign({n:"Hầu chuyện, xem lén sổ nguyệt sự",c:{suc:-B().peekSuc},o:po,act:1,x:`thấy từng người báo kỳ ngày nào · hỏng: bị Tổng quản bắt gặp (thiện cảm -${B().peekAfLoss}), Danh -${B().peekDanh}`,
   run:()=>{if(roll(po))return cyBook("xem lén");apply({danh:-B().peekDanh});if(S.court&&S.court.ksp)S.court.ksp.af.me=af-B().peekAfLoss;return "bị Tổng quản bắt gặp đang liếc sổ; Danh -"+B().peekDanh+"."}},lk));
 }catch(e){console.error(e)}return A};

/* ---------- 4. her forgeries: deck cards ---------- */
function cyDeck(){if(!S||S.dead||S.out||(typeof isSrv==="function"&&isSrv()))return;const r=Math.min(7,S.rank||0),c=cyb();const loyal=(S.maid&&S.maid.loyal)||50;
 /* the book as HÀNH SỰ cards (owner 16/11: no walk to Dư đồ; the Kính sự phòng place keeps its two talk cards as a shortcut) — same two roads */
 {const af=(S.court&&S.court.ksp&&S.court.ksp.af.me)||0,po=od(B().peekO+af*B().peekAf+(S.tamco||0)/B().peekTc);
  deck.push({n:"Xem sổ nguyệt sự",t:"Lót tay thái giám Kính sự phòng, mở sổ ma ma các cung báo kỳ.",c:{bac:-B().read[r]},o:100,k:1,w:{},l:{},x:"thấy từng người báo kỳ ngày nào, ai tháng này không báo",dom:"Mưu kế",go:()=>{cyBook("đút lót xem sổ")}});
  deck.push({n:"Xem lén sổ nguyệt sự",t:"Sang Kính sự phòng hầu chuyện Tổng quản, liếc trộm cuốn sổ trên án.",c:{suc:-B().peekSuc},o:po,k:2,w:{},l:{danh:-B().peekDanh},x:`thấy từng người báo kỳ ngày nào · hỏng: bị Tổng quản bắt gặp (thiện cảm -${B().peekAfLoss})`,dom:"Mưu kế",go:()=>{cyBook("xem lén")},
   fail:()=>{if(S.court&&S.court.ksp){const a=S.court.ksp.af;a.me=(a.me||0)-B().peekAfLoss}log("Bị Tổng quản bắt gặp đang liếc sổ nguyệt sự.")}})}
 /* báo lùi last month: a mismatched conception already fits a real night (as "Khai lùi ngày nguyệt sự" would) */
 if(S.preg&&S.pregMismatch&&cyCover()&&(S.nightLog||[]).some(w=>S.pregWk-w>=2&&S.pregWk-w<=6)){S.pregMismatch=false;log("Nhờ ma ma đã báo lùi kỳ nguyệt sự, ngày có thai trong sổ Kính sự phòng khớp một đêm thị tẩm.")}
 /* hide a hidden pregnancy: the book keeps her reports */
 if(cyPreg(S)&&S.hidden&&!S.pregUnk&&c.hide!==S.pregWk&&S.preg<=3){const pw=S.pregWk;
  deck.unshift({n:"Sửa sổ nguyệt sự",t:"Đút lót Kính sự phòng ghi tháng nào ngươi cũng báo, để không ai đoán ra tin vui.",c:{bac:-B().hide[r]},o:od(B().hideO),w:{},l:{},x:"sổ ghi ngươi vẫn báo đều, giữ kín được thai · hỏng: Tổng quản biết chuyện của ngươi",dom:"Mưu kế",go:()=>{c.hide=pw},fail:()=>{S.ksKnows=1}});
  const o2=od(B().hideMaidO+Math.round(loyal/B().hideMaid));
  deck.unshift({n:"Dặn ma ma báo ngày giả",t:`Dặn ${S.maid&&S.maid.name?"ma ma "+S.maid.name:"ma ma trong cung"} cứ đúng kỳ lên Kính sự phòng báo như thường.`,c:{duc:-B().hideDuc},o:o2,w:{},l:{},x:"sổ ghi ngươi vẫn báo đều, giữ kín được thai · hỏng: ma ma lỡ lời, cả cung biết ngươi có thai",dom:"Mưu kế",go:()=>{c.hide=pw},fail:()=>{S.hidden=false;try{ghenAll(6)}catch(e){}log("Ma ma lỡ lời ở Kính sự phòng: cả cung biết ngươi có thai.")}})}
 /* the non-bạc twin of j22 "Hối lộ Kính sự phòng sửa sổ": move her last reported cycle so the conception falls after a real night */
 if(S.preg&&S.pregMismatch&&!S.out&&(S.nightLog||[]).some(w=>S.pregWk-w>=2&&S.pregWk-w<=6)){const o3=od(B().backO+Math.round((S.tamco||0)/B().backTc)+Math.round(loyal/5));
  deck.unshift({n:"Khai lùi ngày nguyệt sự",t:"Nhờ ma ma khai kỳ nguyệt sự tháng trước lùi lại, cho ngày có thai rơi đúng sau một đêm thị tẩm.",c:{duc:-B().backDuc},o:o3,w:{},l:{danh:-B().backDanh},x:"sổ khớp ngày, hết bị nghi · hỏng: Tổng quản biết chuyện của ngươi",dom:"Mưu kế",go:()=>{S.pregMismatch=false},fail:()=>{S.ksKnows=1}})}}

/* musk on a hidden pregnancy only for whoever read it in the book */
function cyKnows(a,t){if(!a||!t||t.pregWk==null)return false;if(a===S)return !!(S.cyKnow&&S.cyKnow[t.id]===t.pregWk);if(t===S)return a.cyKnowMe===S.pregWk;return !!(a.cyKnow&&a.cyKnow[t.id]===t.pregWk)}
if(typeof ACT==="object"&&ACT.musk){const ok0=ACT.musk.ok;ACT.musk.ok=function(a,t){if(ok0.apply(this,arguments))return true;try{return !!(t&&cyPreg(t)&&t.hidden&&a&&(a.bac||0)>=30&&cyKnows(a,t))}catch(e){return false}}}

/* ---------- 5. NPCs ---------- */
function foes(){return liveRivals(true).filter(v=>v.alive&&!v.out&&!v.coop&&hostility(v,S)>=B().foeHost)}
const mp0=monthPay;monthPay=function(){let ev=mp0.apply(this,arguments)||"";try{if(!S||S.dead||S.out||(typeof isSrv==="function"&&isSrv()))return ev;const c=cyb(),mi=cyCur();
  /* last month's uncorrected false "không báo": mừng hụt */
  if(c.rum&&c.rum.m===mi-1&&!c.rum.fixed&&!c.rum.done){c.rum.done=1;if(!cyPreg(S)){const b=S.sung,d=S.danh;apply({sung:-B().rumSung,danh:-B().rumDanh});
    const t=`Sổ Kính sự phòng ghi tháng trước ngươi không báo nguyệt sự; cả cung tưởng có tin vui, rồi mừng hụt. Sủng của ngươi ${b} → ${S.sung}, Danh ${d} → ${S.danh}.`;log(t);ev+=t+" "}}
  const F=foes();
  /* a foe reads the book: her hidden pregnancy guessed */
  if(cyPreg(S)&&S.hidden&&(cyLateSeen(S)>=1||c.giauM===mi-1)&&!cyHideOf(S))for(const v of F){if(v.cyKnowMe===S.pregWk||!roll(B().npcRead))continue;v.cyKnowMe=S.pregWk;
   if((S.mat||0)>=1){const t=`Tai mắt báo: ${v.name} cho người tra sổ nguyệt sự ở Kính sự phòng, đã đoán ra ngươi có tin vui.`;log(t);ev+=t+" "}break}
  /* her own false line last month (báo sớm / giấu) is forgery evidence for a foe who reads the book */
  if(c.lieM===mi-1&&!c.lieEv){c.lieEv=1;cyDeed(S,"cyl:"+c.lieM,"cylie","khai man ngày nguyệt sự với Kính sự phòng");for(const v of F){if(!roll(B().npcRead))continue;if(!evA(v,S,1))continue;
    if((S.mat||0)>=1){const t=`Tai mắt báo: ${v.name} tra sổ nguyệt sự, thấy ngày ma ma ngươi báo không khớp: nàng ta nắm chứng cứ ngươi khai man.`;log(t);ev+=t+" "}}}
  /* a foe forges a "không báo" against her (this month) */
  if(!cyPreg(S)&&cyAge(S)<50&&!(c.rum&&c.rum.m===mi)){const v=F.find(x=>(x.bac||0)>=B().forgeBac);if(v&&roll(B().npcForge)){ap(v,{bac:-B().forgeBac});c.rum={by:v.id,m:mi};cyDeed(v,"cyfo:"+mi,"cyforge","đút lót Kính sự phòng ghi sai sổ nguyệt sự của người khác");
    const t="Trong cung xì xào: sổ Kính sự phòng ghi ngươi tháng này không báo nguyệt sự.";log(t);ev+=t+" "}}
 }catch(e){console.error(e)}return ev};
/* rival vs rival (world; host only in co-op because rivalsMonth is muted on the guest) */
const rm0=rivalsMonth;rivalsMonth=function(){let ev=rm0.apply(this,arguments)||"";try{const L=liveRivals(true).filter(v=>v.alive&&!v.out);
  for(const t of L){if(!cyPreg(t)||!t.hidden||cyLateSeen(t)<1||cyHideOf(t))continue;const a=L.find(x=>x!==t&&!x.coop&&hostility(x,t)>=B().foeHost&&roll(B().rvRead));if(a){a.cyKnow=a.cyKnow||{};a.cyKnow[t.id]=t.pregWk}}
 }catch(e){console.error(e)}return ev};
})();
