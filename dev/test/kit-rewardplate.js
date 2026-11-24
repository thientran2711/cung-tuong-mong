/* review/kit-rewardplate: kitReward title / from / «Chạm để mở» sit on the kit title plate (.kdh, kitTitlePlate), never bare text, never clipped.
   usage: node dev/test/kit-rewardplate.js <outdir> [WxH,...]   shots: <outdir>/krp-<dev>.png */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MT={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok',m)};
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);const dev=W<1000?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.route('http://localhost:8812/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('http://localhost:8812/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitReward==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}Q.length=0;m.hidden=true;document.body.classList.remove('kbk-open');tab='act';render()});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#dawn,.kne,#kneov{display:none!important}'});
  for(const kind of ['chest','tray']){await p.evaluate(k=>{Q.length=0;kmReset();document.getElementById('modal').hidden=true;kitReward({kind:k,title:'Ân thưởng',from:'Hoàng thượng ban',items:[{n:'Thoa ngọc',tier:2,gn:'Quý'}],bac:40})},kind);await p.waitForSelector('.kmrew .kdh',{timeout:20000}).catch(()=>{});await p.waitForTimeout(1500);
   const m=await p.evaluate(()=>{const R=document.querySelector('.kmrew');if(!R)return null;const pl=[...R.querySelectorAll('.kdh')].map(e=>({t:e.textContent,fit:(()=>{const a=e.getBoundingClientRect(),c=e.querySelector('b').getBoundingClientRect();return c.left>=a.left-1&&c.right<=a.right+1})(),id:e.hasAttribute('data-kdh'),vis:e.getClientRects().length>0,w:Math.round(e.getBoundingClientRect().width)}));
    const bare=!!R.querySelector('.kmrew-h>b,.kmtap:not(:has(.kdh))');return{pl,bare}});
   ok(!!m,`${dev} ${kind}: reward open`);if(!m)continue;
   ok(m.pl.length===3&&m.pl.every(x=>x.vis&&x.fit&&!x.id),`${dev} ${kind}: title + from + tap hint are 3 kit title plates, visible, not clipped, not tappable ${JSON.stringify(m.pl)}`);
   ok(!m.bare,`${dev} ${kind}: no bare caption text`);
   if(kind==='chest')await p.screenshot({path:path.join(OUT,`krp-${dev}.png`)});await p.evaluate(()=>{kmReset();document.querySelectorAll('.kmov,#kmrew').forEach(e=>e.remove())});await p.waitForTimeout(300)}
  ok(errs.length===0,`${dev} no page errors ${JSON.stringify(errs)}`);await ctx.close()}
 await b.close();console.log(bad?'FAILED '+bad:'ALL PASS');process.exit(bad?1:0)})();
