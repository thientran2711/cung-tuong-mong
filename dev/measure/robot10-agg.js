/* robot10-agg.js — the ROBOT-10 round report (owner OD 23/11 ~20:45Z tally + ~20:52Z/~20:55Z real-time orders #2/#3 + ~21:00Z OWNER ORDER #4 metric set
   + ~23:00Z order #5 event variety): one .md + two .csv per round from every runner's result JSON.
 USAGE  node dev/measure/robot10-agg.js <run.json|folder> [...more] [--out <folder>]
        reads every robot10.js result JSON (<origin>-<stamp>.json; a folder = all of them, recursively) from any account / runner + the newest catalog.json
        found next to them (written by robot10.js at run start: every die(why) / over(title) / ending table of the game, robot10-cat.js; none found →
        the code-only catalogue is built here) and writes <out>/rates-<stamp>.md, rates-<stamp>.csv (ONE ROW PER KIẾP) and rates-<stamp>-avg.csv (averages
        + every catalogue death / ending with its hit count; 0 = «chua ai gap»). Lives of the same job id + seed in two files count once (newest file wins).
 TABLES  0 overall · 1 DEATH (every cause from the code, rate overall / per thân phận / per age band / per rank, who caused it, framed; 0 hits = «chưa ai gặp»)
         2 ENDINGS (every ending, rate + mean real minutes; 0 hits = «chưa ai gặp») · 3 RANK (highest rank, minutes + years to each step, demotions, lãnh cung)
         4 FAMILY · 5 FAVOR + SCHEMES · 6 ECONOMY · 7 MINI-GAMES (win rate per game per rank: law 5, must fall as she climbs) · 8 KỲ NGỘ
         9 BALANCE FLAGS (option taken ≥ 90 % or ≤ 2 % of the times offered, law 2; roads never reached) · 10 HEALTH · 11 TIME (pace model, per kiếp +
         cumulative over the kiếp series) · 12 EVENT VARIETY · per thân phận × nhánh × bot · locked roads · RECOMMENDATIONS (order #6, LAST: finding → BAL key file:line →
         current (read from the game page: bal.json next to the run JSON, else robot10-reco.js reads GAME now) → proposed → expected effect).
 PACE MODEL (orders #2/#3; constants in PACE below, one place): real minutes = (characters she reads / READ_CPS + clicks × CLICK_S + choices × CHOICE_S
         + mini-games played × MG_S + mini-games left to luck × MGSKIP_S) / 60. Counters come from robot10-in.js (R.m.pace; per rank step R.m.rankAt).
         Calibration against human-paced runs is still open (report gap); change the constants here only. */
const fs=require('fs'),path=require('path');
const PACE={READ_CPS:17,CLICK_S:1.0,CHOICE_S:2.0,MG_S:45,MGSKIP_S:4};
const mins=p=>p?((p.chars||0)/PACE.READ_CPS+(p.clicks||0)*PACE.CLICK_S+(p.choices||0)*PACE.CHOICE_S+(p.mgPlay!=null?p.mgPlay:p.mg||0)*PACE.MG_S+(p.mgSkip!=null?p.mgSkip:p.mgs||0)*PACE.MGSKIP_S)/60:null;
const args=process.argv.slice(2);let out=path.join(__dirname,'..','handover','robot');const ins=[];
for(let i=0;i<args.length;i++){if(args[i]==='--out')out=args[++i];else ins.push(args[i])}
if(!ins.length){console.log('usage: node dev/measure/robot10-agg.js <run.json|folder> [...] [--out folder]');process.exit(2)}
const files=[],cats=[],bals=[];const walk=f=>{const st=fs.statSync(f);if(st.isDirectory()){for(const x of fs.readdirSync(f))if(x!=='saves'&&x!=='shots')walk(path.join(f,x))}
 else if(/catalog\.json$/.test(f))cats.push([f,st.mtimeMs]);else if(/(^|[\\/])bal\.json$/.test(f))bals.push([f,st.mtimeMs]);else if(/\.json$/.test(f)&&!/\.ext\.json$/.test(f))files.push([f,st.mtimeMs])};
ins.forEach(walk);files.sort((a,b)=>a[1]-b[1]);cats.sort((a,b)=>b[1]-a[1]);
const lives=new Map();
for(const [f] of files){let d;try{d=JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){continue}if(!Array.isArray(d))continue;
 for(const r of d)if(r&&r.job&&r.life)lives.set(r.job.id+'#'+(r.job.seed||''),r)}
