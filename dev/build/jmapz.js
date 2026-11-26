/* ================= jmapz: DƯ ĐỒ — ONE SHORT LINE PER TAG + ZONES (ZOOM/FOG) + DƯỠNG TÚ VIỆN + SECOND LEVEL OF CÀN NINH / ĐỨC THỌ (KIT §85.10) =================
   Owner OD 25/11 ~23:45Z (verbatim): "Chữ quá nhiều ở trên cái dư đồ này, cần phải coi cái cách sắp xếp lại hay là gom. Tôi đã từng nói bạn phải gom lại
   rồi mà, tức là những cái khu nào giống nhau là mình nên gom lại như thế nào đó mà." + her 18/11 rulings (OD ~19:25Z L1898 zones: total bóng on the zone,
   tap = zoom in, fog over the rest; ~19:40Z Đông cung NOT grouped; ~19:45Z consort palaces keep their own names, no Đông/Tây lục cung layer).
   (0) every tag = name + one short count. (1) ZONES of similar common places: ONE kit map tag "<zone> · N bóng" (N = Σ members, countAt);
       members' own tags hidden on the overview; her own place / the place she stands on stay out (her mark stays visible).
   (2) TAP A ZONE → the same Dư đồ zooms onto the zone (FLIP, kit pace; reduced motion = instant), the rest under ONE kit fog layer (.kmfog: light by day,
       dark at night); inside, every member shows its own tag with all its rules. Back = tap the fog / the rail back button «Về toàn cảnh Dư đồ».
   (a) Càn Ninh (Hoàng hậu) and Đức Thọ (Thái hậu) open the courtyard (jpm kitPalaceMap) with Chính điện / Đông phối điện / Tây phối điện while
       she may walk in; each hall: "N bóng người" (people she meets = map count) + "K cung nhân" = that household's servants the ONE ledger
       (S.roster, j95) puts there NOW, by what the record says they do. Counts only.
   (b) HER palace: the servants' row names HER people where the ledger puts them now (in the palace / away "(ở <place>)").
   Wraps only (mapHTML, mapFit, j77Tap, kplBack, places, mapPos, mapSpots, kpmParts, kpmDir, kpmArt, kpmSplit, kitPalaceMap, renderStage). */
/* ================= (0) ONE SHORT LINE PER TAG (owner 25/11 ~23:45Z "Chữ quá nhiều ở trên cái dư đồ này", shot k17: «… bóng · đang cấm túc (2 tháng)» on ~15 tags)
   Every place tag on the Dư đồ = its name + ONE short count («N bóng»), nothing else: no walk khắc, no repeated status («đang cấm túc», «hết khắc»,
   «đóng cửa tối», «bái kiến» …). The grey look + lock still say "not now"; the reason, the walk khắc and who lives there stay in the tag's title and
   in the card her tap opens (j77). The tag of the place SHE stands on keeps its KIT §41.2 line («Ta + N bóng · còn K khắc», owner pick 17/11);
   an empty palace keeps only its name; Ngoại triều keeps its own short line. Runs on every map that uses mapHTML (palace Dư đồ, all zooms). */
function mapzTrimMeta(h){try{if(h.indexOf('class="mspot')<0)return h;const t=document.createElement("template");t.innerHTML=h;let ch=0;
 for(const s of t.content.querySelectorAll(".mspot")){if(s.classList.contains("here")||s.classList.contains("empty")||s.classList.contains("mzone"))continue;const m=s.querySelector(":scope>.mmeta");if(!m)continue;
  const x=/^\s*(\d+)\s*bóng/.exec(m.textContent||"");const want=x?`${x[1]} bóng`:"";if(m.textContent===want&&!m.children.length)continue;ch=1;if(want)m.textContent=want;else m.remove()}
 return ch?t.innerHTML:h}catch(e){console.error("jmapz trim",e);return h}}
(function(){const m0=mapHTML;mapHTML=function(){return mapzTrimMeta(m0.apply(this,arguments))}})();
/* ================= Dưỡng Tú viện: a real place (law 6 real world; owner OD 24/11 ~07:55Z name «Dưỡng Tú viện», tú nữ lodging, not a cung; 18/11 ~19:45Z
   "chỗ cho tú nữ học ... bỏ qua chỗ khác cũng được" → no palace of its own: the walled lodging court of long halls south of Tân Giả khố / Nội vụ phủ, in the Nội vụ zone).
   Picture: its own painting = the Tiền sảnh hall (Foreman C c3-dtv): img/duong-tu-vien.webp (base, also the fallback) + 12 day variants duong-tu-vien-<xuan|ha|thu|dong>-<sang|trua|chieu>.webp (open by day, no -toi). No stand-in is reachable (owner OD 25/11 ~23:15Z). */
