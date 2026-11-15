/* j83 works: every kind chosen in "làm ra tác phẩm gì?" plays ITS OWN game (owner bug: cắm hoa opened the painting game), the material cards
   show the tier at 5 phần + the play score each tier needs, and the dialog has a ✕ close, no "Thôi".
   usage: node dev/test/wk-kind-game.js <url> <W>x<H>@<dpr> <outdir>   (prints JSON; screenshots of each dialog + game) */
const {chromium}=require('playwright');const [,,BASE,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const WANT={tranh:"ve",theu:"theu",bhoa:"hoa",tho:"tho",kinh:"kinh",khuc:"dan",the:"co",mua:"mua",ao:"may",mon:"banh",huong:"huong"};
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+DPR,ignoreHTTPSErrors:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setInterval(()=>{const r=document.getElementById('kroul');if(r)r.remove()},200);
  const p0=kg82Play;kg82Play=function(kind){window.__kind=kind;return p0.apply(this,arguments)}});
 await p.waitForTimeout(600);
 for(let i=0;i<5&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&!!S.arts));i++){await p.evaluate(()=>{try{start()}catch(e){}});await p.waitForTimeout(1500)}
 await p.waitForTimeout(3000);await p.evaluate(()=>{['title','kroul'].forEach(i=>{const e=document.getElementById(i);if(e)e.hidden=true});document.querySelectorAll('.kluan,#luan,#kreborn').forEach(e=>e.remove())});
 const out={};
 for(const kind of (process.env.ONLY?process.env.ONLY.split(","):Object.keys(WANT))){
  const r=await p.evaluate(kind=>{Q.length=0;showModal();S.mg=null;wkPend=null;const a=WK[kind].a;S.arts[a]=1;S.suc=100;S.bac=200;S.khac=0;used=0;if(typeof S.buoi!=="undefined")S.buoi=0;window.__kind=null;
   lessonMode(a,"self");const m=Q[0];if(!m)return{err:"no dialog",dead:!!S.dead,mg:!!S.mg,used};
   const opts=[...document.querySelectorAll("#modal .opts button")].map(x=>x.textContent.replace(/\s+/g," ").trim());
   return{t:m.t,xc:!!document.getElementById("mxc"),thoi:opts.some(o=>/^Thôi/.test(o)),opts:opts.filter(o=>o.startsWith(WK[kind].w))}},kind);
  if(r.err){out[kind]=r;continue}
  await p.locator('#modal .dlg').screenshot({path:`${OUT}/ask-${kind}-${SZ}.jpg`,type:'jpeg',quality:80}).catch(()=>{});
  await p.evaluate(kind=>{const B=[...document.querySelectorAll("#modal .opts button")];const i=B.findIndex(x=>x.textContent.trim().startsWith(WK[kind].w));if(i>=0)B[i].click()},kind);
  await p.waitForTimeout(400);
  const lbl=await p.evaluate(()=>{const d=document.getElementById("kg82");return d?d.textContent.replace(/\s+/g," ").trim().slice(0,90):null});
  await p.evaluate(()=>{const g=document.getElementById("kg82go");if(g)g.click()});await p.waitForTimeout(1200);
  await p.locator('#kg82').screenshot({path:`${OUT}/game-${kind}-${SZ}.jpg`,type:'jpeg',quality:80}).catch(()=>{});
  const k=await p.evaluate(()=>window.__kind);
  await p.evaluate(()=>{try{kg82Close()}catch(e){}S.mg=null;Q.length=0;showModal()});
  out[kind]={game:k,ok:k===WANT[kind],title:r.t,xc:r.xc,thoi:r.thoi,opts:r.opts,label:lbl};
 }
 /* ✕ closes the dialog without spending */
 const x=await p.evaluate(()=>{Q.length=0;showModal();S.mg=null;wkPend=null;S.bac=50;S.suc=100;S.khac=0;used=0;S.arts.thi=1;const b0=S.bac;lessonMode("thi","self");const had=!!document.getElementById("mxc");if(!had)return{had,q:Q.length,t:Q[0]&&Q[0].t};document.getElementById("mxc").click();
  return{had,closed:document.getElementById("modal").hidden&&!Q.length,bac:S.bac===b0,mg:!S.mg}});
 console.log(JSON.stringify({size:SZ,out,close:x,errors:errs},null,1));await b.close()})();
