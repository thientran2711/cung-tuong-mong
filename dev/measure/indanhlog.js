/* diff-remeasure (indanhlog.js; review/danh-balance owns indanh.js): where her Danh goes (after inpromo.js): x.ix.danh["<rank>: <cause>"] = Danh lost, cause = the log line written with the drop;
   x.ix.danhG["<rank>: <cause>"] = Danh gained. Read-only. */
(function(){let d0=null;const key=t=>String(t).replace(/<[^>]+>/g,"").replace(/-?\d+/g,"#").slice(0,60);
 const lg=log;log=function(t){try{if(S&&!S.dead&&!S.srv&&window.__ix){if(d0!=null&&S.danh!==d0){const D=window.__ix[S.danh<d0?"danh":"danhG"]=window.__ix[S.danh<d0?"danh":"danhG"]||{};const k=rkOf(S)+": "+key(t);D[k]=(D[k]||0)+Math.abs(d0-S.danh)}d0=S.danh}}catch(e){}return lg.apply(this,arguments)};
 const st=start;start=function(){d0=null;return st.apply(this,arguments)};})();
