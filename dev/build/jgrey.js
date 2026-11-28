/* jgrey: two KIT parts (KIT.md §GREY, kit page) — written by the kit keeper.
   1. GREYED OPTION (owner 16/11 ~21:10Z "Chung Tú cung"): a known option she cannot take now because of COST, RANK or ITEM is never hidden:
      it shows in the kit option list greyed (not tappable) with a reason chip in the Cần row and when it opens again.
      TIME is NOT a grey reason (acts spill into the next buổi; s24 scope change).
      Use: opts.push(kitOff({n,fx,x,go}, kitWhyBac(fee)))  or  kitOff(opt, why, when) ; the numbers print live values / BAL, never typed.
      Truly unknown or story-locked options stay hidden. j3 showModal renders c.off as disabled + data-kneed; chooseM refuses it. */
function kitOff(c,why,when){if(!c)return c;c.off={why:String(why||""),when:String(when||"")};return c}
function kitWhyBac(need){const have=(typeof S!=="undefined"&&S)?S.bac:0;return `thiếu ${Math.max(0,need-have)} bạc (cần ${need}, có ${have})`}
function kitWhySuc(need){const have=(typeof S!=="undefined"&&S)?S.suc:0;return `thiếu ${Math.max(0,need-have)} sức (cần ${need}, có ${have})`}
function kitWhyRank(r){return `cần phẩm ${RANKS[r].n} trở lên`}
function kitWhyItem(name,n){return `thiếu ${name}${n>1?` (cần ${n})`:""}`}
/* when it opens again, in words */
function kitWhenBac(){return "mở lại khi đủ bạc"}
function kitWhenRank(){return "mở lại khi được tấn phong"}
function kitWhenItem(){return "mở lại khi có đủ đồ"}
function kitOffAttr(c){if(!c||!c.off||!c.off.why)return"";const t=c.off.why+(c.off.when?` · ${c.off.when}`:"");return ` data-kneed="${encodeURIComponent(JSON.stringify([{t,ok:false}]))}"`}
/* 2. STAND-IN MARKER 'tạm' (owner 16/11): ONE small chip on any stand-in picture; shown only while the picture lookup says stand-in
      (art.tam true / kitTam(true)); gone by itself when the exact picture exists. Caller: kitTam(isStandin) -> html ('' when exact).
      Put it inside a position:relative picture box. */
function kitTam(standin){return standin?`<span class="ktam" role="note" title="Tranh tạm, sẽ có tranh đúng sau">tạm</span>`:""}
/* 3. PORTRAIT STATE (owner 27/11 ~05:10Z, one kit part): who is in lãnh cung keeps her OWN colours, NO sepia/brown tint, only much paler and lighter (.kst-lc: lower saturation + lift toward white; owner 27/11 ~05:46Z);
      black-and-white is reserved for the DEAD (.kst-dead: the WHOLE portrait incl. its frame, owner ~05:59Z; lãnh cung = image only, frame keeps its colours, owner ~05:53Z). Set by jdead.js from f.st ('lc' | 'dead') on the two portrait renderers (mdH → .md, pcPort → .pcp) AND by kstPaint on every full-body figure (stage tokens, #mefig, img.kesimg, .kszfs>img: the --kst var sits in each figure's filter chain next to --klf),
      so every place a person is drawn (Hậu cung strip + card, men, relation rows, panels) shows the same state. Values are the look, not game numbers. */
