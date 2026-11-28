
/* ================= jmark: kitMeMark — "this is HER" marker over the player's head (owner 11/15: "không biết ai là mình") =================
   kitMeMark(figEl): a small painted palace hair-ornament emblem floating above the head of HER figure. One component for every place her
   full-body figure is drawn: the stage (#mefig, whatever slot she stands in) and dialogs / event stages (kitStageFig → figure.kesf.kesme).
   Never on anyone else (kitMeMark refuses a figure that is not marked as hers).
   EIGHT markers, one per rank 0→7 (owner 11/15): img/kit/me-mark-<r>.webp (gpt-2-6, transparent, no tassel), growing in grandeur:
   0 ivory plum blossom · 1 silver orchid + green jade · 2 silver flower + aquamarine · 3 jade lotus bud (Tần) · 4 amethyst chrysanthemum + luan ·
   5 ruby peony · 6 gold phoenix on a jade cloud · 7 amber-gold phoenix with spread wings (Hoàng hậu; owner 11/15 swap). Size factor KIT_MEMARK.sc[r].
   STAGE: the marker stands ON the sex line of the stage (kitMarkLine / kitBadgeAt below, KIT §78.y: line = the highest REAL head top (hair / crown included) of the visible figures of that sex − a clear gap), never touching any head.
   DIALOG PLACEMENT RULE: marker bottom = TOP OF HER HEAD (first opaque row of the figure art, hair ornaments included) − gap, gap = KIT_MEMARK.gap ×
   her drawn figure height (same fraction for every figure, size and screen). Never covers the head; when there is not enough room above the head
   (dialogs, the scene title) the marker SHRINKS instead (down to KIT_MEMARK.tiny px).
   Motion: squash-and-bounce loop (17/11), only with Cảnh động on and no reduced motion. A very faint soft shadow keeps it readable on busy paintings.
   ITEMS: markers are owned items (S.meMarks = ranks owned; S.meMark = the one she shows, null = highest owned). Every promotion gives that rank's
   marker (shown in the rank chest of review/gift-chest — jrankset rsChest/kitReward kind "chest" — via the hook below); old saves get every rank
   up to the current one on load. Tư trang has a "Dấu ấn" tab; tapping a marker → "Dùng" switches to it (any owned one, older ones too). ===== */
window.KIT_MEMARK=window.KIT_MEMARK||{mapBase:36,/* mapBase = the «Ta» marker's height on a map tag at scale 1 (px); the place icons (kitPlaceIcPx, jact) use the SAME number */h:.085,gap:.012,min:26,max:72,tiny:12,big:1.05,bob:11,edge:4,/* bob = the bounce height of kmmBob (px up from rest, +3 % squash); edge = air kept under the frame's top edge (owner 18/11 ~03:5xZ: the marker's whole bounce range stays INSIDE the stage frame) */sc:[.78,.84,.9,.95,1,1.06,1.14,1.22]};
/* glow gold = the Hoàng hậu title pill's token (jtitle kdh tier 8 = RCOL[7]); owner 18/11 ~06:05Z "rực giống Phượng minh thiên hạ" */
const KMM_GOLD=(typeof RCOL!=="undefined"&&RCOL[7])||"#efbd69";
const KMM_NAMES=["Mai ngà","Lan bạc ngọc bích","Hoa bạc ngọc lam","Búp sen ngọc","Cúc tím chim loan","Mẫu đơn hồng ngọc","Phượng vàng mây ngọc","Cánh phượng hổ phách"];
/* ---------- owned markers (save data) ---------- */
/* owner 18/11 ~21:50Z: the marker's light = HER CURRENT RANK colour (RCOL, vivid), as a RIM glow on an UNDER-layer (.kmglw: the picture's own silhouette, blurred, behind the picture) - light never paints over the picture */
function kmmGlowCol(){try{return(typeof RCOL!=="undefined"&&RCOL[Math.max(0,Math.min(7,(S&&S.rank)|0))])||KMM_GOLD}catch(e){return KMM_GOLD}}
function kmmRankNow(){try{if(!S||S.out)return null;if(typeof isSrv==="function"&&isSrv())return null;return Math.max(0,Math.min(7,S.rank|0))}catch(e){return null}}
function kmmOwned(){try{if(!S)return[];const r=kmmRankNow();if(!Array.isArray(S.meMarks)){S.meMarks=[];if(r!=null)for(let i=0;i<=r;i++)S.meMarks.push(i)}
 else if(r!=null&&!S.meMarks.includes(r)){for(let i=0;i<=r;i++)if(!S.meMarks.includes(i))S.meMarks.push(i)}S.meMarks.sort((a,b)=>a-b);return S.meMarks}catch(e){return[]}}
