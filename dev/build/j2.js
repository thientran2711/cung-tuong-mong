
function start(){
  try{if(typeof kmReset==="function")kmReset()}catch(e){}/* a new life starts with no scene / overlay / queued job of the last one (j93 kmReset) */
  const o=(window.__forceOrigin&&ORIGINS.find(x=>x.k===window.__forceOrigin))||pick(ORIGINS);quiet=true;Q=[];popIdx=null;popMsg="";
  S={year:1,month:3,tuan:0,age:18+R(3),rank:o.r,sung:8,danh:8,bac:60,suc:80,mat:0,th:o.th,hh:o.hh,tai:30+R(50),sac:40+R(55),tamco:10+R(20),duc:30,thu:0,
     schemes:0,moreRivals:0,maid:newMaid(pick(MAIDS),50+R(31)),origin:o,name:"",
     preg:0,hidden:false,fake:0,fert:0,anthai:0,doctor:0,pray:0,kids:[],heir:null,lastPromo:0,turn:0,dead:false,
     arts:{cam:0,ky:0,thi:0,hoa:0,vu:0,y:0},artp:{cam:0,ky:0,thi:0,hoa:0,vu:0,y:0},master:0,confined:0,shield:0,tablet:0,
     place:"home",visit:null,tonight:null,inv:[],an:0,nightLog:[],evm:{},rl:{},hieu:"",block:0,dress:null,asthma:false,shop:[],seen:{},emp:mkEmp(),st:{step:0,done:0,tag:""},recorded:false,nights:0,thDead:false,logs:[],caseEv:0,avenged:false};
  rivals=[];S.name=freshName();apply(o.o);if(o.art)Object.assign(S.arts,o.art);S.ally=o.ally?1:0;
  for(const [r,q] of BAL.ps.harem)rivals.push(newRival(r,q));
  /* palace-start: a young harem (the Emperor's household from before the throne + the first draft), 3–5 small children (psSeedKids), court still weak (S.reign: hook for the Emperor's side story, D5) */
  rivals.forEach(v=>{v.age=BAL.ps.consAge[0]+R(BAL.ps.consAge[1]+1)+(v.queen||v.rank>=4?BAL.ps.consAge[2]:0)});psSeedKids();S.ps=1;S.reign={y0:S.year,power:BAL.ps.power0,ch:0,side:null};/* D5 hook: Emperor side story chapters (ch) and her side road: side = "emp" | "th" | "quyen" */spreadTraits();
  Object.assign(S,drawFace());rivals.forEach(v=>Object.assign(v,drawFace()));S.emp.face=R(Math.max(1,(AV.emperor||[]).length));
  normAll();
  if(S.ally){const v=pick(liveRivals(false));if(v){relAdd(S,v,35);v.ghen=0;log(`${v.name} là người quen cũ, sẵn lòng che chở ngươi.`)}}
  const s=STORY[o.k];if(s.init)s.init();
  S.visit={k:"home",people:homePeople(),talked:false};S.buoi=0;rollWx();
  quiet=false;used=0;tab="act";
  const E=S.emp;
  /* review/newgame-ui (owner 15/11 "nhập cung phải có ảnh minh họa chứ, khung sự kiện đâu"): the EVENT frame (KIT 32.2 kitEventStage) — painted
     entering-the-palace band (consort / palace-maid road) + her full-body figure in the person column, the text beside */
  pushModal({t:"Nhập cung",stage:[S],headArt:{src:(o.k==="cnv"||(typeof isSrv==="function"&&isSrv()))?"img/ev-nhap-cung-cn.webp":"img/ev-nhap-cung.webp",label:"Nhập cung"},
   h:`<p>${S.name}, ${S.age} tuổi, ${o.n}. ${o.t} Hôm nay ngươi được đưa vào cung.</p>
   ${kitRows([["Phong",RANKS[S.rank].n,"t"],["Theo hầu",typeof cmRow==="function"?cmRow():`Cung nữ ${S.maid.name} (từ nhà)`,"t"],["Hoàng thượng",`${empName()}, ${E.age} tuổi: ${E.traits.map(t=>ETRAITS[t][0]).join(", ")}`,"t"],
    ...(S.ps?[["Hậu cung",psOpenText(),"t"]]:[]),["Tuyến truyện",`${s.t}. ${s.goal}${o.k==="td"?` Kẻ vu cho cha ngươi là ${S.foeDad}; con gái hắn, ${S.foe}, đang ở trong cung.`:""}`,"t"]])}
   <p class="past">Mỗi tháng ba tuần; mỗi tuần bốn buổi (sáng, trưa, chiều, tối), mỗi buổi ${BAL.time.khac} khắc. Mở Bản đồ để đi gặp người, chạm vào người để nói chuyện hay ra tay.</p>`});
  flip();newLots();deal();render();
}
function homePeople(){const p=[{kind:"maid",name:S.maid.name,ini:S.maid.name.split(" ").pop()[0],col:"#b9a48a",info:`Cung nữ thân tín · thiện cảm ${S.maid.loyal}${typeof cmInfo==="function"?cmInfo(S.maid):""}`}];
  S.kids.filter(k=>k.alive).forEach(k=>p.push({kind:"kid",ref:k,name:k.name,ini:k.sex==="m"?"Tử":"Nữ",col:k.heir?"#f0d070":"#c9a0e0",info:`${k.age} tuổi · Sức khỏe ${k.hp} · Tài ${k.tal} · Hoàng thượng thương ${k.fond}${k.heir?" · Thái tử":""}`}));return p}

