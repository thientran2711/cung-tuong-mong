
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
const OW69={nc:6,bd:7,thd:9,cn:13,dtq:17,muoi:17,ch:13,td:9,tt:8,cnv:8};
/* measured difficulty tier: 2 = very hard (+20 Phúc duyên), 1 = hard (+10) */
const OHARD69={cnv:2,tt:1,td:1};
const OBON69=[0,10,20];
/* noBd: a life pre-rolled before bd existed (ow=1) keeps the origin it had (same table order without bd); new rolls are ow=2 (D18) */
function ow69Pick(seed,noBd){const r=nlRng((seed^0x9e3779b9)>>>0)();const L=ORIGINS.filter(o=>OW69[o.k]>0&&!(noBd&&o.k==="bd"));const tot=L.reduce((a,o)=>a+OW69[o.k],0);
 let x=r*tot;for(const o of L){x-=OW69[o.k];if(x<0)return o.k}return L[L.length-1].k}
function ow69Rare(k){const w=OW69[k]||0;return w<=6?"Rất hiếm":w<=9?"Hiếm":"Thường gặp"}
if(typeof nlRun==="function")(function(){const r0=nlRun;nlRun=function(d){
 if(!d||window.__forceOrigin)return r0.apply(this,arguments);
 if(!d.ow&&!d.faces){d.ow=2;try{const c=store.get(NL_KEY);if(c&&c.seed===d.seed){c.ow=2;store.set(NL_KEY,c)}}catch(e){}}
 if(!d.ow)return r0.apply(this,arguments);
 window.__forceOrigin=ow69Pick(d.seed,d.ow===1);try{return r0.apply(this,arguments)}finally{window.__forceOrigin=undefined}}})();
/* identity card: how rare this origin is (kit chip). The j79 scene panel rebuilds the card (kpIdentity); older builds use nlCardHTML. */
if(typeof kpIdentity==="function"&&typeof kitChips==="function")(function(){const k0=kpIdentity;kpIdentity=function(M,m){const r=k0.apply(this,arguments);
 try{const k=S&&S.origin&&S.origin.k;const box=M.querySelector(".kpidn");if(k&&OW69[k]&&box&&!box.querySelector(".ow69")){const d=document.createElement("span");d.className="ow69";
  d.innerHTML=kitChips([kitChip(`Thân phận ${ow69Rare(k).toLowerCase()}`,"n")]);box.appendChild(d)}}catch(e){console.error(e)}return r}})();
else if(typeof nlCardHTML==="function")(function(){const c0=nlCardHTML;nlCardHTML=function(){const h=c0.apply(this,arguments);
 try{const k=S&&S.origin&&S.origin.k;if(!k||!OW69[k])return h;const c=`<div class="chips ow69">${chip(`Thân phận ${ow69Rare(k).toLowerCase()}`)}</div>`;
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
