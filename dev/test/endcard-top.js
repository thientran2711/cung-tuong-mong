/* endcard-top (E98, review/endcard-top): once a life has ENDED (over() → S.dead, the life end card «Kiếp …» / kitEndScreen), NO later popup opens over
   it or before it: stipend chest «Bổng lộc tháng …», month/day news, event cards (Q push / unshift), toasts, reward chests, notices, podium, the new-day
   panel, co-op notices … — a dead life gets no pay. Robots E-S2 8/8 lives + E-S3 4 lives: the chest sat over the end card.
   Whole family (law 11): every popup source is fired (a) AFTER the life ended and (b) BEFORE it (pending chest / queued scene, then the ending in the same
   tick = the month-roll death), for ≥ 6 ending kinds. Check: the ending's own ink entrance (kitInk, mourning endings) is tapped through like a player,
   then the end card is the top layer at 9 points of the screen, it is the ONLY card in Q, and no kit scene / toast / podium / new-day panel is left.
   Also: the end card's «Chuyển kiếp» starts a new life whose first popups still play (the gate is for a dead life only); old save loads.
   usage: node dev/test/endcard-top.js [outdir|-] [url] [WxH@d,…]      prints a SOURCE | RESULT table; exit 1 on any FAIL */
const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const A=process.argv.slice(2);const OUT=A[0]&&A[0]!=='-'?A[0]:null;const URL=A[1]&&A[1]!=='-'?A[1]:'file://'+path.resolve(__dirname,'../../index.html');
const SIZES=(A[2]||'755x1000@1').split(',').map(s=>{const m=s.match(/(\d+)x(\d+)@(\d+)/);return {w:+m[1],h:+m[2],d:+m[3]}});
if(OUT)fs.mkdirSync(OUT,{recursive:true});
const ENDS={
 death:`die('Bệnh nặng')`,
 exile:`over('Phế làm thứ dân','Chiếu phế ngươi làm thứ dân, cho ra khỏi cung.','Phế làm thứ dân',true)`,
 leave:`over('Xuất cung','Ngươi rời cung theo lệ.','Xuất cung',true)`,
 throne:`over('Hoàng thái hậu','Con ngươi lên ngôi.','Lên ngôi Thái hậu',true)`,
 cold:`over('Tuổi xuân tàn trong lãnh cung','Ngươi già đi trong lãnh cung.','Tuổi xuân tàn trong lãnh cung',true)`,
 poison:`over('Hồng nhan bạc mệnh','Chén canh có độc.','Trúng độc')`,
 punish:`over('Hồng nhan bạc mệnh','Bị ban chết.','Bị ban chết bạch lăng')`,
 nun:`over('Xuất gia','Ngươi xuống tóc quy y.','Xuất gia',true)`};
