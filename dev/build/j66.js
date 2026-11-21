
/* ================= j66: SHE IS ONE OF THE CONSORT IDENTITIES (owner 11/14) =================
   No separate "player looks" any more. Each new life rolls one consort identity (img/FIGURES.json, role consort,
   c01..c32) for her as part of the stored roll in localStorage "ctm-nextlife" (d.pid): a reload shows the same one,
   "Đổi thân phận" rolls another. The identity is reserved for the whole game (S.pid sits in S.fidUsed), so no NPC
   consort, tuyển tú intake included, ever gets it or any of its tiers / ages. Her art then follows the consort picker:
   dress tier = rank (Đáp ứng t1 ... Hoàng hậu t8), age band = her age (BAL.ageBand: 18–25, 26–35, 36–50, 51–64, 65+), same identity for life.
   While she is a palace maid (cnv) she wears the identity's tier 1. In lãnh cung she (and any NPC consort there) asks for
   the identity's tier "cold" (fig-consort-cNN-tcold-aAA.webp); while that art is missing the nearest file is tier 1. If a file is missing the nearest
   tier/age of the identity is used; with no art at all she keeps the old face. Old saves (no S.pid) are left as they are,
   look-* faces included. */
const PID_N=32;
function pidKeys(){try{const M=typeof FIGIX!=="undefined"&&FIGIX.consort;const k=M?Object.keys(M).filter(x=>/^consort:c\d+$/.test(x)):[];if(k.length)return k.sort()}catch(e){}
 const L=[];for(let i=1;i<=PID_N;i++)L.push("consort:c"+String(i).padStart(2,"0"));return L}
/* deterministic from the roll's seed, so the same roll always gives the same identity even before it is stored */
let PID_AVOID=null;
function pidRoll(d){let K=pidKeys();try{const T=pidTakenNow();if(T){const F=K.filter(k=>!T.has(k));if(F.length)K=F}}catch(e){}const r=nlRng((d.seed^0x2c1b3c6d)>>>0);r();let i=Math.floor(r()*K.length)%K.length;
 if(PID_AVOID&&K[i]===PID_AVOID&&K.length>1)i=(i+1+Math.floor(r()*(K.length-1)))%K.length;return K[i]}
/* "Đổi thân phận" always gives another identity than the one on the card */
(function(){const r0=nlReroll;nlReroll=function(){PID_AVOID=S&&S.pid||null;try{return r0.apply(this,arguments)}finally{PID_AVOID=null}}})();
function pidOn(){return !!(S&&S.pid)}
/* 8 ranks = 8 dress tiers; 4 age bands as the standing rule draws them */
function pidBand(a){return a==null?null:ageBandIx(a)}/* every band of BAL.ageBand (a65 since art-wiring-1119) */
(function(){const t0=figTierOf;figTierOf=function(who){try{
  if(who===S&&S){if(S.pid)return (typeof isSrv==="function"&&isSrv())?1:S.out?-1:Math.min(7,S.rank||0)+1;return t0.apply(this,arguments)}
  if((rivals||[]).includes(who))return who.out?-1:who.queen?8:Math.min(7,who.rank||0)+1}catch(e){}return t0.apply(this,arguments)}})();
figDist=function(f,tier,age){const ft=figTier(f.tier),fa=figAge(f.ageBand);const ab=pidBand(age),fb=pidBand(fa);
 return (tier!=null&&ft!=null?Math.abs(ft-tier)*2:0)+(ab!=null&&fb!=null?Math.abs(fb-ab)*1.2+Math.abs(fa-age)/400:0)};
/* the reserved identity is always "used": every NPC pick skips it */
/* coop-room-faces (Foreman D #16, MAIN 95, LUẬT SỬA CẢ NHÓM): a face anyone HOLDS is "used", whatever list it was written in. Before, the
   face list S.fidUsed missed faces that people really wore: the court (Tổng quản, Kính sự phòng, Thái y …), the men, NPC consorts after the
   new-life face snapshot (j52 nlFaces puts back an older list), and in co-op the friend's own people (her maid, staff, kids live in her
   P blob, not the world) and every face the 3-way merge dropped (the host's list taken whole) — so a new draw could hand one face to two
   people (probe dev/test/coop-room-faces.js: maid:m14 on two consorts on the host after week 2). ONE rule here: figUsed() = the list +
   the reserved identity + every face held by S, the consorts and their people (figHeld, walked once per turn/buổi) + in co-op every face
   of the room (COOPW.roomFaces: the room's world + the friend's own people + her identity). Faces held are added to the list itself, so
   saves and the week end carry them. «man:thive-*» guards share faces by design (jmen) and are left out. */
