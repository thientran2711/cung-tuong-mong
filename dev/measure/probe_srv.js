// usage: GAME=<build with meta charset> node dev/measure/probe_srv.js [lives]
// servant start (cnv): checks that the mistress' palace (palaceOf(srvM())) is her real palace "r<id>" / "kn", never "home", and S is "home" (the maids' room)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const M=__dirname,GAME=process.env.GAME||path.join(M,'..','index.html'),N=+process.argv[2]||3;
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
 await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+GAME);await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__origO="cnv";window.__hhStop=1`);await page.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));
 const bad=[],seen={};let checks=0;
 for(let it=0;it<600;it++){const n=await page.evaluate(()=>window.__bot.step("sens",60));
  const r=await page.evaluate(()=>{try{if(!S||!S.srv||S.dead)return null;const m=srvM();if(!m)return{none:1};return{me:palaceOf(S),mk:palaceOf(m),mn:m.name,mr:rkOf(m),q:!!m.queen,pn:palName(palaceOf(m)),wk:S.turn*3+S.tuan}}catch(e){return{err:String(e)}}});
  if(r&&!r.none){checks++;seen[r.mk+" "+r.pn]=1;if(r.err||r.me!=="home"||r.mk==="home"||!(r.mk==="kn"||/^r\d+$/.test(r.mk)))bad.push(r)}
  if(n>=N)break}
 console.log(JSON.stringify({checks,bad:bad.slice(0,5),nbad:bad.length,places:Object.keys(seen),errs:errs.slice(0,5)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
