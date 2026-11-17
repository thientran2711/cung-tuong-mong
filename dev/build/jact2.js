/* ================= jact2: ACT SPLIT waves 2 + 3 (owner-approved split 16/11: Hành sự = VIỆC, Hậu cung = AI, Dư đồ = ĐI ĐÂU; review/act-split-w2) =================
   Loaded right after jact.js. Wraps only. Before/after table: dev/review/act-split-w2.md. Numbers: BAL.ad (jbal2.js).
   WAVE 2 (festivals, outings). A festival day used to bring up to THREE dialogs for one festival: the j71 festival dialog (contests, wagers,
   feast, offering, rite; fixed day), the j31 FESTEV "light event" (7 festivals, pushed at the start of the day) and the j7 random month event
   (5 festivals, any tuần of that month). ONE HOME each:
   - the j71 festival dialog stays THE festival dialog of the day (unchanged);
   - the light acts of a festival (j31 FESTEV + the j7 festival events, same options, same numbers) live at the festival's PLACE on Dư đồ:
     on the festival day that place carries the "!" (kitHapMark) and is open to her for the day (the court gathers there); arriving there opens
     the light acts, once per festival per year. The outings with the Emperor (Xin theo hầu lễ tế, Theo ngài lên núi, Xin về tảo mộ,
     Xin thử một mũi tên) are among these acts, so they move with them;
   - an option that is the same act as this year's j71 festival dialog (câu đối, đố đèn, đàn, bắn cung, cược, cháo, thơ, thêu, bánh, dâng lễ)
     is left out of the light acts that day (the contest is its home);
   - "Thả đèn cầu con" (FESTEV Nguyên tiêu) is the same act as the Hành sự card "Thả đèn hoa đăng" → it becomes that card's wish "Cầu con"
     (same cost Bạc -10, same effect).
   WAVE 3 (night = the last buổi).
   - "Lẻn vào" (the locked-place card, j41/j77) is the one home of sneaking; at night it uses the same odds + BAL.ad.nightSneak (fewer guards)
     and, if caught, the same penalty + BAL.ad.nightCaught Danh (a gain and a loss). Same rule for anyone who sneaks.
   - Night-only happening "Tiếng khóc ở Trường Môn viện": the fallen consort's call (j7 coldvisit, whose text happens AT the cold palace)
     leaves the random event pool and fires when she goes to Trường Môn viện at night (same options, same numbers, same 12-month rest).
   - "Nghe lén câu chuyện" was on EVERY consort's pop-up at a place (one copy per person) and is the same act as the "!" Nghe lỏm chuyện:
     one door per place per buổi (doing one greys the others).
   Co-op: S.adFest / S.adDoor are her personal state; S.festDone (world key) is set exactly as before; no world agency. Old saves fill lazily. */
const AD2=BAL.ad;
function as2Night(){try{return S&&(S.buoi||0)>=BUOI.length-1}catch(e){return false}}
/* ---------- WAVE 2: festivals ---------- */
const AS_FPLACE={newyear:"thu",giaothua:"thu",trungcuu:"thu",dongchi:"thu",nguyentieu:"vuon",trungthu:"vuon",phoenix:"vuon",doanngo:"vuon",
 thanhminh:"tn",thanhtho:"tn",lapbat:"cnh",vulan:"cnh"};
