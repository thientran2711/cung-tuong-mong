/* mg-color regression — node dev/test/mg-color.js [dev/index.html] [--shots=<dir OUTSIDE the repo>]
   Owner bug OD 25/11 ~23:05Z ("cả 8 cuộn chỉ cùng màu một đỏ thì tao biết chọn cái màu gì"): the painted spool sprite (mg-theu-spool.webp, red) was drawn
   INSTEAD of the tinted stand-in, so every spool showed the painter's red. This test plays Công «Thêu theo nét» on Fold 755x1000 and iPad 1180x820 with the
   real CDN pictures and, at every «pick» moment, reads the SCREEN pixels at each spool (KG82.choices = spool place + the shade it stands for):
     1 each spool shows its own shade (screen colour within TOL of its shade; the red sprite fails at once);
     2 the spools are visually distinct: no two on screen are the same colour (pairwise ≥ MIN), and the right one differs from every other;
     3 exactly one spool is the lit band's shade;
     4 the hint button (the kit sign «?», OD 20/11 ~05:10Z no words in play) is not empty: it carries its word in aria-label and, pressed, rings a spool.
   Exit 1 on any failure. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const A=process.argv.slice(2);const pos=A.filter(a=>!a.startsWith('--'));const URL0=pos[0]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const SH=(A.find(a=>a.startsWith('--shots='))||'').split('=')[1];if(SH)fs.mkdirSync(SH,{recursive:true});
const TOL=70,MIN=14;let fail=0;const bad=m=>{fail++;console.log('FAIL',m)};
(async()=>{const b=await chromium.launch();
 for(const [dn,w,h] of [['fold',755,1000],['ipad',1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.rank=6;try{render()}catch(e){}});
  await p.waitForTimeout(2000);
  await p.evaluate(()=>{try{kitReward=()=>{};kmPush=()=>{}}catch(e){}document.querySelectorAll('#kmrew').forEach(e=>{const o=e.closest('.kmstage')||e;o.remove()});document.querySelectorAll('.kmstage,.km-stage').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;TDS.busy=false;tdPlay("cong","self")});
  await p.waitForTimeout(1200);await p.evaluate(()=>{const g=document.querySelector('.kgr-go');if(g)g.click()});
  /* wait for the painted spool to be loaded (the bug only shows with the real picture) */
  await p.waitForFunction(()=>typeof kg82Ok==='function'&&kg82Ok('theu-spool'),null,{timeout:20000}).catch(()=>bad(dn+': mg-theu-spool.webp never loaded (CDN)'));
  let picks=0,hintOk=false;const t0=Date.now();
  while(picks<4&&Date.now()-t0<150000){
   /* only when the board is really on top at every spool (no boot / loading overlay over it) */
   const ch=await p.evaluate(()=>{const c=KG82.choices&&KG82.choices();if(!c)return null;const cv=document.querySelector('#kg82box canvas');return c.every(q=>document.elementFromPoint(q.x,q.y)===cv)?c:null});
   if(ch&&ch.length){await p.waitForTimeout(250);const ch2=await p.evaluate(()=>KG82.choices&&KG82.choices());if(!ch2)continue;
    const buf=await p.screenshot();
    const img=await p.evaluate(async({b64,pts})=>{const im=new Image();im.src='data:image/png;base64,'+b64;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
      return pts.map(q=>{const d=x.getImageData(Math.round(q.x)-3,Math.round(q.y)-3,7,7).data;let r=0,g=0,bb=0;for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];bb+=d[i+2]}const n=d.length/4;return[r/n,g/n,bb/n].map(Math.round)})},{b64:buf.toString('base64'),pts:ch2});
    const dist=(a,c)=>Math.abs(a[0]-c[0])+Math.abs(a[1]-c[1])+Math.abs(a[2]-c[2]);
    ch2.forEach((s,i)=>{const d=dist(img[i],s.c);if(d>TOL)bad(`${dn} pick ${picks+1}: spool ${i} shows rgb(${img[i]}) but stands for rgb(${s.c}) (Δ ${d})`)});
    for(let i=0;i<img.length;i++)for(let j=i+1;j<img.length;j++){const d=dist(img[i],img[j]);if(d<MIN)bad(`${dn} pick ${picks+1}: spools ${i} and ${j} look the same on screen (Δ ${d})`)}
    const R=ch2.filter(s=>s.right).length;if(R!==1)bad(`${dn} pick ${picks+1}: ${R} spools match the lit band (want exactly 1)`);
    const minR=Math.min(...ch2.map((s,i)=>s.right?1e9:dist(img[i],img[ch2.findIndex(t=>t.right)])));
    console.log(`${dn} pick ${picks+1}: ${ch2.length} spools, screen colours ${img.map(c=>'('+c+')').join(' ')}; nearest to the right one Δ ${minR}`);
    if(SH)await p.screenshot({path:`${SH}/mg-color-theu-${dn}-pick${picks+1}.png`});
    if(!hintOk){const hb=await p.evaluate(()=>{const e=document.querySelector('#tdhint');return e?{t:e.textContent.trim(),a:e.getAttribute('aria-label')||''}:null});
     if(!hb)bad(dn+': no hint button');else{if(!hb.t||!hb.a)bad(`${dn}: hint button empty (text «${hb.t}», aria «${hb.a}»)`);
      await p.evaluate(()=>document.querySelector('#tdhint').click());await p.waitForTimeout(150);const ring=await p.evaluate(()=>document.querySelectorAll('.tdring').length);if(!ring)bad(dn+': hint «?» pressed in the pick step shows nothing');hintOk=true}}
    picks++;
    /* play on: the right spool, then the stitches by the oracle, until the next pick */
    await p.evaluate(async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const fire=(x,y)=>{const cv=document.querySelector('#kg82box canvas');cv.dispatchEvent(new PointerEvent('pointerdown',{clientX:x,clientY:y,pointerId:1,pointerType:'touch',isPrimary:true,bubbles:true}))};
     CRAFT.speed=2;const pk=KG82.peek();if(pk&&pk.x!=null)fire(pk.x,pk.y);const end=performance.now()+20000;await sl(50);
     while(performance.now()<end&&!(KG82.choices&&KG82.choices())&&KG82.phase==='play'){await sl(8);const q=KG82.peek&&KG82.peek();if(!q||q.x==null)continue;if(q.at!=null){const t=crNow()+q.at;while(crNow()<t)await sl(2)}fire(q.x,q.y);await sl(60)}CRAFT.speed=1});
   }else await p.waitForTimeout(200)}
  if(picks<4)bad(`${dn}: only ${picks} pick steps seen`);
  if(errs.length)bad(dn+' page errors '+errs.slice(0,3).join(' | '));
  await p.evaluate(()=>{try{kg82Close()}catch(e){}});await p.close()}
 await b.close();console.log(fail?`mg-color: ${fail} FAIL`:'mg-color: PASS');process.exit(fail?1:0)})();
