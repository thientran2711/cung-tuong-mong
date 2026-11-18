/* FEELINGS-18 acts rate: bot plays N tuần; counts jfeel acts (FEEL.stat.act, per feeling, hers vs NPC) on the head build, and the old jemoact
   outbursts (eaStat) on any build, so head vs base can be compared per 100 tuần. usage: node dev/measure/feelings18-acts-rate.js <index.html> [tuần=20] [runs=2] */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const WK=+process.argv[3]||20,RUNS=+process.argv[4]||2;
(async()=>{const b=await chromium.launch();const tot={wk:0,act:{},me:0,ea:{},err:0};
 for(let r=0;r<RUNS;r++){const p=await b.newPage();p.on('pageerror',()=>tot.err++);await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
  const o=await p.evaluate(async(WK)=>{const w0=emoW();let me=0,lastN=0,g=0;
   while(emoW()-w0<WK&&g<WK*40&&!S.dead){g++;try{Q.length=0;nextBuoi();render()}catch(e){}const n=S.fa2&&S.fa2.n||0;if(n>lastN)me+=n-lastN;lastN=n}
   let ea={};try{ea=JSON.parse(JSON.stringify(eaStat()))}catch(e){}return{wk:emoW()-w0,act:typeof feelStat==="function"?(feelStat().act||{}):{},me,ea}},WK);
  tot.wk+=o.wk;tot.me+=o.me;for(const k in o.act)tot.act[k]=(tot.act[k]||0)+o.act[k];
  const flat=(x,pre)=>{for(const k in x){const v=x[k];if(typeof v==="number")tot.ea[pre+k]=(tot.ea[pre+k]||0)+v;else if(v&&typeof v==="object")flat(v,pre+k+".")}};flat(o.ea,"");await p.close()}
 const per=x=>Math.round(x*100/Math.max(1,tot.wk)*10)/10;const sum=Object.values(tot.act).reduce((a,b)=>a+b,0);
 console.log(JSON.stringify({tuan:tot.wk,actsPer100:per(sum),herPer100:per(tot.me),byFeeling:Object.fromEntries(Object.entries(tot.act).map(([k,v])=>[k,per(v)])),
  oldOutburstsPer100:Object.fromEntries(Object.entries(tot.ea).filter(([k])=>/out|npcAct|ext/i.test(k)).map(([k,v])=>[k,per(v)])),pageErrors:tot.err}));await b.close()})();
