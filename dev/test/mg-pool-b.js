/* ORDER THIN P1b test: mini-game content pools of lane P1b (jmgpool_b): dan co dauho theu mua doi doden tc xa thq — size, shape, rules, determinism, no-repeat measure. node dev/test/mg-pool-b.js [--measure] */
const fs=require('fs'),vm=require('vm'),path=require('path');const B=path.join(__dirname,'../build/');
const store={};const bal=fs.readFileSync(B+'jbal2.js','utf8');
const NB=eval('('+bal.match(/BAL\.mgpb=(\{[^}]*\});/)[1]+')'),MIN=+bal.match(/BAL\.mgp=\{min:(\d+)/)[1];
const c={localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}},window:{addEventListener(){}},BAL:{nr:{lives:6,w:.5,cap:1500},mgp:{min:MIN},mgpb:NB},Math:Object.create(Math),Date,JSON,S:{},console};
vm.createContext(c);
const j82=fs.readFileSync(B+'j82.js','utf8'),GO=j82.match(/function kg82GoGen[\s\S]*?\nfunction kg82Go\(/)[0].replace(/\nfunction kg82Go\($/,'');
vm.runInContext(fs.readFileSync(B+'jnorep.js','utf8')+fs.readFileSync(B+'jmgpool.js','utf8')+fs.readFileSync(B+'jmgpool_b.js','utf8')+GO+';this.api={nrLife,mgpItems,mgpOne,mgpRng,mgpWith,kg82GoGen}',c);const A=c.api;
let fail=0;const ok=(x,m)=>{if(!x){fail++;console.log('FAIL',m)}else console.log('ok  ',m)};
const KINDS=['dan','co','dauho','theu','mua','doi','doden','tc','xa','thq'];
for(const k of KINDS){const L=A.mgpItems(k);ok(L.length>=MIN,`${k}: ${L.length} items >= BAL.mgp.min ${MIN}`);ok(new Set(L.map(x=>x.id)).size===L.length,`${k}: ids unique`)}
const run3=a=>a.some((v,i)=>i>=2&&v===a[i-1]&&v===a[i-2]);
const dan=A.mgpItems('dan');ok(dan.every(x=>x.l.length===20&&x.g.length===20&&x.l.every(v=>v>=0&&v<4)&&!run3(x.l)&&x.g.every(g=>g>=880&&g<1140)),'dan: 20 notes on four strings, never three equal in a row, gaps as before (880..1139)');
ok(new Set(dan.map(x=>x.l.join(''))).size===dan.length,'dan: every tune differs');
const dh=A.mgpItems('dauho');ok(dh.every(x=>x.u.length===6&&x.w.length===6&&x.u.every(v=>v>=.6&&v<=.82)&&x.w.every(v=>v>=-1&&v<=1)&&x.w.slice(1).filter(v=>v<0).length>=2&&x.w.slice(1).filter(v=>v>0).length>=2),'dauho: six vase places in .6–.82, six winds, each side at least twice');
ok(new Set(dh.map(x=>x.u.join(','))).size===dh.length,'dauho: every sheet differs');
const th=A.mgpItems('theu');ok(th.every(x=>x.ord.length===5&&x.ord.every(p=>p.length===16&&new Set(p).size===16&&Math.max(...p)===15)),'theu: five rounds, each a permutation of sixteen cells');
ok(new Set(th.map(x=>x.ord.map(p=>p.slice(0,8).join('.')).join('|'))).size===th.length,'theu: every sheet differs');
const mu=A.mgpItems('mua');ok(mu.every(x=>x.seqs.length===5&&x.seqs.every(s=>s.length===9&&s.every(v=>v>=0&&v<4)&&!run3(s))),'mua: five rounds of nine steps on four directions, never three equal in a row (rounds use the first n, n <= 7)');
ok(new Set(mu.map(x=>x.seqs.map(s=>s.join('')).join('|'))).size===mu.length,'mua: every sheet differs');
const co=A.mgpItems('co');ok([1,2,3].every(sz=>co.filter(x=>x.sz===sz).length>=MIN),'co: every group size (1,2,3) holds >= '+MIN);
const doi=A.mgpItems('doi');ok([3,4,5].every(n=>doi.filter(x=>x.n===n).length>=MIN),'doi: every row count (3,4,5) holds >= '+MIN);
const dd=A.mgpItems('doden');ok([0,1,2].every(t=>dd.filter(x=>x.type===t).length>=MIN),'doden: every round type (0,1,2) holds >= '+MIN);
for(const k of ['tc','xa','thq'])ok(new Set(A.mgpItems(k).map(x=>x.seed)).size===A.mgpItems(k).length,`${k}: seeds unique`);
/* co: the SAME generator on the item's seed gives a valid position every time, the same item = the same board, different items differ */
const sig=P=>P.B.join('')+'|'+P.L;let nul=0,det=0,dif=0,tot=0;
for(const sz of [1,2,3]){const items=co.filter(x=>x.sz===sz),S=new Set();for(const it of items)for(const more of [0,1,2]){tot++;const a=A.mgpWith(it,()=>A.kg82GoGen(7,sz,more)),b=A.mgpWith(it,()=>A.kg82GoGen(7,sz,more));if(!a){nul++;continue}if(sig(a)===sig(b))det++;if(more===0)S.add(sig(a))}
 dif+=S.size>=items.length*.95?1:0}
ok(nul===0,`co: every item gives a position at ease more=0/1/2 (${nul} null of ${tot})`);ok(det===tot-nul,'co: same item = same board (deterministic)');ok(dif===3,'co: >= 95 % of the items of a size are different boards');
/* mgpWith puts the real Math.random back, also after a throw */
const r0=c.Math.random;try{A.mgpWith({seed:'x'},()=>{throw new Error('boom')})}catch(e){}ok(c.Math.random===r0,'mgpWith restores Math.random after a throw');
const s1=A.mgpWith({seed:'q'},()=>c.Math.random()),s2=A.mgpWith({seed:'q'},()=>c.Math.random());ok(s1===s2&&c.Math.random===r0,'mgpWith: same seed = same stream, and the real Math.random is back');
/* mgpOne: no repeat inside one game, marks through P0 */
c.S={};A.nrLife();for(const k of KINDS){const u=[];const a=[0,1,2,3].map(()=>A.mgpOne(k,u).id);ok(new Set(a).size===4,`${k}: 4 draws in one game are all different`)}
console.log(fail?`MG POOL B: ${fail} FAIL`:'MG POOL B: ALL PASS');
if(process.argv.includes('--measure')){/* 6 lives x 1 kiep: % of draws seen earlier in the same life or in the 5 lives before. before = uniform random over today's engine (random boards: counted by a 1/OLD chance of equal board, OLD = the number of distinct boards a player can tell apart, estimated as the rows below), after = P0 */
 /* today every board is a fresh random roll; a repeat only by chance. To make the table comparable with P1, «before» = the engine's own pool of choices of the part that decides the board (dan: 8 phrase contours × 4 shifts per phrase slot; co: 3 sizes only; etc.), i.e. how few different looks there are */
 const OLD={dan:32,co:10,dauho:12,theu:16,mua:16,doi:6,doden:8,tc:10,xa:14,thq:10},DR={dan:1,co:5,dauho:1,theu:1,mua:1,doi:3,doden:3,tc:2,xa:5,thq:3},G=+process.env.GAMES||6;
 const SZ={co:[1,2,2,3,3],doi:[3,3,4],doden:[0,1,2]};const rows=['kind | boards today (distinct looks) | pool | before % | after %'];
 for(const k of KINDS){const N=A.mgpItems(k).length;let b=0,a=0,tot=0;const seenB=[],seenA=[];
  for(let l=0;l<6;l++){const lb=new Set(),la=new Set();c.S={};A.nrLife();for(let g=0;g<G;g++){const u=[];for(let d=0;d<DR[k];d++){const ib=Math.floor(Math.random()*OLD[k]);if(lb.has(ib)||seenB.slice(-5).some(s=>s.has(ib)))b++;lb.add(ib);
    const f=SZ[k]?(SZ[k][d]):null;const it=A.mgpOne(k,u,f==null?null:(k==='co'?x=>x.sz===f:k==='doi'?x=>x.n===f:x=>x.type===f));const ia=it.id;if(la.has(ia)||seenA.slice(-5).some(s=>s.has(ia)))a++;la.add(ia);tot++}}seenB.push(lb);seenA.push(la)}
  rows.push(`${k} | ${OLD[k]} | ${N} | ${(100*b/tot).toFixed(0)} | ${(100*a/tot).toFixed(0)}`)}
 console.log(rows.join('\n'))}
process.exit(fail?1:0)
