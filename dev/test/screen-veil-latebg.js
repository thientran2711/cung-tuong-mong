/* screen-veil-latebg (LRM6, RV-177 §2 FAIL-1; owner OD 24/11 ~10:20Z «a hole for a moment, never a lost picture"; KIT §97.3 late guard).
   The late guard lifts an undecoded CSS background until it is decoded. Before (b6d3c9d6) it wrote el.style background-image none !important and then
   removeProperty → an element whose picture is an INLINE background (kit room backdrop .kbg and every other inline-bg element) lost it for good.
   Here, on Fold 755x1000 + iPad 1180x820, five elements go through scrvLateBg with a picture the server holds back (1.2 s):
     inline url · inline gradient + url · inline url with a size/position shorthand · class (stylesheet) url · a .kbg room backdrop built the kit way.
   Each must: be lifted while its picture loads (computed none), and END with its OWN background (inline value unchanged, computed has the url),
   class .kscrv-nobg gone. usage: node dev/test/screen-veil-latebg.js [root=repo root]   exit 0 = PASS */
const {chromium}=require('playwright');const path=require('path'),zlib=require('zlib');const D=require('./lib/device');
const ROOT=path.resolve(process.argv[2]||path.join(__dirname,'../..'));
function png(){const W=8,H=8,raw=Buffer.alloc((W*3+1)*H);for(let y=0;y<H;y++){raw[y*(W*3+1)]=0;for(let x=0;x<W;x++){const o=y*(W*3+1)+1+x*3;raw[o]=180;raw[o+1]=120;raw[o+2]=60}}
 const crcT=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;crcT[n]=c>>>0}const crc=b=>{let c=0xffffffff;for(const x of b)c=crcT[(c^x)&255]^(c>>>8);return(c^0xffffffff)>>>0};
 const ch=(t,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
 const ih=Buffer.alloc(13);ih.writeUInt32BE(W,0);ih.writeUInt32BE(H,4);ih[8]=8;ih[9]=2;return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),ch('IHDR',ih),ch('IDAT',zlib.deflateSync(raw)),ch('IEND',Buffer.alloc(0))])}
const PNG=png();
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();let fails=0;const rows=[];
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1});
  await ctx.route('**/_latebg/**',async r=>{await new Promise(z=>setTimeout(z,1200));r.fulfill({status:200,contentType:'image/png',body:PNG,headers:{'cache-control':'no-store'}})});
  const pg=await ctx.newPage();pg.on('pageerror',e=>console.log('PERR',e.message));const g=await D.openHost(pg,srv.url);
  await g.waitForFunction(()=>typeof scrvLateBg==='function'&&document.body,null,{timeout:120000});
  const res=await g.evaluate(async()=>{const T=Date.now();const u=k=>location.origin+'/img/_latebg/'+k+'-'+T+'.png';
   const st=document.createElement('style');st.textContent=`.ltbg-cls{background-image:url("${u('cls')}")}`;document.head.appendChild(st);
   const mk=(k,css,cls)=>{const e=document.createElement('div');e.dataset.k=k;e.style.cssText='position:fixed;left:0;top:0;width:60px;height:60px;z-index:-1;'+css;if(cls)e.className=cls;document.body.appendChild(e);return e};
   const E=[mk('inline url',`background-image:url("${u('a')}")`),mk('inline gradient+url',`background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2)),url("${u('b')}")`),
    mk('inline shorthand',`background:url("${u('c')}") center/cover no-repeat`),mk('class url','', 'ltbg-cls'),mk('.kbg room backdrop',`background-image:url("${u('d')}")`,'kbg')];
   const before=E.map(e=>e.getAttribute('style'));E.forEach(e=>scrvLateBg(e));await new Promise(r=>requestAnimationFrame(()=>r()));
   const during=E.map(e=>({lifted:getComputedStyle(e).backgroundImage==='none',cls:e.classList.contains('kscrv-nobg')}));
   await new Promise(r=>setTimeout(r,3500));
   const out=E.map((e,i)=>({k:e.dataset.k,lifted:during[i].lifted,clsDuring:during[i].cls,sameInline:e.getAttribute('style')===before[i],url:/url\(/.test(getComputedStyle(e).backgroundImage),clsAfter:e.classList.contains('kscrv-nobg')}));
   E.forEach(e=>e.remove());
   /* same family (law 11), the <img> side: scrvLateImg hid with style.visibility and revealed with style.visibility="" (erasing the picture's own inline visibility) */
   const mi=(k,css)=>{const im=document.createElement('img');im.dataset.k=k;im.style.cssText='position:fixed;left:0;top:0;width:40px;height:40px;z-index:-1;'+css;im.src=u('i'+k.length);document.body.appendChild(im);return im};
   const I=[mi('img own inline visibility hidden','visibility:hidden'),mi('img plain',''),mi('img layout rewrites cssText while loading','')];const ib=I.map(e=>e.getAttribute('style'));
   I.forEach(e=>scrvLateImg(e));await new Promise(r=>requestAnimationFrame(()=>r()));
   I[2].style.cssText='position:fixed;left:0;top:0;width:40px;height:40px;z-index:-1;visibility:visible';const ib2=I[2].getAttribute('style');await new Promise(r=>requestAnimationFrame(()=>r()));
   const idur=I.map(e=>getComputedStyle(e).visibility==='hidden');await new Promise(r=>setTimeout(r,3500));
   I.forEach((e,i)=>{const want=i===2?ib2:ib[i];const own=i===0?'hidden':'visible';out.push({k:e.dataset.k,lifted:idur[i],clsDuring:true,sameInline:e.getAttribute('style')===want,url:e.complete&&e.naturalWidth>0&&getComputedStyle(e).visibility===own,clsAfter:e.classList.contains('kscrv-hide')})});
   I.forEach(e=>e.remove());return out});
  res.forEach(r=>{const ok=r.lifted&&r.sameInline&&r.url&&!r.clsAfter;if(!ok)fails++;rows.push({dev,...r,ok})});await ctx.close()}
 await b.close();srv.close();
 console.log('| device | element | lifted while loading | inline style unchanged | own state after (bg url / img own visibility) | class left | verdict |');
 rows.forEach(r=>console.log(`| ${r.dev} | ${r.k} | ${r.lifted} | ${r.sameInline} | ${r.url} | ${r.clsAfter} | ${r.ok?'ok':'FAIL'} |`));
 console.log('SCREEN-VEIL LATEBG '+(fails?'FAIL':'PASS')+' · '+(rows.length-fails)+'/'+rows.length);process.exit(fails?1:0)})();
