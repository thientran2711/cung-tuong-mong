/* ===== KIT §101 kitHand «BÀN BÀI» — event choices as a HAND OF CARDS (owner 24/11 ~15:15Z mẫu 1 GO + 25/11 ~15:12Z «cho kiểu animation game đi»; KK30, review/kit-hand)
   ONE place, every event-choice frame: an option list (`#modal .opts`) of 2–10 kit option cards (`button.ka.kopt`, jopic §6.2b) becomes a hand.
   - Card face = the option's own picture (.kaart) + its SHORT name (.kan) ONLY (owner 24/11 ~15:15Z b, restated via MAIN 146 25/11 ~22:40Z): no odds meter, no Tốn / Được / Mất on the face —
     the odds word + Gợi ý + rows show only in the lifted card's details plate.
   - Tap 1 = the card lifts a little + its details plate shows (the SAME kit card clone the «!» overlay shows: Tốn · Được · Mất · odds word · Gợi ý; a locked card shows its kit «why»).
   - The lifted card carries green ✓ (choose: the card flies up, then the frame's own choose path runs: #modal onclick → chooseM, unchanged) + ✕ (put back); a body tap again does nothing (owner 25/11 ~21:55Z).
   - Keyboard / robot / synthetic clicks (event.detail === 0) choose at once, as before (data-m and every data attribute the tests and the harness read stay on the same buttons).
   - All cards visible, no scroll: one row when they fit at the minimum card width, else 2 (3 on a narrow phone) rows; ONE card size per hand (law 10).
   - Smooth: deal-in, lift and fly are transform/opacity on the CARDS only (never on figures, never a cross-fade of two screens); «Cảnh động» off / reduced motion = no animation (kfStill).
   Numbers: geometry knobs here (KIT_HAND, layout px like KIT_OPT); every game number on the cards comes from the kit card (BAL), nothing typed (law 4). */
const KIT_HAND={min:2,max:10,gap:[8,12],minW:[88,100],maxW:[128,124],cmpW:[[74,92],[78,92]]/* compact hand [min,max] per view: a long story keeps its text readable */,nameFs:[12.5,14],liftK:.13,dealMs:420,readyMs:700,dealStep:70,flyMs:260,plateW:560,confPx:44};
function kitHandOn(g){try{if(!g||!g.matches||!g.matches("#modal .opts")||g.closest(".pc,.kpdlg"))return false;if(!kitHandWants(g))return false;const bs=kitHandCards(g);return bs.length>=KIT_HAND.min&&bs.length<=KIT_HAND.max&&bs.length===[...g.children].filter(b=>b.tagName==="BUTTON"&&b.getClientRects().length).length}catch(e){return false}}
function kitHandWants(g){try{if(!g||!g.closest||g.closest(".pc,.kpdlg"))return false;const k=[...g.children].filter(b=>b.tagName==="BUTTON"),c=k.filter(b=>b.matches("button.ka.kopt")&&!b.classList.contains("kcard")&&!b.classList.contains("kbare"));return c.length>=KIT_HAND.min&&c.length<=KIT_HAND.max&&c.length===k.length&&!c.some(b=>/^face/.test(b.dataset.kopic||"")||b.querySelector(".kopface"))/* a PERSON picker (portrait cards) is not a hand: people are chosen on their own kit (portrait picker / thẻ gỗ treo) */}catch(e){return false}}
function kitHandCards(g){return[...g.children].filter(b=>b.matches&&b.matches("button.ka.kopt")&&!b.classList.contains("kcard")&&!b.classList.contains("kbare")&&(b.getClientRects().length||g.classList.contains("khand")))}
/* SHORT name on the face (owner 24/11 ~15:15Z b): a person named by role + name shows the role only («Theo Tể tướng»), a bracket tail goes
   («Theo phụ thân»); the full title stays in the plate (the parts are only hidden on the face, the plate clone shows them) */
