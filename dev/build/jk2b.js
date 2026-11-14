
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
   down to the bottom of the band (canvas x 0–550, y 0–795, aspect 550:795); the pendant/tassel below is not drawn here. Every card on a screen
   uses the SAME cell width (--kpcw), so the photo window (384x506 canvas units) is the same size for every rank and role.
   Layout: portrait left, name / rank / info beside it (float), act groups full width below: the Fold shows portrait + name + rank +
   the first info lines without scrolling. */
(function(){const st=document.createElement("style");st.id="k2b-pcard";st.textContent=`
:root{--kpcw:clamp(150px,34vw,230px)}
@media (min-width:600px) and (max-width:999px){:root{--kpcw:clamp(150px,26vw,200px)}}
@media (min-width:1000px){:root{--kpcw:clamp(150px,14vw,210px)}}
.pc{display:block!important;overflow:auto;overscroll-behavior:contain}
.pc>.pcl,.pc>.pcr{overflow:visible!important;min-height:auto!important}
.pc>.pcl{display:block!important;width:auto!important;max-width:none!important}
.pc>.pcl::after{content:"";display:block;clear:both}
.pc>.pcl>.pcp.kit{float:left;width:var(--kpcw)!important;height:auto!important;max-height:none!important;min-height:0!important;aspect-ratio:550/795!important;overflow:hidden!important;container-type:normal!important;margin:0 12px 6px 0!important}
.pc>.pcl>.pcp.kit>.kin{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:130.44%!important;transform:none!important}
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
function kitFloorFit(){try{const st=$("stage"),im=$("scimg");if(!st||!im)return;const m=/url\(["']?([^"')]+)["']?\)/.exec(im.style.backgroundImage||"");if(!m){st.style.removeProperty("--kfb");st.style.removeProperty("--kfh");im.style.backgroundPosition="";return}
 const url=m[1],name=url.split("/").pop().replace(/\.\w+$/,"");const sz=KIT_BGSZ[url];
 if(!sz){KIT_BGSZ[url]={w:1280,h:720,pending:1};const I=new Image();I.onload=()=>{KIT_BGSZ[url]={w:I.naturalWidth,h:I.naturalHeight};kitFloorFit()};I.src=url}
 const S0=KIT_BGSZ[url];const W=st.clientWidth,H=st.clientHeight;if(!W||!H)return;const ft=KIT_FLOOR[name]!=null?KIT_FLOOR[name]:KIT_FLOOR._default;
 const s=Math.max(W/S0.w,H/S0.h),dh=S0.h*s;let y0=0,py=50;
 if(dh>H+1){y0=Math.min(0,Math.max(H-dh,.40*H-ft*dh));py=(y0/(H-dh))*100}
 im.style.backgroundPosition=`50% ${py.toFixed(1)}%`;
 const fs=ft+.9*(1-ft);let feet=Math.min(H*.97,y0+fs*dh);const kfb=Math.max(H*.03,24,H-feet);st.style.setProperty("--kfb",kfb.toFixed(0)+"px");st.style.setProperty("--kfh",Math.max(H*.45,H-kfb-H*.03).toFixed(0)+"px");st.dataset.kfloor=name}catch(e){}}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);kitFloorFit();return r};
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
 const tokRow=$("tokens");const OV=.2;/* neighbours may overlap by 20 % of a figure's width (sleeves), like people standing in a group */
 const ws=toks.map(e=>base*ks(e)*ar(e)+4);const meW=me?base*ar(me):0;const wide=!!(me&&toks.length&&tokRow);
 const tot=ov=>ws.reduce((x,y)=>x+y,0)-ov*ws.slice(1).reduce((x,y)=>x+y,0)+(wide?meW*(1-ov):0);let OVu=OV,total=tot(OV);
 if(toks.length&&(W-16)/total<.85){OVu=.36;total=tot(OVu)}/* a crowd stands closer before anyone shrinks */
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
@media (max-width:599px) and (orientation:portrait){
 .game:not(.maptab):not(.cardtab){grid-template-rows:auto minmax(0,40dvh) minmax(0,1fr) auto!important}
 .game.cardtab{grid-template-rows:auto minmax(0,24dvh) minmax(0,1fr) auto!important}
 header.hud>.me .dt{font-size:.66rem!important;line-height:1.2}
 header.hud>.hud2.khud.col{flex-wrap:nowrap!important;gap:3px!important}
 header.hud>.hud2.khud>.h2t{min-height:26px!important;height:26px;padding:0 6px!important;font-size:.7rem!important}
 header.hud>.hud2.khud .hc{padding:1px 5px!important;font-size:.66rem!important}
}
@media (min-width:600px) and (max-width:999px) and (orientation:portrait){
 .game.cardtab{grid-template-rows:auto minmax(0,22dvh) minmax(0,1fr) auto!important}
}`;document.head.appendChild(st)})();

/* ---------- 4. TRONG CUNG block (owner 11/14): Hoàng thượng · Thái hậu · Hoàng hậu — mood + attitude toward her; "chưa rõ" when unknown;
   tap = that person's card. Landscape (iPad): on the stage under the Tư chất block (#kstat), same side, ONLY when it covers no figure.
   Portrait (Fold, phones): a column "Trong cung" in the status sheet (#hud2 .khg). Data hooks: window.kitCourtMood(who) -> text|null and
   window.kitCourtKnown(who) -> bool (default: the Emperor's mood is public; Thái hậu / Hoàng hậu moods are "chưa rõ" until a module says). ---------- */
function kitCourtRows(){const out=[];if(!S||S.dead)return out;const mood=w=>{try{if(typeof window.kitCourtMood==="function"){const r=window.kitCourtMood(w);if(r!=null)return r}}catch(e){}
  if(w==="emp"){const m=MOODS[S.emp&&S.emp.mood];return m?[m[0],m[1]]:null}return null};
 const att=(n)=>typeof affW==="function"?[affW(n),n>10?"g":n<-10?"r":""]:[String(n),""];
 const known=w=>{try{if(typeof window.kitCourtKnown==="function"){const r=window.kitCourtKnown(w);if(r!=null)return r}}catch(e){}return true};
 out.push({k:"emp",who:"Hoàng thượng",f:pEmp(),mood:mood("emp"),att:known("emp")?[S.sung>=60?"Sủng ái":S.sung>=30?"Để mắt":S.sung>=10?"Biết mặt":"Chưa để ý",S.sung>=30?"g":""]:null});
 if(!S.thDead)out.push({k:"th",who:"Thái hậu",f:pTH(),mood:mood("th"),att:known("th")?att(S.th|0):null});
 const q=typeof queenP==="function"?queenP():null;if(q&&q!==S)out.push({k:"hh",who:"Hoàng hậu",f:pv(q),mood:mood("hh"),att:known("hh")?att(S.hh|0):null,ref:q});
 return out}
function kitCourtHTML(cls){const R=kitCourtRows();if(!R.length)return"";const v=(x,l)=>x?`<span class="ef ${x[1]==="g"?"g":x[1]==="r"?"r":"n"}">${x[0]}</span>`:`<span class="ef n">chưa rõ</span>`;
 return `<div class="kcourt ${cls||""}"><b class="khh">Trong cung</b>`+R.map(r=>`<button class="kcrow" data-kc="${r.k}" title="Chạm để xem thẻ ${r.who}">${mdH(r.f,"xs")}<span class="kcn">${r.who}</span><span class="kcv"><small>Tâm trạng</small>${v(r.mood)}<small>Với ngươi</small>${v(r.att)}</span></button>`).join("")+`</div>`}
