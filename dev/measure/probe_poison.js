// usage: node dev/measure/probe_poison.js <build with meta charset>
// forces a landed poison (caught/antidote off, rolls true) on her at Sức 90 and 30, and on an NPC at Sức 30: same death rule for both?
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
 await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+process.argv[2]);await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 const r=await page.evaluate(()=>{const out=[];const c0=caught,r0=roll,u0=useAnti;caught=()=>"";roll=()=>true;useAnti=()=>false;
  try{for(const s of [90,30]){S.dead=false;S.suc=s;const v=liveRivals(false)[0];const t=ACT.poison.f(v,S);out.push({her:s,after:S.suc,dead:!!S.dead,fate:S.fate||"",t:String(t).replace(/<[^>]+>/g,"").slice(0,80)})}
   const v=liveRivals(false)[1];v.suc=30;const t2=ACT.poison.f(liveRivals(false)[2],v);out.push({npc:30,alive:v.alive,t:String(t2).replace(/<[^>]+>/g,"").slice(0,80)});
   const w=liveRivals(false)[3];w.suc=95;const t3=ACT.poison.f(liveRivals(false)[2],w);out.push({npc:95,alive:w.alive,suc:w.suc,t:String(t3).replace(/<[^>]+>/g,"").slice(0,80)})}
  finally{caught=c0;roll=r0;useAnti=u0}return out});
 console.log(JSON.stringify(r,null,1),'errors',JSON.stringify(errs));await b.close()})();
