/* ================= jpromoh PROMO-HIST ROADS (owner 24/11 ~05:20Z, MAIN 116; history report dev/handover/reports/PROMO-HIST.md §3) =================
   Three promotion roads that history had and the game lacked, each built on the existing hooks (no new system):
   (a) grand occasions = batch grace: Tiết Vạn thọ (its Đại xá month, FEST.vantho.m, j14 coldMonth), Thánh thọ Thái hậu (FEST.thanhtho.m, j71),
       a new Hoàng hậu crowned (the month after), a new reign (the first Tết of a new game's reign) → PROMO_SRC.fest "grace" (jexam promoReward:
       an exam at once with the conditions waived), loss promoCost → phCost (lễ tạ ân, BAL.psk.fest).
   (b) favour: Sủng at the band top while the ordinary road is not complete and the exam is open, rare → PROMO_SRC.sung "grace"; loss ghen (psk.sung).
   (c) deathbed: a consort on the last stage (nguy kịch) of an illness that can kill gets one last decree → PROMO_SRC.death "direct" (exDirectUp);
       loss: Hoàng hậu oán + palace ghen (psk.death).
   LAW 1: one function (phTry) for her and every living NPC consort. LAW 4: every number in BAL.promoH + BAL.psk (jbal2). LAW 5: odds fall with rank.
   One decree a month per person, one step only, never past Hoàng quý phi, seats apply (grace pass waits for a seat; deathbed needs a free seat).
   Co-op: the occasion is a world draw (year + era), so both seats see the same ân chiếu; NPCs roll on the host only (rivalsMonth rule) and their
   lines reach the guest in the week's news (COOPW.news); each seat's own roll is personal (her S, like exTick).
   Result lines say WHY (OD 24/11 ~04:20Z): the occasion, why she was chosen (Sủng / illness), and the loss. Output = the month news + log + newsAdd
   (existing kit outputs, no new UI). State: S.ph {t, q, rg, oc}, p.phT (month of her last PROMO-HIST grant), p.phS (favour cd), p.phD (deathbed done). */
const PROMO_GW={vantho:"nhân tiết Vạn thọ",thanhtho:"mừng Thánh thọ Thái hậu",laphau:"mừng lập Hoàng hậu",reign:"nhân tân đế cải nguyên",sung:"được sủng ái hơn người"};
function phB(){return BAL.promoH}
/* world draw 0..99 for an occasion of a year: the same on every seat of a co-op room (no Math.random), different for every Emperor */
function phH(k){const E=S.emp||{},lk=E.likes||{};const s=`${k}:${S.year}:${E.era||""}:${lk.flower||""}:${lk.music||""}:${lk.dish||""}:${[].concat(E.traits||[]).join()}`;/* the Emperor of THIS world (era + his likes + traits: drawn per life, shared by the co-op seats via the world S.emp) */let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0)%100}
function phQK(){const q=typeof queenP==="function"?queenP():null;return q?(q===S?"S":String(q.id!=null?q.id:q.name)):""}
function phGuest(){return !!(window.COOPW&&COOPW.on&&COOPW.seat&&COOPW.seat!=="a")}
function phSt(){if(!S.ph||typeof S.ph!=="object")S.ph={t:S.turn,q:phQK(),rg:0};return S.ph}
/* the occasions of this month (computed once per month, shared by her roll and the NPC rolls) */
function phOcc(){const P=phSt();if(P.oc&&P.oc.t===S.turn)return P.oc.L;const B=phB().fest,L=[];const F=typeof FEST!=="undefined"?FEST:{};
 const on=k=>phH(k)<B.occ[k].p;
 if(F.vantho&&S.month===+F.vantho.m&&on("vantho"))L.push("vantho");
 if(F.thanhtho&&!S.thDead&&S.month===+F.thanhtho.m&&on("thanhtho"))L.push("thanhtho");
 const qk=phQK();if(qk&&P.q!==qk&&P.q!=null&&on("laphau"))L.push("laphau");P.q=qk;
 if(!P.rg){const t0=S.ps&&S.reign&&S.reign.t0!=null?S.reign.t0:null;
  if(t0==null||S.turn-t0>B.reignWin)P.rg=1;else if(S.turn>t0&&F.newyear&&S.month===+F.newyear.m){P.rg=1;if(on("reign"))L.push("reign")}}
 P.oc={t:S.turn,L};return L}
