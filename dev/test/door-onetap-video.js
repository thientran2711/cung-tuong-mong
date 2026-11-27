/* DOOR-ONETAP LOOK walkthrough: node dev/test/door-onetap-video.js <W> <H> <name> → webm + 10 shots in $OUT (outside git).
   Steps: her pop-up doors (odds word on each) → ONE tap «Trò chuyện» → TIER card «Hãm hại» → nhẹ → Emperor «Hiến nghệ» → Hành sự deck doors → tier card → result. */
const fs=require('fs'),path=require('path');const ROOT=require('path').resolve(__dirname,'../..');const OUT=process.env.OUT||'/home/user/wt/door-onetap-shots';
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

 const SKIP=async()=>{for(let i=0;i<3;i++){const c=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&!x.disabled).find(x=>/^Bỏ qua/.test(x.textContent.trim()));if(b){b.click();return 1}return 0});if(!c)break;await W8(1200)}};
 const CLOSEF=()=>p.evaluate(()=>{try{if(typeof kitFocus==='object'&&kitFocus.close)kitFocus.close()}catch(e){}document.querySelectorAll('.kfoc').forEach(e=>e.remove());Q.splice(0);try{closeModal()}catch(e){}popIdx=null;render()});
 const SHOT=async(k)=>{await p.screenshot({path:`${OUT}/${name}-${k}.png`})};
 /* click a visible button whose title starts with t (the real UI tap); returns false if none */
 const TAP=t=>p.evaluate(t=>{const B=[...document.querySelectorAll('button')].filter(b=>b.offsetParent&&!b.disabled);const b=B.find(x=>x.textContent.replace(/\s+/g,' ').trim().replace(/^\W+/,'').startsWith(t));if(b){b.scrollIntoView({block:'center'});b.click();return true}return false},t);
 let vname=await p.evaluate(()=>{const go=k=>{Q.splice(0);used=0;window.__j77etq=1;window.__accStay=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0}};
  for(const v of rivals){if(!v||!v.alive||v.out||sameHouse(S,v)||v.queen||!k61Named(v))continue;go(whereOf(v));if(curPeople().some(x=>x.ref===v&&x.kind!=='chest')){tab="act";render();return v.name}}return null});
 await W8(1500);await FORCE();await p.evaluate(()=>{tab="act";render()});await W8(1200);await SHOT('0-place');
 const openHer=()=>p.evaluate(n=>{const i=curPeople().findIndex(x=>x.ref&&x.ref.name===n&&x.kind!=='chest');const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);if(t)t.click();else if(i>=0&&typeof dfOpen==='function')dfOpen(i);return i},vname);
 console.log('her',vname,await openHer());await W8(2500);await SHOT('1-pop-doors');
 /* ONE: Trò chuyện (one tap → result names the real topic) */
 let ok=await TAP('Trò chuyện');if(!ok)await p.evaluate(n=>{const i=curPeople().findIndex(x=>x.ref&&x.ref.name===n&&x.kind!=='chest');if(i<0)return;popIdx=i;const A=talkOpts(curPeople()[i]);const j=A.findIndex(a=>a.door==='talk');if(j>=0)talk(j)},vname);
 await W8(900);await SHOT('2a-one-tap');await SKIP();await W8(1500);await SHOT('2-one-result');console.log('one',await p.evaluate(()=>ONE.last&&JSON.stringify(ONE.last)));
 await CLOSEF();
 /* TIER: Hãm hại → card nhẹ · vừa · nặng → nhẹ */
 await FORCE();await p.evaluate(()=>{AA.scen('cao')});await W8(800);await FORCE();
 await p.evaluate(n=>{const go=k=>{Q.splice(0);used=0;window.__j77etq=1;window.__accStay=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0}};let v=rivals.find(x=>x&&x.name===n);if(v)go(whereOf(v));if(!v||!curPeople().some(x=>x.ref===v&&x.kind!=='chest'))for(const w of rivals){if(!w||!w.alive||w.out||sameHouse(S,w)||!k61Named(w))continue;go(whereOf(w));if(curPeople().some(x=>x.ref===w&&x.kind!=='chest')){window.__vn=w.name;break}}tab="act";render()},vname);await W8(1200);await FORCE();
 {const n2=await p.evaluate(()=>window.__vn||null);if(n2)vname=n2}await openHer();await W8(2000);await TAP('Hại người');await W8(800);ok=await TAP('Hãm hại');
 if(!ok)await p.evaluate(n=>{const i=curPeople().findIndex(x=>x.ref&&x.ref.name===n&&x.kind!=='chest');const pp=curPeople()[i];if(pp){try{if(typeof kitFocus==='object'&&kitFocus.close)kitFocus.close()}catch(e){}doorOpen(pp,'P7')}},vname);
 await W8(1800);/* the card plays IN the scene (jdfv encounter): her say line, a tap, then the choice rows */
 for(let i=0;i<4;i++){const has=await p.evaluate(()=>[...document.querySelectorAll('button')].some(x=>x.offsetParent&&/· (nhẹ|vừa|nặng)/.test(x.textContent)));if(has)break;await p.evaluate(()=>{const s=document.querySelector('.kfoc-say');if(s&&s.offsetParent)s.click()});await W8(1200)}
 await SHOT('3-tier-card');
 ok=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&!x.disabled).find(x=>/· nhẹ/.test(x.textContent));if(b){b.click();return true}return false});
 await W8(1500);await SKIP();await W8(1800);await SHOT('4-tier-result');console.log('tier',ok,await p.evaluate(()=>ONE.last&&JSON.stringify(ONE.last)));
 await CLOSEF();
 /* Emperor: Hiến nghệ (one tap) */
 await FORCE();console.log('emp go',await p.evaluate(()=>{Q.splice(0);try{closeModal()}catch(e){}const go=k=>{Q.splice(0);used=0;window.__j77etq=1;window.__accStay=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0}};
  for(let t=0;t<12;t++){for(const k of [S.where&&S.where.emp,'thu','vuon','home'].filter(Boolean)){go(k);if(curPeople().some(x=>x.kind==='emp')){tab="act";render();return S.place}}S.buoi=(S.buoi+1)%3}return 'none '+S.place}));await W8(1500);await FORCE();
 console.log('emp at',await p.evaluate(()=>{let i=curPeople().findIndex(x=>x.kind==='emp');if(i<0&&S.visit){S.visit.people.push({kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:""});render();i=curPeople().findIndex(x=>x.kind==='emp')}const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);try{if(t)t.click();else if(i>=0)dfOpen(i)}catch(e){return 'err '+e.message}return S.place+' '+i}));await W8(2500);await SHOT('5-emp-doors');
 ok=await TAP('Hiến nghệ');if(!ok)await p.evaluate(()=>{const i=curPeople().findIndex(x=>x.kind==='emp');popIdx=i;const A=talkOpts(curPeople()[i]);const j=A.findIndex(a=>a.door==='pho');if(j>=0)talk(j)});
 await W8(1200);await SKIP();await W8(1800);await SHOT('6-hiennghe-result');console.log('emp',await p.evaluate(()=>ONE.last&&JSON.stringify(ONE.last)));
 await CLOSEF();
 /* Hành sự deck: one-tap card + tier card */
 await FORCE();await p.evaluate(()=>{AA.scen('cao');S.ill={k:Object.keys(ILL)[0],st:2,at:wk()};deal();tab="act";render();AA.show(AA.surfaces().find(x=>x.id==="act"))});await W8(1500);await FORCE();
 await p.evaluate(()=>{AA.show(AA.surfaces().find(x=>x.id==="act"));const b=document.querySelector('#panel button[data-ddoor]');if(b)b.scrollIntoView({block:'center'})});await W8(1500);await SHOT('7-hanhsu-doors');
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#panel button[data-ddoor]:not([disabled])')].find(x=>x.dataset.ddoor==='Tai mắt')||document.querySelector('#panel button[data-ddoor]:not([disabled])');if(b)b.click()});await W8(2500);await SHOT('8-hanhsu-tier');
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button')].filter(x=>x.offsetParent&&!x.disabled).find(x=>/· (nhẹ|vừa)/.test(x.textContent));if(b)b.click()});await W8(1200);await SKIP();await W8(1800);await SHOT('9-hanhsu-result');console.log('deck',await p.evaluate(()=>ONE.last&&JSON.stringify(ONE.last)));
 const vp=await p.video().path();await ctx.close();await b.close();console.log('video',vp,'perr',perr.length,perr.slice(0,3).join('|'))})();
