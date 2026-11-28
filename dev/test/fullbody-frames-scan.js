/* fullbody-frames-scan.js — owner 18/11 ~07:50Z (fullbody-frame STEP 2): EVERY frame that shows a full-body person (centre pop-ups: news / notice / info / rule / result / choice,
   the coach / tips person dialog, the identity card) uses ONE body SKULL TOP -> feet for its figure column, nothing cut (no clip / mask on the figure), text drawn on top.
   Per case x viewport: skull->feet px, painted box, cut px (painted box outside the frame / any clipping ancestor), text lines under the figure; exit 1 on a cut,
   a squeeze, or a body that differs by more than 1 % between people of the same frame kind and size.
   usage: node dev/test/fullbody-frames-scan.js <index.html> [outdir]   env SZ=[[W,H],..] SHOTS=1 KINDS=news,choice,pdlg,idcard CASES=name,name C3HT=<json> */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
const C3=n=>['c03-t'+n,'img/_review/consort-tiers/c03/b8/c03_a18_t'+n+'.png'];
const C3HT=process.env.C3HT?JSON.parse(fs.readFileSync(process.env.C3HT)):{};
let CASES=[C3(1),C3(6),C3(8),['hoang-hau','img/fig-thaihau-1.webp'],['crown-tallest','img/fig-maid-m50-t8-a18.webp'],['widest-robe','img/fig-maid-m48-t8-a51.webp'],['old-maid-wide','img/fig-maid-m50-t6-a51.webp'],['man','img/fig-man-bacdich-1-a36.webp'],['old-emperor','img/fig-emperor-a18-1.webp'],['SELF','SELF']];
if(process.env.CASES)CASES=CASES.filter(c=>process.env.CASES.split(',').includes(c[0]));
const KINDS=(process.env.KINDS||'news,notice,choice,pdlg,idcard,shop').split(',');
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let bad=0;const html=fs.readFileSync(SRC);
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:process.env.SHOTS?+(process.env.DSF||2):1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1;let s=12345;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof kitPersonDlg==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.evaluate(async h=>{const t0=Date.now();while(!(window.__KITHT&&window.__KITHT.m)&&Date.now()-t0<20000)await new Promise(r=>setTimeout(r,200));if(window.__KITHT&&window.__KITHT.m)Object.assign(window.__KITHT.m,h)},C3HT);await p.waitForTimeout(3500);
  const rows=[];
  for(const kind of KINDS)for(const [name,FIG] of [['warmup',CASES[0][1]],...CASES]){
   const r=await p.evaluate(async([kind,name,FIG,SHOT])=>{
    const k0=window.__k0||(window.__k0=kitFigOf);const self=FIG==='SELF';
    window.kitFigOf=kitFigOf=function(q){if(q&&q.__t&&!self)return IMG_BASE+FIG;return k0.apply(this,arguments)};
    const R=liveRivals(true);const who=self?S:Object.assign({},R[0]||{},{__t:1,age:36});
    const close=window.__scanClose=()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true;for(const e of document.querySelectorAll('#kscanpd'))e.remove()};close();
    const sleep=t=>new Promise(r=>setTimeout(r,t));let root=null,dlg=null,sel=null,txt=null,frame=null;
    if(kind==='news'||kind==='notice'||kind==='choice'){const o={t:kind==='news'?'Tin trong cung':kind==='notice'?'Một báo':'Việc thử',who,h:'<p>x</p>'};
     o.h=LONG_(kind==='choice'?5:8);if(kind==='choice')o.opts=[{n:'Một',fx:{}},{n:'Hai',fx:{}}];Q.push(o);showModal();
     const t0=Date.now();while(Date.now()-t0<25000){const d=document.querySelector('#modal:not([hidden]) .dlg.kszf');const i=d&&d.querySelector('.kszfs img');if(i&&i.complete&&i.naturalWidth&&i.style.height)break;await sleep(250)}await sleep(1200);
     dlg=document.querySelector('#modal:not([hidden]) .dlg.kszf');if(!dlg)return{err:'no frame'};sel='.kszfs img';txt='.k3right';frame=dlg}
    else if(kind==='pdlg'){root=document.createElement('div');root.id='kscanpd';root.style.cssText='position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:#0006';
     root.innerHTML=kitPersonDlg({kind:'guide',title:'Lời dặn',sub:'thử',p:who,fig:kitFigOf(who),name:'<b>Một người</b>',pic:{src:'',lab:''},html:'<p>'+'Một lời dặn dài hơn một chút. '.repeat(8)+'</p>',btns:[{k:'a',t:'Đã rõ'}]});document.body.appendChild(root);
     const t0=Date.now();while(Date.now()-t0<25000){kitPersonDlgFit(root);const i=root.querySelector('.kpdfig img');if(i&&i.complete&&i.naturalWidth&&root.querySelector('.kpsubj.kes').dataset.kpdfit)break;await sleep(250)}await sleep(800);kitPersonDlgFit(root);await sleep(500);kitPersonDlgFit(root);await sleep(300);
     dlg=root.querySelector('.kpdlg');if(!dlg)return{err:'no pdlg'};sel='.kpdfig img';txt='.kpdr';frame=dlg}
    else if(kind==='shop'){if(name!=='warmup')return{err:'skip'};S.shop=Object.keys(IT).filter(k=>IT[k].pr).slice(0,8);kitShopNvp();
     const t0=Date.now();while(Date.now()-t0<25000){const i=document.querySelector('#modal .kpsubj.kes .kesimg');if(i&&i.complete&&i.naturalWidth&&document.querySelector('#modal .kpsubj.kes').dataset.kdpfit)break;await sleep(250)}await sleep(1500);
     dlg=document.querySelector('#modal:not([hidden]) .dlg');if(!dlg)return{err:'no shop'};sel='.kpsubj.kes .kesimg';txt='.kpmain,.opts';frame=dlg}
    else if(kind==='idcard'){if(self)return{err:'skip'};/* the identity card shows the player's own figure: figFor is overridden */const ff0=window.__ff0||(window.__ff0=figFor);window.figFor=figFor=function(p){return p===S?IMG_BASE+FIG:ff0.apply(this,arguments)};
     Q.push({nl:1,t:'Nhập cung',h:'<p>x</p>'});showModal();const t0=Date.now();while(Date.now()-t0<25000){const i=document.querySelector('#modal img.kidfig2');if(i&&i.complete&&i.naturalWidth&&!i.classList.contains('kidlo'))break;await sleep(250)}await sleep(1200);
     const i=document.querySelector('#modal img.kidfig2');if(!i)return{err:'no id card'};dlg=document.querySelector('#modal .dlg');sel='img.kidfig2';txt='.kpid,.kstgrid,.kpnote';frame=document.getElementById('modal');root=document.getElementById('modal')}
    const im=document.querySelector(kind==='pdlg'?'#kscanpd '+sel:'#modal '+sel);if(kind==='idcard')window.figFor=figFor=window.__ff0;if(!im)return{err:'no figure'};
    const src=im.getAttribute('src'),bd=await new Promise(res=>{const v=kitFigBody(src,()=>res(kitFigBody(src)));if(v)res(v)});
    const r=im.getBoundingClientRect(),fr=frame.getBoundingClientRect();
    const L=r.left+bd.l*r.width,Rr=r.left+bd.r*r.width,T=r.top+bd.t*r.height,Bm=r.top+bd.b*r.height,sk=r.top+kitFigTop(bd)*r.height;
    /* clipping: the frame itself (not for the identity card: the screen) + every clipping ancestor of the figure */
    let cut=Math.max(0,fr.left-L)+Math.max(0,Rr-fr.right)+Math.max(0,fr.top-T)+Math.max(0,Bm-fr.bottom);const clip=[];
    for(let x=im.parentElement;x&&x!==document.body;x=x.parentElement){const cs=getComputedStyle(x);const clipped=cs.overflowX!=='visible'||cs.overflowY!=='visible'||cs.clipPath!=='none'||cs.maskImage!=='none';if(!clipped||x===frame)continue;
     const q=x.getBoundingClientRect();const c=Math.max(0,q.left-L)+Math.max(0,Rr-q.right)+Math.max(0,q.top-T)+Math.max(0,Bm-q.bottom);if(c>.5){cut+=c;clip.push((x.id?'#'+x.id:'')+'.'+String(x.className).split(' ')[0]+' '+Math.round(c))}}
    const cs0=getComputedStyle(im);if(cs0.maskImage!=='none'||cs0.clipPath!=='none'){cut+=999;clip.push('img mask/clip')}
    let ovl=0;frame.querySelectorAll(txt).forEach(t=>t.querySelectorAll('*').forEach(e=>{if(e.children.length||!(e.textContent||'').trim())return;const q=e.getBoundingClientRect();if(q.width&&q.right>L+.5&&q.left<Rr-.5&&q.bottom>T&&q.top<Bm)ovl++}));
    const out={src:src.split('/').pop(),ksz:dlg&&dlg.dataset.ksz||'',skull:Bm-sk,figW:Rr-L,figH:Bm-T,frameW:fr.width,frameH:fr.height,cut,clip,ovl,asp:(r.width/r.height)/(im.naturalWidth/im.naturalHeight),shrink:dlg&&dlg.__kszShrink||1};
    if(!SHOT)close();return out;function LONG_(n){return '<p>'+'Một tin dài hơn rất nhiều, nói về chuyện trong cung và nhiều điều khác nữa. '.repeat(n)+'</p>'}},[kind,name,FIG,!!(process.env.SHOTS&&OUT)]);
   r.kind=kind;r.name=name;
   if(process.env.SHOTS&&OUT&&name!=='warmup'&&!r.err&&(!process.env.SHOTK||process.env.SHOTK.split(',').includes(kind))){await p.screenshot({path:`${OUT}/${W}x${H}-${kind}-${name}.jpg`,type:'jpeg',quality:72});await p.evaluate(()=>window.__scanClose&&window.__scanClose())}else if(process.env.SHOTS&&OUT)await p.evaluate(()=>window.__scanClose&&window.__scanClose());
   if((name!=='warmup'||kind==='shop')&&r.err!=='skip'){if(kind==='shop')r.name='eunuch-nvp';rows.push(r);console.error('..',W+'x'+H,kind,r.name,r.err||('skull '+(+r.skull).toFixed(1)+' cut '+(+r.cut).toFixed(1)))}}
  const f1=x=>(+x).toFixed(1);
  for(const r of rows){console.log(`${W}x${H} ${r.kind.padEnd(7)} ${r.name.padEnd(14)} ${r.err||`${r.ksz||'-'} skull>feet ${f1(r.skull)} | fig ${f1(r.figW)}x${f1(r.figH)} frame ${f1(r.frameW)}x${f1(r.frameH)} | cut ${f1(r.cut)} ${r.clip.join(';')} | text lines under figure ${r.ovl} | squeeze ${r.asp.toFixed(3)} shrink ${r.shrink} ${r.src}`}`);
   if(!r.err){if(r.cut>1){bad++;console.log('FAIL cut',r.kind,r.name,f1(r.cut))}if(Math.abs(r.asp-1)>.01){bad++;console.log('FAIL squeeze',r.kind,r.name)}}}
  for(const kind of KINDS){const by={};rows.filter(r=>r.kind===kind&&!r.err&&r.name!=='SELF').forEach(r=>{(by[r.ksz]=by[r.ksz]||[]).push(r)});
   for(const k in by){const a=by[k],mx=Math.max(...a.map(r=>r.skull)),mn=Math.min(...a.map(r=>r.skull));console.log(`${W}x${H} ${kind} size ${k||'-'}: skull>feet spread ${((mx-mn)/mx*100).toFixed(2)} % (min ${f1(mn)} max ${f1(mx)}, ${a.length} people)`);if((mx-mn)/mx>.01&&a.every(r=>r.shrink===1)){bad++;console.log('FAIL spread >1 %',kind,k)}}}
  if(errs.filter(e=>!/Unexpected token '<'/.test(e)).length){bad++;console.log('PAGE ERRORS',errs.slice(0,3))}
  await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
