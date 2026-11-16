/* ================= KIT 50.2 · kitPersonDlg — THE person pop-up for hosts OUTSIDE #modal (owner 16/11 07:35Z + 07:37Z, OD:L448 / OD:L963) =================
   Owner: EVERY pop-up where a person appears uses the approved event template — LEFT = the person's FULL-BODY figure (name + rank chip above),
   RIGHT TOP = the event picture (landscape banner), below it the info, bottom = the buttons. The small framed portrait (.kpsubj > .pframe) is not
   allowed for a person pop-up; one event = ONE frame size for all its pages / steps, and every pop-up has the same frame size per viewport.
   #modal dialogs get this template from kitEventStage / kitDpApply (jk4). The tutorial coach (jtut kitCoach), the contextual tips (kitTip) and any
   other overlay that lives OUTSIDE #modal (co-op notices …) build it with this ONE function, so the template, the figure fit and the frame size
   are the same code for all of them. Nobody may write a second copy.
   kitPersonDlg({kind,title,sub,p,fig,name,pic:{src,lab},html,btns:[{k,t,alt}],cls}) -> HTML of
     <div class="dlg kpanel kpdlg"> .kph · .kpdb > (.kpsubj.kes > figure.kesf) + .kpdr > (.kdlgart.kdpban + .kpdt) · .kpopts </div>
   The frame is ALWAYS the one pop-up frame (--kpw x --kph, KIT §8.1), the same as every #modal panel — no per-kind / per-step size (reviewer
   popup-fullbody-r1 #3, OD:L963). kitPersonDlgFit(root) lays the figure (feet on the column floor, head under the chip). */
function kitPersonDlg(o){o=o||{};try{
 const kind=o.kind||"guide";const q=o.p||{};
 const fig=kitStageFig(q,{src:o.fig,cap:false});
 let nm="";try{nm=o.name||(typeof kitName==="function"&&(q.__kp||q.name!==undefined||q.rank!==undefined)?kitName(q.__kp||q,{cap:true}):"")||""}catch(e){}
 if(!nm&&q.rw)nm=`<b class="kname" style="--rc:${q.col||"#8a7350"}">${q.rw}</b>`;
 const pic=o.pic&&o.pic.src?`<div class="kdlgart kdpban">${kitSceneArt(o.pic.src,o.pic.lab||"",{shape:"wide",cap:!!o.pic.lab})}</div>`:"";
 const btns=(o.btns||[]).map(b=>`<button type="button" class="kbtn${b.alt?" alt":""}" data-ktut="${b.k}">${b.t}</button>`).join("");
 return `<div class="dlg kpanel kesdlg kpdlg${o.cls?" "+o.cls:""}" data-kind="${kind}" data-kpd="std">${kpHeader(kind,o.title||"",o.sub||"")}`+
  `<div class="kpdb"><div class="kpsubj kes kes1">${nm?`<div class="kpsn kpdcap knr">${nm}</div>`:""}<div class="kpdfig">${fig}</div></div>`+
  `<div class="kpdr">${pic}<div class="kpdt">${o.html||""}</div></div></div>${btns?`<div class="kpopts kpdo">${btns}</div>`:""}</div>`}catch(e){console.error("kitPersonDlg",e);return""}}
