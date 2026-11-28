/* ending-screens (review/ending-screens, KIT §91 kitEndScreen; owner marks #48 #50 #51): EVERY ending opens THE full-screen ending screen, its buttons work, old saves.
   Host mode, Fold 755x1000 + iPad 1180x820 (default). Per ending type:
     death (die) · exile (Phế làm thứ dân) · leave (Xuất cung) · throne (Hoàng thái hậu) · grand (Đại kết cục, stay ending; Tạ ơn) · grand-exit (Đại kết cục that closes the life)
     · fail (Kết cục of the Hồi kết nhánh; Tiếp tục) · fate (Bảng Thiên mệnh; Đóng) · rare (a rare ending's result card, real r97Take) · rare-exit (Nữ vương Cao Ly leaves the palace)
   Checks: #modal has kes + kes-<tone> + kes-t-<type>; the background layer covers the whole screen (top bar / bottom bar hidden: the point on the HUD hits #modal);
   the frame is inside the screen at the kit XL width (--kszw, no ending-only size) and every ending of one device shows the same kit figure slot; overlay pieces (served as stand-in pictures by route, the real art comes from Foreman C) sit on the frame:
   flower centred on the top edge, drapes on the left / right edges; without the art: no piece, no error. The button acts (new life / closes) and the next dialog is NOT an ending screen.
   Old save: a save written WITHOUT S.kesT and with a pending Hồi kết nhánh result (pid geR) reloads into the full-screen Đại kết cục. No page errors, no horizontal overflow.
   usage: node dev/test/ending-screens.js [outdir|-] [url] [WxH@dpr,…] [--noart]       (shots go OUTSIDE the repo) */
const path=require('path');const fs=require('fs');const {chromium}=(require('./lib/bigpage'),require('playwright'));
const A=process.argv.slice(2).filter(x=>!x.startsWith('--'));const NOART=process.argv.includes('--noart');
const FIGS=[];const OUT=A[0]&&A[0]!=='-'?A[0]:null;const URL=A[1]&&A[1]!=='-'?A[1]:'file://'+path.resolve(__dirname,'../index.html');
const SIZES=(A[2]||'755x1000@1,1180x820@1').split(',').map(s=>{const m=s.match(/(\d+)x(\d+)@(\d+)/);return {w:+m[1],h:+m[2],d:+m[3]}});
if(OUT)fs.mkdirSync(OUT,{recursive:true});
const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,x===undefined?'':JSON.stringify(x).slice(0,500))};
/* stand-in overlay pictures (test only, never shipped): a transparent 1-colour flower / drape so the geometry can be measured */
const PNG=(w,h,col)=>{const zlib=require('zlib');const raw=Buffer.alloc((w*4+1)*h);for(let y=0;y<h;y++){raw[y*(w*4+1)]=0;for(let x=0;x<w;x++){const o=y*(w*4+1)+1+x*4;const inside=(x-w/2)**2/(w/2)**2+(y-h/2)**2/(h/2)**2<=1;raw[o]=col[0];raw[o+1]=col[1];raw[o+2]=col[2];raw[o+3]=inside?230:0}}
 const crc=b=>{let c,t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}let r=0xffffffff;for(const x of b)r=t[(r^x)&255]^(r>>>8);return (r^0xffffffff)>>>0};
 const ch=(ty,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(ty),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
 const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=6;return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),ch('IHDR',ih),ch('IDAT',zlib.deflateSync(raw)),ch('IEND',Buffer.alloc(0))])};
const ART={'death-flower':PNG(200,150,[250,250,248]),'death-drape-l':PNG(60,400,[245,245,240]),'death-drape-r':PNG(60,400,[245,245,240]),
 'fest-flower':PNG(200,150,[200,30,40]),'fest-drape-l':PNG(60,400,[190,25,35]),'fest-drape-r':PNG(60,400,[190,25,35])};
