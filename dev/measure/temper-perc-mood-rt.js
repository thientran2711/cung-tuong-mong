/* review/temper-perception (T2c) — NPC mood-term rate check, ROUTE 1: real-tap robot lives per arm on the shared harness
   (review/robot-realtap dev/test/robot-rt.js, used unchanged; path in env RTDIR=<worktree of robot-realtap>/dev/test).
   usage: node temper-perc-mood-rt.js run <outdir> <lives per arm> <par> <armspec...> [k=v …]   armspec = name=<game html>:<main|on|off>  e.g. main=/wt/main/dev/index.html:main on=/wt/tp/dev/index.html:on
          node temper-perc-mood-rt.js life <html> <outdir> <armname> <armkind> <seed> [k=v…]      (one life; resume=1 continues the SAME life)
          node temper-perc-mood-rt.js sum <outdir>
   Pre-life setup only (counters injected after load; no tap simulated). A life ends at death / real ending (robot-rt rule, no cap) unless slice=<buổi>. */
'use strict';
const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const RTDIR=process.env.RTDIR||path.join(__dirname,'..','test');
const [,,cmd,...a]=process.argv;
if(cmd==='life'){const [HTML,OUT,ARM,KIND,SEED,...KV]=a;const K=Object.fromEntries(KV.map(s=>s.split('=')));const {chromium}=require('playwright');const {Seat}=require(path.join(RTDIR,'robot-rt.js'));
 fs.mkdirSync(OUT,{recursive:true});const url='file://'+path.resolve(HTML);const life=`pm-${ARM}-${SEED}`;const src=fs.readFileSync(path.join(__dirname,'intpmood-rt.js'),'utf8');
 const seat=Seat({url,out:OUT,dev:'fold',bot:K.bot||'sens',seed:SEED,life,slice:K.slice,stuckMin:K.stuckMin,resume:K.resume==='1'});
 (async()=>{const br=await chromium.launch();const ctx=await br.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,isMobile:true,serviceWorkers:'block'});const p=await ctx.newPage();
  const inj=()=>p.evaluate(([A,s])=>{window.__tpmArm=A;(0,eval)(s)},[KIND,src]).catch(()=>{});p.on('load',()=>{p.waitForFunction(()=>typeof endTurn==='function'&&typeof BAL!=='undefined'&&typeof motiveOK==='function',null,{timeout:0}).then(inj).catch(()=>{})});
  let tpm=null;const grab=async()=>{try{const t=await p.evaluate(()=>window.__tpmGet&&window.__tpmGet());if(t){tpm=t;fs.writeFileSync(path.join(OUT,life+'.live.json'),JSON.stringify({arm:ARM,kind:KIND,seed:+SEED,at:new Date().toISOString(),buoi:seat.R.buoi,tpm,dead:seat.R.dead.length,stuck:seat.R.harness.stuck}))}}catch(e){}};const iv=setInterval(grab,20e3);
  try{await seat.play(p)}catch(e){seat.R.bugs.push({type:'harness',msg:'runner error: '+String(e.message).split('\n')[0],n:1});seat.R.life=seat.R.life||{id:'HARNESS',type:'harness'};console.error(e)}
  clearInterval(iv);await grab();seat.R.tpm=tpm;seat.save();fs.writeFileSync(path.join(OUT,life+'.pm.json'),JSON.stringify({arm:ARM,kind:KIND,seed:+SEED,life:seat.R.life,buoi:seat.R.buoi,sliced:!!seat.R.sliced,tpm,dead:seat.R.dead.length,stuck:seat.R.harness.stuck,bugs:seat.R.bugs.length,taps:seat.R.harness.taps}));
  console.log('PM DONE',life,JSON.stringify(tpm),'life',seat.R.life&&seat.R.life.id);await br.close()})()}
