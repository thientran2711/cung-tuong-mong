/* ===== KIT §102 kitStage «SÂN KHẤU KHÔNG KHUNG» — the ONE layout of every event-choice screen that holds a hand of cards (KIT §101 kitHand)
   Owner 24/11 ~15:15Z mẫu 1 «Bàn bài» (a) «no event frame first — the event opens straight into the animation» (c) «speaker left / her right»
   + 25/11 ~21:50Z (verbatim, via MAIN 146): «… không có còn cái kiểu là khung giao diện như thế này, mà là chỉ là hình nhân vật xuất hiện cùng với
   những cái thông tin … làm lại cái khung giao diện chung, như là một cái kit chuẩn chung … để bất kỳ một cái khung nào xuất hiện thì mình cũng đều
   lấy từ cái kit đó ra để làm như nhau» (KK32, review/kit-stage).
   ONE rule, whole family (laws 9/11): a #modal dialog whose option list became a hand (`.dlg.khdlg` > `.opts.khand`, jkhand) turns into a STAGE:
   - no panel box: the dialog takes the scene layer between the top bar and the tab bar (kscnGeo, §93.1), transparent, no frame / border / shadow;
   - the event's own picture (the band of the frame, `.k3ev` / `.kdlgart`) is the BACKGROUND of the whole layer (clear, bright; a soft shade only
     under the hand); no picture → the warm kit stage colour;
   - the SPEAKER (the frame's figure `.kszfig`) stands full body on the LEFT, HER figure (kitFigOf(S)) full body on the RIGHT (layout A, §93.4);
   - the title = a small plaque on top; the story (faces row + lines, `.kpmain`) = the kit speech box between the two figures (iPad) or under
     their faces (Fold); it scrolls inside itself when long; it never covers a face (owner OD 24/11 ~15:15Z (d));
   - the hand lies at the foot of the layer across the whole width (kitHand lays the cards for that width); the details plate sits above the
     lifted card, under the faces.
   - Motion (transform / opacity only, kitHandStill = none): the picture settles, the speaker walks in from the left, she from the right, the
     speech box drops in, then kitHand deals.
   Data / taps are unchanged: the same #modal, the same buttons, the same choose path (chooseM). Numbers: geometry knobs only (KIT_STAGE). */
const KIT_STAGE={pad:8,fig:[.98,.98]/* figure height share of the room [fold,ipad] */,feetIn:.30/* share of the hand height the feet may stand behind the cards */,
 faceK:.19/* the face band = top share of the painted figure */,midMin:420/* px between the figures for the speech box beside them (else it goes under the faces) */,
 boxMaxW:[720,760],plateW:560,inMs:[620,520,300],veil:"linear-gradient(to bottom,rgba(20,12,8,0) 55%,rgba(20,12,8,.34) 100%)"};
