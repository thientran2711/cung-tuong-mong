/* story14-host (review/story14-p1-r2): the 14-chapter frame in HOST mode (the built index.html, ?khost=1, rot.js iframe; dev/test/lib/device.js)
   on the owner's two devices (Fold 755x1000, iPad 1180x820) and iPad Pro 1366x1024: a new tt life, Mệnh truyện tab → chip "Chương 1/14 · …",
   HẠN row "còn N tháng, rồi chương tự khép, không thưởng" (r1 item 7: was "không có hạn"), no "/15", chapter detail with "Đời người · 14 chương";
   no page errors, no horizontal overflow. Screenshots (deviceScaleFactor 1) to <shotdir> when given.
   usage: node dev/test/story14-host.js <root url> [shotdir] */
const {chromium}=require('playwright');const D=require('./lib/device');const [,,URL,DIR]=process.argv;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const dev of ['fold','ipadAir','ipadPro']){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const f=await D.openHost(p,URL);f.on&&f.on('pageerror',e=>errs.push(e.message));await p.waitForTimeout(1500);
  await f.evaluate(()=>{try{localStorage.clear()}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();const tt=document.getElementById('title');if(tt)tt.hidden=true;quiet=true;window.__forceOrigin='tt';start();quiet=false;Q.length=0;
   document.querySelectorAll('#kroul,#kroulw,.kroul,.kmov').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;tab='story';render()});
  await p.waitForTimeout(2500);/* the Luân hồi roulette opens 150 ms after start (jk2b): clear it and any full-screen intro layer, then draw the tab */
  await f.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,.kmov').forEach(e=>e.remove());document.querySelectorAll('body > div').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&+s.zIndex>=50&&e.id!=='modal'&&e.offsetWidth>=innerWidth*.9&&e.offsetHeight>=innerHeight*.9)e.remove()});Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;tab='story';render()});
  await p.waitForTimeout(600);
  const a=await f.evaluate(()=>{const pn=document.getElementById('panel');const t=(pn?pn.textContent:'').replace(/\s+/g,' ');return{chip:/Chương 1\/14 · Nhập cung học việc/.test(t),han:/còn 6 tháng, rồi chương tự khép, không thưởng/.test(t),noHan:/không có hạn/.test(t),bad15:/Chương \d+\/(?!14)\d+/.test(t),ovf:document.documentElement.scrollWidth-innerWidth}});
  if(DIR)await p.screenshot({path:`${DIR}/host-tab-${dev}.png`});
  await f.evaluate(()=>{kitGoalDetail()});await p.waitForTimeout(800);
  const d=await f.evaluate(()=>{const m=document.getElementById('modal');const t=(m.textContent||'').replace(/\s+/g,' ');return{open:!m.hidden,rows:/Đời người · 14 chương/.test(t)&&/Phần giữa/.test(t),han:/còn 6 tháng, rồi chương tự khép/.test(t),noHan:/không có hạn/.test(t),ovf:document.documentElement.scrollWidth-innerWidth}});
  if(DIR)await p.screenshot({path:`${DIR}/host-detail-${dev}.png`});
  const ok=!errs.length&&a.chip&&a.han&&!a.noHan&&!a.bad15&&a.ovf<=0&&d.open&&d.rows&&d.han&&!d.noHan&&d.ovf<=0;if(!ok)bad++;
  console.log(dev,ok?'PASS':'FAIL',JSON.stringify({probe:await D.probe(p).then(x=>({host:x.host,s:x.s,inner:x.inner})),a,d,errs}));await ctx.close()}
 await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
