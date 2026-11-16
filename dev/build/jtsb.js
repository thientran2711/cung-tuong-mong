/* ================= jtsb: LÔ B (Top 15 đào sâu, sếp duyệt 15/11 02:00Z) — luật chơi + sự kiện, hai chiều, trừu tượng =================
   1. Thả thú dữ làm hại dung nhan (act "thathu", Hại nặng): dùng hủy dung j70 (scar70 / vết cào 1-2-3) khi có, nếu chưa gộp j70 thì
      dùng bản dự phòng cùng dạng p.scar (KIT_SCAR vẽ được). NPC nhắm vào nàng: mưu được hẹn trước (TSB threat), có ĐIỀM BÁO,
      nàng phòng được (canh giữ, soát quanh cung, giao kẻ hầu tin cẩn, chó nhỏ canh cửa). NPC bị nhắm cũng theo cùng luật.
   7. Thú nuôi (p.pets / p.petOn): nguồn thật (Hoàng thượng ban khi được sủng, nhờ thái giám mua, nam nhân có cảm tình gửi tặng),
      tối đa một con theo hầu: +1 một Tư chất; chăm mỗi tuần, bỏ bê thì có điềm báo rồi mới mất; kẻ thù có thể thả thú đi (act "thaopet").
   8. Ấn tượng đầu: lần đầu thấy mặt một phi tần vốn đã ghen / oán / ghét nàng (số thật), nàng ta lộ ra qua lời và thái độ; thẻ 4 lựa chọn.
   9. Ép nộp của (act "batnat", Hại nhỏ; mở rộng "uyhiep" của j78): kẻ phẩm cao đòi bạc HOẶC một món nàng thật có (kể cả đồ đang đeo);
      thẻ Giao / Không giao; lần sau mở thêm Báo lên, Nhờ che chở, Dùng chứng cứ đáp trả. Sổ đồ mất ghi ai lấy. NPC cùng luật.
   13. Hỏa hoạn: nguyên nhân thật (đèn nến mùa hanh khô, kẻ hầu lơ là, kẻ thù phóng hỏa "phonghoa"), điềm báo trước, cách phòng;
      lửa chỉ đốt đồ cháy được (vải, giấy, hương, gỗ), Ngự tứ / ngọc / vàng không cháy; Sổ đồ mất ghi đúng món và nguyên do.
   Mọi thẻ: hàng Cần (data-kneed) / Tốn / Được / Mất / Kèm + chữ cơ may; thẻ kết quả sau mỗi lựa chọn (wrapR chooseM).
   ===================================================================================================================================== */
const TSB={now:0,ver:1};
function tsbOn(){try{return !!S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())}catch(e){return false}}
function tsbBot(){return !!window.__bot}
function tsbNm(v){if(!v)return"";if(v===S)return"ngươi";try{return typeof k61Named==="function"&&!k61Named(v)?k61Desc(v):`${rkName(v)} ${v.name}`}catch(e){return v.name}}
function tsbCap(s){s=String(s||"");return s?s[0].toUpperCase()+s.slice(1):s}
function tsbWk(){try{return wk()}catch(e){return 0}}
function tsbMaid(p){p=p||S;const s=(p===S?(S.staff||[]):[]).filter(x=>(x.loyal||0)>=60).sort((a,b)=>b.loyal-a.loyal)[0];if(s)return s;return p.maid&&(p.maid.loyal||0)>=60?p.maid:null}
function tsbLedger(e){if(!S)return;S.tsbLog=S.tsbLog||[];S.tsbLog.unshift(Object.assign({w:tsbWk(),when:typeof when==="function"?String(when()).replace(/<[^>]+>/g,""):""},e));if(S.tsbLog.length>40)S.tsbLog.length=40}
function tsbShow(){try{if(!tsbBot()&&$("modal").hidden)showModal()}catch(e){}}
/* one event card (saveable through PEND): full act-card rows on every option (owner 07:15Z), people on the picture, rows layout */
function tsbCard(pid,pp,title){const d=mkP(pid,pp);if(!d)return false;Q.push({t:title||d.title||"Việc trong cung",h:d.t,opts:d.o,stage:d.stage,headArt:d.headArt,who:d.who&&typeof pv==="function"?pv(d.who):undefined,optLayout:"rows",showOut:true,pid:d.pid,pp:d.pp});tsbShow();return true}
(function(){const d0=deserQ;deserQ=function(L){const out=d0.apply(this,arguments);try{out.forEach(q=>{if(q.pid&&/^tsb/.test(q.pid)){const d=mkP(q.pid,q.pp);if(d){q.stage=d.stage;q.headArt=d.headArt;q.optLayout="rows";q.showOut=true;if(d.title)q.t=d.title;if(d.who&&typeof pv==="function")q.who=pv(d.who)/* reload keeps the speaker face */}}})}catch(e){}return out}})();
/* the Cần row on dialog options: opt.need=[{t,ok}] -> data-kneed (j63 kaNorm1 reads it) */
function tsbNeedMark(){try{const m=Q[0];if(!m||!m.opts||!m.opts.some(o=>o&&o.need))return;document.querySelectorAll("#modal .opts button[data-m]").forEach(b=>{if(b.dataset.ka==="1")return;const o=m.opts[+b.dataset.m];if(!o||!o.need||!o.need.length)return;b.dataset.kneed=encodeURIComponent(JSON.stringify(o.need));if(o.need.some(n=>!n.ok))b.disabled=true})}catch(e){}}
(function(){const f0=kitFix;kitFix=function(root){tsbNeedMark();return f0.apply(this,arguments)}})();
/* an option whose Cần is unmet cannot be taken (its button is disabled); a direct call (bot, co-op) falls back to the first allowed option, never a dead end */
(function(){const c0=chooseM;chooseM=function(i){try{const m=Q[0];const o=m&&m.opts&&m.opts[i];if(o&&o.need&&o.need.some(n=>!n.ok)){const j=m.opts.findIndex(x=>!x.need||x.need.every(n=>n.ok));if(j>=0)return c0.call(this,j)}}catch(e){}return c0.apply(this,arguments)}})();
function tsbArt(f,label){return{src:`img/${f}.webp`,label:label||""}}
function tsbNeedKhac(c){return j76need(c)} /* the day's khắc (j76): spills into the next buổi */
function tsbNeedBac(n){return{t:`Bạc ${n} (có ${S.bac})`,ok:S.bac>=n}}
function tsbKh(c){if(typeof j76spills==='function'&&j76spills(c)){spend(c);return}const n=Math.max(0,Math.min(c,4-used));if(n)spend(n)}

