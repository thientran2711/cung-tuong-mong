/* OB-KIEP (owner 25/11 ~22:40Z: emotion seals popping on «Thân phận kiếp này»; law 11 whole family) — KIT §38.4 lean.nonPlay scan.
   Counts the big seal clones (img.kemo-big = the lean / pop) that appear on every NON-PLAY screen: title home, the Luân hồi roulette,
   the identity card (+ its face picker), then in PLAY (the room after «Nhận thân phận», no dialog) as the control (leans must still happen there).
   usage: node dev/test/emoseal-nonplay-scan.js <url> <WxH> [secondsPerScreen=20] [--fail]   (exit 1 with --fail when a non-play screen leans) */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));
const [,,PURL,SZ='1180x820',SEC='20',FLAG]=process.argv;
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const [W,H]=SZ.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block'});
 await ctx.route('**/*',rt=>{const h=rt.request().headers();if(h['x-ctm-load'])return rt.abort();return rt.fallback()});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(PURL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});
 await p.evaluate(()=>{window.__lean=0;new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType===1&&(n.matches('.kemo-big')||n.querySelector&&n.querySelector('.kemo-big')))window.__lean++}).observe(document.body,{childList:true,subtree:true})});
 const watch=async(name)=>{await p.evaluate(()=>{window.__lean=0});await sleep(+SEC*1000);const r=await p.evaluate(()=>({lean:window.__lean,seals:document.querySelectorAll('img.kemo').length}));return Object.assign({screen:name},r)};
 const R=[];
 R.push(await watch('title'));
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 for(let i=0;i<40;i++){if(await p.evaluate(()=>!!document.querySelector('#kroul')))break;await sleep(300)}
 R.push(await watch('roulette'));
 for(let i=0;i<80;i++){const ok=await p.evaluate(()=>{const s=document.querySelector('#kroul .krskip');if(s)s.click();const M=document.getElementById('modal');return !document.querySelector('#kroul')&&!!(M&&!M.hidden&&M.querySelector('.kpick'))});if(ok)break;await sleep(400)}
 R.push(await watch('identity card + face picker'));
 await p.evaluate(()=>{const e=document.querySelector('#modal .kpick');if(e)e.scrollIntoView({block:'center'})});R.push(await watch('identity card, face picker in view'));
 await p.evaluate(()=>{const x=document.querySelector('#modal button[data-nl=ok]');x&&x.click()});await sleep(4000);
 for(let i=0;i<12;i++){await p.evaluate(()=>{try{if(typeof closeModal==='function'&&!document.getElementById('modal').hidden){const m=Q[0];if(m&&m.opts&&m.opts.length){const bt=document.querySelector('#modal .opts button:not([disabled])');bt&&bt.click()}else closeModal()}}catch(e){}});await sleep(600)}
 R.push(await watch('PLAY (control)'));
 console.log(`KIT §38.4 emotion-seal non-play scan @${SZ} (${SEC}s per screen)`);R.forEach(r=>console.log(`  ${r.screen.padEnd(36)} leans ${r.lean} · seals ${r.seals}`));if(errs.length)console.log('ERR',errs.slice(0,4));
 await b.close();if(FLAG==='--fail'&&R.slice(0,4).some(r=>r.lean))process.exit(1)})();
