/* npc-agent AG1 bot add-on (evaluate AFTER inpage6.js): each life record gets x.agx = {nights: her nights, years, npcBirths (births of NPC
   consorts this life), npcNights (NPC nights this life), sung/th/suc = NPC means at the end, acts/ticks of the agent loop, p95 ms}.
   Build a combined bot file: cat inpage6.js inag.js > <scratch>/inag6.js and pass it as run_par.js's INP (path relative to dev/measure). */
(function(){const X=window.__agx={nb:0,nn:0};
 if(typeof birthP==="function"){const b0=birthP;birthP=function(p,fake){try{if(p&&p!==S&&!fake)X.nb++}catch(e){}return b0.apply(this,arguments)}}
 if(typeof rivalNight==="function"){const r0=rivalNight;rivalNight=function(){X.nn++;return r0.apply(this,arguments)}}
 const P=window.__res.push.bind(window.__res);window.__res.push=function(o){try{if(o&&o.fate&&S){const L=liveRivals(true);const m=f=>Math.round(L.reduce((a,v)=>a+(+v[f]||0),0)/Math.max(1,L.length));
   o.agx={nights:S.nights||0,years:+(S.turn/12).toFixed(2),npcBirths:X.nb,npcNights:X.nn,sung:m("sung"),th:m("th"),suc:m("suc"),acts:window.AG?AG.stat.acts:null,ticks:window.AG?AG.stat.tick:null,p95:typeof agPerf==="function"?agPerf().p95:null}}}catch(e){}
  X.nb=0;X.nn=0;if(window.AG){AG.stat.acts=0;AG.stat.tick=0}return P(o)}})();
