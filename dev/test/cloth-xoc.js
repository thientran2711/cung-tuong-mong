/* cloth-xoc unit test (node, no browser): synthetic figure -> mask keeps hands as skin, creases only inside the cloth and never on the protect map, lv3 > lv2 > lv1, effect default OFF */
const fs=require('fs');global.window=global;global.BAL={looks:{}};global.cl=(v,a,b)=>Math.max(a,Math.min(b,v));
(0,eval)(fs.readFileSync(__dirname+'/../build/jcloth.js','utf8'));
BAL.looks.xoc.dec.mode="code";/* the stroke code path (kept, default decal mode is tested below) */
const W=300,H=900,d=new Uint8ClampedArray(W*H*4);
const put=(x,y,r,g,b)=>{const i=(y*W+x)*4;d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=255};
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const dx=x-150,dy=y-70;
 if(dx*dx/(40*40)+dy*dy/(55*55)<1)put(x,y,235,190,165);/* head / face skin */
 else if(y>=125&&y<H&&Math.abs(dx)<(60+(y-125)*.12))put(x,y,225,225,200+((x*7+y*3)%9));/* cream robe */}
for(let y=380;y<430;y++)for(let x=120;x<170;x++)put(x,y,235,190,165);/* hands */
const face={x:110,y:60,w:80,h:50};
let ok=true;const t=(c,m)=>{if(!c){ok=false;console.log("FAIL",m)}};
t(BAL.looks.xoc.on===1,"effect ON (owner approved)");
const mk=clothMask(d,W,H,face,BAL.looks.xoc);
t(mk.skin[400*W+145]===1,"hands are skin");t(mk.m[600*W+150]>.9,"robe is cloth");t(mk.m[70*W+150]<.05,"face is not cloth");
const sum=[0,0,0,0];
for(const lv of[1,2,3]){const o=clothXocBake(d,W,H,lv,{mask:mk,seed:3}),F=o.field;let bad=0;
 for(let i=0;i<W*H;i++){sum[lv]+=F.dk[i];if(F.dk[i]>.02&&(mk.m[i]<.3||mk.protS[i]>.95))bad++}
 t(bad===0,"lv"+lv+" crease outside cloth / on protect map: "+bad);
 for(let y=386;y<424;y++)for(let x=128;x<162;x++){const i=(y*W+x)*4;if(Math.abs(o.data[i]-d[i])>3||Math.abs(o.data[i+3]-d[i+3])>3){t(false,"hand pixel changed lv"+lv);y=999;break}}}
{/* pixels far from any crease / warp are byte-identical to the picture (r4: no blur, no brightness shift) */
 const o=clothXocBake(d,W,H,3,{mask:mk,seed:3}),F=o.field;let same=0,tot=0;const fh=mk.y1-mk.y0+1;for(let i=0;i<W*H;i++){const y=(i/W)|0;if(y>mk.y1-fh*.16||(y>mk.y0+fh*.06&&y<mk.y0+fh*.3))continue;/* the hem + lapel bands are warped on purpose */if(F.dk[i]<.002&&o.field.lt[i]<.002){tot++;if(o.data[i*4]===d[i*4]&&o.data[i*4+1]===d[i*4+1]&&o.data[i*4+2]===d[i*4+2]&&o.data[i*4+3]===d[i*4+3])same++}}
 t(tot>W*H*.5&&same/tot>.97,"untouched pixels identical: "+same+"/"+tot)}
t(sum[3]>sum[2]&&sum[2]>sum[1]&&sum[1]>0,"levels increase "+sum.slice(1).map(v=>v.toFixed(0)));
{/* decal mode: synthetic grey fold decals (test only); shading scales the robe colour, never touches hands / outside the cloth, lv3 > lv2 > lv1, byte-identical away from decals */
 BAL.looks.xoc.dec.mode="decal";const mkd=(w,h)=>{const o={w,h,data:new Uint8ClampedArray(w*h*4)};for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4,g=150+90*Math.sin(x*.9),e=Math.min(1,Math.min(x,w-1-x,y,h-1-y)/6);o.data[i]=o.data[i+1]=o.data[i+2]=g;o.data[i+3]=255*e}return o};
 const dc={patch:[mkd(40,150),mkd(44,150)],knot:[mkd(90,90)],hem:[mkd(200,24)]},tot=[0,0,0,0];
 for(const lv of[1,2,3]){const o=clothXocBake(d,W,H,lv,{mask:mk,seed:3,decals:dc});let bad=0,hand=0;for(let i=0;i<W*H;i++){const df=Math.abs(o.data[i*4]-d[i*4])+Math.abs(o.data[i*4+1]-d[i*4+1])+Math.abs(o.data[i*4+2]-d[i*4+2]);tot[lv]+=df;const yy=(i/W)|0,fhh=mk.y1-mk.y0+1,wz=yy>mk.y1-fhh*.16||(yy>mk.y0+fhh*.06&&yy<mk.y0+fhh*.3);/* hem + lapel bands are warped on purpose */
  if(!wz&&o.data[i*4+3]!==d[i*4+3])bad++;
  if(!wz&&df>3&&mk.m[i]<.02)bad++;if(!wz&&df>3&&mk.protS[i]>.95)hand++}
  t(bad===0,"decal lv"+lv+" outside cloth / alpha: "+bad);t(hand===0,"decal lv"+lv+" on protect map: "+hand)}
 t(tot[1]>0&&tot[2]>tot[1]&&tot[3]>tot[2],"decal levels increase "+tot.slice(1));
 const o0=clothXocBake(d,W,H,3,{mask:mk,seed:3});let ch=0;for(let i=0;i<W*H*4;i++)if(o0.data[i]!==d[i])ch++;t(ch<W*H*4*.2,"decal mode without art changes little (warp only): "+ch)}
console.log(ok?"cloth-xoc OK":"cloth-xoc FAILED");process.exit(ok?0:1)
