/* review/kit-win-pay (K-WIN-PAY, KIT_REQUESTS 21/11 econ-tamco F1): on the §6.2b option card (Tốn + Được only) a ROLLED option whose price is paid only when it
   works («thành: Danh +2, Bạc -30») shows that red item as «Bạc -30 khi thành» in the Được slot; a sure option (no roll) and green items carry no tag; Fold 755x1000 + iPad 1180x820.
   usage: node dev/test/kit-win-pay.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(240000);
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:240000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{start()}catch(e){}Q.length=0;
   Q.push({t:"Việc nhỏ",h:"<p>Nên làm thế nào?</p>",opts:[{n:"Đút lót thái giám",fx:{},x:"Khá chắc · thành: Danh +2, Bạc -30 · hỏng: không mất bạc",go:()=>{}},{n:"Nhờ người quen",fx:{bac:-10},x:"thành: Danh +1",go:()=>{}}]});showModal()});
  await p.addStyleTag({content:'#kload,#klife,.modal.kload,.kroul,#kroulw,#curtain,#buoitr,.kmov{display:none!important}'});await p.waitForTimeout(2000);
  const r=await p.evaluate(()=>{const B=[...document.querySelectorAll('#modal .opts > button.ka')];return B.map(b=>{const g=[...b.querySelectorAll('.kr')].find(r=>!r.classList.contains('kofold')&&/Được/.test((r.querySelector('.krl')||{}).textContent||''));
    const items=g?[...g.querySelectorAll('.krv>.ef')].map(e=>e.textContent+getComputedStyle(e,'::after').content):[];return {n:(b.querySelector('.kan')||b).textContent.slice(0,24),win:!!(g&&g.classList.contains('kwinrow')),items}})});
  const a=r.find(x=>/Đút lót/.test(x.n)),c=r.find(x=>/Nhờ người/.test(x.n));const e=[];
  if(!a||!a.win||!a.items.some(t=>/Bạc -30" khi thành"/.test(t)))e.push('rolled win-price not tagged '+JSON.stringify(a));
  if(a&&a.items.some(t=>/Danh \+2" khi thành"/.test(t)))e.push('green item tagged');
  if(!c||c.win||c.items.some(t=>/khi thành/.test(t)))e.push('sure option tagged '+JSON.stringify(c));
  await p.screenshot({path:`${OUT}/${W}x${H}-winpay.jpg`,type:'jpeg',quality:70});if(e.length)bad++;console.log(`${W}x${H}`,e.length?'FAIL '+e.join('; '):'PASS',JSON.stringify(r));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
