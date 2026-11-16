/* ================= jkh: SỨC KHỎE (the Sức ceiling) + the pregnancy bundle (owner 16/11 18:05–19:00Z, review/suc-khoe) =================
   Spec: dev/handover/reports/suc-khoe.md §4.1–4.7 with the owner changes (OD 16/11 18:05Z, 18:08Z, 18:10Z, 18:17Z, 19:00Z):
   1. Sức khỏe = ONLY the Sức MAX ceiling: khOf(p) (age + lasting scars + a healing part) → sucCap(p). Regen speed unchanged; jmort `tired` is off while this is on.
      Every Sức clamp in the game reads sucCap (j1 apply, j8 ap, j3/j76 regen, pets, maid talents, servant / khoa cử roads).
   2. Births, hard births, stillbirths, miscarriages, close births, broken ở cữ, illness, poison lower it; rest, care, a kept ở cữ and thuốc bổ heal
      only the healing part. Ở cữ = BAL.kh.ocuMo month (khOcu, j35 / j22): no conception; the old ×0.7 cut is gone.
   3. Preterm (month 8 / 9) and overdue (a month late) in pregMonthP; miscarriage causes (walking, rain, heavy work, low Sức) as one capped table.
      Childbirth death is untouched (owner 19:00Z: same formula for all, jmort.js); preterm babies and the overdue risk are as specified.
   4. 'Lệch sổ': a birth that does not match the Kính sự phòng book becomes a public fact; rivals with a motive collect chứng cứ (evA) and demand
      the existing blood test (jroute rtNgSet for her child, the NPC twin khNgNpc for theirs). The truth decides; danger only if someone rigs the bowl.
      Two-way: she gets the same fact and may demand the test on an NPC's child (the existing PEND.rtNgNpc dialog).
   5. Thuốc thúc sinh (owner PARKING_LOT #1): a woman whose affair child was conceived later than the night in the book takes it in the month the
      book says she is due: the baby is born really early (preterm baby risk), but it looks full-term (no lệch sổ). NPCs in that spot take it too.
   Same functions for her and every NPC consort (OD:L1386). Co-op: NPC rolls host-only (as jmort); her own health is local saved state.
   Old saves: khScar missing → oldScar × children already born, no healing part. Every number: BAL.kh / BAL.preT / BAL.pgRisk (jbal2.js). */
function khB(){return typeof BAL==="object"&&BAL.kh&&BAL.kh.on?BAL.kh:null}
function khAge(p){return p===S?S.age:(p&&p.age)||20}
function khInit(p){const K=khB();if(!K||!p||p.khScar!=null)return;p.khScar=K.oldScar*((p.kids||[]).length);p.khTmp=0}
/* Sức khỏe 0–100 */
function khOf(p){const K=khB();if(!K||!p||typeof p!=="object")return 100;khInit(p);
 return Math.max(K.capMin,Math.round(100-Math.max(0,khAge(p)-K.ageFrom)*K.agePer-(p.khScar||0)-(p.khTmp||0)))}
/* the Sức ceiling every clamp reads */
function sucCap(p){const K=khB();if(!K||!p||typeof p!=="object")return 100;return Math.min(100,Math.round(K.maxBase+K.maxPer*khOf(p)))}
/* ở cữ: no conception for BAL.kh.ocuMo month(s) after a birth (everyone) */
function khOcu(p){p=p||S;const n=khB()?khB().ocuMo:1;return p.lastBirth!=null&&S.turn-p.lastBirth<n}/* lastBirth = the month the birth fell in; months 0..n-1 after it = n months (review r1: was <=, 2 months) */
function khFit(p){if(p&&typeof p.suc==="number")p.suc=Math.min(p.suc,sucCap(p))}
function khHit(p,tmp,scar){const K=khB();if(!K||!p)return;khInit(p);if(tmp)p.khTmp=Math.max(0,Math.min(K.tmpMax,(p.khTmp||0)+tmp));if(scar)p.khScar=(p.khScar||0)+scar;khFit(p)}
function khTonic(p){const K=khB();if(!K||!p)return;if(p.khTon===S.turn&&(p.khTonN||0)>=K.tonicMo)return;if(p.khTon!==S.turn){p.khTon=S.turn;p.khTonN=0}p.khTonN++;khHit(p,-K.tonic,0)}
/* care sources = the jmort ones (one core: BAL.mort.life) */
function khCareN(p){const L=BAL.mort&&BAL.mort.life;if(!L||!p)return 0;return (p.suc>=L.careSuc?1:0)+(p.doctor?1:0)+(p.arts&&p.arts.y>=L.careYt?1:0)}
function khGuest(){return !!(window.COOPW&&COOPW.on&&COOPW.seat!=="a")}
/* months by which the book's night lies before the real conception (an affair the book was made to fit by an earlier night) */
function khRecOff(p){if(!p||!p.preg||p.fake||!p.trueFather||p.pregMismatch||p.khBook)return 0;const L=p.nightLog||[],w0=p.pregWk||0;
 if(L.some(w=>Math.abs(w-w0)<=1))return 0;let best=null;for(const w of L){const d=w0-w;if(d>=2&&d<=9&&(best==null||d<best))best=d}return best==null?0:Math.floor(best/3)}
