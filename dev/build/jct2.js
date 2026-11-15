/* coordinator 15/11: more "man" faces for the princess suitors (jht ctFace reads img/FIGURES-congtu.json, never the men pool).
   FIGURES-congtu.json now also holds quytu-1..9 (4 age bands each) and bacdich-1. jht keeps CTIX / ctFace private, so this works through
   the state its closure reads: the Bắc Địch prince (j54 hW, house "Bắc Địch") gets cf "bacdich-1" preset (ctFace keeps a preset cf).
   bacdich-1 is his alone: while an ordinary suitor picks a face, a stand-in pool entry holding "bacdich-1" makes ctFace treat it as live
   (ctFace's fallback takes any face not live once S.ctUsed has seen them all; reviewer r7: 15 of 40 churn rounds gave it to a suitor). */
(function(){if(typeof window.h54Face!=="function")return;const h0=window.h54Face,BD="bacdich-1";
 window.h54Face=h54Face=function(s){let P=null,hold=null;try{if(s&&s.house==="Bắc Địch"){if(s.cf!==BD)s.cf=BD}
   else if(s&&S&&typeof h54Pool==="function"){if(s.cf===BD)delete s.cf;if(!s.cf){P=h54Pool();hold={cf:BD};P.push(hold)}}}catch(e){}
  try{return h0.apply(this,arguments)}finally{if(P&&hold){const i=P.indexOf(hold);if(i>=0)P.splice(i,1)}}}})();
