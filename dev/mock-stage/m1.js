// M1 event full-stage + M2 dialogue mockups on the live game. usage: node m1.js [fold|ipad|both]
const {boot,settle,chromium}=require('./boot');const fs=require('fs');const OUT='/home/user/wt/mock-shots/m';fs.mkdirSync(OUT,{recursive:true});
const LIB=fs.readFileSync(__dirname+'/mklib.js','utf8');
const LONG='<p>Giữa giờ Thân, {N} một mình bước vào cung, sắc mặt nghiêm lại. Nàng bảo cung nữ lui ra ngoài rồi mới hạ giọng: hôm qua ở Ngự hoa viên, có kẻ thấy Lệ quý nhân lén gặp người của Thái y viện, trong tay áo giấu một gói thuốc bọc giấy dầu. Chuyện chưa ai dám nói ra, nhưng nếu đúng là thuốc hại thai thì cả hậu cung sắp có biến.</p><p>Nàng nói thêm, giọng run run: “Muội không biết nên tin ai. Tỷ tỷ là người có lòng, xin tỷ cho muội một lời.” Ngoài hiên gió thổi qua rèm, tiếng chuông đồng ở Càn Thanh cung vừa điểm.</p>';
// M1: real kit dialog kept as the right panel; its own left figure column hidden; the person cut out on the blurred stage
const M1=({v,night,LONG})=>{const ipad=innerWidth>1000;
 // variants: A figure big / panel 52-46 %, B panel wide 60-54 % no banner, C text box on the stage + panel = options only
 const P={A:ipad?.47:.53,B:ipad?.55:.60,C:ipad?.42:.50}[v];
 return MKX.openEvent(LONG)?P:0};
const M1b=({v,night,P})=>{const M=document.getElementById('modal'),d=[...M.querySelectorAll('.dlg')].find(x=>/Lệ quý nhân/.test(x.textContent))||[...M.querySelectorAll('.dlg')].find(x=>x.querySelector('.kpmain'));[...document.body.children].forEach(e=>{if(/^\s*Trong cung vừa qua/.test(e.textContent||''))e.style.display='none'});const g=MKX.geo();
 const src=figFor(MKX.who(d));const tag=d.querySelector('.kszfig>.kt3');
 const L=MKX.layer(MKX.stageSrc(night),{night});const w=L.g.w;const pw=Math.round(w*P);const left=w-pw;
 M.style.background='transparent';
 // the right panel = the kit dialog frame (.dlg) holding the game's own header, text and option cards (moved, like kitFrameLive3 does)
 const cTop=v==='C'?Math.round(g.H*0.46):0;const pan=document.createElement('div');pan.className='dlg mkpan';pan.style.cssText=`position:fixed;left:${g.L+left+6}px;top:${g.t+6+cTop}px;width:${pw-12}px;height:${g.H-12-cTop}px;max-width:none;max-height:none;margin:0;display:flex;flex-direction:column;overflow:hidden;z-index:43`;
 const kph=d.querySelector('.kph')&&d.querySelector('.kph').cloneNode(true);if(kph)pan.appendChild(kph);const body=document.createElement('div');body.style.cssText='flex:1 1 auto;min-height:0;overflow:auto;padding:10px 12px 12px';pan.appendChild(body);
 const ev=d.querySelector('.k3ev')&&d.querySelector('.k3ev').cloneNode(true);if(ev&&v==='A'){const wr=document.createElement('div');wr.style.cssText='position:relative;overflow:hidden;border-radius:8px;margin:0 0 8px;height:'+Math.round(pw*0.24)+'px';ev.style.cssText+=';position:absolute!important;inset:0!important;width:100%!important;height:100%!important;margin:0!important';wr.appendChild(ev);body.appendChild(wr)}
 const km=d.querySelector('.kpmain').cloneNode(true);km.querySelectorAll('.k3ev').forEach(e=>e.remove());km.style.cssText+=';max-height:none!important;height:auto!important;overflow:visible!important;position:static!important';if(km&&v!=='C')body.appendChild(km);const op=d.querySelector('.opts')&&d.querySelector('.opts').cloneNode(true);if(op){op.style.cssText+=';display:flex;flex-direction:column;gap:8px;margin-top:10px';body.appendChild(op)}
 document.documentElement.classList.add('mkhide');document.body.appendChild(pan);if(kph)kph.querySelectorAll('.md,.kmini,.kszav').forEach(e=>e.remove());
 // figure: as tall as the stage allows (tag above the head), centred in the free left area
 const tagH=6;const fh=Math.min(L.g.H-tagH-6,(left-8)*2.0408*1.0);const fx=left/2;
 const F=MKX.fig(L,src,{x:fx,h:fh});
 document.querySelectorAll('[class*=seal]').forEach(e=>{if(!e.closest('header.hud')&&!e.classList.contains('kpseal')&&!e.closest('.mkpan'))e.style.display='none'});const who=MKX.who(d);MKX.plate(L,who,fx,L.g.H-44);
 if(v==='C'){const b=document.createElement('div');b.className='mkbub tl';b.innerHTML=`<div class="mkin" style="max-height:${L.g.H*0.46-40}px;overflow:auto"></div>`;b.querySelector('.mkin').appendChild(km);
  b.style.cssText+=`left:${left+6}px;top:14px;width:${pw-30}px;font-size:14px`;L.appendChild(b)}
 function ipad(){return innerWidth>1000}
 return {src,pw,left,fh}};
