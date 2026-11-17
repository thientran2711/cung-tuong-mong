/* review/kit-ico-rank (KIT §59 K-ICO-2 · §77 K-ICO-1 · §77.1 K-ICO-3): placeholder pictures come from the set that fits their slot (orientation + size),
   rail icons = ico-cal / ico-goal, status icons = ico-download / ico-update (painted, no text glyph). No page errors, no horizontal overflow.
   usage: node dev/test/ico-ph.js <url> <outdir> [WxH@dpr,...]  → JSON per size + shots <outdir>/icoph-<size>-{acts,event,rail}.png; exit 1 on FAIL */
const {chromium}=require('playwright');const [,,URL,OUT,SZ]=process.argv;const sizes=(SZ||'755x1000@2,1180x820@2').split(',');
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;
 for(const sz of sizes){const [wh,dpr]=sz.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await sleep(3000);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__forceOrigin="thd";for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  await p.waitForFunction(()=>typeof EVART!=='undefined'&&EVART&&KIT_ACTS.acts&&Object.keys(KIT_ACTS.acts).length,null,{timeout:60000}).catch(()=>{});
  const R={size:sz};
  const settle=async()=>{for(let i=0;i<14;i++){const pend=await p.evaluate(()=>[...document.querySelectorAll('img[src*="/ph-"]')].some(im=>{const r=im.getBoundingClientRect();return r.width>8&&r.top<innerHeight&&r.bottom>0&&!(im.complete&&im.naturalWidth>0)}));if(!pend)break;await sleep(600)}};
  /* pure rule */
  const norm=x=>x.replace(/^.*\/img\/ph-|\.webp$/g,"");
  R.pick=await p.evaluate(()=>[[84,112],[120,160],[162,216],[192,96],[300,140],[560,200],[860,140],[56,56],[64,64],[72,72]].map(([w,h])=>kitPhPick(w,h,"light")));R.pick=R.pick.map(norm);
  R.pickOk=R.pick.join()==="p-light-ps,p-light-pm,p-light-pl,l-light-ls,l-light-lm,l-light-ll,w-light-ll,s-light-s56,s-light-s64,s-light-s72";
  /* every visible placeholder must be the file kitPhPick gives for its own slot */
  const scan=(root)=>p.evaluate((root)=>[...(root?([...document.querySelectorAll(root)].pop()||document):document).querySelectorAll('img[src*="/ph-"]')].map(im=>{const r=im.getBoundingClientRect();const q=r.width<8?im.parentElement.getBoundingClientRect():r;if(q.width<8||q.height<8)return null;
    const f=im.getAttribute("src"),tone=/dark/.test(f.replace(/^.*\/ph-/,""))?"dark":"light";const vis=q.bottom>0&&q.top<innerHeight&&q.right>0&&q.left<innerWidth;
    return{slot:Math.round(q.width)+"x"+Math.round(q.height),file:f.split("/").pop(),want:kitPhPick(q.width,q.height,tone).split("/").pop(),vis,ok:!vis||(im.complete&&im.naturalWidth>0)}}).filter(Boolean));
  /* rail + status */
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;try{KLOAD.testChip(12e6,635e6)}catch(e){}kitStatusIcon.set("upd",{title:"Có bản mới",order:20,icon:"img/kit/ico-update.webp",badge:()=>true,onTap:()=>{}});kitStatusIcon.refresh()});await sleep(1200);for(let i=0;i<14&&(await p.evaluate(()=>[...document.querySelectorAll('#krail img')].some(im=>!(im.complete&&im.naturalWidth>0))));i++)await sleep(600);
  R.rail=await p.evaluate(()=>[...document.querySelectorAll('#krail .krailb')].map(x=>({id:x.dataset.rail,img:(x.querySelector('img')||{}).src&&x.querySelector('img').getAttribute('src'),glyph:!!x.querySelector('.krailg')})));
  await p.screenshot({path:`${OUT}/icoph-${wh}-rail.png`});await p.evaluate(()=>{tab='act'});
  /* event dialogs: the first PEND builders that land on a placeholder */
  R.ev=[];let n=0;
  for(const id of await p.evaluate(()=>Object.keys(PEND))){if(n>=3)break;
   const got=await p.evaluate(async([id])=>{let Rv=[];try{Rv=liveRivals(true)}catch(e){};const v=Rv[0];for(const pp of [{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;
     Q.length=0;document.getElementById('modal').hidden=true;try{pushDil(mkP(id,pp),id);showModal()}catch(e){continue}return !!document.querySelector('#mb img[src*="/ph-"]')}return false},[id]);
   if(got){await sleep(1800);await settle();const L=await scan('#mb');if(L.length){n++;R.ev.push({id,imgs:L});if(n===1)await p.screenshot({path:`${OUT}/icoph-${wh}-event.png`})}}}
  /* acts */
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kcoach,.kcoach,.kcf,#kcf,.kflip,#kflip').forEach(e=>e.remove());try{S.tutDone=1}catch(e){}tab='act';deal();
   const L=pool().concat(deck);const xs=L.filter(a=>a&&a.n&&kitActArt(a.n).ph).slice(0,3);xs.forEach(x=>{if(!deck.some(a=>a.n===x.n))deck.unshift(Object.assign({},x,{done:false}))});render();const c=document.querySelector('#panel button.ka.kcard[data-kph]');});await p.evaluate(()=>{const b=[...document.querySelectorAll('#tabs button')].find(x=>/Hành sự/.test(x.textContent));if(b)b.click()});await sleep(1500);await p.evaluate(()=>{const c=document.querySelector('#panel button.ka.kcard[data-kph]');if(c)c.scrollIntoView({block:'center'})});await sleep(2500);for(let i=0;i<12&&(await p.evaluate(()=>[...document.querySelectorAll('#panel .kaart img')].some(im=>{const r=im.getBoundingClientRect();return r.width>8&&r.top<innerHeight&&r.bottom>0&&!(im.complete&&im.naturalWidth>0)})));i++)await sleep(700);
  R.actsDbg=await p.evaluate(()=>{const c=document.querySelector('#panel button.ka.kcard[data-kph]');const q=e=>{if(!e)return null;const r=e.getBoundingClientRect();return[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};return{n:document.querySelectorAll('#panel button.ka.kcard').length,kph:document.querySelectorAll('#panel button.ka.kcard[data-kph]').length,card:q(c),art:q(c&&c.querySelector('.kaart')),img:q(c&&c.querySelector('.kaart img')),panel:q(document.getElementById('panel')),tab:window.tab}});
  R.acts=await scan();
  await p.screenshot({path:`${OUT}/icoph-${wh}-acts.png`});
  R.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);R.errs=errs;
  const fails=[];if(!R.pickOk)fails.push("pick rule");if(!R.acts.length)fails.push("no act placeholder");if(!R.ev.length)fails.push("no event placeholder");
  const chk=(L,w)=>L.forEach(a=>{if(a.file!==a.want)fails.push(w+" slot "+a.slot+" got "+a.file+" want "+a.want);if(!a.ok)fails.push("img not loaded "+a.file)});chk(R.acts,"act");R.ev.forEach(e=>chk(e.imgs,"ev "+e.id));
  const ids=R.rail.map(x=>x.id);if(!R.rail.find(x=>x.id==="cal"&&/ico-cal\.webp$/.test(x.img)))fails.push("rail cal icon");if(R.rail.find(x=>x.id==="goal")&&!R.rail.find(x=>x.id==="goal"&&/ico-goal\.webp$/.test(x.img)))fails.push("rail goal icon");
  if(!R.rail.find(x=>x.id==="st-dl"&&/ico-download\.webp$/.test(x.img)))fails.push("dl icon");if(!R.rail.find(x=>x.id==="st-upd"&&/ico-update\.webp$/.test(x.img)))fails.push("upd icon");if(R.rail.some(x=>x.glyph))fails.push("text glyph left");
  if(R.hscroll)fails.push("h-overflow");if(errs.length)fails.push("page errors");R.fails=fails;if(fails.length)bad=1;console.log(JSON.stringify(R));await ctx.close()}
 await b.close();process.exit(bad)})();