/* ---------------- scars: j70 when present, else the same p.scar shape ---------------- */
const TSB_SCAR=[null,{n:"nhẹ",d:10,sung:4,danh:1,need:4,perm:0},{n:"vừa",d:25,sung:8,danh:3,need:8,perm:3},{n:"nặng",d:45,sung:14,danh:5,need:14,perm:15}];
function tsbScar(t,sev,a){if(typeof scar70==="function")return scar70(t,sev,a,"thu");const L=TSB_SCAR[sev];t.scar={sev,d:L.d,need:L.need,pg:0,veil:0,tr:0,cure:0,by:a?key(a):null,at:tsbWk(),how:"thu"};ap(t,{sung:-L.sung,danh:-L.danh});return L}
if(typeof scarOf!=="function"){/* fallback only while j70 is not merged: Sắc carries the wound, weekly healing (same steps as j70) */
 (function(){const e0=effSac;effSac=function(p){let r=e0.apply(this,arguments);try{if(p&&p.scar&&!window.scarOf)r=cl(r-Math.round(p.scar.d*(p.scar.veil?2/3:1)),0,130)}catch(e){}return r}})();
 window.tsbHeal=function(p){const s=p&&p.scar;if(!s||window.scarOf)return;let st=1;if(p===S?S.doctor:roll(20))st++;s.pg=(s.pg||0)+st;if(s.pg>=s.need){const L=TSB_SCAR[s.sev]||TSB_SCAR[1];if(L.perm)p.sac=Math.max(5,(p.sac||0)-L.perm);p.scar=null;if(p===S)log(`<span class="g">Vết thương trên mặt ngươi đã lành${L.perm?`, còn để lại dấu mờ (Sắc -${L.perm})`:""}.</span>`)}}}
try{if(typeof HDR70!=="undefined")HDR70.thu=[.6,.32,.08]}catch(e){}
const TSB_THU_W=[.6,.32,.08];
function tsbSev(){const x=Math.random();return x<TSB_THU_W[0]?1:x<TSB_THU_W[0]+TSB_THU_W[1]?2:3}

/* ---------------- defences shared by every planned harm (one rule for everyone) ---------------- */
function tsbGuard(t){if(!t)return 0;let g=0;const w=tsbWk();if((t.tsbGuard||0)>=w)g+=25;g+=petGuard(t);if(t===S?tsbMaid(S):(t.maid&&(t.maid.loyal||0)>=70))g+=8;return g}
function tsbThuO(a,t){return cl(Math.round(odA(a,44+(a.tamco||0)/5+(a.mat||0)*3)-tsbGuard(t)),5,90)}
function tsbFireO(a,t){return cl(Math.round(odA(a,46+(a.tamco||0)/5)-tsbGuard(t)),5,90)}

/* ---------------- 1. Thả thú dữ (Hại nặng) ---------------- */
A("thathu","Thả thú dữ làm hại dung nhan",{c:{bac:-40,duc:-6},ok:(a,t)=>(a.bac||0)>=40&&!t.scar&&!t.out,o:(a,t)=>tsbThuO(a,t),x:"Sắc nàng giảm mạnh tới khi lành, Sủng và Danh giảm",
 f:(a,t)=>{ap(a,{bac:-40,duc:-6});a.schemes=(a.schemes||0)+1;const c=caught(a,t,false,"mua chuộc người giữ thú thả thú dữ vào cung "+NM(t));if(c)return c;
  if(!roll(tsbThuO(a,t))){const e=roll(50);if(e)/*evok: thathu act*/evA(t,a,1);return `Con thú dữ lọt vào cung ${NM(t)} bị người canh chặn kịp, đuổi đi trước khi kịp gây chuyện${e?`; kẻ thả thú bị bắt, khai là người của ${NM(a)} (chứng cứ +1)`:""}. `}
  const sev=tsbSev();const L=tsbScar(t,sev,a);if(t===S){try{feedback("hit")}catch(e){}}
  return `<span class="r">Một con thú dữ không rõ từ đâu lọt vào cung ${NM(t)}, làm tổn dung nhan ${NM(t)} (hủy dung ${L.n}): Sắc -${L.d} tới khi lành, Sủng -${L.sung}, Danh -${L.danh}.</span> `}});
AOUT.thathu=["nàng bị hủy dung (vết cào 1 đến 3 nét), Sắc giảm tới khi lành","thú bị đuổi đi; nàng có thể nắm 1 chứng cứ"];
try{ACTDOM.thathu="Mưu kế";if(typeof ACAUGHT!=="undefined")ACAUGHT.push("thathu")}catch(e){}

/* ---------------- 13. Phóng hỏa kho đồ (Hại nặng) + đồ cháy được ---------------- */
const TSB_BURN_KD=["Vải vóc","Thư từ","Hương liệu","Thuốc bổ"];const TSB_BURN_K=["tranhco","dancoc","demgam","tuithom"];
function tsbBurnable(p){return (p.inv||[]).map((e,i)=>[e,i]).filter(([e])=>{if(!e||e.h||e.w)return false;if(e.wk)return true;const it=IT[e.k];if(!it||it.keep)return false;if(e.nt||e.g===4)return false;return TSB_BURN_KD.includes(it.kd)||TSB_BURN_K.includes(e.k)})}
function tsbItemN(e){try{if(e.wk)return e.wk.n;return iname(e)}catch(x){return e.k}}
function tsbItemArt(e){try{return typeof itemArt==="function"?itemArt(e):null}catch(x){return null}}
function tsbItemGrade(e){const a=tsbItemArt(e);return a&&a.grade!=null?a.grade:0}
/* review/ev-art-fit (owner 15/11): these events showed the ROOM she stands in (tsbPlaceArt) — not what happened. Each now takes its
   meaning group's picture (EVENTS.json category via j89 "cat:<group>"); the room picture stays only for place dialogs (jplace). */
function tsbFitArt(g){try{const id="cat:"+g;const src=typeof evArtOf==="function"?evArtOf(id,(S.year||0)*100+(S.month||0)*3+(S.tuan||0)):"";return src?{src,label:typeof evArtTitle==="function"?evArtTitle(id):""}:undefined}catch(e){return undefined}}
function tsbPlaceArt(){try{const f=evArt();return f?{src:f,label:placeName(S.place||"home")}:undefined}catch(e){return undefined}}
function tsbItemSrc(e){try{const a=tsbItemArt(e);if(a&&a.src)return a.src;if(e.wk)return `img/item-tp-${e.wk.kind||"theu"}-b${(e.wk.ti||0)+1}.webp`;const f=ITIMG[e.k];return kitItemSrc(e.k,f?`img/item-${f}.webp`:`img/item-${e.k}.webp`)}catch(x){return""}}
function tsbBurn(p,n,cause){if((p.tsbSafe||0)>=tsbWk())return[];const L=tsbBurnable(p);const out=[];for(let i=0;i<n&&L.length;i++){const j=R(L.length);const [e]=L.splice(j,1);const ix=p.inv.indexOf(e);if(ix>=0){p.inv.splice(ix,1);out.push(tsbItemN(e));if(p===S)tsbLedger({what:tsbItemN(e),how:"cháy",cause})}}return out}
A("phonghoa","Phóng hỏa kho đồ",{c:{bac:-30,duc:-8},ok:(a,t)=>(a.bac||0)>=30&&!t.out&&tsbBurnable(t).length>0,o:(a,t)=>tsbFireO(a,t),x:"đồ cháy được trong kho nàng bị thiêu (1-2 món)",
 f:(a,t)=>{ap(a,{bac:-30,duc:-8});a.schemes=(a.schemes||0)+1;const c=caught(a,t,false,"sai người phóng hỏa kho đồ của "+NM(t));if(c)return c;
  if(!roll(tsbFireO(a,t))){const e=roll(50);if(e)/*evok: phonghoa act*/evA(t,a,1);return `Lửa vừa bén ở kho đồ của ${NM(t)} đã được chặn kịp, không mất gì${e?`; kẻ phóng hỏa bị bắt, khai là người của ${NM(a)} (chứng cứ +1)`:""}. `}
  const lost=tsbBurn(t,1+(roll(35)?1:0),"có kẻ phóng hỏa (chưa rõ là ai)");t.tsbFire=(t.tsbFire||0)+1;
  if(!lost.length)return `Kho đồ của ${NM(t)} bén lửa nhưng đồ quý đã được cất chỗ khác; không mất gì. `;
  return `<span class="r">Đêm qua kho đồ của ${NM(t)} bốc cháy: mất ${lost.join(", ")}.</span> `}});
