
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

/* ---------- 1. PERSON CARD: ONE portrait cell for every person (owner 11/14, kit 2b) ----------
   The cell is the whole frame canvas from its top (crest room kept: Hoàng hậu's phoenix, the Emperor's dragon, Thái hậu's crest show whole)
   down to the end of the tassel (owner 15/11 06:35Z: the whole canvas x 0–550, y 0–1037, aspect 550:1037; jade pendant + tassel always whole,
   same cell width as before, so the photo window keeps its size: the cell only grows downwards). Every card on a screen
   uses the SAME cell width (--kpcw), so the photo window (384x506 canvas units) is the same size for every rank and role.
   Layout: portrait left, name / rank / info beside it (float), act groups full width below: the Fold shows portrait + name + rank +
   the first info lines without scrolling. */
(function(){const st=document.createElement("style");st.id="k2b-pcard";st.textContent=`
/* KIT 31.18 PANELS SIZED BY THEIR OWN CONTAINER (owner: "iPad landscape = two phone panels side by side"): the person card and the act
   lists read the width of the box they sit in (#panel, the stage, a dialog) — never the screen: kitPcWide(pc) measures the card's container
   and sets .kpwide / .kpnar and --kpcw on the card (no CSS containment, so fixed sheets inside panels keep working). So the iPad right panel, the Fold full-screen
   tab and a phone panel of the same width render the same. Two-column card from a 440 px wide container. */
:root{--kpcw:clamp(150px,34vw,230px)}

.pc{display:block!important;overflow:auto;overscroll-behavior:contain}
.pc>.pcl,.pc>.pcr{overflow:visible!important;min-height:auto!important}
.pc>.pcl{display:block!important;width:auto!important;max-width:none!important}
.pc>.pcl::after{content:"";display:block;clear:both}
.pc>.pcl>.pcp.kit{float:left;width:var(--kpcw)!important;height:auto!important;max-height:none!important;min-height:0!important;aspect-ratio:550/1037!important;overflow:hidden!important;container-type:normal!important;margin:0 12px 6px 0!important}
.pc>.pcl>.pcp.kit>.kin{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:100%!important;transform:none!important}
.pc>.pcl>b,.pc>.pcl>.pcname,.pc>.pcl>p{display:flow-root}
.pc>.pcl>.pcinfo{font-size:.8rem}
.pc>.pcl>.pcname,.pc>.pcl>b:first-of-type{font-size:1.12rem}
.pc>.pcr{margin-top:8px;width:auto!important}
`;document.head.appendChild(st)})();

/* ---------- 2. STAGE FLOOR: crop each room picture to keep the floor; figures stand on the floor line ----------
   KIT_FLOOR[name] = floorTop: fraction of the picture height where the walkable floor starts (behind the furniture).
   The crop puts that line at ~40 % of the stage when the picture is cropped vertically (Fold portrait, phones); the feet line is
   3/4 of the way from floorTop to the picture bottom (never under the stage's lowest 3 %). Stage vars: --kfb (feet bottom, px), --kfh (max figure height). */
window.KIT_FLOOR=Object.assign({"duong-tam-dien":.70,"khon-ninh-cung":.72,"kinh-su-phong":.66,"lanh-cung":.62,"ngu-hoa-vien":.62,"ngu-thu-phong":.68,
 "phi-tan-cung":.62,"tam-cung-dem":.70,"thai-y-vien":.68,"tu-ninh-cung":.66,_default:.66},window.KIT_FLOOR||{});
const KIT_BGSZ={};
/* open-floor anchor per room (fractions of the picture): x = centre of the open floor, feet = where the feet stand. Read from the paintings
   (same composition in every season and buổi). People never stand on furniture: the group is centred on this spot. */
/* portrait room paintings (3:4, 1536x2048, same room, people-free): scene → true when img/<scene>-<season>-<buoi>-p.webp exist for every
   season × buổi; their own floor anchor goes in KIT_FANCHOR["<scene>-p"]. Empty until the art lands: nothing changes. */
window.KIT_STAGE_P=window.KIT_STAGE_P||{};
window.KIT_FANCHOR=Object.assign({"duong-tam-dien":{x:.5,feet:.93},"khon-ninh-cung":{x:.55,feet:.92},"kinh-su-phong":{x:.45,feet:.92},"lanh-cung":{x:.36,feet:.93},
 "ngu-hoa-vien":{x:.3,feet:.9},"ngu-thu-phong":{x:.5,feet:.92},"phi-tan-cung":{x:.5,feet:.9},"tam-cung-dem":{x:.68,feet:.94},"thai-y-vien":{x:.45,feet:.9},
 "tu-ninh-cung":{x:.5,feet:.9},_default:{x:.5,feet:null}},window.KIT_FANCHOR||{});
function kitFloorFit(){try{const st=$("stage"),im=$("scimg");if(!st||!im)return;const m=/url\(["']?([^"')]+)["']?\)/.exec(im.style.backgroundImage||"");if(!m){st.style.removeProperty("--kfb");st.style.removeProperty("--kfh");im.style.backgroundPosition="";return}
 let url=m[1];
 /* portrait tier (KIT 31.4): a room view taller than wide (phone shell, iPad column) uses the scene's portrait painting
    img/<scene>-<season>-<buoi>-p.webp (3:4) when KIT_STAGE_P lists the scene; it is swapped in place, the season/buổi part is kept */
 try{const W0=st.clientWidth,H0=st.clientHeight;const base=url.replace(/-p(\.\w+)$/,"$1");const sc0=base.split("/").pop().replace(/\.\w+$/,"").replace(/-(xuan|ha|thu|dong)(-(sang|trua|chieu|toi))?$/,"");
  const want=W0&&H0&&W0/H0<1&&window.KIT_STAGE_P&&KIT_STAGE_P[sc0]?base.replace(/(\.\w+)$/,"-p$1"):base;
  if(want!==url){im.style.backgroundImage=`url("${want}")`;url=want}}catch(e){}
 const name=url.split("/").pop().replace(/\.\w+$/,"");const sz=KIT_BGSZ[url];
 if(!sz){KIT_BGSZ[url]={w:1280,h:720,pending:1};const I=new Image();I.onload=()=>{KIT_BGSZ[url]={w:I.naturalWidth,h:I.naturalHeight};kitFloorFit()};I.src=url}
 const S0=KIT_BGSZ[url];const W=st.clientWidth,H=st.clientHeight;if(!W||!H)return;const ft=KIT_FLOOR[name]!=null?KIT_FLOOR[name]:KIT_FLOOR._default;
 const s=Math.max(W/S0.w,H/S0.h),dh=S0.h*s;let y0=0,py=50;
 if(dh>H+1){y0=Math.min(0,Math.max(H-dh,.40*H-ft*dh));py=(y0/(H-dh))*100}
 /* KIT_FLOOR anchors (kit 3, owner 11/14): every room has an open-floor spot (x centre, feet line); on a narrow/tall stage the picture
    slides sideways so that spot is in the middle of the free zone between the stage plaques; feet stand on the painted floor */
 const ph=/-p$/.test(name);const scene=name.replace(/-p$/,"").replace(/-(xuan|ha|thu|dong)(-(sang|trua|chieu|toi))?$/,"");const A=(ph&&KIT_FANCHOR[scene+"-p"])||KIT_FANCHOR[scene]||KIT_FANCHOR._default;
 const dw=S0.w*s;let x0=(W-dw)/2,px=50;if(dw>W+1){const gl=parseFloat(st.style.getPropertyValue("--kgl"))||0,gr=parseFloat(st.style.getPropertyValue("--kgr"))||0;
  const cx=(gl+(W-gr))/2;x0=Math.max(W-dw,Math.min(0,cx-A.x*dw));px=(x0/(W-dw))*100}
 im.style.backgroundPosition=`${px.toFixed(1)}% ${py.toFixed(1)}%`;window.KIT_PXBG={x0,y0,dw,dh};
 const ftA=KIT_FLOOR[scene]!=null?KIT_FLOOR[scene]:ft;const fs=A.feet!=null?A.feet:ftA+.9*(1-ftA);let feet=Math.min(H*.97,y0+fs*dh);
 const old=st.__kfa;st.__kfa={feet:Math.round(feet),ax:Math.round(x0+A.x*dw),scene};
 if(!old||old.feet!==st.__kfa.feet||old.ax!==st.__kfa.ax){clearTimeout(st.__kfaT);st.__kfaT=setTimeout(()=>{try{window.j59lay&&window.j59lay()}catch(e){}},0)}const kfb=Math.max(H*.03,24,H-feet);st.style.setProperty("--kfb",kfb.toFixed(0)+"px");st.style.setProperty("--kfh",Math.max(H*.45,H-kfb-H*.03).toFixed(0)+"px");st.dataset.kfloor=name}catch(e){}}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);(window.renderAfter||((k,f)=>f()))("kitFloorFit",kitFloorFit)/* oi-render: reads the stage size — once at the end of a render (jlag2) */;return r};
 try{let ro=null;const hook=()=>{const st=$("stage");if(!st||ro)return;ro=new ResizeObserver(()=>kitFloorFit());ro.observe(st)};if(document.readyState!=="loading")hook();else addEventListener("DOMContentLoaded",hook)}catch(e){}
 const st=document.createElement("style");st.id="k2b-floor";st.textContent=`
.stage[data-kfloor] .scimg{transition:background-position .2s}
`;document.head.appendChild(st)})();

/* ---------- 2b. ONE SCALE ON THE STAGE (owner 11/14): every adult figure on one stage has the same height and stands on the same
   floor line. All fig-*.webp are cut head-to-hem on a 900 px canvas, so equal element height = equal body height. Children keep their
   age ratio (j73 KIDH) of the same adult height. When the row is too wide, EVERY figure (her included) shrinks by one common factor.
   Name tags hang under the feet (absolute), so a token's feet sit on the floor line like hers. ---------- */
function kitStageScale(){try{const st=$("stage");if(!st)return;const H=st.clientHeight,W=st.clientWidth;if(!H||!W)return;
 const kfb=parseFloat(st.style.getPropertyValue("--kfb"))||Math.max(H*.04,26);const kfh=parseFloat(st.style.getPropertyValue("--kfh"))||H*.8;
 const sig=String(st.querySelectorAll('#tokens .tok').length)+(document.getElementById('mefig')?'m':'')+W+'x'+H;if(st.__ksig!==sig){st.__ksig=sig;st.__kk=1}
 let base=Math.max(H*.4,H-kfb-H*.025)*(st.__kk||1);const me=$("mefig");const toks=[...st.querySelectorAll("#tokens .tok.fig img.figimg")].filter(e=>e.offsetParent);
 const ar=e=>{if(e.naturalWidth&&e.naturalHeight)return e.naturalWidth/e.naturalHeight;if(!e.dataset.kwait){e.dataset.kwait=1;e.addEventListener("load",()=>kitStageScale(),{once:true})}return .36};
 const ks=e=>{if(e.dataset.ks)return+e.dataset.ks;let k=1;if(e.classList.contains("kidfig")){const m=/\*\s*([\d.]+)/.exec(e.style.height||"");if(m)k=+m[1]}e.dataset.ks=k;return k};
 const tokRow=$("tokens");const OV=0;/* retired scaler (replaced by j59 + the kit slot function): no neighbour overlap, ever (OD:L1049) */
 const ws=toks.map(e=>base*ks(e)*ar(e)+4);const meW=me?base*ar(me):0;const wide=!!(me&&toks.length&&tokRow);
 const tot=ov=>ws.reduce((x,y)=>x+y,0)-ov*ws.slice(1).reduce((x,y)=>x+y,0)+(wide?meW*(1-ov):0);let OVu=OV,total=tot(OV);
 
 let f=toks.length?Math.min(1,(W-16)/Math.max(1,total)):1;
 toks.forEach((e,i)=>{const b=e.closest(".tok");if(b)b.style.setProperty("margin-left",i?(-OVu*ws[i]*f).toFixed(0)+"px":"0px","important")});
 if(tokRow){if(wide){const mw=meW*f;me.style.setProperty("left",(8+mw/2).toFixed(0)+"px","important");tokRow.style.setProperty("left",(8+mw*(1-OVu)).toFixed(0)+"px","important");tokRow.style.setProperty("right","8px","important");tokRow.style.setProperty("justify-content",total*f<W-40?"center":"flex-start","important");tokRow.style.setProperty("padding","0","important");tokRow.style.setProperty("gap","0px","important")}
  else{if(me)me.style.removeProperty("left");["left","right","justify-content","padding"].forEach(k=>tokRow.style.removeProperty(k));tokRow.style.setProperty("gap","0px","important")}}
 const h=base*f;st.style.setProperty("--kfig",h.toFixed(1)+"px");
 const set=(e,v)=>{e.style.setProperty("height",v.toFixed(1)+"px","important");e.style.setProperty("max-height","none","important");e.style.setProperty("max-width","none","important");e.style.setProperty("width","auto","important")};
 if(me)set(me,h);toks.forEach(e=>{set(e,h*ks(e));const b=e.closest(".tok");if(b)b.style.setProperty("max-width","none","important")});
 st.classList.add("kscale");
 if(tokRow&&toks.length){const sr=st.getBoundingClientRect();let mx=0,mn=1e9;tokRow.querySelectorAll(".tok").forEach(b=>{const r=b.getBoundingClientRect();if(r.width){mx=Math.max(mx,r.right);mn=Math.min(mn,r.left)}});
  const lim=sr.right-6,lo=wide?mn:Math.max(mn,sr.left+6);if(mx>lim&&mx>mn){const k=Math.max(.5,(lim-lo)/(mx-mn))*.98;const h2=h*k;if(me)set(me,h2);toks.forEach(e=>set(e,h2*ks(e)));st.style.setProperty("--kfig",h2.toFixed(1)+"px");
   if(wide&&me){const mw=h2*ar(me);me.style.setProperty("left",(8+mw/2).toFixed(0)+"px","important");tokRow.style.setProperty("left",(16+mw).toFixed(0)+"px","important")}}}
  /* name tags never overlap: when two neighbours touch, every other tag drops one line (the floor band keeps room for two lines) */
  const tags=[...tokRow.querySelectorAll(".tok.fig>.tag")].filter(t=>t.offsetParent);const clr=()=>tags.forEach(t=>{t.classList.remove("ktlo","ktlo2");t.style.removeProperty("margin-left")});clr();
  const ov=n=>{for(let i=n;i<tags.length;i++){const a=tags[i-n].getBoundingClientRect(),b=tags[i].getBoundingClientRect();if(a.right+3>b.left)return true}return false};
  let lv=1;if(ov(1)){lv=2;tags.forEach((t,i)=>{if(i%2)t.classList.add("ktlo")});if(ov(2)){lv=3;clr();tags.forEach((t,i)=>{if(i%3==1)t.classList.add("ktlo");if(i%3==2)t.classList.add("ktlo2")})}}
  if(tags.length){const need2=tags[0].offsetHeight*lv+8+3*lv;const kfb=parseFloat(st.style.getPropertyValue("--kfb"))||0;if(kfb<need2&&!st.dataset.kfb2){st.dataset.kfb2=1;st.style.setProperty("--kfb",need2+"px");kitStageScale();delete st.dataset.kfb2;return}}
  const sr2=st.getBoundingClientRect();tags.forEach(t=>{t.style.removeProperty("margin-left");const r=t.getBoundingClientRect();if(r.right>sr2.right-4)t.style.setProperty("margin-left",(sr2.right-4-r.right)+"px");else if(r.left<sr2.left+4)t.style.setProperty("margin-left",(sr2.left+4-r.left)+"px")});
 }catch(e){}}
/* last check: nobody is cut at the stage edges (her idle sway included): shift inside, else one more common shrink */
function kitStageEdge(){try{const st=$("stage");if(!st)return;const sr=st.getBoundingClientRect();const els=[...st.querySelectorAll("#mefig, #tokens .tok.fig img.figimg")].filter(e=>e.offsetParent||e.id==="mefig");if(!els.length)return;
 let L=1e9,R=-1e9;els.forEach(e=>{const r=e.getBoundingClientRect();L=Math.min(L,r.left);R=Math.max(R,r.right)});const lo=sr.left+6,hi=sr.right-6;
 if(R-L>hi-lo+1){st.__kk=(st.__kk||1)*(hi-lo)/(R-L)*.98;kitStageScale();return}
 let dx=0;if(L<lo)dx=lo-L;else if(R>hi)dx=hi-R;if(Math.abs(dx)>.5){const me=$("mefig"),row=$("tokens");[me,row].forEach(e=>{if(!e)return;const cs=getComputedStyle(e);const l=parseFloat(cs.left)||0;if(e===me&&!e.style.getPropertyValue("left"))e.style.setProperty("left",`calc(50% + ${dx.toFixed(0)}px)`,"important");else e.style.setProperty("left",(l+dx).toFixed(0)+"px","important")})}}catch(e){}}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);kitStageScale();clearTimeout(window.__kssT);window.__kssT=setTimeout(()=>{kitStageScale();setTimeout(kitStageEdge,60)},520);return r};
 try{let ro=null;const hook=()=>{const st=$("stage");if(!st||ro)return;ro=new ResizeObserver(()=>{kitFloorFit();kitStageScale()});ro.observe(st)};if(document.readyState!=="loading")hook();else addEventListener("DOMContentLoaded",hook)}catch(e){}
 const st=document.createElement("style");st.id="k2b-scale";st.textContent=`
.stage.kscale .tokens{bottom:var(--kfb,10px)!important}
.stage.kscale .tok.fig{position:relative;padding-bottom:0!important;flex:0 0 auto!important;max-width:none!important}
.stage.kscale .tok.fig>.tag{position:absolute;top:calc(100% - 2px);left:50%;transform:translateX(-50%);z-index:2;white-space:nowrap!important;max-width:none!important;overflow:visible!important;text-overflow:clip!important;display:block!important;-webkit-line-clamp:none!important}
.stage.kscale .tok.fig>.tag.ktlo{top:calc(100% + 1.45em)}
.stage.kscale .tok.fig>.tag.ktlo2{top:calc(100% + 2.9em)}
`;document.head.appendChild(st)})();

/* ---------- 3. PHONE PORTRAIT: the stage takes ~40 % of the screen (was 27 %); the panel keeps the rest ---------- */
(function(){const st=document.createElement("style");st.id="k2b-phone";st.textContent=`
/* kv3:.kv1 */
 :where(.kv1) .game:not(.maptab):not(.cardtab){grid-template-rows:auto minmax(0,calc(40*var(--kvh,1dvh))) minmax(0,1fr) auto!important}
 :where(.kv1) .game.cardtab{grid-template-rows:auto minmax(0,calc(24*var(--kvh,1dvh))) minmax(0,1fr) auto!important}
 :where(.kv1) header.hud>.me .dt{font-size:.66rem!important;line-height:1.2}
 :where(.kv1) header.hud>.hud2.khud.col{flex-wrap:nowrap!important;gap:3px!important}
 :where(.kv1) header.hud>.hud2.khud>.h2t{min-height:26px!important;height:26px;padding:0 6px!important;font-size:.7rem!important}
 :where(.kv1) header.hud>.hud2.khud .hc{padding:1px 5px!important;font-size:.66rem!important}

`;document.head.appendChild(st)})();

/* ---------- 4. TRONG CUNG block (owner 11/14): Hoàng thượng · Thái hậu · Hoàng hậu — mood + attitude toward her; "chưa rõ" when unknown;
   tap = that person's card. Landscape (iPad): on the stage under the Tư chất block (#kstat), same side, ONLY when it covers no figure.
   Portrait (Fold, phones): a column "Trong cung" in the status sheet (#hud2 .khg). Data hooks: window.kitCourtMood(who) -> text|null and
   window.kitCourtKnown(who) -> bool (default: the Emperor's mood is public; Thái hậu / Hoàng hậu moods are "chưa rõ" until a module says). ---------- */
function kitCourtRows(){const out=[];if(!S||S.dead)return out;const mood=w=>{try{if(typeof window.kitCourtMood==="function"){const r=window.kitCourtMood(w);if(r!=null)return r}}catch(e){}
  if(w==="emp"){const m=MOODS[S.emp&&S.emp.mood];return m?[m[0],m[1]]:null}return null};
 const att=(n)=>typeof affW==="function"?[affW(n),n>BAL.quyLv[2]?"g":n<BAL.quyLv[1]?"r":""]:[String(n),""];
 const known=w=>{try{if(typeof window.kitCourtKnown==="function"){const r=window.kitCourtKnown(w);if(r!=null)return r}}catch(e){}return true};
 out.push({k:"emp",who:"Hoàng thượng",f:pEmp(),mood:mood("emp"),att:known("emp")?[S.sung>=BAL.sungLv.card[2]?"Sủng ái":S.sung>=BAL.sungLv.card[1]?"Để mắt":S.sung>=BAL.sungLv.card[0]?"Biết mặt":"Chưa để ý",S.sung>=BAL.sungLv.card[1]?"g":""]:null});
 if(!S.thDead)out.push({k:"th",who:"Thái hậu",f:pTH(),mood:mood("th"),att:known("th")?att(S.th|0):null});
 const q=typeof queenP==="function"?queenP():null;if(q&&q!==S)out.push({k:"hh",who:"Hoàng hậu",f:pv(q),mood:mood("hh"),att:known("hh")?att(S.hh|0):null,ref:q});
 return out}
function kitCourtHTML(cls){const R=kitCourtRows();if(!R.length)return"";const v=(x,l)=>x?`<span class="ef ${x[1]==="g"?"g":x[1]==="r"?"r":"n"}">${x[0]}</span>`:`<span class="ef n">chưa rõ</span>`;
 return `<div class="kcourt ${cls||""}"><b class="khh">Trong cung</b>`+R.map(r=>`<button class="kcrow" data-kc="${r.k}" title="Chạm để xem thẻ ${r.who}">${mdH(r.f,"xs")}<span class="kcn">${r.who}</span><span class="kcv"><small>Tâm trạng</small>${v(r.mood)}<small>Với ngươi</small>${v(r.att)}</span></button>`).join("")+`</div>`}
function kitCourtOpen(k){try{if(Q.length&&!/pcm/.test(Q[0].cls||""))return;if(k==="emp"){showEmp();return}
 const tb=k==="th"?"rel":"rv";if(k==="th")relSel="th";else{const q=queenP();const i=rivals.indexOf(q);if(i>=0)PG.rv=i}
 const b=document.querySelector(`[data-tab="${tb}"]`);if(b)b.click();else{tab=tb;render()}}catch(e){console.error("kitCourtOpen",e)}}
addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".kcrow[data-kc]");if(!b||e.target.closest("img.kemo"))return; /* a tap on the mood seal = its popover (jemo), not the card */e.stopPropagation();const el=$("hud2");if(el&&!el.classList.contains("col")&&b.closest("#hud2")){const x=el.querySelector(".khx");if(x)x.click()}kitCourtOpen(b.dataset.kc)},true);
function kitCourtStage(){try{const st=$("stage"),ks=$("kstat");let o=$("kcourt");const land=kitView().pages===2;
 if(!st||!ks||!land||!S||S.dead||ks.style.visibility==="hidden"||(typeof isSrv==="function"&&isSrv())){if(o)o.remove();return}
 const h=kitCourtHTML("kcst");if(!h){if(o)o.remove();return}if(!o){o=document.createElement("div");o.id="kcourt";st.appendChild(o)}o.innerHTML=h;
 const kr=ks.getBoundingClientRect(),sr=st.getBoundingClientRect();o.style.top=Math.round(kr.bottom-sr.top+6)+"px";o.classList.toggle("kright",ks.classList.contains("kright"));o.style.visibility="hidden";
 requestAnimationFrame(()=>{try{const r=o.getBoundingClientRect(),s=st.getBoundingClientRect();const figs=kitFigRects();
  const bad=r.bottom>s.bottom-8||figs.some(f=>Math.min(f.right,r.right)-Math.max(f.left,r.left)>0&&Math.min(f.bottom,r.bottom)-Math.max(f.top,r.top)>0);o.style.visibility=bad?"hidden":""}catch(e){}})}catch(e){}}
(function(){const k0=khStage;khStage=function(){const r=k0.apply(this,arguments);setTimeout(kitCourtStage,40);return r}})();
(function(){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{const el=$("hud2"),g=el&&el.querySelector(".khg");if(g&&!g.querySelector(".kcourt")){const h=kitCourtHTML("khc kcsh");if(h)g.insertAdjacentHTML("beforeend",h)}}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="k2b-court";st.textContent=`
.kcourt{display:flex;flex-direction:column;gap:2px}
.kcourt .kcrow{display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;column-gap:6px;align-items:center;border:0;background:none;padding:2px 0;font:inherit;text-align:left;cursor:pointer;color:var(--ink)}
.kcourt .kcrow+.kcrow{border-top:1px dotted var(--k-hair)}
.kcourt .kcrow>.md{grid-row:1/span 2}
.kcourt .kcn{font-size:.76rem;font-weight:600}
.kcourt .kcv{display:flex;flex-wrap:wrap;gap:0 5px;align-items:baseline;font-size:.72rem}
.kcourt .kcv small{color:var(--k-lab);font-size:.64rem;text-transform:uppercase;letter-spacing:.02em}
.kcourt .kcv .ef{font-weight:600}
#kcourt{position:absolute;left:8px;z-index:3;max-width:210px;padding:5px 8px;border-radius:8px;background:rgba(255,250,240,.86);box-shadow:0 2px 8px #0002;border:1px solid var(--k-hair)}
#kcourt.kright{left:auto;right:8px}
#kcourt .kcourt{gap:1px}
#hud2 .khg .kcourt.kcsh{padding:4px 6px;border:1px solid var(--k-hair);border-radius:8px;background:#fffdf8}
`;document.head.appendChild(st)})();

/* ---------- 5. FIGURE SILHOUETTE for "covers no figure" tests: kitFigRects() returns, per figure, 24 horizontal bands with the opaque extent of
   the art in each band (alpha mask read once per picture from a small canvas), so the Tư chất / Trong cung blocks may sit beside a figure's
   head or between two figures but never over the painted body. Falls back to the element box while a mask is not ready. ---------- */
const KIT_MASK={};
function kitMask(src){if(KIT_MASK[src])return KIT_MASK[src].b?KIT_MASK[src]:null;KIT_MASK[src]={};const I=new Image();I.crossOrigin="anonymous";I.onload=()=>{try{const N=24,Wc=48;const c=document.createElement("canvas");c.width=Wc;c.height=N*4;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(I,0,0,Wc,N*4);const d=x.getImageData(0,0,Wc,N*4).data;const b=[];
  for(let r=0;r<N;r++){let lo=1,hi=0;for(let yy=r*4;yy<r*4+4;yy++)for(let xx=0;xx<Wc;xx++){if(d[(yy*Wc+xx)*4+3]>40){lo=Math.min(lo,xx/Wc);hi=Math.max(hi,(xx+1)/Wc)}}b.push(hi>lo?[lo,hi]:null)}
  KIT_MASK[src]={b};setTimeout(()=>{try{khStage()}catch(e){}},30)}catch(e){KIT_MASK[src]={b:null,bad:1}}};I.src=src;return null}
kitFigRects=function(){const st=$("stage");if(!st)return[];const out=[];st.querySelectorAll("#mefig, #tokens .tok img.figimg, #tokens .tok:not(.fig) .md").forEach(e=>{if(!e.offsetParent&&e.id!=="mefig")return;const r=e.getBoundingClientRect();if(r.width<8||r.height<8)return;
  const m=e.tagName==="IMG"?kitMask(e.currentSrc||e.src):null;if(!m){out.push({left:r.left,right:r.right,top:r.top,bottom:r.bottom});return}
  const N=m.b.length,bh=r.height/N;m.b.forEach((x,i)=>{if(x)out.push({left:r.left+r.width*x[0]-4,right:r.left+r.width*x[1]+4,top:r.top+i*bh,bottom:r.top+(i+1)*bh})})});return out};

/* ---------- 6. OPTION MODE "cost" — hidden outcomes for EVENT choices (owner 11/14, 11/15 14:30Z, KIT 28.6) ----------
   Every event choice (main / side stories, weekly events, festivals, NPC visits, dilemmas…): the option shows ONLY what it costs (Sức, khắc,
   Bạc) and its Cần — no Được / Mất / Kèm, no odds word. An option with no cost has NO Tốn row (owner 13:25Z: never "Tốn: không"). Under it the
   kit HINT row and in its head the kit RISK chip (6b). The result card afterwards shows the true numbers. Active acts keep everything.
   Use (data only): a Q / kitModal item with `hideOut:true` (every option) or an option with `hideOut:true`; any priced button may also carry
   `data-khide="1"`. Which items are events: `kitIsEventChoice` below. ---------- */
const KIT_COSTRE=/khắc|\bSức\b|\bBạc\b|\bbạc\b/i;
/* ---------- 6b. KIT HINT + KIT RISK (owner 11/15 15:05Z / 15:10Z, KIT 28.6 — shared kit parts kitHint / kitHintRow / kitRisk) ----------
   kitHint(o, m, lv) → {hint, risk}: read from the option's OWN data (fx + its x / j67 text: the odds, people and state of THIS moment), so it is
   true now and changes with the context (no fixed answer to learn). Words only: stat numbers never appear (a count in a story phrase is
   written in words: "hai mươi trượng"). It names the main gain FIRST, then the price beyond Tốn, then what a failure brings.
   Clarity lv (kitHintLevel: her Tâm cơ / Tai mắt, BAL.hint*):
     0 vague — generic people ("bề trên", "đối thủ"), no chance word; a deadly failure is always said ("hỏng thì mất mạng").
     1 plain — the roles (Thái hậu, Hoàng hậu, Hoàng thượng), a rough chance (dễ thành / thành bại khó đoán / khó thành) and the failure.
     2 sharp — names (the rival by name) and the reading of the moment the data carries ("ngài trọng tài, rất hợp").
   Risk: none / sure → "an toàn"; Khó / Liều or a deadly failure / side risk → "liều"; any other odds, "Khó lường" or a side risk → "có rủi ro".
   An option may carry its own `hint` (string or fn(lv)) and `risk`; hints may never lie (an override must match the data). */
const KIT_HINT_LADDER=/(Liều|Khó lường|Khó|Năm ăn năm thua|Khá chắc|Rất chắc|Nắm chắc|Chắc chắn|Chắc)/;
function kitHintLevel(){try{const t=S.tamco||0,m=S.mat||0;const B=typeof BAL==="object"?BAL:{};if(t>=(B.hintSharp)||m>=(B.hintMat))return 2;if(t>=(B.hintMid))return 1}catch(e){}return 0}
/* a count inside a story phrase in words (1..999): "20 trượng" → "hai mươi trượng" */
function kitNumVi(n){const D=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];n=Math.round(+n);if(!(n>=0&&n<1000))return String(n);
 const two=x=>{if(x<10)return D[x];const t=Math.floor(x/10),u=x%10;const a=t===1?"mười":D[t]+" mươi";return u===0?a:a+" "+(u===1&&t>1?"mốt":u===5?"lăm":u===4&&t>1?"tư":D[u])};
 if(n<100)return two(n);const h=Math.floor(n/100),r=n%100;return D[h]+" trăm"+(r===0?"":r<10?" lẻ "+D[r]:" "+two(r))}
/* the option's raw kit line (the same text its act card would read), split into labelled items */
function kitOptModel(o){let raw="";try{raw=o&&o.j67?String(o.j67):typeof dilLineRaw==="function"?dilLineRaw(o):String(o&&o.x||"")}catch(e){raw=String(o&&o.x||"")}
 raw=raw.replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ta +${n}`);
 const M={odds:"",items:[],notes:[]};let lab="";
 for(const s0 of raw.split(/ · (?![^<]*>)/)){const s=kaPlain(s0);if(!s)continue;
  const od=s.match(/^(Chắc chắn|Nắm chắc|Rất chắc|Khá chắc|Năm ăn năm thua|Chắc|Khó lường|Khó|Liều)$/);if(od&&!M.odds){M.odds=od[1];continue}
  if(/^Quẻ: /.test(s))continue;
  const ml=s.match(/^(được ngay|ngay|tốn|thành|thắng|được|hỏng|mất|kèm)\s*:\s*/i);let body=s,cont=true;
  if(ml){lab=ml[1].toLowerCase();if(lab==="thắng"||lab==="được")lab="thành";if(lab==="mất")lab="hỏng";if(lab==="được ngay")lab="ngay";body=s.slice(ml[0].length);cont=false}
  /* an unlabelled segment with no number after the effects = a reading of the moment ("ngài trọng tài, rất hợp") */
  if(cont&&(lab==="hỏng"||lab==="kèm")&&!/\d/.test(body)&&!/^(nàng|hắn|các|Thái hậu|Hoàng hậu|Hoàng thượng|chứng cứ)/.test(body)){M.notes.push(body);continue}
  for(const sc of body.split(/; /)){const P=[];for(const v of sc.split(/, (?![^(]*\))/)){const p=v.trim();if(!p)continue;if(P.length&&!/\d/.test(p)&&!/\d/.test(P[P.length-1])&&!/^(Sủng|Danh|Đức|Bạc|Sức|Ân tình|Thái hậu|Hoàng hậu|chứng cứ|nàng|hắn|các)/.test(p))P[P.length-1]+=", "+p;else P.push(p)}
   P.forEach(p=>M.items.push({p,l:lab||"thành"}))}}
 return M}
/* her side of a phrase: +1 good for her, -1 bad, 0 neutral (the kit colour rule kcls/kaSent + story words) */
function kitHintSign(p,l){if(/^(không (mất|được|tốn)[^,]*gì|không được không mất)/i.test(p))return 0;
 if(l==="kèm"&&!/\+\s?\d/.test(p)&&!/bớt (ghen|oán)/.test(p))return -1;/* a side effect is a risk unless it is a plain gain */
 if(/(^|\s)(phật ý|hận|sa sút|không thể|đoạn tuyệt|bẽ mặt|nhạt|lạt lẽo|lạnh nhạt|chán|trách|giận|ghét|tang vật|lộ là|bị đánh|chịu đòn|thất sủng|bị phạt)(\s|$|,)/i.test(p)&&!/^(nàng|con nàng|của nàng|hắn) /i.test(p))return -1;
 if(/(thân|thiện cảm|quý ngươi|quý ta|tình ý|(^|\s|\()lòng)\s*[-−]\s?\d/i.test(p))return -1;if(/(thân|thiện cảm|quý ngươi|quý ta|tình ý|(^|\s|\()lòng)\s*\+\s?\d/i.test(p))return 1;
 let c="n";try{c=kaSent(p,"n")}catch(e){}if(c==="g")return 1;if(c==="r")return -1;
 if(/(^|\s)(hài lòng|thoát nạn|vui|hợp ý|thương|tin cậy|giữ được|được giữ|được dời|dọn sang|tạ ơn)(\s|$|,)/i.test(p))return 1;return l==="hỏng"?-1:l==="kèm"?-1:1}
const KIT_DEADLY=/(tru di|ban chết|mất mạng|lộ là chết|là chết|bị chết|xử tử|xử trảm|\bchết\b)/i;
/* one effect phrase → [vague, plain, sharp] words (numbers dropped), or null when it is only a cost */
function kitHintPhrase(p,sg,nm,lv){const who=nm||"\u0001";
 const story=()=>{const t=p.replace(/\s*\([^()]*\d[^()]*\)/g,"").replace(/(\d+)/g,(m,d)=>kitNumVi(d)).replace(/\s*\(\s*\)/g,"").trim();return [t,t,t]};
 if(KIT_DEADLY.test(p))return lv===0?["mất mạng","mất mạng","mất mạng"]:story();
 if(/^(Sức|Bạc)\s*[-−]\s*\d+$/.test(p)||/^\d+\s*khắc$/.test(p)||/^an toàn$/i.test(p))return null;
 if(/(kẻ hầu|cung nhân) khác/i.test(p))return story();/* "kẻ hầu khác giữ kỷ cương (lòng +1)": the others, in the story's words */
 const T=[/* [re, up, down, flags]: flags "i" hostility (her side is the reverse), "w" may match a phrase without a number */
  [/chứng cứ/i,["nắm thêm thóp kẻ khác","nắm thêm chứng cứ",`nắm thêm chứng cứ về ${who}`],["mất một chứng cứ","mất chứng cứ trong tay","mất chứng cứ trong tay"],"w"],
  [/long thai|có thai|mang thai|\bthai\b/i,["có phúc con cái","giữ được long thai","giữ được long thai"],["lỡ phúc con cái","lần này không thể có thai","lần này không thể có thai"],"w"],
  [/Thái hậu/i,["được lòng bề trên","Thái hậu hài lòng","Thái hậu hài lòng"],["mất lòng bề trên","Thái hậu phật ý","Thái hậu để bụng"]],
  [/Hoàng hậu/i,["được lòng bề trên","Hoàng hậu hài lòng","Hoàng hậu hài lòng"],["mất lòng bề trên","Hoàng hậu phật ý","Hoàng hậu để bụng"]],
  [/^(nàng|hắn|con nàng)\s+(Sủng|Danh)|Sủng của|bớt sủng/i,["hạ được đối thủ","đối thủ thất thế",`${who} thất sủng`],["đối thủ được lợi","đối thủ được lợi",`${who} được lợi`]],
  [/phi tần.*ghen|ghen.*phi tần/i,["chuốc lòng ghen","các phi tần ghen ghét","các phi tần ghen ghét"],["bớt người ghen","các phi tần bớt ghen","các phi tần bớt ghen"],"i"],
  [/ghen|oán|ghét/i,["kết thêm oán","có người ghen ghét",`${who} sinh oán`],["bớt người oán","có người nguôi giận",`${who} nguôi giận`],"i"],
  [/tình ý/i,["thêm tình riêng","người ấy thêm tình ý",`${who} thêm tình ý`],["dứt tình riêng","người ấy nguội lòng",`${who} nguội lòng`]],
  [/thân\b|thiện cảm|quý ngươi|quý ta/i,["được lòng người","người ấy có thiện cảm hơn",`${who} có thiện cảm với ta hơn`],["mất lòng người","người ấy mất thiện cảm",`${who} mất thiện cảm với ta`]],
  [/(^|\s|\()(lòng|Lòng)\s/,["được lòng kẻ hầu","kẻ hầu một lòng theo ta",`${who} một lòng theo ta`],["mất lòng kẻ hầu","kẻ hầu sinh oán",`${who} sinh oán`]],
  [/thương con|hoàng tử|công chúa|các con/i,["có lợi cho con","con được thương","Hoàng thượng thương con hơn"],["con thiệt","con bị lạnh nhạt","con bị lạnh nhạt"]],
  [/nghi ngươi|nghi ta|đa nghi|quở|cấm túc|giáng/i,["được tin","bệ hạ thêm tin","Hoàng thượng thêm tin"],["dễ bị nghi, bị phạt","có thể bị nghi, bị phạt","Hoàng thượng có thể sinh nghi, trách phạt"],"w"],
  [/Ân tình/i,["thêm tình nghĩa","thêm tình nghĩa với bệ hạ","thêm tình nghĩa với Hoàng thượng"],["sứt mẻ tình nghĩa","sứt mẻ tình nghĩa với bệ hạ","sứt mẻ tình nghĩa với Hoàng thượng"]],
  [/Sủng|được ưa|đêm vui/i,["được để mắt","bệ hạ để mắt hơn","Hoàng thượng để mắt hơn"],["bị lạt lẽo","bệ hạ lạt lẽo đi","Hoàng thượng lạt lẽo đi"]],
  [/Danh/i,["thêm thể diện","thêm thể diện trong cung","thêm thể diện trong cung"],["mất thể diện","mất thể diện trước lục cung","mất thể diện trước lục cung"]],
  [/Đức/i,["được tiếng hiền","được tiếng hiền đức","được tiếng hiền đức"],["mang tiếng ác","mang tiếng thất đức","mang tiếng thất đức"]],
  [/Bạc|lì xì/i,["có thêm bạc","có thêm bạc","có thêm bạc"],["hao bạc","hao bạc","hao bạc"]],
  [/Sức/i,["dưỡng sức","dưỡng sức","dưỡng sức"],["hao sức","hao sức","hao sức"]],
  [/Tai mắt/i,["thêm tai mắt","thêm tai mắt","thêm tai mắt"],["mất tai mắt","mất tai mắt","mất tai mắt"]],
  [/Tâm cơ/i,["thêm mưu trí","thêm tâm cơ","thêm tâm cơ"],["kém mưu trí","sút tâm cơ","sút tâm cơ"]],
  [/Sắc|Tài\b|tài nghệ/i,["bản thân khá lên","bản thân khá lên","bản thân khá lên"],["bản thân sút đi","bản thân sút đi","bản thân sút đi"]],
  [/Thái y|thuốc|bệnh|ốm/i,["giữ được thân thể","thân thể được giữ","thân thể được giữ"],["thân thể bị hại","thân thể bị hại","thân thể bị hại"],"w"]];
 const num=/\d/.test(p)||/^(nàng|hắn|con nàng)\s/.test(p);
 for(const [re,U,Dn,fl] of T)if(re.test(p)&&(num||/w/.test(fl||""))){/* hostility: "+" is bad for her — the sign already says which; the words follow her side */
   const L=/i/.test(fl||"")?(sg>0?Dn:U):(sg>0?U:Dn);if(!num){const s=story();return [L[0],s[1],s[2]]}/* a story phrase keeps its own words */
   return L[2].includes("\u0001")?[L[0],L[1],L[1]]:L}
 if(/[+−-]\s?\d/.test(p))return null;/* an unknown stat line: never guessed */return story()}
function kitHintWho(p,m){try{const L=(typeof liveRivals==="function"?liveRivals(true):[]).concat((typeof S!=="undefined"&&S&&S.men)||[],(typeof S!=="undefined"&&S&&S.staff)||[]);
 for(const v of L)if(v&&v.name&&p.includes(v.name))return v.name;
 if(!/^(nàng|hắn|con nàng)\s/.test(p))return"";const w=m&&m.who;if(w&&w.w&&w.w[0]==="r"){const v=typeof RV==="function"?RV(w.w[1]):null;if(v)return v.name}if(w&&w.nm)return w.nm}catch(e){}return""}
/* how big a change is, in words (from Tâm cơ 25): "(nhiều)" / "(chút ít)" against the usual size of that stat — never the number */
const KIT_HINT_MAG=[[/Thái hậu|Hoàng hậu|thiện cảm|thân\b|quý|tình ý|(^|\s|\()lòng\s|ghen|oán/i,10],[/được ưa/i,3],[/Sủng/i,5],[/Danh|Đức|Ân tình/i,4],[/Bạc/i,40],[/Sức/i,10],[/chứng cứ|Tai mắt|Tâm cơ|Sắc|Tài\b/i,2]];
function kitHintMag(p){const n=(String(p).match(/[+−-]\s?(\d+)/)||[])[1];if(!n)return"";const v=+n;for(const [re,big] of KIT_HINT_MAG)if(re.test(p))return v>=big*1.5?" (nhiều)":v<=Math.max(1,Math.floor(big/4))?" (chút ít)":"";return""}
function kitHint(o,m,lv){if(lv==null)lv=kitHintLevel();if(!o)return{hint:"",risk:"an toàn"};
 if(o.hint){const h=typeof o.hint==="function"?o.hint(lv):String(o.hint);return{hint:h,risk:o.risk||"có rủi ro"}}
 const M=kitOptModel(o);const od=M.odds&&M.odds!=="Chắc chắn"?M.odds:"";const uniq=a=>[...new Set(a.filter(Boolean))];
 const sure=[],win=[],fail=[],side=[];let deadly=false,sideRisk=false;
 for(const it of M.items){const sg=kitHintSign(it.p,it.l);if(!sg)continue;const ph=kitHintPhrase(it.p,sg,lv===2?kitHintWho(it.p,m):"",lv);if(!ph)continue;const w=ph[lv]+(lv>=1&&!KIT_DEADLY.test(it.p)?kitHintMag(it.p):"");
  const isFail=it.l==="hỏng";if(KIT_DEADLY.test(it.p)&&(isFail||it.l==="kèm"||sg<0))deadly=true;
  if(it.l==="kèm"){side.push([w,sg]);if(sg<0&&/(khả năng|có thể|nếu|dễ |có khi|bị lộ|phát giác)/i.test(it.p))sideRisk=true;continue}
  if(isFail&&M.odds==="Chắc chắn"){if(sg<0)sure.push([w,sg]);continue}/* a CERTAIN option cannot fail: its "Mất:" is a sure price ("nhưng …"), never "hỏng thì …" (review pets-fix r6) */
  if(isFail){if(sg<0)fail.push(w);continue}
  if(/(nếu bị|bị lục|tang vật|lộ là|có thể bị|phát giác)/i.test(it.p))sideRisk=true;
  (od?win:sure).push([w,sg])}
 const good=uniq(sure.concat(win).filter(x=>x[1]>0).map(x=>x[0])).slice(0,2),bad=uniq(sure.concat(side).filter(x=>x[1]<0).map(x=>x[0])).slice(0,2),sideGood=uniq(side.filter(x=>x[1]>0).map(x=>x[0])).slice(0,1);
 const parts=[];parts.push(good.length?good.concat(sideGood).join(", "):sideGood.length?sideGood.join(", "):bad.length||fail.length?"chẳng được gì":"không được mất gì");
 if(od&&lv>=1)parts.push(/^(Nắm chắc|Rất chắc|Chắc)$/.test(od)?"dễ thành":/^(Khó|Liều)$/.test(od)?"khó thành":"thành bại khó đoán");
 if(bad.length)parts.push("nhưng "+bad.join(", "));
 const fl=uniq(fail).slice(0,2);if(fl.length&&(lv>=1||deadly))parts.push("hỏng thì "+(lv===0?(deadly?"mất mạng":fl[0]):fl.join(", ")));
 if(lv===2&&M.notes.length){const n=uniq(M.notes.filter(x=>!/^an toàn$/i.test(x))).slice(0,1);if(n.length)parts.push(n[0])}
 const risk=o.risk||(deadly||/^(Khó|Liều)$/.test(od)?"liều":od||sideRisk?"có rủi ro":"an toàn");
 return{hint:parts.join("; "),risk}}
/* the DOM fallback (a hidden-outcome button with no option object): its rows as a pseudo option */
function kitHintOf(b,o){if(o)return kitHint(o,typeof Q!=="undefined"?Q[0]:null);const rows={};b.querySelectorAll(".kb .kr").forEach(r=>{const l=((r.querySelector(".krl")||{}).textContent||"").trim();const v=r.querySelector(".krv");if(v)(rows[l]=rows[l]||[]).push(...[...v.querySelectorAll(".ef")].map(e=>e.textContent.trim()))});
 const odd=((b.querySelector(":scope > .kat > .kodds, :scope > .kabody > .kat > .kodds")||{}).textContent||"").match(KIT_HINT_LADDER);
 const j67=[odd?odd[1]:"",rows["Được"]&&"thành: "+rows["Được"].join(", "),rows["Mất"]&&"hỏng: "+rows["Mất"].join(", "),rows["Kèm"]&&"kèm: "+rows["Kèm"].join(", ")].filter(Boolean).join(" · ");
 return kitHint({j67},null)}
/* KIT PARTS (KIT 28.6, kit sample page): the hint row and the risk chip — every hidden-outcome option uses these, nothing private */
function kitHintRow(text){if(!text)return"";try{if(typeof VP==="object"&&VP&&VP.fix)text=VP.fix(text)}catch(e){}return `<span class="kr kr-hint"><span class="krl">Gợi ý</span><span class="krv"><span class="ef i">${text}</span></span></span>`}
const KIT_RISK={"an toàn":["g","việc này không hỏng được"],"có rủi ro":["w","có thể hỏng"],"liều":["r","dễ hỏng, hỏng thì nặng"]};
function kitRisk(word){const r=KIT_RISK[word]||KIT_RISK["có rủi ro"];return `<span class="kchip ${r[0]} krisk" title="${r[1]}">${KIT_RISK[word]?word:"có rủi ro"}</span>`}
function kitHideOut(b){try{if(!b||!b.classList.contains("ka")||b.dataset.khid==="1")return;b.dataset.khid="1";b.classList.add("khideout");
 /* the hint + risk chip, read from the option's data before its outcome rows go */
 let H=null;try{const M=b.closest("#modal");const o=M&&typeof Q!=="undefined"&&Q[0]&&Q[0].opts&&b.dataset.m!=null?Q[0].opts[+b.dataset.m]:null;H=kitHintOf(b,o)}catch(e){console.error("kitHint",e)}
 const od=b.querySelector(":scope > .kat > .kodds, :scope > .kabody > .kat > .kodds");if(od&&b.dataset.kodds!=="1")od.remove();b.querySelectorAll(".kb .kr").forEach(r=>{if(!r.classList.contains("kr-ton")&&!r.classList.contains("kr-why"))r.remove()});
 let ton=b.querySelector(".kr-ton");if(ton){const v=ton.querySelector(".krv");[...v.children].forEach(e=>{if(e.classList.contains("ksep"))return;if(!KIT_COSTRE.test(e.textContent))e.remove()});
  [...v.children].forEach((e,i,a)=>{if(e.classList.contains("ksep")&&(!e.previousElementSibling||e.previousElementSibling.classList.contains("ksep")||!e.nextElementSibling))e.remove()});
  if(!v.querySelector(".ef"))ton.remove()}/* owner 13:25Z: no cost → no Tốn row at all (never "Tốn: không") */
 let kb=b.querySelector(".kb");if(!kb){b.insertAdjacentHTML("beforeend",`<small class="kb"></small>`);kb=b.querySelector(".kb")}
 if(H){if(H.hint)kb.insertAdjacentHTML("beforeend",kitHintRow(H.hint));
  const kat=b.querySelector(":scope > .kat, :scope > .kabody > .kat");/* review/opt-pics: an option card with its picture holds .kat inside .kabody (KIT 6.2) */if(kat&&!kat.querySelector(".krisk"))kat.insertAdjacentHTML("beforeend",kitRisk(H.risk))}}catch(e){console.error("kitHideOut",e)}}
(function(){const n0=kaNorm1;kaNorm1=function(b){const r=n0.apply(this,arguments);try{if(b&&b.dataset&&(b.dataset.khide==="1"||b.closest("[data-khide-all]")))kitHideOut(b)}catch(e){}return r}})();
/* the kit sample page for this section (kitRisk, kitHintRow, an event option in cost mode, kitResultSeal, kitKemRow) is ONE page: jkitpage.js
   (#kit, KIT §47), samples "§53" (reviewer opt-render r7 dropped the duplicate ?kit / kitSample() page). */
/* WHICH dialogs are EVENT choices (owner 14:30Z: every event — main / side stories, festivals, NPC visits, toilette reactions…): ON BY DEFAULT
   for (a) every item made from a PEND entry by pushDil / pushFront / mkP (it carries pid / pp: j68 weekly events, j67 chapters, j70, j96/j97…)
   EXCEPT the active-act pickers listed in KIT_ACT_PIDS (she opened them herself: gift / plant / taint / evidence pickers, the shop, the veil
   pickers, the runner, the prince's bride) — those keep the full numbers (owner 15:05Z); (b) every item a builder flags `ev` (approachOne visits,
   festivals FESTEV `ev:"fest"`, servant matters, the palace grant, the contest rounds, the festival contest entry); (c) a kit choice panel.
   An item flagged `act` (an active act's own picker / confirm: Nội vụ phủ hire, Xuất gia?, map card…), `shop` (Hàng chợ đen) or `showOut`
   is never an event. The full list per call site: dev/test/opt-scan.py (fails on an unclassified dialog with choices). */
const KIT_ACT_PIDS=new Set(["giftpick","plantpick","taintpick","evpick","itarget","shop","plantsv","wkgive","runner","vlget","vlcraft","vlnvp","vlout","htban","h54ban"]);
function kitIsEventChoice(m){if(!m||!m.opts||!m.opts.length||m.showOut||m.act||m.shop)return false;if(m.pid&&KIT_ACT_PIDS.has(m.pid))return false;
 return !!(m.hideOut||m.ev||("pid" in m)||("pp" in m)||(m.kit&&(m.kit.kind==="choice"||m.kit.hideOut)))}
(function(){const s0=showModal;showModal=function(){const m=Q[0];if(kitIsEventChoice(m))m.hideOut=true;const r=s0.apply(this,arguments);try{if(m&&m.opts&&(m.hideOut||m.opts.some(o=>o&&o.hideOut))){
  document.querySelectorAll("#modal .opts > button[data-m], #modal .opts button.opt").forEach(b=>{const o=m.opts[+b.dataset.m];if(o&&o.showOut)return;if(m.hideOut||(o&&o.hideOut)){if(o&&o.showOdds)b.dataset.kodds="1";b.dataset.khide="1";if(b.classList.contains("ka"))kitHideOut(b)}})}}catch(e){console.error("hideOut",e)}return r}})();
/* ACT-LIKE OPTIONS inside a dialog (kit owner #2): an option may carry showOdds:true — it keeps its odds word (Liều … Nắm chắc) beside the
   cost while the dialog's other outcomes stay hidden — or showOut:true — the full act card (Được / Mất / odds), e.g. "Xin ban", "Mua lén". */

/* KIT_VEIL / KIT_SCAR asset data (from review/wardrobe j92 e4a8a72, image data only; the wardrobe LOGIC comes via review/balance).
   A later j92 that defines them again simply replaces these. */
if(!window.KIT_VEIL||!window.KIT_VEIL.tierOf){
/* ---- KIT_VEIL: pearl-strand face veils by rank (hủy dung, j70 scarOf(p).veil / p.scar.veil) ----
   img/veil-t1..t8.png (480x445, transparent, gpt-2-6): one per consort rank 0..7 (Đáp ứng → Hoàng hậu), richer each step:
     t1 plain silver, pearls + pale blue/lilac glass · t2 rose silk cord, clear glass + seed pearls · t3 engraved silver, pearls + pink glass · t4 pale gold, carnelian ·
     t5 gold flower band, jade + ruby · t6 gold clouds, big pearls + emerald · t7 gold filigree, peony hooks, 2 layers + ruby + gold tassels ·
     t8 gold filigree + kingfisher blue, phoenix hooks, 3 layers, rubies + large pearls.
   Consorts t1..t8 are bead strands of the same density. Cung nữ, ma ma, lãnh cung wear a thin SILK veil: img/veil-silk-ivory.png (default) or img/veil-silk-pink.png (embroidered); tierOf: ivory for cung nữ m0–m1 and lãnh cung, pink for cung nữ m2–m4 and ma ma (owner 11/14).   img/veil.png = t5 (old name kept).
   img/veil-por.png 384x506 / veil-fig.png 385x900: t5 pre-placed for the median face (fallback only).
   img/veil-fit.json: { "<por-/fig- file>": [left%, top%, width%, height%, rotateDeg] } measured on every women's image
     (por-*: % of the 384x506 portrait OPENING, j60 .kpor geometry; fig-*: % of the figure image box). The box is for t5 (band at 16.5%).
   style(file,tier) adapts the box to each tier's own band height (band[] = band centre as a fraction of the image height),
   so the band always sits on the nose bridge under the eyes and the strands end a little past the chin.
   Kit use: <img src="${KIT_VEIL.src(KIT_VEIL.tierOf(p))}" style="position:absolute;${KIT_VEIL.style(file,tier)}"> above the portrait,
   above KIT_SCAR, below the frame. */
window.KIT_VEIL={tiers:["t1","t2","t3","t4","t5","t6","t7","t8","silk-ivory","silk-pink"],silk:"silk-ivory",band:{t1:.166,t2:.171,t3:.155,t4:.18,t5:.169,t6:.144,t7:.128,t8:.11,silk:.153,"silk-ivory":.153,"silk-pink":.16},B0:.165,
 por:"img/veil-por.png",fig:"img/veil-fig.png",fitUrl:"img/veil-fit.json",fit:null,
 src:function(t){if(t==="silk")t=this.silk;t=this.band[t]!=null?t:"t5";return `img/veil-${t}.png`},
 on:function(p){try{return !!(p&&p.scar&&p.scar.veil)}catch(e){return false}},
 tierOf:function(p){try{if(!p)return "t5";const rr=typeof personRoleRank==="function"?personRoleRank(p):null;
   if(rr){if(rr.role==="cold")return "silk-ivory";if(rr.role==="mama")return "silk-pink";if(rr.role==="maid")return (rr.rank|0)>=2?"silk-pink":"silk-ivory";if(rr.role==="player"||rr.role==="consort")return "t"+(Math.max(0,Math.min(7,rr.rank|0))+1);if(rr.role==="thaihau")return "t8"}
   if(p.cold||p.lanh)return KIT_VEIL.silk;const r=typeof rkOf==="function"?rkOf(p):p.rank;return r!=null?"t"+(Math.max(0,Math.min(7,r|0))+1):"t5"}catch(e){return "t5"}},
 rect:function(file,tier){const n=String(file||"").split("/").pop();const r=this.fit&&this.fit[n];if(!r)return null;const b=this.band[tier]!=null?this.band[tier]:this.band.t5;
   const bandY=r[1]+this.B0*r[3],h=r[3]*(1-this.B0)/(1-b);return [r[0],+(bandY-b*h).toFixed(2),r[2],+h.toFixed(2),r[4],b]},
 style:function(file,tier){const r=this.rect(file,tier||"t5");if(!r)return "";return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]}deg);transform-origin:50% ${(r[5]*100).toFixed(1)}%`},
 load:function(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.fitUrl).then(r=>r.ok?r.json():null).then(j=>{if(j)KIT_VEIL.fit=j}).catch(()=>{})}catch(e){}}};
