/* TEMPER-OUTBURST G4 on the shared REAL-TAP harness (review/robot-realtap dev/test/robot-rt.js — its Seat, start-through-title, taps,
   stuck/dead-button checks reused unchanged). Replaces the runb.js arms (runb sens TIMEOUTs at turn 0, main too).
   usage: node dev/measure/temper-hh-rt.js run <url|file> <outdir> <lives per arm> [arms=hot,even,timid,off] [par=3] [extra robot-rt k=v ...]
          node dev/measure/temper-hh-rt.js sum <outdir>
   Each life: robot-rt bot=sens, Fold, seed = life no., the arm set by dev/measure/intemper-rt.js on page load (pre-life setup, no tap).
   A life ends at death or a real ending (robot-rt rule; no cap) unless slice=<buổi> is passed (then «sliced», counted at that horizon).
   Pass = every ON arm's mean max rank ≥ OFF − 1 pooled SE, HH reach ≥ OFF − 1 SE, early death (< 3 years) ≤ OFF + 1 SE. */
'use strict';
const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const [,,cmd,...a]=process.argv;
if(cmd==='life'){ /* one life in this process */
 const [URL0,OUT,ARM,SEED,...KV]=a;const K=Object.fromEntries(KV.map(s=>s.split('=')));const {chromium}=require('playwright');const {Seat}=require('../test/robot-rt.js');
 const url=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const life=`tp-${ARM}-${SEED}`;const src=fs.readFileSync(path.join(__dirname,'intemper-rt.js'),'utf8');
 const seat=Seat({url,out:OUT,dev:'fold',bot:'sens',seed:SEED,life,slice:K.slice,stuckMin:K.stuckMin,resume:K.resume==='1'});
 (async()=>{const br=await chromium.launch();const ctx=await br.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,isMobile:true,serviceWorkers:'block'});let M=null;try{process.env.RT_MEM=process.env.RT_MEM||path.join(OUT,life+'.mem.jsonl');process.env.RT_LIGHT='1';process.env.RT_HANGKILL=process.env.RT_HANGKILL||'3500';M=require('./renderer-mem-lib.js');await M.init(ctx)}catch(e){console.error('mem-lib',e.message)}const p=await ctx.newPage();try{M&&await M.watch(p)}catch(e){console.error('mem-watch',e.message)}/* F10 hang watchdog (review/renderer-mem bac25389): page must answer a no-op every 20 s; a hang -> 5 V8 stacks in <life>.mem.hang.json, browser closed above 3.5 GB */
  const inj=()=>p.evaluate(([A,s])=>{window.__tArm=A;(0,eval)(s)},[ARM,src]).catch(()=>{});p.on('load',()=>{p.waitForFunction(()=>typeof endTurn==='function'&&typeof BAL!=='undefined',null,{timeout:0}).then(inj).catch(()=>{})});
  let tp=null;const grab=async()=>{try{const t=await p.evaluate(()=>{try{window.__tpSet&&window.__tpSet()}catch(e){}return window.__tp&&JSON.parse(JSON.stringify(window.__tp))});if(t){tp=t;fs.writeFileSync(path.join(OUT,life+'.tp-live.json'),JSON.stringify({arm:ARM,seed:+SEED,at:new Date().toISOString(),buoi:seat.R.buoi,tp,dead:seat.R.dead.length,stuck:seat.R.harness.stuck}))}}catch(e){}};const iv=setInterval(grab,20e3);
  try{await seat.play(p)}catch(e){seat.R.bugs.push({type:'harness',msg:'runner error: '+String(e.message).split('\n')[0],n:1});seat.R.life=seat.R.life||{id:'HARNESS',type:'harness'};console.error(e)}
  clearInterval(iv);await grab();seat.R.tp=tp;seat.save();fs.writeFileSync(path.join(OUT,life+'.tp.json'),JSON.stringify({arm:ARM,seed:+SEED,life:seat.R.life,buoi:seat.R.buoi,sliced:!!seat.R.sliced,tp,dead:seat.R.dead.length,stuck:seat.R.harness.stuck,bugs:seat.R.bugs.length,taps:seat.R.harness.taps}));
  console.log('TP DONE',life,JSON.stringify(tp),'life',seat.R.life&&seat.R.life.id);await br.close()})()}
else if(cmd==='run'){const [URL0,OUT,N0,ARMS,PAR,...KV]=a;const n=+N0||4,arms=(ARMS||'hot,even,timid,off').split(','),par=+PAR||3;fs.mkdirSync(OUT,{recursive:true});
 const q=[];for(let i=1;i<=n;i++)for(const A of arms){const f=path.join(OUT,`tp-${A}-${i}.tp.json`);let done=false;try{const r=JSON.parse(fs.readFileSync(f));done=!!(r.life&&!/HARNESS|\?/.test(r.life.id))}catch(e){}if(!done&&!(process.env.G4_SKIP||'').split(',').includes(`${A}-${i}`))q.push([A,i])}/* G4_SKIP=hot-2,...: a parked lane (e.g. HANG-BLOCKED on LIVE) is not relaunched *//* a killed / harness-error life is resumed (resume=1), never counted as done */let run=0;
 const next=()=>{while(run<par&&q.length){const [A,i]=q.shift();run++;const c=spawn('node',[__filename,'life',URL0,OUT,A,String(i),...KV],{stdio:['ignore','pipe','pipe']});
  const lg=fs.createWriteStream(path.join(OUT,`tp-${A}-${i}.log`));c.stdout.pipe(lg);c.stderr.pipe(lg);c.on('exit',x=>{run--;console.log('life',A,i,'exit',x,'left',q.length,'running',run);next()})}};next()}
