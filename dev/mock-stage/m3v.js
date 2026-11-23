// M3 toilette room flow as a VIDEO (owner 23/11 17:07Z "làm video cho tôi nha"). Throwaway mockup (never land). usage: node m3v.js [fold|ipad|both]
const {boot,settle,chromium}=require('./boot');const fs=require('fs');const {execSync}=require('child_process');const {mark,cut}=require('./cut');
const OUT='/home/user/wt/mock2-shots';fs.mkdirSync(OUT+'/raw',{recursive:true});
const LIB=fs.readFileSync(__dirname+'/mklib.js','utf8');
const M3=fs.readFileSync(__dirname+'/m3.js','utf8');const ROOMJS=/const ROOMJS=`([\s\S]*?)`;/.exec(M3)[1].replace(/\$\{ROOM\}/g,'https://ctm-img.victoria-tntt.workers.dev/img/toil-room-c1-dapung.webp');
const VJS=`window.MKV={
 tap(el,dx=.5,dy=.5){const r=(typeof el==='string'?document.querySelector(el):el).getBoundingClientRect();const x=r.left+r.width*dx,y=r.top+r.height*dy;
  const t=document.createElement('div');t.style.cssText='position:fixed;z-index:9999;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;border:3px solid #ffd54a;background:rgba(255,213,74,.25);box-shadow:0 0 14px rgba(255,190,40,.9);pointer-events:none;left:'+x+'px;top:'+y+'px';document.body.appendChild(t);
  t.animate([{transform:'scale(.4)',opacity:0},{transform:'scale(1)',opacity:1,offset:.35},{transform:'scale(1.5)',opacity:0}],{duration:650,easing:'ease-out'}).onfinish=()=>t.remove()},
 ty(){const sv=S.wd.y;S.wd.y=null;const f=figFor(S);S.wd.y=sv;return f},
 hub(o){const L=MKX.layer('',{noveil:1});const ipad=innerWidth>1000;MKR.put(L,{fx:0,fy:ipad?.07:0});MKR.glow(L);
  const l1=MKR.lbl(L,'Thay xiêm y',473,ipad?72:30),l2=MKR.lbl(L,'Điểm trang',118,262);
  const fig=o.fig==='ty'?MKV.ty():figFor(S);const [fx,fy]=L.map(o.x||300,o.foot||575);const h=Math.min(L.g.H*.9,fy-8)*(o.sc||.82);
  const F=MKX.fig(L,fig,{x:fx,h,mk:o.mk||null,z:5});F.style.bottom=(L.g.H-fy)+'px';const pl=MKX.plate(L,S,fx,Math.min(L.g.H-44,fy-6));if(o.btn!==false)MKR.btns(L,'Đã chỉnh tề');
  const svg=L.querySelector('svg');svg.animate([{opacity:.75},{opacity:1},{opacity:.75}],{duration:1600,iterations:Infinity});return {L,F,pl,svg,l1,l2}},
 ward(o){const L=MKX.layer('',{noveil:1});const ipad=innerWidth>1000;MKR.put(L,{fx:.42,blur:6});const w=L.g.w,H=L.g.H;const left=Math.round(w*(ipad?.40:.42));
  const F=MKX.fig(L,o.fig==='ty'?MKV.ty():figFor(S),{x:left/2,h:Math.min(H-50,(left-10)*2.0408),z:5});MKX.plate(L,S,left/2,H-44);
  const pan=document.createElement('div');pan.className='dlg mkpan2';pan.style.cssText='position:absolute;z-index:6;left:'+(left+4)+'px;right:8px;top:8px;bottom:8px;display:flex;flex-direction:column;overflow:hidden;max-width:none;max-height:none;margin:0;animation:none';
  pan.innerHTML='<div class="kph"><span class="kptitle">Thay xiêm y</span></div><div class="mkgb" style="flex:1;min-height:0;overflow:auto;padding:8px"></div>';
  if(window.__grid)pan.querySelector('.mkgb').appendChild(window.__grid.cloneNode(true));L.appendChild(pan);
  const bk=document.createElement('button');bk.className='kbtn';bk.textContent='◂ Quay lại';bk.style.cssText='position:absolute;z-index:7;left:10px;top:10px;padding:8px 14px';L.appendChild(bk);return {L,F,pan,bk}},
 items(pan){return [...pan.querySelectorAll('.kitem,.kinv button,.kitm,[data-ix]')].filter(e=>e.getBoundingClientRect().width>20)},
 swap(F,src,mk){const n=document.createElement('div');n.style.cssText='position:absolute;inset:0;opacity:0';let mkh='';if(mk){try{const u=toilMakeupSvg(src.split('/').pop(),mk);if(u)mkh='<img src="'+u+'">'}catch(e){}}
  n.innerHTML='<img src="'+src+'" style="position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;max-height:none">'+mkh.replace('<img ','<img style="position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;max-height:none" ');F.appendChild(n);
  n.animate([{opacity:0},{opacity:1}],{duration:260,fill:'forwards'}).onfinish=()=>{[...F.children].forEach(c=>{if(c!==n)c.remove()})}},
 fadeIn(L,ms){if(L.id==='mk'){[...L.children].slice(2).forEach(c=>c.animate([{opacity:0},{opacity:1}],{duration:ms||300,fill:'both'}));return}L.animate([{opacity:0},{opacity:1}],{duration:ms||300,fill:'both'})},
 makeup(){const L=MKX.layer('',{noveil:1});const ipad=innerWidth>1000;MKR.put(L,{fx:.15,blur:6,zoom:1.5});const w=L.g.w,H=L.g.H;const left=Math.round(w*(ipad?.34:.36));
  const F=MKX.fig(L,figFor(S),{x:left/2,h:Math.min(H-50,(left-10)*2.0408),z:5});MKX.plate(L,S,left/2,H-44);
  if(window.__cv){const c=window.__cv;const im=document.createElement('canvas');im.width=c.w;im.height=c.h;im.getContext('2d').drawImage(c.el,0,0);const r=Math.min((w-left-16)/c.w,(H-16)/c.h);
   im.style.cssText='position:absolute;z-index:6;max-width:none;max-height:none;left:'+(left+(w-left-c.w*r)/2)+'px;top:'+((H-c.h*r)/2)+'px;width:'+(c.w*r)+'px;height:'+(c.h*r)+'px;border:3px solid #c9a227;border-radius:12px;box-shadow:0 6px 22px rgba(0,0,0,.4)';L.appendChild(im)}
  const bk=document.createElement('button');bk.className='kbtn';bk.textContent='◂ Quay lại';bk.style.cssText='position:absolute;z-index:7;left:10px;top:10px;padding:8px 14px';L.appendChild(bk);return {L,F,bk}}
};`;
(async()=>{const which=process.argv[2]||'both';const b=await chromium.launch();
 for(const [W,H,name] of [[755,1000,'fold'],[1180,820,'ipad']]){if(which!=='both'&&which!==name)continue;
  const vdir=`${OUT}/raw/m3-${name}`;fs.rmSync(vdir,{recursive:true,force:true});fs.mkdirSync(vdir,{recursive:true});
  const {ctx,p}=await boot(b,W,H,1,{recordVideo:{dir:vdir,size:{width:W,height:H}}});const T0=Date.now();
  await p.addScriptTag({content:LIB});await p.addScriptTag({content:ROOMJS});await p.addScriptTag({content:VJS});
  await p.evaluate(()=>{try{nightScene=function(){};S.tonight=null}catch(e){};setInterval(()=>{document.querySelectorAll('body > *').forEach(e=>{if(e.id!=='mk'&&e.offsetHeight<360&&/Trong cung vừa qua/.test(e.textContent||'')&&getComputedStyle(e).position==='fixed')e.style.display='none'})},100)});
  // prep (cut away later): grab the real toilette wardrobe grid + a snapshot of the real makeup canvas
  await p.evaluate(()=>toilOpen());await p.waitForTimeout(1500);await p.evaluate(()=>{const g=document.querySelector('#kg82 .kgr-go');if(g)g.click()});await p.waitForTimeout(2000);
  await p.evaluate(()=>{const box=kg82Box();const t=box.querySelector('.toilinv');window.__grid=t?t.cloneNode(true):null});
  await p.evaluate(()=>{try{toilMakeup()}catch(e){}});await p.waitForTimeout(2500);await settle(p);await p.waitForTimeout(2500);
  await p.evaluate(()=>{const ov=document.getElementById('kg82');const cv=ov&&ov.querySelector('canvas');if(cv){const c2=document.createElement('canvas');c2.width=cv.width;c2.height=cv.height;c2.getContext('2d').drawImage(cv,0,0);window.__cv={el:c2,w:cv.width,h:cv.height}}if(ov){ov.style.display='none'}const vo=document.getElementById('ov');if(vo)vo.style.display='none';Q.length=0;const M=document.getElementById('modal');M.hidden=true;document.documentElement.classList.add('mkhide')});
  await settle(p);await p.waitForTimeout(800);
  const nItems=await p.evaluate(()=>window.__grid?window.__grid.querySelectorAll('.kitem,.kinv button,.kitm,[data-ix]').length:-1);console.log('grid items',nItems,'canvas',await p.evaluate(()=>!!window.__cv));
  await mark(p);await p.waitForTimeout(300);const s=(Date.now()-T0)/1000;const W8=ms=>p.waitForTimeout(ms);
  // 0 entry: tap Trang điểm on the act card
  await p.evaluate(()=>{const c=document.querySelector('[data-k3="toil"]');if(c){c.style.outline='3px solid #e0a800';c.style.outlineOffset='3px'}});await W8(900);
  await p.evaluate(()=>{const c=document.querySelector('[data-k3="toil"]');if(c)MKV.tap(c)});await W8(500);
  // 1 zoom into the room
  await p.evaluate(()=>{const c=document.querySelector('[data-k3="toil"]');if(c)c.style.outline='';const si=document.getElementById('scimg');const mm=/url\(["']?([^"')]+)["']?\)/.exec(si.style.backgroundImage||'');const L=MKX.layer(mm?mm[1]:MKX.stageSrc(0),{sharp:1,noveil:1});const bg=L.querySelector('.mkbg');const im=MKR.put(L,{});im.style.opacity=0;
   bg.animate([{transform:'scale(1)'},{transform:'scale(1.35)'}],{duration:750,easing:'ease-in',fill:'forwards'});im.animate([{opacity:0,transform:'scale(1.12)'},{opacity:1,transform:'scale(1)'}],{duration:750,delay:150,easing:'ease-out',fill:'forwards'})});await W8(950);
  // 2 hub: glowing mirror + table, «Đã chỉnh tề», back
  await p.evaluate(()=>{window.__h=MKV.hub({fig:'ty'});MKV.fadeIn(window.__h.F,350);MKV.fadeIn(window.__h.l1,350);MKV.fadeIn(window.__h.l2,350)});await W8(2000);
  await p.evaluate(()=>MKV.tap(window.__h.l1));await W8(450);
  // 3 wardrobe: tap items → figure changes
  await p.evaluate(()=>{window.__w=MKV.ward({fig:'ty'});MKV.fadeIn(window.__w.L,300)});await W8(1100);
  for(const [i,f] of [[1,'y'],[3,'ty'],[2,'y']]){await p.evaluate(({i,f})=>{const it=MKV.items(window.__w.pan);const t=it[i]||it[0];if(!t)return;it.forEach(e=>e.style.outline='');t.style.outline='3px solid #e0a800';t.style.outlineOffset='2px';MKV.tap(t);
    setTimeout(()=>MKV.swap(window.__w.F,f==='ty'?MKV.ty():figFor(S)),200)},{i,f});await W8(1150)}
  await p.evaluate(()=>MKV.tap(window.__w.bk));await W8(400);
  // 4 back to hub (now dressed) → tap Điểm trang → makeup game over the blurred room
  await p.evaluate(()=>{window.__h=MKV.hub({fig:'y'});MKV.fadeIn(window.__h.L,280)});await W8(1100);
  await p.evaluate(()=>MKV.tap(window.__h.l2));await W8(400);
  await p.evaluate(()=>{window.__m=MKV.makeup();MKV.fadeIn(window.__m.L,300)});await W8(2000);
  await p.evaluate(()=>{MKV.swap(window.__m.F,figFor(S),'dep')});await W8(900);await p.evaluate(()=>MKV.tap(window.__m.bk));await W8(400);
  // 5 hub (dressed + made up) → «Đã chỉnh tề» → final look: she walks to the middle, outlines fade
  await p.evaluate(()=>{window.__h=MKV.hub({fig:'y',mk:'dep'});MKV.fadeIn(window.__h.L,280)});await W8(1100);
  await p.evaluate(()=>{const b=window.__h.L.querySelector('.kgr-go');MKV.tap(b)});await W8(350);
  await p.evaluate(()=>{const h0=window.__h;const r0=h0.F.getBoundingClientRect();const L=h0.L;[h0.svg,h0.l1,h0.l2,...L.querySelectorAll('button')].forEach(e=>e.animate([{opacity:1},{opacity:0}],{duration:500,fill:'forwards'}));
   h0.pl.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards'});
   const [fx,fy]=L.map(473,575);const h=Math.min(L.g.H*.9,fy-8)*.98;const w=h/2.0408;const nx=fx-w/2;const dx=nx-(r0.left-L.getBoundingClientRect().left),sc=h/r0.height;
   h0.F.style.transformOrigin='0 100%';h0.F.animate([{transform:'none'},{transform:'translateX('+dx+'px) scale('+sc+')'}],{duration:800,delay:250,easing:'ease-in-out',fill:'forwards'}).onfinish=()=>{const t=MKX.plate(L,S,fx,Math.min(L.g.H-44,fy-6));t.animate([{opacity:0},{opacity:1}],{duration:300})}});await W8(2600);
  // 6 back to the stage (zoom out)
  await p.evaluate(()=>{const L=window.__h.L;L.animate([{transform:'scale(1)',opacity:1},{transform:'scale(.85)',opacity:0}],{duration:650,easing:'ease-in',fill:'forwards'}).onfinish=()=>MKX.clear()});await W8(1300);
  const e=(Date.now()-T0)/1000;
  if(p.errs.length)console.log('errors',p.errs.slice(0,4));const TC=(Date.now()-T0)/1000;const vp=await p.video().path();await ctx.close();
  cut(vp,[['m3-flow',e-s+0.3]],n=>`${OUT}/${n}-${name}.mp4`,4.5)}
 await b.close()})();
