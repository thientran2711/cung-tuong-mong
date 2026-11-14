/* ================= j86: SHE CHOOSES HER FACE ON THE IDENTITY CARD (owner 11/14) =================
   The identity (origin, stats, rank, ...) stays the pre-rolled one (j52). The face is cosmetic only: while the card
   "Thân phận kiếp này" is open (NLP set, before "Nhận thân phận") she may pick any of the consort identities (j66, c01..c32);
   the default is the rolled one. Picking never touches a stat (Sắc stays as rolled).
   The picked identity becomes S.pid (reserved for her; all her art follows it through j66: rank tiers, maid tier, cold
   palace, age bands). An NPC who held that face gets her previous face instead (a swap, so both stay unique), and the
   stored roll (d.pid + the face snapshot) is rewritten so a reload shows the same faces. After "Nhận thân phận" the
   picker is gone and the face is fixed for the life. Old saves are not touched. UI: kit scene panel (j79) section with
   kit tall portraits (pcPort), selection glow #fff3c4 (the kit selection outline). */
function fpOn(){try{return !!(NLP&&S&&S.pid&&typeof FIGIX!=="undefined"&&FIGIX.consort&&FIGIX.consort[S.pid])}catch(e){return false}}
function fpKeys(){const M=FIGIX.consort||{};return pidKeys().filter(k=>M[k]&&M[k].length)}
/* the portrait she would wear with identity k right now (her rank tier or tier 1 as a maid, her age band) */
function fpPor(k){const L=(FIGIX.consort||{})[k];if(!L||!L.length)return"";const f=figBest(L,figTierOf(S),figAgeOf(S));return f&&f.por?figPath(f.por):""}
function fpFace(k){const f=Object.assign({},pMe());f.src=fpPor(k);f.rw="";return f}
function fpNum(k){return +String(k).replace(/\D/g,"")||0}
function fpHTML(){const ks=fpKeys();const cur=S.pid;
 return `<div class="kpsec kfpick"><h4 class="kpst">Dung mạo · chạm để chọn</h4><div class="kfgrid" role="radiogroup" aria-label="Dung mạo">`+
  ks.map(k=>`<button type="button" class="kfp${k===cur?" on":""}" data-fp="${k}" role="radio" aria-checked="${k===cur}" aria-label="Dung mạo ${fpNum(k)}">${pcPort(fpFace(k))}</button>`).join("")+
  `</div><div class="kpnote">Dung mạo chỉ để nhìn, không đổi tư chất.</div></div>`}
/* swap: k becomes hers; an NPC holding k takes her previous face; fidUsed keeps one entry per face */
function fpSet(k){if(!fpOn()||!k||k===S.pid)return false;const M=FIGIX.consort||{};if(!M[k])return false;const old=S.pid;
 const H=nlHolders();const holder=H.find(o=>o&&o!==S&&o.fid===k)||null;
 let U=(S.fidUsed||[]).slice();
 if(holder){holder.fid=old}else{U=U.filter(x=>x!==old)}
 S.pid=k;S.fid=k;if(!U.includes(k))U.push(k);if(holder&&!U.includes(old))U.push(old);
 const seen=new Set();S.fidUsed=U.filter(x=>seen.has(x)?false:(seen.add(x),true));
 try{const d=store.get(NL_KEY);if(d&&NLP&&d.seed===NLP.seed){d.pid=k;d.fpick=k;const F=d.faces=d.faces||{h:[]};F.h=F.h||[];
   H.forEach((o,i)=>{if(!o)return;const r=F.h[i]=F.h[i]||{};if(o===S||o===holder)r.fid=o.fid;else if(r.fid===k)delete r.fid});
   F.fidUsed=S.fidUsed.slice();store.set(NL_KEY,d)}}catch(e){console.error(e)}
 return true}