function kmmCur(){const L=kmmOwned();if(!L.length)return null;const c=S.meMark;return c!=null&&L.includes(c)?c:L[L.length-1]}
function kmmSrc(r){return `img/kit/me-mark-${r}.webp`}
window.kitMeMarkUse=function(r){const L=kmmOwned();if(!L.includes(r))return false;S.meMark=r;kmmSched();return true};
/* ---------- head measurement (once per picture) ---------- */
const KMM_HEAD={};
/* x = mean x of the opaque pixels in the top 10 % of the body; t = first opaque row (hair ornaments included); fractions of the picture */
function kmmHead(src,cb){const o=KMM_HEAD[src];if(o&&o.v)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KMM_HEAD[src]=e;
 const im=new Image();im.decoding="async";im.crossOrigin="anonymous";
 const done=v=>{e.v=v;const L=e.w;e.w=[];L.forEach(f=>{try{f&&f()}catch(x){}})};
 im.onload=()=>{let v={t:0,x:.5};try{const h=400,w=Math.max(1,Math.round(im.naturalWidth*h/im.naturalHeight));const c=document.createElement("canvas");c.width=w;c.height=h;
   const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(im,0,0,w,h);const d=g.getImageData(0,0,w,h).data;let t=-1,b=-1;
   for(let y=0;y<h;y++){const q=y*w*4;let n=0;for(let i=0;i<w;i++)if(d[q+i*4+3]>60)n++;if(n>=2){if(t<0)t=y;b=y}}
   if(t>=0){const lim=t+Math.max(2,Math.round((b-t)*.1));let sx=0,n=0;for(let y=t;y<=lim;y++){const q=y*w*4;for(let i=0;i<w;i++)if(d[q+i*4+3]>60){sx+=i;n++}}v={t:t/h,x:n?sx/n/w:.5}}}catch(x){}done(v)};
 im.onerror=()=>done({t:0,x:.5});im.src=src;return null}
function kitMeMapMark(){try{const r=kmmCur();if(r==null)return"";return `<span class="kmmapmk${kmmMotion()?" kmmove":""}" aria-hidden="true" style="--kmm-mapsc:${((KIT_MEMARK.sc[r]||1)*(KIT_MEMARK.big||1)).toFixed(3)};--dh:${kmmGlowCol()}"><img class="kmglw" alt="" draggable="false" src="${kmmSrc(r)}"><img alt="" draggable="false" src="${kmmSrc(r)}" onerror="this.parentNode.style.display='none'"></span>`}catch(e){return""}}
function kmmMotion(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return false;return!(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false)}catch(e){return false}}
function kmmIsMe(fig){return!!fig&&(fig.id==="mefig"||!!fig.closest(".kesme"))}
/* KK67 (RV-179 Fold «Biếu quà làm lành»: the marker sat on the dialog name plaque over «Quý phi»): every name plaque / rank / title tag is an obstacle too (.kpsn figcaption plaques, .kdpcap, .kname, .kdh title pills) */
const KMM_AVOID="#sc-t h2,#kshL,#kshR,.k3chips,.kchip,.kmnote,#j59metag .tag,.kpsn,.kdpcap,.kname,.kdh,#kpname";window.KMM_AVOID=KMM_AVOID;
function kmmAvoid(){const L=[];document.querySelectorAll(KMM_AVOID).forEach(e=>{const r=e.getBoundingClientRect();if(r.width>0&&r.height>0)L.push(r)});return L}
/* the drawn picture box inside an <img> (object-fit: contain) */
function kmmBox(fig){const fr=fig.getBoundingClientRect();let bx=fr.left,by=fr.top,bw=fr.width,bh=fr.height;const nw=fig.naturalWidth,nh=fig.naturalHeight;
 if(nw&&nh){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}return{bx,by,bw,bh}}
