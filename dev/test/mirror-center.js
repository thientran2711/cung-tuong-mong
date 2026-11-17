/* mirror-center (owner 17/11 ~18:00Z): in the makeup close-up the face must sit in the middle of the mirror glass. PIXEL based (reviewer r1):
   - glass centre = the mirror's axis of symmetry measured on the painting itself (img/toil-mirror-room.webp, frame rows 60-470) mapped through the real plate rect;
   - face = measured on the portrait PICTURE's pixels (skin colour, face band; the fit files are known to be off by up to 10 %), mapped through the real portrait rect: eyes/d = middle of the cheek-to-cheek skin extent (independent of the game), cen/dc = skin centroid (what the game centres).
   usage: node dev/test/mirror-center.js <url> <WxH@dpr> <shotdir|-> [faces=c09-t2,c28-t2,c01-t1,c25-t1,c14-t3,c10-t1]
   FAIL when any |centroid - glass| (dc, what the game centres, measured against the glass axis found on the painting through the real rects) > 6 css px, the mean of |dc| > 4, or any |extent-mid - glass| (d, a second estimator, informative: ears/neck skin skew it on turned heads) > 30. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,VP,DIR,FC]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@1');const W=+m[1],H=+m[2],DPR=+m[3];
if(DIR&&DIR!=='-')fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.sac=Math.max(S.sac,55);deal();render();while(Q.length){Q.length=0}try{closeModal()}catch(e){}const mo=document.getElementById('modal');if(mo)mo.hidden=true;render()});await p.waitForTimeout(800);
 /* measured from the pictures, in the page (the CDN sends CORS) */
 await p.evaluate(()=>{const load=async u=>{const r=await fetch(u,{mode:'cors'});return createImageBitmap(await r.blob())};
  const px=bm=>{const c=document.createElement('canvas');c.width=bm.width;c.height=bm.height;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(bm,0,0);return g.getImageData(0,0,c.width,c.height)};
  window.__plateAxis=async()=>{const bm=await load(IMG_U('img/toil-mirror-room.webp'));const d=px(bm),Wd=d.width,k=Wd/1200,L=(x,y)=>{const i=(Math.round(y)*Wd+Math.round(x))*4;return(d.data[i]+d.data[i+1]+d.data[i+2])/3};
   let best=1e9,bc=0;for(let c=600;c<=660;c+=.5){let e=0,n=0;for(let y=60;y<470;y+=2)for(let dx=1;dx<150;dx+=2){e+=Math.abs(L((c-dx)*k,y*k)-L((c+dx)*k,y*k));n++}e/=n;if(e<best){best=e;bc=c}}return bc/1200};
  /* face centre, a second way (the game uses the centroid of the skin pixels): MIDDLE OF THE FACE'S LEFT-RIGHT SKIN EXTENTS (4th..96th percentile, cheek to cheek) in the face band; returns [extremesMid, centroid] as shares of the picture width */
  window.__eyeMid=async file=>{const bm=await load(IMG_U('img/'+file));const d=px(bm),Wd=d.width,Hd=d.height,v=TOIL_FIT.fit[file];if(!v)return null;
   const my=v[1]/100*Hd,fw=v[6]/100*Wd,mx=v[0]/100*Wd,y0=Math.max(0,v[3]/100*Hd-.06*Hd|0),y1=Math.min(Hd,my+.02*Hd|0),x0=Math.max(0,mx-.9*fw|0),x1=Math.min(Wd,mx+.9*fw|0),xs=[];
   const cnt=new Float32Array(Wd);let n=0;for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=(y*Wd+x)*4,r=d.data[i],g=d.data[i+1],b=d.data[i+2];if(d.data[i+3]>200&&r>150&&r>g&&g>b&&r-b>18&&r-g<60&&g>110){cnt[x]++;n++}}
   if(n<100)return null;/* heaviest run of skin columns (a hand beside the face is dropped); extent = cheek to cheek of that run, centroid = what the game uses */
   const mx2=Math.max(...cnt)*.06,segs=[];let cur=null,gp=0;for(let x=x0;x<x1;x++){if(cnt[x]>mx2){if(!cur)cur={a:x,m:0,s:0};cur.m+=cnt[x];cur.s+=cnt[x]*x;cur.e=x;gp=0}else if(cur&&++gp>Wd*.02){segs.push(cur);cur=null}}if(cur)segs.push(cur);
   const top=segs.reduce((a,b)=>b.m>a.m?b:a);return[(top.a+top.e)/2/Wd,top.s/top.m/Wd]}});
 const plateAx=await p.evaluate(()=>window.__plateAxis());
 const out={vp:VP,plateAxis:+(plateAx*1200).toFixed(1),rows:[]};let bad=0,sum=0;
 for(const ft of (FC||'c09-t2,c28-t2,c01-t1,c25-t1,c14-t3,c10-t1').split(',')){const [f,t]=ft.split('-');
  await p.evaluate(()=>{window.__done=0;kmBusy=false;OPT.fxon=true;OPT.fxpick=1});
  await p.evaluate(([f,t])=>{window.toilPor=()=>({src:`img/por-consort-${f}-${t}-a18.webp`});window.toilFigAt=()=>`img/fig-consort-${f}-${t}-a18.webp`;
   S.toilette={day:toilWk()*10,wk:toilWk(),score:80,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:'dep',col:toilColFix(null)};S.toilette.col.seed=toilWk();
   TOIL.test_rev=1;toilReveal({manual:1,look:'dep',made:true,score:80,good:true,pre:''},()=>{window.__done=1})},[f,t]);
  await p.waitForSelector('.ktrv',{timeout:20000});await p.waitForFunction(()=>document.querySelector('.ktrv.ktrv-in'));await p.waitForTimeout(1200);
  await p.evaluate(()=>TOIL_REV.zoom());
  await p.waitForFunction(()=>{const i=document.querySelector('.ktrv-pw img');return i&&i.complete&&i.naturalWidth},null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(1900);
  const r=await p.evaluate(async([file,plateAx])=>{const ov=document.querySelector('.ktrv'),R=ov.getBoundingClientRect(),q=document.querySelector('.ktrv-pw').getBoundingClientRect(),plEl=document.querySelector('.ktrv-plate'),pl=plEl.getBoundingClientRect();
    const vv=await window.__eyeMid(file);if(vv==null)return{err:'no skin '+file};const vis=vv[0],cen=vv[1];
    const bx=parseFloat(getComputedStyle(plEl).backgroundPositionX)/100,RWc=ov.offsetWidth,RHc=ov.offsetHeight,s2=Math.max(RWc/1200,RHc/800),gxIn=((RWc-1200*s2)*bx+plateAx*1200*s2)/RWc;
    const cenS=q.left+cen*q.width,eyes=q.left+vis*q.width,glass=pl.left+gxIn*pl.width,scr=R.left+R.width/2;return{cen:+cenS.toFixed(1),eyes:+eyes.toFixed(1),glass:+glass.toFixed(1),scr:+scr.toFixed(1)}},[`por-consort-${f}-${t}-a18.webp`,plateAx]);
  if(r.err){out.rows.push({ft,err:r.err});bad++}else{r.d=+(r.eyes-r.glass).toFixed(1);r.dc=+(r.cen-r.glass).toFixed(1);sum+=Math.abs(r.dc);if(Math.abs(r.dc)>6||Math.abs(r.d)>30)bad++;out.rows.push(Object.assign({ft},r))}
  if(DIR&&DIR!=='-')await p.screenshot({path:`${DIR}/mc-${W}x${H}-${ft}.jpg`,quality:60});
  await p.click('.ktrv-ov>.kmend');await p.waitForFunction(()=>window.__done===1,null,{timeout:8000}).catch(()=>{});await p.waitForTimeout(400)}
 out.mean=+(sum/out.rows.length).toFixed(1);if(out.mean>4)bad++;out.errs=errs;out.bad=bad;console.log(JSON.stringify(out));await b.close();process.exit(bad||errs.length?1:0)})();