function kitHandShort(b){try{const kan=b.querySelector(".kan");if(!kan)return;/* idempotent: later passes may rewrite the title, so it runs on every lay + title change */
 kan.querySelectorAll(".kname").forEach(k=>{const ti=k.querySelector(":scope>.kti");if(!ti)return;[...k.childNodes].forEach(n=>{if(n!==ti&&!(n.classList&&n.classList.contains("khnx"))&&(n.nodeType===3?n.textContent.trim():1)){const w=document.createElement("span");w.className="khnx";k.insertBefore(w,n);w.appendChild(n)}})});
 const tw=document.createTreeWalker(kan,NodeFilter.SHOW_TEXT);const tx=[];while(tw.nextNode())tx.push(tw.currentNode);
 tx.forEach(n=>{if(n.parentNode&&n.parentNode.closest&&n.parentNode.closest(".khnx"))return;const m=/\s*\([^()]{1,40}\)\s*$/.exec(n.textContent);if(!m||!n.textContent.slice(0,m.index).trim()&&n===tx[0])return;const w=document.createElement("span");w.className="khnx";w.textContent=m[0];n.textContent=n.textContent.slice(0,m.index);n.parentNode.insertBefore(w,n.nextSibling)})}catch(e){}}
function kitHandWide(){try{return kitView().pages===2?1:0}catch(e){return 0}}/* KIT §0: one page (Fold) / two pages (iPad), never a width breakpoint */
function kitHandH(){try{return kitView().h||innerHeight}catch(e){return innerHeight}}
/* layout: slots per card (x, y, rotation) inside the list box; the box gets the hand height; idempotent per (width, count) */
function kitHandLay(g,quiet){try{const bs=kitHandCards(g),n=bs.length;if(!n)return;bs.forEach(kitHandShort);const K=KIT_HAND,ip=kitHandWide(),W=g.clientWidth;if(!W)return;
 const cm=g.dataset.khc==="1";const sig=W+"|"+n+"|"+kitHandH()+"|"+cm;if(g.__khSig===sig&&g.classList.contains("khand"))return;g.__khSig=sig;
 const mnW=cm?K.cmpW[ip][0]:K.minW[ip],mxW=cm?K.cmpW[ip][1]:K.maxW[ip],gap=K.gap[ip],side=Math.round(10+mxW*1.5*.045)/* frame padding + what a turned outer card swings out */,fit=Math.max(1,Math.floor((W-2*side+gap)/(mnW+gap)));let rows=Math.ceil(n/fit);const per=Math.ceil(n/rows);
 let cw=Math.min(mxW,(W-2*side-(per-1)*gap)/per);const fs=cw<100?K.nameFs[0]-.5:K.nameFs[ip];
 const face=h=>Math.round(h-10+fs*1.15*3+12);/* picture square (card width − padding) + up to 3 name lines + gaps (no odds meter on the face) */
 let ch=face(cw);const lift=Math.round(ch*K.liftK);
 /* the hand may take at most ~46 % of the screen height (the story text and the speaker keep the rest; law 10) */
 const cap=Math.round(kitHandH()*(n>(ip?5:6)?.46:(ip?.36:.40)));const need=()=>lift+6+rows*ch+(rows-1)*gap+8;
 while(need()>cap&&cw>mnW*.78){cw-=4;ch=face(cw)}
 g.classList.add("khand");g.dataset.khand=n;g.dataset.khrows=rows;g.style.setProperty("--khw",Math.floor(cw)+"px");g.style.setProperty("--khh",ch+"px");g.style.setProperty("--khfs",fs+"px");g.style.setProperty("--khlift",lift+"px");
 let maxY=0;bs.forEach((b,i)=>{const r=Math.floor(i/per),k=i%per,inRow=r<rows-1?per:n-per*(rows-1),rowW=inRow*cw+(inRow-1)*gap,x=(W-rowW)/2+k*(cw+gap),mid=(inRow-1)/2,d=k-mid;
  const rot=rows===1?d*Math.min(2.4,8/Math.max(1,mid)):d*1.1,arc=d*d*(rows===1?Math.min(2.2,10/Math.max(1,mid*mid)):.6),y=lift+6+r*(ch+gap)+arc;maxY=Math.max(maxY,y+ch);
  b.style.setProperty("--kx",Math.round(x)+"px");b.style.setProperty("--ky",Math.round(y)+"px");b.style.setProperty("--kr",rot.toFixed(2)+"deg");b.dataset.khi=i});
 g.style.setProperty("--khH",Math.ceil(maxY+8)+"px");
 const dl=g.closest(".dlg");if(dl){dl.classList.add("khdlg");if(!quiet)try{if(typeof kszEvLaw10==="function")kszEvLaw10(dl);if(typeof kszTextFirst3==="function")kszTextFirst3(dl)}catch(e){}}
 const L=g.querySelector(":scope>button.klift");if(L)kitHandPlate(L)}catch(e){console.error("kitHandLay",e)}}
