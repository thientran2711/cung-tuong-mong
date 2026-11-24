/* fullscreen-scenes (review/ending-screens-2, KIT 81c kitFullPic; owner marks #52 «Học thành tài» + #84 «Sang buổi»): both scenes are THE full-screen picture.
   Fold 755x1000 + iPad 1180x820 (default). Cases:
     learn-art (Cầm lên bậc 3) · learn-vir (Nữ công lên bậc 1) · learn-t (a new lối without a subject level, jky: before = an empty overlay with no button)
     · learn-hook (the real addArt hook) · learn-art-art (the subject painting listed in img/INFO.json: -port on Fold, -land on iPad; stand-in picture by route)
     · newday (Bình minh mùa xuân) · newday-2 (lonely night + festival dawn, 2 beats) · newday-art (-port / -land listed in INFO.json).
   Checks: the picture layer covers the WHOLE screen (0,0,W,H; no frame, no dark band); title / card / caption + the ONE button are inside the screen, ON the picture,
   caption above the button (no overlap); the button closes the scene (newday: then() runs); the room's lean-in seal clone (span.kemo-big) is hidden while the
   scene is open and back after; no horizontal overflow; no page errors.
   usage: node dev/test/fullscreen-scenes.js [outdir|-] [url] [WxH@dpr,…]       (shots go OUTSIDE the repo) */
const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const A=process.argv.slice(2);const OUT=A[0]&&A[0]!=='-'?A[0]:null;const URL=A[1]&&A[1]!=='-'?A[1]:'file://'+path.resolve(__dirname,'../../index.html');
const SIZES=(A[2]||'755x1000@1,1180x820@1').split(',').map(s=>{const m=s.match(/(\d+)x(\d+)@(\d+)/);return {w:+m[1],h:+m[2],d:+m[3]}});
if(OUT)fs.mkdirSync(OUT,{recursive:true});
const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,x===undefined?'':JSON.stringify(x).slice(0,400))};
/* a stand-in picture (test only, never shipped): plain PNG served for the -port / -land names so the orientation pick can be checked */
const PNG=(w,h,col)=>{const zlib=require('zlib');const raw=Buffer.alloc((w*3+1)*h);for(let y=0;y<h;y++){raw[y*(w*3+1)]=0;for(let x=0;x<w;x++){const o=y*(w*3+1)+1+x*3;raw[o]=col[0];raw[o+1]=col[1];raw[o+2]=col[2]}}
 const crc=b=>{let c,t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}let r=0xffffffff;for(const x of b)r=t[(r^x)&255]^(r>>>8);return (r^0xffffffff)>>>0};
 const ch=(ty,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(ty),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
 const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=2;return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),ch('IHDR',ih),ch('IDAT',zlib.deflateSync(raw)),ch('IEND',Buffer.alloc(0))])};
const STUB={port:PNG(60,80,[40,120,90]),land:PNG(80,60,[120,60,140])};
const LEARN=[
 {k:'learn-art',go:`kitLearn({kind:'art',k:'cam',from:2,to:3})`,word:'Cầm lên bậc 3'},
 {k:'learn-vir',go:`kitLearn({kind:'vir',k:'cong',from:0,to:1})`,word:'lên bậc 1'},
 {k:'learn-t',go:`kitLearn({t:'Học được lối «Thêu chữ thọ»'})`,word:'Học được lối'},
 {k:'learn-hook',go:`(()=>{S.arts.thi=1;S.artp.thi=0;addArt('thi',400)})()`,word:'Thi lên bậc'},
 {k:'learn-art-art',go:`(()=>{KIT_INFOM.have=KIT_INFOM.have.concat(['learn-art-ky-port','learn-art-ky-land']);kitLearn({kind:'art',k:'ky',from:1,to:2})})()`,word:'Kỳ lên bậc 2',art:'learn-art-ky'}];
const DAY={k:'xuan',src:'img/kit/ne-dawn-xuan.webp',t:'Bình minh mùa xuân',sub:'Tháng ba · trời quang'};
const NEWDAY=[
 {k:'newday',o:{night:null,day:DAY},beats:1},
 {k:'newday-2',o:{night:{k:'lonely',line:'Đêm qua Hoàng thượng không lật thẻ bài nào.'},day:{k:'fest',src:'img/ev-fest-newyear-b.webp',t:'Sáng Tết Nguyên Đán',sub:'Xuân · trời quang'}},beats:2},
 {k:'newday-art',o:{night:null,day:DAY},beats:1,art:'kit/ne-dawn-xuan',have:['kit/ne-dawn-xuan-port','kit/ne-dawn-xuan-land']},
 /* the SHIPPED form (review GAPART2-r6): the site build makes jne DIR the CDN address (dawnOf + the lonely night use it) -> still the port / land painting */
 {k:'newday-live',o:{sea:'xuan',night:{k:'lonely',line:'Đêm qua Hoàng thượng không lật thẻ bài nào.'},day:Object.assign({},DAY,{src:'https://ctm-img.victoria-tntt.workers.dev/img/kit/ne-dawn-xuan.webp'})},beats:2,art:'kit/ne-dawn-xuan',nart:'kit/ne-night-lonely-xuan',
  have:['kit/ne-dawn-xuan-port','kit/ne-dawn-xuan-land','kit/ne-night-lonely-xuan-port','kit/ne-night-lonely-xuan-land']}];
