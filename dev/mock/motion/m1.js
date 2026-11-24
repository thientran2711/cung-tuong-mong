/* MẪU 1 — Bàn bài. REAL kit dialog + REAL option cards (.opt kart, moved out of the list into a fan); the event card = the real .dlg; the result = the real result card (resultShow, real seal).
   New (KIT REQUEST kitHand): the card shell (back + face frame) and the deal / lift / fly motion. */
window.MOCK=async()=>{const {A,at,E,ctr,wait}=TL;const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';const W=innerWidth,H=innerHeight,LAND=W>H;
 const M=document.getElementById('modal');M.style.background='transparent';M.style.backdropFilter='none';
 const cap=E('div','','Mẫu 1 · Bàn bài — việc đến như một lá bài, lựa chọn xòe như bài trên tay',document.body);cap.style.cssText='position:fixed;left:50%;top:172px;transform:translateX(-50%);z-index:100000;background:rgba(40,16,12,.78);color:#fff;border-radius:999px;padding:5px 16px;font:600 12.5px/1.2 sans-serif;white-space:nowrap;pointer-events:none;opacity:0';
 A(cap,[{opacity:0},{opacity:1,offset:.08},{opacity:1,offset:.95},{opacity:0}],{at:100,dur:11500,ease:'linear'});
 { const U=CDN+'ev-cung-nhan.webp';await new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=U});window.evArt=()=>U}
 const dyn=(el,kf,o={})=>A(el,kf,Object.assign({},o,{at:TL.now()+(o.dt||0)}));
 const SR=document.getElementById('stage').getBoundingClientRect();const cw=Math.max(150,Math.min(215,SR.width*.3)),ch=cw*1.22;const HX=SR.left+SR.width/2,HY=SR.top+SR.height*.68;const sp=cw*(LAND?1.02:.93);
 const px=SR.right-cw*.7-12,py=SR.top+10;
 const fan=(i)=>({x:(i-1)*sp,y:Math.abs(i-1)*cw*.08,r:(i-1)*12});
 let cards=[],pile=[],dlgEl;
 // ---- build state at t=300 ----
 at(300,()=>{pushModal({t:'Quý nhân mời nàng thưởng trà',h:'<p>Bành quý nhân dừng bên lối hoa, mỉm cười hỏi thăm. Nàng đáp thế nào cho phải đạo?</p>',opts:[{n:'Nhận lời, ngồi xuống dùng trà.',fx:{sung:3,suc:-3}},{n:'Khéo từ chối, đưa túi thơm.',fx:{danh:2,bac:-10}},{n:'Dò hỏi chuyện trong cung.',fx:{tamco:1,danh:-1}}]});showModal();
  dlgEl=M.querySelector('.dlg');dlgEl.style.animation='none';dyn(dlgEl,[{opacity:0,transform:'translateY(18px) scale(.97)'},{opacity:1,transform:'none'}],{dur:420});});
 // ---- 1400: event stays; opts leave the list and become the hand (dealt from pile) ----
 at(1600,()=>{const ops=[...M.querySelectorAll('.opts .opt')];const optsBox=M.querySelector('.opts');
  const layer=E('div','',null,M);layer.id='mhl';layer.style.cssText='position:fixed;inset:0;z-index:60;pointer-events:none';
  // pile (card backs)
  for(let i=0;i<3;i++){const p=E('div','',null,layer);p.style.cssText=`position:fixed;width:${cw*.7}px;height:${ch*.7}px;left:${px-i*3}px;top:${py-i*3}px;border-radius:12px;background:url(${CDN}kit/card-back.webp) center/cover;box-shadow:0 6px 14px rgba(50,15,8,.4);opacity:0;transform:rotate(-3deg)`;pile.push(p);dyn(p,[{opacity:0,transform:'translate(40px,-20px) rotate(8deg)'},{opacity:1,transform:'rotate(-3deg)'}],{dur:420,dt:i*80})}
  // event card (the real dialog) moves up
  const moveUp=(LAND?-(H*.0):-(H*.0));
  ops.forEach((o,i)=>{const wrap=optsBox.cloneNode(false);wrap.style.cssText='display:block;width:100%;height:100%;margin:0;padding:0;border:0;background:none';
   const hw=E('div','',null,layer);hw.style.cssText=`position:fixed;width:${cw}px;height:${ch}px;left:${HX-cw/2}px;top:${HY-ch/2}px;opacity:0;perspective:900px;transform-style:preserve-3d`;
   const face=E('div','',null,hw);face.style.cssText='position:absolute;inset:0;backface-visibility:hidden;transform:rotateY(180deg);border-radius:12px;overflow:hidden;background:linear-gradient(#fffaf0,#f6ead6);border:3px solid #b8901c;box-shadow:0 8px 20px rgba(50,15,8,.45),inset 0 0 0 2px #f4e2b0;padding:6px;display:flex;align-items:stretch';
   const back=E('div','',null,hw);back.style.cssText=`position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;background:url(${CDN}kit/card-back.webp) center/cover;box-shadow:0 6px 16px rgba(50,15,8,.4)`;
   face.appendChild(wrap);wrap.appendChild(o);o.style.cssText+=';width:100%;margin:0;flex-direction:column;align-items:stretch;height:100%;box-shadow:none;border:0;background:transparent';
   cards.push({hw,face,back});});
  // layout of the shrunken dialog: centre it higher
  const r=dlgEl.getBoundingClientRect();const tgt={x:(SR.left+SR.width/2)-(r.left+r.width/2),y:-(r.top+r.height/2-(SR.top+SR.height*.3)),s:Math.min(.88,SR.width*.94/r.width)};
  dyn(dlgEl,[{transform:'none'},{transform:`translate(${tgt.x}px,${tgt.y}px) scale(${tgt.s})`}],{dur:600,ease:'cubic-bezier(.22,.9,.28,1)'});
  cards.forEach((c,i)=>{const f=fan(i);const sx=px+cw*.35-HX,sy=py+ch*.35-HY;
   dyn(c.hw,[{opacity:1,transform:`translate(${sx}px,${sy}px) scale(.5) rotate(18deg)`},{opacity:1,transform:`translate(${f.x}px,${f.y}px) scale(1) rotate(${f.r}deg)`}],{dur:620,dt:500+i*190});
   dyn(c.face,[{transform:'rotateY(180deg)'},{transform:'rotateY(0deg)'}],{dur:520,dt:1500+i*170,ease:'cubic-bezier(.5,0,.2,1)'});
   dyn(c.back,[{transform:'rotateY(0deg)'},{transform:'rotateY(-180deg)'}],{dur:520,dt:1500+i*170,ease:'cubic-bezier(.5,0,.2,1)'});});
  pile.forEach((p,i)=>dyn(p,[{opacity:1},{opacity:0}],{dur:300,dt:1500+i*100}));
 });
 // ---- hover 2nd card ----
 at(4800,()=>{const f=fan(1),c=cards[1];dyn(c.hw,[{transform:`translate(${f.x}px,${f.y}px)`},{transform:`translate(${f.x}px,${f.y-cw*.2}px) scale(1.1)`}],{dur:360,ease:'cubic-bezier(.3,1.5,.5,1)'});
  c.hw.style.zIndex=5;c.hw.style.boxShadow='0 0 28px 8px rgba(255,214,120,.85)';c.hw.style.borderRadius='14px';
  [0,2].forEach(i=>{const g=fan(i);dyn(cards[i].hw,[{transform:`translate(${g.x}px,${g.y}px) rotate(${g.r}deg)`},{transform:`translate(${g.x*1.1}px,${g.y+8}px) rotate(${g.r*1.25}deg) scale(.96)`}],{dur:360});cards[i].face.style.filter='brightness(.9)'});});
 // ---- choose: card 2 to centre, others fall; then the REAL choice runs and the REAL result card appears ----
 at(6200,()=>{const f=fan(1);dyn(cards[1].hw,[{transform:`translate(${f.x}px,${f.y-cw*.2}px) scale(1.1)`},{transform:`translate(0px,${SR.top+SR.height*.45-HY}px) scale(1.3)`}],{dur:520});
  [0,2].forEach((i,k)=>{const g=fan(i);dyn(cards[i].hw,[{opacity:1,transform:`translate(${g.x*1.1}px,${g.y+8}px) rotate(${g.r*1.25}deg) scale(.96)`},{opacity:0,transform:`translate(${g.x*1.7}px,${g.y+ch*.9}px) rotate(${g.r*2.4}deg) scale(.9)`}],{dur:520,dt:k*80,ease:'cubic-bezier(.5,0,.9,.4)'})});
  dyn(dlgEl,[{opacity:1},{opacity:0}],{dur:380,dt:100});});
 at(7000,()=>{const lay=document.getElementById('mhl');dyn(cards[1].hw,[{opacity:1,transform:`translate(0px,${SR.top+SR.height*.45-HY}px) scale(1.3)`},{opacity:0,transform:`translate(0px,${SR.top+SR.height*.6-HY}px) scale(.8)`}],{dur:420,ease:'ease-in'});
  setTimeout(()=>{const b=rsnap();chooseM(1);try{S.sung+=3;S.suc-=3}catch(e){}resultShow('Quý nhân mời nàng thưởng trà',rsnap()&&b,true)},300);});
 at(10800,()=>{const lay=document.getElementById('mhl');if(lay)lay.remove()});
 return 11600};
