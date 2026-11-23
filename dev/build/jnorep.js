/* ================= jnorep: ONE shared cross-life NO-REPEAT memory (ORDER THIN P0, owner OD 23/11 ~22:50Z; EVCAT §3) =================
   Generalises j68's 'ctm-e68h'. One store in localStorage 'ctm-nr' = {v:1, cur:<life id>, L:[[keys of this life], [previous life], ...]}.
   A key is "family:seed" (j68:<tpl>:<variant>, j7:<seed>, mg:<kind>:<item>, mgskin:<kind>:<skin>, j70:/j71:/j72: as before).
   BAL.nr: lives = how many lives are kept (this one + lives-1 past ones), w = weight factor per past life that saw a key, cap = keys kept per life.
   Life id = S.nrl (personal: not a co-op world key, never synced; each seat's phone keeps its own store). Old saves: S.e68.lid is adopted,
   and the old 'ctm-e68h' history is copied once into 'ctm-nr' (j68 keys get the "j68:" family; j70/j71/j72 and scheduler p:/t: keys kept).
   API (names published in dev/handover/reports/thin.md «## API»):
   nrSeen(fam,seed,pre) -> how many PAST lives saw fam:seed (pre=true: also any fam:seed:* key)      nrNow(fam,seed) -> seen this life?
   nrW(fam,seed,pre) -> BAL.nr.w ** nrSeen                                                         nrMark(fam,seed) -> mark for this life
   nrPick(fam,list,idf,wf) -> weighted pick (wf(x) × nrW), no mark                                 nrDraw(...) -> nrPick + nrMark
   nrFresh(fam,list,idf) -> the items no past life saw (or the whole list when none is fresh)       nrLife() -> this life's id
   Raw-key forms for callers that build their own key: nrSeenK(key,pre), nrMarkK(key). */
const NR_KEY="ctm-nr",NR_OLD="ctm-e68h";
let NR_C=null;   /* in-memory copy of the store (+ Sets per life); dropped when another tab writes */
try{window.addEventListener("storage",ev=>{if(!ev||ev.key===NR_KEY||ev.key==null)NR_C=null})}catch(e){}
function nrCfg(){const b=(typeof BAL==="object"&&BAL&&BAL.nr)||{};return{lives:b.lives||6,w:b.w==null?.5:b.w,cap:b.cap||1500}}
/* one-time copy of the j68 history: same lives, same order, same current life */
function nrMigrate(){let O={};try{O=JSON.parse(localStorage.getItem(NR_OLD)||"{}")||{}}catch(e){O={}}
 const fam=k=>{const t=String(k).split(":")[0];return /^(j\d+|p|t)$/.test(t)?k:"j68:"+k};
 return{v:1,cur:O.cur||null,L:(Array.isArray(O.L)?O.L:[]).map(l=>Array.isArray(l)?l.map(fam):[])}}
function nrStore(){if(NR_C)return NR_C;let H=null;try{H=JSON.parse(localStorage.getItem(NR_KEY)||"null")}catch(e){H=null}
 if(!H||!Array.isArray(H.L)){H=nrMigrate();try{localStorage.setItem(NR_KEY,JSON.stringify(H))}catch(e){}}
 NR_C={H,sets:H.L.map(l=>new Set(l))};return NR_C}
function nrSave(){const C=NR_C;if(!C)return;try{localStorage.setItem(NR_KEY,JSON.stringify(C.H))}catch(e){}}
/* start a new life in the store (the old j68 rule: a new empty list in front, keep `lives` lists) */
function nrRotate(id){const C=nrStore(),n=nrCfg().lives;C.H.L=[[]].concat(C.H.L).slice(0,n);C.sets=[new Set()].concat(C.sets).slice(0,n);C.H.cur=id;nrSave()}
function nrLife(){if(typeof S==="undefined"||!S)return null;
 if(!S.nrl){S.nrl=(S.e68&&S.e68.lid)||(Date.now().toString(36)+Math.floor(Math.random()*1000))}
 const C=nrStore();if(C.H.cur!==S.nrl)nrRotate(S.nrl);return S.nrl}
function nrK(fam,seed){return seed==null||seed===""?String(fam):fam+":"+seed}
function nrMarkK(key){if(!nrLife())return;const C=nrStore();key=String(key);if(!C.H.L.length){C.H.L=[[]];C.sets=[new Set()]}
 if(C.sets[0].has(key))return;C.H.L[0].push(key);C.sets[0].add(key);const cap=nrCfg().cap;
 if(C.H.L[0].length>cap){C.H.L[0]=C.H.L[0].slice(-cap);C.sets[0]=new Set(C.H.L[0])}nrSave()}
function nrSeenK(key,pre){const C=nrStore(),n=nrCfg().lives;key=String(key);let c=0;const P=key+":";
 for(let i=1;i<Math.min(n,C.H.L.length);i++){if(C.sets[i].has(key)){c++;continue}if(pre&&C.H.L[i].some(k=>k.indexOf(P)===0))c++}return c}
function nrSeen(fam,seed,pre){return nrSeenK(nrK(fam,seed),pre)}
function nrNow(fam,seed){if(!nrLife())return false;const C=nrStore();return !!(C.sets[0]&&C.sets[0].has(nrK(fam,seed)))}
function nrW(fam,seed,pre){return Math.pow(nrCfg().w,nrSeen(fam,seed,pre))}
function nrMark(fam,seed){nrMarkK(nrK(fam,seed))}
function nrPick(fam,list,idf,wf){list=list||[];if(!list.length)return null;idf=idf||(x=>x);let T=0;const W=list.map(x=>{const w=Math.max(0,(wf?wf(x):1))*nrW(fam,idf(x));T+=w;return w});
 if(!(T>0))return list[Math.floor(Math.random()*list.length)];let r=Math.random()*T;for(let i=0;i<list.length;i++){r-=W[i];if(r<0)return list[i]}return list[list.length-1]}
function nrDraw(fam,list,idf,wf){const x=nrPick(fam,list,idf,wf);if(x!=null)nrMark(fam,(idf||(y=>y))(x));return x}
function nrFresh(fam,list,idf){idf=idf||(x=>x);const f=(list||[]).filter(x=>!nrSeen(fam,idf(x)));return f.length?f:(list||[])}
