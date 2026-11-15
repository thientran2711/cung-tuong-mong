// Home dress (tier kc / ngheo from img/FIGURES-kc.json) on the outside route: node dev/test/outside/dress.js <outdir> [w h dpr]...
// (default: Fold 755x1000@2 and iPad 1180x820@2). Needs zz-test.html at the repo root and the kc/ngheo webp files in img/.
// For origin tt (kc) and thd (ngheo): new life -> "Ở nhà chờ tuyển tú" -> her stage figure, portrait and her sister's must be the
// home dress; after kcEnter (palace) her figure must be a palace tier again. Reports page errors and horizontal overflow.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'../../..');const GAME='http://game.local/'+(process.env.GF||'zz-test.html');
const MT={html:'text/html',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css',svg:'image/svg+xml'};
async function serve(c){await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:MT[f.split('.').pop()]||'application/octet-stream'})})}
const OUT=process.argv[2]||'.';const sizes=[];for(let i=3;i+2<process.argv.length;i+=3)sizes.push(process.argv.slice(i,i+3).map(Number));if(!sizes.length)sizes.push([755,1000,2],[1180,820,2]);
(async()=>{const b=await chromium.launch();const rep=[];
 for(const [W,H,D] of sizes)for(const org of ['tt','thd']){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,serviceWorkers:'block'});await serve(c);const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(2000);
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1500);
  await p.evaluate(o=>{S.origin=ORIGINS.find(x=>x.k===o);try{nlCard()}catch(e){}},org);await p.waitForTimeout(400);
  const btn=await p.$('button[data-kcp="nha"]');if(btn){await btn.click();await p.waitForTimeout(400)}
  await p.evaluate(()=>nlAccept());await p.waitForTimeout(600);await p.evaluate(()=>{while(Q.length)closeModal();S.place='kc_khue';render()});await p.waitForTimeout(2500);
  await p.evaluate(()=>render());await p.waitForTimeout(800);
  const info=await p.evaluate(()=>{const sis=S.kc.fam.find(m=>m.r==='muoi');const ban=S.kc.fam.find(m=>m.r==='ban0');const me=document.getElementById('mefig');
   return{isKc:isKc(),origin:S.origin.k,pid:S.pid,dress:kcDress(),fig:figFor(S),por:figFor(S,'por'),mefig:me?me.getAttribute('src'):null,pMe:(pMe()||{}).src,
    sister:sis?[sis.fid,kcPor(sis,'fig'),kcPor(sis)]:null,friend:ban?[ban.fid,kcPor(ban)]:null}});
  const tier=org==='thd'?'ngheo':'kc';const re=new RegExp('-'+tier+'-a18\\.webp$');
  info.ok={fig:re.test(info.fig),por:re.test(info.por),mefig:!info.mefig||re.test(info.mefig),pMe:re.test(info.pMe||''),sister:!info.sister||re.test(info.sister[1]),friend:!info.friend||/-kc-a18\.webp$/.test(info.friend[1])};
  await p.evaluate(()=>{try{PX.app.ticker.stop()}catch(e){}});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${W}-${org}-home.png`,timeout:30000}).catch(()=>{});
  await p.evaluate(()=>{try{PX.app.ticker.start()}catch(e){}});
  await p.evaluate(()=>{tab='rv';render()});await p.waitForTimeout(1200);await p.evaluate(()=>{try{PX.app.ticker.stop()}catch(e){}});await p.screenshot({path:`${OUT}/${W}-${org}-rv.png`,timeout:30000}).catch(()=>{});
  await p.evaluate(()=>{try{PX.app.ticker.start()}catch(e){}});
  /* the palace: the home dress must never show there */
  info.pal=await p.evaluate(()=>{try{kcEnter(1)}catch(e){return'ERR '+e.message}for(let k=0;k<30&&Q.length;k++)closeModal();render();return{isKc:isKc(),fig:figFor(S),por:figFor(S,'por')}});
  info.ok.palace=typeof info.pal==='object'&&!/-(kc|ngheo)-a18/.test(info.pal.fig+info.pal.por);
  await p.evaluate(()=>{for(let i=0;i<3;i++){for(let k=0;k<20&&Q.length;k++)closeModal();nextBuoi()}});await p.waitForTimeout(500);
  info.size=`${W}x${H}@${D}`;info.errs=errs.slice(0,8);info.ovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);rep.push(info);await c.close()}
 console.log(JSON.stringify(rep,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
