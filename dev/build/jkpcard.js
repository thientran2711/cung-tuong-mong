/* ================= jkpcard: PERSON-CARD ACTS = THẺ GỖ TREO (KIT §98.20; KIT-STAGE-R4; OD 26/11 ~19:00Z «khi mình bỏ vào là mình phải thay toàn bộ những cái cũ đi»;
   KK44 §2 rows: j6 renderStage #popw ← j15 popCard (stage pop-up person card, incl. the home servants of jhouse talkOpts serv) · j15 pcard acts of the Hậu cung tab
   person cards (rvCard / kidCard / empCard / thCard / manCard / staff cards)).
   ONE wiring for every person card (.pc) that shows act buttons: the act rows of the card (.pcb buttons, the kit opt/ka act cards) are no longer shown as rows;
   they hang as kitPick plaques on a signpost RIGHT of the card's portrait column (.pcl), in a host block where the rows were (it scrolls with the card), the card's own group tabs stay its tabs (a tab swaps the plaques; info panes stay readable).
   The card's buttons stay in the DOM (hidden, aria-hidden) and ARE the act path: ✓ on a plaque = a real click on that same button, so every existing click
   handler (talk, doors, ACT-MERGE, harm, gifts …) runs unchanged; a locked act shows its own reason (kwhy) in the kit popover.
   Not acts (dfIsAct rule): group tabs, ✕, info chips; row lists (.pcb.rows, kitRows) and notes stay on the card as they are (info, KIT §101 ruling (c)).
   Several cards at once (a list of cards in one pane): only the card the player opened (#popw) or the single card of a pane gets plaques; a pane with 2+ cards keeps
   its rows (kitPick is one picker per screen) — counted by dev/test/kit-pcard.js.
   Robots (window.__bot) keep the rows (same rule as dfViewOn: robots click the row buttons); window.__kpcard=1 forces plaques on (tests / videos).
   Knob KIT_PCARD.on. PURE DISPLAY: no numbers, no game logic. */
