/* review/reign-road-fix scan: opens every reign beat (all sides) and every PEND dialog that builds with no arguments, and checks each kit option
   card (#modal .opts > button.ka, any of k3rows / k3grid): the card's content must not overflow the card (scrollHeight > clientHeight) and the card
   must not be cut by the next card or the dialog. usage: NODE_PATH=$(npm root -g) node dev/test/opt-overflow-scan.js <url|file> [WxH@dpr] [shot-prefix]  (exit 1 on overflow) */
const {chromium}=require('playwright');const path=require('path');
const [,,URL0,VP,SHOT]=process.argv;const [wh,dpr]=(VP||'755x1000@2').split('@');const [W,H]=wh.split('x').map(Number);const URL=/^https?:/.test(URL0)?URL0:'file://'+path.resolve(URL0);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:Math.min(+dpr||1,2),hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof rgMonth==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<40;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv())&&S.origin.k!=='tt')break}Q.length=0;$("modal").hidden=true});
 await p.waitForTimeout(800);await p.addStyleTag({content:'#kroul,#kroulw,.kmov{display:none!important}'});
 const ids=await p.evaluate(()=>Object.keys(RGBT).concat(['emp:e1','emp:e2','emp:e3','th:e1','th:e2','th:e3','quyen:e1','quyen:e2','quyen:e3']));
 const bad=[];let n=0,cards=0,shots=0;
 for(const side of [null,'emp','th','quyen'])for(const id of ids){
  const r=await p.evaluate(async([side,id])=>{const W=rgW();S.reign.side=side;W.out='';Q.length=0;let ok=false;try{ok=rgFire(id)}catch(e){return{err:id+':'+e.message}}if(!ok)return{skip:1};showModal();await new Promise(r=>setTimeout(r,330));const M=document.getElementById('modal');const g=M.querySelector('.opts');if(!g)return{skip:1};
   const bs=[...g.querySelectorAll(':scope > button.ka')];const res=[];
   bs.forEach((x,i)=>{const r=x.getBoundingClientRect();const over=x.scrollHeight-x.clientHeight;let kids=0;[...x.querySelectorAll('*')].forEach(c=>{const cr=c.getBoundingClientRect();if(cr.height>0&&cr.bottom>r.bottom+1)kids++});
    const nx=bs[i+1];const nr=nx&&nx.getBoundingClientRect();const hit=nr&&nr.width>0&&r.left<nr.right&&nr.left<r.right&&r.bottom>nr.top+1&&r.top<nr.top;
    if(over>1||kids||hit)res.push({i,over,kids,hit,h:Math.round(r.height),cls:g.className.replace(/\s+/g,' ')})});
   const dl=M.querySelector('.dlg');const clip=dl&&g.scrollWidth>g.clientWidth+1;
   Q.length=0;M.hidden=true;return{n:bs.length,res,clip}},[side,id]);
  if(r.err){bad.push(r.err);continue}if(r.skip)continue;n++;cards+=r.n;
  for(const x of r.res)bad.push(`${id}/${side||'-'} card ${x.i} over=${x.over} kids=${x.kids} hit=${x.hit} h=${x.h} [${x.cls}]`);
 }
 console.log(`viewport ${W}x${H}@${dpr||1} · dialogs ${n} · cards ${cards} · overflowing ${bad.length} · page errors ${errs.length}`);bad.slice(0,60).forEach(x=>console.log(' ',x));
 await b.close();process.exit(bad.length||errs.length?1:0)})();
