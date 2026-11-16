/* dev/test/play-leak.js — what grows while playing: live event listeners by (event type @ the line that added them), elements in the
   document by tag.class, detached nodes kept alive (CDP Nodes after GC), live intervals. Bot plays --warm buổi, snapshot, --buoi more, snapshot.
   usage: node dev/test/play-leak.js [--device fold] [--root <built site>] [--warm 4] [--buoi 16] [--top 20] */
const {chromium}=require('playwright');const path=require('path');const D=require('./lib/device');const PP=require('./lib/playperf');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]===undefined||A[i+1].startsWith('--')?true:A[i+1])};
const DEV=opt('device','fold'),WARM=+opt('warm',4),NB=+opt('buoi',16),TOP=+opt('top',20);const ROOT=path.resolve(opt('root',path.join(__dirname,'../..')));
const sleep=t=>new Promise(r=>setTimeout(r,t));
const LST=()=>{const live=new Map();window.__lst=live;const wm=new WeakMap();const ae=EventTarget.prototype.addEventListener,re=EventTarget.prototype.removeEventListener;
 const where=()=>{try{const l=String(new Error().stack).split('\n').slice(3,5).map(x=>x.trim().replace(/^at /,'').replace(/https?:\/\/[^)]*?:(\d+:\d+)/,'$1'));return l.join(' < ').slice(0,120)}catch(e){return'?'}};
 EventTarget.prototype.addEventListener=function(t,f,o){try{if(f){let m=wm.get(this);if(!m){m=new Map();wm.set(this,m)}const k=t+'|'+(typeof o==='object'&&o?!!o.capture:!!o);const kk=k+'|'+(f.__lid||(f.__lid=Math.random()));
  if(!m.has(kk)){const key=t+' @ '+where()+' on '+(this===window?'window':this===document?'document':this.nodeName||'?');m.set(kk,key);live.set(key,(live.get(key)||0)+1)}}}catch(e){}return ae.apply(this,arguments)};
 EventTarget.prototype.removeEventListener=function(t,f,o){try{const m=wm.get(this);if(m&&f){const kk=t+'|'+(typeof o==='object'&&o?!!o.capture:!!o)+'|'+f.__lid;const key=m.get(kk);if(key){m.delete(kk);live.set(key,live.get(key)-1)}}}catch(e){}return re.apply(this,arguments)}};
const SNAPL=()=>{const by={};for(const e of document.getElementsByTagName('*')){const k=e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.classList[0]?'.'+e.classList[0]:'');by[k]=(by[k]||0)+1}
 const lst={};for(const [k,v] of window.__lst)lst[k]=v;return{by,lst,iv:Object.keys(window.__pp.iv).length}};
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch({args:PP.LAUNCH_ARGS});const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'block'});
 await ctx.addInitScript(LST);await ctx.addInitScript(PP.INIT);await ctx.addInitScript(()=>{window.__bot={pre:1}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('HeapProfiler.enable');const f=await D.openHost(p,srv.url,{timeout:300000});await sleep(1500);
 await f.evaluate(PP.NEWLIFE);await sleep(2000);await f.evaluate(PP.CLEAR);
 const play=async n=>{const b0=await f.evaluate(()=>window.__buoiN||0);let g=0;while((await f.evaluate(()=>window.__buoiN||0))-b0<n&&g++<n*60){await f.evaluate(PP.STEP).catch(()=>{});await sleep(120)}await f.evaluate(PP.CLEAR);await sleep(1500)};
 const snap=async()=>{await cdp.send('HeapProfiler.collectGarbage');return Object.assign(await PP.metrics(cdp),await f.evaluate(SNAPL))};
 await play(WARM);const s0=await snap();await play(NB);const s1=await snap();
 console.log(`after ${WARM} buổi -> after ${WARM+NB}: heap ${s0.heapMB}->${s1.heapMB} MB, nodes(all incl. detached) ${s0.nodes}->${s1.nodes}, listeners ${s0.listeners}->${s1.listeners}, intervals ${s0.iv}->${s1.iv}`);
 const diff=(a,b)=>Object.keys(Object.assign({},a,b)).map(k=>[k,(b[k]||0)-(a[k]||0),b[k]||0]).filter(x=>x[1]).sort((x,y)=>y[1]-x[1]);
 console.log('-- listeners grown (key, +n, now)');diff(s0.lst,s1.lst).slice(0,TOP).forEach(x=>console.log(String(x[1]).padStart(5),String(x[2]).padStart(5),x[0]));
 console.log('-- elements in the document grown');diff(s0.by,s1.by).slice(0,TOP).forEach(x=>console.log(String(x[1]).padStart(5),String(x[2]).padStart(5),x[0]));
 console.log('errors',errs.slice(0,3));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
