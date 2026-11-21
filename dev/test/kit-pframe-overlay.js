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
  for(const sc of (SCN?SCN.split(","):Object.keys(SCENES))){const r0=await p.evaluate(SCENES[sc]);await p.waitForTimeout(3000);await p.evaluate(()=>document.querySelectorAll('#kboot,.modal.kload').forEach(x=>x.remove()));
   const M=await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&getComputedStyle(e).visibility!=='hidden'};
    return [...document.querySelectorAll('.pc>.pcl')].filter(vis).slice(0,6).map(l=>{const fr=l.querySelector('.pcp.kit');if(!fr)return null;const kin=fr.querySelector('.kin')||fr;
     const R=e=>{const r=e.getBoundingClientRect();return{l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};
     const k=R(kin);/* canvas 550x1037: opening x 83..467 (centre 275), y 214..720; band bottom ≈ y 780 (measured on the frame pictures: KIT_PFO.band) */
     const sc=k.h/1037,axis=k.l+k.w/2,openB=k.t+720*sc,bandB=k.t+(window.KIT_PFO?KIT_PFO.of(fr):780)*sc,canvasB=k.t+1037*sc;
     const lab=[...l.querySelectorAll('.knr,.kt3,.kpsn,.pcname,.pchead,.kpnm')].filter(e=>vis(e)&&e.getBoundingClientRect().bottom<=k.t+300*sc).map(R);
     const lb=lab.length?lab.reduce((a,c)=>({l:Math.min(a.l,c.l),r:Math.max(a.r,c.r),t:Math.min(a.t,c.t),b:Math.max(a.b,c.b)})):null;
     const after=[...l.children].filter(c=>c!==fr&&vis(c)&&c.getBoundingClientRect().top>k.t+600*sc);const key=after.length?after.map(R).reduce((a,c)=>c.t<a.t?c:a):null;const col=R(l);
     return{nar:l.parentElement.classList.contains('kpnar'),name:(l.textContent||'').trim().slice(0,24),sc:+sc.toFixed(3),labCx:lb?Math.round((lb.l+lb.r)/2-axis):null,labW:lb?Math.round(lb.r-lb.l):null,
      keyGap:key?Math.round(key.t-bandB):null,keyOverTassel:key?key.t<canvasB:null,emptyBelow:key?Math.round(col.b-Math.max(key.b,canvasB)):Math.round(col.b-canvasB),
      colH:Math.round(col.h),keyH:key?Math.round(key.h):null}}).filter(Boolean)});
   const top=await p.evaluate(()=>{const e=document.elementFromPoint(300,500);const ch=[];let x=e;while(x&&ch.length<4){ch.push(x.tagName+'#'+x.id+'.'+String(x.className).slice(0,24));x=x.parentElement}return ch.join(' < ')+' tab='+(typeof tab!=='undefined'?tab:'?')+' pcl='+document.querySelectorAll('.pcl').length});if(process.env.DBG)console.log(top);
   ALL[wh+' '+sc]=M;const f=[];for(const c of M){if(!c.nar&&c.labCx!=null&&Math.abs(c.labCx)>3)/* narrow card (phone portrait, unsupported screen): the name block is a full row above portrait + bars by design */f.push(c.name+' label off axis '+c.labCx);if(c.keyGap!=null&&(c.keyGap<4||c.keyGap>24))f.push(c.name+' key gap '+c.keyGap)}
   bad+=f.length;console.log(wh,sc,r0,JSON.stringify(M),f.length?'FAIL '+f.join('; '):'PASS');
   const el=await p.$('.pc>.pcl');if(el){try{await el.evaluate(e=>e.closest('.pc').scrollIntoView({block:'start'}))}catch(e){}await p.waitForTimeout(400)}
   await p.evaluate(()=>document.querySelectorAll('.modal').forEach(m=>{if(!m.querySelector('.pc')&&getComputedStyle(m).display!=='none')m.style.display='none'}));await p.waitForTimeout(300);
   await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:72})}
  if(errs.length){console.log(wh,'page errors',errs.slice(0,5));bad+=errs.length}await ctx.close()}
 fs.writeFileSync(OUT+'/pframe.json',JSON.stringify(ALL,null,1));console.log(bad?'FAIL '+bad:'ALL PASS');await b.close();process.exit(bad?1:0)})();
