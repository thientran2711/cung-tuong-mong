/* «Hảo hữu» partner sheet (owner 21/11 ~06:05Z mark #2; dev/build/jhaohuu.js) — BOTH seats, two Playwright browsers in one room on the LIVE Worker.
   usage: python3 dev/build/assemble.py && COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-haohuu.js <outdir> [workerURL]
   Owner canon overwrite 21/11 ~06:30Z: the entry is the «Hảo hữu» ICON in the fixed TOP BAR (KIT §69.2 kitCoopFriend), not on the stage.
   Checks: (1) SOLO: no «Hảo hữu» icon; (2) co-op, host A + guest B, each at Fold 755x1000 AND iPad 1180x820:
   the icon (#kctmf .kctmf) sits inside the top bar (header.hud), square (radius ≠ 50%), no name / status words visible, a badge (✓ / … / ⏸)
   for an online friend, grey (.koff) markup for an offline one, the stage rail has no «haohuu» item; tap → ONE kit info panel (.dlg.kpanel, seal + ✕)
   with «Hảo hữu» / «Ta» rows;
   STRANGER (unmet): title «Hảo hữu của ta», her real name nowhere in the panel, grey silhouette figure, rank/stats «chưa rõ»;
   MET: title = her name, kit rank unit (.kname) in «Danh vị», stats tiles = her real numbers, Sức khỏe = her number, Lúc này row;
   ✕ and Esc close it; no page errors; no horizontal overflow. Shots <outdir>/hh-<seat>-<dev>-<stranger|met>.jpg (scratch, never git).
   r2 (rv FAIL items 1-4, 6): the icon is the kit square button (.krailb) and a CHILD of header.hud; ONE fixed slot per seat × viewport (same box
   in every phase and state, also after the friend leaves and comes back); no word of the bar under it (text-node rects), the «!» box and the
   notice chip never on it; LIVE states between the two browsers (no markup strings): she HOLDS (frHold) → the other seat's icon still on screen
   above the hold panel with ⏸; she is READY (presses Sẵn sàng) → ✓ seen (elementFromPoint on the badge = the badge); she LEAVES (page →
   about:blank) → the icon still on screen above the freeze panel, grey (grayscale filter), no badge; she comes back → colour again, same slot. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||'/tmp/coop-haohuu');fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DEV={fold:[755,1000],ipad:[1180,820]};
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:+(process.env.HH_DSF||1),hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
 await serve(ctx);
 await ctx.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf,#kroul,#kroulw,.kroul{display:none!important}';document.head.appendChild(s)})});
 await ctx.addInitScript(()=>{window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const on=typeof c.on==='boolean'?c.on:!!(s.playing||(s.status&&s.status!=='off'));
  return{code:c.code||s.room||'',seat:c.seat||s.you||null,on,online:s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{},frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}});
 const o={ctx,name,errs:[]};const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
 p.on('pageerror',e=>o.errs.push(e.message.slice(0,200)));o.p=p;return o}
const booted=o=>o.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:90000}).catch(()=>{});
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
 return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
 const el=h.asElement();if(el){try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
/* close every story / news card (never the co-op freeze panel) — the game screen with the stage must be bare */
const bare=o=>o.p.evaluate(()=>{try{Q.length=0;const M=document.getElementById('modal');M.hidden=true;M.className='modal';
 document.querySelectorAll('.kroul,#kroul,#kroulw,.kcf,#ktut,#kcoach,.kcoach,.kmov,.kflip,#kflip,.kbk').forEach(e=>e.remove());try{kitCoachOff()}catch(e){}
 if(S&&S.mg)S.mg=null;/* the opening Thi tuyển chọn mini game (#ov) of a new life covers the stage: a player plays it first; the test closes it */const ov=document.getElementById('ov');if(ov&&ov.querySelector('.mg')){ov.hidden=true;ov.innerHTML='';document.body.classList.remove('kdlg-on')}try{S.tutDone=1}catch(e){}tab='act';render();return true}catch(e){return String(e)}});
