/* robot10-agg.js — the ROBOT-10 tally (owner OD 23/11 ~20:45Z): death rate (by cause + stage), reach rate of every rank step and the top titles
   (Hoàng hậu, Nữ đế, Hoàng thái hậu), rate of every ending (thường / kỳ ngộ / đại kết cục / rare / death), per thân phận × nhánh × bot and overall.
 USAGE  node dev/measure/robot10-agg.js <run.json|folder> [...more] [--out <folder>]
        reads every robot10.js result JSON (<origin>-<stamp>.json; a folder = all of them, recursively) from any account / runner and writes
        <out>/rates-<yyyymmdd-hhmm>.md (default out: dev/handover/robot). Lives of the same job id in two files count once (the newest file wins).
 FIELDS (per life, written by robot10.js): job{id,origin,road,bot,life,seed} · life{id (ending title), type (S.kesT: death exile fail leave throne grand
        fate rare | softlock cap stuck crash), group (death / thường / kỳ ngộ / đại kết cục / rare / no ending), cause, age, year, years, chapter, part,
        maxRank, maxRankN, steps[{r,n,buoi,age,year}], top{hoangHau,nuDe,hoangThaiHau}} · lock{road,openAt,playAt} (locked roads) · bugs[] */
const fs=require('fs'),path=require('path');
const args=process.argv.slice(2);let out=path.join(__dirname,'..','handover','robot');const ins=[];
for(let i=0;i<args.length;i++){if(args[i]==='--out')out=args[++i];else ins.push(args[i])}
if(!ins.length){console.log('usage: node dev/measure/robot10-agg.js <run.json|folder> [...] [--out folder]');process.exit(2)}
const files=[];const walk=f=>{const st=fs.statSync(f);if(st.isDirectory()){for(const x of fs.readdirSync(f))if(x!=='saves'&&x!=='shots')walk(path.join(f,x))}else if(/\.json$/.test(f)&&!/\.ext\.json$/.test(f))files.push([f,st.mtimeMs])};
ins.forEach(walk);files.sort((a,b)=>a[1]-b[1]);
const lives=new Map();
for(const [f] of files){let d;try{d=JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){continue}if(!Array.isArray(d))continue;
 for(const r of d)if(r&&r.job&&r.life)lives.set(r.job.id+'#'+(r.job.seed||''),r)}
const L=[...lives.values()];
if(!L.length){console.log('no robot10 lives found');process.exit(1)}
const pct=(a,b)=>b?(100*a/b).toFixed(0)+'%':'—';
const RN={};L.forEach(r=>(r.life.steps||[]).forEach(s=>{if(s.n)RN[s.r]=s.n}));const RK=Object.keys(RN).map(Number).sort((a,b)=>a-b);
function stats(G){const n=G.length,end=G.filter(r=>!/^(softlock|cap|stuck|crash|\?)$/.test(r.life.type||'?'));
 const c=k=>G.filter(k).length;
 return{n,ended:end.length,death:c(r=>r.life.death),hh:c(r=>r.life.top&&r.life.top.hoangHau||(r.life.maxRank>=7)),nd:c(r=>r.life.top&&r.life.top.nuDe),htt:c(r=>r.life.top&&r.life.top.hoangThaiHau),
  grand:c(r=>r.life.group==='đại kết cục'),rare:c(r=>r.life.group==='rare'),ky:c(r=>r.life.group==='kỳ ngộ'),thuong:c(r=>r.life.group==='thường'),noend:n-end.length,
  yrs:end.length?(end.reduce((a,r)=>a+(+r.life.years||0),0)/end.length).toFixed(1):'—',bugs:G.reduce((a,r)=>a+(r.bugs||[]).length,0)}}