const FIG_SHARE=/^man:thive/;const FIG_LISTK={fidUsed:1,fidDead:1,fseen:1,usedFaces:1,kidUsed:1,fdead:1,visit:1};let FIG_HM=null;
function figHeld(){if(!S)return new Set();const R=typeof rivals!=="undefined"?rivals:[];const rb=window.COOPW&&COOPW.on?COOPW.base:null;
 const key=[S.turn,S.month,S.tuan,S.buoi||0,R.length,S.pid||"",S.fid||""].join("|");if(FIG_HM&&FIG_HM.S===S&&FIG_HM.k===key&&FIG_HM.R===R&&FIG_HM.b===rb)return FIG_HM.H;
 const H=new Set(),seen=new Set();const walk=(o,d)=>{if(!o||typeof o!=="object"||seen.has(o)||d>40)return;seen.add(o);if(Array.isArray(o)){for(const x of o)walk(x,d+1);return}
  for(const k in o){if(FIG_LISTK[k])continue;const v=o[k];if(k==="fid"){if(typeof v==="string"&&v&&!FIG_SHARE.test(v))H.add(v)}else if(v&&typeof v==="object")walk(v,d+1)}};
 try{walk(S,0);walk(R,0)}catch(e){}if(S.pid)H.add(S.pid);
 try{if(rb&&COOPW.roomFaces)for(const k of COOPW.roomFaces())if(!FIG_SHARE.test(k))H.add(k)}catch(e){}
 FIG_HM={S,k:key,R,b:rb,H};return H}
(function(){const u0=figUsed;figUsed=function(){const U=u0.apply(this,arguments);try{if(S&&S.pid&&!U.includes(S.pid))U.push(S.pid);
  const H=figHeld();if(H.size){const has=new Set(U);for(const k of H)if(!has.has(k)){U.push(k);has.add(k)}}}catch(e){}return U}})();
window.figHeld=figHeld;
/* her own pick: the reserved identity, or nothing (the old face) when its art is not there */
(function(){const p0=figPick;figPick=function(who){if(who===S&&S&&S.pid){figUsed();const M=typeof FIGIX!=="undefined"&&FIGIX.consort;if(M&&M[S.pid]){S.fid=S.pid;return S.pid}return null}
  if(who&&who!==S&&S&&S.pid&&who.fid===S.pid)who.fid=null;return p0.apply(this,arguments)}})();
/* a new life: attach the stored identity, then clear any NPC that already took it */
function pidEnforce(){if(!S||!S.pid)return false;let ch=false;S.fid=S.pid;const U=figUsed();
 for(const o of nlHolders()){if(o&&o!==S&&o.fid===S.pid){o.fid=null;ch=true}}
 const n=U.filter(x=>x===S.pid).length;if(n>1){S.fidUsed=U.filter(x=>x!==S.pid);S.fidUsed.push(S.pid);ch=true}return ch}
/* coop-pool-face (Foreman D #15, root cause of coop-e2e "guest's Thái hậu picture blank"): in a shared room a player's own identity is
   never a face the ROOM's world already gives someone (Thái hậu, consorts, their staff, court, men … every pool-faced person) nor the
   friend's own identity. Before: the guest rolled her identity from the 32 consort faces without looking at the room (~1 in 32 hit the
   face the host had given the Thái hậu); pidEnforce / figPick above then cleared that world person's face on her phone, her week end
   carried the blank face, the 3-way merge took it (only she "changed" it) and the host drew a new face (c23 → c04): one face for life broken
   on both seats. ONE rule, two doors: pidRoll skips the taken faces (the roll card shows the face she will have), and every time a
   life enters / reloads the room (jcoopworld fromCanon) pidRoomFix moves HER (never the world person) to a free identity if hers is
   taken (a stored roll, a face pick made before the room's world was in, an old room where the clash already happened).
   COOPW.taken() = the faces held in the room's world + the friend's identity (jcoopworld). Solo: no COOPW.on, nothing changes. */
