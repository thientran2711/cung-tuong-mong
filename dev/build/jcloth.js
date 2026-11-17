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
 /* per level 1..3 (nhẹ / vừa / nặng), r3: counts of creases per body place (waist = fan out of the tie, belt = bunched above the sash, elbow = per arm,
    hem = bunched above the hem, drag = shoulder→waist diagonals), dep = band strength 0..1, sg = band half-width (px at a 900-px figure),
    dark = how much a full-strength band darkens (multiply), lite = ridge light (screen), warp = hem wave (% of figure width), skew = hem tilt, collar = lapel drift */
 lv:[null,{waist:4,belt:4,bust:0,elbow:4,hem:4,drag:0,dep:1,sg:1.8,dark:.8,lite:.3,warp:.8,skew:1.2,collar:1,zig:0},{waist:5,belt:8,bust:4,elbow:8,hem:8,drag:0,dep:1,sg:2,dark:.9,lite:.34,warp:1.6,skew:2.6,collar:2.2,zig:0},{waist:6,belt:12,bust:8,elbow:12,hem:16,drag:0,dep:1,sg:2.2,dark:1,lite:.38,warp:2.8,skew:4.5,collar:3.6,zig:1.3}],
 /* body anchors as a share of the figure box (waist tie row, elbow bend, shoulder), ridge = offset / width (in band widths) / strength of the lit edge, comp = brightness kept */
 body:{waist:.34,elbowX:.24,elbowY:.43,shoulder:.17},ridge:{off:1.5,w:.35,k:1,edge:.3,soft:2.4},comp:.85,bunchK:4,
 seed:7,light:[-.55,-.8],skin:{de:15,lum:.32,min:.003,max:.02,fill:.25,asp:2.6},hair:{de:26,reach:.34},head:.012,item:60}});
/* r4 TASK 2: stain DECALS on the cloth (tra = tea, uot = wet, bun = mud). Decal art = CDN img/fx-stain-<kind>-<n>.webp (transparent webp); code places it on ANY figure through the cloth mask.
   on:0 = live feature OFF. lv[1..3] (nhẹ / vừa / nặng): n = decals, sc = decal width as a share of the robe width, op = opacity, wet = overall cloth darkening (wet cloth), pos = anchors tried in order
   (fx, fy = share of the robe box: chest / sleeve / hem), blend = multiply | soft | normal (folds and the robe's own pattern show through), variants = how many decal files exist per kind. */
Object.assign(BAL.looks,{stain:{on:0,
 lv:[null,{n:1,sc:.16,op:.7,wet:.04},{n:2,sc:.2,op:.78,wet:.09},{n:3,sc:.26,op:.85,wet:.15}],
 anchor:{chest:[.5,.27],sleeve:[.2,.5],hem:[.5,.93],hemL:[.22,.94],hemR:[.78,.94]},
 kind:{tra:{pos:["chest","sleeve","hem"],blend:"multiply",variants:3,wet:0},uot:{pos:["hem","sleeve","chest"],blend:"multiply",variants:2,wet:1},bun:{pos:["hem","hemL","hemR"],blend:"multiply",variants:2,wet:0}},
 rot:.5,jit:.05}});
/* ---------- tiny deterministic noise ---------- */
function clothHash(x,y,s){let h=(x*374761393+y*668265263+s*2147483647)|0;h=(h^(h>>>13))*1274126177|0;return((h^(h>>>16))>>>0)/4294967295}
function clothNoise(x,y,s){const xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
 const a=clothHash(xi,yi,s),b=clothHash(xi+1,yi,s),c=clothHash(xi,yi+1,s),d=clothHash(xi+1,yi+1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
function clothFbm(x,y,s,o){let t=0,a=.5,f=1,n=0;for(let i=0;i<(o||3);i++){t+=a*clothNoise(x*f,y*f,s+i*17);n+=a;a*=.5;f*=2.03}return t/n}
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
  let bx0=W,bx1=0,by0=H,by1=0;for(const i of comp){const y=(i/W)|0,x=i-y*W;if(x<bx0)bx0=x;if(x>bx1)bx1=x;if(y<by0)by0=y;if(y>by1)by1=y}const bw=bx1-bx0+1,bh=by1-by0+1;
  /* real skin blobs (hands, neck, feet) are compact; a long thin strip or a ragged lace of skin colour is robe trim / embroidery (r3) */
  const fill=comp.length/(bw*bh),asp=bh/Math.max(1,bw);/* tall thin = lapel / trim strip; hands are wide or round */
  if(comp.length<minA||comp.length>B.skin.max*fw*fh||fill<B.skin.fill||asp>B.skin.asp)for(const i of comp)skin[i]=0}}/* too big = a skin-coloured robe, not a hand / neck */
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
/* ---------- (b) crease map: every crease = a STRAIGHT (or gently tapered) soft gaussian dark band + a thin lighter ridge on its lit side (r3) ----------
   Painted-fold shading, not a relief / noise texture: no gradient lighting, no swirl, no turbulence (r1/r2 read as glass / zebra). Strokes are placed by
   the body: a fan of short folds out of the waist tie, bunched horizontal wrinkles just above the belt and above the hem, crumples at the elbow bend,
   1–2 diagonal drag lines shoulder→waist. dk = darkness 0..1 (multiply in the robe's own hue), lt = ridge light 0..1 (screen). */
