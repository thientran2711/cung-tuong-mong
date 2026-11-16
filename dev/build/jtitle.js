/* ================= jtitle: KIT 82 · TITLE SYSTEM PARTS (owner 11/16 13:00Z / 13:15Z / 13:20Z; review/title-tag) =================
   Two different things (owner 13:20Z): RANK (Tần, Phi, Quý phi…) vs DANH HIỆU (a worn title plate, line 1) — plus the EMPEROR'S HIỆU (Thục, Hiền, Đức…) that JOINS THE RANK everywhere ("Thục phi").
   - kitHieuJoin(rankName,p)  → "Thục phi" when p.hieu is set (S.hieu for her / v.hieu, granted by j8 giveReward "ban hiệu"; any rank except Hoàng hậu and lãnh cung). Called by rkOfFace / rkName (j19 / j8), so every rank word in the game carries it.
   - kitTitleWorn(p)          → the worn title object or null: p.titleWorn (S.titleWorn for her) = an id of KIT_TITLES / a title object. Game logic owns who has what; the kit only draws.
   - kitTitlePlate(t,o)       → ONE plate (line 1 of the name tag): a transparent painted plate image slot (img/kit/title-plate-<tier>.webp, art from Foreman C; until then a CSS placeholder plate), bright tier colour = the rank palette RCOL[tier-1], sparkle strength rises with the tier.
   - kitTitleTag3(p,rank,name)→ the 3-line tag (plate / rank / name); kitTitleOpen(t) → the title info card (name, when earned, how, what it gives while worn).
   Where the plate shows (owner): ONLY the painted stage (tag under the feet, j59tagHTML) and the left full-body figure of a person pop-up / event frame (above the head, kitEventDp); everywhere else rank + name only. */
const KIT_TIER_NAME=["Sơ","Nhất","Nhị","Tam","Tứ","Ngũ","Lục","Thất"];
/* sample titles, one per tier (placeholders for the kit page; real titles belong to the game logic, each with its OWN short evocative name, owner 13:15Z) */
const KIT_TITLES=[
 {id:"s1",name:"Bếp nhỏ xinh",tier:1,when:"Tháng 2, năm thứ nhất",how:"Nấu ăn 1 lần cho Hoàng thượng",fx:""},
 {id:"s2",name:"Khéo tay",tier:2,when:"Tháng 4, năm thứ nhất",how:"Nấu ăn 5 lần",fx:"+1 Sắc khi đeo"},
 {id:"s3",name:"Đệ nhất trù nương",tier:3,when:"Tháng 9, năm thứ hai",how:"Nấu ăn 10 lần",fx:"+2 Danh khi đeo"},
 {id:"s4",name:"Thi tài hạng ba",tier:4,when:"Tết Trung thu",how:"Đứng thứ ba hội thi",fx:""},
 {id:"s5",name:"Ngọc nữ Thất tịch",tier:5,when:"Tết Thất tịch",how:"Đạt được khi trở thành hoa khôi Tết Thất tịch",fx:"+2 Sắc khi đeo"},
 {id:"s6",name:"Bạch liên thơ phú",tier:6,when:"Thượng nguyên",how:"Đứng nhất hội thơ 3 lần",fx:"+3 Danh khi đeo"},
 {id:"s7",name:"Đệ nhất tài nữ",tier:7,when:"Mùa thu, năm thứ ba",how:"Đứng nhất mọi hội tài nghệ",fx:"+3 Sủng khi đeo"},
 {id:"s8",name:"Phượng minh thiên hạ",tier:8,when:"Cuối năm thứ ba",how:"Hoàn thành mọi danh hiệu",fx:"+4 Danh, +3 Sủng khi đeo"}];
