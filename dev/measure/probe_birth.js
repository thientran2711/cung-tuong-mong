// usage: GAME=<build with meta charset> node dev/measure/probe_birth.js
// calls birthP(S) many times with die() stubbed: does the measured mother death rate match birthRisk(S)?
const {chromium}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
 await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+GAME);await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 const r=await page.evaluate(()=>{const out=[];const d0=die;let dead=0;die=function(){dead++};const q0=quiet;quiet=true;
  for(const cfg of [{},{doctor:1},{doctor:1,y:2,anthai:1,maid:80}]){dead=0;const N=2000;let rs=0;
   for(let i=0;i<N;i++){S.dead=false;S.kids=[];S.doctor=cfg.doctor?{}:null;S.arts=S.arts||{};S.arts.y=cfg.y||0;S.anthai=cfg.anthai?1:0;if(S.maid)S.maid.loyal=cfg.maid||40;S.preg=0;rs+=birthRisk(S);try{birthP(S,false)}catch(e){}}
   out.push({cfg,meanRisk:+(rs/N).toFixed(2),deathPct:+(100*dead/N).toFixed(2)})}
  die=d0;quiet=q0;return out});
 console.log(JSON.stringify(r),'errors',JSON.stringify(errs.slice(0,3)));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