/* close story/news modals of the normal game (never the co-op waiting/freeze panel) — copied from coop-e2e.js clear() */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{/* a manual kit scene (night-end «Nhận» #kneov, reward box): a player closes it with its own button [data-km-close] (rv night-balance-bundle, like coop-night) */const kc=[...document.querySelectorAll('.kmov [data-km-close],.kmov .krevok')].find(x=>x.offsetParent!==null&&!x.disabled&&x.getClientRects().length);if(kc){kc.click();return'x'}const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}

const clearAll=o=>clear(o);
/* a story card (.kmov) of the running game may cover the screen a moment later: clear it, then tap the icon */
/* an open partner sheet is closed by its ✕ first: the generic clear() presses a card's first option, which on this sheet is «Tạm dừng» (pauses both seats) */
const shut=o=>o.p.evaluate(()=>{const M=document.getElementById('modal');const x=!M.hidden&&M.querySelector('.dlg.kpanel .kph .kit-x');if(x&&/Hảo hữu cùng chơi/.test(M.textContent))x.click();try{if(COOPW.tm.dbg().HOLD===COOPW.seat)COOPW.frHold(false)}catch(e){}});
async function tapHH(o){for(let i=0;i<4;i++){await shut(o);await clear(o);await bare(o);await sleep(300);try{await o.p.click('#kctmf .kctmf',{timeout:5000});return true}catch(e){}}return false}
/* geometry of the icon in one state: ONE fixed slot per seat × viewport; on screen (elementFromPoint at the button centre / the badge = ours);
   no word / picture of the bar under it; the «!» box and the notice chip not on it */
const SLOT={};
async function geo(o,seat,dev,phase){/* story cards (.kmov) and the open card's outside-tap catcher (#kxcatch) of the running game cover the whole screen a moment: closed first (test only) */
 await o.p.evaluate(()=>{try{kitCatchOff()}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove())});await sleep(150);
 const g=await o.p.evaluate(()=>{const F0=document.getElementById('kctmf'),U=document.getElementById('kctmfu');const up=!!(U&&!U.hidden&&U.getClientRects().length);const F=up?U:F0,b=F&&F.querySelector('.kctmf');if(!b||!b.getClientRects().length)return null;if(F0.parentNode!==document.querySelector('header.hud'))return{notInBar:true};
  const q=r=>[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)];const R=F.getBoundingClientRect(),B=b.getBoundingClientRect();
  const hit=(a,c)=>a.left<c.right&&a.right>c.left&&a.top<c.bottom&&a.bottom>c.top;const hud=document.querySelector('header.hud');
  const words=[];const tw=document.createTreeWalker(hud,NodeFilter.SHOW_TEXT),rg=document.createRange();let n;while((n=tw.nextNode())){if(!n.nodeValue.trim()||F0.contains(n))continue;const pe=n.parentElement;if(!pe.getClientRects().length||getComputedStyle(pe).visibility==='hidden')continue;rg.selectNodeContents(n);for(const r of rg.getClientRects())if(r.width>1&&hit(r,R))words.push(n.nodeValue.trim().slice(0,20))}
  const pics=[...hud.querySelectorAll('img,svg,button,.kseal-hud')].filter(e=>!F0.contains(e)&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&hit(e.getBoundingClientRect(),R)).map(e=>e.id||e.className.toString().slice(0,20));
  const kb=document.getElementById('kntbox'),kc=document.getElementById('kntchip');
  const over=[];const onTop=e=>{const r=e.getBoundingClientRect();/* #kxcatch = the kit's TRANSPARENT outside-tap catcher under an open card (jk4, paints nothing): looked through */const t=document.elementsFromPoint(r.left+r.width/2,r.top+r.height/2).find(x=>x.id!=='kxcatch');const ok=!!t&&F.contains(t);if(!ok&&t)over.push((t.id||'')+'.'+String(t.className).slice(0,30)+'<'+(t.parentNode&&(t.parentNode.id||String(t.parentNode.className).slice(0,20))));return ok};
  const bd=b.querySelector(':scope>.kbdg');const im=b.querySelector(':scope>.kctmf-a');
  return{box:q(B),wrap:q(R),words,pics,kbox:!!(kb&&kb.getClientRects().length&&hit(kb.getBoundingClientRect(),R)),kchip:!!(kc&&kc.getClientRects().length&&getComputedStyle(kc).visibility!=='hidden'&&!kc.classList.contains('out')&&hit(kc.getBoundingClientRect(),R)),
   top:onTop(b),badge:bd?bd.textContent:'',badgeTop:bd?onTop(bd):null,grey:im?/grayscale/.test(getComputedStyle(im).filter):null,off:b.classList.contains('koff'),up,st:COOPW.frInfo().st,over}});
 const k=seat+' '+dev;ok(!!g&&!g.notInBar,`${k} ${phase}: icon on screen (the bar's own icon stays a child of the bar)`,g);if(!g||g.notInBar)return null;
 if(!SLOT[k])SLOT[k]=g.box;ok(g.box.join()===SLOT[k].join(),`${k} ${phase}: ONE fixed slot (never moves)`,{now:g.box,first:SLOT[k]});
 ok(!g.words.length&&!g.pics.length,`${k} ${phase}: no word / picture of the bar under the icon + clock`,{words:g.words,pics:g.pics});
 ok(!g.kbox&&!g.kchip,`${k} ${phase}: the «!» box and the notice chip not on it`,{kbox:g.kbox,kchip:g.kchip});
 ok(g.top&&(g.badge===''||g.badgeTop),`${k} ${phase}: icon and badge seen (nothing over them)`,{top:g.top,badgeTop:g.badgeTop,over:g.over});
 return g}
