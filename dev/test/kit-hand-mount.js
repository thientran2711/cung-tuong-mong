/* kit-hand-mount.js (KK51, KIT §101.13 kitHand.mount — the Bàn bài outside #modal): real game, Fold 755x1000 + iPad 1180x820 (+ any WxH list).
   A hand is mounted into a tab-pane stand-in at #panel's place (#khmpane, scrolling box) with 2 / 4 / 7 / 10 / 12 cards (short, long, person names; one locked card):
   (1) every card is a kit hand card (.khost>.opts.khand>button.ka.kopt, picture .kaart + name), ONE card size, all inside the pane width, no page h-overflow, every card at once (12 → 12, no pager);
   (2) no card name cut (.kan fits);  (3) real tap = lift + the ENLARGED card (.khplate.khbig, KIT §101.10 no flip: info on its front) in the centre of the pane + ONE small green ✓ INSIDE it (top-right 3 in / 2 down, BAL.kpkgo), on screen; no flip class / code;
   (4) ✕ puts back; ✓ = fly then onPick(id) once;  (5) a robot click (detail 0) → onPick at once;  (6) a locked card lifts with ✕ only (no ✓), never picks;
   (7) a tap outside the host puts the card back;  (8) onLift fires;  (9) destroy removes the host;  (10) the #modal hand is unchanged (kit-hand.js covers it);  no page errors.
   usage: node dev/test/kit-hand-mount.js <index.html> [WxH,...] [shotdir]   exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');const SHOT=process.argv[4]||'';
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitHand&&kitHand.mount,null,{timeout:240000});await p.waitForTimeout(1200);
  await p.evaluate(async()=>{quiet=true;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   document.documentElement.classList.add('kf-still');
   const N=['Trò chuyện','Giao hảo cùng nàng','Khiêu khích','Thách đấu tài nghệ cùng Chiêu nghi Tống Như Nguyệt','Tặng quà','Hỏi han chuyện nhà','Nhờ dò la tin tức','Mời uống trà','Xin chữ','Cùng ngắm hoa','Bàn chuyện cung vụ','Hỏi thăm sức khỏe'];
   window.__cards=n=>N.slice(0,n).map((x,i)=>({id:'c'+i,n:x,line:i%3===0?'tốn: 1 khắc · được: Danh +1':'tốn: 1 khắc',off:i===2,why:i===2?'Chưa đủ Tài':''}));
   window.__mount=n=>{const pn=document.getElementById('panel');let c=document.getElementById('khmtest');if(!c){/* a tab-pane stand-in at the pane's place (the game re-renders #panel itself) */const r0=pn.getBoundingClientRect(),r=r0.width>50?r0:{left:0,top:0,width:innerWidth}/* Fold one-page view: #panel is not shown on the stage page */,pane=document.createElement('div');pane.id='khmpane';pane.style.cssText=`position:fixed;left:${r.left}px;top:${Math.max(r.top,innerHeight*.35)}px;width:${r.width}px;bottom:0;overflow:auto;z-index:2147483000;background:var(--k-card,#fffaf0)`;c=document.createElement('div');c.id='khmtest';c.style.padding='8px 10px';pane.appendChild(c);document.body.appendChild(pane)}window.__pk=[];window.__lf=[];
    return window.__H=kitHand.mount(c,{cards:__cards(n),onPick:id=>window.__pk.push(id),onLift:id=>window.__lf.push(id)})}});
  const out=[];
  for(const n of [2,4,7,10,12]){const r=await p.evaluate(async n=>{const Hh=__mount(n);await new Promise(r=>setTimeout(r,250));const pn=document.getElementById('khmpane').getBoundingClientRect(),hr=Hh.el.getBoundingClientRect();
    const bs=Hh.cards(),G=Hh.g.getBoundingClientRect(),R=bs.map(x=>{const l=G.left+x.offsetLeft,t=G.top+x.offsetTop;return {left:l,top:t,right:l+x.offsetWidth,bottom:t+x.offsetHeight,width:x.offsetWidth,height:x.offsetHeight}})/* the resting box (the fan turns cards a little) */;return {n,np:bs.length,kit:bs.every(x=>x.matches('.khost>.opts.khand>button.ka.kopt')&&!!x.querySelector('.kaart')&&!!x.querySelector('.kan')),
     sizes:[...new Set(R.map(r=>Math.round(r.width)+'x'+Math.round(r.height)))].length,inPane:R.every(r=>r.left>=pn.left-2&&r.right<=pn.right+2),hov:document.documentElement.scrollWidth>innerWidth+1,
     cut:bs.filter(x=>{const k=x.querySelector('.kan');return k&&k.scrollHeight>k.clientHeight+1}).map(x=>x.dataset.khid),cw:Math.round(R[0].width),hostH:Math.round(hr.height)}},n);out.push(r)}
  const o=out;console.log('   ',JSON.stringify(o.map(x=>[x.n,x.np,x.cw,x.hostH])));
  chk(wh+' kit hand cards (picture + name), every card at once (12 → 12, no pager)',o.every(x=>x.kit&&x.np===x.n),o.filter(x=>!x.kit||x.np!==x.n));
  chk(wh+' ONE card size per hand',o.every(x=>x.sizes===1),o.filter(x=>x.sizes!==1));
  chk(wh+' all cards inside the pane, no page h-overflow',o.every(x=>x.inPane&&!x.hov),o.filter(x=>!x.inPane||x.hov));
  chk(wh+' no card name cut',o.every(x=>!x.cut.length),o.filter(x=>x.cut.length).map(x=>x.n+':'+x.cut));
  /* interaction on a 4-card hand: real mouse taps */
  await p.evaluate(()=>{__mount(4);document.getElementById('khmtest').scrollIntoView({block:'center'})});await p.waitForTimeout(1300)/* the deal-in lands first */;
  const tap=async sel=>{const bb=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},sel);if(!bb)return false;await p.mouse.click(bb[0],bb[1]);return true};
  await tap('#khmtest button[data-khid=c1]');await p.waitForTimeout(600);
  const s1=await p.evaluate(()=>{const z=document.querySelector('#khmtest .khplate.khbig:not([hidden])'),c=document.querySelector('#khmtest .khconf:not([hidden])');const zr=z&&z.getBoundingClientRect();
   const bt=document.querySelector('#khmtest button[data-khid=c1]'),br=bt.getBoundingClientRect(),hit=document.elementFromPoint(br.left+br.width/2,br.top+br.height/2);return {hit:hit&&(hit.tagName+'.'+String(hit.className).slice(0,30)+(hit.closest('#khmtest')?' in':' OUT')),modal:!document.getElementById('modal').hidden,up:!!document.querySelector('#khmtest button.klift[data-khid=c1]'),plate:!!z,conf:!!c&&!c.querySelector('.khok').hidden,plateIn:!!zr&&zr.left>=-1&&zr.right<=innerWidth+1&&zr.top>=-1&&zr.bottom<=innerHeight+1,confOnCard:!!c&&!!zr&&(()=>{const q=c.querySelector('.khok').getBoundingClientRect();return Math.round(zr.right-q.right)===3&&Math.round(q.top-zr.top)===2&&Math.round(q.width)===BAL.kpkgo.w&&Math.round(q.height)===BAL.kpkgo.h&&q.left>=zr.left&&q.top>=zr.top&&q.bottom<=innerHeight&&c.querySelector('.khok').textContent.trim()==='✓'&&!c.querySelector('.khx')})()/* ONE «Chọn» 12 px under the enlarged card */,flip:!!document.querySelector('.khflip,.khback,.khff,.khfb')||typeof window.kitHandFlipPlace==='function'||!!KIT_HAND.flip,plateW:zr?Math.round(zr.width):0,lf:window.__lf.slice(),pk:window.__pk.slice()}});
  if(SHOT)await p.screenshot({path:`${SHOT}/mount-${wh}.png`});
  chk(wh+' real tap = lift + enlarged card (≥ 200 px, front only) + ONE small green ✓ INSIDE it (top-right 3 in / 2 down, BAL.kpkgo), on screen, onLift, no flip',s1.up&&s1.plate&&s1.conf&&s1.plateIn&&s1.confOnCard&&s1.plateW>=200&&!s1.flip&&s1.lf[0]==='c1'&&!s1.pk.length,s1);
  await p.mouse.click(5,Math.round(H*.5));await p.waitForTimeout(500);const s2=await p.evaluate(()=>({up:document.querySelectorAll('#khmtest button.klift').length,pk:window.__pk.slice()}));
  chk(wh+' tap elsewhere puts back',s2.up===0&&!s2.pk.length,s2);
  await tap('#khmtest button[data-khid=c3]');await p.waitForTimeout(500);await tap('#khmtest .khconf>.khok');await p.waitForTimeout(700);const s3=await p.evaluate(()=>window.__pk.slice());
  chk(wh+' «Chọn» = choose → onPick once',s3.length===1&&s3[0]==='c3',s3);
  await p.evaluate(()=>{__mount(4)});await p.waitForTimeout(1300);const s4=await p.evaluate(()=>{document.querySelector('#khmtest button[data-khid=c0]').click();return window.__pk.slice()});
  chk(wh+' robot click (detail 0) → onPick at once',s4.length===1&&s4[0]==='c0',s4);
  await p.evaluate(()=>{window.__pk=[];document.getElementById('khmtest').scrollIntoView({block:'center'})});await tap('#khmtest button[data-khid=c2]');await p.waitForTimeout(500);
  const s5=await p.evaluate(()=>{const c=document.querySelector('#khmtest .khconf:not([hidden])');return {up:!!document.querySelector('#khmtest button.klift[data-khid=c2]'),ok:c?!c.querySelector('.khok').hidden:null,x:!!c,pk:window.__pk.slice()}});
  chk(wh+' locked card enlarges with no «Chọn», never picks',s5.up&&!s5.x&&!s5.pk.length,s5);
  await p.mouse.click(5,Math.round(H*.5));await p.waitForTimeout(400);const s6=await p.evaluate(()=>document.querySelectorAll('#khmtest button.klift').length);
  chk(wh+' tap outside the host puts the card back',s6===0,s6);
  const s7=await p.evaluate(()=>{__H.destroy();return !document.querySelector('#khmtest .khost')});chk(wh+' destroy removes the host',s7,s7);
  chk(wh+' no page errors',errs.length===0,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'FAIL '+fails:'KIT-HAND-MOUNT PASS');process.exit(fails?1:0)})();