(async()=>{const b=await chromium.launch();
 for(const z of SIZES){const tag=`${z.w}x${z.h}`;const ori=z.w>z.h?'land':'port';
  const ctx=await b.newContext({viewport:{width:z.w,height:z.h},deviceScaleFactor:z.d,serviceWorkers:'block'});const p=await ctx.newPage();await require('./lib/veil').guard(p);
  await p.route(/img\/(learn-art-ky|kit\/ne-dawn-xuan|kit\/ne-night-lonely-xuan)-(port|land)\.webp/,r=>{const o=r.request().url().match(/-(port|land)\.webp/)[1];r.fulfill({body:STUB[o],contentType:'image/png'})});
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof kitLearn==='function'&&typeof kitNewDay==='function'&&typeof kitFullPicHTML==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(async()=>{quiet=true;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;quiet=false;
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.st)||++n>150)r();else setTimeout(t,100)};t()});await new Promise(r=>setTimeout(r,2000));try{kmReset()}catch(e){}Q.length=0;showModal();
   /* a stand-in lean-in seal clone, as jemoseal makes it (fixed, above every UI) */
   const c=document.createElement('span');c.className='kemo-big kemo-m-nod';c.id='tkemo';c.style.cssText='position:fixed;left:40px;top:120px;width:80px;height:80px;z-index:9990;background:#c33';document.body.appendChild(c)});
  /* jemoseal sweeps big clones whose seal is gone: the stand-in is (re)made right before each look */
  const kemoVis=()=>p.evaluate(()=>{let e=document.getElementById('tkemo');if(!e){e=document.createElement('span');e.className='kemo-big kemo-m-nod';e.id='tkemo';e.style.cssText='position:fixed;left:40px;top:120px;width:80px;height:80px;z-index:9990;background:#c33';document.body.appendChild(e)}return getComputedStyle(e).visibility});
  const noOverflow=()=>p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1);
  const inScreen=(r)=>r&&r.x>=-1&&r.y>=-1&&r.x+r.w<=z.w+1&&r.y+r.h<=z.h+1&&r.w>0&&r.h>0;
  for(const C of LEARN){const N=`${tag} ${C.k}`;
   /* real art is live now (GAPART2 23/11): the fallback cases start from an INFO list without any learn-* painting */
   await p.evaluate(()=>{KIT_INFOM.have=KIT_INFOM.have.filter(k=>!/^learn-/.test(k))});
   await p.evaluate(C.go);await p.waitForSelector('#klearnov',{timeout:8000}).catch(()=>{});await p.waitForTimeout(4200);
   const m=await p.evaluate(()=>{const o=document.getElementById('klearnov');if(!o)return null;const r=s=>{const e=o.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height}};
    const im=o.querySelector('.kfull-img');return {full:o.classList.contains('km-full'),fig:r('.kfull.klearn-fig'),h:r('.klearn-h'),card:r('.klearn-card'),btn:r('.klearn-card .kmtake'),word:(o.querySelector('.klearn-h small')||{}).textContent||'',
     src:im?im.getAttribute('src'):'',art:!!o.querySelector('.kfull.kfull-art'),bk:!!o.querySelector('.kfull-bk'),loaded:im?im.complete&&im.naturalWidth>0:false}});
   chk(`${N} scene opens (km-full)`,m&&m.full,m);
   if(!m)continue;
   chk(`${N} picture covers the whole screen`,m.fig&&Math.abs(m.fig.x)<1&&Math.abs(m.fig.y)<1&&Math.abs(m.fig.w-z.w)<1.5&&Math.abs(m.fig.h-z.h)<1.5,m.fig);
   chk(`${N} title + card + button inside the screen`,inScreen(m.h)&&inScreen(m.card)&&inScreen(m.btn),m);
   chk(`${N} title above card`,m.h&&m.card&&m.h.y+m.h.h<=m.card.y,m);
   chk(`${N} words «${C.word}»`,m.word.includes(C.word),m.word);
   chk(`${N} picture loaded`,m.loaded,m.src);
   if(C.art)chk(`${N} subject painting ${ori} (INFO.json)`,m.src.endsWith(`img/${C.art}-${ori}.webp`)&&m.art&&!m.bk,m);
   else chk(`${N} fallback = the skill painting, blurred fill + whole picture`,!m.art&&m.bk&&/img\/(art-|vir-|act-cat-)/.test(m.src),m);
   chk(`${N} lean-in seal hidden`,await kemoVis()==='hidden');
   chk(`${N} no horizontal overflow`,await noOverflow());
   if(OUT)await p.screenshot({path:`${OUT}/${tag}-${C.k}.jpg`,quality:72});
   await p.evaluate(()=>{const o=document.getElementById('klearnov');const b=o&&o.querySelector('.klearn-card [data-km-close]');if(b)b.click()});await p.waitForTimeout(700);
   chk(`${N} button closes`,await p.evaluate(()=>!document.getElementById('klearnov')));
   chk(`${N} seal back after`,await kemoVis()==='visible');
   await p.evaluate(()=>{KIT_INFOM.have=KIT_INFOM.have.filter(k=>!/^learn-/.test(k))});}
  for(const C of NEWDAY){const N=`${tag} ${C.k}`;
   await p.evaluate(()=>{KIT_INFOM.have=KIT_INFOM.have.filter(k=>!/^kit\/ne-/.test(k))});
   await p.evaluate(C=>{if(C.have)KIT_INFOM.have=KIT_INFOM.have.concat(C.have);let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';w.className='dawn';document.body.appendChild(w)}
    window.__ndDone=0;kitNewDay(Object.assign({host:w,wx:null,then:()=>{w.classList.remove('on');window.__ndDone=1}},C.o))},C);
   await p.waitForTimeout(1600);
   chk(`${N} lean-in seal hidden`,await kemoVis()==='hidden');
   await p.evaluate(()=>document.getElementById('dawn').click());await p.waitForTimeout(1500);
   const m=await p.evaluate(()=>{const o=document.getElementById('dawn');const r=e=>{if(!e)return null;const b=e.getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height}};
    const P=[...o.querySelectorAll('.kne-b')].map(b=>{const pic=b.querySelector('.kne-pic');const im=pic&&pic.querySelector('.kne-img');return {pic:r(pic),full:!!(pic&&pic.classList.contains('kfull')),shade:!!(pic&&pic.querySelector('.kfull-shade')),src:im?im.getAttribute('src'):''}});
    const on=o.querySelector('.kne-b.on');const im=on&&on.querySelector('.kne-img');
    return {host:r(o),bg:getComputedStyle(o).paddingBottom,beats:P,cap:r(on&&on.querySelector('.kne-cap')),btn:r(o.querySelector(':scope>.kmend')),btnTxt:(o.querySelector(':scope>.kmend')||{}).textContent||'',loaded:im?im.complete&&im.naturalWidth>0:false}});
   chk(`${N} ${C.beats} beat(s)`,m.beats.length===C.beats,m.beats.length);
   chk(`${N} every beat picture covers the whole screen`,m.beats.every(B=>B.full&&B.shade&&B.pic&&Math.abs(B.pic.x)<1&&Math.abs(B.pic.y)<1&&Math.abs(B.pic.w-z.w)<1.5&&Math.abs(B.pic.h-z.h)<1.5),m.beats);
   chk(`${N} no dark band (host padding 0)`,m.bg==='0px',m.bg);
   chk(`${N} caption + «Tiếp theo» on the picture, inside the screen`,inScreen(m.cap)&&inScreen(m.btn)&&m.btnTxt==='Tiếp theo',m);
   chk(`${N} caption above the button`,m.cap&&m.btn&&m.cap.y+m.cap.h<=m.btn.y+1,m);
   chk(`${N} picture loaded`,m.loaded);
   if(C.art)chk(`${N} ${ori} painting (INFO.json)`,m.beats[m.beats.length-1].src.endsWith(`img/${C.art}-${ori}.webp`),m.beats);
   else chk(`${N} today's painting until the ${ori} one lands`,m.beats.every(B=>!/-(port|land)\.webp$/.test(B.src)),m.beats);
   if(C.nart)chk(`${N} night beat ${ori} painting (INFO.json)`,m.beats[0].src.endsWith(`img/${C.nart}-${ori}.webp`),m.beats);
   chk(`${N} no horizontal overflow`,await noOverflow());
   if(OUT)await p.screenshot({path:`${OUT}/${tag}-${C.k}.jpg`,quality:72});
   await p.evaluate(()=>{const b=document.querySelector('#dawn>.kmend');if(b)b.click()});await p.waitForTimeout(500);
   chk(`${N} button ends the scene (then)`,await p.evaluate(()=>window.__ndDone===1));
   chk(`${N} seal back after`,await kemoVis()==='visible');
   await p.evaluate(()=>{KIT_INFOM.have=KIT_INFOM.have.filter(k=>!/^kit\/ne-/.test(k))});}
  chk(`${tag} no page errors`,errs.length===0,errs);
  await ctx.close()}
 await b.close();const f=ok.filter(x=>!x[1]).length;console.log(`fullscreen-scenes: ${ok.length-f}/${ok.length} PASS`);process.exit(f?1:0)})();
