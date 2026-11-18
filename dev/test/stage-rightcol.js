/* review/stage-rightcol (owner 18/11 ~20:55Z): stage right column = «Cung nhân · N» + «Chí tôn · 3» group folds (kitGroupFold) + Ân sủng + Nguy hiểm chung;
   place name = plain 2-line text on the picture; the "+N people" chip corner stays free.
   usage: node dev/test/stage-rightcol.js <outdir>   (reads ./index.html built by dev/site/build_site.sh; prints PASS/FAIL per device x household x fold state; shots .jpg to <outdir>) */
const {chromium}=require('playwright');const fs=require('fs');const OUT=process.argv[2]||'/tmp/rc-shots';fs.mkdirSync(OUT,{recursive:true});
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';const html=fs.readFileSync(process.env.INDEX||'index.html','utf8');
const DEV=[['fold',755,1000],['ipad',1180,820]];const HH=[['h1',0,0],['h6',5,6]];const FOLD=[['closed',null],['cn','cn'],['ct','ct']];
const PLACES=(process.env.PLACES||'home,vuon').split(',');
(async()=>{const b=await chromium.launch();let bad=0;
for(const [dn,W,H] of DEV){
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,deviceScaleFactor:+(process.env.DSF||2),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route(u=>u.href===LIVE||u.href===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
 await ctx.route(/\.(mp3|ogg|m4a)$/,r=>r.fulfill({status:404,body:''}));
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
 await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 const clean=async()=>{await p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());['kroul','kroulw','kload','klife'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});
  for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true;document.querySelectorAll('.kmodal,.kres,#ktbtoast,.ktbt').forEach(e=>e.style.display='none');render()});await p.waitForTimeout(600)};
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(5000);await clean();await clean();
 for(const [hn,extra,rk] of HH){
  await p.evaluate(async([extra,rk])=>{if(rk)S.rank=rk;S.staff=(S.staff||[]).filter(s=>s&&s.role!=='maid'&&s.role!=='eunuch').slice(0);for(let i=0;i<extra;i++){const r=i%2?'eunuch':'maid';try{S.staff.push(mkServ(r))}catch(e){}}window.__kgfOpen=null;S.th=10;S.hh=-5;render()},[extra,rk]);
  for(const pl of PLACES){
   await p.evaluate(async(pl)=>{Q.length=0;S.dead=false;S.confined=0;tab='act';if(pl==='home'){S.place='home'}else{try{goTo(pl)}catch(e){}}await new Promise(r=>setTimeout(r,2500));try{j59lay()}catch(e){}const R=document.getElementById('kshR');if(R)R.dataset.full='';k3Stage();await new Promise(r=>setTimeout(r,800))},pl);await clean();
   for(const [fn,key] of FOLD){
    await p.evaluate(async(key)=>{window.__kgfOpen=key;const R=document.getElementById('kshR');if(R)R.dataset.full='';k3Stage();try{j59lay()}catch(e){}await new Promise(r=>setTimeout(r,900))},key);
    const r=await p.evaluate(()=>{const st=document.getElementById('stage'),S0=st.getBoundingClientRect(),R=document.getElementById('kshR');const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>2;
     const q=R&&!R.hidden?R.getBoundingClientRect():null;const o={};if(!q)return{noCol:true};
     const hit=(a,c)=>Math.max(0,Math.min(a.right,c.right)-Math.max(a.left,c.left))*Math.max(0,Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top));
     const chip=document.querySelector('.j59more.j59mr');o.chip=chip&&vis(chip)?Math.round(hit(q,chip.getBoundingClientRect())):'none';
     const nm=document.getElementById('kpname');o.nameLines=nm&&!nm.hidden?nm.children.length:0;o.nameCol=nm&&!nm.hidden?Math.round(hit(q,nm.getBoundingClientRect())):0;
     o.nameBg=nm?(getComputedStyle(nm).backgroundColor==='rgba(0, 0, 0, 0)'&&getComputedStyle(nm).borderTopWidth==='0px'):true;
     const figs=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(vis).map(im=>{const bb=(typeof kitFigBody==='function'&&kitFigBody(im.getAttribute('src')))||{l:0,r:1};const z=im.getBoundingClientRect();const l=bb.cl!=null?bb.cl:bb.l,rr=bb.cr!=null?bb.cr:bb.r;return{left:z.left+z.width*l,right:z.left+z.width*rr,top:z.top,bottom:z.bottom}});
     o.nameFig=nm&&!nm.hidden?figs.reduce((a,f)=>a+Math.round(hit(nm.getBoundingClientRect(),f)),0):0;o.colFig=figs.reduce((a,f)=>a+Math.round(hit(q,f)),0);
     o.scroll=R.scrollHeight>R.clientHeight+1;o.inStage=q.bottom<=S0.bottom+1&&q.top>=S0.top-1;o.groups=[...R.querySelectorAll('.kgf-h .k3l')].map(e=>e.textContent);
     o.order=[...R.children].map(e=>e.className.split(' ')[1]||e.className.split(' ')[0]).join('>');o.open=R.querySelectorAll('.kgfopen').length;o.cards=R.querySelectorAll('.kgf-l .k3c').length;
     o.cut=[...R.querySelectorAll('.k3l,.k3ct>b')].filter(e=>vis(e)&&(e.scrollWidth>e.clientWidth+1)).map(e=>e.textContent);return o});
    const ok=!r.noCol&&(r.chip==='none'||r.chip===0)&&!r.nameCol&&!r.nameFig&&!r.colFig&&r.nameBg&&(r.nameLines===0||r.nameLines<=2)&&r.inStage&&!r.cut.length&&r.open===(key?1:0)&&(key||!r.scroll);if(!ok)bad++;
    console.log(ok?'PASS':'FAIL',dn,hn,pl,fn,JSON.stringify(r));
    await p.screenshot({path:`${OUT}/${dn}-${hn}-${pl}-${fn}.jpg`,type:'jpeg',quality:70,animations:'disabled'})}}}
 console.log('errs',dn,JSON.stringify(errs.slice(0,4)));await ctx.close()}
console.log('bad',bad);await b.close()})();
