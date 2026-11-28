/* ag2perf-diff: seeded OUTCOME dump for perf work (outcome-identical proof). Same harness as eng-probe (seeded Math.random, render/showModal stubbed, bot life,
   placeWhere + agFlush + nextBuoi), no profiler. After every buổi it records a hash of the save state S (timing/stat fields dropped; RNG re-seeded right before start() and the run done in ONE evaluate, so load-time timers cannot shift it; clock frozen, crypto seeded too, so time-budget slices and crypto picks are deterministic) + the Math.random call count.
   usage: [PRE='js run before start'] [K=khắc steps spend(1) per buổi, default 0] node dev/test/ag2perf-diff.js <index.html> <N> <seed> <out.json>      compare: node dev/test/ag2perf-diff.js --cmp a.json b.json   (diff must be 0) */
const fs=require('fs');
if(process.argv[2]==='--cmp'){const A=JSON.parse(fs.readFileSync(process.argv[3])),B=JSON.parse(fs.readFileSync(process.argv[4]));let first=-1,nd=0;const n=Math.max(A.h.length,B.h.length);
 for(let i=0;i<n;i++){if(A.h[i]!==B.h[i]){nd++;if(first<0)first=i}}const fin=A.fin===B.fin;console.log(JSON.stringify({buoi:n,diff:nd,first,finalStateSame:fin,rndA:A.rnd,rndB:B.rnd}));
 if(first>=0&&A.keys&&B.keys){const ka=A.keys[first]||{},kb=B.keys[first]||{};const d=Object.keys({...ka,...kb}).filter(k=>ka[k]!==kb[k]);console.log('first diff keys:',d.slice(0,20).join(' '))}process.exit(nd||!fin?1:0)}
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const [,,F,N0,SD,OUT]=process.argv;const N=+N0||80,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;window.__rnd=0;window.__reseed=()=>{x=s;window.__rnd=0};Math.random=()=>{window.__rnd++;x=(x*1103515245+12345)%2147483648;return x/2147483648};
 let y=s*7+1;window.__reseedC=()=>{y=s*7+1};crypto.getRandomValues=a=>{for(let i=0;i<a.length;i++){y=(y*1103515245+12345)%2147483648;a[i]=Math.floor(y/2147483648*4294967296)%(a instanceof Uint8Array?256:4294967296)}return a};performance.now=()=>1000;Date.now=()=>1763000000000},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{window.__setup=()=>{__reseed();__reseedC();localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){}};
 const DROP=/^(t0|ms|stat|perf|dt|tm|lastT)$/;
 window.__ser=v=>{const seen=new WeakMap();let id=0;return JSON.stringify(v,function(k,x){if(DROP.test(k))return undefined;if(typeof x==='function')return undefined;if(x&&typeof x==='object'){if(seen.has(x))return '#ref'+seen.get(x);seen.set(x,++id)}return x})};
 window.__h=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16)}});
const r=await p.evaluate(([n,PRE,KK])=>{if(PRE)(0,eval)(PRE);__setup();const H=[],K=[];for(let i=0;i<n&&!S.dead;i++){for(let j=0;j<KK;j++){Q.length=0;S.mg=0;try{spend(1)}catch(e){}}Q.length=0;S.mg=0;try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}try{nextBuoi()}catch(e){}Q.length=0;
  const kk={};for(const k in S){try{kk[k]=__h(__ser(S[k])||'')}catch(e){kk[k]='E'}}H.push(__h(__ser(S))+':'+__rnd);K.push(kk)}return{h:H,keys:K,fin:__h(__ser(S)),rnd:__rnd,at:[S.turn,S.buoi],dead:!!S.dead,rd:typeof AGD==='object'?AGD.stat.rd||null:null,slots:typeof AGD==='object'?AGD.stat.slots:0,deeds:typeof AGD==='object'?AGD.stat.deeds:0}},[N,process.env.PRE||'',+(process.env.K||0)]);
r.errs=errs.slice(0,5);fs.writeFileSync(OUT,JSON.stringify(r));console.log(JSON.stringify({n:r.h.length,rnd:r.rnd,at:r.at,dead:r.dead,rd:r.rd,slots:r.slots,deeds:r.deeds,errs:r.errs}));await b.close()})();
