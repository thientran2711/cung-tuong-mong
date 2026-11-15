/* balance-pass: what holds her rank (after inx.js). Once per tuần, while she is below Hoàng hậu, every unmet row of promoReqP(S)
   (numbers dropped) is counted per rank: x.ix.pr["<rank>: <row>"] = tuần spent blocked by that row. Read-only. */
(function(){if(typeof promoReqP!=="function")return;let lastK="";
 const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&!S.srv&&rkOf(S)<7&&window.__ix){const k=S.turn+"_"+S.tuan;if(k!==lastK){lastK=k;const P=window.__ix.pr=window.__ix.pr||{};
   for(const [ok,t] of promoReqP(S))if(!ok){const key=rkOf(S)+": "+String(t).replace(/<[^>]+>/g,"").replace(/\(.*$/,"").replace(/-?\d+/g,"#").trim().slice(0,50);P[key]=(P[key]||0)+1}}}}catch(e){}return nb.apply(this,arguments)};
})();
/* where her Đức goes and why she is punished: x.ix.duc["<cause>"] = Đức lost (from apply/ap deltas, cause = the latest log line),
   x.ix.pun["<why> s<sev>"] = punishments (punish(S, why, sev)) */
(function(){let d0=null;const key=t=>String(t).replace(/<[^>]+>/g,"").replace(/-?\d+/g,"#").slice(0,60);
 /* a drop seen when a log line is written is put on that line (the game applies, then logs what happened) */
 const lg=log;log=function(t){try{if(S&&!S.dead&&window.__ix){if(d0!=null&&S.duc<d0){const D=window.__ix.duc=window.__ix.duc||{};const k=key(t);D[k]=(D[k]||0)+(d0-S.duc)}d0=S.duc}}catch(e){}return lg.apply(this,arguments)};
 const st=start;start=function(){d0=null;return st.apply(this,arguments)};
 const pu=punish;punish=function(p,why,sev){try{if((p===S||p==="me")&&window.__ix){const P=window.__ix.pun=window.__ix.pun||{};const k=key(why).slice(0,50)+" s"+sev;P[k]=(P[k]||0)+1}}catch(e){}return pu.apply(this,arguments)};
})();
