/* kit-hand.js — KIT §101 kitHand «Bàn bài» (KK30, owner 24/11 ~15:15Z mẫu 1 + 25/11 ~15:12Z): every event-choice frame with 2–10 kit option cards is a HAND.
   Per device (Fold 755x1000, iPad 1180x820) and per case:
   - the list is a hand (.opts.khand), every card fully inside the screen AND the frame, no two card slots overlap, nothing scrolls to reach a card;
   - the story text reads unscrolled when the frame can hold it (real «Tân quân lập uy · Chương 2»), the speaker's figure (.kszfig) is never under a card or the plate;
   - REAL tap 1 on a card: it lifts (.klift), the plate shows (inside the screen, not over the figure), nothing is chosen;
   - REAL tap again on the lifted card body: nothing; ✕ puts it back; a real tap on the green ✓ chooses (the frame's own go runs) — owner 25/11 ~21:55Z (KK33);
   - a LOCKED card: real tap lifts it, the plate shows its why, a second tap chooses nothing;
   - keyboard Enter on a focused card chooses at once (robot / keyboard path unchanged).
   usage: node dev/test/kit-hand.js <index.html> [outdir]   Exit 1 on a FAIL. Shots (outdir) never go in git. */
const {chromium}=require('playwright');const fs=require('fs');const [,,SRC,OUT]=process.argv;const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);let fails=0;const log=s=>console.log(s);
 if(OUT)fs.mkdirSync(OUT,{recursive:true});
 for(const [W,H] of SZ){const dev=W<H?'fold':'ipad';const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>{if(!/Unexpected token '<'/.test(String(e)))errs.push(String(e))});await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof pEmp==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);
  await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch{display:none!important}'});
  const clear=()=>p.evaluate(()=>{try{while(Q.length){const k=Q.length;closeModal();if(Q.length>=k)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;window.__fired=-1});
  const geo=()=>p.evaluate(()=>{const M=document.getElementById('modal'),d=M&&!M.hidden&&M.querySelector('.dlg');if(!d)return {none:1,fired:window.__fired,q0:Q[0]&&Q[0].__khT,boxes:[]};const R=e=>{const r=e.getBoundingClientRect();return {l:r.left,t:r.top,r:r.right,b:r.bottom}};const D=R(d);
   const g=d.querySelector('.opts.khand');const bs=g?[...g.querySelectorAll(':scope>button.kopt')]:[];const box=bs.map(R);const inS=x=>x.l>=-1&&x.t>=-1&&x.r<=innerWidth+1&&x.b<=innerHeight+1,inD=x=>x.l>=D.l-1&&x.t>=D.t-1&&x.r<=D.r+1&&x.b<=D.b+1;
   /* slot overlap = the untransformed boxes (left/top/width/height) */const sl=bs.map(x=>({l:x.offsetLeft,t:x.offsetTop,r:x.offsetLeft+x.offsetWidth,b:x.offsetTop+x.offsetHeight}));let ov=0;for(let i=0;i<sl.length;i++)for(let j=i+1;j<sl.length;j++){const a=sl[i],c=sl[j];if(a.l<c.r-1&&c.l<a.r-1&&a.t<c.b-1&&c.t<a.b-1)ov++}
   const fig=d.querySelector('.kszfig');const F=fig&&fig.getClientRects().length?R(fig):null;const hit=(a,c)=>a&&c&&a.l<c.r-2&&c.l<a.r-2&&a.t<c.b-2&&c.t<a.b-2;
   const pz=d.querySelector(':scope>.khplate:not([hidden])');const P=pz?R(pz):null;const pm=d.querySelector('.kpmain');const sc=[...d.querySelectorAll('#mb,.k3right,.opts')].filter(e=>e.scrollHeight>e.clientHeight+2&&getComputedStyle(e).overflowY!=='visible').map(e=>e.id||e.className.split(' ')[0]);
   return {title:(d.querySelector('.kptitle,h2')||{}).textContent,hand:!!g,n:bs.length,rows:g&&g.dataset.khrows,allS:box.every(inS),allD:box.every(inD),ov,cardOverFig:box.some(x=>hit(x,F)),plate:!!P,plateS:P?inS(P):null,plateOverFig:hit(P,F),textUnscrolled:pm?pm.scrollHeight<=pm.clientHeight+1:null,scrollers:sc,lifted:bs.findIndex(x=>x.classList.contains('klift')),boxes:box.map(x=>[Math.round(x.l+(x.r-x.l)/2),Math.round(x.t+(x.b-x.t)/2)]),fired:window.__fired,q0:Q[0]&&Q[0].__khT}});
  const tap=async(i)=>{const g=await geo();const [x,y]=g.boxes[i];await p.touchscreen.tap(x,y);await p.waitForTimeout(450)};
  const conf=k=>p.evaluate(k=>{const e=document.querySelector('#modal .dlg>.khconf:not([hidden])>.'+k);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},k);
  const tapC=async k=>{const q=await conf(k);if(!q)return false;await p.touchscreen.tap(q[0],q[1]);await p.waitForTimeout(500);return true};
  const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/${dev}-${n}.png`})};
  const chk=(name,ok,info)=>{if(!ok){fails++;log(`FAIL ${dev} ${name} ${info||''}`)}else log(`ok   ${dev} ${name}`)};
  /* 1. the real frame «Tân quân lập uy · Chương 2» (jreign RGBT.c2a) */
  await clear();for(let k=0;k<6;k++){const ok=await p.evaluate(()=>{Q.length=0;if(!rgFire('c2a')){window.__nlInner=1;start();window.__nlInner=0;Q.length=0;return false}Q.length=1;Q[0].__khT='c2a';showModal();return true});if(ok)break;await p.waitForTimeout(2500);await clear()}/* mkP can refuse the chapter in a random life: a new life */await p.waitForTimeout(2600);
  let g=await geo();await shot('c2a-deal');
  chk('c2a hand',g.hand&&g.n>=2,JSON.stringify(g).slice(0,200));chk('c2a cards in screen+frame',g.allS&&g.allD);chk('c2a no slot overlap',g.ov===0,'ov '+g.ov);chk('c2a no scroll',!g.scrollers.length,g.scrollers.join());chk('c2a text unscrolled',g.textUnscrolled!==false);chk('c2a figure clear',!g.cardOverFig);
  const face=await p.evaluate(()=>{const bs=[...document.querySelectorAll('#modal .opts.khand>button.kopt')];return {odds:bs.filter(b=>{const o=b.querySelector('.kodds');return o&&o.getClientRects().length}).length,src:bs.map(b=>(b.querySelector('.kaart img')||{}).src||''),ph:bs.filter(b=>/^ph/.test(b.dataset.kopic||'')).length}});
  chk('c2a face = picture + name only (no odds meter)',face.odds===0,'odds '+face.odds);chk('c2a every card its own picture',new Set(face.src).size===face.src.length&&face.ph===0,JSON.stringify(face));
  await tap(1);g=await geo();await shot('c2a-lift');chk('c2a tap1 lifts',g.lifted===1&&g.q0==='c2a',`lifted ${g.lifted} q0 ${g.q0}`);chk('c2a plate',g.plate&&g.plateS&&!g.plateOverFig,JSON.stringify({p:g.plate,s:g.plateS,f:g.plateOverFig}));
  await tap(0);g=await geo();chk('c2a tap other lifts it',g.lifted===0&&g.q0==='c2a');
  await tap(0);g=await geo();chk('c2a body tap again chooses nothing',g.lifted===0&&g.q0==='c2a',`lifted ${g.lifted} q0 ${g.q0}`);
  chk('c2a ✓ ✕ shown on lifted card',!!(await conf('khok'))&&!!(await conf('khx')));
  await tapC('khx');g=await geo();chk('c2a ✕ puts it back',g.lifted===-1&&g.q0==='c2a',`lifted ${g.lifted}`);
  await tap(0);await tapC('khok');g=await geo();await shot('c2a-chosen');chk('c2a ✓ chooses',g.q0!=='c2a',`q0 ${g.q0} title ${g.title}`);
  /* 2. synthetic frames 2 / 6 / 8 / 10 cards (kit option cards with Tốn / Được rows), real tap twice on the LAST card */
  for(const no of [2,6,8,10]){await clear();await p.evaluate(no=>{const names=['Theo Hoàng thượng','Theo Thái hậu','Theo Tể tướng','Đứng ngoài, giữ mình','Chờ xem thêm','Về cung nghỉ','Hỏi Hoàng hậu','Dò la Kính sự phòng','Tặng lễ','Cáo bệnh'];
    const o=Array.from({length:no},(_,i)=>({n:names[i],fx:{},j67:'tốn: Danh -2 · được: phe này tin ngươi hơn một chút, kèm: phe kia nghi ngờ',go:()=>{window.__fired=i}}));
    Q.push({t:'Phụ tuyến · Thử bàn bài · '+no,h:'<p>Tân quân lên ngôi, triều đình chia ba ngả, mỗi phe đều muốn kéo ngươi về phía mình.</p><p>Ngươi theo ai?</p>',opts:o,who:pEmp(),pid:'rg',__khT:'n'+no});showModal()},no);await p.waitForTimeout(2200);
   g=await geo();await shot('n'+no);chk(`n${no} hand`,g.hand&&g.n===no,`n ${g.n}`);chk(`n${no} cards in screen+frame`,g.allS&&g.allD);chk(`n${no} no slot overlap`,g.ov===0,'ov '+g.ov);chk(`n${no} no scroll`,!g.scrollers.length,g.scrollers.join());chk(`n${no} figure clear`,!g.cardOverFig);
   await tap(no-1);g=await geo();chk(`n${no} tap1 lifts last`,g.lifted===no-1&&g.fired===-1);chk(`n${no} plate`,g.plate&&g.plateS&&!g.plateOverFig);if(no===6)await shot('n6-lift');
   await tapC('khok');g=await geo();chk(`n${no} ✓ chooses last`,g.fired===no-1,'fired '+g.fired)}
  /* 3. locked card */
  await clear();await p.evaluate(()=>{const o=['Dâng sớ can gián','Im lặng chờ thời','Nhờ Thái hậu nói giúp'].map((n,i)=>({n,fx:{},j67:'tốn: Danh -2 · được: bệ hạ nghe ngươi',go:()=>{window.__fired=i}}));o[0].lk=()=>'Chưa đủ Danh';Q.push({t:'Thử thẻ khóa',h:'<p>Triều nghị bàn chuyện biên ải.</p>',opts:o,who:pEmp(),pid:'rg',__khT:'lk'});showModal()});await p.waitForTimeout(2000);
  g=await geo();chk('locked hand',g.hand&&g.n===3);await tap(0);g=await geo();await shot('locked-lift');const why=await p.evaluate(()=>{const z=document.querySelector('#modal .khplate:not([hidden])');return z?z.textContent:''});
  chk('locked tap lifts + why',g.lifted===0&&/Chưa đủ Danh/.test(why),`lifted ${g.lifted} why «${why.slice(0,80)}»`);chk('locked: no ✓',!(await conf('khok')));await tap(0);g=await geo();chk('locked tap2 chooses nothing',g.fired===-1&&g.q0==='lk');
  /* 4. keyboard Enter = choose at once */
  await tap(1);await p.evaluate(()=>{document.querySelector('#modal .opts.khand>button.kopt[data-m="2"]').focus()});await p.keyboard.press('Enter');await p.waitForTimeout(400);g=await geo();chk('keyboard Enter chooses',g.fired===2,'fired '+g.fired);
  /* 5. KK41 (MAIN 157 ruling, OD:L177): a name longer than the 4-line face → the frame stays the LIST card, every name WHOLE (never cut, never a smaller tier); a fresh short set is a hand again */
  await clear();await p.evaluate(()=>{const L=['Kể rõ chuyện xô đẩy trước Thái hậu, xin hỏi người chặn nước nóng là ai, vì sao lại dám làm như thế giữa ban ngày ban mặt trong cung cấm','Nhờ một vị Tổng quản thái giám nhớ mặt kẻ hầu đã xô, rồi lặng lẽ ghi lại tên tuổi, giờ giấc và nơi chốn để sau này đối chất trước mặt mọi người','Giúp một vị Phi pha lại ấm trà mới, mời nàng cùng dâng để nàng ta rạng mặt trước Thái hậu và các vị phi tần khác đang ngồi chờ'];
    Q.push({t:'Thử tên dài',h:'<p>Phòng pha trà của Thái hậu.</p>',opts:L.map((n,i)=>({n,fx:{},j67:'tốn: Danh -2',go:()=>{window.__fired=i}})),who:pEmp(),pid:'rg',__khT:'long'});showModal()});await p.waitForTimeout(2200);
  const lg=await p.evaluate(()=>{const o=document.querySelector('#modal .opts');const bs=o?[...o.querySelectorAll(':scope>button.kopt')]:[];const cut=bs.filter(b=>{const k=b.querySelector('.kan');return k&&k.scrollHeight>k.clientHeight+1}).length;const d=o&&o.closest('.dlg');return {hand:!!(o&&o.classList.contains('khand')),stage:!!(d&&(d.classList.contains('kstage')||d.classList.contains('khdlg'))),n:bs.length,cut,plate:!!(d&&d.querySelector(':scope>.khplate:not([hidden])'))}});
  await shot('long');
  chk('long names: whole (no cut)',lg.cut===0&&lg.n===3,JSON.stringify(lg));if(lg.hand)chk('long names: hand only when every face holds its name',lg.cut===0);else chk('long names: list card, no hand / stage left',!lg.stage&&!lg.plate,JSON.stringify(lg));
  await clear();await p.evaluate(()=>{Q.push({t:'Thử tên ngắn',h:'<p>Triều nghị.</p>',opts:['Theo Hoàng thượng','Chờ xem thêm','Về cung nghỉ'].map((n,i)=>({n,fx:{},j67:'tốn: Danh -2',go:()=>{window.__fired=i}})),who:pEmp(),pid:'rg',__khT:'short'});showModal()});await p.waitForTimeout(2200);g=await geo();chk('short names after a long set: hand again',g.hand&&g.n===3);
  chk('no page errors',!errs.length,errs.slice(0,3).join(' | '));await ctx.close()}
 await b.close();log(fails?`KIT-HAND FAIL ${fails}`:'KIT-HAND PASS');process.exit(fails?1:0)})();
