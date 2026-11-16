/* KIT 61 fig-bg test: the silk scroll behind every full-body figure (Tuần lục person page + kitEventDp column).
   usage: node dev/test/figbg/scroll.js <build url> <outdir> [WxH@dpr,...]
   Checks per viewport: scroll painted (border-image figbg-*.webp) on .kbk-por / .kes, key = status; figure's head+feet inside the silk window
   (wide robes may be cropped sideways, never above the top rod / below the bottom rod); name chip inside the column; no horizontal page overflow;
   no page errors; adult women and men use the same figure height (book). Shots: one per viewport+kind (jpg, small). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const KINDS=[['book','rival'],['book','emp'],['book','th'],['book','maid'],['dlg','rival'],['dlg','emp']];
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||'755x1000@2,1000x755@2,1180x820@2,1366x1024@2,844x390@3,390x844@3').split(',')){const [wh,dpr]=sz.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});await ctx.addInitScript(()=>{window.__bot=1});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitBook==='function'&&typeof showModal==='function');
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(2500);
  const rows=[];
  for(const [kind,who] of KINDS){
   const info=await p.evaluate(async([kind,who])=>{const sl=t=>new Promise(r=>setTimeout(r,t));
    const R0=liveRivals(true);const w=who==='emp'?S.emp:who==='th'?(S.thO||(S.thO={})):who==='maid'?S.maid:R0.find(v=>!v.queen&&k61St(v)>=1)||R0.find(v=>!v.queen);
    kn();if(w&&w.id!=null){S.met=S.met||{};S.met[w.id]=1}if(w)w.met=1;
    const d=document.getElementById('dawn')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'dawn'}));
    const close=()=>{d.innerHTML='';d.hidden=true;d.className='dawn';Q.length=0;document.getElementById('modal').hidden=true};close();
    if(kind==='book'){d.hidden=false;d.className='dawn kbkdawn on';d.style.zIndex=2147483000;
     const facts=['Tranh sủng. Được thị tẩm đêm nay, Sủng +3, Ân tình +2.','Ban thưởng một hộp trâm ngọc, cả cung bàn tán.'].map(t=>({text:t,kind:'world',auto:false}));
     kitBook({pages:[{kind:'person',who:w,title:'x',blocks:[{facts}],n:2}],head:'Tuần lục',host:d,label:'Tuần lục',onClose:()=>{}})}
    else{for(let t=0;t<5;t++){const e=w===S.emp;Q.push({t:e?'Thánh giá đến':'Có người đến',who:e?pEmp():pv(w),stage:[w],headArt:{src:e?'img/ev-hoang-de-vui.webp':'img/ev-khach-den.webp'},h:'<p>'+(e?'Hoàng thượng ghé cung ngươi.':w.name+' đến tận cửa cung.')+'</p>',opts:[{n:'Nhịn',fx:{duc:2},x:'giữ lễ',go:()=>{}},{n:'Đáp lời khéo léo',fx:{danh:1},x:'được tiếng khéo',go:()=>{}}]});showModal();await sl(1200);{const k=document.querySelector('#modal .kes');if(k&&k.offsetHeight>50)break}Q.length=0;document.getElementById('modal').hidden=true}}
    await sl(1500);await Promise.all([...document.querySelectorAll('img')].filter(i=>i.offsetParent).map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)})));
    const col=document.querySelector(kind==='book'?'#dawn .kbk-por':'#modal .kes');if(!col)return{kind,who,err:'no column'};
    const bis=getComputedStyle(col).borderImageSource;const key=((bis.match(/figbg-(\w+)\.webp/)||[])[1])||'';
    if(bis&&bis!=='none'){await new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=bis.replace(/^url\("?|"?\)$/g,'');setTimeout(r,8000)})}await sl(600);
    const cr=col.getBoundingClientRect(),bw=parseFloat(getComputedStyle(col).borderTopWidth)||0,bs=parseFloat(getComputedStyle(col).borderLeftWidth)||0;
    const im=col.querySelector('.kesimg');const ir=im.getBoundingClientRect();const fb=typeof kitFigBody==='function'?kitFigBody(im.getAttribute('src')):null;
    const top=ir.top+(fb?fb.ht*ir.height:0),feet=ir.top+(fb?fb.b*ir.height:ir.height);
    const cap=col.querySelector('.kpsn'),cp=cap?cap.getBoundingClientRect():null;
    return{kind,who,key,want:kitFigBgKey(w),bw,bs,imgH:Math.round(ir.height),colH:Math.round(cr.height),headTop:Math.round(top-cr.top-bw),feetGap:Math.round(cr.bottom-bw-feet),
     capIn:cp?(cp.left>=cr.left-1&&cp.right<=cr.right+1):true,docOver:document.documentElement.scrollWidth>innerWidth+1,rod:bw>=8}},[kind,who]);
   if(info.err||info.key!==info.want||!info.rod||info.docOver||!info.capIn||info.headTop<-2||info.feetGap<-4){bad++;info.FAIL=1}
   rows.push(info);const el=await p.$(kind==='book'?'#dawn .kbk-book':'#modal .dlg');const bb=el&&await el.boundingBox();
   if(bb&&['rival','th'].includes(who))await p.screenshot({path:`${OUT}/${wh}-${kind}-${who}.jpg`,type:'jpeg',quality:70,clip:{x:Math.max(0,bb.x),y:Math.max(0,bb.y),width:Math.min(W,bb.width),height:Math.min(H,bb.height)}});
   await p.evaluate(()=>{const d=document.getElementById('dawn');if(d){d.innerHTML='';d.hidden=true}Q.length=0;document.getElementById('modal').hidden=true});
  }
  console.log(sz);rows.forEach(r=>console.log(' ',JSON.stringify(r)));if(errs.length){bad++;console.log(' PAGE ERRORS',errs.slice(0,4))}
  await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'PASS');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
