/* node run.js <fold|ipad> <shots|video|perf> [pk] — drives the mock in the real game; out → /home/user/wt/ring2-shots/r3 */
const {boot}=require('./boot');const fs=require('fs');const D=require(__dirname+'/../../test/lib/device');
const dev=process.argv[2]||'fold',mode=process.argv[3]||'shots',OUT='/home/user/wt/ring3-shots/';fs.mkdirSync(OUT+'vid',{recursive:true});
const DEV={fold:'fold',ipad:'ipadAir'}[dev];
(async()=>{const dd=D.DEVICES[DEV];const extra=mode==='video'?{recordVideo:{dir:OUT+'vid/tmp-'+dev,size:{width:dd.w,height:dd.h}}}:{};
 const o=await boot(DEV,mode==='shots'?2:1,0,Object.assign({reducedMotion:'no-preference'},extra));const {g,pg}=o;
 await g.evaluate(fs.readFileSync(__dirname+'/scen3.js','utf8'));await g.evaluate(fs.readFileSync(__dirname+'/area.js','utf8'));
 const CR=JSON.parse(fs.readFileSync(__dirname+'/crowd.json','utf8'));
 const info=await g.evaluate(async CR=>{document.documentElement.classList.remove('kf-still');try{BAL.df.idle={every:[1e9,1e9],first:1e9}}catch(e){}Q.length=0;S.place='vuon';S.visit={k:'vuon',people:[],talked:false,tk:{}};render();try{k3ShowPlace()}catch(e){}render();
  for(const id of ['rtoast','kntchip']){const e=document.getElementById(id);if(e)e.remove()}await new Promise(r=>setTimeout(r,1500));
  window.__karMe=CR.me;window.__karMeAsp=CR.meAsp;window.__C={fh:CR.fh,groups:CR.groups};return {n:CR.groups.length}},CR);
 console.log(JSON.stringify(info));
 let cdp=null;if(mode==='perf'){cdp=await pg.context().newCDPSession(pg);}
 const shot=async n=>{if(mode==='shots')await pg.screenshot({path:OUT+dev+'-'+n+'.png'})};
 const T=ms=>pg.waitForTimeout(ms);
 const perf={};async function meas(name,fn,rate){/* rAF frame times inside the game frame during fn */
  await g.evaluate(()=>{window.__ft=[];let l=performance.now();window.__fton=1;const f=t=>{if(!window.__fton)return;window.__ft.push(t-l);l=t;requestAnimationFrame(f)};requestAnimationFrame(f)});
  await fn();const ft=await g.evaluate(()=>{window.__fton=0;return window.__ft.slice(1)});ft.sort((a,b)=>a-b);const p=q=>ft[Math.min(ft.length-1,Math.floor(ft.length*q))]||0;
  (perf[name]=perf[name]||{})[rate]={n:ft.length,p50:+p(.5).toFixed(1),p95:+p(.95).toFixed(1),max:+(ft[ft.length-1]||0).toFixed(1)}}
 async function seq(pk,rate){const step=async(name,js,ms)=>{if(mode==='perf')await meas(name,async()=>{await g.evaluate(js);await T(ms)},rate);else{await g.evaluate(js);await T(ms)}};
  await step('enter',`KAR.init({groups:__C.groups,areas:BAL.area.vuon,fh:__C.fh})`,1300);await shot('a0');
  await step('pan',`KAR.go(1)`,1500);await shot('a1');
  await step('pan2',`KAR.go(2)`,1500);await shot('a2');
  await step('group',`(()=>{window.__karAuto=1;const a=KAR.areas[KAR.cur];const g=a.g.slice().sort((x,y)=>(y.fol.length+y.masters.length)-(x.fol.length+x.masters.length))[0];window.__G=g;KAR.pickGroup(g)})()`,800);await shot('g-'+pk);if(mode==='shots')console.log('ROUND',await g.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>{const c=getComputedStyle(e),b=e.getBoundingClientRect();return c.borderRadius.indexOf('50%')>=0&&b.width>20&&b.width<90&&b.top<330&&c.display!=='none'&&c.visibility!=='hidden'&&+c.opacity>0}).map(e=>e.tagName+'.'+e.className+'#'+e.id+' <'+(e.parentElement&&e.parentElement.className)).slice(0,8).join(' | ')));
  await step('step',`KAR.stepOut(__G.masters[0])`,1000);await shot('s-'+pk);
  await step('picker',`KAR.picker(__G.masters[0],'${pk}')`,1600);await shot('p-'+pk);
  await step('lift',`(()=>{const b=document.querySelectorAll('#kar .kar-pk .kfoc-b')[1];b&&KAR.lift(b,'${pk}')})()`,700);await shot('l-'+pk);
  await step('talk',`KAR.talk(__G.masters[0],'Muội muội cũng ra vườn ngắm hoa sao?')`,1800);await shot('t-'+pk);
  await step('back',`KAR.unsel()`,900);}
 const pks=process.argv[4]?[process.argv[4]]:['fan','hang','bac'];
 if(mode==='perf'){for(const rate of [1,4,6]){await cdp.send('Emulation.setCPUThrottlingRate',{rate});for(const pk of pks){await g.evaluate(()=>{const e=document.getElementById('kar');if(e)e.remove()});await seq(pk,rate)}}
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});fs.writeFileSync(OUT+'perf-'+dev+'.json',JSON.stringify(perf,null,1));console.log(JSON.stringify(perf))}
 else for(const pk of pks){await g.evaluate(()=>{const e=document.getElementById('kar');if(e)e.remove()});await seq(pk,1)}
 const geoChk=await g.evaluate(()=>{const r=[];const f=document.querySelector('#kar .kar-f img.l');return r});
 await o.ctx.close();await o.b.close();o.srv.close()})();
