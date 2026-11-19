/* KIT §78.y STAGE BADGE LINES scan (owner OD 19/11 ~02:05Z, canon overwrite of the one-row rule; review/errand-scene r4).
   Every stage background (home + every place of places()) × every figure in view × badge kind × device:
     me  = her «ta ở đây» marker (.kmemark, real element)
     emo = the mood face chip (img.kfseal, real element)
     hap = the yellow round «!» (.khap): REAL element on her own servants (errand task injected), the kit function kitBadgeAt(st,fig,"hap") for everyone else
   Two groups per stage: women (f) and men (m) (KIT_FIG.fac rule: emperor / eunuch / official / physician / man / unknown-man = men).
   Checks per stage × kind × sex:
     me / hap: badge BOTTOM − that sex's line (kitMarkLine(st,sex).bottom) ≤ 2 px; bottom spread ≤ 2 (level); column offset equal ± 2; bottom ≤ the figure's head top (never over a face);
               and «ta ở đây» level with the women's «!» (same line).
     emo: centre on that sex's head spot (floor − KIT_FIGSEAL.dy × Hs) ± 2; top spread ≤ 2 (level); |column offset| equal ± 2; the chip never overlaps the FACE box
          (head top .. + .13 body, centre line ± .05 body); "at the head": chip centre within the figure's head band (head top − .06 .. + .16 body); two mood chips never overlap.
     every badge inside the stage. Men's marks must sit higher than women's (line m < line f).
   Each stage gets ≥ 3 figures (her + up to 2 rivals + Hoàng thượng added to the visit when fewer are there) so men and crowded rows are covered.
   BEFORE mode (a build without the sex lines): the same table from the real elements only (spreads per sex group, face overlap).
   usage: node dev/test/bang-line-scan.js <baseURL> [W H] [jsonOut]  → markdown table + PASS/FAIL line, exit 1 on FAIL. Env PLACES=k1,k2 limits the stages; SHOTS=dir [TAG, DPR] = one shot per stage; CAST=qn = only Hoàng thượng + a Quý nhân; HH=1 = the player is the crowned Hoàng hậu (consort c09, tier 8: the tallest phoenix crown).
   node dev/test/bang-line-scan.js --table <json> re-prints the table of a saved run (used for the BEFORE column). */
