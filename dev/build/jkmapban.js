/* KIT §103 kitMapBanner «DẢI BÁO DƯ ĐỒ» — ONE banner on the Dư đồ for an ALL-LOCKED state (KIT REQUEST K-MAP-BANNER, PLACE-RULES; owner 25/11 ~23:40Z
   «buổi chiều cái bản đồ nhìn đi đâu nó cũng xám hết trơn á, không biết đi đâu luôn. Rồi làm sao mà đi về nhà? Chỗ nào là nhà? … phải có một cái biểu tượng gì đó chứ»).
   = ONE reason line («Đang cấm túc, còn 2 tháng: chỉ ở trong cung mình» / lãnh cung / bệnh / đêm) + the HOME MARK chip «Nhà ta» (tap = the map scrolls to her own
   place and the spot glows; the spot itself carries the same mark). It sits at the top of the map view under the map tools, on every map style
   (the leather Dư đồ hides the .fest chips of the top row, so the reason never lives there). Never over the map tools, the rail or the side column.
   API: kitMapBanner.set({id, line, home})  id = the caller's key (one banner shown: the last set wins), line = player words (VANPHONG), home = the
        place key of her home spot (data-go / data-ak of .mspot); kitMapBanner.clear(id); kitMapBanner.now() → the shown {id,line,home} or null.
   Re-placed after every render (the map is rebuilt by render). Words come from the caller; numbers in them from BAL (law 4). */
