// M3 toilette room hub mockups on the live game. usage: node m3.js [fold|ipad|both]
const {boot,settle,chromium}=require('./boot');const fs=require('fs');const OUT='/home/user/wt/mock2-shots/m3s';fs.mkdirSync(OUT,{recursive:true});
const LIB=fs.readFileSync(__dirname+'/mklib.js','utf8');
const ROOM='https://ctm-img.victoria-tntt.workers.dev/img/toil-room-c1-dapung.webp';
// room helper: picture placed by hand (so the glow outlines map exactly), outlines traced on toil-room-c1-dapung (900x600 coords)
const ROOMJS=`window.MKR={
 put(L,{fx=0,fy=0.06,zoom=1,blur=0,op=1}={}){const w=L.g.w,H=L.g.H;const s=Math.max(w/1200,H/800)*zoom;const dw=1200*s,dh=800*s;
  let left=Math.min(0,Math.max(w-dw,w/2-fx*dw));if(fx===0)left=0;let top=Math.min(0,Math.max(H-dh,-fy*dh));
  const im=document.createElement('img');im.src='${ROOM}';im.style.cssText='max-width:none;max-height:none;position:absolute;left:'+left+'px;top:'+top+'px;width:'+dw+'px;height:'+dh+'px;z-index:1;opacity:'+op+(blur?';filter:blur('+blur+'px) brightness(.7)':'');L.appendChild(im);
  const k=dw/900;L.map=(x,y)=>[left+x*k,top+y*k];L.k=k;return im},
 glow(L){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('style','position:absolute;inset:0;width:100%;height:100%;z-index:4;pointer-events:none;overflow:visible');
  const P=(d)=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);p.setAttribute('fill','rgba(255,214,100,.06)');p.setAttribute('stroke','#ffdc73');p.setAttribute('stroke-width','3');p.setAttribute('stroke-linejoin','round');p.setAttribute('style','filter:drop-shadow(0 0 4px #ffd24a) drop-shadow(0 0 10px rgba(255,190,40,.9))');svg.appendChild(p)};
  const m=(x,y)=>L.map(x,y).map(v=>v.toFixed(1)).join(',');const k=L.k;
  P('M'+m(381,182)+' A'+(92*k)+','+(140*k)+' 0 1 1 '+m(565,182)+' L'+m(566,300)+' L'+m(572,370)+' L'+m(374,370)+' L'+m(380,300)+' Z');
  P('M'+m(0,292)+' L'+m(238,286)+' L'+m(240,384)+' L'+m(249,390)+' L'+m(249,500)+' L'+m(232,503)+' L'+m(229,470)+' L'+m(150,470)+' L'+m(147,503)+' L'+m(136,505)+' L'+m(133,550)+' L'+m(0,553)+' Z');
  L.appendChild(svg)},
 lbl(L,txt,x,y){const [a,b]=L.map(x,y);const e=document.createElement('div');e.className='mklbl';e.textContent=txt;e.style.left=Math.max(70,Math.min(L.g.w-70,a))+'px';e.style.top=b+'px';L.appendChild(e);return e},
 btns(L,done){const d=document.createElement('div');d.style.cssText='position:absolute;z-index:6;right:12px;bottom:12px;display:flex;gap:10px';d.innerHTML='<button class="kbtn kgr-go" style="min-width:150px;padding:10px 18px;font-size:17px">'+done+'</button>';L.appendChild(d);
  const bk=document.createElement('button');bk.className='kbtn';bk.textContent='◂ Quay lại';bk.style.cssText='position:absolute;z-index:6;left:12px;top:12px;padding:8px 14px';L.appendChild(bk)}
};`;
(async()=>{const which=process.argv[2]||'both';const b=await chromium.launch();
 for(const [W,H,name] of [[755,1000,'fold'],[1180,820,'ipad']]){if(which!=='both'&&which!==name)continue;const {ctx,p}=await boot(b,W,H,2);await p.addScriptTag({content:LIB});await p.addScriptTag({content:ROOMJS});
  const hideToast=()=>p.evaluate(()=>{document.querySelectorAll('body *').forEach(e=>{if(e.offsetHeight<320&&/Trong cung vừa qua/.test(e.textContent||'')&&getComputedStyle(e).position==='fixed')e.style.display='none'})});
  const shot=async(n)=>{await p.evaluate((n)=>{const vo=document.getElementById('ov');if(vo)vo.style.display=/^m3-f/.test(n)?'none':'';Q.length=0;const M=document.getElementById('modal');M.hidden=true;document.documentElement.classList.add('mkhide')},n);await settle(p);await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await p.waitForTimeout(600);await hideToast();await p.screenshot({path:`${OUT}/${n}-${name}.png`});console.log('shot',n,name)};
  await p.evaluate(()=>{try{nightScene=function(){};S.tonight=null}catch(e){}});
  // T1 today: the entry (top-bar chip «Chưa điểm trang» + the Điểm trang act card)
  await p.evaluate(()=>{const c=document.querySelector('[data-k3="toil"]');if(c){c.style.outline='3px solid #e0a800';c.style.outlineOffset='3px';c.style.borderRadius='6px'}});await shot('m3-t1');
  await p.evaluate(()=>{const c=document.querySelector('[data-k3="toil"]');if(c)c.style.outline=''});
  // T2 today: existing Hồi 1 (choose clothes) of the toilette game
  await p.evaluate(()=>toilOpen());await p.waitForTimeout(1500);await p.evaluate(()=>{const g=document.querySelector('#kg82 .kgr-go');if(g)g.click()});await p.waitForTimeout(2000);await shot('m3-t2');
  // grab the real wardrobe grid nodes for the new wardrobe screen
  await p.evaluate(()=>{const box=kg82Box();const t=box.querySelector('.toilinv');window.__grid=t?t.cloneNode(true):null});
  // F1 zoom transition (mid-frame): the stage picture zooms toward the room while the room picture fades in
  await p.evaluate(()=>{const ov=document.getElementById('kg82');if(ov)ov.style.visibility='hidden';const L=MKX.layer(MKX.stageSrc(0),{sharp:1,noveil:1});L.querySelector('.mkbg').style.transform='scale(1.35)';MKR.put(L,{op:.55,zoom:1.12});});await shot('m3-f1');
  // F2 hub: room + glowing mirror «Thay xiêm y» + dressing table «Điểm trang» + her figure + «Đã chỉnh tề» + Back
  const HUB=(o)=>{const L=MKX.layer('',{noveil:1});const ipad=innerWidth>1000;MKR.put(L,{fx:0,fy:ipad?.07:0});MKR.glow(L);
   MKR.lbl(L,'Thay xiêm y',473,ipad?72:30);MKR.lbl(L,'Điểm trang',118,262);
   const fig=o.fig==='ty'?(()=>{const sv=S.wd.y;S.wd.y=null;const f=figFor(S);S.wd.y=sv;return f})():figFor(S);
   const [fx,fy]=L.map(o.x||300,o.foot||575);const h=Math.min(L.g.H*.9,fy-8)*(o.sc||.82);const F=MKX.fig(L,fig,{x:fx,h,mk:o.mk||null,z:5});F.style.bottom=(L.g.H-fy)+'px';
   MKX.plate(L,S,fx,Math.min(L.g.H-44,fy-6));if(o.btn!==false)MKR.btns(L,o.done||'Đã chỉnh tề');return 1};
  await p.evaluate(HUB,{x:300,fig:'y'});await shot('m3-f2');
  // F3/F4 wardrobe: her figure LEFT (trung y), item grid RIGHT (the real kit grid of the toilette Hồi 1); tap an item → figure changes
  const WARD=(o)=>{const L=MKX.layer('',{noveil:1});const ipad=innerWidth>1000;const im=MKR.put(L,{fx:.42,blur:6});const w=L.g.w,H=L.g.H;const left=Math.round(w*(ipad?.40:.42));
   const fig=o.fig==='ty'?(()=>{const sv=S.wd.y;S.wd.y=null;const f=figFor(S);S.wd.y=sv;return f})():figFor(S);
   MKX.fig(L,fig,{x:left/2,h:Math.min(H-50,(left-10)*2.0408),z:5});MKX.plate(L,S,left/2,H-44);
   const pan=document.createElement('div');pan.className='dlg mkpan2';pan.style.cssText=`position:absolute;z-index:6;left:${left+4}px;right:8px;top:8px;bottom:8px;display:flex;flex-direction:column;overflow:hidden;max-width:none;max-height:none;margin:0`;
   pan.innerHTML='<div class="kph"><span class="kptitle">Thay xiêm y</span></div><div class="mkgb" style="flex:1;min-height:0;overflow:auto;padding:8px"></div>';
   if(window.__grid)pan.querySelector('.mkgb').appendChild(window.__grid.cloneNode(true));L.appendChild(pan);
   if(o.tap){const c=pan.querySelectorAll('.kitem,.kinv button,.kitm,[data-ix]');const t=c[o.tap]||c[0];if(t){t.style.outline='3px solid #e0a800';t.style.outlineOffset='2px'}}
   const bk=document.createElement('button');bk.className='kbtn';bk.textContent='◂ Quay lại';bk.style.cssText='position:absolute;z-index:7;left:10px;top:10px;padding:8px 14px';L.appendChild(bk);return 1};
  await p.evaluate(WARD,{fig:'ty'});await shot('m3-f3');
  await p.evaluate(WARD,{fig:'y',tap:2});await shot('m3-f4');
  // F5 makeup: the existing makeup mini-game (Hồi 2-4 canvas) unchanged — today's look, then shown over the blurred room with her live figure
  await p.evaluate(()=>{MKX.clear();const ov=document.getElementById('kg82');if(ov)ov.style.visibility='';try{toilMakeup()}catch(e){console.log(e)}});await p.waitForTimeout(2500);await shot('m3-t3');
  await p.evaluate(()=>{const ov=document.getElementById('kg82');const cv=ov&&ov.querySelector('canvas');const L=MKX.layer('',{noveil:1});const ipad=innerWidth>1000;MKR.put(L,{fx:.15,blur:6,zoom:1.5});const w=L.g.w,H=L.g.H;
   const left=Math.round(w*(ipad?.34:.36));MKX.fig(L,figFor(S),{x:left/2,h:Math.min(H-50,(left-10)*2.0408),z:5});MKX.plate(L,S,left/2,H-44);
   if(cv){const c2=document.createElement('canvas');c2.width=cv.width;c2.height=cv.height;c2.getContext('2d').drawImage(cv,0,0);const r=Math.min((w-left-16)/cv.width,(H-16)/cv.height);
    c2.style.cssText=`position:absolute;z-index:6;left:${left+(w-left-cv.width*r)/2}px;top:${(H-cv.height*r)/2}px;width:${cv.width*r}px;height:${cv.height*r}px;border:3px solid #c9a227;border-radius:12px;box-shadow:0 6px 22px rgba(0,0,0,.4)`;L.appendChild(c2)}
   if(ov)ov.style.visibility='hidden';const bk=document.createElement('button');bk.className='kbtn';bk.textContent='◂ Quay lại';bk.style.cssText='position:absolute;z-index:7;left:10px;top:10px;padding:8px 14px';L.appendChild(bk)});await shot('m3-f5');
  // F6-F8 final look on the toilette room after «Đã chỉnh tề»
  await p.evaluate(HUB,{x:473,fig:'ty',mk:'dep',sc:.98,btn:false});await shot('m3-f6');
  await p.evaluate(HUB,{x:473,fig:'y',sc:.98,btn:false});await shot('m3-f7');
  await p.evaluate(HUB,{x:473,fig:'y',mk:'dep',sc:.98,btn:false});await shot('m3-f8');
  if(p.errs.length)console.log('errors',p.errs.slice(0,4));await ctx.close()}
 await b.close()})();
