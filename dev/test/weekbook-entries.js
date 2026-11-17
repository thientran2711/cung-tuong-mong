/* review/weekbook-entries: each Tuần lục person page lists only what happened with THAT person (owner 15/11 "Giải thích gì mà không liên quan
   tới hoàng thượng vậy."). usage: node dev/test/weekbook-entries.js <url> [<W>x<H>@dpr ...] [--shots <dir>]
   Plays a week (bot setup as book-person.js), then writes the owner's case into the log: a stale Điểm trang card line that names Hoàng thượng
   in a hint, "Đánh đàn ở ngự hoa viên: thành. Sủng +7", a thỉnh an with Thái hậu / Hoàng hậu numbers, a night with Sủng and Ân tình, a
   rival's gossip and a gift. Asserts (wkBookData):
   - the Điểm trang hint text is in NO entry (card promise / hint text never an entry)
   - Hoàng thượng page: "Đánh đàn" entry with Sủng +7 and nothing with her own Danh/Sức/Bạc; the sum of its Sủng numbers == the relation row's week change
   - Thái hậu / Hoàng hậu / a rival: only their own numbers; relation rows' week change == sum of the numbers listed
   - no entry mentions only another person's name when that person's page lists it ("unrelated")
   Then opens the book (dawn) and checks the Hoàng thượng page at each size: no horizontal overflow, entries visible, no text cut (scrollHeight). */
