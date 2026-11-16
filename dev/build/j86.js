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
function fpPor(k){const L=(FIGIX.consort||{})[k];if(!L||!L.length)return"";const f=figBest(L,figTierOf(S),figAgeOf(S));return f&&f.por?figPath(f.por):""}
function fpFace(k){const f=Object.assign({},pMe());f.src=fpPor(k);f.rw="";return f}
function fpNum(k){return +String(k).replace(/\D/g,"")||0}
/* the picker = the kit PORTRAIT PICKER (j79 kitPicker); the 84-face pool (facePool(filter), review/face-84) when present, else the 32 consort faces */
/* j88 (review/face-84) API when present: faceOn() · facePool(filter) -> [{id, src, n, por, fig, mine}] · faceChoose(id) */
const FP88=()=>typeof facePool==="function"&&typeof faceChoose==="function";
window.__fpF=window.__fpF||(String((typeof S!=="undefined"&&S&&S.pid)||"").startsWith("maid:")?"maid":"consort");
function fpItems(){let L=null;try{if(FP88()){L=(facePool(window.__fpF)||[]).map(x=>{const f=Object.assign({},pMe());f.src=x.por||"";f.rw="";return{k:x.id,face:f,label:`${x.src==="maid"?"Dung mạo cung nữ":"Dung mạo"} ${x.n}`}})}}catch(e){L=null}
 return L&&L.length?L:fpKeys().map(k=>({k,face:fpFace(k),label:`Dung mạo ${fpNum(k)}`}))}
function fpHTML(){return kitPicker({id:"face",title:"Dung mạo · chạm để chọn",items:fpItems(),cur:S.pid,rows:2,
  filters:FP88()?[["consort",`Phi tần ${facePool("consort").length}`],["maid",`Cung nữ ${facePool("maid").length}`]]:null,filter:window.__fpF,
  note:"Dung mạo chỉ để nhìn, không đổi tư chất.",onPick:fpPick,onFilter:f=>{window.__fpF=f;fpRedraw()}})}
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
/* the card: picker section after the stat tiles (before the note line) */
(function(){const b0=kpBuild;kpBuild=function(M,m){b0.apply(this,arguments);try{const dlg=M.querySelector(".dlg");if(dlg)dlg.classList.remove("kfpon");
  if(!(m&&m.nl&&fpOn()))return;const mb=$("mb");const kid=mb.querySelector(".kpid");if(!kid)return;
  const anchor=mb.querySelector(":scope > .kpnote")||mb.querySelector(":scope > .kpopts");const w=document.createElement("div");w.innerHTML=fpHTML();const sec=w.firstElementChild;
  if(anchor)mb.insertBefore(sec,anchor);else mb.appendChild(sec);dlg.classList.add("kfpon");
  requestAnimationFrame(()=>kitPickerLayout(sec,false));
 }catch(e){console.error("fpick",e)}}})();
/* her big portrait / standing figure on the card follow the pick */
function fpRefresh(){try{const m=Q[0];if(!(m&&m.nl))return;m.faces=[[pMe(),S.name]];const sj=document.querySelector("#modal .kpid .kpsubj");if(sj)sj.innerHTML=pframe(pMe());
  fpRedraw();if(typeof kpIdFig==="function")kpIdFig($("modal"))}catch(e){console.error(e)}}
function fpPick(k){if(!fpOn())return;if(!(FP88()?faceChoose(k):fpSet(k)))return;const src=figFor(S,"por");
 if(src&&PORK[src]!==1){const im=new Image();im.onload=()=>{PORK[src]=1;if(S.pid===k)fpRefresh()};im.onerror=()=>{PORK[src]=0};im.src=src}
 fpRefresh();try{if(typeof render==="function")render()}catch(e){}}
/* layout only (the look is the kit picker's): the scene panel keeps buttons visible, the picker takes the room that is left */
(function(){const st=document.createElement("style");st.id="kit86";st.textContent=`
.modal.kpscene .dlg.kpsc.kfpon{display:flex;flex-direction:column;overflow:hidden}
.dlg.kpsc.kfpon>.kph,.dlg.kpsc.kfpon>#mr{flex:none}
.dlg.kpsc.kfpon>#mb{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.dlg.kpsc.kfpon>#mb>*{flex:none}`;document.head.appendChild(st)})();
