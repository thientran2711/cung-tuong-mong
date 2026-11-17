const BAL={toil:{vungB:0,vungPuff:{}}};
function toilRnd(seed){let a=(seed*2654435761)>>>0||1;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const TOIL_COL={
 mat:{label:"Phấn mắt",def:"hoadao",L:[["hoadao","Phấn hoa đào","hoa đào",[234,148,146]],["hongmai","Phấn hồng mai","hồng mai",[214,104,128]],["rangchieu","Phấn ráng chiều","ráng chiều",[226,128,96]],
  ["kimsa","Phấn kim sa","kim sa",[204,160,92]],["nautram","Phấn nâu trầm","nâu trầm",[150,100,82]],["tuvi","Phấn tử vi","tử vi",[170,116,168]],["hophach","Phấn hổ phách","hổ phách",[214,132,62]]]},
 ma:{label:"Phấn má",def:"hongphan",L:[["hongphan","Phấn hồng phấn","hồng phấn",[238,128,144]],["hoadao","Phấn má hoa đào","hoa đào",[242,150,140]],["haiduong","Phấn hải đường","hải đường",[230,110,126]],
  ["yenchi","Yên chi","yên chi",[214,76,100]],["rangchieu","Phấn ráng chiều","ráng chiều",[240,140,108]],["hongsen","Phấn hồng sen","hồng sen",[226,120,160]],["camquyt","Phấn cam quýt","cam quýt",[246,150,96]]]},
 son:{label:"Son môi",def:"haiduong",L:[["haiduong","Son hải đường","hải đường",[206,60,80]],["dotham","Son đỏ thắm","đỏ thắm",[176,20,40]],["hongdao","Son hồng đào","hồng đào",[226,104,112]],
  ["chusa","Son chu sa","chu sa",[204,54,38]],["manchin","Son mận chín","mận chín",[132,36,66]],["sanho","Son san hô","san hô",[232,104,86]],["camdao","Son cam đào","cam đào",[230,132,104]],["hophach","Son hổ phách","hổ phách",[208,108,72]]]},
 may:{label:"Màu mày",def:"nau",L:[["nau","Mày nâu trầm","nâu trầm",[84,56,42]],["den","Mày đen tuyền","đen tuyền",[34,28,28]],["thanhdai","Mày thanh đại","thanh đại",[46,58,76]],
  ["naunhat","Mày nâu nhạt","nâu nhạt",[122,88,64]],["khoi","Mày khói","khói",[88,82,82]]]}};
window.TOIL_COL=TOIL_COL;
function toilColE(part,k){const P=TOIL_COL[part];return P.L.find(x=>x[0]===k)||P.L.find(x=>x[0]===P.def)}
function toilColRGB(part,k){return toilColE(part,k)[3].slice()}
const TOIL_MKS={
 /* bl = blush strength, blr = blush size (x the eye distance), sk = skin-light lift, hl = soft luminous cheekbone (round, never a streak), dabs = white powder dabs, gloss = natural sheen INSIDE the lip. Every skin-side layer is clipped to the skin mask (toilMkDraw). */
 vung:{lip:.5,eye:.4,eyeH:.5,brow:0,wing:0,low:0,vung:1,bl:.3,r:.17,sk:.08,dabs:2},/* A: 'không biết trang điểm' */
 vua:{lip:.44,eye:.5,eyeH:.5,brow:.45,wing:.08,low:0,bl:.21,r:.165,sk:.13},/* = the ?v=2 Đoan trang (approved by the owner 17/11 13:48Z) */
 dep:{lip:.74,eye:.9,eyeH:.8,brow:.7,wing:.3,low:.34,shim:.5,gloss:.65,bl:.31,r:.2,sk:.3,hl:1},/* Kiều diễm = the ?v=5 Khuynh thành look, moved down one step (owner 17/11 ~14:00Z) */
 tuyet:{lip:.88,eye:.96,eyeH:.9,brow:.78,wing:.42,low:.47,shim:.75,gloss:.78,bl:.38,r:.21,sk:.4,hl:1,glam:1},/* Khuynh thành: splendid, between Kiều diễm and the heavy v7 (owner 14:40Z) */
 diem:{lip:.92,eye:1,eyeH:.95,brow:.82,wing:.36,low:.6,shim:.5,gloss:.2,bl:.56,r:.24,sk:.32,diff:1},/* Diêm dúa = the v6 look, blush more diffuse (loang, lower centre) */
 vungB:{lip:1,eye:1,eyeH:1.18,brow:.9,wing:.55,low:.85,shim:.6,gloss:.2,bl:.78,r:.23,sk:.36}};/* Vụng về B "đánh quá tay, như hề" = the v7 Diêm dúa look; A = TOIL_MKS.vung */
function toilVungB(col){const sd=((col&&col.seed)|0);if(!sd)return false;let h=Math.imul(sd^(sd>>>15),2246822519);h=Math.imul(h^(h>>>13),3266489917);h^=h>>>16;return((h>>>0)/4294967296)<(BAL.toil.vungB||0)}
function toilMkPts(v){const P=[];for(let i=0;i<60;i++)P.push([v[2*i]/40,v[2*i+1]/40]);return P}/* → % of width / height */
function toilMkBox(v){const P=toilMkPts(v);let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;P.forEach(([x,y])=>{x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)});
 const mx=(x1-x0)*.3,my=(y1-y0)*.3;return[x0-mx,y0-my,x1-x0+2*mx,y1-y0+2*my].map(n=>+n.toFixed(3))}
