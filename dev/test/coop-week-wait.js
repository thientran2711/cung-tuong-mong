/* coop-week-wait (Foreman B fast lane, B FIXER coop-week-wait): the co-op room must never sit for ever at a step because of what is queued on ONE seat.
   Two Playwright browsers on one room (local `wrangler dev` Worker): Fold 755x1000 host + iPad 1180x820 guest (COOP_SWAP=1: iPad hosts).
   usage: python3 dev/build/assemble.py && node dev/test/coop-week-wait.js [workerURL]   (default http://127.0.0.1:8788)
   Cases (each from a live week, a long buổi clock so no forced end races the taps):
     A1 WEEK WAIT, tell panels (E fast lane room 6ZG9: host «Buổi sáng» + «Đợi hảo hữu xong tuần», guest «Buổi tối» «Chờ hảo hữu…», guest Q=4 Tin báo ×3 / Phòng bị):
        at the week's last buổi the GUEST presses Sẵn sàng, then has three «Tin báo» panels queued (nothing to choose); the HOST presses Sẵn sàng → his night runs,
        his week end goes out → the guest's committed night must run by itself (the ONE carry rule: a panel that only tells never holds a room step) and the
        room must step one week; her Tin báo panel is shown again after the step
     A2 WEEK WAIT, hidden queue: same, the guest's queue holds three Tin báo + a real choice («Phòng bị», j70 def70m) and her #modal is HIDDEN (6ZG9 harness:
        «disabled with no dialog on screen (Q=4)») → within 10 s the guest must SEE what holds her (the choice on screen); once she answers it the week steps
     C  BUỔI STEP, notice with a pick (U3b room 7UGM: host «Tin báo» 30 tin with «Xem lời nhờ / Để sau» below the list, onBuoi … Q1, guest «Chờ hảo hữu…»):
        a day buổi; host presses Hết buổi, opens a «Tin báo» that carries a «go» (its kit panel gets «Để ta xem / Để sau»); guest presses Hết buổi → the room steps;
        report whether the host's seat holds; then the host taps «Để sau» → his seat must step with the room within 5 s
   env ONLY=A1,C runs only those cases. Exit 1 on any FAIL. */
const {chromium}=require('playwright');const path=require('path');
const {serve,BASE}=require('./coop-serve.js');const CLR=require('./lib/coop-clear.js');
const WURL=process.argv[2]||'http://127.0.0.1:8788';const SWAP=process.env.COOP_SWAP==='1';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,1200):''));return !!c};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const ON=n=>!process.env.ONLY||process.env.ONLY.split(',').includes(n);const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(u=>{window.COOP_URL=u;window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=s.you||null;const ended=s.ended||{};const on=!!(s.playing||(s.status&&s.status!=='off'));
   return{seat:you,week:s.week||0,frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you])))}}},WURL);
 const p=await ctx.newPage();p.setDefaultTimeout(30000);const o={name,ctx,p,errs:[]};p.on('pageerror',e=>o.errs.push(e.message));return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const until=async(o,fn,arg,ms=30000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}};
/* a player's step (coop-cal-rebirth STEP, trimmed: no acts on the friend) */
const STEP=()=>{const c=__co();if(c.frozen||c.waiting)return'coop';if(typeof S==='undefined'||!S)return'nos';if(S.mg){try{S.mg=null;render()}catch(e){}return'mg'}
  if(S&&S.dead){const b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Đầu thai|Luân hồi|Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Nhập cung/.test(x.textContent))||b.find(x=>x.closest('#modal'));if(k){k.click();return'reborn'}return'dead'}
  const T=document.getElementById('title');if(T&&!T.hidden){const b=[...T.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Lật|Chọn/.test(x.textContent))||b[0];if(k){k.click();return'title'}}
  const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'overlay'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'book'}
  {const tk=document.getElementById('toilkeep');if(tk&&tk.offsetParent!==null){const nh=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&x.textContent.trim()==='Nhận');if(nh){nh.click();return'toil-take'}tk.click();return'toil'}}
  const m=document.getElementById('modal');if(m&&!m.hidden){const A0=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null&&!x.dataset.kcp);const acc=A0.find(x=>/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent));if(acc){acc.click();return'accept'}
   const o=[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')];const b=o.length?o[Math.floor(Math.random()*o.length)]:m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'modal'}return'stuck'}
  const n=document.getElementById('next');if(n&&!n.disabled){n.click();return'next'}return'idle'};