/* miscarriage causes this month (owner 19:15Z) → [extra %, cause words] */
function khPgRisk(p){const G=BAL.pgRisk;if(!G||!p)return[0,""];const why=[];let r=0;
 const k=Math.max(0,(p.pgK||0)-G.freeKhac)*G.khac;if(k>0){r+=k;why.push("đi lại nhiều quá")}
 const w=(p.pgR||0)*G.rain;if(w>0){r+=w;why.push("ra ngoài giữa mưa gió")}
 const s=Math.max(0,(p.pgS||0)-G.freeSuc)*G.work;if(s>0){r+=s;why.push("lao lực")}
 if((p.suc||0)<G.lowSuc2At&&(p.suc||0)>=30){r+=G.lowSuc2;why.push("thân thể suy kiệt")}
 r=Math.min(G.cap,r);if(p.anthai)r/=2;return[r,why.join(", ")]}
function khStat(k){try{(window.__khN=window.__khN||{})[k]=(window.__khN[k]||0)+1}catch(e){}if(typeof rtStat==="function"&&/^ng_/.test(k))rtStat(k)}
/* is this NPC driven to use a 'lệch sổ' birth against the mother? (self-interest: her own son vs a son, a rival for the same rank, deep dislike) */
function khMotive(v,m,k){if(!v||!m||v===m)return false;const vs=(v===S?S.kids:v.kids||[]).some(x=>x.alive&&x.sex==="m");
 return (vs&&k.sex==="m")||(Math.abs(rkOf(v)-rkOf(m))<=1&&aff(v,m)<0)||aff(v,m)<=-30||(v.oan||0)>=45&&m===S}
/* a birth that does not fit the book becomes a public fact */
function khLech(m,k,pre){k.dateOff=pre?"pre":"od";khStat("lech");const P=BAL.preT,w=pre?"sinh non":"sinh quá ngày";
 if(m!==S){k.dateKnown=1;try{noteAdd(m.id,`${k.name} ${w}, ngày sinh lệch với đêm thị tẩm ghi trong sổ Kính sự phòng`)}catch(e){}}
 if(!khGuest())for(const v of liveRivals(true))if(v!==m&&v.alive&&!v.out&&khMotive(v,m,k))evA(v,m,P.evi);
 return m===S?`Trong cung xì xào: ${k.name} ${w}, ngày tháng lệch với sổ Kính sự phòng. `:((S.mat||0)>=1?`Trong cung xì xào: ${k.name} của ${m.name} ${w}, lệch ngày trong sổ Kính sự phòng. `:"")}
/* the NPC twin of the blood test when the child is an NPC's (accuser = an NPC): same truth rule, same bowl tricks */
function khNgNpc(a,m,k){const P=BAL.preT,truth=!k.tf;const alum=!truth&&((m.tamco||0)>=55||roll(25));
 const oil=!alum&&truth&&(/Hiểm|Tâm/.test(a.trait||"")||(a.tamco||0)>=P.oilTc)&&roll(P.oilP);const shown=alum?true:oil?false:truth;k.tfOk=1;khStat("lech_set");khStat("ng_set");
 const seen=(S.mat||0)>=2;
 if(shown){khStat("lech_mix");ap(a,{sung:-10,danh:-8});oanAdd(m,a,40);try{punish(a,"vu cáo phi tần",2)}catch(e){}
  return seen?`${a.name} tâu xin nghiệm máu cho ${k.name} của ${m.name}; máu hòa, ${a.name} mang tội vu cáo. `:""}
 k.alive=false;k.gone=1;khStat(truth?"lech_oan":"lech_lo");if(truth)khStat("ng_oan");const lov=k.tf&&manById(k.tf);if(lov)lov.alive=false;if(roll(50))deathSentence(m,"con không phải cốt nhục hoàng gia");else m.out=true;
 return `<span class="r">${m.name}: trích huyết nghiệm thân, máu ${k.name} không hòa. Nàng bị trị tội.</span>${truth&&(S.mat||0)>=4?` Tai mắt báo: bát nước đã bị ${a.name} nhỏ dầu.`:""} `}