function pool(){const L=S.emp.likes,K=S.emp.known,tt=has("trongtai")?2:1;
 const A=[
  {n:"Đánh đàn ở ngự hoa viên",t:K.music?`Tấu ${L.music}, khúc ngài yêu thích.`:"Đợi Hoàng thượng đi ngang.",c:{suc:-10},o:od(35+S.tai/3+S.arts.cam*4*tt+(K.music?15:0)+mm()),w:{sung:K.music?9:7},l:{sung:-1}},
  {n:"Dâng canh ở ngự thư phòng",t:K.dish?`Tự tay nấu ${L.dish}, món ngài thích.`:"Tự tay nấu, sâm mua bằng bạc riêng.",c:{bac:-15,suc:-5},o:od(55+S.sac/5+(K.dish?15:0)+mm()),w:{sung:K.dish?8:6},l:{danh:-2}},
  {n:"Múa trong yến tiệc",t:"Cả hậu cung nhìn vào.",c:{suc:-20,bac:-10},o:od(30+S.sac/2*(has("mesac")?1.3:1)+S.arts.vu*4),w:{sung:12,danh:4},l:{danh:-6},x:`phi tần ghen +${ghenN(BAL.ghen.dance)}`,go:()=>ghenAll(BAL.ghen.dance)},
  {n:"Cắm hoa dâng Hoàng thượng",t:K.flower?`Một bình ${L.flower}, loài hoa ngài yêu.`:"Chưa biết ngài thích hoa gì.",c:{bac:-5,suc:-5},o:K.flower?100:od(50),w:{sung:K.flower?5:2},l:{}},
  {n:"Cài tai mắt",t:"Mua chuộc cung nữ các cung khác.",c:{bac:-25},o:od(80),w:{mat:2},l:{danh:-3}},
  {n:"Nghỉ ngơi dưỡng sức",t:"Uống thuốc bổ, ngủ sớm.",c:{},o:100,w:{suc:20},l:{}},
  {n:"Thêu khăn bán ra ngoài",t:"Lén nhờ cung nữ mang ra cửa Thần Vũ.",c:{suc:-10},o:od(75),w:{bac:35},l:{danh:-4}},
  {n:"Làm thơ dâng lên",t:S.tai>=70?"Thơ ngươi đã truyền khắp cung, danh tiếng thêm vang.":"Tài hoa là con đường dài.",c:{suc:-5},o:od(30+S.tai/2+S.arts.thi*4*tt),w:{sung:5,danh:S.tai>=70?6:4},l:{danh:-1}},
  {n:"Cầu tự ở Phụng Tiên điện",t:"Thắp hương xin một hoàng tử.",c:BAL.tw.pray,o:od(BAL.tw.g.prayO),w:{},l:{},lock:S.fert>0||S.pray>0,t:"đang có hiệu lực",x:`2 tháng dễ có thai hơn (nay ${chanceW(conceiveCh())})`,go:()=>S.pray=BAL.tw.g.pray},
  {n:"Phát chẩn cho cung nhân",t:"Ban bạc cho kẻ hầu nghèo.",c:{bac:-40},o:od(85),w:{danh:7,mat:1,duc:3},l:{}},
  {n:"Dưỡng nhan",t:"Ngọc trai nghiền, sữa dê tắm, ngủ đủ giấc.",c:{bac:-30},o:od(92),w:{sac:3},l:{}},
  {n:"Luyện cầm kỳ thi họa",t:"Ngày đêm khổ luyện bên án thư.",c:{suc:-10},o:100,w:{tai:2}},
  {n:"Đọc binh thư, sử sách",t:"Học mưu kế người xưa, xem lòng người.",c:{suc:-5},o:100,w:{tamco:2}},
  {n:"Tụng kinh, làm việc thiện",t:"Thắp hương ở Bảo Hoa điện, bố thí kẻ nghèo.",c:{bac:-10},o:100,w:{duc:3}},
  {n:"Thưởng cung nữ",t:`Ban cho ${S.maid.name} vòng bạc, giữ lòng nàng.`,c:{bac:-20},o:100,w:{maid:20}}];
 if(!S.preg&&S.tamco>=50)A.push({n:"Giả mang thai",t:"Mua chuộc thái y, độn bụng, chờ tháng thứ chín tráo con.",c:BAL.tw.fakePreg,o:od(S.tamco),w:{sung:BAL.tw.g.preg[0],th:BAL.tw.g.preg[1]},l:{danh:BAL.tw.g.preg[2]},x:"có 'thai'; tháng 9 phải tráo con, lộ là bị ban chết",go:()=>{S.preg=1;S.fake=1;S.hidden=false;S.pregWk=wk()}});
 return A}
