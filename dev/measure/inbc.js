/* balance-core (review/balance-core): monthly trace of EVERY stat for her and the NPC consorts (start values + growth per month per origin).
   INP2=inbc.js with runb.js sens. Each life's row in __res gets bc:{me:[[month,sac,tai,tamco,duc,danh,sung,bac,suc,artSum,artMax,virSum,lessons]...],npc:[[month,avgTai,avgSac,avgArtSum,maxArt]...]} */
(function(){let L={me:[],npc:[],les:0,lv:{}},m0=-1;
 const snap=()=>{try{if(!S||S.dead)return;const t=S.turn||0;if(t===m0)return;m0=t;const A=S.arts||{},V=S.vir||{};const av=Object.values(A),vv=Object.values(V);
  L.me.push([t,S.sac,S.tai,S.tamco,typeof ducOf==="function"?ducOf(S):S.duc,S.danh,S.sung,S.bac,S.suc,av.reduce((a,b)=>a+b,0),Math.max(0,...av),vv.reduce((a,b)=>a+b,0),L.les,S.rank]);
  const R=liveRivals(true).filter(v=>v.arts);if(R.length){const f=k=>Math.round(R.reduce((a,v)=>a+(v[k]||0),0)/R.length);
   L.npc.push([t,f("tai"),f("sac"),+(R.reduce((a,v)=>a+Object.values(v.arts).reduce((x,y)=>x+y,0),0)/R.length).toFixed(1),Math.max(...R.map(v=>Math.max(0,...Object.values(v.arts))))])}}catch(e){}};
 const et=endTurn;endTurn=function(){snap();return et.apply(this,arguments)};
 const aa=addArt;addArt=function(k,g){L.les++;const r=aa.apply(this,arguments);try{const l=S.arts[k];if(!L.lv[k+l])L.lv[k+l]=S.turn}catch(e){}return r};
 const st=start;start=function(){L={me:[],npc:[],les:0,lv:{}};m0=-1;return st.apply(this,arguments)};
 const ov=over;over=function(){const r=ov.apply(this,arguments);try{const x=window.__res[window.__res.length-1];if(x)x.bc={me:L.me,npc:L.npc,lv:L.lv}}catch(e){}return r};
})();