function kitCourtOpen(k){try{if(Q.length&&!/pcm/.test(Q[0].cls||""))return;if(k==="emp"){showEmp();return}
 const tb=k==="th"?"rel":"rv";if(k==="th")relSel="th";else{const q=queenP();const i=rivals.indexOf(q);if(i>=0)PG.rv=i}
 const b=document.querySelector(`[data-tab="${tb}"]`);if(b)b.click();else{tab=tb;render()}}catch(e){console.error("kitCourtOpen",e)}}
addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".kcrow[data-kc]");if(!b)return;e.stopPropagation();const el=$("hud2");if(el&&!el.classList.contains("col")&&b.closest("#hud2")){const x=el.querySelector(".khx");if(x)x.click()}kitCourtOpen(b.dataset.kc)},true);
function kitCourtStage(){try{const st=$("stage"),ks=$("kstat");let o=$("kcourt");const land=innerWidth>innerHeight;
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
function kitMask(src){if(KIT_MASK[src])return KIT_MASK[src].b?KIT_MASK[src]:null;KIT_MASK[src]={};const I=new Image();I.onload=()=>{try{const N=24,Wc=48;const c=document.createElement("canvas");c.width=Wc;c.height=N*4;const x=c.getContext("2d");x.drawImage(I,0,0,Wc,N*4);const d=x.getImageData(0,0,Wc,N*4).data;const b=[];
  for(let r=0;r<N;r++){let lo=1,hi=0;for(let yy=r*4;yy<r*4+4;yy++)for(let xx=0;xx<Wc;xx++){if(d[(yy*Wc+xx)*4+3]>40){lo=Math.min(lo,xx/Wc);hi=Math.max(hi,(xx+1)/Wc)}}b.push(hi>lo?[lo,hi]:null)}
  KIT_MASK[src]={b};setTimeout(()=>{try{khStage()}catch(e){}},30)}catch(e){KIT_MASK[src]={b:null,bad:1}}};I.src=src;return null}
kitFigRects=function(){const st=$("stage");if(!st)return[];const out=[];st.querySelectorAll("#mefig, #tokens .tok img.figimg, #tokens .tok:not(.fig) .md").forEach(e=>{if(!e.offsetParent&&e.id!=="mefig")return;const r=e.getBoundingClientRect();if(r.width<8||r.height<8)return;
  const m=e.tagName==="IMG"?kitMask(e.currentSrc||e.src):null;if(!m){out.push({left:r.left,right:r.right,top:r.top,bottom:r.bottom});return}
  const N=m.b.length,bh=r.height/N;m.b.forEach((x,i)=>{if(x)out.push({left:r.left+r.width*x[0]-4,right:r.left+r.width*x[1]+4,top:r.top+i*bh,bottom:r.top+(i+1)*bh})})});return out};

/* ---------- 6. OPTION MODE "cost" — hidden outcomes for EVENT choices (owner 11/14) ----------
   Weekly events (j68), Mệnh truyện chapters (j67), side events and dilemmas: the option shows ONLY what it costs (Sức, khắc, Bạc) — no Được/Mất/Kèm,
   no odds word, no notes. The result card afterwards still shows the true numbers (resultShow is untouched). Normal act cards keep everything.
   Use (data only): a Q / kitModal item with `hideOut:true` (every option) or an option with `hideOut:true`; any priced button may also carry
   `data-khide="1"`. An option with no such cost reads "Tốn: không". ---------- */
const KIT_COSTRE=/khắc|\bSức\b|\bBạc\b|\bbạc\b/i;
function kitHideOut(b){try{if(!b||!b.classList.contains("ka")||b.dataset.khid==="1")return;b.dataset.khid="1";b.classList.add("khideout");
 const od=b.querySelector(":scope > .kat > .kodds");if(od)od.remove();b.querySelectorAll(".kb .kr").forEach(r=>{if(!r.classList.contains("kr-ton")&&!r.classList.contains("kr-why"))r.remove()});
 const kb=b.querySelector(".kb");let ton=b.querySelector(".kr-ton");if(ton){const v=ton.querySelector(".krv");[...v.children].forEach(e=>{if(e.classList.contains("ksep"))return;if(!KIT_COSTRE.test(e.textContent))e.remove()});
  [...v.children].forEach((e,i,a)=>{if(e.classList.contains("ksep")&&(!e.previousElementSibling||e.previousElementSibling.classList.contains("ksep")||!e.nextElementSibling))e.remove()});
  if(!v.querySelector(".ef"))v.innerHTML=`<span class="ef n">không</span>`}
 else if(kb){kb.insertAdjacentHTML("beforeend",`<span class="kr kr-ton"><span class="krl">Tốn</span><span class="krv"><span class="ef n">không</span></span></span>`)}
 else b.insertAdjacentHTML("beforeend",`<small class="kb"><span class="kr kr-ton"><span class="krl">Tốn</span><span class="krv"><span class="ef n">không</span></span></span></small>`)}catch(e){console.error("kitHideOut",e)}}
(function(){const n0=kaNorm1;kaNorm1=function(b){const r=n0.apply(this,arguments);try{if(b&&b.dataset&&(b.dataset.khide==="1"||b.closest("[data-khide-all]")))kitHideOut(b)}catch(e){}return r}})();
/* ON BY DEFAULT for every event choice, found at the shared builders: an item made by pushDil / pushFront / mkP (it carries pid / pp: weekly
   events j68, Mệnh truyện chapters j67, side events, dilemmas j70, story lines j96/j97 and any later module using them) or a kit choice panel
   (kit.kind "choice"). An item may opt out with showOut:true (never for events). */
function kitIsEventChoice(m){return !!(m&&m.opts&&m.opts.length&&!m.showOut&&(m.hideOut||("pid" in m)||("pp" in m)||(m.kit&&(m.kit.kind==="choice"||m.kit.hideOut))))}
(function(){const s0=showModal;showModal=function(){const m=Q[0];if(kitIsEventChoice(m))m.hideOut=true;const r=s0.apply(this,arguments);try{if(m&&m.opts&&(m.hideOut||m.opts.some(o=>o&&o.hideOut))){
  document.querySelectorAll("#modal .opts > button[data-m], #modal .opts button.opt").forEach(b=>{const o=m.opts[+b.dataset.m];if(m.hideOut||(o&&o.hideOut)){b.dataset.khide="1";if(b.classList.contains("ka"))kitHideOut(b)}})}}catch(e){console.error("hideOut",e)}return r}})();

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
   Places: tall frame (.kin > .kfxc clip = photo window; inner box = the por picture 384x506, 9 % lower like .kpor), small frame (.kmini > .kfxc),
   stage figures (.kfxf box laid exactly over the figure image). A picture without fit data gets nothing (never a guessed position). ---------- */
kitVeiled=function(){return false};
function kitVeilOn(p){try{if(!p)return false;if(window.KIT_VEIL&&typeof KIT_VEIL.on==="function"&&KIT_VEIL.on(p))return true;if(typeof scarOf==="function"){const s=scarOf(p);return !!(s&&s.veil)}}catch(e){}return false}
function kitScarOf(p){try{if(!p||!p.scar||!window.KIT_SCAR)return null;const on=KIT_SCAR.on(p)||!!p.scar.known;if(!on)return null;const sev=Math.max(1,Math.min(3,p.scar.sev|0||1));return{sev,src:KIT_SCAR.src(sev)}}catch(e){return null}}
const kitFxVars=st=>st.replace(/(^|;)\s*(left|top|width|height|transform|transform-origin):/g,(m,a,k)=>`${a}--f${k.replace('transform-origin','to').replace('transform','tf')}:`);
function kitFxLayers(p,file){if(!p||!file)return"";let h="";const sc=kitScarOf(p);if(sc&&window.KIT_SCAR){const st=KIT_SCAR.style(file);if(st)h+=`<img class="kscar" src="${sc.src}" alt="" aria-hidden="true" style="${kitFxVars(st)}" onerror="this.remove()">`}
 if(kitVeilOn(p)&&window.KIT_VEIL&&KIT_VEIL.style){const t=KIT_VEIL.tierOf(p);const st=KIT_VEIL.style(file,t);if(st)h+=`<img class="kveil2" src="${KIT_VEIL.src(t)}" alt="" aria-hidden="true" style="${kitFxVars(st)}" onerror="this.remove()">`}return h}
const kitFile=src=>String(src||"").split("?")[0].split("/").pop();
(function(){const p0=pcPort;pcPort=function(f){let h=p0.apply(this,arguments);try{const p=f&&f.__kp;if(!p||!/class="kpor"/.test(h))return h;const m=/<img class="kpor" src="([^"]+)"/.exec(h);if(!m||/face-|unknown/.test(m[1]))return h;
  const fx=kitFxLayers(p,kitFile(m[1]));if(fx)h=h.replace(/(<img class="kfr")/,`<span class="kfxc"><span class="kfx">${fx}</span></span>$1`)}catch(e){}return h}})();