function artActs(){const A=[],r=S.arts;
 const D=BAL.deck;/* one table + one odds formula with the NPC's same act (BAL.deck, j75 deckOdds) */
 if(r.cam>=D.cam.lv)A.push({n:"Đàn khúc Phượng cầu hoàng",t:"Tiếng đàn đêm trăng vọng đến Dưỡng Hòa điện.",c:Object.assign({},D.cam.c),o:od(deckOdds(S,"cam")),w:deckGain("cam"),l:deckLoss("cam")});
 if(r.vu>=D.vu.lv)A.push({n:"Kinh hồng vũ",t:"Điệu múa trong yến tiệc khiến cả điện lặng người.",c:Object.assign({},D.vu.c),o:od(deckOdds(S,"vu")),w:deckGain("vu"),l:deckLoss("vu"),x:`các phi tần ghen +${ghenN(BAL.tw.g.vu[0])}, thiện cảm -${BAL.tw.g.vu[1]}`,go:()=>{ghenAll(BAL.tw.g.vu[0]);liveRivals(true).forEach(v=>v.rel-=BAL.tw.g.vu[1])}});
 if(r.ky>=D.ky.lv)A.push({n:"Đánh cờ với Hoàng thượng",t:"Biết lúc thắng, biết lúc nhường.",c:Object.assign({},D.ky.c),o:od(deckOdds(S,"ky")),w:deckGain("ky"),l:deckLoss("ky")});
 if(r.hoa>=3)A.push({n:"Vẽ chân dung tặng Thái hậu",t:"Mất nửa tháng, từng sợi tóc bạc.",c:{suc:-10,bac:-10},o:od(50+artW("hoa",r.hoa)*8),w:{th:10},l:{th:-1}});
 return A}
function deal(){
 const X=[];const v=S.tonight&&S.tonight!=="me"?S.tonight:null;
 if(v){X.push({n:"Tranh sủng",t:`Tối nay thẻ bài của ${v.name} được lật. Sai cung nữ giả cớ ngươi đau tim, mời Hoàng thượng sang.`,c:stealCost("feign"),o:oSteal(S),w:{},l:{sung:-BAL.steal.failSung},b:B4L,x:stealX(v),go:()=>{log(stealWin(S,v,"feign"))}});
  X.push({n:"Chặn ngự giá",t:`Chờ ở hành lang ngự giá đi qua, múa một khúc dưới đèn lồng, mong ngài dừng bước.`,c:stealCost("road"),o:oSteal(S,"road"),w:{},l:{sung:-BAL.steal.failSung},b:B4L,x:stealX(v,1),go:()=>{log(stealWin(S,v,"road"))}})}
 const ua=artActs();if(ua.length)X.push(pick(ua));
 const live=S.kids.filter(k=>k.alive);
 const ed=live.filter(k=>k.age>=3).sort((a,b)=>a.tal-b.tal);
 if(ed.length){const k=ed[0],g=4+Math.round(S.tai/20);X.push({n:`Dạy dỗ ${k.sex==="m"?"hoàng tử":"công chúa"}`,t:`Tự tay dạy ${k.name} chữ nghĩa, lễ nghi.`,c:{suc:-10},o:100,w:{},x:`Tài ${k.name} +${g}`,go:()=>{k.tal=cl(k.tal+g,0,100)}})}
 if(live.length){const k=live.slice().sort((a,b)=>a.fond-b.fond)[0];X.push({n:"Đưa con đến thỉnh an Hoàng thượng",t:`Dắt ${k.name} đến Dưỡng Hòa điện.`,c:{suc:-5},o:od(70+S.sung/10+mm()),w:{sung:2},l:{},x:`Hoàng thượng thương ${k.name} +8`,go:()=>{k.fond=cl(k.fond+8,0,100)}})}
 const sick=live.filter(k=>k.hp<70).sort((a,b)=>a.hp-b.hp)[0];
 if(sick&&S.arts.y>=4)X.push({n:"Chữa bệnh cho con",t:`${sick.name} đang yếu, ngươi tự bốc thuốc.`,c:{suc:-10},o:100,w:{},x:`Sức khỏe ${sick.name} +30`,go:()=>{sick.hp=Math.min(100,sick.hp+30)}});
 if(S.preg&&!S.fake)X.push(S.arts.y>=4?{n:"Tự bào chế thuốc an thai",t:"Ngươi tự sắc thuốc, không ai nhúng tay được.",c:{suc:-5},o:100,w:{},x:"tháng này nguy cơ sảy thai giảm một nửa",go:()=>S.anthai=1}
   :{n:"An thai",t:"Nằm nghỉ, uống thuốc an thai.",c:{bac:-20},o:100,w:{suc:10},x:"tháng này nguy cơ sảy thai giảm một nửa",go:()=>S.anthai=1});
 if(S.preg&&S.hidden&&S.preg<=3)X.push({n:"Báo tin có thai",t:"Đang giấu thai. Báo tin thì được sủng ái, nhưng kẻ ác cũng biết.",c:{},o:100,w:{sung:BAL.tw.g.ann[0],th:BAL.tw.g.ann[1]},x:`kèm: mọi phi tần ghen +${ghenN(BAL.tw.g.ann[2])}, ai cũng biết ngươi mang thai`,go:()=>{S.hidden=false;ghenAll(BAL.tw.g.ann[2])}});
 const s=STORY[S.origin.k];if(!S.st.done&&s.acts)X.push(...s.acts());
 X.push(...directActs());X.push(...illCards());
 X.forEach(a=>{if(!a.dom)a.dom=/Dạy dỗ|con đến|Chữa bệnh/.test(a.n)?"Con cái":/an thai|Báo tin/i.test(a.n)?"Sức khỏe":/Tranh sủng|Chặn ngự giá/.test(a.n)?"Sủng":/Thỉnh an|Hối lộ/.test(a.n)?"Giao thiệp":"Tài nghệ"});
 deck=S.out?coldActs().concat(illCards()):X.concat(pool().sort(()=>Math.random()-.5).slice(0,5));
}
/* place acts also offered directly as cards: same option object as at the place (talkOpts), run once by runOpt */
function directActs(){const A=[],mk=(p,i,n,t)=>{const a=talkOpts(p)[i];if(a)A.push(Object.assign({},a,{n,t}))};
 if(!S.thDead)mk({kind:"th"},0,"Thỉnh an Thái hậu","Sang Đức Thọ cung vấn an, chép kinh cho Thái hậu.");
 /* hotfix 11/15: the deck act is the "Thỉnh an" talk option (moves S.hh), not option 0 "Hỏi han sức khỏe" whose run() a deck act never calls */
 if(qOn())mk({kind:"hh",ref:rivals[0]},Math.max(0,talkOpts({kind:"hh",ref:rivals[0]}).findIndex(a=>a.n==="Thỉnh an")),"Thỉnh an Hoàng hậu",`Sang Càn Ninh cung vấn an Hoàng hậu ${rivals[0].name}.`);A.forEach(a=>{a.lock=false;a.b=0});
 mk({kind:"ksp"},0,"Hối lộ Kính sự phòng","Đút lót Tổng quản thái giám giữ thẻ bài.");
 return A}
