/* book-figsize-scan.js — owner 18/11 "Cái gì mà mỗi người một size vậy trời?" (KIT 34.6): every figure on a Tuần lục person page must show the SAME body height
   (head top .. feet, headdress may rise above) for the same fac. Scans a list of figure kinds x viewports and prints measured body px; exit 1 when the spread of
   the same-fac group exceeds 3 %.   usage: node dev/test/book-figsize-scan.js <index.html> <cases.json> [outdir]   env SZ=[[W,H],..] SHOTS=1 CASES=name,name */
const {chromium}=require('playwright');const fs=require('fs');const [,,SRC,CJ,OUT]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];let CASES=JSON.parse(fs.readFileSync(CJ));if(process.env.CASES)CASES=CASES.filter(c=>process.env.CASES.split(',').includes(c[0]));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let bad=0;const html=fs.readFileSync(SRC);
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:process.env.SHOTS?+(process.env.DSF||2):1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitBook==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}});
  await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(5000);const rows=[];
  for(const [name,FIG] of CASES){
   const r=await p.evaluate(async([name,FIG])=>{
    const k0=window.__k0||(window.__k0=kitFigOf);const sil=FIG.startsWith('SIL:');
    window.kitFigOf=kitFigOf=function(q){if(q&&q.__t)return sil?'':FIG==='SELF'?k0.apply(this,arguments):IMG_BASE+FIG;return k0.apply(this,arguments)};
    const who=FIG==='SELF'?S:Object.assign({},S.thO||{kind:'th',name:'Thái hậu',age:60},{__t:1,name:sil?'???':'Nhân vật'});if(FIG==='SIL:m')who.sex='m';
    let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
    const facts=[];for(let i=0;i<4;i++)facts.push({text:`Mục${i}: khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung.`,kind:'world',auto:false});
    kitBook({pages:[{kind:'person',who,title:'Thử',blocks:[{facts}],n:4}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}});
    const t0=Date.now();while(Date.now()-t0<25000){const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent);const i=f&&f.querySelector('img');if(i&&i.complete&&i.naturalWidth&&f.style.visibility!=='hidden')break;await new Promise(r=>setTimeout(r,200))}
    await new Promise(r=>setTimeout(r,2000));
    const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent&&e.closest('.kbk-sheet')&&e.closest('.kbk-sheet').style.transform==='')||document.querySelector('#dawn .kbk-person.kbk-full .kesfi');
    if(!f)return{err:'no figure'};const im=f.querySelector('img'),src=im.getAttribute('src'),b=await new Promise(res=>{const v=kitFigBody(src,()=>res(kitFigBody(src)));if(v)res(v)});
    const r=im.getBoundingClientRect(),por=f.closest('.kbk-por').getBoundingClientRect(),bt=kitFigTop(b);
    return{src:src.split('/').pop(),fac:KIT_FIG.fac(src),body:(b.b-bt)*r.height,col:por.height,colW:por.width,figW:(b.r-b.l)*r.width,crop:(()=>{const sil=/unknown-fig-/.test(src),L=r.left+(sil?0:b.l)*r.width,R=r.left+(sil?1:b.r)*r.width;return Math.max(0,por.left-L)+Math.max(0,R-por.right)})(),fit:f.dataset.kfit||'',foot:por.bottom-(r.top+b.b*r.height),dbg:f.dataset.kdbg||'',asp:(r.width/r.height)/(im.naturalWidth/im.naturalHeight)}},[name,FIG]);
   r.name=name;rows.push(r);
   if(process.env.SHOTS&&OUT){await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=c.id==='dawn'?'visible':'hidden'});await p.screenshot({path:`${OUT}/${W}x${H}-${name}.jpg`,type:'jpeg',quality:60});{const bx=await p.evaluate(()=>{const e=document.querySelector('#dawn .kbk-sheet .kbk-por')||document.querySelector('#dawn .kbk-por');const r=e.getBoundingClientRect();return[r.x,r.y,r.width,r.height]});await p.screenshot({path:`${OUT}/${W}x${H}-${name}-col.png`,clip:{x:Math.max(0,bx[0]-10),y:Math.max(0,bx[1]-10),width:bx[2]+20,height:bx[3]+20}})}await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=''})}}
  const f1=x=>x==null?'-':(+x).toFixed(1);
  for(const r of rows)console.log(`${W}x${H} ${(r.name||'').padEnd(30)} ${r.err||`fac ${r.fac.toFixed(2)} body ${f1(r.body)} (${(r.body/r.col).toFixed(3)} col${f1(r.col)}) figW ${f1(r.figW)}/colW ${f1(r.colW)} foot ${f1(r.foot)} crop ${f1(r.crop)}${r.fit?' FIT '+r.fit:''} asp ${r.asp.toFixed(3)} ${r.dbg}`}`);
  const grp={};rows.filter(r=>!r.err).forEach(r=>{const k=r.fac.toFixed(2);(grp[k]=grp[k]||[]).push(r.body)});
  for(const k in grp){const a=grp[k],sp=(Math.max(...a)-Math.min(...a))/Math.max(...a);console.log(`${W}x${H} fac ${k}: n ${a.length} min ${Math.min(...a).toFixed(1)} max ${Math.max(...a).toFixed(1)} spread ${(sp*100).toFixed(1)} %`);if(sp>.03)bad++}
  for(const r of rows)if(!r.err&&(r.crop>1||r.fit)){bad++;console.log('FAIL crop/fit',r.name,r.crop,r.fit)}
  for(const r of rows)if(!r.err&&Math.abs(r.asp-1)>.01){bad++;console.log('FAIL aspect',r.name,r.asp)}
  await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
