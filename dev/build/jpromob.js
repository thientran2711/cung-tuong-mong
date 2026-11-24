/* ================= jpromob: PROMOTION BUILD part A + special routes + PHÂN CUNG (Foreman D promo-build; owner 24/11 ~07:55Z, ~08:30Z, ~09:15Z,
   ~09:20Z, ~09:35Z, ~09:50Z; design dev/handover/reports/promo-redesign.md on the handover branch; numbers BAL.promoR, jbal2) =================
   (1) KỲ SẮC PHONG: no monthly promotion check any more. The ordinary road (every promoReqP row + the exam) is looked at only in a kỳ month: a few
       festivals a year, irregular gaps (BAL.promoR.ky). promoReqP (j8) carries the row «Kỳ sắc phong …» (pbKyRow), so every reader — her exam window
       (jexam exTick), the NPC exam (jexam promoteP wrapper), fillSeats / contests (j34), the help panel — follows ONE rule (law 1). A fail or a lapse
       waits for the next kỳ (jexam exCd → pbCdKy).
   (2) SPECIAL EXAMS (daughter weight): one exam outside the kỳ; Sủng / Danh / months / kỳ waived (jexam EX_WAIVE), the seat and the block rows still apply.
       Routes: every daughter and every later son (PROMO_SRC "special", one per birth), Hoàng thượng sủng ái (Sủng ≥ the cut of THIS Emperor's nết,
       ≤ 1 per BAL.promoR.sp.sung.every months, ≤ life per life), Thái hậu ân điển, Hoàng hậu đề cử (thiện cảm ≥ the cut of the patron's nết; once per
       life per patron, a new patron = a new chance). A failed or missed special exam USES UP that chance (jexam exDone / exTick). One special exam at a
       time: a birth while one is open waits in a queue (p.pbs.q). An unused special exam lapses at the next kỳ (after at least ky.hold months).
       Every route has a loss (law 3, BAL.promoR.sp.cost). NPCs: the same checks every month (host only in co-op), their exam in jexam.
   (3) PHÂN CUNG: window.phanCungEdict({list:[{p,fav:{E,T,H}}],then}) (called by SELSCENE when «Tin sắc phong» closes) re-houses the listed people by
       the ONE rule of jpal palFix (pcHostPick: Hoàng thượng's favour → a nearer / better palace, Hoàng hậu's → a kind or a harsh host, Thái hậu's → a
       host she favours) and shows a kit panel (decree line + where + why); then() when it closes. The same rule places everyone at every later palFix;
       a promotion that changes her lodging shows the same panel.
   (4) kitPromoHook (jexam) reads pbNextKy: months to the next kỳ, its festival, ready, miss.
   ĐẠI LỄ (design §4b) waits for sếp: BAL.promoR.dl.on = 0, nothing built.
   State: S.pb = {ky:{last, upto, at:{A:festKey}}, mt (mourning until A), thd, kn (A of the last kỳ notice), hr / hk (her rank / house at the last
   palFix)}; p.pbs = {sung:{n,at}, th:{key:1}, hh:{key:1}, q:[src…]}; p.ex.gx = the A where an unused special exam lapses. A = year·12 + month − 1. */

/* ---------- the kỳ calendar ---------- */
function pbA(){return (S.year||0)*12+((S.month||1)-1)}
function pbAM(A){return ((A%12)+12)%12+1}
function pbAY(A){return Math.floor(A/12)}
function pbAT(A){return S.turn+(A-pbA())}/* the turn of that month (as seen now) */
/* world draw 0..99 of a festival in a year: the same on every seat of a co-op room (no Math.random), different for every Emperor (era + likes + traits) */
function pbH(k,y){const E=S.emp||{},lk=E.likes||{};const s=`ky:${k}:${y}:${E.era||""}:${lk.flower||""}:${lk.music||""}:${lk.dish||""}:${[].concat(E.traits||[]).join()}`;
 let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0)%100}
