/* review/hc-portrait: Hậu cung person panel portrait box — gap name→frame, frame width vs column, chips on screen.
   usage: [LOCAL_W=<dir with frame-*-w.webp before CDN upload>] node dev/test/hc-portrait.js <url> <W>x<H> <outdir> <tag> [known=0|1] [shots=1]
   Prints JSON per sub-tab: col (left column rect), name bottom, frame art visible rect (opaque bbox of img.kfr), window rect, chips bottom vs viewport. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,KNOWN,SHOTS]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 if(process.env.LOCAL_W)await p.route(/img\/kit\/frame-[a-z0-9-]+-w\.webp/,r=>{const n=r.request().url().split('/').pop();const f=process.env.LOCAL_W+'/'+n;fs.existsSync(f)?r.fulfill({status:200,contentType:'image/webp',body:fs.readFileSync(f)}):r.continue()});
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000}).catch(()=>console.error('nostart',errs));await p.waitForTimeout(2000);
 await p.evaluate(K=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
  if(K){kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){};try{menInit();(S.men||[]).slice(0,4).forEach(m=>{try{k61Meet(m,"gặp",3)}catch(e){}})}catch(e){}}
  Q.length=0;if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{render()}catch(e){}},+KNOWN||0);
 await p.waitForTimeout(1500);
 const meas=()=>p.evaluate(()=>{const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return [r.left,r.top,r.width,r.height].map(Math.round)};
  const pc=document.querySelector('#panel .pc'),L=pc&&pc.querySelector(':scope>.pcl'),pp=L&&L.querySelector(':scope>.pcp');if(!pp)return{none:1};
  const fr=pp.querySelector('img.kfr'),win=pp.querySelector('.kbg')||pp.querySelector('img.kpor');const nm=L.querySelector('.pcname');
  const cs=getComputedStyle(L);const col=L.getBoundingClientRect();const inner=[Math.round(col.left+parseFloat(cs.paddingLeft)),Math.round(col.width-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight))];
  const kids=[...L.children].filter(e=>e.offsetParent);const last=kids[kids.length-1];
  let vis=null;if(fr){const r=fr.getBoundingClientRect();vis=[r.left,r.top,r.width,r.height].map(Math.round)}
  const imgs=[...pp.querySelectorAll('.kin>img')].map(i=>[i.className,(i.getAttribute('src')||'').split('/').pop(),i.naturalWidth,getComputedStyle(i).display,getComputedStyle(i).visibility,getComputedStyle(i).opacity]);const kidsR=[...L.children].slice(0,5).map(e=>[e.tagName,e.className,R(e),getComputedStyle(e).display,getComputedStyle(e).position,e.innerHTML.slice(0,120)]);return{kidsR,imgs,cls:pc.className,col:R(L),inner,name:R(nm),pcp:R(pp),frame:vis,win:R(win),last:last&&last.className,lastBottom:last&&Math.round(last.getBoundingClientRect().bottom),Lscroll:[L.scrollHeight,L.clientHeight],vh:innerHeight,ovf:document.documentElement.scrollWidth>innerWidth+1}});
 const R={};const tabs=[['court','chiton'],['rv','phitan'],['men','namnhan'],['staff','cungnhan']];
 for(const [t,n] of tabs){await p.evaluate(t=>{Q.length=0;const mo=document.getElementById('modal');if(mo)mo.hidden=true;document.body.classList.remove('kbk-open');tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};document.querySelectorAll('.kres,.ktoast,#ktoast').forEach(e=>e.remove())},t);await p.waitForTimeout(2200);await p.waitForFunction(()=>[...document.querySelectorAll('#panel img')].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(500);R[n]=await meas();if(+SHOTS!==0)await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:70});
  if(t==='rv'){const ok=await p.evaluate(()=>{const b=[...document.querySelectorAll('#panel [data-pi], #panel .kpstrip button, #panel .pface')].find(e=>/Người lạ/.test(e.textContent));if(b){b.click();return 1}return 0});
   if(ok){await p.waitForTimeout(2200);await p.waitForFunction(()=>[...document.querySelectorAll('#panel img')].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(500);R.nguoila=await meas();if(+SHOTS!==0)await p.screenshot({path:`${OUT}/${TAG}-nguoila.jpg`,type:'jpeg',quality:70})}}}
 console.log(JSON.stringify({TAG,R,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
