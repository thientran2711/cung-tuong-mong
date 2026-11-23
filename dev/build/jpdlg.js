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
 const src=im.getAttribute("src");const again=()=>requestAnimationFrame(()=>typeof kszKeep3==="function"?kszKeep3(R===document?(document.querySelector("#modal .dlg")||document.body):R,()=>kitPersonDlgFit(R)):kitPersonDlgFit(R));
 /* KIT 56.15 (owner OD 18/11 ~21:20Z (1), via MAIN): the person dialog follows the SAME figure standard as the option frames: the crowned Hoàng hậu stands from just under the name tag to the bottom of the column at the standard body (KIT_SIZE.fig.L3.h + the crown room), and when the text is short the FRAME height follows that figure height (no empty band under her feet); the default pop-up height (--kph) is only the cap. --kph is set on the dialog itself, once per viewport. */
 try{const dlg=col.closest(".kpdlg"),db=col.closest(".kpdb"),key=innerWidth+"x"+innerHeight;if(dlg&&db&&dlg.__hFit!==key){dlg.__hFit=key;dlg.style.removeProperty("--kph");const ko=dlg.querySelector(":scope>.kpopts");dlg.style.setProperty("--kpbh",ko?ko.offsetHeight+10+"px":"0px");const cap=dlg.offsetHeight,chrome=dlg.offsetHeight-db.clientHeight,tg=col.querySelector(".kpsn"),G=(typeof KIT_DP_GAP!=="undefined"&&KIT_DP_GAP.min)||14,std=(typeof KIT_SIZE==="object"&&KIT_SIZE.fig&&KIT_SIZE.fig.L3&&KIT_SIZE.fig.L3.h)||351,cr=(typeof BAL==="object"&&BAL.bookFrame&&BAL.bookFrame.cRef)||.131,colNeed=(tg?tg.offsetHeight:0)+2*G+std*(1+cr)+4,dr=db.querySelector(".kpdr"),cs=getComputedStyle(db),textNeed=dr?(()=>{const o=dr.style.alignSelf,o2=dr.style.height;dr.style.alignSelf="start";dr.style.height="auto";const h=dr.offsetHeight;dr.style.alignSelf=o;dr.style.height=o2;return h})()+parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom):0,want=Math.round(chrome+Math.max(colNeed,textNeed));if(cap>0&&want>0&&want<cap-1){dlg.style.setProperty("--kph",want+"px");again();return}}}catch(e){}
 if(!im.complete&&!im.dataset.kpdl){im.dataset.kpdl=1;im.addEventListener("load",again,{once:true})}
 const b=(src?kitFigBody(src,again):null)||(typeof kitFigWaitBody==="function"&&kitFigWaitBody(im,again));if(!b)return;
 const kfr=parseFloat(im.style.getPropertyValue("--kfr"))||1;const rel=Math.min(1,kfr*(KIT_FIG.man||1));
 /* KIT 32.2b EQUAL GAPS (owner 16/11 s21): frame line above = the header rule (.kph bottom), frame line below = the bottom of the figure area (.kpdb,
    the button band starts there); gap above the name chip = gap under the feet = KIT_DP_GAP (≥ 5 % of that height, ≥ 14 px) */
 let fl=null;try{const dl=col.closest(".kpdlg"),db=col.closest(".kpdb"),ph=dl&&dl.querySelector(":scope > .kph");if(dl&&db&&typeof KIT_DP_GAP!=="undefined"){
  const lt=ph?ph.getBoundingClientRect().bottom:dl.getBoundingClientRect().top,lb=db.getBoundingClientRect().bottom;const G=Math.max(KIT_DP_GAP.min,KIT_DP_GAP.pct*(lb-lt));
  col.style.paddingTop="0px";const pt=Math.max(0,G-(col.getBoundingClientRect().top-lt));col.style.paddingTop=pt.toFixed(1)+"px";fl={lb,G}}}catch(e){}
 const H=box.clientHeight,W=box.clientWidth;if(H<60||W<40)return;
 const ar=im.naturalWidth&&im.naturalHeight?im.naturalWidth/im.naturalHeight:(b.ar||.45);
 const Hf=fl?Math.max(40,Math.min(H,fl.lb-Math.min(fl.G,(typeof KIT_SIZE==="object"&&KIT_SIZE.edge)||12)-box.getBoundingClientRect().top)/* KIT 56.15: the feet stand at most KIT_SIZE.edge (12 px) above the column's bottom line, whatever 5 % of the column height is */):H;/* feet one gap above the lower line */
 const span=Math.max(.2,b.b-b.t);let ih=(Hf-4)*rel/(1+((typeof BAL==="object"&&BAL.bookFrame&&BAL.bookFrame.cRef)||.131))/Math.max(.2,b.b-kitFigTop(b)),iw=ih*ar;/* KIT 56.4: the ONE body = the column height / (1 + the tallest Hoàng hậu crown); never sized by this person's own crown *//* review/fig-headtop: body = head top .. feet at the kit ratio; the crown never leaves the column *//* the painted body (head-top .. feet) fills the column between the gaps; KIT 56.4 (owner 18/11 ~07:50Z): a wide hem / sleeve is NOT cut, it spreads right under the text (drawn on top) */
 /* KIT 56.14 (reviewer ROOT-56): the person column holds the widest painted figure (BAL.figWideRef x body + edge + gap), as far as the text column keeps its kit minimum; --kpdcw is set once, then the figure is laid again */
 try{const dbE=col.closest(".kpdb");if(dbE&&(dbE.__cwTry||0)<3){const wr=(typeof BAL==="object"&&BAL.figWideRef)||.65,eg=(typeof KIT_SIZE==="object"&&KIT_SIZE.edge)||12,mr=(typeof KIT_SIZE==="object"&&KIT_SIZE.v3&&KIT_SIZE.v3.narrow.minRight)||274;const bodyPx=ih*(b.b-kitFigTop(b)),need=Math.ceil(wr*bodyPx+eg+8),cs=getComputedStyle(dbE),inner=dbE.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),gap=parseFloat(cs.columnGap)||12,cur=col.getBoundingClientRect().width,want=Math.min(need,Math.max(cur,inner-gap-mr));if(want>cur+1){dbE.__cwTry=(dbE.__cwTry||0)+1;dbE.style.setProperty("--kpdcw",Math.round(want)+"px");again();return}}}catch(e){}
 const fx=kitFullFigX(b,iw,W,(box.getBoundingClientRect().left-(col.closest(".kpdlg")||col).getBoundingClientRect().left-((typeof KIT_SIZE==="object"&&KIT_SIZE.edge)||12)),W);
 f.style.cssText="position:absolute;left:0;top:0;width:100%;height:100%;margin:0";
 const wr=f.querySelector(".kesfi");if(wr)wr.style.cssText=`position:absolute;left:${fx.toFixed(1)}px;top:${(Hf-ih*b.b).toFixed(1)}px;width:${iw.toFixed(1)}px;height:${ih.toFixed(1)}px;margin:0;max-width:none`;
 im.style.cssText=`width:${iw.toFixed(1)}px;height:${ih.toFixed(1)}px;max-width:none;max-height:none`;col.dataset.kpdfit="1"})}catch(e){console.error("kitPersonDlgFit",e)}}
