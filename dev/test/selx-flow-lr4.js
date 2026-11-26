/* LR4 copy of selx-flow.js + real taps «Về nơi ở mới» on «Tin sắc phong» and the jpromob «Phân cung» panel (dfu re-shoot): node dev/test/selx-flow-lr4.js <worktree> <outdir> [scale] */
/* SELSCENE-7 owner mock of the 3-day flow (Nhập cung → Điện tuyển → Chờ chiếu) played through the REAL UI (scene taps + #modal buttons):
   node dev/test/selx-flow.js <worktree> <outdir OUTSIDE git> [scale 1|2]
   per device (Fold 755x1000, iPad 1180x820): key-beat shots <dev>-NN-<beat>.png (a new card title / a scene / a result card) + <dev>.webm (Playwright recordVideo).
   Then: ffmpeg -i <dev>.webm <dev>.mp4 and setpts=0.5*PTS for the 2× copy (done here when ffmpeg exists). Shots and videos never in git (OD:L203). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');
const WT=process.argv[2],OUT=process.argv[3],SCALE=+(process.argv[4]||1);const ROOT=path.join(WT,'dev');fs.mkdirSync(OUT,{recursive:true});
const DEV0={fold:{width:755,height:1000},ipad:{width:1180,height:820}};const DEV=Object.fromEntries(Object.entries(DEV0).filter(([k])=>!process.argv[5]||process.argv[5].split(',').includes(k)));
const TXL=new Set();let HIDDEN=0;(async()=>{const b=await chromium.launch();
 for(const [dn,vp] of Object.entries(DEV)){const vd=path.join(OUT,'_v_'+dn);fs.mkdirSync(vd,{recursive:true});
  const ctx=await b.newContext({viewport:vp,deviceScaleFactor:SCALE,serviceWorkers:'block',recordVideo:{dir:vd,size:vp}});
  await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));
   if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
   const ct=f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.webp')?'image/webp':f.endsWith('.js')?'text/javascript':f.endsWith('.json')?'application/json':'application/octet-stream';
   return r.fulfill({status:200,contentType:ct,body:fs.readFileSync(f)})});
  await ctx.route(/^https?:\/\/(?!localhost)/,async r=>{const u=new URL(r.request().url());const m=u.pathname.match(/\/(img\/.*)$/);if(m){const f=path.join(ROOT,m[1]);if(fs.existsSync(f))return r.fulfill({status:200,contentType:'image/webp',body:fs.readFileSync(f)})}return r.continue().catch(()=>{})});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
  /* BIG rv FAIL 1: count every red danger pulse (.kmalarm, j93 kitAlarm) shown during the selection days — must be 0 */
  await p.addInitScript(()=>{window.__alarmN=0;new MutationObserver(L=>{for(const m of L)for(const n of m.addedNodes)if(n.classList&&n.classList.contains('kmalarm'))window.__alarmN++}).observe(document,{childList:true,subtree:true})});
  /* SELSCENE-19 (kit-music-r1, KIT §93.x): the heartbeat / tension music is the other half of «danger» — count every heartLoop(true) during the selection days — must be 0 */
  await p.addInitScript(()=>{window.__heartN=0;const t=setInterval(()=>{if(window.__ctmBuilt!==1||typeof heartLoop!=='function')return;clearInterval(t);const h0=heartLoop;window.heartLoop=function(on){if(on){window.__heartN++;window.__heartP=(window.__heartP||[]).concat([(typeof Q!=='undefined'&&Q[0]&&Q[0].pid)||'?']).slice(-6)}return h0.apply(this,arguments)}},50)});
  await p.goto('http://localhost:8813/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function',null,{timeout:240000});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
  await p.evaluate(()=>{for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k==="tt")break}S.kcPick="cung";
   S.sac=S.duc=S.tai=100;nlAccept();/* SELSCENE-18 (BIG rv FAIL 2): the start() loop leaves «Luân hồi» roulettes in the DOM; jdayq treats an open roulette as an activity and holds every card. Close them like a finished spin (remove the roulette layers), no CSS hiding. */document.querySelectorAll('[id^="kroul"],.kroul,.kroul-ov,.kbd,#klife').forEach(x=>x.remove());document.getElementById('title').hidden=true;try{renderHUD();render()}catch(e){}});
  await p.waitForTimeout(3500);
  let n=0,last='',lastRes='';const shot=async lab=>{n++;await p.screenshot({path:path.join(OUT,`${dn}-${String(n).padStart(2,'0')}-${lab}.png`)})};
  const slug=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,28).toLowerCase();
  for(let step=0;step<500;step++){
   const st=await p.evaluate(()=>{const Z=S&&S.selx2;const sc=document.querySelector('.kscn');const box=sc&&sc.querySelector('.kdv-box');const m=Q[0];
    const res=document.querySelector('#rtoast.on');return{done:!Z||Z.done||S.dead||!S.selx2,days:Z&&Z.days,sc:!!sc,line:box?box.textContent.slice(0,40):'',t:m&&m.t||'',pid:m&&m.pid||'',
     nm:m&&m.opts?m.opts.map(o=>o.n):[],modal:!!document.querySelector('#modal:not([hidden]) button[data-m]'),res:res?res.textContent.slice(0,60):''}});
   if(st.done)break;
   /* a kit motion scene (km-gate entry, reward) plays before the card: watch it, then tap it on like a player */
   if(await p.evaluate(()=>!!document.querySelector('.kmov:not(.km-out)'))){await p.waitForTimeout(1500);await p.evaluate(()=>{const k=document.querySelector('.kmov:not(.km-out)');if(!k)return;const bt=[...k.querySelectorAll('button')].find(x=>x.offsetParent!==null);if(bt)bt.click();else k.click()});await p.waitForTimeout(700);continue}
   /* the «Luân hồi» roulette of the new life opens a moment after start: end it like a player («Bỏ qua» on the roulette, as coop-e2e clear() does), never hide it */
   if(await p.evaluate(()=>{const r=document.querySelector('[id^="kroul"],.kroul-ov');if(!r)return false;const bt=[...r.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(bt)bt.click();else r.remove();return true})){await p.waitForTimeout(800);continue}
   /* SELSCENE-11 text audit (law 6/7/11): every visible card / scene / stage word before the edict — no future rank of a tú nữ, no «???» name mask, no raw ${…} */
   {const tx=await p.evaluate(()=>{const g=e=>e&&e.offsetParent!==null?e.innerText:'';return [g(document.getElementById('modal')),g(document.querySelector('.kscn')),g(document.getElementById('stage')),g(document.getElementById('panel'))].join(' | ')});
    const RK=/(Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng)\s+(?=[A-ZĐ])|\?\?\?|\$\{|lạ mặt|ngươi chưa quen/g;/* + owner OD 24/11 ~22:14Z: an unnamed person is «một vị …», never «lạ mặt / chưa quen» */let m;while((m=RK.exec(tx))){const k=m[0]+'|'+tx.slice(Math.max(0,m.index-30),m.index+40).replace(/\s+/g,' ');if(!TXL.has(k)){TXL.add(k);console.log('TEXT',dn,'day',st.days,JSON.stringify(k))}}}
   /* one knowledge: what the days print (selxMet → name / «một vị tú nữ») = what the kit plates read (j61 kitKnownName → name / «???») */
   {const kd=await p.evaluate(()=>{try{const Z=S.selx2;const L=(Z.girls||[]).concat(Z.keptV||[]);return L.filter(v=>v&&kitKnownName(v)!==selxMet(v)).map(v=>v.name+':'+kitKnownName(v)+'/'+selxMet(v))}catch(e){return []}});
    for(const x of kd){const k='KNOW|'+x;if(!TXL.has(k)){TXL.add(k);console.log('TEXT',dn,'day',st.days,'plate≠text',x)}}}
   /* RV-SELX: the contest podium (kit §26 #kpodov) waits for its «Tiếp» like a player would; before, the driver clicked the cards UNDER it and Day 3 was filmed behind the podium */
   if(await p.evaluate(()=>!!document.getElementById('kpodov'))){if(last!=='podium'){last='podium';await p.waitForTimeout(1500);await shot('vinh-danh')}await p.evaluate(()=>{const o=document.getElementById('kpodov');const b=o&&[...o.querySelectorAll('button')].find(x=>/Tiếp/.test(x.textContent));if(b)b.click()});await p.waitForTimeout(900);continue}
   if(st.sc){const key='sc:'+st.line.slice(0,12);if(key!==last&&st.line){last=key;await p.waitForTimeout(900);await shot('canh-'+slug(st.line))}
    await p.waitForTimeout(450);await p.evaluate(()=>{const L=document.querySelector('.kscn');if(L)L.click()});continue}
   if(st.pid==='kc2Sel'){await p.evaluate(()=>{Q.shift();S.selx.done=1;S.selx.art="";selxSelDo(10);document.querySelectorAll('.kmov,#kprevov,#kg82').forEach(x=>x.remove());/* SELSCENE-19: the shortcut skips chooseM, which shows the next card — show it here, else #modal keeps the Điện tuyển buttons while Q[0] is the next card (iPad FAIL 3/5 pre-merge too) */showModal();render()});await p.waitForTimeout(1500);continue}
   if(st.nm.length){/* the keep policy of selx-days: greet on days 1/3, the lesson with care, the royals' tests the liked answer, else go on */
    const i=await p.evaluate(()=>{const m=Q[0];const Z=S.selx2;const nm=m.opts.map(x=>x.n);
     if(m.t==="Thái hậu"||m.t==="Hoàng hậu"){try{const tok=m.t==="Thái hậu"?"th":(liveRivals(false).find(v=>v.queen)||"th");const e=SELX_TESTS.find(x=>x.id===Z.tests[m.t==="Thái hậu"?"doidap":"hanhxu"].id);const k=e.options.findIndex(x=>selxReactR(x,tok)==="+");return k<0?0:k}catch(e){return 0}}
     const L=nm.findIndex(s=>/^Tập thật kỹ/.test(s));if(L>=0)return L;const g=nm.findIndex(s=>/^Làm quen/.test(s));if(g>=0&&Z.days!==2&&Object.keys(Z.met||{}).length<3)return g;
     const c=nm.findIndex(s=>/chờ tới tối|Theo|Cất đồ|Quỳ|Ngủ|Về|Nghe/.test(s));return c>=0?c:0});
    const key='card:'+st.t+':'+st.days;if(key!==last){last=key;if(!st.modal)await p.evaluate(()=>{try{showModal()}catch(e){}});await p.waitForTimeout(900);await shot('the-'+slug(st.t))}
    const clicked=await p.evaluate(i=>{const bb=document.querySelector('#modal button[data-m="'+i+'"]');if(bb&&!bb.disabled){bb.click();return true}return false},i);
    if(!clicked){HIDDEN++;const why=await p.evaluate(()=>{const e=typeof dqActEl==='function'&&dqActEl();const M=document.getElementById('modal');return{act:e?(e.id||String(e.className).slice(0,40)):'none',modalHidden:M?M.hidden:null,btns:M?M.querySelectorAll("button[data-m]").length:0,dm:M?[...M.querySelectorAll("button[data-m]")].map(b=>b.dataset.m+(b.disabled?"d":"")+":"+b.textContent.slice(0,20)):[],i:'?',q0:Q[0]&&Q[0].opts.map(o=>o.n.slice(0,14)),mt:(document.querySelector('#modal .kat,#modal h3,#modal .ktitle')||{}).textContent,hit:(()=>{const n=Q[0]&&Q[0].opts[0]&&Q[0].opts[0].n.slice(0,10);const b=[...document.querySelectorAll('button')].find(x=>n&&x.textContent.includes(n));if(!b)return 'none';let c=b,ids=[];while(c){if(c.id)ids.push(c.id);c=c.parentElement}return b.outerHTML.slice(0,200)+' IN '+ids.join('<')})(),modals:[...document.querySelectorAll('[id^=modal]')].map(m=>m.id+(m.hidden?'h':'v'))}});console.log('FAIL card with choices not visible',dn,'day',st.days,JSON.stringify(st.t),JSON.stringify(why));break}
    await p.waitForTimeout(500);/* result cards are PARKED while the next card is open (KIT §32.10a), so no «kết quả» frame here */
    await p.evaluate(()=>document.querySelectorAll('.kmov,#kprevov,#kg82').forEach(x=>x.remove()));await p.waitForTimeout(700);continue}
   await p.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(300)}
  /* LR4 dfu re-shoot: after the days, REAL taps (Playwright mouse on the button box) through «Tin sắc phong» → jpromob «Phân cung» panel → the game */
  {let taps=0,lt='';for(let k=0;k<80&&taps<2;k++){await p.waitForTimeout(700);
    const m=await p.evaluate(()=>{const M=document.getElementById('modal');const vis=M&&!M.hidden;const t=vis?((M.querySelector('h2,h3,.ktitle,.kmt')||{}).textContent||'').trim().slice(0,40):'';
     const bs=vis?[...M.querySelectorAll('button')].filter(b=>b.offsetParent!==null&&!b.disabled).map(b=>b.textContent.trim().slice(0,40)):[];return{vis,t,q:typeof Q!=='undefined'&&Q[0]?Q[0].t:'',bs,pc:window.__pcN||0}});
    if(m.vis&&m.q+m.t!==lt){lt=m.q+m.t;await shot('sac-'+slug(m.q||m.t))}
    const b=p.locator('#modal button:visible',{hasText:/Về nơi ở mới/}).first();
    if(m.vis&&await b.count()){await b.scrollIntoViewIfNeeded();await p.waitForTimeout(600);await b.click();taps++;console.log('REALTAP «Về nơi ở mới»',dn,'on',m.q||m.t,'pcN',m.pc);await p.waitForTimeout(1500);if(taps===1)await shot('phan-cung');continue}
    if(m.vis&&m.bs.length===1){await p.locator('#modal button:visible').first().click();continue}
    if(!m.vis&&m.pc>0&&taps>0)break}
   console.log('phan-cung taps',dn,taps,'pcN',await p.evaluate(()=>window.__pcN||0))}
  await p.waitForTimeout(1200);await shot('sau-chieu');
  {const an=await p.evaluate(()=>window.__alarmN||0);if(an){HIDDEN++;console.log('FAIL danger pulse on selection-day cards',dn,an)}else console.log('ok no danger pulse',dn)}
  {const hn=await p.evaluate(()=>[window.__heartN||0,window.__heartP||[]]);if(hn[0]){HIDDEN++;console.log('FAIL heartbeat (danger music) on selection-day cards',dn,JSON.stringify(hn))}else console.log('ok no heartbeat',dn)}
  console.log(dn,'shots',n,'errors',errs.length,errs.slice(0,3),'text leaks',TXL.size);const vpath=await p.video().path();await ctx.close();
  const webm=path.join(OUT,dn+'.webm');fs.renameSync(vpath,webm);fs.rmSync(vd,{recursive:true,force:true});
  try{cp.execFileSync('ffmpeg',['-y','-loglevel','error','-i',webm,'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',path.join(OUT,dn+'.mp4')]);
   cp.execFileSync('ffmpeg',['-y','-loglevel','error','-i',webm,'-filter:v','setpts=0.5*PTS','-an','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',path.join(OUT,dn+'-2x.mp4')]);fs.rmSync(webm)}catch(e){console.log('ffmpeg',e.message.slice(0,200))}}
 await b.close();console.log(HIDDEN?'FAIL hidden choice cards '+HIDDEN:'PASS every choice card was visible and tapped');process.exit(HIDDEN?1:0)})();
