/* review/sansang-music-fix-2 (OD 25/11 ~04:15Z «Đã hiểu … không được», shot refs/owner-2511-makeup/l1-loidan-dahieu-chet.jpg): REAL-TAP hit test of every button of the
   ma ma person frames (kitPersonDlg: kitTip «Đã hiểu», kitCoach «Bỏ qua lời dặn» / «Tiếp») alone, over the focus view and over its play layer, + the focus ✕.
   usage: node dev/test/person-frame-tap.js <url> <outdir> [WxH,..]
   (was: sansang-music-fix.js <url> <outdir> [WxH,..]
   A. REAL TAP on the kitFocus «Luật chơi» card «Sẵn sàng» (the only F.intro host = jdfv dfTap, every on-figure game; visitor / stage / NPC encounter all
      open the same kitFocus): elementFromPoint at the button centre must be the button, a touchscreen tap must start the game. Plus a hit scan of every
      «Sẵn sàng» (.kgr-go) on screen.  B. MUSIC keeps playing: track error, missed hand-off (ended), outside pause, stalled clock, tab hidden → visible. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const BAD=[];(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});let bad=0;
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
  const clr=()=>p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});await p.waitForTimeout(1500);await clr();
  const R=async(lbl)=>{const r=await p.evaluate(()=>{const out={};const hit=(sel)=>{const e=document.querySelector(sel);if(!e||!e.getClientRects().length)return 'absent';const q=e.getBoundingClientRect(),t=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2);return e.contains(t)?'ok':'COVERED by '+(t?(t.id?'#'+t.id+' ':'')+String(t.className||t.tagName).slice(0,60)+' z='+getComputedStyle(t).zIndex+' pos='+getComputedStyle(t).position:'none')};
    out.tipBtn=hit('#ktip [data-ktut=tip]');out.coach=[...document.querySelectorAll('.ktut-card [data-ktut]')].map(b=>b.textContent.trim()+':'+hit('[data-ktut="'+b.dataset.ktut+'"]'));out.focX=hit('.kfoc-x');return out});console.log(wh,lbl,JSON.stringify(r));if(JSON.stringify(r).includes('COVERED'))BAD.push(wh+' '+lbl);return r};
  await p.evaluate(()=>kitTip({id:'probe',title:'Mưu kế',html:'<p>Việc mưu kế, hại người được nhiều nhưng dòng Kèm ghi rõ hiểm họa.</p>'}));await p.waitForTimeout(800);await R('tip alone');await p.evaluate(()=>kitTipOff());await p.evaluate(()=>kitCoach({title:'Lời dặn tân thủ',html:'<p>x</p>',btns:[{k:'skip',t:'Bỏ qua lời dặn',alt:true},{k:'next',t:'Tiếp'}],on(){}}));await p.waitForTimeout(800);await R('coach');await p.evaluate(()=>kitCoachOff());
  const o=await p.evaluate(OPEN);await p.waitForTimeout(900);
  await p.evaluate(()=>kitTip({id:'probe2',title:'Mưu kế',html:'<p>Việc mưu kế, hại người được nhiều.</p>'}));await p.waitForTimeout(800);await R('tip over focus ('+o+')');
  try{await p.screenshot({path:OUT+'/tip-focus-'+wh+'.png'})}catch(x){}
  await p.evaluate(()=>kitTipOff());await p.evaluate(()=>{window.__F.play({skip:{n:'Bỏ qua',sub:'kết quả thường',onSkip(){}},onBack(){}})});await p.evaluate(()=>kitTip({id:'probe3',title:'Mưu kế',html:'<p>x</p>'}));await p.waitForTimeout(800);await R('tip over play layer');await p.evaluate(()=>kitTipOff());
  /* a real tap on «Đã hiểu» closes the frame */
  await p.evaluate(()=>kitTip({id:'probe4',title:'Mưu kế',html:'<p>x</p>'}));await p.waitForTimeout(800);{const r=await p.evaluate(()=>{const q=document.querySelector('#ktip [data-ktut=tip]').getBoundingClientRect();return [q.left+q.width/2,q.top+q.height/2]});await p.touchscreen.tap(r[0],r[1]);await p.waitForTimeout(400);const gone=await p.evaluate(()=>!document.getElementById('ktip'));console.log(wh,'real tap closes',gone);if(!gone)BAD.push(wh+' tip not closed by a real tap')}
  if(errs.length)BAD.push(wh+' PAGEERR '+errs[0]);
  await ctx.close()}
 await b.close();console.log(BAD.length?'FAIL '+BAD.join(' | '):'ok person-frame-tap');process.exit(BAD.length?1:0)})();
