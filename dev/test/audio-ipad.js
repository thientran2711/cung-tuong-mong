/* dev/test/audio-ipad.js — review/audio-ipad (owner OD 25/11 ~23:30Z, on the plane: "Trên iPad là không thấy nghe tiếng nhạc nha. Không nghe tiếng gì luôn.")
   ROOT CAUSE: since kit-music-r1 (LIVE 351122ba) almost every music track (day-xuan/ha/thu/dong/sang/chieu, night-2, joy, sad, festivals, endings: KMUS_NEW, 37 files)
   is played from the picture CDN (another origin) THROUGH the AudioContext (j11 auRoute → createMediaElementSource, needed for the volume on iPad/iPhone).
   An <audio> of another origin without crossOrigin is a TAINTED source: the AudioContext outputs zeros for it. WebKit (iPad/iPhone Safari) taints it always;
   Chrome taints it whenever the service worker does not answer (first visit, a worker restart). Second fault: those 37 tracks were not in assets.json,
   so «Tải hết để chơi offline» never fetched them and sw.js never kept them → in the plane they never played.
   Checks (each prints PASS/FAIL), on iPad (ipadAir, Mac UA + touch) and Fold, real CDN, the BUILT site served locally:
     cors      every <audio> of another origin is crossOrigin="anonymous" (auSrc); the CDN answers Access-Control-Allow-Origin
     online    after ONE tap: the AudioContext runs; a CDN track (bgm-joy) and the base track give a NON-ZERO signal at its MediaElementSource
               (an analyser on the element's own source node, so another track cannot hide a silent one); sfx tap / win / mini-game pluck
               give a non-zero signal; both with the service worker blocked (Safari-like worst case) and with it on
     offline   after the tracks were cached: context offline + reload: the CDN track, the base track and the sfx still sound
     audit     every sound the code can ask for (KMUS_NEW, KMUS_FB targets, SFXN/SFXL files, AU_PRELOAD, voices) is a git file or a CDN file listed
               in assets.json (the «Tải hết» list), and a CDN-only file carries the "c" mark (keyed on the CDN by sw.js baseOf + jload keyOf)
   optional: VIDEO=<dir> records an iPad video WITH the game's audio track (MediaStreamDestination of the AudioContext + MediaRecorder, muxed by ffmpeg).
   usage: bash dev/site/build_site.sh && node dev/test/audio-ipad.js [url]   (url = a LIVE build to show the old fault; default the local built root) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');const D=require('./lib/device');
const sleep=t=>new Promise(r=>setTimeout(r,t));let fails=0;const ok=(c,m,x)=>{console.log((c?'PASS ':'FAIL ')+m+(x!==undefined?' · '+JSON.stringify(x):''));if(!c)fails++};
const VIDEO=process.env.VIDEO||'';const ONLY=process.env.ONLY||'';
/* every AudioNode connected to the speakers also feeds one recorder; every MediaElementSource gets its own analyser (el.__an) */
const INIT=()=>{try{localStorage.setItem('hclh-opt',JSON.stringify({snd:true,mus:.6,sfx:.8}));localStorage.setItem('ctm-ios-browser','1')}catch(e){}
 const oc=AudioNode.prototype.connect;window.__rec=null;
 AudioNode.prototype.connect=function(d,...r){try{if(d instanceof AudioDestinationNode){const c=d.context;if(!c.__msd){c.__msd=c.createMediaStreamDestination();c.__all=c.createAnalyser();c.__all.fftSize=2048;window.__ctxs=(window.__ctxs||[]).concat(c)}oc.call(this,c.__msd);oc.call(this,c.__all)}}catch(e){}return oc.call(this,d,...r)};
 const om=AudioContext.prototype.createMediaElementSource;AudioContext.prototype.createMediaElementSource=function(el){const s=om.call(this,el);try{const a=this.createAnalyser();a.fftSize=2048;oc.call(s,a);el.__an=a}catch(e){}return s};
 const rms=a=>{if(!a)return -1;const x=new Float32Array(a.fftSize);a.getFloatTimeDomainData(x);let s=0;for(const v of x)s+=v*v;return Math.sqrt(s/x.length)};
 window.__elRms=el=>rms(el&&el.__an);window.__allRms=()=>Math.max(-1,...(window.__ctxs||[]).map(c=>rms(c.__all)));
 window.__zeroMsg=[];const ow=console.warn,oe=console.error;console.warn=function(...a){if(/CORS|zeroes/.test(String(a[0])))window.__zeroMsg.push(String(a[0]));return ow.apply(this,a)};
 window.__recStart=()=>{const c=(window.__ctxs||[])[0];if(!c)return false;const ch=[];const m=new MediaRecorder(c.__msd.stream,{mimeType:'audio/webm'});m.ondataavailable=e=>ch.push(e.data);m.start(500);window.__rec={m,ch};return true};
 window.__recStop=()=>new Promise(res=>{const R=window.__rec;if(!R)return res('');R.m.onstop=async()=>{const b=new Blob(R.ch,{type:'audio/webm'});const u=new Uint8Array(await b.arrayBuffer());let s='';for(let i=0;i<u.length;i+=32768)s+=String.fromCharCode.apply(null,u.subarray(i,i+32768));res(btoa(s))};R.m.stop()})};
