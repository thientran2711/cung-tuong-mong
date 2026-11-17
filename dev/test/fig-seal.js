/* review/kit-figure-mood: the mood seal beside the head of every interactable full-body figure (KIT 28.8d, dev/build/jfigseal.js).
   usage: node dev/test/fig-seal.js <W>x<H>@dpr <outdir> [dev/index.html]
   Starts a life, sets known moods on the people, shoots the room stage, a place view and an event dialog, and checks per figure: seal inside the stage/dialog,
   seal not over the face (head centre), seal size within min..max and ~ body height, seal beside (not above) the head. Prints a JSON table. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,SZ,OUT,PAGE]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MIME={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png',css:'text/css'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route('**/*',r=>{const u=new URL(r.request().url());if(u.host!=='em.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://em.local/'+(PAGE||'dev/index.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 const clean=()=>p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true});
 await clean();
 await p.evaluate(()=>{S.emp.emo={k:'gian',v:70,why:'bị quần thần can gián',t:null,w:0};(S.nightLog=S.nightLog||[]).push(typeof emoW==='function'?emoW():0);
  S.met=S.met||{};const ks=['ghen','vui','buon','so','muu'];rivals.slice(0,5).forEach((v,i)=>{S.met[v.id]=1;try{k61Meet(v,'gặp',3)}catch(e){}v.emo={k:ks[i%5],v:60,why:'thử',w:0}});
  for(const m of (S.men||[]).slice(0,3)){try{k61Meet(m,'gặp',3)}catch(e){}m.emo={k:'so',v:60,why:'thử',w:0}}try{k61Meet(S.emp,'gặp',3)}catch(e){}});
 const R={};
 const check=(tag)=>p.evaluate((tag)=>{const out=[];document.querySelectorAll('img.kfseal').forEach(s=>{const f=s.__fig;if(!f)return;const sr=s.getBoundingClientRect();if(!sr.width)return;const fr=f.getBoundingClientRect();
   const bd=(f.closest('#stage')||f.closest('.kszfig,.kesf')||f.closest('.dlg')||f.parentElement).getBoundingClientRect();
   const hd=window.kitFigBody&&kitFigBody(f.currentSrc||f.src);
   let faceHit=null,inside=sr.left>=bd.left-1&&sr.right<=bd.right+1&&sr.top>=bd.top-1&&sr.bottom<=bd.bottom+1;
   if(hd){const bh=fr.height,ht=hd.ht!=null?hd.ht:hd.t,body=(hd.b-ht)*bh,cx=fr.left+fr.width*((hd.cl+hd.cr)/2),cy=fr.top+bh*ht+body*.085;/* face = ellipse around the head centre, half-width .045 body */
    const dx=Math.max(sr.left-cx,0,cx-sr.right),dy=Math.max(sr.top-cy,0,cy-sr.bottom);faceHit=Math.hypot(dx,dy)<body*.04}
   out.push({fig:f.id||f.className.slice(0,14),who:(f.closest('.tok')?.querySelector('.tag')?.textContent||'').slice(0,24),seal:s.getAttribute('src').replace(/^.*\/img\//,''),px:Math.round(sr.width),body:s.dataset.kfsb,inside,faceHit,
    dxHead:hd?Math.round(sr.left+sr.width/2-(fr.left+fr.width*((hd.cl+hd.cr)/2))):null,above:hd?Math.round((fr.top+fr.height*(hd.ht!=null?hd.ht:hd.t))-sr.bottom):null})});
  const figs=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg,img.kesimg,.kszfs>img')].filter(e=>e.getClientRects().length).length;return{tag,figs,seals:out}},tag);
 await p.waitForTimeout(2500);R.room=await check('room');await p.screenshot({path:`${OUT}/room-${W}x${H}.jpg`,type:'jpeg',quality:72});
 /* event dialog with a person (kit sample: the real pop-up, Hoàng hậu on the stage) */
 await p.evaluate(()=>{try{kitPopSample('event')}catch(e){console.error(e)}});await p.waitForTimeout(2500);R.event=await check('event');R.dbg=await p.evaluate(()=>[...document.querySelectorAll('#modal img')].filter(i=>i.getBoundingClientRect().height>300).map(i=>({c:i.className,s:i.src.slice(-50),p:i.parentElement.className,pp:i.parentElement.parentElement.className})));await p.screenshot({path:`${OUT}/event-${W}x${H}.jpg`,type:'jpeg',quality:72});
 await clean();
 console.log(JSON.stringify({W,H,...R,errs},null,1));await b.close()})();