async function step(o){try{if(await REW(o))return'rew';return await CLR.first(o,STEP)}catch(e){return 'err'}}
async function play(A,B,fn,ms){const t0=Date.now();while(Date.now()-t0<ms){await step(A);await step(B);if(await fn())return true;await sleep(150)}return false}
const D=o=>o.p.evaluate(()=>{const c=window.COOPW||{};return{w:COOP.state.week,my:typeof S==='object'&&S?S.turn*3+S.tuan:null,b:typeof S==='object'&&S?S.buoi||0:null,dead:!!(S&&S.dead),inLife:!!c.inLife,
  pend:!!(c.pend||c.sent===COOP.state.week),bend:!!c.bend,pb:!!c.pendBuoi,Q:typeof Q!=='undefined'?Q.length:-1,qt:typeof Q!=='undefined'?Q.map(x=>x&&x.t).slice(0,6):[],mh:document.getElementById('modal').hidden,
  fz:(document.querySelector('#coopfz .kptitle')||{}).textContent||'',kbk:!!(document.querySelector('.kbk-bar')&&document.querySelector('.kbk-bar').offsetParent!==null),mg:!!(S&&S.mg),qA:!!(c.qArmed&&c.qArmed()),qN:c.qN,dfs:!!(Q[0]&&Q[0].dfSeen),foc:[...document.querySelectorAll('.kfoc,.kmov,#kneov,#kpodov,#kroul,#kg82')].filter(x=>x.getClientRects().length).map(x=>(x.id||x.className).toString().slice(0,30)),nx:(document.getElementById('next')||{}).textContent||'',ended:COOP.state.ended,tr:(c.tr||[]).slice(-6)}}).catch(e=>({err:e.message}));
const alive=async o=>{const d=await D(o);return d.my!=null&&!d.dead&&!d.inLife&&!d.pend&&await o.p.evaluate(()=>document.getElementById('title').hidden&&!document.querySelector('#kroul')).catch(()=>false)};
/* the reward box scene (j93 kmrew «Bổng lộc tháng …», manual): a player taps «Chạm để mở», then «Nhận» */
const REW=o=>o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend,.kmov [data-km-close]')].find(x=>x.offsetParent!==null&&!x.disabled&&x.getClientRects().length&&!x.closest('#kmrew'));if(ke){ke.click();return true}/* a kit scene's ONE end button (KIT 81: «Ta biết rồi», «Chuẩn bị thị tẩm», …) */const r=document.getElementById('kmrew');if(!r)return false;const n=[...r.querySelectorAll('[data-km-close]')].find(x=>x.offsetParent!==null&&x.getClientRects().length);if(n){n.click();return true}const b=r.querySelector('.kmrew');if(b){b.click();return true}return false}).catch(()=>false);
async function clr(o){if(await REW(o))return;if(await CLR.tap(o).catch(()=>'')==='x')return;if(await o.p.evaluate(()=>!document.getElementById('modal').hidden).catch(()=>false))await step(o)}
/* press the seat's #next (Hết buổi / Sẵn sàng) as a player: clear what is on top first */
const nx=o=>o.p.evaluate(()=>{const n=document.getElementById('next');if(!n||n.disabled||!document.getElementById('modal').hidden)return false;n.click();return true});
async function press(o){for(let i=0;i<40;i++){if(await nx(o))return true;await clr(o);await sleep(300)}return false}
const longClock=o=>o.p.evaluate(()=>{try{Object.assign(BAL.coopTm,{buoiMs:3600000,nightMs:3600000,pauseCapMs:3600000});COOPW.tm&&COOPW.tm.reset&&COOPW.tm.reset()}catch(e){}});
/* both seats at buổi b of one live week, nothing queued */
async function toBuoi(A,B,b,tag){const LAST=await A.p.evaluate(()=>typeof LASTB==='function'?LASTB():(typeof B4L==='number'?B4L:3)).catch(()=>3);
 ok(await play(A,B,async()=>await alive(A)&&await alive(B)&&(await D(A)).b===0&&(await D(B)).b===0,240000),tag+': both live at a buổi sáng');
 await longClock(A);await longClock(B);b=Math.min(b,LAST);
 for(let i=0;i<14;i++){const a=await D(A),c=await D(B);if(a.b>=b&&c.b>=b)break;
  if(a.b===c.b&&!a.bend)await press(A);if(a.b===c.b&&!c.bend)await press(B);
  await until(A,x=>(S.buoi||0)===x,a.b+1,20000);await until(B,x=>(S.buoi||0)===x,a.b+1,20000)}
 for(let i=0;i<8;i++){await clr(A);await clr(B);await sleep(200)}
 const a=await D(A),c=await D(B);ok(a.b===b&&c.b===b&&a.w===c.w&&!a.Q&&!c.Q,tag+': both at buổi '+b+' (last '+LAST+'), nothing queued',[a,c]);return LAST}
