/* dresscode shots: node shots.js <index.html> <WxH@dpr> <outdir> */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const [,,HTML,VP,DIR]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});
 await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(180000);
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(async()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  try{kitReward=function(){};window.kitReward=kitReward;kitGain=function(){};window.kitGain=kitGain}catch(e){}S.inv.push({k:'tram_maudon',from:'emp'},{k:'y_haiduong',src:'cap',nvp:1});try{await new Promise(r=>setTimeout(r,800));document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())}catch(e){}Q.length=0;used=0;S.suc=90;try{closeModal()}catch(e){}render()});
 await p.waitForTimeout(2500);
 for(let i=0;i<8;i++){const hit=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>/Vào cung ngay/.test(x.textContent)&&x.offsetParent);if(b){b.click();return 1}return 0});if(!hit)break;await p.waitForTimeout(2000)}
 await p.waitForFunction(()=>!/TRANH NGƯỜI TRONG KIẾP NÀY/i.test(document.body.innerText),null,{timeout:150000}).catch(()=>console.log('loader still up'));
 await p.evaluate(()=>{document.querySelectorAll('.kroul,#kload,#kroul,.kmov.kcf').forEach(e=>e.remove());try{closeModal()}catch(e){}Q.length=0;render()});await p.waitForTimeout(1500);
 for(let i=0;i<8;i++){await p.evaluate(()=>{const b=[...document.querySelectorAll('button,.kbtn')].find(x=>/^(Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)/.test(x.textContent.trim())&&x.offsetParent);if(b)b.click();try{closeModal()}catch(e){}Q.length=0});await p.keyboard.press('Escape');await p.waitForTimeout(1200)}
 await p.evaluate(()=>{try{closeModal()}catch(e){}Q.length=0;render()});
 const shot=async n=>{await p.waitForTimeout(1200);await p.screenshot({path:`${DIR}/${n}-${W}x${H}.png`})};
 /* 1. festival gate */
 await p.evaluate(()=>{S.month=1;S.tuan=0;const w=wdOf(S);w.tram={k:'tramngoc',src:'cap',nvp:1};const v=rivals.find(x=>x.alive&&!x.out&&!x.coop);v.rel=60;v.inv=v.inv||[];v.inv.push({k:'tram_maudon',from:'emp'});
  const f=Object.assign({k:'newyear'},FEST.newyear);Q.length=0;Q.push(dcGateItem(f,dcStat(S,'newyear')));showModal()});
 await shot('1-gate');
 await p.evaluate(()=>{try{closeModal()}catch(e){}Q.length=0});
 /* 2+3. item cards through the real Tư trang tab */
 const openItem=async(name)=>{await p.evaluate(()=>{try{closeModal()}catch(e){}const t=[...document.querySelectorAll('#tabs [data-tab], [data-tab]')].find(x=>/Tư trang/.test(x.textContent));if(t)t.click()});await p.waitForTimeout(1500);
  const ok=await p.evaluate(n=>{const el=[...document.querySelectorAll('[data-kinvi]')].find(x=>(x.getAttribute('title')||x.textContent||'').includes(n));if(el){el.click();return 1}
   const tabs=[...document.querySelectorAll('.kinvtabs [role=tab], .kinvtabs button, .kinvtabs [data-kinvt]')];return 'tabs:'+tabs.map(t=>t.textContent).join('|')},name);return ok};
 await p.evaluate(()=>{try{closeModal()}catch(e){}kitItemCard({k:'tram_maudon'})});console.log('tram');await p.waitForTimeout(1000);console.log(await p.evaluate(()=>{const r=document.querySelector('#modal .kinvrows');return r?JSON.stringify({t:r.innerText.slice(0,300),vis:r.offsetParent!==null,h:r.offsetHeight,par:r.parentElement.className}):'no kinvrows: '+(document.querySelector('#modal')||{}).innerText.slice(0,500)+' || HTML has Màu: '+/Màu/.test(document.querySelector('#modal').innerHTML)+' kb:'+document.querySelectorAll('#modal .kb').length}));await shot('2-tram-card');
 await p.evaluate(()=>{try{closeModal()}catch(e){}});await p.evaluate(()=>{S.month=5});
 await p.evaluate(()=>{try{kitItemCardClose()}catch(e){}kitItemCard({k:'y_haiduong'})});console.log('robe');await shot('3-robe-card');
 await p.evaluate(()=>{try{kitItemCardClose()}catch(e){}try{closeModal()}catch(e){}});
 /* 4. season frame */
 await p.evaluate(()=>{BAL.dc.season.danh[S.rank]=Math.max(1,BAL.dc.season.danh[S.rank]);BAL.dc.season.th[S.rank]=Math.max(1,BAL.dc.season.th[S.rank]);const w=wdOf(S);w.y={k:'y_haiduong',src:'cap',nvp:1};S.dcSw=null;Q.length=0;dcWeek();const i=Q.findIndex(q=>q.evId==='dc:season');if(i>0)Q.unshift(Q.splice(i,1)[0]);showModal()});
 await shot('4-season-frame');
 await p.evaluate(()=>{try{closeModal()}catch(e){}Q.length=0});
 /* 5. calendar popover on Tết */
 await p.evaluate(()=>{S.month=12;kitMonthCalOpen()});await p.waitForTimeout(800);
 await p.evaluate(()=>{const tabs=[...document.querySelectorAll('[data-kmcm],[data-mcm],.kmc-tab,.kmc-mt')];const t=tabs.find(x=>/giêng/i.test(x.textContent));if(t)t.click()});await p.waitForTimeout(700);
 await p.evaluate(()=>{const el=[...document.querySelectorAll('[data-kmcf],[data-mcf],.kmc-f,.kmc-fest,.kmc-li')].find(x=>/Nguyên đán/.test(x.textContent));if(el)el.click();else{const a=document.querySelector('.kmc-modal')||document.body;kpPop(a,mcPopHTML('newyear',1))}});
 await shot('5-cal-pop');
 console.log(JSON.stringify({errs}));await b.close()})();
