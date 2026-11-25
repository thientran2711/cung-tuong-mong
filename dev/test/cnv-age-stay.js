/* review/cnv-exit-promo (robot flight2-s5d: «Xin ở lại» at 25 shown as «Rất vững» + «Được: chủ thêm tin dùng», life ended «Xuất cung»):
   the age dialog (j42 PEND.cnvAge) — the stay answer's text, odds meter and outcome agree.
   For Chủ tin below and above BAL.srvx.keepTin: the shown row names the true outcome («ở lại đến BAL.srvAge.out tuổi», no threshold read as a gain),
   a real tap on the row keeps her (no ending at 25), Chủ tin moves by the fx the row shows, and she leaves only at BAL.srvAge.out (j42 srvMonth).
   usage: node dev/test/cnv-age-stay.js <url of dev/index.html>   exit 1 on a FAIL */
const {chromium}=require('playwright');const URL=process.argv[2];
(async()=>{const b=await chromium.launch();const T=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':JSON.stringify(x).slice(0,300)]);const errs=[];
 for(const lo of [true,false]){const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block',reducedMotion:'reduce',hasTouch:true,isMobile:true});
  await ctx.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,#klife,.krbox,#ktut,.ktip{display:none!important}';document.head.appendChild(s)})});
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);
  const K=await p.evaluate(lo=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   window.__forceOrigin="cnv";for(let i=0;i<20;i++){start();if(isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
   S.age=BAL.srvAge.ask-1;S.month=12;S.srv.rk=1;S.tin=lo?BAL.srvx.keepTin-20:BAL.srvx.keepTin+10;S.srv.lau=0;S.srv.ageAsked=0;S.bac=150;
   srvMonth();let i=Q.findIndex(m=>m.pid==="cnvAge");if(i<0){/* the month roll sent her elsewhere first (Tân Giả khố, a new master): ask as srvMonth does */S.srv.lau=0;S.tin=lo?BAL.srvx.keepTin-20:BAL.srvx.keepTin+10;S.srv.ageAsked=1;pushDil(mkP("cnvAge",{}),"Đến tuổi xuất cung");i=Q.findIndex(m=>m.pid==="cnvAge")}const m=Q[i];Q.length=0;if(m)Q.push(m);showModal();
   const st=m&&m.opts.find(o=>/ở lại|giữ lại/i.test(o.n));return{has:!!m,n:st&&st.n,x:st&&st.x,fx:st&&st.fx,out:BAL.srvAge.out,tin0:S.tin}},lo);
  ok(K.has,`${lo?'low':'high'} Chủ tin: the age dialog fires at ${K.out-5}`,K);
  ok(!/dưới|từ \d|trên \d/.test(K.x||''),'stay line names no threshold (the kit hint read «Chủ tin dưới N» as a gain)',K.x);
  ok(new RegExp('ở lại đến '+K.out+' tuổi').test(K.x||''),'stay line prints the true outcome from BAL.srvAge.out',K.x);
  for(let i=0;i<25;i++){const n=await p.evaluate(()=>{let n=0;document.querySelectorAll('#kmrew button, .kmov.km-endon > .kmend, #kmrew').forEach(b=>{if(b.getClientRects().length){b.click();n++}});return n});if(!n&&await p.evaluate(()=>!document.getElementById('modal').hidden))break;await p.waitForTimeout(600)}
  await p.waitForTimeout(800);
  const row=p.locator('#modal button.opt',{hasText:K.n}).first();const txt=(await row.innerText().catch(()=>'')).replace(/\s+/g,' ');
  ok(/ở lại đến/.test(txt),'the shown row carries «ở lại đến … tuổi»',txt);
  ok(lo?!/ĐƯỢC[^]*chủ thêm tin/i.test(txt):true,'low Chủ tin: the row shows no Chủ tin gain',txt);
  const bb=await row.boundingBox().catch(()=>null);if(bb)await p.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(1200);
  const A=await p.evaluate(()=>({over:!!S.over,dead:!!S.dead,age:S.age,tin:S.tin,q:Q.length}));
  ok(!A.over&&!A.dead,'a real tap on the stay row keeps her in the palace',A);
  ok(A.tin===K.tin0+(K.fx.tin||0),'Chủ tin moves by the row fx',{A,K});
  const L=await p.evaluate(()=>{let asked=0;for(let j=0;j<80&&!S.dead&&!S.over;j++){Q.length=0;srvMonth();if(Q.some(q=>q.pid==="cnvAge"))asked++}const e=(S.dead||S.over)?String((Q.find(q=>q.cls==="end"||/Kiếp này/.test(q.t))||Q[0]||{}).h||"").replace(/<[^>]+>/g," ").slice(0,160):"";return{age:S.age,end:!!(S.dead||S.over),asked,e,risen:!!S.srv.risen}});
  /* another road may end the life first (illness, a schemer, ban gả): only a release BEFORE BAL.srvAge.out is the bug */
  ok(L.asked===0&&!(/Xuất cung/.test(L.e)&&L.age<K.out),'no release before BAL.srvAge.out, the age dialog never re-fires',L);
  await ctx.close()}
 await b.close();for(const r of T)console.log(r.join(' | '));if(errs.length)console.log('page errors',errs);const f=T.filter(r=>r[0]==='FAIL').length;console.log(f?`FAIL ${f}/${T.length}`:`PASS ${T.length}/${T.length}`);process.exit(f||errs.length?1:0)})();
