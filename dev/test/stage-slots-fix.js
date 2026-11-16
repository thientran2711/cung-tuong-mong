/* review/stage-slots-fix (owner 16/11 OWNER BUG): figures stand in the fixed slots and NEVER overlap.
   usage: node dev/test/stage-slots-fix.js <page URL> <WxH@dpr> <outdir> <tag>
   Real stages with 1, 2, 3 people (+ a man, + 5 for paging). Per page it measures every figure's VISIBLE bounding box
   (kitFigBody l..r of the art, not the transparent margin; includes wide sleeves) and asserts:
   - no two visible boxes intersect; no box reaches into the side column (free width = dataset j59free);
   - centres = 1 → 1/2, 2 → 1/3 · 2/3, 3 → 1/4 · 2/4 · 3/4 of the free width (tolerance 2 px).
   Prints JSON {cases:{name:{pages,ck}}}; ck = failures (empty = pass). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,TAG]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render()});
 await sleep(1500);
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}'});
 /* places: vuon (garden), ksp (a man), and her home; people counts include her */
 const CASES=[["n1","vuon",0,0],["n2","vuon",1,0],["n3","vuon",2,0],["n3m","vuon",1,1],["n5","vuon",4,1],["h2","home",1,0]];
 const OUTR={vp:VP,cases:{}};
 for(const [name,k,nr,nm] of CASES){
  const ok=await p.evaluate(async([k,nr,nm])=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;
   S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
   liveRivals(true).slice(0,nr).forEach(v=>Wh[v.id]=k);(S.men||[]).filter(m=>m.alive).slice(0,nm).forEach(m=>S.menW[m.id]=k);
   S.place="home";used=0;tab="act";goTo(k);await new Promise(r=>setTimeout(r,2500));return true},[k,nr,nm]);
  const pages=[];
  for(let pg=0;pg<6;pg++){await sleep(2200);
   const r=await p.evaluate(()=>{const st=document.getElementById('stage'),R=st.getBoundingClientRect();const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>2;
    const fig=(im,who)=>{const b=kitFigBody(im.getAttribute('src'))||{l:0,r:1};const q=im.getBoundingClientRect();return{who,l:+(q.left-R.left+q.width*b.l).toFixed(1),r:+(q.left-R.left+q.width*b.r).toFixed(1),src:im.getAttribute('src').split('/').pop()}};
    const L=[];const me=document.getElementById('mefig');if(vis(me))L.push(fig(me,'me'));
    document.querySelectorAll('#tokens .tok').forEach(t=>{if(!vis(t))return;const im=t.querySelector('img.figimg');if(im)L.push(fig(im,'p'+t.dataset.p))});
    L.sort((a,b)=>a.l-b.l);
    const fr=(st.dataset.j59free||'0,0').split(',').map(Number);
    const kR=document.getElementById('kshR');let col=null;if(kR&&!kR.hidden&&kR.offsetHeight){const q=kR.getBoundingClientRect();col=+(q.left-R.left).toFixed(1)}
    const chips=[...st.querySelectorAll('.j59more')].filter(vis).map(c=>({side:c.classList.contains('j59ml')?'l':'r'}));
    return{stage:{w:+R.width.toFixed(1),h:+R.height.toFixed(1)},free:fr,col,L,chips,people:curPeople().length}});
   r.page=pg;pages.push(r);
   if(process.env.SHOTS!=='0')await p.screenshot({path:`${OUT}/${TAG}-${W}x${H}-${name}-p${pg+1}.jpg`,type:'jpeg',quality:60,timeout:240000});
   if(!r.chips.find(c=>c.side==='r'))break;
   await p.evaluate(()=>{const c=document.querySelector('#stage .j59more.j59mr');if(c)c.click()})}
  const ck=[];
  for(const x of pages){const L=x.L;if(!L.length){ck.push('p'+(x.page+1)+' no figure');continue}
   for(let i=1;i<L.length;i++)if(L[i].l<L[i-1].r-0.5)ck.push(`p${x.page+1} OVERLAP ${L[i-1].who}[${L[i-1].l},${L[i-1].r}] x ${L[i].who}[${L[i].l},${L[i].r}] by ${(L[i-1].r-L[i].l).toFixed(1)}px`);
   const [x0,av]=x.free;if(W>=600&&x.col!=null&&L[L.length-1].r>x.col+0.5)ck.push(`p${x.page+1} figure reaches side column ${L[L.length-1].r} > ${x.col}`);
   if(L[0].l<-0.5||L[L.length-1].r>x.stage.w+0.5)ck.push(`p${x.page+1} figure outside stage`);
   const k=L.length;L.forEach((f,i)=>{const want=x0+av*(i+1)/(k+1),c=(f.l+f.r)/2;if(Math.abs(c-want)>2)ck.push(`p${x.page+1} slot ${i+1}/${k} centre ${c.toFixed(1)} want ${want.toFixed(1)}`)})}
  OUTR.cases[name]={pages:pages.map(x=>({pg:x.page,n:x.L.length,stage:x.stage,free:x.free,col:x.col,L:x.L})),ck}}
 OUTR.errs=errs;console.log(JSON.stringify(OUTR));await b.close()})();
