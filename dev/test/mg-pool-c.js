/* ORDER THIN P1c test: pools of the P1c kinds (jmgpool_c) — size, shape, wording, difficulty parts unchanged, no-repeat measure. node dev/test/mg-pool-c.js [--measure] */
const fs=require('fs'),vm=require('vm'),path=require('path');const B=path.join(__dirname,'../build/');
const store={};const c={localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}},window:{addEventListener(){}},BAL:{nr:{lives:6,w:.5,cap:1500},mgp:{min:40}},Math,Date,JSON,S:{},console};
vm.createContext(c);
const bal=fs.readFileSync(B+'jbal2.js','utf8'),m=bal.match(/BAL\.mgpc=(\{[^}]*\});/);const MIN=+bal.match(/BAL\.mgp=\{min:(\d+)/)[1];c.BAL.mgpc=eval('('+m[1]+')');
const sg=fs.readFileSync(B+'jsgame.js','utf8'),td=fs.readFileSync(B+'jtd.js','utf8');
const cut=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i);if(i<0||j<0)throw new Error('cut '+a);return s.slice(i,j)};
const pre=cut(sg,'const SG_KW=','function sgPh');
vm.runInContext(fs.readFileSync(B+'jnorep.js','utf8')+fs.readFileSync(B+'jmgpool.js','utf8')+pre+fs.readFileSync(B+'jmgpool_c.js','utf8')+';this.api={nrNow,nrFresh,nrMark,mgpItems,mgpOne,mgpRng,nrLife,nrSeen,nrDraw,SG_KW,SG_IMP,SG_FILL,MGP_ALMS}',c);const A=c.api;
let fail=0;const ok=(x,m)=>{if(!x){fail++;console.log('FAIL',m)}else console.log('ok  ',m)};
const KINDS=['nghe','td_hanh','kinh','may'];const bad=t=>/[0-9%]/.test(t);
for(const k of KINDS){const L=A.mgpItems(k);ok(L.length>=MIN,`${k}: ${L.length} items >= BAL.mgp.min ${MIN}`);ok(new Set(L.map(x=>x.id)).size===L.length,`${k}: ids unique`)}
// nghe: 10 distinct words, the first three of every item differ across items; 16 lines, 7 important / 3 decoy / 6 small talk, last two small talk
const ng=A.mgpItems('nghe');ok(ng.every(x=>x.kw.length===10&&new Set(x.kw).size===10&&x.kw.every(i=>i>=0&&i<A.SG_KW.length)),'nghe: ten distinct secret words');
ok(new Set(ng.map(x=>x.kw.slice(0,3).slice().sort().join())).size===ng.length,'nghe: every item listens for a different triple of words');
ok(ng.every(x=>x.kinds.length===16&&x.kinds.filter(k=>k==='i').length===7&&x.kinds.filter(k=>k==='d').length===3&&x.kinds.filter(k=>k==='f').length===6&&x.kinds[14]==='f'&&x.kinds[15]==='f'),'nghe: 16 lines = 7 true + 3 decoy + 6 small talk, last two small talk (as the engine)');
ok(ng.every(x=>new Set(x.imp).size===6&&new Set(x.fil).size===10),'nghe: every line template / small-talk line once');
// td_hanh: same shape as TD_ALMS (people count, needs multiset, pool), distinct people, wording
const th=A.mgpItems('td_hanh'),SH=[[5,[1,2,2]],[8,[1,2,2,3]],[7,[2,2,3]]];
ok(th.every(x=>x.rounds.length===3&&x.rounds.every((r,i)=>r.pool===SH[i][0]&&r.list.map(p=>p[2]).sort().join()===SH[i][1].join())),'td_hanh: three rounds keep the old people count, needs and pool (difficulty unchanged)');
ok(th.every(x=>{const n=x.rounds.flatMap(r=>r.list.map(p=>p[0]));return new Set(n).size===n.length&&x.rounds.every(r=>r.list.every(p=>p[0]&&p[1]&&!bad(p[0]+p[1])))}),'td_hanh: nobody twice in a game, no digits or % in the words');
const old=[['Lão cung nhân','già yếu, lưng còng'],['Lão ma ma','đói lả']];ok(old.every(o=>A.MGP_ALMS[2].concat(A.MGP_ALMS[3],A.MGP_ALMS[1]).some(p=>p[0]===o[0])),'td_hanh: today\'s people stay in the parts');
// kinh / may: parameter figures inside the square, long enough strokes
const fp=(f,t)=>f[0]==='L'?[f[1]+(f[3]-f[1])*t,f[2]+(f[4]-f[2])*t]:f[0]==='Q'?[(1-t)*(1-t)*f[1]+2*(1-t)*t*f[3]+t*t*f[5],(1-t)*(1-t)*f[2]+2*(1-t)*t*f[4]+t*t*f[6]]:[f[1]+(f[2]-f[1])*t,f[3]+f[4]*Math.sin(t*Math.PI*f[5])];
const inSq=f=>[0,.25,.5,.75,1].every(t=>{const p=fp(f,t);return p[0]>=.05&&p[0]<=.95&&p[1]>=.05&&p[1]<=.95});
for(const k of ['kinh','may']){const L=A.mgpItems(k);ok(L.every(x=>x.S.length>=1&&x.S.length<=4&&x.S.every(inSq)),`${k}: 1-4 strokes per figure, every stroke inside the square`)}
ok(A.mgpItems('kinh').every(x=>x.S.length>=3&&new Set(x.S.map(f=>f.join())).size===x.S.length),'kinh: 3-4 distinct strokes per row (as the five old rows)');
// mgpOne: four different in one game
c.S={};A.nrLife();for(const k of KINDS){const u=[];const a=[0,1,2,3].map(()=>A.mgpOne(k,u).id);ok(new Set(a).size===4,`${k}: 4 draws in one game are all different`)}
console.log(fail?`MG POOL C: ${fail} FAIL`:'MG POOL C: ALL PASS');
if(process.argv.includes('--measure')){/* 6 lives x 1 kiep: % of draws seen earlier in this life or the 5 lives before. before = uniform over today's content (OLD = how many boards a player can tell apart), after = P0 fresh-first (mgpOne) */
 const OLD={nghe:120,td_hanh:1,kinh:5,may:5},DR={nghe:1,td_hanh:1,kinh:4,may:4},G=+process.env.GAMES||12;
 let rows=['kind | boards before | pool after | repeat % before (uniform) | repeat % after (mgpOne) @GAMES='+G];
 for(const k of KINDS){const N=A.mgpItems(k).length;let b=0,a=0,tot=0;const seenB=[],seenA=[];
  for(let l=0;l<6;l++){const lb=new Set(),la=new Set();c.S={};for(let g=0;g<G;g++){const u=[],ub=new Set();for(let d=0;d<DR[k];d++){const ib=Math.floor(Math.random()*Math.min(OLD[k],1e6));if(lb.has(ib)||seenB.slice(-5).some(s=>s.has(ib)))b++;lb.add(ib);
     const ia=A.mgpOne(k,u).id;if(la.has(ia)||seenA.slice(-5).some(s=>s.has(ia)))a++;la.add(ia);tot++}}seenB.push(lb);seenA.push(la)}
  rows.push(`${k} | ${OLD[k]>=1e6?'random':OLD[k]} | ${N} | ${(100*b/tot).toFixed(0)} | ${(100*a/tot).toFixed(0)}`)}
 console.log(rows.join('\n'))}
process.exit(fail?1:0)