try{KIT_VEIL.load()}catch(e){}
/* ---- KIT_SCAR: hủy dung scratch marks drawn ON the face (game-style brush strokes, crimson, soft edge, semi-transparent) ----
   img/scar-1|2|3.png (320x320 transparent): 1 / 2 / 3 strokes = nhẹ / vừa / nặng (j70 SCAR70 sev 1..3).
   img/scar-fit.json: { "<por-/fig- file>": [left%, top%, width%, height%, rotateDeg] }, same boxes as veil-fit.json
   (por-*: % of the 384x506 opening; fig-*: % of the figure image), on the cheek facing the viewer, rotated with the face.
   Layer order: portrait < scar < veil (the strokes show faintly through the pearl strands) < frame.
   on(p): only when the player KNOWS (true information): herself, or j70 knows(p) (same rule as the scar chip). */
window.KIT_SCAR={src:function(sev){return `img/scar-${Math.max(1,Math.min(3,sev|0))}.png`},names:["","nhẹ","vừa","nặng"],fitUrl:"img/scar-fit.json",fit:null,origin:"50% 50%",
 on:function(p){try{if(!p||!p.scar)return false;return (typeof S!=="undefined"&&p===S)||(typeof knows==="function"&&!!knows(p))}catch(e){return false}},
 of:function(p){if(!this.on(p))return null;const sev=p.scar.sev|0;return{sev,src:this.src(sev),label:`Hủy dung (${this.names[sev]||""})`}},
 rect:function(file){const n=String(file||"").split("/").pop();return this.fit&&this.fit[n]||null},
 style:function(file){const r=this.rect(file);if(!r)return "";return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]}deg);transform-origin:${this.origin}`},
 load:function(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.fitUrl).then(r=>r.ok?r.json():null).then(j=>{if(j)KIT_SCAR.fit=j}).catch(()=>{})}catch(e){}}};
try{KIT_SCAR.load()}catch(e){}
}
/* ---------- 7. VEIL + SCAR OVERLAYS (review/wardrobe j92: KIT_VEIL / KIT_SCAR, placed per picture from img/veil-fit.json / scar-fit.json) ----------
   Layer order everywhere: portrait < scar strokes < veil < frame. The scar shows ONLY when the player knows (KIT_SCAR.on: herself, or j70 knows(p),
   or p.scar.known); a veil is worn in public, so it shows to everyone who sees the face (never on the grey "Người lạ" silhouette).
   Places: stage figures (.kfxf box laid exactly over the figure image) + the mirror close-up. AVATAR frames (tall, small, kfc, lists, cards) no longer get an
   overlay at all: they show the photo with the LASTING marks baked in (KIT_LASTING / KIT_BAKE below, owner 17/11 ~18:10Z). A picture without fit data gets nothing (never a guessed position). ---------- */
kitVeiled=function(){return false};
function kitVeilOn(p){try{if(!p)return false;if(window.KIT_VEIL&&typeof KIT_VEIL.on==="function"&&KIT_VEIL.on(p))return true;if(typeof scarOf==="function"){const s=scarOf(p);return !!(s&&s.veil)}}catch(e){}return false}
function kitScarOf(p){try{if(!p||!p.scar||!window.KIT_SCAR)return null;const on=KIT_SCAR.on(p)||!!p.scar.known;if(!on)return null;const sev=Math.max(1,Math.min(3,p.scar.sev|0||1));return{sev,src:KIT_SCAR.src(sev)}}catch(e){return null}}
const kitFxVars=st=>st.replace(/(^|;)\s*(left|top|width|height|transform|transform-origin):/g,(m,a,k)=>`${a}--f${k.replace('transform-origin','to').replace('transform','tf')}:`);
function kitFxLayers(p,file){if(!p||!file)return"";let h="";const sc=kitScarOf(p);if(sc&&window.KIT_SCAR){const st=KIT_SCAR.style(file);if(st)h+=`<img class="kscar" src="${sc.src}" alt="" aria-hidden="true" style="${kitFxVars(st)}" onerror="this.remove()">`}
 if(kitVeilOn(p)&&window.KIT_VEIL&&KIT_VEIL.style){const t=KIT_VEIL.tierOf(p);const st=KIT_VEIL.style(file,t);if(st)h+=`<img class="kveil2" src="${KIT_VEIL.src(t)}" alt="" aria-hidden="true" style="${kitFxVars(st)}" onerror="this.remove()">`}return h}
const kitFile=src=>String(src||"").split("?")[0].split("/").pop();
/* ---------- AVATAR = ID CARD (owner 17/11 ~18:10Z, OD "Avatar … cái thẻ nhân viên"; review/kit-fx-register) ----------
   EVERY avatar-class frame (pcp tall, span.md / kmini / kfc, list rows, cards, pickers: everything made by pcPort / mdH) shows the BASE PORTRAIT +
   LASTING marks only (hủy dung scar; plug-in point KIT_LASTING.add for pox scars etc.). NO makeup, NO temporary marks (slap, rash, pallor, poison, ink…).
   The lasting marks are BAKED with the photo into ONE image (canvas -> blob URL, cached per picture + marks + size, scaled by the browser like any
   photo) — there is no overlay box any more, so no registration error is possible. A person without a lasting mark gets the plain photo (no cost).
   Stage figures + the mirror close-up keep the full look (kitFxLayers / kitFxPut, unchanged). ---------- */
window.KIT_LASTING={list:[],add:function(d){if(!d||!d.id)return;this.list=this.list.filter(x=>x.id!==d.id);this.list.push(d)},
 /* layers of person p on picture file: [{id,src,rect:[l,t,w,h,deg],o:[ox,oy]}] (rect = % of the WHOLE picture, the scar-fit / veil-fit rows) */
 of:function(p,file){const out=[];if(!p||!file)return out;for(const d of this.list){let r=null;try{r=d.layers(p,file)}catch(e){r=null}if(r&&r.length)out.push(...r)}return out}};
KIT_LASTING.add({id:"scar",layers:(p,file)=>{const sc=kitScarOf(p);if(!sc||!window.KIT_SCAR||!KIT_SCAR.rect)return null;const r=KIT_SCAR.rect(file);if(!r)return null;return[{id:"scar"+sc.sev,src:sc.src,rect:r.slice(0,5),o:[.5,.5],alpha:.85}]}});
const KIT_BAKE={cache:{},order:[],pend:{},W:{tall:384,sm:192},max:80,
 key:function(p,file,kind){const L=KIT_LASTING.of(p,file);if(!L.length)return"";return file+"|"+kind+"|"+L.map(l=>l.id+":"+l.rect.join(",")).join(";")},
 /* the src to print into the avatar <img> + an attribute that lets the finished bake replace it */
 pick:function(p,url,kind){try{const file=kitFile(url);const k=this.key(p,file,kind||"sm");if(!k)return{src:url,attr:""};const c=this.cache[k];if(c){this.touch(k);return{src:c,attr:` data-kbk="${k.replace(/"/g,"")}"`}}
   this.make(k,p,url,file,kind||"sm");return{src:url,attr:` data-kbk="${k.replace(/"/g,"")}"`}}catch(e){return{src:url,attr:""}}},
 touch:function(k){const i=this.order.indexOf(k);if(i>=0)this.order.splice(i,1);this.order.push(k)},
 make:function(k,p,url,file,kind){if(this.pend[k])return;this.pend[k]=1;const L=KIT_LASTING.of(p,file);const abs=/^(https?:|blob:|data:)/.test(url)?url:(typeof IMG_U==="function"?IMG_U(url):url);
  const load=src=>new Promise((ok,no)=>{const im=new Image();im.crossOrigin="anonymous";im.decoding="async";im.onload=()=>ok(im);im.onerror=()=>no(0);im.src=src});
  Promise.all([load(abs),...L.map(l=>load(/^(https?:|blob:|data:)/.test(l.src)?l.src:(typeof IMG_U==="function"?IMG_U(l.src):l.src)))]).then(([ph,...ls])=>{
   const nw=ph.naturalWidth,nh=ph.naturalHeight,K=Math.min(1,this.W[kind]/nw),W=Math.max(1,Math.round(nw*K)),H=Math.max(1,Math.round(nh*K));const cv=document.createElement("canvas");cv.width=W;cv.height=H;const g=cv.getContext("2d");g.imageSmoothingQuality="high";g.drawImage(ph,0,0,W,H);
   ls.forEach((im,i)=>{const l=L[i],r=l.rect,x=r[0]/100*W,y=r[1]/100*H,w=r[2]/100*W,h=r[3]/100*H;g.save();g.globalAlpha=l.alpha==null?1:l.alpha;g.translate(x+w*l.o[0],y+h*l.o[1]);g.rotate((r[4]||0)*Math.PI/180);g.drawImage(im,-w*l.o[0],-h*l.o[1],w,h);g.restore()});
   cv.toBlob(b=>{delete this.pend[k];if(!b)return;const u=URL.createObjectURL(b);this.cache[k]=u;this.touch(k);while(this.order.length>this.max){const o=this.order.shift(),ou=this.cache[o];delete this.cache[o];setTimeout(()=>{try{URL.revokeObjectURL(ou)}catch(e){}},60000)}
    document.querySelectorAll("img[data-kbk]").forEach(e=>{if(e.getAttribute("data-kbk")===k.replace(/"/g,"")&&e.src!==u)e.src=u})},"image/webp",.92)}).catch(()=>{delete this.pend[k]})}};
window.KIT_BAKE=KIT_BAKE;
(function(){const p0=pcPort;pcPort=function(f){let h=p0.apply(this,arguments);try{const p=f&&f.__kp;if(!p||!/class="kpor"/.test(h))return h;const m=/<img class="kpor" src="([^"]+)"/.exec(h);if(!m||/face-|unknown/.test(m[1]))return h;
  const b=KIT_BAKE.pick(p,m[1],"tall");if(b.attr)h=h.replace(m[0],`<img class="kpor"${b.attr} src="${b.src}"`)}catch(e){}return h}})();
(function(){const m0=mdH;mdH=function(p){let h=m0.apply(this,arguments);try{const q=p&&p.__kp;if(!q)return h;const m=/<img([^>]*?)src="([^"]*por-[^"]+)"/.exec(h);if(!m)return h;
  const b=KIT_BAKE.pick(q,m[2],"sm");if(b.attr)h=h.replace(m[0],`<img${m[1]}${b.attr.trim()} src="${b.src}"`)}catch(e){}return h}})();
/* kitFxPut(img,p,host): lay the face layers of person p over the DRAWN picture img inside host (room stage, podium, any figure) */
function kitFxPut(img,p,host){{if(!img||!p||(typeof kitIsKnown==="function"&&!kitIsKnown(p)))return;const fx=kitFxLayers(p,kitFile(img.currentSrc||img.src));if(!fx)return;const s=document.createElement("span");s.className="kfxf";s.innerHTML=fx;
  /* lay the box over the DRAWN picture: object-fit contain/cover + object-position, and the image's own transform (kit owner #2: the veil sat beside the face) */
  const cs=getComputedStyle(img);const L0=img.offsetLeft,T0=img.offsetTop,bw=img.offsetWidth,bh=img.offsetHeight;let L=L0,T=T0,w=bw,h=bh;const nw=img.naturalWidth,nh=img.naturalHeight;
  if(nw&&nh&&/contain|cover|scale-down/.test(cs.objectFit)){const k=cs.objectFit==="cover"?Math.max(bw/nw,bh/nh):Math.min(bw/nw,bh/nh,cs.objectFit==="scale-down"?1:99);w=nw*k;h=nh*k;
   const op=(cs.objectPosition||"50% 50%").split(/\s+/);const f=(v,free)=>/%$/.test(v)?free*parseFloat(v)/100:/px$/.test(v)?parseFloat(v):/left|top/.test(v)?0:/right|bottom/.test(v)?free:free/2;
   L+=f(op[0]||"50%",bw-w);T+=f(op[1]||"50%",bh-h)}
  const to=(cs.transformOrigin||"").split(/\s+/).map(parseFloat);const tor=to.length>=2&&!isNaN(to[0])?`${to[0]-(L-L0)}px ${to[1]-(T-T0)}px`:"50% 50%";
  s.style.cssText=`position:absolute;pointer-events:none;z-index:2;left:${L}px;top:${T}px;width:${w}px;height:${h}px;transform:${cs.transform};transform-origin:${tor}`;img.classList.add("kfxon");host.appendChild(s)}}
function kitFigFx(){try{const st=$("stage");if(!st)return;st.querySelectorAll(".kfxf").forEach(e=>e.remove());const ppl=typeof curPeople==="function"?curPeople():[];const put=kitFxPut;
 /* the person of a place token: its ref, or (Hoàng thượng, Thái hậu, cung nữ thân tín, thái y) the one KIT_FACEFX person lookup */
 st.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];put(b.querySelector("img.figimg"),p&&(p.ref||(window.KIT_FACEFX?KIT_FACEFX.person(p):null)),b)});
 const me=$("mefig");if(me&&typeof S!=="undefined")put(me,S,me.parentElement)}catch(e){}}
(function(){const k0=kitStageScale;kitStageScale=function(){const r=k0.apply(this,arguments);try{kitFigFx()}catch(e){}return r}})();
/* the fit tables load asynchronously: redraw once both are in */
(function(){let n=0;const chk=()=>{if(window.KIT_VEIL&&KIT_VEIL.fit&&window.KIT_SCAR&&KIT_SCAR.fit){try{if(typeof S!=="undefined"&&S&&!S.dead&&typeof render==="function"&&!Q.length)render()}catch(e){}return}if(++n<40)setTimeout(chk,250)};setTimeout(chk,300)})();
(function(){const st=document.createElement("style");st.id="k2b-fx";st.textContent=`
.kfx>img,.kfxf>img,.pcp.kit .kin .kfx>img,span.md.kmini.kmini .kfx>img{position:absolute!important;inset:auto!important;display:block!important;left:var(--fleft)!important;top:var(--ftop)!important;width:var(--fwidth)!important;height:var(--fheight)!important;transform:var(--ftf,none)!important;transform-origin:var(--fto,50% 50%)!important;max-width:none!important;max-height:none!important;min-width:0!important;object-fit:fill!important;border-radius:0!important;pointer-events:none;mask-image:none!important;-webkit-mask-image:none!important}
.kfx>img.kscar,.kfxf>img.kscar{opacity:.85}
img.figimg.kfxon,#mefig.kfxon{animation:none!important}
`;document.head.appendChild(st)})();

/* ---------- 8. OWNER 11/14 (2): the stage is for the room and the people. The Trong cung block and the Tư chất block leave the stage:
   Tư chất lives in the status sheet ("▾ Tư chất"); Thái hậu and Hoàng hậu get small chips beside the Hoàng thượng chip in the header
   (mini kit frame, title, mood; tap = card). The full Trong cung table stays in the status sheet (26.4). ---------- */
kitCourtStage=function(){const o=$("kcourt");if(o)o.remove()};
(function(){const k0=khStage;khStage=function(){const o=$("kstat");if(o)o.remove();try{kitCourtStage()}catch(e){}}})();
/* old header court chips (.kcchips/.kcbox) RETIRED (review fold-layout FAIL 4): the court chips are ONE component, the stage plaques .k3c
   (jk3 k3court). kitCourtChips only cleans up a leftover box from an older build. */
function kitCourtChips(){try{const c=$("kcchips");if(c)c.remove();const box=$("kcbox"),emp=$("emp");if(box){if(emp)box.parentNode.insertBefore(emp,box);box.remove()}}catch(e){}}

/* ---------- 9. ONE FRAME (owner 11/14 B + C): every portrait frame in the game — big card, dialog, small frames in strips, HUD, podium, week
   book, chips — is built by ONE function, pcPort (j60 layers on the 550x1037 canvas); mdH(face,size) now calls the same pcPort and shows the
   same cell (whole canvas y 0–1037: crest room + photo window + band + jade pendant + tassel, owner 15/11 06:35Z) at a smaller width. So the rank crest (phoenix, dragon, Thái hậu…) shows whole
   at every size, and a change to the frame shows everywhere.
   C: (1) the portrait is cut tighter: the por picture is 1.14x the window, raised 5 % of its height, clipped to the window (head near the top
   edge, person larger); (2) every rank/role has its own crest on the top bar (img/kit/crest-<key>.webp, gpt-2-6, one style reference: the
   approved Hoàng hậu frame), smaller for low ranks; Hoàng hậu, Hoàng thượng, Thái hậu and Thái tử keep the crest painted in their frame. ---------- */
window.KIT_CREST={ar:{"consort-0":.329,"consort-1":.337,"consort-2":.538,"consort-3":.506,"consort-4":.569,"consort-5":.554,"maid-0":.483,"maid-1":.467,"maid-2":.521,"maid-3":.481,"maid-4":.479,"mama-0":.263,"mama-1":.283,"mama-2":.317,"mama-3":.423,"mama-4":.419,"eunuch":.283,"unknown":.254},
 /* owner 11/15 04:20Z + 05:45Z ("còn nguyên chỗ hở", "mấy góc trên rối"): every crest's SOLID base (measured: the lowest row ≥ 25 % of its
    widest row) sits 6 canvas units BELOW the bar line, overlapping the frame top like a real crown piece; widths of consort-2..5 stay clear of
    the frame's own corner ornaments (x 115–435) so crest and corners never pile up */
 base:{"consort-0":.95,"consort-1":.95,"consort-2":.667,"consort-3":.577,"consort-4":.637,"consort-5":.627,"maid-0":.96,"maid-1":.96,"maid-2":.86,"maid-3":.93,"maid-4":.72,"mama-0":.89,"mama-1":.9,"mama-2":.81,"mama-3":.8,"mama-4":.75,"eunuch":.9,"unknown":.97},
 w:{"consort-0":300,"consort-1":310,"consort-2":318,"consort-3":322,"consort-4":326,"consort-5":330,"maid-0":190,"maid-1":205,"maid-2":220,"maid-3":235,"maid-4":250,"mama-0":250,"mama-1":266,"mama-2":282,"mama-3":298,"mama-4":314,"eunuch":280,"unknown":300},W:380,
 /* y of the line the crest stands on (canvas units): the frame's top bar; maids: the top of the silk bow painted on their frame */
 bar:{"consort-0":191,"consort-1":189,"consort-2":187,"consort-3":186,"consort-4":182,"consort-5":175,"maid":150,"mama":150,"eunuch":172,"unknown":171},BAR:172,
 key:function(frame){const m=/frame-([a-z0-9-]+)\.webp/.exec(frame||"");if(!m)return null;let k=m[1];if(/^eunuch-[012]$/.test(k))k="eunuch";return this.ar[k]?k:null},
 html:function(frame){const k=this.key(frame);if(!k)return"";const w=this.w[k]||this.W,h=w*this.ar[k],by=this.bar[k]!=null?this.bar[k]:this.bar[k.replace(/-\d$/,"")]!=null?this.bar[k.replace(/-\d$/,"")]:this.BAR,top=by-this.base[k]*h;
  return `<img class="kcrest" src="img/kit/crest-${k}.webp" alt="" aria-hidden="true" style="--cl:${((550-w)/2/550*100).toFixed(3)}%;--ct:${(top/1037*100).toFixed(3)}%;--cw:${(w/550*100).toFixed(3)}%;--ch:${(h/1037*100).toFixed(3)}%" onerror="this.remove()">`}};
(function(){const p0=pcPort;pcPort=function(f){let h=p0.apply(this,arguments);try{const m=/<img class="kfr" src="([^"]+)"/.exec(h);if(m&&!/kcrest/.test(h)){const c=KIT_CREST.html(m[1]);if(c)h=h.replace(/(<img class="kfr"[^>]*>)/,`$1${c}`)}}catch(e){}return h}})();
/* the small frame = the same pcPort cell, smaller */
(function(){const m0=mdH;mdH=function(p,cls){const h0=m0.apply(this,arguments);try{if(!p||!/class="md[^"]*\bkit\b/.test(h0))return h0;const big=pcPort(p,p.col);const a=big.indexOf('<span class="kin">');if(a<0)return h0;
  let depth=0,i=a,end=-1;const re=/<\/?span\b[^>]*>/g;re.lastIndex=a;let mm;while((mm=re.exec(big))){if(mm[0][1]==="/"){depth--;if(depth===0){end=mm.index+mm[0].length;break}}else depth++}if(end<0)return h0;
  const kin=big.slice(a,end);const om=/^<span([^>]*)>/.exec(h0);if(!om)return h0;let attrs=om[1].replace(/class="([^"]*)"/,(x,c)=>`class="${c.replace(/\bkmini\b/g,"")} kfc"`);
  return `<span${attrs}>${kin}</span>`}catch(e){return h0}}})();
(function(){const st=document.createElement("style");st.id="k2b-frame";st.textContent=`
/* C1: tighter portrait in every frame (por art only; old face-* art keeps its oval) */
.kin>img.kpor:not([src*="face-"]):not([src*="unknown"]),.pcp.kit .kin>img.kpor:not([src*="face-"]):not([src*="unknown"]){left:9.707%!important;top:17.475%!important;width:80.588%!important;height:56.285%!important;clip-path:inset(5% 6.14% 7.28% 6.14%);border-radius:0!important}
/* crest on the top bar */
.kin>img.kcrest,.pcp.kit .kin>img.kcrest:not(.kfr):not(.kgem):not(.kemb):not(.kpor){position:absolute!important;inset:auto!important;left:var(--cl)!important;top:var(--ct)!important;width:var(--cw)!important;height:var(--ch)!important;max-width:none!important;object-fit:fill!important;border-radius:0!important;z-index:3;pointer-events:none;filter:drop-shadow(0 1px 1px #0004)}
/* the small frame cell (mdH): same layers as .pcp.kit, cell = the whole canvas y 0–1037 (pendant + tassel whole, owner 15/11 06:35Z) */
span.md.kfc{position:relative!important;display:inline-block;flex:0 0 auto;width:60px!important;height:auto!important;max-height:none!important;aspect-ratio:550/1037!important;overflow:hidden!important;background:none!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:0!important;animation:none!important;transform:none!important;vertical-align:middle;font-size:0}
span.md.kfc.kfc{position:relative!important;contain:layout paint;width:60px!important;height:auto!important;min-height:0!important;aspect-ratio:550/1037!important}
span.md.kfc.kfc.kfc{box-shadow:none!important}
/* owner 11/15 17:16Z: the small frame cell is the rank frame alone on a clear ground — the old round-avatar ring (j60 .md.kit.xs box-shadow)
   drew a thin square box behind it in every list (news rows, Tuần lục, strips, person rows, gift recipients) */
span.md.kfc.kfc.kit,span.md.kfc.kfc.kit.xs,span.md.kfc.kfc.kit.sm,span.md.kfc.kfc.kit.big{box-shadow:none!important;background:none!important;border:0!important;outline:0!important}
span.md.kfc.kfc.xs,button.ka .kan span.md.kfc.kfc.xs{width:26px!important;height:auto!important;position:relative!important;display:inline-block!important}span.md.kfc.kfc.sm{width:38px!important}span.md.kfc.kfc.big{width:84px!important}
span.md.kfc>.kin{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:100%!important;transform:none!important;display:block!important;isolation:isolate}
span.md.kfc .kin>.kbg{position:absolute;left:14.655%;top:20.289%;width:70.691%;height:49.373%;background:#5a1e16 center/cover no-repeat;z-index:-1}
span.md.kfc .kin>img{position:absolute!important;right:auto!important;bottom:auto!important;max-width:none!important;max-height:none!important;border-radius:0!important;box-shadow:none!important;animation:none!important}
span.md.kfc .kin>img.kpor{left:14.655%!important;top:24.733%!important;width:70.691%!important;height:44.930%!important;object-fit:cover!important;object-position:50% 0!important}
span.md.kfc .kin>img.kpor:not([src*="face-"]):not([src*="unknown"]){left:9.707%!important;top:17.475%!important;width:80.588%!important;height:56.285%!important;clip-path:inset(5% 6.14% 7.28% 6.14%)}
span.md.kfc .kin>img.kcrest{left:var(--cl)!important;top:var(--ct)!important;width:var(--cw)!important;height:var(--ch)!important;object-fit:fill!important;z-index:3}
span.md.kfc .kin>img.kpor[src*="face-"],span.md.kfc .kin>img.kpor[src*="unknown"]{top:20.289%!important;height:49.373%!important}
span.md.kfc .kin>img.kfr{left:0!important;top:0!important;width:100%!important;height:100%!important;object-fit:fill!important;z-index:2}
span.md.kfc .kin>img.kgem{left:73.564%!important;top:64.609%!important;width:18.327%!important;height:auto!important;aspect-ratio:1;z-index:3}
span.md.kfc .kin>img.kemb,span.md.kfc .kin>.klab{display:none!important}
span.md.kfc.xs .kin>img.kgem,span.md.kfc.sm .kin>img.kgem{display:none!important}
`;document.head.appendChild(st)})();

/* ---------- 10. PERSON CARD: portrait + bars always in view (owner 11/14 D) ----------
   Left column (sticky while the card scrolls): portrait cell, name, rank, the relation/stat BARS (Ghen, Ngươi với nàng · thiện cảm, Oán,
   Nàng với ngươi, Sủng). Right column: the other facts (stat tiles, age, nature, chips), then the act-group tabs and act cards.
   Phones (< 600 px): portrait left with name/rank/bars beside it, facts and acts below; once the portrait scrolls
   out, a slim sticky strip (small frame, name, rank, the bars) stays at the top of the card. After an act the bars run from the old value
   to the new one (0.6 s; none with prefers-reduced-motion). ---------- */
const KIT_BARW={};
function kitPcFix(pc){try{if(!pc||pc.dataset.k2==="1")return;const L=pc.querySelector(":scope > .pcl"),Rr=pc.querySelector(":scope > .pcr");if(!L||!Rr)return;pc.dataset.k2="1";
 const info=L.querySelector(":scope > .pcinfo");const bars=document.createElement("div");bars.className="kpbars";const pgh=L.querySelector(":scope > .pgh");if(pgh)bars.appendChild(pgh);
 if(info)[...info.children].forEach(c=>{if(c.querySelector('.fbar,.rlab,.mini,[class*="bar"]')||/^\s*(Sủng|Ghen)\b/.test(c.textContent))bars.appendChild(c)});
 const nm=L.querySelector(":scope > .pcrk")||L.querySelector(":scope > .pcname");if(nm)nm.after(bars);else L.appendChild(bars);
 const facts=document.createElement("div");facts.className="kpfacts";if(info&&info.children.length)facts.appendChild(info);const ch=L.querySelector(":scope > .chips");if(ch)facts.appendChild(ch);
 if(facts.children.length)L.appendChild(facts)
 const name=(L.querySelector(".pcname")||{}).textContent||"";bars.querySelectorAll(".fbar>u,.mini>u").forEach((u,i)=>{const k=name+"|"+i;const nw=u.style.width;const ow=KIT_BARW[k];KIT_BARW[k]=nw;
  if(ow!=null&&ow!==nw&&!matchMedia("(prefers-reduced-motion: reduce)").matches){u.style.width=ow;u.style.transition="width .6s ease-out";requestAnimationFrame(()=>requestAnimationFrame(()=>{u.style.width=nw}))}});
 /* the slim strip for narrow cards */
 const pcp=L.querySelector(":scope > .pcp");const strip=document.createElement("div");strip.className="kpstrip";strip.setAttribute("aria-hidden","true");
 const face=pcp&&pcp.querySelector("img.kpor");strip.innerHTML=`<span class="kpsn"><b${(L.querySelector(".pcname")||{classList:{contains:()=>0}}).classList.contains("kmy")?' class="kmy"':""}>${name}</b>${nm&&nm.classList.contains("pcrk")?`<small style="${nm.getAttribute("style")||""}">${nm.innerHTML}</small>`:""}</span><span class="kpsb">${bars.innerHTML}</span>`;
 if(pcp){const mini=document.createElement("span");mini.className="kpsf";const kin=pcp.querySelector(".kin");if(kin){mini.innerHTML=`<span class="md kit kfc sm">${kin.outerHTML}</span>`}strip.prepend(mini)}
 pc.prepend(strip);const upd=()=>{pc.style.setProperty('--kpch',pc.clientHeight+'px');const pr=pc.getBoundingClientRect();const bb=bars.getBoundingClientRect();const vb=Math.min(pr.bottom,innerHeight);
  const hidden=bars.offsetParent&&(bb.top<pr.top+4||bb.bottom>vb-2);strip.classList.toggle("on",false&&!!hidden)};/* KIT §0: the page = the spread page, which never shows the sticky strip */
 pc.addEventListener("scroll",upd,{passive:true});const L2=pc.querySelector(':scope > .pcl');if(L2)L2.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);upd();setTimeout(upd,300)}catch(e){console.error("kitPcFix",e)}}
(function(){const run=()=>document.querySelectorAll(".pc:not([data-k2])").forEach(kitPcFix);const mo=new MutationObserver(()=>run());
 const go=()=>{mo.observe(document.body,{childList:true,subtree:true});run()};if(document.readyState!=="loading")go();else addEventListener("DOMContentLoaded",go)})();
(function(){const st=document.createElement("style");st.id="k2b-pcsticky";st.textContent=`
.pc>.pcl .kpbars{display:flex;flex-direction:column;gap:1px;font-size:.76rem;line-height:1.25;color:var(--dim);margin:3px 0 0}
.pc>.pcl .kpbars .fbar{width:40px}
.pc>.pcl .kpbars>*{display:flex;flex-wrap:wrap;align-items:center;gap:2px 4px}
.pc>.pcr>.kpfacts{display:flex;flex-direction:column;gap:4px;margin:0 0 8px}
.pc>.pcr>.kpfacts>.pcinfo{font-size:.8rem}
.pc>.kpstrip{display:none}

 .pc.kpwide[data-k2]{display:grid!important;grid-template-columns:var(--kpcw) minmax(0,1fr);gap:0 12px;align-items:start}
 .pc.kpwide[data-k2]>.pcl{position:sticky;top:0;z-index:2;background:var(--panel2);padding-bottom:4px;max-height:var(--kpch,none);overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}
 .pc.kpwide[data-k2]>.pcl>.pcp.kit{float:none;margin:0 0 4px!important}
 .pc.kpwide[data-k2]>.pcl{display:flex!important;flex-direction:column}
 .pc.kpwide[data-k2]>.pcl>.pcname,.pc.kpwide[data-k2]>.pcl>b:first-of-type{order:-3}.pc.kpwide[data-k2]>.pcl>.pcrk{order:-2}.pc.kpwide[data-k2]>.pcl>.kpbars{order:-1;margin:0 0 4px}
 .pc.kpwide[data-k2]>.pcr{margin-top:0}
 .pc.kpwide[data-k2]>.kpstrip{grid-column:1/-1}

/* kv: dropped @media (max-width:999px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();

/* ---------- 11. DELTA CHIPS take the whole short clause (owner 11/14: "nhà Hộ bộ thế lực −2", not "bộ thế lực −2") ----------
   Up to 6 words before the number, stopping at punctuation; linking words at the front (và, được, mất, khiến, nên…) stay outside the chip. ---------- */
const KP_DELTA2=/((?:[A-Za-zÀ-ỹĐđ]+ ){0,5}[A-Za-zÀ-ỹĐđ]+) ([+\-−])(\d+(?:[.,]\d+)?)(?![\d.,]*\d)(?!\s*[–-]\s*\d)/g;
const KP_LEAD=/^((?:(?:và|được|mất|còn|thì|là|nhưng|vì|nên|khiến|làm|cho|với|bị|có|kèm|thêm|tốn|giảm|tăng|hao|đắc|thất)\s+)+)/i;
kpChipify=function(html){return kpMapText(html,s=>s.replace(KP_DELTA2,(m,l,sg,n)=>{if(/^(năm|tháng|tuần|ngày|tuổi|lần|khắc|hồi)$/i.test(l.split(" ").pop()))return m;let pre="";const lm=KP_LEAD.exec(l);if(lm&&lm[1].length<l.length){pre=lm[1];l=l.slice(pre.length)}
 const v=(sg==="+"?1:-1)*parseFloat(n.replace(",","."));return pre+kitChip(l,v)}))};
/* wording: the contest table is "Bảng định thứ" (VANPHONG), whatever case the old text used */
try{if(window.VP&&VP.rules){VP.rules.unshift(["BẢNG ĐIỂM","Bảng định thứ"],["Bảng điểm","Bảng định thứ"],["Bảng Điểm","Bảng định thứ"]);if(VP.full){VP.full["BẢNG ĐIỂM"]="Bảng định thứ";VP.full["Bảng điểm"]="Bảng định thứ"}}}catch(e){}

/* ---------- 12. EVENT + STORY ART in the kit art frame (j89 evArtOf / stArtOf) ----------
   Panels: event choices (26.6), news ("Tin trong cung", kind news), chapter / story cards, and the result card after an event choice.
   Which picture (data only, first match): item.art (a path) · item.stArt [arc, beat, ending] → stArtOf · item.evId → evArtOf(id, salt) ·
   item.pid (+ pp.id / pp.k) → evArtOf("<pid>:<id>") · news → evArtOf("news:<title>") · else the j89 default category. A panel about a person
   (who / subject) keeps the person's portrait (section 8). The frame is kitArtFrame (same frame as act art); the label = the category title. ---------- */
/* the buổi news card (owner 11/15: "Triều chính" does not fit palace gossip): the picture of its MAIN item = the first sentence that maps
   to a scene by the week book's table (j87 KBK_EVRE: thị tẩm, có thai, tin đồn, ốm, ban thưởng…); none → no picture of its own (review/ev-art-fit: never the "people visiting" default) */
function kitNewsArtId(m){try{const t=String(m.h||"").replace(/<p class="past">[\s\S]*?<\/p>/,"");const plain=typeof kpPlain==="function"?kpPlain(t):t.replace(/<[^>]+>/g," ");
 if(typeof kbkEvId!=="function"||typeof KBK_EVRE==="undefined")return "news:"+(m.t||"");
 for(const s0 of plain.split(kRx("(?<=[.!?])\\s+",""))){const s=s0.replace(/^\s*Tai mắt (kể|thấy):\s*/i,"");if(!s.trim())continue;if(/thẻ bài[^.]*lật/i.test(s))return "sys:thi-tam";for(const [re,id] of KBK_EVRE)if(re.test(s))return id}
 return "cat:tin-cung"  /* review/ev-art-fit: no "people visiting" default (kbkEvId) — no match → the palace-news group (ev-news-tin-trong-cung) */}catch(e){return "news:"+(m.t||"")}}
function kitEvArt(m){try{if(!m||typeof evArtOf!=="function")return null;let src="",lab="";const pp=m.pp||{};const salt=(typeof S!=="undefined"&&S)?(S.year*100+S.month*3+(S.tuan||0)):0;
 if(m.art)src=m.art;else if(m.stArt&&typeof stArtOf==="function")src=stArtOf.apply(null,m.stArt);
 if(!src){const id=m.evId||(m.pid?(m.pid+(pp&&(pp.id||pp.k)?":"+(pp.id||pp.k):"")):"")||(m.kind==="news"||/Tin trong cung/.test(m.t||"")?kitNewsArtId(m):"");
  /* review/act-pics (owner 11/15 09:40Z): an id with NO event category (e.g. pid "shop") must not fall to the j89 default (Triều chính, officials
     kneeling): it gets the room she is in, for the season and buổi (j17 evArt / j94); only real event ids use evArtOf. News: kitNewsArtId (kit-close) */
  if(id&&(typeof evArtCat!=="function"||evArtCat(id))){src=evArtOf(id,salt);lab=typeof evArtTitle==="function"?evArtTitle(id):""}}
 if(!src&&(kitIsEventChoice(m)||m.kind==="news"||/Tin trong cung/.test(m.t||""))){try{src=typeof evArt==="function"?evArt():""}catch(e){src=""}}  /* no j89 default (Triều chính) as a stand-in: no room picture → no picture */return src?{src,lab:lab||""}:null}catch(e){return null}}
(function(){const s0=showModal;showModal=function(){const m=Q[0];const r=s0.apply(this,arguments);try{const M=$("modal"),dlg=M&&M.querySelector(".dlg.kpanel");const body=M&&M.querySelector("#mb > .kpb");if(!m||!dlg||!body)return r;
  if(m.placeK)return r;/* kit-size #8 (place:tgk/ttp/night MIXED): a place card already carries its ONE place picture (headArt → kitOnePic); an inherited evId (cat:hinh-phat…) must never add a 2nd event picture */
  const kind=dlg.dataset.kind||"";const want=kitIsEventChoice(m)||kind==="news"||m.art||m.stArt||m.evId||kitEvFitWant(m,kind);if(!want||body.querySelector(":scope > .kpsubj"))return r;
  const a=kitEvArt(Object.assign({kind},m));if(!a)return r;window.__kitLastEvArt=a;body.classList.add("kphas","kpinfo");body.insertAdjacentHTML("afterbegin",`<div class="kpsubj kpiart kpev">${kitSceneArt(a.src,a.lab,{shape:"tall"})}</div>`)}catch(e){console.error("kitEvArt",e)}return r}})();
/* the result card right after an event choice shows the same picture, small, left of the rows */
(function(){if(typeof runOpt!=="function"&&typeof resultShow!=="function")return;const r0=resultShow;resultShow=function(){const r=r0.apply(this,arguments);try{const a=window.__kitLastEvArt;window.__kitLastEvArt=null;const t=$("rtoast");if(a&&t&&!t.querySelector(".kpev")){t.classList.add("kevres");t.insertAdjacentHTML("afterbegin",`<div class="kpev kpevr">${kitSceneArt(a.src,a.lab,{shape:"tall",cap:false})}</div>`)}else if(t&&!a){t.classList.remove("kevres");const o=t.querySelector(".kpevr");if(o)o.remove()}}catch(e){}return r}})();
(function(){const c0=closeModal;closeModal=function(){const m=Q[0];const r=c0.apply(this,arguments);try{if(!(m&&kitIsEventChoice(m)))window.__kitLastEvArt=null}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="k2b-evart";st.textContent=`
#rtoast.kevres{display:grid!important;grid-template-columns:84px minmax(0,1fr);column-gap:10px;align-items:start}
#rtoast.kevres>:not(.kpevr){grid-column:2}
#rtoast.kevres>.kpevr{grid-column:1;grid-row:1/span 9;width:84px;height:124px}
#rtoast.kevres>.kpevr>.ksart,.kpsubj.kpev>.ksart{width:100%;height:100%;aspect-ratio:auto}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();

/* ---------- 13. IDENTITY CARD (owner 11/14 item 6): the origin picture is no longer the backdrop; it sits in an art frame like the event art
   (landscape: frame left, facts right; portrait / Fold: frame on top, facts below). The whole screen wears ONE shared reincarnation
   background, img/bg-reborn-p.webp (portrait) / bg-reborn-l.webp (landscape), gpt-2-6, no people. Her full-body figure still stands on it. ---------- */
function kitRebornBg(){try{const M=$("modal");if(!M)return;if(!M.dataset.obg){if(M.dataset.kbd==="reborn")kitBackdrop(M,null);return}
 M.style.removeProperty("background");kitBackdrop(M,"reborn");M.dataset.kreborn="1"}catch(e){}}  /* art: jbd KIT_BD.reborn */
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kitRebornBg()}catch(e){}return r}})();
addEventListener("resize",()=>{clearTimeout(window.__krbT);window.__krbT=setTimeout(kitRebornBg,120)});
try{const M0=$("modal");if(M0)new MutationObserver(()=>{if(M0.dataset.obg?(M0.dataset.kbd!=="reborn"||M0.style.background):M0.dataset.kbd==="reborn")kitRebornBg()}).observe(M0,{attributes:true,attributeFilter:["style","data-obg"]})}catch(e){}
function kitOriginArt(k){return `img/bg-origin-${k}.webp`}
/* kitSceneArt — THE PICTURE FRAME (owner 11/14 19:10Z + 19:30Z, KIT.md 28.17): ONE simple frame for every NON-PERSON picture — identity origin,
   events, news, Mệnh truyện chapters, result card, origin wheel tiles, act-card art, info/rule art, skill art. Thin gold line + hairline;
   no crest, no tassel (tassels and rank crests belong to PEOPLE portraits only: pcPort / pframe). kitArtFrame now draws this frame too.
   o.shape "wide" (16:9; a card's top band) or "tall" (3:4; ev-* / st-* / act-* / info-* art). o.fb fallback src, o.col category colour
   (frame line + small category chip = label), o.cap false = no caption. o.mark = corner seal src (28.19b), o.markAlt its text. */
function kitOriginWide(k){return `img/origin-wide-${k}.webp`}
/* o.size "thumb" = small square tile (28.19) */
function kitSceneArt(src,label,o){o=o||{};const sh=o.shape==="tall"?"tall":"wide";const fb=o.fb?String(o.fb).replace(/'/g,""):"";
 const err=fb?`if(this.dataset.fb!=='1'){this.dataset.fb='1';this.src='${fb}'}else this.remove()`:"this.remove()";const lab=label?String(label).replace(/"/g,"&quot;"):"";
 return `<figure class="ksart ksart-${sh}${o.size==="thumb"?" ksart-thumb":""}${o.col?" ksart-cat":""}${o.cls?" "+o.cls:""}"${lab?` title="${lab}"`:""}${o.col?` style="--kcc:${o.col}"`:""}>`+
  (lab?`<span class="ksart-ph">${label}</span>`:"")+(src?`<img src="${src}" alt="" loading="lazy" onerror="${err}">`:"")+
  (label&&o.cap!==false?(o.col?`<em class="ksart-chip">${label}</em>`:`<figcaption>${label}</figcaption>`):"")+
  (o.mark?`<i class="ksart-mark" role="img" aria-label="${o.markAlt?String(o.markAlt).replace(/"/g,"&quot;"):""}" style="background-image:url('${String(o.mark).replace(/["'()]/g,"")}')"></i>`:"")+`</figure>`}
(function(){const st=document.createElement("style");st.id="k-sceneart";st.textContent=`
.ksart{position:relative;margin:0;display:block;width:100%;overflow:hidden;border-radius:4px;background:#efe4cf;
 border:1px solid var(--gold,#8f5f0c);box-shadow:inset 0 0 0 2px #fffaf0,inset 0 0 0 3px #e6d3ac}
.ksart-wide{aspect-ratio:16/9}.ksart-tall{aspect-ratio:3/4}
/* 28.19b corner mark (review/mood-dialog): o.mark = a small seal (the mood seal img/kit/emo-*.webp) in the TOP-RIGHT corner of the picture */
/*   a background layer, not an <img>: the many "picture fills its frame" img rules of the slots (.kdpban, .kaart…) never stretch it */
.ksart>i.ksart-mark{position:absolute;top:6px;right:6px;width:clamp(46px,24%,88px);aspect-ratio:1;background:center/contain no-repeat;z-index:3;filter:drop-shadow(0 1px 2px #000a);pointer-events:none}
.ksart.ksart-thumb>i.ksart-mark{top:2px;right:2px;width:52%}/* owner 11/16 15:10Z 7.2: the round mood mark on picture corners a bit BIGGER (was 17 % / 40 %) */
/* size "thumb" (tabs-kit r7, KIT 28.19): the same frame as a small square tile beside text (skill / chapter / empty cards): --ksth (64 px; 56 px
   on phones), 2 px mat, never stretched by its slot */
.ksart.ksart-thumb{width:var(--ksth,64px);height:var(--ksth,64px);aspect-ratio:1;flex:0 0 auto;box-shadow:inset 0 0 0 1px #fffaf0,inset 0 0 0 2px #e6d3ac}
.ksart.ksart-thumb>img{inset:2px;width:calc(100% - 4px);height:calc(100% - 4px)}
.ksart.ksart-thumb>.ksart-ph{inset:2px;font-size:.6rem;padding:2px}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
.ksart>img{position:absolute;inset:3px;width:calc(100% - 6px);height:calc(100% - 6px);object-fit:cover;display:block;border-radius:2px;max-width:none}
.ksart-ph{position:absolute;inset:3px;display:grid;place-items:center;text-align:center;padding:6px;font:700 .8rem/1.25 var(--display,serif);color:#fff3d8;
 background:linear-gradient(#5a3a1acc,#2a1a12cc),url(img/kit/bg-default.webp) center/cover;border-radius:2px}
.ksart-cat{border-color:var(--kcc);box-shadow:inset 0 0 0 2px #fffaf0,inset 0 0 0 3px var(--kcc)}
.ksart-chip{position:absolute;left:50%;bottom:6px;transform:translateX(-50%);z-index:2;font-style:normal;font-size:.66rem;font-weight:700;color:#fff;
 background:var(--kcc);padding:1px 8px;border-radius:9px;white-space:nowrap;box-shadow:0 1px 3px #0006}
/* containers that used the ornate frame: the picture fills the slot; the act / info slot takes the art's own 3:4 shape */
:root{--kah:calc(var(--kaw) * 4 / 3)}
.kaart>.ksart,.kpiart>.ksart,.kskart>.ksart,.kpsubj.kpev>.ksart{width:100%;height:100%;aspect-ratio:auto}
button.ka.kdis .kaart>.ksart{filter:grayscale(.7);opacity:.8}
.ksart>figcaption{position:absolute;left:3px;bottom:3px;max-width:calc(100% - 6px);padding:2px 10px 3px 8px;font:600 .74rem/1.25 var(--display,serif);color:#fffaf0;
 background:linear-gradient(90deg,#2a1a12c0,#2a1a1288 70%,#2a1a1200);border-radius:0 0 0 2px;white-space:normal}
`;document.head.appendChild(st)})();
(function(){if(typeof kpIdentity!=="function")return;const k0=kpIdentity;kpIdentity=function(M,m){const r=k0.apply(this,arguments);try{const id=$("mb").querySelector(".kpid");const o=S&&S.origin;if(id&&o&&!id.querySelector(":scope > .kpidart")){
  const d=document.createElement("div");d.className="kpidart";d.innerHTML=kitSceneArt(kitOriginWide(o.k),o.n,{shape:"wide",fb:kitOriginArt(o.k),cls:"kidart",cap:false});id.prepend(d)}}catch(e){console.error("kpidart",e)}return r}})();
(function(){const st=document.createElement("style");st.id="k2b-identity";st.textContent=`
.dlg.kpsc .kpb.kpid{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:8px!important;align-items:start}
.dlg.kpsc .kpb.kpid>.kpsubj{display:none!important}
/* origin picture = a wide band across the top of the card (kitSceneArt), height capped so the choices stay on screen */
.dlg.kpsc .kpid>.kpidart{width:100%;position:relative}
.dlg.kpsc .kpid>.kpidart>.ksart{aspect-ratio:auto;height:clamp(84px,calc(19*var(--kvh,1dvh)),190px)}
/* kv3:.kv1 */:where(.kv1) .dlg.kpsc .kpid>.kpidart>.ksart{height:clamp(84px,calc(14*var(--kvh,1dvh)),190px)}/* r3: the one-page card scrolls in a short area (the pinned choices take most of it): the picture leaves room for the name + age line above the sticky strip */
.dlg.kpsc .kpid>.kpidart>.ksart>img{object-position:center 45%}
/* the two choices never leave the screen (owner 11/14: "Đổi thân phận (−100…" was cut at 686x880): the body scrolls under them */
.modal.kpscene .dlg.kpsc.kfpon>#mb{overflow-y:auto!important;overscroll-behavior:contain}
.dlg.kpsc>#mb>.kpscopts{position:sticky;bottom:0;z-index:9;margin:4px 0 0!important;padding:6px 0 8px;background:linear-gradient(rgba(255,250,240,0),rgba(255,250,240,.97) 8px);box-shadow:0 -1px 0 #e6d3ac}
.dlg.kpsc>#mb>.kpscopts .kan{white-space:normal}
`;document.head.appendChild(st)})();

/* ---------- 14. kitRoulette — LUÂN HỒI, face-down pick (owner 11/14 item 6b approved; owner 11/15 04:00Z: cards face-down, pick blindly).
   The origin is already rolled (j52 seed + j69 weights); the cards only show it, so the odds never change. Steps (owner, binding):
   1) all origins FACE-UP on the reincarnation background (art frame, name, honest rarity chip; chips share one baseline per row) + "Tiếp";
   2) "Tiếp" → every card flips face-down (painted card back img/kit/card-back.webp) and the deck is SHUFFLED (cards gather to the centre and
      deal back to new places, twice); 3) she taps one card → it glows, moves to the centre enlarged and flips over: the rolled origin;
   4) "Tiếp" → the revealed picture flies into the identity card's art frame while the card slides in. "Bỏ qua" (always there) ends at once.
   prefers-reduced-motion / Cảnh động off: same steps, no motion (instant flips, no shuffle travel). API:
   kitRoulette({items:[{k,src,wide,name,rare}], target:k, toEl:()=>element, done:fn}). Test state: window.__kroulStep (0 up · 1 shuffling · 2 pick · 3 shown). ---------- */
const KIT_OW=BAL.orig.ow;/* ONE CORE: the j69 roulette weights (no private copy) */
const KIT_CARDBACK="img/kit/card-back.webp";
function kitRare(k){try{if(typeof ow69Rare==="function")return ow69Rare(k)}catch(e){}const w=KIT_OW[k]||10;return w<=BAL.rareLv[0]?"Rất hiếm":w<=BAL.rareLv[1]?"Hiếm":"Thường gặp"}
/* ONE origin card face (front): art frame + name + rarity chip pinned to the bottom (kit rule: chips of a row share one baseline) */
function kitOriginFace(it){return `<div class="kra">${kitSceneArt(it.wide||it.src,"",{shape:"wide",fb:it.src})}</div><span class="krn">${it.name}</span><span class="krr">${typeof kitChip==="function"?kitChip(it.rare,"n"):it.rare}</span>`}
/* ONE FIT for every origin / identity card grid (owner 16/11 s23: "to ra, trải dài hết cái màn nền"): the cards grow to span the background width
   (side margin kept, title + moon wheel above, Tiếp / Bỏ qua below), picture + text scale with the card (--krw), ONE gap (--krgap) between cards,
   rows and the title / buttons. Columns (2..5) and card width are found by measuring: the widest card for which title + rows + buttons fit the screen. */
const KIT_ROU_MAXW=300,KIT_ROU_MINW=72;
function kitRouFit(ov){try{const box=ov.querySelector(".krbox"),grid=ov.querySelector(".krgrid");if(!box||!grid)return;const tiles=[...grid.querySelectorAll(".krt")];if(!tiles.length)return;
 const W=innerWidth,H=innerHeight,side=Math.round(Math.max(14,Math.min(72,W*.05))),G=Math.round(Math.max(10,Math.min(20,Math.min(W,H)*.016))),pad=Math.round(Math.max(8,Math.min(24,H*.02)));
 ov.style.setProperty("--krside",side+"px");ov.style.setProperty("--krgap",G+"px");ov.style.setProperty("--krpad",pad+"px");
 const availW=W-2*side,set=(c,w)=>{ov.style.setProperty("--krw",w+"px");grid.style.width=(c*w+(c-1)*G)+"px";tiles.forEach(t=>t.style.height="");const hh=Math.max(...tiles.map(t=>t.offsetHeight));tiles.forEach(t=>t.style.height=hh+"px");return box.offsetHeight};/* equal card heights count in the fit */
 const opts=[];for(const c of [5,4,3,2]){if(c>2&&c>tiles.length)continue;let hi=Math.min(KIT_ROU_MAXW,Math.floor((availW-(c-1)*G)/c)),lo=KIT_ROU_MINW;if(hi<lo)continue;
  if(set(c,hi)<=H){opts.push({c,w:hi});continue}
  if(set(c,lo)>H)continue;while(hi-lo>1){const m=(hi+lo)>>1;if(set(c,m)<=H)lo=m;else hi=m}opts.push({c,w:lo})}
 if(!opts.length){set(3,KIT_ROU_MINW);return}
 const th=(typeof kitView==="function"&&kitView().pages===2)?.7:.85,mw=Math.max(...opts.map(x=>x.w)),pick=opts.filter(x=>x.w>=mw*th).reduce((x,y)=>y.c>x.c?y:x);/* fewest rows among the (almost) widest: the title + moon wheel stay visible */set(pick.c,pick.w);
 ov.dataset.krc=pick.c;ov.dataset.krw=pick.w}catch(e){console.error("kitRouFit",e)}}
function kitRoulette(o){const done=()=>{try{o.done&&o.done()}catch(e){}};if(!o||!o.items||!o.items.length){done();return}
 const rm=matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false);
 const old=$("kroul");if(old)old.remove();const ov=document.createElement("div");ov.id="kroul";ov.className="kroul"+(rm?" krrm":"");const land=kitView().pages===2;
 const items=o.items.slice();
 ov.innerHTML=`<div class="krbox"><div class="krhead"><b>Luân hồi</b><small class="krsub">Các thân phận trong vòng luân hồi</small></div>
  <div class="krgrid">${items.map((it,i)=>`<div class="krt" data-i="${i}" data-k="${it.k}"><div class="krc"><div class="krf">${kitOriginFace(it)}</div><div class="krb" aria-hidden="true"></div></div></div>`).join("")}</div>
  <div class="krbar"><button class="kbtn krgo" type="button">Tiếp</button><button class="kbtn alt krskip" type="button">Bỏ qua</button></div></div>`;
 kitBackdrop(ov,"roulette");document.body.appendChild(ov);kitRouFit(ov);const rf=()=>{if(document.body.contains(ov)&&!picked)kitRouFit(ov)};addEventListener("resize",rf);try{document.fonts&&document.fonts.ready.then(rf)}catch(e){}
 const grid=ov.querySelector(".krgrid"),sub=ov.querySelector(".krsub"),go=ov.querySelector(".krgo");
 let tiles=[...ov.querySelectorAll(".krt")];let fin=false,timers=[],step=0,picked=null;const T=(f,ms)=>timers.push(setTimeout(f,rm?0:ms));
 const setStep=n=>{step=n;window.__kroulStep=n;ov.dataset.step=n};setStep(0);
 const snd=n=>{try{typeof sfx==="function"&&sfx(n)}catch(e){}};
 const end=()=>{if(fin)return;fin=true;removeEventListener("resize",rf);timers.forEach(clearTimeout);ov.classList.add("krout");setTimeout(()=>ov.remove(),rm?0:360);window.__kroulStep=null;done()};
 ov.querySelector(".krskip").addEventListener("click",e=>{e.stopPropagation();end()});
 /* step 2: face-down + shuffle (FLIP: cards gather to the deck centre, the grid order is re-dealt, cards travel to their new places) */
 const shuffle=()=>{setStep(1);go.hidden=true;sub.textContent="Xáo bài…";tiles.forEach(t=>t.classList.add("down"));snd("sfx-tap");
  const gather=()=>{const g=grid.getBoundingClientRect();tiles.forEach((t,i)=>{const r=t.getBoundingClientRect();t.style.transform=`translate(${g.left+g.width/2-(r.left+r.width/2)}px,${g.top+g.height/2-(r.top+r.height/2)}px) rotate(${(i%3-1)*4}deg)`;t.style.zIndex=10+i})};
  const deal=()=>{const first=new Map(tiles.map(t=>[t,t.getBoundingClientRect()]));const order=tiles.slice().sort(()=>Math.random()-.5);order.forEach(t=>grid.appendChild(t));tiles=order;
   tiles.forEach(t=>{t.style.transition="none";const a=first.get(t),b=(t.style.transform="",t.getBoundingClientRect());t.style.transform=`translate(${a.left-b.left}px,${a.top-b.top}px)`});
   void grid.offsetWidth;tiles.forEach((t,i)=>{t.style.transition="";t.style.transitionDelay=(i*35)+"ms";t.style.transform="";t.style.zIndex=""});snd("sfx-tap")};
  if(rm){const order=tiles.slice().sort(()=>Math.random()-.5);order.forEach(t=>grid.appendChild(t));tiles=order;pickReady();return}
  const rest=()=>{T(deal,40);T(gather,660);T(deal,1220);T(()=>{tiles.forEach(t=>t.style.transitionDelay="");pickReady()},1860)};
  /* test hook: window.__kroulFreeze holds the deck gathered mid-shuffle until window.__kroulGo() */
  T(gather,520);T(()=>{if(window.__kroulFreeze){window.__kroulGo=()=>{window.__kroulGo=null;rest()};return}rest()},1040)};
 const pickReady=()=>{setStep(2);sub.textContent="Chạm một lá để nhận thân phận kiếp này";ov.classList.add("krpick");tiles.forEach(t=>{t.setAttribute("role","button");t.tabIndex=0})};
 /* step 3: the tapped card shows the rolled origin; the other cards hold the rest (face-down, dimmed) */
 const pick=t=>{if(step!==2||picked)return;picked=t;ov.classList.remove("krpick");
  const ti=items.findIndex(x=>x.k===o.target);const rest=items.filter((x,i)=>i!==ti).sort(()=>Math.random()-.5);
  tiles.forEach(e=>{const it=e===t?items[Math.max(0,ti)]:rest.shift();if(!it)return;e.dataset.k=it.k;e.querySelector(".krf").innerHTML=kitOriginFace(it)});
  t.classList.add("pick");tiles.forEach(e=>{if(e!==t)e.classList.add("krdim")});snd("sfx-tap");
  /* centre of the card area (never over the title or the buttons) */
  T(()=>{const r=t.getBoundingClientRect(),g=grid.getBoundingClientRect();const s=Math.max(1,Math.min(2.3,innerWidth*.62/r.width,g.height*.94/r.height));
   t.style.zIndex=50;t.style.transform=`translate(${g.left+g.width/2-(r.left+r.width/2)}px,${g.top+g.height/2-(r.top+r.height/2)}px) scale(${s})`;t.classList.add("win")},420);
  T(()=>{t.classList.remove("down");snd("sfx-promote")},780);
  T(()=>{setStep(3);sub.textContent=items[Math.max(0,ti)].name;go.textContent="Nhận thân phận";go.hidden=false;go.focus&&go.focus({preventScroll:true})},1500)};
 grid.addEventListener("click",e=>{const t=e.target.closest(".krt");if(t)pick(t)});
 grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("krt")){e.preventDefault();pick(e.target)}});
 /* step 4: the revealed picture flies into the identity card */
 const fly=()=>{if(fin)return;go.hidden=true;try{const src=picked.querySelector(".krf .ksart")||picked.querySelector(".krf");const to=o.toEl&&o.toEl();const a=src.getBoundingClientRect();const b=to?to.getBoundingClientRect():null;
   ov.classList.add("krfade");const dlg=document.querySelector("#modal .dlg");if(dlg&&!rm){dlg.classList.remove("krin");void dlg.offsetWidth;dlg.classList.add("krin",land?"krinL":"krinP")}
   if(!rm){const fl=src.cloneNode(true);fl.classList.add("krfly");fl.style.cssText=`position:fixed;margin:0;left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px;z-index:2147483001;transition:transform .7s cubic-bezier(.2,.8,.2,1),opacity .25s .62s`;document.body.appendChild(fl);
    requestAnimationFrame(()=>{const s=b?Math.min(b.width/a.width,b.height/a.height):1;const dx=b?(b.left+b.width/2)-(a.left+a.width/2):0,dy=b?(b.top+b.height/2)-(a.top+a.height/2):0;fl.style.transform=`translate(${dx}px,${dy}px) scale(${s})`;fl.style.opacity="0"});
    setTimeout(()=>fl.remove(),1000)}}catch(e){}T(end,760)};
 go.addEventListener("click",e=>{e.stopPropagation();if(step===0)shuffle();else if(step===3)fly()});
 try{go.focus({preventScroll:true})}catch(e){}}
