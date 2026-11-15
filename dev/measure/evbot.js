/* EVENT-CHOICE BALANCE BOTS (owner 11/15 15:10Z): three players that play every ACT the same sensible way (dev/measure/inpage4.js) and differ
   ONLY in how they answer EVENT choices (items built by pushDil / pushFront / mkP, j67 chapters, j68 events, j72 offers, kit choice panels):
     hint  reads what the player sees: the "Gợi ý" line + the risk tag (an toàn / có rủi ro / liều) + the Tốn row, never the hidden numbers
     rand  picks any affordable option
     same  always takes the first affordable option ("luôn một ô")
   usage: NODE_PATH=$(npm root -g) node dev/measure/evbot.js <url> [steps=40] [modes=hint,rand,same] [seed=1] > out.json
   Each mode plays the same seeds (Math.random seeded) for `steps` × 300 game iterations. Output: per-mode summary + lives. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,ST,MODES,SEED]=process.argv;const STEPS=+ST||40;const modes=(MODES||'hint,rand,same').split(',');const seed0=+SEED||1;
let INP=fs.readFileSync(path.join(__dirname,'inpage4.js'),'utf8');
const HOOK='if(!sens)pickI=rpick(okIdx)[1];';if(!INP.includes(HOOK))throw new Error('inpage4 hook moved');
INP=INP.replace(HOOK,'{const ep=window.__evpick?window.__evpick(m,okIdx):null;if(ep!=null){note("ev_"+window.__evmode);chooseM(ep);return true}}'+HOOK);
const PICK=`(function(){
const W=[[/ân sủng|để mắt|thị tẩm/i,1.6],[/thể diện/i,1.2],[/tiếng hiền|hiền đức/i,1.3],[/người trên hài lòng|Thái hậu hài lòng|Hoàng hậu hài lòng/i,1.1],
 [/tình nghĩa/i,1],[/thất thế/i,.8],[/nắm thêm thóp/i,1],[/được lòng|ưa ngươi hơn|nguôi giận/i,.7],[/con được thương|thương con/i,1],[/được tin|thêm tin/i,1],
 [/bản thân khá lên/i,.6],[/thân thể được giữ/i,1],[/có thêm bạc/i,.4],[/dưỡng sức/i,.3]];
const L=[[/thất đức/i,2.2],[/sinh nghi|trách phạt|bị nghi|bị phạt/i,2.2],[/lạt lẽo/i,1.6],[/mất thể diện/i,1.2],[/thân thể bị hại/i,2.4],[/con thiệt|con bị lạnh nhạt/i,1.2],
 [/kết oán|sẽ thù/i,.9],[/phật ý|để bụng/i,1],[/mất lòng|không ưa/i,.6],[/lộ sơ hở/i,1],[/sứt mẻ/i,1],[/được lợi/i,.6],[/bản thân sút/i,.6],[/hao bạc/i,.3],[/hao sức/i,.3],[/có cái giá/i,.8],[/có hại/i,.8]];
function sc(txt,T){let s=0;for(const [re,w] of T)if(re.test(txt))s+=w;return s}
window.__hintScore=function(h,risk,ton){h=String(h||"");const i=h.search(/;\\s*nhưng|,\\s*nhưng/);const g=i<0?h:h.slice(0,i),l=i<0?"":h.slice(i);
 let s=sc(g,W)-sc(l,L);if(/có lợi về/.test(g)&&!sc(g,W))s+=.5*(g.split(",").length);if(/chẳng được gì|không được gì/.test(g))s-=.2;
 s+=risk==="liều"?-1.6:risk==="có rủi ro"?-.5:0;const b=+(String(ton||"").match(/Bạc\\s*[−-]\\s*(\\d+)/)||[])[1]||0,su=+(String(ton||"").match(/Sức\\s*[−-]\\s*(\\d+)/)||[])[1]||0;
 s-=b*(S.bac<60?.02:.008)+su*(S.suc<45?.06:.02);return s};
window.__evpick=function(m,okIdx){const mode=window.__evmode;if(!mode||!m||!(m.pid||m.pp||(m.kit&&m.kit.kind==="choice")))return null;
 const ok=okIdx.filter(([o])=>!(typeof o.lk==="function"&&o.lk()));if(!ok.length)return null;
 if(mode==="same")return ok[0][1];if(mode==="rand")return ok[Math.floor(Math.random()*ok.length)][1];
 const M=document.getElementById("modal");let best=-1e9,bi=ok[0][1];
 for(const [o,i] of ok){const b=M&&M.querySelector('.opt[data-m="'+i+'"]');const h=b?((b.querySelector(".khint")||{}).textContent||""):"";const r=b?((b.querySelector(".krisk")||{}).textContent||""):"";
  const t=b?((b.querySelector(".kr-ton .krv")||{}).textContent||""):"";const v=window.__hintScore(h,r,t)+Math.random()*.01;if(v>best){best=v;bi=i}}
 window.__hintSeen=(window.__hintSeen||0)+1;return bi};
/* outcome counters for this life (reset by over) */
window.__pun=0;window.__dem=0;window.__deathWhy="";
{const p0=punish;punish=function(p,why,sev){if(p===S||p==="me")window.__pun++;return p0.apply(this,arguments)}}
{const o0=over;over=function(h,t,fate){try{const r=window.__res;setTimeout(()=>{},0)}catch(e){}window.__lastEnd={pun:window.__pun,dem:window.__dem};window.__pun=0;window.__dem=0;return o0.apply(this,arguments)}}
})();`;
async function run(b,mode,seed){const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.addInitScript(([sd])=>{let s=sd*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  try{const g=crypto.getRandomValues.bind(crypto);crypto.getRandomValues=a=>{for(let i=0;i<a.length;i++)a[i]=Math.floor(Math.random()*4294967296)>>>0;return a}}catch(e){}},[seed]);
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});await p.evaluate(INP);await p.evaluate(PICK);
 await p.evaluate(([m])=>{window.__evmode=m;/* lives end: remember the counters of that life */const o0=over;over=function(){const r=o0.apply(this,arguments);return r};},[mode]);
 /* tag each finished life with the counters (__res grows inside over) */
 await p.evaluate(()=>{const push0=window.__res.push.bind(window.__res);window.__res.push=function(x){try{x.pun=window.__pun;x.hintN=window.__hintSeen||0;window.__hintSeen=0}catch(e){}return push0(x)}});
 const t0=Date.now();for(let i=0;i<STEPS;i++){await p.evaluate(([m])=>window.__bot.step(m,300),['sens']);if(i%10===9)console.error(mode,seed,'step',i+1,Math.round((Date.now()-t0)/1000)+'s')}
 const res=await p.evaluate(()=>window.__res.map(r=>({o:r.origin,rank:r.rank,max:r.maxRank,yrs:r.years,title:String(r.title||'').slice(0,40),fate:String(r.fate||'').slice(0,70),pun:r.pun||0,hint:r.hintN||0,err:r.err,acts:r.acts?{ev:r.acts['ev_'+window.__evmode]||0,dil:r.acts.dilemma||0}:null})));
 await ctx.close();return{mode,seed,res,errs:errs.slice(0,5)}}
const DEATH=/chết|băng|tự vẫn|qua đời|tạ thế|bị giết|ban rượu|treo cổ|xử tử|độc|lìa đời|mất (?:sớm|khi)|đánh chết/i;
function sum(L){const lives=L.filter(r=>!r.err&&r.title!=='TIMEOUT'&&r.title!=='CRASH');const n=lives.length||1;
 const f=k=>lives.filter(k).length;return{lives:lives.length,avgMax:+(lives.reduce((a,r)=>a+r.max,0)/n).toFixed(2),hh:+(100*f(r=>r.max>=7)/n).toFixed(1),
  phi:+(100*f(r=>r.max>=5)/n).toFixed(1),death:+(100*f(r=>DEATH.test(r.fate+' '+r.title))/n).toFixed(1),early:+(100*f(r=>r.yrs<3)/n).toFixed(1),
  demoted:+(100*f(r=>r.rank<r.max)/n).toFixed(1),pun:+(lives.reduce((a,r)=>a+r.pun,0)/n).toFixed(2),yrs:+(lives.reduce((a,r)=>a+r.yrs,0)/n).toFixed(2),
  evPicks:lives.reduce((a,r)=>a+(r.acts?r.acts.ev:0),0),crash:L.filter(r=>r.title==='CRASH').length}}
(async()=>{const b=await chromium.launch();const seeds=[seed0,seed0+1];const jobs=[];for(const m of modes)for(const s of seeds)jobs.push(run(b,m,s));
 const out=await Promise.all(jobs);await b.close();const S={};for(const m of modes)S[m]=sum(out.filter(x=>x.mode===m).flatMap(x=>x.res));
 console.log(JSON.stringify({steps:STEPS,summary:S,errs:out.flatMap(x=>x.errs).slice(0,6),fates:Object.fromEntries(modes.map(m=>[m,out.filter(x=>x.mode===m).flatMap(x=>x.res).map(r=>r.fate||r.title).slice(0,12)]))},null,1))})().catch(e=>{console.error(e);process.exit(1)});
