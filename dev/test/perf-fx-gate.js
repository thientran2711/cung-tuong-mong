/* dev/test/perf-fx-gate.js — CI gate for the frame-time test dev/test/perf-fx.js (OD:L719 budget rule 6, GAP AP04).
   usage: node dev/test/perf-fx-gate.js [--kind rain] [--vp 755x1000] [--cpu 4] [--budget dev/test/perf-budget.json] [--out fx.json]
   Serves the BUILT root, runs perf-fx.js (FX on vs off, 8 s of rAF deltas each), checks the "fxGate" block of perf-budget.json (ONE place for the numbers):
     over33Max   frames > 33.5 ms with FX on          medDeltaMs   median(FX on) - median(FX off)      p95Max   95th-percentile frame ms with FX on
     pageErrors  page errors during the run
   Any miss = exit 1. CI runs a software-GL Chromium (pessimistic vs a real GPU), so these are regression ceilings, not goals. */
const {spawn}=require('child_process');const fs=require('fs'),path=require('path');const D=require('./lib/device');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:A[i+1]};
const KIND=opt('kind','rain'),VP=opt('vp','755x1000'),CPU=opt('cpu','4'),OUT=opt('out',null);
const BUD=JSON.parse(fs.readFileSync(opt('budget',path.join(__dirname,'perf-budget.json')),'utf8')).fxGate;
(async()=>{if(!BUD){console.error('perf-budget.json has no fxGate block');process.exit(2)}
 const srv=await D.serveRoot(path.resolve(__dirname,'../..'));let res;
 try{/* async spawn: spawnSync would freeze this process and with it the static server the child loads the game from */
  res=await new Promise(ok=>{const c=spawn('node',[path.join(__dirname,'perf-fx.js'),srv.url+'?khost=0',KIND,VP,CPU]);let o='',e='';const t=setTimeout(()=>c.kill(),600000);
   c.stdout.on('data',d=>o+=d);c.stderr.on('data',d=>e+=d);c.on('close',()=>{clearTimeout(t);ok({stdout:o,stderr:e})})})}finally{srv.close()}
 const line=(res.stdout||'').trim().split('\n').filter(l=>l[0]==='{').pop();
 if(!line){console.error('perf-fx.js printed no result\n'+(res.stderr||'').slice(-800));process.exit(2)}
 const r=JSON.parse(line);const miss=[];
 const chk=(name,v,max)=>{if(max!==undefined&&v>max)miss.push(`${name} ${v} > ${max}`)};
 chk('over33 (FX on)',r.on.over33,BUD.over33Max);chk('medDeltaMs',+(r.on.med-r.off.med).toFixed(2),BUD.medDeltaMs);chk('p95 (FX on)',+r.on.p95.toFixed(1),BUD.p95Max);chk('pageErrors',r.errs.length,BUD.pageErrors);
 console.log(JSON.stringify(r));console.log(`| fx ${KIND} ${VP} cpu${CPU} | on med ${r.on.med.toFixed(1)} p95 ${r.on.p95.toFixed(1)} max ${r.on.max.toFixed(1)} >33ms ${r.on.over33}/${r.on.n} | off med ${r.off.med.toFixed(1)} | ${miss.length?'OVER: '+miss.join('; '):'ok'} |`);
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({r,miss},null,1));
 process.exit(miss.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
