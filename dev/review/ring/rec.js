const {chromium}=require('playwright');const fs=require('fs');
(async()=>{
 const b=await chromium.launch();fs.mkdirSync('vid',{recursive:true});
 for(const opt of ['A','B','C'])for(const dev of ['fold','ipad']){
  const [W,H]=dev==='fold'?[755,1000]:[1180,820];
  const t0=Date.now();
  const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,recordVideo:{dir:'vid/tmp',size:{width:W,height:H}}});
  const p=await c.newPage();
  await p.goto(`file:///tmp/claude-0/ring/ring.html?opt=${opt}&dev=${dev}&play=1`);
  await p.waitForFunction('window.__ready');
  await p.waitForFunction('[...document.images].every(i=>i.complete)');await p.waitForTimeout(800);
  const off=(Date.now()-t0)/1000;
  await p.evaluate('window.__play()');await p.waitForFunction('window.__done',null,{timeout:60000});await p.waitForTimeout(600);
  const v=p.video();await c.close();await v.saveAs(`vid/${opt}-${dev}.webm`);
  fs.writeFileSync(`vid/${opt}-${dev}.off`,String(off));
 }
 await b.close()})();
