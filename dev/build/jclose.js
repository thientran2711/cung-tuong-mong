/* ================= jclose — owner bugs 15/11 16:40Z–17:24Z, each fixed for its WHOLE class (review/close-bugs) =================
   Scans: dev/test/cb-gate.fn.js (khắc/buổi gates), cb-wx (weather × buổi), cb-tap.fn.js (tap paint), cb-suc (Cần duplicates),
   cb-fest (festival × contest titles), cb-ton (event "Tốn: không"). Before/after tables: dev/PROGRESS_close_bugs.md. */

/* ---------- 1. BÁI KIẾN WHILE ALREADY INSIDE (owner 16:40Z) ----------
   She can be inside a palace whose chủ vị outranks her without having greeted: she walked in with the last khắc ("Vào thẳng"),
   the buổi turned while she was there (the new buổi starts at her place, j41/j77), or the chủ vị came home later. The greeting was
   only offered at the gate, so in the new buổi (4 khắc) there was no "Bái kiến" anywhere. Now: tapping that palace on Dư đồ (or in
   Danh sách nơi) opens the place card with "Bái kiến <phẩm> rồi ở lại" (1 khắc, same price and effect as at the gate), or the reason
   it cannot be done now ("cần 1 khắc, còn 0"). Greeting is allowed in every buổi (no rule forbids an evening greeting); the card of
   a place that cannot be entered at night already says why (j77Card). One greeting per buổi per palace. */
function cbGreetTodo(k){try{if(!S||S.dead||!k||S.place!==k||S.out||S.confined)return null;if(k!=="kn"&&k[0]!=="r")return null;const C=ACC_ETQ;if(C.mode==="optional")return null;
 const h=accHost(k);if(!h||h===S||!h.alive||h.out||whereOf(h)!==k)return null;if(rkOf(h)-rkOf(S)<C.rankGap)return null;
 if(k==="kn"&&C.knMorningFree&&(S.buoi||0)===0)return null;const bk=bkey();const G=S.acGreet||{};if(G[k]===bk)return null;
 /* came by invitation / an accepted request this buổi: no greeting is owed (the skip mark tells "walked in without greeting") */
 if(C.invite&&accHas(S,k)&&!((S.acSkip||{})[k]===bk))return null;return h}catch(e){return null}}
function cbGreetMark(k){S.acGreet=S.acGreet||{};S.acGreet[k]=bkey()}
function cbGreetCard(k){const h=cbGreetTodo(k);if(!h)return false;const C=ACC_ETQ,nm=accName(k),hn=`${accRkName(h)} ${h.name}`,sh=h.name.split(" ").pop(),left=Math.max(0,BAL.time.khac-used);
 const L=[`<p>${hn} là chủ vị ${nm}, đang ở cung. Ngươi đang ở đây mà chưa bái kiến trong ${String(BUOI[S.buoi||0]).toLowerCase()}.</p>`];const opts=[];
 if(j77Kh(C.khac))opts.push({n:`Bái kiến ${accRkName(h)}`,fx:{},x:`Chắc chắn · tốn: ${C.khac} khắc · thành: ${sh}: ${typeof pvRel==="function"?pvRel(h,C.okAff):"quý ngươi +"+C.okAff}`,go:()=>setTimeout(()=>cbGreetGo(k),0)});
 else L.push(`<p class="past">Bái kiến: ${j77Bound(C.khac)}.</p>`);
 opts.push({n:"Thôi",fx:{},x:"",go:()=>setTimeout(()=>{S.acSeen=S.acSeen||{};S.acSeen[k]=bkey();window.__fromMap=1;tab="act";render()},0)});
 Q.push({t:nm,h:L.join(""),opts});const m=Q[Q.length-1];try{if(typeof kitPlaceDress==="function")kitPlaceDress(m,k)}catch(e){}showModal();return true}
