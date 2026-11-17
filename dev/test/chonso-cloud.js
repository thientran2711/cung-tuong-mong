/* chonso-cloud: Sổ mây card in Chọn sổ › Một mình (owner 16/11). Based on cloud-save.js harness. ORIGINAL HEADER: Sổ mây (C44, review/cloud-save): phone ↔ iPad round trip, conflict pick (both ways), 10-version cap + restore, old save,
   co-op room list + seat pid carried (no co-op life in the cloud), screenshots of every Sổ mây screen.
   Runs the REAL Worker code on a local mock (coop/worker/test/mock-server.mjs, mock Durable Objects). No deploy needed.
   usage: python3 dev/build/assemble.py && node dev/test/cloud-save.js [shots]   (shots → dev/shots/cloud-save/, keep few) */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const {spawn}=require('child_process');const net=require('net');const path=require('path');const fs=require('fs');
const SHOTS=process.argv[2]==='shots';const OUTD=path.resolve(__dirname,'../shots/chonso-cloud');if(SHOTS)fs.mkdirSync(OUTD,{recursive:true});
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
  await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});return p};
 const shot=async(p,n)=>{const r=await p.evaluate(()=>{const vw=innerWidth;const bad=[];document.querySelectorAll('#modal:not([hidden]) *').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;if(q.right>vw+1||q.left<-1)bad.push('out:'+e.className)});
   const M=document.querySelector('#modal:not([hidden])');return {ovx:document.documentElement.scrollWidth>vw,bad:bad.slice(0,4),ell:/…(?!$)/.test(M?M.innerText.replace(/Đang [^\n]*…/g,''):'')}});
  ok(!r.ovx&&!r.bad.length,`${p.k} ${n}: nothing off screen`,r);
  if(SHOTS){await p.waitForTimeout(250);await p.screenshot({path:`${OUTD}/${n}-${p.k}.png`,animations:'disabled'})}};
 const toOpt=async p=>{await p.evaluate(()=>{const b=document.querySelector('#modal [data-tgo="opt"]');if(b)b.click()});await p.waitForSelector('#modal .cloudwrap .kslot',{timeout:10000})};
 const C=p=>p.evaluate(()=>JSON.parse(JSON.stringify(CTM_CLOUD.state)));
 const idle=p=>p.waitForFunction(()=>!document.querySelector('#modal .cloudwrap')||!/Đang gửi/.test(document.querySelector('#modal .cloudwrap').textContent),null,{timeout:20000}).catch(()=>{});
 const newLife=async(p,n)=>{await p.evaluate(n=>{SLOT=n;$("title").hidden=true;start()},n);await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:60000});
  await p.waitForTimeout(300);await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());try{nlAccept()}catch(e){}while(Q.length)Q.shift();try{closeModal()}catch(e){}try{render()}catch(e){}save()})};
 const buoi=async p=>p.evaluate(async()=>{while(Q.length)Q.shift();S.mg=null;const b0=[S.tuan,S.buoi].join();nextBuoi();while(Q.length)Q.shift();try{closeModal()}catch(e){}render();save();return b0+'→'+[S.tuan,S.buoi].join()});
 const slot=(p,n)=>p.evaluate(n=>{const d=loadSlot(n);return d?{name:d.S.name,b:[d.S.year,d.S.month,d.S.tuan,d.S.buoi].join(),h:CTM_CLOUD.hash(localStorage.getItem(SK(n)))}:null},n);
 const head=async k=>{const r=await fetch(API+'/api/vault/list',{method:'POST',headers:{'content-type':'application/json',Origin:'http://ctm.local'},body:JSON.stringify({k})});return r.json()};
 const title=async p=>{await p.evaluate(()=>{$("title").hidden=false;showTitle()});await p.waitForTimeout(300)};
 const toSlots=async p=>{await p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());$("title").hidden=false;showTitle();const b=document.querySelector('#modal #mr [data-tgo="home"]');if(b)b.click()});await p.waitForSelector('#modal [data-tgo="slots"]',{timeout:10000});await p.evaluate(()=>document.querySelector('#modal [data-tgo="slots"]').click());await p.waitForSelector('#modal #slots .cloudmini',{timeout:10000});await p.waitForTimeout(300)};
 const mini=p=>p.evaluate(()=>{const e=document.querySelector('#modal #slots .cloudmini');return e?{t:e.innerText.replace(/\s+/g,' ').trim(),btn:[...e.querySelectorAll('button')].map(b=>b.dataset.cl),first:!!document.querySelector('#modal #slots .kcstabs + .cloudmini'),n:document.querySelectorAll('#modal #slots .kslot').length}:null});
 const scrollOk=p=>p.evaluate(()=>{const e=document.querySelector('#modal #slots .cloudmini');const b=e.getBoundingClientRect();return {top:Math.round(b.top),bot:Math.round(b.bottom),vh:innerHeight}});
 /* A = Fold 755x1000, B = iPad 1180x820 (two browser contexts = two devices) */
 const A=await mk('phone'),B=await mk('ipad');for(const p of [A,B])await p.addStyleTag({content:'.kmov.kcf{display:none!important;pointer-events:none!important}'});
 await newLife(A,1);const life=await slot(A,1);
 await toSlots(A);let m=await mini(A);
 ok(m&&m.first&&m.n===4&&/Chưa giữ trên mây/.test(m.t)&&m.btn.join()==='make,link','A: Chọn sổ › Một mình: Sổ mây card on top, above the 3 sổ, not linked → Giữ sổ trên mây + Nối sổ',m);
 ok(/Giữ sổ trên mây/.test(m.t)&&/Nối sổ/.test(m.t),'A: both button words visible');
 await shot(A,'1-slots-off');
 /* settings still has it (go to Thiết lập) */
 await A.evaluate(()=>{const b=document.querySelector('#modal #mr [data-tgo="home"]');if(b)b.click()});await A.waitForSelector('#modal [data-tgo="opt"]');await toOpt(A);
 ok(await A.evaluate(()=>[...document.querySelectorAll('#modal .cloudwrap [data-cl]')].map(b=>b.dataset.cl).join()==='make,link'),'A: Thiết lập › Sổ mây kept, same buttons');
 /* link: Giữ sổ trên mây from the Chọn sổ card */
 await toSlots(A);
 await A.click('#modal #slots .cloudmini [data-cl="make"]');await A.waitForSelector('#modal.kcloud #cl-key',{timeout:15000});
 await A.waitForFunction(()=>CTM_CLOUD.state.rev>0,null,{timeout:20000});
 const c1=await C(A);ok(/^[0-9A-HJKMNP-TV-Z]{8}$/.test(c1.k),'A: ám hiệu made from the Chọn sổ card (same flow as Thiết lập)',{rev:c1.rev});
 await shot(A,'2-code-from-slots');
 await A.click('#modal .kit-x');await A.waitForSelector('#modal #slots .cloudmini',{timeout:10000});await idle(A);await A.waitForTimeout(400);
 m=await mini(A);
 ok(m&&/Khớp với mây/.test(m.t)&&/••••-••/.test(m.t)&&!m.t.includes(c1.k)&&!m.t.includes(c1.k.slice(0,4))&&/khớp lúc/.test(m.t)&&m.btn.includes('now'),'A: back on Chọn sổ: linked state, ám hiệu masked, last sync time, Khớp sổ ngay',m);
 ok(await A.evaluate(()=>/Khớp sổ ngay/.test(document.querySelector('#modal #slots .cloudmini').innerText)),'A: button word "Khớp sổ ngay"');
 await shot(A,'3-slots-on');
 /* B: Nối sổ from the card */
 await newLife(B,2);const b2=await slot(B,2);await toSlots(B);
 await B.click('#modal #slots .cloudmini [data-cl="link"]');await B.waitForSelector('#cl-in');await shot(B,'4-link-from-slots');
 await B.fill('#cl-in',c1.k.toLowerCase().replace(/(.{4})/g,'$1 '));await B.click('#modal [data-cl="go"]');
 await B.waitForFunction(()=>CTM_CLOUD.state.rev>=2,null,{timeout:20000});await B.waitForSelector('#modal #slots .cloudmini',{timeout:10000});await idle(B);await B.waitForTimeout(500);
 const bs1=await slot(B,1);ok(bs1&&bs1.name===life.name,'B: Nối sổ from the card brought Sổ 1',{bs1});ok((await slot(B,2)).h===b2.h,'B: its own Sổ 2 kept');
 m=await mini(B);ok(m&&/Khớp với mây/.test(m.t)&&m.btn.includes('now'),'B: card now linked after returning to Chọn sổ',m);
 /* sync from the panel: B plays one buổi in Sổ 1, then A: Khớp sổ ngay */
 await B.evaluate(()=>{$("title").hidden=false;showTitle();document.querySelector('#slots [data-load="1"]').click()});
 const bu=await buoi(B);await B.waitForFunction(()=>CTM_CLOUD.state.rev>=3,null,{timeout:20000}).catch(()=>{});
 const bAfter=await slot(B,1);
 await toSlots(A);const a0=await slot(A,1);
 await A.evaluate(()=>{CTM_CLOUD.state.at=1});  // force old time to see the card refresh
 await A.click('#modal #slots .cloudmini [data-cl="now"]');
 await A.waitForFunction(h=>CTM_CLOUD.hash(localStorage.getItem(SK(1)))===h,bAfter.h,{timeout:20000}).catch(()=>{});
 const a1=await slot(A,1);ok(a1.b===bAfter.b&&a1.b!==a0.b||a1.h===bAfter.h,'A: Khớp sổ ngay from Chọn sổ pulled the buổi B played',{bu,a0:a0.b,a1:a1.b,b:bAfter.b});
 await A.waitForTimeout(500);m=await mini(A);ok(m&&/Khớp với mây/.test(m.t)&&!/Đang gửi/.test(m.t),'A: card refreshed in place after the sync',m);
 /* old time shown? card must show a real time, not 1/1 1970 */
 ok(/khớp lúc/.test(m.t)&&!/ngày 1\/1\b/.test(m.t),'card shows the real last sync time (a pull counts, not only a send)',m.t);
 /* unlink from the card flow: Ám hiệu sổ → Thôi nối */
 await A.click('#modal #slots .cloudmini [data-cl="code"]');await A.waitForSelector('#modal.kcloud #cl-key');
 const hasUn=await A.$('#modal [data-cl="unlink"]');ok(!!hasUn,'A: Ám hiệu sổ panel opened from the card has "Thôi nối"');
 const sl1=await slot(A,1);
 await A.click('#modal [data-cl="unlink"]');await A.waitForTimeout(300);await A.click('#modal [data-cl="unlink"]');await A.waitForSelector('#modal #slots .cloudmini',{timeout:10000});await A.waitForTimeout(400);
 m=await mini(A);ok(m&&/Chưa giữ trên mây/.test(m.t)&&m.btn.join()==='make,link','A: unlinked: card back to Giữ sổ trên mây + Nối sổ',m);
 ok((await slot(A,1)).h===sl1.h,'A: local Sổ 1 untouched by unlinking');
 /* co-op tab has no Sổ mây card (a co-op life never lives in the cloud) */
 await A.evaluate(()=>document.querySelector('#modal #slots [data-kcs="coop"]').click());await A.waitForTimeout(300);
 ok(await A.evaluate(()=>!document.querySelector('#modal #slots .cloudmini')),'A: co-op tab has no Sổ mây card');
 await A.evaluate(()=>document.querySelector('#modal #slots [data-kcs="solo"]').click());await A.waitForTimeout(300);
 /* layout */
 for(const p of [A,B]){await toSlots(p);const g=await p.evaluate(()=>{const e=document.querySelector('#modal #slots .cloudmini');const r=e.getBoundingClientRect();const M=document.querySelector('#modal');const vw=innerWidth;let bad=0;e.querySelectorAll('*').forEach(x=>{const q=x.getBoundingClientRect();if(q.width&&(q.right>vw+1||q.left<-1))bad++;if(x.scrollWidth>x.clientWidth+2&&getComputedStyle(x).overflow!=='visible')bad++});return {bad,top:Math.round(r.top),bot:Math.round(r.bottom),vh:innerHeight,ovx:document.documentElement.scrollWidth>vw}});
  ok(g.bad===0&&!g.ovx&&g.bot>0&&g.top>=0,`${p.k}: card inside the screen, nothing cut`,g);await shot(p,'5-slots-final')}
 for(const p of [A,B])ok(!p.errs.length,`${p.k}: no page errors`,p.errs.slice(0,3));
 await b.close();mock.kill();
 const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL of ${res.length}`:`ALL ${res.length} OK`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
