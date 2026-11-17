/* jrbatch.js — ONE showModal + ONE render per "Nhận thân phận" tap (perf root fix, dev/handover/reports/oi-perf.md). Assembled LAST so it is the outermost wrapper.
   Every module that hooks nlAccept (jkc, jkc2 ×2, jentry, joi, jkiep, jage, jcoopworld) ends its own hook with showModal();render(), and closeModal
   renders again after the card's onClose: one tap = 4 full render() passes (each a full HUD/stage/panel rebuild + forced layout), 1.3–1.5 s on an
   iPad at CPU 4x. Only the LAST pass is ever seen, so while nlAccept runs a render() only marks "wanted"; one render() runs when the outermost
   nlAccept returns. Inside closeModal (the card's own close, j3) the wanted render is the one closeModal does right after onClose, so it is not
   repeated. Nothing else changes: same calls, same order, same final screen. */
(function(){const RB=window.RB={d:0,p:0};
 const r0=render;render=function(){if(RB.d>0){RB.p=1;return}if(RB.t){cancelAnimationFrame(RB.t);clearTimeout(RB.u);RB.t=RB.u=0}return r0.apply(this,arguments)};
 /* the board behind a card that is followed by another card: drawn once, on the next frame (a later render() call draws it at once instead).
    The origin intro (life card -> 4 story panels -> selection -> Nhập cung -> …) closes 8 cards in a row; each close drew the whole board under
    the next card, which covers it. The timer is the fallback when frames are paused (hidden tab). */
 window.renderSoon=function(){if(RB.t)return;const go=()=>{if(!RB.t)return;cancelAnimationFrame(RB.t);clearTimeout(RB.u);RB.t=RB.u=0;r0Out()};RB.t=requestAnimationFrame(go);RB.u=setTimeout(go,250)};
 const r0Out=()=>{try{render()}catch(e){console.error("renderSoon",e)}};
 /* fn runs with render() held; flush=true: if a render was asked for, run it once when the outermost hold ends */
 /* the same for showModal(): each hook re-showed the card on top (jkc2 first showed "Tuyển chọn", then jentry put the story panel in front of it
    and showed again, then joi …) — only the last one is seen, so it runs once, then the render */
 const s0=showModal;showModal=function(){if(RB.d>0){RB.s=1;return}return s0.apply(this,arguments)};
 /* fn runs with showModal()/render() held; flush=true: each one asked for runs once when the outermost hold ends (showModal first, as the hooks did);
    flush=false: the caller (closeModal) shows and renders right after, so they are dropped */
 window.renderHold=function(fn,ctx,args,flush){RB.d++;let r;try{r=fn.apply(ctx,args||[])}finally{RB.d--;if(RB.d===0){const s=RB.s,p=RB.p;RB.s=RB.p=0;if(flush){if(s)showModal();if(p)render()}}}return r};
 const a0=nlAccept;nlAccept=function(){return renderHold(a0,this,arguments,true)};
})();
