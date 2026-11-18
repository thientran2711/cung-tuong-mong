/* review/smudge-code r16 (main s42): every avatar builder for herself WITH makeup (Kiều diễm, score 70): which layers sit over it, what picture is drawn.
   usage: node dev/test/avatar-makeup-probe.js <url> <outdir>  -> JSON; <outdir>/avp-<md|kmini|pcp>.png. Layers counted = img.kmkc / img.kmkl / img.klk-smu / .kfxc inside the cell. */
const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;const fs=require('fs');fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:3,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(60000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(4000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:40000}).catch(()=>{});
 const res=await p.evaluate(async()=>{const c=toilColFix(null);c.seed=5;S.toilette={day:toilWk()*10,wk:toilWk(),score:70,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:'dep',col:c};render();await new Promise(r=>setTimeout(r,3500));render();
  const host=document.createElement('div');host.id='avp';host.style.cssText='position:fixed;left:0;top:0;right:0;z-index:99999;background:#fff;padding:8px;display:flex;gap:12px;align-items:flex-start';document.body.appendChild(host);
  const q=pv(S);let h='';const tags=[];
  try{h+=`<div class="avcell" data-k="md" style="width:80px">${mdH(q,'kmini')}</div>`}catch(e){tags.push('md '+e.message)}
  try{h+=`<div class="avcell" data-k="pcp" style="width:150px">${pcPort(q)}</div>`}catch(e){tags.push('pcp '+e.message)}
  host.innerHTML=h;await new Promise(r=>setTimeout(r,2000));for(let i=0;i<80&&Object.keys(KIT_BAKE.pend).length;i++)await new Promise(r=>setTimeout(r,300));await new Promise(r=>setTimeout(r,800));
  const cells=[...host.querySelectorAll('.avcell')].map(c=>({k:c.dataset.k,layers:c.querySelectorAll('img.kmkc,img.kmkl,img.klk-smu,.kfxc').length,imgs:[...c.querySelectorAll('img')].map(i=>(/^blob:/.test(i.currentSrc)?'blob':(i.currentSrc||'').split('/').pop().slice(0,30))+' '+Math.round(i.getBoundingClientRect().width)+'px'),html:c.innerHTML.slice(0,260)}));
  return{cells,tags,codeHasMakeupInAvatar:typeof KIT_LASTING!=='undefined'?KIT_LASTING.list.map(l=>l.id):null}});
 for(const c of await p.$$('#avp .avcell')){const k=await c.getAttribute('data-k');await c.screenshot({path:`${OUT}/avp-${k}.png`})}
 console.log(JSON.stringify({errs,...res}));await b.close()})();
