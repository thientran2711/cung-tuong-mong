/* button-crawl-fix-8 (robot s9 replay on LIVE 9f72524b + fix-6: «Sang ngày mới» dead ~80 s at the end of tối): the jdayq news-first hold
   (DQ.newsHold, set at dawn) must hold a motion scene only in the MORNING buổi of the new day. A hold left over from the morning (no scene that
   day) held the night flip scene behind a «Tin trong cung» card that jnf in turn kept hidden until the flip had played = deadlock.
   Checks kmFree() (the one gate every kit motion scene passes) with a «Tin trong cung» card waiting and DQ.newsHold set:
     buổi 0 (morning of the new day) → held (unchanged rule) · buổi 1, 2, 3 → free (the night flip / any later scene plays).
   usage: node dev/test/news-hold.js [index.html|URL]   exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const G=process.argv[2]||path.join(__dirname,'../../index.html');const URL=/^https?:/.test(G)?G:'file://'+path.resolve(G);
 const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();
 await p.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm|wav)(\?|$)/i,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function'&&typeof kmFree==='function'&&window.DQ,null,{timeout:180000});await p.waitForTimeout(2500);
 const R=await p.evaluate(async()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}catch(e){}
  for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}await new Promise(r=>setTimeout(r,2500));
  document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,.kmov,#kmrew').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render();
  const out=[];for(const bu of [0,1,2,3]){S.buoi=bu;Q.length=0;Q.push({t:'Tin trong cung buổi này',kind:'news',h:'<p>x</p>'});DQ.newsHold=1;
   await new Promise(r=>setTimeout(r,50));/* a tap's own one-pump wait (DQ.kmTap) is not part of this gate */
   out.push({buoi:bu,free:kmFree(),hold:DQ.newsHold})}Q.length=0;return out});
 let f=0;console.log('| buổi | kmFree with a «Tin trong cung» card waiting + newsHold | want |');console.log('|---|---|---|');
 for(const r of R){const want=r.buoi===0?false:true;const ok=r.free===want;if(!ok)f++;console.log(`| ${r.buoi} | ${r.free?'free (scene plays)':'held'} | ${want?'free':'held'} ${ok?'':'← FAIL'} |`)}
 console.log(f?`NEWS-HOLD FAIL ${f}/4`:'NEWS-HOLD PASS 4/4');await b.close();process.exit(f?1:0)})();