(function(){try{
const KIT_PCARD=window.KIT_PCARD=window.KIT_PCARD||{on:true};
function on(){return KIT_PCARD.on!==false&&typeof kitPick==="object"&&kitPick&&typeof kitPick.open==="function"&&(typeof window.__bot==="undefined"||window.__kpcard===1)}
const isAct=b=>typeof dfIsAct==="function"?dfIsAct(b):!(b.classList.contains("pct")||b.classList.contains("kit-x"));
const T=e=>e?e.textContent.replace(/\s+/g," ").trim():"";
/* one act from one card button: name (.kan or the text before <small>), picture (the act card's own art), word (odds word of the kit meter), cost line */
function actOf(b,i){const nEl=b.querySelector(".kan");let n=T(nEl);if(!n){const c=b.cloneNode(true);c.querySelectorAll("small,.kaart,.kpabox,.kainfo").forEach(x=>x.remove());n=T(c)}
 const img=b.querySelector(".kaart img,img");const src=img&&(img.getAttribute("src")||img.dataset.src||"");const word=T(b.querySelector(".kodm>b,.kodds b"))||"";
 const ton=T(b.querySelector(".kr-ton .krv"))||"";const why=T(b.querySelector(".kwhy"))||(b.disabled?T(b.querySelector(".kr-can .krv,.kr-need .krv")):"");
 return {id:String(i),n:n||"Việc",pic:src||"",word,ton,off:!!b.disabled,why:why||(b.disabled?"Chưa làm được":""),info:""}}
/* the acts of the pane on show (the card's own group tabs .pctabs stay the tabs: info panes such as «Điều ngài thích» stay reachable) */
function paneActs(pc){const pane=pc.querySelector(".pcr .pcg.on")||(pc.querySelector(".pcr .pcg")?null:pc.querySelector(".pcr"));const btns=[],acts=[];
 if(pane)pane.querySelectorAll(".pcb:not(.rows)>button").forEach(b=>{if(!isAct(b))return;acts.push(actOf(b,btns.length));btns.push(b)});return {acts,btns}}
let cur=null;
function wire(pc){if(!pc||!pc.isConnected||pc.__kpc)return;const all=[...pc.querySelectorAll(".pcr .pcb:not(.rows)")].filter(x=>[...x.children].some(b=>b.tagName==="BUTTON"&&isAct(b)));if(!all.length)return;pc.__kpc=1;
 pc.classList.add("kpc-pick");all.forEach(x=>{x.classList.add("kpc-src");x.setAttribute("aria-hidden","true")});
 pc.addEventListener("click",e=>{if(e.target.closest&&e.target.closest(".pctabs [data-pct]"))setTimeout(()=>hang(pc),0)});hang(pc)}
function hang(pc,k=0){if(!pc.isConnected)return;try{if(pc.__kp){pc.__kp.destroy();pc.__kp=null}}catch(e){}const {acts,btns}=paneActs(pc);if(!acts.length)return;
 const src=btns[0].closest(".pcb");let host=src.nextElementSibling;if(!host||!host.classList.contains("kpc-host")){host=document.createElement("div");host.className="kpc-host";src.after(host)}
 /* the host holds the whole plaque column of this pane (KIT_PLAQUE sizes): it sits where the act rows were, scrolls with the card (a card may be height-capped, jk2b
    --kpcmax), and the signpost hangs from the portrait side (anchor just left of the host = the card's portrait column, side r) */
 const K=window.KIT_PLAQUE||{},m=document.documentElement.classList.contains("kv2")?"kv2":"kv1",n=Math.min(acts.length,K.max||6),ph=(K.h&&K.h[m])||60,gp=(K.cord&&K.cord.gap)||10;
 const need=Math.ceil(((K.cord&&K.cord.rail)||18)+n*ph+(n-1)*gp+22);host.style.height=need+"px";
 const hr=host.getBoundingClientRect();if(!hr.width){if(k<30)setTimeout(()=>hang(pc,k+1),100);return}
 const A={x:-12,y:-need*.4,w:12,h:need*1.4};cur=pc;
 pc.__kp=kitPick.open({host,anchor:A,side:"r",acts,dismiss:false,noLap:true,
  onPick:id=>{const b=btns[+id];if(!b||!b.isConnected||b.disabled)return;b.click()},
  onOff:a=>{try{const pb=host.querySelector(`.kpk .kfoc-b[data-id="${a.id}"]`);if(typeof kpPop==="function")kpPop(pb,`<div class="kpopt">${(a.why||"Chưa làm được").replace(/</g,"&lt;")}</div>`,{})}catch(x){}}})}
/* KIT §98.21 ENTRY-LINE BUTTONS = THẺ GỖ (KK44 §2 row j6 #sc-t buttons / jplst .kmnote.kmslot «… vừa rời đi [Theo đến]», j21 goSee / follow lines):
   j6 renderStage puts the buttons of the visit line (S.visit.msg) / place text after the title in #sc-t, which jplst hides (the line itself is the toast) — so those
   buttons were never on screen (found by KIT-STAGE-R4, Fold + iPad: «Theo đến» invisible). They now hang as plaques on the stage, top middle, away from the
   people (soft avoid) and the stage columns (kitPick hard obstacles); ✓ = a real click on that same button (data-follow / data-see paths unchanged). */
function entry(){const st=document.getElementById("stage"),t=document.getElementById("sc-t");if(!st||!t||!st.getClientRects().length)return false;
 const B=[...t.querySelectorAll(":scope>button")];if(!B.length){if(st.__kpcK){st.__kpcK="";const P=kitPick.current();if(P&&P.host===st)P.destroy()}return false}const key=B.map(b=>b.outerHTML).join("");
 const P0=kitPick.current();if(st.__kpcK===key&&P0&&P0.host===st&&P0.open)return true;st.__kpcK=key;
 const acts=B.map((b,i)=>{const c=b.cloneNode(true);const sm=c.querySelector("small");const ton=sm?T(sm).replace(/^Tốn\s*/,""):"";if(sm)sm.remove();return {id:String(i),n:T(c)||"Đi",pic:"",word:"",ton,off:!!b.disabled,why:b.disabled?"Chưa làm được":"",info:""}});
 const go=(k=0)=>{const sr=st.getBoundingClientRect();if(!sr.width||!sr.height){if(k<30)setTimeout(()=>go(k+1),100);return}
  const avoid=[...st.querySelectorAll(".tok,.kstg-fig,.kfig")].filter(x=>x.getClientRects().length).map(x=>{const r=x.getBoundingClientRect();return {x:r.left-sr.left,y:r.top-sr.top,w:r.width,h:r.height}});
  const nm=parseFloat(getComputedStyle(st).getPropertyValue("--kpnh"))||40;const A={x:sr.width*.5-10,y:nm+4,w:20,h:Math.max(160,sr.height*.6)};
  kitPick.open({host:st,anchor:A,acts,avoid,dismiss:false,onPick:id=>{const b=B[+id];if(b&&b.isConnected&&!b.disabled)b.click()}})};requestAnimationFrame(()=>go(0));return true}
function scan(){if(!on())return;try{const pw=document.querySelector("#popw .pc");if(pw&&pw.getClientRects().length){wire(pw);return}
 if(!document.querySelector(".kfoc")&&entry())return;
 const pn=document.getElementById("panel");if(!pn)return;const pcs=[...pn.querySelectorAll(".pc")].filter(x=>x.getClientRects().length&&!x.closest(".kfoc"));if(pcs.length===1)wire(pcs[0])}catch(e){console.error("kitPcard",e)}}
let t=0;const soon=()=>{if(t)return;t=requestAnimationFrame(()=>{t=0;scan()})};
const obs=()=>{["popw","panel","stage"].forEach(id=>{const e=document.getElementById(id);if(e&&!e.__kpcObs){e.__kpcObs=1;new MutationObserver(soon).observe(e,{childList:true,subtree:true})}})};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",obs);else obs();
window.kitPcard={scan,on,wire};
const css=document.createElement("style");css.textContent=`
/* the card's own act rows / tabs: kept as the click path, never shown while the plaques hang (KIT §98.20) */
.pc.kpc-pick .kpc-src{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;white-space:nowrap!important;pointer-events:none!important}
.pc.kpc-pick .kpc-host{position:relative;width:100%;margin:4px 0 6px;overflow:visible}
`;document.head.appendChild(css);
}catch(e){console.error("jkpcard",e)}})();
