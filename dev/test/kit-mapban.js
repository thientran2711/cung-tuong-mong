/* kit-mapban.js — KIT §103 kitMapBanner (K-MAP-BANNER, PLACE-RULES; owner 25/11 ~23:40Z). Fold 755x1000 + iPad 1180x820, a fresh life under cấm túc on the Dư đồ:
   the banner shows ONE reason line + the «Nhà ta» chip, inside the map view under the map tools, over no map-tool / rail / side-column button;
   a REAL tap on «Nhà ta» brings her home spot into view (it carries the home mark); clear() removes banner + mark; another tab shows no banner.
   usage: node dev/test/kit-mapban.js <index.html>   exit 1 on a FAIL */
const {chromium}=require('playwright');const path=require('path');const F=path.resolve(process.argv[2]||'index.html');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());await p.goto('file://'+F,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitMapBanner,null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{if(typeof kitRoulette==='function'){kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}try{S.tutTour=1}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());render()});
 for(let i=0;i<4;i++){await p.waitForTimeout(600);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());if(Q.length){Q.length=0;document.getElementById('modal').hidden=true;render()}})}
 /* harness: the cấm túc state + the caller's set() (PLACE-RULES wires it in the game) */
 await p.evaluate(()=>{S.confined=2;tab='go';render();let hk='home';try{const p0=S.place;S.place='home';hk=typeof mapHereK==='function'?mapHereK():'home';S.place=p0}catch(e){}kitMapBanner.set({id:'plban',line:`Đang cấm túc, còn ${S.confined} tháng: chỉ ở trong cung mình`,home:hk})});await p.waitForTimeout(1200);
 const g=()=>p.evaluate(()=>{const b=document.querySelector('.kmapban');if(!b)return null;const r=b.getBoundingClientRect(),V=document.querySelector('#panel .mapv').getBoundingClientRect();const ov=(a,c)=>!(a.right<=c.left||c.right<=a.left||a.bottom<=c.top||c.bottom<=a.top);
  const btn=[...document.querySelectorAll('#panel .maptools button,#krail button,#kshR button,#tabs button')].filter(x=>x.getClientRects().length&&ov(r,x.getBoundingClientRect())).map(x=>x.textContent.trim().slice(0,12));
  const hb=b.querySelector('.kmb-home-b');const q=hb.getBoundingClientRect();const e=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2);const h=document.querySelector('.mspot.kmb-home');const hr=h&&h.getBoundingClientRect();
  return {txt:b.querySelector('.kmb-t').textContent,inside:r.left>=V.left-1&&r.right<=V.right+1&&r.top>=V.top-1&&r.bottom<=V.bottom+1,btn,hit:!!(e&&e.closest('.kmb-home-b')),home:!!h,hx:hr&&[hr.top,hr.bottom],hb:[q.left+q.width/2,q.top+q.height/2],cut:b.querySelector('.kmb-t').scrollWidth>b.querySelector('.kmb-t').clientWidth+1}});
 let s=await g();const D=W+'x'+H;ok(!!s,`${D}: banner shown`);if(!s){await ctx.close();continue}
 ok(/cấm túc/.test(s.txt)&&!s.cut,`${D}: one reason line, not cut («${s.txt}»)`);ok(s.inside,`${D}: inside the map view`);ok(!s.btn.length,`${D}: over no button ${JSON.stringify(s.btn)}`);ok(s.hit,`${D}: «Nhà ta» chip is tappable`);ok(s.home,`${D}: her home spot carries the home mark`);
 /* scroll the map away (if it scrolls), then a REAL tap on «Nhà ta» */
 await p.evaluate(()=>{const sc=document.querySelector('#panel .mapv .mapsc');if(sc){sc.scrollTop=sc.scrollHeight;sc.scrollLeft=sc.scrollWidth}});await p.waitForTimeout(300);s=await g();
 if(W<1100)await p.touchscreen.tap(s.hb[0],s.hb[1]);else await p.mouse.click(s.hb[0],s.hb[1]);await p.waitForTimeout(1200);
 const hv=await p.evaluate(()=>{const h=document.querySelector('.mspot.kmb-home');if(!h)return null;const r=h.getBoundingClientRect(),b=document.querySelector('.kmapban').getBoundingClientRect(),t=document.querySelector('#tabs,nav.bar');const tb=t?t.getBoundingClientRect().top:innerHeight;return {inView:r.top>=b.bottom-4&&r.bottom<=tb+2,r:[Math.round(r.top),Math.round(r.bottom)]}});
 ok(hv&&hv.inView,`${D}: a real tap on «Nhà ta» brings her home spot into view ${JSON.stringify(hv)}`);
 await p.evaluate(()=>{tab='act';render()});await p.waitForTimeout(400);ok(!(await p.$('.kmapban')),`${D}: no banner on another tab`);
 await p.evaluate(()=>{tab='go';render()});await p.waitForTimeout(400);ok(!!(await p.$('.kmapban')),`${D}: back on the Dư đồ, banner again`);
 await p.evaluate(()=>kitMapBanner.clear('plban'));await p.waitForTimeout(300);ok(!(await p.$('.kmapban'))&&!(await p.$('.mspot.kmb-home')),`${D}: clear() removes banner + home mark`);
 ok(!errs.length,`${D}: no page error ${JSON.stringify(errs.slice(0,2))}`);await ctx.close()}
await b.close();console.log(bad?`KIT-MAPBAN FAIL (${bad})`:'KIT-MAPBAN PASS');process.exit(bad?1:0)})();
