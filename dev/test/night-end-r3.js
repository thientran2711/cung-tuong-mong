/* review/night-end (KIT §62, r3): lonely night + dawn beats in the week panel, the night card after her bedding night; overflow + errors.
   usage: node dev/test/night-end.js <url> <outdir> 755x1000,1000x755,1180x820,1366x1024,844x390 */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,VPS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const SHOT=async(p,o)=>{for(let i=0;i<3;i++){try{await p.screenshot(Object.assign({timeout:150000},o));return}catch(e){console.error('shot retry',o.path)}}};
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
 document.querySelectorAll('[id^=kroul],.kroul,#dawn,#kload').forEach(e=>e.remove());document.querySelectorAll('.kmov').forEach(e=>e.remove());render();return S.name};
(async()=>{const b=await chromium.launch(Object.assign({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']},process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{}));
 const vps=(VPS||'755x1000').split(',');const R={};
 for(const v of vps){const [W,H]=v.split('x').map(Number);const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,ignoreHTTPSErrors:true,serviceWorkers:'block'});const p=await c.newPage();
  /* the CDN tunnel is slow/flaky in this sandbox: serve pictures we have on disk (img/…) locally, the rest goes to the network */
  await p.route(/ctm-img\.victoria-tntt\.workers\.dev\/img\//,async r=>{const u=new URL(r.request().url());const f=decodeURIComponent(u.pathname.slice(1));
   if(fs.existsSync(f)){const ext=f.split('.').pop();return r.fulfill({path:f,headers:{'access-control-allow-origin':'*','content-type':{webp:'image/webp',webm:'video/webm',mp4:'video/mp4',json:'application/json'}[ext]||'application/octet-stream'}})}return r.continue()});const errs=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;start()})}
  for(let i=0;i<30;i++){await sleep(700);const k=await p.evaluate(()=>{const r=document.querySelector('[id^=kroul],.kroul,.kbd-roulette');if(!r)return 0;const bs=[...r.querySelectorAll('button')];const b=bs.find(x=>/Bỏ qua/.test(x.textContent))||bs.find(x=>/Tiếp|Vào|Nhập/.test(x.textContent))||bs[0];if(b)b.click();else r.click();return 1});if(!k)break}
  for(let i=0;i<20;i++){await sleep(400);const k=await p.evaluate(()=>{const o=document.querySelector('.kmov');if(o){o.click();return 1}return (window.KMQ&&KMQ.length)?1:0});if(!k)break}
  await sleep(800);await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('[id^=kroul],.kroul,#dawn,#kload').forEach(e=>e.remove());document.querySelectorAll('.kmov').forEach(e=>e.remove());render()});
  await p.evaluate(()=>{if(typeof kmReset==='function')kmReset();Q.length=0;document.getElementById('modal').hidden=true});
  const R3={};
  for(const tier of ['warm','normal','cold']){
   const r=await p.evaluate(async(tier)=>{const W=t=>new Promise(r=>setTimeout(r,t));document.querySelectorAll('.kmov').forEach(e=>e.remove());if(typeof kmReset==='function')kmReset();
    kitNightEnd({tier,m0:1,m1:tier==='warm'?0:tier==='cold'?2:1,before:rsnap(),items:tier==='warm'?[{k:'huongtram'}]:[],line:'Nến đỏ cháy suốt canh khuya.'});await W(3500);
    const ov=document.querySelector('.kmov.kne-ov');if(!ov)return {none:1};const cs=getComputedStyle(ov);const q=s=>ov.querySelector(s);
    const rc=e=>{if(!e)return null;const r=e.getBoundingClientRect();return [r.left,r.top,r.right,r.bottom].map(Math.round)};
    const take=q('.kne-take');
    return {bg:cs.backgroundColor,op:cs.opacity,pic:rc(q('.kne-pic')),list:rc(q('.kmlist')),take:rc(take),takeVis:!!take&&getComputedStyle(take).display!=='none',img:(q('.kne-img')||{}).src,ld:!!q('.kne-img.ld'),
     sw:document.documentElement.scrollWidth>innerWidth+1,off:[...ov.querySelectorAll('.kne *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>innerWidth+1||r.bottom>innerHeight+1||r.left<-1||r.top<-1)}).map(e=>e.className).slice(0,5),
     cut:[...ov.querySelectorAll('.kne-cap b,.kne-cap small,.kmlist *')].filter(e=>e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible').length,
     grad:[...ov.querySelectorAll('.kne-pic *')].filter(e=>/gradient/.test(getComputedStyle(e).backgroundImage)).length,
     btn:take&&take.textContent,btnCls:take&&take.className}},tier);
   R3[tier]=r;await sleep(300);await SHOT(p,{path:`${OUT}/r3-${tier}-${v}.jpg`,type:'jpeg',quality:60});
  }
  /* B (KIT §81): lonely + dawn beats close ONLY by the kit end button; default timings, no tap */
  const B=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));if(typeof kmReset==='function')kmReset();Q.length=0;document.getElementById('modal').hidden=true;
   const o={};let thenCalled=0;let h=document.getElementById('dawn');if(!h){h=document.createElement('div');h.id='dawn';document.body.appendChild(h)}
   kitNewDay({host:h,night:{k:'lonely',line:'Đêm qua Hoàng thượng không lật thẻ bài nào.'},day:{k:'xuan',src:'img/kit/ne-dawn-xuan.webp',t:'Bình minh mùa xuân',sub:'Tháng 3'},wx:null,then:()=>{thenCalled++}});
   await W(9000);o.afterAuto={then:thenCalled,btn:!!h.querySelector(':scope > .kmend'),cls:h.className};
   const b=h.querySelector(':scope > .kmend');const r=b&&b.getBoundingClientRect();o.btn={txt:b&&b.textContent,cls:b&&b.className,inView:!!r&&r.bottom<=innerHeight&&r.top>=0&&r.left>=0&&r.right<=innerWidth};
   const pic=h.querySelector('.kne-b.on .kne-pic');const pr=pic&&pic.getBoundingClientRect();o.picClearOfBtn=!!(pr&&r&&pr.bottom<=r.top+2);o.hint=!!h.querySelector('.kmhint');
   window.__thenCalled=()=>thenCalled;return o});
  await SHOT(p,{path:`${OUT}/r3-B-end-${v}.jpg`,type:'jpeg',quality:60});
  Object.assign(B,await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const h=document.getElementById('dawn');const o={};h.click();await W(300);o.afterTap=__thenCalled();const b=h.querySelector(':scope > .kmend');b&&b.click();await W(300);o.afterBtn=__thenCalled();return o}));
  R3.B=B;await sleep(200);
  console.log(v,JSON.stringify({R3,errs}));await c.close()}
 await b.close()})();
