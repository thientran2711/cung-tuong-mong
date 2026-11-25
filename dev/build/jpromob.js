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
   (5) ĐẠI LỄ (son weight, pbDl): full conditions + Đức → direct decree; seats short → seat contest; others wait for the next kỳ.
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
 if(S.thDead&&!P.thd){P.thd=1;P.mt=Math.max(P.mt||0,A+BAL.promoR.mourn);try{if(S.thO)delete S.thO.pbK}catch(e){}}else if(!S.thDead&&P.thd)P.thd=0;
 {const ek=pbEmpKey();if(P.ek==null)P.ek=ek;else if(P.ek!==ek){const was=P.ek;P.ek=ek;if(was!=="dead")P.mt=Math.max(P.mt||0,A+BAL.promoR.mourn)}}/* promo-build-2: the Emperor's death (or a new Emperor on the throne) = quốc tang too (design §3, OD ~07:00Z real «none during quốc tang») */
 const K=P.ky;if(K.upto>=A)return;const c={last:K.last,mt:P.mt};for(let a=Math.max(K.upto+1,A-24);a<=A;a++){const k=pbKyStep(c,a,!S.thDead);if(k)K.at[a]=k}K.last=c.last;K.upto=A;
 for(const a in K.at)if(+a<A-36)delete K.at[a]}
/* who reigns: "dead" while the Emperor is dead / a succession runs, else his reign (era + name) */
function pbEmpKey(){const E=S.emp||{};return S.empDead||E.dead||(S.succ&&S.succ.on)?"dead":`${E.era||""}|${E.name||""}`}
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
function pbHhOf(p){return Math.round(p===S?(S.hh||0):(typeof hhGet==="function"?hhGet(p)/* j24 hhBind: v.hh IS hhGet(v); read it straight so a co-op guest's copy (a plain lens value, host-side) gives the same number (d-followups-1) */:(p.hh||0)))}
function pbEmpNet(){const tr=[].concat((S.emp&&S.emp.traits)||[]);return tr.map(t=>(typeof ETRAITS!=="undefined"&&ETRAITS[t]?ETRAITS[t][0]:t).toLowerCase()).join(", ")}
/* grant one special exam: src f/m (birth), sung, th, hh. Returns the line (her: log text; NPC: news). */
function pbGrant(p,src,o){o=o||{};if(!pbCan(p))return"";const me=p===S;const e=exS(p);
 if(pbOpen(p)){if(o.birth){pbS(p).q.push(src);return me?"Ân thi riêng mừng sinh nở được giữ lại, chờ lần thi riêng đang mở xong. ":""}return""}
 e.grace=e.to;e.gw=src;e.cd=0;e.lapse=0;const A=pbA(),n=pbNextKy(A+BAL.promoR.ky.hold);e.gx=n?n.A:A+BAL.promoR.ky.gapMax;
 const rk=exRk(e.to),nm=me?"ngươi":p.name,cost=pbCost(p,src,o);let why;const kn=pbKnown(p);/* promo-build-2 (greeting rule): a stranger's numbers never show */
 if(src==="f")why="Mừng công chúa ra đời";else if(src==="m")why="Mừng hoàng tử ra đời";
 else if(src==="sung")why=kn?`Hoàng thượng sủng ái ${nm} hơn người (Sủng ${Math.round(p.sung||0)}; bệ hạ ${pbEmpNet()}, cần ${o.cut})`:`Hoàng thượng sủng ái ${nm} hơn người`;
 else if(src==="th")why=kn?`Thái hậu thương ${nm} (Thái hậu quý ${nm} ${Math.round(p.th||0)}; bà ${(S.thO&&TH_ARCH[S.thO.arch]?TH_ARCH[S.thO.arch].n:"").toLowerCase()}, cần ${o.cut}), bà tâu xin`:`Thái hậu thương ${nm}, bà tâu xin`;
 else if(o.me)why=`Hoàng hậu ${S.name} đề cử ${nm}`;/* promo-build-2: SHE is the Hoàng hậu and chose this nominee (pbHhMeDo) */
 else why=kn?`Hoàng hậu đề cử ${nm} (Hoàng hậu quý ${nm} ${pbHhOf(p)}; bà ${String(o.t||"").toLowerCase()}, cần ${o.cut})`:`Hoàng hậu đề cử ${nm}`;
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
 if(p.confined||(pbRoadDone(p)&&pbKyAt(A))||!pbRowsOk(p))return"";const SP=BAL.promoR.sp;/* rv: the whole road met → she sits the kỳ only when one is open THIS month; outside a kỳ the favour / patron exam is its value (OD ~08:30Z «không cần tới kỳ») */
 const cs=pbSungCut(p);if((p.sung||0)>=cs&&s.sung.n<SP.sung.life&&(s.sung.at==null||S.turn-s.sung.at>=SP.sung.every)){s.sung.n++;s.sung.at=S.turn;return pbGrant(p,"sung",{cut:cs})}
 const tk=pbThK();if(tk&&(s.th[tk]||0)<SP.th.life){const ct=pbThCut();if((p.th||0)>=ct){s.th[tk]=(s.th[tk]||0)+1;return pbGrant(p,"th",{cut:ct})}}
 const q=typeof queenP==="function"?queenP():null;if(q&&q!==p&&q!==S&&!q.out&&q.alive!==false&&e.to<=SP.hh.maxTo){const qk="hh:"+key(q);
  if((s.hh[qk]||0)<SP.hh.life){const ch=pbHhCut(q);if(pbHhOf(p)>=ch){s.hh[qk]=(s.hh[qk]||0)+1;return pbGrant(p,"hh",{cut:ch,q,t:pbTemper(q,SP.hh.cut)||""})}}}
 return""}
