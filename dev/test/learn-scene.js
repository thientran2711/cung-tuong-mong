/* learn-scene-fix (review/learn-scene-fix): Học thành tài per-subject picture + scene ORDER.
   usage: node dev/test/learn-scene.js [outdir]   shots go OUTSIDE the repo (default /home/user/wt/learn-scene-shots) */
const {chromium}=require('playwright');const D=require('./lib/device');const out=process.argv[2]||'/home/user/wt/learn-scene-shots';require('fs').mkdirSync(out,{recursive:true});
const SUBJ=[["art","cam"],["art","ky"],["art","thi"],["art","hoa"],["art","vu"],["art","y"],["vir","cong"],["vir","dung"],["vir","ngon"],["vir","hanh"]];
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});const R={};let fail=0;const ok=(c,m)=>{if(!c){fail++;console.log("FAIL",m)}};
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[],bad=[],reqs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
  p.on('request',q=>{if(/scene-thanhtai/.test(q.url()))reqs.push(q.url().replace(/^.*img\//,'img/'))});p.on('response',r=>{if(r.status()>=400&&/\.(webp|png|jpg)/.test(r.url())&&/img\/(scene-|art-|act-cat|mo-)/.test(r.url()))/* only the pictures this scene family shows; other 404s (img/@W<n>.webp, face-man-<n>) come from main code outside this test */bad.push(r.status()+' '+r.url().slice(-60))});
  const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);const r={};
  await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();try{NLP=null}catch(e){}Q.length=0;const k=document.getElementById('kload');if(k)k.hidden=true;const m=document.getElementById('modal');if(m)m.hidden=true;render();if(S.rank<3)S.rank=3});
  try{await g.waitForSelector('#kroul',{timeout:20000});await p.waitForTimeout(1500);await g.evaluate(()=>{const b=[...document.querySelectorAll('#kroul button')].find(x=>/Bỏ qua/.test(x.textContent));b&&b.click()});await g.waitForSelector('#kroul',{state:'detached',timeout:20000})}catch(e){}
  await p.waitForTimeout(1500);await g.evaluate(()=>{document.querySelectorAll('.krbox,#kroul').forEach(x=>{const o=x.id==='kroul'?x:x.parentElement;o&&o.remove()});const c=document.getElementById('curtain');if(c)c.hidden=true;Q.length=0;try{NLP=null}catch(e){}const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}render()});
  await g.waitForFunction(()=>typeof KIT_CDNHAVE!=="undefined"&&KIT_CDNHAVE&&KIT_CDNHAVE.size>0,{timeout:30000});
  const clean=()=>g.evaluate(()=>{document.querySelectorAll('.kmov,#buoitr').forEach(x=>x.remove());KMQ.length=0;kmBusy=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
  /* ---- 1. every subject: its own picture, loaded (naturalWidth>0), not black ---- */
  r.subj=[];
  for(const [kind,k] of SUBJ){await clean();
   await g.evaluate(([kind,k])=>{if(kind==="art"){S.arts[k]=1;S.artp[k]=0;addArt(k,5)}else{vNorm(S);S.vir[k]=0;S.virp[k]=0;addVir(S,k,3)}},[kind,k]);
   await g.waitForSelector('#klearnov .klearn-pic',{timeout:8000});await g.waitForFunction(()=>{const i=document.querySelector('#klearnov .klearn-pic');return i&&i.complete&&i.naturalWidth>0},null,{timeout:8000}).catch(()=>{});await p.waitForTimeout(300);
   const o=await g.evaluate(()=>{const i=document.querySelector('#klearnov .klearn-pic');return{src:i.getAttribute('src'),w:i.naturalWidth,cx:i.currentSrc.slice(-40)}});
   r.subj.push([k,o.src,o.w]);ok(o.src.endsWith(`img/scene-thanhtai-${k}.webp`),`subject ${k}: src ${o.src}`);ok(o.w>0,`subject ${k}: not loaded`);
   if(k==="cong"||k==="cam")await p.screenshot({path:`${out}/${dev}-learn-${k}.png`})}
  r.reqs=[...new Set(reqs)].length;ok(!bad.length,"image 4xx: "+bad.join(","));
  /* ---- 2. key NOT in the manifest -> kitSkillArt fallback at once, the missing file is never requested ---- */
  await clean();reqs.length=0;
  await g.evaluate(()=>{window.__h=KIT_CDNHAVE;KIT_CDNHAVE=new Set([...KIT_CDNHAVE].filter(f=>!/scene-thanhtai-ky/.test(f)));S.arts.ky=1;S.artp.ky=0;addArt("ky",5)});
  await g.waitForSelector('#klearnov .klearn-pic',{timeout:8000});await p.waitForTimeout(600);
  r.fb=await g.evaluate(()=>{const i=document.querySelector('#klearnov .klearn-pic');return{src:i.getAttribute('src'),w:i.naturalWidth}});
  ok(/img\/art-ky\.webp|act-cat-hoc-tap/.test(r.fb.src||""),"fallback src "+r.fb.src);ok(r.fb.w>0,"fallback picture not loaded");ok(!reqs.some(u=>/thanhtai-ky/.test(u)),"requested the missing file: "+reqs);
  await g.evaluate(()=>{KIT_CDNHAVE=window.__h});
  /* index not loaded (null) -> fallback too, no request */
  await clean();reqs.length=0;await g.evaluate(()=>{window.__h=KIT_CDNHAVE;KIT_CDNHAVE=null;S.arts.thi=1;S.artp.thi=0;addArt("thi",5)});await g.waitForSelector('#klearnov .klearn-pic',{timeout:8000});await p.waitForTimeout(400);
  r.fb2=await g.evaluate(()=>document.querySelector('#klearnov .klearn-pic').getAttribute('src'));ok(/art-thi|act-cat/.test(r.fb2||""),"index null fallback "+r.fb2);ok(!reqs.length,"index null requested "+reqs);await g.evaluate(()=>{KIT_CDNHAVE=window.__h});
  /* ---- 3. ORDER: made-item dialog -> level-up scene -> buổi transition -> next VIỆC ---- */
  await clean();
  const T=[];await g.evaluate(()=>{window.__ord=[];const st=()=>({m:!document.getElementById('modal').hidden&&document.getElementById('mt').textContent,l:!!document.getElementById('klearnov'),b:!!document.getElementById('buoitr')});
   window.__snap=tag=>window.__ord.push([tag,JSON.stringify(st())]);
   /* the road: study -> addArt (scene queued) + the made-item result dialog pushed in the same call */
   S.arts.cam=1;S.artp.cam=0;addArt("cam",5);Q.push({t:"Túi thơm thêu sen · Tinh xảo",h:"<p>Món ngươi làm.</p>"});showModal()});
  await p.waitForTimeout(900);r.o1=await g.evaluate(()=>({m:!document.getElementById('modal').hidden,t:document.getElementById('mt').textContent,l:!!document.getElementById('klearnov')}));
  ok(r.o1.m&&!r.o1.l,"1: made-item dialog must show first, no level-up scene yet "+JSON.stringify(r.o1));
  await g.evaluate(()=>{document.getElementById('mclose').click()});await p.waitForTimeout(600);
  r.o2=await g.evaluate(()=>({m:!document.getElementById('modal').hidden,l:!!document.getElementById('klearnov')}));ok(r.o2.l&&!r.o2.m,"2: level-up scene after the item dialog closed "+JSON.stringify(r.o2));
  /* the buổi advance + the next VIỆC arrive while the scene is up */
  await g.evaluate(()=>{buoiShift();Q.push({t:"Kỳ nguyệt sự",h:"<p>VIỆC kế tiếp.</p>"});showModal()});await p.waitForTimeout(700);
  r.o3=await g.evaluate(()=>({m:!document.getElementById('modal').hidden,l:!!document.getElementById('klearnov'),b:!!document.getElementById('buoitr')}));ok(r.o3.l&&!r.o3.m&&!r.o3.b,"3: under the scene: no buổi, no VIỆC "+JSON.stringify(r.o3));
  await p.screenshot({path:`${out}/${dev}-order-scene.png`});
  await g.evaluate(()=>{document.querySelector('#klearnov [data-km-close]').click()});await p.waitForTimeout(500);
  r.o4=await g.evaluate(()=>({m:!document.getElementById('modal').hidden,l:!!document.getElementById('klearnov'),b:!!document.getElementById('buoitr')}));ok(r.o4.b&&!r.o4.m&&!r.o4.l,"4: buổi transition next, VIỆC still waiting "+JSON.stringify(r.o4));
  await p.screenshot({path:`${out}/${dev}-order-buoi.png`});
  await g.waitForFunction(()=>!document.getElementById('buoitr')&&!document.getElementById('modal').hidden,{timeout:9000});await p.waitForTimeout(300);
  r.o5=await g.evaluate(()=>({m:!document.getElementById('modal').hidden,t:document.getElementById('mt').textContent,b:!!document.getElementById('buoitr')}));ok(r.o5.m&&r.o5.t==="Kỳ nguyệt sự"&&!r.o5.b,"5: the next VIỆC opens after the buổi "+JSON.stringify(r.o5));
  await p.screenshot({path:`${out}/${dev}-order-viec.png`});
  /* ---- 4. no scene queued: the buổi plays at once, a dialog is never held ---- */
  await clean();await g.evaluate(()=>{buoiShift();Q.push({t:"Việc",h:"<p>x</p>"});showModal()});await p.waitForTimeout(300);
  r.n1=await g.evaluate(()=>({m:!document.getElementById('modal').hidden,b:!!document.getElementById('buoitr')}));ok(r.n1.m&&r.n1.b,"6: no scene -> buổi immediate + dialog immediate "+JSON.stringify(r.n1));
  r.errs=errs;ok(!errs.length,"page errors "+errs.join("|"));R[dev]=r;await ctx.close()}
 console.log(JSON.stringify(R,null,1));console.log(fail?"FAILS: "+fail:"ALL PASS");await b.close();srv.close();process.exit(fail?1:0)})();