(function(){const st=document.createElement("style");st.textContent=`
.kst-lc{--kst:saturate(.85) contrast(.97) brightness(1.03)}
.kst-dead{--kst:grayscale(1) brightness(.92)}
.kesf.kst-dead>.kpsn,.kszfig.kst-dead .kt3{filter:var(--kst)}/* KIT §8.2d: a dead person's dialog figure — the name plate too (owner ~05:59Z «khung trắng đen») */
/* status band of a kit portrait (Ở lãnh cung / Đã khuất) sits INSIDE the picture, above the tassel: it covered the relation rows under the portrait (MAIN LOOK 172) */
.pcp.kit>.pcs{bottom:31%;left:14%;right:14%;border-radius:4px}
/* the band is its OWN dark plate + white text in both states, never washed by the picture state (MAIN 172 ruling 27/11 ~06:28Z); the legacy .rk-cold grayscale(.6) on the whole portrait is gone for lãnh cung so the kit lãnh cung FRAME keeps its colours (owner ~05:53Z) — the pale filter is on the image only */
.pcp.kit>.pcs{background:#2a1a12f2;color:#fff;font-size:.78rem;filter:none}
/* the dead record box (jdead dthIn): under the facts in «Thông tin», clear of the wear row's grade badges */
.kdrec{margin-top:18px}
.pcp.rk-cold.kst-lc,.md.rk-cold.kst-lc{filter:none}
html body .pface.on>.md.rk-cold.kst-lc{filter:var(--k-glow)}
.md.kst-dead,.pcp.kst-dead,.md.kst-lc>img:not(.pcb2),.md.kst-lc .kin>img.kpor,.md.kst-lc .kin>.kbg,.pcp.kst-lc>img:not(.pcb2),.pcp.kst-lc .kin>img.kpor,.pcp.kst-lc .kin>.kbg,img.kst-lc:not(.figimg):not(.kesimg):not(#mefig),img.kst-dead:not(.figimg):not(.kesimg):not(#mefig){filter:var(--kst)}
html body .pface.on>.md.kst-dead{filter:var(--kst) var(--k-glow)}
`;document.head.appendChild(st)})();
(function(){const st=document.createElement("style");st.textContent=`
.ktam{position:absolute;top:6px;right:6px;z-index:5;pointer-events:none;font:600 .68rem/1 var(--body);letter-spacing:.04em;color:#ffe7b0;background:#1a0e08b8;border:1px solid #d2b07188;border-radius:999px;padding:3px 8px}
.ktam.ktam-tl{right:auto;left:6px}.ktam.ktam-br{top:auto;bottom:6px}.ktam.ktam-bl{top:auto;bottom:6px;right:auto;left:6px}
`;document.head.appendChild(st)})();
/* 2b. 'tạm' NEVER COVERS WORDS (owner OD 25/11 ~22:45Z: the chip sat on the stage place name «Khuê phòng»): kitTamFit(root) puts every visible .ktam
      in the first corner of its picture box (top-right, top-left, bottom-right, bottom-left) where it covers no visible text, button (the stage rail icons too) or name tag;
      the stage calls it after each paint (renderStage) and on resize. No free corner: it stays top-right (never moved out of its picture). */
function kitTamFit(root){try{const T=[...(root||document).querySelectorAll(".ktam")].filter(t=>t.offsetParent);if(!T.length)return;
 /* only what sits over the chip's own picture box (light: no whole-page scan, no style reads) */
 const box=T[0].parentElement||document.body;
 const W=[...box.querySelectorAll("h1,h2,h3,button,.rt1,.rmsg,[class*=tag],[class*=name],b,span,small,a,label")].filter(e=>!e.classList.contains("ktam")&&!e.closest(".ktam")&&((e.textContent||"").trim()||e.tagName==="BUTTON")&&e.offsetParent);
 const hit=(a,e)=>{if(e.contains&&e.contains(a.el))return false;const b=e.getBoundingClientRect();return b.width>0&&b.height>0&&a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top};
 for(const t of T){const C=["","ktam-tl","ktam-br","ktam-bl"];let ok="";
  for(const c of C){t.classList.remove("ktam-tl","ktam-br","ktam-bl");if(c)t.classList.add(c);const r=t.getBoundingClientRect();const a={el:t,left:r.left,right:r.right,top:r.top,bottom:r.bottom};
   if(!W.some(e=>hit(a,e))){ok=c;break}}
  t.classList.remove("ktam-tl","ktam-br","ktam-bl");if(ok)t.classList.add(ok)}}catch(e){console.error("kitTamFit",e)}}
window.kitTamFit=kitTamFit;
(function(){let q=0;const go=()=>{cancelAnimationFrame(q);q=requestAnimationFrame(()=>kitTamFit(document.getElementById("stage")))};
 if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){const x=r0.apply(this,arguments);if(document.querySelector("#stage .ktam")){go();setTimeout(go,400)}return x}}
 addEventListener("resize",go)})();
