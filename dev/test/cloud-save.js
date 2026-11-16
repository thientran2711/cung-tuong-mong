/* Sổ mây (C44, review/cloud-save): phone ↔ iPad round trip, conflict pick (both ways), 10-version cap + restore, old save,
   co-op room list + seat pid carried (no co-op life in the cloud), screenshots of every Sổ mây screen.
   Runs the REAL Worker code on a local mock (coop/worker/test/mock-server.mjs, mock Durable Objects). No deploy needed.
   usage: python3 dev/build/assemble.py && node dev/test/cloud-save.js [shots]   (shots → dev/shots/cloud-save/, keep few) */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const {spawn}=require('child_process');const net=require('net');const path=require('path');const fs=require('fs');
const SHOTS=process.argv[2]==='shots';const OUTD=path.resolve(__dirname,'../shots/cloud-save');if(SHOTS)fs.mkdirSync(OUTD,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const freePort=()=>new Promise(r=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>r(p))})});
(async()=>{
 const port=await freePort();
 const mock=spawn('node',[path.resolve(__dirname,'../../coop/worker/test/mock-server.mjs'),String(port),'http://ctm.local'],{stdio:['ignore','pipe','inherit']});
 await new Promise(r=>mock.stdout.on('data',d=>{if(/listening/.test(d))r()}));
 const API='http://127.0.0.1:'+port;
 const b=await chromium.launch({args:['--no-sandbox']});
 const VP={phone:[755,1000,2],ipad:[1180,820,2],big:[1366,1024,2],land:[844,390,1]};
 const mk=async(k,init)=>{const [w,h,d]=VP[k];const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:d,hasTouch:true,isMobile:w<1100,reducedMotion:'reduce'});await serve(ctx);
  /* the page reaches the mock through a Playwright route (Chromium blocks http pages from calling loopback directly) */
  await ctx.route('http://cloud.local/**',async r=>{if(ctx.__off)return r.abort('internetdisconnected');const u=new URL(r.request().url());try{const x=await r.fetch({url:API+u.pathname});await r.fulfill({response:x})}catch(e){await r.abort('internetdisconnected')}});
  await ctx.addInitScript(([u,init])=>{window.COOP_URL=u;window.CTM_CLOUD_GAP=0;if(init&&!sessionStorage.getItem('i')){sessionStorage.setItem('i',1);for(const k in init)localStorage.setItem(k,init[k])}},['http://cloud.local',init||null]);
  const p=await ctx.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));p.k=k;p.ctx=ctx;
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>window.CTM_CLOUD&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
  await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}#dawn,.kmov.kcf{display:none!important;pointer-events:none!important}'});return p};
 const shot=async(p,n)=>{const r=await p.evaluate(()=>{const vw=innerWidth;const bad=[];document.querySelectorAll('#modal:not([hidden]) *').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;if(q.right>vw+1||q.left<-1)bad.push('out:'+e.className)});
   const M=document.querySelector('#modal:not([hidden])');return {ovx:document.documentElement.scrollWidth>vw,bad:bad.slice(0,4),ell:/…(?!$)/.test(M?M.innerText.replace(/Đang [^\n]*…/g,''):'')}});
  ok(!r.ovx&&!r.bad.length,`${p.k} ${n}: nothing off screen`,r);
  if(SHOTS){await p.waitForTimeout(250);await p.screenshot({path:`${OUTD}/${n}-${p.k}.png`,animations:'disabled'})}};
 /* the day's own scene overlays (#dawn new-day picture, card flip .kmov) sit above #modal and swallow clicks: the test closes them first */
 const noOv=p=>p.evaluate(()=>{['dawn','kroul','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov').forEach(e=>e.remove())});
 const toOpt=async p=>{await p.evaluate(()=>{const b=document.querySelector('#modal [data-tgo="opt"]');if(b)b.click()});await p.waitForSelector('#modal .cloudwrap .kslot',{timeout:10000})};
 const C=p=>p.evaluate(()=>JSON.parse(JSON.stringify(CTM_CLOUD.state)));
 const idle=p=>p.waitForFunction(()=>!document.querySelector('#modal .cloudwrap')||!/Đang gửi/.test(document.querySelector('#modal .cloudwrap').textContent),null,{timeout:20000}).catch(()=>{});
 const newLife=async(p,n)=>{await p.evaluate(n=>{SLOT=n;$("title").hidden=true;start()},n);await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:60000});
  await p.waitForTimeout(300);await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());try{nlAccept()}catch(e){}while(Q.length)Q.shift();try{closeModal()}catch(e){}try{render()}catch(e){}save()})};
 const buoi=async p=>p.evaluate(async()=>{while(Q.length)Q.shift();S.mg=null;const b0=[S.tuan,S.buoi].join();nextBuoi();while(Q.length)Q.shift();try{closeModal()}catch(e){}render();save();return b0+'→'+[S.tuan,S.buoi].join()});
 const slot=(p,n)=>p.evaluate(n=>{const d=loadSlot(n);return d?{name:d.S.name,b:[d.S.year,d.S.month,d.S.tuan,d.S.buoi].join(),h:CTM_CLOUD.hash(localStorage.getItem(SK(n)))}:null},n);
 const head=async k=>{const r=await fetch(API+'/api/vault/list',{method:'POST',headers:{'content-type':'application/json',Origin:'http://ctm.local'},body:JSON.stringify({k})});return r.json()};
 const title=async p=>{await p.evaluate(()=>{$("title").hidden=false;showTitle()});await p.waitForTimeout(300)};

 /* 1. phone: a life in Sổ 1, then Thiết lập › Sổ mây › Giữ sổ trên mây */
 const P=await mk('phone');
 await toOpt(P);await shot(P,'1-settings-off');
 await newLife(P,1);const life=await slot(P,1);
 await title(P);await toOpt(P);
 await P.click('#modal [data-cl="make"]');await P.waitForSelector('#modal.kcloud #cl-key',{timeout:15000});
 await P.waitForFunction(()=>CTM_CLOUD.state.rev>0,null,{timeout:20000});
 const c1=await C(P);ok(/^[0-9A-HJKMNP-TV-Z]{8}$/.test(c1.k)&&c1.rev===1,'phone: sync code made (8 chars, owner design) and Sổ 1 sent',{rev:c1.rev});
 ok(await P.inputValue('#cl-key')===c1.k.replace(/(.{4})(?=.)/g,'$1-'),'code shown grouped in the kit text box');
 await shot(P,'2-code');
 await P.click('#modal .kit-x');await P.waitForSelector('#modal .cloudwrap .kslot');await idle(P);await shot(P,'3-settings-on');
 ok(/Khớp với mây/.test(await P.textContent('#modal .cloudwrap')),'settings says "Khớp với mây"');
 const life2=await slot(P,1);

 /* 2. iPad: Nối sổ with the code → Sổ 1 arrives; its own Sổ 2 (played there) is kept and sent */
 const I=await mk('ipad');await newLife(I,2);await title(I);await toOpt(I);const ipad2=await slot(I,2);
 await I.click('#modal [data-cl="link"]');await I.waitForSelector('#cl-in');await shot(I,'4-link');
 await I.fill('#cl-in',c1.k.toLowerCase().replace(/(.{4})/g,'$1 '));await I.click('#modal [data-cl="go"]');
 await I.waitForFunction(()=>CTM_CLOUD.state.rev>=2,null,{timeout:20000});
 const i1=await slot(I,1);ok(i1&&i1.name===life.name&&i1.h===life2.h,'iPad: Sổ 1 from the phone, same life',{i1,life2});
 ok((await slot(I,2)).h===ipad2.h,'iPad: its own Sổ 2 kept');
 await title(P);await P.waitForFunction(()=>!!loadSlot(2),null,{timeout:20000}).catch(()=>{});
 ok((await slot(P,2)||{}).h===ipad2.h,'phone pulls the iPad Sổ 2 on the title');

 /* 3. round trip: iPad plays Sổ 1 one buổi → auto upload at buổi end → phone opens the title and continues the same buổi */
 await I.evaluate(()=>{$("title").hidden=false;showTitle();document.querySelector('#slots [data-load="1"]').click()});
 const r0=(await C(I)).rev;const bu=await buoi(I);
 await I.waitForFunction(r=>CTM_CLOUD.state.rev>r,r0,{timeout:20000}).catch(()=>{});
 ok((await C(I)).rev>r0,'iPad: buổi end uploads by itself',{bu});
 const iAfter=await slot(I,1);await title(P);await P.waitForFunction(h=>CTM_CLOUD.hash(localStorage.getItem(SK(1)))===h,iAfter.h,{timeout:20000}).catch(()=>{});
 ok((await slot(P,1)).b===iAfter.b,'phone: Sổ 1 now at the iPad buổi',{phone:(await slot(P,1)).b,ipad:iAfter.b});
 await P.evaluate(()=>{document.querySelector('#slots [data-load="1"]')?.click()||(()=>{const d=loadSlot(1);SLOT=1;quiet=true;deser(d);quiet=false;$("title").hidden=true;render()})()});
 ok(await P.evaluate(()=>[S.year,S.month,S.tuan,S.buoi].join())===iAfter.b,'phone continues the same life at the same buổi');

 /* 4. conflict: both play Sổ 1 offline-ish (phone cannot reach the cloud), iPad uploads; phone back → panel, she keeps the phone copy */
 await (P.ctx.__off=true,P.ctx.setOffline(true));await buoi(P);await buoi(P);await P.waitForTimeout(2200);
 ok((await C(P)).err==='net','phone offline: kept locally, says it will send later');
 await buoi(I);await I.waitForTimeout(2500);const iConf=await slot(I,1);
 await (P.ctx.__off=false,P.ctx.setOffline(false));await title(P);
 await P.waitForSelector('#modal.kcloud [data-cl="keep"]',{timeout:20000});
 const pc=await P.evaluate(()=>[...document.querySelectorAll('#modal.kcloud .kslot h4')].map(h=>h.textContent));
 ok(pc.length===2&&/máy này/.test(pc[0])&&/trên mây/.test(pc[1]),'conflict panel shows both copies of Sổ một',pc);
 await shot(P,'5-conflict');
 const pPhone=await slot(P,1);
 await noOv(P);await P.click('#modal.kcloud [data-cl="keep"][data-v="me"]');await P.waitForFunction(()=>!CTM_CLOUD.state.pend&&CTM_CLOUD.state.rev,null,{timeout:20000});
 await P.waitForTimeout(500);
 const L1=await head(c1.k);
 ok((await slot(P,1)).h===pPhone.h,'kept the phone copy locally');
 const hv=L1.versions.find(v=>v.rev===L1.head);ok(hv&&hv.dev==='Điện thoại','cloud head is the phone copy',hv&&hv.dev);
 ok(L1.versions.some(v=>v.dev==='Máy tính bảng'),'the iPad copy is still among the kept versions');
 await title(I);await I.waitForFunction(h=>CTM_CLOUD.hash(localStorage.getItem(SK(1)))===h,pPhone.h,{timeout:20000}).catch(()=>{});
 /* the iPad was IN that life (title opened over it): not changed since base → takes the cloud copy, its old life in memory never writes back */
 ok((await slot(I,1)).h===pPhone.h,'iPad takes the kept copy');
 await I.evaluate(()=>{try{save()}catch(e){}});ok((await slot(I,1)).h===pPhone.h,'stale life in iPad memory does not overwrite it');

 /* 5. conflict the other way: keep the cloud copy → this device's copy is backed up first */
 await I.evaluate(()=>{const d=loadSlot(1);SLOT=1;quiet=true;deser(d);quiet=false;$("title").hidden=true;render()});await buoi(I);await I.waitForTimeout(2500);
 await P.evaluate(()=>{const d=loadSlot(1);SLOT=1;quiet=true;deser(d);quiet=false;$("title").hidden=true;render()});
 await (P.ctx.__off=true,P.ctx.setOffline(true));await buoi(P);await P.waitForTimeout(2000);await (P.ctx.__off=false,P.ctx.setOffline(false));
 const pOwn=await slot(P,1);const iOwn=await slot(I,1);await title(P);
 await P.waitForSelector('#modal.kcloud [data-cl="keep"]',{timeout:20000});
 const n0=(await head(c1.k)).versions.length;
 await noOv(P);await P.click('#modal.kcloud [data-cl="keep"][data-v="cloud"]');await P.waitForFunction(()=>!CTM_CLOUD.state.pend,null,{timeout:20000});await P.waitForTimeout(500);
 ok((await slot(P,1)).h===iOwn.h,'kept the cloud (iPad) copy on the phone');
 const L2=await head(c1.k);const bk=L2.versions.find(v=>v.keep);
 ok(bk&&bk.dev==='Điện thoại'&&bk.sum[1],'phone copy backed up as a kept version',bk&&{rev:bk.rev,keep:bk.keep});
 /* restore that backup from Các bản đã giữ */
 await title(P);await toOpt(P);await P.click('#modal [data-cl="vers"]');await P.waitForSelector('#modal.kcloud .kslot',{timeout:15000});await shot(P,'6-versions');
 await P.click(`#modal.kcloud [data-cl="restore"][data-rev="${bk.rev}"]`);await P.waitForSelector(`#modal.kcloud [data-rev="${bk.rev}"][data-ask="2"]`);
 await P.click(`#modal.kcloud [data-cl="restore"][data-rev="${bk.rev}"]`);
 await P.waitForFunction(h=>CTM_CLOUD.hash(localStorage.getItem(SK(1)))===h,pOwn.h,{timeout:20000}).catch(()=>{});
 {const now=await slot(P,1);ok(now.h===pOwn.h,'restore brings back the backed-up phone copy',{now,pOwn,c:await C(P),msg:await P.evaluate(()=>{const n=document.querySelector('#modal.kcloud .kpnote');return n&&n.textContent})})}

 /* 6. 10-version cap */
 for(let i=0;i<12;i++){await P.evaluate(i=>{const d=JSON.parse(localStorage.getItem(SK(2)));d.S.bac=(d.S.bac||0)+1+i;localStorage.setItem(SK(2),JSON.stringify(d))},i);await P.evaluate(()=>CTM_CLOUD.sync())}
 const L3=await head(c1.k);ok(L3.versions.length===10&&L3.versions[0].rev===L3.head,'cloud keeps exactly the last 10 versions',L3.versions.length);

 /* 7. co-op: the room list (+ the pid of the seat) travels; the co-op life itself never goes to the cloud */
 const pid=await P.evaluate(()=>COOP.pid);
 await P.evaluate(()=>{localStorage.setItem('ctm-coop-rooms',JSON.stringify([{room:'K7QD',seat:'b',at:Date.now(),name:'Mai Hoa',who:'Đáp ứng',age:16,date:'Tháng ba',fr:'Hiền phi Lục Uyển'}]))});
 await P.evaluate(()=>CTM_CLOUD.sync());await title(I);
 await I.waitForFunction(()=>(JSON.parse(localStorage.getItem('ctm-coop-rooms')||'[]')).some(r=>r.room==='K7QD'),null,{timeout:20000}).catch(()=>{});
 const ir=await I.evaluate(()=>({list:CTM_ROOMS.list().map(r=>r.room+':'+r.name),pid:COOP.pidFor('K7QD'),own:COOP.pid}));
 ok(ir.list.includes('K7QD:Mai Hoa')&&ir.pid===pid&&ir.own!==pid,'iPad lists the phone co-op room and will take the same seat (pid)',ir);
 const g=await (await fetch(API+'/api/vault/get',{method:'POST',headers:{'content-type':'application/json',Origin:'http://ctm.local'},body:JSON.stringify({k:c1.k})})).json();
 ok(g.rooms.length===1&&!JSON.stringify(g.rooms).includes('"S"')&&Object.keys(g).every(k=>['rev','at','dev','sum','keep','slots','rooms'].includes(k)),'cloud holds the room line only, never the co-op life');
 /* a co-op life in play: its buổi end never writes a solo sổ nor ships the co-op life */
 const s1=await slot(P,1);
 await P.evaluate(()=>{window.__solo=S;COOP.state.room='K7QD';COOP.state.you='b';COOP.state.status='open';COOP.emit('start',{room:'K7QD',you:'a',host:true,week:0,state:null})});
 await P.waitForFunction(()=>S!==window.__solo&&S&&S.name&&S.coopRoom,null,{timeout:60000}).catch(()=>{});
 await P.evaluate(()=>{try{nlAccept()}catch(e){}while(Q.length)Q.shift();$("title").hidden=true;render();save()});
 await buoi(P);await P.waitForTimeout(2500);
 ok((await slot(P,1)).h===s1.h,'co-op buổi end: solo Sổ 1 untouched');
 const g2=await (await fetch(API+'/api/vault/get',{method:'POST',headers:{'content-type':'application/json',Origin:'http://ctm.local'},body:JSON.stringify({k:c1.k})})).json();
 const coName=await P.evaluate(()=>S.name);
 ok(!Object.values(g2.sum).some(s=>s&&s.n===coName&&!Array.isArray(s)),'co-op life not in the cloud sổ',coName);
 await P.evaluate(()=>{COOP.leave(true)});

 /* 8. old save + old device: a v5 sổ and the old single "ctm-coop-room" key on a device that never used Sổ mây */
 const raw=await P.evaluate(()=>localStorage.getItem(SK(1)));const old=JSON.parse(raw);old.v=5;delete old.b4;
 const O=await mk('big',{'hclh-save-v2-3':JSON.stringify(old),'ctm-coop-room':'Q9ZT'});
 ok(await O.evaluate(()=>!!loadSlot(3)&&!localStorage.getItem('ctm-cloud')),'old device: v5 sổ loads, Sổ mây off, nothing sent');
 await toOpt(O);await shot(O,'7-settings-off');
 await O.click('#modal [data-cl="link"]');await O.fill('#cl-in',c1.k);await O.click('#modal [data-cl="go"]');
 await O.waitForFunction(()=>CTM_CLOUD.state.rev>0&&!document.querySelector('#modal.kcloud #cl-in'),null,{timeout:20000}).catch(()=>{});
 const oc=await C(O);
 if(oc.pend){await noOv(O);await O.click('#modal.kcloud [data-cl="keep"][data-v="me"]');await O.waitForFunction(()=>!CTM_CLOUD.state.pend,null,{timeout:20000})}
 await title(P);await P.waitForFunction(()=>!!loadSlot(3),null,{timeout:20000}).catch(()=>{});
 const p3=await P.evaluate(()=>{const d=loadSlot(3);return d&&{v:d.v,name:d.S.name}});ok(p3&&p3.v===5&&p3.name===old.S.name,'old v5 sổ travels unchanged',p3);
 const ld=await P.evaluate(()=>{$("title").hidden=false;showTitle();const d=loadSlot(3);SLOT=3;quiet=true;deser(d);quiet=false;$("title").hidden=true;render();return {name:S.name,dead:!!S.dead}});
 ok(ld.name===old.S.name,'old v5 sổ from the cloud loads and plays',ld);
 ok(await O.evaluate(()=>CTM_ROOMS.list().some(r=>r.room==='Q9ZT')),'old single co-op room key still listed');

 /* 9. remaining screenshots: 844x390 */
 const Lz=await mk('land');await toOpt(Lz);await shot(Lz,'1-settings-off');
 await Lz.click('#modal [data-cl="link"]');await Lz.fill('#cl-in',c1.k);await Lz.click('#modal [data-cl="go"]');
 await Lz.waitForFunction(()=>CTM_CLOUD.state.rev>0,null,{timeout:20000}).catch(()=>{});
 if(await Lz.$('#modal.kcloud [data-cl="keep"]'))await shot(Lz,'5-conflict');
 await Lz.evaluate(()=>CTM_CLOUD.open('code'));await shot(Lz,'2-code');
 await Lz.evaluate(()=>CTM_CLOUD.open('vers'));await Lz.waitForTimeout(800);await shot(Lz,'6-versions');
 for(const p of [I,O]){await p.evaluate(()=>CTM_CLOUD.open('code'));await shot(p,'2-code');}
 await I.evaluate(async()=>{CTM_CLOUD.open('vers')});await I.waitForTimeout(800);await shot(I,'6-versions');
 for(const p of [P,I,O,Lz])ok(!p.errs.length,`${p.k}: no page errors`,p.errs.slice(0,3));
 await b.close();mock.kill();
 const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL of ${res.length}`:`ALL ${res.length} OK`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