function kitMeMark(fig){try{
 if(!fig||!kmmIsMe(fig)||!fig.isConnected)return null;const host=fig.offsetParent||fig.parentElement;if(!host)return null;
 let mk=host.querySelector(":scope>.kmemark");const r=kmmCur();if(r==null){if(mk)mk.remove();return null}
 const src=kmmSrc(r);
 if(!mk){mk=document.createElement("span");mk.className="kmemark";mk.setAttribute("aria-hidden","true");mk.innerHTML=`<img alt="" draggable="false"><img class="kmglw" alt="" draggable="false">`;host.appendChild(mk)}if(!mk.querySelector(".kmglw"))mk.insertAdjacentHTML("beforeend",`<img class="kmglw" alt="" draggable="false">`);mk.style.setProperty("--dh",kmmGlowCol());
 const im=mk.firstChild;if(im.getAttribute("src")!==src){im.onerror=()=>{mk.style.display="none"};im.onload=()=>{mk.style.display="";kmmSched()};im.setAttribute("src",src)}const gl=mk.querySelector(".kmglw");if(gl&&gl.getAttribute("src")!==src)gl.setAttribute("src",src);
 const fsrc=fig.currentSrc||fig.getAttribute("src")||"";const hd=fsrc?kmmHead(fsrc,()=>kitMeMark(fig)):{t:0,x:.5};if(!hd){mk.style.visibility="hidden";return mk}
 const B=kmmBox(fig),hr=host.getBoundingClientRect();if(B.bh<20){mk.style.visibility="hidden";return mk}
 const K=KIT_MEMARK,sc=K.sc[r]||1;let H=Math.round(Math.max(K.min*sc,Math.min(K.max*sc,B.bh*K.h*sc))*(K.big||1)); /* owner 17/11 07:15Z: +5 % (K.big, one kit value; 2–8 % allowed) */
 const ar=im.naturalWidth&&im.naturalHeight?im.naturalWidth/im.naturalHeight:1;
 /* KIT §78.y: on a stage her marker stands ON her sex line (the highest REAL head top of that sex − G), on her centre line; dialogs keep the head rule below */
 if(fig.id==="mefig"){const st=fig.closest("#stage");const L1=st&&kitMarkLine(st,kitBadgeSex(fig));if(!L1){mk.style.visibility="hidden";return mk}
  const sc=L1.sc||1;let Hm=Math.round(Math.max(K.min*sc,Math.min(K.max*sc,L1.H/sc*K.h*(K.sc[r]||1)))*(K.big||1))*sc;if(L1.room<Hm)Hm=Math.max(K.tiny*sc,Math.floor(L1.room));/* never out of the frame top: shrinks, never sinks onto a head */const ar0=im.naturalWidth&&im.naturalHeight?im.naturalWidth/im.naturalHeight:1;const Wm=Math.round(Hm*ar0);
  const P=kitBadgeAt(st,fig,"me",Wm,Hm);if(!P){mk.style.visibility="hidden";return mk}const L0=P.left;mk.style.cssText=`left:${(L0-hr.left+host.scrollLeft).toFixed(1)}px;top:${(P.top-hr.top+host.scrollTop).toFixed(1)}px;width:${Wm}px;height:${Hm}px`;
  mk.dataset.r=r;mk.dataset.at="row";mk.dataset.gap=(B.by+B.bh*hd.t-(P.top+Hm)).toFixed(1);mk.classList.toggle("kmmove",kmmMotion());return mk}
 const cx=B.bx+B.bw*hd.x,headTop=B.by+B.bh*hd.t,gap=Math.max(1,B.bh*K.gap);let bottom=headTop-gap;
 /* room above the head: the host's top edge, and anything the marker must not cover (scene title, plaques, chips) */
 /* dialogs: the room above the figure is the figure column (the free space over the head inside the dialog), not just the figure box */
 let roomTop=hr.top+1+K.bob+(K.edge||0);const col=fig.id==="mefig"?null:fig.closest(".kesf");if(col){const cb=(col.parentElement||col).getBoundingClientRect();roomTop=Math.min(roomTop,cb.top+2)}
 /* KK67 FREE SLOTS (KIT §78.y dialog rule, law 11): the marker never lies on a plaque / chip / title text. The obstacles in its column split the room above the head into
    free slots (head − gap up to the first obstacle, then above each obstacle − gap, …, up to the room top); the marker takes the LOWEST slot that holds its full size,
    else the tallest slot (shrinks, ≥ KIT_MEMARK.tiny); no slot ≥ tiny → KIT_MEMARK.tiny in the TOP slot (above every obstacle: it may reach into the frame air, never onto text). */
 {const W0=H*ar,obs=kmmAvoid().filter(q=>cx+W0/2>q.left-1&&cx-W0/2<q.right+1&&q.top<bottom&&q.bottom>roomTop).sort((a,b)=>b.bottom-a.bottom);
  const slots=[];let cur=bottom;for(const q of obs){if(q.bottom<cur)slots.push([Math.max(roomTop,q.bottom+1),cur]);cur=Math.min(cur,q.top-gap)}slots.push([roomTop,cur]);
  let s=slots.find(z=>z[1]-z[0]>=H);if(!s){s=slots.filter(z=>z[1]-z[0]>=K.tiny).reduce((a,z)=>!a||z[1]-z[0]>a[1]-a[0]?z:a,null);if(s)H=Math.floor(s[1]-s[0]);else{s=slots[slots.length-1];H=K.tiny}}
  bottom=s[1];mk.dataset.at=obs.length?"slot"+slots.indexOf(s):"head"}
 const W=Math.round(H*ar),top=bottom-H;
 mk.style.cssText=`left:${(cx-hr.left-W/2+host.scrollLeft).toFixed(1)}px;top:${(top-hr.top+host.scrollTop).toFixed(1)}px;width:${W}px;height:${H}px`;
 mk.dataset.r=r;mk.dataset.gap=(headTop-(top+H)).toFixed(1);mk.classList.toggle("kmmove",kmmMotion());return mk}catch(e){console.error("kitMeMark",e);return null}}
/* KIT §78.y STAGE BADGE LINES (owner OD 19/11 ~02:05Z two lines per sex; OD 19/11 ~03:50Z FAIL of r5: "nó đang che trực tiếp ngay trên đầu của cái người đó" → canon overwrite):
   every head marker on a stage — the player's «ta ở đây» (.kmemark), the speech bubble (.khead white / whole-bubble yellow, §78.z) and the mood seal at the head (.kfseal, §28.8d) —
   is anchored from the REAL HEAD TOP of the figures on screen: the first opaque row of each figure picture (hair, hair ornaments, crown, hat included; kitFigBody t = alpha bbox
   of the art, measured once per picture and cached), never a fixed fraction of the figure box or a "standard" head.
     line of a sex = min(real head top of every VISIBLE figure of that sex on the stage) − G        (fallback when no figure of that sex shows: floor − standard body of that sex − G)
     G = max(KIT_BADGE.gapMin px, KIT_BADGE.gap × H) + KIT_BADGE.reach × seal size              (a clear gap; the seal's lean-in / droop reach is inside G, so even mid-motion nothing touches a head)
   (1) every mark's BOTTOM sits ON the line of its figure's sex → all women's marks level, all men's marks level (two lines, OD ~02:05Z), «ta ở đây» level with the bubble;
   (2) «ta ở đây» / the bubble stand on the figure's centre line; the mood seal stands BESIDE them on the same line: centre = centre line ± (KIT_BADGE.mw × H / 2 + KIT_BADGE.sp × H + seal / 2)
       (mw = the widest primary mark of the line, so seal and mark never overlap when both show); right first, mirrored left when the right would leave the stage, cross a plaque
       or touch a neighbour's mark column;
   (3) a mark never covers hair, headdress, face or another figure's mark (dev/test/head-marker-gap.js scans the real alpha of every figure under every mark).
   Sizes scale with H only (one size per stage). kitMarkLine(st,sex) → {top,bottom,head,h,H,Hs,floor,sc,sex,real,room} in viewport px (null before j59 has laid the stage out or
   before the figures are measured — they re-run on measure); kitBadgeAt(st,fig,kind,w,h) → {left,top,cx,side,sex,off,line} (top-left of the mark box). */
