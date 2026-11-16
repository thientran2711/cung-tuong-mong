/* ================= jplace: THẺ NƠI CHỐN (KIT 32.8) + ONE OPTION LAYOUT RULE (KIT 32.9) — owner 11/15 08:55Z / 08:58Z =================
   Every place card (tap a place on Dư đồ or in Danh sách nơi; Xin bái kiến / Xin yết kiến / Lẻn vào; the greeting card; the last walk
   of a buổi) wears the SAME large place-event frame as place event dialogs (32.6): TOP = the place picture of the current season + buổi
   (img/<nơi>-<mùa>-<buổi>.webp via sceneImg; a palace without its own picture uses the shared phi-tan-cung picture, the approved rule),
   kit frame with the place name, and when people are there their number of grey silhouettes standing on the picture (no faces);
   MIDDLE = one info box (walk khắc, khắc left, people, opening hours, the rule / reason lines); BOTTOM = the buttons by the shared rule.
   Vertical on every size (owner 08:58Z replaced "picture left / info right"). */
function kitPlaceArt(k){try{if(typeof scnSync==="function")scnSync();
 if(k==="home"&&placeOf(k).sc!=="maid"){const f=typeof sceneImg==="function"?sceneImg("tam-cung-dem"):"tam-cung-dem";return{src:`img/${f}.webp`,label:placeOf(k).n}}
 const P=placeOf(k);const f=SCIMG[P.sc]||SCIMG.rv;return f?{src:`img/${f}.webp`,label:P.n}:null}catch(e){return null}}
function kitPlaceHours(k){if(typeof ACC_DAY!=="undefined"&&ACC_DAY[k])return"mở cửa sáng, chiều";if(k==="tn")return"tiếp lúc sáng thỉnh an";
 if(k==="kn")return"sáng thỉnh an, lúc khác phải được mời";if(k==="dtd"||k==="thu")return"chỉ vào khi được triệu";return""}
/* the info (review/kit-sweep 16/11, owner "Má nó, kit chung đâu"): the place card is the EVENT FRAME (KIT §8.2) — ONE place picture LEFT
   (headArt → kitOnePic moves it into the .kpsubj.kpiart slot), RIGHT = kit rows (kitRows §51: Chủ vị · Đường đi · Còn · Bóng người · Giờ)
   + the card's own lines as kit fact rows; options below as kit option rows (32.9), scrolling inside the frame. No hand-built columns,
   no second picture, no portrait cell, no silhouettes drawn on the picture (the count is a row). */
function kitPlaceHostName(q){try{if(!q)return"";if(q.p&&typeof q.p==="object")return kitName(q.p);if(q.p==="th"&&S&&S.thO)return kitName(S.thO);return q.name||""}catch(e){return q&&q.name||""}}
function kitPlaceInfo(k,h){let tc=0,n=0;try{tc=k===S.place?0:travel(S.place,k)}catch(e){}try{n=countAt(k)}catch(e){}const left=Math.max(0,4-used);const hr=kitPlaceHours(k);
 const q=kitPlaceHost(k);const R=[];if(q)R.push(["Chủ vị",kitPlaceHostName(q)]);if(tc)R.push(["Đường đi",`${tc} khắc`]);R.push(["Còn",`${left} khắc`,left?"n":"r"]);
 if(n)R.push(["Bóng người",`${n}`]);if(hr)R.push(["Giờ",hr[0].toUpperCase()+hr.slice(1)]);
 const t=document.createElement("template");t.innerHTML=String(h||"");const L=[];
 t.content.querySelectorAll("p").forEach(p=>{const s=p.textContent.trim();if(!s||/bóng người ở đó\.?$/.test(s)||/^Mở cửa buổi sáng/.test(s))return;L.push(`<p${p.classList.contains("past")?' class="past"':""}>${p.innerHTML}</p>`)});
 return kitRows(R)+L.join("")}
/* KIT 32.8b (owner 11/15 15:45Z): the head of the palace when she is at home — now a kit row "Chủ vị" (rank + name, stranger rule via relPerson / j61). */
function kitPlaceHost(k){try{if(!S||!k||k==="home"||typeof relPerson!=="function")return null;
 if(k==="tn"){if(S.thDead)return null;return relPerson("th")}
 if(k!=="kn"&&k[0]!=="r")return null;const h=typeof accHost==="function"?accHost(k):null;
 if(!h||h===S||!h.alive||h.out||(typeof whereOf==="function"&&whereOf(h)!==k))return null;return relPerson(h.id)}catch(e){return null}}
window.kitPlaceHost=kitPlaceHost;
function kitPlaceDress(m,k){if(!m||!k||m.placeK)return;m.placeK=k;const a=kitPlaceArt(k);if(a)m.headArt=a;m.h=kitPlaceInfo(k,m.h);if(m.opts)m.optLayout=undefined}
/* KIT §8.2: the place card carries .kplace only as a tag for tests; it has no layout of its own */
function kitPlaceSil(){try{const m=Q[0];const d=document.querySelector("#modal .dlg");if(d)d.classList.toggle("kplace",!!(m&&m.placeK))}catch(e){}}
/* tag the cards: each builder's own card (after all its wrappers) is dressed once, then shown again */
(function(){function wrap(name){const f0=window[name];if(typeof f0!=="function")return;
  window[name]=function(k){const n0=Q.length;const r=f0.apply(this,arguments);try{if(k&&Q.length>n0){const m=Q[Q.length-1];if(m&&!m.placeK&&m.t===accName(k)){kitPlaceDress(m,k);showModal()}}}catch(e){console.error("kitPlace",name,e)}return r}}
 ["j77Card","j77LastWalk","accEtqCard"].forEach(wrap)})();

