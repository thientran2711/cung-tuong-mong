const fs=require('fs');const opt=require('./bc-night-opt.js');
const NPC=[].concat(...['st5100.json','st7300.json'].map(f=>JSON.parse(fs.readFileSync(f)))).filter(d=>!d.me);const HER=JSON.parse(fs.readFileSync('her_sens.json'));
function sh(P,N,soc,D){opt.D.length=0;opt.D.push(...D);return opt.share(P,N,soc)}
const CASES=[[8,0,1],[15,0,1],[8,1,1],[15,1,1],[25,0,.5],[25,1,.5]];
function pen(P){let s=0,rep=[];for(const [N,soc,w] of CASES)for(const [D,dw,nm] of [[NPC,1,'npc'],[HER,1.5,'her']]){const a=sh(P,N,soc,D);if(N!==25)rep.push(`${nm}N${N}s${soc}:${a.f}/${a.r}/${a.t}`);
 for(const x of [a.f,a.r])s+=w*dw*(Math.max(0,20-x)+Math.max(0,x-60));s+=w*dw*Math.max(0,a.t-60)}const AL=NPC.concat(HER);const med=M=>{const a=AL.map(d=>opt.odds(d,M)).sort((x,y)=>x-y);return a[a.length>>1]};const gap=med(P.feign)-med(P.road);s+=3*Math.max(0,8-gap);
 const fv=sh(P,15,0,AL.filter(d=>d.kd==='fav')).r,ds=sh(P,15,0,AL.filter(d=>d.kd==='dis')).r;s+=Math.max(0,30-(fv-ds));rep.push(`gap${gap} favdis${fv}-${ds}`);
 return [s,rep.join(' ')]}
const pk=a=>a[Math.floor(Math.random()*a.length)];const R=[];const n=+process.env.NS||3000;
for(let i=0;i<n;i++){
 const P={feign:{b:pk([26,30,34,38]),w:{sung:pk([.2,.25,.3,.35,.4]),sac:pk([0,.05,.1])},art:pk([.5,.75]),win:(x=>x?{sung:x}:{})(pk([0,1,2])),lose:{sung:pk([-2,-3,-4]),duc:-1},rel:pk([8,10]),hh:0,ghen:pk([12,15])},
  road:{b:pk([-8,-4,0,4,8,12]),w:{sac:pk([.25,.3,.35,.4]),sung:pk([.05,.1,.15,.2,.25])},art:pk([1.25,1.5,2]),win:{sung:pk([6,8,10,12]),danh:pk([2,3])},lose:{sung:pk([-4,-5,-6,-8]),danh:-2},rel:pk([12,15,18]),hh:pk([2,3]),ghen:pk([18,20,24])}};
 const [s,rep]=pen(P);R.push([s,rep,JSON.stringify(P)])}
R.sort((a,b)=>a[0]-b[0]);for(const r of R.slice(0,5))console.log(r[0].toFixed(1),r[1],'\n   ',r[2]);
