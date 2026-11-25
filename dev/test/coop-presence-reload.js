/* dev/test/coop-presence-reload.js — co-op PRESENCE after a real page reload (review/coop-presence-reload; U3b R7DR + U1 VZ68:
   after a save + reload one seat showed «Đợi hảo hữu trở lại — hảo hữu đang vắng» while the friend played on, no socket drop logged).
   Two real Chromium clients: Fold portrait 755x1000@2 (host, seat a) + iPad landscape 1180x820@2 (guest, seat b); COOP_SWAP=1 = iPad hosts.
   usage: python3 dev/build/assemble.py && node dev/test/coop-presence-reload.js [workerURL]   (default a local `wrangler dev` on :8788)
   Rows (each: the reload, then BOTH seats see each other online within ONLINE_S s, then the room really advances one buổi, then after
   IDLE_S s of nobody touching anything both still see each other online):
     R1 guest reload · R2 host reload · R3 both reload together · R4 guest reload while the host already ended her buổi (mid-buổi)
     R5 old socket closed late (the seat opens in a NEW tab while the old tab still holds its socket; the old tab closes ~LATE_S s later)
     R6 host idle (only the socket's own keep-alive) for IDLE_S s while the guest waits ready → nobody is marked absent
     R7 stale view: the host's page loses the presence frames that say the guest is back (guest reload); afterwards no frame is lost
        → the host's «hảo hữu đang vắng» must heal by itself (base: it stays for ever = R7DR / VZ68's picture: one seat absent, the other playing)
     R8 missed close: the guest's tab stops its keep-alive and never hears its socket close (the room buries it after 45 s); the tab then runs
        normally again → the guest must rejoin by itself (base: it sits «open» on a dead socket, the host reads her away for ever)
   Exit 1 on any FAIL. */
const {chromium}=require('playwright');
const {serve,BASE}=require('./coop-serve.js');
const WURL=process.argv[2]||'http://127.0.0.1:8788';
const ONLINE_S=+process.env.ONLINE_S||20,IDLE_S=+process.env.IDLE_S||70,LATE_S=+process.env.LATE_S||8;
const ONLY=(process.env.ROWS||'').split(',').filter(Boolean);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,+process.env.DUMP||1500):''))};
const DCL={waitUntil:'domcontentloaded'};
const CO=()=>{const c=window.COOP;if(!c||!c.state)return{};const s=c.state;return{st:s.status,seat:s.you,peer:!!s.peerOnline,both:!!s.bothIn,week:s.week,
  key:(s.week||0)+':'+((typeof S!=='undefined'&&S&&S.buoi)||0),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base),bend:!!(window.COOPW&&(COOPW.bend||COOPW.pend))}};
async function mkCtx(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
 await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;window.__bot={pre:1}},WURL);await ctx.addInitScript('window.__co='+CO.toString());
 /* socket log: every WebSocket this page opens, its close code, and every presence / room frame (seats online) it hears */
 await ctx.addInitScript(()=>{const W0=window.WebSocket,t0=Date.now();window.__wsLog=[];window.WebSocket=function(u,p){const w=p===undefined?new W0(u):new W0(u,p);const L=window.__wsLog;const i=L.length;L.push([Date.now()-t0,'new',window.__wsStack?String(new Error().stack).split('\n').slice(2,9).map(x=>x.trim().replace(/\(.*?index.html[^:]*:/,'(:')).join(' < '):'']);
   w.addEventListener('open',()=>L.push([Date.now()-t0,'open',i]));w.addEventListener('close',e=>L.push([Date.now()-t0,'close',i,e.code]));
   w.addEventListener('message',e=>{if(typeof e.data==='string'&&/"t":"(presence|room)"/.test(e.data)){try{const m=JSON.parse(e.data);L.push([Date.now()-t0,m.t,i,JSON.stringify(m.seats)])}catch(x){}}if(L.length>80)L.splice(0,L.length-80)});
   /* fault injection (rows R7 / R8 only; off otherwise):
      __lostBack  = this page never hears a presence that says the friend is here (a lost / late presence frame: the stale-view family);
      __missClose = this page sends nothing (a hung tab) and never hears the close of its socket (a hung / frozen tab while the room buried it) */
   let hm=null,hc=null;Object.defineProperty(w,'onmessage',{configurable:true,get:()=>hm,set(f){hm=f}});Object.defineProperty(w,'onclose',{configurable:true,get:()=>hc,set(f){hc=f}});
   w.addEventListener('message',e=>{if(!hm)return;if(window.__lostBack&&typeof e.data==='string'&&/"t":"presence"/.test(e.data)){try{const m=JSON.parse(e.data);const x=window.COOP&&COOP.other&&COOP.other();if(x&&m.seats&&m.seats[x]&&m.seats[x].online){L.push([Date.now()-t0,'DROPPED presence',i]);return}}catch(z){}}hm.call(w,e)});
   w.addEventListener('close',e=>{if(window.__missClose){L.push([Date.now()-t0,'MISSED close',i,e.code]);return}if(hc)hc.call(w,e)});
   const sd=w.send.bind(w);w.send=x=>{if(window.__missClose)return;return sd(x)};return w};
  window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})});
 const o={name,ctx,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(180000);p.on('pageerror',e=>o.errs.push(e.message.slice(0,160)));return p};return o}