if(process.argv[2]==='--table'){const J=JSON.parse(require('fs').readFileSync(process.argv[3],'utf8'));setTimeout(()=>{const T=table(J.ALL,J.errs||[]);console.log(T.text);process.exit(0)});return}
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,BASE,W0,H0,JOUT]=process.argv;const W=+W0||755,H=+H0||1000;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+process.env.DPR||1,hasTouch:true,isMobile:W<900,reducedMotion:'reduce'});
 if(process.env.HH)await ctx.addInitScript(()=>{window.__HH=1});
 if(process.env.DEMO)await ctx.addInitScript(()=>{window.__DEMO=1});
 if(process.env.CAST)await ctx.addInitScript(c=>{window.__CAST=c},process.env.CAST);
 await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1200);
 await p.evaluate(async()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());try{OPT.fxon=false}catch(e){}S.buoi=0;used=0;deal();render();
  if(window.__HH){S.pid='consort:c09';S.rank=7;S.age=26;S.out=false;S.srv=null;const o=figTierOf;figTierOf=function(w){return w===S?8:o(w)};try{render()}catch(e){}}
  const st=document.createElement('style');st.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}';document.head.appendChild(st);await new Promise(r=>setTimeout(r,2000))});
 const keys=process.env.PLACES?process.env.PLACES.split(','):['home',...await p.evaluate(()=>places().map(x=>x.k))];
 const ALL=[];
 for(const k of keys){
  const R=await p.evaluate(async k=>{const Wt=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   S.dead=false;S.confined=0;S.place='home';used=0;S.buoi=0;S.sung=60;S.suc=100;S.erra=[];try{tab='act'}catch(e){}
   try{goTo(k)}catch(e){}Q.length=0;if(md)md.hidden=true;if(S.place!==k&&k!=='home'){S.place=k;S.visit={k,people:[],talked:false,tk:{},msg:''}}/* a gated place (locked hall, card) still shows its stage */
   /* everyone known (so the mood chip shows), then at least 3 figures: Hoàng thượng (a man) first, the crowned Hoàng hậu, then rivals */
   try{S.met=S.met||{};const K=typeof k61S==='function'?k61S():null;for(const v of rivals){S.met[v.id]=0;if(K&&typeof kOf61==='function')K[kOf61(v)]=3}}catch(e){}
   if(S.visit&&k!=='home'){const P=S.visit.people;if(!P.some(x=>x.kind==='emp'))P.unshift({kind:'emp',name:'Hoàng thượng',ini:'Đế',col:'#f0d070',info:''});
    const q=liveRivals(true).find(v=>v.queen);if(q&&!P.some(x=>x.ref===q))P.splice(1,0,{...rp(q),kind:'hh',name:'Hoàng hậu '+q.name,ini:'Phượng'});
    const L=liveRivals(true).filter(v=>!P.some(x=>x.ref===v)&&!sameHouse(S,v));let i=0;while(P.filter(x=>x.kind!=='chest').length<4&&L[i])P.push(rp(L[i++]));
    if(window.__CAST==='qn'){const qn=liveRivals(true).find(v=>!v.queen&&v.rank===2&&!sameHouse(S,v))||L[0];const cast=[P.find(x=>x.kind==='emp'),rp(qn)];window.curPeople=curPeople=function(){return cast}}}/* the place record (j95) rebuilds S.visit.people on render: the cast is fixed through curPeople */
   render();await Wt(1500);
   /* real «!» on her servants in view (home) */
   const ids=[];if(typeof ERR!=="undefined"){for(const [id,pp] of [["mm:me",S.maid],...(S.staff||[]).map(s=>["s"+s.sid,s])]){if(!pp)continue;ids.push(id);S.erra.push({id:"scan-"+id,who:id,nm:pp.name,k:"spy",lbl:"đi dò la",t0:0,due:0,back:1,read:0,rep:{t:"x",L:["x"],d:[]}})}
    ERR.base=S;ERR.seen={};for(const id of ids)ERR.seen["scan-"+id]={off:1,on:1};try{ERR.sync()}catch(e){}}
   await Promise.race([Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),Wt(9000)]);await Wt(1500);try{ERR.sync()}catch(e){}try{kitFigSealAll()}catch(e){}await Wt(400);
   const st=document.getElementById('stage');if(!st)return{k,err:'no stage'};const SR=st.getBoundingClientRect();
   /* DEMO=1 (owner shot only): every figure in view carries the kit head marker (kitHeadMarkHtml "on") on its sex line, so a woman and a man show it together */
   if(window.__DEMO&&typeof kitHeadMarkHtml==='function'){await new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=KIT_HEADMK.on});document.querySelectorAll('.kdemo-hm').forEach(e=>e.remove());const px=KIT_HEADMK.px||24;
    for(const f of [...document.querySelectorAll('#tokens .tok.fig img.figimg')].filter(f=>f.offsetParent&&f.naturalWidth)){const P=kitBadgeAt(st,f,'hap',px,px);if(!P)continue;const w=document.createElement('span');w.innerHTML=kitHeadMarkHtml('demo','img','on');const c=w.firstChild;c.classList.add('kdemo-hm');c.style.cssText=`position:fixed;left:${P.left}px;top:${P.top}px;z-index:7;margin:0`;document.body.appendChild(c)}await Wt(600)}
   const L=typeof kitMarkLine==='function'?kitMarkLine(st):null;const vis=e=>e&&e.offsetParent!==null&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.j59off');
   const box=f=>{const r=f.getBoundingClientRect();let bx=r.left,by=r.top,bw=r.width,bh=r.height;const nw=f.naturalWidth,nh=f.naturalHeight;if(nw&&nh){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}return{bx,by,bw,bh}};
   const figs=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg')].filter(vis).filter(f=>f.naturalWidth);const out=[];
   for(const f of figs){const src=f.currentSrc||f.getAttribute('src');const bb=kitFigBody(src)||{t:0,b:1,l:0,r:1};const B=box(f);const c=bb.cl!=null&&bb.cr>bb.cl?(bb.cl+bb.cr)/2:(bb.l+bb.r)/2;
    const cx=B.bx+B.bw*c,paintTop=B.by+B.bh*bb.t,headTop=B.by+B.bh*kitFigTop(bb);const tok=f.closest('.tok');const nm=f.id==='mefig'?'(ta) '+S.name:(tok&&tok.querySelector('.tag')?tok.querySelector('.tag').textContent.replace(/\s+/g,' ').trim().slice(-26):'?');
    const man=typeof kitBadgeSex==='function'?kitBadgeSex(f)==='m':(KIT_FIG.fac(src)>1);const body=B.bh*(bb.b-kitFigTop(bb));const row={nm,src:src.split('/').pop(),man,cx:+cx.toFixed(1),paintTop:+paintTop.toFixed(1),headTop:+headTop.toFixed(1),body:+body.toFixed(1),b:{}};
    const put=(kind,q,how)=>{row.b[kind]={top:+q.top.toFixed(1),bottom:+q.bottom.toFixed(1),left:+q.left.toFixed(1),right:+q.right.toFixed(1),off:+(((q.left+q.right)/2)-cx).toFixed(1),w:+q.width.toFixed(1),gap:+(paintTop-q.bottom).toFixed(1),inStage:q.left>=SR.left-.5&&q.right<=SR.right+.5&&q.top>=SR.top-.5,how}};
    if(f.id==='mefig'){const m=document.querySelector('#stage .kmemark');if(m&&vis(m))put('me',m.getBoundingClientRect(),'real')}
    const sl=[...document.querySelectorAll('img.kfseal')].find(s=>s.__fig===f);if(sl&&vis(sl))put('emo',sl.getBoundingClientRect(),'real');
    const bang=tok&&[...document.querySelectorAll('i.kmerr-bang')].find(c=>{const q=c.getBoundingClientRect(),fr=f.getBoundingClientRect();return Math.abs((q.left+q.right)/2-cx)<fr.width*.5});
    if(bang)put('hap',bang.getBoundingClientRect(),'real');else if(tok&&typeof kitBadgeAt==='function'){const P=kitBadgeAt(st,f,'hap',19,19);if(P)put('hap',{left:P.left,right:P.left+19,top:P.top,bottom:P.top+19,width:19},'fn')}/* kitBadgeAt(…,w) with no h: bottom = line for a 19 px «!» only when the build passes h; new build: top = bottom − line h → use h */
    out.push(row)}
   window.__shotWait=1;return{cast:window.__CAST,ppl:(S.visit&&S.visit.people||[]).map(x=>x.kind+':'+(x.ref?x.ref.rank:'')).join(','),k,name:(placeOf(k)||{}).n||k,line:L&&L.H!=null?{top:+L.top.toFixed(1),H:+L.H.toFixed(1),floor:+L.floor.toFixed(1)}:null,lines:(()=>{const o={};for(const s of ['f','m']){const q=typeof kitMarkLine==='function'?kitMarkLine(st,s):null;if(q&&q.sex===s)o[s]={bottom:+q.bottom.toFixed(1),head:+q.head.toFixed(1),Hs:+q.Hs.toFixed(1),floor:+q.floor.toFixed(1)}}return Object.keys(o).length?o:null})(),dy:(window.KIT_BADGE||{}).dy||(window.KIT_FIGSEAL||{}).dy/* BEFORE build: the old kitMarkLine was her marker box, not a row → spread only */,stageTop:+SR.top.toFixed(1),cRef:(BAL.bookFrame||{}).cRef,figs:out,pg:st.dataset.j59pg||''}},k);
  if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});await p.screenshot({path:`${process.env.SHOTS}/${process.env.TAG||''}${W}x${H}-${k}.jpg`,type:'jpeg',quality:80})}
  await p.evaluate(()=>{S.erra=[];try{ERR.sync()}catch(e){}});ALL.push(R)}
 /* table */
 const T=table(ALL,errs);console.log(T.text);if(JOUT)fs.writeFileSync(JOUT,JSON.stringify({W,H,ALL,errs},null,1));await b.close();process.exit(T.bad||errs.length?1:0)})();
