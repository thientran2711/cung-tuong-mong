/* review/kit-fig2 r8 — LUẬT SỬA CẢ NHÓM "a game overlay that never closes" (owner/coordinator 11/15; the news-face-real.js driver had to
   force-hide #ov and drop S.mg). Every opener of #ov is run the way a player does it: only VISIBLE buttons are pressed (intro "Để trời
   định" / the skip, then the result button or the kit ✕). After each path: #ov hidden, no game panel left in #ov, S.mg cleared, #mgskip
   hidden (the j5 lesson panel's controls exist only while a j5 game is up), the result applied once.
   Openers: lessons (Tự học / Học với thầy / Xin Thái hậu cho học cùng) for every art, practice (mastered art), resume after load (S.mg in
   the save, with and without mode), a j5 lesson game directly, playArt, a festival contest (startContest), Chải chuốt (wdGroomUI).
   usage: node dev/test/overlay-close.js <url> [outjson]  — prints a table: opener · path · ok/fail · what was left */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome'});const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.route(/^https?:\/\//,r=>/127\.0\.0\.1|localhost/.test(r.request().url())?r.continue():r.abort());
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:0});await new Promise(r=>setTimeout(r,1500));
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;render()});
 const R=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const ov=document.getElementById('ov');const out=[];
  const vis=()=>[...ov.querySelectorAll('button')].filter(x=>x.offsetParent);
  /* a player: intro → the skip ("Để …"), result → the result button or ✕; at most 8 taps */
  const play=async()=>{let taps=0;for(;taps<8&&!ov.hidden;taps++){const V=vis();const sk=V.find(x=>/^(Để|Học nhanh)/.test((x.textContent||'').trim()))||V.find(x=>/skip/.test(x.id));
    const ok=V.find(x=>/ok$/.test(x.id))||V.find(x=>x.classList.contains('kit-x'));const t=sk||ok||V[V.length-1];if(!t)break;t.click();await W(160)}return taps};
  const left=()=>{const L=[];if(!ov.hidden)L.push('#ov visible');if(document.getElementById('kg82'))L.push('#kg82 left');if(S.mg)L.push('S.mg='+JSON.stringify(S.mg).slice(0,60));
   const sk=document.getElementById('mgskip');if(sk&&!sk.hidden)L.push('#mgskip shown');const ok=document.getElementById('mgok');if(ok)L.push('stale #mgok');if(Q.length&&/làm ra tác phẩm/.test(Q[0].t||''))L.push('product dialog left');return L};
  const reset=()=>{Q.length=0;document.getElementById('modal').hidden=true;used=0;S.suc=100;S.bac=900;S.th=80;S.buoi=0;S.thDead=false;S.mg=null;window.__aaPend=null};
  const run=async(name,fn)=>{reset();let err='';try{await fn()}catch(e){err=e.message}await W(250);
   if(Q.length&&Q[0].opts&&/làm ra tác phẩm/.test(Q[0].t||'')){chooseM(0);await W(300)}
   /* main j83-variety (f6d80ae65): a lesson first asks "Học X: làm gì?" (kind picker, kbtn kshgo: a player taps the first open "Làm"),
      then "…: dùng vật liệu gì?" (first material) */
   for(let st=0;st<3&&ov.hidden&&!document.getElementById('modal').hidden;st++){const g=[...document.querySelectorAll('#modal button.kshgo')].find(b=>b.offsetParent&&!b.disabled&&/^Làm/.test(b.innerText.trim()));
    if(g)g.click();else if(Q.length&&Q[0].opts&&/làm gì\?|vật liệu gì\?/.test(Q[0].t||''))chooseM(0);else break;await W(400)}
   const opened=!ov.hidden;const taps=await play();await W(300);const L=left();out.push({name,opened,taps,ok:opened&&!L.length&&!err,left:L.join(', '),err})};
  for(const a of ARTS){for(const mode of ['self','teacher','th']){S.arts[a.k]=Math.min(S.arts[a.k]||0,3);await run(`lesson ${a.k} ${mode}`,()=>lessonMode(a.k,mode))}}
  for(const a of ARTS.slice(0,3)){await run(`resume ${a.k} (old save, no mode)`,()=>{S.mg={k:a.k,l:1};resumeMG()});await run(`resume ${a.k} self+wk`,()=>{S.mg={k:a.k,l:1,mode:'self',wk:{kind:WDEF[a.k],mat:0}};resumeMG()})}
  await run('j5 lesson game (no playArt)',()=>{const pa=playArt;playArt=undefined;try{S.mg={k:'cam',l:1};resumeMG()}finally{playArt=pa}});
  await run('playArt',()=>playArt({art:'cam',title:'Thử',onDone:()=>{window.__pa=(window.__pa||0)+1}}));
  await run('contest (startContest)',()=>startContest({art:'cam',artName:'Cầm',title:'Thử hội',rivals:liveRivals(true).slice(0,3).map(v=>({id:v.id,name:v.name,face:pv(v),score:5,talent:5,prep:0,luck:0})),prep:0,talent:5,talentBy:'',luck:3,onDone:()=>{window.__ct=(window.__ct||0)+1}}));
  if(typeof wdGroomUI==='function')await run('Chải chuốt (wdGroomUI)',()=>wdGroomUI());
  /* the old j5 result button must never be pressed again: j5 lesson, then a kg82 game whose result is closed with Esc (kitCloseLayer → kitOvBtn) */
  {reset();const pa=playArt;playArt=undefined;try{S.mg={k:'ky',l:1};resumeMG()}finally{playArt=pa}await W(200);await play();await W(200);const p0=S.artp.ky,l0=S.arts.ky;const n0=window.__pa||0;
   playArt({art:'cam',title:'Thử',onDone:()=>{window.__pa=(window.__pa||0)+1}});await W(200);const sk=vis().find(x=>/^Để/.test((x.textContent||'').trim()));if(sk)sk.click();await W(300);
   document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await W(400);const L=left();const again=S.artp.ky!==p0||S.arts.ky!==l0;
   out.push({name:'j5 then kg82, Esc at result',opened:true,taps:2,ok:!again&&(window.__pa||0)===n0+1&&!L.length,left:(again?'old j5 lesson applied AGAIN ':'')+((window.__pa||0)===n0+1?'':'kg82 result not applied ')+L.join(', '),err:''})}
  return{rows:out,pa:window.__pa||0,ct:window.__ct||0}});
 const bad=R.rows.filter(r=>!r.ok);console.log(R.rows.map(r=>`${r.ok?'ok  ':'FAIL'} ${r.name.padEnd(34)} opened:${r.opened} taps:${r.taps} ${r.left}${r.err?' err:'+r.err:''}`).join('\n'));
 console.log(JSON.stringify({total:R.rows.length,fail:bad.length,playArtDone:R.pa,contestDone:R.ct,errs:errs.slice(0,5)}));if(OUT)fs.writeFileSync(OUT,JSON.stringify({R,errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
