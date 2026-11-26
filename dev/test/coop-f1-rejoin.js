/* dev/test/coop-f1-rejoin.js — co-op F1 (review/coop-f1-rejoin): a seat reloads while the HOST is still before her life
   (the «Thân phận kiếp này» card, or the Luân hồi roulette in front of it) → «Cùng hảo hữu» › «Trở lại phòng».
   Before: the guest sat on «Mời hảo hữu … 3 · Cùng chơi … đang vào cuộc» for ever (resume() always re-opened the invite screen
   after the room answered, over the «Đợi hảo hữu chọn thân phận» panel the world module had just put up), and that screen's
   ‹ Lui / ✕ forgot the room. Expected: the seat lands on the SAME room's right screen — the waiting panel while the host picks,
   the game once she has — and nothing there forgets the room.
   Two real Chromium clients: Fold portrait 755x1000@2 (host, seat a) + iPad landscape 1180x820@2 (guest, seat b); COOP_SWAP=1 = iPad hosts.
   usage: python3 dev/build/assemble.py && node dev/test/coop-f1-rejoin.js [workerURL]   (default a local `wrangler dev` on :8788)
   Rows (each in its own fresh room):
     P1 guest reload while the host sits on «Thân phận kiếp này» → waiting panel (not the invite), room kept; host picks → guest in the game
     P2 guest reload TWICE while the host sits on the card (a second reload from the waiting panel itself)
     P3 guest reload while the host is still on the Luân hồi roulette (before the card)
     P4 host reload while on the card (the guest waits on the panel) → host back on the card, guest still on the panel; host picks → both in
     P5 both reload while the host is on the card
     P6 guest reload after the host picked (control: straight back into the game)
     P7 guest reload, «Trở lại phòng» then at once «Vào phòng» on the connecting screen (the first tap's answer comes back «replaced») → still the waiting panel
   After every row: the room advances one buổi for both. Exit 1 on any FAIL. */
const {chromium}=require('playwright');
const {serve,BASE}=require('./coop-serve.js');
const WURL=process.argv[2]||'http://127.0.0.1:8788';
const ONLY=(process.env.ROWS||'').split(',').filter(Boolean);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,+process.env.DUMP||1500):''))};
const DCL={waitUntil:'domcontentloaded'};
/* what the seat shows: co-op status, the lobby page under the title, the identity card, the game */
const CO=()=>{const c=window.COOP;if(!c||!c.state)return{};const s=c.state;const T=document.getElementById('title');const M=document.getElementById('modal');
 const mt=M&&!M.hidden?((M.querySelector('.dlg > .kph h3,.dlg > .kph .kpt,.dlg > .kph b')||{}).textContent||'').trim():'';
 return{st:s.status,seat:s.you,room:s.room,peer:!!s.peerOnline,week:s.week,key:(s.week||0)+':'+((typeof S!=='undefined'&&S&&S.buoi)||0),
  world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base),title:!!T&&!T.hidden,kcoop:!!(M&&!M.hidden&&M.classList.contains('kcoop')),mt,
  card:!!(M&&!M.hidden&&M.querySelector('[data-kcp],.nlcard')||typeof Q!=='undefined'&&Q[0]&&Q[0].nl),waitW:!!(window.COOPW&&COOPW.waitWorld),
  invite:!!document.querySelector('#modal.kcoop #coop-link'),pick:!!(M&&!M.hidden&&/chọn thân phận/.test(M.textContent)&&M.classList.contains('kcoop')),
  kx:!!(M&&!M.hidden&&[...M.querySelectorAll('.kit-x')].some(x=>x.getClientRects().length>0)),
  roul:(()=>{const r=document.querySelector('#kroul');return !!r&&r.getClientRects().length>0})(),
  bend:!!(window.COOPW&&(COOPW.bend||COOPW.pend))}};
