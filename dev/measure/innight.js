/* AG2 bot add-on (evaluate AFTER inpage6.js [+ inag.js + intrace.js]): each life record gets x.nt = who got the Emperor's nights this life:
   {flips, none (he called no one), rest (AG2: he chose to rest), me (her nights), hh (Hoàng hậu), npc (other consorts), top (most nights of one NPC),
    custom (lệ kept), brk (AG2: lệ broken), stolen, mem (AG2: the pick had a remembered deed), busy {ill,duty,court}}.
   Counts one flip per tuần (the first S.nightWhy of that tuần). Works on the base too (AG2 fields stay 0). */
(function(){const N=window.__nt={};const z=()=>{Object.assign(N,{flips:0,none:0,rest:0,me:0,hh:0,npc:0,custom:0,brk:0,stolen:0,mem:0,busy:{},by:{},seen:-1})};z();
 const f0=flip;flip=function(){const r=f0.apply(this,arguments);try{const d=S.nightWhy;if(d&&d.wk===wk()&&N.seen!==d.wk){N.seen=d.wk;N.flips++;const e=d.emp||{};
   if(!d.pick){N.none++;if(e.k==="rest"){N.rest++;const b=e.busy||"calm";N.busy[b]=(N.busy[b]||0)+1}}
   else{const q=typeof queenP==="function"?queenP():null;if(d.pick==="me")N.me++;else if(q&&q!==S&&d.pick===q.id)N.hh++;else{N.npc++;N.by[d.pick]=(N.by[d.pick]||0)+1}
    if(d.cause==="custom")N.custom++;if(d.cause==="stolen")N.stolen++;if(e.cust&&!e.cust.keep)N.brk++;if(e.mem&&e.pick===d.pick)N.mem++}}}catch(x){}return r};
 const P=window.__res.push.bind(window.__res);window.__res.push=function(o){try{if(o&&o.fate){const c=JSON.parse(JSON.stringify(N));c.top=Math.max(0,...Object.values(c.by));delete c.by;delete c.seen;o.nt=c}}catch(e){}z();return P(o)}})();
