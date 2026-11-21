const fs=require('fs');const D=[].concat(...process.argv.slice(2).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(f))));
const cl=(x,a,b)=>Math.max(a,Math.min(b,x));
const val=o=>Object.entries(o||{}).reduce((s,[k,v])=>s+(k==="hh"?v/3:v),0);
function odds(d,M){let o=M.b;for(const k in M.w)o+=(k==="sac"?d.sac:d[k])*M.w[k];o+=Math.round(d.art*M.art)+d.fit+d.mm+d.pen;return cl(Math.round(o),5,95)}
function ev(d,M,N,soc){const p=odds(d,M)/100;const s=N+val(M.win)-(soc?(M.rel+M.ghen)*.2+(M.hh||0)/3:0);return p*s+(1-p)*val(M.lose)}
function share(P,N,soc,sub){let f=0,r=0,t=0,close=0,n=0;for(const d of D){if(sub&&!sub(d))continue;n++;const a=ev(d,P.feign,N,soc),b=ev(d,P.road,N,soc);const E=[[a,'f'],[b,'r'],[0,'t']].sort((x,y)=>y[0]-x[0]);
 if(E[0][1]==='f')f++;else if(E[0][1]==='r')r++;else t++;if(E[0][0]-E[1][0]<1)close++}
 return {f:Math.round(100*f/n),r:Math.round(100*r/n),t:Math.round(100*t/n),close:Math.round(100*close/n),n}}
module.exports={D,odds,ev,share,val};
if(require.main===module){const P=JSON.parse(process.argv.find(a=>a.startsWith('{'))||'null')||{feign:{b:34,w:{sung:.35,sac:.05},art:.5,win:{},lose:{sung:-3,duc:-1},rel:10,hh:0,ghen:15},road:{b:12,w:{sac:.35,sung:.05},art:1.5,win:{sung:6,danh:2},lose:{sung:-5,danh:-2},rel:25,hh:4,ghen:30}};
 let bad=0;for(const d of D){if(odds(d,P.feign)!==d.of||odds(d,P.road)!==d.or)bad++}console.log('states',D.length,'model≠game odds',bad);
 for(const soc of [0,1])for(const N of [8,15,25]){const a=share(P,N,soc),h=share(P,N,soc,d=>d.me),c=share(P,N,soc,d=>!d.me);console.log(`N ${N} soc ${soc}: all T${a.f} C${a.r} Thôi${a.t} close${a.close} | her T${h.f} C${h.r} Thôi${h.t} | npc T${c.f} C${c.r} Thôi${c.t}`)}
 for(const k of ['fav','neu','dis']){const s=share(P,8,0,d=>d.kd===k);console.log(k,s)}}
