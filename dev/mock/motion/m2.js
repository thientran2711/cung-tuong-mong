/* MẪU 2 — Vòng bảo vật. REAL gift dialog (giftpick, jgpick): its REAL item tiles (.kshc .kshpick .kipc, kitItem slot, grade chip, name) are lifted out of the grid onto an ellipse;
   REAL selection (kipSelect → real glow + real detail), REAL confirm button → the REAL painted gift animation. New (KIT REQUEST kitRing, shared with RING-DESIGN): ring layout + inertia swipe. */
window.MOCK=async()=>{const {A,at,E,ctr,wait}=TL;const W=innerWidth,H=innerHeight,LAND=W>H;
 document.querySelectorAll('#kmrew,.kmov,.kmrew').forEach(e=>e.remove());await wait(300);
 const M=document.getElementById('modal');M.style.background='transparent';M.style.backdropFilter='none';
 const ks=['ngocboi','vongngoc','tuithom','aolong','guong','hoadieu','hophuong','khantay','quatcong','nhansam','hopnhac','batcanh'].filter(k=>IT[k]);S.inv.length=0;ks.forEach(k=>S.inv.push({k}));
 const v=rivals.find(r=>r.alive&&!r.out);
 const R0=window.render,RS0=window.renderSoon;
 await wait(1200);document.querySelectorAll('#kmrew,.kmov,.kmrew,[id^=kmrew]').forEach(e=>e.remove());await wait(300);
 const cap=E('div','','Mẫu 2 · Vòng bảo vật — vuốt vòng, món ở chính giữa sáng lên; bấm Tặng thì món bay sang người nhận',document.body);cap.style.cssText='position:fixed;left:50%;top:172px;transform:translateX(-50%);z-index:100000;background:rgba(40,16,12,.78);color:#fff;border-radius:999px;padding:5px 16px;font:600 12.5px/1.2 sans-serif;white-space:nowrap;pointer-events:none;opacity:0';
 A(cap,[{opacity:0},{opacity:1,offset:.08},{opacity:1,offset:.95},{opacity:0}],{at:100,dur:11500,ease:'linear'});
 const dyn=(el,kf,o={})=>A(el,kf,Object.assign({},o,{at:TL.now()+(o.dt||0)}));
 const SR=document.getElementById('stage').getBoundingClientRect();const N=9;const Rx=Math.min(SR.width*.36,400),Ry=SR.height*.1,cx=SR.left+SR.width/2,cy=SR.top+SR.height*.66,tw=LAND?112:104;
 const pos=(i,r)=>{const th=(i-r)*2*Math.PI/N,c=Math.cos(th),s=Math.sin(th),k=(1+c)/2;return{x:Rx*s,y:Ry*c,sc:.55+.75*Math.pow(k,2.2),z:Math.round(50+c*40),op:.72+.28*k,b:.86+.14*k}};
 const kf=(i,r0,r1,steps=22,ez=t=>1-Math.pow(1-t,3))=>{const a=[];for(let s=0;s<=steps;s++){const t=s/steps,r=r0+(r1-r0)*ez(t),p=pos(i,r);a.push({transform:`translate(${p.x}px,${p.y}px) scale(${p.sc})`,opacity:p.op,filter:`brightness(${p.b})`,zIndex:p.z,offset:t})}return a};
 const p2=(i,r)=>{const p=pos(i,r);return{transform:`translate(${p.x}px,${p.y}px) scale(${p.sc})`,opacity:p.op,filter:`brightness(${p.b})`,zIndex:p.z}};
 let tiles=[],layer,m,idxs=[];
 // 300: real dialog
 at(250,()=>{window.render=()=>{};window.renderSoon=()=>{}});
 at(300,()=>{S.bac=Math.max(S.bac,999);pushDil(mkP("giftpick",{v:v.id}),"Tặng quà");showModal();m=Q[0];const d=M.querySelector('.dlg');d.style.animation='none';dyn(d,[{opacity:0,transform:'translateY(18px) scale(.97)'},{opacity:1,transform:'none'}],{dur:420});});
 // 1500: dialog steps back, ring blooms from the real tiles
 at(1600,()=>{const d=M.querySelector('.dlg');const all=[...M.querySelectorAll('.kipc')];all.forEach(t=>t.classList.remove('kshno'));const pick=[];const seen=new Set();all.forEach(t=>{const nm=t.querySelector('.kshn').textContent;const im=t.querySelector('img');if(im&&!(im.complete&&im.naturalWidth>0))return;if(nm==='Quạt lông công')return;if(!seen.has(nm)&&pick.length<N){seen.add(nm);pick.push(t)}});
  layer=E('div','',null,M);layer.style.cssText='position:fixed;inset:0;z-index:60;pointer-events:none';
  const grid=M.querySelector('.kipw'),g0=M.querySelector('.kipg');
  pick.forEach((t,i)=>{const w1=grid.cloneNode(false),w2=g0.cloneNode(false);w1.style.cssText='position:fixed;left:0;top:0;width:'+tw+'px;display:block;margin:0;padding:6px;border:2px solid #b8901c;border-radius:14px;background:linear-gradient(#fffaf0,#f1e2c6);box-shadow:0 6px 14px rgba(50,15,8,.35);grid-column:auto';t.querySelectorAll('.kshe').forEach(e=>e.style.display='none');w2.style.cssText='display:block;margin:0;padding:0;border:0;background:none;width:100%';w2.appendChild(t);w1.appendChild(w2);layer.appendChild(w1);t.style.width='100%';t.style.margin='0';
   w1.style.left=(cx-tw/2)+'px';w1.style.top=(cy-60)+'px';w1.style.opacity=0;tiles.push(w1);idxs.push(+t.dataset.kip);
   dyn(w1,[{opacity:0,transform:'translate(0,0) scale(.1)'},p2(i,0)],{dur:620,dt:i*55,ease:'cubic-bezier(.2,1.4,.4,1)'})});
  dyn(d,[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(40px) scale(.96)'}],{dur:420});
  // real selection of tile 0
  try{kipSelect(M,m,idxs[0])}catch(e){console.error(e)}
 });
 // 3000 swipe 1 (2 slots), 4700 swipe 2 (back to slot index 4)
 at(3000,()=>{tiles.forEach((w,i)=>dyn(w,kf(i,0,2),{dur:1100,ease:'linear'}));setTimeout(()=>{try{kipSelect(M,m,idxs[2])}catch(e){}},1050);
  const f=E('div','',null,layer);f.style.cssText=`position:fixed;width:46px;height:46px;border-radius:50%;border:3px solid rgba(255,255,255,.95);background:rgba(255,230,170,.35);box-shadow:0 0 0 6px rgba(255,214,120,.35);left:${cx+Rx*.6}px;top:${cy+Ry+70}px;opacity:0;z-index:70`;
  dyn(f,[{opacity:0,left:(cx+Rx*.6)+'px'},{opacity:1,left:(cx+Rx*.6)+'px',offset:.15},{opacity:1,left:(cx-Rx*.3)+'px',offset:.8},{opacity:0,left:(cx-Rx*.45)+'px'}],{dur:1000,ease:'ease-in-out'});});
 at(4900,()=>{tiles.forEach((w,i)=>dyn(w,kf(i,2,-1),{dur:1200,ease:'linear'}));setTimeout(()=>{try{kipSelect(M,m,idxs[(N-1)%N])}catch(e){}},1150);
  const f=E('div','',null,layer);f.style.cssText=`position:fixed;width:46px;height:46px;border-radius:50%;border:3px solid rgba(255,255,255,.95);background:rgba(255,230,170,.35);box-shadow:0 0 0 6px rgba(255,214,120,.35);left:${cx-Rx*.5}px;top:${cy+Ry+70}px;opacity:0;z-index:70`;
  dyn(f,[{opacity:0,left:(cx-Rx*.5)+'px'},{opacity:1,left:(cx-Rx*.5)+'px',offset:.15},{opacity:1,left:(cx+Rx*.5)+'px',offset:.8},{opacity:0,left:(cx+Rx*.6)+'px'}],{dur:1000,ease:'ease-in-out'});});
 // 7000: real detail + real confirm appear, then press confirm → real gift animation
 at(6700,()=>{const det=M.querySelector('.kipd'),btn=[...M.querySelectorAll('.dlg .row .main, .dlg button.main')][0]||M.querySelector('.dlg .kbtn');
  if(det){const w=det.cloneNode(false);det.parentNode&&0;layer.appendChild(det);det.style.cssText+=`;position:fixed;left:${cx-Math.min(150,SR.width*.45)}px;top:${SR.top+SR.height*.04}px;width:${Math.min(300,SR.width*.9)}px;z-index:80;opacity:1`;dyn(det,[{opacity:0,transform:'translateY(-14px)'},{opacity:1,transform:'none'}],{dur:380});}
  if(btn){layer.appendChild(btn);btn.style.cssText+=`;position:fixed;left:${cx-70}px;top:${cy+Ry+tw*1.0}px;width:140px;z-index:80;pointer-events:auto`;dyn(btn,[{opacity:0,transform:'translateY(10px) scale(.9)'},{opacity:1,transform:'none'}],{dur:380,ease:'cubic-bezier(.3,1.5,.5,1)'});window.__btn=btn}});
 at(8300,()=>{const w=tiles[N-1];const rc=w.getBoundingClientRect();const tx=SR.left+SR.width*.74,ty=SR.top+SR.height*.42;const dx=tx-(rc.left+rc.width/2),dy=ty-(rc.top+rc.height/2);const N0=TL.now();
  dyn(window.__btn,[{transform:'scale(1)'},{transform:'scale(.92) translateY(3px)'},{transform:'scale(1)'}],{dur:240});
  dyn(w,[{opacity:1,transform:p2(N-1,-1).transform},{opacity:1,transform:`translate(${dx*.4}px,${dy*.4-90}px) scale(1.25) rotate(-6deg)`,offset:.4},{opacity:1,transform:`translate(${dx*.8}px,${dy*.85}px) scale(.8) rotate(8deg)`,offset:.8},{opacity:0,transform:`translate(${dx}px,${dy}px) scale(.3)`}],{dur:900,dt:300,ease:'cubic-bezier(.4,0,.3,1)'});
  tiles.forEach((t,i)=>{if(i!==N-1)dyn(t,[{opacity:1},{opacity:0,transform:'scale(.2)'}],{dur:520,dt:i*30})});
  [window.__btn,document.querySelector('.kipd')].forEach(e=>e&&dyn(e,[{opacity:1},{opacity:0}],{dur:300,dt:200}));
  for(let i=0;i<7;i++){const h=E('div','','♥',document.body);h.style.cssText=`position:fixed;left:${tx}px;top:${ty}px;color:#d9546a;font-size:${16+TL.rnd()*12}px;opacity:0;z-index:99990;pointer-events:none`;dyn(h,[{opacity:0,transform:'translate(0,0) scale(.5)'},{opacity:1,offset:.25},{opacity:0,transform:`translate(${(i-3)*14}px,${-70-TL.rnd()*60}px) scale(1.1)`}],{dur:1100,dt:1100+i*70})}
  setTimeout(()=>{const b=rsnap();S.sung+=3;S.th=(S.th||0);resultShow('Tặng quà cho Bành quý nhân',b,true);document.querySelectorAll('.kipw').forEach(e=>0)},1300);
  setTimeout(()=>{try{Q.length=0;M.hidden=true}catch(e){}if(layer)layer.remove()},1500);});
 at(11600,()=>{window.render=R0;window.renderSoon=RS0});
 return 12000};
