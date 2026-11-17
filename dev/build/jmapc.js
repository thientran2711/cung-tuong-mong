/* jmapc: KIT PART "Dư đồ · họa đồ chú thiêm" (style C, owner 16/11 "kiểu C là đã ok rồi"; KIT §85; art dev: Foreman C, review/map-frame-c).
   ONE part for every map label: no leather/frame (map full-bleed with a 1 px hairline), each place name on a pale-yellow paper slip
   (img/kit/mapslip.webp, 9-slice), the info row (.mmeta "N bóng · K khắc") on the same slip, a small "Dư đồ" cartouche, the tools (−, +, Ra vào,
   Danh sách) in a slim paper band ABOVE the map (cannot cover a label), clipped labels at the pan edge fade out.
   The dark people-count chip .msil is GONE everywhere (silChip / k61SilChip / kpmSil return ""): the text row is the one info line,
   shown on every device (Fold too). mapFit (j38) tests each place as ONE box (.mlab + .mmeta). Used by: Dư đồ all zooms, palace detail .kpm-spot. */
(function(){const st=document.createElement("style");st.textContent=`
.panel:has(>.kleather) .kleather{padding:0!important;background:none!important;clip-path:none!important;border:0!important;box-shadow:none!important;filter:none!important;-webkit-mask:none!important;mask:none!important;display:flex!important;flex-direction:column}
.kleather::before,.kleather::after,.kleather>.kl-tone,.kleather>.kl-roll,.kleather>[class*=stitch],.kleather>[class*=roll]{display:none!important}
html .game .kleather>.maptools{position:static!important;inset:auto!important;flex:none;order:-1;display:flex!important;align-items:center;justify-content:space-between;height:38px;padding:0 6px 0 8px;background:#f7efd6;border-bottom:1px solid #b79a5b99;z-index:5;pointer-events:auto}
html .game .kleather>.maptools:not(:has(.kpm-back))::before{content:"Dư đồ";display:inline-flex;align-items:center;justify-content:center;width:92px;height:26px;background:url(img/kit/mapslip-cartouche.webp) 0 0/100% 100% no-repeat;font:600 14px/1 var(--display);letter-spacing:.14em;color:#4a2a14;text-indent:.14em;padding-bottom:1px}
html .game .kleather>.maptools>span:last-child{position:static!important;display:flex;gap:4px}
html .game .kleather>.maptools .mz{min-height:28px;padding:0 9px;font-size:.72rem;background:#fffaf0;border:1px solid #c9a35a;border-radius:6px;box-shadow:none}
.kleather:not(.kpmv)>.mapsc{flex:1;height:auto!important}
.kleather>.mapsc{border-radius:0!important;box-shadow:none!important;outline:1px solid #b79a5bcc;outline-offset:-1px}
.kleather:not(.kpmv)>.mapsc{-webkit-mask-image:linear-gradient(#0000,#000 14px,#000 calc(100% - 14px),#0000),linear-gradient(90deg,#0000,#000 14px,#000 calc(100% - 14px),#0000);-webkit-mask-composite:source-in;mask-image:linear-gradient(#0000,#000 14px,#000 calc(100% - 14px),#0000),linear-gradient(90deg,#0000,#000 14px,#000 calc(100% - 14px),#0000);mask-composite:intersect}
/* §85.6 FULL SCREEN (owner 17/11 03:52Z, OD:L133/L1410/L1433): the map fills the whole page area edge to edge; the tools row, the left rail and the right column are OVERLAYS on it (same columns as her room stage), nothing shrinks the map */
html body .mapv.kside>:not(#kshR):not(#krail):not(.kl-tone){margin-left:0!important;margin-right:0!important}
html body .mapv.kside>#kshR{top:6px;right:6px}html body .mapv.kside>#krail{left:6px!important;top:6px!important}
html body .game .mapv.kside.kleather>.mapsc{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;flex:none!important;outline:0!important;-webkit-mask:none!important;mask:none!important}
html body .game .mapv.kside.kleather>.maptools{position:absolute!important;top:6px!important;left:56px!important;right:calc(var(--kgrw,150px) + 14px)!important;inset-block-end:auto!important;height:38px;background:none!important;border:0!important;padding:0!important;pointer-events:none;z-index:8}
html body .game .mapv.kside.kleather>.maptools>*{pointer-events:auto}
html body .game .mapv.kside.kleather>.maptools:not(:has(.kpm-back))::before{filter:drop-shadow(0 1px 2px #3a2a1e88)}
html body .game .mapv.kside.kleather>.maptools .mz{box-shadow:0 1px 3px #3a2a1e66}
/* §85.7 FIT-ALL + SOFT EDGES + FLUSH PAN (owner 17/11 ~12:12Z "Dư đồ zoom gần quá", ~12:25Z "loang ở mép … 2 mép trái phải", ~12:35Z "mờ 2 mép trên dưới … mỏng thôi"):
   KIT_MAPV values (CSS vars, one place): --kmv-fl/--kmv-fr = space the left rail / right card column take (the map's pan range is padded by them, so its edge lands FLUSH against the frames and nothing hides under them),
   --kmv-ft = space of the tools row on top, --kmv-fade-x = WIDE left/right soft edge, --kmv-fade-y = THIN top/bottom soft edge (painted map edge dissolves into the paper; labels stay on top).
   mapFit (j38) reads the margins below: default zoom = whole palace inside the free area; the place labels shrink (--mls) so they do not touch. */
html body .game .mapv.kside.kleather{--kmv-ov:0px;--kmv-fl:calc(56px + var(--kmv-ov));--kmv-fr:calc(var(--kgrw,150px) + 8px + var(--kmv-ov));--kmv-ft:46px;--kmv-fb:0px;--kmv-fade-x:clamp(44px,9%,120px);--kmv-fade-y:12px}
html body .game .mapv.kside.kleather:not(.kpmv)>.mapsc{display:flex!important;justify-content:safe center;align-items:safe center;overflow:auto!important;scrollbar-width:none;background:#e6dabf}
html body .game .mapv.kside.kleather:not(.kpmv)>.mapsc::-webkit-scrollbar{display:none}
html body .game .mapv.kside.kleather>.mapsc>.mapw{margin:var(--kmv-ft) var(--kmv-fr) var(--kmv-fb) var(--kmv-fl)!important;flex:none!important;min-width:0!important;position:relative}
html body .game .mapv.kpmv.kside.kleather{--kmv-fb:54px}
html body .game .mapv.kpmv.kside.kleather>.mapsc{background:#e6dabf!important}
html body .game .mapv.kside.kleather>.mapsc .mapimg{-webkit-mask-image:linear-gradient(90deg,#0000,#000 var(--kmv-fade-x),#000 calc(100% - var(--kmv-fade-x)),#0000),linear-gradient(#0000,#000 var(--kmv-fade-y),#000 calc(100% - var(--kmv-fade-y)),#0000);-webkit-mask-composite:source-in;mask-image:linear-gradient(90deg,#0000,#000 var(--kmv-fade-x),#000 calc(100% - var(--kmv-fade-x)),#0000),linear-gradient(#0000,#000 var(--kmv-fade-y),#000 calc(100% - var(--kmv-fade-y)),#0000);mask-composite:intersect}
.mapw .mspot .mlab,.mapw .mspot .mmeta{zoom:var(--mls,1)}
/* §85.6 courtyard level (.kpmv): the painting COVERS the whole page area (pan sideways when the page is narrower than the painting), the hall rows sit on it at the bottom */
html body .game .mapv.kpmv.kside.kleather{display:block!important;height:100%!important}
html body .game .mapv.kpmv.kside.kleather>.mapsc{overflow:auto!important;display:flex!important;justify-content:safe center;align-items:safe center;scrollbar-width:none}
html body .game .mapv.kpmv.kside.kleather>.mapsc::-webkit-scrollbar{display:none}
html body .game .mapv.kpmv.kside.kleather>.mapsc>.mapw{width:max(100cqw,calc(100cqh * 1.76))!important}
html body .game .mapv.kpmv.kside.kleather>.kpm-list{position:absolute;left:6px;right:6px;bottom:6px;z-index:8;padding:0;margin:0!important;grid-template-columns:repeat(3,minmax(0,1fr))}
html body .game .mapv.kpmv.kside.kleather>.kpm-list .btn{background:#fff8e4ee;min-height:40px}
.mspot .mlab{background:none!important;border:solid transparent!important;border-width:3px 7px!important;border-image:url(img/kit/mapslip.webp) 20 22 fill/3px 7px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0 1px!important;filter:drop-shadow(0 1px 1px #3a2a1e66);color:#2a1a12}
.mspot .mlab i{background:none!important}
.mspot .mmeta{background:none!important;border:solid transparent!important;border-width:3px 6px!important;border-image:url(img/kit/mapslip.webp) 20 22 fill/3px 6px stretch!important;border-radius:0!important;padding:0!important;filter:drop-shadow(0 1px 1px #3a2a1e55);color:#4a3a2a}
:where(.kv1) .mspot .mmeta,.mspot .mmeta{display:block!important}
.mspot .mlab em{display:inline!important}
`;document.head.appendChild(st)})();

