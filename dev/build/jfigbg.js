/* ================= KIT 61 · FIG-BG — the silk hanging scroll behind every full-body figure (owner 15/11 ~20:40Z, option A) =================
   The person is painted ON a vertical silk hanging scroll: a roller rod at the top AND at the bottom (knob ends), a brocade mount, a silk field whose
   COLOUR + MOTIF say the status. One kit part, two readers: the Tuần lục person page (.kbk-por) and the event-with-a-person dialog column (.kes, kitEventDp).
   - kitFigBgKey(p) -> table key ("c0".."c7" consort tier, "cold", "emp", "th", "serv", "man", "unk")
   - KIT_FIGBG[key] = {n: status, col: silk colour, motif} (the table in KIT.md §61); art = img/kit/figbg-<key>.webp (448x800, 20-50 KB, one download per key, on demand)
   - kitStageFig puts data-fb="<key>" on <figure class="kesf">; the CSS below paints the scroll on the figure's COLUMN (border-image: rods + mount keep their size,
     the silk stretches) — the figure sits inside the silk window; a wide robe that would pass the window edge is CROPPED (overflow hidden), never sticks out.
   - ONE figure size inside the scroll: adults all stand at the same size (men are NOT taller: kfr = min(1, kfr x KIT_FIG.man)), children by age.
   Never a private scroll/frame elsewhere: use data-fb on a kitStageFig figure. */
const KIT_FIGBG={
 c0:{n:"Đáp ứng",col:"ngà",motif:"hoa mai trắng"},c1:{n:"Thường tại",col:"lục nhạt",motif:"trúc, lan"},c2:{n:"Quý nhân",col:"lam nhạt",motif:"sen, sóng nước"},
 c3:{n:"Tần",col:"hồng phấn",motif:"mẫu đơn"},c4:{n:"Phi",col:"tím nhạt",motif:"hoa tử đằng"},c5:{n:"Quý phi",col:"hồng đỏ nhạt",motif:"trà mi"},
 c6:{n:"Hoàng quý phi",col:"cam hổ phách",motif:"cúc vàng"},c7:{n:"Hoàng hậu",col:"vàng nhạt",motif:"phượng, mẫu đơn"},
 cold:{n:"Lãnh cung",col:"xám lạnh",motif:"cành khô, không vàng"},emp:{n:"Hoàng thượng",col:"vàng thổ hoàng",motif:"rồng, mây lành"},
 th:{n:"Thái hậu",col:"nâu tím nhạt",motif:"tùng, hạc, đào tiên"},serv:{n:"Cung nhân · thái giám",col:"xám vải gai",motif:"liễu"},
 man:{n:"Vương gia · quan · công tử · thị vệ · thái y · hoàng tử",col:"xanh xám thủy mặc",motif:"trúc, núi mờ"},unk:{n:"Người lạ",col:"be đá ấm",motif:"sương mù"}};
window.KIT_FIGBG=KIT_FIGBG;
function kitFigBgKey(p){try{if(!p)return"";const q=p.__kp||p;if(typeof kitIsKnown==="function"&&!kitIsKnown(q))return"unk";const r=personRoleRank(q);
 switch(r.role){case"player":case"consort":return"c"+Math.max(0,Math.min(7,+r.rank||0));case"cold":return"cold";case"emp":return"emp";case"thaihau":return"th";
  case"maid":case"mama":case"eunuch":return"serv";case"princess":return"c3";default:return"man"}}catch(e){return"man"}}
window.kitFigBgKey=kitFigBgKey;
(function(){const st=document.createElement("style");st.id="kit-figbg";
 const sel=k=>`.kbk-por:has(>.kesf[data-fb="${k}"]),.kes:has(>.kesf[data-fb="${k}"]:first-child)`;
 st.textContent=`
.kbk-por:has(>.kesf[data-fb]),.kes:has(>.kesf[data-fb]){--fbt:20px;--fbs:22px;box-sizing:border-box;border:solid transparent;border-width:var(--fbt) var(--fbs);border-image-slice:30 38 fill;border-image-width:var(--fbt) var(--fbs);border-image-repeat:stretch;overflow:hidden;position:relative;filter:drop-shadow(0 3px 6px #3a201040)}
.kes:has(>.kesf[data-fb]){--fbt:16px;--fbs:17px}
.kbk.narrow .kbk-person.kbk-full>.kbk-por:has(>.kesf[data-fb]){overflow:hidden}
@media (max-height:520px){.kbk-por:has(>.kesf[data-fb]){--fbt:11px;--fbs:12px}.kes:has(>.kesf[data-fb]){--fbt:10px;--fbs:11px}}
.kbk-por:has(>.kesf[data-fb])>.kesf>.kpsn{display:none}
.kes:has(>.kesf[data-fb])>.kpsn.kdpcap{white-space:normal!important;max-width:calc(100% - 6px);width:max-content;line-height:1.15}
.kes:has(>.kesf[data-fb])>.kpsn.kdpcap .kname{white-space:normal!important;max-width:100%;text-align:center;justify-content:center}/* KIT 61: a long name wraps INSIDE the silk window (the column crops what passes it) */
.kes:has(>.kesf[data-fb])>.kpsn .kname,.kes:has(>.kesf[data-fb])>.kpsn .kti,.kes:has(>.kesf[data-fb]) .kesf>.kpsn .kname,.kes:has(>.kesf[data-fb]) .kesf>.kpsn .kti{text-shadow:0 0 2px #fff6e0,0 0 5px #fff6e0,0 0 9px #fff6e0cc}
`+Object.keys(KIT_FIGBG).map(k=>`${sel(k)}{border-image-source:url(img/kit/figbg-${k}.webp);background:none}`).join("\n");
 document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§61",title:"fig-bg · tranh lụa cuộn treo sau người (màu + họa tiết theo thân phận)",
 html:()=>`<div style="display:flex;flex-wrap:wrap;gap:10px">`+Object.keys(KIT_FIGBG).map(k=>{const f=KIT_FIGBG[k];const src=k==="emp"?"img/kit/unknown-fig-m.webp":"img/kit/unknown-fig-f.webp";
  return `<figure style="margin:0;text-align:center;font:12px/1.3 sans-serif"><div style="width:130px;height:232px;position:relative"><div class="kbk-por" style="position:absolute;inset:0"><figure class="kesf" data-fb="${k}" style="margin:0;height:100%;display:flex;align-items:flex-end;justify-content:center"><img class="kesimg" style="height:100%;width:auto" src="${src}" alt=""></figure></div></div><figcaption>${k} · ${f.n}<br>${f.col} · ${f.motif}</figcaption></figure>`}).join("")+`</div>`})}catch(e){}
