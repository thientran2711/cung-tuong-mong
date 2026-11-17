
/* ================= j69: THÂN PHẬN KHÔNG ĐỀU (owner approved 11/14) =================
   The starting origin is no longer a uniform pick: rare at both extremes (easiest, hardest), common in the middle.
   Weights were set from a bot measurement (sensible bot, n>=30 per origin; see the commit / report).
   The weighted pick rides on the j52 pre-rolled life: the origin is a pure function of the stored seed
   (its own derived stream), handed to start() through window.__forceOrigin, so a reload, another slot or
   "Kiếp mới" realise the same origin and "Đổi thân phận" (a new seed) rolls with the same weights.
   A life rolled and shown before this module existed (ctm-nextlife with faces but no "ow" mark) keeps its old uniform pick.
   Hard origins get a Phúc duyên bonus at the end of the life (hard +10, very hard +20), shown on the end-card line.
   UI: only a small honest rarity chip on the identity card. */
/* measured 11/14 (sensible bot, 30-43 lives each; HH reach % / early death %): nc 54/34 (easiest by far), thd 33/49, cn 33/53,
   dtq 31/51, muoi 22/46, ch 20/42, td 23/54, tt 20/57, cnv 0 (never left service; the bot's servant road ends in Xuất cung/ban gả).
   Ordered easiest -> hardest, the approved shape (rare at both ends, common in the middle) gives: */
/* ONE CORE: the weights live in BAL.orig.ow (hòa thân nc = the whole hòa thân slot; its country branches split it, BAL.orig.br) */
const OW69=BAL.orig.ow;
/* measured difficulty tier: 2 = very hard (+20 Phúc duyên), 1 = hard (+10) */
const OHARD69={cnv:2,tt:1,td:1};
const OBON69=[0,10,20];
/* ow = how the pre-rolled life was marked: 1 = rolled before bd existed (old table, no bd), 2 = rolled while bd was a separate card (frozen
   BAL.orig.ow2 table, bd after nc): both keep the origin they were shown. 3 = now: one card per origin (BAL.orig.ow), then the country branch
   of that origin from its own derived stream (BAL.orig.br, j1 originBrPick) -> may return a branch key ("bd"). */
function ow69Pick(seed,ow){if(ow===true)ow=1;const r=nlRng((seed^0x9e3779b9)>>>0)();
 if(ow===1||ow===2){const W=BAL.orig.ow2,L=[];ORIGINS.forEach(o=>{L.push(o.k);if(o.k==="nc"&&ow===2)L.push("bd")});const K=L.filter(k=>W[k]>0);
  const tot=K.reduce((a,k)=>a+W[k],0);let x=r*tot;for(const k of K){x-=W[k];if(x<0)return k}return K[K.length-1]}
 const L=ORIGINS.filter(o=>OW69[o.k]>0);const tot=L.reduce((a,o)=>a+OW69[o.k],0);
 let x=r*tot,k=L[L.length-1].k;for(const o of L){x-=OW69[o.k];if(x<0){k=o.k;break}}
 return originBrPick(k,nlRng((seed^0x5bd1e995)>>>0)())}
function ow69Rare(k){const w=OW69[originRoot(k)]||0;/* a country branch shows its origin's rarity (one card) */return w<=6?"Rất hiếm":w<=9?"Hiếm":"Thường gặp"}
if(typeof nlRun==="function")(function(){const r0=nlRun;nlRun=function(d){
 if(!d||window.__forceOrigin)return r0.apply(this,arguments);
 if(!d.ow&&!d.faces){d.ow=3;try{const c=store.get(NL_KEY);if(c&&c.seed===d.seed){c.ow=3;store.set(NL_KEY,c)}}catch(e){}}
 if(!d.ow)return r0.apply(this,arguments);
 window.__forceOrigin=ow69Pick(d.seed,d.ow);try{return r0.apply(this,arguments)}finally{window.__forceOrigin=undefined}}})();
/* identity card: how rare this origin is (kit chip). The j79 scene panel rebuilds the card (kpIdentity); older builds use nlCardHTML. */
if(typeof kpIdentity==="function"&&typeof kitChips==="function")(function(){const k0=kpIdentity;kpIdentity=function(M,m){const r=k0.apply(this,arguments);
 try{const k=S&&S.origin&&S.origin.k;const box=M.querySelector(".kpidn");if(k&&OW69[originRoot(k)]&&box&&!box.querySelector(".ow69")){const d=document.createElement("span");d.className="ow69";
  d.innerHTML=kitChips([kitChip(`Thân phận ${ow69Rare(k).toLowerCase()}`,"n")]);box.appendChild(d)}}catch(e){console.error(e)}return r}})();
else if(typeof nlCardHTML==="function")(function(){const c0=nlCardHTML;nlCardHTML=function(){const h=c0.apply(this,arguments);
 try{const k=S&&S.origin&&S.origin.k;if(!k||!OW69[originRoot(k)])return h;const c=`<div class="chips ow69">${chip(`Thân phận ${ow69Rare(k).toLowerCase()}`)}</div>`;
  return h.replace(/(<div class="pcb rows">|<span class="kb kpkb">)/,c+"$1")}catch(e){return h}}})();
/* end of life: compensation for hard origins */
if(typeof pdGet==="function")(function(){const o0=over;over=function(h,t,fate){const was=!S||S.dead;const r=o0.apply(this,arguments);
 try{if(was)return r;const m=Q.find(x=>x&&x.cls==="end"&&x.pd);const k=S.origin&&S.origin.k;const tier=OHARD69[k]||0;const b=OBON69[tier];
  if(m&&b&&!m.pd69){m.pd69=1;pdSet(pdGet()+b);S.pdLife=(S.pdLife||0)+b;
   log(`<span class="pdl">+${b} Phúc duyên: thân phận ${tier>1?"rất khó":"khó"} (${S.origin.n}).</span>`);
   m.h=m.h.replace(/(<p class="pdend">Kiếp này được <b class="g">)\+\d+( Phúc duyên<\/b> \(kết cục [^)]*: \+\d+)\)( · Tổng: <b>)\d+(<\/b>)/,
    (_,a,c,d,e)=>`${a}+${S.pdLife}${c}; thân phận ${tier>1?"rất khó":"khó"}: +${b})${d}${pdGet()}${e}`);
   if(Q[0]===m)showModal()}}catch(e){console.error(e)}
 return r}})();
