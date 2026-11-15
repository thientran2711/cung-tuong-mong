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
   API: cycleDaysOf(person, month[, ahead]) → [days 1..30] of that calendar month (1..12; next occurrence from now, or `ahead` months
        ahead), [] = no cycle expected. cycleLate(person) → number of cycles truly missed (0 = not late). cycOn(person) → in her cycle tuần.
   Numbers: BAL.cyc. No kit part of its own: kitModal/kitFacts/kitChip/kitLine, act cards (talkOpts, deck), j75 lock pattern. ===== */
(function(){
if(typeof BAL==="object")BAL.cyc={
 read:[5,7,9,12,16,21,27,35],     /* bạc road "Xem sổ nguyệt sự" by rank (≈ 1/8 of BAL.pay[rank]); 1 khắc, sure */
 peekSuc:4,peekO:35,peekAf:1,peekTc:4, /* her road (2 khắc): Sức lost; odds = peekO + thiện cảm of the Tổng quản × peekAf + Tâm cơ / peekTc */
 peekDanh:2,peekAfLoss:2,          /* caught peeking: Danh lost, Tổng quản thiện cảm lost */
 hide:[12,16,20,28,36,48,64,84],   /* bạc road "Sửa sổ nguyệt sự" (hide her hidden pregnancy) by rank (≈ 1/3 of pay); odds hideO */
 hideO:80,hideDuc:4,hideMaid:2,    /* her road: Đức lost; odds = 25 + ma ma's loyalty / hideMaid */
 backDuc:6,backO:35,backTc:3,      /* "Khai lùi ngày nguyệt sự" (non-bạc twin of j22's 80-bạc bribe): Đức, odds base + Tâm cơ / backTc + loyalty/5 */
 backDanh:3,                       /* its failure: Danh lost (and the Tổng quản knows: S.ksKnows) */
 foeHost:50,npcRead:12,npcForge:4,forgeBac:30, /* NPC: hostility that makes a foe; monthly % she reads the book / forges a "không báo"; bạc it costs */
 rumSung:3,rumDanh:2,              /* uncorrected false "không báo": Sủng / Danh lost next month (mừng hụt) */
 fixAf:20,rvRead:6,rvHideTc:60,rvHide:40}; /* correction names the forger when the Tổng quản's thiện cảm ≥ fixAf; rival-vs-rival monthly %; clever rival hides */
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
window.cycleDaysOf=cycleDaysOf;window.cycleLate=cycleLate;window.cycOn=cycOn;window.cyBase=cyBase;window.cyAge=cyAge;
function cyb(){S.cyb=S.cyb||{};return S.cyb}
const TU=["thượng tuần","trung tuần","hạ tuần"];
function dName(L){if(!L.length)return"";const a=L[0],b=L[L.length-1];return `${a<=10?"mồng ":"ngày "}${a}\u2060–\u2060${b}`}
const RSN="Đang kỳ nguyệt sự, thẻ bài tạm cất, không tiện hầu giá";

/* ---------- 2. the flip: off the tray during her cycle tuần ---------- */
const nc0=nightCh;nightCh=function(p){const c=nc0.apply(this,arguments);try{if(c&&cycOn(p||S))return 0}catch(e){}return c};
const sn0=stealNight;stealNight=function(a){if(a&&cycOn(a))return "";return sn0.apply(this,arguments)};
for(const k of ["steal","road"]){const A0=typeof ACT==="object"&&ACT[k];if(!A0)continue;const ok0=A0.ok;A0.ok=function(a){if(a&&cycOn(a))return false;return ok0.apply(this,arguments)}}
if(typeof LACK==="object")for(const k of ["steal","road"]){const l0=LACK[k];LACK[k]=function(){if(cycOn(S))return RSN;return l0?l0.apply(this,arguments):""}}
const ns0=nightScene;nightScene=function(){if(cycOn(S)){log(`${RSN}.`);if(S.tonight==="me")S.tonight=null;return}return ns0.apply(this,arguments)};
function lockCyc(id,re){const p0=PEND[id];if(!p0)return;PEND[id]=function(){const d=p0.apply(this,arguments);try{if(d&&d.o){const o=d.o.find(o=>re.test(o.n||""));if(o){const lk0=o.lk;o.lk=()=>cycOn(S)?RSN:(typeof lk0==="function"?lk0():"")}}}catch(e){}return d}}
lockCyc("ksp",/^Tắm gội chờ giá/);lockCyc("empnight",/^Thắp đèn hầu rượu/);
const fl0=flip;flip=function(){const r=fl0.apply(this,arguments);try{if(!S||S.dead)return r;
  const d=S.nightWhy;if(d&&d.wk===wk()&&Array.isArray(d.rows))for(const row of d.rows){const p=row.id==="me"?S:(rivals||[]).find(v=>v.id===row.id);if(p&&cycOn(p)&&!(row.reasons||[]).some(x=>x.k==="cyc"))(row.reasons=row.reasons||[]).push({k:"cyc",t:"đang kỳ nguyệt sự",pub:p===S})}
  if(typeof isSrv==="function"&&isSrv())return r;const c=cyb();
  if(cycOn(S)&&c.nt!==wk()){c.nt=wk();const t="Kỳ nguyệt sự đã đến: tuần này Kính sự phòng tạm cất thẻ bài của ngươi.";log(t);try{if(typeof kitLine==="function")kitLine(t,3600)}catch(e){}}
  else if(cyPreg(S)&&S.pregUnk&&(S.tuan||0)===cyBase(S).t&&cycleLate(S)>=1&&c.lt!==wk()){c.lt=wk();log("Tuần này đáng lẽ tới kỳ nguyệt sự, mà chưa thấy.")}
 }catch(e){console.error(e)}return r};
/* Tranh sủng / Chặn ngự giá deck cards (j75 getters): closed with the reason during her cycle */
const dl0=deal;deal=function(){const r=dl0.apply(this,arguments);try{if(!S||!Array.isArray(deck))return r;
  for(const a of deck){if(!a||!(a.n==="Tranh sủng"||a.n==="Chặn ngự giá")||a.__cyc)continue;a.__cyc=1;
   const lD=Object.getOwnPropertyDescriptor(a,"lock"),tD=Object.getOwnPropertyDescriptor(a,"t");const lg=lD&&lD.get?lD.get:(()=>lD&&lD.value),tg=tD&&tD.get?tD.get:(()=>tD&&tD.value);
   Object.defineProperty(a,"lock",{get:()=>cycOn(S)||!!lg.call(a),set:()=>{},enumerable:true,configurable:true});
   Object.defineProperty(a,"t",{get:()=>cycOn(S)?RSN:tg.call(a),set:()=>{},enumerable:true,configurable:true})}
  cyDeck()}catch(e){console.error(e)}return r};

/* ---------- 3. the book ---------- */
function cyHideOf(p){if(p===S){const h=cyb().hide;return !!(h&&S.preg&&h===S.pregWk)}
 if(!p.preg||p.fake||p.pregWk==null)return false;return (p.tamco||0)>=B().rvHideTc&&cyH("cyh|"+p.id+"|"+p.pregWk)%100<B().rvHide}
/* what the book says for p in month offset k (0 = this month, -1 = last month) */
function cyRep(p,k){const mi=cyCur()+k,t=cyBase(p).t;if(cyAge(p)>=50)return{s:"old"};
 const rum=p===S&&cyb().rum;if(rum&&rum.m===mi&&k===0&&!rum.fixed)return{s:"miss",forged:1};
 if(k===0&&(S.tuan||0)<t)return{s:"wait",t};
 /* truly pregnant at that month's cycle week? */
 const cw=wk()-(S.tuan||0)+3*k+t;const preg=cyPreg(p)&&p.pregWk!=null&&cw>p.pregWk;
 if(preg&&!cyHideOf(p))return{s:"miss"};return{s:"ok",d:cyDaysM(p,mi),fake:!!(p.preg&&p.fake)}}
function cyRepText(r){if(r.s==="old")return kitChip("đã dứt kỳ","n");if(r.s==="wait")return `chưa tới kỳ (${TU[r.t]})`;if(r.s==="miss")return kitChip("không báo","r");return `đã báo, ${dName(r.d)}`}
function cyNights(p){const m0=wk()-(S.tuan||0);return (p.nightLog||[]).filter(w=>w>=m0&&w<=wk()).length}
function cyBook(how){const c=cyb();c.read=cyCur();const F=[];const L=consorts().filter(p=>p===S||(p.alive&&!p.out));S.cyKnow=S.cyKnow||{};let found=[];
 for(const p of L){const a=cyRep(p,0),b=cyRep(p,-1);const n=cyNights(p);
  F.push({who:p,kind:p===S?"me":"person",text:`${p===S?"Ta":p.name}: tháng này ${cyRepText(a)} · tháng trước: ${cyRepText(b)}${n?` · ${n} đêm thị tẩm`:""}`});
  if(p===S)continue;
  if(a.s==="miss"||b.s==="miss"){if(cyPreg(p)&&S.cyKnow[p.id]!==p.pregWk){S.cyKnow[p.id]=p.pregWk;try{noteAdd(p.id,"Sổ nguyệt sự: tháng này không báo; e là đã có tin vui")}catch(e){}found.push(`${p.name} tháng này không báo nguyệt sự: e là đã có tin vui.`)}}
  if(p.preg&&p.pregMismatch&&!p.fake&&p.cyEvi!==p.pregWk){p.cyEvi=p.pregWk;evA(S,p,2);try{noteAdd(p.id,"Sổ nguyệt sự: ngày nàng ta có thai không khớp đêm thị tẩm nào (chứng cứ +2)")}catch(e){}found.push(`Ngày ${p.name} có thai không khớp đêm thị tẩm nào trong sổ: chứng cứ +2.`)}
  if(p.preg&&p.fake&&a.s==="ok"&&p.cyEvi!=="f"+p.pregWk){p.cyEvi="f"+p.pregWk;evA(S,p,1);found.push(`${p.name} báo có thai mà ma ma cung ấy vẫn báo nguyệt sự: chứng cứ +1.`)}}
 const opts=[];const rum=c.rum;
 if(rum&&rum.m===cyCur()&&!rum.fixed){const fx=rum;opts.push({n:"Xin Kính sự phòng chép lại cho đúng",fx:{},x:`sổ ghi đúng, tin đồn tắt · biết kẻ sửa sổ: ${typeof chanceW==="function"?chanceW(((S.court&&S.court.ksp&&S.court.ksp.af.me)||0)>=B().fixAf?90:40):""}`,
  go:()=>{fx.fixed=1;const v=(rivals||[]).find(x=>x.id===fx.by);const af=(S.court&&S.court.ksp&&S.court.ksp.af.me)||0;
   if(v&&roll(af>=B().fixAf?90:40)){evA(S,v,1);try{noteAdd(v.id,"Đút lót Kính sự phòng ghi sai sổ nguyệt sự của ta (chứng cứ +1)")}catch(e){}log(`Kính sự phòng chép lại sổ nguyệt sự cho ngươi; Tổng quản khai ${v.name} đã đút lót ghi sai. Chứng cứ +1.`)}
   else log("Kính sự phòng chép lại sổ nguyệt sự cho ngươi; không rõ ai đã ghi sai.")}})}
 const facts=F.concat(found.map(t=>({text:t,kind:"world"})));
 if(rum&&rum.m===cyCur()&&!rum.fixed)facts.push({text:`Sổ ghi ngươi tháng này ${kitChip("không báo","r")}, mà ngươi đã báo: có kẻ sửa sổ.`,kind:"world"});
 kitModal({kind:"intel",title:"Sổ nguyệt sự",sub:`Kính sự phòng · ma ma các cung báo lên · ${how}`,facts,opts:opts.length?opts:undefined});
 return found.length?found.join(" "):"đã xem sổ nguyệt sự."}
window.cyBook=cyBook;
/* Kính sự phòng (Tổng quản): two roads to the book */
const to0=talkOpts;talkOpts=function(p){const A=to0.apply(this,arguments);try{if(!p||p.kind!=="ksp"||!S||(typeof isSrv==="function"&&isSrv()))return A;
  const r=Math.min(7,S.rank||0),cost=B().read[r],af=(S.court&&S.court.ksp&&S.court.ksp.af.me)||0;const po=cl_(Math.round(B().peekO+af*B().peekAf+(S.tamco||0)/B().peekTc),5,95);
  const lk=A[0]&&A[0].k61?{lock:true,t:"Chưa biết người này là ai"}:{};/* j61 stranger gate: greet first, like every other talk card */
  A.push(Object.assign({n:"Xem sổ nguyệt sự",c:{bac:-cost},o:100,x:"thấy từng người báo kỳ ngày nào, ai tháng này không báo",run:()=>cyBook("đút lót xem sổ")},lk));
  A.push(Object.assign({n:"Hầu chuyện, xem lén sổ nguyệt sự",c:{suc:-B().peekSuc},o:po,act:1,x:`thấy từng người báo kỳ ngày nào · hỏng: bị bắt gặp, Danh -${B().peekDanh}, Tổng quản phật ý`,
   run:()=>{if(roll(po))return cyBook("xem lén");apply({danh:-B().peekDanh});if(S.court&&S.court.ksp)S.court.ksp.af.me=af-B().peekAfLoss;return "bị Tổng quản bắt gặp đang liếc sổ; Danh -"+B().peekDanh+"."}},lk));
 }catch(e){console.error(e)}return A};

/* ---------- 4. her forgeries: deck cards ---------- */
function cyDeck(){if(!S||S.dead||S.out||(typeof isSrv==="function"&&isSrv()))return;const r=Math.min(7,S.rank||0),c=cyb();const loyal=(S.maid&&S.maid.loyal)||50;
 /* hide a hidden pregnancy: the book keeps her reports */
 if(cyPreg(S)&&S.hidden&&!S.pregUnk&&c.hide!==S.pregWk&&S.preg<=3){const pw=S.pregWk;
  deck.unshift({n:"Sửa sổ nguyệt sự",t:"Đút lót Kính sự phòng ghi tháng nào ngươi cũng báo, để không ai đoán ra tin vui.",c:{bac:-B().hide[r]},o:od(B().hideO),w:{},l:{},x:"sổ ghi ngươi vẫn báo đều, giữ kín được thai · hỏng: Tổng quản biết chuyện của ngươi",dom:"Mưu kế",go:()=>{c.hide=pw},fail:()=>{S.ksKnows=1}});
  const o2=od(25+Math.round(loyal/B().hideMaid));
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
  if(cyPreg(S)&&S.hidden&&cycleLate(S)>=1&&!cyHideOf(S))for(const v of F){if(v.cyKnowMe===S.pregWk||!roll(B().npcRead))continue;v.cyKnowMe=S.pregWk;
   if((S.mat||0)>=1){const t=`Tai mắt báo: ${v.name} cho người tra sổ nguyệt sự ở Kính sự phòng, đã đoán ra ngươi có tin vui.`;log(t);ev+=t+" "}break}
  /* a foe forges a "không báo" against her (this month) */
  if(!cyPreg(S)&&cyAge(S)<50&&!(c.rum&&c.rum.m===mi)){const v=F.find(x=>(x.bac||0)>=B().forgeBac);if(v&&roll(B().npcForge)){ap(v,{bac:-B().forgeBac});c.rum={by:v.id,m:mi};
    const t="Trong cung xì xào: sổ Kính sự phòng ghi ngươi tháng này không báo nguyệt sự.";log(t);ev+=t+" "}}
 }catch(e){console.error(e)}return ev};
/* rival vs rival (world; host only in co-op because rivalsMonth is muted on the guest) */
const rm0=rivalsMonth;rivalsMonth=function(){let ev=rm0.apply(this,arguments)||"";try{const L=liveRivals(true).filter(v=>v.alive&&!v.out);
  for(const t of L){if(!cyPreg(t)||!t.hidden||cycleLate(t)<1||cyHideOf(t))continue;const a=L.find(x=>x!==t&&!x.coop&&hostility(x,t)>=B().foeHost&&roll(B().rvRead));if(a){a.cyKnow=a.cyKnow||{};a.cyKnow[t.id]=t.pregWk}}
 }catch(e){console.error(e)}return ev};
})();
