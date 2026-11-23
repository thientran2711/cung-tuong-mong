/* D8 poison road (jpq) — topic tests in the real build (dev/index.html; run python3 dev/build/assemble.py first).
   Each motive road + the caught / success / inquest paths, NPC two-way, co-op gate, the her-card rows, old save (no S.pq).
   Odds are forced (success = pqOdds result set to 0 / 100, BAL.odds.hi lifted; BAL.pq clamps caught.lo/hi, inq.lo/hi, vg.lo/hi) so every path is deterministic.
   usage: node dev/test/poison-road.js   → exit 1 on any failed check */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const R=path.resolve(__dirname,'../..');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await ctx.route('http://ts.local/**',r=>{const f=R+decodeURIComponent(new URL(r.request().url()).pathname);if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:120000});await p.waitForTimeout(2500);
 const res=await p.evaluate(()=>{const out=[];const ok=(n,c,x)=>out.push({n,ok:!!c,x:x==null?"":String(x).replace(/<[^>]+>/g,"").slice(0,160)});
  const B0=JSON.parse(JSON.stringify(BAL.pq)),OD0=JSON.parse(JSON.stringify(BAL.odds));let FH=null;const pqO0=pqOdds;pqOdds=function(){const X=pqO0.apply(this,arguments);if(FH!=null)X.o=FH;return X};/* a forced hit / miss sets the success odds exactly */
  const reset=()=>{FH=null;BAL.pq=JSON.parse(JSON.stringify(B0));Object.assign(BAL.odds,JSON.parse(JSON.stringify(OD0)))};
  const force=(o)=>{reset();BAL.odds.hi=100;/* forced paths: lift the top of the one ODDS CAP (j1 roll) so 100 is exact */if(o.hit!=null)FH=o.hit?100:0;if(o.cp!=null){BAL.pq.caught.lo=BAL.pq.caught.hi=o.cp?100:0}if(o.inq!=null){BAL.pq.inq.lo=BAL.pq.inq.hi=o.inq?100:0}if(o.vg!=null){BAL.pq.vg.lo=BAL.pq.vg.hi=o.vg?100:0}};
  let END=null;const o0=over;over=function(h,t,fate,alive){END={h,fate:String(fate),t:String(t).replace(/<[^>]+>/g,""),alive:!!alive};return o0.apply(this,arguments)};
  const life=()=>{SLOT=3;try{store.set(NL_KEY,null)}catch(e){}END=null;start();Q.length=0;S.tho=999;S.suc=90;S.bac=200;S.rank=Math.max(S.rank,2);S.mort=S.mort||{};delete S.pq;
   if(S.thDead){S.thDead=false;S.th=0}S.thO=S.thO||{};S.thO.tho=999;S.emp.tho=999;S.inv=S.inv.filter(e=>!["hacdinh","docngam"].includes(e.k))};
  const arm=(k)=>{S.inv.push({k:k||"hacdinh"});S.inv.push({k:"yensao"});return S.inv.findIndex(e=>e.k==="yensao")};
  const hate=()=>{S.sung=5;S.an=0};const harsh=()=>{thArch();S.thO.arch="nghiem";S.th=-40};
  const vgMan=()=>{menInit();const m=S.men.find(x=>x.role==="Vương gia");m.alive=true;m.tinh=80;S.vgAlly=m.id;return m};
  const tick=(n)=>{let ev="";for(let i=0;i<n&&!S.dead;i++){try{ev+=monthTick()}catch(e){ev+="ERR "+e}Q.length=0}return ev};
  /* 1. gates */
  life();S.sung=60;S.an=40;ok("gate emp closed by default",!pqMotive(S,"emp").ok,pqMotive(S,"emp").miss);
  hate();ok("gate emp hate opens",pqMotive(S,"emp").road==="hate");
  S.sung=60;S.an=40;const m=vgMan();ok("gate emp vg opens",pqMotive(S,"emp").road==="vg");m.tinh=BAL.tinhLv.ally-1;ok("gate emp vg needs tình ý",!pqMotive(S,"emp").ok);S.vgAlly=null;
  thArch();S.thO.arch="tuai";S.th=-60;ok("gate th closed for a kind Thái hậu",!pqMotive(S,"th").ok,pqMotive(S,"th").miss);
  harsh();ok("gate th harsh opens",pqMotive(S,"th").road==="harsh");S.th=BAL.pq.gate.th+1;ok("gate th needs low regard",!pqMotive(S,"th").ok);
  COOPW.on=true;const co=pqMotive(S,"emp");COOPW.on=false;ok("co-op: Emperor never offered",!co.ok,co.miss);
  /* 2. her card rows (jpoison picker) */
  life();let ix=arm("hacdinh");S.sung=60;S.an=40;let d=mkP("pgpick",{ix});let rows=d.o.filter(o=>/dâng (Hoàng thượng|Thái hậu)/.test(o.n));
  ok("picker: 2 royal rows (one per target)",rows.length===2,rows.map(o=>o.n).join(" | "));ok("picker: closed rows say why",rows.every(o=>o.off&&o.off.why),rows.map(o=>o.off&&o.off.why).join(" | "));
  hate();d=mkP("pgpick",{ix});rows=d.o.filter(o=>/dâng Hoàng thượng/.test(o.n));ok("picker: hate opens the Emperor row",rows.length&&!rows[0].off,rows[0]&&rows[0].x);
  ok("picker: odds word, no %",rows[0]&&!/%/.test(rows[0].x)&&/Liều|Khó|Tùy duyên|Khá chắc/.test(rows[0].x),rows[0]&&rows[0].x);
  ok("picker: Vì sao lists the 3 royal checks",(()=>{const F=rows[0].why().map(x=>x[0]).join("|");return /nếm thử/.test(F)&&/hai lượt/.test(F)&&/Đũa bạc/.test(F)})());
  ok("picker: intro text says royal needs a cause",/có nguyên cớ/.test(d.t),d.t);
  /* 3. Emperor · hate · caught → Ban chết + house */
  life();ix=arm();hate();force({hit:0,cp:1});const c=tdHouse(S);const pw0=c?tdPow(c):null;let r=pqGive(S,"emp",ix,"hacdinh");
  ok("emp caught → dead",S.dead&&END&&/Ban chết vì mưu hại Hoàng thượng/.test(END.fate),END&&END.fate);ok("emp caught → house falls",END&&/liên lụy|tra xét/.test(END.t)&&(!c||tdPow(c)<pw0),END&&END.t);
  /* 4. Emperor · hate · fail not traced → alert */
  life();ix=arm();hate();force({hit:0,cp:0});S.duc=50;const duc0=S.duc;r=pqGive(S,"emp",ix,"hacdinh");const duc1=S.duc;ok("emp fail untraced → alive + kitchens alert",!S.dead&&S.pq.alert===BAL.pq.guard.alertMo,r);
  ok("Đức cost applied once (= −BAL.pq.duc)",duc1===duc0-BAL.pq.duc,duc0+" → "+duc1);ok("poison + dish used up",!S.inv.some(e=>e.k==="hacdinh")&&!S.inv.some(e=>e.k==="yensao"));
  /* 5. Emperor · hate · success → dies next month → inquest exposed */
  life();ix=arm();hate();force({hit:1,inq:1});r=pqGive(S,"emp",ix,"hacdinh");ok("emp hit → death due",S.mort.empDue&&S.pq.done,r);tick(1);
  ok("emp hit + inquest exposed → Ban chết",S.dead&&END&&/mưu hại Hoàng thượng/.test(END.fate),END&&END.t);
  /* 6. Emperor · hate · success · inquest clean → existing succession flow */
  life();ix=arm();hate();force({hit:1,inq:0});pqGive(S,"emp",ix,"hacdinh");tick(1);
  ok("emp hit + clean → existing fate (Thái phi / xuất gia / …)",S.dead&&END&&!/mưu hại/.test(END.fate)&&/băng hà/.test(END.t),END&&(END.h+" · "+END.fate));
  /* 7. Emperor · Vương gia road → throne won / lost */
  life();ix=arm();S.sung=60;S.an=40;vgMan();S.heir=null;force({hit:1,inq:0,vg:1});pqGive(S,"emp",ix,"hacdinh");tick(1);
  ok("vg road: throne → Quý phi of the new Emperor",END&&/Vương gia đăng cơ/.test(END.fate)&&END.alive,END&&END.fate);
  life();ix=arm();S.sung=60;S.an=40;vgMan();S.heir=null;force({hit:1,inq:0,vg:0});pqGive(S,"emp",ix,"hacdinh");tick(1);
  ok("vg road: coup fails → Ban chết",END&&/mưu hại Hoàng thượng/.test(END.fate)&&!END.alive,END&&END.t);
  /* 8. Emperor · slow poison → lifespan cut */
  life();ix=arm("docngam");hate();force({hit:1});S.emp.tho=S.emp.age+20;const t0=S.emp.tho;pqGive(S,"emp",ix,"docngam");ok("emp slow → thọ −slowCut",S.emp.tho===t0-BAL.pq.slowCut&&S.pq.slow&&!S.dead,S.emp.tho+" vs "+t0);
  /* 9. Thái hậu · harsh · success → dies, inquest window (clean / exposed) */
  life();ix=arm();harsh();force({hit:1,inq:0});r=pqGive(S,"th",ix,"hacdinh");ok("th hit → Thái hậu băng hà",S.thDead,r);const ev9=tick(BAL.pq.inq.mo+1);
  ok("th clean inquest closes, she lives",!S.dead&&!S.pq.inq&&/khép lại/.test(ev9),ev9.replace(/<[^>]+>/g,"").slice(-160));
  life();ix=arm();harsh();force({hit:1,inq:1});pqGive(S,"th",ix,"hacdinh");tick(BAL.pq.inq.mo+1);ok("th exposed → Ban chết",S.dead&&END&&/mưu hại Thái hậu/.test(END.fate),END&&END.t);
  life();ix=arm();harsh();force({hit:0,cp:1});pqGive(S,"th",ix,"hacdinh");ok("th caught → Ban chết",S.dead&&END&&/mưu hại Thái hậu/.test(END.fate));
  life();ix=arm("docngam");harsh();force({hit:1,inq:0});S.thO.tho=(S.thAge||60)+20;const tt=S.thO.tho;pqGive(S,"th",ix,"docngam");ok("th slow → thọ −slowCut",S.thO.tho===tt-BAL.pq.slowCut,S.thO.tho+" vs "+tt);
  /* 10. closed gate → the act refuses */
  life();ix=arm();S.sung=60;S.an=40;force({hit:1});ok("closed gate: act does nothing",pqGive(S,"emp",ix,"hacdinh")===""&&!S.mort.empDue);
  /* 11. NPC two-way: same gate, same consequences */
  life();let v=liveRivals(false)[0];v.sung=0;v.an=0;v.inv=(v.inv||[]).concat([{k:"hacdinh"},{k:"yensao"}]);force({hit:0,cp:1});BAL.pq.npc.try=1000;
  const pW0=persW;const wOn=x=>{persW=(p,k)=>k==="pgift"&&p===x?1:pW0(p,k)};const wOff=()=>{persW=pW0};
  wOn(v);r=pqNpc(v);wOff();ok("NPC caught → NPC dies + house",!!r&&!v.alive&&/mưu hại Hoàng thượng/.test(r),r);
  life();v=liveRivals(false)[0];v.sung=0;v.an=0;v.inv=(v.inv||[]).concat([{k:"hacdinh"},{k:"yensao"}]);force({hit:1,inq:1});BAL.pq.npc.try=1000;wOn(v);r=pqNpc(v);wOff();
  const due=!!S.mort.empDue;tick(1);ok("NPC hit → Emperor dies, inquest names the NPC",!!r&&due&&S.dead&&!v.alive,END&&END.t);
  life();v=liveRivals(false)[0];v.sung=0;v.an=0;v.inv=(v.inv||[]).concat([{k:"hacdinh"},{k:"yensao"}]);reset();BAL.pq.npc.try=1000;pqS().cd=5;ok("NPC cooldown blocks a second try",pqNpc(v)==="");
  /* 12. old save: no S.pq → month runs, card opens */
  life();delete S.pq;let e12="";try{tick(1);mkP("pgpick",{ix:arm()})}catch(x){e12=String(x)}ok("old save without S.pq",!e12&&S.pq,e12);
  reset();pqOdds=pqO0;return out});
 let fail=0;for(const r of res){if(!r.ok)fail++;console.log((r.ok?"PASS ":"FAIL ")+r.n+(r.x?"  · "+r.x:""))}
 const pe=errs.filter(e=>!/ResizeObserver|Failed to fetch|NetworkError|Load failed/.test(e));if(pe.length){fail++;console.log("PAGE ERRORS",pe.slice(0,5))}
 console.log(`poison-road: ${res.length-fail+(pe.length?1:0)}/${res.length} PASS${fail?` · ${fail} FAIL`:""}`);await b.close();process.exit(fail?1:0)})();
