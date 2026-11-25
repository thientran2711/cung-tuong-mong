/* robot-audit.js — AUDIT of finished robot lives against the owner rules of 25/11 (OD ~05:10Z real taps, ~05:15Z life = until death/real ending, no cap,
   ~05:20Z/~05:40Z no voluntary exit while another option exists, ~05:45Z AUDIT + RERUN, ~05:58Z JS-click lives that played to a true end COUNT).
 USAGE  node dev/measure/robot-audit.js <robot results folder> [--line E] [--coop U14,U15,...] [--out <report.md>] [--valid-dir <folder>]
        reads every ROBOT-10 solo result JSON (<origin>-<stamp>.json: array of {job,life,...}) of the folder (+ co-op coop-U*.json: {run,pairs:[{job,lives:[…]}]}),
        de-duplicates (same job id + seed: newest file name wins; co-op: pair/seat/kiếp/road/age/buổi), classifies EVERY life and writes
        a table (md), a JSON of the table (<report>.json) and, with --valid-dir, the VALID solo lives as result JSON for robot10-agg.js.
 CLASSES VALID (death / game-imposed ending, no bot-chosen exit)  ·  INVALID: cap · timeout (inpage6 TIMEOUT) · stuck (harness/browser closed/abandoned/softlock/crash) · exit (bot-chosen exit road while the game offered another option)
        · jsclick (only when --strict-click: the harness click was el.click()/evaluate, not a real tap; OFF by default — owner 25/11 ~05:58Z: machine clicks that played to a true end COUNT)
 EXIT TABLE  an ending is a bot-chosen exit when the game's code shows it comes from an option card that always had a sibling option (checked on main 4da55ce8):
        Xuất gia (j14 menu · j25 «Thôi, ở lại»), Xuất cung về quê / mở tiệm / chưởng sự (j42 cnvAge: sibling «Ở lại…/Xin ở lại»; jroute hl_que), Xuất giá (j42 cnvWed: «Xin ở lại hầu chủ»),
        Được ban hôn (jroute road card), Phế làm thứ dân (jroute hl_phe) …  NOT exit: «Xuất cung tuổi N» (j42:303 forced at BAL.srvAge.out), Thái phi, Lãnh cung, Mẫu hậu, deaths, Đại kết cục.
        The result JSON does not log the last choices, so «only option left» cannot be proven per life: an exit ending is INVALID unless its fate says it was forced. */
