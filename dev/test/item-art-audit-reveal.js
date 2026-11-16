/* real big reveal (kitRevealHTML, kit xl size) of given CDN picture paths at iPad 1180x820 @2 and Fold 755x1000 @2.
   usage: node dev/test/item-art-audit-reveal.js http://localhost:8955/ <outdir> name=img/item512/x.webp ... */
const {chromium}=require('playwright');const [,,BASE,OUT,...A]=process.argv;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 for(const [w,h,tag] of [[1180,820,'ipad'],[755,1000,'fold']]){
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,serviceWorkers:'block',ignoreHTTPSErrors:true});const p=await c.newPage();
  await c.route(/\.(mp3)(\?|$)/,r=>r.abort());
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitRevealHTML,null,{timeout:120000});
  await p.evaluate(()=>{document.querySelectorAll('#kload').forEach(e=>e.remove());document.getElementById('title').hidden=true});
  for(const a of A){const [n,path]=a.split('=');
   await p.evaluate(([path,n])=>{let d=document.getElementById('rvtest');if(!d){d=document.createElement('div');d.id='rvtest';d.style.cssText='position:fixed;inset:0;z-index:99999;background:#3a2c22;display:flex;align-items:center;justify-content:center';document.body.appendChild(d)}
    d.innerHTML=`<div style="display:flex;align-items:center;justify-content:center;width:100%">`+kitRevealHTML({k:n,name:n,src:path,src512:path,grade:3,gname:"Tuyệt phẩm",col:"#c9a24a",sub:"mẫu"},{})+`</div>`},[path,n]);
   await p.waitForTimeout(2500);
   const m=await p.evaluate(()=>{const i=document.querySelector('#rvtest .kitb img');return i?{w:i.getBoundingClientRect().width,nw:i.naturalWidth}:null});console.log(tag,n,JSON.stringify(m));
   await p.screenshot({path:`${OUT}/reveal-${n}-${tag}.png`})}
  await c.close()}
 await b.close()})();
