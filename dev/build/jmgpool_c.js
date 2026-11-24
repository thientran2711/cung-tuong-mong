/* ================= jmgpool_c: MINI-GAME CONTENT POOLS, lane P1c (ORDER THIN P1, owner OD 23/11 ~22:50Z; EVCAT §3 P1; OD:L1237 split) =================
   Same API and same draw as jmgpool.js (lane P1 #2): mgpItems(kind) · mgpOne(kind,used,filter) (fresh-first through jnorep, family `mg:<kind>`).
   This file only ADDS generators to MGP_GEN for the kinds of lane P1c; jmgpool.js is untouched. Sizes = BAL.mgpc.<kind> (jbal2.js, own line), floor BAL.mgp.min.
   A pool item only decides WHICH content the board shows (words, figures, people, layout of a scripted run); rules, board sizes, timings and difficulty-by-rank
   stay in the engines (BAL.mgTier*). Every item is built from parts with a seeded rng (id = seed): the same item = the same board, any device.
   POOLED here: nghe (secret words × decoys × lines) · td_hanh (three alms rounds) · kinh (sutra rows) · may (robe seams).
   NO POOL (reason per kind in reports/thin.md «## P1c»): td_ngon (already 11 speakers × 4 moods = 44 boards) · truyen · duho · den · td_dung (their random layout is already unique every play: a pool would ADD repeats, measured) ·
                mac · thoico · tat · ne · thu_tam · thu_choi · tuoi (no content a player can tell apart).
   Player-visible words (td_hanh people) are cổ trang, no digits, no %, per dev/kit/VANPHONG.md. */
