/* life-place.js — the stage shows the right place picture in every life state (KIT §56.4; coordinator 15/11: a lãnh cung save showed
   Ngọc Thanh các). Cases: lãnh cung (in session after a new day, and after save → reload), restored from lãnh cung, cung nữ room,
   cung nữ in Tân Giả khố (in session + reload), promoted to another palace, maid risen to consort, old save fixture.
   usage: node dev/test/life-place.js <index.html> <WxH> [outdir]   (pictures from the CDN through Playwright, cached in .ahcache/img) 
   review/place-art: the maid room shows its own painting phong-cung-nu-*, Tân Giả khố tan-gia-kho-* (were tam-cung-dem / lanh-cung). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const WT=path.resolve(__dirname,'../..')+'/';const [,,HTML0,SZ='755x1000',OUT='']=process.argv;const HTML=path.resolve(HTML0);const [W,H]=SZ.split('x').map(Number);
const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=WT+'.ahcache/img/';fs.mkdirSync(CACHE,{recursive:true});if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,ignoreHTTPSErrors:true,reducedMotion:'reduce'});
 await ctx.route('**/*',async r=>{const u=r.request().url();
  if(u.startsWith('http://ctm.test/')){const p=decodeURIComponent(new URL(u).pathname).slice(1);
   if(p===''||p==='index.html')return r.fulfill({status:200,body:fs.readFileSync(HTML),contentType:'text/html; charset=utf-8'});
   const f=WT+p;if(fs.existsSync(f)&&fs.statSync(f).isFile())return r.fulfill({status:200,body:fs.readFileSync(f)});return r.fulfill({status:404,body:''})}
  if(u.startsWith(CDN)){const p=new URL(u).pathname.slice(1),c=CACHE+p.replace(/\//g,'__'),ct=p.endsWith('.json')?'application/json':'image/webp';
   if(!p.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!p.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()}
  if(/fonts\.(googleapis|gstatic)/.test(u))return r.continue();return r.abort()});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 const look=()=>p.evaluate(()=>{const im=document.getElementById('scimg');const t=document.querySelector('#sc-t h2,#sc-t');
   return {place:S.place,visit:S.visit&&S.visit.k,bg:(im.style.backgroundImage.match(/img\/([^.]+)\.webp/)||[])[1]||'',title:(t?t.textContent:'').split('·')[0].trim(),ovf:document.documentElement.scrollWidth>innerWidth}});
 const fresh=async o=>{await p.evaluate(o=>{SLOT=3;window.__forceOrigin=o;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()},o);await p.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);await p.evaluate(()=>{Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi|Tiếp/.test(e.textContent||'')&&!e.closest('#stage'))e.remove()}render()})};
 const reload=()=>p.evaluate(()=>{const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;Q.length=0;render()});
 const R=[];const ck=async(name,want,fn)=>{try{await fn()}catch(e){R.push({name,err:e.message.slice(0,160)});return}await p.waitForTimeout(250);const x=await look();
   const ok=want.bg.test(x.bg)&&(!want.title||want.title.test(x.title));R.push({name,ok,...x});if(OUT)await p.locator('#stage').screenshot({path:`${OUT}/${name}.jpg`,type:'jpeg',quality:70}).catch(()=>{})};
 const LC={bg:/^lanh-cung/,title:/Lãnh cung|Trường Môn/};
 await fresh('tt');
 await ck('consort-home',{bg:/^tam-cung-dem/},async()=>{});
 await ck('cold-in-session',LC,()=>p.evaluate(()=>{cold('Thử');Q.length=0;render()}));
 await ck('cold-new-day',LC,()=>p.evaluate(()=>{/* what j3 does at a new day */S.place='home';placeWhere();if(S.out)coldVisit();S.visit={k:'home',people:homePeople(),talked:false};render()}));
 await ck('cold-reload',LC,async()=>{await p.evaluate(()=>{S.place='lc';S.visit={k:'home',people:homePeople(),talked:false}});await reload()});
 await ck('cold-goTo-home',LC,()=>p.evaluate(()=>{S.place='home';S.visit={k:'home',people:[],talked:false};render()}));
 await ck('cold-restored',{bg:/^tam-cung-dem/},()=>p.evaluate(()=>{S.coldWk-=BAL.pun.coldMinDays/* punish-reason stay served */;restore(true,'Thử');Q.length=0;render()}));
 await ck('promoted-palace',{bg:/^tam-cung-dem/},()=>p.evaluate(()=>{const n=(typeof PALN!=='undefined'?PALN.length:2);S.pal=((S.pal||0)+1)%n;render()}));
 await fresh('cnv');
 await ck('maid-room',{bg:/^phong-cung-nu/,title:/Phòng cung nữ/},async()=>{});
 await ck('maid-tgk-in-session',{bg:/^tan-gia-kho/,title:/Tân Giả khố/},()=>p.evaluate(()=>{S.srv.lau=3;S.place='home';S.visit=srvVisitOf('home');render()}));
 await ck('maid-tgk-reload',{bg:/^tan-gia-kho/,title:/Tân Giả khố/},async()=>{await p.evaluate(()=>{S.place='home';S.visit=srvVisitOf('home')});await reload()});
 await ck('maid-tgk-done',{bg:/^phong-cung-nu/},()=>p.evaluate(()=>{S.srv.lau=0;S.place='home';S.visit=srvVisitOf('home');render()}));
 await ck('maid-risen',{bg:/^tam-cung-dem/},()=>p.evaluate(()=>{S.srv.risen=1;S.place='home';S.visit={k:'home',people:homePeople(),talked:false};render()}));
 const fx=WT+'dev/test/fixtures/world30-met.json';
 await ck('old-save',{bg:/./},()=>p.evaluate(d=>{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;Q.length=0;render()},fs.readFileSync(fx,'utf8')));
 for(const r of R)console.log((r.ok?'OK  ':'BAD ')+r.name.padEnd(22),r.err||`place=${r.place} visit=${r.visit} bg=${r.bg} title="${r.title}"${r.ovf?' OVERFLOW':''}`);
 console.log('page errors',errs.length,errs.slice(0,3).join(' | '));console.log(R.every(r=>r.ok)&&!errs.length?'ALL OK':'FAIL');await b.close()})();