window.kitPersonDlg=kitPersonDlg;window.kitPersonDlgFit=kitPersonDlgFit;
(function(){let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>kitPersonDlgFit(),140)})})();
(function(){const st=document.createElement("style");st.id="kit-pdlg";st.textContent=`
html body .dlg.kpanel.kpdlg{box-sizing:border-box;width:var(--kpw);min-width:0;max-width:var(--kpw);height:var(--kph);min-height:var(--kph);max-height:var(--kph);display:flex;flex-direction:column;overflow:hidden;margin:0}
.kpdlg>.kph{flex:none}
.kpdlg>.kpdb{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:var(--kpdcw,clamp(110px,38%,248px)) minmax(0,1fr);gap:12px;padding:8px 14px 4px}
.kpdlg .kpsubj.kes{position:relative;z-index:0;display:flex;flex-direction:column;align-items:center;min-height:0;min-width:0;overflow:visible}
.kpdlg .kpdcap{flex:none;margin:0 0 2px;text-align:center;max-width:100%}
.kpdlg .kpdfig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:visible}
.kpdlg .kpdfig .kesf{margin:0}
.kpdlg .kpdfig .kesfi{display:block}
.kpdlg .kpdfig .kesimg{display:block;filter:url(#kfa) var(--klf,brightness(1)) drop-shadow(0 6px 8px #3a201033)}
.kpdlg .kpdfig .kesf>.kpsn{display:none}
.kpdlg .kpdr{position:relative;z-index:1;min-width:0;min-height:0;display:flex;flex-direction:column;gap:8px}/* KIT 56.4: text drawn ON TOP of the figure */
.kpdlg .kdpban{flex:none;margin:0;padding:0}
.kpdlg .kdpban>.ksart{width:100%;height:clamp(84px,calc(17*var(--kvh,1dvh)),150px);aspect-ratio:auto}
.kpdlg .kdpban>.ksart img:not(.ksart-mark){width:100%;height:100%;object-fit:cover}
.kpdlg .kpdt{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;font-size:.9rem;line-height:1.45;color:var(--ink)}
.kpdlg .kpdt p{margin:0 0 6px}
.kpdlg .kpdt .kb{margin:4px 0 2px}
.kpdlg .kpdt .ktut-do{color:var(--gold);font-weight:600}
/* KIT 56.15: the buttons sit at the bottom of the RIGHT column only (over its free corner), so the figure column runs from the name tag to the frame's bottom edge; the right column keeps --kpbh free under its text */
.kpdlg{position:relative}.kpdlg>.kpdb{padding-bottom:12px}.kpdlg .kpdr{padding-bottom:var(--kpbh,0px)}
.kpdlg>.kpopts{position:absolute;right:14px;bottom:12px;left:auto;display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px;padding:0;margin:0;min-height:0;max-width:calc(100% - var(--kpdcw,38%) - 40px)}
.kpdlg>.kpopts .kbtn{min-height:40px;padding:6px 16px;font-size:.86rem}
/* kv3:.kv1 */:where(.kv1) .kpdlg>.kpdb{grid-template-columns:var(--kpdcw,clamp(84px,32%,140px)) minmax(0,1fr);gap:9px;padding:8px 10px 2px}:where(.kv1) .kpdlg .kpdt{font-size:.84rem}:where(.kv1) .kpdlg>.kpopts{right:10px;bottom:10px}
`;document.head.appendChild(st)})();