AOUT.phonghoa=["đồ cháy được trong kho nàng bị thiêu (1-2 món)","lửa bị dập; nàng có thể nắm 1 chứng cứ"];
try{ACTDOM.phonghoa="Mưu kế";if(typeof ACAUGHT!=="undefined")ACAUGHT.push("phonghoa")}catch(e){}

/* ---------------- 7. Thú nuôi ---------------- */
/* (thú nuôi: dời sang jpet.js — phẩm bậc, xa xỉ, công dụng, đỡ mạng; tsbPets/tsbPetOn/thaopet/tsbPetWeek/tsbPetMonth ở đó) */

/* ---------------- 9. Ép nộp của (mở rộng uyhiep j78: đòi bạc HOẶC một món thật) ---------------- */
function tsbWant(a,t){/* the most valuable thing t really owns that a would want (equipped items count) */const tr=typeof traitsOf==="function"?traitsOf(a):[];const vain=tr.includes("Kiêu ngạo")||tr.includes("Tham lam")||tr.includes("Xa hoa");
 const L=(t.inv||[]).map((e,i)=>[e,i]).filter(([e])=>{if(!e||e.h||e.wk&&!e.wk.n)return false;const it=IT[e.k];if(!it&&!e.wk)return false;if(it&&(it.keep||it.il||it.evi||it.pr<30))return false;if(e.nt||e.g===4)return false;return true})
  .map(([e,i])=>{const it=IT[e.k];let v=e.wk?[20,30,45,70][e.wk.ti||0]:it.pr;if(it&&it.rk>rkOf(a)+1)v*=.4;if(vain&&it&&it.kd==="Trang sức")v*=1.4;if(e.w)v*=1.1;return [e,i,v]}).sort((x,y)=>y[2]-x[2]);return L[0]||null}
function tsbBulPay(a,t){return Math.min(50,Math.max(0,Math.floor((t===S?S.bac:(t.bac||0))*.4)))}
function tsbBulO(a,t,ev){return cl(Math.round(odA(a,42+(rkOf(a)-rkOf(t))*7+(a.tamco||0)/6+(a.danh||0)/10+(ev?evG(a,t)*6:0)-(typeof witOf==="function"?witOf(t)/6:0)-(t===S&&S.shield?12:0))),5,92)}
function tsbBulOK(a,t){return rkOf(a)>rkOf(t)&&!t.out&&(tsbBulPay(a,t)>=10||!!tsbWant(a,t))}
A("batnat","Ép nộp của",{c:{},ok:(a,t)=>tsbBulOK(a,t),o:(a,t)=>tsbBulO(a,t),x:"cậy phẩm cao đòi bạc hoặc một món quý nàng đang có",
 f:(a,t)=>tsbBulNpc(a,t,"batnat")});
AOUT.batnat=["nàng nộp bạc hoặc một món quý; nàng oán ngươi +10","nàng không nộp, kể khắp nơi: Danh -2, nàng oán +12, nàng nắm 1 chứng cứ"];
try{ACTDOM.batnat="Mưu kế"}catch(e){}
function tsbTake(a,t,want,kind){/* real transfer + ledger */if(want){const ix=t.inv.indexOf(want);if(ix<0)return"";const e=t.inv.splice(ix,1)[0];e.w=0;a.inv=a.inv||[];e.tsbFrom=key(t);a.inv.push(e);const n=tsbItemN(e);if(t===S)tsbLedger({what:n,how:"bị lấy",who:a.id,by:tsbNm(a)});return n}
 const g=tsbBulPay(a,t);ap(t,{bac:-g});ap(a,{bac:g});if(t===S)tsbLedger({what:`${g} lượng bạc`,how:"bị lấy",who:a.id,by:tsbNm(a)});return `${g} lượng bạc`}
function tsbBulRec(a,t){t.tsbBul=t.tsbBul||{};const r=t.tsbBul[key(a)]=t.tsbBul[key(a)]||{n:0,calm:0,stop:0};r.n++;r.last=tsbWk();return r}
function tsbBulNpc(a,t,kind){/* an NPC target decides by the same odds (NPC rule) */const o=tsbBulO(a,t,kind==="uyhiep");const want=kind==="uyhiep"?null:(tsbBulPay(a,t)<15||roll(45)?tsbWant(a,t):null);const want2=want&&want[0];const r=tsbBulRec(a,t);

 if(r.n>=2&&evG(t,a)>=1&&roll(45)){const q=queenP();if(q&&q!==a&&q!==t){punish(a,"ức hiếp người dưới phẩm",1);affAdd(q,t,3);return `${tsbCap(tsbNm(t))} bị ${tsbNm(a)} ép nộp của nhiều lần, đem chứng cứ trình Hoàng hậu: ${tsbNm(a)} bị quở phạt. `}}
 if(roll(o)){const n=tsbTake(a,t,want2,kind);if(kind==="uyhiep")evA(a,t,-1);oanAdd(t,a,10);return `${tsbCap(tsbNm(t))} sợ ${tsbNm(a)}, đành nộp ${n}. `}
 if(roll(o)){ap(t,{danh:-4,suc:-5});oanAdd(t,a,12);return `${tsbCap(tsbNm(t))} không chịu nộp, bị ${tsbNm(a)} làm nhục giữa đường: Danh -4, Sức -5. `}
 ap(a,{danh:-2});oanAdd(t,a,12);evA(t,a,1);return `${tsbCap(tsbNm(t))} không chịu nộp của cho ${tsbNm(a)}, còn kể khắp nơi. `}

/* ---------------- the planned harm: NPC -> anyone: scheduled with an omen (thathu, phonghoa) ---------------- */
const TSB_PLAN=["thathu","phonghoa"];
(function(){const r0=runAct;runAct=function(a,t,k){
 try{if(!TSB.now&&a&&a!==S&&t&&TSB_PLAN.includes(k)&&S&&!S.dead){S.tsbTh=S.tsbTh||[];if(!S.tsbTh.some(x=>x.a===key(a)&&x.t===key(t)&&x.k===k)){S.tsbTh.push({k,a:key(a),t:key(t),due:tsbWk()+1+R(2),seen:0});try{deedAdd(a,"plot",t,1,`bày mưu ${deedTxt(k,t)}`)}catch(e){}}return ""}
  if(!TSB.now&&a&&a!==S&&t===S&&(k==="batnat"||k==="uyhiep")&&tsbOn()&&!Q.some(m=>m.pid==="tsbBul")){const r=tsbBulRec(a,S);if((r.stop||0)>tsbWk())return "";const want=k==="uyhiep"?null:(tsbBulPay(a,S)<15||roll(50)?tsbWant(a,S):null);
   tsbCard("tsbBul",{a:a.id,k,ix:want?want[1]:-1,n:r.n},k==="uyhiep"?"Bị uy hiếp đòi của":"Bị ép nộp của");return ""}}catch(e){console.error("tsb runAct",e)}
 return r0.apply(this,arguments)}})();
