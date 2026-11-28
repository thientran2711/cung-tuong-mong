/* review/sansang-music-fix (OD 25/11 ~04:06Z + ~04:10Z). usage: node dev/test/sansang-music-fix.js <url> <outdir> [WxH,..]
   A. REAL TAP on the kitFocus «Luật chơi» card «Sẵn sàng» (the only F.intro host = jdfv dfTap, every on-figure game; visitor / stage / NPC encounter all
      open the same kitFocus): elementFromPoint at the button centre must be the button, a touchscreen tap must start the game. Plus a hit scan of every
      «Sẵn sàng» (.kgr-go) on screen.  B. MUSIC keeps playing: track error, missed hand-off (ended), outside pause, stalled clock, tab hidden → visible. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});let bad=0;
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
  /* A */
  await p.evaluate(()=>{KIT_FOC.motion=null;document.documentElement.classList.add('kf-still')});
  const clr=()=>p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});await p.waitForTimeout(1500);await clr();/* test boot leaves a «Tin trong cung» card queued: not part of this check */
  const o=await p.evaluate(OPEN);if(o!=='ok')f.push('no stage figure ('+o+')');else{await p.waitForTimeout(700);
   await clr();
   const hit=await p.evaluate(async()=>{const F=window.__F;let went=0;F.play({skip:{n:'Bỏ qua',sub:'kết quả thường',onSkip(){}},onBack(){}});
    const c=F.intro({title:'Chạm dấu',rows:[['Việc','Hỏi han sức khỏe','t'],['Chạm','Dấu trôi lên: chạm dấu ✓ xanh (lời hợp ý), tránh dấu ✗ đỏ (lời hỏng).','t'],['Được','Chạm đúng nhiều dấu ✓ thì thành; chạm nhầm dấu ✗ thì mất điểm.','t']],go:'Sẵn sàng',sub:'bắt đầu chơi',onGo:()=>{went++}});
    window.__went=()=>went;await new Promise(r=>setTimeout(r,250));const go=c.querySelector('.kgr-go'),r=go.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,e=document.elementFromPoint(x,y);
    /* every «Sẵn sàng» on screen: the top element at its centre is inside it */
    const scan=[...document.querySelectorAll('.kgr-go')].filter(g=>g.offsetParent).map(g=>{const q=g.getBoundingClientRect(),t=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2);return g.contains(t)?'ok':'covered by .'+String(t&&t.className||t&&t.tagName)});
    return {x,y,top:String(e&&(e.className||e.tagName)),ok:!!e&&go.contains(e),scan}});
   try{await p.screenshot({path:OUT+'/sansang-'+wh+'.png'})}catch(x){}
   await p.touchscreen.tap(hit.x,hit.y);for(let k=0;k<10&&!hit.realTapWent;k++){await p.waitForTimeout(300);hit.realTapWent=await p.evaluate(()=>window.__went())}
   console.log(wh,'A',JSON.stringify(hit));if(!hit.ok)f.push('A «Sẵn sàng» covered by .'+hit.top);if(!hit.realTapWent)f.push('A real tap did not start the game');hit.scan.forEach(s=>{if(s!=='ok')f.push('A scan '+s)});
   await p.evaluate(()=>{try{window.__F.endPlay()}catch(e){}try{window.__F.close()}catch(e){}})}
  /* B: music on (the player turned sound on), first gesture done */
  await p.evaluate(()=>{OPT.snd=true;OPT.mute=false;OPT.mus=.5;auUnlock();auTick()});await p.waitForTimeout(3000);
  const st=()=>p.evaluate(()=>{const a=AU.cur;return a?{name:AU.curName,paused:a.paused,dead:!!a.dead,t:+a.currentTime.toFixed(2)}:{none:1}});
  const playing=async(lbl,ms)=>{const t0=Date.now();let s;while(Date.now()-t0<ms){s=await st();if(s&&!s.none&&!s.paused&&!s.dead&&s.t>0.05){const t1=s.t;await p.waitForTimeout(600);const s2=await st();if(s2.t>t1)return s2}await p.waitForTimeout(400)}f.push('B '+lbl+': music not back ('+JSON.stringify(s)+')');return null};
  const B={};B.start=await playing('start',8000);
  if(B.start){
   await p.evaluate(()=>{const a=AU.cur;a.dead=1;a.dispatchEvent(new Event('error'));try{a.pause()}catch(e){}});B.error=await playing('after a track error',9000);
   await p.evaluate(()=>{const a=AU.cur;try{a.pause()}catch(e){}a.dispatchEvent(new Event('ended'))});B.ended=await playing('after a missed hand-off (ended)',9000);
   await p.evaluate(()=>{try{AU.cur.pause()}catch(e){}});B.paused=await playing('after an outside pause',9000);
   await p.evaluate(()=>{const a=AU.cur;Object.defineProperty(a,'currentTime',{configurable:true,get:()=>1.25,set(){}})});B.stall=await playing('after a stalled stream',14000);
   await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});await p.waitForTimeout(1200);
   B.hidden=await st();if(!B.hidden.paused)f.push('B hidden: music not paused');
   await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'))});B.visible=await playing('after tab visible',8000);
   /* a long mini-game: nothing calls render(); the track runs out with no hand-off */
   await p.evaluate(()=>{const a=AU.cur;a.handoff=1;a.currentTime=Math.max(0,a.duration-0.5)});await p.waitForTimeout(1500);B.runout=await playing('after a track ran out inside a mini-game',9000)}
  console.log(wh,'B',JSON.stringify(B));
  console.log(wh,f.length?'FAIL '+f.join(' | '):'ok sansang+music',errs.length?'PAGEERR '+errs[0]:'');if(f.length||errs.length)bad=1;await ctx.close()}
 await b.close();process.exit(bad)})();
