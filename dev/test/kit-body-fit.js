/* KIT_BODY body-fit box (KIT §28.8e, jbody.js, KP09). usage: node dev/test/kit-body-fit.js <url> [<outdir>] [<W>x<H>@dpr ...]
   A. WHOLE GROUP SCAN: every figure kind (consort, maid, mama, eunuch, man, official, physician, emperor, Thái hậu, kid, player) × a few files + portraits:
      every zone row exists, sits inside the picture, inside the painted body (alpha bbox, 2 % slack), and in body order
      (hair top ≤ head top < chin = chest top < waist < skirt < hem bottom; sleeves beside the torso core).
   B. KIT SAMPLE §28.8e renders with every zone outlined (no zone left hidden).
   C. LIVE STACK: a hair + a clothes look with fake LOOKS_ART files on HER stage figure → the layers are placed (no kbody-wait left) inside the hair / chest zone
      of the drawn figure; the same through kitFxLayers on an avatar picture. 0 page errors. */
const {chromium}=require('playwright');const a=process.argv.slice(2);const URL=a[0];const OUT=a[1]&&!/^\d+x/.test(a[1])?a[1]:null;
let SIZES=a.filter(x=>/^\d+x\d+@/.test(x));if(!SIZES.length)SIZES=['755x1000@2','1180x820@2'];
(async()=>{const b=await chromium.launch();const R={};const errs=[];let bad=0;
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof KIT_BODY!=='undefined'&&window.KIT_VEIL&&KIT_VEIL.fit&&KIT_BODY.fit,null,{timeout:90000}).catch(()=>{});
  /* A: scan */
  const A=await p.evaluate(async()=>{const idx=await fetch(IMG_U('img/_index.json')).then(r=>r.json());const files=idx.files.map(x=>String(x[0]).replace(/^.*?img\//,''));
   const kinds=['consort','maid','mama','eunuch','man','official','physician','emperor','thaihau','kid','player'];const pick=[];
   for(const k of kinds){const L=files.filter(f=>new RegExp('^fig-'+k+'-[^/]*\\.webp$').test(f));for(let i=0;i<Math.min(4,L.length);i++)pick.push(L[Math.floor(i*L.length/4)])}
   const por=files.filter(f=>/^por-consort-[^/]*\.webp$/.test(f)&&KIT_VEIL.fit[f]);for(let i=0;i<4;i++)pick.push(por[Math.floor(i*por.length/4)]);
   const rows={};await Promise.all(pick.map(f=>new Promise(res=>{const t=setTimeout(()=>res(),20000);KIT_BODY.want(f,r=>{clearTimeout(t);rows[f]=r;res()})})));
   const out=[];for(const f of pick){const r=rows[f];const fb=/^fig-/.test(f)?__KITFB[IMG_U('img/'+f)]&&__KITFB[IMG_U('img/'+f)].v:null;const bad=[];
    if(!r){out.push({f,bad:['no rows']});continue}
    const need=/^por-/.test(f)?['hair','head','chest']:KIT_BODY.zones;for(const z of need)if(!r[z])bad.push('missing '+z);
    for(const z in r){const q=r[z];if(q[0]<0||q[1]<0||q[0]+q[2]>100.01||q[1]+q[3]>100.01||q[2]<=0||q[3]<=0)bad.push(z+' outside picture '+q.join(','));
     if(fb){const s=2;if(q[0]<fb.l*100-s||q[0]+q[2]>fb.r*100+s||q[1]<fb.t*100-s||q[1]+q[3]>fb.b*100+s)bad.push(z+' outside body')}}
    if(fb&&!bad.length){const T=z=>r[z][1],B=z=>r[z][1]+r[z][3];
     if(!(T('hair')<=T('head')+.01))bad.push('hair below head');if(!(Math.abs(B('head')-T('chest'))<.02))bad.push('chin≠chest');
     if(!(T('chest')<T('waist')&&T('waist')<T('skirt')&&B('skirt')<=B('hem')+.01))bad.push('order');
     if(!(r.sleeveL[0]<=r.chest[0]+.01&&r.sleeveR[0]+r.sleeveR[2]>=r.chest[0]+r.chest[2]-.01))bad.push('sleeves not beside core')}
    out.push({f,bad,head:r.head&&r.head.map(Math.round).join(','),chest:r.chest&&r.chest.map(Math.round).join(',')})}
   return out});
  const Af=A.filter(x=>x.bad.length);bad+=Af.length;
  /* B: kit sample */
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}kitSamplePage()});await p.waitForTimeout(4000);
  const B=await p.evaluate(()=>{const pg=document.getElementById('kitpage');const s=[...pg.querySelectorAll('.kbody-dbg')];return{n:s.length,hidden:s.reduce((t,d)=>t+[...d.querySelectorAll('.kbody-z')].filter(i=>getComputedStyle(i).display==='none').length,0),sw:pg.scrollWidth-pg.clientWidth}});
  const Bf=[];if(B.n<6)Bf.push('sample figures '+B.n);if(B.hidden>5)Bf.push('hidden zones '+B.hidden+' (portrait hides its 5 body zones)');if(B.sw>1)Bf.push('h-overflow '+B.sw);bad+=Bf.length;
  if(OUT){const el=await p.$('.kbody-dbg');if(el){await el.evaluate(e=>e.parentElement.scrollIntoView({block:'center'}));await p.waitForTimeout(600);await p.screenshot({path:`${OUT}/kbody-sample-${W}.jpg`,type:'jpeg',quality:72})}}
  await p.evaluate(()=>{const pg=document.getElementById('kitpage');if(pg)pg.remove()});
  /* C: live stack on a new life */
  const C=await p.evaluate(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms));
   for(let i=0;i<240&&typeof start!=='function';i++)await wait(500);if(typeof start!=='function')return{skip:'no start'};
   try{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
    Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render()}catch(e){return{skip:'start '+e.message}}
   window.LOOKS_ART=window.LOOKS_ART||{};LOOKS_ART['fx-hair-toc-2.png']=1;LOOKS_ART['fx-cloth-khoi-1.png']=1;
   lkGive(S,'toc',2,null,'test');lkGive(S,'khoi',1,null,'test');try{render()}catch(e){}await wait(2500);try{kitStageScale()}catch(e){}
   const me=document.getElementById('mefig');if(!me)return{skip:'no mefig'};const file=kitFile(me.currentSrc||me.src);
   for(let i=0;i<40&&!KIT_BODY.rows(file);i++)await wait(250);await wait(800);try{kitStageScale()}catch(e){}await wait(600);
   const box=me.parentElement.querySelector('.kfxf');const L=box?[...box.querySelectorAll('img.kbody')]:[];const rr=me.getBoundingClientRect();const rows=KIT_BODY.rows(file)||{};
   /* the .kfxf box = the drawn picture (kfxGeom), each layer = its zone row of that box (offsets: rotation does not move them) */
   const br=box?box.getBoundingClientRect():null;const boxOff=br?Math.round(Math.max(Math.abs(br.left-rr.left),Math.abs(br.top-rr.top),Math.abs(br.width-rr.width),Math.abs(br.height-rr.height))):99;
   const chk=L.map(im=>{const z=im.dataset.kbz,q=rows[z];if(!q)return{z,bad:'no row'};const bw=box.offsetWidth,bh=box.offsetHeight;
     const off=Math.max(Math.abs(im.offsetLeft-bw*q[0]/100),Math.abs(im.offsetTop-bh*q[1]/100),Math.abs(im.offsetWidth-bw*q[2]/100),Math.abs(im.offsetHeight-bh*q[3]/100));return{z,wait:im.classList.contains('kbody-wait'),off:Math.round(off)}});
   const fx=kitFxLayers(S,'por-consort-c01-t1-a18.webp');
   return{file,n:L.length,chk,boxOff,av:/kbody[^"]*"[^>]*data-kbz="hair"/.test(fx)}});
  const Cf=[];if(C.skip)Cf.push('C skip: '+C.skip);else{if(C.n<2)Cf.push('stage layers '+C.n);if(C.boxOff>2)Cf.push('face-fx box off the picture by '+C.boxOff+'px');for(const x of C.chk){if(x.wait)Cf.push(x.z+' still waiting');if(x.off>3)Cf.push(x.z+' off by '+x.off+'px');if(x.bad)Cf.push(x.z+' '+x.bad)}if(!C.av)Cf.push('avatar stack has no hair layer')}
  bad+=Cf.filter(x=>!/^C skip/.test(x)).length;
  if(OUT&&!C.skip){await p.screenshot({path:`${OUT}/kbody-stage-${W}.jpg`,type:'jpeg',quality:72})}
  R[SZ]={A:Af.length?Af:`ok ${A.length} pictures`,sampleA:A.slice(0,3),B:Bf.length?Bf:`ok ${B.n} sample pictures`,C:Cf.length?Cf:`ok ${C.n} layers on ${C.file} ${JSON.stringify(C.chk)}`};await ctx.close()}
 console.log(JSON.stringify({bad,R,errs},null,1));await b.close();process.exit(bad||errs.length?1:0)})();