function pbFests(A,thAlive){const F=typeof FEST!=="undefined"?FEST:{},P=BAL.promoR.ky.p,m=pbAM(A);return Object.keys(P).filter(k=>F[k]&&+F[k].m===m&&(k!=="thanhtho"||thAlive))}
function pbFestN(k){try{return FEST[k].name}catch(e){return k}}
/* one month of the calendar: the kỳ festival key or null; c = {last, mt} is moved on */
function pbKyStep(c,A,thAlive){const K=BAL.promoR.ky;if(c.mt!=null&&A<c.mt)return null;const L=pbFests(A,thAlive);if(!L.length)return null;
 const gap=c.last==null?K.gapMax:A-c.last;if(gap<K.gapMin)return null;const d=L.find(k=>pbH(k,pbAY(A))<K.p[k]);const k=d||(gap>=K.gapMax?L[0]:null);if(k)c.last=A;return k}
function pbSt(){if(!S.pb||typeof S.pb!=="object")S.pb={};const P=S.pb;if(!P.ky||typeof P.ky!=="object"){const A=pbA();P.ky={last:A-BAL.promoR.ky.gapMin,upto:A-1,at:{}}}return P}
/* fix the calendar up to this month (stored, so a past kỳ never moves); the Thái hậu's death starts the mourning */
function pbKyUpdate(){if(!S||!BAL.promoR)return;const P=pbSt(),A=pbA();
 if(S.thDead&&!P.thd){P.thd=1;P.mt=A+BAL.promoR.mourn;try{if(S.thO)delete S.thO.pbK}catch(e){}}else if(!S.thDead&&P.thd)P.thd=0;
 const K=P.ky;if(K.upto>=A)return;const c={last:K.last,mt:P.mt};for(let a=Math.max(K.upto+1,A-24);a<=A;a++){const k=pbKyStep(c,a,!S.thDead);if(k)K.at[a]=k}K.last=c.last;K.upto=A;
 for(const a in K.at)if(+a<A-36)delete K.at[a]}
/* the kỳ of month A (pure: a future month is simulated from the stored calendar with today's world, nothing is written) */
function pbKyAt(A){const P=S.pb,K=P&&P.ky;if(K&&A<=K.upto)return K.at[A]||null;const c={last:K?K.last:pbA()-BAL.promoR.ky.gapMin,mt:P?P.mt:null};
 for(let a=K?K.upto+1:pbA();a<=A;a++){const k=pbKyStep(c,a,!S.thDead);if(a===A)return k}return null}
function pbNextKy(from){const P=S.pb,K=P&&P.ky;const c={last:K?K.last:pbA()-BAL.promoR.ky.gapMin,mt:P?P.mt:null};const a0=K?K.upto+1:pbA();
 for(let a=Math.min(from,a0);a<=from+48;a++){let k;if(K&&a<=K.upto)k=K.at[a]||null;else k=pbKyStep(c,a,!S.thDead);if(a>=from&&k)return{A:a,k,n:pbFestN(k)}}return null}
/* months a fail / a lapse waits (jexam exCd): to the next kỳ after this month */
function pbCdKy(){if(!S||!BAL.promoR)return 0;const A=pbA(),n=pbNextKy(A+1);return n?Math.max(1,n.A-A):0}
/* the promoReqP row (j8): true in a kỳ month, while her kỳ window runs on, or once the exam is passed (the decree waits for a seat) */
function pbKyRow(p){try{if(!BAL.promoR||typeof exOn!=="function"||!exOn()||!p||p.out||rkOf(p)+1>=7||(typeof exSrv==="function"&&exSrv(p)))return null;const e=p.ex,to=rkOf(p)+1;
 if(e&&e.to===to&&e.pass)return[true,"Kỳ sắc phong: đã đỗ khảo hạch"];const A=pbA(),k=pbKyAt(A);if(k)return[true,`Kỳ sắc phong: ${pbFestN(k)} (đang mở)`];
 if(p===S&&e&&e.to===to&&e.w1!=null&&e.kyw!=null)return[true,"Kỳ sắc phong: đang trong hạn thi"];
 const n=pbNextKy(A+1);return[false,n?`Kỳ sắc phong: chưa tới (kỳ tới ${n.n}, còn ${n.A-A} tháng)`:"Kỳ sắc phong: chưa tới"]}catch(x){console.error("pbKyRow",x);return null}}

