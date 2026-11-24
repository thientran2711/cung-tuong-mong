/* node run.js <fold|ipad> <shots|video|perf> [pk]  — drives the KAR v3 mock in the real game; ONE consort life on both devices:
   SAVE=/home/user/wt/ring3-shots/life.json (boot.js loads the same save) + crowd.json (the real j95 crowd of that life). Out → /home/user/wt/ring3-shots/<dev>/ */
const {boot}=require('./boot');const fs=require('fs');const D=require(__dirname+'/../../test/lib/device');
const dev=process.argv[2]||'fold',mode=process.argv[3]||'shots',OUT=(process.env.OUTDIR||'/home/user/wt/ring4-shots/')+dev+'/';fs.mkdirSync(OUT+'vid',{recursive:true});
const DEV={fold:'fold',ipad:'ipadAir'}[dev];
(async()=>{const dd=D.DEVICES[DEV];const extra=mode==='video'?{recordVideo:{dir:OUT+'vid/tmp',size:{width:dd.w,height:dd.h}}}:{};
 const o=await boot(DEV,mode==='shots'?2:1,0,Object.assign({reducedMotion:'no-preference'},extra));const {g,pg}=o;
 await g.evaluate(fs.readFileSync(__dirname+'/scen3.js','utf8'));await g.evaluate(fs.readFileSync(__dirname+'/area.js','utf8'));
 const CR=JSON.parse(fs.readFileSync(__dirname+'/crowd.json','utf8'));
 const info=await g.evaluate(async CR=>{document.documentElement.classList.remove('kf-still');try{BAL.df.idle={every:[1e9,1e9],first:1e9}}catch(e){}
  Q.length=0;S.buoi=CR.best.b;S.place='vuon';S.j95seed=CR.best.seed;try{used=CR.best.kh}catch(e){}try{const R=JSON.parse(CR.roster);R.key=j95key();S.roster=R;j95sync(false,false)}catch(e){console.log('j95 '+e)}window.__liveN=(()=>{try{return countAt('vuon')}catch(e){return -1}})();S.visit={k:'vuon',people:[],talked:false,tk:{}};tab='act';render();try{j77Tap('vuon')}catch(e){}
  for(const id of ['rtoast','kntchip']){const e=document.getElementById(id);if(e)e.remove()}await new Promise(r=>setTimeout(r,1500));
  const si=document.getElementById('scimg');const bg=((si&&(si.style.backgroundImage||getComputedStyle(si).backgroundImage))||'').replace(/^url\(["']?|["']?\)$/g,'');
  /* attend/escort (tổng quản, thị vệ) stand BEHIND the Emperor as followers; nết + sắc of every master from the life (rule 3/4) */
  const groups=CR.groups.map(x=>{const g=JSON.parse(JSON.stringify(x));const keep=[];g.masters.forEach(m=>{if(/^(attend|escort|guard)$/.test(m.act)&&g.masters.length>1)g.fol.push(m);else keep.push(m)});g.masters=keep;
   g.masters.forEach(m=>{const v=(typeof rivals!=='undefined'?rivals:[]).find(r=>r.name===m.name);if(v){m.net=(v.net||[]).slice();m.sac=v.sac||0}});
   /* MAIN fix 4: a name she has not learnt is never «???» on her screen — the kit's §59.1 word «Người lạ» (j59 title chip, j59only) */
   g.masters.concat(g.fol).forEach(m=>{if(/>\?\?\?</.test(m.tag||'')){const c=(String(m.tag).match(/--tc:([^;"]+)/)||[])[1]||'';m.tag=`<span class="j59t j59only" style="--tc:${c}">Người lạ</span>`}});return g});
  /* maids serving the Emperor (ag_maid:emp…) stand behind HIM, not as their own group */
  const eg=groups.find(g=>g.masters.some(m=>m.kind==='emp'));if(eg){for(let i=groups.length-1;i>=0;i--){const g=groups[i];if(g!==eg&&/^ag_maid:emp/.test(g.act)){eg.fol.push(...g.masters,...g.fol);groups.splice(i,1)}}}
  const me=document.querySelector('#mefig img,#mefig .figimg');window.__karMe=me&&(me.currentSrc||me.src)||figFor(S);window.__karMeAsp=me&&me.naturalWidth?me.naturalWidth/me.naturalHeight:.32;window.__karKh=CR.best.kh||0;
  window.__C={fh:CR.fh,groups,bg};return {bg,life:S.name,buoi:S.buoi,liveN:window.__liveN,crowdN:CR.groups.reduce((t,g)=>t+g.masters.length+g.fol.length,0)}},CR);
 /* mock only: the world's own news popups (Q) are held while the mock runs, so they never cover the frames */
 await g.evaluate(()=>{Q.length=0;showModal=function(){Q.length=0;const M=document.getElementById('modal');if(M)M.hidden=true};const M=document.getElementById('modal');if(M)M.hidden=true});
 console.log(JSON.stringify(info));
 let cdp=null;if(mode==='perf')cdp=await pg.context().newCDPSession(pg);
 const AUD=[];const audit=async n=>{const r=await g.evaluate(()=>{const vis=e=>{if(!e||!e.isConnected)return false;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return false;const b=e.getBoundingClientRect();if(b.width<2||b.height<2)return false;let x=e;while(x&&x!==document.body){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||+c.opacity<.05)return false;x=x.parentElement}return true};
  const out=[];const st=document.getElementById('stage');
  /* 1 see-through people: any figure element or its picture with opacity < 1 (the lit/dim cross-fade copy excepted: the dim copy under it is opaque) */
  document.querySelectorAll('#kar .kar-f').forEach(f=>{if(!vis(f))return;let x=f,op=1;while(x&&x!==document.body){op*=+getComputedStyle(x).opacity;x=x.parentElement}const d=f.querySelector('img.d')||f.querySelector('img.l');if(op<.99||+getComputedStyle(d).opacity<.99)out.push('SEE-THROUGH '+(f.querySelector('.kar-tag')||{}).textContent+' op='+op.toFixed(2))});
  /* 3 name plates overlap */
  const T=[...document.querySelectorAll('#stage .kar-tag,#stage .tok .tag,#j59metag')].filter(vis).map(e=>({t:e.textContent.trim(),r:e.getBoundingClientRect()}));
  for(let i=0;i<T.length;i++)for(let j=i+1;j<T.length;j++){const a=T[i].r,b=T[j].r;if(!(a.right<=b.left||b.right<=a.left||a.bottom<=b.top||b.bottom<=a.top))out.push('PLATE-OVERLAP '+T[i].t+' / '+T[j].t)}
  /* name never cut: every visible plate holds its text */
  document.querySelectorAll('#kar .kar-tag').forEach(e=>{if(!vis(e))return;const r=e.getBoundingClientRect();e.querySelectorAll('span').forEach(x=>{const q=x.getBoundingClientRect();if(q.right>r.right+1||q.left<r.left-1||x.scrollWidth>x.clientWidth+1)out.push('PLATE-CUT '+x.textContent)})});
  /* stray live stage markers inside the mock */
  document.querySelectorAll('#stage .kmemark').forEach(e=>{if(vis(e))out.push('KMEMARK visible')});
  document.querySelectorAll('.kfoc-mood').forEach(e=>{if(vis(e)&&!e.classList.contains('kar-say'))out.push('STRAY-BUBBLE '+e.textContent.slice(0,30))});
  /* stray live speech over the stage (any bubble that is not the mock's own) */
  if(st){const sr=st.getBoundingClientRect();document.querySelectorAll('body *').forEach(e=>{if(e.children.length||e.closest('#kar')||e.closest('#stage .stop,#kshR,#krail,#kpname'))return;const t=(e.textContent||'').trim();if(t.length<8||!vis(e))return;const r=e.getBoundingClientRect();if(r.top<sr.top||r.bottom>sr.bottom||r.left<sr.left||r.right>sr.right)return;
   if(e.closest('.kar-say'))return;out.push('STRAY-TEXT '+e.tagName+'.'+String(e.className).slice(0,40)+' < '+(e.parentElement&&String(e.parentElement.className).slice(0,40))+' : '+t.slice(0,30))})}
  /* option text never clipped */
  document.querySelectorAll('#kar .kar-pk .kfoc-t b').forEach(e=>{if(vis(e)&&e.scrollHeight>e.clientHeight+1)out.push('TEXT-CUT '+e.textContent)});
  /* picker never over a face: no plate/button box over the top 18% of any visible figure */
  const PB=[...document.querySelectorAll('#kar .kar-pk .kfoc-b,#kar .kar-pk .pctabs')].filter(vis).map(e=>e.getBoundingClientRect());
  if(PB.length)document.querySelectorAll('#kar .kar-f').forEach(f=>{if(!vis(f))return;const r=f.getBoundingClientRect();const fx={left:r.left+r.width*.3,right:r.right-r.width*.3,top:r.top+r.height*.03,bottom:r.top+r.height*.18};
   if(PB.some(b=>!(b.right<=fx.left||b.left>=fx.right||b.bottom<=fx.top||b.top>=fx.bottom)))out.push('OVER-FACE '+((f.querySelector('.kar-tag')||{}).textContent||'?').slice(0,30))});
  /* 4 «???» anywhere visible */
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let tn;while(tn=w.nextNode()){if(/\?\?\?/.test(tn.nodeValue)&&vis(tn.parentElement))out.push('??? '+tn.parentElement.textContent.trim().slice(0,40))}
  /* 2 stage chips / title / tools overlap (top of the stage) */
  if(st){const sr=st.getBoundingClientRect();const top=[...st.querySelectorAll('*')].filter(e=>vis(e)&&e.children.length===0&&e.getBoundingClientRect().top-sr.top<sr.height*.45&&!e.closest('#kar .kar-f,#kar .kar-pk,#kar .kar-cap,.kar-bg,#tokens,img.kar-bg')&&(e.textContent.trim()||e.tagName==='IMG'||e.tagName==='BUTTON'));
   const R=top.map(e=>({e,r:e.getBoundingClientRect(),t:(e.textContent.trim()||e.tagName+'.'+String(e.className).slice(0,20))}));
   for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i].r,b=R[j].r;if(R[i].e.contains(R[j].e)||R[j].e.contains(R[i].e))continue;const ix=Math.min(a.right,b.right)-Math.max(a.left,b.left),iy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(ix>2&&iy>2&&!(R[i].e.tagName==='IMG'&&R[j].e.tagName==='IMG'&&R[i].e.parentElement===R[j].e.parentElement)){const P=e=>{const a=[];let x=e;for(let k=0;k<3&&x&&x!==st;k++){a.push(x.tagName.toLowerCase()+(x.id?'#'+x.id:'')+'.'+String(x.className).trim().split(/\s+/).slice(0,2).join('.'));x=x.parentElement}return a.join('<')};out.push('TOP-OVERLAP '+R[i].t.slice(0,24)+' ['+P(R[i].e)+' '+[a.left,a.top,a.width,a.height].map(Math.round)+'] / '+R[j].t.slice(0,24)+' ['+P(R[j].e)+' '+[b.left,b.top,b.width,b.height].map(Math.round)+']')}}}
  if(window.__dumpK){const k=document.getElementById('krail');const cs=getComputedStyle(k);out.push('KRAIL parent='+k.parentElement.id+'.'+k.parentElement.className+' style='+k.getAttribute('style')+' cls='+k.className+' L='+cs.left+' R='+cs.right+' pos='+cs.position+' html='+document.documentElement.className+' stage='+st.className)}
  return out});AUD.push([n,r]);if(r.length)console.log('AUDIT',n,JSON.stringify(r))};
 const shot=async n=>{await audit(n);if(mode==='shots')await pg.screenshot({path:OUT+n+'.png'})};
 const T=ms=>pg.waitForTimeout(ms);
 const perf={};async function meas(name,fn,rate){/* rAF frame times inside the game frame during fn */
  await g.evaluate(()=>{window.__ft=[];let l=performance.now();window.__fton=1;const f=t=>{if(!window.__fton)return;window.__ft.push(t-l);l=t;requestAnimationFrame(f)};requestAnimationFrame(f)});
  await fn();const ft=await g.evaluate(()=>{window.__fton=0;return window.__ft.slice(1)});ft.sort((a,b)=>a-b);const p=q=>ft[Math.min(ft.length-1,Math.floor(ft.length*q))]||0;
  (perf[name]=perf[name]||{})[rate]={n:ft.length,p50:+p(.5).toFixed(1),p95:+p(.95).toFixed(1),max:+(ft[ft.length-1]||0).toFixed(1),jank:ft.filter(x=>x>33.4).length}}
 const step=async(name,js,ms,rate)=>{if(mode==='perf')await meas(name,async()=>{await g.evaluate(js);await T(ms)},rate);else{await g.evaluate(js);await T(ms)}};
 const init=await g.evaluate(()=>{window.__karAuto=1;window.__dumpK=0;return KAR.init({groups:__C.groups,areas:BAL.area.vuon,fh:__C.fh,bg:__C.bg})});console.log(JSON.stringify(init));
 /* the area she talks in: the one with most groups led by a known consort */
 const PICK=process.env.PICK||'';const TA=await g.evaluate(P=>{if(P){const j=KAR.areas.findIndex(a=>a.g.some(g=>g.masters.some(m=>m.name===P)));if(j>=0)return j}let best=0,bi=0;KAR.areas.forEach((a,i)=>{const s=a.g.filter(g=>g.masters[0]&&!g.masters[0].sil&&g.masters[0].kind==='rival').length*2+a.g.length;if(s>best){best=s;bi=i}});return bi},PICK);
 const pickJS=`(()=>{const a=KAR.areas[KAR.cur];const P=${JSON.stringify(PICK)};const g=(P&&a.g.find(g=>g.masters.some(m=>m.name===P)))||a.g.filter(g=>g.masters[0]&&!g.masters[0].sil&&g.masters[0].kind==='rival').sort((x,y)=>((x.masters[0].tag||'').indexOf('???')>=0)-((y.masters[0].tag||'').indexOf('???')>=0)||(y.fol.length-x.fol.length))[0]||a.g[0];window.__G=g;if(P){const m=g.masters.find(m=>m.name===P);if(m&&g.masters[0]!==m){g.masters.splice(g.masters.indexOf(m),1);g.masters.unshift(m)}}KAR.pickGroup(g)})()`;
 async function seq(pk,rate,first){
  if(first){if(mode==='video')console.log('CUT',((Date.now()-global.__T0)/1000+1.2).toFixed(2));await step('idle-live',`0`,1200,rate);await g.evaluate(()=>{tab='go';window.__mapList=false;render()});await T(1500);await shot('d0');
   await step('map',`KAR.showMap()`,1300,rate);await shot('m1');
   if(mode==='shots'){const n=await g.evaluate(()=>KAR.areas.length);for(let i=0;i<n;i++){if(i===TA)continue;await g.evaluate(i=>KAR.enter(i),i);await T(1300);await shot('a'+i);await g.evaluate(()=>KAR.back());await T(900)}}
   else if(mode==='video'){const other=await g.evaluate(TA=>KAR.areas.findIndex((a,i)=>i!==TA&&a.g.length),TA);if(other>=0){await g.evaluate(i=>KAR.enter(i),other);await T(1800);await g.evaluate(()=>KAR.back());await T(1300)}}
   await step('enter',`KAR.enter(${TA})`,1300,rate);await shot('a'+TA)}
  await step('group',pickJS,800,rate);await shot('g-'+pk);
  await step('step',`KAR.stepOut(__G.masters[0])`,1000,rate);await shot('s-'+pk);
  await step('picker',`KAR.picker(__G.masters[0],'${pk}')`,1500,rate);await shot('p-'+pk);
  await step('lift',`(()=>{const b=document.querySelectorAll('#kar .kar-pk .kfoc-b')[1];b&&KAR.lift(b,'${pk}')})()`,900,rate);await shot('l-'+pk);
  await step('talk',`KAR.talk(__G.masters[0],'Muội muội cũng ra vườn ngắm hoa sao?')`,1900,rate);await shot('t-'+pk);
  await step('back',`KAR.unsel()`,1000,rate)}
 const pks=process.argv[4]?[process.argv[4]]:['hang','fan','rib'];
 if(mode==='perf'){for(const rate of [1,4,6]){await cdp.send('Emulation.setCPUThrottlingRate',{rate});await g.evaluate(()=>{tab='act';render()});await T(400);
   let first=true;for(const pk of pks){await seq(pk,rate,first);first=false}}
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});fs.writeFileSync(OUT+'perf.json',JSON.stringify(perf,null,1));console.log(JSON.stringify(perf))}
 else{let first=true;for(const pk of pks){await seq(pk,1,first);first=false}}
 fs.writeFileSync(OUT+'audit-'+mode+'.json',JSON.stringify(AUD,null,1));const vid=mode==='video'?await pg.video().path():null;
 await o.ctx.close();await o.b.close();o.srv.close();if(vid)console.log('VIDEO',vid)})();
