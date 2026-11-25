/* Co-op playtest "như hai người thật": taps the real buttons, shoots every step, measures cut text / small buttons / overflow.
   usage: node dev/test/coop-play.js <outdir> [base] [hostVP] [guestVP] [workerURL]
     base   "local" (dev/index.html via coop-serve, default) or a URL (e.g. https://thientran2711.github.io/cung-tuong-mong/)
     VP     WxH@dpr, default host 755x1000@2, guest 1180x820@2
   Flow: title → Chơi cùng bạn → Mời bạn (copy code) → guest Chơi cùng bạn → Nhập mã (types the code) → Vào phòng →
   both choose a thân phận → same world → guest walks to the host's place → Kết giao / Tặng quà (invite card) + Dò la →
   Qua buổi ×3 (one week) → guest drops (closes) → host "Đợi bạn trở lại" → guest back by link → save/load solo. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||'/tmp/coop-play');fs.mkdirSync(OUT,{recursive:true});
const SITE=!process.argv[3]||process.argv[3]==='local'?BASE:process.argv[3];
const vp=s=>{const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(s);return[+m[1],+m[2],+m[3]]};
const VA=vp(process.argv[4]||'755x1000@2'),VB=vp(process.argv[5]||'1180x820@2');
const WURL=process.argv[6]||'https://ctm-coop.victoria-tntt.workers.dev';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const notes=[];const note=(o,m)=>{const s=(o?o.name+': ':'')+m;if(!notes.includes(s)){notes.push(s);console.log('NOTE '+s)}};
async function mk(b,name,v){const ctx=await b.newContext({viewport:{width:v[0],height:v[1]},deviceScaleFactor:v[2],hasTouch:true,isMobile:v[0]<1100,reducedMotion:'reduce'});
 if(SITE===BASE)await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
 await ctx.grantPermissions(['clipboard-read','clipboard-write']).catch(()=>{});
 const o={ctx,name,errs:[],n:0};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
/* audit: horizontal overflow, cut text (ellipsis / clipped), tap targets under 40 px, Hán characters, "%" in visible text */
async function audit(o,tag){const r=await o.p.evaluate(()=>{const out={ov:document.documentElement.scrollWidth>innerWidth+1,cut:[],small:[],han:[],pct:[]};
 const vis=e=>{const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return false;const cs=getComputedStyle(e);return cs.visibility!=='hidden'&&cs.display!=='none'&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};
 const top=[...document.querySelectorAll('#modal:not([hidden]), #coopfz, #title:not([hidden])')].filter(vis);const roots=top.length?top:[document.body];
 for(const R of roots)for(const e of R.querySelectorAll('*')){if(!vis(e))continue;const cs=getComputedStyle(e);const t=(e.innerText||'').trim();
  if(t&&e.children.length===0){if((cs.textOverflow==='ellipsis'||cs.overflow==='hidden'||cs.overflowX==='hidden')&&(e.scrollWidth>e.clientWidth+1))out.cut.push(t.slice(0,40));
   if(/[一-鿿]/.test(t)&&!e.closest('.kpseal,.ini,[class*=seal]'))out.han.push(t.slice(0,20));if(/\d\s?%/.test(t))out.pct.push(t.slice(0,30))}
  if(e.matches('button,[role=button],a.kbtn,input')){const b=e.getBoundingClientRect();if(b.height<40||b.width<40)out.small.push((e.innerText||e.value||e.className).trim().slice(0,24)+' '+Math.round(b.width)+'x'+Math.round(b.height))}}
 return out});
 if(r.ov)note(o,tag+': tràn ngang');if(r.cut.length)note(o,tag+': chữ cắt '+JSON.stringify(r.cut.slice(0,4)));if(r.small.length)note(o,tag+': nút nhỏ '+JSON.stringify(r.small.slice(0,4)));
 if(r.han.length)note(o,tag+': chữ Hán '+JSON.stringify(r.han.slice(0,3)));if(r.pct.length)note(o,tag+': % '+JSON.stringify(r.pct.slice(0,3)));return r}
