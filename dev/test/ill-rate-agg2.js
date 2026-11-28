/* v2 NPC table: strict illness deaths (pre-stage >= 2, deadly illness, person dead/gone) and nặng+ cure per month */
const fs=require('fs');const [OUT,...F]=process.argv.slice(2);const R={A:[],B:[]};for(const f of F){const d=JSON.parse(fs.readFileSync(f));for(const t of ['A','B'])R[t].push(...d[t].res)}
const pc=(a,b)=>b?(100*a/b).toFixed(1)+' %':'—';let md='';const L=s=>md+=s+'\n';
const NM={consort:'phi tần',maid:'cung nữ',eunuch:'thái giám',kid:'children',emp:'Emperor',th:'Thái hậu',physician:'thái y',guard:'thị vệ',royal:'royal (prince/princess)',man:'men (officials)',me:'HEROINE'};
L('| group | build | ill cases / yr | illness deaths / yr (strict) | death per case (strict) | cure / ill-month (all stages) | cure / ill-month at nặng+ | left the roster while ill (not counted) |');L('|---|---|---|---|---|---|---|---|');
const T={};
for(const g of ['consort','maid','eunuch','kid','physician','guard','royal','man','emp','th','me'])for(const t of ['A','B']){const rs=R[t].filter(r=>!r.err);const y=rs.reduce((a,r)=>a+r.months/12,0);const X={cases:0,cures:0,illMo:0,illMo2:0,cures2:0,dS:0,gone:0,deaths:0,kAll:0};
 for(const r of rs){const x=r.g[g];if(!x)continue;for(const k in X)X[k]+=x[k]||0}
 const ds=g==='th'||g==='me'?X.deaths:X.dS;T[g+t]=Object.assign(X,{ds,y});
 L(`| ${NM[g]||g} | ${t} | ${(X.cases/y).toFixed(2)} | ${(ds/y).toFixed(3)} | ${pc(ds,X.cases)} | ${pc(X.cures,X.illMo)} | ${g==='th'?'—':pc(X.cures2,X.illMo2)} | ${g==='th'||g==='me'?'—':X.gone}${g==='kid'?` · all child deaths ${X.kAll} (${(X.kAll/y).toFixed(2)}/yr)`:''} |`)}
for(const t of ['A','B']){let c=0,d=0,m=0,cu=0;for(const g of ['consort','maid','eunuch','kid','physician','guard','royal','man']){const X=T[g+t];c+=X.cases;d+=X.ds;m+=X.illMo2;cu+=X.cures2}L(`| **all NPC (no Emperor / Thái hậu)** | ${t} | | | **${pc(d,c)}** | | ${pc(cu,m)} | |`)}
L(`\nLives A ${R.A.length} · B ${R.B.length} · seeded years A ${(R.A.reduce((a,r)=>a+r.months/12,0)).toFixed(0)} · B ${(R.B.reduce((a,r)=>a+r.months/12,0)).toFixed(0)}`);
fs.writeFileSync(OUT,md);console.log(md)
