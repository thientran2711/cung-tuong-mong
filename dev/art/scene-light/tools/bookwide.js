/* bookwide.js PAGE.html OUTDIR : Tuần lục person page with each wide figure (FIGS env, comma list) at the review sizes.
   Prints per size × figure: figure height / picture height, any scale, cut at page left/right, and how far the text column stays clear of
   the face + torso (centre ± 14 % of figure height; ≥ 0 = clear), whether the text sits on the paper panel (.kbk-figover). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,PAGE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const FIGS=(process.env.FIGS||'fig-thaihau-h1-a51.webp').split(',');
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1000,755],[1180,820],[1366,1024]];
(async()=>{const b=await chromium.launch();const R=[];
for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,isMobile:W<1100,hasTouch:true});
 await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:fs.readFileSync(PAGE),contentType:'text/html; charset=utf-8'}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:90000});await p.waitForTimeout(5000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(3000);
 await p.evaluate(()=>{Q.length=0;try{showModal()}catch(e){}for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}});
 for(const FIG of FIGS){
  const res=await p.evaluate(async FIG=>{
   const k0=window.__k0||(window.__k0=kitFigOf);window.kitFigOf=kitFigOf=function(q){if(q&&(q===S.thO||q.kind==='th'))return (typeof IMG_BASE==='string'?IMG_BASE:'')+'img/'+FIG;return k0.apply(this,arguments)};
   const who=S.thO||{kind:'th',name:'Thái hậu',age:60};
   let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
   const facts=[];for(let i=0;i<4;i++)facts.push({text:'Thái hậu ban thưởng, khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung.',kind:'world',auto:false});
   kitBook({pages:[{kind:'person',who,title:'Thái hậu',blocks:[{facts}],n:4}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}});
   const t0=Date.now();let im;while(Date.now()-t0<15000){im=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesimg')].find(e=>e.offsetParent);if(im&&im.complete&&im.naturalWidth)break;await new Promise(r=>setTimeout(r,200))}
   if(!im||!im.naturalWidth)return{err:'no fig'};await new Promise(r=>setTimeout(r,1600));
   im=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesimg')].find(e=>e.offsetParent&&e.complete&&e.naturalWidth);if(!im)return{err:'relayout'};   /* the book re-lays out once the figure's shape is known */
   const box=im.closest('.kbk-person'),por=box.querySelector('.kbk-por'),fl=box.querySelector('.kbk-flow'),hd=box.querySelector('.kbk-phead'),page=box.closest('.kbk-page')||box;
   const r=im.getBoundingClientRect(),pb=page.getBoundingClientRect(),bb=box.getBoundingClientRect(),pr=por.getBoundingClientRect();
   const tl=Math.min(fl.getBoundingClientRect().left,hd.getBoundingClientRect().left),cx=r.left+r.width/2,tr=getComputedStyle(im.closest('.kesfi')).transform;
   return{fig:FIG,hRatio:+(r.height/pr.height).toFixed(3),scale:/matrix\(([\d.]+)/.test(tr)?+(/matrix\(([\d.]+)/.exec(tr)[1]):1,
    cutL:Math.round(Math.max(0,bb.left-r.left)),cutR:Math.round(Math.max(0,r.right-bb.right)),torsoClear:Math.round(tl-(cx+.14*r.height)),
    over:box.classList.contains('kbk-figover'),textCut:(()=>{let c=0;for(const e of [fl,hd])c=Math.max(c,e.scrollHeight-e.clientHeight);const bt=box.getBoundingClientRect().bottom;for(const e of fl.querySelectorAll('*'))if(e.getBoundingClientRect().bottom>bt+1&&e.offsetParent)c=Math.max(c,Math.round(e.getBoundingClientRect().bottom-bt));return c})(),textW:Math.round(fl.getBoundingClientRect().width),ovX:document.documentElement.scrollWidth>innerWidth}},FIG);
  await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=c.id==='dawn'?'visible':'hidden'});
  if(FIG===FIGS[0]||process.env.SHOTS)await p.screenshot({path:`${OUT}/${W}x${H}-${FIG.replace('.webp','')}.jpg`,type:'jpeg',quality:60});
  R.push({size:`${W}x${H}`,...res})}
 R.push({size:`${W}x${H}`,errs:errs.slice(0,3)});await ctx.close()}
console.log(JSON.stringify(R));await b.close()})();
