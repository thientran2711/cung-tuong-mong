/* per-life counters for runb.js (env INP2=...,inemoact.js) — review/emotion-acts (jemoact). Attached to each life record as x.ea:
   her nết (tr) and temper, tuần sampled, her emotion cards shown / played by kind, her outbursts by reaction and by temper:group,
   her extreme-mood consequences, hỏi tội events, NPC emotion acts / outbursts (kind:reaction) / extreme consequences, NPC outbursts by temper. */
(function(){const Z=()=>({wk:0});window.__ea=Z();
 const R0=window.__res;const p0=R0.push;R0.push=function(x){try{const N=window.EA_N||{};const T=(typeof eaTemper==="function"&&window.__eaTr)||{};
  x.ea=Object.assign({},window.__ea,{tr:window.__eaTr0||"",temper:window.__eaT0||"",cards:N.cards||{},play:N.play||{},out:N.out||{},outT:N.outT||{},ext:N.ext||{},hoi:N.hoi||0,hoiMe:N.hoiMe||0,
   npcAct:N.npcAct||{},npcOut:N.npcOut||{},npcOutT:N.npcOutT||{},npcExt:N.npcExt||{}});
  if(window.EA_N)for(const k in window.EA_N)window.EA_N[k]=typeof window.EA_N[k]==="number"?0:{}}catch(e){}window.__ea=Z();window.__eaTr0="";return p0.apply(this,arguments)};
 const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){window.__ea.wk++;if(!window.__eaTr0&&typeof traitsOf==="function"){window.__eaTr0=(traitsOf(S)||[])[0]||"";window.__eaT0=typeof eaTemper==="function"?eaTemper(S).k:""}}}catch(e){}return r};
})();
