/* review/avatar-makeup (main s43, OD 18/11 ~09:25Z): every avatar-class frame carries the makeup layer at LOD step 0; the stage is step 0 too.
   usage: node dev/test/avatar-makeup.js <url> <WxH@dpr> <outdir> [score]   (score default 70 = Kieu diem; 90 = Khuynh thanh; exit 1 on a failed check)
   Checks: (1) makeup ON: every real avatar <img data-kbk> of herself is a blob (baked) in top bar / side cards / tabs / pcPort; (2) makeup OFF: plain por-*.webp, no blob;
   (3) stage layers (#stage img.kmkc) all at step 0 (no |L suffix); (4) 0 page errors.  Shots: full screen on/off + each frame kind close-up on/off. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,DIR,SC]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3],tag=`${W}x${H}`;const score=+(SC||70);
fs.mkdirSync(DIR,{recursive:true});const fails=[];const chk=(c,msg)=>{if(!c)fails.push(msg)};
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(60000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,.kmov.kcf').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(3000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:40000}).catch(()=>{});
 const set=async(on,sc)=>{await p.evaluate(([on,sc])=>{Q.length=0;const MM=document.getElementById('modal');if(MM){MM.hidden=true;MM.innerHTML=''}const c=toilColFix(null);c.seed=5;S.toilette={day:toilWk()*10,wk:toilWk(),score:sc,makeup:on,style:'fit',dv:'chinh',F:0,occ:[],look:'dep',col:c};render()},[on,sc]);
  await p.waitForTimeout(3500);for(let i=0;i<3;i++){try{await p.evaluate(()=>toilLodPass())}catch(e){}await p.waitForTimeout(400)}await p.waitForFunction(()=>!Object.keys(KIT_BAKE.pend).length,null,{timeout:40000}).catch(()=>{});await p.waitForTimeout(800)};
 const scan=()=>p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};
  const her=[...document.querySelectorAll('img')].filter(i=>/(^|\/)por-|^blob:/.test(i.currentSrc||i.src)&&vis(i)&&!i.closest('#stage'));
  const rows=her.map(i=>{const h=i.closest('.pcp,.md,.kmini,.kfc,[class*=kmini]');return{file:i.dataset.kbk?i.dataset.kbk.split('|')[0]:(i.currentSrc||'').split('/').pop(),blob:/^blob:/.test(i.currentSrc),kbk:!!i.dataset.kbk,w:Math.round(i.getBoundingClientRect().width),cls:(h&&h.className||i.parentElement.className||'').toString().slice(0,40)}});
  const st=[...document.querySelectorAll('#stage img.kmkc,.kesfi img.kmkc')].map(i=>/\|L\d+$/.test(i.dataset.mkk||'')?'L':'0');return{rows,stage:st}});
 const out={vp:VP,score};
 const grid=async(on)=>{await p.evaluate(()=>{const h=document.getElementById('avg');if(h)h.remove()});await p.evaluate(()=>{const host=document.createElement('div');host.id='avg';host.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#f4ead8;padding:8px;display:flex;gap:14px;align-items:flex-start';const q=pv(S);host.innerHTML=`<div class="avcell" style="width:90px">${mdH(q,'kmini')}</div><div class="avcell" style="width:150px">${pcPort(q)}</div><div class="avcell" style="width:48px">${mdH(q,'kmini sm')}</div>`;document.body.appendChild(host)});
  await p.waitForTimeout(1500);await p.waitForFunction(()=>!Object.keys(KIT_BAKE.pend).length,null,{timeout:40000}).catch(()=>{});await p.waitForTimeout(800);out['grid'+on]=await p.evaluate(()=>[...document.querySelectorAll('#avg img')].filter(i=>/por-|^blob/.test(i.currentSrc)).map(i=>i.dataset.kbk?i.dataset.kbk.split('|')[0]:(i.currentSrc||'').split('/').pop()));const el=await p.$('#avg');await el.screenshot({path:`${DIR}/frames-${tag}-${on?'on':'off'}.png`});await p.evaluate(()=>document.getElementById('avg').remove())};

 await set(true,score);await p.screenshot({path:`${DIR}/full-${tag}-on.png`});out.on=await scan();await grid(true);
 await set(false,score);await p.screenshot({path:`${DIR}/full-${tag}-off.png`});out.off=await scan();await grid(false);
 out.errs=errs;const onBlob=out.on.rows.filter(r=>r.kbk);chk(onBlob.length>0,'no avatar frame with a bake on screen');chk(onBlob.every(r=>r.blob),'an avatar frame (makeup on) is not baked: '+JSON.stringify(onBlob.filter(r=>!r.blob)));
 chk(out.off.rows.every(r=>!r.blob),'makeup off but an avatar is still a blob');chk(out.on.stage.every(s=>s==='0'),'stage makeup layer not at step 0: '+out.on.stage.join());chk(errs.length===0,'page errors');
 out.fails=fails;console.log(JSON.stringify(out));await b.close();process.exit(fails.length?1:0)})();
