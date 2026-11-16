/* j90 kit podium: Playwright check at one viewport.
   usage: node dev/test/podium.js <baseURL of built page> <W>x<H>@dpr <outdir> [oldURL]
   Scenes: j82 contest she wins (1 intro, 2 confetti, 3 final, 4 screen 2 = score board), contest she is 4th + a stranger on the dais,
   Tranh ghế result (Q item), hoàng tự exam (.ktlist rows), old save from the main build loads. */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const tag=SZ.replace('@','_');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 /* review/kit-keeper-2: the new-life roulette (#kroul / #kroulw, KIT 14) and the prize chest (#kmrew) cover the page after start() and used to eat the first tap — skip it and keep it hidden */
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click());document.querySelectorAll(".kroul,#kmrew,#kprevov").forEach(e=>e.remove());const kl=document.getElementById("kload");if(kl)kl.remove()},250)});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
 const checks=[];
 const check=async(name)=>p.evaluate((name)=>{const r=document.querySelector('.kpod');if(!r)return{name,missing:true};const vw=innerWidth,vh=innerHeight;
  const bad=[];const ft=r.querySelector('.kpod-ft').getBoundingClientRect();
  r.querySelectorAll('.kpod-plq,.kpod-plq *,.kpod-hd .kptitle,.kpod-medal b,.kpod-next,.kpod-mine').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;
   if(q.left<-1||q.right>vw+1||q.top<-1||q.bottom>vh+1)bad.push('out:'+e.className+':'+e.textContent.slice(0,20));
   if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')bad.push('clip:'+e.className)});
  r.querySelectorAll('.kpod-step').forEach(s=>{const q=s.getBoundingClientRect();if(q.bottom>ft.top+2)bad.push('step under footer '+Math.round(q.bottom-ft.top))});
  const steps=[...r.querySelectorAll('.kpod-col')].map(c=>({c:c.className.match(/kpod-p\d/)[0],top:Math.round(c.querySelector('.kpod-step').getBoundingClientRect().top),fig:Math.round(c.querySelector('.kpod-fig').getBoundingClientRect().height)}));
  const p1=steps.find(s=>s.c==='kpod-p1');const order=steps.every(s=>s.c==='kpod-p1'||s.top>p1.top);
  const figs=[...r.querySelectorAll('.kpod-img')].map(i=>i.complete&&i.naturalWidth>0);
  return{name,overflowX:document.documentElement.scrollWidth>vw,bad,order,steps,figsLoaded:figs,ell:/…/.test(r.innerText),coThe:/có thể/.test(r.innerText),win:r.classList.contains('kpod-win')}},name);
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);await p.addStyleTag({content:'.kroul{display:none!important}'});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
 await require('./lib/roulette').dismissRoulette(p);
 await p.waitForTimeout(1500);
 /* 1: she wins */
 await p.evaluate(()=>{Object.assign(S.arts,{cam:5,ky:5,thi:5,hoa:5,vu:5,y:5});S.tai=95;const R=liveRivals(true).slice(0,3);R.forEach(v=>{v.tai=20;Object.keys(v.arts||{}).forEach(k=>v.arts[k]=0)});
  startContest({art:'tho',title:'Hội Thượng nguyên',rivals:R,prep:20,stakes:{win:{sung:8,danh:3},top3:{danh:1},last:{danh:-1},paid:{suc:-6}},onDone:r=>window.__res=r})});
 await p.waitForTimeout(400);await p.locator('#kg82skip').tap();await p.waitForTimeout(700);
 await p.screenshot({path:`${OUT}/1-win-reveal-${tag}.png`});
 await p.waitForFunction(()=>document.querySelectorAll('.kpc').length>40,null,{timeout:8000}).catch(()=>{});
 await p.evaluate(()=>document.querySelectorAll('.kpc').forEach(e=>e.getAnimations().forEach(a=>{a.pause();a.currentTime=Math.min(900,a.effect.getTiming().duration*.3)})));
 await p.screenshot({path:`${OUT}/2-win-confetti-${tag}.png`});await p.evaluate(()=>document.querySelectorAll('.kpc').forEach(e=>e.getAnimations().forEach(a=>a.play())));
 await p.waitForTimeout(3500);checks.push(await check('win'));await p.screenshot({path:`${OUT}/3-win-final-${tag}.png`});
 await p.locator('.kpod-next').tap();await p.waitForTimeout(400);
 const scr2=await p.evaluate(()=>({pod:!!document.querySelector('#kpodov'),board:!!document.querySelector('#kg82 .kgr .kfacts'),ok:!!document.getElementById('kg82ok')}));checks.push({name:'screen2',...scr2});
 await p.screenshot({path:`${OUT}/4-screen2-board-${tag}.png`});
 await require('./lib/roulette').closeResult(p);await p.waitForTimeout(300);
 /* 2: she is 4th; one stranger on the dais; tap-to-skip */
 await p.evaluate(()=>{S.tai=5;Object.keys(S.arts).forEach(k=>S.arts[k]=0);const R=liveRivals(true).slice(0,4);R.forEach(v=>{v.tai=95;v.arts.thi=5;v.arts.cam=5});R[1].tai=200;window.__unk=R[1];window.kitKnown=x=>x!==window.__unk;
  startContest({art:'doi',title:'Thi câu đối',rivals:R,prep:0,onDone:r=>window.__res=r})});
 await p.waitForTimeout(400);await p.locator('#kg82skip').tap();await p.waitForTimeout(600);
 await p.locator('.kpod-stage').tap();await p.waitForTimeout(300);checks.push(await check('lose-4th-stranger'));
 await p.screenshot({path:`${OUT}/5-lose-stranger-${tag}.png`});
 await p.locator('.kpod-next').tap();await p.waitForTimeout(300);await require('./lib/roulette').closeResult(p);await p.waitForTimeout(300);
 await p.evaluate(()=>{delete window.kitKnown;window.kitKnown=()=>true});
 /* 3: Tranh ghế result */
 await p.evaluate(()=>{Q.length=0;const C=liveRivals(true).filter(v=>v.rank===S.rank).slice(0,2);const L=[S].concat(C.length>=2?C:liveRivals(true).slice(0,2));L.forEach(v=>{if(v!==S)v.rank=S.rank});
  S.contest={r:S.rank+1,c:L.map(key),t0:wk(),len:1,round:3,sc:{},bk:{},pr:{},sab:{},dq:[],hint:0};L.forEach((v,i)=>S.contest.sc[key(v)]=[8-i*2,6,5-i]);contestEnd();showModal()});
 await p.waitForTimeout(800);await p.locator('.kpod').tap();await p.waitForTimeout(300);checks.push(await check('tranh-ghe'));
 await p.screenshot({path:`${OUT}/6-tranh-ghe-${tag}.png`});await p.locator('.kpod-next').tap();await p.waitForTimeout(400);
 await p.screenshot({path:`${OUT}/7-tranh-ghe-screen2-${tag}.png`});
 /* 4: hoàng tự exam rows (.ktlist) */
 await p.evaluate(()=>{Q.length=0;const mk=(n,s,a)=>({name:n,sex:s,age:a,hp:90,fond:50,born:0});const R=liveRivals(true);
  const k1=mk('Hoàng tử Minh Khải','m',12),k2=mk('Công chúa An Nhiên','f',11),k3=mk('Hoàng tử Bảo Lâm','m',13);S.kids=(S.kids||[]).concat([k1]);(R[0].kids=R[0].kids||[]).push(k2);(R[1].kids=R[1].kids||[]).push(k3);
  const row=(k,mom,w)=>`<div class="ktr"><span>${mdH(kidFace(k),"xs")}<span>${k.name} · ${mom?"con "+mom.name:'<strong class="g">con ngươi</strong>'}</span></span><b class="g">${w}</b>${mom?"":'<small><span class="g">Hoàng thượng thương con +4</span> · <span class="g">Sủng +3</span></small>'}</div>`;
  Q.push({t:'Kết quả khảo thí văn võ',h:`<div class="ktlist">${row(k3,R[1],'Đứng đầu · Xuất sắc')}${row(k1,null,'Xuất sắc')}${row(k2,R[0],'Khá')}</div><p class="past">Xuất sắc: thương con +4.</p>`});showModal()});
 await p.waitForTimeout(800);await p.locator('.kpod').tap();await p.waitForTimeout(300);checks.push(await check('kid-exam'));
 await p.screenshot({path:`${OUT}/8-kid-exam-${tag}.png`});await p.locator('.kpod-next').tap();await p.waitForTimeout(300);
 const after=await p.evaluate(()=>({modal:!document.getElementById('modal').hidden,pod:!!document.querySelector('#kpodov')}));checks.push({name:'kid-exam-screen2',...after});
 /* 5: old save from the main build */
 let oldSave=null;
 if(OLD){const p2=await ctx.newPage();await p2.goto(OLD,{waitUntil:'domcontentloaded'});await p2.waitForTimeout(2000);
  await p2.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;Q.length=0;localStorage.setItem(SK(2),JSON.stringify(ser()));localStorage.setItem("hclh-slot","2")});await p2.close();
  const p3=await ctx.newPage();const e3=[];p3.on('pageerror',e=>e3.push(e.message));await p3.goto(BASE,{waitUntil:'domcontentloaded'});await p3.waitForTimeout(2500);
  const ok=await p3.evaluate(()=>{const bt=document.querySelector('[data-load="2"]');if(!bt)return 'no slot';bt.click();return S&&S.name?'loaded '+S.name:'fail'});await p3.waitForTimeout(800);
  oldSave={ok,errors:e3};await p3.close()}
 console.log(JSON.stringify({size:SZ,checks,oldSave,errors:errs}));await b.close()})();
