const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 const out=process.argv[2]||'shots';require('fs').mkdirSync(out,{recursive:true});
 for(const opt of ['A','B','C'])for(const dev of ['fold','ipad'])for(const state of ['idle','turned','alert','open']){
  const [W,H]=dev==='fold'?[755,1000]:[1180,820];
  const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2});
  const p=await c.newPage();
  await p.goto(`file:///tmp/claude-0/ring/ring.html?opt=${opt}&dev=${dev}&state=${state}`);
  await p.waitForFunction('window.__ready');await p.waitForTimeout(2500);
  await p.screenshot({path:`${out}/${opt}-${dev}-${state}.png`});await c.close();
 }
 await b.close()})();
