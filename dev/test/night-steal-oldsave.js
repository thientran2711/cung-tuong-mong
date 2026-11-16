/* review/night-steal: OLD save (previous main build) → NEW build. Old build plays 3 weeks and saves slot 2; the new build loads it and plays
   6 weeks with the steal pass forced on (every flip tries), checking no page errors and that the night still resolves.
   usage: node dev/test/night-steal-oldsave.js <old index.html> <new index.html> */
const {chromium}=require('playwright');const path=require('path');const [,,OLD,NEW]=process.argv;
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1000,height:755}});const p=await c.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 const boot=async u=>{await p.goto('file://'+path.resolve(u),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await p.waitForTimeout(2500)};
 await boot(OLD);
 const a=await p.evaluate(()=>{window.__bot=1;window.render=function(){};document.getElementById('title').hidden=true;SLOT=2;for(let i=0;i<40;i++){start();if(!isSrv())break}
  try{for(let w=0;w<3;w++){Q.length=0;S.mg=0;endTurn()}}catch(e){return{err:String(e.stack).slice(0,600)}}Q.length=0;localStorage.setItem(SK(2),JSON.stringify(ser()));return{name:S.name,turn:S.turn,hasBal:!!BAL.steal}});
 await boot(NEW);
 const r=await p.evaluate(()=>{window.__bot=1;window.render=function(){};document.getElementById('title').hidden=true;let ok=false;try{const d=loadSlot(2);SLOT=2;deser(d);ok=!!(S&&S.name)}catch(e){return{err:String(e)}}
  const name=S.name;BAL.steal.k=1e6;BAL.steal.pMax=1;let tries0=(window.__stealSt||[]).length,nights=0;
  for(let w=0;w<6&&!S.dead;w++){Q.length=0;S.mg=0;if(S.tonight==="me"){S.tonight=null;night(S)}endTurn();if(S.tonight)nights++}
  return{ok,name,nights,tries:(window.__stealSt||[]).length-tries0,bal:!!BAL.steal}});
 console.log(JSON.stringify({old:a,new:r,errs}));const pass=!errs.length&&r.ok&&r.name===a.name&&a.hasBal===false&&r.tries>0;console.log(pass?"PASS":"FAIL");await b.close();process.exit(pass?0:1)})();
