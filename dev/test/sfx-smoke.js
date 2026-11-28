/* SFX smoke (review/sfx): at each screen size a new game plays 3 weeks with sound ON (bots off), and an old save loads and plays 1 week.
   Checks: 0 page errors, 0 HTTP >= 400 (audio included), sounds were called (KSFX.log), every called file answered 200, 0 dead files.
   usage: node dev/test/sfx-smoke.js <site url> <oldsave.json> 755x1000 1000x755 1180x820 1366x1024 844x390 390x844 */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');
const [,,URL,OLD,...SZ]=process.argv;
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const out=[];
 for(const sz of SZ){const [W,H]=sz.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[],bad=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().slice(-80))});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitSfx==='function');await p.waitForTimeout(2500);
  const run=async(code)=>p.evaluate(code);
  const play=`(async()=>{OPT.snd=true;OPT.mute=false;OPT.sfx=.7;AU.unlocked=true;window.__bot=false;const n0=KSFX.log.length;const w0=S.turn;
    for(let i=0;i<40&&S.turn<w0+WEEKS&&!S.dead;i++){document.querySelectorAll(".kmov").forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;
     try{endTurn()}catch(e){console.error(e)}await new Promise(r=>setTimeout(r,700))}
    const L=KSFX.log.slice(n0).map(x=>x.n);const dead=Object.keys(AU.cache).filter(k=>AU.cache[k]&&AU.cache[k].dead);return{turn:S.turn-w0,sounds:L.length,uniq:[...new Set(L)],dead,dropErr:KSFX.drop.filter(d=>/^err|dead/.test(d.why)).map(d=>d.n)}})()`;
  const ng=await run(`(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}return typeof S!=='undefined'&&S?S.name:''})()`);
  for(let i=0;i<20;i++){await p.waitForTimeout(500);const ok=await p.evaluate(()=>{if(typeof S==="undefined"||!S)return false;if(isSrv()){Q.length=0;try{nlNew()}catch(e){}start();return false}Q.length=0;tab="go";render();return true});if(ok)break}
  const r1=await run(play.replace('WEEKS','3'));
  let r2=null;if(OLD){const d=fs.readFileSync(OLD,'utf8');r2=await p.evaluate(d=>{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return{e:'noload'};SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;Q.length=0;render();return{name:S.name,turn:S.turn}},d);
   r2.play=await run(play.replace('WEEKS','1'))}
  const rot=await p.evaluate(()=>{try{return window.__krot?{rotated:!!__krot.rotated,s:+(__krot.s||1).toFixed(3)}:null}catch(e){return null}});
  out.push({size:sz,newGame:ng,play:r1,oldSave:r2,rot,errs,http4xx:bad.slice(0,8),ok:!errs.length&&!bad.length&&r1.sounds>0&&!r1.dead.length&&!(r2&&(r2.e||r2.play.dead.length))});
  console.error(sz,JSON.stringify(out[out.length-1]).slice(0,300));await ctx.close()}
 console.log(JSON.stringify(out,null,1));await b.close();process.exit(out.every(x=>x.ok)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