/* the details plate: the kit «!» card clone (jopic kitOptInfo form), in the frame, just above the hand, never over the speaker's figure column */
function kitHandPlate(b){try{const g=b.parentElement,dl=g&&g.closest(".dlg");if(!dl)return;let z=dl.querySelector(":scope>.khplate");if(!z){z=document.createElement("div");z.className="khplate";z.setAttribute("role","status");dl.appendChild(z)}
 const c=b.cloneNode(true);c.removeAttribute("id");c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));c.querySelectorAll(".kaart,.kobang,.kfill,.kdup,.kdup0").forEach(e=>e.remove());c.querySelectorAll(".kofold").forEach(e=>e.classList.remove("kofold"));
 c.querySelectorAll(".kr-ton,.kr-duoc").forEach(r=>{if(!r.querySelector(".krv > *")&&!(r.querySelector(".krv")||{}).textContent)r.remove()});
 ["--kx","--ky","--kr","--k3s","min-height"].forEach(p=>c.style.removeProperty(p));c.classList.remove("kopt","kart","klift","kfdown");c.classList.add("kopinfo");if(b.disabled)c.classList.add("khlock");c.disabled=true;c.type="button";c.removeAttribute("data-m");c.removeAttribute("data-khi");
 const tip=document.createElement("div");tip.className="khtip";tip.textContent=b.disabled?"":"Bấm ✓ để chọn lá này · ✕ để đặt lại";z.innerHTML="";z.appendChild(c);if(tip.textContent)z.appendChild(tip);
 const D=dl.getBoundingClientRect(),G=g.getBoundingClientRect(),fig=dl.querySelector(".kszfig,.spk>.pfwrap,.spk>figure"),hd=dl.querySelector(":scope>.kph");
 let l=Math.max(D.left+8,G.left),r=Math.min(D.right-8,G.right);const lift=parseFloat(getComputedStyle(g).getPropertyValue("--khlift"))||0;
 const bottom=Math.min(G.top+lift+2,b.getBoundingClientRect().top-6)-(b.disabled?0:Math.round(KIT_HAND.confPx*.6));/* plate ends above the lifted card and its ✓ / ✕ */
let top0=(hd&&hd.getClientRects().length?hd.getBoundingClientRect().bottom:D.top)+6;
 /* the speaker's figure is never covered (brief: announcer never covered): the plate goes beside it when there is room (>= 260 px), else it stays under the figure's feet and scrolls inside */
 const F=fig&&fig.getClientRects().length?fig.getBoundingClientRect():null;z.hidden=false;z.style.maxHeight="";z.style.width=Math.min(KIT_HAND.plateW,r-l)+"px";const ph=z.offsetHeight;
 if(F&&F.bottom>bottom-ph&&F.right>l&&F.left<r){if(r-(F.right+8)>=260)l=Math.max(l,F.right+8);else top0=Math.max(top0,F.bottom+4)}
 const w=Math.min(KIT_HAND.plateW,r-l);
 const B=b.getBoundingClientRect();let x=Math.round(Math.max(l,Math.min(r-w,B.left+B.width/2-w/2)));
 z.style.left=(x-D.left)+"px";z.style.width=w+"px";z.style.bottom=(D.bottom-bottom)+"px";z.style.maxHeight=Math.max(80,bottom-top0)+"px";
 if(!kitHandStill())z.animate([{transform:"translateY(10px)"},{transform:"none"}],{duration:160,easing:"ease-out"})}catch(e){console.error("kitHandPlate",e)}kitHandConf(b)}
