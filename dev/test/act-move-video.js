/* ACT-MOVE walkthrough (WIP, ACT-MOVE-2 rolled before it was clean): node dev/test/act-move-video.js <W> <H> <name> → webm + 7 shots in $OUT.
   KNOWN GAP: AA.scen lands in the tú-nữ selection intro (kmov story cards) — boot like dev/test/cfglow2-r2-video.js (SLOT, start, isSrv loop, skip roulette, click .kmov) before the steps. Shots stay OUT of git. */
const fs=require('fs'),path=require('path');const ROOT=require('path').resolve(__dirname,'../..');const OUT=process.env.OUT||'/home/user/wt/act-move-shots';
const {chromium}=require('playwright');const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [W,H,name]=[+process.argv[2],+process.argv[3],process.argv[4]];
(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,recordVideo:{dir:OUT,size:{width:W,height:H}},serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto('file://'+ROOT+'/dev/index.html',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});await p.evaluate(LIB);const W8=ms=>p.waitForTimeout(ms);
 /* boot like dev/test/cfglow2-r2-video.js: accept the Luân hồi card, skip the roulette, click through every story card (kmov) until kmBusy/KMQ are empty */
 const CLEAN=async()=>{for(let i=0;i<80;i++){const busy=await p.evaluate(()=>{let x=0;const kl=document.getElementById('kload');if(kl)kl.remove();
   const nl=document.querySelector('button[data-nl="ok"]');if(nl){nl.click();x=1}
   const r=document.querySelector('[id^=kroul],.kroul,.kbd-roulette');if(r){const bs=[...r.querySelectorAll('button')];const b=bs.find(y=>/Bỏ qua/.test(y.textContent))||bs.find(y=>/Tiếp|Vào|Nhập/.test(y.textContent))||bs[0];if(b)b.click();else r.click();x=1}
   const o=document.querySelector('.kmov');if(o){o.click();const kb=o.querySelector('.kmend');if(kb)kb.click();x=1}
   const s=[...document.querySelectorAll("#modal button")].find(b=>/^(Bỏ qua|Nhận|Đóng|Tiếp|Được)$/.test(b.textContent.trim())&&b.offsetParent);if(s){s.click();x=1}
   const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}
   return x||(typeof NLP!=='undefined'&&!!NLP)||(typeof kmBusy!=='undefined'&&kmBusy)||(typeof KMQ!=='undefined'&&KMQ.length>0)});if(!busy)break;await W8(500)}
  await p.evaluate(()=>{Q.splice(0);try{closeModal()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('[id^=kroul],.kroul,.kmov').forEach(e=>e.remove());if(window.KMQ)KMQ.length=0})};
 /* not a tú nữ: the selection (kc2SelOn → the 3 selection days) is skipped, so she starts as a palace consort; then the new-life intro
    (Luân hồi roulette, NLP card, edict story cards) is cleared the way cfglow2-r2-video.js does (CLEAN), forced: the walkthrough starts in her palace */
 const FORCE=()=>p.evaluate(()=>{try{NLP=null}catch(e){}try{kmBusy=false}catch(e){}if(window.KMQ)KMQ.length=0;document.querySelectorAll('.kmov,[id^=kroul],.kroul,#kload').forEach(e=>e.remove());
   const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}Q.splice(0);try{closeModal()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;render()});
 await p.evaluate(()=>{try{kc2SelOn=function(){return false}}catch(e){}AA.scen('cao')});await W8(1500);await FORCE();await W8(800);await FORCE();
 const vname=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.out&&!sameHouse(S,x)&&!x.queen&&k61Named(x)&&whereOf(x)!==palaceOf(x)&&accessOf(S,palaceOf(x)).ok);tab="rv";render();return v&&v.name});
 await W8(1200);await p.screenshot({path:`${OUT}/${name}-0-boot.png`});
 // pick her in the person picker
 await p.evaluate(n=>{const i=rivals.findIndex(x=>x.name===n);const b=[...document.querySelectorAll('#panel button')].find(x=>x.textContent.includes(n.split(' ').pop())&&/data-pg|data-pgi|pgsel/.test(x.outerHTML));if(b)b.click()},vname);await W8(2500);
 await p.screenshot({path:`${OUT}/${name}-1-card.png`});
 // Ghé cung
 await p.evaluate(()=>{const b=document.querySelector('#panel button[data-visit]');if(b)b.click()});await W8(2000);
 for(let i=0;i<4;i++){await p.evaluate(()=>{const m=document.getElementById('modal');if(m&&!m.hidden){const o=[...m.querySelectorAll('button:not([disabled])')].find(b=>!/✕|Đóng|Thôi/.test(b.textContent));if(o)o.click()}});await W8(1500)}
 /* fallback: if the walk did not land (companion pick / event), walk there the same way the robot does */
 await p.evaluate(n=>{const v=rivals.find(x=>x.name===n);if(v&&S.place!==palaceOf(v)){Q.splice(0);used=0;window.__j77etq=1;window.__accStay=1;try{goTo(palaceOf(v))}finally{window.__j77etq=0;window.__accStay=0}}},vname);
 await FORCE();await p.evaluate(()=>{tab="act";render()});await W8(2000);
 await p.screenshot({path:`${OUT}/${name}-2-palace.png`});
 // tap her chest / her
 await p.evaluate(n=>{const i=curPeople().findIndex(x=>x.ref&&x.ref.name===n);const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);if(t)t.click();else if(i>=0&&typeof dfOpen==='function')dfOpen(i)},vname);await W8(3000);
 await p.screenshot({path:`${OUT}/${name}-3-pop.png`});
 await p.evaluate(n=>{const i=curPeople().findIndex(x=>x.ref&&x.ref.name===n);const pp=curPeople()[i];if(pp){try{if(typeof kitFocus==='object'&&kitFocus.close)kitFocus.close()}catch(e){}doorOpen(pp,'P10')}},vname);await W8(3000);
 await p.screenshot({path:`${OUT}/${name}-4-door.png`});
 // Emperor
 await FORCE();
 await p.evaluate(()=>{Q.splice(0);try{closeModal()}catch(e){}used=0;window.__j77etq=1;window.__accStay=1;try{goTo('thu')}finally{window.__j77etq=0;window.__accStay=0}if(!curPeople().some(x=>x.kind==='emp')){S.visit.people.push({kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:""});render()}tab="act";render()});await W8(1500);await FORCE();await p.evaluate(()=>{tab="act";render()});await W8(1500);
 console.log('emp step',await p.evaluate(()=>{const i=curPeople().findIndex(x=>x.kind==='emp');try{dfOpen(i)}catch(e){return 'dfOpen '+e.message}return S.place+' i='+i+' pop='+popIdx}));await W8(3000);
 await p.screenshot({path:`${OUT}/${name}-5-emp.png`});
 await p.evaluate(()=>{const i=curPeople().findIndex(x=>x.kind==='emp');try{if(typeof kitFocus==='object'&&kitFocus.close)kitFocus.close()}catch(e){}doorOpen(curPeople()[i],'pho')});await W8(3000);
 await p.screenshot({path:`${OUT}/${name}-6-hiennghe.png`});
 // Chí tôn card
 await FORCE();
 await p.evaluate(()=>{Q.splice(0);try{closeModal()}catch(e){}tab="court";render()});await W8(2500);
 await p.screenshot({path:`${OUT}/${name}-7-chiton.png`});
 const vp=await p.video().path();await ctx.close();await b.close();console.log('video',vp,'perr',perr.length,perr.slice(0,3).join('|'),'v',vname)})();