/* once a month (after the month turns): her own checks on every seat; the NPCs on solo / the co-op host only */
function pbMonth(){if(!S||S.dead||!BAL.promoR)return"";pbKyUpdate();const P=pbSt();if(P.m===S.turn)return"";P.m=S.turn;let ev="";
 try{const A=pbA();if(P.mt!=null&&A<P.mt&&P.mtN!==P.mt){P.mtN=P.mt;ev+=`<b class="g">Quốc tang</b>: trong cung không mở kỳ sắc phong, không có đại lễ cho đến hết hạn tang (còn ${P.mt-A} tháng). `}}catch(x){}
 try{ev+=pbDl()}catch(x){console.error("pbDl",x)}
 try{ev+=pbDeath(S)}catch(x){console.error("pbDeath",x)}
 try{const t=pbTry(S);if(t)ev+=t}catch(x){console.error("pbMonth",x)}
 if(!pbGuest()){for(const v of rivals.slice())try{pbDeath(v);pbTry(v)}catch(x){console.error("pbMonth",x)}try{ev+=pbTpNpc()}catch(x){console.error("pbTpNpc",x)}}
 return ev}

/* ---------- ĐẠI LỄ (son weight; BAL.promoR.dl) ---------- */
const PB_DL={dangco:"Đại lễ tân đế đăng cơ",laphau:"Đại lễ lập Hoàng hậu",thTho:"Đại lễ Thánh thọ Thái hậu",empTho:"Đại lễ Vạn thọ thánh đản",thaitu:"Đại lễ lập Thái tử"};
function pbDlSt(){const P=pbSt();if(!P.dl||typeof P.dl!=="object")P.dl={last:null,seen:{}};return P.dl}
/* which đại lễ falls in this month (world state only, same on both co-op seats); marks it seen */
function pbDlWhich(){const B=BAL.promoR.dl,D=pbDlSt(),A=pbA(),F=typeof FEST!=="undefined"?FEST:{};const sn=D.seen;let k=null,w="";
 const era=(S.emp&&S.emp.era)||"";if(sn.era==null)sn.era=(S.turn||0)>0?era:"";/* an old save keeps its reign as already celebrated */
 if(sn.era!==era&&F.newyear&&S.month===+F.newyear.m){sn.era=era;k="dangco";w=`năm đầu niên hiệu ${era}`}
 const q=typeof queenP==="function"?queenP():null,qk=q?(q===S?"me":String(q.id)):"";if(sn.q==null)sn.q=qk;else if(qk&&sn.q!==qk){sn.q=qk;if(!k){k="laphau";w=`${q===S?"ngươi":q.name} được lập làm Hoàng hậu`}}else if(!qk)sn.q="";
 if(!k&&!S.thDead&&F.thanhtho&&S.month===+F.thanhtho.m&&B.thTho.includes(S.thAge)&&!sn["th"+S.thAge]){sn["th"+S.thAge]=1;k="thTho";w=`Thái hậu thọ ${S.thAge}`}
 if(!k&&S.emp&&F.vantho&&S.month===+F.vantho.m&&B.empTho.includes(S.emp.age)&&!sn["e"+S.emp.age+era]){sn["e"+S.emp.age+era]=1;k="empTho";w=`Hoàng thượng thọ ${S.emp.age}`}
 const hk=S.heir&&S.heir.k?String(S.heir.k.name||"")+":"+(S.heir.k.id||""):"";if(sn.h==null)sn.h=hk;else if(hk&&sn.h!==hk){sn.h=hk;if(!k){k="thaitu";w=`lập ${S.heir.k.name} làm Thái tử`}}
 if(!k)return null;{const P=pbSt();if(P.mt!=null&&A<P.mt)return{k,w,tang:1}}/* rv (OD 24/11 ~07:00Z real «none during quốc tang»): the occasion passes uncelebrated */
 if(D.last!=null&&A-D.last<B.minGap)return{k,w,down:1};D.last=A;return{k,w}}
