/* ================= jcloth: SLOPPY / CREASED OUTFIT = a CODE filter over her existing outfit picture (owner 17/11 ~23:20Z, no new art) =================
   Owner (verbatim, dev/OWNER_DECISIONS.md 17/11 ~23:20Z): the "ăn mặc lôi thôi" look is a code effect that makes the existing outfit picture look
   wrinkled / crumpled / sloppy ("nhăn, nhàu, lôi thôi"), not new drawings. Used by looks-2 CLOTHES "xoc" (Áo xốc xếch) now, by any later dressing result.
   ONE kit effect in the face-fx / figure layer path (KIT_FACEFX entry "lkcloth", the same box as the picture, like the makeup colour layer of jtoil):
     (a) cloth mask = figure alpha minus skin pixels (colour-matched to HER OWN face), minus hair (dark pixels joined to the head) and the head zone;
     (b) inside the mask: crease shading from a noise height-field = vertical fold lines that follow the robe's fall + diagonal pulls at the waist and
         the sleeves, applied as dark crease lines + light/shade relief + a few small highlights (multiply / screen on the picture's own colours);
     (c) a slight displacement warp of the hem, the collar / lapel and a small skew so the robe sits askew.
   The result is a baked canvas image of the whole figure (cache per picture + level), laid over the picture; the picture underneath is hidden (class kclo-on)
   so the warped edge never shows a ghost. Numbers: BAL.looks.xoc (nhẹ / vừa / nặng); BAL.looks.xoc.on = 0 keeps the live feature OFF until the owner approves
   (the sample page / tests call clothXocBake directly). Core = pure functions (no game globals): usable from any tool. ================= */
Object.assign(BAL.looks,{xoc:{on:0,
 /* per level 1..3 (nhẹ / vừa / nặng): crease = dark fold lines, relief = light-and-shade of the folds, hi = highlight on the ridges,
    dens = fold lines per figure width, diag = strength of waist / sleeve diagonal pulls, warp = hem wave (% of figure width), skew = hem tilt (% of width),
    collar = lapel / collar drift (% of width) */
 lv:[null,{waist:5,belt:3,elbow:2,hem:4,drag:1,dep:1.2,crease:.2,relief:1.5,hi:.06,warp:1.4,skew:2.5,collar:2},{waist:8,belt:5,elbow:4,hem:7,drag:2,dep:1.45,crease:.2,relief:1.55,hi:.08,warp:2.3,skew:4.5,collar:3.5},{waist:12,belt:8,elbow:6,hem:11,drag:4,dep:1.75,crease:.26,relief:1.85,hi:.1,warp:3.4,skew:7,collar:5}],
 seed:7,light:[-.55,-.8],skin:{de:15,lum:.32,min:.003,max:.02},hair:{de:26,reach:.34},head:.012,item:60}});
