/* ================= j86: SHE CHOOSES HER FACE ON THE IDENTITY CARD (owner 11/14) =================
   The identity (origin, stats, rank, ...) stays the pre-rolled one (j52). The face is cosmetic only: while the card
   "Thân phận kiếp này" is open (NLP set, before "Nhận thân phận") she may pick any of the consort identities (j66, c01..c32);
   the default is the rolled one. Picking never touches a stat (Sắc stays as rolled).
   The picked identity becomes S.pid (reserved for her; all her art follows it through j66: rank tiers, maid tier, cold
   palace, age bands). An NPC who held that face gets her previous face instead (a swap, so both stay unique), and the
   stored roll (d.pid + the face snapshot) is rewritten so a reload shows the same faces. After "Nhận thân phận" the
   picker is gone and the face is fixed for the life. Old saves are not touched. UI: kit scene panel (j79) section with
   kit tall portraits (pcPort), kit portrait picker (j79 kitPicker: gold ring + check, pages of whole rows). */
function fpOn(){if(typeof faceOn==="function"){try{return !!(NLP&&faceOn())}catch(e){}}try{return !!(NLP&&S&&S.pid&&typeof FIGIX!=="undefined"&&FIGIX.consort&&FIGIX.consort[S.pid])}catch(e){return false}}
function fpKeys(){const M=FIGIX.consort||{};return pidKeys().filter(k=>M[k]&&M[k].length)}
/* the portrait she would wear with identity k right now (her rank tier or tier 1 as a maid, her age band) */
function fpPor(k){const L=(FIGIX.consort||{})[k];if(!L||!L.length)return"";const f=figBestRank(L,figTierOf(S),figAgeOf(S));return f&&f.por?figPath(f.por):""}
function fpFace(k){const f=Object.assign({},pMe());f.src=fpPor(k);f.rw="";return f}
function fpNum(k){return +String(k).replace(/\D/g,"")||0}
/* the picker = the kit PORTRAIT PICKER (j79 kitPicker); the 84-face pool (facePool(filter), review/face-84) when present, else the 32 consort faces */
/* j88 (review/face-84) API when present: faceOn() · facePool(filter) -> [{id, src, n, por, fig, mine}] · faceChoose(id) */
const FP88=()=>typeof facePool==="function"&&typeof faceChoose==="function";
/* owner 16/11 s23 (face picker, NO tabs): the game picks the face set from her identity, never she: a cung nữ life (isSrv / origin cnv) sees the 52 maid faces only, every phi tần life the whole 84 (32 consort + 52 maid, all have consort dress art) */
/* review/newgame-ui (owner 15/11 "quá lag"): the item list is built ONCE per (pool, her tier, age, dress, roll) — facePool walked all 84
   identities twice (por + fig) on every pick and every tab (≈ 0.3–1.8 s on a tablet); the cells show the small pre-sized copy (kitTn) */
const FP_C={};
function fpKey(){const f=kitFaceScope();let t="",a="",v="";try{t=figTierOf(S);a=figAgeOf(S);v=(typeof isSrv==="function"&&isSrv())?"s":"c"}catch(e){}return [f,t,a,v,(NLP&&NLP.seed)||""].join("|")}
function fpItems(){const key=fpKey();if(FP_C[key])return FP_C[key];let L=null;
 try{if(FP88()){L=(facePool(kitFaceScope())||[]).map(x=>{const f=Object.assign({},pMe());f.src=(typeof kitTn==="function"&&kitTn(x.por))||x.por||"";f.rw="";f.big=x.por||"";return{k:x.id,face:f,label:`${x.src==="maid"?"Dung mạo cung nữ":"Dung mạo"} ${x.n}`,fig:x.fig||""}})}}catch(e){L=null}
 L=L&&L.length?L:fpKeys().map(k=>({k,face:fpFace(k),label:`Dung mạo ${fpNum(k)}`}));if(KIT_TN)FP_C[key]=L;return L}