const L=[...lives.values()];
if(!L.length){console.log('no robot10 lives found');process.exit(1)}
const CATM=require('./robot10-cat.js');
let CAT=null;if(cats.length)try{CAT=JSON.parse(fs.readFileSync(cats[0][0],'utf8'))}catch(e){}
if(!CAT)CAT=CATM.build(CATM.staticScan(path.join(__dirname,'..','..')),{});
/* ---------- helpers ---------- */
const pct=(a,b)=>b?(100*a/b).toFixed(0)+'%':'—';
const num=x=>typeof x==='number'&&isFinite(x);
const mean=a=>{a=a.filter(num);return a.length?a.reduce((s,x)=>s+x,0)/a.length:null};
const med=a=>{a=a.filter(num).sort((x,y)=>x-y);return a.length?a[a.length>>1]:null};
const f1=x=>x==null||!isFinite(x)?'—':(Math.round(x*10)/10).toString();
const by=(G,f)=>{const m=new Map();G.forEach(r=>{const k=f(r);if(k==null)return;if(!m.has(k))m.set(k,[]);m.get(k).push(r)});return [...m.entries()].sort((a,b)=>a[0]<b[0]?-1:1)};
const tally=(G,f)=>{const m=new Map();G.forEach(r=>{const k=f(r);if(k)m.set(k,(m.get(k)||0)+1)});return [...m.entries()].sort((a,b)=>b[1]-a[1])};
const tbl=(head,rows)=>['| '+head.join(' | ')+' |','|'+head.map(()=>'---').join('|')+'|',...rows.map(r=>'| '+r.map(x=>String(x==null?'':x).replace(/\|/g,'/')).join(' | ')+' |')].join('\n');
const M=r=>r.life.m||{};const P=r=>(M(r).pace)||null;
const NOEND=/^(softlock|cap|stuck|crash|harness|\?)$/;
const ended=r=>!NOEND.test(r.life.type||'?');
const RN=CAT.ranks&&CAT.ranks.length?CAT.ranks:(()=>{const o=[];L.forEach(r=>(r.life.steps||[]).forEach(s=>{if(s.n)o[s.r]=s.n}));return o})();
const rankN=i=>i==null||i<0?'—':(RN[i]||('rank '+i));
const ageB=a=>a==null?'?':a<20?'<20':a<25?'20-24':a<30?'25-29':a<40?'30-39':a<50?'40-49':'50+';
const lifeMin=r=>mins(P(r));
/* who caused a death (order #4 item 1), read from the cause text; framed = an accusation stuck within 36 buổi before she died */
const WHO=[['childbirth',/sinh|băng huyết|thai|hài nhi|dạ chửa/i],['poison',/độc|canh sâm/i],['execution',/ban chết|lụa trắng|tuẫn táng|tru di|Thận [Hh]ình|tra khảo|đánh chết|trượng|đòn|khi quân|diệt khẩu|gián điệp|mưu hại/i],
 ['NPC / scheme',/sai người|sai đánh|hãm hại|Bị .* hại|phát hiện|dìm|đẩy ngươi|thích khách|phản chủ/i],['fate (lifespan)',/Tuổi trời đã tận|tuổi cao sức yếu/i],['illness',/bệnh|nguy kịch|dịch|sốt|phong hàn|lao phổi|đậu|kiết lỵ/i],
 ['exhaustion',/kiệt sức|lao lực|quỳ phạt|chết rét|chết đói/i],['accident',/trượt chân|ngã|nghẹn|ngất|hồ Thái Dịch/i],['suicide / self',/tự vẫn|giả chết|uống thuốc/i]];
