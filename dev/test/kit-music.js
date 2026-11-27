/* review/kit-music (KIT §96 musicCtx key table, KK18): serves the checkout through a Playwright route, starts a life and checks
   (1) base rotation: different tabs / buoi give different keys, same tab+buoi stable; (2) card categories -> keys (joy, mourning, romance, thitam, tension alternate, banquet, conferral, contest);
   (3) endings (grand / rare / death), lanh cung, festival day (own track), kg82 open = contest; (4) new key URL = IMG_BASE+audio/bgm-<k>.mp3, old six local;
   (5) a missing file falls back along KMUS_FB (never silence); (6) hold rule: base does not return before BAL.kmus.holdMs.  usage: node dev/test/kit-music.js */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const MT={'.html':'text/html; charset=utf-8','.js':'application/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.mp3':'audio/mpeg'};
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok',m)};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8812/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
 await ctx.route(/workers\.dev\/.*/,r=>r.fulfill({status:404,body:''}));
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto('http://localhost:8812/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kmusKey==='function',null,{timeout:240000});await p.waitForTimeout(3000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv())&&!(typeof isKc==='function'&&isKc()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.kc=null;S.place='home';S.dead=0});
 const E=f=>p.evaluate(f);
 // (1) base rotation
 const keys=await E(()=>{const o=[];S.month=4;S.tuan=5;for(const bu of [0,1,2,3])for(const t of ['act','go','rel']){S.buoi=bu;tab=t;o.push(bu+t+':'+musicCtx())}return o});console.log(keys.join(' '));
 ok(new Set(keys.map(x=>x.split(':')[1])).size>=5,'base: >=5 distinct keys over 4 buoi x 3 tabs');
 ok(await E(()=>{S.buoi=0;tab='act';const a=musicCtx();return a===musicCtx()&&a===musicCtx()}),'base: stable on the same tab+buoi');
 ok(await E(()=>{S.buoi=3;return /^bgm-night/.test(musicCtx())}),'night base = night/night-2');
 // (2) card categories via kmusEvent
 const cat=await E(()=>{const r={};for(const c of ['thang-tran','quoc-tang','tu-tinh','hoang-de-dem','yen-tiec','tan-phong','tai-nghe','benh-tat','chuyen-la','kyngo'])r[c]=kmusEvent(c,'',{},{});const a=kmusEvent('hinh-phat','',{},{}),b2=kmusEvent('hinh-phat','',{},{});r.alt=a+','+b2;return r});console.log(JSON.stringify(cat));
 ok(cat['thang-tran']==='joy'&&cat['quoc-tang']==='mourning'&&cat['tu-tinh']==='romance'&&cat['hoang-de-dem']==='thitam'&&cat['yen-tiec']==='banquet'&&cat['tan-phong']==='conferral'&&cat['tai-nghe']==='contest'&&cat['benh-tat']==='sad'&&cat['chuyen-la']==='night-2'&&cat['kyngo']==='joy','event categories -> keys');
 ok(/tension/.test(cat.alt)&&cat.alt.split(',')[0]!==cat.alt.split(',')[1],'tension / tension-2 alternate per card: '+cat.alt);
 // a real card through kpresPlan (jpres wiring): __presMus set
 const pm=await E(()=>{const o=kpresCat;(0,eval)('kpresCat=()=>"thang-tran"');const P=kpresPlan({t:'x',pid:'ev',h:'x'});(0,eval)('kpresCat=null');kpresCat=o;return P?P.mus:'(no plan)'});ok(pm==='bgm-joy','jpres kpresPlan -> kmusEvent: thang-tran = bgm-joy ('+pm+')');console.log('kpresPlan thang-tran mus =',pm);
 // (3) endings / lc / festival / minigame
 const sc=await E(()=>{const r={};const h=()=>{AU.mk=null};
  S.place='lc';r.lc=musicCtx();S.place='home';h();
  Q.length=0;Q.push({t:'Kiếp này',cls:'end kes-t-grand',h:'x'});r.grand=musicCtx();Q.length=0;h();
  Q.push({t:'Kiếp này',cls:'end kes-t-rare',h:'x'});r.rare=musicCtx();Q.length=0;h();
  Q.push({t:'Kiếp này',cls:'end kes-t-death',h:'x'});r.death=musicCtx();Q.length=0;h();
  Q.push({pid:'night1',t:'Đêm',h:'x'});r.night=musicCtx();Q.length=0;h();
  const k=Object.keys(FEST)[0],f=FEST[k];S.month=f.m;S.tuan=f.t[0];r.fest=k+'='+musicCtx();S.month=4;S.tuan=5;h();
  const d=document.createElement('div');d.id='kg82';document.body.appendChild(d);r.mg=musicCtx();d.remove();h();return r});console.log(JSON.stringify(sc));
 ok(sc.lc==='bgm-cold','lanh cung = cold');ok(sc.grand==='bgm-end-grand'&&sc.rare==='bgm-end-kyngo'&&sc.death==='bgm-end','endings: grand / rare / death');ok(sc.night==='bgm-thitam','Đêm thị tẩm = thitam');ok(/=bgm-fest-/.test(sc.fest)||/=bgm-festival/.test(sc.fest),'festival day has a festival track: '+sc.fest);ok(sc.mg==='bgm-contest','mini-game open = contest');
 // (4) URLs
 const u=await E(()=>[kmusUrl('bgm-joy'),kmusUrl('bgm-day'),kmusUrl('bgm-fest-newyear'),kmusUrl('bgm-cold')]);console.log(u.join(' '));
 ok(/audio\/bgm-joy\.mp3$/.test(u[0])&&u[0]!=='audio/bgm-joy.mp3'&&u[1]==='audio/bgm-day.mp3'&&u[3]==='audio/bgm-cold.mp3'&&/^https:\/\/.*audio\/bgm-fest-newyear\.mp3$/.test(u[2]),'new keys on the CDN, old six local');
 // (5) fallback: every new key has a fallback key that is one of the old six
 ok(await E(()=>{const old=new Set(['day','night','tension','sorrow','festival','cold']);let bad=[];KMUS_NEW.forEach(k=>{if(!old.has(KMUS_FB[k]))bad.push(k)});window.__b=bad;return !bad.length}),'every new key has an old-six fallback');
 const fb=await E(async()=>{AU.unlocked=true;OPT.snd=1;OPT.mute=0;AU.mk=null;Q.length=0;S.buoi=0;tab='act';S.month=4;S.tuan=5;setMusic('bgm-joy');await new Promise(r=>setTimeout(r,2500));return AU.curName});console.log('after a missing joy file:',fb);
 ok(fb==='bgm-day','missing file -> falls back to bgm-day (curName '+fb+')');
 // (6) hold
 const hd=await E(async()=>{AU.mk=null;Q.length=0;Q.push({pid:'ev',evId:'x',__presMus:'bgm-joy',t:'x',h:'x'});const a=musicCtx();Q.length=0;const b2=musicCtx();await new Promise(r=>setTimeout(r,(BAL.kmus.holdMs||6000)+300));const c=musicCtx();return [a,b2,c]});console.log(hd.join(' '));
 ok(hd[0]==='bgm-joy'&&hd[1]==='bgm-joy'&&hd[2]!=='bgm-joy','event track holds, then base returns');
 ok(!errs.length,'no page errors '+errs.join(' | '));
 await b.close();console.log(bad?'FAILED '+bad:'ALL PASS');process.exit(bad?1:0)})();
