// MOCK-STAGE v3 (owner 23/11 ~20:20Z/~20:22Z): event layout A only. Figures on the LEFT (full body, never cut), boxes on the RIGHT,
// the EVENT PICTURE (the real .k3ev) at the top of the story box; event picture + speaker name + story text FIXED, ONLY the option list scrolls.
// A1 = two boxes (story box tied to the messenger, choice box tied to her), A2 = one kit frame (name > picture > story > options).
// Throwaway mockup (never land). usage: MKROOT=<main checkout> node m13.js [fold|ipad|both] [still|video|all]
const {boot,settle,chromium}=require('./boot');const fs=require('fs');const {mark,cut}=require('./cut');
const OUT='/home/user/wt/mock3-shots';fs.mkdirSync(OUT+'/raw',{recursive:true});
const LIB=fs.readFileSync(__dirname+'/mklib.js','utf8');
const LONG='<p>Giữa giờ Thân, {N} một mình bước vào cung, sắc mặt nghiêm lại. Nàng bảo cung nữ lui ra ngoài rồi mới hạ giọng: hôm qua ở Ngự hoa viên, có kẻ thấy Lệ quý nhân lén gặp người của Thái y viện, trong tay áo giấu một gói thuốc bọc giấy dầu. Chuyện chưa ai dám nói ra, nhưng nếu đúng là thuốc hại thai thì cả hậu cung sắp có biến.</p><p>Nàng nói thêm, giọng run run: “Muội không biết nên tin ai. Tỷ tỷ là người có lòng, xin tỷ cho muội một lời.”</p>';
const SOLO='<p>Canh hai, đèn trong tẩm điện đã hạ bớt. Lúc cung nữ dọn khay trà, dưới thềm rơi ra một mảnh khăn lụa thêu chữ “Lệ”, vật tùy thân của Lệ quý nhân. Trên khăn còn vương mùi thuốc lạ, mép khăn dính chút bột trắng.</p><p>Không ai thấy ai đánh rơi. Ngoài cửa, tiếng mõ cầm canh vừa qua.</p>';
const MJS=`window.__mkopts=solo=>solo?[{n:'Cất khăn đi, âm thầm dò xem ai đánh rơi',fx:{}},{n:'Mang khăn trình Hoàng hậu ngay',fx:{danh:1}},{n:'Sai người đem trả, xem Lệ quý nhân đổi sắc ra sao',fx:{duc:1}},{n:'Đốt khăn đi, coi như chưa từng thấy',fx:{}}]
 :[{n:'Khuyên nàng giữ kín, chờ chứng cứ',fx:{duc:1}},{n:'Cùng nàng đi báo Hoàng hậu ngay',fx:{danh:1}},{n:'Âm thầm sai người theo dõi Lệ quý nhân',fx:{}},{n:'Mời Thái y đến hỏi chuyện gói thuốc',fx:{}}];
window.MK3={
 css(){if(!window.__mkt)window.__mkt=setInterval(()=>{document.querySelectorAll('body > *').forEach(e=>{if(e.id!=='mk'&&e.offsetHeight<360&&/Trong cung vừa qua/.test(e.textContent||'')&&getComputedStyle(e).position==='fixed')e.style.display='none'})},100);if(document.getElementById('mk3css'))return;const s=document.createElement('style');s.id='mk3css';s.textContent=\`
#mk .dlg.mkbox{position:absolute;z-index:4;max-width:none;max-height:none;margin:0;padding:0;display:flex;flex-direction:column;overflow:visible;text-align:left;animation:none;box-shadow:0 6px 22px rgba(0,0,0,.38)}
#mk .mkbox>.kph{flex:0 0 auto;position:relative}
#mk .mkbox .mkcol{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px;padding:10px 12px 12px;overflow:hidden}
#mk .mkbox .mkcol>.k3ev{flex:0 0 auto;width:100%;overflow:hidden;border-radius:8px}
#mk .mkbox .mkcol>.k3ev .ksart{width:100%!important;height:100%!important;margin:0!important}
#mk .mkbox .mkcol>.k3ev img{width:100%!important;height:100%!important;object-fit:cover}
#mk .mkbox .mkcol>.kpmain{flex:0 0 auto;max-height:none!important;height:auto!important;overflow:visible!important;margin:0!important}
#mk .mkbox .mkcol>.opts{flex:1 1 auto;min-height:0;overflow-y:auto!important;max-height:none!important;height:auto!important;margin:0!important}
#mk .mkbox>.kseal{position:absolute}
#modal.mkon{background:transparent!important;z-index:59!important;pointer-events:none}
#modal.mkon .dlg{pointer-events:auto;box-shadow:0 6px 22px rgba(0,0,0,.38)!important}
#modal.mkon .dlg .k3body{display:flex!important;flex-direction:column!important;height:100%!important}
#modal.mkon .dlg .k3right{width:auto!important;max-width:none!important;flex:1 1 auto!important;min-height:0!important;margin:0!important}
#mk .mktail{position:absolute;z-index:5;width:0;height:0;border-style:solid;border-width:11px 13px 11px 0;border-color:transparent var(--gold,#b8901f) transparent transparent}
#mk .opts>button.ka{flex-shrink:0!important}
#mk .mkcol>.opts{grid-template-rows:none!important;grid-auto-rows:max-content!important;align-content:start!important}
#mk .mkfull{position:absolute;z-index:2;display:block;max-width:none;max-height:none;pointer-events:none}
#mk .mkbox:before,#mk .mkbox:after{content:"";position:absolute;width:0;height:0;border-style:solid;border-color:transparent;border-width:0;background:none;box-shadow:none;inset:auto}
#mk .mkbox.tl:before{left:-13px;top:var(--ty,40px);border-width:11px 13px 11px 0;border-right-color:var(--gold,#b8901f)}
#mk .mkbox.tl:after{left:-11px;top:calc(var(--ty,40px) + 1px);border-width:10px 12px 10px 0;border-right-color:#fbf1e6}
.mktap{position:fixed;z-index:9999;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;border:3px solid #ffd54a;background:rgba(255,213,74,.25);box-shadow:0 0 14px rgba(255,190,40,.9);pointer-events:none}
.mkpick{outline:3px solid #e0a800!important;outline-offset:2px}
#modal.mkon button.ka.ka .kat>.kodds .kodm.kodm.kodm{flex-direction:row!important;align-items:center!important;gap:5px!important;flex-wrap:nowrap!important}
#modal.mkon button.ka.ka .kat>.kodds .kodm.kodm>b{white-space:nowrap!important;max-width:none!important;text-align:left!important;line-height:inherit!important}
#modal.mkon button.ka.ka .kat.kat.kat{flex-wrap:nowrap!important}
#modal.mkon button.ka.ka .kat>.kan.kan.kan{flex:1 1 auto!important;min-width:0!important}
#modal.mkon button.ka.ka .kat>.kodds.kodds{flex:0 0 auto!important;margin-left:6px!important}
.mkhand{position:fixed;z-index:9999;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;background:rgba(255,255,255,.55);border:2px solid rgba(90,60,20,.7);box-shadow:0 2px 8px rgba(0,0,0,.35);pointer-events:none}
\`;document.head.appendChild(s)},
 // full-body figure, never cut: top px, height fh px, centre cx px (width from the picture's own ratio)
 async full(L,src,{cx,top,fh,z=2}){const im=new Image();im.className='mkfull';im.crossOrigin='anonymous';im.src=src;try{await im.decode()}catch(e){}im.ob=MK3.ob(im);const fw=fh*im.naturalWidth/Math.max(1,im.naturalHeight);
  im.style.cssText='height:'+fh+'px;width:'+fw+'px;top:'+top+'px;left:'+(cx-fw/2)+'px;z-index:'+z;L.appendChild(im);return im},
 ob(im){try{const W=120,H=Math.round(120*im.naturalHeight/Math.max(1,im.naturalWidth));const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0,W,H);const D=x.getImageData(0,0,W,H).data;let l=W,r=-1,t=H,b=-1;for(let y=0;y<H;y++)for(let i=0;i<W;i++)if(D[(y*W+i)*4+3]>24){if(i<l)l=i;if(i>r)r=i;if(y<t)t=y;if(y>b)b=y}if(r<0)return {l:0,r:1,t:0,b:1,ok:0};return {l:l/W,r:(r+1)/W,t:t/H,b:(b+1)/H,ok:1}}catch(e){return {l:0,r:1,t:0,b:1,ok:0,err:String(e).slice(0,60)}}},
 // owner 20:27Z: no figure is ever clipped — shift a figure so its painted part sits inside the layer with M px margin (both sides)
 fitH(R,M){const w=R.L.g.w;R.figs.forEach(f=>{const fw=parseFloat(f.style.width);let x=parseFloat(f.style.left);const ob=f.ob||{l:0,r:1};const l=x+ob.l*fw,r=x+ob.r*fw;if(l<M)x+=M-l;else if(r>w-M)x-=r-(w-M);f.style.left=x+'px'})},
 box(L,head,parts,css,tail){const b=document.createElement('div');b.className='dlg mkbox '+(tail||'');b.style.cssText+=css;b.appendChild(head);const c=document.createElement('div');c.className='mkcol';parts.forEach(n=>n&&c.appendChild(n));b.appendChild(c);L.appendChild(b);return b},
 cp(a,b,root){const c=getComputedStyle(a);let t='';for(let i=0;i<c.length;i++){const k=c[i];if(root&&/^(position|left|top|right|bottom|margin|inset|transform|z-index)/.test(k))continue;if(/^(width|height|inline-size|block-size|max-width|max-height|min-width|min-height)$/.test(k)&&!(a.matches&&a.matches('.kseal,.kseal *')))continue;t+=k+':'+c.getPropertyValue(k)+';'}b.style.cssText=t;const A=[...a.children],B=[...b.children];A.forEach((x,i)=>B[i]&&MK3.cp(x,B[i],false))},
 head(src,title,seal){const h=src.cloneNode(true);MK3.cp(src,h,true);h.style.width='auto';const t=h.querySelector('.kptitle');if(t)t.textContent=title;if(!seal)h.querySelectorAll('.kpseal').forEach(e=>e.remove());return h},
 async build({v,night,solo}){MK3.css();const M=document.getElementById('modal');const ds0=[...M.querySelectorAll('.dlg')];const ds=ds0.filter(x=>x.offsetWidth>0);let d=ds.reverse().find(x=>/Lệ quý nhân/.test(x.textContent))||ds.find(x=>x.querySelector('.kpmain'));if(!d)return {err:'nodlg',n:ds0.length,mh:M.hidden,md:getComputedStyle(M).display,dd:ds0.map(x=>[x.className,x.style.cssText.slice(0,120),getComputedStyle(x).display])};
  const P0=solo?null:MKX.who(d);const src=P0?figFor(P0):'',me=figFor(S);
  const kph=d.querySelector('.kph'),evR=d.querySelector('.k3ev'),kmR=d.querySelector('.kpmain'),seal=d.querySelector('.kseal-ev');
  const tit=(kph.querySelector('.kptitle')||{}).textContent||'';const rank=P0?(d.querySelector('.kszfig>.kt3')||{}).textContent||'':'';let spk=tit;if(P0){try{spk=kitTitled(kitTitleOf(P0),P0.name)}catch(e){spk=P0.name}}
  const evI=evR&&evR.querySelector('img');const evSrc=evI?(evI.currentSrc||evI.src):'';const A1=v==='A1';
  const L=MKX.layer(A1&&evSrc?evSrc:MKX.stageSrc(night),{night});if(A1&&evSrc)L.classList.add('mkev');M.classList.add('mkon');
  document.querySelectorAll('[class*=seal]').forEach(e=>{if(!e.closest('header.hud')&&!e.closest('#mk')&&!e.closest('#modal'))e.style.display='none'});
  const ipad=innerWidth>1000,w=L.g.w,H=L.g.H;const R={L,ipad,figs:[],boxes:[],tails:[],v,solo,d};const bx=ipad?.41:.43,bw=ipad?.575:.555,gap=8;const X=w*bx,BW=w*bw;
  const evh=Math.round(Math.min(ipad?118:124,BW/3.3));
  const SV=[];const keep=e=>{if(e&&!SV.some(x=>x[0]===e))SV.push([e,e.getAttribute('style')])};[d,d.querySelector('.kszfig'),evR,kmR,seal,...kph.querySelectorAll('.kpseal')].forEach(keep);const t0=kph.querySelector('.kptitle');const T0=t0&&t0.textContent;
  const place=(el,top,h)=>{const P={position:'fixed',left:(L.g.L+X)+'px',top:(L.g.t+top)+'px',width:BW+'px',height:h+'px','max-width':'none','max-height':'none','min-height':'0',margin:'0',transform:'none',animation:'none',right:'auto',bottom:'auto'};for(const k in P)el.style.setProperty(k,P[k],'important')};
  const tail=(top)=>{const t=document.createElement('div');t.className='mktail';t.style.cssText='left:'+(X-13)+'px;top:'+top+'px';L.appendChild(t);R.tails.push(t);return t};
  const hideX=[...d.querySelectorAll('.kszfig,.k3body>*:not(.k3right),.k3right>*:not(.k3ev):not(.kpmain):not(.opts)')];hideX.forEach(e=>{keep(e);e.style.setProperty('display','none','important')});
  const evSet=()=>{[evR,...evR.querySelectorAll('.ksart,img')].forEach(e=>{keep(e);e.style.setProperty('height',evh+'px','important');e.style.setProperty('max-height','none','important');e.style.setProperty('min-height',evh+'px','important')})};evSet();
  if(!solo){// messenger full body at the TOP-LEFT (behind), her full body lower-left (in front); one kit scale for both
   const fh=Math.round(H*(ipad?.86:.80));R.figs.push(await MK3.full(L,src,{cx:w*(ipad?.115:.19),top:4,fh:fh-4,z:2}));R.figs.push(await MK3.full(L,me,{cx:w*(ipad?.27:.30),top:H-fh,fh,z:3}));
   if(v==='A1'){// story box (clone of the real header + event picture + story, styles copied) tied to the messenger; the REAL dialog = her choice box
    const km=kmR.cloneNode(true);MK3.cp(kmR,km,true);km.style.width='auto';km.style.height='auto';km.style.maxHeight='none';km.style.overflow='visible';
    const sb=MK3.box(L,MK3.head(kph,spk,true),[km],'left:'+X+'px;top:'+gap+'px;width:'+BW+'px;height:auto','');if(seal){const s=seal.cloneNode(true);MK3.cp(seal,s,true);s.style.position='absolute';s.style.right='10px';s.style.top='4px';s.style.left='auto';s.style.zIndex=6;sb.appendChild(s)}
    R.boxes.push(sb);tail(gap+(ipad?52:62));const sh=Math.ceil(sb.getBoundingClientRect().height);
    evR.style.setProperty('display','none','important');kmR.style.setProperty('display','none','important');if(seal)seal.style.setProperty('display','none','important');kph.querySelectorAll('.kpseal').forEach(e=>e.style.setProperty('display','none','important'));
    const t=kph.querySelector('.kptitle');if(t)t.textContent=S.name;const top=gap+sh+12;R.pl=[top,H-top-gap];place(d,top,H-top-gap);R.boxes.push(d);tail(Math.max(top+26,Math.round(H*(ipad?.30:.36))))}
   else{const t=kph.querySelector('.kptitle');if(t)t.textContent=spk;R.pl=[gap,H-2*gap];place(d,gap,H-2*gap);R.boxes.push(d);tail(gap+(ipad?52:62))}}
  else{// solo: her figure alone on the left, the real dialog on the right
   const fh=Math.round(H*.97);R.figs.push(await MK3.full(L,me,{cx:w*(ipad?.20:.22),top:H-fh,fh,z:3}));R.pl=[gap,H-2*gap];place(d,gap,H-2*gap);R.boxes.push(d);tail(Math.round(H*.20));if(A1){keep(evR);evR.style.setProperty('display','none','important')}}
  MK3.fitH(R,4);R.evSrc=evSrc;R.A1=A1;
  R.TT=(v==='A1'&&!solo)?S.name:(solo?tit:spk);R.apply=()=>{const M=document.getElementById('modal');M.classList.add('mkon');const cur=[...M.querySelectorAll('.dlg')].filter(x=>x.querySelector('.opts')).pop();if(cur&&cur!==d){d=cur;R.d=d;R.boxes[R.boxes.length-1]=d;keep(d)}[...M.children].filter(x=>x!==d&&!x.contains(d)).forEach(e=>{keep(e);e.style.setProperty('display','none','important')});[...M.querySelectorAll('.dlg')].filter(x=>x!==d).forEach(e=>{keep(e);e.style.setProperty('display','none','important')});[...d.querySelectorAll('.kszfig,.k3body>*:not(.k3right),.k3right>*:not(.k3ev):not(.kpmain):not(.opts)')].forEach(e=>{keep(e);e.style.setProperty('display','none','important')});const tt=d.querySelector('.kptitle');if(tt&&tt.textContent!==R.TT){keep(tt);tt.textContent=R.TT}d.querySelectorAll('button.ka.kodstk,button.ka.kodrow').forEach(b=>b.classList.remove('kodstk','kodrow'));if(v==='A1'&&solo){[...d.querySelectorAll('.k3ev')].forEach(e=>{keep(e);e.style.setProperty('display','none','important')})}else if(v==='A1'&&!solo){[...d.querySelectorAll('.k3ev,.kpmain,.kseal-ev,.kpseal')].forEach(e=>{keep(e);e.style.setProperty('display','none','important')})}else{const e0=d.querySelector('.k3ev');if(e0){[e0,...e0.querySelectorAll('.ksart,img')].forEach(e=>{keep(e);e.style.setProperty('height',evh+'px','important');e.style.setProperty('max-height','none','important');e.style.setProperty('min-height',evh+'px','important')})}}place(d,R.pl[0],R.pl[1])};R.iv=setInterval(()=>{try{const M=document.getElementById('modal');const r=d.getBoundingClientRect();const tt=d.querySelector('.kptitle');const bad=Math.abs(r.top-(L.g.t+R.pl[0]))>1||!M.classList.contains('mkon')||[...M.children].some(x=>x!==d&&!x.contains(d)&&x.getClientRects().length)||[...d.querySelectorAll('.kszfig')].some(x=>x.getClientRects().length)||(tt&&tt.textContent!==R.TT)||!d.isConnected||(v==='A1'&&[...d.querySelectorAll(solo?'.k3ev':'.kpmain,.k3ev')].some(x=>x.getClientRects().length))||!!d.querySelector('button.ka.kodstk,button.ka.kodrow');if(bad)R.apply()}catch(e){}},100);R.SV=SV;R.t0=t0;R.T0=T0;window.__R=R;for(let i=0;i<3;i++){await new Promise(r=>setTimeout(r,450));try{kitOdFit(d)}catch(e){}R.apply();if(v==='A1'&&!solo){}}
  return {who:spk,n:R.boxes.length,evh}},
 // the same assertions as dev/test/dialog-fixed.js (a)(b)(c)(d)(e) on the mock + story fits without scrolling + full bodies never cut
 intro(on){const R=window.__R;const els=[...R.figs,...R.boxes,...R.tails];els.forEach(e=>e.style.opacity=on?'0':'');const bg=R.L.querySelector('.mkbg'),vl=R.L.querySelector('.mkveil');bg.style.filter=on?'none':'';if(vl)vl.style.opacity=on?'0':''},
 restore(){const R=window.__R;if(!R||!R.SV)return;clearInterval(R.iv);R.SV.forEach(([e,st])=>{if(st==null)e.removeAttribute('style');else e.setAttribute('style',st)});if(R.t0)R.t0.textContent=R.T0;R.SV=null},
 check(){const R=window.__R,L=R.L,d=R.d;const rr=e=>{const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
  const vis=e=>e&&e.getClientRects().length;
  const fixedEls=[...R.figs,...[...L.querySelectorAll('.mkbox>.kph,.mkbox .k3ev,.mkbox .kpmain,.mkbox>.kseal'),...d.querySelectorAll('.kph,.k3ev,.kpmain,.kseal-ev')].filter(vis)];const a=fixedEls.map(rr);
  const all=[...L.querySelectorAll('*'),d,...d.querySelectorAll('*')];const scrollers=all.filter(e=>e.scrollHeight>e.clientHeight+2&&/(auto|scroll)/.test(getComputedStyle(e).overflowY));
  const which=scrollers.map(e=>e.className.split(' ')[0]);scrollers.forEach(e=>e.scrollTop=1e5);const c=fixedEls.map(rr);scrollers.forEach(e=>e.scrollTop=0);
  const res={};res.fixed=JSON.stringify(a)===JSON.stringify(c);res.nFixed=a.length;res.scrollers=which;res.onlyOpts=scrollers.length>0&&scrollers.every(e=>e.classList.contains('opts'));
  const o=d.querySelector('.opts');const ob=o.getBoundingClientRect();
  res.storyFits=[...L.querySelectorAll('.mkcol')].every(c=>c.scrollHeight<=c.clientHeight+2)&&[...d.querySelectorAll('.kpmain')].filter(vis).every(k=>k.getBoundingClientRect().bottom<=ob.top+1&&k.scrollHeight<=k.clientHeight+2);
  const cards=[...o.querySelectorAll(':scope>button.ka.kopt')].filter(b=>b.offsetParent);
  res.cards=cards.length;res.oddsOnTitle=cards.every(b=>{const od=b.querySelector('.kat>.kodds'),kan=b.querySelector('.kat>.kan');if(!od)return true;const q=od.getBoundingClientRect(),t=kan.getBoundingClientRect();return q.top<t.bottom-2&&q.bottom>t.top+2});
  res.picFills=cards.every(b=>{const p=b.querySelector(':scope>.kaart');return !p||p.getBoundingClientRect().height>=b.getBoundingClientRect().height-8});
  res.cols=new Set(cards.map(b=>Math.round(b.getBoundingClientRect().left))).size;res.kol=(o.dataset.kol||'')+(o.dataset.kot||'');
  res.optScroll=o.scrollHeight-o.clientHeight;const g=L.getBoundingClientRect();res.fullBody=R.figs.every(f=>{const r=f.getBoundingClientRect();return r.top>=g.top-1&&r.bottom<=g.bottom+1});
  res.noClipH=R.figs.map(f=>{const r=f.getBoundingClientRect(),ob=f.ob||{l:0,r:1,t:0,b:1};return [Math.round(r.left+ob.l*r.width-g.left),Math.round(g.right-(r.left+ob.r*r.width)),Math.round(r.top+ob.t*r.height-g.top),Math.round(g.bottom-(r.top+ob.b*r.height)),ob.ok]});res.noClip=res.noClipH.every(a=>a[0]>=3&&a[1]>=3&&a[2]>=0&&a[3]>=-1);
  res.oddsOneRow=cards.every(b=>{const m=b.querySelector('.kodm');if(!m)return true;const s=m.querySelector('.kseg'),w=m.querySelector(':scope>b');if(!s||!w)return true;const a=s.getBoundingClientRect(),c=w.getBoundingClientRect();return Math.abs((a.top+a.bottom)/2-(c.top+c.bottom)/2)<6&&c.left>=a.right-1&&w.getClientRects().length===1});
  res.evBg=!!R.A1&&!!R.evSrc;res.bgf=getComputedStyle(L.querySelector(".mkbg")).filter;
  res.boxIn=R.boxes.every(b=>{const r=b.getBoundingClientRect();return r.top>=g.top-1&&r.bottom<=g.bottom+1&&r.right<=g.right+1});
  res.seals=[...document.querySelectorAll('#mk .kseal-ev,#modal .kseal-ev')].filter(vis).length;const ev=[...document.querySelectorAll('#mk .k3ev,#modal .k3ev')].find(vis);res.evh=ev?Math.round(ev.getBoundingClientRect().height):0;res.evImg=!!(ev&&ev.querySelector('img')&&ev.querySelector('img').complete);
  res.dlg=rr(d);res.onTop=R.boxes.every(b=>{const r=b.getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+Math.min(60,r.height/2));return !!e&&b.contains(e)});res.extra=[...d.querySelectorAll('img')].filter(i=>vis(i)&&!i.closest('.opts')&&!i.closest('.k3ev')).map(i=>{const ch=[];let e=i;while(e&&e!==d){ch.push(e.className&&e.className.baseVal===undefined?e.className.split(' ')[0]:e.tagName);e=e.parentElement}return ch.join('<')});return res},
 tap(x,y){const t=document.createElement('div');t.className='mktap';t.style.left=x+'px';t.style.top=y+'px';document.body.appendChild(t);
  t.animate([{transform:'scale(.4)',opacity:0},{transform:'scale(1)',opacity:1,offset:.35},{transform:'scale(1.5)',opacity:0}],{duration:650,easing:'ease-out'}).onfinish=()=>t.remove()},
 open(){const R=window.__R;const L=R.L;L.animate([{opacity:0},{opacity:1}],{duration:380,easing:'ease-out',fill:'both'});let D=0;
  if(R.A1){const bg=L.querySelector('.mkbg'),vl=L.querySelector('.mkveil');const fin=getComputedStyle(bg).filter;D=2600;
   bg.animate([{filter:'none',transform:'scale(1)'},{filter:'none',transform:'scale(1.02)',offset:.7},{filter:fin,transform:'scale(1.03)'}],{duration:D,easing:'ease-in-out',fill:'both'});
   if(vl)vl.animate([{opacity:0},{opacity:0,offset:.7},{opacity:1}],{duration:D,easing:'ease-in-out',fill:'both'});R.tails.forEach(t=>t.animate([{opacity:0},{opacity:0,offset:.99},{opacity:1}],{duration:D+900,fill:'both'}))}
  else L.querySelector('.mkbg').animate([{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:700,easing:'ease-out',fill:'both'});
  R.figs.forEach((f,i)=>f.animate([{transform:'translateX(-60px)',opacity:0},{transform:'none',opacity:1}],{duration:520,delay:D+180+i*150,easing:'cubic-bezier(.2,.8,.3,1)',fill:'both'}));
  R.boxes.forEach((b,i)=>b.animate([{transform:'translateX(40px)',opacity:0},{transform:'none',opacity:1}],{duration:360,delay:D+620+i*260,easing:'ease-out',fill:'both'}));return D},
 // drag the OPTION LIST with a visible finger dot: down to the end, then back up (only .opts moves)
 drag(ms,up){const o=window.__R.d.querySelector('.opts');const m=o.scrollHeight-o.clientHeight;if(m<4)return 0;const r=o.getBoundingClientRect();const h=document.createElement('div');h.className='mkhand';document.body.appendChild(h);
  const x=r.left+r.width*.5,y0=r.top+r.height*.78,y1=r.top+r.height*.22;const t0=performance.now();
  const st=()=>{const k=Math.min(1,(performance.now()-t0)/ms),e=k*k*(3-2*k);o.scrollTop=up?m*(1-e):m*e;h.style.left=x+'px';h.style.top=(up?y1+(y0-y1)*e:y0-(y0-y1)*e)+'px';if(k<1)requestAnimationFrame(st);else setTimeout(()=>h.remove(),150)};requestAnimationFrame(st);return m},
 pick(i){const o=window.__R.d.querySelector('.opts');const cs=[...o.querySelectorAll(':scope > button.ka')];const c=cs[i]||cs[0];
  const br=o.getBoundingClientRect(),cr=c.getBoundingClientRect();if(cr.bottom>br.bottom||cr.top<br.top)o.scrollTop+=cr.top-br.top-10;
  setTimeout(()=>{const r=c.getBoundingClientRect();MK3.tap(r.left+r.width*.5,r.top+r.height/2);c.classList.add('mkpick')},250);return 1},
 close(){const R=window.__R;const L=R.L;R.boxes.forEach(b=>b.animate([{opacity:1},{opacity:0,transform:'translateX(30px)'}],{duration:260,fill:'both'}));
  R.figs.forEach(f=>f.animate([{opacity:1},{opacity:0,transform:'translateX(-50px)'}],{duration:380,delay:120,fill:'both'}));
  R.tails.forEach(t=>t.remove());L.animate([{opacity:1},{opacity:0}],{duration:420,delay:260,fill:'both'}).onfinish=()=>{document.getElementById('modal').classList.remove('mkon');try{MK3.restore()}catch(e){};MKX.clear();MKX.closeModal()}}
};`;
const CLIPS=[['A1',0,0],['A1',1,0],['A1',0,1],['A2',0,0],['A2',1,0],['A2',1,1]];
const nm=(v,night,solo)=>`m13-${v}${solo?'-solo':''}${night?'-night':'-day'}`;
(async()=>{const which=process.argv[2]||'both',mode=process.argv[3]||'all';const only=process.argv[4];const b=await chromium.launch();const REP=[];
 for(const [W,H,name] of [[755,1000,'fold'],[1180,820,'ipad']]){if(which!=='both'&&which!==name)continue;
  for(const pass of ['still','video']){if(mode!=='all'&&mode!==pass)continue;const vid=pass==='video';
   for(const [v,night,solo] of CLIPS){const n=nm(v,night,solo);if(only&&!n.includes(only))continue;
   for(let att=0;att<4;att++){
   const vdir=`${OUT}/raw/${name}-${n}`;if(vid){fs.rmSync(vdir,{recursive:true,force:true});fs.mkdirSync(vdir,{recursive:true})}
   const {ctx,p}=await boot(b,W,H,vid?1:2,vid?{recordVideo:{dir:vdir,size:{width:W,height:H}}}:null);const T0=Date.now();
   await p.addScriptTag({content:LIB});await p.addScriptTag({content:MJS});const marks=[];
    for(let t=0;t<5;t++){if(await p.evaluate(({L,solo})=>{window.__mksolo=solo;window.__mkN=(window.__mkN||1)+1;return MKX.openEvent(L)},{L:solo?SOLO:LONG,solo}))break;await p.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(1500)}
    const okd=()=>p.waitForFunction(()=>{const M=document.getElementById('modal');return !M.hidden&&[...M.querySelectorAll('.dlg')].some(x=>x.offsetWidth>0&&x.querySelector('.kpmain')&&/Lệ quý nhân/.test(x.textContent))},null,{timeout:8000}).then(()=>1,()=>0);
    for(let t=0;t<4&&!(await okd());t++){await p.evaluate(({L,solo})=>{try{closeModal()}catch(e){}window.__mksolo=solo;window.__mkN=(window.__mkN||1)+1;return MKX.openEvent(L)},{L:solo?SOLO:LONG,solo});await p.waitForTimeout(800)}await settle(p);
    const r=await p.evaluate(async a=>{try{return await MK3.build(a)}catch(e){return {ex:e.message,st:(e.stack||'').slice(0,300)}}},{v,night,solo});if(!r||r.err||r.ex){console.log('retry',n,name,JSON.stringify(r).slice(0,160));await ctx.close();continue}await settle(p);await p.evaluate(()=>window.__R&&window.__R.apply&&window.__R.apply());await p.waitForTimeout(500);await p.evaluate(()=>window.__R&&window.__R.apply&&window.__R.apply());if(process.env.DBG2)console.log("NIGHT",await p.evaluate(()=>{const L=window.__R.L;return [L.className,getComputedStyle(L.querySelector(".mkbg")).filter,getComputedStyle(L.querySelector(".mkveil")).backgroundColor,getComputedStyle(L.querySelector(".mkveil")).opacity]}));const ck=await p.evaluate(()=>MK3.check());REP.push([n,name,ck]);
    if(!vid){if(process.env.DBG)console.log('TOP',await p.evaluate(()=>{const R=window.__R;R.L.style.visibility='hidden';R.d.style.visibility='hidden';const g=R.L.getBoundingClientRect();const out=[];for(const [fx,fy] of [[.5,.5],[.3,.4],[.5,.9]]){let e=document.elementFromPoint(g.left+g.width*fx,g.top+g.height*fy);const ch=[];while(e&&e!==document.body){const c=getComputedStyle(e);ch.push((e.id?'#'+e.id:'')+'.'+String(e.className&&e.className.baseVal===undefined?e.className:'').split(' ').slice(0,2).join('.')+'['+c.position+','+c.zIndex+']');e=e.parentElement}out.push(ch.join(' < '))}R.L.style.visibility='';R.d.style.visibility='';return out}));await p.waitForTimeout(400);if(v==='A1'){await p.evaluate(()=>MK3.intro(1));await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/${n}-intro-${name}.png`});await p.evaluate(()=>MK3.intro(0));await p.waitForTimeout(300)}await p.screenshot({path:`${OUT}/${n}-${name}.png`});
     const m=await p.evaluate(()=>{const o=window.__R.d.querySelector('.opts');o.scrollTop=1e5;return o.scrollTop});if(m>4){await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/${n}-scrolled-${name}.png`})}
     console.log('still',n,name,JSON.stringify(r),JSON.stringify(ck))}
    else{await p.evaluate(()=>{window.__R.L.style.opacity='0';window.__R.d.style.opacity='0'});await p.waitForTimeout(300);await mark(p);await p.waitForTimeout(500);const s=(Date.now()-T0)/1000;
     await p.evaluate(()=>{window.__R.L.style.opacity='';window.__R.d.style.opacity='';return MK3.open()}).then(D=>p.waitForTimeout(2200+(D||0)));
     const m=await p.evaluate(()=>MK3.drag(2600,false));await p.waitForTimeout(m?3300:400);if(m){await p.evaluate(()=>MK3.drag(1800,true));await p.waitForTimeout(2400)}
     await p.evaluate(()=>MK3.pick(1));await p.waitForTimeout(1300);await p.evaluate(()=>MK3.close());await p.waitForTimeout(1300);
     marks.push([n,(Date.now()-T0)/1000-s+0.5]);console.log('clip',n,name,'scroll',m,JSON.stringify(ck))}
    await p.evaluate(()=>{document.getElementById('modal').classList.remove('mkon');try{MK3.restore()}catch(e){};MKX.clear();MKX.closeModal()});await p.waitForTimeout(500)
   if(p.errs.length)console.log('errors',p.errs.slice(0,4));const vp=vid?await p.video().path():null;await ctx.close();
   if(vid)cut(vp,marks,n=>`${OUT}/${n}-${name}.mp4`,4.6);break}}}}
 fs.writeFileSync(`${OUT}/check-${which}-${mode}.json`,JSON.stringify(REP,null,1));await b.close()})();
