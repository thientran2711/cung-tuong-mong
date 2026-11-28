/* net-thresholds summary: node nt-sum.js a.json [b.json…] → markdown tables (percentiles per nết, gate pass share, acts per nết) */
const fs=require('fs');const F=process.argv.slice(2).map(f=>JSON.parse(fs.readFileSync(f,'utf8')));
const mrg=(k)=>{const o={};for(const r of F)for(const t in r.nt.samp[k])(o[t]=o[t]||[]).push(...r.nt.samp[k][t]);return o};
const pc=(a,p)=>{if(!a.length)return"-";const s=a.slice().sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.floor(p*s.length))]};
const share=(a,f)=>a.length?Math.round(100*a.filter(f).length/a.length):"-";
const out=[];const weeks=F.reduce((s,r)=>s+r.nt.n,0);out.push(`weekly samples: ${weeks} weeks over ${F.length} runs; lives ended ${F.reduce((s,r)=>s+r.lives,0)}`);
for(const [k,lab,cuts] of [["aff","NPC→NPC thiện cảm",[10,20,30,40,60]],["affS","NPC→her thiện cảm",[10,20,30,40,60]],["oan","NPC→NPC oán",[5,15,20,30,45]],["oanS","NPC→her oán",[5,15,20,30,45]],["dang","NPC→NPC danger",[10,18,20,30,60]],["dangS","NPC→her danger",[10,18,20,30,60]],["host","hostility (all)",[20,25,30,40,60]]]){
 const D=mrg(k);out.push(`\n### ${lab}\n| nết | n | p10 | p50 | p90 | p99 | ${cuts.map(c=>"≥"+c).join(" | ")} |\n|---|---|---|---|---|---|${cuts.map(()=>"---").join("|")}|`);
 const ks=Object.keys(D).sort((a,b)=>a==="_"?-1:b==="_"?1:a.localeCompare(b));for(const t of ks){const a=D[t];out.push(`| ${t==="_"?"ALL":t} | ${a.length} | ${pc(a,.1)} | ${pc(a,.5)} | ${pc(a,.9)} | ${pc(a,.99)} | ${cuts.map(c=>share(a,x=>x>=c)+"%").join(" | ")} |`)}}
const G={};for(const r of F)for(const k in r.nt.G){const g=G[k]=G[k]||[0,0];g[0]+=r.nt.G[k][0];g[1]+=r.nt.G[k][1]}
out.push(`\n### SOC gate pass share (ok() true / calls)\n| act | pass | calls | share |\n|---|---|---|---|`);for(const k of Object.keys(G).sort())out.push(`| ${k} | ${G[k][0]} | ${G[k][0]+G[k][1]} | ${Math.round(100*G[k][0]/Math.max(1,G[k][0]+G[k][1]))}% |`);
const FI={};for(const r of F)for(const k in r.nt.fired)for(const t in r.nt.fired[k]){FI[k]=FI[k]||{};FI[k][t]=(FI[k][t]||0)+r.nt.fired[k][t]}
const acts=Object.keys(FI).sort();const tr=[...new Set(acts.flatMap(k=>Object.keys(FI[k])).filter(t=>t!=="_"))].sort();
out.push(`\n### SOC acts fired per 100 weeks (all doers) — then per nết holder\n| act | per100wk | ${tr.join(" | ")} |\n|---|---|${tr.map(()=>"---").join("|")}|`);
for(const k of acts)out.push(`| ${k} | ${(100*FI[k]._/weeks).toFixed(1)} | ${tr.map(t=>FI[k][t]||0).join(" | ")} |`);
const BA={};for(const r of F)for(const k in r.nt.ba)BA[k]=(BA[k]||0)+r.nt.ba[k];out.push(`\n### npcAct danger band at call\n${JSON.stringify(Object.fromEntries(Object.entries(BA).filter(([k])=>!k.includes("|"))))}`);
const bt={};for(const k in BA)if(k.includes("|")){const [b,t]=k.split("|");(bt[t]=bt[t]||{})[b]=BA[k]}out.push(`| nết | band1 | band2 | band3 |\n|---|---|---|---|`);for(const t of Object.keys(bt).sort())out.push(`| ${t} | ${bt[t][1]||0} | ${bt[t][2]||0} | ${bt[t][3]||0} |`);
{const C=mrg('cmp');if(Object.keys(C).length){out.push(`\n### danger drivers (top: share where ghen / oán / −thiện cảm is the max term; x = wrappers+dang+đức)\n| side | ghen p50/p90 | oán p50/p90 | −aff p50/p90 | top ghen/oán/−aff | x p50/p90 |\n|---|---|---|---|---|---|`);
 for(const sf of ['S','N']){const tp=C['top'+sf]||[];out.push(`| ${sf==='S'?'NPC→her':'NPC→NPC'} | ${pc(C['g'+sf]||[],.5)}/${pc(C['g'+sf]||[],.9)} | ${pc(C['o'+sf]||[],.5)}/${pc(C['o'+sf]||[],.9)} | ${pc(C['a'+sf]||[],.5)}/${pc(C['a'+sf]||[],.9)} | ${[0,1,2].map(i=>share(tp,x=>x===i)+'%').join(' / ')} | ${pc(C['x'+sf]||[],.5)}/${pc(C['x'+sf]||[],.9)} |`)}}}
{const BT={},GG={},BY={S:0,N:0},GW=[];for(const r of F){const n=r.nt;for(const k in n.bt||{})BT[k]=(BT[k]||0)+n.bt[k];for(const k in n.gg||{})GG[k]=(GG[k]||0)+n.gg[k];if(n.ggBy){BY.S+=n.ggBy.S;BY.N+=n.ggBy.N}GW.push(...(n.gw||[]))}
 if(Object.keys(BT).length){out.push(`\n### npcAct band by target (review/net-ghen)\n| target | band0 | band1 | band2 | band3 | band-3 share |\n|---|---|---|---|---|---|`);
  for(const s of ["S","N"]){const c=[0,1,2,3].map(b=>BT[s+b]||0),t=c.reduce((a,b)=>a+b,0);out.push(`| ${s==="S"?"NPC→her":"NPC→NPC"} | ${c.join(" | ")} | ${c[3]}/${t} = ${(100*c[3]/Math.max(1,t)).toFixed(1)} % |`)}}
 if(Object.keys(GG).length){const tot=Object.values(GG).reduce((a,b)=>a+b,0);out.push(`\n### ghen gains toward her via ghenUp (total ${tot} over ${weeks} weeks; caused by her ${BY.S} / by an NPC ${BY.N})\n| cause | points | share |\n|---|---|---|`);
  for(const [k,v] of Object.entries(GG).sort((a,b)=>b[1]-a[1]).slice(0,25))out.push(`| ${k} | ${v} | ${(100*v/tot).toFixed(1)} % |`)}
 if(GW.length){let net=0,led=0,rv=0;for(const w of GW){net+=w[1]-w[0];led+=w[3];rv+=w[2]}out.push(`\nweekly Σ ghen (endTurn): turns ${GW.length}, mean live rivals ${(rv/GW.length).toFixed(1)}, net change per rival-turn ${(net/rv).toFixed(2)}, ghenUp gain per rival-turn ${(led/rv).toFixed(2)}, rest (direct writes − fades) ${((net-led)/rv).toFixed(2)}`)}}
console.log(out.join("\n"));