/* ---------- special exams (daughter weight) ---------- */
function pbGuest(){return !!(window.COOPW&&COOPW.on&&COOPW.seat&&COOPW.seat!=="a")}
function pbS(p){if(!p.pbs||typeof p.pbs!=="object")p.pbs={};const s=p.pbs;s.sung=s.sung||{n:0,at:null};s.th=s.th||{};s.hh=s.hh||{};s.q=s.q||[];return s}
function pbLive(p){return p===S?!S.dead&&!S.out&&!(S.succ&&S.succ.on):!!p&&p.alive!==false&&!p.out&&!p.coop}
function pbCan(p){return typeof exOn==="function"&&exOn()&&pbLive(p)&&!(typeof exSrv==="function"&&exSrv(p))&&!p.queen&&rkOf(p)<6}
function pbOpen(p){const e=exS(p);return e.grace===e.to||!!e.pass||!!e.pend||(p===S&&e.w1!=null)}
/* the rows a special exam still needs (seat waited after the exam): all met? */
function pbRowsOk(p){try{return exBase(p).filter(x=>!EX_WAIVE.test(x[1])).every(x=>x[0])}catch(e){return false}}
/* the whole ordinary road met (then a special exam would waste a life chance: she sits the kỳ) */
function pbRoadDone(p){try{return exBase(p).filter(x=>!/^Kỳ sắc phong/.test(x[1])).every(x=>x[0])}catch(e){return false}}
function pbThK(){if(S.thDead)return null;S.thO=S.thO||{};if(!S.thO.pbK){const P=pbSt();P.thn=(P.thn||0)+1;S.thO.pbK="th"+P.thn}return S.thO.pbK}/* one key per Thái hậu: her death clears it (pbKyUpdate), the next one gets a new key = a new chance */
function pbTemper(v,T){if(!v)return null;if(v.trait&&T[v.trait]!=null)return v.trait;for(const n of [].concat(v.net||[]))if(T[n]!=null)return n;return null}
function pbSungCut(p){const B=BAL.promoR.sp.sung,tr=[].concat((S.emp&&S.emp.traits)||[]);const add=tr.length?tr.reduce((a,t)=>a+(B.add[t]!=null?B.add[t]:B.def),0)/tr.length:B.def;
 return Math.round(RANKS[Math.min(RANKS.length-1,rkOf(p)+1)].s+add)}
