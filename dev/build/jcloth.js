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
Object.assign(BAL.looks,{xoc:{on:1,
 /* per level 1..3 (nhẹ / vừa / nặng), r3: counts of creases per body place (waist = fan out of the tie, belt = bunched above the sash, elbow = per arm,
    hem = bunched above the hem, drag = shoulder→waist diagonals), dep = band strength 0..1, sg = band half-width (px at a 900-px figure),
    dark = how much a full-strength band darkens (multiply), lite = ridge light (screen), warp = hem wave (% of figure width), skew = hem tilt, collar = lapel drift */
 lv:[null,{waist:4,belt:4,bust:0,elbow:4,hem:4,drag:0,dep:1,sg:1.8,dark:.8,lite:.3,warp:.8,skew:1.2,collar:1,zig:0},{waist:5,belt:8,bust:4,elbow:8,hem:8,drag:0,dep:1,sg:2,dark:.9,lite:.34,warp:1.6,skew:2.6,collar:2.2,zig:0},{waist:6,belt:12,bust:8,elbow:12,hem:16,drag:0,dep:1,sg:2.2,dark:1,lite:.38,warp:2.8,skew:4.5,collar:3.6,zig:1.3}],
 /* body anchors as a share of the figure box (waist tie row, elbow bend, shoulder), ridge = offset / width (in band widths) / strength of the lit edge, comp = brightness kept */
 body:{waist:.34,elbowX:.24,elbowY:.43,shoulder:.17},ridge:{off:1.5,w:.35,k:1,edge:.3,soft:2.4},comp:.85,bunchK:4,
 /* r4d (owner 17/11: crease = Magnific DECALS): mode 'decal' lays CDN img/fx-crease-1..4 (tall vertical fold patches), fx-crease-knot-1, fx-crease-hem-1 through drawDecalOnCloth (blend 'shade' = the grey fold shading scales the robe's own colour, hue kept);
    mode 'code' = the older stroke code (kept, off). dec: per level lv[1..3] n patches (2/4/6), knot / hem on or off, sc = patch width / robe width, op, pos = patch anchors (share of robe box, down the skirt), rot = max tilt, shadeK = contrast of the shading */
 dec:{mode:'decal',patch:4,lv:[null,{n:2,knot:0,hem:0,sc:.18,op:.85},{n:4,knot:0,hem:0,sc:.18,op:.92},{n:6,knot:0,hem:1,sc:.19,op:1}],pos:[[.44,.62],[.6,.72],[.3,.74],[.72,.66],[.5,.82],[.4,.52]],knotAt:[.5,.36],knotSc:.34,hemAt:[.5,.96],hemSc:.9,rot:.14,shadeK:1.5},
 seed:7,light:[-.55,-.8],skin:{de:15,lum:.32,min:.003,max:.02,fill:.25,asp:2.6,handX:.2,core:.35},hair:{de:26,reach:.34},head:.012,item:60,lowA:.55,lowB:.65}});
/* r4 TASK 2: stain DECALS on the cloth (tra = tea, uot = wet, bun = mud). Decal art = CDN img/fx-stain-<kind>-<n>.webp (transparent webp); code places it on ANY figure through the cloth mask.
   on:0 = live feature OFF. lv[1..3] (nhẹ / vừa / nặng): n = decals, sc = decal width as a share of the robe width, op = opacity, wet = overall cloth darkening (wet cloth), pos = anchors tried in order
   (fx, fy = share of the robe box: chest / sleeve / hem), blend = multiply | soft | normal (folds and the robe's own pattern show through), variants = how many decal files exist per kind. */
