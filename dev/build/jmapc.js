/* jmapc: KIT PART "Dư đồ · họa đồ chú thiêm" (style C, owner 16/11 "kiểu C là đã ok rồi"; KIT §85; art dev: Foreman C, review/map-frame-c).
   ONE part for every map label: no leather/frame (map full-bleed with a 1 px hairline), each place name on a pale-yellow paper slip
   (img/kit/mapslip.webp, 9-slice), the info row (.mmeta "N bóng · K khắc") on the same slip, a small "Dư đồ" cartouche, the tools (−, +, Ra vào,
   Danh sách) in a slim paper band ABOVE the map (cannot cover a label), clipped labels at the pan edge fade out.
   The dark people-count chip .msil is GONE everywhere (silChip / k61SilChip / kpmSil return ""): the text row is the one info line,
   shown on every device (Fold too). mapFit (j38) tests each place as ONE box (.mlab + .mmeta). Used by: Dư đồ all zooms, palace detail .kpm-spot. */
const KMSKYBG="var(--kmv-nt),radial-gradient(ellipse 30% 4.5% at 20% 5%,var(--cl),#0000),radial-gradient(ellipse 36% 5% at 78% 9%,var(--cl),#0000),radial-gradient(ellipse 34% 4.5% at 34% 96%,var(--cl),#0000),radial-gradient(ellipse 28% 4% at 86% 91%,var(--cl),#0000),linear-gradient(var(--s0),var(--s1) 55%,var(--s2))"; /* KIT §85.8: the sky paint of the portrait Dư đồ = ONE value, used by the map and the kit page swatches (.kmsky) */
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
.mapw .mspot.kmhide .mlab,.mapw .mspot.kmhide .mmeta{display:none!important}
/* §85.8 PORTRAIT DƯ ĐỒ (owner 17/11 ~13:12Z, review/map-portrait; html.kv1 = every portrait size, iPad landscape html.kv2 is NOT touched): the right card column is ONE ROW of the 4 people cards ABOVE the map
   (.k3cs: Hoàng thượng / Thái hậu / Hoàng hậu / Cung nữ thân tín, same size) and ONE ROW BELOW it (Ân sủng + Nguy hiểm chung, same height); the same kit cards, compact form (avatar only when the row is wide, Ân sủng rows in 2 columns).
   The map takes the full width between the rows, ZOOMED to the free HEIGHT (mapFit, j38; pan sideways, centred on her place + "!" places); every screen area that is not map shows the SKY of the day's weather (data-sky on .mapv, set below, one gradient per weather kind = KIT_SKY; a painted sky is an ART REQUEST to Foreman C). The weather particles keep covering the whole page area (kfStageRect). #kshR is ONE grid over the leather (pointer-events none, the cards take the clicks) - no new DOM, same k3Stage content. */