(function(){const m0=mdH;mdH=function(p){let h=m0.apply(this,arguments);try{const q=p&&p.__kp;if(!q)return h;const m=/<img[^>]*src="([^"]*por-[^"]+)"/.exec(h);if(!m)return h;const fx=kitFxLayers(q,kitFile(m[1]));
  if(fx)h=h.replace(/<i class="kmf"/,`<span class="kfxc kfxm"><span class="kfx">${fx}</span></span><i class="kmf"`)}catch(e){}return h}})();
function kitFigFx(){try{const st=$("stage");if(!st)return;st.querySelectorAll(".kfxf").forEach(e=>e.remove());const ppl=typeof curPeople==="function"?curPeople():[];
 const put=(img,p,host)=>{if(!img||!p||(typeof kitIsKnown==="function"&&!kitIsKnown(p)))return;const fx=kitFxLayers(p,kitFile(img.currentSrc||img.src));if(!fx)return;const s=document.createElement("span");s.className="kfxf";s.innerHTML=fx;
  s.style.cssText=`position:absolute;pointer-events:none;z-index:2;left:${img.offsetLeft}px;top:${img.offsetTop}px;width:${img.offsetWidth}px;height:${img.offsetHeight}px`;img.classList.add("kfxon");host.appendChild(s)};
 st.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];put(b.querySelector("img.figimg"),p&&p.ref,b)});
 const me=$("mefig");if(me&&typeof S!=="undefined")put(me,S,me.parentElement)}catch(e){}}
(function(){const k0=kitStageScale;kitStageScale=function(){const r=k0.apply(this,arguments);try{kitFigFx()}catch(e){}return r}})();
/* the fit tables load asynchronously: redraw once both are in */
(function(){let n=0;const chk=()=>{if(window.KIT_VEIL&&KIT_VEIL.fit&&window.KIT_SCAR&&KIT_SCAR.fit){try{if(typeof S!=="undefined"&&S&&!S.dead&&typeof render==="function"&&!Q.length)render()}catch(e){}return}if(++n<40)setTimeout(chk,250)};setTimeout(chk,300)})();
(function(){const st=document.createElement("style");st.id="k2b-fx";st.textContent=`
.pcp.kit .kin>.kfxc{position:absolute;left:14.655%;top:20.289%;width:70.691%;height:49.373%;overflow:hidden;pointer-events:none;z-index:1}
span.md.kmini.kmini>.kfxc{position:absolute;left:9.66%;top:11.75%;width:80.67%;height:80.3%;overflow:hidden;pointer-events:none;z-index:1}
.kfxc>.kfx{position:absolute;left:0;top:9%;width:100%;height:100%}
span.md.kmini.kmini>.kfxc>.kfx{top:8.4%}
.kfx>img,.kfxf>img,.pcp.kit .kin .kfx>img,span.md.kmini.kmini .kfx>img{position:absolute!important;inset:auto!important;display:block!important;left:var(--fleft)!important;top:var(--ftop)!important;width:var(--fwidth)!important;height:var(--fheight)!important;transform:var(--ftf,none)!important;transform-origin:var(--fto,50% 50%)!important;max-width:none!important;max-height:none!important;min-width:0!important;object-fit:fill!important;border-radius:0!important;pointer-events:none;mask-image:none!important;-webkit-mask-image:none!important}
.kfx>img.kscar,.kfxf>img.kscar{opacity:.85}
img.figimg.kfxon,#mefig.kfxon{animation:none!important}
`;document.head.appendChild(st)})();

/* ---------- 8. OWNER 11/14 (2): the stage is for the room and the people. The Trong cung block and the Tư chất block leave the stage:
   Tư chất lives in the status sheet ("▾ Tư chất"); Thái hậu and Hoàng hậu get small chips beside the Hoàng thượng chip in the header
   (mini kit frame, title, mood; tap = card). The full Trong cung table stays in the status sheet (26.4). ---------- */
kitCourtStage=function(){const o=$("kcourt");if(o)o.remove()};
(function(){const k0=khStage;khStage=function(){const o=$("kstat");if(o)o.remove();try{kitCourtStage()}catch(e){}}})();
function kitCourtChips(){try{const emp=$("emp");if(!emp||!S||S.dead){const b=$("kcchips");if(b)b.remove();return}let box=$("kcbox");
 const wide=innerWidth>=1000;let c=$("kcchips");if(!c){c=document.createElement("div");c.id="kcchips";c.className="kcchips"}
 if(wide){if(!box){box=document.createElement("div");box.id="kcbox";box.className="kcbox";emp.parentNode.insertBefore(box,emp);box.appendChild(emp)}if(c.parentNode!==box)box.appendChild(c);c.classList.remove("kcrowh")}
 else{if(box){box.parentNode.insertBefore(emp,box);box.remove()}const h2=$("hud2");if(h2&&c.parentNode!==h2)h2.appendChild(c);c.classList.add("kcrowh")}
 const R=kitCourtRows().filter(r=>r.k!=="emp");c.hidden=!R.length;
 c.innerHTML=R.map(r=>{const m=r.mood,a=r.att;const w=m?m:a?["chưa rõ tâm trạng",""]:null;return `<button class="kcchip kcrow" data-kc="${r.k}" title="${r.who} · chạm để xem thẻ">${mdH(r.f,"xs")}<span class="kcct"><b>${r.who}</b><span class="ef ${m&&m[1]==="g"?"g":m&&m[1]==="r"?"r":"n"}">${m?m[0]:"chưa rõ"}</span></span></button>`}).join("")}catch(e){console.error("kitCourtChips",e)}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{kitCourtChips()}catch(e){}return r}})();
