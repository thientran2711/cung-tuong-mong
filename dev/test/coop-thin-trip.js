/* GUEST TRIPWIRE (thin guest progress meter; review/coop-thin-a, audit coop-thin-guest §3 "Progress meter").
   An init script for the GUEST page only (Playwright addInitScript: dev/test/coop-bot.js with TRIP=1). Once the guest's co-op world is on,
   S, rivals and everything under them (world keys of S included) are wrapped in deep Proxies; every write (set / delete / define) made
   while NOT inside jcoopworld fromCanon (COOPW.inFC) is counted with the name of the function that made it (first stack frame outside this
   file) and where it landed: W.<key> (a WORLD key of S), S.<key> (her own person), R.<key> (an NPC / the friend entry), Rarr (the list).
   Only writes that CHANGE a value count (total); raw = every write incl. same-value re-assignments. Thin guest = 0. window.__trip() → {total, raw, byRoot, top:[[fn, root, n]], sReplaced, rReplaced}.
   Limits (reported): a write to an object made by the code itself and written through its own local reference before it is reached
   through S/rivals is not seen; identity: Array indexOf/includes/lastIndexOf and Set/Map keys see through the Proxies. */
(function(){
/* review r1: PER PART. Every write is also given the migration part that owns it (audit §3), from the OUTERMOST engine entry on the stack
   (the call the UI / socket made): life B · world C · dialogs D · buổi + night E · her acts F1–F5 · week end + her month G · sync layer C/H.
   endTurn / nextBuoi split by root: W.* / R.* / Rarr → C (world loops), S.* → G (week end) / E (buổi). No entry found → "?" (F6: the tripwire names it). */
try{Error.stackTraceLimit=Math.max(Error.stackTraceLimit||10,120)}catch(e){}
const ENTRY=[[/^(start|nlRun|nlBegin|nlReroll)$/,"B"],[/^(chooseM|onAct|onRes|famApply|petApply|showRes)$/,"D"],[/^(gSync|pApply)$/,"D·patch"],/* part D: the host's results copied onto her person (until G) */
 [/^(flip|resolveTonight|nightScene|rivalsBuoi)$/,"E"],[/^(runAct|act|cardH|talk|directActs)$/,"F1"],[/^(goTo|placeGo|enterPlace)$/,"F2"],
 [/^(buy|useItem|wear|sell|gift|sellItem|econSellUI|taintItem|itemTest|invAct|wkSell|wkShow|wkGive|wkPoison|wdWear|wdTakeOff|wd[A-Z]\w*UI|vl[A-Z]\w*UI|kitShopBuy|vlBuyNvp|vlBuyOut|vlAsk|giveTo|plantHereGo|tsGiftBacGo|tsGiftPieceGo|courtGive|tdGiftGo)$/,"F3"],[/^(petDo|petcMaid|petcQuick|shelfPlantQuick|rcpRead|rcpAskGo|tdsRun)$/,"F4"]/* the engines F3 moves; the UI routers (itemAct, toilAct, kitShop clicks) stay on her phone and their render writers stay in "?" (F6) */,[/^(petcGain|shelfPlantGain|wkLessonEnd|artLessonGain|wkFinishLesson|tdFinish|tsSummonEnd|tsDenEnd|aaPayMG)$/,"F5"],[/^(exEnd|kcPhucEnd|kc2ExamEnd|kc2SelEnd|vlCraftEnd|wdGroomEnd|toilFinish|stealEnd|tsDressEnd)$/,"F6b"],[/^(tsDressGo|tsDressGame|tsMkSit|exRun|exStart|exSrvStart|exGame|kcPhucPlay|kcPhucGame|kc2Exam|kc2ExamGame|kc2SelPlay|kc2SelGame|vlCraftRun|vlCraftGame|wdGroomUI|wdGroomShow|toilFinShow|toilOpen|toilGo|stealGame|herGame)$/,"F6b·game"]/* F6b: the END engines (the asserted bucket) vs the game on her phone (law 5: it plays there with solo parameters; its render / preview writers, e.g. jtoil's leAttire probe that nulls and puts back S.toilette, are reported, not asserted, as F5's UI routers stay in "?") *//* F6b: the remaining game ends (and their starts / openers) *//* F5 moves these mini-game ends (contests / kitGameResult = F6 / D) */,[/^(startContest|kitGameResult|mgEnd)$/,"F6"],
 [/^(attach|sendMe|onBuoi|pullFriend|pushFriend|reshowQ|tryEnd)$/,"C/H"]];
function part(st,root){let hit=null,wkEnd=false;part.n="";for(const l of st){const m=l.trim().match(/^at (?:Object\.|Proxy\.|Array\.|window\.)?([^ (]+)/);const n=m?m[1]:"";if(!n)continue;
  if(n==="endTurn"||n==="monthTick"){wkEnd=true;hit=/^S\./.test(root)?"G":"C";part.n=n}else if(n==="nextBuoi"){hit=/^S\./.test(root)?"E":"C";part.n=n}else for(const [rx,pt] of ENTRY)if(rx.test(n)){hit=pt;part.n=n;break}}
 /* part E (review coop-thin-e): buổi tối's nextBuoi runs endTurn = her WEEK end (part G), not the buổi step */
 if(hit==="E"&&wkEnd)hit="G";
 /* review coop-thin-e #4: the night's go (COOPW.allowN: nextBuoi → S.buoi=0 → endTurn, then the after-step wrappers outside endTurn) = her WEEK end too (G) */
 if(hit==="E"&&window.COOPW&&COOPW.allowN){hit="G";part.n="nextBuoi·go"}
 return hit||"?"}
const RAW=new WeakMap(),PX=new WeakMap();const CNT=new Map(),QS=new Map()/* F6: "?" writes (no engine entry): a stack sample per writer, so each can be given its owner */;let total=0,raw=0,sRep=0,rRep=0,on=false,state=0;const byRoot={},byPart={},statePart={},PCNT=new Map(),ENTN={};
/* review r1: keys "__x" are private markers, not game state (jwdinv wdOf sets p.__wdmig=1 and deletes it in its finally = a re-entry guard,
   ~half of all counted writes; R.__b = the friend bridge baseline). `state` / `statePart` = the meter without them (the number to report). */
const priv=(root,key)=>/^__/.test(String(key))||/^[A-Za-z]+\.__/.test(root);
const unw=x=>(x&&typeof x==="object"&&RAW.has(x))?RAW.get(x):x;
/* F2 helper (coop-thin-g, trip1 «stall» = this meter, not the game): an array the code copied through a Proxy (KMSNAP.inv = S.inv.slice()) holds the
   PROXIES; comparing them with a raw item failed → jfx kmDiff saw every item as new on each render → one «Rương đồ / Vừa vào Tư trang» gift scene
   per render (KMQ ~2400 by week 34, the bot's «Nhận» never got to her card). The ELEMENTS are unwrapped too, and WeakSet keys (jfx kfSeen) see
   through the Proxies like Set / Map. Whole identity family: indexOf / includes / lastIndexOf · Set / Map / WeakSet. WeakMap is NOT patched: this
   meter's own RAW / PX maps are WeakMaps keyed by the Proxy (patching them recursed; jfx KFX.lt only tags a loss reason). */
for(const m of ["indexOf","includes","lastIndexOf"]){const f=Array.prototype[m],mp=Array.prototype.map;Array.prototype[m]=function(x,...a){const t=unw(this);return f.call(mp.call(t,unw),unw(x),...a)}}
for(const C of [Set,Map,WeakSet])for(const m of ["has","get","delete","add","set"]){const f=C.prototype[m];if(!f)continue;C.prototype[m]=function(k,...a){return f.call(this,unw(k),...a)}}
const plainP=o=>{const p=Object.getPrototypeOf(o);return p===Object.prototype||p===Array.prototype||p===null};
function who(st){st=st||(new Error().stack||"").split("\n").slice(2);for(const l of st){const m=l.trim().match(/^at (?:Object\.|Proxy\.|Array\.)?([^ (]+)/);const n=m?m[1]:"";
  if(!n||/^(__trip|set|deleteProperty|defineProperty|Reflect\.|new|eval|<anonymous>)/.test(n)||/coop-thin-trip|\(<anonymous>\)|\(native\)/.test(l))continue;
  return /^https?:/.test(n)?"anon@"+(n.match(/:(\d+):\d+$/)||[])[1]:n}return "(top)"}
/* only a write that CHANGES something counts (x.k = the same value is not a guest computation); `raw` counts every write */
function hit(meta,key,same){const C=window.COOPW;if(!on||(C&&C.inFC)||(C&&C.ctx))return;raw++;if(same)return;total++;
 const root=meta.r==="S"&&meta.t===undefined?(WK().includes(key)?"W."+key:"S."+key):meta.r==="S"?(WK().includes(meta.t)?"W."+meta.t:"S."+meta.t):meta.r==="R"?(meta.t===undefined?"Rarr":"R."+(meta.t2||key)):meta.r;
 const st=(new Error().stack||"").split("\n").slice(2);const w=who(st),pt=part(st,root);
 const k=w+"|"+root.replace(/\..*$/,m=>m.split(".").slice(0,2).join("."));CNT.set(k,(CNT.get(k)||0)+1);const rk=root.split(".")[0];byRoot[rk]=(byRoot[rk]||0)+1;
 byPart[pt]=(byPart[pt]||0)+1;if(pt==="?"&&!priv(root,key)){const qk=w+"|"+root.split(".").slice(0,2).join(".");const e=QS.get(qk)||{n:0,st:[]};e.n++;if(e.st.length<2){const fr=[];for(const l of st){const m=l.trim().match(/^at (?:Object\.|Proxy\.|Array\.|window\.)?([^ (]+)/);const nn=m?m[1]:"";if(nn&&!/coop-thin-trip|^(set|deleteProperty|defineProperty|Reflect|log|unshift|push|splice|apply|call|https?:)/.test(nn)&&fr[fr.length-1]!==nn)fr.push(nn);if(fr.length>=8)break}const j=fr.join("<");if(!e.st.includes(j))e.st.push(j)}QS.set(qk,e)}if(!priv(root,key)){const ek=pt+"|"+part.n;ENTN[ek]=(ENTN[ek]||0)+1}const pk=pt+"|"+k;PCNT.set(pk,(PCNT.get(pk)||0)+1);if(!priv(root,key)){state++;statePart[pt]=(statePart[pt]||0)+1}}
let WKc=null;const WK=()=>WKc||(WKc=(window.COOPW&&COOPW.X&&COOPW.X.W_KEYS)||[]);
/* part C (jcoopthinc): the guest's world is a LENS (writes never land: dropped or sent to the host as NPC ops). A lens object is not wrapped;
   what is written into it is counted apart (`lens`), never as state. The friend entry (the other player's person) is root F (parts D/F), not W. */
const LENS=Symbol.for("ctm.lens");let lensN=0;
function px(o,meta){if(!o||typeof o!=="object"||RAW.has(o))return o;try{if(o[LENS])return o}catch(e){}if(!plainP(o))return o;let p=PX.get(o);if(p)return p;
 p=new Proxy(o,{get(t,k,rc){const v=Reflect.get(t,k);if(!v||typeof v!=="object"||typeof k==="symbol")return v;
   const d=Reflect.getOwnPropertyDescriptor(t,k);if(d&&!d.configurable&&!d.writable)return v;
   let m;if(meta.r==="R"&&meta.t===undefined&&Array.isArray(t)&&v.coop)return px(v,{r:"F"});if(meta.r==="S")m=meta.t===undefined?{r:"S",t:k}:meta;else if(meta.r==="R")m=meta.t===undefined?{r:"R",t:k}:(meta.t2===undefined&&!Array.isArray(t)?{r:"R",t:meta.t,t2:k}:meta);else m=meta;
   return px(v,m)},
  set(t,k,v){const u=unw(v);if(meta.r==="S"&&meta.t===undefined){const d=Object.getOwnPropertyDescriptor(t,k);if(d&&d.set&&d.set.__lens){lensN++;return Reflect.set(t,k,u)}}const o=t[k];hit(meta,k,(k in t)&&(o===u||(o!==o&&u!==u)));return Reflect.set(t,k,u)},
  deleteProperty(t,k){hit(meta,k,!(k in t));return Reflect.deleteProperty(t,k)},
  defineProperty(t,k,d){if("value" in d)d.value=unw(d.value);hit(meta,k,("value" in d)&&(k in t)&&t[k]===d.value);return Reflect.defineProperty(t,k,d)}});
 RAW.set(p,o);PX.set(o,p);return p}
const isL=x=>{try{return !!(x&&x[LENS])}catch(e){return false}};
function wrap(){try{if(typeof S!=="undefined"&&S&&!RAW.has(S)){S=px(S,{r:"S"})}if(typeof rivals!=="undefined"&&rivals&&!RAW.has(rivals)&&!isL(rivals)){rivals=px(rivals,{r:"R"})}}catch(e){console.error("trip wrap",e)}}
function check(){const C=window.COOPW;if(!C||!C.on||C.seat!=="b"||C.inFC)return;
 if(!on){on=true;C.afterFC=()=>{wrap()};wrap();return}
 try{if(S&&!RAW.has(S)){sRep++;wrap()}if(rivals&&!RAW.has(rivals)&&!isL(rivals)){rRep++;wrap()}}catch(e){}}
setInterval(check,150);
window.__trip=function(){const top=[...CNT.entries()].sort((a,b)=>b[1]-a[1]).map(([k,n])=>{const [f,r]=k.split("|");return [f,r,n]});const parts={};for(const [k,n] of PCNT){const [pt,f,r]=k.split("|");(parts[pt]=parts[pt]||[]).push([f,r,n])}for(const pt in parts)parts[pt]=parts[pt].sort((a,b)=>b[2]-a[2]).slice(0,15);
 const C=window.COOPW&&COOPW.thin&&COOPW.thin.C;const W=Object.keys(byRoot).filter(r=>r==="W"||r==="R"||r==="Rarr").reduce((n,r)=>n+byRoot[r],0);
 return {qs:[...QS.entries()].sort((a,b)=>b[1].n-a[1].n).slice(0,30).map(([k,e])=>[k,e.n,e.st]),entries:ENTN,total,raw,state,statePart,byRoot,byPart,parts,top:top.slice(0,40),pairs:top.length,sReplaced:sRep,rReplaced:rRep,world:W,lens:lensN,lensStat:C?C.stat:null}};
})();
