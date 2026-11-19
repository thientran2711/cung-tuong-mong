/* HEAD MARKER GAP scan (owner OD 19/11 ~03:50Z FAIL of errand-scene r5: "bong bóng vàng ... đang che trực tiếp ngay trên đầu của cái người đó"; review/errand-scene r6, KIT §78.y).
   Every stage background (home + every place of places()) × every figure in view × device. Marks per figure:
     me  = her «ta ở đây» marker (.kmemark, real element)
     emo = the mood seal at the head (img.kfseal, real element)
     hap = the speech bubble head marker (.khead): REAL element on her own servants (an errand return injected), the kit function kitBadgeAt(st,fig,"hap",24,24) for every other figure
           (= where its bubble stands the moment a notice comes)
   REAL HEAD TOP = first opaque row (alpha > 40) of the figure picture (kitFigBody t: hair, ornaments, crown, hat included), drawn box of the <img>.
   Checks (every mark, every figure):
     G1 gap   : mark bottom ≤ own figure's real head top − GAP (GAP = 6 px); seal: bottom + KIT_BADGE.reach × size ≤ head top − 2 (its lean-in / droop reach never touches)
     G2 alpha : 0 opaque pixels of ANY figure on the stage under the mark box grown by 2 px (never touches hair / headdress / face of anyone)
     G3 marks : no two marks overlap (seal vs bubble vs «ta ở đây», own and neighbours')
     G4 level : per sex, every mark bottom equal ± 2 px (women's line, men's line; «ta ở đây» level with the bubble)
     G5 stage : every mark inside the stage box
   usage: node dev/test/head-marker-gap.js <baseURL> [W H] [jsonOut]  → table + PASS/FAIL line, exit 1 on FAIL. Env PLACES=k1,k2 · SHOTS=dir (TAG, DPR) · HH=1 crowned Hoàng hậu player ·
   CAST=qn. node dev/test/head-marker-gap.js --table <json> re-prints a saved run (BEFORE column). Works on builds before r6 (all measures from kitFigBody + the real elements). */
if(process.argv[2]==='--table'){const J=JSON.parse(require('fs').readFileSync(process.argv[3],'utf8'));setTimeout(()=>{const T=table(J.ALL,J.errs||[]);console.log(T.text);process.exit(0)});return}
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
   const vis=e=>e&&e.offsetParent!==null&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.j59off');
   const box=f=>{const r=f.getBoundingClientRect();let bx=r.left,by=r.top,bw=r.width,bh=r.height;const nw=f.naturalWidth,nh=f.naturalHeight;if(nw&&nh){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}return{bx,by,bw,bh}};
   const figs=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg')].filter(vis).filter(f=>f.naturalWidth&&f.getBoundingClientRect().right>SR.left+4&&f.getBoundingClientRect().left<SR.right-4);
   /* alpha of every figure at its drawn size (CORS copy, like kitFigBody) */
   const ALPHA=[];for(const f of figs){const src=f.currentSrc||f.getAttribute('src');const B=box(f);const im=new Image();im.crossOrigin='anonymous';await new Promise(r=>{im.onload=im.onerror=r;im.src=src});
    let d=null,w=Math.max(1,Math.round(B.bw)),h=Math.max(1,Math.round(B.bh));try{const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(im,0,0,w,h);d=g.getImageData(0,0,w,h).data}catch(e){}ALPHA.push({f,B,w,h,d})}
   const opaqueIn=q=>{let n=0;for(const A of ALPHA){if(!A.d)continue;const x0=Math.max(0,Math.floor(q.left-2-A.B.bx)),x1=Math.min(A.w-1,Math.ceil(q.right+2-A.B.bx)),y0=Math.max(0,Math.floor(q.top-2-A.B.by)),y1=Math.min(A.h-1,Math.ceil(q.bottom+2-A.B.by));
     for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(A.d[(y*A.w+x)*4+3]>40)n++}return n};
   const out=[],MK=[];const reach=(window.KIT_BADGE||{}).reach||0;
   for(const f of figs){const src=f.currentSrc||f.getAttribute('src');const bb=kitFigBody(src)||{t:0,b:1,l:0,r:1};const B=box(f);const c=bb.cl!=null&&bb.cr>bb.cl?(bb.cl+bb.cr)/2:(bb.l+bb.r)/2;
    const cx=B.bx+B.bw*c,head=B.by+B.bh*bb.t;const tok=f.closest('.tok');const nm=f.id==='mefig'?'(ta) '+S.name:(tok&&tok.querySelector('.tag')?tok.querySelector('.tag').textContent.replace(/\s+/g,' ').trim().slice(-26):'?');
    const man=typeof kitBadgeSex==='function'?kitBadgeSex(f)==='m':(KIT_FIG.fac(src)>1);const row={nm,src:src.split('/').pop(),man,cx:+cx.toFixed(1),head:+head.toFixed(1),b:{}};
    const put=(kind,q,how)=>{const r={kind,top:+q.top.toFixed(1),bottom:+q.bottom.toFixed(1),left:+q.left.toFixed(1),right:+q.right.toFixed(1),how,sex:man?'m':'f',nm};
     r.gap=+(head-q.bottom).toFixed(1);r.need=kind==='emo'?+(reach*(q.bottom-q.top)+2).toFixed(1):6;r.alpha=opaqueIn(q);r.inStage=q.left>=SR.left-.5&&q.right<=SR.right+.5&&q.top>=SR.top-.5&&q.bottom<=SR.bottom+.5;row.b[kind]=r;MK.push(r)};
    if(f.id==='mefig'){const m=document.querySelector('#stage .kmemark');if(m&&vis(m))put('me',m.getBoundingClientRect(),'real')}
    const sl=[...document.querySelectorAll('img.kfseal')].find(s=>s.__fig===f);if(sl&&vis(sl)){const r=sl.getBoundingClientRect(),w=parseFloat(sl.style.width)||r.width,l=parseFloat(sl.style.left),t=parseFloat(sl.style.top);const hr=sl.offsetParent?sl.offsetParent.getBoundingClientRect():{left:0,top:0};
     put('emo',isFinite(l)&&isFinite(t)?{left:hr.left+l-(sl.offsetParent?sl.offsetParent.scrollLeft:0),top:hr.top+t-(sl.offsetParent?sl.offsetParent.scrollTop:0),right:hr.left+l+w,bottom:hr.top+t+w}:r,'real')}/* the layout box, not the animated one */
    const bang=tok&&[...document.querySelectorAll('i.kmerr-bang')].find(c=>{const q=c.getBoundingClientRect(),fr=f.getBoundingClientRect();return Math.abs((q.left+q.right)/2-cx)<fr.width*.35});
    if(bang)put('hap',bang.getBoundingClientRect(),'real');else if(tok&&typeof kitBadgeAt==='function'){const px=(window.KIT_HEADMK||{}).px||24;const P=kitBadgeAt(st,f,'hap',px,px);if(P)put('hap',{left:P.left,right:P.left+px,top:P.top,bottom:P.top+px},'fn')}
    out.push(row)}
   /* G3: pairs of marks overlapping */
   const ov=[];for(let i=0;i<MK.length;i++)for(let j=i+1;j<MK.length;j++){const a=MK[i],c=MK[j];if(a.left<c.right-.5&&c.left<a.right-.5&&a.top<c.bottom-.5&&c.top<a.bottom-.5)ov.push(`${a.nm}:${a.kind} × ${c.nm}:${c.kind}`)}
   window.__shotWait=1;return{k,name:(placeOf(k)||{}).n||k,figs:out,ov,pg:st.dataset.j59pg||''}},k);
  if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});await p.screenshot({path:`${process.env.SHOTS}/${process.env.TAG||''}${W}x${H}-${k}.jpg`,type:'jpeg',quality:80})}
  await p.evaluate(()=>{S.erra=[];try{ERR.sync()}catch(e){}});ALL.push(R)}
 const T=table(ALL,errs);console.log(T.text);if(JOUT)fs.writeFileSync(JOUT,JSON.stringify({W,H,ALL,errs},null,1));await b.close();process.exit(T.bad||errs.length?1:0)})();
