/* ACT-MOVE batch-2 walkthrough (ACT-MOVE-5): node dev/test/act-move-video2.js <W> <H> <name> → webm + shots in $OUT. Boot = act-move-video.js.
   Steps: Cung nhân card (info only, Tìm gặp) → her maid's stage pop-up (old card acts moved: Thêm cung nữ, Cài người…) → another palace's servant pop-up (Mua chuộc / Vu tội)
   → Hoàng tự card → kid pop-up (Dạy học / Chăm sóc…) → lãnh cung card → fallen pop-up «Ân xá» (hh, rank ≥ 7) → Emperor «Dâng lễ vật» → item picker opens on the item he values most.
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
 await p.evaluate(()=>{try{kc2SelOn=function(){return false}}catch(e){}AA.scen('hh')});await W8(1500);await FORCE();await W8(800);await FORCE();

 const CLOSEF=()=>p.evaluate(()=>{try{const F=kitFocus.current();if(F&&F.destroy)F.destroy()}catch(e){}popIdx=null;Q.splice(0);try{closeModal()}catch(e){}});
 const SUBT=re=>p.evaluate(re=>{const r=new RegExp(re);const b=[...document.querySelectorAll('button,[role=tab]')].filter(x=>x.offsetParent&&x.querySelectorAll('*').length<6&&r.test(x.textContent.trim())).pop();if(b){b.click();return b.textContent.trim()}return null},re);
 const SH=async(n,t)=>{await W8(t||2200);await p.screenshot({path:`${OUT}/${name}-${n}.png`});console.log('shot',n)};
 /* ACT-MOVE-6: on the iPad stage a mini-card shows one line; tap its «!» (kfoc-i) to show its full kit card (Tốn / Được / Thành) in the shot — never on Fold (the card is already whole) */
 const TAP=async(re,n)=>{if(W<1100)return;const r=await p.evaluate(re=>{const R=new RegExp(re);const el=[...document.querySelectorAll('#panel *,#stage *,body *')].filter(x=>x.offsetParent&&x.children.length===0&&R.test(x.textContent.trim())).pop();if(!el)return 'none';const c=el.closest('button,[data-o],.dfact,[role=button]')||el;const i=c.querySelector('.kfoc-i');(i||c).click();return (i?'i ':'')+c.tagName+'.'+c.className},re);console.log('tap',re,r);await SH(n,1800);await p.mouse.click(Math.round(W/2),142);await W8(600);console.log('pop left open',await p.evaluate(()=>!![...document.querySelectorAll('.khapp,.khap-pop,.kpopi,[class*=khapw]')].find(e=>e.offsetParent)))};/* a real tap outside closes the «!» card before the next step */
 const GO=k=>p.evaluate(k=>{Q.splice(0);try{closeModal()}catch(e){}used=0;S.confined=0;popIdx=null;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}tab="act";render();return S.place},k);
 const POP=pred=>p.evaluate(src=>{const f=new Function('p','return ('+src+')');const L=curPeople();const i=L.findIndex(x=>{try{return f(x)}catch(e){return false}});if(i<0)return 'none';try{if(!dfOpen(i)){}}catch(e){return 'err '+e.message}
   const o=(()=>{try{return talkOpts(L[i]).map(a=>a&&a.n).filter(Boolean)}catch(e){return []}})();return L[i].kind+' '+(L[i].name||'')+' | '+o.join(' · ')},String(pred));
 /* setup: hh life, Quyền Hoàng hậu rank, one consort in lãnh cung, two children, gifts in the chest */
 await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.queen&&!sameHouse(S,x));if(v)v.out=1;S.rank=Math.max(S.rank,7);try{S.kids.push(mkKid('m',4),mkKid('f',2))}catch(e){}
   const ks=Object.keys(IT).filter(k=>IT[k]&&Array.isArray(IT[k].tg)&&!IT[k].sl);const em=ks.filter(k=>IT[k].tg.includes('emp')).slice(0,2),ot=ks.filter(k=>!IT[k].tg.includes('emp')).slice(0,3);
   for(const k of ot.concat(em))S.inv.push({k});S.buoi=0;tab="staff";render()});for(let i=0;i<6;i++){await FORCE();await p.evaluate(()=>{document.querySelectorAll('.kfx,.kfxo,[class*=kfxg],[class*=kreveal],.kchestfx').forEach(e=>e.remove())});await p.mouse.click(Math.round(W/2),Math.round(H/2));await W8(500)}await FORCE();await p.evaluate(()=>{tab="staff";render()});
 await SH('1-staffcard');
 console.log('maid',await (async()=>{for(const bu of [0,1,2,3]){await p.evaluate(b=>{S.buoi=b},bu);await GO('home');if(await p.evaluate(()=>curPeople().some(x=>x.kind==='maid')))break}await FORCE();await p.evaluate(()=>{tab="act";render()});return POP("p.kind==='maid'")})());await SH('2-maidpop',3000);await TAP('^Thêm cung nữ$','2b-maidcard');
 /* another palace's servant on stage (kind npc with a servant ref) */
 const sv=await p.evaluate(()=>{for(const bu of [0,1,2])for(const v of rivals){if(!v.alive||v.out||sameHouse(S,v)||!accessOf(S,palaceOf(v)).ok)continue;const k=palaceOf(v);S.buoi=bu;Q.splice(0);used=0;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}
   if(S.place===k&&curPeople().some(x=>x.kind==='npc'&&amOldBtns(x).some(b=>/Mua chuộc|Vu tội|Bắt quỳ/.test(b.n))))return k+'@'+bu}return null});
 await FORCE();await p.evaluate(()=>{tab="act";render()});console.log('svpal',sv,await POP("p.kind==='npc'&&amOldBtns(p).some(b=>/Mua chuộc|Vu tội|Bắt quỳ/.test(b.n))"));await W8(2500);console.log('subtab',await SUBT('^Hại người'));await SH('3-servantpop',1500);await TAP('^Mua chuộc$','3b-servcard');
 await CLOSEF();await p.evaluate(()=>{Q.splice(0);try{closeModal()}catch(e){}S.buoi=0;tab="kid";render()});await FORCE();await p.evaluate(()=>{tab="kid";render()});await SH('4-kidcard');
 const kid=await p.evaluate(()=>{for(const bu of [0,1,2,3]){S.buoi=bu;Q.splice(0);used=0;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo('home')}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}if(curPeople().some(x=>x.kind==='kid'))return bu}return -1});
 await FORCE();await p.evaluate(()=>{tab="act";render()});console.log('kid buoi',kid,await POP("p.kind==='kid'"));await W8(2500);console.log('subtab',await SUBT('^Chăm con'));await SH('5-kidpop',1500);
 await CLOSEF();await p.evaluate(()=>{Q.splice(0);try{closeModal()}catch(e){}S.buoi=0;tab="rv";render();const v=rivals.find(x=>x.out&&x.alive);if(v){const nm=v.name.split(' ').slice(-2).join(' ');const b=[...document.querySelectorAll('#panel button')].find(x=>x.textContent.includes(nm)&&/data-pg|data-pgi|pgsel/.test(x.outerHTML));if(b)b.click()}});await SH('6-lccard',2500);
 await p.evaluate(()=>{const b=document.querySelector('#panel .kppbtns button[data-go="lc"],#panel button[data-go="lc"]');if(b&&!b.disabled)b.click()});await W8(2000);
 if(await p.evaluate(()=>S.place!=='lc'))await GO('lc');await FORCE();await p.evaluate(()=>{tab="act";render()});console.log('fallen',await POP("p.kind==='fallen'"));await SH('7-fallenpop',3000);await TAP('^Ân xá$','7b-fallencard');
 await CLOSEF();
 /* ACT-MOVE-6 native-option law-3 family: a rival's pop-up (Hại người: Dò la / Đẩy con nàng xuống hồ), her chest (Lấy trộm son phấn), the Emperor (Chặn ngự giá / Xin ân điển) */
 const rv=await p.evaluate(()=>{for(const bu of [0,1,2])for(const v of rivals){if(!v.alive||v.out||sameHouse(S,v)||!accessOf(S,palaceOf(v)).ok)continue;const k=palaceOf(v);S.buoi=bu;Q.splice(0);used=0;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}
   if(S.place===k&&curPeople().some(x=>x.kind==='rival'))return k+'@'+bu}return null});
 await FORCE();await p.evaluate(()=>{tab="act";render()});console.log('rival',rv,await POP("p.kind==='rival'"));await W8(2500);console.log('subtab',await SUBT('^Mưu kế'));await SH('7c-rivalpop',1500);await TAP('^Dò la$','7d-rivalcard');
 await CLOSEF();await FORCE();console.log('chest',await POP("p.kind==='chest'"));await W8(2500);console.log('subtab',await SUBT('^Mưu kế'));await SH('7e-chestpop',1500);await TAP('^Lấy trộm son phấn$','7f-chestcard');
 await CLOSEF();await p.evaluate(()=>{Q.splice(0);try{closeModal()}catch(e){}S.buoi=0;used=0;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo('thu')}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}if(!curPeople().some(x=>x.kind==='emp')){S.visit.people.push({kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:""})}tab="act";render()});await FORCE();
 console.log('emp',await POP("p.kind==='emp'"));await W8(2500);console.log('subtab',await SUBT('^Tranh sủng'));await SH('7g-emppop',1500);await TAP('^Chặn ngự giá$','7h-empcard');await CLOSEF();
 /* Emperor: Dâng lễ vật → Dâng quà trong rương → picker, his most valued item preselected */
 await p.evaluate(()=>{Q.splice(0);try{closeModal()}catch(e){}S.buoi=0;used=0;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo('thu')}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}if(!curPeople().some(x=>x.kind==='emp')){S.visit.people.push({kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:""})}tab="act";render()});await FORCE();await p.evaluate(()=>{tab="act";render()});
 await p.evaluate(()=>{const i=curPeople().findIndex(x=>x.kind==='emp');try{if(typeof kitFocus==='object'&&kitFocus.close)kitFocus.close()}catch(e){}doorOpen(curPeople()[i],'dl')});await SH('8-dangle',2500);
 const pick=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button')].find(x=>/Dâng quà trong rương/.test(x.textContent)&&!x.disabled);if(b)b.click();return !!b});await W8(2500);
 console.log('picker',pick,await p.evaluate(()=>{const on=document.querySelector('#modal .kipc.on .kshn');const m=Q[0];const best=m&&m.opts&&m.opts.find(o=>o.kgbest);return (on?on.textContent:'-')+' / best '+(best?best.n:'-')}));await SH('9-picker',800);
 const vp=await p.video().path();await ctx.close();await b.close();console.log('video',vp,'perr',perr.length,perr.slice(0,3).join('|'))})();
