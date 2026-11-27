/* TEMPER-OUTBURST G4 (temper-design (e)): a hot / even / timid her vs a hot her with NO outbursts — the temper never blocks the Hoàng hậu road.
   usage: node dev/measure/temper-hh.js run <lives per arm> <outdir> [arms=hot,even,timid,off]   (runs runb.js sens per arm in parallel, INP2=intemper.js)
          node dev/measure/temper-hh.js sum <outdir>                                            (table: lives, max rank mean ± SE, HH reach, early death < 3 years, outbursts / life)
   Pass = for every ON arm, mean max rank within 1 SE (pooled) of the OFF arm or above it, and HH reach / early death not worse by more than 1 SE. */
const {spawn}=require('child_process');const fs=require('fs');const path=require('path');const [,,cmd,a2,a3,a4]=process.argv;
if(cmd==="run"){const n=+a2||8,out=a3,arms=(a4||"hot,even,timid,off").split(",");fs.mkdirSync(out,{recursive:true});
 for(const A of arms){const env=Object.assign({},process.env,{INP2:"intemper.js",XJS:`window.__tArm=${JSON.stringify(A)}`,CAP:process.env.CAP||"3000"});
  const c=spawn("node",[path.join(__dirname,"runb.js"),"sens",String(n),path.join(out,`tp-${A}.json`)],{env,stdio:"inherit"});c.on("exit",x=>console.log("arm",A,"exit",x))}}
else if(cmd==="sum"){const out=a2;const rows=[];const st=a=>{const m=a.reduce((t,x)=>t+x,0)/Math.max(1,a.length);const sd=Math.sqrt(a.reduce((t,x)=>t+(x-m)**2,0)/Math.max(1,a.length-1));return{m:+m.toFixed(2),se:+(sd/Math.sqrt(Math.max(1,a.length))).toFixed(2)}};
 for(const f of fs.readdirSync(out).filter(f=>/^tp-.*\.json$/.test(f)&&!/ext/.test(f))){const R=JSON.parse(fs.readFileSync(path.join(out,f))).filter(x=>x.fate!=="TIMEOUT"&&!/^CRASH/.test(x.fate||""));const A=f.slice(3,-5);
  const mr=R.map(x=>x.maxRank||0),hh=R.map(x=>(x.maxRank||0)>=7?1:0),early=R.map(x=>(x.years||0)<3?1:0),outs=R.map(x=>x.tp?Object.values(x.tp.out||{}).reduce((t,v)=>t+v,0):0),yrs=R.map(x=>x.years||0);
  rows.push({arm:A,n:R.length,maxRank:st(mr),hh:st(hh),early:st(early),years:st(yrs),outPerLife:st(outs),temper:[...new Set(R.map(x=>x.tp&&x.tp.temper))].join("/")})}
 console.log("arm    n  maxRank(±SE)   HH reach(±SE)  early<3y(±SE)  years(±SE)   outbursts/life  temper");for(const r of rows)console.log(`${r.arm.padEnd(6)} ${String(r.n).padStart(2)}  ${r.maxRank.m}±${r.maxRank.se}`.padEnd(26)+`${r.hh.m}±${r.hh.se}`.padEnd(15)+`${r.early.m}±${r.early.se}`.padEnd(15)+`${r.years.m}±${r.years.se}`.padEnd(13)+`${r.outPerLife.m}`.padEnd(16)+r.temper);
 const off=rows.find(r=>r.arm==="off");let bad=0;if(off)for(const r of rows.filter(r=>r.arm!=="off")){const se=Math.sqrt(r.maxRank.se**2+off.maxRank.se**2),seH=Math.sqrt(r.hh.se**2+off.hh.se**2),seE=Math.sqrt(r.early.se**2+off.early.se**2);
  const ok=r.maxRank.m>=off.maxRank.m-se&&r.hh.m>=off.hh.m-seH&&r.early.m<=off.early.m+seE;if(!ok)bad++;console.log(`${r.arm}: ${ok?"PASS":"FAIL"} (maxRank Δ ${(r.maxRank.m-off.maxRank.m).toFixed(2)} vs SE ${se.toFixed(2)}; HH Δ ${(r.hh.m-off.hh.m).toFixed(2)} vs ${seH.toFixed(2)}; early Δ ${(r.early.m-off.early.m).toFixed(2)} vs ${seE.toFixed(2)})`)}
 process.exit(bad?1:0)}