async function shot(o,tag){await o.p.waitForTimeout(500);o.n++;const f=`${String(o.n).padStart(2,'0')}-${tag}-${o.name}.png`;try{await o.p.screenshot({path:path.join(OUT,f),timeout:60000})}catch(e){note(o,'shot '+tag+' '+e.message.split('\n')[0])}await audit(o,tag);return f}
async function tap(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){await el.tap().catch(()=>el.click());return true}await sleep(250)}return false}
const vis=o=>o.p.evaluate(()=>{const m=document.getElementById('modal');const fz=document.getElementById('coopfz');
 const t=x=>x?(x.querySelector('.kptitle')||{}).textContent||'':'';return{modal:m&&!m.hidden?t(m):'',fz:fz?t(fz):'',btns:[...document.querySelectorAll('#modal:not([hidden]) button, #coopfz button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim().slice(0,30)),
  next:(document.getElementById('next')||{}).textContent,nd:(document.getElementById('next')||{}).disabled,S:typeof S!=='undefined'&&S?{n:S.name,b:S.buoi,pl:S.place,d:[S.year,S.month,S.tuan]}:null}});
/* read/close the game's dialogs, taking the first option (shoot the first time each title is seen) */
const seenT=new Set();
async function clear(o,n=30){for(let i=0;i<n;i++){if(await require('./lib/coop-clear.js').tap(o)==='x'){await sleep(200);continue}const v=await vis(o);if(v.fz)return'fz';if(!v.modal)return'';if(await o.p.evaluate(()=>{const t=document.getElementById('title');return !!(t&&!t.hidden)}))return'title';
  if(/^(Đợi bạn|Mời bạn|Nhập mã|Chơi cùng bạn)$/.test(v.modal.trim()))return'wait';
  const key=v.modal.trim();if(!seenT.has(o.name+key)){seenT.add(o.name+key);await shot(o,'dlg-'+key.replace(/[^\p{L}\d]+/gu,'_').slice(0,24))}
  const ok=await o.p.evaluate(()=>{const m=document.getElementById('modal');const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null&&!x.dataset.coop);
   const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return true}return false});
  if(!ok)return'stuck';await sleep(300)}return'many'}
const friend=o=>o.p.evaluate(()=>{const f=(rivals||[]).find(v=>v.coop)||(rivals||[]).flatMap(v=>v.staff||[]).find(x=>x.coop);if(!f)return null;
 return{name:f.name,id:f.id,st:typeof k61St==='function'?k61St(f):null,at:S.where&&S.where[f.id],me:S.place||'home'}});
