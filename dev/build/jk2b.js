
/* ===================================================================================================================
   jk2b — KIT OWNER #3 (kit 2b, owner feedback 11/14). Loaded LAST. Data in, kit look out; every part is in dev/kit/KIT.md §26–33.
   1. Person card: the big 3:4 portrait (the rank frame cropped to its body, like the small frame, no crest/tassel), ~1/3 of the card.
   2. Stage floor: each room picture is cropped to keep the most floor; figures stand on the floor line (KIT_FLOOR).
   3. Phone portrait: stage ≈ 40 % of the screen.
   4. Event art (j89 evArtOf) in the art frame of news / notice / choice / result panels and in the result card.
   5. Delta chips take the whole short clause ("nhà Hộ bộ thế lực −2"), not only the last 3 words.
   6. Event options hide outcomes (cost only): option mode hideOutcome.
   7. Veil + scar overlays placed on the face from review/wardrobe fit data (KIT_VEIL.style / KIT_SCAR.style).
   =================================================================================================================== */

/* ---------- 1. PERSON CARD: big 3:4 portrait ---------- */
(function(){const st=document.createElement("style");st.id="k2b-pcard";st.textContent=`
.pc{grid-template-columns:clamp(160px,34%,300px) minmax(0,1fr)!important;gap:10px!important}
.pc>.pcl>.pcp.kit{width:100%!important;height:auto!important;max-height:none!important;min-height:0!important;aspect-ratio:476/630!important;overflow:hidden!important;flex:0 0 auto;container-type:normal!important;margin:0 0 2px!important}
.pc>.pcl>.pcp.kit>.kin{position:absolute!important;left:-7.775%!important;top:-22.22%!important;width:115.55%!important;height:164.6%!important;transform:none!important}
.pc>.pcl>.pcn,.pc>.pcl>b:first-of-type{font-size:1.12rem}
@media (max-width:599px){.pc{grid-template-columns:clamp(120px,38%,180px) minmax(0,1fr)!important;gap:8px!important}}
`;document.head.appendChild(st)})();

/* ---------- 2. STAGE FLOOR: crop each room picture to keep the floor; figures stand on the floor line ----------
   KIT_FLOOR[name] = floorTop: fraction of the picture height where the walkable floor starts (behind the furniture).
   The crop puts that line at ~40 % of the stage when the picture is cropped vertically (Fold portrait, phones); the feet line is
   3/4 of the way from floorTop to the picture bottom (never under the stage's lowest 3 %). Stage vars: --kfb (feet bottom, px), --kfh (max figure height). */
window.KIT_FLOOR=Object.assign({"duong-tam-dien":.70,"khon-ninh-cung":.72,"kinh-su-phong":.66,"lanh-cung":.62,"ngu-hoa-vien":.62,"ngu-thu-phong":.68,
 "phi-tan-cung":.62,"tam-cung-dem":.70,"thai-y-vien":.68,"tu-ninh-cung":.66,_default:.66},window.KIT_FLOOR||{});
const KIT_BGSZ={};
function kitFloorFit(){try{const st=$("stage"),im=$("scimg");if(!st||!im)return;const m=/url\(["']?([^"')]+)["']?\)/.exec(im.style.backgroundImage||"");if(!m){st.style.removeProperty("--kfb");st.style.removeProperty("--kfh");im.style.backgroundPosition="";return}
 const url=m[1],name=url.split("/").pop().replace(/\.\w+$/,"");const sz=KIT_BGSZ[url];
 if(!sz){KIT_BGSZ[url]={w:1280,h:720,pending:1};const I=new Image();I.onload=()=>{KIT_BGSZ[url]={w:I.naturalWidth,h:I.naturalHeight};kitFloorFit()};I.src=url}
 const S0=KIT_BGSZ[url];const W=st.clientWidth,H=st.clientHeight;if(!W||!H)return;const ft=KIT_FLOOR[name]!=null?KIT_FLOOR[name]:KIT_FLOOR._default;
 const s=Math.max(W/S0.w,H/S0.h),dh=S0.h*s;let y0=0,py=50;
 if(dh>H+1){y0=Math.min(0,Math.max(H-dh,.40*H-ft*dh));py=(y0/(H-dh))*100}
 im.style.backgroundPosition=`50% ${py.toFixed(1)}%`;
 const fs=ft+.75*(1-ft);let feet=Math.min(H*.97,y0+fs*dh);const kfb=Math.max(H*.03,H-feet);st.style.setProperty("--kfb",kfb.toFixed(0)+"px");st.style.setProperty("--kfh",Math.max(H*.45,H-kfb-H*.03).toFixed(0)+"px");st.dataset.kfloor=name}catch(e){}}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);kitFloorFit();return r};
 try{let ro=null;const hook=()=>{const st=$("stage");if(!st||ro)return;ro=new ResizeObserver(()=>kitFloorFit());ro.observe(st)};if(document.readyState!=="loading")hook();else addEventListener("DOMContentLoaded",hook)}catch(e){}
 const st=document.createElement("style");st.id="k2b-floor";st.textContent=`
.stage[data-kfloor] #mefig{bottom:var(--kfb)!important;height:min(80cqh,var(--kfh))!important}
.stage[data-kfloor] .tokens{bottom:calc(var(--kfb) - 4px)!important}
.stage[data-kfloor] .tok.fig .figimg{height:min(58cqh,calc(var(--kfh) * .8))!important}
.stage[data-kfloor] .scimg{transition:background-position .2s}
`;document.head.appendChild(st)})();

/* ---------- 3. PHONE PORTRAIT: the stage takes ~40 % of the screen (was 27 %); the panel keeps the rest ---------- */
(function(){const st=document.createElement("style");st.id="k2b-phone";st.textContent=`
@media (max-width:599px) and (orientation:portrait){
 .game:not(.maptab),.game.cardtab{grid-template-rows:auto minmax(0,40dvh) minmax(0,1fr) auto!important}
 header.hud>.me .dt{font-size:.66rem!important;line-height:1.2}
 header.hud>.hud2.khud.col{flex-wrap:nowrap!important;gap:3px!important}
 header.hud>.hud2.khud>.h2t{min-height:26px!important;height:26px;padding:0 6px!important;font-size:.7rem!important}
 header.hud>.hud2.khud .hc{padding:1px 5px!important;font-size:.66rem!important}
}`;document.head.appendChild(st)})();
