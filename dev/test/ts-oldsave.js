/* old save → new build: play a life on the base build (no jts), save it to slot 3 the game's own way, open the new build, load slot 3, play 12 weeks.
   usage: node dev/test/ts-oldsave.js <baseURL old build> <URL new build> (same origin so localStorage is shared) */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const [,,OLD,NEW]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(OLD);await p.waitForTimeout(2500);
 const a=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();try{NLP=null}catch(e){}Q.length=0;for(let i=0;i<8&&!S.dead;i++){Q.length=0;endTurn()}Q.length=0;save();return{name:S.name,turn:S.turn,tuan:S.tuan,keys:Object.keys(localStorage)}});
 await p.goto(NEW);await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;let ok=false;try{const d=loadSlot(3);quiet=true;deser(d);quiet=false;deal();ok=!!d}catch(e){return{err:String(e)}}const n=S&&S.name;let w=0;for(let i=0;i<12&&!S.dead;i++){Q.length=0;endTurn();w++}render();return{ok,name:n,turn:S.turn,weeks:w,ts:Object.keys(S.ts||{})}});
 console.log(JSON.stringify({a,r,errs}));await b.close()})();