function pbThCut(){const B=BAL.promoR.sp.th;const a=S.thO&&S.thO.arch;return B.cut[a]!=null?B.cut[a]:B.def}
function pbHhCut(q){const B=BAL.promoR.sp.hh;const t=pbTemper(q,B.cut);return t?B.cut[t]:B.def}
function pbHhOf(p){return Math.round(p===S?(S.hh||0):(p.hh||0))}
function pbEmpNet(){const tr=[].concat((S.emp&&S.emp.traits)||[]);return tr.map(t=>(typeof ETRAITS!=="undefined"&&ETRAITS[t]?ETRAITS[t][0]:t).toLowerCase()).join(", ")}
/* grant one special exam: src f/m (birth), sung, th, hh. Returns the line (her: log text; NPC: news). */
function pbGrant(p,src,o){o=o||{};if(!pbCan(p))return"";const me=p===S;const e=exS(p);
 if(pbOpen(p)){if(o.birth){pbS(p).q.push(src);return me?"Ân thi riêng mừng sinh nở được giữ lại, chờ lần thi riêng đang mở xong. ":""}return""}
 e.grace=e.to;e.gw=src;e.cd=0;e.lapse=0;const A=pbA(),n=pbNextKy(A+BAL.promoR.ky.hold);e.gx=n?n.A:A+BAL.promoR.ky.gapMax;
 const rk=exRk(e.to),nm=me?"ngươi":p.name,cost=pbCost(p,src,o);let why;
 if(src==="f")why="Mừng công chúa ra đời";else if(src==="m")why="Mừng hoàng tử ra đời";
 else if(src==="sung")why=`Hoàng thượng sủng ái ${nm} hơn người (Sủng ${Math.round(p.sung||0)}; bệ hạ ${pbEmpNet()}, cần ${o.cut})`;
 else if(src==="th")why=`Thái hậu thương ${nm} (Thái hậu quý ${nm} ${Math.round(p.th||0)}; bà ${(S.thO&&TH_ARCH[S.thO.arch]?TH_ARCH[S.thO.arch].n:"").toLowerCase()}, cần ${o.cut}), bà tâu xin`;
 else why=`Hoàng hậu đề cử ${nm} (Hoàng hậu quý ${nm} ${pbHhOf(p)}; bà ${String(o.t||"").toLowerCase()}, cần ${o.cut})`;
 const capT=src==="sung"?` Lần ${pbS(p).sung.n} trong ${BAL.promoR.sp.sung.life} lần của đời; lần sau sớm nhất sau ${BAL.promoR.sp.sung.every} tháng.`:src==="th"||src==="hh"?` Mỗi vị chỉ ân một lần trong đời.`:"";
 const t=me?`<b class="g">${why}: ân cho ngươi một lần thi riêng tấn phong ${rk} ngoài kỳ</b>, không cần đủ Sủng, Danh; còn ghế và Hoàng hậu, Thái hậu không chặn mới được thi. Trượt hay lỡ hạn là hết lượt.${capT} ${cost}`
  :`${p.name} được ân thi riêng tấn phong ${rk} (${why.replace(/^Mừng/,"mừng")}). ${cost}`;
 window.__pbN=window.__pbN||{};const N=window.__pbN;N[src]=(N[src]||0)+1;N[me?"me":"npc"]=(N[me?"me":"npc"]||0)+1;
 if(!me)try{newsAdd(p,"promo",t,true)}catch(x){}return t}
/* the loss of each route (law 3); the same for an NPC */
function pbCost(p,src,o){const C=BAL.promoR.sp.cost,me=p===S;let t="";try{
 if(src==="sung"){if(me){ghenAll(C.sungGhen,"ngươi được ân thi riêng");t=`Lục cung ghen (ghen +${ghenN(C.sungGhen)}). `}else for(const v of consorts())if(v!==p&&!v.out)oanAdd(v,p,C.sungOan)}
 else if(src==="th"){if(me){apply({sung:-C.thSung});t=`Bệ hạ coi ngươi là người của Thái hậu (${typeof sgStat==="function"?sgStat(-C.thSung):"Sủng −"+C.thSung}). `}else p.sung=Math.max(0,(p.sung||0)-C.thSung)}
 else if(src==="hh"){const q=o.q;if(me){try{q72DebtAdd(q72A("hh",q.id),-C.hhOwe)}catch(x){}t=`Ngươi mang ơn Hoàng hậu một việc (nợ ân ${C.hhOwe}). `}
  else for(const v of consorts())if(v!==p&&v!==q&&!v.out)oanAdd(v,p,C.hhOan)}
 }catch(x){console.error("pbCost",x)}return t}
