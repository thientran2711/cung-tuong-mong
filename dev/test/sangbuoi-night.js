/* r3 tool (scratch promoted): node dev/test/sangbuoi-night.js http://127.0.0.1:PORT/index.html <outdir>   env VP=755x1000,1180x820 STUCK=1 LIVES=N — real taps to buổi tối; shoots the real flip, «Tin trong cung», after the «Sang ngày mới» tap; STUCK=1 counts a stale-disabled «Sang buổi» with Q 0 (traces the button's disabled writes + Q removals). Shots never go in git. */
/* r3 scratch: REAL night pair. Real taps only on #next / buttons; shoot the real jflip scene (.kmov.kcf), the real «Tin trong cung» card,
   the screen before the «Sang ngày mới» tap and after it. One fresh context per device; each device starts its own life (start()). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VP=(process.env.VP||'755x1000,1180x820').split(',').map(v=>v.split('x').map(Number));
(async()=>{const b=await chromium.launch();const log=[];
 for(const [W,H] of VP){let got={};let nights=0,stuck=0;for(let life=0;life<(+process.env.LIVES||6)&&(process.env.STUCK||!(got.flip&&got.news&&got.after));life++){got={};
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{const d=Object.getOwnPropertyDescriptor(HTMLButtonElement.prototype,'disabled');window.__nxW=[];
    Object.defineProperty(HTMLButtonElement.prototype,'disabled',{configurable:true,get(){return d.get.call(this)},set(v){if(this.id==='next'){try{window.__nxW.push([Math.round(performance.now()),!!v,typeof Q!=='undefined'?Q.length:-1,(new Error().stack||'').split('\n').slice(2,7).map(x=>x.trim().replace(/\(.*?:(\d+):(\d+)\)/,'@$1')).join(' < ')]);if(window.__nxW.length>40)window.__nxW.shift()}catch(e){}}d.set.call(this,v)}});
    const t=setInterval(()=>{if(typeof closeModal!=='function')return;clearInterval(t);window.__cm=[];const w=n=>{const f=window[n];if(typeof f!=='function')return;window[n]=function(){const q0=typeof Q!=='undefined'?Q.length:-1;const r=f.apply(this,arguments);window.__cm.push([Math.round(performance.now()),n,q0,Q.length]);if(window.__cm.length>30)window.__cm.shift();return r}};['closeModal','chooseM','showModal','render'].forEach(w);
     window.__qm=[];const patch=()=>{if(Q.__pt)return;Q.__pt=1;for(const k of ['shift','splice','pop']){const f=Array.prototype[k];Object.defineProperty(Q,k,{configurable:true,writable:true,value:function(){const n0=this.length;const r=f.apply(this,arguments);if(this.length<n0){window.__qm.push([Math.round(performance.now()),k,n0,this.length,(new Error().stack||'').split('\n').slice(2,9).map(x=>x.trim().replace(/^at /,'').replace(/\(?https?:.*?:(\d+):(\d+)\)?/,'@$1:$2')).join(' < ')]);if(window.__qm.length>40)window.__qm.shift()}return r}})}};
     setInterval(()=>{try{patch()}catch(e){}},50)},200)});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.DQ,null,{timeout:240000});await sleep(2500);
  const hid=`const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);`;
  const st=()=>p.evaluate(new Function(hid+`const M=document.getElementById('modal');return {buoi:S.buoi,day:S.turn,mt:!hid(M)?document.getElementById('mt').textContent:'',flip:!!document.querySelector('.kmov.kcf:not(.km-out)'),next:(document.getElementById('next')||{}).textContent,dis:document.getElementById('next').disabled,nf:typeof nfOn==='function'&&nfOn()}`));
  const shot=async n=>{const f=`${OUT}/${W}x${H}-${n}.png`;await p.screenshot({path:f});got[n]=f;log.push(`${W}x${H} ${n} ${JSON.stringify(await st())}`);console.log(log[log.length-1])};
  /* one real tap on whatever is on screen; returns '' when nothing to tap */
  const tapOne=async()=>{const sel=await p.evaluate(new Function(hid+`const mark=e=>{document.querySelectorAll('[data-tt]').forEach(x=>x.removeAttribute('data-tt'));e.setAttribute('data-tt','1');return '[data-tt="1"]'};
    const dw=document.getElementById('dawn');if(dw&&!hid(dw)&&dw.classList.contains('on')){const bt=[...dw.querySelectorAll('button')].find(b=>b.offsetParent);if(bt)return mark(bt)}
    const vc=[...document.querySelectorAll('button')].find(b=>/Vào cung ngay/.test(b.textContent)&&b.offsetParent);if(vc)return mark(vc);
    const ov=document.getElementById('ov');if(ov&&!hid(ov)){const bs=[...ov.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.disabled);const b=bs.find(b=>/Bỏ qua/.test(b.textContent))||bs.find(b=>/Nhận|Tiếp|Xong|Đóng|Rời|Về|Thôi/.test(b.textContent))||bs[0];if(b)return mark(b)}
    if(window.DF&&DF.F){const f=document.querySelector('.kfoc');if(f){const bs=[...f.querySelectorAll('button,[role=button]')].filter(b=>b.getClientRects().length&&!b.disabled);const b=bs.find(b=>/^Thôi/.test(b.textContent.trim()))||bs.find(b=>!b.classList.contains('kfoc-x'))||f.querySelector('.kfoc-x');if(b)return mark(b);return mark(f)}}
    const kx=document.getElementById('kxcatch');if(kx&&!hid(kx)&&kx.getClientRects().length)return mark(kx);
    const kc=[...document.querySelectorAll('.kmov:not(.km-out) button,#kpodov button,#kmrew button,[id^=kroul] button')].find(b=>b.getClientRects().length&&!b.disabled);if(kc)return mark(kc);
    const ko=document.querySelector('.kmov:not(.km-out)');if(ko&&ko.getClientRects().length)return mark(ko);
    const M=document.getElementById('modal');if(M&&!hid(M)){const o=[...M.querySelectorAll('.opt:not([disabled])')];const th=o.find(b=>/^Thôi|Để sau|Không/.test(b.textContent.trim()));if(th)return mark(th);if(o.length)return mark(o[0]);
     const c=M.querySelector('#mclose')||[...M.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(c)return mark(c)}return ''`));
   if(!sel)return false;try{await p.tap(sel,{timeout:3000,force:true})}catch(e){await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},sel)}return true};
  /* drain like a player, shooting the night moments when they show */
  const drain=async(night)=>{let idle=0;for(let i=0;i<160&&idle<4;i++){const s=await st();
     if(night&&s.flip&&!got.flip){await sleep(1400);await shot('flip')}
     if(night&&/^Tin trong cung/.test(s.mt)&&!got.news){await sleep(500);await shot('news')}
     if(await tapOne()){idle=0;await sleep(450)}else{idle++;await sleep(600)}}};
  try{
   await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
   /* r2 timed out here on the 2nd device: wait for the title to go AND the new-life card; call start() again once if it does not come */
   let ok=await p.waitForFunction(()=>document.querySelector('#modal:not([hidden]) [data-nl=ok]'),null,{timeout:30000}).then(()=>1,()=>0);
   if(!ok){await p.evaluate(()=>{document.getElementById('title').hidden=true;start()});ok=await p.waitForFunction(()=>document.querySelector('#modal:not([hidden]) [data-nl=ok]'),null,{timeout:60000}).then(()=>1,()=>0)}
   if(!ok)throw new Error('no new-life card');
   await sleep(900);try{await p.tap('#modal [data-nl=ok]',{timeout:6000})}catch(e){console.log(`${W}x${H} new-life ok not tappable: `+JSON.stringify(await p.evaluate(()=>{const b=document.querySelector('#modal [data-nl=ok]');const r=b.getBoundingClientRect();const e=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {r:[r.x,r.y,r.width,r.height].map(Math.round),top:e&&(e.id||String(e.className).slice(0,40))}})));await p.evaluate(()=>document.querySelector('#modal [data-nl=ok]').click())}await sleep(900);await drain(false);
   if(!(await p.evaluate(()=>typeof nfOn==='function'&&nfOn()))){console.log(`${W}x${H} life ${life}: nfOn false, new life`);await ctx.close();continue}
   /* real «Sang buổi» taps until buổi tối (2), then into the night */
   for(let i=0;i<10&&!/Sang ngày mới/.test((await st()).next);i++){await p.tap('#next',{force:true});await sleep(700);await drain(true)}
   await drain(true);
   if(!/Sang ngày mới/.test((await st()).next)){console.log(`${W}x${H} not at night`,JSON.stringify(await st()));await ctx.close();continue}
   if(!got.flip||!got.news){console.log(`${W}x${H} life ${life}: night without ${!got.flip?'flip ':''}${!got.news?'news':''}`)}
   nights++;await shot('before');const d0=(await st()).day;
   await p.tap('#next',{force:true});await sleep(1200);await drain(true);await sleep(800);await shot('after');
   {let s=await st();if(s.dis){const D=()=>p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);const n=document.getElementById('next');const dw=document.getElementById('dawn');
     return {Q:Q.map(m=>m.t),modal:!hid(document.getElementById('modal')),used,khac:BAL.time.khac,advLock,want:window.DQ&&DQ.want,dawn:!!(dw&&!hid(dw)&&dw.classList.contains('on')),ov:!hid(document.getElementById('ov')),KMQ:typeof KMQ!=='undefined'&&KMQ.length,kmBusy:typeof kmBusy!=='undefined'&&kmBusy,
      kmov:[...document.querySelectorAll('.kmov,#kmrew,#kpodov,[id^=kroul],.kfoc')].map(e=>e.id||String(e.className).slice(0,30)),df:!!(window.DF&&DF.F),nfX:S.nfX&&S.nfX.st,mg:!!S.mg,title:n.title,cls:n.className}});
     console.log(`${W}x${H} AFTER DISABLED`,JSON.stringify(await D()));if(!(await p.evaluate(()=>Q.length||!!document.querySelector('.kfoc,.kmov:not(.km-out)')))){stuck++;console.log(`${W}x${H} STUCK-EMPTY writes`,JSON.stringify(await p.evaluate(()=>({cm:window.__cm.slice(-6),qm:window.__qm.slice(-8),now:Math.round(performance.now())}))))}let t=0;for(;t<20&&s.dis;t++){await sleep(1000);s=await st()}
     console.log(`${W}x${H} enabled after ${t}s by itself: ${!s.dis}`,s.dis?JSON.stringify(await D()):'');await shot('after-dis')}}
   console.log(`${W}x${H} staleNext`,await p.evaluate(()=>window.DQ&&DQ.stat.staleNext));const s=await st();log.push(`${W}x${H} after tap: day ${d0}->${s.day} buoi ${s.buoi}`);console.log(log[log.length-1]);
  }catch(e){console.log(`${W}x${H} life ${life} threw ${e.message.slice(0,200)}`)}
  if(errs.length)console.log('page errors',errs.slice(0,3));await ctx.close()}
  console.log(`${W}x${H} GOT`,JSON.stringify(got),`NIGHTS ${nights} STUCK-EMPTY ${stuck}`,process.env.STUCK?"":"")}
 await b.close()})();
