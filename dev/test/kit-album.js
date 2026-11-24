/* review/kit-album (KIT §100 kitAlbum; KK21): Fold 755x1000 + iPad 1180x820. 12 cards (owned / veiled missing, long names) in a dialog-width host: every card the SAME size, 3:4 art, no clipped name / line,
   a missing card shows the veil + the name + when it opens (never blank), grid fits the width (no horizontal overflow), tabs switch cards (kit .ksub), tap calls onTap(k), no page errors.
   usage: node dev/test/kit-album.js file:///…/index.html <outdir> [WxH,...] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DSF||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(200000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.kitAlbum&&window.__ctmBuilt,null,{timeout:200000});await p.waitForTimeout(1500);
  await p.addStyleTag({content:'#kload,#klife,#kroulw,.kroul,#curtain,#title{display:none!important}'});
  const f=[];
  const r=await p.evaluate(async W=>{const names=['Ngày nhập cung','Lễ sắc phong','Đêm Trung thu ngắm trăng ở vườn thượng uyển','Tiết Thanh minh','Buổi thi tài nghệ','Gặp Hoàng thượng lần đầu','Quà của Thục phi tặng nàng','Mùa tuyết đầu tiên','Hoa sen nở','Khi sinh con','Ngày đại hôn','Lễ tế Giao'];
   window.__tap=null;const cards=names.map((n,i)=>({k:i+1,name:n,sub:'Năm thứ '+(1+i%3),owned:i%3!==1,opens:['Khi được thăng phong','Thu · Ngự hoa viên','Xuân · Ngự hoa viên'][i%3],art:'',tab:i<8?'a':'b'}));
   const host=document.createElement('div');host.style.cssText='position:fixed;left:8px;top:8px;width:'+Math.min(W-16,W>=1000?860:560)+'px;max-height:'+(innerHeight-16)+'px;overflow:auto;background:#fffaf0;padding:10px;z-index:99999;border:1px solid #b8892b';
   host.innerHTML=kitAlbum({id:'t',tabs:[{k:'a',n:'Của ta'},{k:'b',n:'Người khác tặng'}],cards,onTap:(k)=>{window.__tap=k},note:'Chạm một thẻ'});document.body.appendChild(host);await new Promise(r=>setTimeout(r,500));
   const R=e=>e.getBoundingClientRect(),cs=[...host.querySelectorAll('.kalb-c')];const sz=new Set(cs.map(c=>Math.round(R(c).width)+'x'+Math.round(R(c).height)));
   const art=cs.map(c=>{const a=c.querySelector('.kalb-art');return Math.abs(R(a).width/R(a).height-.75)}).filter(x=>x>.02).length;
   const clip=cs.filter(c=>[...c.querySelectorAll('b,small')].some(e=>e.scrollHeight>e.clientHeight+1||e.scrollWidth>e.clientWidth+1)).length;
   const miss=cs.filter(c=>c.classList.contains('miss'));const missBad=miss.filter(c=>/\?/.test(c.textContent)||!c.querySelector('.kalb-seal')||!c.querySelector('.kalb-veil')||!c.querySelector('b').textContent.trim()||!c.querySelector('small')||!c.querySelector('small').textContent.trim()).length;
   const ov=host.scrollWidth>host.clientWidth+1;const n1=cs.length;
   host.querySelector('[data-albt=b]').click();await new Promise(r=>setTimeout(r,100));const n2=host.querySelectorAll('.kalb-c').length,on=host.querySelector('.ksubb.on').dataset.albt;
   host.querySelector('.kalb-c').click();const tap=window.__tap;
   const out={n1,n2,on,tap,sizes:[...sz],art,clip,miss:miss.length,missBad,ov,cols:0};window.__host=host;return out},W);
  console.log(wh,JSON.stringify(r));
  if(r.n1!==8||r.n2!==4||r.on!=='b')f.push('tabs '+JSON.stringify([r.n1,r.n2,r.on]));if(r.sizes.length!==1)f.push('card sizes '+r.sizes);if(r.art)f.push('art not 3:4 '+r.art);if(r.clip)f.push('clipped text '+r.clip);if(!r.miss||r.missBad)f.push('missing cards '+r.miss+' bad '+r.missBad);if(r.ov)f.push('horizontal overflow');if(r.tap==null)f.push('tap did not call onTap');
  await p.evaluate(()=>{window.__host.querySelector('[data-albt=a]').click()});await p.waitForTimeout(200);await p.screenshot({path:`${OUT}/${wh}-album.jpg`,type:'jpeg',quality:80});
  if(errs.length)f.push('page errors '+errs.join(' | '));console.log(wh,f.length?'FAIL\n  '+f.join('\n  '):'ALL PASS');if(f.length)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
