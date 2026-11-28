/* buoi-art: every season + festival band skin and the 4 buổi icons are wired (BTR_ART/BTR_ICON), served, painted, 0 page errors.
   usage: node dev/test/buoi-art.js http://localhost:<port>/index.html <outdir> */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const FX=path.resolve(__dirname,'../../img/fx');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const SEA=['xuan','ha','thu','dong'],FST=['newyear','nguyentieu','thanhminh','doanngo','phoenix','thattich','trungthu','trungcuu','dongchi','giaothua','vulan','vantho','lapbat'];
(async()=>{const b=await chromium.launch();let fail=0;const R={};
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){const c=await b.newContext({serviceWorkers:'block',viewport:{width:W,height:H},deviceScaleFactor:1});const p=await c.newPage();const errs=[];
  await p.route(/img\/fx\/buoi-.*\.webp/,r=>{const f=path.join(FX,r.request().url().split('/').pop().split('?')[0]);fs.existsSync(f)?r.fulfill({body:fs.readFileSync(f),contentType:'image/webp'}):r.fulfill({status:404,body:''})});
  p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof buoiShift==='function'&&typeof start==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;OPT.fxon=true;OPT.fxpick=1});await sleep(3000);
  const list=[...SEA.map(s=>({sea:s})),...FST.map(f=>({sea:'xuan',fest:f}))];
  for(const [i,v] of list.entries()){for(const bb of (i<4||i%3==0?[0,1,2,3]:[2])){
   const o=await p.evaluate(async([v,bb])=>{['kroul','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov').forEach(e=>e.remove());document.querySelectorAll('body > *').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&+s.zIndex>100&&e.id!=='buoitr')e.remove()});document.querySelectorAll('#buoitr').forEach(e=>e.remove());window.__btrVar=v;window.__btrHold=1;S.buoi=bb;curtain();await new Promise(r=>setTimeout(r,500));const e=document.getElementById('buoitr');if(!e)return null;
     e.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=a.effect.getTiming().duration*.45});
     const sk=e.querySelector('.btr-skin'),ic=e.querySelector('.btr-ico');return {skin:sk?sk.style.backgroundImage.split('/').pop().replace(/["')]/g,''):'',ico:ic?ic.style.backgroundImage.split('/').pop().replace(/["')]/g,''):'',title:e.querySelector('.btr-sub')?.textContent||''}},[v,bb]);
   await sleep(500);
   const key=v.fest||v.sea,want=`buoi-band-${key}.webp`;const ok=o&&o.skin===want&&o.ico===`buoi-ico-${bb}.webp`;if(!ok){fail++;console.log('FAIL',tag,key,bb,JSON.stringify(o))}
   if(tag==='fold'&&(key==='xuan'&&bb===0||key==='giaothua'&&bb===3||key==='vulan'&&bb===3||key==='dong'&&bb===0||key==='doanngo'&&bb===1))await p.screenshot({path:`${OUT}/${tag}-${key}-b${bb}.jpg`,type:'jpeg',quality:60});
   if(tag==='ipad'&&key==='newyear'&&bb===0)await p.screenshot({path:`${OUT}/${tag}-${key}-b${bb}.jpg`,type:'jpeg',quality:60});
   await p.evaluate(()=>{window.__btrHold=0;const e=document.getElementById('buoitr');if(e)e.remove()})}}
  R[tag]={errs};if(errs.length)fail++;await c.close()}
 console.log(JSON.stringify(R),'FAIL',fail);await b.close();process.exit(fail?1:0)})();
