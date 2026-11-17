/* jrbatch.js — ONE render per "Nhận thân phận" tap (perf root fix, dev/handover/reports/oi-perf.md). Assembled LAST so it is the outermost wrapper.
   Every module that hooks nlAccept (jkc, jkc2 ×2, jentry, joi, jkiep, jage, jcoopworld) ends its own hook with showModal();render(), and closeModal
   renders again after the card's onClose: one tap = 4 full render() passes (each a full HUD/stage/panel rebuild + forced layout), 1.3–1.5 s on an
   iPad at CPU 4x. Only the LAST pass is ever seen, so while nlAccept runs a render() only marks "wanted"; one render() runs when the outermost
   nlAccept returns. Inside closeModal (the card's own close, j3) the wanted render is the one closeModal does right after onClose, so it is not
   repeated. Nothing else changes: same calls, same order, same final screen. */
(function(){const RB=window.RB={d:0,p:0};
 const r0=render;render=function(){if(RB.d>0){RB.p=1;return}return r0.apply(this,arguments)};
 /* fn runs with render() held; flush=true: if a render was asked for, run it once when the outermost hold ends */
 window.renderHold=function(fn,ctx,args,flush){RB.d++;let r;try{r=fn.apply(ctx,args||[])}finally{RB.d--;if(RB.d===0&&RB.p){RB.p=0;if(flush)render()}}return r};
 const a0=nlAccept;nlAccept=function(){return renderHold(a0,this,arguments,true)};
})();