(function(){if(!khB())return;const K=BAL.kh,P=BAL.preT;
/* ---- pregnancy month: preterm / overdue / miscarriage causes / thuốc thúc sinh, then the birth's cost to health ---- */
const p0=pregMonthP;pregMonthP=function(p){if(!p||!p.preg||p.fake||(p!==S&&khGuest()))return p0.apply(this,arguments);
 const me=p===S;let ev="";const c=p.preg;let realM=0;
 /* the drug taken last month: the birth comes now, really early, looking full-term */
 if(p.khInd){p.khInd=0;if(c<9){realM=c+1;p.preg=9;p.khPreM=realM;khStat("drug_birth")}}
 else if((c===7||c===8)&&!p.khOd){let r=(c===7?P.m8:P.m9)+((p.suc||0)<30?P.lowSuc:0)+(khOf(p)<P.khLo?P.lowKh:0)+Math.max(0,khAge(p)-P.ageFrom)*P.age;if(p.anthai)r/=2;
  if(roll(r)){realM=c+1;p.preg=9;p.khPreM=realM;khStat("pre"+realM);ev+=me?`<span class="r">Mới ${realM===8?"tám":"chín"} tháng, ngươi đã trở dạ (sinh non).</span> `:`${p.name} trở dạ sớm (sinh non). `}}
 else if(c===9&&!p.khOd&&roll(P.od)){p.khOd=1;khStat("od");p.pgK=p.pgR=p.pgS=0;return me?"Đã qua chín tháng mười ngày mà ngươi vẫn chưa trở dạ; bà đỡ bảo cứ chờ thêm. ":""}
 /* miscarriage causes (a month that is not the birth month) */
 if(p.preg+1<10){const [x,why]=khPgRisk(p);p.pgK=p.pgR=p.pgS=0;if(x>0&&roll(x)){p.preg=0;p.hidden=false;ap(p,{suc:-20});p.misN=(p.misN||0)+1;khStat("mis_cause");khHit(p,K.mis,K.misScar);p.khBook=0;
  return ev+(me?`<span class="r">Ngươi ${why}, động thai, sảy mất đứa bé.</span> Sức -20. `:`${p.name} động thai, sảy mất đứa bé. `)}}
 p.pgK=p.pgR=p.pgS=0;
 const birth=p.preg+1>=10;const off=birth?khRecOff(p):0,mism=!!p.pregMismatch,od=!!p.khOd;
 const n0=(p.kids||[]).length,s0=p.stillN||0,h0=p.hardN||0,m0=p.misN||0,ch0=p.choiceN||0;
 const br0=birthRisk,st0=BAL.mort&&BAL.mort.birth?BAL.mort.birth.stillP:0;
 if(birth&&od){birthRisk=function(){return br0.apply(this,arguments)*P.odHard};if(BAL.mort&&BAL.mort.birth)BAL.mort.birth.stillP=st0+P.odStill}
 let r;try{r=p0.apply(this,arguments)}finally{birthRisk=br0;if(BAL.mort&&BAL.mort.birth)BAL.mort.birth.stillP=st0}
 ev+=r||"";if(p.preg)return ev;
 /* the pregnancy ended this month: what did it cost? */
 p.khOd=0;p.khPreM=0;p.khBook=0;if((me&&S.dead)||p.alive===false)return ev;
 if((p.misN||0)>m0){khHit(p,K.mis,K.misScar);return ev}
 if(!birth)return ev;
 const close=p.khLastB!=null&&S.turn-p.khLastB<K.closeMo;p.khLastB=S.turn;
 if((p.stillN||0)>s0||((p.choiceN||0)>ch0&&(p.kids||[]).length===n0))khHit(p,K.still,K.stillScar);
 else khHit(p,K.birth+((p.hardN||0)>h0?K.hard:0),K.birthScar+((p.hardN||0)>h0?K.hardScar:0));
 if(close)khHit(p,K.close,K.closeScar);
 p.khOcuT=S.turn;p.khOcuX=0;if(me)ev+=`Thái y dặn: ở cữ một tháng, chớ ra khỏi cung, chớ làm việc nặng. `;
 const nk=(p.kids||[]).slice(n0);realM=realM||(od?11:10);
 for(const k of nk){if(realM<10){k.pre=realM;if(roll(realM<=8?P.die8:P.die9)){k.tho=0;k.thoM=((S.month||1)%12)+1;k.thoO=0;k.nb=1;k.nbWhy="sinh non yếu ớt, không qua khỏi";khStat("pre_die")}}
  if(od&&k.alive!==false){if(roll(P.odOmen)){if(k.sex==="m")ap(p,{danh:P.omenDanh});ev+=me||(S.mat||0)>=1?`Thai quá ngày mới sinh; trong cung đồn ${k.name} là điềm thánh nhân giáng thế. `:""}
   else ev+=me?`Thai quá ngày mới sinh; có kẻ rỉ tai đó là điềm chẳng lành. `:""}
  if(!mism&&realM+off!==10&&!k.gone)ev+=khLech(p,k,realM+off<10)}
 return ev};
/* ---- each month, per person: illness / poison / healing / the ở cữ month (her and NPCs; NPC rolls on the host) ---- */
const i0=illMonthP;illMonthP=function(p){let ev=i0.apply(this,arguments);try{if(!p||p.alive===false||(p===S&&S.dead)||(p!==S&&khGuest()))return ev;khInit(p);
 const i=illOf(p);if(i)khHit(p,K.illSt*(i.st||1),0);
 if((p.sick||0)>0){khHit(p,K.sick,p.khPois?0:K.poisonScar);p.khPois=1}else p.khPois=0;
 if(!i&&!(p.sick>0)&&p.khTmp>0)khHit(p,-(K.rec+K.recCare*khCareN(p)),0);
 if(p.khOcuT!=null&&S.turn-p.khOcuT>=K.ocuMo){const broke=p.khOcuX;p.khOcuT=null;p.khOcuX=0;
  if(broke){khHit(p,0,K.ocuScar);khStat("ocu_broken");if(roll(K.ocuIll))ev+=catchIll(p,"hausan")||"";else if(p===S)ev+="Ở cữ không trọn, thân thể ngươi hao tổn. "}
  else{khHit(p,-K.ocu,0);khStat("ocu_kept");if(p===S)ev+="Ở cữ trọn tháng, thân thể ngươi hồi lại phần nào. "}}
 if(!illOf(p)&&khOf(p)<K.illLo&&roll(K.illP)){const sea=SEASON[S.month-1];const L=Object.entries(ILL).filter(([k,d])=>d.sea&&d.sea.includes(sea));ev+=catchIll(p,L.length?pick(L)[0]:"phonghan")||""}
 khFit(p)}catch(e){console.error(e)}return ev};
/* ---- her moves: walking while pregnant (khắc, rain) and the ở cữ month ---- */
const g0=goTo;goTo=function(k){const from=S&&S.place;let tc=0;try{tc=from&&k!==from?travel(from,k):0}catch(e){}const r=g0.apply(this,arguments);
 try{if(S&&from!==S.place&&S.place===k){if(S.preg&&!S.fake){S.pgK=(S.pgK||0)+tc;if(harsh())S.pgR=(S.pgR||0)+1}
  if(S.khOcuT!=null&&k!=="home"&&!S.khOcuX){S.khOcuX=1;log("Đang ở cữ mà ra khỏi cung, gió độc dễ nhập vào người.")}}}catch(e){}return r};
/* ---- her cards: Sức spent (pregnancy work, ở cữ), thuốc bổ heals ---- */
const a0=act;act=function(i){const a=deck&&deck[i];const was=a&&a.done;const r=a0.apply(this,arguments);
 try{if(a&&!was&&a.done&&S&&!S.dead){const s=a.c&&typeof a.c==="object"?-(a.c.suc||0):0;
  if(s>0){if(S.preg&&!S.fake)S.pgS=(S.pgS||0)+s;if(S.khOcuT!=null&&s>=K.ocuHeavy&&!S.khOcuX){S.khOcuX=1;log("Đang ở cữ mà làm việc nặng, thân thể dễ sinh bệnh hậu sản.")}}
  if(/thuốc bổ/i.test((a.n||"")+" "+(a.t||"")))khTonic(S)}}catch(e){console.error(e)}return r};
/* ---- the world each month: rivals with chứng cứ demand the blood test on a 'lệch sổ' child; NPCs take the drug in that spot ---- */
window.khWorld=function(){let ev="";if(!S||S.dead||khGuest())return ev;
 for(const v of liveRivals(true))if(v.preg&&!v.fake&&!v.khInd){const o=khRecOff(v);if(o>=1&&v.preg===9-o&&roll(P.npcDrug)){v.khInd=1;khStat("drug_npc")}}
 const moms=[S].concat(liveRivals(true));
 for(const m of moms){if(m!==S&&(!m.alive||m.out))continue;if(m===S&&S.out)continue;for(const k of (m===S?S.kids:m.kids)||[]){if(!k.alive||!k.dateOff||k.tfOk||(k.age||0)>P.ageMax)continue;
  if(m===S&&S.rt&&S.rt.ng)break;
  const acc=liveRivals(true).find(v=>v!==m&&v.alive&&!v.out&&khMotive(v,m,k)&&evG(v,m)>=P.accEv&&(typeof rtGateT!=="function"||rtGateT(v,m,"accuse").ok));
  if(!acc||!roll(P.accP))continue;
  if(m===S){khStat("lech_set");if(typeof rtNgSet==="function"){rtNgSet(k,acc.id);ev+=`${acc.name} cầm chuyện ${k.name} lệch ngày trong sổ Kính sự phòng, tâu xin trích huyết nghiệm thân. `}}
  else ev+=khNgNpc(acc,m,k);break}}return ev};
const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{ev+=khWorld()}catch(e){console.error(e)}return ev};
window.monthTick=monthTick;
/* ---- her cards: thuốc thúc sinh; the blood test on an NPC's 'lệch sổ' child (kit card rtCard, the existing PEND.rtNgNpc dialog) ---- */
const d0=deal;deal=function(){d0.apply(this,arguments);try{if(!S||S.out||S.dead||!S.preg||S.fake||S.khInd)return;const o=khRecOff(S);if(o<1||S.preg<9-o||S.preg>8)return;const D=P.drug;
 deck.unshift({n:"Uống thuốc thúc sinh",t:"Bài thuốc giục sinh, cho đứa bé ra đời đúng ngày sổ Kính sự phòng ghi.",c:{bac:-D.bac},o:od(D.o+(S.arts.y||0)*D.perY),w:{},l:{suc:-D.sucF},
  x:`tháng tới trở dạ, đúng ngày trong sổ · đứa bé thật ra sinh non, dễ yếu · hỏng: Sức -${D.sucF}`,dom:"Sức khỏe",go:()=>{S.khInd=1;apply({suc:-D.suc});khStat("drug_me")}})}catch(e){console.error(e)}};
if(typeof rtCards==="function"){const r0=rtCards;rtCards=function(){let A=r0.apply(this,arguments);try{if(!rtRoad()||S.out||(window.__bot&&!window.__rtGo))return A;
 for(const v of liveRivals(true)){const k=(v.kids||[]).find(x=>x.alive&&x.dateOff&&x.dateKnown&&!x.tfOk&&(x.age||0)<=P.ageMax);if(!k)continue;if(A.some(c=>c.rtId==="ngn_"+v.id))continue;
  A.push(rtCard({id:"ngl_"+v.id,n:`Tâu xin nghiệm thân ${k.name}`,t:`${k.name} của ${v.name} ${k.dateOff==="pre"?"sinh non":"sinh quá ngày"}, lệch ngày trong sổ Kính sự phòng.`,art:RT_ART.con,k:1,
   x:"mở buổi trích huyết nghiệm thân (chọn cách ở bước sau)",kem:"máu hòa thì ngươi mang tội vu cáo",go:()=>{khStat("lech_me");rtPush("rtNgNpc",{v:v.id,k:k.name})}}));break}}catch(e){console.error(e)}return A}}
/* ---- shown: the Sức cell tells its ceiling (HUD title + the Sức help text) ---- */
try{if(typeof HX==="object"&&HX.suc&&!/Sức khỏe/.test(HX.suc))HX.suc+=" Sức khỏe định mức Sức tối đa: tuổi càng cao, sinh nở, bệnh nặng, trúng độc càng hạ mức ấy; nghỉ ngơi, ở cữ trọn tháng, thuốc bổ chỉ bù lại phần hao tạm."}catch(e){}
if(typeof render==="function"){const rn=render;render=function(){const r=rn.apply(this,arguments);try{const c=document.getElementById("hud-suc");if(c&&S){const t=`Sức ${S.suc} · tối đa ${sucCap(S)} (Sức khỏe) · chạm để xem đủ`;if(c.title!==t)c.title=t}}catch(e){}return r}}
/* a new game / an old save: health set once */
const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S){khInit(S);(rivals||[]).forEach(khInit)}}catch(e){}return r};
const z0=deser;deser=function(){const r=z0.apply(this,arguments);try{if(S){khInit(S);(rivals||[]).forEach(v=>{khInit(v);khFit(v)});khFit(S)}}catch(e){}return r};
})();