/* full conditions of a đại lễ for one person (her and every NPC by the same rows) */
function pbFullRows(p){return pbDlRows(p)}/* promo-build-2: the ONE full condition set of the son-weight / deathbed / posthumous roads (OD ~05:55Z, ~06:30Z) */
function pbDlRows(p){const B=BAL.promoR.dl,to=rkOf(p)+1;const L=exBase(p).filter(x=>!/^Kỳ sắc phong/.test(x[1]));const d=B.duc[Math.min(B.duc.length-1,to)]||0;
 if(d)L.push([(p.duc||0)>=d,`Đức ${Math.round(p.duc||0)} (cần ${d})`]);return L}
function pbDlOk(p){return pbCan(p)&&!p.confined&&rkOf(p)+1<7&&pbDlRows(p).every(x=>x[0])}
function pbDlCost(p){const B=BAL.promoR.dl,me=p===S;const n=Math.max(0,Math.min(p.bac||0,Math.round(B.bacM*(BAL.pay[Math.min(BAL.pay.length-1,rkOf(p))]||0))));if(n)ap(p,{bac:-n});
 if(me){ghenAll(B.ghen,"ngươi được tấn phong dịp đại lễ");return `Lễ tạ ân dâng lên: Bạc −${n}. Lục cung ghen (ghen +${ghenN(B.ghen)}). `}
 for(const v of consorts())if(v!==p&&!v.out)oanAdd(v,p,B.oan);return ""}
/* the đại lễ month (pbMonth): direct decrees, or a seat contest when seats are short; the kỳ of this month is replaced */
function pbDl(){const B=BAL.promoR.dl;if(!B||!B.on)return"";const X=pbDlWhich();if(!X)return"";const A=pbA(),K=pbSt().ky,nm=PB_DL[X.k];
 if(X.tang)return `<b class="g">${nm}</b> (${X.w}): cả cung đang để quốc tang, không mở đại lễ, không có kỳ sắc phong. `;
 if(X.down){if(!K.at[A]){K.at[A]="dl:"+X.k}return `<b class="g">${nm}</b> (${X.w}): mới có đại lễ chưa lâu, năm nay chỉ mở kỳ sắc phong. `}
 delete K.at[A];window.__pbDl=(window.__pbDl||0)+1;
 const all=[S].concat(pbGuest()?[]:rivals.filter(v=>!v.coop));const ok=all.filter(p=>pbDlOk(p));const by={};for(const p of ok){const r=rkOf(p)+1;(by[r]=by[r]||[]).push(p)}
 let ev=`<b class="g">${nm}</b> (${X.w}): Hoàng thượng ban ân chiếu khắp lục cung. Người đủ Sủng, Danh, Đức được tấn phong thẳng, không qua khảo hạch. `;let mine="";
 for(const r in by){const L=by[r];const free=SEATCAP[r]==null?L.length:Math.max(0,SEATCAP[r]-holders(+r).length);
  if(L.length<=free){for(const p of L){const t=exDirectUp(p,nm.toLowerCase(),{fx:p===S?1:0});const c=pbDlCost(p);if(p===S)mine+=t+c;else{ev+=t;try{newsAdd(p,"promo",t,true)}catch(x){}}window.__pbDlN=(window.__pbDlN||0)+1}}
  else{for(const p of L){const e=exS(p);e.pass=true;e.dl=A}ev+=`Ghế ${RANKS[r].n} không đủ cho ${L.length} người đủ điều kiện (${L.map(p=>p===S?"ngươi":p.name).join(", ")}): phải tranh ghế. `}}
 if(!mine&&!ok.includes(S)&&pbCan(S)){const miss=pbDlRows(S).filter(x=>!x[0]).map(x=>x[1]);const n=pbNextKy(A+1);mine=`Ngươi chưa đủ điều kiện (${miss[0]||""}${miss.length>1?`, còn ${miss.length-1} điều nữa`:""}): chờ kỳ sắc phong tới${n?` (${n.n}, còn ${n.A-A} tháng)`:""}. `}
 return ev+mine}
