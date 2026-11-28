/* review/ev-art-fit: screenshots of the owner's cases at the three test sizes — VIỆC "Lời cảnh báo" (maid warns; was the gift box),
   VIỆC "Có người đến" (mocking visit; was the gift box) and BÁO "Hảo hữu vào cung" (co-op notice; had no picture). One fresh page per case.
   usage: [EVJSON=1] node dev/test/ev-art-fit-shots.js <build url> <outdir>   (EVJSON=1: img/EVENTS.json and img/ev-*.webp served from disk) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const LOC=f=>{const p=path.join('img',f);return fs.existsSync(p)?fs.readFileSync(p):null};
const CASES=[["warn",()=>{const v=liveRivals(true)[0];Q.push({ev:1,t:"Lời cảnh báo",who:pMaid(),h:`<p>${S.maid.name} khẽ thưa: “Dạo này người các cung nhìn tiểu chủ không thiện ý. Nô tỳ nghe bên ${v.name} hỏi giờ giấc cung ta.”</p>`,opts:[{n:"Đóng cửa giữ mình",fx:{sung:-2}},{n:"Ghi nhớ, cứ như thường",fx:{}}]})}],
 ["mock",()=>{const v=liveRivals(true)[0];Q.push({ev:1,t:"Có người đến",who:pv(v),h:`<p>${v.name} đến tận cửa cung, buông lời mỉa mai ngươi trước mặt cung nhân.</p>`,opts:[{n:"Nhịn",fx:{duc:2}},{n:"Đáp trả sắc sảo",fx:{danh:1}}]})}],
 ["coop",()=>{Q.push({t:"Hảo hữu vào cung",h:`<p>Hảo hữu ngươi đã chọn xong thân phận, nay ở trong cung, phong Quý nhân. Mặt mũi, tên tuổi kiếp này ra sao, phải gặp mới biết.</p>`})}]];
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const res=[];
 for(const [W,H] of [[755,1000],[1180,820],[844,390]])for(const [k,f] of CASES){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});
  await ctx.route(/img\/(EVENTS\.json|ev-[a-z0-9-]+\.webp)/,r=>{const fn=r.request().url().split('/').pop().split('?')[0];const d=process.env.EVJSON?LOC(fn):null;return d?r.fulfill({status:200,contentType:fn.endsWith('json')?'application/json':'image/webp',body:d}):r.continue()});
  await ctx.addInitScript(()=>{window.__bot={pre:1}});const p=await ctx.newPage();await p.goto(URL,{waitUntil:'domcontentloaded'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof EVART!=='undefined'&&EVART&&typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE,null,{timeout:90000});
  await p.evaluate(()=>{SLOT=3;kitRoulette=function(){};document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(3000);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());render()});
  await p.evaluate(f);await p.evaluate(()=>{window.__evFitWhy="";showModal()});await p.waitForTimeout(1500);
  const info=await p.evaluate(()=>{const M=document.getElementById('modal');const im=M.querySelector('#mb .kdlgart img, #mb .kpsubj .ksart img');const fr=M.querySelector('#mb .kdlgart .ksart, #mb .kpsubj .ksart');
   const r=im&&im.getBoundingClientRect();return{title:document.getElementById('mt').textContent,src:im?im.getAttribute('src').split('/').pop():"",cap:fr?(fr.querySelector('figcaption,.ksart-chip')||{}).textContent||"":"",why:window.__evFitWhy,loaded:!!(im&&im.complete&&im.naturalWidth>1),w:r?Math.round(r.width):0,h:r?Math.round(r.height):0,
    hscroll:document.documentElement.scrollWidth>innerWidth}});
  res.push(Object.assign({vp:W+"x"+H,k},info));await p.screenshot({path:path.join(OUT,`${k}-${W}x${H}.jpg`),type:'jpeg',quality:60});await ctx.close()}
 console.log(JSON.stringify(res,null,0).replace(/\},\{/g,"},\n{"));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