window.KIT_BADGE=window.KIT_BADGE||{emo:.105,emoMin:22,emoMax:50,gap:.024,gapMin:7,reach:.2,mw:.1,sp:.012};/* gap / gapMin = the clear air between the highest real head top of a line and every mark bottom (fraction of the stage body H, px floor); reach = the seal's lean-in + droop reach below its box (scale 1.18 about 60 % + translateY 9 %), in seal sizes; mw = the widest primary mark («ta ở đây» rank-7 width), sp = side gap seal ↔ mark, both in H */
/* the standard marker height for a body H (the Hoàng hậu rank-7 marker: the tallest mark a line ever holds) */
function kbMarkH(H){const K=KIT_MEMARK,sc=K.sc[7]||1;return Math.round(Math.max(K.min*sc,Math.min(K.max*sc,H*K.h*sc))*(K.big||1))}
/* room the stage keeps above the men's head line for the marks' whole bounce (j59 caps the one body H with it: H × KIT_FIG.man + room ≤ stage − floor band) */
window.kitMarkRoom=function(H){try{const K=KIT_MEMARK;return Math.ceil(kbMarkH(H)*1.03+kbGap(H)+K.bob+(K.edge||0))}catch(e){return 0}};
/* a figure's sex for the badge lines = the kit figure rule (KIT_FIG.fac: emperor / eunuch / official / physician / man / unknown-man silhouette are men) */
function kitBadgeSex(fig){try{const src=fig&&(fig.currentSrc||fig.getAttribute("src"))||"";return KIT_FIG.fac(src)>1?"m":"f"}catch(e){return"f"}}
window.kitBadgeSex=kitBadgeSex;
/* one seal size per stage (design px of the standard woman body H0) */
function kbEmoS(H0){const K=KIT_BADGE;return Math.round(Math.max(K.emoMin,Math.min(K.emoMax,H0*K.emo)))}
/* G in design px for a stage body H0: clear gap + the seal's motion reach */
function kbGap(H0){const K=KIT_BADGE;return Math.max(K.gapMin,H0*K.gap)+K.reach*kbEmoS(H0)}
/* the figures standing on the stage now (on screen, not paged away, picture loaded) */
function kbFigs(st){const R=st.getBoundingClientRect();return[...st.querySelectorAll("#mefig,#tokens .tok.fig img.figimg")].filter(f=>{if(!f.isConnected||!f.complete||!f.naturalWidth||!f.getClientRects().length)return false;
 if(f.classList.contains("j59off")||f.closest(".j59off"))return false;const c=getComputedStyle(f);if(c.visibility==="hidden"||c.display==="none"||+c.opacity<.2)return false;const r=f.getBoundingClientRect();return r.right>R.left+4&&r.left<R.right-4&&r.width>4})}
let kbReQ=0;function kbRe(){if(kbReQ)return;kbReQ=requestAnimationFrame(()=>{kbReQ=0;try{kmmSched()}catch(e){}try{window.kitFigSealAll&&window.kitFigSealAll()}catch(e){}try{window.errSync&&window.errSync()}catch(e){}try{window.kitSayAll&&window.kitSayAll()}catch(e){}})}
/* the REAL head top of a figure on screen (viewport px): first opaque row of its picture (kitFigBody t); null until measured */
function kitHeadTop(fig){try{const src=fig.currentSrc||fig.getAttribute("src")||"";if(!src||typeof kitFigBody!=="function")return null;const b=kitFigBody(src,kbRe);if(!b)return null;const B=kmmBox(fig);return B.by+B.bh*b.t}catch(e){return null}}
window.kitHeadTop=kitHeadTop;
function kitMarkLine(st,sex){try{st=st||document.getElementById("stage");if(!st||!st.isConnected)return null;const H0=+st.dataset.kmlH,F0=+st.dataset.kmlF;if(!(H0>20)||!(F0>0))return null;
 const M0=+st.dataset.kmlM>20?+st.dataset.kmlM:H0*(KIT_FIG.man||1);const m=sex==="m";
 const R=st.getBoundingClientRect();const sc=st.offsetHeight?R.height/st.offsetHeight:1;const H=H0*sc,Hs=(m?M0:H0)*sc,floor=R.top+(st.clientTop+F0)*sc;
 let head=null,wait=false;for(const f of kbFigs(st)){if(kitBadgeSex(f)!==(m?"m":"f"))continue;const t=kitHeadTop(f);if(t==null){wait=true;continue}if(head==null||t<head)head=t}
 if(wait&&head==null)return null;const real=head!=null;if(!real)head=floor-Hs;
 const bottom=head-kbGap(H0)*sc,h=kbMarkH(H0)*sc,room=bottom-(R.top+(KIT_MEMARK.bob+(KIT_MEMARK.edge||0))*sc);return{top:bottom-h,bottom,head,h,H,Hs,floor,sc,sex:m?"m":"f",real,room}}catch(e){return null}}