const notices=(o,n,go)=>o.p.evaluate(([n,go])=>{for(let i=0;i<n;i++){kitNotice(Object.assign({id:'cww-'+Date.now()+'-'+i,line:'Tin thử '+i+': cung nữ đã về.'},go&&i===n-1?{go:()=>{},goLabel:'Xem lời nhờ'}:{}));kitNoticeOpen()}
  return {Q:Q.length,t:Q.map(x=>x.t),opts:Q.map(x=>x.opts?x.opts.length:0)}},[n,go]);
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-web-security','--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const V=[[755,1000],[1180,820]];const A=await mk(b,'host',SWAP?V[1]:V[0]),B=await mk(b,'guest',SWAP?V[0]:V[1]);
 await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'host: Cùng hảo hữu');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'host: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'host has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code,SWAP?'(iPad hosts)':'(Fold hosts)');
 await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000);
 ok(await until(B,()=>COOP.seat==='b',null,60000),'guest in seat b');
 ok(await play(A,B,async()=>await alive(A)&&await alive(B),240000),'both in the game');
 {const w=(await D(A)).w;ok(await play(A,B,async()=>(await D(A)).w>w&&(await D(B)).w>w,300000),'warm-up: the room steps a week')}
 for(const cs of ['A1','A2']){if(!ON(cs))continue;
  const LAST=await toBuoi(A,B,99,cs).catch(e=>{ok(false,cs+' set-up '+e.message);return -1});const a0=await D(A),c0=await D(B);const w0=a0.w;
  if(a0.b!==c0.b){ok(false,cs+': seats not on one buổi, skipped',[a0,c0]);continue}
  ok(await press(B),cs+': guest presses Sẵn sàng at the last buổi');await sleep(1200);
  if(cs==='A1')ok((await notices(B,3)).Q>=1,cs+': guest has Tin báo panels queued',await D(B));
  else{const r=await B.p.evaluate(()=>{for(let i=0;i<3;i++){kitNotice({id:'cww2-'+i,line:'Tin thử '+i});kitNoticeOpen()}
     let ch=null;try{const sv=(S.servants||[])[0]||null;ch=typeof def70m==='function'?def70m(sv?{sv}:{}):null}catch(e){}
     if(!ch||!Array.isArray(ch.opts)||!ch.opts.length)ch={t:'Phòng bị',h:'<p>Thử: một lựa chọn thật.</p>',opts:[{n:'Giữ nguyên',fx:{}},{n:'Đổi việc',fx:{}}],kit:{kind:'choice',title:'Phòng bị'}};
     Q.push(ch);document.getElementById('modal').hidden=true;return {Q:Q.length,t:Q.map(x=>x.t)}});ok(r.Q>=2&&r.t.includes('Phòng bị'),cs+': guest queue = Tin báo + Phòng bị (a real choice), #modal hidden (6ZG9 Q=4 shape)',r)}
  ok(await press(A),cs+': host presses Sẵn sàng');
  /* the host reads his own night cards, as a player (never the guest's) */
  {let out=false;for(let i=0;i<120&&!out;i++){out=await A.p.evaluate(w=>!!(COOP.state.ended&&COOP.state.ended.a)||COOP.state.week>w,w0).catch(()=>false);if(!out){await clr(A);await sleep(300)}}
   ok(out,cs+': host night ran, his week end is out (he read his night cards)',await D(A))}
  if(cs==='A1'){const nr=await until(B,w=>COOPW.pend||COOPW.sent===w||COOP.state.week>w||(COOPW.tr||[]).some(x=>x.startsWith('night '+w+' ')),w0,20000);const c=await D(B);
   ok(nr,cs+': her committed night runs with the Tin báo panel open (a panel that only tells never holds a room step)',c);
   for(let i=0;i<20;i++){const d=await D(B);if(d.w>w0)break;await B.p.evaluate(()=>{const m=document.getElementById('modal');if(m.hidden)return;const o=[...m.querySelectorAll('button')].find(x=>x.offsetParent!==null&&/Để sau|Đóng/.test(x.textContent+(x.getAttribute('aria-label')||'')))||m.querySelector('.kit-x')||m.querySelector('.opts button:not([disabled])')||m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])');if(o)o.click()});await clr(B);await clr(A);await sleep(500)}
   const st=await until(B,w=>COOP.state.week>w,w0,20000);const a=await D(A),c2=await D(B);
   ok(st&&a.w===w0+1&&c2.w===w0+1,cs+': once she has read her panels, the room steps one week',[a,c2]);
   ok(c2.my===c2.w&&a.my===a.w&&c2.b===0&&a.b===0,cs+': both seats on one date, buổi sáng',[a.my,c2.my,a.b,c2.b])}
  else{const seen=await until(B,()=>!document.getElementById('modal').hidden&&Q.length>0,null,10000);const c=await D(B);ok(seen,cs+': within 10 s she SEES what holds her night (no hidden queue)',c);
   for(let i=0;i<60;i++){const d=await D(B);if(d.w>w0)break;await clr(A);if(await REW(B)||await CLR.tap(B).catch(()=>'')==='x'){await sleep(400);continue}await B.p.evaluate(()=>{const m=document.getElementById('modal');if(m.hidden)return;const o=m.querySelector('.opts button:not([disabled])')||m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||m.querySelector('.kit-x');if(o)o.click()});await sleep(700)}
   const st=await until(B,w=>COOP.state.week>w,w0,30000);const a=await D(A),c2=await D(B);ok(st&&a.w===w0+1&&c2.w===w0+1,cs+': once she answers, the room steps one week',[a,c2])}
  for(let i=0;i<10;i++){await clr(A);await clr(B);await sleep(200)}}
 if(ON('C')){await toBuoi(A,B,1,'C');const a0=await D(A);
  ok(await press(A),'C: host presses Hết buổi');await sleep(800);
  const r=await notices(A,2,true);ok(r.opts[0]>=2,'C: host has «Tin báo» with «Xem lời nhờ / Để sau» open',r);
  ok(await press(B),'C: guest presses Hết buorg'.replace('buorg','buổi'));
  ok(await until(B,x=>(S.buoi||0)===x,a0.b+1,20000),'C: the room steps (guest in the next buổi)');await sleep(2500);
  const a1=await D(A);console.log('info C: host seat after the room step: b='+a1.b+' pendBuoi='+a1.pb+' Q='+a1.Q+' ('+(a1.b===a0.b+1?'CARRIED':'HELD')+')');
  const t=await A.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button,#modal button.opt')].find(x=>/Để sau/.test(x.textContent));if(!b)return false;b.scrollIntoView();b.click();return true});ok(t,'C: host taps «Để sau»');
  for(let i=0;i<6;i++){const d=await D(A);if(d.b===a0.b+1&&!d.Q)break;await A.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button,#modal button.opt')].find(x=>/Để sau/.test(x.textContent));if(b)b.click()});await sleep(800)}
  const st=await until(A,x=>(S.buoi||0)===x&&!COOPW.pendBuoi,a0.b+1,5000);const a2=await D(A),c2=await D(B);ok(st&&a2.b===c2.b,'C: after «Để sau» the host steps with the room (no split)',[a2,c2]);
  const w0=a2.w;ok(await play(A,B,async()=>(await D(A)).w>w0&&(await D(B)).w>w0,300000),'C: the room then steps a week')}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,3));
 const f=res.filter(r=>!r[0]).length;console.log(`\n${res.length-f}/${res.length} ok`+(f?` — ${f} FAIL`:' — PASS'));await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