/* owner 11/15 (review): the cards are never shown blank — the origin pictures (wide + fallback) and the card back are fetched first.
   Cached pictures: no wait at all. Otherwise, after 150 ms, a kit wait on the roulette backdrop ("Đang bày các thân phận…"); at most 8 s. */
(function(){const r0=kitRoulette;kitRoulette=function(o){if(!o||!o.items||!o.items.length)return r0.apply(this,arguments);const args=arguments,self=this;
 const urls=[...new Set(o.items.map(it=>it.wide||it.src).concat([KIT_CARDBACK]).filter(Boolean))];let fired=false,w=null;
 const go=()=>{if(fired)return;fired=true;clearTimeout(tw);clearTimeout(tm);if(w)w.remove();r0.apply(self,args)};
 const tw=setTimeout(()=>{if(fired)return;w=document.createElement("div");w.id="kroulw";w.className="kroul";try{kitBackdrop(w,"roulette")}catch(e){}
  w.innerHTML=`<div class="krbox"><div class="krhead"><b>Luân hồi</b><small class="krsub">Đang bày các thân phận…</small></div></div>`;document.body.appendChild(w)},150);
 const tm=setTimeout(go,8000);let n=0;
 urls.forEach(u=>{const im=new Image();im.decoding="async";const ok=()=>{n++;if(n>=urls.length)(im.decode?im.decode().catch(()=>{}):Promise.resolve()).then(go)};im.onload=ok;im.onerror=ok;im.src=u})}})();
