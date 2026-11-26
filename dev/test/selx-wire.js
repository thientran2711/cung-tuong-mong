/* review/selection-scene (SELSCENE-3): the RULES core jselx WIRED into the entry flow, new lives only.
   Owner OD 23/11 ~23:25Z (±1 cap Tần), ~23:28Z (hòa thân cap Phi + high Sắc), 24/11 ~05:35Z/~05:40Z (ban hoa = the life ends, no outside road).
   Per origin, "Vào cung ngay": a new life carries S.selx2; kc2SelDo runs THE CONTEST (OD 24/11 ~06:15Z: BAL.selx.yard.n tú nữ, same tests + formula,
   top yard.kept kept): kept → origin −1 / 0 / +1 by her score (selxScore, BAL.selx), not in the top → ban hoa
   (selxBanHoa: life over, alive, origin epilogue). The selection card / Tiền truyện use the new words (no «phong tới» ceiling words).
   A save made before (S.selx without S.selx2) keeps the old ceiling rule [ceiling−2, ceiling]. Hòa thân home road (kc2EnterNc, S.kc.selx2) → selxRank.
   usage: node dev/test/selx-wire.js [index.html]  (serves dev/ through a Playwright route; run python3 dev/build/assemble.py first) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok',m)};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxSelDo==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});/* warm-up: the first start waits for the figures */
 const r=await p.evaluate(()=>{const out={rows:[],old:[],nc:null,txt:[]};const B=BAL.selx;const n0=B.noise;B.noise=0;B.days=1;/* SELSCENE-4: this test checks the one-card contest; the 3-day flow (BAL.selx.days>1) is dev/test/selx-days.js *//* no luck: exact expectations */
  const life=(og,pick)=>{for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k===og)break}if(!S||!S.origin||S.origin.k!==og)return false;S.kcPick=pick||"cung";nlAccept();return true};
  const close=()=>{try{document.querySelectorAll('.kmov,#kprevov,#kg82').forEach(x=>x.remove())}catch(e){}};
  const OR=ORIGINS.map(o=>o.k).filter(k=>k!=="cnv");
  for(const og of OR){for(const [lab,st,raw] of [["high",100,10],["mid",50,5],["low",0,0],["fourth",50,5]]){if(!life(og))continue;close();
    const sel=Q.find(m=>m.pid==="kc2Sel");if(lab==="high"){const Z=S.selx2||{};out.day1=out.day1||[];out.day1.push([og,(Z.girls||[]).length,(Z.rooms||[]).map(r=>r.so+":"+r.ids.length).join(","),!!(Z.rooms&&Z.rooms[0].ids[0]==="me")])}const r0=S.origin.r||0;const has2=!!S.selx2;
    if(sel)out.txt.push([og,/phong tới|cho tới/.test(String(sel.h)),/cao hơn, đúng bậc/.test(String(sel.h))]);
    S.sac=S.tai=S.duc=st;S.selx.art="";S.selx.done=1;const nR=liveRivals(true).length;if(lab==="fourth")S.selx2.girls=selxGirls().map((v,i)=>Object.assign(v,{__sc:i<BAL.selx.yard.kept-1?999:-999}));/* three girls above her, the rest below: she is the last kept place */
    kc2SelDo(raw);const X=S.selx,Z=S.selx2||{};const row={og,lab,r0,has2,sc:X.sc,place:X.place,kept:X.kept,step:X.step,rank:S.rank,dead:!!S.dead,cap:selxHoaThan(og)?B.hoaThanCap:B.cap,fate:S.fate||"",why:X.why||""};
    const pod=Z.pod||[];row.pod=pod.length;row.npcIn=liveRivals(true).length-nR;row.out=(Z.out||[]).length;
    /* the contest: yard.n ranked, top yard.kept kept (her by her place), the other kept girls enter the palace, the ban hoa girls stay as records */
    const podOk=pod.length===B.yard.n&&pod.filter(x=>x.kept).length===B.yard.kept&&pod.every((x,i)=>!i||pod[i-1].sc>=x.sc)&&(X.kept===(X.place<=B.yard.kept));
    const npcOk=(row.npcIn+(Z.out||[]).filter(x=>x.kept).length)===B.yard.kept-(X.kept?1:0)&&(Z.out||[]).filter(x=>x.ban).length===B.yard.n-B.yard.kept-(X.kept?0:1);
    row.ok=has2&&podOk&&npcOk&&(X.kept?(!S.dead&&S.rank===selxRank(S,X.step,{k:og,r0})&&Math.abs(S.rank-r0)<=1):(S.dead&&/ban hoa/i.test(row.fate)));out.rows.push(row);close()}}
  /* old save: S.selx without S.selx2 keeps the ceiling rule */
  for(const og of ["tt","muoi"]){if(!life(og))continue;close();delete S.selx2;S.selx.art="";S.selx.done=1;const top=S.origin.r||0;kc2SelDo(0);out.old.push({og,top,rank:S.rank,dead:!!S.dead,ok:!S.dead&&S.rank<=top&&S.rank>=Math.max(0,top-2)});close()}
  /* hòa thân home road: kc2EnterNc on S.kc.selx2 → selxRank (cap Phi, +1 needs Sắc) */
  try{if(life("nc","nha")){close();const K=S.kc;out.nc={kd:K&&K.kd,selx2:K&&K.selx2};if(K&&K.kd==="nc"){const r0=S.origin.r||0;S.sac=B.hoaThanSac;K.ex={art:"",play:1};kc2Enter(10);const t=K.ex.tier;
     Object.assign(out.nc,{r0,tier:t,rank:S.rank,want:selxRank(S,t-1,{k:"nc",r0}),card:String((Q.find(m=>m.t==="Nhập cung")||{}).h||"").replace(/<[^>]+>/g,"").slice(0,200)})}}}catch(e){out.nc={err:String(e).slice(0,200)}}
  B.noise=n0;return out});
 for(const x of r.rows)ok(x.ok,`${x.og} ${x.lab}: score ${x.sc}, place ${x.place}/${x.pod} → ${x.kept?`step ${x.step}, ${x.r0}→${x.rank}`:`ban hoa (${x.fate})`} · girls in ${x.npcIn}, records ${x.out}${x.why?` · «${x.why}»`:''}`);
 ok(r.rows.length>=24,`origins × 4 results played (${r.rows.length})`);
 ok(r.rows.some(x=>x.kept&&x.step===1&&x.rank>x.r0),'a good result lifts one rank above the origin');ok(r.rows.some(x=>x.kept&&x.step===-1&&x.rank<x.r0),'a poor result drops one rank');
 ok(r.rows.some(x=>!x.kept&&x.dead),'a very poor result = ban hoa, the life ends');ok(r.rows.filter(x=>x.kept).every(x=>x.rank<=Math.max(x.r0,x.cap)),'no rank above the cap');
 ok(r.txt.length&&r.txt.every(x=>!x[1]&&x[2]),`selection card: new words, no ceiling words ${JSON.stringify(r.txt.filter(x=>x[1]||!x[2]))}`);
 for(const x of r.old)ok(x.ok,`old save (${x.og}): ceiling rule kept, top ${x.top} → ${x.rank}`);
 ok(r.nc&&r.nc.selx2&&r.nc.rank===r.nc.want,`hòa thân home road on selxRank ${JSON.stringify(r.nc)}`);
 ok(r.day1&&r.day1.every(x=>x[1]===BAL_N-1&&x[2]==="dong:4,tay:4,bac:4"&&x[3]),`day 1: the 11 other tú nữ exist from the start, 3 rooms of 4 in Dưỡng Tú viện (Đông / Tây / Bắc sở), her room first ${JSON.stringify((r.day1||[]).slice(0,2))}`);
 ok(!errs.length,`no page errors ${JSON.stringify(errs.slice(0,3))}`);await b.close();console.log(bad?`FAILED ${bad}`:'ALL PASS');process.exit(bad?1:0)})();
const BAL_N=12;/* BAL.selx.yard.n, mirrored for the node-side check; the page check reads BAL */
