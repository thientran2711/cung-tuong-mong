/* Điểm trang outcome distribution (diemtrang-score): Monte Carlo of the REAL scoring block of dev/build/jtoil.js (BAL.toil + toilIdeal /
   toilBrowQ / toilPowderQ / toilLipQ / toilHeavy / toilAllow / toilLookOf / toilNpcPlay) with human-like freehand play on real faces (mk-fit).
   Hands (assumptions): khéo / thường / vội. usage: node dev/measure/toil-dist.js [runs per row, default 600]  (downloads face data from the CDN once) */
const fs=require('fs');const vm=require('vm');
const BAL={toil:{tier:[40,65,85]}};
const ctx={BAL,Math,console,wdHash:s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0},toilTier:sc=>sc<40?"vung":sc<65?"vua":sc<85?"dep":"tuyet",Set,Object,String};
vm.createContext(ctx);const SRC=fs.readFileSync(__dirname+'/../build/jtoil.js','utf8');const CORE=SRC.slice(SRC.indexOf('/* ---------- DIEMTRANG-SCORE'),SRC.indexOf('\n/* ---------- the dress verdict'));
vm.runInContext(CORE.replace(/^const /gm,'var ').replace(/^function (\w+)/gm,'var $1=function $1'),ctx);
const {execFileSync}=require('child_process');const CDN='https://ctm-img.victoria-tntt.workers.dev/img/',TMP=require('os').tmpdir()+'/toil-dist';fs.mkdirSync(TMP,{recursive:true});
const get=(u,f)=>{const p=TMP+'/'+f;if(!fs.existsSync(p))execFileSync('curl',['-sf','-o',p,CDN+u]);return JSON.parse(fs.readFileSync(p))};
const TF=get('toil-fit.json','toil-fit.json');const MK={};for(const f of ['c01','c05','c12','c18'])Object.assign(MK,get(`mk-fit/consort-${f}.json`,f+'.json'));
const FACES=Object.keys(MK).filter(k=>k.startsWith('por-')&&TF[k]).filter((_,i)=>i%6===0);
// geometry like toilGeom (W 700, H 620)
function geom(file){const W=700,H=620,MIR={cx:527/1024,cy:282/1024,rx:176/1024,ry:194/1024};const ky=H*.94/(MIR.ry*2*1024),k=Math.min(ky,W/(1024*.62));const S0=1024*k;
 const mx=W/2,my=H/2,rx=MIR.rx*S0;const v=TF[file];const f=[v[0]-.46*v[6],v[1]-.49*v[7],v[6],v[7],v[9]||0];const IW=384,IH=506;const fx=f[0]/100*IW,fy=f[1]/100*IH,fw=f[2]/100*IW,fh=f[3]/100*IH,rot=f[4]*Math.PI/180;
 const s=rx*1.55/fw;const fcx=fx+fw/2,fcy=fy+fh*.3;const cs=Math.cos(rot),sn=Math.sin(rot);
 const T=(u,w)=>{const px=fx+u*fw-(fx+fw/2),py=fy+w*fh-(fy+fh/2);const qx=px*cs-py*sn+(fx+fw/2),qy=px*sn+py*cs+(fy+fh/2);return[mx+(qx-fcx)*s,my+(qy-fcy)*s]};
 return{rx,T,fws:fw*s,img:{x:mx-fcx*s,y:my-fcy*s,w:IW*s,h:IH*s}}}
let a=7;const R=()=>{a=(a*1664525+1013904223)>>>0;return a/4294967296};const N=()=>{let u=0;while(!u)u=R();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*R())};
// hand: brow jitter/bias as share of brow length, coverage, overshoot, extra passes; cheek aim error (× r), dose; lip timing sd (share of period), tap sd (× lr)
const HAND={kheo:{j:.02,b:.04,cov:.95,ov:.04,pass:1.3,aim:.25,rho:.9,dose:1.6,dsd:.35,t:.05,tp:4},
 thuong:{j:.035,b:.075,cov:.88,ov:.08,pass:1.7,aim:.45,rho:.85,dose:1.6,dsd:.55,t:.09,tp:6},
 voi:{j:.05,b:.12,cov:.78,ov:.14,pass:2.2,aim:.7,rho:.8,dose:1.5,dsd:.8,t:.15,tp:9}};
