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
.mspot .mlab{background:none!important;border:solid transparent!important;border-width:3px 7px!important;border-image:url(img/kit/mapslip.webp) 20 22 fill/3px 7px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0 1px!important;filter:drop-shadow(0 1px 1px #3a2a1e66);color:#2a1a12}
.mspot .mlab i{background:none!important}
.mspot .mmeta{background:none!important;border:solid transparent!important;border-width:3px 6px!important;border-image:url(img/kit/mapslip.webp) 20 22 fill/3px 6px stretch!important;border-radius:0!important;padding:0!important;filter:drop-shadow(0 1px 1px #3a2a1e55);color:#4a3a2a}
:where(.kv1) .mspot .mmeta,.mspot .mmeta{display:block!important}
.mspot .mlab em{display:inline!important}
`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§85 họa đồ chú thiêm",title:"DƯ ĐỒ STYLE C · place slip + info row + 'Dư đồ' cartouche (no frame, no figure chip)",where:"Dư đồ (all zooms), palace detail .kpm-spot; same slip everywhere",html:()=>`<div style="position:relative;max-width:420px;padding:24px 16px;background:#cdbb97;border-radius:6px"><div style="display:inline-flex;flex-direction:column;align-items:center"><span class="mspot" style="position:static;border:0;background:none;display:flex;flex-direction:column;align-items:center"><span class="mlab">Càn Ninh cung</span><span class="mmeta">11 bóng · <em class="ok">${BAL.kitpage.demo.mapK} khắc</em></span></span></div></div>`})}catch(e){}