(function(){try{const st=document.createElement("style");st.id="kit-stage";st.textContent=`
html body #modal.kstg{background:transparent!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage{position:fixed!important;left:var(--kstL)!important;top:var(--kstT)!important;width:var(--kstW)!important;height:var(--kstH)!important;max-width:none!important;max-height:none!important;min-height:0!important;
 margin:0!important;padding:0!important;border:0!important;border-radius:var(--k-rad,12px)!important;box-shadow:none!important;background:#5a3c28!important;overflow:hidden!important;transform:none!important;display:block!important;outline:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage::before,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage::after{display:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kstg-bg{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center;pointer-events:none}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kstg-veil{position:absolute;inset:0;z-index:0;background:${KIT_STAGE.veil};pointer-events:none}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kph{position:absolute!important;z-index:6;top:${KIT_STAGE.pad}px!important;left:50%!important;transform:translateX(-50%)!important;width:max-content!important;max-width:calc(100% - 96px)!important;
 margin:0!important;padding:5px 16px!important;min-height:0!important;border:1px solid var(--gold,#b8901f)!important;border-radius:999px!important;background:#fbf1e6eb!important;box-shadow:0 3px 12px #0004!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kph .kptitle{white-space:normal!important;font-size:1.02rem!important;line-height:1.25!important;text-align:center}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kseal{position:absolute!important;z-index:6}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>#mb{position:absolute!important;inset:0!important;z-index:1;margin:0!important;padding:0!important;max-height:none!important;height:auto!important;overflow:visible!important;background:none!important;border:0!important;display:block!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>#mr,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>h2{display:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .k3body{position:static!important;display:block!important;height:auto!important;padding:0!important;margin:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .k3right{position:static!important;display:block!important;width:auto!important;height:auto!important;overflow:visible!important;padding:0!important;margin:0!important;max-height:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .k3ev,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kdlgart,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kevav,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kscue{display:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kstg-fig{position:absolute!important;z-index:2;left:var(--fx)!important;top:var(--fy)!important;width:var(--fw)!important;height:var(--fh)!important;margin:0!important;padding:0!important;
 display:block!important;overflow:visible!important;pointer-events:none;background:none!important;border:0!important;max-width:none!important;max-height:none!important;flex:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kszfig{display:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kstg-fig>img{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;min-height:0!important;object-fit:contain!important;object-position:50% 100%!important;filter:drop-shadow(0 4px 10px #0005)}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kstg-fig>.kt3{position:absolute!important;left:50%!important;top:var(--tagy,0px)!important;transform:translate(-50%,-100%)!important;width:max-content!important;max-width:14em!important;z-index:3;margin:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kt3 .knr{background:#fffaf0e8;border:1px solid var(--gold,#b8901f);border-radius:8px;padding:1px 8px;box-shadow:0 2px 6px #0003}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain{position:absolute!important;z-index:4;left:var(--bx)!important;top:var(--by)!important;width:var(--bw)!important;max-height:var(--bh)!important;height:auto!important;min-height:0!important;margin:0!important;
 overflow-y:auto!important;overscroll-behavior:contain;padding:10px 14px!important;background:#fbf1e6f2!important;border:1px solid var(--gold,#b8901f)!important;border-radius:12px!important;box-shadow:0 6px 22px rgba(0,0,0,.38)!important;display:block!important;flex:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces{display:flex!important;flex-wrap:wrap!important;gap:6px 14px!important;justify-content:flex-start!important;align-items:center!important;margin:0 0 6px!important;height:auto!important;min-height:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces>figure{display:flex!important;max-width:none!important;flex:0 0 auto!important;height:auto!important;flex-direction:row!important;align-items:center!important;gap:6px!important;width:auto!important;min-width:0!important;margin:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .pframe,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .pfwrap{--kffw:34px;width:34px!important;height:auto!important;flex:0 0 34px!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces figcaption,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces figcaption>*{width:auto!important;max-width:16em!important;flex:0 1 auto!important;height:auto!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces img{max-width:34px!important;max-height:46px!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .pfnm,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .pcname,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .kfnm{font-size:.82rem!important;text-align:left!important;margin:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .opts.khand{position:absolute!important;z-index:5;left:0!important;right:0!important;bottom:4px!important;top:auto!important;width:auto!important;margin:0!important;max-height:none!important;overflow:visible!important;background:none!important;border:0!important;box-shadow:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.khplate{z-index:7}`;document.head.appendChild(st)}catch(e){}})();
function kstgWants(dl,g){try{if(!(dl&&dl.matches&&dl.matches("#modal .dlg")&&!dl.closest(".pc,.kpdlg")))return false;if(g)return g.closest(".dlg")===dl&&kitHandWants(g);return !!dl.querySelector(":scope>#mb .opts.khand")}catch(e){return false}}
function kstgGeo(){try{if(typeof kscnGeo==="function")return kscnGeo()}catch(e){}return{t:0,H:innerHeight,L:0,R:0,w:innerWidth}}
function kstgPic(dl){try{const im=dl.querySelector(".k3ev img,.kdlgart img,.kpiart img");return im&&(im.currentSrc||im.src)||""}catch(e){return""}}
/* the two full figures of the stage (made once per dialog): the SPEAKER = the frame's speaker (Q item .who; else the frame's figure picture), with
   the frame's own name tag; HER = kitFigOf(S) (right tier / age band / dress), unless she is the speaker */
function kstgFig(mb,cls,src,tagHTML){let f=mb.querySelector(":scope>."+cls);if(f){const im=f.querySelector("img");if(im&&src&&im.getAttribute("src")!==src)im.src=src;return f}if(!src)return null;
 f=document.createElement("div");f.className="kstg-fig "+cls;f.setAttribute("aria-hidden","true");const im=document.createElement("img");im.alt="";im.decoding="async";im.crossOrigin="anonymous";im.src=src;f.appendChild(im);
 if(tagHTML){const tg=document.createElement("div");tg.className="kt3";tg.innerHTML=tagHTML;f.appendChild(tg)}if(mb.closest(".dlg")&&mb.closest(".dlg").__kstHold)f.style.visibility="hidden";mb.appendChild(f);return f}
