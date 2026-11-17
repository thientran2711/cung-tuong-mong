/* AG-ALL part B checks (jagstaff + j42 SRVA): maids and eunuchs play the player maid's act list.
   1 one table: the player maid's cards print SRVA odds/gains (Dâng trà, Trò chuyện, Liếc mắt); 2 histogram per group over N tuần (consort life and
   maid life): every chosen k is a player button (no NPC-only hidden act), both groups act, 0 throws; 3 the rolls are off while asOn (j14 sale, j10 spy/tell,
   maidLoveMonth, mlSeek start, mlFeud); 4 old save (staff with no stats) loads; 5 BAL.ag.on=0 → no staff act; perf ms per tick.
   usage: node dev/test/ag-all-b.js <page URL or file> [weeks]  → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0,WK0]=process.argv;const WK=+WK0||40;const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
/* player buttons of the maid life (srvCards / srvTalk / srvStaffAct / love): SRVA key → button label */
const BTN={sweep:"Quét sân, lau điện",tea:"Dâng trà, hầu điểm tâm",nvp:"Lĩnh đồ ở Nội vụ phủ",rite:"Học lễ nghi với cô cô",study:"Luyện thêu thùa, chữ nghĩa",groom:"Chải chuốt, giữ nhan sắc",rest:"Nghỉ lấy sức",embro:"Thêu khăn bán ra ngoài",med:"Mua thuốc bổ",books:"Quản sổ sách trong cung",spy:"Lén báo tin",
 massage:"Đấm lưng, hầu chuyện",askRew:"Xin chủ ban thưởng",tellMis:"Bẩm tin dò được",askRec:"Xin chủ tiến cử lên Nội vụ phủ",beside:"Hầu bên cạnh chủ",greet:"Hành lễ thỉnh an",betray:"Mật báo chuyện của",accuse:"Tố cáo",
 chat:"Trò chuyện",gift:"Biếu quà",ask:"Nhờ dò tin",frame:"Tố lỗi với chủ",tonic:"Xin thuốc bổ",learn:"Học lỏm nghề thuốc",hail:"Chào hỏi đúng lễ",flirt:"Liếc mắt đưa tình",token:"Trao khăn tay, thư",tryst:"Hẹn gặp riêng",vow:"Hẹn ước trăm năm",empTea:"Quỳ dâng trà",
 grantWed:"Tạ ơn, xuất giá",grantStay:"Xin ở lại",age_out:"Xuất cung",age_mama:"Ở lại làm ma ma",age_keep:"Xin chủ giữ lại"};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const fresh=(maid)=>p.evaluate((maid)=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  if(maid)srvInit();try{deal()}catch(e){}render();const N=window.__asN;N.maid={};N.srv={};N.n=0;N.ms=0;N.tick=0;N.react={};N.hit={};N.out=0;return{srv:isSrv()}},maid);
 const play=(n)=>p.evaluate((n)=>{const E=[];const ce=console.error;console.error=(...a)=>{E.push(a.map(String).join(" ").slice(0,160));ce.apply(console,a)};
  try{for(let i=0;i<n&&!S.dead;i++){Q.length=0;try{closeAll()}catch(e){}for(let b=0;b<4;b++){try{placeWhere()}catch(e){}if(typeof nextBuoi==="function"&&b<3)try{nextBuoi()}catch(e){}}
   if(typeof agFlush==="function")agFlush();endTurn();Q.length=0;try{closeAll()}catch(e){}}}catch(e){E.push("throw "+e.message+" @ "+String(e.stack).split("\n").slice(1,3).join(" | ").slice(0,300))}finally{console.error=ce}
  return{E:E.slice(0,5),N:JSON.parse(JSON.stringify(window.__asN)),AM:{rise:window.__amN.rise,fav:window.__amN.fav,tea:window.__amN.tea},dead:!!S.dead}},n);
 /* 1 one table */
 await fresh(true);
 const r1=await p.evaluate(()=>{const m=srvM();const D=srvCards();const tea=D.find(x=>/Dâng trà/.test(x.n));const sw=D.find(x=>/Quét sân|Đốc thúc/.test(x.n));
  return{tea:tea&&tea.o===od(SRVA.tea.o(S,m))&&tea.w===SRVA.tea.w,sweep:sw&&sw.w===SRVA.sweep.w&&sw.x==="công lao +"+SRVA.sweep.mp}});
 ok(r1.tea&&r1.sweep,'one table: the player maid cards read SRVA',r1);
 /* 2 histogram, consort life then maid life */
 for(const maid of [false,true]){await fresh(maid);const r=await play(WK);const H=Object.assign({},r.N.maid);const Hs=r.N.srv;
  const ks=[...Object.keys(r.N.maid),...Object.keys(r.N.srv)].map(k=>k.replace(/^(sv_|maid:|srv:)/,""));const hidden=ks.filter(k=>!BTN[k]);
  console.log((maid?'maid life':'consort life')+' '+WK+' tuần · maid acts '+JSON.stringify(H)+' · eunuch acts '+JSON.stringify(Hs)+' · react '+JSON.stringify(r.N.react||{})+' · hit '+JSON.stringify(r.N.hit||{})+' · out '+(r.N.out||0)+' · rise '+JSON.stringify(r.AM)+' · ticks '+r.N.tick+' · ms '+(r.N.ms/Math.max(1,r.N.tick)).toFixed(2)+'/tick');
  ok(!r.E.length,(maid?'maid':'consort')+' life: 0 errors',r.E);ok(hidden.length===0,'no NPC-only hidden act (every k is a player button)',hidden);
  ok(Object.keys(H).length>=8&&Object.keys(Hs).length>=6,'both groups use many acts',{maid:Object.keys(H).length,srv:Object.keys(Hs).length});
  ok(r.N.ms/Math.max(1,r.N.tick)<8,'perf per buổi tick < 8 ms',+(r.N.ms/Math.max(1,r.N.tick)).toFixed(2))}
 /* 3 rolls off while asOn */
 await fresh(false);
 const r3=await p.evaluate(()=>{let n=0;const r0=roll;const calls=[];roll=x=>{calls.push(x);return r0(x)};try{maidLoveMonth()}finally{roll=r0}const a=calls.length;
  const st=asStaff()[0];calls.length=0;roll=x=>{calls.push(x);return r0(x)};try{if(st)mlFeud(ownerOf(st))}finally{roll=r0}return{love:a,feud:calls.length,on:asOn()}});
 ok(r3.on&&r3.love===0&&r3.feud===0,'maidLoveMonth / mlFeud dice off while asOn',r3);
 /* 4 old save: staff without stats */
 const r4=await p.evaluate(()=>{const s=asStaff()[0];if(!s)return{skip:1};for(const k of ["duc","tamco","danh","suc","bac","mt","intel"])delete s[k];const N=asNeeds(s);const O=asOpts(s,N);return{n:O.length,suc:s.suc,bad:Object.values(N).some(v=>!isFinite(v))}});
 ok(r4.skip||r4.n>0&&r4.suc>0&&!r4.bad,'old save: staff with no stats get them lazily',r4);
 /* 5 off switch */
 const r5=await p.evaluate(()=>{BAL.ag.on=0;const n0=window.__asN.n;window.__asN.key=null;asTick();const n1=window.__asN.n;BAL.ag.on=1;return{n0,n1,on:asOn()}});
 ok(r5.n0===r5.n1,'BAL.ag.on = 0: no staff act',r5);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();process.exit(res.every(x=>x)?0:1)})();
