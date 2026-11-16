/* review/stage-fig-size — KIT 32.2 cap on EVERY dialog with a stage figure (owner 15/11: "Sao khung này, khung trái nhân vật to vậy …
   nếu cắt váy thì cũng ok mà"; shot dev/handover/refs/owner-stage-fig-huge.jpg, VIỆC "Thái hậu chê dung nhan", tablet portrait).
   Opens every kind of person dialog for real (kitEventStage → kitDpFit) and measures per dialog:
     col%   figure column width / dialog width        colW  column px      dlg  dialog WxH
     figH   painted figure height on screen (px)       vis   share of the painted body in view (1 = whole body, < 1 = cropped at the floor)
     face   head box fully inside the column (top ≥ column top, head-to-chin band not clipped)   sq  aspect kept (img w/h = natural w/h)
     over   figure paint outside the column into the right column (px, must be 0)
   usage: node dev/test/stage-fig-size.js <url> <outdir> <tag> [WxH@dpr,...] [kinds]
   kinds: toil (Thái hậu chê dung nhan), thtrieu, visit (Có người đến), emp (Hoàng thượng đến), man (thái giám), two, child, many (6 options),
   none (no options), ban (with event banner), shop, pet, book (Tuần lục person page)
   CDN pictures go through the session proxy (HTTPS_PROXY). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,TAG,SIZES,KINDS]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const SHOT=process.env.SHOT||'';
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const ALL=[];
 for(const sz of (SIZES||'755x1000@1,1000x755@1,1180x820@1,1366x1024@1,844x390@1,686x880@1,820x1180@1').split(',')){const [wh,dpr]=sz.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.th=Math.max(S.th||0,40);S.sung=Math.max(S.sung,65);render()});
  await sleep(800);
  await p.evaluate(`window.__meas=()=>{const M=document.getElementById('modal');if(!M||M.hidden)return{shown:false,nomodal:true};const d=M.querySelector('.dlg'),R=e=>e.getBoundingClientRect();
    const col=M.querySelector('#mb .kpsubj.kes');if(!col){const kf=document.querySelector('#modal > img.kidfig2');return{nocol:true,kind:d.dataset.kind,kdper:d.classList.contains('kdper'),portrait:!!M.querySelector('#mb .kpsubj'),idfig:kf?(kf.naturalWidth?kf.getAttribute('src').split('/').pop():'loading'):null}}const C=R(col),D=R(d);
    const F=[...col.querySelectorAll(':scope > .kesf:not(.kesno) .kesimg')].map(im=>{const r=R(im);const fb=(window.__KITFB||{})[im.getAttribute('src')];const v=fb&&fb.v||{t:0,b:1,ht:0,l:0,r:1};
      const top=r.top+v.t*r.height,bot=r.top+v.b*r.height,head=r.top+(v.ht||v.t)*r.height,body=bot-head;const chin=head+body*.13;
      const shownBot=Math.min(bot,C.bottom);const ar=im.naturalWidth/Math.max(1,im.naturalHeight);
      const L=r.left+v.l*r.width,Rr=r.left+v.r*r.width;const clip=getComputedStyle(col).overflow!=='visible'||getComputedStyle(col).clipPath!=='none';
      return{figH:Math.round(bot-top),shown:Math.round(shownBot-top),vis:+((shownBot-head)/Math.max(1,body)).toFixed(2),face:top>=C.top-1&&chin<=C.bottom,headPx:Math.round(body*.13),
       sq:Math.abs(r.width/Math.max(1,r.height)-ar)<.02,over:clip?0:Math.round(Math.max(0,Rr-C.right,C.left-L))}});
    const f=F[0]||{};return{kdper:d.classList.contains('kdper'),n:F.length,colPct:Math.round(C.width/D.width*100),colW:Math.round(C.width),colH:Math.round(C.height),dlg:Math.round(D.width)+'x'+Math.round(D.height),
     figH:f.figH,shown:f.shown,vis:f.vis,face:F.every(x=>x.face),headPx:f.headPx,sq:F.every(x=>x.sq),over:Math.max(0,...F.map(x=>x.over)),dvh:+((f.shown||0)/innerHeight).toFixed(2)}}`);
  await p.evaluate(`window.__sq=()=>{const bad=[];let n=0;for(const im of document.querySelectorAll('img')){const src=im.getAttribute('src')||'';if(!/\\/(fig-|unknown-fig|por-)/.test(src)||!im.naturalWidth)continue;const r=im.getBoundingClientRect();if(r.width<8||r.height<8)continue;
    const cs=getComputedStyle(im);if(cs.visibility==='hidden'||cs.display==='none')continue;n++;const of=cs.objectFit;if(of==='contain'||of==='cover'||of==='scale-down')continue;
    const tr=cs.transform&&cs.transform!=='none'?new DOMMatrix(cs.transform):null;const sx=tr?Math.hypot(tr.a,tr.b):1,sy=tr?Math.hypot(tr.c,tr.d):1;
    const ar=(im.clientWidth*sx)/Math.max(1,im.clientHeight*sy),na=im.naturalWidth/im.naturalHeight;if(Math.abs(ar/na-1)>.02)bad.push(src.split('/').pop()+' '+ar.toFixed(3)+'/'+na.toFixed(3))}return{n,bad}}`);
  const rows=[];
  for(const k of (KINDS||'toil,thtrieu,visit,emp,man,two,child,many,none,ban,shop,info,ident,stage').split(',')){
   let ok=false;
   for(let tr=0;tr<3&&ok!==true;tr++){ok=await p.evaluate(async k=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const md=document.getElementById('modal');md.hidden=true;
    const R0=liveRivals(true).filter(v=>!v.queen);R0.slice(0,3).forEach(v=>S.met[v.id]=1);const v=R0[0],v2=R0[1]||R0[0];
    const eun={__fig:'img/fig-eunuch-ndp-tray.webp',__cap:'Tiểu Lý Tử',__role:'Thái giám Nội vụ phủ',age:28,sex:'m'};
    const o=[{n:'Tiếp',fx:{},x:'thân +3',go:()=>{}},{n:'Từ chối',fx:{},x:'thân -3',go:()=>{}}];
    const many=[1,2,3,4,5,6].map(i=>({n:'Cách thứ '+i+' để đối đáp cho phải lẽ',fx:{suc:-i},hint:'thành bại khó đoán, hỏng thì càng phật ý người trên',risk:'có rủi ro',go:()=>{}}));
    const j24=re=>{for(let i=0;i<400;i++){let m=null;try{m=approachOne()}catch(e){}if(m&&re.test(String(m.t||''))&&kitStagePeople(m).length)return m}return null};
    if(k==='toil'){const tm=j24(/Thái hậu triệu/);const thw=tm?kitStagePeople(tm)[0]:pTH();Q.length=0;toilReact({k:'th-scold',who:Object.assign(pTH(),{__kp:thw}),host:'th',n:-1,name:'Thái hậu',line:'trang điểm đẹp: Thái hậu thiện cảm -1',ctx:{mk:'dep',dress:'photruong'}});await W(60);if(!Q.length)return false;Q.forEach(m=>{m.must=1;if(tm)m.stage=kitStagePeople(tm)});showModal()}
    else if(k==='thtrieu'||k==='visit'||k==='emp'){const m=j24(k==='thtrieu'?/Thái hậu triệu/:k==='visit'?/Có người đến/:/Hoàng thượng/);if(!m)return'none';m.must=1;Q.push(m);showModal()}
    else if(k==='man')Q.push({t:'Có người đến',stage:[eun],h:'<p>Thái giám Nội vụ phủ đến bẩm việc.</p>',opts:o});
    else if(k==='two')Q.push({t:'Có người đến',stage:[v,v2],who:pv(v),h:`<p>${v.name} cùng ${v2.name} sang thăm.</p>`,opts:o});
    else if(k==='child'){Q.push({t:'Hoàng tử đến thỉnh an',stage:[{__fig:'img/fig-eunuch-ndp-tray.webp',__cap:'Tiểu hoàng tử',__role:'Hoàng tử',age:7,sex:'m'}],h:'<p>Tiểu hoàng tử đến thỉnh an.</p>',opts:o})}
    else if(k==='many')Q.push({t:'Việc khó xử',who:pv(v),h:`<p>${v.name} hỏi khó.</p>`,opts:many});
    else if(k==='none')Q.push({t:'Có người đến',who:pv(v),h:`<p>${v.name} ghé qua rồi về.</p>`});
    else if(k==='ban')Q.push({t:'Thái hậu chê dung nhan',who:pTH(),h:'<p>“Ăn vận phô trương quá.”</p>',opts:o,art:'img/ev-toil-th-scold.webp'});
    else if(k==='shop'){S.shop=Object.keys(IT).filter(k=>IT[k].pr>0&&IT[k].pr<200).slice(0,8);S.bac=70;invAct('shop');return true}
    else if(k==='stage'){render();await W(1500);return true}
    else if(k==='ident'){window.__nlInner=0;try{nlCard()}catch(e){return 'ERR '+e.message}await W(2500);return !document.getElementById('modal').hidden||'hidden'}
    else if(k==='info'){const tm=j24(/Thái hậu triệu/);Q.length=0;Q.push({t:'Thái hậu',kit:{kind:'info'},who:Object.assign(pTH(),{__kp:tm?kitStagePeople(tm)[0]:null}),must:1,h:'<p>Thái hậu là mẹ của Hoàng thượng, đứng đầu hậu cung.</p>'});showModal()}
    else if(k==='pet'){try{const P=tsbPets(S);if(!P.length)return'none';petcOpen(0)}catch(e){return'none'}return true}
    if(k!=='toil'&&k!=='thtrieu'&&k!=='visit'&&k!=='emp'&&k!=='info'){Q.forEach(m=>m.must=1);showModal()}await W(900);return document.getElementById('modal').hidden?'hidden Q'+Q.length+' '+(window.__lastErr||''):true},k).catch(e=>'ERR '+e.message.slice(0,200));
    if(ok==='none'||/^ERR/.test(ok))break;if(ok!==true)await sleep(300)}
   if(ok!==true){rows.push({k,skip:String(ok)});continue}
   await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,15000)}))));await sleep(1500);
   const r=await p.evaluate(()=>window.__meas());r.sqAll=await p.evaluate(()=>window.__sq());r.k=k;rows.push(r);
   if(SHOT==='all'||SHOT.split(',').includes(k))await p.screenshot({path:`${OUT}/${TAG}-${k}-${wh}.jpg`,type:'jpeg',quality:60});
  }
  ALL.push({sz,rows,errs:errs.slice(0,4)});await ctx.close()}
 for(const s of ALL){console.log(`== ${s.sz}`);for(const r of s.rows)console.log(r.skip?`  ${r.k.padEnd(8)} skip ${r.skip}`:r.nocol||r.shown===false?`  ${r.k.padEnd(8)} ${JSON.stringify(Object.assign({},r,{sqAll:undefined}))} | figs on screen ${r.sqAll.n}, distorted ${r.sqAll.bad.length} ${r.sqAll.bad.join(';')}`:
  `  ${r.k.padEnd(8)} ${r.kdper?'dp':'--'} col ${String(r.colPct).padStart(2)}% ${String(r.colW).padStart(3)}x${r.colH} dlg ${r.dlg} figH ${r.figH} shown ${r.shown} (${r.dvh} vh) vis ${r.vis} head ${r.headPx} face ${r.face} sq ${r.sq} over ${r.over} | figs on screen ${r.sqAll.n}, distorted ${r.sqAll.bad.length}${r.sqAll.bad.length?' '+r.sqAll.bad.join(';'):''}`);if(s.errs.length)console.log('  errs',s.errs)}
 fs.writeFileSync(`${OUT}/${TAG}.json`,JSON.stringify(ALL));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
