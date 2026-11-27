/* review/promo-exam: KHẢO HẠCH TẤN PHONG (jexam). usage: node dev/test/promo-exam.js <url of new build> [oldBuildUrl] [outdir|-] [WxH@dpr ...]
   Logic (first size): window opens on eligibility; the act card's odds word = word(exChance); the exam frame runs every round (skip) and
   the result passes → rank +1 (edict); a forced fail → no rank, cooldown row + chip; a missed window lapses; NPC sits at the month decree
   (pass and fail, news line); a son's birth grants an exam instead of a rank; seat-full: passes and waits; an old save (old build) loads
   and gets the exam state. Every size: exam round + result frames and Mệnh truyện › Sắc phong: 0 page errors, no horizontal overflow,
   no clipped text in the frame. */
const {chromium}=require('playwright');const args=process.argv.slice(2);const URL=args[0],OLD=args[1]&&args[1]!=='-'?args[1]:null,OUT=args[2]&&args[2]!=='-'?args[2]:null;
let SIZES=args.slice(3);if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3','390x844@3'];
const boot=async(p,u)=>{await p.goto(u,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){start();if(!isSrv()&&S.rank<=2)break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=200;S.suc=90;render()})};
const elig=`(()=>{const nx=RANKS[S.rank+1];S.sung=nx.s+5;S.danh=nx.d+5;S.duc=Math.max(S.duc,nx.dd||0);S.lastPromo=S.turn-12;S.hh=40;S.th=60;S.confined=0;/* promo-build: the ordinary exam opens only in a kỳ sắc phong month */for(let i=0;i<24&&typeof pbKyAt==="function"&&!pbKyAt(pbA());i++){S.month=S.month%12+1;if(S.month===1)S.year++}render();/* review/rank-pace: the window now also puts the «Thi ngay / Để sau» kit card in front; this test plays the Hành sự card, so it closes that card first («Để sau») */{const j=Q.findIndex(m=>m&&m.exAsk);if(j>=0){Q.splice(j,1);try{showModal()}catch(e){}}}})()`;
(async()=>{const b=await chromium.launch();const errs=[];const T=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':String(x).slice(0,160)]);
 for(const [si,SZ] of SIZES.entries()){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));p.setDefaultTimeout(0);await boot(p,URL);
  if(si===0){
   /* 1. window + card */
   const a=await p.evaluate(elig+`;(()=>{render();const i=deck.findIndex(x=>x.exam);const c=deck[i];return{w1:S.ex.w1,i,o:c&&c.o,ch:exChance(S),word:c&&word(c.o),h:i>=0?cardH(c,i).replace(/<[^>]+>/g," "):"",row:promoReq().slice(-1)[0]}})()`);
   ok(a.w1!=null,'eligibility opens the exam window',JSON.stringify(a.row));ok(a.i>=0,'act card «Khảo hạch tấn phong» in Hành sự');
   ok(a.o===Math.max(5,Math.min(95,a.ch))&&a.h.includes(a.word),'card odds word = word(exChance)',`${a.o} ${a.word}`);ok(/Tốn/.test(a.h)&&/Sức/.test(a.h)&&/trượt: chờ \d tháng/.test(a.h),'card shows Tốn + fail cost',a.h.replace(/\s+/g,' ').slice(0,200));
   /* 2. exam through the frame, every round skipped (same-level play), forced pass */
   const r0=await p.evaluate(()=>{window.__bar0=BAL.ex.bar.slice();BAL.ex.bar=[0,0,0];const rk=S.rank;const i=deck.findIndex(x=>x.exam);act(i);return{rk,frame:!!document.getElementById('kg82'),rounds:exPlan(S).rounds}});
   ok(r0.frame,'exam opens the kit game frame',r0.rounds.join(','));
   for(let k=0;k<r0.rounds.length;k++){await p.evaluate(()=>document.getElementById('kg82skip').click());await p.waitForTimeout(250);await p.evaluate(()=>document.getElementById('kg82ok').click());await p.waitForTimeout(300)}
   const r1=await p.evaluate(()=>{const t=document.getElementById('kg82').innerText;document.getElementById('kg82ok').click();return{t,rank:S.rank,ex:S.ex}});
   ok(/Đỗ\./.test(r1.t)&&/tứ đức/i.test(r1.t)&&/mức đỗ/i.test(r1.t),'result frame: rounds, Tứ đức, tài nghệ, bar, verdict',r1.t.replace(/\s+/g,' ').slice(0,200));ok(r1.rank===r0.rk+1,'pass → edict, rank +1',`${r0.rk}→${r1.rank}`);
   /* 3. forced fail */
   const f=await p.evaluate(elig+`;(()=>{BAL.ex.bar=[99,99,99];const rk=S.rank;exStart();return{rk}})()`);
   for(let k=0;k<3;k++){await p.evaluate(()=>{const s=document.getElementById('kg82skip');if(s)s.click()});await p.waitForTimeout(200);await p.evaluate(()=>{const o=document.getElementById('kg82ok');if(o&&!/Đã hiểu/.test(o.textContent))o.click()});await p.waitForTimeout(250)}
   const f2=await p.evaluate(()=>{const o=document.getElementById('kg82ok');if(o)o.click();tab='story';render();const sb=document.querySelector('#panel [data-ktsv="rank"]');if(sb)sb.click();
    return{rank:S.rank,cd:S.ex.cd,turn:S.turn,row:promoReq().slice(-1)[0],chip:(document.querySelector('#panel .ktop')||{}).innerText||"",card:deck.some(x=>x.exam),prom:promoteP(S)}});
   ok(f2.rank===f.rk&&f2.cd>f2.turn,'fail → no rank, cooldown',JSON.stringify(f2.row));ok(/Thi lại từ/.test(f2.chip),'Sắc phong panel chip shows the retry date',f2.chip.replace(/\s+/g,' '));ok(!f2.card&&!f2.prom,'no card and no decree during cooldown');
   /* 4. missed window lapses */
   const l=await p.evaluate(elig+`;(()=>{BAL.ex.bar=window.__bar0;S.ex={to:S.rank+1};exTick();const w1=S.ex.w1;S.tuan=(S.tuan+BAL.ex.win)%3;S.turn+=1;exTick();return{w1,cd:S.ex.cd,lapse:S.ex.lapse,turn:S.turn,log:S.logs.slice(0,3).join(' ')}})()`);
   ok(l.w1!=null&&l.lapse===1&&l.cd>l.turn,'missed window → lapse + cooldown',l.log.replace(/<[^>]+>/g,'').slice(0,150));
   /* 5. NPC: same rule, can fail (news line) */
   const n=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.out&&!x.queen&&x.rank<5);const nx=RANKS[v.rank+1];v.sung=nx.s+5;v.danh=nx.d+5;v.lastPromo=S.turn-20;v.hh=50;v.th=60;v.confined=0;delete v.ex;
    const free=seatFree(v.rank+1);BAL.ex.bar=[99,99,99];const r1=v.rank;promoteP(v);const failed={rank:v.rank,cd:v.ex.cd,news:(S.news||[]).slice(0,2).map(x=>x.t)};
    v.ex.cd=0;BAL.ex.bar=[0,0,0];const t=promoteP(v);BAL.ex.bar=window.__bar0;return{r1,free,failed,passRank:v.rank,t,turn:S.turn}});
   ok(n.failed.rank===n.r1&&n.failed.cd>n.turn&&n.failed.news.some(x=>/trượt khảo hạch/.test(x)),'NPC fails the exam → no rank, cooldown, news line',n.failed.news[0]);
   ok(!n.free||n.passRank===n.r1+1,'NPC passes → promoted by the same decree',`${n.r1}→${n.passRank} ${n.t}`);
   /* 6. son's birth: a rank on the spot (owner 20:05Z) */
   const g=await p.evaluate(()=>{S.ex={to:S.rank+1};const rk=S.rank;S.preg=9;S.fake=0;S.sung=0;S.danh=0;let t="";try{const k0=Math.random;Math.random=()=>0.99;try{t=birthP(S)}finally{Math.random=k0}}catch(e){t='ERR '+e.message}
    return{rk,after:S.rank,grace:S.ex.grace,to:S.ex.to,t:String(t).replace(/<[^>]+>/g,'')}});
   /* owner 15/11 20:05Z (review/promo-rules): a son = promoted at once, no exam; a daughter = an exam (dev/test/promo-rules.js) */
   ok(/hoàng tử/i.test(g.t)?g.after===g.rk+1:g.after===g.rk,'son birth → rank at once (owner 20:05Z), daughter → no rank on the spot',g.t.slice(0,160));
   /* 7. old save from the published build loads and migrates */
   if(OLD){const p2=await ctx.newPage();p2.on('pageerror',e=>errs.push('old '+e.message.slice(0,200)));await boot(p2,OLD);
    const sv=await p2.evaluate(elig+`;JSON.stringify(ser())`);await p2.close();
    const o=await p.evaluate(s=>{deser(JSON.parse(s));Q.length=0;render();return{ex:S.ex,exV:S.exV,row:promoReq().slice(-1)[0],card:deck.some(x=>x.exam)}},sv);
    ok(o.ex&&o.exV===1&&o.ex.w1!=null&&o.card,'old save loads: exam state created, window open, card dealt',JSON.stringify(o.row))}
  }
  /* every size: frames + panel */
  await p.evaluate(elig+`;(()=>{BAL.ex.bar=window.__bar0||BAL.ex.bar;S.ex={to:S.rank+1};render();tab='act';render();exStart()})()`);await p.waitForTimeout(600);
  const chk=async(n)=>{const m=await p.evaluate(()=>{const d=document.getElementById('kg82')||document.getElementById('panel');const sw=document.documentElement.scrollWidth-innerWidth;
    const clip=[...d.querySelectorAll('button,.kr,.kb span,.kfact,h4')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+2).map(e=>(e.className||e.tagName)+':'+e.textContent.slice(0,30)).slice(0,3);
    const r=d.getBoundingClientRect();const bt=d.querySelector('#kg82ok,#kg82go');const br=bt&&bt.getBoundingClientRect();const shut=!!bt&&/Đã hiểu/.test(bt.textContent);const hid=shut?!d.querySelector('.kit-x'):!!bt&&(br.bottom>Math.min(innerHeight,r.bottom)+1||br.top<r.top-1);return{sw,clip,out:r.right>innerWidth+1||r.left<-1,btnHidden:hid}});
   ok(m.sw<=0&&!m.clip.length&&!m.out&&!m.btnHidden,`${SZ} ${n}: no overflow / clipping, button in view (result: kit ✕)`,JSON.stringify(m));if(OUT)await p.screenshot({path:`${OUT}/${n}-${wh}.jpg`,type:'jpeg',quality:55})};
  await chk('round');await p.evaluate(()=>document.getElementById('kg82skip').click());await p.waitForTimeout(300);
  for(let k=0;k<3;k++){const t=await p.evaluate(()=>{const o=document.getElementById('kg82ok');if(!o)return'';const t=o.textContent;if(!/Xem kết quả/.test(t)){o.click();setTimeout(()=>{const s=document.getElementById('kg82skip');if(s)s.click()},150)}else o.click();return t});await p.waitForTimeout(500);if(/Xem kết quả/.test(t))break}
  await chk('result');await p.evaluate(()=>{const o=document.getElementById('kg82ok');if(o)o.click();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;tab='story';render();const sb=document.querySelector('#panel [data-ktsv="rank"]');if(sb)sb.click()});await p.waitForTimeout(600);
  await p.evaluate(()=>{document.querySelectorAll('.kmov,[id^="km"]').forEach(e=>{if(e.classList&&e.classList.contains('kmov'))e.remove()})});await chk('sacphong');
  await ctx.close()}
 for(const t of T)console.log(t.join('  '));console.log('page errors:',errs.length?errs:'none');const bad=T.filter(t=>t[0]==='FAIL').length;console.log(`${T.length-bad}/${T.length} pass`);await b.close();process.exit(bad||errs.length?1:0)})();
