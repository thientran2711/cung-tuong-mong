/* MOODKNOW step 0: how often NPC emotion acts / outbursts / extremes happen (EA_N) over bot days. usage: node dev/measure/ea-npc-rate.js <build> [days] [runs] */
const {chromium}=require('playwright');const U0=process.argv[2]||'dev/index.html';const U=/^(https?|file):/.test(U0)?U0:'file://'+require('path').resolve(U0);const D=+process.argv[3]||8,RUNS=+process.argv[4]||2;
(async()=>{const b=await chromium.launch();const tot={};for(let r=0;r<RUNS;r++){const p=await b.newPage();await p.goto(U,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const x=await p.evaluate(async D=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;Q.length=0;try{deal()}catch(e){}render();
  for(let i=0;i<D*16&&!S.dead;i++){Q.length=0;try{endTurn()}catch(e){}}const sum=o=>Object.values(o||{}).reduce((a,b)=>a+(+b||0),0);
  return {wk:EA_N.wk,npcOut:sum(EA_N.npcOut),npcExt:sum(EA_N.npcExt),npcAct:sum(EA_N.npcAct||EA_N.act||{}),out:sum(EA_N.out),ext:sum(EA_N.ext),keys:Object.keys(EA_N).join(",")}},D);
 for(const k in x)if(typeof x[k]==="number")tot[k]=(tot[k]||0)+x[k];tot.keys=x.keys;await p.close()}console.log(JSON.stringify(tot));await b.close()})();
