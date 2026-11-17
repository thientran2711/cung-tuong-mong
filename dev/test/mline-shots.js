/* review/servant-mline-r1: the month news that carries maid-line lines, at one viewport. usage: node dev/test/mline-shots.js <url> <WxH@dpr> <outdir>
   Starts a game (thd) with 3 maids, Tai mắt 3, ends turns until the shown modal carries a maid-line line; screenshot + overflow check. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT]=process.argv;const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];
fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);await p.goto(URL,{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1200);
 const r=await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;Q.length=0;
  for(let i=0;i<3;i++){const s=mkServ('maid');s.age=17+i;S.staff.push(s)}
  /* force one of each kind this month so the shot is deterministic; numbers untouched (BAL restored after) */
  const B=JSON.parse(JSON.stringify(BAL.mline));Object.assign(BAL.mline,{seekStart:100,feud:100,feudHost:-999,hit:100});tmPlace(S,3);
  const ev=mlMonth();Object.assign(BAL.mline,B);quiet=false;log(ev);return ev});
 for(let i=0;i<8;i++){await p.mouse.click(Math.round(W/2),Math.round(H*0.97)).catch(()=>{});await sleep(500);await p.evaluate(()=>{const md=document.getElementById('modal');if(md&&!md.hidden&&typeof closeModal==='function')try{closeModal()}catch(e){}})}
 await p.evaluate(()=>{try{render()}catch(e){}});await sleep(1500);
 const who=await p.evaluate(async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));let tb=document.querySelector('[data-tab="log"]');if(!tb){const m=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='☰');if(m){m.click();await sl(700)}tb=document.querySelector('[data-tab="log"]')||[...document.querySelectorAll('button,a,[data-pg]')].find(b=>/^Sổ ghi/.test(b.textContent.trim()))}if(!tb)return 'none';const d=tb.outerHTML.slice(0,140);tb.click();return d});console.error('clicked',who);await sleep(1500);
 const ck=await p.evaluate(()=>({ovf:document.documentElement.scrollWidth>innerWidth+1,body:(document.body.innerText||'').includes('cung ta')||(document.body.innerText||'').includes('Hoàng thượng'),ngươi:/cung ngươi/.test(document.body.innerText||''),pct:/\d\s*%/.test(document.body.innerText||'')}));
 await p.screenshot({path:`${OUT}/mline-${W}x${H}.jpg`,type:'jpeg',quality:70});console.log(JSON.stringify({vp:VP,ev:r.slice(0,600),ck,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
