/* review/kit-close — KIT 28.13f compact item / equipment-slot card. Opens every "Đang mang" slot (cài tóc, đeo tay, đeo eo, túi thơm,
   khăn che mặt, y phục) and one bag item; prints the box, the tile size vs. the bag-grid tile, act-card heights (content vs. box), close
   words, and shoots each. usage: node dev/test/slot-card.js <build page url> <outdir> <tag> [WxH@dpr,…]
   (default 755x1000@2,1000x755@2,1180x820@2). Images missing from a sparse checkout come from the live site. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const https=require('https');
/* start() may finish after the loading screen: wait for the life, and start again while it is a servant life */
async function kcWait(p){for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>typeof isSrv==="function"&&isSrv())))return;await p.evaluate(()=>{S=null;try{nlNew()}catch(e){}start()})}}
const [,,PAGE,OUT,TAG,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));const LIVE='https://thientran2711.github.io/cung-tuong-mong/';const cache=new Map();
const live=p=>cache.has(p)?Promise.resolve(cache.get(p)):new Promise(res=>https.get(LIVE+p,r=>{const c=[];r.on('data',d=>c.push(d));r.on('end',()=>{const v={status:r.statusCode,body:Buffer.concat(c),ct:r.headers['content-type']||''};if(cache.size<500)cache.set(p,v);res(v)})}).on('error',()=>res({status:404,body:Buffer.alloc(0),ct:''})));
(async()=>{const b=await chromium.launch();const ALL=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.route('**/*',async rt=>{const u=new URL(rt.request().url());const m=u.pathname.match(/\/((?:img|audio|icons)\/.*)$/);
   if(/^(127\.0\.0\.1|localhost)$/.test(u.hostname)&&m&&!fs.existsSync(process.cwd()+'/'+m[1])){const v=await live(m[1]);return rt.fulfill({status:v.status,body:v.body,contentType:v.ct})}
   if(/^(127\.0\.0\.1|localhost)$/.test(u.hostname)&&/\.html$/.test(u.pathname)&&fs.existsSync(process.cwd()+u.pathname))return rt.fulfill({status:200,body:fs.readFileSync(process.cwd()+u.pathname),contentType:'text/html; charset=utf-8'});
   return rt.continue()});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   start()});await kcWait(p);await p.evaluate(()=>{Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
   /* something in each slot to look at: a bracelet worn, a second hairpin in the bag, a sachet */
   for(const k of Object.keys(IT)){const it=IT[k];if(it.sl==="wrist"&&!S.inv.some(e=>IT[e.k]&&IT[e.k].sl==="wrist")){S.inv.push({k,w:1})}if(it.sl==="scent"&&!S.inv.some(e=>IT[e.k]&&IT[e.k].sl==="scent"))S.inv.push({k})}
   S.bac=400;tab="inv";render();const kr=document.getElementById("kroul");if(kr)kr.remove()});
  await sleep(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}if(typeof tab!=='undefined'&&tab==='inv')render();else render()});await sleep(300);
  const imgs=()=>p.evaluate(()=>Promise.all([...document.querySelectorAll('img')].filter(i=>i.offsetParent).map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,6000)}))));
  const tile=await p.evaluate(()=>{const t=document.querySelector('#panel .kitem');const r=t&&t.getBoundingClientRect();return r?[Math.round(r.width),Math.round(r.height)]:null});
  const R={sz,tile,cards:{}};
  const slots=await p.evaluate(()=>{try{keqTT()}catch(e){}return(KEQ.reg.tutrang&&KEQ.reg.tutrang.slots||[]).map(s=>s.k)});
  for(const k of slots.concat(["item"])){
   const ok=await p.evaluate(k=>{Q.length=0;tab="inv";render();if(k==="item"){const x=kinvItems()[0];if(!x)return false;kinvOpen(x);return true}try{keqTT()}catch(e){}const s=KEQ.reg.tutrang.slots.find(s=>s.k===k);keqPick(s);return true},k);
   if(!ok){R.cards[k]="none";continue}await imgs();await sleep(700);
   R.cards[k]=await p.evaluate(()=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg');const r=d.getBoundingClientRect();const vis=e=>e&&e.offsetParent!==null;
    const t=d.querySelector('.kpsubj.kpitem .kitem');const tr=t&&t.getBoundingClientRect();
    const acts=[...d.querySelectorAll('.kinvacts > button')].map(b=>{const q=b.getBoundingClientRect();const inner=[...b.children].reduce((a,c)=>Math.max(a,c.getBoundingClientRect().bottom),q.top)-q.top;return{n:(b.querySelector('.kan')||b).textContent.trim().split('\n')[0].slice(0,18),w:Math.round(q.width),h:Math.round(q.height),slack:Math.round(q.height-inner),full:b.classList.contains('ksllong')}});
    const facts=[...d.querySelectorAll('.kfact')].map(f=>{const q=f.getBoundingClientRect();return{x:Math.round(q.left-r.left),w:Math.round(q.width),dot:!!(f.querySelector('.kfdot')&&vis(f.querySelector('.kfdot')))}});
    const btns=[...M.querySelectorAll('button')].filter(vis).map(b=>b.textContent.trim());
    return{title:(d.querySelector('.kptitle')||{}).textContent,box:[Math.round(r.width),Math.round(r.height)],scroll:d.scrollHeight>d.clientHeight+2,tile:tr?[Math.round(tr.width),Math.round(tr.height)]:null,acts,facts,
     x:d.querySelectorAll('.kit-x').length,closeWords:btns.filter(t=>/^(Thôi|Lui|Đóng|Đã hiểu|Đã rõ)$/.test(t))}});
   for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${TAG}-${k}-${wh}.jpg`,type:'jpeg',quality:74,timeout:60000});break}catch(e){await sleep(1500)}}
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()})}
  R.errs=errs;ALL.push(R);await ctx.close()}
 console.log(JSON.stringify(ALL,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
