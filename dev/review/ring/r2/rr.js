/* KRR — «Vòng người» mock injected into the REAL built game (host mode). Layout engine only: every chrome piece is a kit part:
   chips = kitChip · name plaque = kitNameTag/j59tagHTML (.tag .j59n) · option sheet = kitDlgBox + kitBareOpts · scene = kitScene.open + Sc.fig + Sc.box
   · stranger = .figimg.j59sil (grey kit silhouette). Nothing hand-drawn except figure positions. */
window.KRR=(function(){
const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
const st=document.getElementById('stage');
let LAY=null,cfg=null,D=null,GROUPS=[],N=0,ASP={},FW=.415,LAST=[],PANO=null;
const S2={cur:0,glow:0,pill:0,sel:-1,selm:null,seld:0,appr:0,apprG:-1,apprM:0,sheet:0,camX:0,push:0,pushG:-1,strip:1};
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function aspOf(s){return ASP[s]||.415}
async function loadAsp(srcs){await Promise.all([...new Set(srcs)].map(s=>new Promise(r=>{const i=new Image();i.crossOrigin='anonymous';i.onload=()=>{ASP[s]=i.naturalWidth/i.naturalHeight;r()};i.onerror=r;i.src=s})))}
function geo(){const r=st.getBoundingClientRect();const q=sel=>{const e=document.querySelector(sel);if(!e||getComputedStyle(e).display==='none')return null;const b=e.getBoundingClientRect();return {l:b.left-r.left,r:b.right-r.left,t:b.top-r.top,b:b.bottom-r.top}};
 const rail=q('#krail'),col=q('.kshR');
 const x0=Math.max(8,(rail?rail.r:8)+6),x1=Math.min(r.width-8,(col?col.l:r.width)-6);
 return {W:r.width,H:r.height,x0,x1:Math.max(x0+200,x1),top:60,feetF:r.height-(cfg.plateBelow||78)}}
/* a person {name,src,stage:0|1|2, kind, role}. known: plaque by the kit; stranger: grey kit silhouette */
function P(src,name,o){return Object.assign({src,name,stage:2,dx:0,dy:0,s:1,flip:0,z:0,kind:'npc'},o||{})}
function mkFig(m){const b=document.createElement('button');b.type='button';b.className='tok fig krr-tok';
 b.style.cssText='position:absolute;padding:0;border:0;background:none;transform-origin:50% 100%;pointer-events:none';
 const im=document.createElement('img');im.className='figimg'+(m.stage===0?' j59sil':'');im.alt='';im.draggable=false;im.src=m.stage===0?(CDN+'kit/unknown-fig-'+(m.sex||'f')+'.webp'):m.src;im.style.cssText='display:block;height:100%;width:auto;max-width:none;margin:0';b.appendChild(im);
 const tg=document.createElement('span');tg.className='tag krr-tag';tg.style.cssText='position:absolute;left:50%;transform:translateX(-50%);top:100%;margin-top:2px;white-space:nowrap;display:none;z-index:5';
 let h='';try{h=kitNameTag({kind:m.kind||'npc',name:m.name||'Một tú nữ',ref:m.ref},{stage:m.stage===0?0:2,ph:m.stage===0?'Người lạ':undefined})}catch(e){h='<span class="j59n">'+esc(m.name||'Người lạ')+'</span>'}
 tg.innerHTML=h;b.appendChild(tg);m.el=b;m.tag=tg;LAY.appendChild(b);return b}
function build(){LAY=document.getElementById('krr');if(LAY)LAY.remove();LAY=document.createElement('div');LAY.id='krr';LAY.style.cssText='position:absolute;inset:0;z-index:8;overflow:hidden;pointer-events:none';
 st.classList.add('krring');if(!window.__krrObs){window.__krrObs=new MutationObserver(()=>{if(document.getElementById('krr')&&!st.classList.contains('krring'))st.classList.add('krring')});window.__krrObs.observe(st,{attributes:true,attributeFilter:['class']})}if(!document.getElementById('krr-css')){const c=document.createElement('style');c.id='krr-css';c.textContent='#stage.krring #tokens,#stage.krring #mefig,#stage.krring #j59metag,#stage.krring .j59more,#stage.krring .tok:not(.krr-tok),#stage.krring .kspet{display:none!important}#krr .krr-tok .tag{font-size:13px}#krr .krr-cap{position:absolute;transform:translate(-50%,-100%);z-index:30;white-space:nowrap}#krr .krr-cap .kchip{font-size:15px;padding:5px 12px;box-shadow:0 3px 10px #0006}#krr .krr-pill{position:absolute;z-index:31;top:8px}#krr .krr-strip{position:absolute;left:0;right:0;z-index:30;display:flex;flex-wrap:nowrap;gap:5px;justify-content:center;padding:0 6px}#krr .krr-strip .kchip{font-size:13px;padding:4px 9px;white-space:nowrap;opacity:.9}#krr .krr-strip .kchip.cur{outline:2px solid #ffd98a;opacity:1}#krr .krr-sheet{position:absolute;z-index:32;pointer-events:none}#krr .krr-sheet .dlg.kscn-box{position:absolute}';document.head.appendChild(c)}
 st.appendChild(LAY);
 GROUPS.forEach(g=>g.m.forEach(m=>mkFig(m)));
 GROUPS.forEach(g=>{const ext=g.m.reduce((a,m)=>{const w=aspOf(m.stage===0?CDN+'kit/unknown-fig-f.webp':m.src)*m.s,l=m.dx*FW-w/2,r=m.dx*FW+w/2;return [Math.min(a[0],l),Math.max(a[1],r)]},[9,-9]);g.wU=ext[1]-ext[0];g.cU=(ext[1]+ext[0])/2});
}
const srcOf=m=>m.stage===0?CDN+'kit/unknown-fig-'+(m.sex||'f')+'.webp':m.src;
/* ring geometry */
function TH(){return {9:[[0,0],[1,48],[2,84],[3,112],[4,150],[4.5,180]],12:[[0,0],[1,42],[2,72],[3,98],[4,128],[5,155],[6,180]],6:[[0,0],[1,58],[2,112],[3,180]],4:[[0,0],[1,66],[2,180]],5:[[0,0],[1,62],[2,130],[2.5,180]],7:[[0,0],[1,52],[2,100],[3,150],[3.5,180]],8:[[0,0],[1,50],[2,92],[3,135],[4,180]],10:[[0,0],[1,45],[2,80],[3,112],[4,145],[5,180]],11:[[0,0],[1,44],[2,78],[3,108],[4,138],[5,160],[5.5,180]]}[N]}
function theta(d){const T=TH(),s=Math.sign(d),a=Math.min(Math.abs(d),N/2);for(let i=0;i<T.length-1;i++){if(a<=T[i+1][0]){const f=(a-T[i][0])/(T[i+1][0]-T[i][0]);return s*(T[i][1]+(T[i+1][1]-T[i][1])*f)*Math.PI/180}}return s*Math.PI}
function wrap(d){d=((d%N)+N)%N;return d>=N/2?d-N:d}
function pose(d){const th=theta(d),z=Math.cos(th),u=(z+1)/2;
 const fl=D.x1-D.x0,cx=(D.x0+D.x1)/2,rx=Math.max(20,(fl/2)-cfg.fh*FW*(cfg.edge||.40))*(cfg.rxk||1),yF=D.feetF,yB=D.feetF-(cfg.depth||150);
 return {x:cx+rx*Math.sin(th),y:yF-(yF-yB)*(1-z)/2,sc:(cfg.scMin||.46)+(1-(cfg.scMin||.46))*u*u,br:(cfg.brMin||.55)+(1-(cfg.brMin||.55))*Math.pow(u,1.5),z}}
function placeG(g,cx,y,k,br,z,opt){opt=opt||{};const H=cfg.fh*k;let top=1e9,left=1e9,right=-1e9;
 g.m.forEach((m,i)=>{const e=m.el;let h=H*m.s,w=h*aspOf(srcOf(m));let mx=cx+(m.dx*FW-g.cU)*H,fy=y-m.dy*H;let bb=br;
  const sel=opt.sel===i;if(opt.sel!=null){bb=br*(sel?1:(1-.40*(opt.seld||0)))}
  if(opt.zoomM===i&&opt.zoom>0){const zz=1+.28*opt.zoom;h*=zz;w*=zz;fy+=H*.06*opt.zoom;bb=1}else if(opt.zoomM!=null&&opt.zoom>0){bb=br*(1-.35*opt.zoom)}
  e.style.cssText+=`;display:block;width:${w}px;height:${h}px;left:${mx-w/2}px;top:${fy-h}px;z-index:${Math.round(8+z*5+m.z*.5+(opt.zoomM===i?10:0))};transform:${m.flip?'scaleX(-1)':'none'}`;
  const gl=opt.glow;const f=`brightness(${bb.toFixed(3)}) saturate(${(.7+.3*Math.min(1,bb)).toFixed(3)})`;
  e.firstChild.style.filter=m.stage===0?'':f;if(m.stage===0)e.style.opacity=(.55+.45*Math.min(1,bb)).toFixed(2);
  e.style.filter=(gl?'drop-shadow(0 0 14px #ff5a30) drop-shadow(0 0 5px #ffd27a)':(opt.lit?'drop-shadow(0 0 14px rgba(255,236,170,.9))':''));
  m.tag.style.display=(opt.tags&&(opt.tagAll||opt.sel==null||sel))?'block':'none';
  if(m.flip)m.tag.style.transform='translateX(-50%) scaleX(-1)';else m.tag.style.transform='translateX(-50%)';
  top=Math.min(top,fy-h);left=Math.min(left,mx-w/2);right=Math.max(right,mx+w/2)});
 return {top,left,right,cx,y}}
function frontIdx(){return ((Math.round(S2.cur)%N)+N)%N}
/* strip of kit chips (name strip to jump) */
function strip(){let s=LAY.querySelector('.krr-strip');if(!cfg.strip){if(s)s.remove();return}
 if(!s){s=document.createElement('div');s.className='krr-strip';LAY.appendChild(s)}s.style.bottom='6px';
 s.innerHTML=GROUPS.map((g,i)=>`<span class="kchip ${g.quarrel&&S2.glow>0?'r':'n'}${(cfg.mode==='S'?S2.near:frontIdx())===i?' cur':''}">${esc(g.short||g.cap||'')}</span>`).join('');s.style.display=(S2.sheet||S2.apprOn)?'none':'flex'}
function render(){if(!LAY)return;st.classList.add('krring');D=geo();const ringMode=cfg.mode!=='S'&&cfg.mode!=='ROW';let capT=null;LAST=[];
 if(cfg.mode==='ROW'){const fl=D.x1-D.x0,cw=fl/N;GROUPS.forEach((g,i)=>{const k=Math.min(1,(cw*1.02)/(g.wU*cfg.fh));LAST[i]=placeG(g,D.x0+cw*(i+.5),D.feetF,k,1,i*.01,{tags:true,tagAll:true});LAST[i].k=k;LAST[i].d=i-N/2});capT=null}
 else if(ringMode){GROUPS.forEach((g,i)=>{const d=wrap(i-S2.cur),p=pose(d);const kfit=Math.min(1,(D.x1-D.x0)*(cfg.fitw||.96)/(g.wU*cfg.fh*1.0));
   const front=Math.abs(d)<.35;let k=kfit*p.sc,br=p.br;
   const opt={lit:front&&!(S2.sel>=0),glow:S2.glow>0&&g.quarrel,tags:front&&cfg.tags!==false,tagAll:true};
   if(S2.sel>=0&&i===S2.sel){opt.sel=S2.selm;opt.seld=S2.seld;br=1;opt.tags=true;opt.lit=false}else if(S2.sel>=0){br*=1-.30*S2.seld;opt.tags=false}
   if(S2.apprG===i&&S2.appr>0){opt.zoomM=S2.apprM;opt.zoom=S2.appr;opt.tags=false}else if(S2.appr>0){br*=1-.35*S2.appr;opt.tags=false}
   let gx=p.x;if(S2.sel===i&&S2.sheet>0){const mm=g.m[S2.selm],H0=cfg.fh*k*1.12,tx=D.x0+(D.x1-D.x0)*.20;gx=p.x+(tx-(p.x+(mm.dx*FW-g.cU)*cfg.fh*k))*S2.sheet;k*=1+.12*S2.sheet}
   LAST[i]=placeG(g,gx,p.y,k,br,p.z+(S2.apprG===i?1:0),opt);LAST[i].k=k;LAST[i].d=d});
  const fl=LAST[frontIdx()];capT={x:fl.cx,y:fl.top-6,txt:GROUPS[frontIdx()].cap}}
 else{const z=1,baseY=D.feetF+6,hS=cfg.hS;
  GROUPS.forEach((g,i)=>{const dep=(i%3===1)?1:0;const k=(hS/cfg.fh)*(dep?.9:1);const y=baseY-dep*D.H*.03;const opt={glow:S2.glow>0&&g.quarrel,tags:false};
   if(S2.sel>=0&&i===S2.sel){opt.sel=S2.selm;opt.seld=S2.seld;opt.tags=true}let br=1;if(S2.sel>=0&&i!==S2.sel)br=1-.30*S2.seld;
   if(S2.apprG===i&&S2.appr>0){opt.zoomM=S2.apprM;opt.zoom=S2.appr;}else if(S2.appr>0)br*=1-.35*S2.appr;
   let gx=PANO.pos[i].cx,kk=k;if(S2.sel===i&&S2.sheet>0){kk=k*(1+.10*S2.sheet)}
   LAST[i]=placeG(g,gx,y,kk,br,i*.01,opt);LAST[i].k=kk});
  const ze=S2.push>0?1+.5*S2.push:1;let tx=-S2.camX,ty=0;if(S2.push>0){const c=PANO.pos[S2.pushG].cx;tx=-(S2.camX*(1-S2.push)+(c-D.W/2/ze)*S2.push)*ze;ty=(D.H*.96-ze*(baseY+4))*S2.push}
  PANO.el.style.transform=`translate(${tx}px,${ty}px) scale(${ze})`;PANO.tx=tx;PANO.ty=ty;PANO.ze=ze;
  const mid=((D.x0+D.x1)/2-tx)/ze;let best=0,bd=1e9;PANO.pos.forEach((p,i)=>{const dd=Math.abs(p.cx-mid);if(dd<bd){bd=dd;best=i}});S2.near=best;
  const fl=LAST[best];capT={x:tx+ze*fl.cx,y:ty+ze*fl.top-6,txt:GROUPS[best].cap}}
 /* caption = kit chip */
 let cap=LAY.querySelector('.krr-cap');if(!cap){cap=document.createElement('div');cap.className='krr-cap';LAY.appendChild(cap)}
 const showCap=capT&&capT.txt&&!S2.appr&&S2.sel<0&&!S2.sheet;cap.style.display=showCap?'block':'none';
 if(showCap){cap.innerHTML=kitChip(capT.txt,'n');cap.style.left=Math.max(D.x0+70,Math.min(D.x1-70,capT.x))+'px';cap.style.top=Math.max(34,capT.y)+'px'}
 strip();
 /* notice pill = kit chip (red) pointing toward the trouble */
 let pl=LAY.querySelector('.krr-pill');if(!pl){pl=document.createElement('div');pl.className='krr-pill';LAY.appendChild(pl)}
 const qg=GROUPS.findIndex(g=>g.quarrel);let showP=S2.glow>0&&S2.pill>0&&qg>=0;
 if(showP){let left,vis;if(ringMode){left=LAST[qg].d<0;vis=Math.abs(LAST[qg].d)<1.2}else{const sx=PANO.tx+PANO.ze*LAST[qg].cx;left=sx<(D.x0+D.x1)/2;vis=sx>D.x0&&sx<D.x1}
  pl.innerHTML=kitChip((left?'‹ ':'')+'Có chuyện'+(left?'':' ›'),'r');pl.style.opacity=S2.pill;pl.style.left=left?(D.x0+4)+'px':'auto';pl.style.right=left?'auto':(D.W-D.x1+4)+'px';pl.style.display=vis?'none':'block'}else pl.style.display='none';
 /* option sheet (kit dlg box + bare opts) next to the lit person */
 LAY.querySelectorAll('.krr-sheet').forEach(e=>e.remove());
 if(S2.sheet>0&&S2.sel>=0){const g=GROUPS[S2.sel],m=g.m[S2.selm];const L=document.createElement('div');L.className='krr-sheet';L.style.cssText='left:0;top:0;width:100%;height:100%;opacity:'+S2.sheet;
  const opts=kitBareOpts(m.acts.map(n=>({n})),()=>{});const w=Math.min(300,D.W*.5);
  const lx=LAST[S2.sel].left,rx=LAST[S2.sel].right;let x=Math.min(D.W-w-8,(rx+10));if(x<D.x0&&false)x=D.x0;let right=D.W-rx-10>w+6;if(!right)x=Math.max(8,lx-w-10);
  if(cfg.sheetBottom)x=Math.round((D.W-w)/2);
  const sx=D.x0+(D.x1-D.x0)*.40,sw=D.W-sx-8;const b=kitDlgBox(L,m.name||'Người lạ',[opts],{x:sx,y:44,w:sw},null,{kind:'choice',noSeal:true});L.g={w:D.W,H:D.H};LAY.appendChild(L)}
}
function tw(key,to,ms,from){return new Promise(res=>{const a=from!==undefined?from:S2[key],t0=performance.now();(function f(n){const t=Math.min(1,(n-t0)/ms);S2[key]=a+(to-a)*ease(t);render();t<1?requestAnimationFrame(f):res()})(t0)})}
async function init(c){cfg=c;{const e=document.getElementById('scimg');if(e){e.style.opacity='';if(c.scimg)e.style.backgroundImage=`url(${c.scimg})`}}GROUPS=c.groups;N=GROUPS.length;
 await loadAsp(GROUPS.flatMap(g=>g.m.map(srcOf)));
 if(c.mode==='S'){/* panorama host inside the layer */
  D=geo();build();const tw0=D.H*1280/720;PANO={pos:[]};const host=document.createElement('div');host.style.cssText='position:absolute;left:0;top:0;transform-origin:0 0;height:'+D.H+'px';
  let x=c.gap*.8;GROUPS.forEach(g=>{const ww=g.wU*c.hS;PANO.pos.push({cx:x+ww/2});x+=ww+c.gap});PANO.Wp=x;host.style.width=x+'px';
  const nt=Math.ceil(x/tw0);for(let i=0;i<nt;i++){const t=document.createElement('div');t.style.cssText=`position:absolute;top:0;left:${i*tw0}px;width:${tw0}px;height:${D.H}px;background:url(${c.bg}) center/auto 100% no-repeat;${i%2?'transform:scaleX(-1)':''}`;host.appendChild(t)}
  LAY.insertBefore(host,LAY.firstChild);GROUPS.forEach(g=>g.m.forEach(m=>host.appendChild(m.el)));PANO.el=host;document.getElementById('scimg').style.opacity='0'}
 else build();
 render()}
function camFor(i){return Math.max(0,Math.min(PANO.Wp-(D.x1-D.x0)-D.x0,PANO.pos[i].cx-(D.x0+D.x1)/2))}
return {S:S2,P,init,render,tw,wait,camFor,gi:id=>GROUPS.findIndex(g=>g.id===id),get LAST(){return LAST},get D(){return D},get GROUPS(){return GROUPS},get PANO(){return PANO},get cfg(){return cfg},frontIdx,wrap,ease}})();
