/* review/stage-pets (owner 16/11 18:00Z): ONE "theo hầu" pet beside each person on the room / place stage (KIT 33.8 KIT_PET).
   usage: node dev/test/stage-pets.js <page URL> <WxH@dpr> <outdir> [tag]      (env CASES = JSON [[name,place,[herPet,rival1Pet,rival2Pet]],...], SHOTS=0 = no screenshots)
   Cases = 1 / 2 / 3 people (her included) with S / M / L pets (pets set on her and on the rivals standing in the garden "vuon").
   Per case it measures, from the real pixels (alpha masks of the two pictures at their rendered rects):
   - pet-on-person occlusion: % of the person's opaque pixels covered by the pet (all), in the FACE band (head top -> 22 % of body height) and the TORSO core (kitFigBody cl..cr, 25-75 % of body);
   - no pet over a neighbour; no pet outside the stage / under the side column; the pet stands on the person's floor line.
   Prints one line per case; the JSON (all numbers) goes to <outdir>/<tag>-<W>x<H>.json; failures in ck[] (empty = pass). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,TAG]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const prox=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
const CASES=JSON.parse(process.env.CASES||'[["n1S","vuon",["meomuop"]],["n1M","vuon",["cho"]],["n1L","vuon",["thanhlong"]],["n2SL","vuon",["meo","kylan"]],["n2LL","vuon",["hac","thienma"]],["n3SML","vuon",["tho","cuuvi","bachloc"]],["n3LLL","vuon",["thanhlong","hac","kylan"]],["n3MMM","vuon",["cho","cuuvi","phuong"]]]');
(async()=>{const b=await chromium.launch(prox);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox{display:none!important}';document.head.appendChild(s)})});
 await p.route(/ctmload=1/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');const lg=m=>console.error(new Date().toISOString().slice(11,19),m);lg('booted');
 await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render();
  const kl=document.getElementById('kload');if(kl)kl.remove();document.querySelectorAll('.krbox,#kroul').forEach(e=>e.remove())});
 await p.evaluate(v=>{if(v)KIT_STAGE3.v=v},process.env.STAGE3||null);
 await sleep(1500);
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok,.kspet{animation:none!important}#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}'});
 const OUTR={vp:VP,cases:{}};if(process.env.J59DBG){await p.evaluate(()=>{window.__j59dbg=1});p.on('console',m=>{if(/J59TRY/.test(m.text()))console.log(m.text())})}
 const ALL=[];for(const [n,k,pp] of CASES){ALL.push([n+'-base',k,pp.map(()=>null)]);ALL.push([n,k,pp])}
 for(const [name,k,pets] of ALL){const base=/-base$/.test(name);
  const nr=pets.length-1;lg('case '+name);
  await p.evaluate(async([k,nr,pets])=>{Q.length=0;window.kmPush=function(){};document.querySelectorAll('.kmov,#dawn,#kpodov,.kmfls').forEach(e=>e.remove());document.body.classList.remove('kbk-open');const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;
   S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
   const mk=t=>!t?null:({t,at:0,src:"emp",care:90,full:90,clean:90,joy:90,aff:60,stg:2});
   for(const v of rivals){v.pets=[];v.petOn=-1}S.pets=pets[0]?[mk(pets[0])]:[];S.petOn=pets[0]?0:-1;
   const L=liveRivals(true).slice(0,nr);L.forEach((v,i)=>{Wh[v.id]=k;v.pets=pets[i+1]?[mk(pets[i+1])]:[];v.petOn=pets[i+1]?0:-1});
   S.place="home";used=0;tab="act";goTo(k);await new Promise(r=>setTimeout(r,2500));return true},[k,nr,pets]);
  await p.waitForFunction(n=>{if(!n)return true;const v=e=>e&&e.offsetParent!==null&&e.getBoundingClientRect().width>2;const f=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(v).length;return document.querySelectorAll('#stage .kspet').length>=Math.min(n,f)},base?0:3,{timeout:30000}).catch(()=>lg('no pets after 20s'));await sleep(base?4000:3500);
  const r=await p.evaluate(async()=>{const st=document.getElementById('stage'),R=st.getBoundingClientRect();
   const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>2;
   const ld=src=>new Promise(res=>{const im=new Image();im.crossOrigin='anonymous';im.onload=()=>res(im);im.onerror=()=>res(null);im.src=src});
   const cv=(im,q)=>{const w=Math.max(1,Math.round(q.width)),h=Math.max(1,Math.round(q.height));const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0,w,h);return{d:x.getImageData(0,0,w,h).data,w,h,x:q.left-R.left,y:q.top-R.top}};
   const figs=[];const me=document.getElementById('mefig');if(vis(me))figs.push({who:'me',el:me});
   document.querySelectorAll('#tokens .tok').forEach(t=>{if(!vis(t))return;const im=t.querySelector('img.figimg');if(im)figs.push({who:'p'+t.dataset.p,el:im})});
   const pets=[...st.querySelectorAll('.kspet')].filter(vis);
   for(const f of figs){const q=f.el.getBoundingClientRect(),b=kitFigBody(f.el.getAttribute('src'))||{l:0,r:1,t:0,b:1,ht:0,cl:.3,cr:.7};f.q=q;f.b=b;f.vis={l:q.left-R.left+q.width*b.l,r:q.left-R.left+q.width*b.r,t:q.top-R.top+q.height*b.t,b:q.top-R.top+q.height*b.b};f.core={l:q.left-R.left+q.width*b.cl,r:q.left-R.left+q.width*b.cr};f.ht=q.top-R.top+q.height*(b.ht>b.t?b.ht:b.t)}
   figs.sort((a,b)=>a.vis.l-b.vis.l);const kn=document.getElementById('kshR');const col=kn&&!kn.hidden&&kn.offsetHeight?kn.getBoundingClientRect().left-R.left:null;
   const res={dbg:st.dataset.j59dbg,pages:st.dataset.j59pg||'1',stage:{w:R.width,h:R.height},col,n:figs.length,pets:pets.length,people:[]};
   for(const f of figs){const fi=await ld(f.el.getAttribute('src'));const A=fi?cv(fi,f.q):null;const rec={who:f.who,vis:f.vis,body:+(f.vis.b-f.ht).toFixed(0)};
    const best=pets.find(e=>e.dataset.pk===f.who);
    if(best&&A){const pim=await ld(best.getAttribute('src'));const q=best.getBoundingClientRect();const P=pim?cv(pim,q):null;
     if(P){let both=0,tot=0,face=0,faceTot=0,tor=0,torTot=0;const bodyH=f.vis.b-f.ht;
      for(let y=0;y<A.h;y++){const gy=A.y+y;for(let x=0;x<A.w;x++){const gx=A.x+x;if(A.d[(y*A.w+x)*4+3]<=40)continue;const inFace=gy>=f.ht&&gy<f.ht+bodyH*.22;const inTor=gy>=f.ht+bodyH*.25&&gy<=f.ht+bodyH*.75&&gx>=f.core.l&&gx<=f.core.r;
        tot++;if(inFace)faceTot++;if(inTor)torTot++;
        const px=Math.round(gx-P.x),py=Math.round(gy-P.y);if(px<0||py<0||px>=P.w||py>=P.h)continue;if(P.d[(py*P.w+px)*4+3]>40){both++;if(inFace)face++;if(inTor)tor++}}}
      const pb=kitFigBody(best.getAttribute('src'))||{l:0,r:1,t:0,b:1};
      rec.pet={k:best.dataset.pet,cls:best.dataset.cls,ph:!!best.dataset.ph,vl:+(q.left-R.left+q.width*pb.l).toFixed(1),vr:+(q.left-R.left+q.width*pb.r).toFixed(1),vt:+(q.top-R.top+q.height*pb.t).toFixed(1),vb:+(q.top-R.top+q.height*pb.b).toFixed(1),
       h:+((q.height*(pb.b-pb.t))/bodyH).toFixed(3),cover:+(100*both/Math.max(1,tot)).toFixed(2),coverFace:+(100*face/Math.max(1,faceTot)).toFixed(2),coverTorso:+(100*tor/Math.max(1,torTot)).toFixed(2)}}}
    res.people.push(rec)}
   return res});
  if(process.env.DBG)console.error(JSON.stringify(await p.evaluate(()=>({img:Object.keys(KIT_PET.img).length,ppl:curPeople().map(x=>x.kind+':'+(x.id||x.name)),vk:S.visit&&S.visit.k,L:liveRivals(true).slice(0,3).map(v=>v.id+'@'+S.where[v.id]),pet:(()=>{try{const P=kitPetOf(S);return P&&P.t}catch(e){return 'ERR '+e.message}})(),kids:[...document.getElementById('stage').children].map(e=>e.id||e.className).slice(0,12),pg:document.getElementById('stage').dataset.j59n,dbg:document.getElementById('stage').dataset.j59dbg,free:document.getElementById('stage').dataset.j59free,errs:window.__e}))));
  if(process.env.DUMPCOL)console.log('COL',await p.evaluate(()=>{const k=document.getElementById('kshR');return JSON.stringify(window.KIT_STAGE3)+document.getElementById('stage').className+' kgrw='+document.getElementById('stage').style.getPropertyValue('--kgrw')+' n='+curPeople().length+' '+(k?k.getBoundingClientRect().width+'x'+k.getBoundingClientRect().height+' '+k.innerHTML.slice(0,0):'none')}));
  const ck=[];if(base){OUTR.cases[name]={res:r,ck};console.log(name,'N/H/sw/maxW:',r.dbg);continue}const pk=r.people.filter(x=>x.pet);if(pk.length!==r.pets)ck.push(`pets drawn ${r.pets} vs people-with-pet ${pk.length}`);
  r.people.forEach((x,i)=>{if(!x.pet){ck.push(`${x.who} has no pet`);return}
   if(x.pet.coverFace>0.5)ck.push(`${x.who} pet covers FACE band ${x.pet.coverFace}%`);if(x.pet.coverTorso>8)ck.push(`${x.who} pet covers TORSO ${x.pet.coverTorso}%`);
   if(Math.abs(x.pet.vb-x.vis.b)>3)ck.push(`${x.who} pet feet ${x.pet.vb} vs person feet ${x.vis.b.toFixed(1)}`);
   const nx=r.people[i+1];if(nx&&x.pet.vr>nx.vis.l+0.5)ck.push(`${x.who} pet right ${x.pet.vr} reaches neighbour ${nx.vis.l.toFixed(1)}`);
   if(x.pet.vr>r.stage.w+0.5)ck.push(`${x.who} pet outside stage`);if(r.col!=null&&x.pet.vr>r.col+0.5)ck.push(`${x.who} pet under side column ${r.col}`)});
  OUTR.cases[name]={res:r,ck};
  if(process.env.SHOTS!=='0'){await p.evaluate(async()=>{const i=document.getElementById('scimg');if(!i)return;const m=/url\(["']?([^"')]+)["']?\)/.exec(i.style.backgroundImage||getComputedStyle(i).backgroundImage||'');if(m)await new Promise(r=>{const im=new Image();im.onload=im.onerror=r;im.src=m[1];if(im.complete)r()});for(let k=0;k<60&&!(window.PX&&PX.bg)&&getComputedStyle(i).opacity==='0';k++)await new Promise(r=>setTimeout(r,500))}).catch(()=>lg('scimg not loaded'));await sleep(800)}
  if(process.env.SHOTS!=='0')await p.screenshot({path:`${OUT}/${TAG||'sp'}-${W}x${H}-${name}.jpg`,type:'jpeg',quality:70,timeout:240000})}
 OUTR.errs=errs;fs.writeFileSync(`${OUT}/${TAG||'sp'}-${W}x${H}.json`,JSON.stringify(OUTR,null,1));
 for(const [n,c] of Object.entries(OUTR.cases))if(!/-base$/.test(n))console.log(n,'people',c.res.n,'pets',c.res.pets,c.ck.length?'FAIL '+c.ck.join(' | '):'pass','body(px):'+c.res.people.map(x=>x.body).join('/'),'col:'+(c.res.col==null?'-':Math.round(c.res.stage.w-c.res.col)),'petpx:'+c.res.people.map(x=>x.pet?Math.round((x.pet.vb-x.pet.vt)):'-').join('/'),'N/H/sw/maxW/petEx:'+c.res.dbg,c.res.people.map(x=>x.pet?`${x.pet.k}/${x.pet.cls}/h${x.pet.h}/cov${x.pet.cover}%/face${x.pet.coverFace}%/torso${x.pet.coverTorso}%`:'-').join(' '));
 console.log('errs',JSON.stringify(errs));await b.close()})();