function cbGreetGo(k){const h=cbGreetTodo(k);if(!h||Q.length||!j77Kh(ACC_ETQ.khac))return;const C=ACC_ETQ,sg=n=>(n>0?"+":"")+n;const bf=typeof rsnap==="function"?rsnap():null;
 spend(C.khac);relAdd(S,h,C.okAff);cbGreetMark(k);log(`Ngươi cúi chào, bái kiến ${accRkName(h)} ${h.name} ở ${accName(k)}: chủ vị quý ngươi ${sg(C.okAff)}.`);try{if(typeof k61Meet==="function")k61Meet(h,"",1)}catch(e){}render();
 setTimeout(()=>{try{if(bf)resultShow(`Bái kiến ${accRkName(h)} ${h.name}`,bf,true)}catch(e){}},30)}
/* the gate's own greeting / walk-in marks the buổi */
(function(){if(typeof accEtqGo!=="function")return;const g0=accEtqGo;accEtqGo=function(k,h,greet){const r=g0.apply(this,arguments);try{if(S&&!S.dead){if(greet)cbGreetMark(k);else{S.acSkip=S.acSkip||{};S.acSkip[k]=bkey()}}}catch(e){}return r}})();
/* the map tap on her own palace-with-chủ-vị: the card first (until she greets, or chooses to stay this buổi) */
(function(){if(typeof j77Tap!=="function")return;const t0=j77Tap;j77Tap=function(k,empty){try{if(!empty&&S&&k&&S.place===k&&!Q.length&&cbGreetTodo(k)&&!((S.acSeen||{})[k]===bkey())&&cbGreetCard(k))return}catch(e){console.error("cbGreet",e)}return t0.apply(this,arguments)}})();
/* a new buổi that starts inside such a palace says so on the visit line */
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{if(S&&!S.dead&&S.visit&&S.place!=="home"){const h=cbGreetTodo(S.place);
  if(h){const t=`${accRkName(h)} ${h.name} đang ở cung, ngươi chưa bái kiến: chạm ${accName(S.place)} trên Dư đồ để bái kiến (${ACC_ETQ.khac} khắc).`;if(!String(S.visit.msg||"").includes(t))S.visit.msg=(S.visit.msg?S.visit.msg+" ":"")+t}}}catch(e){}return r}})();
/* the walk that arrives next buổi at a palace with a chủ vị: the card says the greeting comes on arrival */
(function(){if(typeof j77Card!=="function")return;const c0=j77Card;j77Card=function(k,empty){const n0=Q.length;const r=c0.apply(this,arguments);try{if(empty||Q.length===n0||!k)return r;
  const m=Q[Q.length-1];if(!m||!m.opts||!m.opts.some(o=>/^Đi \(đến nơi vào buổi sau\)/.test(o.n||"")))return r;const h=accHost(k);
  if(h&&h!==S&&h.alive&&!h.out&&rkOf(h)-rkOf(S)>=ACC_ETQ.rankGap&&(k[0]==="r"||k==="kn")){const line=`<p class="kplr kplsm">Đến nơi mà ${accRkName(h)} ${h.name} ở cung thì theo lệ bái kiến (thêm ${ACC_ETQ.khac} khắc) hoặc vào thẳng.</p>`;
   if(!m.h.includes("theo lệ bái kiến"))m.h=m.h.replace(/<\/div>\s*$/,line+"</div>");if(!m.h.includes("theo lệ bái kiến"))m.h+=line;showModal()}}catch(e){}return r}})();

/* ---------- 2. WEATHER FITS THE BUỔI (owner 16:40Z "nắng gắt" at night, 17:24Z "đom đóm" at noon) ----------
   The week rolls one weather (its flag drives every rule: wet / heat / storm / heavy snow — unchanged). What is SHOWN follows the buổi:
   S.wx.b = the week's weather, S.wx.n = the words for this buổi (HUD chip, date line, dawn card, book, event text {W}).
   Every row: [sáng, trưa, chiều, tối] as [words, icon]. Night never sunny / cicadas / "sớm"; day never moon / fireflies / stars / "đêm". */
