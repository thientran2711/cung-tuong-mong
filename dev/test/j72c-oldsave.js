/* ORDER THIN P3 review r1 gate: 3 saves from the LIVE build, each holding an OPEN việc nhờ (S.q72), load clean in the new build: the open favour is
   kept and resolves (q72X; q72Bot plays what it can — walking prompts such as «Chọn người theo hầu» stop the bot, as on LIVE), a composed seed (j72c) can be offered in that old life, 0 page errors.
   usage: bash dev/site/build_site.sh && git show origin/main:index.html > /tmp/old.html && node dev/test/j72c-oldsave.js /tmp/old.html */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OLD=process.argv[2];let VER='old';
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.startsWith('/__ver/')){VER=p.slice(7);return r.end(VER)}
 if(p==='/'||p==='/index.html'){r.setHeader('Content-Type','text/html; charset=utf-8');return fs.createReadStream(VER==='old'?OLD:path.join(ROOT,'index.html')).pipe(r)}
 const f=path.join(ROOT,p.replace(/^\/+/,''));if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}fs.createReadStream(f).pipe(r)});
const sl=t=>new Promise(r=>setTimeout(r,t));let fail=0;const ok=(c,m)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m)};
const BUOI=async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const k0=JSON.stringify([S.turn,S.buoi,S.month,S.year]);
 for(let i=0;i<40;i++){for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}
  const n=document.getElementById('next');if(n&&!n.disabled){n.click();await sl(300);break}await sl(200)}
 for(let j=0;j<40&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}
 return JSON.stringify([S.turn,S.buoi,S.month,S.year])!==k0||!!S.dead};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();
 const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const open=async()=>{const g=await D.openHost(p,URL,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});return g};
 let g=await open();const old=[];
 for(let s=1;s<=3;s++){old.push(await g.evaluate(s=>{SLOT=s;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});window.__bot=1;window.quiet=1;S.rank=Math.max(S.rank,2);
   /* an old favour offered and accepted (the save holds S.q72 with an open favour) */
   const q=q72();let x=null;for(let t=0;t<200&&!x;t++){const T=T72[(t*7+s*13)%T72.length];if(T.fu)continue;x=q72Make(T)}if(!x)return{ok:false};q72Offer(x,'');const it=Q.find(z=>z.t==='Việc nhờ');it.opts[0].go();Q.length=0;
   localStorage.setItem(SK(s),JSON.stringify(ser()));return{ok:q.a.includes(x),tid:x.tid,name:S.name,n:q.a.length}},s))}
 ok(old.every(o=>o.ok)&&errs.length===0,'old build: 3 saves with an open việc nhờ '+JSON.stringify(old.map(o=>o.tid))+', '+errs.length+' errors');errs.length=0;
 await fetch(URL+'__ver/new');g=await open();
 for(let s=3;s>=1;s--){const r=await g.evaluate(async([s,tid])=>{const d=loadSlot(s);if(!d)return{ok:false};SLOT=s;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});window.__bot=1;window.quiet=1;render();const q=q72();const x=q.a.find(z=>z.tid===tid);
   const X=x&&q72X(x);let played=0,why='';for(let i=0;i<40&&x&&q.a.includes(x);i++){used=0;S.suc=Math.max(S.suc,60);for(let j=0;j<8&&Q.length;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}}const st=X.T.s[x.st];if(st&&st.w){x.wt=wk();q72Tick();played++;continue}if(q72Bot())played++;else if(Q.length){why='Q:'+(Q[0]&&Q[0].t);continue}else{const st2=X.T.s[x.st];why=`${x.st}:${q72StepPl(st2,X)}:${S.place}:${q72Why(x,X,st2,st2&&st2.ch?st2.ch[0]:null)}`;break}}
   /* a composed seed can be offered in the old save (the 256 seeds register on load) */
   q.cd={};let c=null;for(const T of T72.filter(T=>T.cs)){c=q72Make(T);if(c)break}if(c){q72Offer(c,'')}const sh=Q.find(z=>z.t==='Việc nhờ');Q.length=0;
   return{ok:true,name:S.name,kept:!!x,X:!!X,played,comp:!!c,shown:!!sh,why,cnt:Object.values(j72cCount()).reduce((a,b)=>a+b,0)}},[s,old[s-1].tid]);
  ok(r.ok&&r.name===old[s-1].name&&r.kept&&r.X&&r.comp&&r.shown&&r.cnt===256,`slot ${s} (${r.name}) loads, open việc nhờ ${old[s-1].tid} kept + played ${r.played} step(s)${r.why?' [bot stops at: '+r.why+']':''}, a composed việc nhờ offered (${r.cnt} registered)`)}
 ok(errs.length===0,'new build: '+errs.length+' page errors '+(errs[0]||''));
 console.log(fail?`J72C OLDSAVE: ${fail} FAIL`:'J72C OLDSAVE: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