(function(){if(typeof nlCard!=="function")return;const c0=nlCard;nlCard=function(){const r=c0.apply(this,arguments);try{const o=S&&S.origin;if(!o)return r;const key=(S.name||"")+"|"+o.k+"|"+(typeof NLP!=="undefined"&&NLP?NLP.seed:"");
  if(window.__kroulKey===key)return r;window.__kroulKey=key;
  /* ONE card per origin: a country branch (hòa thân · Bắc Địch) lands on its origin's card, named by the origin (on) */
  const ok=typeof originRoot==="function"?originRoot(o.k):o.k;
  const items=ORIGINS.filter(x=>KIT_OW[x.k]!=null||x.k===ok).map(x=>({k:x.k,src:kitOriginArt(x.k),wide:kitOriginWide(x.k),name:x.on||x.n,rare:kitRare(x.k)}));
  kitRoulette({items,target:ok,toEl:()=>document.querySelector("#modal .kpidart .ksart")||document.querySelector("#modal .kpidart")})}catch(e){console.error("kitRoulette",e)}return r}})();
/* kit sample page (§28.12b, review/kit-fit-r3): the origin card grid at a fixed card width (--krw); the live fit is kitRouFit */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§28.12b",title:"Thẻ thân phận (Luân hồi): thẻ to trải rộng theo màn nền, một khoảng cách đều giữa các thẻ",html:()=>
 `<div class="kroul" style="position:relative;inset:auto;z-index:auto;background:none;overflow:visible;--krw:150px;--krgap:12px;--krside:0px;--krpad:6px"><div class="krbox"><div class="krgrid">`+
 [["tt","Con gái Tể tướng"],["dtq","Con gái Đại tướng quân"],["muoi","Con gái nhà buôn muối"],["nc","Công chúa hòa thân"]].map(([k,n])=>`<div class="krt" data-k="${k}"><div class="krc"><div class="krf">${kitOriginFace({k,src:typeof kitOriginArt==="function"?kitOriginArt(k):"",wide:typeof kitOriginWide==="function"?kitOriginWide(k):"",name:n,rare:kitRare(k)})}</div></div></div>`).join("")+`</div></div></div>`})}catch(e){}
