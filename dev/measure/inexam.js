/* diff-remeasure: every exam she sits: x.ix.exr = [[to, vir, art, sh, play, total, bar, pass, arts-sum, vir-sum, hh, danh]] (read-only) */
(function(){if(typeof exDone!=="function")return;const d0=exDone;exDone=function(p,r){try{if(p===S&&r&&r.P&&window.__ix){const P=r.P,a=S.arts||{},v=S.vir||{};const sm=o=>Object.values(o).reduce((x,y)=>x+(+y||0),0);
 (window.__ix.exr=window.__ix.exr||[]).push([P.to,P.vir,P.art,P.sh,r.play,r.total,P.bar,r.pass?1:0,sm(a),sm(v),Math.round(S.hh||0),Math.round(S.danh||0)])}}catch(e){}return d0.apply(this,arguments)}})();