Object.assign(BAL.looks,{stain:{on:{uot:1,bun:1,tra:0}/* per kind: wet + mud ON (owner approved), tea OFF until the owner approves tea (flip tra to 1) */,
 lv:[null,{n:1,sc:.16,op:.6,wet:.5},{n:2,sc:.2,op:.72,wet:.78},{n:3,sc:.26,op:.85,wet:1}],
 anchor:{chest:[.5,.27],sleeve:[.2,.5],hem:[.5,.93],hemL:[.22,.94],hemR:[.78,.94],hemH1:[.5,.85],hemH2:[.28,.79],hemH3:[.72,.76],hemH4:[.45,.7],sleeveL:[.14,.6],sleeveR:[.86,.6],lap:[.42,.66]},
 kind:{tra:{pos:["chest","lap","sleeve"],blend:"stain",variants:3,wet:0,scm:1.4,dy:0,opm:1,tint:[135,82,38],tm:.9,lv:[null,{n:1,sc:.3,op:1.3},{n:2,sc:.36,op:1.2},{n:3,sc:.44,op:1.15}]},uot:{pos:["hem","sleeveL","sleeveR","hemL","hemR"],blend:"wet",variants:2,wet:1,scm:1.15,dy:0,opm:1,rotm:.4,deep:{k:.95,dark:.2,pow:1,paleP:.5,satMin:.07,warm:[1,.97,.88],rad:5,cling:2.2,hem:.84,hemV:.34,hemF:11,nx:5,ny:1.1,front:[0,.5,.75,1],floor:[0,0,.6,.92],darkL:[0,.2,.22,.3]}},bun:{pos:["hem"],blend:"mud",tm:.35,variants:8,base:2,wet:0,scm:1,tilt:.5,scatter:1,lv:[null,{n:8,sc:.32,op:.9},{n:9,sc:.34,op:.92},{n:12,sc:.38,op:1}],
  /* r6 lv2/lv3 = lv1 (owner OK) + painted mud pieces placed by code: d = decal number (fx-stain-bun-d), n = how many, sc = width share of the robe, at "hem" = its bottom edge on the real hem of that column, else fy = height of its bottom edge (0 top .. 1 hem), x = horizontal range, op = opacity */
  /* owner 18/11 (after 02:40Z panels): new lv1 = old lv2, new lv2 = old lv3, new lv3 = darker + higher + more marks; must read on warm / red robes too */
  add:[null,[{d:3,n:2,sc:.11,fy:[.8,.88],x:[.15,.85],op:.5},{d:5,n:2,sc:.055,fy:[.82,.9],x:[.2,.8],op:.5}],
   [{d:3,n:4,sc:.12,fy:[.72,.88],x:[.12,.88],op:.55},{d:5,n:3,sc:.06,fy:[.72,.88],x:[.15,.85],op:.55},{d:4,n:1,sc:.24,at:"hem",x:[.25,.75],op:.4}],
   [{d:3,n:6,sc:.13,fy:[.62,.86],x:[.1,.9],op:.7},{d:5,n:4,sc:.065,fy:[.64,.86],x:[.12,.88],op:.7},{d:4,n:2,sc:.26,at:"hem",x:[.2,.8],op:.55}]],
  tide:[null,{h:.08,v:.6,f:9,soft:.03,op:.42},{h:.15,v:.55,f:9,soft:.045,op:.55},{h:.23,v:.5,f:9,soft:.06,op:.7}],col:[122,84,50],warm:.35,shoe:.85}},
 rot:.5,jit:.05,
 /* r6e tea look: translucent amber (core = inside darkness, ring = tide-line edge, cap = max strength, pull = how far it is pulled toward tea brown on saturated red / orange cloth) */
 tea:{core:.5,ring:.25,cap:.5,mix:.9,tint:[170,98,42],base:1,texK:.3,texMin:.7,texMax:1.3,at:[.3,.28],rot:0,dripX:[-.12,.14,0],dripY:.2,dripLen:[.05,.04,.03],dripW:.006,dripOp:.7,
  /* r6h: one fixed splash (decal 1, no turn, no size jitter) for every costume; sc = width share of the robe; drips = thin runs down the grain */
  lv:[null,{sc:.14,op:1,drips:1},{sc:.2,op:1,drips:2},{sc:.27,op:1,drips:3}]}}});
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
 const skin=new Uint8Array(n),skinT=new Uint8Array(n),tol=B.skin.de;
 for(let i=0;i<n;i++){if(d[i*4+3]<128)continue;const da=Lab[i*3+1]-sa,db=Lab[i*3+2]-sb,dl=Lab[i*3]-sl;
  /* skin = the same chroma as her face (hue + saturation), allowed to be darker (shade) but not far lighter; robe cream has less chroma / other hue */
  if(Math.sqrt(da*da+db*db)<tol*.62&&dl>-sl*B.skin.lum&&dl<14&&Lab[i*3+1]>sa-4)skin[i]=1}
 /* skin = only real blobs (face, neck, hands, feet); a few robe-trim pixels with a skin-like colour are not skin: drop components smaller than skin.min of the figure area */
 {const seen=new Uint8Array(n),minA=B.skin.min*fw*fh;for(let s=0;s<n;s++){if(!skin[s]||seen[s])continue;const comp=[s],st=[s];seen[s]=1;while(st.length){const i=st.pop(),y=(i/W)|0,x=i-y*W;for(const j of[x>0?i-1:-1,x<W-1?i+1:-1,y>0?i-W:-1,y<H-1?i+W:-1]){if(j>=0&&skin[j]&&!seen[j]){seen[j]=1;st.push(j);comp.push(j)}}}
  let bx0=W,bx1=0,by0=H,by1=0;for(const i of comp){const y=(i/W)|0,x=i-y*W;if(x<bx0)bx0=x;if(x>bx1)bx1=x;if(y<by0)by0=y;if(y>by1)by1=y}const bw=bx1-bx0+1,bh=by1-by0+1;
  /* real skin blobs (hands, neck, feet) are compact; a long thin strip or a ragged lace of skin colour is robe trim / embroidery (r3) */
  const fill=comp.length/(bw*bh),asp=bh/Math.max(1,bw);/* tall thin = lapel / trim strip; hands are wide or round */
  const neck=by0<=chin+fh*.06&&bx0<cx+fw*.2&&bx1>cx-fw*.2&&comp.length>=minA;/* r5: the neck / V-neckline skin touches the head zone: always skin, even when it is a tall thin strip (it was dropped as 'lapel trim' and the stain layers darkened her neck) */
  if(!neck&&(comp.length<minA||comp.length>B.skin.max*fw*fh||fill<B.skin.fill||asp>B.skin.asp))for(const i of comp)skin[i]=0;
  else if(neck||(Math.abs((bx0+bx1)/2-cx)<B.skin.handX*fw&&by1<y0+fh*B.lowB))for(const i of comp)skinT[i]=1}}/* r6c skinT (stain layers): TRUE skin = neck + hands (near the body centre, above the knees); skin-coloured embroidery off to the side or low on the skirt (c03 lotus, c01 peony) is cloth and gets wet / muddy like the rest *//* too big = a skin-coloured robe, not a hand / neck */
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
 {/* r6c: a hand blob can swallow touching cream lining (loose skin colour test) -> dry glowing lobes once the robe is soaked. TRUE skin for the stain layers = pixels within ~3 px of a CORE of tight face-colour pixels */const core=new Float32Array(n);for(let i=0;i<n;i++)if(skinT[i]){const da=Lab[i*3+1]-sa,db=Lab[i*3+2]-sb;if(Math.sqrt(da*da+db*db)<tol*B.skin.core)core[i]=1}const cb=clothBlur(core,W,H,3);for(let i=0;i<n;i++)if(skinT[i]&&cb[i]<.04)skinT[i]=0}
 const mS=new Float32Array(n);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;if(d[i*4+3]<128||y<=chin||skinT[i]||hair[i])continue;mS[i]=d[i*4+3]/255}{const mb2=clothBlur(mS,W,H,1);for(let i=0;i<n;i++)mS[i]=Math.min(mS[i],mb2[i]>.34?1:0)*(d[i*4+3]/255)}/* r6c stain cloth mask */
 /* protect = skin, hair and "items" (pixels far from the robe's own colour: jade pendant, held fan, jewellery), grown a little; folds and warp never touch it */
 const rl=[],ra=[],rb=[];for(let i=0;i<n;i+=7)if(m[i]>.9){rl.push(Lab[i*3]);ra.push(Lab[i*3+1]);rb.push(Lab[i*3+2])}const md=a=>{a.sort((p,q)=>p-q);return a.length?a[a.length>>1]:0},rLl=md(rl),rLa=md(ra),rLb=md(rb),pr=new Float32Array(n);
 for(let i=0;i<n;i++){if(d[i*4+3]<128)continue;if(skin[i]||hair[i]){pr[i]=1;continue}if(m[i]>.5){const dl=Lab[i*3]-rLl,da=Lab[i*3+1]-rLa,db=Lab[i*3+2]-rLb;if(Math.sqrt(dl*dl+da*da+db*db)>B.item)pr[i]=1}}
 const prot=clothBlur(clothBlur(pr,W,H,3),W,H,3);for(let i=0;i<n;i++)prot[i]=Math.min(1,prot[i]*4);
 const ps=new Float32Array(n);for(let i=0;i<n;i++)ps[i]=skin[i]||hair[i]?1:0;const protS=clothBlur(clothBlur(ps,W,H,3),W,H,3);for(let i=0;i<n;i++)protS[i]=Math.min(1,protS[i]*4);/* strokes avoid only skin + hair (embroidery is part of the robe); warp also avoids items */
 /* r5 protF: skin + hair map with a SOFT 2-3 px feather and no halo (stain layers: wet, tea, mud); protS stays as it was for the creases */
 const psT=new Float32Array(n);for(let i=0;i<n;i++)psT[i]=skinT[i]||hair[i]?1:0;const pd=clothBlur(psT,W,H,2),ps2=new Float32Array(n);for(let i=0;i<n;i++)ps2[i]=pd[i]>.1?1:0;/* r5b: hands / wrists / fingers 100 % out: skin grown 2 px (finger shadows, antialiased edge), then a soft 2 px feather */
 const protF=clothBlur(clothBlur(ps2,W,H,1),W,H,1);for(let i=0;i<n;i++)protF[i]=Math.min(1,protF[i]*1.5);
 /* r6b protL (stain layers only): skin/hair (protF) + held items (prot) — but the item test is a colour test, so on the LOWER skirt it caught embroidered motifs (c03 lotus) and the wet/mud left a dry halo around them; skin-coloured motifs (pink lotus) were taken as skin too; hands never reach below .55-.65 of the figure, so there nothing is kept out */
 const pI=clothBlur(clothBlur(pr,W,H,1),W,H,1),protL=new Float32Array(n),fh0=y1-y0+1;/* items with a TIGHT 2 px feather (the wide prot left a dry glowing ring round hands / beads once the robe is soaked) */for(let y=0;y<H;y++){const lo=1-clothSmooth(y0+fh0*B.lowA,y0+fh0*B.lowB,y);for(let x=0;x<W;x++){const i=y*W+x,ctr=1-clothSmooth(B.skin.handX,B.skin.handX+.05,Math.abs(x-cx)/fw);protL[i]=Math.min(1,Math.max(protF[i]*1.5,Math.min(1,pI[i]*1.5)*lo*ctr))}/* held items sit at the hands (centre); far-off colour tests were embroidery */}
 return{m:clothBlur(m,W,H,1),mS:clothBlur(mS,W,H,1),y0,y1,x0,x1,cx,chin,skin,skinT,hair,prot,protS,protF,protL}}
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
 const F=B.dec.mode==="decal"?{dk:new Float32Array(n),lt:new Float32Array(n)}:clothField(W,H,mk,L,seed),dk=clothBlur(F.dk,W,H,1),lt=F.lt;
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
 if(B.dec.mode==="decal"&&opt.decals){const D=B.dec,DL=D.lv[cl(lv|0,1,3)],R=clothRng(seed*53+9),fw2=mk.x1-mk.x0+1,fh2=mk.y1-mk.y0+1,at=(a)=>[mk.x0+fw2*a[0],mk.y0+fh2*a[1]],P=opt.decals.patch||[];
  if(P.length)for(let q=0;q<DL.n;q++){const a=at(D.pos[q%D.pos.length]),j=at([ (R()-.5)*.05,(R()-.5)*.06]);drawDecalOnCloth(out,W,H,mk,P[Math.floor(R()*P.length)%P.length],a[0]+j[0]-mk.x0,a[1]+j[1]-mk.y0,DL.sc*(.8+.5*R()),(R()-.5)*2*D.rot,DL.op,"shade")}
  if(DL.knot&&opt.decals.knot&&opt.decals.knot.length){const a=at(D.knotAt);drawDecalOnCloth(out,W,H,mk,opt.decals.knot[0],a[0],a[1],D.knotSc,0,DL.op*.8,"shade")}
  if(DL.hem&&opt.decals.hem&&opt.decals.hem.length){const a=at(D.hemAt);drawDecalOnCloth(out,W,H,mk,opt.decals.hem[0],a[0],a[1],D.hemSc,0,DL.op,"shade")}}
 return{data:out,mask:mk,field:F}}