(function(){const st=document.createElement("style");st.id="k2b-roulette";st.textContent=`
.kroul{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:#e9dcc8 center/cover no-repeat;transition:opacity .35s;overflow:hidden}
.kroul.krfade .krt:not(.pick),.kroul.krfade .krhead,.kroul.krfade .krbar{opacity:0;transition:opacity .4s}
.kroul.krfade .krt.pick{opacity:0;transition:opacity .3s .1s}
.kroul.krout{opacity:0}
.kroul .krbox{display:flex;flex-direction:column;align-items:center;gap:var(--krgap,12px);padding:var(--krpad,14px) var(--krside,16px);width:100%;box-sizing:border-box}
.kroul .krhead{display:flex;flex-direction:column;align-items:center;color:#5a2e12;text-shadow:0 1px 6px #fff8;text-align:center}
.kroul .krhead b{font-family:var(--display);font-size:1.5rem;color:var(--gold)}.kroul .krhead small{font-size:.9rem;min-height:1.3em}
/* ONE origin/identity card grid (kitRouFit): cards as wide as the background allows (side margins kept), columns chosen by the fit; ONE gap for columns and rows */
.kroul .krgrid{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--krgap,12px);align-items:stretch;max-width:100%}
/* one origin card: outer .krt moves (shuffle / centre), inner .krc flips; front in flow (gives the size), back laid over it */
.kroul .krt{position:relative;width:var(--krw,clamp(96px,min(26vw,calc(17*var(--kvh,1dvh))),150px));flex:none;perspective:900px;transition:transform .5s cubic-bezier(.3,.7,.2,1),opacity .3s,filter .3s;outline:none}
.kroul .krc{position:relative;height:100%;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.4,.1,.2,1)}
.kroul .krt.down .krc{transform:rotateY(180deg)}
.kroul .krf,.kroul .krb{backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:10px;box-sizing:border-box}
.kroul .krf{height:100%;display:flex;flex-direction:column;align-items:center;gap:calc(var(--krw,120px)*.025);padding:calc(var(--krw,120px)*.045) calc(var(--krw,120px)*.045) calc(var(--krw,120px)*.055);background:rgba(255,250,240,.9);border:1px solid var(--k-hair,#e6d3ac);box-shadow:0 2px 8px #5a3a2022}
.kroul .krb{position:absolute;inset:0;transform:rotateY(180deg);background:#8a3a3a url(${KIT_CARDBACK}) center/100% 100% no-repeat;border:1px solid #c9a46a;box-shadow:0 0 0 2px #fff4dccc inset,0 3px 10px #5a3a2040}
.kroul .krt .kra{width:100%;position:relative}
.kroul .krt .krn{font-size:min(1.2rem,max(.78rem,calc(var(--krw,120px)*.088)));font-weight:600;color:var(--ink);text-align:center;line-height:1.2}
.kroul .krt .krr{margin-top:auto;padding-top:2px;font-size:min(1rem,max(.62rem,calc(var(--krw,120px)*.07)));white-space:nowrap}.kroul .krt .krr *{white-space:nowrap}
.kroul.krpick .krt{cursor:pointer}
.kroul.krpick .krt:hover,.kroul.krpick .krt:focus-visible{transform:translateY(-4px)}
.kroul.krpick .krt:hover .krb,.kroul.krpick .krt:focus-visible .krb{box-shadow:0 0 0 2px #fff4dccc inset,0 0 14px 4px #f0d070aa}
.kroul .krt.pick .krf,.kroul .krt.pick .krb{box-shadow:0 0 0 3px #c9a227,0 0 26px 10px #f0d070}
.kroul .krt.win .krf{animation:krflash .6s ease-out 2 .5s}
@keyframes krflash{50%{box-shadow:0 0 0 3px #fff,0 0 40px 16px #fff3c4}}
.kroul .krt.krdim{opacity:.35;filter:saturate(.6)}
.kroul .krbar{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;position:relative;z-index:60}
.kroul .krbar .kbtn{min-width:110px}.kroul .krbar .kbtn[hidden]{display:none}
.kroul.krrm *,.kroul.krrm{transition:none!important;animation:none!important}
.krfly{pointer-events:none}
.dlg.krin.krinL{animation:krinL .55s cubic-bezier(.2,.8,.2,1)}.dlg.krin.krinP{animation:krinP .55s cubic-bezier(.2,.8,.2,1)}
@keyframes krinL{from{transform:translateX(40vw);opacity:0}}@keyframes krinP{from{transform:translateY(calc(30*var(--kvh,1vh)));opacity:0}}
@media (prefers-reduced-motion:reduce){.kroul *,.kroul{transition:none!important;animation:none!important}.dlg.krin{animation:none!important}}
`;document.head.appendChild(st)})();

/* ---------- 15. kitItem — ONE item tile for every item anywhere (chest, Tư trang, wardrobe slots K1/K2, reward chests, peddler, works,
   reward panels). A simple frame (not the portrait frame): border + ground coloured by grade. Sizes sm (52 px) · md (72) · lg (104) · xl (150, the reveal spotlight KIT §42).
   kitItem({src, name, grade(0..4), qty, label:[text,"ok"|"no"|"n"], on, empty, size, data:"attrs", tip}) → HTML.
   Grades (KIT_GRADE): Thường grey-taupe · Tinh phẩm jade green · Trân phẩm sapphire blue · Tuyệt phẩm amethyst purple · Ngự tứ imperial gold-red.
   Picture: itemArt(k) (j98, review/item-art) when present, else wd-* icons, else the item's own icon; kitItemSrc(k, fallback). ---------- */
window.KIT_GRADE=[{n:"Thường",c:"#9a8a78",g:"#f3ede4"},{n:"Tinh phẩm",c:"#3f8f6a",g:"#e6f3ec"},{n:"Trân phẩm",c:"#3f62a8",g:"#e7edf8"},{n:"Tuyệt phẩm",c:"#7a4fa0",g:"#f1e9f7"},{n:"Ngự tứ",c:"#b8901c",g:"#fff1c8",r:"#a8261c"}];
function kitItemSrc(k,fb){try{if(typeof itemArt==="function"){const s=itemArt(k);if(s)return s.src||s}}catch(e){}try{if(window.WD_ITEMS&&WD_ITEMS[k]&&WD_ITEMS[k].icon)return WD_ITEMS[k].icon}catch(e){}return fb||""}
/* size "slot" = a bag slot (kitInvGrid): the square only, fills its grid cell; name/grade go to the tooltip + aria-label.
   o.onText = text of the worn band (default "Đang mặc"); o.mark = [text,"r"|"g"|"n"] small corner tag (e.g. "đã tẩm");
   o.sel = selected (KIT §70: its kitItemDetail is shown beside the grid) → gold ring.
   o.ghost = (empty only) a picture shown as a faint silhouette = the TYPE outline of an empty equipment slot (kitEquipSlots). */
/* KIT 28.13b BIG ITEM (D3 item-big, OD:L686; review/kit-keeper-2): sizes lg / xl are FRAMELESS (the painting alone, soft shadow, grade shown by the name/grade line; o.frame:true keeps the frame) and HI-RES:
   a small painting `img/item-X.webp` is shown as `img/item512/item-X.webp` (falls back to the small one if the 512 file is missing). One place — every big item picture in the game follows. */
