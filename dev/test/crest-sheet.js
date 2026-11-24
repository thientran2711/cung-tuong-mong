/* crest sheet: every consort rank frame (+ servant, maid) through pcPort at one cell width — checks crest attachment (KIT §36.4).
   usage: node dev/test/crest-sheet.js <url> <W>x<H>@dpr <out.jpg> <cellW> */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,CW]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+DPR,reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 await p.evaluate((cw)=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  try{for(const x of rivals)k61Meet(x,"gặp",3)}catch(e){}
  const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:99999;background:#f3e6cc;display:flex;flex-wrap:wrap;gap:10px;padding:10px;align-content:flex-start;overflow:auto';
  const v=rivals.find(x=>!x.queen)||rivals[0];const q=rivals.find(x=>x.queen);let h='';const cell=(f,l)=>`<div style="width:${cw}px;font:12px sans-serif;text-align:center"><div style="width:${cw}px">${pcPort(f,f.col)}</div>${l}</div>`;
  for(let r=0;r<=7;r++){const o=v.rank;let f;if(r===7&&q)f=pv(q);else{v.rank=r;f=pv(v)}v.rank=o;h+=cell(f,r===7?'Hoàng hậu':RANKS[r].n)}
  for(const s of (S.staff||[]).slice(0,2))h+=cell(pServ(s),s.role);try{h+=cell(pMaid(),'cung nữ thân tín')}catch(e){}try{h+=cell(pEmp(),'Hoàng thượng')}catch(e){}try{h+=cell(pTH(),'Thái hậu')}catch(e){}
  d.innerHTML=h;document.body.appendChild(d)},+CW);
 await p.waitForTimeout(2500);await p.screenshot({path:OUT,type:'jpeg',quality:85});
 console.log(JSON.stringify(errs));await b.close()})();
