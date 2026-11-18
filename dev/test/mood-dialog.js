/* review/mood-dialog (owner 15/11 "ảnh khung tâm trạng là hiện sự việc liên quan, nhưng là tấn phong kìa"): the Tâm trạng · X box shows the
   picture of the EVENT that caused the mood (tấn phong → ev-tan-phong), the mood seal in a corner (kitSceneArt o.mark, KIT 28.19b), and the
   look-up panels (Đã biết về X, Chứng cứ về X) never get the "Có người đến chơi" visitor default.
   usage: node dev/test/mood-dialog.js <build url> <outdir> [WxH@dpr,...]   → JSON per size + shots <outdir>/<WxH>-<case>.jpg */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const CASES=[["tanphong","lo","Khương Lạc Anh được tấn phong"],["matcon","dau","mất con"],["thitam","ghen","Lý Thanh Hà được thị tẩm"],["nocause","binh",""],
 ["evrec","buon","Có người đến: Nhịn, chịu thiệt","img/ev-tranh-sung.webp"],["unknown","an",""],["intel","",""],["men","gian","bị phạt vì cãi lời"]];
(async()=>{const b=await chromium.launch();const R={};
 for(const sz of (SIZES||"755x1000@1,1000x755@1,1180x820@1,1366x1024@1,844x390@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}
   });await p.waitForFunction(()=>typeof S!=='undefined'&&S&&typeof rivals!=='undefined'&&rivals&&rivals.length>0,null,{timeout:60000});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(1500);
  for(const [nm,k,why,rec] of CASES){
   const r=await p.evaluate(([nm,k,why,rec])=>{Q.length=0;document.getElementById('modal').hidden=true;const R0=liveRivals(true);const v=R0.find(x=>x.queen)||R0[0];
    S.met=S.met||{};S.met[v.id]=1;try{kn()}catch(e){}S.emoSeen=S.emoSeen||{};
    if(nm==="intel"){kitIntelPanel(v);return{v:v.name}}
    if(nm==="men"){const e=S.emp;emoSet(e,k,70,why);emoBox("emp");return{v:"emp"}}
    if(k==="an"){S.emoSeen[emoKey(v)]=-99;tmPlace(S,0);v.emoH=[];emoBox(emoKey(v));return{v:v.name,known:window.kitEmotion(v).known}}
    S.emoSeen[emoKey(v)]=emoW();v.emoH=[];v.emo={k:"binh",v:0,w:emoW()};
    if(k!=="binh"){if(rec){v.emoH=[{k,v:60,why,w:emoW(),a:rec}];v.emo={k,v:60,why,w:emoW()}}else emoSet(v,k,60,why)}
    emoBox(emoKey(v));return{v:v.name}},[nm,k,why,rec||""]);
   await sleep(900);await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(500);
   const m=await p.evaluate(()=>{const M=document.getElementById('modal');const band=M.querySelector('.kdlgart .ksart');const im=band&&band.querySelector(':scope>img:not(.ksart-mark)');const mk=band&&band.querySelector('.ksart-mark');const mkSrc=mk?(getComputedStyle(mk).backgroundImage.match(/url\("?([^")]+)/)||[])[1]||'':'';
    const dl=M.querySelector('.dlg');const D=dl&&dl.getBoundingClientRect();const B=band&&band.getBoundingClientRect(),K=mk&&mk.getBoundingClientRect();
    return{open:!M.hidden,title:(M.querySelector('.kph h2,.kpt,h2')||{}).textContent,pic:im?im.getAttribute('src').replace(/^.*\//,''):'',loaded:im?im.naturalWidth>0:false,
     cap:band?[...band.querySelectorAll('figcaption,.ksart-chip')].map(x=>x.textContent).join('|'):'',mark:mkSrc.replace(/^.*\//,''),markSrc:mkSrc,
     markIn:!!(K&&B&&K.right<=B.right+1&&K.top>=B.top-1&&K.right>B.right-K.width-12&&K.top<B.top+12),markPx:K?Math.round(K.width):0,
     dlgFits:!!(D&&D.top>=-1&&D.bottom<=innerHeight+1&&D.left>=-1&&D.right<=innerWidth+1),hscroll:document.documentElement.scrollWidth>innerWidth+1}});
   if(m.markSrc)m.markLoaded=await p.evaluate(u=>new Promise(r=>{const i=new Image();i.onload=()=>r(i.naturalWidth>0);i.onerror=()=>r(false);i.src=u}),m.markSrc);delete m.markSrc;
   res[nm]=Object.assign(r,m);await p.screenshot({path:`${OUT}/${wh}-${nm}.jpg`,type:'jpeg',quality:60})}
  R[wh]={res,errs};await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})();
