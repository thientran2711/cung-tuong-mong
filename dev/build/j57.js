/* ================= j57: ONE subject frame in dialogs (owner 11/14: "Thân phận kiếp này" showed a small cropped face) =================
   Root cause 1 (size): the kit's .pcp carries max-height:58% (meant for the person-card column). Inside a dialog's .faces
   <figure> that percentage resolves against the figure's own height, so the 3:4 frame was cut to 180x139 and the figure kept
   the full 3:4 height underneath: a short landscape box over an empty gap. .dlg .spk>.pfr had the override, .faces did not.
   Root cause 2 (picture): pMe()/pv()/... ask porOf() for the identity's tall portrait (por-*.webp, the same art the consort and
   prince cards show); until that file has loaded porOf returns the old square face and only re-renders the main screen, never
   an open dialog. The identity card opens right after start(), so it always showed the square fallback.
   Fix: .faces frames keep their 3:4 size per breakpoint (var(--pfw)), captions use the person-card name/rank style, and any
   open dialog swaps the fallback for the portrait as soon as it has loaded. */
(function(){const st=document.createElement("style");st.textContent=
 ".faces .pfr,.faces .pcp.pfr{max-height:none!important;height:auto;aspect-ratio:3/4;width:100%}"+
 ".faces figure{flex:0 1 var(--pfw);max-width:var(--pfw);min-width:0}.faces .pfwrap{width:100%}"+
 ".modal .faces figcaption{margin-top:4px;text-align:center;max-width:100%}"+
 ".modal .faces figcaption b{font-family:var(--display);font-size:1rem;line-height:1.2;color:var(--ink);overflow-wrap:anywhere}"+
 ".modal .faces figcaption small{font-size:.76rem;font-weight:600;color:var(--gold);overflow-wrap:anywhere}";
 document.head.appendChild(st)})();
/* fallback face -> portrait, swapped into the open dialog once loaded */
const POR57={};
function por57Swap(){try{const M=$("modal");if(!M||M.hidden)return;M.querySelectorAll(".pcp img:not(.pcb2)").forEach(im=>{const s=im.getAttribute("src");const to=POR57[s];if(to&&PORK[to]===1)im.setAttribute("src",to)})}catch(e){}}
if(typeof porOf==="function")(function(){const p0=porOf;porOf=function(who,fb){const r=p0.apply(this,arguments);try{if(r===fb&&fb&&who&&FIGS.length){
  const src=figFor(who===S?S:who===S.emp?{kind:"emp"}:who===S.thO?{kind:"th"}:{ref:who},"por");
  if(src&&src!==fb&&PORK[src]!==0){POR57[fb]=src;if(PORK[src]===1)return src;let n=0;const t=setInterval(()=>{if(PORK[src]===1||PORK[src]===0||++n>40){clearInterval(t);por57Swap()}},150)}}}catch(e){}return r}})();
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);por57Swap();return r}})();
/* audit j54: the round face in the princess / suitor rows is a block (display:grid) and sat on a line of its own; inline like j53's rows */
(function(){const st=document.createElement("style");st.textContent=".h54r>span>.md,.h54box .h54r .md{display:inline-grid;vertical-align:middle}.h54r>span{line-height:1.5}";document.head.appendChild(st)})();
/* no truncated text: on phones / tablets the short tab labels ("Quan hệ", "Tài nghệ") were clipped (nowrap + overflow hidden); let them wrap */
(function(){const st=document.createElement("style");st.textContent="@media (max-width:999px){.tabs button{white-space:normal!important;overflow:visible!important;line-height:1.1;overflow-wrap:normal;word-break:keep-all}.tabs button::after{white-space:normal}}";document.head.appendChild(st)})();
