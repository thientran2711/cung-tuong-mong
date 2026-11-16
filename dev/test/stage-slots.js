/* review/stage-slots (owner 11/15 06:55Z): the stage SLOT TEMPLATE (KIT 33.7) — fixed slots per screen (iPad 3, Fold 2, her included),
   her only once (slot 1 of page 1), "+N" / "‹" page chips, one head count for Dư đồ · stage title · page chips.
   usage: node dev/test/stage-slots.js <page URL> <WxH@dpr> <outdir> <tag> [oldPageURL]
   For each case (place with 1, 2, 3, 5 other people; a man and a eunuch among them) it walks every page and measures every figure:
   core-centre x vs the slot centre, feet y vs the floor line, name chip rects (inside the slot, no overlap), how often she appears,
   the Dư đồ count, the title count and the chips. Prints JSON; shots <outdir>/<tag>-<WxH>-<case>-p<page>.jpg (SHOTS=0: none). */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,URL,VP,OUT,TAG,OLD]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(p,url){await p.goto(url,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500)}
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 const OUTR={vp:VP,cases:{}};
 /* old save: written by the OLD page (main), then loaded by this page */
 if(OLD){await boot(p,OLD);await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;S.month=4;save()});await sleep(1000)}
 await boot(p,URL);
 if(OLD)OUTR.oldSave=await p.evaluate(()=>{try{const d=loadSlot(3);if(!d)return'no save';SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;Q.length=0;deal();render();return 'ok month '+S.month}catch(e){return 'err '+String(e.stack).slice(0,300)}});
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render()});
 await sleep(1500);
 /* measure the layout, not the idle sway */
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}'});
 /* ksp: Kính sự phòng with a man + a person without figure art ("Thị vệ" from the owner's 08:00Z shot: must be a full silhouette, not a mini portrait) */
 const CASES=[["n1","vuon",1,0],["n2","vuon",2,0],["n3","vuon",2,1],["n5","vuon",4,1],["ksp","ksp",0,1,1]];
 for(const [name,k,nr,nm,xg] of CASES){
  await p.evaluate(async([k,nr,nm,xg])=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;
   S.where=S.where||{};const W=S.where;for(const v of rivals)if(W[v.id]===k)W[v.id]="r"+v.id;W.emp="tn";S.menW={};S.minW={};
   liveRivals(true).slice(0,nr).forEach(v=>W[v.id]=k);(S.men||[]).filter(m=>m.alive).slice(0,nm).forEach(m=>S.menW[m.id]=k);
   S.place="home";used=0;tab="act";goTo(k);
   if(xg){S.visit.people.push({kind:"guard",name:"Mạc Thừa Vũ",ini:"Vệ",col:"#6a8aa0",info:"Thị vệ"});renderStage()}
   await new Promise(r=>setTimeout(r,2500))},[k,nr,nm,xg]);
  const pages=[];
  for(let pg=0;pg<6;pg++){await sleep(2200);
   const r=await p.evaluate(()=>{const st=document.getElementById('stage'),R=st.getBoundingClientRect();const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>2;
    const fig=(im)=>{const b=kitFigBody(im.getAttribute('src'))||{l:0,r:1,cl:0,cr:1,b:1};const q=im.getBoundingClientRect();return{cx:+(q.left-R.left+q.width*((b.cl!=null?b.cl:b.l)+(b.cr!=null?b.cr:b.r))/2).toFixed(1),feet:+(q.top-R.top+q.height*b.b).toFixed(1),h:+(q.height*(b.b-(b.ht!=null&&b.ht>b.t?b.ht:b.t))).toFixed(1),src:im.getAttribute('src').split('/').pop()}};
    const tagR=g=>{const q=g.getBoundingClientRect();return{l:+(q.left-R.left).toFixed(1),r:+(q.right-R.left).toFixed(1),t:+(q.top-R.top).toFixed(1),txt:g.innerText.replace(/\n/g,' / ')}};
    const L=[];const me=document.getElementById('mefig');if(vis(me)){const mt=document.querySelector('#j59metag .tag');L.push(Object.assign({who:'me'},fig(me),{tag:mt&&vis(mt)?tagR(mt):null}))}
    document.querySelectorAll('#tokens .tok').forEach(t=>{if(!vis(t))return;const im=t.querySelector('img.figimg');const g=t.querySelector('.tag');if(im)L.push(Object.assign({who:'p'+t.dataset.p},fig(im),{tag:g?tagR(g):null}));else{const q=t.getBoundingClientRect();L.push({who:'p'+t.dataset.p,cx:+((q.left+q.right)/2-R.left).toFixed(1),feet:+(q.bottom-R.top).toFixed(1),nofig:1,tag:g?tagR(g):null})}});
    const chips=[...st.querySelectorAll('.j59more')].filter(vis).map(c=>{const q=c.getBoundingClientRect();return{side:c.classList.contains('j59ml')?'l':'r',txt:c.textContent,l:+(q.left-R.left).toFixed(1),r:+(q.right-R.left).toFixed(1),t:+(q.top-R.top).toFixed(1),b:+(q.bottom-R.top).toFixed(1)}});
    let map=null;try{const h=mapHTML();const re=new RegExp('data-go="'+S.place+'"[\\s\\S]*?(?:aria-label="(\\d+) bóng người"|</button>)');const mm=re.exec(h);map=mm&&mm[1]?+mm[1]:0}catch(e){map='err '+e.message}
    const t=document.getElementById('sc-t');
    return{stage:{w:+R.width.toFixed(1),h:+R.height.toFixed(1)},slots:st.dataset.j59slots||'',pg:st.dataset.j59pg||'',L,chips,title:t?t.innerText.replace(/\s+/g,' '):'',map,countAt:countAt(S.place),people:curPeople().length,kitHere:typeof kitHereCount==='function'?kitHereCount():null}});
   r.page=pg;pages.push(r);
   if(process.env.SHOTS!=='0')await p.screenshot({path:`${OUT}/${TAG}-${W}x${H}-${name}-p${pg+1}.jpg`,type:'jpeg',quality:70,timeout:240000});
   const nx=r.chips.find(c=>c.side==='r');if(!nx)break;
   await p.evaluate(()=>{const c=document.querySelector('#stage .j59more.j59mr');if(c)c.click()})}
  /* checks */
  const ck=[];const all=pages.flatMap(x=>x.L);const meN=all.filter(x=>x.who==='me').length;if(meN!==1)ck.push('her shown '+meN+'x');
  const ids=new Set(all.filter(x=>x.who!=='me').map(x=>x.who));const others=pages[0].people;if(ids.size!==others)ck.push(`others seen ${ids.size}/${others}`);
  for(const x of pages){x.L.filter(y=>y.nofig).forEach(y=>ck.push(`p${x.page+1} ${y.who} mini portrait (no figure)`));const S2=x.slots?x.slots.split(',').map(Number):null;const ft=x.L.filter(y=>!y.nofig).map(y=>y.feet);if(ft.length&&Math.max(...ft)-Math.min(...ft)>1.5)ck.push(`p${x.page+1} feet differ ${Math.min(...ft)}..${Math.max(...ft)}`);
   if(S2)x.L.forEach((y,i)=>{if(Math.abs(y.cx-S2[i])>1.5)ck.push(`p${x.page+1} ${y.who} centre ${y.cx} slot ${S2[i]}`)});
   const T=x.L.map(y=>y.tag).filter(Boolean);for(let i=1;i<T.length;i++)if(T[i].l<T[i-1].r+2&&Math.abs(T[i].t-T[i-1].t)<20)ck.push(`p${x.page+1} tags overlap ${T[i-1].txt} | ${T[i].txt}`);
   const tt=T.map(t=>t.t);if(tt.length&&Math.max(...tt)-Math.min(...tt)>1.5)ck.push(`p${x.page+1} tag tops differ`);
   for(const c of x.chips)for(const t of T)if(c.l<t.r&&c.r>t.l&&c.t<t.t+30&&c.b>t.t)ck.push(`p${x.page+1} chip ${c.txt} covers ${t.txt}`);
   const n=(x.title.match(/(\d+) người/)||[])[1];if(String(x.map)!==String(x.countAt)||(n!=null&&+n!==x.map)||(x.kitHere!=null&&x.kitHere!==x.map))ck.push(`p${x.page+1} counts map ${x.map} countAt ${x.countAt} title ${n} here ${x.kitHere}`)}
  OUTR.cases[name]={pages,ck}}
 OUTR.errs=errs;console.log(JSON.stringify(OUTR));await b.close()})();
