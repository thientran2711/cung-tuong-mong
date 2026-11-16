/* KIT §72 goal (jgoal) + tutorial start: new life → "Mệnh truyện kiếp này" card right after Nhập cung; goal icon in the stage rail (§77);
   tap → chapter detail; "Đi làm" → tab + ring; old save past week 2 → no goal card, no tour, no tips.
   usage: node dev/test/goal.js <url> <W>x<H> [shotdir] [origin=tt]   (prints JSON; exit 1 on a FAIL) */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,ORG]=process.argv;const [W,H]=SZ.split('x').map(Number);const fs=require('fs');if(OUT)fs.mkdirSync(OUT,{recursive:true});
const fails=[];const F=(m)=>fails.push(m);
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/${W}x${H}-${n}.jpg`,type:'jpeg',quality:55})};
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:200000});await p.waitForTimeout(1200);
 await p.evaluate(o=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear();localStorage.setItem('hclh-tut-test','1');localStorage.setItem('ctm-bgpause','1')}catch(e){}SLOT=1;window.__forceOrigin=o;document.getElementById('title').hidden=true;start();showModal()},ORG||'tt');
 await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});/* Luân hồi wheel (comes after a direct start()): hidden as in chap-label.js */
 const seen=[];let goalShot=false;
 for(let i=0;i<45;i++){await p.waitForTimeout(800);
  const r=await p.evaluate(()=>{document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>{const b=[...e.querySelectorAll('button')].filter(b=>b.offsetParent);if(b.length)b[b.length-1].click()});
   if(!Q.length)return null;const t=(document.querySelector('#modal .kptitle')||{}).textContent||Q[0].t;return {t,i:Q.findIndex(m=>m.goal),n:Q.map(m=>(m.t||(m.kit&&m.kit.title)||'').slice(0,30))}});
  if(!r){if(seen.length>1)break;continue}
  if(seen[seen.length-1]!==r.t)seen.push(r.t);
  if(/Mệnh truyện kiếp/.test(r.t)&&!goalShot){goalShot=true;await p.waitForTimeout(1500);await p.evaluate(()=>document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove()));
   const g=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg.kpanel');const r=d.getBoundingClientRect();return{art:!!document.querySelector('#modal .kpsubj.kpiart img'),band:!!document.querySelector('#modal #mb > .kdlgart'),fig:!!document.querySelector('#modal .kesimg'),rows:document.querySelectorAll('#modal .kpsec').length,inView:r.top>=0&&r.bottom<=innerHeight+1&&r.left>=0&&r.right<=innerWidth+1,ox:document.documentElement.scrollWidth>innerWidth}});
   if(!g.art)F('goal card: no picture left (event frame §8.2)');if(g.band)F('goal card: band on top (two pictures)');if(g.fig)F('goal card: loose figure column');if(g.rows<3)F('goal card: sections '+g.rows);if(g.ox)F('goal card: horizontal overflow');
   await shot('1-goalcard')}
  await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button.opt:not(.kdis), #modal #mr .kbtn, #modal .kph button')].find(b=>b.offsetParent);if(b)b.click()})}
 const iN=seen.findIndex(t=>/^Nhập cung/.test(t)),iG=seen.findIndex(t=>/Mệnh truyện kiếp/.test(t));
 if(iG<0)F('goal card never shown');else if(iN<0||iG!==iN+1)F('goal card not right after Nhập cung: '+seen.join(' > '));
 await p.waitForTimeout(1500);
 /* the tour (first life on this device) is now running: skip it for the strip checks */
 const tour=await p.evaluate(()=>({on:KTUT.on,step:KTUT.step,id:(KTUT_STEPS[KTUT.step]||{}).id,busy:KTUT.busy(),rec:JSON.stringify(KTUT.rec),fresh:KTUT.fresh,tt:S.tutTour,old:S.tutOld,ask:KTUT.ask,wd:navigator.webdriver,tf:localStorage.getItem('hclh-tut-test'),opt:typeof OPT!=='undefined'&&OPT.tut,vis:[...document.querySelectorAll('.modal,.kmov,.kbk,#modal,#ov,#dawn,#kload,#coopfz,#kpodov,#kupd')].filter(e=>e.getClientRects().length&&getComputedStyle(e).display!=='none'&&!e.hidden).map(e=>e.id+'.'+e.className).join(',')}));if(!tour.on)F('tour did not start after the goal card');
 await shot('2-tour');
 await p.evaluate(()=>{const s=document.querySelector('#ktut [data-ktut="skip"]');if(s)s.click()});await p.waitForTimeout(700);
 const st=await p.evaluate(()=>{const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return r.width?{x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)}:null};
  return{home:!!document.querySelector('.game.k3home'),rail:R(document.querySelector('#krail [data-rail=goal]')),strips:document.querySelectorAll('#kgoalst,.kgoal').length}});
 if(!st.rail)F('no goal icon in the stage rail (§77)');if(st.strips)F('a goal strip is still on screen');
 await shot('3-main');
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await p.click('#krail [data-rail=goal]');await p.waitForTimeout(1500);
 const d=await p.evaluate(()=>({t:(document.querySelector('#modal .kptitle')||{}).textContent,opts:[...document.querySelectorAll('#modal .opts button')].map(b=>b.innerText.split('\n')[0]),fig:!!document.querySelector('#modal .kesimg'),art:!!document.querySelector('#modal .kdlgart img')}));
 if(!/^Chương/.test(d.t||''))F('goal icon tap did not open chapter detail: '+d.t);if(!d.opts.length)F('detail: no Đi làm');
 await shot('4-detail');
 const okThinh=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button')].find(b=>/thỉnh an/i.test(b.innerText));if(b){b.click();return true}const a=document.querySelector('#modal .opts button');if(a)a.click();return false});
 await p.waitForFunction(()=>!!document.querySelector('#ktut:not([hidden]) .ktut-hole:not([hidden])'),null,{timeout:12000}).catch(()=>{});
 const ring=await p.evaluate(()=>({tab,ring:!!document.querySelector('#ktut:not([hidden]) .ktut-hole:not([hidden])')}));
 if(okThinh&&!ring.ring)F('Đi làm: no ring on the act card');
 await shot('5-dilam');
 await p.evaluate(()=>{try{kitCoachOff()}catch(e){}});
 /* old save past week 2: reload, load it (S.turn=1) → no goal card, no tour, no tips */
 await p.evaluate(()=>{S.turn=1;S.tuan=1;S.tutTour=0;S.tutOld=undefined;S.goalCard=0;try{localStorage.removeItem('hclh-tut')}catch(e){}save()});
 await p.reload({waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:200000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();localStorage.setItem('hclh-tut-test','1');SLOT=1;const s=loadSlot(1);if(s){deser(s);document.getElementById('title').hidden=true;render()}});
 await p.waitForTimeout(3500);const old=await p.evaluate(()=>({loaded:!!S&&S.turn===1,goal:Q.some(m=>m.goal),tour:KTUT.on,ask:KTUT.ask,tip:!!document.querySelector('#ktip'),old:S.tutOld}));
 if(!old.loaded)F('old save did not load');if(old.goal||old.tour||old.ask||old.tip)F('old save: '+JSON.stringify(old));
 console.log(JSON.stringify({vp:SZ,seen,tour,strip:st,detail:d,ring,old,errs,fails}));await b.close();process.exit(fails.length||errs.length?1:0)})();
