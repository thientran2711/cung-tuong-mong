/* mood-seal scan (owner 21/11 mark #39): every Tâm trạng · X dialog (queen, cause cases, unknown, me, emperor, Thái hậu, rival) shows the cause picture AND the mood seal in its corner, inside the picture, dialog fits.
   usage: node dev/test/mood-seal-scan.js <build url> <outdir> 755x1000,1180x820  → one line per case + shots <outdir>/<WxH>-<case>.jpg (title overlay may hide a shot: read the printed mark/markIn fields) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const CASES=[["nocause-queen","binh",""],["tanphong","lo","Khương Lạc Anh được tấn phong"],["thitam","ghen","Lý Thanh Hà được thị tẩm"],["evrec","buon","Có người đến: Nhịn, chịu thiệt","img/ev-tranh-sung.webp"],["unknown","an",""],["me","binh",""],["emp","gian","bị phạt vì cãi lời"],["th","binh",""],["rival2","vui","được tặng quà"],["servant","binh",""]];
(async()=>{const b=await chromium.launch();const R={};
for(const sz of SIZES.split(",")){const [W,H]=sz.split("x").map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);await p.addStyleTag({content:'#kroul{display:none!important}'});
await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
await p.waitForFunction(()=>typeof S!=='undefined'&&S&&typeof rivals!=='undefined'&&rivals&&rivals.length>1);
await p.evaluate(()=>{window.kitKnown=()=>true;const k=document.getElementById('kload');if(k)k.remove();Q.length=0;document.getElementById('modal').hidden=true;document.getElementById('title').hidden=true;render()});await sleep(1500);
const res={};
for(const [nm,k,why,rec] of CASES){
 const r=await p.evaluate(([nm,k,why,rec])=>{Q.length=0;document.getElementById('modal').hidden=true;document.getElementById('title').hidden=true;const R0=liveRivals(true);let v=R0.find(x=>x.queen)||R0[0];if(nm==="rival2")v=R0.find(x=>x!==v)||v;let key=emoKey(v);
  if(nm==="me")key="me";if(nm==="emp")key="emp";if(nm==="th")key="th";if(nm==="servant"){const sv=(typeof S.ser!=="undefined"&&S.ser&&S.ser[0])||null;if(sv)key=emoKey(sv)}
  const p0=emoByKey(key);if(!p0)return{skip:"no person"};S.met=S.met||{};S.met[v.id]=1;try{kn()}catch(e){}S.emoSeen=S.emoSeen||{};
  if(k==="an"){S.emoSeen[emoKey(v)]=-99;v.emoH=[];window.kitKnown=()=>true;emoBox(key);return{key}}
  S.emoSeen[key]=emoW();if(p0.emoH!==undefined||p0!==S){p0.emoH=[];p0.emo={k:"binh",v:0,w:emoW()}}
  if(k!=="binh"){if(rec){p0.emoH=[{k,v:60,why,w:emoW(),a:rec}];p0.emo={k,v:60,why,w:emoW()}}else emoSet(p0,k,60,why)}
  emoBox(key);return{key}},[nm,k,why,rec||""]);
 if(r.skip){res[nm]=r;continue}
 await sleep(1000);await p.evaluate(()=>{document.getElementById('title').hidden=true;return Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)})))});await sleep(700);
 const m=await p.evaluate(()=>{const M=document.getElementById('modal');const t=(M.querySelector('.kph h2,.kpt,h2')||{}).textContent||"";const pics=[...M.querySelectorAll('.k3ev,.k3mpic,.kdlgart')];const pic=pics.find(x=>x.querySelector('img[src*="ev-"],img[src*="img/"]'));const mk=pic&&pic.querySelector('.ksart-mark');const im=pic&&pic.querySelector('img:not(.ksart-mark)');
  const B=pic&&pic.getBoundingClientRect(),K=mk&&mk.getBoundingClientRect();const D=M.querySelector('.dlg');const DR=D&&D.getBoundingClientRect();
  return{open:!M.hidden,title:t.slice(0,50),pic:im?im.getAttribute('src').replace(/^.*\//,''):'',mark:mk?((mk.tagName==='IMG'?mk.getAttribute('src'):getComputedStyle(mk).backgroundImage).match(/emo-[\w-]+/)||[''])[0]:'',markPx:K?Math.round(K.width):0,markIn:!!(K&&B&&K.left>=B.left-1&&K.right<=B.right+1&&K.top>=B.top-1&&K.bottom<=B.bottom+1),fits:!!(DR&&DR.top>=-1&&DR.bottom<=innerHeight+1&&DR.left>=-1&&DR.right<=innerWidth+1)}});
 res[nm]=Object.assign(r,m);await p.screenshot({path:`${OUT}/${sz}-${nm}.jpg`,type:'jpeg',quality:55})}
R[sz]={res,errs};await ctx.close()}
for(const [sz,o] of Object.entries(R)){console.log(sz,o.errs.join('|'));for(const [n,v] of Object.entries(o.res))console.log(' ',n.padEnd(13),JSON.stringify(v))}
await b.close()})();