const MAPZ_DTV={k:"dtv",n:"Dưỡng Tú viện",fn:"nơi tú nữ ở và học quy củ trong kỳ tuyển tú",d:"Mấy dãy nhà dài quanh một khoảng sân; mùa tuyển tú, ma ma giáo dưỡng dạy tú nữ quy củ ở tiền sảnh.",box:{x:.215,y:.61,w:.1,h:.14},anchor:{x:.265,y:.68},pos:[2,-1]};
(function(){try{const D=MAPZ_DTV;PLNAME[D.k]=[D.n,D.fn];if(typeof MAPH==="object"&&MAPH.places&&!MAPH.places[D.k])MAPH.places[D.k]={box:D.box,anchor:D.anchor};if(typeof ACC_DAY==="object")ACC_DAY[D.k]=1;
 if(typeof SCIMG==="object")SCIMG["plx-"+D.k]="duong-tu-vien";
 if(typeof SCN_HAVE==="object")["xuan","ha","thu","dong"].forEach(s=>["sang","trua","chieu"].forEach(t=>{SCN_HAVE["duong-tu-vien-"+s+"-"+t]=1}));
 {const F=window.KIT_FLOOR=window.KIT_FLOOR||{},A=window.KIT_FANCHOR=window.KIT_FANCHOR||{};if(F["duong-tu-vien"]==null)F["duong-tu-vien"]=.6;if(!A["duong-tu-vien"])A["duong-tu-vien"]={x:.5,feet:.9}}
 const p0=places;places=function(){const L=p0.apply(this,arguments);try{if(Array.isArray(L)&&!L.some(x=>x.k===D.k)&&!(typeof adSrv==="function"&&adSrv()))L.push({k:D.k,n:D.n,fn:D.fn,d:D.d,sc:"plx-"+D.k})}catch(e){}return L};
 const m0=mapPos;mapPos=function(k){return k===D.k?D.pos:m0.apply(this,arguments)};
 const s0=mapSpots;mapSpots=function(){const L=s0.apply(this,arguments);try{for(const s of L)if(s&&s.k===D.k){s.small=true;s.fn=D.fn}}catch(e){}return L};
}catch(e){console.error("jmapz dtv",e)}})();
/* ================= (1)+(2) DƯ ĐỒ ZONES + ZOOM/FOG (review/map-zones 5692c687 sections 1-2, restored; zones re-cut per the 18/11 ~19:40Z/~19:45Z rulings) ================= */
/* the zones (owner 25/11 ~23:45Z "những cái khu nào giống nhau là mình nên gom lại" + 18/11 ~19:25Z; NOT grouped, 18/11 ~19:40Z/~19:45Z:
   every consort palace (her own included), Càn Ninh, Đức Thọ, Dưỡng Hòa, Cần Chính, Đông cung, Ngự hoa viên, Thái y viện, Kính sự phòng, Ngoại triều).
   Members are neighbours on the painting (the zoom box stays small). */
const MAPZ_ZONES=[
 {id:"nv",n:"Nội vụ",fn:"các ty Nội vụ phủ coi: cung nhân ở, làm việc, chịu phạt; tú nữ ở Dưỡng Tú viện",ic:"place-cnh",keys:["nvp","tgk","cnh","dtv"]},
 {id:"ht",n:"Hoàng tử sở",fn:"nơi các hoàng tử ở và học",ic:"place-acs",keys:["acs","ttp"]}];
/* KIT §85.10 values (one place): zone box padding (fraction of the map), fill of the free area at zoom, fog feather, motion */
const KIT_MAPZ={pad:.025,fill:.9,feather:.3,ms:460,ease:"cubic-bezier(.33,0,.2,1)"};
function mapzEast(){return PALN.slice(0,8)}
function mapzWest(){return PALN.slice(8)}
/* zone of a plan key / an empty palace name */
function mapzZoneOf(k,name){try{let nm=name||null;if(k&&/^r\d+$/.test(k)){const i=palSlot(k);if(i!=null)nm=PALN[i]}else if(k==="home"&&S.pal!=null)nm=PALN[S.pal];
  for(const Z of MAPZ_ZONES){if(k&&Z.keys.includes(k))return Z;if(nm&&((Z.pal==="east"&&mapzEast().includes(nm))||(Z.pal==="west"&&mapzWest().includes(nm))))return Z}}catch(e){}return null}
/* her own places: never hidden inside a zone on the overview */
function mapzMine(){const M=new Set(["home"]);try{if(S.place)M.add(S.place);M.add(palaceOf(S));const r=typeof resMeHoused==="function"&&resMeHoused();if(r&&r.head)M.add(palaceOf(r.head))}catch(e){}return M}
/* the zone box on the map (fractions): union of its members' plan boxes + padding */
function mapzBox(Z){const B=[];try{for(const k of Z.keys){const p=MAPH.places[k];if(p&&p.box)B.push(p.box)}
  const N=Z.pal==="east"?mapzEast():Z.pal==="west"?mapzWest():[];for(const s of MAPH.rivalSlots)if(N.includes(s.name))B.push(s.box)}catch(e){}
 if(!B.length)return null;const P=KIT_MAPZ.pad;const x0=Math.max(0,Math.min(...B.map(b=>b.x))-P),y0=Math.max(0,Math.min(...B.map(b=>b.y))-P),x1=Math.min(1,Math.max(...B.map(b=>b.x+b.w))+P),y1=Math.min(1,Math.max(...B.map(b=>b.y+b.h))+P);
 return{x:x0,y:y0,w:x1-x0,h:y1-y0}}
