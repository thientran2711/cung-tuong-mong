/* KIT 26.1 podium plaque test (kit-keeper-1): the plaque IS the step, medal at the plaque's top-right, "Ta" tag at its top-left,
   figures the biggest thing (one KIT_FIG scale), optional entry fields fig / face / nameH / you (Bảng vàng, jrank).
   usage: node dev/test/podium-plaque.js <build url> <outdir> [WxH@dpr,...]
   Checks per viewport and scene: no page error, no horizontal overflow, plaques inside the screen and above the footer, Nhất plaque highest,
   medal centre right of the plaque centre and above its top edge, "Ta" tag left half, figure taller than 2 x its plaque, nameH shown verbatim. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||'1180x820@2,755x1000@2,844x390@1,1000x755@1,1366x1024@1').split(',')){const [wh,dpr]=sz.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});await ctx.addInitScript(()=>{window.__bot=1});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitPodiumShow==='function');
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true});
  await p.waitForFunction(()=>{const R=liveRivals(true);return R.length>=3&&R.slice(0,3).every(v=>kitFigOf(v))&&kitFigOf(S)},null,{timeout:60000}).catch(()=>{});
  for(const scene of ['contest','board']){
   const info=await p.evaluate(async scene=>{const sl=t=>new Promise(r=>setTimeout(r,t));const R=liveRivals(true).slice(0,3);
    let list;if(scene==='contest')list=[{who:R[0],place:1,score:87,prize:[["Sủng",8],["Danh",3]]},{who:S,place:2,score:83,prize:[["Danh",2]]},{who:R[1],place:3,score:78,prize:[["Danh",1]]},{who:R[2],place:4,score:60}];
    else list=[1,2,3].map(i=>({who:{name:'P'+i},place:i,fig:i===2?"":kitFigOf(R[i-1]),face:i===2?kitPortrait(R[1],{size:"lg"}):undefined,mine:i===1,you:i===1?'Ta':undefined,
     nameH:`<b class="kname" style="--rc:#8a5a12">Tên hiệu ${i}</b>`,sub:'Quý phi Liễu Ngưng Sương',score:'Công danh '+(900-i*100)}));
    kitPodiumShow(list,{title:scene==='contest'?'Hội Thượng nguyên':'Bảng vàng',sub:'Thi tài'});const root=document.querySelector('.kpod');
    root.classList.add('kpod-skip');await sl(900);await Promise.all([...root.querySelectorAll('img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)})));kpodFit(root);await sl(300);
    const ft=root.querySelector('.kpod-ft').getBoundingClientRect();const out=[];
    const cols=[...root.querySelectorAll('.kpod-col')].map(c=>{const s=c.querySelector('.kpod-step').getBoundingClientRect(),m=c.querySelector('.kpod-medal').getBoundingClientRect(),f=c.querySelector('.kpod-fig').getBoundingClientRect();
     const im=c.querySelector('.kpod-img'),ir=im&&im.offsetParent?im.getBoundingClientRect():null;const y=c.querySelector('.kpod-you'),yr=y&&y.getBoundingClientRect();
     return{pl:c.className.match(/kpod-p(\d)/)[1],stepTop:Math.round(s.top),stepH:Math.round(s.height),medalRight:m.left+m.width/2>s.left+s.width/2,medalUp:m.top<s.top,
      figH:Math.round(ir?ir.height:f.height),you:yr?(yr.left+yr.width/2<s.left+s.width/2):null,inScreen:s.left>=-1&&s.right<=innerWidth+1&&s.bottom<=ft.top+2}});
    const p1=cols.find(c=>c.pl==='1');cols.forEach(c=>{if(!c.medalRight||!c.medalUp)out.push('medal '+c.pl);if(!c.inScreen)out.push('plaque out '+c.pl);if(c.pl!=='1'&&c.stepTop<=p1.stepTop)out.push('order '+c.pl);
     if(c.figH<2*c.stepH)out.push('figure small '+c.pl+' '+c.figH+'/'+c.stepH);if(c.you===false)out.push('Ta tag not left '+c.pl)});
    if(scene==='board'&&!/Tên hiệu 1/.test(root.innerText))out.push('nameH missing');if(document.documentElement.scrollWidth>innerWidth+1)out.push('h-overflow');if(/\bfalse\b|undefined/.test(root.innerText))out.push('false/undefined text');if(scene==='contest'&&root.querySelectorAll('.kpod-nofig').length)out.push('figure missing');
    return{scene,cols,out}},scene);
   if(info.out.length)bad++;console.log(sz,JSON.stringify(info));await p.screenshot({path:`${OUT}/${wh}-${scene}.jpg`,type:'jpeg',quality:72});
   await p.evaluate(()=>kitPodiumClose(true))}
  if(errs.length){bad++;console.log(' PAGE ERRORS',errs.slice(0,4))}await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'PASS');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