/* ---------- tiny deterministic noise ---------- */
function clothHash(x,y,s){let h=(x*374761393+y*668265263+s*2147483647)|0;h=(h^(h>>>13))*1274126177|0;return((h^(h>>>16))>>>0)/4294967295}
function clothNoise(x,y,s){const xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
 const a=clothHash(xi,yi,s),b=clothHash(xi+1,yi,s),c=clothHash(xi,yi+1,s),d=clothHash(xi+1,yi+1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
function clothFbm(x,y,s,o){let t=0,a=.5,f=1,n=0;for(let i=0;i<(o||3);i++){t+=a*clothNoise(x*f,y*f,s+i*17);n+=a;a*=.5;f*=2.03}return t/n}
const clothRidge=n=>{const r=1-Math.abs(2*n-1);return r*r}   /* thin bright line where the noise crosses its middle */
const clothSmooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
function clothBlur(src,W,H,r){/* separable box blur x2, Float32 */const t=new Float32Array(W*H),o=new Float32Array(W*H),k=2*r+1;
 for(let y=0;y<H;y++){let s=0;const b=y*W;for(let x=-r;x<=r;x++)s+=src[b+Math.min(W-1,Math.max(0,x))];for(let x=0;x<W;x++){t[b+x]=s/k;s+=src[b+Math.min(W-1,x+r+1)]-src[b+Math.max(0,x-r)]}}
 for(let x=0;x<W;x++){let s=0;for(let y=-r;y<=r;y++)s+=t[Math.min(H-1,Math.max(0,y))*W+x];for(let y=0;y<H;y++){o[y*W+x]=s/k;s+=t[Math.min(H-1,y+r+1)*W+x]-t[Math.max(0,y-r)*W+x]}}return o}
/* ---------- (a) the cloth mask: figure alpha − skin − hair − head ---------- */
function clothRGB2Lab(r,g,b){const f=v=>{v/=255;return v>.04045?Math.pow((v+.055)/1.055,2.4):v/12.92},R=f(r),G=f(g),B=f(b);
 const X=(R*.4124+G*.3576+B*.1805)/.95047,Y=R*.2126+G*.7152+B*.0722,Z=(R*.0193+G*.1192+B*.9505)/1.08883,q=t=>t>.008856?Math.cbrt(t):7.787*t+16/116;
 return[116*q(Y)-16,500*(q(X)-q(Y)),200*(q(Y)-q(Z))]}
/* d = Uint8ClampedArray RGBA of W×H; face = {x,y,w,h} in pixels (the lower-face box, band = nose bridge) or null. Returns {m: Float32 0..1 cloth, y0: first cloth row, y1: last, cx} */
function clothMask(d,W,H,face,B){const n=W*H,Lab=new Float32Array(n*3);let y0=H,y1=0,x0=W,x1=0;
 for(let i=0;i<n;i++){if(d[i*4+3]>128){const y=(i/W)|0,x=i-y*W;if(y<y0)y0=y;if(y>y1)y1=y;if(x<x0)x0=x;if(x>x1)x1=x;const l=clothRGB2Lab(d[i*4],d[i*4+1],d[i*4+2]);Lab[i*3]=l[0];Lab[i*3+1]=l[1];Lab[i*3+2]=l[2]}}
 const fh=y1-y0+1,fw=x1-x0+1;if(!face)face={x:x0+fw*.40,y:y0+fh*.085,w:fw*.24,h:fh*.07};
 const cx=face.x+face.w/2,chin=face.y+face.h+(B.head||0)*fh;
 /* skin reference = HER OWN face: median Lab of the opaque pixels in the face box */
 const S=[];for(let y=Math.max(0,face.y|0);y<Math.min(H,face.y+face.h);y++)for(let x=Math.max(0,face.x|0);x<Math.min(W,face.x+face.w);x++){const i=y*W+x;if(d[i*4+3]>240)S.push(i)}
 const med=k=>{const a=S.map(i=>Lab[i*3+k]).sort((p,q)=>p-q);return a.length?a[a.length>>1]:0},sl=med(0),sa=med(1),sb=med(2);
 const skin=new Uint8Array(n),tol=B.skin.de;
 for(let i=0;i<n;i++){if(d[i*4+3]<128)continue;const da=Lab[i*3+1]-sa,db=Lab[i*3+2]-sb,dl=Lab[i*3]-sl;
  /* skin = the same chroma as her face (hue + saturation), allowed to be darker (shade) but not far lighter; robe cream has less chroma / other hue */
  if(Math.sqrt(da*da+db*db)<tol*.62&&dl>-sl*B.skin.lum&&dl<14&&Lab[i*3+1]>sa-4)skin[i]=1}
 /* skin = only real blobs (face, neck, hands, feet); a few robe-trim pixels with a skin-like colour are not skin: drop components smaller than skin.min of the figure area */
 {const seen=new Uint8Array(n),minA=B.skin.min*fw*fh;for(let s=0;s<n;s++){if(!skin[s]||seen[s])continue;const comp=[s],st=[s];seen[s]=1;while(st.length){const i=st.pop(),y=(i/W)|0,x=i-y*W;for(const j of[x>0?i-1:-1,x<W-1?i+1:-1,y>0?i-W:-1,y<H-1?i+W:-1]){if(j>=0&&skin[j]&&!seen[j]){seen[j]=1;st.push(j);comp.push(j)}}}
  if(comp.length<minA||comp.length>B.skin.max*fw*fh)for(const i of comp)skin[i]=0}}/* too big = a skin-coloured robe, not a hand / neck */
 /* hair = dark pixels of the head zone's hair colour, grown downwards while the colour stays hair (long hair over the shoulders), limited reach */
 const hair=new Uint8Array(n);let hl=0,ha=0,hb=0,hn=0;const hy1=Math.min(H,face.y+face.h*.2|0);
 for(let y=y0;y<hy1;y++)for(let x=(cx-fw*.30)|0;x<cx+fw*.30;x++){const i=y*W+x;if(d[i*4+3]>240&&Lab[i*3]<30){hl+=Lab[i*3];ha+=Lab[i*3+1];hb+=Lab[i*3+2];hn++}}
 if(hn>40){hl/=hn;ha/=hn;hb/=hn;const lim=Math.min(H-1,(chin+fh*B.hair.reach)|0),st=[];
  const near=i=>{const dl=Lab[i*3]-hl,da=Lab[i*3+1]-ha,db=Lab[i*3+2]-hb;return Math.sqrt(dl*dl+da*da+db*db)<B.hair.de&&Lab[i*3]<48};
  for(let y=y0;y<=chin;y++)for(let x=0;x<W;x++){const i=y*W+x;if(d[i*4+3]>128&&near(i)){hair[i]=1;if(y>chin-fh*.03)st.push(i)}}
  while(st.length){const i=st.pop(),y=(i/W)|0,x=i-y*W;for(const j of[i-1,i+1,i-W,i+W]){if(j<0||j>=n)continue;const yy=(j/W)|0;if(yy>lim||hair[j]||d[j*4+3]<=128)continue;if(near(j)){hair[j]=1;st.push(j)}}}}
 const m=new Float32Array(n);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;if(d[i*4+3]<128||y<=chin||skin[i]||hair[i])continue;m[i]=d[i*4+3]/255}
 /* drop specks: skin / hair holes are fine, but isolated 1-px cloth islands inside the skin (finger gaps) are not cloth */
 const mb=clothBlur(m,W,H,1);for(let i=0;i<n;i++)m[i]=Math.min(m[i],mb[i]>.34?1:0)*(d[i*4+3]/255);
 /* protect = skin, hair and "items" (pixels far from the robe's own colour: jade pendant, held fan, jewellery), grown a little; folds and warp never touch it */
 const rl=[],ra=[],rb=[];for(let i=0;i<n;i+=7)if(m[i]>.9){rl.push(Lab[i*3]);ra.push(Lab[i*3+1]);rb.push(Lab[i*3+2])}const md=a=>{a.sort((p,q)=>p-q);return a.length?a[a.length>>1]:0},rLl=md(rl),rLa=md(ra),rLb=md(rb),pr=new Float32Array(n);
 for(let i=0;i<n;i++){if(d[i*4+3]<128)continue;if(skin[i]||hair[i]){pr[i]=1;continue}if(m[i]>.5){const dl=Lab[i*3]-rLl,da=Lab[i*3+1]-rLa,db=Lab[i*3+2]-rLb;if(Math.sqrt(dl*dl+da*da+db*db)>B.item)pr[i]=1}}
 const prot=clothBlur(clothBlur(pr,W,H,3),W,H,3);for(let i=0;i<n;i++)prot[i]=Math.min(1,prot[i]*4);
 const ps=new Float32Array(n);for(let i=0;i<n;i++)ps[i]=skin[i]||hair[i]?1:0;const protS=clothBlur(clothBlur(ps,W,H,3),W,H,3);for(let i=0;i<n;i++)protS[i]=Math.min(1,protS[i]*4);/* strokes avoid only skin + hair (embroidery is part of the robe); warp also avoids items */
 return{m:clothBlur(m,W,H,1),y0,y1,x0,x1,cx,chin,skin,hair,prot,protS}}
/* ---------- (b) fold height-field: vertical folds along the fall + diagonal pulls at waist and sleeves ---------- */
function clothRng(s){let a=(s*2654435761)>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
/* fold height-field built from CREASE STROKES (no iso-contour noise, which reads as marble): every wrinkle is a short tapered valley line with a lit ridge beside it.
   Directions: vertical along the robe's fall; around the belt knot / hips / elbows they RADIATE from the tension point (pull wrinkles); counts + length per level.
   h = hills and valleys (light / shade through the gradient), cv = the thin dark line in the valley. */
function clothField(W,H,mk,L,seed){const n=W*H,h=new Float32Array(n),cv=new Float32Array(n),fh=mk.y1-mk.y0+1,fw=mk.x1-mk.x0+1,cx=mk.cx,waist=mk.y0+fh*.47,R=clothRng(seed*977+13),pr=mk.protS;
 const splat=(x0,y0,ang,len,wd,dep,bend)=>{const dx=Math.cos(ang),dy=Math.sin(ang),nx=-dy,ny=dx,steps=Math.max(4,len|0);
  for(let k=0;k<=steps;k++){const t=k/steps,tp=Math.pow(Math.sin(Math.PI*Math.min(1,t*.98+.01)),.8),off=bend*len*(t-.5)*(t-.5)*2,px=x0+dx*len*t+nx*off,py=y0+dy*len*t+ny*off,r=wd*3.2;
   for(let yy=Math.floor(py-r);yy<=py+r;yy++)for(let xx=Math.floor(px-r);xx<=px+r;xx++){if(xx<0||yy<0||xx>=W||yy>=H)continue;const i=yy*W+xx;if(mk.m[i]<.3||pr[i]>.35)continue;
    const sd=((xx-px)*nx+(yy-py)*ny)/wd,val=Math.exp(-sd*sd),rid=Math.exp(-Math.pow(sd-1.9,2)*.8)*.55;/* soft valley + a light ridge beside it */
    h[i]+=(-val+rid)*dep*tp*.11;const c=val*val*tp*dep;if(c>cv[i])cv[i]=Math.min(1,c)}}};
 const rowSpan=y=>{let a=-1,b=-1;for(let x=0;x<W;x++)if(mk.m[(y|0)*W+x]>.9){if(a<0)a=x;b=x}return[a,b]};
 const J=()=>R()-.5,D=L.dep;
 /* fan = creases radiating from one point (waist tie, elbow) */
 const fan=(ox,oy,k,len,wd,dep,spread,base)=>{for(let q=0;q<k;q++){const ang=base+(q-(k-1)/2)*spread+J()*.12;splat(ox+Math.cos(ang)*fw*.02,oy+Math.sin(ang)*fw*.02,ang,len*(.75+R()*.5),wd*(.8+R()*.5),dep*(.75+R()*.5),J()*.5)}};
 /* 1. the waist tie: a fan opening down and out, plus a few above the belt (bunched, horizontal) */
 fan(cx,waist+fh*.02,L.waist,fh*.14,3.4,D,.26,Math.PI/2);
 for(let q=0;q<L.belt;q++){const y=waist-fh*(.015+R()*.07),sp=rowSpan(y),span=Math.min(sp[1],cx+fw*.3)-Math.max(sp[0],cx-fw*.3);if(span<20)continue;splat(Math.max(sp[0],cx-fw*.3)+R()*span*.5,y,J()*.18,fw*(.09+R()*.1),3,D*.85,J()*.6)}
 /* 2. elbows / inner sleeve: a small crumple of 3 fanned creases + short horizontal pulls, both arms */
 if(L.elbow>0)for(const sd of[-1,1]){const ex=cx+sd*fw*.3,ey=mk.y0+fh*.5;fan(ex,ey,L.elbow,fh*.09,3.2,D*.9,.35,sd<0?Math.PI*.9:Math.PI*.1);
  for(let q=0;q<Math.ceil(L.elbow/2);q++)splat(ex-fw*.07+J()*fw*.04,ey+fh*(.03+q*.025),J()*.25,fw*.12,2.8,D*.7,J()*.5)}
 /* 3. the hem: short horizontal bunched wrinkles above the edge */
 for(let q=0;q<L.hem;q++){const y=mk.y1-fh*(.03+R()*.09),sp=rowSpan(y);if(sp[0]<0||sp[1]-sp[0]<fw*.3)continue;splat(sp[0]+(.08+R()*.78)*(sp[1]-sp[0]),y,J()*.22,fw*(.08+R()*.1),3,D*.8,J()*.6)}
 /* 4. drag lines from the shoulder toward the waist knot (a couple of diagonals) */
 for(let q=0;q<L.drag;q++){const sd=q%2?1:-1,sx=cx+sd*fw*(.2+R()*.08),sy=mk.y0+fh*(.13+R()*.03),ang=Math.atan2(waist-sy,cx-sx);splat(sx+Math.cos(ang)*fh*.03,sy+Math.sin(ang)*fh*.03,ang,fh*(.16+R()*.06),3.4,D*.85,sd*.25)}
 return{h,cv}}
/* ---------- the effect: one call = baked ImageData ---------- */
function clothXocBake(d,W,H,lv,opt){opt=opt||{};const B=BAL.looks.xoc,L=B.lv[cl(lv|0,1,3)],n=W*H,seed=opt.seed==null?B.seed:opt.seed;
 const mk=opt.mask||clothMask(d,W,H,opt.face||null,B),m=mk.m,fh=mk.y1-mk.y0+1,fw=mk.x1-mk.x0+1;
 const F=clothField(W,H,mk,L,seed),h=F.h,cv=clothBlur(F.cv,W,H,2),hs=clothBlur(h,W,H,2);
 /* shading: relief from the gradient toward the light, creases darker where the field peaks (the fold line), small highlights on the lit ridge */
 const sh=new Float32Array(n),dk=new Float32Array(n),hi=new Float32Array(n),lx=B.light[0],ly=B.light[1];
 for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){const i=y*W+x;if(m[i]<.02)continue;if(mk.prot[i]>.5){continue}const gx=(hs[i+1]-hs[i-1])*.5,gy=(hs[i+W]-hs[i-W])*.5,s=-(gx*lx+gy*ly)*1.3;
  sh[i]=Math.max(-1,Math.min(1,s));dk[i]=Math.min(1,cv[i]*.8);hi[i]=Math.max(0,s)*Math.max(0,1-cv[i]*1.4)}
 /* cloth layer = original colours × shading; the lapel / hem / skew warp samples it from displaced positions */
 /* keep the robe's overall brightness: folds only move light around (the mean shade of the mask is put back, 85 %) */
 const A=L.crease,R=L.relief,Hh=L.hi;let ms=0,mc=0;for(let i=0;i<n;i++)if(m[i]>.5){ms+=sh[i]*R*.5-A*dk[i]*.8;mc++}const mean=mc?ms/mc:0;
 const cloth=new Float32Array(n*4);
 for(let i=0;i<n;i++){const k=m[i];if(k<.01)continue;const lum=(d[i*4]*.3+d[i*4+1]*.59+d[i*4+2]*.11)/255;
  const mul=1-A*dk[i]*(.6+.4*lum)+R*.5*sh[i]*(.7+.3*lum)-mean*.85,add=Hh*hi[i]*(1-lum*.45),tn=[1,.97,.9];/* shadow is the cloth's own colour darker (warm), never grey */
  for(let c=0;c<3;c++){const v=d[i*4+c],mm=1-(1-mul)*(c===2?1.12:c===1?1.04:1);cloth[i*4+c]=Math.max(0,Math.min(255,v*mm+(255-v)*add*tn[c]))*k}cloth[i*4+3]=k}
 /* (c) warp ONLY the hem and the collar / lapel edge (uneven hem, askew collar); never hands, face, hair, pendants (protect map) */
 const hem0=mk.y1-fh*.12,col0=mk.y0+fh*.1,col1=mk.y0+fh*.24,hw=L.warp/100*fw,sk=L.skew/100*fw,cw=L.collar/100*fw,out=new Uint8ClampedArray(d.length);
 const dxo=new Float32Array(n),dyo=new Float32Array(n);
 for(let y=mk.y0;y<=mk.y1;y++){const wh=clothSmooth(hem0,mk.y1,y),wc=clothSmooth(col0,col0+fh*.03,y)*(1-clothSmooth(col1-fh*.05,col1,y));
  for(let x=0;x<W;x++){const i=y*W+x,u=(x-mk.cx)/fw,free=1-mk.prot[i];
   const hx=((clothFbm(u*3+1.7,y/fh*2,seed+3,2)-.5)*2*hw+hw*.55*Math.sin(u*5.4+1.2))*wh;
   const hy=((clothFbm(u*4.2+8.3,y/fh*3,seed+4,2)-.5)*1.6*hw+sk*u*1.6)*wh;
   const lap=clothSmooth(.32,.1,Math.abs(u));/* lapel only, near the centre line */
   const cxo=(cw*Math.max(0,-u)*3+cw*.5*(clothFbm(u*5,y/fh*7,seed+6,2)-.5)*2)*wc*lap,cyo=cw*Math.max(0,u)*1.4*wc*lap;
   dxo[i]=(hx+cxo)*free;dyo[i]=(hy+cyo)*free}}
 const dxs=clothBlur(dxo,W,H,3),dys=clothBlur(dyo,W,H,3);
 /* base = the picture with the cloth taken out (skin, hair, jewels stay put) */
 /* underlay = the picture with the SHADED cloth left where it was: a hem or lapel that slides away shows the cloth layer under it (robes are layered), never a hole */
 const fa=new Float32Array(n);for(let i=0;i<n;i++)fa[i]=d[i*4+3]/255;const fab=clothBlur(fa,W,H,Math.max(3,Math.round(fw*.03)));/* distance from the OUTER silhouette: the underlay keeps only the interior, so the outline itself can move */
 const nc=new Float32Array(n);for(let i=0;i<n;i++){const y=(i/W)|0;nc[i]=(mk.skin[i]||mk.hair[i]||y<=mk.chin)?d[i*4+3]/255:0}const ncb=clothBlur(nc,W,H,1);/* what stays put: skin, hair, head, jewels (the rim of the robe is NOT part of it, so no ghost outline) */
 const base=new Float32Array(n*4);for(let i=0;i<n;i++){const a=Math.min(ncb[i],d[i*4+3]/255),ie=clothSmooth(.8,.97,fab[i]),ca=cloth[i*4+3]*ie,oa=ca+a*(1-ca);base[i*4]=cloth[i*4]*ie+d[i*4]*a*(1-ca);base[i*4+1]=cloth[i*4+1]*ie+d[i*4+1]*a*(1-ca);base[i*4+2]=cloth[i*4+2]*ie+d[i*4+2]*a*(1-ca);base[i*4+3]=oa}
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;let r=0,g=0,b=0,a=0;
  if(m[i]>.01||dxs[i]!==0||dys[i]!==0){const sx=x-dxs[i],sy=y-dys[i],x0=Math.floor(sx),y0=Math.floor(sy),fx=sx-x0,fy=sy-y0;
   if(x0>=0&&y0>=0&&x0<W-1&&y0<H-1){const j=y0*W+x0,w0=(1-fx)*(1-fy),w1=fx*(1-fy),w2=(1-fx)*fy,w3=fx*fy;
    r=cloth[j*4]*w0+cloth[(j+1)*4]*w1+cloth[(j+W)*4]*w2+cloth[(j+W+1)*4]*w3;g=cloth[j*4+1]*w0+cloth[(j+1)*4+1]*w1+cloth[(j+W)*4+1]*w2+cloth[(j+W+1)*4+1]*w3;
    b=cloth[j*4+2]*w0+cloth[(j+1)*4+2]*w1+cloth[(j+W)*4+2]*w2+cloth[(j+W+1)*4+2]*w3;a=cloth[j*4+3]*w0+cloth[(j+1)*4+3]*w1+cloth[(j+W)*4+3]*w2+cloth[(j+W+1)*4+3]*w3}}
  /* cloth over base ("over", premultiplied) */
  const ba=base[i*4+3],oa=a+ba*(1-a);if(oa>0){out[i*4]=(r+base[i*4]*(1-a))/oa;out[i*4+1]=(g+base[i*4+1]*(1-a))/oa;out[i*4+2]=(b+base[i*4+2]*(1-a))/oa;out[i*4+3]=oa*255}}
 return{data:out,mask:mk}}
