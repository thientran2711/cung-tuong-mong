/* LAYER SCAN of every toilette reaction modal (review/toil-react-top): for each reaction kind that toilFlush can open, the element at the centre of #modal and at the centre of its dialog must be inside #modal.
   Lists the stacking layers (z-index) above #modal that can exist at that moment. usage: node dev/test/toil-react-layers.js <url> <WxH@dpr> <shotdir>   (exit 1 on a failed check) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,VP,DIR,OLD]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;
fs.mkdirSync(DIR,{recursive:true});const fails=[];const chk=(c,msg)=>{if(!c)fails.push(msg)};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(60000);const out={vp:VP};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,#klife,.kmov.kcf').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:30000});
  const ok=await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out&&qOn()&&S.rank<7&&rivals.some(v=>!v.queen&&!v.out));if(ok)break}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.bac=2000;S.toilette={day:toilWk()*10,wk:toilWk(),score:30,makeup:true,style:'plain',dv:'giandi',F:0,occ:['thuong'],look:null};deal();render();
  window.V=rivals.find(v=>!v.queen&&!v.out);window.react=(k,n,over)=>{const v=V;Q.length=0;toilReact(Object.assign({k,who:pv(v),host:v,v,n,name:v.name,line:'thử',ctx:{mk:'moc',dress:'giandi'}},over||{}))}});

 const KINDS=[['rival-jealous',-2,'host'],['rival-jealous',-1,'host'],['rival-praise',1,'host'],['crowd-jealous',-1,'host'],['th-praise',2,'th'],['th-dislike',-2,'th'],['emp-dislike',-1,'emp'],['emp-like',1,'emp']];
 out.rows=[];
 for(const [k,n,h] of KINDS){
  await p.evaluate(([k,n,h])=>{Q.length=0;const v=V;toilReact(Object.assign({k,n,name:h==='th'?'Thái hậu':h==='emp'?'Sủng':v.name,line:'thử',ctx:{mk:'moc',dress:'giandi'}},h==='th'?{who:pTH(),host:'th'}:h==='emp'?{who:pEmp(),host:'emp'}:{who:pv(v),host:v,v}))},[k,n,h]);await p.waitForTimeout(700);
  for(let i=0;i<3;i++){const c=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(e=>/^Nhận$/.test(e.textContent.trim())&&e.offsetParent&&!e.closest('#modal'));if(b){b.click();return true}return false});if(!c)break;await p.waitForTimeout(400)}
  const r=await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return{open:false};const d=M.querySelector('.dlg')||M,dr=d.getBoundingClientRect(),mr=M.getBoundingClientRect();
   const pts=[[mr.left+mr.width/2,mr.top+mr.height/2],[dr.left+dr.width/2,dr.top+dr.height/2],[dr.left+dr.width/2,dr.top+dr.height*.85]];const ok=pts.every(([x,y])=>{const e=document.elementFromPoint(x,y);return !!(e&&M.contains(e))});
   const zi=e=>{const z=getComputedStyle(e).zIndex;return z==='auto'?0:+z};const above=[...document.body.children].filter(e=>e!==M&&zi(e)>zi(M)&&getComputedStyle(e).display!=='none'&&e.offsetParent!==null&&getComputedStyle(e).position!=='static').map(e=>(e.id?'#'+e.id:'.'+String(e.className).split(' ')[0])+'='+zi(e));
   return{open:true,ok,mz:zi(M),opts:(Q[0]&&Q[0].opts?Q[0].opts.length:0),above}});
  r.k=k+'('+n+')';out.rows.push(r);chk(r.open,r.k+': open');chk(r.ok,r.k+': dialog is on top');
  await p.evaluate(()=>{try{closeModal()}catch(e){}Q.length=0})}
 chk(!errs.length,'page errors: '+errs.join('|'));out.fails=fails;out.errs=errs;console.log(JSON.stringify(out));await b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
