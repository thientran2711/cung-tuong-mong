/* net-build: per-nết rates per 100 holder-weeks from nt-run outputs. usage: node nt-norm.js a.json [b.json…]
   holder-weeks of a nết = its NPC→her weekly samples (one per living consort per week); rude / kind / harm acts per nết from __nt.fired and __nt.ba */
const fs=require('fs');const F=process.argv.slice(2).map(f=>JSON.parse(fs.readFileSync(f,'utf8')));
const hw={},fi={},ba={};for(const r of F){for(const t in r.nt.samp.affS)hw[t]=(hw[t]||0)+r.nt.samp.affS[t].length;
 for(const k in r.nt.fired)for(const t in r.nt.fired[k]){fi[k]=fi[k]||{};fi[k][t]=(fi[k][t]||0)+r.nt.fired[k][t]}
 for(const k in r.nt.ba)ba[k]=(ba[k]||0)+r.nt.ba[k]}
const acts=["provoke","humiliate","feign","help","warn","visit","mediate","apologise","gossip","drop"];
const rate=(n,t)=>hw[t]?(100*n/hw[t]).toFixed(1):"-";
const T=Object.keys(hw).filter(t=>t!=="_").sort();const out=[`holder-weeks: ${hw._||0} over ${F.length} runs`,`| nết | hw | ${acts.join(" | ")} | harm any | band3 |`,`|---|---|${acts.map(()=>"---").join("|")}|---|---|`];
for(const t of T.concat("_")){const h=[1,2,3].reduce((s,b)=>s+(t==="_"?(ba[b]||0):(ba[b+"|"+t]||0)),0),b3=t==="_"?(ba[3]||0):(ba["3|"+t]||0);
 out.push(`| ${t==="_"?"ALL":t} | ${hw[t]} | ${acts.map(k=>rate((fi[k]||{})[t]||0,t)).join(" | ")} | ${rate(h,t)} | ${rate(b3,t)} |`)}
const H=t=>[1,2,3].reduce((s,b)=>s+(ba[b+"|"+t]||0),0)/(hw[t]||1);const proud=["Kiêu ngạo","Nóng nảy","Thù dai"],gentle=["Ân cần","Khiêm nhường","Rộng lượng"];
const avg=L=>L.reduce((s,t)=>s+H(t),0)/L.length;out.push(`\nharm ratio proud (${proud.join("/")}) / gentle (${gentle.join("/")}) = ${(avg(proud)/Math.max(1e-9,avg(gentle))).toFixed(2)}`);
const K=t=>["help","warn","visit","mediate"].reduce((s,k)=>s+((fi[k]||{})[t]||0),0)/(hw[t]||1)*100;out.push(`kind acts (help+warn+visit+mediate) per 100 hw: warm (Ân cần/Khiêm nhường/Rộng lượng) ${(gentle.reduce((s,t)=>s+K(t),0)/3).toFixed(1)} · cold (Lạnh lùng/Kiêu ngạo) ${((K("Lạnh lùng")+K("Kiêu ngạo"))/2).toFixed(1)}`);
const mx=Math.max(...T.map(H)),mn=Math.min(...T.filter(t=>hw[t]>50).map(H));out.push(`harm max/min over nết (hw>50) = ${(mx/Math.max(1e-9,mn)).toFixed(2)}`);
console.log(out.join("\n"));