function tsbThWeek(){const L=S.tsbTh||[];const w=tsbWk();const keep=[];for(const th of L){const a=byKey(th.a),t=byKey(th.t);if(!a||!t||a===t||(a!==S&&(!a.alive||a.out))||(t!==S&&(!t.alive||t.out))){continue}
  if(!th.seen&&w<th.due){/* omen: the target's own eyes; she gets a card, an NPC simply guards */const see=cl(oSee(t)+(petGuard(t)?15:0),5,95);
   if(roll(see)){th.seen=1;if(t===S){if(!Q.some(m=>m.pid==="tsbOmen"))tsbCard("tsbOmen",{k:th.k,a:th.a},"Điềm lạ quanh cung")}else t.tsbGuard=w+2}}
  if(w>=th.due){TSB.now=1;let r="";try{r=runAct(a,t,th.k)||""}catch(e){console.error(e)}finally{TSB.now=0}
   if(t===S&&r){Q.push({t:th.k==="thathu"?"Hung tin trong cung":"Hỏa hoạn",h:`<p>${r}</p>`,headArt:th.k==="phonghoa"?tsbArt("ev-hoa-hoan","Hỏa hoạn"):undefined});log(r);tsbShow()}
   else if(r&&typeof knows==="function"&&knows(t)&&roll(50))log(r);continue}
  keep.push(th)}S.tsbTh=keep}
PEND.tsbOmen=pp=>{if(!S)return null;const a=byKey(pp.a);if(!a)return null;const fire=pp.k==="phonghoa";const mm=tsbMaid(S);const see=S.mat||0;
 const named=see>=3||(S.tsbTh||[]).some(x=>x.a===pp.a&&x.seen&&evG(S,a)>0);
 const sign=fire?`Mấy đêm nay có bóng người lạ quanh kho chứa đồ của ngươi; cửa kho sáng ra thấy khép hờ.`:`Người giữ thú ở Ngự thú viên bị thấy lảng vảng gần cửa sau cung ngươi; đêm qua có tiếng thú lạ ngoài tường.`;
 const who=named?`Tai mắt nói kẻ ấy hay ra vào ${typeof houseName==="function"?houseName(a):"cung"} của ${tsbNm(a)}.`:`Chưa rõ ai đứng sau.`;
 const o=[];const ob=cl(oSee(S)+15,5,95);
 o.push({n:"Canh giữ cửa cung",fx:{},x:`Chắc chắn · tốn: 1 khắc · Bạc -10 (thưởng người thức canh) · thành: mưu nhắm vào ngươi khó thành hơn nhiều trong 2 tuần`,need:[tsbNeedKhac(1),tsbNeedBac(10)],go:()=>{tsbKh(1);apply({bac:-10});S.tsbGuard=tsbWk()+2;log("Ngươi cho người thức canh quanh cung hai tuần.")}});
 o.push({n:"Soát quanh cung",fx:{},x:`${word(ob)} · tốn: 1 khắc · Sức -5 · thành: bắt được dấu vết, mưu bị phá, chứng cứ +1 về kẻ chủ mưu · hỏng: không thấy gì, mưu vẫn còn`,need:[tsbNeedKhac(1)],go:()=>{tsbKh(1);apply({suc:-5});if(roll(ob)){S.tsbTh=(S.tsbTh||[]).filter(x=>!(x.a===pp.a&&x.k===pp.k&&x.t==="me"));/*evok: plot deed at plan time*/evA(S,a,1);try{k61Know(a,"",true,2)}catch(e){}noteAdd(a.id,fire?"sai người định phóng hỏa kho đồ của ngươi (ngươi bắt được dấu vết)":"sai người định thả thú dữ vào cung ngươi (ngươi bắt được dấu vết)");log(`<span class="g">Ngươi cho soát quanh cung, bắt được kẻ lạ: hắn khai là người của ${a.name}. Mưu bị phá. Chứng cứ +1.</span>`)}else log("Ngươi cho soát quanh cung nhưng không thấy gì.")}});
 if(mm)o.push({n:`Giao cho ${mm.name} canh chừng`,fx:{},x:`${word(cl(mm.loyal,5,95))} · thành: như canh giữ cửa cung, không tốn bạc · hỏng: ${mm.name} lơ là, cung vẫn hở`,need:[{t:`kẻ hầu tin cẩn (${mm.name}, Lòng ${mm.loyal})`,ok:true}],go:()=>{if(roll(mm.loyal)){S.tsbGuard=tsbWk()+2;log(`${mm.name} thức canh quanh cung cho ngươi.`)}else log(`${mm.name} hứa canh chừng nhưng ngủ quên.`)}});
 if(fire)o.push({n:"Chuyển đồ quý sang chỗ khác",fx:{},x:`Chắc chắn · tốn: 1 khắc · thành: đồ quý được giữ an toàn nếu kho có cháy trong 2 tuần`,need:[tsbNeedKhac(1)],go:()=>{tsbKh(1);S.tsbSafe=tsbWk()+2;log("Ngươi cho chuyển đồ quý khỏi kho.")}});
 o.push({n:"Bỏ qua",fx:{},x:`Chắc chắn · kèm: nếu có mưu thật, nó vẫn đến`});
 return{t:`<p>${sign} ${who}</p>`,o,headArt:tsbFitArt("chuyen-la"),title:"Điềm lạ quanh cung"}};