/* VIDEO=<dir outside git>: each seat's whole run is recorded (review videos go to the CDN img/_review/coop-f1-rejoin/, never in git) */
async function mkCtx(b,name,vp){const ctx=await b.newContext(Object.assign({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'},process.env.VIDEO?{recordVideo:{dir:process.env.VIDEO+'/'+name,size:{width:vp[0],height:vp[1]}}}:{}));
 await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;window.__bot={pre:1}},WURL);await ctx.addInitScript('window.__co='+CO.toString());
 const o={name,ctx,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(180000);p.on('pageerror',e=>o.errs.push(e.message.slice(0,160)));return p};return o}
async function tapText(p,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source).catch(()=>null);
  const el=h&&h.asElement();if(el){try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
const LIB=require('./lib/coop-clear.js');
/* a player taps away what is on top of the game; HOLD = the host keeps her «Thân phận kiếp này» card open (and, with ROUL, her roulette) */
const CLEAR1=hold=>{if(typeof S!=='undefined'&&S&&S.mg){try{S.mg=null;render()}catch(e){}return'mg'}
 const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ|Bỏ qua)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
 const m=document.getElementById('modal');if(!m||m.hidden||m.classList.contains('kcoop'))return'';if(hold&&(m.querySelector('[data-kcp],.nlcard')||typeof Q!=='undefined'&&Q[0]&&Q[0].nl))return'';
 const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null&&!x.dataset.kcp);
 const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||m.querySelector('.opts button:not([disabled])')||all.pop();if(b){b.click();return'x'}return''};
async function clear(o,hold){for(let i=0;i<25;i++){let s;if(hold==='roul'){s=await o.p.evaluate(CLEAR1,true).catch(()=>'');if(s!=='x'&&s!=='mg')return s;}else s=await LIB.first(o,CLEAR1,hold===true).catch(()=>'');if(s!=='x'&&s!=='mg')return s;await sleep(200)}}
async function press(o){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(()=>{if(__co().bend)return'end';const b=document.getElementById('next');if(!b||b.disabled||b.offsetParent===null)return'';b.click();return'pressed'}).catch(()=>'');if(r)return r;await sleep(250)}return''}
const co=o=>o.p.evaluate(()=>__co()).catch(e=>({err:e.message}));
const dbg=async o=>{const r=await o.p.evaluate(()=>({co:__co(),tr:window.COOPW&&COOPW.tr?COOPW.tr.slice(-10):null,both:window.__cuxBoth})).catch(e=>({err:e.message}));r.scr=await o.p.evaluate(LIB.SCR).catch(e=>e.message);return r};
async function advance(A,B,ms=90000){const k0=(await co(A)).key;await press(A);await press(B);const t0=Date.now();
 while(Date.now()-t0<ms){const a=await co(A),c=await co(B);if(a.key!==k0&&c.key!==k0&&a.key===c.key)return true;await clear(A);await clear(B);await press(A);await press(B);await sleep(300)}return false}
/* rejoin like a player: the title's «Cùng hảo hữu», then «Trở lại phòng» of THIS room; done once the seat is open in that room and
   no longer on the room list (the lobby has handed over: the game, the identity card or the waiting panel) */
async function rejoin(o,code,dbl){await o.p.waitForFunction(()=>typeof start==='function'&&window.__ctmBuilt===1,null,{timeout:180000}).catch(()=>{});await sleep(1500);
 const t0=Date.now();let tapped=0;
 while(Date.now()-t0<60000){const c=await co(o);if(c.st==='open'&&c.room===code&&tapped)return Date.now()-tapped;
  if(c.st!=='open'&&c.st!=='connecting'&&c.st!=='retry'&&Date.now()-tapped>15000){
   const r=await o.p.evaluate(code=>{const vis=b=>b&&b.offsetParent!==null&&!b.disabled;const rb=document.querySelector('button[data-coop="resume"][data-room="'+code.c+'"]');if(vis(rb)){rb.click();if(code.dbl){const g=document.querySelector('#modal.kcoop [data-coop="go"]');window.__f1dbl=g&&g.offsetParent!==null?'go':'none';if(window.__f1dbl==='go')g.click()};return'resume'}
    const t=[...document.querySelectorAll('button')].find(b=>vis(b)&&/^(Chơi cùng bạn|Cùng hảo hữu)/.test(b.textContent.trim()));if(t){t.click();return'co'}return''},{c:code,dbl:!!dbl}).catch(()=>'');if(r==='resume')tapped=Date.now()}
  await sleep(400)}return -1}
