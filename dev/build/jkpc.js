/* ================= jkpc: COMPACT KIT PANEL — KIT §8.1 amendment (owner 16/11, iPad title menu in a near-full-screen frame; review/kpanel-compact) =================
   ONE rule, decided by the panel's CONTENT (never by place): a #modal .dlg.kpanel with little content (no section / row table / subject / picture /
   faces / person card / long text; a menu, a confirm, a short notice, a picker with a few options) gets `.kpcompact`: the §8.1 width, height fitted to
   its content up to the §8.1 height (--kph), centred (the title menu: bottom). Information panels keep the one big §8.1 size.
   kitPanelCompact(dlg) is the classifier (structure after every module built the panel); kitCompactFit() runs after every showModal and on every
   change of #mb (j74 mounts the title sub-screens after showModal). Deterministic: it reads structure, never load timing. ================= */
function kitPanelCompact(dlg){try{if(!dlg||!dlg.classList.contains("kpanel")||dlg.classList.contains("kp-person"))return false;
 const mb=dlg.querySelector(":scope > #mb");if(!mb)return false;
 if(mb.querySelector(".kpmenu,.kpt-mount"))return true;  /* title menu and its sub-screens (Chọn sổ, Thiết lập, Sổ luân hồi): forms / short lists, fitted up to --kph */
 /* panels built around a stage / big picture / person keep the one big size */
 if(mb.querySelector(".kpsubj.kes,.kpid,.kpfaces,.kdlgart,.kpev,.kmlist")||dlg.querySelector(":scope > .kdper,:scope > .kdlgart"))return false;
 /* the rest is decided by CONTENT: fitted height (class on) is at most KPC_MAX of the big frame height (class off) -> short content fits itself, long content keeps the one big size */
 const had=dlg.classList.contains("kpcompact");dlg.classList.remove("kpcompact");const big=dlg.offsetHeight;dlg.classList.add("kpcompact");const nat=dlg.offsetHeight;
 if(!had)dlg.classList.remove("kpcompact");
 return big>0&&nat<=big*KPC_MAX}catch(e){return false}}
const KPC_MAX=.62;
function kitCompactFit(){try{const M=document.getElementById("modal");if(!M)return;const d=M.querySelector(".dlg.kpanel");if(!d)return;
 const on=!M.hidden&&kitPanelCompact(d);if(d.classList.contains("kpcompact")!==on){d.classList.toggle("kpcompact",on);try{if(typeof kitSealEvPlace==="function")kitSealEvPlace()}catch(e){}}  /* the corner seal (jseal) reads the frame size: place it again after the fit */
 M.classList.toggle("kpcompactm",on)}catch(e){}}
window.kitPanelCompact=kitPanelCompact;try{document.getElementById('mb').addEventListener('load',()=>kitCompactFit(),true)}catch(e){}window.kitCompactFit=kitCompactFit;
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);kitCompactFit();return r};window.showModal=showModal;
 try{const mb=document.getElementById("mb");let t=0;if(mb)new MutationObserver(()=>{if(t)return;t=requestAnimationFrame(()=>{t=0;kitCompactFit()})}).observe(mb,{childList:true,subtree:true});
  const M=document.getElementById("modal");if(M)new MutationObserver(()=>{if(t)return;t=requestAnimationFrame(()=>{t=0;kitCompactFit()})}).observe(M,{attributes:true,attributeFilter:["hidden","class"]})}catch(e){}
 const st=document.createElement("style");st.id="kpc-css";st.textContent=`
/* KIT §8.1 compact: same width, height = content (up to --kph) */
html body #modal:not(.pcm) .dlg.kpanel.kpcompact{height:auto!important;min-height:0!important;max-height:var(--kph)!important}
html body #modal:not(.pcm) .dlg.kpanel.kpcompact>#mb{flex:0 1 auto;padding-bottom:6px}
html body #modal:not(.pcm) .dlg.kpanel.kpcompact .kpb.kpshort{margin:0}
/* title menu: small, at the bottom, the room behind it stays visible */
.modal.kpthome.kpscene{align-items:flex-end!important;justify-content:center!important;padding:8px 8px 14px!important}
.modal.kpthome .dlg.kpsc .kpmenu{margin:6px 0 4px}
`;document.head.appendChild(st)})();
