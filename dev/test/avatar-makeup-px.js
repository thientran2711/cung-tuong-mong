/* review/smudge-code r16 (main s42): does an AVATAR frame change when herself wears makeup? Pixel diff of every avatar-class frame (top bar, side cards) on/on/off.
   usage: node dev/test/avatar-makeup-px.js <url> <outdir>   -> <outdir>/av-<k>-<on|on2|off>.png + JSON {frames:[{k,rect,diffOnOn2,diffOnOff}]} (diff = share of pixels whose RGB differs by > 12). */
const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;const fs=require('fs');fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(60000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(4000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:40000}).catch(()=>{});
 const clean=()=>p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const M=document.getElementById('modal');if(M){M.hidden=true;M.innerHTML=''}document.querySelectorAll('.kmov,.kroul,.kpscene,#kload').forEach(e=>e.remove())});
 const setMk=on=>p.evaluate(on=>{const c=toilColFix(null);c.seed=5;S.toilette={day:toilWk()*10,wk:toilWk(),score:70,makeup:!!on,style:'fit',dv:'chinh',F:0,occ:[],look:'dep',col:c};for(const q in TOIL_MKC){Reflect.deleteProperty(TOIL_MKC,q)}render()},on);
 await clean();await p.waitForTimeout(1500);
 /* frames = the avatar boxes: herself in the top bar + every span.md frame (herself's own portrait is the first) */
 const rects=await p.evaluate(()=>[...document.querySelectorAll('span.md,.pcp,.kmini,.kfc')].map(e=>{const r=e.getBoundingClientRect();return{x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),cls:e.className.toString().slice(0,30)}}).filter(r=>r.w>8&&r.h>8&&r.y>=0&&r.y+r.h<=1000).slice(0,8));
 const shots={};
 for(const [tag,on] of [['on',true],['on2',true],['off',false]]){await setMk(on);await clean();await p.waitForTimeout(2500);shots[tag]=[];for(let i=0;i<rects.length;i++){const r=rects[i];const f=`${OUT}/av-${i}-${tag}.png`;await p.screenshot({path:f,clip:{x:r.x,y:r.y,width:r.w,height:r.h}});shots[tag].push(f)}}
 const out={errs,frames:rects.map((r,i)=>({k:i,...r,files:[shots.on[i],shots.on2[i],shots.off[i]]}))};
 console.log(JSON.stringify(out));await b.close()})();
