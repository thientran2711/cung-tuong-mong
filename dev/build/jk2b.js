
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
@media (min-width:1000px){:root{--kpcw:clamp(170px,17vw,230px)}}
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
 const fs=ft+.75*(1-ft);let feet=Math.min(H*.97,y0+fs*dh);const kfb=Math.max(H*.03,24,H-feet);st.style.setProperty("--kfb",kfb.toFixed(0)+"px");st.style.setProperty("--kfh",Math.max(H*.45,H-kfb-H*.03).toFixed(0)+"px");st.dataset.kfloor=name}catch(e){}}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);kitFloorFit();return r};
 try{let ro=null;const hook=()=>{const st=$("stage");if(!st||ro)return;ro=new ResizeObserver(()=>kitFloorFit());ro.observe(st)};if(document.readyState!=="loading")hook();else addEventListener("DOMContentLoaded",hook)}catch(e){}
 const st=document.createElement("style");st.id="k2b-floor";st.textContent=`
.stage[data-kfloor] #mefig{bottom:var(--kfb)!important;height:min(80cqh,var(--kfh))!important}
.stage[data-kfloor] .tokens{bottom:calc(var(--kfb) - 4px)!important}
.stage[data-kfloor] .tok.fig .figimg{height:min(58cqh,calc(var(--kfh) * .8))!important}
.stage[data-kfloor] .scimg{transition:background-position .2s}
`;document.head.appendChild(st)})();

/* ---------- 2b. ONE SCALE ON THE STAGE (owner 11/14): every adult figure on one stage has the same height and stands on the same
   floor line. All fig-*.webp are cut head-to-hem on a 900 px canvas, so equal element height = equal body height. Children keep their
   age ratio (j73 KIDH) of the same adult height. When the row is too wide, EVERY figure (her included) shrinks by one common factor.
   Name tags hang under the feet (absolute), so a token's feet sit on the floor line like hers. ---------- */
function kitStageScale(){try{const st=$("stage");if(!st)return;const H=st.clientHeight,W=st.clientWidth;if(!H||!W)return;
 const kfb=parseFloat(st.style.getPropertyValue("--kfb"))||Math.max(H*.04,26);const kfh=parseFloat(st.style.getPropertyValue("--kfh"))||H*.8;
 let base=Math.min(H*.80,kfh,H-kfb-H*.03);const me=$("mefig");const toks=[...st.querySelectorAll("#tokens .tok.fig img.figimg")].filter(e=>e.offsetParent);
 const ar=e=>{if(e.naturalWidth&&e.naturalHeight)return e.naturalWidth/e.naturalHeight;if(!e.dataset.kwait){e.dataset.kwait=1;e.addEventListener("load",()=>kitStageScale(),{once:true})}return .36};
 const ks=e=>{if(e.dataset.ks)return+e.dataset.ks;let k=1;if(e.classList.contains("kidfig")){const m=/\*\s*([\d.]+)/.exec(e.style.height||"");if(m)k=+m[1]}e.dataset.ks=k;return k};
 const tokRow=$("tokens");let avail=W-16;if(me&&tokRow){const r=tokRow.getBoundingClientRect(),sr=st.getBoundingClientRect();avail=Math.max(60,sr.right-Math.max(r.left,sr.left)-12)}
 const gap=8;let need=toks.reduce((a,e)=>a+base*ks(e)*ar(e)+gap+6,0);let f=need>avail?avail/need:1;
 let wide=false;if(me&&f<1&&tokRow){/* crowded: she steps to the left edge and the row takes the rest of the stage, one scale for all */
  const meW=base*ar(me);const f2=Math.min(1,(W-24)/(meW+gap+need));if(f2>f){f=f2;wide=true}}
 if(tokRow){if(wide){const mw=base*f*ar(me);me.style.setProperty("left",(8+mw/2).toFixed(0)+"px","important");tokRow.style.setProperty("left",(16+mw).toFixed(0)+"px","important");tokRow.style.setProperty("right","8px","important");tokRow.style.setProperty("justify-content","space-evenly","important");tokRow.style.setProperty("padding","0","important")}
  else{if(me)me.style.removeProperty("left");["left","right","justify-content","padding"].forEach(k=>tokRow.style.removeProperty(k))}}
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
  if(lv>1){const need2=tags[0].offsetHeight*lv+6+3*lv;const kfb=parseFloat(st.style.getPropertyValue("--kfb"))||0;if(kfb<need2&&!st.dataset.kfb2){st.dataset.kfb2=1;st.style.setProperty("--kfb",need2+"px");kitStageScale();delete st.dataset.kfb2;return}}
  const sr2=st.getBoundingClientRect();tags.forEach(t=>{t.style.removeProperty("margin-left");const r=t.getBoundingClientRect();if(r.right>sr2.right-4)t.style.setProperty("margin-left",(sr2.right-4-r.right)+"px");else if(r.left<sr2.left+4)t.style.setProperty("margin-left",(sr2.left+4-r.left)+"px")});
 }catch(e){}}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);kitStageScale();clearTimeout(window.__kssT);window.__kssT=setTimeout(kitStageScale,520);return r};
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
(function(){const s0=showModal;showModal=function(){const m=Q[0];const r=s0.apply(this,arguments);try{if(m&&m.opts&&(m.hideOut||m.opts.some(o=>o&&o.hideOut))){
  document.querySelectorAll("#modal .opts > button[data-m], #modal .opts button.opt").forEach(b=>{const o=m.opts[+b.dataset.m];if(m.hideOut||(o&&o.hideOut)){b.dataset.khide="1";if(b.classList.contains("ka"))kitHideOut(b)}})}}catch(e){console.error("hideOut",e)}return r}})();
