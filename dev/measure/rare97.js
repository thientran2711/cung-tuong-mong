/* j97 bot add-on (load after inpage6.js): a good player notices the glowing «Cơ duyên hiếm» option and takes it; per-life rare stats in window.__r97res */
(function(){window.__r97res=window.__r97res||[];window.__r97pick=window.__r97pick==null?1:window.__r97pick;
const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(window.__r97pick&&m&&m.opts){const j=m.opts.findIndex(o=>o&&o.r97);if(j>=0)i=j}}catch(e){}return c0.call(this,i)};
const o0=over;over=function(h,t,fate){try{if(S&&!S.dead){const c=S.st&&S.st.ch;window.__r97res.push({origin:S.origin.k,turns:S.turn,rank:S.rank,fate:String(fate).slice(0,60),
 rare:(S.r97||[]).map(x=>x.a),g:S.r97s||{n:0,c:0,ok:0},chap:c?c.past.filter(x=>x.a).length:0,arcs:c?c.past.filter(x=>x.a).map(x=>x.a+":"+x.k):[]})}}catch(e){}return o0.apply(this,arguments)}})();