const mgpcN=k=>{try{return (BAL.mgpc&&BAL.mgpc[k])||BAL.mgp.min}catch(e){return 40}};
const mgpcPick=(R,a)=>a[Math.floor(R()*a.length)];
function mgpcShuf(R,a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
/* a game draws its items through P0 with a fresh `used` list (reset per game); null when the pool is empty (the engine then keeps its old random path) */
function mgpc1(kind){try{return typeof mgpOne==="function"?mgpOne(kind,[]):null}catch(e){return null}}
function mgpcMany(kind,n){try{if(typeof mgpOne!=="function")return null;const used=[],o=[];for(let i=0;i<n;i++){const it=mgpOne(kind,used);if(!it)return null;o.push(it)}return o}catch(e){return null}}
/* nghe: the i-th three of the ten secret words (all 120 triples are used once) × a shuffle of the other seven (decoys) × the order of the speech lines */
function mgpGenNghe(){const out=[],NK=10,tri=[];for(let a=0;a<NK;a++)for(let b=a+1;b<NK;b++)for(let c=b+1;c<NK;c++)tri.push([a,b,c]);
 const N=Math.min(mgpcN("nghe"),tri.length);
 for(let i=0;i<N;i++){const id=`nghe-${i}`,R=mgpRng(id),t=tri[i],rest=mgpcShuf(R,[...Array(NK).keys()].filter(x=>t.indexOf(x)<0));
  const kinds=mgpcShuf(R,["i","i","i","i","i","i","i","d","d","d","f","f","f","f"]).concat(["f","f"]);/* the last two lines are always small talk, as the engine */
  out.push({id,kw:mgpcShuf(R,t).concat(rest),kinds,imp:mgpcShuf(R,[0,1,2,3,4,5]),fil:mgpcShuf(R,[0,1,2,3,4,5,6,7,8,9])})}return out}
/* td_hanh: three alms rounds. Each round keeps the old shape (number of people, their needs 1 2 3, the pool) so the sum of needs and the difficulty stay;
   WHO stands there comes from the people parts (need tiers), in a shuffled order */
const MGP_ALMS={1:[["Tiểu cung nữ","mới vào cung"],["Tiểu thái giám","làm việc nặng"],["Tiểu cung nhân","còn nhỏ"],["Bé giữ đèn","mới vào cung"],["Bé quét lá","còn nhỏ"],["Tiểu đồng hầu trà","mới tới"],["Bé hầu mực","mới vào cung"],["Tiểu cung nữ giặt áo","tuổi còn nhỏ"]],
 2:[["Cung nhân ốm","vừa khỏi bệnh"],["Cung nhân góa","tuổi cao"],["Lão cung nhân","già yếu, lưng còng"],["Cung nữ giặt áo","tay nứt nẻ"],["Hai mẹ con nghèo","xin ăn ở cổng"],["Thợ vá áo","mắt mờ"],["Người gánh củi","mỏi vai"],["Ma ma quét sân","gió lạnh buốt"],["Cung nữ khâu vá","tay run"],["Phu kiệu lưng đau","làm việc nặng"],["Bà hàng nước","nghèo khó"],["Cung nữ canh đèn","thức đêm"],["Người nhặt lá","gầy yếu"],["Cung nhân thêu","mắt kém"]],
 3:[["Lão ma ma","đói lả"],["Lão thái giám","ốm yếu"],["Cụ bà xin ăn","đói rét"],["Cung nhân bệnh nặng","sốt chưa lui"],["Lão phu kiệu","đói lả"],["Bà góa nghèo","ba ngày chưa ăn"]]};
const MGP_ALMS_SHAPE=[{pool:5,need:[2,1,2]},{pool:8,need:[3,2,1,2]},{pool:7,need:[2,3,2]}];/* = TD_ALMS (jtd.js) */
function mgpGenTdHanh(){const out=[];
 for(let i=0;i<mgpcN("td_hanh");i++){const id=`td_hanh-${i}`,R=mgpRng(id),taken=new Set(),rounds=MGP_ALMS_SHAPE.map(sh=>({pool:sh.pool,list:mgpcShuf(R,sh.need).map(nd=>{let p,g=0;do{p=mgpcPick(R,MGP_ALMS[nd]);g++}while(taken.has(p[0])&&g<30);taken.add(p[0]);return[p[0],p[1],nd]})}));
  out.push({id,rounds})}return out}
/* kinh / may: figures are written as parameters (L = line, Q = bend, W = wave) and turned into curves by the engine (jwkg.js kwkFig) */
const MGP_LEN=f=>{let s=0,p=null;for(let k=0;k<=24;k++){const q=mgpFigPt(f,k/24);if(p)s+=Math.hypot(q[0]-p[0],q[1]-p[1]);p=q}return s};
function mgpFigPt(f,t){if(f[0]==="L")return[f[1]+(f[3]-f[1])*t,f[2]+(f[4]-f[2])*t];if(f[0]==="Q"){const u=1-t;return[u*u*f[1]+2*u*t*f[3]+t*t*f[5],u*u*f[2]+2*u*t*f[4]+t*t*f[6]]}return[f[1]+(f[2]-f[1])*t,f[3]+f[4]*Math.sin(t*Math.PI*f[5])]}
const r2=v=>+v.toFixed(2);
function mgpGenKinh(){const out=[];/* a sutra column holds 3 or 4 brush moves, in bands from top to bottom: ngang · sổ · phẩy · mác · chấm · móc */
 const MV={ngang:(R,y0,h)=>{const xa=.26+R()*.22,y=y0+h*(.3+R()*.4);return["L",r2(xa),r2(y),r2(Math.min(.78,xa+.28+R()*.16)),r2(y+(R()-.5)*.06)]},
  so:(R,y0,h)=>{const x=.36+R()*.28;return["L",r2(x),r2(y0+h*.05),r2(x+(R()-.5)*.08),r2(y0+h*.92)]},
  phay:(R,y0,h)=>{const x=.5+R()*.2;return["Q",r2(x),r2(y0+h*.05),r2(x-.04),r2(y0+h*.5),r2(x-.16-R()*.06),r2(y0+h*.92)]},
  mac:(R,y0,h)=>{const x=.3+R()*.2;return["Q",r2(x),r2(y0+h*.05),r2(x+.03),r2(y0+h*.5),r2(x+.16+R()*.08),r2(y0+h*.92)]},
  cham:(R,y0,h)=>{const x=.4+R()*.24;return["L",r2(x),r2(y0+h*.2),r2(x+.14),r2(y0+h*.62)]},
  moc:(R,y0,h)=>{const x=.36+R()*.24;return["Q",r2(x),r2(y0+h*.05),r2(x+.02),r2(y0+h*.92),r2(x+.15+R()*.05),r2(y0+h*.84)]}};
 const K=Object.keys(MV);
 for(let i=0;i<mgpcN("kinh");i++){const id=`kinh-${i}`,R=mgpRng(id);let S;
  for(let g=0;g<20;g++){const n=3+(R()<.5?1:0),h=.74/n;const ty=mgpcShuf(R,K).slice(0,n);S=ty.map((t,j)=>MV[t](R,.12+j*h,h));if(S.every(f=>MGP_LEN(f)>=.14&&f.slice(1).every(v=>v>=.08&&v<=.92)))break}
  out.push({id,S})}return out}
function mgpGenMay(){const out=[];/* a robe seam: seven kinds × variants. Collar curve · sleeve · skirt panel · scalloped hem · wave border · belt · placket */
 const FM=[R=>{const x0=.18+R()*.1,y0=.24+R()*.1;return[["Q",r2(x0),r2(y0),.5,r2(.6+R()*.14),r2(1-x0),r2(y0)]]},
  R=>{const x=.2+R()*.06,xe=.52+R()*.1;return[["L",r2(x),r2(.22+R()*.05),r2(x-.02+R()*.04),r2(.76+R()*.04)],["Q",r2(x),.78,r2((x+xe)/2),r2(.9+R()*.04),r2(xe),.78]]},
  R=>{const x=.28+R()*.08;return[["Q",r2(x),.15,r2(x-.08+R()*.06),r2(.5),r2(x),.86],["L",r2(x),.86,r2(.7+R()*.08),.86]]},
  R=>{const a=.04+R()*.04;return[["W",.1,.9,r2(.74+R()*.06),r2(a),r2(5+Math.floor(R()*3))]]},
  R=>{const a=.05+R()*.08;return[["W",r2(.1+R()*.06),r2(.84+R()*.06),r2(.42+R()*.14),r2(a),r2(3+Math.floor(R()*3))]]},
  R=>{const y=.38+R()*.08,d=.12+R()*.06;return[["L",.18,r2(y),.82,r2(y)],["L",.82,r2(y+d),.18,r2(y+d)]]},
  R=>{const x=.46+R()*.08;return[["L",r2(x),.18,r2(x),.84],["Q",r2(x),.84,r2(x+.12),r2(.9),r2(x+.22),.82]]}];
 const per=Math.ceil(mgpcN("may")/FM.length);
 for(let f=0;f<FM.length;f++)for(let v=0;v<per;v++){const id=`may-${f}-${v}`;out.push({id,S:FM[f](mgpRng(id))})}return out}
Object.assign(MGP_GEN,{nghe:mgpGenNghe,td_hanh:mgpGenTdHanh,kinh:mgpGenKinh,may:mgpGenMay});
Object.assign(window,{mgpc1,mgpcMany});
