/* book-fig-scale.js — KIT 34.6: every figure on a BOOK page follows the one body rule (kitBookFig): same body height per viewport, feet on one line, aspect kept.
   usage: node dev/test/book-fig-scale.js <page.html | url> <outdir>   (env SZ=[[W,H],..]  SHOTS=1)
   Cases: Tuần lục person page with (a) Thái hậu (wide), (b) a normal consort, (c) the unknown silhouette (f), kitBookPic with 1 real + 2 silhouettes.
   Prints per case: figure box h, body px (head top..feet), foot gap to the column floor, aspect error. Exit 1 when body heights of one viewport differ > 3 % (same fac) or aspect off > 1 %. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1000,755],[1180,820],[1366,1024],[844,390]];const isFile=!/^https?:/.test(SRC);
const CASES0=[['thaihau','fig-thaihau-h1-a51.webp'],['consort','fig-consort-c01-t1-a18.webp'],['silF','SIL:f']];
const CASES=process.env.CASES?CASES0.filter(c=>process.env.CASES.split(',').includes(c[0])):CASES0;
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let bad=0;
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});
  await ctx.addInitScript(()=>{window.__bot=1});
  if(isFile)await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:fs.readFileSync(SRC),contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>{if(!/Unexpected token '<'/.test(e.message))errs.push(e.message.slice(0,120))});/* ctm.test serves only index.html: vendor scripts 404 there */
  await p.goto(isFile?'http://ctm.test/index.html':SRC,{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitBook==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}});
  await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(6000);
  const rows=[];
  for(const [name,FIG] of CASES){
   const r=await p.evaluate(async([name,FIG])=>{
    const k0=window.__k0||(window.__k0=kitFigOf);const sil=FIG.startsWith('SIL:');
    window.kitFigOf=kitFigOf=function(q){if(q&&q.__t)return sil?'':(typeof IMG_BASE==='string'?IMG_BASE:'')+'img/'+FIG;return k0.apply(this,arguments)};
    const who=Object.assign({},S.thO||{kind:'th',name:'Thái hậu',age:60},{__t:1,name:sil?'???':'Thái hậu'});
    if(FIG==='SIL:m')who.sex='m';
    let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
    const facts=[];for(let i=0;i<6;i++)facts.push({text:`Mục${i}: khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung cho phải phép.`,kind:'world',auto:false});
    kitBook({pages:[{kind:'person',who,title:'Thử',blocks:[{facts}],n:6}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}});
    const t0=Date.now();while(Date.now()-t0<20000){const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent);const i=f&&f.querySelector('img');if(i&&i.complete&&i.naturalWidth&&f.style.visibility!=='hidden')break;await new Promise(r=>setTimeout(r,200))}
    await new Promise(r=>setTimeout(r,2200));
    const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent&&e.closest('.kbk-sheet')&&e.closest('.kbk-sheet').style.transform==='')||document.querySelector('#dawn .kbk-person.kbk-full .kesfi');
    if(!f)return{err:'no figure'};const im=f.querySelector('img'),src=im.getAttribute('src'),b=await new Promise(res=>{const v=kitFigBody(src,()=>res(kitFigBody(src)));if(v)res(v)});
    const r=im.getBoundingClientRect(),por=f.closest('.kbk-por').getBoundingClientRect(),bt=b.ht>b.t?b.ht:b.t;
    return{ok:!!b.wl,t:b.t,ht:b.ht,bb:b.b,src:src.split('/').pop(),boxH:r.height,boxW:r.width,body:(b.b-bt)*r.height,foot:por.bottom-(r.top+b.b*r.height),col:por.height,asp:(r.width/r.height)/(im.naturalWidth/im.naturalHeight)}},[name,FIG]);
   r.name=name;rows.push(r);
   if(process.env.SHOTS&&(name==='thaihau'||name==='silF')){await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=c.id==='dawn'?'visible':'hidden'});await p.screenshot({path:`${OUT}/${W}x${H}-${name}.jpg`,type:'jpeg',quality:45});await p.evaluate(()=>{for(const c of document.body.children)c.style.visibility=''})}}
  /* kitBookPic: real + 2 silhouettes on one plate */
  const pic=await p.evaluate(async()=>{if(typeof kitBookPic!=='function')return null;let h=document.getElementById('kbpt');if(h)h.remove();h=document.createElement('div');h.id='kbpt';h.style.cssText='position:fixed;inset:0;z-index:2147483600;background:#222';document.body.appendChild(h);
    const U=(typeof KIT_DIR==="string"?KIT_DIR:"img/kit/");const R=(typeof IMG_BASE==='string'?IMG_BASE:'')+'img/fig-consort-c01-t1-a18.webp';
    h.innerHTML='<div style="position:absolute;inset:0;width:50%">'+kitBookPic({scene:'',ax:.5,feet:.9,figs:[{src:R,x:.25},{src:U+'unknown-fig-f.webp',x:.55,dim:true},{src:U+'unknown-fig-m.webp',x:.82,dim:true}],cap:'Thử'})+'</div>';
    const ims=[...h.querySelectorAll('.kbp-fig')];const t0=Date.now();while(Date.now()-t0<15000&&!ims.every(i=>i.complete&&i.naturalWidth))await new Promise(r=>setTimeout(r,200));
    for(const i of ims)await new Promise(res=>{const v=kitFigBody(i.getAttribute('src'),res);if(v)res()});await new Promise(r=>setTimeout(r,800));
    return ims.map(im=>{const bm=kitFigBody(im.getAttribute('src'));const r=im.getBoundingClientRect(),pl=im.closest('.kbp-plate').getBoundingClientRect(),b=kitFigBody(im.getAttribute('src'))||{t:0,b:1,ht:0},bt=b.ht>b.t?b.ht:b.t;return{ok:!!(bm&&bm.wl),src:im.getAttribute('src').split('/').pop(),boxH:r.height,body:(b.b-bt)*r.height,foot:pl.bottom-(r.top+b.b*r.height),plate:pl.height,asp:(r.width/r.height)/(im.naturalWidth/im.naturalHeight)}})});
  if(process.env.SHOTS&&pic)await p.screenshot({path:`${OUT}/${W}x${H}-pic.jpg`,type:'jpeg',quality:45});
  const f1=x=>x==null?'-':(+x).toFixed(1);
  for(const r of rows)console.log(`${W}x${H} book ${(r.name||'').padEnd(8)} ${r.err||`col ${f1(r.col)} boxH ${f1(r.boxH)} body ${f1(r.body)} (${(r.body/r.col).toFixed(3)} col) foot ${f1(r.foot)} asp ${r.asp.toFixed(3)} ${r.src} measured=${r.ok} t=${(r.t||0).toFixed(3)} ht=${(r.ht||0).toFixed(3)} b=${(r.bb||0).toFixed(3)}`}`);
  if(pic)for(const r of pic)console.log(`${W}x${H} pic  ${r.src.padEnd(26)} plate ${f1(r.plate)} boxH ${f1(r.boxH)} body ${f1(r.body)} (${(r.body/r.plate).toFixed(3)} plate) foot ${f1(r.foot)} asp ${r.asp.toFixed(3)} measured=${r.ok}`);
  const wo=rows.filter(r=>!r.err&&r.name!=='silM'&&r.name!=='thaihau');const bs=rows.filter(r=>!r.err).map(r=>r.body/r.col);if(bs.length>1&&(Math.max(...bs)/Math.min(...bs)>1.03)){bad++;console.log(`${W}x${H} FAIL woman body/column differ`,bs.map(x=>x.toFixed(0)))}
  for(const r of [...rows,...(pic||[])])if(!r.err&&Math.abs(r.asp-1)>.01){bad++;console.log(`${W}x${H} FAIL aspect`,r.src,r.asp)}
  if(errs.length){bad++;console.log(`${W}x${H} page errors`,errs.slice(0,3))}await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