const WX_BUOI={
 "hoa đào bay":[["hoa đào bay","hoadao"],["hoa đào bay","hoadao"],["hoa đào bay","hoadao"],["hoa đào bay dưới trăng","hoadao"]],
 "mưa phùn":[["mưa phùn","muaphun"],["mưa phùn","muaphun"],["mưa phùn","muaphun"],["mưa phùn","muaphun"]],
 "sương sớm":[["sương sớm","suongsom"],["nắng dịu","troiquang"],["chiều mát","troiquang"],["sương đêm","suongsom"]],
 "trời quang":[["trời quang","troiquang"],["trời quang","troiquang"],["trời quang","troiquang"],["trời trong, sao sáng","trangram"]],
 "nắng gắt":[["nắng sớm oi ả","nanggat"],["nắng gắt","nanggat"],["nắng gắt","nanggat"],["đêm oi nồng","trangram"]],
 "ve kêu râm ran":[["ve kêu râm ran","vekeu"],["ve kêu râm ran","vekeu"],["ve kêu râm ran","vekeu"],["dế kêu đêm hè","domdom"]],
 "giông tố":[["giông tố","giong"],["giông tố","giong"],["giông tố","giong"],["giông tố","giong"]],
 "đom đóm":[["trời trong mát","troiquang"],["gió nồm","troiquang"],["chiều lộng gió","troiquang"],["đom đóm","domdom"]],
 "lá phong rơi":[["lá phong rơi","laphong"],["lá phong rơi","laphong"],["lá phong rơi","laphong"],["lá phong rơi","laphong"]],
 "nắng vàng":[["nắng vàng","nangvang"],["nắng vàng","nangvang"],["nắng vàng","nangvang"],["trăng thu","trangram"]],
 "gió heo may":[["gió heo may","gioheomay"],["gió heo may","gioheomay"],["gió heo may","gioheomay"],["gió heo may","gioheomay"]],
 "trăng rằm":[["trời thu trong","troiquang"],["trời thu trong","troiquang"],["chiều thu êm","nangvang"],["trăng rằm","trangram"]],
 "tuyết nhẹ":[["tuyết nhẹ","tuyetnhe"],["tuyết nhẹ","tuyetnhe"],["tuyết nhẹ","tuyetnhe"],["tuyết nhẹ","tuyetnhe"]],
 "tuyết dày":[["tuyết dày","tuyetday"],["tuyết dày","tuyetday"],["tuyết dày","tuyetday"],["tuyết dày","tuyetday"]],
 "sương giá":[["sương giá","suonggia"],["trời giá lạnh","suonggia"],["chiều giá lạnh","suonggia"],["đêm sương giá","suonggia"]],
 "mai nở trong tuyết":[["mai nở trong tuyết","maino"],["mai nở trong tuyết","maino"],["mai nở trong tuyết","maino"],["mai nở trong tuyết","maino"]]};
function wxAt(base,b){const R=WX_BUOI[base];return R?R[Math.max(0,Math.min(3,b|0))]:[base,null]}
function wxSync(){try{if(!S||!S.wx)return;if(!S.wx.b||!WX_BUOI[S.wx.b])S.wx.b=WX_BUOI[S.wx.n]?S.wx.n:(S.wx.b||S.wx.n);const [n]=wxAt(S.wx.b,S.buoi||0);S.wx.n=n}catch(e){}}
/* icons for the buổi words (KM_WX is keyed by the shown words) */
(function(){if(typeof KM_WX!=="object")return;for(const b in WX_BUOI)for(const [n,ic] of WX_BUOI[b])if(ic&&!KM_WX[n])KM_WX[n]=ic})();
/* the rules read the WEEK's weather */
(function(){if(typeof kitWxEffects!=="function")return;const e0=kitWxEffects;kitWxEffects=function(w){w=w||(S&&S.wx);if(w&&w.b)w=Object.assign({},w,{n:w.b});return e0.call(this,w)}})();
(function(){const r0=rollWx;rollWx=function(){const r=r0.apply(this,arguments);try{if(S&&S.wx){S.wx.b=S.wx.n;wxSync()}}catch(e){}return r}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);wxSync();return r}})();
(function(){const r0=render;render=function(){wxSync();return r0.apply(this,arguments)}})();

