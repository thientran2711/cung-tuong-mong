/* review/kit-figure-mood: the mood seal beside the head of every interactable full-body figure (KIT 28.8d, dev/build/jfigseal.js).
   usage: node dev/test/seal-say.js <W>x<H>@dpr <outdir> [dev/index.html]
   Starts a life, sets known moods on the people, shoots the room stage, a place view and an event dialog, and checks per figure: seal inside the stage/dialog,
   seal not over the face (head centre), seal size within min..max and ~ body height, seal beside (not above) the head. Prints a JSON table. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,SZ,OUT,PAGE]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MIME={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png',css:'text/css'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:process.env.MOTION?'no-preference':'reduce',serviceWorkers:'block'});
 await ctx.route('**/*',async r=>{const u=new URL(r.request().url());
  if(process.env.FAKE&&/\/img\/kit\/emo-(anim|fx)\/gian\.webp$/.test(u.pathname)){const rr=await r.fetch({url:r.request().url().replace(/emo-(anim|fx)\/gian/,'emo-gian')});return r.fulfill({response:rr})}
  if(u.host!=='em.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://em.local/'+(PAGE||'dev/index.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 const clean=()=>p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true});
 await clean();
 await p.evaluate(()=>{S.emo={k:'gian',v:70,why:'thử',t:null,w:0};S.emp.emo={k:'gian',v:70,why:'bị quần thần can gián',t:null,w:0};(S.nightLog=S.nightLog||[]).push(typeof emoW==='function'?emoW():0);
  S.met=S.met||{};const ks=['ghen','vui','buon','so','muu'];rivals.slice(0,5).forEach((v,i)=>{S.met[v.id]=1;try{k61Meet(v,'gặp',3)}catch(e){}v.emo={k:ks[i%5],v:60,why:'thử',w:0}});
  for(const m of (S.men||[]).slice(0,3)){try{k61Meet(m,'gặp',3)}catch(e){}m.emo={k:'so',v:60,why:'thử',w:0}}try{k61Meet(S.emp,'gặp',3)}catch(e){}});
 if(process.env.GIAN3)await p.evaluate(b=>{KIT_EMOSEAL.anim=b},process.env.GIAN3);
 const R={};
 /* seal-lean x K-HEAD-SAY (ROOT-69): the big seal never covers a say bubble, whatever happens first.
    A: a bubble is open, then the seals are forced to lean (must wait).  B: a seal is leaning, then a bubble opens (the lean must end first).  C: a mood change under an open bubble.
    rAF-sampled for the whole run: frames where any .kemo-big box overlaps an OPEN bubble box (must be 0). */
 await p.evaluate(()=>{window.__O={frames:0,over:0,leanFrames:0,bubFrames:0,worst:null};
  (function tick(){const bs=[...document.querySelectorAll('.ksay-lay>.khead.ksay:not(.kout)')].filter(b=>b.style.visibility!=='hidden'&&b.getClientRects().length).map(b=>b.getBoundingClientRect());
   const cs=[...document.querySelectorAll('.kemo-big')].map(c=>c.getBoundingClientRect());window.__O.frames++;if(bs.length)window.__O.bubFrames++;if(cs.length)window.__O.leanFrames++;
   for(const c of cs)for(const b of bs){if(c.left<b.right&&c.right>b.left&&c.top<b.bottom&&c.bottom>b.top){window.__O.over++;window.__O.worst=[Math.round(c.left),Math.round(c.top),Math.round(c.width),Math.round(b.left),Math.round(b.top),Math.round(b.width)]}}
   requestAnimationFrame(tick)})()});
 const stage=()=>p.evaluate(()=>{const st=document.getElementById('stage');const figs=[...st.querySelectorAll('#mefig,#tokens .tok.fig img.figimg')].filter(f=>f.getClientRects().length);return{ok:!!st,figs:figs.length}});
 R.stage=await stage();
 const say=txt=>p.evaluate(txt=>{const st=document.getElementById('stage');const figs=[...st.querySelectorAll('#tokens .tok.fig img.figimg,#mefig')].filter(f=>f.getClientRects().length);const out=[];for(const f of figs){const q=kitSay(st,f,txt,{ms:5000});out.push(!!q)}return out},txt);
 const leanAll=()=>p.evaluate(()=>{const s=[...document.querySelectorAll('img.kfseal.kemo-live')];s.forEach(e=>{e.__ln&&clearTimeout(e.__ln);try{window.kitEmoSeal.lean(e,true)}catch(x){}});return s.length});
 await p.waitForTimeout(2500);
 R.A_say=await say('Bái kiến Hoàng hậu nương nương, chúc người vạn phúc kim an.');await p.waitForTimeout(400);R.A_forcedLeans=await leanAll();await p.waitForTimeout(6500);
 R.A=await p.evaluate(()=>({...window.__O}));
 await p.evaluate(()=>{window.__O.over=0;window.__O.leanFrames=0;window.__O.bubFrames=0});
 R.B_leanFirst=await leanAll();await p.waitForTimeout(1500);R.B_leaning=await p.evaluate(()=>document.querySelectorAll('.kemo-big').length);
 R.B_say=await say('Hôm nay trời đẹp, thiếp xin được hầu chuyện cùng nương nương một lát.');await p.waitForTimeout(7000);
 R.B=await p.evaluate(()=>({...window.__O,leansNow:document.querySelectorAll('.kemo-big').length}));
 await p.evaluate(()=>{window.__O.over=0;window.__O.leanFrames=0;window.__O.bubFrames=0});
 R.C_say=await say('Thiếp có đôi lời muốn thưa riêng.');await p.waitForTimeout(500);
 await p.evaluate(()=>{const e=document.querySelector('img.kfseal');if(e&&e.__fig){const q=kfsPerson(e.__fig);if(q){q.emo={k:'khoc',v:70,why:'thử',t:null,w:0};kitFigSeal(e.__fig)}}});await p.waitForTimeout(500);R.C_forced=await leanAll();await p.waitForTimeout(6500);
 R.C=await p.evaluate(()=>({...window.__O}));
 R.pass=R.A.over===0&&R.B.over===0&&R.C.over===0&&R.A.bubFrames>0&&R.B.bubFrames>0;
 await p.screenshot({path:`${OUT}/say-${W}x${H}.jpg`,type:'jpeg',quality:72});
 console.log(JSON.stringify({W,H,...R,errs},null,1));await b.close()})();
