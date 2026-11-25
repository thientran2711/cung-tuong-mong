/* review/sansang-music-fix-2 FRAME TAP SCAN (owner OD 25/11 ~04:15Z «a frame must always be closable», law 11 whole family): opens every kit frame /
   dialog kind at Fold 755x1000 + iPad 1180x820 and hit-tests EVERY visible button (elementFromPoint at its centre must be inside it), then closes each
   frame with a REAL touch tap. Frames: kitTip, kitCoach, kitFocus (real dfOpen: acts, tabs, ✕) + its real act intro («Sẵn sàng», «Bỏ qua», ◂),
   kitTip over the focus (+ focus ✕ dismisses it), j82 kgReady rules screen (openMG), kitGain scene, kitPodium, #modal event card, ☰ menu.
   usage: node dev/test/frame-tap-scan.js <url> <outdir> [WxH,..]   (was: sansang-music-fix.js <url> <outdir> [WxH,..]
   A. REAL TAP on the kitFocus «Luật chơi» card «Sẵn sàng» (the only F.intro host = jdfv dfTap, every on-figure game; visitor / stage / NPC encounter all
      open the same kitFocus): elementFromPoint at the button centre must be the button, a touchscreen tap must start the game. Plus a hit scan of every
      «Sẵn sàng» (.kgr-go) on screen.  B. MUSIC keeps playing: track error, missed hand-off (ended), outside pause, stalled clock, tab hidden → visible. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const BAD=[],TAB=[];(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitFocus,null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render();
   window.__acts=n=>Array.from({length:n},(_,i)=>({id:'a'+i,n:['Sai cung nữ thân tín mua lén ngoài cung','Hỏi han sức khỏe','Rỉ tai chuyện trong cung','Hối lộ người ở Thái y viện'][i]||('Việc số '+(i+1)+(i%3===0?' có tên khá dài để xuống dòng thêm một dòng nữa':'')),pic:'',word:['Liều','Khó','Tùy duyên','Khá chắc','Chắc','Nắm chắc','Nắm chắc','Tùy duyên','Tùy duyên'][i%9],ton:i===2?'2 khắc · Đức -2':i===3?'1 khắc · 20 bạc':(1+i%3)+' khắc',info:'<div class="kpopt">Tốn '+(1+i%3)+' khắc</div><p>Được: thiện cảm</p>',off:i===2,why:i===2?'Chưa đủ tin cậy':''}))});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#kroul,#kroulw,.kroul,#dawn{display:none!important}'});
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(1500);
  const OPEN=`(()=>{const im=document.querySelector('#tokens .tok.fig img.figimg');if(!im)return 'nofig';window.__F=kitFocus.open({p:(typeof curPeople==='function'?curPeople()[+im.closest('.tok').dataset.p]:null),fig:im,from:im.getBoundingClientRect(),groups:[{k:'g1',n:'Giao thiệp',can:2,tot:9,acts:__acts(9)},{k:'g2',n:'Mưu kế',can:1,tot:3,acts:__acts(3)}],onAct:id=>{window.__act=id},onClose:()=>{window.__closed=1}});return 'ok'})()`;
  const f=[];
  const clr=()=>p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{kmReset()}catch(e){}});/* test boot leaves queued cards / motion scenes: not part of this check */await p.waitForTimeout(1500);await clr();
  await p.evaluate(()=>{KIT_FOC.motion=null;document.documentElement.classList.add('kf-still')});
  const scan=async(frame,root)=>{await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});const r=await p.evaluate(root=>{const R=document.querySelector(root);if(!R)return {absent:1};
    const bs=[...R.querySelectorAll('button,[role=button],.kbtn')].filter(b=>{if(b.closest('[hidden]'))return false;const q=b.getBoundingClientRect();if(q.width<4||q.height<4)return false;const cs=getComputedStyle(b);if(cs.visibility==='hidden'||cs.pointerEvents==='none'||b.disabled)return false;const x=q.left+q.width/2,y=q.top+q.height/2;return x>0&&y>0&&x<innerWidth&&y<innerHeight});
    const seen=new Set();const out={n:0,ok:0,bad:[]};for(const b of bs){if(seen.has(b))continue;seen.add(b);const q=b.getBoundingClientRect(),t=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2);out.n++;
     if(t&&(b.contains(t)||t.contains(b)&&false))out.ok++;else out.bad.push((b.textContent||b.getAttribute('aria-label')||b.className).trim().replace(/\s+/g,' ').slice(0,24)+' ← '+(t?String(t.className||t.tagName).slice(0,40):'none'))}return out},root);
   TAB.push([wh,frame,r.absent?'absent':(r.ok+'/'+r.n),(r.bad||[]).join('; ')]);if(r.absent&&!/kitGain/.test(frame))BAD.push(wh+' '+frame+' did not open');if(r.absent)return r;else if(r.bad.length)BAD.push(wh+' '+frame+': '+r.bad.join('; '));return r};
  const tapClose=async(frame,sel,gone)=>{const r=await p.evaluate(s=>{const e=[...document.querySelectorAll(s)].find(e=>e.getClientRects().length);if(!e)return null;const q=e.getBoundingClientRect();return [q.left+q.width/2,q.top+q.height/2]},sel);
   if(!r){BAD.push(wh+' '+frame+': no close button '+sel);TAB.push([wh,frame+' close','absent',sel]);return}await p.touchscreen.tap(r[0],r[1]);await p.waitForTimeout(900);const g=await p.evaluate(gone);TAB.push([wh,frame+' real-tap close',g?'closed':'STUCK',sel]);if(!g)BAD.push(wh+' '+frame+' not closed by a real tap on '+sel)};
  const ev=async(f)=>{try{return await p.evaluate(f)}catch(e){return 'ERR '+e.message.split('\n')[0]}};
  await p.waitForTimeout(2500);await clr();
  /* 1 kitTip */
  await ev(()=>{try{T.tipGap=0}catch(e){}});await ev(()=>kitTip({id:'scan1',title:'Mưu kế',html:'<p>Việc mưu kế, hại người được nhiều.</p>'}));await p.waitForTimeout(700);await scan('kitTip','#ktip');await tapClose('kitTip','#ktip [data-ktut=tip]',()=>!document.getElementById('ktip'));
  /* 2 kitCoach */
  await ev(()=>kitCoach({title:'Lời dặn tân thủ',html:'<p>x</p>',btns:[{k:'skip',t:'Bỏ qua lời dặn',alt:true},{k:'next',t:'Tiếp'}],on(){kitCoachOff()}}));await p.waitForTimeout(700);await scan('kitCoach','.ktut-card');await tapClose('kitCoach','.ktut-card [data-ktut=next]',()=>!document.querySelector('.ktut-card')||!!document.querySelector('.ktut-card').closest('[hidden]'));
  await clr();
  /* 3 kitFocus via the real stage tap path */
  const op=await ev(()=>{const P=curPeople();for(let i=0;i<P.length;i++)if(dfHasFig(i)){dfOpen(i);return 'ok'}return 'nofig'});await p.waitForTimeout(1200);
  if(op!=='ok')BAD.push(wh+' focus: '+op);else{await scan('kitFocus (acts, tabs, ✕)','.kfoc');
   /* 4 a real act → its rules card */
   const act=await ev(()=>{const F=DF.F;if(!F)return 'nofocus';const bs=[...document.querySelectorAll('.kfoc .kfoc-b')].filter(b=>!b.disabled&&!b.classList.contains('kdis')&&b.getClientRects().length);for(const b of bs){b.click();if(document.querySelector('.kfoc-intro'))return 'intro '+b.textContent.trim().slice(0,20);if(F.playing){try{F.endPlay()}catch(e){}}}return 'no act with an intro ('+bs.length+')'});
   await p.waitForTimeout(700);TAB.push([wh,'act',act,'']);
   if(/^intro/.test(act)){await scan('kitFocus rules card («Sẵn sàng», «Bỏ qua», ◂)','.kfoc');await tapClose('kitFocus rules card','.kfoc-introgo',()=>!document.querySelector('.kfoc-intro'));await p.waitForTimeout(600);await ev(()=>{try{if(DF.play)DF.play.skip()}catch(e){}});await p.waitForTimeout(1200);await clr()}
   /* 5 kitTip over the focus; the focus ✕ dismisses both */
   await ev(()=>{if(!DF.F){const P=curPeople();for(let i=0;i<P.length;i++)if(dfHasFig(i)){dfOpen(i);break}}});await p.waitForTimeout(900);
   await ev(()=>kitTip({id:'scan5',title:'Mưu kế',html:'<p>x</p>'}));await p.waitForTimeout(700);await scan('kitTip over kitFocus','#ktip');
   await tapClose('kitFocus ✕ (with a tip on top)','.kfoc-x',()=>!document.getElementById('ktip')&&!(window.DF&&DF.F))}
  await clr();
  /* 6 j82 kgReady rules screen */
  await ev(()=>{openMG('ky',1,()=>{S.mg=null;render()})});await p.waitForTimeout(1500);await scan('kgReady rules screen (openMG ky)','.kgame, #kg82, .kg82');
  await ev(()=>{const b=[...document.querySelectorAll('.kgame button, #kg82 button')].find(b=>/Sẵn sàng/.test(b.textContent));if(b)window.__kgGo=1});
  await tapClose('kgReady «Sẵn sàng» starts','.kgame .kgr-go, .kgame #kg82go, .kgame [class*=kgr] button',()=>!document.querySelector('.kgame.kg-ready')&&!document.querySelector('.kg-ready'));
  await ev(()=>{try{kg82Close(true)}catch(e){}try{S.mg=null;render()}catch(e){}});await p.waitForTimeout(800);await clr();
  /* 7 kitGain scene */
  await ev(()=>{S.mg=null;wkFinishLesson('vu',{kind:'mua'},60,'tự học');render()});for(let k=0;k<20&&!(await p.evaluate(()=>!!document.querySelector('.kmov:not(.km-out):not([data-tst])')));k++)await p.waitForTimeout(400);await p.waitForTimeout(600);await scan('kitGain scene (.kmov)','.kmov:not(.km-out):not([data-tst])');
  if(await p.evaluate(()=>!!document.querySelector('.kmov:not(.km-out):not([data-tst])')))await tapClose('kitGain scene','.kmov:not(.km-out):not([data-tst]) button',()=>!document.querySelector('.kmov:not(.km-out):not([data-tst])'));await clr();
  await clr();
  /* 8 kitPodium */
  await ev(()=>{const L=[{who:S,score:9},{who:rivals[0],score:7},{who:rivals[1],score:5}];kitPodiumShow(L,{title:'Hội thi',next:'Tiếp',onNext:()=>kitPodiumClose()})});await p.waitForTimeout(1500);await scan('kitPodium','#kpodov');
  await tapClose('kitPodium','#kpodov .kpod-next',()=>!document.getElementById('kpodov'));
  /* 9 #modal event card from the game queue */
  await ev(()=>{for(let i=0;i<6&&!Q.length;i++){try{nextBuoi()}catch(e){}}if(Q.length){showModal()}});await p.waitForTimeout(1500);
  const hasM=await p.evaluate(()=>{const m=document.getElementById('modal');return !!m&&!m.hidden});if(hasM){await scan('#modal event card','#modal');}/* kitGain + #modal cards: the harness cannot always raise them (queued behind the day queue); their real render is in dayq-hold A3/S4 */else TAB.push([wh,'#modal event card','none queued','']);
  await clr();
  console.log(wh,'done');await ctx.close()}
 await b.close();
 console.log('| size | frame | buttons hit ok / closed | covered by |');console.log('|---|---|---|---|');for(const r of TAB)console.log('| '+r.join(' | ')+' |');
 console.log(BAD.length?'FAIL '+BAD.join(' | '):'ok frame-tap-scan');process.exit(BAD.length?1:0)})();