async function tapText(p,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source).catch(()=>null);
  const el=h&&h.asElement();if(el){try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
const CLEAR1=()=>{const c=__co();if(typeof S!=='undefined'&&S&&S.mg){try{S.mg=null;render()}catch(e){}return'mg'}
 const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ|Bỏ qua)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
 const m=document.getElementById('modal');if(!m||m.hidden)return'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null&&!x.dataset.kcp);
 const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||m.querySelector('.opts button:not([disabled])')||all.pop();if(b){b.click();return'x'}return''};
async function clear(o){for(let i=0;i<25;i++){const s=await require('./lib/coop-clear.js').first(o,CLEAR1).catch(()=>'');if(s!=='x'&&s!=='mg')return s;await sleep(200)}}
async function press(o){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(()=>{if(__co().bend)return'end';const b=document.getElementById('next');if(!b||b.disabled||b.offsetParent===null)return'';b.click();return'pressed'}).catch(()=>'');if(r)return r;await sleep(250)}return''}
const co=o=>o.p.evaluate(()=>__co()).catch(e=>({err:e.message}));
const dbg=async o=>{const r=await o.p.evaluate(()=>({co:__co(),ws:(window.__wsLog||[]).slice(-14),tr:window.COOPW&&COOPW.tr?COOPW.tr.slice(-8):null})).catch(e=>({err:e.message}));r.scr=await o.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message);return r};
/* both seats: status open + the friend online, for `ms` */
async function bothOnline(A,B,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await co(A),c=await co(B);if(a.st==='open'&&c.st==='open'&&a.peer&&c.peer)return Date.now()-t0;await clear(A);await clear(B);await sleep(300)}return -1}
/* one buổi for both: each presses, the room key moves on both */
async function advance(A,B,ms=90000){const k0=(await co(A)).key;await press(A);await press(B);const t0=Date.now();
 while(Date.now()-t0<ms){const a=await co(A),c=await co(B);if(a.key!==k0&&c.key!==k0&&a.key===c.key)return true;await clear(A);await clear(B);await press(A);await press(B);await sleep(300)}return false}
/* rejoin after a reload, like a player: the title's «Cùng hảo hữu», then «Trở lại phòng» of THIS room (data-room = the code; never another
   room, never «Mời hảo hữu»). The page is loaded WITHOUT ?room= (that link joins by itself and a second tap would make a twin). */
async function rejoin(o,code){await o.p.waitForFunction(()=>typeof start==='function'&&window.__ctmBuilt===1,null,{timeout:180000}).catch(()=>{});await sleep(1500);
 const t0=Date.now();let tapped=0;
 while(Date.now()-t0<120000){const c=await co(o);if(c.st==='open'&&c.world)return true;
  if(c.st!=='open'&&c.st!=='connecting'&&c.st!=='retry'&&Date.now()-tapped>15000){
   const r=await o.p.evaluate(code=>{const vis=b=>b&&b.offsetParent!==null&&!b.disabled;const rb=document.querySelector('button[data-coop="resume"][data-room="'+code+'"]');if(vis(rb)){rb.click();return'resume'}
    const t=[...document.querySelectorAll('button')].find(b=>vis(b)&&/^(Chơi cùng bạn|Cùng hảo hữu)/.test(b.textContent.trim()));if(t){t.click();return'co'}return''},code).catch(()=>'');if(r&&process.env.RJDBG)L('rejoin tap',r,code,JSON.stringify(c));if(r==='resume')tapped=Date.now()}
  if(c.st==='open')await clear(o);/* only once in the room: before that #modal is the room list, whose last button is «Mời hảo hữu» (a NEW room) */await sleep(500)}return false}
async function reload(o){const code=await o.p.evaluate(()=>COOP.code);await o.p.goto(BASE,DCL);return rejoin(o,code)}
async function idle(A,B,s){/* nobody touches anything for s seconds (each page keeps only its own socket keep-alive), sampling presence */
 let bad=null;const t0=Date.now();while(Date.now()-t0<s*1000){const a=await co(A),c=await co(B);if(!(a.st==='open'&&c.st==='open'&&a.peer&&c.peer)&&!bad)bad={at:Math.round((Date.now()-t0)/1000),a,c};await sleep(2000)}return bad}
