/* buoi-art moon: tối band shows the phase sprite by tuần (0 crescent, 1 full, 2 halfL); moon-band festivals show none and hide the orb moon; other buổi untouched. usage: node dev/test/buoi-moon.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const FX=path.resolve(__dirname,'../../img/fx');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let fail=0;
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){const c=await b.newContext({serviceWorkers:'block',viewport:{width:W,height:H},deviceScaleFactor:1});const p=await c.newPage();const errs=[];
  await p.route(/img\/fx\/buoi-.*\.webp/,r=>{const f=path.join(FX,r.request().url().split('/').pop().split('?')[0]);fs.existsSync(f)?r.fulfill({body:fs.readFileSync(f),contentType:'image/webp'}):r.fulfill({status:404,body:''})});
  p.on('pageerror',e=>errs.push(e.message));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof buoiShift==='function'&&typeof start==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;OPT.fxon=true;OPT.fxpick=1});await sleep(3000);
  const cases=[[{sea:'xuan',tuan:0},3,'crescent'],[{sea:'xuan',tuan:1},3,'full'],[{sea:'xuan',tuan:2},3,'halfL'],[{sea:'thu',tuan:2},3,'halfL'],[{sea:'xuan',tuan:0},1,''],[{sea:'xuan',fest:'trungthu',tuan:1},3,'NONE'],[{sea:'xuan',fest:'nguyentieu',tuan:1},3,'NONE'],[{sea:'xuan',fest:'vulan',tuan:1},3,'NONE'],[{sea:'xuan',fest:'giaothua',tuan:2},3,'NONE'],[{sea:'xuan',fest:'thattich',tuan:0},3,'crescent']];
  for(const [v,bb,want] of cases){
   const o=await p.evaluate(async([v,bb])=>{['kroul','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('body > *').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&+s.zIndex>100&&e.id!=='buoitr')e.remove()});document.querySelectorAll('#buoitr').forEach(e=>e.remove());
     window.__btrVar=v;window.__btrHold=1;S.buoi=bb;curtain();await new Promise(r=>setTimeout(r,500));const e=document.getElementById('buoitr');if(!e)return null;e.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=a.effect.getTiming().duration*.8});
     const m=e.querySelector('.btr-moon');return{ph:(m.style.backgroundImage.match(/buoi-moon-(\w+)\.webp/)||[])[1]||'',none:getComputedStyle(m).display==='none'}},[v,bb]);
   await sleep(600);const got=!o?'NOOVERLAY':o.none?'NONE':o.ph;if(got!==want){fail++;console.log('FAIL',tag,JSON.stringify(v),bb,'want',want,'got',got)}
   if(bb===3&&!v.fest&&v.sea==='xuan')await p.screenshot({path:`${OUT}/${tag}-t${v.tuan}.jpg`,type:'jpeg',quality:60});
   await p.evaluate(()=>{window.__btrHold=0;const e=document.getElementById('buoitr');if(e)e.remove()})}
  if(errs.length){fail++;console.log(tag,errs)}await c.close()}
 console.log('FAIL',fail);await b.close();process.exit(fail?1:0)})();
