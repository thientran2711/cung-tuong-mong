/* cloth-xoc unit test (node, no browser): synthetic figure -> mask keeps hands as skin, creases only inside the cloth and never on the protect map, lv3 > lv2 > lv1, effect default OFF */
const fs=require('fs');global.window=global;global.BAL={looks:{}};global.cl=(v,a,b)=>Math.max(a,Math.min(b,v));
(0,eval)(fs.readFileSync(__dirname+'/../build/jcloth.js','utf8'));
const W=300,H=900,d=new Uint8ClampedArray(W*H*4);
const put=(x,y,r,g,b)=>{const i=(y*W+x)*4;d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=255};
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const dx=x-150,dy=y-70;
 if(dx*dx/(40*40)+dy*dy/(55*55)<1)put(x,y,235,190,165);/* head / face skin */
 else if(y>=125&&y<H&&Math.abs(dx)<(60+(y-125)*.12))put(x,y,225,225,200+((x*7+y*3)%9));/* cream robe */}
for(let y=380;y<430;y++)for(let x=120;x<170;x++)put(x,y,235,190,165);/* hands */
const face={x:110,y:60,w:80,h:50};
let ok=true;const t=(c,m)=>{if(!c){ok=false;console.log("FAIL",m)}};
t(BAL.looks.xoc.on===0,"effect OFF by default");
const mk=clothMask(d,W,H,face,BAL.looks.xoc);
t(mk.skin[400*W+145]===1,"hands are skin");t(mk.m[600*W+150]>.9,"robe is cloth");t(mk.m[70*W+150]<.05,"face is not cloth");
const sum=[0,0,0,0];
for(const lv of[1,2,3]){const o=clothXocBake(d,W,H,lv,{mask:mk,seed:3}),F=o.field;let bad=0;
 for(let i=0;i<W*H;i++){sum[lv]+=F.dk[i];if(F.dk[i]>.02&&(mk.m[i]<.3||mk.protS[i]>.95))bad++}
 t(bad===0,"lv"+lv+" crease outside cloth / on protect map: "+bad);
 for(let y=386;y<424;y++)for(let x=128;x<162;x++){const i=(y*W+x)*4;if(Math.abs(o.data[i]-d[i])>3||Math.abs(o.data[i+3]-d[i+3])>3){t(false,"hand pixel changed lv"+lv);y=999;break}}}
t(sum[3]>sum[2]&&sum[2]>sum[1]&&sum[1]>0,"levels increase "+sum.slice(1).map(v=>v.toFixed(0)));
console.log(ok?"cloth-xoc OK":"cloth-xoc FAILED");process.exit(ok?0:1)
