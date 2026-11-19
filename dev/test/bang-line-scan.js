/* KIT §78.y STAGE BADGE ROW scan (owner OD 18/11 ~23:45Z, 19/11 ~00:06Z, ~00:25Z; review/errand-scene r3).
   Every stage background (home + every place of places()) × every figure in view × badge kind × device:
     me  = her «ta ở đây» marker (.kmemark, real element)
     emo = the mood face chip (img.kfseal, real element)
     hap = the yellow round «!» (.khap): REAL element on her own servants (errand task injected), the kit function kitBadgeAt(st,fig,"hap") for everyone else
   Checks per stage × kind: badge top − row top (kitMarkLine) ≤ 2 px; column offset (badge centre − figure centre line) equal for every figure ± 2 px;
   badge bottom never below the figure's PAINTED top (crown / hair included) — gap ≥ 0 → no overlap with head/crown; whole badge inside the stage.
   Each stage gets ≥ 3 figures (her + up to 2 rivals + Hoàng thượng added to the visit when fewer are there) so men and crowded rows are covered.
   BEFORE mode (old build without kitMarkLine row): the same table from the real elements only (spread of tops / offsets between figures).
   usage: node dev/test/bang-line-scan.js <baseURL> [W H] [jsonOut]  → markdown table + PASS/FAIL line, exit 1 on FAIL. Env PLACES=k1,k2 limits the stages; SHOTS=dir [TAG, DPR] = one shot per stage; CAST=qn = only Hoàng thượng + a Quý nhân; HH=1 = the player is the crowned Hoàng hậu (consort c09, tier 8: the tallest phoenix crown). */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,BASE,W0,H0,JOUT]=process.argv;const W=+W0||755,H=+H0||1000;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+process.env.DPR||1,hasTouch:true,isMobile:W<900,reducedMotion:'reduce'});
 if(process.env.HH)await ctx.addInitScript(()=>{window.__HH=1});
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
   const L=typeof kitMarkLine==='function'?kitMarkLine(st):null;const vis=e=>e&&e.offsetParent!==null&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.j59off');
   const box=f=>{const r=f.getBoundingClientRect();let bx=r.left,by=r.top,bw=r.width,bh=r.height;const nw=f.naturalWidth,nh=f.naturalHeight;if(nw&&nh){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}return{bx,by,bw,bh}};
   const figs=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg')].filter(vis).filter(f=>f.naturalWidth);const out=[];
   for(const f of figs){const src=f.currentSrc||f.getAttribute('src');const bb=kitFigBody(src)||{t:0,b:1,l:0,r:1};const B=box(f);const c=bb.cl!=null&&bb.cr>bb.cl?(bb.cl+bb.cr)/2:(bb.l+bb.r)/2;
    const cx=B.bx+B.bw*c,paintTop=B.by+B.bh*bb.t,headTop=B.by+B.bh*kitFigTop(bb);const tok=f.closest('.tok');const nm=f.id==='mefig'?'(ta) '+S.name:(tok&&tok.querySelector('.tag')?tok.querySelector('.tag').textContent.replace(/\s+/g,' ').trim().slice(-26):'?');
    const man=/fig-(emperor|eunuch|official|physician|man)-/.test(src);const row={nm,src:src.split('/').pop(),man,cx:+cx.toFixed(1),paintTop:+paintTop.toFixed(1),headTop:+headTop.toFixed(1),b:{}};
    const put=(kind,q,how)=>{row.b[kind]={top:+q.top.toFixed(1),bottom:+q.bottom.toFixed(1),off:+(((q.left+q.right)/2)-cx).toFixed(1),w:+q.width.toFixed(1),gap:+(paintTop-q.bottom).toFixed(1),inStage:q.left>=SR.left-.5&&q.right<=SR.right+.5&&q.top>=SR.top-.5,how}};
    if(f.id==='mefig'){const m=document.querySelector('#stage .kmemark');if(m&&vis(m))put('me',m.getBoundingClientRect(),'real')}
    const sl=[...document.querySelectorAll('img.kfseal')].find(s=>s.__fig===f);if(sl&&vis(sl))put('emo',sl.getBoundingClientRect(),'real');
    const bang=tok&&[...document.querySelectorAll('i.kmerr-bang')].find(c=>{const q=c.getBoundingClientRect(),fr=f.getBoundingClientRect();return Math.abs((q.left+q.right)/2-cx)<fr.width*.5});
    if(bang)put('hap',bang.getBoundingClientRect(),'real');else if(tok&&typeof kitBadgeAt==='function'){const P=kitBadgeAt(st,f,'hap',19);if(P)put('hap',{left:P.left,right:P.left+19,top:P.top,bottom:P.top+19,width:19},'fn')}
    out.push(row)}
   window.__shotWait=1;return{cast:window.__CAST,ppl:(S.visit&&S.visit.people||[]).map(x=>x.kind+':'+(x.ref?x.ref.rank:'')).join(','),k,name:(placeOf(k)||{}).n||k,line:L&&L.H!=null?{top:+L.top.toFixed(1),H:+L.H.toFixed(1),floor:+L.floor.toFixed(1)}:null/* BEFORE build: the old kitMarkLine was her marker box, not a row → spread only */,stageTop:+SR.top.toFixed(1),cRef:(BAL.bookFrame||{}).cRef,figs:out,pg:st.dataset.j59pg||''}},k);
  if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});await p.screenshot({path:`${process.env.SHOTS}/${process.env.TAG||''}${W}x${H}-${k}.jpg`,type:'jpeg',quality:80})}
  await p.evaluate(()=>{S.erra=[];try{ERR.sync()}catch(e){}});ALL.push(R)}
 /* table */
 let bad=0;const lines=[];const P2=v=>v==null?'–':(+v).toFixed(1);
 lines.push(`### ${W}x${H}  (row = kitMarkLine: standard crowned Hoàng hậu, cRef ${ALL[0]&&ALL[0].cRef})`);
 lines.push(`| stage | figures | kind | n | Δtop to row max | top spread | col offset spread | min gap to crown | in stage | result |`);lines.push('|---|---|---|---|---|---|---|---|---|---|');
 const fails=[];
 for(const R of ALL){if(R.err){lines.push(`| ${R.k} | ERR ${R.err} |||||||||`);bad++;continue}
  for(const kind of ['me','hap','emo']){const L=R.figs.filter(f=>f.b[kind]).map(f=>Object.assign({nm:f.nm,man:f.man},f.b[kind]));if(!L.length)continue;
   const tops=L.map(x=>x.top),offs=L.map(x=>x.off),gaps=L.map(x=>x.gap);const dRow=R.line?Math.max(...L.map(x=>Math.abs(x.top-R.line.top))):null;
   const tsp=Math.max(...tops)-Math.min(...tops),osp=Math.max(...offs)-Math.min(...offs),g=Math.min(...gaps),ins=L.every(x=>x.inStage);
   const ok=(dRow==null?tsp<=2:dRow<=2)&&tsp<=2&&osp<=2&&g>=0&&ins;if(!ok){bad++;fails.push({k:R.k,kind,L:L.filter(x=>x.gap<0||!x.inStage||(R.line&&Math.abs(x.top-R.line.top)>2)).map(x=>`${x.nm}${x.man?' (man)':''} gap ${x.gap} off ${x.off}`)})}
   lines.push(`| ${R.name} | ${R.figs.length}${R.pg?' (paged)':''} | ${kind} | ${L.length} | ${P2(dRow)} | ${P2(tsp)} | ${P2(osp)} | ${P2(g)} | ${ins?'yes':'NO'} | ${ok?'PASS':'FAIL'} |`)}}
 lines.push(`\n${bad?'FAIL':'PASS'} · ${ALL.length} stages · ${ALL.reduce((a,r)=>a+(r.figs||[]).length,0)} figures · page errors ${errs.length}`);
 if(fails.length)lines.push('FAILS: '+JSON.stringify(fails));
 console.log(lines.join('\n'));if(JOUT)fs.writeFileSync(JOUT,JSON.stringify({W,H,ALL,errs},null,1));await b.close();process.exit(bad||errs.length?1:0)})();