function sit(G,I,H,sk){const strokes=[];
 for(const b of I.brows){const L=b.len;const np=Math.max(1,Math.round(H.pass+R()-.5));const bx=N()*H.b*L,by=N()*H.b*L;
  for(let k=0;k<np;k++){const c0=-H.ov*Math.abs(N())+ (1-H.cov)*Math.abs(N()),c1=1+H.ov*Math.abs(N())-(1-H.cov)*Math.abs(N());const s=[];
   for(let i=0;i<=40;i++){const t=c0+(c1-c0)*i/40,tc=Math.max(0,Math.min(1,t)),k2=tc*18,j=Math.min(17,Math.floor(k2)),f=k2-j;const A=b.c[j],B2=b.c[j+1];
    const dx=B2[0]-A[0],dy=B2[1]-A[1];const ex=t<0?t*18*dx:t>1?(t-1)*18*dx:0,ey=t<0?t*18*dy:t>1?(t-1)*18*dy:0;
    s.push([A[0]+dx*f+ex+bx+N()*H.j*L,A[1]+dy*f+ey+by+N()*H.j*L])}strokes.push(s)}}
 const bq=ctx.toilBrowQ(strokes,I,sk);
 // powder grid over the face area
 const pr=I.cheeks[0].r*BAL.toil.cheek.puff,st=pr*BAL.toil.cheek.step,Gr=[];const cx=(I.cheeks[0].x+I.cheeks[1].x)/2,cy=I.cheeks[0].y;
 for(let x=cx-I.ed*1.4;x<=cx+I.ed*1.4;x+=st)for(let y=cy-I.ed*.9;y<=cy+I.ed*.9;y+=st)Gr.push({x,y,c:0});
 for(const c of I.cheeks){const ax=c.x+N()*H.aim*c.r,ay=c.y+N()*H.aim*c.r,rho=c.r*(H.rho+N()*.12),D=H.dose*Math.exp(N()*H.dsd*.5);// she rubs a patch of radius rho at her aim
  for(const p of Gr){const d=Math.hypot(p.x-ax,p.y-ay);if(d<=rho+pr*.5)p.c+=Math.max(0,D*Math.exp(N()*H.dsd*.6)*(d>rho?.5:1))}}
 const pq=ctx.toilPowderQ(Gr,I,sk);
 let son=0;for(let i=0;i<3;i++){son+=ctx.toilLipQ(N()*H.t*3.8,Math.hypot(N(),N())*H.tp,I.lr,sk)/3}// dtR in ring radii (3.8 lr per period)
 const raw=Math.round(100*(.4*bq.q+.3*pq.q+.3*son));const score=Math.max(0,Math.min(100,Math.round(raw*.9)+Math.round(10*sk)));
 return{P:{brow:bq.q,powder:pq.q,son},score,over:pq.over}}
module.exports={ctx,geom,FACES,MK,HAND,sit};
if(require.main===module){const SK=[.12,.4,.75,1];const PRE=(()=>{const m=SRC.match(/const TOIL_PRE=\[([\s\S]*?)\]\];/);const L=eval('['+m[1]+']]');return{dep:L.filter(x=>x[2]==='dep').map(x=>x[4]),diem:L.filter(x=>x[2]==='diem').map(x=>x[4])}})();const OCC=[["th",.4],["thuong",.4],["night",.1],["fest",.1]];
 const n=+process.argv[2]||600;console.log('faces',FACES.length);const tab=[];
 for(const hn of ["kheo","thuong","voi"])for(const ch of ["nha","tu","diem"])for(const sk of SK){const c={vung:0,vua:0,dep:0,tuyet:0,diem:0},sl={brow:0,powder:0,son:0};let ms=0,pb=0,pp=0,ps=0;
  for(let i=0;i<n;i++){const f=FACES[i%FACES.length];const g=geom(f);const I=ctx.toilIdeal(MK[f],g.img,g.T,g.fws);const r=sit(g,I,HAND[hn],sk);
   const pre=ch==="nha"?PRE.dep[Math.floor(R()*8)]:ch==="diem"?PRE.diem[Math.floor(R()*8)]:Object.fromEntries(["mat","ma","son","may"].map(k=>{const L=PRE.dep.concat(PRE.diem).map(p=>p[k]);return[k,L[Math.floor(R()*L.length)]]}));
   let o=R(),occ="thuong";for(const [k,p] of OCC){if(o<p){occ=k;break}o-=p}
   const H=ctx.toilHeavy(pre,ch==="diem"?"diem":"",R()<.15?"showy":"fit",r.over);const L=ctx.toilLookOf(r.P,r.score,H,ctx.toilAllow([occ]),Math.floor(R()*1e9));
   const k=L.look==="vung"?"vung":L.look==="diem"?"diem":ctx.toilTier(r.score);c[k]++;if(L.slip)sl[L.slip]++;ms+=r.score;pb+=r.P.brow;pp+=r.P.powder;ps+=r.P.son}
  tab.push([hn,ch,sk,Math.round(ms/n),(pb/n).toFixed(2),(pp/n).toFixed(2),(ps/n).toFixed(2),...Object.values(c).map(v=>Math.round(100*v/n)),'slip',...Object.values(sl).map(v=>Math.round(100*v/n))])}
 console.log('hand choice sk mean brow pow son | vung vua dep tuyet diem | slip brow pow son');for(const t of tab)console.log(t.join(' '));
 for(const sk of SK){const c={vung:0,vua:0,dep:0,tuyet:0,diem:0};for(let i=0;i<5000;i++){const h=ctx.wdHash('npc'+i+':'+sk);const want=(h%7)<2?"diem":"";const col=want?PRE.diem[h%8]:PRE.dep[(h>>>4)%8];
  const L=ctx.toilNpcPlay(sk,h,col,want,"fit",[["th","thuong","night","fest"][(h>>>8)%4]]);c[L.look==="vung"?"vung":L.look==="diem"?"diem":ctx.toilTier(L.score)]++}
  console.log('NPC/bot sk',sk,Object.entries(c).map(([k,v])=>k+' '+Math.round(v/50)).join(' '))}}