window.kitMarkLine=kitMarkLine;
/* the figure's centre line = the centre of its body core column (j59 stands that column on the slot centre) */
function kbCentre(fig){const B=kmmBox(fig);let c=.5;try{const src=fig.currentSrc||fig.getAttribute("src")||"";const b=src&&typeof kitFigBody==="function"?kitFigBody(src):null;if(b)c=b.cl!=null&&b.cr>b.cl?(b.cl+b.cr)/2:(b.l+b.r)/2}catch(e){}return B.bx+B.bw*c}
function kitBadgeAt(st,fig,kind,w,h){if(!fig)return null;const sex=kitBadgeSex(fig);const L=kitMarkLine(st,sex);if(!L)return null;const cx=kbCentre(fig);const R=st.getBoundingClientRect();
 if(h==null)h=L.h;const K=KIT_BADGE;
 if(kind==="emo"){const off=K.mw*L.H/2+K.sp*L.H+w/2;const others=kbFigs(st).filter(f=>f!==fig).map(kbCentre),mwh=K.mw*L.H/2;
  /* KK67 (law 11, mark-plaque-scan Fold r19/r22: the seal touched the place name #kpname): a side whose box lies on a plaque / name / title text (KMM_AVOID) is bad too */const av=typeof kmmAvoid==="function"?kmmAvoid():[],tp=L.bottom-h;const bad=l=>l<R.left+2||l+w>R.right-2||others.some(c=>l<c+mwh+2&&l+w>c-mwh-2)||av.some(q=>l<q.right+1&&l+w>q.left-1&&tp<q.bottom+1&&L.bottom>q.top-1);let side=1,left=cx+off-w/2;if(bad(left)&&!bad(cx-off-w/2)){side=-1;left=cx-off-w/2}
  left=Math.max(R.left+2,Math.min(left,R.right-2-w));return{left,top:L.bottom-h,cx,side,sex,off,line:L}}
 const left=Math.max(R.left+2,Math.min(cx-w/2,R.right-2-w));return{left,top:L.bottom-h,cx,side:1,sex,off:0,line:L}}
window.kitBadgeAt=kitBadgeAt;
/* ---------------------------------------------------------------- K-HEAD-SAY: kitSay(st,fig,text,opts) (KIT §78.z "say" + §78.y) ----------------------------------------------------------------
   The speech bubble of ONE speaker: kitHeadMarkHtml(title,"img","say",text) on the part's OWN stage layer (.ksay-lay, appended to the stage here, so it works in co-op and servant-road lives where jerr's errSync never runs),
   placed on the speaker's sex line: bottom (= the tail tip) ON the line at the figure's centre line (never over any head / hair / crown, OD 19/11 ~03:50Z), clamped inside the stage;
   two bubbles never overlap (the later one shifts sideways, the tail stays on its speaker; no side room → it rises above the other, last resort) and no bubble covers another figure's head (sideways, else above that head);
   too little room → 2 lines → 1 line → smaller font (KIT_HEADMK.sayMinF), still none → no bubble (null / dropped), a bubble never sinks below the line. Pop in/out (ksayIn / ksayOut, still under reduced motion).
   opts: {ms: auto-close after ms, title}. Returns {el,close()} (null when the stage has no figure / layer). Re-placed on every measure / resize (kitSayAll). */
