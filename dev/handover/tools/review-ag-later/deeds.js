/* deeds: seeded 160 buổi engine run; counts landed agent deeds per doer (agLand0 with a live doer, AG2/AG3/AS land deltas) split consort / staff,
   plus AGD.stat.rd. usage: node deeds.js <index.html> <N> <seed> */
const {chromium}=require('playwright');const [,,F,N0,SD]=process.argv;const N=+N0||160,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;window.__reseed=()=>{x=s};Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};
 let y=s*7+1;window.__reseedC=()=>{y=s*7+1};crypto.getRandomValues=a=>{for(let i=0;i<a.length;i++){y=(y*1103515245+12345)%2147483648;a[i]=Math.floor(y/2147483648*4294967296)%(a instanceof Uint8Array?256:4294967296)}return a};performance.now=()=>1000;Date.now=()=>1763000000000},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(N=>{__reseed();__reseedC();localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){};
 const C={};const l0=agLand0;window.agLand0=agLand0=function(pp){const v=RV(pp&&pp.vid);const before=AG.stat.land||0;const out=l0.apply(this,arguments);if((AG.stat.land||0)>before&&v){C[v.name]=(C[v.name]||0)+1}return out};
 const gl=o=>{try{return o&&o.stat&&o.stat.land||0}catch(e){return 0}};const s0={a2:gl(window.AG2),a3:gl(window.AG3)};
 for(let i=0;i<N&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();agFlush()}catch(e){}try{nextBuoi()}catch(e){}Q.length=0}
 return {per:C,con:Object.values(C).reduce((a,b)=>a+b,0),a2:gl(window.AG2)-s0.a2,a3:gl(window.AG3)-s0.a3,rd:(window.AGD&&AGD.stat&&AGD.stat.rd)||null,dead:!!S.dead,at:[S.turn,S.buoi]}},N);
console.log(JSON.stringify(Object.assign(r,{errs:errs.slice(0,2)})));await b.close()})();
