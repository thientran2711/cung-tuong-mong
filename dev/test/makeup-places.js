/* review/smudge-code r16 step 0 (main s41, owner 18/11 01:30Z): WHERE is the makeup / smudge layer drawn, at what size, at what LOD step?
   usage: node dev/test/makeup-places.js <url> <WxH@dpr>  -> JSON rows {state, ctx, pic, imgW, faceW (px on the toilLodStep scale = layer width / 1.6), step, makeup, smudge}.
   Every face picture (por-/fig-) in each state is listed, with whether a makeup layer (img.kmkc / img.kmkl) or smudge layer (img.klk-smu) sits over it. Herself has makeup + smudge. */
const {chromium}=require('playwright');const [,,URL,VP]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(60000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(4000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:40000}).catch(()=>{});
 await p.evaluate(()=>{const c=toilColFix(null);c.seed=5;const T=S.toilette={day:toilWk()*10,wk:toilWk(),score:30,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:'dep',col:c};S.lk=null;delete T.lk;lkSmudge(S,3,'mua');window.KIT_FACEFX&&(KIT_FACEFX.seen=()=>true);render()});
 await p.waitForTimeout(4000);
 const rows=[];
 const scan=async state=>{for(let k=0;k<3;k++){try{await p.evaluate(()=>toilLodPass())}catch(e){}await p.waitForTimeout(500)}
  const r=await p.evaluate(state=>{const out=[];const ch=e=>{let s=[],n=e;for(let i=0;i<3&&n&&n!==document.body;i++,n=n.parentElement)s.push((n.tagName.toLowerCase())+(n.className&&typeof n.className==='string'?'.'+n.className.trim().split(/\s+/).slice(0,2).join('.'):''));return s.join(' < ')};
   const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth&&getComputedStyle(e).visibility!=='hidden'};
   const pics=[...document.querySelectorAll('img')].filter(i=>/(^|\/)(por|fig)-/.test((i.currentSrc||i.src||'').split('?')[0])&&vis(i));
   for(const i of pics){const f=kitFile(i.currentSrc||i.src),r=i.getBoundingClientRect();let v=null;try{v=MK_FIT.get(f)}catch(e){}let fw=null;if(v){try{fw=Math.round(lkSmuBox(v)[2]/100*r.width/1.6)}catch(e){}}
    /* layers = any makeup / smudge img whose centre lies inside this picture's box (same box, any host) */
    const inside=l=>{const q=l.getBoundingClientRect(),cx=q.left+q.width/2,cy=q.top+q.height/2;return cx>=r.left&&cx<=r.right&&cy>=r.top&&cy<=r.bottom&&q.width<=r.width*1.05};
    const mk=[...document.querySelectorAll('img.kmkc,img.kmkl')].filter(inside).length,sm=[...document.querySelectorAll('img.klk-smu')].filter(inside).length;
    out.push({state,ctx:ch(i),pic:f.replace(/\.(webp|png)$/,'').slice(0,34),imgW:Math.round(r.width),faceW:fw,step:fw==null?null:toilLodStep(fw),makeup:mk,smudge:sm})}
   const L=[...document.querySelectorAll('img.kmkc,img.kmkl,img.klk-smu')].map(l=>{const q=l.getBoundingClientRect();return{state,cls:l.className.slice(0,20),w:Math.round(q.width),x:Math.round(q.left),y:Math.round(q.top),face:Math.round(q.width/1.6),step:((l.dataset.mkk||l.dataset.lsk||'').match(/\|L(\d+)$/)||[])[1]||0,ctx:ch(l)}});
   return out.concat(L.map(l=>({layer:1,...l})))},state);rows.push(...r)};
 await scan('stage');
 for(const t of ['Hậu cung','Hoàng tự','Giao tình','Hành sự']){try{await p.evaluate(t=>{const b=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()===t&&e.offsetParent);if(b)b.click()},t);await p.waitForTimeout(2500);await scan('tab:'+t)}catch(e){}}
 /* event dialog with her figure (kit panel, stage:[S]) */
 try{await p.evaluate(()=>{Q.length=0;Q.push({t:'Khảo sát',stage:[S],h:'<p>thử</p>'});render()});await p.waitForTimeout(3500);await scan('event-dialog (kitStageFig, herself)');await p.evaluate(()=>{try{closeModal()}catch(e){}})}catch(e){rows.push({state:'event-dialog',err:e.message.slice(0,100)})}
 /* mirror close-up reveal (toilReveal -> kitFaceZoom) and the bare kitFaceZoom at its CSS size (200 px) */
 try{await p.evaluate(()=>{window.__rv=1;try{toilReveal({look:'dep',mk:1},()=>{})}catch(e){window.__rve=e.message}});await p.waitForTimeout(1200);await scan('mirror-reveal');
  await p.evaluate(()=>{const h=document.createElement('div');h.id='fz';h.style.cssText='position:fixed;left:0;top:0;width:260px;z-index:99999;background:#fff';const f=kitFile(kitFigOf(S));h.innerHTML=kitFaceZoom(S,f);document.body.appendChild(h)});await p.waitForTimeout(2500);await scan('kitFaceZoom @ its 200 css px')}catch(e){rows.push({state:'mirror',err:e.message.slice(0,100)})}
 console.log(JSON.stringify({vp:VP,rows,errs}));await b.close()})();