async function reload(o,dbl){const code=await o.p.evaluate(()=>COOP.code);await o.p.goto(BASE,DCL);return rejoin(o,code,dbl)}
/* the seat settles on `want` (fn of the view) within ms and STAYS there for hold ms (the invite screen must never come back over it) */
async function settle(o,want,ms,hold,keepHost){const t0=Date.now();let since=0,last;
 while(Date.now()-t0<ms){last=await co(o);if(keepHost)await clear(o,keepHost);if(want(last)){if(!since)since=Date.now();if(Date.now()-since>=hold)return{ok:true,ms:since-t0,v:last}}else since=0;await sleep(400)}return{ok:false,v:last}}
const onPanel=v=>v.st==='open'&&v.peer&&v.title&&v.pick&&!v.invite&&v.waitW;
const inGame=v=>v.st==='open'&&v.peer&&!v.title&&v.world&&!v.invite;
const hostCard=v=>v.st==='open'&&v.card&&!v.title;
async function room(b,VA,VB,hostHold){const A=await mkCtx(b,VA[0],VA[1]),B=await mkCtx(b,VB[0],VB[1]);A.p=await A.page();B.p=await B.page();
 await A.p.goto(BASE,DCL);await A.p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2500);
 if(!await tapText(A.p,/^(Chơi cùng bạn|Cùng hảo hữu)/))throw new Error('no co-op button');await sleep(600);await tapText(A.p,/^(Mời bạn|Mời hảo hữu)/);
 await A.p.waitForFunction(()=>window.COOP&&COOP.code&&COOP.seat==='a',null,{timeout:40000});const code=await A.p.evaluate(()=>COOP.code);L('room',code,'host',A.name);
 await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2500);await tapText(B.p,/^Vào phòng/,4000);
 await B.p.waitForFunction(()=>window.COOP&&COOP.seat==='b',null,{timeout:60000});A.code=B.code=code;
 /* the host stops on her card (or her roulette); the guest waits on the panel */
 const h=await settle(A,v=>hostHold==='roul'?v.st==='open'&&v.roul&&!v.title:hostCard(v),60000,1500,hostHold||true);
 const g=await settle(B,onPanel,30000,1500);
 return {A,B,code,ok:h.ok&&g.ok,info:{h:h.v,g:g.v}}}
async function hostPicks(A){for(let i=0;i<40;i++){const s=await A.p.evaluate(()=>{const m=document.getElementById('modal');const b=m&&!m.hidden&&[...m.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&/^Nhận thân phận/.test(x.textContent.trim()));if(b){b.click();return'ok'}return''}).catch(()=>'');if(s)return true;await clear(A,true);await sleep(300)}return false}
async function after(id,A,B){const pk=await hostPicks(A);ok(pk,id+' host takes her «Thân phận kiếp này» (Nhận thân phận)');
 const g=await settle(B,inGame,60000,1500,'all');ok(g.ok,id+' guest goes into the game once the host picked'+(g.ok?' ('+g.ms+' ms)':''),g.ok?undefined:{B:await dbg(B)});
 const h=await settle(A,inGame,60000,500,'all');ok(h.ok,id+' host in the game',h.ok?undefined:{A:await dbg(A)});
 for(let i=0;i<20;i++){await clear(A);await clear(B);await sleep(200)}
 const adv=await advance(A,B);ok(adv,id+' the room advances one buổi for both',adv?undefined:{A:await dbg(A),B:await dbg(B)})}