/* the bully card (Giao / Không giao + more after the first time), both kinds: batnat (rank) and uyhiep (evidence, j78) */
PEND.tsbBul=pp=>{if(!S)return null;const a=RV(pp.a);if(!a||!a.alive)return null;const ev=pp.k==="uyhiep";const e=pp.ix>=0?S.inv[pp.ix]:null;const want=e&&!e.h?e:null;const g=tsbBulPay(a,S);
 if(!want&&g<5&&!ev)return null;const o0=tsbBulO(a,S,ev);const nm=tsbNm(a);const hate=[];if((a.ghen||0)>=30)hate.push("ghen với ngươi");if(oan(a,S)>=15)hate.push("ôm oán ngươi");
 const what=want?`<b>${tsbItemN(want)}</b>${want.w?" (ngươi đang mặc)":""}`:`${g} lượng bạc`;
 const tile=want&&typeof kitItem==="function"?`<div class="tsbtile">${kitItem({src:tsbItemSrc(want),name:tsbItemN(want),grade:tsbItemGrade(want),size:"md",data:typeof kitItemTap==="function"?kitItemTap({e:want}):""})}</div>`:"";
 const why=ev?`${tsbCap(nm)} nắm ${evG(a,S)} chứng cứ của ngươi, sai người đến nói: muốn chuyện yên thì nộp ${what}.`:`${tsbCap(nm)} cậy phẩm cao hơn ngươi${hate.length?` (nàng ${hate.join(", ")})`:""}, ${together(a,S)?"chặn ngươi giữa đường":"sai cung nữ đến tận cung ngươi"}, đòi ngươi nộp ${what}.`;
 const rep=pp.n>=2?`<p class="past">Đây là lần thứ ${pp.n} nàng làm khó ngươi.</p>`:"";
 const O=[];const lose=want?`${tsbItemN(want)} -1`:`Bạc -${g}`;
 O.push({n:"Giao",fx:{},x:`Chắc chắn · tốn: ${lose} · thành: nàng thôi làm khó ngươi một tháng${ev?" · nàng trả lại 1 chứng cứ":""} · kèm: lần sau dễ bị đòi nữa · (Sổ đồ mất ghi ai lấy)`,go:()=>{const n=tsbTake(a,S,want,pp.k);if(ev)evA(a,S,-1);const r=tsbBulRec(a,S);r.n--;r.stop=tsbWk()+3;log(`Ngươi đành nộp ${n} cho ${nm}.`)}});
 O.push({n:"Không giao",fx:{},x:`${word(100-o0)} · thành: nàng đành thôi, nàng Danh -2 · Danh +1 · hỏng: ${ev?"nàng đem chứng cứ rêu rao, Danh -5":"bị làm nhục giữa đường, Danh -4, Sức -5"} · kèm: nàng oán ngươi +10`,go:()=>{oanAdd(a,S,10);if(roll(o0)){if(ev)apply({danh:-5});else apply({danh:-4,suc:-5});log(`<span class="r">Ngươi không nộp; ${nm} ${ev?"đem chuyện của ngươi rêu rao khắp cung":"làm nhục ngươi trước mặt cung nhân"}.</span>`)}else{ap(a,{danh:-2});apply({danh:1});log(`Ngươi không nộp; ${nm} không làm gì được, đành bỏ đi.`)}}});
 if(pp.n>=2){const q=queenP();const judge=q&&q!==a?"Hoàng hậu":!S.thDead?"Thái hậu":null;const n=evG(S,a);const w=tsbMaid(S);
  if(judge){const or=od(30+n*12+(w?12:0)+(S.danh||0)/6);O.push({n:`Báo lên ${judge}`,fx:{},x:`${word(or)} · tốn: 1 khắc · thành: đòi lại được của bị lấy · Danh +2 · (nàng bị quở phạt) · hỏng: bị cho là bày chuyện, Danh -2 · kèm: nàng oán ngươi +10`,need:[tsbNeedKhac(1),n>=1?{t:`chứng cứ về nàng (có ${n})`,ok:true}:w?{t:`người làm chứng: ${w.name}`,ok:true}:{t:"chứng cứ về nàng hoặc kẻ hầu tin cẩn làm chứng",ok:false}],
   go:()=>{tsbKh(1);oanAdd(a,S,10);if(roll(or)){punish(a,"ức hiếp người dưới phẩm",1);apply({danh:2});const back=tsbGiveBack(a);S.tsbBul[key(a)].stop=tsbWk()+18;log(`<span class="g">Ngươi trình chuyện lên ${judge}: ${a.name} bị quở phạt${back?`, phải trả lại ${back}`:""}.</span>`)}else{apply({danh:-2});log(`${judge} gạt đi, cho là chuyện vặt.`)}}})}
  const pro=tsbProtector(a);O.push({n:pro?`Nhờ ${pro.n} che chở`:"Nhờ người che chở",fx:{},x:`Chắc chắn · tốn: 1 khắc · Bạc -20 (lễ vật) · thành: nàng không dám đòi nữa trong nửa năm · kèm: mang ơn người che chở`,need:[tsbNeedKhac(1),tsbNeedBac(20),{t:pro?`người che chở: ${pro.n}`:"người thân với ngươi, phẩm cao hơn nàng (hoặc Thái hậu với ngươi 40)",ok:!!pro}],
   go:()=>{tsbKh(1);apply({bac:-20});S.tsbBul[key(a)].stop=tsbWk()+18;log(`${pro?tsbCap(pro.n):"Người che chở"} lên tiếng; ${a.name} không dám đòi của ngươi nữa.`)}});
  if(evG(S,a)>=1){const ou=odA(S,45+evG(S,a)*8-(typeof witOf==="function"?witOf(a)/5:0));O.push({n:"Dùng chứng cứ đáp trả",fx:{},x:`${word(ou)} · thành: nàng sợ chuyện của nàng lộ, thôi đòi, trả lại của đã lấy · hỏng: Danh -2 · kèm: nàng oán ngươi +15 · (dùng 1 chứng cứ)`,need:[{t:`chứng cứ về nàng (có ${evG(S,a)})`,ok:true}],
   go:()=>{oanAdd(a,S,15);if(roll(ou)){const back=tsbGiveBack(a);S.tsbBul[key(a)].stop=tsbWk()+18;log(`<span class="g">Ngươi nhắc khéo chuyện của ${a.name}; nàng tái mặt, thôi đòi${back?`, trả lại ${back}`:""}.</span>`)}else{evA(S,a,-1);apply({danh:-2});log(`${a.name} không sợ, còn đi kể ngươi dọa nàng.`)}}})}}
 return{t:`<p>${why}</p>${tile}${rep}`,o:O,stage:[a],headArt:tsbFitArt("hoi-lo"),title:ev?"Bị uy hiếp đòi của":"Bị ép nộp của"}};
function tsbGiveBack(a){const L=(S.tsbLog||[]).filter(x=>x.how==="bị lấy"&&x.who===a.id&&!x.back);for(const x of L){const ix=(a.inv||[]).findIndex(e=>e.tsbFrom==="me"&&tsbItemN(e)===x.what);if(ix>=0){const e=a.inv.splice(ix,1)[0];delete e.tsbFrom;S.inv.push(e);x.back=1;return x.what}
  const m=String(x.what).match(/^(\d+) lượng/);if(m){const g=Math.min(+m[1],a.bac||0);ap(a,{bac:-g});apply({bac:g});x.back=1;return `${g} lượng bạc`}}return""}
function tsbProtector(a){if(!S.thDead&&(S.th||0)>=40)return{n:"Thái hậu"};const L=liveRivals(true).filter(v=>v!==a&&aff(v,S)>=30&&rkOf(v)>rkOf(a));return L.length?{n:tsbNm(L[0]),v:L[0]}:null}

/* ---------------- 8. Ấn tượng đầu ---------------- */
function tsbGrudge(v){/* only TRUE reasons, from the real numbers */const R0=[];const g=v.ghen||0,o=oan(v,S),f=aff(v,S);
 if(g>=35)R0.push(effSac(S)>effSac(v)+5?"ghen vì dung mạo ngươi hơn nàng":S.sung>(v.sung||0)?"ghen vì ngươi được Hoàng thượng để mắt hơn nàng":(S.tai||0)>(v.tai||0)+10?"ghen vì tài nghệ ngươi hơn nàng":"ghen với ngươi, chưa rõ vì đâu");
 if(o>=15)R0.push("ôm oán ngươi từ trước");
 try{const fa=facOf(v),fb=facOf(S);if(fa&&fb&&fa!==fb&&f<0)R0.push("nhà nàng và nhà ngươi khác phe trong triều")}catch(e){}
 if(f<=-15&&!R0.length)R0.push("không ưa ngươi");return R0}
