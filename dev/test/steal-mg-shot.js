/* review/steal-minigame: real-device shots (HOST mode, built root index.html) of her Tranh sủng / Chặn ngự giá game: intro, game running,
   skip result, win result. usage: node dev/test/steal-mg-shot.js <outdir> [device…]  (default fold ipadAir ipadPro iphone14)
   Shots go OUTSIDE the repo (owner: no images in git). Prints JSON per device: texts, overflow checks, % check, errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const [,,OUT,...DEV]=process.argv;
const DEVS=DEV.length?DEV:['fold','ipadAir','ipadPro','iphone14'];
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const dv of DEVS){const ctx=await D.newDeviceContext(b,dv);const p=await ctx.newPage();p.setDefaultTimeout(90000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await p.waitForTimeout(2500);
  const R={dev:dv,checks:{}};const shot=async n=>p.screenshot({path:`${OUT}/smg-${dv}-${n}.jpg`,type:'jpeg',quality:72});
  await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await g.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(4000);await g.addStyleTag({content:'#kroul,#kroulw,.kroul,#klife,.kmov{display:none!important}'});
  const setup=async()=>g.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#klife,#kload').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;
   S.rank=Math.max(S.rank,2);S.sung=45;S.duc=60;S.suc=70;S.ntk=null;S.ntTry=null;used=0;S.cyb={};if(window.cyBase)S.tuan=(cyBase(S).t+1)%3;
   const v=liveRivals(true).filter(x=>!x.coop&&x.alive&&!x.out)[0];try{k61Meet(v,'gặp mặt',3)}catch(e){}S.tonight=v;S.buoi=B4L;deal();render();
   return deck.findIndex(a=>a&&a.n==="Chặn ngự giá")});
  const txt=()=>g.evaluate(()=>{const d=document.getElementById('kg82');return d?d.innerText.replace(/\s+/g,' ').slice(0,600):''});
  const ov=()=>g.evaluate(()=>{const d=document.getElementById('kg82');const o=[];if(d&&d.scrollWidth>d.clientWidth+2)o.push('kg82-x');if(document.documentElement.scrollWidth>innerWidth+1)o.push('page-x');return o});
  /* 1 · intro */
  let i=await setup();await g.evaluate(i=>act(i),i);await g.waitForSelector('#kg82go');await p.waitForTimeout(900);await shot('1-intro');
  R.intro=await txt();R.checks.introRows=/Trước khi ra tay/.test(R.intro)&&/lên một bậc/.test(R.intro)&&/Độ khó/.test(R.intro);R.checks.noPct=!/%/.test(R.intro);R.ov1=await ov();
  /* 2 · the game itself (Múa) */
  await g.evaluate(s=>document.querySelector(s).click(),'#kg82go');await p.waitForTimeout(3500);await shot('2-play');R.ov2=await ov();
  /* the running game ends by itself; wait for its result */
  await g.waitForSelector('#kg82ok',{timeout:90000}).catch(()=>{});await p.waitForTimeout(600);await shot('3-result');R.res=await txt();R.ov3=await ov();
  await g.evaluate(s=>document.querySelector(s).click(),'#kg82ok').catch(()=>{});await p.waitForTimeout(800);R.log=await g.evaluate(()=>(document.getElementById('log')||{}).innerText||'').then(s=>s.slice(0,300));
  /* 4 · win result (the board scored 8/10 through the same frame) */
  i=await setup();await g.evaluate(i=>{window.__k82p=kg82Play;kg82Play=function(k,cb){cb(8)};act(i)},i);await g.waitForSelector('#kg82go');await g.evaluate(s=>document.querySelector(s).click(),'#kg82go');
  await g.waitForSelector('#kg82ok');await p.waitForTimeout(600);await shot('4-win');R.win=await txt();R.checks.winRow=/cơ hội lên/.test(R.win);R.ov4=await ov();
  await g.evaluate(s=>document.querySelector(s).click(),'#kg82ok');await g.evaluate(()=>{kg82Play=window.__k82p});await p.waitForTimeout(500);
  /* 5 · skip */
  i=await setup();await g.evaluate(i=>act(i),i);await g.waitForSelector('#kg82skip');await g.evaluate(s=>document.querySelector(s).click(),'#kg82skip');await g.waitForSelector('#kg82ok');await p.waitForTimeout(500);await shot('5-skip');R.skip=await txt();
  R.checks.skipRow=/không chơi: cơ hội giữ nguyên/.test(R.skip);await g.evaluate(s=>document.querySelector(s).click(),'#kg82ok');
  R.errs=errs;console.log(JSON.stringify(R));await ctx.close()}
 await b.close();srv.close()})();