function phWhyOcc(k){const q=typeof queenP==="function"?queenP():null;const era=(S.emp&&S.emp.era)||"";
 return {vantho:"Tiết Vạn thọ mừng thánh đản, Hoàng thượng ban ân chiếu khắp hậu cung",thanhtho:"Thánh thọ Thái hậu, Hoàng thượng ban ân cho hậu cung để mừng thọ mẫu hậu",
  laphau:`${q?(q===S?"ngươi":q.name):"tân Hoàng hậu"} vừa được lập làm Hoàng hậu, ân chiếu ban khắp lục cung`,reign:`năm đầu niên hiệu ${era}, tân đế ban ân cho người cũ trong hậu cung`}[k]||""}
/* who can be chosen at all (same for her and every NPC) */
function phAlive(p){return p===S?!S.dead&&!S.out&&!(S.succ&&S.succ.on)&&!(typeof exSrv==="function"&&exSrv(S)):p&&p.alive!==false&&!p.out&&!p.coop}
function phBase(p){return typeof exOn==="function"&&exOn()&&phAlive(p)&&!p.confined&&!p.queen&&rkOf(p)<6&&p.phT!==S.turn}
function phGraceOpen(p){if(!phBase(p))return false;const e=exS(p);return !e.pass&&e.grace!==e.to&&!(e.cd>S.turn)&&!e.pend}
function phSungTop(p){const B=phB().sung,s=BAL.promo.s;return (p.sung||0)>=s[Math.min(s.length-1,rkOf(p)+B.over)]}
function phRoadDone(p){try{return promoReqP(p).every(x=>x[0])}catch(e){return false}}
function phIllEnd(p){const i=typeof illOf==="function"?illOf(p):null;return !!(i&&i.st>=STG.length-1&&ILL[i.k].die)}
function phOdds(o,p,k){return o[Math.max(0,Math.min(o.length-1,rkOf(p)))]+(p.sung||0)*(k||0)}
/* the ONE roll per person and month: deathbed first (it cannot wait), then a grand occasion, then favour */
function phTry(p,occ){const H=phB(),me=p===S;let t="";
 if(phBase(p)&&!p.phD&&phIllEnd(p)&&typeof seatFree==="function"&&seatFree(rkOf(p)+1)&&roll(phOdds(H.death.o,p,H.death.sungK))){
  const i=illOf(p);p.phD=1;const r0=rkOf(p);t=promoReward(p,"death",{fx:me?1:0,ill:ILL[i.k].n});if(rkOf(p)>r0){p.phT=S.turn;return phLine(p,"death",t,{ill:ILL[i.k].n,r0})}}
 for(const k of occ){if(!phGraceOpen(p)||S.turn-(p.lastPromo||0)<H.fest.gap)break;
  if(roll(phOdds(H.fest.o,p,H.fest.sungK))){t=promoReward(p,"fest",{gw:k});if(t){p.phT=S.turn;return phLine(p,"fest",t,{k})}}}
 if(phGraceOpen(p)&&phSungTop(p)&&!phRoadDone(p)&&!(p.phS>S.turn)&&roll(phOdds(H.sung.p,p))){t=promoReward(p,"sung",{gw:"sung"});if(t){p.phT=S.turn;p.phS=S.turn+H.sung.cd;return phLine(p,"sung",t,{})}}
 return ""}
/* the WHY clause (who chose her and for what) */
function phLine(p,src,t,o){const me=p===S,nm=me?"ngươi":p.name,sg=`Sủng ${p.sung||0}`;let why="";
 if(src==="fest")why=`${phWhyOcc(o.k)}; bệ hạ chọn ${nm} vì đang được để mắt (${sg})`;
 else if(src==="sung")why=`${sg} đã quá mức cần cho ${RANKS[Math.min(RANKS.length-1,rkOf(p)+phB().sung.over)].n}, bệ hạ muốn nâng ${nm} dù đường sắc phong thường chưa đủ`;
 else why=`${nm} lâm ${o.ill.toLowerCase()} ${STG[STG.length-1]}, Hoàng thượng thương xót ban ân lần cuối (${sg})`;
 const line=`${t}Lý do: ${why}. `;
 if(!me)try{newsAdd(p,"promo",line,true)}catch(e){}
 window.__phN=window.__phN||{fest:0,sung:0,death:0,me:0,npc:0};window.__phN[src]++;window.__phN[me?"me":"npc"]++;
 const c=line.indexOf(":")+1;return me&&src!=="death"&&c>0?`<b class="g">${line.slice(0,c)}</b>${line.slice(c)}`:line}/* her grace line: the occasion in gold, as the decree lines */
