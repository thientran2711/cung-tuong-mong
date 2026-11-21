/* dauho-lv5 (owner 21/11, Fold, «Thử tay: Đầu hồ · hồi 5/5»: "cái vòng ... nó vô cái bình nó to quá, cho nên có một cái mũi tên nó nằm ở ngoài nhìn nó bị giả
   đó. Mình thu lại cho ngay đúng cái bình đi."). node dev/test/dauho-hole.js [index.html]
   On Fold 755x1000 and iPad 1180x820, with the real painted art (CDN):
   A Đầu hồ (j91 k91Fling) at the base board (Thử tay round 5 ease):
     1 the painted vase sits where the judge thinks: the outer lip run on the mouth row = BAL.mgArt.dauho.rim·Ws, centred on px; nothing painted above the top;
       the two ear tubes on the ear row are centred at px ± ear.dx·Ws
     2 real throws (wind 0) crossing the mouth row at d = 0, ±0.9 R → counted (1 / 0.7); at d = ±1.1 R (on the lip, outside the opening) → MISS;
       at d = +2.5 R → miss; a throw into the left ear tube's painted opening → 0.5 «Vào tai bình»; old ear band (d = −1.6 R at the mouth row) → never
       counted unless it truly drops into an ear opening
     3 every counted arrow is DRAWN in its hole: its visible pixels stay inside the vase's outer lip columns (mouth) / the ear tube (ear) and never
       below the hole's near edge
   B Bắn cung (j82 kg82Aim), whole group: the painted rings on the face row match BAL.mgArt.ban.ring·Pw (gold/red/blue/black/paper edges);
     a shot inside each ring scores that ring's q, outside the paper = miss; the arrow is drawn at the true x (no squeeze)
   C no page errors */