else if(cmd==='sum'){const OUT=a[0];const st=v=>{const m=v.reduce((t,x)=>t+x,0)/Math.max(1,v.length);const sd=Math.sqrt(v.reduce((t,x)=>t+(x-m)**2,0)/Math.max(1,v.length-1));return{m:+m.toFixed(2),se:+(sd/Math.sqrt(Math.max(1,v.length))).toFixed(2)}};
 const by={};for(const f of fs.readdirSync(OUT).filter(f=>/\.tp\.json$/.test(f))){const r=JSON.parse(fs.readFileSync(path.join(OUT,f)));if(!r.tp||!r.life||/HARNESS|\?/.test(r.life.id))continue;(by[r.arm]=by[r.arm]||[]).push(r)}
 const rows=Object.entries(by).map(([A,R])=>{const yrs=r=>Math.max(0,((r.life.year??r.tp.year)||0)-(r.tp.y0||0));
  return{arm:A,n:R.length,maxRank:st(R.map(r=>r.tp.maxRank)),hh:st(R.map(r=>r.tp.maxRank>=7?1:0)),early:st(R.map(r=>r.life.type==='death'&&yrs(r)<3?1:0)),buoi:st(R.map(r=>r.buoi)),yrs:st(R.map(yrs)),
   choice:st(R.map(r=>r.tp.choice)),out:st(R.map(r=>Object.values(r.tp.out||{}).reduce((t,v)=>t+v,0))),temper:[...new Set(R.map(r=>r.tp.temper))].join('/'),ends:R.map(r=>r.life.id+(r.sliced?'(slice)':'')).join(' '),dead:R.reduce((t,r)=>t+r.dead,0),stuck:R.reduce((t,r)=>t+r.stuck,0)}});
 console.log('| arm | lives | max rank ± SE | HH reach ± SE | early death ± SE | years ± SE | buổi ± SE | choice frames/life | outbursts/life | temper | ends | dead btn | stuck |');console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
 for(const r of rows)console.log(`| ${r.arm} | ${r.n} | ${r.maxRank.m} ± ${r.maxRank.se} | ${r.hh.m} ± ${r.hh.se} | ${r.early.m} ± ${r.early.se} | ${r.yrs.m} ± ${r.yrs.se} | ${r.buoi.m} ± ${r.buoi.se} | ${r.choice.m} | ${r.out.m} | ${r.temper} | ${r.ends} | ${r.dead} | ${r.stuck} |`);
 const off=rows.find(r=>r.arm==='off');let bad=0;if(off)for(const r of rows.filter(r=>r.arm!=='off')){const se=Math.hypot(r.maxRank.se,off.maxRank.se),sH=Math.hypot(r.hh.se,off.hh.se),sE=Math.hypot(r.early.se,off.early.se);
  const ok=r.maxRank.m>=off.maxRank.m-se&&r.hh.m>=off.hh.m-sH&&r.early.m<=off.early.m+sE;if(!ok)bad++;console.log(`${r.arm}: ${ok?'PASS':'FAIL'} (max rank Δ ${(r.maxRank.m-off.maxRank.m).toFixed(2)} vs SE ${se.toFixed(2)}; HH Δ ${(r.hh.m-off.hh.m).toFixed(2)} vs ${sH.toFixed(2)}; early Δ ${(r.early.m-off.early.m).toFixed(2)} vs ${sE.toFixed(2)})`)}
 process.exitCode=bad?1:0}
else if(cmd==='live'){const OUT=a[0];console.log('| life | at | buổi | year | rank (max) | Danh | Sủng | lãnh cung | choice frames | outbursts | temper |');console.log('|---|---|---|---|---|---|---|---|---|---|---|');
 for(const f of fs.readdirSync(OUT).filter(f=>/\.tp-live\.json$/.test(f)).sort()){const r=JSON.parse(fs.readFileSync(path.join(OUT,f)));const t=r.tp||{};const n=Object.values(t.out||{}).reduce((s,v)=>s+v,0);
  console.log(`| ${f.replace('.tp-live.json','')} | ${r.at.slice(11,16)}Z | ${r.buoi} | ${(t.year||0)-(t.y0||0)+1} | ${t.rank} (${t.maxRank}) | ${t.danh} | ${t.sung} | ${t.coldPalace?'yes':'no'} | ${t.choice} | ${n} ${JSON.stringify(t.out||{})} | ${t.temper} |`)}}
else{console.error('usage: run <url> <out> <n> [arms] [par] [k=v..] | sum <out>');process.exit(2)}