async function row(id,name,A,B,fn){if(ONLY.length&&!ONLY.includes(id))return;L(id,name);
 const pre=await bothOnline(A,B,30000);if(pre<0){ok(false,id+' '+name+': both online before the row',{A:await dbg(A),B:await dbg(B)});return}
 const r=await fn().catch(e=>({err:e.message}));if(r&&r.err)ok(false,id+' '+name+': '+r.err);
 const t=await bothOnline(A,B,ONLINE_S*1000);ok(t>=0,id+' '+name+': both seats see each other online within '+ONLINE_S+' s',t>=0?undefined:{A:await dbg(A),B:await dbg(B)});
 const adv=await advance(A,B);ok(adv,id+' '+name+': the room advances one buổi after',adv?undefined:{A:await dbg(A),B:await dbg(B)});
 if(+process.env.NO_IDLE)return;const bad=await idle(A,B,IDLE_S);ok(!bad,id+' '+name+': '+IDLE_S+' s idle after, nobody is marked absent',bad?Object.assign(bad,{A:await dbg(A),B:await dbg(B)}):undefined)}
(async()=>{const b=await chromium.launch({args:['--disable-web-security','--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']});
 const FOLD=['fold',[755,1000,2]],IPAD=['ipad',[1180,820,2]];const [VA,VB]=process.env.COOP_SWAP?[IPAD,FOLD]:[FOLD,IPAD];
 const A=await mkCtx(b,VA[0],VA[1]),B=await mkCtx(b,VB[0],VB[1]);A.p=await A.page();B.p=await B.page();
 await A.p.goto(BASE,DCL);await A.p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2500);
 if(!await tapText(A.p,/^(Chơi cùng bạn|Cùng hảo hữu)/))throw new Error('no co-op button');await sleep(600);await tapText(A.p,/^(Mời bạn|Mời hảo hữu)/);
 await A.p.waitForFunction(()=>window.COOP&&COOP.code&&COOP.seat==='a',null,{timeout:40000});const code=await A.p.evaluate(()=>COOP.code);L('room',code,'host',A.name);
 await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2500);await tapText(B.p,/^Vào phòng/,4000);
 await B.p.waitForFunction(()=>window.COOP&&COOP.seat==='b',null,{timeout:60000});
 {const t0=Date.now();let w=false;while(Date.now()-t0<120000){await clear(A);await clear(B);if((await co(A)).world&&(await co(B)).world){w=true;break}await sleep(500)}ok(w,'set-up: both seats in the shared world')}
 ok(await advance(A,B),'set-up: the room advances one buổi before any reload');
 await row('R1','guest reload',A,B,async()=>{ok(await reload(B),'R1 guest rejoined after reload');if(process.env.WSDBG)console.log(JSON.stringify(await B.p.evaluate(()=>window.__wsLog),null,0))});
 await row('R2','host reload',A,B,async()=>{ok(await reload(A),'R2 host rejoined after reload')});
 await row('R3','both reload together',A,B,async()=>{const code=await A.p.evaluate(()=>COOP.code);await Promise.all([A.p.goto(BASE,DCL),B.p.goto(BASE,DCL)]);const [x,y]=await Promise.all([rejoin(A,code),rejoin(B,code)]);ok(x&&y,'R3 both rejoined after reload')});
 await row('R4','guest reload while the host already ended her buổi',A,B,async()=>{await press(A);await sleep(800);ok(await reload(B),'R4 guest rejoined after reload')});
 await row('R5','old socket closed late (new tab first, old tab closes later)',A,B,async()=>{const code=await B.p.evaluate(()=>COOP.code);const old=B.p;B.p=await B.page();await B.p.goto(BASE,DCL);const r=await rejoin(B,code);
   await sleep(LATE_S*1000);await old.close().catch(()=>{});ok(r,'R5 seat rejoined from the new tab')});
 await row('R6','host idle while the guest waits ready',A,B,async()=>{await press(B);await sleep(1000)});
 await row('R7','stale view: the host loses the «guest is back» presence',A,B,async()=>{await A.p.evaluate(()=>{window.__lostBack=true});ok(await reload(B),'R7 guest rejoined after reload');
   await sleep(3000);const v=await co(A);await A.p.evaluate(()=>{window.__lostBack=false});ok(!v.peer,'R7 set-up: the host really missed the guest coming back',v)});
 await row('R8','missed close: the guest tab hears no close while the room buries it',A,B,async()=>{await A.p.evaluate(()=>{window.__peerOff=0;if(!window.__peerHook){window.__peerHook=1;COOP.on('peer',on=>{if(!on)window.__peerOff++})}});await B.p.evaluate(()=>{window.__missClose=true});
   const t0=Date.now();let gone=false;while(Date.now()-t0<100000){if(await A.p.evaluate(()=>window.__peerOff>0)){gone=true;break}await sleep(1000)}ok(gone,'R8 set-up: the room buried the silent guest socket (host reads her away)',gone?undefined:{A:await dbg(A),B:await dbg(B)});
   await sleep(4000);await B.p.evaluate(()=>{window.__missClose=false})});
 const errs=A.errs.concat(B.errs);ok(!errs.length,'no page errors',errs.slice(0,6));
 await b.close();const f=res.filter(x=>!x[0]).length;console.log(f?'FAIL coop-presence-reload: '+f+' of '+res.length:'PASS coop-presence-reload: '+res.length+' checks');process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
