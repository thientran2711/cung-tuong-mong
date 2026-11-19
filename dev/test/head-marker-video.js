/* HEAD MARKER VIDEO (owner OD 19/11 ~03:50Z: "cái ảnh động thật sự, tức là cái video"): a REAL screen recording of the live game build, never pictures.
   Room stage (Hành sự, her chamber), Cảnh động on, reduced motion off:
     her figure      = «ta ở đây» (.kmemark, rank marker bounce) + mood seal BUỒN (slow sad droop on lean-in)
     her maid        = REAL errand return → the yellow speech bubble (.khead on, kit §78.z) + mood seal GIẬN (strong shake on lean-in)
     a third figure  = the plain WHITE bubble (kitHeadMarkHtml "off", placed by the same kit kitBadgeAt; TEST-ONLY demo element: the game shows the plain state nowhere yet)
                       only when a third figure is on screen (iPad); every other figure keeps its own mood seal.
   Seals idle-sway the whole time (kit jemoseal); lean-ins are the kit's own random ones PLUS forced ones (kitEmoSeal.lean(el,true)) so every clip shows ≥ 2 lean-ins of each of giận and buồn.
   usage: node dev/test/head-marker-video.js <baseURL> <W> <H> <out.mp4> [seconds=16]
   Records with Playwright recordVideo (webm, CSS-px size W×H; the screencast is drawn at viewport size), trims the loading part, converts to H.264 mp4 (ffmpeg, yuv420p, faststart). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');
const [,,BASE,W0,H0,OUT,SEC]=process.argv;const W=+W0||755,H=+H0||1000,DUR=Math.min(19,+SEC||16);const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'hmv-'));const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<900,reducedMotion:'no-preference',recordVideo:{dir,size:{width:W,height:H}}});
 await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));const T0=Date.now();
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1200);
 const info=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());try{OPT.fxon=true}catch(e){}S.buoi=0;used=0;deal();
  const st0=document.createElement('style');st0.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}';document.head.appendChild(st0);
  /* moods: her = buồn, her maid = giận (the seal shows the feeling; the mood logic itself is untouched outside this recording) */
  const FORCE=q=>q===S?'buon':(q&&(q===S.maid||q.kind==='maid')?'gian':null);
  const ke=window.kitEmotion;window.kitEmotion=function(q){const m=ke.apply(this,arguments);const k=FORCE(q);return k&&m?Object.assign({},m,{k,known:true}):m};
  const sk=window.emoSealKey;window.emoSealKey=emoSealKey=function(q,m){const k=FORCE(q);return k||sk.apply(this,arguments)};
  S.dead=false;S.confined=0;S.place='home';S.erra=[];try{tab='act'}catch(e){}render();await Wt(1500);
  /* REAL errand return on her maid → the yellow bubble */
  if(typeof ERR!=='undefined'&&S.maid){S.erra.push({id:'vid-mm',who:'mm:me',nm:S.maid.name,k:'spy',lbl:'đi dò la',t0:0,due:0,back:1,read:0,rep:{t:'x',L:['x'],d:[]}});ERR.base=S;ERR.seen={};ERR.seen['vid-mm']={off:1,on:1};try{ERR.sync()}catch(e){}}
  /* keep the maid's notice unread for the whole clip (the game's own ledger may consume a fake task): re-arm it, re-sync only when the bubble is gone */
  setInterval(()=>{try{if(window.__vidSwapped)return;let t=S.erra.find(x=>x.id==='vid-mm');if(!t){t={id:'vid-mm',who:'mm:me',nm:S.maid.name,k:'spy',lbl:'đi dò la',t0:0,due:0,back:1,read:0,rep:{t:'x',L:['x'],d:[]}};S.erra.push(t)}t.read=0;t.back=1;ERR.seen['vid-mm']={off:1,on:1};if(!document.querySelector('i.kmerr-bang'))ERR.sync()}catch(e){}},200);
  await Promise.race([Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),Wt(9000)]);await Wt(1500);try{ERR.sync()}catch(e){}try{kitFigSealAll()}catch(e){}await Wt(600);
  /* the opening dialog (Nhập cung) and any queued popup off the stage */
  const clr=()=>{Q.length=0;try{closeModal()}catch(e){}const md=document.getElementById('modal');if(md)md.hidden=true};clr();await Wt(500);clr();
  /* TEST-ONLY: the plain white bubble on a third figure in view (same kit part + same kit placement) */
  const st=document.getElementById('stage');const figs=[...document.querySelectorAll('#tokens .tok.fig img.figimg')].filter(f=>f.offsetParent&&f.naturalWidth&&!f.closest('.j59off')&&f.getBoundingClientRect().right>st.getBoundingClientRect().left+4&&f.getBoundingClientRect().left<st.getBoundingClientRect().right-4);
  const maidFig=figs.find(f=>{const tok=f.closest('.tok');const q=curPeople()[+tok.dataset.p];return q&&(q===S.maid||q.kind==='maid')});let white=0;
  const place=()=>{document.querySelectorAll('.kvid-w').forEach(e=>e.remove());for(const f of figs){if(f===maidFig)continue;const px=KIT_HEADMK.px||24;const P=kitBadgeAt(st,f,'hap',px,px);if(!P)continue;
    const w=document.createElement('span');w.innerHTML=kitHeadMarkHtml('Thường','img','off');const c=w.firstChild;c.classList.add('kvid-w');c.style.cssText=`position:fixed;left:${P.left.toFixed(1)}px;top:${P.top.toFixed(1)}px;z-index:7;margin:0`;document.body.appendChild(c);white++;break}};
  place();await Wt(400);
  /* only her + the maid on screen (Fold, 2 per view): at half time the maid's bubble shows the plain WHITE state at the same kit spot (test-only swap) */
  window.__vidSwap=()=>{if(white)return false;const st=document.getElementById('stage');const mf=[...document.querySelectorAll('#tokens .tok.fig img.figimg')].find(f=>{const q=curPeople()[+f.closest('.tok').dataset.p];return f.isConnected&&f.offsetParent&&q&&q.kind==='maid'});if(!mf)return false;const px=KIT_HEADMK.px||24;const P=kitBadgeAt(st,mf,'hap',px,px);if(!P)return false;window.__vidSwapped=1;const hs=document.createElement('style');hs.textContent='.kmerr-bang{visibility:hidden!important}';document.head.appendChild(hs);
   const w=document.createElement('span');w.innerHTML=kitHeadMarkHtml('Thường','img','off');const c=w.firstChild;c.classList.add('kvid-w');c.style.cssText=`position:fixed;left:${P.left.toFixed(1)}px;top:${P.top.toFixed(1)}px;z-index:7;margin:0`;document.body.appendChild(c);return true};
  const seals=[...document.querySelectorAll('img.kfseal')].map(s=>({k:(s.className.match(/kemo-(gian|buon|\w+)/)||[])[1],me:s.__fig&&s.__fig.id==='mefig'}));
  return{figs:figs.length+1,white,seals,maid:!!maidFig,bubble:!!document.querySelector('i.kmerr-bang')}});
 const tReady=(Date.now()-T0)/1000;
 /* forced lean-ins on top of the kit's own random ones: giận / buồn alternate, ≥ 2 each */
 const lean=who=>p.evaluate(w=>{const s=[...document.querySelectorAll('img.kfseal')].find(e=>w==='me'?e.__fig&&e.__fig.id==='mefig':e.className.includes('kemo-gian'));if(s&&window.kitEmoSeal)kitEmoSeal.lean(s,true);return !!s},who);
 const plan=[[1.5,'gian'],[4.5,'me'],[8,'gian'],[11,'me'],[14,'gian']].filter(x=>x[0]<DUR-1.5);let t=0,did=[];
 let swapped=null;for(const [at,w] of plan){if(swapped==null&&at>DUR/2){await sleep((DUR/2-t)*1000);t=DUR/2;swapped=await p.evaluate(()=>window.__vidSwap())}await sleep((at-t)*1000);t=at;did.push([at,w,await lean(w)])}
 await sleep((DUR-t)*1000);
 const vid=p.video();await ctx.close();await b.close();const webm=await vid.path();
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(Math.max(0,tReady-0.2)),'-i',webm,'-t',String(DUR),'-c:v','libx264','-preset','slow','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','-an',OUT]);
 const pr=cp.execFileSync('ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=codec_name,width,height:format=duration','-of','json',OUT]).toString();
 console.log(JSON.stringify({out:OUT,info,tReady,leans:did,swapped,errs,probe:JSON.parse(pr)}));process.exit(errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
