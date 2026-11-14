
/* ================= j66: SHE IS ONE OF THE CONSORT IDENTITIES (owner 11/14) =================
   No separate "player looks" any more. Each new life rolls one consort identity (img/FIGURES.json, role consort,
   c01..c32) for her as part of the stored roll in localStorage "ctm-nextlife" (d.pid): a reload shows the same one,
   "Đổi thân phận" rolls another. The identity is reserved for the whole game (S.pid sits in S.fidUsed), so no NPC
   consort, tuyển tú intake included, ever gets it or any of its tiers / ages. Her art then follows the consort picker:
   dress tier = rank (Đáp ứng t1 ... Hoàng hậu t8), age band = her age (18–25, 26–35, 36–50, 51+), same identity for life.
   While she is a palace maid (cnv) she wears the identity's tier 1. In lãnh cung she (and any NPC consort there) asks for
   the identity's tier "cold" (fig-consort-cNN-tcold-aAA.webp); while that art is missing the nearest file is tier 1. If a file is missing the nearest
   tier/age of the identity is used; with no art at all she keeps the old face. Old saves (no S.pid) are left as they are,
   look-* faces included. */
const PID_N=32;
function pidKeys(){try{const M=typeof FIGIX!=="undefined"&&FIGIX.consort;const k=M?Object.keys(M).filter(x=>/^consort:c\d+$/.test(x)):[];if(k.length)return k.sort()}catch(e){}
 const L=[];for(let i=1;i<=PID_N;i++)L.push("consort:c"+String(i).padStart(2,"0"));return L}
/* deterministic from the roll's seed, so the same roll always gives the same identity even before it is stored */
let PID_AVOID=null;
function pidRoll(d){const K=pidKeys();const r=nlRng((d.seed^0x2c1b3c6d)>>>0);r();let i=Math.floor(r()*K.length)%K.length;
 if(PID_AVOID&&K[i]===PID_AVOID&&K.length>1)i=(i+1+Math.floor(r()*(K.length-1)))%K.length;return K[i]}
/* "Đổi thân phận" always gives another identity than the one on the card */
(function(){const r0=nlReroll;nlReroll=function(){PID_AVOID=S&&S.pid||null;try{return r0.apply(this,arguments)}finally{PID_AVOID=null}}})();
function pidOn(){return !!(S&&S.pid)}
/* 8 ranks = 8 dress tiers; 4 age bands as the standing rule draws them */
function pidBand(a){return a==null?null:a<26?0:a<36?1:a<51?2:3}
(function(){const t0=figTierOf;figTierOf=function(who){try{
  if(who===S&&S){if(S.pid)return (typeof isSrv==="function"&&isSrv())?1:S.out?-1:Math.min(7,S.rank||0)+1;return t0.apply(this,arguments)}
  if((rivals||[]).includes(who))return who.out?-1:who.queen?8:Math.min(7,who.rank||0)+1}catch(e){}return t0.apply(this,arguments)}})();
figDist=function(f,tier,age){const ft=figTier(f.tier),fa=figAge(f.ageBand);const ab=pidBand(age),fb=pidBand(fa);
 return (tier!=null&&ft!=null?Math.abs(ft-tier)*2:0)+(ab!=null&&fb!=null?Math.abs(fb-ab)*1.2+Math.abs(fa-age)/400:0)};
/* the reserved identity is always "used": every NPC pick skips it */
(function(){const u0=figUsed;figUsed=function(){const U=u0.apply(this,arguments);try{if(S&&S.pid&&!U.includes(S.pid))U.push(S.pid)}catch(e){}return U}})();
/* her own pick: the reserved identity, or nothing (the old face) when its art is not there */
(function(){const p0=figPick;figPick=function(who){if(who===S&&S&&S.pid){figUsed();const M=typeof FIGIX!=="undefined"&&FIGIX.consort;if(M&&M[S.pid]){S.fid=S.pid;return S.pid}return null}
  if(who&&who!==S&&S&&S.pid&&who.fid===S.pid)who.fid=null;return p0.apply(this,arguments)}})();
/* a new life: attach the stored identity, then clear any NPC that already took it */
function pidEnforce(){if(!S||!S.pid)return false;let ch=false;S.fid=S.pid;const U=figUsed();
 for(const o of nlHolders()){if(o&&o!==S&&o.fid===S.pid){o.fid=null;ch=true}}
 const n=U.filter(x=>x===S.pid).length;if(n>1){S.fidUsed=U.filter(x=>x!==S.pid);S.fidUsed.push(S.pid);ch=true}return ch}
(function(){const r0=nlRun;nlRun=function(d){if(d&&!d.pid){d.pid=pidRoll(d);try{const c=store.get(NL_KEY);if(c&&c.seed===d.seed){c.pid=d.pid;store.set(NL_KEY,c)}}catch(e){}}
  const res=r0.apply(this,arguments);try{if(S&&d&&d.pid){S.pid=d.pid;pidEnforce()}}catch(e){console.error(e)}return res}})();
/* the face snapshot (j52) may hold a pre-j66 player look or an NPC with her identity: correct it and re-record */
(function(){const f0=nlFaces;nlFaces=function(d){const r=f0.apply(this,arguments);try{if(S&&S.pid&&d&&d.faces){const H=nlHolders();const F=d.faces;let ch=pidEnforce();
  H.forEach((o,i)=>{if(!o)return;const rec=F.h[i]=F.h[i]||{};if(o===S){if(rec.fid!==S.pid){rec.fid=S.pid;ch=true}}else if(rec.fid===S.pid){delete rec.fid;ch=true}});
  if(Array.isArray(F.fidUsed)&&!F.fidUsed.includes(S.pid)){F.fidUsed.push(S.pid);ch=true}
  if(ch&&NLP&&NLP.seed===d.seed)store.set(NL_KEY,d)}}catch(e){console.error(e)}return r}})();
/* the identity card: show her portrait as soon as it has loaded (the card is a modal, render() alone does not redraw it) */
(function(){const c0=nlCard;nlCard=function(){const r=c0.apply(this,arguments);try{const src=figFor(S,"por");if(src&&PORK[src]!==1){const im=new Image();im.onload=()=>{PORK[src]=1;try{const m=Q[0];if(NLP&&m&&m.nl){m.faces=[[pMe(),S.name]];showModal()}}catch(e){}};im.src=src}}catch(e){}return r}})();
