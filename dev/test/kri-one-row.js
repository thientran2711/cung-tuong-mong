/* kri-one-row (KK68, MAIN 186 order 28/11 ~06:35Z; law 11 family): a ring act's result rows (kriDiffRows, jkring-item) name each person ONCE.
   Her S.hh («Hoàng hậu → ta») / S.th («Thái hậu → ta») IS the receiver's thiện cảm when the receiver is the queen / Thái hậu → one row, not two.
   Runs the real kriSnap → affAdd (the game's own thiện cảm path) → kriDiffRows for: the queen, Thái hậu, a plain consort, no receiver (a self act).
   usage: node dev/test/kri-one-row.js <built site root>      exit 0 = PASS; last line = summary */
const fs=require('fs'),path=require('path'),http=require('http');
const ROOT=path.resolve(process.argv[2]||'.');
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';const f=path.join(ROOT,p);
 if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':TYPES[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(res=>srv.listen(0,'127.0.0.1',res));const URL0='http://127.0.0.1:'+srv.address().port+'/';
 const {chromium}=require('playwright');const b=await chromium.launch();const fails=[];
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.route('**/*',rt=>rt.request().url().startsWith(URL0)?rt.continue():rt.abort());
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL0,{waitUntil:'domcontentloaded'});
 let F=null;for(let t=0;t<120&&!F;t++){for(const fr of p.frames()){try{if(await fr.evaluate(()=>typeof start==='function'&&typeof kriDiffRows==='function'))F=fr}catch(e){}}if(!F)await p.waitForTimeout(500)}
 if(!F){console.log('KRI-ONE-ROW FAIL · game did not load (kriDiffRows missing)');process.exit(1)}
 await F.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;window.__forceOrigin='thd';window.__nlInner=1;start();window.__forceOrigin=0;window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true});
 await F.waitForFunction(()=>typeof S!=='undefined'&&!!S&&!!S.name,null,{timeout:30000});
 const R=await F.evaluate(()=>{const out=[];const T=s=>String(s).replace(/<[^>]+>/g,'');
  const one=(lab,v,who,n)=>{const a=kriSnap(v);if(v)affAdd(v,S,n);else{S.hh=(S.hh||0)+n}const rows=kriDiffRows(a,v,who);const it=rows.flatMap(r=>r.items.map(T));
   const rel=it.filter(x=>/→ ta: thiện cảm/.test(x));out.push({lab,who,items:it,rel:rel.length,want:1})};
  const q=typeof queenP==='function'?queenP():null;if(q&&q!==S)one('queen',q,q.name,6);else out.push({lab:'queen',skip:'no queen in this life'});
  const th=typeof emoByKey==='function'?emoByKey('th'):null;if(th)one('thaihau',th,'Thái hậu',6);else out.push({lab:'thaihau',skip:'no Thái hậu object'});
  const v=(typeof liveRivals==='function'?liveRivals(true):rivals).find(x=>x!==q&&x.alive!==false&&!x.out);if(v)one('consort',v,v.name,6);
  one('self (no receiver; S.hh moves alone)',null,'',3);return out});
 for(const r of R){if(r.skip){console.log(`SKIP ${r.lab}: ${r.skip}`);continue}const ok=r.rel===r.want;console.log(`${ok?'ok  ':'FAIL'} ${r.lab}: ${r.rel} «→ ta» row(s) · ${JSON.stringify(r.items)}`);if(!ok)fails.push(r.lab)}
 if(errs.length){fails.push('page errors');console.log('page errors '+JSON.stringify(errs.slice(0,3)))}
 console.log(fails.length?`KRI-ONE-ROW FAIL · ${fails.length} · ${fails.join(', ')}`:`KRI-ONE-ROW PASS · ${R.filter(r=>!r.skip).length} receivers`);
 await b.close();srv.close();process.exit(fails.length?1:0)})();