(function(){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{kitCourtChips()}catch(e){}return r}})();
addEventListener("resize",()=>{clearTimeout(window.__kccT);window.__kccT=setTimeout(kitCourtChips,150)});
(function(){const st=document.createElement("style");st.id="k2b-cchips";st.textContent=`
header.hud>.kcbox{grid-area:emp;display:flex;align-items:stretch;gap:4px;min-width:0;justify-self:end}
header.hud>.kcbox>.emp{grid-area:auto!important;margin:0!important}
.kcchips{display:flex;flex-direction:column;gap:2px;justify-content:center}
.kcchips .kcchip{display:flex!important;align-items:center;gap:4px;padding:1px 6px 1px 3px!important;border:1px solid var(--line);border-radius:8px;background:#fffaf0;min-height:0;cursor:pointer;font:inherit;text-align:left;grid-template-columns:none}
.kcchips.kcrowh{flex-direction:row;margin-left:auto;gap:3px;order:99}
#hud2.col>.kcchips.kcrowh{display:flex}
.kcchips .kcchip .kcct{display:flex;flex-direction:column;line-height:1.1}
.kcchips .kcchip b{font-size:.7rem;color:var(--gold);font-weight:600;white-space:nowrap}
.kcchips .kcchip .ef{font-size:.64rem;font-weight:600;white-space:nowrap}
.kcchips .kcchip .ef.n{color:var(--dim)}
@media (max-width:599px){header.hud>.hud2.khud.col{flex-wrap:wrap!important}.kcchips.kcrowh{flex-basis:100%;justify-content:flex-end}.kcchips .kcchip{padding:0 4px 0 2px!important}.kcchips .kcchip b{font-size:.62rem}.kcchips .kcchip .ef{font-size:.58rem}}
`;document.head.appendChild(st)})();

/* ---------- 9. ONE FRAME (owner 11/14 B + C): every portrait frame in the game — big card, dialog, small frames in strips, HUD, podium, week
   book, chips — is built by ONE function, pcPort (j60 layers on the 550x1037 canvas); mdH(face,size) now calls the same pcPort and shows the
   same cell (canvas y 0–795: crest room + photo window + band) at a smaller width. So the rank crest (phoenix, dragon, Thái hậu…) shows whole
   at every size, and a change to the frame shows everywhere.
   C: (1) the portrait is cut tighter: the por picture is 1.14x the window, raised 5 % of its height, clipped to the window (head near the top
   edge, person larger); (2) every rank/role has its own crest on the top bar (img/kit/crest-<key>.webp, gpt-2-6, one style reference: the
   approved Hoàng hậu frame), smaller for low ranks; Hoàng hậu, Hoàng thượng, Thái hậu and Thái tử keep the crest painted in their frame. ---------- */
