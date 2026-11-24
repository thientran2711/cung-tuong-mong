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
   over(h,t,fate,al);const html=(Q[0]&&Q[0].h)||"";R.push({site,k,got:S.lvEp?S.lvEp.k:"",dead:!!S.dead,card:Q[0]&&Q[0].t==="Kiếp này",after:/kend-after/.test(html),ep:S.lvEp,partner:S.lvEp&&S.lvEp.m,want:/\{[mt]\}/.test(f)?(f.includes("{m}")?m.name:th.name):""})}
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
    const m={name:"Vương gia Thử Nghiệm "+c,sex:"m",kind:"man",net:NETS[c]};lvNext("thiep",m);over("Được ban hôn",`Thánh chỉ ban ${S.name} cho ${m.name}.`,`Được ban hôn cho ${m.name}`,true);
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
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(`leave-palace: ${res.length-f}/${res.length} ok`);process.exit(f?1:0)})();
