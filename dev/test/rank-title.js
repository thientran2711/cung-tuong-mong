/* review/rank-title (owner, ref. shot "title above the name"): KIT §48.1 rank title — the rank line above every name is a serif title in
   the rank's own colour (soft glow + thin dark outline), the name under it in plain dark ink. One kit look for the stage name tags, kitNameRank
   (dialogs, cards, Ân oán, place host), kitEventDp captions and the Tuần lục heading.
   usage: node dev/test/rank-title.js <page URL> <outdir> <tag> [WxH@dpr,...] [cases]
   cases: day, night, rain, cold (stage with her + 2 consorts + 1 man; cold = she is in Lãnh cung), dp (person event dialog), kit (#kit §48.1 sample),
          old (old save written by OLDURL env, then loaded)
   Measures per stage tag: title/name boxes, title above name, tags of two figures never overlap, tag never over a head of another figure,
   computed colours (title = rank tone, name = ink), font family serif. Shots <outdir>/<tag>-<case>-<WxH>.jpg */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG,SIZES,CASES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(p,url){await p.goto(url,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove()});await sleep(300)}
const MEASURE=()=>{const st=document.getElementById('stage');if(!st)return null;const R=st.getBoundingClientRect();const vis=e=>{if(!e||e.offsetParent===null||e.getBoundingClientRect().width<=2)return false;if(e.checkVisibility&&!e.checkVisibility({opacityProperty:true,visibilityProperty:true}))return false;for(let a=e;a&&a!==document.body;a=a.parentElement){if(+getComputedStyle(a).opacity<0.05)return false}const q=e.getBoundingClientRect(),R=st.getBoundingClientRect();return q.bottom>R.top&&q.top<R.bottom};
 const box=e=>{const q=e.getBoundingClientRect();return{l:Math.round(q.left-R.left),r:Math.round(q.right-R.left),t:Math.round(q.top-R.top),b:Math.round(q.bottom-R.top)}};
 const tags=[...document.querySelectorAll('#tokens .tok .tag, #j59metag .tag')].filter(vis).map(g=>{const t=g.querySelector('.j59t'),n=g.querySelector('.j59n');const cs=e=>e&&vis(e)?getComputedStyle(e):null;
  return{txt:g.innerText.replace(/\n/g,' / '),tag:box(g),title:t&&vis(t)?box(t):null,name:n&&vis(n)?box(n):null,tCol:cs(t)&&cs(t).color,tFont:cs(t)&&cs(t).fontFamily.split(',')[0],tSize:cs(t)&&cs(t).fontSize,nCol:cs(n)&&cs(n).color,nShadow:cs(n)&&cs(n).textShadow}});
 const heads=[...document.querySelectorAll('#tokens .tok img.figimg, #mefig')].filter(vis).map(im=>{const b=(window.kitFigBody&&kitFigBody(im.getAttribute('src')))||{t:0,l:0,r:1};const q=im.getBoundingClientRect();return{l:Math.round(q.left-R.left+q.width*b.l),r:Math.round(q.left-R.left+q.width*b.r),t:Math.round(q.top-R.top+q.height*b.t)}});
 const ov=(a,b)=>a.l<b.r-1&&b.l<a.r-1&&a.t<b.b-1&&b.t<a.b-1;const bad=[];
 tags.forEach((x,i)=>tags.forEach((y,j)=>{if(j>i&&ov(x.tag,y.tag))bad.push('overlap '+x.txt+' x '+y.txt)}));
 tags.forEach(x=>{if(x.title&&x.name&&x.title.b>x.name.t+2)bad.push('title not above name '+x.txt);if(x.tag.l<-1||x.tag.r>R.width+1)bad.push('tag cut '+x.txt)});
 return{stage:[Math.round(R.width),Math.round(R.height)],tags,heads,bad}};
