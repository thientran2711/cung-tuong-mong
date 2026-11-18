/* look-fx-wire shots: usage node dev/test/look-fx-wire.js <device: fold|ipadAir> <outdir> [figs=c01,c30]
   HOST mode (built root index.html via rot.js). For c01 + c30 (por + fig forced onto the player) and every face mark x lv1/2/3:
   stage figure (full body, fig-fit rows) | big portrait | mirror zoom (por rows). One png per look/fig/lv into outdir (+ a 3x crop of the stage face). */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
(async()=>{const dev=process.argv[2]||'fold',out=process.argv[3]||'/tmp/lfw-shots',FIGS=(process.argv[4]||'c01,c30').split(',');fs.mkdirSync(out,{recursive:true});
 const srv=await D.serveRoot();const b=await chromium.launch({args:['--disable-dev-shm-usage'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await D.newDeviceContext(b,dev);
 /* LFW_OVR=<dir>: serve candidate files (scar-fit.json, veil-fit.json, fx-*.png in <dir>) instead of the live CDN ones, so a candidate is judged in the game before anything goes live; LFW_ONLY=muoi,cao limits the marks (base = the figure without any mark; ask for it explicitly: LFW_ONLY=base) */
 if(process.env.LFW_OVR)await ctx.route(/\/img\/(scar-fit\.json|veil-fit\.json|face-fit\.json|fx-[a-z-]+-\d(-m)?\.png)(\?.*)?$/,r=>{const f=process.env.LFW_OVR+'/'+r.request().url().split('/').pop().split('?')[0];fs.existsSync(f)?r.fulfill({path:f,headers:{'access-control-allow-origin':'*'}}):r.continue()});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 const g=await D.openHost(p,srv.url);
 await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:60000});await p.waitForTimeout(2000);
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await g.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known,null,{timeout:60000});await p.waitForTimeout(4000);
 await g.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit&&KIT_SCAR.fit,null,{timeout:60000}).catch(()=>{});
 await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__lfw={};
  window.__lfw.set=(id)=>{const por='por-consort-'+id+'-t2-a26.webp',fig='fig-consort-'+id+'-t2-a26.webp';const kf0=window.__kf0||(window.__kf0=kitFace),kg0=window.__kg0||(window.__kg0=kitFigOf);
   kitFace=function(q){const f=kf0.apply(this,arguments);if(q===S&&f&&f.src){const h=Object.assign({},f,{src:String(f.src).replace(/[^/]*$/,por)});if(f.__kp)h.__kp=f.__kp;return h}return f};
   kitFigOf=function(q){const s=kg0.apply(this,arguments);return q===S?String(s).replace(/[^/?]*(\?.*)?$/,fig):s};window.__lfw.por=por;window.__lfw.fig=fig};
  window.__lfw.clear=()=>{S.ill=null;S.pz=null;S.rash=null;S.slap=null;S.scar=null;S.sc70=null;S.lk=null;S.stain=null;try{const t=toilToday(S);if(t)delete t.lk}catch(e){}};
  window.__lfw.mark=(m,lv)=>{const c=window.__lfw.clear;c();if(m==='base')return; /* base = no mark at all (to tell a mark defect from a defect of the cut-out figure itself) */try{toilAuto()}catch(e){}const T=S.toilette;if(T){T.makeup=(m==='moho')} /* marks sheets: makeup OFF (except mồ hôi, a mark that only exists on a made-up face: LK_MK / lkMadeUp) so no blush/lip layer is mixed in (the auto toilette gave a random makeup per run: pink glow on the cheek / lip corner in some runs) */
   if(m==='thuydau'||m==='daumua')S.ill={k:m,st:lv,known:true};
   else if(m==='poxscar'){S.scar={sev:lv,d:5,need:3,pg:0,veil:0,tr:0,cure:0,by:null,at:wk(),how:'daumua',known:true}}
   else if(m==='cao'){S.scar={sev:lv,d:5,need:3,pg:0,veil:0,tr:0,cure:0,by:null,at:wk(),how:'test',known:true,known:true}}
   else lkGive(S,m,lv)};
  window.__lfw.render=()=>{let h=document.getElementById('__lfwbox');if(h)h.remove();h=document.createElement('div');h.id='__lfwbox';const wide=innerWidth>=900;
   /* FULL-SCREEN layout (fills the whole viewport): wide = 3 columns (stage figure | mirror zoom | stage face zoom), narrow = stage figure left, mirror top right, stage face zoom bottom right */
   h.style.cssText='position:fixed;inset:0;z-index:99999;background:#2a2630;display:grid;gap:10px;padding:10px;box-sizing:border-box;overflow:hidden;'+(wide?'grid-template-columns:1fr 1.15fr 1.15fr;grid-template-rows:1fr':'grid-template-columns:1fr 1.1fr;grid-template-rows:1fr 1fr');
   const f=kitFace(S);const file=kitFile(f.src||'');const pn=(s)=>`position:relative;overflow:hidden;${s}`;
   h.innerHTML=`<div id="__lfwa" style="${pn(wide?'':'grid-row:1/3;')}"><div id="__lfwa1" style="position:absolute;left:0;top:0;width:330px;height:740px;transform-origin:0 0">${kitStageFig(S,{cap:false})}</div></div><div style="${pn('background:#000')}">${kitFaceZoom(S,file)}</div><div id="__lfwc" style="${pn('')}"><div id="__lfwz" style="position:absolute;left:0;top:0;width:330px;height:740px;transform-origin:0 0">${kitStageFig(S,{cap:false})}</div></div>`;
   for(const c of document.body.children){if(c!==h&&c.style&&!c.dataset.lfwHid){c.dataset.lfwHid=1;c.style.setProperty('display','none','important')}}document.body.appendChild(h);
   /* stage figure: fit the whole 330x740 figure to panel A */
   try{const A=document.getElementById('__lfwa'),a1=document.getElementById('__lfwa1'),k=Math.min(A.offsetWidth/330,A.offsetHeight/740);a1.style.transform=`translate(${(A.offsetWidth-330*k)/2}px,0) scale(${k})`}catch(e){}
   /* stage face zoom: centre the fig row (veil-fit) of this figure in the panel and scale it to ~170 px wide, whatever the figure's own layout is */
   try{const z=document.getElementById('__lfwz'),im=z.querySelector('img'),r=KIT_VEIL.fit[window.__lfw.fig],P=z.parentNode,pw=P.offsetWidth,ph=P.offsetHeight;const go=()=>{z.style.transform='none';const b=im.getBoundingClientRect(),zb=z.getBoundingClientRect();const w=b.width,hh=b.height,fx=b.left-zb.left+(r[0]+r[2]/2)/100*w,fy=b.top-zb.top+(r[1]+r[3]/2)/100*hh,k=Math.min(pw,ph)*.55/(r[2]/100*w);z.style.transform=`translate(${pw/2-fx*k}px,${ph/2-fy*k}px) scale(${k})`};go();im.addEventListener('load',go);setTimeout(go,800)}catch(e){}}});
 const LOOKS=[['base'],['thuydau'],['daumua'],['poxscar'],['muc'],['bui'],['muoi'],['moho'],['cao']];let n=0;
 for(const id of FIGS){await g.evaluate(i=>__lfw.set(i),id);await g.evaluate(()=>{__lfw.mark('cao',1);__lfw.render()});await p.waitForTimeout(4000); /* warm-up: first portrait load of a figure is slow */
  for(const [m] of LOOKS.filter(x=>process.env.LFW_ONLY?process.env.LFW_ONLY.split(',').includes(x[0]):x[0]!=='base'))for(const lv of (process.env.LFW_LVS||'1,2,3').split(',').map(Number)){await g.evaluate(([m,lv])=>{__lfw.mark(m,lv);__lfw.render()},[m,lv]);await p.waitForTimeout(2500);
   const diag=()=>g.evaluate(()=>[...document.querySelectorAll('#__lfwbox img')].map(i=>({c:(i.className||'').toString().slice(0,18),ok:i.complete&&i.naturalWidth>0,nw:i.naturalWidth,f:i.src.split('/').pop().slice(0,34)})));
   /* every cell must be rendered: wait (max 20 s) until every <img> of the box is loaded, log what was missing (a blank cell was a slow CDN picture in the harness, not a game bug: see report R5) */
   let dg=await diag();for(let w=0;w<20&&dg.some(x=>!x.ok);w++){await p.waitForTimeout(1000);dg=await diag()}const bad=dg.filter(x=>!x.ok);if(bad.length)console.log('NOT LOADED',id,m,lv,JSON.stringify(bad));
   const f=`${out}/${dev}-${id}-${m}-lv${lv}.png`;
   if(process.env.LFW_GAME){ /* REAL GAME SCREENS (owner: shots must be the game itself, full screen): 1 = her own stage figure on the home screen, 2 = the face close-up the game shows (toilette / mirror screen) */
    await g.evaluate(()=>{const b=document.getElementById('__lfwbox');if(b)b.remove();for(const c of document.body.children){if(c.dataset&&c.dataset.lfwHid){c.style.removeProperty('display');delete c.dataset.lfwHid}}document.querySelectorAll('.kroul,#kroul,.kmov.kcf').forEach(e=>e.remove());try{closeModal()}catch(e){}try{render()}catch(e){}});await p.waitForTimeout(2500);
    await p.screenshot({path:f.replace('.png','-home.png')});
    await g.evaluate(()=>{try{toilOpen()}catch(e){window.__lfwErr=String(e)}});await p.waitForTimeout(3500);await p.screenshot({path:f.replace('.png','-mirror.png')});
    await g.evaluate(()=>{try{closeModal()}catch(e){}const mo=document.getElementById('modal');if(mo)mo.hidden=true;Q.length=0});n++;continue}
   await p.screenshot({path:f});n++}}
 console.log(JSON.stringify({shots:n,errs:errs.slice(0,5)}));await b.close();srv.close()})();
