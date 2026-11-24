/* review/panel-size (owner 15/11 "kích thước khung khác nhau"): every pop-up uses the SAME frame size per viewport (KIT §8).
   Opens every kind of #modal / dawn / #ov panel and every PEND event dialog, measures the frame (.dlg / .dbox / .mg) and prints a table.
   usage: node dev/test/panel-size.js <page URL> <outfile.json> [WxH@dpr,...] [maxPend]  → JSON {size:{case:{w,h,cls,...}}} + verdict per viewport
   FAIL (exit 1) when, at one viewport, the frames of the panel family do not share one width and one height, or content leaves the frame. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES,MAXP]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(SIZES||"755x1000@2,1000x755@2,1180x820@2,1366x1024@2,844x390@3,390x844@3,412x1058@2").split(",");
const EXEMPT=/^(pcm|zoom)/; /* person card keeps pcard (KIT §3); picture zoom is a lightbox, not a panel */
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
  const measure=async(name)=>{await sleep(350);const m=await p.evaluate(()=>{const vis=e=>e&&!e.hidden&&e.offsetParent!==null||e&&getComputedStyle(e).position==='fixed';
    const M=document.getElementById('modal');let el=null,kind='';
    const ov=document.querySelector('#ov .mg');const dawn=document.querySelector('.dawn .dbox');
    if(!M.hidden){el=M.querySelector('.dlg');kind='modal'}else if(dawn&&dawn.offsetParent!==null){el=dawn;kind='dawn'}else if(ov&&ov.offsetParent!==null){el=ov;kind='ov'}
    if(!el)return null;const r=el.getBoundingClientRect();const body=el.querySelector('#mb,.kpb,.dbody')||el;
    const bs=(M&&M.querySelector('#mb'));const sc=[...el.querySelectorAll('*')].filter(x=>x.scrollHeight>x.clientHeight+2&&/auto|scroll/.test(getComputedStyle(x).overflowY)).map(x=>(x.id||x.className||x.tagName).toString().split(' ')[0]).slice(0,3);
    const btn=el.querySelector('#mr button,.k3foot button,.kbtn');const br=btn&&btn.getBoundingClientRect();
    const xb=el.querySelector('.kph>.kit-x');const xr=xb&&xb.getBoundingClientRect();const kh=(el.querySelector('.kph')||el).getBoundingClientRect();const xIn=xr?xr.top>=kh.top-1&&xr.bottom<=kh.bottom+1:null;
    const seal=(el.querySelector('.kpseal')||{}).textContent||'';const mbE=el.querySelector(':scope > #mb'),hdE=el.querySelector(':scope > .kph'),mrE=el.querySelector(':scope > #mr');const ch=Math.round((hdE?hdE.offsetHeight:0)+(mbE?[...mbE.children].reduce((s,c)=>{const cs=getComputedStyle(c);return s+c.offsetHeight+parseFloat(cs.marginTop)+parseFloat(cs.marginBottom)},0)+12:0)+(mrE&&!mrE.hidden?mrE.offsetHeight:0));const compact=el.classList.contains('kpcompact');const art=!!el.querySelector('.kpsubj,.kpiart,.kdlgart,.kaart,.ksart');    const sb=el.querySelector('.kpb.kpshort');let ksc=null;if(sb){const bm=sb.getBoundingClientRect(),kids=[...sb.children].filter(c=>c.offsetParent!==null).map(c=>c.getBoundingClientRect()),mm=kids.length?{left:Math.min(...kids.map(k=>k.left)),right:Math.max(...kids.map(k=>k.right)),top:Math.min(...kids.map(k=>k.top)),bottom:Math.max(...kids.map(k=>k.bottom))}:sb.getBoundingClientRect(),ctr=r=>(r.top+r.bottom)/2;ksc={dy:Math.round(ctr(mm)-ctr(bm)),ta:getComputedStyle(sb).textAlign,mx:Math.round((mm.left+mm.right)/2-(bm.left+bm.right)/2)}}
    return{kind,ksc,ch,compact,art,w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top),cls:el.className.toString().replace(/\s+/g,' ').slice(0,70),mcls:M.className.replace(/\s+/g,' '),seal,
     fits:r.top>=-1&&r.bottom<=innerHeight+1&&r.left>=-1&&r.right<=innerWidth+1,btnIn:br&&br.width>0?br.bottom<=r.bottom+1&&br.top>=r.top:null,scroll:sc,xIn,hs:el.scrollWidth>el.clientWidth+2}});
   if(m)size[name]=m;else size[name]={missing:1};
   await p.evaluate(()=>{Q.length=0;document.getElementById('title').hidden=true;try{document.getElementById('modal').className='modal'}catch(e){}document.getElementById('modal').hidden=true;const d=document.querySelector('.dawn');if(d)d.remove();const o=document.getElementById('ov');if(o){o.hidden=true;o.innerHTML=''}try{kitItemCardClose&&kitItemCardClose()}catch(e){}});};
  const run=async(name,fn)=>{try{await p.evaluate(fn)}catch(e){errs.push(name+': '+String(e.message).slice(0,120))}await measure(name)};
  await run('info-short',()=>kitModal({kind:"info",title:"Điều ngắn",sub:"Một dòng",facts:["Một câu ngắn."]}));
  await run('kpshort',()=>kitModal({kind:"info",title:"Một lời",sub:"ngắn",facts:["Chỉ một câu ngắn thôi."]}));
  await run('info-long',()=>kitModal({kind:"info",title:"Điều dài",sub:"Nhiều dòng",facts:Array.from({length:26},(_,i)=>"Câu số "+(i+1)+" dài vừa phải để thành hàng.")}));
  await run('rule',()=>kitModal({kind:"rule",title:"Luật nhỏ",sub:"phép tắc",sections:[{h:"Thang",tiers:[{k:"1–3",n:"nhỏ",d:"một",c:"g"},{k:"4–6",n:"vừa",d:"hai",c:"r"}]}]}));
  await run('news',()=>{Q.push({t:"Tin trong cung",h:"<p>Một tin ngắn.</p>"});showModal()});
  await run('notice',()=>{Q.push({t:"Một báo",h:"<p>Ngắn.</p>"});showModal()});
  await run('notice-long',()=>{Q.push({t:"Một báo dài",h:"<p>"+"Một câu khá dài để nội dung chiếm nhiều dòng trong khung. ".repeat(30)+"</p>"});showModal()});
  await run('result',()=>{Q.push({t:"Kết quả: thử",h:"<p>Thành công.</p>"});showModal()});
  await run('reward',()=>{Q.push({t:"Ban thưởng",h:"<p>Một món.</p>"});showModal()});
  await run('night',()=>{Q.push({t:"Đêm",cls:"night",h:"<p>Đêm xuống.</p>"});showModal()});
  await run('end',()=>{Q.push({t:"Hết một kiếp",cls:"end",h:"<p>Hết.</p>"});showModal()});
  await run('choice-2',()=>{Q.push({t:"Việc khó",h:"<p>Chọn.</p>",opts:[{n:"Một",fx:{}},{n:"Hai",fx:{}}]});showModal()});
  await run('choice-6',()=>{Q.push({t:"Việc khó",h:"<p>Chọn.</p>",opts:Array.from({length:6},(_,i)=>({n:"Lựa chọn "+(i+1),fx:{}}))});showModal()});
  await run('intel',()=>kitIntelPanel(liveRivals(true)[0]));
  await run('evidence',()=>kitEvidencePanel(liveRivals(true)[0]));
  await run('mood',()=>{const v=liveRivals(true)[0];kitModal({kind:"info",look:1,title:"Tâm trạng · X",sub:"Hiện nay: lo",subject:v,sections:[{h:"Đang tác động",rows:[["Lo","được tấn phong · tuần này","r"]]}],btn:"Đã rõ"})});
  await run('item',()=>kinvOpen(kinvItems()[0]));
  await run('place',()=>{kitPanel({kind:"info",title:"Ngự hoa viên"},true);kitPlaceDress(Q[0],"vuon");showModal()});
  await run('calendar',()=>kitMonthCalOpen());
  await run('confirm',()=>{Q.push({t:"Chắc chưa?",h:"<p>Làm vậy không quay lại được.</p>",opts:[{n:"Chắc",fx:{}},{n:"Thôi",fx:{}}]});showModal()});
  await run('picker-3',()=>{Q.push({t:"Chọn một người",opts:[{n:"Một",fx:{}},{n:"Hai",fx:{}},{n:"Ba",fx:{}}]});showModal()});
  await run('title-menu',()=>{document.getElementById('title').hidden=false;showTitle()});
  await run('title-opt',()=>{document.getElementById('title').hidden=false;showTitle();const b=document.querySelector('#modal [data-tgo="opt"]');if(b)b.click()});
  await run('title-slots',()=>{document.getElementById('title').hidden=false;showTitle();const b=document.querySelector('#modal [data-tgo="slots"]');if(b)b.click()});
  await run('title-past',()=>{document.getElementById('title').hidden=false;showTitle();const b=document.querySelector('#modal [data-tgo="past"]');if(b)b.click()});
  await run('identity',()=>{Q.unshift({t:"Nhập cung",nl:1,cls:"nlcard",h:"<p>x</p>"});showModal()});
  const ids=await p.evaluate(()=>Object.keys(PEND));let n=0;
  for(const id of ids){if(MAXP&&n>=+MAXP)break;
   const ok=await p.evaluate(id=>{const R=liveRivals(true);const v=R[0];const iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");for(const pp of [{v:v&&v.id,ix:iix},{ix:iix},{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;try{Q.length=0;pushDil(mkP(id,pp),id);showModal();if(Q.length)return true}catch(e){}}return false},id);
   if(ok){n++;await measure('PEND:'+id)}}
  R[wh]={size,errs};
  await p.screenshot({path:'/dev/null'}).catch(()=>{});await ctx.close()}
 fs.writeFileSync(OUT,JSON.stringify(R,null,1));
 for(const wh of Object.keys(R)){const s=R[wh].size;const ks=Object.keys(s).filter(k=>!s[k].missing&&!EXEMPT.test(k));
  const ws=[...new Set(ks.map(k=>s[k].w))],hs=[...new Set(ks.map(k=>s[k].h))];const big=ks.filter(k=>!s[k].compact),cp=ks.filter(k=>s[k].compact);const bhs=[...new Set(big.map(k=>s[k].h))];
  console.log('  '+wh+' TABLE  case | compact | frame h | content h | empty%');for(const k of ks)console.log('   '+k.padEnd(28),s[k].compact?'COMPACT':'big    ',String(s[k].h).padStart(4),String(s[k].ch).padStart(4),Math.max(0,Math.round(100*(s[k].h-s[k].ch)/s[k].h))+'%',s[k].art?'art':'');
  const wasteBad=cp.filter(k=>s[k].h-s[k].ch>60);if(wasteBad.length)console.log('  WASTE>60px in compact:',wasteBad.join(','));if(bhs.length>1)console.log('  BIG frames differ:',bhs.join('/'));
  console.log(wh,'cases',ks.length,'widths',ws.join('/'),'heights',hs.sort((a,b)=>a-b).join('/'),'| missing:',Object.keys(s).filter(k=>s[k].missing).join(','),'| nofit:',ks.filter(k=>!s[k].fits).join(','),'| xOut:',ks.filter(k=>s[k].xIn===false).join(','),'| btnOut:',ks.filter(k=>s[k].btnIn===false).join(','),'| kpshort:',ks.filter(k=>s[k].ksc).map(k=>k+' dy='+s[k].ksc.dy+' mx='+s[k].ksc.mx+' '+s[k].ksc.ta).join(';')||'NONE','| errs',R[wh].errs.length);
  const off=ks.filter(k=>s[k].ksc&&(Math.abs(s[k].ksc.dy)>8||Math.abs(s[k].ksc.mx)>8||s[k].ksc.ta!=='center'));if(off.length||!ks.some(k=>s[k].ksc)){console.log('  KPSHORT FAIL',off.join(',')||'no kpshort case rendered');bad++}
  if(ws.length>1||bhs.length>1||ks.some(k=>s[k].compact&&s[k].h>Math.max(...bhs,0)+1))bad++}
 await b.close();process.exit(bad?1:0)})();