const KSAY=[];
function ksayTier(st){const K=KIT_HEADMK,W=st.clientWidth||st.getBoundingClientRect().width,k=W<K.sayW.bp[0]?"s":W<K.sayW.bp[1]?"m":"l";return{w:K.sayW[k],fs:K.sayFs[k]}}
function ksayLay(st){let l=st.querySelector(":scope>.ksay-lay");if(!l){l=document.createElement("div");l.className="ksay-lay";st.appendChild(l)}return l}
function ksayFigRange(f){const B=kmmBox(f);let l=0,r=1;try{const b=kitFigBody(f.currentSrc||f.getAttribute("src")||"");if(b){l=b.l;r=b.r}}catch(e){}return[B.bx+B.bw*l,B.bx+B.bw*r]}
function ksayPlace(rec,placed){const st=rec.st,fig=rec.fig,el=rec.el;if(!st.isConnected||!fig.isConnected)return false;const sex=kitBadgeSex(fig),L=kitMarkLine(st,sex);if(!L)return null;
 const K=KIT_HEADMK,T=ksayTier(st),R=st.getBoundingClientRect(),sc=st.offsetWidth?R.width/st.offsetWidth:1,cx=kbCentre(fig),gap=K.sayGap*sc,top0=R.top+2*sc,avail=L.bottom-top0,sw=R.width-6*sc;
 const others=kbFigs(st).filter(f=>f!==fig).map(f=>({f,t:kitHeadTop(f),x:ksayFigRange(f)})),pad=gap;
 /* no-go: the stage plaque columns #kshR/#kshL (§28.8d, like the seal) and every mood seal on the stage (never covered by a bubble) */
 const noGo=[...st.querySelectorAll("#kshR,#kshL,img.kfseal")].filter(e=>!e.hidden&&e.offsetHeight&&e.getClientRects().length&&getComputedStyle(e).visibility!=="hidden").map(e=>e.getBoundingClientRect());
 /* placement of the current size: ideal = on the line at the centre line; shift sideways around placed bubbles / heads that reach into the band; last resort rise above the blocker */
 const tryPlace=()=>{const r=el.getBoundingClientRect(),w=r.width,h=r.height;let bottom=L.bottom;
  for(let tries=0;tries<6;tries++){const topY=bottom-h;if(topY<top0)return null;
   const bad=[];for(const q of placed)if(q.top-pad<bottom&&q.bottom+pad>topY)bad.push([q.left-pad,q.right+pad]);
   for(const o of others)if(o.t!=null&&o.t-2*sc<bottom)bad.push([o.x[0]-2*sc,o.x[1]+2*sc]);
   for(const z of noGo)if(z.top<bottom&&z.bottom>topY)bad.push([z.left-pad,z.right+pad]);
   const lo=R.left+2*sc,hi=R.right-2*sc-w,clamp=v=>Math.max(lo,Math.min(hi,v)),ideal=clamp(cx-w/2);
   const hit=l=>bad.some(b=>l<b[1]&&l+w>b[0]);const C=[ideal];for(const b of bad){C.push(clamp(b[1]),clamp(b[0]-w))}
   const good=C.filter(l=>l>=lo-.5&&l<=hi+.5&&!hit(l)).sort((a,b)=>{const ta=(cx>=a+10*sc&&cx<=a+w-10*sc)?0:1,tb=(cx>=b+10*sc&&cx<=b+w-10*sc)?0:1;return ta-tb||Math.abs(a-ideal)-Math.abs(b-ideal)});
   if(good.length)return{left:good[0],bottom,w,h};
   let up=bottom;for(const q of placed)if(q.left-pad<ideal+w&&q.right+pad>ideal)up=Math.min(up,q.top-pad);for(const o of others)if(o.t!=null&&o.x[0]-2*sc<ideal+w&&o.x[1]+2*sc>ideal&&o.t-2*sc<bottom)up=Math.min(up,o.t-6*sc);
   if(up>=bottom-.5)return null;bottom=up}return null};
 /* sizes, widest/largest first: ≤ 2 lines at W, 1.25 W, 1.5 W per font step down to KIT_HEADMK.sayMinF; then one line (smaller and smaller); the first size that fits the room AND finds a place wins */
 const lines=()=>{const t=el.firstChild,cs=getComputedStyle(t),lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.22,pd=parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom);return Math.round((t.getBoundingClientRect().height/sc-pd)/lh)};
 const fits=()=>{const r=el.getBoundingClientRect();return r.height<=avail&&r.width<=sw};
 const fMin=Math.max(K.sayMinF,K.sayMinPx/T.fs);/* KIT floor: never below the smallest kit text (.64rem = 10.24 design px; sayMinPx 10.5) */
 let P=null;el.classList.remove("k1");
 for(let f=1;f>=fMin-.001&&!P;f-=.1){el.style.setProperty("--ksay-fs",(T.fs*f).toFixed(2)+"px");
  for(const wf of[1,1.25,1.5,.85,.72]){el.style.setProperty("--ksay-w",Math.min(T.w*wf,sw/sc).toFixed(1)+"px");if(lines()<=2&&fits()){P=tryPlace();if(P)break}}}
 if(!P){el.classList.add("k1");for(let f=1;f>=fMin-.001&&!P;f-=.1){el.style.setProperty("--ksay-fs",(T.fs*f).toFixed(2)+"px");if(fits())P=tryPlace()}}
 if(!P){window.__kitSayWhy={avail:Math.round(avail),sw:Math.round(sw),placed:placed.map(q=>[Math.round(q.left),Math.round(q.right),Math.round(q.top),Math.round(q.bottom)]),others:others.map(o=>[o.t&&Math.round(o.t),o.x.map(Math.round)]),cx:Math.round(cx),L:[Math.round(L.top),Math.round(L.bottom)],R:[Math.round(R.left),Math.round(R.right)]};return false}
 const left=P.left,bottom=P.bottom,w=P.w,h=P.h;
 const tx=Math.max(14*sc,Math.min(w-14*sc,cx-left))/sc;el.style.setProperty("--ksay-tx",tx.toFixed(1)+"px");
 const lay=el.parentNode,lr=lay.getBoundingClientRect(),ox=lr.left+lay.clientLeft*sc,oy=lr.top+lay.clientTop*sc;
 el.style.left=((left-ox)/sc).toFixed(1)+"px";el.style.top=((bottom-h-oy)/sc).toFixed(1)+"px";el.dataset.line=sex;el.dataset.raised=bottom<L.bottom-.5?"1":"";
 rec.rect={left,right:left+w,top:bottom-h,bottom};return true}
function kitSayAll(){try{window.__kitSayAllRan=1;const by=new Map();for(let i=KSAY.length-1;i>=0;i--){const q=KSAY[i];if(!q.el.isConnected||!q.fig.isConnected){q.el.remove();KSAY.splice(i,1)}}
 for(const q of KSAY){const k=q.st;if(!by.has(k))by.set(k,[]);const pl=by.get(k);const ok=ksayPlace(q,pl);
  if(ok===true){try{window.kitEmoSeal&&window.kitEmoSeal.yield(q.rect)}catch(e){}q.el.style.visibility="";if(!q.shown){q.shown=1;if(!q.still)q.el.classList.add("kin")}pl.push(q.rect)}
  else if(ok===false||Date.now()-q.t0>KIT_HEADMK.sayWait)q.close(true)}}catch(e){window.__kitSayWhy="EXCALL "+(e&&e.stack||e)}}
window.kitSayAll=kitSayAll;
function kitSay(st,fig,text,opts){try{opts=opts||{};st=st||document.getElementById("stage");if(!st||!fig||!st.isConnected||!fig.isConnected)return null;
 const K=KIT_HEADMK,w=document.createElement("span");w.innerHTML=kitHeadMarkHtml(opts.title||String(text),"img","say",text);const el=w.firstChild;if(!el)return null;
 el.style.visibility="hidden";el.style.setProperty("--ksay-in",K.sayIn+"ms");el.style.setProperty("--ksay-out",K.sayOut+"ms");
 let still=false;try{still=matchMedia("(prefers-reduced-motion:reduce)").matches}catch(e){}
 ksayLay(st).appendChild(el);const q={st,fig,el,t0:Date.now(),shown:0,still,rect:null,tm:0,closed:false};
 q.close=function(now){if(q.closed)return;q.closed=true;clearTimeout(q.tm);const i=KSAY.indexOf(q);if(i>=0)KSAY.splice(i,1);
  if(now||still||!q.shown){el.remove();return}el.classList.remove("kin");el.classList.add("kout");setTimeout(()=>el.remove(),K.sayOut)};
 KSAY.push(q);const ok=ksayPlace(q,KSAY.filter(x=>x!==q&&x.st===st&&x.rect&&x.el.isConnected&&!x.closed).map(x=>x.rect));
 if(ok===false){q.close(true);return null}
 if(ok===true){try{window.kitEmoSeal&&window.kitEmoSeal.yield(q.rect)}catch(e){}el.style.visibility="";q.shown=1;if(!still)el.classList.add("kin")}
 else{const poll=()=>{if(q.closed||q.shown)return;kitSayAll();if(!q.closed&&!q.shown)setTimeout(poll,150)};setTimeout(poll,150)}/* not measured yet (no kitMarkLine): retry until placed or KIT_HEADMK.sayWait */
 if(opts.ms)q.tm=setTimeout(()=>q.close(),opts.ms);return q}catch(e){window.__kitSayWhy="EXC "+(e&&e.stack||e);return null}}