function fpHTML(){return kitPicker({id:"face",title:"Dung mạo · chạm để chọn",items:fpItems(),cur:S.pid,rows:2,
    note:"Dung mạo chỉ để nhìn, không đổi tư chất.",onPick:fpPick,onPage:fpPrefetch})}
/* the faces on the page in view: their low-res standing figures are fetched + decoded ahead, so a pick shows her at once */
const FP_PF={};function fpPrefetch(btns){try{const M=Object.fromEntries(fpItems().map(x=>[x.k,x]));(btns||[]).forEach(b=>{const x=M[b.dataset.pk];const lo=x&&x.fig&&kitTn(x.fig);if(!lo||FP_PF[lo])return;
  const im=new Image();im.decoding="async";im.src=lo;FP_PF[lo]=im;im.decode&&im.decode().catch(()=>0);try{kitFigBody(lo)}catch(e){}})}catch(e){}}
function fpRedraw(){const old=document.querySelector("#modal .kpick[data-pick=face]");if(!old)return;const w=document.createElement("div");w.innerHTML=fpHTML();const n=w.firstElementChild;old.replaceWith(n);kitPickerLayout(n,false)}
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
addEventListener("kittn",()=>{for(const k in FP_C)delete FP_C[k]});
/* the card: picker section after the stat tiles (before the note line) */
(function(){const b0=kpBuild;kpBuild=function(M,m){b0.apply(this,arguments);try{const dlg=M.querySelector(".dlg");if(dlg)dlg.classList.remove("kfpon");
  if(!(m&&m.nl&&fpOn()))return;const mb=$("mb");const kid=mb.querySelector(".kpid");if(!kid)return;
  const anchor=mb.querySelector(":scope > .kpnote")||mb.querySelector(":scope > .kpopts");const w=document.createElement("div");w.innerHTML=fpHTML();const sec=w.firstElementChild;
  if(anchor)mb.insertBefore(sec,anchor);else mb.appendChild(sec);dlg.classList.add("kfpon");
  requestAnimationFrame(()=>kitPickerLayout(sec,false));(window.requestIdleCallback||(f=>setTimeout(f,400)))(fpWarm,{timeout:1500});
 }catch(e){console.error("fpick",e)}}})();
/* review/newgame-ui-r2 (reviewer FAIL 3): the two pinned choices no longer overlay the body (it scrolled UNDER them: the picker, its
   "Dung mạo chỉ để nhìn…" note and last row were hidden behind them). The card body scrolls in `.kpscroll`; the choices sit BELOW that
   scroll area as a plain pinned row, so nothing is ever covered. */
(function(){const b0=kpBuild;kpBuild=function(M,m){try{const o=$("mb");o&&o.classList.remove("kpmbw")}catch(e){}/* r3: #mb is reused by the next pop-up; a stale .kpmbw (overflow hidden) clipped Nhập cung and every later panel */b0.apply(this,arguments);try{if(!(m&&m.nl))return;const mb=$("mb");if(!mb||!mb.querySelector(":scope > .kpid")||mb.querySelector(":scope > .kpscroll"))return;
  const opts=mb.querySelector(":scope > .kpscopts");if(!opts)return;const w=document.createElement("div");w.className="kpscroll";
  [...mb.childNodes].forEach(n=>{if(n!==opts)w.appendChild(n)});mb.insertBefore(w,opts);mb.classList.add("kpmbw")}catch(e){console.error("kpscroll",e)}}})();