/* ✓ / ✕ CONFIRM (owner 25/11 ~21:55Z, replaces «tap again = choose», law 14): the LIFTED card carries two kit buttons on its top-right corner:
   green ✓ = choose this card, ✕ = put it back (look at the others). Tapping the card body again does nothing; tapping another card lifts that one.
   One part for every hand (and the same rule for the thẻ gỗ picker kitPick). Size = KIT_HAND.confPx (kit tap size), above the card art. */
function kitHandConf(b){try{const g=b&&b.parentElement,dl=g&&g.closest(".dlg");if(!dl)return;let c=dl.querySelector(":scope>.khconf");
 if(!b.classList.contains("klift")||b.disabled){if(c)c.hidden=true;return}
 if(!c){c=document.createElement("div");c.className="khconf";c.innerHTML=`<button type="button" class="khok" aria-label="Chọn lá này">✓</button><button type="button" class="khx" aria-label="Đặt lại">✕</button>`;dl.appendChild(c)}
 c.hidden=false;const D=dl.getBoundingClientRect(),B=b.getBoundingClientRect(),s=KIT_HAND.confPx,gap=6,w=2*s+gap;
 let x=Math.round(B.right-D.left-w+s*.35),y=Math.round(B.top-D.top-s*.55);x=Math.max(4,Math.min(D.width-w-4,x));y=Math.max(4,y);
 c.style.left=x+"px";c.style.top=y+"px";c.style.setProperty("--khcs",s+"px")}catch(e){console.error("kitHandConf",e)}}
function kitHandConfOff(g){const dl=g&&g.closest&&g.closest(".dlg"),c=dl&&dl.querySelector(":scope>.khconf");if(c)c.hidden=true}
function kitHandStill(){try{return typeof kfStill==="function"?kfStill():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function kitHandDrop(g){if(!g)return;g.querySelectorAll(":scope>button.klift").forEach(x=>{x.classList.remove("klift");x.removeAttribute("aria-pressed")});const dl=g.closest(".dlg"),z=dl&&dl.querySelector(":scope>.khplate");if(z)z.hidden=true;kitHandConfOff(g)}
function kitHandLift(b){const g=b.parentElement;if(!g||g.__khBusy)return;if(b.classList.contains("klift"))return;kitHandDrop(g);b.classList.add("klift");b.setAttribute("aria-pressed","true");kitHandPlate(b)}
/* choose: the card flies up a little and fades, the rest sink; then the frame's own choose path (a synthetic click = detail 0, passes the two-tap gate) */
function kitHandChoose(b){const g=b.parentElement;if(!g||g.__khBusy)return;g.__khBusy=1;window.__khFlyT=performance.now();const go=()=>{g.__khBusy=0;const z=g.closest(".dlg")&&g.closest(".dlg").querySelector(":scope>.khplate");if(z)z.hidden=true;if(b.isConnected)b.click()};
 {const z0=g.closest(".dlg")&&g.closest(".dlg").querySelector(":scope>.khplate");if(z0)z0.hidden=true;kitHandConfOff(g)}/* the plate leaves with the choice (it stayed up during the fly) */
 if(kitHandStill()||!b.animate){go();return}
 const rot=b.style.getPropertyValue("--kr")||"0deg",lift=parseFloat(getComputedStyle(g).getPropertyValue("--khlift"))||0,ms=KIT_HAND.flyMs;
 b.animate([{transform:`translateY(${-lift}px) rotate(0deg)`,opacity:1},{transform:`translateY(${-lift-46}px) scale(1.12)`,opacity:0}],{duration:ms,easing:"cubic-bezier(.3,.6,.4,1)",fill:"forwards"});
 kitHandCards(g).filter(x=>x!==b).forEach(x=>x.animate([{transform:`translateY(0px) rotate(${x.style.getPropertyValue("--kr")||"0deg"})`,opacity:1},{transform:`translateY(26px) rotate(${x.style.getPropertyValue("--kr")||"0deg"})`,opacity:0}],{duration:ms-40,easing:"ease-in",fill:"forwards"}));
 setTimeout(go,ms)}
/* deal-in: once per frame card (Q[0]), cards come from below-right to their slots, one by one */
const KH_DEALT=new WeakSet(),KH_PEND=new WeakSet();
function kitHandDeal(g,m){try{if(!m||KH_DEALT.has(m))return;KH_DEALT.add(m);if(kitHandStill())return;
 /* paint-ready first (MD4 lesson): the frame's own pictures decode and its late re-fits run BEFORE the cards fly (they were long frames in the middle of the deal); cards wait hidden, at most KIT_HAND.readyMs */
 g.classList.add("khpre");const dl=g.closest(".dlg");const ims=dl?[...dl.querySelectorAll("img")].filter(i=>i.getClientRects().length):[];
 const ready=Promise.race([Promise.all(ims.map(i=>(i.complete?(i.decode?i.decode():Promise.resolve()):new Promise(r=>{i.addEventListener("load",r,{once:true});i.addEventListener("error",r,{once:true})})).catch(()=>0))),new Promise(r=>setTimeout(r,KIT_HAND.readyMs))]);
 KH_PEND.add(m);ready.then(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))).then(()=>{KH_PEND.delete(m);/* the frame may have been rebuilt meanwhile (a new list element): deal the hand that is on screen now */const g2=g.isConnected?g:document.querySelector("#modal:not([hidden]) .opts.khand");if(g2&&(typeof Q==="undefined"||Q[0]===m))kitHandDealGo(g2);else if(g2)g2.classList.remove("khpre")})}catch(e){g.classList.remove("khpre");console.error("kitHandDeal",e)}}
