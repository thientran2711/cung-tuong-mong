/* review/kit-keeper-2 · dialog text-clip scan (Foreman D D-R1 finding: event-frame body #mb is overflow:hidden, so long text is clipped).
   Opens every kind of #modal panel and every PEND event dialog, twice: with its own text and with LONG extra text appended, then looks for
   TEXT that is cut off: a text element that lies (partly) outside an ancestor which clips it (overflow hidden/clip) with no scrolling
   ancestor between them. The figure column (.kes, cropped on purpose — KIT 32.2) and picture frames are exempt.
   Also checks the KIT rule (owner OD:L191): title (.kph), picture/figures, buttons row stay fixed; only the text/option area scrolls.
   usage: node dev/test/dlg-clip.js <page URL> <outfile.json> [WxH@dpr,...] [maxPend]   → table per viewport; exit 1 when any case has clipped text
   or a long dialog has no scroll area. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES,MAXP]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(SIZES||"755x1000@2,1000x755@2,1180x820@2,1366x1024@2,844x390@3").split(",");
const LONG=" Một câu rất dài để nội dung vượt quá chiều cao của khung, người xem cần cuộn mới đọc hết được lời kể này.".repeat(18);
(async()=>{const b=await chromium.launch();const R={};let bad=0;
 for(const sz of VPS){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:Math.min(+dpr,2),hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&typeof rivals!=='undefined'&&rivals&&rivals.length>0,null,{timeout:60000});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();Q.length=0;document.getElementById('modal').hidden=true;try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}render()});await sleep(1500);
  const size={};
  const measure=async(name)=>{await sleep(450);const m=await p.evaluate((LONGT)=>{const M=document.getElementById('modal');if(M.hidden)return null;const el=M.querySelector('.dlg');if(!el)return null;
    const oy=e=>getComputedStyle(e).overflowY,isScroll=e=>/auto|scroll/.test(oy(e)),isClip=e=>/hidden|clip/.test(oy(e));
    const exempt=e=>e.closest('.kes,.kdlgart,.ksart,.kpsubj,.kesov,.kfx,.kfxf,.kpseal,.kph,.kbtn,button,.ktab,.kit-x,.kwash');
    const bad=[];const seen=new Set();
    const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;
    while(n=tw.nextNode()){const t=n.textContent.trim();if(t.length<2)continue;const T=n.parentElement;if(!T||exempt(T))continue;const cs=getComputedStyle(T);if(cs.visibility==='hidden'||cs.display==='none')continue;
      const rg=document.createRange();rg.selectNodeContents(n);const tr=rg.getBoundingClientRect();if(!tr.height)continue;
      let a=T,clipped=null;
      while(a&&a!==document.body){if(isScroll(a)&&a!==T){break}
        if(isClip(a)&&a!==T||a===el){const ar=a.getBoundingClientRect();if(tr.bottom>ar.bottom+2||tr.top<ar.top-2){clipped=a;break}}
        if(a===el)break;a=a.parentElement}
      if(clipped){const k=(clipped.id||clipped.className||clipped.tagName).toString().split(' ').slice(0,2).join('.')+'|'+t.slice(0,24);if(seen.has(k))continue;seen.add(k);bad.push({by:(clipped.id?'#'+clipped.id:'.'+(clipped.className+'').split(' ')[0]),txt:t.slice(0,30),lost:Math.round(Math.max(tr.bottom-clipped.getBoundingClientRect().bottom,clipped.getBoundingClientRect().top-tr.top))})}}
    const r=el.getBoundingClientRect();
    /* scroll area = a scrollable element inside the dialog whose content is taller than its box (the text/option area) */
    const sa=[...el.querySelectorAll('*')].filter(x=>isScroll(x)&&x.scrollHeight>x.clientHeight+2).map(x=>(x.id?'#'+x.id:'.'+(x.className+'').split(' ')[0]));
    const mb=el.querySelector(':scope > #mb');const mbOver=mb?mb.scrollHeight-mb.clientHeight:0;const hd=el.querySelector(':scope > .kph');const hr=hd&&hd.getBoundingClientRect();
    return{cls:el.className.toString().split(' ').filter(c=>/^k(panel|dper|dscroll|pe)/.test(c)).join('.'),h:Math.round(r.height),text:el.textContent.length,clipped:bad.slice(0,4),nclip:bad.length,sa,mbOver,hdFixed:hr?hr.top>=r.top-1&&hr.bottom<=r.top+hr.height+2:null,
      fits:r.top>=-1&&r.bottom<=innerHeight+1&&r.left>=-1&&r.right<=innerWidth+1}},LONG);
   size[name]=m||{missing:1};
   await p.evaluate(()=>{Q.length=0;document.getElementById('title').hidden=true;try{document.getElementById('modal').className='modal'}catch(e){}document.getElementById('modal').hidden=true;const d=document.querySelector('.dawn');if(d)d.remove();const o=document.getElementById('ov');if(o&&!o.hidden)o.hidden=true})};
  const run=async(name,fn)=>{try{await p.evaluate(fn,LONG)}catch(e){errs.push(name+': '+String(e.message).slice(0,120))}await measure(name)};
  const longH=(h)=>h+"<p>"+LONG+"</p>";
  await run('info-long',()=>kitModal({kind:"info",title:"Điều dài",sub:"Nhiều dòng",facts:Array.from({length:26},(_,i)=>"Câu số "+(i+1)+" dài vừa phải để thành hàng.")}));
  await run('notice-long',(L)=>{Q.push({t:"Một báo dài",h:"<p>"+L+"</p>"});showModal()});
  await run('result-long',(L)=>{Q.push({t:"Kết quả: thử",h:"<p>Thành công."+L+"</p>"});showModal()});
  await run('choice-long',(L)=>{Q.push({t:"Việc khó",h:"<p>Chọn."+L+"</p>",opts:[{n:"Một",fx:{}},{n:"Hai",fx:{}}]});showModal()});
  await run('choice-6-long',(L)=>{Q.push({t:"Việc khó",h:"<p>Chọn."+L+"</p>",opts:Array.from({length:6},(_,i)=>({n:"Lựa chọn "+(i+1),fx:{}}))});showModal()});
  await run('night-long',(L)=>{Q.push({t:"Đêm",cls:"night",h:"<p>Đêm xuống."+L+"</p>"});showModal()});
  await run('end-long',(L)=>{Q.push({t:"Hết một kiếp",cls:"end",h:"<p>Hết."+L+"</p>"});showModal()});
  await run('identity',()=>{Q.unshift({t:"Nhập cung",nl:1,cls:"nlcard",h:"<p>x</p>"});showModal()});
  await run('nl-card',()=>{nlCard()});
  await run('intel',()=>kitIntelPanel(liveRivals(true)[0]));
  await run('evidence',()=>kitEvidencePanel(liveRivals(true)[0]));
  await run('mood',()=>{const v=liveRivals(true)[0];kitModal({kind:"info",look:1,title:"Tâm trạng · X",sub:"Hiện nay: lo",subject:v,sections:[{h:"Đang tác động",rows:[["Lo","được tấn phong · tuần này","r"]]}],btn:"Đã rõ"})});
  await run('item',()=>kinvOpen(kinvItems()[0]));
  const ids=await p.evaluate(()=>Object.keys(PEND));let n=0;
  for(const lg of [0,1]){n=0;
   for(const id of ids){if(MAXP&&n>=+MAXP)break;
    const ok=await p.evaluate(([id,lg,L])=>{const R=liveRivals(true);const v=R[0];const iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");for(const pp of [{v:v&&v.id,ix:iix},{ix:iix},{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;try{Q.length=0;pushDil(mkP(id,pp),id);if(lg&&Q[0])Q[0].h=(Q[0].h||"")+"<p>"+L+"</p>";showModal();if(Q.length)return true}catch(e){}}return false},[id,lg,LONG]);
    if(ok){n++;await measure('PEND'+(lg?'-long':'')+':'+id)}}}
  R[wh]={size,errs};await ctx.close()}
 fs.writeFileSync(OUT,JSON.stringify(R,null,1));
 for(const wh of Object.keys(R)){const s=R[wh].size;const ks=Object.keys(s).filter(k=>!s[k].missing);let nb=0,nl=0,nsa=0;
  for(const k of ks){const x=s[k];if(x.nclip){nb++;console.log('  CLIP',wh,k.padEnd(34),'by',[...new Set(x.clipped.map(c=>c.by))].join(','),'lost',x.clipped.map(c=>c.lost).join('/'),'| '+x.clipped[0].txt)}
   if(/long/.test(k)){nl++;if(x.sa.length)nsa++;else console.log('  NOSCROLL',wh,k,'mbOver',x.mbOver)}
   if(!x.fits)console.log('  NOFIT',wh,k)}
  console.log(wh,'cases',ks.length,'| clipped-text cases',nb,'| long cases',nl,'with a scroll area',nsa,'| missing',Object.keys(s).filter(k=>s[k].missing).length,'| errs',R[wh].errs.length,R[wh].errs.slice(0,3).join(' ; '));
  if(nb||nsa<nl)bad++}
 await b.close();process.exit(bad?1:0)})();