(function(){const n0=pbFestN;pbFestN=function(k){if(typeof k==="string"&&k.startsWith("dl:"))return PB_DL[k.slice(3)]||"Đại lễ";return n0(k)}})();
window.pbDl=pbDl;window.pbDlWhich=pbDlWhich;window.pbDlOk=pbDlOk;
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
  if(Math.abs(f.E)>=B.why&&Math.abs(pcStand(h))>=B.why/2&&Math.sign(x.E)>0)/* rv: only when the favour really moved her that way (as the Hoàng hậu / Thái hậu lines) — never «để mắt tới … ở cung xa» */{const sg=pbKnown(p)?` (Sủng ${Math.round(p.sung||0)})`:"";/* promo-build-2 nit: an unknown girl's Sủng never shows (greeting / knowledge rule) */
   L.push(f.E>0?`Hoàng thượng để mắt tới ${nm}${sg}: ${own?"được ban":"ở"} cung ${pcStand(h)>0?`gần ${dh}, danh giá`:`xa ${dh}`}`:`Hoàng thượng chưa để mắt tới ${nm}${sg}: ${own?"được ban":"ở"} cung ${pcStand(h)>0?`gần ${dh}`:`xa ${dh}`}`)}
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

/* ================= promo-build-2 (Foreman D; brief D-promo-build-2; OD 24/11 ~05:55Z, ~06:30Z, ~07:00Z real, ~08:30Z; design rows 8–10) =================
   (1) LAW 1: when SHE is the Hoàng hậu she nominates («Hoàng hậu đề cử», act card in Hành sự → kit option sheet). The candidates are the ones the
       NPC Hoàng hậu route would take (pbTry «hh»: Hoàng hậu quý ≥ the cut of the Hoàng hậu's nết — hers here —, target ≤ maxTo, the special-exam
       rows met, once per life per Hoàng hậu, one special exam at a time). Every nominee option has the same gain (the nominee owes her one ân +
       thiện cảm) and the same loss (each candidate on the sheet she passed over oán her) — laws 2/3. The nominee gets the special exam (pbGrant
       «hh»; the NPC sits it in jexam promoteP). The NPC side is unchanged. Co-op: offered on the solo / host seat (NPC state is the host's).
   (2) DEATHBED (row 9): lâm bệnh nguy kịch (j13 STG 3) → once per life, if the FULL condition set (pbFullRows: every promoReqP row but the kỳ, +
       Đức) is met, Nội vụ phủ examines her record (exSimC: she is too ill to play); pass + a free seat = decree; full seat = no decree; loss: the
       Hoàng hậu oán (raised past her hand). Her and every NPC alike (pbMonth). Her result = a kit panel ending with a button.
   (3) TRUY PHONG (row 10): at death (her: over(); NPC: the month after) the same rows + the record exam → a rank title only (p.pbTp), shown in
       her «Kiếp này» panel / the news. Never past Hoàng quý phi. */
function pbKnown(p){if(!p||p===S)return true;try{return (typeof knows!=="function"||knows(p))&&(typeof kitKnownName!=="function"||kitKnownName(p))}catch(e){return true}}
function pbWho(p){return p===S?"ngươi":typeof j78who==="function"?j78who(p):p.name}

/* ---------- (1) her nomination ---------- */
/* d-followups-1 (law 1): a co-op GUEST who is the Hoàng hậu nominates too: her pick rides as an intent (jcoopthinf reg8 "pbHhMeDo"), the host applies it */
/* the once-key of HER nominations: "hh:<her key>" (solo / the host seat, as before); a co-op guest seat gets its own (key(S) is "me" on both seats,
   so the host's and the guest's nominations no longer share one once-per-life count — law 1, d-followups-1) */
