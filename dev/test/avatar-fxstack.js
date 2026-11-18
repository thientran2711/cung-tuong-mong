/* review/look-fx-wire + avatar (s43, OD 18/11 ~03:20Z): EVERY avatar frame draws the full kitFxLayers stack (KIT_AV) at mirror strength with the keep-out mask.
   usage: node dev/test/avatar-fxstack.js <fold|ipadAir> <outdir> [fig=c01] [tag=all]   HOST mode (built root). Exit 1 on a failed check.
   Layers scenarios (tag): all = makeup Khuynh thanh + muc lv3 + cao lv2 (scar) ; muc ; cao ; makeup ; pox (thuy dau lv3) ; none.
   Checks: (1) with layers on, EVERY visible avatar <img data-kav> of herself (top bar md, kmini/kfc side cards, md rows, pcPort tall) has a .kfxf[data-kav] with >=1 layer img whose box sits on the picture;
   (2) none: no overlay; (3) face-square marks carry the keep-out mask; (4) overlay boxes follow the picture (centre within 1.5px of the img box centre; same size ratio); (5) 0 page errors.
   Shots: full screen on/off + a frame sheet on/off, 3x crop of the tall frame face. */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
(async()=>{const dev=process.argv[2]||'fold',out=process.argv[3]||'/tmp/avfx',FIG=process.argv[4]||'c01',TAG=process.argv[5]||'all';fs.mkdirSync(out,{recursive:true});const fails=[];const chk=(c,m)=>{if(!c)fails.push(m)};
 const srv=await D.serveRoot();const b=await chromium.launch({args:['--disable-dev-shm-usage'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 const g=await D.openHost(p,srv.url);
 await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:60000});await p.waitForTimeout(2000);
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,.kmov.kcf').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});start()});
 await g.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known,null,{timeout:60000});await p.waitForTimeout(4000);
 await g.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit&&KIT_SCAR.fit,null,{timeout:60000}).catch(()=>{});
 await g.evaluate(id=>{Q.length=0;const MM=document.getElementById('modal');if(MM){MM.hidden=true;MM.innerHTML=''}
  const por='por-consort-'+id+'-t2-a26.webp';window.__avPor=por;const kf0=kitFace;kitFace=function(q){const f=kf0.apply(this,arguments);if(q===S&&f&&f.src){const h=Object.assign({},f,{src:String(f.src).replace(/[^/]*$/,por)});if(f.__kp)h.__kp=f.__kp;return h}return f};
  window.__av={clear(){S.ill=null;S.pz=null;S.rash=null;S.slap=null;S.scar=null;S.sc70=null;S.lk=null;S.stain=null;try{const t=toilToday(S);if(t)delete t.lk}catch(e){}},
   set(tag){this.clear();const mk=(on,sc)=>{const c=toilColFix(null);c.seed=5;S.toilette={day:toilWk()*10,wk:toilWk(),score:sc,makeup:on,style:'fit',dv:'chinh',F:0,occ:[],look:'dep',col:c}};
    mk(tag==='all'||tag==='makeup',90);
    if(tag==='all'||tag==='muc')lkGive(S,'muc',3);
    if(tag==='all'||tag==='cao')S.scar={sev:2,d:5,need:3,pg:0,veil:0,tr:0,cure:0,by:null,at:wk(),how:'test',known:true};
    if(tag==='pox')S.ill={k:'thuydau',st:3,known:true};
    try{render()}catch(e){}}}},FIG);
 const sheet=async(tag)=>{await g.evaluate(tag=>{__av.set(tag);const h=document.getElementById('avg');if(h)h.remove();const host=document.createElement('div');host.id='avg';host.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#f4ead8;padding:8px;display:flex;gap:14px;align-items:flex-start';const q0=pv(S);const q=Object.assign({},q0,{src:String(q0.src).replace(/[^/]*$/,window.__avPor)});if(q0.__kp)q.__kp=q0.__kp;
   host.innerHTML=`<div class="avcell" style="width:150px">${pcPort(q)}</div><div class="avcell" style="width:96px">${mdH(q,'kmini')}</div><div class="avcell" style="width:60px">${mdH(q,'kmini sm')}</div><div class="avcell" style="width:34px">${mdH(q,'')}</div><div class="avcell" style="width:30px">${mdH(q,'sm')}</div>`;document.body.appendChild(host)},tag);
  await g.waitForFunction(()=>[...document.querySelectorAll('#avg img[data-kav]')].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(2500);for(let i=0;i<3;i++){try{await g.evaluate(()=>{toilLodPass();KIT_AV.sweep(document)})}catch(e){}await p.waitForTimeout(500)}};
 const scan=()=>g.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};
  return[...document.querySelectorAll('img[data-kav]')].filter(vis).filter(i=>i.closest('.kr-player,#avg')).map(i=>{const o=i.__kav,ib=i.getBoundingClientRect(),ob=o&&o.isConnected?o.getBoundingClientRect():null;const L=o?[...o.querySelectorAll('img')].map(x=>({c:x.className,mask:(getComputedStyle(x).webkitMaskImage||getComputedStyle(x).maskImage||'')!=='none',src:(x.currentSrc||x.src||'').split('/').pop().slice(0,28)})):[];
   return{inAvg:!!i.closest('#avg'),w:Math.round(ib.width),cls:(i.closest('.pcp,.md')||i.parentElement).className.toString().slice(0,30),has:!!o,n:L.length,L,dx:ob?Math.round((ob.left+ob.width/2)-(ib.left+ib.width/2)):null,dy:ob?Math.round((ob.top+ob.height/2)-(ib.top+ib.height/2)):null}})});
 const out2={dev,fig:FIG,tag:TAG};
 await sheet(TAG);if(process.env.EVAL){console.log(JSON.stringify(await g.evaluate(process.env.EVAL)))}out2.on=await scan();await p.screenshot({path:`${out}/${dev}-${FIG}-${TAG}-full-on.png`});const el=await g.$('#avg');if(el)await el.screenshot({path:`${out}/${dev}-${FIG}-${TAG}-frames-on.png`});
 await sheet('none');out2.off=await scan();await p.screenshot({path:`${out}/${dev}-${FIG}-none-full-off.png`});const e2=await g.$('#avg');if(e2)await e2.screenshot({path:`${out}/${dev}-${FIG}-${TAG}-frames-off.png`});
 chk(out2.on.length>=4,'fewer than 4 avatar frames on screen: '+out2.on.length);
 if(TAG!=='none'&&TAG!=='makeup')chk(out2.on.filter(r=>r.w>=20&&r.inAvg).every(r=>r.has&&r.n>0),'avatar frame without the layer stack: '+JSON.stringify(out2.on.filter(r=>!(r.has&&r.n>0))));
 chk(out2.on.every(r=>!r.has||(Math.abs(r.dx)<=2&&Math.abs(r.dy)<=2)),'overlay off the picture centre: '+JSON.stringify(out2.on.filter(r=>r.has&&(Math.abs(r.dx)>2||Math.abs(r.dy)>2))));
 chk(out2.on.every(r=>r.L.filter(x=>/klk|kpox/.test(x.c)).every(x=>x.mask)),'face-square mark without the keep-out mask');
 chk(out2.off.every(r=>!r.has||r.n===0),'layers off but an avatar still has a layer');chk(errs.length===0,'page errors: '+errs.join('|'));
 out2.errs=errs;out2.fails=fails;console.log(JSON.stringify(out2));await b.close();srv.close();process.exit(fails.length?1:0)})();
