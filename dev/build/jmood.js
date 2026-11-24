/* ================= jmood: THANH TÂM TRẠNG — her Sims-like mood bar (owner OD:L600 "MOOD (The Sims-like)", ledger #172, D12) =================
   SEPARATE from the per-event emotion seal (jemo p.emo = one feeling + its cause): this is ONE number S.mood.v (−100 … 100) that every
   happening pushes up or down, that drifts back toward calm each tuần, and that changes play a little. Numbers: BAL.mood (jbal2.js).
   IN  (each push is logged with its cause, shown in the mood box):
     · every feeling that lands on her (jemo emoSet: promotion, demotion, night, gift, slight, punishment, child born / lost, lãnh cung, an
       event result through jevb evbMood …): BAL.mood.emo[k] × strength;
     · her own acts with a real roll (runOpt deck cards + talk options, runAct consort acts): thành +ok, hỏng fail;
     · rest cards (jrest): +rest (only up to BAL.mood.restCap);
     · each tuần: needs (Sức low / high, sick, short of bạc, cấm túc, lãnh cung), people (friends with thiện cảm ≥ netTh(v,"than"), foes with
       oán ≥ foe.oan, her maid's thiện cảm), weather (pleasant / harsh / wet); then decay toward 0.
   OUT (one rule; bands BAL.mood.band; flavour of a low mood = her current feeling: giận → Bực dọc / Phẫn uất, ghen → Hờn tủi / Hờn ghen,
       sợ / lo âu → Bất an / Hoảng hốt, else Phiền muộn / U uất):
     · odds of her acts (odA for her): ± up to BAL.mood.od points beyond |v| > odFrom (≤ one ladder step at the extremes); shown in "Vì sao";
     · how others see her: thiện cảm gains toward her ×(1 ± aff) (angry low mood: ×(1 − affAngry)); a joyful mood also makes rivals more
       jealous (ghenAll × (1 + ghen)) — gain and loss;
     · choices: at the lowest band the show-off acts (BAL.mood.lock names) are locked ("Cần: tâm trạng không …"); a sad / fearful low mood
       may bring someone who loves her to comfort her (a two-way dialog, each answer with its gain and its price).
   UI: the mood box (jevb emoBox, tap her mood seal) shows the bar (kitSignedBar, KIT §49.1) with band + number, "Vì sao lên xuống" (kitRows),
       the feeling causes and the real effects now; her own card (selfCardHTML) gets the mood tile (kitSkillCard kind "mood", as jpcf) + the
       bar row. Old saves: S.mood is created on first use. Co-op: S.mood is a personal key of S (jcoopworld) — no sync change.
   Off switch for measuring: window.__moodOff=1. Counters: window.MOOD_N. ==================================================================== */