function pbHhMeKey(){let c="";try{if(window.COOPW&&COOPW.on)c=COOPW.ctx||COOPW.seat||""}catch(e){}return "hh:"+key(S)+(c&&c!=="a"?"@"+c:"")}
function pbHhMeCoop(){try{const F=COOPW.thin&&COOPW.thin.F;return !!(F&&F.R&&F.R.pbHhMeDo&&F.on(8))}catch(e){return false}}
function pbHhMeList(){try{if(!S||!pbLive(S)||rkOf(S)<7||!exOn()||(pbGuest()&&!pbHhMeCoop())||(typeof isSrv==="function"&&isSrv()))return[];const SP=BAL.promoR.sp,ch=pbHhCut(S),qk=pbHhMeKey(),A=pbA();
 return liveRivals(false).filter(v=>!v.coop&&pbCan(v)&&!v.confined&&!pbOpen(v)&&exS(v).to<=SP.hh.maxTo&&(pbS(v).hh[qk]||0)<SP.hh.life&&pbHhOf(v)>=ch&&pbRowsOk(v)&&!(pbRoadDone(v)&&pbKyAt(A)))
  .sort((a,b)=>pbHhOf(b)-pbHhOf(a)).slice(0,SP.meMax)}catch(e){console.error("pbHhMeList",e);return[]}}
function pbHhMeOpts(L){const C=BAL.promoR.sp.cost;return L.map(v=>{const n=L.length-1;
 return{n:`Đề cử ${pbWho(v)} lên ${exRk(exS(v).to)}`,x:`được: ${pbWho(v)} nợ ngươi một ân, nàng quý ngươi hơn (+${C.meAff})${n?` · mất: ${n} người không được đề cử oán ngươi +${C.mePassOan}`:""}`,go:()=>pbHhMeDo(v,L.filter(o=>o!==v))}}).concat([{n:"Thôi"}])}
function pbHhMeOpen(){const L=pbHhMeList();if(!L.length){log("Lúc này chưa có phi tần nào đủ điều kiện để ngươi đề cử.");return}const ch=pbHhCut(S);
 const rows=L.map(v=>[pbWho(v),`lên ${exRk(exS(v).to)} · ${pbKnown(v)?`được lòng Hoàng hậu ${pbHhOf(v)}, cần ${ch}`:`được lòng Hoàng hậu đủ mức`}`]);
 Q.push({t:"Hoàng hậu đề cử",who:pMe(),h:`<p>Ngươi chủ lục cung, được đề cử một phi tần thi riêng tấn phong ngoài kỳ. Mỗi người chỉ được ngươi đề cử một lần trong đời. Người được chọn nợ ngươi một ân; người có tên mà không được chọn sẽ oán ngươi.</p>${kitRows(rows)}`,opts:pbHhMeOpts(L)});try{showModal()}catch(e){}}
function pbHhMeDo(v,others){const SP=BAL.promoR.sp,C=SP.cost;if(!pbHhMeList().includes(v)){log(`${pbWho(v)} không còn đủ điều kiện để đề cử.`);return}
 const s=pbS(v),qk=pbHhMeKey();s.hh[qk]=(s.hh[qk]||0)+1;pbGrant(v,"hh",{cut:pbHhCut(S),q:S,me:1});
 try{q72DebtAdd(q72A("rv",v.id),C.hhOwe)}catch(x){}affAdd(v,S,C.meAff);for(const o of others)oanAdd(o,S,C.mePassOan);
 window.__pbN=window.__pbN||{};window.__pbN.hhMe=(window.__pbN.hhMe||0)+1;
 log(`<b class="g">Ngươi đề cử ${pbWho(v)} lên ${exRk(exS(v).to)}</b>: Nội vụ phủ cho nàng một lần thi riêng ngoài kỳ. ${pbWho(v)} nợ ngươi một ân.${others.length?` ${others.length} người không được đề cử oán ngươi.`:""}`)}