window.KIT_CREST={ar:{"consort-0":.329,"consort-1":.337,"consort-2":.538,"consort-3":.506,"consort-4":.569,"consort-5":.554,"maid-0":.483,"maid-1":.467,"maid-2":.521,"maid-3":.481,"maid-4":.479,"mama-0":.263,"mama-1":.283,"mama-2":.317,"mama-3":.423,"mama-4":.419,"eunuch":.283,"unknown":.254},
 base:{"consort-0":.95,"consort-1":.95,"consort-2":.66,"consort-3":.72,"consort-4":.62,"consort-5":.62,"maid-0":.96,"maid-1":.96,"maid-2":.86,"maid-3":.93,"maid-4":.72,"mama-0":.89,"mama-1":.9,"mama-2":.81,"mama-3":.8,"mama-4":.75,"eunuch":.9,"unknown":.97},
 w:{"consort-0":300,"consort-1":320,"consort-2":344,"consort-3":366,"consort-4":388,"consort-5":410,"maid-0":190,"maid-1":205,"maid-2":220,"maid-3":235,"maid-4":250,"mama-0":250,"mama-1":266,"mama-2":282,"mama-3":298,"mama-4":314,"eunuch":280,"unknown":300},W:380,
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
.kfxc>.kfx,span.md .kfxc>.kfx{left:-7%!important;top:-5.7%!important;width:114%!important;height:114%!important}
/* crest on the top bar */
.kin>img.kcrest,.pcp.kit .kin>img.kcrest:not(.kfr):not(.kgem):not(.kemb):not(.kpor){position:absolute!important;inset:auto!important;left:var(--cl)!important;top:var(--ct)!important;width:var(--cw)!important;height:var(--ch)!important;max-width:none!important;object-fit:fill!important;border-radius:0!important;z-index:3;pointer-events:none;filter:drop-shadow(0 1px 1px #0004)}
/* the small frame cell (mdH): same layers as .pcp.kit, cell = canvas y 0–795 */
span.md.kfc{position:relative!important;display:inline-block;flex:0 0 auto;width:60px!important;height:auto!important;max-height:none!important;aspect-ratio:550/795!important;overflow:hidden!important;background:none!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:0!important;animation:none!important;transform:none!important;vertical-align:middle;font-size:0}
span.md.kfc.kfc{position:relative!important;contain:layout paint;width:60px!important;height:auto!important;min-height:0!important;aspect-ratio:550/795!important}
span.md.kfc.kfc.xs,button.ka .kan span.md.kfc.kfc.xs{width:26px!important;height:auto!important;position:relative!important;display:inline-block!important}span.md.kfc.kfc.sm{width:38px!important}span.md.kfc.kfc.big{width:84px!important}
span.md.kfc>.kin{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:130.44%!important;transform:none!important;display:block!important;isolation:isolate}
span.md.kfc .kin>.kbg{position:absolute;left:14.655%;top:20.289%;width:70.691%;height:49.373%;background:#5a1e16 center/cover no-repeat;z-index:-1}
span.md.kfc .kin>img{position:absolute!important;right:auto!important;bottom:auto!important;max-width:none!important;max-height:none!important;border-radius:0!important;box-shadow:none!important;animation:none!important}
span.md.kfc .kin>img.kpor{left:14.655%!important;top:24.733%!important;width:70.691%!important;height:44.930%!important;object-fit:cover!important;object-position:50% 0!important}
span.md.kfc .kin>img.kpor:not([src*="face-"]):not([src*="unknown"]){left:9.707%!important;top:17.475%!important;width:80.588%!important;height:56.285%!important;clip-path:inset(5% 6.14% 7.28% 6.14%)}
span.md.kfc .kin>img.kcrest{left:var(--cl)!important;top:var(--ct)!important;width:var(--cw)!important;height:var(--ch)!important;object-fit:fill!important;z-index:3}
span.md.kfc .kin>img.kpor[src*="face-"],span.md.kfc .kin>img.kpor[src*="unknown"]{top:20.289%!important;height:49.373%!important}
span.md.kfc .kin>img.kfr{left:0!important;top:0!important;width:100%!important;height:100%!important;object-fit:fill!important;z-index:2}
span.md.kfc .kin>img.kgem{left:73.564%!important;top:64.609%!important;width:18.327%!important;height:auto!important;aspect-ratio:1;z-index:3}
span.md.kfc .kin>img.kemb,span.md.kfc .kin>.klab{display:none!important}
span.md.kfc .kin>.kfxc{position:absolute;left:14.655%;top:20.289%;width:70.691%;height:49.373%;overflow:hidden;z-index:1}
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
 const face=pcp&&pcp.querySelector("img.kpor");strip.innerHTML=`<span class="kpsn"><b>${name}</b>${nm&&nm.classList.contains("pcrk")?`<small>${nm.innerHTML}</small>`:""}</span><span class="kpsb">${bars.innerHTML}</span>`;
 if(pcp){const mini=document.createElement("span");mini.className="kpsf";const kin=pcp.querySelector(".kin");if(kin){mini.innerHTML=`<span class="md kit kfc sm">${kin.outerHTML}</span>`}strip.prepend(mini)}
 pc.prepend(strip);const upd=()=>{pc.style.setProperty('--kpch',pc.clientHeight+'px');const pr=pc.getBoundingClientRect();const bb=bars.getBoundingClientRect();const vb=Math.min(pr.bottom,innerHeight);
  const hidden=bars.offsetParent&&(bb.top<pr.top+4||bb.bottom>vb-2);strip.classList.toggle("on",innerWidth<1000&&!!hidden)};
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
@container (min-width:600px){}
@media (min-width:600px){
 .pc[data-k2]{display:grid!important;grid-template-columns:var(--kpcw) minmax(0,1fr);gap:0 12px;align-items:start}
 .pc[data-k2]>.pcl{position:sticky;top:0;z-index:2;background:var(--panel2);padding-bottom:4px;max-height:var(--kpch,none);overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}
 .pc[data-k2]>.pcl>.pcp.kit{float:none;margin:0 0 4px!important}
 .pc[data-k2]>.pcl{display:flex!important;flex-direction:column}
 .pc[data-k2]>.pcl>.pcname,.pc[data-k2]>.pcl>b:first-of-type{order:-3}.pc[data-k2]>.pcl>.pcrk{order:-2}.pc[data-k2]>.pcl>.kpbars{order:-1;margin:0 0 4px}
 .pc[data-k2]>.pcr{margin-top:0}
 .pc[data-k2]>.kpstrip{grid-column:1/-1}
}
@media (max-width:999px){
 .pc[data-k2]>.kpstrip{display:flex;position:sticky;top:-8px;z-index:5;margin:-8px -8px 0;padding:4px 8px;gap:8px;align-items:center;background:var(--panel2);border-bottom:1px solid var(--k-hair);box-shadow:0 2px 6px #5a3a2022;visibility:hidden;height:0;overflow:hidden;opacity:0;transition:opacity .15s}
 .pc[data-k2]>.kpstrip.on{visibility:visible;height:auto;opacity:1}
 .kpstrip .kpsn{display:flex;flex-direction:column;line-height:1.15}.kpstrip .kpsn b{font-family:var(--display);font-size:.95rem}.kpstrip .kpsn small{font-size:.72rem;color:var(--gold);display:flex;align-items:center;gap:3px}
 .kpstrip .kpsb{display:flex;flex-wrap:wrap;gap:0 10px;font-size:.72rem;color:var(--dim);flex:1;min-width:0}.kpstrip .kpsb>*{display:inline-flex;flex-wrap:wrap;align-items:center;gap:2px}
}
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
function kitEvArt(m){try{if(!m||typeof evArtOf!=="function")return null;let src="",lab="";const pp=m.pp||{};const salt=(typeof S!=="undefined"&&S)?(S.year*100+S.month*3+(S.tuan||0)):0;
 if(m.art)src=m.art;else if(m.stArt&&typeof stArtOf==="function")src=stArtOf.apply(null,m.stArt);
 if(!src){const id=m.evId||(m.pid?(m.pid+(pp&&(pp.id||pp.k)?":"+(pp.id||pp.k):"")):"")||(m.kind==="news"||/Tin trong cung/.test(m.t||"")?"news:"+(m.t||""):"");if(id){src=evArtOf(id,salt);lab=typeof evArtTitle==="function"?evArtTitle(id):""}}
 if(!src&&kitIsEventChoice(m)){src=evArtOf("default",salt)}return src?{src,lab:lab||""}:null}catch(e){return null}}
(function(){const s0=showModal;showModal=function(){const m=Q[0];const r=s0.apply(this,arguments);try{const M=$("modal"),dlg=M&&M.querySelector(".dlg.kpanel");const body=M&&M.querySelector("#mb > .kpb");if(!m||!dlg||!body)return r;
  const kind=dlg.dataset.kind||"";const want=kitIsEventChoice(m)||kind==="news"||m.art||m.stArt||m.evId;if(!want||body.querySelector(":scope > .kpsubj"))return r;
  const a=kitEvArt(Object.assign({kind},m));if(!a)return r;window.__kitLastEvArt=a;body.classList.add("kphas","kpinfo");body.insertAdjacentHTML("afterbegin",`<div class="kpsubj kpiart kpev">${kitArtFrame(a.src,a.lab)}</div>`)}catch(e){console.error("kitEvArt",e)}return r}})();
/* the result card right after an event choice shows the same picture, small, left of the rows */
(function(){if(typeof runOpt!=="function"&&typeof resultShow!=="function")return;const r0=resultShow;resultShow=function(){const r=r0.apply(this,arguments);try{const a=window.__kitLastEvArt;window.__kitLastEvArt=null;const t=$("rtoast");if(a&&t&&!t.querySelector(".kpev")){t.classList.add("kevres");t.insertAdjacentHTML("afterbegin",`<div class="kpev kpevr">${kitArtFrame(a.src,a.lab)}</div>`)}else if(t&&!a){t.classList.remove("kevres");const o=t.querySelector(".kpevr");if(o)o.remove()}}catch(e){}return r}})();
(function(){const c0=closeModal;closeModal=function(){const m=Q[0];const r=c0.apply(this,arguments);try{if(!(m&&kitIsEventChoice(m)))window.__kitLastEvArt=null}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="k2b-evart";st.textContent=`
#rtoast.kevres{display:grid!important;grid-template-columns:84px minmax(0,1fr);column-gap:10px;align-items:start}
#rtoast.kevres>:not(.kpevr){grid-column:2}
#rtoast.kevres>.kpevr{grid-column:1;grid-row:1/span 9;width:84px;height:124px}
#rtoast.kevres>.kpevr .pcp.kit.kartf{width:100%!important;height:100%!important}
@media (max-width:599px){#rtoast.kevres{grid-template-columns:64px minmax(0,1fr)}#rtoast.kevres>.kpevr{width:64px;height:95px}}
`;document.head.appendChild(st)})();

/* ---------- 13. IDENTITY CARD (owner 11/14 item 6): the origin picture is no longer the backdrop; it sits in an art frame like the event art
   (landscape: frame left, facts right; portrait / Fold: frame on top, facts below). The whole screen wears ONE shared reincarnation
   background, img/bg-reborn-p.webp (portrait) / bg-reborn-l.webp (landscape), gpt-2-6, no people. Her full-body figure still stands on it. ---------- */
function kitRebornBg(){try{const M=$("modal");if(!M||!M.dataset.obg)return;const land=innerWidth>innerHeight;const grad="linear-gradient(rgba(40,20,12,.10),rgba(40,20,12,.04) 40%,rgba(40,20,12,.18))";
 M.style.setProperty("background",`${grad},url(img/bg-reborn-${land?"l":"p"}.webp) center/cover no-repeat,#e9dcc8`,"important");M.dataset.kreborn="1"}catch(e){}}
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kitRebornBg()}catch(e){}return r}})();
addEventListener("resize",()=>{clearTimeout(window.__krbT);window.__krbT=setTimeout(kitRebornBg,120)});
try{const M0=$("modal");if(M0)new MutationObserver(()=>{if(M0.dataset.obg&&!/bg-reborn/.test(M0.style.background||""))kitRebornBg()}).observe(M0,{attributes:true,attributeFilter:["style","data-obg"]})}catch(e){}
function kitOriginArt(k){return `img/bg-origin-${k}.webp`}
(function(){if(typeof kpIdentity!=="function")return;const k0=kpIdentity;kpIdentity=function(M,m){const r=k0.apply(this,arguments);try{const id=$("mb").querySelector(".kpid");const o=S&&S.origin;if(id&&o&&!id.querySelector(":scope > .kpidart")){
  const d=document.createElement("div");d.className="kpidart";d.innerHTML=kitArtFrame(kitOriginArt(o.k),o.n,"kidart");id.prepend(d)}}catch(e){console.error("kpidart",e)}return r}})();
(function(){const st=document.createElement("style");st.id="k2b-identity";st.textContent=`
.dlg.kpsc .kpb.kpid{display:grid!important;grid-template-columns:clamp(110px,30%,160px) minmax(0,1fr)!important;gap:12px!important;align-items:start}
.dlg.kpsc .kpb.kpid>.kpsubj{display:none!important}
.dlg.kpsc .kpid>.kpidart{width:100%;aspect-ratio:150/226;position:relative}
.dlg.kpsc .kpid>.kpidart .pcp.kit.kartf{width:100%!important;height:100%!important}
.dlg.kpsc .kpid>.kpidart img{object-fit:cover}
@media (orientation:portrait){
 .dlg.kpsc .kpb.kpid{grid-template-columns:1fr!important;gap:8px!important}
 .dlg.kpsc .kpid>.kpidart{width:auto;height:clamp(120px,17dvh,180px);aspect-ratio:150/226;justify-self:center}
}
`;document.head.appendChild(st)})();

/* ---------- 14. kitRoulette (owner 11/14 item 6b): the origin wheel, card-game style, at a new game AND at rebirth after death.
   The origin is already rolled (j52 seed + j69 weights); the wheel only shows it. On the shared reincarnation background: a grid of origin tiles
   (origin picture in the kit art frame, name, honest rarity chip); a light runs tile to tile "tạch tạch", fast then slower (ease-out), with a
   soft tick (sfx-tap) when sound is on, and stops on the rolled origin, which flashes with a gold ring; that tile grows and flies to the
   identity card's art frame while the card slides in (landscape: from the right; portrait: from below). ~4.5 s; tap anywhere skips;
   prefers-reduced-motion shows the card at once. API: kitRoulette({items:[{k,src,name,rare}], target:k, toEl:()=>element, done:fn}). ---------- */
const KIT_OW=(typeof OW69!=="undefined")?OW69:{nc:6,thd:9,cn:13,dtq:17,muoi:17,ch:13,td:9,tt:8,cnv:8};
function kitRare(k){try{if(typeof ow69Rare==="function")return ow69Rare(k)}catch(e){}const w=KIT_OW[k]||10;return w<=6?"Rất hiếm":w<=9?"Hiếm":"Thường gặp"}
function kitRoulette(o){const done=()=>{try{o.done&&o.done()}catch(e){}};if(!o||!o.items||!o.items.length||matchMedia("(prefers-reduced-motion: reduce)").matches){done();return}
 const old=$("kroul");if(old)old.remove();const ov=document.createElement("div");ov.id="kroul";ov.className="kroul";const land=innerWidth>innerHeight;
 ov.innerHTML=`<div class="krbox"><div class="krhead"><b>Luân hồi</b><small>Thân phận kiếp này</small></div><div class="krgrid">${o.items.map(it=>`<div class="krt" data-k="${it.k}"><div class="kra">${kitArtFrame(it.src,"")}</div><span class="krn">${it.name}</span><span class="krr">${typeof kitChip==="function"?kitChip(it.rare,"n"):it.rare}</span></div>`).join("")}</div><div class="krskip">Chạm để bỏ qua</div></div>`;
 ov.style.backgroundImage=`linear-gradient(rgba(40,20,12,.12),rgba(40,20,12,.22)),url(img/bg-reborn-${land?"l":"p"}.webp)`;document.body.appendChild(ov);
 const tiles=[...ov.querySelectorAll(".krt")];const ti=Math.max(0,tiles.findIndex(t=>t.dataset.k===o.target));let fin=false,timers=[];const T=(f,ms)=>timers.push(setTimeout(f,ms));
 const end=()=>{if(fin)return;fin=true;timers.forEach(clearTimeout);ov.classList.add("krout");setTimeout(()=>ov.remove(),360);done()};
 ov.addEventListener("click",end);
 const N=tiles.length*2+ti;let t=120;const sound=typeof sfx==="function";
 for(let i=0;i<=N;i++){const idx=i%tiles.length;const x=i/N;T(()=>{tiles.forEach(e=>e.classList.remove("on"));tiles[idx].classList.add("on");if(sound&&i%1===0)try{sfx("sfx-tap")}catch(e){}},t);t+=45+330*Math.pow(x,2.4)}
 T(()=>{tiles[ti].classList.add("win");ov.classList.add("krwin");try{sound&&sfx("sfx-promote")}catch(e){}},t+60);
 const fly=()=>{if(fin)return;try{const src=tiles[ti].querySelector(".pcp");const to=o.toEl&&o.toEl();const a=src.getBoundingClientRect();const b=to?to.getBoundingClientRect():null;
   const fl=src.cloneNode(true);fl.classList.add("krfly");fl.style.cssText=`position:fixed;left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px;z-index:2147483001;transition:transform .65s cubic-bezier(.2,.8,.2,1),opacity .2s .6s`;document.body.appendChild(fl);
   ov.classList.add("krfade");const dlg=document.querySelector("#modal .dlg");if(dlg){dlg.classList.remove("krin");void dlg.offsetWidth;dlg.classList.add("krin",land?"krinL":"krinP")}
   requestAnimationFrame(()=>{const s=b?Math.min(b.width/a.width,b.height/a.height):1.6;const dx=b?(b.left+b.width/2)-(a.left+a.width/2):0,dy=b?(b.top+b.height/2)-(a.top+a.height/2):0;fl.style.transform=`translate(${dx}px,${dy}px) scale(${s})`;fl.style.opacity="0"});
   setTimeout(()=>fl.remove(),900)}catch(e){}};
 /* test hook: window.__kroulHold freezes the wheel on the stopped tile until window.__kroulGo() */
 const rest=()=>{T(fly,0);T(end,740)};T(()=>{if(window.__kroulHold){window.__kroulGo=()=>{window.__kroulGo=null;rest()};return}rest()},t+760)}
(function(){if(typeof nlCard!=="function")return;const c0=nlCard;nlCard=function(){const r=c0.apply(this,arguments);try{const o=S&&S.origin;if(!o)return r;const key=(S.name||"")+"|"+o.k+"|"+(typeof NLP!=="undefined"&&NLP?NLP.seed:"");
  if(window.__kroulKey===key)return r;window.__kroulKey=key;
  const items=ORIGINS.filter(x=>KIT_OW[x.k]!=null||x.k===o.k).map(x=>({k:x.k,src:kitOriginArt(x.k),name:x.n,rare:kitRare(x.k)}));
  kitRoulette({items,target:o.k,toEl:()=>document.querySelector("#modal .kpidart .pcp")||document.querySelector("#modal .kpidart")})}catch(e){console.error("kitRoulette",e)}return r}})();
(function(){const st=document.createElement("style");st.id="k2b-roulette";st.textContent=`
.kroul{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:#e9dcc8 center/cover no-repeat;transition:opacity .35s;cursor:pointer}
.kroul.krfade .krt:not(.win),.kroul.krfade .krhead,.kroul.krfade .krskip{opacity:0;transition:opacity .4s}
.kroul.krout{opacity:0}
.kroul .krbox{display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px;max-width:min(96vw,760px)}
.kroul .krhead{display:flex;flex-direction:column;align-items:center;color:#5a2e12;text-shadow:0 1px 6px #fff8}
.kroul .krhead b{font-family:var(--display);font-size:1.5rem;color:var(--gold)}.kroul .krhead small{font-size:.9rem}
.kroul .krgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 14px}
@media (min-aspect-ratio:1/1){.kroul .krgrid{grid-template-columns:repeat(5,minmax(0,1fr))}}
.kroul .krt{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 6px 8px;border-radius:10px;background:rgba(255,250,240,.82);border:1px solid var(--k-hair,#e6d3ac);box-shadow:0 2px 8px #5a3a2022;transition:transform .12s,box-shadow .12s,background .12s;width:clamp(96px,min(26vw,17dvh),150px)}
.kroul .krt .kra{width:100%;aspect-ratio:150/226;position:relative}.kroul .krt .kra .pcp.kit.kartf{width:100%!important;height:100%!important}
.kroul .krt .krn{font-size:.78rem;font-weight:600;color:var(--ink);text-align:center;line-height:1.2}
.kroul .krt.on{transform:scale(1.06);background:#fff3c4;box-shadow:0 0 0 3px var(--k-sel-ring,#a8740c),0 0 18px 6px #f0d070aa}
.kroul .krt.win{transform:scale(1.1);background:#fff3c4;box-shadow:0 0 0 4px #c9a227,0 0 28px 12px #f0d070;animation:krflash .5s ease-out 2}
@keyframes krflash{50%{box-shadow:0 0 0 4px #fff,0 0 40px 18px #fff3c4}}
.kroul .krskip{font-size:.78rem;color:#5a2e12cc;background:rgba(255,250,240,.7);padding:2px 10px;border-radius:10px}
.krfly{pointer-events:none}
.dlg.krin.krinL{animation:krinL .55s cubic-bezier(.2,.8,.2,1)}.dlg.krin.krinP{animation:krinP .55s cubic-bezier(.2,.8,.2,1)}
@keyframes krinL{from{transform:translateX(40vw);opacity:0}}@keyframes krinP{from{transform:translateY(30vh);opacity:0}}
@media (prefers-reduced-motion:reduce){.kroul{display:none}.dlg.krin{animation:none!important}}
`;document.head.appendChild(st)})();

/* ---------- 15. kitItem — ONE item tile for every item anywhere (chest, Tư trang, wardrobe slots K1/K2, reward chests, peddler, works,
   reward panels). A simple frame (not the portrait frame): border + ground coloured by grade. Sizes sm (44 px) · md (64) · lg (96).
   kitItem({src, name, grade(0..4), qty, label:[text,"ok"|"no"|"n"], on, empty, size, data:"attrs", tip}) → HTML.
   Grades (KIT_GRADE): Thường grey-taupe · Tinh phẩm jade green · Trân phẩm sapphire blue · Tuyệt phẩm amethyst purple · Ngự tứ imperial gold-red.
   Picture: itemArt(k) (j98, review/item-art) when present, else wd-* icons, else the item's own icon; kitItemSrc(k, fallback). ---------- */
window.KIT_GRADE=[{n:"Thường",c:"#9a8a78",g:"#f3ede4"},{n:"Tinh phẩm",c:"#3f8f6a",g:"#e6f3ec"},{n:"Trân phẩm",c:"#3f62a8",g:"#e7edf8"},{n:"Tuyệt phẩm",c:"#7a4fa0",g:"#f1e9f7"},{n:"Ngự tứ",c:"#b8901c",g:"#fff1c8",r:"#a8261c"}];
function kitItemSrc(k,fb){try{if(typeof itemArt==="function"){const s=itemArt(k);if(s)return s}}catch(e){}try{if(window.WD_ITEMS&&WD_ITEMS[k]&&WD_ITEMS[k].icon)return WD_ITEMS[k].icon}catch(e){}return fb||""}
function kitItem(o){o=o||{};const g=KIT_GRADE[Math.max(0,Math.min(4,o.grade|0))]||KIT_GRADE[0];const sz=o.size||"md";
 const lab=o.label?`<span class="kitl kitl-${o.label[1]||"n"}">${o.label[0]}</span>`:"";
 return `<span class="kitem kitem-${sz}${o.empty?" kitem-empty":""}${o.on?" kitem-on":""}${(o.grade|0)===4?" kitem-nt":""}" style="--ig:${g.g};--ic:${g.c}${g.r?";--ir:"+g.r:""}" ${o.data||""} title="${(o.tip||o.name||"").replace(/"/g,"&quot;")}">`+
  `<span class="kitb">${o.src&&!o.empty?`<img src="${o.src}" alt="" onerror="this.remove()">`:""}${o.qty>1?`<b class="kitq">×${o.qty}</b>`:""}${(o.grade|0)===4?`<i class="kits" aria-hidden="true">御</i>`:""}${o.on?`<i class="kiton">Đang mặc</i>`:""}</span>`+
  `<span class="kitn">${o.name||""}</span>${o.empty?"":`<span class="kitg">${g.n}</span>`}${lab}</span>`}
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
/* K2: Rương đồ — the wardrobe block of Tư trang built from kit parts: sub-tabs Trâm cài · Y phục, item grid (kitItem lg) with Mặc / Tặng /
   Bán lén / Cầm cố act cards under the picked item, Tự chọn đồ + Chải chuốt act cards, pawned items with Chuộc lại. Data and acts: j92. */
if(typeof wdInvHTML==="function")wdInvHTML=function(){const w=wdOf(S);const lab=wdKnownStatus(S);const self=S.wdSelf&&S.wdSelf.it===wdCur(S)?S.wdSelf:null;const ag=wdAgent(S);
 const tab=window.__kwdTab==="y"?"y":"tram";const pick=window.__kwdPick;const ci=wdColInfo();
 const head=lab?[`Đã biết: ${WD_LABEL[lab]}`,lab==="ok"?"ok":"no"]:self?[`Lời ${self.by}: ${WD_LABEL[self.st]} (chưa chắc)`,"n"]:["Chưa ai nhận xét bộ đang mặc","n"];
 let h=`<div class="kwd"><div class="kpsec"><h4 class="kpst">Đang mặc</h4><div class="kwdnow">${kitWearSlots(S,{size:"md",cls:"kwbig"})}<div class="kwdnote">${kitChip(head[0],head[1])}<span class="past">Sưu tập kiếp này: ${ci.n} món${ci.title?` · «${ci.title}»`:""}${ci.next?` · mốc sau ${ci.next[0]} món (Phúc duyên +${ci.next[1]})`:""}</span></div></div>`;
 const B0=[];for(const sl of ["tram","y"]){const e=w[sl],it=wdItem(e);if(it&&!(sl==="y"&&e.from==="base"))B0.push(pbtn(`data-wd="off" data-sl="${sl}"`,`Tháo ${sl==="tram"?"trâm":"y phục"}`,`thành: ${sl==="y"?"thay về phẩm phục được cấp":"để tóc trơn"}`,""))}
 B0.push(pbtn(`data-wd="auto"`,"Tự chọn đồ",`${word(wdAutoOdds())} · tốn: 0 khắc · thành: thay ngay bộ ngươi cho là hợp phẩm · kèm: có thể trúng bộ sai phẩm (${wdUnknownN()} món chưa rõ phẩm)`,""));
 B0.push(pbtn(`data-wd="groom"`,"Chải chuốt",`tốn: 1 khắc · thành: trò chải chuốt ${WD.groomSec} giây, kim dừng giữa là đúng phẩm · kèm: cao quá thành vượt phẩm, thấp quá thành quá giản dị`,whyTime(1)));
 h+=`<div class="rbtn">${B0.join("")}</div></div>`;
 const L=wdChest(tab),nT=wdChest("tram").length,nY=wdChest("y").length;
 h+=`<div class="kpsec"><h4 class="kpst">Rương đồ</h4><div class="ksub kwdtabs"><button class="ksubb${tab==="tram"?" on":""}" data-kwdtab="tram">Trâm cài ${nT}</button><button class="ksubb${tab==="y"?" on":""}" data-kwdtab="y">Y phục ${nY}</button></div>`;
 if(!L.length)h+=`<p class="past">Chưa có ${tab==="tram"?"trâm cài":"y phục"} nào trong rương.</p>`;
 else{h+=`<div class="kwdgrid">`+L.map(x=>kitItem({src:kitItemSrc(x.k,x.icon),name:x.name,grade:x.grade,size:"lg",on:false,label:x.knownP?["đồ phẩm "+x.knownP,"n"]:null,data:`data-kwdpick="${x.ix}" role="button" tabindex="0"`,tip:`${x.name} · ${x.gradeName} · ${x.fx}`})).join("")+`</div>`;
  const x=L.find(y=>y.ix===pick)||null;if(x){const e=S.inv[x.ix];const B=[];const ntWhy=x.nt?"đồ ngự tứ: bán, cầm là bất kính":"";const agWhy=ag?"":"chưa có ma ma hay thái giám tin cẩn";
   const lo=Math.round(x.price*WD.sellLo/100),hi=Math.round(x.price*WD.sellHi/100),pct=ag?wdSellPct(S,ag):0;
   B.push(pbtn(`data-wd="wear" data-ix="${x.ix}"`,"Mặc",`tốn: 1 khắc · thành: thay vào ô ${x.slot==="tram"?"Trâm cài":"Y phục"}`,whyTime(1)));
   B.push(pbtn(`data-it="gift" data-ix="${x.ix}"`,"Tặng",`tốn: 2 khắc · thành: chọn người nhận`,x.nt?"đồ ngự tứ: không được đem tặng":whyTime(2)));
   B.push(pbtn(`data-wd="sell" data-ix="${x.ix}"`,"Bán lén",`${word(100-wdLeak(S,ag))} · tốn: 1 khắc · thành: Bạc +${ag?Math.round(x.price*pct/100):lo+"–"+hi} · kèm: lộ ra thì mang tiếng túng thiếu, Danh -${WD.sellDanh}`,ntWhy||agWhy||whyTime(1)));
   B.push(pbtn(`data-wd="pawn" data-ix="${x.ix}"`,"Cầm cố",`${word(100-wdLeak(S,ag,true))} · tốn: 1 khắc · thành: Bạc +${Math.round(x.price*WD.pawnPct/100)}, chuộc lại ${Math.round(x.price*WD.redeemPct/100)} bạc trong ${WD.pawnWeeks} tuần · kèm: lộ ra thì Danh -${WD.sellDanh}`,ntWhy||agWhy||whyTime(1)));
   h+=`<div class="kwdsel">${kitItem({src:kitItemSrc(x.k,x.icon),name:x.name,grade:x.grade,size:"md"})}<div>${kitFacts([`${x.slot==="tram"?"Trâm cài":"Y phục"} · ${x.gradeName} · ${x.fx}`,`${wdSrcTxt(e)}`,x.knownP?`Đồ phẩm ${x.knownP}`:"Chưa rõ phẩm"])}</div></div><div class="rbtn">${B.join("")}</div>`}
  else h+=`<p class="past">Chạm một món để mặc, tặng, bán lén hay cầm cố.</p>`}
 h+=`</div>`;const PW=S.wdPawn||[];if(PW.length){h+=`<div class="kpsec"><h4 class="kpst">Đang cầm cố (${PW.length})</h4><div class="kwdgrid">`+PW.map((P,i)=>{const it=wdItem(P.e);return `<div class="kwdpw">${kitItem({src:kitItemSrc(it.k,it.icon),name:it.n,grade:it.g,size:"md",label:[`còn ${Math.max(0,P.due-wk())} tuần`,"no"]})}${pbtn(`data-wd="redeem" data-i="${i}"`,"Chuộc lại",`tốn: 1 khắc, Bạc -${P.back} · thành: món đồ về lại rương`,S.bac<P.back?`thiếu bạc (cần ${P.back})`:whyTime(1))}</div>`}).join("")+`</div></div>`}
 return h+`</div>`};
document.addEventListener("click",ev=>{const a=ev.target.closest&&ev.target.closest("[data-kwdtab],[data-kwdpick]");if(!a)return;ev.stopPropagation();
 if(a.dataset.kwdtab){window.__kwdTab=a.dataset.kwdtab;window.__kwdPick=null}else window.__kwdPick=+a.dataset.kwdpick;try{render()}catch(e){}},true);
(function(){const st=document.createElement("style");st.id="k2b-item";st.textContent=`
.kitem{display:inline-flex;flex-direction:column;align-items:center;gap:2px;vertical-align:top;width:var(--isz);cursor:default;text-align:center}
.kitem[role=button]{cursor:pointer}
.kitem-sm{--isz:52px}.kitem-md{--isz:72px}.kitem-lg{--isz:104px}
.kitem>.kitb{position:relative;width:var(--isz);aspect-ratio:1;border-radius:8px;background:radial-gradient(circle at 50% 40%,#fff 0,var(--ig) 70%);border:2px solid var(--ic);box-shadow:inset 0 0 0 2px #fff8,0 1px 3px #5a3a2033;display:grid;place-items:center;overflow:hidden}
.kitem.kitem-nt>.kitb{border-color:var(--ic);box-shadow:inset 0 0 0 2px var(--ir),inset 0 0 0 4px #fff6,0 0 8px #f0d070aa}
.kitem>.kitb>img{width:86%;height:86%;object-fit:contain;filter:drop-shadow(0 1px 2px #0003)}
.kitem.kitem-empty>.kitb{background:repeating-linear-gradient(45deg,#f6efe4 0 6px,#efe6d7 6px 12px);border-style:dashed;border-color:#c8b89c}
.kitem .kitq{position:absolute;right:3px;bottom:2px;font-size:.66rem;background:#fffaf0e6;border-radius:6px;padding:0 4px;color:var(--ink)}
.kitem .kits{position:absolute;left:3px;top:2px;font-style:normal;font-size:.6rem;color:#fff;background:var(--ir);border-radius:3px;padding:0 3px;font-family:var(--display)}
.kitem .kiton{position:absolute;left:0;right:0;bottom:0;font-style:normal;font-size:.6rem;color:#fff;background:#2d7a52d9}
.kitem.kitem-on>.kitb{outline:2px solid #2d7a52;outline-offset:1px}
.kitem>.kitn{font-size:.7rem;line-height:1.15;color:var(--ink);font-weight:600;overflow-wrap:anywhere}
.kitem-lg>.kitn{font-size:.78rem}.kitem-sm>.kitn{font-size:.62rem}
.kitem>.kitg{font-size:.6rem;color:var(--ic);font-weight:700;text-transform:uppercase;letter-spacing:.02em}
.kitl{font-size:.62rem;border-radius:6px;padding:0 5px;border:1px solid}.kitl-ok{color:#2d7a52;border-color:#2d7a5266;background:#eaf5ee}.kitl-no{color:#c23b22;border-color:#c23b2266;background:#fbecea}.kitl-n{color:#8a7350;border-color:#d2b07188;background:#fbf4e6}
.kwear{display:flex;gap:6px;justify-content:center;align-items:flex-start;flex-wrap:wrap;margin:2px 0 4px}
.pc .pcl>.kwear{float:left;clear:left;width:var(--kpcw);margin:0 12px 6px 0}
@media (min-width:600px){.pc[data-k2] .pcl>.kwear{float:none;width:auto;margin:0 0 6px}}
.kwear .kwearl{flex-basis:100%;text-align:center}
.kwd .kwdnow{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.kwd .kwdnote{display:flex;flex-direction:column;gap:4px;min-width:0}
.kwd .kwdgrid{display:flex;flex-wrap:wrap;gap:10px;margin:8px 0}
.kwd .kwdsel{display:flex;gap:10px;align-items:flex-start;margin:6px 0;padding:8px;border:1px solid var(--k-hair);border-radius:8px;background:#fffdf8}
.kwd .kwdpw{display:flex;flex-direction:column;gap:4px;align-items:center;max-width:260px}
.kwd .kpsec{margin:0 0 10px}
`;document.head.appendChild(st)})();

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