function tsbFirstOK(v){return v&&v!==S&&(rivals||[]).includes(v)&&v.alive&&!v.out&&tsbGrudge(v).length>0}
(function(){if(typeof k61Know!=="function")return;const k0=k61Know;k61Know=function(list,how,quiet,st){let pre=[];try{if(tsbOn()&&S.known&&(S.turn>0||S.tuan>0||S.buoi>0)){pre=(Array.isArray(list)?list:[list]).filter(e=>e&&(rivals||[]).includes(e)&&k61St(e)<1)}}catch(e){}
 const r=k0.apply(this,arguments);try{if(pre.length){S.tsbFI=S.tsbFI||{};const L=pre.filter(e=>!S.tsbFI[e.id]&&k61St(e)>=1&&tsbFirstOK(e)&&together(S,e));
  if(L.length){L.sort((x,y)=>danger(y,S)-danger(x,S));const v=L[0];L.forEach(e=>S.tsbFI[e.id]=1);if(!Q.some(m=>m.pid==="tsbFirst"))tsbCard("tsbFirst",{v:v.id},"Lần đầu gặp mặt")}}}catch(e){console.error("tsbFirst",e)}return r}})();
PEND.tsbFirst=pp=>{if(!S)return null;const v=RV(pp.v);if(!v||!v.alive)return null;const G=tsbGrudge(v);if(!G.length)return null;const hi=rkOf(v)>rkOf(S);const tr=v.trait||"";const nm=tsbNm(v);
 const say=tr==="Kiêu ngạo"?`Nàng liếc ngươi từ đầu đến chân, nói đủ to cho cả đám cung nhân nghe rằng trông ngươi cũng thường thôi.`:tr==="Hiểm độc"?`Nàng cười nhẹ, hỏi han rất ân cần, nhưng ánh nhìn lướt qua ngươi lạnh như nước giếng.`:tr==="Nhu mì"||tr==="Hiền lành"?`Nàng đáp lễ rất khẽ rồi quay đi, không muốn nói thêm câu nào.`:`Nàng bảo nghe danh ngươi đã lâu, nhưng giọng chẳng có chút vui nào.`;
 const act=hi?`Nàng không đợi ngươi hành lễ xong đã bảo người dẫn đường đi trước, để ngươi đứng lại giữa lối.`:`Nàng chỉ khẽ nghiêng mình, không gọi ngươi một tiếng tỷ muội.`;
 const td=od(38+(S.tamco||0)/4+(S.tai||0)/6),tc=od(34+(S.danh||0)/4+(rkOf(S)-rkOf(v))*8);const O=[];const near={t:"đang cùng chỗ với nàng",ok:true};
 O.push({n:"Nhún nhường đáp lễ",fx:{},x:`Chắc chắn · thành: nàng bớt ghen 6 · Đức +1${hi?" · kèm: Danh -1 (người xung quanh thấy ngươi nhún)":""}`,need:[near],go:()=>{v.ghen=cl((v.ghen||0)-6,0,100);apply({duc:1});if(hi)apply({danh:-1});log(`Ngươi nhún nhường đáp lễ ${nm}.`)}});
 O.push({n:"Khéo lời hóa giải",fx:{},x:`${word(td)} · thành: nàng bớt ghen 10 · nàng với ngươi +8 · Danh +1 · hỏng: nàng cho là ngươi giả vờ, nàng oán ngươi +5`,need:[near],go:()=>{if(roll(td)){v.ghen=cl((v.ghen||0)-10,0,100);affAdd(v,S,8);apply({danh:1});log(`<span class="g">Ngươi khéo lời; ${nm} dịu lại đôi chút.</span>`)}else{oanAdd(v,S,5);log(`${tsbCap(nm)} nghe xong chỉ cười nhạt.`)}}});
 O.push({n:"Đáp trả thẳng thắn",fx:{},x:`${word(tc)} · thành: người xung quanh nể ngươi, Danh +3 · hỏng: bị cho là hỗn, Danh -3 · kèm: nàng oán ngươi +8`,need:[near],go:()=>{oanAdd(v,S,8);if(roll(tc)){apply({danh:3});log(`<span class="g">Ngươi đáp lời ${nm} không kém một câu; cung nhân xung quanh đều thấy.</span>`)}else{apply({danh:-3});log(`<span class="r">Ngươi cãi lại ${nm}, bị cho là không biết phép.</span>`)}}});
 O.push({n:"Im lặng ghi nhớ",fx:{},x:`Chắc chắn · thành: ghi lại thái độ của nàng (Giao tình) · kèm: nàng tưởng ngươi yếu thế${hi?" · Danh -1":""}`,need:[near],go:()=>{try{noteAdd(v.id,`lần đầu gặp: nàng ${G.join(", ")}`)}catch(e){}if(hi)apply({danh:-1});log(`Ngươi im lặng, ghi nhớ thái độ của ${nm}.`)}});
 return{t:`<p>Lần đầu gặp ${nm}. ${say} ${act}</p><p class="past">Nhìn lời lẽ và thái độ thì nàng ${G.join(", ")}.</p>`,o:O,stage:[v],who:v,headArt:tsbFitArt("tham-hoi"),title:"Lần đầu gặp mặt"}};/* who: the speaker is HER (lines 2–3 showed the player's face) */
/* NPCs: a newcomer meeting someone who already resents her gets the same cold first meeting (Danh / oán, no card) */
(function(){if(typeof npcLearn!=="function")return;const n0=npcLearn;npcLearn=function(a,b){let first=false;try{first=b&&b!==S&&a&&a!==S&&!npcKnows(a,b)}catch(e){}const r=n0.apply(this,arguments);
 try{if(first&&(rivals||[]).includes(a)&&(rivals||[]).includes(b)&&(oan(a,b)>=15||aff(a,b)<=-15)){oanAdd(b,a,4);if(rkOf(a)>rkOf(b))ap(b,{danh:-1})}}catch(e){}return r}})();

/* ---------------- 13. lửa do đèn nến / kẻ hầu lơ là: nguyên nhân thật, điềm báo trước ---------------- */
function tsbFireBase(p){const se=typeof SEASON!=="undefined"?SEASON[S.month-1]:"";const dry=se==="Đông"||(S.wx&&(S.wx.k==="sun"||S.wx.k==="wind"));return dry?2.2:.8}
function tsbCareless(p){if(p!==S)return (p.maid&&(p.maid.loyal||0)<30)?1:0;const s=(S.staff||[]).find(x=>(x.loyal||0)<35);return s||(S.maid&&(S.maid.loyal||0)<35?S.maid:null)}
function tsbFireMonth(){const w=tsbWk();
 for(const p of [S].concat(liveRivals(true))){if(p.out||!tsbBurnable(p).length)continue;const W=p.tsbFW;
  if(W){if(w<W.due)continue;p.tsbFW=null;if(roll(W.heed?6:45)){const lost=tsbBurn(p,1,W.cause==="hau"?"kẻ hầu lơ là, quên tắt đèn":"tàn đèn rơi trong mùa hanh khô");
    if(p===S){if(!tsbOn())continue;const h=lost.length?`<span class="r">Lửa bén từ ${W.cause==="hau"?"ngọn đèn kẻ hầu quên tắt":"tàn đèn rơi xuống rèm"}; dập kịp nhưng đã cháy mất ${lost.join(", ")}.</span>`:`Lửa bén từ ${W.cause==="hau"?"ngọn đèn kẻ hầu quên tắt":"tàn đèn rơi"} nhưng đồ quý đã được cất chỗ khác; không mất gì.`;Q.push({t:"Hỏa hoạn",h:`<p>${h}</p>`,headArt:tsbArt("ev-hoa-hoan","Hỏa hoạn")});log(h);tsbShow()}
    else if(lost.length&&typeof newsAdd==="function")newsAdd(p,"fire",`Cung của ${p.name} bén lửa, cháy mất ${lost.join(", ")}.`)}continue}
  const cs=tsbCareless(p);const ch=tsbFireBase(p)+(cs?1.5:0);if(!roll(ch))continue;
  p.tsbFW={cause:cs?"hau":"den",due:w+2+R(3),heed:0,who:cs&&cs.name?cs.name:""};
  if(p===S&&tsbOn()&&!Q.some(m=>m.pid==="tsbFireW"))tsbCard("tsbFireW",{},"Đèn nến trong cung");else if(p!==S&&roll(60))p.tsbFW.heed=1}}