function pidTakenNow(){try{return window.COOPW&&COOPW.on&&COOPW.taken?COOPW.taken():null}catch(e){return null}}
function pidRoomFix(T){if(!S||!S.pid||!T||!T.has(S.pid))return false;const K=pidKeys();const U=new Set(S.fidUsed||[]);const i=Math.max(0,K.indexOf(S.pid));let k=null;
 for(let j=1;j<=K.length&&!k;j++){const x=K[(i+j)%K.length];if(!T.has(x)&&!U.has(x))k=x}
 for(let j=1;j<=K.length&&!k;j++){const x=K[(i+j)%K.length];if(!T.has(x))k=x}
 if(!k)return false;const old=S.pid;S.pid=k;S.fid=k;figUsed();
 try{const d=store.get(NL_KEY);if(d&&d.pid===old){d.pid=k;if(d.fpick===old)d.fpick=k;store.set(NL_KEY,d)}}catch(e){}
 pidRoomFix.n=(pidRoomFix.n||0)+1;pidRoomFix.last=[old,k];return true}
window.pidRoomFix=pidRoomFix;
(function(){const r0=nlRun;nlRun=function(d){if(d&&!d.pid){d.pid=pidRoll(d);try{const c=store.get(NL_KEY);if(c&&c.seed===d.seed){c.pid=d.pid;store.set(NL_KEY,c)}}catch(e){}}
  const res=r0.apply(this,arguments);try{if(S&&d&&d.pid){S.pid=d.pid;pidEnforce()}}catch(e){console.error(e)}return res}})();
/* the face snapshot (j52) may hold a pre-j66 player look or an NPC with her identity: correct it and re-record */
(function(){const f0=nlFaces;nlFaces=function(d){const r=f0.apply(this,arguments);try{if(S&&S.pid&&d&&d.faces){const H=nlHolders();const F=d.faces;let ch=pidEnforce();
  H.forEach((o,i)=>{if(!o)return;const rec=F.h[i]=F.h[i]||{};if(o===S){if(rec.fid!==S.pid){rec.fid=S.pid;ch=true}}else if(rec.fid===S.pid){delete rec.fid;ch=true}});
  if(Array.isArray(F.fidUsed)&&!F.fidUsed.includes(S.pid)){F.fidUsed.push(S.pid);ch=true}
  if(ch&&NLP&&NLP.seed===d.seed)store.set(NL_KEY,d)}}catch(e){console.error(e)}return r}})();
/* the identity card: show her portrait as soon as it has loaded (the card is a modal, render() alone does not redraw it) */
(function(){const c0=nlCard;nlCard=function(){const r=c0.apply(this,arguments);try{const src=figFor(S,"por");if(src&&PORK[src]!==1){const im=new Image();im.onload=()=>{PORK[src]=1;try{const m=Q[0];if(NLP&&m&&m.nl){m.faces=[[pMe(),S.name]];showModal()}}catch(e){}};im.src=src}}catch(e){}return r}})();
/* review/player-dress: a life started past Luân hồi (window.__nlInner: test drivers, tools) used to get no identity and fell back to the
   old t1-only player looks (t1 dress on the cung nữ road and in lãnh cung). It now takes a free identity at once, before any picture
   of her is kept, so every life is one of the 84 painted women with all her dresses. Loaded saves are untouched (deser does not call start). */
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(window.__nlInner&&S&&!S.pid&&!S.dead){
  const used=new Set((S.fidUsed||[]).filter(k=>!/^player:/.test(k)));let K=[];try{K=typeof f88Keys==="function"?f88Keys("consort"):pidKeys()}catch(e){K=pidKeys()}
  const free=K.filter(k=>!used.has(k));const L=free.length?free:K;if(L.length){S.pid=L[Math.floor(Math.random()*L.length)%L.length];
   S.fidUsed=(S.fidUsed||[]).filter(k=>!/^player:/.test(k));pidEnforce()}}}catch(e){console.error("pid inner",e)}return r}})();