const AS_J7F={doanngo:"doanngo",trungcuu:"trungcuu",vulan:"vulan",dongchi:"dongchi",thanhtho:"thbirthday"};
/* the j31 light events leave the day-start queue: kept here, fired at the place */
const AS_LIGHT={};try{if(typeof FESTEV==="object")for(const k of Object.keys(FESTEV)){AS_LIGHT[k]=FESTEV[k];delete FESTEV[k]}}catch(e){}
/* the j7 festival events (and the cold-palace call, wave 3) leave the random weekly pool; PEND keeps them so a pending one in an old save loads */
const AS_J7OUT=new Set([...Object.values(AS_J7F),"coldvisit"]);
if(typeof freshEvents==="function"){const f0=freshEvents;freshEvents=function(){const L=f0.apply(this,arguments);try{if(!adSrv())return L.filter(e=>!AS_J7OUT.has(e.id))}catch(e){}return L}}
/* S.festDone (j52 Phúc duyên "dự lễ", co-op world key) is still set at the start of the festival day, as j31 did */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead&&!S.out){const f=festToday();const key=f&&`${S.year}-${f.k}`;if(f&&AS_LIGHT[f.k]&&S.festDone!==key){S.festDone=key;log(`${f.name}.`)}}}catch(e){console.error("jact2 fest",e)}return r}})();
/* this year's j71 festival dialog (its title tells which act it is) */
if(typeof fDay7==="function"){const d0=fDay7;fDay7=function(k){const m=d0.apply(this,arguments);try{if(m&&S)S.adF71={y:S.year,k,t:String(m.t||"")}}catch(e){}return m}}
const AS_SAME=[[/câu đối/i,/câu đối/i],[/đố đèn/i,/đố đèn/i],[/khúc đàn/i,/Thi đàn/i],[/mũi tên/i,/bắn/i],[/Đặt cược/i,/Đặt cược/i],[/nấu cháo/i,/cháo/i],
 [/Làm thơ/i,/Thi thơ/i],[/thêu/i,/thêu/i],[/^(Dâng bánh|Gói bánh)/i,/bánh/i],[/^(Dâng ngọc|Lễ mọn)/i,/Dâng lễ/i]];
function asSameAsJ71(k,name){const F=S.adF71;if(!F||F.y!==S.year||F.k!==k)return false;return AS_SAME.some(([a,b])=>a.test(name)&&b.test(F.t))}
function asFestToday(){try{const f=festToday();return f&&AS_FPLACE[f.k]&&(AS_LIGHT[f.k]||AS_J7F[f.k])?f:null}catch(e){return null}}
function asFestDone(k){return !!(S.adFest&&S.adFest[k]===S.year)}
/* the festival place is open to her on the festival day until she has been (the court gathers there) */
if(typeof ACC_ROLE!=="undefined"&&Array.isArray(ACC_ROLE))ACC_ROLE.unshift((p,k)=>{if(p!==S||adSrv())return null;const f=asFestToday();return f&&AS_FPLACE[f.k]===k&&!asFestDone(f.k)?{ok:true,fest:1}:null});
AD_HAP_FIX.push(()=>{const f=asFestToday();if(!f||asFestDone(f.k)||S.confined)return null;return{k:AS_FPLACE[f.k],id:"fest",x:f.k}});
AD_HAP_T.fest="Ngày hội";
/* a light event keeps at least 2 options: when the left-out acts leave one, the plain "watch and go back" (no gain, no loss) is added */
const AS_WATCH={n:"Đứng xem rồi về",fx:{},x:"không được không mất"};
function asLightOpts(k,O){const O2=(O||[]).filter(o=>o&&!asSameAsJ71(k,o.n));if(O2.length<2&&!O2.some(o=>o.n===AS_WATCH.n))O2.push(Object.assign({},AS_WATCH));return O2}
AD_HAP_FIRE.fest=(h)=>{const k=h.x,f=festToday();if(!f||f.k!==k||asFestDone(k))return false;S.adFest=S.adFest||{};S.adFest[k]=S.year;let fired=false;
 if(AS_LIGHT[k]){const m=Object.assign({who:pEmp(),ev:"fest",evId:"fest:"+k,headArt:{src:`img/ev-fest-${k}-b.webp`,label:f.name}},AS_LIGHT[k]());
  m.opts=asLightOpts(k,(m.opts||[]).filter(o=>!(k==="nguyentieu"&&o.n==="Thả đèn cầu con")));Q.push(m);fired=true}
 const j=AS_J7F[k];if(j&&EVI[j]){try{if(EVI[j].ok()){const d=mkEv(j);if(d){d.o=asLightOpts(k,d.o);pushDil(d,f.name);fired=true}}}catch(e){console.error(e)}}
 return fired};