function canPay(a){return !(a.c&&a.c.bac&&S.bac+a.c.bac<0)&&!a.lock}
function logReal(b){try{const K=typeof RKEYS!=="undefined"?RKEYS:Object.keys(NAMES).map(k=>[k,NAMES[k]]);const out=[];for(const [k,n] of K){if(!(k in b))continue;/* a key the snapshot did not take never shows as "0→N" */const x=b[k]||0,y=S[k]||0;if(x!==y)out.push(`<span class="${(y>x)!==(k==="ghen")?"g":"r"}">${n} ${x}→${y}</span>`)}return out.join(", ")}catch(e){return""}}
function snapReal(){const b={};/* RKEYS too: logReal lists Ân tình, which NAMES lacks ("Ân tình 0→N" on every act, log-sync) */for(const k of new Set(Object.keys(NAMES).concat(typeof RKEYS!=="undefined"?RKEYS.map(x=>x[0]):[])))b[k]=S[k]||0;return b}
function runOpt(a){if(!canPay(a))return null;const b0=snapReal(),s0=S.logSeq||0;if(a.c)apply(a.c);const o0=a.o==null?100:a.o,o=o0>=100?100:cl(o0+lotB(S,a.dom),5,95);const ok=o>=100||roll(o);
  apply(ok?(a.w||{}):(a.l||{}));
  {const d=typeof lsRest==="function"?lsRest(b0,lsLines((S.logSeq||0)-s0)):logReal(b0);log(`${a.n}${o<100?(ok?': <span class="g">thành</span>.':': <span class="r">hỏng</span>.'):"."}${d?" "+d+".":""}`)}
  if(ok){if(a.go)a.go()}else if(a.fail)a.fail();
  return ok}
function cardCost(a){return a.k||(a.c&&a.c.suc<=-20?4:a.c&&(a.c.suc||a.c.bac||a.c.duc)?2:1)}
function act(i){const a=deck[i];if(!a||(a.b!=null&&(S.buoi||0)!==a.b)||!can(cardCost(a))||a.done||S.dead||Q.length||!canPay(a))return;a.done=1;spend(cardCost(a));runOpt(a);render()}

/* places */
function places(){const L=[
  {k:"vuon",n:"Ngự hoa viên",d:"Hoa nở bốn mùa. Xuân thu Hoàng thượng hay dạo bước.",sc:"vuon"},
  {k:"thu",n:"Cần Chính điện",d:"Nơi ngài phê tấu chương. Đến không được gọi dễ làm ngài phật ý.",sc:"thu"},
  {k:"dtd",n:"Dưỡng Hòa điện",d:"Tẩm điện của Hoàng thượng. Sủng dưới 50 thì thái giám không cho vào.",sc:"dtd"},
  {k:"tn",n:"Đức Thọ cung",d:"Cung của Thái hậu, khói trầm quanh năm.",sc:"tn"}];
 if(qOn())L.push({k:"kn",n:"Càn Ninh cung",d:`Cung của Hoàng hậu ${rivals[0].name}.`,sc:"kn"});
 for(const v of rivals)if(v.alive&&!v.out&&!v.queen)L.push({k:"r"+v.id,n:`Cung ${v.name}`,d:`${RANKS[v.rank].n} ${v.name} ở đây.`,sc:"rv",v});
 L.push({k:"tyv",n:"Thái y viện",d:"Thuốc thang, thái y, bài thuốc bí truyền.",sc:"tyv"},{k:"ksp",n:"Kính sự phòng",d:"Nơi giữ thẻ bài các phi tần.",sc:"ksp"},{k:"lc",n:"Lãnh cung",d:"Nơi các phi tần thất thế sống lay lắt.",sc:"lc"});
 return L}
