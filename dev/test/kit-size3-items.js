/* kit-size3-items.js — items BEFORE (#2 sheet, 242800da) | AFTER (kszItemsSheet3): one png per block (sizes, 6.2, 6.3, 6.5, wear row).
   usage: node dev/test/kit-size3-items.js <url> <W>x<H> <outdir> <before jksize.js> <after jksize.js>  (TAGSZ / DPR env) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,SZ,OUT,BEF,AFT]=process.argv;const [W,H]=SZ.split('x').map(Number);const TAG=process.env.TAGSZ||SZ;
async function boot(){const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2500);
 await p.addStyleTag({content:'#krottip{display:none!important}body>*:not(#kszsheet){visibility:hidden!important}#kszsheet{position:absolute!important;inset:0 auto auto 0!important;height:auto!important;min-height:100%;overflow:visible!important;width:100%}'});
 if(W<H)await p.evaluate(()=>{document.documentElement.classList.remove('kv2');document.documentElement.classList.add('kv1')});return{b,p,errs}}
async function blocks(p,suf){await p.waitForTimeout(1500);await p.waitForFunction(()=>[...document.querySelectorAll('#kszsheet img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(800);
 const n=await p.evaluate(()=>{const s=document.getElementById('kszsheet');let i=0;for(const h of s.querySelectorAll('h3')){const w=document.createElement('div');w.className='k3blk';w.dataset.i=i++;h.before(w);w.append(h);let nx=w.nextElementSibling;while(nx&&nx.tagName!=='H3'&&!nx.classList.contains('k3blk')){const t=nx.nextElementSibling;w.append(nx);nx=t}w.style.cssText='display:inline-block;padding:6px';w.after(document.createElement('br'))}return i});
 for(let i=0;i<n;i++)await p.locator(`#kszsheet .k3blk[data-i="${i}"]`).screenshot({path:`${OUT}/it-${TAG}-${i}-${suf}.png`})}
(async()=>{const r={};
 {const {b,p,errs}=await boot();await p.addScriptTag({content:fs.readFileSync(AFT,'utf8')});await p.evaluate(()=>kszItemsSheet3Show());await blocks(p,'a');
  r.after=await p.evaluate(()=>[...document.querySelectorAll('#kszsheet .kszit3')].map(t=>{const x=t.querySelector('.kitx'),fr=t.querySelector('.ksz3m .kitem')||t;const q=fr.getBoundingClientRect();if(!x)return{s:t.dataset.s,box:null,frame:q.width|0};const a=x.getBoundingClientRect();
   /* the box position / size as a fraction of the frame: identical at every size = scaled from the master */
   return{s:t.dataset.s,frame:+q.width.toFixed(1),box:[(a.left-q.left)/q.width,(a.top-q.top)/q.height,a.width/q.width].map(v=>+v.toFixed(3))}}));r.after_errs=errs;await b.close()}
 {const {b,p,errs}=await boot();await p.addScriptTag({content:'{'+fs.readFileSync(BEF,'utf8')+'\n}'});await p.evaluate(()=>{kitSizeSheet('items');const s=document.getElementById('kszsheet');
   [...s.querySelectorAll('h3')].slice(4).forEach(h=>{let n=h.nextElementSibling;while(n&&n.tagName!=='H3'){const t=n.nextElementSibling;n.remove();n=t}h.remove()});
   s.insertAdjacentHTML('beforeend',`<h3>Wear row on the person card (live kitWearSlots)</h3><div style="display:flex">${kitWearSlots(S,{size:"sm"})}</div>`)});await blocks(p,'b');r.before_errs=errs;await b.close()}
 console.log(JSON.stringify(r))})().catch(e=>{console.error(e);process.exit(1)});
