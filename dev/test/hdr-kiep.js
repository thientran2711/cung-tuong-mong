/* hdr-kiep: top-left header shows the life number in words (owner 23/11). usage: node dev/test/hdr-kiep.js <page url> <outdir>
   life 1/2/3/10/11 -> «Kiếp thứ nhất/hai/ba/mười/11»; header has no overflow/clip at Fold 755x1000 and iPad 1180x820; shots go to <outdir> (never git). */
const {chromium}=require('./lib/pw-roulette');
const [,,URL,OUT]=process.argv;const fs=require('fs');fs.mkdirSync(OUT,{recursive:true});
const WANT={1:'Kiếp thứ nhất',2:'Kiếp thứ hai',3:'Kiếp thứ ba',10:'Kiếp thứ mười',11:'Kiếp thứ 11'};
(async()=>{const b=await chromium.launch();const R={pass:true,sizes:{}};
 for(const [W,H] of [[755,1000],[1180,820]]){
  const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'})).newPage();
  p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;document.getElementById('modal').hidden=true;try{NLP=null}catch(e){}render()});
  const out={};
  for(const n of [1,2,3,10,11]){
   out[n]=await p.evaluate(n=>{store.set('cung-luanhoi',Array.from({length:n-1},(_,i)=>({n:'x'+i,o:'',r:'',age:20,y:1,kids:0,fc:'',f:'',foes:[]})));renderHUD();
    const k=document.getElementById('me-k'),hd=document.querySelector('header.hud');
    const hb=hd.getBoundingClientRect(),kb=k.getBoundingClientRect();
    return{txt:k.textContent,hidden:k.hidden,inHdr:kb.right<=hb.right+0.5&&kb.left>=hb.left-0.5,hdrOverflowX:hd.scrollWidth>hd.clientWidth+1,docOverflowX:document.documentElement.scrollWidth>innerWidth+1,sameRow:Math.abs(kb.top-document.getElementById('me-a').getBoundingClientRect().top)<4,h:Math.round(hb.height)}},n);
   const ok=out[n].txt===WANT[n]&&!out[n].hidden&&out[n].inHdr&&!out[n].hdrOverflowX&&!out[n].docOverflowX;out[n].pass=ok;if(!ok)R.pass=false;
   if(n===1||n===3||n===11){await p.addStyleTag({content:'#modal,#title,#kload,#klife,#kmrew,#curtain,.kptitle{display:none!important}'});await p.evaluate(()=>{Q.length=0;document.body.classList.remove('kdlg-on')});await p.waitForTimeout(400);await p.screenshot({path:`${OUT}/hdr-kiep-${W}x${H}-life${n}.png`})}}
  R.sizes[`${W}x${H}`]={out,errs};if(errs.length)R.pass=false;await p.context().close()}
 console.log(JSON.stringify(R,null,1));await b.close();process.exit(R.pass?0:1)})();