const whoOf=t=>{for(const [k,re] of WHO)if(re.test(t||''))return k;return 'other'};
const causeText=r=>(M(r).die&&M(r).die.why)||r.life.cause||r.life.fate||r.life.id||'';
const dead=L.filter(r=>r.life.death);
const causeList=r=>[M(r).die&&M(r).die.why,r.life.cause,r.life.fate,r.life.chain0].filter(Boolean);
dead.forEach(r=>{const cl=causeList(r);let e=null,t=cl[0]||r.life.id||'';for(const x of cl){e=CATM.match(CAT.deaths,x);if(e){t=x;break}}e=e||CATM.match(CAT.endings,r.life.id);r._cause=e?e.text:'(not in catalogue) '+t.slice(0,80);r._csrc=e?e.src:'';r._who=whoOf(t+' '+(r.life.id||''))});
L.forEach(r=>{const e=CATM.match(CAT.endings,r.life.id);r._end=ended(r)?(e?e.text:'(not in catalogue) '+r.life.id):null;r._esrc=e?e.src:''});
/* ---------- the kiếp series: kiếp no. within (origin, road, bot) by life number (each life = a new seed) ---------- */
const series=by(L,r=>r.job.origin+' · '+r.job.road+' · '+r.job.bot);
series.forEach(([k,G])=>{G.sort((a,b)=>a.job.life-b.job.life);let cum=0;G.forEach((r,i)=>{r._k=i+1;const m=lifeMin(r);if(m!=null)cum+=m;r._cum=cum})});
/* ---------- 0 overall ---------- */
function stats(G){const n=G.length,e=G.filter(ended),c=f=>G.filter(f).length;
 return{n,ended:e.length,death:c(r=>r.life.death),hh:c(r=>r.life.top&&r.life.top.hoangHau||(r.life.maxRank>=7)),nd:c(r=>r.life.top&&r.life.top.nuDe),htt:c(r=>r.life.top&&r.life.top.hoangThaiHau),
  grand:c(r=>r.life.group==='đại kết cục'),rare:c(r=>r.life.group==='rare'),ky:c(r=>r.life.group==='kỳ ngộ'),thuong:c(r=>r.life.group==='thường'),noend:n-e.length,
  yrs:mean(e.map(r=>+r.life.years)),min:mean(G.map(lifeMin)),bugs:G.reduce((a,r)=>a+(r.bugs||[]).length,0)}}
const HEAD0=['group','lives','ending reached','death','thường','kỳ ngộ','đại kết cục','rare','Hoàng hậu','Nữ đế','Hoàng thái hậu','no ending','avg years','avg real min','bugs'];
const row0=(k,s)=>[k,s.n,pct(s.ended,s.n),pct(s.death,s.n),pct(s.thuong,s.n),pct(s.ky,s.n),pct(s.grand,s.n),pct(s.rare,s.n),pct(s.hh,s.n),pct(s.nd,s.n),pct(s.htt,s.n),pct(s.noend,s.n),f1(s.yrs),f1(s.min),s.bugs];
const S0=stats(L);
const md=[];const now=new Date(),stamp=now.toISOString().slice(0,16).replace(/[-:]/g,'').replace('T','-');
md.push(`# ROBOT-10 round report · ${stamp} (UTC)`,'',`${L.length} lives from ${files.length} result files · thân phận ${[...new Set(L.map(r=>r.job.origin))].join(' ')} · catalogue ${cats.length?'catalog.json of the run':'code-only (no catalog.json found)'}: ${CAT.counts.deaths} death texts, ${CAT.counts.endings} endings, ${CAT.counts.dynamic} run-time-built sites.`,
 'Ending groups = the game\'s own S.kesT (jend): death; đại kết cục = grand; rare; kỳ ngộ = fate; thường = exile / fail / leave / throne. «no ending» = soft-lock / wall cap / bot stuck / crash (each is also a bug in its run\'s bug file). «real min» = the PACE MODEL (section 11), not the robot\'s own time.','',
 '## 0 · Overall','',tbl(HEAD0,[row0('ALL',S0)]),'');
/* ---------- 1 DEATH ---------- */
{const rows=tally(dead,r=>r._cause).map(([k,n])=>{const G=dead.filter(r=>r._cause===k);const fr=G.filter(r=>M(r).die&&M(r).die.framedRecent).length;
  return [k.slice(0,90),G[0]._csrc||'',n,pct(n,dead.length),pct(n,L.length),tally(G,r=>r._who).map(([w,c])=>w+(c>1?' ×'+c:'')).join(', '),f1(mean(G.map(r=>r.life.age))),rankN(Math.round(mean(G.map(r=>r.life.rank))||0)),f1(mean(G.map(lifeMin))),fr?fr+'/'+n:'—']});
 md.push(`## 1 · DEATH — ${dead.length} of ${L.length} lives died (${pct(dead.length,L.length)})`,'',rows.length?tbl(['cause (from the code)','where','deaths','of deaths','of lives','who caused it','mean age','mean rank at death','mean real min','framed before'],rows):'No death.','',
  'By who caused it: '+tally(dead,r=>r._who).map(([k,n])=>`${k} ${n} (${pct(n,dead.length)})`).join(' · '),'',
  'Per thân phận: '+by(L,r=>r.job.origin).map(([k,G])=>`${k} ${pct(G.filter(r=>r.life.death).length,G.length)} (${G.filter(r=>r.life.death).length}/${G.length})`).join(' · '),'',
  'Per age band at death: '+tally(dead,r=>ageB(r.life.age)).map(([k,n])=>`${k}: ${n}`).join(' · '),'',
  'Per rank at death: '+tally(dead,r=>rankN(r.life.rank)).map(([k,n])=>`${k}: ${n}`).join(' · '),'',
  'Stage (life frame part): '+tally(dead,r=>r.life.part!=null?'part '+r.life.part:'?').map(([k,n])=>`${k}: ${n}`).join(' · '),'');
 const hit=new Set(dead.map(r=>r._cause));const none=CAT.deaths.filter(d=>!hit.has(d.text));
 md.push(`**Death causes «chưa ai gặp» (0 hits): ${none.length} of ${CAT.deaths.length}** (maybe unreachable, or only rare: judge after a whole round)`,'',...none.map(d=>`- ${d.text.slice(0,120)} (${d.src})`),'')}
