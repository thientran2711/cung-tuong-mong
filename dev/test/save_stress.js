/* Save / load stress for pending cards (jqsave). Real save() path: game save -> localStorage slot -> loadSlot -> deser, at random
   moments of bot play (mid-card, mid-minigame, between acts). Checks:
   (1) every save that writes keeps every card that was waiting (pid cards, notices, data-only choice cards): none lost, same order, same titles;
   (2) a save while a card with code (opt.go) waits is held: the slot keeps the last written state (never a half-told card);
   (3) loading the slot gives back the same ledger key / khắc / place, and the game continues (no page error).
   usage: node dev/test/save_stress.js <url> <lives> [mode=sens|rand|mix] [out.json] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL='http://127.0.0.1:8975/t.html',LIVES='6',MODE='mix',OUT='/dev/stdout']=process.argv;const MEAS=path.join(__dirname,'..','measure');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
 await p.route(/\.(webp|png|jpg|mp3|ogg|m4a)$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(800);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(800);
 await p.evaluate(()=>{window.__realSave=save;SLOT=1;const O=['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'];let i=0;const s0=start;start=function(){window.__forceOrigin=O[(i++)%9];return s0.apply(this,arguments)}});
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(600);
 await p.evaluate(`window.__servPolicy='';window.__aff=0;window.__q72off=1;window.__jqoff=${process.env.JQOFF?1:0}`);
 for(const f of ['inpage6.js','inbal.js'])await p.evaluate(fs.readFileSync(path.join(MEAS,f),'utf8'));
 const r=await p.evaluate(([LIVES,MODE])=>{const R={lives:0,saves:0,written:0,held:0,midCard:0,cardsKept:0,lost:0,orderBad:0,heldBad:0,reloadBad:0,ex:[]};
  const bad=(k,m)=>{R[k]++;if(R.ex.length<15)R.ex.push(k+": "+m)};const tl=m=>String(m&&(m.pid||m.t)||"");
  start();let last=localStorage.getItem(SK(SLOT));
  for(let i=0;i<200000&&R.lives<+LIVES;i++){window.__bot.step(MODE==="mix"?(i%3?"sens":"rand"):MODE,1);
   if(S.dead||S.turn>=24){R.lives++;start();last=localStorage.getItem(SK(SLOT));continue}
   if(Math.random()<.06){R.saves++;if(Q.length)R.midCard++;const before=Q.map(tl);const anyCode=Q.some(m=>!jqSaveable(m));
    __realSave();const now=localStorage.getItem(SK(SLOT));
    if(anyCode){R.held++;if(now!==last)bad("heldBad","a card with code was waiting but the slot changed: "+before.join(" | "))}
    else{R.written++;const d=JSON.parse(now);const key0=j95key(),kh0=j95kh(),pl0=S.place;
     /* load the slot into a scratch copy: same functions the title menu runs */
     quiet=true;try{deser(JSON.parse(now))}finally{quiet=false}
     const after=Q.map(tl);R.cardsKept+=after.length;if(after.length<before.length)bad("lost",`${before.length}→${after.length}: ${before.join(" | ")}`);else if(after.join("|")!==before.join("|"))bad("orderBad",before.join(" | ")+" ⇒ "+after.join(" | "));
     if(j95key()!==key0||j95kh()!==kh0||S.place!==pl0)bad("reloadBad",`${key0}/${kh0}/${pl0} → ${j95key()}/${j95kh()}/${S.place}`)
     last=now}}}
  R.jq=JQ.stat;return R},[LIVES,MODE]);
 r.pageErrors=errs.length;r.pageErrEx=errs.slice(0,5);fs.writeFileSync(OUT,JSON.stringify(r,null,1));if(OUT!=='/dev/stdout')console.log(JSON.stringify(r));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