(async()=>{const PX=process.env.HTTPS_PROXY;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{});const OUTR=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,1366x1024@2,844x390@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  for(const cs of (CASES||"day,night,rain,cold,dp,kit").split(",")){
   const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:!!PX});
   const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const res={sz,cs};
   try{
   if(cs==='kit'){await p.goto(URL+'#kit',{waitUntil:'domcontentloaded'});await sleep(6000);
    res.kit=await p.evaluate(()=>{const e=[...document.querySelectorAll('[data-kid], .kitpg-s, section')].find(x=>/§48\.1/.test(x.textContent)&&x.textContent.length<4000);if(!e)return'no §48.1 sample';e.scrollIntoView({block:'start'});
     return{n:e.querySelectorAll('.knr').length,over:e.scrollWidth>e.clientWidth+1}});await sleep(800);
    await p.screenshot({path:`${OUT}/${TAG}-kit-${wh}.jpg`,type:'jpeg',quality:70})}
   else{
    if(cs==='old'&&process.env.OLDURL){await boot(p,process.env.OLDURL);await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;S.month=4;save()});await sleep(800)}
    await boot(p,URL);await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}#kroul{display:none!important}'});
    if(cs==='old')res.load=await p.evaluate(()=>{try{const d=loadSlot(3);if(!d)return'no save';SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;Q.length=0;deal();render();return'ok month '+S.month}catch(e){return'err '+String(e.stack).slice(0,300)}});
    else await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;deal();render()});
    await sleep(800);
    await p.evaluate(async(cs)=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;
     S.buoi=0;if(cs==='night')S.wx={n:"trời quang",k:"dust",f:0};if(cs==='rain')S.wx={n:"mưa phùn",k:"rain",f:1};if(cs==='day')S.wx={n:"trời quang",k:"dust",f:0};
     const k='vuon';S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
     const L=liveRivals(true).filter(v=>!v.queen);L.slice(0,2).forEach(v=>{Wh[v.id]=k;S.met=S.met||{};S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}});
     if(cs==='cold'){S.out=1;try{S.place='lanh';render()}catch(e){}}
     else{if(cs!=='dp')(S.men||[]).filter(m=>m.alive).slice(0,1).forEach(m=>S.menW[m.id]=k);S.place="home";used=0;tab="act";goTo(k);Q.length=0;if(md)md.hidden=true;if(cs==='night'||cs==='rain'){S.buoi=cs==='night'?3:2;render()}}
     if(cs==='dp0'){const v=L[0];Q.push({t:"Có người đến",who:pv(v),stage:[v,S.emp],h:`<p>${v.name} cùng Hoàng thượng ghé qua.</p>`,opts:[{n:"Nhịn",fx:{duc:2},x:"giữ lễ",go:()=>{}},{n:"Đáp trả",fx:{danh:1},x:"nàng oán +10",go:()=>{}}]});showModal()}
     await new Promise(r=>setTimeout(r,2500))},cs);
    if(cs==='cards')await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;tab='rv';render();window.scrollTo(0,0)});
    if(cs==='book')await p.evaluate(()=>{const v=liveRivals(true).filter(x=>!x.queen)[0];let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
     kitBook({pages:[{kind:'person',who:v,title:v.name,blocks:[{facts:[{text:v.name+' sang thăm, tặng ngươi một hộp trà.',kind:'world',auto:false}]}],n:1}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}})});
    if(cs==='podium'){await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;const R=liveRivals(true).slice(0,3);startContest({art:'tho',title:'Hội Thượng nguyên',rivals:R,prep:20,stakes:{win:{sung:8,danh:3},top3:{danh:1},last:{danh:-1},paid:{suc:-6}},onDone:()=>{}})});
     await sleep(600);await p.evaluate(()=>{const b=document.getElementById('kg82skip');if(b)b.click()});await sleep(3000);
     res.podium=await p.evaluate(()=>[...document.querySelectorAll('.kpod-plq .kname')].filter(e=>e.offsetParent).map(e=>{const t=e.querySelector('.kti');return{txt:e.innerText.replace(/\n/g,' / '),tCol:t&&getComputedStyle(t).color,nCol:getComputedStyle(e).color}}))}
    if(cs==='dp')for(let tr=0;tr<4;tr++){await sleep(1500);await p.evaluate(()=>{S.menW={};Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;const v=liveRivals(true).filter(x=>!x.queen)[0];S.met=S.met||{};S.met[v.id]=1;
      Q.push({t:"Có người đến",who:pv(v),stage:[v],headArt:{src:"img/ev-khach-den.webp"},h:`<p>${v.name} đến tận cửa cung.</p>`,opts:[{n:"Nhịn",fx:{duc:2},x:"giữ lễ",go:()=>{}},{n:"Đáp trả",fx:{danh:1},x:"nàng oán +10",go:()=>{}}]});showModal()});
     await p.waitForFunction(()=>{const m=document.getElementById('modal');return m&&!m.hidden&&m.querySelector('.kpsn')},null,{timeout:20000}).then(()=>{res.noDialog=false}).catch(()=>{res.noDialog=true});
     await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,15000)}))));await sleep(2000);if(!res.noDialog&&await p.evaluate(()=>!document.getElementById('modal').hidden&&/Có người đến/.test(document.querySelector('#modal .kptitle')?.textContent||'')))break}
    if(cs==='book')res.book=await p.evaluate(()=>{const h=[...document.querySelectorAll('.kbk-pname')].find(e=>e.offsetParent);if(!h)return'no heading';const t=h.querySelector('.kti');return{txt:h.innerText.replace(/\n/g,' / '),tCol:t&&getComputedStyle(t).color,tDisp:t&&getComputedStyle(t).display}});
    await p.evaluate(()=>Promise.all([...document.querySelectorAll('#stage img, #modal img, #dawn img, #panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,15000)}))));await p.waitForFunction(()=>{const st=document.getElementById('stage');if(!st||!st.offsetParent)return true;const H=st.getBoundingClientRect().bottom;const T=[...document.querySelectorAll('#tokens .tok.fig .tag')].filter(g=>g.offsetParent&&g.getBoundingClientRect().width>2);return T.length>0&&T.every(g=>g.getBoundingClientRect().bottom<=H+1)&&document.querySelectorAll('#tokens .tok.fig img.figimg').length>0},null,{timeout:45000,polling:500}).catch(()=>{res.notLaid=true});await sleep(1500);res.m=await p.evaluate(MEASURE);
    if(cs==='dp')res.dp=await p.evaluate(()=>[...document.querySelectorAll('#modal .kpsn, #modal .knr')].filter(e=>e.offsetParent).map(e=>{const t=e.querySelector('.kti,.knr-r');return{txt:e.innerText.replace(/\n/g,' / '),tCol:t&&getComputedStyle(t).color,tFont:t&&getComputedStyle(t).fontFamily.split(',')[0]}}));
    await p.screenshot({path:`${OUT}/${TAG}-${cs}-${wh}.jpg`,type:'jpeg',quality:70})}
   }catch(e){res.err=String(e).slice(0,300)}
   res.errs=errs;OUTR.push(res);await ctx.close()}}
 console.log(JSON.stringify(OUTR,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
