/* review/selection-scene (SELSCENE-4): THE 3 OPENING DAYS (jselxday) of a new tú nữ life, played card by card.
   Owner OD 24/11 ~07:05Z (3 days × 16 khắc, a drama each day), ~07:45Z (day title), ~08:20Z FINAL (Dưỡng Tú viện: Đông / Tây / Bắc sở + Tiền sảnh;
   day-1 teaching costs khắc) + MAIN 117 plan (D1 Nhập cung, D2 Điện tuyển, D3 Chờ chiếu); ~06:20Z dramas move relations only; ~06:15Z contest.
   Checks per tú nữ origin: day 1 → 2 → 3 in order with their names (selxDayName), each day starts at B4N × BAL.time.khac khắc and never goes below 0,
   the lesson costs khắc and marks every girl (law 1), a drama on every day (dorm / yard / kept seeds), greeting turns «Người lạ» into met,
   the 3 tests + the contest decide kept / ban hoa (score untouched by the dramas), the edict gives origin ±1 (cap Tần) and the news card,
   ban hoa (forced low marks) ends the life, no digits in the scene text (VANPHONG), no page errors.
   usage: node dev/test/selx-days.js [index.html]  (serves dev/ through a Playwright route; run python3 dev/build/assemble.py first) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m,x)=>{if(!c){bad++;console.log('FAIL',m,x!==undefined?JSON.stringify(x).slice(0,600):'')}else console.log('ok',m)};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const r=await p.evaluate(()=>{const out=[];const plain=h=>String(h||'').replace(/<[^>]*>/g,' ');
  const life=og=>{for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k===og)break}if(!S||!S.origin||S.origin.k!==og)return false;S.kcPick="cung";nlAccept();return true};
  const close=()=>{try{document.querySelectorAll('.kmov,#kprevov,#kg82,#kpod,.kpod').forEach(x=>x.remove())}catch(e){}};
  const OR=ORIGINS.map(o=>o.k).filter(k=>k!=="cnv"&&k!=="cn"&&!selxHoaThan(k));
  for(const og of OR)for(const mode of ["keep","ban"]){if(!life(og))continue;close();const Z=S.selx2;const o={og,mode,days:[],titles:[],kmin:99,kstart:[],digits:[],seen:[],met0:0,met:0,lessonAll:false,err:""};
   if(!Z||!Z.days){o.err="no days";out.push(o);continue}const r0=S.origin.r||0;const relBefore=JSON.stringify(Z.girls.map(v=>v.rel||0));let lastDay=0,lastKh=null;
   if(mode==="ban"){S.sac=0;S.duc=0;S.tai=0}
   for(let n=0;n<400&&Q.length&&!S.dead;n++){const m=Q[0];if(Z.days&&Z.days!==lastDay){lastDay=Z.days;o.days.push(Z.days);o.kstart.push(Z.kh);o.titles.push(kitDayName(Z.days))}
    if(Z.kh!=null)o.kmin=Math.min(o.kmin,Z.kh);if(m.pid==="selxD"||m.t==="Tin sắc phong"){const t=plain(m.h).replace(/còn [^·]* khắc/,'');if(/\d/.test(t))o.digits.push(t.slice(0,120))}
    if(m.pid==="kc2Sel"){Q.shift();S.selx.done=1;S.selx.art="";selxSelDo(mode==="ban"?0:10);close();continue}
    if(m.pid==="selxD"&&m.opts){let i=0;const nm=m.opts.map(x=>x.n);
     if(mode==="ban"&&(m.t==="Thái hậu"||m.t==="Hoàng hậu")){const tok=m.t==="Thái hậu"?"th":(liveRivals(false).find(v=>v.queen)||"th");const e=SELX_TESTS.find(x=>x.id===Z.tests[m.t==="Thái hậu"?"doidap":"hanhxu"].id);i=e.options.findIndex(x=>selxReactR(x,tok)!=="+");if(i<0)i=0}
     else{const g=nm.findIndex(s=>/^Làm quen/.test(s));if(g>=0&&Z.days!==2)i=g;else{const c=nm.findIndex(s=>/chờ tới tối|Theo|Cất đồ|Quỳ|Ngủ|Về|Nghe/.test(s));i=c>=0?c:0}}
     if(nm.some(s=>/^Tập thật kỹ/.test(s))){const k0=Z.kh;chooseM(0);o.lessonK=k0-Z.kh;o.lessonAll=(Z.girls||[]).every(v=>v.__ma!=null);close();continue}
     chooseM(i);close();continue}
    if(m.opts){chooseM(0);close();continue}closeModal();close()}
   o.seen=(Z.seen||[]).filter(x=>/^(dm|yd|kp)-/.test(x));o.met=Object.keys(Z.met||{}).length;o.dead=!!S.dead;o.fate=S.fate||"";o.rank=S.rank;o.r0=r0;o.kept=!!S.selx.kept;o.done=!!Z.done;
   o.relMoved=relBefore!==JSON.stringify((Z.keptV||[]).concat(Z.girls||[]).map(v=>v.rel||0));o.pod=(Z.pod||[]).length;o.so=(Z.rooms||[]).map(x=>x.so).join(",");out.push(o)}
  return out});
 const keep=r.filter(x=>x.mode==="keep"),ban=r.filter(x=>x.mode==="ban");
 ok(r.length>=8&&r.every(x=>!x.err),`a new tú nữ life starts DAY 1 instead of the one-card selection (${r.length} lives)`,r.filter(x=>x.err));
 ok(keep.every(x=>x.so==="dong,tay,bac"),'Dưỡng Tú viện: 3 rooms = Đông / Tây / Bắc sở',keep.map(x=>x.so));
 ok(keep.every(x=>x.days.join()==="1,2,3"&&x.titles.join("|")==="Nhập cung|Điện tuyển|Chờ chiếu"),'kept lives play day 1 → 2 → 3 with their names',keep.map(x=>[x.og,x.days,x.titles]));
 ok(r.every(x=>x.kstart.every(k=>k===16)&&x.kmin>=0),'each day starts at B4N × BAL.time.khac = 16 khắc, never below 0',r.map(x=>[x.og,x.kstart,x.kmin]));
 ok(keep.every(x=>x.lessonK>=1&&x.lessonAll),'the Tiền sảnh lesson costs khắc and every girl takes it (law 1)',keep.map(x=>[x.og,x.lessonK,x.lessonAll]));
 ok(keep.every(x=>x.seen.some(s=>/^dm-/.test(s))&&x.seen.some(s=>/^yd-/.test(s))&&x.seen.some(s=>/^kp-/.test(s))),'a drama on every day: dorm (day 1), yard (day 2), kept (day 3)',keep.map(x=>[x.og,x.seen]));
 ok(keep.every(x=>x.met>=1),'greeting: «Người lạ» become met girls',keep.map(x=>[x.og,x.met]));
 ok(keep.every(x=>x.pod===12),'the contest ranks all 12 (kit podium list)',keep.map(x=>x.pod));
 ok(keep.every(x=>x.kept&&x.done&&!x.dead&&x.rank>=Math.max(0,x.r0-1)&&x.rank<=Math.max(x.r0+1>3?Math.max(3,x.r0):x.r0+1,x.r0)),'kept → the edict on day 3: origin ±1 (cap Tần), life goes on',keep.map(x=>[x.og,x.r0,x.rank,x.kept,x.done]));
 ok(ban.every(x=>x.dead&&/ban hoa/i.test(x.fate)&&!x.days.includes(3)),'outside the top 4 → ban hoa on day 2, the life ends (no day 3)',ban.map(x=>[x.og,x.dead,x.fate,x.days]));
 ok(r.every(x=>!x.digits.length),'no digits in the scene text (VANPHONG)',r.filter(x=>x.digits.length).map(x=>x.digits));
 ok(!errs.length,'no page errors',errs);
 await b.close();console.log(bad?`${bad} FAIL`:'ALL PASS');process.exit(bad?1:0)})();
