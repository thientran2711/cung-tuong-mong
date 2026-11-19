/* PALACE CHATTER VIDEO (owner OD 19/11 ~03:50Z: a REAL video, never pictures): Playwright recordVideo of the live branch build → H.264 mp4.
   Clip: (1) she comes home → her own maid greets her (bubble above the maid's head); (2) an idle line at home; (3) at a place with consorts:
   a happening pair (gift) on one stage page talk back and forth; (4) an idle exchange there. The bubble is the kit part kitSay
   (KIT §78.z "say", K-HEAD-SAY): the white speech bubble holding the line, above the speaker's head.
   usage: node dev/test/palace-chatter-video.js <baseURL> <W> <H> <out.mp4> */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');
const [,,BASE,W0,H0,OUT]=process.argv;const W=+W0||755,H=+H0||1000;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pcv-'));const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<900,reducedMotion:'no-preference',recordVideo:{dir,size:{width:W,height:H}}});
 await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));const T0=Date.now();
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(800);
 await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());const st0=document.createElement('style');st0.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}';document.head.appendChild(st0);
  window.clr=()=>{Q.length=0;try{closeModal()}catch(e){}const md=document.getElementById('modal');if(md)md.hidden=true};
  window.waitImgs=()=>Promise.race([Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),Wt(9000)]);
  window.go=k=>{clr();S.dead=false;S.confined=0;used=0;S.sung=Math.max(S.sung||0,60);try{tab='act'}catch(e){}try{goTo(k)}catch(e){}clr();
   if(S.place!==k){S.place=k;S.visit={k,people:k==='home'?homePeople():[],talked:false,tk:{},msg:''}}
   if(k!=='home'&&S.visit){const P=S.visit.people;const L=liveRivals(true).filter(v=>!v.out&&!P.some(x=>x.ref===v)&&!sameHouse(S,v));let n=0;while(P.filter(x=>x.kind==='rival').length<3&&L[n])P.push(rp(L[n++]))}render()};
  BAL.chat.gap={min:600,max:600};/* the clip drives the ticks itself */S.buoi=0;used=0;deal();go('vuon');await waitImgs();await Wt(600);clr()});
 const tReady=(Date.now()-T0)/1000;const marks=[];const mark=n=>marks.push([((Date.now()-T0)/1000-tReady).toFixed(1),n]);
 /* (1) home: greeting */
 mark('home');await p.evaluate(async()=>{go('home');await waitImgs();for(let w=0;w<20&&!CHAT.log.some(x=>x.tag==='greet');w++){await new Promise(r=>setTimeout(r,400));if(w%4===3)clr()}});
 await sleep(5200);mark('idle home');await p.evaluate(()=>{CHAT.run=0;CHAT.tick()});await sleep(5600);
 /* (3) a place: a happening pair on one page */
 mark('place');await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));const k='vuon';go(k);await waitImgs();const R2=S.visit.people.filter(q=>q.kind==='rival'&&q.ref).map(q=>q.ref);
  if(R2.length>=2){const a=R2[0],t=R2[R2.length-1];window.agPlanned=agPlanned=()=>[{who:ledgerId(a),k:'cx:gift',t:ledgerId(t),pl:k,kh:0}];go('home');await Wt(200);go(k);await waitImgs();
   const st=document.getElementById('stage');const vis=()=>CHAT.present().map(x=>x.p.ref);for(let g=0;g<6&&!(vis().includes(a)&&vis().includes(t));g++){const pg=(st.dataset.j59pg||'').split(',').map(Number);if(!(pg[1]>pg[0]+1))break;st.__j59p=pg[0]+1;render();await waitImgs();await Wt(600)}}
  await Wt(500);CHAT.run=0;window.__hapN0=CHAT.log.length;CHAT.tick()});
 await sleep(11000);mark('idle place');await p.evaluate(()=>{window.agPlanned=agPlanned=()=>[];CHAT.run=0;CHAT.tick()});await sleep(9000);
 const log=await p.evaluate(()=>CHAT.log.map(x=>[x.tag,x.who,x.txt]));const hapFirst=await p.evaluate(()=>(CHAT.log[window.__hapN0]||{}).tag||null);/* F2: the first exchange at the place is the happening (tag hap) */const DUR=(Date.now()-T0)/1000-tReady;
 const vid=p.video();await ctx.close();await b.close();const webm=await vid.path();
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(Math.max(0,tReady-0.2)),'-i',webm,'-t',String(DUR),'-c:v','libx264','-preset','slow','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart','-an',OUT]);
 console.log(JSON.stringify({out:OUT,marks,hapFirst,log,errs,dur:DUR.toFixed(1)}));console.log(hapFirst==='hap'?'VIDEO happening first: PASS':'VIDEO happening first: FAIL ('+hapFirst+')');process.exit(errs.length||hapFirst!=='hap'?1:0)})().catch(e=>{console.error(e);process.exit(1)});