/* the loss of each road (jexam promoCost → here); NPC by the same rule */
function phCost(p,src,o){const B=BAL.psk,me=p===S;let t="";
 if(src==="fest"){const n=Math.max(0,Math.min(p.bac||0,Math.round(B.fest.bacM*(BAL.pay[Math.min(BAL.pay.length-1,rkOf(p))]||0))));if(n)ap(p,{bac:-n});
  t=`Lễ tạ ân dâng lên: Bạc −${n}. `}
 else if(src==="sung"){if(me){ghenAll(B.sung.ghen,"ngươi được ân riêng");t=`Lục cung ghen vì ngươi được ân riêng (ghen +${ghenN(B.sung.ghen)}). `}
  else{for(const v of consorts())if(v!==p&&!v.out)oanAdd(v,p,B.sung.oan);t=`Lục cung để bụng ${p.name} (oán +${B.sung.oan}). `}}
 else if(src==="death"){const q=typeof queenP==="function"?queenP():null;if(q&&q!==p)oanAdd(q,p,B.death.hhOan);
  const hq=q&&q!==p?`Hoàng hậu cho là ghế trên lên không qua tay bà (oán +${B.death.hhOan}); `:"";
  if(me)t=`${hq}lục cung ghen (ghen +${ghenN(B.ghen)}). `/* the palace jealousy = exDirectUp o.fx (BAL.psk.ghen), not twice */
  else{for(const v of consorts())if(v!==p&&v!==q&&!v.out)oanAdd(v,p,B.death.oan);t=`${hq}lục cung để bụng ${p.name} (oán +${B.death.oan}). `}}
 return t}
/* the month: her own roll (every seat), then the NPCs (solo / co-op host only; their lines also go to the guest's news) */
function phMonth(){if(!S||S.dead||!BAL.promoH)return"";const P=phSt();if(P.m===S.turn)return"";P.m=S.turn;const occ=phOcc();let ev="",nv="";
 try{ev+=phTry(S,occ)}catch(e){console.error("promoH",e)}
 if(!phGuest())for(const v of rivals.slice()){try{nv+=phTry(v,occ)}catch(e){console.error("promoH",e)}}
 if(nv&&window.COOPW&&COOPW.on&&!phGuest())COOPW.news=(COOPW.news||"")+nv;return ev+nv}
(function(){if(typeof monthTick!=="function")return;const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments)||"";try{if(S&&!S.dead)ev+=phMonth()}catch(e){console.error("promoH",e)}return ev}})();
/* the ONE rule text gains the three roads (j6 / jtabs help, read from BAL so a tune moves it) */
(function(){if(typeof promoRuleTxt!=="function")return;const r0=promoRuleTxt;promoRuleTxt=function(){return r0.apply(this,arguments)+` Dịp đại lễ (Vạn thọ, Thánh thọ Thái hậu, lập Hoàng hậu, tân đế cải nguyên): Hoàng thượng có khi ân cho vài người dự khảo hạch ngay, phải dâng lễ tạ ân. Được sủng quá mức cần cho ${phB().sung.over} bậc trên: có khi được ân thi riêng, lục cung ghen. Lâm bệnh ${STG[STG.length-1]}: có khi được tấn phong một bậc lần cuối, Hoàng hậu để bụng.`}})();
/* in-page testing (dev/test/promo-hist.js) */
window.phDebug=function(){return{ph:S&&S.ph,n:window.__phN||null}};
window.phForce=function(occ){if(!S)return"";S.ph=S.ph||{};const P=phSt();P.m=null;P.oc={t:S.turn,L:occ||[]};return phMonth()};
window.PROMO_GW=PROMO_GW;window.phTry=phTry;window.phCost=phCost;window.phMonth=phMonth;window.phOcc=phOcc;
