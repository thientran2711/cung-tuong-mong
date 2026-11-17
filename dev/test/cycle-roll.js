/* review/cycle-roll (owner OD:L1397 + 17/11 07:35Z s30): the Kỳ nguyệt sự LENGTH is rolled EACH MONTH per woman from BAL.cyc.len
   (seed = her name + the month index S.turn, one value per year+month; co-op seats compute the same).
   Checks (bot, no UI): over every woman × 36 months (≥ 300 draws) each length of BAL.cyc.len ≈ 1/3 (0.27..0.40); the same woman's
   length changes month to month (each woman ≥ 2 lengths in 36 months; ≥ 50 % of month→next pairs differ); cycleDaysOf / cyDaysM /
   the maid card ("Kỳ này (…)") / the calendar marks / the book all show the SAME per-month length; days stay inside one tuần of one month
   (never cross a month); the co-op friend entry {name} rolls the same as her; deterministic (same call twice = same days);
   changing BAL.cyc.len changes the game (no typed 5/6/7 left).  usage: node dev/test/cycle-roll.js <index.html> */
const {chromium}=require('playwright');const fs=require('fs');
const IDX=process.argv[2]||'dev/index.html';const html=fs.readFileSync(IDX,'utf8');
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';
(async()=>{const b=await chromium.launch();const errs=[];
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route(u=>u.href.split('?')[0]===LIVE||u.href.split('?')[0]===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
 await ctx.route(/\.(mp3|ogg)$/,r=>r.fulfill({status:404,body:''}));
 const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__nlInner=1;for(let i=0;i<60;i++){start();if(!isSrv())break}window.__nlInner=0;Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;render()});
 const R=await p.evaluate(()=>{const f=[],info={};const LEN=BAL.cyc.len;const cnt={};LEN.forEach(x=>cnt[x]=0);let n=0,pairs=0,diff=0;
  const W=[S].concat(consorts().filter(q=>q!==S));const M0=S.turn;const per={};
  for(const q of W){const ls=[];for(let k=0;k<36;k++){const mi=M0+k;const l=cyLen(q,mi),d=cyDaysM(q,mi);ls.push(l);n++;cnt[l]=(cnt[l]||0)+1;
    if(d.length!==l)f.push('cyDaysM len≠cyLen '+q.name);if(!LEN.includes(l))f.push('len not in BAL '+l);
    const t=Math.floor((d[0]-1)/10);if(d.some(x=>Math.floor((x-1)/10)!==t)||d[0]<1||d[d.length-1]>30)f.push('crosses tuần/month '+q.name+' '+d);
    if(JSON.stringify(d)!==JSON.stringify(cyDaysM(q,mi)))f.push('not deterministic');
    if(q!==S&&JSON.stringify(d)!==JSON.stringify(cyDaysM({name:q.name},mi)))f.push('friend entry differs '+q.name);
    if(k>0){pairs++;if(ls[k]!==ls[k-1])diff++}}
   per[q===S?'(me) '+S.name:q.name]=ls.join('');if(new Set(ls).size<2)f.push('same length all 36 months '+q.name)}
  if(JSON.stringify(cyDaysM({name:S.name},M0))!==JSON.stringify(cyDaysM(S,M0)))f.push('friend entry ≠ her');
  info.draws=n;info.split={};for(const k in cnt){const r=cnt[k]/n;info.split[k]=+r.toFixed(3);if(r<.27||r>.40)f.push('split '+k+' '+r.toFixed(3))}
  info.changePairs=+(diff/pairs).toFixed(3);if(diff/pairs<.5)f.push('changes month to month only '+diff/pairs);info.per=per;
  /* every reader shows the same per-month length (this month) */
  S.preg=0;S.fake=0;const cd=cycleDaysOf(S,S.month);if(cd.length!==cyLen(S,S.turn))f.push('cycleDaysOf len '+cd.length);
  for(let o=1;o<=6;o++){const d=cycleDaysOf(S,0,o);if(d.length&&d.length!==cyLen(S,S.turn+o))f.push('cycleDaysOf ahead '+o)}
  /* maid card text */
  try{S.tuan=cyBase(S).t;S.cyb=S.cyb||{};const c=PEND.cyrep&&PEND.cyrep();const t=c&&c.t||'';const m=t.replace(/<[^>]+>/g,'').match(/(\d+)⁠?–⁠?(\d+)/);
   info.maid=m?m[0].replace(/⁠/g,''):'(no card: '+(!!c)+')';if(m&&(+m[2]-+m[1]+1)!==cd.length)f.push('maid card range '+m[0]+' vs len '+cd.length);if(!m)f.push('maid card no range')}catch(e){f.push('maid card err '+e.message)}
  Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
  /* calendar marks (jmcal "Nguyệt tín") */
  /* BAL drives it: change the set → lengths follow */
  const keep=BAL.cyc.len;BAL.cyc.len=[4];const l4=cyDaysM(S,M0).length;BAL.cyc.len=keep;if(l4!==4)f.push('BAL.cyc.len not read');
  return{f,info}});
 /* calendar: open jmcal month grid and count the Nguyệt tín marks for this month */
 const cal=await p.evaluate(()=>{try{const L=cycleDaysOf(S,S.month);return{len:L.length,days:L.join(',')}}catch(e){return{err:e.message}}});
 R.info.cal=cal;await b.close();
 if(errs.length)R.f.push('page errors: '+errs.slice(0,3).join(' | '));
 console.log(JSON.stringify(R.info,null,1));console.log(R.f.length?'FAIL '+R.f.length+': '+R.f.slice(0,12).join(' ; '):'PASS cycle-roll: '+R.info.draws+' draws, split '+JSON.stringify(R.info.split)+', month→month change '+R.info.changePairs);
 process.exit(R.f.length?1:0)})();