/* the card: picker section after the stat tiles (before the note line) */
(function(){const b0=kpBuild;kpBuild=function(M,m){b0.apply(this,arguments);try{const dlg=M.querySelector(".dlg");if(dlg)dlg.classList.remove("kfpon");
  if(!(m&&m.nl&&fpOn()))return;const mb=$("mb");const kid=mb.querySelector(".kpid");if(!kid)return;
  const anchor=mb.querySelector(":scope > .kpnote")||mb.querySelector(":scope > .kpopts");const w=document.createElement("div");w.innerHTML=fpHTML();const sec=w.firstElementChild;
  if(anchor)mb.insertBefore(sec,anchor);else mb.appendChild(sec);dlg.classList.add("kfpon");
  const g=sec.querySelector(".kfgrid");{const on=g.querySelector(".kfp.on");if(on)requestAnimationFrame(()=>{try{g.scrollTop=Math.max(0,on.offsetTop-g.offsetTop-4)}catch(e){}})}
 }catch(e){console.error("fpick",e)}}})();
/* her big portrait on the card: the picked por once it has loaded */
function fpRefresh(){try{const m=Q[0];if(!(m&&m.nl))return;m.faces=[[pMe(),S.name]];const sj=document.querySelector("#modal .kpid .kpsubj");if(sj)sj.innerHTML=pframe(pMe());
  document.querySelectorAll("#modal .kfp").forEach(b=>{const on=b.dataset.fp===S.pid;b.classList.toggle("on",on);b.setAttribute("aria-checked",String(on))})}catch(e){console.error(e)}}
$("modal").addEventListener("click",e=>{const b=e.target.closest("button[data-fp]");if(!b)return;e.stopPropagation();if(!fpOn())return;const k=b.dataset.fp;
 if(!fpSet(k))return;const src=figFor(S,"por");
 if(src&&PORK[src]!==1){const im=new Image();im.onload=()=>{PORK[src]=1;if(S.pid===k)fpRefresh()};im.onerror=()=>{PORK[src]=0};im.src=src}
 fpRefresh();try{if(typeof render==="function")render()}catch(e){}});
(function(){const st=document.createElement("style");st.id="kit86";st.textContent=`
.modal.kpscene .dlg.kpsc.kfpon{display:flex;flex-direction:column;overflow:hidden}
.dlg.kpsc.kfpon>.kph{flex:none}
.dlg.kpsc.kfpon>#mb{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.dlg.kpsc.kfpon>#mb>*{flex:none}
.dlg.kpsc.kfpon>#mr{flex:none}
.dlg.kpsc.kfpon>#mb>.kfpick{flex:0 1 auto;min-height:0;display:flex;flex-direction:column;margin:2px 0 4px}
.kfpick .kpst{margin:0 0 3px}
.kfpick .kfgrid{flex:0 1 auto;min-height:62px;max-height:clamp(62px,24dvh,190px);overflow-y:auto;overscroll-behavior:contain;display:grid;grid-template-columns:repeat(auto-fill,minmax(46px,1fr));gap:2px 4px;padding:4px 3px;border:1px solid var(--k-hair);border-radius:var(--k-rad);background:#fffdf8a0}
.kfpick .kfp{all:unset;cursor:pointer;display:block;border-radius:4px;-webkit-tap-highlight-color:transparent}
.kfpick .kfp .pcp{width:100%;height:auto;min-height:0;max-height:none;aspect-ratio:3/4;margin:0;position:relative}
.kfpick .kfp .pcp.kit .kin{transition:filter .15s}
.kfpick .kfp.on .pcp.kit .kin{filter:drop-shadow(0 3px 3px #0005) drop-shadow(0 0 1.5px #fff3c4) drop-shadow(0 0 3px #fff3c4) drop-shadow(0 0 6px rgba(255,236,170,.95))}
.kfpick .kfp:focus-visible .pcp.kit .kin{filter:drop-shadow(0 0 2px #fff3c4) drop-shadow(0 0 4px rgba(255,236,170,.9))}
.kfpick .kfp .kemb{display:none}
.kfpick .kpnote{margin:4px 0 0}
@media (min-width:600px){.kfpick .kfgrid{grid-template-columns:repeat(auto-fill,minmax(50px,1fr))}}`;document.head.appendChild(st)})();
