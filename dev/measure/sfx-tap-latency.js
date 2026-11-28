/* sfx-tap-latency (review/sfx-instant, OD 24/11 ~18:05Z item 2): tap → sound latency in a mini-game (Múa, steps engine: 4 arrows).
   Real gesture policy (NO autoplay flag): the AudioContext only unlocks on a trusted touch, like on the phone.
   Files are served from the repo root by route interception (no server); audio/*.mp3 get an extra delay (phone SW/disk read) — default 150 ms.
   Per tap we record the pointerdown time and the start of every tap sound (WebAudio source.start or <audio> 'playing'); latency = first sound − tap.
   usage: node dev/measure/sfx-tap-latency.js <repo root> [WxH=755x1000] [cpu=1] [audioDelayMs=150] [before index.html]
   prints JSON: per tap {i, gapMs, lat (ms, null = silent), n (sounds started), drops}; summary {first, rapid, silent}. */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,ROOT,SZ='755x1000',CPU='1',AD='150',IDX='']=process.argv;/* IDX = another built index.html (the BEFORE build) */const [W,H]=SZ.split('x').map(Number);
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.webmanifest':'application/manifest+json'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:true,deviceScaleFactor:1,serviceWorkers:'block'});
 await ctx.route('http://g.test/**',async r=>{const u=new URL(r.request().url());let f=path.join(ROOT,decodeURIComponent(u.pathname));if(u.pathname==='/')f=path.join(ROOT,'index.html');if(/\/index\.html$/.test(u.pathname)&&IDX)f=IDX;
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  if(/\.mp3$/.test(f))await new Promise(o=>setTimeout(o,+AD));
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[path.extname(f)]||'application/octet-stream'}})});
 await ctx.route(/^https?:\/\/(?!g\.test)/,r=>r.fulfill({status:404,body:''}));
 await ctx.addInitScript(()=>{const T=window.__TL={taps:[],snd:[]};
  document.addEventListener('pointerdown',e=>{if(e.isTrusted)T.taps.push(performance.now())},{capture:true});
  const st=AudioBufferSourceNode.prototype.start;AudioBufferSourceNode.prototype.start=function(){try{if(this.buffer&&this.buffer.length>64)T.snd.push({t:performance.now(),k:'web'})}catch(e){}return st.apply(this,arguments)};
  const pl=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){const a=this;if(/sfx-/.test(a.src||''))a.addEventListener('playing',()=>T.snd.push({t:performance.now(),k:'html',src:(a.src||'').slice(-24)}),{once:true});return pl.apply(this,arguments)}});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('http://g.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitSfx==='function'&&typeof kg82Play==='function');await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}OPT.snd=true;OPT.mute=false;OPT.sfx=.7;saveOpt();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await p.waitForTimeout(300);const s=await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;try{nlNew()}catch(e){}start()}return s});if(!s)break}
 await p.evaluate(()=>{document.querySelectorAll('.kroul,#kroul').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;tab='go';render()});
 if(+CPU>1){const c=await ctx.newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:+CPU})}
 /* her first touch of the session (anywhere, e.g. the top bar), then she walks to the mini-game */
 await p.touchscreen.tap(Math.round(W/2),40);await p.waitForTimeout(900);
 await p.evaluate(()=>{kg82Open({art:'Thử tay',title:'t',how:''});KG82.noDemo=true;kg82Play('mua',()=>{})});
 await p.waitForTimeout(9000);/* the demo shows the steps, then her turn */
 const bx=await p.evaluate(()=>{const c=document.querySelector('.kgbox canvas,.kg82cv');const r=c.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height}});
 const D=Math.min(bx.w,bx.h)*.31,ARW=[[bx.w/2,bx.h/2-D],[bx.w/2-D,bx.h/2],[bx.w/2+D,bx.h/2],[bx.w/2,bx.h/2+D]].map(([x,y])=>[Math.round(bx.x+x),Math.round(bx.y+y)]);
 /* tap plan: first tap, then 2 fast (120 ms), pause, then 5 rapid (90 ms), pause, then 2 slow */
 const GAPS=[0,120,120,900,90,90,90,90,1200,700];const n0=await p.evaluate(()=>({t:__TL.taps.length,s:__TL.snd.length,d:KSFX.drop.length}));
 for(let i=0;i<GAPS.length;i++){if(GAPS[i])await p.waitForTimeout(GAPS[i]);const [x,y]=ARW[i%4];await p.touchscreen.tap(x,y)}
 await p.waitForTimeout(1500);
 const R=await p.evaluate(n0=>{const taps=__TL.taps.slice(n0.t),snd=__TL.snd.slice(n0.s);return{taps,snd,log:KSFX.log.filter(x=>x.t>=taps[0]-2),drops:KSFX.drop.filter(x=>x.t>=taps[0]-2)}},n0);
 /* tap sounds only (the stroke + the note / miss / hit word of the Múa engine); web = buffer started inside sfx() (sync); html = the <audio> 'playing' event */
 const TAP=/^sfx-(step|mg-|item-pop|tap)/;
 const rows=R.taps.map((t,i)=>{const nx=R.taps[i+1]||t+1e9;const L=R.log.filter(x=>TAP.test(x.n)&&x.t>=t-2&&x.t<nx);const Dr=R.drops.filter(x=>TAP.test(x.n)&&x.t>=t-2&&x.t<nx);
  const lat=L.map(x=>{if(x.w)return Math.max(0,x.t-t);const h=R.snd.find(y=>y.k==='html'&&!y.used&&y.t>=x.t-1&&x.n.endsWith(y.src.replace('.mp3','').split('/').pop().replace(/^.*?(sfx-)/,'$1'))||(y.k==='html'&&!y.used&&y.t>=x.t-1&&y.src.includes(x.n)));if(h){h.used=1;return Math.round(h.t-t)}return null});
  const heard=lat.filter(v=>v!=null);return{i:i+1,gapMs:GAPS[i],lat:heard.length?Math.round(Math.min(...heard)):null,played:L.map((x,j)=>x.n.replace('sfx-','')+(x.w?'@web':'@html')+'+'+Math.round(x.t-t)+(lat[j]==null?'(never)':'')).join(' '),dropped:Dr.map(x=>x.n.replace('sfx-','')+':'+x.why).join(' ')}});
 const H2=rows.filter(r=>r.lat!=null);
 const out={size:SZ,cpu:+CPU,audioDelay:+AD,rows,errs,summary:{firstLat:rows[0]&&rows[0].lat,silentTaps:rows.filter(r=>r.lat==null).length,dropped:rows.reduce((a,r)=>a+(r.dropped?r.dropped.split(' ').length:0),0),maxLat:H2.length?Math.max(...H2.map(r=>r.lat)):null,meanLat:H2.length?Math.round(H2.reduce((a,r)=>a+r.lat,0)/H2.length):null}};
 console.log(JSON.stringify(out));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
