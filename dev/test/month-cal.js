/* KIT §58 month calendar (review/month-calendar): desk calendar on her room's stage + kitMonthCal in the kit modal.
   Per size: desk button present at home, >=44 px, inside the stage, overlapping no name tag / side card / title / figure body (60 % width);
   opens the calendar; every month tab renders (12), no horizontal overflow, no clipped text in the calendar; a festival square opens the kit
   popover inside the viewport; only FEST festivals are marked (and Thánh thọ hides once Thái hậu is gone); lãnh cung shows the plain desk
   calendar. 390x844 = rotate prompt only (portrait phone).
   usage: node dev/test/month-cal.js <index.html> [outdir] [WxH@dpr ...] */
const {chromium}=require('playwright');const fs=require('fs');
const a=process.argv.slice(2);const IDX=a[0];const OUT=a[1]&&!/^\d+x/.test(a[1])?a[1]:null;
let SIZES=a.filter(x=>/^\d+x\d+@/.test(x));if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3','390x844@3'];
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';const html=fs.readFileSync(IDX,'utf8');
(async()=>{const b=await chromium.launch();const R={};const errs=[];let bad=0;
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route(u=>u.href.split('?')[0]===LIVE||u.href.split('?')[0]===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  await ctx.route(/\.(mp3|ogg)$/,r=>r.fulfill({status:404,body:''}));
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));
  const narrow=W<H&&W<500;await p.goto(LIVE+(narrow?'?khost=1':''),{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
  if(narrow){await p.waitForTimeout(4000);const rot=await p.evaluate(()=>{const f=document.getElementById('krotf');if(!f)return false;const t=getComputedStyle(f).transform;const m=t.match(/matrix\(([^)]+)\)/);if(!m)return false;const v=m[1].split(',').map(Number);return Math.abs(v[0])<0.01&&Math.abs(v[1])>0.01});R[SZ]=rot?'ok rotate prompt':'NO rotate prompt';if(!rot)bad++;
   if(OUT)await p.screenshot({path:`${OUT}/mcal-${SZ}.jpg`,type:'jpeg',quality:60});await ctx.close();continue}
  await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
  await p.waitForTimeout(2500);
  const m=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));['kroul','kroulw','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;document.getElementById('modal').hidden=true;
   const st=document.getElementById('stage'),bt=document.getElementById('kmcdesk');if(!bt){f.push('no desk calendar');return{f}}
   const R=st.getBoundingClientRect(),r=bt.getBoundingClientRect();if(r.width<44||r.height<44)f.push('desk too small '+r.width);
   if(r.left<R.left-1||r.right>R.right+1||r.top<R.top-1||r.bottom>R.bottom+1)f.push('desk outside stage');
   const L=kdcRects(st);let ov=0;for(const q of L){const w=Math.min(r.right,q.right)-Math.max(r.left,q.left),h=Math.min(r.bottom,q.bottom)-Math.max(r.top,q.top);if(w>0&&h>0)ov+=w*h}if(ov>0)f.push('desk overlaps '+Math.round(ov)+'px2');
   const desk=[Math.round(r.left-R.left),Math.round(r.top-R.top),Math.round(r.width)];
   bt.click();await sleep(900);const M=document.getElementById('modal');if(M.hidden||!M.querySelector('.kmc')){f.push('calendar did not open');return{f}}
   const tabs=M.querySelectorAll('[data-kmcm]').length;if(tabs!==12)f.push('tabs '+tabs);
   const clip=[];let marked=0;const keys=new Set();
   for(let o=0;o<12;o++){const t=M.querySelector(`[data-kmcm="${o}"]`);t.click();await sleep(120);const c=M.querySelector('.kmc');
    c.querySelectorAll('.kmc-fn,.kmc-n,.kmc-tl span,.kmc-head,.kp,.kmc-lk,.pct').forEach(e=>{if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='auto')clip.push(o+':'+e.textContent.slice(0,16))});
    c.querySelectorAll('.kmc-d.f').forEach(e=>{marked++;keys.add(e.dataset.kmcf)});
    if(c.scrollWidth>c.clientWidth+1)f.push('calendar h-overflow month '+o)}
   if(clip.length)f.push('clipped '+clip.slice(0,6).join('|'));
   const notFest=[...keys].filter(k=>!(k in FEST));if(notFest.length)f.push('not FEST: '+notFest);
   /* back to month 0, tap the first festival square of the year */
   let o1=0;for(let o=0;o<12;o++){M.querySelector(`[data-kmcm="${o}"]`).click();await sleep(80);if(M.querySelector('.kmc-d.f')){o1=o;break}}
   const sq=M.querySelector('.kmc-d.f');sq.click();await sleep(250);const pp=document.getElementById('kpop');
   if(!pp||pp.hidden)f.push('no popover');else{const q=pp.getBoundingClientRect();if(q.left<0||q.right>innerWidth||q.top<0||q.bottom>innerHeight)f.push('popover off screen')}
   const pop=pp?pp.innerText.split('\n').slice(0,3).join(' / '):'';
   const sw=document.documentElement.scrollWidth-innerWidth;if(sw>1)f.push('page h-overflow '+sw);
   const dl=M.querySelector('.dlg').getBoundingClientRect();if(dl.right>innerWidth+1||dl.left<-1)f.push('dialog off screen');
   window.__o1=o1;return{f,desk,tabs,marked,keys:[...keys].sort().join(','),pop,ov:Math.round(ov)}});
  if(OUT){await p.screenshot({path:`${OUT}/mcal-${SZ}-pop.jpg`,type:'jpeg',quality:60})}
  const m2=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));const pp=document.getElementById('kpop');if(pp)pp.hidden=true;
   document.querySelector('#modal [data-kmcm="0"]').click();await sleep(300);const on=document.querySelector('#modal .kmc-row.on .kmc-now');if(!on)f.push('no Tuần này');
   /* Thánh thọ hides after Thái hậu dies */
   S.thDead=1;const has=(()=>{for(let o=0;o<12;o++){const h=kitMonthCal({o});if(/data-kmcf="thanhtho"/.test(h))return true}return false})();if(has)f.push('thanhtho shown after Thái hậu died');S.thDead=0;
   const has2=(()=>{for(let o=0;o<12;o++){if(/data-kmcf="thanhtho"/.test(kitMonthCal({o})))return true}return false})();if(!has2)f.push('thanhtho missing');
   kitModalClose&&kitModalClose();Q.length=0;document.getElementById('modal').hidden=true;
   /* lãnh cung: plain desk calendar */
   cold("thử lịch");Q.length=0;render();await sleep(600);Q.length=0;document.getElementById('modal').hidden=true;const bt=document.getElementById('kmcdesk');
   if(!bt||!/desk-cal-plain/.test(bt.querySelector('img').src))f.push('lãnh cung: no plain desk calendar');
   const cp=S.place;/* away from home: no desk calendar */
   try{restore(true,'thử');}catch(e){}S.place='vuon';Q.length=0;render();await sleep(300);if(document.getElementById('kmcdesk'))f.push('desk calendar away from home');
   return{f,cold:!!bt,cp}});
  if(OUT){await p.screenshot({path:`${OUT}/mcal-${SZ}-cold.jpg`,type:'jpeg',quality:60})}
  const F=[...(m.f||[]),...(m2.f||[])];bad+=F.length;R[SZ]=F.length?F:`ok desk ${JSON.stringify(m.desk)} · ${m.marked} festival squares (${m.keys}) · pop "${m.pop}"`;await ctx.close()}
 console.log(JSON.stringify({bad,R,errs},null,1));await b.close();process.exit(bad||errs.length?1:0)})();
