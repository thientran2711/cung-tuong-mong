/* ================= jexpr: kitFaceExpr — facial expressions IN CODE, no redrawn art (owner 11/14, review/appearance) =================
   Data: img/face-lm.json = { "<por-/fig- file>": [x,y, x,y, ...] } in % of the picture (1 decimal), keys in KIT_EXPR.K order,
         measured once offline with a face-landmark model (dev/figwork/facelm.py, mediapipe FaceLandmarker) on every portrait and figure head.
   Runtime: a small canvas patch around the face is re-sampled through a smooth displacement field (gaussian "liquify" pulls at landmarks),
         feathered at its border, and laid over the picture as an ordinary kit face-fx layer (KIT_FACEFX entry "expr", lowest z),
         so tints / rash / slap / scar / veil all stay above it. Cached per (file, expression mix) as a blob URL.
   Expressions (mix weights 0..1, combinable): buon (mouth corners down, inner brows up, lids a little lower), gian (brows down + in,
         mouth flat and tight), dau (eyes squinted, brows knit, corners down), khoc (= buon + wet shine on the lower lids and one faint tear).
   Kept subtle on purpose: faces stay beautiful (owner base rule); weights above 1 are clamped.
   Self-contained (no game globals) so the pilot page can load it alone. ================= */
window.KIT_EXPR={K:["mL","mR","uL","lL","bLi","bLm","bLo","bRi","bRm","bRo","eLo","eLi","eLt","eLb","eRo","eRi","eRt","eRb","fL","fR","fh","chin","nose","mUL","mUR","mLL","mLR"],
 url:"img/face-lm.json",lm:null,_ld:0,cache:{},wait:{},
 load:function(){if(this.lm||this._ld)return;this._ld=1;try{fetch(this.url).then(r=>r.ok?r.json():null).then(j=>{if(j){KIT_EXPR.lm=j;try{KIT_EXPR.onload&&KIT_EXPR.onload()}catch(e){}}}).catch(()=>{})}catch(e){}},
 has:function(file){const n=String(file||"").split("/").pop();return !!(this.lm&&this.lm[n])},
 pts:function(file,W,H){const n=String(file||"").split("/").pop();const a=this.lm&&this.lm[n];if(!a)return null;const P={};this.K.forEach((k,i)=>{P[k]=[a[2*i]/100*W,a[2*i+1]/100*H]});return P},
 key:function(mix){return Object.keys(mix).filter(k=>mix[k]).sort().map(k=>k+(typeof mix[k]==="number"?Math.round(Math.min(1,mix[k])*10):String(mix[k]).replace(/[^0-9.,]/g,""))).join("_")},
 /* pulls: [cx,cy,dx,dy,r] in px; F = face width */
 pulls:function(P,mix){const F=Math.hypot(P.fR[0]-P.fL[0],P.fR[1]-P.fL[1])||1;const U=[];const cx=(P.mL[0]+P.mR[0])/2;
  const add=(p,dx,dy,r,w)=>{if(w>0)U.push([p[0],p[1],dx*F*w,dy*F*w,r*F])};
  const inL=P.bLi[0]<cx?1:-1;                                   /* direction from the left brow toward the face centre */
  const b=Math.min(1,mix.buon||0)+Math.min(1,mix.khoc||0)*.9,g=Math.min(1,mix.gian||0),d=Math.min(1,mix.dau||0);
  /* buồn: mouth line bent into a soft frown (corners well down, centre a touch up), inner brows lifted and slanted, upper lids lowered */
  add(P.mL,.012,.075,.12,b);add(P.mR,-.012,.075,.12,b);add(P.mUL,0,.028,.065,b);add(P.mUR,0,.028,.065,b);add(P.uL,0,-.006,.05,b);
  add(P.bLi,.006*inL,-.055,.075,b);add(P.bRi,-.006*inL,-.055,.075,b);add(P.bLo,0,.018,.07,b);add(P.bRo,0,.018,.07,b);
  add(P.eLt,0,.020,.045,b);add(P.eRt,0,.020,.045,b);
  /* giận: brows pulled down and in (a clear V), lids narrowed, lips pressed and the mouth narrowed */
  add(P.bLi,.034*inL,.055,.08,g);add(P.bRi,-.034*inL,.055,.08,g);add(P.bLm,.010*inL,.026,.08,g);add(P.bRm,-.010*inL,.026,.08,g);add(P.bLo,0,-.010,.06,g);add(P.bRo,0,-.010,.06,g);
  add(P.eLt,0,.014,.045,g);add(P.eRt,0,.014,.045,g);add(P.eLb,0,-.008,.035,g);add(P.eRb,0,-.008,.035,g);
  add(P.mL,.030,.030,.10,g);add(P.mR,-.030,.030,.10,g);add(P.lL,0,-.020,.065,g);add(P.uL,0,.012,.05,g);
  /* đau: eyes squeezed, inner brows knit and lifted, mouth corners pulled down */
  add(P.eLt,0,.028,.045,d);add(P.eRt,0,.028,.045,d);add(P.eLb,0,-.020,.04,d);add(P.eRb,0,-.020,.04,d);
  add(P.bLi,.026*inL,-.012,.07,d);add(P.bRi,-.026*inL,-.012,.07,d);add(P.bLo,0,.012,.06,d);add(P.bRo,0,.012,.06,d);
  add(P.mL,.012,.055,.11,d);add(P.mR,-.012,.055,.11,d);add(P.lL,0,-.012,.06,d);
  const v=Math.min(1,mix.vui||0),h=Math.min(1,mix.hon||0);
  add(P.mL,-.014*inL,-.050,.12,v);add(P.mR,.014*inL,-.050,.12,v);add(P.eLb,0,-.010,.045,v);add(P.eRb,0,-.010,.045,v);add(P.bLm,0,-.012,.08,v);add(P.bRm,0,-.012,.08,v);
  add(P.mL,.016*inL,.030,.10,h);add(P.mR,-.016*inL,.030,.10,h);add(P.lL,0,-.016,.06,h);add(P.bLi,.008*inL,.016,.08,h);add(P.bRi,-.008*inL,.016,.08,h);add(P.eLt,0,.012,.045,h);add(P.eRt,0,.012,.045,h);
  return{U,F}},
 make:function(img,file,mix){const W=img.naturalWidth||img.width,H=img.naturalHeight||img.height;const P=this.pts(file,W,H);if(!P||!W)return null;const {U,F}=this.pulls(P,mix);
  const xs=[P.fL[0],P.fR[0],P.mL[0],P.mR[0]],ys=[P.fh[1],P.chin[1]];
  let x0=Math.max(0,Math.floor(Math.min(...xs)-.12*F)),x1=Math.min(W,Math.ceil(Math.max(...xs)+.12*F)),y0=Math.max(0,Math.floor(Math.min(...ys)-.04*F)),y1=Math.min(H,Math.ceil(Math.max(...ys)+.06*F));
  const S=2,w=x1-x0,h=y1-y0;if(w<4||h<4)return null;                                  /* supersample 2x: crisp when the picture is shown larger than native; 4x cost too much memory with many faces */
  const src=document.createElement("canvas");src.width=w*S;src.height=h*S;const sx=src.getContext("2d");sx.imageSmoothingQuality="high";sx.drawImage(img,x0,y0,w,h,0,0,w*S,h*S);
  let D;try{D=sx.getImageData(0,0,w*S,h*S)}catch(e){return null}
  const out=sx.createImageData(w*S,h*S),A=D.data,O=out.data,WW=w*S,HH=h*S,fe=Math.max(2,Math.round(Math.min(w,h)*.12*S));
  const V=U.map(u=>[(u[0]-x0)*S,(u[1]-y0)*S,u[2]*S,u[3]*S,1/(u[4]*S*u[4]*S)]);
  for(let y=0;y<HH;y++)for(let x=0;x<WW;x++){let dx=0,dy=0;for(const v of V){const ex=x-v[0],ey=y-v[1];const t=(ex*ex+ey*ey)*v[4];if(t<9){const q=Math.exp(-t);dx+=v[2]*q;dy+=v[3]*q}}
   let fx=x-dx,fy=y-dy;fx=Math.max(0,Math.min(WW-1.001,fx));fy=Math.max(0,Math.min(HH-1.001,fy));const ix=fx|0,iy=fy|0,ax=fx-ix,ay=fy-iy;const i00=(iy*WW+ix)*4,i10=i00+4,i01=i00+WW*4,i11=i01+4;const o=(y*WW+x)*4;
   for(let c=0;c<4;c++)O[o+c]=(A[i00+c]*(1-ax)+A[i10+c]*ax)*(1-ay)+(A[i01+c]*(1-ax)+A[i11+c]*ax)*ay;
   const e=Math.min(x,y,WW-1-x,HH-1-y);if(e<fe)O[o+3]=O[o+3]*(e/fe)*(e/fe)}
  sx.putImageData(out,0,0);
  /* where the landmarks went after the warp (forward estimate), for the tints and the tear */
  const mv=p=>{let dx=0,dy=0;for(const u of U){const ex=p[0]-u[0],ey=p[1]-u[1];const q=Math.exp(-(ex*ex+ey*ey)/(u[4]*u[4]));dx+=u[2]*q;dy+=u[3]*q}return[p[0]+dx,p[1]+dy]};const Q={};for(const k in P)Q[k]=mv(P[k]);
  if(mix.eye||mix.lip)this.tint(sx,Q,x0,y0,S,F,mix);
  if((mix.khoc||0)>0)this.tear(sx,Q,x0,y0,S,F,Math.min(1,mix.khoc));
  return{cv:src,rect:[x0/W*100,y0/H*100,w/W*100,h/H*100]}},
 /* tints drawn on the landmarks (better than fixed CSS spots): eye = "r,g,b,a" soft shadow under each lower lid (multiply);
    lip = "r,g,b,a" recolours the lips keeping their painted shading (canvas 'color' blend) */
 tint:function(c,P,x0,y0,S,F,mix){const T=p=>[(p[0]-x0)*S,(p[1]-y0)*S];const col=v=>{const t=String(v).split(",");const a=t.map(Number);return[`rgb(${a[0]},${a[1]},${a[2]})`,a[3]==null||isNaN(a[3])?1:a[3],t[4]==="n"]};
  if(mix.eye){const [cc,a]=col(mix.eye);c.save();c.globalCompositeOperation="multiply";c.filter=`blur(${(.012*F*S).toFixed(1)}px)`;c.globalAlpha=a;c.fillStyle=cc;
   for(const [o,i,b] of [[P.eLo,P.eLi,P.eLb],[P.eRo,P.eRi,P.eRb]]){const A=T(o),Z=T(i),B=T(b);const cx=(A[0]+Z[0])/2,rx=Math.abs(Z[0]-A[0])*.5,ang=Math.atan2(Z[1]-A[1],Z[0]-A[0]);
    c.beginPath();c.ellipse(cx,B[1]+.046*F*S,rx*.9,.026*F*S,ang,0,Math.PI*2);c.fill()}c.restore()}
  if(mix.lip){const [cc,a,nrm]=col(mix.lip);c.save();c.globalCompositeOperation=nrm?"source-atop":"color";c.filter=`blur(${(.004*F*S).toFixed(1)}px)`;c.globalAlpha=a;c.fillStyle=cc;
   const L=["mL","mUL","uL","mUR","mR","mLR","lL","mLL"].map(k=>T(P[k]));const cx=L.reduce((s,p)=>s+p[0],0)/L.length,cy=L.reduce((s,p)=>s+p[1],0)/L.length;
   c.beginPath();L.forEach((p,i)=>{const q=[cx+(p[0]-cx)*1.08,cy+(p[1]-cy)*1.25];i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1])});c.closePath();c.fill();
   if(!nrm){c.globalCompositeOperation="source-atop";c.globalAlpha=a*.35;c.fillStyle="rgb(238,232,232)";c.fill()}c.restore()}},
 /* khóc: a faint wet shine along each lower lid and one small tear on the cheek facing the viewer */
 tear:function(c,P,x0,y0,S,F,k){const T=(p)=>[(p[0]-x0)*S,(p[1]-y0)*S];c.save();
  for(const [o,i,b] of [[P.eLo,P.eLi,P.eLb],[P.eRo,P.eRi,P.eRb]]){const a0=T(o),z0=T(i),m=T(b),a=[a0[0]*.8+z0[0]*.2,a0[1]*.8+z0[1]*.2],z=[z0[0]*.85+a0[0]*.15,z0[1]*.85+a0[1]*.15];const g=c.createLinearGradient(a[0],a[1],z[0],z[1]);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(.5,`rgba(255,255,255,${.70*k})`);g.addColorStop(1,"rgba(255,255,255,0)");
   c.strokeStyle=g;c.lineWidth=Math.max(1.5,.016*F*S);c.lineCap="round";c.beginPath();c.moveTo(a[0],a[1]+.004*F*S);c.quadraticCurveTo(m[0],m[1]+.006*F*S,z[0],z[1]+.004*F*S);c.stroke()}
  const e=T(P.eLb),i=T(P.eLi),L=.16*F*S,x=e[0]*.6+i[0]*.4,y=e[1]+.010*F*S;c.filter=`blur(${(.002*F*S).toFixed(1)}px)`;
  const tg=c.createLinearGradient(x,y,x,y+L);tg.addColorStop(0,`rgba(255,255,255,${.62*k})`);tg.addColorStop(1,`rgba(255,255,255,${.25*k})`);
  c.strokeStyle=`rgba(150,105,105,${.14*k})`;c.lineCap="round";c.lineWidth=Math.max(1.5,.012*F*S);c.beginPath();c.moveTo(x+.004*F*S,y);c.bezierCurveTo(x,y+L*.4,x-.008*F*S,y+L*.7,x-.006*F*S,y+L);c.stroke();
  c.strokeStyle=tg;c.lineWidth=Math.max(1.2,.009*F*S);c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x-.004*F*S,y+L*.4,x-.012*F*S,y+L*.7,x-.010*F*S,y+L);c.stroke();
  /* the drop: long teardrop, light from the top-left, a soft shadow under it */
  const r=.016*F*S,dx=x-.011*F*S,dy=y+L*.62;const drop=(ox,oy,sc)=>{c.beginPath();c.moveTo(dx+ox,dy+oy-r*2.1*sc);c.bezierCurveTo(dx+ox+r*.9*sc,dy+oy-r*.6*sc,dx+ox+r*1.0*sc,dy+oy+r*.9*sc,dx+ox,dy+oy+r*sc);c.bezierCurveTo(dx+ox-r*1.0*sc,dy+oy+r*.9*sc,dx+ox-r*.9*sc,dy+oy-r*.6*sc,dx+ox,dy+oy-r*2.1*sc);c.closePath()};
  c.fillStyle=`rgba(140,100,100,${.16*k})`;drop(r*.25,r*.3,1);c.fill();
  const dg=c.createRadialGradient(dx-r*.3,dy-r*.2,r*.05,dx,dy,r*1.3);dg.addColorStop(0,`rgba(255,255,255,${.92*k})`);dg.addColorStop(.5,`rgba(240,242,246,${.45*k})`);dg.addColorStop(1,`rgba(220,226,236,${.25*k})`);
  c.fillStyle=dg;drop(0,0,1);c.fill();c.restore()},
 /* async: returns a cached {url,rect} or null now and calls done() when ready */
 get:function(src,file,mix,done){const k=String(file).split("/").pop()+"|"+this.key(mix);const c=this.cache[k];if(c)return c;if(c===0)return null;
  if(this.wait[k]){if(done)this.wait[k].push(done);return null}this.wait[k]=done?[done]:[];
  const im=new Image();im.decoding="async";im.onload=()=>{const fin=r=>{KIT_EXPR.cache[k]=r||0;const L=KIT_EXPR.wait[k]||[];delete KIT_EXPR.wait[k];if(r)L.forEach(f=>{try{f(r)}catch(e){}})};
   let m=null;try{m=KIT_EXPR.make(im,file,mix)}catch(e){m=null}if(!m){fin(null);return}
   /* blob URL, not a data: string — keeps the JS heap small when many faces are on screen */
   try{m.cv.toBlob(b=>{fin(b?{url:URL.createObjectURL(b),rect:m.rect}:null);m.cv.width=m.cv.height=0},"image/png")}catch(e){fin(null)}};im.onerror=()=>{KIT_EXPR.cache[k]=0;delete KIT_EXPR.wait[k]};im.src=src;return null}};

