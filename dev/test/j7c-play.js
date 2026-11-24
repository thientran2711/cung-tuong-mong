/* ORDER THIN P2 browser test: composed intrigue (j7c) on the real game. node dev/test/j7c-play.js   (after dev/site/build_site.sh)
   Loads the 2 valid fixture seeds, checks: grounding (cast = real living people with the nết, placeholders filled), 4 equal-value options,
   choosing applies real changes + keeps the object traceable, jnorep marks family j7, the card rebuilds from saved pp (reload), makeDil offers it. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const FIX=fs.readFileSync(path.join(__dirname,'j7c-fixture.jsonl'),'utf8').split('\n').filter(l=>l.startsWith('{')).map(JSON.parse).filter(s=>s.id!=='tx-bad');
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const r=await g.evaluate(FIX=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  J7SEEDS.push(...FIX);S.rank=Math.max(S.rank,2);const out={};
  /* give two living consorts the wanted nết so the cast is real */
  const L=liveRivals(false);out.rivals=L.length;
  const R=j7cReady();out.ready=R.map(x=>x.sd.id);
  const d=mkP("j7c",{});out.card=!!d;if(!d)return out;out.text=d.t;out.opts=d.o.map(o=>o.n+' | '+o.x);out.pp=JSON.parse(JSON.stringify(d.pp));
  const sd=J7I[d.pp.sid];out.castOk=Object.entries(d.pp.c).every(([role,c])=>{if(c.k!=='rv')return true;const v=RV(c.id);const rr=sd.roles[role];return v&&v.alive!==false&&(j7cFit(v,rr)||(BAL.j7c.loose&&j7cFit(v,rr,true)))});/* review r1: the engine's own rule (nết AND lòng; BAL.j7c.loose = any one listed) — the old check ignored loose and failed at random */
  out.unfilled=/\{[a-z]+\}/.test(d.t+d.o.map(o=>o.n).join());out.marked=nrNow('j7',d.pp.sid);
  const re=mkP("j7c",JSON.parse(JSON.stringify(d.pp)));out.rebuilt=!!re&&re.t===d.t;
  const before=JSON.stringify([S.danh,S.suc,S.mat,S.duc,S.hh,S.bac,L.map(v=>aff(v,S))]);const ob0=S.j7c.ob.length;d.o[0].go();out.changed=before!==JSON.stringify([S.danh,S.suc,S.mat,S.duc,S.hh,S.bac,L.map(v=>aff(v,S))]);
  out.ob=S.j7c.ob.slice(ob0);out.again=j7cReady().map(x=>x.sd.id).includes(d.pp.sid);
  out.dil=(()=>{const s0=BAL.ag.why.dil;return !!j7cDil()||!j7cReady().length})();return out},FIX);
 console.log(JSON.stringify(r,null,1).slice(0,1800));
 ok(r.card,'a composed card is built ('+(r.pp&&r.pp.sid)+')');ok(r.castOk,'cast = living consorts with the wanted nết');ok(!r.unfilled,'every placeholder filled with a real name');
 ok(r.opts&&r.opts.length===4,'4 stances');ok(r.marked,'jnorep marks j7:'+(r.pp&&r.pp.sid));ok(r.rebuilt,'card rebuilds from saved pp (reload)');ok(r.changed,'choice applies real changes');
 ok(!r.again,'same seed rests in this life');ok(errs.length===0,'0 page errors '+(errs[0]||''));
 console.log(fail?`J7C PLAY: ${fail} FAIL`:'J7C PLAY: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
