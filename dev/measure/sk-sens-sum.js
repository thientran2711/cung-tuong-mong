/* summary of runb.js sens lives carrying x.sk (measure/insk.js): node dev/measure/sk-sens-sum.js a.json [b.json …] */
const fs=require('fs');const L=[];for(const f of process.argv.slice(2)){const d=JSON.parse(fs.readFileSync(f,'utf8'));L.push(...(d.lives||d.res||d))}
const ok=L.filter(l=>l&&l.sk);const T={};const B={};const KH={},RT={};let wk=0,suc=0,cap=0,nN=0,nS=0,nC=0;
for(const l of ok){const s=l.sk;for(const k of ["preg","mis","misC","births","momDie","pre","od"])T[k]=(T[k]||0)+s[k];wk+=s.wk;suc+=s.suc;cap+=s.cap;nN+=s.npcN;nS+=s.npcSuc;nC+=s.npcCap;
 for(const b in s.band){const x=B[b]=B[b]||[0,0,0];for(let i=0;i<3;i++)x[i]+=s.band[b][i]}for(const k in s.kh)KH[k]=(KH[k]||0)+s.kh[k];for(const k in s.rt)RT[k]=(RT[k]||0)+s.rt[k]}
const f=x=>x.toFixed(1);console.log(`lives ${ok.length} · her weeks ${wk} · Sức mean ${f(suc/wk)} · Sức max mean ${f(cap/wk)} · NPC Sức ${f(nS/nN)} max ${f(nC/nN)}`);
console.log('by age band:',Object.keys(B).sort().map(b=>`${b}: ${B[b][0]} wk, max ${f(B[b][1]/B[b][0])}, Sức ${f(B[b][2]/B[b][0])}`).join(' | '));
console.log(`her pregnancies ${T.preg} · miscarried ${T.mis} (${T.preg?f(100*T.mis/T.preg):'-'}/100; by a named cause ${T.misC}) · births ${T.births} · preterm ${T.pre} · overdue ${T.od} · died in childbirth ${T.momDie}`);
console.log('jkh counters',JSON.stringify(KH));console.log('route counters',JSON.stringify(RT),'per life ng_set',f((RT.ng_set||0)/ok.length),'ng_oan',f((RT.ng_oan||0)/ok.length));
