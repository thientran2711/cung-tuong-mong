/* rvbot "studying player" policy (balance-core-r3 §7 re-measure, D #11 order 20/11): a player who studies takes ONE lesson a tuần (≈ 3 a month,
   §7's "Học với thầy, 3 buổi/tháng") in her focus art = the art of her identity row (originArts, BAL.orig.art) she is best at, else her best art.
   Teacher (lesson) when Bạc ≥ fee + 20, else free self-study (lessonMode "self") when the build has it. Same file for the main and the branch arm.
   INP2=…,instudy.js with runb.js sens. Counts land in each life row: x.study={t,s} (teacher / self lessons). */
(function(){let wkDone="",n={t:0,s:0};
 const focus=()=>{const A=ARTS.map(a=>a.k).filter(k=>(S.arts[k]||0)<5);if(!A.length)return null;let R={};try{R=typeof originArts==="function"?originArts(S.origin&&S.origin.k):{}}catch(e){}
  const road=A.filter(k=>k in R),L=road.length?road:A;return L.sort((a,b)=>(typeof artPts==="function"?artPts(S,b)-artPts(S,a):(S.arts[b]||0)-(S.arts[a]||0)))[0]};
 const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&!S.srv&&!S.out&&!Q.length&&!S.mg){const w=S.turn+"_"+S.tuan;if(w!==wkDone&&can(2)){const k=focus();
   if(k){const fee=typeof tchFee==="function"?tchFee(k):5+(S.arts[k]||0)*5;wkDone=w;
    if(S.bac>=fee+20){lesson(k);n.t++}else if(typeof lessonMode==="function"){lessonMode(k,"self");n.s++}
    if(S.mg||Q.length)return}}}}catch(e){}return nb.apply(this,arguments)};window.nextBuoi=nextBuoi;
 const st=start;start=function(){try{const R=window.__res,x=R&&R[R.length-1];if(x&&!x.study)x.study=Object.assign({},n)}catch(e){}/* HH-STOP rows skip over(): attach at the next start */n={t:0,s:0};wkDone="";return st.apply(this,arguments)};
 const ov=over;over=function(){const r=ov.apply(this,arguments);try{const x=window.__res[window.__res.length-1];if(x)x.study=Object.assign({},n)}catch(e){}return r};
})();