function placeOf(k){if(k==="home")return{k,n:"Tẩm cung của ngươi",d:"Cung nữ và các con ở đây.",sc:"home"};const f=places().find(p=>p.k===k);if(f)return f;if(k&&k[0]==="r"){let nm="";try{nm=typeof palName==="function"?palName(k):""}catch(e){}const v=RV(+k.slice(1));if(!nm||/ngươi/.test(nm))nm=v?`Cung của ${v.name}`:"Cung phi tần";return{k,n:nm,d:"",sc:"rv"}}return{k,n:"Tẩm cung của ngươi",d:"",sc:"home"}}
function rp(v){return{kind:"rival",ref:v,name:v.name,ini:v.name.split(" ").pop()[0],col:RCOL[v.queen?7:v.rank],info:`${v.queen?"Hoàng hậu":RANKS[v.rank].n} · ${trChip(v)} · Với ngươi: Thiện cảm ${aff(v,S)} · Oán ${oan(v,S)} · Ghen ${v.ghen}${sameHouse(S,v)?" · cùng cung":""}`}}
/* s31 stage-caption: ONE source of who is where = the j95 place record (S.roster.P); falls back to the old S.where only when the record is off */
function recAt(id,k){try{const R=S&&S.roster;if(R&&R.P&&R.P[id]&&typeof j95gate==="function"&&j95gate()&&!(window.COOPW&&COOPW.on)){const e=R.P[id][j95kh()];if(e)return e[0]===k}}catch(e){}return null}
function stageCapFix(V){/* the caption is written AFTER the people are reconciled: person claims follow V.people, never a stale goTo line */
 try{if(!V||!Array.isArray(V.people)||typeof V.msg!=="string")return;
  const c=V.cap;if(c&&c.emp&&c.cur&&V.msg.includes(c.cur)){const w=V.people.some(p=>p.kind==="emp")?c.emp[0]:c.emp[1];if(w!==c.cur){V.msg=V.msg.replace(c.cur,w);c.cur=w}}
  const n=V.people.filter(p=>p.kind!=="chest").length;const cnt=n?`Ở đây có ${n} người.`:"Không gặp ai.";
  if(/Ở đây có \d+ người\./.test(V.msg))V.msg=V.msg.replace(/Ở đây có \d+ người\./,cnt);else if(V.msg==="Không gặp ai."&&n)V.msg=cnt}catch(e){}}
function goTo(k){if(S.dead||Q.length||S.out)return;popIdx=null;popMsg="";
 if(k==="home"){S.place="home";S.visit={k,people:homePeople(),talked:false,tk:{}};render();return}
 const tc=travel(S.place,k);if(!walkOk(tc)||S.confined)return;const P=placeOf(k);spend(tc);S.place=k;const W=S.where||{};
 const ppl=[];let msg="";const emp={kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:`${empName()} · ${MOODS[S.emp.mood][0].toLowerCase()}`};
 const at=(id,w)=>{const r=recAt(id,k);return r==null?w===k:r};const here=liveRivals(true).filter(v=>at("v"+v.id,W[v.id]));const empHere=at("emp",W.emp);const cap={};
 if(k==="vuon"){if(empHere){ppl.push(emp);apply({sung:S.emp.mood<=1?3:1});msg="Ngươi tình cờ gặp Hoàng thượng đang dạo bước. Ngài dừng lại nhìn ngươi.";cap.emp=[msg,"Hoa nở rộ. Hoàng thượng không ra vườn hôm nay."]}else{msg="Hoa nở rộ. Hoàng thượng không ra vườn hôm nay.";cap.emp=["Ngươi tình cờ gặp Hoàng thượng đang dạo bước. Ngài dừng lại nhìn ngươi.",msg]}}
 if(k==="thu"){if(empHere){if(S.sung<40&&!roll(od(40+S.sung+mm()))){apply({sung:-3});S.visit={k,people:[emp],talked:true,tk:{},msg:"Hoàng thượng cau mày: “Trẫm đang bận việc nước.” Ngươi phải lui ra."};log("Đến Cần Chính điện, bị đuổi về.");render();return}
   ppl.push(emp);msg="Hoàng thượng đang phê tấu chương, ngẩng lên nhìn ngươi.";cap.emp=[msg,"Ngài không có ở thư phòng."]}else{msg="Ngài không có ở thư phòng.";cap.emp=["Hoàng thượng đang phê tấu chương, ngẩng lên nhìn ngươi.",msg]}}
 if(k==="dtd"){if(S.sung<50)msg=kSay({srv:"m"},S,"Thái giám chặn cửa: “Không có khẩu dụ, {goi} xin hồi cung.”")+(empHere?" Hoàng thượng ở bên trong, ngươi không được gặp.":"");else if(empHere){ppl.push(emp);msg="Hoàng thượng đang nghỉ, cho ngươi vào hầu.";cap.emp=[msg,"Hoàng thượng không có ở điện."]}else{msg="Hoàng thượng không có ở điện.";cap.emp=["Hoàng thượng đang nghỉ, cho ngươi vào hầu.",msg]}}
 if(k==="tn"){if(S.thDead)msg="Đức Thọ cung vắng lặng từ ngày Thái hậu băng hà.";else ppl.push({kind:"th",name:"Thái hậu",ini:"Từ",col:"#c9a0e0",info:`Thái hậu · lòng ${S.th}`})}
 for(const v of here){if(v.ill)v.ill.known=true;if(v.queen&&qOn())ppl.push({...rp(v),kind:"hh",name:`Hoàng hậu ${v.name}`,ini:"Phượng"});else ppl.push(rp(v))}
 if(P.v&&!here.includes(P.v)&&P.v.alive&&!P.v.out){ppl.push({kind:"chest",ref:P.v,name:`Rương của ${P.v.name}`,ini:"Rương",col:"#8a6a4a",info:"Chủ nhân đi vắng"});msg=`${P.v.name} không có ở cung.`}
 if(k==="tyv")ppl.push({kind:"ty",name:(S.court&&S.court.ty&&S.court.ty.name)||"Thái y Trương",ini:"Y",col:"#8fc38a",info:"Thái y viện"});
 if(k==="ksp")ppl.push({kind:"ksp",name:(S.court&&S.court.ksp&&S.court.ksp.name)||"Tổng quản",ini:"Hoạn",col:"#b9a48a",info:"Giữ thẻ bài các phi tần"});
 /* D4 (owner OD:L641): Phế phi họ Lý STAYS beside fallen rivals until she dies; then the post is empty until a real person arrives */
 if(k==="lc")lcPeople("Phế phi").forEach(x=>ppl.push(x));
 if(!msg){msg=ppl.length?`Ở đây có ${ppl.length} người.`:"Không gặp ai.";cap.cnt=1}
 if(cap.emp)cap.cur=msg;S.visit={k,people:ppl,talked:false,tk:{},msg,cap};log(`Đến ${P.n}.`);render()}
