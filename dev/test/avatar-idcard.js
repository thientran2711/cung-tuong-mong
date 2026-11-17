/* review/kit-fx-register (owner 17/11 ~18:10Z): AVATAR = ID CARD. Every avatar-class frame (pcPort / mdH) shows the base portrait + LASTING marks only,
   baked into one image; no .kfxc overlay, no makeup, no temporary marks. Scans the real tabs + a synthetic grid of frame kinds.
   usage: node dev/test/avatar-idcard.js <url> <WxH@dpr> <shotdir>   (exit 1 on a failed check; prints the before/after table row) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,DIR]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;
fs.mkdirSync(DIR,{recursive:true});const fails=[];const chk=(c,msg)=>{if(!c)fails.push(msg)};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();p.setDefaultTimeout(60000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const out={vp:VP};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,.kmov.kcf').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:30000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out&&qOn()&&S.rank<7&&rivals.filter(v=>!v.queen&&!v.out).length>3))break}
 await p.waitForTimeout(1500);
 /* fit tables must be in, then give: herself a scar + makeup + a rash; rival 1 a scar; rival 2 a slap + rash (temporary only); rival 3 clean */
 await p.waitForFunction(()=>window.KIT_SCAR&&KIT_SCAR.fit,null,{timeout:60000});
 /* test-only: a face without a scar-fit row (tcold tier etc.) borrows the c01 row so every scarred person can be checked */
 await p.evaluate(()=>{const base=KIT_SCAR.fit['por-consort-c01-t1-a18.webp'];const r0=KIT_SCAR.rect.bind(KIT_SCAR);KIT_SCAR.rect=f=>r0(f)||base;KIT_SCAR.style=f=>{const r=KIT_SCAR.rect(f);return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]}deg);transform-origin:50% 50%`}});
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;const MM=document.getElementById('modal');if(MM){MM.hidden=true;MM.innerHTML=''}
  isKnown61=()=>true;/* test-only: every rival counts as met so the real portrait (not the grey silhouette) is drawn */const R=rivals.filter(v=>!v.queen&&!v.out);window.RR=R;S.scar={sev:2,known:true};R[0].scar={sev:3,known:true};try{KIT_FACEFX.api.slap(R[1],S,'test',2);KIT_FACEFX.api.rash(R[1],2,'test')}catch(e){}try{KIT_FACEFX.api.rash(S,2,'test')}catch(e){}
  const c=toilColFix(null);c.seed=7;S.toilette={day:toilWk()*10,wk:toilWk(),score:30,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:'tuyet',col:c};render()});
 await p.waitForTimeout(6000);
 /* synthetic grid: the same persons through every avatar builder */
 const grid=await p.evaluate(async()=>{const host=document.createElement('div');host.id='avgrid';host.style.cssText='position:fixed;left:0;top:0;right:0;z-index:99999;background:#fff;padding:6px;display:flex;flex-wrap:wrap;gap:6px';document.body.appendChild(host);
  const who=[['her',S],['scarred',window.RR[0]],['slapped+rash',window.RR[1]],['clean',window.RR[2]]];let html='';const meta=[];
  for(const [n,q] of who){try{const f=(typeof kfOf==='function'?kfOf(q):null);html+=`<div class="avcell" data-w="${n}" data-k="md">${mdH(pv(q),'kmini')}</div><div class="avcell" data-w="${n}" data-k="pcp" style="width:150px">${pcPort(pv(q))}</div>`}catch(e){meta.push(n+' md '+e.message)}}
  host.innerHTML=html;await new Promise(r=>setTimeout(r,4000));for(let i=0;i<60&&Object.keys(KIT_BAKE.pend).length;i++)await new Promise(r=>setTimeout(r,300));await new Promise(r=>setTimeout(r,800));
  const cells=[...host.querySelectorAll('.avcell')].map(c=>({w:c.dataset.w,k:c.dataset.k,kfxc:c.querySelectorAll('.kfxc,.kfx').length,imgs:[...c.querySelectorAll('img')].map(i=>(i.src||'').slice(0,5)+'|'+(i.dataset.kbk?'bk':'-'))}));return{cells,meta}});
 out.grid=grid;for(const c of await p.$$('#avgrid .avcell')){const w=await c.getAttribute('data-w'),k=await c.getAttribute('data-k');await c.screenshot({path:`${DIR}/av-${tag}-${w.split('+').join('')}-${k}.png`})}
 /* real tabs */
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button,.tabs button,nav button')].map(b=>b.textContent.trim()).filter(Boolean).slice(0,12));out.tabs=tabs;
 const scan=async(label)=>{await p.waitForFunction(()=>!Object.keys(KIT_BAKE.pend).length,null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(600);const r=await p.evaluate(()=>{const q=s=>document.querySelectorAll(s).length;const av=[...document.querySelectorAll('img.kpor,span.md img,.kmini img,.kfc img')].filter(i=>/por-/.test(i.currentSrc||i.src)||/^blob:/.test(i.currentSrc||i.src));
   return{kfxc:q('.kfxc'),kfx:q('.kfxc .kfx'),avatars:av.length,baked:av.filter(i=>/^blob:/.test(i.currentSrc||i.src)).length,pending:av.filter(i=>i.dataset.kbk&&!/^blob:/.test(i.currentSrc||i.src)).length,hs:document.documentElement.scrollWidth>innerWidth+1}});out['scan_'+label]=r;chk(r.kfxc===0,label+': .kfxc overlay boxes left '+r.kfxc);chk(r.pending===0,label+': avatars still waiting for their bake '+r.pending);chk(!r.hs,label+': horizontal overflow')};
 await scan('stage');await p.screenshot({path:`${DIR}/idcard-${tag}-stage.jpg`,quality:70});
 for(const t of['Hậu cung','Hoàng tự','Giao tình','Hành sự']){try{await p.evaluate(t=>{const b=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()===t&&e.offsetParent);if(b)b.click()},t);await p.waitForTimeout(2500);await scan(t);await p.screenshot({path:`${DIR}/idcard-${tag}-${t.replace(/\W/g,'')}.jpg`,quality:70})}catch(e){out['err_'+t]=e.message}}
 /* grid checks */
 for(const c of out.grid.cells){chk(c.kfxc===0,'grid '+c.w+': overlay box');if(c.w==='scarred'){chk(c.imgs.some(x=>/blob:|bk/.test(x)),'grid scarred: baked/pending')}if(c.w==='clean'||c.w==='slapped+rash'){chk(!c.imgs.some(x=>/bk/.test(x)),'grid '+c.w+': must be the plain photo (no lasting mark)')}}
 out.baked=await p.evaluate(()=>({cache:Object.keys(KIT_BAKE.cache).length,pend:Object.keys(KIT_BAKE.pend).length}));
 chk(out.baked.cache>0,'at least one bake finished');chk(!errs.length,'page errors: '+errs.join('|'));out.fails=fails;out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
