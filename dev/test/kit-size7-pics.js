/* kit-size7-pics.js — owner 16/11 ~21:10Z: the event picture FILLS its kit frame at every size (cover, no letterbox / blur pad) and the subject sits inside the crop.
   Renders EVERY event picture (img/ev-*, info-*, act-cat-* in assets.json) in the real v3 frame (kszFrame3) at S/M/L/XL for a person-centred kind (news: strip) and an
   event-centred kind (notice: S = 3:4 main picture), measures: fills (img box == frame box, object-fit cover, no .kpz), subject centre inside the window, % of the subject box visible.
   usage: node dev/test/kit-size7-pics.js <url> <WxH> [out.json] [jksize.js to inject = BEFORE] [only=comma list of picture names]   exit 1 on a non-filling frame */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SZ,OUT='-',INJ='-',ONLY='']=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.kitKnown=()=>true;window.isKnown61=()=>true;window.k61Named=()=>true;window.met61=()=>true;window.kitKnownName=()=>true;document.querySelectorAll('.kmov,#kroul,#kroulw,#krottip').forEach(e=>e.remove())});
 if(W<H)await p.evaluate(()=>{document.documentElement.classList.remove('kv2');document.documentElement.classList.add('kv1')});
 if(INJ!=='-')await p.addScriptTag({content:fs.readFileSync(INJ,'utf8')});
 const A=JSON.parse(await (await ctx.request.get(URL.replace(/[^\/]*$/,'')+'assets.json')).text?await (await ctx.request.get(URL.replace(/[^\/]*$/,'')+'assets.json')).text():'{}');
 const txt=JSON.stringify(A);let pics=[...new Set([...txt.matchAll(/img\/((?:ev-|info-|act-cat-)[^"\/\\]+)\.webp/g)].map(x=>x[1]))].sort();if(ONLY)pics=ONLY.split(',');
 const res=await p.evaluate(async pics=>{const out=[];const host=document.createElement('div');host.id='kszhost';host.style.cssText='position:absolute;left:0;top:0;width:900px;visibility:hidden';document.body.appendChild(host);
  const kinds=['news','notice'];const SP=kszSpecs3();
  for(const kind of kinds){const X=SP[kind];for(const name of pics){for(const K of ['S','M','L','XL']){const sp=Object.assign({},X[K],{pic:'img/'+name+'.webp'});host.innerHTML=kszFrame3(sp,K);const d=host.firstElementChild;
    const im=d.querySelector('.k3ev img,.k3mpic img');if(im&&!im.complete)await new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,8000)});try{kitFrameApply3(d)}catch(e){}
    const c=d.querySelector('.k3ev,.k3mpic');const cr=c.getBoundingClientRect(),ir=im.getBoundingClientRect(),cs=getComputedStyle(im);const Wn=im.naturalWidth,Hn=im.naturalHeight;
    const sj=kitPicSubj('img/'+name+'.webp')||[.5,.5,.5,.5];let vis=null,inside=null;
    if(Wn&&cr.width&&cr.height){const s=Math.max(cr.width/Wn,cr.height/Hn),vw=cr.width/s/Wn,vh=cr.height/s/Hn;const op=(im.style.objectPosition||'50% 50%').split(' ').map(v=>parseFloat(v)/100);
     const x0=(1-vw)*op[0],y0=(1-vh)*op[1],x1=x0+vw,y1=y0+vh;const ix=Math.max(0,Math.min(x1,sj[2])-Math.max(x0,sj[0])),iy=Math.max(0,Math.min(y1,sj[3])-Math.max(y0,sj[1]));vis=ix*iy/((sj[2]-sj[0])*(sj[3]-sj[1]));const cx=(sj[0]+sj[2])/2,cy=(sj[1]+sj[3])/2;inside=cx>=x0&&cx<=x1&&cy>=y0&&cy<=y1}
    out.push({kind,name,K,cw:cr.width|0,ch:cr.height|0,iw:ir.width|0,ih:ir.height|0,fit:cs.objectFit,pad:c.classList.contains('kpz'),nat:Wn+'x'+Hn,vis:vis==null?null:+vis.toFixed(2),inside,fills:Math.abs(ir.width-cr.width)<4.5&&Math.abs(ir.height-cr.height)<4.5&&cs.objectFit==='cover'&&!c.classList.contains('kpz')})}}}
  host.remove();return out},pics);
 const bad=res.filter(r=>!r.fills||r.nat==='0x0'),lowv=res.filter(r=>r.vis!=null&&r.vis<.6);const by={};for(const r of res){const k=r.kind+' '+r.K;(by[k]=by[k]||{n:0,fill:0,vis:0,visn:0,min:9,out:0});const o=by[k];o.n++;o.fill+=r.fills?1:0;if(r.vis!=null){o.vis+=r.vis;o.visn++;o.min=Math.min(o.min,r.vis)}if(r.inside===false)o.out++}
 console.log(SZ,'pictures',pics.length,'frames',res.length,'NOT filling/broken',bad.length,'subject<60% visible',lowv.length,'errs',errs.length);for(const [k,o] of Object.entries(by))console.log(' ',k.padEnd(10),'fill',o.fill+'/'+o.n,'avg subject visible',(o.vis/Math.max(1,o.visn)).toFixed(2),'min',o.min.toFixed(2),'centre outside',o.out);
 if(bad.length)console.log('bad sample',JSON.stringify(bad.slice(0,6)));if(OUT!=='-')fs.writeFileSync(OUT,JSON.stringify(res));await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