/* ---------- 2 ENDINGS ---------- */
{const E=L.filter(r=>r._end);const rows=tally(E,r=>r._end).map(([k,n])=>{const G=E.filter(r=>r._end===k);return [k.slice(0,80),G[0]._esrc||'',[...new Set(G.map(r=>r.life.type))].join('/'),n,pct(n,L.length),f1(mean(G.map(lifeMin))),f1(mean(G.map(r=>+r.life.years)))]});
 md.push(`## 2 · ENDINGS — ${E.length} of ${L.length} lives reached an ending`,'',rows.length?tbl(['ending','where','type','lives','rate','mean real min','mean in-game years'],rows):'No ending.','',
  'Every ending title as the game printed it: '+tally(E,r=>r.life.id+' ['+r.life.type+']').map(([k,n])=>`${k} ×${n}`).join(' · '),'');
 const hit=new Set(E.map(r=>r._end));const none=CAT.endings.filter(d=>!hit.has(d.text));const ge=none.filter(d=>/^GE_CAT/.test(d.src)),ot=none.filter(d=>!/^GE_CAT/.test(d.src));
 md.push(`**Endings «chưa ai gặp»: ${none.length} of ${CAT.endings.length}** — the ${ot.length} code / rare / succession endings are listed here; ${ge.length} of ${CAT.endings.filter(d=>/^GE_CAT/.test(d.src)).length} Đại kết cục titles (GE_CAT, two shadings each) are in the -avg.csv.`,'',...ot.map(d=>`- ${d.text.slice(0,110)} (${d.src})`),'')}
/* ---------- 3 RANK ---------- */
{const R=RN.map((n,i)=>i);const reach=i=>L.filter(r=>(r.life.maxRank!=null?r.life.maxRank:-1)>=i);
 md.push('## 3 · RANK','',tbl(['rank','reached (≥)','highest = this','mean real min to reach','mean in-game year of reach','mean age at reach'],R.map(i=>{const G=reach(i);const at=G.map(r=>(M(r).rankAt||{})[i]).filter(Boolean);
   return [rankN(i),pct(G.length,L.length),L.filter(r=>r.life.maxRank===i).length,f1(mean(at.map(a=>mins({chars:a.chars,clicks:a.clicks,choices:a.choices,mg:a.mg,mgs:a.mgs})))),f1(mean(at.map(a=>a.year))),f1(mean(at.map(a=>a.age)))]})),'',
  `Demotions per life: mean ${f1(mean(L.map(r=>M(r).demote)))} (lives with ≥1: ${pct(L.filter(r=>M(r).demote>0).length,L.length)}) · lãnh cung entries: mean ${f1(mean(L.map(r=>M(r).cold)))} (lives with ≥1: ${pct(L.filter(r=>M(r).cold>0).length,L.length)}) · Hoàng hậu ${pct(S0.hh,L.length)} · Nữ đế ${pct(S0.nd,L.length)} · Hoàng thái hậu ${pct(S0.htt,L.length)}`,'',
  'Per thân phận (share reaching ≥ rank):','',tbl(['thân phận',...R.map(rankN)],by(L,r=>r.job.origin).map(([k,G])=>[k,...R.map(i=>pct(G.filter(x=>(x.life.maxRank!=null?x.life.maxRank:-1)>=i).length,G.length))])),'')}
