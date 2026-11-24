/* MẪU 2 — Vòng bảo vật. REAL gift dialog (giftpick, jgpick): its REAL item tiles (.kshc .kshpick .kipc, kitItem slot, grade chip, name) are lifted out of the grid onto an ellipse;
   REAL selection (kipSelect → real glow + real detail), REAL confirm button → the REAL painted gift animation. New (KIT REQUEST kitRing, shared with RING-DESIGN): ring layout + inertia swipe. */
window.MOCK=async()=>{const {A,at,E,ctr,wait}=TL;const W=innerWidth,H=innerHeight,LAND=W>H;
 document.querySelectorAll('#kmrew,.kmov,.kmrew').forEach(e=>e.remove());await wait(300);
 const M=document.getElementById('modal');M.style.background='transparent';M.style.backdropFilter='none';
 const ks=['ngocboi','vongngoc','tuithom','aolong','guong','hoadieu','hophuong','khantay','quatcong','nhansam','hopnhac','batcanh'].filter(k=>IT[k]);S.inv.length=0;ks.forEach(k=>S.inv.push({k}));
 const v=rivals.find(r=>r.alive&&!r.out);
 await wait(1200);document.querySelectorAll('#kmrew,.kmov,.kmrew,[id^=kmrew]').forEach(e=>e.remove());await wait(300);
 const cap=E('div','','Mẫu 2 · Vòng bảo vật — vuốt vòng, món ở chính giữa sáng lên; bấm Tặng thì món bay sang người nhận',document.body);cap.style.cssText='position:fixed;left:50%;top:172px;transform:translateX(-50%);z-index:100000;background:rgba(40,16,12,.78);color:#fff;border-radius:999px;padding:5px 16px;font:600 12.5px/1.2 sans-serif;white-space:nowrap;pointer-events:none;opacity:0';
 A(cap,[{opacity:0},{opacity:1,offset:.08},{opacity:1,offset:.95},{opacity:0}],{at:100,dur:11500,ease:'linear'});
 const dyn=(el,kf,o={})=>A(el,kf,Object.assign({},o,{at:TL.now()+(o.dt||0)}));
 const N=9;const Rx=LAND?Math.min(W*.34,400):W*.38,Ry=LAND?H*.12:H*.095,cx=LAND?W*.5:W/2,cy=LAND?H*.64:H*.62,tw=LAND?112:104;
 const pos=(i,r)=>{const th=(i-r)*2*Math.PI/N,c=Math.cos(th),s=Math.sin(th),k=(1+c)/2;return{x:Rx*s,y:Ry*c,sc:.55+.75*Math.pow(k,2.2),z:Math.round(50+c*40),op:.72+.28*k,b:.86+.14*k}};
 const kf=(i,r0,r1,steps=22,ez=t=>1-Math.pow(1-t,3))=>{const a=[];for(let s=0;s<=steps;s++){const t=s/steps,r=r0+(r1-r0)*ez(t),p=pos(i,r);a.push({transform:`translate(${p.x}px,${p.y}px) scale(${p.sc})`,opacity:p.op,filter:`brightness(${p.b})`,zIndex:p.z,offset:t})}return a};
 const p2=(i,r)=>{const p=pos(i,r);return{transform:`translate(${p.x}px,${p.y}px) scale(${p.sc})`,opacity:p.op,filter:`brightness(${p.b})`,zIndex:p.z}};
 let tiles=[],layer,m,idxs=[];
 // 300: real dialog
 at(300,()=>{S.bac=Math.max(S.bac,300);pushDil(mkP("giftpick",{v:v.id}),"Tặng quà");showModal();m=Q[0];const d=M.querySelector('.dlg');d.style.animation='none';dyn(d,[{opacity:0,transform:'translateY(18px) scale(.97)'},{opacity:1,transform:'none'}],{dur:420});});
 // 1500: dialog steps back, ring blooms from the real tiles
 at(1600,()=>{const d=M.querySelector('.dlg');const all=[...M.querySelectorAll('.kipc')];const pick=[];const seen=new Set();all.forEach(t=>{const nm=t.querySelector('.kshn').textContent;const im=t.querySelector('img');if(im&&!(im.complete&&im.naturalWidth>0))return;if(nm==='Quạt lông công')return;if(!seen.has(nm)&&pick.length<N){seen.add(nm);pick.push(t)}});
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
  if(det){const w=det.cloneNode(false);det.parentNode&&0;layer.appendChild(det);det.style.cssText+=`;position:fixed;left:${cx-150}px;top:${LAND?200:180}px;width:300px;z-index:80;opacity:1`;dyn(det,[{opacity:0,transform:'translateY(-14px)'},{opacity:1,transform:'none'}],{dur:380});}
  if(btn){layer.appendChild(btn);btn.style.cssText+=`;position:fixed;left:${cx-70}px;top:${cy+Ry+tw*1.0}px;width:140px;z-index:80;pointer-events:auto`;dyn(btn,[{opacity:0,transform:'translateY(10px) scale(.9)'},{opacity:1,transform:'none'}],{dur:380,ease:'cubic-bezier(.3,1.5,.5,1)'});window.__btn=btn}});
 at(8300,()=>{const b=window.__btn;if(b)b.click();tiles.forEach((w,i)=>dyn(w,[{opacity:w.style.opacity||1},{opacity:0,transform:'scale(.2)'}],{dur:520,dt:i*30}));if(layer)setTimeout(()=>layer.remove(),700)});
 return 12000};
