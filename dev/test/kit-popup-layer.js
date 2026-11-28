/* review/kit-ghichu-sections r2 (rv FAIL): the ONE kit popup layer (#kpop) is above every picture, incl. the big emotion avatar (.kemo-big, z-index 9990/9991).
   Scenes: the real art-rule modal (v85Table('cam')) «Năm bậc !» popup, a kitNoteBang popup, a kitTapWord popup, a kitFactTap popup — each with a synthetic .kemo-big (z 9991) laid over the popup rectangle:
   the topmost element at the popup's centre and 4 corners must belong to #kpop. usage: node dev/test/kit-popup-layer.js <url> [WxH,...] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));
const [,,URL,SIZES]=process.argv;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await ctx.addInitScript(()=>{setInterval(()=>{if(!window.__noskip)document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitNoteBang==='function',null,{timeout:240000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});const m=document.getElementById('modal');if(m){m.hidden=true}render();window.__noskip=true/* a synthetic skip click would close the popup under test */});await p.waitForTimeout(1200);
  const res=await p.evaluate(async()=>{const out={};const sleep=ms=>new Promise(r=>setTimeout(r,ms));
   const check=async(name,open)=>{try{document.querySelectorAll('.kemo-big').forEach(e=>e.remove());const k0=document.getElementById('kpop');if(k0)k0.hidden=true;await open();await sleep(500);const k=document.getElementById('kpop');if(!k||k.hidden){out[name]='NO POPUP';return}
    const z=+getComputedStyle(k).zIndex||0;const cs=getComputedStyle(k);const vis=cs.display!=='none'&&cs.visibility!=='hidden'&&+cs.opacity>0;
    const emoZ=Math.max(9991,...[...document.querySelectorAll('.kemo-big,.kcl,.ksht')].map(e=>+getComputedStyle(e).zIndex||0).filter(n=>n<10000));/* every picture layer below the 9999 effect layers */
    out[name]=k.parentElement===document.body&&vis&&z>emoZ?'ok':`LAYER z kpop=${z} vs picture layers ${emoZ}, parent=${k.parentElement&&k.parentElement.tagName}, visible=${vis}`;
    /* the popup sits above the 9990/9991 emotion avatar; effect layers (9999) are decoration without pointer events */
    }catch(e){out[name]='ERR '+e.message}};
   await check('art-rule',async()=>{v85Table('cam');await sleep(400);const bg=document.querySelector('#modal h4.kpst .kgnb');if(bg)bg.click()});
   await check('note-bang',async()=>{const m=document.getElementById('modal');if(m)m.hidden=true;const d=document.createElement('div');d.id='tt';d.style.cssText='position:fixed;left:30px;top:200px;z-index:50;background:#fff;padding:8px';d.innerHTML='Dòng '+kitNoteBang('một ghi chú dài một chút để popup có chiều cao','Ghi chú');document.body.appendChild(d);d.querySelector('.kgnb').click()});
   await check('tap-word',async()=>{const d=document.getElementById('tt')||document.body.appendChild(document.createElement('div'));d.id='tt';d.style.cssText='position:fixed;left:30px;top:260px;z-index:50;background:#fff;padding:8px';d.innerHTML=kitTapWord('Đa nghi','Mưu kế dễ bị lộ hơn.');d.querySelector('.kfx').click()});
   await check('fact-tap',async()=>{const d=document.getElementById('tt');d.innerHTML=kitFactTap('Thích Cầm',{when:'tháng ba',how:'dò được',src:'cung nữ'});d.querySelector('.kfx').click()});
   return out});
  const f=Object.entries(res).filter(([k,v])=>v!=='ok').map(([k,v])=>k+': '+v);if(errs.length)f.push('errors '+errs.join('|'));if(f.length)bad++;
  console.log(wh,f.length?'FAIL '+f.join('; '):'PASS',JSON.stringify(res));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
