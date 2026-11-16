/* review/flip-hand: the Emperor's hand in the live 2D card flip. Records a real-speed video of cfDemo (his turn of a left-column and a right-column card)
   and samples the hand rect every frame: reports whether the hand ever floats cut inside the screen (a sleeve edge visible), its size vs the card,
   long tasks (>50 ms) and frame gaps during the scene.
   usage: node dev/test/flip-hand.js <url> <outdir> <WxH> <label> [who=me|<index>] [dpr]   → <outdir>/<label>-<WxH>.webm + .json */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,VP,LABEL,WHO='me',DPR='1']=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const [W,H]=VP.split('x').map(Number);const dir=`${OUT}/rec-${LABEL}-${VP}-${WHO}`;fs.mkdirSync(dir,{recursive:true});
 const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+DPR,hasTouch:true,serviceWorkers:'block',recordVideo:{dir,size:{width:W,height:H}}});
 const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
 const t0=Date.now();
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await sleep(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;start()})}
 for(let i=0;i<60&&await p.evaluate(()=>typeof NLP!=='undefined'&&!!NLP);i++){await p.evaluate(()=>{const s=[...document.querySelectorAll('#kroul button,.kroul button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click();const b=document.querySelector('button[data-nl="ok"]');if(b)b.click()});await p.waitForTimeout(300)}
 for(let i=0;i<30;i++){await sleep(600);const k=await p.evaluate(()=>{const r=document.querySelector('[id^=kroul],.kroul,.kbd-roulette');if(!r)return 0;const bs=[...r.querySelectorAll('button')];const b=bs.find(x=>/Bỏ qua/.test(x.textContent))||bs.find(x=>/Tiếp|Vào|Nhập/.test(x.textContent))||bs[0];if(b)b.click();else r.click();return 1});if(!k)break}
 await sleep(600);
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('[id^=kroul],.kroul,#kload,.kmov').forEach(e=>e.remove());const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}if(window.KMQ)KMQ.length=0;render()});
 const tStart=(Date.now()-t0)/1000;
 const out=await p.evaluate(async(who)=>{
  const S0={lt:[],frames:[],fr:[]};try{new PerformanceObserver(l=>l.getEntries().forEach(e=>S0.lt.push(Math.round(e.duration)))).observe({entryTypes:['longtask']})}catch(e){}
  const w=who==='me'?'me':+who;const sc=await cfDemo(14,3,w);const ov=document.querySelector('.kmov.kcf');
  let last=performance.now(),t00=last,stop=false;
  const tick=()=>{const n=performance.now();S0.fr.push(Math.round(n-last));last=n;const h=ov.querySelector('.kcf-hand');
   if(h&&h.classList.contains('on')){const r=h.getBoundingClientRect();const cd=[...ov.querySelectorAll('.kcf-c:not(.kcf-gone)')][0];const cr=cd&&cd.getBoundingClientRect();
    /* the two sprite edges that carry the sleeve (left edge rows 0..cutL, top edge columns 0..cutT), sampled, mapped through the hand's own turn about the pinch point */
    const H=BAL.cardFlip.hand,th=(H.rot||0)*Math.PI/180,c=Math.cos(th),sn=Math.sin(th),cL=H.cutL||.43,cT=H.cutT||.43,pxs=r.left+H.px*r.width,pys=r.top+H.py*r.height;let inside=0;
    const pt=(u,v)=>{const x=(u-H.px)*r.width,y=(v-H.py)*r.height;return[pxs+x*c-y*sn,pys+x*sn+y*c]};
    for(let k=0;k<=10;k++){for(const [u,v] of [[0,cL*k/10],[cT*k/10,0]]){const [x,y]=pt(u,v);if(x>=0&&x<=innerWidth&&y>=0&&y<=innerHeight)inside++}}
    S0.frames.push({t:Math.round(n-t00),l:Math.round(r.left),t0:Math.round(r.top),r:Math.round(r.right),b:Math.round(r.bottom),cutInside:inside,cardH:cr?Math.round(cr.height):0})}
   if(!stop)requestAnimationFrame(tick)};requestAnimationFrame(tick);
  await new Promise(r=>{const i=setInterval(()=>{if(ov.dataset.fin||!document.body.contains(ov)){clearInterval(i);r()}},100);setTimeout(()=>{clearInterval(i);r()},24000)});
  stop=true;return{...S0,vw:innerWidth,vh:innerHeight,total:Math.round(performance.now()-t00)}},WHO);
 await sleep(1200);
 const frames=out.frames;let cutVisible=0,maxH=0,minL=1e9,minT=1e9,vis=0;
 for(const f of frames){vis++;const hh=f.b-f.t0;maxH=Math.max(maxH,hh);
  /* sprite edges that carry the sleeve (top edge and left edge): cut visible when the edge lies inside the screen */
  if(f.cutInside>0)cutVisible++;}
 const gaps=out.fr.filter(x=>x>60).length;
 const rep={label:LABEL,vp:VP,who:WHO,sceneMs:out.total,handFrames:vis,framesWithCutEdgeInside:cutVisible,maxHandH:maxH,cardH:frames[0]&&frames[0].cardH,handOverCard:frames[0]&&+(maxH/frames[0].cardH).toFixed(2),longTasks:out.lt,longTaskSum:out.lt.reduce((a,b)=>a+b,0),frameGaps60:gaps,maxFrame:Math.max(...out.fr),errs,recStartSec:+tStart.toFixed(1)};
 fs.writeFileSync(`${OUT}/${LABEL}-${VP}-${WHO}.json`,JSON.stringify({rep,frames},null,0));console.log(JSON.stringify(rep));
 await c.close();const v=fs.readdirSync(dir).find(f=>f.endsWith('.webm'));if(v)fs.renameSync(`${dir}/${v}`,`${OUT}/${LABEL}-${VP}-${WHO}.webm`);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
