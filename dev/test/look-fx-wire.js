/* look-fx-wire shots: usage node dev/test/look-fx-wire.js <device: fold|ipadAir> <outdir> [figs=c01,c30]
   HOST mode (built root index.html via rot.js). For c01 + c30 (por + fig forced onto the player) and every face mark x lv1/2/3:
   stage figure (full body, fig-fit rows) | big portrait | mirror zoom (por rows). One png per look/fig/lv into outdir (+ a 3x crop of the stage face). */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
(async()=>{const dev=process.argv[2]||'fold',out=process.argv[3]||'/tmp/lfw-shots',FIGS=(process.argv[4]||'c01,c30').split(',');fs.mkdirSync(out,{recursive:true});
 const srv=await D.serveRoot();const b=await chromium.launch({args:['--disable-dev-shm-usage'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
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
  window.__lfw.mark=(m,lv)=>{const c=window.__lfw.clear;c();try{toilAuto()}catch(e){}const T=S.toilette;if(T&&!T.makeup){T.makeup=true;T.look='dep'}
   if(m==='thuydau'||m==='daumua')S.ill={k:m,st:lv,known:true};
   else if(m==='poxscar'){S.scar={sev:lv,d:5,need:3,pg:0,veil:0,tr:0,cure:0,by:null,at:wk(),how:'daumua',known:true}}
   else if(m==='cao'){S.scar={sev:lv,d:5,need:3,pg:0,veil:0,tr:0,cure:0,by:null,at:wk(),how:'test',known:true,known:true}}
   else lkGive(S,m,lv)};
  window.__lfw.render=()=>{let h=document.getElementById('__lfwbox');if(h)h.remove();h=document.createElement('div');h.id='__lfwbox';h.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#2a2630;display:flex;gap:12px;padding:10px;width:'+(innerWidth<700?'580px;height:330px':'1150px;height:400px')+';box-sizing:border-box;overflow:hidden';
   const f=kitFace(S);const file=kitFile(f.src||'');
   h.innerHTML=`${innerWidth<700?"":`<div style="width:200px;height:380px;position:relative;overflow:hidden"><div style="position:absolute;left:0;top:0;width:330px;height:740px;transform-origin:0 0;transform:scale(.55) translate(-65px,0)">${kitStageFig(S,{cap:false})}</div></div>`}<div style="width:${innerWidth<700?260:300}px;height:${innerWidth<700?260:300}px;position:relative;overflow:hidden;background:#000">${kitFaceZoom(S,file)}</div><div style="width:${innerWidth<700?290:380}px;height:${innerWidth<700?310:380}px;position:relative;overflow:hidden"><div style="position:absolute;left:${innerWidth<700?-20:25}px;top:0;width:330px;height:740px;transform-origin:50% 0;transform:translate(0,-6px) scale(3.4)">${kitStageFig(S,{cap:false})}</div></div>`;document.body.appendChild(h);for(const c of document.body.children){if(c!==h&&c.style&&!c.dataset.lfwHid){c.dataset.lfwHid=1;c.style.setProperty('display','none','important')}}}});
 const LOOKS=[['thuydau'],['daumua'],['poxscar'],['muc'],['bui'],['muoi'],['moho'],['cao']];let n=0;
 for(const id of FIGS){await g.evaluate(i=>__lfw.set(i),id);
  for(const [m] of LOOKS)for(let lv=1;lv<=3;lv++){await g.evaluate(([m,lv])=>{__lfw.mark(m,lv);__lfw.render()},[m,lv]);await p.waitForTimeout(1500);
   const el=await g.$('#__lfwbox');const f=`${out}/${dev}-${id}-${m}-lv${lv}.png`;await el.screenshot({path:f});n++}}
 console.log(JSON.stringify({shots:n,errs:errs.slice(0,5)}));await b.close();srv.close()})();
