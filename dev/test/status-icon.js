/* KIT §77.1 kitStatusIcon test (review/status-icons, owner 16/11 16:25Z): the background download is ONE small square icon in the stage rail (no chip,
   no strip under the tab bar): idle (nothing), downloading (busy animation, transform/opacity only), paused (badge), done (still, then gone), tap → kit info
   panel (✕ / Esc / outside close, no "Đã hiểu"), the game frame keeps its full height (no reserved band), icon inside the stage and over no face.
   usage: node dev/test/status-icon.js <url> <outdir> [WxH,...]  → JSON per size + shots <outdir>/si-<W>x<H>-{idle,busy,panel,done}.png; exit 1 on FAIL */
const {chromium}=require('playwright');const [,,URL,OUT,SZ]=process.argv;const sizes=(SZ||'1180x820,755x1000,844x390,1000x755').split(',');
(async()=>{const b=await chromium.launch();let bad=0;const all={};
 for(const sz of sizes){const [W,H]=sz.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,reducedMotion:'no-preference',serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.setDefaultTimeout(30000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){start()}return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kcoach,.kcoach,.kcf,#kcf,.kflip,#kflip').forEach(e=>e.remove());try{S.tutDone=1}catch(e){}tab='act';render()});await p.waitForTimeout(1500);
  const R={};
  const geo=()=>p.evaluate(()=>{const q=e=>{const r=e.getBoundingClientRect();return[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
   const g=document.querySelector('.game'),t=document.getElementById('tabs'),b=document.querySelector('#krail [data-rail="st-dl"]'),st=document.getElementById('stage');
   const cs=g&&getComputedStyle(g);const o={game:g?q(g):null,tabs:t?q(t):null,padB:cs?cs.paddingBottom:null,dockClass:document.body.classList.contains('kload-dock'),chip:!!document.querySelector('.kloadchip')};
   if(b){const r=b.getBoundingClientRect(),sr=st.getBoundingClientRect();o.icon=q(b);o.inside=r.left>=sr.left-1&&r.right<=sr.right+1&&r.top>=sr.top-1&&r.bottom<=sr.bottom+1;o.busy=b.classList.contains('kbusy');o.done=b.classList.contains('kdone');o.badge=b.classList.contains('kbadge');o.anim=getComputedStyle(b.querySelector('.krailg')).animationName;
    const faces=[...st.querySelectorAll('img.figimg,#mefig')].filter(e=>e.offsetParent).map(e=>{const r=e.getBoundingClientRect();return{l:r.left+r.width*.3,r:r.right-r.width*.3,t:r.top,b:r.top+r.height*.22}});o.overFace=faces.some(f=>r.left<f.r&&r.right>f.l&&r.top<f.b&&r.bottom>f.t)}
   o.overX=document.documentElement.scrollWidth>innerWidth;return o});
  R.idle=await geo();await p.screenshot({path:`${OUT}/si-${sz}-idle.png`});
  await p.evaluate(()=>KLOAD.testChip(120e6,635e6));await p.waitForTimeout(500);R.busy=await geo();await p.screenshot({path:`${OUT}/si-${sz}-busy.png`});
  await p.evaluate(()=>{const b=document.querySelector('#krail [data-rail="st-dl"]');b&&b.click()});await p.waitForTimeout(1200);
  R.panel=await p.evaluate(()=>{const M=document.getElementById('modal');const d=M&&!M.hidden&&M.querySelector('.dlg');if(!d)return null;return{title:(d.querySelector('.kptitle')||{}).textContent,x:!!d.querySelector('.kph .kit-x'),prog:!!d.querySelector('.kprog'),text:d.innerText.slice(0,260),daHieu:/Đã hiểu/.test(d.innerText),btns:[...d.querySelectorAll('button')].map(b=>b.textContent.trim()).filter(Boolean).slice(0,6)}});
  await p.screenshot({path:`${OUT}/si-${sz}-panel.png`});
  await p.keyboard.press('Escape');await p.waitForTimeout(500);R.escClosed=await p.evaluate(()=>document.getElementById('modal').hidden);
  await p.evaluate(()=>{KLOAD.paused=true;KLOAD.testChip(120e6,635e6)});await p.waitForTimeout(300);R.paused=await geo();
  await p.evaluate(()=>{KLOAD.paused=false;KLOAD.fig.have=KLOAD.fig.total;KLOAD.fig.left=0;KLOAD.testChip(635e6,635e6)});await p.waitForTimeout(400);R.done=await geo();await p.screenshot({path:`${OUT}/si-${sz}-done.png`});
  await p.waitForTimeout(5600);R.gone=await geo();
  R.errs=errs;
  const fails=[];if(R.idle.icon)fails.push('icon visible while idle');if(!R.busy.icon||!R.busy.busy)fails.push('no busy icon');if(R.busy.icon&&R.busy.icon[2]!==44)fails.push('icon not 44px');if(R.busy.icon&&!R.busy.inside)fails.push('icon outside stage');if(R.busy.overFace)fails.push('icon over face');
  if(R.busy.chip||R.busy.dockClass)fails.push('old chip / dock band still there');if(R.busy.padB&&parseFloat(R.busy.padB)>8)fails.push('game bottom padding '+R.busy.padB);
  if(!R.panel||!R.panel.x||!R.panel.prog||R.panel.daHieu)fails.push('panel wrong');if(!R.escClosed)fails.push('Esc does not close');if(!R.paused.badge||R.paused.busy)fails.push('paused state wrong');if(!R.done.done||R.done.busy)fails.push('done state wrong');if(R.gone.icon)fails.push('icon not gone after done');if(errs.length)fails.push('page errors');
  R.fails=fails;if(fails.length)bad++;all[sz]=R;await ctx.close()}
 console.log(JSON.stringify(all,null,1));await b.close();process.exit(bad?1:0)})();
