/* shots + checks for the kit tabs (jtabs/jpane, KIT §45–46): every sub-tab of Tài nghệ, Mệnh truyện, Việc nhờ on each size.
   Checks: 0 page errors, no horizontal overflow in the pane, no text clipped by a card (scrollWidth), no "Thôi/Lui" buttons,
   the sub-tab row sits in the pane bar. usage: node dev/test/tabs-kit-shots.js <url> <outdir|-> [<W>x<H>@dpr ...] */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const args=process.argv.slice(2);const URL=args[0],OUT=args[1]==='-'?null:args[1];
let SIZES=args.slice(2);if(!SIZES.length)SIZES=['755x1000@2','1180x820@2','412x1058@2','1000x755@2','844x390@3'];
(async()=>{const b=await chromium.launch();const errs=[];const R={};let bad=0;
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));p.setDefaultTimeout(0);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof KIT_INFOM!=='undefined'&&(KIT_INFOM.have||[]).length>0&&(KIT_ACTS.have||[]).length>0,null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(2500);
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=200;render()});
  R[SZ]={};
  for(const t of ['art','story','q72']){
   await p.evaluate(t=>{tab=t;render();const b=document.querySelector(`#tabs [data-tab="${t}"]`)||document.querySelector(`#tabs [data-kg]`);const P=document.getElementById('panel');if(!P.getBoundingClientRect().height&&b)b.click();if(!P.getBoundingClientRect().height){tab=t;render()}},t);await p.waitForTimeout(400);
   const subs=await p.evaluate(()=>[...document.querySelectorAll('#panel .kpbar [data-ktsv]')].map(b=>b.dataset.ktsv));
   for(const s of (subs.length?subs:['-'])){
    if(s!=='-'){await p.evaluate(s=>{const b=document.querySelector(`#panel [data-ktsv="${s}"]`);if(b)b.click()},s);await p.waitForTimeout(500)}
    const m=await p.evaluate(()=>{const P=document.getElementById('panel');const pr=P.getBoundingClientRect();const o={h:Math.round(pr.height),sw:P.scrollWidth-P.clientWidth};
     o.inBar=!!P.querySelector('.kpbar .ktsub');o.back=[...P.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Thôi|Lui)$/.test(x.textContent.trim())).length;
     o.clip=[...P.querySelectorAll('.ksk2,.ktq,.kchk,.ktprow,.kempty,button.ka')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+1).map(e=>e.className.slice(0,30)).slice(0,4);
     o.cards=P.querySelectorAll('.ksk2,.ktq,.ktprow,.kempty,button.ka').length;return o});
    const f=[];if(m.sw>1)f.push('h-overflow '+m.sw);if(subs.length&&!m.inBar)f.push('sub-tabs not in pane bar');if(m.back)f.push('Thôi/Lui button');if(m.clip.length)f.push('clipped '+m.clip.join());
    bad+=f.length;R[SZ][t+':'+s]=f.length?f:`ok (${m.cards} kit blocks)`;
    /* wait for the painted pictures of this view */
    await p.evaluate(ms=>Promise.race([new Promise(r=>setTimeout(r,ms)),Promise.all([...[...document.querySelectorAll("#panel img")].map(i=>{i.loading='eager';return i.complete?null:new Promise(r=>{i.onload=i.onerror=r})}),...[...document.querySelectorAll('#panel [style*="--kth"]')].map(e=>{const m=/url\('([^']+)'\)/.exec(e.getAttribute('style')||'');return m?new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=m[1]}):null})].filter(Boolean))]),+(process.env.PICWAIT||8000));
    await p.waitForTimeout(1500);if(OUT)await p.screenshot({path:`${OUT}/${t}-${s}-${SZ}.jpg`,type:'jpeg',quality:72})}}
  await ctx.close()}
 console.log(JSON.stringify({bad,R,errs},null,1));await b.close();process.exit(bad||errs.length?1:0)})();