/* ---------- TASK 2: one decal on the cloth (generic: stains now, crease decals later) ----------
   out = RGBA Uint8ClampedArray (W×H, modified in place); mk = clothMask result; dec = {w,h,data RGBA} (transparent decal);
   (ax,ay) = decal centre in pixels, scale = decal width as a share of the robe width, rot radians, op 0..1, blend multiply | soft | normal.
   Clipped by the cloth mask and kept off skin / hair / held items (protect map); the figure's own alpha is never changed. */
function clothDecalMid(dec){let t=0,n=0;for(let i=0;i<dec.w*dec.h;i++){const a=dec.data[i*4+3]/255;t+=a*dec.data[i*4]/255;n+=a}dec.mid=n?t/n:.7}
function clothDecalRing(dec){const n=dec.w*dec.h,A=new Float32Array(n);for(let i=0;i<n;i++)A[i]=dec.data[i*4+3]/255;const r=Math.max(2,Math.round(.05*Math.min(dec.w,dec.h))),Ab=clothBlur(A,dec.w,dec.h,r),R=new Float32Array(n);for(let i=0;i<n;i++)R[i]=Math.min(1,Math.max(0,A[i]-Ab[i])*3.2);dec.A=A;dec.ring=R}
/* r6b: a decal drawn much smaller than its file (768 px -> 20-60 px) was point-sampled -> aliased pixel speckle. clothDecalMip = premultiplied 2x2 box halvings (cached on the decal) so the draw samples a copy at most 2x its drawn size: soft watercolour edges stay soft */
function clothDecalMip(dec,dw){let m=dec;while(m.w>dw*2&&m.w>8&&m.h>8){if(!m.half){const w=m.w>>1,h=m.h>>1,o=new Uint8ClampedArray(w*h*4),D=m.data;for(let y=0;y<h;y++)for(let x=0;x<w;x++){let a=0,r=0,g=0,b=0;for(const[dx,dy]of[[0,0],[1,0],[0,1],[1,1]]){const j=((2*y+dy)*m.w+2*x+dx)*4,al=D[j+3];a+=al;r+=D[j]*al;g+=D[j+1]*al;b+=D[j+2]*al}const i=(y*w+x)*4;o[i+3]=a/4;if(a){o[i]=r/a;o[i+1]=g/a;o[i+2]=b/a}}m.half={w,h,data:o}}m=m.half}return m}
/* r6h tea: ONE look on every costume = the cloth's own light/shade (its folds) re-coloured to one fixed amber, so orange and white robes get the same mark; never lighter than the dry cloth */
/* r6h: the ONE tea splash shape, drawn by code (a soft irregular blob, same lobes every time), so no costume can get a different picture */
let clothTeaDec=null;
function clothTeaShape(){if(clothTeaDec)return clothTeaDec;const N=128,data=new Uint8ClampedArray(N*N*4);for(let y=0;y<N;y++)for(let x=0;x<N;x++){const dx=(x+.5-N/2)/(N/2),dy=(y+.5-N/2)/(N/2),r=Math.hypot(dx,dy),t=Math.atan2(dy,dx),R=.62*(1+.1*Math.cos(2*t+1)+.08*Math.cos(3*t+2)+.05*Math.cos(5*t+.5)),a=1-clothSmooth(R-.22,R+.04,r);const i=(y*N+x)*4;data[i]=data[i+1]=data[i+2]=200;data[i+3]=Math.round(255*a)}return clothTeaDec={w:N,h:N,data}}
let clothTeaLm=150;
function clothTeaMix(out,i,sv){const T=BAL.looks.stain.tea,r=out[i*4],g=out[i*4+1],b=out[i*4+2],L=r*.3+g*.59+b*.11,tx=Math.min(T.texMax,Math.max(T.texMin,L/clothTeaLm)),k=T.base+T.texK*(tx-1),a=Math.min(1,sv/T.cap*T.mix);
 const tr=T.tint[0]*k,tg=T.tint[1]*k,tb=T.tint[2]*k,nr=r+(tr-r)*a,ng=g+(tg-g)*a,nb=b+(tb-b)*a,NL=nr*.3+ng*.59+nb*.11,f=NL>L&&NL>0?L/NL:1;out[i*4]=nr*f;out[i*4+1]=ng*f;out[i*4+2]=nb*f}