function kstgFigs(dl,mb){try{const m=typeof Q!=="undefined"&&Q&&Q[0]||null,who=m&&m.who&&typeof m.who==="object"&&!m.who.src?m.who:null;const old=mb.querySelector(".kszfig");
 let src="";try{if(who&&who!==S&&typeof kitFigOf==="function")src=kitFigOf(who)}catch(e){}if(!src){const im=old&&old.querySelector("img");src=im&&(im.getAttribute("src")||"")||""}
 const tg=old&&old.querySelector(".kt3");kstgFig(mb,"kstg-sp",who===S?"":src,tg?tg.innerHTML:"");
 let me="";try{me=typeof kitFigOf==="function"?kitFigOf(S):(typeof figFor==="function"?figFor(S):"")}catch(e){}kstgFig(mb,"kstg-me",me,"")}catch(e){console.error("kstgFigs",e)}}
/* the painted part of a figure picture (opaque box, §93.2 kscnOpaque) — cached per picture */
const KST_OB=new Map();function kstgOb(im){try{const k=im&&(im.currentSrc||im.src);if(!k)return null;if(KST_OB.has(k))return KST_OB.get(k);if(!im.complete||!im.naturalWidth)return null;const o=typeof kscnOpaque==="function"?kscnOpaque(im):{l:0,r:1,t:0,b:1};KST_OB.set(k,o);return o}catch(e){return null}}
/* turn the dialog into the stage (classes + background + her figure); idempotent */
function kstgOn(dl,g){try{if(!kstgWants(dl,g))return false;const M=document.getElementById("modal"),mb=dl.querySelector(":scope>#mb");if(!mb)return false;
 const G=kstgGeo();dl.style.setProperty("--kstL",G.L+"px");dl.style.setProperty("--kstT",G.t+"px");dl.style.setProperty("--kstW",G.w+"px");dl.style.setProperty("--kstH",G.H+"px");
 if(M)M.classList.add("kstg");document.body.classList.add("kscn-on");if(M&&M.__kstFresh){M.__kstFresh=0;dl.__kstNew=1}/* every open (a reopened dialog keeps its own classes, the layer's are reset on close) */
 if(!dl.classList.contains("kstage")||!dl.querySelector(":scope>.kstg-bg")){dl.classList.add("kstage");
  const bg=document.createElement("div");bg.className="kstg-bg";const v=document.createElement("div");v.className="kstg-veil";dl.prepend(v);dl.prepend(bg);dl.__kstNew=1}
 const bg=dl.querySelector(":scope>.kstg-bg"),pic=kstgPic(dl);if(bg&&pic&&bg.dataset.src!==pic){bg.dataset.src=pic;bg.style.backgroundImage=`url("${pic}")`}
 kstgFigs(dl,mb);return true}catch(e){console.error("kstgOn",e);return false}}