/* ---------- KIT 32.9 ONE OPTION LAYOUT RULE (kitOptLayout) — every dialog, 32.6 / 32.7 included ----------
   SHORT option = its name + at most ONE effect line (Tốn / Được / … row); LONG = two or more rows (Cần / Tốn / Được / Mất / Kèm), or a name
   over two lines. All short → 2-column grid of equal buttons (3 on ≥ 1000 px with 3+); any long → each long one is a full-width row, the
   short ones share the grid. "Để sau" / "Bỏ qua" / "Không đi" (kback) is a compact secondary button with no empty effect line, in its
   own place (no "always last" rule any more); when every other option is long it sits as a slim row. "Thôi" / "Lui" are never buttons:
   the dialog's ✕ (KIT 32.10). A Q item may still force optLayout:'rows'|'grid'. */
const KIT_BACK=/^(Để sau|Bỏ qua|Không đi)$/;
function kitOptIsBack(b){const t=b.querySelector(".kan");return KIT_BACK.test(((t||b).textContent||"").trim())}
function kitOptIsLong(b){if(b.classList.contains("kback"))return false;const rows=b.querySelectorAll(".kr").length;if(rows>=2)return true;
 const t=b.querySelector(".kan");const lh=parseFloat(t?getComputedStyle(t).lineHeight:0)||20;return !!(t&&t.getBoundingClientRect().height>lh*2.3)}
function kitOptLayout(B){B.forEach(b=>{if(kitOptIsBack(b)){b.classList.add("kback");b.querySelectorAll(".kb,.kr").forEach(x=>{if(!/[0-9]/.test(x.textContent))x.remove()})}});
 const L=B.map(kitOptIsLong);const main=B.filter(b=>!b.classList.contains("kback"));const mainLong=main.filter(b=>L[B.indexOf(b)]);
 return{long:L,mode:!main.length||!mainLong.length?"grid":mainLong.length===main.length?"rows":"mixed"}}
k3IsLong=function(b){return kitOptIsLong(b)};
/* a grid cell too narrow for its own lines (an effect line that wraps, a name over two lines): the group goes back to full rows */
function kitOptCramped(g){return [...g.querySelectorAll(":scope > button.ka:not(.k3long):not(.k3odd):not(.kback)")].some(b=>{const t=b.querySelector(".kan");const lt=parseFloat(t?getComputedStyle(t).lineHeight:0)||20;
 if(t&&t.getBoundingClientRect().height>lt*2.3)return true;return [...b.querySelectorAll(".krv")].some(v=>{const l=parseFloat(getComputedStyle(v).lineHeight)||18;return v.getBoundingClientRect().height>l*1.6})})}
(function(){const c0=k3OptCols;k3OptCols=function(){try{document.querySelectorAll("#modal .opts:has(> button.ka), #modal .kpscopts").forEach(g=>{const dl=g.closest(".dlg");if(dl&&dl.querySelector(".kpid"))return;
  const B=[...g.querySelectorAll(":scope > button.ka")];const R=kitOptLayout(B);g.classList.toggle("kbackrow",R.mode==="rows"&&B.some(b=>b.classList.contains("kback")))})}catch(e){}
 const r=c0.apply(this,arguments);
 try{document.querySelectorAll("#modal .opts.k3grid, #modal .kpscopts.k3grid").forEach(g=>{if(!g.classList.contains("kbackrow")&&!kitOptCramped(g))return;g.classList.remove("k3grid","k3g3");g.classList.add("k3rows");
   g.querySelectorAll(":scope > button.ka").forEach(b=>b.classList.remove("k3long","k3odd"))})}catch(e){}return r}})();
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kitPlaceSil();requestAnimationFrame(()=>{kitPlaceSil();try{kitDlgFit()}catch(e){}})}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="k-place";st.textContent=`
/* 32.9 secondary button ("Để sau" / "Bỏ qua"): compact; keeps its place (KIT 32.10: no "Thôi luôn cuối") */
html body #modal .opts.k3rows>button.ka.kback{min-height:0!important;padding-top:7px!important;padding-bottom:7px!important}
html body #modal .opts>button.ka.kback .kat{justify-content:center;border-bottom:0!important;padding-bottom:0!important;margin-bottom:0!important}
html body #modal .opts>button.ka.kback .kan{font-weight:600;color:var(--ink2,#6b4a2a)}
html body #modal .opts.k3grid>button.ka.kback .kat{min-height:100%;align-items:center}
/* 32.7 person dialogs follow the same rule: short options in the 2-column grid */
html body #modal .dlg.kdper>#mb>.opts.k3grid:has(> button.ka){display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;align-content:start;gap:8px}
html body #modal .dlg.kdper>#mb>.opts.k3grid>button.ka.k3long,html body #modal .dlg.kdper>#mb>.opts.k3grid>button.ka.k3odd{grid-column:1/-1!important}
html body #modal .dlg.kdper>#mb>.opts.k3grid>button.ka.k3long{order:1!important}html body #modal .dlg.kdper>#mb>.opts.k3grid>button.ka.kback{order:3!important}
html body #modal .opts>button.ka.kback .kan{text-align:center;width:100%}
`;document.head.appendChild(st)})();