function drawDecalOnCloth(out,W,H,mk,dec,ax,ay,scale,rot,op,blend,tint,tm){const B=BAL.looks.stain;const fw=mk.x1-mk.x0+1,dw=Math.max(2,fw*scale);if(blend!=="shade")dec=clothDecalMip(dec,dw);const sc=dw/dec.w,dh=dec.h*sc,c=Math.cos(rot),sn=Math.sin(rot),R=Math.hypot(dw,dh)/2+1;let n=0;
 for(let y=Math.max(0,Math.floor(ay-R));y<=Math.min(H-1,Math.ceil(ay+R));y++)for(let x=Math.max(0,Math.floor(ax-R));x<=Math.min(W-1,Math.ceil(ax+R));x++){const i=y*W+x,mm0=(blend==="shade"?mk.m:mk.mS)[i];if(mm0<.5)continue;const mm=clothSmooth(.5,.97,mm0);
  const px=x-ax,py=y-ay,u=(px*c+py*sn)/sc+dec.w/2,v=(-px*sn+py*c)/sc+dec.h/2;if(u<0||v<0||u>=dec.w-1||v>=dec.h-1)continue;
  const u0=u|0,v0=v|0,fx=u-u0,fy=v-v0,j=(v0*dec.w+u0)*4,w0=(1-fx)*(1-fy),w1=fx*(1-fy),w2=(1-fx)*fy,w3=fx*fy,D=dec.data,k=dec.w*4;
  const da=(D[j+3]*w0+D[j+7]*w1+D[j+k+3]*w2+D[j+k+7]*w3)/255;if(da<.01)continue;
  const ef=Math.min(1,Math.min(u,v,dec.w-1-u,dec.h-1-v)/(.16*Math.min(dec.w,dec.h)+1));/* feathered rim: no hard patch edge */
  const wedge=blend==="shade"?1:1-(1-clothSmooth(.05,.15,Math.abs((x-mk.cx)/fw)))*(1-clothSmooth(mk.y0+(mk.y1-mk.y0+1)*.2,mk.y0+(mk.y1-mk.y0+1)*.3,y));/* r5: never on the neckline wedge (bare neck / chest skin in the V) */
  const a=Math.min(1,(blend==="stain"?1:wedge)*da*op*mm*ef*ef*(3-2*ef)*(1-(blend==='shade'?Math.min(1,Math.max(mk.protS[i]*1.6,mk.prot[i]*1.2)):mk.protL[i])));if(a<.003)continue;
  const mx0=Math.max(1,out[i*4],out[i*4+1],out[i*4+2]);
  if(blend==="stain"){/* translucent stain: only the decal SHAPE is used; multiply by a tea-brown factor so the fabric texture and folds stay visible; darker tide-line ring at the edge, lighter centre */
   if(!dec.A)clothDecalRing(dec);const ii=(Math.round(v)*dec.w+Math.round(u)),sv=Math.min(B.tea.cap,op*mm*ef*(1-mk.protL[i])*(B.tea.core*dec.A[ii]+B.tea.ring*dec.ring[ii]));if(sv<.01)continue;
   clothTeaMix(out,i,sv);n++;continue}/* r6e: on saturated red / orange cloth a tea-brown multiply stays red: pull toward a deeper tea brown by the cloth's saturation (BAL tra.tm), never lighter */
  for(let q=0;q<3;q++){let dc=D[j+q]*w0+D[j+4+q]*w1+D[j+k+q]*w2+D[j+k+4+q]*w3;if(tint)dc=dc+(tint[q]-dc)*tm;const b=out[i*4+q];let o;
   if(blend==="shade"){if(dec.mid==null)clothDecalMid(dec);const dl=dc/255-dec.mid;const sat=1-b/mx0;/* shade tinted to the robe: the weaker channels darken more, so shadows are the robe's own deeper hue, not neutral grey */o=b*(1+BAL.looks.xoc.dec.shadeK*(dl<0?dl*(1+.9*sat):dl*.45))}else if(blend==="normal")o=dc;else if(blend==="soft")o=dc<128?2*b*dc/255:255-2*(255-b)*(255-dc)/255;else if(blend==="mud"){const sat=1-Math.min(out[i*4],out[i*4+1],out[i*4+2])/mx0,e=Math.min(1,tm*sat*2.2);o=Math.min(b,b*dc/255*(1-e)+dc*.85*e)}else o=b*dc/255;/* mud (r6e): multiply, pulled toward the mud colour on saturated cloth; multiply: the robe's folds and pattern show through */
   out[i*4+q]=b+(o-b)*a}n++}
 return n}
