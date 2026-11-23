/* TEXT RUN-ON SCAN (report only; owner OD 23/11 ~20:45Z «dò chữ trong game … đưa tôi một bản báo cáo PDF, chụp lại đoạn đó để tôi duyệt»; KIT §5 LINE BREAKS AT THE RIGHT PLACE (b)).
   The in-page bot (dev/measure/inpage4.js) plays several lives at Fold 755x1000; after every few steps every VISIBLE text block (an element with its own text and no block child) is measured.
   Flagged: RUNON = one block of >= 170 chars that has >= 2 sentence breaks («. » «! » «? » « — » « · ») on the same paragraph, or >= 230 chars with no break at all; ORPHAN = last line of a >= 3-line block is one word.
   Each new flagged text is screenshotted whole-page at once (a dialog is open then). Output: <out>/spots.json + <out>/NN.png; then dev/test/text-scan-pdf.js builds the PDF.
   Changes NO game text or layout. usage: [LIVES=6] [MAXMIN=8] node dev/test/text-runon-scan.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const LIVES=+(process.env.LIVES||6),MAXMIN=+(process.env.MAXMIN||8);
const INP=fs.readFileSync(path.join(__dirname,'..','measure','inpage4.js'),'utf8');
const SCAN=`(()=>{const out=[];const vis=e=>{if(!e.getClientRects().length)return false;const r=e.getBoundingClientRect();if(r.width<40||r.height<8)return false;for(let a=e;a&&a!==document.body;a=a.parentElement){const c=getComputedStyle(a);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)return false}return true};
 const cv=document.createElement('canvas').getContext('2d');
 document.querySelectorAll('body *').forEach(e=>{if(['SCRIPT','STYLE','svg','path','CANVAS','BUTTON'].includes(e.tagName)&&e.tagName!=='BUTTON')return;if(e.closest('#kload,#debug,script,style'))return;
  if(e.closest('button,#kpop,.kofold,[hidden]'))return;const dsp=getComputedStyle(e).display;if(/flex|grid|table/.test(dsp))return;const kids=[...e.children];if(kids.some(k=>k.tagName!=='BR'&&getComputedStyle(k).display!=='inline'))return;
  const t=e.textContent.replace(/\\s+/g,' ').trim();if(t.length<120||!vis(e))return;
  const br=e.querySelectorAll('br').length;const sent=(t.match(/[.!?…]\\s+\\S|\\s[—·]\\s/g)||[]).length;
  let why='';if(t.length>=170&&sent>=2&&!br)why='RUNON '+t.length+' chars, '+sent+' sentence breaks, one paragraph';else if(t.length>=230&&!br)why='RUNON '+t.length+' chars, one paragraph';
  const cs=getComputedStyle(e);const lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.3;const h=e.getBoundingClientRect().height;const lines=Math.round(h/lh);
  if(!why&&lines>=3){try{const rg=document.createRange();const tn=[...e.childNodes].filter(n=>n.nodeType===3).pop();if(tn){const w=tn.data.trimEnd().split(/\\s+/);const last=w[w.length-1];rg.setStart(tn,tn.data.trimEnd().length-last.length);rg.setEnd(tn,tn.data.trimEnd().length);const rr=rg.getBoundingClientRect(),er=e.getBoundingClientRect();if(rr.left-er.left<(last.length+2)*parseFloat(cs.fontSize)*0.62&&rr.top>er.top+lh*1.5&&w.length>12)why='ORPHAN last line is one word «'+last+'»'}}catch(x){}}
  if(!why)return;const path=[];for(let a=e;a&&a!==document.body&&path.length<4;a=a.parentElement)path.push(a.tagName.toLowerCase()+(a.id?'#'+a.id:'')+(a.className&&typeof a.className==='string'?'.'+a.className.trim().split(/\\s+/).slice(0,2).join('.'):''));
  const M=document.getElementById('modal');const inModal=M&&!M.hidden&&M.contains(e);const title=inModal?((M.querySelector('.mt,h2,h3,.kdt,.ktitle')||{}).textContent||'').trim().slice(0,60):'';
  out.push({text:t,why,where:(inModal?'Hộp thoại «'+title+'»':(typeof tab!=='undefined'?'màn «'+tab+'»':'màn chính'))+(typeof S!=='undefined'&&S?' · tháng '+S.turn+' tuần '+S.tuan:''),sel:path.join(' < ')})});return out})()`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 await ctx.addInitScript(()=>{let s=20261123;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.addStyleTag({content:'#kload,#klife,.modal.kload,.kroul,#kroulw,#curtain,#buoitr,.kmov{display:none!important}'});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:120000});
 await p.evaluate(INP);const seen=new Map();let n=0;const t0=Date.now();let lives=0;let scans=0;
 while(Date.now()-t0<MAXMIN*60000&&lives<LIVES&&n<60){
  const st=await p.evaluate(()=>{for(let i=0;i<6;i++){window.__bot.step(Math.random()<.6?'sens':'rand',1);if(S&&S.dead)return'dead'}return'run'});
  scans++;const f=await p.evaluate(SCAN);
  for(const x of f){const k=x.text.slice(0,80);if(seen.has(k)){seen.get(k).count++;continue}const sp=Object.assign(x,{count:1,n:++n});seen.set(k,sp);
   try{await p.screenshot({path:`${OUT}/${String(n).padStart(2,'0')}.png`})}catch(e){}}
  if(st==='dead'){lives++;await p.evaluate(()=>{Q=[];start()})}
 }
 const spots=[...seen.values()];fs.writeFileSync(OUT+'/spots.json',JSON.stringify({spots,scans,lives,errs:errs.slice(0,5)},null,1));console.log('spots',spots.length,'scans',scans,'lives',lives,'errors',errs.length);spots.slice(0,12).forEach(s=>console.log(s.n,s.why,'|',s.where,'|',s.text.slice(0,90)));await b.close()})();
