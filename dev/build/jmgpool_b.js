/* ================= jmgpool_b: MINI-GAME CONTENT POOLS, lane P1b (ORDER THIN P1, owner OD 23/11 ~22:50Z; EVCAT §3 P1) =================
   Same contract as jmgpool.js (read it first): a pool item = one board recipe, drawn through mgpOne(kind,used,filter) = fresh-first + the shared no-repeat memory (jnorep, family `mg:<kind>`).
   Lane P1b kinds: dan co dauho theu mua doi doden tc xa thq. Rules, sizes and difficulty-by-rank stay in the engines; an item only decides WHICH board is shown.
     dan    tune = five four-note phrases (eight contours × a shift of the four strings) + the gaps between notes, never three equal strings in a row
     co     capture position = group size (1..3 stones) × seed; the same generator as before (kg82GoGen) runs on the item's seed, so the same item = the same position
     dauho  throw sheet = six vase places × six winds (a wind of each side at least twice)
     theu   stitch sheet = five rounds of a shuffled sixteen cells (a round shows the first n of them)
     mua    dance sheet = five rounds of nine steps, never three equal steps in a row (a round shows the first n of them)
     doi    pair-of-scrolls round = rows (3 / 4 / 5) × seed        doden  lamp round = round type (0 copy · 1 pattern · 2 order) × seed
     tc     storeroom round = seed       xa  evidence case = seed       thq  seating round = seed
   (seed items: mgpWith(item, fn) runs the engine's own generator with Math.random = the item's seeded stream, then puts the real one back.)
   No pool (written, not invented): ban (one painted target, a fixed sway: pure timing) · chai (one mark gauge: pure timing) · hoadien (her own portrait is the board, nothing is drawn from a list) · co7 (Cờ năm quân against the AI: a skill board, the AI noise is not content).
   ONE CORE: counts read BAL.mgpb (jbal2.js). No player-visible word is made here. */
function mgpWith(it,fn){if(!it||!it.seed)return fn();const o=Math.random;Math.random=mgpRng(it.seed);try{return fn()}finally{Math.random=o}}
function mgpPerm(n,R){const a=[...Array(n).keys()];for(let i=n-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const MGP_NB=()=>BAL.mgpb;
/* dan: eight phrase contours (the four strings Cung Thương Giốc Chủy = 0..3) */
const MGP_DAN_PH=[[0,1,2,3],[3,2,1,0],[0,2,1,3],[1,3,0,2],[0,0,1,2],[2,1,1,3],[3,1,2,0],[1,0,3,2]];
function mgpGenDan(){const out=[];for(let t=0;t<MGP_NB().dan;t++){const id=`dan-${t}`,R=mgpRng(id),l=[];let prev=-1;
  for(let p=0;p<5;p++){let h;do h=Math.floor(R()*MGP_DAN_PH.length);while(h===prev);prev=h;const sh=Math.floor(R()*4);MGP_DAN_PH[h].forEach(x=>l.push((x+sh)%4))}
  for(let i=2;i<l.length;i++)if(l[i]===l[i-1]&&l[i]===l[i-2])l[i]=(l[i]+1+Math.floor(R()*3))%4;
  out.push({id,l,g:l.map(()=>880+Math.floor(R()*260))})}return out}
/* co: group size 1..3 (the rounds of the engine are 1 2 2 3 3) × seed */
function mgpGenCo(){const out=[];for(let sz=1;sz<=3;sz++)for(let q=0;q<MGP_NB().co;q++)out.push({id:`co-${sz}-${q}`,sz,seed:`co${sz}-${q}`});return out}
/* dauho: six throws, each a vase place (share of the width, as before .6–.82) and a wind (-1..1; the engine scales it by the throw number) */
function mgpGenDauho(){const out=[];for(let t=0;t<MGP_NB().dauho;t++){const id=`dauho-${t}`,R=mgpRng(id),u=[],w=[];
  for(let k=0;k<6;k++){u.push(+(.6+R()*.22).toFixed(3));w.push(+(R()*2-1).toFixed(3))}
  const neg=w.slice(1).filter(x=>x<0).length;if(neg<2)for(let k=1;k<6&&w.slice(1).filter(x=>x<0).length<2;k++)if(w[k]>0)w[k]=-w[k];
  const pos=w.slice(1).filter(x=>x>0).length;if(pos<2)for(let k=1;k<6&&w.slice(1).filter(x=>x>0).length<2;k++)if(w[k]<0)w[k]=-w[k];
  out.push({id,u,w})}return out}
function mgpGenTheu(){const out=[];for(let t=0;t<MGP_NB().theu;t++){const id=`theu-${t}`,R=mgpRng(id);out.push({id,ord:[0,1,2,3,4].map(()=>mgpPerm(16,R))})}return out}
function mgpGenMua(){const out=[];for(let t=0;t<MGP_NB().mua;t++){const id=`mua-${t}`,R=mgpRng(id);out.push({id,seqs:[0,1,2,3,4].map(()=>{const s=[];for(let i=0;i<9;i++){let v=Math.floor(R()*4);if(i>=2&&s[i-1]===v&&s[i-2]===v)v=(v+1+Math.floor(R()*3))%4;s.push(v)}return s})})}return out}
function mgpGenDoi(){const out=[];for(const n of [3,4,5])for(let q=0;q<MGP_NB().doi;q++)out.push({id:`doi-${n}-${q}`,n,seed:`doi${n}-${q}`});return out}
function mgpGenDoden(){const out=[];for(let ty=0;ty<3;ty++)for(let q=0;q<MGP_NB().doden;q++)out.push({id:`doden-${ty}-${q}`,type:ty,seed:`doden${ty}-${q}`});return out}
const mgpGenSeeds=(kind,n)=>()=>Array.from({length:MGP_NB()[n||kind]},(_,q)=>({id:`${kind}-${q}`,seed:`${kind}-s${q}`}));
Object.assign(MGP_GEN,{dan:mgpGenDan,co:mgpGenCo,dauho:mgpGenDauho,theu:mgpGenTheu,mua:mgpGenMua,doi:mgpGenDoi,doden:mgpGenDoden,tc:mgpGenSeeds("tc"),xa:mgpGenSeeds("xa"),thq:mgpGenSeeds("thq")});
Object.assign(window,{mgpWith});