// M2: dialogue — messenger left with the event speech box, HER figure right with the choice box
const M2b=({v,night})=>{const M=document.getElementById('modal'),d=[...M.querySelectorAll('.dlg')].find(x=>/Lệ quý nhân/.test(x.textContent))||[...M.querySelectorAll('.dlg')].find(x=>x.querySelector('.kpmain'));[...document.body.children].forEach(e=>{if(/^\s*Trong cung vừa qua/.test(e.textContent||''))e.style.display='none'});const ipad=innerWidth>1000;
 const src=figFor(MKX.who(d));const tag=d.querySelector('.kszfig>.kt3');
 const km=d.querySelector('.kpmain').cloneNode(true),op=(d.querySelector('.opts')||document.createElement('div')).cloneNode(true);const ev=km.querySelector('.k3ev');if(ev)ev.remove();
 const L=MKX.layer(MKX.stageSrc(night),{night});const w=L.g.w,H=L.g.H;M.hidden=true;document.querySelectorAll('[class*=seal]').forEach(e=>{if(!e.closest('header.hud')&&!e.classList.contains('kpseal'))e.style.display='none'});
 const me=figFor(S);const P0=MKX.who(d);const who=P0?(P0.name):'';
 const mkB=(cls,whoTxt,node,css)=>{const b=document.createElement('div');b.className='mkbub '+cls;const mh=(/max-height:([^;]+);/.exec(css)||[])[1];b.style.cssText+=css.replace(/max-height:[^;]+;/,'').replace(/overflow:auto;?/,'');b.innerHTML=`<span class="mkwho">${whoTxt}</span><div class="mkin" style="max-height:${mh||'none'};overflow:auto"></div>`;b.querySelector('.mkin').appendChild(node);L.appendChild(b);return b};
 const nmTag=(x,y,txt)=>{const t=document.createElement('div');t.className='mkbub nt';t.style.cssText+=`left:${x}px;top:${y}px;transform:translateX(-50%);padding:3px 10px;font:600 14px serif;white-space:nowrap`;t.textContent=txt;L.appendChild(t)};
 if(v==='A'){// two rows (phone) / two ends (iPad): each box sits beside its own speaker, tail to the speaker
  if(!ipad){const rowH=H/2;
   const a=document.createElement('div');a.className='mkcrop';a.style.cssText=`left:0;top:0;width:${w*0.42}px;height:${rowH}px;z-index:2`;
   const fh=rowH/0.52;a.innerHTML=`<div class="mkfig" style="left:${(w*0.42-fh/2.0408)/2}px;top:4px;width:${fh/2.0408}px;height:${fh}px"><img src="${src}"></div>`;L.appendChild(a);
   const c=document.createElement('div');c.className='mkcrop';c.style.cssText=`right:0;top:${rowH}px;width:${w*0.40}px;height:${rowH}px;z-index:2`;
   c.innerHTML=`<div class="mkfig" style="left:${(w*0.40-fh/2.0408)/2}px;top:4px;width:${fh/2.0408}px;height:${fh}px"><img src="${me}"></div>`;L.appendChild(c);
   mkB('tl',who,km,`left:${w*0.42}px;top:18px;width:${w*0.55}px;max-height:${rowH-30}px;overflow:auto;font-size:14px`);
   mkB('tr r',S.name,op,`right:${w*0.41}px;top:${rowH+16}px;width:${w*0.57}px;max-height:${rowH-26}px;overflow:auto`);
  }else{const fh=H-8;MKX.fig(L,src,{x:w*0.13,h:fh});MKX.fig(L,me,{x:w*0.87,h:fh});
   mkB('tl',who,km,`left:${w*0.28}px;top:20px;width:${w*0.38}px;max-height:${H*0.62}px;overflow:auto`);
   mkB('br r',S.name,op,`right:${w*0.25}px;bottom:20px;width:${w*0.44}px;max-height:${H*0.55}px;overflow:auto`);}
 }else{// B: visual-novel — both figures big at the two sides; state 1 = speech strip (tail to the messenger), state 2 = choice strip (tail to her)
  const crop=ipad?1:0.62;
  if(ipad){MK2(MKX.fig(L,src,{x:w*0.2,h:H-6}));MK2(MKX.fig(L,me,{x:w*0.8,h:H-6}))}else{MKX.fig(L,src,{x:w*0.25,h:H,crop});MKX.fig(L,me,{x:w*0.76,h:H,crop})}
  function MK2(x){return x}
  const dim=document.createElement('div');dim.style.cssText=`position:absolute;inset:0;background:linear-gradient(to top,rgba(20,12,8,.55),transparent 45%);z-index:3`;L.appendChild(dim);
  const lit=(side)=>{[...L.querySelectorAll('.mkfig,.mkcrop')].forEach((f,i)=>{f.style.filter=(i===side)?'':'brightness(.6) saturate(.8)'})};
  if(v==='B'){lit(0);mkB('bl',who,km,`left:12px;right:${ipad?w*0.3:12}px;bottom:12px;max-height:${H*(ipad?.36:.36)}px;font-size:14px`)}
  else{lit(1);op.style.display='grid';op.style.gridTemplateColumns=ipad?'1fr':'1fr';mkB('br r',S.name,op,`left:${ipad?w*0.3:12}px;right:12px;bottom:12px;max-height:${H*(ipad?.5:.44)}px`)}
 }
 return {src,me}};