(function(){
const B=()=>BAL.mood;
window.MOOD_N={wk:0,hist:{},ext:0,hi:0,lo:0,odN:0,odSum:0,odMax:0,comfort:0,lock:0,aff:0,ghen:0,acts:0,pushes:{}};
function mbOn(){return !!(typeof S!=="undefined"&&S&&!S.dead&&!window.__moodOff)}
function mbS(){if(!S)return null;if(!S.mood||typeof S.mood!=="object"||typeof S.mood.v!=="number")S.mood={v:0,log:[]};if(!Array.isArray(S.mood.log))S.mood.log=[];return S.mood}
function mbW(){try{return wk()}catch(e){return 0}}
const cl2=(x,a,b)=>Math.max(a,Math.min(b,x));
/* push the bar; merge pushes of the same cause kind in the same tuần ("Việc thành ×3: Đánh đàn, Làm thơ") */
function mbAdd(d,why,kind){if(!mbOn()||!d)return 0;const M=mbS();/* the deeper she already is, the less a push the same way moves her (saturation, BAL.mood.sat) */const same=Math.max(0,Math.sign(d)*M.v);d=Math.round(d*Math.max(B().satMin,1-same/B().sat));if(!d)return 0;
 /* THE SIMS MODEL (owner OD 17/11 ~18:10Z): the push is a cause with its own khắc timer (jmoodknow mkBar); the bar = the sum of live causes */
 if(typeof mkBar==="function"&&typeof mkOn==="function"&&mkOn()){const real=mkBar(d,why,kind||why);MOOD_N.pushes[kind||why]=(MOOD_N.pushes[kind||why]||0)+real;return real}
 const v0=M.v;M.v=cl2(M.v+d,-100,100);const real=M.v-v0;if(!real)return 0;
 const W=mbW();kind=kind||why;MOOD_N.pushes[kind]=(MOOD_N.pushes[kind]||0)+real;
 const x=M.log.find(e=>e.w===W&&e.k===kind);if(x){x.d+=real;x.n=(x.n||1)+1;if(why&&x.why.indexOf(why)<0&&x.why.length<70)x.why+=", "+why}else M.log.unshift({w:W,k:kind,d:real,why:String(why||"").slice(0,80),n:1});
 M.log=M.log.filter(e=>W-e.w<=B().keep).slice(0,B().logMax);return real}
/* ---------- bands ---------- */
function mbFlav(){try{const e=typeof emoGet==="function"?emoGet(S):null;if(!e||e.k==="binh")return"";const k=typeof feelGrp==="function"?feelGrp(e.k):e.k;/* FEELINGS-18: a new kind reads its group */if(k==="gian")return"gian";if(k==="ghen")return"ghen";if(k==="so"||k==="lo")return"so";return""}catch(e){return""}}
const MB_LOW={"":["Phiền muộn","U uất"],gian:["Bực dọc","Phẫn uất"],ghen:["Hờn tủi","Hờn ghen"],so:["Bất an","Hoảng hốt"]};
function mbBand(v){if(v==null){const M=mbS();v=M?M.v:0}const b=B().band;const f=mbFlav();
 if(v>=b[3])return{i:2,name:"Hân hoan",cls:"g",f:""};if(v>=b[2])return{i:1,name:"Vui vẻ",cls:"g",f:""};
 if(v>b[1])return{i:0,name:"Bình thản",cls:"n",f:""};const L=MB_LOW[f]||MB_LOW[""];if(v>b[0])return{i:-1,name:L[0],cls:"r",f};return{i:-2,name:L[1],cls:"r",f}}
/* ---------- effects ---------- */
/* odds points for her acts: 0 inside ±odFrom, then linear to ±od at ±100 (rounded) */
function mbOdPts(v){if(!mbOn())return 0;if(v==null)v=mbS().v;const a=Math.abs(v),F=B().odFrom;if(a<=F)return 0;return Math.sign(v)*Math.round(B().od*(a-F)/(100-F))}
/* how others see her: share −1 … 1 beyond ±affFrom */
function mbAffK(v){if(!mbOn())return 0;if(v==null)v=mbS().v;const a=Math.abs(v),F=B().affFrom;if(a<=F)return 0;const s=Math.sign(v)*(a-F)/(100-F);return s>0?s*B().aff:s*(mbFlav()==="gian"?B().affAngry:B().aff)}
function mbLocked(a){if(!a||!mbOn())return false;return mbBand().i<=-2&&B().lock.includes(a.n)}
window.mbS=mbS;window.mbBand=mbBand;window.mbOdPts=mbOdPts;window.mbAdd=mbAdd;window.mbAffK=mbAffK;
/* odds: her acts only (NPCs keep jemo's own small emotion rule) */
(function(){if(typeof odA!=="function")return;const o0=odA;odA=function(a,b){const r=o0.apply(this,arguments);try{if(a===S&&mbOn()){const m=mbOdPts();if(m){MOOD_N.odN++;MOOD_N.odSum+=m;MOOD_N.odMax=Math.max(MOOD_N.odMax,Math.abs(m));return oddsCl(r+m)}}}catch(e){}return r}})();
/* "Vì sao <bậc>?": the real formula re-run with her mood at calm (whyDiff), and the deck cards (static odds) name it too */
(function(){if(typeof whyDiff!=="function")return;const w0=whyDiff;whyDiff=function(fn,subj){const L=w0.apply(this,arguments);try{if(!mbOn()||!(subj||[]).some(x=>x&&x[0]===S))return L;const M=mbS(),v=M.v;if(!mbOdPts(v))return L;
  let o0,o1;try{o0=fn();M.v=0;o1=fn()}finally{M.v=v}if(o0!=null&&o1!=null&&o0!==o1)L.push([`Tâm trạng ngươi: ${mbBand(v).name.toLowerCase()}`,o0-o1])}catch(e){}return L}})();
(function(){if(typeof kitWhyHtml!=="function")return;const k0=kitWhyHtml;kitWhyHtml=function(b,lv){let h=k0.apply(this,arguments);try{if(!h||!mbOn()||!b||!b.dataset||b.dataset.i==null)return h;const m=mbOdPts();if(!m||/Tâm trạng ngươi/.test(h))return h;
  const row=`<div class="kpopx"><span class="ef ${m>0?"g":"r"}">Tâm trạng ngươi: ${mbBand().name.toLowerCase()}: ${whyStep(m)}</span></div>`;
  h=h.replace(/<div class="kpopx"><span class="ef n">Cơ may của việc này không đổi theo tư chất[^<]*<\/span><\/div>/,"");const i=h.indexOf("</div>");return i<0?h+row:h.slice(0,i+6)+row+h.slice(i+6)}catch(e){}return h}})();
/* thiện cảm toward her: gains scaled by her mood (people warm to a bright face, keep away from a dark one) */
(function(){if(typeof affAdd!=="function")return;const a0=affAdd;affAdd=function(x,y,n){try{if(y===S&&x&&x!==S&&n>0&&mbOn()){const k=mbAffK();if(k){const n2=Math.max(0,Math.round(n*(1+k)));if(n2!==n){MOOD_N.aff+=n2-n;n=n2;arguments[2]=n}}}}catch(e){}return a0.apply(this,arguments)}})();
/* a joyful mood shows: rivals grow more jealous of her (the loss side of a high mood) */
/* ONE CORE (OD:L1267): the factor lives in ghenN (j1), so every text that prints ghenN(n) shows what ghenAll really adds; ghenAll only counts it */
(function(){if(typeof ghenN!=="function"||typeof ghenAll!=="function")return;const n0=ghenN,g0=ghenAll;const mk=n=>{try{if(n>0&&mbOn()&&mbBand().i>=2)return Math.round(n*(1+B().ghen))}catch(e){}return n};
 ghenN=function(n){return n0(mk(n))};ghenAll=function(n){try{const n2=mk(n);if(n2!==n)MOOD_N.ghen+=n2-n}catch(e){}return g0.apply(this,arguments)}})();
/* ---------- inputs ---------- */
/* every feeling that lands on her moves the bar (even when a stronger feeling keeps the seal) */
(function(){if(typeof emoSet!=="function")return;const s0=emoSet;emoSet=function(p,k,v,why){try{if(mbOn()&&!(typeof mkOn==="function"&&mkOn())&&p&&(p===S||(typeof emoRes==="function"&&emoRes(p)===S))&&v>0&&typeof emoOn==="function"&&emoOn()){const c=B().emo[k]||0;
  if(c)mbAdd(c*v,why||(typeof EMO==="object"&&EMO[k])||"","e:"+(why||k))}}catch(e){}return s0.apply(this,arguments)}})();
/* her own acts with a real roll: deck cards and talk options */
(function(){if(typeof runOpt!=="function")return;const r0=runOpt;runOpt=function(a){const rolled=!!(a&&a.o!=null&&a.o<100&&!a.exam);const r=r0.apply(this,arguments);
 try{if(rolled&&(r===true||r===false)&&mbOn()){MOOD_N.acts++;const nm=String(a.n||"").replace(/<[^>]+>/g,"").slice(0,30);r?mbAdd(B().ok,nm,"ok"):mbAdd(B().fail,nm,"fail")}}catch(e){}return r}})();
/* consort acts (Hậu cung): read the act's own result words */
(function(){if(typeof runAct!=="function")return;const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{if(a===S&&mbOn()&&r){const A=ACT[k];let o=100;try{o=A&&A.o?actOdds(S,t,k):100}catch(e){}
  if(o<100){MOOD_N.acts++;const bad=(typeof FAILRE!=="undefined"?FAILRE:/hỏng|không thành|bị phát hiện|bị lộ/).test(String(r).replace(/<[^>]+>/g,""));const nm=String(A.n||k).replace(/<[^>]+>/g,"").slice(0,30);bad?mbAdd(B().fail,nm,"fail"):mbAdd(B().ok,nm,"ok")}}}catch(e){}return r}})();
/* rest cards lift a low mood (up to restCap): the card says so in Được */
function mbRestGain(a){const M=mbS();if(!M||!a)return 0;const g=a.rest==="ds"?B().restDs:B().rest;return Math.max(0,Math.min(g,B().restCap-M.v))}
function mbRestFix(a){try{if(!a||!a.rest||!mbOn())return a;const g=mbRestGain(a);const x=String(a.x||"").replace(/(\s·\s)?tâm trạng \+\d+/,"");a.x=g?(x?x+" · ":"")+`tâm trạng +${g}`:x;
  /* jrest rebuilds a.go on every refresh: wrap the current one unless it is already ours */
  if(!(a.go&&a.go.__mb)){const g0=a.go;a.go=function(){const r=g0?g0.apply(this,arguments):undefined;try{const n=mbRestGain(a);if(n)mbAdd(n,a.n,"rest")}catch(e){}return r};a.go.__mb=1}}catch(e){}return a}
(function(){if(typeof restFix!=="function")return;const f0=restFix;restFix=function(a){const r=f0.apply(this,arguments);return mbRestFix(r||a)}})();
/* locks: the show-off acts at the lowest band */
function mbLock(a){try{if(!a||!B().lock.includes(a.n))return a;const L=mbLocked(a);
  if(L&&!a.__mbL){a.__mbL={lock:a.lock};a.lock=true;MOOD_N.lock++}
  else if(!L&&a.__mbL){a.lock=a.__mbL.lock;delete a.__mbL}}catch(e){}return a}
const mbNeedT=()=>`tâm trạng không ${mbBand().name.toLowerCase()} (lòng chẳng còn hứng múa hát)`;
(function(){if(typeof cardWhy!=="function")return;const w0=cardWhy;cardWhy=function(a){const r=w0.apply(this,arguments);try{if(a&&a.__mbL&&!a.__mbL.lock&&(r===a.t||r==="Chưa đủ điều kiện"))return mbNeedT()}catch(e){}return r}})();
/* the card keeps its own line; the Cần row (j63 data-kneed) names the mood instead of repeating the description */
(function(){if(typeof cardH!=="function")return;const c0=cardH;cardH=function(a){try{mbLock(a);mbRestFix(a)}catch(e){}let h=c0.apply(this,arguments);
 try{if(a&&a.__mbL){const m=/data-kneed="([^"]*)"/.exec(h);const tp=String(a.t||"").replace(/<[^>]+>/g,"").trim();let L=m?JSON.parse(decodeURIComponent(m[1])):[];
  L=L.filter(x=>!(x&&x.ok===false&&tp&&String(x.t).trim()===tp));L.push({t:mbNeedT(),ok:false});const at=` data-kneed="${encodeURIComponent(JSON.stringify(L))}"`;
  h=m?h.replace(/ data-kneed="[^"]*"/,at):h.replace(/^<button /,`<button${at} `)}}catch(e){}return h}})();
(function(){if(typeof act!=="function")return;const a0=act;act=function(i){try{if(Array.isArray(deck)&&deck[i]){mbLock(deck[i]);mbRestFix(deck[i])}}catch(e){}return a0.apply(this,arguments)}})();
/* the tuần: needs, people, weather, then the drift back to calm */
function mbWeek(){if(!mbOn())return;const M=mbS(),b=B(),W=mbW();if(M.wk===W)return;M.wk=W;
 /* decay toward 0 (at least 1 point) */
 if(M.v&&!(typeof mkOn==="function"&&mkOn())){const d=Math.max(1,Math.round(Math.abs(M.v)*b.decay));M.v=M.v>0?Math.max(0,M.v-d):Math.min(0,M.v+d)}/* old path only: with causes on khắc timers there is no drift (OD 17/11 ~18:10Z) */
 const N=b.need;
 if((S.suc||0)<N.sucLo)mbAdd(N.sucLoD,`Sức chỉ còn ${S.suc}`,"w:suc");else if((S.suc||0)>=N.sucHi)mbAdd(N.sucHiD,"thân thể khỏe khoắn","w:suc");
 try{if(typeof illOf==="function"&&illOf(S))mbAdd(N.ill,`đang ${typeof illName==="function"?illName(S).toLowerCase():"ốm"}`,"w:ill")}catch(e){}
 if((S.bac||0)<N.bacLo)mbAdd(N.bacD,"túng bạc","w:bac");
 if(S.confined>0)mbAdd(N.conf,"bị cấm túc","w:conf");
 if(S.out)mbAdd(N.out,"ở lãnh cung","w:out");
 /* people */
 try{let fr=0,fo=0;for(const v of (typeof liveRivals==="function"?liveRivals(true):[])){if(v.coop)continue;if(aff(v,S)>=netTh(v,"than"))fr++;if(oan(v,S)>=b.foe.oan)fo++}
  if(fr)mbAdd(Math.min(b.fr.cap,fr*b.fr.d),`${fr} người trong cung quý ngươi`,"w:fr");
  if(fo)mbAdd(-Math.min(b.foe.cap,fo*b.foe.d),`${fo} người oán ngươi`,"w:foe");
  if(S.maid&&(S.maid.loyal||0)>=b.maidHi)mbAdd(b.maidD,`${S.maid.name||"cung nữ"} hết lòng với ngươi`,"w:maid")}catch(e){}
 /* weather */
 try{const x=S.wx;if(x){if(b.wx.nice.includes(x.b||x.n))mbAdd(b.wx.niceD,`trời ${x.n}`,"w:wx");else if(x.f===2||x.f===3||x.f===4)mbAdd(b.wx.harshD,`trời ${x.n}`,"w:wx");else if(x.f===1)mbAdd(b.wx.wetD,`trời ${x.n}`,"w:wx")}}catch(e){}
 /* measuring */
 MOOD_N.wk++;const bk=Math.round(M.v/20)*20;MOOD_N.hist[bk]=(MOOD_N.hist[bk]||0)+1;if(Math.abs(M.v)>=b.band[3])MOOD_N.ext++;if(M.v>=b.band[3])MOOD_N.hi++;if(M.v<=b.band[0])MOOD_N.lo++;
 mbComfort()}
/* someone who loves her comes to comfort a sad / frightened her (not an angry one: people keep away from anger) */
function mbComfort(){const M=mbS(),C=B().comfort,W=mbW();const bi=mbBand().i;if(bi>-1)return;const sk=k=>{MOOD_N.cskip=MOOD_N.cskip||{};MOOD_N.cskip[k]=(MOOD_N.cskip[k]||0)+1};
 if(mbFlav()==="gian")return sk("angry");if(M.cw!=null&&W-M.cw<C.cd)return sk("cooldown");if(!roll(bi<=-2?C.ch:C.chLow))return sk("roll");
 let v=null;try{v=liveRivals(true).filter(x=>!x.coop&&!x.queen&&aff(x,S)>=C.aff&&(typeof kitIsKnown!=="function"||kitIsKnown(x))).sort((a,b)=>aff(b,S)-aff(a,S))[0]||null}catch(e){}
 const maid=!v&&S.maid&&(S.maid.loyal||0)>=C.maid?S.maid:null;if(!v&&!maid)return sk("nobody");M.cw=W;MOOD_N.comfort++;
 const nm=v?v.name:maid.name,who=v?pv(v):pMaid(),them=v?"nàng ta":"nàng";const band=mbBand().name.toLowerCase();
 const big=C.big,small=C.small;
 const o1={n:`Giãi bày tâm sự với ${nm}`,risk:"an toàn",hint:`lòng nhẹ đi nhiều, được lòng ${nm}; nhưng mất một khắc buổi này`,x:`tâm trạng +${big}, ${nm} thiện cảm +${C.affUp} · kèm: mất ${C.k} khắc buổi này`,fx:{},
  go:()=>{mbAdd(big,`${nm} đến an ủi`,"comfort");try{if(v)affAdd(v,S,C.affUp);else maid.loyal=cl2((maid.loyal||0)+C.affUp,0,100)}catch(e){}try{spend(C.k)}catch(e){}log(`${nm} ngồi nghe ngươi giãi bày tâm sự; lòng ngươi nhẹ đi nhiều.`)}};
 const o2={n:"Gượng cười, cảm tạ",risk:"an toàn",hint:`lòng nhẹ đi chút ít${v?", giữ được thể diện":""}; nhưng ${nm} thấy ngươi giữ khoảng cách`,x:`tâm trạng +${small}${v?" (giữ thể diện)":""} · kèm: ${nm} thiện cảm −${C.affDown} (thấy ngươi giữ khoảng cách)`,fx:v?{danh:C.danh}:{},
  go:()=>{mbAdd(small,`${nm} đến thăm`,"comfort");try{if(v)affAdd(v,S,-C.affDown);else maid.loyal=cl2((maid.loyal||0)-C.affDown,0,100)}catch(e){}log(`Ngươi gượng cười cảm tạ ${nm}, không nói ra nỗi lòng.`)}};
 Q.push({ev:1,t:"Có người đến an ủi",who,art:"img/act-sang-tham-hoi.webp",h:`<p>Mấy hôm nay ngươi ${band}, ${nm} biết chuyện, mang chút quà sang thăm, hỏi han ân cần.</p><p>Ngươi có muốn nói thật lòng với ${them}?</p>`,opts:[o1,o2]})}
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const w0=mbW();const r=e0.apply(this,arguments);try{if(S&&!S.dead&&mbW()!==w0)mbWeek()}catch(e){console.error(e)}return r}})();
/* ---------- UI ---------- */
function mbAgo(w){const d=mbW()-w;return d<=0?"tuần này":`${d} tuần trước`}
function mbBarHTML(v){const s=v>0?"+"+v:String(v);return `${typeof kitSignedBar==="function"?kitSignedBar(v):""}`+` ${s}`}
/* the rows of the mood box: bar · why it moved · what it does now */
function mbSecs(){const M=mbS();if(!M)return[];const v=M.v,bd=mbBand(v),b=B();
 const bar=[[bd.name,`<span class="ef ${bd.cls}">${mbBarHTML(v)}</span>`]];
 const L=M.log.filter(e=>e.left!=null?e.left>0:mbW()-e.w<=b.keep).slice(0,6).map(e=>[`${e.d>0?"+":"−"}${Math.abs(e.d)}`,`${mbWhy(e)} · ${e.left!=null?`còn ${e.left} khắc`:mbAgo(e.w)}`,e.d>0?"g":"r"]);
 if(!L.length)L.push(["Vì sao","không có chuyện gì đáng kể gần đây","n"]);
 L.push(typeof mkOn==="function"&&mkOn()?["Mỗi chuyện","phai dần theo khắc, hết khắc thì thôi","n"]:["Mỗi tuần",`nguôi dần về bình thản (${Math.round(b.decay*10)} phần mười mỗi tuần)`,"n"]);
 const od=mbOdPts(v),ak=mbAffK(v),E=[];
 E.push(["Cơ may",od?`mọi việc ngươi làm ${typeof whyStep==="function"?whyStep(od):(od>0?"dễ hơn":"khó hơn")}`:"không đổi",od>0?"g":od<0?"r":"n"]);
 E.push(["Người khác",ak>0?`thấy ngươi tươi tắn, thiện cảm với ngươi dễ lên hơn${bd.i>=2?"; kẻ ganh thì ghen hơn":""}`:ak<0?(bd.f==="gian"?"thấy ngươi cau có, thiện cảm với ngươi khó lên":"thấy ngươi ủ ê, thiện cảm với ngươi khó lên hơn"):"không đổi",ak>0?"g":ak<0?"r":"n"]);
 if(bd.i<=-2)E.push(["Lựa chọn",`không múa hát nổi (${b.lock.join(", ")})${bd.f!=="gian"?"; người thương ngươi có thể đến an ủi":""}`,"r"]);
 return [{h:"Thanh tâm trạng",rows:bar},{h:"Vì sao lên xuống",rows:L},{h:"Ảnh hưởng",rows:E}]}
function mbWhy(e){const k=e.k||"";const n=e.n>1?` ×${e.n}`:"";if(k==="ok")return `việc thành${n}: ${e.why}`;if(k==="fail")return `việc hỏng${n}: ${e.why}`;if(k==="rest")return `nghỉ ngơi: ${e.why}`;return e.why||""}
window.mbSecs=mbSecs;window.mbWeek=mbWeek;window.mbComfort=mbComfort;
/* her own card: the mood tile (kitSkillCard kind "mood", same as the person cards' jpcf tile) + the bar row; tap = the mood box */
function mbTile(){try{if(!mbOn()||typeof kitSkillCard!=="function")return"";const M=mbS(),bd=mbBand(),top=M.log.find(e=>mbW()-e.w<=B().keep);
 let img="";try{const L=typeof emoCauses==="function"?emoCauses(S):[];const e=typeof emoGet==="function"?emoGet(S):null;img=typeof emoCauseArt==="function"?emoCauseArt(L.find(x=>e&&x.k===e.k)||L[0])||"":""}catch(e){}
 const card=kitSkillCard({kind:"mood",name:`Tâm trạng: ${bd.name}`,max:0,img,desc:top?`${top.d>0?"+":"−"}${Math.abs(top.d)} ${mbWhy(top)}`:"Không có chuyện gì đáng kể gần đây"});
 return `<div class="kpsec pcf-mood" data-emo-open="me" role="button" tabindex="0" title="Xem vì sao">${card}${kitRows([[bd.name,`<span class="ef ${bd.cls}">${mbBarHTML(M.v)}</span>`]])}</div>`}catch(e){return""}}
window.mbTile=mbTile;
(function(){if(typeof selfCardHTML!=="function")return;const s0=selfCardHTML;selfCardHTML=function(){const h=s0.apply(this,arguments);try{const t=mbTile();if(!t)return h;
  const i=h.indexOf('data-g="Tư chất"');if(i<0)return h;const j=h.indexOf('<div class="pcg',i);const at=j<0?h.lastIndexOf("</div></div>"):h.lastIndexOf("</div>",j);if(at<0)return h;return h.slice(0,at)+t+h.slice(at)}catch(e){return h}}})();
/* ---------- TOP BAR (owner 18/11 ~05:40Z: "cho cái thanh tâm trạng nằm ở thanh trên cố định của game, sắp xếp sao cho đẹp") ----------
   ONE part, every screen that has the fixed top bar (header.hud, last child, one full-width grid row): her mood seal + band word + kitSignedBar (KIT §49.1: calm at the
   centre, red left = low, green right = high) + the signed number. Tap = the existing mood box (data-emo-open="me", jpcf). ONE accessor for the number:
   kitMoodVal() reads moodBar(S) when the npc-chain model is live, else S.mood.v — no second number.
   Owner picked this full-row layout (18/11 ~06:05Z, "kiểu 1"). */
window.kitMoodVal=function(){try{if(typeof moodBar==="function"){const x=moodBar(S);const n=typeof x==="number"?x:x&&x.v;if(typeof n==="number"&&isFinite(n))return Math.round(n)}}catch(e){}return S&&S.mood&&typeof S.mood.v==="number"?Math.round(S.mood.v):0};
function mbHud(){try{const hd=document.querySelector("header.hud");if(!hd)return;let el=document.getElementById("hud-mood"); if(!mbOn()){if(el)el.hidden=true;return}
 if(!el){el=document.createElement("div");el.id="hud-mood";el.setAttribute("role","button");el.tabIndex=0;el.dataset.emoOpen="me";hd.appendChild(el);
  el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();el.click()}})}
 el.className="kstm";el.hidden=false;const v=kitMoodVal(),bd=mbBand(v),sg=v>0?"+"+v:String(v);let seal="";try{seal=typeof emoBadge==="function"?emoBadge(S):""}catch(e){}
 const h=`<span class="kmd-seal">${seal}</span><small class="kmd-l">Tâm trạng</small><b class="kmd-w ef ${bd.cls}">${bd.name}</b>${typeof kitSignedBar==="function"?kitSignedBar(v):""}<span class="kmd-n">${sg}</span>`;
 if(el.dataset.h!==h){el.dataset.h=h;el.innerHTML=h;el.title=`Tâm trạng ${bd.name} ${sg} · chạm để xem vì sao`}}catch(e){}}