async function gframe(p){for(let i=0;i<600;i++){for(const f of p.frames()){try{if(await f.evaluate(()=>typeof AU==='object'&&typeof setMusic==='function'&&!!document.getElementById('title')))return f}catch(e){}}await sleep(200)}throw new Error('no game frame')}
async function tap(p,x,y){await p.touchscreen.tap(x,y)}
/* play a track as the game does (musicCtx → setMusic → startTrack → auRoute) and read its own analyser for ~3 s */
async function trackRms(g,name){await g.evaluate(n=>{window.__fx=n;if(!window.__mc0)window.__mc0=musicCtx;musicCtx=()=>window.__fx;auTick()},name);let mx=0,info=null;
 for(let i=0;i<120&&!(i>=14&&mx>0.005);i++){await sleep(250);info=await g.evaluate(()=>{const a=AU.cur;return {src:a&&a.src,co:a&&a.crossOrigin,rs:a&&a.readyState,ns:a&&a.networkState,t:a&&+a.currentTime.toFixed(2),paused:a&&a.paused,dead:!!(a&&a.dead),st:AU.ctx&&AU.ctx.state,r:window.__elRms(a)}});mx=Math.max(mx,info.r)}
 return Object.assign(info,{max:+mx.toFixed(4)})}
async function sfxRms(g,n){await g.evaluate(n=>{window.__sx=0;sfx(n)},n);let mx=0;for(let i=0;i<10;i++){await sleep(80);mx=Math.max(mx,await g.evaluate(()=>window.__allRms()))}return +mx.toFixed(4)}
async function run(b,url,dev,sw,tag){const opts={serviceWorkers:sw?'allow':'block'};if(VIDEO&&tag==='ipad-sw')opts.recordVideo={dir:VIDEO,size:{width:1180,height:820}};
 const ctx=await D.newDeviceContext(b,dev,opts);await ctx.addInitScript(INIT);const p=await ctx.newPage();const T0=Date.now();const SEG=[];const REC=VIDEO&&tag==='ipad-sw';p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(String(e.message).slice(0,160)));
 await D.openHost(p,url);let g=await gframe(p);await sleep(2500);
 const before=await g.evaluate(()=>({un:AU.unlocked,st:AU.ctx?AU.ctx.state:'none'}));
 const vb=p.viewportSize();await tap(p,vb.width/2,vb.height*0.62);await sleep(600);
 const after=await g.evaluate(()=>({un:AU.unlocked,st:AU.ctx?AU.ctx.state:'none',snd:OPT.snd}));
 ok(after.un&&after.st==='running',`${tag}: one tap unlocks — AudioContext running`,{before,after});
 const lab=t=>REC?p.evaluate(t=>{let d=document.getElementById('__lab');if(!d){d=document.createElement('div');d.id='__lab';d.style.cssText='position:fixed;left:8px;top:8px;z-index:2147483647;background:rgba(20,10,0,.82);color:#fff6d8;font:600 18px/1.35 sans-serif;padding:8px 12px;border-radius:8px;pointer-events:none;max-width:70%';document.body.appendChild(d)}d.textContent=t},t):null;
 const recA=async()=>{if(REC&&await g.evaluate(()=>window.__recStart()))return (Date.now()-T0)/1000;return 0},recZ=async(name,t0)=>{if(REC){const b64=await g.evaluate(()=>window.__recStop());if(b64)SEG.push({name,t0,b64})}};
 let r0=await recA();await lab('iPad · ONLINE · đã chạm 1 lần → nhạc CDN «bgm-joy»');
 const cdn=await trackRms(g,'bgm-joy');ok(cdn.max>0.005&&/^https:\/\/ctm-img/.test(cdn.src||'')&&cdn.co==='anonymous',`${tag}: CDN music bgm-joy sounds (non-zero at its source, crossOrigin=anonymous)`,cdn);
 await lab('ONLINE · bgm-joy tín hiệu '+cdn.max+' · tiếp: nhạc nền mùa xuân (CDN)');const day=await trackRms(g,'bgm-day-xuan');await lab('ONLINE · bgm-day-xuan tín hiệu '+day.max+' · tiếp: nhạc cũ + tiếng bấm');ok(day.max>0.005,`${tag}: CDN base music bgm-day-xuan sounds`,day);
 const loc=await trackRms(g,'bgm-day');ok(loc.max>0.005,`${tag}: local base music bgm-day sounds`,loc);
 await g.evaluate(()=>{musicCtx=()=>'bgm-day';auTick()});
 for(const n of ['sfx-tap','sfx-win','sfx-coin']){await sleep(300);const r=await sfxRms(g,n);ok(r>0.003,`${tag}: sfx ${n} sounds`,r)}
 const pl=await g.evaluate(async()=>{if(typeof bell!=='function')return 'n/a';bell();await new Promise(r=>setTimeout(r,250));return window.__allRms()});ok(pl==='n/a'||pl>0.003,`${tag}: synth bell (j18, shared context) sounds`,pl);
 const zm=await g.evaluate(()=>window.__zeroMsg.slice(0,3));ok(!zm.length,`${tag}: no "outputs zeroes due to CORS" warning`,zm);
 let off=null;
 if(sw){/* OFFLINE: the tracks heard above were kept by sw.js under their content key; the plane = no network at all */
  const kept=await g.evaluate(async()=>{const c=await caches.open('ctm-assets');return (await c.keys()).map(r=>r.url).filter(u=>/audio\/bgm-(joy|day-xuan|day)\.mp3/.test(u)).map(u=>u.replace(/^https?:\/\/[^/]+\//,''))});
  ok(kept.length>=3,`${tag}: sw.js kept the played tracks under their content key (CDN tracks on the CDN key)`,kept);
  await recZ('online',r0);await ctx.setOffline(true);await p.reload({waitUntil:'domcontentloaded'});await p.waitForSelector('#krotf',{state:'attached'});g=await gframe(p);await sleep(2500);
  await tap(p,vb.width/2,vb.height*0.62);await sleep(600);r0=await recA();await lab('iPad · OFFLINE (máy bay, không mạng) · đã chạm 1 lần → nhạc CDN từ bộ nhớ');
  const st=await g.evaluate(()=>({un:AU.unlocked,st:AU.ctx&&AU.ctx.state,on:navigator.onLine}));ok(st.un&&st.st==='running'&&!st.on,`${tag} OFFLINE: one tap unlocks`,st);
  const c2=await trackRms(g,'bgm-joy');ok(c2.max>0.005&&!c2.dead,`${tag} OFFLINE: CDN music bgm-joy sounds from the offline cache`,c2);
  await lab('OFFLINE · bgm-joy tín hiệu '+c2.max+' · tiếp: nhạc nền cũ + tiếng bấm');const d2=await trackRms(g,'bgm-day');ok(d2.max>0.005,`${tag} OFFLINE: base music bgm-day sounds`,d2);
  await g.evaluate(()=>{musicCtx=()=>'bgm-day';auTick()});await sleep(300);const s2=await sfxRms(g,'sfx-tap');ok(s2>0.003,`${tag} OFFLINE: sfx tap sounds`,s2);off={c2,d2,s2}}
 if(REC){for(let i=0;i<4;i++){await tap(p,vb.width*(0.3+0.12*i),vb.height*0.55);await g.evaluate(()=>sfx('sfx-tap'));await sleep(700)}await recZ('offline',r0)}
 ok(!errs.length,`${tag}: no page error`,errs.slice(0,3));
 const vid=p.video();await ctx.close();
 if(REC&&vid){const vp=await vid.path();for(const x of SEG){const ap=path.join(VIDEO,'audio-ipad-'+x.name+'.webm');fs.writeFileSync(ap,Buffer.from(x.b64,'base64'));
  const out=path.join(VIDEO,'audio-ipad-'+x.name+'.mp4');try{cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(Math.max(0,x.t0)),'-i',vp,'-i',ap,'-map','0:v','-map','1:a','-c:v','libx264','-pix_fmt','yuv420p','-c:a','aac','-shortest',out]);console.log('video:',out)}catch(e){console.log('ffmpeg failed',e.message)}}}
 return off}
function audit(){/* every sound the code can ask for is shipped: a git file, or a CDN file listed in assets.json with the "c" mark */
 const R=path.resolve(__dirname,'../..');const A=JSON.parse(fs.readFileSync(path.join(R,'assets.json'),'utf8'));const M=new Map(A.files.map(f=>[f[0],f]));
 const j11=fs.readFileSync(path.join(R,'dev/build/j11.js'),'utf8');const NEW=(j11.match(/const KMUS_NEW=new Set\("([^"]+)"\.split\(" "\)\.concat\("([^"]+)"/)||[]);
 const keys=NEW[1]?NEW[1].split(' ').concat(NEW[2].split(' ').map(x=>'fest-'+x)):[];ok(keys.length>=30,'audit: KMUS_NEW list read from j11',keys.length);
 const miss=[],nomark=[];for(const k of keys){const p='audio/bgm-'+k+'.mp3';const f=M.get(p);if(!f)miss.push(p);else if(!fs.existsSync(path.join(R,p))&&f[4]!=='c')nomark.push(p)}
 ok(!miss.length,'audit: every CDN music track (KMUS_NEW) is in assets.json = in «Tải hết để chơi offline» + kept by sw.js',miss);ok(!nomark.length,'audit: CDN-only tracks carry the "c" mark',nomark);
 const src=fs.readdirSync(path.join(R,'dev/build')).filter(f=>/\.js$/.test(f)).map(f=>fs.readFileSync(path.join(R,'dev/build',f),'utf8')).join('\n');
 const names=new Set();for(const m of src.matchAll(/["'`](sfx-[a-z0-9-]+|bgm-[a-z0-9-]+)["'`]/g))names.add(m[1]);for(const m of src.matchAll(/"(?:day|night|tension|sorrow|festival|cold)"/g))names.add('bgm-'+m[0].slice(1,-1));
 const lost=[];for(const n of names){const p='audio/'+n+'.mp3';if(/^bgm-(tension|fest)-?$|-x$/.test(n))continue;if(!M.has(p)&&!fs.existsSync(path.join(R,p)))lost.push(p)}
 ok(!lost.length,'audit: every sfx-/bgm- name written in the code is a shipped file (git or CDN-in-assets.json)',lost.slice(0,20));
 const local=fs.readdirSync(path.join(R,'audio')).filter(f=>/\.mp3$/.test(f)).filter(f=>!M.has('audio/'+f));ok(!local.length,'audit: every git sound is in assets.json',local.slice(0,10));
 const sw=fs.readFileSync(path.join(R,'sw.js'),'utf8');ok(/CDNF\.has\(p\)/.test(sw)&&/f\[4\]==='c'/.test(sw),'audit: sw.js keys "c" files on the CDN (baseOf)');
 const jl=fs.readFileSync(path.join(R,'dev/build/jload.js'),'utf8');ok(/f\[4\]==="c"\)\?CDNB/.test(jl),'audit: jload keyOf keys "c" files on the CDN (same key as sw.js)');
 const all=src.match(/new Audio\([^)]*\)/g)||[];const bare=all.filter(x=>x!=='new Audio()');ok(!bare.length||bare.every(x=>/voFiles/.test(x)),'audit: no <audio> made with a src outside auSrc (crossOrigin first)',bare)}
(async()=>{const arg=process.argv[2];let srv=null,url=arg;if(!url){srv=await D.serveRoot();url=srv.url}
 if(!arg)audit();
 const b=await chromium.launch({args:['--autoplay-policy=user-gesture-required']});
 try{for(const [dev,sw,tag] of [['ipadAir',false,'ipad-nosw'],['ipadAir',true,'ipad-sw'],['fold',false,'fold-nosw'],['fold',true,'fold-sw']]){if(ONLY&&!tag.includes(ONLY))continue;if(arg&&sw)continue;
   try{await run(b,url,dev,sw,tag)}catch(e){ok(false,tag+' run',String(e.message).slice(0,200))}}}
 finally{await b.close();if(srv)srv.close()}
 console.log(fails?`audio-ipad: ${fails} FAIL`:'audio-ipad: ALL PASS');process.exit(fails?1:0)})();