window.clothXocBake=clothXocBake;window.clothMask=clothMask;
/* ---------- game wiring (only when the game is there): looks-2 CLOTHES "xoc" -> baked figure layer in the kit fx path ---------- */
if(typeof KIT_FACEFX!=="undefined"&&typeof lkItem==="function"){
 const CLO={},CLQ=[],BLANK="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
 try{const st=document.createElement("style");st.textContent="img.kclo{pointer-events:none}img.kclo-on{visibility:hidden!important}";document.head.appendChild(st)}catch(e){}
 /* the figure picture -> canvas -> clothXocBake -> data URL (async, once per picture + level, cached 24); a redraw of the stage puts it in */
 function clothPaint(file,lv,e){fetch(IMG_U("img/"+file),{mode:"cors"}).then(r=>r.blob()).then(bl=>createImageBitmap(bl)).then(bm=>{const W=bm.width,H=bm.height,c=document.createElement("canvas");c.width=W;c.height=H;const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(bm,0,0);
  const id=g.getImageData(0,0,W,H);let face=null;try{const f=window.KIT_VEIL&&KIT_VEIL.fit&&KIT_VEIL.fit[file];if(f)face={x:f[0]/100*W,y:f[1]/100*H,w:f[2]/100*W,h:f[3]/100*H}}catch(x){}
  let sd=7;for(const ch of file)sd=(sd*31+ch.charCodeAt(0))%9973;const o=clothXocBake(id.data,W,H,lv,{face,seed:sd});g.putImageData(new ImageData(o.data,W,H),0,0);e.src=c.toDataURL("image/png");try{if(typeof kitFigFx==="function")kitFigFx()}catch(x){}}).catch(()=>{e.src=""})}
 function clothXocLayer(file,lv){if(!BAL.looks.xoc.on||!/^fig-/.test(file))return"";const key=file+"|"+lv;let e=CLO[key];if(!e){e=CLO[key]={src:"",t:0};CLQ.push(key);if(CLQ.length>24)delete CLO[CLQ.shift()];clothPaint(file,lv,e)}
  return e.src?`<img class="kclo" src="${e.src}" alt="" aria-hidden="true" style="--fleft:0%;--ftop:0%;--fwidth:100%;--fheight:100%">`:""}
 const ent=KIT_FACEFX.get("lkcloth");if(ent){const h0=ent.html;ent.html=(p,file,z)=>{const x=z.L.find(a=>a[0]==="xoc");return x?clothXocLayer(kitFile(file),x[1].lv):h0.apply(this,arguments)}}
 /* the cloth layer goes UNDER every face mark and the makeup (it repaints only the robe; the head is the picture's own) */
 (function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){const h=f0.apply(this,arguments);if(!h||h.indexOf("kclo")<0)return h;const M=[];const rest=h.replace(/<img class="kclo"[^>]*>/g,m=>{M.push(m);return""});return M.join("")+rest}})();
 /* hide the plain picture under a finished cloth layer; toggled on every put so a cleared effect shows the picture again */
 (function(){if(typeof kitFxPut!=="function")return;const p0=kitFxPut;kitFxPut=function(img,p,host){const r=p0.apply(this,arguments);try{if(img)img.classList.toggle("kclo-on",!!(host&&host.querySelector(".kfxf img.kclo")))}catch(e){}return r}})();
 window.clothXocLayer=clothXocLayer}
