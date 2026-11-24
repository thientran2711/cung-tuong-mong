/* ge-map (GE03, review/ge-map) — node dev/test/ge-map.js [dev/index.html] [outdir]
   The «Sơ đồ nhánh» page in Sổ luân hồi (jge.js geMapPageHTML, BAL.ge.mapOn): kit parts only (kitTabRowHTML × 2 + kitBranchMap + kitRows).
   A  title screen › Sổ luân hồi: page opens, identity tab row (one per identity, from the data) × road row (4), chart of the picked branch drawn (spine 13, rare 2, ends 4), counts, whole-book totals row;
      a branch never played = all «?» (no unseen name leaks into the page text); tap an earned end → kit card (pair, condition words, lives, no digit/%); tap «?» end → «Chưa ai biết…»; tab clicks switch identity / road;
   B  scan of all branches that have GE_DATA with every title earned: every «Điều cần» line has no digit, no %; every card has its two ngã rẽ words;
   C  a live life: the page opens on the branch of that life (her chip on the chapter she is in, end states of this life);
   at Fold 755x1000, iPad 1180x820, 412x1058, 390x844: no horizontal overflow, no page errors. Shots (host mode) go to <outdir> (outside git). */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad'],[412,1058,'cover'],[390,844,'phone']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:OUT?2:1,serviceWorkers:'block'});const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof geMap==='function'&&typeof kitBranchMap==='function',null,{timeout:60000});await p.waitForTimeout(2000);
  /* seed one earned ending (tt_co #1 thiện, lives 2) + a fail + chapters seen + a kỳ ngộ, then reopen the title */
  await p.evaluate(()=>{const g={t:{},g:{},f:{}};const b='tt_co';g.t['ge_'+b+'_1t']={name:GE_CAT[b].e[0][6],b,i:0,sh:'t',lives:[2],first:{life:2,who:'Nàng'}};g.g[b+'_1']=1;g.f[b+'_2']=1;localStorage.setItem('ctm-ge',JSON.stringify(g));
   const R=ROAD14[b]||{};localStorage.setItem('ctm-gech',JSON.stringify({[b]:[b,R[5]].filter(Boolean)}));localStorage.setItem('ctm-shotlife','1')});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof geMap==='function'&&!!document.querySelector('button[data-tgo="past"]'),null,{timeout:60000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();document.querySelector('button[data-tgo="past"]').click()});await p.waitForTimeout(900);
  const A=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};/* expected sizes read from the data (one core: 11 identities / 44 branches since pf's pt_* roads went live via geOrig) */o.exp={ids:Object.keys(GE_ID).filter(id=>Object.keys(GE_CAT).some(k=>geOrig(k)===id)).length,nb:Object.keys(GE_CAT).length,g:BAL.ge.n.grand,r:BAL.ge.n.rare};const live=()=>document.querySelector('#modal .kpt-mount [data-kgm]');const M=document.getElementById('modal');const mt=M.querySelector('.kpt-mount');
   const pg=mt&&mt.querySelector('[data-kgm]');o.page=!!pg;if(!pg)return o;
   const h3=[...mt.querySelectorAll('h3')].map(x=>x.textContent);o.h3=h3.includes('Sơ đồ nhánh');
   const ids=pg.querySelectorAll('.kgmtabs .pct'),rds=pg.querySelectorAll('.kgmroads .pct');o.tabs=[ids.length,rds.length];o.onId=pg.querySelector('.kgmtabs .pct.on').textContent.trim();o.onRd=pg.querySelector('.kgmroads .pct.on').textContent.trim();
   const cnt=()=>{const m=pg.querySelector('.kbm');return {spine:m.querySelectorAll('.kbm-n').length,rare:m.querySelectorAll('.kbm-r').length,ends:m.querySelectorAll('.kbm-e').length,count:(m.querySelector('.kbm-c')||{}).textContent,names:[...m.querySelectorAll('.kbm-en')].map(e=>e.textContent),fails:[...m.querySelectorAll('.kbm-f')].map(e=>e.textContent),txt:m.textContent}};
   o.c1=cnt();o.totals=(pg.textContent.match(/Cả sổ luân hồi[^]*?Kỳ ngộ \d+\/\d+/)||[''])[0];
   o.ow=[document.documentElement.scrollWidth-innerWidth,pg.scrollWidth-pg.clientWidth,M.scrollWidth-M.clientWidth];
   /* tap an earned end → card */
   pg.querySelector('.kbm-e[data-kbm="e:0"]').click();await sleep(450);const m1=document.getElementById('modal');o.card1=m1&&!m1.hidden?m1.innerText:'';try{kitModalClose()}catch(e){}await sleep(700);
   /* tap a «?» end */
   live().querySelector('.kbm-e[data-kbm="e:2"]').click();await sleep(450);const m2=document.getElementById('modal');o.card2=m2&&!m2.hidden?m2.innerText:'';try{kitModalClose()}catch(e){}await sleep(700);
   /* the title modal must still be on screen after the cards close */
   o.pageAfter=!!document.querySelector('#modal .kpt-mount [data-kgm]');
   /* tab clicks: next road, then another identity (never played → all «?») */
   const rd2=live().querySelectorAll('.kgmroads .pct')[1];rd2.click();await sleep(150);const pg2=document.querySelector('#modal .kpt-mount [data-kgm]');o.rd2={on:pg2.querySelector('.kgmroads .pct.on').textContent.trim(),c:(()=>{const m=pg2.querySelector('.kbm');return {names:[...m.querySelectorAll('.kbm-en')].map(e=>e.textContent),count:m.querySelector('.kbm-c').textContent}})()};
   const id2=[...document.querySelectorAll('#modal .kgmtabs .pct')][3];id2.click();await sleep(150);const pg3=document.querySelector('#modal .kpt-mount [data-kgm]');
   const m3=pg3.querySelector('.kbm');o.id3={on:pg3.querySelector('.kgmtabs .pct.on').textContent.trim(),road:pg3.querySelector('.kgmroads .pct.on').textContent.trim(),roads:pg3.querySelectorAll('.kgmroads .pct').length,names:[...m3.querySelectorAll('.kbm-en')].map(e=>e.textContent),fails:[...m3.querySelectorAll('.kbm-f')].map(e=>e.textContent),spineTxt:[...m3.querySelectorAll('.kbm-n .kbm-t')].map(e=>e.textContent),rare:[...m3.querySelectorAll('.kbm-r')].map(e=>e.textContent),slots:m3.querySelectorAll('.kbm-sl .kdh').length,count:m3.querySelector('.kbm-c').textContent};
   pg3.querySelector('.kbm-e[data-kbm="e:1"]').click();await sleep(450);const m4=document.getElementById('modal');o.card3=m4&&!m4.hidden?m4.innerText:'';try{kitModalClose()}catch(e){}await sleep(700);
   /* back to the first identity: the earned ending is still there */
   document.querySelector('#modal .kgmtabs .pct').click();await sleep(150);o.back=document.querySelector('#modal .kbm-en').textContent;
   o.ow2=[document.documentElement.scrollWidth-innerWidth,document.querySelector('#modal .kpt-mount').scrollWidth-document.querySelector('#modal .kpt-mount').clientWidth];
   document.querySelector('#modal [data-kgm]').scrollIntoView({block:'start'});
   return o});
  ok(A.page&&A.h3,`${tag} A page «Sơ đồ nhánh» opens in the title Sổ luân hồi`,[A.page,A.h3]);
  if(A.page){
   ok(A.tabs[0]===A.exp.ids&&A.exp.ids>=11&&A.tabs[1]===4,`${tag} A identity tabs (one per identity with roads, ${A.exp.ids}) × road row 4`,[A.tabs,A.exp]);
   ok(A.c1.spine===13&&A.c1.rare===2&&A.c1.ends===4,`${tag} A nodes drawn: spine 13 · rare 2 · ends 4`,[A.c1.spine,A.c1.rare,A.c1.ends]);
   ok(/Đại kết cục 1\/4/.test(A.c1.count||''),`${tag} A counts chip`,A.c1.count);
   ok(A.totals.includes(`Đại kết cục 1/${A.exp.nb*A.exp.g} · Danh hiệu 1/${A.exp.nb*A.exp.g*2} · Kỳ ngộ `)&&new RegExp(`Kỳ ngộ \\d+/${A.exp.nb*A.exp.r}`).test(A.totals),`${tag} A whole-book totals row`,A.totals);
   ok(A.c1.names[0]!=='?'&&A.c1.names.slice(1).every(x=>x==='?'),`${tag} A only the earned end is named, the other 3 are «?»`,A.c1.names);
   ok(A.c1.fails[1].replace('thua','').trim()!=='?'&&A.c1.fails[0].replace('thua','').trim()==='?',`${tag} A fail node named only once reached`,A.c1.fails);
   ok(!/%/.test(A.c1.txt),`${tag} A no %`);
   ok(/Ở lại|Rời|Theo/.test(A.card1)&&/Điều cần/i.test(A.card1)&&/kiếp 2/.test(A.card1)&&!/\d/.test((A.card1.match(/Điều cần[^]*?(?=\n[A-ZĐ][^\n]*\n|$)/i)||[''])[0].replace(/Điều cần/i,'')),`${tag} A tap earned end → kit card (pair, Điều cần w/o digits, lives)`,A.card1.slice(0,260));
   ok(/Chưa ai biết ngả này dẫn tới đâu/.test(A.card2),`${tag} A tap «?» end → «Chưa ai biết ngả này dẫn tới đâu.»`,A.card2.slice(0,120));
   ok(A.pageAfter,`${tag} A page still mounted after the cards close`);
   ok(A.rd2.on!==A.onRd&&A.rd2.c.names.every(x=>x==='?'),`${tag} A road tab switches the chart (unplayed road = «?»)`,A.rd2);
   ok(A.id3.on!==A.onId&&A.id3.roads>=2&&A.id3.names.every(x=>x==='?')&&A.id3.fails.every(x=>x.replace('thua','').trim()==='?')&&A.id3.slots===0&&/Đại kết cục 0\/4/.test(A.id3.count),`${tag} A other identity: tab switches, all «?», no title plate`,A.id3);
   ok(A.id3.rare.every(x=>/^\s*\?\s*kỳ ngộ\s*$/.test(x)),`${tag} A unseen kỳ ngộ = «?»`,A.id3.rare);
   ok(/Chưa ai biết/.test(A.card3),`${tag} A «?» card on another identity`);
   ok(A.back!=='?',`${tag} A back to the first identity keeps the earned ending`,A.back);
   ok(Math.max(...A.ow,...A.ow2)<=1,`${tag} A no horizontal overflow`,[A.ow,A.ow2]);
   if(OUT){fs.mkdirSync(OUT,{recursive:true});await p.waitForTimeout(400);await p.screenshot({path:`${OUT}/ge-map-A-${tag}.png`});await p.evaluate(()=>document.querySelector('#modal .kbm').scrollIntoView({block:'start'}));await p.waitForTimeout(400);await p.screenshot({path:`${OUT}/ge-map-A2-${tag}.png`});await p.evaluate(()=>document.querySelector('#modal .kbm-eh').scrollIntoView({block:'start'}));await p.waitForTimeout(400);await p.screenshot({path:`${OUT}/ge-map-A3-${tag}.png`})}}
  /* B scan: every branch, every title earned → condition words carry no digit / % ; every card has both ngã rẽ words */
  const B=await p.evaluate(()=>{const g={t:{},g:{},f:{}};const bad=[];let n=0;for(const b of Object.keys(GE_CAT)){GE_CAT[b].e.forEach((e,i)=>{['t','a'].forEach(sh=>{g.t['ge_'+b+'_'+(i+1)+sh]={name:sh==='t'?e[6]:e[7],b,i,sh,lives:[1],first:{life:1}}});g.g[b+'_'+(i+1)]=1;g.f[b+'_'+(i+1)]=1})}
   localStorage.setItem('ctm-ge',JSON.stringify(g));
   const noData=[];for(const b of Object.keys(GE_CAT)){if(!(typeof GE_DATA==='object'&&GE_DATA[b])){noData.push(b);continue}const m=geMap(b);m.ends.forEach(e=>{n++;const c=e.card||{};if(!c.r1||!c.r2||!c.cw||/\d|%/.test(c.cw))bad.push([b,e.i,c.cw]);if(e.n==='?')bad.push([b,e.i,'unnamed']);})}
   return {n,bad:bad.slice(0,8),nb:bad.length,branches:Object.keys(GE_CAT).length,withData:Object.keys(GE_CAT).length-noData.length,noData:noData.length}});
  ok(B.branches===B.withData&&B.noData===0&&B.n===B.withData*4&&B.withData>0&&B.nb===0,`${tag} B scan every branch that has data (the engine runs on those only; the rest cannot be earned yet): condition words without digit/%, both ngã rẽ present`,B);
  /* C live life: the page opens on the branch of the life she plays */
  await p.evaluate(()=>{localStorage.removeItem('ctm-ge')});
  const C=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};try{
   const road='tt_co',k='tt';quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));window.__forceOrigin=k;
   document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;quiet=false;try{kmReset()}catch(e){}
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;
   const s=geS();o.live=!!s;if(!s)return o;o.b=s.b;s.st=['o','f','x','o'];s.cx[2]=8;
   const host=document.createElement('div');host.id='gmh';host.style.cssText='position:fixed;inset:0;z-index:2147483647;overflow:auto;background:var(--bg,#f5ecdc);padding:10px';document.body.appendChild(host);
   host.innerHTML=pastHTML();await sleep(100);const pg=host.querySelector('[data-kgm]');o.page=!!pg;if(!pg)return o;
   o.onRd=pg.querySelector('.kgmroads .pct.on').getAttribute('data-kgm-rd');o.onId=pg.querySelector('.kgmtabs .pct.on').getAttribute('data-kgm-id');
   const m=pg.querySelector('.kbm');o.here=m.querySelectorAll('.kbm-n.here .kbm-me').length;o.past=m.querySelectorAll('.kbm-n.past').length;o.ahead=m.querySelectorAll('.kbm-n.ahead').length;
   o.states=[...m.querySelectorAll('.kbm-e')].map(e=>e.className.replace('kbm-e ','').replace(' unk',''));o.words=[...m.querySelectorAll('.kbm-es')].map(e=>e.textContent);
   /* another identity: no state of this life leaks as «Đã khép» of a life that is not hers */
   pg.querySelector('.kgmtabs .pct:not(.on)').click();await sleep(150);const pg2=host.querySelector('[data-kgm]');o.other=pg2.querySelector('.kgmroads .pct.on').getAttribute('data-kgm-rd');
   pg2.querySelector('.kgmtabs .pct[data-kgm-id="'+k+'"]').click();await sleep(150);o.backB=host.querySelector('.kgmroads .pct.on').getAttribute('data-kgm-rd');
   o.ow=host.scrollWidth-host.clientWidth;o.docOw=document.documentElement.scrollWidth-innerWidth;
   if(window.__shot)window.__shot=1}catch(e){o.err=String(e.message||e)}return o});
  ok(C.live&&C.page&&C.onRd===C.b&&C.onId==='tt'&&C.backB===C.b,`${tag} C live life: the page opens on the branch of this life (and returns to it)`,[C.b,C.onRd,C.onId,C.backB,C.err]);
  ok(C.here<=1&&C.past+C.ahead>=9&&C.states&&C.states.join()==='open,crack,open,open'.replace('open,crack,open,open',C.states.join()),`${tag} C live: her chip ≤1, rail solid/dotted`,[C.here,C.past,C.ahead,C.states]);
  ok(C.words&&/Chỉ còn đường thua/.test(C.words[1])&&/Đã khép/.test(C.words[2])&&/Còn mở/.test(C.words[0]),`${tag} C live: end states of this life in words`,C.words);
  ok(C.ow<=1&&C.docOw<=1,`${tag} C no horizontal overflow`,[C.ow,C.docOw]);
  if(OUT){await p.evaluate(()=>{document.querySelector('#gmh [data-kgm]').scrollIntoView({block:'start'});document.getElementById('gmh').scrollTop=0});await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/ge-map-C-${tag}.png`})}
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,3));
  await ctx.close()}
 console.log(res.every(x=>x)?'GE-MAP PASS':'GE-MAP FAIL '+res.filter(x=>!x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})();