PEND.tsbFireW=()=>{const W=S&&S.tsbFW;if(!W)return null;const hau=W.cause==="hau";
 const t=hau?`${W.who||"Một kẻ hầu"} mấy đêm liền quên tắt đèn trong gian chứa đồ; sáng ra bấc đèn cháy sát chân rèm.`:`Trời hanh khô, đèn nến thắp suốt đêm; đã hai lần tàn đèn rơi xuống thảm, may có người thấy.`;const O=[];
 O.push({n:"Dặn giữ đèn nến cẩn thận",fx:{},x:`Chắc chắn · tốn: 1 khắc · thành: hiểm họa cháy giảm hẳn`,need:[tsbNeedKhac(1)],go:()=>{tsbKh(1);if(S.tsbFW)S.tsbFW.heed=1;log("Ngươi dặn kẻ hầu giữ đèn nến cẩn thận, đêm nào cũng soát.")}});
 if(hau)O.push({n:`Phạt ${W.who||"kẻ hầu"}`,fx:{},x:`Chắc chắn · thành: hiểm họa cháy giảm hẳn · kẻ hầu khác giữ kỷ cương · Mất: ${W.who||"kẻ ấy"} Lòng -8`,go:()=>{if(S.tsbFW)S.tsbFW.heed=1;const s=(S.staff||[]).find(x=>x.name===W.who)||(S.maid&&S.maid.name===W.who?S.maid:null);if(s)s.loyal=cl((s.loyal||0)-8,0,100);log(`Ngươi phạt ${W.who||"kẻ hầu"} vì lơ là đèn nến.`)}});
 O.push({n:"Cất đồ quý sang chỗ khác",fx:{},x:`Chắc chắn · tốn: 1 khắc · thành: đồ quý được giữ an toàn nếu có cháy trong 3 tuần · kèm: hiểm họa cháy vẫn còn`,need:[tsbNeedKhac(1)],go:()=>{tsbKh(1);S.tsbSafe=tsbWk()+3;log("Ngươi cho cất đồ quý sang gian khác.")}});
 O.push({n:"Bỏ qua",fx:{},x:`Chắc chắn · kèm: có thể cháy mất một món đồ (vải vóc, thư từ, hương liệu, lễ vật bằng gỗ, giấy)`});
 return{t:`<p>${t}</p>`,o:O,headArt:tsbFitArt("hoa-hoan"),title:"Đèn nến trong cung"}};

/* Tư trang: "Thú nuôi" (jpet petHTML) + "Sổ đồ mất" */
function tsbPetHTML(){if(!S||!tsbOn())return"";let h="";/* the pet strip now sits in the bag block (jinv kitInvGrid below:, review/tutrang-layout) */
 const D=(S.tsbLog||[]).slice(0,8);if(D.length)h+=`<div class="ph"><span>Sổ đồ mất</span><span>ghi đúng món và nguyên do</span></div><ul class="kbul">${D.map(x=>`<li>${x.when?x.when+": ":""}<b>${x.what}</b> ${x.how}${x.by?` (${x.by})`:""}${x.cause?` · ${x.cause}`:""}${x.back?' · <span class="g">đã lấy lại</span>':""}</li>`).join("")}</ul>`;
 return h}

/* ---------------- groups: she can do the same acts (person card), NPCs pick them by the same bands ---------------- */
(function(){try{const add=(g,k)=>{const x=RVGRP.find(r=>r[0]===g);if(x&&!x[1].includes(k))x[1].push(k)};add("Hại nhỏ","batnat");add("Hại nhỏ","thaopet");add("Hại nặng","thathu");add("Hại nặng","phonghoa");
 if(!BANDS[1][2].includes("batnat"))BANDS[1][2].push("batnat","thaopet");if(!BANDS[2][2].includes("thathu"))BANDS[2][2].push("thathu","phonghoa")}catch(e){console.error("tsb groups",e)}})();
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(!Array.isArray(O))return O;const b=bandOf(danger(v,t));const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);
 const tr=traitsOf(v);const W={batnat:tr.includes("Kiêu ngạo")?1.6:.9,thaopet:.5,thathu:(t===S?effSac(S):effSac(t))>effSac(v)+10?1.3:.7,phonghoa:.6};
 for(const k in W){if(!allow.includes(k)||!ACT[k])continue;let ok=false;try{ok=ACT[k].ok(v,t)}catch(e){}if(ok){const w=W[k]*persW(v,k);if(w>0)O.push([k,w])}}}catch(e){}return O}})();

/* ---------------- the clock ---------------- */
(function(){const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?tsbWk():null,t0=S?S.turn:0;const r=e0.apply(this,arguments);
 try{if(S&&!S.dead&&w0!=null&&tsbWk()!==w0){tsbThWeek();tsbPetWeek();if(window.tsbHeal){window.tsbHeal(S);for(const v of rivals)if(v.alive&&v.scar)window.tsbHeal(v)}
  if(S.turn!==t0){tsbFireMonth();tsbPetMonth()}}}catch(e){console.error("tsb week",e)}return r}})();
/* the real unmet condition of each new act (person card Cần row, j63 reads LACK[k](v)) */
try{if(typeof LACK==="object")Object.assign(LACK,{
 thathu:t=>t.scar?"nàng đang bị hủy dung, chưa lành":t.out?"nàng ở lãnh cung":S.bac<40?`Bạc 40 (có ${S.bac})`:"",
 phonghoa:t=>t.out?"nàng ở lãnh cung":!tsbBurnable(t).length?"kho nàng không có đồ cháy được (vải, giấy, hương, lễ vật gỗ)":S.bac<30?`Bạc 30 (có ${S.bac})`:"",
 thaopet:t=>!tsbPets(t).length?"nàng không nuôi thú":S.bac<10?`Bạc 10 (có ${S.bac})`:"",
 batnat:t=>rkOf(S)<=rkOf(t)?"phẩm ngươi phải cao hơn nàng":t.out?"nàng ở lãnh cung":"nàng không có bạc hay món quý nào đáng đòi"})}catch(e){}

/* ================= CÂN BẰNG LỰA CHỌN "Có người đến" (điều phối 05:12Z, sếp hỏi "có thật sự cân bằng không") =================
   Luật 00:35Z: hai bên đều có cái được thật, nguyên nhân thật, NPC cùng luật. Các thẻ approach (j24) không có pid nên hiện đủ
   Được / Mất / Kèm + cơ may như thẻ việc (sếp 07:15Z), không phải thẻ sự kiện chỉ hiện giá. */
