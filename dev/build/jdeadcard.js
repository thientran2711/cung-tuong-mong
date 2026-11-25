/* DEAD-CARD NET (flight-modal-deadlock 25/11, law 11). A VIỆC card with options whose EVERY option is greyed (bạc short in j3, kitOff, j75 lk(),
   gift lock) and that has no cancel road (kitCancelIx −1: no ✕, no Esc, no tap-out, no timer) leaves her nothing to press = soft-lock
   (arm A co-op 9B2G wk35: j68c-sea-023 at bạc 2; solo too). Authors keep a road she can take (law 2; gates: dev/test/j68seeds_validate.py,
   dev/test/dead-card.js scans every buildable card at bạc 0). This is the last guard for a card the scan cannot build: the kit close button
   (#mr .main, the kit close word «Lui», KIT_CLOSE_W) appears and the card passes with no effect; logged in window.__deadCards for the robots. */
function deadCardOff(c){if(!c)return true;if(c.off)return true;if(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)return true;if(c.lock||c.tsDis)return true;if(c.need&&c.need.some(n=>n&&!n.ok))return true;
 if(typeof c.lk==="function"){try{if(c.lk())return true}catch(e){}}return false}
function deadCardIs(m){if(!m||!Array.isArray(m.opts)||!m.opts.length)return false;if(m.opts.some(c=>c&&c.kgx))return false;
 const ci=typeof kitCancelIx==="function"?kitCancelIx(m):-1;if(ci>=0)return false;if(m.opts.every(deadCardOff))return true;
 /* flight-choose-guard (law 11): the screen is the truth — a wrapper greys options in the DOM only (jemoact temper lock, jts tsDis, jtsb need):
    every visible option button of this card disabled = dead too (a custom picker that hides its .opt buttons is not judged here) */
 try{const B=[...document.querySelectorAll("#modal .opts button[data-m]")].filter(b=>!b.hidden&&b.getClientRects().length);return B.length>0&&B.every(b=>b.disabled)}catch(e){return false}}
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{
 const M=$("modal"),m=Q[0],mr=$("mr");if(!M||M.hidden||!mr||mr.querySelector("#mclose")||!deadCardIs(m))return r;
 mr.innerHTML=`<button class="main" id="mclose">Lui</button>`;if(typeof kitFix==="function")kitFix(mr);
 (window.__deadCards=window.__deadCards||[]).push({pid:m.pid||"",t:m.t||"",bac:S.bac,turn:S.turn});console.warn("dead card net:",m.pid||m.t)}catch(e){console.error(e)}return r}})();