function pbHhMeCard(L){return{n:"Hoàng hậu đề cử",pbhh:1,t:"Ngươi chủ lục cung: đề cử một phi tần được thi riêng tấn phong ngoài kỳ.",c:{},o:100,k:BAL.promoR.sp.meK,w:{},dom:"Giao thiệp",
 x:`chọn một trong ${L.length} người đủ điều kiện; người được chọn nợ ngươi một ân, người không được chọn oán ngươi`,go:()=>pbHhMeOpen()}}
(function(){if(typeof deal!=="function")return;const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(Array.isArray(deck)&&!deck.some(a=>a&&a.pbhh)){const L=pbHhMeList();if(L.length)deck.push(pbHhMeCard(L))}}catch(e){console.error("pbHhMeCard",e)}return r}})();

/* ---------- (2) deathbed ---------- */
function pbDeath(p){const SP=BAL.promoR.sp,D=SP.death;if(!D||typeof illOf!=="function")return"";const i=illOf(p);if(!i||i.st<3)return"";
 if(!pbCan(p)||p.confined||rkOf(p)+1>=7)return"";const s=pbS(p);if((s.dth||0)>=D.life||pbOpen(p))return"";const me=p===S;
 const miss=pbFullRows(p).filter(x=>!x[0]).map(x=>x[1]);
 if(miss.length){if(me&&!i.pbd){i.pbd=1;return `Ngươi lâm bệnh nguy kịch. Nội vụ phủ xét công đức xưa nay: chưa đủ điều kiện tấn phong (${miss[0]}${miss.length>1?`, còn ${miss.length-1} điều nữa`:""}). `}return""}
 s.dth=(s.dth||0)+1;const to=rkOf(p)+1,rk=exRk(to);const r=exSimC(p);window.__pbN=window.__pbN||{};window.__pbN.death=(window.__pbN.death||0)+1;
 let res,dec=false;
 if(r.pass&&(typeof seatFree!=="function"||seatFree(to))){if(me)S.rank++;else p.rank++;p.lastPromo=S.turn;p.ex={to:rkOf(p)+1};dec=true;window.__pbN.deathUp=(window.__pbN.deathUp||0)+1;
  const q=typeof queenP==="function"?queenP():null;if(q&&q!==p&&!q.out)oanAdd(q,p,SP.cost.deathHhOan);
  if(me){try{exDrop()}catch(x){}try{feedback("promote",{t:"Tấn phong"})}catch(x){}}
  res=me?`Thánh chỉ tấn phong ${S.name} làm ${RANKS[S.rank].n}. Hoàng hậu thấy ngươi được nâng vượt mặt bà, oán ngươi.`:`${p.name} được tấn phong ${RANKS[p.rank].n} bên giường bệnh.`}
 else if(r.pass)res=me?`Đỗ, nhưng ghế ${rk} đã đủ người: không có thánh chỉ.`:`${p.name} đỗ xét bên giường bệnh, nhưng ghế ${rk} đã đủ người.`;
 else res=me?"Chưa đạt: lần xét này đã qua, đời chỉ có một lần.":`${p.name} lâm bệnh nguy kịch, Nội vụ phủ xét tấn phong nhưng chưa đạt.`;
 if(!me){try{newsAdd(p,"promo",res,true)}catch(x){}return""}
 Q.push({t:"Xét tấn phong bên giường bệnh",who:pMe(),h:`<p>Ngươi lâm bệnh nguy kịch. Hoàng thượng thương xót, cho Nội vụ phủ xét tấn phong ${rk} ngay bên giường bệnh theo công đức xưa nay.</p>${kitRows([
  ["Bệnh",typeof illName==="function"?illName(S):"nguy kịch"],["Điều kiện",`đủ cả ${pbFullRows(S).length} điều`],["Nội vụ phủ xét",`${r.total} phần, mức đỗ ${r.P.bar}`],["Kết quả",res]])}`,btn:"Tạ ân"});/* a word the kit keeps as the closing button (it turns «Đã rõ» into the ✕) */
 return dec?`<b class="g">${res}</b> `:res+" "}

/* ---------- (3) truy phong ---------- */
/* fix r1 (review FAIL 1, laws 6/8, OD ~07:15Z «no crime»): only an honourable death is examined. The death mark p.dieK (j8 dieMk, set at every death
   site) must be one of BAL.promoR.sp.tp.okK; a crime (ban chết, xử tử …), a disgrace (tự vẫn, chết trong lãnh cung …), a life that left the palace (nun,
   fled, left) or an unmarked death (no record) gets no truy phong: the Emperor does not honour the person he condemned. */
