/* balance-core r2: her night-choice state every 4 weeks (Sủng, Sắc, art bonus raw, fit, mood…) for dev/measure/bc-night-opt.js. INP2=inns.js with runb.js sens.
   Each life's row in __res gets ns:[{sung,sac,suc,fit,mm,pen,art,kd,of,or,ok,rk}...] */
(function(){let L=[],w0=-1;
 const snap=()=>{try{if(!S||S.dead||!S.emp)return;const w=typeof wk==="function"?wk():S.turn;if(w===w0||w%4)return;w0=w;const a=S;const bb=stBestArt(a),ea=empArt(),A=BAL.steal.art;
  const f=!bb?0:ea?(bb.k===ea.f?A.fav:bb.k===ea.d?-A.dis:A.neu):A.neu;
  L.push({me:1,w,sung:a.sung||0,sac:effSac(a),suc:a.suc||0,rk:rkOf(a),fit:stealFit(a),mm:mm(),pen:a.suc<30?-15:0,art:bb?BAL.art.odds[bb.l]*f:0,kd:!bb?"none":!ea?"neu":bb.k===ea.f?"fav":bb.k===ea.d?"dis":"neu",know:eaKnows(a)?1:0,of:oSteal(a,"feign"),or:oSteal(a,"road"),ok:oKeep(a)})}catch(e){}};
 const et=endTurn;endTurn=function(){snap();return et.apply(this,arguments)};
 const st=start;start=function(){L=[];w0=-1;return st.apply(this,arguments)};
 const ov=over;over=function(){const r=ov.apply(this,arguments);try{const x=window.__res[window.__res.length-1];if(x)x.ns=L}catch(e){}return r};
})();