const CASES=[
 {k:'death',type:'death',tone:'mourn',go:`die('Bệnh nặng')`,btn:'Chuyển kiếp',after:'newlife'},
 {k:'exile',type:'exile',tone:'mourn',go:`over('Phế làm thứ dân','Chiếu phế ngươi làm thứ dân, cho ra khỏi cung.','Phế làm thứ dân',true)`,btn:'Chuyển kiếp',after:'newlife'},
 {k:'leave',type:'leave',tone:'fest',go:`over('Xuất cung','Ngươi rời cung theo lệ.','Xuất cung',true)`,btn:'Chuyển kiếp',after:'newlife'},
 {k:'throne',type:'throne',tone:'fest',go:`over('Hoàng thái hậu','Con ngươi lên ngôi.','Lên ngôi Thái hậu',true)`,btn:'Chuyển kiếp',after:'newlife'},
 {k:'grand',type:'grand',tone:'fest',go:`(()=>{BAL.ge.after='stay';const s=geS();s.st=['o','o','o','o'];s.r1=0;const r0=window.roll;window.roll=()=>true;try{geResolve(0,true)}finally{window.roll=r0}showModal()})()`,btn:'Tạ ơn',after:'closed'},
 {k:'grand-exit',type:'grand',tone:'fest',go:`(()=>{BAL.ge.after='close';const s=geS();s.st=['o','o','o','o'];s.r1=0;geResolve(0,true);showModal();chooseM(0)})()`,btn:'Chuyển kiếp',after:'newlife',title:'@kend'},/* co-ngu-titles: the life end card's title = its poetic name (jend endName; for an Đại kết cục exit = the catalogue title) */
 {k:'fail',type:'fail',tone:'mourn',go:`(()=>{S.ge=null;const s=geS();s.st[0]='f';geAnswer(1,1,false);showModal()})()`,btn:'Tiếp tục',after:'closed'},
 {k:'fate',type:'fate',tone:'fest',go:`(()=>{showModal();geBoardPanel()})()`,btn:null,after:'closed'},
 {k:'rare',type:'rare',tone:'fest',go:`(()=>{const id='nc_vuong',a=ARC67[id];const bid=(a.p[3]||[])[0];S.st.M={a:id,cur:bid,hist:[],used:[],i:3,r97:{ok:1,c:1},chap:1,sc:0,seq:[],act:{},kind:'m'};r97Take('m',bid);
   const i=Q.findIndex(m=>m&&m.kit&&m.kit.kind==='result');if(i>0){const m=Q.splice(i,1)[0];Q.unshift(m)}showModal()})()`,btn:null,after:'closed'},
 {k:'rare-exit',type:'rare',tone:'fest',go:`(()=>{pushDil(mkP('j97x',{a:'nc_vuong'}),'Cơ duyên hiếm');showModal();chooseM(0)})()`,btn:'Chuyển kiếp',after:'newlife'}];
