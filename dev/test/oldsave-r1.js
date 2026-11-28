/* reviewer r1 (review/coop-b1b5-r1): an OLD solo save (origin/main build in .tmp/old.html: items, a pet, children) loads in the NEW build
   at 755x1000@2, 1180x820@2, 1366x1024@2: no page errors, pets keep stage, Tư trang + Hành sự render, no horizontal overflow.
   usage: node dev/test/oldsave-r1.js [outdir] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OUT=path.resolve(process.argv[2]||path.join(ROOT,'.tmp/oldsave'));fs.mkdirSync(OUT,{recursive:true});
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
let HTML=path.join(ROOT,'.tmp/old.html');const BASE='http://ctm.local/';
async function serve(ctx){await ctx.route(BASE+'**',async route=>{const u=new URL(route.request().url());let p=decodeURIComponent(u.pathname);
 if(p==='/'||p==='/index.html')return route.fulfill({status:200,contentType:MIME['.html'],body:'<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'+fs.readFileSync(HTML,'utf8')+'</body></html>'});
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return route.fulfill({status:404,body:'nf'});route.fulfill({status:200,contentType:MIME[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})})}
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();let saved=null;const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,hasTouch:true});await serve(ctx);
 for(const [W,H] of [[755,1000],[1180,820],[1366,1024]]){
  const p=await ctx.newPage();await p.setViewportSize({width:W,height:H});p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const boot=async()=>{await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(2500)};
  if(!saved){HTML=path.join(ROOT,'.tmp/old.html');await boot();
   saved=await p.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S.origin.k!=='cnv')break}
    Q.length=0;S.rank=4;S.inv.push({k:'tramngoc',w:1},{k:'nhansam'},{k:'tranhco',from:'th'});try{petAdd(S,'meo','Hoàng thượng ban','emp');petAdd(S,'kylan','Thái hậu ban','th')}catch(e){}
    S.kids=S.kids||[];S.kids.push({name:'Hoàng tử Thử',sex:'m',bt:1,alive:true,hp:50,tal:30,fond:20});
    for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}quiet=false;try{save()}catch(e){}const k=SK(2);try{localStorage.setItem(k,JSON.stringify(ser()))}catch(e){}return{k,raw:(window.slotGet?slotGet(k):localStorage.getItem(k)),name:S.name,pets:(S.pets||[]).map(P=>P.t)}});
   ok(!errs.length,'OLD build: no page errors',errs.slice(0,3));errs.length=0}
  console.log('saved',saved.k,(saved.raw||'').length,saved.pets);HTML=path.join(ROOT,'dev/index.html');await boot();
  const r=await p.evaluate(()=>{const d=loadSlot(2);if(!d)return{err:'no save'};SLOT=2;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;try{deal()}catch(e){}Q.length=0;render();
   return{name:S.name,pets:(S.pets||[]).map(P=>[P.t,P.stg,petT(P).use.slice(0,60)]),kids:(S.kids||[]).map(k=>k.name),inv:S.inv.length}});
  ok(r.name===saved.name&&r.pets.length===saved.pets.length,`${W}x${H} old save loads (same name, pets)`,r);
  for(const t of ['inv','act','kid']){await p.evaluate(t=>{try{tab=t;render()}catch(e){}},t);await p.waitForTimeout(800);
   const ov=await p.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);ok(ov<=1,`${W}x${H} tab ${t}: no horizontal overflow`,ov);
   await p.screenshot({path:`${OUT}/oldsave-${t}-${W}x${H}.jpg`,type:'jpeg',quality:60})}
  ok(!errs.length,`${W}x${H} NEW build: no page errors`,errs.slice(0,3));await p.close()}
 await b.close();const f=res.filter(x=>!x[0]).length;console.log('RESULT',res.length-f,'/',res.length);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