function curPeople(){return S.visit?S.visit.people:[]}

function talkOpts(p){const E=S.emp,K=E.known,L=E.likes,b=bestArt(),v=p.ref;
 if(p.kind==="emp"){const A=[
   {n:"Tâng bốc",o:od(55+S.sung/5+mm()),w:{sung:3},l:{sung:-1},go:()=>{if(roll(25))discover()}},
   {n:"Nói thật lòng",o:od(45+S.duc/3+mm()+(has("nhantu")?10:0)),w:{sung:2,danh:2},l:{sung:-2},x:`biết thêm một điều ngài thích hay không ưa: ${chanceW(50)}`,go:()=>{if(roll(50))discover()}},
   {n:`Phô tài: ${b.n}`,c:{suc:-5},o:od(30+b.w*10+mm()),w:{sung:4+b.l,danh:1},l:{danh:-2}},
   {n:K.flower?`Dâng ${L.flower}`:"Dâng một cành hoa",c:{bac:-BAL.deck.qf.bac},o:K.flower?100:od(BAL.deck.qf.o),w:{sung:K.flower?BAL.deck.qf.wKnown:BAL.deck.qf.w},l:{}}];
  if(S.sung>=30)A.push({n:"Xin ân điển",o:od(35+S.sung/3+mm()),w:{bac:60},l:{sung:-4},fail:()=>{if(E.mood===3&&roll(40))punish("làm phiền lúc thánh thượng nổi giận",1)}});
  if(has("chamchinh"))A.push({n:"Bàn chuyện triều chính",o:od(40+S.tamco/2+S.arts.thi*3+mm()),w:{sung:4,danh:3},l:{sung:-2}});
  return A}
 if(p.kind==="th"){if(false)return[{n:"Xin xăm ở Phật đường",o:100,x:"rút hai quẻ, giữ quẻ tốt hơn",run:()=>{reLot(true);return "Ngươi thắp hương, xin một quẻ mới."}},];const t=liveRivals(false).filter(x=>x.ev>0).sort((a,c)=>c.ev-a.ev)[0];return[
   {n:"Thỉnh an, chép kinh",lock:(S.buoi||0)!==0,t:"chỉ buổi sáng",c:{suc:-5},o:od(75),w:{th:8,danh:2,duc:1},l:{th:-2}},
   {n:"Xin Thái hậu đỡ lời",o:od(45+S.th/3),lock:S.th<30,t:"cần Thái hậu 30",w:{danh:4,hh:5},x:"Hoàng hậu nể mặt",l:{th:-5}},
   {n:t?`Kể tội ${t.name}`:"Kể tội một phi tần",lock:!t,t:"cần chứng cứ",o:t?od(40+t.ev*10+S.th/5):0,w:{th:2,duc:-2},x:"nàng bị phạt",l:{th:-4},go:()=>{t.rel-=15;t.ev--;t.sung=cl(t.sung-10,0,100);log(`${t.name} bị Thái hậu quở trách, mất sủng.`)}}]}
 if(p.kind==="hh"){return topicOpts(v).filter(a=>["Hỏi han sức khỏe","Tạ lỗi","Nhún nhường","Chia sẻ bí mật"].includes(a.n)).concat([
   {n:"Thỉnh an",lock:(S.buoi||0)!==0,t:"chỉ buổi sáng",c:{suc:-5},o:od(70),w:{hh:4,danh:2,duc:1},l:{hh:-3},go:()=>{v.ghen=cl(v.ghen-5,0,100)}},
   {n:"Xin Hoàng hậu che chở",lock:S.hh<20,t:"cần Hoàng hậu 20",o:od(45+S.hh/3),w:{hh:3},x:"2 tháng phi tần khó hại ngươi",l:{hh:-5},go:()=>S.shield=2},
   {n:"Khiêu khích",o:100,w:{danh:2,hh:-15},x:"Hoàng hậu ghen +15, oán ngươi +9",go:()=>{v.ghen=cl(v.ghen+15,0,100);oanAdd(v,S,9)}}])}
 if(p.kind==="rival"){const A=topicOpts(v);
  if(!sameHouse(S,v)){A.push({n:"Tặng quà",o:100,x:"chọn món trong rương",open:()=>{if(S.inv.some(e=>!e.h))pushDil(mkP("giftpick",{v:v.id}),"Tặng quà")}});
   const PK=BAL.talk.provoke;A.push({n:"Khiêu khích",o:100,w:{danh:PK.danh},x:`nàng quý ngươi -${PK.rel}, oán ngươi +${Math.round(PK.rel*BAL.relOan.hurt)}, ghen +${PK.ghen}`,go:()=>{relAdd(S,v,-PK.rel);v.ghen=cl(v.ghen+PK.ghen,0,100)}});
   if(v.pg>=50)A.push({n:"Trút giận",o:100,w:{duc:-3},x:"hả cơn ghen; nàng oán",go:()=>{v.pg=0;relAdd(S,v,-20)}});
   A.push(...placeHarms(v,S.place));if(liveRivals(true).filter(x=>whereOf(x)===S.place).length>=2)A.push({n:"Nghe lén câu chuyện",o:od(BAL.ag.wit.hear+S.mat*BAL.ag.wit.mat),x:"chứng cứ +1",run:()=>overhear(S.place)})}
  return A}
 if(p.kind==="chest"){if(sameHouse(S,v))return[];return[{n:"Cài đồ vào rương nàng",o:cl(oPlant(S,v)+15,5,95),x:"chọn món đồ · tại chỗ, dễ hơn sai người",open:()=>{if(S.inv.some(e=>!e.h)&&can(2))pushDil(mkP("plantpick",{v:v.id,here:1}),"Cài đồ vào rương")}},
  {n:"Lục rương tìm chứng cứ",o:od(45+S.mat*5),act:1,x:"chứng cứ +1 nếu nàng có làm điều sai · lộ: bị phạt",run:()=>{if(roll(od(45+S.mat*5))){return evA(S,v,1)?`Lục được thư từ của ${v.name}: chứng cứ +1.`:`Lục rương ${v.name}: không thấy điều gì sai trái.`}relAdd(S,v,-15);punish("lục lọi cung phi tần",1);return "Bị cung nhân bắt gặp."}}]}
 if(p.kind==="ty"){const A=[];if(illOf(S))A.push({n:"Xin chữa bệnh",c:{bac:-30},o:100,x:illName(S),run:()=>treat(S,"ty")});A.push({n:"Bài thuốc dễ thụ thai",c:{bac:-40},o:100,x:"3 tháng dễ có thai hơn",go:()=>S.fert=3});
  if(!S.doctor)A.push({n:"Mời làm thái y tâm phúc",c:{bac:-50},o:100,x:"dễ phát hiện xạ hương và độc; bệnh của con nhẹ hơn",go:()=>S.doctor=1});
  const k=S.kids.filter(x=>x.alive&&x.hp<80).sort((a,c)=>a.hp-c.hp)[0];if(k)A.push({n:`Xin thuốc cho ${k.name}`,c:{bac:-30},o:100,x:"Sức khỏe +25",go:()=>{k.hp=Math.min(100,k.hp+25)}});
  A.push({n:"Học hỏi y lý",c:{bac:-10},o:100,x:"Y thuật tiến bộ một phần",go:()=>addArt("y",1)});return A}
 if(p.kind==="ksp"){const A=[{n:"Đút lót lật thẻ",c:{bac:-30},o:100,lock:S.tablet>0,t:`đang có hiệu lực ${S.tablet} tuần`,x:`2 tuần tới dễ được lật thẻ: ${chanceW(nightCh())} → dễ hơn một bậc`,go:()=>S.tablet=2}];
  if(Object.keys(LIKES).some(k=>!K[k])||(typeof disUnk==="function"&&disUnk("emp")))A.push({n:"Hỏi sở thích Hoàng thượng",c:{bac:-15},o:od(80),x:"biết thêm một điều ngài thích hay không ưa",go:()=>discover()});
  A.push({n:"Xem sổ thị tẩm",o:100,x:"biết ai đang được sủng",go:()=>log("Sổ thị tẩm: "+kitNameList(liveRivals(true),x=>`${x.name} ${x.nights} lần`)+`; ngươi ${S.nights} lần.`)});return A}
 if(p.kind==="peddler")return S.shop.slice(0,6).map(k=>({n:`Mua ${itm(k).n}`,c:{bac:-itm(k).pr},o:100,x:itm(k).d,go:()=>S.inv.push({k})}));
 if(p.kind==="fallen")return[
   {n:"Đưa cơm áo",c:{bac:-20},o:100,w:{duc:4}},
   {n:"Hỏi chuyện cũ",o:od(50+S.tamco/5),x:"chứng cứ +1 về một phi tần từng làm điều sai",go:()=>{const x=evGuilty(S,liveRivals(true));if(x&&evA(S,x,1))log(`Phế phi kể chuyện xấu của ${x.name}: chứng cứ +1.`);else log("Phế phi chỉ kể chuyện cũ vô hại, không có gì làm chứng cứ.")}}];
 if(p.kind==="maid")return[
   {n:"Tâm sự",o:100,w:{maid:6}},
   {n:"Sai đi dò la",o:od(40+S.maid.loyal/3),w:{},l:{maid:-5},x:"chứng cứ +1 về một phi tần từng làm điều sai",go:()=>{const x=evGuilty(S,liveRivals(true));if(x&&evA(S,x,1))log(`${S.maid.name} nghe lén được chuyện của ${x.name}: chứng cứ +1.`);else{const y=pick(liveRivals(true));log(y?`${S.maid.name} nghe lén ${y.name}: không có gì sai trái, chỉ biết ${harmTxt(y)}.`:`${S.maid.name} không nghe được gì.`)}}}];
 return []}
