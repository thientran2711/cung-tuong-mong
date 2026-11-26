// ROBOT-LIFE-M3: one SOLO life, REAL TAPS ONLY. usage: node bot.js
const L=require('./lib.js');const fs=require('fs');const path=require('path');
const VH=+(process.env.VH||1000);const SEED=+process.env.SEED||103,PORT=+process.env.PORT||8130;
const OUT=path.resolve(process.env.OUT||'run');fs.mkdirSync(OUT+'/shots',{recursive:true});
const LOG=OUT+'/log.txt',BUGS=OUT+'/bugs.jsonl';
const t0=Date.now();const stamp=()=>new Date().toISOString().slice(11,19);
const log=s=>{const l=`[${stamp()}] ${s}`;fs.appendFileSync(LOG,l+'\n')};
let shotN=0;
const EXIT=/xuất gia|xuất cung|xin xuất|phế|bỏ cuộc|tự vẫn|tự sát|thoát|rời cung|kiếp mới|bắt đầu kiếp|đổi thân phận|thiết lập|đăng xuất|quên đời|hồi hương|quy ẩn/i;
const TABS=['Hành sự','Dư đồ','Hậu cung','Giao tình','Hoàng tự','Tư trang','Tài nghệ','Mệnh truyện'];
const NEVER_BTN=/^(☰|✕|Thiết lập|Sổ luân hồi|Bảng vàng|Cùng hảo hữu|Hành sự$|Dư đồ$|Hậu cung$|Giao tình$|Hoàng tự$|Tư trang$|Tài nghệ$|Mệnh truyện$|Chí tôn|Phi tần|Nam nhân|Cung nhân|Kế vị|Hôn sự)/;
const PROG=/^(Vào điện|Vào cung|Tiếp theo|Tiếp tục|Tiếp|Xong|Đã rõ|Hiểu rồi|Đồng ý|Nhận|Chấp nhận|Xác nhận|Bắt đầu|Đóng|OK|Ra về|Lui|Thôi|Được)/;
(async()=>{
 const sv=await L.serve(PORT);const ctx=await L.chromium.launchPersistentContext(path.resolve(process.env.PROF||'profile'),{viewport:{width:+(process.env.VW||755),height:+(process.env.VH||1000)},hasTouch:true});
 await ctx.addInitScript(`(function(){var a=${SEED};Math.random=function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}})()`);
 if(process.env.SAVEFILE){const sd=fs.readFileSync(process.env.SAVEFILE,'utf8');await ctx.addInitScript(`(function(){try{if(localStorage.getItem('hclh-save-v2-1'))return;var d=${sd};for(var k in d)localStorage.setItem(k,d[k])}catch(e){}})()`)}
 let p=ctx.pages()[0]||await ctx.newPage();
 const errs=[];const hook=pg=>{pg.on('pageerror',e=>{const m=e.message+' '+(e.stack||'').split('\n').slice(1,2).join('').trim();errs.push(m);log('PAGEERROR '+m);fs.appendFileSync(BUGS,JSON.stringify({t:stamp(),type:'pageerror',msg:m})+'\n')});
  pg.on('console',m=>{if(m.type()==='error'&&!/Failed to load|net::ERR|Fetch API/.test(m.text())){log('CONSOLE.ERROR '+m.text().slice(0,200));fs.appendFileSync(BUGS,JSON.stringify({t:stamp(),type:'console.error',msg:m.text().slice(0,300)})+'\n')}})};
 hook(p);
 const shot=async(tag)=>{const f=`${OUT}/shots/${String(++shotN).padStart(4,'0')}-${tag}.png`;try{await p.screenshot({path:f})}catch(e){}return f};
 const bug=async(type,msg,extra)=>{const f=await shot(type);log(`BUG ${type}: ${msg} ${extra||''} shot=${f}`);fs.appendFileSync(BUGS,JSON.stringify({t:stamp(),type,msg,extra,shot:f})+'\n')};
 const list=()=>p.evaluate(L.LIST);
 const gauss=()=>{let t=0;for(let i=0;i<6;i++)t+=Math.random();return (t-3)/Math.sqrt(.5)};
 const trueReload=async(yk)=>{await p.waitForTimeout(2500);const before=await p.evaluate(()=>Object.keys(localStorage).map(k=>k+':'+localStorage.getItem(k).length).join(','));log('RELOAD save keys: '+before.slice(0,300));
  await p.reload({waitUntil:'domcontentloaded'});let t;for(let k=0;k<120&&!t;k++){const l=await list();t=l.find(x=>x.ok&&/Chơi một mình/.test(x.txt));if(!t)await p.waitForTimeout(1000)}
  if(!t){await bug('reload-no-title','title never ready after reload');return}
  await p.touchscreen.tap(t.x,t.y);await p.waitForTimeout(1500);const l2=(await list()).filter(x=>x.ok);log('RELOAD slot controls: '+l2.map(x=>`[${x.cls}]${x.txt.slice(0,40)}`).join(' | '));await shot('reload-slot');
  const cont=l2.find(x=>/kbtn/.test(x.cls)&&!/Bắt đầu kiếp mới|Giữ sổ|Nối sổ/.test(x.txt));
  if(!cont){await bug('save-lost-on-reload','no continue button in slot after true reload at year '+yk,l2.map(x=>x.txt).join('|').slice(0,200));return}
  await tap(cont);await p.waitForTimeout(3000);log('RELOAD continued via "'+cont.txt.slice(0,30)+'"');await shot('reload-after')};
 const playMG=async()=>{const t0m=Date.now();let moves=0,errs=0,waitSince=0;
  await p.waitForTimeout(500);
  for(;;){
   let pk;try{pk=await p.evaluate(()=>{if(typeof KG82==='undefined')return {none:1};if(KG82.phase!=='play')return {end:1,ph:KG82.phase};const q=KG82.peek();return q?JSON.parse(JSON.stringify(q)):{wait:1}})}catch(e){errs++;if(errs>5)break;await p.waitForTimeout(300);continue}
   if(pk.none){log('MG: KG82 oracle missing');break}
   if(pk.end){break}
   if(Date.now()-t0m>420e3){await bug('mg-timeout','mini-game >4 min in play',JSON.stringify(pk).slice(0,200));break}
   if(pk.wait){if(!waitSince)waitSince=Date.now();
     if(Date.now()-waitSince>4000){const l5=(await list()).filter(x=>x.ok);const c5=l5.find(x=>/kgr-go/.test(x.cls))||l5.find(x=>/kit-x/.test(x.cls));
       if(c5){log('MG between rounds/result card: tap '+(c5.txt||c5.cls).slice(0,30));await p.touchscreen.tap(c5.x,c5.y);await p.waitForTimeout(1500)}waitSince=Date.now()}
     await p.waitForTimeout(120);continue}
   waitSince=0;
   const r=await p.evaluate(()=>{const b=document.getElementById('kg82box');const r=b.getBoundingClientRect();return {w:Math.min(r.width,r.height)}});const sd=r.w*.018;
   const sl=Math.random()<.06;
   try{
   if(pk.at!=null){await p.waitForTimeout(Math.max(0,pk.at+gauss()*40));await p.touchscreen.tap(pk.x+gauss()*sd,pk.y+gauss()*sd);moves++;await p.waitForTimeout(150)}
   else if(pk.hold!==undefined&&pk.drag==null&&pk.sel==null){
     let x=pk.x,y=pk.y;if(pk.hsel){const bb=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]},pk.hsel);if(bb){x=bb[0];y=bb[1]}}
     if(pk.hold&&x!=null){await p.mouse.move(x,y);await p.mouse.down();await p.waitForTimeout(250);await p.mouse.up();moves++}else await p.waitForTimeout(150)}
   else if(pk.drag){const D=pk.drag.map(([x,y],i)=>[x+gauss()*sd*(i?.8:.4),y+gauss()*sd*(i?.8:.4)]);await p.mouse.move(D[0][0],D[0][1]);await p.mouse.down();
     for(let i=1;i<D.length;i++){const n=Math.max(2,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/20));for(let k2=1;k2<=n;k2++){await p.mouse.move(D[i-1][0]+(D[i][0]-D[i-1][0])*k2/n,D[i-1][1]+(D[i][1]-D[i-1][1])*k2/n);}}
     await p.mouse.up();moves++;await p.waitForTimeout(300+Math.random()*400)}
   else if(pk.sel){const bb=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;const t=document.elementFromPoint(x,y);return [x,y,!!t&&(e===t||e.contains(t)||t.contains(e))]},pk.sel);
     if(bb){if(!bb[2])await bug('dead-button','minigame control covered: '+pk.sel);await p.touchscreen.tap(bb[0],bb[1]);moves++}await p.waitForTimeout(300+Math.random()*400)}
   else if(pk.x!=null){await p.touchscreen.tap(pk.x+gauss()*sd,pk.y+gauss()*sd);moves++;await p.waitForTimeout(150+Math.random()*250)}
   else await p.waitForTimeout(120);
   }catch(e){log('MG move err '+e.message.slice(0,100));await p.waitForTimeout(200)}
  }
  log(`MG done moves=${moves} ${Math.round((Date.now()-t0m)/1000)}s`);await shot('mg-end')};
 const tap=async(c)=>{const k=c.cls+'|'+c.txt;if(rep.k===k&&lastSig===rep.sig){rep.n++}else{rep.k=k;rep.n=1;rep.sig=lastSig}
  if(c.w&&/(^|\s)opt(\s|$)/.test(c.cls)&&rep.n>=2&&rep.n<=3){const dx=rep.n===2?.1*c.w:.25*c.w;if(await p.evaluate(()=>/Thang cơ duyên/.test(document.body.innerText))){await p.keyboard.press('Escape');await p.touchscreen.tap(6,6);await p.waitForTimeout(400)}const nx2=Math.round(c.x+dx);const tt=await p.evaluate(([x,y])=>{const e=document.elementFromPoint(x,y);return e?(e.className&&e.className.toString().slice(0,30)||e.tagName):'none'},[nx2,c.y]);
    log('RETRY option tap off-centre x='+nx2+' hit='+tt+' (centre tap #'+(rep.n-1)+' had no effect)');if(rep.n===2)await bug('option-centre-tap-no-effect','centre tap on option card did nothing (odds chip/legend hijack?): '+c.txt.slice(0,50),'retrying at left third');await p.touchscreen.tap(nx2,Math.round(c.y+(c.h||0)*.12));return}
  if(rep.n===4){await bug('no-effect-button','tapped 4x, screen unchanged: '+c.txt.slice(0,60),c.cls);ban.set(c.txt,Date.now()+120e3)}
  await p.touchscreen.tap(c.x,c.y)};
 const hud=()=>p.evaluate(()=>{const t=document.body.innerText.replace(/\s+/g,' ');const m=t.match(/(\d+) tuổi/);const h=document.querySelector('#hdr,.hdr,header');return{age:m?+m[1]:null,t:t.slice(0,160)}});
 await p.goto(`http://127.0.0.1:${PORT}/`);
 let lastSig='',lastChange=Date.now(),steps=0,buoi=0,lastAge=null,lastHour=Date.now(),reloadedYear=null,deadSeen=new Set(),lastYearKey='';
 const rep={k:'',n:0},ban=new Map();let lastShot=0;let closeN=0,closeSig='',blankSince=0,lastYear='',mgDecided=false,mgSkip=false,tried=new Set(),actsDone=0,tabTry=0,scrollN=0,hudSuc=100;let scouted=false,lastNext=0,lifeStarted=false,lastUnk='';
 const scoreOpt=t=>{let s=0;const ladder=['Liều','Khó','Năm ăn năm thua','Khá chắc','Chắc','Rất chắc','Nắm chắc','Rất vững'];ladder.forEach((w,i)=>{if(t.includes(w))s+=i});
  (t.match(/(Bạc|Sủng|Danh|Tài|Sắc|Đức|Tâm cơ)\s*\+\s*\d+/g)||[]).forEach(()=>s+=2);(t.match(/(Bạc|Sủng|Danh|Tài|Sắc|Đức|Tâm cơ|Sức)\s*[-−]\s*\d+/g)||[]).forEach(()=>s-=1);
  if(/TỐN\s+không/i.test(t))s+=2;return s};
 for(;;){
  steps++;
  if(Date.now()-lastHour>3600e3){lastHour=Date.now();const h=await hud();log(`HOURLY progress: steps=${steps} buoi=${buoi} age=${h.age} elapsed=${Math.round((Date.now()-t0)/60000)}min`)}
  let l;try{l=await list()}catch(e){log('list err '+e.message);await p.waitForTimeout(1000);continue}
  for(const [k,v] of ban)if(v<Date.now())ban.delete(k);
  const ok=l.filter(x=>x.ok&&!x.dis&&!ban.has(x.txt));
  if(Date.now()-lastShot>8000){lastShot=Date.now();p.screenshot({path:OUT+'/cur.png'}).catch(()=>{})}
  const sig=ok.filter(x=>x.txt).map(x=>x.txt).join('|')+'#'+Math.round(await p.evaluate(()=>document.body.innerText.length)/40);
  if(sig!==lastSig){lastSig=sig;lastChange=Date.now()}
  if(Date.now()-lastChange>15*60e3){await bug('stuck','no progress >=15min',ok.map(x=>x.txt).join(' | ').slice(0,300));lastChange=Date.now();
    const c=ok.find(x=>x.cls.includes('kit-x'))||ok[0];if(c)await tap(c);else await p.touchscreen.tap(377,500)}
  // end detection
  const body=await p.evaluate(()=>document.body.innerText.replace(/\s+/g,' '));
  if(/Kiếp này đã (khép|kết)|Hết kiếp|Mệnh chung|băng hà|Đã mất|Kết cục|Chung cục/i.test(body)&&ok.some(x=>/Luân hồi|Kiếp mới|Về/i.test(x.txt))){
    log('ENDING candidate screen: '+body.slice(0,400));await shot('ending');}
  if(/Chạm để bỏ qua/.test(body)){await p.waitForTimeout(2500);await p.touchscreen.tap(377,500);log('cinematic skipped by tap');await p.waitForTimeout(1000);continue}
  if(!lifeStarted&&Date.now()-lastChange>150e3){log('PRE watchdog: no progress 150s before life start -> page.reload');await bug('title-cover-stall','cover art without buttons >150s; reloading page',body.slice(0,100));await p.reload({waitUntil:'domcontentloaded'});lastChange=Date.now();continue}
  // wait during transitions
  if(!ok.length){const cov=l.filter(x=>!x.ok&&x.txt.length>1&&x.y>20&&x.y<995);
    if(lifeStarted&&!/Chạm để bỏ qua/.test(body)&&Date.now()-lastChange>10000&&cov.length&&!deadSeen.has('E'+sig)){deadSeen.add('E'+sig);
      await bug('DEAD-BUTTON','no tappable control for >10s; visible controls all covered',cov.slice(0,8).map(d=>`"${d.txt.slice(0,25)}"@${d.x},${d.y} under ${d.cover}`).join(' ; '));
      const t2=cov.find(x=>/Đã hiểu|Tiếp|Xong|Đóng|OK/.test(x.txt));
      const steps2=[];if(t2)steps2.push(['tap covered "'+t2.txt.slice(0,20)+'"',()=>p.touchscreen.tap(t2.x,t2.y)]);
      steps2.push(['tap lit card (377,640)',()=>p.touchscreen.tap(377,640)],['tap lit card left (100,640)',()=>p.touchscreen.tap(100,640)],['Escape',()=>p.keyboard.press('Escape')],['tap outside dialog (377,300) blank',()=>p.touchscreen.tap(377,800)]);
      for(const [nm,fn] of steps2){const before=await p.evaluate(()=>document.body.innerText.length+'|'+(document.querySelector('.kpdr')?1:0));await fn();await p.waitForTimeout(1500);const after=await p.evaluate(()=>document.body.innerText.length+'|'+(document.querySelector('.kpdr')?1:0));log('ESCALATE '+nm+' before='+before+' after='+after);if(before!==after)break}}
    await p.waitForTimeout(700);if(Date.now()-lastChange>6000){await p.touchscreen.tap(377,500);await p.waitForTimeout(500)}continue}
  const safe=ok.filter(x=>!EXIT.test(x.txt)||/^Nhận thân phận/.test(x.txt));
  {const m=body.match(/Sức\s*(\d+)\s*\/\s*100/);if(m)hudSuc=+m[1]}
  {const ym=body.match(/năm thứ ([\p{L}\d ]+?)(?:\s{2}|\s(?:Buổi|Sắc)|$)/u);const yk=ym?ym[1].trim().slice(0,12):'';if(yk&&yk!==lastYear&&lifeStarted&&ok.some(x=>x.id==='next')){if(lastYear){log('YEAR CHANGE '+lastYear+' -> '+yk+' : true reload');await trueReload(yk)}lastYear=yk;continue}}
  // 0) pre-life flow (title -> slot -> roulette -> accept)
  if(!lifeStarted){
    const f=(re)=>ok.find(x=>re.test(x.txt));
    {
      let c=null;
      c=ok.find(x=>/krt/.test(x.cls)&&/down/.test(x.cls)); 
      if(!c){c=f(/^Nhận thân phận/);if(c){log('PRE accept identity');await tap(c);lifeStarted=true;await p.waitForTimeout(2000);continue}}
      if(!c&&process.env.SAVEFILE){c=f(/^Tiếp tục kiếp này/);if(c){log('PRE RESUME '+c.txt.slice(0,40));await tap(c);lifeStarted=true;await p.waitForTimeout(2500);continue}}
      if(!c)c=f(/^Tiếp$/);
      if(!c)c=f(/^Bắt đầu kiếp mới/);
      if(!c)c=f(/^Chơi một mình/);
      if(!c&&ok.some(x=>/^Nhận thân phận/.test(x.txt)))c=null;
      if(c){log('PRE '+c.txt.slice(0,40));await tap(c);await p.waitForTimeout(1500);continue}
    }
  }
  // 1) option cards
    const opts=safe.filter(x=>/(^|\s)opt(\s|$)/.test(x.cls)&&!/kdis/.test(x.cls)&&!/Đổi thân phận/.test(x.txt));
  if(opts.length){opts.sort((a,b)=>(/^Nhận thân phận/.test(b.txt)?1e3:0)-(/^Nhận thân phận/.test(a.txt)?1e3:0)||0);const acc=opts.find(x=>/^Nhận thân phận/.test(x.txt));if(acc){log('ACCEPT identity sheet');await tap(acc);await p.waitForTimeout(2000);continue}opts.sort((a,b)=>scoreOpt(b.txt)-scoreOpt(a.txt)+((/^(Lên đường|Xác nhận|Đồng ý)/.test(b.txt)?500:0)-(/^(Lên đường|Xác nhận|Đồng ý)/.test(a.txt)?500:0)));const c=opts[0];if(c.h&&c.y+c.h/2>+(process.env.VH||1000)-110&&rep.n<8&&!process.env.NOSCROLL){log('OPT near bottom -> wheel scroll sheet');await p.keyboard.press('Escape');await p.mouse.move(330,450);await p.mouse.wheel(0,260);await p.waitForTimeout(700);rep.n++;continue}if(rep.n>=4){await p.keyboard.press('Escape');await p.touchscreen.tap(6,6);await p.touchscreen.tap(377,500);await p.waitForTimeout(500)}log(`OPT "${c.txt.slice(0,60)}" of ${opts.length}`);await tap(c);await p.waitForTimeout(900);continue}
  const go=safe.find(x=>/kgr-go/.test(x.cls));
  if(go&&!mgDecided){mgDecided=true;mgSkip=Math.random()<.1;log('MINIGAME intro '+(mgSkip?'(10% skip roll: Bỏ qua)':'(play for real)'))}
  if(go&&!mgSkip){await shot('mg-intro');log('MINIGAME tap Sẵn sàng (real)');await tap(go);mgDecided=false;await playMG();continue}
  if(!go&&!ok.some(x=>/kquick/.test(x.cls)))mgDecided=false;
  const quick=safe.find(x=>/kquick/.test(x.cls));if(quick&&(mgSkip||!go)){mgDecided=false;mgSkip=false;log('MINIGAME quick-skip (policy) '+quick.txt.slice(0,40));await tap(quick);await p.waitForTimeout(1500);continue}
  // 2) progress buttons
  const prog=safe.filter(x=>PROG.test(x.txt));
  if(prog.length){const c=prog[0];log(`BTN ${c.txt.slice(0,40)}`);await tap(c);await p.waitForTimeout(800);continue}
  // scout once: every tab, shot + control dump
  if(!scouted&&lifeStarted&&ok.some(x=>x.id==='next')){scouted=true;
    for(const tname of TABS){const l2=await list();const tb=l2.find(x=>x.ok&&x.txt===tname);if(!tb){log('SCOUT tab missing/covered: '+tname);continue}
      await p.touchscreen.tap(tb.x,tb.y);await p.waitForTimeout(1200);const l3=await list();await p.screenshot({path:OUT+'/scout-'+tname.replace(/ /g,'_')+'.png'});
      log('SCOUT '+tname+': '+l3.filter(x=>x.ok).map(x=>`[${x.cls.slice(0,20)}]${x.txt.slice(0,40)}`).join(' | ').slice(0,900))}
    const h=ok.find(x=>x.txt==='Hành sự');continue}
  // 2b) actions: spend the khắc of this buổi on Hành sự cards (greedy), then fall through to Sang buổi
  const hasNext=ok.some(x=>x.id==='next');
  const mainView=ok.some(x=>x.txt==='Hành sự'&&x.y>VH*0.75)||ok.some(x=>/pct/.test(x.cls)&&/Tất cả/.test(x.txt))||ok.some(x=>/kart/.test(x.cls)&&!/opt/.test(x.cls));
  if(lifeStarted&&(hasNext||mainView)&&actsDone<7){
    const cards=safe.filter(x=>/(^|\s)ka(\s|$)/.test(x.cls)&&/kart/.test(x.cls)&&!/opt|kdis/.test(x.cls)&&!tried.has(x.txt.slice(0,40)));
    if(cards.length){
      const sc=t=>{let v=0;if(/Điểm trang/.test(t))v+=8;if(/(Bạc|Sủng|Danh|Phúc duyên|Công lao)[^·]{0,12}\+/.test(t))v+=3;if(/Nghỉ ngơi/.test(t))v+=(hudSuc<50?9:-4);
        if(/Cầu|Tự học|Luyện|Thỉnh an/.test(t))v+=2;const lad=['Liều','Khó','Năm ăn năm thua','Khá chắc','Chắc','Rất chắc','Nắm chắc','Rất vững'];lad.forEach((w,i)=>{if(t.includes(w))v+=i*.3});return v};
      if(/Thẻ đang sáng|Chạm vào thẻ/.test(body))cards.sort((a,b)=>a.y-b.y);else cards.sort((a,b)=>sc(b.txt)-sc(a.txt));const c=cards[0];tried.add(c.txt.slice(0,40));actsDone++;
      log(`ACT "${c.txt.slice(0,55)}" (${actsDone})`);await tap(c);await p.waitForTimeout(1000);continue}
    // none visible: make sure we are on Hành sự, scroll once or twice
    const chips=ok.some(x=>/pct/.test(x.cls)&&/Tất cả/.test(x.txt));
    if(!chips){const tb=ok.find(x=>x.txt==='Hành sự');if(tb&&tabTry<3){tabTry++;await tap(tb);await p.waitForTimeout(900);continue}}
    else if(scrollN<3){scrollN++;await p.mouse.wheel(0,500);await p.waitForTimeout(600);continue}
  }
  // scene bubbles (cursor:pointer leaves inside a scene) while Sang buổi is disabled
  if(lifeStarted&&mainView&&!hasNext){
    const bub=safe.filter(x=>x.ptr&&x.y>160&&x.y<905&&x.txt.length>4&&!/^(Hành sự|Dư đồ|Hậu cung|Giao tình|Hoàng tự|Tư trang|Tài nghệ|Mệnh truyện)$/.test(x.txt)&&!tried.has('B'+x.txt.slice(0,40)));
    if(bub.length){const sc2=t=>(/mệt|tốn|-\d/i.test(t)?-2:0)+(/bạc|thưởng|ân|khen/i.test(t)?1:0);bub.sort((a,c)=>sc2(c.txt)-sc2(a.txt));const c=bub[0];tried.add('B'+c.txt.slice(0,40));log('BUBBLE "'+c.txt.slice(0,50)+'" of '+bub.length);await tap(c);await p.waitForTimeout(1200);continue}
    const cl=safe.find(x=>/kit-x/.test(x.cls));if(cl&&Date.now()-lastChange>8000){log('scene: close ✕');await tap(cl);await p.waitForTimeout(1000);continue}}
  // main-view watchdog: blank/disabled view
  if(lifeStarted&&mainView&&!hasNext){
    if(!blankSince)blankSince=Date.now();
    if(Date.now()-blankSince>40e3){const info=await p.evaluate(()=>{const t=document.querySelector('#next');return 'next.disabled='+(t&&t.disabled)+' cls='+(t&&t.className)+' bodyTextLen='+document.body.innerText.length+' tabsOn='+[...document.querySelectorAll('.on,.sel,.active')].map(e=>e.innerText.slice(0,15)).join(',')});
      await bug('blank-main-view','main view without action list and Sang buổi unavailable >40s',info);blankSince=Date.now();
      const tb=ok.find(x=>x.txt==='Hành sự'&&x.y>VH*0.75);if(tb){await tap(tb);await p.waitForTimeout(1500);tabTry=0;actsDone=Math.min(actsDone,6);}continue}
    await p.waitForTimeout(1000);continue}
  else blankSince=0;
  // 3) sang buoi
  const nx=safe.find(x=>x.id==='next'||/^Sang buổi/.test(x.txt));
  if(nx&&buoi%4===0){const ks=await p.evaluate(()=>Object.keys(localStorage).map(k=>k+':'+localStorage.getItem(k).length).join(','));log('SAVEKEYS buoi#'+buoi+' '+ks.slice(0,300))}
  if(nx&&lifeStarted){try{const d=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o});if(d['hclh-save-v2-1'])fs.writeFileSync(OUT+'/save_dump.json',JSON.stringify(d))}catch(e){}
   if(process.env.DURATION&&Date.now()-t0>+process.env.DURATION*60000){log('GRACEFUL STOP at buoi#'+buoi);await p.waitForTimeout(1500);await ctx.close();sv.close();process.exit(0)}}
  if(nx){tried.clear();actsDone=0;tabTry=0;scrollN=0;buoi++;log(`NEXT buoi#${buoi}`);await tap(nx);await p.waitForTimeout(1200);continue}
  // fallback A: any plain kit button (kbtn/main) that isn't blacklisted; fallback B: close ✕
  {const fb=safe.find(x=>/(kbtn|main)/.test(x.cls)&&!NEVER_BTN.test(x.txt)&&x.txt.length>1&&!/kco|alt kco/.test(x.cls));
   if(fb){log('FALLBACK-BTN '+fb.txt.slice(0,40));await tap(fb);await p.waitForTimeout(1000);continue}
   const cx=safe.find(x=>/kit-x/.test(x.cls));
   if(cx&&(safe.filter(x=>x.txt.length>1).length===0||Date.now()-lastChange>60000)){const bf=await p.evaluate(()=>document.body.innerText.length+'|'+document.body.innerText.slice(0,60).replace(/\s+/g,' '));
     closeN=(closeSig===sig)?closeN+1:1;closeSig=sig;log('CLOSE x (only control) #'+closeN);await tap(cx);await p.waitForTimeout(1200);
     const af=await p.evaluate(()=>document.body.innerText.length+'|'+document.body.innerText.slice(0,60).replace(/\s+/g,' '));
     if(closeN===12){await bug('SOFTLOCK-RELOAD','✕ close loop 12x; reloading from save: '+body.slice(0,100));closeN=0;await trueReload('softlock');continue}
     if(closeN===3){await bug('DEAD-CLOSE','✕ tapped 3x (hit-check ok) but the same card stays: '+body.slice(0,120),'before='+bf+' after='+af);
       for(const [nm,fn] of [['Escape',()=>p.keyboard.press('Escape')],['tap outside card',()=>p.touchscreen.tap(60,640)],['tap card body',()=>p.touchscreen.tap(377,560)]]){await fn();await p.waitForTimeout(1500);const a2=await p.evaluate(()=>document.body.innerText.length);log('ESCALATE-CLOSE '+nm+' len='+a2)}}
     continue}}
  // unknown screen: report covered labelled kit buttons as DEAD BUTTON
  {const dead=l.filter(x=>!x.ok&&/(kbtn|main)/.test(x.cls)&&x.txt.length>1&&x.y>140&&x.y<990&&!/^(Sang|Chơi|Bắt đầu|Cùng|Sổ|Bảng|Thiết)/.test(x.txt));
   if(dead.length&&Date.now()-lastChange>15000){const k=dead.map(d=>d.txt.slice(0,25)+'<'+d.cover).join(';');if(!deadSeen.has(k)){deadSeen.add(k);await bug('DEAD-BUTTON','covered labelled button(s) on screen >15s',k)}}}
  {const u=ok.map(x=>`[${x.cls}] ${x.txt}`).join(' | ').slice(0,500);if(u!==lastUnk){lastUnk=u;await bug('unknown-screen','no rule',u)}}
  await p.waitForTimeout(3000);
  if(Date.now()-lastChange>20000){const c=safe.find(x=>!NEVER_BTN.test(x.txt)&&!/khap|kit-x/.test(x.cls)&&x.txt.length>1);if(c)await tap(c)}
 }
})();