const {chromium}=require('playwright');const path=require('path');
const R0=path.resolve(__dirname,'../..');const URL='file://'+path.resolve(process.argv[2]||path.join(R0,'dev/index.html'));
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const DEV=[['Fold',755,1000],['iPad',1180,820]];
(async()=>{const b=await chromium.launch({args:['--disable-web-security']});/* pixel reads of the CDN art (else the canvas is tainted) */
 for(const [dn,w,h] of DEV){const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt&&typeof start==='function',null,{timeout:90000,polling:200});
  await p.evaluate(()=>{try{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}
   ["dauho-pot","dauho-arrow","ban-target","ban-arrow"].forEach(n=>kg82Img(n))});
  await p.waitForFunction(()=>["dauho-pot","dauho-arrow","ban-target","ban-arrow"].every(n=>kg82Ok(n)),null,{timeout:60000});
  /* ---- A Đầu hồ ---- */
  const open=async kind=>p.evaluate(async kind=>{KG82.noDemo=1;const K=KG82_KIND[kind];kg82Open({art:K.n,title:'kiểm',how:K.how||''});
   const t=mgTier(kind,{occ:"hoc",rank:0,lv:0});KG82.lv=t.ease;KG82.ctx='hoc';window.__end=null;KG82.flingGeo=null;KG82.aimGeo=null;kg82Play(kind,raw=>{window.__end=raw});
   const hk=kind==='dauho'?'flingGeo':'aimGeo';await new Promise((r,j)=>{const t0=Date.now();const w=()=>KG82[hk]?r():Date.now()-t0>20000?j(new Error('no engine hook '+hk+' phase='+KG82.phase)):setTimeout(w,30);w()});return t.ease},kind);
  const e0=await open('dauho');const cal5=await p.evaluate(()=>{const D=BAL.ag.mg2.cal.d;return mgTier("dauho",{occ:"hoc",lv:0,d:D[D.length-1]}).ease});
  ok(Math.abs(e0-cal5)<1e-9,`${dn} A0 real-play rank-0 board = Thử tay round 5 board`,{real:e0,round5:cal5});
  const geo=await p.evaluate(()=>{const G=KG82.flingGeo();G.setWind(0);const A=BAL.mgArt.dauho;
   const c=document.createElement('canvas');c.width=G.W;c.height=G.H;const g=c.getContext('2d');G.pot(g);const im=g.getImageData(0,0,G.W,G.H).data;
   const runs=y=>{y=Math.round(y);const R=[];let s=-1;for(let x=0;x<G.W;x++){const o=im[(y*G.W+x)*4+3]>128;if(o&&s<0)s=x;if(!o&&s>=0){R.push([s,x-1]);s=-1}}if(s>=0)R.push([s,G.W-1]);return R};
   const mr=runs(G.MY).find(([a,z])=>a<=G.px&&z>=G.px)||[0,0];const top=runs(G.MY-A.mouth.cy*G.Ws-2).filter(([a,z])=>z-a>2);const er=runs(G.ey);
   const near=(cx)=>{let best=null;er.forEach(([a,z])=>{const m=(a+z)/2;if(!best||Math.abs(m-cx)<Math.abs(best-cx))best=m});return best};
   return{W:G.W,H:G.H,px:G.px,MY:G.MY,R:G.R,Ws:G.Ws,rim:G.rim,ex:G.ex,ey:G.ey,er:G.er,lipHalf:(mr[1]-mr[0]+1)/2,lipMid:(mr[0]+mr[1])/2,top:top.length,earL:near(G.px-G.ex),earR:near(G.px+G.ex)}});
  ok(Math.abs(geo.lipHalf-geo.rim)<=Math.max(2,geo.rim*.05)&&Math.abs(geo.lipMid-geo.px)<=2,`${dn} A1 painted outer lip on the mouth row = judge's rim, centred`,{lipHalf:geo.lipHalf,rim:+geo.rim.toFixed(1),R:+geo.R.toFixed(1),mid:geo.lipMid,px:+geo.px.toFixed(1)});
  ok(geo.top===0,`${dn} A1 nothing painted above the vase top`);
  ok(Math.abs(geo.earL-(geo.px-geo.ex))<=geo.Ws*.03&&Math.abs(geo.earR-(geo.px+geo.ex))<=geo.Ws*.03,`${dn} A1 painted ear tubes centred where the judge's ear holes are`,{earL:geo.earL,earR:geo.earR,want:[+(geo.px-geo.ex).toFixed(1),+(geo.px+geo.ex).toFixed(1)]});
  /* a throw that crosses a given row at a given x (wind 0): fixed angle, bisect the speed (same 1/120 s steps as the flight) */
  const throwAt=async(d,row)=>p.evaluate(async([d,row])=>{let G=KG82.flingGeo();G.setWind(0);G.setPx(G.W*.7);G=KG82.flingGeo();/* fixed vase spot: the test is about the holes, not the random place */const Y=row==="ear"?G.ey:G.MY,xt=G.px+d;
   const cross=v=>{const a=Math.PI*52/180;let vx=v*Math.cos(a),vy=-v*Math.sin(a),x=G.X0,y=G.Y0;const h=1/120;for(let i=0;i<2000;i++){const py=y;vy+=G.GR*h;x+=vx*h;y+=vy*h;if(py<Y&&y>=Y)return x;if(y>G.H*3)return -1e9}return -1e9};
   let lo=50,hi=6000;for(let i=0;i<60;i++){const m=(lo+hi)/2;if(cross(m)<xt)lo=m;else hi=m}const v=(lo+hi)/2,a=Math.PI*52/180;
   const n0=G.landed().length;window.__fl=null;KG82.flingLast=null;G.shoot(v*Math.cos(a),-v*Math.sin(a));
   const L=await new Promise(r=>{const w=()=>KG82.flingLast?r(KG82.flingLast):setTimeout(w,5);w()});
   /* the stuck arrow, drawn alone on a clear canvas with the same clip, right at landing (before the next throw moves the vase) */
   let box=null;const ls=G.landed();if(ls.length>n0){const c=document.createElement('canvas');c.width=G.W;c.height=G.H;const g=c.getContext('2d');G.stuck(g,ls[ls.length-1]);const im=g.getImageData(0,0,G.W,G.H).data;
    let x0=1e9,x1=-1,y1=-1;for(let y=0;y<G.H;y++)for(let x=0;x<G.W;x++)if(im[(y*G.W+x)*4+3]>40){if(x<x0)x0=x;if(x>x1)x1=x;if(y>y1)y1=y}box={x0,x1,y1}}
   const out={q:L.q,at:L.at,dx:L.dx,R:G.R,rim:G.rim,ex:G.ex,er:G.er,ery:G.ery,ry:G.ry,px:G.px,MY:G.MY,ey:G.ey,box};
   await new Promise(r=>{const w=()=>G.phase()==='aim'||window.__end!=null?r():setTimeout(w,20);w()});return out},[d,row]);
  const cases=[['centre',0,'m',1],['inside left 0.9R',-.9,'m',.7],['inside right 0.9R',.9,'m',.7],['on the left lip 1.1R',-1.1,'m',0],['on the right lip 1.1R',1.1,'m',0],['far right 2.5R',2.5,'m',0]];
  for(const [nm,f,row,want] of cases){if(await p.evaluate(()=>window.__end!=null)){await open('dauho')}
   const r=await throwAt(f*geo.R*(await p.evaluate(()=>KG82.flingGeo().R))/geo.R,row);
   ok(r.q===want,`${dn} A2 throw ${nm} → q ${want}`,{q:r.q,at:r.at,dxR:+(r.dx/r.R).toFixed(2)});
   if(r.q>0&&r.box){const inCols=r.at===0?(r.box.x0>=r.px-r.rim-1&&r.box.x1<=r.px+r.rim+1&&r.box.y1<=r.MY+r.ry+1):false;
    ok(inCols,`${dn} A3 counted arrow drawn inside the vase mouth (${nm})`,{box:r.box,lip:[+(r.px-r.rim).toFixed(1),+(r.px+r.rim).toFixed(1)],nearEdge:+(r.MY+r.ry).toFixed(1)})}}
  {if(await p.evaluate(()=>window.__end!=null))await open('dauho');const er=await p.evaluate(()=>KG82.flingGeo().ex);
   const r=await throwAt(-er,'ear');ok(r.q===.5&&r.at===-1,`${dn} A2 throw into the painted left ear tube → 0.5 «Vào tai bình»`,{q:r.q,at:r.at});
   if(r.box){const hx=r.px-r.ex;ok(r.box.x0>=hx-r.er*1.7-1&&r.box.x1<=hx+r.er*1.7+1&&r.box.y1<=r.ey+r.ery+1,`${dn} A3 ear arrow drawn inside the ear tube`,{box:r.box,tube:[+(hx-r.er*1.7).toFixed(1),+(hx+r.er*1.7).toFixed(1)]})}}
  {if(await p.evaluate(()=>window.__end!=null))await open('dauho');const R=await p.evaluate(()=>KG82.flingGeo().R);const r=await throwAt(-1.6*R,'m');
   const inEar=r.q>0&&r.at!==0;ok(r.q===0||inEar,`${dn} A2 old ear band at the mouth row (d = −1.6 R) is no longer scored there`,{q:r.q,at:r.at});ok(!(r.q>0&&r.at===1),`${dn} A2 no arrow passes through the painted neck into the far ear`,{q:r.q,at:r.at})}
  /* ---- B Bắn cung ---- */
  await p.evaluate(()=>{try{kg82Close(true)}catch(e){}});await open('ban');
  const bg=await p.evaluate(()=>{const G=KG82.aimGeo();const c=document.createElement('canvas');c.width=G.W;c.height=G.H;const g=c.getContext('2d');kg82Spr(g,"ban-target",G.cx,G.ty,G.Pw,null,{ay:G.cy});
   const im=g.getImageData(0,0,G.W,G.H).data,y=Math.round(G.ty);const cls=x=>{const i=(y*G.W+Math.round(x))*4,r=im[i],gg=im[i+1],b=im[i+2],a=im[i+3];if(a<128)return'-';if(r>180&&gg>150&&b<110)return'Y';if(r>150&&gg<90)return'R';if(b>r+30)return'B';if(r<70&&gg<70&&b<70)return'K';return'w'};
   const edge=(want,from)=>{let last=from;for(let x=G.cx+from;x<G.W;x++){const k=cls(x);if(k===want)last=x-G.cx;}return last};
   /* outermost pixel of each colour to the right of the centre (paper: the last light pixel before the wooden rim) */
   const E={Y:0,R:0,B:0,K:0};let fr=null;for(let x=Math.ceil(G.cx);x<G.cx+G.ring[3]*1.15;x++){const k=cls(x);if(E[k]!=null)E[k]=x-G.cx;if(k==='R'&&fr==null)fr=x-G.cx}E.Y=fr;/* gold edge = where the red begins (the gold leaf is textured) */
   return{ring:G.ring,Pw:G.Pw,E}});
  const names=['gold','red','blue','black'];['Y','R','B','K'].forEach((k,i)=>ok(Math.abs(bg.E[k]-bg.ring[i])<=Math.max(2.5,bg.Pw*.012),`${dn} B1 painted ${names[i]} ring edge = BAL ring`,{painted:bg.E[k],bal:+bg.ring[i].toFixed(1)}));
  const shots=[['gold',.5*bg.ring[0],1],['red',(bg.ring[0]+bg.ring[1])/2,.75],['blue',(bg.ring[1]+bg.ring[2])/2,.5],['black',(bg.ring[2]+bg.ring[3])/2,.25],['outside the paper',bg.ring[4]*1.08,0]];
  for(const [nm,dx,want] of shots){const r=await p.evaluate(async dx=>{const G=KG82.aimGeo();while(G.lock())await new Promise(r=>setTimeout(r,20));const n=G.shots().length;KG82.aimLast=null;G.shootAt(G.cx+dx);
    const L=await new Promise(r=>{const w=()=>KG82.aimLast?r(KG82.aimLast):setTimeout(w,10);w()});const s=G.shots();return{q:L.q,drawn:s.length>n?s[s.length-1].x-G.cx:null}},dx);
   ok(r.q===want&&(want===0?r.drawn===null:Math.abs(r.drawn-dx)<.01),`${dn} B2 shot in the ${nm} → q ${want}, drawn at its true x`,{q:r.q,dx:+dx.toFixed(1),drawn:r.drawn==null?null:+r.drawn.toFixed(1)})}
  ok(!errs.length,`${dn} C no page errors`,errs.slice(0,3));await p.close()}
 await b.close();const n=res.filter(Boolean).length;console.log(`${n}/${res.length}`);process.exit(n===res.length?0:1)})();