const {chromium}=require('playwright');
const args=process.argv.slice(2);const URL=args[0];const si=args.indexOf('--shots');const SHOTS=si>0?args[si+1]:null;
let SIZES=args.slice(1).filter((a,i,A)=>a!=='--shots'&&A[i-1]!=='--shots');if(!SIZES.length)SIZES=['755x1000@1','1000x755@1','1180x820@1','1366x1024@1','844x390@2'];
(async()=>{const b=await chromium.launch();let ok=true;const fail=m=>{ok=false;console.log('FAIL',m)};
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>fail(SZ+' pageerror '+e.message.slice(0,200)));p.setDefaultTimeout(0);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof dawn==='function',null,{timeout:0});await p.waitForTimeout(2500);
  const R=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
   Math.random=(()=>{let s=777;return()=>{s=(s*16807)%2147483647;return s/2147483647}})();window.__forceOrigin='cn';
   for(let i=0;i<60;i++){start();if(!isSrv()&&S.emp)break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();window.__bot=true;tmPlace(S,12);
   S.logs.length=0;S.logSeq=0;S.wkSnap=wkSnap();S.wkSnap.seq=0;
   const L=liveRivals(false);const hh=L.find(v=>v.queen)||L[0],a=L.find(v=>!v.queen&&v!==hh)||L[1],c=L.find(v=>!v.queen&&v!==hh&&v!==a)||L[2];kn();for(const v of L)S.met[v.id]=wk();
   /* the real changes first, the lines the game writes after */
   log(`Điểm trang. · hôm nay thỉnh an Thái hậu, thỉnh an Hoàng hậu (thẻ thỉnh an, gặp Hoàng thượng ghi trước) · kèm: phô trương dễ bị ghen, mặt mộc trước người trọng lễ bị chê (không điểm trang: mặc như hôm qua, mặt mộc)`);
   S.sung+=7;S.suc-=10;log(`Đánh đàn ở ngự hoa viên: <span class="g">thành</span>. <span class="g">Sủng ${S.sung-7}→${S.sung}</span>, <span class="r">Sức ${S.suc+10}→${S.suc}</span>.`);
   const t0=S.th;S.th+=8;S.danh+=2;log(`Thỉnh an Thái hậu: thành. Danh ${S.danh-2}→${S.danh}, Thái hậu quý ngươi ${t0}→${S.th}.`);
   const h0=a.rel||0;log(`Thỉnh an Hoàng hậu: hỏng. Sức ${S.suc}→${S.suc-5}, ${hh.name} thiện cảm -3.`);S.suc-=5;relAdd(hh,S,-3);
   log(`${a.name} được Hoàng thượng ban Vòng ngọc Hòa Điền.`);
   log(`Tai mắt kể: ${c.name} dâng canh sâm lên Dưỡng Hòa điện: Hoàng thượng vui lòng. Sủng của ${c.name} 61 → 64.`);
   log(`Đêm qua thẻ bài của ${a.name} được lật (tai mắt nói: đêm vui). Tai mắt kể: ${c.name} thêu túi thơm dâng Hoàng thượng: ngài không để ý.`);
   S.sung+=3;log(`Đêm nay ta được thị tẩm. Sủng ${S.sung-3} → ${S.sung} · Ân tình 0 → 3 · không được ban thưởng.`);
   const D={sung:S.sung-S.wkSnap.sung};
   return {emp:S.emp.name,a:a.name,c:c.name,hh:hh.name,D}});
  const R2=await p.evaluate(()=>{const d=wkBookData();const txt=f=>kpPlain(f.text||"");
   const pg=p=>d.persons.find(x=>x.who===p);const emp=pg(S.emp),th=pg(S.thO||{}) ||d.persons.find(x=>x.who.kind==="th");
   const out={me:d.me.map(txt),persons:d.persons.map(x=>({k:x.who===S.emp?"emp":x.who.kind==="th"||x.who===S.thO?"th":x.who.queen?"hh":"x",name:x.who.name||"",rel:x.rel.map(r=>({l:r.label,d:r.d})),F:x.blocks[0].facts.map(txt)})),world:d.world.map(txt)};return out});
  console.log('== sizes',SZ);
  const all=[...R2.me,...R2.persons.flatMap(x=>x.F)];
  if(all.some(t=>/kèm:|ai gặp ta cũng nhìn|\(thẻ /.test(t)))fail(SZ+' card hint text still in an entry');
  const emp=R2.persons.find(x=>x.k==='emp');if(!emp)fail(SZ+' no Hoàng thượng page');else{
   if(!emp.F.some(t=>/Đánh đàn/.test(t)&&/Sủng \+7/.test(t)))fail(SZ+' emp: "Đánh đàn … Sủng +7" missing: '+JSON.stringify(emp.F));
   if(emp.F.some(t=>/Điểm trang|thỉnh an/i.test(t)))fail(SZ+' emp: unrelated entry '+JSON.stringify(emp.F));
   if(emp.F.some(t=>/\b(Danh|Sức|Bạc|Đức)\s+[+\-−]?\d/.test(t)))fail(SZ+' emp: her own numbers on his page '+JSON.stringify(emp.F));
   let s=0;emp.F.forEach(t=>{for(const m of t.matchAll(/Sủng (?!của)(-?\d+ ?→ ?-?\d+|[+\-−]\d+)/g)){const v=m[1].replace(/−/g,'-');const q=/→/.test(v)?v.split(/ ?→ ?/).map(Number):null;s+=q?q[1]-q[0]:+v}});
   const row=emp.rel[0];if(row.d!==s)fail(SZ+` emp: Sủng row change ${row.d} != listed ${s}`);console.log('emp',JSON.stringify(emp.F))}
  const th=R2.persons.find(x=>x.k==='th');if(th){if(th.F.some(t=>/\b(Danh|Sức|Bạc|Đức)\s+[+\-−]?\d/.test(t)))fail(SZ+' th: her own numbers '+JSON.stringify(th.F));
   if(!th.F.some(t=>/Thỉnh an Thái hậu/.test(t)&&/Thái hậu thiện cảm \+8/.test(t)))fail(SZ+' th: thỉnh an entry '+JSON.stringify(th.F))}else fail(SZ+' no Thái hậu page');
  for(const x of R2.persons){let sum={aff:0,oan:0,ghen:0,sung:0};x.F.forEach(t=>{for(const m of t.matchAll(/(Sủng(?! của)|thiện cảm|quý ngươi|oán ta|ghen) ?(-?\d+ ?→ ?-?\d+|[+\-−]\d+)/g)){const v=m[2].replace(/−/g,'-');const q=/→/.test(v)?v.split(/ ?→ ?/).map(Number):null;const n=q?q[1]-q[0]:+v;const k=m[1]==='Sủng'?'sung':m[1]==='oán ta'?'oan':m[1]==='ghen'?'ghen':'aff';sum[k]+=n}});
   for(const r of x.rel){if(!r.d||/^Ta /.test(r.l)||/tin cậy/.test(r.l))continue;const k=x.k==='emp'?'sung':/oán/.test(r.l)?'oan':/ghen/.test(r.l)?'ghen':'aff';if(sum[k]!==r.d)fail(SZ+` ${x.name||x.k}: ${r.l} change ${r.d} != listed ${sum[k]}`)}}
  /* the book itself */
  await p.waitForFunction(()=>typeof FIGS!=='undefined'&&FIGS.length>0,null,{timeout:60000}).catch(()=>{});
  const IDX=await p.evaluate(()=>{const P=wkBookPages().pages;return P.findIndex(x=>x.kind==='person'&&x.who===S.emp)});
  await p.evaluate(()=>{dawn()});await p.waitForTimeout(3500);
  const found=await p.evaluate(async()=>{const bk=window.__kbk;for(let i=0;i<=bk.max;i++){bk.go(i);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const pg=[...document.querySelectorAll('.kbk-pg')].find(e=>{const n=e.querySelector('.kbk-pname');const r=e.getBoundingClientRect();return n&&/^Hoàng thượng/.test(n.innerText.trim())&&r.width>10&&r.right>0&&r.left<innerWidth});if(pg){const r=pg.getBoundingClientRect();return{i,cut:[...pg.querySelectorAll('.kbk-fact,.kfact,li,p')].filter(e=>e.scrollWidth>e.clientWidth+2).length,ovX:document.querySelector('.kbk').scrollWidth-document.querySelector('.kbk').clientWidth,w:Math.round(r.width)}}}return null});
  if(!found)fail(SZ+' Hoàng thượng page not found in the book');else{console.log('page',JSON.stringify(found));await p.evaluate(i=>window.__kbk.go(i+(window.__kbk.mode==='spread'?1:0)),found.i);await p.waitForTimeout(900);
   if(SHOTS){require('fs').mkdirSync(SHOTS,{recursive:true});await p.screenshot({path:`${SHOTS}/emp-${wh}.jpg`,type:'jpeg',quality:60})}}
  await ctx.close()}
 await b.close();console.log(ok?'PASS':'FAIL');process.exit(ok?0:1)})();
