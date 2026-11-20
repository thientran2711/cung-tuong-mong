/* jreg (review/story-frame, story bot fault 1): ONE rule for every load-time pass over a shared registry (STORY, ARC67, ACT, IT, T72, FPOOL…).
   The game is one script of modules in assemble order; a module that loops over a registry while it loads sees only the entries of the
   modules before it. Entries added by later modules (jorigins bd, jrd_* roads, jpoison items, jtsb acts…) were skipped silently: bd had no
   story frame in 28/28 bot lives. regEach(obj, fn, name) runs fn(key, value, late) on every entry now AND on every entry added (or replaced)
   later: regSweep() runs at the end of the game script (assemble.py), once more after the load timers (setTimeout 0) and at every life start
   (j67 story wrapper init). fn runs once per key + value (a replaced value runs again), so it must be safe to run on a fresh value only.
   late = 1 when the entry came after the pass was registered. Scan: dev/measure/regscan.py + regscan.js (no load-time loop may miss later keys). */
const REG_EACH=[];
function regEach(obj,fn,name){const seen=new Map();
 const run=late=>{if(!obj)return 0;let n=0;for(const k of Object.keys(obj)){const v=obj[k];if(seen.has(k)&&seen.get(k)===v)continue;
  try{fn(k,v,late?1:0)}catch(e){console.error("regEach "+(name||""),k,e)}seen.set(k,obj[k]);n++}return n};
 const R={name:name||"",obj,run,n0:run(0)};REG_EACH.push(R);return R}
function regSweep(){let n=0;for(const R of REG_EACH)n+=R.run(1);return n}
