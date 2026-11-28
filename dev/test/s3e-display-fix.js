/* s3e-display-fix.js — guard for the three robot-found display bugs (review/s3e-display-fix):
   (a) kitNeed: no «have/need» text prints a have above its need (Công lao 11/10); srvMerit banks no công lao past the need;
   (b) Dư đồ under cấm túc / lãnh cung: her own state shows ONCE (her spot), not on every place (plan map + list);
   (c) «Thuở thanh mai» «Đến bến sông»: the meter word = the real survival roll (BAL.odb.jkc.rlKcElope), hỏng names the drowning; ok=false drowns, ok=true lives.
   usage: node dev/test/s3e-display-fix.js <index.html> [WxH] [shotdir] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const WT=path.resolve(__dirname,'../..')+'/';const [,,HTML0='dev/index.html',SZ='1180x820',OUT='']=process.argv;const HTML=path.resolve(HTML0);const [W,H]=SZ.split('x').map(Number);
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
 const fresh=async o=>{await p.evaluate(o=>{SLOT=3;window.__forceOrigin=o;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()},o);await p.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);await p.evaluate(()=>{Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi|Tiếp/.test(e.textContent||'')&&!e.closest('#stage'))e.remove()}render()})};
 const fails=[];const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails.push(m)};
 const shot=async n=>{if(OUT){await p.screenshot({path:path.join(OUT,`${n}-${W}x${H}.png`)})}};
 // (a) kitNeed rule + srvMerit clamp + Công lao on the servant road
 ok(await p.evaluate(()=>kitNeed(11,10)==='10/10'&&kitNeed(3,10)==='3/10'&&kitNeed(7.9,0)==='7/0'),'(a) kitNeed clamps have to need');
 await fresh('cnv');
 const a=await p.evaluate(()=>{const need=srvMpNeed(S.srv.rk);S.srv.mp=need-1;srvMerit(5);const banked=S.srv.mp;S.srv.mp=need+1;tab='staff';render();renderHud2&&renderHud2();
  const txt=document.body.innerText;const over=[...txt.matchAll(/Công lao\s*(\d+)\s*\/\s*(\d+)/g)].filter(m=>+m[1]>+m[2]).map(m=>m[0]);
  const rows=tsSrvRows().map(r=>r[1]).filter(s=>/Công lao/.test(s));return {need,banked,over,rows,hud:($('hud2')||{}).innerText||''}});
 ok(a.banked===a.need,`(a) srvMerit banks ${a.banked} ≤ need ${a.need}`);ok(a.over.length===0,`(a) no «Công lao x/y» with x>y on screen: ${JSON.stringify(a.over)}`);
 ok(a.rows.every(s=>{const m=/(\d+)\/(\d+)/.exec(s);return m&&+m[1]<=+m[2]}),`(a) Xét phẩm row ${JSON.stringify(a.rows)}`);
 await p.waitForFunction(()=>{const k=document.getElementById('klife');return !k||k.hidden||getComputedStyle(k).display==='none'||!k.isConnected},null,{timeout:45000}).catch(()=>{});await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.srv.mp=srvMpNeed(S.srv.rk)+1;tab='go';render();tsSrvPromoPanel()});await p.waitForTimeout(800);const pt=await p.evaluate(()=>(document.querySelector('.modal:not([hidden]), #modal:not([hidden])')||document.body).innerText);ok(!/Công lao (\d+)\/(\d+)/.test(pt)||(([,x,y])=>+x<=+y)(/Công lao (\d+)\/(\d+)/.exec(pt)),'(a) Xét phẩm panel: '+((/Công lao \d+\/\d+/.exec(pt)||[''])[0]));await shot('a-congLao');
 // (b) map under cấm túc: one label, on her spot
 await fresh('thd');
 for(const st of ['confined','out']){
  const b=await p.evaluate(st=>{Q.length=0;if(st==='confined')S.confined=1;else{S.confined=0;S.out=1;S.place='lc'}tab='go';window.__mapList=0;render();
   const spots=[...document.querySelectorAll('#panel .mspot')];const tag=st==='confined'?/cấm túc/:/lãnh cung/;
   /* LRM3 (LIVE 772bee4f): her own state is said ONCE on the whole Dư đồ — on LIVE that one place is the KIT §103 map banner (kitMapBanner, jplrule strips it
      from every spot); on a build without the banner it is her own spot. Zone tags (.mzone, KIT §85.10 zoom only, no travel) and her own home spot (.here) are not
      travel targets, so «still shut» is asked of every other place spot */
   const lab0=spots.filter(e=>tag.test((e.querySelector('.mmeta')?.innerText||'')+' '+[...e.querySelectorAll('.mchip')].map(c=>c.innerText).join(' ')));
   const ban=typeof kitMapBanner==='object'&&kitMapBanner.now?kitMapBanner.now():null;const banOn=!!(ban&&tag.test(ban.line));
   const lab=lab0.concat(banOn?[{dataset:{go:'banner'}}]:[]);
   const shut=spots.filter(e=>!e.classList.contains('mzone')&&!e.classList.contains('here')&&e.dataset.go!==S.place&&!(e.tagName==='DIV'||e.disabled)).map(e=>e.dataset.go||e.dataset.ak);
   window.__mapList=1;render();const tiles=[...document.querySelectorAll('#panel .mtile')].filter(e=>tag.test(e.querySelector('.mband')?.innerText||''));window.__peek=tiles.slice(0,2).map(e=>e.outerHTML.slice(0,700));window.__mapList=0;render();
   return {peek:window.__peek,n:spots.length,lab:lab.length,where:lab.map(e=>e.dataset.go||e.dataset.ak),shut,tiles:tiles.length}},st);
  ok(b.n>3&&b.lab===1,`(b) ${st}: her state on ${b.lab} of ${b.n} spots (${b.where})`);ok(b.shut.length===0,`(b) ${st}: every other spot still shut (${b.shut})`);if(b.tiles>1)console.log(b.peek.join('\n'));ok(b.tiles<=1,`(b) ${st}: list view tiles with it = ${b.tiles}`);
  await shot('b-map-'+st)}
 // (c) «Đến bến sông»: odds word = survival roll; ok=false drowns, ok=true lives
 const c=await p.evaluate(()=>{const a=KCA.tm96z,b=a.B.x1,o=b.o.find(x=>x.n==="Đến bến sông");const A={a:"tm96z",sc:0,seq:["x1"],i:0,f:{},hist:[],used:[]};
  const od0=kc3Od(A,o,b);const line=kc3Line(o,od0,A,a);return {od0,live:100-BAL.odb.jkc.rlKcElope,line,word:word(od0)}});
 ok(c.od0<100&&c.od0===c.live,`(c) odds ${c.od0} = survival ${c.live} (not sure)`);ok(c.line.startsWith(c.word)&&/hỏng:.*chết đuối/.test(c.line)&&!/Rất vững/.test(c.word),`(c) line «${c.line.replace(/<[^>]+>/g,'')}»`);
 for(const okv of [true,false]){await fresh('thd');const r=await p.evaluate(okv=>{try{S.kc=S.kc||{};S.kc.ev=S.kc.ev||{};S.tm96=S.tm96||{h:90};}catch(e){}const g=window.kcTmMan,g2=window.kcRes;let res='';window.kcTmMan=()=>({tinh:50});window.kcRes=t=>{res=t};S.kgt=S.kgt||0;S.kld=S.kld||0;try{kcElope(false,okv)}catch(e){return 'ERR '+e.message}finally{window.kcTmMan=g;window.kcRes=g2}return {dead:!!S.dead,end:S.kc&&S.kc.end||'',res}},okv);
  ok(typeof r==='object'&&(okv?!r.dead&&r.res==="Bến sông":r.end==="Bỏ trốn"),`(c) kcElope(false,${okv}) → ${JSON.stringify(r)}`)}
 ok(errs.length===0,`no page errors ${JSON.stringify(errs.slice(0,3))}`);
 console.log(fails.length?`FAIL ${fails.length}`:'ALL PASS');await b.close();process.exit(fails.length?1:0)})();
