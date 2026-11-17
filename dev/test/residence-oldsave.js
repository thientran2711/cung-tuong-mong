/* review/residence-seats old save: a save of the LIVE build (made over the new halved seats: 4 Phi + 3 Quý phi) loads in this build:
   nobody demoted (S.seatKeep stamps them), she is housed in a phối điện on load. usage: node dev/test/residence-oldsave.js <oldUrl> <newUrl>; exit 1 on fail */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const boot=async u=>{await p.goto(u);for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await p.waitForTimeout(300)}};
await boot(process.argv[2]);
const a=await p.evaluate(()=>{localStorage.clear();SLOT=3;window.__nlInner=1;window.__forceOrigin='tt';start();Q.length=0;quiet=true;
 /* make the old save over the NEW seat cap: 4 Phi, 3 Quý phi */
 const L=rivals.filter(v=>v.alive&&!v.queen&&v.rank<4);L.slice(0,3).forEach(v=>v.rank=4);L.slice(3,5).forEach(v=>v.rank=5);palFix();save();const dd=loadSlot(3);window.__sv=dd&&dd.R.map(v=>v.queen?'Q':v.rank).join('');
 return{her:S.resHead||null,res:typeof residenceOf==='function'?residenceOf(S).part:'?',ranks:rivals.map(v=>v.queen?'Q':v.rank).join(''),saved:window.__sv}});
await boot(process.argv[3]);
const b2=await p.evaluate(()=>{const d=loadSlot(3);{const L=d.R.filter(v=>v.alive&&!v.queen&&v.rank<4);L.slice(0,3).forEach(v=>v.rank=4);L.slice(3,5).forEach(v=>v.rank=5);window.__pre=d.R.map(v=>v.queen?'Q':v.rank).join('')}window.__tr=[];for(const v of d.R){let rk=v.rank;Object.defineProperty(v,'rank',{enumerable:true,configurable:true,get(){return rk},set(x){if(x<rk)window.__tr.push(v.name+' '+rk+'>'+x+' '+(new Error).stack.split('\n').slice(2,5).join('|').replace(/http:[^)]*index.html/g,''));rk=x}})}SLOT=3;quiet=true;deser(d);normAll&&normAll();quiet=false;const r=residenceOf(S);
 return{her:S.resHead,room:resRoomName(r),ranks:rivals.map(v=>v.queen?'Q':v.rank).join(''),keep:S.seatKeep,phi:holders(4).length,qp:holders(5).length,pre:window.__pre,tr:window.__tr,logs:(S.logs||[]).slice(0,4).map(x=>String(x).replace(/<[^>]+>/g,'').slice(0,90))}});
const ok=b2.ranks===b2.pre&&/phối điện/.test(b2.room)&&!errs.length;console.log(JSON.stringify({old:a,new:b2,errs:errs.slice(0,3)}));console.log(ok?'RESIDENCE-OLDSAVE PASS':'RESIDENCE-OLDSAVE FAIL');process.exitCode=ok?0:1;await b.close()})();