const row=(k,s)=>`| ${k} | ${s.n} | ${pct(s.ended,s.n)} | ${pct(s.death,s.n)} | ${pct(s.thuong,s.n)} | ${pct(s.ky,s.n)} | ${pct(s.grand,s.n)} | ${pct(s.rare,s.n)} | ${pct(s.hh,s.n)} | ${pct(s.nd,s.n)} | ${pct(s.htt,s.n)} | ${pct(s.noend,s.n)} | ${s.yrs} | ${s.bugs} |`;
const HEAD='| group | lives | ending reached | death | thường | kỳ ngộ | đại kết cục | rare | Hoàng hậu | Nữ đế | Hoàng thái hậu | no ending (soft-lock / cap / stuck / crash) | avg years | bugs |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|';
const by=(f)=>{const m=new Map();L.forEach(r=>{const k=f(r);if(!m.has(k))m.set(k,[]);m.get(k).push(r)});return [...m.entries()].sort((a,b)=>a[0]<b[0]?-1:1)};
const tally=(G,f)=>{const m=new Map();G.forEach(r=>{const k=f(r);if(k)m.set(k,(m.get(k)||0)+1)});return [...m.entries()].sort((a,b)=>b[1]-a[1])};
const S0=stats(L);
const stage=r=>r.life.part!=null?'part '+r.life.part:(r.life.age!=null?'age '+(r.life.age<20?'<20':r.life.age<30?'20-29':r.life.age<40?'30-39':r.life.age<50?'40-49':'50+'):'?');
const ageB=r=>r.life.age==null?'?':r.life.age<20?'<20':r.life.age<30?'20-29':r.life.age<40?'30-39':r.life.age<50?'40-49':'50+';
const dead=L.filter(r=>r.life.death);
const locks=L.filter(r=>r.lock);const lockBy=by(r=>r.lock?r.lock.road:'');
const now=new Date(),stamp=now.toISOString().slice(0,16).replace(/[-:]/g,'').replace('T','-');
const md=[`# ROBOT-10 rates · ${stamp} (UTC)`,'',`${L.length} lives from ${files.length} result files (${[...new Set(L.map(r=>r.job.origin))].join(' ')}). Ending groups from the game's own S.kesT (jend kitEndType): death = death; đại kết cục = grand; rare = rare; kỳ ngộ = fate (Bảng Thiên mệnh); thường = exile / fail / leave / throne. Top titles: Hoàng hậu = max rank ≥ 7 (RANKS); Nữ đế / Hoàng thái hậu = the ending title (j99succ). «no ending» = soft-lock, wall cap, inpage6 stuck or crash (each is also a bug in the run's bug file).`,'',
 '## Overall','',HEAD,row('ALL',S0),'',
 '## Rank reach (share of lives that reached at least this rank)','','| rank | '+RK.map(r=>RN[r]).join(' | ')+' |','|---|'+RK.map(()=>'---').join('|')+'|','| all | '+RK.map(r=>pct(L.filter(x=>(x.life.maxRank!=null?x.life.maxRank:-1)>=r).length,L.length)).join(' | ')+' |',
 ...by(r=>r.job.origin).map(([k,G])=>'| '+k+' | '+RK.map(r=>pct(G.filter(x=>(x.life.maxRank!=null?x.life.maxRank:-1)>=r).length,G.length)).join(' | ')+' |'),'',
 `## Deaths (${dead.length} of ${L.length} = ${pct(dead.length,L.length)})`,'','By cause:','',...tally(dead,r=>r.life.cause||r.life.id).slice(0,25).map(([k,n])=>`- ${n} × ${k}`),'','By stage (chapter part of the life frame) · by age:','',
 '- '+tally(dead,stage).map(([k,n])=>`${k}: ${n}`).join(' · '),'- '+tally(dead,ageB).map(([k,n])=>`${k}: ${n}`).join(' · '),'',
 '## Every ending (id = ending title, type)','',...tally(L,r=>r.life.id+' ['+(r.life.type||'?')+']').map(([k,n])=>`- ${n} × ${k} (${pct(n,L.length)})`),'',
 '## Per thân phận (origin) · per nhánh (road) · per bot','',HEAD,...by(r=>r.job.origin).map(([k,G])=>row(k,stats(G))),'',HEAD,...by(r=>r.job.origin+' · '+r.job.road).map(([k,G])=>row(k,stats(G))),'',HEAD,...by(r=>r.job.bot).map(([k,G])=>row(k,stats(G))),'',
 '## thân phận × nhánh × bot','',HEAD,...by(r=>r.job.origin+' · '+r.job.road+' · '+r.job.bot).map(([k,G])=>row(k,stats(G))),'',
 '## Locked roads (arcOk67 false at start: played until the condition opens them; never open in 5 kiếp = bug)','',
 locks.length?lockBy.filter(([k])=>k).map(([k,G])=>{const op=G.filter(r=>r.lock.openAt),pl=G.filter(r=>r.lock.playAt);return `- ${k}: ${G.length} lives · opened in ${op.length} (${op.map(r=>'y'+r.lock.openAt.year+'/age '+r.lock.openAt.age).slice(0,5).join(', ')}) · played in ${pl.length}${G.length>=5&&!op.length?' · **BUG: never opened in '+G.length+' kiếp**':''}`}).join('\n'):'None in these runs.',''].join('\n');
fs.mkdirSync(out,{recursive:true});const f=path.join(out,`rates-${stamp}.md`);fs.writeFileSync(f,md);console.log('rates: '+f+' · '+L.length+' lives');