const fs=require('fs'),path=require('path');
const A=process.argv.slice(2);let dir=null,line='E',out=null,validDir=null,coopSel=null,strictClick=false;
for(let i=0;i<A.length;i++){if(A[i]==='--line')line=A[++i];else if(A[i]==='--out')out=A[++i];else if(A[i]==='--valid-dir')validDir=A[++i];else if(A[i]==='--coop')coopSel=A[++i].split(',');else if(A[i]==='--strict-click')strictClick=true;else dir=A[i]}
if(!dir){console.log('usage: node dev/measure/robot-audit.js <robot folder> [--line E] [--coop U14,...] [--out report.md] [--valid-dir dir] [--strict-click]');process.exit(2)}
const EXIT_ID=/^(Xuất gia|Xuất giá|Được ban hôn|Phế làm thứ dân|Xuất cung(?! tuổi))/;           // life.id / fate that are voluntary exits
const FORCED=/^Xuất cung tuổi \d+/;                                                         // forced at the age limit
const SOLO=/^(thd|cnv|bd|pf)-.*\.json$/;const COOP=/^coop-(U\d+[a-z]?)-.*\.json$/;
const stampOf=f=>(f.match(/(\d{8})-?(\d{4})?/)||[])[0]||f;
const rows=[];
function classify(L,job,extra){const id=(L&&L.id)||'?',fate=(L&&L.fate)||'',type=L&&L.type;
 if(type==='cap'||id==='CAP')return['INVALID','cap','wall cap, no ending'];
 if(id==='TIMEOUT')return['INVALID','timeout','inpage6 TIMEOUT (no progress / 60000 steps)'];
 if(type==='harness'||id==='HARNESS'||type==='crash'||type==='softlock'||id==='SOFTLOCK'||id==='CRASH')return['INVALID','stuck','harness/browser closed, crash or softlock — life abandoned'];
 if(type==='stuck')return['INVALID','stuck','stuck'];
 if(FORCED.test(fate)||FORCED.test(id))return['VALID','','game-imposed: forced out at the age limit'];
 if(EXIT_ID.test(id)||EXIT_ID.test(fate)||type==='leave')return['INVALID','exit','bot-chosen exit «'+(fate||id)+'» (game offered a sibling option)'];
 if(type==='death'||type==='grand'||(L&&L.death))return['VALID','',type==='grand'?'đại kết cục (game ending)':'died: '+(L.cause||id).slice(0,70)];
 return['INVALID','stuck','unclassified end «'+id+'»/'+type];
}
const files=fs.readdirSync(dir).filter(f=>/\.json$/.test(f)).sort((a,b)=>stampOf(a).localeCompare(stampOf(b))||a.localeCompare(b));
const solo=new Map(),coop=new Map();
for(const f of files){let d;try{d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'))}catch(e){continue}
 if(SOLO.test(f)&&Array.isArray(d)){for(const r of d)if(r&&r.job&&r.life)solo.set(r.job.id+'#'+(r.job.seed||''),{r,f})}
 else if(COOP.test(f)&&d&&Array.isArray(d.pairs)){const u=f.match(COOP)[1];if(coopSel&&!coopSel.some(s=>u===s||u.startsWith(s)))continue;
  for(const p of d.pairs)for(const l of (p.lives||[])){if(!l.life)continue;const k=[u,p.job&&p.job.id,l.seat,l.kiep,l.tp&&l.tp.road,l.life.age,l.life.year,l.life.id].join('|');coop.set(k,{p,l,f,u})}}}
for(const {r,f} of solo.values()){const j=r.job,[v,why,det]=classify(r.life,j);
 rows.push({kind:'solo',round:(f.match(/-(R\d)/)||[,j.origin==='pf'?'R5':'?'])[1],file:f,origin:j.origin,road:j.road,bot:j.bot,life:j.life,seed:j.seed,jobId:j.id,end:r.life.id,fate:r.life.fate,age:r.life.age,years:r.life.years,valid:v,why,det,rec:r})}
for(const {p,l,f,u} of coop.values()){const [v,why,det]=classify(l.life,p.job);
 rows.push({kind:'coop',round:u,file:f,origin:l.tp&&l.tp.origin,road:l.tp&&l.tp.road,bot:l.seat+'/'+l.player+'/'+l.dev,life:l.kiep,seed:p.job&&p.job.seed,jobId:(p.job&&p.job.id)+'-'+l.seat+'-k'+l.kiep,end:l.life.id,fate:l.life.fate,age:l.life.age,years:l.life.years,valid:v,why,det,rec:null,pair:p.job&&p.job.pair,swap:p.job&&p.job.swap})}
if(strictClick)for(const x of rows)if(x.valid==='VALID'){x.valid='INVALID';x.why='jsclick';x.det='JS el.click() harness (strict mode)'}
const N=rows.length,V=rows.filter(x=>x.valid==='VALID').length,cnt=k=>rows.filter(x=>x.why===k).length;
const by=(f)=>{const m={};for(const x of rows){const k=f(x);(m[k]=m[k]||{n:0,v:0,cap:0,timeout:0,stuck:0,exit:0,jsclick:0});m[k].n++;if(x.valid==='VALID')m[k].v++;else m[k][x.why]++}return m};
const tab=(m,h)=>['| '+h+' | N | valid | cap | timeout | stuck | exit | jsclick |','|---|---|---|---|---|---|---|---|'].concat(Object.keys(m).sort().map(k=>`| ${k} | ${m[k].n} | ${m[k].v} | ${m[k].cap} | ${m[k].timeout} | ${m[k].stuck} | ${m[k].exit} | ${m[k].jsclick} |`));
const summary=`AUDIT ${line} total ${N} valid ${V} invalid ${N-V} (cap ${cnt('cap')} / timeout ${cnt('timeout')} / stuck ${cnt('stuck')} / exit ${cnt('exit')} / jsclick ${cnt('jsclick')})`;
console.log(summary);
const rerun=new Map();for(const x of rows)if(x.valid==='INVALID'){const k=[x.origin,x.road].join(' / ');(rerun.get(k)||rerun.set(k,[]).get(k)).push(x)}
const md=['# ROBOT AUDIT '+line+' — every life vs the owner rules of 25/11','',summary,'','Rules applied: OD 25/11 ~05:10Z real taps · ~05:15Z life until death/real ending, no cap · ~05:20Z/~05:40Z no voluntary exit unless it is the only option · ~05:45Z audit+rerun · ~05:58Z JS-click lives that reached a true end COUNT'+(strictClick?' (STRICT mode: every JS-click life invalid)':'')+'. Generated by dev/measure/robot-audit.js.','',
 '## Counts by round','',...tab(by(x=>x.kind+' '+x.round),'round'),'','## Counts by origin / road','',...tab(by(x=>x.origin+' / '+x.road),'origin / road'),'','## RERUN LIST (invalid lives grouped by origin / road; one row = one life to replay)','',
 '| origin / road | lives to rerun | by reason | seeds (round·bot·kiếp:seed) |','|---|---|---|---|',
 ...[...rerun.entries()].sort().map(([k,a])=>{const rs={};a.forEach(x=>rs[x.why]=(rs[x.why]||0)+1);return `| ${k} | ${a.length} | ${Object.entries(rs).map(e=>e.join(' ')).join(', ')} | ${a.slice(0,12).map(x=>x.round+'·'+x.bot+'·'+x.life+':'+x.seed).join('; ')}${a.length>12?' …(+'+(a.length-12)+', full list in the .json)':''} |`}),'',
 '## Every life','','| round | origin | road | life (bot/kiếp/seed) | end | valid? | why |','|---|---|---|---|---|---|---|',
 ...rows.sort((a,b)=>(a.kind+a.round+a.origin+a.road+a.jobId).localeCompare(b.kind+b.round+b.origin+b.road+b.jobId)).map(x=>`| ${x.round} | ${x.origin} | ${x.road} | ${x.bot}/${x.life}/${x.seed} | ${String(x.end).replace(/\|/g,'/')} | ${x.valid==='VALID'?'VALID':'INVALID'} | ${x.valid==='VALID'?x.det.replace(/\|/g,'/'):x.why+': '+x.det.replace(/\|/g,'/')} |`)];
if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,md.join('\n')+'\n');fs.writeFileSync(out.replace(/\.md$/,'')+'.json',JSON.stringify({summary,rows:rows.map(({rec,...x})=>x)},null,1))}
else console.log(md.join('\n'));
if(validDir){fs.mkdirSync(validDir,{recursive:true});const v=rows.filter(x=>x.valid==='VALID'&&x.rec).map(x=>x.rec);fs.writeFileSync(path.join(validDir,'valid-solo-lives.json'),JSON.stringify(v));
 const vc=rows.filter(x=>x.valid==='VALID'&&x.kind==='coop');console.log('valid solo lives written: '+v.length+' · valid co-op lives (not in agg format): '+vc.length)}