(async()=>{const which=process.argv[2]||'both';const b=await chromium.launch();
 for(const [W,H,name] of [[755,1000,'fold'],[1180,820,'ipad']]){if(which!=='both'&&which!==name)continue;const {ctx,p}=await boot(b,W,H,2);await p.addScriptTag({content:LIB});
  const shot=async(n)=>{await settle(p);await p.waitForTimeout(700);await p.evaluate(()=>{document.querySelectorAll('body *').forEach(e=>{if(e.offsetHeight<320&&/Trong cung vừa qua/.test(e.textContent||'')&&getComputedStyle(e).position==='fixed')e.style.display='none'})});await p.screenshot({path:`${OUT}/${n}-${name}.png`});console.log('shot',n,name)};
  for(const [v,night] of [['A',0],['B',0],['C',0],['A',1]]){let P=0;for(let t=0;t<5&&!P;t++){P=await p.evaluate(M1,{v,night,LONG});if(!P){await p.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(1500)}}await p.waitForFunction(()=>document.querySelector('#modal .dlg .kpmain'),null,{timeout:20000});await settle(p);await p.waitForTimeout(1200);
   const r=await p.evaluate(M1b,{v,night,P});console.log('dbg',v,P,await p.evaluate(()=>{const e=document.querySelector('.mkpan');return e?JSON.stringify(e.getBoundingClientRect())+getComputedStyle(e).display:'none'}));await shot(`m1-${v}${night?'-night':''}`);
   if(v==='A'&&!night){// measure: bars untouched + panel room
    const m=await p.evaluate(()=>{const R=e=>e.getBoundingClientRect();const h=R(document.querySelector('header.hud')),b=R(document.querySelector('nav.bar')),k=R(document.getElementById('mk'));return {hudB:h.bottom,barT:b.top,layer:[k.top,k.bottom]}});console.log('geo',name,JSON.stringify(m))}
   await p.evaluate(()=>{MKX.clear();MKX.closeModal()});await p.waitForTimeout(400)}
  for(const [v,night] of [['A',0],['B',0],['B2',0],['A',1]]){for(let t=0;t<5;t++){if(await p.evaluate(M1,{v:'A',night,LONG}))break;await p.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(1500)}await p.waitForFunction(()=>document.querySelector('#modal .dlg .kpmain'),null,{timeout:20000});await settle(p);await p.waitForTimeout(1200);await p.evaluate(M2b,{v,night});await shot(`m2-${v}${night?'-night':''}`);await p.evaluate(()=>{MKX.clear();MKX.closeModal()});await p.waitForTimeout(300)}
  if(p.errs.length)console.log('errors',p.errs.slice(0,4));await ctx.close()}
 await b.close()})();