/* "Thả đèn cầu con" → the Hành sự card "Thả đèn hoa đăng" (jts), wish "Cầu con" on the Nguyên tiêu night (the card already costs Bạc -10) */
if(typeof tsPanel==="function"&&typeof tsOpt==="function"){const p0=tsPanel;tsPanel=function(o){try{const f=festToday();if(o&&Array.isArray(o.opts)&&f&&f.k==="nguyentieu"&&/: thả đèn$/.test(o.t||"")&&!o.opts.some(x=>x&&x.n==="Cầu con"))
  o.opts.splice(Math.max(0,o.opts.length-1),0,tsOpt({n:"Cầu con",duoc:["dễ có thai thêm một tháng"],go:()=>{S.fert=Math.max(S.fert||0,1);log(`Đêm ${f.name}, ngươi thả đèn cầu con.`)}}))}catch(e){console.error("jact2 den",e)}return p0.apply(this,arguments)}}
/* ---------- WAVE 3: the night ---------- */
/* sneaking at night: fewer guards (odds + nightSneak), heavier if caught (Danh + nightCaught) */
if(typeof accSneakO==="function"){const o0=accSneakO;accSneakO=function(k,a){const o=o0.apply(this,arguments);try{if(as2Night())return oddsCl(o+AD2.nightSneak)}catch(e){}return o}}
if(typeof accSneakPen==="function"){const p0=accSneakPen;accSneakPen=function(k){const P=p0.apply(this,arguments);try{if(as2Night()&&P){const d=P.danh+AD2.nightCaught;return Object.assign({},P,{danh:d,txt:String(P.txt||"").replace(/Danh -\d+/,`Danh ${d}`)+" (bắt giữa đêm, tội nặng thêm)"})}}catch(e){}return P}}
if(typeof accSneakLine==="function"){const l0=accSneakLine;accSneakLine=function(){const t=l0.apply(this,arguments);return as2Night()?t+" · (đêm vắng người: dễ lọt hơn, bị bắt thì tội nặng hơn)":t}}
/* the fallen consort's call: a night happening at Trường Môn viện (j7 coldvisit, same options; its 12-month rest via S.seen) */
AD_HAP_FIX.push(()=>{if(!as2Night()||S.confined)return null;const e=typeof EVI!=="undefined"&&EVI.coldvisit;try{if(!e||!evFresh(e)||!e.ok())return null}catch(x){return null}return{k:"lc",id:"cold"}});
AD_HAP_T.cold="Tiếng khóc ở Trường Môn viện";
AD_HAP_FIRE.cold=()=>{if(!as2Night())return false;const d=mkEv("coldvisit");if(!d)return false;pushDil(d,AD_HAP_T.cold);return true};
/* one door per place per buổi for "Nghe lén câu chuyện" (every pop-up at the place + the "!" Nghe lỏm chuyện) */
function as2NgheKey(){try{return "nghe:"+S.place+":"+bkey()}catch(e){return ""}}
function as2NgheUsed(){return !!(S&&S.adDoor&&S.adDoor.__nghe===as2NgheKey())}
function as2NgheMark(){if(!S)return;S.adDoor=S.adDoor||{};S.adDoor.__nghe=as2NgheKey()}
(function(){const t0=talkOpts;talkOpts=function(p){let A=t0.apply(this,arguments);try{if(Array.isArray(A)&&as2NgheUsed())A=A.map(a=>a&&a.n==="Nghe lén câu chuyện"?Object.assign({},a,{lock:true,t:"đã nghe lén ở đây buổi này"}):a)}catch(e){}return A}})();
(function(){const t0=talk;talk=function(oi){let a=null;try{const p=S&&curPeople()[popIdx];a=p&&talkOpts(p)[oi]}catch(e){}if(a&&a.n==="Nghe lén câu chuyện"&&a.lock)return;
 const r=t0.apply(this,arguments);try{if(a&&a.n==="Nghe lén câu chuyện")as2NgheMark()}catch(e){}return r}})();
(function(){const a0=adHapFire1;adHapFire1=function(h,k){const r=a0.apply(this,arguments);try{if(h&&h.id==="gossip"&&r)as2NgheMark()}catch(e){}return r}})();
