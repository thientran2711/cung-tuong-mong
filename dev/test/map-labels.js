/* map-labels.js — LUẬT SỬA CẢ NHÓM scan for Dư đồ place labels (owner 16/11 "Chữ nhỏ quá, mờ nữa").
   For every viewport x map zoom: every .mspot .mlab (place name chip) is measured: font px, text/chip contrast, chip opacity, box, whether it is
   clipped by the map viewport, overlaps a neighbour label, or is cut by its own box (scrollWidth > clientWidth).
   usage: node dev/test/map-labels.js <dev/index.html> <OUT> [WxH,WxH,..]   → <OUT>/table.json, <OUT>/<vp>-z<z>.jpg (map only), prints a table
   Pictures come from the CDN through Playwright (cached in .ahcache/img). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const WT=path.resolve(__dirname,'../..')+'/';
const [,,HTML0,OUT,VPS='755x1000,1180x820,1366x1024,844x390,390x844,1000x755']=process.argv;const HTML=path.resolve(HTML0);
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
  await clean();
  for(const z of [0,1,2,3]){ /* z=0: the default zoom of the viewport; 1..3 = explicit */
   await p.evaluate(z=>{Q.length=0;window.__mapList=0;window.__mapZ=z?(window.__mapFit||1)+z:0;tab='go';document.querySelectorAll('.modal,#modal').forEach(m=>{try{m.hidden=true}catch(e){}});render()},[0,.5,1.5,2.5][z]);await p.waitForTimeout(1500);await clean();
   const info=await p.evaluate(()=>{const sc=document.querySelector('.mapsc');if(!sc)return {none:1};const sr=sc.getBoundingClientRect();const mw=sc.querySelector('.mapw').getBoundingClientRect();
    const hex=c=>{const m=c.match(/[\d.]+/g).map(Number);return m};
    const lum=c=>{const [r,g,b]=c.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
    const labs=[...sc.querySelectorAll('.mspot .mlab')].map(l=>{const cs=getComputedStyle(l),r=l.getBoundingClientRect(),sp=l.closest('.mspot'),sr2=sp.getBoundingClientRect();
     const fg=hex(cs.color),bg=hex(cs.backgroundColor);const a=bg[3]==null?1:bg[3];const op=+cs.opacity*(+getComputedStyle(sp).opacity);
     const L1=lum(fg),L2=lum(bg.slice(0,3));const cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
     return {name:l.textContent.trim().replace(/\s+/g,' '),k:sp.dataset.go||sp.dataset.ak||'-',fs:+parseFloat(cs.fontSize).toFixed(1),cr:+cr.toFixed(1),bgA:+a.toFixed(2),op:+op.toFixed(2),lock:!!l.querySelector('.mlock'),
      x:Math.round(r.left-sr.left+sc.scrollLeft),y:Math.round(r.top-sr.top+sc.scrollTop),w:Math.round(r.width),h:Math.round(r.height),
      cut:l.scrollWidth>l.clientWidth+1||l.scrollHeight>l.clientHeight+1,
      vis:r.width>0&&r.height>0,spw:Math.round(sr2.width),
      onscreen:!(r.right<sr.left||r.left>sr.right||r.bottom<sr.top||r.top>sr.bottom),
      clipEdge:(r.left<mw.left-1||r.right>mw.right+1||r.top<mw.top-1||r.bottom>mw.bottom+1)}});
    for(let i=0;i<labs.length;i++){labs[i].ov=[];for(let j=0;j<labs.length;j++){if(i===j)continue;const a=labs[i],c=labs[j];const ox=Math.min(a.x+a.w,c.x+c.w)-Math.max(a.x,c.x),oy=Math.min(a.y+a.h,c.y+c.h)-Math.max(a.y,c.y);if(ox>1&&oy>1)labs[i].ov.push(c.name)}}
    return {sw:sc.scrollWidth,cw:sc.clientWidth,fit:window.__mapFit,labs}});
   if(info.none){rows.push({vp,z,none:1});continue}
   const el=await p.$('.mapsc');await el.screenshot({path:`${OUT}/${vp}-z${z}.jpg`,type:'jpeg',quality:70}).catch(()=>{});
   for(const l of info.labs)rows.push({vp,z,fit:info.fit,...l});
  }
  if(errs.length)rows.push({vp,errs});
  await ctx.close()}
 await b.close();fs.writeFileSync(OUT+'/table.json',JSON.stringify(rows,null,1));
 const sum={};for(const r of rows){if(!r.name)continue;const key=r.vp+' z+'+[0,.5,1.5,2.5][r.z]+' fit'+(+r.fit).toFixed(2);const s=sum[key]=sum[key]||{n:0,minFs:99,minCr:99,maxOp:0,minOp:9,minBgA:9,cut:0,ov:0,edge:0,hid:0};s.n++;s.minFs=Math.min(s.minFs,r.fs);s.minCr=Math.min(s.minCr,r.cr);s.minOp=Math.min(s.minOp,r.op);s.minBgA=Math.min(s.minBgA,r.bgA);if(r.cut)s.cut++;if(r.ov.length)s.ov++;if(r.clipEdge)s.edge++;if(!r.vis)s.hid++}
 console.table(sum);console.log(rows.filter(r=>r.errs||r.none));
})();