/* the fog hole = the zone box with a soft edge (KIT_MAPZ.feather x the box size, outside it) */
function mapzFogVars(b){const f=KIT_MAPZ.feather,p=v=>(v*100).toFixed(2)+"%";return `--x0:${p(b.x)};--x1:${p(b.x+b.w)};--y0:${p(b.y)};--y1:${p(b.y+b.h)};--fx0:${p(b.x-b.w*f/2)};--fx1:${p(b.x+b.w*(1+f/2))};--fy0:${p(b.y-b.h*f/2)};--fy1:${p(b.y+b.h*(1+f/2))}`}
function mapzById(id){return MAPZ_ZONES.find(z=>z.id===id)||null}
function mapzOn(){try{return !!(typeof S!=="undefined"&&S&&!S.dead&&!window.__mapList&&!window.__kpm&&!(typeof adSrv==="function"&&adSrv()))}catch(e){return false}}
function mapzCur(){const Z=window.__mapZone&&mapzById(window.__mapZone);return Z&&mapzOn()?Z:null}
/* ---------- (1)+(2) the overview / zoomed HTML ---------- */
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(!mapzOn()||h.indexOf('class="mapv')<0||h.indexOf("kpmv")>=0)return h;
 try{const cur=mapzCur();const mine=mapzMine();const tot={},hap={},has={},open_={};
  h=h.replace(/<(button|div) class="mspot([^"]*)"([^>]*)>/g,(all,tag,cls,attr)=>{const g=/data-(?:go|ak)="([^"]+)"/.exec(attr),t=/title="([^":]+):/.exec(attr);const k=g?g[1]:null;
   const Z=mapzZoneOf(k,!k&&t?t[1].trim():null);let hide=false;
   if(cur){hide=!Z||Z.id!==cur.id}else if(Z&&!(k&&mine.has(k))){hide=true;has[Z.id]=1;if(!/\bmgrey\b/.test(cls))open_[Z.id]=1;if(k)try{tot[Z.id]=(tot[Z.id]||0)+countAt(k)}catch(e){}}
   return `<${tag} class="mspot${cls}${hide?" mzh":""}"${Z?` data-zn="${Z.id}"`:""}${attr}>`});
  /* a "!" happening on a hidden member shows on its zone tag (KIT 78.x: the player must still see it) */
  if(!cur)h.replace(/<(?:button|div) class="mspot[^"]* mzh" data-zn="([^"]+)"(?:(?!<(?:button|div) class="mspot)[\s\S])*?class="khap"/g,(a,z)=>{hap[z]=1});
  const zt=cur?"":MAPZ_ZONES.filter(Z=>has[Z.id]).map(Z=>{const b=mapzBox(Z);if(!b)return"";const n=tot[Z.id]||0;const icn=typeof ic==="function"?ic(Z.ic,14).replace('class="ic"','class="ic kplic"'):"";
    return `<button class="mspot mzone${open_[Z.id]?"":" mgrey"}" data-zone="${Z.id}" title="${Z.n}: ${Z.fn}${n?` · ${n} bóng`:""} · chạm để xem gần" aria-label="${Z.n}, ${n?n+" bóng":"vắng"}, chạm để xem gần" style="left:${b.x*100}%;top:${b.y*100}%;width:${b.w*100}%;height:${b.h*100}%"><span class="mlab">${icn}${Z.n}${hap[Z.id]&&typeof kitHapMark==="function"?`<i class="khap" role="img" aria-label="Có chuyện buổi này" title="Có chuyện buổi này">!</i>`:""}</span><span class="mmeta">${n?`${n} bóng`:"vắng"}</span></button>`}).join("");
  /* zone tags go right after the picture (under the place tags in paint order); the fog sits there in zoom mode */
  const b=cur&&mapzBox(cur);const fog=cur&&b?`<div class="kmfog" data-mzback="fog" aria-hidden="true" style="${mapzFogVars(b)}"></div>`:"";
  h=h.replace(/(<img class="mapimg"[^>]*>)/,"$1"+fog+zt);
  if(cur){h=h.replace(/<div class="mapv/,`<div data-mz="${cur.id}" class="mapv`);
   h=h.replace(/<div class="maptools">/,`<div class="maptools" data-mzn="${cur.n}">`)}}catch(e){console.error("jmapz map",e)}
 return h}})();
/* ---------- the zoom: mapFit fits the zone into the free area once on entry, centred; +/− keep working from there ---------- */
(function(){const f0=mapFit;mapFit=function(){const Z=mapzCur();const sc=document.querySelector(".game.maptab .mapsc");const w=sc&&sc.querySelector(".mapw");
 /* first a normal fit (it lays out the card rows and sets the real margins), then the zone zoom from those margins */
 if(Z&&w&&window.__mapZoneDo){try{f0.apply(this,arguments);const b=mapzBox(Z),img=sc.querySelector(".mapimg"),cs=getComputedStyle(w);const mL=parseFloat(cs.marginLeft)||0,mR=parseFloat(cs.marginRight)||0,mT=parseFloat(cs.marginTop)||0,mB=parseFloat(cs.marginBottom)||0;
   const asp=img&&img.naturalWidth?img.naturalWidth/img.naturalHeight:1.792,cw=Math.max(1,sc.clientWidth),aw=Math.max(120,cw-mL-mR),ah=Math.max(120,sc.clientHeight-mT-mB);
   const W=Math.min(aw*KIT_MAPZ.fill/b.w,ah*KIT_MAPZ.fill*asp/b.h);window.__mapZ=Math.min(W/cw,(window.__mapFit||1)+2.5)}catch(e){}}
 const r=f0.apply(this,arguments);
 if(Z&&w&&window.__mapZoneDo){try{const b=mapzBox(Z),cs=getComputedStyle(w),mL=parseFloat(cs.marginLeft)||0,mR=parseFloat(cs.marginRight)||0,mT=parseFloat(cs.marginTop)||0,mB=parseFloat(cs.marginBottom)||0;
   const wr=w.getBoundingClientRect(),sr=sc.getBoundingClientRect();const cx=sr.left+mL+(sc.clientWidth-mL-mR)/2,cy=sr.top+mT+(sc.clientHeight-mT-mB)/2;
   sc.scrollLeft+=wr.left+(b.x+b.w/2)*wr.width-cx;sc.scrollTop+=wr.top+(b.y+b.h/2)*wr.height-cy;window.__mapPos2=[sc.scrollLeft,sc.scrollTop]}catch(e){}}
 try{if(w&&!Z)mapzNudge(w)}catch(e){}
 return r}})();
/* a zone tag never sits under another tag or her rank crest (.kmmapmk is outside the .mlab box mapFit tests): move it to the nearest free spot inside its own zone */
function mapzNudge(w){const vis=e=>e&&e.offsetWidth&&getComputedStyle(e).display!=="none";const rect=e=>e.getBoundingClientRect();
 const boxOf=s=>{const R=[...s.querySelectorAll(".mlab,.mmeta")].map(rect).filter(r=>r.width>0);return R.length?{l:Math.min(...R.map(r=>r.left)),t:Math.min(...R.map(r=>r.top)),r:Math.max(...R.map(r=>r.right)),b:Math.max(...R.map(r=>r.bottom))}:null};
 const ov=(a,b)=>Math.max(0,Math.min(a.r,b.r)-Math.max(a.l,b.l))*Math.max(0,Math.min(a.b,b.b)-Math.max(a.t,b.t));
 for(const z of w.querySelectorAll(".mspot.mzone")){if(!vis(z))continue;z.style.translate="";const zr=rect(z);
  const obs=[...w.querySelectorAll(".mspot:not(.mzone)")].filter(vis).map(boxOf).filter(Boolean).concat([...w.querySelectorAll(".kmmapmk,.mspot:not(.mzone) .khap")].filter(e=>e.offsetWidth).map(rect).map(r=>({l:r.left,t:r.top,r:r.right,b:r.bottom})));
  const cost=(dx,dy)=>{z.style.translate=dx+"px "+dy+"px";const b=boxOf(z);if(!b)return 0;const out=b.l<zr.left||b.r>zr.right||b.t<zr.top||b.b>zr.bottom;return obs.reduce((t,o)=>t+ov(b,o),0)+(out?1e6:0)};
  if(cost(0,0)<1){z.style.translate="";continue}let best=[0,0],bs=1e18;
  for(let r=8;r<=240&&bs>=1;r+=8)for(let k=0;k<16;k++){const t=k*Math.PI/8,dx=Math.round(r*Math.cos(t)),dy=Math.round(r*Math.sin(t)),c=cost(dx,dy);if(c<bs){bs=c;best=[dx,dy]}if(bs<1)break}
  z.style.translate=best[0]||best[1]?best[0]+"px "+best[1]+"px":""}}
/* ---------- enter / leave (FLIP: the new view starts from the old map box and eases into place) ---------- */
function mapzGo(id){const sc=document.querySelector(".game.maptab .mapsc"),w0=sc&&sc.querySelector(".mapw");const r0=w0?w0.getBoundingClientRect():null;
 if(id){window.__mapZprev=window.__mapZ||0;window.__mapZone=id;window.__mapZoneNew=1}else{window.__mapZone=null;window.__mapZoneNew=0;window.__mapZ=window.__mapZprev||0;window.__mapKey2=null}
 render();
 /* the zone fit runs once AFTER the whole render chain (the card rows / side column and their margins exist only then) */
 if(id){window.__mapZoneDo=1;try{mapFit()}finally{window.__mapZoneDo=0;window.__mapZoneNew=0}}
 try{if(!r0||(typeof reducedMotion==="function"&&reducedMotion()))return;const w=document.querySelector(".game.maptab .mapsc .mapw");if(!w)return;const r1=w.getBoundingClientRect();if(!r1.width)return;
  const s=r0.width/r1.width;w.style.transformOrigin="0 0";w.style.transition="none";w.style.transform=`translate(${r0.left-r1.left}px,${r0.top-r1.top}px) scale(${s})`;void w.offsetWidth;
  const ms=typeof kitPace==="function"?kitPace(KIT_MAPZ.ms):KIT_MAPZ.ms;w.style.transition=`transform ${ms}ms ${KIT_MAPZ.ease}`;w.style.transform="";setTimeout(()=>{try{w.style.transition="";w.style.transformOrigin=""}catch(e){}},ms+40)}catch(e){}}
/* a zone tag is a .mspot (kit tag): the ONE map tap rule (j77, capture) hands it to j77Tap(null, label) — the label names the zone */
(function(){if(typeof j77Tap!=="function")return;const t0=j77Tap;j77Tap=function(k,empty){try{if(!k&&empty&&mapzOn()&&!mapzCur()){const nm=String(empty).replace(/!/g,"").trim();const Z=MAPZ_ZONES.find(z=>z.n===nm);if(Z)return mapzGo(Z.id)}}catch(e){console.error(e)}return t0.apply(this,arguments)}})();
window.addEventListener("click",e=>{try{if(!S||typeof tab==="undefined"||tab!=="go")return;
 const Z=mapzCur();if(!Z)return;
 /* tap outside the zone (fog or sky) = back; a tap inside the bright zone that is not on a tag does nothing */
 if(e.target.closest(".mspot,.maptools,#kshR,#krail,.kbackb"))return;const sc=e.target.closest("#panel .mapv[data-mz] .mapsc");if(!sc)return;const w=sc.querySelector(".mapw");const b=mapzBox(Z);if(!w||!b)return;const r=w.getBoundingClientRect();
 const fx=(e.clientX-r.left)/r.width,fy=(e.clientY-r.top)/r.height;if(fx>=b.x&&fx<=b.x+b.w&&fy>=b.y&&fy<=b.y+b.h)return;e.preventDefault();e.stopImmediatePropagation();mapzGo(null)}catch(err){console.error(err)}},true);
/* the way back = the ONE kit back button of the left rail (KIT 33.11, jplfs kplBack): zone → overview; courtyard → its zone (as before → Dư đồ) */
(function(){if(typeof kplBack!=="function")return;const b0=kplBack;kplBack=function(){try{if(typeof tab!=="undefined"&&tab==="go"&&!window.__kpm&&mapzCur())return{t:"Về toàn cảnh Dư đồ",go:()=>mapzGo(null)}}catch(e){}return b0.apply(this,arguments)}})();
/* leaving the Dư đồ by the tab bar ends the zone view; the list view too */
document.addEventListener("click",e=>{const t=e.target.closest("#tabs [data-tab],button[data-tab]");if(t&&t.dataset.tab!=="go"){window.__mapZone=null;window.__mapZoneNew=0}},true);
document.addEventListener("click",e=>{if(e.target.closest("[data-maplist]")){window.__mapZone=null;window.__mapZoneNew=0}},true);
(function(){const s0=start;start=function(){window.__mapZone=null;return s0.apply(this,arguments)}})();
/* ---------- kit CSS: zone tag state + fog layer (KIT §85.10) ---------- */
(function(){const st=document.createElement("style");st.textContent=`
.mapw .mspot.mzh{display:none!important}
.mapw .mspot.mzone{z-index:0;cursor:zoom-in}
.mapw .mspot.mzone .mlab{font-size:1.06em;letter-spacing:.04em}
.mapw .kmfog{position:absolute;inset:0;z-index:0;pointer-events:auto;cursor:zoom-out;
 background:radial-gradient(ellipse 22% 16% at 18% 22%,var(--fg2),#0000),radial-gradient(ellipse 26% 18% at 78% 74%,var(--fg2),#0000),radial-gradient(ellipse 20% 14% at 60% 12%,var(--fg2),#0000),var(--fg1);
 --fg1:#f2ead8d6;--fg2:#fffaf0a8;
 -webkit-mask:linear-gradient(90deg,#000 var(--fx0),#0000 var(--x0),#0000 var(--x1),#000 var(--fx1)),linear-gradient(#000 var(--fy0),#0000 var(--y0),#0000 var(--y1),#000 var(--fy1));
 mask:linear-gradient(90deg,#000 var(--fx0),#0000 var(--x0),#0000 var(--x1),#000 var(--fx1)),linear-gradient(#000 var(--fy0),#0000 var(--y0),#0000 var(--y1),#000 var(--fy1));
 animation:kmfogIn ${KIT_MAPZ.ms}ms ease-out both}
.mapv[data-sky~=night] .mapw .kmfog{--fg1:#0a1330cc;--fg2:#1a2448a0}
@keyframes kmfogIn{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.mapw .kmfog{animation:none}}
html .game .mapv[data-mz]>.maptools[data-mzn]::before{content:attr(data-mzn)!important;width:auto!important;padding:0 16px;letter-spacing:.06em!important;white-space:nowrap}
`;document.head.appendChild(st)})();
/* ================= (3) SECOND LEVEL: Càn Ninh (Hoàng hậu) + Đức Thọ (Thái hậu) ================= */
/* plaque names of the new halls (jhall pattern: chính = 2 chars + điện; Đông = + hiên; Tây = + trai; unique in the table) */
try{if(typeof HALL_PN==="object"){HALL_PN["Càn Ninh cung"]=["Mẫu Nghi điện","Khôn Hòa hiên","Thục Thận trai"];HALL_PN["Đức Thọ cung"]=["Từ Khang điện","Di Xuân hiên","An Thọ trai"]}}catch(e){}
/* the record's activity → the hall it happens in (ACT95 codes, j95) */
const MAPZ_ACTHALL={serve:"chinh",attend:"chinh",receive:"chinh",greet:"chinh",visit:"chinh",watch:"chinh",audience:"chinh",follow:"chinh",here:"chinh",provoke:"chinh",
 clean:"dong",brew:"dong",work:"dong",book:"dong",laundry:"dong",oversee:"dong",
 rest:"tay",sleep:"tay",nap:"tay",eat:"tay",offduty:"tay",read:"tay",pray:"tay"};
function mapzHallOfAct(a){if(/^ag_/.test(a||""))return"tay";/* her own deed (jagday/jagstaff: embroidery, errands of her own) = in the servants' rooms */return MAPZ_ACTHALL[a]||"chinh"}
/* the household of a palace key: [ledger ids of its servants] (Hoàng hậu: her staff + trusted maid; Thái hậu: her household; her own: S.staff + S.maid) */
function mapzHousehold(k){const L=[];try{
 if(k==="kn"){const q=rivals.find(v=>v.queen&&v.alive&&!v.out);if(q){if(q.maid&&q.maid.name)L.push(["mm:"+q.id,q.maid.name]);for(const s of q.staff||[])if(s&&s.sid!=null)L.push(["s"+s.sid,s.name])}}
 else if(k==="tn"){if(!S.thDead)for(const s of (S.thO&&S.thO.staff)||[])if(s&&s.sid!=null)L.push(["s"+s.sid,s.name])}
 else if(k==="home"){if(S.maid&&S.maid.name&&!(typeof isSrv==="function"&&isSrv()))L.push(["mm:me",S.maid.name]);for(const s of S.staff||[])if(s&&s.sid!=null)L.push(["s"+s.sid,s.name])}}catch(e){}return L}
/* where each of them is NOW in the ONE ledger (S.roster): {in:{chinh:[],dong:[],tay:[]},away:[[name,placeKey,why]]}; null when the record is off */
function mapzStaffNow(k){try{const R=S&&S.roster;if(!R||!R.P||(typeof j95key==="function"&&R.key!==j95key()))return null;const kh=typeof j95kh==="function"?j95kh():0;const O={in:{chinh:[],dong:[],tay:[]},away:[],n:0};
 for(const [id,name] of mapzHousehold(k)){const e=R.P[id]&&R.P[id][kh];if(!e)continue;O.n++;if(e[0]===k)O.in[mapzHallOfAct(e[1])].push([name,e[1]]);else O.away.push([name,e[0],e[3]||""])}return O}catch(e){return null}}
function mapzPlaceName(k){try{if(k==="home")return S.pal!=null?PALN[S.pal]:HOMEN;if(typeof J95OUT_!=="undefined"&&k===J95OUT_)return"ngoài cung";return palName(k)}catch(e){return k||""}}
/* jpm hooks: Càn Ninh and Đức Thọ get the three painted halls (Đức Thọ: the Càn Ninh courtyard as a 'tạm' stand-in until its own painting exists — ART REQUEST) */
if(typeof kpmParts==="function"){
 /* only while she may walk in now: a locked / out-of-khắc Càn Ninh or Đức Thọ keeps the one-hall tap = the place card with «Lẻn vào» / walk-spill (OD 18/11 ~19:15Z, L1417) */
 const mapzOpenNow=k=>{try{const st=accState(k);return !(st&&st.why&&!st.here)}catch(e){return true}};
 const pp0=kpmParts;kpmParts=function(slot,k,nm){if((slot==="kn"||slot==="p:tn")&&mapzOpenNow(slot==="kn"?"kn":"tn")){const n=slot==="kn"?"Càn Ninh cung":"Đức Thọ cung";return KPM_PARTS.map(x=>[x[0],hallName(n,x[0])])}return pp0.apply(this,arguments)};
 const pd0=kpmDir;kpmDir=function(slot){if(slot==="p:tn")return S&&!S.thDead?"nhat-can-ninh":null;return pd0.apply(this,arguments)};
 const pa0=kpmArt;kpmArt=function(slot){const A=pa0.apply(this,arguments);if(A&&slot==="p:tn")A.tam=true;return A};
 const ps0=kpmSplit;kpmSplit=function(k){const O=ps0.apply(this,arguments);try{if(k==="kn"||k==="tn"){/* guests stay in the chính điện (as before); the household by what the record says they do */
   const N=mapzStaffNow(k);if(N){for(const h of ["chinh","dong","tay"]){O[h].srv=N.in[h].length}O.away=N.away.length;O.hh=N.n}
}}catch(e){}return O};
 const pm0=kitPalaceMap;kitPalaceMap=function(o){let h=pm0.apply(this,arguments);try{const k=o.k;const mh=typeof kpmMine==="function"?kpmMine(o.slot):null;if(k!=="kn"&&k!=="tn"&&k!=="home"&&!mh)return h;
   if(k==="home"||mh){/* her people, by name, where the record puts them now */const N=mapzStaffNow("home");if(!N)return h;
    const inL=[].concat(N.in.chinh,N.in.dong,N.in.tay).map(x=>x[0]);const away=N.away.map(([n,pk])=>`${n} (ở ${mapzPlaceName(pk)})`);
    const line=`<span class="kpm-rs kpm-who">${inL.length?"Trong cung: "+inL.join(", "):"Không ai ở trong cung"}${away.length?` · Đi vắng: ${away.join(", ")}`:""}</span>`;
    const rp=k==="home"&&!mh?"cungnhan":mh;h=h.replace(new RegExp('(<button class="btn kpm-row[^"]*" data-kpmpart="'+rp+'">[\\s\\S]*?)(</button>)'),(a,x,y)=>x+line+y);
    return h}
   const SP=kpmSplit(k);const add=(t,n)=>/^vắng/.test(t)?`${n} cung nhân`:`${t} · ${n} cung nhân`;
   for(const part of ["chinh","dong","tay"]){const n=(SP[part]&&SP[part].srv)||0;if(!n)continue;
    h=h.replace(new RegExp(`(data-go="kpm:${part}"[^>]*><span class="mlab">[^<]*<i>)([^<]*)(</i>)`),(a,x,t,y)=>x+add(t,n)+y);
    h=h.replace(new RegExp(`(data-kpmpart="${part}"><b class="kpm-rn">[^<]*</b><span class="kpm-rs">)([^<]*)(</span>)`),(a,x,t,y)=>{const m=/^(.*?· )?(.*)$/.exec(t);return x+(m[1]||"")+add(m[2],n)+y})}
   if(SP.hh)h=h.replace(/(<button class="btn kpm-row[^"]*" data-kpmpart="chinh">[\s\S]*?)(<\/button>)/,(a,x,y)=>x+`<span class="kpm-rs kpm-who">Cung nhân: ${SP.hh-(SP.away||0)} trong cung${SP.away?` · ${SP.away} đi vắng`:""}</span>`+y)}catch(e){console.error("jmapz kpm",e)}return h};
}
/* the room line in a side hall of Càn Ninh / Đức Thọ: what the record says the household does there (the stage draws no household servants of other palaces, j95vis) */
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const h=typeof kpmHall==="function"&&kpmHall();if(!h||h.place||(h.k!=="kn"&&h.k!=="tn"))return r;
  const m=document.querySelector("#sc-t .rmsg");if(!m)return r;const N=mapzStaffNow(h.k);const n=N?N.in[h.part].length:0;const t=` · ${hallRole(h.part)}. ${n?`${n} cung nhân đang ${h.part==="dong"?"quét dọn, sắp đồ":h.part==="tay"?"nghỉ ngơi":"đứng hầu"} ở đây.`:"Không có ai ở đây."}`;if(m.textContent!==t){m.textContent=t;m.title=t}}catch(e){}return r}})();
/* kit sample page (KIT §85.10): zone tag + fog, day / night */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§85.10 khu Dư đồ",title:"DƯ ĐỒ ZONES · zone tag (same slip, one count) + fog layer day / night",where:"Dư đồ overview (zone tags Nội vụ, Hoàng tử sở) and zone zoom (fog over the rest)",html:()=>`<div style="display:flex;gap:10px;flex-wrap:wrap;max-width:460px">${["","night"].map(n=>`<div class="mapv" data-sky="${n}" style="position:relative;width:200px;height:120px;border-radius:6px;overflow:hidden;background:#cdbb97"><div class="mapw" style="position:absolute;inset:0;width:100%"><div class="kmfog" style="${mapzFogVars({x:.25,y:.3,w:.5,h:.4})};animation:none"></div><span class="mspot mzone" style="position:absolute;left:20%;top:30%;width:60%;height:40%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:0;background:none"><span class="mlab">Nội vụ</span><span class="mmeta">9 bóng</span></span></div></div>`).join("")}</div>`})}catch(e){}
/* ================= (5) EVERY MAP WAITS FOR ITS PAINTING + MARKS (MAIN 149 26/11, family of k4/k17; law: no code stand-in visible; KIT §85.11) =================
   On a slow / first load the Dư đồ showed the bare board, grey tag boxes and an EMPTY box for her mark for ~2.5 s. Now every map (.mapw: palace Dư đồ all zooms,
   courtyard level, home phủ / Kinh thành / garden maps) keeps its tags, mark and leader lines INVISIBLE (visibility only: the layout stays, mapFit still measures)
   until the painting (.mapimg) and every mark picture (.kmmapmk img) have loaded; meanwhile the map area shows the ONE kit wait cue (kitSpin + CTM_WAIT.picWait,
   KIT §59.3) in the middle. A picture that fails or hangs never blocks: after KIT_MAPWAIT.max ms the map shows as it is. */
const KIT_MAPWAIT={max:8000,fade:220};
function mapzWaitCheck(w){try{if(!w||!w.isConnected)return;const img=w.querySelector(":scope>.mapimg");if(!img&&!w.dataset.kmhold){w.classList.add("kmready");return}
 const lab0=(window.CTM_WAIT&&CTM_WAIT.picWait)||"Đang thỉnh tranh…";if(!img){if(!w.querySelector(":scope>.kmwait"))w.insertAdjacentHTML("beforeend",`<div class="kmwait" role="status">${typeof kitSpin==="function"?kitSpin({s:true,label:lab0}):""}<span>${lab0}</span></div>`);return}
 const pics=[img].concat([...w.querySelectorAll(".kmmapmk img")]);const done=i=>i.complete&&(i.naturalWidth>0||i!==img);
 const ok=pics.every(done)||(w.__kmT0&&Date.now()-w.__kmT0>KIT_MAPWAIT.max);
 if(ok){if(!w.classList.contains("kmready")){w.classList.add("kmready");const c=w.querySelector(":scope>.kmwait");if(c)c.remove()}return}
 if(!w.__kmT0){w.__kmT0=Date.now();setTimeout(()=>mapzWaitCheck(w),KIT_MAPWAIT.max+50)}
 if(!w.querySelector(":scope>.kmwait")){const lab=(window.CTM_WAIT&&CTM_WAIT.picWait)||"Đang thỉnh tranh…";w.insertAdjacentHTML("beforeend",`<div class="kmwait" role="status">${typeof kitSpin==="function"?kitSpin({s:true,label:lab}):""}<span>${lab}</span></div>`)}
 for(const i of pics)if(!done(i)&&!i.__kmL){i.__kmL=1;const f=()=>mapzWaitCheck(w);i.addEventListener("load",f);i.addEventListener("error",()=>setTimeout(f,60))}}catch(e){try{w.classList.add("kmready")}catch(x){}}}
function mapzWaitAll(){try{document.querySelectorAll(".mapw:not(.kmready)").forEach(mapzWaitCheck)}catch(e){}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);mapzWaitAll();return r}})();
try{new MutationObserver(()=>{if(document.querySelector(".mapw:not(.kmready)"))mapzWaitAll()}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
(function(){const st=document.createElement("style");st.id="kit-mapwait";st.textContent=`
.mapw:not(.kmready)>:not(.kmwait){visibility:hidden!important}
.mapw:not(.kmready)>.mapimg{opacity:0}
html body .game .mapv .mapsc>.mapw[data-kmhold]{margin:0!important;width:100%!important;flex:1 1 auto!important;align-self:stretch}
.mapw.kmready>.mapimg{animation:kmwaitIn ${KIT_MAPWAIT.fade}ms ease-out}
.mapw>.kmwait{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:70;display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:var(--k-card,#fffaf0);border:1px solid var(--k-hair,#e6d3ac);box-shadow:0 4px 14px rgba(60,30,10,.25);font:600 .82rem var(--k-font,inherit);color:var(--k-ink,#5a3a1a);pointer-events:none;white-space:nowrap}
@keyframes kmwaitIn{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.mapw.kmready>.mapimg{animation:none}}
`;document.head.appendChild(st)})();