/* place the figures, the speech box and the hand inside the layer (px, layer-local) */
function kstgPlace(dl){try{if(!dl||!dl.classList.contains("kstage"))return;const K=KIT_STAGE,ip=(()=>{try{return kitView().pages===2?1:0}catch(e){return document.documentElement.classList.contains("kv2")?1:0}})();
 const W=dl.clientWidth,H=dl.clientHeight;if(!W||!H)return;const mb=dl.querySelector(":scope>#mb"),g=mb&&mb.querySelector(".opts.khand");if(!g)return;
 const hd=dl.querySelector(":scope>.kph"),sl=dl.querySelector(":scope>.kseal");const T0=(hd&&hd.getClientRects().length?hd.offsetTop+hd.offsetHeight:K.pad)+6;
 if(sl){sl.style.setProperty("right",K.pad+"px","important");sl.style.setProperty("left","auto","important");sl.style.setProperty("top",K.pad+"px","important")}
 const hH=g.offsetHeight||parseFloat(getComputedStyle(g).getPropertyValue("--khH"))||0,handTop=H-4-hH;
 const figBot=Math.min(H-4,handTop+Math.round(hH*K.feetIn)),fh=Math.max(120,Math.round((figBot-T0)*K.fig[ip]));const fy=figBot-fh;
 const sp=mb.querySelector(":scope>.kstg-sp"),me=mb.querySelector(":scope>.kstg-me");let faceBot=T0,midL=K.pad,midR=W-K.pad;
 const put=(el,side)=>{if(!el)return;const im=el.querySelector("img");const nw=im&&im.naturalWidth||420,nh=im&&im.naturalHeight||1000,ob=kstgOb(im)||{l:.08,r:.92,t:.02,b:1};
  const fw=Math.round(fh*nw/nh);/* the painted part sits fully inside the layer; speaker hugs the left edge, she the right */
  let fx=side<0?Math.round(K.pad-ob.l*fw):Math.round(W-K.pad-ob.r*fw);el.style.setProperty("--fx",fx+"px");el.style.setProperty("--fy",fy+"px");el.style.setProperty("--fw",fw+"px");el.style.setProperty("--fh",fh+"px");
  const top=fy+ob.t*fh;el.style.setProperty("--tagy",Math.max(T0+16-fy,Math.round(ob.t*fh-2))+"px");faceBot=Math.max(faceBot,Math.round(top+K.faceK*fh*(ob.b-ob.t)));
  if(side<0)midL=Math.max(midL,Math.round(fx+ob.r*fw)+6);else midR=Math.min(midR,Math.round(fx+ob.l*fw)-6)};
 put(sp,-1);put(me,1);
 const pm=mb.querySelector(".kpmain");if(pm){let bx,bw,by;const roomMid=midR-midL;
  if(roomMid>=K.midMin){bw=Math.min(K.boxMaxW[ip],roomMid);bx=Math.round(midL+(roomMid-bw)/2);by=T0+(ip?10:6)}/* between the two figures, beside their faces */
  else{bw=Math.min(K.boxMaxW[ip],W-2*K.pad-8);bx=Math.round((W-bw)/2);by=faceBot+6}/* narrow screen: over their bodies, under their faces */
  const bh=Math.max(90,handTop-by-(hH?Math.round(hH*.0):0)-10);pm.style.setProperty("--bx",bx+"px");pm.style.setProperty("--by",by+"px");pm.style.setProperty("--bw",bw+"px");pm.style.setProperty("--bh",bh+"px");dl.__kstBox={bx,by,bw,bh}}
 dl.__kstFace=faceBot;dl.__kstHandTop=handTop;
 if(dl.__kstNew){dl.__kstNew=0;kstgIn(dl)}}catch(e){console.error("kstgPlace",e)}}
/* entrance: picture settles, speaker in from the left, she from the right, the speech box drops in (cards: kitHand deal) */
function kstgIn(dl){try{const still=typeof kitHandStill==="function"&&kitHandStill();const mb=dl.querySelector(":scope>#mb");if(!mb)return;
 /* the frame's layout passes may rebuild the body in the first frames: the figures are looked up when the entrance starts, never captured early */
 const figsNow=()=>[...mb.querySelectorAll(":scope>.kstg-fig")];figsNow().forEach(f=>f.style.visibility="hidden");dl.__kstHold=1;
 /* smooth (MD4 lesson): nobody walks in half-painted — the figures wait (hidden) until their pictures are decoded, at most KIT_HAND.readyMs */
 const ims=()=>figsNow().map(f=>f.querySelector("img")).filter(Boolean),cap=(typeof KIT_HAND!=="undefined"&&KIT_HAND.readyMs)||700;
 const ready=new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))).then(()=>Promise.race([Promise.all(ims().map(i=>i.decode?i.decode().catch(()=>{}):0)),new Promise(r=>setTimeout(r,cap))]));
 const pm=mb.querySelector(".kpmain");if(pm&&!still)pm.animate([{transform:"translateY(-14px)",opacity:0},{transform:"none",opacity:1}],{duration:KIT_STAGE.inMs[2],delay:380,easing:"ease-out",fill:"backwards"});
 ready.then(()=>{dl.__kstHold=0;try{kstgPlace(dl)}catch(e){}const F=figsNow();F.forEach(f=>f.style.visibility="");if(still)return;const [a,b]=KIT_STAGE.inMs,E="cubic-bezier(.2,.8,.3,1)";
  const bg=dl.querySelector(":scope>.kstg-bg");if(bg)bg.animate([{transform:"scale(1.05)"},{transform:"none"}],{duration:900,easing:"ease-out"});
  const sp=mb.querySelector(":scope>.kstg-sp"),me=mb.querySelector(":scope>.kstg-me");
  if(sp)sp.animate([{transform:"translateX(-36%)"},{transform:"none"}],{duration:a,easing:E,fill:"backwards"});
  if(me)me.animate([{transform:"translateX(30%)"},{transform:"none"}],{duration:b,delay:160,easing:E,fill:"backwards"})})}catch(e){}}