window.KIT_TITLES=KIT_TITLES;
function kitTitleDef(id){return id&&typeof id==="object"?id:KIT_TITLES.find(t=>t.id===id)||null}
function kitTitleWorn(p){try{if(!p)return null;const w=p===S?S.titleWorn:(p.titleWorn!==undefined?p.titleWorn:p.ref&&p.ref.titleWorn);return kitTitleDef(w)}catch(e){return null}}
function kitHieuJoin(r,p){try{const h=p===S?S.hieu:p&&p.hieu;if(!h||!r||/^Hoàng hậu/.test(r)||/Phế|lãnh/i.test(r))return r;return h+" "+String(r).toLowerCase()}catch(e){return r}}
window.kitHieuJoin=kitHieuJoin;
const KDH_ART={};
function kdhArt(t){if(KDH_ART[t]===undefined){KDH_ART[t]=false;const im=new Image();im.onload=()=>{KDH_ART[t]=true};im.onerror=()=>{};im.src="img/kit/title-plate-"+t+".webp"}return KDH_ART[t]===true}
function kitTitlePlate(t,o){o=o||{};t=kitTitleDef(t);if(!t)return"";const tier=Math.max(1,Math.min(8,t.tier|0||1)),col=RCOL[tier-1],still=typeof kfStill==="function"&&kfStill();
 const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 return `<span class="kdh kdh-t${tier}${kdhArt(tier)?" kdh-art":""}${still?" kdh-still":""}${o.cls?" "+o.cls:""}" style="--dh:${col}${kdhArt(tier)?`;--kdh-art:url(img/kit/title-plate-${tier}.webp)`:""}"${o.id!==false?` data-kdh="${esc(t.id)}"`:""}><i class="kdh-s" aria-hidden="true"></i><b>${esc(t.name)}</b></span>`}
window.kitTitlePlate=kitTitlePlate;
function kitTitleTag3(p,rank,name,col,me){const pl=kitTitlePlate(kitTitleWorn(p),{cls:"kdh-cap"});return `<div class="kt3">${pl}${typeof kitNameRank==="function"?kitNameRank(rank,name,col,me):""}</div>`}
function kitTitleOpen(t){t=kitTitleDef(t);if(!t||typeof kitModal!=="function")return;const worn=kitTitleWorn(S)&&kitTitleWorn(S).id===t.id;
 kitModal({kind:"info",title:t.name,sub:"Danh hiệu · bậc "+KIT_TIER_NAME[Math.max(0,Math.min(7,(t.tier|0)))],sections:[{h:"",rows:[["Đạt được",t.when||"—",""],["Cách có",t.how||"—",""],["Khi đeo",t.fx||"chỉ để làm đẹp",""],["Đang",worn?"đang đeo":"chưa đeo",""]]}],btn:"Đã hiểu"})}