function kitPersonDlgFit(root){try{const R=root||document;R.querySelectorAll(".kpdlg .kpsubj.kes").forEach(col=>{
 const box=col.querySelector(".kpdfig"),f=col.querySelector(".kesf"),im=f&&f.querySelector(".kesimg");if(!box||!im)return;
 const src=im.getAttribute("src");const again=()=>requestAnimationFrame(()=>kitPersonDlgFit(R));
 if(!im.complete&&!im.dataset.kpdl){im.dataset.kpdl=1;im.addEventListener("load",again,{once:true})}
 const b=src?kitFigBody(src,again):null;if(!b)return;
 const kfr=parseFloat(im.style.getPropertyValue("--kfr"))||1;const rel=Math.min(1,kfr*(KIT_FIG.man||1));
 /* KIT 32.2b EQUAL GAPS (owner 16/11 s21): frame line above = the header rule (.kph bottom), frame line below = the bottom of the figure area (.kpdb,
    the button band starts there); gap above the name chip = gap under the feet = KIT_DP_GAP (≥ 5 % of that height, ≥ 14 px) */
 let fl=null;try{const dl=col.closest(".kpdlg"),db=col.closest(".kpdb"),ph=dl&&dl.querySelector(":scope > .kph");if(dl&&db&&typeof KIT_DP_GAP!=="undefined"){
  const lt=ph?ph.getBoundingClientRect().bottom:dl.getBoundingClientRect().top,lb=db.getBoundingClientRect().bottom;const G=Math.max(KIT_DP_GAP.min,KIT_DP_GAP.pct*(lb-lt));
  col.style.paddingTop="0px";const pt=Math.max(0,G-(col.getBoundingClientRect().top-lt));col.style.paddingTop=pt.toFixed(1)+"px";fl={lb,G}}}catch(e){}
 const H=box.clientHeight,W=box.clientWidth;if(H<60||W<40)return;
 const ar=im.naturalWidth&&im.naturalHeight?im.naturalWidth/im.naturalHeight:(b.ar||.45);
 const Hf=fl?Math.max(40,Math.min(H,fl.lb-fl.G-box.getBoundingClientRect().top)):H;/* feet one gap above the lower line */
 const span=Math.max(.2,b.b-b.t);let ih=(Hf-4)/span*rel,iw=ih*ar;/* the painted body (head-top .. feet) fills the column between the gaps; a wide hem / sleeve is cut by the column edge */
 const cx=((b.cl!=null?b.cl:b.l)+(b.cr!=null?b.cr:b.r))/2;
 f.style.cssText="position:absolute;left:0;top:0;width:100%;height:100%;margin:0";
 const wr=f.querySelector(".kesfi");if(wr)wr.style.cssText=`position:absolute;left:${(W/2-iw*cx).toFixed(1)}px;top:${(Hf-ih*b.b).toFixed(1)}px;width:${iw.toFixed(1)}px;height:${ih.toFixed(1)}px;margin:0;max-width:none`;
 im.style.cssText=`width:${iw.toFixed(1)}px;height:${ih.toFixed(1)}px;max-width:none;max-height:none`;col.dataset.kpdfit="1"})}catch(e){console.error("kitPersonDlgFit",e)}}
window.kitPersonDlg=kitPersonDlg;window.kitPersonDlgFit=kitPersonDlgFit;
(function(){let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>kitPersonDlgFit(),140)})})();
(function(){const st=document.createElement("style");st.id="kit-pdlg";st.textContent=`
html body .dlg.kpanel.kpdlg{box-sizing:border-box;width:var(--kpw);min-width:0;max-width:var(--kpw);height:var(--kph);min-height:var(--kph);max-height:var(--kph);display:flex;flex-direction:column;overflow:hidden;margin:0}
.kpdlg>.kph{flex:none}
.kpdlg>.kpdb{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:clamp(110px,38%,248px) minmax(0,1fr);gap:12px;padding:8px 14px 4px}
.kpdlg .kpsubj.kes{position:relative;display:flex;flex-direction:column;align-items:center;min-height:0;min-width:0;overflow:hidden}
.kpdlg .kpdcap{flex:none;margin:0 0 2px;text-align:center;max-width:100%}
.kpdlg .kpdfig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
.kpdlg .kpdfig .kesf{margin:0}
.kpdlg .kpdfig .kesfi{display:block}
.kpdlg .kpdfig .kesimg{display:block;filter:url(#kfa) var(--klf,brightness(1)) drop-shadow(0 6px 8px #3a201033)}
.kpdlg .kpdfig .kesf>.kpsn{display:none}
.kpdlg .kpdr{min-width:0;min-height:0;display:flex;flex-direction:column;gap:8px}
.kpdlg .kdpban{flex:none;margin:0;padding:0}
.kpdlg .kdpban>.ksart{width:100%;height:clamp(84px,calc(17*var(--kvh,1dvh)),150px);aspect-ratio:auto}
.kpdlg .kdpban>.ksart img{width:100%;height:100%;object-fit:cover}
.kpdlg .kpdt{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;font-size:.9rem;line-height:1.45;color:var(--ink)}
.kpdlg .kpdt p{margin:0 0 6px}
.kpdlg .kpdt .kb{margin:4px 0 2px}
.kpdlg .kpdt .ktut-do{color:var(--gold);font-weight:600}
.kpdlg>.kpopts{flex:none;display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px;padding:6px 14px 12px;margin:0;position:static;min-height:0}
.kpdlg>.kpopts .kbtn{min-height:40px;padding:6px 16px;font-size:.86rem}
/* kv3:.kv1 */:where(.kv1) .kpdlg>.kpdb{grid-template-columns:clamp(84px,32%,140px) minmax(0,1fr);gap:9px;padding:8px 10px 2px}:where(.kv1) .kpdlg .kpdt{font-size:.84rem}:where(.kv1) .kpdlg>.kpopts{padding:6px 10px 10px}
`;document.head.appendChild(st)})();
