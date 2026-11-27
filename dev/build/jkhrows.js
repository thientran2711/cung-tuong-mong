/* ================= KIT §101.14 kitHandRows — the Bàn bài on the card rows OUTSIDE #modal (KIT-STAGE-R8; owner 26/11 ~23:58Z «bỏ lật, làm theo Game of Dice»; KK44 request «kitHand outside #modal»; law 11 whole group)
   ONE adapter over kitHand.mount (§101.13, no flip): a tab pane's card row (Hành sự deck, Khuê các decks + Việc groups, Tài nghệ cells, empty-tab acts) becomes a hand; the
   ORIGINAL buttons stay in the pane (parked: zero size, invisible, display untouched so a tab's own filter still reads them), so every handler, id and re-render path is untouched;
   the hand's cards are clones (face = picture · short name · Tốn, the kit passes), «Chọn» → original.click(). A filter that hides originals (Hành sự group chips) re-deals the
   hand with the cards still shown. A row with <2 cards is left as it is. Rows: KIT_HROWS (sel = the row container inside #panel, btn = the card buttons in it). */
const KIT_HROWS=[
 {id:"act-deck",sel:".cards",btn:":scope>button"},
 {id:"skill-cells",sel:".kskacts",btn:".kpanec button.ka"},
 {id:"empty-acts",sel:".ktacts",btn:"button.ka"}
];
function kitHandRowDeal(c,R,id){try{const bs=[...c.querySelectorAll(R.btn)].filter(b=>b.tagName==="BUTTON"&&!b.closest(".khost"));if(bs.length<2)return;c.dataset.khrow=id;
 bs.forEach(b=>{(b.closest(".kpanec")||b).classList.add("khorig")});
 const live=bs.filter(b=>{const w=b.closest(".kpanec")||b;return w.style.display!=="none"&&!w.hidden});const sig=live.map(b=>bs.indexOf(b)+":"+(b.disabled?1:0)).join(",");if(c.__khsig===sig&&c.querySelector(":scope>.khost"))return;c.__khsig=sig;if(!live.length)return;
 const cards=live.map((b,i)=>{const cl=b.cloneNode(true);[...cl.attributes].map(a=>a.name).forEach(a=>{if(a==="id"||(a.startsWith("data-")&&!/^data-(ka|kart|kapic)$/.test(a))||/^on/.test(a))cl.removeAttribute(a)});/* a clone carries no data-* id: delegated document click handlers (skill cells, doors, acts) must never see it — only the ORIGINAL runs the action */cl.hidden=false;cl.style.display="";cl.classList.remove("card","kcard","kodw","kodrow","khorig");cl.classList.add("ka","kart","kopt");cl.dataset.m=String(i);cl.dataset.ka="1";cl.querySelectorAll(".klead").forEach(x=>x.remove());return {id:"r"+bs.indexOf(b),off:b.disabled,html:cl.outerHTML}});
 kitHand.mount(c,{cards,onPick:id=>{const b=bs[+String(id).slice(1)];if(b&&b.isConnected&&!b.disabled)b.click()}})}catch(e){console.error("kitHandRows",e)}}
function kitHandRows(){try{if(typeof kitHand==="undefined"||!kitHand.mount)return;const P=document.getElementById("panel");if(!P)return;
 KIT_HROWS.forEach(R=>P.querySelectorAll(R.sel).forEach(c=>{if(c.closest(".khost"))return;kitHandRowDeal(c,R,R.id)}))}catch(e){console.error("kitHandRows",e)}}
(function(){let t=0;const go=()=>{clearTimeout(t);t=setTimeout(kitHandRows,40)};
 const st=document.createElement("style");st.id="kit-hand-rows";st.textContent=`#panel .khorig{position:absolute!important;width:0!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;visibility:hidden!important;pointer-events:none!important}`;document.head.appendChild(st);
 const arm=()=>{const P=document.getElementById("panel");if(!P)return setTimeout(arm,500);new MutationObserver(m=>{if(m.some(x=>x.type==="attributes"?!x.target.closest(".khost"):![...x.addedNodes,...x.removedNodes].every(n=>n.nodeType===1&&n.classList.contains("khost"))))go()}).observe(P,{childList:true,subtree:true,attributes:true,attributeFilter:["style","hidden","disabled"]})};arm();
 if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);go();return r}}
 window.kitHandRows=kitHandRows})();