function kitHandDealGo(g){try{const bs=kitHandCards(g),G=g.getBoundingClientRect(),K=KIT_HAND;g.classList.remove("khpre");window.__khDealT=performance.now();/* probe: dev/test/kit-hand-perf.js */
 bs.forEach((b,i)=>{const x=parseFloat(b.style.getPropertyValue("--kx"))||0,rot=b.style.getPropertyValue("--kr")||"0deg",dx=Math.round(G.width-x+20),dy=Math.round(Math.max(60,G.height*1.2));
  b.animate([{transform:`translate(${dx}px,${dy}px) rotate(14deg) scale(.7)`,opacity:0},{transform:`translate(${Math.round(dx*.12)}px,${Math.round(dy*.06)}px) rotate(${rot})`,opacity:1,offset:.75},{transform:`translateY(0px) rotate(${rot})`,opacity:1}],{duration:K.dealMs,delay:i*K.dealStep,easing:"cubic-bezier(.25,.8,.3,1)",fill:"backwards"})})}catch(e){console.error("kitHandDeal",e)}}
/* apply to the frame on screen: every pass of showModal (outermost wrapper) + late re-layouts (ResizeObserver) */
function kitHand(M){try{M=M||document.getElementById("modal");if(!M||M.hidden)return;M.querySelectorAll(".opts").forEach(g=>{if(!kitHandOn(g)){if(g.classList.contains("khand")){g.classList.remove("khand");delete g.dataset.khand}return}
  kitHandLay(g);const m0=typeof Q!=="undefined"?Q[0]:null;if(m0&&KH_PEND.has(m0))g.classList.add("khpre");/* a rebuilt list while the deal waits stays hidden too */kitHandDeal(g,m0);
  if(!g.__khMO&&typeof MutationObserver==="function"){g.__khMO=new MutationObserver(()=>{try{g.__khMO.disconnect();kitHandCards(g).forEach(kitHandShort)}finally{g.__khMO.observe(g,{subtree:true,childList:true,characterData:true})}});g.__khMO.observe(g,{subtree:true,childList:true,characterData:true})}
  if(!g.__khRO&&typeof ResizeObserver==="function"){g.__khRO=new ResizeObserver(()=>{if(!g.isConnected||g.__khBusy)return;cancelAnimationFrame(g.__khRaf);g.__khRaf=requestAnimationFrame(()=>kitHandLay(g))});g.__khRO.observe(g)}})}catch(e){console.error("kitHand",e)}}