/* r6 wet colour: local robe colour (blurred over the cloth only) gives the HUE; each channel is scaled by (channel / brightest channel)^P, so the weaker channels drop more: the robe's own hue gets deeper and richer, never neutral grey. Very pale / near-white cloth borrows the hue of the robe around it (wider blur) and a warm floor, so ivory turns deeper warm ivory, not grey. */
function clothLocalColour(o,W,H,mk,r){const n=W*H,R=new Float32Array(n),G=new Float32Array(n),Bc=new Float32Array(n),M=new Float32Array(n);for(let i=0;i<n;i++){const m=mk.mS[i]>.5&&mk.protL[i]<.3?1:0;M[i]=m;R[i]=o[i*4]*m;G[i]=o[i*4+1]*m;Bc[i]=o[i*4+2]*m}
 const out=[];for(const rr of[r,r*4]){const a=clothBlur(R,W,H,rr),b=clothBlur(G,W,H,rr),c=clothBlur(Bc,W,H,rr),m=clothBlur(M,W,H,rr);for(let i=0;i<n;i++){const z=m[i];if(z<.05){a[i]=o[i*4];b[i]=o[i*4+1];c[i]=o[i*4+2]}else{a[i]/=z;b[i]/=z;c[i]/=z}}/* no cloth around: the pixel's own colour (never 0 = black) */out.push([a,b,c])}return out}
function clothWetDeepen(o,i,C,s,P){if(s<=0)return;let r=C[0][0][i],g=C[0][1][i],b=C[0][2][i],mx=Math.max(1,r,g,b),sat=1-Math.min(r,g,b)/mx;
 if(sat<P.satMin){const R2=C[1][0][i],G2=C[1][1][i],B2=C[1][2][i],m2=Math.max(1,R2,G2,B2),s2=1-Math.min(R2,G2,B2)/m2,t=1-sat/P.satMin;/* near-white: take the wider robe hue, else a warm floor */
  let hr=R2/m2,hg=G2/m2,hb=B2/m2;if(s2<P.satMin){const f=1-s2/P.satMin;hr=hr+(1-hr)*f;hg=hg+(P.warm[1]-hg)*f;hb=hb+(P.warm[2]-hb)*f}r=r/mx*(1-t)+hr*t;g=g/mx*(1-t)+hg*t;b=b/mx*(1-t)+hb*t;mx=Math.max(r,g,b);sat=1-Math.min(r,g,b)/mx}
 const p=P.pow*(1+P.paleP*(1-Math.min(1,sat/.5))),dk=1-(P.dk||P.dark)*s;
 for(let q=0;q<3;q++){const v=o[i*4+q],h=Math.pow((q===0?r:q===1?g:b)/mx,p),f=(1-s)+s*h;o[i*4+q]=Math.min(v,v*f*dk)}}
/* r6: a decal's ALPHA stamped into a float field (wet shapes), same placement maths as drawDecalOnCloth; returns pixels touched */
function clothFieldDecal(F,W,H,mk,dec,ax,ay,scale,rot,op){const fw=mk.x1-mk.x0+1,dw=Math.max(2,fw*scale);dec=clothDecalMip(dec,dw);const sc=dw/dec.w,dh=dec.h*sc,c=Math.cos(rot),sn=Math.sin(rot),Rr=Math.hypot(dw,dh)/2+1;let n=0;
 for(let y=Math.max(0,Math.floor(ay-Rr));y<=Math.min(H-1,Math.ceil(ay+Rr));y++)for(let x=Math.max(0,Math.floor(ax-Rr));x<=Math.min(W-1,Math.ceil(ax+Rr));x++){const i=y*W+x;if(mk.mS[i]<.5)continue;
  const px=x-ax,py=y-ay,u=(px*c+py*sn)/sc+dec.w/2,v=(-px*sn+py*c)/sc+dec.h/2;if(u<0||v<0||u>=dec.w-1||v>=dec.h-1)continue;const da=dec.data[((v|0)*dec.w+(u|0))*4+3]/255;if(da<.01)continue;
  const ef=Math.min(1,Math.min(u,v,dec.w-1-u,dec.h-1-v)/(.16*Math.min(dec.w,dec.h)+1)),a=Math.min(1,da*op*ef*ef*(3-2*ef));if(a>F[i])F[i]=a;n++}return n}