(function(){try{
const KMB={cur:null};
function homeSpot(k){if(!k)return null;try{const e=document.querySelector(`#panel .mapv .mspot[data-go="${CSS.escape(k)}"],#panel .mapv .mspot[data-ak="${CSS.escape(k)}"]`);
 /* KIT §103 zone fallback (OB-PHU4 KIT REQUEST 26/11, owner OD 26/11 ~07:05Z): on Dư đồ level 1 her palace can sit inside a ZONE tag (§85.10 .mspot.mzone[data-zone], member keys in data-mzk); when her own spot is missing or hidden the visible zone tag that holds her key carries the home ring / glow */
 const vis=x=>x&&!x.classList.contains("mzh")&&x.getClientRects().length>0&&getComputedStyle(x).display!=="none";if(vis(e))return e;
 const z=[...document.querySelectorAll(`#panel .mapv .mspot.mzone[data-mzk~="${CSS.escape(k)}"]`)].find(vis);return z||e}catch(e){return null}}
function place(){try{const v=document.querySelector("#panel .mapv");const old=document.querySelectorAll(".kmapban");const c=KMB.cur;
 if(!c||!v||typeof tab!=="undefined"&&tab!=="go"){old.forEach(e=>e.remove());document.querySelectorAll("#panel .mapv.kmb-on").forEach(x=>{x.classList.remove("kmb-on","kmb-abs");x.style.removeProperty("--kmbH")});document.querySelectorAll(".mspot.kmb-home").forEach(e=>e.classList.remove("kmb-home"));return}
 let el=v.querySelector(":scope>.kmapban");old.forEach(e=>{if(e!==el)e.remove()});
 if(!el){el=document.createElement("div");el.className="kmapban";el.setAttribute("role","status");v.appendChild(el)}
 const sig=c.id+"|"+c.line+"|"+(c.home||"");if(el.dataset.sig!==sig){el.dataset.sig=sig;el.innerHTML=`<span class="kmb-ico" aria-hidden="true">🔒</span><span class="kmb-t"></span>${c.home?`<button type="button" class="kmb-home-b" aria-label="Chỗ nhà ta trên Dư đồ"><span class="kmb-hm" aria-hidden="true">⌂</span>Nhà ta</button>`:""}`;el.querySelector(".kmb-t").textContent=c.line}
 /* under the map tools, centred in the map view, never over the rail / side column */
 /* viewport px (position:fixed): the map scroller (.mapsc) moves under it, the banner stays */
 const sc=v.querySelector(".mapsc")||v,ap=parseFloat(v.style.getPropertyValue("--kmbH"))||0,V0=sc.getBoundingClientRect(),V={left:V0.left,right:V0.right,width:V0.width,top:V0.top-ap},/* V = the scroller where it sits WITHOUT the room made for the banner (no feedback loop) */T=v.querySelector(".maptools"),R=v.querySelector("#krail,.krail"),SR=v.querySelector("#kshR,.kshR");
 let L=V.left+8,Rr=V.right-8,top=V.top+8;const VV=v.getBoundingClientRect();if(T){const t=T.getBoundingClientRect();if(t.height&&t.bottom>VV.top-2&&t.bottom<VV.top+140)top=Math.max(top,t.bottom+6)}if(R){const r=R.getBoundingClientRect();if(r.width&&r.bottom>top&&r.top<top+56)L=Math.max(L,r.right+8)}if(SR){/* the side column; on one page (Fold) #kshR is a full-width overlay holding boxes at the foot: only its real boxes count */[...SR.children].forEach(c=>{const r=c.getBoundingClientRect();if(r.width&&r.width<V.width*.5&&r.top<top+56&&r.bottom>top&&r.left>V.left+V.width*.4)Rr=Math.min(Rr,r.left-8)})}
 el.style.setProperty("--kmbL",L+"px");el.style.setProperty("--kmbW",Math.max(160,Rr-L)+"px");el.style.setProperty("--kmbT",top+"px");
 /* KK38 (MAIN 153 look, iPad: the banner lay over the top row of place labels): the map scroller starts BELOW the banner (its height + 4 px), every map style */
 {const bh=Math.ceil(el.getBoundingClientRect().height),need=Math.max(0,Math.round(top+bh+4-V.top));v.classList.add("kmb-on");v.classList.toggle("kmb-abs",getComputedStyle(sc).position==="absolute");if(Math.abs(need-ap)>1)v.style.setProperty("--kmbH",need+"px")}
 document.querySelectorAll(".mspot.kmb-home").forEach(e=>{if(e!==homeSpot(c.home))e.classList.remove("kmb-home")});const hs=homeSpot(c.home);if(hs)hs.classList.add("kmb-home")}catch(e){console.error("kitMapBanner",e)}}
let SQ=0;function soon(){if(SQ||!KMB.cur)return;SQ=1;requestAnimationFrame(()=>{SQ=0;place()});setTimeout(()=>{if(KMB.cur)place()},400)}/* the map lays out after the render that built it */
function find(){const c=KMB.cur,hs=c&&homeSpot(c.home);if(!hs)return;try{hs.scrollIntoView({block:"center",inline:"center",behavior:typeof kfStill==="function"&&kfStill()?"auto":"smooth"})}catch(e){}hs.classList.remove("kmb-glow");void hs.offsetWidth;hs.classList.add("kmb-glow");setTimeout(()=>hs.classList.remove("kmb-glow"),1900)}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".kmapban .kmb-home-b");if(!b)return;e.preventDefault();e.stopPropagation();find()},true);
window.kitMapBanner={set(o){if(!o||!o.line)return;KMB.cur={id:o.id||"x",line:String(o.line),home:o.home||null};place();soon()},clear(id){if(!KMB.cur||id!=null&&KMB.cur.id!==id)return;KMB.cur=null;place()},now(){return KMB.cur?{...KMB.cur}:null},place,find};
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{place();soon()}catch(e){}return r};window.render=render}
addEventListener("resize",()=>{try{place()}catch(e){}});
try{const pn=document.getElementById("panel");if(pn&&typeof MutationObserver==="function"){let q=0;new MutationObserver(()=>{if(!KMB.cur||q)return;q=1;requestAnimationFrame(()=>{q=0;if(KMB.cur&&!document.querySelector("#panel .mapv>.kmapban"))place()})}).observe(pn,{childList:true,subtree:true})}}catch(e){}
const st=document.createElement("style");st.id="kit-map-banner";st.textContent=`
#panel .mapv{position:relative}
#panel .mapv>.kmapban{position:fixed;z-index:30;left:var(--kmbL,8px);top:var(--kmbT,48px);width:var(--kmbW,60%);max-width:620px;box-sizing:border-box;margin-left:max(0px,calc((var(--kmbW,60%) - 620px)/2));display:flex;align-items:center;gap:8px;padding:6px 8px 6px 12px;border-radius:12px;background:#fffaf0f2;border:1px solid var(--gold,#b8892b);box-shadow:0 3px 10px rgba(60,30,10,.22);color:var(--ink,#3a2418);font:600 .92rem/1.3 var(--body,sans-serif);pointer-events:auto}
#panel .mapv.kmb-on:not(.kmb-abs)>.mapsc{margin-top:var(--kmbH,0px)}#panel .mapv.kmb-on.kmb-abs>.mapsc{top:var(--kmbH,0px)!important}
#panel .mapv>.kmapban>.kmb-ico{flex:none;font-size:.9rem;opacity:.8}
#panel .mapv>.kmapban>.kmb-t{flex:1 1 auto;min-width:0}
#panel .mapv>.kmapban>.kmb-home-b{flex:none;display:inline-flex;align-items:center;gap:4px;min-height:36px;padding:4px 12px;border-radius:999px;border:1px solid var(--gold,#b8892b);background:var(--k-red,#a3322a);color:#fffaf0;font:700 .86rem/1 var(--body,sans-serif);cursor:pointer}
#panel .mapv>.kmapban .kmb-hm{font-size:1rem;line-height:1}
#panel .mapv .mspot.kmb-home{outline:2px solid var(--k-red,#a3322a);outline-offset:2px;border-radius:8px;filter:none!important;opacity:1!important}
/* KK38: no floating «⌂ Nhà ta» badge on the spot (it always met the spot's own «Ta + N bóng» chip or the banner); the word «Nhà ta» is in the spot's label line (caller, jplrule plMap) and the spot keeps the red ring */
#panel .mapv .mspot.kmb-glow{animation:kmb-glow .6s ease-in-out 3 alternate}
@keyframes kmb-glow{to{box-shadow:0 0 0 6px #a3322a55,0 0 18px #a3322a88}}
html.kf-still #panel .mapv .mspot.kmb-glow{animation:none;box-shadow:0 0 0 5px #a3322a66}`;document.head.appendChild(st);
}catch(e){console.error("jkmapban",e)}})();
