/* sw-norosy.js <url> : after load the service worker caches fig/por pictures under ?h=<md5/16> of assets.json (no stale rosy copy).
   Checks every cached img URL ?h= against assets.json, and that a changed picture is served with the new hash. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,hasTouch:true,isMobile:true,serviceWorkers:'allow',ignoreHTTPSErrors:true});
 await c.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await c.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500);await p.addStyleTag({content:'.kmov{display:none!important}'});
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;quiet=true;S.rank=5;S.bac=300;fillStaff(S,true);S.buoi=0;used=0;tab='act';goTo('home');render();quiet=false;render()});
 await sleep(4000);
 for(const t of ['Hậu cung','Giao tình','Hoàng tự']){await p.evaluate(t=>{const x=[...document.querySelectorAll('#tabs button, .tabs button, nav button')].find(e=>e.offsetParent!==null&&e.textContent.trim()===t);if(x)x.click()},t);await sleep(4000)}
 await sleep(6000);
 const ctl=await p.evaluate(()=>navigator.serviceWorker.getRegistration().then(r=>!!(r&&r.active)));
 const man=JSON.parse(fs.readFileSync(OUT+'/assets.json','utf8'));const H={};for(const f of man.files)H[f[0]]=f[1];
 const r=await p.evaluate(async()=>{const ks=await caches.keys();const out={keys:ks,urls:[]};for(const k of ks){if(!/assets/.test(k))continue;const c=await caches.open(k);out.urls=(await c.keys()).map(q=>q.url)}return out});
 const img=r.urls.filter(u=>/\/img\/(hd\/|tn\/)?(fig|por)-/.test(u));let ok=0,stale=[],unk=0;
 for(const u of img){const m=/\/(img\/[^?]+)\?h=([0-9a-f]+)/.exec(u);if(!m){unk++;continue}if(H[m[1]]===m[2])ok++;else stale.push(u)}
 console.log(JSON.stringify({swActive:ctl,caches:r.keys,cachedImgFigPor:img.length,hashMatchesAssetsJson:ok,noHash:unk,staleHash:stale.slice(0,5),staleN:stale.length,errs}));
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
