/* ================= jdiff: ĐỘ KHÓ KIẾP NÀY · Dễ / Vừa / Khó (owner 11/14 21:30Z) =================
   Chosen on the identity card ("Thân phận kiếp này", while NLP is set), stored per life in S.diff ("de" | "vua" | "kho"),
   fixed after "Nhận thân phận" (no control anywhere else). Old saves and lives without S.diff = Vừa.
   Vừa = the balance as shipped (jbal/jbal2 values are left exactly as they are; nothing is changed while S.diff is Vừa).
   Dễ / Khó scale the SAME knobs for everyone (two-way rule: a knob that is a world rule — childbirth, illness, poison,
   spotting poison, the cooldown between charges, the Hoàng hậu seat gate, the scheme motive — changes for her and for every
   NPC alike). The only her-side knobs: BAL.hz (how hard the palace aims at her, = NPC aggression toward her), her starting
   bạc, and the Phúc duyên she earns (Khó ×1.5).
   Knob table DIFF[k].bal: name -> [multiplier, add]  (value = base × m + a, rounded like the base where it is a whole number). */
const DIFF_KEY="ctm-diff";
const DIFF={
 de:{n:"Dễ",d:"Hậu cung ôn hòa, ít kẻ ra tay; vào cung bạc dày hơn.",
  bal:{hz:[.55,0],birthAdd:[1,-2],birthMin:[1,-3],illDie:[.5,0],seeMaxP:[1,15],poisonX:[.67,0],poisonNow:[0,0],accCdT:[1.5,0],hhTh:[1,-10],outQ:[1,-20]},j70:{mot:[.6,0]},bac:1.5,pd:1},
 vua:{n:"Vừa",d:"Hậu cung như vốn có, phúc họa chia đều.",bal:{},j70:{},bac:1,pd:1},
 kho:{n:"Khó",d:"Hậu cung hiểm ác, sinh nở hiểm nghèo; Phúc duyên gấp rưỡi.",
  bal:{hz:[1.1,0],birthAdd:[1,3],birthMin:[1,4],illDie:[1.5,0],illAdd:[2,0],poisonX:[1.2,0],accCdT:[.67,0],hhTh:[1,10],outQ:[1,25]},j70:{mot:[1.2,0]},bac:.7,pd:1.5}};
const DIFF_K=["de","vua","kho"];
function diffOf(s){s=s||(typeof S!=="undefined"?S:null);const k=s&&s.diff;return DIFF[k]?k:"vua"}
function diffName(s){return DIFF[diffOf(s)].n}
function diffPref(){if(window.__diffO&&DIFF[window.__diffO])return window.__diffO;try{const k=localStorage.getItem(DIFF_KEY);if(DIFF[k])return k}catch(e){}return "vua"}
/* BAL.poisonNow (jbal2, review/balance v12): a poison that takes her Sức to 0 kills her at once, as it does an NPC. On in Vừa;
   Dễ turns it off (a landed poison hurts but does not kill her outright: the old softer rule), Khó keeps it. */
/* the knobs: base = the values in force when the game last left Vừa (so Vừa is never touched and a later balance pass is followed) */
let DIFF_CUR="vua",DIFF_B=null;
function diffApply(){const k=diffOf();if(k===DIFF_CUR)return;
 const J=typeof J70CFG==="object"?J70CFG:null;
 if(DIFF_CUR==="vua"){DIFF_B={bal:Object.assign({},BAL),j70:J?Object.assign({},J):{}}}
 const B=DIFF_B||{bal:Object.assign({},BAL),j70:J?Object.assign({},J):{}};
 Object.assign(BAL,B.bal);if(J)Object.assign(J,B.j70);
 const P=DIFF[k];const put=(T,base,tab)=>{for(const n in tab){const b=base[n];if(typeof b!=="number")continue;const [m,a]=tab[n];let v=b*m+a;v=Number.isInteger(b)?Math.round(v):Math.round(v*100)/100;T[n]=Math.max(0,v)}};
 put(BAL,B.bal,P.bal);if(J)put(J,B.j70,P.j70);DIFF_CUR=k}
