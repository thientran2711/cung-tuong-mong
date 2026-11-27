/* button-crawl-fix-5 gate (F #10 25/11 11:01Z, robot s6d LIVE 9f72524b: «Sang ngày mới» greyed, 12 cards in Q, NOTHING on screen — a player could not
   move the day). Root: jdayq gate (c) held every queued card while a person view she opened was «open» — also after a tab change had PARKED it
   (jdfv dfTabLayers hides .kfoc, DF.F kept) or when its layer was gone (dqActEl returned document.body). Fold 755x1000 + iPad 1180x820, real taps
   (dev/test/realtap.js) for every press; the game's cards are posted from a timer (no tap), like a khắc event.
   1) inside a person view ON SCREEN a card is still held (owner 24/11 ~22:02Z rule (c), unchanged) and shows when she closes the view (✕, real tap)
   2) person view → real tap on another tab → the card shows THERE; one tap on its close → Q empty, «Sang buổi» enabled
   3) a stale view (DF.F set, no .kfoc layer) holds nothing
   4) safety net: a card left in Q with no showModal and nothing on screen is shown within BAL.dayq.wake + 1.5 s
   6) view panels («Tin chờ người sai đi», «Tin báo», «Lịch tháng») opened again and again: one per title in Q, never saved, one tap closes each
   5) an old save (flight2 s8, year 2, LIVE format) loads and plays: no card left hidden in Q, «Sang buổi/ngày mới» enabled after closing
   usage: [QSL_SAVE=dump.json] node dev/test/q-softlock.js [index.html | URL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const RT=require('./realtap.js');
const GAME=process.argv[2]||path.join(__dirname,'../../index.html');const DEVS={fold:[755,1000],ipad:[1180,820]};
function serve(file){const root=path.dirname(path.resolve(file)),idx=path.basename(file);const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css'};
 return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);if(!f.startsWith(root)){r.writeHead(403);return r.end()}fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})});sv.listen(0,'127.0.0.1',()=>{sv.unref();res('http://127.0.0.1:'+sv.address().port+'/'+idx)})})}
let fails=0;const ok=(c,msg)=>{console.log((c?'PASS ':'FAIL ')+msg);if(!c)fails++};
const FRESH=()=>{if(typeof kitRoulette==='function'&&!window.__tRoul0){window.__tRoul0=kitRoulette;kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}/* TEST SETUP ONLY (lc15 QC, #kroul race): the new-life roulette waits for its pictures (≤8 s) before it builds #kroul, so under CPU load it landed AFTER this setup removed the veils and covered the home screen (false «dead button under div#kroul»); a JS-started life skips it */try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}
 for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}try{S.tutTour=1}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());render()};
