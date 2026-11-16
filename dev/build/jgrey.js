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
(function(){const st=document.createElement("style");st.textContent=`
.ktam{position:absolute;top:6px;right:6px;z-index:5;pointer-events:none;font:600 .68rem/1 var(--body);letter-spacing:.04em;color:#ffe7b0;background:#1a0e08b8;border:1px solid #d2b07188;border-radius:999px;padding:3px 8px}
`;document.head.appendChild(st)})();
function kitOffBac(c,fee){if(typeof S!=="undefined"&&S&&S.bac<fee)kitOff(c,kitWhyBac(fee),kitWhenBac());return c}
