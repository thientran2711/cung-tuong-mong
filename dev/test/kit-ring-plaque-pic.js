/* KK63 KIT §104.2e: faction ring plaques show their act picture. Opens Phe phái › «Lập phe cùng ai · N ›» (and «Mời …», «Gạch tên …», «Hợp mưu …» when present)
   and checks the plaque <img> src is the act picture and loaded (naturalWidth > 0), not the §59 pending box.
   usage: node dev/test/kit-ring-plaque-pic.js <built root> <outdir> [fold,ipadAir] [save.json: e.g. the y05 fixture (git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/fixtures/save-growth/y05-ncBtuc-035.json)]   (exit 1 on a plaque without its picture) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const [,,ROOT,OUT,DEVS,SAVE]=process.argv;const SAVETXT=SAVE?fs.readFileSync(SAVE,'utf8'):'';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();let bad=0;
 for(const dev of (DEVS||"fold,ipadAir").split(",")){const ctx=await D.newDeviceContext(b,dev,{reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);await g.addStyleTag({content:'#kroul,.kroul,[id^=kroul],.klife,#curtain{display:none!important}'});
  await g.evaluate(t=>{document.querySelectorAll('#kload').forEach(e=>e.remove());try{localStorage.clear()}catch(e){}try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   if(t){localStorage.setItem(SK(3),t);const d=loadSlot(3);quiet=true;d.tab='act';deser(d);quiet=false;try{deal()}catch(e){}if(S.mg)S.mg=null;try{S.tutTour=1;coachOff&&coachOff()}catch(e){}}
   else{for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}}Q.length=0;document.getElementById('modal').hidden=true;tab='fac';render()},SAVETXT);
  await p.waitForTimeout(2500);
  const kinds=await g.evaluate(()=>[...document.querySelectorAll('[data-kring-fa]')].map(x=>x.dataset.kringFa));
  for(const k of kinds){await g.evaluate(()=>{try{kitRing.close&&kitRing.close()}catch(e){};Q.length=0;document.getElementById('modal').hidden=true;tab='fac';render()});await p.waitForTimeout(800);
   await g.click(`[data-kring-fa="${k}"]`,{force:true});await p.waitForTimeout(2500);
   const fr=await g.evaluate(()=>{const R=kitRing.cur;const L=R&&R.L;if(!L)return null;const im=[...L.querySelectorAll('img')].filter(i=>i.getClientRects().length).map(i=>i.getBoundingClientRect()).sort((a,b)=>b.width*b.height-a.width*a.height)[0];return im?{x:im.x+im.width/2,y:im.y+im.height*.45}:null});
   if(fr){await p.mouse.click(fr.x,fr.y);await p.waitForTimeout(2000)}
   await g.evaluate(()=>Promise.all([...document.querySelectorAll('.kpk img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));
   const r=await g.evaluate(()=>[...document.querySelectorAll('.kpk .kpk-b, .kpk button')].filter(x=>x.getClientRects().length).map(x=>{const i=x.querySelector('img');return{n:x.textContent.trim().slice(0,30),src:i?i.getAttribute('src').replace(/^.*\/img\//,''):'',w:i?i.naturalWidth:0}}));
   const ok=r.length&&r.every(x=>/^act-/.test(x.src)&&x.w>0);if(!ok)bad++;console.log(ok?'ok  ':'FAIL',dev,k,JSON.stringify(r));await p.screenshot({path:`${OUT}/ring-${k}-${dev}.png`})}
  console.log(dev,'kinds',kinds.join(',')||'none','pageerrors',errs.length);await ctx.close()}
 await b.close();srv.close();console.log(bad?`RING-PLAQUE-PIC FAIL ${bad}`:'RING-PLAQUE-PIC PASS');process.exit(bad?1:0)})();
