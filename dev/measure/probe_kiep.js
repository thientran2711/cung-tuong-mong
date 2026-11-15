// usage: GAME=<build with meta charset> node dev/measure/probe_kiep.js
// "early suicide never pays off": for each origin, start a life, give it some Phúc duyên earned this life, die in month 1-3 (before trọn kiếp)
// and compare Phúc duyên before the life / after the death, and whether the next life's origin is locked.
const {chromium}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
 await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+GAME);await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 const out=[];
 for(const o of ['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'])for(const base of [0,100]){
  const r=await page.evaluate(([o,base])=>{try{localStorage.removeItem("ctm-nextlife");pdSet(base);window.__forceOrigin=o;Q.length=0;start();Q.length=0;
    const b0=pdGet();pdSet(b0+12);S.pdLife=(S.pdLife||0)+12;S.turn=2;const tr=kpCheck();die("Tự vẫn");const after=pdGet();
    return{o,base:b0,earned:12,after,net:after-b0,tron:tr,locked:kpLocked()}}catch(e){return{o,err:String(e).slice(0,150)}}},[o,base]);
  out.push(r)}
 for(const r of out)console.log(JSON.stringify(r));console.log('pageerrors',JSON.stringify(errs.slice(0,5)));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
