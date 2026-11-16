/* review/stage-slots-fix-r1 (owner OD:L1049, whole group): the event pop-up people (picture band .kesov, person column .kdper/.kes) use the SAME fixed slots as a room stage.
   usage: node dev/test/stage-slots-fix-r1-ev.js <page URL> <WxH@dpr> <outdir> <tag>
   NOTE the live game (KIT_EVENT_DP on) shows exactly ONE person in an event pop-up; e2* cases switch KIT_EVENT_DP off to exercise the 2-person kit layout.
   Cases: e1 (1 person + picture), e2 (woman + emperor, picture), e2n (2 women, no picture), emp1 (emperor + picture), e2k (woman + child or emperor).
   Measures every figure's VISIBLE bounding box (kitFigBody l..r of the art) and asserts: no two boxes intersect; centres: 1 → middle, 2 → 1/3 · 2/3 of the free width
   (picture band: x0=8, avail=W-16; column: x0=6, avail=W-12; tolerance 2 px; a column that clips is reported, not failed). Prints JSON; ck = failures. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,TAG]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await p.addStyleTag({content:'#kroul{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.buoi=0;deal();render()});await sleep(1500);
 /* pre-load every figure used below (cold CDN loads can fail once: kitImgErr hides that figure) */
 await p.evaluate(async()=>{const R0=liveRivals(true).filter(v=>!v.queen);R0.forEach(x=>{const K=k61S();if(K)K[kOf61(x)]=3});const P=[...R0.slice(0,3),S.emp,...(S.kids||[]).slice(0,1)];
  await Promise.all(P.map(q=>new Promise(r=>{const s=kitFigOf(q.__kp||q);if(!s)return r();const i=new Image();i.crossOrigin='anonymous';i.onload=i.onerror=r;i.src=s;setTimeout(r,15000)})))});
 const CASES=["e1","e2","e2n","emp1","e2k"];const OUTR={vp:VP,cases:{}};
 for(const k of CASES){
  const ok=await p.evaluate(k=>{try{Q.length=0;quiet=false;document.getElementById('modal').hidden=true;const R0=liveRivals(true).filter(v=>!v.queen);R0.forEach(x=>{try{S.met[x.id]=1;const K=k61S();if(K)K[kOf61(x)]=3}catch(e){}});const Rk=R0;const v=(Rk[0]||R0[0]),v2=(Rk[1]||R0[1]||R0[0]);kn();
   const o2=[{n:"Nhịn",fx:{duc:2},x:"giữ lễ",go:()=>{}},{n:"Đáp trả",fx:{danh:1},x:"nàng oán",go:()=>{}}];
   const ha={src:"img/ev-khach-den.webp"};
   window.KIT_EVENT_DP=/^(e2|e2n|e2k)$/.test(k)?false:undefined;/* the live game shows ONE main actor in the pop-up (kitStagePeople slice(0,1)); the 2-person layout is still in the kit, so it is tested with the switch off */let st=[v],art=ha;if(k==="e2")st=[v,S.emp];if(k==="e2n"){st=[v,v2];art=null}if(k==="emp1")st=[S.emp];if(k==="e2k"){const kid=(S.kids||[]).find(c=>c.alive!==false);st=kid?[v,kid]:[v,S.emp]}
   const o={t:"Có người đến "+k,who:pv(v),stage:st,h:`<p>${v.name} đến cửa cung.</p>`,opts:o2};if(art)o.headArt=art;Q.push(o);showModal();return 'ok '+Q.length+' '+document.getElementById('modal').hidden}catch(e){return 'ERR '+e.message}},k);console.error(k,ok);
  await sleep(1500);if(await p.evaluate(()=>document.getElementById('modal').hidden)){console.error('retry',k);await p.evaluate(()=>{showModal()});await sleep(1500)}
  await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));for(let w=0;w<40;w++){const ok2=await p.evaluate(()=>{const A=[...document.querySelectorAll('#modal .kesf')].filter(f=>!f.classList.contains('kesno'));return A.length>0&&A.every(f=>{const i=f.querySelector('img');return f.style.visibility!=='hidden'&&f.getBoundingClientRect().width>2&&i&&i.complete&&i.naturalWidth>0})});if(ok2)break;await sleep(700)}await sleep(800);
  if(process.env.SHOTS!=='0')await p.screenshot({path:`${OUT}/${TAG}-${W}x${H}-${k}.jpg`,type:'jpeg',quality:62,timeout:240000});
  const r=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return{shown:false};const d=M.querySelector('.dlg');
   const vis=e=>e&&e.offsetParent!==null&&e.getBoundingClientRect().width>2&&getComputedStyle(e).visibility!=='hidden';
   const ov=M.querySelector('#mb .kesov'),col=M.querySelector('#mb .kpsubj.kes');
   const cont=ov?ov.parentElement:col;const C=cont?cont.getBoundingClientRect():null;
   const ims=[...M.querySelectorAll('.kesimg')].filter(vis);
   const L=ims.map(im=>{const bb=(window.__KITFB||{})[im.getAttribute('src')];const b=(bb&&bb.v)||{l:0,r:1};const q=im.getBoundingClientRect();return{l:+(q.left-C.left+q.width*b.l).toFixed(1),r:+(q.left-C.left+q.width*b.r).toFixed(1),h:+q.height.toFixed(0),src:im.getAttribute('src').split('/').pop()}}).sort((a,c)=>a.l-c.l);
   return{dom:[...M.querySelectorAll('.kesf')].map(f=>f.className+'|'+(f.getAttribute('style')||'')+'|'+(f.querySelector('img')||{}).naturalWidth+'|'+((f.querySelector('img')||{}).getAttribute('style')||'')),shown:true,nAll:M.querySelectorAll('.kesf').length,nR0:liveRivals(true).filter(v=>!v.queen).length,mode:ov?'band':'column',cls:d.className.replace(/\s+/g,' '),cont:C&&{w:+C.width.toFixed(1),h:+C.height.toFixed(1)},L}});
  const ck=[];if(!r.shown)ck.push('modal not shown');else{const L=r.L;if(!L.length)ck.push('no figure');
   for(let i=1;i<L.length;i++)if(L[i].l<L[i-1].r-0.5)ck.push(`OVERLAP [${L[i-1].l},${L[i-1].r}] x [${L[i].l},${L[i].r}] by ${(L[i-1].r-L[i].l).toFixed(1)}px`);
   const x0=r.mode==='band'?8:6,av=r.cont.w-(r.mode==='band'?16:12),n=L.length;
   if(n===2||(n===1&&r.mode==='band'))L.forEach((f,i)=>{const want=x0+av*(i+1)/(n+1),c=(f.l+f.r)/2;if(Math.abs(c-want)>2)ck.push(`slot ${i+1}/${n} centre ${c.toFixed(1)} want ${want.toFixed(1)}`)});
   if(!(r.mode==='column'&&n===1)&&L.length&&(L[0].l<-0.5||L[L.length-1].r>r.cont.w+0.5))ck.push(`figure outside its ${r.mode} (${L[0].l}..${L[L.length-1].r} of ${r.cont.w})`)}
  OUTR.cases[k]={r,ck}}
 OUTR.errs=errs;console.log(JSON.stringify(OUTR));await b.close()})();
