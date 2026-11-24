/* node perf.js <out.json> [rates=1,4,6]  — SMOOTHNESS GATE (owner OD 24/11 ~15:15Z): runs scenarios m1 (deal/lift/choose), m2 (tap, open ring, swipe 12 items with full
   figures behind, give), m4 (fly-to) on Fold 755x1000 and iPad 1180x820 (real device profiles, host mode = the scaled game iframe the player gets) with CDP CPU throttling;
   per segment: rAF frame deltas → p50 / p95 / max ms and dropped frames (Σ round(Δ/16.7)-1). No screencast while measuring. Target: p95 ≤ 20 ms at 4×. */
const B=require('./boot.js');const fs=require('fs'),path=require('path');
const [,,OUT,RATES]=process.argv;const rates=(RATES||'1,4,6').split(',').map(Number);const res=[];
(async()=>{for(const dev of ['fold','ipadAir'])for(const rate of rates)for(const m of (process.env.SCN||'idle,live,m1,m2,m4').split(',')){const {b,p,f,srv,errs}=await B.open(dev,{dsf:+(process.env.PERF_DSF||1)});
 for(const x of ['lib.js','m1.js','m2.js','m4.js','scen.js'])await f.addScriptTag({content:fs.readFileSync(path.join(__dirname,x),'utf8')});
 await f.evaluate(()=>{const R=window.__res=[];let cur=null;window.__seg={seg(n){cur={n,P:MD2.probeStart()}},end(){if(!cur)return;const r=MD2.probeStop();R.push(Object.assign({seg:cur.n},r));cur=null}}});
 const cdp=await p.context().newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate});
 try{await f.evaluate(m=>SCEN[m]({}),m)}catch(e){console.log('ERR',dev,rate,m,e.message.slice(0,200))}
 const r=await f.evaluate(()=>window.__res);r.forEach(x=>res.push(Object.assign({dev,rate},x)));console.log(dev,rate+'x',m,r.map(x=>`${x.seg} p50 ${x.p50} p95 ${x.p95} max ${x.max} drop ${x.dropped}/${x.n}`).join(' | '),errs.length?errs:'');
 await b.close();srv.close();fs.writeFileSync(OUT,JSON.stringify(res,null,1))}})();