/* popup sources (fired on the dead life). Each is real game code with plain arguments. */
const SRC={
 'stipend chest (monthPay → jecon month card + jstip stipReveal «Bổng lộc tháng»)':`monthPay()`,
 'month roll (monthTick: pay, rivals, heirs, news)':`monthTick()`,
 'stipReveal chest':`stipReveal([{k:Object.keys(IT)[0]}],{kind:'chest',title:'Bổng lộc tháng ba',sub:'Nội vụ phủ phát'})`,
 'kitReward chest':`kitReward({kind:'chest',title:'Rương bảo vật',items:[{n:'Ngọc bội'}]})`,
 'event card Q.push + showModal':`Q.push({t:'Tin trong cung',h:'<p>x</p>'});showModal()`,
 'event card Q.unshift + showModal':`Q.unshift({t:'Tin trong cung',kind:'news',h:'<p>x</p>'});showModal()`,
 'kitGain «Nhận»':`kitGain(Object.keys(IT)[0])`,
 'kitLose':`kitLose(Object.keys(IT)[0],{why:'sell'})`,
 'kitCoins':`kitCoins(1,20)`,
 'kitLearn':`kitLearn({t:'Học được lối «x»'})`,
 'kitItemFx':`kitItemFx('give',{k:Object.keys(IT)[0]},{})`,
 'kitNotice (co-op / errand notices)':`kitNotice({id:'t:'+Date.now(),line:'Có tin',text:'Có tin'})`,
 'kitKnow':`kitKnow({key:'t'+Date.now(),pri:1,text:'Ngươi biết được: x.'})`,
 'srvToast':`srvToast('Có tin')`,
 'kitLine':`kitLine('Có tin',3000)`,
 'kitStatFx':`kitStatFx([{k:'danh',dv:3}],{src:'apply'})`,
 'kitEdict (rank up)':`kitEdict({from:0,to:1})`,
 'kitGloom (rank down)':`kitGloom({title:'Bị giáng',from:1,to:0})`,
 'kitBloom (pregnancy / birth)':`kitBloom({title:'Có tin vui'})`,
 'kitAlarm':`kitAlarm()`,
 'kitFlyItem':`kitFlyItem(Object.keys(IT)[0])`,
 'kitPodium':`kitPodium([{who:S,n:3},{who:liveRivals(true)[0],n:2},{who:liveRivals(true)[1],n:1}],{title:'Tranh sủng'})`,
 'kitFlipNote (night tablet)':`kitFlipNote(liveRivals(true)[0])`,
 'dawn (new-day panel)':`dawn()`,
 'nextBuoi / endTurn (day roll)':`nextBuoi();endTurn()`,
 'render (kmDiff: rank / birth / chest diffs)':`S.rank=Math.min(7,S.rank+1);S.inv.push({k:Object.keys(IT)[1],from:'th'});render()`};
