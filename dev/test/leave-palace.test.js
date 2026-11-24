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
   over(h,t,fate,al);const html=(Q[0]&&Q[0].h)||"";R.push({site,k,got:S.lvEp?S.lvEp.k:"",dead:!!S.dead,card:Q[0]&&Q[0].t==="Kiếp này",after:/kend-after/.test(html)&&/Về sau/.test(html),ep:S.lvEp,partner:S.lvEp&&S.lvEp.m,want:/\{[mt]\}/.test(f)?(f.includes("{m}")?m.name:th.name):""})}
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
  const tu=[];for(let i=0;i<12;i++){S.dead=false;S.lvEp=null;Q.length=0;over("Dâng biểu xuất gia","x","Xuất gia",true);tu.push(S.lvEp.kids)}R.tuKids=Math.max(...tu);
  deser(JSON.parse(snap));Q.length=0;R.byCls=Object.entries(R.byCls);return R});
 ok(!v.bad.length,'variety: class read from his nết, age inside (her age, BAL.leave.maxAge], «Tuổi già» only from BAL.leave.old, children inside BAL',v.bad.slice(0,6));
 const low=v.byCls.filter(([,n])=>n<10);ok(!low.length,'variety: 16 lives with the same partner class read differently (≥10 distinct passages in every class × age × children cell)',low.slice(0,6));
 ok(v.tuKids===0,'xuất gia: no children after',v.tuKids);
 /* 4. NO CONFIRM (owner OD 24/11 ~07:25Z): her own choice to leave = done at once. Family: xgConfirm gone; the lãnh cung «Xuất gia» act ends at once;
    the one-per-life death warning (jkiep kpGate) does not stop a «giả chết» LEAVE choice; no «(sẽ hỏi lại)» anywhere in the build */
 const nc=await p.evaluate(()=>{const snap=JSON.stringify(ser());const R={xg:typeof xgConfirm};
  Q.length=0;S.dead=false;S.lvEp=null;if(S.kc)S.kc.inPal=1;cold("Thử");Q.length=0;const a=coldActs().find(x=>x.n==="Xuất gia");R.act=!!a;R.actX=a&&a.x;
  if(a){a.go();R.dead=!!S.dead;R.fate=S.fate;R.q=Q.map(m=>m&&m.t);R.k=S.lvEp&&S.lvEp.k}
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;
  /* kpGate on every own-choice leave option text (both «giả chết» leave choices + a plain one), and one real death word as the control */
  const G=[["✦ Giả chết, theo chàng rời cung","kết thúc kiếp này"],["Xin thuốc giả chết","ra khỏi cung · kết thúc kiếp này"],["Tìm một bài thuốc giả chết",""],["Xuất gia","kết thúc kiếp này, yên ổn"]];R.gate=[];
  const free=!kpCheck();for(const [n,x] of G){S.kpWarn=0;const m={t:"thử",opts:[{n,x,fx:{}}]};Q.length=0;Q.push(m);const w=window.kpGate(0);R.gate.push([n,w]);Q.length=0}
  S.kpWarn=0;const m={t:"thử",opts:[{n:"Tự vẫn",x:"",fx:{}}]};Q.length=0;Q.push(m);R.ctl=free?window.kpGate(0):"life already whole (control skipped)";Q.length=0;
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;return R});
 ok(nc.xg==="undefined",'no-confirm: xgConfirm («Xuất gia?» card) is gone',nc.xg);
 ok(nc.act&&nc.dead&&nc.fate==="Xuất gia"&&!nc.q.includes("Xuất gia?")&&nc.q[0]==="Kiếp này"&&!/hỏi lại/.test(nc.actX)&&nc.k==="tu",'no-confirm: lãnh cung «Xuất gia» ends the life at once (end card first, no confirm card, «Về sau» tu)',nc);
 ok(nc.gate.every(([,w])=>!w),'no-confirm: kpGate never stops an own-choice leave option («giả chết» = leaving, not death)',nc.gate);
 ok(nc.ctl===true||typeof nc.ctl==="string",'kpGate control: a real death choice («Tự vẫn») still gets its one warning',nc.ctl);
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
   const c=Q.find(m=>m&&m.t==="Kiếp này"),h=(c&&c.h)||"";R.rows.push({lab,e,dead:!!S.dead,fate:S.fate,ep:S.lvEp,after:/Về sau/.test(h),chet:/Chết vì/.test(h),pal:S.lvEp?LPV_PAL.test(S.lvEp.txt):false})};
  const opt=(i)=>{const d=kcTraveD();R.n=d.o.map(o=>o.n);d.o[i].go()};
  run("gả",()=>opt(0));R.suit=S.kc.suit&&S.kc.suit[0]&&S.kc.suit[0].n;
  run("dạy chữ (Tài 70)",()=>{S.tai=70;opt(1)});
  run("xuất gia",()=>opt(2));
  run("✦ hòa thân",()=>{kcTraveD();kcEnd("kcR5")});
  run("old save: gả",()=>opt(0),true);
  run("no tablet returned (home road ending before Điện tuyển)",()=>{S.kc.trv=0;kcEnd("tu")});
  deser(JSON.parse(snap));Q.length=0;S.dead=false;S.lvEp=null;return R});
 if(kc.err)ok(false,'Trả thẻ bài: a tiểu thư life',kc);else{const by=l=>kc.rows.find(r=>r.lab===l)||{};
  ok(kc.lv===1,'Trả thẻ bài: a NEW tiểu thư life is marked (S.kc.lv)',kc.lv);
  const g=by("gả");ok(g.dead&&g.after&&!g.chet&&g.ep&&["hon","thiep"].includes(g.ep.k)&&g.ep.m===kc.suit&&g.ep.net.length===3&&!g.pal,'Trả thẻ bài · gả: ending + «Về sau» with HIM (the suitor, his 3 nết), «Kết cục» not «Chết vì», no palace line',g);
  const d=by("dạy chữ (Tài 70)");ok(d.dead&&d.after&&d.ep&&d.ep.k==="day"&&d.ep.kids===0&&!d.pal,'Trả thẻ bài · ở vậy dạy chữ: ending + «Về sau» day, no children',d);
  const t=by("xuất gia");ok(t.dead&&t.after&&t.ep&&t.ep.k==="tu"&&t.ep.kids===0&&!t.pal,'Trả thẻ bài · xuất gia: ending + «Về sau» tu',t);
  const h=by("✦ hòa thân");ok(h.dead&&h.after&&h.ep&&h.ep.k==="hoa"&&!h.pal,'Trả thẻ bài · ✦ hòa thân: ending + «Về sau» hoa',h);
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
  reset();{const v=rivals.find(x=>x&&x.alive&&!x.out);const calls=[],falls=[];deathSentence=function(){calls.push([...arguments].slice(1).join("|"));return DS0.apply(this,arguments)};fall=function(){falls.push(1);return F0.apply(this,arguments)};roll=()=>true;
   const d=PEND.loveletter({v:v.id});d.o[0].go();R.p2={calls,falls:falls.length,x:d.o[0].x}}
  /* P3 «bị bỏ quên» = thất sủng, not lãnh cung: he stops turning her tablet, Sủng decays, she wins him back; NPC the same */
  reset();S.out=0;S.sung=0;S.danh=0;S.rank=0;let ev=tsMonthAll();R.p3={out:S.out,ts:!!S.thatS,night:nightCh(S),ev:ev.replace(/<[^>]+>/g,"")};
  S.sung=10;tsMonthAll();R.p3.decay=S.sung;S.sung=BAL.thatS.back;ev=tsMonthAll();R.p3.back=!S.thatS;R.p3.night2=nightCh(S)>0||!!(S.preg||S.confined);
  {const v=rivals.find(x=>x&&x.alive&&!x.out&&!x.queen&&rkOf(x)<=BAL.thatS.rank);if(v){v.sung=0;v.danh=0;tsMonthAll();R.p3n={ts:!!v.thatS,out:!!v.out,night:nightCh(v)}}else R.p3n="no low NPC"}
  reset();return R});
 ok(sv.p1a.dead&&!sv.p1a.mercy,'P1 treason tier: no first-year mercy (gián điệp at month 1 dies)',sv.p1a);
 ok(!sv.p1ctl.dead&&sv.p1ctl.mercy===1,'P1 control: an ordinary death sentence keeps the first-year mercy',sv.p1ctl);
 ok(sv.p1b.dead&&!sv.p1b.out&&/^Phế làm thứ dân/.test(sv.p1b.fate)&&sv.p1b.k==="dan",'P1 treason + nhân từ Emperor → phế làm thứ dân: life ends, «Về sau» dan (not lãnh cung)',sv.p1b);
 ok(!sv.p1bctl.dead&&sv.p1bctl.out===1,'P1 control: ordinary crime + nhân từ → lãnh cung (kept)',sv.p1bctl);
 ok(sv.p1n.alive===false&&sv.p1n.dan===1&&!sv.p1n.out,'P1 NPC the same: treason + nhân từ → phế làm thứ dân, leaves the roster',sv.p1n);
 ok(sv.p1nctl.alive&&sv.p1nctl.out,'P1 NPC control: ordinary + nhân từ → lãnh cung',sv.p1nctl);
 ok(sv.p2.falls===0&&sv.p2.calls.some(c=>/tư thông/.test(c))&&/tư thông/.test(sv.p2.x),'P2 proven thư tư tình → the one tư thông rule (deathSentence), no fall()',sv.p2);
 ok(sv.p3.out===0&&sv.p3.ts&&sv.p3.night===0&&/thất sủng/.test(sv.p3.ev),'P3 bị bỏ quên → thất sủng: stays out of lãnh cung, tablet set aside, a line',sv.p3);
 ok(sv.p3.decay===10-2&&sv.p3.back&&sv.p3.night2,'P3 thất sủng: Sủng decays (BAL.thatS.decay); at BAL.thatS.back she is back on the tablet tray',sv.p3);
 ok(sv.p3n==="no low NPC"||(sv.p3n.ts&&!sv.p3n.out&&sv.p3n.night===0),'P3 NPC the same rule',sv.p3n);
 ok(!/Bị bỏ quên, đưa vào lãnh cung/.test(SRC)&&/ttNpcExposed\(t,/.test(SRC),'P2/P3 family scan: no «Bị bỏ quên → lãnh cung» left; j30 «Bóc chuyện tư tình» NPC branch on the same rule',0);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(`leave-palace: ${res.length-f}/${res.length} ok`);process.exit(f?1:0)})();