window.kitSay=kitSay;window.kitSayClear=function(st){for(const q of KSAY.slice())if(!st||q.st===st)q.close(true)};
window.addEventListener("resize",()=>{try{kitSayAll()}catch(e){}});
/* the mood chip size on a stage: one size per stage (the standard woman body), never per figure */
window.kitBadgeEmoSize=function(st){const H0=+(st&&st.dataset.kmlH);if(!(H0>20))return 0;const sc=st.offsetHeight?st.getBoundingClientRect().height/st.offsetHeight:1;return Math.round(kbEmoS(H0)*sc)};
/* drop markers whose figure is gone (scene change, dialog closed) */
function kmmSweep(){document.querySelectorAll(".kmemark").forEach(m=>{const h=m.parentElement;if(!h||!(h.querySelector(":scope>#mefig")||h.querySelector(":scope>img.kesimg")&&h.closest(".kesme")))m.remove()})}
function kmmAll(){kmmSweep();const me=document.getElementById("mefig");if(me)kitMeMark(me);document.querySelectorAll(".kesme img.kesimg").forEach(kitMeMark)}
/* lag-play (owner 16/11 15:05Z): every DOM change queued ANOTHER frame callback + a 700 ms follow-up that was never cancelled (dozens of
   full mark passes per buổi, each with layout reads). Now one pending frame pass and one timer chain, restarted by the last change. */
