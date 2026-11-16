const {sit,PLAY,DOSE,reseed}=require("./sim.js");const {PRE,H}=require("./heavy.js");reseed(777);
let a=99;const R=()=>{a=(a*1664525+1013904223)>>>0;return a/4294967296};
// PROPOSED BAL.toil additions (numbers to be placed in BAL)
const P={allow:{thuong:4,thinhan:3,night:5,fest:6,tang:1},diemOdds:[0,.3,.55,.8,.95],presetDiem:2,mix:1,showy:1,cake:[[.3,1],[.55,2]],
 miss:{brow:.5,powder:.5,dot:.4},slip0:.45,slipSk:.6,tier:[40,65,85]};
const OCC=[["thuong",.4],["thinhan",.4],["night",.1],["fest",.1]];
function occ(){let r=R(),c=0;for(const [k,p] of OCC){c+=p;if(r<c)return k}return"thuong"}
function one(pl,sk,choice,dose){const r=sit(Object.assign({},PLAY[pl],{dose:DOSE[dose]}),sk);
 let pre;if(choice==="nha")pre=PRE.filter(p=>p[1]==="dep")[Math.floor(R()*8)];else if(choice==="diem")pre=PRE.filter(p=>p[1]==="diem")[Math.floor(R()*8)];else{const c={};for(const k of ["mat","ma","son","may"]){const L=PRE.map(p=>p[2][k]);c[k]=L[Math.floor(R()*L.length)]}pre=["tu","tu",c]}
 const h0=H(pre[2]);let h=h0.h+h0.mix*P.mix+(pre[1]==="diem"?P.presetDiem:0)+(R()<.15?P.showy:0);for(const [t,n] of P.cake)if(r.over>=t)h=Math.max(h,h0.h+h0.mix*P.mix+(pre[1]==="diem"?P.presetDiem:0)+n+(0));
 const o=occ(),e=Math.max(0,h-P.allow[o]);const pd=P.diemOdds[Math.min(4,e)];
 const misses=(r.brow<P.miss.brow?1:0)+(r.powder<P.miss.powder?1:0)+r.qs.filter(q=>q<P.miss.dot).length;const ps=P.slip0*(1-P.slipSk*sk);let slip=false;for(let i=0;i<misses;i++)if(R()<ps)slip=true;
 if(r.score<P.tier[0]||slip)return"vung";if(R()<pd)return"diem";return r.score<P.tier[1]?"vua":r.score<P.tier[2]?"dep":"tuyet"}
const SK=[.12,.4,.75,1];console.log("play choice dose sk | vung vua dep tuyet diem   (proposed)");
for(const pl of ["kheo","thuong","voi"])for(const ch of ["nha","tu","diem"])for(const dose of ["vua","day"])for(const sk of SK){const c={vung:0,vua:0,dep:0,tuyet:0,diem:0};const n=3000;for(let i=0;i<n;i++)c[one(pl,sk,ch,dose)]++;
 console.log(pl,ch,dose,sk,"|",...Object.values(c).map(v=>Math.round(100*v/n)))}
