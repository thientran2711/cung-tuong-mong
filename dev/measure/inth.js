/* review/personality probe: where does Thái hậu regard (S.th) come from? sums positive/negative th by caller (stack frames). */
(function(){window.__thSrc={};const a0=apply;apply=function(o){try{if(o&&o.th){const st=(new Error().stack||"").split("\n").slice(2,6).map(l=>(l.match(/at (\S+)/)||[])[1]||"?").filter(n=>!/^(apply|Object\.apply|eval)$/.test(n)).slice(0,3).join("<");
 const k=st+" | "+(window.__lastAct||"");const e=window.__thSrc[k]=window.__thSrc[k]||[0,0,0];if(o.th>0)e[0]+=o.th;else e[1]+=o.th;e[2]++}}catch(e){}return a0.apply(this,arguments)};
 const r0=runOpt;runOpt=function(a){window.__lastAct=a&&a.n||"";try{return r0.apply(this,arguments)}finally{window.__lastAct=""}};
 const x0=window.__bot.extra;window.__bot.extra=function(){const r=x0();r.thSrc=Object.entries(window.__thSrc).sort((a,b)=>b[1][0]-a[1][0]).slice(0,40);return r}})();