/* §85.6: centre the covering courtyard painting once per slot */
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{const v=document.querySelector(".game.maptab .mapv.kpmv"),sc=v&&v.querySelector(".mapsc");if(sc&&v.dataset.cen!==(v.dataset.kpm||"")){v.dataset.cen=v.dataset.kpm||"";const c=()=>{sc.scrollLeft=(sc.scrollWidth-sc.clientWidth)/2};c();const im=sc.querySelector(".mapimg");if(im&&!im.complete)im.addEventListener("load",c,{once:true})}}catch(e){}return r}})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§85 họa đồ chú thiêm",title:"DƯ ĐỒ STYLE C · place slip + info row + 'Dư đồ' cartouche (no frame, no figure chip)",where:"Dư đồ (all zooms), palace detail .kpm-spot; same slip everywhere",html:()=>`<div style="position:relative;max-width:420px;padding:24px 16px;background:#cdbb97;border-radius:6px"><div style="display:inline-flex;flex-direction:column;align-items:center"><span class="mspot" style="position:static;border:0;background:none;display:flex;flex-direction:column;align-items:center"><span class="mlab">Càn Ninh cung</span><span class="mmeta">11 bóng · <em class="ok">${BAL.kitpage.demo.mapK} khắc</em></span></span></div></div>`})}catch(e){}
