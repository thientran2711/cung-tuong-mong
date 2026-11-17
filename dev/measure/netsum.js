// trait-pool before/after summary of runpers.js outputs. usage: node dev/measure/netsum.js <label> <traitsPerPerson> a.json [b.json…]
// persLog (S.persLog) counts each act once per nết of the doer → act totals are divided by nết per person (2 before, 3 after).
const fs=require('fs');const [label,tpp,...F]=process.argv.slice(2);const L=F.flatMap(f=>{try{return JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){return[]}});
const done=L.filter(r=>r.title!=="TIMEOUT"&&!r.err);const HARM=["poison","kpoison","frame","kframe","plant","musk","catswap","pushp","slowpoison"],RUDE=["provoke","humiliate","trip","steal","rumor"],KIND=["help","visit","warn","mediate"];
const tot=k=>{let n=0;for(const r of done)for(const t in r.pl||{})n+=(r.pl[t][k]||0);return n/(+tpp)};const per=ks=>(ks.reduce((a,k)=>a+tot(k),0)/Math.max(1,done.length)).toFixed(1);
const yrs=done.reduce((a,r)=>a+(r.years||0),0);
console.log(`| ${label} | ${L.length} (${done.length} ended) | ${done.filter(r=>r.hhTurn!=null||r.maxRank>=7).length} | ${(done.reduce((a,r)=>a+(r.maxRank||0),0)/Math.max(1,done.length)).toFixed(2)} | ${(yrs/Math.max(1,done.length)).toFixed(1)} | ${per(HARM)} | ${(HARM.reduce((a,k)=>a+tot(k),0)/Math.max(1,yrs)).toFixed(2)} | ${per(RUDE)} | ${per(KIND)} | ${L.filter(r=>/CRASH/.test(r.title||"")).length} |`);
