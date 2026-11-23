// in-page helpers for mock-stage (throwaway prototype; injected into the real game page)
window.MKX={
 geo(){const h=document.querySelector('header.hud').getBoundingClientRect(),b=document.querySelector('nav.bar').getBoundingClientRect();const t=Math.round(h.bottom+4),bt=Math.round(b.top-4);return {t,b:bt,H:bt-t,W:innerWidth,L:Math.round(h.left),R:Math.round(innerWidth-h.right)}},
 css(){if(document.getElementById('mkcss'))return;const s=document.createElement('style');s.id='mkcss';s.textContent=`
#mk{position:fixed;z-index:58;overflow:hidden;border-radius:12px;background:#2a1a12}
#mk .mkbg{position:absolute;inset:-14px;background-size:cover;background-position:center;filter:blur(6px)}
#mk .mkbg.sharp{filter:none;inset:0}
#mk .mkveil{position:absolute;inset:0;background:rgba(20,12,8,.45)}
#mk.night .mkbg{filter:blur(6px) brightness(.62) saturate(.85)}
#mk.night .mkveil{background:rgba(10,16,48,.45)}
#mk.night.mkev .mkbg{filter:blur(6px) brightness(.5) saturate(.75)}
#mk.night.mkev .mkveil{background:rgba(10,16,48,.52)}
html.mkhide #modal{display:none!important}
#mk .mkfig{position:absolute;bottom:0;transform-origin:50% 100%}
#mk .mkfig img{max-width:none;max-height:none;position:absolute;left:0;top:0;width:100%;height:100%;display:block}
#mk .mkcrop{position:absolute;overflow:hidden}
#mk .mktag{position:absolute;transform:translateX(-50%);text-align:center;white-space:nowrap;z-index:3}
.mkplate{position:absolute;z-index:3;transform:translateX(-50%);text-align:center;white-space:nowrap;font:600 17px/1.25 serif;color:#3a2410;text-shadow:0 0 3px #fff8e6,0 0 8px #fff8e6,0 0 16px rgba(255,248,230,.95)}
.mkplate span{display:block}
.mkbub{position:absolute;z-index:4;background:rgba(255,250,240,.97);border:2px solid #c9a227;border-radius:14px;box-shadow:0 6px 22px rgba(0,0,0,.35);padding:12px 14px;color:#3a2a1c;font-size:15px;line-height:1.45}
.mkbub .mkin{position:relative}
.mkbub .mkwho{position:absolute;top:-15px;left:14px;background:#7a1f1f;color:#fff3d6;border:1.5px solid #e6c56a;border-radius:8px;padding:2px 10px;font:600 13px/1.4 serif;white-space:nowrap}
.mkbub.r .mkwho{left:auto;right:14px}
.mkbub:after{content:"";position:absolute;width:18px;height:18px;background:inherit;border:inherit;border-width:0 2px 2px 0;border-style:solid;border-color:#c9a227}
.mkbub.tl:after{left:-11px;top:34px;transform:rotate(135deg)}
.mkbub.tr:after{right:-11px;top:34px;transform:rotate(-45deg)}
.mkbub.bl:after{left:34px;top:-11px;transform:rotate(-135deg)}
.mkbub.br:after{right:60px;top:-11px;transform:rotate(-135deg)}
.mkbub.nt:after{display:none}
.mkbub p{margin:0 0 6px}
.mkbub .opts{display:flex!important;flex-direction:column;gap:8px}
.mklbl{position:absolute;z-index:5;transform:translate(-50%,-50%);padding:5px 14px;border-radius:10px;background:rgba(40,22,10,.78);border:1.5px solid #f2cf63;color:#ffe7a6;font:700 18px/1.3 serif;letter-spacing:.5px;white-space:nowrap;box-shadow:0 0 14px rgba(255,205,80,.65)}
.mknote{position:fixed;z-index:9999;left:8px;top:8px;background:#1d140c;color:#ffe9b0;font:600 13px/1.3 sans-serif;padding:4px 8px;border-radius:6px;opacity:.92}
`;document.head.appendChild(s)},
 clear(){document.querySelectorAll('#mk,.mknote,#mkbtns').forEach(e=>e.remove())},
 stageSrc(night){const si=document.getElementById('scimg');const m=/url\(["']?([^"')]+)["']?\)/.exec(si.style.backgroundImage||'');let u=m?m[1]:'';return u.replace(/-(sang|trua|chieu|toi)\.webp/,night?'-toi.webp':'-sang.webp')},
 layer(bg,o={}){MKX.css();MKX.clear();const g=MKX.geo();const d=document.createElement('div');d.id='mk';if(o.night)d.classList.add('night');
  d.style.cssText=`left:${g.L}px;right:${g.R}px;top:${g.t}px;height:${g.H}px`;d.innerHTML=`<div class="mkbg${o.sharp?' sharp':''}" style="background-image:url('${bg}');${o.pos?'background-position:'+o.pos:''}"></div>${o.noveil?'':'<div class="mkveil"></div>'}`;
  document.body.appendChild(d);d.g={...g,w:g.W-g.L-g.R};return d},
 // full figure (box aspect asp = h/w) with optional makeup layer; x = centre px in layer, h = height px, crop = fraction of figure shown from top (half body)
 fig(L,src,{x,h,asp=2.0408,mk=null,crop=1,z=2,flip=false}){const w=h/asp;const box=document.createElement('div');
  const file=src.split('/').pop();let mkh='';if(mk){try{const u=toilMakeupSvg(file,mk);if(u)mkh=`<img src="${u}" style="opacity:1">`}catch(e){}}
  if(crop<1){const vis=L.g.H;const full=vis/crop;const ww=full/asp;box.className='mkcrop';box.style.cssText=`left:${x-ww/2}px;bottom:0;width:${ww}px;height:${vis}px;z-index:${z}`;
   box.innerHTML=`<div class="mkfig" style="left:0;top:0;bottom:auto;width:${ww}px;height:${full}px;${flip?'transform:scaleX(-1)':''}"><img src="${src}">${mkh}</div>`;L.appendChild(box);box.figTop=0;return box}
  box.className='mkfig';box.style.cssText=`left:${x-w/2}px;width:${w}px;height:${h}px;z-index:${z};${flip?'transform:scaleX(-1)':''}`;box.innerHTML=`<img src="${src}">${mkh}`;L.appendChild(box);return box},
 who(d){const t=d&&d.querySelector('.kszfig>.kt3');const tx=t?t.textContent:'';const all=[...liveRivals(true),...(typeof curPeople==='function'?curPeople():[]),...(S.p||[])];return all.find(p=>p&&p.name&&tx.includes(p.name))||window.__mkv},
 plate(L,p,x,y){const t=document.createElement('div');t.className='mkplate tag j59tag';t.style.left=x+'px';t.style.top=y+'px';t.innerHTML=j59tagHTML(p,p.name);L.appendChild(t);return t},
 note(t){const n=document.createElement('div');n.className='mknote';n.textContent=t;document.body.appendChild(n)},
 openEvent(LONG,i){try{nightScene=function(){};S.tonight=null;pushFront=function(){};Q.unshift=function(){return this.length}}catch(e){}const L0=liveRivals(true).filter(x=>x.alive&&!x.out);let v=null;const M=document.getElementById('modal');
  const mine=()=>/Lệ quý nhân/.test(M.textContent)&&M.querySelector('.kpmain');
  for(let j=0;j<L0.length*2;j++){v=L0[((i||0)+j)%L0.length];try{kmReset()}catch(e){}Q.length=0;
   Q.push({ev:1,t:window.__mksolo?'Chuyện trong cung':'Có người đến',who:pv(v),h:LONG.replace('{N}',v.name)+(window.__mkN?'<!--'+(window.__mkN++)+'-->':''),opts:window.__mkopts?window.__mkopts(window.__mksolo):window.__mksolo?[{n:'Cất khăn đi, âm thầm dò xem ai đánh rơi',fx:{}},{n:'Mang khăn trình Hoàng hậu ngay',fx:{danh:1}},{n:'Sai người đem trả, xem Lệ quý nhân đổi sắc ra sao',fx:{duc:1}}]:[{n:'Khuyên nàng giữ kín, chờ chứng cứ',fx:{duc:1}},{n:'Cùng nàng đi báo Hoàng hậu ngay',fx:{danh:1}},{n:'Âm thầm sai người theo dõi Lệ quý nhân',fx:{}}]});showModal();
   for(let k=0;k<6&&!mine();k++){try{const keep=Q.filter(q=>q.h&&/Lệ quý nhân/.test(q.h));Q.length=0;Q.push(...keep);if(!Q.length)break;showModal()}catch(e){}}
   if(mine())break}window.__mkv=v;return mine()?v.name:''},
 closeModal(){document.documentElement.classList.remove('mkhide');document.querySelectorAll('.mkpan,.mkpan2').forEach(e=>e.remove());const dd=document.querySelector('#modal .dlg');if(dd)dd.style.display='';Q.length=0;const M=document.getElementById('modal');M.hidden=true;M.style.background='';try{kszLiveReset3&&kszLiveReset3()}catch(e){}}
};
