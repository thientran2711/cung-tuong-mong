/* Co-op chat "Thư từ" (KIT §80, review/coop-chat): two Playwright clients in one room against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-chat.js <outdir> [AxB@dpr default 755x1000@2] [BxH default 1180x820@2] [workerURL]
   A (host) runs with motion on (shake + glow), B (guest) with reduced motion (still glow only). Checks: send/receive, badge, shake, sound flag,
   escaping, 300-char cut, ✕ / Esc, history after rejoin, a line sent while the friend was away, never in solo (no icon before / after co-op). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||"/tmp/coopchat-out");fs.mkdirSync(OUT,{recursive:true});
const vpArg=(s,d)=>{const m=String(s||d).match(/^(\d+)x(\d+)(?:@([\d.]+))?$/);return[+m[1],+m[2],+(m[3]||2)]};
const VA=vpArg(process.argv[3],"755x1000@2"),VB=vpArg(process.argv[4],"1180x820@2");
const WURL=process.argv[5]||"https://ctm-coop.victoria-tntt.workers.dev";
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:vp[3]?'reduce':'no-preference'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* one view of the co-op hooks, whatever the client module names them */
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);/* a loaded test machine can take > 30 s to load the 3.7 MB page */
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
const shot=async(o,n)=>{await o.p.waitForTimeout(400);const t0=Date.now();const alive=await Promise.race([o.p.evaluate(()=>1),sleep(10000).then(()=>0)]);if(!alive){ok(false,`${n} ${o.name}: page responsive`);return}
  try{await o.p.screenshot({path:`${OUT}/${n}-${o.name}.png`,timeout:120000})}catch(e){ok(false,`${n} ${o.name}: screenshot (${e.message.split('\n')[0]})`);return}
  const ov=await o.p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov,`${n} ${o.name}: no horizontal overflow`)};
const C=o=>o.p.evaluate(()=>__co());
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}}
/* wait for fn while both players read their dialogs (the week's end goes out only once her dialogs are closed) */
async function untilC(o,fn,arg,ms=40000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(fn,arg).catch(()=>false))return true;for(const x of ALL)if(x.p&&!x.p.isClosed())await clear(x);await sleep(300)}return false}
const ALL=[];
/* DOMContentLoaded, not load: a CDN picture or font that hangs on the network held the load event past 120 s (3 of ~17 runs, always the guest's join); the game is up at DCL and every step waits for its own state */
const DCL={waitUntil:'domcontentloaded'};
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){/* the click itself is done; a navigation it starts (Chơi một mình → the sổ) is waited for by the caller's own state checks (a slow machine held 'scheduled navigations' past 30 s) *//* the panel may re-render between finding the button and clicking it (element detached): find it again */
  try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
/* close story/news modals of the normal game (never the co-op waiting/freeze panel) */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled])');if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const CC=(o,f,a)=>o.p.evaluate(f,a);
const ICON=o=>o.p.evaluate(()=>{const b=document.querySelector('#krail [data-rail="chat"]');if(!b||!b.offsetParent)return null;const r=b.getBoundingClientRect(),st=document.getElementById('stage').getBoundingClientRect();
  return{x:r.left-st.left,y:r.top-st.top,w:r.width,h:r.height,left:r.left-st.left<st.width/2,badge:/kbadge/.test(b.className)?'1':'',cls:b.className,vis:r.width>0&&r.right<=innerWidth&&r.left>=0}});
const life=async o=>{for(let i=0;i<30;i++){const r=await o.p.evaluate(()=>{const k=document.getElementById('kroul');if(!k)return'gone';const bs=[...k.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);
  const b=bs.find(x=>/^(Nhận thân phận|Nhập cung|Tiến cung|Vào cung|Tiếp)/.test(x.textContent.trim()))||bs.find(x=>!/Bỏ qua|Quay/.test(x.textContent))||bs[0];if(b){b.click();return b.textContent.trim()}return'wait'});
  if(r==='gone')return true;await clear(o,3);await sleep(600)}return false};