window.kitHand=kitHand;window.kitHandWants=kitHandWants;window.kitHandLay=kitHandLay;window.KIT_HAND=KIT_HAND;
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const M=document.getElementById("modal");if(M&&!M.hidden){kitHand(M);requestAnimationFrame(()=>kitHand(M))}}catch(e){console.error("kitHand",e)}return r}})();
/* the two-tap gate (capture, before #modal onclick): a REAL tap (detail ≥ 1) on a resting card lifts it; on the lifted card it chooses (with the fly); a tap elsewhere in the frame drops the lifted card */
document.addEventListener("click",e=>{try{const t=e.target;if(!t||!t.closest)return;
 const cf=t.closest("#modal .dlg>.khconf>button");/* the hand's own ✓/✕ (a kitPick .kpk-conf inside the stage is its own part) */if(cf){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const dl=cf.closest(".dlg"),L=dl&&dl.querySelector(".opts.khand>button.klift");if(!L)return;
  if(cf.classList.contains("khok"))kitHandChoose(L);else kitHandDrop(L.parentElement);return}
 const b=t.closest("#modal .opts.khand > button.kopt");
 if(!b){const g=t.closest("#modal .opts.khand");if(g){/* a tap that landed on the list box: a locked card under the finger (browsers that swallow events on disabled buttons) */const hit=kitHandCards(g).find(x=>{const r=x.getBoundingClientRect();return x.disabled&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom});if(hit){e.stopPropagation();kitHandLift(hit);return}}
  if(t.closest("#modal")&&!t.closest(".khplate,.khconf,#kpinfo,#kpop"))document.querySelectorAll("#modal .opts.khand").forEach(kitHandDrop);return}
 if(e.detail===0||b.disabled)return;/* keyboard / robot / synthetic click: chooses at once (unchanged path) */
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(b.parentElement.__khBusy)return;if(!b.classList.contains("klift"))kitHandLift(b)/* the lifted card body: nothing (✓ chooses) */}catch(x){console.error("kitHand tap",x)}},true);
/* a locked card: pointerdown lands on the disabled button (Chrome / Safari) → lift + plate with its kit «why» (jfx kfLocked skips hand cards) */
document.addEventListener("pointerdown",e=>{try{if(e.button>0)return;const b=e.target&&e.target.closest&&e.target.closest("#modal .opts.khand > button.kopt:disabled");if(b)kitHandLift(b)}catch(x){}},{capture:true,passive:true});
(function(){const st=document.createElement("style");st.id="kit-hand";st.textContent=`
html body #modal#modal#modal#modal .opts.khand{display:block!important;position:relative!important;height:var(--khH)!important;min-height:0!important;max-height:none!important;overflow:visible!important;padding:0!important;margin:4px 0 2px!important;flex:none!important;grid-template-columns:none!important;contain:layout}
html body #modal#modal#modal#modal .opts.khand>button.kopt{position:absolute!important;left:var(--kx)!important;top:var(--ky)!important;width:var(--khw)!important;height:var(--khh)!important;min-height:0!important;max-width:none!important;min-width:0!important;margin:0!important;padding:5px 5px 6px!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:4px!important;grid-column:auto!important;
 transform:translateY(var(--kyo,0px)) rotate(var(--kr,0deg));transform-origin:50% 115%;transition:transform .18s cubic-bezier(.2,.8,.3,1);border-radius:10px!important;box-shadow:0 2px 6px rgba(60,30,10,.22);text-align:center!important;overflow:hidden!important;backface-visibility:hidden}
html body #modal#modal#modal#modal .opts.khand>button.kopt>.kaart{position:relative!important;flex:none!important;width:100%!important;height:auto!important;aspect-ratio:1/1;margin:0!important;left:auto!important;top:auto!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt>.kaart>figure{width:100%!important;height:100%!important;margin:0!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt>.kabody{flex:1 1 auto!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;min-width:0!important;width:100%!important;padding:0!important;margin:0!important;transform:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kat{display:flex!important;flex-direction:column!important;align-items:center!important;gap:4px!important;min-height:0!important;width:100%!important;padding:0!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kan{font-size:var(--khfs)!important;line-height:1.15!important;text-align:center!important;white-space:normal!important;display:-webkit-box!important;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden!important;max-width:100%!important;width:auto!important;flex:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kodds{display:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .khnx{display:none!important}/* face = picture + short name only; the odds word lives in the plate */
html body #modal#modal#modal#modal .opts.khand>button.kopt .kb,html body #modal#modal#modal#modal .opts.khand>button.kopt>.kobang,html body #modal#modal#modal#modal .opts.khand>button.kopt .kwhy,html body #modal#modal#modal#modal .opts.khand>button.kopt small:not(.kodds *){display:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt.klift{--kyo:calc(var(--khlift) * -1);--kr:0deg;z-index:3;box-shadow:0 0 0 2px var(--k-gold,#c9a24a),0 10px 20px rgba(60,30,10,.32)}
html body #modal#modal#modal#modal .opts.khand>button.kopt:disabled{filter:grayscale(.55) brightness(.96)}
html body #modal#modal#modal#modal .opts.khand>button.kopt:disabled.klift{filter:none}
#modal .dlg.khdlg{position:relative}
html body #modal#modal#modal#modal .opts.khand.khpre>button.kopt{opacity:0}
html body #modal#modal#modal#modal .dlg:not(.khmeas) .k3right>.opts.khand,html body #modal#modal#modal#modal .dlg:not(.khmeas) #mb>.opts.khand{position:sticky!important;bottom:0;z-index:2;background:var(--k-card,#fffaf0)}/* the hand never scrolls out of view: a long story scrolls under it */
html body #modal#modal#modal#modal .k3right>.opts.khand{margin-top:auto!important}
#modal .dlg>.khconf,.khconf{position:absolute;z-index:8;display:flex;gap:6px;pointer-events:auto}
.khconf[hidden]{display:none!important}
#modal .dlg>.khconf>button,.khconf>button{width:var(--khcs,44px);height:var(--khcs,44px);min-width:0;min-height:0;padding:0;margin:0;border-radius:50%;display:grid;place-items:center;font-size:calc(var(--khcs,44px)*.5);font-weight:800;line-height:1;cursor:pointer;box-shadow:0 3px 10px #0005;border:2px solid #fffaf0}
#modal .dlg>.khconf>.khok .kmk,.khconf>.khok .kmk{background:#fff!important;color:#fff!important;width:.95em;height:.95em;margin:0!important;vertical-align:0}
#modal .dlg>.khconf>.khok,.khconf>.khok{background:#2f8a3e;color:#fff}
#modal .dlg>.khconf>.khx,.khconf>.khx{background:#fffaf0;color:#7a2a1c;border-color:var(--k-gold,#c9a24a)}
#modal .dlg>.khconf>button:active,.khconf>button:active{transform:scale(.92)}
#modal .dlg>.khplate{position:absolute;z-index:6;display:flex;flex-direction:column;gap:4px;overflow:auto;pointer-events:none}
#modal .dlg>.khplate[hidden]{display:none}
#modal .dlg>.khplate>button.kopinfo{width:100%;margin:0;box-shadow:0 6px 14px rgba(60,30,10,.28)!important;text-align:left;opacity:1!important;filter:none!important;background:var(--k-card,#fffaf0)!important;color:var(--ink,#2a1a12)!important;cursor:default}
#modal .dlg>.khplate>button.kopinfo:not(.khlock) .kodds{filter:none!important;opacity:1!important}/* the plate is a disabled COPY: its meter keeps the live colours unless the card is locked */
#modal .dlg>.khplate>.khtip{align-self:center;font-size:.8rem;padding:2px 12px;border-radius:999px;background:var(--k-card,#fffaf0);color:var(--ink,#2a1a12);box-shadow:0 0 0 1px var(--k-gold,#c9a24a)}
`;document.head.appendChild(st)})();