const ROWS={
 P1:async(A,B)=>{const t=await reload(B);ok(t>=0,'P1 guest back in the room after reload');
  const s=await settle(B,onPanel,30000,8000,null);ok(s.ok,'P1 guest on the waiting panel «Đợi hảo hữu chọn thân phận» (not the invite) and stays there 8 s',s.ok?undefined:{B:await dbg(B)});
  /* the waiting panel has no kit ✕ / Esc / ground close that could leave the room (its only way out, «‹ Về màn đầu», keeps the room in the list) */
  const x=await B.p.evaluate(()=>{const r=typeof kitModalClose==='function'?null:'no kitModalClose';const v=__co();return{kx:v.kx,closer:document.getElementById('modal').dataset.kx||'',r}}).catch(e=>({err:e.message}));
  ok(!x.kx&&x.closer!=='1','P1 the waiting panel has no ✕ that leaves the room',x);
  await B.p.keyboard.press('Escape').catch(()=>{});await sleep(800);const e=await co(B);ok(onPanel(e)&&e.room===B.code,'P1 Esc on the waiting panel keeps her in the room',e);
  const h=await co(A);ok(hostCard(h),'P1 host still on her card',h);await after('P1',A,B)},
 P2:async(A,B)=>{ok(await reload(B)>=0,'P2 guest back after reload 1');ok((await settle(B,onPanel,30000,3000)).ok,'P2 waiting panel after reload 1');
  ok(await reload(B)>=0,'P2 guest back after reload 2');const s=await settle(B,onPanel,30000,8000);ok(s.ok,'P2 waiting panel after reload 2, stays 8 s',s.ok?undefined:{B:await dbg(B)});await after('P2',A,B)},
 P3:async(A,B)=>{ok(await reload(B)>=0,'P3 guest back after reload (host on her roulette)');const s=await settle(B,onPanel,30000,8000);ok(s.ok,'P3 waiting panel, stays 8 s',s.ok?undefined:{B:await dbg(B)});await after('P3',A,B)},
 P4:async(A,B)=>{ok(await reload(A)>=0,'P4 host back in the room after reload');const h=await settle(A,hostCard,60000,3000,true);ok(h.ok,'P4 host back on her card (not the invite)',h.ok?undefined:{A:await dbg(A)});
  const g=await settle(B,onPanel,30000,5000);ok(g.ok,'P4 guest still on the waiting panel',g.ok?undefined:{B:await dbg(B)});await after('P4',A,B)},
 P5:async(A,B)=>{await Promise.all([A.p.goto(BASE,DCL),B.p.goto(BASE,DCL)]);const [x,y]=await Promise.all([rejoin(A,A.code),rejoin(B,B.code)]);ok(x>=0&&y>=0,'P5 both back after reload');
  const h=await settle(A,hostCard,60000,3000,true);ok(h.ok,'P5 host on her card',h.ok?undefined:{A:await dbg(A)});const g=await settle(B,onPanel,30000,5000);ok(g.ok,'P5 guest on the waiting panel',g.ok?undefined:{B:await dbg(B)});await after('P5',A,B)},
 P7:async(A,B)=>{ok(await reload(B,true)>=0,'P7 guest back after reload: «Trở lại phòng», then «Vào phòng» on the connecting screen at once (a second tap)');const d=await B.p.evaluate(()=>window.__f1dbl).catch(()=>'');ok(d==='go','P7 set-up: the second tap really hit «Vào phòng»',d);const s=await settle(B,onPanel,30000,8000);
  ok(s.ok,'P7 waiting panel (no «Chưa vào được phòng» from the first tap), stays 8 s',s.ok?undefined:{B:await dbg(B)});await after('P7',A,B)},
 P6:async(A,B)=>{await after('P6 set-up',A,B);ok(await reload(B)>=0,'P6 guest back after reload');const s=await settle(B,inGame,60000,5000,'all');ok(s.ok,'P6 guest straight back in the game',s.ok?undefined:{B:await dbg(B)});
  for(let i=0;i<20;i++){await clear(A);await clear(B);await sleep(200)}ok(await advance(A,B),'P6 the room advances one buổi after')}};
(async()=>{const b=await chromium.launch({args:['--disable-web-security','--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']});
 const FOLD=['fold',[755,1000,2]],IPAD=['ipad',[1180,820,2]];const [VA,VB]=process.env.COOP_SWAP?[IPAD,FOLD]:[FOLD,IPAD];
 for(const id of Object.keys(ROWS)){if(ONLY.length&&!ONLY.includes(id))continue;L(id);
  const R=await room(b,VA,VB,id==='P3'?'roul':null).catch(e=>({err:e.message}));
  if(R.err||!R.ok){ok(false,id+' set-up: host on her '+(id==='P3'?'roulette':'card')+', guest on the waiting panel',R.err||R.info);if(R.A){await R.A.ctx.close();await R.B.ctx.close()}continue}
  ok(true,id+' set-up: host on her '+(id==='P3'?'roulette':'card')+', guest on the waiting panel');
  await ROWS[id](R.A,R.B).catch(e=>ok(false,id+' '+e.message));
  const errs=R.A.errs.concat(R.B.errs);ok(!errs.length,id+' no page errors',errs.slice(0,6));await R.A.ctx.close();await R.B.ctx.close()}
 await b.close();const f=res.filter(x=>!x[0]).length;console.log(f?'FAIL coop-f1-rejoin: '+f+' of '+res.length:'PASS coop-f1-rejoin: '+res.length+' checks');process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
