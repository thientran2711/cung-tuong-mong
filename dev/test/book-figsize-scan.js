/* book-figsize-scan.js — owner 18/11 "Cái gì mà mỗi người một size vậy trời?" (KIT 34.6): every figure on a Tuần lục person page must show the SAME body height
   (head top .. feet, headdress may rise above) for the same fac. Scans a list of figure kinds x viewports and prints measured body px; exit 1 when the spread of
   the same-fac group exceeds 3 %.   usage: node dev/test/book-figsize-scan.js <index.html> <cases.json> [outdir]   env SZ=[[W,H],..] SHOTS=1 CASES=name,name */
const {chromium}=require('playwright');const fs=require('fs');const [,,SRC,CJ,OUT]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];let CASES=JSON.parse(fs.readFileSync(CJ));if(process.env.CASES)CASES=CASES.filter(c=>process.env.CASES.split(',').includes(c[0]));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let bad=0;const html=fs.readFileSync(SRC);
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:process.env.SHOTS?+(process.env.DSF||2):1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1;let s=12345;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitBook==='function',null,{timeout:120000});
  await p.evaluate((HERF)=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;{const k1=kitFigOf,HER=HERF;window.kitFigOf=kitFigOf=function(q){if(q===S&&HER)return IMG_BASE+'img/'+HER;return k1.apply(this,arguments)}}
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}},process.env.HER||'fig-consort-c32-tcold-a18.webp');
  await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(5000);const rows=[];
  for(const [name,FIG] of CASES){
   const r=await p.evaluate(async([name,FIG])=>{
    const k0=window.__k0||(window.__k0=kitFigOf);const sil=FIG.startsWith('SIL:');
    window.kitFigOf=kitFigOf=function(q){if(q&&q.__t)return sil?'':FIG==='SELF'?k0.apply(this,arguments):IMG_BASE+FIG;return k0.apply(this,arguments)};
    const who=FIG==='SELF'?S:Object.assign({},S.thO||{kind:'th',name:'Thái hậu',age:60},{age:(/fig-kid|SIL:k/.test(FIG)?10:60),__t:1,name:sil?'???':'Nhân vật'});if(FIG==='SIL:m')who.sex='m';
    let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
    const facts=[];for(let i=0;i<4;i++)facts.push({text:`Mục${i}: khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung.`,kind:'world',auto:false});
    kitBook({pages:[{kind:'person',who,title:'Thử',blocks:[{facts}],n:4}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}});
    const t0=Date.now();while(Date.now()-t0<25000){const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent);const i=f&&f.querySelector('img');if(i&&i.complete&&i.naturalWidth&&f.style.visibility!=='hidden')break;await new Promise(r=>setTimeout(r,200))}
    await new Promise(r=>setTimeout(r,2000));
    const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent&&e.closest('.kbk-sheet')&&e.closest('.kbk-sheet').style.transform==='')||document.querySelector('#dawn .kbk-person.kbk-full .kesfi');
    if(!f)return{err:'no figure'};const im=f.querySelector('img'),src=im.getAttribute('src'),b=await new Promise(res=>{const v=kitFigBody(src,()=>res(kitFigBody(src)));if(v)res(v)});
    const r=im.getBoundingClientRect(),por=f.closest('.kbk-por').getBoundingClientRect(),bt=kitFigTop(b);
    const cl0=b.cl!=null?b.cl:b.l,cr0=b.cr!=null?b.cr:b.r,FL=r.left+cl0*r.width,FR=r.left+cr0*r.width;/* body core (torso/skirt column, KIT 32.2) must stay whole = face + body whole */
    return{colX:por.left,colWd:por.width,face:Math.max(0,por.left-FL)+Math.max(0,FR-por.right),emp:/fig-emperor-/.test(src),kid:/fig-kid|unknown-fig-k/.test(src),src:src.split('/').pop(),fac:KIT_FIG.fac(src),body:(b.b-bt)*r.height,col:por.height,colW:por.width,figW:(b.r-b.l)*r.width,kcrop:f.dataset.kcrop||'0',topcut:Math.max(0,por.top-(r.top+b.t*r.height)),crop:(()=>{const pg=por,sil=/unknown-fig-/.test(src),L=r.left+(sil?0:b.l)*r.width,R=r.left+(sil?1:b.r)*r.width;return Math.max(0,pg.left-L)+Math.max(0,R-pg.right)})(),ovl:(()=>{const sil=/unknown-fig-/.test(src),L=Math.max(por.left,r.left+(sil?0:b.l)*r.width),R=Math.min(por.right,r.left+(sil?1:b.r)*r.width);let n=0;f.closest('.kbk-person').querySelectorAll('.kbk-phead *,.kbk-flow *').forEach(e=>{if(e.children.length||!(e.textContent||'').trim())return;const q=e.getBoundingClientRect();if(q.width&&q.right>L&&q.left<R&&q.bottom>r.top&&q.top<r.bottom)n++});return n})(),over:f.dataset.kover||'0',fit:f.dataset.kfit||'',foot:por.bottom-(r.top+b.b*r.height),dbg:f.dataset.kdbg||'',asp:(r.width/r.height)/(im.naturalWidth/im.naturalHeight)}},[name,FIG]);
   r.name=name;rows.push(r);
   if(process.env.SHOTS&&OUT){await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=c.id==='dawn'?'visible':'hidden'});await p.screenshot({path:`${OUT}/${W}x${H}-${name}.jpg`,type:'jpeg',quality:60});{const bx=await p.evaluate(()=>{const e=document.querySelector('#dawn .kbk-sheet .kbk-por')||document.querySelector('#dawn .kbk-por');const r=e.getBoundingClientRect();return[r.x,r.y,r.width,r.height]});await p.screenshot({path:`${OUT}/${W}x${H}-${name}-col.png`,clip:{x:Math.max(0,bx[0]-10),y:Math.max(0,bx[1]-10),width:bx[2]+20,height:bx[3]+20}})}await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=''})}}
  const f1=x=>x==null?'-':(+x).toFixed(1);
  for(const r of rows)console.log(`${W}x${H} ${(r.name||'').padEnd(30)} ${r.err||`fac ${r.fac.toFixed(2)} body ${f1(r.body)} (${(r.body/r.col).toFixed(3)} col${f1(r.col)}) figW ${f1(r.figW)}/colW ${f1(r.colW)} foot ${f1(r.foot)} src ${r.src} crop ${f1(r.crop)} face ${f1(r.face)} topcut ${f1(r.topcut)} over ${r.over} textOvl ${r.ovl}${r.fit?' FIT '+r.fit:''} asp ${r.asp.toFixed(3)} ${r.dbg}`}`);
  const grp={};rows.filter(r=>!r.err).forEach(r=>{const k=r.fac.toFixed(2);(grp[k]=grp[k]||[]).push(r.body)});
  for(const k in grp){const a=grp[k],sp=(Math.max(...a)-Math.min(...a))/Math.max(...a);console.log(`${W}x${H} fac ${k}: n ${a.length} min ${Math.min(...a).toFixed(1)} max ${Math.max(...a).toFixed(1)} spread ${(sp*100).toFixed(1)} %`);if(sp>.03)bad++}
  {const ok=rows.filter(r=>!r.err),x0=ok[0];
   for(const r of ok){if(Math.abs(r.colX-x0.colX)>.6||Math.abs(r.colWd-x0.colWd)>.6){bad++;console.log('FAIL column x/width',r.name,r.colX,r.colWd,'vs',x0.colX,x0.colWd)}
    if(r.foot<-1){bad++;console.log('FAIL feet cut',r.name,r.foot)}if(r.topcut>1){bad++;console.log('FAIL head/crown cut at column top',r.name,r.topcut)}if(r.face>1){bad++;console.log('FAIL face crop',r.name,r.face)}if(r.ovl){bad++;console.log('FAIL text overlap',r.name,r.ovl)}}
   const me=ok.find(r=>r.name==='SELF');if(me){const std=me.body/me.fac;
    for(const r of ok){const rel=r.body/r.fac/std;if(r.emp)continue;if(r.kid){if(rel>.99){bad++;console.log('FAIL kid not child-size',r.name,rel.toFixed(3))}}else if(Math.abs(rel-1)>.01){bad++;console.log('FAIL adult height vs hers',r.name,(rel*100).toFixed(1)+' %')}}
    const em=ok.filter(r=>r.emp).map(r=>(r.body/r.fac/std*100).toFixed(0)+'%');if(em.length)console.log(W+'x'+H,'emperor vs hers (as live, fitted to column):',em.join(' '))}}
  for(const r of rows)if(!r.err&&r.fit){bad++;console.log('FAIL fit',r.name,r.fit)}
  for(const r of rows)if(!r.err&&Math.abs(r.asp-1)>.01){bad++;console.log('FAIL aspect',r.name,r.asp)}
  await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
