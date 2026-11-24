/* review/kit-kpb · kdscroll kpanel scan (KIT REQUEST 18/11 "kpanel intro covered by a long option list").
   Opens EVERY PEND dialog that has an option list (+ generic kitModal pickers with 2/4/8/24 options and a subject / facts / item card) and measures, in each
   `.dlg.kdscroll` (and any other dialog that has .opts under #mb): the intro block `.kpb` rendered height vs its content (scrollHeight), whether any
   visible text of the intro/facts/item card lies under the option list (overlap with .opts), and whether the option list is reachable (scrolls or fits).
   FAIL (exit 1) when any case has: .kpb shorter than its content while NOT scrolling inside itself (.kdtx/.kpmain scroll), or any visible intro text overlapping
   the .opts rectangle, or text of the intro out of the dialog.
   usage: node dev/test/kpb-scan.js <page URL (dev/index.html or built root)> <outfile.json> [WxH@dpr,...] [maxPend]   → table per viewport + exit code. */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');const [,,URL,OUT,SIZES,MAXP]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(SIZES||"755x1000@2,1180x820@2,1366x1024@2,412x1058@2,390x844@3").split(",");
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const R={};let bad=0;
 for(const sz of VPS){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:Math.min(+dpr,2),hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  if(process.env.BEFORE)await p.addStyleTag({content:'.modal .dlg.kdscroll>#mb>.kpb{flex:0 1 auto!important;min-height:0}'});/* BEFORE=1 re-applies the old jk4 rule to reproduce the 'before' table */
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&typeof rivals!=='undefined'&&rivals&&rivals.length>0,null,{timeout:60000});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();Q.length=0;document.getElementById('modal').hidden=true;
   try{S.an=35;S.tamco=40;S.inv.push({k:"tramngoc",from:"me"},{k:"hacdinh"},{k:"docngam"},{k:"kimbac"},{k:"yensao"},wkMake(S,"mon",2,80))}catch(e){}render()});await sleep(1500);
  const size={};
  const measure=async(name)=>{await sleep(1100);const m=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return null;const d=M.querySelector('.dlg');if(!d)return null;
    const mb=d.querySelector(':scope > #mb');const o=mb&&mb.querySelector(':scope > .opts');const kb=mb&&mb.querySelector(':scope > .kpb');
    const dr=d.getBoundingClientRect();const out={cls:d.className.toString().split(' ').filter(c=>/^k(panel|dper|dscroll|dtx|pe)/.test(c)).join('.'),dlgH:Math.round(dr.height),hasOpts:!!o,hasKpb:!!kb};
    if(!o||!kb)return out;
    const cs=e=>getComputedStyle(e),visRect=(e)=>{let r=e.getBoundingClientRect();let a=e.parentElement;
      while(a&&a!==d.parentElement){const c=cs(a);if(/hidden|clip|auto|scroll/.test(c.overflowY)||/hidden|clip|auto|scroll/.test(c.overflowX)){const q=a.getBoundingClientRect();r={top:Math.max(r.top,q.top),bottom:Math.min(r.bottom,q.bottom),left:Math.max(r.left,q.left),right:Math.min(r.right,q.right)}}if(a===d)break;a=a.parentElement}
      return r};
    const kr=kb.getBoundingClientRect(),or=o.getBoundingClientRect(),mr=mb.getBoundingClientRect();
    const sel=':scope > .kpmain';const tx=kb.querySelector(sel);const txScrolls=!!tx&&/auto|scroll/.test(cs(tx).overflowY)&&tx.scrollHeight>tx.clientHeight+1;
    const kbClips=/hidden|clip|auto|scroll/.test(cs(kb).overflowY);
    out.kpbH=Math.round(kr.height);out.kpbSH=kb.scrollHeight;out.shrunk=kb.scrollHeight-Math.round(kr.height);out.txScrolls=txScrolls;out.kbClips=kbClips;
    out.optsH=Math.round(or.height);out.optsSH=o.scrollHeight;out.optsScroll=o.scrollHeight>o.clientHeight+1;out.nOpts=o.children.length;out.mbH=Math.round(mr.height);out.mbSH=mb.scrollHeight;
    /* overlap: visible text of the intro (not inside .opts) lying under the option list rectangle */
    const ov=[];const tw=document.createTreeWalker(kb,NodeFilter.SHOW_TEXT);let n;
    while(n=tw.nextNode()){const t=n.textContent.trim();if(t.length<2)continue;const T=n.parentElement;if(!T||o.contains(T))continue;const c=cs(T);if(c.visibility==='hidden'||c.display==='none')continue;
      const rg=document.createRange();rg.selectNodeContents(n);const r0=rg.getBoundingClientRect();if(r0.width<1||r0.height<1)continue;
      const q=visRect(T);const top=Math.max(r0.top,q.top),bot=Math.min(r0.bottom,q.bottom);if(bot-top<2)continue;
      if(bot>or.top+1&&top<or.bottom-1)ov.push(t.slice(0,40))}
    /* intro content geometrically spilling below the kpb box (overflow visible) = it lies over the options */
    const spill=!kbClips&&kb.scrollHeight>kr.height+1;out.overlap=ov.length;out.ovTxt=ov.slice(0,3);out.spill=spill;
    out.optsVisible=or.height>=Math.min(96,o.scrollHeight)-2;out.inDlg=kr.top>=dr.top-1&&or.bottom<=dr.bottom+1;
    return out});
   size[name]=m||{missing:1};
   await p.evaluate(()=>{Q.length=0;document.getElementById('title').hidden=true;try{document.getElementById('modal').className='modal'}catch(e){}document.getElementById('modal').hidden=true;const d=document.querySelector('.dawn');if(d)d.remove();const o=document.getElementById('ov');if(o&&!o.hidden)o.hidden=true})};
  const run=async(name,fn,arg)=>{try{await p.evaluate(fn,arg)}catch(e){errs.push(name+': '+String(e.message).slice(0,120))}await measure(name)};
  /* generic pickers: subject + facts + N options (the pgpick shape) */
  for(const N of [2,4,8,24]){
   await run('generic-subj-facts:'+N,(N)=>{const v=liveRivals(true)[0];kitModal({kind:"choice",title:"Chọn một",sub:"thử",subject:v,facts:["Một câu giới thiệu khá dài để chiếm vài dòng trong khung giới thiệu của hộp chọn.","Câu thứ hai nói thêm về món đồ và người nhận, đủ dài để xuống dòng trên điện thoại.","Câu thứ ba cảnh báo."],opts:Array.from({length:N},(_,i)=>({n:"Lựa chọn "+(i+1),fx:{},x:"Khá chắc · thành: được · hỏng: mất"}))})},N);
   await run('generic-text:'+N,(N)=>{Q.push({t:"Việc khó",h:"<p>Hãy chọn một trong các việc dưới đây, mỗi việc có hậu quả riêng.</p><p>Đoạn hai của lời dẫn, để thân khung cao hơn một chút.</p>",opts:Array.from({length:N},(_,i)=>({n:"Lựa chọn "+(i+1),fx:{}}))});showModal()},N)}
  const ids=await p.evaluate(()=>Object.keys(PEND));let n=0;
  for(const id of ids){if(MAXP&&n>=+MAXP)break;
   const ok=await p.evaluate(([id])=>{const R=liveRivals(true);const v=R[0];const cand=[];S.inv.forEach((e,i)=>cand.push({v:v&&v.id,ix:i}),cand.push({v:v&&v.id}),cand.push({}));
    for(const pp of cand.reverse()){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;if(!d.o||d.o.length<2)continue;
     try{Q.length=0;pushDil(mkP(id,pp),id);showModal();if(Q.length)return true}catch(e){}}return false},[id]);
   if(ok){n++;await measure('PEND:'+id)}}
  R[wh]={size,errs};await ctx.close()}
 fs.writeFileSync(OUT,JSON.stringify(R,null,1));
 for(const wh of Object.keys(R)){const s=R[wh].size;const ks=Object.keys(s).filter(k=>!s[k].missing&&s[k].hasKpb&&s[k].hasOpts);let nb=0;
  const rows=[];
  for(const k of ks){const x=s[k];const fail=(x.shrunk>1&&!x.txScrolls&&!x.kbClips)||(x.shrunk>1&&x.kbClips&&!x.txScrolls)||x.overlap>0||(!x.inDlg&&!(/kdper/.test(x.cls)&&x.mbSH>x.mbH+1))||!x.optsVisible;
   if(fail){nb++;console.log('  FAIL',wh,k.padEnd(34),'kpb',x.kpbH+'/'+x.kpbSH,'opts',x.optsH+'/'+x.optsSH,'n',x.nOpts,'overlap',x.overlap,'spill',x.spill,'txScroll',x.txScrolls,'|',(x.ovTxt||[]).join(' / '))}
   rows.push(k.padEnd(34)+' kpb '+String(x.kpbH).padStart(4)+'/'+String(x.kpbSH).padEnd(4)+' opts '+String(x.optsH).padStart(4)+'/'+String(x.optsSH).padEnd(4)+' n'+String(x.nOpts).padEnd(3)+' ov'+x.overlap+(x.txScrolls?' txscroll':'')+(x.optsScroll?' optscroll':'')+(fail?'  <== FAIL':''))}
  if(process.env.TABLE)console.log(wh+'\n'+rows.join('\n'));
  console.log(wh,'cases with kpb+opts',ks.length,'| FAIL',nb,'| no-opts/missing',Object.keys(s).length-ks.length,'| errs',R[wh].errs.length,R[wh].errs.slice(0,3).join(' ; '));
  if(nb)bad++}
 await b.close();process.exit(bad?1:0)})();
