/* WORLD EVENTS batch 2 checks (jworld2, review/world-events-2; owner OD:L1587 rule 4, OD 17/11 13:48Z + ~14:30Z).
   1 every batch-2 kind: a queued window opens in the tuần tick, shows a CENTER pop-up at the start (titled, her options where she has a part),
     writes a Tuần lục line, ends by itself with an end pop-up; no jworld error; no Dư đồ "!"
   2 REAL causes open them (no pure dice): a birth → đầy tháng a month later; S.heir → lập Thái tử; S.thIll stage → Thái hậu bệnh; S.emp.ill
     stage → long thể bất an; a bùa frame while the Emperor is ill → vu cổ; a failed flood relief + low Kho lúa in summer → châu chấu;
     heavy snow two tuần → đại hàn; a house over BAL.world.ngoai.pow under a young Emperor → ngoại thích; a daughter's wedding → xuất giá;
     the calendar (tỉnh thân, khoa thi, Phật đản); aged maids → phóng cung nhân
   3 EVERYONE the same: long thể bất an blocks every night (her and NPC); Thái hậu bệnh lowers every night by the same factor; vu cổ holds back
     the same pay share for her and an NPC; giới nghiêm closes places for NPC plans (worldPlanW 0) and for her walk (goTo)
   4 NPCs react: aged maids leave an NPC household; tỉnh thân brings silver to NPCs; worldPlanW force slot (Hầu thuốc)
   usage: node dev/test/world_check2.js <dev/index.html | URL>  → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,U0]=process.argv;const URL=/^(https?|file):/.test(U0)?U0:'file://'+require('path').resolve(U0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const fresh=()=>p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=true;Q.length=0;try{deal()}catch(e){}
  for(const v of rivals)v.preg=0;S.preg=0;S.sung=Math.max(S.sung,60);S.bac=Math.max(S.bac,500);BAL.world.maxOpen=9;S.wwin={L:[],last:{},n:{},seq:0};worldTick();S.wwin.L=[];S.wwin.q=[];return 1});
 /* 1 */
 await fresh();
 const K=["day","lap","hau","thb","thi","vuong","ret","trung","vuco","cam","trom","phong","hon","ngoai","phat","benh","tinh"];
 const r1=await p.evaluate((K)=>{const out={};const kid=allKids()[0];const v=liveRivals(true)[0];
  const X={day:{kid:"Hoàng tử Thử",sex:"m",mo:v.id},lap:{kid:"Hoàng tử Thử",mo:v.id},hau:{old:null,nw:v.id,sub:"lap"},hon:{kid:"Công chúa Thử",mo:v.id},ngoai:{c:"Tể tướng"},vuco:{t:v.id,tn:v.name,by:null,why:"long thể bất an"}};
  for(const k of K){S.wwin.L=[];S.wwin.q=[];S.wwin.last={};S.wwin.H=[];Q.length=0;S.mg=0;const n0=(S.logs||[]).length;worldQueue(k,"thử",{x:X[k]||{}});
   let e=null;try{const t=wk();endTurn()}catch(x){e=x.message}const w=worldWin(k);const c=Q.find(m=>m&&m.t===worldName(w||{k}));
   const lg=(S.logs||[]).slice(0,8).some(l=>/thử/.test(l));const hap=(()=>{try{S.adHap=null;return adHapNow().some(x=>x.id==="world")}catch(x){return false}})();
   const len=w?w.t1-w.t0:0;let end=false;for(let i=0;i<len+1&&!end;i++){Q.length=0;S.mg=0;try{endTurn()}catch(x){e=x.message}end=Q.some(m=>m&&m.t===worldName(w||{k}))&&!worldWin(k)}
   out[k]={open:!!w,card:!!c,opts:c&&c.opts?c.opts.length:0,log:lg,hap,end,e}}
  return{out,err:WW.err}},K);
 for(const k of K){const o=r1.out[k];ok(o.open&&o.card&&o.log&&o.end&&!o.hap&&!o.e,`${k}: opens, center pop-up at start + end, Tuần lục line, no Dư đồ "!"`,o)}
 ok(r1.out.day.opts>0&&r1.out.thb.opts>0&&r1.out.benh.opts>0&&r1.out.vuco.opts>0&&r1.out.trom.opts>0,'her own options on the start pop-up',Object.fromEntries(K.map(k=>[k,r1.out[k].opts])));
 ok(r1.err===0,'no jworld errors (1)',r1.err);
 /* 2 real causes */
 await fresh();
 const r2=await p.evaluate(()=>{const R={};const v=liveRivals(true)[0];const T=trS();const clr=()=>{S.wwin.L=[];S.wwin.q=[];S.wwin.last={}};const tick=()=>{worldTick();Q.length=0};
  /* birth → đầy tháng after BAL delay */
  clr();tick();const k=mkKid("m",0);(v.kids=v.kids||[]).push(k);tick();const at=wk();let opened=null;for(let i=0;i<6&&!opened;i++){S.tuan=(S.tuan+1)%3;if(S.tuan===0)S.turn++;tick();if(worldWin("day"))opened=wk()-at}R.day={opened,want:BAL.world.day.delay};
  /* heir */
  clr();tick();setHeir(k,v);tick();R.lap=!!worldWin("lap");
  /* Thái hậu ill */
  clr();S.thDead=false;S.thIll={k:"phonghan",st:BAL.world.thb.st,known:true};tick();R.thb=!!worldWin("thb");
  const C=consorts().filter(x=>x!==S);const raw=x=>{const L=S.wwin.L;S.wwin.L=[];const c=nightCh(x);S.wwin.L=L;return c};const ratio=C.map(x=>[raw(x),nightCh(x)]).filter(a=>a[0]>=10).map(a=>+(a[1]/a[0]).toFixed(1));
  const me=[raw(S),nightCh(S)];R.thbNight={ratio:[...new Set(ratio)],me,want:BAL.world.thb.nightMul};S.thIll=null;
  /* Emperor ill */
  clr();S.emp.ill={k:"longthe",st:BAL.world.benh.st,known:true};tick();R.benh=!!worldWin("benh");R.benhNight=consorts().map(x=>nightCh(x)).filter(n=>n>0).length;
  const P=worldPlanW(liveRivals(true).find(x=>rkOf(x)>=3)||v);R.benhForce=(P.force||[]).some(f=>f.pl==="dtd");
  /* vu cổ from a real bùa frame while he is ill */
  clr();framed(v,"bị vu dùng bùa ngải");R.vucoQ=(S.wwin.q||[]).some(a=>a.k==="vuco");tick();R.vuco=!!worldWin("vuco");
  const cut=q=>Math.round((BAL.pay[Math.min(7,rkOf(q))]||0)*BAL.world.vuco.payCut);const run=q=>{const b0=q.bac;const s=Math.random;Math.random=()=>.5;try{stipend(q)}finally{Math.random=s}return q.bac-b0};
  const sOn=run(S),vOn=run(v);const L=S.wwin.L;S.wwin.L=[];const sOff=run(S),vOff=run(v);S.wwin.L=L;R.vucoPay={me:sOff-sOn,meW:cut(S),npc:vOff-vOn,npcW:cut(v)};
  S.emp.ill=null;
  /* châu chấu: failed flood relief, Kho lúa between the two marks, summer */
  clr();S.month=6;S.tuan=0;T.kho=Math.round((BAL.world.dis.kho+BAL.world.trung.kho)/2);S.wMM={k:"lut",fail:1,kho:T.kho,bien:T.bien,y:S.year,m:6};tick();R.trung=!!worldWin("trung");
  /* đại hàn */
  clr();S.month=12;S.tuan=1;S.wwin.snowL=Array(BAL.world.ret.run-1).fill(1);S.wx={n:"tuyết dày",k:"snowh",f:4};tick();R.ret=!!worldWin("ret");S.wwin.snowL=[];S.wx={n:"trời quang",k:"dust",f:0};
  /* ngoại thích */
  clr();S.month=5;S.tuan=0;const age0=S.emp.age;S.emp.age=BAL.world.ngoai.young-2;T.H["Lễ bộ"].pow=BAL.world.ngoai.pow+2;S.wMM=null;tick();R.ngoai=(worldWin("ngoai")||{x:{}}).x.c||null;S.emp.age=age0;T.H["Lễ bộ"].pow=50;
  /* wedding */
  clr();const d=mkKid("f",18);(v.kids=v.kids||[]).push(d);tick();d.wed=1;d.hW={kind:"ban"};tick();R.hon=!!worldWin("hon");
  /* calendar */
  clr();S.month=BAL.world.tinh.month;S.tuan=BAL.world.tinh.t;const b0=liveRivals(true).map(x=>x.bac);tick();R.tinh=!!worldWin("tinh");R.tinhBac=liveRivals(true).filter((x,i)=>x.bac>b0[i]).length;
  clr();S.month=BAL.world.thi.month;S.tuan=0;S.year=BAL.world.thi.every*7+BAL.world.thi.off;tick();R.thi=!!worldWin("thi");
  clr();S.month=BAL.world.phat.month;S.tuan=BAL.world.phat.t;tick();R.phat=!!worldWin("phat");
  /* aged maids → phóng cung nhân; they leave an NPC household */
  clr();S.month=BAL.world.phong.month;S.tuan=0;const st=v.staff=v.staff||[];const M=[];for(let i=0;i<BAL.world.phong.min;i++){const s={sid:9000+i,name:"Cung nữ thử "+i,role:"maid",age:BAL.srvAge.out+1,loyal:10,rk:1};st.push(s);M.push(s)}
  const keep0=BAL.world.phong.npcKeep;BAL.world.phong.npcKeep=0;tick();BAL.world.phong.npcKeep=keep0;R.phong=!!worldWin("phong");R.phongLeft=M.filter(s=>st.includes(s)).length;
  /* giới nghiêm: places closed for NPC plans and for her walk */
  clr();worldQueue("cam","thử");tick();R.cam=!!worldWin("cam");R.camPlan=worldPlanW(v).place.vuon;S.place="home";Q.length=0;S.confined=0;S.out=false;try{goTo("vuon")}catch(e){}R.camWalk=S.place;
  R.err=WW.err;return R});
 ok(r2.day.opened===r2.day.want,'a real birth → yến đầy tháng one month later (BAL delay)',r2.day);
 ok(r2.lap,'S.heir set → đại lễ sắc lập Thái tử',r2.lap);
 ok(r2.thb,'Thái hậu illness stage → Thái hậu bệnh nặng',r2.thb);
 ok(r2.thbNight.ratio.length>0&&r2.thbNight.ratio.every(x=>Math.abs(x-r2.thbNight.want)<.15)&&(r2.thbNight.me[0]<10||Math.abs(r2.thbNight.me[1]/r2.thbNight.me[0]-r2.thbNight.want)<.15),'Thái hậu bệnh: the same night factor for her and every NPC',r2.thbNight);
 ok(r2.benh&&r2.benhNight===0,'Emperor illness stage → long thể bất an, nobody (her or NPC) is called at night',{o:r2.benh,n:r2.benhNight});
 ok(r2.benhForce,'AG-ALL hook: Hầu thuốc force slot at Dưỡng Hòa điện',r2.benhForce);
 ok(r2.vucoQ&&r2.vuco,'a real bùa frame while he is ill → đại án vu cổ',{q:r2.vucoQ,o:r2.vuco});
 ok(r2.vucoPay.me===r2.vucoPay.meW&&r2.vucoPay.npc===r2.vucoPay.npcW,'vu cổ: the same pay hold for her and an NPC (BAL)',r2.vucoPay);
 ok(r2.trung,'failed flood relief + Kho lúa low in summer → nạn châu chấu',r2.trung);
 ok(r2.ret,'heavy snow BAL tuần in a row → đại hàn',r2.ret);
 ok(r2.ngoai==="Lễ bộ",'a house over BAL pow under a young Emperor → ngoại thích',r2.ngoai);
 ok(r2.hon,'a real daughter\'s wedding → công chúa xuất giá',r2.hon);
 ok(r2.tinh&&r2.tinhBac>0,'calendar: tỉnh thân (NPCs get silver from home)',{o:r2.tinh,n:r2.tinhBac});
 ok(r2.thi,'calendar: khoa thi Đình',r2.thi);ok(r2.phat,'calendar: lễ Phật đản',r2.phat);
 ok(r2.phong&&r2.phongLeft===0,'aged maids → phóng cung nhân; they leave an NPC household',{o:r2.phong,left:r2.phongLeft});
 ok(r2.cam&&r2.camPlan===0&&r2.camWalk==="home",'giới nghiêm: Ngự hoa viên closed for NPC plans and for her walk',{o:r2.cam,plan:r2.camPlan,walk:r2.camWalk});
 ok(r2.err===0,'no jworld errors (2)',r2.err);
 /* old save without the batch-2 keys */
 await fresh();const r3=await p.evaluate(()=>{delete S.wwin;let e=null;try{Q.length=0;S.mg=0;endTurn();Q.length=0;endTurn();Q.length=0}catch(x){e=x.message}return{e,s2:!!(S.wwin&&S.wwin.s2)}});
 ok(!r3.e&&r3.s2,'old save without S.wwin plays (batch-2 seen record made lazily)',r3);
 ok(errs.length===0,'no page errors',errs.slice(0,3));await b.close();const f=res.filter(x=>!x).length;console.log(f?`WORLD CHECK2 FAIL ${f}/${res.length}`:`WORLD CHECK2 PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
