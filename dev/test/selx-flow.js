/* SELSCENE-7 owner mock of the 3-day flow (Nhập cung → Điện tuyển → Chờ chiếu) played through the REAL UI (scene taps + #modal buttons):
   node dev/test/selx-flow.js <worktree> <outdir OUTSIDE git> [scale 1|2]
   per device (Fold 755x1000, iPad 1180x820): key-beat shots <dev>-NN-<beat>.png (a new card title / a scene / a result card) + <dev>.webm (Playwright recordVideo).
   Then: ffmpeg -i <dev>.webm <dev>.mp4 and setpts=0.5*PTS for the 2× copy (done here when ffmpeg exists). Shots and videos never in git (OD:L203). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');
const WT=process.argv[2],OUT=process.argv[3],SCALE=+(process.argv[4]||1);const ROOT=path.join(WT,'dev');fs.mkdirSync(OUT,{recursive:true});
const DEV0={fold:{width:755,height:1000},ipad:{width:1180,height:820}};const DEV=Object.fromEntries(Object.entries(DEV0).filter(([k])=>!process.argv[5]||process.argv[5].split(',').includes(k)));
(async()=>{const b=await chromium.launch();
 for(const [dn,vp] of Object.entries(DEV)){const vd=path.join(OUT,'_v_'+dn);fs.mkdirSync(vd,{recursive:true});
  const ctx=await b.newContext({viewport:vp,deviceScaleFactor:SCALE,serviceWorkers:'block',recordVideo:{dir:vd,size:vp}});
  await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));
   if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
   const ct=f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.webp')?'image/webp':f.endsWith('.js')?'text/javascript':f.endsWith('.json')?'application/json':'application/octet-stream';
   return r.fulfill({status:200,contentType:ct,body:fs.readFileSync(f)})});
  await ctx.route(/^https?:\/\/(?!localhost)/,async r=>{const u=new URL(r.request().url());const m=u.pathname.match(/\/(img\/.*)$/);if(m){const f=path.join(ROOT,m[1]);if(fs.existsSync(f))return r.fulfill({status:200,contentType:'image/webp',body:fs.readFileSync(f)})}return r.continue().catch(()=>{})});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
  await p.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{const st=document.createElement('style');st.textContent='#kroul,#kroulw,.kroul,#klife,#title,.dawn{display:none!important}';document.head.appendChild(st)})});
  await p.goto('http://localhost:8813/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function',null,{timeout:240000});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
  await p.evaluate(()=>{for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k==="tt")break}S.kcPick="cung";
   S.sac=S.duc=S.tai=100;nlAccept();document.querySelectorAll('.kbd,#klife,#kroulw,#title,.dawn').forEach(x=>x.remove());try{renderHUD();render()}catch(e){}});
  await p.waitForTimeout(3500);
  let n=0,last='',lastRes='';const shot=async lab=>{n++;await p.screenshot({path:path.join(OUT,`${dn}-${String(n).padStart(2,'0')}-${lab}.png`)})};
  const slug=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,28).toLowerCase();
  for(let step=0;step<500;step++){
   const st=await p.evaluate(()=>{const Z=S&&S.selx2;const sc=document.querySelector('.kscn');const box=sc&&sc.querySelector('.kdv-box');const m=Q[0];
    const res=document.querySelector('#rtoast.on');return{done:!Z||Z.done||S.dead||!S.selx2,days:Z&&Z.days,sc:!!sc,line:box?box.textContent.slice(0,40):'',t:m&&m.t||'',pid:m&&m.pid||'',
     nm:m&&m.opts?m.opts.map(o=>o.n):[],modal:!!document.querySelector('#modal:not([hidden]) button[data-m]'),res:res?res.textContent.slice(0,60):''}});
   if(st.done)break;
   if(st.sc){const key='sc:'+st.line.slice(0,12);if(key!==last&&st.line){last=key;await p.waitForTimeout(900);await shot('canh-'+slug(st.line))}
    await p.waitForTimeout(450);await p.evaluate(()=>{const L=document.querySelector('.kscn');if(L)L.click()});continue}
   if(st.pid==='kc2Sel'){await p.evaluate(()=>{Q.shift();S.selx.done=1;S.selx.art="";selxSelDo(10);document.querySelectorAll('.kmov,#kprevov,#kg82').forEach(x=>x.remove());render()});await p.waitForTimeout(1500);continue}
   if(st.nm.length){/* the keep policy of selx-days: greet on days 1/3, the lesson with care, the royals' tests the liked answer, else go on */
    const i=await p.evaluate(()=>{const m=Q[0];const Z=S.selx2;const nm=m.opts.map(x=>x.n);
     if(m.t==="Thái hậu"||m.t==="Hoàng hậu"){try{const tok=m.t==="Thái hậu"?"th":(liveRivals(false).find(v=>v.queen)||"th");const e=SELX_TESTS.find(x=>x.id===Z.tests[m.t==="Thái hậu"?"doidap":"hanhxu"].id);const k=e.options.findIndex(x=>selxReactR(x,tok)==="+");return k<0?0:k}catch(e){return 0}}
     const L=nm.findIndex(s=>/^Tập thật kỹ/.test(s));if(L>=0)return L;const g=nm.findIndex(s=>/^Làm quen/.test(s));if(g>=0&&Z.days!==2&&Object.keys(Z.met||{}).length<3)return g;
     const c=nm.findIndex(s=>/chờ tới tối|Theo|Cất đồ|Quỳ|Ngủ|Về|Nghe/.test(s));return c>=0?c:0});
    const key='card:'+st.t+':'+st.days;if(key!==last){last=key;if(!st.modal)await p.evaluate(()=>{try{showModal()}catch(e){}});await p.waitForTimeout(900);await shot('the-'+slug(st.t))}
    const clicked=await p.evaluate(i=>{const bb=document.querySelector('#modal button[data-m="'+i+'"]');if(bb&&!bb.disabled){bb.click();return true}return false},i);
    if(!clicked)await p.evaluate(i=>{chooseM(i);render()},i);
    await p.waitForTimeout(450);{const rs=await p.evaluate(()=>{const r=document.querySelector('#rtoast.on');return r?r.textContent.slice(0,60):''});if(rs&&rs!==lastRes){lastRes=rs;await shot('ketqua')}}
    await p.evaluate(()=>document.querySelectorAll('.kmov,#kprevov,#kg82').forEach(x=>x.remove()));await p.waitForTimeout(700);continue}
   await p.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(300)}
  await p.waitForTimeout(1200);await shot('sau-chieu');
  console.log(dn,'shots',n,'errors',errs.length,errs.slice(0,3));const vpath=await p.video().path();await ctx.close();
  const webm=path.join(OUT,dn+'.webm');fs.renameSync(vpath,webm);fs.rmSync(vd,{recursive:true,force:true});
  try{cp.execFileSync('ffmpeg',['-y','-loglevel','error','-i',webm,'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',path.join(OUT,dn+'.mp4')]);
   cp.execFileSync('ffmpeg',['-y','-loglevel','error','-i',webm,'-filter:v','setpts=0.5*PTS','-an','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',path.join(OUT,dn+'-2x.mp4')]);fs.rmSync(webm)}catch(e){console.log('ffmpeg',e.message.slice(0,200))}}
 await b.close()})();