function talk(oi){if(popIdx==null||!S.visit||S.visit.talked===true||S.dead||Q.length)return;S.visit.tk=S.visit.tk||{};if(S.visit.tk[popIdx])return;const p=curPeople()[popIdx];if(!p)return;const a=talkOpts(p)[oi];if(!a||!canPay(a))return;
 const tcost=a.act?2:1;if(!can(tcost))return;spend(tcost);
 if(a.run){if(a.c)apply(a.c);S.visit.tk[popIdx]=1;popMsg=a.run()||"";if(popMsg)log(`${a.n}: ${popMsg}`);render();return}
 if(a.open){a.open();render();return}
 S.visit.tk[popIdx]=1;const s0=S.logSeq||0;const ok=runOpt(a);
 /* two forms from one line (jvoice kGL / kLitLog): the Sổ ghi line and this card note carry the literary sentence, the result card only the facts */
 let lit="";try{lit=kLitLog(s0,kOutcome(p.kind,ok,p))}catch(e){}
 popMsg=`${a.n}: ${ok?'<span class="g">thành</span>':'<span class="r">hỏng</span>'}. ${lit?kGL("",lit):""}${fmt(ok?a.w:a.l)}`;render()}

/* arts */
function addArt(k,g){const a=ARTS.find(x=>x.k===k);S.artp[k]+=g;
 while(S.arts[k]<5&&S.artp[k]>=S.arts[k]+2){S.artp[k]-=S.arts[k]+2;S.arts[k]++;const l=S.arts[k];const f={[a.st]:2};if(l===3)f.danh=3;if(l===5)f.danh=6;apply(f);
   log(`<span class="g">${a.n} lên bậc ${l}.</span> ${fmt(f)}${l===3?" Cả cung nghe danh.":l===5?" Tiếng tăm vang khắp kinh thành.":""}`)}
 if(S.arts[k]>=5)S.artp[k]=0}