else if(cmd==='run'){const [OUT,N0,PAR,...SPECS]=a;const KV=SPECS.filter(s=>/^[a-z]+=[^:]*$/.test(s)&&!/:(main|on|off)$/.test(s));const arms=SPECS.filter(s=>/:(main|on|off)$/.test(s)).map(s=>{const[n,r]=s.split(/=(.+)/);const i=r.lastIndexOf(':');return{n,html:r.slice(0,i),kind:r.slice(i+1)}});
 const n=+N0||4,par=+PAR||2;fs.mkdirSync(OUT,{recursive:true});const q=[];for(let i=1;i<=n;i++)for(const A of arms){const f=path.join(OUT,`pm-${A.n}-${i}.pm.json`);let done=false;try{const r=JSON.parse(fs.readFileSync(f));done=!!(r.life&&!/HARNESS|\?/.test(r.life.id))}catch(e){}if(!done)q.push([A,i])}
 let run=0;const next=()=>{while(run<par&&q.length){const [A,i]=q.shift();run++;const resume=fs.existsSync(path.join(OUT,`pm-${A.n}-${i}.ckpt.json`))?['resume=1']:[];const c=spawn('node',[__filename,'life',A.html,OUT,A.n,A.kind,String(i),...KV,...resume],{stdio:['ignore','pipe','pipe']});
  const lg=fs.createWriteStream(path.join(OUT,`pm-${A.n}-${i}.log`),{flags:'a'});c.stdout.pipe(lg);c.stderr.pipe(lg);c.on('exit',x=>{run--;console.log(new Date().toISOString().slice(11,16),'life',A.n,i,'exit',x,'left',q.length,'running',run);if(!q.length&&!run)console.log('ALL DONE');next()})}};
 process.on('SIGTERM',()=>process.exit(0));next()}
else if(cmd==='sum'){const OUT=a[0];const rows={};for(const f of fs.readdirSync(OUT).filter(f=>/\.(pm|live)\.json$/.test(f))){const r=JSON.parse(fs.readFileSync(path.join(OUT,f)));const fin=/\.pm\.json$/.test(f)&&!(r.life&&/HARNESS/.test(r.life.id));const k=r.arm+'|'+r.seed;if(!rows[k]||fin)rows[k]={...r,fin}}
 const by={};for(const r of Object.values(rows)){if(!r.tpm)continue;const b=by[r.arm]=by[r.arm]||{kind:r.kind,lives:0,fin:0,buoi:0,calls:0,pass:0,block:0,byMood:0,deeds:0,byKind:{}};b.lives++;if(r.fin)b.fin++;b.yrs=(b.yrs||0)+Math.max(0,(r.tpm.y||0)-(r.tpm.y0||0));b.act=b.act||{};for(const[k,v]of Object.entries(r.tpm.act||{}))b.act[k]=(b.act[k]||0)+v;b.buoi+=r.buoi||0;for(const k of['calls','pass','block','byMood','deeds'])b[k]+=r.tpm[k]||0;for(const[k,v]of Object.entries(r.tpm.byKind||{})){const x=b.byKind[k]=b.byKind[k]||[0,0,0];v.forEach((y,i)=>x[i]+=y)}}
 console.log('| arm | lives (done) | buổi | NPC hostile gate calls | pass | pass % | passes owed to mood | gây sự deeds (tpDeed) | pass / buổi | deeds / buổi |');console.log('|---|---|---|---|---|---|---|---|---|---|');
 for(const[A,b]of Object.entries(by))console.log(`| ${A} (${b.kind}) | ${b.lives} (${b.fin}) | ${b.buoi} | ${b.calls} | ${b.pass} | ${(100*b.pass/Math.max(1,b.calls)).toFixed(1)} | ${b.byMood} | ${b.deeds} | ${(b.pass/Math.max(1,b.buoi)).toFixed(3)} | ${(b.deeds/Math.max(1,b.buoi)).toFixed(3)} |`);
 for(const[A,b]of Object.entries(by))console.log(A,'years',b.yrs,'executed NPC harm acts (runAct) by kind',JSON.stringify(b.act),'per year',JSON.stringify(Object.fromEntries(Object.entries(b.act||{}).map(([k,v])=>[k,+(v/Math.max(1,b.yrs)).toFixed(2)]))));
 for(const[A,b]of Object.entries(by))console.log(A,'byKind [calls,pass,mood]',JSON.stringify(b.byKind))}
else{console.error('usage: run|life|sum');process.exit(2)}