function toilSoft(g,path,blur,alpha,K){const OFF=4000;g.save();g.shadowColor=`rgba(0,0,0,${alpha})`;g.shadowBlur=Math.max(.5,blur*K);g.shadowOffsetX=OFF*K;g.translate(-OFF,0);g.beginPath();path(g);g.fillStyle="#000";g.fill("evenodd");g.restore()}
function toilSmooth(g,P){/* closed smooth curve through the midpoints */const n=P.length;const m=i=>[(P[i%n][0]+P[(i+1)%n][0])/2,(P[i%n][1]+P[(i+1)%n][1])/2];const s=m(n-1);g.moveTo(s[0],s[1]);for(let i=0;i<n;i++){const q=m(i);g.quadraticCurveTo(P[i][0],P[i][1],q[0],q[1])}g.closePath()}
/* per-face geometry from the mesh points (px): eye span, eye-to-mouth, the face outline oval, the cheek ovals (feathered, swept up toward the temple), fitted into the outline.
   The mesh has no jaw points: the outline oval is built from the eye span + eye-to-mouth (width 1.5x the outer-eye span, down to the chin ~0.85 u under the mouth). */
function toilMkGeom(P,T){const av=a=>a.reduce((q,p)=>[q[0]+p[0]/a.length,q[1]+p[1]/a.length],[0,0]);const ca=av(P.slice(20,30)),cb=av(P.slice(30,40)),lc=av(P.slice(0,12));
 const u=Math.hypot(ca[0]-cb[0],ca[1]-cb[1])||20,mid=[(ca[0]+cb[0])/2,(ca[1]+cb[1])/2],ang=Math.atan2(cb[1]-ca[1],cb[0]-ca[0]),eyeY=mid[1],mY=lc[1];
 const ex=P.slice(20,40).map(p=>p[0]),span=Math.max(...ex)-Math.min(...ex),eyeBot=Math.max(...P.slice(20,40).map(p=>p[1]));
 const ocx=(Math.max(...ex)+Math.min(...ex))/2,ol={cx:ocx,cy:eyeY+(mY-eyeY)*.55+u*.05,rx:span*1.02,ry:(mY-eyeY)+u*1.5,ang};
 const inOl=(x,y)=>{const dx=x-ol.cx,dy=y-ol.cy,c=Math.cos(-ang),s=Math.sin(-ang),X=dx*c-dy*s,Y=dx*s+dy*c;return(X*X)/(ol.rx*ol.rx)+(Y*Y)/(ol.ry*ol.ry)<=1};
 const bs=(T.blr||1)*u;const cheeks=[ca,cb].map(e=>{const sg=e[0]>=mid[0]?1:-1,cx=e[0]+(e[0]-mid[0])*.04+sg*bs*.05,cy=e[1]+(mY-eyeY)*.56-bs*.03;let k=1,rx=bs*.4,ry=bs*.27;const rot=ang-sg*.3;
  const fits=k=>{for(let t=0;t<8;t++){const a=t*Math.PI/4,x=Math.cos(a)*rx*k,y=Math.sin(a)*ry*k,c=Math.cos(rot),s=Math.sin(rot),px=cx+x*c-y*s,py=cy+x*s+y*c;if(!inOl(px,py)||py<eyeBot+u*.07)return false}return true};
  /* owner 17/11 13:48Z: the blush is NEVER shrunk to fit; the clip (outline x skin x no eyes) alone cuts it */return{x:cx,y:cy,rx:rx*k,ry:ry*k,rot,fit:k}});
 return{u,mid,ang,eyeY,mY,cheeks,ol,inOl,eyeBot,ca,cb,lc}}