/* ---------- 4 FAMILY · 5 FAVOR/SCHEMES · 6 ECONOMY ---------- */
{const q=(k,lab)=>[lab,f1(mean(L.map(r=>M(r)[k]))),pct(L.filter(r=>M(r)[k]>0).length,L.length),Math.max(0,...L.map(r=>M(r)[k]||0))];
 md.push('## 4 · FAMILY','',tbl(['per life','mean','lives with ≥1','max'],[q('preg','pregnancies'),q('sons','sons born'),q('daus','daughters born'),q('kidDead','child deaths'),q('heirMade','Thái tử made (her son)'),q('heirLost','heir lost')]),'');
 const sch={};L.forEach(r=>Object.entries(M(r).schemes||{}).forEach(([k,x])=>{const s=sch[k]=sch[k]||{n:0,c:0,l:0};s.n+=x.n;s.c+=x.caught;s.l++}));
 md.push('## 5 · FAVOR + SCHEMES','',tbl(['per life','mean','lives with ≥1','max'],[q('nights','thị tẩm (nights)'),q('sungPk','peak Sủng'),['times framed (accusation stuck)',f1(mean(L.map(r=>(M(r).framed||[]).length))),pct(L.filter(r=>(M(r).framed||[]).length).length,L.length),Math.max(0,...L.map(r=>(M(r).framed||[]).length))],
   q('schemeCaught','her schemes caught'),q('exec','death sentences on her')]),'','Schemes she ran (doAct kind): '+(Object.keys(sch).length?Object.entries(sch).sort((a,b)=>b[1].n-a[1].n).map(([k,s])=>`${k} ${s.n} (caught ${pct(s.c,s.n)}, ${s.l} lives)`).join(' · '):'none'),
   '','Framed «won» (an accusation she beat) is not hooked yet: only accusations that stuck (framed(her)) are counted.','');
 md.push('## 6 · ECONOMY','',tbl(['bạc','mean','median','min','max'],[['peak',f1(mean(L.map(r=>M(r).bacPk))),f1(med(L.map(r=>M(r).bacPk))),f1(Math.min(...L.map(r=>M(r).bacPk||0))),f1(Math.max(...L.map(r=>M(r).bacPk||0)))],['at the end',f1(mean(L.map(r=>M(r).bacEnd))),f1(med(L.map(r=>M(r).bacEnd))),f1(Math.min(...L.map(r=>M(r).bacEnd||0))),f1(Math.max(...L.map(r=>M(r).bacEnd||0)))]]),'',
  `«Hết bạc» (bạc ≤ 0 at a buổi change): ${pct(L.filter(r=>M(r).bacZero>0).length,L.length)} of lives · per bot: `+by(L,r=>r.job.bot).map(([k,G])=>`${k} ${pct(G.filter(r=>M(r).bacZero>0).length,G.length)}`).join(' · '),'')}
/* ---------- 7 MINI-GAMES (law 5) ---------- */
{const all=[];L.forEach(r=>(M(r).mg||[]).forEach(g=>all.push(g)));const games=by(all,g=>g.k);const RR=[...new Set(all.map(g=>g.r))].sort((a,b)=>a-b);const flags=[];
 const rows=games.map(([k,G])=>{const cell=i=>{const H=G.filter(g=>g.r===i);return H.length?pct(H.filter(g=>g.win).length,H.length)+' ('+H.length+')':'—'};
  const lo=G.filter(g=>g.r<=2),hi=G.filter(g=>g.r>=4);const wl=lo.length?lo.filter(g=>g.win).length/lo.length:null,wh=hi.length?hi.filter(g=>g.win).length/hi.length:null;
  const fl=wl!=null&&wh!=null&&lo.length>=5&&hi.length>=5&&wh>wl+.05;if(fl)flags.push(k);
  return [k,G.length,pct(G.filter(g=>g.how==='skip').length,G.length),...RR.map(cell),fl?'**LAW 5: rises with rank**':(lo.length>=5&&hi.length>=5?'ok':'too few')]});
 md.push('## 7 · MINI-GAMES — win rate per game per rank (law 5: must fall as she climbs)','',all.length?tbl(['game','plays','left to luck',...RR.map(rankN),'law 5 (ranks ≤ 2 vs ≥ 4)'],rows):'No mini-game played in these lives.','',
  'Win = contest place 1 (j82 startContest) · lesson score ≥ 5 of 10 (j82 playArt) · j5 board result ≥ «Khá». The bots play the boards with their own fixed skill (or leave them to luck), so the trend by rank is what law 5 needs.'+(flags.length?` FLAGS: ${flags.join(', ')}.`:''),'')}
