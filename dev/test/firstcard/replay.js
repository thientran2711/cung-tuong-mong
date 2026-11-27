/* FIRSTCARD replay of the two bug lives' first card with REAL pointer taps (Playwright mouse clicks on the visible kit buttons):
   E-S8 bd (Công chúa Ba Tư hòa thân) «Cúi đầu chờ xét» · E-S4 pf (Công chúa Phù Tang hòa thân) «Dâng Kỳ» → mini-game frame «Để tài nghệ quyết định».
   usage: node replay.js <url> <out> <dev fold|ipad> <case bd|pf|tt> [dsf] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,URL0,OUT,DEV,CASE,DSF]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const VP=DEV==='ipad'?{width:1180,height:820}:{width:755,height:1000};
const PLAN={bd:{origin:'bd',pick:/^Cúi đầu chờ xét/},pf:{origin:'pf',pick:/^Dâng Kỳ/},tt:{origin:'cn',pick:/^Cúi đầu chờ xét/}}[CASE];
(async()=>{const b=await chromium.launch();const vd=path.join(OUT,'_v');fs.mkdirSync(vd,{recursive:true});
 const ctx=await b.newContext({viewport:VP,deviceScaleFactor:+(DSF||1),hasTouch:DEV!=='ipad',serviceWorkers:'block',recordVideo:{dir:vd,size:VP}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL0,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof over==='function'&&typeof selxDay==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(o=>{window.__forceOrigin=o;SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()},PLAN.origin);
 let n=0;const shot=async l=>{n++;await p.screenshot({path:path.join(OUT,`${CASE}-${DEV}-${String(n).padStart(2,'0')}-${l}.png`)})};
 const log=[];let seenCard=false,res=null;
 for(let step=0;step<160;step++){await p.waitForTimeout(650);
  const st=await p.evaluate(()=>({dead:!!(S&&S.dead),fate:S&&S.fate||'',done:!!(S&&S.selx&&S.selx.done),rank:S&&S.rank,r0:S&&S.origin&&S.origin.r,q:(Q[0]||{}).t||'',pid:(Q[0]||{}).pid||''}));
  if(st.dead||(st.done&&!/^(Lễ ra mắt|Tuyển chọn|Xét phong)/.test(st.q))){res=st;break}
  /* visible buttons, top layer first */
  const btns=await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&e.offsetParent!==null&&!e.disabled};
   const L=[];for(const sel of ['#kg82 button','[id^="kroul"] button','.kroul-ov button','.kmov button','#kpodov button','#modal button[data-m]','#modal button','.dlg button']){for(const e of document.querySelectorAll(sel))if(vis(e)){e.scrollIntoView({block:'nearest'});const r=e.getBoundingClientRect();L.push({sel,x:r.left+r.width/2,y:r.top+Math.min(r.height/2,30),t:e.innerText.replace(/\s+/g,' ').trim().slice(0,90)})}if(L.length)break}return L});
  if(!btns.length){await p.mouse.click(VP.width/2,VP.height*0.6);continue}
  let i=btns.findIndex(x=>PLAN.pick.test(x.t));if(i>=0&&!seenCard){seenCard=true;await shot('the-dau');log.push('CARD '+btns.map(x=>x.t).join(' | '))}
  if(i<0){i=btns.findIndex(x=>/^(Để tài nghệ quyết định|Bỏ qua kết quả)/.test(x.t));if(i>=0&&!global.__ks){global.__ks=1;await p.waitForTimeout(900);await shot('khung-thi')}}
  if(i<0){const v=btns.findIndex(x=>/^Vào cung ngay/.test(x.t));if(v>=0&&!global.__vc){global.__vc=1;i=v}else if(v>=0)i=btns.findIndex(x=>/^Nhận thân phận/.test(x.t))}if(i<0)i=btns.findIndex(x=>/^(Bỏ qua|Tiếp theo|Tiếp|Đã hiểu|Nhận)/.test(x.t));if(i<0)i=0;
  if(process.env.V)console.log(step,st.q,'|',btns.slice(0,6).map(x=>x.t.slice(0,30)).join(' / '));
  log.push(`tap «${btns[i].t.slice(0,50)}»`);
  try{await p.mouse.click(btns[i].x,btns[i].y)}catch(e){log.push('tap failed '+String(e).slice(0,80));if(process.env.V)console.log('tap failed',String(e).slice(0,200))}}
 await p.waitForTimeout(1500);await shot('ket-qua');
 const fin=await p.evaluate(()=>({dead:!!S.dead,fate:S.fate||'',rank:S.rank,rankN:RANKS[S.rank]&&RANKS[S.rank].n,r0:S.origin.r,origin:S.origin.n,why:S.selx&&S.selx.why,q:(Q[0]||{}).t||''}));
 fs.writeFileSync(path.join(OUT,`${CASE}-${DEV}.txt`),log.join('\n')+'\nRESULT '+JSON.stringify(fin)+'\nERRORS '+JSON.stringify(errs)+'\n');
 console.log(CASE,DEV,JSON.stringify(fin),'errors',errs.length);await ctx.close();await b.close()})();
