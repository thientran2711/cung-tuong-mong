/* Dư đồ buổi TRƯA (review/place-seasons): node dev/test/place-seasons.js <baseURL> <W>x<H>@dpr <outdir>
   Game giả lập 4 buổi (BUOI chèn "Buổi trưa" như jtime4). Mỗi mùa × 4 buổi: ảnh .mapimg phải là map-<mùa>-<buổi>.webp và nạp được;
   thêm 1 ngày hội không có tranh trưa (Đoan ngọ có; Thanh minh chỉ có sáng) → buổi trưa lấy tranh hội. Chụp bản đồ Hạ-trưa và Đông-trưa. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+DPR,hasTouch:W<1100,isMobile:W<1100});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[],bad=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().split('/').pop())});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{if(BUOI.length<4)BUOI.splice(1,0,'Buổi trưa');SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50)});
 await p.waitForTimeout(1500);
 const R=[];const SE=[[2,'xuan'],[5,'ha'],[8,'thu'],[11,'dong']],BU=['sang','trua','chieu','toi'];
 for(const [m,se] of SE)for(let bu=0;bu<4;bu++){
  const r=await p.evaluate(([m,bu])=>{S.month=m;S.tuan=2;S.buoi=bu;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;tab='go';render();
   const im=document.querySelector('.mapsc .mapimg');return {src:im?im.getAttribute('src'):'',fest:festToday()?festToday().k:''}},[m,bu]);
  await p.waitForFunction(()=>{const im=document.querySelector(".mapsc .mapimg");return im&&im.complete},null,{timeout:15000}).catch(()=>{});await p.waitForTimeout(200);
  const ok=await p.evaluate(()=>{const im=document.querySelector('.mapsc .mapimg');return im?[im.complete&&im.naturalWidth,im.getAttribute('src')]:[0,'']});
  R.push({se,bu:BU[bu],...r,nat:ok[0],now:ok[1]});
  if(bu===1&&(se==='ha'||se==='dong'))await p.screenshot({path:`${OUT}/map-${se}-trua-${W}x${H}.jpg`,type:'jpeg',quality:80,animations:'disabled'});
 }
 /* ngày hội: Thanh minh (tháng 3 tuần 0) chỉ có tranh sáng → trưa cũng là tranh hội */
 const fe=await p.evaluate(()=>{S.month=3;S.tuan=0;S.buoi=1;tab='go';render();const im=document.querySelector('.mapsc .mapimg');return {f:festToday()&&festToday().k,src:im&&im.getAttribute('src')}});
 const over=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 const wrong=R.filter(x=>x.now!==`img/map-${x.se}-${x.bu}.webp`||!x.nat);
 console.log(JSON.stringify({size:SZ,n:R.length,wrong,BUK:await p.evaluate(()=>BUK.join(',')),fest:fe,overflow:over,errs,bad:[...new Set(bad)]}));
 await b.close()})();