const ok=[];const rows=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,x===undefined?'':JSON.stringify(x).slice(0,400))};
(async()=>{const b=await chromium.launch();
 for(const z of SIZES){const tag=`${z.w}x${z.h}`;
  const ctx=await b.newContext({viewport:{width:z.w,height:z.h},deviceScaleFactor:z.d,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof kitReward==='function'&&typeof kmReset==='function',null,{timeout:0});await p.waitForTimeout(2500);
  const life=()=>p.evaluate(async()=>{quiet=true;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;quiet=false;
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&!S.dead)||++n>150)r();else setTimeout(t,100)};t()});await new Promise(r=>setTimeout(r,1500));try{kmReset()}catch(e){}Q.length=0;showModal();
   S.bac=Math.max(S.bac||0,500)});
  const run=code=>p.evaluate(c=>{try{(0,eval)(c);return null}catch(e){return String(e).slice(0,160)}},code);
  /* a player taps through the ending's own ink entrance (mourning endings) — only that scene; anything else stays as found */
  const settle=async()=>{for(let i=0;i<14;i++){await p.waitForTimeout(500);const k=await p.evaluate(()=>{const o=document.querySelector('.kmov.km-inkov');if(!o)return 0;const e=o.querySelector('.kmend');if(e){e.click();return 1}return 2});if(!k&&i>=3)break}await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(700)};/* KLIFE: the picture-loading cover of the end card (not a popup) */
  const look=()=>p.evaluate(()=>{const M=document.getElementById('modal');const pts=[];for(const fx of [.15,.5,.85])for(const fy of [.2,.5,.8]){const e=document.elementFromPoint(innerWidth*fx,innerHeight*fy);pts.push(e&&e.closest('#modal')?'M':(e?(e.id||e.className||e.tagName).toString().slice(0,40):'-'))}
   const vis=e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'&&+cs.opacity>0.05};
   const extra=[...document.querySelectorAll('.kmov,#kmrew,#kpodov,.kmfly,.kmalarm,.kroul-ov,#rtoast.on,#kupdline,.klearnov,.kcoinfly,.kfgain,#kdaytc')].filter(e=>!e.closest('#modal')&&vis(e)&&!(e.classList.contains('kmerr-lay')&&!e.querySelector('.kmerr-fig'))).map(e=>(e.id||e.className).toString().slice(0,50));
   const dawn=document.getElementById('dawn');
   return {dead:!!(S&&S.dead),hid:M.hidden,end:/\b(end|kes)\b/.test(M.className),q:Q.map(m=>(m.kend?'KEND:':'')+m.t),pts,extra,dawn:!!(dawn&&!dawn.hidden&&vis(dawn)),kmq:KMQ.length}});
  const good=r=>r.dead&&!r.hid&&r.end&&r.q.length>=1&&/^KEND:/.test(r.q[0])/* a card pushed BEHIND the end card with no redraw is never drawn: «Chuyển kiếp» starts the next life (checked below); kesFront drops it on the next draw */&&r.pts.every(x=>x==='M')&&!r.extra.length&&!r.dawn&&!r.kmq;
  const ENDK=Object.keys(ENDS);let ei=0;
  for(const [sn,code] of Object.entries(SRC)){
   for(const when of ['after','before']){const ek=ENDK[(ei++)%ENDK.length];
    await life();let e1=null;
    if(when==='after'){await run(ENDS[ek]);await settle();e1=await run(code)}
    else{e1=await run(code+';'+ENDS[ek])}
    await settle();await p.waitForTimeout(800);const r=await look();const g=good(r);
    rows.push([tag,sn,when,ek,g?'END CARD ON TOP':'COVERED '+JSON.stringify({pts:r.pts.filter(x=>x!=='M').slice(0,2),extra:r.extra.slice(0,2),q:r.q.slice(0,3),dawn:r.dawn,kmq:r.kmq,hid:r.hid}),e1||'']);
    chk(`${tag} ${sn} [${when} the ending, ${ek}]: end card is the top and only modal`,g,r);
    if(OUT&&!g)await p.screenshot({path:path.join(OUT,`${tag}-${rows.length}.png`)});}}
  /* the 8 ending kinds × the month-roll death with a pending chest: shots of 2 of them */
  for(const ek of ENDK){await life();await run(`monthPay();`+ENDS[ek]);await settle();const r=await look();chk(`${tag} month-roll ${ek}: end card is the top and only modal`,good(r),r);
   if(OUT&&(ek==='death'||ek==='leave'))await p.screenshot({path:path.join(OUT,`${tag}-monthroll-${ek}.png`)})}
  /* the next life is not gated: «Chuyển kiếp» → a new life, its chest / scene plays */
  await life();await run(`monthPay();die('Bệnh nặng')`);await settle();
  await p.evaluate(()=>{const b=document.querySelector('#modal #mclose, #modal .kes-go, #modal button.main');if(b)b.click();else closeModal()});
  await p.waitForFunction(()=>S&&!S.dead&&S.origin,null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(2500);
  await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;showModal();kitReward({kind:'chest',title:'Rương bảo vật',items:[{n:'Ngọc bội'}]})});await p.waitForTimeout(1200);
  const nl=await p.evaluate(()=>({dead:S.dead,over:typeof kmLifeOver==='function'?kmLifeOver():null,rew:!!document.querySelector('.kmov.km-reward,#kmrew')||KMQ.length>0/* queued behind the new life's intro (kmFree) = not gated */,oldPay:Q.some(m=>/Bổng lộc/.test(m.t||''))}));chk(`${tag} new life after «Chuyển kiếp»: popups play again, the dead life's pay card is gone`,!nl.dead&&nl.rew&&!nl.oldPay,nl);
  chk(`${tag} no page errors`,!errs.length,errs.slice(0,4));await ctx.close()}
 await b.close();
 console.log('\nSIZE | SOURCE | WHEN | ENDING | RESULT | ERR');for(const r of rows)console.log(r.join(' | '));
 const bad=ok.filter(x=>!x[1]);console.log(`\nendcard-top: ${ok.length-bad.length}/${ok.length} PASS`);process.exit(bad.length?1:0)})();