window.kitTitleOpen=kitTitleOpen;window.kitTitleTag3=kitTitleTag3;
document.addEventListener("click",e=>{const x=e.target&&e.target.closest&&e.target.closest(".kdh[data-kdh]");if(x&&!x.closest(".stage"))kitTitleOpen(x.dataset.kdh)},true);
(function(){const st=document.createElement("style");st.id="kit-dh";
 const m=(a,p,b)=>`color-mix(in srgb,${a} ${p}%,${b})`;
 st.textContent=`
.kdh{position:relative;display:inline-flex;align-items:center;justify-content:center;max-width:100%;box-sizing:border-box;padding:1px 12px 2px;border-radius:999px;font-family:var(--display,"Noto Serif",Georgia,serif);font-weight:700;font-size:.74rem;letter-spacing:.03em;line-height:1.25;white-space:nowrap;color:#fffdf4;
 background:linear-gradient(135deg,${m("var(--dh)",55,"#fff")},var(--dh) 45%,${m("var(--dh)",70,"#000")});border:1.5px solid ${m("var(--dh)",55,"#fff")};box-shadow:0 0 0 1px #00000033,0 1px 4px #0006;overflow:visible;isolation:isolate}
.kdh>b{position:relative;z-index:1;font-weight:700;text-shadow:0 1px 1.5px #000a,0 0 3px #0008}
.kdh.kdh-art{background:var(--kdh-art,none) center/100% 100% no-repeat;border:0;box-shadow:none;padding:4px 18px}
.kdh-s{position:absolute;inset:-2px;border-radius:inherit;pointer-events:none;z-index:0}
.kdh-t3,.kdh-t4{box-shadow:0 0 0 1px #00000033,0 0 6px ${m("var(--dh)",70,"transparent")}}
.kdh-t5,.kdh-t6,.kdh-t7,.kdh-t8{box-shadow:0 0 0 1px #00000033,0 0 8px var(--dh),0 0 14px ${m("var(--dh)",60,"transparent")}}
.kdh-t5 .kdh-s,.kdh-t6 .kdh-s,.kdh-t7 .kdh-s,.kdh-t8 .kdh-s{background:linear-gradient(100deg,transparent 35%,#fff9 50%,transparent 65%) -150% 0/60% 100% no-repeat;animation:kdhsw 3.2s ease-in-out infinite;mix-blend-mode:screen;overflow:hidden}
.kdh-t7 .kdh-s,.kdh-t8 .kdh-s{animation-duration:2.2s}
.kdh-t7::before,.kdh-t8::before,.kdh-t8::after{content:"✦";position:absolute;color:#fff6c8;font-size:.7rem;text-shadow:0 0 4px #ffe07a,0 0 8px var(--dh);pointer-events:none;animation:kdhst 1.8s ease-in-out infinite;z-index:2}
.kdh-t7::before,.kdh-t8::before{left:-5px;top:-6px}.kdh-t8::after{right:-5px;bottom:-6px;animation-delay:.9s}
.kdh-t8{animation:kdhpl 2.6s ease-in-out infinite}
.kdh-still,.kdh-still .kdh-s,.kdh-still::before,.kdh-still::after{animation:none!important}
@keyframes kdhsw{0%{background-position:-150% 0}60%,100%{background-position:250% 0}}
@keyframes kdhst{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:1;transform:scale(1.1)}}
@keyframes kdhpl{0%,100%{filter:brightness(1)}50%{filter:brightness(1.18)}}
@media(prefers-reduced-motion:reduce){.kdh,.kdh .kdh-s,.kdh::before,.kdh::after{animation:none!important}}
/* stage tag line 1: centred above the rank line, tight; pop-up caption line 1 above the rank */
html body .stage .tok .tag .kdh,html body .stage #j59metag .tag .kdh{display:flex;width:max-content;max-width:100%;margin:0 auto 2px;font-size:.7rem}
html body .kdpcap .kdh,html body .kesf>.kpsn .kdh{display:flex;width:max-content;max-width:100%;margin:0 auto 3px}
/* on a PAINTING (stage tag, pop-up figure caption) the plate glows in its tier colour (KIT 48.1e); her plate brighter */
html body .stage .tok .tag .kdh,html body .stage #j59metag .tag .kdh,html body .kdpcap .kdh{box-shadow:0 0 0 1px #00000033,0 0 6px var(--dh),0 0 12px ${m("var(--dh)",70,"transparent")}}
html body .stage #j59metag .tag .kdh,html body .stage .tok .tag.j59mine .kdh{box-shadow:0 0 0 1px #00000033,0 0 8px var(--dh),0 0 16px var(--dh),0 0 24px ${m("var(--dh)",70,"transparent")}}
.kdh[data-kdh]{cursor:pointer}.stage .kdh[data-kdh]{cursor:inherit}
.kt3{display:flex;flex-direction:column;align-items:center}`;document.head.appendChild(st)})();
/* kit-page sample */
KIT_SAMPLES.push({id:"§82",title:"Danh hiệu: bảng 3 dòng (hiệu · phẩm · tên), tấm danh hiệu 8 bậc, hiệu phong ghép vào phẩm, thẻ thông tin",html:()=>{
 const P=KIT_TITLES.map(t=>kitTitlePlate(t)).join(" ");
 const row=(cls,bg)=>`<div class="kitpg-row ${cls}" style="padding:12px;border-radius:8px;gap:18px;align-items:flex-start;background:${bg}">${kitTitleTag3({titleWorn:KIT_TITLES[7]},"Quý phi","Hàn Hồng Diệp",kitRankCol(5))}${kitTitleTag3({titleWorn:KIT_TITLES[4]},kitHieuJoin("Phi",{hieu:"Thục"}),"Mộ Dung Yên",kitRankCol(4))}${kitTitleTag3({titleWorn:KIT_TITLES[1]},"Tần","Tô Vân",kitRankCol(3))}${kitNameRank("Đáp ứng","Lâm Uyển (không đeo danh hiệu)",kitRankCol(0))}</div>`;
 return `<div style="padding:10px;border-radius:8px;background:#2a1c18;display:flex;flex-wrap:wrap;gap:12px 14px;align-items:center">${P}</div><div style="height:8px"></div>`+row("","#fbf3e2")+`<div style="height:8px"></div>`+row("krs","linear-gradient(#26304a,#121624)")+`<p style="margin:8px 0 0;font-size:.8rem">Bấm một tấm danh hiệu để xem thẻ thông tin: <button type="button" class="kbtn" onclick="kitTitleOpen('s5')">Ngọc nữ Thất tịch</button></p>`}});