/* ---------- 3. NO TAP RECTANGLE (owner 16:40Z: a translucent blue box over her figure when tapped) ----------
   The browser's own tap highlight (Android Chrome rgba(51,181,229,.4), a rectangle over the whole tappable box) is switched off for the
   whole game (KIT §3 "Chạm"): the kit's press effect (j93 :active scale + brightness, a filter that follows the picture's own pixels)
   is the only feedback. Figures and pictures never get a focus outline from a tap (keyboard focus-visible keeps the kit ring on buttons). */
(function(){const st=document.createElement("style");st.id="kit-tap";st.textContent=`
html,body,*{-webkit-tap-highlight-color:transparent!important}
#stage img:focus,#stage canvas:focus,#stage [role=button]:focus:not(:focus-visible),.kfig:focus:not(:focus-visible),img:focus:not(:focus-visible){outline:none!important}`;document.head.appendChild(st)})();

/* ---------- 4a. KIT LINE (one-line notice, KIT §42.2) — owner 16:40Z: "Đã mở bản mới" sat on the scene title ----------
   kitLine(text, ms): a small pill ABOVE the bottom bar (tabs + Sang buổi), centred, never over the top bar, the scene title strip or a
   dialog title. Used by the new-build notice (dev/site/swreg.js) and any other one-line status. */
function kitLinePos(el){try{const nx=document.getElementById("next");let bot=innerHeight;const bar=nx&&nx.offsetParent?nx.closest("nav,footer,.tabs,.bar,.bottom")||nx.parentElement:null;
 if(bar){const r=bar.getBoundingClientRect();if(r.height&&r.top>innerHeight*.5)bot=r.top}
 /* a dialog is open: the pill sits just above the dialog box (or under it), never on its title or buttons */
 const M=document.getElementById("modal"),d=M&&!M.hidden?M.querySelector(".dlg"):null;if(d){const r=d.getBoundingClientRect();if(r.top>=44){el.style.bottom="auto";el.style.top=Math.round(r.top-38)+"px";return}if(innerHeight-r.bottom>=44)bot=Math.min(bot,innerHeight-2)}
 el.style.top="auto";el.style.bottom=Math.round(innerHeight-bot+10)+"px"}catch(e){}}
function kitLineCss(){if(document.getElementById("kit-line"))return;const st=document.createElement("style");st.id="kit-line";st.textContent=`
.kupdline{position:fixed;left:50%;transform:translateX(-50%);z-index:9750;max-width:calc(100vw - 24px);margin:0;padding:5px 14px;border-radius:14px;border:1px solid var(--gold,#b8892b);background:#fffaf0f4;color:var(--ink,#3a2418);font:600 .82rem/1.3 var(--body,inherit);box-shadow:0 4px 14px #0004;text-align:center;pointer-events:none;transition:opacity .5s}
.kupdline.out{opacity:0}`;document.head.appendChild(st)}
function kitLine(text,ms){kitLineCss();let el=document.getElementById("kupdline");if(!el){el=document.createElement("div");el.id="kupdline";el.className="kupdline";el.setAttribute("role","status");document.body.appendChild(el)}
 el.textContent=text;el.classList.remove("out");kitLinePos(el);clearTimeout(kitLine.t);if(ms)kitLine.t=setTimeout(()=>{el.classList.add("out");setTimeout(()=>{if(el.classList.contains("out"))el.remove()},600)},ms);return el}
window.kitLine=kitLine;