window.toilMkGeom=toilMkGeom;
function toilMkDraw(im,v,look,col,box,row){const W=im.naturalWidth,H=im.naturalHeight,T=(look==='vung'&&toilVungB(col))?TOIL_MKS.vungB:TOIL_MKS[look];
 const bx=box[0]/100*W,by=box[1]/100*H,bw=box[2]/100*W,bh=box[3]/100*H;const K=Math.max(1,Math.min(3,160/bw));/* small figure faces are worked at ≥160 px */
 const cw=Math.max(2,Math.round(bw*K)),chh=Math.max(2,Math.round(bh*K));const mk=()=>{const c=document.createElement("canvas");c.width=cw;c.height=chh;const g=c.getContext("2d");g.setTransform(cw/bw,0,0,chh/bh,-bx*cw/bw,-by*chh/bh);return[c,g]};
 const P=toilMkPts(v).map(([x,y])=>[x/100*W,y/100*H]);const [c0,g0]=mk();g0.drawImage(im,0,0,W,H);
 const ca=P.slice(20,30).reduce((a,p)=>[a[0]+p[0]/10,a[1]+p[1]/10],[0,0]),cb=P.slice(30,40).reduce((a,p)=>[a[0]+p[0]/10,a[1]+p[1]/10],[0,0]);const u=Math.hypot(ca[0]-cb[0],ca[1]-cb[1])||20;
 /* lips: outer minus the mouth opening */
 const R=toilRnd((col.seed|0)+11),VU=!!T.vung;const lc=P.slice(0,12).reduce((a,p)=>[a[0]+p[0]/12,a[1]+p[1]/12],[0,0]);
 /* vụng: the lip colour goes past the lip line (bigger, shifted outline), patchy */
 const lipO=VU?(()=>{const sx=1.1+.07*R(),sy=1.32+.14*R(),dx=(R()-.5)*u*.1,dy=(R()-.15)*u*.05;return P.slice(0,12).map(([x,y])=>[lc[0]+(x-lc[0])*sx+dx,lc[1]+(y-lc[1])*sy+dy])})():P.slice(0,12);
 const [cl,gl]=mk();toilSoft(gl,g=>{toilSmooth(g,lipO);toilSmooth(g,P.slice(12,20))},u*(VU?.075:.052+.04*T.lip),1,K);/* owner 17/11 13:25Z: no visible lip outline; the darker the lip, the softer the edge */
 /* eyelids: soft layers from the lash line up toward the brow, stronger at the lash line, a small wing at the outer corner; the eye itself stays clear */
 const [ce,ge]=mk();const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const eh=VU?[.6+.55*R(),.3+.35*R()]:[1,1];let en=0;
 const eye=(U,Lo,B)=>{const EH=T.eyeH*eh[en++];/* U upper lid outer→inner (7), Lo lower lid inner→outer (3), B brow lower edge inner→outer (5) */
  const bAt=t=>{const f=t*(B.length-1),i=Math.min(B.length-2,Math.floor(f));return lerp(B[i],B[i+1],f-i)};
  const out=U[0],inn=U[6];const wing=[out[0]+(out[0]-inn[0])*T.wing,out[1]+(out[1]-inn[1])*T.wing-(T.wing?u*.04:0)];
  for(const hh of[.38,.62,.84,1]){const top=U.map((p,i)=>{const f=i/6;const b=bAt(.86-.74*f);return lerp(p,b,EH*hh*(1-.45*f*f))});
   toilSoft(ge,g=>{g.moveTo(wing[0],wing[1]);U.forEach(p=>g.lineTo(p[0],p[1]));top.slice().reverse().forEach(p=>g.lineTo(p[0],p[1]));g.closePath()},u*(VU?.1:.05),.34,K)}
  if(T.low){ge.save();ge.globalAlpha=T.low;ge.lineCap="round";ge.lineWidth=u*.035;ge.strokeStyle="#000";ge.shadowColor="#000";ge.shadowBlur=u*.03*K;
   ge.beginPath();const lo=[inn].concat(Lo,[out]).map(p=>[p[0],p[1]+u*.022]);ge.moveTo(lo[0][0],lo[0][1]);lo.slice(1).forEach(p=>ge.lineTo(p[0],p[1]));ge.stroke();ge.restore()}
  ge.save();ge.globalCompositeOperation="destination-out";ge.beginPath();U.forEach((p,i)=>i?ge.lineTo(p[0],p[1]):ge.moveTo(p[0],p[1]));Lo.forEach(p=>ge.lineTo(p[0],p[1]));ge.closePath();ge.fill();ge.restore()};
 eye(P.slice(20,27),P.slice(27,30),P.slice(45,50));eye(P.slice(30,37),P.slice(37,40),P.slice(55,60));
 /* tuyệt / diêm dúa: pearl-gold shimmer on the lid (T.shim) and a gloss on the lower lip (T.gloss), soft dabs, never a sticker */
 const [csh,gsh]=mk();if(T.shim||T.gloss){const U1=P.slice(20,27),U2=P.slice(30,37),B1=P.slice(45,50),B2=P.slice(55,60);const dab=(x,y,r,a)=>toilSoft(gsh,g=>{g.arc(x,y,r,0,7)},r*.7,a,K);
  for(const [U,B] of [[U1,B1],[U2,B2]]){const bA=t=>{const f=t*(B.length-1),i=Math.min(B.length-2,Math.floor(f));return lerp(B[i],B[i+1],f-i)};if(T.shim)[2,4].forEach((k,j)=>{const q=lerp(U[k],bA(.86-.74*k/6),.35);dab(q[0],q[1],u*(j===0?.04:.03),T.shim)})}}
 /* gloss = a soft sheen on the LOWER lip, inside the lip shape (it is multiplied by the lip mask below): never a white bar that reads as teeth */
 const [cgl,ggl]=mk();if(T.gloss){const ib=Math.max(...P.slice(12,20).map(q=>q[1])),ob=Math.max(...P.slice(0,12).map(q=>q[1])),gy=ib+(ob-ib)*.42;
  toilSoft(ggl,g=>{g.ellipse(lc[0],gy,u*.085,u*.013,0,0,7)},u*.018,T.gloss,K)}
 /* SKIN pass (owner 17/11 13:08Z, 13:28Z): skin light, blush, luminous cheekbones, powder patches. Painted in real colour, clipped in the loop to
    FACE OUTLINE (an oval built from THIS face's own mesh: eye span, eye-to-mouth) ∩ SKIN colour − EYE polygons. Blush size comes from toilMkGeom (scaled to the face, shrunk until it fits the outline). */
 const [cs,gs]=mk();const G=toilMkGeom(P,T);const {ang,mid,eyeY,mY,cheeks,ol}=G;
 if(row&&row.length>=7){const Wp=W/100,Hp=H/100,rf=T.r||.17,rr=row[6]*Wp*rf;[[row[2],row[3]],[row[4],row[5]]].forEach((q,i)=>{Object.assign(cheeks[i],{x:q[0]*Wp,y:q[1]*Hp,rx:rr,ry:rr,rot:0,fit:1})})}
 const mc=toilColRGB("ma",col.ma);const sp=(x,y)=>[(x-bx)*cw/bw,(y-by)*chh/bh];
 /* soft gaussian-like fall-off (a feathered oval, never a disc with an edge) */
 const BLP={puff:[[0,1],[.4,.86],[.78,.34],[1,0]],diff:[[0,.62],[.3,.52],[.65,.25],[1,0]],patch:[[0,1],[.45,.88],[.78,.4],[1,0]],v2:[[0,1],[.35,.55],[1,0]],wide:[[0,.8],[.3,.62],[.62,.27],[1,0]]};
 const blob=(g,cx,cy,rx,ry,rot,rgb,al,flat,prof)=>{g.save();g.translate(cx,cy);g.rotate(rot);g.scale(rx,ry);const gr=g.createRadialGradient(0,0,0,0,0,1);const st=prof||(flat?[[0,1],[.55,.92],[.8,.45],[1,0]]:[[0,1],[.2,.9],[.4,.66],[.6,.36],[.8,.12],[1,0]]);st.forEach(([t,f])=>gr.addColorStop(t,`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(al*f).toFixed(3)})`));g.fillStyle=gr;g.beginPath();g.arc(0,0,1,0,7);g.fill();g.restore()};
 const cmx=mid[0],cmy=eyeY+(mY-eyeY)*.5;

 if(T.sk)blob(gs,cmx,cmy,u*1.22,u*1.6,ang,[255,249,240],T.sk);
 if(T.hl)cheeks.forEach(c=>blob(gs,c.x,c.y-u*.16,u*.2,u*.15,0,[255,244,226],.2));/* tuyệt: soft round lights on the cheekbones (wide fall-off), never a streak */
 cheeks.forEach((c,i)=>{const j=VU?[.7+.7*R(),.7+.7*R(),(R()-.5)*u*.12,(R()-.5)*u*.09,.55+.8*R()]:[1,1,0,0,1];
  blob(gs,c.x+j[2],c.y+j[3],c.rx*j[0],c.ry*j[1],c.rot+(VU?(R()-.5)*.5:0),mc,Math.min(.9,T.bl*j[4]),0,look==='vua'?BLP.v2:T.diff?BLP.diff:BLP.wide);
  if(VU){/* small uneven blotches beside the cheek */for(let k=0;k<2;k++)blob(gs,c.x+(R()-.5)*c.rx*1.1,c.y+(R()-.5)*c.ry*1.2,u*(.09+.06*R()),u*(.06+.05*R()),R()*3,mc,.18+.12*R(),0,BLP.wide)}});
 /* vụng: powder PATCHES and streaks (irregular, a little cakey), not dots: long thin or lumpy, random turn, flat top */
 const PZ=BAL.toil.vungPuff,RZ=toilRnd((col.seed|0)+23),bigI=RZ()<.5?0:1;/* own rng: the other draws keep their v8 values; per day one cheek gets the big puff, the other the small one */
 if(T.dabs)cheeks.forEach((c,ci)=>{const nb=1+(R()<.55?1:0),zm=ci===bigI?PZ.big:PZ.small;for(let k=0;k<nb;k++){const rr=u*(.13+.06*R())*zm;blob(gs,c.x+(R()-.5)*c.rx*.7+(k?rr*.7:0),c.y+(R()-.5)*c.ry*.8+(k?rr*.4:0),rr,rr*(.8+.3*R()),R()*3.1,[255,252,248],.42+.2*R(),0,PZ.prof)}});/* vụng A: 1-2 ROUND soft powder-puff blobs per cheek, visibly white, unevenly blended over the round blush */
 const [cfo,gfo]=mk();toilSoft(gfo,g=>{g.save();g.translate(ol.cx,ol.cy);g.rotate(ol.ang);g.scale(ol.rx,ol.ry);g.arc(0,0,1,0,7);g.restore()},u*.06,1,K);/* the face outline oval (soft edge) */
 /* the eyes (dilated) are cut out of the skin pass */
 const [cx2,gx]=mk();[[20,27,27,30],[30,37,37,40]].forEach(([a,b,c2,d])=>{const poly=P.slice(a,b).concat(P.slice(c2,d));const ec=poly.reduce((q,p)=>[q[0]+p[0]/poly.length,q[1]+p[1]/poly.length],[0,0]);const gp=poly.map(p=>[ec[0]+(p[0]-ec[0])*1.45,ec[1]+(p[1]-ec[1])*1.6]);toilSoft(gx,g=>{g.moveTo(gp[0][0],gp[0][1]);gp.forEach(p=>g.lineTo(p[0],p[1]));g.closePath()},u*.05,1,K)});
 /* brows */
 const [cbw,gb]=mk();toilSoft(gb,g=>{toilSmooth(g,P.slice(40,50));toilSmooth(g,P.slice(50,60))},u*.03,1,K);
 /* vụng ink (painted in the brow colour itself): one brow redrawn too high / too thick, the other's tail dragged long, a smear of ink off a tail */
 const [ci,gi]=mk();if(VU){gi.lineCap="round";gi.lineJoin="round";gi.strokeStyle="#000";const side=R()<.5?0:1;
  const Bu=[P.slice(40,45),P.slice(50,55)],Bl=[P.slice(45,50),P.slice(55,60)];/* upper edge outer→inner, lower edge inner→outer */
  const line=(L,w,a,blur)=>{gi.save();gi.globalAlpha=a;gi.lineWidth=w;gi.shadowColor="#000";gi.shadowBlur=blur*K;gi.beginPath();L.forEach((p,i)=>i?gi.lineTo(p[0],p[1]):gi.moveTo(p[0],p[1]));gi.stroke();gi.restore()};
  /* owner 17/11 04:15Z: vụng stays PRETTY — no drawn / thick brows, no ink: only soft faults (uneven blush + a caked powder patch in the SVG layer, lip line a little off, soft uneven lids) */}
 const D=g0.getImageData(0,0,cw,chh),mI=gi.getImageData(0,0,cw,chh).data,mL=gl.getImageData(0,0,cw,chh).data,mE=ge.getImageData(0,0,cw,chh).data,mB=gb.getImageData(0,0,cw,chh).data,mSh=gsh.getImageData(0,0,cw,chh).data,mGl=ggl.getImageData(0,0,cw,chh).data,mS=gs.getImageData(0,0,cw,chh).data,mX=gx.getImageData(0,0,cw,chh).data,mO=gfo.getImageData(0,0,cw,chh).data,o=D.data;
 const Lum=i=>.299*o[i]+.587*o[i+1]+.114*o[i+2];let sl=0,nl=0,se=0,ne=0;
 for(let i=0;i<o.length;i+=4){const l=Lum(i);if(mL[i+3]>140){sl+=l;nl++}if(mE[i+3]>60&&l>110){se+=l;ne++}}
 const Ll=nl?sl/nl:150,Le=ne?se/ne:205;
 /* her cheek skin colour (median of small windows on the cheeks, taken from the picture itself) */
 const skc=(()=>{const ch=[[],[],[]];cheeks.forEach(c=>{const [px,py]=sp(c.x,c.y),rr=Math.max(2,Math.round(u*.06*cw/bw));for(let y=-rr;y<=rr;y+=1)for(let x=-rr;x<=rr;x+=1){const X=Math.round(px+x),Y=Math.round(py+y);if(X<0||Y<0||X>=cw||Y>=chh)continue;const j=(Y*cw+X)*4;if(o[j+3]>0){ch[0].push(o[j]);ch[1].push(o[j+1]);ch[2].push(o[j+2])}}});const med=a=>{a.sort((x,y)=>x-y);return a.length?a[a.length>>1]:200};return[med(ch[0]),med(ch[1]),med(ch[2])]})();
 const skinM=(i,lo,hi)=>{const dr=o[i]-skc[0],dg=o[i+1]-skc[1],db=o[i+2]-skc[2],d=Math.sqrt(dr*dr*.6+dg*dg+db*db);return d<=lo?1:d>=hi?0:1-(d-lo)/(hi-lo)};const tl=toilColRGB("son",col.son),te=toilColRGB("mat",col.mat),tb=toilColRGB("may",col.may);
 const Ltb=Math.max(20,.299*tb[0]+.587*tb[1]+.114*tb[2]);const cl3=(x,a,b)=>x<a?a:x>b?b:x;
 /* vụng patchiness: smooth value noise in face units (same blotches on portrait and figure) */
 const NS=u*.14,hv=(x,y)=>{let h=(x*374761393+y*668265263+(col.seed|0)*982451653)|0;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};
 const nz=(x,y)=>{const fx=(x-lc[0])/NS,fy=(y-lc[1])/NS,ix=Math.floor(fx),iy=Math.floor(fy),tx=fx-ix,ty=fy-iy,sx=tx*tx*(3-2*tx),sy=ty*ty*(3-2*ty);
  const a=hv(ix,iy),b=hv(ix+1,iy),c=hv(ix,iy+1),d=hv(ix+1,iy+1);return a+(b-a)*sx+(c-a)*sy+(a-b-c+d)*sx*sy};
 for(let i=0;i<o.length;i+=4){const ab=mB[i+3]/255,ae=mE[i+3]/255,al=mL[i+3]/255,ai=VU?mI[i+3]/255:0,as=mSh[i+3]/255,ag=mGl[i+3]/255,ak=mS[i+3]/255;if(!(ab||ae||al||ai||as||ag||ak)){o[i+3]=0;continue}
  const pn=VU?.6+.55*nz(bx+((i>>2)%cw)*bw/cw,by+Math.floor((i>>2)/cw)*bh/chh):1;
  const r0=o[i],g1=o[i+1],b0=o[i+2],l=Lum(i);let r=r0,g=g1,b=b0,keep=1;
  if(ak){const a=ak*skinM(i,26,56)*(1-mX[i+3]/255)*(mO[i+3]/255);if(a>.002){r+=(mS[i]-r)*a;g+=(mS[i+1]-g)*a;b+=(mS[i+2]-b)*a;keep*=1-a}}
  if(ab){/* only the brow hairs (darker than the skin) take the colour, with their own light */const dk=cl3((Le-l)/(Le*.42),0,1);const a=ab*T.brow*dk;
   if(a>0){const k=Math.min(2.4,l/Ltb)*(look==="diem"?.9:1);r+=(tb[0]*k-r)*a;g+=(tb[1]*k-g)*a;b+=(tb[2]*k-b)*a;keep*=1-a}}
  if(ae){const a=Math.min(1,ae*T.eye*pn)*skinM(i,46,92)*Math.min(1,mO[i+3]/200+.0);const k=cl3(l/Le,.35,1.12);r+=(te[0]*k-r)*a;g+=(te[1]*k-g)*a;b+=(te[2]*k-b)*a;keep*=1-a}
  if(al){let a=Math.min(1,al*T.lip*pn);const q=l/Ll;const k=VU?cl3(Math.pow(q,1.25),.8,1.02):cl3(Math.pow(q,1.15),.66,1.2);/* highlights on the lip keep some of their shine; vụng: the smear past the line is as dark as the lip itself (readable at stage size) */if(!VU&&q>1.22)a*=Math.max(.45,1-(q-1.22)*1.6);
   r+=(tl[0]*k-r)*a;g+=(tl[1]*k-g)*a;b+=(tl[2]*k-b)*a;keep*=1-a}
  if(as){const a=Math.min(.9,as)*skinM(i,46,92)*(mO[i+3]/255);r+=(Math.min(255,te[0]*.35+235)-r)*a;g+=(Math.min(255,te[1]*.35+215)-g)*a;b+=(Math.min(255,te[2]*.35+170)-b)*a;keep*=1-a}
  if(ag){const a=Math.min(.8,ag)*(al>.35?1:0);r+=(255-r)*a*.8;g+=(236-g)*a*.8;b+=(230-b)*a*.8;keep*=1-a*.8}
  if(ai){const a=Math.min(1,ai*pn);const k=.85;r+=(tb[0]*k-r)*a;g+=(tb[1]*k-g)*a;b+=(tb[2]*k-b)*a;keep*=1-a}
  const A=1-keep;if(A<.004){o[i+3]=0;continue}/* overlay pixel so that mix(original, it, A) = the painted pixel */
  o[i]=cl3(Math.round(r0+(r-r0)/A),0,255);o[i+1]=cl3(Math.round(g1+(g-g1)/A),0,255);o[i+2]=cl3(Math.round(b0+(b-b0)/A),0,255);o[i+3]=Math.round(A*255)}
 g0.setTransform(1,0,0,1,0,0);g0.clearRect(0,0,cw,chh);g0.putImageData(D,0,0);return c0.toDataURL("image/png")}