function kitItemBigSrc(src){return typeof src==="string"&&/(^|\/)img\/item-[^\/]+$/.test(src)&&src.indexOf("/item512/")<0?src.replace(/(^|\/)img\/item-([^\/]+)$/,"$1img/item512/item-$2"):src}
window.kitItemBigSrc=kitItemBigSrc;
function kitItem(o){o=o||{};const g=KIT_GRADE[Math.max(0,Math.min(4,o.grade|0))]||KIT_GRADE[0];const sz=o.size||"md";const slot=sz==="slot";const bigSz=(sz==="lg"||sz==="xl")&&!o.frame;
 const lab=o.label&&!slot?`<span class="kitl kitl-${o.label[1]||"n"}">${o.label[0]}</span>`:"";const tip=(o.tip||o.name||"").replace(/"/g,"&quot;");
 return `<span class="kitem kitem-${sz}${o.empty?" kitem-empty":" kig"+Math.max(0,Math.min(4,o.grade|0))}${o.on?" kitem-on":""}${o.sel?" kitem-sel":""}${(sz==="lg"||sz==="xl")&&o.frame?" kitem-fr":""}${(o.grade|0)===4&&!o.empty?" kitem-nt":""}" style="--ig:${g.g};--ic:${g.c}${g.r?";--ir:"+g.r:""}" ${o.data||""} title="${tip}"${slot&&!o.empty?` aria-label="${tip}"`:""}>`+
  `<span class="kitb">${o.src&&!o.empty?(bigSz&&kitItemBigSrc(o.src)!==o.src?`<img src="${kitItemBigSrc(o.src)}" data-fb="${o.src}" alt="" onerror="if(this.dataset.fb&&this.src.indexOf('/item512/')>0){this.src=this.dataset.fb;this.removeAttribute('data-fb')}else this.remove()">`:`<img src="${o.src}" alt="" onerror="this.remove()">`):""}${o.empty&&o.ghost?`<img class="kigh" src="${o.ghost}" alt="" aria-hidden="true" onerror="this.remove()">`:""}${o.qty>1?`<b class="kitq">×${o.qty}</b>`:""}${(o.grade|0)===4&&!o.empty?`<i class="kits" aria-hidden="true">Ngự</i>`:""}${o.on?`<i class="kiton">${o.onText||"Đang mặc"}</i>`:""}${o.mark?`<i class="kitm kitm-${o.mark[1]||"n"}">${o.mark[0]}</i>`:""}${o.lux&&!o.empty?`<i class="kitx" title="Xa xỉ ${o.lux}"><span class="kxw">Xa xỉ</span><b>${o.lux}</b></i>`:""}${o.empty||o.grade==null?"":kitItemGrade(g,o)}</span>`+
  (slot?"":`<span class="kitn">${o.name||""}</span>${lab}`)+`</span>`}
/* KIT §54.1b GRADE CHIP ON THE FRAME (owner 16/11 ~23:18Z s26, choice "1"): the grade (Phẩm) of EVERY kitItem — bag slot, wear slot, tile, lg, xl, pet, gift, shop, reveal — is the kitGradeChip(size "fr") centred ON the bottom edge of the picture frame; there is NO grade line under the picture any more. A picture that is not a graded item (a recipe, a plain picture) passes NO grade (grade null / undefined) = no chip; a real item of grade 0 keeps its "Thường" chip. o.gname = grade word override (pets: PET_TIER, works: WTIER). One place, no caller variant. */
function kitItemGrade(g,o){const gi=Math.max(0,Math.min(4,o.grade|0));return typeof kitGradeChip==="function"?kitGradeChip(gi,{size:"fr",name:o.gname}):`<span class="kgchip kgchip-fr kgc${gi}" style="--gc:${g.c}">${o.gname||g.n}</span>`}
(function(){const st=document.createElement("style");st.id="k2b-item-big";st.textContent=`
/* the picture column of an item pop-up / notice (kitLose, gift, econ, veil, mark: .kpb.kphas > .kpsubj.kpitem) is the big-item width, not the 72-104 px portrait column; the compact bag slot card (.kitslot, 28.13f) keeps its 64 px header icon */
html body #modal .dlg:not(.kitslot) .kpb.kphas:has(>.kpsubj.kpitem){grid-template-columns:min(150px,38%) minmax(0,1fr)}
html body #modal .dlg:not(.kitslot) .kpb.kphas>.kpsubj.kpitem>.kitem-lg:not(.kitem-fr){--isz:100%;width:100%}
html body .kitem-lg:not(.kitem-fr){--isz:150px}html body .kitem-xl:not(.kitem-fr){--isz:min(260px,calc(36*var(--kvh,1dvh)))}
html body .kitem-lg:not(.kitem-fr)>.kitb,html body .kitem-xl:not(.kitem-fr)>.kitb{background:none!important;border:0!important;box-shadow:none!important;outline:0!important;overflow:visible!important;border-radius:0!important}
html body .kitem-lg:not(.kitem-fr)>.kitb::after,html body .kitem-xl:not(.kitem-fr)>.kitb::after{display:none!important}
html body .kitem-lg:not(.kitem-fr)>.kitb>img,html body .kitem-xl:not(.kitem-fr)>.kitb>img{width:100%!important;height:100%!important;object-fit:contain;filter:drop-shadow(0 6px 9px #3a201666) drop-shadow(0 1px 2px #3a20164d)}
`;document.head.appendChild(st)})();
/* K1: the two worn slots beside the portrait (everyone: player, consorts, maids, ma ma, Thái hậu…); the outfit status only when known */
function kitWearSlots(p,opts){try{if(!p||typeof wdSlots!=="function")return"";const L=wdSlots(p);const me=p===S;const lab=L[0]&&L[0].label?[L[0].label,L[0].labelKey==="ok"?"ok":L[0].labelKey==="under"?"n":"no"]:null;
 return `<div class="kwear${opts&&opts.cls?" "+opts.cls:""}">`+L.map((x,i)=>kitItem({src:x.empty?"":kitItemSrc(x.k,x.icon),name:x.empty?x.name:x.name,grade:x.grade,empty:x.empty,size:(opts&&opts.size)||"sm",
  data:`data-kwear="${x.slot}" data-kwho="${me?"me":(p.id!=null?p.id:"")}" role="button" tabindex="0"`,tip:`${x.slot==="tram"?"Trâm cài":"Y phục"}: ${x.name}${x.empty?"":" · "+x.gradeName}${x.giver?" · "+x.giver+" ban":""}`})).join("")+(lab?`<span class="kwearl">${kitItem({}).slice(0,0)}<span class="kitl kitl-${lab[1]}">${lab[0]}</span></span>`:"")+`</div>`}catch(e){return""}}
function kitPersonByName(nm){nm=String(nm||"").replace(/<[^>]*>/g,"").trim();if(!nm||typeof S==="undefined"||!S)return null;if(nm===S.name)return S;
 const pools=[typeof rivals!=="undefined"?rivals:[],[S.maid],S.staff||[],S.servants||[],S.srv||[]];for(const P of pools)for(const v of (P||[]))if(v&&v.name===nm)return v;
 try{if(S.thO&&S.thO.name===nm)return S.thO}catch(e){}return null}
document.addEventListener("click",ev=>{const t=ev.target.closest&&ev.target.closest("[data-kwear]");if(!t)return;ev.stopPropagation();const sl=t.dataset.kwear,who=t.dataset.kwho;
 if(who==="me"){window.__kwdTab=sl;const b=document.querySelector('[data-tab="inv"]');if(b)b.click();return}
 const v=(typeof rivals!=="undefined"&&rivals.find(r=>String(r.id)===who))||null;if(!v||typeof wdSlots!=="function")return;const x=wdSlots(v).find(s=>s.slot===sl);if(!x)return;
 kitModal({kind:"info",title:`${sl==="tram"?"Trâm cài":"Y phục"} của ${v.name}`,facts:[{who:v,text:x.empty?x.name:`${x.name} · ${x.gradeName}${x.giver?" · "+x.giver+" ban":""}`},
  x.label?`Ngươi đã biết: ${x.label}.`:"Đúng phẩm hay không: chưa rõ (chưa ai nhận xét).","Hặc ăn mặc sai phẩm: thẻ người của nàng, nhóm Hại nặng."],btn:"Đã hiểu"})},true);
/* K1 on every person card: replace j92's temporary "Trâm: … / Y phục: …" chips with the slots under the portrait */
(function(){const k0=kitPcFix;kitPcFix=function(pc){const r=k0.apply(this,arguments);try{if(!pc||pc.querySelector(".kwear"))return r;const nm=(pc.querySelector(".pcname")||{}).textContent;const p=kitPersonByName(nm);
  pc.querySelectorAll(".chip").forEach(c=>{if(/^(Trâm|Y phục):/.test(c.textContent.trim())||(p&&typeof wdSlots==="function"&&/^(Đúng phẩm|Vượt phẩm|Quá giản dị|Phạm tang)$/.test(c.textContent.trim())))c.remove()});
  if(!p||typeof wdSlots!=="function")return r;const h=kitWearSlots(p,{size:"sm"});const pcp=pc.querySelector(".pcl > .pcp");if(h&&pcp)pcp.insertAdjacentHTML("afterend",h)}catch(e){console.error("K1",e)}return r}})();
/* K2 (Rương đồ) removed: the wardrobe lives in Tư trang's bag + "Đang mang" (jinv + jwdinv) */
(function(){const st=document.createElement("style");st.id="k2b-item";st.textContent=`
.kitem{display:inline-flex;flex-direction:column;align-items:center;gap:2px;vertical-align:top;width:var(--isz);cursor:default;text-align:center}
.kitem[role=button]{cursor:pointer}
.kitem-sm{--isz:52px}.kitem-md{--isz:72px}.kitem-lg{--isz:104px}.kitem-xl{--isz:150px}
.kitem-xl>.kitn{font-size:.9rem}
.kitem-slot{--isz:100%;width:100%}
.kitem.kitem-slot.kitem-empty>.kitb{background:linear-gradient(#efe5d2,#e9dcc5);border:1px solid #d6c29c;box-shadow:inset 0 2px 5px #5a3a2030,inset 0 -1px 0 #fff8}
.kitem .kitm{position:absolute;right:2px;top:2px;font-style:normal;font-size:.58rem;line-height:1.3;border-radius:5px;padding:0 4px;background:#fffaf0e6;border:1px solid}
.kitem .kitm-r{color:#c23b22;border-color:#c23b2266}.kitem .kitm-g{color:#2d7a52;border-color:#2d7a5266}.kitem .kitm-n{color:#8a7350;border-color:#d2b07188}
.kitem>.kitb{position:relative;width:var(--isz);aspect-ratio:1;border-radius:8px;background:radial-gradient(circle at 50% 40%,#fff 0,var(--ig) 70%);border:2px solid var(--ic);box-shadow:inset 0 0 0 2px #fff8,0 1px 3px #5a3a2033;display:grid;place-items:center;overflow:visible}
.kitem.kitem-nt>.kitb{border-color:var(--ic);box-shadow:inset 0 0 0 2px var(--ir),inset 0 0 0 4px #fff6,0 0 8px #f0d070aa}
.kitem>.kitb>img{width:86%;height:86%;object-fit:contain;filter:drop-shadow(0 1px 2px #0003)}
.kitem.kitem-empty>.kitb{background:repeating-linear-gradient(45deg,#f6efe4 0 6px,#efe6d7 6px 12px);border-style:dashed;border-color:#c8b89c}
.kitem .kitq{position:absolute;right:3px;bottom:2px;font-size:.66rem;background:#fffaf0e6;border-radius:6px;padding:0 4px;color:var(--ink)}
.kitem .kits{position:absolute;left:3px;top:2px;font-style:normal;font-size:.62rem;line-height:1.35;font-weight:700;color:#fff;background:var(--ir);border-radius:3px;padding:0 4px;font-family:var(--display)}
.kitem .kiton{position:absolute;left:0;right:0;bottom:0;font-style:normal;font-size:.6rem;color:#fff;background:#2d7a52d9}
.kitem.kitem-on>.kitb{outline:2px solid #2d7a52;outline-offset:1px}
/* KIT §70: o.sel = the tile whose info is shown (kitItemDetail beside it): gold ring, lifted */
.kitem.kitem-sel>.kitb,.kitem.kitem-slot.kitem-sel>.kitb{box-shadow:0 0 0 3px var(--gold,#c9a46a),0 4px 10px #5a3a2040;transform:translateY(-2px)}
.kitem>.kitn{font-size:.7rem;line-height:1.15;color:var(--ink);font-weight:600;overflow-wrap:anywhere}
.kitem-lg>.kitn{font-size:.78rem}.kitem-sm>.kitn{font-size:.62rem}
.kitl{font-size:.62rem;border-radius:6px;padding:0 5px;border:1px solid}.kitl-ok{color:#2d7a52;border-color:#2d7a5266;background:#eaf5ee}.kitl-no{color:#c23b22;border-color:#c23b2266;background:#fbecea}.kitl-n{color:#8a7350;border-color:#d2b07188;background:#fbf4e6}
.kwear{display:flex;gap:6px;justify-content:center;align-items:flex-start;flex-wrap:wrap;margin:2px 0 4px}
.pc .pcl>.kwear{float:left;clear:left;width:var(--kpcw);margin:0 12px 6px 0}
.pc.kpwide[data-k2] .pcl>.kwear{float:none;width:auto;margin:0 0 6px}
.kwear .kwearl{flex-basis:100%;text-align:center}
.kwd .kwdnow{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.kwd .kwdnote{display:flex;flex-direction:column;gap:4px;min-width:0}
.kwd .kwdgrid{display:flex;flex-wrap:wrap;gap:10px;margin:8px 0}
.kwd .kwdsel{display:flex;gap:10px;align-items:flex-start;margin:6px 0;padding:8px;border:1px solid var(--k-hair);border-radius:8px;background:#fffdf8}
.kwd .kwdpw{display:flex;flex-direction:column;gap:4px;align-items:center;max-width:260px}
.kwd .kpsec{margin:0 0 10px}
`;document.head.appendChild(st)})();
/* 15b. GRADE GROUND + FRAME (owner 11/15, markup 1115-inv-markup): every non-empty kitItem (slot, sm, md, lg, panel picture) sits on the
   SAME painted art as the portrait of the matching tier — ground = bg-consort-N (silk with the tier's flower), frame = frame-consort-N
   (cut to the frame only, no tassel: img/kit/islot-frame-G.webp, drawn as a 9-slice border-image so corners stay crisp at every size).
   Thường = tier 0 wood/taupe · Tinh phẩm = tier 1 jade · Trân phẩm = tier 2 pearl-silver/blue · Tuyệt phẩm = tier 4 gold-peony/lavender ·
   Ngự tứ = tier 5 red-gold rubies on the tier 7 imperial gold ground. A soft light pool under the picture keeps the item readable. */
(function(){const G=[[0,0,30],[1,1,32],[2,2,36],[3,4,50],[4,7,52]];let c="";
 for(const [g,bg,sl] of G)c+=`.kitem.kig${g}>.kitb{background:radial-gradient(circle at 50% 46%,#fffdf6d0 0,#fffdf680 34%,#fffdf600 66%),url(img/kit/bg-consort-${bg}.webp) center/cover;border:0;box-shadow:0 1px 3px #5a3a2040}
.kitem.kig${g}>.kitb::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;border:0 solid transparent;border-image:url(img/kit/islot-frame-${g}.webp) ${sl} fill / ${(sl/240*100).toFixed(1)}% stretch}
`;
 c+=`.kitem.kitem-empty>.kitb>img.kigh{width:66%;height:66%;object-fit:contain;filter:brightness(0) sepia(1) saturate(.6);opacity:.17}
.kitem[class*=" kig"]>.kitb>img{width:76%;height:76%;position:relative;z-index:0}
.kitem[class*=" kig"]>.kitb>.kitq,.kitem[class*=" kig"]>.kitb>.kits,.kitem[class*=" kig"]>.kitb>.kiton,.kitem[class*=" kig"]>.kitb>.kitm{z-index:2}
.kitem[class*=" kig"].kitem-nt>.kitb{box-shadow:0 0 8px #f0d070aa}
/* corner plan (KIT §54.1b): grade chip = bottom edge centre (straddles it) · Xa xỉ box = top-right · Ngự seal = top-left · "đã tẩm" tag = top-right, or left under the seal row when the Xa xỉ box is there · qty = bottom-right, lifted above the chip · worn band = above the chip */
.kitem[class*=" kig"]>.kitb .kitq{right:9%;bottom:calc(max(6cqw,5px) + 3%)}.kitem[class*=" kig"]>.kitb .kits{left:9%;top:8%}.kitem[class*=" kig"]>.kitb .kitm{right:8%;top:7%}
.kitem[class*=" kig"]>.kitb .kiton{left:7%;right:7%;bottom:calc(max(6cqw,5px) + 2%);border-radius:3px}
.kitem.kitem-on[class*=" kig"]>.kitb{outline:2px solid #2d7a52;outline-offset:1px}
/* XA XỈ BOX = ONE MASTER (owner 16/11 17:20Z, KIT §84 (5)): the box is the XL master (frame 150 px: box 34x34 at 4 px from top/right, word 10 px, number 13 px) written in CONTAINER UNITS of the frame (.kitb is the container), so at EVERY size and in EVERY place (bag slot, tile, lg, xl, tap panel, kszItem3) it keeps exactly the same place and size relative to the frame; only its content changes: word + number from a 100 px frame, number only below (min 14 px box / 8 px digits so a 54 px bag slot stays legible) */
.kitem>.kitb{container-type:inline-size}
.kitem .kitx{position:absolute;top:2.667cqw;right:2.667cqw;left:auto;bottom:auto;z-index:2;box-sizing:border-box;width:max(22.667cqw,14px);height:max(22.667cqw,14px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.667cqw;padding:.667cqw;
 white-space:nowrap;text-align:center;line-height:1;font-style:normal;font-weight:700;font-size:max(6.667cqw,5px);border-radius:2.667cqw;background:#4a2c1ee0;color:#ffe9b0}
.kitem .kitx>b{font-size:max(8.667cqw,8px)}
@container (max-width:99px){.kitem .kitx>.kxw{display:none}.kitem .kitx>b{font-size:max(12.667cqw,8px)}}
/* page-scale-r1: the wear column (kitEquipSlots col:true, 40-72 px slots: Tư trang, Chọn y phục, pet box) never shows the Xa xỉ tag: wider than a 40 px slot it was cut ("a xỉ 33") and hid the picture; the same items show it in the bag and the tap panel, the total stays on the sum line */
.keq.keqv .kitem .kitx{display:none}
/* the Xa xỉ box sits top-right, so the "đã tẩm" tag moves to the top-left (under the seal "Ngự" when both are there) */
.kitem[class*=" kig"]:has(.kitx)>.kitb .kitm{right:auto;left:9%;top:max(31cqw,19px)}
/* room for the half of the grade chip that hangs below the frame (named tiles; a bag slot has no name line and relies on its grid gap) */
.kitem:not(.kitem-slot)>.kitb:has(>.kgchip-fr){margin-bottom:calc(max(var(--isz)*.06,5px) + 3px)}
`;const st=document.createElement("style");st.id="k2b-itemgrade";st.textContent=c;document.head.appendChild(st)})();

/* ---------- 16. STAGE LAYOUT OWNER = j59 (main): after merging main, j59 lays out the stage (one height for every adult by the visible body,
   feet on one floor, name tags under the feet in 1–2 rows, a scrolling strip when too many). Kit 2b's own scaler (2b) is retired so the two
   never fight; owner A (people fill the stage) is applied in j59 itself: the figure height cap is 90 % of the stage (was 66 %). KIT_FLOOR
   still crops each room picture to keep the floor. Veil/scar layers on stage figures follow j59's sizes (kitFigFx after j59's layout). ---------- */
kitStageScale=function(){try{kitFigFx()}catch(e){}};kitStageEdge=function(){};
(function(){if(typeof window.j59lay!=="function")return;const l0=window.j59lay;window.j59lay=function(){const r=l0.apply(this,arguments);try{kitFigFx()}catch(e){}return r}})();
(function(){const st=$("stage");if(st)st.classList.remove("kscale")})();

/* ---------- 17. kitName / kitTitle: never double a title. A name that already starts with its title ("Thái y Bùi Thừa Chí") or with any role
   word (thái giám, tổng quản, quan, thị vệ, vương gia, nhạc sư, họa sư, công tử, ma ma, cô cô…) gets no extra title. ---------- */
const KIT_ROLEPRE=/^(Hoàng thượng|Thái hậu|Hoàng hậu|Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Phế phi|Thái tử|Hoàng tử|Công chúa|Thái y|Ngự y|Thái giám|Tổng quản|Thủ lĩnh|Tiểu thái giám|Thị vệ|Thống lĩnh|Vương gia|Thân vương|Quận vương|Tể tướng|Đại tướng quân|Thượng thư|Thị lang|Tướng quân|Quan|Đại nhân|Nhạc sư|Họa sư|Sứ thần|Công tử|Ma ma|Cô cô|Cung nữ|Nữ quan|Chưởng sự)(?=\s|$)/i;
(function(){const t0=kitTitle;kitTitle=function(p){const t=t0.apply(this,arguments);try{if(!t||!p||!p.name)return t;const nm=String(p.name).replace(/<[^>]*>/g,"").trim();
  if(nm.toLowerCase().startsWith(String(t).toLowerCase())||KIT_ROLEPRE.test(nm))return""}catch(e){}return t}})();

/* ---------- 18. PERSON CARD LAYOUT (owner 11/14, iPad shots 1114-ipad-card-layout-1/-2; replaces the full-width header of hotfix round 1).
   Every person card (.pc: consort, servant, child, Emperor, Thái hậu, court, officials, strangers):
   LEFT column (sticky while the acts scroll): name + rank, the BIG kit portrait (pcPort, rank ornament visible), wear slots, stat tiles,
   age / nature / chips. RIGHT column: an opaque sticky block on top = the info lines (Ghen · Ngươi với nàng + bar · Oán + bar · Nàng với
   ngươi · Sủng) + the note + the act-group tabs (Gặp mặt 3/3 · Giao thiệp …); under it the act cards of the selected group scroll.
   Each fact once (real nodes moved, nothing copied); nothing peeks through a sticky block. Phones (< 600 px): one column in the same order
   (portrait + name, tiles, then the sticky info + tabs, acts). The card fills the panel (kitPcSize). ---------- */
kitPcFix=function(pc){try{if(!pc||pc.dataset.k2==="1")return;const L=pc.querySelector(":scope > .pcl"),Rr=pc.querySelector(":scope > .pcr");if(!L||!Rr)return;pc.dataset.k2="1";
 const info=L.querySelector(":scope > .pcinfo");const bars=document.createElement("div");bars.className="kpbars";const pgh=L.querySelector(":scope > .pgh");if(pgh)bars.appendChild(pgh);
 if(info)[...info.children].forEach(c=>{if(c.querySelector('.fbar,.rlab,.mini,[class*="bar"]')||/^\s*(Sủng|Ghen)\b/.test(c.textContent))bars.appendChild(c)});
 const facts=document.createElement("div");facts.className="kpfacts";if(info&&info.children.length)facts.appendChild(info);const ch=L.querySelector(":scope > .chips");if(ch)facts.appendChild(ch);
 if(facts.children.length)L.appendChild(facts);
 const nmEl=L.querySelector(":scope > .pcname")||L.querySelector(":scope > b");const rkEl=L.querySelector(":scope > .pcrk");const name=(nmEl||{}).textContent||"";
 bars.querySelectorAll(".fbar>u,.mini>u").forEach((u,i)=>{const k=name+"|"+i;const nw=u.style.width;const ow=KIT_BARW[k];KIT_BARW[k]=nw;
  if(ow!=null&&ow!==nw&&!matchMedia("(prefers-reduced-motion: reduce)").matches){u.style.width=ow;u.style.transition="width .6s ease-out";requestAnimationFrame(()=>requestAnimationFrame(()=>{u.style.width=nw}))}});
 /* left: name + rank above the big portrait */
 const pcp=L.querySelector(":scope > .pcp");if(pcp){if(rkEl)L.insertBefore(rkEl,pcp);if(nmEl)L.insertBefore(nmEl,rkEl||pcp)}
 /* wide / landscape (iPad): ALL the info sits in the left column under the portrait (relation block, then tiles and facts); the right column
    keeps only the act-group tabs (sticky) and the acts. Fold portrait / phones: the relation block heads the right column with the tabs. */
 const wide=kitPcWide(pc);pc.classList.toggle("kpwide",wide);pc.classList.toggle("kpnar",!wide);
 if(wide&&bars.children.length){if(facts.parentNode===L)L.insertBefore(bars,facts);else L.appendChild(bars)}
 /* Fold portrait / phones (owner 11/14 "lủng củng"): header row = medium portrait left, name + rank + relation lines right; the stat tiles,
    age, nature, chips and wear slots open in a kit sheet from the portrait; helper sentences go to the act-group tabs' tooltip */
 if(!wide){if(bars.children.length)L.appendChild(bars);{const nl=document.createElement("div");nl.className="kpnm";const n1=L.querySelector(":scope > .pcname"),r1=L.querySelector(":scope > .pcrk");if(n1)nl.appendChild(n1);if(r1)nl.appendChild(r1);L.prepend(nl)}const pp=L.querySelector(":scope > .pcp");if(pp){pp.setAttribute("role","button");pp.title="Chạm để xem tư chất, tuổi, tính nết";pp.classList.add("kpsheet")}
  }
 {const nt=Rr.querySelector(":scope > .pcn");/* an act RESULT (popMsg: "Sai đi dò la: thành. …") stays as the card note (kitBullets lists it); only a helper sentence moves */
  if(nt&&(nt.querySelector(".g,.r,.past,b,.ef")||/:\s*(thành|hỏng)/i.test(nt.textContent)||nt.textContent.length>140))nt.classList.add("kpres");else if(nt){const tb=Rr.querySelector(":scope > .pctabs");const tx=nt.textContent.trim();if(tb)tb.title=tx;
  /* the helper sentence ("Không gặp mặt: phải sai người…") becomes a Ghi chú on the act cards it explains, not a line in the card body */
  Rr.querySelectorAll(".pcb button.ka").forEach(b=>{if(b.querySelector(".kr-note"))return;const kb=b.querySelector(".kb");if(kb&&/sai|nhờ|gửi/i.test(b.textContent))kb.insertAdjacentHTML("beforeend",`<span class="kr kr-note"><span class="krl">Ghi chú</span><span class="krv"><span class="ef n">${tx}</span></span></span>`)});nt.remove()}}
 /* right: one opaque sticky block = (info) + note + act-group tabs */
 const stick=document.createElement("div");stick.className="kpstick";
 const note=Rr.querySelector(":scope > .pcn");if(note&&!note.classList.contains("kpres"))stick.appendChild(note);const tabs=Rr.querySelector(":scope > .pctabs");if(tabs)stick.appendChild(tabs);
 if(stick.children.length)Rr.prepend(stick);if(note&&note.classList.contains("kpres")){if(stick.parentNode)stick.after(note);else Rr.prepend(note)}
 /* wear slots (K1) under the portrait */
 try{const p=kitPersonByName(name);pc.querySelectorAll(".chip").forEach(c=>{if(/^(Trâm|Y phục):/.test(c.textContent.trim())||(p&&typeof wdSlots==="function"&&/^(Đúng phẩm|Vượt phẩm|Quá giản dị|Phạm tang)$/.test(c.textContent.trim())))c.remove()});
  if(p&&typeof wdSlots==="function"&&!pc.querySelector(".kwear")){const h=kitWearSlots(p,{size:"sm"});if(h&&pcp)pcp.insertAdjacentHTML("afterend",h)}}catch(e){}
 /* one fact, one place: Sủng is in the info block, so its stat tile goes */
 if(/Sủng/.test(bars.textContent)){const bs=[...bars.children].find(c=>/Sủng/.test(c.textContent));const barKnown=bs&&!/chưa rõ/.test(bs.textContent);pc.querySelectorAll(".kst-tile").forEach(t=>{const l=t.querySelector("span,small,i,em");if(/^\s*Sủng\b/i.test((l||t).textContent)&&(barKnown||/chưa rõ/.test(t.textContent)))t.hidden=true})}
 kitPcSize()}catch(e){console.error("kitPcFix",e)}};
document.addEventListener("click",e=>{const pp=e.target.closest&&e.target.closest(".pc.kpnar .pcl > .pcp.kpsheet");if(!pp)return;e.stopPropagation();
 try{const pc=pp.closest(".pc");const nm=(pc.querySelector(".pcname")||{}).textContent||"";const parts=[...pc.querySelectorAll(":scope > .pcl > .kwear, :scope > .pcl > .kpfacts")].map(x=>x.outerHTML).join("");
  Q.unshift({t:nm,h:`<div class="kpsheetb">${parts}</div>`});showModal()}catch(x){console.error(x)}},true);
function kitPcWide(pc){const c=(pc&&pc.closest&&pc.closest("#panel,#stage,#modal .dlg"))||document.getElementById("panel");/* tassel-fix: width without the scrollbar's share, so a card that grows tall enough to scroll keeps the same portrait size (no-shrink rule) */
 let w=c&&c.clientWidth;try{if(w){const cs=getComputedStyle(c);const sb=c.offsetWidth-c.clientWidth-(parseFloat(cs.borderLeftWidth)||0)-(parseFloat(cs.borderRightWidth)||0);if(sb>0)w+=sb}}catch(e){}if(pc&&w)pc.style.setProperty("--kpcw",Math.round(Math.max(150,Math.min(240,w*.36)))+"px");
 /* KIT §0: no short-landscape card any more — every screen shows the 1180x820 spread or the 590x820 page (design-scale p3) */
 return w?w>=440:true}/* owner 11/14: Fold uses EXACTLY the iPad card (one component) */
addEventListener("resize",()=>{const w=kitPcWide();if(window.__kpcW!==undefined&&window.__kpcW!==w){try{render()}catch(e){}}window.__kpcW=w});window.__kpcW=kitPcWide();
/* the card is at most the panel's height (one scroller inside the panel); a newly opened person is scrolled fully into view */
function kitPcSize(){try{const P=$("panel");if(!P)return;const cs=getComputedStyle(P);const pb=parseFloat(cs.paddingBottom||0),pt=parseFloat(cs.paddingTop||0);
 const sub=P.querySelector(".ksub");const subOn=!!(sub&&sub.offsetParent);
 /* KIT 45.2 (owner 16/11 "Mất chữ", review/hc-portrait-r1): since KIT §45 the sub-tabs sit INSIDE the pane bar (.kpbar: + its bottom padding,
    hair line and the kit gap under it), so the sticky edge is the BAR's bottom + its gap, not the .ksub row's bottom — measuring the row
    scrolled the face strip 17 px under the bar (palace labels cut in half under Chí tôn / Phi tần / Nam nhân / Cung nhân) */
 const kbar=P.querySelector(":scope>.kpbar"),kbarOn=!!(kbar&&kbar.offsetParent);const kbarGap=()=>kbarOn?parseFloat(getComputedStyle(kbar).marginBottom)||0:0;
 const subH=kbarOn?kbar.offsetHeight+kbarGap():subOn?sub.offsetHeight:0;
 P.querySelectorAll(".pc[data-k2]").forEach(pc=>{const pr=P.getBoundingClientRect();const bt=parseFloat(cs.borderTopWidth||0),bb=parseFloat(cs.borderBottomWidth||0);
  /* the sub-tab bar is sticky at the same place it rests (first child): the card's room is from its bottom to the panel's inner bottom */
  /* T = whatever follows the card inside the panel (wrapper padding): the card's room shrinks by it so the card can sit flush under the bar */
  let T=0;{let e=pc;while(e&&e!==P){let n=e.nextElementSibling;while(n){if(n.offsetParent)T+=n.getBoundingClientRect().height;n=n.nextElementSibling}const ps=e.parentElement;if(ps&&ps!==P){const c2=getComputedStyle(ps);T+=parseFloat(c2.paddingBottom||0)+parseFloat(c2.borderBottomWidth||0)}e=ps}}
  const full=Math.floor((pr.bottom-bb)-(pr.top+bt+pt+subH)-T);
  /* portrait screens under 1000 px (Fold, phones): the card takes the WHOLE panel under the sticky sub-tabs and the panel scrolls the
     face strip up out of the way, so the header + at least one whole act card are in view; wide screens keep strip + card together */
  const top0=pc.getBoundingClientRect().top+P.scrollTop-pr.top;const rest=P.clientHeight-pb-top0-4;
  const narrow=false;/* KIT §0: one page = the spread page (was: narrow portrait width) *//* the face strip (picker) ALWAYS stays in view above the card (owner 11/14): narrow screens get a compact strip, and the card takes
     the room from the strip's bottom to the panel's bottom */
  const strip=P.querySelector(".pstrip");const stripH=strip&&strip.offsetParent?strip.getBoundingClientRect().height+6:0;
  const h=narrow?full-stripH:(rest<Math.min(320,full)?full:rest);
  pc.style.setProperty("--kpcmax",Math.max(200,Math.round(h))+"px");pc.classList.toggle("kpcfull",h===full);
  const nm=(pc.querySelector(".pcname")||{}).textContent||"";if(P.__kpcN!==nm||narrow||!P.__kpcUser){const fresh=P.__kpcN!==nm;P.__kpcN=nm;if(!fresh&&P.__kpcUser)return;const fit=()=>{try{const q=P.querySelector(".pc[data-k2]");if(!q)return;const a=P.getBoundingClientRect(),c=q.getBoundingClientRect();const sub2=P.querySelector(".ksub");
   const kb2=P.querySelector(":scope>.kpbar");const sb=kb2&&kb2.offsetParent?kb2.getBoundingClientRect().bottom+(parseFloat(getComputedStyle(kb2).marginBottom)||0):sub2&&sub2.offsetParent?sub2.getBoundingClientRect().bottom:a.top+pt;
   if(narrow){const st2=P.querySelector(".pstrip");const tgt=st2&&st2.offsetParent?st2.getBoundingClientRect().top:c.top;const d=tgt-sb;if(Math.abs(d)>1)P.scrollTop+=d}
   else if(c.bottom>a.bottom-pb+1)P.scrollTop+=Math.min(c.bottom-(a.bottom-pb)+2,c.top-sb);else if(c.top<sb)P.scrollTop+=c.top-sb;
   /* KIT 45.1 (review/small-bugs-3): a face strip is never left HALF under the pane bar (its palace labels clipped, frames cut): when the scroll
      cannot carry it fully under the bar, the strip is shown whole, labels included */
   const st3=P.querySelector(".pstrip");if(st3&&st3.offsetParent){const r3=st3.getBoundingClientRect();if(r3.top<sb-1&&r3.bottom>sb+1)P.scrollTop-=Math.ceil(sb-r3.top)}}catch(e){}};
   requestAnimationFrame(()=>{fit();requestAnimationFrame(fit)});const st0={v:null};setTimeout(()=>{st0.v=P.scrollTop;fit()},180);setTimeout(()=>{if(st0.v==null||Math.abs(P.scrollTop-st0.v)<2)fit()},450)}})}catch(e){}}
addEventListener("resize",()=>{clearTimeout(window.__kpcS);window.__kpcS=setTimeout(kitPcSize,80)});
/* owner 11/15 05:08Z (Fold, "Lỗi gì đây"): a tab switch renders the new page while #panel still has the OLD tab's size (Hành sự: the short
   panel under the stage); the card then kept --kpcmax 200 px and the face strip kept one face. The panel's own size is the truth: whenever
   #panel changes size, the card and the strip measure again. */
(function(){try{const P=$("panel");if(!P||typeof ResizeObserver!=="function")return;let w=-1,h=-1,t=0;
 new ResizeObserver(()=>{const r=P.getBoundingClientRect();if(Math.abs(r.width-w)<1&&Math.abs(r.height-h)<1)return;w=r.width;h=r.height;cancelAnimationFrame(t);
  t=requestAnimationFrame(()=>{try{kitPcSize()}catch(e){}try{if(typeof kitStripFit==="function")kitStripFit()}catch(e){}})}).observe(P)}catch(e){}})();
/* review 11/15: on the Fold the panel keeps the SAME size from Hành sự to Hậu cung (815 px), so the observer above never fires there and the
   card measured mid-switch stayed at 200 px / one face. After every tab change, measure the card and the strip again once the new page has
   laid out (next frame, and again after the page turn has settled). */
setTimeout(()=>{if(typeof render!=="function")return;const r0=render;let last=null;
 const again=()=>{try{kitPcSize()}catch(e){}try{if(typeof kitStripFit==="function")kitStripFit()}catch(e){}};
 render=function(){const out=r0.apply(this,arguments);try{const t=typeof tab!=="undefined"?tab:null;if(t!==last){last=t;requestAnimationFrame(again);setTimeout(again,160);setTimeout(again,480)}}catch(e){}return out};
 window.render=render},0);
(function(){const P=$("panel");if(!P)return;const mark=e=>{if(!(e.target.closest&&e.target.closest(".pc")))P.__kpcUser=1};P.addEventListener("touchstart",mark,{passive:true});P.addEventListener("wheel",mark,{passive:true});
 document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#panel .pface,#panel .pgf,#panel [data-pg],button[data-tab],.ksubb"))P.__kpcUser=0},true)})();
(function(){const st=document.createElement("style");st.id="k2b-pchead";st.textContent=`
.pc[data-k2]{max-height:var(--kpcmax,none)!important;overflow-y:auto!important;overscroll-behavior:contain;padding:0 7px 7px!important}
.pc[data-k2].kpcfull{height:var(--kpcmax)!important;min-height:var(--kpcmax)!important;flex:0 0 auto!important}
.pc[data-k2]>.kpstrip{display:none!important}
.pc[data-k2]>.pcl,.pc[data-k2]>.pcr{padding-top:7px}
.pc[data-k2]>.pcl>.pcname,.pc[data-k2]>.pcl>b:first-child{order:0!important;font-family:var(--display);font-size:1.15rem;line-height:1.15;margin:0}
.pc[data-k2]>.pcl>.pcrk{order:0!important;margin:0 0 4px}
.pc[data-k2]>.pcl>.pcp,.pc[data-k2]>.pcl>*{order:0!important}
.pc[data-k2] .kpstick{position:sticky;top:0;z-index:6;background:var(--panel2,#f6ead6);margin:-7px -7px 6px;padding:7px 7px 6px;border-bottom:1px solid var(--k-hair,#e6d3ac);box-shadow:0 -8px 0 0 var(--panel2,#f6ead6),0 4px 6px -4px #5a3a2033}
.pc[data-k2] .kpstick .kpbars{display:flex;flex-direction:column;gap:1px;font-size:.8rem;line-height:1.35;color:var(--dim);margin:0 0 4px}
.pc[data-k2] .kpstick .kpbars>*{display:block!important}.pc[data-k2] .kpstick .kpbars .rlab{display:inline!important}
.pc[data-k2] .kpstick .kpbars .fbar{display:inline-block!important;vertical-align:middle;width:56px;margin:0 10px 0 4px}
.pc[data-k2] .kpstick .pcn{margin:0 0 4px}.pc[data-k2] .kpstick .pctabs{margin:0}
.pc[data-k2]>.pcl>.kpbars{display:flex;flex-direction:column;gap:1px;font-size:.8rem;line-height:1.35;color:var(--dim);margin:4px 0 6px;padding:5px 0 0;border-top:1px solid var(--k-hair,#e6d3ac)}
.pc[data-k2]>.pcl>.kpbars>*{display:block!important}.pc[data-k2]>.pcl>.kpbars .rlab{display:inline!important}
.pc[data-k2]>.pcl>.kpbars .fbar{display:inline-block!important;vertical-align:middle;width:56px;margin:0 8px 0 4px}

 .pc.kpwide[data-k2]{display:grid!important;grid-template-columns:var(--kpcw) minmax(0,1fr)!important;gap:0 12px!important;align-items:start!important}
 .pc.kpwide[data-k2]>.pcl{position:sticky!important;top:0!important;z-index:2;display:flex!important;flex-direction:column;background:var(--panel2,#f6ead6)!important;max-height:calc(var(--kpcmax,100dvh) - 2px)!important;overflow-y:auto!important;overscroll-behavior:contain;scrollbar-width:thin}

/* narrow person card (Fold portrait, phones) */
.pc.kpnar[data-k2]{display:block!important}
.pc.kpnar[data-k2]>.pcl{position:static!important;display:grid!important;grid-template-columns:min(36%,230px) minmax(0,1fr);grid-template-areas:"por nm" "por bars" "por fx";grid-template-rows:auto auto 1fr;align-items:start;column-gap:10px;max-height:none!important;overflow:visible!important;background:none!important;padding-bottom:6px}
.pc.kpnar[data-k2]>.pcl>.pcp{grid-area:por;width:100%!important;margin:0!important;cursor:pointer}
.pc.kpnar[data-k2]>.pcl>.kpnm{grid-area:nm;display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 10px}
.pc.kpnar[data-k2]>.pcl>.kpnm>.pcname{font-family:var(--display);font-size:1.1rem;line-height:1.15;margin:0}
.pc.kpnar[data-k2]>.pcl>.kpnm>.pcrk{margin:0!important;font-size:.8rem}
.pc.kpnar[data-k2]>.pcl>.kpbars{grid-area:bars;border-top:1px solid var(--k-hair,#e6d3ac);padding-top:4px;margin:4px 0 0;font-size:.78rem}
.pc.kpnar[data-k2]>.pcl>.kwear,.pc.kpnar[data-k2]>.pcl>.kpfacts{display:none!important}
.pc.kpnar[data-k2] .kpstick{margin:0 -7px 6px;padding:5px 7px}
.pc.kpnar[data-k2] .kpstick .pctabs{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto!important;gap:5px}
.pc.kpnar[data-k2] .kpstick .pctabs>.pct{flex:0 0 auto;white-space:nowrap}
.kpsheetb .kwear{margin:0 0 8px}.kpsheetb .kpfacts{display:flex;flex-direction:column;gap:6px}
/* compact picker strip on portrait screens under 1000 px: one row of small faces + names, pager arrows */
/* kv: dropped @media (max-width:999px) and (orientation:portrait) (one page = spread page, KIT §0) */

 .pc.kpnar[data-k2]{display:block!important}
 .pc.kpnar[data-k2]>.pcl{position:static!important;max-height:none!important;overflow:visible!important}
 .pc.kpnar[data-k2]:not(.kpnar)>.pcl>.pcp.kit{width:min(46vw,190px)!important;float:none;margin:0 auto 4px!important}
 .pc.kpnar[data-k2] .kpstick{margin:6px -7px 6px}
 .pc.kpnar[data-k2] .kpstick .kpbars{font-size:.74rem}.pc.kpnar[data-k2] .kpstick .kpbars .fbar{width:40px}

`;document.head.appendChild(st)})();
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{requestAnimationFrame(kitPcSize)}catch(e){}return r}})();

