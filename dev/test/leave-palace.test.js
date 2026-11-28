/* LEAVE-THE-PALACE = ENDING test (owner OD 24/11 ~06:05Z; review/leave-palace; audit table dev/handover/reports/leave-palace.md).
   1. TABLE (from the audit): every leave ending the game can call — same h / fate / alive as its call site — ends the life (S.dead) on the ONE end
      card and carries the «Về sau» passage + rows of its kind; every inside-the-palace / death ending carries none.
   2. REAL PATHS: the j24 «Vương gia che chở» emperorDies road, the servant «Vào vương phủ» card (PEND.cnvPrince go), the Tiểu thư ngoài cung ending
      (jkc kcEndDo, before entry → no «Về sau»), the jmort reign-end xuất gia.
   3. VARIETY: partner classes × children in the palace × age → texts differ, numbers inside BAL.leave bounds, tu = no children, «Tuổi già» only from BAL.leave.old.
   usage: node dev/test/leave-palace.test.js [index.html]   → exit 1 on FAIL or page error */
const {chromium}=require('playwright');const path=require('path');
const HTML=path.resolve(process.argv[2]||path.join(__dirname,'../../index.html'));
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(c||x===undefined?'':' '+JSON.stringify(x).slice(0,600)))};
/* [h, fate, alive, expected kind ("" = no «Về sau»), call site] — {m} = a real vương gia / thị vệ of S.men */
const T=[
 ["Xuất gia","Xuất gia",undefined,"tu","j14.js:21 lãnh cung → xuất gia"],
 ["Được Vương gia che chở","Vương gia che chở",true,"thiep","j24.js:56"],
 ["Ma ma","Làm ma ma đến già",true,"que","j42.js:302"],
 ["Xuất cung","Xuất cung tuổi 30",undefined,"que","j42.js:303"],
 ["Xuất giá","Được ban gả cho Tham tướng cấm quân họ Lục",true,"hon","j42.js:435 PEND.cnvWed"],
 ["Xuất cung","Xuất cung, mở tiệm nhỏ ở kinh thành",true,"que","j42.js:438 PEND.cnvAge"],
 ["Bị đuổi khỏi cung","Bị đuổi khỏi cung vì mang thai",true,"duoi","j42.js:560"],
 ["Bị đuổi khỏi cung","Bị đuổi khỏi cung vì tư tình",true,"duoi","j42.js:562"],
 ["Được ban hôn","Được Thái hậu ban hôn cho {t}",true,"hon","j42.js:611 PEND.cnvGrant"],
 ["Vào vương phủ","Làm thiếp của {m}",true,"thiep","j42.js:615 PEND.cnvPrince"],
 ["Thành thân","Xuất cung thành thân với {t}",true,"hon","j42.js:618/619"],
 ["Cao chạy xa bay","Giả chết, rời cung cùng {t}",true,"tron","j96.js:98"],
 ["Nữ vương Cao Ly","Về cố quốc lên ngôi nữ vương",true,"vuong","j97.js:280 rare exit"],
 ["Cao chạy xa bay","Trốn khỏi cung cùng {t}",true,"tron","jroute.js:172 with him"],
 ["Trốn khỏi cung","Trốn khỏi cung",true,"tron1","jroute.js:172 alone"],
 ["Dâng biểu xuất gia","Xuất gia",true,"tu","jroute.js:182"],
 ["Được ban hôn","Được ban hôn cho {m}",true,"thiep","jroute.js:190"],
 ["Xuất cung về quê","Xuất cung về quê",true,"que","jroute.js:194"],
 ["Phế làm thứ dân","Phế làm thứ dân, xuất cung",true,"dan","jroute.js:197"],
 ["Thái phi","Thái phi theo con ra phủ",true,"phu","jmort.js:195"],
 ["Xuất cung","Xuất cung về quê",true,"que","jmort.js:196 ân xá"],
 ["Xuất gia","Xuất gia làm ni cô",true,"tu","jmort.js:197 Cảm Nghiệp"],
 /* inside the palace / death: no «Về sau» */
 ["Lãnh cung","Phát điên trong lãnh cung",true,"","j14.js:40"],
 ["Lãnh cung","Tuổi xuân qua đi",true,"","j3.js:146"],
 ["Thái phi","Thành Thái phi",true,"","j3.js:157"],
 ["Hoàng thái hậu","Lên ngôi Thái hậu",true,"","j3.js:158"],
 ["Hồng nhan bạc mệnh","Khó sinh",undefined,"","j3.js:167 die()"],
 ["Tư thông bị phát giác","Ban chết: tư thông bại lộ",undefined,"","j30.js:25"],
 ["Ban chết","Ban chết vì mưu hại Hoàng hậu",false,"","jpq.js:72"],
 ["Tân đế đăng cơ","Tân đế đón vào hậu cung mới",true,"","jpq.js:107"],
 ["Một đời an nhiên","Một đời an nhiên trong cung",true,"","jroute.js:253"],
 ["Tuẫn táng","Tuẫn táng theo tiên đế",false,"","jmort.js:191"]];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('file://'+HTML,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const fresh=async()=>p.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;quiet=true;start();quiet=false;
  await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});if(S.kc)S.kc.inPal=1;if(typeof menInit==='function')menInit();return S.name});
 await fresh();
 /* 1. table */
 const out=await p.evaluate(T=>{const snap=JSON.stringify(ser());const R=[];
  for(const [h,f,al,k,site] of T){deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;if(S.kc)S.kc.inPal=1;
   const m=(S.men||[]).find(x=>x.rw==="vương gia"),th=(S.men||[]).find(x=>x.rw==="thị vệ");
   const fate=f.replace("{m}",m.name).replace("{t}",th.name),t=`${S.name} ${fate}.`;
   over(h,t,fate,al);const html=(Q[0]&&Q[0].h)||"";R.push({site,k,got:S.lvEp?S.lvEp.k:"",dead:!!S.dead,card:!!(Q[0]&&Q[0].kend),after:/kend-after/.test(html)&&/Về sau/.test(html),ep:S.lvEp,partner:S.lvEp&&S.lvEp.m,want:/\{[mt]\}/.test(f)?(f.includes("{m}")?m.name:th.name):""})}
  deser(JSON.parse(snap));Q.length=0;return R},T);
 for(const r of out){ok(r.dead&&r.card,`${r.site}: life ends on the «Kiếp này» end card`,r);
  ok(r.got===r.k&&r.after===!!r.k,`${r.site}: «Về sau» ${r.k?`kind ${r.k}`:"absent (inside the palace / death)"}`,{got:r.got,after:r.after});
  if(r.k&&r.ep){const e=r.ep;ok(e.age>0&&e.cl&&e.txt.length>40&&/Năm \d+ tuổi/.test(e.txt),`${r.site}: states age at death, cause, children`,e);
   if(r.want)ok(r.partner===r.want&&e.net.length===3,`${r.site}: partner = the real man, with his 3 real nết`,{p:r.partner,net:e.net})}}
 /* 2. real paths */
 await fresh();
 const real=await p.evaluate(()=>{const snap=JSON.stringify(ser());const R={};
  /* j24: a vương gia ally shelters her when the Emperor dies */
  const m=S.men.find(x=>x.rw==="vương gia");m.tinh=100;S.vgAlly=m.id;S.heir=null;S.rank=Math.min(S.rank,3);try{emperorDies()}catch(e){R.e24=e.message}
  R.j24={dead:!!S.dead,k:S.lvEp&&S.lvEp.k,m:S.lvEp&&S.lvEp.m,want:m.name};
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;
  /* servant card «Theo về vương phủ» (PEND.cnvPrince) when she is a maid life */
  try{if(typeof isSrv==="function"){const d=PEND.cnvPrince({m:m.id});R.prince=d?"card":"no card (not a maid life)";if(d){d.o[0].go();R.princeK=S.lvEp&&S.lvEp.k}}}catch(e){R.prince="err "+e.message}
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;
  /* Tiểu thư ngoài cung (before entry): her home-road endings keep their own words, no «Về sau» */
  S.kc=S.kc||{};const inP=S.kc.inPal;S.kc.inPal=0;over("Xuất gia","Nàng cắt tóc ở chùa Hộ Quốc.","Xuất gia");R.kc={dead:!!S.dead,ep:!!S.lvEp};S.kc.inPal=inP;
  deser(JSON.parse(snap));Q.length=0;return R});
 ok(real.j24.dead&&real.j24.k==="thiep"&&real.j24.m===real.j24.want,'real path j24 emperorDies → Vương gia che chở → «Về sau» with HIM',real);
 ok(real.prince==="no card (not a maid life)"||real.princeK==="thiep",'real path PEND.cnvPrince «Theo về vương phủ» → «Về sau» thiep',real);
 /* every Đại kết cục summit (GE_CAT): leaving the palace (Ngã rẽ 1 rời cung / theo người, or a leave summit) closes the life with «Về sau»; the rest keep her (no «Về sau») */
 const ge=await p.evaluate(()=>{const snap=JSON.stringify(ser());const R={n:0,bad:[]};
  for(const b in GE_CAT){if(!GE_DATA[b])continue;GE_CAT[b].e.forEach((e,i)=>{deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;
   const leave=(BAL.ge.exitFork||[]).includes(e[3])||["FREE","NUN","FOLLOW","NV","REUNION"].includes(e[5]);
   S.ge={b,res:{ok:true,i,ti:e[6],sh:"t",fx:{}}};let ex;try{const d=PEND.geR();ex=d.o[0].x;d.o[0].go()}catch(er){R.bad.push([b,i,"err",er.message]);return}R.n++;
   if(leave&&!(S.dead&&S.lvEp))R.bad.push([b,i,e[0],e[5],"fork "+e[3],"leaves but no ending/«Về sau»",ex]);
   if(!leave&&S.lvEp)R.bad.push([b,i,e[0],e[5],"stays but got «Về sau»",S.lvEp.k])})}
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;S.ge=null;return R});
 ok(ge.n>100&&!ge.bad.length,`Đại kết cục: every summit that leaves the palace ends the life with «Về sau», none that stays (${ge.n} summits)`,ge.bad.slice(0,8));
 ok(real.kc.dead&&!real.kc.ep,'Tiểu thư ngoài cung ending (before entry) → no «Về sau»',real.kc);
 /* 3. variety */
 const v=await p.evaluate(()=>{const B=BAL.leave,R={bad:[],byCls:{}};const snap=JSON.stringify(ser());
  const NETS={chung:["Ân cần","Trọng nghĩa","An phận"],datinh:["Nhiều chuyện","Xảo quyệt","Ham vui"],quyen:["Kín đáo","Ham lợi","Tham vọng"],bao:["Nóng nảy","Thù dai","Thực tế"],lanh:["Lạnh lùng","Thanh liêm","Ham học"]};
  for(const c in NETS)for(const age of [17,26,38,50])for(const kids of [0,2]){const T=[];
   for(let i=0;i<16;i++){deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;S.age=age;
    if(kids){for(let j=0;j<kids;j++){try{S.kids.push({name:"Tiểu "+j,alive:true,sex:j?"f":"m",age:2,father:"emp"})}catch(e){}}}
    const m={name:"Vương gia Thử Nghiệm "+c,sex:"m",kind:"man",net:NETS[c]};lpvNext("thiep",m);over("Được ban hôn",`Thánh chỉ ban ${S.name} cho ${m.name}.`,`Được ban hôn cho ${m.name}`,true);
    const e=S.lvEp;if(!e){R.bad.push(["no ep",c,age]);continue}T.push(e.txt);
    if(e.cls!==c)R.bad.push(["cls",c,e.cls,e.net]);if(e.age<=age||e.age>B.maxAge)R.bad.push(["age",c,age,e.age]);
    if(e.cause==="gia"&&e.age<B.old)R.bad.push(["gia young",e.age]);if(e.kids<0||e.kids>B.kids.thiep[1]+1)R.bad.push(["kids",e.kids])}
   const k=c+"|"+age+"|"+kids;R.byCls[k]=new Set(T).size}
  deser(JSON.parse(snap));Q.length=0;S.dead=false;
  const tu=[];R.tuCc=0;for(let i=0;i<40;i++){S.dead=false;S.lvEp=null;Q.length=0;over("Dâng biểu xuất gia","x","Xuất gia",true);tu.push(S.lvEp.kids);if(!(mySons().length+myDaus().length)&&/con cháu/.test(S.lvEp.txt))R.tuCc++}R.tuKids=Math.max(...tu);
  deser(JSON.parse(snap));Q.length=0;R.byCls=Object.entries(R.byCls);return R});
 ok(!v.bad.length,'variety: class read from his nết, age inside (her age, BAL.leave.maxAge], «Tuổi già» only from BAL.leave.old, children inside BAL',v.bad.slice(0,6));
 const low=v.byCls.filter(([,n])=>n<10);ok(!low.length,'variety: 16 lives with the same partner class read differently (≥10 distinct passages in every class × age × children cell)',low.slice(0,6));
 ok(v.tuKids===0,'xuất gia: no children after',v.tuKids);
 ok(v.tuCc===0,'xuất gia with no children anywhere: never «con cháu quây quần» at death (40 lives)',v.tuCc);
 /* 4. NO CONFIRM (owner OD 24/11 ~07:25Z): her own choice to leave = done at once. Family: xgConfirm gone; the lãnh cung «Xuất gia» act ends at once;
    the one-per-life death warning (jkiep kpGate) does not stop a «giả chết» LEAVE choice; no «(sẽ hỏi lại)» anywhere in the build */
 const nc=await p.evaluate(()=>{const snap=JSON.stringify(ser());const R={xg:typeof xgConfirm};
  Q.length=0;S.dead=false;S.lvEp=null;if(S.kc)S.kc.inPal=1;cold("Thử");Q.length=0;const a=coldActs().find(x=>x.n==="Xuất gia");R.act=!!a;R.actX=a&&a.x;
  if(a){a.go();R.dead=!!S.dead;R.fate=S.fate;R.q=Q.map(m=>m&&(m.kend?"Kiếp này":m.t));R.k=S.lvEp&&S.lvEp.k}
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;
  /* kpGate on every own-choice leave option text (both «giả chết» leave choices + a plain one), and one real death word as the control */
  const G=[["✦ Giả chết, theo chàng rời cung","kết thúc kiếp này"],["Xin thuốc giả chết","ra khỏi cung · kết thúc kiếp này"],["Tìm một bài thuốc giả chết",""],["Xuất gia","kết thúc kiếp này, yên ổn"]];R.gate=[];
  const free=!kpCheck();for(const [n,x] of G){S.kpWarn=0;const m={t:"thử",opts:[{n,x,fx:{}}]};Q.length=0;Q.push(m);const w=window.kpGate(0);R.gate.push([n,w]);Q.length=0}
  /* E74 (owner OD 24/11 ~08:40Z, MAIN 119 08:06Z): no re-ask after a game tap — no word gate on any option text, death words and idioms alike */
  R.ctl=[];for(const n of ["Tự vẫn","Ta sợ chết khiếp","Để lời đồn tự chết","Uống chén rượu độc"]){S.kpWarn=0;const m={t:"thử",opts:[{n,x:"hỏng: tội chết",fx:{}}]};Q.length=0;Q.push(m);R.ctl.push([n,window.kpGate(0)]);Q.length=0}R.free=free;
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;return R});
 ok(nc.xg==="undefined",'no-confirm: xgConfirm («Xuất gia?» card) is gone',nc.xg);
 ok(nc.act&&nc.dead&&nc.fate==="Xuất gia"&&!nc.q.includes("Xuất gia?")&&nc.q[0]==="Kiếp này"&&!/hỏi lại/.test(nc.actX)&&nc.k==="tu",'no-confirm: lãnh cung «Xuất gia» ends the life at once (end card first, no confirm card, «Về sau» tu)',nc);
 ok(nc.gate.every(([,w])=>!w),'no-confirm: kpGate never stops an own-choice leave option («giả chết» = leaving, not death)',nc.gate);
 ok(nc.ctl.every(([,w])=>w===false),'E74 no re-ask: no «Kiếp này chưa trọn» card after tapping any option, death words or idioms (OD 24/11 ~08:40Z; MAIN 119)',nc.ctl);
{const SRC0=require('fs').readFileSync(HTML,'utf8');ok(!/tự vẫn\|tự tận\|tự sát\|chết\|bị giết\|rượu độc/.test(SRC0)&&/Kiếp dở dang:/.test(SRC0),'E74 family scan: the word regex is gone from the build; the consequence still shows after (end card «Kiếp dở dang»)',0)}
 const fs=require('fs');const SRC=fs.readFileSync(HTML,'utf8');
 ok(!/xgConfirm\(/.test(SRC)&&!/sẽ hỏi lại/.test(SRC),'no-confirm family scan: no xgConfirm( call and no «(sẽ hỏi lại)» left in the build');
 /* 5. TRẢ THẺ BÀI (MAIN 117 05:07Z): a NEW tiểu thư life whose tablet is returned → every way out ends the life with «Về sau» (kind, the real man + his nết,
    no palace lines); an OLD save (no S.kc.lv) keeps today's card */
 const kc=await p.evaluate(async()=>{const R={tries:0,rows:[]};
  for(let i=0;i<80;i++){R.tries++;try{localStorage.clear()}catch(e){}quiet=true;start();quiet=false;await new Promise(r=>setTimeout(r,30));
   if(S&&!S.srv&&!(typeof isSrv==="function"&&isSrv())&&kcOk(S.origin.k)){if(!S.kc){kcInit();Q.length=0}break}}
  if(!(S&&S.kc&&!S.kc.inPal))return{err:"no tiểu thư life in 80 starts",o:S&&S.origin&&S.origin.k};
  R.lv=S.kc.lv;const snap=JSON.stringify(ser());
  const run=(lab,f,old)=>{deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;if(old)delete S.kc.lv;let e=null;try{f()}catch(er){e=er.message}
   const c=Q.find(m=>m&&m.kend),h=(c&&c.h)||"";R.rows.push({lab,e,dead:!!S.dead,fate:S.fate,ep:S.lvEp,after:/Về sau/.test(h),chet:/Chết vì|Mệnh tận/.test(h),pal:S.lvEp?LPV_PAL.test(S.lvEp.txt):false})};
  const opt=(i)=>{const d=kcTraveD();R.n=d.o.map(o=>o.n);d.o[i].go()};
  run("gả",()=>opt(0));R.suit=S.kc.suit&&S.kc.suit[0]&&S.kc.suit[0].n;
  run("dạy chữ (Tài 70)",()=>{S.tai=70;opt(1)});
  run("xuất gia",()=>opt(2));
  run("✦ hòa thân",()=>{kcTraveD();kcEnd("kcR5")});
  run("gả · đa tình thám hoa",()=>{S.kc.suit=[{n:"Thám hoa khoa này",k:"than",q:60,net:["Nhiều chuyện","Xảo quyệt","Ham vui"]}];S.kgt=0;opt(0)});R.dt=(Q.find(m=>m&&m.kend)||{}).h||"";
  run("gả · một lòng thám hoa",()=>{S.kc.suit=[{n:"Thám hoa khoa này",k:"than",q:60,net:["Ân cần","Trọng nghĩa","An phận"]}];S.kgt=0;opt(0)});R.ch=(Q.find(m=>m&&m.kend)||{}).h||"";
  run("old save: gả",()=>opt(0),true);
  run("no tablet returned (home road ending before Điện tuyển)",()=>{S.kc.trv=0;kcEnd("tu")});
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;return R});
 if(kc.err)ok(false,'Trả thẻ bài: a tiểu thư life',kc);else{const by=l=>kc.rows.find(r=>r.lab===l)||{};
  ok(kc.lv===1,'Trả thẻ bài: a NEW tiểu thư life is marked (S.kc.lv)',kc.lv);
  const g=by("gả");ok(g.dead&&g.after&&!g.chet&&g.ep&&["hon","thiep"].includes(g.ep.k)&&g.ep.m===kc.suit&&g.ep.net.length===3&&!g.pal,'Trả thẻ bài · gả: ending + «Về sau» with HIM (the suitor, his 3 nết), «Kết cục» not «Chết vì», no palace line',g);
  const d=by("dạy chữ (Tài 70)");ok(d.dead&&d.after&&d.ep&&d.ep.k==="day"&&d.ep.kids===0&&!d.pal,'Trả thẻ bài · ở vậy dạy chữ: ending + «Về sau» day, no children',d);
  const t=by("xuất gia");ok(t.dead&&t.after&&t.ep&&t.ep.k==="tu"&&t.ep.kids===0&&!t.pal,'Trả thẻ bài · xuất gia: ending + «Về sau» tu',t);
  const h=by("✦ hòa thân");ok(h.dead&&h.after&&h.ep&&h.ep.k==="hoa"&&!h.pal,'Trả thẻ bài · ✦ hòa thân: ending + «Về sau» hoa',h);
  const dt=by("gả · đa tình thám hoa"),chg=by("gả · một lòng thám hoa");
  ok(dt.fate==="Vợ quan thanh liêm"&&dt.ep&&dt.ep.cls==="datinh"&&!/thương nàng suốt đời/.test(kc.dt)&&chg.ep&&chg.ep.cls==="chung"&&/thương nàng suốt đời/.test(kc.ch),'Trả thẻ bài · the fixed «chồng thương nàng suốt đời» line follows HIS real nết (kept for một lòng, cut for đa tình)',{dt:dt.ep&&dt.ep.cls,ch:chg.ep&&chg.ep.cls,f:dt.fate});
  const o=by("old save: gả");ok(o.dead&&!o.ep&&!o.after,'Trả thẻ bài · OLD save (no S.kc.lv): today\'s card, no «Về sau»',o);
  const n=by("no tablet returned (home road ending before Điện tuyển)");ok(n.dead&&!n.ep,'home-road ending before any returned tablet: unchanged (no «Về sau»)',n)}
 /* 6. FORCED-REMOVAL SEVERITY (MAIN 118 06:16Z P1/P2/P3; table «STEP 1b» in reports/leave-palace.md) */
 await fresh();
 const sv=await p.evaluate(()=>{const snap=JSON.stringify(ser());const R={};const H0=has,W0=npcWhy,DS0=deathSentence,F0=fall,rl0=roll;
  const reset=()=>{deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;has=H0;npcWhy=W0;deathSentence=DS0;fall=F0;roll=rl0;if(S.kc)S.kc.inPal=1};
  const mercyOn=()=>{has=t=>t==="nhantu"?true:H0(t);npcWhy=(k,o)=>k==="empMercy"?true:W0(k,o)};
  /* P1 treason tier: no first-year mercy (turn 1); nhân từ → phế làm thứ dân (life ends, «Về sau» dan); thường keeps the old mercies */
  reset();S.turn=1;S.mercy=0;deathSentence("Mật thư bị chặn, tra ra ngươi làm gián điệp cho Cao Ly","nghich");R.p1a={dead:!!S.dead,fate:S.fate,mercy:S.mercy};
  reset();S.turn=1;S.mercy=0;deathSentence("Bị ban chết vì đầu độc Hoàng tử");R.p1ctl={dead:!!S.dead,mercy:S.mercy};
  reset();S.turn=40;mercyOn();deathSentence("Bị ban chết vì vu Hoàng tử trù ẻo thánh thượng","nghich");R.p1b={dead:!!S.dead,out:S.out,fate:S.fate,k:S.lvEp&&S.lvEp.k};
  reset();S.turn=40;mercyOn();deathSentence("Bị ban chết vì đầu độc phi tần");R.p1bctl={dead:!!S.dead,out:S.out};
  reset();S.turn=40;mercyOn();{const v=rivals.find(x=>x&&x.alive&&!x.out&&!x.queen);deathSentence(v,"Bị ban chết vì đầu độc Hoàng tử","nghich");R.p1n={alive:v.alive,dan:v.dan,out:!!v.out}}
  reset();S.turn=40;mercyOn();{const v=rivals.find(x=>x&&x.alive&&!x.out&&!x.queen);deathSentence(v,"tư thông");R.p1nctl={alive:v.alive,out:!!v.out}}
  /* P2 a proven thư tư tình (PEND.loveletter «Trình lên») → the ONE tư thông rule (deathSentence), never fall() */
  reset();{const v=rivals.find(x=>x&&x.alive&&!x.out);const calls=[],falls=[];const TT0=ttExposed;ttExposed=function(p){calls.push((p===S?"S":"npc")+"|tư thông");return TT0.apply(this,arguments)};fall=function(){falls.push(1);return F0.apply(this,arguments)};roll=()=>true;
   const d=PEND.loveletter({v:v.id});d.o[0].go();ttExposed=TT0;R.p2={calls,falls:falls.length,x:d.o[0].x}}
  /* E74 item 3: ONE tư thông function for her and NPCs — the same outcome both ways (man xử trảm; empMercy → lãnh cung; else deathSentence) */
  const mkMan=()=>{const m=(S.men||[]).find(x=>x&&x.alive);return m};
  for(const mer of [true,false]){reset();S.turn=40;S.mercy=1;npcWhy=(k,o)=>k==="empMercy"?mer:W0(k,o);has=t=>t==="nhantu"?false:H0(t);const m=mkMan();if(!m){R["p2s"+mer]="no man";continue}
   ttExposed(S,m,"Test.");R["p2s"+mer]={man:m.alive,out:!!S.out,dead:!!S.dead};
   reset();S.turn=40;npcWhy=(k,o)=>k==="empMercy"?mer:W0(k,o);has=t=>t==="nhantu"?false:H0(t);const m2=mkMan();const v=rivals.find(x=>x&&x.alive&&!x.out&&!x.queen);v.mercy=1;v.affair=m2.id;ttExposed(v,m2,"Test.");R["p2n"+mer]={man:m2.alive,out:!!v.out,dead:v.alive===false,aff:v.affair}}
  /* every tư thông caller routes to ttExposed (S + NPC): affairExposed, ttNpcExposed, trystNpc caught, j30 «Bóc chuyện tư tình» both branches */
  {reset();const seen=[];const TT0=ttExposed;ttExposed=function(p){seen.push(p===S?"S":"npc");return ""};roll=()=>true;
   const m=mkMan();const v=rivals.find(x=>x&&x.alive&&!x.out&&!x.queen);
   try{affairExposed(m,"a")}catch(e){seen.push("E1 "+e.message)}try{ttNpcExposed(v,m,"b")}catch(e){seen.push("E2 "+e.message)}try{trystNpc(m,100,v)}catch(e){seen.push("E3 "+e.message)}
   const X=ACT.expose;const a0=rivals.find(x=>x&&x.alive&&x!==v);const aR1=aRoll;try{m.trysts=Math.max(1,m.trysts||0);aRoll=()=>true;X.f(a0,S)}catch(e){seen.push("E4 "+e.message)}try{v.scandal=1;X.f(S,v)}catch(e){seen.push("E5 "+e.message)}aRoll=aR1;
   ttExposed=TT0;R.p2route=seen}
  /* P3 «bị bỏ quên» = thất sủng, not lãnh cung: he stops turning her tablet, Sủng decays, she wins him back; NPC the same */
  reset();S.out=0;S.sung=0;S.danh=0;S.rank=0;let ev=tsMonthAll();R.p3={out:S.out,ts:!!S.thatS,night:nightCh(S),ev:ev.replace(/<[^>]+>/g,"")};
  {const r0=BAL.thatS.recall.max;BAL.thatS.recall.max=0;S.sung=10;tsMonthAll();R.p3.decay=S.sung;BAL.thatS.recall.max=r0}S.sung=BAL.thatS.back;ev=tsMonthAll();R.p3.back=!S.thatS;{const keep=S.thatS;S.thatS={t:0};const z=nightCh(S);S.thatS=keep;R.p3.night2=z===0&&!S.thatS}/* back: the flag is gone (the tablet rule no longer zeroes her) */
  {const v=rivals.find(x=>x&&x.alive&&!x.out&&!x.queen&&rkOf(x)<=BAL.thatS.rank);if(v){v.sung=0;v.danh=0;tsMonthAll();R.p3n={ts:!!v.thatS,out:!!v.out,night:nightCh(v)}}else R.p3n="no low NPC"}
  /* E74 item 1: thất sủng is not a one-way trap — robot: 120 months, low NPCs forced to Sủng 0 / Danh 0 (no other Sủng road in this loop):
     some come back by «Hoàng thượng chợt nhớ» (BAL.thatS.recall), the same formula for her */
  {reset();let ent=0,left=0;const L=rivals.filter(x=>x&&x.alive&&!x.out&&!x.queen&&!x.coop);for(const v of L){v.rank=0;v.sung=0;v.danh=0}
   const was=new Set();for(let mo=0;mo<120;mo++){for(const v of L){if(!v.thatS&&v.sung>BAL.thatS.sung)v.sung=Math.max(0,v.sung-5)}tsMonthAll();for(const v of L){if(v.thatS&&!was.has(v.id)){was.add(v.id);ent++}if(!v.thatS&&was.has(v.id)&&!v.__left){v.__left=1;left++}}}
   R.p3robot={npcs:L.length,ent,left,chS:tsRecallCh(S),chN:L[0]?tsRecallCh(L[0]):null}}
  reset();S.sung=0;S.danh=0;S.rank=0;S.thatS={t:0};{const r0=roll;roll=()=>true;const ev=tsMonth(S);roll=r0;R.p3me={ts:!!S.thatS,sung:S.sung,back:BAL.thatS.back,ev:ev.replace(/<[^>]+>/g,"")}}
  /* E74 item 2: ONE treason tier — every treason deed (pond, pushp on Hoàng hậu, j70 trap of a treason kind, vu cổ doer, spy, kpoison, kframe, poison on Hoàng hậu) → «nghich» */
  {reset();R.tier={};for(const [k,q] of [["spy",0],["kpoison",0],["pond",0],["musk",0],["catswap",0],["kframe",0],["vuco",0],["poison",1],["pushp",1],["poison",0],["pushp",0],["frame",0],["rumor",0],["ksab",0]])R.tier[k+(q?"@HH":"")]=crimeTier(k,q?{queen:true}:{queen:false})}
  {reset();const got=[];deathSentence=function(p,why,tier){got.push(["ds",typeof p==="string"?"S":p===S?"S":"npc",typeof p==="string"?why:tier]);return ""};const P0=punish;punish=function(p,why,sev){got.push(["pun",typeof p==="string"?"S":p===S?"S":"npc",sev]);return ""};
   const t=rivals.find(x=>x&&x.alive&&!x.out&&!x.queen);const a=rivals.find(x=>x&&x.alive&&!x.out&&x!==t&&!x.queen);
   const k={name:"Hoàng tử Test",age:9,hp:50,alive:true};
   /* pond caught (kid exists: the act picks one) */
   t.kids=(t.kids||[]).concat([k]);{const r0=roll,aR0=aRoll,c0=caught;caught=()=>"";aRoll=()=>false;try{ACT.pond.f(a,t)}catch(e){got.push(["err pond",e.message])}aRoll=aR0;caught=c0;roll=r0}
   /* pushp caught on Hoàng hậu / on a consort */
   {const q=rivals.find(x=>x&&x.queen&&x.alive);const aR0=aRoll,c0=caught;caught=()=>"";aRoll=()=>false;try{if(q)pushPond(a,q);pushPond(a,t)}catch(e){got.push(["err pushp",e.message])}aRoll=aR0;caught=c0;R.hasQ=!!q}
   /* the same deeds done BY HER (two-way): pond + kpoison caught → nghich for S */
   {const aR0=aRoll,c0=caught;caught=()=>"";aRoll=()=>false;try{ACT.pond.f(S,t);ACT.kpoison.f(S,t)}catch(e){got.push(["err S",e.message])}aRoll=aR0;caught=c0}
   punish=P0;R.p1fam=got}
  reset();return R});
 ok(sv.p1a.dead&&!sv.p1a.mercy,'P1 treason tier: no first-year mercy (gián điệp at month 1 dies)',sv.p1a);
 ok(!sv.p1ctl.dead&&sv.p1ctl.mercy===1,'P1 control: an ordinary death sentence keeps the first-year mercy',sv.p1ctl);
 /* PUNISH-TIER-9 (newer ruling OD 26/11 ~20:35Z rec 1 over 24/11 ~07:55Z): a spared death sentence = phế vị + lãnh cung chung thân, treason too */
 ok(!sv.p1b.dead&&!!sv.p1b.out,'P1 treason + nhân từ Emperor → phế vị + lãnh cung chung thân (PUNISH-TIER OD 26/11 ~20:35Z), life goes on',sv.p1b);
 ok(!sv.p1bctl.dead&&sv.p1bctl.out===1,'P1 control: ordinary crime + nhân từ → lãnh cung (kept)',sv.p1bctl);
 ok(sv.p1n.alive!==false&&!!sv.p1n.out&&!sv.p1n.dan,'P1 NPC the same: treason + nhân từ → phế vị + lãnh cung chung thân',sv.p1n);
 ok(sv.p1nctl.alive&&sv.p1nctl.out,'P1 NPC control: ordinary + nhân từ → lãnh cung',sv.p1nctl);
 ok(sv.p2.falls<=1&&sv.p2.calls.some(c=>/tư thông/.test(c))&&/tư thông/.test(sv.p2.x),'P2 proven thư tư tình → the one tư thông rule (ttExposed; its own fall() at the Tư thông tier is the only fall)',sv.p2);
ok(sv.p2strue&&sv.p2ntrue&&sv.p2strue.man===false&&sv.p2ntrue.man===false&&(sv.p2strue.out||sv.p2strue.dead)&&(sv.p2ntrue.out||sv.p2ntrue.dead)&&sv.p2ntrue.aff==null,'E74 P2 parity: the man xử trảm, she (S) and an NPC on the same tử tội road (ban chết or phế vị + lãnh cung)',{s:sv.p2strue,n:sv.p2ntrue});
ok(sv.p2sfalse&&sv.p2nfalse&&sv.p2sfalse.man===false&&sv.p2nfalse.man===false&&(sv.p2sfalse.out||sv.p2sfalse.dead)&&(sv.p2nfalse.out||sv.p2nfalse.dead),'E74 P2 parity (PUNISH-TIER-9 + MAIN 179: proven tư thông = BAL.charge.ttProven tử tội): the man xử trảm, she (S) and an NPC both ban chết or phế vị + lãnh cung chung thân',{s:sv.p2sfalse,n:sv.p2nfalse});
ok(JSON.stringify(sv.p2route)===JSON.stringify(["S","npc","npc"]),'E74 P2: affairExposed, ttNpcExposed, trystNpc caught call the ONE ttExposed (j30 «Bóc chuyện tư tình» folded into the one «Tố giác», split-merge B1 27/11: chPunish at the tt tier)',sv.p2route);
ok(/ttExposed\(c,m,/.test(SRC)&&!/roll\(50\)\)return over\("Tư thông bị phát giác"/.test(SRC),'E74 P2 family scan: jmen report on ttExposed; the old j30 50/50 «ban chết / lãnh cung» gone',0);
 ok(sv.p3.out===0&&sv.p3.ts&&sv.p3.night===0&&/thất sủng/.test(sv.p3.ev),'P3 bị bỏ quên → thất sủng: stays out of lãnh cung, tablet set aside, a line',sv.p3);
 ok(sv.p3.decay<10&&sv.p3.decay>=6&&sv.p3.back&&sv.p3.night2,'P3 thất sủng: Sủng decays (BAL.thatS.decay); at BAL.thatS.back she is back on the tablet tray',sv.p3);
 ok(sv.p3n==="no low NPC"||(sv.p3n.ts&&!sv.p3n.out&&sv.p3n.night===0),'P3 NPC the same rule',sv.p3n);
ok(sv.p3robot.ent>0&&sv.p3robot.left>0,'E74 P3 robot: of the NPCs that entered thất sủng over 120 months, some left it (no one-way trap)',sv.p3robot);
ok(!sv.p3me.ts&&sv.p3me.sung>0&&/chợt nhớ/.test(sv.p3me.ev),'E74 P3: she has the same «chợt nhớ» road (Sủng lifted toward BAL.thatS.back through her own Sủng modifiers)',sv.p3me);
{const T=sv.tier;ok(["spy","kpoison","pond","musk","catswap","kframe","vuco","poison@HH","pushp@HH"].every(k=>T[k]==="nghich")&&["poison","pushp","frame","rumor","ksab"].every(k=>T[k]===""),'E74 P1: crimeTier — treason kinds «nghich», ordinary kinds not',T)}
{const G=sv.p1fam;const ds=G.filter(g=>g[0]==="ds");ok(ds.length>=3&&ds.every(g=>g[2]==="nghich")&&ds.some(g=>g[1]==="S")&&ds.some(g=>g[1]==="npc")&&(!sv.hasQ||ds.length>=4)&&G.some(g=>g[0]==="pun"&&g[2]===2),'E74 P1 family: pond caught + pushp on Hoàng hậu → deathSentence «nghich» for NPC and for her (two-way); pushp on a consort stays punish 2',G)}
ok(/convict\(a,`bị bắt quả tang/.test(SRC)&&/convict\(by,"dùng bùa ngải/.test(SRC)&&!/punish\(a,"mưu hại hoàng tự"/.test(SRC),'E74 P1 family scan: j70 trap + jworld2 vu cổ doer on convict(); no punish «mưu hại hoàng tự» left',0);
 ok(!/Bị bỏ quên, đưa vào lãnh cung/.test(SRC),'P2/P3 family scan: no «Bị bỏ quên → lãnh cung» left',0);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(`leave-palace: ${res.length-f}/${res.length} ok`);process.exit(f?1:0)})();
