/* KIT 45.4: the sticky pane bar (.kpbar) must never draw over an open pop-up (#modal). For every pane tab: open a kit pop-up, take the points of the pane bar's rectangle
   (corners-in + centre) and check document.elementFromPoint belongs to #modal (the dim layer or the dialog), never to the bar. usage: node dev/test/kpbar-modal.js <url> [WxH,...] [outdir] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SIZES,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||"755x1000,1000x755,1180x820,1366x1024,844x390").split(",")){const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click());document.querySelectorAll(".kroul,#kmrew,#kload").forEach(e=>e.remove())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitModal==='function');await sleep(2500);await p.addStyleTag({content:'.kroul,.kmov{display:none!important}'});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;document.getElementById('modal').hidden=true;
   document.getElementById('modal').hidden=true;render()});
  await sleep(1200);
  for(const t of ['act','rv','court','staff','art','kid','men','log']){
   await p.evaluate(t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{S.out=0;K3SH.home=false}catch(e){}render();try{k3Shell()}catch(e){}},t);await sleep(900);
   /* pane scrolled down (the bar is stuck at the top: its sticky state) */
   await p.evaluate(()=>{const P=document.getElementById('panel');P.scrollTop=P.scrollHeight;document.querySelectorAll('#panel *').forEach(e=>{if(e.scrollHeight>e.clientHeight+20&&/auto|scroll/.test(getComputedStyle(e).overflowY))e.scrollTop=e.scrollHeight})});await sleep(200);
   const KINDS={info:()=>kitModal({kind:"info",title:"Điều thử",sub:"Bảng trên cùng không được che",facts:["Một câu để thử khung."]}),
    pcm:()=>{Q.unshift({t:"Thẻ người",cls:"pcm",h:"<p>Thẻ người thử.</p>"});showModal()},
    choice:()=>{Q.push({t:"Việc khó",h:"<p>Chọn.</p>",opts:[{n:"Một",fx:{}},{n:"Hai",fx:{}}]});showModal()},
    notice:()=>{Q.push({t:"Một báo",h:"<p>Ngắn.</p>"});showModal()}};
   const kind=process.env.KIND||'info';await p.evaluate(`(${KINDS[kind].toString()})()`);await sleep(500);
   const r=await p.evaluate(()=>{const bar=document.querySelector('#panel.kpane>.kpbar');if(!bar||!bar.offsetParent)return{nobar:1};const q=bar.getBoundingClientRect();const M=document.getElementById('modal');
    const pts=[[.1,.5],[.5,.5],[.9,.5],[.5,.2],[.5,.8]].map(([a,c])=>[q.left+q.width*a,q.top+q.height*c]).filter(([x,y])=>x>=0&&y>=0&&x<innerWidth&&y<innerHeight);
    const over=pts.filter(([x,y])=>{const e=document.elementFromPoint(x,y);return !(e&&M.contains(e))}).length;const f=pts.map(([x,y])=>document.elementFromPoint(x,y)).find(e=>!(e&&M.contains(e)));return{pts:pts.length,over,first:f&&(f.id||(f.className+'').slice(0,40)),mh:M.hidden}});
   const ok=r.nobar||r.over===0;if(!ok)bad++;console.log(wh,t.padEnd(6),ok?'PASS':'FAIL',JSON.stringify(r));
   if(OUT&&t==='art')await p.screenshot({path:`${OUT}/${wh}-kpbar-modal.png`});
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true})}
  if(errs.length){bad++;console.log(wh,'PAGE ERRORS',errs)}
  await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
