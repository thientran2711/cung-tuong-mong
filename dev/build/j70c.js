/* ================= j70c: COMPOSED j70 ROUTES (ORDER THIN P6, owner OD 23/11 ~22:50Z; EVCAT §3 P6) =================
   Seeds (data J70SEEDS in j70sd.js, built from dev/handover/content/thin/j70seeds*.md by dev/build/j70sd_build.py; schema reports/thin.md «## API P6»):
   one seed = one more route of an existing method m (method × route × tell): its two tells (+ optional alternates), the place a tell is seen, the
   price / prep time / visibility tiers (numbers BAL.j70c, law 4), the accomplice, the real object (law 6c), her guard and her cut.
   At load every seed becomes ONE more entry of M70[m].R, so the whole j70 runtime plays it unchanged for every plotter (NPC→her, NPC→NPC,
   her→NPC, law 1): pickRoute70 (price, wit, accomplice), tells, detection, guard/cut, execution, aftermath.
   Cross-life (P0 jnorep, family "j70", key "<m>:<route>" = the raw key j70 already marks): every plotter now picks among the routes NOT met in a
   past life first (nrFresh), the old 51 included; once all are met, the whole list as today.
   Tell wordings: a seed with alternates draws its two tells per plot (family "j70t", key "<m>:<route>:<i>", fresh-first) and keeps them (p.tv).
   The real object: the plot keeps {name, from, trace}; her people's report and the aftermath name where it really ends (S.j70.ob, personal list). */
(function(){
if(typeof M70==="undefined")return;
const J70C={};window.J70C_SEEDS=J70C;
const Bj=()=>BAL.j70c;
function tier(map,k,d){const T=Bj()[map];return T[k]!=null?T[k]:T[d]}/* law 4: an unknown tier falls back to a NAMED BAL tier, never a typed number */
function route(sd){return{id:sd.id,n:sd.n,tl:(sd.tl||[]).slice(0,2),tlx:(sd.tlx||[]).slice(),pl:sd.pl||null,
 get vis(){return tier("vis",sd.vis,"lo")},get need(){return tier("need",sd.need,"s")},get bac(){return tier("bac",String(sd.bac),"0")},
 acc:sd.acc||undefined,win:sd.win?1:undefined,gd:sd.gd,st:sd.st,obj:sd.obj||null,opp:sd.opp||null,cs:1}}
const keyOf=M=>{for(const k in M70)if(M70[k]===M)return k;return null};
/* fresh-first across lives for every route of the method (old and composed) */
if(typeof pickRoute70==="function"){const p0=pickRoute70;pickRoute70=function(a,t,M){try{const m=keyOf(M);if(m&&BAL.j70c&&typeof nrFresh==="function"){
  const R0=Bj().on?M.R:M.R.filter(r=>!r.cs);/* composed routes off: the hand-written ones only */
  const F=nrFresh("j70",R0,r=>m+":"+r.id);if(F.length<R0.length){const r=p0.call(this,a,t,Object.assign({},M,{R:F}));if(r)return r}
  if(R0.length<M.R.length)return p0.call(this,a,t,Object.assign({},M,{R:R0}))}}catch(e){console.error("j70c pick",e)}
 return p0.apply(this,arguments)}}
/* tell wording of a composed route: two of tl + tlx per plot, fresh-first (j70t) */
function tellPair(m,r){const A=r.tl.concat(r.tlx||[]);if(A.length<=2)return null;const idx=A.map((_,i)=>i);const fam="j70t";
 const one=L=>{const F=nrFresh(fam,L,i=>m+":"+r.id+":"+i);const i=nrPick(fam,F,x=>m+":"+r.id+":"+x);if(i!=null)nrMark(fam,m+":"+r.id+":"+i);return i};
 const a=one(idx);const b=one(idx.filter(i=>i!==a));return a==null||b==null?null:[a,b]}
if(typeof newPlot70==="function"){const n0=newPlot70;newPlot70=function(a,t,m,rid,mo,opt){const p=n0.apply(this,arguments);try{if(p&&!p.end){const M=M70[p.m];const r=M&&M.R.find(x=>x.id===p.r);
  if(r&&r.cs){if(r.tlx&&r.tlx.length)p.tv=tellPair(p.m,r)||undefined;if(r.obj){const z=j70();(z.ob=z.ob||[]).push({pl:p.id,r:r.id,name:r.obj.name,from:r.obj.from,trace:r.obj.trace,born:S.turn});if(z.ob.length>Bj().obKeep)z.ob.splice(0,z.ob.length-Bj().obKeep)}}}}catch(e){console.error("j70c plot",e)}return p}}
if(typeof tellOf70==="function"){const t0=tellOf70;tellOf70=function(p,i){try{if(p&&p.tv){const r=pr70(p);if(r&&r.cs){const A=r.tl.concat(r.tlx||[]);const s=A[p.tv[Math.min(i,1)]];
  if(s){const t=pt70(p);return s.replace(/nạn nhân/g,t?(t===S?"ngươi":t.name):"người khác")}}}}catch(e){}return t0.apply(this,arguments)}}
/* the real object ends somewhere (law 6c): once the plot is carried out / cut / trapped, where it is now is said to whoever knew of it */
if(typeof exec70==="function"){const x0=exec70;exec70=function(p,opp){const r=x0.apply(this,arguments);try{const o=p&&j70cObj(p.id);
  if(o&&p.end&&p.end!=="miss"&&(p.a==="me"||p.t==="me"||p.kn)){o.done=S.turn;log(`<i>${o.name} (${o.from}): ${o.trace}.</i>`)}}catch(e){}return r}}
/* register */
function j70cReg(sd){if(!sd||sd.type!=="route"||!sd.id||J70C[sd.id])return false;const M=M70[sd.m];if(!M||M.R.some(r=>r.id===sd.id))return false;
 J70C[sd.id]=sd;M.R.push(route(sd));return true}/* loaded right after j70.js (inner to every later wrapper: jptime's timed deed, j95b, jtruth); BAL is read lazily */
window.j70cReg=j70cReg;
try{const L=(typeof J70SEEDS!=="undefined"&&Array.isArray(J70SEEDS))?J70SEEDS:[];for(const sd of L)j70cReg(sd)}catch(e){console.error("j70c",e)}
/* the old counter keeps counting the hand-written routes only; composed ones apart (j70cCount) */
{const c0=window.j70Count;if(typeof c0==="function")window.j70Count=function(){const r=c0.apply(this,arguments);try{r.types-=Object.values(M70).reduce((a,M)=>a+M.R.filter(x=>x.cs).length,0)}catch(e){}return r}}
window.j70cCount=function(){const by={};for(const id in J70C){const m=J70C[id].m;by[m]=(by[m]||0)+1}return{routes:Object.keys(J70C).length,methods:by}};
/* the object's trace (law 6c): where the real thing of a composed route ends, for the aftermath / Tai mắt */
window.j70cObj=function(pid){try{const z=j70();return (z.ob||[]).find(o=>o.pl===pid)||null}catch(e){return null}};
})();
