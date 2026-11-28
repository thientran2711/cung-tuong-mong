/* ================= jint: WHOLE NUMBERS ONLY (owner 11/15: Tuần lục "Nàng oán ta +2.36", "Hiện nay … oán ta 2.36000…") =================
   Every stat of every person is a whole number. Cause found: oanMonth (j28) forgives 2 × persF(v,"forgive") points of oán a month,
   e.g. 2 × 0.82 = 1.64, and wrote the fraction straight back. That source now rounds (j28); this module is the guard for the rest:
   - the shared writers (apply, ap, affAdd, oanAdd, relAdd, evA, oanMonth) round what they touched right after writing;
   - every buổi (nextBuoi) and on load (deser: old saves with fractions are migrated) every person is rounded;
   - the log line wording: "thù -N" (banned) is written as "oán ngươi +N" (the same rule the act cards use, j63 kaModelStr). */
const INT_KEYS=["sung","an","danh","duc","sac","tai","tamco","suc","bac","mat","th","hh","rel","oan","ghen","fond","loyal","tin","ev","hp","tal","nt","sus","pow"];
function intP(p){if(!p||typeof p!=="object")return;for(const k of INT_KEYS){const v=p[k];if(typeof v==="number"&&!Number.isInteger(v))p[k]=Math.round(v)}
 for(const m of ["rl","ro","evm","gp"]){const o=p[m];if(o&&typeof o==="object")for(const k in o){const v=o[k];if(typeof v==="number"&&!Number.isInteger(v))o[k]=Math.round(v)}}
 if(p.maid&&p.maid!==p&&typeof p.maid==="object")intP(p.maid)}
function intPeople(){if(typeof S==="undefined"||!S)return[];const L=[S,S.maid,S.emp,S.thO];try{(rivals||[]).forEach(v=>L.push(v,v&&v.maid))}catch(e){}
 for(const k of ["staff","kids","men"])if(Array.isArray(S[k]))S[k].forEach(x=>L.push(x));return L.filter(x=>x&&typeof x==="object")}
function intAll(){try{intPeople().forEach(intP)}catch(e){console.error("intAll",e)}}
window.intAll=intAll;
(function(){const W=(name,fn)=>{if(typeof window[name]!=="function")return;const f0=window[name];window[name]=fn(f0)};
 W("apply",a0=>function(){const r=a0.apply(this,arguments);try{intP(S)}catch(e){}return r});
 W("ap",a0=>function(p){const r=a0.apply(this,arguments);try{intP(p);intP(S)}catch(e){}return r});
 for(const n of ["affAdd","oanAdd","relAdd","evA"])W(n,a0=>function(x,y){const r=a0.apply(this,arguments);if(typeof AFF_DRY!=="undefined"&&AFF_DRY)return r;try{intP(x);intP(y);intP(S)}catch(e){}return r});
 W("oanMonth",a0=>function(){const r=a0.apply(this,arguments);intAll();return r});
 W("nextBuoi",a0=>function(){const r=a0.apply(this,arguments);intAll();return r});
 W("deser",a0=>function(){const r=a0.apply(this,arguments);intAll();return r});
 /* log wording: "thù -N" → "oán ngươi +N" (sign as she reads it: more oán toward her) */
 W("log",a0=>function(t){if(typeof t==="string"&&/thù -\d/.test(t))arguments[0]=t.replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${spSee("oan",+n)}`);return a0.apply(this,arguments)})})();
