/* kit-dhcapfit (K-DH-CAPFIT, review/kit-dhcapfit, KIT §82.2) — node dev/test/kit-dhcapfit.js [index.html] [outdir]
   The title plate (kitTitlePlate .kdh) never cuts its name: when its box is narrower than the one-line name it wraps to two balanced lines (whole group:
   the kitDhCap caption on the event picture of every title dialog, the stage name tags, the frame tags .kt3, the kit rows). Checks on Fold 755x1000 + iPad 1180x820:
   (a) the title dialog (dhNotice) with the 6 longest names (TITLES2 «Đón thuyền đồng hương», «Phượng hoàng niết bàn», «Hiền lương thục đức», «Khuynh quốc khuynh thành»,
       «Quốc sắc thiên hương», «Nhẫn nhục phụ trọng») + the longest live name: caption plate inside the picture, name not cut (b.scrollWidth ≤ plate width, plate inside picture), ≤ 2 lines;
   (b) a short name stays ONE line (the rule changes nothing where the name fits);
   (c) a plate forced into a box 60 px wide never overflows it (fit rule holds for every container).
   Shots: <outdir>/dhcap-<dev>-<n>.png full screen. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';if(OUT)fs.mkdirSync(OUT,{recursive:true});
const NAMES=['Đón thuyền đồng hương','Phượng hoàng niết bàn','Hiền lương thục đức','Khuynh quốc khuynh thành','Quốc sắc thiên hương','Nhẫn nhục phụ trọng'];
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof kitPanel==='function'&&typeof kitDhCap==='function'&&typeof start==='function');await sleep(2000);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__forceOrigin='tt';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});
  await sleep(2000);
  const longest=await p.evaluate(()=>{let best='';for(const t of (window.KIT_TITLES||[]))if(t&&t.name&&t.name.length>best.length)best=t.name;return best});
  const list=[...NAMES,longest,'Hiền đức'];
  for(let i=0;i<list.length;i++){const nm=list[i];
   await p.evaluate(nm=>{try{kmReset()}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const r=document.getElementById('kmrew');if(r)r.remove();
    /* the real title dialog of jdh dhNotice / jdh3 rpNotice: kit reward panel, plate .kt3 in the info column, kitDhCap moves it onto the picture */
    const o={id:'zz-cap',name:nm,tier:8};kitPanel({kind:'reward',title:'Danh hiệu mới',sub:'tháng này',dh:1,sections:[{h:'',html:`<div class="kt3">${kitTitlePlate(o)}</div>`},{h:'',rows:[['Cách có','thử'],['Khi đeo','chỉ để làm đẹp'],['Xem lại','Nhiệm vụ › Danh hiệu']]}],
     opts:[{n:'Đeo ngay',fx:{},x:'tấm danh hiệu trên đầu',go:()=>{}},{n:'Để sau',fx:{},x:'',go:()=>{}}]});showModal()},nm);
   await sleep(1400);
   const r=await p.evaluate(()=>{const c=document.querySelector('#modal:not([hidden]) .kdhcap');if(!c)return {none:1};const pic=c.parentElement.getBoundingClientRect(),k=c.querySelector('.kdh'),bb=k.querySelector('b');
    const kr=k.getBoundingClientRect(),br=bb.getBoundingClientRect(),lh=parseFloat(getComputedStyle(bb).lineHeight)||16;
    return {pw:Math.round(pic.width),kw:Math.round(kr.width),inside:kr.left>=pic.left-1&&kr.right<=pic.right+1,cut:bb.scrollWidth>bb.clientWidth+1||br.left<kr.left-1||br.right>kr.right+1,lines:Math.round(br.height/lh),txt:bb.textContent}});
   if(r.none){ok(false,`${tag} «${nm}» caption plate on the picture`);continue}
   const short=nm==='Hiền đức';
   ok(r.inside&&!r.cut&&r.lines<=(short?1:2),`${tag} «${nm}» ${short?'one line':'fits'} (picture ${r.pw}px, plate ${r.kw}px, ${r.lines} line(s))`);
   if(OUT&&!short&&(i<4||i===list.length-2))await p.screenshot({path:`${OUT}/dhcap-${tag}-${i}.png`})}
  const c=await p.evaluate(()=>{const x=document.createElement('div');x.style.cssText='position:absolute;left:10px;top:10px;width:60px';x.innerHTML=kitTitlePlate({id:'zz',name:'Khuynh quốc khuynh thành',tier:5},{id:false});document.body.appendChild(x);
   const k=x.querySelector('.kdh'),bb=k.querySelector('b'),kr=k.getBoundingClientRect(),br=bb.getBoundingClientRect(),r={kw:kr.width,bo:br.left<kr.left-1||br.right>kr.right+1};x.remove();return r});
  ok(c.kw<=61&&!c.bo,`${tag} plate in a 60 px box stays inside it`,c);
  /* (d) whole group live: the longest title worn by her and every rival → every visible plate (stage tags, Danh hiệu panel) keeps its name inside the plate and
     the plate inside the screen; (e) the sibling caption on the event picture (.ksart-tag, quest tags) wraps instead of leaving a narrow picture. */
  const scan=()=>p.evaluate(()=>{let n=0,bad=[];for(const k of document.querySelectorAll('.kdh')){if(!k.getClientRects().length)continue;const kr=k.getBoundingClientRect();if(kr.width<1)continue;n++;
    const br=k.querySelector('b').getBoundingClientRect();if(br.left<kr.left-1||br.right>kr.right+1||kr.left<-1||kr.right>innerWidth+1)bad.push(k.textContent)}return {n,bad:bad.slice(0,3)}});
  await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const T={id:'zz-long',name:'Khuynh quốc khuynh thành',tier:8};S.titleWorn=T;(window.rivals||[]).forEach(v=>{if(v)v.titleWorn=T});render()});
  await sleep(1500);const s1=await scan();ok(s1.bad.length===0,`${tag} stage: ${s1.n} plate(s), name inside every plate`,s1.bad);if(OUT)await p.screenshot({path:`${OUT}/dhcap-${tag}-stage.png`});
  await p.evaluate(()=>{S.dh=S.dh||{};dhPanel()});await sleep(1200);const s2=await scan();ok(s2.bad.length===0,`${tag} Danh hiệu panel: ${s2.n} plate(s), name inside every plate`,s2.bad);
  const t=await p.evaluate(()=>{const x=document.createElement('div');x.className='ksart';x.style.cssText='position:absolute;left:10px;top:10px;width:90px;height:120px';x.innerHTML='<div class="ksart-tags"><i class="ksart-tag">Giao thiệp nơi cung cấm</i></div>';document.body.appendChild(x);
   const g=x.querySelector('.ksart-tag').getBoundingClientRect(),r=x.getBoundingClientRect();x.remove();return {gw:Math.round(g.width),in:g.right<=r.right+1}});
  ok(t.in,`${tag} picture tag (.ksart-tag) in a 90 px picture stays inside it`,t);
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,2));await ctx.close()}
 const n=res.filter(x=>!x).length;console.log(`KIT-DHCAPFIT ${n?'FAIL':'PASS'} · ${res.length-n}/${res.length}`);await b.close();process.exit(n?1:0)})();
