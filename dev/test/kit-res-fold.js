/* kit-res-fold.js (KK44, KIT §7.4a): a result card row with 15 people's thiện cảm items shows the 4 biggest by name + ONE «+11 người khác: thiện cảm ±»
   item; tap opens all 15 (nothing removed); the card fits the Fold without scroll. usage: node dev/test/kit-res-fold.js <index.html> [WxH,...]  exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;
   const b0=snapReal();S.duc+=2;resultShow('Yến tiệc trong cung',b0,null);await new Promise(r=>setTimeout(r,400));const t=document.getElementById('rtoast');if(!t)return {err:'no toast'};
   const names=['Lệ phi','Hiền phi','Đức phi','Thục phi','Trang tần','Lan tần','Mai quý nhân','Cúc quý nhân','Trúc thường tại','Đào thường tại','Liễu đáp ứng','Hạnh đáp ứng','Quế tài nhân','Sen tài nhân','Huệ canh y'];
   const kb=t.querySelector('.kb')||t;kb.insertAdjacentHTML('beforeend',`<span class="kr kr-duoc" data-tfold="1"><span class="krl">Người ấy</span><span class="krv">${names.map((n,i)=>`<span class="kitem"><span class="ef t">${n}:</span> <span class="ef g">thiện cảm ${i%3?'+':'−'}${i+1}</span></span>`).join('')}</span></span>`);
   const h0=t.getBoundingClientRect().height;kitResFold(t);const vis=()=>[...t.querySelectorAll('[data-tfold] .kitem')].filter(e=>!e.hidden&&e.getClientRects().length).map(e=>e.textContent.trim());const v1=vis();const h1=t.getBoundingClientRect().height;const R=t.getBoundingClientRect();
   const mo=t.querySelector('.kresmore');if(mo)mo.click();const v2=vis();return {h0:Math.round(h0),h1:Math.round(h1),fit:R.top>=0&&R.bottom<=innerHeight,shown:v1.length,more:v1[v1.length-1],first:v1.slice(0,4),afterTap:v2.length}});
  chk(`${wh} 15 people → 4 biggest by name + «+11 người khác: thiện cảm ±»`,r.shown===5&&/\+11 người khác: thiện cảm ±/.test(r.more||'')&&r.first.some(x=>/Huệ canh y/.test(x)),r);
  chk(`${wh} card fits the screen, shorter than unfolded (${r.h0} → ${r.h1} px)`,r.fit&&r.h1<r.h0,r);chk(`${wh} tap opens all 15, nothing removed`,r.afterTap===15,r);
  chk(`${wh} no page errors`,!errs.length,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'KIT-RES-FOLD FAIL '+fails:'KIT-RES-FOLD PASS');process.exit(fails?1:0)})();
