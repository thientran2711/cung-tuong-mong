/* ag2perf-a.test (review/ag2-perf A, owner OD L1637 "chỉ người bị ảnh hưởng mới nghĩ lại"): every consort slot of every buổi carries its cause
   (slot.rc: day / ill / rain / touch / need / new / done / urge = she picked again; keep = she kept her schedule row, no deed), no re-decider
   without a cause, at most BAL.ag.day.redecideCap re-deciders per buổi, a kept slot has no deed; redecideCap 0 = old path (no rc).
   usage: [CAP=8] node dev/test/ag2perf-a.test.js dev/index.html [N=40] [seed=1]   (the shipped default is 0 = off; the test switches A on with CAP) */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const [,,F,N0,SD]=process.argv;const N=+N0||40,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(([n,C])=>{BAL.ag.day.redecideCap=C;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){};const CAP=BAL.ag.day.redecideCap,OK=new Set(["day","ill","rain","touch","need","new","done","urge"]);const bad=[];let maxRd=0,cnt={};
 for(let i=0;i<n&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}
  const D=agDz(),bb=agDayB();let rd=0,day=0;for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const s=D.P["v"+v.id]&&D.P["v"+v.id][bb];if(!s)continue;const c=s.rc;cnt[c]=(cnt[c]||0)+1;
   if(c==="keep"){if(s.k)bad.push([i,v.id,"keep with deed "+s.k])}else if(c==="day")day++;else if(OK.has(c))rd++;else bad.push([i,v.id,"no cause: "+c])}
  if(!day)maxRd=Math.max(maxRd,rd);if(!day&&rd>CAP)bad.push([i,"cap",rd]);try{nextBuoi()}catch(e){}Q.length=0}
 BAL.ag.day.redecideCap=0;let rc0=0;for(let i=0;i<8&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();agFlush()}catch(e){}const D=agDz(),bb=agDayB();if(i>0)for(const v of liveRivals(true)){const s=D.P["v"+v.id]&&D.P["v"+v.id][bb];if(s&&s.rc)rc0++}try{nextBuoi()}catch(e){}Q.length=0}
 return{bad:bad.slice(0,10),nBad:bad.length,maxRd,cap:CAP,cnt,rc0}},[N,+(process.env.CAP||8)]);
const pass=!r.nBad&&!errs.length&&r.rc0===0&&(r.cnt.keep||0)>0;console.log(JSON.stringify(Object.assign(r,{errs:errs.slice(0,3)})));console.log(pass?"PASS":"FAIL");await b.close();process.exit(pass?0:1)})();