const home=async o=>{await o.p.evaluate(()=>{try{if(S.place!=='home'&&typeof goTo==='function')goTo('home');tab='act';render()}catch(e){}});await sleep(500)};
const rstep=async o=>{const r=await o.p.evaluate(()=>{const k=document.getElementById('kroul');if(!k)return null;const bs=[...k.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);
  const b=bs.find(x=>/^(Nhận thân phận|Nhập cung|Tiến cung|Vào cung|Tiếp)/.test(x.textContent.trim()))||bs.find(x=>!/Bỏ qua|Quay/.test(x.textContent))||bs[0];if(!b)return'wait';const q=b.getBoundingClientRect();return{x:q.left+q.width/2,y:q.top+q.height/2}});
  if(r===null)return'gone';if(r==='wait')return'wait';try{await o.p.mouse.click(r.x,r.y)}catch(e){}return'clicked'};
async function dismiss(o){for(let i=0;i<40;i++){const r=await rstep(o);await clear(o,2);if(r==='gone')return true;await sleep(500)}return false}
async function inRoomWorld(A,B,code){const t0=Date.now();while(Date.now()-t0<150000){await rstep(A);await rstep(B);await clear(A,3);await clear(B,3);const a=await A.p.evaluate(()=>__co().world),c=await B.p.evaluate(()=>__co().world);if(a&&c)break;await sleep(500)}console.log('   world',await A.p.evaluate(()=>__co().world),await B.p.evaluate(()=>__co().world),Math.round((Date.now()-t0)/1000)+'s')}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-web-security','--disable-features=PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults']}:{});
 const A=await mk(b,'A',[...VA,1]),B=await mk(b,'B',[...VB,1]);ALL.push(A,B);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await A.p.evaluate(()=>!document.querySelector('#krail [data-rail="chat"]')&&!window.COOPW.on),'solo / title: no chat icon, co-op off');
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined, both online');
await inRoomWorld(A,B);for(let i=0;i<60;i++){const ra=await rstep(A),rb=await rstep(B);await clear(A,3);await clear(B,3);if(ra==='gone'&&rb==='gone')break;await sleep(600)}await A.p.emulateMedia({reducedMotion:'no-preference'});/* A: motion ON from here (the roulette / world entry runs reduced, like coop-e2e) */ok(await until(A,()=>__co().world,null,60000)&&await until(B,()=>__co().world,null,60000),'both players are in the shared world');for(const o of[A,B])for(let i=0;i<12;i++){const m=await o.p.evaluate(()=>{const b=document.querySelector('#modal:not([hidden]) [data-nl="ok"]');if(b){b.click();return 1}return 0});if(!m)break;await sleep(700)}
 await clear(A);await clear(B);await home(A);await home(B);
 ok(await until(A,()=>!!document.querySelector('#krail [data-rail="chat"]'),null,8000)&&await until(B,()=>!!document.querySelector('#krail [data-rail="chat"]'),null,8000),'both rooms show the chat icon');
 for(const o of[A,B]){const i=await ICON(o);ok(i&&i.left&&i.vis&&i.badge==='','icon on the LEFT of the room scene, no badge yet ('+o.name+')',i)}
 await shot(A,'01-icon');await shot(B,'01-icon');
 /* A writes through the UI while closed→open */
 await dismiss(A);await A.p.click('#krail [data-rail="chat"]',{noWaitAfter:true});ok(await until(A,()=>!!document.getElementById('kchatp')),'A: tap icon opens the frame');
 ok(await A.p.evaluate(()=>/Thư từ/.test(document.querySelector('#kchatp .kptitle').textContent)&&!!document.querySelector('#kchatp .kit-x')&&!!document.querySelector('#kchatp .kchat-empty')),'frame: title Thư từ, kit ✕, empty note');
 await shot(A,'02-open-empty');
 const nasty='Chào <b>muội</b> & <img src=x onerror=window.__xss=1> ơi';
 await A.p.fill('#kchat-in',nasty);await A.p.click('#kchat-go',{noWaitAfter:true});
 ok(await until(A,()=>COOPCHAT.msgs.length===1),'A sees her own line (server echo)',await A.p.evaluate(()=>({st:COOP.state&&COOP.state.status,peer:COOP.state&&COOP.state.peerOnline,ws:COOP.ws&&COOP.ws.readyState,cw:!!(window.COOPW&&COOPW.on),S:typeof S!=='undefined'&&!!S&&!S.dead,mc:window.COOPCHAT&&COOPCHAT.msgs.length,v:!!document.querySelector('#kchat-in'),val:(document.querySelector('#kchat-in')||{}).value,errs:0})).catch(e=>String(e)));console.log('   A.errs',A.errs.slice(0,3));
 ok(await until(B,()=>COOPCHAT.msgs.length===1),'B receives it');
 const nA=await A.p.evaluate(()=>S.name);
 const bi=await ICON(B);ok(bi&&bi.badge==='1'&&/kbadge/.test(bi.cls),'B: unread badge 1 + lit icon',bi);
 
 ok(await B.p.evaluate(()=>COOPCHAT.sounds===1&&(KSFX.log.concat(KSFX.drop).some(x=>x.m==='notice'||/notice/.test(x.n||'')))),'B: notification sound requested (kit sfx notice)',await B.p.evaluate(()=>({s:COOPCHAT.sounds,l:KSFX.log.concat(KSFX.drop).slice(-3)})));
 await shot(B,'03-unread');
 await dismiss(B);await B.p.click('#krail [data-rail="chat"]',{noWaitAfter:true});await B.p.waitForSelector('#kchatp .kcm');
 const bub=await B.p.evaluate(()=>{const x=document.querySelector('#kchatp .kcm.fr');return{t:x.querySelector('.kcm-x').textContent,html:x.querySelector('.kcm-x').children.length,n:x.querySelector('.kcm-h b').textContent,w:x.querySelector('.kcm-h span').textContent,xss:!!window.__xss,un:COOPCHAT.unread}});
 ok(bub.t===nasty&&bub.html===0&&!bub.xss,'B: text shown as plain text (HTML escaped)',bub);ok(bub.n==='Hảo hữu'&&/tháng/.test(bub.w),'unmet friend: signature = the header chip label "Hảo hữu" (OD:L165), game-style time',[bub.n,bub.w]);
 /* met friend (j61 stage 2): her real name, panel header too (reopen), kitRankNamePaint leaves it alone */
 await B.p.evaluate(()=>{k61Know(COOPW.friend(),'test',true,2)});
 await B.p.evaluate(s=>document.querySelector(s).click(),'#kchatp .kit-x');await until(B,()=>!document.getElementById('kchatp'));
 await B.p.evaluate(s=>document.querySelector(s).click(),'#krail [data-rail="chat"]');await B.p.waitForSelector('#kchatp .kcm');await B.p.waitForTimeout(600);
 const bubM=await B.p.evaluate(()=>({n:document.querySelector('#kchatp .kcm.fr .kcm-h b').textContent,h:document.querySelector('#kchatp .kpsub,#kchatp .kptitle+*').textContent}));
 ok(bubM.n===nA&&bubM.h.includes(nA),'met friend: signature + header = her real name',[bubM,nA]);await shot(B,'04b-open-friend-met');ok(bub.un===0,'opening marks it read');
 await shot(B,'04-open-friend');
 await B.p.fill('#kchat-in','Được thôi.');await B.p.keyboard.press('Enter');
 ok(await until(B,()=>COOPCHAT.msgs.length===2),'B sends with Enter');
 await B.p.keyboard.press('Escape');ok(await until(B,()=>!document.getElementById('kchatp')),'Esc closes the frame back to the icon');
 /* A has the frame open: the reply shows at once, no badge */
 ok(await until(A,()=>COOPCHAT.msgs.length===2&&document.querySelectorAll('#kchatp .kcm').length===2),'A (frame open): reply appears in the list, in order');
 const aU=await A.p.evaluate(()=>({n:document.querySelector('#kchatp .kcm.fr .kcm-h b').textContent,h:document.querySelector('#kchatp .kpsub,#kchatp .kptitle+*').textContent}));
 ok(aU.n==='Hảo hữu'&&aU.h.includes('hảo hữu'),'host, unmet friend: signature + header = "Hảo hữu" (same label as the header chip)',aU);
 await shot(A,'05-two-lines');
 /* host, friend met: real name */
 const nB=await B.p.evaluate(()=>S.name);await A.p.evaluate(()=>{k61Know(COOPW.friend(),'test',true,2)});
 await A.p.evaluate(s=>document.querySelector(s).click(),'#kchatp .kit-x');await until(A,()=>!document.getElementById('kchatp'));
 await A.p.evaluate(s=>document.querySelector(s).click(),'#krail [data-rail="chat"]');await A.p.waitForSelector('#kchatp .kcm.fr');await A.p.waitForTimeout(600);
 const aM=await A.p.evaluate(()=>({n:document.querySelector('#kchatp .kcm.fr .kcm-h b').textContent,h:document.querySelector('#kchatp .kpsub,#kchatp .kptitle+*').textContent}));
 ok(aM.n===nB&&aM.h.includes(nB),'host, friend met: signature + header = her real name',[aM,nB]);await shot(A,'05b-two-lines-met');
 await A.p.click('#kchatp .kit-x',{noWaitAfter:true});ok(await until(A,()=>!document.getElementById('kchatp')&&!!document.querySelector('#krail [data-rail="chat"]')),'✕ closes the frame back to the icon');
 ok((await ICON(A)).badge==='','A: no unread after reading');
 /* a line while the frame is closed on A (motion ON): shake + glow + sound */
 await B.p.fill('#kchat-in','').catch(()=>{});await B.p.evaluate(()=>COOPCHAT.send('Còn nữa, muội ơi'));
 ok(await until(A,()=>COOPCHAT.unread===1),'A: unread 1 while closed');
 const ai=await ICON(A);ok(ai&&ai.badge==='1'&&/kbadge/.test(ai.cls),'A: badge + glow',ai);
 ok(await A.p.evaluate(()=>COOPCHAT.shakes>=1&&COOPCHAT.sounds>=1),'A (motion on): shakes counted + sound requested',await A.p.evaluate(()=>[COOPCHAT.shakes,COOPCHAT.sounds]));
 ok(await B.p.evaluate(()=>COOPCHAT.shakes===0),'B (reduced motion): no shake, still glow only');
 await shot(A,'06-shake');
 /* 300-char cut + offline delivery + history after rejoin */
 await A.p.evaluate(()=>COOPCHAT.send('x'.repeat(450)));
 ok(await until(B,()=>COOPCHAT.msgs.length>=4),'B gets the long line');ok(await B.p.evaluate(()=>COOPCHAT.msgs.slice(-1)[0].x.length===300),'long line cut at 300 characters');
 const seenB=await B.p.evaluate(()=>COOPCHAT.msgs.length);
 await B.p.close();await sleep(1500);
 await A.p.evaluate(()=>COOPCHAT.send('Muội đâu rồi?'));await sleep(800);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,60000),'B rejoined');await inRoomWorld(A,B);await clear(B);await home(B);
 ok(await until(B,n=>COOPCHAT.msgs.length===n,seenB+1,25000),'rejoin: history reloaded (all lines, in order) incl. the line sent while away',await B.p.evaluate(()=>COOPCHAT.msgs.map(m=>m.i)));
 const bi2=await ICON(B);ok(bi2&&bi2.badge==='2'||bi2&&bi2.badge==='1'||bi2&&+bi2.badge>=1,'rejoin: unread badge counts what she missed',bi2);
 await shot(B,'07-rejoined');
 await dismiss(B);await B.p.click('#krail [data-rail="chat"]',{noWaitAfter:true});await B.p.waitForSelector('#kchatp .kcm');await shot(B,'08-history');
 ok(await B.p.evaluate(()=>document.querySelectorAll('#kchatp .kcm').length===COOPCHAT.msgs.length&&COOPCHAT.msgs.length>=5),'history list shows every line');
 /* other places: the rail is on every stage */
 await B.p.click('#kchatp .kit-x',{noWaitAfter:true});const s0=await B.p.evaluate(()=>COOPCHAT.sounds);
 await B.p.evaluate(()=>{S.place='vuon';tab='act';render()});await sleep(800);
 ok(await B.p.evaluate(()=>!!document.querySelector('#krail [data-rail="chat"]')),'other place: the same rail icon (one column on every stage)');
 await A.p.evaluate(()=>COOPCHAT.send('Ta ở đây.'));
 ok(await until(B,n=>COOPCHAT.sounds>n&&COOPCHAT.unread>=1,s0,15000),'away: a new line still gives the sound + unread count');
 ok(await B.p.evaluate(()=>/kbadge/.test(document.querySelector('#krail [data-rail="chat"]').className)),'other place: rail dot lit for the new line');
 await B.p.evaluate(()=>{S.place='home';render()});
 /* leaving co-op: gone (solo never shows it) */
 await A.p.evaluate(()=>COOP.leave());await sleep(800);ok(await A.p.evaluate(()=>!document.querySelector('#krail [data-rail="chat"]')),'after leaving co-op the rail has no Chat icon');
 ok(A.errs.length+B.errs.length===0,'no page errors',[...A.errs,...B.errs].slice(0,4));
 const bad=res.filter(r=>!r[0]);console.log(bad.length?'FAILED '+bad.length:'ALL OK',res.length+' checks');fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok   ':'FAIL ')+r[1]).join('\n'));
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
