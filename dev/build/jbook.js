/* ================= jbook: BOOK UI KIT — kitPageCurl (curling page turn) + kitBookSpread (two-page book) =================
   Owner 11/14 (00:15Z, 00:45Z + approval): the UI reads like an open book. iPad landscape = a two-page spread (LEFT = picture
   page: the big full-body figure / scene that illustrates the right page; RIGHT = the text page the owner already approved),
   phone/portrait = ONE page: the RIGHT (text) page only — no illustration page on phones (owner 11/14, accepted loss). A tab switch
   is a page turn on both devices, and every page turn CURLS like real paper.
   KIT.md §32. Loaded before j87 (the week book uses kitCurl for its turn).

   kitCurl({host, front, back, w, h, x, y, dir, n, persp, po, shadeL, shadeR}) → {set(p,dir), destroy(), el}
     host  : positioned element; the turning sheet's SPINE is at (x,y) in host px, the sheet is w × h and lies to the right of it.
     front : Element (deep-cloned per strip) | HTML string | null (plain paper) — what is seen while the sheet lies on the right.
     back  : the same for the reverse side (seen once the sheet lies on the left of the spine).
     p     : 0 = flat on the right … 1 = flat on the left.  dir: 1 = turning forward (right → left), -1 = back.
     shadeL/shadeR: draw the moving cast shadow on the left / right ground (spread: both; single page: right only).
   kitCurlRun(c, from, to, dur, done, ease) → cancel()   (rAF tween of c.set)
   kitCurlOff() → true when "Cảnh động" is off or prefers-reduced-motion: callers cross-fade instead (kitCurlFade).
*/
function kitCurlOff(){try{return typeof reducedMotion==="function"?reducedMotion():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function kitCurlEase(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function kitCurlFade(el,mid,done,ms){ms=ms||170;if(!el){mid&&mid();done&&done();return}el.classList.add("kpc-fade");
 setTimeout(()=>{try{mid&&mid()}catch(e){console.error(e)}el.classList.remove("kpc-fade");setTimeout(()=>done&&done(),ms)},ms)}
function kitCurlSfx(){try{if(typeof kbkSfx==="function")kbkSfx()}catch(e){}}

function kitCurl(o){o=o||{};const host=o.host,w=Math.max(40,o.w|0),h=Math.max(40,o.h|0);
 const n=o.n||Math.max(10,Math.min(18,Math.round(w/34))),ws=w/n,fw=ws+1.5,P=o.persp||Math.round(Math.max(1600,w*6)),po=o.po!=null?o.po:0;
 const D=o.bend!=null?o.bend:92,G=1.4,M=1/(G+1);
 const root=document.createElement("div");root.className="kpc";
 root.style.cssText=`left:${o.x||0}px;top:${o.y||0}px;width:${w}px;height:${h}px;perspective:${P}px;perspective-origin:${po}px 50%`;
 const gR=document.createElement("i"),gL=document.createElement("i");gR.className="kpc-g kpc-gr";gL.className="kpc-g kpc-gl";root.append(gL,gR);
 /* one master copy per face: sticky → static (a strip is its own scroll box, sticky would shift per strip), ids dropped,
    scroll offsets remembered and re-applied in every strip copy */
 const prep=src=>{if(!(src&&src.nodeType===1))return{src};const m=src.cloneNode(true),A=[src,...src.querySelectorAll("*")],B=[m,...m.querySelectorAll("*")],sc=[];
  for(let i=0;i<A.length;i++){const a=A[i],b=B[i];if(!b)break;b.removeAttribute("id");
   if(a.scrollTop||a.scrollLeft)sc.push([i,a.scrollTop,a.scrollLeft]);
   if(getComputedStyle(a).position==="sticky")b.style.position="relative"}
  return{src:m,sc}};
 const PF=prep(o.front),PB=prep(o.back),SC=[];
 const strip=(pp,k,back)=>{const src=pp.src;const f=document.createElement("div");f.className="kpc-f"+(back?" kpc-b":"");f.style.width=fw+"px";
  const wr=document.createElement("div");wr.className="kpc-w";wr.style.width=w+"px";wr.style.height=h+"px";
  wr.style.left=(back?-(w-k*ws-fw):-k*ws)+"px";
  if(src&&src.nodeType===1){const c=src.cloneNode(true);wr.appendChild(c);if(pp.sc&&pp.sc.length)SC.push([c,pp.sc])}
  else if(typeof src==="string"&&src)wr.innerHTML=src;else wr.innerHTML=`<div class="kpaper kpc-blank"></div>`;
  const s=document.createElement("i");s.className="kpc-s";f.append(wr,s);return f};
 const S=[],F=[],B=[];let par=root;
 for(let k=0;k<n;k++){const s=document.createElement("div");s.className="kpc-k";s.style.width=ws+"px";s.style.left=(k?ws:0)+"px";
  const ff=strip(PF,k,false),bb=strip(PB,k,true);s.append(ff,bb);par.appendChild(s);par=s;S.push(s);F.push(ff.lastChild);B.push(bb.lastChild)}
 host.appendChild(root);
 for(const [c,L] of SC){const E=[c,...c.querySelectorAll("*")];for(const [i,t,l] of L){const e=E[i];if(e){e.style.scrollBehavior="auto";e.style.scrollSnapType="none";e.scrollTop=t;e.scrollLeft=l}}}
 let dir0=o.dir||1;
 const L=[-.35/1.087,-.25/1.087,1/1.087],Hh=[-.17,-.12,.978],base=Math.pow(.978,60);
 const lightF=a=>{const sn=Math.sin(a),cs=Math.cos(a);const dif=-sn*L[0]+cs*L[2],nh=-sn*Hh[0]+cs*Hh[2];
   return [Math.max(0,Math.min(.55,(.92-dif)*.55)),Math.max(0,(Math.pow(Math.max(0,nh),60)-base)*.5)]};
 const lightB=a=>{const sn=Math.sin(a),cs=Math.cos(a);const dif=sn*L[0]-cs*L[2],nh=sn*Hh[0]-cs*Hh[2];
   return [Math.max(0,Math.min(.6,(.92-dif)*.55)),Math.max(0,(Math.pow(Math.max(0,nh),60)-base)*.5)]};
 const gr=(l,r)=>`linear-gradient(90deg,rgba(255,247,226,${l[1].toFixed(3)}),rgba(255,247,226,${r[1].toFixed(3)})),linear-gradient(90deg,rgba(46,26,10,${l[0].toFixed(3)}),rgba(46,26,10,${r[0].toFixed(3)}))`;
 function set(p,dir){if(dir)dir0=dir;p=Math.max(0,Math.min(1,p));const ph=180*p,dl=dir0*D*Math.sin(Math.PI*p);
  const ang=u=>Math.max(0,Math.min(180,ph+dl*(Math.pow(u,G)-M)))*Math.PI/180;
  let prev=0,x=0,z=0,xmax=0,xmin=0,zmax=0;const sx=(X,Z)=>po+(X-po)*P/Math.max(P*.25,P-Z);
  for(let k=0;k<n;k++){const a=ang((k+.5)/n),a0=ang(k/n),a1=ang((k+1)/n);
   S[k].style.transform=`rotateY(${(-(a-prev)*180/Math.PI).toFixed(3)}deg)`;prev=a;
   F[k].style.background=gr(lightF(a0),lightF(a1));B[k].style.background=gr(lightB(a1),lightB(a0));
   x+=ws*Math.cos(a);z+=ws*Math.sin(a);const X=sx(x,z);if(X>xmax)xmax=X;if(X<xmin)xmin=X;if(z>zmax)zmax=z}
  /* cast shadows: on the ground the sheet is uncovering (right) and on the one it is landing on (left) */
  const el=Math.sin(Math.PI*p),lift=Math.min(1,zmax/(w*.55));
  if(o.shadeR!==false&&xmax<w-1&&p<.98){const sw=Math.max(10,Math.min(w*.32,24+zmax*.38));gR.style.left=xmax+"px";gR.style.width=sw+"px";gR.style.opacity=(Math.min(1,.25+lift)*(p<.5?1:Math.max(0,1-(p-.5)*2.2))).toFixed(3)}else gR.style.opacity="0";
  if(o.shadeL&&xmin<-1&&p>.02){const sw=Math.max(10,Math.min(w*.32,24+zmax*.38));gL.style.left=(xmin-sw)+"px";gL.style.width=sw+"px";gL.style.opacity=(Math.min(1,.25+lift)*(p>.5?1:Math.max(0,1-(.5-p)*2.2))).toFixed(3)}else gL.style.opacity="0";
  root.style.setProperty("--kpc-e",el.toFixed(3))}
 set(o.p||0);
 return {el:root,set,destroy(){root.remove()},get n(){return n}}}

function kitCurlRun(c,from,to,dur,done,ease){ease=ease||kitCurlEase;const t0=performance.now();let alive=true;const dir=to>=from?1:-1;
 const step=now=>{if(!alive)return;const t=Math.min(1,(now-t0)/Math.max(1,dur));c.set(from+(to-from)*ease(t),dir);if(t<1)requestAnimationFrame(step);else{alive=false;done&&done()}};
 c.set(from,dir);requestAnimationFrame(step);return()=>{alive=false}}

/* ---------- kitBookSpread: the two-page book container ----------
   kitBookSpread(host, {pic, text, double, mode:"auto"|"spread"|"single"})
     pic   : the LEFT page — illustration only (kitBookPic(...) HTML, an Element, or fn(el)).
     text  : the RIGHT page — the approved panel content (Element is MOVED in, so it stays live; HTML; or fn(el)).
     double: optional Element/HTML spanning BOTH pages on a spread (Dư đồ map); on one page it goes on the text page.
   → {el, mode, picEl, textEl, swap({pic,text,double} | fn,{dir}), set({pic,text,double}), relayout(), destroy()}
   Spread when the host is ≥ 900 px wide and landscape (same rule as kitBook); else one page = the text page (the picture page is
   not shown; callers may skip building it: kitBookSpread.wantsPic(host)). swap() = tab switch with a curl (dir 1 forward, -1 back);
   swap(fn): fn() updates the live content in place (e.g. the game re-renders #panel) after the old pages were copied. */
function kbsFill(el,c){if(c==null)return;el.innerHTML="";if(typeof c==="function")c(el);else if(c.nodeType===1)el.appendChild(c);else el.innerHTML=String(c)}
function kitBookSpread(host,spec){spec=spec||{};const root=document.createElement("div");root.className="kbs";
 root.innerHTML=`<div class="kbs-book"><div class="kbs-pg kbs-l kpaper"><div class="kbs-in kbs-pic"></div></div><div class="kbs-pg kbs-r kpaper"><div class="kbs-in kbs-txt"></div></div><div class="kbs-dbl"></div><i class="kbs-gut"></i></div>`;
 host.appendChild(root);
 const book=root.firstChild,L=book.children[0],R=book.children[1],picEl=L.firstChild,textEl=R.firstChild,dbl=book.querySelector(".kbs-dbl");
 let mode="spread",side="text",busy=false,dblC=null;
 function place(){const sp=mode==="spread";root.classList.toggle("has-dbl",!!dblC);
  if(dblC){if(sp){if(dbl.firstChild!==dblC.el)kbsFill(dbl,dblC.el)}else if(textEl.firstChild!==dblC.el)kbsFill(textEl,dblC.el)}}
 function layout(){const W=host.clientWidth||innerWidth,H=host.clientHeight||innerHeight;const sp=spec.mode==="spread"||spec.mode!=="single"&&W>=900&&W/H>=1.15;
  mode=sp?"spread":"single";root.classList.toggle("spread",sp);root.classList.toggle("single",!sp);paint();place()}
 function paint(){root.classList.toggle("on-text",true)}
 function set(c){if(typeof c==="function"){c();return}c=c||{};if("double" in c)dblC=c.double?{el:typeof c.double==="string"?(()=>{const d=document.createElement("div");d.className="kbs-dblin";d.innerHTML=c.double;return d})():c.double}:null;
  if(!dblC)dbl.innerHTML="";if(c.pic!==undefined)kbsFill(picEl,c.pic);if(c.text!==undefined)kbsFill(textEl,c.text);place()}
 /* tab switch = page turn: the old pages curl away, the new ones are underneath */
 function swap(c,opt){opt=opt||{};if(busy){set(c);return}const dir=opt.dir||1;kitCurlSfx();
  if(kitCurlOff()){busy=true;kitCurlFade(book,()=>set(c),()=>{busy=false});return}
  const r=book.getBoundingClientRect();busy=true;
  if(mode==="spread"){const pw=r.width/2,h=r.height;
   /* a page-sized picture of what each half shows now (a page, or one half of the double-page layer) */
   const half=(right)=>{if(!root.classList.contains("has-dbl"))return (right?R:L).cloneNode(true);
     const d=document.createElement("div");d.className="kbs-pg kpaper";const m=dbl.cloneNode(true);m.style.cssText=`display:block;position:absolute;top:0;left:${right?-pw:0}px;width:${pw*2}px;height:${h}px`;d.appendChild(m);return d};
   const oL=half(false),oR=half(true);set(c);const nL=half(false),nR=half(true);
   const under=document.createElement("div");under.className="kbs-under";const u=dir>0?oL:oR;
   u.style.cssText+=`;position:absolute;top:0;left:${dir>0?0:pw}px;width:${pw}px;height:${h}px`;under.appendChild(u);book.appendChild(under);
   const cu=dir>0?kitCurl({host:book,front:oR,back:nL,w:pw,h,x:pw,y:0,po:0,shadeL:true})
                 :kitCurl({host:book,front:nR,back:oL,w:pw,h,x:pw,y:0,po:0,shadeL:true,p:1,dir:-1});
   kitCurlRun(cu,dir>0?0:1,dir>0?1:0,600,()=>{cu.destroy();under.remove();busy=false});
   return}
  /* one page (text only): forward = the old page curls away over the new one; back = the new page curls back in over the old */
  if(dir>0){const old=R.cloneNode(true);set(c);const cu=kitCurl({host:book,front:old,back:null,w:r.width,h:r.height,x:0,y:0,po:r.width*.5,shadeL:false});
   kitCurlRun(cu,0,1,560,()=>{cu.destroy();busy=false})}
  else{const old=R.cloneNode(true);old.style.cssText+=";position:absolute;inset:0";const under=document.createElement("div");under.className="kbs-under kbs-under1";under.appendChild(old);
   set(c);book.appendChild(under);const cu=kitCurl({host:book,front:R,back:null,w:r.width,h:r.height,x:0,y:0,po:r.width*.5,shadeL:false,p:1,dir:-1});
   kitCurlRun(cu,1,0,560,()=>{cu.destroy();under.remove();busy=false})}}
 const ro=typeof ResizeObserver==="function"?new ResizeObserver(()=>{if(!busy)layout()}):null;ro&&ro.observe(host);
 set(spec);layout();
 return {el:root,picEl,textEl,get mode(){return mode},swap,set,relayout:layout,destroy(){ro&&ro.disconnect();root.remove()}}}

/* ---------- kitBookPic: the picture page (illustration only; never carries the right page's info) ----------
   kitBookPic({scene, ax, feet, figs:[{src, h, x, cap}], sil:n, plate, cap, slots:[{label, img}]}) → HTML
     scene: room picture (cover-cropped, kept on the floor anchor ax = KIT_FANCHOR x); figs stand on the feet line (feet = 0..1 of the page).
     sil  : number of anonymous silhouettes (Dư đồ place scene: "người đang có mặt"), drawn as kit unknown figures, dimmed.
     cap  : small caption plaque under the plate (place / name, illustration caption only). slots: try-on slots beside the figure. */
kitBookSpread.wantsPic=host=>{const W=(host&&host.clientWidth)||innerWidth,H=(host&&host.clientHeight)||innerHeight;return W>=900&&W/H>=1.15};
function kitBookPic(o){o=o||{};const ax=o.ax!=null?o.ax:.5,feet=o.feet!=null?o.feet:.94;
 const figs=(o.figs||[]).map((f,i)=>`<img class="kbp-fig${f.dim?" dim":""}" src="${f.src}" alt="" decoding="async" style="--fx:${f.x!=null?f.x:.5};--fh:${f.h||.82};--fz:${f.z||i+2}">`).join("");
 const slots=o.slots&&o.slots.length?`<div class="kbp-slots">${o.slots.map(s=>`<div class="kbp-slot${s.img?"":" empty"}"><span class="kbp-sim">${s.img?`<img src="${s.img}" alt="">`:""}</span><b>${s.label}</b>${s.n?`<small>${s.n}</small>`:""}</div>`).join("")}</div>`:"";
 return `<div class="kbp${o.plate===false?" bleed":""}" style="--ax:${ax};--feet:${feet}"><div class="kbp-plate"><div class="kbp-scene" style="background-image:url('${o.scene||""}')"></div><div class="kbp-figs">${figs}</div>${slots}</div>${o.cap?`<div class="kbp-cap">${o.cap}</div>`:""}</div>`}

(function(){const st=document.createElement("style");st.id="jbook-css";st.textContent=`
/* paper skin (KIT §32.1): warm paper, faint fibres, edge tint */
.kpaper{position:absolute;inset:0;box-sizing:border-box;color:var(--ink,#2a1a12);background:
 radial-gradient(ellipse 70% 50% at 25% 18%,#fbf3dd 0,transparent 70%),radial-gradient(ellipse 60% 45% at 85% 92%,#e8d3a6 0,transparent 70%),
 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .3 0 0 0 0 .12 0 0 0 .08 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"),
 linear-gradient(#f6ecd6,#efe0bf);box-shadow:inset 0 0 34px #8a5a2433}
.kpc-blank{background:linear-gradient(#f3e7cc,#ead9b4)}
/* curl */
.kpc{position:absolute;z-index:9999;pointer-events:none;transform-style:flat}
.kpc-k{position:absolute;top:0;height:100%;transform-origin:0 50%;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;will-change:transform}
.kpc>.kpc-k{left:0}
.kpc-f{position:absolute;left:0;top:0;height:100%;overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.kpc-f.kpc-b{transform:rotateY(180deg)}
.kpc-w{position:absolute;top:0}
.kpc .kpc-w>*{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;margin:0!important;visibility:visible!important;transform:none!important}
.kpc-s{position:absolute;inset:0;pointer-events:none;z-index:50}
.kpc-g{position:absolute;top:0;bottom:0;opacity:0;pointer-events:none}
.kpc-gr{background:linear-gradient(90deg,#1e0f0566,#1e0f0522 40%,transparent)}
.kpc-gl{background:linear-gradient(270deg,#1e0f0566,#1e0f0522 40%,transparent)}
.kpc-fade{transition:opacity .17s!important;opacity:0!important}
/* two-page book */
.kbs{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:var(--kbs-pad,10px 14px 12px)}
.kbs-book{position:relative;width:100%;height:100%;display:grid;grid-template-columns:1fr 1fr;transition:opacity .17s}
.kbs-book::before{content:"";position:absolute;inset:-6px -7px;border-radius:6px;background:repeating-linear-gradient(45deg,#ffffff08 0 2px,transparent 2px 5px),linear-gradient(#3a2a52,#241a36);box-shadow:0 14px 34px #0008,inset 0 0 0 1px #ffffff14}
.kbs-pg{position:relative!important;inset:auto;overflow:hidden;min-width:0;min-height:0}
.kbs-l{border-radius:4px 0 0 4px}.kbs-r{border-radius:0 4px 4px 0}
/* page edges: thin stacked leaves on the outer edges */
.kbs-l::before,.kbs-r::before{content:"";position:absolute;top:3px;bottom:3px;width:5px;z-index:6;pointer-events:none;background:repeating-linear-gradient(90deg,#efe0bf 0 1px,#c4aa7c 1px 2px)}
.kbs-l::before{left:0;border-radius:3px 0 0 3px}.kbs-r::before{right:0;border-radius:0 3px 3px 0}
/* gutter: soft fold shadow on both inner edges + a dark crease */
.kbs-l::after,.kbs-r::after{content:"";position:absolute;top:0;bottom:0;width:11%;z-index:6;pointer-events:none}
.kbs-l::after{right:0;background:linear-gradient(270deg,#4a2c1250,#4a2c1218 40%,transparent)}
.kbs-r::after{left:0;background:linear-gradient(90deg,#4a2c1250,#4a2c1218 40%,transparent)}
.kbs-gut{position:absolute;top:0;bottom:0;left:calc(50% - 1.5px);width:3px;z-index:7;pointer-events:none;background:linear-gradient(90deg,#00000022,#00000055,#00000022)}
.kbs-in{position:absolute;inset:14px 14px 14px 12px;overflow:auto;overscroll-behavior:contain;border-radius:2px}
.kbs-r .kbs-in{inset:12px 12px 12px 18px}.kbs-l .kbs-in{inset:12px 18px 12px 12px;overflow:hidden}
.kbs-dbl{display:none}
.kbs.spread.has-dbl .kbs-dbl{display:block;position:absolute;inset:10px 12px;z-index:5;overflow:hidden;border-radius:2px}
.kbs.spread.has-dbl .kbs-gut{z-index:8;width:30px;left:calc(50% - 15px);background:linear-gradient(90deg,transparent,#2a160830 35%,#1a0d0570 50%,#2a160830 65%,transparent)}
.kbs-under{position:absolute;inset:0;z-index:9990;pointer-events:none}
.kbs-under>.kbs-pg{position:absolute!important;left:0;top:0;width:50%;height:100%}
/* one page = the text page only */
.kbs.single .kbs-book{grid-template-columns:1fr}
.kbs.single .kbs-l,.kbs.single .kbs-gut{display:none}
.kbs.single .kbs-r{border-radius:3px 4px 4px 3px}
.kbs.single .kbs-r::after{width:5%;background:linear-gradient(90deg,#4a2c1240,transparent)}
.kbs.single .kbs-r .kbs-in{inset:10px 12px 10px 14px}
.kbs-under1>.kbs-pg{width:100%}
/* picture page: an illustrated plate (cover-cropped room kept on its floor anchor, full-body figures on the feet line) */
.kbp{position:absolute;inset:0;display:flex;flex-direction:column;gap:6px}
.kbp-plate{position:relative;flex:1 1 auto;min-height:0;overflow:hidden;border:1px solid #9a2c1c99;outline:1px solid #9a2c1c55;outline-offset:3px;margin:4px;background:#2a1a12;box-shadow:inset 0 0 30px #00000055}
.kbp.bleed .kbp-plate{margin:0;outline:0;border:0}
.kbp-scene{position:absolute;inset:0;background-size:cover;background-position:calc(var(--ax) * 100%) 100%;filter:saturate(.92)}
.kbp-plate::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 85% 70% at 50% 45%,transparent 55%,#2a160840);mix-blend-mode:multiply}
.kbp-figs{position:absolute;inset:0;z-index:2}
.kbp-fig{position:absolute;bottom:calc((1 - var(--feet)) * 100%);left:calc(var(--fx) * 100%);height:calc(var(--fh) * 100%);width:auto;max-width:none;transform:translateX(-50%);z-index:var(--fz);filter:drop-shadow(0 6px 6px #0005)}
.kbp-fig.dim{filter:brightness(.92) drop-shadow(0 4px 4px #0004);opacity:.92}
.kbp-cap{flex:0 0 auto;align-self:center;font-family:var(--display);font-size:clamp(.82rem,1.6vw,1rem);color:var(--rule,#9a2c1c);background:#fffaf0d9;border:1px solid #9a2c1c66;border-radius:4px;padding:.2em .9em;margin-bottom:2px;letter-spacing:.03em;max-width:92%;text-align:center}
.kbp-slots{position:absolute;z-index:4;right:3%;top:4%;display:flex;flex-direction:column;gap:8px}
.kbp-slot{display:flex;flex-direction:column;align-items:center;gap:2px;width:clamp(64px,13vw,92px);background:#fffaf0e6;border:1px solid #9a2c1c88;border-radius:6px;padding:6px 4px 5px;box-shadow:0 3px 8px #0005;text-align:center}
.kbp-sim{display:block;width:100%;aspect-ratio:1;border-radius:4px;background:radial-gradient(#fff6e2,#ead6ad);border:1px dashed #9a2c1c55;overflow:hidden}
.kbp-sim img{width:100%;height:100%;object-fit:contain}
.kbp-slot b{font-family:var(--display);font-size:.8rem;color:var(--rule,#9a2c1c);font-weight:600}
.kbp-slot small{font-size:.7rem;color:var(--dim,#7a6a5a);line-height:1.15}
.kbp-slot.empty .kbp-sim{opacity:.7}
@media (prefers-reduced-motion:reduce){.kbs-book{transition:opacity .17s}}
`;document.head.appendChild(st)})();
