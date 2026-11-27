/* ORDER THIN P0 no-repeat measure: 6 lives × 1 kiếp per family. % of draws in lives 2–6 that repeat an item already met in an earlier life.
   before = uniform draw (today's j7 / mini-game pools), after = jnorep nrDraw (×BAL.nr.w per past life). node dev/test/norep-measure.js */
const fs=require('fs'),vm=require('vm'),path=require('path');
function run(N,k,useNr,seed){const st={};const c={localStorage:{getItem:x=>x in st?st[x]:null,setItem:(x,v)=>{st[x]=v}},window:{addEventListener(){}},BAL:{nr:{lives:6,w:.5,cap:1500}},Math,Date,JSON,S:null};
 vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(__dirname,'../build/jnorep.js'),'utf8')+';this.A={nrDraw,nrLife,nrFresh}',c);
 const pool=[...Array(N).keys()];const met=new Set();let rep=0,tot=0;
 for(let l=0;l<6;l++){c.S={nrl:'L'+l+'_'+seed};c.A.nrLife();const life=new Set();
  for(let i=0;i<k;i++){const left=pool.filter(x=>!life.has(x));const cand=left.length?left:pool;   /* both: no repeat inside one life while the pool lasts */
   const x=useNr==='fresh'?c.A.nrDraw('f',c.A.nrFresh('f',cand)):useNr?c.A.nrDraw('f',cand):cand[Math.floor(Math.random()*cand.length)];if(l>0){tot++;if(met.has(x))rep++}life.add(x)}
  for(const x of life)met.add(x)}return rep/tot}
const avg=(N,k,u)=>{let s=0;for(let i=0;i<40;i++)s+=run(N,k,u,i);return Math.round(s/40*100)};
const rows=[['j7 intrigue today (33 seeds, ~8 met per kiếp)',33,8],['j7 after P2 (60 seeds, ~8 per kiếp)',60,8],['mini-game kind today (4 items, ~6 boards per kiếp)',4,6],
 ['mini-game kind after P1 (40 items, ~6 boards per kiếp)',40,6],['j68 template family (73 templates, ~30 met per kiếp)',73,30]];
console.log('| Pool | before: uniform | after: nrDraw (×0.5) | after: nrDraw(nrFresh(...)) |\n|---|---|---|---|');for(const [n,N,k] of rows)console.log(`| ${n} | ${avg(N,k,false)} % | ${avg(N,k,true)} % | ${avg(N,k,'fresh')} % |`);