/* her starting bạc follows the choice while the card is open */
function diffBac(){if(!S)return;if(S.bac0==null)S.bac0=S.bac;S.bac=Math.max(0,Math.round(S.bac0*DIFF[diffOf()].bac))}
/* a rolled life: the preferred difficulty (last choice, or the bot's window.__diffO) */
if(typeof nlRun==="function")(function(){const r0=nlRun;nlRun=function(){const r=r0.apply(this,arguments);try{if(S){S.diff=diffPref();S.bac0=S.bac;diffBac();diffApply()}}catch(e){console.error(e)}return r}})();
function diffSet(k){if(!DIFF[k]||!S||typeof NLP==="undefined"||!NLP||window.__diffO)return;if(S.diff===k)return;S.diff=k;try{localStorage.setItem(DIFF_KEY,k)}catch(e){}diffBac();diffApply();try{nlCard()}catch(e){console.error(e)}}
/* every way into a life (load, new life, render, week end) keeps the knobs on this life's difficulty */
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{diffApply()}catch(e){}return r}})();
(function(){const r0=render;render=function(){try{if(S)diffApply()}catch(e){}return r0.apply(this,arguments)}})();
(function(){const e0=endTurn;endTurn=function(){try{if(S)diffApply()}catch(e){}return e0.apply(this,arguments)}})();
/* identity card: the choice (kit segmented control .ksub, the same as the picker filters) + a one-line description.
   No extra chip on this card: the control already shows the choice (one fact, one place). Her own card in the game carries the chip. */
function diffHTML(){const k=diffOf();const lock=!!window.__diffO;
 return `<div class="kpsec kdiff"><h4 class="kpst">${typeof kitGloss==="function"?kitGloss("Độ khó"):"Độ khó"}</h4><nav class="ksub" role="tablist" aria-label="Độ khó kiếp này">${DIFF_K.map(x=>`<button type="button" class="ksubb${x===k?" on":""}" data-diff="${x}" role="tab" aria-selected="${x===k}"${lock?" disabled":""}>${DIFF[x].n}</button>`).join("")}</nav><div class="kpnote">${DIFF[k].d}</div></div>`}
(function(){if(typeof kpBuild!=="function")return;const b0=kpBuild;kpBuild=function(M,m){b0.apply(this,arguments);try{if(!(m&&m.nl)||!S||typeof NLP==="undefined"||!NLP)return;const mb=$("mb");if(!mb||mb.querySelector(".kdiff"))return;
  const w=document.createElement("div");w.innerHTML=diffHTML();const sec=w.firstElementChild;
  /* inside the choice block, right above "Nhận thân phận" (that block stays on screen while the body scrolls) */
  const opts=mb.querySelector(":scope > .kpopts")||mb.querySelector(".nlopts");if(opts)opts.insertBefore(sec,opts.firstChild);else mb.appendChild(sec);
 }catch(e){console.error("jdiff card",e)}}})();
