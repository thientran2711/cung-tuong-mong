/* E-ILL-RATE aggregator: node ill-rate-agg.js out.md sh1.json sh2.json ... */
const fs=require('fs');const [OUT,...F]=process.argv.slice(2);
const R={A:[],B:[]};let errs={A:[],B:[]};for(const f of F){const d=JSON.parse(fs.readFileSync(f));for(const t of ['A','B']){let bi=0;for(const r of d[t].res){if(r.o==='bd'){r.forced=bi>=d.POL.length*d.SEEDS;bi++}}R[t].push(...d[t].res);errs[t].push(...d[t].errs)}}
const pc=(a,b)=>b?(100*a/b).toFixed(1)+' %':'—';const ILLW=/Phong hàn|Sốt rét|Kiết lỵ|Lao phổi|Đậu mùa|Tâm bệnh|Hậu sản|Trúng độc|mất ngủ|Long thể|nguy kịch/;
let md='';const L=s=>md+=s+'\n';
const years=t=>R[t].filter(r=>!r.err).reduce((a,r)=>a+(r.months||0)/12,0);
L(`Lives: A ${R.A.length} (${R.A.filter(r=>r.err).length} err) · B ${R.B.length} (${R.B.filter(r=>r.err).length} err) · seeded years simulated A ${years('A').toFixed(0)} · B ${years('B').toFixed(0)}`);
L(`Page errors: A ${errs.A.length} · B ${errs.B.length}${errs.A.concat(errs.B).length?' — e.g. '+[...new Set(errs.A.concat(errs.B))].slice(0,3).join(' | '):''}`);
/* Table 1: NPC, idle policy lives only (the world without her cure choices) */
L('\n### Table 1 — NPC illness (idle lives; per seeded year = sum / years)\n');
L('| group | build | cases / yr | cures / yr | deaths / yr | death per case | cure per ill-month | deaths by illness |');L('|---|---|---|---|---|---|---|---|');
const GR=['consort','maid','eunuch','kid','court','physician','guard','royal','man','emp','th'];const NM={consort:'phi tần',maid:'cung nữ',eunuch:'thái giám',kid:'children',court:'court seats',emp:'Emperor',th:'Thái hậu',physician:'thái y',guard:'thị vệ',royal:'royal',man:'men'};
const sum={};
for(const g of GR)for(const t of ['A','B']){const rs=R[t].filter(r=>!r.err&&r.pol==='idle');const y=rs.reduce((a,r)=>a+r.months/12,0);const X={cases:0,cures:0,deaths:0,illMo:0,K:{}};
 for(const r of rs){const x=r.g[g];if(!x)continue;X.cases+=x.cases;X.cures+=x.cures;X.deaths+=x.deaths;X.illMo+=x.illMo;for(const k in x.deathK)X.K[k]=(X.K[k]||0)+x.deathK[k]}
 if(!X.cases&&!X.illMo)continue;sum[g+t]=X;
 L(`| ${NM[g]||g} | ${t} | ${(X.cases/y).toFixed(2)} | ${(X.cures/y).toFixed(2)} | ${(X.deaths/y).toFixed(2)} | ${pc(X.deaths,X.cases)} | ${pc(X.cures,X.illMo)} | ${Object.entries(X.K).map(([k,v])=>k+' '+v).join(', ')||'—'} |`)}
const all=t=>{const X={cases:0,cures:0,deaths:0,illMo:0};for(const g of GR.filter(g=>g!=='emp'&&g!=='th')){const x=sum[g+t];if(x)for(const k of ['cases','cures','deaths','illMo'])X[k]+=x[k]}return X};
const AA=all('A'),BB=all('B');L(`| **all NPC (no Emperor/Thái hậu)** | A | | | | **${pc(AA.deaths,AA.cases)}** | ${pc(AA.cures,AA.illMo)} | |`);L(`| **all NPC (no Emperor/Thái hậu)** | B | | | | **${pc(BB.deaths,BB.cases)}** | ${pc(BB.cures,BB.illMo)} | |`);
/* Table 2: heroine */
L('\n### Table 2 — HEROINE illness death by origin (deaths among lives; y1 = first 12 months, y1–3 = 36 months)\n');
L('| origin | build | policy | lives | ill cases (36 mo) | y1 illness death | y1–3 illness death | other death y1–3 | cure per ill-month |');L('|---|---|---|---|---|---|---|---|---|');

const key=r=>r.o==='bd'?(r.forced?'bd_san':'bd (any road)'):r.o;
const ORD=['tt','dtq','muoi','cn','nc','td','ch','thd','cnv','pf','bd (any road)','bd_san'];const tot={};
for(const o of ORD)for(const t of ['A','B'])for(const p of ['idle','best']){const rs=R[t].filter(r=>!r.err&&key(r)===o&&r.pol===p);if(!rs.length)continue;
 const ill=r=>r.me&&r.me.dead&&r.me.why&&ILLW.test(r.me.why.m);const y1=rs.filter(r=>ill(r)&&r.months<=12).length,y3=rs.filter(ill).length,oth=rs.filter(r=>r.me&&r.me.dead&&!ill(r)).length;
 const c=rs.reduce((a,r)=>a+((r.g.me||{}).cases||0),0),cu=rs.reduce((a,r)=>a+((r.g.me||{}).cures||0),0),im=rs.reduce((a,r)=>a+((r.g.me||{}).illMo||0),0);
 const T=tot[t+p]||(tot[t+p]={n:0,y1:0,y3:0});T.n+=rs.length;T.y1+=y1;T.y3+=y3;
 L(`| ${o} | ${t} | ${p} | ${rs.length} | ${(c/rs.length).toFixed(2)} | ${y1} (${pc(y1,rs.length)}) | ${y3} (${pc(y3,rs.length)}) | ${oth} | ${pc(cu,im)} |`)}
L('\n| ALL origins | build | policy | lives | y1 illness death | y1–3 illness death |');L('|---|---|---|---|---|---|');
for(const t of ['A','B'])for(const p of ['idle','best']){const T=tot[t+p];if(T)L(`| all | ${t} | ${p} | ${T.n} | ${pc(T.y1,T.n)} | ${pc(T.y3,T.n)} |`)}
/* by start age */
L('\n### Table 2b — HEROINE by start age (all origins)\n');L('| start age | build | policy | lives | y1 illness death | y1–3 illness death |');L('|---|---|---|---|---|---|');
for(const a of [...new Set(R.A.map(r=>r.age0))].sort())for(const t of ['A','B'])for(const p of ['idle','best']){const rs=R[t].filter(r=>!r.err&&r.age0===a&&r.pol===p);if(!rs.length)continue;const ill=r=>r.me&&r.me.dead&&r.me.why&&ILLW.test(r.me.why.m);
 L(`| ${a} | ${t} | ${p} | ${rs.length} | ${pc(rs.filter(r=>ill(r)&&r.months<=12).length,rs.length)} | ${pc(rs.filter(ill).length,rs.length)} |`)}
/* death list */
L('\n### Heroine deaths (all)\n');for(const t of ['A','B'])for(const r of R[t].filter(r=>!r.err&&r.me&&r.me.dead))L(`- ${t} ${key(r)}/${r.rd} ${r.pol} seed ${r.seed} age0 ${r.age0} month ${r.months}: ${r.me.why?r.me.why.m:r.me.fate} · ill trail ${r.meIll}`);
fs.writeFileSync(OUT,md);console.log(md.slice(0,6000));
