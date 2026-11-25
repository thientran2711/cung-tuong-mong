/* ROBOT-LIFE-M2 engine: ONE persistent browser, REAL taps only (touchscreen tap at element centre after elementFromPoint hit-check). policy.js is hot-reloaded each step. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const D=__dirname,URL='http://127.0.0.1:8123/index.html';
const log=(...a)=>{const s=new Date().toISOString().slice(11,19)+' '+a.join(' ');fs.appendFileSync(D+'/life.log',s+'\n');if(process.env.V)console.log(s)};
const bugs=[];const addBug=(k,m,d)=>{const b={t:new Date().toISOString(),k,m,d};bugs.push(b);fs.appendFileSync(D+'/bugs.jsonl',JSON.stringify(b)+'\n');log('BUG',k,m)};
const SNAP=()=>{
 const vis=e=>{const r=e.getBoundingClientRect();if(r.width<6||r.height<6)return null;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity<0.05||cs.pointerEvents==='none')return null;return r};
 const out=[];const seen=new Set();
 const sel='button,a,[role=button],[data-nl],[data-act],[data-a],[data-load],[onclick],.opt,.kbtn,.krt,.kpki,.pct,[class*=tab],input,select,textarea,canvas';
 document.querySelectorAll(sel).forEach(e=>{const r=vis(e);if(!r)return;const x=r.left+r.width/2,y=r.top+r.height/2;
  if(x<0||y<0||x>innerWidth||y>innerHeight){out.push({off:1,tag:e.tagName,cls:(e.className+'').slice(0,50),txt:(e.innerText||'').trim().replace(/\s+/g,' ').slice(0,80),dis:!!e.disabled||/\bkdis\b/.test(e.className+'')});return}
  const t=document.elementFromPoint(x,y);const hit=!!t&&(t===e||e.contains(t));let hp=null;if(!hit&&e.tagName==='BUTTON'&&/\\b(opt|kbtn)\\b/.test(e.className+'')&&!e.disabled){outer:for(let yy=r.top+3;yy<Math.min(r.bottom-2,innerHeight-2);yy+=5){for(const fx of [.15,.5,.85]){const xx=r.left+r.width*fx;if(xx<0||xx>innerWidth||yy<0)continue;const tt=document.elementFromPoint(xx,yy);if(tt&&(tt===e||e.contains(tt))){hp=[Math.round(xx),Math.round(yy)];break outer}}}}
  out.push({hp,tag:e.tagName,id:e.id,cls:(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)+'',txt:(e.innerText||e.getAttribute('aria-label')||e.value||'').trim().replace(/\s+/g,' ').slice(0,120),x:Math.round(x),y:Math.round(y),w:Math.round(r.width),h:Math.round(r.height),hit,dis:!!e.disabled||/\bkdis\b/.test(e.className+''),cover:hit?'':(t?t.tagName+'#'+t.id+'.'+(t.className+'').slice(0,40):'none')})});
 const m=document.getElementById('modal');const mv=m&&getComputedStyle(m).display!=='none';
 const g=n=>{const e=document.querySelector(n);return e?(e.innerText||'').trim().replace(/\s+/g,' '):''};
 return {c:out,modal:mv?(m.innerText||'').trim().replace(/\s+/g,' ').slice(0,700):'',modalCls:mv?m.className:'',hud:g('#hud')||document.body.innerText.slice(0,0),
  head:(document.querySelector('.top, #top, header')||{innerText:''}).innerText.replace(/\s+/g,' ').slice(0,300),
  S:(()=>{try{return {year:S.year,month:S.month,tuan:S.tuan,buoi:S.buoi,age:S.age,name:S.name,over:!!(window.__over||S.over||S.dead)}}catch(e){return null}})(),
  scrolled:0}};
(async()=>{
 const prof=process.env.PROF||D+'/prof';
 const ctx=await chromium.launchPersistentContext(prof,{headless:true,viewport:{width:755,height:1000},hasTouch:true,reducedMotion:'reduce',args:['--no-sandbox']});
 const p=ctx.pages()[0]||await ctx.newPage();p.setDefaultTimeout(30000);
 p.on('pageerror',e=>{addBug('PAGEERR',e.message,(e.stack||'').split('\n').slice(0,3).join(' | '))});
 p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))addBug('CONSOLE',m.text().slice(0,200),'')});
 await p.addInitScript(()=>{let s=102;Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}});
 const boot=async()=>{await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:180000});
  await p.evaluate(()=>{window.__forceOrigin='thd';const i0=a67init;a67init=function(k){const p0=pk67,c0=choose67;const want='thd_tho';pk67=function(a){return Array.isArray(a)&&a.includes(want)?want:p0.apply(this,arguments)};choose67=function(k2,ids){return Array.isArray(ids)&&ids.includes(want)?want:c0.apply(this,arguments)};try{return i0.apply(this,arguments)}finally{pk67=p0;choose67=c0}}});
  await p.waitForTimeout(+process.env.BOOTW||20000)};
 await boot();
 const api={p,ctx,boot,log,addBug,bugs,D};
 global.__api=api;
 let step=0,mem={n:0,last:'',same:0,taps:0};
 const shot=async n=>{try{await p.screenshot({path:D+'/shots/'+n+'.png'})}catch(e){}};fs.mkdirSync(D+'/shots',{recursive:true});api.shot=shot;
 const tapXY=async(x,y)=>{await p.touchscreen.tap(x,y)};api.tapXY=tapXY;
 for(;;){
  step++;
  let pol;try{delete require.cache[require.resolve('./policy.js')];pol=require('./policy.js')}catch(e){log('policy load error',e.message);await p.waitForTimeout(3000);continue}
  if(fs.existsSync(D+'/STOP')){log('STOP file');break}
  if(fs.existsSync(D+'/EVAL.js')){const src=fs.readFileSync(D+'/EVAL.js','utf8');fs.unlinkSync(D+'/EVAL.js');let r;try{r=await p.evaluate(src)}catch(e){r='ERR '+e.message}fs.writeFileSync(D+'/eval.out',typeof r==='string'?r:JSON.stringify(r,null,1));if(fs.existsSync(D+'/SHOT')){fs.unlinkSync(D+'/SHOT');await shot('manual')}}
  let snap;try{snap=await p.evaluate(SNAP)}catch(e){log('snap err',e.message.slice(0,100));await p.waitForTimeout(1000);continue}
  let act;try{act=await pol.decide(snap,mem,api)}catch(e){log('decide err',e.stack.slice(0,300));act={type:'pause',why:'policy exception '+e.message}}
  if(act.type==='pause'){fs.writeFileSync(D+'/state.json',JSON.stringify({why:act.why,snap},null,1));await shot('pause');log('PAUSE',act.why);const t0=Date.now();while(!fs.existsSync(D+'/GO')&&!fs.existsSync(D+'/STOP')&&Date.now()-t0<25000){if(fs.existsSync(D+'/EVAL.js')){const src=fs.readFileSync(D+'/EVAL.js','utf8');fs.unlinkSync(D+'/EVAL.js');let r;try{r=await p.evaluate(src)}catch(e){r='ERR '+e.message}fs.writeFileSync(D+'/eval.out',typeof r==='string'?r:JSON.stringify(r,null,1))}await p.waitForTimeout(700)}try{fs.unlinkSync(D+'/GO')}catch(e){}continue}
  if(act.type==='wait'){await p.waitForTimeout(act.ms||600);continue}
  if(act.type==='scroll'){log('SWIPE',act.x,act.y,act.dy);const cdp=api.cdp||(api.cdp=await ctx.newCDPSession(p));const b4=await p.evaluate(()=>[...document.querySelectorAll('#modal .body,#modal .kpbody,.cards,#panel')].map(e=>e.scrollTop).join());await p.mouse.move(act.x,act.y);await p.mouse.wheel(0,act.dy);await p.waitForTimeout(250);const af=await p.evaluate(()=>[...document.querySelectorAll('#modal .body,#modal .kpbody,.cards,#panel')].map(e=>e.scrollTop).join());if(b4===af){await cdp.send('Input.synthesizeScrollGesture',{x:act.x,y:act.y,yDistance:-act.dy,gestureSourceType:'touch',speed:1200})}await p.waitForTimeout(500);continue}
  if(act.type==='eval'){try{await p.evaluate(act.fn)}catch(e){}continue}
  if(act.type==='mgplay'){
   const cdp=api.cdp||(api.cdp=await ctx.newCDPSession(p));const G=()=>{let s=0;for(let i=0;i<6;i++)s+=Math.random();return (s-3)/Math.sqrt(.5)};
   const t0=Date.now();let held=null,played=0,idle=0;const sleep=ms=>p.waitForTimeout(ms);
   const touch=(type,pts)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:pts.map((q,i)=>({x:q[0],y:q[1],id:i}))});
   log('MINIGAME board play start');
   while(Date.now()-t0<240000){
    let st;try{st=await p.evaluate(()=>{if(typeof KG82==='undefined')return null;const b=document.getElementById('kg82box'),r=b&&b.getBoundingClientRect();let pk=null;try{pk=KG82.peek()}catch(e){}if(pk&&pk.sel){const e=document.querySelector(pk.sel);if(e){const q=e.getBoundingClientRect();pk=Object.assign({},pk,{selxy:[q.left+q.width/2,q.top+q.height/2]})}}return {ph:KG82.phase,pk,sc:r?Math.min(r.width,r.height):500}})}catch(e){st=null}
    if(!st||st.ph!=='play'){break}
    if(Date.now()-(api.lastMgLog||0)>8000){api.lastMgLog=Date.now();log('mg state pk='+JSON.stringify(st.pk).slice(0,160)+' moves='+played+' idle='+idle)}
    const pk=st.pk,s=st.sc*0.018;
    if(!pk){await sleep(80);idle++;if(idle>=40&&idle%20===0){const fin=await p.evaluate(()=>/\d+\/\d+\s*·\s*\S+/.test((document.querySelector('#kg82')||{innerText:''}).innerText));if(fin){log('mg result card shown (phase still play) -> leave loop');break}}if(idle===150){await shot('mg_idle_'+Date.now());const d=await p.evaluate(()=>({title:(document.querySelector('#kg82')||{innerText:''}).innerText.slice(0,200),btn:[...document.querySelectorAll('#kg82 button')].filter(b=>b.offsetParent).map(b=>b.innerText.slice(0,25)+'|'+b.id+'|'+b.className.slice(0,25))}));log('mg idle diag '+JSON.stringify(d).slice(0,500))}continue}
    try{
    if(pk.at!=null){await sleep(Math.max(0,pk.at-40+G()*40));const q2=await p.evaluate(()=>{try{return KG82.peek()}catch(e){return null}});const q=q2||pk;await p.touchscreen.tap(Math.round(q.x+G()*s),Math.round(q.y+G()*s));played++;await sleep(120);continue}
    if(pk&&'hold' in pk&&!pk.drag&&!pk.sel){const want=!!pk.hold;let x=pk.x,y=pk.y;if(pk.selxy){x=pk.selxy[0];y=pk.selxy[1]}
      if(want&&!held&&x!=null){await touch('touchStart',[[x,y]]);held=[x,y]}else if(!want&&held){await touch('touchEnd',[]);held=null}await sleep(40);continue}
    if(pk.drag){await sleep(450+Math.random()*450);const D=pk.drag.map(([x,y],i)=>[x+G()*s*(i?.8:.4),y+G()*s*(i?.8:.4)]);const pts=[];for(let i=1;i<D.length;i++){const n=Math.max(1,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/12));for(let k=1;k<=n;k++)pts.push([D[i-1][0]+(D[i][0]-D[i-1][0])*k/n,D[i-1][1]+(D[i][1]-D[i-1][1])*k/n])}
      await touch('touchStart',[D[0]]);for(const q of pts){await touch('touchMove',[q]);await sleep(10)}await touch('touchEnd',[]);played++;await sleep(300);continue}
    if(pk.sel&&pk.selxy){await sleep(450+Math.random()*450);await p.touchscreen.tap(Math.round(pk.selxy[0]),Math.round(pk.selxy[1]));played++;await sleep(300);continue}
    if(pk.x!=null){await sleep(400+Math.random()*300);await p.touchscreen.tap(Math.round(pk.x+G()*s),Math.round(pk.y+G()*s));played++;await sleep(150);continue}
    await sleep(100)}catch(e){log('mg err',e.message.slice(0,80));await sleep(200)}
   }
   if(held){try{await touch('touchEnd',[])}catch(e){}}
   log('MINIGAME board play end moves='+played+' idle='+idle+' ms='+(Date.now()-t0));continue}
  if(act.type==='toilplay'){
   const cdp=api.cdp||(api.cdp=await ctx.newCDPSession(p));const sleep=ms=>p.waitForTimeout(ms);const touch=(type,pts)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:pts.map((q,i)=>({x:q.x!=null?q.x:q[0],y:q.y!=null?q.y:q[1],id:i}))});
   log('TOIL makeup board play start');const t0=Date.now();let lastPh=-1,done0=0,done1=0,lips=0;
   while(Date.now()-t0<180000){
    let g;try{g=await p.evaluate(()=>{if(typeof TOIL==='undefined'||!TOIL.geo)return null;return {ph:TOIL.geo.phase(),ready:TOIL.geo.ready(),nx:!!document.getElementById('toilnx'),go:!!document.getElementById('toilgo')}})}catch(e){g=null}
    if(!g)break;
    if(g.ph!==lastPh){log('TOIL phase',g.ph);lastPh=g.ph}
    if(g.ph>=3){await sleep(500);break}
    if(g.go){const q=await p.evaluate(()=>{const e=document.getElementById('toilgo');const r=e.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});await p.touchscreen.tap(Math.round(q[0]),Math.round(q[1]));await sleep(1500);continue}
    if(!g.ready){await sleep(300);continue}
    try{
    if(g.ph===0&&!done0){const B=await p.evaluate(()=>TOIL.geo.brows());for(const L of B){await touch('touchStart',[L[0]]);for(const q of L.filter((_,i)=>i%2===0||i===L.length-1)){await touch('touchMove',[q]);await sleep(25)}await touch('touchEnd',[]);await sleep(100)}done0=1;await sleep(300);}
    if(g.ph===1&&!done1){const C=await p.evaluate(()=>TOIL.geo.cheeks());for(const q of C){await touch('touchStart',[q]);await sleep(650);await touch('touchEnd',[]);await sleep(80)}done1=1;await sleep(300)}
    if(g.ph===2){const l=await p.evaluate(()=>{try{return TOIL.geo.lip()}catch(e){return null}});if(l&&Math.abs(l.ring-1)<.2){await p.touchscreen.tap(Math.round(l.x),Math.round(l.y));lips++;await sleep(300)}else await sleep(15);continue}
    if(g.nx){const q=await p.evaluate(()=>{const e=document.getElementById('toilnx');const r=e.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});await p.touchscreen.tap(Math.round(q[0]),Math.round(q[1]));done0=0;await sleep(800)}else await sleep(200)
    }catch(e){log('toil err',e.message.slice(0,80));await sleep(300)}
   }
   log('TOIL play end lips='+lips+' ms='+(Date.now()-t0));continue}
  if(act.type==='boot'){await boot();continue}
  if(act.type==='tap'){
   /* hit-check again right before the tap: the element must still own its centre point */
   const ok=await p.evaluate(([x,y,sig])=>{const t=document.elementFromPoint(x,y);return !!t},[act.x,act.y]);
   if(!ok){log('no element at',act.x,act.y);continue}
   mem.taps++;log('TAP',act.x+','+act.y,(act.why||'').slice(0,100));await tapXY(act.x,act.y);await p.waitForTimeout(act.after||350);continue}
 }
 await ctx.close();process.exit(0)})();