/* LIVE states between the two browsers (rv item 1: no markup strings) */
async function states(A,B,code){
 const both=async(fn,arg)=>{for(const o of [A,B])await o.p.evaluate(fn,arg)};
 for(const dev of ['fold','ipad']){for(const o of [A,B]){await o.p.setViewportSize({width:DEV[dev][0],height:DEV[dev][1]})}await sleep(900);for(const o of [A,B]){await shut(o);await clear(o);await bare(o)}await sleep(900);
  /* B holds → A sees ⏸ above the hold panel; then A holds → B sees it */
  for(const [h,v,hs,vs] of [[B,A,'guest','host'],[A,B,'host','guest']]){await h.p.evaluate(()=>COOPW.frHold(true));
   const seen=await until(v,()=>COOPW.frInfo().st==='hold'&&!!document.getElementById('kctmh'),null,15000);await sleep(700);
   const g=await geo(v,vs,dev,`hold (${hs} paused)`);ok(seen&&g&&g.badge==='⏸'&&!g.off&&g.up,`${vs} ${dev}: ${hs} holds → ⏸ badge, full colour, above the hold panel`,g&&{badge:g.badge,off:g.off,up:g.up,st:g.st});
   const gm=await geo(h,hs,dev,`hold (own pause)`);ok(!!gm,`${hs} ${dev}: own pause → icon still on screen`);
   await v.p.screenshot({path:`${OUT}/st-${vs}-${dev}-hold.jpg`,type:'jpeg',quality:72});
   await h.p.evaluate(()=>COOPW.frHold(false));await until(v,()=>!document.getElementById('kctmh'),null,15000);await sleep(600)}
 }
 /* READY: B presses Sẵn sàng → A (Fold, then iPad) sees ✓ (not under the «Hảo hữu đã sẵn sàng» notice chip) */
 await A.p.setViewportSize({width:755,height:1000});await sleep(600);await shut(B);await clear(B);await bare(B);
 await B.p.evaluate(()=>{const n=document.getElementById('next');if(n&&!n.disabled)n.click()});
 const rd=await until(A,()=>COOPW.frInfo().st==='ready',null,15000);await sleep(500);
 for(const dev of ['fold','ipad']){await A.p.setViewportSize({width:DEV[dev][0],height:DEV[dev][1]});await sleep(900);
  const g=await geo(A,'host',dev,'ready');ok(rd&&g&&g.badge==='✓'&&g.badgeTop,`host ${dev}: friend ready → green ✓ seen`,g&&{badge:g.badge,badgeTop:g.badgeTop,st:g.st});
  await A.p.screenshot({path:`${OUT}/st-host-${dev}-ready.jpg`,type:'jpeg',quality:72})}
 /* AWAY: B's page leaves → A sees the grey icon above the freeze panel, no badge */
 await B.p.goto('about:blank');const aw=await until(A,()=>COOPW.frInfo().st==='away'&&!!document.getElementById('coopfz'),null,40000);await sleep(800);
 for(const dev of ['fold','ipad']){await A.p.setViewportSize({width:DEV[dev][0],height:DEV[dev][1]});await sleep(900);
  const g=await geo(A,'host',dev,'away');ok(aw&&g&&g.off&&g.grey&&g.badge===''&&g.up,`host ${dev}: friend away → grey icon, no badge, above the freeze panel`,g&&{off:g.off,grey:g.grey,badge:g.badge,up:g.up,st:g.st});
  await A.p.screenshot({path:`${OUT}/st-host-${dev}-away.jpg`,type:'jpeg',quality:72})}
 /* BACK: B comes back → colour again, the SAME slot (rv item 4: it used to drop to the second line) */
 await B.p.goto(BASE+'?room='+code,DCL);await booted(B);await tapText(B,/^Vào phòng/,4000);
 const bk=await until(A,()=>COOPW.frInfo().st!=='away'&&!document.getElementById('coopfz'),null,60000);
 for(let i=0;i<10;i++){await clear(A);await clear(B);await sleep(400)}
 for(const dev of ['fold','ipad']){await A.p.setViewportSize({width:DEV[dev][0],height:DEV[dev][1]});await sleep(900);await shut(A);await clear(A);await bare(A);await sleep(600);
  const g=await geo(A,'host',dev,'back');ok(bk&&g&&!g.off&&!g.up,`host ${dev}: friend back → full colour, back in the bar`,g&&{off:g.off,up:g.up,st:g.st})}
 /* rv r2 N1: B just RELOADED its own page (about:blank → room again): its own icon keeps its slot (kept per viewport across reloads) */
 await B.p.setViewportSize({width:DEV.ipad[0],height:DEV.ipad[1]});await sleep(1500);await shut(B);await clear(B);await bare(B);await sleep(900);
 await geo(B,'guest','ipad','after her own page reload')}
