/* dev/test/lib/coop-lag-hooks.js — the CO-OP lag hooks of dev/test/coop-lag.js, EXPORTED (ROBOT-10 ORDER #7: "export the co-op hooks so Foreman B's co-op runners record them too").
   USE IN ANY CO-OP RUNNER (two real clients A / B):
     const H=require('./lib/coop-lag-hooks.js');                          // from dev/test; adjust the path
     for each context:  await ctx.addInitScript(H.WSLOG);  await ctx.addInitScript(PP.INIT);   // every socket frame logged + long tasks / event timing
     after both are in the world:  await page.evaluate(PP.RESET); await page.evaluate(()=>{window.__wsl.length=0});  // start the measured window
     at the end:  const m=await H.collect(A.p,B.p,{turns:[{ms}…],rejoin:{ms},nbTurns:N,playMin,errs:A.errs.length+B.errs.length}); → m.metrics = the same coop* keys as coop-lag.js
     H.verdict(m.metrics, budget)  → ['coopTurnP95 12000 > 10000', …] (empty = inside play-perf-budget.json)
   Metrics: coopTurnP95 · coopTurnsOk · coopActionP95 · coopActionMax · coopSyncKBMax · coopKBPerMin · coopResendPerMin · coopRejoinMs · coopLongTasksPerMin · coopLongTaskMax · pageErrors
   (desync / stall count = coopTurnsOk below N/N). Everything below is the code that used to live inline in coop-lag.js (unchanged behaviour). */
const PP=require('./playperf');
/* socket frame log + a key watcher (week:buổi, the time it changed) */
const WSLOG=()=>{const W=window.WebSocket;if(!W||W.__lagwrap)return;const log=window.__wsl=[];const ty=s=>{try{if(typeof s!=='string')return'bin';const m=/"t":"([^"]+)"/.exec(s.slice(0,200));return m?m[1]:'?'}catch(e){return'?'}};
 const sz=s=>typeof s==='string'?new Blob([s]).size:(s&&(s.byteLength||s.size))||0;
 const P=W.prototype.send;W.prototype.send=function(d){try{log.push({d:'up',t:Date.now(),b:sz(d),ty:ty(d),h:typeof d==='string'?d.length+':'+d.slice(-40):''})}catch(e){}return P.apply(this,arguments)};
 function NW(u,p){const ws=p===undefined?new W(u):new W(u,p);ws.addEventListener('message',e=>{try{log.push({d:'dn',t:Date.now(),b:sz(e.data),ty:ty(e.data),h:typeof e.data==='string'?e.data.length+':'+e.data.slice(-40):''})}catch(x){}});return ws}
 NW.prototype=W.prototype;['CONNECTING','OPEN','CLOSING','CLOSED'].forEach(k=>NW[k]=W[k]);NW.__lagwrap=1;window.WebSocket=NW;
 window.__kch={};setInterval(()=>{try{if(typeof S==='undefined'||!S||!window.COOP)return;const c=window.COOP,s=c.state||{};const k=(c.week!=null?c.week:(s.week||0))+':'+(S.buoi||0);if(window.__kcur!==k){window.__kcur=k;window.__kch[k]=Date.now()}}catch(e){}},25)};
const CO=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
 const on=typeof c.on==='boolean'?c.on:!!(s.playing||(s.status&&s.status!=='off'));
 return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),on,frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),
  waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base),key:(c.week!=null?c.week:(s.week||0))+':'+(typeof S!=='undefined'&&S?S.buoi||0:'-')}};

/* latency of each up frame of one seat to the matching down frame of the other (same type, the next one after it) */
function latencies(la,lb){const lat=[];const match=(up,dn)=>{const used=new Set();for(const u of up.filter(x=>x.d==='up'&&!/^(ping|pong)$/.test(x.ty))){const i=dn.findIndex((x,j)=>!used.has(j)&&x.d==='dn'&&x.ty===u.ty&&x.t>=u.t);if(i>=0&&dn[i].t-u.t<20000){used.add(i);lat.push({ty:u.ty,ms:dn[i].t-u.t,b:u.b})}}};match(la,lb);match(lb,la);return lat}
const resend=l=>{let n=0;const up=l.filter(x=>x.d==='up'&&x.ty!=='ping');for(let i=1;i<up.length;i++)for(let j=i-1;j>=0&&up[i].t-up[j].t<3000;j--)if(up[j].ty===up[i].ty&&up[j].h===up[i].h){n++;break}return n};
/* collect: pages A, B (playwright pages with WSLOG + PP.INIT installed) → {metrics, frames, lat} */
async function collect(pa,pb,o){const la=await pa.evaluate(()=>window.__wsl),lb=await pb.evaluate(()=>window.__wsl);const lat=latencies(la,lb);const per={};
 for(const x of la.concat(lb)){const k=x.d+':'+x.ty;(per[k]=per[k]||{n:0,b:0,max:0});per[k].n++;per[k].b+=x.b;per[k].max=Math.max(per[k].max,x.b)}
 const snA=await pa.evaluate(PP.SNAP),snB=await pb.evaluate(PP.SNAP);const lts=snA.lt.concat(snB.lt).map(x=>x.d);const turnMs=(o.turns||[]).map(x=>x.ms).filter(x=>x>=0);const playMin=o.playMin||.1;
 const rj=o.rejoin||{ms:-1};
 const metrics={coopTurnP95:PP.pct(turnMs,95),coopTurnsOk:turnMs.length+'/'+(o.nbTurns!=null?o.nbTurns:turnMs.length),coopActionP95:PP.pct(lat.map(x=>x.ms),95),coopActionMax:lat.length?Math.max(...lat.map(x=>x.ms)):0,
  coopSyncKBMax:Math.round(Math.max(0,...la.concat(lb).map(x=>x.b))/1024*10)/10,coopKBPerMin:Math.round(la.concat(lb).reduce((s,x)=>s+x.b,0)/1024/2/Math.max(.1,playMin)*10)/10,
  coopResendPerMin:Math.round((resend(la)+resend(lb))/2/Math.max(.1,playMin)*10)/10,coopRejoinMs:rj.ms,coopLongTasksPerMin:Math.round(lts.length/2/Math.max(.1,playMin)*10)/10,coopLongTaskMax:lts.length?Math.max(...lts):0,
  pageErrors:o.errs||0};
 return{metrics,frames:per,lat,snA,snB}}
/* budget check: the coop* keys of play-perf-budget.json (default ∪ coop) */
function verdict(metrics,BUDGET){const bud=Object.assign({},BUDGET.default,BUDGET.coop||{});const over=[];for(const [k,v] of Object.entries(bud)){if(!k.startsWith('coop'))continue;const m=metrics[k];if(m===undefined||typeof m!=='number')continue;if(m>v)over.push(k+' '+m+' > '+v)}return over}
module.exports={WSLOG,CO,latencies,resend,collect,verdict};
