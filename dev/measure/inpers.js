/* review/personality: regard recorder (load after inpage5.js). Adds per life: Thái hậu / Hoàng hậu regard (end, max, at years 1/2/3/5),
   consorts' regard toward her (mean, max, min), her regard toward them, NPC consorts' Thái hậu regard, and the Thái hậu archetype. */
(function(){
const yr={};let mx=-999,mxh=-999,greets=0,greetSum=0;
function snap(){let x={};try{const R=liveRivals(true).filter(v=>!v.queen);const rl=liveRivals(true);
 const m=a=>a.length?+(a.reduce((s,b)=>s+b,0)/a.length).toFixed(1):0;
 x={th:S.th,hh:S.hh,thMax:mx,hhMax:mxh,thY:Object.assign({},yr),relMean:m(rl.map(v=>v.rel||0)),relMax:Math.max(...rl.map(v=>v.rel||0),-999),relMin:Math.min(...rl.map(v=>v.rel||0),999),
  myMean:m(rl.map(v=>(S.rl||{})[v.id]||0)),npcTh:m(R.map(v=>v.th||0)),npcThMax:Math.max(...R.map(v=>v.th||0),-999),arch:S.thArch||S.thTrait||"",greets:(S.grT||[]).length?greets:greets,greetAvg:greets?+(greetSum/greets).toFixed(2):0,arch2:S.thO&&S.thO.arch||""}}catch(e){x={err:String(e)}}return x}
/* attach to EVERY pushed life record (over, TIMEOUT, error) — fixed 16/11: TIMEOUT lives had no pers */
let last=null;const R=window.__res;R.push=function(r){try{if(r&&!r.pers)r.pers=S&&!S.__gone?snap():last}catch(e){}for(const k in yr)delete yr[k];mx=-999;mxh=-999;greets=0;greetSum=0;last=null;return Array.prototype.push.call(this,r)};
const b0=window.__bot.step;window.__bot.step=function(m,n){
 /* sample once per bot step block */
 return b0.call(this,m,n)};
const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead){mx=Math.max(mx,S.th);mxh=Math.max(mxh,S.hh);const y=Math.floor(S.turn/12);if([1,2,3,5].includes(y)&&yr["y"+y]==null)yr["y"+y]=S.th}}catch(e){}return nb.apply(this,arguments)};
/* count Thái hậu thỉnh an: S.th change across a talk / deck act whose name starts with Thỉnh an */
const t0=talk;talk=function(oi){let a=null;try{const p=curPeople()[popIdx];a=p&&p.kind==="th"?talkOpts(p)[oi]:null}catch(e){}const b=S.th;const r=t0.apply(this,arguments);if(a&&/^Thỉnh an/.test(a.n)){greets++;greetSum+=S.th-b}return r};
const a0=act;act=function(i){const a=deck[i];const b=S.th;const r=a0.apply(this,arguments);if(a&&/^Thỉnh an Thái hậu/.test(a.n)){greets++;greetSum+=S.th-b}return r};
})();
