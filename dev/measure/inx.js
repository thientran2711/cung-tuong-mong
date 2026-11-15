/* extra per-life counters for runb.js (env INP2=inx.js): her births and birth risk, accusations / frames / falls against her, rank drops by reason, weeks per rank.
   Attached to each life record as x.ix when the bot records the life. */
(function(){const Z=()=>({births:0,bRisk:[],accAt:0,accOk:0,falls:0,dem:{},rkW:{},cold:0,on:{}});window.__ix=Z();let lastK="";
 const R0=window.__res;R0.push=function(x){try{x.ix=window.__ix}catch(e){}window.__ix=Z();lastK="";return Array.prototype.push.call(this,x)};
 const b0=birthP;birthP=function(p,fake){if(p===S&&!fake){try{window.__ix.births++;window.__ix.bRisk.push(birthRisk(S))}catch(e){}}return b0.apply(this,arguments)};
 const A=ACT.accuse,f0=A.f;A.f=function(a,t){const r=f0.apply(this,arguments);try{if(t===S&&a!==S){window.__ix.accAt++;if(/thành/.test(String(r))&&!/không thành/.test(String(r)))window.__ix.accOk++}}catch(e){}return r};
 const ra=runAct;runAct=function(a,t,k){const S0=S&&S.suc;const r=ra.apply(this,arguments);try{if(t===S&&a&&a!==S&&r){const o=window.__ix.on[k]=window.__ix.on[k]||[0,0];o[0]++;if(typeof FAILRX==="object"&&!FAILRX.test(String(r)))o[1]++}}catch(e){}return r};
 const fa=fall;fall=function(p){if(p===S)window.__ix.falls++;return fa.apply(this,arguments)};
 const c0=cold;cold=function(){window.__ix.cold++;return c0.apply(this,arguments)};
 const lg=log;log=function(t){try{const x=String(t).replace(/<[^>]+>/g,"");if(/^Ngươi/.test(x)&&/bị giáng|bị cấm túc/.test(x)){const k=x.replace(/-?\d+/g,"#").replace(/(giáng xuống) [^.,]+/,"$1 _").slice(0,90);window.__ix.dem[k]=(window.__ix.dem[k]||0)+1}}catch(e){}return lg.apply(this,arguments)};
 const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&!S.srv){const k=S.turn+"_"+S.tuan;if(k!==lastK){lastK=k;const r=rkOf(S);window.__ix.rkW[r]=(window.__ix.rkW[r]||0)+1}}}catch(e){}return nb.apply(this,arguments)};
})();
