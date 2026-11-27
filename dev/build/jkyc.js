/* ================= jkyc: COMPOSED KỲ NGỘ (ORDER THIN P5, owner OD 23/11 ~22:50Z; EVCAT §3 P5; schema reports/thin.md «## API P5») =================
   A seed (KYSEEDS in jkysd.js; its numbers in BAL.kyngo.E via jbalkyc.js — law 4; both built by dev/build/jkysd_build.py from
   dev/handover/content/thin/kyseeds*.md) becomes ONE more entry of jky's DEF at load, so the whole Kỳ ngộ runtime plays it unchanged: the ONE gate
   (a REAL person at that place now, from the j95 location record), roll / pity / cooldown, once per life (z.seen), two-way NPC finders (law 1),
   specials (every piece only moves, law 6c), Sổ luân hồi. Pieces come from the four real sources jky already reads (DEF.vat_chung / vat_lac /
   vat_cu / vat_ngu `what`), never conjured. Equal value (law 2/3): dev/test/kyngo-eq.js reads jbalkyc.js too.
   CROSS-LIFE: P0 family "ky" (seed = encounter id, old 25 included): an encounter she met in a past life weighs × BAL.kyc.seen (fresh-first);
   marked when she meets it (S.ky.got), personal per seat. */
(function(){if(typeof KY==="undefined"||!KY.DEF||typeof BAL==="undefined"||!BAL.kyngo)return;const DEF=KY.DEF,E=BAL.kyngo.E;
const WHAT={plot:"vat_chung",lost:"vat_lac",dead:"vat_cu",rare:"vat_ngu"};
const nmK=p=>p===S?"ngươi":(p&&p.name)||"vị ấy";
function netFit(o,L){if(!L||!L.length)return true;let T=[];try{T=tr6(o)||[]}catch(e){}return L.some(n=>T.includes(n))}
function match(x,w,F){if(!x||x.ref===F)return false;const k=w.kind;
 if(k==="ly")return x.kind==="ly";
 if(k==="el")return x.kind==="el"&&(!w.eid||x.eid===w.eid);
 if(k==="man")return x.kind==="man"&&(!w.role||x.ref.role===w.role);
 if(k==="court")return x.kind==="court"&&(!w.c||x.c===w.c);
 if(k==="emp"||k==="th")return x.kind===k;
 if(k==="rv")return x.kind==="rv"&&(!w.old||(x.ref.age|0)>=BAL.ageBand[2])&&(!w.sameBand||KY.band(x.ref)===KY.band(F))&&netFit(x.ref,w["nết"]);
 if(k==="sv")return x.kind==="sv"&&x.own!==F&&(w.eunuch==null||(x.ref.role==="eunuch")===!!w.eunuch)&&x.ref.spyFor!==key(F)&&netFit(x.ref,w["nết"]);
 if(k==="kid")return x.kind==="kid"&&x.own!==F;
 return false}
function whoF(sd){const w=sd.who||{};
 if(sd.what==="plot")return (F,L,X)=>X.pl?{kind:"rv",ref:X.pl.a}:null;
 if(sd.what==="lost")return (F,L,X)=>X.lc?{kind:"own",ref:loP(X.lc.own)}:null;
 if(w.kind==="maid")return F=>F===S&&S.maid?{kind:"maid"}:null;
 return (F,L)=>L.find(x=>match(x,w,F))||null}
function whenF(n){if(!n)return null;return ()=>{const b=S.buoi||0;
 if(n.buoi&&n.buoi.length&&!n.buoi.includes(b))return false;if(n.night&&b!==B4L)return false;
 if(n.winter){let s="";try{s=SEASON[S.month-1]}catch(e){}if(s!=="Đông")return false}
 if(n.wx){let v=0;try{v=wxSev()}catch(e){}if(v<1)return false}
 if(n.fest&&n.fest.length){let f=null;try{f=festToday()}catch(e){}if(!f||!n.fest.includes(f.k))return false}return true}}
function piece(c){const X=c.X||{};try{if(X.lc)return loNm(X.lc.k);if(X.box)return itm(X.box.e.k).n;if(X.rr)return itm(X.rr.k).n}catch(e){}return"món đồ"}
function owner(c){const X=c.X||{};try{if(X.lc)return nmK(loP(X.lc.own));if(X.pl)return nmK(X.pl.a)}catch(e){}return""}
function tF(sd){return c=>{let s="";try{s=SEASON[S.month-1].toLowerCase()}catch(e){}
 const h=String(sd.t).replace(/\{W\}/g,c.wn||"").replace(/\{O\}/g,()=>`<b>${piece(c)}</b>`).replace(/\{own\}/g,()=>owner(c)).replace(/\{S\}/g,s);
 let tag="";try{if(c.X&&c.X.lc)tag=loTag(c.X.lc.e)}catch(e){}return `<p>${h}</p>${tag}`}}
function reg(sd){if(!sd||!sd.id||DEF[sd.id]||!E[sd.id])return false;const D={pl:sd.pl&&sd.pl.length?sd.pl.slice():["*"],who:whoF(sd),t:tF(sd),cs:1};
 const wn=whenF(sd.when);if(wn)D.when=wn;if(sd.what&&WHAT[sd.what]&&DEF[WHAT[sd.what]]&&DEF[WHAT[sd.what]].what)D.what=DEF[WHAT[sd.what]].what;else if(sd.what)return false;
 if(sd.n&&sd.n.length)D.n=sd.n.slice();DEF[sd.id]=D;return true}
const L=(typeof KYSEEDS!=="undefined"&&Array.isArray(KYSEEDS))?KYSEEDS:[];let n=0;for(const sd of L){try{if(reg(sd))n++}catch(e){console.error("jkyc",sd&&sd.id,e)}}
/* cross-life: every encounter's weight (old 25 + composed) × BAL.kyc.seen when a past life met it */
for(const id in E){const e=E[id];if(!e||Object.getOwnPropertyDescriptor(e,"w")&&Object.getOwnPropertyDescriptor(e,"w").get)continue;const w0=e.w==null?1:e.w;
 Object.defineProperty(e,"w",{configurable:true,enumerable:true,get(){let f=1;try{if(BAL.kyc&&BAL.kyc.on&&typeof nrSeen==="function"&&nrSeen("ky",id)>0)f=BAL.kyc.seen}catch(x){}return w0*f},set(v){/* keep the authored weight editable (tests / tuning) */Object.defineProperty(e,"w",{configurable:true,enumerable:true,writable:true,value:v})}})}
function kycMark(){try{if(!S||!S.ky||!Array.isArray(S.ky.got)||typeof nrMark!=="function")return;for(const id of S.ky.got)if(!nrNow("ky",id))nrMark("ky",id)}catch(e){console.error("jkyc mark",e)}}
KY.cmark=kycMark;KY.cN=n;KY.creg=reg;
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);kycMark();return r}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);kycMark();return r}})();
window.kycCount=function(){const by={};for(const sd of L)if(DEF[sd.id]&&DEF[sd.id].cs)by[sd.grp]=(by[sd.grp]||0)+1;return{seeds:by,total:Object.values(by).reduce((a,b)=>a+b,0),all:Object.keys(DEF).length}};
})();
