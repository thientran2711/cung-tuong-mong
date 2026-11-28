/* r3 tool: node dev/test/sangbuoi-save-replay.js http://127.0.0.1:PORT/index.html <dump.json with .ls> <outdir>   env VP — loads a robot save through the title with real taps, plays like a player, logs Q / modal / «Sang buổi». */
/* r3 scratch: the s6d REAL SAVE (button-crawl report: after the dawn «Tiếp theo» the news card is never shown, #next greyed).
   Load its localStorage on the origin, reload, real-tap the title's continue, then play like a player (real taps) and log each step. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,DUMP,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const LS=JSON.parse(fs.readFileSync(DUMP,'utf8')).ls;
(async()=>{const b=await chromium.launch();for(const [W,H] of (process.env.VP||'755x1000,1180x820').split(',').map(v=>v.split('x').map(Number))){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof showTitle==='function',null,{timeout:240000});
  await p.evaluate(ls=>{localStorage.clear();for(const k in ls)localStorage.setItem(k,ls[k])},LS);await p.reload({waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof showTitle==='function'&&window.DQ,null,{timeout:240000});await sleep(3000);
  let got={};const log=[];
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

  const cont=await p.evaluate(()=>{const vis=b=>b.getClientRects().length&&b.offsetParent;const b=[...document.querySelectorAll('[data-load]')].find(vis)||[...document.querySelectorAll('button')].find(b=>vis(b)&&/Tiếp tục|Chơi tiếp/.test(b.textContent));if(b){b.setAttribute('data-tt','1');return b.textContent.trim()}return ''});
  if(!cont){await p.evaluate(()=>{const b=[...document.querySelectorAll('#title button')].find(b=>b.offsetParent&&/Chơi|Ô lưu|Kiếp/.test(b.textContent));b&&b.click()});await sleep(1500)}
  console.log(`${W}x${H} title continue: ${cont}`,await p.evaluate(()=>[...document.querySelectorAll('#title button,[data-load]')].filter(b=>b.offsetParent).map(b=>b.textContent.trim().slice(0,20)).join(' | ')));if(cont){try{await p.tap('[data-tt="1"]',{timeout:5000})}catch(e){await p.evaluate(()=>document.querySelector('[data-tt="1"]').click())}}
  for(let k=0;k<6&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S));k++){const t=await p.evaluate(()=>{const vis=b=>b.getClientRects().length&&b.offsetParent;const b=[...document.querySelectorAll('[data-load]')].find(vis)||[...document.querySelectorAll('button')].filter(vis).find(b=>/Tiếp tục/.test(b.textContent));if(!b)return '';document.querySelectorAll('[data-tt]').forEach(x=>x.removeAttribute('data-tt'));b.setAttribute('data-tt','1');return b.textContent.trim().slice(0,50)});
   console.log(`${W}x${H} title tap: ${t}`);if(t){try{await p.tap('[data-tt="1"]',{timeout:5000})}catch(e){await p.evaluate(()=>document.querySelector('[data-tt="1"]').click())}}await sleep(2500)}
  const S0=()=>p.evaluate(new Function(hid+`const M=document.getElementById('modal'),n=document.getElementById('next'),dw=document.getElementById('dawn');return {Q:Q.length,q0:Q[0]&&Q[0].t,modal:!hid(M),mt:!hid(M)?document.getElementById('mt').textContent.slice(0,40):'',dis:n.disabled,lab:n.textContent.slice(0,40),dawn:!!(dw&&!hid(dw)&&dw.classList.contains('on')),b:S.buoi,stale:DQ.stat.staleNext,woke:DQ.stat.woke||0}`));
  let last='';for(let i=0;i<60;i++){const s=await S0();const k=JSON.stringify(s);if(k!==last){console.log(`${W}x${H} t${i}`,k);last=k}
   if(i===3)await shot('early');
   const did=await tapOne();if(!did){if(!s.dis&&!s.Q&&!s.modal){console.log(`${W}x${H} FREE: «${s.lab}» enabled, Q 0`);break}
    if(!s.dis&&s.Q===0)break;await sleep(1000)}else await sleep(700)}
  const fin=await S0();console.log(`${W}x${H} END`,JSON.stringify(fin),fin.dis&&!fin.modal?'STUCK (disabled, nothing painted)':'ok');await shot('end');
  if(fin.dis&&!fin.modal){const ok=await p.evaluate(()=>{const n=document.getElementById('next'),r=n.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});for(let k=0;k<3;k++){await p.touchscreen.tap(ok[0],ok[1]);await sleep(1500);console.log(`${W}x${H} tap #next ${k+1}`,JSON.stringify(await S0()))}}
  if(errs.length)console.log('page errors',errs.slice(0,3));await ctx.close()}await b.close()})();