(async()=>{const b=await chromium.launch();const A=await mk(b,'host',VA),B=await mk(b,'guest',VB);const log=[];
 const step=async(m,f)=>{console.log('== '+m);try{await f()}catch(e){note(null,'step "'+m+'" lỗi: '+e.message.split('\n')[0])}};
 let code='';
 await step('title',async()=>{await A.page();await A.p.goto(SITE,{waitUntil:'domcontentloaded'});await A.p.waitForTimeout(3500);await shot(A,'title')});
 await step('Chơi cùng bạn',async()=>{if(!await tap(A,/^(Chơi cùng bạn|Cùng hảo hữu)/))note(A,'không thấy nút Chơi cùng bạn');await A.p.waitForTimeout(700);await shot(A,'co-menu')});
 await step('Mời bạn',async()=>{await tap(A,/^(Mời bạn|Mời hảo hữu)/);await A.p.waitForFunction(()=>window.COOP&&COOP.code,null,{timeout:20000});code=await A.p.evaluate(()=>COOP.code);await A.p.waitForTimeout(500);await shot(A,'invite');
  const c=await tap(A,/^Chép/,2000);const clip=c?await A.p.evaluate(()=>(navigator.clipboard?navigator.clipboard.readText().catch(()=>''):'noclip')):'';log.push('clipboard '+clip);
  await A.p.waitForTimeout(300);await shot(A,'invite-copied');if(!c)note(A,'không có nút Chép');});
 await step('guest Nhập mã',async()=>{await B.page();await B.p.goto(SITE,{waitUntil:'domcontentloaded'});await B.p.waitForTimeout(3500);await tap(B,/^(Chơi cùng bạn|Cùng hảo hữu)/);await B.p.waitForTimeout(500);
  await tap(B,/^Nhập mã/);await B.p.waitForTimeout(500);await shot(B,'join');
  const inp=await B.p.$('#coop-code');if(!inp)note(B,'không có ô Mã phòng');else{await inp.tap();await B.p.keyboard.type(code.toLowerCase());await shot(B,'join-typed')}
  await tap(B,/^Vào phòng/);await B.p.waitForTimeout(2500);await shot(B,'joined');await shot(A,'friend-in')});
 await step('chọn thân phận',async()=>{for(let i=0;i<40;i++){const a=await vis(A),c=await vis(B);log.push('A '+JSON.stringify(a).slice(0,200));log.push('B '+JSON.stringify(c).slice(0,200));
   for(const o of [A,B])await o.p.evaluate(()=>{const b=[...document.querySelectorAll("button")].find(x=>x.offsetParent&&!x.closest("#modal,#panel,#tabs")&&/^(Tiếp|Bỏ qua)$/.test(x.textContent.trim()));if(b)b.click()});const lh=await A.p.evaluate(()=>!!document.querySelector(".kroul:not([hidden]),.nl:not([hidden])"));if(a.S&&c.S&&a.S.n&&c.S.n&&!a.modal&&!c.modal&&!lh)break;await clear(A,1);await clear(B,1);await sleep(500)}
  await shot(A,'in-world');await shot(B,'in-world')});
 const fa=await friend(A).catch(()=>null),fb=await friend(B).catch(()=>null);log.push('friendA '+JSON.stringify(fa));log.push('friendB '+JSON.stringify(fb));
 await step('same NPCs',async()=>{const g=o=>o.p.evaluate(()=>({era:S.emp.era,R:rivals.filter(v=>!v.coop).map(v=>v.name).join(),W:JSON.stringify(Object.fromEntries(Object.entries(S.where||{}).filter(([k])=>k!=='901'&&k!=='902')))}));
  const a=await g(A),c=await g(B);if(a.era!==c.era||a.R!==c.R)note(null,'NPC khác nhau');if(a.W!==c.W)note(null,'chỗ đứng NPC khác nhau (đầu buổi)');log.push('sameNPC '+(a.R===c.R)+' where '+(a.W===c.W))});
 /* the guest goes to where the host is (a public place: both go to Ngự hoa viên) through the map */
 await step('gặp nhau',async()=>{for(const o of [A,B]){await o.p.evaluate(()=>{try{goTo('vuon')}catch(e){console.log('goTo',e.message)}});await o.p.waitForTimeout(800);await clear(o,6)}
  await sleep(1500);await shot(A,'vuon');await shot(B,'vuon');log.push('at vuon A '+JSON.stringify(await friend(A))+' B '+JSON.stringify(await friend(B)))});
 await step('mời / tặng / chuyện trò',async()=>{/* open the friend's card on the stage */
  const r=await A.p.evaluate(()=>{const f=rivals.find(v=>v.coop);const P=(S.visit&&S.visit.people)||[];return{here:P.map(p=>p.name+':'+(p.ref&&p.ref.coop?'F':'')),fid:f&&f.id}});log.push('A people '+JSON.stringify(r));
  const opened=await A.p.evaluate(()=>{const el=[...document.querySelectorAll('[data-pi],[data-p],.kfig,.fig,.who,.ppl button')].find(e=>/Người lạ/.test(e.textContent||e.getAttribute('aria-label')||''));if(el){el.click();return el.className}return''});
  log.push('opened '+opened);await A.p.waitForTimeout(800);await shot(A,'friend-card');
  /* Chào hỏi from both sides, then a gift (invite card on the other side), then Dò la */
  log.push('A chao '+await tap(A,/^Chào hỏi/,3000));await A.p.waitForTimeout(800);await clear(A,4);await shot(A,'after-chao');
  const openF=o=>o.p.evaluate(()=>{const f=rivals.find(v=>v.coop);const el=[...document.querySelectorAll('.tok,.fig,[data-pi]')].find(e=>/Người lạ/.test(e.textContent||'')||(f&&(e.textContent||'').includes(f.name)));if(el){el.click();return true}return false});
  log.push('B open '+await openF(B));await B.p.waitForTimeout(800);log.push('B chao '+await tap(B,/^Chào hỏi/,3000));await B.p.waitForTimeout(800);await clear(B,4);
  log.push('A open2 '+await openF(A));await A.p.waitForTimeout(800);await shot(A,'friend-card2');
  log.push('A gift '+await tap(A,/^Tặng quà/,3000));await A.p.waitForTimeout(800);await shot(A,'gift-pick');
  const it=await A.p.evaluate(()=>{const m=document.getElementById('modal');if(!m||m.hidden)return'nomodal';const b=[...m.querySelectorAll('button:not([disabled])')].find(x=>x.offsetParent&&!/Lui|Thôi|Hủy/.test(x.textContent));if(b){const t=b.textContent.trim().slice(0,30);b.click();return t}return'none'});log.push('A gift item '+it);
  await A.p.waitForTimeout(2500);await shot(A,'gift-sent');await shot(B,'gift-invite');
  log.push('B accept '+await tap(B,/^Nhận/,4000));await A.p.waitForTimeout(2500);await shot(A,'gift-done');await clear(A,4);await clear(B,4)});
 await step('qua buổi ×3',async()=>{for(let k=0;k<3;k++){for(const o of [A,B]){await clear(o);await o.p.evaluate(()=>{const n=document.getElementById('next');if(n&&!n.disabled)n.click()});await o.p.waitForTimeout(700);
    if(k===0&&o===A){await shot(A,'wait-buoi')}}
   for(let t=0;t<60;t++){const a=await vis(A),c=await vis(B);if(a.S&&c.S&&a.S.b===c.S.b&&a.S.b!==k&&!a.nd===!c.nd)break;await clear(A,2);await clear(B,2);await sleep(400)}
   log.push('after buoi '+k+' '+JSON.stringify([(await vis(A)).S,(await vis(B)).S]))}
  await clear(A);await clear(B);await shot(A,'week2');await shot(B,'week2')});
 await step('rớt mạng',async()=>{await B.p.close();await A.p.waitForTimeout(4000);await shot(A,'friend-gone');
  await B.page();await B.p.goto(SITE+(SITE.includes('?')?'&':'?')+'room='+code,{waitUntil:'domcontentloaded'});
  for(const t of [500,1000,1500,3000]){await B.p.waitForTimeout(t===500?500:t/2);log.push('rejoin '+t+' '+JSON.stringify(await B.p.evaluate(()=>({st:COOP.state.status,title:!document.getElementById('title').hidden,m:(document.querySelector('#modal:not([hidden]) .kptitle')||{}).textContent,load:!!document.querySelector('.kload,#kload,.loading:not([hidden])')}))))}
  await shot(B,'back-link');const manual=await tap(B,/^Vào phòng|^Trở lại/,3000);log.push('rejoin manual tap '+manual);
  await B.p.waitForTimeout(3000);await clear(B,6);for(const t of [0,3000,6000]){await B.p.waitForTimeout(t?3000:0);log.push('panel '+t+' '+JSON.stringify(await B.p.evaluate(()=>{const p=document.getElementById('panel');const o={len:p?p.innerText.length:-1,tab:typeof tab!=='undefined'?tab:'?',html:p?p.innerHTML.slice(0,300):'',hl:p?p.innerHTML.length:0,pcs:getComputedStyle(p).display+'/'+getComputedStyle(p).visibility+'/'+getComputedStyle(p).opacity};try{render();o.after=p.innerText.length}catch(e){o.err=e.message}return o})))}
  await shot(B,'back-in');await shot(A,'friend-back')});
 await step('sổ',async()=>{const r=await A.p.evaluate(()=>{try{save();return localStorage.getItem('ctm-coop-last')}catch(e){return 'err '+e.message}});log.push('save '+r);
  await tap(A,/^Sổ/,1500);await A.p.waitForTimeout(600);await shot(A,'so')});
 for(const o of [A,B])if(o.errs.length)note(o,'lỗi trang '+JSON.stringify(o.errs.slice(0,5)));
 fs.writeFileSync(path.join(OUT,'notes.txt'),notes.join('\n')+'\n\n'+log.join('\n')+'\n');console.log('\n'+notes.length+' notes');await b.close()})().catch(e=>{console.error(e);process.exit(2)});