function tsbLoyal(d){try{if(S.maid)S.maid.loyal=cl((S.maid.loyal||0)+d,0,100);(S.staff||[]).forEach(s=>s.loyal=cl((s.loyal||0)+d,0,100))}catch(e){}}
function tsbEasy(v){return !!v&&(v.tsbEasy||0)>tsbWk()}
function tsbMockO(v){const hi=rkOf(v)>rkOf(S);return od(44+(S.tamco||0)/3+(S.tai||0)/8-(hi?(rkOf(v)-rkOf(S))*3:0))}
function tsbMockOpts(v){const hi=rkOf(v)>rkOf(S);const o=tsbMockO(v);
 return[{n:"Nhịn",fx:{},x:`Chắc chắn · thành: Đức +2 · nàng không có cớ gây thêm · Mất: Danh -1 (mất mặt trước cung nhân) · kẻ hầu Lòng -2 · kèm: nàng cho ngươi dễ bắt nạt, ba tháng tới dễ bị nàng làm khó lần nữa`,
   go:()=>{apply({duc:2,danh:-1});tsbLoyal(-2);v.tsbEasy=tsbWk()+9;log(`Ngươi nhịn lời mỉa mai của ${v.name}.`)}},
  {n:"Đáp trả sắc sảo",fx:{},x:`${word(o)} · thành: Danh +${hi?3:2} · kẻ hầu Lòng +2 · hỏng: Danh -1${hi?" · Đức -1":""} · kèm: nàng oán ngươi +6 · (${hi?"đáp vụng với người phẩm cao hơn thành ra hỗn; ":""}thành hay bại tùy Tâm cơ và Tài của ngươi)`,
   go:()=>{oanAdd(v,S,6);v.tsbEasy=0;if(roll(o)){apply({danh:hi?3:2});tsbLoyal(2);log(`<span class="g">Ngươi đáp lại ${v.name} một câu sắc sảo; cung nhân đều phục.</span>`)}else{apply(hi?{danh:-1,duc:-1}:{danh:-1});log(`Ngươi đáp lại ${v.name} nhưng vụng lời, lại thành trò cười.`)}}}]}
(function(){if(typeof approachOne!=="function")return;const a0=approachOne;approachOne=function(){let m=a0.apply(this,arguments);try{if(!m||!m.opts||!m.who||!m.who.w||m.who.w[0]!=="r")return m;let v=RV(m.who.w[1]);if(!v)return m;const h=String(m.h||"");
  if(/mỉa mai/.test(h)){const easy=liveRivals(true).filter(x=>tsbEasy(x)&&bandOf(danger(x,S))>=1&&!x.confined);if(easy.length&&!tsbEasy(v)&&roll(60)){v=pick(easy);m.who=pv(v);m.h=`<p>${v.name} lại đến tận cửa cung, buông lời mỉa mai ngươi trước mặt cung nhân.</p>`}m.opts=tsbMockOpts(v);m.optLayout="rows";return m}
  if(/kết làm chị em/.test(h)){const foes=liveRivals(true).filter(x=>x!==v&&(oan(x,v)>=20||aff(x,v)<=-20));m.opts=[{n:"Nhận lời",fx:{},x:`Chắc chắn · thành: thiện cảm +20 · có người đứng về phía ngươi${foes.length?` · kèm: ${foes.length} người vốn thù nàng oán ngươi +5 (ngươi đứng về phe nàng)`:""}`,go:()=>{relAdd(S,v,20);foes.forEach(x=>oanAdd(x,S,5))}},
    {n:"Khéo từ chối",fx:{},x:`Chắc chắn · thành: không dính vào thù oán của nàng · Mất: thiện cảm -5`,go:()=>relAdd(S,v,-5)}];m.optLayout="rows";return m}
  if(/xin lỗi chuyện cũ/.test(h)){m.opts=[{n:"Nhận lời xin lỗi",fx:{},x:`Chắc chắn · thành: nàng bớt oán 15 · thiện cảm +5 · kèm: người khác thấy ngươi dễ bỏ qua`,go:()=>{oanAdd(v,S,-15);relAdd(S,v,5)}},
    {n:"Lạnh lùng",fx:{},x:`Chắc chắn · thành: Danh +1 (giữ uy, không để ai coi nhẹ) · Mất: thiện cảm -3 · nàng vẫn oán như cũ`,go:()=>{apply({danh:1});relAdd(S,v,-3)}}];m.optLayout="rows";return m}
  }catch(e){console.error("tsb approach",e)}return m}})();
(function(){if(typeof approachOne!=="function")return;const a0=approachOne;approachOne=function(){const m=a0.apply(this,arguments);try{if(m&&m.opts&&m.t==="Thái hậu triệu"){m.opts=[{n:"Đến ngay",fx:{},x:`Chắc chắn · tốn: 2 khắc · Sức -5 · thành: Thái hậu với ngươi +3`,go:()=>{apply({th:3,suc:-5});tsbKh(2)}},{n:"Cáo bệnh",fx:{},x:`Chắc chắn · thành: giữ trọn khắc và Sức buổi này · Mất: Thái hậu với ngươi -3`,go:()=>apply({th:-3})}];m.optLayout="rows"}
  else if(m&&m.opts&&/xin theo ngươi/.test(String(m.h||""))){const H=String(m.h);const vic=liveRivals(true).find(v=>(v.staff||[]).some(s=>s.name&&H.includes(s.name)&&H.includes(v.name)));const s=vic&&(vic.staff||[]).find(x=>x.name&&H.includes(x.name));if(s&&vic){
   m.opts=[{n:"Thu làm tai mắt",fx:{bac:-20},x:`Khá chắc · tốn: Bạc -20 · thành: có tai mắt trong cung ${vic.name} · hỏng: kẻ đã phản chủ cũ cũng bán tin ngươi, ${vic.name} nắm 1 chứng cứ của ngươi`,go:()=>{deedAdd(S,"sbribe",null,1,`mua chuộc người hầu của ${vic.name}`);s.spyFor="me";if(roll(35))/*evok: servant bribe deed*/evA(vic,S,1)}},{n:"Đuổi về",fx:{},x:`Chắc chắn · thành: không dính líu, không lộ gì`}];m.optLayout="rows"}}}catch(e){console.error("tsb approach2",e)}return m}})();
/* the cold-palace letter: helping a deposed consort is kind, but the court notices who sides with her (Hoàng hậu) */
(function(){const p0=PEND.coldletter;if(!p0)return;PEND.coldletter=p=>{const d=p0(p);try{if(d&&d.o&&d.o[0]&&queenP()&&queenP()!==S){const g=d.o[0];g.fx=Object.assign({},g.fx,{hh:-3});g.x=(g.x?g.x+" · ":"")+"Hoàng hậu không vui vì ngươi dính dáng người lãnh cung"}}catch(e){}return d}})();
/* the mocker's flag: an easy target draws more bullying from her (same rule for everyone through mindMenu) */
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(Array.isArray(O)&&t===S&&tsbEasy(v))O.forEach(x=>{if(x[0]==="batnat"||x[0]==="rumor")x[1]*=2})}catch(e){}return O}})();
