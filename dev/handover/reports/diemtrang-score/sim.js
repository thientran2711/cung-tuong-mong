// Monte Carlo of today's Điểm trang makeup scoring (origin/main jtoil.js toilMakeup/toilFinish), geometry in px for a Fold-portrait board (rx≈194px).
// Inputs are ASSUMPTIONS about human play (labelled in the report).
const BAL={tier:[40,65,85],skillShare:20,diemThick:.4};
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
let R=rng(12345);const N=()=>{let u=0,v=0;while(!u)u=R();v=R();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
const rx=194,fws=rx*1.55,fhs=fws*.852; // default face box
const T=(u,v)=>[(u-.5)*fws,(v-.3)*fhs];
function quad(a,c,b,n){const L=[];for(let i=0;i<=n;i++){const t=i/n;L.push([(1-t)*(1-t)*a[0]+2*(1-t)*t*c[0]+t*t*b[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*c[1]+t*t*b[1]])}return L}
const brows=[quad(T(.07,-.08),T(.23,-.17),T(.39,-.07),18),quad(T(.53,-.07),T(.69,-.17),T(.85,-.08),18)];
const cr=fws*.14,puffR=cr*.5,lr=Math.max(7,fws*.05);
// --- one sitting ---
// P = player: {jit (px hand jitter), bias (px systematic offset sd), cover (mean share of the line traced), stray (expected stray points),
//              dose (mean powder seconds per point /0.4), doseSd (log sd), tSd (lip timing sd ms), pSd (lip tap px sd)}
function sit(P,sk){
 const tol=rx*(.035+.045*sk),ideal=[1-.3*sk,2.2+.6*sk];
 // brow
 const strokes=[];for(const L of brows){const bx=N()*P.bias,by=N()*P.bias;const c0=Math.max(0,Math.min(.4,Math.abs(N())*(1-P.cover)));const c1=1-Math.max(0,Math.min(.4,Math.abs(N())*(1-P.cover)));
  const s=[];for(let i=0;i<=60;i++){const t=c0+(c1-c0)*i/60,k=t*18,j=Math.min(17,Math.floor(k)),f=k-j;const p=[L[j][0]+(L[j+1][0]-L[j][0])*f,L[j][1]+(L[j+1][1]-L[j][1])*f];s.push([p[0]+bx+N()*P.jit,p[1]+by+N()*P.jit])}strokes.push(s)}
 const ns=Math.round(P.stray*(0.5+R()));if(ns){const s=[];const o=T(.5,.2);for(let i=0;i<ns;i++)s.push([o[0]+N()*60,o[1]+N()*40]);strokes.push(s)}
 const all=strokes.flat();let tot=0;for(const L of brows){let hit=0;for(const [x,y] of L)if(all.some(p=>Math.hypot(p[0]-x,p[1]-y)<=tol))hit++;const cov=hit/L.length;
  const near=all.filter(p=>L.some(q=>Math.hypot(p[0]-q[0],p[1]-q[1])<tol*3));let dev=0;if(near.length)dev=near.reduce((a,p)=>a+Math.min(...L.map(q=>Math.hypot(p[0]-q[0],p[1]-q[1]))),0)/near.length;
  const smear=all.filter(p=>!brows.some(B=>B.some(q=>Math.hypot(p[0]-q[0],p[1]-q[1])<tol*3))).length;
  tot+=cov*Math.max(0,Math.min(1,1-(dev-tol*.4)/(tol*1.6)))*Math.max(0,1-smear/40)}
 const brow=tot/2;
 // powder: 14 points, each gets dose × lognormal; centre gets a bit more
 const cs=[];for(let i=0;i<14;i++){const ctr=i%7===0;cs.push(Math.max(0,P.dose*(ctr?1.25:1)*Math.exp(N()*P.doseSd)))}
 const powder=cs.reduce((a,c)=>a+(c<.3?0:c<ideal[0]?(c-.3)/(ideal[0]-.3):c<=ideal[1]?1:c>=4.2?0:1-(c-ideal[1])/(4.2-ideal[1])),0)/14;
 const thick=cs.filter(c=>c>ideal[1]+.8).length/14;
 // son: 3 taps
 const per=1150+500*sk;let son=0;const qs=[];for(let i=0;i<3;i++){const dt=Math.abs(N()*P.tSd),d=Math.hypot(N()*P.pSd,N()*P.pSd);const qt=Math.max(0,1-3.8*dt/(per*(1.2+.8*sk))),qp=Math.max(0,1-d/(lr*(2+sk)));qs.push(qt*qp);son+=qt*qp/3}
 const raw=Math.round(100*(.4*brow+.3*powder+.3*son)),score=Math.max(0,Math.min(100,Math.round(raw*.8)+Math.round(20*sk)));
 const over=cs.filter(c=>c>ideal[1]).length/14;return{brow,powder,son,thick,over,qs,raw,score}}
function look(r,wantDiem){const over=r.thick>=BAL.diemThick,want=wantDiem&&r.score>=BAL.tier[1];
 if(over||want)return"diem";const T=BAL.tier;return r.score<T[0]?"vung":r.score<T[1]?"vua":r.score<T[2]?"dep":"tuyet"}
const PLAY={
 kheo:{jit:2.5,bias:3,cover:.97,stray:0,dose:1.6,doseSd:.35,tSd:60,pSd:4},
 thuong:{jit:4,bias:6,cover:.9,stray:3,dose:1.6,doseSd:.55,tSd:110,pSd:7},
 voi:{jit:6,bias:10,cover:.8,stray:8,dose:1.4,doseSd:.8,tSd:180,pSd:11},
};
const DOSE={nhe:.9,vua:1.6,day:2.8};
module.exports={sit,look,PLAY,DOSE,BAL,reseed:s=>{R=rng(s)}};
if(require.main===module){const n=4000,SK=[[0.12,"mới (Sắc 30, Họa 0)"],[0.4,"khá (Sắc 50, Họa 2)"],[0.75,"giỏi (Sắc 70, Họa 4)"],[1,"tối đa"]];
 const out=[];for(const [pk,P0] of Object.entries(PLAY))for(const [dk,dz] of Object.entries(DOSE))for(const want of [false,true])for(const [sk,sn] of SK){const P=Object.assign({},P0,{dose:dz});const c={vung:0,vua:0,dep:0,tuyet:0,diem:0};let ms=0,pb=0,pp=0,ps=0;
  for(let i=0;i<n;i++){const r=sit(P,sk);c[look(r,want)]++;ms+=r.score;pb+=r.brow;pp+=r.powder;ps+=r.son}
  out.push({play:pk,dose:dk,preset:want?"diem":"thanhnha",sk,mean:Math.round(ms/n),brow:+(pb/n).toFixed(2),powder:+(pp/n).toFixed(2),son:+(ps/n).toFixed(2),...Object.fromEntries(Object.entries(c).map(([k,v])=>[k,Math.round(100*v/n)]))})}
 console.log(JSON.stringify(out))}
