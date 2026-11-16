/* D29 (review/schedules3): a save made on a build WITHOUT j95 (origin/main) loads on this build, the record is built on the first
   render, and 12 buổi play with no page error, no J95/J95B/J95C error and a clean self-check.
   usage: node dev/test/roster_oldsave.js <baseURL> <oldPage> <newPage>   (same origin, pages wrap dev/index.html with <meta charset=utf-8>) */
const {chromium}=require('playwright');const [,,BASE,OLD,NEW]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const out={};
 const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();const e0=[];p.on('pageerror',e=>e0.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(BASE+OLD);await sleep(2500);
 const save=await p.evaluate(async()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;render();await new Promise(r=>setTimeout(r,400));
  for(let i=0;i<8;i++){for(let k=0;k<30&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}nextBuoi()}for(let k=0;k<30&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}
  save();const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return{o,had:typeof j95on==="function",turn:S.turn+"/"+S.tuan+"/"+S.buoi}});
 out.old={hadJ95:save.had,turn:save.turn,errs:e0.slice(0,3)};await ctx.close();
 for(const [w,h] of [[755,1000],[1180,820]]){const c=await b.newContext({viewport:{width:w,height:h}});await c.addInitScript(o=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.clear();for(const k in o)localStorage.setItem(k,o[k])}},save.o);
  const q=await c.newPage();const pe=[];q.on('pageerror',e=>pe.push(e.message));await q.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());await q.goto(BASE+NEW);await sleep(2500);
  const r=await q.evaluate(async()=>{const d=loadSlot(3);if(!d)return{loaded:false};SLOT=3;quiet=true;d.tab="act";deser(d);quiet=false;document.getElementById("title").hidden=true;deal();render();const ok=true;await new Promise(r=>setTimeout(r,400));const R0=!!(S.roster&&S.roster.key===j95key());const t0=S.turn+"/"+S.tuan+"/"+S.buoi;
   const bad=[];for(let i=0;i<12;i++){for(let k=0;k<30&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}nextBuoi();const t=j95table();if(!t.ok)bad.push(JSON.stringify({dup:t.dup,miss:t.miss,mm:t.mapMismatch}).slice(0,200))}
   return{loaded:ok!==false,t0,recordOnLoad:R0,bad:bad.slice(0,3),j95:J95.errs,j95b:J95B.errs,j95c:J95C.errs,total:S.roster&&Object.keys(S.roster.P).length}});
  out[w+'x'+h]=Object.assign(r,{pageErrors:pe.slice(0,3)});await c.close()}
 console.log(JSON.stringify(out,null,1));await b.close()})();
