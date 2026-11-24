/* ag2perf-deeds (review/ag2-perf, MAIN ROOT-52 18/11 deeds floor): NPC deeds per N buổi, counted like REVIEW AG LATER #2:
   AG.stat.land + AG2.stat.land + AG3.stat.land + AG4.stat.land (role-parity part 2, jagacts4) + jagstaff landings (window.__asN.n) + every deedAdd call (split: me / consort / servant / other); split = agLand0 consort vs non-consort doer, asRun close (master = a consort or her) vs far staff.
   Same deterministic harness as ag2perf-diff (seeded Math.random + crypto, frozen clock, bot life, placeWhere + agFlush + nextBuoi).
   usage: [PRE='BAL.ag.day.redecideCap=12'] node dev/test/ag2perf-deeds.js <index.html> <N> <seed>   → one JSON line */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const [,,F,N0,SD]=process.argv;const N=+N0||160,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;window.__rnd=0;window.__reseed=()=>{x=s;window.__rnd=0};Math.random=()=>{window.__rnd++;x=(x*1103515245+12345)%2147483648;return x/2147483648};
 let y=s*7+1;window.__reseedC=()=>{y=s*7+1};crypto.getRandomValues=a=>{for(let i=0;i<a.length;i++){y=(y*1103515245+12345)%2147483648;a[i]=Math.floor(y/2147483648*4294967296)%(a instanceof Uint8Array?256:4294967296)}return a};performance.now=()=>1000;Date.now=()=>1763000000000},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(([n,PRE])=>{if(PRE)(0,eval)(PRE);
 const D={me:0,consort:0,srvC:0,srvO:0,other:0};const d0=window.deedAdd;window.deedAdd=deedAdd=function(q){try{
  if(q===S)D.me++;else if(liveRivals(true).includes(q))D.consort++;else if(q&&q.role){let m=null;try{m=ownerOf(q)}catch(e){}if(m&&m!==S&&liveRivals(true).includes(m))D.srvC++;else D.srvO++}else D.other++}catch(e){D.other++}
  return d0.apply(this,arguments)};
 const LS={consort:0,x:0,asClose:0,asFar:0};if(typeof agLand0==='function'){const l0=agLand0;window.agLand0=agLand0=function(q){const r=l0.apply(this,arguments);try{if(q&&q.vid!=null)LS.consort++;else LS.x++}catch(e){}return r}}
 if(typeof asRun==='function'){const a0=asRun;window.asRun=asRun=function(q){try{let m=null;try{m=ownerOf(q)}catch(e){}if(m)LS.asClose++;else LS.asFar++}catch(e){}return a0.apply(this,arguments)}}
 __reseed();__reseedC();localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){};
 const L=()=>({ag:(window.AG&&AG.stat.land)||0,ag2:(window.AG2&&AG2.stat.land)||0,ag3:(window.AG3&&AG3.stat.land)||0,ag4:(typeof AG4==='object'&&AG4.stat.land)||0,as:(window.__asN&&__asN.n)||0});
 const a=L();for(const k in D)D[k]=0;for(const k in LS)LS[k]=0;
 for(let i=0;i<n&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}try{nextBuoi()}catch(e){}Q.length=0}
 const z=L(),o={};for(const k in z)o[k]=z[k]-a[k];o.deedAdd=D;o.split=LS;o.land=o.ag+o.ag2+o.ag3+o.ag4+o.as;o.total=o.land+D.consort+D.srvC+D.srvO+D.other;
 o.at=[S.turn,S.buoi];o.dead=!!S.dead;o.rd=typeof AGD==='object'?AGD.stat.rd||null:null;return o},[N,process.env.PRE||'']);
r.errs=errs.slice(0,3);r.seed=SEED;r.pre=process.env.PRE||'';console.log(JSON.stringify(r));await b.close()})();
