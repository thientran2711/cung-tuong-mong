/* review/kit-pframe-overlay (owner 21/11 ~18:55Z, KIT §4.1c): every portrait-frame column — (1) the label block above the frame (title plate / rank / name / niên hiệu)
   is centred on the frame's opening axis; (2) the info rows under the frame (.kpkey: Biết tên, X → ta, Sủng …) lie OVER the pendant + tassel: their top = the frame's
   band bottom (opening bottom + band) + ONE gap (KIT_PFO.gap, same for every frame), no empty band; the column ends at the rows' bottom (or the tassel's, if lower).
   usage: node dev/test/kit-pframe-overlay.js <url> <outdir> [WxH,...] [scene,...]   (shots of each scene; JSON rows per card)
   scenes: tab-court (Hậu cung › Chí tôn) tab-rv tab-staff tab-men tab-kin pop-maid pop-elder */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,SIZES,SCN]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const SCENES={'pop-maid':"popKind('maid')",'pop-elder':"popKind('elder')",'tab-rv':"tabGo('rv')",'tab-court':"tabGo('court')",'tab-staff':"tabGo('staff')",'tab-men':"tabGo('men')",'tab-kin':"tabGo('kid')"};
(async()=>{const b=await chromium.launch();let bad=0;const ALL={};
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render();
   document.querySelectorAll('#kboot,.modal.kload').forEach(x=>x.remove())
   window.popKind=k=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';S.out=0;S.confined=0;render();const ps=curPeople();const i=ps.findIndex(x=>x.kind===k);if(i<0)return 'none';popIdx=i;popMsg='';renderStage();return 'ok'};
   window.tabGo=t=>{Q.length=0;try{popIdx=-1;popMsg=''}catch(e){};document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};return 'ok'}});
  await p.waitForTimeout(1500);
  /* WHOLE GROUP: every frame in KIT_PFO.band vs its picture's own alpha (same bar method), once per run */
  if(!ALL.table){const T=await p.evaluate(async()=>{const out={};for(const k of Object.keys(KIT_PFO.band)){const u=IMG_U('img/kit/frame-'+k+'.webp');out[k]=await new Promise(res=>{const im=new Image();im.crossOrigin='anonymous';im.onload=()=>{const W=im.naturalWidth,H=im.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,W,H).data;
    const xs=[];for(let i=Math.floor(.25*W);i<Math.floor(.44*W);i++)xs.push(i);for(let i=Math.floor(.56*W);i<Math.floor(.75*W);i++)xs.push(i);let bar=null;for(let y=Math.floor(720*H/1037);y<Math.floor(900*H/1037);y++){let n=0;for(const i of xs)if(d[(y*W+i)*4+3]>60)n++;if(n>=.5*xs.length)bar=y}res([KIT_PFO.band[k],bar==null?null:Math.round(bar*1037/H)])};im.onerror=()=>res([KIT_PFO.band[k],null]);im.src=u})}return out});
   ALL.table=T;const off=Object.entries(T).filter(([k,[t,m]])=>m==null||Math.abs(t-m)>2);console.log('band table vs alpha:',Object.keys(T).length,'frames',off.length?'FAIL '+JSON.stringify(off):'PASS (all within 2 units)');bad+=off.length}
  for(const sc of (SCN?SCN.split(","):Object.keys(SCENES))){const r0=await p.evaluate(SCENES[sc]);await p.waitForTimeout(3000);await p.evaluate(()=>document.querySelectorAll('#kboot,.modal.kload').forEach(x=>x.remove()));
   /* the frame's real bar bottom, measured in the browser from the frame picture's OWN alpha (same method as dev/tools/pframe-band.py), never from KIT_PFO's table */
   await p.evaluate(async()=>{window.__pfb=window.__pfb||{};const srcs=[...new Set([...document.querySelectorAll('.pc>.pcl>.pcp.kit .kin img')].map(i=>i.currentSrc||i.src).filter(u=>/frame-[a-z]+(-\d)?(-w)?\.webp/.test(u)))];
    await Promise.all(srcs.filter(u=>__pfb[u]==null).map(u=>new Promise(res=>{const im=new Image();im.crossOrigin='anonymous';im.onload=()=>{try{const W=im.naturalWidth,H=im.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,W,H).data;
     const xs=[];for(let i=Math.floor(.25*W);i<Math.floor(.44*W);i++)xs.push(i);for(let i=Math.floor(.56*W);i<Math.floor(.75*W);i++)xs.push(i);let bar=null;
     for(let y=Math.floor(720*H/1037);y<Math.floor(900*H/1037);y++){let n=0;for(const i of xs)if(d[(y*W+i)*4+3]>60)n++;if(n>=.5*xs.length)bar=y}__pfb[u]=bar==null?-1:bar*1037/H}catch(e){__pfb[u]=-1}res()};im.onerror=()=>{__pfb[u]=-1;res()};im.src=u})))});
   const M=await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&getComputedStyle(e).visibility!=='hidden'};
    return [...document.querySelectorAll('.pc>.pcl')].filter(vis).slice(0,6).map(l=>{const fr=l.querySelector('.pcp.kit');if(!fr)return null;const kin=fr.querySelector('.kin')||fr;
     const R=e=>{const r=e.getBoundingClientRect();return{l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};
     const k=R(kin);/* canvas 550x1037: opening x 83..467 (centre 275), y 214..720; band bottom ≈ y 780 (measured on the frame pictures: KIT_PFO.band) */
     const sc=k.h/1037,axis=k.l+k.w/2,openB=k.t+720*sc,fim=[...fr.querySelectorAll('.kin img')].find(i=>/frame-/.test(i.currentSrc||i.src)),realB=fim&&window.__pfb?__pfb[fim.currentSrc||fim.src]:null,bandB=k.t+(realB>0?realB:NaN)*sc,canvasB=k.t+1037*sc;
     const lab=[...l.querySelectorAll('.knr,.kt3,.kpsn,.pcname,.pchead,.kpnm')].filter(e=>vis(e)&&e.getBoundingClientRect().bottom<=k.t+300*sc).map(R);
     const lb=lab.length?lab.reduce((a,c)=>({l:Math.min(a.l,c.l),r:Math.max(a.r,c.r),t:Math.min(a.t,c.t),b:Math.max(a.b,c.b)})):null;
     const after=[...l.children].filter(c=>c!==fr&&vis(c)&&c.getBoundingClientRect().top>k.t+600*sc);const key=after.length?after.map(R).reduce((a,c)=>c.t<a.t?c:a):null;const col=R(l);
     return{fk:fim?(fim.currentSrc||fim.src).replace(/.*frame-|\.webp.*/g,''):null,realB:realB>0?Math.round(realB):null,nar:l.parentElement.classList.contains('kpnar'),name:(l.textContent||'').trim().slice(0,24),sc:+sc.toFixed(3),labCx:lb?Math.round((lb.l+lb.r)/2-axis):null,labW:lb?Math.round(lb.r-lb.l):null,
      keyGap:key?Math.round(key.t-bandB):null,keyOverTassel:key?key.t<canvasB:null,emptyBelow:key?Math.round(col.b-Math.max(key.b,canvasB)):Math.round(col.b-canvasB),
      colH:Math.round(col.h),keyH:key?Math.round(key.h):null}}).filter(Boolean)});
   const top=await p.evaluate(()=>{const e=document.elementFromPoint(300,500);const ch=[];let x=e;while(x&&ch.length<4){ch.push(x.tagName+'#'+x.id+'.'+String(x.className).slice(0,24));x=x.parentElement}return ch.join(' < ')+' tab='+(typeof tab!=='undefined'?tab:'?')+' pcl='+document.querySelectorAll('.pcl').length});if(process.env.DBG)console.log(top);
   ALL[wh+' '+sc]=M;const f=[];for(const c of M){if(!c.nar&&c.labCx!=null&&Math.abs(c.labCx)>3)/* narrow card (phone portrait, unsupported screen): the name block is a full row above portrait + bars by design */f.push(c.name+' label off axis '+c.labCx);if(c.keyGap==null&&c.keyH!=null)f.push(c.name+' no alpha measure');if(c.keyGap!=null&&(c.keyGap<8||c.keyGap>14))f.push(c.name+' key gap '+c.keyGap)}
   bad+=f.length;console.log(wh,sc,r0,JSON.stringify(M),f.length?'FAIL '+f.join('; '):'PASS');
   await p.evaluate(()=>{const l=[...document.querySelectorAll('.pc>.pcl')].find(e=>{const q=e.getBoundingClientRect();return q.width>50&&q.height>50});if(l){const pc=l.closest('.pc');const t=pc.getBoundingClientRect().top;if(t>innerHeight*.45||t<0)pc.scrollIntoView({block:'start'})}});await p.waitForTimeout(400);
   await p.evaluate(()=>{document.querySelectorAll('.modal').forEach(m=>{if(!m.querySelector('.pc')&&getComputedStyle(m).display!=='none')m.style.display='none'});/* result toasts / pop-ups over the card (not part of the frame column) */const rt=document.getElementById('rtoast');if(rt)rt.style.display='none';document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if((c.position==='fixed'||c.position==='absolute')&&+c.zIndex>=50&&!e.querySelector('.pc')&&!e.closest('.pc')&&/KẾT QUẢ|Xem đầy đủ trong Sổ ghi/.test(e.textContent||'')&&e.getBoundingClientRect().width<innerWidth*.95)e.style.display='none'})});await p.waitForTimeout(300);
   for(let k=0;k<4;k++){await p.evaluate(()=>{const pc=[...document.querySelectorAll('.pc')].find(e=>{const q=e.getBoundingClientRect();return q.width>50&&q.height>50&&getComputedStyle(e).visibility!=='hidden'});if(!pc)return;const r=pc.getBoundingClientRect();const pts=[];for(let x=.15;x<1;x+=.2)for(let y=.1;y<1;y+=.15)pts.push([r.left+r.width*x,Math.min(innerHeight-2,r.top+r.height*y)]);
     /* anything covering the card (late result toast, reward tray, gift pop-up) is hidden for the shot: not part of the frame column */
     for(const [x,y] of pts)for(const e of document.elementsFromPoint(x,y)){if(e.closest('.pc'))break;let t=e;while(t&&t!==document.body){const c=getComputedStyle(t);if(c.position==='fixed'&&!t.querySelector('.pc')){t.style.display='none';break}t=t.parentElement}}});await p.waitForTimeout(400)}
   await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:72})}
  if(errs.length){console.log(wh,'page errors',errs.slice(0,5));bad+=errs.length}await ctx.close()}
 fs.writeFileSync(OUT+'/pframe.json',JSON.stringify(ALL,null,1));console.log(bad?'FAIL '+bad:'ALL PASS');await b.close();process.exit(bad?1:0)})();
