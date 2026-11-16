/* map-labels-2.js — audit Dư đồ labels vs painted buildings. usage: node dev/test/map-labels-2.js <index.html> <OUT> [WxH,..]
   Per viewport: whole map (all zoom levels needed to see it) screenshot with label table (name, key, box centre, label centre, lock reason). Reuses the CDN cache of map-labels.js. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const WT=path.resolve(__dirname,'../..')+'/';
const [,,HTML0,OUT,VPS='755x1000,1180x820',OLD0]=process.argv;let HTML=path.resolve(HTML0);const OLD=OLD0?path.resolve(OLD0):null; /* OLD = a build before the change: its save must load in HTML */
const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=WT+'.ahcache/img/';
fs.mkdirSync(OUT,{recursive:true});fs.mkdirSync(CACHE,{recursive:true});
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});const rows=[];
 for(const vp of VPS.split(',')){const [W,H]=vp.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,ignoreHTTPSErrors:true,reducedMotion:'reduce'});
  await ctx.route('**/*',async r=>{const u=r.request().url();
   if(u.startsWith('http://ctm.test/')){const p=decodeURIComponent(new URL(u).pathname).slice(1);
    if(p===''||p==='index.html')return r.fulfill({status:200,body:fs.readFileSync(HTML),contentType:'text/html; charset=utf-8'});
    const f=WT+p;if(fs.existsSync(f)&&fs.statSync(f).isFile())return r.fulfill({status:200,body:fs.readFileSync(f)});return r.fulfill({status:404,body:''})}
   if(u.startsWith(CDN)){const p=new URL(u).pathname.slice(1),c=CACHE+p.replace(/\//g,'__'),ct=p.endsWith('.json')?'application/json':p.endsWith('.webp')?'image/webp':p.endsWith('.png')?'image/png':'application/octet-stream';
    if(!p.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
    for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!p.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}
    return r.abort()}
   if(/fonts\.(googleapis|gstatic)/.test(u))return r.continue();return r.abort()});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
  await p.evaluate(()=>{SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(3000);
  const clean=()=>p.evaluate(()=>{Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi|Tiếp/.test(e.textContent||'')&&!e.closest('#stage'))e.remove()}const k=document.getElementById('kroul');if(k)k.remove();const m=document.getElementById('modal');if(m){m.classList.remove('on');m.hidden=true}const d=document.getElementById('dawn');if(d)d.hidden=true});
  let oldSave=null;
  if(OLD){const H=HTML;HTML=OLD;const p0=await ctx.newPage();await p0.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p0.waitForTimeout(4000);
   oldSave=await p0.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start();return JSON.stringify(ser())});await p0.close();HTML=H;
   const r=await p.evaluate(s=>{try{deser(JSON.parse(s));return 'ok'}catch(e){return 'ERR '+e.message}},oldSave);console.log(vp,'old-save load:',r)}
  await clean();await p.evaluate(k=>{Q.length=0;if(k)used=4-k;window.__mapList=0;window.__mapZ=1;tab='go';render()},+process.env.KHAC||0);await p.waitForTimeout(1500);await clean();
  const info=await p.evaluate(()=>{const mw=document.querySelector('.mapw').getBoundingClientRect();
   return [...document.querySelectorAll('.mspot')].map(sp=>{const l=sp.querySelector('.mlab'),r=sp.getBoundingClientRect(),lr=l.getBoundingClientRect();
    return {k:sp.dataset.go||'-',name:l.textContent.trim().replace(/\s+/g,' '),lock:!!l.querySelector('.mlock'),why:(sp.querySelector('.mwhy')||{}).textContent||'',
     boxC:[+((r.left+r.width/2-mw.left)/mw.width).toFixed(3),+((r.top+r.height/2-mw.top)/mw.height).toFixed(3)],
     labC:[+((lr.left+lr.width/2-mw.left)/mw.width).toFixed(3),+((lr.top+lr.height/2-mw.top)/mw.height).toFixed(3)],
     box:[+((r.left-mw.left)/mw.width).toFixed(3),+((r.top-mw.top)/mw.height).toFixed(3),+(r.width/mw.width).toFixed(3),+(r.height/mw.height).toFixed(3)]}})});
  if(process.env.KHAC){const lst=await p.evaluate(()=>{window.__mapList=1;render();const t=[...document.querySelectorAll('.mtile')];return t.map(e=>[e.className.replace('mtile','').trim()||'-',e.textContent.trim().replace(/\s+/g,' ').slice(0,30)])});console.log(vp,'list tiles',JSON.stringify(lst));await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/${vp}-list-${process.env.KHAC}khac.jpg`,type:'jpeg',quality:70});await p.evaluate(()=>{window.__mapList=0;render()});await p.waitForTimeout(500)}
  const tap=await p.evaluate(()=>{const e=document.querySelector('[data-ak=acs]')||document.querySelector('[data-go=acs]');if(!e)return 'none';e.scrollIntoView({block:'center',inline:'center'});e.click();return 'clicked'});await p.waitForTimeout(800);
  const card=await p.evaluate(()=>{const m=document.querySelector('.modal:not([hidden]),#modal:not([hidden])')||document.body;return (Q[0]&&(Q[0].t+' | '+(Q[0].h||'').replace(/<[^>]+>/g,' ')))||''});console.log(vp,'tap A ca so:',tap,'|',card.slice(0,160));
  await p.screenshot({path:`${OUT}/${vp}-acs-card.jpg`,type:'jpeg',quality:70});
  await clean();await p.evaluate(()=>render());await p.waitForTimeout(500);
  await p.evaluate(()=>{window.__mapZ=1;render()});await p.waitForTimeout(800);await clean();
  /* the map scrolls inside .mapsc: shoot it in tiles (scroll steps) and stitch them (PIL, dev/test/stitch.py) */
  const dim=await p.evaluate(()=>{const sc=document.querySelector('.mapsc');return {sw:sc.scrollWidth,sh:sc.scrollHeight,cw:sc.clientWidth,ch:sc.clientHeight}});console.log(vp,'map scroll',JSON.stringify(dim));
  const el=await p.$('.mapsc');const tiles=[];
  for(let y=0;y<dim.sh;y+=Math.max(1,dim.ch-40)){for(let x=0;x<dim.sw;x+=Math.max(1,dim.cw-40)){const x0=Math.min(x,dim.sw-dim.cw),y0=Math.min(y,dim.sh-dim.ch);await p.evaluate(([x,y])=>{const sc=document.querySelector('.mapsc');sc.scrollTo(x,y)},[x0,y0]);await p.waitForTimeout(250);const f=`${OUT}/_t_${vp}_${x0}_${y0}.png`;await el.screenshot({path:f});tiles.push([x0,y0,f]);if(x0>=dim.sw-dim.cw)break}if(Math.min(y,dim.sh-dim.ch)>=dim.sh-dim.ch)break}
  fs.writeFileSync(`${OUT}/_tiles_${vp}.json`,JSON.stringify({dim,tiles}));
  const dbg=await p.evaluate(()=>({PALN:PALN.slice(8),sp:mapSpots().filter(x=>/Thái giám|Vĩnh/.test(x.n)).map(x=>[x.k,x.n]),h:[...document.querySelectorAll('.mspot')].filter(e=>/Thái giám/.test(e.textContent)).map(e=>e.outerHTML.slice(0,600))}));if(process.env.DBG)console.log(JSON.stringify(dbg));rows.push({vp,errs,info:info.map(x=>({...x,cls:undefined}))});console.log(vp,'spots',info.length,'errs',errs.length);
  await ctx.close()}
 await b.close();fs.writeFileSync(OUT+'/table.json',JSON.stringify(rows,null,1));
})();