function table(ALL,errs){let bad=0;const fails=[];const sum={};const P=v=>v==null||!isFinite(v)?'–':(+v).toFixed(1);
 const add=(key,m)=>{const s=sum[key]=sum[key]||{n:0,minGap:1e9,alpha:0,lev:0,out:0,fail:0};s.n++;s.minGap=Math.min(s.minGap,m.gap-m.need);s.alpha+=m.alpha;if(!m.inStage)s.out++;return s};
 for(const R of ALL){if(R.err){bad++;fails.push(R.k+' ERR '+R.err);continue}
  const M=R.figs.flatMap(f=>Object.values(f.b));
  for(const m of M){const key=m.kind+'/'+m.sex;const s=add(key,m);const ok=m.gap>=m.need&&m.alpha===0&&m.inStage;if(!ok){s.fail++;bad++;fails.push(`${R.k} ${m.nm} ${m.kind}(${m.how}) gap ${m.gap} need ${m.need} alpha ${m.alpha}${m.inStage?'':' OUT'}`)}}
  for(const sx of ['f','m']){const L=M.filter(m=>m.sex===sx);if(L.length<2)continue;const lev=Math.max(...L.map(m=>m.bottom))-Math.min(...L.map(m=>m.bottom));const s=sum['level/'+sx]=sum['level/'+sx]||{stages:0,max:0,fail:0};s.stages++;s.max=Math.max(s.max,lev);if(lev>2){s.fail++;bad++;fails.push(`${R.k} level ${sx} ${lev.toFixed(1)}`)}}
  const so=sum['overlap']=sum['overlap']||{stages:0,pairs:0};so.stages++;so.pairs+=R.ov.length;if(R.ov.length){bad++;fails.push(`${R.k} overlap ${R.ov.join(' ; ')}`)}}
 const L=['| check | kind/sex | n | min (gap − need) px | opaque px under marks | outside stage | FAIL |','|---|---|---|---|---|---|---|'];
 for(const k of Object.keys(sum).filter(k=>/^(me|hap|emo)\//.test(k)).sort()){const s=sum[k];L.push(`| G1 gap + G2 alpha + G5 | ${k} | ${s.n} | ${P(s.minGap)} | ${s.alpha} | ${s.out} | ${s.fail} |`)}
 for(const k of Object.keys(sum).filter(k=>/^level\//.test(k)).sort()){const s=sum[k];L.push(`| G4 level spread max | ${k.slice(6)} | ${s.stages} stages | ${P(s.max)} | – | – | ${s.fail} |`)}
 if(sum.overlap)L.push(`| G3 mark overlap pairs | all | ${sum.overlap.stages} stages | – | ${sum.overlap.pairs} pairs | – | ${sum.overlap.pairs?'≥1':0} |`);
 L.push(`\n${bad?'FAIL':'PASS'} · ${ALL.length} stages · ${ALL.reduce((a,r)=>a+(r.figs||[]).length,0)} figures · marks ${ALL.reduce((a,r)=>a+(r.figs||[]).reduce((x,f)=>x+Object.keys(f.b).length,0),0)} · page errors ${errs.length}`);
 L.push('SUMMARY '+JSON.stringify(sum));if(fails.length)L.push('FAILS ('+fails.length+'): '+fails.slice(0,40).join(' | '));
 return{text:L.join('\n'),bad,sum}}
