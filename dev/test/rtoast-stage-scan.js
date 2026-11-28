/* rtoast-stage-scan.js (KK54b, MAIN 177 LOOK on kit-resfold-r3, law 10 / law 11): every result card / toast (#rtoast: folded result card, event-result card with picture, bare
   «CẤM» toast) stands INSIDE its own stage box and never over the side panel (#panel) or the tab bar, on Fold 755x1000 and iPad 1180x820.
   usage: node dev/test/rtoast-stage-scan.js <index.html> [WxH,...] [shotdir]   exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');const SHOT=process.argv[4]||'';
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');for(const id of ['kdaytc','kmrew','klife']){const o=document.getElementById(id);if(o)o.remove()}});
  const kinds={
   fold:()=>{const R=rivals.filter(v=>v&&v!==S&&v.name&&v.alive!==false&&!v.out).slice(0,15);R.slice(0,10).forEach(v=>{try{k61Meet(v)}catch(e){}});if(S.kc)S.kc.inPal=1;const b0=rsnap();S.duc+=2;S.suc=Math.max(0,S.suc-5);R.forEach((v,i)=>{v.rel=(v.rel||0)+(i%3?1:-1)*(i+2)});R.slice(0,9).forEach((v,i)=>{v.ghen=(v.ghen||0)+(i%2?1:2)});resultShow('Yến tiệc mời '+R[1].name,b0,null)},
   ev:()=>{const b0=rsnap();S.duc+=1;window.__kitLastEvArt={src:(typeof PH!=="undefined"&&PH.ev)||"img/title-key.webp",lab:""};resultShow('Dạo vườn',b0,null)},
   plain:()=>{const b0=rsnap();S.duc+=1;resultShow('Dạo vườn',b0,null)}};
  for(const [k,fn] of Object.entries(kinds)){
   await p.evaluate(async f=>{const t=document.getElementById('rtoast');if(t)t.classList.remove('on');await new Promise(r=>setTimeout(r,300));(new Function('return '+f))()()},fn.toString());await p.waitForTimeout(700);
   const r=await p.evaluate(()=>{const t=document.getElementById('rtoast');if(!t||!t.classList.contains('on'))return {err:'no card'};const q=t.getBoundingClientRect(),s=document.getElementById('stage').getBoundingClientRect(),pn=document.getElementById('panel').getBoundingClientRect(),tb=document.getElementById('tabs').getBoundingClientRect();
    const x=(a,c)=>Math.max(0,Math.min(a.right,c.right)-Math.max(a.left,c.left))>1&&Math.max(0,Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top))>1;
    return {card:[q.left,q.right,q.top,q.bottom].map(Math.round),stage:[s.left,s.right].map(Math.round),inStage:q.left>=s.left-1&&q.right<=s.right+1,overPanel:x(q,pn)&&pn.left>=s.right-1,overTabs:x(q,tb),fits:q.top>=0&&q.bottom<=innerHeight}});
   if(r.err){chk(`${wh} ${k} card shown`,false,r);continue}
   chk(`${wh} ${k}: card inside its stage box, not over the side panel / tab bar`,r.inStage&&!r.overPanel&&!r.overTabs&&r.fits,r);
   if(SHOT)await p.screenshot({path:SHOT+'/rtoast-'+k+'-'+W+'x'+H+'.png'})}
  chk(`${wh} no page errors`,!errs.length,errs);await p.close()}
 await b.close();console.log(fails?'RTOAST-STAGE FAIL '+fails:'RTOAST-STAGE PASS');process.exit(fails?1:0)})();