html.kv1 body .game .mapv.kside.kleather:not(.kpmv){--kmv-fl:0px;--kmv-fr:0px;--kmv-ft:112px;--kmv-fb:92px}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>.maptools{right:6px!important}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>.maptools:not(:has(.kpm-back))::before{width:76px;font-size:13px;letter-spacing:.1em}html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>.maptools .mz{padding:0 7px}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR{position:absolute;inset:0;top:0;right:0;width:auto;max-height:none;overflow:visible;display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);grid-template-rows:auto minmax(0,1fr) auto;gap:0 6px;padding:48px 6px 6px;z-index:3;container:kr/inline-size}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR>.k3cs{grid-column:1/-1;grid-row:1;margin-left:50px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR>.k3cs>.k3c{width:auto;min-width:0;height:100%}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR>.kas{grid-column:1;grid-row:3;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:10px;align-content:center}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR>.kas>.k3h,html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR>.kas>.kasfold{grid-column:1/-1}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR>.k3py{grid-column:2;grid-row:3;justify-content:center}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR .k3r{font-size:.7rem}
@container kr (max-width:620px){html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR>.k3cs .k3c .md{display:none!important}html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR>.k3cs .k3c{padding:3px 5px}html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR .k3c .k3ct>b{font-size:.66rem;overflow-wrap:normal!important;word-break:normal}html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR .k3c .k3ct>.ef,html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR .k3c .k3v{font-size:.64rem}html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>#kshR .k3r{font-size:.64rem}}
/* the sky: --s0/--s1/--s2 = zenith / middle / horizon, --cl = cloud colour (clear skies keep a few light clouds), --kmv-nt = the night veil (buổi tối) */
html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky{--s0:#a9d0ee;--s1:#e3eef2;--s2:#f3e9cf;--cl:#ffffffb0;--kmv-nt:linear-gradient(#0000,#0000)}
html.kv1 body .game .mapv.kside.kleather:not(.kpmv)>.mapsc{background:${KMSKYBG}!important}
.kmsky{display:inline-block;background:${KMSKYBG}}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=sun]{--s0:#86c2ee;--s1:#d3e8f4;--s2:#f7ebcb}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=petal]{--s0:#b3d3ea;--s1:#f0e3e6;--s2:#f6e9dc}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=leaf]{--s0:#b4c9d9;--s1:#ecdcc0;--s2:#eed1a0}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=wind]{--s0:#9fb3c1;--s1:#c9d4da;--s2:#e4e5dd;--cl:#f4f6f6c0}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=mist]{--s0:#d5d9d4;--s1:#e9e9e0;--s2:#f1ede0;--cl:#ffffff90}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=rain]{--s0:#76848f;--s1:#9eaab4;--s2:#bcc4ca;--cl:#5d6b77c0}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=storm]{--s0:#454e5b;--s1:#66717e;--s2:#868f99;--cl:#2e3641d0}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=snow]{--s0:#c5cfd8;--s1:#e2e7eb;--s2:#f2f3f1;--cl:#ffffffc0}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=snowh]{--s0:#aab4be;--s1:#d1d7dc;--s2:#e8eaeb;--cl:#f5f6f7d0}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=frost]{--s0:#bcd4e5;--s1:#dfebf1;--s2:#f0f3f3}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=snowp]{--s0:#cbd8e5;--s1:#edeff1;--s2:#f6f0ef}
:is(html.kv1 body .game .mapv.kside.kleather:not(.kpmv),.kmsky)[data-sky~=night]{--kmv-nt:linear-gradient(#08122cc4,#0a1634a6)}
/* §85.6 courtyard level (.kpmv): the painting COVERS the whole page area (pan sideways when the page is narrower than the painting), the hall rows sit on it at the bottom */
html body .game .mapv.kpmv.kside.kleather{display:block!important;height:100%!important}
html body .game .mapv.kpmv.kside.kleather>.mapsc{overflow:auto!important;display:flex!important;justify-content:safe center;align-items:safe center;scrollbar-width:none}
html body .game .mapv.kpmv.kside.kleather>.mapsc::-webkit-scrollbar{display:none}
html body .game .mapv.kpmv.kside.kleather>.mapsc>.mapw{width:max(100cqw,calc(100cqh * 1.76))!important}
html body .game .mapv.kpmv.kside.kleather>.kpm-list{position:absolute;left:6px;right:6px;bottom:6px;z-index:8;padding:0;margin:0!important;grid-template-columns:repeat(3,minmax(0,1fr))}
html body .game .mapv.kpmv.kside.kleather>.kpm-list .btn{background:#fff8e4ee;min-height:40px}
.mspot .mlab{background:none!important;border:solid transparent!important;border-width:3px 7px!important;border-image:url(img/kit/mapslip.webp) 20 22 fill/3px 7px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0 1px!important;filter:drop-shadow(0 1px 1px #3a2a1e66);color:#2a1a12}
.mspot .mlab i:not(.khap){background:none!important}
.mspot .mmeta{background:none!important;border:solid transparent!important;border-width:3px 6px!important;border-image:url(img/kit/mapslip.webp) 20 22 fill/3px 6px stretch!important;border-radius:0!important;padding:0!important;filter:drop-shadow(0 1px 1px #3a2a1e55);color:#4a3a2a}
:where(.kv1) .mspot .mmeta,.mspot .mmeta{display:block!important}
.mspot .mlab em{display:inline!important}
`;document.head.appendChild(st)})();

/* §85.6: centre the covering courtyard painting once per slot */
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{const v=document.querySelector(".game.maptab .mapv.kpmv"),sc=v&&v.querySelector(".mapsc");if(sc&&v.dataset.cen!==(v.dataset.kpm||"")){v.dataset.cen=v.dataset.kpm||"";const c=()=>{sc.scrollLeft=(sc.scrollWidth-sc.clientWidth)/2};c();const im=sc.querySelector(".mapimg");if(im&&!im.complete)im.addEventListener("load",c,{once:true})}}catch(e){}return r}})();
/* §85.8: the day's sky (KIT_SKY = weather kind -> sky key in the CSS above; night = buổi tối veil); one attribute, set after every render */
const KIT_SKY={sun:"sun",dust:"dust",petal:"petal",leaf:"leaf",wind:"wind",mist:"mist",rain:"rain",storm:"storm",snow:"snow",snowh:"snowh",frost:"frost",snowp:"snowp"};
function kmSkyKey(){try{const k=(S&&S.wx&&S.wx.k)||"dust",night=typeof B4L==="number"&&(S.buoi||0)===B4L;return (KIT_SKY[k]||"dust")+(night?" night":"")}catch(e){return "dust"}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{const v=document.querySelector(".game.maptab .mapv");if(v){const k=kmSkyKey();if(v.dataset.sky!==k)v.dataset.sky=k}}catch(e){}return r}})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§85.8 trời Dư đồ",title:"DƯ ĐỒ DỌC · the sky behind the map (one per weather kind) + the two card rows",where:"Dư đồ on every portrait size (html.kv1); iPad landscape keeps the side column",html:()=>`<div style="display:flex;flex-wrap:wrap;gap:6px;max-width:460px">${Object.keys(KIT_SKY).map(k=>`<span style="display:flex;flex-direction:column;align-items:center;font-size:.66rem"><span class="kmsky" data-sky="${k}" style="width:62px;height:44px;border-radius:6px;border:1px solid #b79a5b99"></span>${k}</span>`).join("")}<span style="display:flex;flex-direction:column;align-items:center;font-size:.66rem"><span class="kmsky" data-sky="dust night" style="width:62px;height:44px;border-radius:6px;border:1px solid #b79a5b99"></span>+ tối</span></div><div style="font-size:.7rem;margin-top:6px;max-width:460px">Above the map: Hoàng thượng / Thái hậu / Hoàng hậu / Cung nữ thân tín (one row, same size). Below: Ân sủng + Nguy hiểm chung (one row, same height). The map takes the full width between them, zoomed to the free height. Painted skies = ART REQUEST (Foreman C).</div>`})}catch(e){}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§85 họa đồ chú thiêm",title:"DƯ ĐỒ STYLE C · place slip + info row + 'Dư đồ' cartouche (no frame, no figure chip)",where:"Dư đồ (all zooms), palace detail .kpm-spot; same slip everywhere",html:()=>`<div style="position:relative;max-width:420px;padding:24px 16px;background:#cdbb97;border-radius:6px"><div style="display:inline-flex;flex-direction:column;align-items:center"><span class="mspot" style="position:static;border:0;background:none;display:flex;flex-direction:column;align-items:center"><span class="mlab">Càn Ninh cung</span><span class="mmeta">11 bóng · <em class="ok">${BAL.kitpage.demo.mapK} khắc</em></span></span></div></div>`})}catch(e){}