function clothRng(s){let a=(s*2654435761)>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function clothField(W,H,mk,L,seed){const n=W*H,dk=new Float32Array(n),lt=new Float32Array(n),fh=mk.y1-mk.y0+1,fw=mk.x1-mk.x0+1,cx=mk.cx,B=BAL.looks.xoc,
  waist=mk.y0+fh*B.body.waist,R=clothRng(seed*977+13),pr=mk.protS,u=fh/900;/* u = 1 at the 900-px figure height the picture set is painted at */
 /* one crease: straight line (x0,y0) → angle, length len; sg = band half-width (px), dep = darkness; the ridge sits on the side facing the light, thinner */
 const lx=B.light[0],ly=B.light[1];
 const stroke=(x0,y0,ang,len,sg,dep)=>{const dx=Math.cos(ang),dy=Math.sin(ang);let nx=-dy,ny=dx;if(nx*lx+ny*ly<0){nx=-nx;ny=-ny}/* n points toward the light */
  const sgw=sg*u,r=sgw*3.5+2,xa=Math.min(x0,x0+dx*len)-r,xb=Math.max(x0,x0+dx*len)+r,ya=Math.min(y0,y0+dy*len)-r,yb=Math.max(y0,y0+dy*len)+r,ro=sgw*B.ridge.off,rw=sgw*B.ridge.w;
  for(let yy=Math.max(0,ya|0);yy<=Math.min(H-1,yb);yy++)for(let xx=Math.max(0,xa|0);xx<=Math.min(W-1,xb);xx++){const i=yy*W+xx;if(mk.m[i]<.3)continue;
   const px=xx-x0,py=yy-y0,t=(px*dx+py*dy)/len;if(t<-.05||t>1.05)continue;const tc=Math.max(0,Math.min(1,t));
   const tp=Math.pow(Math.sin(Math.PI*(.04+tc*.92)),.7)*(t<0?1+t*20:t>1?1-(t-1)*20:1);/* tapered both ends, thickest a little before the middle */
   const sd=px*nx+py*ny,w=sgw*(.55+.45*tp)*(sd>0?B.ridge.edge:B.ridge.soft),g=Math.exp(-.5*(sd/w)*(sd/w))*tp*dep,/* crisp on the lit side, soft fall-off on the shade side */ri=Math.exp(-.5*Math.pow((sd-ro*(.6+.4*tp))/rw,2))*tp*dep*B.ridge.k;
   const keep=1-Math.min(1,Math.max(pr[i]*1.6,mk.prot[i]*1.2));dk[i]=1-(1-dk[i])*(1-g*keep);lt[i]=Math.max(lt[i],ri*keep)}};
 const rowSpan=y=>{let a=-1,b=-1;const yy=Math.max(0,Math.min(H-1,y|0));for(let x=0;x<W;x++)if(mk.m[yy*W+x]>.9&&pr[yy*W+x]<.3){if(a<0)a=x;b=x}return[a,b]};
 const J=()=>R()-.5,D=L.dep,S=L.sg;
 /* 1. fan of short folds hanging out of the waist tie: start just below the knot, open downward ±35°, longest in the middle */
 for(let q=0;q<L.waist;q++){const f=L.waist>1?q/(L.waist-1)-.5:0,ang=Math.PI/2-f*1.5+J()*.25,ox=cx+f*fw*.08+J()*fw*.03,oy=waist+fh*(.015+R()*.03);/* splayed out of the knot (against the robe's own vertical pleats, so they read as creases) */
  stroke(ox,oy,ang,fh*(.05+.05*(1-Math.abs(f))+R()*.03),S*(.7+R()*.6),D*(.55+R()*.55))}
 /* bunch = a small stack of near-parallel short creases (fabric pushed together): k strokes stepped along the normal by gap, lengths and tilt jittered */
 const bunch=(x,y,ang,k,len,gap,sg,dep)=>{const nx=-Math.sin(ang),ny=Math.cos(ang);for(let j=0;j<k;j++){const o=(j-(k-1)/2)*gap*(.8+R()*.4),l=len*(.55+R()*.6),sh=(R()-.5)*len*.35;
  stroke(x+nx*o+Math.cos(ang)*sh-Math.cos(ang)*l/2,y+ny*o+Math.sin(ang)*sh-Math.sin(ang)*l/2,ang+J()*.18,l,sg*(.75+R()*.4),dep*(.7+R()*.4))}};
 const per=B.bunchK,gp=fh*.0065;
 /* 2. bunched horizontal wrinkles just above the belt (fabric pushed up by the sash) */
 for(let q=0;q<Math.ceil(L.belt/per);q++){const y=waist-fh*(.02+R()*.03),sp=rowSpan(y);if(sp[0]<0)continue;const a0=Math.max(sp[0],cx-fw*.28),a1=Math.min(sp[1],cx+fw*.28);if(a1-a0<fw*.1)continue;
  bunch(a0+fw*.06+R()*Math.max(1,a1-a0-fw*.12),y,J()*.25,Math.min(per,L.belt-q*per),fw*.2,gp,S*.85,D)}
 /* 2b. cluster of folds under the bust (r4) */
 for(let q=0;q<Math.ceil((L.bust||0)/per);q++){const y=mk.y0+fh*(.235+R()*.03),sp=rowSpan(y);if(sp[0]<0)continue;const sd=q%2?1:-1,bx=cx+sd*fw*(.19+R()*.06);if(bx<sp[0]||bx>sp[1])continue;
  bunch(bx,y,J()*.3,Math.min(per,L.bust-q*per),fw*.16,gp,S*.9,D)}
 /* 3. crumples at the inner elbow / sleeve bend: a stack of short diagonal creases on each arm, slanting down toward the body */
 for(const sd of[-1,1])for(let q=0;q<Math.ceil(L.elbow/per);q++){const ex=cx+sd*fw*(B.body.elbowX+J()*.05),ey=mk.y0+fh*(B.body.elbowY+J()*.04),ang=(sd<0?0:Math.PI)+sd*(.45+R()*.2);
  bunch(ex,ey,ang,Math.min(per,L.elbow-q*per),fw*.15,gp,S*.75,D*.9)}
 /* 4. bunched wrinkles above the hem: stacks of short, near-level creases spread across the skirt */
 for(let q=0;q<Math.ceil(L.hem/per);q++){const y=mk.y1-fh*(.04+R()*.07),sp=rowSpan(y);if(sp[0]<0||sp[1]-sp[0]<fw*.25)continue;
  bunch(sp[0]+(.12+R()*.76)*(sp[1]-sp[0]),y,J()*.3,Math.min(per,L.hem-q*per),fw*.22,gp*1.1,S,D)}
 /* 5. drag lines: long, faint, straight diagonals from the shoulder down toward the waist knot */
 for(let q=0;q<L.drag;q++){const sd=q%2?1:-1,sx=cx+sd*fw*(.27+R()*.05),sy=mk.y0+fh*(B.body.shoulder+.04+R()*.03),tx=cx-sd*fw*.06,ty=waist+fh*.02,ang=Math.atan2(ty-sy,tx-sx);
  stroke(sx,sy,ang,Math.hypot(tx-sx,ty-sy)*.85,S*.75,D*.32)}
 return{dk,lt}}
/* ---------- the effect: one call = baked ImageData ---------- */
function clothXocBake(d,W,H,lv,opt){opt=opt||{};const B=BAL.looks.xoc,L=B.lv[cl(lv|0,1,3)],n=W*H,seed=opt.seed==null?B.seed:opt.seed;
 const mk=opt.mask||clothMask(d,W,H,opt.face||null,B),m=mk.m,fh=mk.y1-mk.y0+1,fw=mk.x1-mk.x0+1;
 const F=clothField(W,H,mk,L,seed),dk=clothBlur(F.dk,W,H,1),lt=F.lt;
 /* cloth layer = original colours: crease = multiply toward the robe's OWN hue darkened (a touch more saturated, never grey), ridge = soft screen.
    Mean brightness kept: the small loss of the creases is spread back over the mask (cp share). */
 let ms=0,mc=0;for(let i=0;i<n;i++)if(m[i]>.5){ms+=dk[i]*L.dark-lt[i]*L.lite*.6;mc++}const comp=0;
 const cloth=new Float32Array(n*4);
 for(let i=0;i<n;i++){const k=m[i];if(k<.01)continue;const r=d[i*4],g=d[i*4+1],b=d[i*4+2],lum=(r*.3+g*.59+b*.11)/255,mx=Math.max(r,g,b,1);
  const a=dk[i]*L.dark*(.75+.35*lum),li=lt[i]*L.lite*(1-lum*.5);
  for(let c=0;c<3;c++){const v=c===0?r:c===1?g:b,sat=v/mx;/* the channel's share of the colour: dominant channels darken less -> own hue, a bit richer */
   let o=v*(1-Math.min(.34,a*.5));/* the robe hue darkened (all channels scaled alike: no brown / grey cast) */o=o+(255-o)*li;cloth[i*4+c]=Math.max(0,Math.min(255,o))*k}cloth[i*4+3]=k}
 /* (c) warp ONLY the hem and the collar / lapel edge (uneven hem, askew collar); never hands, face, hair, pendants (protect map) */
 const hem0=mk.y1-fh*.12,col0=mk.y0+fh*.1,col1=mk.y0+fh*.24,hw=L.warp/100*fw,sk=L.skew/100*fw,cw=L.collar/100*fw,out=new Uint8ClampedArray(d.length);
 const dxo=new Float32Array(n),dyo=new Float32Array(n);
 for(let y=mk.y0;y<=mk.y1;y++){const wh=clothSmooth(hem0,mk.y1,y),wc=clothSmooth(col0,col0+fh*.03,y)*(1-clothSmooth(col1-fh*.05,col1,y));
  for(let x=0;x<W;x++){const i=y*W+x,u=(x-mk.cx)/fw,free=1-mk.prot[i];
   const hx=((clothFbm(u*3+1.7,y/fh*2,seed+3,2)-.5)*2*hw+hw*.55*Math.sin(u*5.4+1.2))*wh;
   const zg=(L.zig||0)/100*fw*(Math.abs(((u*13+.37)%1+1)%1-.5)*4-1)*clothSmooth(mk.y1-fh*.06,mk.y1-fh*.01,y);/* crumpled zig-zag along the hem edge (lv3) */
   const hy=((clothFbm(u*4.2+8.3,y/fh*3,seed+4,2)-.5)*1.6*hw+sk*u*1.6)*wh+zg*free;
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
 /* r4: away from every crease and from the hem / lapel warp the output is BYTE-IDENTICAL to the picture (no resampling, no blur, no brightness shift) */
 for(let i=0;i<n;i++){if(dk[i]<.002&&lt[i]<.002&&Math.abs(dxs[i])<.01&&Math.abs(dys[i])<.01){out[i*4]=d[i*4];out[i*4+1]=d[i*4+1];out[i*4+2]=d[i*4+2];out[i*4+3]=d[i*4+3]}}
 return{data:out,mask:mk,field:F}}
/* ---------- TASK 2: one decal on the cloth (generic: stains now, crease decals later) ----------
   out = RGBA Uint8ClampedArray (W×H, modified in place); mk = clothMask result; dec = {w,h,data RGBA} (transparent decal);
   (ax,ay) = decal centre in pixels, scale = decal width as a share of the robe width, rot radians, op 0..1, blend multiply | soft | normal.
   Clipped by the cloth mask and kept off skin / hair / held items (protect map); the figure's own alpha is never changed. */
function drawDecalOnCloth(out,W,H,mk,dec,ax,ay,scale,rot,op,blend){const fw=mk.x1-mk.x0+1,dw=Math.max(2,fw*scale),sc=dw/dec.w,dh=dec.h*sc,c=Math.cos(rot),sn=Math.sin(rot),R=Math.hypot(dw,dh)/2+1;let n=0;
 for(let y=Math.max(0,Math.floor(ay-R));y<=Math.min(H-1,Math.ceil(ay+R));y++)for(let x=Math.max(0,Math.floor(ax-R));x<=Math.min(W-1,Math.ceil(ax+R));x++){const i=y*W+x,mm=mk.m[i];if(mm<.02)continue;
  const px=x-ax,py=y-ay,u=(px*c+py*sn)/sc+dec.w/2,v=(-px*sn+py*c)/sc+dec.h/2;if(u<0||v<0||u>=dec.w-1||v>=dec.h-1)continue;
  const u0=u|0,v0=v|0,fx=u-u0,fy=v-v0,j=(v0*dec.w+u0)*4,w0=(1-fx)*(1-fy),w1=fx*(1-fy),w2=(1-fx)*fy,w3=fx*fy,D=dec.data,k=dec.w*4;
  const da=(D[j+3]*w0+D[j+7]*w1+D[j+k+3]*w2+D[j+k+7]*w3)/255;if(da<.01)continue;
  const a=Math.min(1,da*op*mm*(1-Math.min(1,Math.max(mk.protS[i]*1.6,mk.prot[i]*1.2))));if(a<.003)continue;
  for(let q=0;q<3;q++){const dc=D[j+q]*w0+D[j+4+q]*w1+D[j+k+q]*w2+D[j+k+4+q]*w3,b=out[i*4+q];let o;
   if(blend==="normal")o=dc;else if(blend==="soft")o=dc<128?2*b*dc/255:255-2*(255-b)*(255-dc)/255;else o=b*dc/255;/* multiply: the robe's folds and pattern show through */
   out[i*4+q]=b+(o-b)*a}n++}
 return n}
/* kind = "tra" | "uot" | "bun", lv 1..3, decals = [{w,h,data}] (variants of that kind); opt.base = RGBA already shaded (e.g. the xoc bake) else the picture; returns {data,mask,count} */
function clothStainBake(d,W,H,kind,lv,decals,opt){opt=opt||{};const B=BAL.looks.stain,L=B.lv[cl(lv|0,1,3)],K=B.kind[kind],seed=opt.seed==null?BAL.looks.xoc.seed:opt.seed,
 mk=opt.mask||clothMask(d,W,H,opt.face||null,BAL.looks.xoc),out=new Uint8ClampedArray(opt.base||d),R=clothRng(seed*131+kind.charCodeAt(0)),fw=mk.x1-mk.x0+1,fh=mk.y1-mk.y0+1;let count=0;
 /* wet cloth: the whole robe a little darker (own hue), more at the heavy level */
 if(K.wet&&L.wet)for(let i=0;i<W*H;i++){const k=mk.m[i]*(1-Math.min(1,mk.protS[i]*1.6));if(k<.02)continue;const f=1-L.wet*k;out[i*4]*=f;out[i*4+1]*=f;out[i*4+2]*=f}
 if(decals&&decals.length)for(let q=0;q<L.n;q++){const nm=K.pos[q%K.pos.length],an=B.anchor[nm],dec=decals[Math.floor(R()*decals.length)%decals.length],
  ax=mk.x0+fw*(an[0]+(R()-.5)*B.jit*2),ay=mk.y0+fh*(an[1]+(R()-.5)*B.jit*2);
  count+=drawDecalOnCloth(out,W,H,mk,dec,ax,ay,L.sc*(.85+.3*R()),(R()-.5)*2*B.rot,L.op*(.9+.2*R()),K.blend)}
 return{data:out,mask:mk,count}}
window.drawDecalOnCloth=drawDecalOnCloth;window.clothStainBake=clothStainBake;
window.clothXocBake=clothXocBake;window.clothMask=clothMask;
/* ---------- game wiring (only when the game is there): looks-2 CLOTHES "xoc" -> baked figure layer in the kit fx path ---------- */
if(typeof KIT_FACEFX!=="undefined"&&typeof lkItem==="function"){
 const CLO={},CLQ=[],BLANK="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
 try{const st=document.createElement("style");st.textContent="img.kclo{pointer-events:none}img.kclo-on{visibility:hidden!important}";document.head.appendChild(st)}catch(e){}
 /* the figure picture -> canvas -> clothXocBake -> data URL (async, once per picture + level, cached 24); a redraw of the stage puts it in */
 /* decal files (transparent webp) fetched once per kind+variant, cached; a missing file just means that decal is skipped */
 const DEC={};function clothDecal(kind,n){const k=kind+"-"+n;if(!DEC[k])DEC[k]=fetch(IMG_U("img/fx-stain-"+k+".webp"),{mode:"cors"}).then(r=>r.ok?r.blob():Promise.reject()).then(bl=>createImageBitmap(bl)).then(bm=>{const c=document.createElement("canvas");c.width=bm.width;c.height=bm.height;const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(bm,0,0);const id=g.getImageData(0,0,c.width,c.height);return{w:c.width,h:c.height,data:id.data}}).catch(()=>null);return DEC[k]}
 /* the figure picture -> canvas -> xoc bake (creases) -> stain decals (tra / uot / bun) -> data URL (async, once per picture + effect set, cached 24); a redraw of the stage puts it in */
 function clothPaint(file,fx,e){fetch(IMG_U("img/"+file),{mode:"cors"}).then(r=>r.blob()).then(bl=>createImageBitmap(bl)).then(bm=>{const W=bm.width,H=bm.height,c=document.createElement("canvas");c.width=W;c.height=H;const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(bm,0,0);
  const id=g.getImageData(0,0,W,H);let face=null;try{const f=window.KIT_VEIL&&KIT_VEIL.fit&&KIT_VEIL.fit[file];if(f)face={x:f[0]/100*W,y:f[1]/100*H,w:f[2]/100*W,h:f[3]/100*H}}catch(x){}
  let sd=7;for(const ch of file)sd=(sd*31+ch.charCodeAt(0))%9973;let cur=id.data,mk=null;
  if(fx.xoc){const o=clothXocBake(cur,W,H,fx.xoc,{face,seed:sd});cur=o.data;mk=o.mask}
  const kinds=["tra","uot","bun"].filter(k=>fx[k]);let wait=Promise.resolve();
  for(const k of kinds)wait=wait.then(()=>Promise.all(Array.from({length:BAL.looks.stain.kind[k].variants},(_,i)=>clothDecal(k,i+1)))).then(ds=>{const o=clothStainBake(id.data,W,H,k,fx[k],ds.filter(Boolean),{face,seed:sd,base:cur,mask:mk});cur=o.data;mk=o.mask});
  return wait.then(()=>{g.putImageData(new ImageData(cur,W,H),0,0);e.src=c.toDataURL("image/png");try{if(typeof kitFigFx==="function")kitFigFx()}catch(x){}})}).catch(()=>{e.src=""})}
 function clothXocLayer(file,fx){if(!/^fig-/.test(file))return"";if(typeof fx==="number")fx={xoc:fx};const on={};if(BAL.looks.xoc.on&&fx.xoc)on.xoc=fx.xoc;if(BAL.looks.stain.on)for(const k of["tra","uot","bun"])if(fx[k])on[k]=fx[k];if(!Object.keys(on).length)return"";
  const key=file+"|"+JSON.stringify(on);let e=CLO[key];if(!e){e=CLO[key]={src:"",t:0};CLQ.push(key);if(CLQ.length>24)delete CLO[CLQ.shift()];clothPaint(file,on,e)}
  return e.src?`<img class="kclo" src="${e.src}" alt="" aria-hidden="true" style="--fleft:0%;--ftop:0%;--fwidth:100%;--fheight:100%">`:""}
 const ent=KIT_FACEFX.get("lkcloth");if(ent){const h0=ent.html;ent.html=(p,file,z)=>{const fx={};for(const a of z.L)if(a[0]==="xoc"||a[0]==="tra"||a[0]==="uot"||a[0]==="bun")fx[a[0]]=a[1].lv;return Object.keys(fx).length?clothXocLayer(kitFile(file),fx):h0.apply(this,arguments)}}
 /* the cloth layer goes UNDER every face mark and the makeup (it repaints only the robe; the head is the picture's own) */
 (function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){const h=f0.apply(this,arguments);if(!h||h.indexOf("kclo")<0)return h;const M=[];const rest=h.replace(/<img class="kclo"[^>]*>/g,m=>{M.push(m);return""});return M.join("")+rest}})();
 /* hide the plain picture under a finished cloth layer; toggled on every put so a cleared effect shows the picture again */
 (function(){if(typeof kitFxPut!=="function")return;const p0=kitFxPut;kitFxPut=function(img,p,host){const r=p0.apply(this,arguments);try{if(img)img.classList.toggle("kclo-on",!!(host&&host.querySelector(".kfxf img.kclo")))}catch(e){}return r}})();
 window.clothXocLayer=clothXocLayer}
