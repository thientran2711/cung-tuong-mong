/* ================= jlag2 (review/lag-play-2, owner 16/11 15:05Z: no lag in play, first priority) =================
   Pure speed: nothing here draws, styles or words anything; every change keeps the same end state, it only skips repeated work.
   1. window.__rendN — render counter; window.__rdep = render depth (>0 while a render runs: per-part fits wait for the end of render).
      __rendN (outermost render call), the "state may have changed" stamp for per-render caches (jaudit krnTable).
   2. kaNorm1 memo — the act/option button normaliser chain (j63 kaNorm1 + j79 kpActArt + jk2b kitHideOut + jopic kpOptArt + jstory/jts/jbac
      wrappers) ran on EVERY matching button of the page twice per render (renderPanel kitFix + the kaNorm observer), ~150 ms at 4x each.
      Every step of that chain is idempotent (each marks the button and returns early); a button whose content and class are unchanged
      since its last full pass is skipped. Buttons inside the dialog (#modal) always run (their wrappers read the open dialog's Q[0]). */
(function(){
 window.__rendN=0;
 setTimeout(()=>{try{
  if(typeof render==="function"){const r0=render;let d=0;render=function(){d++;window.__rdep=d;try{return r0.apply(this,arguments)}finally{d--;window.__rdep=d;if(!d)window.__rendN++}};window.render=render}
  if(typeof kaNorm1==="function"){const n0=kaNorm1;const SIG=new WeakMap();
   const sig=b=>b.className+"|"+b.childElementCount+"|"+b.textContent.length+"|"+(b.disabled?1:0)+"|"+b.attributes.length;
   kaNorm1=function(b){if(!b||!b.nodeType)return n0.apply(this,arguments);const inDlg=!!(b.closest&&b.closest("#modal"));
    if(!inDlg){const s=SIG.get(b);if(s!==undefined&&s===sig(b))return}
    const r=n0.apply(this,arguments);if(!inDlg)try{SIG.set(b,sig(b))}catch(e){}return r}}
 }catch(e){console.error("jlag2",e)}},0);
})();