/* the month's checks for one person: queue first, then favour, Thái hậu, Hoàng hậu (one grant a month at most) */
function pbTry(p){if(!pbCan(p))return"";const s=pbS(p),e=exS(p),A=pbA();
 if(e.grace===e.to&&e.gx!=null&&A>=e.gx&&!e.pass&&!e.pend&&!(p===S&&e.w1!=null)){delete e.grace;delete e.gw;delete e.gx;if(p===S)log("Lượt thi riêng chưa dùng đã hết hạn, tới kỳ sắc phong thì xét như mọi người.")}
 if(pbOpen(p))return"";if(s.q.length)return pbGrant(p,s.q.shift(),{birth:1});
 if(p.confined||pbRoadDone(p)||!pbRowsOk(p))return"";const SP=BAL.promoR.sp;
 const cs=pbSungCut(p);if((p.sung||0)>=cs&&s.sung.n<SP.sung.life&&(s.sung.at==null||S.turn-s.sung.at>=SP.sung.every)){s.sung.n++;s.sung.at=S.turn;return pbGrant(p,"sung",{cut:cs})}
 const tk=pbThK();if(tk&&(s.th[tk]||0)<SP.th.life){const ct=pbThCut();if((p.th||0)>=ct){s.th[tk]=(s.th[tk]||0)+1;return pbGrant(p,"th",{cut:ct})}}
 const q=typeof queenP==="function"?queenP():null;if(q&&q!==p&&q!==S&&!q.out&&q.alive!==false&&e.to<=SP.hh.maxTo){const qk="hh:"+key(q);
  if((s.hh[qk]||0)<SP.hh.life){const ch=pbHhCut(q);if(pbHhOf(p)>=ch){s.hh[qk]=(s.hh[qk]||0)+1;return pbGrant(p,"hh",{cut:ch,q,t:pbTemper(q,SP.hh.cut)||""})}}}
 return""}
/* once a month (after the month turns): her own checks on every seat; the NPCs on solo / the co-op host only */
function pbMonth(){if(!S||S.dead||!BAL.promoR)return"";pbKyUpdate();const P=pbSt();if(P.m===S.turn)return"";P.m=S.turn;let ev="";
 try{const t=pbTry(S);if(t)ev+=t}catch(x){console.error("pbMonth",x)}
 if(!pbGuest())for(const v of rivals.slice())try{pbTry(v)}catch(x){console.error("pbMonth",x)}
 return ev}
(function(){if(typeof monthTick!=="function")return;const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments)||"";try{if(S&&!S.dead)ev+=pbMonth()}catch(e){console.error("promo-build",e)}return ev}})();
/* her kỳ notice: once per kỳ month, the festival + whether she may sit + when the next one is */
function pbNotice(){if(!S||S.dead||S.out||rkOf(S)>=7||(typeof exSrv==="function"&&exSrv(S))||!exOn())return;pbKyUpdate();const P=pbSt(),A=pbA();
 if(S.pbV==null){S.pbV=1;if((S.turn||0)>0)log("Luật mới trong cung: thăng phẩm thường chỉ xét ở kỳ sắc phong (vài dịp lễ trong năm); đủ điều kiện mới được dự khảo hạch.")}
 const k=pbKyAt(A);if(!k||P.kn===A)return;P.kn=A;const e=exS(S),nm=pbFestN(k),n=pbNextKy(A+1),nx=n?` Kỳ tới: ${n.n}, còn ${n.A-A} tháng.`:"";
 if(e.pass)return;const miss=promoReqP(S).filter(x=>!x[0]&&!/^Kỳ sắc phong|Khảo hạch/.test(x[1])).map(x=>x[1]);
 if(miss.length)log(`${nm} là kỳ sắc phong. Ngươi chưa đủ điều kiện nên không được dự (${miss[0]}${miss.length>1?`, còn ${miss.length-1} điều nữa`:""}).${nx}`);
 else log(`<b class="g">${nm} là kỳ sắc phong</b>: Nội vụ phủ mở khảo hạch tấn phong ${exRk(e.to)} cho người đủ điều kiện.${nx}`)}
(function(){const t0=exTick;exTick=function(){try{pbNotice()}catch(e){console.error("pbNotice",e)}return t0.apply(this,arguments)}})();
/* Mệnh truyện › Sắc phong: one more kit chip, the next kỳ */
(function(){if(typeof exChips!=="function")return;const c0=exChips;exChips=function(){let h=c0.apply(this,arguments)||"";try{if(h&&BAL.promoR){const A=pbA(),k=pbKyAt(A),n=pbNextKy(A+1);
 const e=exS(S);const sp=e.grace===e.to?exGw(e):"";if(sp)h+=" "+kitChip(`Thi riêng: ${sp}`,"g");h+=" "+kitChip(k?`Kỳ sắc phong: ${pbFestN(k)}`:n?`Kỳ tới: ${n.n}, còn ${n.A-A} tháng`:"Chưa định kỳ sắc phong",k?"g":"n")}}catch(e){}return h}})();

