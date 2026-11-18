/* ================= jmapz: DƯ ĐỒ ZONES + ZOOM/FOG + SECOND LEVEL OF CÀN NINH / ĐỨC THỌ + HER PEOPLE WHERE THEY REALLY ARE =================
   Owner OD 18/11 ~19:25Z (verbatim in dev/OWNER_DECISIONS.md; extends OD L1409 courtyard level, L1316 one location ledger), KIT §85.10.
   (1) ZONES on the overview: common places are grouped; each zone = ONE kit map tag (same .mspot/.mlab/.mmeta slip) "<zone> · N bóng",
       N = the sum of the member places' counts (countAt, the one ledger) that are not shown on their own. Members' own tags are hidden on
       the overview. NOT grouped (own tags): Cần Chính điện, Càn Ninh cung, Đức Thọ cung, Dưỡng Hòa điện, Ngự hoa viên, Thái y viện,
       Ngoại triều, Kính sự phòng (geography: far from the other Nội vụ places, see reports/map-zones.md), HER residence and the place she
       stands in (pulled out of their zone so her mark stays on the overview).
   (2) TAP A ZONE → the SAME Dư đồ zooms/pans onto the zone (FLIP, kit pace, reduced motion = instant), the rest goes under ONE kit fog
       layer (.kmfog: soft spreading edge; light by day, dark in the buổi tối), inside the zone every place shows its own kit tag with all
       its rules (grey / lock / «Lẻn vào» / walk-spill, j41) — the tags are the same buttons, only shown. Back = tap outside the zone (fog or
       sky) or the kit back control «‹ Toàn cảnh» in the tools row (same .kpm-back button as the courtyard level). +/− still zoom.
   (3) SECOND LEVEL of Càn Ninh (Hoàng hậu) and Đức Thọ (Thái hậu): the courtyard map (jpm kitPalaceMap) with Chính điện / Đông phối điện /
       Tây phối điện; each hall: "N bóng" (people she meets, = the map count, as before) + "K cung nhân" = that household's servants the ONE
       ledger (S.roster, j95) puts in that palace NOW, split by what the record says they do (serve → chính điện, chores → Đông phối điện,
       rest/sleep/meal → Tây phối điện); those the record puts elsewhere = "K cung nhân đi vắng". Counts only (who is who is learned by going).
   (4) HER palace (Ngọc Thanh các / her granted palace / her side hall): the courtyard rows name HER servants where the record puts them now:
       in the palace (by what they do) or away "(ở <place>)" — a maid on an errand is not in her room (the stage already filters her, j95).
   Wraps only (mapHTML, mapFit, kpmParts, kpmDir, kpmArt, kpmSplit, kitPalaceMap); one new kit layer (.kmfog) + one tag state (.mzone). */
const MAPZ_ZONES=[
 {id:"dong",n:"Đông lục cung",fn:"các cung phi tần phía đông",ic:"place-cung",pal:"east",keys:["lc"]},
 {id:"tay",n:"Tây lục cung",fn:"các cung phi tần phía tây",ic:"place-cung",pal:"west",keys:[]},
 {id:"nv",n:"Nội vụ",fn:"các ty của Nội vụ phủ: nơi cung nhân ở và làm việc",ic:"place-cnh",keys:["nvp","tgk","cnh"]},
 {id:"ht",n:"Hoàng tử sở",fn:"nơi các hoàng tử ở và học",ic:"place-acs",keys:["dc","acs","ttp"]}];
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
 try{const cur=mapzCur();const mine=mapzMine();const tot={},hap={},has={};
  h=h.replace(/<(button|div) class="mspot([^"]*)"([^>]*)>/g,(all,tag,cls,attr)=>{const g=/data-(?:go|ak)="([^"]+)"/.exec(attr),t=/title="([^":]+):/.exec(attr);const k=g?g[1]:null;
   const Z=mapzZoneOf(k,!k&&t?t[1].trim():null);let hide=false;
   if(cur){hide=!Z||Z.id!==cur.id}else if(Z&&!(k&&mine.has(k))){hide=true;has[Z.id]=1;if(k)try{tot[Z.id]=(tot[Z.id]||0)+countAt(k)}catch(e){}}
   return `<${tag} class="mspot${cls}${hide?" mzh":""}"${Z?` data-zn="${Z.id}"`:""}${attr}>`});
  /* a "!" happening on a hidden member shows on its zone tag (KIT 78.x: the player must still see it) */
  if(!cur)h.replace(/<(?:button|div) class="mspot[^"]* mzh" data-zn="([^"]+)"(?:(?!<(?:button|div) class="mspot)[\s\S])*?class="khap"/g,(a,z)=>{hap[z]=1});
  const zt=cur?"":MAPZ_ZONES.filter(Z=>has[Z.id]).map(Z=>{const b=mapzBox(Z);if(!b)return"";const n=tot[Z.id]||0;const icn=typeof ic==="function"?ic(Z.ic,14).replace('class="ic"','class="ic kplic"'):"";
    return `<button class="mspot mzone" data-zone="${Z.id}" title="${Z.n}: ${Z.fn}${n?` · ${n} bóng`:""} · chạm để xem gần" aria-label="${Z.n}, ${n?n+" bóng":"vắng"}, chạm để xem gần" style="left:${b.x*100}%;top:${b.y*100}%;width:${b.w*100}%;height:${b.h*100}%"><span class="mlab">${icn}${Z.n}${hap[Z.id]&&typeof kitHapMark==="function"?`<i class="khap" role="img" aria-label="Có chuyện buổi này" title="Có chuyện buổi này">!</i>`:""}</span><span class="mmeta">${n?`${n} bóng`:"vắng"}</span></button>`}).join("");
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
/* kit sample page (KIT §85.10) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§85.10 khu Dư đồ",title:"DƯ ĐỒ ZONES · zone tag (same slip) + fog layer day / night",where:"Dư đồ overview (zone tags) and zone zoom (fog over the rest)",html:()=>`<div style="display:flex;gap:10px;flex-wrap:wrap;max-width:460px">${["","night"].map(n=>`<div class="mapv" data-sky="${n}" style="position:relative;width:200px;height:120px;border-radius:6px;overflow:hidden;background:#cdbb97"><div class="mapw" style="position:absolute;inset:0;width:100%"><div class="kmfog" style="${mapzFogVars({x:.25,y:.3,w:.5,h:.4})};animation:none"></div><span class="mspot mzone" style="position:absolute;left:20%;top:30%;width:60%;height:40%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:0;background:none"><span class="mlab">Đông lục cung</span><span class="mmeta">12 bóng</span></span></div></div>`).join("")}</div>`})}catch(e){}