/* older card (no kit scene panel): the same choice inside nlCardHTML */
if(typeof kpBuild!=="function"&&typeof nlCardHTML==="function")(function(){const c0=nlCardHTML;nlCardHTML=function(){const h=c0.apply(this,arguments);try{return h.replace(/(<div class="opts nlopts">)/,diffHTML()+"$1")}catch(e){return h}}})();
$("modal").addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button[data-diff]");if(!b)return;e.preventDefault();e.stopPropagation();if(!b.disabled)diffSet(b.dataset.diff)},true);
/* Phúc duyên: Khó earns ×1.5 (every milestone, and the ending bonuses at death) */
if(typeof pdAdd==="function")(function(){const a0=pdAdd;pdAdd=function(n,why,k){const m=DIFF[diffOf()].pd;if(n&&m!==1){n=Math.round(n*m);if(window.__dOv)window.__dOv.a+=n}else if(n&&window.__dOv)window.__dOv.a+=n;return a0.call(this,n,why,k)}})();
(function(){const o0=over;over=function(h,t,fate){if(!S||S.dead)return o0.apply(this,arguments);const L0=S.pdLife||0;const m=DIFF[diffOf()].pd;window.__dOv={a:0};let r;
 try{r=o0.apply(this,arguments)}finally{const a=window.__dOv?window.__dOv.a:0;window.__dOv=null;
  try{const end=(S.pdLife||0)-L0-a;const ex=m!==1&&end>0?Math.round(end*(m-1)):0;const M=Q.find(x=>x&&x.cls==="end");
   if(ex){pdSet(pdGet()+ex);S.pdLife=(S.pdLife||0)+ex;log(`<span class="pdl">+${ex} Phúc duyên: kiếp ${DIFF[diffOf()].n.toLowerCase()}.</span>`)}
   if(M&&!M.dfx){M.dfx=1;M.h=M.h.replace(/(<div class="pcrow"><span>Thân phận<\/span><b>[\s\S]*?<\/b><\/div>)/,`$1<div class="pcrow"><span>Độ khó</span><b>${diffName()}</b></div>`);
    if(ex)M.h=M.h.replace(/(<p class="pdend">Kiếp này được <b class="g">)\+\d+( Phúc duyên<\/b> \(kết cục [^)]*)\)( · Tổng: <b>)\d+(<\/b>)/,(_,p1,p2,p3,p4)=>`${p1}+${S.pdLife}${p2}; kiếp ${diffName().toLowerCase()}: +${ex})${p3}${pdGet()}${p4}`);
    if(Q[0]===M)showModal()}}catch(e){console.error(e)}}
 return r}})();
/* her own card in the game (showSelf / any pcard of hers): chip "Kiếp này: Khó" */
(function(){if(typeof pcard!=="function")return;const p0=pcard;pcard=function(o){try{if(S&&o&&!(typeof NLP!=="undefined"&&NLP)&&String(o.name||"").replace(/<[^>]*>/g,"").trim()===S.name){const c=typeof kitChip==="function"?kitChip(`Kiếp này: ${diffName()}`,"n"):chip(`Kiếp này: ${diffName()}`);o=Object.assign({},o,{chips:(o.chips||[]).concat([c])})}}catch(e){}return p0.apply(this,arguments)}})();
/* Sổ luân hồi: each life's line says its difficulty; the in-game Sổ luân hồi line says this life's */
if(typeof lifeSave==="function")(function(){const l0=lifeSave;lifeSave=function(f){const r=l0.apply(this,arguments);try{const p=lifeLog();if(p[0]&&S&&p[0].n===S.name&&!p[0].dif){p[0].dif=diffOf();p[0].f=(p[0].f||"")+` · Kiếp này: ${diffName()}`;store.set("cung-luanhoi",p)}}catch(e){}return r}})();
if(typeof pastHTML==="function")(function(){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{if(S&&!S.dead&&(typeof NLP==="undefined"||!NLP))return h.replace(/(<p class="past pdpast">)/,`$1Kiếp này: <b>${diffName()}</b> · `)}catch(e){}return h}})();
try{if(typeof KIT_GLOSS==="object")KIT_GLOSS["Độ khó"]="Chọn trước khi nhận thân phận; đã nhận thì giữ suốt kiếp, không đổi được. Dễ: hậu cung ôn hòa, ít kẻ ra tay, bạc vào cung dày hơn. Vừa: như vốn có. Khó: hậu cung hiểm ác, sinh nở và bệnh tật hiểm nghèo hơn, bạc mỏng; Phúc duyên gấp rưỡi."}catch(e){}
(function(){const st=document.createElement("style");st.id="jdiff-css";st.textContent=`.kpopts:has(>.kdiff){grid-auto-rows:auto!important}.kpopts>.kdiff{margin:0 0 2px}.kdiff{grid-column:1/-1;width:100%;box-sizing:border-box;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:4px 10px}.kdiff>.kpst{margin:0;border:0;padding:0}.kdiff .ksub{position:static;margin:0}.kdiff>.kpnote{grid-column:1/-1;margin:0}`;document.head.appendChild(st)})();
try{if(S)diffApply()}catch(e){}
