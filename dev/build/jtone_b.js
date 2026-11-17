/* ================= jtone_b: VOICE BY TÍNH TÌNH, part W-B engine glue (owner 17/11 06:05Z, review/voice-trait) =================
   Data lives in jtone_b1..b5.js (pools keyed by SITUATION, each {8 Tính tình → >=10 lines}) and is added to window.TONE_POOL (jtone.js).
   Situations: toil reactions (toil:<kind>:<look>), toilGest:<who>±, toilSlip:<who>:<slip>, wd:ok|over|under, staff:<tn|kn|gt…>, cycle:ask, ts:warn, habit.
   Helpers used by the call sites (jtoil, j92, jstaff, jcycle, jts): kTP(key) → tone pool or null (callers fall back to the old pool);
   kToneSt(x, seed) → the tone of person x, else a STABLE tone from the seed (a named palace ma ma, the player's maid), else null;
   kToneRand() → a tone for a many-voice crowd; kToneBand(key, kind) → the tone pool with the rank-band lines of the reaction merged in. */
(function(){
const TONES=["Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Kiêu ngạo","Khiêm nhường"];
const TP=()=>window.TONE_POOL||(window.TONE_POOL={});
const hs=x=>{let h=0;x=String(x);for(let i=0;i<x.length;i++)h=(h*31+x.charCodeAt(i))|0;return Math.abs(h)};
window.kTP=key=>{const p=TP()[key];return p||null};
window.kToneSt=function(x,seed){let t=null;try{if(x!=null)t=kTone(x)}catch(e){}if(t)return t;return seed!=null&&seed!==""?TONES[hs(seed)%TONES.length]:null};
window.kToneRand=()=>TONES[Math.floor(Math.random()*TONES.length)];
const MER={};
window.kToneBand=function(key,kind){const P=TP()[key];if(!P)return null;if(MER[key])return MER[key];
 const B=(window.TOIL_BAND||{})[kind]||{},T=[];for(const b of Object.keys(B))for(const x of B[b])T.push(`[${b}]${x}`);
 const M={};for(const t of TONES)M[t]=(P[t]||[]).concat(T);return MER[key]=M};
/* signature habit of a consort: by her tone now (fixed for her life, picked from her id like the old HABIT; long form, every other week) */
const k0=window.kHabit;
window.kHabit=function(v,always){try{const P=TP().habit;if(!P)return k0.apply(this,arguments);if(!v||v===S)return"";if(!always&&(typeof wk==="function"?wk():0)%2)return"";
  const t=kTone(v),L=P[t]||P[TONES[3]];return L[hs(v.id!=null?v.id:v.name)%L.length]}catch(e){return""}};
})();