/* the details plate on the stage: above the lifted card, never over a face */
function kstgPlate(b){try{const g=b.parentElement,dl=g&&g.closest(".dlg.kstage");if(!dl)return;const z=dl.querySelector(":scope>.khplate");if(!z||z.hidden)return;
 const W=dl.clientWidth,D=dl.getBoundingClientRect(),B=b.getBoundingClientRect(),G=g.getBoundingClientRect();const lift=parseFloat(getComputedStyle(g).getPropertyValue("--khlift"))||0;
 const bottom=Math.min(G.top+lift+2,B.top-6)-D.top-(b.disabled?0:Math.round(((typeof KIT_HAND!=="undefined"&&KIT_HAND.confPx)||44)*.6));const top0=(dl.__kstFace||0)+4;const w=Math.min(KIT_STAGE.plateW,W-16);let x=Math.round(Math.max(8,Math.min(W-8-w,B.left-D.left+B.width/2-w/2)));
 z.style.left=x+"px";z.style.width=w+"px";z.style.bottom=Math.round(D.height-bottom)+"px";z.style.maxHeight=Math.max(80,Math.round(bottom-top0))+"px";z.style.top="auto"}catch(e){console.error("kstgPlate",e)}}
(function(){if(typeof kitHandLay!=="function")return;const L0=kitHandLay;
 kitHandLay=function(g,quiet){let dl=null;try{dl=g&&g.closest&&g.closest(".dlg");if(dl&&kitHandWants(g))kstgOn(dl,g)}catch(e){}
  const r=L0.call(this,g,dl&&dl.classList.contains("kstage")?true:quiet);/* the stage owns the frame: the frame-fit passes (kszEvLaw10 / kszTextFirst3) do not run on it */
  try{if(dl&&dl.classList.contains("kstage")){if(!kstgWants(dl)){kstgOff(dl)}else{kstgPlace(dl);const L=g.querySelector(":scope>button.klift");if(L)kstgPlate(L)}}}catch(e){}return r};window.kitHandLay=kitHandLay;
 if(typeof kitHandPlate==="function"){const P0=kitHandPlate;kitHandPlate=function(b){const r=P0.apply(this,arguments);kstgPlate(b);return r};window.kitHandPlate=kitHandPlate}})();
function kstgOff(dl){try{dl.classList.remove("kstage");["--kstL","--kstT","--kstW","--kstH"].forEach(p=>dl.style.removeProperty(p));dl.querySelectorAll(":scope>.kstg-bg,:scope>.kstg-veil,:scope>#mb>.kstg-fig").forEach(e=>e.remove());
 const M=document.getElementById("modal");if(M)M.classList.remove("kstg");document.body.classList.remove("kscn-on")}catch(e){}}
/* a closed / replaced dialog leaves no stage classes behind (the next frame decides again) */
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){try{const M=document.getElementById("modal");if(M){if(M.hidden)M.__kstFresh=1;M.classList.remove("kstg");document.body.classList.remove("kscn-on")}}catch(e){}return s0.apply(this,arguments)};window.showModal=showModal;
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>{document.querySelectorAll("#modal .dlg.kstage").forEach(dl=>{kstgOn(dl);const g=dl.querySelector(".opts.khand");if(g){g.__khSig="";kitHandLay(g,true)}})},140)})})();
(function(){const M=document.getElementById("modal");if(!M||typeof MutationObserver!=="function")return;new MutationObserver(()=>{if(M.hidden){M.classList.remove("kstg");document.body.classList.remove("kscn-on")}}).observe(M,{attributes:true,attributeFilter:["hidden"]})})();
try{window.KIT_STAGE=KIT_STAGE;window.kstgOn=kstgOn;window.kstgPlace=kstgPlace;window.kstgWants=kstgWants}catch(e){}
