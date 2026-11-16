/* per-life mood-bar counters for runb.js (env INP2=...,inmood.js) — review/mood-bar (D12, jmood). Attached to each life record as x.md:
   tuần sampled, mean v, mean |v|, share of tuần at |v| ≥ 60 (hi / lo), longest streak at an extreme, min / max, odds shift applied to her acts
   (count, mean, max points), comfort visits, locked show-off cards, thiện cảm points added / removed by mood, extra jealousy, weekly histogram. */
(function(){const Z=()=>({wk:0,sum:0,abs:0,hi:0,lo:0,run:0,maxRun:0,mn:0,mx:0,hist:{}});window.__md=Z();
 const R0=window.__res;const p0=R0.push;R0.push=function(x){try{const N=window.MOOD_N||{};x.md=Object.assign({},window.__md,{cskip:N.cskip||{},odN:N.odN||0,odSum:N.odSum||0,odMax:N.odMax||0,comfort:N.comfort||0,lock:N.lock||0,aff:N.aff||0,ghen:N.ghen||0,acts:N.acts||0,push:N.pushes||{}});
  if(window.MOOD_N)Object.assign(window.MOOD_N,{wk:0,hist:{},ext:0,hi:0,lo:0,odN:0,odSum:0,odMax:0,comfort:0,lock:0,aff:0,ghen:0,acts:0,pushes:{},cskip:{}})}catch(e){}window.__md=Z();return p0.apply(this,arguments)};
 const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead&&S.mood&&typeof S.mood.v==="number"){const m=window.__md,v=S.mood.v,X=(BAL.mood&&BAL.mood.band)?BAL.mood.band[3]:60;
   m.wk++;m.sum+=v;m.abs+=Math.abs(v);if(v>=X)m.hi++;if(v<=-X)m.lo++;if(Math.abs(v)>=X){m.run++;m.maxRun=Math.max(m.maxRun,m.run)}else m.run=0;m.mn=Math.min(m.mn,v);m.mx=Math.max(m.mx,v);const b=Math.round(v/20)*20;m.hist[b]=(m.hist[b]||0)+1}}catch(e){}return r};
})();