function table(ALL,errs){let bad=0;const lines=[];const P2=v=>v==null||!isFinite(v)?'–':(+v).toFixed(1);const W=ALL.W,H=ALL.H;
 lines.push(`| stage | sex | kind | n | Δ to line max | level spread | col spread | min gap to head (me/hap) · face overlap (emo) | chip centre in head band | in stage | result |`);lines.push('|---|---|---|---|---|---|---|---|---|---|---|');
 const fails=[];const sum={};
 for(const R of ALL){if(R.err){lines.push(`| ${R.k} | ERR ${R.err} ||||||||||`);bad++;continue}
  const fb={};
  for(const kind of ['me','hap','emo'])for(const sx of ['f','m']){const L=R.figs.filter(f=>f.b[kind]&&(f.man?'m':'f')===sx).map(f=>Object.assign({nm:f.nm,man:f.man,headTop:f.headTop,cx:f.cx,body:f.body||(R.line?R.line.H*(f.man?1.07:1):100)},f.b[kind]));if(!L.length)continue;
   const ln=R.lines&&R.lines[sx];let dl=null,lev,osp,gapv,band='–',bandOk=true;
   if(kind==='emo'){const cy=L.map(x=>(x.top+x.bottom)/2);lev=Math.max(...L.map(x=>x.top))-Math.min(...L.map(x=>x.top));const ao=L.map(x=>Math.abs(x.off));osp=Math.max(...ao)-Math.min(...ao);
     if(ln&&R.dy)dl=Math.max(...cy.map(c=>Math.abs(c-(ln.floor-R.dy*ln.Hs))));
     /* face box: head top .. + .13 body, centre ± .05 body */
     const ov=L.map(x=>{const fx0=x.cx-.05*x.body,fx1=x.cx+.05*x.body,fy0=x.headTop,fy1=x.headTop+.13*x.body;const w=Math.max(0,Math.min(fx1,x.right)-Math.max(fx0,x.left)),h=Math.max(0,Math.min(fy1,x.bottom)-Math.max(fy0,x.top));return w*h});
     gapv=Math.max(...ov);const bd=L.map((x,i)=>(cy[i]-x.headTop)/x.body);band=`${Math.min(...bd).toFixed(2)}…${Math.max(...bd).toFixed(2)}`;bandOk=bd.every(v=>v>=-.06&&v<=.16);
     L.forEach((x,i)=>{x.bad=ov[i]>0||bd[i]<-.06||bd[i]>.16})}
   else{lev=Math.max(...L.map(x=>x.bottom))-Math.min(...L.map(x=>x.bottom));const of=L.map(x=>x.off);osp=Math.max(...of)-Math.min(...of);if(ln)dl=Math.max(...L.map(x=>Math.abs(x.bottom-ln.bottom)));
     const g=L.map(x=>x.headTop-x.bottom);gapv=Math.min(...g);L.forEach((x,i)=>{x.bad=g[i]<0});if(kind!=='emo'&&sx==='f')fb[kind]=L.map(x=>x.bottom)}
   const ins=L.every(x=>x.inStage);const okFace=kind==='emo'?gapv<=0:gapv>=0;
   const ok=(dl==null||dl<=2)&&lev<=2&&osp<=2&&okFace&&bandOk&&ins;
   const key=kind+'/'+sx;const S=sum[key]=sum[key]||{n:0,dl:0,lev:0,osp:0,gap:kind==='emo'?0:1e9,fail:0};S.n+=L.length;S.dl=Math.max(S.dl,dl||0);S.lev=Math.max(S.lev,lev);S.osp=Math.max(S.osp,osp);S.gap=kind==='emo'?Math.max(S.gap,gapv):Math.min(S.gap,gapv);if(!ok)S.fail++;
   if(!ok){bad++;fails.push({k:R.k,kind,sx,L:L.filter(x=>x.bad||!x.inStage).map(x=>`${x.nm} off ${x.off} top ${x.top} head ${x.headTop}`)})}
   lines.push(`| ${R.name} | ${sx==='m'?'men':'women'} | ${kind} | ${L.length} | ${P2(dl)} | ${P2(lev)} | ${P2(osp)} | ${P2(gapv)} | ${band} | ${ins?'yes':'NO'} | ${ok?'PASS':'FAIL'} |`)}
  /* two mood chips never overlap (which chip is whose must stay clear) */
  {const C=R.figs.filter(f=>f.b.emo).map(f=>f.b.emo);for(let i=0;i<C.length;i++)for(let j=i+1;j<C.length;j++){const a=C[i],c=C[j];if(a.left<c.right-1&&c.left<a.right-1&&a.top<c.bottom-1&&c.top<a.bottom-1){bad++;fails.push({k:R.k,kind:'emo overlap'})}}}
  /* «ta ở đây» level with the women's «!» */
  if(fb.me&&fb.hap){const d=Math.max(...fb.hap.map(v=>Math.abs(v-fb.me[0])));if(d>2){bad++;fails.push({k:R.k,kind:'me~hap',d})}const S=sum['me~hap']=sum['me~hap']||{n:0,d:0};S.n++;S.d=Math.max(S.d,d)}
  if(R.lines&&R.lines.f&&R.lines.m&&!(R.lines.m.bottom<R.lines.f.bottom)){bad++;fails.push({k:R.k,kind:'men line not higher'})}}
 lines.push(`\n${bad?'FAIL':'PASS'} · ${ALL.length} stages · ${ALL.reduce((a,r)=>a+(r.figs||[]).length,0)} figures · page errors ${errs.length}`);
 lines.push('SUMMARY '+JSON.stringify(sum));
 if(fails.length)lines.push('FAILS: '+JSON.stringify(fails).slice(0,4000));
 return{text:lines.join('\n'),bad,sum}}