const CLEAN=()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());if(Q.length){Q.length=0;document.getElementById('modal').hidden=true;render()}};
const POST=t=>setTimeout(()=>{kitPanel({kind:'news',title:t,facts:['Một tin trong cung.'],btn:'Đã rõ'});showModal();render()},0);
(async()=>{const URL=/^https?:/.test(GAME)?GAME:await serve(GAME);const b=await chromium.launch();
 for(const dev of ['fold','ipad']){const [w,h]=DEVS[dev];const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:dev==='fold',serviceWorkers:'block'});
  const p=await ctx.newPage();await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function'&&typeof showTitle==='function',null,{timeout:180000});await p.waitForTimeout(1500);
  const rt=RT.make(p,{dev,log:x=>{if(x.k!=='tap')console.log('  realtap',JSON.stringify(x).slice(0,240))}});
  const st=()=>p.evaluate(()=>({q:Q.length,t:Q[0]&&Q[0].t,modal:!document.getElementById('modal').hidden,foc:[...document.querySelectorAll('.kfoc')].map(e=>e.hidden?'parked':'shown').join(','),tab,next:document.getElementById('next').disabled}));
  const fresh=async()=>{await p.evaluate(FRESH);for(let i=0;i<5;i++){await p.waitForTimeout(600);await p.evaluate(CLEAN)}};
  const tabBtn=re=>p.evaluateHandle(re=>[...document.querySelectorAll('#tabs button')].find(e=>new RegExp(re).test(e.textContent)&&e.getBoundingClientRect().width>3)||null,re);
  const person=(k=0)=>p.evaluateHandle(k=>{const L=[...document.querySelectorAll('#tokens .tok')].filter(e=>{const r=e.getBoundingClientRect();return r.width>10&&!e.classList.contains('me')&&getComputedStyle(e).visibility!=='hidden'});return L[k%Math.max(1,L.length)]||null},k);
  /* open a person view with a real tap on a stage figure (a figure redrawn under the finger is tried again, ≤4 times) */
  const openView=async()=>{for(let i=0;i<8;i++){await p.waitForTimeout(500);if(await rt.tap(i%2?await person(i):'#tokens .tok.fig:not(.me)',{label:'person',screen:'Hành sự'})){await p.waitForTimeout(1400);if(await p.evaluate(()=>!!(window.DF&&DF.F)))return true}}return false};
  const closeCard=async()=>{const x=await p.evaluateHandle(()=>{const B=[...document.querySelectorAll('#modal button')].filter(b=>b.getBoundingClientRect().width>3);return B.find(b=>/kit-x|mclose/.test(b.className+' '+b.id))||B.find(b=>/^(Đã rõ|Lui|Đóng|Để sau)$/.test(b.textContent.trim()))||B.find(b=>/^(Đã rõ|Lui|Đóng|Để sau)$/.test(((b.querySelector('.kan')||{}).textContent||'').trim()))||B.find(b=>b.classList.contains('kback'))/* an option row «Để sau» (its text carries the Tốn/Được rows) */||null});return rt.choose(x,{label:'close',screen:'card'})/* KIT §101: «Để sau» on a hand = lift + ✓ (realtap choose); a plain close = one tap */};
  /* 1 */
  await fresh();let t1=await openView();
  await p.evaluate(POST,'Thử tin 1');await p.waitForTimeout(1600);let s=await st();
  ok(t1&&s.foc==='shown'&&s.q===1&&!s.modal,`${dev}: inside a person view on screen the card waits (view ${s.foc}, Q ${s.q}, card shown ${s.modal})`);
  const fx=await p.evaluateHandle(()=>[...document.querySelectorAll('.kfoc button')].find(b=>/kit-x|kfoc-x|close/i.test(b.className+' '+(b.getAttribute('aria-label')||''))&&b.getBoundingClientRect().width>3)||null);
  const t1b=await rt.tap(fx,{label:'✕ person view',screen:'person view'});await p.waitForTimeout(1500);s=await st();for(let k=0;k<12&&!s.modal;k++){await p.waitForTimeout(500);s=await st()}/* under CPU load the view's close + the queue wake take longer than 1.5 s (lc15 QC flake): wait up to 6 s more — the rule checked is «it shows», not its speed */
  ok(t1b&&s.modal&&s.t==='Thử tin 1',`${dev}: closing the view (real ✕) shows the waiting card (${JSON.stringify(s)})`);
  /* 2 */
  await fresh();await openView();
  const t2=await rt.tap(await tabBtn('Hậu cung'),{label:'Hậu cung',screen:'person view'});await p.waitForTimeout(900);
  await p.evaluate(POST,'Thử tin 2');await p.waitForTimeout(1600);s=await st();
  ok(t2&&s.foc==='parked'&&s.modal&&s.t==='Thử tin 2',`${dev}: view parked by a tab change → the card shows on «${s.tab}» (${JSON.stringify(s)})`);
  const t2b=await closeCard();await p.waitForTimeout(900);s=await st();
  ok(t2b&&s.q===0&&!s.modal&&!s.next,`${dev}: one real tap closes it, «Sang buổi» enabled (${JSON.stringify(s)})`);
  /* 3 (continues from 2: the parked view of 2 is brought back with a real tap on «Hành sự», then its layer is taken away = stale) */
  let t3=await rt.tap(await tabBtn('Hành sự'),{label:'Hành sự',screen:'Hậu cung'});await p.waitForTimeout(1200);if(!(await p.evaluate(()=>!!(window.DF&&DF.F))))t3=await openView();const df3=await p.evaluate(()=>!!(window.DF&&DF.F));
  await p.evaluate(()=>document.querySelectorAll('.kfoc').forEach(e=>e.remove()));/* setup: a view whose layer is gone, DF.F left behind */
  await p.evaluate(POST,'Thử tin 3');await p.waitForTimeout(1600);s=await st();
  ok(t3&&df3&&s.modal&&s.t==='Thử tin 3',`${dev}: a stale view (DF.F ${df3}, no layer) holds nothing (${JSON.stringify(s)})`);
  /* 4 */
  await fresh();await p.evaluate(()=>{Q.push({t:'Thử tin 4',h:'<p>Tin không ai gọi showModal.</p>',btn:'Đã rõ'});render()});
  const wake=await p.evaluate(()=>BAL.dayq.wake);await p.waitForTimeout(wake+1500);s=await st();
  ok(s.modal&&s.t==='Thử tin 4',`${dev}: safety net shows a card left in Q with nothing on screen within ${wake + 1500} ms (${JSON.stringify(s)})`);
  /* 6 view panels (status «Tin chờ người sai đi», «Tin báo», «Lịch tháng»): one per title in Q, never saved (robots: 3×/4×/7× copies) */
  await fresh();s=await p.evaluate(()=>{try{const sv=S.maid;PTIME.send({who:'maid',nm:sv.name,kind:'def',lbl:'đi thử',a:{run:'errpic',k:'x',t:sv.name+' về',L:['thử'],d:[]}})}catch(e){}
   kitNotice({id:'qsl',line:'Thử tin báo.',text:'Thử tin báo.'});for(let i=0;i<3;i++){kitStatusIcon.open('tin');kitNoticeOpen();kitMonthCalOpen()}
   const by={};for(const m of Q)by[m.t]=(by[m.t]||0)+1;return{by,saved:serQ().map(e=>e.t)}});
  ok(Object.keys(s.by).length>=2&&Object.values(s.by).every(n=>n===1)&&!s.saved.length,`${dev}: view panels opened 3× each → one per title ${JSON.stringify(s.by)}, saved ${JSON.stringify(s.saved)}`);
  for(let i=0;i<6;i++){const q=await p.evaluate(()=>Q.length);if(!q)break;await closeCard();await p.waitForTimeout(600)}
  s=await st();ok(s.q===0&&!s.modal,`${dev}: each closes with one real tap (${JSON.stringify(s)})`);
  /* 5 old save */
  const sv=process.env.QSL_SAVE||'';/* a localStorage dump {key:value} of a real save (saves are not in git: SAVES_NOT_IN_GIT) */
  if(sv&&fs.existsSync(sv)){const LS=JSON.parse(fs.readFileSync(sv,'utf8'));
   await p.evaluate(LS=>{localStorage.clear();for(const k in LS)localStorage.setItem(k,LS[k]);SLOT=1;const d=loadSlot(1);document.getElementById('title').hidden=true;deser(d);
    document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());render();if(Q.length)showModal()},LS);
   for(let i=0;i<12;i++){await p.waitForTimeout(700);s=await st();if(!s.modal&&!s.q)break;if(s.modal)await closeCard()}
   s=await st();ok(s.q===0&&!s.next,`${dev}: old save (s8 y2) loads; every card can be closed; «Sang buổi/ngày mới» enabled (${JSON.stringify(s)})`)}
  else console.log('SKIP old save (set QSL_SAVE=<localStorage dump json>)');
  ok(errs.length===0,`${dev}: no page errors ${JSON.stringify(errs.slice(0,3))}`);await ctx.close()}
 await b.close();console.log(fails?`Q-SOFTLOCK FAIL (${fails})`:'Q-SOFTLOCK PASS');process.exit(fails?1:0)})();