(async()=>{const b=await chromium.launch();
 for(const z of SIZES){const tag=`${z.w}x${z.h}`;
  for(const C of CASES.concat([{k:'oldsave'}])){
   const ctx=await b.newContext({viewport:{width:z.w,height:z.h},deviceScaleFactor:z.d,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
   if(!NOART)await p.route(/img\/kit\/(death|fest)-(flower|drape-l|drape-r)\.webp/,r=>{const f=r.request().url().match(/(death|fest)-(flower|drape-l|drape-r)/)[0];r.fulfill({body:ART[f],contentType:'image/png'})});
   const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
   const boot=async()=>{await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function'&&typeof kitEndType==='function',null,{timeout:0});await p.waitForTimeout(2500)};
   const life=async(origin)=>p.evaluate(async(o)=>{localStorage.removeItem('ctm-ge');quiet=true;if(o)window.__forceOrigin=o;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;quiet=false;
    await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st)||++n>150)r();else setTimeout(t,100)};t()});await new Promise(r=>setTimeout(r,2000));try{kmReset()}catch(e){}Q.length=0;showModal()},origin);
   await boot();
   const N=`${tag} ${C.k}`;
   if(C.k==='oldsave'){/* a save of the LIVE build (OLD=<old index.html>, e.g. git show origin/main:index.html; else this build with S.kesT removed) with a pending
      Hồi kết nhánh result (pid geR) must reload into the full-screen Đại kết cục */
    const OLDU=process.env.OLD?'file://'+path.resolve(process.env.OLD):null;if(OLDU){await p.goto(OLDU,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function',null,{timeout:0});await p.waitForTimeout(2500)}
    await life('tt');await p.evaluate(()=>{BAL.ge.after='stay';const s=geS();s.st=['o','o','o','o'];s.r1=0;const r0=window.roll;window.roll=()=>true;try{geResolve(0,true)}finally{window.roll=r0}delete S.kesT;Q=Q.filter(m=>m.pid==='geR');localStorage.setItem(SK(3),JSON.stringify(ser()))});
    await boot();await p.evaluate(()=>{const d=loadSlot(3);SLOT=3;document.getElementById('title').hidden=true;deser(d);['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();try{kmReset()}catch(e){}showModal()});
    await p.waitForTimeout(1500);
    const r=await p.evaluate(()=>({cls:document.getElementById('modal').className,hid:document.getElementById('modal').hidden,q0:Q[0]&&(Q[0].pid||Q[0].t),dead:S&&S.dead}));
    chk(`${N}: the reloaded Đại kết cục (${OLDU?'live-build save':'save without S.kesT'}) is the full-screen ending`,/\bkes-t-grand\b/.test(r.cls)&&!r.hid,r);
    if(OUT)await p.screenshot({path:path.join(OUT,`${tag}-oldsave.png`)});
    chk(`${N}: no page errors`,!errs.length,errs.slice(0,4));await ctx.close();continue}
   await life(C.k.startsWith('grand')||C.k==='fail'||C.k==='fate'?'tt':(C.k.startsWith('rare')?'nc':null));
   await p.evaluate(g=>{try{(0,eval)(g)}catch(e){console.error(e);window.__kesErr=String(e)}},C.go);
   await p.waitForTimeout(1400);await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(2200);await p.evaluate(()=>{try{kmReset()}catch(e){}});await p.waitForTimeout(300);
   const R=await p.evaluate(()=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg'),bg=M.querySelector(':scope>.kes-bg'),ov=d&&d.querySelector('.kes-ov');const r=x=>{if(!x)return null;const b=x.getBoundingClientRect();return {l:b.left,t:b.top,r:b.right,b:b.bottom,w:b.width,h:b.height}};
     const hud=document.querySelector('header.hud,#hud');const hb=hud&&hud.getBoundingClientRect();const hit=hb?document.elementFromPoint(Math.max(2,hb.left+8),Math.max(2,hb.top+8)):null;
     const fg=d&&d.querySelector('.kszfig');/* the kit figure SLOT (the column); the picture inside also gives room to the kit name plate (1 or 2 lines) */const kw=d?parseFloat(getComputedStyle(d).getPropertyValue('--kszw'))||0:0;
     const hd=d&&d.querySelector(':scope>.kph,:scope>#mt'),ft=d&&d.querySelector(':scope>#mr');
     return {hd:hd?Math.round(hd.getBoundingClientRect().height):0,ft:ft&&ft.offsetParent?Math.round(ft.getBoundingClientRect().height):0,ksz:d&&d.dataset.ksz||'',live:!!(d&&d.classList.contains('kszlive')),kw,fig:r(fg),cls:M.className,hid:M.hidden,err:window.__kesErr||'',d:r(d),bg:r(bg),fl:r(ov&&ov.querySelector('.kes-fl')),dl:r(ov&&ov.querySelector('.kes-drl')),dr:r(ov&&ov.querySelector('.kes-drr')),miss:!!(ov&&ov.classList.contains('kes-miss')),
      hudHidden:!hit||!!hit.closest('#modal'),title:(document.getElementById('mt')||{}).textContent||(M.querySelector('.kptitle')||{}).textContent||'',ov:document.documentElement.scrollWidth>innerWidth+1,vw:innerWidth,vh:innerHeight,
      btns:[...M.querySelectorAll('button')].filter(x=>x.offsetParent!==null).map(x=>x.textContent.trim().slice(0,30))}});
   chk(`${N}: opened without error`,!R.err&&!R.hid,R.err);
   chk(`${N}: the entrance ran once for this ending (KIT_END.log)`,await p.evaluate(t=>KIT_END.log.includes(t),C.type));
   chk(`${N}: full-screen ending screen kes-t-${C.type} (${C.tone})`,new RegExp(`\\bkes\\b.*\\bkes-${C.tone}\\b.*\\bkes-t-${C.type}\\b`).test(R.cls),R.cls);
   chk(`${N}: background covers the whole screen`,R.bg&&R.bg.l<=0&&R.bg.t<=0&&R.bg.r>=R.vw-1&&R.bg.b>=R.vh-1,R.bg);
   chk(`${N}: top bar hidden under the ending screen`,R.hudHidden);
   chk(`${N}: frame inside the screen`,R.d&&R.d.l>=0&&R.d.r<=R.vw&&R.d.t>=0&&R.d.b<=R.vh+1,R.d);
   /* ending-screens-land (KIT §91.4b canon overwrite): the frame is the KIT dialog frame at its own size — no ending-only width/height — so the left figure is the kit XL figure slot */
   if(R.live)chk(`${N}: kit frame ${R.ksz} at the kit width --kszw (${R.kw}px), no ending-only size`,R.ksz==='XL'&&Math.abs(R.d.w-Math.min(R.kw,R.vw-16))<=2,{ksz:R.ksz,kw:R.kw,d:R.d});
   FIGS.push([N,R.ksz,R.live,R.fig&&Math.round(R.fig.w)+'x'+Math.round(R.fig.h),R.fig&&Math.round(R.fig.t-R.d.t),R.fig&&Math.round(R.fig.l-R.d.l),Math.round(R.d.w)+'x'+Math.round(R.d.h),R.hd,R.ft]);
   if(!NOART){const cx=R.d.l+R.d.w/2;
    chk(`${N}: flower centred on the frame's top edge`,R.fl&&Math.abs(R.fl.l+R.fl.w/2-cx)<3&&R.fl.t<R.d.t&&R.fl.b>R.d.t&&R.fl.t>=-1,{fl:R.fl,d:R.d});
    chk(`${N}: drapes hang on the left / right edges`,R.dl&&R.dr&&R.dl.l<R.d.l&&R.dl.r>R.d.l&&R.dr.r>R.d.r&&R.dr.l<R.d.r&&R.dl.h>R.d.h*.6,{dl:R.dl,dr:R.dr,d:R.d});}
   else chk(`${N}: no art → no overlay piece, kes-miss`,R.miss&&!R.fl&&!R.dl,R);
   if(C.title){const T=C.title==='@kend'?await p.evaluate(()=>S.kend||''):C.title;chk(`${N}: title «${T}»`,!!T&&R.title.includes(T)&&!/Kiếp này/.test(R.title),R.title)}
   chk(`${N}: no horizontal overflow`,!R.ov);
   if(OUT){await p.waitForTimeout(900);await p.screenshot({path:path.join(OUT,`${tag}-${C.k}.png`)})}
   /* the button */
   const want=C.btn;const clicked=await p.evaluate(w=>{const M=document.getElementById('modal');const bs=[...M.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);
     const b=w?bs.find(x=>x.textContent.trim().startsWith(w)||x.getAttribute('aria-label')===w):(bs.find(x=>/^(Đã hiểu|Đóng)$/.test(x.textContent.trim())||/Đóng|Lui/.test(x.getAttribute('aria-label')||''))||bs.find(x=>x.classList.contains('kit-x')));
     if(!b)return'';b.click();return b.textContent.trim()||b.getAttribute('aria-label')||'x'},want);
   chk(`${N}: button «${want||'close'}» found`,!!clicked,R.btns);
   await p.waitForTimeout(2500);
   const S2=await p.evaluate(()=>{const M=document.getElementById('modal');return {cls:M.className,hid:M.hidden,dead:!!(S&&S.dead),bg:!!M.querySelector(':scope>.kes-bg'),q0:Q[0]&&(Q[0].t||Q[0].pid)}});
   if(C.after==='newlife')chk(`${N}: «${want}» starts the next life (no ending screen after)`,!S2.dead&&!/\bkes\b/.test(S2.cls)&&!S2.bg,S2);
   else chk(`${N}: «${want||'close'}» closes; the next dialog is not an ending screen`,S2.hid||(!/\bkes\b/.test(S2.cls)&&!S2.bg),S2);
   chk(`${N}: no page errors`,!errs.length,errs.slice(0,4));
   await ctx.close()}}
 /* law 11 family: every ending of one device in the same kit frame size (and the same kit header / footer-button height, which the KIT size system takes from the figure column for every dialog — KIT_REQUESTS ending-screens-land) = the same left figure slot (size + place in the frame) */
 const G={};FIGS.filter(f=>f[2]&&f[3]).forEach(f=>{const k=f[0].split(' ')[0]+' '+f[1]+' (KIT 56.21: one slot per frame size, whatever the header / footer)';(G[k]=G[k]||[]).push(f)});
 for(const k in G){const L=G[k],r=L[0];chk(`${k}: every ending shows the same kit figure slot (${L.length} endings, ${r[3]} @${r[4]},${r[5]})`,L.every(f=>f[3]===r[3]&&Math.abs(f[4]-r[4])<=2&&Math.abs(f[5]-r[5])<=2),L)}
 console.log('figure table [case, ksz, kit live frame, figure slot (.kszfig), fig top in frame, fig left in frame, frame, header h, footer h]');FIGS.forEach(f=>console.log(JSON.stringify(f)));
 await b.close();const nb=ok.filter(x=>!x[1]).length;console.log(`ending-screens: ${ok.length-nb}/${ok.length} pass${NOART?' (no art)':''}`);process.exit(nb?1:0)})();
