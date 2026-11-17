/* morechip-fix (17/11): the swipe-stage "+N" chips (j59chips, KIT 33.9) must never sit ON a side column or rail (#kshR / #kshL / .krailb),
   on any stage: her room and every place painting (PLNAME), at 5 sizes, in HOST mode (the real rot.js frame, as on the devices).
   usage: node dev/test/morechip-scan.js [repo root to serve] [shotdir]   → per size: places with chips, chips, ON-column count; last line "MORECHIP OK|FAIL n" */
const {chromium}=require('playwright');const path=require('path');const ROOT=path.resolve(process.argv[2]||path.join(__dirname,'../..'));const SHOT=process.argv[3];
const D=require(path.join(__dirname,'lib/device.js'));const sleep=t=>new Promise(r=>setTimeout(r,t));
const SIZES=[['fold',{}],['ipadAir',{}],['ipadPro',{}],['pixel',{viewport:{width:412,height:1058},screen:{width:412,height:1058}}],['iphone14',{}]];
(async()=>{const b=await chromium.launch();const srv=await D.serveRoot(ROOT);let bad=0;
for(const [dev,ex] of SIZES){const ctx=await D.newDeviceContext(b,dev,Object.assign({deviceScaleFactor:1},ex));const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));
 await D.openHost(p,srv.url);const g=()=>D.gameFrame(p);
 await g().waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2000);
 await g().evaluate(()=>{const s=document.createElement('style');s.textContent='#kload,#kroul,#kroulw,.kroul{display:none!important}';document.head.appendChild(s);try{localStorage.clear()}catch(e){}window.__bot={pre:1};SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await sleep(300);const s=await g().evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}await sleep(1500);
 const places=await g().evaluate(()=>[S.place].concat(Object.keys(PLNAME).filter(k=>k!==S.place)));const rows=[];
 for(const pl of places){const r=await g().evaluate(async pl=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kmov').forEach(e=>e.remove());S.place=pl;tab='act';render();await new Promise(r=>setTimeout(r,900));
   const st=document.getElementById('stage');if(!st)return{pl,none:1};const ch=[...st.querySelectorAll('.j59more')].filter(c=>c.offsetParent);const cols=[...st.querySelectorAll('#kshR,#kshL,.krailb')].filter(e=>e.offsetParent&&!e.hidden&&e.offsetHeight);
   const on=[];for(const c of ch){const a=c.getBoundingClientRect();for(const e of cols){const q=e.getBoundingClientRect();if(a.left<q.right-1&&a.right>q.left+1&&a.top<q.bottom-1&&a.bottom>q.top+1)on.push(c.textContent+' on '+(e.id||e.className.split(' ')[0]))}
    const s=st.getBoundingClientRect();if(a.left<s.left-1||a.right>s.right+1||a.top<s.top-1||a.bottom>s.bottom+1)on.push(c.textContent+' outside stage')}
   return{pl,chips:ch.map(c=>c.textContent),on}},pl);rows.push(r);
  if(SHOT&&r.on&&r.on.length)await p.screenshot({path:`${SHOT}/morechip-${dev}-${pl}.jpg`,type:'jpeg',quality:70})}
 const withC=rows.filter(r=>r.chips&&r.chips.length),on=rows.flatMap(r=>(r.on||[]).map(x=>r.pl+': '+x));bad+=on.length+errs.length;
 console.log(dev,`places ${rows.length} · with chips ${withC.length} (${withC.map(r=>r.pl+' '+r.chips.join('/')).join(', ')}) · ON column ${on.length}`,on.slice(0,6).join(' | '),errs.length?'errors '+JSON.stringify(errs.slice(0,2)):'');
 if(SHOT){await g().evaluate(()=>{S.place='home';tab='act';render()});await sleep(1500);await p.screenshot({path:`${SHOT}/morechip-${dev}-home.jpg`,type:'jpeg',quality:70})}
 await ctx.close()}
srv.close();await b.close();console.log(bad?'MORECHIP FAIL '+bad:'MORECHIP OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