/* the icon + panel on one seat at one device */
async function check(o,seat,dev,phase){const [W,H]=DEV[dev];await o.p.setViewportSize({width:W,height:H});await sleep(700);await bare(o);await sleep(900);
 await o.p.evaluate(()=>{try{kitStageRail.paint()}catch(e){}});await sleep(300);
 const r=await o.p.evaluate(()=>{const b=document.querySelector('#kctmf .kctmf'),hud=document.querySelector('header.hud');const q=e=>{const r=e.getBoundingClientRect();return[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
  if(!b||!b.getClientRects().length)return{box:null};const R=b.getBoundingClientRect(),H=hud.getBoundingClientRect();const inBar=R.top>=H.top-1&&R.bottom<=H.bottom+1&&R.left>=H.left-1&&R.right<=H.right+1;
  const vis=[...b.querySelectorAll('*')].filter(e=>!e.closest('.kctmf-vh')&&e.children.length===0&&e.getClientRects().length).map(e=>e.textContent.trim()).filter(Boolean);
  const bd=b.querySelector(':scope>.kbdg');const st=COOPW.frInfo().st;
  return{box:q(b),inBar,sq:getComputedStyle(b).borderRadius,vis,badge:bd&&bd.textContent,bk:bd?bd.className:'',st,off:b.classList.contains('koff'),img:(b.querySelector('img')||{}).getAttribute&&b.querySelector('img').getAttribute('src'),
   rail:!!document.querySelector('#krail [data-rail=haohuu]'),kit:b.classList.contains('krailb'),par:document.getElementById('kctmf').parentNode===hud}});
 ok(!!r.box,`${seat} ${dev} ${phase}: «Hảo hữu» icon shown`,r);
 ok(r.inBar,`${seat} ${dev} ${phase}: icon inside the fixed top bar`,r.box);
 ok(r.sq&&!/50%/.test(r.sq),`${seat} ${dev} ${phase}: square kit icon button (no round tap target)`,r.sq);
 ok(r.vis.every(t=>/^[✓…⏸]$|^⏸?\s?\d+:\d\d$|^Hết buổi$/.test(t)),`${seat} ${dev} ${phase}: no name / status words on screen (badge + clock only)`,r.vis);
 ok(r.st==='away'?(r.off&&!r.badge):(!r.off&&(r.st==='ready'?r.badge==='✓':r.st==='hold'?r.badge==='⏸':r.badge==='…')),`${seat} ${dev} ${phase}: online colour + badge matches her status`,{st:r.st,badge:r.badge,off:r.off});
 ok(!r.bk||/^kbdg (ok|busy|pause)$/.test(r.bk),`${seat} ${dev} ${phase}: the badge is the kit §77b kitStBadge part (.kbdg)`,r.bk);
 ok(r.kit&&r.par,`${seat} ${dev} ${phase}: kit square button .krailb, a child of the top bar header.hud`,{kit:r.kit,par:r.par});
 await geo(o,seat,dev,phase);
 ok(phase==='stranger'?/ico-friend/.test(r.img||''):!/ico-friend/.test(r.img||''),`${seat} ${dev} ${phase}: icon = ${phase==='stranger'?'painted kit icon (no face before meeting)':'her portrait'}`,r.img);
 ok(!r.rail,`${seat} ${dev} ${phase}: no «Hảo hữu» item left on the stage rail`);
 ok(await o.p.evaluate(()=>typeof COOPW.hold!=='function'&&!COOPW.hold&&!/bản mới/.test(document.getElementById('next').textContent)),`${seat} ${dev} ${phase}: room not held (COOPW.hold untouched, Sẵn sàng button free)`,await o.p.evaluate(()=>[typeof COOPW.hold,document.getElementById('next').textContent]));
 if(!r.box)return;
 await tapHH(o);await sleep(1400);const d=await o.p.evaluate(()=>{const M=document.getElementById('modal');const dl=M&&!M.hidden&&M.querySelector('.dlg.kpanel');if(!dl)return null;
  const f=(!!window.COOPW&&COOPW.friend&&COOPW.friend())||null;const txt=dl.textContent;const rows={};dl.querySelectorAll('.kr').forEach(r=>{const l=r.querySelector('.krl'),v=r.querySelector('.krv');if(l&&v)rows[l.textContent.trim()]=v.textContent.trim()});
  const tiles={};dl.querySelectorAll('.kst-tile').forEach(t=>{const c=[...t.children].map(x=>x.textContent.trim());tiles[c[0]]=c[1]});
  const figs=[...dl.querySelectorAll('img')].map(i=>i.getAttribute('src')||'').filter(s=>/fig|unknown|consort|maid|\/r\//.test(s));
  return{titleK:!!dl.querySelector('.kptitle [data-k61skip] .kname'),title:(dl.querySelector('.kptitle')||{}).textContent,seal:!!dl.querySelector('.kpseal'),x:!!dl.querySelector('.kph .kit-x'),rows,tiles,figs,fname:f&&f.name,hasName:!!(f&&f.name&&txt.includes(f.name)),
   known:f&&typeof isKnown61==='function'?isKnown61(f):null,named:f&&typeof k61Named==='function'?k61Named(f):null,stats:f?{sung:f.sung,duc:f.duc,danh:f.danh,sac:f.sac,tai:f.tai,tamco:f.tamco,suc:f.suc}:null,
   rankUnit:!!dl.querySelector('.kr .kname .kti'),kn:f?Object.fromEntries([['Sủng','sung'],['Đức','duc'],['Danh','danh'],['Sắc','sac'],['Tài','tai'],['Tâm cơ','tamco']].map(([l,k])=>[l,kitStatKnown0(f,k)?(k==='sung'?null:Math.round(f[k])):'chưa rõ'])):null,ov:document.documentElement.scrollWidth>innerWidth+1,
   qq:(()=>{const b=document.querySelector('#kctmf .kctmf');const L=[dl.textContent,b&&b.getAttribute('aria-label'),b&&b.getAttribute('title'),b&&b.textContent].filter(x=>/\?\?\?/.test(x||''));return L.length?L.map(x=>String(x).slice(0,80)):null})(),
   coll:(()=>{try{if(!f||typeof k61Table!=='function')return null;k61Table();const M=typeof K61MAP==='object'?K61MAP:{};const out=[];for(const v of k61Vars(f)){const k=M[v];if(k&&k!==kOf61(f)){const o=k61Ent(k);out.push({v,k,name:o&&o.name,kind:o&&k61Kind(o),role:o&&o.role,inAll:k61All().includes(f)})}}return out.length?out:null}catch(e){return String(e)}})()}});
 ok(!!d,`${seat} ${dev} ${phase}: tap → kit info panel`,d?undefined:await o.p.evaluate(()=>{const M=document.getElementById('modal');return{on:!!(COOPW&&COOPW.on),S:!!S,dead:S&&S.dead,Q:Q.length,q0:Q[0]&&(Q[0].t||''),hidden:M.hidden,cls:M.className,dlg:M.querySelector('.dlg')&&M.querySelector('.dlg').className,hh:window.__hhOpen||0,fz:!!document.getElementById('coopfz')}}));if(!d)return;
 ok(d.seal&&d.x,`${seat} ${dev} ${phase}: kit header seal + ✕`,{seal:d.seal,x:d.x});
 ok(!d.ov,`${seat} ${dev} ${phase}: no horizontal overflow`);
 ok(!!d.rows['Hảo hữu']&&!!(d.rows['Ta']||d.rows['Ngươi']),`${seat} ${dev} ${phase}: live status rows (Hảo hữu / Ta, ex chip panel)`,[d.rows['Hảo hữu'],d.rows['Ta']||d.rows['Ngươi']]);
 if(phase==='stranger'){
  ok(d.title==='Hảo hữu của ta',`${seat} ${dev} stranger: title «Hảo hữu của ta»`,d.title);
  ok(!d.hasName,`${seat} ${dev} stranger: her real name nowhere in the panel`,d.fname);
  ok(d.rows['Danh vị']==='chưa rõ'||d.rows['Danh vị']==null,`${seat} ${dev} stranger: rank «chưa rõ»`,d.rows['Danh vị']);
  ok(Object.entries(d.kn).every(([l,v])=>v===null||String(v)===d.tiles[l]),`${seat} ${dev} stranger: stats follow the knowledge rule (unknown = «chưa rõ», what anyone sees = her number)`,{tiles:d.tiles,rule:d.kn});
  ok(d.figs.length===0||d.figs.every(s=>/unknown/.test(s)),`${seat} ${dev} stranger: grey silhouette only`,d.figs);
 }else{
  ok(d.titleK&&d.title.endsWith(d.fname)&&!/\?\?\?/.test(d.title),`${seat} ${dev} met: title = HER kit name (rank + her name, .kname, data-k61skip; rv r2 A)`,[d.title,d.fname,d.titleK]);
  ok(!d.qq,`${seat} ${dev} met: no «???» in the sheet nor in the icon's aria-label / title / hidden words (rv r2 A)`,d.qq);
  if(d.coll)console.log(`   evidence ${seat}: her name words map to other records in the j61 name table`,JSON.stringify(d.coll));
  ok(d.rankUnit,`${seat} ${dev} met: kit rank unit in Danh vị`,d.rows['Danh vị']);
  const T={Sủng:'sung',Đức:'duc',Danh:'danh',Sắc:'sac',Tài:'tai','Tâm cơ':'tamco'};const bad=Object.entries(T).filter(([l,k])=>d.tiles[l]!=null&&d.tiles[l]!=='chưa rõ'&&l!=='Sủng'&&d.stats[k]!=null&&+d.tiles[l]!==Math.round(d.stats[k]));
  ok(Object.keys(d.tiles).length===6&&!bad.length,`${seat} ${dev} met: stat tiles = her real numbers (game state)`,{tiles:d.tiles,stats:d.stats});
  ok(d.rows['Sức khỏe']==='chưa rõ'||+d.rows['Sức khỏe']===Math.round(d.stats.suc),`${seat} ${dev} met: Sức khỏe = her number`,[d.rows['Sức khỏe'],d.stats.suc]);
  ok(!!d.rows['Cung']&&!!d.rows['Con cái'],`${seat} ${dev} met: palace + household rows`,{cung:d.rows['Cung'],con:d.rows['Con cái'],maid:d.rows['Cung nữ thân cận']});
 }
 await o.p.screenshot({path:`${OUT}/hh-${seat}-${dev}-${phase}.jpg`,type:'jpeg',quality:72});
 await o.p.evaluate(()=>{const d=document.querySelector('#modal .dlg');[d,...d.querySelectorAll('*')].forEach(e=>{if(e.scrollHeight>e.clientHeight+4&&/auto|scroll/.test(getComputedStyle(e).overflowY))e.scrollTop=e.scrollHeight})});await sleep(400);
 await o.p.screenshot({path:`${OUT}/hh-${seat}-${dev}-${phase}-end.jpg`,type:'jpeg',quality:72});
 ok(await o.p.evaluate(()=>[...document.querySelectorAll('#modal .kpopts button')].some(b=>/Tạm dừng/.test(b.textContent))),`${seat} ${dev} ${phase}: «Tạm dừng» option on the sheet (ex chip panel)`,await o.p.evaluate(()=>({b:[...document.querySelectorAll('#modal button')].map(b=>b.textContent.trim().slice(0,30)),can:COOPW.frInfo().canHold,clock:COOPW.frInfo().clock})));
 await o.p.click('#modal .kph .kit-x').catch(()=>{});await sleep(500);ok(await o.p.evaluate(()=>document.getElementById('modal').hidden),`${seat} ${dev} ${phase}: ✕ closes`);
 await tapHH(o);await sleep(900);await o.p.keyboard.press('Escape');await sleep(500);
 ok(await o.p.evaluate(()=>document.getElementById('modal').hidden),`${seat} ${dev} ${phase}: Esc closes`);
 console.log(`   ${seat} ${dev} ${phase} rows`,JSON.stringify(d.rows))}
(async()=>{const b=await chromium.launch();
 /* (1) SOLO: no icon */
 {const S0=await mk(b,'solo',DEV.fold);await S0.p.goto(BASE,DCL);await booted(S0);
  await S0.p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
  await sleep(1500);await bare(S0);await sleep(900);
  const r=await S0.p.evaluate(()=>{const e=document.getElementById('kctmf');return{shown:!!(e&&!e.hidden&&e.getClientRects().length),rail:!!document.getElementById('krail'),hhRail:!!document.querySelector('#krail [data-rail=haohuu]'),coop:!!window.COOPW&&!!COOPW.on}});
  ok(r.rail&&!r.shown&&!r.hhRail&&!r.coop,'solo: no «Hảo hữu» icon (co-op off)',r);ok(!S0.errs.length,'solo: no page errors',S0.errs);await S0.ctx.close()}
 /* (2) co-op room: A host (Fold), B guest (iPad) */
 const A=await mk(b,'host',DEV.fold),B=await mk(b,'guest',DEV.ipad);
 for(const [o,k] of [[A,process.env.COOP_A_ORIGIN],[B,process.env.COOP_B_ORIGIN]])if(k)await o.ctx.addInitScript(k=>{window.__forceOrigin=k},k);
 await A.p.goto(BASE,DCL);await booted(A);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Cùng hảo hữu');await sleep(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời hảo hữu');
 ok(await until(A,()=>__co().code&&__co().seat==='a',null,40000),'A has a room code');const code=(await A.p.evaluate(()=>__co())).code;console.log('room',code);
 await B.p.goto(BASE+'?room='+code,DCL);await booted(B);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,60000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<90000){await clearAll(A);await clearAll(B);const a=await A.p.evaluate(()=>{let f=null;try{f=COOPW.friend()}catch(e){}return __co().world&&!!f}),c=await B.p.evaluate(()=>{let f=null;try{f=COOPW.friend()}catch(e){}return __co().world&&!!f});if(a&&c)break;await sleep(600)}}
 for(const [o,s] of [[A,'host'],[B,'guest']])ok(await o.p.evaluate(()=>{try{return !!COOPW.friend()}catch(e){return false}}),`${s}: friend entry in the shared world`);
 /* stranger: make sure she has NOT met the friend (the origins may house them together: then skip the stranger phase on that seat, logged) */
 for(const [o,s] of [[A,'host'],[B,'guest']]){const k=await o.p.evaluate(()=>{const f=COOPW.friend();return isKnown61(f)});
  if(k){console.log(`   note: ${s} already knows the friend (same house / Hoàng hậu): forcing stranger state for the check`);
   await o.p.evaluate(()=>{const f=COOPW.friend();if(S.met)delete S.met[f.id];const K=k61S();if(K)K[kOf61(f)]=0})}
  /* the shared world re-sends what she knows every few seconds: hold the stranger state for the whole check (test only) */
  await o.p.evaluate(()=>{window.__fst=setInterval(()=>{try{const f=COOPW.friend();if(f&&!(typeof sameHouse==='function'&&sameHouse(S,f))&&!f.queen){if(S.met)delete S.met[f.id];const K=k61S();if(K)K[kOf61(f)]=0}}catch(e){}},40)});await sleep(200);
  const still=await o.p.evaluate(()=>!isKnown61(COOPW.friend()));
  if(still){for(const dev of ['fold','ipad'])await check(o,s,dev,'stranger')}else console.log(`   note: ${s} knows the friend by rule (sameHouse/queen): stranger phase not reachable`);await o.p.evaluate(()=>clearInterval(window.__fst))}
 /* met: the meeting (S.met + Quen biết) as j61 k61Meet records it */
 for(const [o,s] of [[A,'host'],[B,'guest']]){await o.p.evaluate(()=>{const f=COOPW.friend();S.met=S.met||{};S.met[f.id]=__co().week||0;const K=k61S();if(K)K[kOf61(f)]=3;render()});
  for(const dev of ['fold','ipad'])await check(o,s,dev,'met')}
 await states(A,B,code);
 ok(!A.errs.length,'host: no page errors',A.errs.slice(0,5));ok(!B.errs.length,'guest: no page errors',B.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]).length;console.log(`\n${res.length-bad}/${res.length} ok`);fs.writeFileSync(OUT+'/result.json',JSON.stringify(res,null,1));
 await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