/* kind = "tra" | "uot" | "bun", lv 1..3, decals = [{w,h,data}] (variants of that kind); opt.base = RGBA already shaded (e.g. the xoc bake) else the picture; returns {data,mask,count} */
function clothStainBake(d,W,H,kind,lv,decals,opt){opt=opt||{};const B=BAL.looks.stain,K=B.kind[kind],L=(K.lv||B.lv)[cl(lv|0,1,3)],seed=opt.seed==null?BAL.looks.xoc.seed:opt.seed,
 mk=opt.mask||clothMask(d,W,H,opt.face||null,BAL.looks.xoc),out=new Uint8ClampedArray(opt.base||d),R=clothRng(seed*131+kind.charCodeAt(0)),fw=mk.x1-mk.x0+1,fh=mk.y1-mk.y0+1;let count=0;
 /* wet cloth (r6): soaked silk = UNEVEN wet zones (shoulders, sleeves, hem wicking UP the pleats) + the wet decals' SHAPES (fx-stain-uot-*), one field; colour = clothWetDeepen: the robe's OWN hue, deeper (ivory -> warmer deeper ivory, blue -> deeper blue, red -> deeper red), never lighter, never greyer; drip runs under sleeve ends / hem; clear of skin / hair / items */
 if(K.wet&&L.wet){let ls=0,lc=0;for(let i=0;i<W*H;i+=5)if(mk.mS[i]>.9){ls+=d[i*4]*.3+d[i*4+1]*.59+d[i*4+2]*.11;lc++}const pale=cl(((lc?ls/lc/255:.5)-.55)*3,0,1);/* pale robes keep most of the robe DRY: smaller, sparser patches */
  const WP=K.deep,lvl=cl(lv|0,1,3),ws=L.wet*(1-.2*pale),t0=.74-.07*lvl+.1*pale,Wf=new Float32Array(W*H),Lm=new Float32Array(W*H);for(let i=0;i<W*H;i++)Lm[i]=out[i*4]*.3+out[i*4+1]*.59+out[i*4+2]*.11;const Lb=clothBlur(Lm,W,H,4);
  const hemTop=new Float32Array(W);for(let x=0;x<W;x++)hemTop[x]=WP.hem-WP.hemV*clothFbm(x/fw*WP.hemF+seed*.13,.5,seed+41,3);/* hem wet line per COLUMN: tongues wicking up the pleats, never a horizontal band */
  for(let y=mk.y0;y<=mk.y1;y++){const fy=(y-mk.y0)/fh;for(let x=mk.x0;x<=mk.x1;x++){const i=y*W+x;if(mk.mS[i]<.5)continue;const u=Math.abs((x-mk.cx)/fw),n=clothFbm(x/fw*WP.nx+seed*.37,y/fh*WP.ny,seed+21,3),
    zone=Math.max(clothSmooth(.05,.16,fy)*(1-clothSmooth(.27,.4,fy))*.9,clothSmooth(.18,.32,u)*clothSmooth(.2,.3,fy)*(1-clothSmooth(.7,.85,fy))*.8,clothSmooth(hemTop[x],hemTop[x]+.12,fy),clothSmooth(.32,.4,fy)*(1-clothSmooth(.66,.8,fy))*(1-clothSmooth(.14,.26,u))*WP.front[lvl])*(1-.25*pale);
    Wf[i]=clothSmooth(t0,t0+.16,n*.62+zone*(.5+.9*clothFbm(x/fw*WP.nx*.6+9,y/fh*WP.ny+3,seed+33,2))*.62)*clothSmooth(mk.chin,mk.chin+fh*.07,y)*(1-(1-clothSmooth(.05,.15,u))*(1-clothSmooth(mk.y0+fh*.2,mk.y0+fh*.3,y)))}}
  if(decals&&decals.length)for(let q=0;q<L.n;q++){const an=B.anchor[K.pos[q%K.pos.length]],dec=decals[Math.floor(R()*decals.length)%decals.length];/* wet decals: only their SHAPE joins the wet field (their own grey-blue colour is never painted) */
   count+=clothFieldDecal(Wf,W,H,mk,dec,mk.x0+fw*(an[0]+(R()-.5)*B.jit*2),mk.y0+fh*(an[1]+(R()-.5)*B.jit*2),L.sc*(K.scm||1)*(.85+.3*R()),(R()-.5)*2*B.rot*(K.rotm||1),L.op*(K.opm||1)*(.9+.2*R()))}
  const dn=1+lvl*2;for(let q=0;q<dn;q++){/* drip runs under the sleeve ends / hem: thin vertical wet streaks */
   const fx=R()<.5?.1+.14*R():.76+.14*R(),fyy=(R()<.55?.6:.88)+.05*R(),dx=mk.x0+fw*fx,dy0=mk.y0+fh*fyy,len=fh*(.05+.05*R()),sg=Math.max(1,fw*.006);
   for(let y=dy0|0;y<Math.min(H,dy0+len);y++){const t=(y-dy0)/len,a=Math.sin(Math.PI*Math.min(1,t*1.3))*.75;for(let x=Math.floor(dx-sg*3);x<=dx+sg*3;x++){if(x<0||x>=W)continue;const i=y*W+x;Wf[i]=Math.max(Wf[i],a*Math.exp(-.5*((x-dx)/sg)**2))}}}
  const Wb=clothBlur(Wf,W,H,2),C=clothLocalColour(out,W,H,mk,WP.rad);
  const WQ=Object.assign({},WP,{dk:WP.darkL[lvl]}),fl=WP.floor[lvl];/* r6c: lv2/lv3 soak the WHOLE robe below the chest a little (floor), so no dry slot is left between wet streaks — a dry slot next to deepened cloth reads as a white band */
  for(let i=0;i<W*H;i++){const y=(i/W)|0,fl0=fl?fl*clothSmooth(mk.chin+fh*.05,mk.chin+fh*.2,y)*(.85+.3*clothFbm((i%W)/fw*1.5,y/fh*1.5,seed+71,2)):0,w0=Math.max(Wb[i],fl0);const k=mk.mS[i]*(1-mk.protL[i]);if(k<.02||w0<.002)continue;const lm=Lm[i];
   const s=Math.min(1,w0*ws*k*WP.k+Math.max(0,Lb[i]-lm)/255*WP.cling*w0*ws*k);/* cloth clings: the SHADOW side of the folds deepens a little more */
   clothWetDeepen(out,i,C,s,WQ)}}
 const T=kind==="tra"&&B.tea&&B.tea.lv?B.tea:null;
 if(T&&decals&&decals.length){/* r6h owner: ONE cup of tea, ONE identical splash (same decal, same turn, same size, same amber) on every costume, high on the chest clear of the elbow fold; lv3 = a bit larger + more drips */
  let ls=0,lc=0;for(let i=0;i<W*H;i+=5)if(mk.mS[i]>.9){ls+=d[i*4]*.3+d[i*4+1]*.59+d[i*4+2]*.11;lc++}clothTeaLm=Math.max(60,lc?ls/lc:150);
  const TL=T.lv[cl(lv|0,1,3)],dec=clothTeaShape(),sc=TL.sc,ax=mk.x0+fw*T.at[0],ay=mk.y0+fh*T.at[1];
  count+=drawDecalOnCloth(out,W,H,mk,dec,ax,ay,sc,T.rot,TL.op,"stain",T.tint,0);
  const dw=fw*sc;for(let q=0;q<TL.drips;q++){/* drip runs: thin, tapered, straight down from the lower edge of the splash, fixed places */
   const dx=ax+dw*T.dripX[q],dy0=ay+dw*T.dripY,len=fh*T.dripLen[q],sg=Math.max(.8,fw*T.dripW);
   for(let y=dy0|0;y<Math.min(H,dy0+len);y++){const t=(y-dy0)/len,a=TL.op*T.dripOp*(1-t)*Math.min(1,t*6+.3);for(let x=Math.floor(dx-sg*3);x<=dx+sg*3;x++){if(x<0||x>=W)continue;const i=y*W+x,k=mk.mS[i]*(1-mk.protL[i]);if(k<.3)continue;clothTeaMix(out,i,Math.min(T.cap,a*Math.exp(-.5*((x-dx)/sg)**2)*k*T.cap))}}}}
 const D0=K.base?decals.slice(0,K.base):decals;
 if(D0&&D0.length&&!K.wet&&!T)for(let q=0;q<L.n;q++){const nm=K.pos[q%K.pos.length],an=B.anchor[nm],dec=D0[Math.floor(R()*D0.length)%D0.length];
  if(K.scatter){/* r5 mud follows the cloth grain: each streak is the strip decal turned VERTICAL, its foot on the hem line, running UP along the pleat, lengths vary, thinning with level; never a horizontal mark */
   const Ls=L.sc*K.scm*(.55+.6*R()),Lp=Ls*fw,ax=mk.x0+fw*(.1+.8*R()),ay=mk.y0+fh*.975-Lp*(.35+.2*R());
   count+=drawDecalOnCloth(out,W,H,mk,dec,ax,ay,Ls,Math.PI/2+(R()-.5)*K.tilt,L.op*(.9+.2*R()),K.blend,K.tint,K.tm);continue}
  const ax=mk.x0+fw*(an[0]+(R()-.5)*B.jit*2),ay=mk.y0+fh*(an[1]+(K.dy||0)+(R()-.5)*(K.jy||B.jit)*2);
  count+=drawDecalOnCloth(out,W,H,mk,dec,ax,ay,L.sc*(K.scm||1)*(.85+.3*R()),(R()-.5)*2*B.rot*(K.rotm||1),L.op*(K.opm||1)*(.9+.2*R()),K.blend,K.tint,K.tm)}
 if(K.add&&K.add[cl(lv|0,1,3)]&&decals){/* r6 mud pieces (lv2/lv3): soft tide band up the pleats + sparse drops / drips / splash on the real hem; never rows of spikes; shoes mostly clean */
  const base=new Uint8ClampedArray(out),hemY=new Int32Array(W);for(let x=0;x<W;x++){hemY[x]=mk.y1;for(let y=mk.y1;y>=mk.y0;y--)if(mk.mS[y*W+x]>.5){hemY[x]=y;break}}
  const T=K.tide&&K.tide[cl(lv|0,1,3)];if(T){const F=new Float32Array(W*H);for(let x=mk.x0;x<=mk.x1;x++){const ht=fh*T.h*(1-T.v+T.v*clothFbm(x/fw*T.f+seed*.21,.3,seed+57,3)),sf=fh*T.soft;
    for(let y=Math.max(mk.y0,Math.floor(hemY[x]-ht-sf*2));y<=hemY[x];y++){const i=y*W+x;if(mk.mS[i]<.5)continue;const up=hemY[x]-y;F[i]=(1-clothSmooth(ht-sf,ht+sf,up))*(.55+.45*(1-up/(ht+sf)))+.25*Math.exp(-.5*((up-ht)/(sf*.5+1))**2)}}/* darker at the hem, faint tide line at the top */
   const Fb=clothBlur(F,W,H,2);for(let i=0;i<W*H;i++){const f=Fb[i];if(f<.004)continue;const k=f*T.op*mk.mS[i]*(1-mk.protL[i]);if(k<.003)continue;const v0=out[i*4],v1=out[i*4+1],v2=out[i*4+2],mx=Math.max(1,v0,v1,v2),sat=1-Math.min(v0,v1,v2)/mx,e=Math.min(1,K.warm*sat*k*2.2);for(let q=0;q<3;q++){const m=out[i*4+q]*(1-k+k*K.col[q]/255);out[i*4+q]=Math.min(out[i*4+q],m*(1-e)+K.col[q]*.72*e)}count++}}/* r6e: on saturated (red / orange) cloth a brown multiply stays red: pull toward real mud brown there, never lighter */
  const R2=clothRng(seed*977+lv*13);for(const a of K.add[cl(lv|0,1,3)]){const dec=decals[a.d-1];if(!dec||!dec.w)continue;for(let q=0;q<a.n;q++){
   const fx=a.x[0]+(a.x[1]-a.x[0])*((q+.15+.7*R2())/a.n),ax=mk.x0+fw*fx,xi=cl(Math.round(ax),0,W-1),sc=a.sc*(.85+.3*R2()),dh=dec.h*(fw*sc/dec.w);
   const by=a.at==="hem"?hemY[xi]+dh*.04:mk.y0+fh*(a.fy[0]+(a.fy[1]-a.fy[0])*R2()),ay=by-dh/2;
   count+=drawDecalOnCloth(out,W,H,mk,dec,ax,ay,sc,(R2()-.5)*.12,a.op*(.9+.2*R2()),"mud",null,K.warm)}}
  if(K.shoe){/* shoes peek out under the centre of the hem: keep them mostly clean (a few drops may stay) */for(let y=Math.floor(mk.y1-fh*.05);y<=mk.y1;y++)for(let x=mk.x0;x<=mk.x1;x++){const i=y*W+x,u=Math.abs(x-mk.cx)/fw,z=K.shoe*(1-clothSmooth(.1,.18,u))*clothSmooth(mk.y1-fh*.05,mk.y1-fh*.03,y);if(z<=0)continue;for(let q=0;q<3;q++)out[i*4+q]=out[i*4+q]+(base[i*4+q]-out[i*4+q])*z}}}
 return{data:out,mask:mk,count}}
