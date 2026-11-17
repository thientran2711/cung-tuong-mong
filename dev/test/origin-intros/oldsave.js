/* review/origin-intros: saves made on the previous build load here untouched. On OLD (origin/main served under the same origin) a new life
   is started for each case — direct palace start (origin), home road (tiểu thư) — 2 buổi played and saved to slot 1; then NEW loads slot 1
   ("Tiếp tục kiếp này"): no intro panel, no selection, no S.oiV, 2 more buổi, 0 page errors.
   usage: node oldsave.js <old> <new> [WxH] [origin:road,…]  (road cung | nha)
   <old>/<new> = a git ref (origin/main, HEAD, a sha), an index.html file, a built site folder, or a URL.
   oi-render 11/17: a save lives in localStorage, which belongs to ONE origin; old and new served on two ports are two origins, so the new
   build never saw the old save ("no saved slot on NEW"). The test now serves BOTH builds itself from one origin (like dev/tools/quickcheck.js):
   "/" is the old or the new index.html (switched with /__ver/old|new), every other file comes from the site root (CTM_ROOT, else this
   checkout's root). */
const {chromium}=require('playwright');const [,,OLDA,NEWA,SZ,CASES]=process.argv;
const http=require('http'),fs=require('fs'),path=require('path'),cp=require('child_process');
const ROOT=path.resolve(process.env.CTM_ROOT||path.join(__dirname,'..','..','..'));
async function html(a){if(/^https?:/.test(a)){const r=await fetch(new URL('index.html',a.endsWith('/')?a:a+'/'));return await r.text()}
 if(fs.existsSync(a)){const s=fs.statSync(a);return fs.readFileSync(s.isDirectory()?path.join(a,'index.html'):a,'utf8')}
 return cp.execFileSync('git',['-C',ROOT,'show',a+':index.html'],{encoding:'utf8',maxBuffer:1<<28})}
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.webp':'image/webp','.png':'image/png','.mp3':'audio/mpeg','.css':'text/css'};
let VER='old';const HT={};
function serve(){return new Promise(res=>{const s=http.createServer((q,r)=>{const p=decodeURIComponent(new URL(q.url,'http://x').pathname);
  if(p==='/'||p==='/index.html'){r.setHeader('Content-Type',TYPES['.html']);r.setHeader('Cache-Control','no-store');return r.end(HT[VER])}
  const f=path.join(ROOT,p.replace(/^\/+/,''));if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}
  r.setHeader('Content-Type',TYPES[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
 s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/',close:()=>s.close()}))})}const [W,H]=(SZ||'755x1000').split('x').map(Number);const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const L=(CASES||'nc:cung,muoi:nha,cnv:cung').split(',').map(x=>x.split(':'));
(async()=>{HT.old=await html(OLDA);HT.new=await html(NEWA);const srv=await serve();const OLD=srv.url,NEW=srv.url;
 const b=await chromium.launch();const out=[];let bad=0;
 for(const [o,road] of L){const c=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());document.querySelectorAll('.kmov').forEach(o=>{const b=o.querySelector('.kmend,.kmtake,button');if(b)b.click()})},300)});
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const R={o,road};const f=[];
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  VER='old';await p.goto(OLD);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3000);await skip();
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  await p.evaluate(og=>{for(let i=0;i<600&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}},o);await sleep(500);await skip();
  await p.evaluate(r=>{const b=document.querySelector(`#modal [data-kcp="${r}"]`);if(b)b.click()},road);await sleep(600);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>document.querySelector('#modal button[data-nl="ok"]').click());await sleep(1200);
  R.old=await p.evaluate(()=>{try{for(let i=0;i<2;i++){Q.length=0;nextBuoi()}Q.length=0;save()}catch(e){return{err:String(e)}}return{origin:S.origin.k,kc:!!S.kc,rank:S.rank,buoi:S.buoi,oiV:S.oiV||0,slot:SLOT}});
  const oldErr=errs.length;
  VER='new';await p.goto(NEW);await sleep(3500);await skip();
  const has=await p.evaluate(()=>!!document.querySelector('#slots button[data-load="1"]'));if(!has){f.push('no saved slot on NEW')}else{
   await p.evaluate(()=>document.querySelector('#slots button[data-load="1"]').click());await sleep(3000);await skip();
   R.new=await p.evaluate(()=>({origin:S.origin.k,kc:!!S.kc,rank:S.rank,buoi:S.buoi,oiV:S.oiV||0,q:Q.map(m=>m.t),panels:Q.filter(m=>m.oiP).length,sel:Q.some(m=>m.pid==='kc2Sel')}));
   if(R.new.origin!==R.old.origin||R.new.rank!==R.old.rank)f.push('state changed');if(R.new.oiV||R.new.panels)f.push('intro on an old save');if(R.new.sel&&!R.old.err)f.push('selection on an old save');
   R.day=await p.evaluate(()=>{try{for(let i=0;i<2;i++){Q.length=0;nextBuoi()}}catch(e){return{err:String(e)}}return{buoi:S.buoi,turn:S.turn}});if(R.day.err)f.push('play '+R.day.err)}
  R.errs=errs.slice(0,3);R.oldErr=oldErr;if(errs.length>oldErr)f.push('errors on NEW');R.fail=f;if(f.length)bad++;out.push(R);await c.close()}
 console.log(JSON.stringify(out,null,1));console.log(bad?`FAIL ${bad}/${out.length}`:`PASS ${out.length}/${out.length}`);await b.close();srv.close();process.exit(bad?1:0)})();
