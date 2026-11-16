/* review/kit-fit round 2 (s22): measure + shoot the four kit parts of this round.
     book   week book (Tuần lục) person page: KIT §32.2b equal gaps — running-head rule (.kbk-rh) → painted head = feet → page inner edge (.kbk-in)
     id     identity card (Luân hồi): full figure — screen top → painted head = feet → screen bottom (spread) / panel top edge (one page, kv1)
     slots  Chọn sổ (3 used sổ + Phúc duyên), tabs Một mình / Cùng hảo hữu: panel scroll overflow (px) — KIT §… .kslot compact row
     flip   card flip §67 final still (cfDemo 12 cards, 3 barred; pick me / other): visible name tags that overlap each other or the
            result chip / picked card (count)
   usage: node dev/test/kit-fit2.js <url> <outdir> <tag> [WxH,...] [cases]     exit 1 on any violation */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,TAG,SIZES,CASES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const ALLC=(CASES||'book,id,slots,slotsco,flipme,flipother').split(',');
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let bad=0;const OUTS=[];
 for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);
  for(const c of ALLC){
   const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
   const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
   await p.goto(URL,{waitUntil:'domcontentloaded'});
   await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.__ctmBuilt);await sleep(2500);
   let r={};
   if(c==='book'){
    r=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
     document.querySelectorAll('#kroul').forEach(e=>e.remove());const md=document.getElementById('modal');md.hidden=true;
     const who=Object.assign({},S.thO||{kind:'th',name:'Thái hậu',age:60});
     let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
     const facts=[];for(let i=0;i<4;i++)facts.push({text:`Mục ${i+1}: khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung cho phải phép.`,kind:'world',auto:false});
     kitBook({pages:[{kind:'person',who,title:'Thái hậu',blocks:[{facts}],n:4}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}});
     const t0=Date.now();while(Date.now()-t0<25000){const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent);const i=f&&f.querySelector('img');if(i&&i.complete&&i.naturalWidth&&f.style.visibility!=='hidden')break;await W(250)}
     await W(2500);const f=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesfi')].find(e=>e.offsetParent);if(!f)return{skip:'no figure'};
     const im=f.querySelector('img'),R=im.getBoundingClientRect(),por=f.closest('.kbk-por'),P=por.getBoundingClientRect(),pg=f.closest('.kbk-pg'),G=pg?pg.getBoundingClientRect():P;
     const fb=(window.__KITFB||{})[im.getAttribute('src')];const v=fb&&fb.v||{t:0,b:1};const head=R.top+v.t*R.height,feet=R.top+v.b*R.height;
     const cap=[...f.closest('.kbk-person').querySelectorAll('.kpsn,.knr,.kbk-phead')].filter(e=>e.offsetParent).map(e=>e.getBoundingClientRect());
     const IN=f.closest('.kbk-in'),rh=IN.querySelector(':scope > .kbk-rh'),I=IN.getBoundingClientRect(),cI=getComputedStyle(IN),lt=rh?rh.getBoundingClientRect().bottom:I.top,lb=I.bottom-(parseFloat(cI.borderBottomWidth)||0);
     return{gapTop:Math.round(head-lt),gapBot:Math.round(lb-Math.min(feet,P.bottom)),col:Math.round(P.height),fig:Math.round(Math.min(feet,P.bottom)-head),full:feet<=P.bottom+1,headInCol:head>=P.top-1}});
    if(r.gapTop!=null&&r.full){if(Math.abs(r.gapTop-r.gapBot)>2)r.v=[`gaps ${r.gapTop}/${r.gapBot}`];if(Math.min(r.gapTop,r.gapBot)<14)(r.v=r.v||[]).push('gap<14')}}
   else if(c==='id'){
    await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
    for(let i=0;i<40;i++){if(await p.evaluate(()=>!!document.querySelector('#kroul .krskip')))break;await sleep(500)}
    await p.evaluate(()=>{const s=document.querySelector('#kroul .krskip');if(s)s.click();const kl=document.getElementById('kload');if(kl)kl.remove()});
    for(let i=0;i<60;i++){if(await p.evaluate(()=>{const f=document.querySelector('#modal > img.kidfig2');return !!(f&&f.complete&&f.naturalWidth&&!f.classList.contains('kidlo'))}))break;await sleep(500)}await sleep(2500);
    r=await p.evaluate(()=>{const M=document.getElementById('modal'),im=M.querySelector(':scope > img.kidfig2');if(!im)return{skip:'no figure'};const R=im.getBoundingClientRect(),F=M.getBoundingClientRect();
     const fb=(window.__KITFB||{})[im.getAttribute('src')]||(window.__KITFB||{})[typeof kitTn==='function'?kitTn(im.getAttribute('src')):''];const v=fb&&fb.v||{t:0,b:1};
     const head=R.top+v.t*R.height,feet=R.top+v.b*R.height;const d=M.querySelector('.dlg').getBoundingClientRect();
     const one=document.documentElement.classList.contains('kv1'),lb=one?d.top:F.bottom;return{one,gapTop:Math.round(head-F.top),gapBot:Math.round(lb-feet),fig:Math.round(feet-head),full:feet<=F.bottom+1,figR:Math.round(R.left+R.width*(v.r||1)),dlgL:Math.round(d.left),measured:!!fb}});
    if(r.gapTop!=null&&r.full){if(Math.abs(r.gapTop-r.gapBot)>4)r.v=[`gaps ${r.gapTop}/${r.gapBot}`];if(Math.min(r.gapTop,r.gapBot)<12)(r.v=r.v||[]).push('gap<12')}}
   else if(/^slots/.test(c)){
    await p.evaluate((co)=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
     for(const n of [1,2,3]){SLOT=n;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;try{save()}catch(e){}}
     document.querySelectorAll('#kroul').forEach(e=>e.remove());
     localStorage.setItem('ctm-coop-rooms',JSON.stringify([1,2,3].map(i=>({room:'ABCD'+i,seat:'a',at:Date.now()-i*1e6,name:'Lâm Uyển Nhi',who:'Đáp ứng',age:18+i,date:'Tháng 3, năm 1',fr:'Tài nhân Tô Mộ'}))));
     localStorage.setItem('ctm-chonso-tab',co?'coop':'solo');
     $('modal').hidden=true;Q.length=0;$('title').hidden=false;showTitle()},c==='slotsco');
    await sleep(1200);await p.evaluate(co=>{const b=document.querySelector('[data-tgo="slots"]');if(b)b.click();const t=document.querySelector(`#slots [data-kcs="${co?'coop':'solo'}"]`);if(t)t.click()},c==='slotsco');await sleep(1500);
    r=await p.evaluate(()=>{const mb=document.getElementById('mb');const d=document.querySelector('#modal .dlg');const sl=[...document.querySelectorAll('#slots .kslot')];const pd=document.getElementById('pdwrap');
     const scrollers=[mb,d].filter(Boolean).map(e=>e.scrollHeight-e.clientHeight);const h=sl.map(s=>Math.round(s.getBoundingClientRect().height));
     const db=d.getBoundingClientRect(),pb=pd&&pd.getBoundingClientRect();
     return{over:Math.max(0,...scrollers),rows:sl.length,rowH:h.join(','),pdBottom:pb?Math.round(pb.bottom):null,dlgBottom:Math.round(db.bottom),dlgH:Math.round(db.height),vh:innerHeight}});
    if(W>=1100&&r.over>2)r.v=[`panel scrolls ${r.over}px on iPad`]}
   else if(/^flip/.test(c)){
    await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;document.querySelectorAll('#kroul').forEach(e=>e.remove());$('modal').hidden=true;render()});
    await sleep(800);await p.evaluate(c=>cfDemo(12,3,c==='flipme'?'me':2),c);
    for(let i=0;i<40;i++){if(await p.evaluate(()=>{const o=document.querySelector('.kcf');return !!(o&&o.classList.contains('kcf-fin')&&[...o.querySelectorAll('img')].every(i=>i.complete))}))break;await sleep(500)}await sleep(2500);
    r=await p.evaluate(()=>{const o=document.querySelector('.kcf');if(!o)return{skip:'no flip'};const vis=e=>{if(!e.getClientRects().length)return false;let x=e;while(x&&x!==o){const cs=getComputedStyle(x);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity<.05)return false;x=x.parentElement}return true};
     const tags=[...o.querySelectorAll('.kcf-c:not(.kcf-gone) .kcf-tag')].filter(vis).map(t=>({t,r:t.getBoundingClientRect(),pick:!!t.closest('.kcf-pick')}));
     const res=o.querySelector('.kcf-res.on'),RR=res&&res.getBoundingClientRect();const pk=o.querySelector('.kcf-pick'),PR=pk&&pk.getBoundingClientRect();
     const hit=(a,b)=>a.left<b.right-1&&a.right>b.left+1&&a.top<b.bottom-1&&a.bottom>b.top+1;let ov=0,ovRes=0,ovPick=0;const L=[];
     for(let i=0;i<tags.length;i++){for(let j=i+1;j<tags.length;j++)if(hit(tags[i].r,tags[j].r)){ov++;L.push(tags[i].t.textContent.trim().slice(0,20)+' × '+tags[j].t.textContent.trim().slice(0,20))}
      if(!tags[i].pick&&RR&&hit(tags[i].r,RR)){ovRes++;L.push('res × '+tags[i].t.textContent.trim().slice(0,20))}if(!tags[i].pick&&PR&&hit(tags[i].r,PR)){ovPick++;L.push('pick × '+tags[i].t.textContent.trim().slice(0,20))}}
     return{tags:tags.length,ov,ovRes,ovPick,list:L.slice(0,6)}});
    if(r.ov||r.ovRes||r.ovPick)r.v=[`tags overlap: ${r.ov} each other, ${r.ovRes} result chip, ${r.ovPick} picked card`]}
   r.c=c;r.sz=sz;r.errs=errs;if(r.v)bad+=r.v.length;bad+=errs.length;OUTS.push(r);
   console.log(`${sz} ${c.padEnd(10)} ${JSON.stringify(Object.assign({},r,{c:undefined,sz:undefined,errs:errs.length||undefined}))}`);
   await p.screenshot({path:`${OUT}/${TAG}-${c}-${sz}.jpg`,type:'jpeg',quality:70});await ctx.close()}}
 fs.writeFileSync(`${OUT}/${TAG}.json`,JSON.stringify(OUTS,null,1));console.log(`violations+errors ${bad}`);await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