function pbTpBar(p){const k=p&&p.dieK;if(p&&(p.nun||p.fled||p.left))return"left";if(k==null)return"none";return (BAL.promoR.sp.tp.okK||[]).includes(k)?"":k}
function pbTp(p){const T=BAL.promoR.sp.tp;if(!T||!T.on||!exOn()||!p||p.pbTp!=null)return null;p.pbTp=0;if(p.out||p.coop||rkOf(p)>=6)return null;
 const bar=pbTpBar(p);if(bar){window.__pbN=window.__pbN||{};window.__pbN.tpBar=(window.__pbN.tpBar||0)+1;return{ok:0,bar}}
 const miss=pbFullRows(p).filter(x=>!x[0]).map(x=>x[1]);if(miss.length)return{ok:0,miss};const r=exSimC(p);if(!r.pass)return{ok:0,r};
 p.pbTp=rkOf(p)+1;window.__pbN=window.__pbN||{};window.__pbN.tp=(window.__pbN.tp||0)+1;return{ok:1,rk:RANKS[p.pbTp].n,r}}
function pbTpLine(p,x){const nm=p===S?"ngươi":"nàng";if(x.ok)return `Nội vụ phủ xét công đức lúc sinh thời, truy tặng ${nm} làm ${x.rk}.`;
 if(x.bar)return x.bar==="crime"?`${p===S?"Ngươi":"Nàng"} chết vì mang tội, Hoàng thượng không truy phong người đã bị xử.`:x.bar==="disgrace"?`${p===S?"Ngươi":"Nàng"} chết trong ô danh, Nội vụ phủ không xét truy phong.`:"Nội vụ phủ không xét truy phong.";
 if(x.miss)return `Nội vụ phủ xét: chưa đủ điều kiện truy phong (${x.miss[0]}${x.miss.length>1?`, còn ${x.miss.length-1} điều nữa`:""}).`;return `Nội vụ phủ xét: công đức chưa đủ để truy phong (${x.r.total} phần, mức ${x.r.P.bar}).`}
/* NPC deaths (host / solo): the month after; an old save marks the dead it already has as done (no burst of news) */
function pbTpNpc(){const P=pbSt();let ev="";if(!P.tpV){P.tpV=1;for(const v of rivals)if(v.alive===false&&v.pbTp==null)v.pbTp=0;return""}
 for(const v of rivals){if(v.alive!==false||v.pbTp!=null||v.coop)continue;const x=pbTp(v);if(x&&x.ok){const t=`Truy phong: ${pbTpLine(v,x).replace("nàng",v.name)}`;try{newsAdd(v,"promo",t,true)}catch(e){}ev+=t+" "}}return ev}
/* her death: the title (or why not) in the «Kiếp này» panel (kit section + kit rows) */
(function(){if(typeof over!=="function")return;const o0=over;over=function(h,t,fate,alive){let x=null;
 try{if(S&&!S.dead&&BAL.promoR&&S.dieK==null)dieMk(S,`${h||""} ${fate||""}`)}catch(e){}
 try{if(S&&!S.dead&&BAL.promoR&&!S.out&&!(typeof isSrv==="function"&&isSrv())&&!(S.succ&&S.succ.on)&&!(typeof overAlive==="function"&&overAlive(fate,alive)))x=pbTp(S)}catch(e){console.error("pbTp",e)}
 const r=o0.apply(this,arguments);
 try{if(x){const m=Q.find(q=>q&&/(^|\s)end(\s|$)/.test(q.cls||""));if(m){m.h+=`<div class="kpsec kend-tp"><h4 class="kpst">Truy phong</h4>${kitRows([["Truy phong",pbTpLine(S,x),"t"]])}</div>`;if(Q[0]===m&&!$("modal").hidden)showModal()}}}catch(e){console.error("pbTp end",e)}
 return r};window.over=over})();
window.pbHhMeList=pbHhMeList;window.pbHhMeOpen=pbHhMeOpen;window.pbHhMeDo=pbHhMeDo;window.pbDeath=pbDeath;window.pbTp=pbTp;window.pbTpNpc=pbTpNpc;window.pbFullRows=pbFullRows;window.pbEmpKey=pbEmpKey;window.pbKnown=pbKnown;
