/* ROOMS1 look rig: opens each of the 16 consort-room halls in the game (summer morning) through the real path
   (S.hall + goTo -> placeOf/kpmRoomImg -> residenceArt -> stage), on 755x1000@2 and 1180x820@2.
   NEW=<dir> serves <dir>/<key>-ha-sang.webp in place of the CDN file (pre-swap look); without NEW the live CDN file is used.
   usage: [NEW=dir] node dev/test/rooms1-look.js file://$PWD/index.html <outdir> */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const {execFile}=require('child_process');const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const T=[['canh-phuc',0,'chinh'],['canh-phuc',0,'tay'],['chung-tu',2,'dong'],['chung-tu',2,'chinh'],['dien-huy',5,'dong'],['dien-huy',5,'chinh'],['dien-huy',5,'tay'],
 ['ham-an',3,'dong'],['ham-an',3,'chinh'],['khai-tuong',1,'tay'],['thua-minh',4,'dong'],['thua-minh',4,'chinh'],['thua-minh',4,'tay'],['truong-xuan',7,'dong'],['truong-xuan',7,'chinh'],['vinh-hoa',6,'chinh']];
const key=(s,p)=>s+'-cung'+(p==='chinh'?'':p==='dong'?'-dong-phoi':'-tay-phoi');
const cdn={};const pcurl=u=>new Promise(res=>execFile('curl',['-sSf','-m','30',u],{encoding:'buffer',maxBuffer:60e6},(e,o)=>res(e?null:o)));const NEW=process.env.NEW;const served=new Set();
(async()=>{const b=await chromium.launch();let bad=0;
for(const [W,H] of [[755,1000],[1180,820]]){
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1000,serviceWorkers:'block'});
 await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,async r=>{const u=r.request().url();const m=u.match(/img\/([a-z-]+-ha-sang)\.webp/);
  if(NEW&&m&&fs.existsSync(`${NEW}/${m[1]}.webp`)){served.add(m[1]);return r.fulfill({status:200,body:fs.readFileSync(`${NEW}/${m[1]}.webp`),contentType:'image/webp',headers:{'access-control-allow-origin':'*'}})}
  if(!(u in cdn))cdn[u]=pcurl(u);const body=await cdn[u];if(!body)return r.abort();r.fulfill({status:200,body,contentType:u.endsWith('.json')?'application/json':'image/webp',headers:{'access-control-allow-origin':'*'}})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__nlInner=1});await p.route(/ctmload=1/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;used=0;deal();render();document.querySelectorAll('#kload,.krbox,#kroul').forEach(e=>e.remove())});
 await sleep(1200);await p.addStyleTag({content:'#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,#kmrew{display:none!important}'});
 for(const [slug,i,part] of T){const k=key(slug,part);
  const r=await p.evaluate(([i,part])=>{const mo=SEASON.findIndex(s=>s==='Hạ');S.month=mo+1;S.buoi=0;
    let v=rivals.find(x=>x.alive&&!x.out&&x.pal===i);if(!v){v=rivals.find(x=>x.alive&&!x.out&&!x.queen);v.pal=i}
    const kk='r'+v.id;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{goTo(kk)}catch(e){}S.place=kk;S.hall={k:kk,part,t:kpmStamp()};render();
    const P=placeOf(kk);return {kk,sc:P.sc,img:SCIMG[P.sc],name:P.n}},[i,part]);
  await sleep(2500);
  const shown=await p.evaluate(()=>[...document.querySelectorAll('img,[style*="background"]')].map(e=>e.currentSrc||e.src||getComputedStyle(e).backgroundImage||'').filter(s=>/-ha-sang|cung/.test(s)).map(s=>s.split('/').pop().slice(0,60)).slice(0,4));
  const ok=r.img===k+'-ha-sang'&&shown.some(s=>s.includes(k+'-ha-sang'));if(!ok)bad++;
  console.log(W,k,ok?'OK':'BAD',r.name,r.img,JSON.stringify(shown));
  await p.screenshot({path:`${OUT}/${W}-${k}.jpg`,type:'jpeg',quality:60})}
 console.log(W,'errors',errs.length,errs.slice(0,2));if(errs.length)bad++;await ctx.close()}
console.log('served new:',served.size,'bad',bad);await b.close();process.exit(bad?1:0)})();