(function(){const st=document.createElement("style");st.id="kit-moodhud";st.textContent=`
header.hud>.kstm{grid-area:auto;grid-column:1/-1;box-sizing:border-box;display:flex;align-items:center;gap:7px;height:20px;margin-top:2px;padding:2px 4px 0;cursor:pointer;min-width:0;border-top:1px solid var(--k-hair,#e6d3ac)}
.kstm .kmd-seal{display:inline-flex;width:18px;height:18px;flex:0 0 18px}.kstm .kmd-seal img.kemo{width:18px;height:18px;border-radius:50%;object-fit:cover;margin:0;position:static}
.kstm .kmd-l{font-size:.7rem;color:var(--dim);white-space:nowrap}.kstm .kmd-w{font-family:var(--display);font-size:.85rem;white-space:nowrap;min-width:3.6em}
.kstm .ksbar{flex:1 1 auto;width:auto;min-width:40px;height:8px}.kstm .kmd-n{font-family:var(--display);font-size:.85rem;font-variant-numeric:tabular-nums;min-width:2.4em;text-align:right;color:var(--ink)}
`;document.head.appendChild(st)})();
if(typeof renderHUD==="function"){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);mbHud();return r}}
window.mbHud=mbHud;
/* measuring hook */
window.moodStat=function(){return Object.assign({v:S&&S.mood?S.mood.v:null},MOOD_N)};
})();