let kmmT=0,kmmT2=0,kmmQ=0;function kmmSched(){clearTimeout(kmmT);clearTimeout(kmmT2);if(!kmmQ)kmmQ=requestAnimationFrame(()=>{kmmQ=0;kmmAll()});kmmT=setTimeout(()=>{kmmAll();kmmT2=setTimeout(kmmAll,700)},250)}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{kmmSched()}catch(e){}return r}})();
(function(){if(typeof kitStageFig!=="function")return;const f0=kitStageFig;kitStageFig=function(p,o){let h=f0.apply(this,arguments);try{const q=p&&(p.__kp||p);if(q&&typeof S!=="undefined"&&q===S&&h)h=h.replace('<figure class="kesf"','<figure class="kesf kesme"')}catch(e){}return h}})();
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kmmSched()}catch(e){}return r}})();
addEventListener("resize",kmmSched);
document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&(t.id==="mefig"||t.classList.contains("kesimg")))kmmSched()},true);
try{new MutationObserver(ms=>{if(ms.every(m=>m.target.closest&&m.target.closest(".kmemark")))return;if(document.getElementById("mefig")||document.querySelector(".kesme"))kmmSched();else kmmSweep()})
 .observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src","hidden"]})}catch(e){}
(function(){const st=document.createElement("style");st.id="kmm-css";st.textContent=`
/* KIT §41.2 kitMeMapMark(): the SAME marker (her owned rank marker, same glow + squash-bounce loop) over HER place on the Dư đồ (owner 17/11 ~12:20Z "dấu ấn ta ở đây ở trên dư đồ"); the map label shows it above the place name, in the label's own scale. */
.kmmapmk{position:absolute;left:50%;bottom:calc(100% - 1px);height:calc(${KIT_MEMARK.mapBase}px * var(--kmm-mapsc,1));aspect-ratio:1;transform:translateX(-50%);z-index:6;pointer-events:none;display:block;--dh:${KMM_GOLD}}
.mspot .mlab:has(>.kmmapmk){position:relative;overflow:visible!important}
.kmmapmk>img{display:block;width:100%;height:100%;object-fit:contain;object-position:50% 100%;transform-origin:50% 100%}
@media (prefers-reduced-motion:no-preference){.kmmapmk.kmmove>img{animation:kmmBob 2.6s linear infinite;will-change:transform}}
.kmemark{--dh:${KMM_GOLD};position:absolute;z-index:6;pointer-events:none;display:block}
/* KIT GLOW TOKEN (rim glow, one place for every marker): .kmglw = the same picture, painted black, blurred in the rank colour, BEHIND the real picture (same box, exactly under it; the hairline dark rim of the picture hides any antialias fringe); the real picture only gets a hairline dark rim for contrast */
.kmmapmk>img:not(.kmglw),.kmemark>img:not(.kmglw){position:relative;z-index:1;filter:drop-shadow(0 0 1px #2a1a12b8)}
.kmmapmk>img.kmglw,.kmemark>img.kmglw{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;object-position:50% 100%;z-index:0;filter:brightness(0) drop-shadow(0 0 1.5px var(--dh)) drop-shadow(0 0 4px var(--dh)) drop-shadow(0 0 9px var(--dh)) drop-shadow(0 0 16px var(--dh))}
.kmemark>img{display:block;width:100%;height:100%;object-fit:contain;object-position:50% 100%;transform-origin:50% 100%}
.kesme .kesfi{position:relative}
/* owner 16/11 (face-sharp): only this small mark moves (own layer), never the figure (KIT motion rule STILL PEOPLE).
   owner 17/11 07:00Z/07:15Z (map-me-mark): BRIGHTER static glow (white core + 3 gold halos, no animated filter = perf ≤ live) and a livelier loop:
   a squash-and-bounce — rises, DROPS fast with a squash on landing, small rebound, settles, then rises again. Travel 11 px, squash scaleY .84 / scaleX 1.1,
   transform only, 2.6 s. Reduced motion / Hiệu ứng Gọn (OPT.fxon false): kmmMotion() drops .kmmove → still mark, same glow. */
@media (prefers-reduced-motion:no-preference){.kmemark.kmmove>img{animation:kmmBob 2.6s linear infinite;will-change:transform}}
@keyframes kmmBob{
 0%{transform:translateY(-11px) scale(.98,1.03);animation-timing-function:cubic-bezier(.5,0,.9,.6)}
 22%{transform:translateY(0) scale(1.1,.84);animation-timing-function:cubic-bezier(.2,.7,.3,1)}
 34%{transform:translateY(-5px) scale(.98,1.03);animation-timing-function:cubic-bezier(.5,0,.9,.6)}
 46%{transform:translateY(0) scale(1.04,.94);animation-timing-function:cubic-bezier(.3,.6,.4,1)}
 58%{transform:translateY(-1.5px) scale(1,1);animation-timing-function:ease-in-out}
 78%{transform:translateY(-6px) scale(.99,1.02);animation-timing-function:ease-in-out}
 100%{transform:translateY(-11px) scale(.98,1.03)}}
`;document.head.appendChild(st)})();
/* ---------- markers are items: promotion gives the new rank's marker; the rank chest shows it ---------- */
let kmmLast=null;
function kmmCheck(){try{if(!S||S.dead)return;const r=kmmRankNow();if(r==null)return;const had=Array.isArray(S.meMarks)?S.meMarks.slice():null;kmmOwned();
 if(had&&!had.includes(r)){kmmLast=r;if(S.meMark!=null&&S.meMark<r)S.meMark=null}}catch(e){}}
(function(){if(typeof render!=="function")return;const r0=render;render=function(){kmmCheck();return r0.apply(this,arguments)}})();
/* review/gift-chest (jrankset): the rank chest is kitReward({kind:"chest",title:"Phẩm phục …"}); add that rank's marker to its items.
   When jrankset is absent the marker is still owned (no chest of its own). */
(function(){if(typeof kitReward!=="function")return;const k0=kitReward;kitReward=function(o){try{if(o&&o.kind==="chest"&&/^Phẩm phục/.test(o.title||"")&&Array.isArray(o.items)){
  const r=kmmLast!=null?kmmLast:kmmRankNow();if(r!=null&&!o.items.some(x=>x&&x.mme!=null)){o.items=o.items.concat([{n:`Dấu ấn: ${KMM_NAMES[r]}`,d:"Dấu trên đầu ngươi, cho biết ngươi đứng ở đâu",img:kmmSrc(r),tier:Math.min(4,1+(r>>1)),mme:r}]);kmmLast=null}}}catch(e){}
 return k0.apply(this,arguments)}})();
/* ---------- Tư trang: "Dấu ấn" tab ---------- */
try{if(typeof KINV_CATS!=="undefined"&&!KINV_CATS.some(c=>c[0]==="dau"))KINV_CATS.push(["dau","Dấu ấn",[]])}catch(e){}
(function(){if(typeof kinvItems!=="function")return;const k0=kinvItems;kinvItems=function(){const L=k0.apply(this,arguments);try{const cur=kmmCur();
  for(const r of kmmOwned())L.push({id:"mme"+r,cat:"dau",mme:r,src:kmmSrc(r),src512:kmmSrc(r),name:KMM_NAMES[r],grade:Math.min(4,r>>1),qty:1,on:r===cur,onText:"Đang mặc",lux:0,
   tip:`Dấu ấn ${RANKS[r]?RANKS[r].n:""}${r===cur?" · đang dùng":""}`})}catch(e){}return L}})();
(function(){if(typeof kinvOpen!=="function")return;const o0=kinvOpen;kinvOpen=function(x){if(!x||x.mme==null)return o0.apply(this,arguments);try{const r=x.mme,on=r===kmmCur();
  kitModal({kind:"info",title:KMM_NAMES[r],sub:`Dấu ấn · ${RANKS[r]?RANKS[r].n:""}`,itemPic:kitItem({src:x.src,name:"",grade:x.grade,size:"lg"}).replace('<span class="kitn"></span>',''),
   html:`${kitFacts([`Được ban khi lên ${RANKS[r]?RANKS[r].n:""}.`,on?"Ngươi đang dùng dấu này.":"Dấu hiện trên đầu ngươi ở mọi cảnh, để biết ngươi đứng ở đâu."])}`+
    (on?"":`<div class="rbtn kinvacts">${pbtn(`data-kmmuse="${r}"`,"Dùng","thành: dấu này hiện trên đầu ngươi","")}</div>`),btn:"Lui"})}catch(e){console.error("kmm open",e)}}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kmmuse]");if(!b)return;e.stopPropagation();e.preventDefault();
 const r=+b.dataset.kmmuse;try{closeModal()}catch(x){}if(window.kitMeMarkUse(r)){try{render()}catch(x){}}},true);
