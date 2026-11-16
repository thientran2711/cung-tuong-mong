/* book-figwide.js — Tuần lục person pages with WIDE figures (KIT §56.3; review r8 FAIL 1+3).
   usage: node dev/test/book-figwide.js <build url | page.html> <outdir>   (env FIGS=a.webp,b.webp  N=14 facts  SZ=[[W,H],…]  SHOTS=1)
   Per size × figure, over EVERY page of the person: text cut (fact or heading below its box), text column width (≥ 220 px, or ≥ a normal figure's text width where the page is too small for 220), words broken
   across lines, facts per page (≥ 2 except the last), figure height / picture height (≥ 0.85), figure scaled (must not), page-1 heading
   shows the name, and on the page in view: face + torso (head centre ± 12 % of figure height) clear of the text (≥ 0 px), body never past the page's left
   edge (trainPastLeft = outer train/sleeve beyond it, allowed). Exit 1 on any failure. */
const {chromium}=require('playwright');const fs=require('fs');const [,,SRC,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const FIGS=(process.env.FIGS||'fig-thaihau-h1-a51.webp,fig-thaihau-h3-a51.webp,fig-thaihau-h2-a51.webp,fig-maid-m33-t7-a18.webp,fig-consort-c10-t8-a18.webp').split(',');
const N=+(process.env.N||14);const NORMAL='fig-consort-c01-t1-a18.webp';   /* reference: a normal standing figure — text may never be narrower than on its page */const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1000,755],[1180,820],[1366,1024]];
const isFile=!/^https?:/.test(SRC);
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let bad=0;
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});
  await ctx.addInitScript(()=>{window.__bot=1});
  if(isFile)await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:fs.readFileSync(SRC),contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  await p.goto(isFile?'http://ctm.test/index.html':SRC+'index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitBook==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}});
  await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(8000);   /* warm up (review r9): the book's paper art + fonts load as in a real game before the first book opens; a cold book is measured mid-load (transient 199–202 px) */
  const NORMW=globalThis.NORMW||(globalThis.NORMW={});
  for(const FIG of [NORMAL,...FIGS]){
   const r=await p.evaluate(async([FIG,N])=>{
    const k0=window.__k0||(window.__k0=kitFigOf);window.kitFigOf=kitFigOf=function(q){if(q&&(q===S.thO||q.kind==='th'))return (typeof IMG_BASE==='string'?IMG_BASE:'')+'img/'+FIG;return k0.apply(this,arguments)};
    const who=S.thO||{kind:'th',name:'Thái hậu',age:60};
    let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
    const facts=[];for(let i=0;i<N;i++)facts.push({text:`Mục${i}: Thái hậu ban thưởng, khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung cho phải phép.`,kind:'world',auto:false});
    const bk=kitBook({pages:[{kind:'person',who,title:'Thái hậu',blocks:[{facts}],n:N}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}});
    const t0=Date.now();while(Date.now()-t0<20000){const im=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesimg')].find(e=>e.offsetParent);if(im&&im.complete&&im.naturalWidth)break;await new Promise(r=>setTimeout(r,200))}
    await new Promise(r=>setTimeout(r,1800));
    const pages=[...document.querySelectorAll('#dawn .kbk-book .kbk-pg')].filter(pg=>pg.querySelector('.kbk-person'));
    const res={pages:pages.length,textCut:0,minTextW:1e9,broken:0,minFacts:1e9,lastFacts:0,minH:1e9,scaled:0,name1:false};
    pages.forEach((pg,ix)=>{const box=pg.querySelector('.kbk-person'),fl=box.querySelector('.kbk-flow'),hd=box.querySelector('.kbk-phead'),por=box.querySelector('.kbk-por'),fi=box.querySelector('.kesfi');
     res.textCut=Math.max(res.textCut,fl.scrollHeight-fl.clientHeight,hd.scrollHeight-hd.clientHeight);
     const ft=fl.getBoundingClientRect(),sy=ft.height/Math.max(1,fl.offsetHeight)||1;for(const c of fl.children){const cr=c.getBoundingClientRect();res.textCut=Math.max(res.textCut,Math.round((cr.bottom-ft.top)/sy-fl.clientHeight))}   /* rect ratio undoes the page-turn transform */
     res.minTextW=Math.min(res.minTextW,fl.clientWidth);const nf=fl.children.length;if(ix<pages.length-1)res.minFacts=Math.min(res.minFacts,nf);else res.lastFacts=nf;
     if(fi&&por){res.minH=Math.min(res.minH,fi.offsetHeight/por.offsetHeight);if(/scale|matrix\((?!1, 0, 0, 1)/.test(fi.style.transform||''))res.scaled++}
     if(ix===0){const nm=hd.querySelector('.kbk-pname');res.name1=!!(nm&&/Thái hậu/.test(nm.textContent)&&nm.offsetHeight>0&&hd.scrollHeight<=hd.clientHeight+1)}
     const tw=document.createTreeWalker(fl,NodeFilter.SHOW_TEXT);let n;while((n=tw.nextNode())){const re=/\S+/g;let m;while((m=re.exec(n.data))){const rg=document.createRange();rg.setStart(n,m.index);rg.setEnd(n,m.index+m[0].length);const rs=[...rg.getClientRects()].filter(x=>x.width>0);if(rs.length>1&&Math.abs(rs[0].top-rs[rs.length-1].top)>2)res.broken++}}});
    if(res.minFacts===1e9)res.minFacts=res.lastFacts;
    const im=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesimg')].find(e=>e.offsetParent&&getComputedStyle(e.closest('.kbk-sheet')).visibility!=='hidden'&&e.closest('.kbk-sheet').style.transform==='');
    if(im){const box=im.closest('.kbk-person'),fl=box.querySelector('.kbk-flow'),hd=box.querySelector('.kbk-phead'),rr=im.getBoundingClientRect(),bb=box.getBoundingClientRect();
     const hx=(window.__figHX||{})[im.getAttribute('src')];res.hx=hx;const bx=rr.left+(hx!=null?hx:.5)*rr.width;
     res.torsoClear=Math.round(Math.min(fl.getBoundingClientRect().left,hd.getBoundingClientRect().left)-(bx+.12*rr.height));res.trainPastLeft=Math.round(Math.max(0,bb.left-rr.left));res.cutL=Math.round(Math.max(0,bb.left-(bx-.12*rr.height)));const pr=box.querySelector('.kbk-por').getBoundingClientRect(),clip=getComputedStyle(box.querySelector('.kbk-por')).overflow!=='visible';const visR=clip?Math.min(rr.right,pr.right):rr.right;res.overText=Math.round(Math.max(0,visR-Math.min(fl.getBoundingClientRect().left,hd.getBoundingClientRect().left)));res.faceIn=bx-.06*rr.height>=pr.left-1&&bx+.06*rr.height<=pr.right+1}
    res.minH=+res.minH.toFixed(3);const lb=document.querySelector('#dawn .kbk-person');res.col=lb&&lb.style.gridTemplateColumns||'';res.kfr=lb&&lb.style.getPropertyValue('--kfr')||'';return res},[FIG,N]);
   if(FIG===NORMAL&&!NORMW[`${W}x${H}`])NORMW[`${W}x${H}`]=r.minTextW;const fail=[];if(r.textCut>1)fail.push('text cut '+r.textCut);const norm=NORMW[`${W}x${H}`];if(r.minTextW<Math.min(220,norm||220)-2)fail.push('text '+r.minTextW+'px (normal figure '+norm+')');if(r.broken)fail.push(r.broken+' broken words');
   if(r.pages>1&&r.minFacts<2)fail.push('1 fact/page');if(r.minH<0.849)fail.push('height '+r.minH);if(r.scaled)fail.push('scaled');if(!r.name1)fail.push('no name p1');
   if(r.torsoClear!=null&&r.torsoClear<0)fail.push('torso '+r.torsoClear);if(r.cutL)fail.push('body cut on the left '+r.cutL);if(r.overText>2)fail.push('figure under the text '+r.overText);if(r.faceIn===false)fail.push('face cut');
   if(fail.length)bad++;console.log(`${W}x${H} ${FIG.padEnd(30)} ${fail.length?'FAIL '+fail.join(', '):'ok'}  ${JSON.stringify(r)}`);
   if(process.env.SHOTS){await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=c.id==='dawn'?'visible':'hidden'});await p.screenshot({path:`${OUT}/${W}x${H}-${FIG.replace('.webp','')}.jpg`,type:'jpeg',quality:60});await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=''})}}
  if(errs.length){bad++;console.log(`${W}x${H} page errors`,errs.slice(0,3))}await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