window.drawDecalOnCloth=drawDecalOnCloth;window.clothStainBake=clothStainBake;
window.clothXocBake=clothXocBake;window.clothMask=clothMask;
/* ---------- game wiring (only when the game is there): looks-2 CLOTHES "xoc" -> baked figure layer in the kit fx path ---------- */
if(typeof KIT_FACEFX!=="undefined"&&typeof lkItem==="function"){
 const CLO={},CLQ=[];let CLID=0;const BLANK="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
 try{const st=document.createElement("style");st.textContent="img.kclo{pointer-events:none}img.kclo-wait{opacity:0}img.kclo-on{clip-path:inset(100%)!important}";document.head.appendChild(st)}catch(e){}
 /* the figure picture -> canvas -> clothXocBake -> data URL (async, once per picture + level, cached 24); a redraw of the stage puts it in */
 /* decal files (transparent webp) fetched once per kind+variant, cached; a missing file just means that decal is skipped */
 const DEC={};function clothDecalKey(key){if(!DEC[key])DEC[key]=fetch(IMG_U("img/"+key+".webp"),{mode:"cors"}).then(r=>r.ok?r.blob():Promise.reject()).then(bl=>createImageBitmap(bl)).then(bm=>{const c=document.createElement("canvas");c.width=bm.width;c.height=bm.height;const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(bm,0,0);const id=g.getImageData(0,0,c.width,c.height);return{w:c.width,h:c.height,data:id.data}}).catch(()=>null);return DEC[key]}
 function clothDecal(kind,n){return clothDecalKey("fx-stain-"+kind+"-"+n)}
 /* the figure picture -> canvas -> xoc bake (creases) -> stain decals (tra / uot / bun) -> data URL (async, once per picture + effect set, cached 24); a redraw of the stage puts it in */
 function clothPaint(file,fx,e){fetch(IMG_U("img/"+file),{mode:"cors"}).then(r=>r.blob()).then(bl=>createImageBitmap(bl)).then(bm=>{const W=bm.width,H=bm.height,c=document.createElement("canvas");c.width=W;c.height=H;const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(bm,0,0);
  const id=g.getImageData(0,0,W,H);let face=null;try{const f=window.KIT_VEIL&&KIT_VEIL.fit&&KIT_VEIL.fit[file];if(f)face={x:f[0]/100*W,y:f[1]/100*H,w:f[2]/100*W,h:f[3]/100*H}}catch(x){}
  let sd=7;for(const ch of file)sd=(sd*31+ch.charCodeAt(0))%9973;let cur=id.data,mk=null;
  let pre=Promise.resolve(null);if(fx.xoc&&BAL.looks.xoc.dec.mode==="decal")pre=Promise.all([[1,2,3,4].map(i=>clothDecalKey("fx-crease-"+i)),[clothDecalKey("fx-crease-knot-1")],[clothDecalKey("fx-crease-hem-1")]].map(a=>Promise.all(a))).then(r=>({patch:r[0].filter(Boolean),knot:r[1].filter(Boolean),hem:r[2].filter(Boolean)}));
  return pre.then(dc=>{if(fx.xoc){const o=clothXocBake(cur,W,H,fx.xoc,{face,seed:sd,decals:dc});cur=o.data;mk=o.mask}
  const kinds=["tra","uot","bun"].filter(k=>fx[k]);let wait=Promise.resolve();
  for(const k of kinds)wait=wait.then(()=>Promise.all(Array.from({length:BAL.looks.stain.kind[k].variants},(_,i)=>clothDecal(k,i+1)))).then(ds=>{const o=clothStainBake(id.data,W,H,k,fx[k],ds.filter(Boolean),{face,seed:sd,base:cur,mask:mk});cur=o.data;mk=o.mask});
  return wait.then(()=>{g.putImageData(new ImageData(cur,W,H),0,0);e.src=c.toDataURL("image/png");clothPatch(e);try{if(typeof kitFigFx==="function")kitFigFx()}catch(x){}})})}).catch(()=>{e.src=""})}
 /* COLD CACHE (cloth-bake-static): every static path (Dư đồ / event-stage figure, mirror close-up, mirror reveal, podium) prints the layer ONCE; a bake still running prints a blank WAIT layer (same box, same kit slot) and the finished bake is put into every wait layer in the page, so cold = warm */
 function clothPatch(e){try{document.querySelectorAll('img.kclo-wait[data-kclo="'+e.id+'"]').forEach(i=>{i.src=e.src;i.classList.remove("kclo-wait")})}catch(x){}}
 function clothXocLayer(file,fx){if(!/^fig-/.test(file))return"";if(typeof fx==="number")fx={xoc:fx};const on={};if(BAL.looks.xoc.on&&fx.xoc)on.xoc=fx.xoc;for(const k of["tra","uot","bun"])if(BAL.looks.stain.on[k]&&fx[k])on[k]=fx[k];if(!Object.keys(on).length)return"";
  const key=file+"|"+JSON.stringify(on);let e=CLO[key];if(!e){e=CLO[key]={src:"",t:0,id:++CLID};CLQ.push(key);if(CLQ.length>24)delete CLO[CLQ.shift()];clothPaint(file,on,e)}
  return `<img class="${e.src?"kclo":"kclo kclo-wait"}"${e.src?"":' data-kclo="'+e.id+'"'} src="${e.src||BLANK}" alt="" aria-hidden="true" style="--fleft:0%;--ftop:0%;--fwidth:100%;--fheight:100%">`}
 const ent=KIT_FACEFX.get("lkcloth");if(ent){const h0=ent.html;ent.html=(p,file,z)=>{const fx={};for(const a of z.L)if(a[0]==="xoc"||a[0]==="tra"||a[0]==="uot"||a[0]==="bun")fx[a[0]]=a[1].lv;return Object.keys(fx).length?clothXocLayer(kitFile(file),fx):h0.apply(this,arguments)}}
 /* the cloth layer goes UNDER every face mark and the makeup (it repaints only the robe; the head is the picture's own) */
 (function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){const h=f0.apply(this,arguments);if(!h||h.indexOf("kclo")<0)return h;const M=[];const rest=h.replace(/<img class="kclo[ "][^>]*>/g,m=>{M.push(m);return""});return M.join("")+rest}})();
 /* hide the plain picture under a finished cloth layer; toggled on every put so a cleared effect shows the picture again */
 (function(){if(typeof kitFxPut!=="function")return;const p0=kitFxPut;kitFxPut=function(img,p,host){const r=p0.apply(this,arguments);try{if(img)img.classList.toggle("kclo-on",!!(host&&host.querySelector(".kfxf img.kclo:not(.kclo-wait)")))}catch(e){}return r}})();
 window.clothXocLayer=clothXocLayer;window.clothCacheReset=function(){for(const k of CLQ.splice(0))delete CLO[k]}/* tests: a cold cache on demand */}
