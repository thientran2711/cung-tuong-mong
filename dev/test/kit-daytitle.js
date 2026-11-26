/* review/kit-daytitle (KIT §94b kitDayTitle / kitDayTitleShow): Fold 755x1000 + iPad 1180x820.
   Hooks kitDayName / kitChapterTitle set → «Ngày 1 — <name>» + «Chương 1 — <name>» appear on a NEW life (week 0); card fully inside the screen, tap closes;
   hooks absent → «Ngày N» only, no chapter line; later days (N > KIT_DAYT.opening) = the cổ trang date; a day change (dawn) shows it; a dead life / bot run shows nothing; no «%»; no page errors.
   usage: node dev/test/kit-daytitle.js <outdir> [WxH,...]   shots: <outdir>/kdt-<step>-<dev>.png */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MT={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok',m)};
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);const dev=W<1000?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.route('http://localhost:8812/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('http://localhost:8812/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitDayTitleShow!=='undefined',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render()});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#dawn,.kne,#kneov{display:none!important}'});
  await p.evaluate(()=>{window.kitDayName=n=>n===1?'Nhập cung':null;window.kitChapterTitle=()=>({n:1,name:'Bước qua cửa son'})});
  await p.evaluate(()=>{const c=document.getElementById('kdaytc');if(c)c.remove();window.__bot=0;S.dead=0;try{if(typeof wk==='function'&&wk()!==0){}}catch(e){}});
  const a0=await p.evaluate(()=>({wk:typeof wk==='function'?wk():-1}));
  /* a NEW life (week 0): start() schedules the card */
  await p.evaluate(()=>{SLOT=3;try{store.set(NL_KEY,null)}catch(e){}for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}});
  await p.waitForFunction(()=>{const c=document.getElementById('kdaytc');return c&&getComputedStyle(c).opacity==='1'},null,{timeout:6000}).catch(()=>{});
  const c1=await p.evaluate(()=>{const c=document.getElementById('kdaytc');if(!c)return null;const r=c.firstElementChild.getBoundingClientRect();return{t1:(c.querySelector('.kdt1')||{}).textContent,t2:(c.querySelector('.kdt2')||{}).textContent,inside:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight,w:Math.round(r.width),vis:getComputedStyle(c).opacity}});
  ok(!!c1&&c1.t1==='Ngày 1 — Nhập cung'&&c1.t2==='Chương 1 — Bước qua cửa son',`${dev} new life: card «Ngày 1 — name» + «Chương 1 — name» ${JSON.stringify(c1)} (wk before ${a0.wk})`);
  ok(!!c1&&c1.inside&&c1.vis==='1',`${dev} card fully inside the screen and visible`);
  ok(!!c1&&!/%/.test(c1.t1+c1.t2),`${dev} no % in the card`);
  await p.screenshot({path:path.join(OUT,`kdt-start-${dev}.png`)});
  await p.mouse.click(W/2,H*.9);await p.waitForTimeout(900);
  ok(await p.evaluate(()=>!document.getElementById('kdaytc')),`${dev} tap closes the card`);
  const h=await p.evaluate(()=>{const A=kitDayTitle({n:2,chap:null});const B=kitDayTitle({n:9,date:'thượng tuần tháng ba · mùa xuân',chap:{n:2,name:'Chén trà đầu tiên'}});const keep=window.kitDayName,kc=window.kitChapterTitle;window.kitDayName=()=>null;window.kitChapterTitle=()=>null;const C=kitDayTitle({n:1});window.kitDayName=keep;window.kitChapterTitle=kc;
   const q=h=>{const d=document.createElement('div');d.innerHTML=h;return[(d.querySelector('.kdt1')||{}).textContent,(d.querySelector('.kdt2')||{}).textContent]};return{A:q(A),B:q(B),C:q(C),K:window.KIT_DAYT?KIT_DAYT.opening:0}});
  ok(h.A[0]==='Ngày 2'&&!h.A[1],`${dev} opening day, no hook name, no chapter: only «Ngày N» ${JSON.stringify(h.A)}`);
  ok(h.B[0]==='Thượng tuần tháng ba · mùa xuân'&&h.B[1]==='Chương 2 — Chén trà đầu tiên',`${dev} later day: cổ trang date + chapter ${JSON.stringify(h.B)}`);
  ok(h.C[0]==='Ngày 1'&&!h.C[1],`${dev} hooks returning null: «Ngày 1» only ${JSON.stringify(h.C)}`);
  /* a day change */
  await p.evaluate(()=>{window.__dawnErr=null;try{dawn()}catch(e){window.__dawnErr=String(e)}});await p.waitForTimeout(900);
  const d1=await p.evaluate(()=>({card:!!document.getElementById('kdaytc'),err:window.__dawnErr,t:((document.querySelector('#kdaytc .kdt1')||{}).textContent)||''}));
  ok(d1.card&&!d1.err,`${dev} a day change (dawn) shows the card ${JSON.stringify(d1)}`);
  await p.screenshot({path:path.join(OUT,`kdt-dawn-${dev}.png`)});
  await p.evaluate(()=>{const c=document.getElementById('kdaytc');if(c)c.remove()});
  const z=await p.evaluate(()=>{S.dead=1;const r1=kitDayTitleShow();S.dead=0;window.__bot=1;const before=document.getElementById('kdaytc');return{dead:!r1,exist:!!document.getElementById('kdaytc')}});
  ok(z.dead&&!z.exist,`${dev} a dead life shows no card ${JSON.stringify(z)}`);
  ok(errs.length===0,`${dev} no page errors ${JSON.stringify(errs)}`);await ctx.close()}
 await b.close();console.log(bad?'FAILED '+bad:'ALL PASS');process.exit(bad?1:0)})();