/* ---------- 8 KỲ NGỘ ---------- */
{const got=[];L.forEach(r=>(M(r).ky||[]).forEach(t=>got.push(t)));const T=tally(got,t=>t);const all=(CAT.ky||[]).map(x=>x.t);const none=all.filter(t=>!got.includes(t));
 md.push('## 8 · KỲ NGỘ','',`Per life: mean ${f1(mean(L.map(r=>(M(r).ky||[]).length)))} · lives with ≥1: ${pct(L.filter(r=>(M(r).ky||[]).length).length,L.length)}`,'',T.length?T.map(([k,n])=>`- ${k} ×${n}`).join('\n'):'- none this round','',
  all.length?`Kỳ ngộ «chưa ai gặp»: ${none.length} of ${all.length}${none.length?' — '+none.join(' · '):''}`:'','')}
/* ---------- 9 BALANCE FLAGS (law 2) ---------- */
{const O={};L.forEach(r=>Object.entries(M(r).opt||{}).forEach(([card,ops])=>{const c=O[card]=O[card]||{};Object.entries(ops).forEach(([o,[off,pk]])=>{const x=c[o]=c[o]||[0,0,new Set()];x[0]+=off;x[1]+=pk;x[2].add(r.job.bot)})}));
 const fl=[];Object.entries(O).forEach(([card,ops])=>{Object.entries(ops).forEach(([o,[off,pk,bs]])=>{if(off<10||bs.size<3)return;const r=pk/off;if(r>=.9||r<=.02)fl.push([card.replace(/^\|/,'').slice(0,60),o,off,pct(pk,off),bs.size,r>=.9?'≥ 90 %: the others never worth it?':'≤ 2 %: never worth taking?'])})});
 fl.sort((a,b)=>b[2]-a[2]);
 const roads=CAT.roads||{};const played=new Set(L.map(r=>r.road||r.job.road));const origins=[...new Set(L.map(r=>r.job.origin))];
 const never=origins.flatMap(o=>(roads[o]||[]).map(x=>x.id).filter(id=>!played.has(id)));const lockNever=L.filter(r=>r.lock&&!r.lock.openAt);
 md.push('## 9 · BALANCE FLAGS','',`Options offered ≥ 10 times to ≥ 3 different bots and taken ≥ 90 % or ≤ 2 % of the time (law 2: all options of one choice are worth the same) — ${fl.length} flags (bot policies bias this: read with the bot mix in mind):`,'',
  fl.length?tbl(['card','option','offered','taken','bots','flag'],fl.slice(0,60)):'none','',
  `Roads (nhánh) of this round's thân phận never played: ${never.length?never.join(', '):'none'} · locked roads that never opened: ${lockNever.length?tally(lockNever,r=>r.lock.road).map(([k,n])=>k+' ×'+n).join(', '):'none'}`,'')}
/* ---------- 10 HEALTH ---------- */
{const ty=r=>{const c={};(r.bugs||[]).forEach(b=>{const k=b.type==='stuck'&&/soft-lock/.test(b.msg)?'softlock':b.type;c[k]=(c[k]||0)+1});return c};
 const K=['softlock','stuck','crash','mem','js','save','number','word','lag'];
 md.push('## 10 · HEALTH (distinct bugs per life by kind; the bug lists are in each run\'s <origin>-<stamp>.md)','',tbl(['kind','lives hit','mean per life','max'],K.map(k=>[k,pct(L.filter(r=>ty(r)[k]).length,L.length),f1(mean(L.map(r=>ty(r)[k]||0))),Math.max(0,...L.map(r=>ty(r)[k]||0))])),
  '',`UI kinds (real pages, Fold + iPad): lives with any ui-* bug ${pct(L.filter(r=>(r.bugs||[]).some(b=>/^ui-/.test(b.type))).length,L.length)} · no ending (soft-lock / cap / stuck / crash): ${pct(S0.noend,L.length)}`,'')}
