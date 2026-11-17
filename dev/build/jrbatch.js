/* jrbatch.js — ONE showModal + ONE render per "Nhận thân phận" tap (perf root fix, dev/handover/reports/oi-perf.md). Assembled LAST so it is the outermost wrapper.
   Every module that hooks nlAccept (jkc, jkc2 ×2, jentry, joi, jkiep, jage, jcoopworld) ends its own hook with showModal();render(), and closeModal
   renders again after the card's onClose: one tap = 4 full render() passes (each a full HUD/stage/panel rebuild + forced layout), 1.3–1.5 s on an
   iPad at CPU 4x. Only the LAST pass is ever seen, so while nlAccept runs a render() only marks "wanted"; one render() runs when the outermost
   nlAccept returns. Inside closeModal (the card's own close, j3) the wanted render is the one closeModal does right after onClose, so it is not
   repeated. Nothing else changes: same calls, same order, same final screen. */
(function(){const RB=window.RB={d:0,p:0};
 const r0=render;render=function(){if(RB.d>0){RB.p=1;return}RB.q=0;return r0.apply(this,arguments)};
 /* the board behind a card that is followed by another card: drawn once at the end of the current task (microtask), not after every card.
    A run of cards closed in one go (the origin intro: life card -> 4 story panels -> selection -> Nhập cung -> …, or a bot / auto-close loop)
    drew the whole board under each next card, which covers it; a render() called before the task ends draws it at once and the queued one is
    skipped. A single tap is unchanged: its board render still runs in the same task, before the frame. */
 window.renderSoon=function(){if(RB.q)return;RB.q=1;queueMicrotask(()=>{if(!RB.q)return;RB.q=0;try{render()}catch(e){console.error("renderSoon",e)}})};
 /* the same for showModal(): each hook re-showed the card on top (jkc2 first showed "Tuyển chọn", then jentry put the story panel in front of it
    and showed again, then joi …) — only the last one is seen, so it runs once, then the render */
 const s0=showModal;showModal=function(){if(RB.d>0){RB.s=1;return}return s0.apply(this,arguments)};
 /* fn runs with showModal()/render() held; flush=true: each one asked for runs once when the outermost hold ends (showModal first, as the hooks did);
    flush=false: the caller (closeModal) shows and renders right after, so they are dropped */
 window.renderHold=function(fn,ctx,args,flush){RB.d++;let r;try{r=fn.apply(ctx,args||[])}finally{RB.d--;if(RB.d===0){const s=RB.s,p=RB.p;RB.s=RB.p=0;if(flush){if(s)showModal();if(p)render()}}}return r};
 const a0=nlAccept;nlAccept=function(){return renderHold(a0,this,arguments,true)};
})();