/* ---------- PHÂN CUNG: the host rule (jpal palFix → pcHostPick) ---------- */
function pcN(x,k){const B=BAL.promoR.pc;return cl(((x||0)-B.mid[k])/B.span[k],-1,1)}
function pcFav(p){return{E:pcN(p.sung,"sung"),H:pcN(p===S?S.hh:p.hh,"hh"),T:pcN(p.th,"th")}}
function pcStand(h){try{if(h.pal==null)return 0;return cl(bcDanh(h.pal)/3+bcNear(h.pal)-1,-1,1)}catch(e){return 0}}
function pcKind(h){const B=BAL.promoR.pc;const t=pbTemper(h,B.kind);return t?B.kind[t]/2:0}
function pcAlign(h){return cl((h.th||0)/BAL.promoR.pc.span.th,-1,1)}
function pcParts(p,h){const B=BAL.promoR.pc,f=pcFav(p);return{E:B.wE*f.E*pcStand(h),H:B.wH*f.H*pcKind(h),T:B.wT*f.T*pcAlign(h),f}}
function pcScore(p,h,n){const x=pcParts(p,h);return x.E+x.H+x.T-BAL.promoR.pc.load*(n||0)}
/* the host for p among the hosts with a free room c (cnt = co-residents): highest score; ties → the existing order (fewest co-residents first) */
function pcHostPick(p,c,cnt){try{if(!BAL.promoR||!c||!c.length)return null;let best=null,bs=-1e9;
 const L=c.slice().sort((a,b)=>cnt(a)-cnt(b));for(const h of L){const s=pcScore(p,h,cnt(h));if(s>bs+1e-9){bs=s;best=h}}return best}catch(e){console.error("pcHostPick",e);return null}}
/* the WHY of a placement (player-visible, cổ trang): names each royal whose thiện cảm moved it */
function pcWhy(p){const me=p===S,B=BAL.promoR.pc,nm=me?"ngươi":p.name;const hd=typeof byKey==="function"?byKey(houseOf(p)):null;const L=[];
 const own=rkOf(p)>=3&&p.pal!=null;const dh=(typeof PLNAME!=="undefined"&&PLNAME.dtd&&PLNAME.dtd[0])||"tẩm điện Hoàng thượng";const h=own?p:hd&&hd!==p?hd:null;const f=pcFav(p);
 const hn=h&&h!==p?(typeof j78who==="function"?j78who(h):`${RANKS[rkOf(h)].n} ${h.name}`):"";
 if(h){const x=pcParts(p,h);
  if(Math.abs(f.E)>=B.why&&Math.abs(pcStand(h))>=B.why/2)L.push(f.E>0?`Hoàng thượng để mắt tới ${nm} (Sủng ${Math.round(p.sung||0)}): ${own?"được ban":"ở"} cung ${pcStand(h)>0?`gần ${dh}, danh giá`:`xa ${dh}`}`:`Hoàng thượng chưa để mắt tới ${nm} (Sủng ${Math.round(p.sung||0)}): ${own?"được ban":"ở"} cung ${pcStand(h)>0?`gần ${dh}`:`xa ${dh}`}`);
  if(!own&&Math.abs(f.H)>=B.why&&pcKind(h)!==0&&Math.sign(x.H)>0)L.push(f.H>0?`được Hoàng hậu thương: xếp ở với ${hn}, người hiền hòa`:`Hoàng hậu không ưa ${nm}: xếp ở với ${hn}, người khó tính`);
  if(!own&&Math.abs(f.T)>=B.why&&Math.abs(pcAlign(h))>=B.why&&Math.sign(x.T)>0)L.push(f.T>0?`Thái hậu thương ${nm}: chủ vị ${hn} là người được Thái hậu tin`:`Thái hậu không ưa ${nm}: chủ vị ${hn} cũng không được lòng Thái hậu`)}
 if(!L.length)L.push(h&&h!==p?`Nội vụ phủ xếp ${nm} vào chỗ còn trống, ở với ${hn}`:`Nội vụ phủ xếp ${nm} vào chỗ còn trống`);return L}
