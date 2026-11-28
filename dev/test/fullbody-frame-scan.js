/* fullbody-frame-scan.js — owner 18/11 ~06:45Z/06:55Z (full-body frame redo): on a Tuần lục person page the whole painted figure must sit INSIDE the figure frame
   (aspect kept, nothing cut). Measures frame / painted figure / text column per case and viewport; exit 1 on any cut or squeeze.
   usage: node dev/test/fullbody-frame-scan.js <index.html> <outdir>   env SZ=[[W,H],..] SHOTS=1 CASES=name,name */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
const C3=n=>['c03-t'+n,'img/_review/consort-tiers/c03/b8/c03_a18_t'+n+'.png'];
const C3HT=process.env.C3HT?JSON.parse(require('fs').readFileSync(process.env.C3HT)):{};/* skull tops of the c03 review canvases (not in img/fig-ht.json yet): MediaPipe, headtop.py method */
let CASES=[C3(1),C3(6),C3(8),['hoang-hau','img/fig-thaihau-1.webp'],['crown-tallest','img/fig-maid-m50-t8-a18.webp'],['widest-robe','img/fig-maid-m48-t8-a51.webp'],['old-maid-wide','img/fig-maid-m50-t6-a51.webp'],['man','img/fig-man-bacdich-1-a36.webp'],['old-emperor','img/fig-emperor-a18-1.webp'],['SELF','SELF']];
if(process.env.CASES)CASES=CASES.filter(c=>process.env.CASES.split(',').includes(c[0]));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let bad=0;const html=fs.readFileSync(SRC);
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:process.env.SHOTS?+(process.env.DSF||2):1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1;let s=12345;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitBook==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}});
  await p.evaluate(async h=>{const t0=Date.now();while(!(window.__KITHT&&window.__KITHT.m)&&Date.now()-t0<20000)await new Promise(r=>setTimeout(r,200));if(window.__KITHT&&window.__KITHT.m)Object.assign(window.__KITHT.m,h)},C3HT);await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(4000);const rows=[];CASES=[['warmup',CASES[0][1]],['warmup',CASES[0][1]],...CASES];
  for(const [name,FIG] of CASES){
   const r=await p.evaluate(async([name,FIG])=>{
    const k0=window.__k0||(window.__k0=kitFigOf);
    window.kitFigOf=kitFigOf=function(q){if(q&&q.__t&&FIG!=='SELF')return IMG_BASE+FIG;return k0.apply(this,arguments)};
    const self=FIG==='SELF';const who=self?S:Object.assign({},S.thO||{kind:'th',name:'Thái hậu',age:60},{age:36,__t:1,name:'Nhân vật'});
    let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
    const facts=[];for(let i=0;i<7;i++)facts.push({text:`Mục${i}: khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung, nhớ mang theo khăn lụa và quạt nhỏ khi vào yến tiệc.`,kind:'world',auto:false});
    kitBook({pages:[{kind:'person',who,title:'Thử',blocks:[{facts}],n:4}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}});
    const t0=Date.now();while(Date.now()-t0<25000){const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent);const i=f&&f.querySelector('img');if(i&&i.complete&&i.naturalWidth&&f.style.visibility!=='hidden')break;await new Promise(r=>setTimeout(r,200))}
    await new Promise(r=>setTimeout(r,2200));
    const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent&&e.closest('.kbk-sheet')&&e.closest('.kbk-sheet').style.transform==='')||document.querySelector('#dawn .kbk-person.kbk-full .kesfi');
    if(!f)return{err:'no figure'};const im=f.querySelector('img'),src=im.getAttribute('src'),b=await new Promise(res=>{const v=kitFigBody(src,()=>res(kitFigBody(src)));if(v)res(v)});
    const r=im.getBoundingClientRect(),por=f.closest('.kbk-por').getBoundingClientRect(),ph=f.closest('.kbk-person').querySelector(':scope>.kbk-phead').getBoundingClientRect(),pg=f.closest('.kbk-pg').getBoundingClientRect(),inEl=f.closest('.kbk-in'),rhE=inEl&&inEl.querySelector(':scope>.kbk-rh'),rhB=rhE?rhE.getBoundingClientRect().bottom:por.top;
    const L=r.left+b.l*r.width,R=r.left+b.r*r.width,T=r.top+b.t*r.height,B=r.top+b.b*r.height,sk=r.top+kitFigTop(b)*r.height;
    let ovl=0;f.closest('.kbk-person').querySelectorAll('.kbk-phead *,.kbk-flow *').forEach(e=>{if(e.children.length||!(e.textContent||'').trim())return;const q=e.getBoundingClientRect();if(q.width&&q.right>L+.5&&q.left<R-.5&&q.bottom>T&&q.top<B)ovl++});
    return{src:src.split('/').pop(),kb:+f.dataset.kbody,colW:por.width,colH:por.height,figW:R-L,figH:B-T,text:ph.width,crownGap:T-rhB,skullGap:sk-rhB,feetGap:por.bottom-B,shift:+f.dataset.kshift||0,spreadR:Math.max(0,R-por.right),cutPg:Math.max(0,pg.left-L)+Math.max(0,R-pg.right)+Math.max(0,B-pg.bottom),ovl,asp:(r.width/r.height)/(im.naturalWidth/im.naturalHeight)}},[name,FIG]);
   r.name=name;rows.push(r);
   if(process.env.SHOTS&&OUT){await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=c.id==='dawn'?'visible':'hidden'});await p.screenshot({path:`${OUT}/${W}x${H}-${name}.jpg`,type:'jpeg',quality:70});await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=''})}}
  for(let i=rows.length-1;i>=0;i--)if(rows[i].name==='warmup')rows.splice(i,1);
  const f1=x=>(+x).toFixed(1);
  for(const r of rows){console.log(`${W}x${H} ${r.name.padEnd(14)} ${r.err||`skull>feet ${f1(r.kb)} | fig ${f1(r.figW)}x${f1(r.figH)} col ${f1(r.colW)}x${f1(r.colH)} text ${f1(r.text)} | crown gap ${f1(r.crownGap)} (skull gap ${f1(r.skullGap)}) feet ${f1(r.feetGap)} above col floor (moved down ${r.shift}) | spreads over text ${f1(r.spreadR)} px, text lines under figure ${r.ovl} | cut ${f1(r.cutPg)} squeeze ${r.asp.toFixed(3)} ${r.src}`}`);
   if(!r.err){if(r.crownGap<1){bad++;console.log('FAIL crown touches/under the running-head rule',r.name)}if(r.cutPg>1){bad++;console.log('FAIL cut at page edge',r.name,f1(r.cutPg))}if(Math.abs(r.asp-1)>.01){bad++;console.log('FAIL squeeze',r.name,r.asp)}}}
  {const a=rows.filter(r=>!r.err);const mx=Math.max(...a.map(r=>r.kb)),mn=Math.min(...a.map(r=>r.kb));console.log(`${W}x${H} skull-top>feet spread ${((mx-mn)/mx*100).toFixed(2)} % (min ${f1(mn)} max ${f1(mx)})`);if((mx-mn)/mx>.01){bad++;console.log('FAIL spread >1 %')}}
  if(errs.filter(e=>!/Unexpected token '<'/.test(e)).length){bad++;console.log('PAGE ERRORS',errs.slice(0,3))}
  await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