/* ---------- 5. ONE Sức NEED PER CARD (owner 17:12Z: "Múa trong yến tiệc": "cần Sức trên 20 (có 17)" AND "Sức ≥5 (có 17)") ----------
   The Cần row read the floor (Sức ≥5) while the card's real gate (j76) is "more Sức than the card costs". One need, the real one:
   cost c > floor → "Sức trên c"; else the floor "Sức ≥5"; rest cards (they restore Sức) and 1-khắc acts need no Sức. */
(function(){if(typeof kaTimeNeeds!=="function")return;kaTimeNeeds=function(c,bacCost){const L=[];const left=BAL.time.khac-used;L.push(j76need(c,window.__cbCard));
 const fl=BAL.time.sucMin;const A=window.__cbCard;const cs=A&&A.c&&A.c.suc<0?-A.c.suc:0;const rest=!!(A&&typeof j76isRest==="function"&&j76isRest(A));
 if(c>1&&!rest){if(cs>0&&cs+1>fl)L.push({t:`Sức trên ${cs} (có ${S.suc})`,ok:S.suc>cs});else L.push({t:`Sức ≥${fl} (có ${S.suc})`,ok:S.suc>=fl})}
 if(bacCost>0)L.push({t:`Bạc ${bacCost} (có ${S.bac})`,ok:S.bac>=bacCost});return L}})();
/* the card being drawn, for kaTimeNeeds (j63 builds the Cần row after the j76 wrapper has already returned) */
(function(){const c0=cardH;cardH=function(a){const p=window.__cbCard;window.__cbCard=a;try{return c0.apply(this,arguments)}finally{window.__cbCard=p}}})();

/* ---------- 6. NO "Tốn: không" ON EVENT CHOICES (owner 17:08Z) ----------
   An event option that costs nothing shows no Tốn row at all (only real costs are shown). kitHideOut (jk2b, KIT 28.6) wrote "không". */
/* ONE implementation (reviewer opt-render r7): kitHideOut itself (jk2b, KIT 28.6) drops the Tốn row when no real cost is left, so the
   wrapper that removed a "không" row here is gone. dev/test/cb-ton.fn.js still checks it. */

/* ---------- 7. WEATHER NEVER ADDS WALKING KHẮC (owner 15/11 06:40Z, found again by the khắc-gate scan) ----------
   "KHÔNG thêm khắc đi đường (đã có Sức hồi chậm, không phạt 2 lần)": a far walk is 2 khắc in every weather (was 3 when wet).
   Bad weather keeps its real costs elsewhere (Sức recovery, outdoor acts' own Mất lines). */
travel=function(a,b){if(a===b)return 0;{const W=window.__walkSpill;if(W&&S&&(S.buoi||0)===W.b&&a===W.from&&b===W.k)return W.rest}const [r1,c1]=mapPos(a||"home"),[r2,c2]=mapPos(b);return Math.abs(r1-r2)+Math.abs(c1-c2)>1?BAL.walk.far:BAL.walk.near};
(function(){if(typeof kitWxEffects!=="function")return;const e0=kitWxEffects;kitWxEffects=function(){return e0.apply(this,arguments).filter(x=>!/^Đi đến nơi xa tốn/.test(x[1]))}})();
/* the gate's own words match the Cần chip, so the card shows ONE Sức line (kaNorm1 merges equal needs): "cần Sức trên 20 (có 17)" /
   "cần Sức ≥5 (có 3)" — was "kiệt sức (Sức 3, cần 5) — nghỉ ngơi trước" beside the chip "Sức ≥5 (có 3)" */
if(typeof j76sucWhy==="function"){j76sucWhy=function(c){if(!S||S.dead||c<=1||window.__j76rest||window.__j76trip)return"";const cs=window.__j76cs||0;const fl=BAL.time.sucMin;
 if(cs&&S.suc+cs<=0&&-cs+1>fl)return `cần Sức trên ${-cs} (có ${S.suc})`;return S.suc<fl?`cần Sức ≥${fl} (có ${S.suc})`:(cs&&S.suc+cs<=0?`cần Sức trên ${-cs} (có ${S.suc})`:"")}}
