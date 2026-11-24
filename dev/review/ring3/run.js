/* node run.js <fold|ipad> <shots|video|perf> [pk]  — drives the KAR v3 mock in the real game; ONE consort life on both devices:
   SAVE=/home/user/wt/ring3-shots/life.json (boot.js loads the same save) + crowd.json (the real j95 crowd of that life). Out → /home/user/wt/ring3-shots/<dev>/ */
const {boot}=require('./boot');const fs=require('fs');const D=require(__dirname+'/../../test/lib/device');
const dev=process.argv[2]||'fold',mode=process.argv[3]||'shots',OUT='/home/user/wt/ring3-shots/'+dev+'/';fs.mkdirSync(OUT+'vid',{recursive:true});
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
   g.masters.forEach(m=>{const v=(typeof rivals!=='undefined'?rivals:[]).find(r=>r.name===m.name);if(v){m.net=(v.net||[]).slice();m.sac=v.sac||0}});return g});
  /* maids serving the Emperor (ag_maid:emp…) stand behind HIM, not as their own group */
  const eg=groups.find(g=>g.masters.some(m=>m.kind==='emp'));if(eg){for(let i=groups.length-1;i>=0;i--){const g=groups[i];if(g!==eg&&/^ag_maid:emp/.test(g.act)){eg.fol.push(...g.masters,...g.fol);groups.splice(i,1)}}}
  const me=document.querySelector('#mefig img,#mefig .figimg');window.__karMe=me&&(me.currentSrc||me.src)||figFor(S);window.__karMeAsp=me&&me.naturalWidth?me.naturalWidth/me.naturalHeight:.32;window.__karKh=CR.best.kh||0;
  window.__C={fh:CR.fh,groups,bg};return {bg,life:S.name,buoi:S.buoi,liveN:window.__liveN,crowdN:CR.groups.reduce((t,g)=>t+g.masters.length+g.fol.length,0)}},CR);
 console.log(JSON.stringify(info));
 let cdp=null;if(mode==='perf')cdp=await pg.context().newCDPSession(pg);
 const shot=async n=>{if(mode==='shots')await pg.screenshot({path:OUT+n+'.png'})};
 const T=ms=>pg.waitForTimeout(ms);
 const perf={};async function meas(name,fn,rate){/* rAF frame times inside the game frame during fn */
  await g.evaluate(()=>{window.__ft=[];let l=performance.now();window.__fton=1;const f=t=>{if(!window.__fton)return;window.__ft.push(t-l);l=t;requestAnimationFrame(f)};requestAnimationFrame(f)});
  await fn();const ft=await g.evaluate(()=>{window.__fton=0;return window.__ft.slice(1)});ft.sort((a,b)=>a-b);const p=q=>ft[Math.min(ft.length-1,Math.floor(ft.length*q))]||0;
  (perf[name]=perf[name]||{})[rate]={n:ft.length,p50:+p(.5).toFixed(1),p95:+p(.95).toFixed(1),max:+(ft[ft.length-1]||0).toFixed(1),jank:ft.filter(x=>x>33.4).length}}
 const step=async(name,js,ms,rate)=>{if(mode==='perf')await meas(name,async()=>{await g.evaluate(js);await T(ms)},rate);else{await g.evaluate(js);await T(ms)}};
 const init=await g.evaluate(()=>{window.__karAuto=1;return KAR.init({groups:__C.groups,areas:BAL.area.vuon,fh:__C.fh,bg:__C.bg})});console.log(JSON.stringify(init));
 /* the area she talks in: the one with most groups led by a known consort */
 const TA=await g.evaluate(()=>{let best=0,bi=0;KAR.areas.forEach((a,i)=>{const s=a.g.filter(g=>g.masters[0]&&!g.masters[0].sil&&g.masters[0].kind==='rival').length*2+a.g.length;if(s>best){best=s;bi=i}});return bi});
 const pickJS=`(()=>{const a=KAR.areas[KAR.cur];const g=a.g.filter(g=>g.masters[0]&&!g.masters[0].sil&&g.masters[0].kind==='rival').sort((x,y)=>((x.masters[0].tag||'').indexOf('???')>=0)-((y.masters[0].tag||'').indexOf('???')>=0)||(y.fol.length-x.fol.length))[0]||a.g[0];window.__G=g;KAR.pickGroup(g)})()`;
 async function seq(pk,rate,first){
  if(first){await step('idle-live',`0`,1200,rate);await g.evaluate(()=>{tab='go';window.__mapList=false;render()});await T(1500);await shot('d0');
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
 const vid=mode==='video'?await pg.video().path():null;
 await o.ctx.close();await o.b.close();o.srv.close();if(vid)console.log('VIDEO',vid)})();