/* ---------- 11 TIME ---------- */
{const tm=G=>{const a=G.map(lifeMin).filter(num).sort((x,y)=>x-y);return a.length?[f1(mean(a)),f1(med(a)),f1(a[0]),f1(a[a.length-1])]:['—','—','—','—']};
 const tot=L.map(lifeMin).filter(num).reduce((a,x)=>a+x,0);
 md.push('## 11 · TIME (real play minutes per kiếp, pace model)','',`Cách tính: phút thật = (số chữ nàng đọc ÷ ${PACE.READ_CPS} chữ/giây + số lần bấm × ${PACE.CLICK_S} giây + số lựa chọn × ${PACE.CHOICE_S} giây + mỗi trò chơi nhỏ tự chơi ${PACE.MG_S} giây, để trời định ${PACE.MGSKIP_S} giây) ÷ 60. Chưa hiệu chỉnh bằng lượt chơi tốc độ người thật (gap). A life with no ending counts up to where it stopped.`,'',
  tbl(['group','lives','mean min','median','fastest','slowest'],[['ALL',L.length,...tm(L)],...by(L,r=>r.job.origin).map(([k,G])=>[k,G.length,...tm(G)]),...by(L,r=>r.life.group||'?').map(([k,G])=>['ending: '+k,G.length,...tm(G)]),...by(L.filter(r=>r._end),r=>r._end).filter(([k,G])=>G.length>1).map(([k,G])=>['«'+k.slice(0,40)+'»',G.length,...tm(G)])]),'',
  `Whole round: ${f1(tot/60)} giờ chơi thật cho ${L.length} kiếp ≈ ${f1(tot/L.length)} phút/kiếp ≈ ${f1(tot/L.length/60)} ngày/kiếp nếu chơi 1 giờ/ngày.`,'',
  'Cumulative over the kiếp series (same thân phận · nhánh · bot, kiếp 1..N = a new seed each):','',tbl(['series','kiếp','minutes each','cumulative'],series.map(([k,G])=>[k,G.length,G.map(r=>f1(lifeMin(r))).join(' · '),f1(G[G.length-1]._cum)+' min = '+f1(G[G.length-1]._cum/60)+' h'])),'')}
/* ---------- 12 EVENT VARIETY ---------- */
{const fam={},seen=new Map();L.forEach(r=>Object.entries(M(r).ev||{}).forEach(([k,e])=>{const f=fam[e.f]=fam[e.f]||{cards:new Set(),shows:0};f.cards.add(k);f.shows+=e.n;seen.set(k,(seen.get(k)||0)+1)}));
 const rep=series.map(([k,G])=>{const ks=G.map(r=>new Set(Object.keys(M(r).ev||{})));let again=0,tot=0;for(let i=1;i<ks.length;i++){ks[i].forEach(x=>{tot++;if(ks.slice(0,i).some(s=>s.has(x)))again++})}return [k,G.length,f1(mean(G.map(r=>M(r).evDistinct))),f1(mean(G.map(r=>M(r).evRep))),ks.length>1?pct(again,tot):'—']});
 md.push('## 12 · EVENT VARIETY (cards she answered; key = pid or the title without numbers)','',`Per kiếp: distinct cards mean ${f1(mean(L.map(r=>M(r).evDistinct)))} · cards seen more than once in the same kiếp mean ${f1(mean(L.map(r=>M(r).evRep)))} · distinct cards in the whole round ${seen.size}`,'',
  tbl(['family (pid prefix)','distinct cards','shows'],Object.entries(fam).sort((a,b)=>b[1].shows-a[1].shows).slice(0,40).map(([k,f])=>[k,f.cards.size,f.shows])),'',
  tbl(['series','kiếp','distinct / kiếp','repeated in the kiếp','seen in an earlier kiếp of the series'],rep),'','Families / templates never seen in the round need an event catalogue (j68 EV6 / j70 / j71 / j72 / j7 / j24 / ARC67 beats): not built yet (gap, order #5).','')}
/* ---------- per thân phận × nhánh × bot ---------- */
md.push('## Per thân phận · nhánh · bot','',tbl(HEAD0,[...by(L,r=>r.job.origin).map(([k,G])=>row0(k,stats(G))),...by(L,r=>r.job.origin+' · '+r.job.road).map(([k,G])=>row0(k,stats(G))),...by(L,r=>'bot '+r.job.bot).map(([k,G])=>row0(k,stats(G)))]),'',
 tbl(HEAD0,by(L,r=>r.job.origin+' · '+r.job.road+' · '+r.job.bot).map(([k,G])=>row0(k,stats(G)))),'');
