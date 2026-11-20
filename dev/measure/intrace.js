/* r1 fault 8 per-cause trace (evaluate AFTER inpage6.js [+ inag.js]): each life record gets x.tr = {
   scenes: AG1b cards shown to her, react: {hear,join,leave,ignore} chosen, khR: khắc she spent on reactions, sucR: Sức she spent on joins,
   aimed: NPC deeds landed ON her by kind, lowSuc: months with her Sức < 40, ill: her illness onsets by kind, empDeadYr, empIll: months the Emperor was ill,
   sucAvg: her mean Sức at month ends, sungAvg }. Works on main too (no jagent → zeros for the agent parts). */
(function(){const T=window.__tr={};const z=()=>{Object.assign(T,{harm:{},scenes:0,react:{},khR:0,sucR:0,aimed:{},lowSuc:0,ill:{},empDeadYr:null,empIll:0,suc:0,sung:0,m:0})};z();
 if(typeof catchIll==="function"){const c0=catchIll;catchIll=function(p,k){const was=illOf(p);const r=c0.apply(this,arguments);try{if(p===S&&!was&&illOf(S))T.ill[k]=(T.ill[k]||0)+1}catch(e){}return r};window.catchIll=catchIll}
 if(typeof illMonth==="function"){const m0=illMonth;illMonth=function(){const r=m0.apply(this,arguments);try{T.m++;T.suc+=S.suc;T.sung+=S.sung;if(S.suc<40)T.lowSuc++;if(illOf(S.emp))T.empIll++;
   if(S.emp&&S.emp.dead&&T.empDeadYr==null)T.empDeadYr=+(S.turn/12).toFixed(1)}catch(e){}return r}}
 if(typeof runAct==="function"){const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{if(r&&a!==S&&t===S)T.harm[k]=(T.harm[k]||0)+1}catch(e){}return r}}
 if(typeof twDo==="function"){const t0=twDo;twDo=function(a,t,k){const r=t0.apply(this,arguments);try{if(r&&a!==S&&t===S)T.aimed[k]=(T.aimed[k]||0)+1}catch(e){}return r}}
 if(typeof agReact==="function"){const r0=agReact;agReact=function(){const O=r0.apply(this,arguments);T.scenes++;for(const o of O){const g=o.go;o.go=function(){const u0=used,s0=S.suc;T.react[o.r]=(T.react[o.r]||0)+1;const x=g.apply(this,arguments);T.khR+=Math.max(0,used-u0);if(o.r==="join")T.sucR+=Math.max(0,s0-S.suc);return x}}return O};window.agReact=agReact}
 const P=window.__res.push.bind(window.__res);window.__res.push=function(o){try{if(o&&o.fate){o.tr=JSON.parse(JSON.stringify(T));o.tr.sucAvg=T.m?Math.round(T.suc/T.m):null;o.tr.sungAvg=T.m?Math.round(T.sung/T.m):null;o.tr.empAge=S.emp&&S.emp.age}}catch(e){}z();return P(o)}})();
