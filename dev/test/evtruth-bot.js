/* TRUE-EVIDENCE BOT (review/evidence-truth, owner 15/11 "người chơi an toàn … không hại ai thì có bị thu thập chứng cứ không?")
   A CLEAN player (the sensible bot of dev/measure/inpage4.js, plus: never takes a card / talk / event choice that costs Đức or reads as a
   wrong, never schemes) plays N lives of 2 in-game years (24 months) each. Reported per life and in total:
     deedsMe      wrongs in her own ledger (must be 0 for a clean life; any entry is listed so the bot filter can be fixed)
     evOnMe       TRUE evidence any consort holds on her at the end (must be 0 when deedsMe = 0)
     rumOnMe      rumours held on her (must be 0 in a new life: rumours only come from old saves)
     spyOnMe      times someone spied on her and found nothing (harmless knowledge only)
     missMe       evidence pieces asked for against her but refused because she did nothing
     framesMe / framesMeClear   frame-ups against her, and how many she cleared
     frames / framesClear       all frame-ups in the court (NPC-vs-NPC included) and how many were cleared
     swept        evidence that bypassed evA and was turned into rumour by the sweep (should be 0)
     npcBad       pairs where a consort holds more true evidence than the target's real wrongs (must be 0)
   usage: NODE_PATH=$(npm root -g) node dev/test/evtruth-bot.js http://127.0.0.1:PORT/index.html [lives=6] [seed=1] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,NL,SEED]=process.argv;const LIVES=+NL||6;const seed=+SEED||1;
let INP=fs.readFileSync(path.join(__dirname,'..','measure','inpage4.js'),'utf8');
for(const h of ['function scoreAct(a,N,cost){','function talkScore(t,N){const{p,a}=t;']){if(!INP.includes(h))throw new Error('inpage4 hook moved: '+h);
 INP=INP.replace(h,h+'if(window.__cleanBad&&window.__cleanBad(a))return -1e9;')}
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=1500']});
 const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.addInitScript(([sd])=>{let s=sd*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},[seed]);
 await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.origin,null,{timeout:120000});
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove())});
 await p.evaluate(INP);
 await p.evaluate(()=>{
  /* CLEAN: the bot never does a wrong. Cards / talks / choices that cost Đức, or whose text names a wrong, are refused. */
  const WRONG=/độc|xạ hương|vu |vu oan|cài đồ|giá họa|đẩy|trù ẻo|bùa|tư thông|đưa tình|liếc mắt|hẹn|mua chuộc|đút lót|hối lộ|đồ cấm|chợ đen|tung tin|ly gián|ngáng|uy hiếp|ép nộp|phóng hỏa|thú dữ|hủy dung|diệt khẩu|giả mang thai|mật thư|trộm|lục rương|lục lọi|nhận quà|thư tình|tráo/i;
  window.__wrong=WRONG;
  window.__cleanBad=a=>!!a&&(WRONG.test(a.n||'')||(a.c&&a.c.duc<0)||(a.w&&a.w.duc<0));
  /* event choices: drop the options that cost Đức or name a wrong (the rest go to the sensible chooser) */
  const pm=pushModal;pushModal=function(m){try{if(m&&m.opts&&m.opts.length>1){const ok=m.opts.filter(o=>!((o.fx&&o.fx.duc<0)||WRONG.test(o.n||"")||/chứng cứ của ngươi|nắm 1 chứng cứ của ngươi/.test(o.x||"")));if(ok.length&&ok.length<m.opts.length){m.__all=m.opts;m.opts=ok}}}catch(e){}return pm.apply(this,arguments)};
  /* the sensible bot can loop on a place whose entry dialog it keeps refusing (e.g. "Ra ngoài khi mặc trung y?"): 3 tries per place per buổi */
  {const g0=goTo;goTo=function(k){const bk=S.turn+"_"+S.tuan+"_"+S.buoi+"_"+k;window.__goN=window.__goN||{};if((window.__goN[bk]=(window.__goN[bk]||0)+1)>3)return;return g0.apply(this,arguments)}}
  window.__T={lives:[]};
  window.__lifeStats=function(){const me=S;const L=liveRivals(true);let evOn=0,rumOn=0,npcBad=0;
   for(const v of L){evOn+=evG(v,S);rumOn+=rumG(v,S);for(const t of L){if(t!==v&&evG(v,t)>deedCap(t))npcBad++}if(evG(S,v)>deedCap(v))npcBad++}
   const dm=deedsOf(S);return{turn:S.turn,rank:S.rank,dead:!!S.dead,deedsMe:dm.length,deedKinds:dm.map(d=>d.k+":"+d.x).slice(0,6),evOnMe:evOn,rumOnMe:rumOn,
    missMe:window.__evMissMe||0,spyOnMe:window.__spyMe||0,spyOnMeFound:window.__spyMeFound||0,framesMe:window.__framesMe||0,framesMeClear:window.__framesMeClear||0,
    frames:window.__frames||0,framesClear:window.__framesClear||0,swept:window.__evSwept||0,frTryMe:window.__frTryMe||0,frTryN:window.__frTryN||0,npcBad,npcDeeds:L.reduce((a,v)=>a+deedsOf(v).length,0),
    npcEvHeld:L.reduce((a,v)=>a+L.reduce((b,t)=>b+(t!==v?evG(v,t):0),0)+evG(S,v),0)}};
  window.__lifeReset=function(){for(const k of ["__evMissMe","__evMiss","__spyMe","__spyMeFound","__framesMe","__framesMeClear","__frames","__framesClear","__evSwept","__frTryMe","__frTryN"])window[k]=0};
  {const r0=runAct;runAct=function(a,t,k){if(t===S&&a!==S&&(k==="frame"||k==="plant"))window.__frTryMe=(window.__frTryMe||0)+1;if(t!==S&&a!==S&&k==="frame")window.__frTryN=(window.__frTryN||0)+1;return r0.apply(this,arguments)}}
  const sf=spyFind;spyFind=function(a,t){const r=sf.apply(this,arguments);if(t===S){window.__spyMe=(window.__spyMe||0)+1;if(!/không tìm ra/.test(r))window.__spyMeFound=(window.__spyMeFound||0)+1}return r};
 });
 const out=[];const t0=Date.now();let guard=0;
 while(out.length<LIVES&&guard<4000){guard++;
  const st=await p.evaluate(()=>{for(let i=0;i<200;i++){window.__bot.step('sens',1);if(S&&S.turn>=24&&!S.dead&&!Q.length)return'done';if(S&&S.dead)return'dead'}return'run'});
  if(guard%5===0)console.error('tick',guard,JSON.stringify(await p.evaluate(()=>({t:S.turn,tu:S.tuan,b:S.buoi,q:Q.length,qt:Q[0]&&Q[0].t,qo:Q[0]&&Q[0].opts&&Q[0].opts.length,mg:!!S.mg,ov:!document.getElementById('ov').hidden,out:S.out,conf:S.confined,dead:S.dead,used:typeof used!=='undefined'?used:null,acts:JSON.stringify(window.__acts).slice(0,300),modal:!document.getElementById('modal').hidden}))));
  if(st!=='run'){const r=await p.evaluate(()=>{const x=window.__lifeStats();window.__lifeReset();start();return x});r.end=st;out.push(r);console.error('life',out.length,JSON.stringify(r),Math.round((Date.now()-t0)/1000)+'s')}}
 const sum=k=>out.reduce((a,r)=>a+(r[k]||0),0);
 const clean=out.filter(r=>r.deedsMe===0);
 const T={lives:out.length,cleanLives:clean.length,months:sum('turn'),evOnMe_clean:clean.reduce((a,r)=>a+r.evOnMe,0),rumOnMe:sum('rumOnMe'),missMe:sum('missMe'),spyOnMe:sum('spyOnMe'),spyOnMeFound_clean:clean.reduce((a,r)=>a+r.spyOnMeFound,0),
  framesMe:sum('framesMe'),framesMeClear:sum('framesMeClear'),frames:sum('frames'),frTryMe:sum('frTryMe'),frTryN:sum('frTryN'),framesClear:sum('framesClear'),swept:sum('swept'),npcBad:sum('npcBad'),npcDeeds:sum('npcDeeds'),npcEvHeld:sum('npcEvHeld'),errors:errs.length};
 console.log(JSON.stringify({total:T,lives:out,errs:errs.slice(0,8)},null,1));await b.close()})();