/* ---------- locked roads ---------- */
{const locks=L.filter(r=>r.lock);md.push('## Locked roads (arcOk67 false at start; never open in 5 kiếp = bug)','',locks.length?by(locks,r=>r.lock.road).map(([k,G])=>{const op=G.filter(r=>r.lock.openAt),pl=G.filter(r=>r.lock.playAt);return `- ${k}: ${G.length} lives · opened in ${op.length} · played in ${pl.length}${G.length>=5&&!op.length?' · **BUG: never opened in '+G.length+' kiếp**':''}`}).join('\n'):'None in these runs.','')}
/* ---------- RECOMMENDATIONS (OWNER ORDER #6; the LAST section; robot10-reco.js) — BAL read from the game page (bal.json of the run, else read now from GAME) ---------- */
{const RECO=require('./robot10-reco.js');let BALX=null;bals.sort((a,b)=>b[1]-a[1]);
 const tryF=f=>{try{return JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){return null}};
 if(bals.length)BALX=tryF(bals[0][0]);if(!BALX&&fs.existsSync(path.join(out,'bal.json')))BALX=tryF(path.join(out,'bal.json'));
 if(!BALX)try{const s=require('child_process').execFileSync(process.execPath,[path.join(__dirname,'robot10-reco.js'),'bal',process.env.GAME||''],{maxBuffer:64e6,timeout:300000});BALX=JSON.parse(s.toString())}catch(e){console.error('bal: '+e.message.split('\n')[0])}
 md.push(...RECO.recommend({L,BALX,pct,f1,mean,by,M,lifeMin,ended,rankN,mins,tbl}))}
/* ---------- write ---------- */
fs.mkdirSync(out,{recursive:true});const base=path.join(out,`rates-${stamp}`);fs.writeFileSync(base+'.md',md.join('\n'));
const csvq=v=>{v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
const H=['kiep_no','origin','road','bot','life','seed','real_min','cum_min','years','age','max_rank','ending','ending_type','group','death_cause','cause_src','who','framed_before','buoi','preg','sons','daughters','kid_deaths','heir_made','nights','sung_peak','bac_peak','bac_end','het_bac','mini_games','ky_ngo','events_distinct','bugs','bot_min'];
const key=r=>[r.job.origin,r.job.road,r.job.bot,String(r.job.life).padStart(4,'0')].join('|');
const lines=[H.join(',')].concat(L.slice().sort((a,b)=>key(a)<key(b)?-1:1).map(r=>{const m=M(r);return [r._k,r.job.origin,r.road||r.job.road,r.job.bot,r.job.life,r.job.seed,f1(lifeMin(r)),f1(r._cum),r.life.years,r.life.age,rankN(r.life.maxRank),r.life.id,r.life.type,r.life.group,r.life.death?r._cause:'',r.life.death?r._csrc:'',r.life.death?r._who:'',r.life.death&&m.die?(m.die.framedRecent?1:0):'',r.buoi,m.preg,m.sons,m.daus,m.kidDead,m.heirMade,m.nights,m.sungPk,m.bacPk,m.bacEnd,m.bacZero>0?1:0,(m.mg||[]).length,(m.ky||[]).length,m.evDistinct,(r.bugs||[]).length,r.life.botMin].map(csvq).join(',')}));
fs.writeFileSync(base+'.csv',lines.join('\n')+'\n');
const tmr=G=>{const a=G.map(lifeMin).filter(num).sort((x,y)=>x-y);return a.length?[f1(mean(a)),f1(med(a)),f1(a[0]),f1(a[a.length-1])]:['','','','']};
const avg=[['group','key','lives','mean_min','median_min','fastest_min','slowest_min','death_rate','hoang_hau_rate_or_flag'].join(',')];
const av=(g,k,G)=>avg.push([g,k,G.length,...tmr(G),pct(G.filter(r=>r.life.death).length,G.length),pct(G.filter(r=>r.life.maxRank>=7).length,G.length)].map(csvq).join(','));
av('overall','ALL',L);by(L,r=>r.job.origin).forEach(([k,G])=>av('than_phan',k,G));by(L,r=>r.job.origin+' · '+r.job.road).forEach(([k,G])=>av('nhanh',k,G));by(L,r=>r.life.group||'?').forEach(([k,G])=>av('ending_type',k,G));by(L,r=>r.job.bot).forEach(([k,G])=>av('bot',k,G));
{const E=L.filter(r=>r._end);CAT.endings.forEach(e=>{const G=E.filter(r=>r._end===e.text);avg.push(['ending',e.text,G.length,...tmr(G),'',G.length?'':'chua ai gap'].map(csvq).join(','))});
 CAT.deaths.forEach(e=>{const G=dead.filter(r=>r._cause===e.text);avg.push(['death_cause',e.text,G.length,...tmr(G),pct(G.length,L.length),G.length?'':'chua ai gap'].map(csvq).join(','))})}
fs.writeFileSync(base+'-avg.csv',avg.join('\n')+'\n');
console.log('rates: '+base+'.md (+ .csv, -avg.csv) · '+L.length+' lives');