function lesson(k){const l=S.arts[k],cost=typeof tchFee==="function"?tchFee(k):5+l*5;if(!can(2)||l>=5||S.bac<cost||S.dead||Q.length||S.mg)return;apply({suc:-10,bac:-cost});spend(2);render();
 S.mg={k,l};save();resumeMG()}
function resumeMG(){const m=S.mg;if(!m)return;const a=ARTS.find(x=>x.k===m.k);openMG(m.k,m.l,g=>{S.mg=null;log(`Học ${a.n}. Tiến bộ +${g}.`);addArt(m.k,g);render()})}
function hireMaster(){if(S.bac<60||S.master||S.dead)return;apply({bac:-60});S.master=3;log("Mời danh sư vào cung dạy: 3 tháng tiến bộ gấp đôi.");render()}

/* what a won night is worth, in numbers: a full thị tẩm (Sủng, Ân tình, a chance of a child and of a gift); the cost to the rival on a red 'kèm' line */
function stealX(v,road){let c=0;try{c=conceiveCh(S)}catch(e){}return `Sủng +${nightG(0)} đến +${nightG(10)} · Ân tình +${nightA(0)} đến +${nightA(5)}${S.preg?"":` · thai: ${chanceW(c)}`} · có thể được thưởng · kèm: ${stealKem(v)}`}
function stealKem(v){const B=BAL.steal;const h=BAL.relOan.hurt;let o=Math.round(B.rel*h);try{o=Math.round(B.rel*h*persF(v,"slight",1))}catch(e){}return `${v.name} ghen +${B.ghen}, quý ngươi -${B.rel}, oán ngươi +${o}`}
