/* cloth-stain unit test (node): decal layer on the cloth mask — synthetic figure + synthetic blob decal (test only, never shown to the owner) */
const fs=require('fs');global.window=global;global.BAL={looks:{}};global.cl=(v,a,b)=>Math.max(a,Math.min(b,v));
(0,eval)(fs.readFileSync(__dirname+'/../build/jcloth.js','utf8'));
const W=300,H=900,d=new Uint8ClampedArray(W*H*4);
const put=(x,y,r,g,b)=>{const i=(y*W+x)*4;d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=255};
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const dx=x-150,dy=y-70;if(dx*dx/1600+dy*dy/3025<1)put(x,y,235,190,165);else if(y>=125&&Math.abs(dx)<(60+(y-125)*.12))put(x,y,225,225,200+((x*7+y*3)%9))}
for(let y=380;y<430;y++)for(let x=120;x<170;x++)put(x,y,235,190,165);/* hands */
const face={x:110,y:60,w:80,h:50},mk=clothMask(d,W,H,face,BAL.looks.xoc);
const dec={w:64,h:64,data:new Uint8ClampedArray(64*64*4)};for(let y=0;y<64;y++)for(let x=0;x<64;x++){const r=Math.hypot(x-32,y-32),i=(y*64+x)*4;dec.data[i]=110;dec.data[i+1]=70;dec.data[i+2]=30;dec.data[i+3]=r<28?255*(1-r/28):0}/* brown blob */
let ok=true;const t=(c,m)=>{if(!c){ok=false;console.log("FAIL",m)}};
t(BAL.looks.stain.on===0,"stain layer OFF by default");
const changed=(o)=>{let n=0,bright=0,outside=0,prot=0,rows=[];for(let i=0;i<W*H;i++){const dr=o[i*4]-d[i*4];if(o[i*4]!==d[i*4]||o[i*4+1]!==d[i*4+1]||o[i*4+2]!==d[i*4+2]){n++;if(dr>1)bright++;if(mk.m[i]<.02)outside++;if(mk.protS[i]>.95)prot++;rows.push((i/W)|0)}if(o[i*4+3]!==d[i*4+3])outside+=1e6}rows.sort((a,b)=>a-b);return{n,bright,outside,prot,my:rows.length?rows[rows.length>>1]:0}};
const cnt={},sum=(o)=>{let q=0;for(let i=0;i<W*H*4;i++)q+=Math.abs(o[i]-d[i]);return q};
for(const k of["tra","uot","bun"])for(const lv of[1,2,3]){const o=clothStainBake(d,W,H,k,lv,[dec],{mask:mk,seed:5}),c=changed(o.data);cnt[k+lv]=sum(o.data);
 t(c.n>0,k+lv+" changed something");t(c.bright===0,"never brightens never brightens "+k+lv+" ("+c.bright+")");t(c.outside===0,k+lv+" touched outside the cloth / alpha");t(c.prot===0,k+lv+" touched skin / hair / items ("+c.prot+")")}
for(const k of["tra","uot","bun"])t(cnt[k+3]>cnt[k+1],k+" level 3 changes more than level 1: "+cnt[k+1]+" < "+cnt[k+3]);
const hem=changed(clothStainBake(d,W,H,"bun",1,[dec],{mask:mk,seed:5}).data),chest=changed(clothStainBake(d,W,H,"tra",1,[dec],{mask:mk,seed:5}).data);
t(hem.my>chest.my,"mud sits lower (hem) than tea (chest): "+hem.my+" vs "+chest.my);
{const o=clothStainBake(d,W,H,"tra",3,[],{mask:mk}).data;t(changed(o).n===0,"no decal art yet = no change (tea has no wet darkening)")}
{const A=clothStainBake(d,W,H,"tra",2,[dec],{mask:mk,seed:5}).data,B=clothStainBake(d,W,H,"tra",2,[dec],{mask:mk,seed:5}).data;t(A.every((v,i)=>v===B[i]),"deterministic")}
{const o=new Uint8ClampedArray(d);drawDecalOnCloth(o,W,H,mk,dec,150,500,.2,0,0,"multiply");t(changed(o).n===0,"opacity 0 = identity")}
{const o=new Uint8ClampedArray(d);drawDecalOnCloth(o,W,H,mk,dec,150,405,.3,0,1,"multiply");t(changed(o).prot===0,"decal over the hands leaves the hands alone")}
for(const lv of[1,2,3]){/* r6: wet = the robe's OWN hue deeper: never lighter in any channel, never greyer (channel spread kept or wider) */const o=clothStainBake(d,W,H,"uot",lv,[dec],{mask:mk,seed:5}).data;let up=0,grey=0,n=0;
 for(let i=0;i<W*H;i++){const a=i*4;if(o[a]===d[a]&&o[a+1]===d[a+1]&&o[a+2]===d[a+2])continue;n++;for(let q=0;q<3;q++)if(o[a+q]>d[a+q])up++;const s0=(Math.max(d[a],d[a+1],d[a+2])-Math.min(d[a],d[a+1],d[a+2]))/Math.max(1,d[a],d[a+1],d[a+2]),s1=(Math.max(o[a],o[a+1],o[a+2])-Math.min(o[a],o[a+1],o[a+2]))/Math.max(1,o[a],o[a+1],o[a+2]);if(s1<s0-.01)grey++}
 t(n>0&&up===0,"wet lv"+lv+" never lighter ("+up+")");t(grey===0,"wet lv"+lv+" never greyer ("+grey+" px)")}
console.log(ok?"cloth-stain OK":"cloth-stain FAILED");process.exit(ok?0:1)