function pcWhere(p){try{return houseName(p)}catch(e){return palName("home")}}
/* the panel (kit T1 panel via the Q modal + kitRows; no own part) */
function pcPanel(list,o){o=o||{};const me=list.find(x=>x.p===S);const rows=[];
 if(me){rows.push(["Nơi ở",pcWhere(S)]);rows.push(["Vì sao",pcWhy(S)])}
 for(const x of list)if(x.p!==S&&pbLive(x.p))rows.push([x.p.name,`${pcWhere(x.p)} · ${pcWhy(x.p)[0]}`]);
 const head=o.head||`Thái giám Nội vụ phủ tuyên chỉ phân cung: mỗi người theo cung nữ về nơi ở mới.`;
 return{t:o.t||"Phân cung",who:me?pMe():null,h:`<p>${head}</p>${kitRows(rows)}`,btn:o.btn||"Về nơi ở mới"}}
/* the hook (SELSCENE «Tin sắc phong» → here): re-house the listed people by the rule, show the panel, then() when it closes */
window.phanCungEdict=function(o){o=o||{};const list=(o.list||[]).filter(x=>x&&x.p);const then=typeof o.then==="function"?o.then:()=>{};let done=false;const fin=()=>{if(done)return;done=true;try{then()}catch(e){console.error("phanCungEdict then",e)}};
 try{if(!S||!list.length){fin();return}
  const pc0=S.palCer;for(const x of list){const p=x.p;if(!pbLive(p)||p.queen)continue;if(rkOf(p)<3){p.resHead=null;p.resHall=null;if(p!==S&&p.palLone){p.pal=null;p.palLone=0}}else if(p!==S)p.pal=null}
  S.__pcBusy=1;try{palFix()}finally{S.__pcBusy=0}if(pc0!=null)S.palCer=pc0;pcMark();
  window.__pcN=(window.__pcN||0)+1;const m=pcPanel(list);m.onClose=fin;Q.unshift(m);try{showModal()}catch(e){}}catch(e){console.error("phanCungEdict",e);fin()}};
/* later promotions that change her lodging: the same panel once (the Tần ban-cung ceremony, S.palCer, has its own scene) */
function pcMark(){const P=pbSt();P.hr=rkOf(S);P.hk=String(houseOf(S))+"|"+(S.pal==null?"":S.pal)+"|"+(S.resHall||"")}
(function(){if(typeof palFix!=="function")return;const f0=palFix;palFix=function(){const r=f0.apply(this,arguments);try{if(S&&!S.__pcBusy&&!S.dead&&!S.out&&BAL.promoR&&!(typeof isSrv==="function"&&isSrv())){const P=pbSt();
 const hk=String(houseOf(S))+"|"+(S.pal==null?"":S.pal)+"|"+(S.resHall||"");if(P.hr==null){pcMark();return r}
 if(rkOf(S)>P.hr&&hk!==P.hk&&!S.palCer&&rkOf(S)<7){Q.push(pcPanel([{p:S}],{head:`Thánh chỉ tấn phong ${RANKS[rkOf(S)].n} kèm lệnh dời chỗ ở.`}))}pcMark()}}catch(e){console.error("pc later",e)}return r};window.palFix=palFix})();
window.pbKyAt=pbKyAt;window.pbNextKy=pbNextKy;window.pbGrant=pbGrant;window.pbTry=pbTry;window.pbMonth=pbMonth;window.pbKyRow=pbKyRow;window.pbA=pbA;window.pcHostPick=pcHostPick;window.pcWhy=pcWhy;window.pbSungCut=pbSungCut;window.pbThCut=pbThCut;window.pbHhCut=pbHhCut;window.pbCdKy=pbCdKy;window.pbHhOf=pbHhOf;window.pbKyUpdate=pbKyUpdate;
