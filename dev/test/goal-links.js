/* goal-links (review/goal-links, jglink.js + jtq14 {ped}; owner OD 26/11 ~18:05Z): chapter 2 (sung14) of a consort life —
   (1) the open goal lines in the chapter detail + Mệnh truyện are underlined links (.kgl[data-gl]); tap → «Cách làm» kit panel (who + face, where + hours, walk khắc)
   (2) «Đi tới» walks her to Nội vụ phủ, the eunuch is there and his shop opens; «Xem Dư đồ» rings the place (kitCoach)
   (3) the buy quest names the real eunuch (S.court.ped.name) and he really stands at Nội vụ phủ (j95 roster c:ped)
   (4) the Dư đồ marks every buying place «Mua bán» (own tag, zone tag when zones exist) + the legend line.
   r2 (MAIN LOOK): he is NAMED from the first day (never «???» / «chưa biết tên» / «vị thái giám»); navigation options make no result card and no log line
   (Xem Dư đồ, Đi tới, jgoal «Đi làm», Đóng); «Mua bán» is a line inside the paper name slip; his shop header shows his name.
   usage: node dev/test/goal-links.js <url> [WxH,...] [shotdir]   (exit 1 on a FAIL) */
const {chromium}=require('playwright');const {autoDismissRoulette,dismissRoulette}=require('./lib/roulette');
const [,,URL,SIZES,OUT]=process.argv;const fs=require('fs');if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);const fails=[];const F=m=>fails.push(m);
  const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:true,isMobile:W<1100,deviceScaleFactor:OUT?2:1});await autoDismissRoulette(ctx);
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const shot=async n=>{if(OUT){await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/${W}x${H}-${n}.jpg`,type:'jpeg',quality:70})}};
  await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(800);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear();localStorage.setItem('ctm-bgpause','1')}catch(e){}document.getElementById('title').hidden=true;window.__forceOrigin='tt';start()});
  await dismissRoulette(p);await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.st&&S.st.ms&&!document.querySelector('.kroul,#kroul,#kroulw'),null,{timeout:90000});
  const ped=await p.evaluate(()=>{Q.length=0;showModal();msStart67('sung14');Q.length=0;showModal();S.place='home';render();return {name:S.court.ped.name,known:k61Named(S.court.ped),at:glShopKeys(),rec:S.roster.P['c:ped'].map(e=>e[0])}});
  if(!ped.name||!ped.known||!ped.rec.every(k=>k==='nvp'))F('eunuch not real/named/at nvp '+JSON.stringify(ped));
  /* (1) chapter detail: links */
  await p.evaluate(()=>kitGoalDetail());await p.waitForTimeout(700);
  const L=await p.evaluate(()=>[...document.querySelectorAll('#modal [data-gl]')].filter(e=>e.offsetParent).map(e=>({t:e.textContent.trim(),k:e.dataset.glk,u:getComputedStyle(e).textDecorationStyle+'/'+getComputedStyle(e).textDecorationLine})));
  const buy=L.find(x=>/Nội vụ phủ/.test(x.t));
  if(L.length<3)F('goal links '+JSON.stringify(L));if(!buy||buy.k!=='nvp'||!buy.t.includes('thái giám '+ped.name))F('buy line link '+JSON.stringify(buy));if(L.some(x=>!/dotted/.test(x.u)))F('not dotted '+JSON.stringify(L));
  await p.evaluate(()=>{const e=[...document.querySelectorAll('#modal [data-gl]')].find(x=>/Nội vụ phủ/.test(x.textContent));if(e)e.scrollIntoView({block:'center'})});await shot('1-goal-links');
  await p.evaluate(()=>{[...document.querySelectorAll('#modal [data-gl]')].find(x=>/Nội vụ phủ/.test(x.textContent)).click()});await p.waitForTimeout(700);
  const how=await p.evaluate(()=>{const m=document.getElementById('modal');return {title:(m.querySelector('.kptitle')||{}).textContent,text:m.innerText.replace(/\s+/g,' ').slice(0,600),opts:[...m.querySelectorAll('.opt,button.ka,.kopt')].filter(e=>e.offsetParent).map(e=>e.innerText.split('\n')[0]).slice(0,6),face:!!m.querySelector('.kpl img, .kpl .md, .kpl [style*="background"]')}});
  if(/\?\?\?|chưa biết tên|một vị thái giám|vị thái giám bày hàng/.test(how.text))F('unnamed in panel '+how.text);
  if(how.title!=='Cách làm'||!how.text.includes(ped.name)||!/Nội vụ phủ/.test(how.text)||!/Giờ mở/i.test(how.text)||!/khắc/.test(how.text))F('how panel '+JSON.stringify(how));
  if(!how.opts.some(o=>/Đi tới/.test(o))||!how.opts.some(o=>/Xem Dư đồ/.test(o)))F('how opts '+JSON.stringify(how.opts));
  await shot('2-cach-lam');
  /* (2a) Xem Dư đồ → ring */
  await p.evaluate(()=>{const o=[...document.querySelectorAll('#modal .opt,#modal button')].find(e=>e.offsetParent&&/^Xem Dư đồ/.test(e.innerText.trim()));o.click()});await p.waitForTimeout(1600);
  const toastOn=()=>p.evaluate(()=>{const t=document.getElementById('rtoast');return !!(t&&t.classList.contains('on')&&t.offsetParent!==null)});
  const navLog=()=>p.evaluate(()=>(S.logs||[]).slice(0,3).map(x=>String(x).replace(/<[^>]+>/g,'')).filter(x=>/Cách làm|Đi làm|: Đóng/.test(x)));
  if(await toastOn())F('Xem Dư đồ made a result card');if((await navLog()).length)F('nav logged '+JSON.stringify(await navLog()));
  const nvpLab=await p.evaluate(()=>{const e=document.querySelector('#panel .mspot[data-go="nvp"] .mlab')||[...document.querySelectorAll('#panel .mspot.mzone')].find(z=>/nvp/.test(z.dataset.mzk||''));return e?{t:e.innerText.replace(/\s+/g,' '),mb:!!e.querySelector('.kglmb'),fs:getComputedStyle(e).fontSize}:null});
  if(!nvpLab||!nvpLab.mb||!/Mua bán/.test(nvpLab.t))F('Mua bán not in the name slip '+JSON.stringify(nvpLab));
  const ring=await p.evaluate(()=>({tab,coach:!!document.querySelector('.ktut:not([hidden]), #ktut:not([hidden])'),q:Q.length,mark:[...document.querySelectorAll('#panel .mspot.kglban')].map(e=>e.dataset.go||e.dataset.zone),leg:(document.querySelector('#panel .kglleg')||{}).textContent||''}));
  if(ring.tab!=='go'||!ring.coach)F('map ring '+JSON.stringify(ring));if(!ring.mark.length||!/Mua bán/.test(ring.leg))F('mua bán marks '+JSON.stringify(ring));
  await shot('3-du-do-ring');
  await p.evaluate(()=>{try{kitCoachOff()}catch(e){}});await p.waitForTimeout(300);await shot('4-du-do-muaban');
  /* (2b) Đi tới from the link → arrives, shop opens */
  await p.evaluate(()=>{tab='act';render();kitGoalDetail()});await p.waitForTimeout(600);
  await p.evaluate(()=>{[...document.querySelectorAll('#modal [data-gl]')].find(x=>/Nội vụ phủ/.test(x.textContent)).click()});await p.waitForTimeout(600);
  await p.evaluate(()=>{const o=[...document.querySelectorAll('#modal .opt,#modal button')].find(e=>e.offsetParent&&/^Đi tới/.test(e.innerText.trim()));o.click()});await p.waitForTimeout(1200);
  await p.evaluate(()=>{if(Q[0]&&Q[0].t==='Chọn người theo hầu'){const b=[...document.querySelectorAll('#modal .opt,#modal button')].find(e=>e.offsetParent&&/^Đi một mình/.test(e.innerText.trim()));if(b)b.click()}});await p.waitForTimeout(2200);
  /* a random arrival happening («Kỳ ngộ», adHapArrive) may come first: the test clears it; the wares open once the queue is empty */
  await p.evaluate(()=>{if(Q[0]&&!Q[0].shop&&!(Q[0].kit&&Q[0].kit.shop)){Q.length=0;showModal()}});await p.waitForTimeout(1200);
  const go=await p.evaluate(()=>({shop:!![...document.querySelectorAll('.kshop[data-kshop="nvp"]')].find(e=>e.offsetParent),qt:Q.map(m=>m.t||(m.kit&&m.kit.title)).slice(0,3),place:S.place,ped:!!(S.visit&&S.visit.people.some(x=>x.kind==='peddler')),q:Q.length,title:(document.querySelector('#modal:not([hidden]) .kptitle')||{}).textContent||(Q[0]&&Q[0].t)||'',goalLeft:Q.some(m=>m.kit&&/Chương/.test(m.t||''))}));
  if(go.place!=='nvp'||!go.ped||!go.shop)F('đi tới '+JSON.stringify(go));
  const shopHead=await p.evaluate(()=>{const e=[...document.querySelectorAll('.kshop[data-kshop="nvp"]')].find(x=>x.offsetParent);const m=e&&e.closest('#modal,.kpanel,body');return m?m.innerText.replace(/\s+/g,' ').slice(0,300):''});
  if(/\?\?\?/.test(shopHead)||!shopHead.includes(ped.name))F('shop header not named '+shopHead.slice(0,160));
  if((await navLog()).length)F('Đi tới logged '+JSON.stringify(await navLog()));if(go.goalLeft)F('goal panel left behind '+JSON.stringify(go));
  await shot('5-di-toi');
  /* (4b) jgoal «Đi làm: …» (chapter detail) = navigation: no result card, no log line */
  await p.evaluate(()=>{Q.length=0;showModal();S.place='home';tab='act';render();kitGoalDetail()});await p.waitForTimeout(600);
  const dl=await p.evaluate(()=>{const o=[...document.querySelectorAll('#modal .opt,#modal button')].find(e=>e.offsetParent&&/^Đi làm/.test(e.innerText.trim()));if(o){o.click();return o.innerText.split('\n')[0]}return ''});await p.waitForTimeout(900);
  if(!dl)F('no Đi làm option');if(await toastOn())F('Đi làm made a result card');if((await navLog()).length)F('Đi làm logged '+JSON.stringify(await navLog()));
  await p.evaluate(()=>{try{kitCoachOff()}catch(e){}Q.length=0;showModal();kitGoalDetail()});await p.waitForTimeout(500);
  await p.evaluate(()=>{const o=[...document.querySelectorAll('#modal .opt,#modal button')].find(e=>e.offsetParent&&/^Đóng$/.test(e.innerText.trim().split('\n')[0]));if(o)o.click()});await p.waitForTimeout(700);
  if(await toastOn())F('Đóng made a result card');
  /* (5) Mệnh truyện tab line */
  await p.evaluate(()=>{Q.length=0;showModal();tab='story';render()});await p.waitForTimeout(900);
  const st=await p.evaluate(()=>[...document.querySelectorAll('#panel [data-gl]')].filter(e=>e.offsetParent).map(e=>e.textContent.trim().slice(0,60)));
  if(!st.length)F('Mệnh truyện tab has no goal link');
  await p.evaluate(()=>{const e=document.querySelector('#panel [data-gl]');if(e)e.scrollIntoView({block:'center'})});await shot('6-menh-truyen');
  if(errs.length)F('errors '+errs.join('|'));if(fails.length)bad++;
  console.log(wh,fails.length?'FAIL '+fails.join(' ;; '):'PASS',JSON.stringify({ped,links:L.map(x=>x.t.slice(0,50)),how:how.opts,ring:ring.mark,go,story:st}));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
