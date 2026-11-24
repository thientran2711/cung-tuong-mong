/* INTRO-DESIGN storyboard mock (prototype only; the final parts are built by the kit keeper KK16).
   Deterministic timeline: IM.load(clipId, device) builds the overlay on top of the REAL game page, IM.seek(ms) draws the exact frame at time ms.
   Figures and backgrounds are the game's own files (CDN img/…); nothing new is drawn. All positions are fractions of the overlay. */
window.IM=(function(){
const ASSET='http://127.0.0.1:8766/assets/';
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const EASE={lin:t=>t,io:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,out:t=>1-Math.pow(1-t,3),in:t=>t*t*t,back:t=>{const c=1.5;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)},soft:t=>t*t*(3-2*t)};
function kv(kf,t){if(!kf)return undefined;if(t<=kf[0][0])return kf[0][1];for(let i=1;i<kf.length;i++){if(t<=kf[i][0]){const a=kf[i-1],b=kf[i];const e=EASE[b[2]||'io'];return a[1]+(b[1]-a[1])*e((t-a[0])/Math.max(1,b[0]-a[0]))}}return kf[kf.length-1][1]}
let ov,W,H,dev,tracks,texts,cues,dur,imgs={};
const FONT='"Be Vietnam Pro",system-ui,sans-serif',SERIF='"Noto Serif","Noto Serif SC","Songti SC",Georgia,serif';
function el(tag,css,parent,html){const e=document.createElement(tag);if(css)e.style.cssText=css;if(html!=null)e.innerHTML=html;(parent||ov).appendChild(e);return e}
/* track an element: props x,y (px), s, o, blur, br(ightness), sat, clipB / clipT (fraction of its height hidden at bottom/top), rot */
function T(e,p,origin){e.style.transformOrigin=origin||'50% 100%';e.style.willChange='transform,opacity,filter';tracks.push({e,p});return e}
function applyTracks(t){for(const {e,p} of tracks){const x=kv(p.x,t)||0,y=kv(p.y,t)||0,s=p.s?kv(p.s,t):1,r=p.r?kv(p.r,t):0;e.style.transform=`translate(${x}px,${y}px) scale(${s}) rotate(${r}deg)`;
 if(p.o)e.style.opacity=kv(p.o,t);const f=[];if(!e._bg){if(p.br){const b=kv(p.br,t);if(b<.97){const k=Math.max(0,Math.min(1,(.97-b)/.6));f.push(`brightness(${(1-.16*k).toFixed(3)})`,`saturate(${(1-.25*k).toFixed(3)})`)}}}
 if(p.sil){const b=kv(p.sil,t);if(b>0.01)f.push(`brightness(${(1-b).toFixed(3)}) sepia(${(b*.35).toFixed(2)})`)}
 if(f.length)e.style.filter=f.join(' ');else e.style.filter='none';
 if(p.clipB||p.clipT){const cb=p.clipB?kv(p.clipB,t):0,ct=p.clipT?kv(p.clipT,t):0;{const m=`linear-gradient(#000 ${((1-cb)*100-14).toFixed(1)}%,transparent ${((1-cb)*100).toFixed(1)}%)`;e.style.webkitMaskImage=cb>0.001?m:'none';e.style.maskImage=cb>0.001?m:'none'}}}}
/* typewriter: str typed from t0 at ms per char (pause after , ; — … . !) */
function typer(box,t0,str,cps){cps=cps||34;const times=[];let t=t0;for(const ch of str){times.push(t);t+=cps+(',;'.includes(ch)?110:'—…'.includes(ch)?160:'.!?'.includes(ch)?260:0)}return {box,t0,str,times,end:t}}
function typeAt(tp,sub){const i=tp.str.indexOf(sub);return i<0?tp.t0:tp.times[i]}
function updTexts(t){for(const tp of texts){let n=0;while(n<tp.times.length&&tp.times[n]<=t)n++;const s=tp.str.slice(0,n);const cur=n<tp.str.length&&t>=tp.t0?'<i class=cur></i>':'';tp.box.innerHTML=t<tp.t0?'':s+cur}}
function load(clipId,device){return new Promise(async res=>{dev=device;const g=document.getElementById('game').getBoundingClientRect();
 const st=document.getElementById('stage').getBoundingClientRect();
 const stg=document.getElementById('stage');W=st.width;H=st.height;
 const old=document.getElementById('intro-ov');if(old)old.remove();
 ov=document.createElement('div');ov.className='kscn kscn-clear';ov.id='intro-ov';ov.style.cssText=`position:absolute;left:0;top:0;width:${W}px;height:${H}px;overflow:hidden;z-index:99999;background:transparent;border-radius:0;font-family:${FONT};color:#3a2410`;stg.appendChild(ov);{let hs=document.getElementById('intro-hide');if(!hs){hs=document.createElement('style');hs.id='intro-hide';document.head.appendChild(hs)}hs.textContent=clipId==='E2'?'#stage>.stop,#stage>.kpname,#stage>.krail,#stage>.ksh,#stage>.kmemark,#stage>.kmfly{visibility:hidden!important}':'#stage>*:not(#intro-ov){visibility:hidden!important}'}
 tracks=[];texts=[];cues=[];
 const css=el('style','',ov,`#intro-ov i.cur{display:inline-block;width:2px;height:1em;background:#8f5f0c;margin-left:2px;vertical-align:-2px;animation:none}#intro-ov *{box-sizing:border-box}`);
 const need=['end-bg-throne.webp','ngu-hoa-vien-xuan-sang.webp','fig-emperor-a26-1.webp','fig-thaihau-h1-a51.webp','fig-consort-c03-t8-a36.webp','fig-eunuch-u01-a51.webp','fig-player-look1-t1-a18.webp','fig-consort-c01-t1-a18.webp','fig-consort-c02-t1-a18.webp','fig-consort-c04-t1-a18.webp','fig-consort-c05-t1-a18.webp','fig-consort-c06-t1-a18.webp','fig-consort-c07-t1-a18.webp','fig-consort-c02-t3-a26.webp','fig-consort-c03-t1-a18.webp','fig-consort-c08-t1-a18.webp','fig-consort-c09-t1-a18.webp','fig-consort-c10-t1-a18.webp','fig-consort-c11-t1-a18.webp','fig-consort-c10-t1-a51.webp','fig-mama-k01-a51.webp','unknown-fig-f.webp','fig-eunuch-ndp-tray.webp','item-tuithom.webp','item-tp-bhoa-b1.webp'];
 await Promise.all(need.map(n=>new Promise(ok=>{const im=new Image();im.onload=()=>{imgs[n]=im;ok()};im.onerror=ok;im.src=ASSET+n})));
 dur=CLIPS[clipId]();seek(0);res({dur,W,H})})}
function seek(t){applyTracks(t);updTexts(t)}
/* ---------- building blocks ---------- */
const asp=n=>{const i=imgs[n];return i?i.naturalWidth/i.naturalHeight:.4};
/* figure: cx = centre x (fraction of W), feet = feet y (fraction of H), h = height (fraction of H) */
function fig(name,cx,feet,h,parent,z){const hh=h*H,ww=hh*asp(name);const d=el('div',`position:absolute;left:${cx*W-ww/2}px;top:${feet*H-hh}px;width:${ww}px;height:${hh}px;z-index:${z||5}`,parent);el('img',`width:100%;height:100%;display:block;pointer-events:none`,d).src=ASSET+name;d._w=ww;d._h=hh;d._cx=cx*W;d._feet=feet*H;return d}
function bg(name,parent,focusX,focusY){const d=el('div',`position:absolute;inset:-4%;z-index:1;background:url(${ASSET}${name}) ${focusX||50}% ${focusY||50}%/cover`,parent);d._bg=1;return d}
function shade(parent,color,z){return el('div','display:none',parent)}
function vignette(z){return el('div','display:none')}
/* bottom text box in the kit's cream-paper look (placeholder for kitDialogue box): speaker tab + typed line */
function textBox(speaker,pos,extra){const w=Math.min(W-16,640),h=96;const x=pos==='right'?W-w-8:pos==='left'?8:(W-w)/2;const tx=document.createElement('div');tx.style.cssText=`font:500 15px/1.5 ${FONT};color:#3a2410;min-height:46px`;
 const b=kitDlgBox(ov,speaker,[tx],{x:x,y:pos==='mid'?H*.58:H-h-8,w:w,h:h},null);b.style.zIndex=60;b._tx=tx;return b}
/* name plaque: calligraphy-like title + origin line; kind h = horizontal plaque, v = vertical strip */
function plate(title,sub,o){o=o||{};const sc=o.v?1.6:(o.fs&&o.fs>=20?1.45:1.15);const org=o.v?((o.css||'').includes('right:')?'100% 0':'0 0'):'50% 0';
 const d=document.createElement('span');d.className='tok';d.style.cssText=`position:absolute;z-index:55;display:flex;justify-content:center;background:none;border:0;padding:0;margin:0;pointer-events:none;height:auto;width:auto;bottom:auto;${o.css||''}`;
 const col=o.col||'#a8742f';d.innerHTML=`<span class="tag" style="--tc:${col};max-width:none;white-space:nowrap;transform:scale(${sc});transform-origin:${org}">${sub?`<span class="j59t" style="--tc:${col};--rt:#8f5f0c">${sub}</span>`:''}<span class="j59n" style="--tc:${col}">${title}</span></span>`;ov.appendChild(d);return d}
function chipEl(label,css){const d=document.createElement('span');d.style.cssText=`position:absolute;z-index:56;${css||''}`;d.innerHTML=kitChip(label);ov.appendChild(d);return d}
const seal=(txt,css)=>el('div',`position:absolute;z-index:56;width:44px;height:44px;border-radius:8px;background:#b3261a;color:#ffe9b8;font:800 20px/44px ${SERIF};text-align:center;border:2px solid #e3b04b;box-shadow:0 2px 8px rgba(0,0,0,.5);${css||''}`,null,txt);
function skipChip(){return chipEl('Chạm: xem tiếp · giữ: bỏ qua','right:8px;top:8px;z-index:70')}
const fade=(a,b,c,d)=>[[a,0],[b,1,'out'],[c,1],[d,0,'io']];
/* geometry by device */
const G=()=>({sp:.3,gs:.2,royY:.47,royH:.34,girlH:.46,girlFeet:(dev==='ipad'?.69:.77),faceH:1.5});
/* ===== A: ROYAL REVEAL ===== */
function royalScene(){const g=G(),root=el('div','position:absolute;inset:0;overflow:hidden;z-index:0;isolation:isolate');
 const cam=el('div','position:absolute;inset:0;transform-origin:0 0;z-index:1',root);
 const bgl=bg('end-bg-throne.webp',cam,50,40);
 const names=['unknown-fig-f.webp','unknown-fig-f.webp','unknown-fig-f.webp','fig-player-look1-t1-a18.webp'];
 const gx=[-1.5,-.5,.5,1.5].map(k=>.5+k*g.gs);const girls=names.map((n,i)=>fig(n,gx[i],g.girlFeet,g.girlH,cam,10+i));
 const seats={e:[.5,g.royY,g.royH],t:[.5-g.sp,g.royY+.03,g.royH-.03],h:[.5+g.sp,g.royY+.03,g.royH-.03]};
 const roy={e:fig('fig-emperor-a26-1.webp',seats.e[0],seats.e[1],seats.e[2],cam,8),t:fig('fig-thaihau-h1-a51.webp',seats.t[0],seats.t[1],seats.t[2],cam,8),h:fig('fig-consort-c03-t8-a36.webp',seats.h[0],seats.h[1],seats.h[2],cam,8)};
 return {root,cam,bgl,girls,roy,seats,gx}}
const THINK={e:'Người ngồi giữa, long bào vàng rực… hẳn là Hoàng thượng.',t:'Bên trái, phu nhân tóc đã điểm bạc, dáng uy nghi — ắt là Thái hậu.',h:'Bên phải, vị nương nương đoan trang, phượng quán trên đầu — chính là Hoàng hậu.'};
const CUE={e:'Hoàng thượng',t:'Thái hậu',h:'Hoàng hậu'};
const PL={e:['Hoàng thượng','Chí tôn thiên hạ'],t:['Thái hậu','Mẫu nghi thiên hạ'],h:['Hoàng hậu','Chủ lục cung']};
/* NOTE: A1/A2 are implemented by the generic builder below (A) to keep timing readable */
function buildA(mode){const S=royalScene();const g=G();const ids=['e','t','h'];const sh=shade(S.root,'#1c0c0a',20);
 const box=textBox('Ta nghĩ thầm',null,'TÂM NIỆM');
 const girlIn=2300;S.girls.forEach((f,i)=>T(f,{y:[[200+i*300,H*.4],[1700+i*300,0,'out']],o:[[200+i*300,0],[900+i*300,1,'out']]}));
 T(box,{o:[[girlIn,0],[girlIn+450,1,'out']]});
 const shK=[[0,0],[1000,.4,'io']];let t=girlIn+500;const hold=[];
 const blurK=[[0,0],[1000,3]];
 const seatO={};const clones=[];
 const skip=skipChip();T(skip,{o:[[girlIn,0],[girlIn+500,1,'out']]});
 ids.forEach((id,i)=>{const f=S.roy[id];const topY=f._feet-f._h;const src=id==='e'?'fig-emperor-a26-1.webp':id==='t'?'fig-thaihau-h1-a51.webp':'fig-consort-c03-t8-a36.webp';
  const th=typer(box._tx,t,THINK[id],34);texts.push(th);const cue=typeAt(th,CUE[id])+100;
  const bigS=(g.faceH*H)/f._h,openAt=1500,ld=cue+700+openAt+900;
  const cp=fig(src,f._cx/W,f._feet/H,f._h/H,S.root,40);cp.style.left=(f._cx-f._w/2)+'px';cp.style.top=topY+'px';
  if(mode==='A1'){
   T(cp,{x:[[cue,0],[cue+700,W/2-f._cx,'out'],[cue+700+openAt,W/2-f._cx,'lin'],[ld,0,'io']],y:[[cue,0],[cue+700,H*.035-topY,'out'],[cue+700+openAt,H*.035-topY,'lin'],[ld,0,'io']],s:[[cue,1],[cue+700,bigS,'out'],[cue+700+openAt,bigS,'lin'],[ld,1,'io']],o:[[cue,0],[cue+380,1,'out'],[ld+40,1],[ld+120,0]],clipB:[[cue,0],[cue+700,.48,'out'],[cue+700+openAt-200,.48,'lin'],[cue+700+openAt+500,0,'io']]},'50% 0%');
   const pl=plate(PL[id][0],PL[id][1],{v:true,css:`${id==='h'?'left':'right'}:${dev==='ipad'?W*.17:16}px;top:${H*.1}px`,fs:dev==='ipad'?40:32});T(pl,{o:[[cue+250,0],[cue+800,1,'out'],[cue+700+openAt+300,1],[cue+700+openAt+800,0]],y:[[cue+250,-14],[cue+800,0,'out']]},'50% 0%')
  }else{ /* A2: the camera itself pushes in on the seat, then pulls back; figure stays on its seat; plaque under feet */
   const ft=f._cx,tp=topY;const camS=g.faceH*H/f._h*0.9;
   T(S.cam,{s:[[cue-100,1],[cue+800,camS,'out'],[cue+800+openAt,camS,'lin'],[ld,1,'io']],x:[[cue-100,0],[cue+800,W/2-ft*camS,'out'],[cue+800+openAt,W/2-ft*camS,'lin'],[ld,0,'io']],y:[[cue-100,0],[cue+800,H*.04-tp*camS,'out'],[cue+800+openAt,H*.04-tp*camS,'lin'],[ld,0,'io']]},'0 0');
   const pl=plate(PL[id][0]+'  ·  '+PL[id][1],'',{css:`left:${W*.5-170}px;bottom:${H*.25}px;width:340px`,fs:18});T(pl,{o:[[cue+500,0],[cue+1100,1,'out'],[cue+800+openAt,1],[ld-100,0]],y:[[cue+500,10],[cue+1100,0,'out']]},'50% 0%')
  }
  /* seat copy: A1 hidden until clone lands; A2 emerges with a soft rise at cue */
  if(mode==='A1')T(f,{o:[[0,0],[ld,0],[ld+60,1,'lin']]});
  else T(f,{o:[[0,0],[cue,0],[cue+500,1,'out']],y:[[cue,14],[cue+500,0,'out']],br:[[cue,.5],[cue+900,1,'out']]});
  if(mode==='A1')cp.style.display='';else cp.style.display='none';
  hold.push([cue,ld]);t=Math.max(th.end+300,ld+500);
  /* fade the previous thought text before the next */
  texts.push({box:null})});
 texts=texts.filter(x=>x.box);texts.forEach((tp,i)=>{tp.win=[tp.t0,i<texts.length-1?texts[i+1].t0:1e9]});
 /* dim / blur schedule: on during each close-up, relaxed between */
 const so=[[0,0],[900,.34,'io']],bl=[[0,0],[900,2.5,'io']];hold.forEach(([c,l])=>{so.push([c-50,.34],[c+500,mode==='A1'?.7:.55,'io'],[l-300,mode==='A1'?.7:.55],[l+500,.34,'io']);bl.push([c-50,2.5],[c+500,mode==='A1'?9:5,'io'],[l-300,mode==='A1'?9:5],[l+500,2.5,'io'])});
 T(sh,{o:so});T(S.bgl,{blur:bl},'50% 50%');
 /* girls are dimmed during a close-up so the eye goes to the royal */
 const gb=[[0,1]];hold.forEach(([c,l])=>gb.push([c-50,1],[c+500,.42,'io'],[l-200,.42],[l+500,1,'io']));S.girls.forEach(f=>T(f,{br:gb,blur:bl}));
 const lt=hold[hold.length-1][1]+3000;
 /* final hint */
 T(box,{o:[[girlIn,0],[girlIn+450,1,'out'],[lt-900,1],[lt-300,0]]});
 vignette();return lt}
/* ===== B: SELF-INTRODUCTION in the yard ===== */
function buildB(mode){const g=G();const root=el('div','position:absolute;inset:0;overflow:hidden;z-index:0;isolation:isolate');const bgl=bg('ngu-hoa-vien-xuan-sang.webp',root,50,50);
 const nm=['unknown-fig-f.webp','fig-consort-c04-t1-a18.webp','unknown-fig-f.webp','unknown-fig-f.webp'];const cx=[-1.5,-.5,.5,1.5].map(k=>.5+k*.2);
 const ph=dev==='ipad'?.6:.66,feet=(dev==='ipad'?.69:.77);
 const F=nm.map((n,i)=>fig(n,cx[i],feet,ph,root,10+i));const sp=F[1];const sh=shade(root,'#1c0c0a',20);
 const sk=skipChip();
 const line='Tiểu nữ họ Khổng, tên Lan, người Giang Nam. Nhà làm quan nhỏ, nay may mắn vào cung ra mắt các tỷ muội.';
 const t0=2600;const box=textBox('Khổng Thị Lan',null,'TỰ BẨM');const tp=typer(box._tx,t0+1900,line,34);texts.push(tp);
 T(box,{o:[[t0,0],[t0+500,1,'out'],[tp.end+1800,1],[tp.end+2300,0]]});
 const end=tp.end+2900;
 /* idle: the girls sway slightly (breath) */
 F.forEach((f,i)=>T(f,{y:[[0,0],[1500,-2,'io'],[3000,0,'io'],[4500,-2,'io'],[6000,0,'io'],[7500,-2,'io'],[9000,0,'io']]}));
 if(mode==='B1'){ /* she steps to the centre and grows; others dim + blur; caption under her feet */
  const bigS=1.13,dx=W/2-sp._cx;
  T(sp,{x:[[t0,0],[t0+1500,dx,'io'],[end-1200,dx,'lin'],[end-200,0,'io']],y:[[t0,0],[t0+1500,H*.0,'io'],[end-1200,0],[end-200,0]],s:[[t0,1],[t0+1500,bigS,'io'],[end-1200,bigS,'lin'],[end-200,1,'io']]},'50% 100%');
  sp.style.zIndex=30;
  F.forEach((f,i)=>{if(f!==sp)T(f,{br:[[t0-200,1],[t0+900,.4,'io'],[end-1200,.4],[end-300,1,'io']],blur:[[t0-200,0],[t0+900,3,'io'],[end-1200,3],[end-300,0,'io']],y:[[0,0],[1500,-2,'io'],[3000,0,'io'],[4500,-2,'io'],[6000,0,'io'],[7500,-2,'io'],[9000,0,'io']]})});
  T(bgl,{blur:[[t0-200,0],[t0+900,5,'io'],[end-1200,5],[end-300,0,'io']]},'50% 50%');
  T(sh,{o:[[t0-200,0],[t0+900,.42,'io'],[end-1200,.42],[end-300,0,'io']]});
  const pl=plate('Khổng Thị Lan','Nữ nhi Khổng gia · Giang Nam',{css:`left:${W/2-130}px;top:${feet*H+5}px;width:260px;z-index:58`,fs:dev==='ipad'?20:19});
  T(pl,{o:[[t0+1300,0],[t0+1900,1,'out'],[end-1500,1],[end-800,0]],y:[[t0+1300,-8],[t0+1900,0,'out']]},'50% 0%');
  /* her line box sits under the caption on Fold: move the box down is not possible → box on top region */
  
 }else{ /* B2: half-body card from the right edge, ink strip name; the yard stays visible but dimmed */
  const card=fig('fig-consort-c04-t1-a18.webp',.5,0,1.5,root,40);const topY=0;card.style.left=(W*(dev==='ipad'?.62:.55)-card._w/2)+'px';card.style.top=(H*.03)+'px';
  card.style.webkitMaskImage=card.style.maskImage='linear-gradient(#000 30%,transparent 42%)';
  T(card,{x:[[t0,W*.5],[t0+900,0,'out'],[end-1100,0],[end-300,W*.5,'in']],o:[[t0,0],[t0+500,1,'out'],[end-900,1],[end-300,0]]},'50% 0%');
  T(sh,{o:[[t0-200,0],[t0+700,.55,'io'],[end-1000,.55],[end-200,0,'io']]});
  T(bgl,{blur:[[t0-200,0],[t0+700,6,'io'],[end-1000,6],[end-200,0,'io']]},'50% 50%');
  F.forEach(f=>{T(f,{br:[[t0-200,1],[t0+700,.55,'io'],[end-1000,.55],[end-200,1,'io']],blur:[[t0-200,0],[t0+700,3,'io'],[end-1000,3],[end-200,0,'io']]})});
  const pl=plate('Khổng Thị Lan','Nữ nhi Khổng gia · Giang Nam',{v:true,css:`left:${dev==='ipad'?W*.16:W*.07}px;top:${H*.08}px`,fs:dev==='ipad'?40:34});T(pl,{o:[[t0+500,0],[t0+1200,1,'out'],[end-1100,1],[end-400,0]],y:[[t0+500,-14],[t0+1200,0,'out']]},'50% 0%');
  box.style.bottom='14px'}
 T(sk,{o:[[t0,0],[t0+500,1,'out']]});vignette();return end}
/* ===== C: NARRATOR (Tổng quản) focus ===== */
function buildC(mode){const root=el('div','position:absolute;inset:0;overflow:hidden;z-index:0;isolation:isolate');const bgl=bg('end-bg-throne.webp',root,50,40);const g=G();
 const cf=dev==='ipad'?.68:.76;const sh=shade(root,'#1c0c0a',20);
 const names=['unknown-fig-f.webp','unknown-fig-f.webp','unknown-fig-f.webp','fig-player-look1-t1-a18.webp'];const gx=[-1.5,-.5,.5,1.5].map(k=>.5+k*g.gs);
 const girls=names.map((n,i)=>fig(n,gx[i],g.girlFeet,g.girlH,root,10+i));
 const eu=fig('fig-eunuch-u01-a51.webp',mode==='C1'?.5:.3,.5,.34,root,25);
 const line='Chư vị tú nữ nghe cho rõ: vào điện phải cúi đầu, chưa được hỏi thì không được ngẩng mặt, không được nói.';
 const t0=600;const box=textBox('Tổng quản thái giám',null,'LỜI');
 const bigH=.72,bigS=bigH/.34;const tp=typer(box._tx,t0+1600,line,34);texts.push(tp);const end=tp.end+1800;
 /* he steps forward from his place and grows; the hall blurs + dims; the box may sit anywhere */
 const cxTo=mode==='C1'?W*.5:W*(dev==='ipad'?.3:.3);
 const upTo=(.92-bigH*0+0)*H;
 T(eu,{s:[[t0,1],[t0+1500,bigS*.0+bigS*.0+bigS,'out'],[end-900,bigS,'lin'],[end,1,'io']],y:[[t0,0],[t0+1500,(cf-.5)*H,'out'],[end-900,(cf-.5)*H],[end,0,'io']],x:[[t0,0],[t0+1500,mode==='C1'?0:0,'out']]},'50% 100%');
 T(bgl,{blur:[[t0,0],[t0+1200,10,'io'],[end-900,10],[end,0,'io']]},'50% 50%');
 T(sh,{o:[[t0,0],[t0+1200,.6,'io'],[end-900,.6],[end,0,'io']]});
 girls.forEach(f=>T(f,{blur:[[t0,0],[t0+1200,6,'io'],[end-900,6],[end,0,'io']],br:[[t0,1],[t0+1200,.45,'io'],[end-900,.45],[end,1,'io']]}));
 const pl=plate('Lý Tổng quản','Đại tổng quản Nội đình',{css:`left:${mode==='C1'?W/2-110:W*(dev==='ipad'?.3:.3)-110}px;top:${H*cf+H*.012}px;width:220px`,fs:18});T(pl,{o:[[t0+1200,0],[t0+1800,1,'out'],[end-1100,1],[end-500,0]]});
 /* box placement: C1 = under him, centred, bottom; C2 = right of him (event-frame family) */
 
 T(box,{o:[[t0+1000,0],[t0+1500,1,'out'],[end-1000,1],[end-400,0]]});
 const sk=skipChip();T(sk,{o:[[t0+1000,0],[t0+1500,1,'out']]});
 /* he enters with a small side-step so the scale-up reads as coming forward */
 vignette();return end}
/* ===== D: ROLL-CALL synced to the typewriter ===== */
function buildD(mode){const g=G();const root=el('div','position:absolute;inset:0;overflow:hidden;z-index:0;isolation:isolate');const bgl=bg('end-bg-throne.webp',root,50,40);const sh=shade(root,'#12070a',20);
 const names=['fig-consort-c01-t1-a18.webp','fig-consort-c04-t1-a18.webp','fig-consort-c05-t1-a18.webp','fig-player-look1-t1-a18.webp'];const gx=[-1.5,-.5,.5,1.5].map(k=>.5+k*.205);
 const greys=names.map((n,i)=>fig('unknown-fig-f.webp',gx[i],(dev==='ipad'?.69:.77),.5,root,9+i));const girls=names.map((n,i)=>fig(n,gx[i],(dev==='ipad'?.69:.77),.5,root,10+i));
 const eu=fig('fig-eunuch-u01-a51.webp',dev==='ipad'?.1:.11,.42,.3,root,12);
 const LINES=[['Tú nữ thứ nhất — Tần thị Nhã, con gái quan Lễ bộ, quê Giang Nam.','Tần Nhã','Giang Nam'],['Tú nữ thứ hai — Khổng thị Lan, con gái quan Tri huyện Giang Châu.','Khổng Lan','Giang Châu'],['Tú nữ thứ ba — Lục thị Thanh, con gái nhà buôn lụa đất Tô.','Lục Thanh','Tô Châu'],['Tú nữ thứ tư — Hạ thị Linh, con gái nhà nông khá giả đất Thục.','Hạ Linh','Đất Thục']];
 const box=textBox('Tổng quản thái giám',null,'XƯỚNG TÊN');box._tx.style.minHeight='46px';
 const sk=skipChip();
 T(sh,{o:[[0,0],[700,.62,'io']]});T(bgl,{blur:[[0,0],[700,4]]},'50% 50%');
 T(eu,{br:[[0,1]],blur:[[0,0]]});
 T(box,{o:[[500,0],[900,1,'out']]});T(sk,{o:[[800,0],[1300,1,'out']]});
 /* all girls start dim */
 let t=1300;const lit=[];
 /* 4 lines typed one after another in the SAME box: line i replaces line i-1 */
 const tps=[];LINES.forEach((L,i)=>{const tp=typer(box._tx,t,L[0],30);tp.until=null;tps.push(tp);texts.push(tp);const cue=typeAt(tp,'—')+0;lit.push(cue);t=tp.end+900;});
 /* each typer must hide when the next starts: store window */
 tps.forEach((tp,i)=>{tp.win=[tp.t0,i<tps.length-1?tps[i+1].t0:1e9]});
 girls.forEach((f,i)=>{const c=lit[i];
  T(f,{o:[[c-100,0],[c+450,1,'out']],s:[[c-100,1],[c+350,1.045,'back'],[c+900,1.0,'io']]});T(greys[i],{o:[[c-100,1],[c+450,0,'out']]});
  const pl=plate(LINES[i][1],LINES[i][2],{css:`left:${gx[i]*W-75}px;top:${(dev==='ipad'?.69:.77)*H+5}px;width:150px;white-space:nowrap;z-index:58`,fs:dev==='ipad'?18:16,sfs:11});
  if(mode==='D2'){const sl=el('div',`position:absolute;left:${gx[i]*W+52}px;top:${(dev==='ipad'?.69:.77)*H-8}px;z-index:59;width:30px;height:30px;border-radius:6px;background:#b3261a;color:#ffe9b8;font:800 14px/30px ${SERIF};text-align:center;border:1.5px solid #e3b04b;box-shadow:0 2px 6px rgba(0,0,0,.5);transform:rotate(8deg)`,root,['壹','貳','參','肆'][i]);T(sl,{o:[[c+150,0],[c+700,1,'out']]},'50% 50%');}
  T(pl,{o:[[c+150,0],[c+700,1,'out']],y:[[c+150,-6],[c+700,0,'out']]},'50% 0%');
  if(mode==='D2'){const cone=el('div',`position:absolute;left:${gx[i]*W-W*.12}px;top:0;width:${W*.24}px;height:${H}px;z-index:9;pointer-events:none;background:linear-gradient(rgba(255,226,150,.0),rgba(255,226,150,.34) 55%,rgba(255,226,150,.0));clip-path:polygon(40% 0,60% 0,100% 100%,0 100%)`);T(cone,{o:[[c-100,0],[c+500,1,'out'],[c+2300,.0,'io']]},'50% 0%')}
  else{const ring=el('div',`position:absolute;left:${gx[i]*W-W*.1}px;top:${(dev==='ipad'?.69:.77)*H-8}px;width:${W*.2}px;height:16px;border-radius:50%;background:radial-gradient(ellipse,rgba(255,225,150,.9),rgba(255,225,150,0) 70%);z-index:9`);T(ring,{o:[[c-100,0],[c+450,1,'out']]},'50% 50%')}});
 const end=t+800;
 T(box,{o:[[500,0],[900,1,'out'],[end-900,1],[end-300,0]]});
 return end}
/* ===== E: other first meetings ===== */
function buildE(mode){const root=el('div','position:absolute;inset:0;overflow:hidden;z-index:0;isolation:isolate');const g=G();
 if(mode==='E1'){ /* a new NPC (visiting consort) is met for the first time: lower-third + walk-in; the garden stays visible */
  const bgl=bg('ngu-hoa-vien-xuan-sang.webp',root,50,50);const sh=shade(root,'#1c0c0a',20);
  const me=fig('fig-player-look1-t1-a18.webp',.78,(dev==='ipad'?.69:.77),dev==='ipad'?.56:.58,root,12);
  const v=fig('fig-consort-c02-t3-a26.webp',dev==='ipad'?.38:.34,(dev==='ipad'?.69:.77),dev==='ipad'?.6:.66,root,14);
  T(v,{x:[[300,-W*.5],[2300,0,'out']],o:[[300,0],[1000,1,'out']],br:[[300,1]]});T(me,{o:[[0,1]],br:[[1500,1],[2600,.62,'io'],[6300,.62],[7000,1,'io']]});
  T(bgl,{blur:[[1500,0],[2600,4,'io'],[6300,4],[7000,0,'io']]},'50% 50%');T(sh,{o:[[1500,0],[2600,.3,'io'],[6300,.3],[7000,0,'io']]});
  /* kit stage tag (.tok .tag, §28 / §93.5) under the newcomer's feet: origin line + name */
  const lt=plate('Mục Tài nhân','Lần đầu gặp · Ngọc Thanh các',{css:`left:${(dev==='ipad'?.38:.34)*W-110}px;top:${(dev==='ipad'?.69:.77)*H+5}px;width:220px;white-space:nowrap;z-index:58`,fs:19,sfs:11});T(lt,{o:[[1800,0],[2500,1,'out'],[6300,1],[6900,0]],y:[[1800,-8],[2500,0,'out']]},'50% 0%');
  const box=textBox('Mục Tài nhân',dev==='ipad'?'left':null,'LỜI');const tp=typer(box._tx,2800,'Muội muội vừa vào cung phải không? Ta ở Ngọc Thanh các, bên kia hồ sen — khi rảnh cứ sang chơi.',34);texts.push(tp);
  T(box,{o:[[2600,0],[3000,1,'out'],[tp.end+1300,1],[tp.end+1800,0]]});vignette();return tp.end+2400}
 /* E2: the Emperor's first visit to her palace — the REAL stage (her room) behind; door light, silhouette, colour fills in, plaque */
 ov.style.background='transparent';const sh=shade(root,'#1c0c0a',2);T(sh,{o:[[0,0],[900,.58,'io'],[8000,.58],[9000,0,'io']]});
 const door=el('div',`position:absolute;left:${W*.5-W*.17}px;bottom:0;width:${W*.34}px;height:${H*.8}px;z-index:4;background:linear-gradient(rgba(255,222,150,.0),rgba(255,222,150,.65) 40%,rgba(255,230,170,.95));clip-path:polygon(30% 0,70% 0,100% 100%,0 100%);mix-blend-mode:screen`);T(door,{o:[[300,0],[1400,1,'out'],[4200,1],[5200,.0,'io']]},'50% 100%');
 const em=fig('fig-emperor-a26-1.webp',.5,(dev==='ipad'?.69:.77),.62,root,12);
 T(em,{sil:[[0,1],[2200,1],[3600,0,'io']],o:[[600,0],[1500,1,'out']],s:[[600,.55],[3600,1.0,'out']],y:[[600,H*.03],[3600,0,'out']]},'50% 100%');
 const pl=plate('Hoàng thượng giá lâm','Lần đầu ngự giá Trường Xuân cung',{css:`left:${W/2-130}px;top:${(dev==='ipad'?.69:.77)*H+4}px;width:260px;white-space:nowrap;z-index:58`,fs:17,sfs:11});T(pl,{o:[[3800,0],[4500,1,'out'],[7600,1],[8200,0]],y:[[3800,-10],[4500,0,'out']]},'50% 0%');
 const box=textBox('Ta nghĩ thầm',null,'TÂM NIỆM');const tp=typer(box._tx,4300,'Người ấy… là Hoàng thượng. Ta phải giữ nét mặt thật bình thản.',34);texts.push(tp);T(box,{o:[[4200,0],[4600,1,'out'],[8300,1],[8900,0]]});
 return 9400}

/* typer with '|' = extra pause (the name is read, then a beat) */
function typerP(box,t0,raw,cps,pause){const str=raw.replace(/\|/g,'');const times=[];let t=t0,i=0;for(const ch of raw){if(ch==='|'){t+=pause;continue}times.push(t);t+=cps+(',;'.includes(ch)?60:'—…'.includes(ch)?100:'.!?'.includes(ch)?160:0)}return {box,t0,str,times,end:t}}
/* ===== F: DAY-1 ROOM ASSIGNMENT (Dưỡng Tú viện): 12 girls in rows, ma ma lit, names read -> intro shot -> group of 4 goes to Tây/Đông/Bắc sở, then her room ===== */
function buildF(){const root=el('div','position:absolute;inset:0;overflow:hidden;z-index:0;isolation:isolate');ov.style.background='transparent';
 const bgbox=el('div','position:absolute;inset:0;z-index:0',root);el('div','position:absolute;inset:0;background:#1b0f0c',bgbox);const bgl=bg('ngu-hoa-vien-xuan-sang.webp',bgbox,50,50);
 const sh=shade(bgbox,'#1c0c0a',20);
 const rowFeet=[.52,.67,.82],rowH=[.3,.36,.42],xs=[.2,.4,.6,.8];
 const C={y:'fig-consort-c',a:'-t1-a18.webp'};const c=n=>'fig-consort-c'+n+'-t1-a18.webp';
 const order=[ 'fig-player-look1-t1-a18.webp',c('01'),c('02'),c('04'),  c('05'),c('06'),c('07'),c('03'),  c('08'),c('09'),c('10'),c('11')];
 const NAMES=['Vân Hương','Mai Lan','Thu Cúc','Hạ Liên','Lệ Chi','Bích Ngọc','Lam Điệp','Mộ Tuyết','Thanh Tâm','Ngọc Diệp','Hồng Vi','Bạch Liên'];
 /* row slot of each called girl (scattered, so the calls jump around the rows) */
 const slotOf=[5,9,2,0,10,3,7,11,1,6,4,8];
 const rows=[];for(let r=0;r<3;r++)for(let k=0;k<4;k++)rows.push([xs[k],rowFeet[r],rowH[r]]);
 const rowFigs=[];for(let i=0;i<12;i++){const [x,f,h]=rows[slotOf[i]];rowFigs[i]=fig('unknown-fig-f.webp',x,f,h,bgbox,10+Math.round(f*10))}
 const FF=dev==='ipad'?.69:.76;const mm=fig('fig-mama-k01-a51.webp',.1,FF,.5,root,26);const mmt=plate('Tống ma ma','Giáo tập ma ma',{col:'#ff4a1c',css:`left:${.1*W-60}px;top:${FF*H+3}px;width:120px`});
 const box=textBox('Giáo tập ma ma',null,'XƯỚNG TÊN');const sk=skipChip();
 const grpX=[.08*W,.55*W,.34*W],grpS=[.5,.5,.4],grpFeet=[FF,FF,.5],grpName=['Tây sở','Đông sở','Bắc sở'];
 const CX=[.3,.47,.64,.81];
 const grp=[0,1,2].map(g=>el('div','position:absolute;inset:0;z-index:30',root));
 let t=1900;
 const mmO=[[0,0],[900,0],[1700,1,'out']];T(mm,{o:mmO,x:[[900,-40],[1700,0,'out']]});T(mmt,{o:[[1500,0],[2000,1,'out'],[1e5,1]]},'50% 0%');
 /* dim everything but ma ma */
 T(sh,{o:[[0,0],[900,.55,'io']]});T(bgl,{blur:[[0,0],[900,4,'io']]},'50% 50%');
 rowFigs.forEach((f,i)=>{T(f,{br:[[0,1],[900,.5,'io']],blur:[[0,0],[900,2,'io']]})});
 T(box,{o:[[1500,0],[1900,1,'out']]});T(sk,{o:[[1500,0],[1900,1,'out']]});
 const plates=[];let lastEnd=0;const tps=[];
 for(let g=0;g<3;g++){
  const raw=grpName[g]+': '+[0,1,2,3].map(k=>NAMES[g*4+k]+(k<3?',|':'.|')).join(' ');
  const tp=typerP(box._tx,t,raw,30,720);texts.push(tp);tps.push(tp);
  const cues=[0,1,2,3].map(k=>typeAt(tp,NAMES[g*4+k])+250);
  [0,1,2,3].forEach(k=>{const idx=g*4+k;const cue=cues[k];const rf=rowFigs[idx];
   const slot=fig(order[idx],CX[k],.78,.5,grp[g],10+k);const hS=slot._h,topY=.78*H-hS;const bigS=(1.45*H)/hS;
   const x1=W/2-CX[k]*W,y1=H*.03-topY;
   T(slot,{x:[[cue,x1],[cue+500,x1,'lin'],[cue+520,x1],[cue+500+700,0,'io']],y:[[cue,y1],[cue+500+700,0,'io']],s:[[cue,bigS],[cue+500,bigS,'lin'],[cue+1200,1,'io']],o:[[cue,0],[cue+300,1,'out']],clipB:[[cue,.48],[cue+500,.48,'lin'],[cue+1200,0,'io']]},'50% 0%');
   /* fix transform-origin & anchor: slot sits at its slot place, the close-up transform moves it to the centre */
   const pl=plate(NAMES[idx],'',{css:`left:${W/2-120}px;top:${H*.03+H*.0}px;width:240px;white-space:nowrap;z-index:58`,fs:dev==='ipad'?24:22});T(pl,{o:[[cue+200,0],[cue+600,1,'out'],[cue+1100,1],[cue+1300,0]],y:[[cue+200,-8],[cue+600,0,'out']]},'50% 0%');pl.style.top=(H-176)+'px';
   /* her place in the rows empties */
   T(rf,{o:[[cue-100,1],[cue+250,0]],br:[[0,1],[900,.5,'io']],blur:[[0,0],[900,2,'io']]});
   /* during the close-up the others stay dim; the slot figure is lit */
  });
  const gEnd=tp.end+300,mv=1000;
  /* group moves to its corner, shrinks, plate */
  T(grp[g],{x:[[gEnd,0],[gEnd+mv,grpX[g],'io']],y:[[gEnd,0],[gEnd+mv,(grpFeet[g]*H-.78*H*grpS[g])-0,'io']],s:[[gEnd,1],[gEnd+mv,grpS[g],'io']]},'0 0');
  grp[g].style.transformOrigin='0 0';
  const gp=plate(grpName[g],'',{css:`left:${(grpX[g]+((CX[0]+CX[3])/2)*W*grpS[g])-60}px;top:${grpFeet[g]*H+4}px;width:120px;z-index:58`,fs:17});root.appendChild(gp);T(gp,{o:[[gEnd+mv-200,0],[gEnd+mv+400,1,'out']]},'50% 0%');plates.push(gp);
  t=gEnd+mv+500;
 }
 const endCalls=t;const roomT=endCalls+400;
 /* room: the scene gives way to HER room (real stage underneath) with 4 figures, 3 are the kit's grey strangers */
 T(root,{o:[[roomT,1],[roomT+900,0,'io']]},'50% 50%');root.style.transformOrigin='50% 50%';
 const room=el('div','position:absolute;inset:0;z-index:5;isolation:isolate;overflow:hidden');{const sc0=document.querySelector('#stage .scimg');if(sc0){const c0=sc0.cloneNode(true);c0.removeAttribute('id');c0.style.cssText+=';position:absolute;inset:0;visibility:visible!important;opacity:1';room.appendChild(c0)}}
 T(room,{o:[[0,0],[roomT,0],[roomT+900,1,'io']]},'50% 50%');const rsh=shade(room,'#1c0c0a',1);T(rsh,{o:[[roomT,0],[roomT+900,.8,'io']]});
 const rx=[.11,.35,.59,.83];
 const me=fig('fig-player-look1-t1-a18.webp',rx[0]+.02,.78,.5,room,10);T(me,{o:[[roomT+300,0],[roomT+1000,1,'out']],y:[[roomT+300,14],[roomT+1000,0,'out']]});
 [1,2,3].forEach(k=>{const u=fig('unknown-fig-f.webp',rx[k]+.02,.78,.5,room,10);T(u,{o:[[roomT+700+k*200,0],[roomT+1400+k*200,1,'out']],sat:[[0,0]]});
  const pl=plate('Người lạ','',{css:`left:${(rx[k]+.02)*W-52}px;top:${.78*H+4}px;width:104px;white-space:nowrap;z-index:58`,fs:15});T(pl,{o:[[roomT+1500,0],[roomT+2000,1,'out']]},'50% 0%')});
 const rp=plate('Phòng của ta · Tây sở','Bốn người một phòng',{css:`left:${W/2-150}px;top:${H*.04}px;width:300px;z-index:58`,fs:20});T(rp,{o:[[roomT+500,0],[roomT+1100,1,'out']],y:[[roomT+500,-8],[roomT+1100,0,'out']]},'50% 0%');
 const rb=textBox('Ta nghĩ thầm',null,'TÂM NIỆM');const rt=typer(rb._tx,roomT+2200,'Ba người còn lại, ta chưa từng gặp… mai phải chào hỏi cho phải phép.',34);texts.push(rt);
 T(rb,{o:[[roomT+2000,0],[roomT+2400,1,'out'],[rt.end+1500,1],[rt.end+2000,0]]});T(box,{o:[[1500,0],[1900,1,'out'],[roomT-200,1],[roomT+300,0]]});
 /* typer windows: ma ma lines replace each other */
 texts.forEach((tp,i)=>{tp.win=[tp.t0,i<texts.length-1?texts[i+1].t0:1e9]});
 vignette();return rt.end+2200}

/* ===== G: SELECTION RESULT: tray brought in, kept = «ban hương nang» (stays), sent home = «ban hoa» (bows and leaves); G2 = HER OWN big version ===== */
function itemImg(name,sz,parent){const d=el('img',`position:absolute;width:${sz}px;height:${sz}px;z-index:50;filter:drop-shadow(0 4px 10px rgba(0,0,0,.45))`,parent);d.src=ASSET+name;return d}
function buildG(mode){const root=el('div','position:absolute;inset:0;overflow:hidden;z-index:0;isolation:isolate');
 if(mode==='G2'){
  const bgl=bg('end-bg-throne.webp',root,50,40);const sh=shade(root,'#1c0c0a',5);T(sh,{o:[[0,0],[1200,.45,'io']]});T(bgl,{blur:[[0,0],[1200,6,'io']]},'50% 50%');
  const me=fig('fig-player-look1-t1-a18.webp',.5,.8,.74,root,12);T(me,{o:[[600,0],[1500,1,'out']],s:[[600,.92],[1800,1,'out']]});
  const eu=fig('fig-eunuch-ndp-tray.webp',dev==='ipad'?.82:.84,.8,.5,root,14);T(eu,{x:[[800,W*.3],[2400,0,'out']],o:[[800,0],[1500,1,'out']]});
  const box=textBox('Tổng quản thái giám',null,'KẾT QUẢ');const tp=typer(box._tx,2600,'Tân thị Như Ý — Hoàng thượng và Thái hậu chọn ở lại. Ban hương nang.',34);texts.push(tp);T(box,{o:[[2400,0],[2800,1,'out'],[tp.end+3000,1],[tp.end+3500,0]]});
  const cue=typeAt(tp,'Ban hương')+200;
  const it=itemImg('item-tuithom.webp',dev==='ipad'?190:170,root);const ex=(dev==='ipad'?.82:.84)*W,ey=.6*H;
  it.style.left=(ex-85)+'px';it.style.top=(ey-85)+'px';T(it,{x:[[cue,0],[cue+1500,.5*W-ex+.0,'io']],y:[[cue,0],[cue+1500,-.14*H,'io']],s:[[cue,.4],[cue+1500,1.15,'out']],o:[[cue,0],[cue+300,1,'out']]},'50% 50%');
  const glow=el('div',`position:absolute;left:${W*.5-W*.3}px;top:${H*.2}px;width:${W*.6}px;height:${W*.6}px;border-radius:50%;background:radial-gradient(circle,rgba(255,226,150,.7),rgba(255,226,150,0) 65%);z-index:11;mix-blend-mode:screen`,root);T(glow,{o:[[cue+1200,0],[cue+2200,1,'out'],[cue+4200,.6,'io']],s:[[cue+1200,.6],[cue+2400,1.1,'out']]},'50% 50%');
  const pl=plate('Ở lại cung · ban hương nang','Tân thị Như Ý',{css:`left:${W/2-200}px;top:${H*.05}px;width:400px;white-space:nowrap;z-index:58`,fs:19});T(pl,{o:[[cue+1500,0],[cue+2200,1,'out']],y:[[cue+1500,-10],[cue+2200,0,'out']]},'50% 0%');
  vignette();return tp.end+3800}
 /* G1: yard, four girls, tray eunuch walks along the row */
 const bgl=bg('ngu-hoa-vien-xuan-sang.webp',root,50,50);const sh=shade(root,'#1c0c0a',20);
 const names=['fig-consort-c01-t1-a18.webp','fig-consort-c04-t1-a18.webp','fig-consort-c02-t1-a18.webp','fig-consort-c05-t1-a18.webp'];const nm=['Tần Nhã','Khổng Lan','Lục Thanh','Hạ Linh'];const keep=[1,0,1,0];
 const cx=[-1.5,-.5,.5,1.5].map(k=>.5+k*(dev==='ipad'?.16:.2));const ph=dev==='ipad'?.58:.66,feet=(dev==='ipad'?.65:.77);
 const F=names.map((n,i)=>fig(n,cx[i],feet,ph,root,10+i));
 const eu=fig('fig-eunuch-ndp-tray.webp',.06,.78,.42,root,30);
 const box=textBox('Tổng quản thái giám',null,'KẾT QUẢ');const sk=skipChip();
 T(box,{o:[[500,0],[900,1,'out']]});T(sk,{o:[[700,0],[1200,1,'out']]});
 T(eu,{x:[[0,-W*.2],[900,0,'out']],o:[[0,0],[500,1,'out']]});
 let t=1200;const sdim=[[0,0]],bd=[[0,0]];const keptX=[.9,.78];let kc=0;const tps=[];
 names.forEach((n,i)=>{const f=F[i];const line=nm[i]+(keep[i]?' — lưu bài tử, ban hương nang.':' — ban hoa, hồi gia.');
  const tp=typer(box._tx,t,line,32);texts.push(tp);tps.push(tp);const cue=typeAt(tp,'ban')-200;
  const ex=cx[i]*W-W*.12;
  const prevX=i?cx[i-1]*W-W*.12:W*.06;
  T(eu,{x:[[cue-900,prevX-.06*W],[cue-100,ex-.06*W,'io']],o:[[0,1]]});
  eu._tr=eu._tr||[];
  const it=itemImg(keep[i]?'item-tuithom.webp':'item-tp-bhoa-b1.webp',90,root);it.style.left=(ex-45)+'px';it.style.top=(.5*H-45)+'px';
  T(it,{x:[[cue,0],[cue+800,cx[i]*W-ex,'io']],y:[[cue,0],[cue+800,-.08*H,'io']],s:[[cue,.5],[cue+800,1.2,'out']],o:[[cue,0],[cue+200,1,'out'],[cue+1900,1],[cue+2200,0]]},'50% 50%');
  /* spotlight: others dim while this girl is served */
  F.forEach((g,j)=>{});
  if(keep[i]){const tx=(kc===0?.9:.78)*W-cx[i]*W;kc++;f.style.zIndex=40+i;T(f,{x:[[cue+1500,0],[cue+2500,tx,'io']],s:[[cue-200,1],[cue+500,1.22,'out'],[cue+1500,1.22],[cue+2500,.85,'io']],br:[[0,1]]},'50% 100%');
   const pl=plate('Ban hương nang','Lưu bài tử',{css:`left:${cx[i]*W-80}px;top:${feet*H+6}px;width:160px;white-space:nowrap;z-index:58`,fs:17,sfs:11});T(pl,{o:[[cue+600,0],[cue+1100,1,'out'],[cue+2400,1],[cue+2900,0]],x:[[cue+1500,0],[cue+2500,tx,'io']]},'50% 0%')}
  else{f.style.zIndex=40+i;T(f,{s:[[cue-200,1],[cue+500,1.22,'out'],[cue+1900,1.22],[cue+3300,.8,'in']],y:[[cue+1900,0],[cue+3300,-H*.04,'in']],x:[[cue+1900,0],[cue+3300,-W*.7,'in']],o:[[cue+2500,1],[cue+3300,0]]},'50% 100%');
   const pl=plate('Ban hoa','Hồi gia',{css:`left:${cx[i]*W-80}px;top:${feet*H+6}px;width:160px;white-space:nowrap;z-index:58`,fs:17,sfs:11});T(pl,{o:[[cue+600,0],[cue+1100,1,'out'],[cue+2300,1],[cue+2800,0]]},'50% 0%')}
  t=cue+3500;
  sdim.push([cue-300,0],[cue+300,.4,'io'],[t-900,.4]);bd.push([cue-300,0],[cue+300,3,'io'],[t-900,3]);
 });
 /* light everything except the served girl: per-girl brightness tracks */
 F.forEach((f,i)=>{const cue=typeAt(tps[i],'ban')-200;const k=[[0,1]];names.forEach((_,j)=>{const c=typeAt(tps[j],'ban')-200;if(j===i){k.push([c-300,.5],[c+300,1,'io'],[c+2400,1],[c+2800,.5,'io'])}else{}});
  /* dim unless it is her turn: default .55 */
  const kk=[[0,.55],[typeAt(tps[i],'ban')-500,.55],[typeAt(tps[i],'ban')+100,1,'io'],[typeAt(tps[i],'ban')+2800,.75,'io']];
  const tr=tracks.filter(x=>x.e===f)[0];if(tr)tr.p.br=kk;else T(f,{br:kk},'50% 100%')});
 const end=t+800;T(box,{o:[[500,0],[900,1,'out'],[end-900,1],[end-300,0]]});
 T(sh,{o:[[0,0],[900,.3,'io']]});vignette();return end}
const CLIPS={A1:()=>buildA('A1'),A2:()=>buildA('A2'),B1:()=>buildB('B1'),B2:()=>buildB('B2'),C1:()=>buildC('C1'),C2:()=>buildC('C2'),D1:()=>buildD('D1'),D2:()=>buildD('D2'),E1:()=>buildE('E1'),E2:()=>buildE('E2'),F1:()=>buildF(),G1:()=>buildG('G1'),G2:()=>buildG('G2')};
/* texts windows (roll-call lines replace each other) */
updTexts=function(t){const m=new Map();for(const tp of texts){if(!tp.box)continue;if(!m.has(tp.box))m.set(tp.box,'');let n=0;while(n<tp.times.length&&tp.times[n]<=t)n++;let show=t>=tp.t0;if(tp.win&&t>=tp.win[1])show=false;if(show)m.set(tp.box,tp.str.slice(0,n)+(n<tp.str.length?'<i class=cur></i>':''))}for(const [b,h] of m)b.innerHTML=h};
return {load,seek,CLIPS,_d:()=>JSON.stringify(texts.map(t=>({t0:t.t0,win:t.win,n:t.times.length,box:!!t.box,end:t.end})))};
})();
