/* per-life counters for runb.js (env INP2=...,inemoact.js) — review/emotion-acts (jemoact). Attached to each life record as x.ea:
   her nết (tr) and temper, tuần sampled, her emotion cards shown / played by kind, her outbursts by reaction and by temper:group,
   her extreme-mood consequences, hỏi tội events, NPC emotion acts / outbursts (kind:reaction) / extreme consequences, NPC outbursts by temper; emotion-acts-2: say = lines by kind:seen/hid, misc = quở trách ±, pillow grades moved, tablets not turned. */
(function(){const Z=()=>({wk:0});window.__ea=Z();
 const R0=window.__res;const p0=R0.push;R0.push=function(x){try{const N=window.EA_N||{};const T=(typeof eaTemper==="function"&&window.__eaTr)||{};
  x.ea=Object.assign({},window.__ea,{tr:window.__eaTr0||"",temper:window.__eaT0||"",cards:N.cards||{},play:N.play||{},out:N.out||{},outT:N.outT||{},ext:N.ext||{},hoi:N.hoi||0,hoiMe:N.hoiMe||0,
   npcAct:N.npcAct||{},npcOut:N.npcOut||{},npcOutT:N.npcOutT||{},npcExt:N.npcExt||{},say:Object.assign({},window.EA_SAY||{}),misc:{quoUp:N.quoUp||0,quoDn:N.quoDn||0,pillow:N.pillow||0,noFlip:N.noFlip||0,lock:N.lock||0},
   /* emotion-acts-3: the Emperor's death and her standing at that moment (tuẫn táng cluster of review r1), end-of-life Thái hậu regard, hits on her */
   empD:window.__eaEmpD||null,th:S.th,relAvg:(()=>{try{const L=liveRivals(true);return L.length?Math.round(L.reduce((a,v)=>a+(v.rel||0),0)/L.length):null}catch(e){return null}})(),oanAvg:(()=>{try{const L=liveRivals(true);return L.length?Math.round(L.reduce((a,v)=>a+(v.oan||0),0)/L.length):null}catch(e){return null}})(),thDead:!!S.thDead,hitMe:N.hitMe||{}});window.__eaEmpD=null;
  if(window.EA_SAY)for(const k in window.EA_SAY)delete window.EA_SAY[k];
  if(window.EA_N)for(const k in window.EA_N)window.EA_N[k]=typeof window.EA_N[k]==="number"?0:{}}catch(e){}window.__ea=Z();window.__eaTr0="";return p0.apply(this,arguments)};
 try{const d0=emperorDies;emperorDies=function(){try{window.__eaEmpD={y:+(S.turn/12).toFixed(1),age:S.emp&&S.emp.age,kids:S.kids.length,sung:S.sung,duc:S.duc,th:S.th,thDead:!!S.thDead,rank:S.rank,why:S.mort&&(S.mort.empWhy||S.mort.empDue)||""}}catch(e){}return d0.apply(this,arguments)}}catch(e){}
 const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){window.__ea.wk++;if(!window.__eaTr0&&typeof traitsOf==="function"){window.__eaTr0=(traitsOf(S)||[])[0]||"";window.__eaT0=typeof eaTemper==="function"?eaTemper(S).k:""}}}catch(e){}return r};
})();
