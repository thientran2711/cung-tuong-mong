/* coordinator 15/11: more "man" faces for the princess suitors (jht ctFace reads img/FIGURES-congtu.json, never the men pool).
   FIGURES-congtu.json now also holds quytu-1..9 (4 age bands each) and bacdich-1. jht keeps CTIX / ctFace private, so this works through
   the state its closure reads: the Bắc Địch prince (j54 hW, house "Bắc Địch") gets cf "bacdich-1" preset (ctFace keeps a preset cf), and
   "bacdich-1" sits in S.ctUsed so ordinary suitors only take it when every other face is live. */
(function(){if(typeof window.h54Face!=="function")return;const h0=window.h54Face;
 window.h54Face=h54Face=function(s){try{if(S){S.ctUsed=Array.isArray(S.ctUsed)?S.ctUsed:[];if(!S.ctUsed.includes("bacdich-1"))S.ctUsed.push("bacdich-1")}
   if(s&&s.house==="Bắc Địch"&&s.cf!=="bacdich-1")s.cf="bacdich-1"}catch(e){}return h0.apply(this,arguments)}})();