(function(){const st=document.createElement("style");st.id="kp-scroll-css";st.textContent=`
.modal.kpscene .dlg.kpsc>#mb.kpmbw.kpmbw{display:flex!important;flex-direction:column;overflow:hidden!important}
html body #modal #mb.kpmbw>.kpscroll{flex:1 1 0!important;min-height:0!important;overflow-y:auto!important;overscroll-behavior:contain;padding-bottom:6px}
html body #modal .dlg.kpsc>#mb.kpmbw.kpmbw>.kpscopts{position:static!important;flex:0 0 auto!important;height:auto!important;align-self:stretch;margin:0!important;padding:6px 0 8px;background:none;box-shadow:0 -1px 0 #e6d3ac}
`;document.head.appendChild(st)})();
/* her big portrait / standing figure on the card follow the pick */
/* review/newgame-ui: a pick changes only what shows HER face — the selected cell (gold ring + check, in place), the small portrait, the
   standing figure (low-res at once, crisp when decoded). No rebuild of the 32/52 cells, no game render() behind the full-screen card
   (closeModal / nlAccept render once when the card closes). Was: picker rebuilt twice + render() = 1.2–3 s per tap on a tablet. */
function fpSel(k){const r=document.querySelector("#modal .kpick[data-pick=face]");if(!r)return;r.querySelectorAll(".kpki").forEach(b=>{const on=b.dataset.pk===k;if(b.classList.contains("on")!==on){b.classList.toggle("on",on);b.classList.toggle("ksel",on);b.setAttribute("aria-checked",on);b.tabIndex=on?0:-1}})}
function fpRefresh(){try{const m=Q[0];if(!(m&&m.nl))return;m.faces=[[pMe(),S.name]];const sj=document.querySelector("#modal .kpid .kpsubj");if(sj)sj.innerHTML=pframe(pMe());
  fpSel(S.pid);if(typeof kpIdFig==="function")kpIdFig($("modal"))}catch(e){console.error(e)}}
function fpPick(k){if(!fpOn())return;fpSel(k);if(!(FP88()?faceChoose(k):fpSet(k)))return;window.__fpDirty=1;fpRefresh()}
/* the one list is warmed in idle time: its thumbnails fetched + decoded before she scrolls to them */
function fpWarm(){try{if(!FP88()||!fpOn())return;const L=fpItems();
 L.forEach(x=>{const s=x.face&&x.face.src;if(s&&!FP_PF[s]){const im=new Image();im.decoding="async";im.src=s;FP_PF[s]=im;im.decode&&im.decode().catch(()=>0)}})}catch(e){}}
/* the crisp figure starts loading on touch-down, ~100 ms before the tap ends */
document.addEventListener("pointerdown",e=>{try{const b=e.target.closest&&e.target.closest('#modal .kpick[data-pick=face] .kpki');if(!b)return;const x=fpItems().find(i=>i.k===b.dataset.pk);if(x&&x.fig&&!FP_PF[x.fig]){const im=new Image();im.src=x.fig;FP_PF[x.fig]=im}}catch(x){}},true);
/* layout only (the look is the kit picker's): the scene panel keeps buttons visible, the picker takes the room that is left */
(function(){const st=document.createElement("style");st.id="kit86";st.textContent=`
.modal.kpscene .dlg.kpsc.kfpon{display:flex;flex-direction:column;overflow:hidden}
.dlg.kpsc.kfpon>.kph,.dlg.kpsc.kfpon>#mr{flex:none}
.dlg.kpsc.kfpon>#mb{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.dlg.kpsc.kfpon>#mb>*{flex:none}`;document.head.appendChild(st)})();
/* review/newgame-ui: while the identity card covers the whole screen, a game render() (the 250 ms "portrait loaded → render" of j-por, other
   timers) rebuilt the hidden HUD + stage — 235 nodes, 58 picture loads, ~0.3–0.6 s on a tablet — right after every face pick. It waits:
   the card's close (closeModal / nlAccept) renders once. */
(function(){if(typeof render!=="function")return;const r0=render;render=function(){try{const m=Q&&Q[0];const M=$("modal");if(m&&m.nl&&NLP&&M&&!M.hidden&&M.classList.contains("kpscene")){window.__fpDirty=1;return}}catch(e){}return r0.apply(this,arguments)}})();