/* ONE place that maps an engine need[{t,ok,w?}] (the same shape as the Cần row / data-kneed) to the greyed option:
   the first unmet need becomes the reason chip ("thiếu …"), w (or the item/evidence/rank default) is the "opens again when" line.
   Whole group: item / evidence / rank gated options of the ch70 / evChoice (c6) engine, truth (vu oan), toilette give-back, accuse. */
function kitWhyEv(a,n){const have=(typeof evG==="function"&&a)?evG(S,a):0;return `thiếu chứng cứ về ${a&&a.name||"nàng"} (cần ${n}, có ${have})`}
function kitWhenEv(){return "mở lại khi nắm đủ chứng cứ"}
function kitOffNeed(c,needs){const u=(needs||[]).filter(x=>x&&!x.ok);if(!c||!u.length)return c;const n=u[0];return kitOff(c,n.t,n.w||"")}
function kitWhenWit(){return "mở lại khi cung nữ thêm tin cẩn"}
function kitWhenTy(){return "mở lại khi có thái y tâm phúc"}
function kitOffIf(c,ok,why,when){return ok?c:kitOff(c,why,when)}
function kitOffBac(c,fee){if(typeof S!=="undefined"&&S&&S.bac<fee){kitOff(c,kitWhyBac(fee),kitWhenBac());c.off.k="bac"}return c}/* k: held back by bạc alone (jnolock may pay it another way) */
/* kit sample page entries */
try{if(typeof KIT_SAMPLES!=="undefined"){
 KIT_SAMPLES.push({id:"§84 greyed option",title:"GREYED OPTION · kitOff (a known option she cannot take: cost / rank / item) — greyed, reason chip in Cần, when it opens again",where:"every dialog option list (VIỆC, visits, place card, teaching); the same ACT CARD frame, disabled",html:()=>`<div style="max-width:560px"><button class="opt" disabled data-kneed="${encodeURIComponent(JSON.stringify([{t:`thiếu ${BAL.kitpage.demo.grey.need-BAL.kitpage.demo.grey.have} bạc (cần ${BAL.kitpage.demo.grey.need}, có ${BAL.kitpage.demo.grey.have}) · mở lại khi đủ bạc`,ok:false}]))}">Ma ma giáo tập<small>tốn: ${BAL.kitpage.demo.grey.k} khắc, Sức -${BAL.kitpage.demo.grey.suc}, Bạc -${BAL.kitpage.demo.grey.need} · thành: tiến bộ +2..3</small></button></div>`});
 KIT_SAMPLES.push({id:"§84 need[] chips",title:"GREYED OPTION from engine need[] · kitOffNeed / kitWhyEv / kitWhyItem — item and evidence gated options stay in the list, greyed, chip says what is missing and when it opens",where:"vu oan defence (trình chứng cứ, Thái y, cung nữ), antidote card, toilette give-back, accuse",html:()=>`<div style="max-width:560px;display:grid;gap:8px"><button class="opt" disabled data-kneed="${encodeURIComponent(JSON.stringify([{t:`thiếu chứng cứ về Lục Dao Cầm (cần ${BAL.kitpage.demo.ev.need}, có ${BAL.kitpage.demo.ev.have}) · mở lại khi nắm đủ chứng cứ`,ok:false}]))}">Trình chứng cứ về Lục Dao Cầm<small>Khá chắc · tốn: 1 chứng cứ · thành: minh oan</small></button><button class="opt" disabled data-kneed="${encodeURIComponent(JSON.stringify([{t:"thiếu thuốc giải · mở lại khi có đủ đồ",ok:false}]))}">Uống thuốc giải trong rương<small>tốn: 1 thuốc giải · thành: độc tan ngay</small></button></div>`});
 KIT_SAMPLES.push({id:"§84 tạm",title:"STAND-IN MARKER 'tạm' · kitTam(isStandin)",where:"corner of any stand-in picture (courtyard first); gone when the exact picture exists",html:()=>`<div style="position:relative;max-width:360px;height:120px;background:#7a6a55;border-radius:8px">${kitTam(true)}</div>`})}}catch(e){}
