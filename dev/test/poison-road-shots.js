/* D8 poison road shots (built root, HOST mode): the "Bỏ độc vào…" picker with the two royal rows (one open, one closed with its reason),
   the result card after a failed untraced try, and the two new endings (Vương gia đăng cơ · Ban chết + house).
   usage: node dev/test/poison-road-shots.js <outdir> [fold,ipadAir]   — shots go OUTSIDE the repo (owner: no images in git) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const OUT=process.argv[2]||'/tmp/pr-shots';const DEV=(process.argv[3]||'fold,ipadAir').split(',');fs.mkdirSync(OUT,{recursive:true});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const errs=[];
 for(const dv of DEV){const ctx=await D.newDeviceContext(b,dv,{deviceScaleFactor:2});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(dv+': '+e.message.slice(0,160)));
  const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof pqGive==='function',null,{timeout:120000});await p.waitForTimeout(6000);
  const dismiss=async()=>{for(let i=0;i<4;i++){const n=await g.evaluate(()=>{let c=0;for(const b of document.querySelectorAll('button'))if(b.offsetParent&&/^(Nhận|Đã hiểu)$/.test(b.textContent.trim())&&!b.closest('#modal')){b.click();c++}return c});if(!n)break;await p.waitForTimeout(700)}};
  const prep=async(js,js2)=>{await g.evaluate(js);await p.waitForTimeout(1500);await dismiss();if(js2){await g.evaluate(js2);await p.waitForTimeout(1200)}};
  const life=`try{KLIFE.off=true}catch(e){}try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;try{kitRoulette=function(){}}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.emp&&!isSrv()&&!(S.origin&&S.origin.k==='cnv')&&!(window.isKc&&isKc()))break}Q.length=0;document.getElementById('modal').hidden=true;
   ['kroul','kroulw','dawn','kload','klife'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kbd-roulette').forEach(e=>e.remove());S.tho=999;S.emp.tho=999;S.suc=90;S.sung=5;S.an=0;thArch();S.thO.arch="tuai";
   S.inv.push({k:"hacdinh"});S.inv.push({k:"yensao"});window.__ix=S.inv.findIndex(e=>e.k==="yensao");render();`;
  await prep(life,`Q.length=0;pushDil(mkP("pgpick",{ix:__ix}),"Bỏ độc vào quà");showModal();`);
  await p.screenshot({path:`${OUT}/${dv}-1-picker.png`});
  /* scroll the dialog to the royal rows */
  await g.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('*')].filter(x=>/dâng (Hoàng thượng|Thái hậu)/.test(x.textContent||'')&&x.getBoundingClientRect().height>60&&x.getBoundingClientRect().height<400);const el=rows[rows.length-1]||null;
   for(const x of M.querySelectorAll('*')){if(x.scrollHeight>x.clientHeight+20&&/auto|scroll/.test(getComputedStyle(x).overflowY))x.scrollTop=x.scrollHeight}if(el)el.scrollIntoView({block:'end'})});await p.waitForTimeout(800);
  await p.screenshot({path:`${OUT}/${dv}-2-royal-rows.png`});
  await prep(life,`BAL.odds.lo=0;BAL.odds.hi=100;BAL.pq.max=0;BAL.pq.caught.lo=BAL.pq.caught.hi=0;Q.length=0;const r=pqGive(S,"emp",__ix,"hacdinh");Q.push({t:"Dâng món lên Hoàng thượng",who:pEmp(),h:"<p>"+r+"</p>"});showModal();render();`);
  await p.screenshot({path:`${OUT}/${dv}-3-fail-untraced.png`});
  await prep(life,`BAL.odds.lo=0;BAL.odds.hi=100;BAL.pq.max=100;BAL.pq.inq.lo=BAL.pq.inq.hi=0;BAL.pq.vg.lo=BAL.pq.vg.hi=100;S.sung=60;S.an=40;menInit();const m=S.men.find(x=>x.role==="Vương gia");m.alive=true;m.tinh=80;S.vgAlly=m.id;S.heir=null;
   pqGive(S,"emp",__ix,"hacdinh");Q.length=0;emperorDies("");`);await p.waitForTimeout(5000);await g.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(b.offsetParent&&/Tiếp theo/.test(b.textContent))b.click()});await p.waitForTimeout(2500);
  await p.screenshot({path:`${OUT}/${dv}-4-end-vg-throne.png`});
  await prep(life,`BAL.odds.lo=0;BAL.odds.hi=100;BAL.pq.max=0;BAL.pq.caught.lo=BAL.pq.caught.hi=100;Q.length=0;pqGive(S,"emp",__ix,"hacdinh");`);await p.waitForTimeout(5000);await g.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(b.offsetParent&&/Tiếp theo/.test(b.textContent))b.click()});await p.waitForTimeout(2500);
  await p.screenshot({path:`${OUT}/${dv}-5-end-ban-chet.png`});
  await ctx.close()}
 await b.close();srv.close();console.log('shots in',OUT,'errors',JSON.stringify(errs))})();
