/* ORDER THIN P1 test: mini-game content pools (jmgpool) — size, shape, wording, art keys, difficulty, no-repeat measure. node dev/test/mg-pool.js [--measure] */
const fs=require('fs'),vm=require('vm'),path=require('path');const B=path.join(__dirname,'../build/');
const store={};const c={localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}},window:{addEventListener(){}},BAL:{nr:{lives:6,w:.5,cap:1500},mgp:{min:40}},Math,Date,JSON,S:{},console};
vm.createContext(c);vm.runInContext(fs.readFileSync(B+'jnorep.js','utf8')+fs.readFileSync(B+'jmgpool.js','utf8')+';this.api={nrNow,nrFresh,nrMark,mgpItems,mgpOne,mgpRng,mgpSkin,MGP_HAT,nrLife,nrSeen,nrDraw}',c);const A=c.api;
/* the data tables the pools compose from (one source each): glyphs in jnwp, altar pieces in jnwq */
const nwp=fs.readFileSync(B+'jnwp.js','utf8'),nwq=fs.readFileSync(B+'jnwq.js','utf8');
const GL=nwp.match(/const NW_GLYPH=\{[\s\S]*?\]\]\]\};/)[0],LE=nwq.match(/const NWQ_LE=\[[^\]]*\];/)[0];vm.runInContext(GL+LE+';this.NWG=NW_GLYPH;this.LEO=NWQ_LE',c);
const bal=fs.readFileSync(B+'jbal2.js','utf8').match(/BAL\.mgp=\{min:(\d+)/);const MIN=bal?+bal[1]:40;
let fail=0;const ok=(x,m)=>{if(!x){fail++;console.log('FAIL',m)}else console.log('ok  ',m)};
const j91=fs.readFileSync(B+'j91.js','utf8');
const ING=Object.keys(eval('('+j91.match(/const K91_ING=(\{[\s\S]*?\});/)[1]+')'));
const ES=eval(j91.match(/const K91_ES=(\[[\s\S]*?\]\]);/)[1]).map(x=>x[1]);
const KINDS=['hat','hoa','banh','huong','ve','kim','tho','le','td_cong'];
const bad=t=>/[0-9%]/.test(t);
for(const k of KINDS){const L=A.mgpItems(k);ok(L.length>=MIN,`${k}: ${L.length} items >= BAL.mgp.min ${MIN}`);ok(new Set(L.map(x=>x.id)).size===L.length,`${k}: ids unique`)}
// hat: wording + contours not steeper than the old song
const hat=A.mgpItems('hat');ok(hat.every(x=>x.lines.length===4&&x.lines.every(l=>l&&!bad(l))),'hat: 4 lines each, no digits/%');
ok(hat.every(x=>x.f.reduce((s,f,i)=>s+f*x.a[i],0)<=.4981+1e-9),'hat: melody slope never above the old song (difficulty unchanged)');
ok(hat.every(x=>x.a[0]+x.a[1]+x.a[2]<=.31+1e-9),'hat: melody swing never above the old song');
// banh: distinct painted ingredients, fire zone 0..2, dish name wording
const banh=A.mgpItems('banh');ok(banh.every(x=>x.steps.length===4&&new Set(x.steps.map(s=>s[0])).size===4&&x.steps.every(s=>ING.includes(s[0])&&s[1]>=0&&s[1]<=2)&&x.nm&&!bad(x.nm)),'banh: 4 distinct painted ingredients, fire 0..2, name has no digits/%');
ok(banh.every(x=>x.steps[0][1]===2),'banh: the big-fire step first (as the four old recipes)');
// huong
const hu=A.mgpItems('huong');ok(hu.every(x=>x.E.length===3&&x.E.every(i=>i>=0&&i<ES.length)&&Math.max(...x.tv)-Math.min(...x.tv)>=2&&x.tv.every(v=>v>=1&&v<=6)),'huong: valid triples, target spread >= 2');
const D=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);ok(hu.every(x=>D(ES[x.E[0]],ES[x.E[1]])>90&&D(ES[x.E[0]],ES[x.E[2]])>90&&D(ES[x.E[1]],ES[x.E[2]])>90),'huong: essence colours apart (old rule > 90)');
// hoa
const hoa=A.mgpItems('hoa');ok(hoa.every(x=>x.si>=0&&x.si<4&&x.like.length===3&&x.oth.length===2&&x.oth[0]!==x.oth[1]&&x.oth.every(i=>i>=0&&i<7)),'hoa: season/like/other indexes in range');
ok([0,1,2,3].every(s=>hoa.filter(x=>x.si===s).length>=10),'hoa: every season has >= 10 trays (a recipe-forced season never starves)');
// ve
const ve=A.mgpItems('ve');const T=['sonchu','sonkhach','thuyen','tung','hac'];ok(ve.every(x=>x.m.length===6&&x.m.every(([t,u,v])=>T.includes(t)&&u>=0&&u<=1&&v>=0&&v<=1)),'ve: 6 motifs, painted types, inside the scroll');
ok(ve.every(x=>new Set(x.m.slice(0,3).map(m=>m[0])).size>=2),'ve: the first three motifs hold two kinds at least');
// kim
const kim=A.mgpItems('kim');ok(kim.every(x=>x.sh.length>=2&&x.seed),'kim: >= 2 hole shapes, a layout seed');
// tho: glyph x manner, strokes keep their order/count, points inside the square
const tho=A.mgpItems('tho');ok(tho.every(x=>x.g[1].length===x.n&&x.g[1].every(st=>(st.length===2||st.length===3)&&st.every(([u,v])=>u>=.05&&u<=.95&&v>=0&&v<=1))),'tho: stroke count = n, 2-3 points per stroke, inside the square');
ok(Object.keys(c.NWG).every(n=>tho.filter(x=>x.n==+n).length>=c.NWG[n].length*6),'tho: every tier length keeps all its glyphs (6 manners each)');
ok(tho.every(x=>/^Chữ /.test(x.g[0])),'tho: glyph names unchanged (no new words in play)');
// le: N distinct altar pieces from the eight, a layout of N slots
const le=A.mgpItems('le');ok(le.every(x=>x.objs.length===x.n&&x.lay.length===x.n&&new Set(x.objs).size===x.n&&x.objs.every(o=>c.LEO.includes(o))),'le: n distinct real altar pieces, n slots');
ok([3,4,5].every(n=>le.filter(x=>x.n===n).length>=MIN),'le: every table size holds >= '+MIN);
const tdc=A.mgpItems('td_cong');ok([0,1,2].every(sl=>tdc.filter(x=>x.slot===sl).length>=MIN)&&tdc.every(x=>x.dk.length===3&&x.lt.length===3),'td_cong: every slot holds >= '+MIN+' pieces');
// determinism of rng
ok(A.mgpRng('x')()===A.mgpRng('x')()&&A.mgpRng('x')()!==A.mgpRng('y')(),'mgpRng deterministic');
ok(A.mgpSkin('hoa')==='','no skin registered = today\'s art ("")');
// mgpOne: no repeat inside one game, marks through P0
c.S={};A.nrLife();for(const k of KINDS){const u=[];const a=[0,1,2,3].map(()=>A.mgpOne(k,u).id);ok(new Set(a).size===4,`${k}: 4 draws in one game are all different`)}
console.log(fail?`MG POOL: ${fail} FAIL`:'MG POOL: ALL PASS');
if(process.argv.includes('--measure')){/* 6 lives x 1 kiep: % of draws seen earlier in the same life or in the 5 lives before. before = uniform random over today's pools (old sizes), after = P0 */
 const OLD={hat:1,hoa:4,banh:4,huong:35,ve:3,kim:3,tho:13,le:8,td_cong:3},DR={hat:1,hoa:3,banh:1,huong:3,ve:3,kim:3,tho:3,le:1,td_cong:3},G=+process.env.GAMES||12;/* G games of the kind per kiep (festival contests + lessons + crafts: BAL-free estimate), DR draws per game */let rows=['kind | old pool | new pool | repeat% before | repeat% after'];
 for(const k of KINDS){const N=A.mgpItems(k).length;let b=0,a=0,tot=0;
  const seenB=[],seenA=[];for(let l=0;l<6;l++){const lb=new Set(),la=new Set();c.S={};for(let g=0;g<G*DR[k];g++){const ib=Math.floor(Math.random()*OLD[k]);const prev=seenB.slice(-5);if(lb.has(ib)||prev.some(s=>s.has(ib)))b++;lb.add(ib);
    const ia=A.mgpOne(k).id;c.S.nrl=c.S.nrl||undefined;if(la.has(ia)||seenA.slice(-5).some(s=>s.has(ia)))a++;la.add(ia);tot++}seenB.push(lb);seenA.push(la);c.S={};A.nrLife()}
  rows.push(`${k} | ${OLD[k]} | ${N} | ${(100*b/tot).toFixed(0)} | ${(100*a/tot).toFixed(0)}`)}
 console.log(rows.join('\n'))}
process.exit(fail?1:0)