/* ---------- 19. NO LONE BUTTON ROWS (owner 11/14, Fold): the "Bảng phẩm vị" button that took a whole row above the Phi tần face strip is
   gone. The rank table opens from her rank chip in the top bar (#me-r, tap = Hậu cung → Phi tần → Bảng phẩm vị); inside the table the
   one way back is the same kit sub-tab look ("Về hồ sơ từng người"). Rule: a single button never gets its own row; it folds into an
   existing control (chip, sub-tab, menu). ---------- */
(function(){if(typeof rvTabHTML!=="function")return;const r0=rvTabHTML;rvTabHTML=function(){let h=r0.apply(this,arguments);
 if(!window.__rb)h=h.replace(/<div class="pctabs"><button class="pct[^"]*" data-rboard="1">[^<]*<\/button><\/div>/,"");return h}})();
function kitRankBoard(){try{if(!S||S.dead||(typeof isSrv==="function"&&isSrv()))return;/* straight to Hậu cung → Phi tần from ANY tab or sub-tab (the group button would reopen the remembered sub-tab) */
 try{const m=$("modal");if(m&&!m.hidden&&Q.length&&/pcm/.test(Q[0].cls||"")){Q.shift();showModal()}}catch(e){}
 tab="rv";window.__rb=true;render();const P=$("panel");if(P)P.scrollTop=0}catch(e){console.error("kitRankBoard",e)}}
document.addEventListener("click",e=>{const r=e.target.closest&&e.target.closest("#me-r");if(!r)return;e.stopPropagation();e.preventDefault();kitRankBoard()},true);
(function(){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);try{const m=$("me-r");if(m){m.title="Chạm để xem Bảng phẩm vị";m.setAttribute("role","button");m.classList.add("krkb")}}catch(e){}return r}})();
/* leaving the Phi tần sub-tab (or the Hậu cung group) closes the table, so the face strip is what she sees next time */
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("#tabs [data-tab], .ksub .ksubb");if(t&&window.__rb&&!t.closest("[data-rboard]"))window.__rb=false},true);
(function(){const st=document.createElement("style");st.id="k2b-rkb";st.textContent=`
/* sticky sub-tabs (.ksub) in the panel: opaque, and the panel's 8 px top padding band above them is covered too (nothing peeks above) */
html body #panel .ksub{top:0!important;z-index:7!important;box-shadow:0 -9px 0 0 var(--panel),0 3px 6px -4px #5a3a2040}
#me-r.krkb{cursor:pointer;text-decoration:underline dotted color-mix(in srgb,var(--gold) 60%,transparent);text-underline-offset:3px}
#me-r.krkb:hover,#me-r.krkb:focus-visible{background:var(--k-sel,#fff3c4)}
`;document.head.appendChild(st)})();

/* ---------- 20. PERSON CARD INFO GRID (owner 11/14): every person card shows its facts as a compact grid of short labelled value chips
   (kit `.kpgrid > .kpgr > .kpc`), next to the portrait on the Fold/phones and under it on iPad. Rows: relation (Thiện cảm N ▮ · Oán N ▮ ·
   Nàng với ngươi · Ghen) · stats (Sủng · Danh · Đức · Sắc · Tài · Tâm cơ) · small facts (Tuổi · Tính nết · Muốn hại ngươi · status chips).
   Unknown = "?" (dim); the long wording ("chưa rõ (xem sổ thị tẩm)", "Bình thường") lives in the chip's tooltip (tap = kpPop). ---------- */
function kitPcGrid(pc){try{if(!pc||pc.querySelector(".kpgrid"))return;const L=pc.querySelector(":scope > .pcl");if(!L)return;
 const T=e=>String(e||"").replace(/\s+/g," ").trim();const unk=v=>/^(chưa rõ|\?|không rõ)/i.test(v);
 const chip=(lab,val,full,extra)=>{lab=String(lab||"");lab=lab.charAt(0).toUpperCase()+lab.slice(1);const u=unk(val);const w=document.createElement("span");
  w.innerHTML=kitStatCell(null,lab,u?"?":val,{tag:"span",cls:"kst-chip"+(u?" kst-unk":""),title:full||(lab+": "+val),nobar:true});const c=w.firstElementChild;if(extra)extra.forEach(x=>x&&c.appendChild(x));return c};
 const rowA=[],rowB=[],rowC=[];
 let PX=null;try{PX=typeof kitPersonByName==="function"?kitPersonByName((pc.querySelector(".pcname")||{}).textContent||""):null}catch(e){}
 const SJ=PX&&PX.queen?"Hoàng hậu":"Nàng",OB=PX&&PX.queen?"Hoàng hậu":"nàng";
 const QV=n=>(typeof quyW==="function"?quyW(n):"")+" · "+(n>0?"+":"")+n,RG=(k,l)=>typeof kitGloss==="function"?kitGloss(k,l):l;
 const bars=pc.querySelector(".kpbars");
 if(bars)[...bars.children].forEach(r=>{const t=T(r.textContent);
  const sb=[...r.querySelectorAll(".sbar")];if(sb.length){sb.forEach(x=>{const l=T((x.querySelector(".sbl")||{}).textContent),v=T((x.querySelector("b")||{}).textContent);rowA.push(chip(l,v,l+": "+v,[x.querySelector(".sbt")]))});return}
  if(/^Ghen/.test(t)){rowA.push(chip("Ghen",T(t.replace(/^Ghen:?/,"")),t));return}
  /* owner 11/15 05:25Z: subject + verb + object — "Nàng quý ngươi: Bình thường · -5", "Nàng oán ngươi: 0", "Ngươi quý nàng …", "Ngươi oán nàng …" */
  if(/với nàng/.test(t)){const fb=[...r.querySelectorAll(".fbar")];const nums=[...t.matchAll(/·\s*([+-]?\d+)/g)].map(m=>+m[1]);
   rowA.push(chip(RG("Quý","Ngươi quý "+OB),nums.length?QV(nums[0]):"?","Ngươi quý "+OB+": "+(nums.length?QV(nums[0]):"chưa rõ"),[fb[0]]));
   rowA.push(chip(RG("Oán","Ngươi oán "+OB),nums.length>1?String(nums[1]):"?","Ngươi oán "+OB+": "+(nums.length>1?nums[1]:"chưa rõ"),[fb[1]]));return}
  if(/^Nàng với ngươi/.test(t)){const fb=[...r.querySelectorAll(".fbar")];const nums=[...t.matchAll(/·\s*([+-]?\d+)/g)].map(m=>+m[1]);
   rowA.push(chip(RG("Quý",SJ+" quý ngươi"),nums.length?QV(nums[0]):"?",SJ+" quý ngươi: "+(nums.length?QV(nums[0]):"chưa rõ"),[fb[0]]));
   rowA.push(chip(RG("Oán",SJ+" oán ngươi"),nums.length>1?String(nums[1]):"?",SJ+" oán ngươi: "+(nums.length>1?nums[1]:"chưa rõ"),[fb[1]]));return}
  if(/^Sủng/.test(t)){const v=T(t.replace(/^Sủng:?/,""));rowB.push(chip("Sủng",unk(v)?"?":v.replace(/\s*\(.*\)$/,""),t));return}
  if(/^(Lòng|Chủ tin|Thương)/.test(t)){const m=t.match(/^([^:\d]+):?\s*(.*)$/);rowA.push(chip(T(m[1]),T(m[2]).replace(/\s*\(.*\)$/,""),t,[...r.querySelectorAll(".fbar,.mini")]));return}
  const m=t.match(/^([^:]{1,24}):\s*(.*)$/);if(m)rowA.push(chip(T(m[1]),T(m[2]),t,[...r.querySelectorAll(".fbar,.mini")]));else{const c=document.createElement("span");c.className="kst kst-chip";c.appendChild(r);rowA.push(c)}});
 pc.querySelectorAll(".kst-tile").forEach(k=>{if(k.hidden&&!/Sủng/.test(k.textContent))return;const l=T((k.querySelector(".kstl")||{}).textContent),v=T((k.querySelector(".kstv")||{}).textContent);
  if(/^Sủng$/i.test(l)&&rowB.some(c=>/Sủng/.test(c.textContent)))return;rowB.push(chip(l.charAt(0)+l.slice(1).toLowerCase(),v,l+": "+v))});
 const tiles=pc.querySelector(".kstgrid");
 const info=pc.querySelector(".kpfacts .pcinfo");if(info)[...info.children].forEach(sp=>{if(sp.classList.contains("krun")||sp.querySelector(".krun"))return;const t=T(sp.textContent).replace(/\s*ⓘ$/,"");const btn=sp.querySelector("button");
  const m=t.match(/^(Tuổi)\s+(\d+)/)||t.match(/^([^:]{1,24}):\s*(.*)$/)||t.match(/^([^\d:·]{2,20}?)\s+(-?\d+)$/);if(m&&T(m[2]).length<=28){rowC.push(chip(T(m[1]),T(m[2]),t,btn?[btn]:null));sp.remove()}});
 try{const nmx=(pc.querySelector(".pcname")||{}).textContent||"";const px=typeof kitPersonByName==="function"?kitPersonByName(nmx):null;
  if(px&&typeof rivals!=="undefined"&&rivals.includes(px)){const have=l=>rowA.some(c=>((c.querySelector("small")||{}).textContent||"").trim()===l);
   [[SJ+" quý ngươi","Quý"],[SJ+" oán ngươi","Oán"],["Ngươi quý "+OB,"Quý"],["Ngươi oán "+OB,"Oán"],["Ghen","Ghen"]].forEach(([l,g])=>{if(!have(l))rowA.push(chip(RG(g,l),"?",l+": chưa rõ"))})}}catch(e){}
 const ORD=[SJ+" quý ngươi",SJ+" oán ngươi","Ngươi quý "+OB,"Ngươi oán "+OB,"Ghen"],oi=c=>{const l=(c.querySelector("small")||{}).textContent||"";const i=ORD.indexOf(l.trim());return i<0?99:i};rowA.sort((x,y)=>oi(x)-oi(y));
 const SORD=["Sủng","Đức","Danh","Sắc","Tài","Tâm cơ"],si=c=>{const l=((c.querySelector("small")||{}).textContent||"").trim().toLowerCase();const i=SORD.findIndex(x=>x.toLowerCase()===l);return i<0?99:i};rowB.sort((x,y)=>si(x)-si(y));
 const g=document.createElement("div");g.className="kpgrid";[rowA,rowB,rowC].forEach((R,i)=>{if(!R.length)return;const d=document.createElement("div");d.className="kpgr kpgr"+i;R.forEach(c=>d.appendChild(c));g.appendChild(d)});
 if(!g.children.length)return;
 if(bars){bars.replaceWith(g)}else{const pp=L.querySelector(":scope > .kwear")||L.querySelector(":scope > .pcp");if(pp)pp.after(g);else L.appendChild(g)}
 if(tiles)tiles.remove();pc.querySelectorAll(".kpfacts").forEach(f=>{if(info&&!info.children.length)info.remove();if(!T(f.textContent)&&!f.querySelector("button,img"))f.remove()});
 /* narrow: the leftover facts (status chips) stay visible under the grid */
 const fx=pc.querySelector(":scope > .pcl > .kpfacts");if(fx)g.after(fx);
 }catch(e){console.error("kitPcGrid",e)}}
/* the ONE person-info component: every person card / sheet on every device goes through kitPcFix → kitPersonChips */
window.kitPersonChips=kitPcGrid;
(function(){const f0=kitPcFix;kitPcFix=function(pc){const r=f0.apply(this,arguments);try{kitPcGrid(pc)}catch(e){}try{kitPcSize()}catch(e){}return r}})();
document.addEventListener("click",e=>{const c=e.target.closest&&e.target.closest(".kpgrid .kst-chip");if(!c||e.target.closest("button"))return;try{if(typeof kpPop==="function"){kpPop(c,`<div class="kpopt">${c.title}</div>`);e.stopPropagation()}}catch(x){}},true);
(function(){const st=document.createElement("style");st.id="k2b-pcgrid";st.textContent=`
.kpgrid{display:flex;flex-direction:column;gap:4px;margin:4px 0 6px}
.kpgr{display:flex;flex-wrap:wrap;gap:4px}
.kst-chip{display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border:1px solid var(--k-hair,#e6d3ac);border-radius:7px;background:var(--k-card,#fffaf0);font-size:.76rem;line-height:1.25;white-space:nowrap;cursor:help}
.kst-chip>.kstl{color:var(--k-lab,#8a7350);font-size:.68rem;font-weight:600}
.kst-chip>.kstv{color:var(--ink);font-weight:700}
.kst-chip.kst-unk>.kstv{color:var(--dim);font-weight:500}
.kst-chip .fbar{display:inline-block!important;width:34px!important;margin:0!important;vertical-align:middle}
.kst-chip button.lnk{padding:0 2px;min-height:0;font-size:.8rem}
.kpgr0 .kst-chip{background:color-mix(in srgb,var(--k-card,#fffaf0) 80%,#f3dfc0)}
.pc[data-k2]>.pcl>.kpgrid{order:0}
.pc.kpnar[data-k2]>.pcl>.kpgrid{grid-area:bars;margin:2px 0 0}
.pc.kpnar[data-k2]>.pcl>.kpfacts{display:flex!important;grid-area:fx;margin:4px 0 0;flex-direction:column;gap:4px}
.pc.kpnar[data-k2]>.pcl>.kpfacts .chips{gap:4px}
.pc.kpwide .kpgrid{gap:3px}.pc.kpwide .kpgr{gap:3px}.pc.kpwide .kst-chip{font-size:.7rem;padding:1px 5px;gap:3px}.pc.kpwide .kst-chip>.kstl{font-size:.62rem}.pc.kpwide .kst-chip .fbar{width:22px!important}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();
