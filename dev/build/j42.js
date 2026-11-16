
/* ================= CUNG NỮ: A TRUE SERVANT START (origin 'cnv') =================
   She enters as a palace maid of a rival consort (the mistress), below Đáp ứng. While S.srv is set and not risen she is
   NOT a consort: consorts() leaves her out, the week / month run the world for the rivals and her own servant life
   (chores in khắc, the mistress's moods by trait, wage, servant rank by the j14 ladder, orders, bribes, frames).
   Roads up: the Emperor's notice -> Đáp ứng (then the normal consort game), chưởng sự -> ma ma, ban gả (ending).
   Roads down: punishment, Tân Giả khố (laundry), death in a scheme.
   Access: placeEnterHook(p,place) -> {ok,why} | null (no opinion); also plugged into j41 accRole / canEnter / accessOf. */
ORIGINS.push({k:"cnv",n:"Cung nữ tuyển vào cung",r:0,o:{},hh:0,th:0,t:"Con nhà thường dân, qua kỳ tuyển cung nữ của Nội vụ phủ. Ngươi vào cung làm kẻ hầu, dưới cả Đáp ứng."});
NAMES.tin="Chủ tin";NAMES.nt="Hoàng thượng để ý";
RKEYS.push(["tin","Chủ tin"],["nt","Hoàng thượng để ý"]);
Object.assign(HX,{tin:"Chủ tin: lòng tin của chủ nhân với ngươi (0-100). Cao thì được thưởng, tiến cử; dưới 10 dễ bị đày Tân Giả khố.",nt:`Hoàng thượng để ý: ngài có nhớ mặt ngươi không. Từ ${BAL.ntRise.at} trở lên, mỗi lần để ý ngươi ngài hỏi tên và phong Đáp ứng (càng cao càng dễ).`,srk:"Bậc cung nữ: Cung nữ → Đại cung nữ → Chưởng sự cô cô. Bậc cao nhất tùy phẩm của chủ.",merit:"Công lao: làm việc, được chủ tiến cử. Đủ thì cuối tháng Nội vụ phủ thăng bậc (cần Chủ tin 35).",wage:"Lương tháng theo bậc cung nữ.",age:"Cung nữ được xuất cung năm 25 tuổi. Chưởng sự được ở lại làm ma ma.",lau:"Tân Giả khố: giặt đồ chịu phạt. Hết hạn thì Nội vụ phủ chia về hầu chủ mới.",sec:"Số chuyện mờ ám của chủ mà ngươi biết. Có thể mật báo để lấy thưởng, nhưng chủ biết thì nguy.",spy:"Ngươi nhận bạc làm tai mắt cho người khác."});
Object.assign(HXN,{tin:"Chủ tin",nt:"Để ý"});
STORY.cnv={t:"Từ cung nữ lên phi tần",n:3,goal:"Ngươi vào cung làm cung nữ. Được Hoàng thượng để mắt mà phong Đáp ứng, rồi leo lên Tần.",init(){},
 hint:()=>["Được Hoàng thượng để mắt, phong Đáp ứng","Lên Thường tại","Lên Tần"][S.st.step]||"",
 calc:()=>!S.srv||!S.srv.risen?0:S.rank>=3?3:S.rank>=1?2:1,
 month(){if(S.srv&&S.srv.risen&&S.rank>=3&&!S.st.done){stEnd(1,"Từ cung nữ lên Tần");return `<b class="g">Từ thân cung nữ, ngươi đã lên Tần.</b> `}return ""}};
const CNV_WAGE=[1,3,5,8,12];
const WEDW=["Thân vương Dụ","Thị lang bộ Lễ họ Trương","Tham tướng cấm quân họ Lục","Tiến sĩ họ Tô vừa đỗ khoa này"];
function isSrv(){return !!(S&&S.srv&&!S.srv.risen)}
function srvM(){return S&&S.srv?RV(S.srv.mid):null}
function bid(){return wk()*B4N+(S.buoi||0)}
function srvTitle(){if(!S||!S.srv)return"";if(S.srv.lau>0)return"Cung nữ Tân Giả khố";const m=srvM();const n=S.srv.mama?"Ma ma":SRK.maid[S.srv.rk]||"Cung nữ";return m?`${n} của ${m.name}`:n}
function srvRkN(){return S.srv.lau>0?"Cung nữ Tân Giả khố":S.srv.mama?"Ma ma":SRK.maid[S.srv.rk]||"Cung nữ"}
function srvW(f){if(!isSrv())return f();const o=S.out;S.out=1;try{return f()}catch(e){console.error(e);return""}finally{S.out=o}}
function srvMerit(n){S.srv.mp=(S.srv.mp||0)+n}
function srvOnce(k,sc){const v=S.srv.once[k];return !!v&&(sc==="b"?v.b===bid():v.w===wk())}
function srvWhere(v){const w=whereOf(v);if(!w||w==="home"||w==="tgk")return palaceOf(v);try{return places().some(x=>x.k===w)?w:palaceOf(v)}catch(e){return palaceOf(v)}}
function srvMisHome(){const m=srvM();return !!m&&srvWhere(m)===palaceOf(m)}
function misAdj(m){return (m.trait==="Hiền lành"||m.trait==="Nhu mì"?10:m.trait==="Kiêu ngạo"||m.trait==="Hiểm độc"?-8:0)+(S.tin-40)/5}
function srvAf(s,n){S.srv.af[s.sid]=cl((S.srv.af[s.sid]||0)+n,-100,100)}
function srvColleagues(){const m=srvM();const L=(m&&m.staff||[]).slice();for(const sid of S.srv.met||[]){const s=servById(sid);if(s&&!L.includes(s))L.push(s)}return L.slice(0,10)}
function srvFriendList(){return srvColleagues().filter(s=>(S.srv.af[s.sid]||0)>=30)}
function srvMax(){const m=srvM();return m?srkMax(m,{role:"maid"}):2}
function srvToast(msg){if(window.__bot)return;let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}t.onclick=()=>t.classList.remove("on");
 t.className="rtoast bad";t.innerHTML=`<b class="seal">CẤM</b><div class="rt"><b>${msg}</b></div>`;void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),2600)}

/* ---------- start: the consort start runs, then she is turned into a maid of a random rival ---------- */
function srvInit(){const L=liveRivals(true);if(!L.length)return;const m=pick(L.filter(v=>v.rank>=1).length?L.filter(v=>v.rank>=1):L);
 S.srv={mid:m.id,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:m.schemes||0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};
 S.tin=40+R(11);S.nt=0;S.sung=0;S.danh=2;S.bac=6+R(6);S.age=18+R(3);S.rank=0;S.staff=[];S.lot=null;S.pal=null;S.resHead=null;S.mat=0;S.tonight=null;S.shop=[];
 if(!m.staff)m.staff=[];if(!m.staff.length)try{fillStaff(m,true)}catch(e){}
 for(const s of m.staff)S.srv.af[s.sid]=R(21)-5;
 for(const s of allServ().filter(x=>ownerOf(x)!==m&&ownerOf(x)!==S).sort(()=>Math.random()-.5).slice(0,3)){S.srv.met.push(s.sid);S.srv.af[s.sid]=R(41)-20}
 S.place="home";S.visit=srvVisitOf("home");tab="act";
 /* review/newgame-ui: event frame — palace-maid entering picture + her figure (KIT 32.2) */Q=[{t:"Nhập cung làm cung nữ",stage:[S],headArt:{src:"img/ev-nhap-cung-cn.webp",label:"Nhập cung"},h:`<p>${S.name}, ${S.age} tuổi, con nhà thường dân. Qua kỳ tuyển cung nữ, Nội vụ phủ chia ngươi về hầu <b>${rkName(m)} ${m.name}</b> ở ${palName(palaceOf(m))}.</p>
  ${kitRows([["Tính chủ",`${m.trait}${m.trait2?", "+m.trait2:""}`,"t"],["Chủ tin ngươi",S.tin,"t"],["Lương tháng",`${CNV_WAGE[1]} bạc`,"t"],
   ["Đường lên","được Hoàng thượng để mắt mà phong Đáp ứng; lên Chưởng sự cô cô; được ban gả","t"],["Đường xuống","bị phạt, đày Tân Giả khố, chết trong mưu của người khác","t"]])}
  <p class="past">Mỗi buổi 4 khắc. Mục Việc: việc nặng và việc chủ sai. Bản đồ: chỉ nơi cung nữ được đến. Đồng liêu: kết bạn, đề phòng kẻ vu cáo.</p>`}];
 log(`Ngươi vào cung làm cung nữ, hầu ${rkName(m)} ${m.name}.`)}
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&S.origin&&S.origin.k==="cnv"&&!S.srv){quiet=true;srvInit();quiet=false;deal();showModal();render()}}catch(e){console.error(e)}return r}})();

/* ---------- she is not a consort while she serves ---------- */
(function(){const c0=consorts;consorts=function(){const L=c0.apply(this,arguments);return isSrv()?L.filter(p=>p!==S):L}})();
(function(){const r0=rivalsBuoi;rivalsBuoi=function(){if(isSrv())return srvW(()=>r0.apply(this,arguments))||"";return r0.apply(this,arguments)}})();
(function(){const a0=apply;apply=function(o){const r=a0.apply(this,arguments);if(S){if(S.tin!=null)S.tin=cl(S.tin,0,100);if(S.nt!=null)S.nt=cl(S.nt,0,100)}return r}})();
(function(){const p0=pMe;pMe=function(){const f=p0.apply(this,arguments);if(isSrv()){f.rk="sv"+S.srv.rk;f.rw=srvRkN();f.col="#b9a48a"}return f}})();

/* ---------- access: one hook (j41 calls it through accRole; canEnter / accessOf wrapped if present) ---------- */
(function(){const prev=typeof window.placeEnterHook==="function"?window.placeEnterHook:null;
 window.placeEnterHook=function(p,place){const k=typeof place==="string"?place:place&&place.k;if(p!==S||!isSrv()||!k)return prev?prev(p,place):null;
  if(S.srv.lau>0)return k==="tgk"?{ok:true,why:""}:{ok:false,why:"đang chịu phạt ở Tân Giả khố"};
  const m=srvM(),mk=m&&palaceOf(m);
  if(k==="home"||k===mk||k==="tgk")return{ok:true,why:""};
  if(typeof accHas==="function"&&accHas(S,k))return{ok:true,why:"có lệnh"};
  const sn=S.srv.sent;if(sn&&!sn.done&&sn.k===k&&sn.until>=bid())return{ok:true,why:"chủ sai đi"};
  if(m&&k===srvWhere(m))return{ok:true,why:"theo hầu chủ"};
  if(k==="vuon"||k==="tyv")return{ok:true,why:""};
  if(k==="lc")return S.srv.rk>=2?{ok:true,why:""}:{ok:false,why:"chỉ Đại cung nữ mới được sai đưa cơm lãnh cung"};
  const why={dtd:"cung nữ không được tự vào tẩm điện",thu:"không có lệnh, không được bén mảng",tn:"chỉ khi chủ sai hoặc theo hầu chủ",ksp:"việc của thái giám",kn:"chỉ khi chủ sai"}[k];
  return{ok:false,why:why||"cung khác: chỉ khi chủ sai"}};
 if(typeof accRole==="function")accRole((p,k)=>{if(p!==S||!isSrv())return null;const h=window.placeEnterHook(S,k);return h?(h.ok?{ok:true}:{ok:false,why:h.why}):null});
 ["canEnter","accessOf"].forEach(nm=>{const f=window[nm];if(typeof f!=="function"||nm==="accessOf"&&typeof accRole==="function")return;window[nm]=function(p,place){const r=f.apply(this,arguments);
  try{if(isSrv()&&(p===S||typeof p==="string"||p==null)){const k=typeof p==="string"?p:typeof place==="string"?place:place&&place.k;const h=window.placeEnterHook(S,k);if(h){if(typeof r==="boolean")return h.ok;if(r&&typeof r==="object")return Object.assign({},r,{ok:h.ok,why:h.why||r.why});return h}}}catch(e){}return r}})})();

/* ---------- places and people ---------- */
(function(){const p0=placeOf;placeOf=function(k){if(k==="tgk")return{k,n:"Tân Giả khố",d:"Nơi cung nhân bị phạt giặt giũ ngày đêm.",sc:"tgk"};
 if(k==="home"&&isSrv()){const m=srvM();return{k,n:`Phòng cung nữ · ${m?palName(palaceOf(m)):""}`,d:"Dãy phòng nhỏ sau hậu điện, nơi cung nữ ăn ngủ.",sc:"maid"}}return p0.apply(this,arguments)}})();
function srvVisitOf(k){const ppl=[];let msg="";const m=srvM();const W=S.where||{};const P=(sk,o)=>ppl.push(Object.assign({kind:"srv",sk},o));
 const rvP=v=>P(v.queen?"hh":v===m?"mis":"rv",{ref:v,name:(v.queen?"Hoàng hậu ":"")+v.name,ini:v.name.split(" ").pop()[0],col:RCOL[rkOf(v)],info:`${rkName(v)}${v===m?" · chủ nhân của ngươi":""} · ${v.trait}`});
 const svP=(s,o)=>{P("sv",{ref:s,sid:s.sid,name:s.name,ini:s.name.split(" ").pop()[0],col:"#b9a48a",info:`${srkName(s)} · ${o===m?"cùng cung":o?"người của "+o.name:"Nội vụ phủ"}`});if(o!==m&&!S.srv.met.includes(s.sid))S.srv.met.push(s.sid)};
 if(k==="tgk")return{k,people:ppl,talked:false,tk:{},msg:"Nước giặt lạnh buốt, chậu gỗ chất cao. Quản sự cầm roi đứng canh."};
 if(k==="home"){const mk=m&&palaceOf(m);if(W.emp===mk)P("emp",{name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:"Hoàng thượng · đang ở cung chủ"});
  if(m&&srvWhere(m)===mk)rvP(m);else if(m)msg=`${m.name} đi vắng, đang ở ${placeOf(srvWhere(m)).n}.`;
  for(const s of (m&&m.staff||[]).slice(0,4))svP(s,m)}
 else{if(W.emp===k)P("emp",{name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:"Hoàng thượng"});
  for(const v of liveRivals(true).filter(v=>srvWhere(v)===k).slice(0,4))rvP(v);
  if(k[0]==="r"||k==="kn"){const hd=accHostK(k);for(const s of (hd&&hd.staff||[]).slice(0,2))svP(s,hd)}
  if(k==="tyv")P("ty",{name:"Thái y Trương",ini:"Y",col:"#8fc38a",info:"Thái y viện"})}
 const sn=S.srv.sent;if(sn&&!sn.done&&sn.k===k&&sn.until>=bid())P("task",{name:"Việc chủ sai",ini:"Vụ",col:"#c9a46a",info:sn.n});
 if(!msg)msg=ppl.length?`Ở đây có ${ppl.length} người.`:"Không gặp ai.";
 return{k,people:ppl,talked:false,tk:{},msg}}
function accHostK(k){if(k==="kn")return rivals.find(v=>v.queen&&v.alive&&!v.out)||null;return RV(+k.slice(1))}
(function(){const h0=homePeople;homePeople=function(){if(isSrv())return srvVisitOf("home").people;return h0.apply(this,arguments)}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="srv"){if(p.sk==="emp")return pEmp();if(p.sk==="ty")return f0({kind:"ty"});
 if(p.sk==="sv"){const s=servById(p.sid);return s?pServ(s):{src:"",ini:p.ini,col:p.col}}if(p.ref&&p.ref.id!=null){const v=RV(p.ref.id);if(v)return pv(v)}return{src:"",ini:p.ini,col:p.col}}return f0(p)}})();
function srvGoTo(k){if(!S||S.dead||Q.length)return false;popIdx=null;popMsg="";const m=srvM();if(m&&k===palaceOf(m))k="home";
 if(S.srv.lau>0||k==="tgk"){S.place="tgk";S.visit=srvVisitOf("tgk");if(k!=="tgk")srvToast("Đang chịu phạt ở Tân Giả khố");render();return k==="tgk"}
 if(k==="home"){S.place="home";S.visit=srvVisitOf("home");render();return true}
 const h=window.placeEnterHook(S,k);if(h&&!h.ok){if(!S.visit||S.visit.k!==S.place)S.visit=srvVisitOf(S.place);srvToast(`${placeOf(k).n}: ${h.why}`);render();return false}
 const from=S.place==="home"&&m?palaceOf(m):S.place;const tc=travel(from,k);if(!walkOk(tc)){if(!S.visit||S.visit.k!==S.place)S.visit=srvVisitOf(S.place);srvToast(walkWhy(tc));render();return false}
 spend(tc);S.place=k;S.visit=srvVisitOf(k);log(`Đến ${placeOf(k).n}.`);render();return true}
(function(){const g0=goTo;goTo=function(k){if(!isSrv())return g0.apply(this,arguments);const wasMap=tab==="go";const ok=srvGoTo(k);if(ok&&wasMap&&!S.dead&&S.place!=="home"){window.__fromMap=1;tab="act";render()}return ok}})();

/* ---------- talking to people as a maid ---------- */
function srvTalk(p){const m=srvM();const A=[];if(!m)return A;
 const T=(n,o,w,l,x,ex,more)=>A.push(Object.assign({n,o,w:w||{},l:l||{},x,run(){const ok=o>=100||roll(o);apply(ok?(w||{}):(l||{}));const r=ex?ex(ok)||"":"";return `${o<100?(ok?'<span class="g">thành</span>. ':'<span class="r">hỏng</span>. '):""}${fmt(ok?w:l)}${r?" "+r:""}`}},more||{}));
 if(p.sk==="mis"){T("Đấm lưng, hầu chuyện",od(45+S.sac/10+S.tai/10+misAdj(m)),{tin:3},{tin:-1},"công lao +0.25",ok=>{srvMerit(.25);return ok?`${m.name} dịu nét mặt.`:`${m.name} gắt: “Lui ra!”`});
  T("Xin chủ ban thưởng",od(40+S.tin/2),{bac:3+rkOf(m)},{tin:-4},"",null,{lock:S.tin<60,t:"Cần Chủ tin 60"});
  const iv=(S.srv.intel||[]).map(RV).filter(v=>v&&v.alive&&v!==m)[0];
  T("Bẩm tin dò được",100,{tin:5},{},iv?`chủ nắm 1 chứng cứ của ${iv.name}`:"",()=>{if(iv){/*evok: servant-mode intel; capped, preview only*/evA(m,iv,1);S.srv.intel.splice(S.srv.intel.indexOf(iv.id),1)}},{lock:!iv,t:"Chưa dò được tin gì"});
  T("Xin chủ tiến cử lên Nội vụ phủ",od(30+S.tin/2),{},{tin:-3},"công lao +3",ok=>{if(ok)srvMerit(3)},{lock:S.tin<50||S.srv.rk>=srvMax(),t:S.srv.rk>=srvMax()?"Đã ở bậc cao nhất cung này cho phép":"Cần Chủ tin 50"})}
 if(p.sk==="emp"){T("Quỳ dâng trà",od(25+S.sac/2.5+S.tai/10+mm()),{},{tin:-1},`Hoàng thượng để ý +8 · kèm: chủ ghen, Chủ tin -${m.trait==="Hiểm độc"||m.trait==="Kiêu ngạo"?8:4}: ${chanceW(cl(30+(m.malice||40)/3,0,100))}`,ok=>{if(ok)srvNotice("meet",8);return ok?"Ngài nhận chén trà, liếc nhìn ngươi.":"Tay run, trà sóng ra khay."});
  T("Cúi đầu lui tránh",100,{duc:1},{},"giữ phận",null)}
 if(p.sk==="rv"||p.sk==="hh"){const v=p.ref&&RV(p.ref.id);if(v&&v!==m){{const gN=typeof trSrvGreet==="function"?trSrvGreet(v):2;T("Hành lễ thỉnh an",100,{danh:1},{},gN?`${v.name} quý ngươi +${gN}`:`${v.name} không để tâm`,()=>{if(gN)affAdd(v,S,gN)})}
   const hostile=p.sk==="hh"||hostility(v,m)>=20;
   T(`Mật báo chuyện của ${m.name}`,100,{bac:15,danh:1},{},`${v.name} nắm 2 chứng cứ của ${m.name} · kèm: mỗi tháng chủ phát hiện: ${chanceW(m.trait==="Đa nghi"?25:10)}; khi ấy bị giết: ${chanceW(30)}, không thì Tân Giả khố 12 tuần`,()=>{/*evok: mistress schemed (sec>0)*/evA(v,m,2);S.srv.sec=Math.max(0,S.srv.sec-1);S.srv.betray={by:v.id};return `${v.name} lặng nghe, dúi vào tay ngươi một túi bạc.`},{lock:!(S.srv.sec>0&&hostile),t:S.srv.sec>0?"Nàng không thù chủ ngươi":"Chưa biết chuyện gì của chủ"});
   if(p.sk==="hh")T(`Tố cáo ${m.name} trước Hoàng hậu`,od(30+S.srv.sec*15+S.danh/5),{danh:3,bac:30},{suc:-20},`${m.name} bị xét tội · ngươi về hầu Hoàng hậu`,ok=>{if(ok){S.srv.sec=0;const a0=ACTX.a;ACTX.a=v;try{fall(m,"bị cung nữ tố giác, chứng cứ rành rành")}finally{ACTX.a=a0}srvReassign("Hoàng hậu giữ ngươi lại làm chứng.",v);return `${m.name} bị xét tội.`}S.srv.betray={by:v.id};return "Hoàng hậu không tin lời một cung nữ."},{lock:S.srv.sec<2,t:"Cần biết ít nhất 2 chuyện của chủ",act:1})}
  else if(v===m)T("Hầu bên cạnh chủ",od(55+misAdj(m)),{tin:2},{tin:-1},"",null)}
 if(p.sk==="sv"){const s=servById(p.sid);if(s){T("Trò chuyện",od(55+S.duc/5+S.sac/10),{},{},"người ấy quý ngươi +10",ok=>{srvAf(s,ok?10:-3);if(roll(35))S.srv.know[s.sid]=1;return ok?`${s.name} cười nói vui vẻ.`:`${s.name} lạnh nhạt.`});
   T("Biếu quà nhỏ",100,{},{},"người ấy quý ngươi +12",()=>{srvAf(s,12)},{c:{bac:-5}})}}
 if(p.sk==="ty"){T("Xin thuốc bổ",100,{suc:15},{},"",null,{c:{bac:-6}});T("Học lỏm nghề thuốc",od(40+S.tai/3),{tai:1},{},"",ok=>{if(ok&&roll(30))S.arts.y=Math.min(5,(S.arts.y||0)+1)})}
 if(p.sk==="task"){const sn=S.srv.sent;if(sn)T(`Làm xong: ${sn.n}`,100,{tin:3},{},"công lao +1",()=>srvErrandDone())}
 return A}
(function(){const t0=talkOpts;talkOpts=function(p){if(p&&p.kind==="srv")return isSrv()?srvTalk(p):[];return t0.apply(this,arguments)}})();
function srvErrandDone(){const sn=S.srv.sent;if(!sn||sn.done)return"";sn.done=1;srvMerit(1);const W=S.where||{};let r="Xong việc chủ sai.";
 if((sn.k==="thu"||sn.k==="vuon")&&W.emp===sn.k&&roll(od(30+S.sac/3))){srvNotice("errand",6);r+=" Hoàng thượng ngẩng lên nhìn ngươi."}
 if(sn.k==="tn"){apply({danh:1});r+=" Ma ma Đức Thọ cung khen ngươi lễ phép."}
 if(sn.v){const v=RV(sn.v),m=srvM();if(v&&m)relAdd(m,v,3)}
 return r}
function srvNotice(src,gain){if(!S||(S.age||0)<18)return;const g=gain||(6+Math.round(S.sac/12));S.nt=cl(S.nt+g+Math.round(S.sac/20),0,100);const m=srvM();
 if(m&&roll(30+(m.malice||40)/3)){const d=m.trait==="Hiểm độc"||m.trait==="Kiêu ngạo"?8:4;apply({tin:-d});log(`<span class="r">${m.name} thấy Hoàng thượng nhìn ngươi, sa sầm nét mặt.</span> Chủ tin -${d}.`)}
 if(S.nt>=BAL.ntRise.at&&roll(ntRiseOdds()))pushDil(mkP("cnvName",{src}),"Hoàng thượng hỏi tên")}

/* ---------- the day's cards (Việc) ---------- */
function srvErrPick(){const m=srvM();const L=[{k:"tyv",n:"Sang Thái y viện lấy thuốc cho chủ"},{k:"vuon",n:"Ra Ngự hoa viên hái hoa cắm bình"},{k:"thu",n:`Mang canh sang Cần Chính điện dâng thay ${m.name}`}];
 if(!S.thDead)L.push({k:"tn",n:"Mang kinh chép tay sang Đức Thọ cung"});
 const fr=liveRivals(true).filter(v=>v!==m&&aff(m,v)>=0&&palaceOf(v)!==palaceOf(m));if(fr.length){const v=pick(fr);L.push({k:palaceOf(v),n:`Mang quà sang cung ${v.name}`,v:v.id})}
 return pick(L)}
function srvCards(){const m=srvM();const X=[];if(!m)return X;const B=bid();const home=srvMisHome();
 const med={n:"Mua thuốc bổ",t:"Mua chén thuốc bổ của tiểu thái giám bán rong.",k:1,c:{bac:-8},o:100,w:{suc:20},once:"med"};
 if(S.srv.lau>0){
  X.push({n:"Giặt đồ",t:"Vò từng chậu y phục của cung nhân trong nước lạnh.",k:2,c:{suc:-10},o:100,w:{},x:`6 lần giặt: được về sớm 1 tuần (nay ${S.srv.lw||0}/6)`,rep:1,go:()=>{S.srv.lw=(S.srv.lw||0)+1;if(S.srv.lw>=6){S.srv.lw=0;S.srv.lau=Math.max(1,S.srv.lau-1);log("Quản sự gật đầu: bớt một tuần phạt.")}}});
  X.push({n:"Nghỉ tay một lát",t:"Ngồi sau chồng chậu, thở một hơi.",k:1,c:{},o:od(70),w:{suc:8},l:{suc:-3},x:"",rep:1,fail:()=>{S.srv.lau++;log("Bị quản sự bắt gặp: thêm một tuần phạt.")}});
  if(!srvOnce("plea"))X.push({n:"Cầu xin quản sự",t:"Dúi bạc, xin được tha về sớm.",k:1,c:{bac:-10},o:od(20+S.danh/2+srvFriendList().length*8),w:{},l:{},x:"được về cuối tuần này",once:"plea",go:()=>{S.srv.lau=1}});
  if(S.suc<50&&!srvOnce("med"))X.push(med);
  X.forEach(a=>a.dom="");return X}
 X.push({n:S.srv.rk>=2?"Đốc thúc cung nữ quét dọn":"Quét sân, lau điện",t:S.srv.rk>=2?"Đi một vòng hậu điện, sai bảo cung nữ dưới.":"Quét lá ngoài sân, lau bàn ghế trong điện.",k:1,c:{suc:S.srv.rk>=2?-2:-5},o:100,w:{tin:1},x:"công lao +0.5",rep:1,go:()=>srvMerit(.5)});
 X.push({n:"Dâng trà, hầu điểm tâm",t:home?`Pha trà dâng ${m.name}.`:`${m.name} đi vắng: chờ chủ về`,k:1,c:{suc:-2},o:od(50+S.sac/10+S.tai/10+misAdj(m)),w:{tin:2},l:{tin:-2},x:"công lao +0.25",rep:1,lock:!home,go:()=>srvMerit(.25)});
 const mw=srvWhere(m);if(mw!==palaceOf(m)&&S.place!==mw&&!srvOnce("follow","b"))X.push({n:"Theo hầu chủ",t:`${m.name} đang ở ${placeOf(mw).n}. Ngươi theo hầu.`,k:1,c:{},o:100,w:{tin:1},x:"đến nơi chủ đang ở",once:"follow",onceS:"b",go:()=>srvGoTo(mw)});
 if(!srvOnce("nvp","b"))X.push({n:"Lĩnh đồ ở Nội vụ phủ",t:"Lĩnh than, nến, vải vóc theo phần của cung.",k:2,c:{suc:-8},o:100,w:{tin:2},x:"công lao +0.5 · có thể gặp người",once:"nvp",onceS:"b",go:()=>{srvMerit(.5);srvMeet()}});
 X.push({n:"Học lễ nghi với cô cô",t:"Đứng nghe cô cô dạy cách đi đứng, dâng trà, quỳ lạy.",k:1,c:{suc:-3},o:100,w:{duc:1},x:"công lao +0.25",rep:1,go:()=>srvMerit(.25)});
 X.push({n:"Luyện thêu thùa, chữ nghĩa",t:"Lén học chữ, thêu hoa dưới đèn dầu.",k:1,c:{suc:-3},o:od(60),w:{tai:1},l:{},rep:1});
 X.push({n:"Chải chuốt, giữ nhan sắc",t:"Phấn rẻ, nước giếng, ngủ đủ giấc.",k:1,c:{bac:-3},o:od(55),w:{sac:1},l:{},rep:1});
 const strict=home&&(m.trait==="Kiêu ngạo"||m.trait==="Hiểm độc");
 X.push({n:"Nghỉ lấy sức",t:strict?`Chợp mắt; ${m.name} ghét kẻ lười.`:"Chợp mắt trong phòng cung nữ.",k:1,c:{},o:strict?od(70):100,w:{suc:12},l:{suc:6,tin:-3},x:"",rep:1});
 X.push({n:"Thêu khăn bán ra ngoài",t:"Nhờ thái giám mang ra cửa Thần Vũ bán.",k:2,c:{suc:-6},o:od(70),w:{bac:6},l:{danh:-2,tin:-2},rep:1});
 if(S.suc<50&&!srvOnce("med"))X.push(med);
 if(S.srv.rk>=3&&!srvOnce("so"))X.push({n:"Quản sổ sách trong cung",t:"Giữ sổ đồ dùng, sắp việc cho cung nữ dưới.",k:2,c:{suc:-4},o:od(75),w:{bac:4,tin:2,danh:1},l:{tin:-2},x:"công lao +0.5",once:"so",go:()=>srvMerit(.5)});
 if(!S.srv.err||S.srv.err.b!==B)S.srv.err=roll(45)?Object.assign({b:B},srvErrPick()):{b:B,none:1};
 const er=S.srv.err;if(!er.none&&!er.acc)X.push({n:"Việc chủ sai",t:er.n+".",k:1,c:{},o:100,w:{},x:"được vào nơi ấy buổi này · đến nơi chạm “Việc chủ sai”",go:()=>{er.acc=1;S.srv.sent={k:er.k,n:er.n,until:B,done:0,v:er.v||null};srvGoTo(er.k)}});
 if(S.tonight&&S.tonight!=="me"&&S.tonight.id===m.id&&!srvOnce("tea")){
  X.push({n:"Hầu trà khi ngự giá",t:`Tối nay Hoàng thượng ngự giá đến cung ${m.name}. Ngươi bưng khay trà vào điện.`,b:B4L,k:1,c:{},o:od(25+S.sac/2.5+S.tai/10+S.nt/5),w:{},l:{tin:-1},x:`Hoàng thượng để ý +8 · kèm: chủ ghen, Chủ tin -${m.trait==="Hiểm độc"||m.trait==="Kiêu ngạo"?8:4}: ${chanceW(cl(30+(m.malice||40)/3,0,100))}`,once:"tea",go:()=>srvNotice("tea",8)});
  X.push({n:"Lui sau bình phong",t:"Để chủ nhân một mình hầu ngài.",b:B4L,k:1,c:{},o:100,w:{tin:2},once:"tea"})}
 if(S.srv.spyFor!=null&&!srvOnce("spy")){const v=RV(S.srv.spyFor);if(v&&v.alive)X.push({n:`Lén báo tin cho ${v.name}`,t:"Kể chuyện trong cung chủ cho người đã mua chuộc ngươi.",k:1,c:{},o:od(70+S.tamco/5),w:{bac:8},l:{tin:-15},x:`${v.name} nắm 1 chứng cứ của ${m.name}`,once:"spy",go:()=>/*evok: capped; preview only*/evA(v,m,1),fail:()=>{if(roll(40))srvLaundry(`${m.name} bắt gặp ngươi lén lút với người của ${v.name}.`,8)}})}
 X.forEach(a=>a.dom="");return X}
function srvMeet(){const m=srvM();const L=allServ().filter(s=>ownerOf(s)!==m&&!S.srv.met.includes(s.sid));
 if(roll(25)){apply({suc:-5});log("Tiểu thái giám Nội vụ phủ bắt nạt, bắt ngươi xách thêm hai gánh nước. Sức -5.");return}
 if(L.length){const s=pick(L);S.srv.met.push(s.sid);srvAf(s,5);log(`Ở Nội vụ phủ ngươi quen ${s.name}, ${srkName(s).toLowerCase()} của ${NM(ownerOf(s))}.`)}}
(function(){const d0=deal;deal=function(){if(isSrv()){deck=srvCards();return}return d0.apply(this,arguments)}})();
(function(){const a0=act;act=function(i){const a=deck[i];const was=a&&a.done;const r=a0.apply(this,arguments);
 try{if(isSrv()&&a&&a.done&&!was&&!S.dead){if(a.once){S.srv.once[a.once]={w:wk(),b:bid()};deck.forEach(x=>{if(x.once===a.once)x.done=1})}if(a.rep)a.done=0;render()}}catch(e){console.error(e)}return r}})();

/* ---------- the week, the month ---------- */
(function(){const n0=nextBuoi;nextBuoi=function(){if(!isSrv())return n0.apply(this,arguments);const b0=bid();const r=n0.apply(this,arguments);if(isSrv()&&!S.dead&&bid()!==b0&&(S.buoi||0)>0){deal();render()}return r}})();
(function(){const e0=endTurn;endTurn=function(){if(isSrv())return srvEndTurn();return e0.apply(this,arguments)}})();
function srvEndTurn(){if(S.dead||Q.length||S.mg)return;S.buoi=0;const q0=Q.length;let ev="";
 srvMisCheck();
 ev+=srvW(()=>resolveTonight()||"");ev+=srvW(()=>rivalsTurn()||"");if(S.dead)return;
 {const lb=typeof lsSnap==="function"?lsSnap():null;/* log-sync r1: the weekly rest gets its reason in the morning line */
 if(S.srv.lau>0){S.suc=cl(S.suc+5,0,100);if(lb)lsNote(lb,{suc:"nghỉ qua tuần (giặt đồ)"},true);S.srv.lau--;if(S.srv.lau<=0)srvFromLaundry()}
 else{S.suc=cl(S.suc+10,0,100);if(lb)lsNote(lb,{suc:"nghỉ qua tuần"},true);try{srvWeek()}catch(e){console.error(e)}}}
 if(S.dead)return;
 if(S.suc<=0)return die(S.srv.lau>0?"Kiệt sức chết giữa đống đồ giặt ở Tân Giả khố":"Lao lực kiệt sức mà chết");
 if(S.tuan===2){ev+=srvMonth();if(S.dead)return}else S.tuan++;
 if(!isSrv())return;
 rollWx();S.place=S.srv.lau>0?"tgk":"home";try{placeWhere()}catch(e){}used=0;popIdx=null;popMsg="";
 srvW(()=>flip());srvW(()=>{palFix();tuyenTu()});S.visit=srvVisitOf(S.place);
 const m=srvM();if(ev){log(ev);if(m&&ev.includes(m.name)&&!quiet)Q.splice(q0,0,{t:"Tin về chủ nhân",who:pv(m),h:`<p class="past">${when()}</p><p>${ev}</p>`})}
 curtain();deal();render();if(Q.length&&$("modal").hidden)showModal()}
function srvWeek(){srvMisCheck();const m=srvM();if(!m||!isSrv())return;
 if(roll(32))srvMoodEvent();else if(roll(Math.max(2,(m.malice||40)/8)))srvOrder();else if(roll(7))srvBribeOffer();else if(roll(8))srvFramedEvent();else if(roll(12))srvFriendTip()}
function srvMonth(){let ev="";S.turn++;const rk=S.srv.rk;apply({bac:CNV_WAGE[rk]});log(`Lĩnh lương tháng: Bạc +${CNV_WAGE[rk]}.`)/* log-sync r1: the Sổ ghi reads "Bạc +N" */;
 ev+=srvW(()=>{let e="";for(const v of liveRivals(true))stipend(v);e+=rivalsMonth()||"";e+=servRanks()||"";e+=servMonth()||"";oanMonth();restock();e+=heirMonth()||"";e+=moodMonth()||"";return e})||"";
 if(S.dead)return ev;srvMisCheck();const m=srvM();
 if(isSrv()&&S.srv.lau<=0&&m){S.srv.mp+=1+Math.floor(rkOf(m)/3);const need=(S.srv.rk+1)*5,mx=srvMax();
  if(S.srv.mp>=need&&S.srv.rk<mx&&S.tin>=35&&typeof exSrvGate==="function"&&exSrvGate(S.srv.rk+1)){S.srv.mp=need}
  else if(S.srv.mp>=need&&S.srv.rk<mx&&S.tin>=35){S.srv.rk++;S.srv.mp=0;S.tin=cl(S.tin+5,0,100);log(`<b class="g">Được thăng ${SRK.maid[S.srv.rk]}.</b>`);Q.push({t:"Thăng bậc",who:pMe(),h:`<p>Nội vụ phủ ghi công: ngươi được thăng <b>${SRK.maid[S.srv.rk]}</b> trong cung ${m.name}.</p><p class="past">Lương tháng ${CNV_WAGE[S.srv.rk]} bạc.</p>`})}
  else if(S.srv.mp>need)S.srv.mp=need;
  if(S.srv.rk>=2&&S.age>=18&&roll(1.2+S.nt/25))pushDil(mkP("cnvName",{src:"month"}),"Hoàng thượng để mắt");
  else if(S.srv.rk>=2&&roll(1.5)){const big=liveRivals(true).find(x=>x!==m&&rkOf(x)>rkOf(m)+1&&(x.bac||0)>=60);if(big){ap(big,{bac:-40});srvReassign(`${big.name} bỏ bạc mua ngươi về cung mình.`,big)}}
  const mm2=srvM();const d=(mm2.schemes||0)-(S.srv.msch||0);S.srv.msch=mm2.schemes||0;if(d>0&&roll(60)){S.srv.sec++;log(`Ngươi để ý thấy ${mm2.name} đang bày mưu hại người. (Biết chuyện của chủ: ${S.srv.sec})`)}
  if(S.srv.spyFor!=null){const v=RV(S.srv.spyFor);if(!v||!v.alive||v.out)S.srv.spyFor=null;else{apply({bac:8});if(d>0)evA(v,mm2,1);
   if(roll(mm2.trait==="Đa nghi"?25:8)){S.srv.spyFor=null;if(roll(30)){die(`Bị ${mm2.name} phát hiện làm tai mắt cho ${v.name}, sai đánh chết`);return ev}srvLaundry(`${mm2.name} phát hiện ngươi làm tai mắt cho ${v.name}.`,10);S.tin=10}}}
  if(isSrv()&&S.srv.betray&&roll(mm2.trait==="Đa nghi"?25:10)){S.srv.betray=null;if(roll(30)){die(`${mm2.name} biết ngươi phản chủ, sai người dìm ngươi xuống giếng sau Ngự hoa viên`);return ev}srvLaundry(`${mm2.name} biết ngươi mật báo chuyện của nàng.`,12);S.tin=10}
  if(isSrv()&&!S.srv.lau&&S.srv.rk>=2&&S.age>=18&&S.danh>=20&&roll(2+S.danh/15))pushDil(mkP("cnvWed",{w:R(WEDW.length)}),"Ban gả")}
 S.nt=Math.max(0,S.nt-2);
 S.month++;S.tuan=0;
 if(S.month>12){S.month=1;S.year++;S.age++;S.emp.age++;try{ageYear()}catch(e){}allKids().forEach(([k])=>{if(k.alive)k.age++});if(S.age>25)S.sac=Math.max(10,S.sac-2)}
 if(!isSrv())return ev;
 if(S.srv.mama&&S.age>=45){over("Ma ma",`${S.name} làm ma ma trong cung đến năm 45 tuổi, được ban bạc về dưỡng già. Đám cung nữ trẻ gọi bà là cô cô suốt đời.`,"Làm ma ma đến già",true);return ev}
 if(!S.srv.mama&&S.age>=30){over("Xuất cung",`${S.name} 30 tuổi, Nội vụ phủ cho xuất cung theo lệ. Ngươi rời cung với ${S.bac} lạng bạc dành dụm.`,"Xuất cung tuổi 30");return ev}
 if(!S.srv.mama&&S.age>=25&&!S.srv.ageAsked&&S.srv.lau<=0){S.srv.ageAsked=1;pushDil(mkP("cnvAge",{}),"Đến tuổi xuất cung")}
 if((S.month===1||S.month===7)&&S.srv.lau<=0)pushDil(mkP("cnvFest",{m:S.month}),S.month===1?"Yến tiệc đầu xuân":"Tiệc Thất tịch");
 return ev}
function srvMisCheck(){if(!isSrv())return;const m=srvM();if(m&&m.alive&&!m.out)return;
 srvReassign(`${!m?"Chủ nhân không còn":!m.alive?m.name+" đã qua đời":m.name+" bị đày vào lãnh cung"}; cung nhân bị Nội vụ phủ chia đi nơi khác.`)}
function srvReassign(why,to){const old=S.srv.mid;const L=liveRivals(true).filter(v=>v.id!==old);const n=to||(L.length?pick(L):null);if(!n)return;
 S.srv.mid=n.id;S.tin=to?50:40;S.srv.msch=n.schemes||0;S.srv.betray=null;S.srv.sent=null;if(S.srv.spyFor===n.id)S.srv.spyFor=null;S.srv.lau=0;
 S.srv.rk=Math.max(1,Math.min(S.srv.rk||1,srkMax(n,{role:"maid"})));if(!n.staff)n.staff=[];if(!n.staff.length)try{fillStaff(n,true)}catch(e){}
 for(const s of n.staff)if(S.srv.af[s.sid]==null)S.srv.af[s.sid]=R(21)-5;
 S.place="home";S.visit=srvVisitOf("home");log(`${why} Ngươi về hầu ${rkName(n)} ${n.name}.`);
 if(!quiet)Q.push({t:"Đổi chủ",who:pv(n),h:`<p>${why}</p><p>Từ nay ngươi là <b>${srvTitle()}</b>. Tính nàng: ${n.trait}${n.trait2?", "+n.trait2:""}.</p>`})}
function srvLaundry(why,weeks){if(!isSrv())return;if(S.srv.lau<=0)S.srv.rk0=Math.max(1,S.srv.rk);S.srv.rk=0;S.srv.lau=weeks;S.srv.lw=0;S.place="tgk";S.visit=srvVisitOf("tgk");S.srv.sent=null;S.srv.spyFor=null;
 log(`<span class="r">${why} Ngươi bị đày xuống Tân Giả khố ${weeks} tuần.</span>`);
 Q.push({t:"Tân Giả khố",cls:"end",who:pMe(),h:`<p>${why}</p><p>Ngươi bị đày xuống <b>Tân Giả khố</b> giặt đồ ${weeks} tuần. Việc nặng, cơm hẩm; Sức cạn thì nguy đến tính mạng.</p>`,btn:"Cúi đầu"});if(!quiet)deal()}
function srvFromLaundry(){S.srv.lau=0;S.srv.rk=Math.max(1,(S.srv.rk0||1)-1);srvReassign("Hết hạn phạt ở Tân Giả khố.")}
function srvMoodEvent(){const m=srvM();const tr=m.trait;const good=(S.tin-20)/100+(tr==="Hiền lành"||tr==="Nhu mì"?.2:0)-(tr==="Hiểm độc"||tr==="Kiêu ngạo"?.12:0);
 if(Math.random()<good){const g=3+rkOf(m);apply({bac:g,tin:1});log(`${m.name} vui lòng, thưởng ngươi ${g} lạng bạc.`);Q.push({t:"Chủ thưởng",who:pv(m),h:`<p>${m.name} vui lòng, thưởng ngươi ${g} lạng bạc.</p><p class="g">Bạc +${g} · Chủ tin +1</p>`});return}
 if(S.tin<10){srvLaundry(`${m.name} chán ghét ngươi, sai người giải xuống Nội vụ phủ.`,6+R(5));return}
 if((tr==="Hiểm độc"&&S.tin<30&&roll(45))||(S.tin<20&&roll(40))){const d=20+R(15);apply({suc:-d});log(`<span class="r">${m.name} sai thái giám đánh ngươi hai mươi trượng.</span> Sức -${d}.`);
  Q.push({t:"Bị đánh đòn",cls:"end",who:pv(m),h:`<p>${m.name} nổi giận, sai thái giám đánh ngươi hai mươi trượng.</p><p class="r">Sức -${d}</p>`});if(S.suc<=0)die(`Bị ${m.name} sai đánh trượng đến chết`);return}
 pushDil(mkP("cnvScold",{}),`${m.name} quở mắng`)}
function ordOdds(k){return od(k==="spy"?45+S.tamco/5+S.tai/10:k==="plant"?30+S.tamco/4+S.srv.rk*3:25+S.tamco/4+S.srv.rk*3)}
function srvOrder(){const m=srvM();const t=srvW(()=>pickTarget(m));if(!t||t===S||!t.alive)return;const mal=m.malice||40;
 const k=mal>=70&&roll(35)?"poison":mal>=45&&roll(50)?"plant":"spy";pushDil(mkP("cnvOrd",{k,t:t.id}),`Lệnh của ${m.name}`)}
function srvDoOrder(k,t){const m=srvM();if(!m||!t)return;m.schemes=(m.schemes||0)+1;S.srv.msch=m.schemes;const o=ordOdds(k);
 if(roll(o)){if(k==="spy"){const n=evA(m,t,1);apply({tin:4,bac:3,tamco:1});log(n?`Ngươi dò la được chuyện của ${t.name}, về bẩm ${m.name}: chủ nắm thêm 1 chứng cứ.`:`Ngươi dò la ${t.name}: không tìm ra điều gì sai trái; về bẩm ${m.name} ${harmTxt(t)}.`)}
  else if(k==="plant"){const a0=ACTX.a;ACTX.a=m;let d=1;try{d=framed(t,"bị vu dùng bùa ngải")}finally{ACTX.a=a0}apply({tin:8,bac:10,duc:-5});log(`Hình nhân bùa ngải được tìm thấy trong tẩm cung ${t.name}.${d===0?" "+FRAME_LAST:""}`)}
  else{const d=35+R(30);ap(t,{suc:-d});const dd=dieIf(t,"chết sau một bát canh");apply({tin:12,bac:20,duc:-10});log(dd||`<span class="r">${t.name} trúng độc, thập tử nhất sinh.</span>`)}
  srvMerit(1);return}
 apply({tin:-2});if(!roll(50)){log("Việc không thành, may chưa ai thấy.");return}
 if(roll(30)){die(`Bị bắt quả tang khi ${k==="poison"?"bỏ độc":k==="plant"?"cài bùa ngải":"dò la"} ${t.name}, bị đánh chết ở Thận Hình ti`);return}
 if(roll(confessRisk({tr:S.tamco>=60?"lanh":"",loyal:S.tin}))){/*evok: ordered scheme (schemes++)*/evA(t,m,2);relAdd(m,t,-10);srvLaundry(`Bị bắt, ngươi khai ra ${m.name}. ${t.name} nắm 2 chứng cứ; chủ hận ngươi.`,10);S.tin=5;return}
 apply({suc:-20,tin:3});log("Bị bắt và tra khảo, ngươi cắn răng không khai. Sức -20. Chủ nhân nhớ ơn.");if(S.suc<=0)die("Chết dưới đòn tra khảo ở Thận Hình ti")}
function srvBribeOffer(){const m=srvM();const L=liveRivals(true).filter(v=>v!==m&&hostility(v,m)>=25&&(v.bac||0)>=40);if(!L.length)return;pushDil(mkP("cnvBribe",{r:pick(L).id}),"Bạc lạ")}
function srvFramedEvent(){const m=srvM();const L=srvColleagues().filter(s=>(S.srv.af[s.sid]||0)<0);if(!L.length)return;pushDil(mkP("cnvFrame",{sid:pick(L).sid}),"Bị vu oan")}
function srvFriendTip(){const f=srvFriendList();if(!f.length)return;const s=pick(f);const m=srvM();const L=liveRivals(true).filter(x=>x!==m);
 if(roll(55)&&L.length){const v=pick(L);S.srv.intel.push(v.id);log(`${s.name} kể nhỏ với ngươi chuyện trong cung ${v.name}. Ngươi có tin để bẩm chủ.`)}else{apply({bac:2});const gb=typeof goodsGive==="function"?goodsGive(S,"banhtrai",{from:"story",who:s.name}):"";log(`${s.name} chia cho ngươi ít bánh trái và 2 lạng bạc.${gb?` ${gb} vào rương.`:""}`)}}

/* ---------- saveable choices ---------- */
PEND.cnvScold=()=>{const m=srvM();if(!isSrv()||!m)return null;const o=od(40+S.sac/3);
 return{t:`<p>${m.name} ${m.trait==="Kiêu ngạo"?"chê trà nguội, hắt cả chén vào người ngươi":m.trait==="Đa nghi"?"nghi ngươi lén lút ra ngoài, gọi vào tra hỏi":"trách ngươi làm việc chậm chạp"}.</p>`,who:pv(m),o:[
  {n:"Cúi đầu nhận lỗi",fx:{tin:1,duc:1},x:""},
  {n:"Khóc lóc xin tha",fx:{},x:`${word(o)} · thành: Chủ tin +3 · hỏng: Chủ tin -3`,go:()=>{if(roll(o)){apply({tin:3});log("Chủ mềm lòng.")}else{apply({tin:-3});log("Chủ càng bực.")}}},
  {n:"Cãi lại",fx:{danh:2,tin:-8},x:`đám cung nhân nể · kèm: bị phạt quỳ, Sức -15: ${chanceW(40)}`,go:()=>{if(roll(40)){apply({suc:-15});log("Bị phạt quỳ giữa sân. Sức -15.")}}}]}};
PEND.cnvOrd=pp=>{const m=srvM(),t=RV(pp.t);if(!isSrv()||!m||!t||!t.alive||t.out)return null;const k=pp.k,o=ordOdds(k),mal=m.malice||40;
 const desc={spy:`dò la cung ${t.name}, xem nàng gặp ai, nói gì`,plant:`lén giấu hình nhân bùa ngải vào tẩm cung ${t.name}`,poison:`bỏ thuốc độc vào bát canh dâng ${t.name}`}[k];
 const gain={spy:`Chủ tin +4 · Bạc +3 · chủ nắm 1 chứng cứ của ${t.name}`,plant:`Chủ tin +8 · Bạc +10 · ${t.name} bị vu, mất Danh`,poison:`Chủ tin +12 · Bạc +20 · ${t.name} trúng độc · ${kpDeathWord(kpDeathP("poison",t),"nàng")}`}[k];
 const q=queenP();const who=q&&q!==m&&q!==t&&q!==S?q:t;
 return{t:`<p>${m.name} gọi ngươi vào phòng trong, đóng cửa: “Ngươi đi ${desc}.”</p><p class="past">Kẻ hầu nào làm cũng một luật: hỏng thì nửa phần bị bắt; bị bắt thì 3 phần bị đánh chết ở Thận Hình ti, hoặc phải khai ra chủ.</p>`,who:pv(m),o:[
  {n:"Vâng lệnh",fx:{},x:`${word(o)} · thành: ${gain} · hỏng: Chủ tin -2, nửa phần bị bắt`,go:()=>srvDoOrder(k,t)},
  {n:"Từ chối",fx:{tin:mal>=60?-15:-10},x:`kèm: bị phạt quỳ đá vụn, Sức -20: ${chanceW(mal/2)}`,go:()=>{if(roll(mal/2)){apply({suc:-20});log(`${m.name} sai người phạt ngươi quỳ trên đá vụn. Sức -20.`);if(S.suc<=0)die("Quỳ phạt đến kiệt sức mà chết")}}},
  {n:`Mật báo cho ${who.queen?"Hoàng hậu":who.name}`,fx:{bac:20,danh:2},x:`${who.name} nắm 2 chứng cứ của ${m.name} · chủ biết thì ngươi bị đánh chết hoặc đày Tân Giả khố`,go:()=>{/*evok: mistress schemed (sec>0)*/evA(who,m,2);S.srv.betray={by:who.id};log(`Ngươi lén báo cho ${who.name} mưu của ${m.name}.`)}}]}};
PEND.cnvBribe=pp=>{const m=srvM(),v=RV(pp.r);if(!isSrv()||!m||!v||!v.alive)return null;
 return{t:`<p>Một thái giám của ${v.name} chặn ngươi ở hành lang, dúi vào tay ngươi một túi bạc: “Chủ tử nhà ta muốn biết chuyện trong cung ${m.name}.”</p>`,who:pv(v),o:[
  {n:"Nhận bạc, làm tai mắt",fx:{bac:20},x:`mỗi tháng Bạc +8 · kèm: mỗi tháng chủ phát hiện: ${chanceW(m.trait==="Đa nghi"?25:8)}; khi ấy bị đánh chết: ${chanceW(30)}, không thì Tân Giả khố 10 tuần`,go:()=>{ap(v,{bac:-20});deedAdd(v,"sbribe",null,1,`mua chuộc người hầu của ${m.name}`);S.srv.spyFor=v.id}},
  {n:"Từ chối, bẩm chủ",fx:{tin:5},x:`${m.name} nắm 1 chứng cứ của ${v.name}`,go:()=>{deedAdd(v,"sbribe",null,1,`mua chuộc người hầu của ${m.name}`);/*evok: bribe deed written just before*/evA(m,v,1);relAdd(m,v,-5)}},
  {n:"Từ chối, im lặng",fx:{},x:""}]}};
PEND.cnvFrame=pp=>{const s=servById(pp.sid),m=srvM();if(!isSrv()||!s||!m)return null;const fr=srvFriendList().length;const o=od(30+S.tamco/2+S.duc/5+fr*8);const item=pick(["cây trâm vàng","chiếc vòng ngọc","hộp phấn ngự ban","túi hương thêu chỉ vàng"]);
 return{t:`<p>${s.name} (${srkName(s)}) tố với ${m.name} rằng ngươi lấy trộm ${item}.</p>${fr?`<p class="past">${fr} người bạn sẽ làm chứng cho ngươi.</p>`:""}`,who:pServ(s),o:[
  {n:"Thanh minh",fx:{},x:`${word(o)} · thành: ${s.name} bị phạt, Chủ tin +2 · hỏng: Chủ tin -12, bị đánh đòn Sức -15`,go:()=>{if(roll(o)){s.loyal=cl(s.loyal-15,0,100);s.trouble=wk();srvAf(s,-20);apply({tin:2});log(`Ngươi thanh minh được; ${s.name} bị phạt vì vu cáo.`)}else{apply({tin:-12,suc:-15});log(`${m.name} không tin ngươi, sai đánh đòn.`);if(S.suc<=0)die("Bị đánh đòn vì tội trộm cắp, không qua khỏi");else if(S.tin<8)srvLaundry(`${m.name} cho rằng ngươi là kẻ cắp.`,6)}}},
  {n:"Nhận tội, xin tha",fx:{tin:-6,suc:-8},x:""},
  {n:`Đút bạc cho ${s.name} rút lời`,fx:{bac:-10},x:`${s.name} thôi tố, người ấy quý ngươi +10`,go:()=>srvAf(s,10)}]}};
PEND.cnvName=pp=>{if(!isSrv()||(S.age||0)<18)return null;const m=srvM();const o=od(40+S.nt/2+S.sac/5);const risky=!!m&&(m.malice||0)>=60&&S.tin<40;
 return{t:`<p>${pp.src==="month"?"Tổng quản Càn Thanh cung đến hỏi: Hoàng thượng còn nhớ cung nữ dâng trà hôm nọ.":"Hoàng thượng đặt chén trà xuống, hỏi: “Ngươi tên gì? Hầu ở cung nào?”"}</p>${risky?`<p class="r">${m.name} hiểm độc lại chẳng ưa ngươi: nàng ra tay trước ngày sắc phong: ${chanceW(25)}.</p>`:""}`,who:pEmp(),o:[
  {n:"Cúi đầu thưa tên",fx:{},x:`${word(o)} · thành: được phong ${RANKS[0].n}${risky?`, nhưng chủ giết ngươi trước ngày sắc phong: ${chanceW(25)}`:""} · hỏng: Chủ tin -15`,go:()=>{if(roll(o)){if(risky&&roll(25)){die(`Trước ngày sắc phong, ${m.name} sai người đẩy ngươi xuống giếng`);return}srvRise(pp.src==="month"?"Hoàng thượng nhớ đến ngươi":"Hoàng thượng để mắt đến cung nữ dâng trà")}else{apply({tin:-15});if(m)log(`${m.name} biết chuyện, giận ngươi lả lơi. Chủ tin -15.`)}}},
  {n:"Lui về sau chủ",fx:{tin:5},x:"Hoàng thượng để ý -10",go:()=>{S.nt=Math.max(0,S.nt-10)}}]}};
PEND.cnvWed=pp=>{if(!isSrv()||(S.age||0)<18)return null;const w=WEDW[pp.w||0];
 return{t:`<p>${w} dâng sớ xin Hoàng thượng ban gả một cung nữ hiền thục. Nội vụ phủ dâng tên ngươi.</p>`,who:pEmp(),o:[
  {n:"Tạ ơn, xuất giá",fx:{},x:"kết thúc kiếp này: làm vợ ngoài cung",go:()=>over("Xuất giá",`${S.name} được ban gả cho ${w}, rời cung bằng kiệu hoa. Từ thân cung nữ, ngươi thành chính thất một nhà, sống nốt đời ngoài bức tường son.`,`Được ban gả cho ${w}`,true)},
  {n:"Xin ở lại hầu chủ",fx:{tin:5},x:""}]}};
PEND.cnvAge=()=>{if(!isSrv())return null;const hi=S.srv.rk>=3;const fate=hi?"Chưởng sự xuất cung, an hưởng tuổi già":S.bac>=100?"Xuất cung, mở tiệm nhỏ ở kinh thành":"Xuất cung về quê";
 const o=[{n:"Xuất cung về quê",fx:{},x:"kết thúc kiếp này",go:()=>over("Xuất cung",`${S.name} ${S.age} tuổi, rời cung theo lệ với ${S.bac} lạng bạc. ${hi?"Là chưởng sự cô cô, ngươi được ban thêm bạc và một mảnh ruộng.":S.bac>=100?"Ngươi mở một tiệm thêu nhỏ ở kinh thành.":"Ngươi về quê, sống đời bình dị."}`,fate,true)}];
 if(hi)o.push({n:"Ở lại làm ma ma",fx:{danh:3},x:typeof exSrvMama==="function"?"dự khảo hạch Nội vụ phủ; đỗ thì ở lại đến già, dạy cung nữ mới":"ở lại đến già, dạy cung nữ mới",go:()=>{if(typeof exSrvMama==="function")exSrvMama();else{S.srv.mama=1;log("Ngươi ở lại cung làm ma ma.")}}});
 else if(S.tin>=60)o.push({n:"Xin chủ giữ lại",fx:{tin:2},x:"ở thêm đến 30 tuổi",go:()=>log(`${srvM()?srvM().name:"Chủ"} xin Nội vụ phủ giữ ngươi lại.`)});
 else o.push({n:"Xin ở lại",fx:{},x:"Chủ tin dưới 60: chủ không giữ · ở thêm đến 30 tuổi, Chủ tin -5",go:()=>apply({tin:-5})});
 return{t:`<p>Năm nay ngươi ${S.age} tuổi, đến tuổi cung nữ được xuất cung.</p>`,who:pMe(),o}};
PEND.cnvFest=pp=>{if(!isSrv())return null;const m=srvM();const o=od(30+S.sac/3+S.tai/10);
 return{t:`<p>${pp.m===1?"Yến tiệc đầu xuân ở Thái Hòa điện":"Tiệc Thất tịch bên hồ sen"}. Ngươi theo hầu ${m?m.name:"chủ"}.</p>`,who:pMe(),o:[
  {n:"Rót rượu gần ngự tọa",fx:{},x:`${word(o)} · thành: Hoàng thượng để ý +12 · hỏng: Chủ tin -4`,go:()=>{if(roll(o))srvNotice("fest",12);else apply({tin:-4})}},
  {n:"Đứng sau hầu chủ",fx:{tin:3},x:""}]}};

/* ---------- rising: she joins the consort game ---------- */
function srvRise(why){if(!S||(S.age||0)<18)return;const m=srvM();const tin=S.tin;S.srv.risen=1;S.srv.wasMis=m?m.id:null;S.srv.sent=null;S.rank=0;S.sung=15+Math.round(S.nt/5);S.lastPromo=S.turn;apply({danh:5,bac:20});
 S.maid=newMaid(pick(MAIDS),50);S.staff=[];try{fillStaff(S,true)}catch(e){}
 if(m&&m.alive){relAdd(S,m,tin>=60?25:-25);m.ghen=cl((m.ghen||0)+(tin>=60?5:25),0,100)}
 try{palFix()}catch(e){}S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};tab="act";
 log(`<b class="g">${why}: ngươi được phong ${RANKS[0].n}.</b>`);
 Q.push({t:"Thánh chỉ",cls:"end",who:pEmp(),h:`<p>${why}. Thánh chỉ: cung nữ ${S.name} được phong <b>${RANKS[0].n}</b>, ở ${palName("home")}.</p><p>${m?`${m.name} ${tin>=60?"vẫn coi ngươi như người nhà.":"nhìn ngươi bằng ánh mắt lạnh như băng."}`:""}</p><p class="past">Từ nay ngươi theo luật của phi tần: Sủng, thị tẩm, phẩm vị.</p>`,btn:"Tạ ơn"});
 deal();render();if($("modal").hidden)showModal()}

/* ---------- endings keep her servant title in the record ---------- */
(function(){const o0=over;over=function(h,t,fate){const sv=isSrv(),nm=sv?srvRkN():"";const r=o0.apply(this,arguments);
 if(sv){try{for(const k of ["cung-kiep","cung-luanhoi"]){const p=store.get(k)||[];if(p[0]&&p[0].n===S.name){p[0].r=nm;store.set(k,p)}}
  if(Q[0]&&Q[0].h){Q[0].h=Q[0].h.replace(/<span>Phẩm cao nhất<\/span><b>[^<]*<\/b>/,`<span>Thân phận</span><b>${nm}</b>`).replace(/<span>Con cái<\/span><b>[^<]*<\/b>/,"<span>Con cái</span><b>không</b>");showModal()}}catch(e){}}return r}})();

/* ---------- UI: HUD, tabs, panels, self card, map ---------- */
const SRVTABS={act:"Việc",go:null,staff:"Đồng liêu",story:"Thân phận",log:null};
function srvTabs(){const on=isSrv();document.querySelectorAll("#tabs button").forEach(b=>{const t=b.dataset.tab;if(b.dataset.l0==null){b.dataset.l0=b.textContent;b.dataset.s0=b.dataset.s||""}
 if(on){b.style.display=t in SRVTABS?"":"none";const L=SRVTABS[t];b.textContent=L||b.dataset.l0;b.dataset.s=L||b.dataset.s0}else{b.style.display="";b.textContent=b.dataset.l0;b.dataset.s=b.dataset.s0}})}
function srvHud(){const e=$("hud-sung");if(!e)return;const sm=e.querySelector("small");if(sm&&sm.dataset.o0==null)sm.dataset.o0=sm.innerHTML;
 if(isSrv()){$("me-r").textContent=srvTitle();if(sm)sm.innerHTML=sm.dataset.o0.replace("Sủng","Chủ tin");e.querySelector("span").textContent=S.tin;const u=e.querySelector("u");if(u)u.style.width=S.tin+"%";e.title=HX.tin}
 else if(sm&&sm.innerHTML!==sm.dataset.o0){sm.innerHTML=sm.dataset.o0;e.title=""}}
(function(){const h0=renderHUD;renderHUD=function(){const r=h0.apply(this,arguments);try{srvHud()}catch(e){console.error(e)}return r}})();
(function(){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{if(isSrv())srvHud2()}catch(e){console.error(e)}return r}})();
function srvHud2(){const el=$("hud2");if(!el)return;const col=el.classList.contains("col");const m=srvM();
 const c=(k,l,v,cls)=>`<button class="hc ${cls||""}${["buoi","date","srk"].includes(k)?" keep":""}" data-hx="${k}">${l}${v!==""&&v!=null?` <b>${v}</b>`:""}</button>`;
 el.innerHTML=`<button class="h2t" data-h2t="1" aria-label="${col?"Mở rộng":"Thu gọn"}">${col?"▾":"▴"}</button>`+c("date",`T${S.month}/${S.year} · ${TUAN[S.tuan]}`,"")+c("buoi",`${BUOI[S.buoi||0].replace("Buổi ","")} · còn`,`${4-used} khắc`)+c("srk",srvRkN(),"",S.srv.lau>0?"hot":"")
  +c("tin","Chủ tin",S.tin,S.tin<30?"hot":S.tin>=60?"ok":"")+c("nt","Hoàng thượng để ý",S.nt,S.nt>=BAL.ntRise.at?"ok":"")+c("sac","Sắc",S.sac)+c("tai","Tài",S.tai)+c("tamco","Tâm cơ",S.tamco)+c("duc","Đức",S.duc)
  +c("merit","Công lao",`${Math.floor(S.srv.mp)}/${(S.srv.rk+1)*5}`)+c("wage","Lương tháng",`${CNV_WAGE[S.srv.rk]} bạc`)+c("age","Tuổi",`${S.age} · xuất cung ${S.srv.mama?45:25}`)
  +(S.srv.lau>0?c("lau","Tân Giả khố",`${S.srv.lau} tuần`,"hot"):"")+(S.srv.sec?c("sec","Biết chuyện của chủ",S.srv.sec,"hot"):"")+(S.srv.spyFor!=null?c("spy","Tai mắt cho người khác","","hot"):"")+(m?c("mis",`Chủ: ${m.name}`,m.trait):"")}
(function(){const r0=render;render=function(){if(isSrv()&&!(tab in SRVTABS))tab="act";const r=r0.apply(this,arguments);try{srvTabs();if(isSrv()&&tab==="go")srvMapFix()}catch(e){console.error(e)}return r}})();
function srvMapFix(){const m=srvM(),mk=m&&palaceOf(m);document.querySelectorAll('#panel .mspot[data-go="home"]').forEach(b=>b.remove());
 document.querySelectorAll("#panel button.mspot[data-go]").forEach(b=>{const k=b.dataset.go;if(k===mk){b.classList.add("srvmine");if(S.place==="home")b.classList.add("here");const l=b.querySelector(".mlab");if(l&&!l.querySelector(".srvtag"))l.insertAdjacentHTML("beforeend",' <i class="srvtag">cung chủ</i>');b.disabled=false;return}
  const h=window.placeEnterHook(S,k);if(h&&!h.ok&&!b.disabled){b.disabled=true;b.classList.add("off","srvno");b.title=`${b.title.split(":")[0]}: ${h.why}`;let mt=b.querySelector(".mmeta");if(!mt){mt=document.createElement("span");mt.className="mmeta";b.appendChild(mt)}mt.innerHTML=`<em>${h.why}</em>`}})}
(function(){const p0=renderPanel0;renderPanel0=function(){if(!isSrv()||!["staff","story","act"].includes(tab))return p0.apply(this,arguments);
 const el=$("panel");if(tab==="act"){const r=p0.apply(this,arguments);try{el.insertAdjacentHTML("afterbegin",srvHead())}catch(e){}return r}
 const gm=document.querySelector(".game");if(gm)gm.classList.remove("cardtab","maptab");const keep=el.dataset.tab===tab?el.scrollTop:0;el.innerHTML=tab==="staff"?srvStaffHTML():srvRoadHTML();el.dataset.tab=tab;el.dataset.pg="";el.scrollTop=keep;kitFix(el)}})();
function srvHead(){const m=srvM();if(!m)return"";const w=srvWhere(m),mk=palaceOf(m);const sn=S.srv.sent&&!S.srv.sent.done&&S.srv.sent.until>=bid()?S.srv.sent:null;
 if(S.srv.lau>0)return `<div class="srvhead">${mdH(pMe(),"sm")}<span><b>Cung nữ Tân Giả khố</b> · <b class="r">còn ${S.srv.lau} tuần</b> · giặt đủ thì được về sớm; hết hạn, Nội vụ phủ chia về hầu chủ mới.</span></div>`;
 return `<div class="srvhead">${mdH(pv(m),"sm")}<span><b>${srvTitle()}</b> · chủ ${m.trait}${m.trait2?", "+m.trait2:""} · ${w===mk?"đang ở cung":"đang ở "+placeOf(w).n} · Chủ tin <b class="${S.tin<30?"r":S.tin>=60?"g":""}">${S.tin}</b>${sn?` · <b class="g">Việc chủ sai: ${sn.n} (đến ${placeOf(sn.k).n})</b>`:""}${S.srv.lau>0?` · <b class="r">Tân Giả khố còn ${S.srv.lau} tuần</b>`:""}</span></div>`}
function srvRows(){const m=srvM();const need=(S.srv.rk+1)*5,mx=srvMax();const row=(a,b)=>[a,b,"t"];/* KIT §51: kit table rows (pcard group → kitRows) */
 return [row("Thân phận",srvTitle()),row("Công lao",`${Math.floor(S.srv.mp)}/${need}${S.srv.rk>=mx?` · bậc cao nhất cung ${m?m.name:""} cho phép`:` · đủ thì lên ${SRK.maid[S.srv.rk+1]||""}`}`),row("Lương tháng",`${CNV_WAGE[S.srv.rk]} bạc · đang có ${S.bac}`),
  row("Hoàng thượng để ý",`${S.nt}/100 · từ ${BAL.ntRise.at}, mỗi lần để ý ngươi ngài hỏi tên, phong ${RANKS[0].n}: ${chanceW(ntRiseOdds())}`),row("Ban gả",S.srv.rk>=2?`Danh ${S.danh}/20 · đủ thì có người xin cưới`:"cần Đại cung nữ, Danh 20"),
  row("Xuất cung",S.srv.mama?"ma ma: ở đến 45 tuổi":`${S.age}/25 tuổi${S.srv.rk>=3?" · chưởng sự được ở lại làm ma ma":""}`),
  row("Đường xuống",`Chủ tin ${S.tin}: dưới 10 dễ bị đày Tân Giả khố`),row("Biết chuyện của chủ",`${S.srv.sec}${S.srv.betray?" · đã mật báo, chủ biết thì nguy":""}`),
  row("Bạn trong cung",`${srvFriendList().length} người (quý ngươi từ 30)`)].concat(S.srv.spyFor!=null&&RV(S.srv.spyFor)?[row("Tai mắt cho",RV(S.srv.spyFor).name)]:[])}
function srvRoadHTML(){const m=srvM();return `<div class="story"><h3>Thân phận cung nữ</h3><p style="margin:0 0 4px">Ngươi là ${srvTitle()}${m?` (${rkName(m)}, tính ${m.trait})`:""}. Leo lên bằng công lao và lòng tin của chủ; được Hoàng thượng để mắt thì thành phi tần.</p></div><div class="pcb rows">${srvRows().join("")}</div>`}
function srvStaffHTML(){const L=srvColleagues();const m=srvM();const oc=od(55+S.duc/5+S.sac/10),of=od(30+S.tamco/3);
 return `<h3>Đồng liêu</h3><p class="past">Kẻ hầu cùng cung và người ngươi đã quen. Bạn (quý ngươi từ 30) làm chứng khi ngươi bị vu, mách tin; kẻ ghét ngươi (dưới 0) tìm dịp vu cáo.</p>`+(L.map(s=>{const a=S.srv.af[s.sid]||0;const o=ownerOf(s);const kn=S.srv.know[s.sid];const t1=!can(1)?"Hết khắc buổi này":"";
  return `<div class="srvrow">${mdH(pServ(s),"sm")}<div class="srvi"><b>${s.name}</b><span class="past">${srkName(s)} · ${o?(o===m?"cùng cung":"người của "+o.name):"Nội vụ phủ"} · ${kn?"tính "+STR[s.tr]:"chưa rõ tính"}</span><span>Thiện cảm <b class="${a>=30?"g":a<0?"r":""}">${a}</b></span></div><div class="srvb">`
   +pbtn(`class="opt" data-cnv="chat" data-sid="${s.sid}"`,"Trò chuyện",`${word(oc)} · tốn: 1 khắc · thành: người ấy quý ngươi +10 · hỏng: người ấy quý ngươi -3`,t1)
   +pbtn(`class="opt" data-cnv="gift" data-sid="${s.sid}"`,"Biếu quà",`Chắc chắn · tốn: Bạc -5, 1 khắc · thành: người ấy quý ngươi +12`,S.bac<5?"Thiếu bạc (cần 5)":t1)
   +pbtn(`class="opt" data-cnv="ask" data-sid="${s.sid}"`,"Nhờ dò tin",`Chắc chắn · tốn: 1 khắc · thành: có tin để bẩm chủ`,a<30?"Cần người ấy quý ngươi từ 30":t1)
   +pbtn(`class="opt" data-cnv="frame" data-sid="${s.sid}"`,"Tố lỗi với chủ",`${word(of)} · tốn: 1 khắc · thành: ${s.name} bị phạt, Chủ tin +3 · hỏng: người ấy quý ngươi -30, Chủ tin -5`,o!==m?"Chỉ tố người cùng cung":S.srv.lau>0?"Đang ở Tân Giả khố":t1)+`</div></div>`}).join("")||`<p class="past">Chưa quen ai.</p>`)}
function srvStaffAct(k,s){if(!can(1))return null;const m=srvM();
 if(k==="chat"){spend(1);const ok=roll(od(55+S.duc/5+S.sac/10));srvAf(s,ok?10:-3);if(roll(35))S.srv.know[s.sid]=1;log(`Trò chuyện với ${s.name}: ${ok?"thân hơn":"bị lạnh nhạt"}.`);return ok}
 if(k==="gift"){if(S.bac<5)return null;spend(1);apply({bac:-5});srvAf(s,12);log(`Biếu ${s.name} chút quà.`);return true}
 if(k==="ask"){if((S.srv.af[s.sid]||0)<30)return null;spend(1);const L=liveRivals(true).filter(x=>x!==m);if(L.length){const v=pick(L);S.srv.intel.push(v.id);log(`${s.name} kể cho ngươi chuyện trong cung ${v.name}: có tin để bẩm chủ.`)}else log(`${s.name} không biết gì mới.`);return true}
 if(k==="frame"){if(ownerOf(s)!==m||S.srv.lau>0)return null;spend(1);const ok=roll(od(30+S.tamco/3));
  if(ok){s.loyal=cl(s.loyal-15,0,100);s.trouble=wk();srvAf(s,-40);apply({tin:3});let r=`Ngươi tố ${s.name} lười nhác; ${m.name} phạt hắn.`;if(roll(25)&&m.staff.includes(s)){m.staff.splice(m.staff.indexOf(s),1);r+=` ${s.name} bị đuổi về Nội vụ phủ.`}log(r);return true}
  srvAf(s,-30);apply({tin:-5});log(`Ngươi tố ${s.name} nhưng ${m.name} không tin, còn trách ngươi gây chuyện.`);return false}
 return null}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-cnv]");if(!b)return;e.stopPropagation();e.preventDefault();if(b.disabled||!isSrv()||S.dead||Q.length)return;
 const s=servById(+b.dataset.sid);if(!s)return;const bf=rsnap();const r=srvStaffAct(b.dataset.cnv,s);if(r!=null)resultShow(b.firstChild.textContent,bf,r);render()},true);
(function(){const s0=selfCardHTML;selfCardHTML=function(){if(!isSrv())return s0.apply(this,arguments);const m=srvM();
 return pcard({f:pMe(),col:"#b9a48a",name:S.name,rank:srvTitle(),lines:[`${S.age} tuổi · ${S.origin.n}`,`Sắc ${S.sac} · Tài ${S.tai} · Tâm cơ ${S.tamco} · Đức ${S.duc}`,`Sức ${S.suc} · Bạc ${S.bac} · Danh ${S.danh}`,`Chủ tin ${S.tin} · Hoàng thượng để ý ${S.nt}`],note:m?`Chủ: <b>${rkName(m)} ${m.name}</b>, tính ${m.trait}${m.trait2?", "+m.trait2:""}.`:"",groups:[["Đường đi",srvRows()]],empty:""})}})();
(function(){const t0=showTitle;showTitle=function(){const r=t0.apply(this,arguments);try{document.querySelectorAll("#slots .slot").forEach(el=>{const b=el.querySelector("[data-load]");if(!b)return;const d=loadSlot(+b.dataset.load);
 if(d&&d.S&&d.S.srv&&!d.S.srv.risen){const sp=el.querySelector(".past");if(sp)sp.textContent=sp.textContent.replace(/^[^·]*/,(d.S.srv.lau>0?"Cung nữ Tân Giả khố":SRK.maid[d.S.srv.rk]||"Cung nữ")+" ")}})}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.textContent=`.srvhead{display:flex;gap:8px;align-items:center;padding:6px 8px;margin:0 0 8px;border:1px solid var(--line);border-radius:8px;background:var(--panel2);font-size:.82rem;line-height:1.4}
.srvrow{display:flex;gap:8px;align-items:flex-start;padding:8px 2px;border-bottom:1px solid var(--line);flex-wrap:wrap}.srvrow .srvi{display:flex;flex-direction:column;gap:1px;min-width:0;flex:1 1 160px;font-size:.85rem}
.srvrow .srvb{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px;flex:1 1 100%}.srvrow .srvb .opt{min-width:0}
.mspot .srvtag{font-style:normal}`;document.head.appendChild(st)})();
(function(){const h0=hudTween;hudTween=function(){if(!isSrv())return h0.apply(this,arguments);const s=S.sung;S.sung=S.tin;try{return h0.apply(this,arguments)}finally{S.sung=s}}})();

/* ================= CUNG NỮ II: the palace men (j22), forbidden love and marriage roads for a maid =================
   Same men, same bars (m.af thiện cảm, m.tinh tình ý, m.letters tang vật, m.trysts) and the same ladder as a consort:
   glances -> tokens / letters -> secret meetings (fade to black). Adults only (she and he 18+), man and woman only.
   The risk differs: a maid belongs to the court, so a found-out romance means beating, Tân Giả khố or expulsion;
   death only when it touches a consort's scheme or a pregnancy. The man is punished too. NPC maids live by the same rules. */
function srvMen(){try{menInit()}catch(e){}return (S.men||[]).filter(m=>m.alive&&(m.age||0)>=18)}
function srvAdult(m){return (S.age||0)>=18&&!!m&&(m.age||0)>=18}
function srvRisk(k){const base={vuon:28,thu:34,tyv:20,tn:40,home:18}[k]||26;const eyes=liveRivals(true).reduce((s,v)=>s+(v.mat||0),0);return cl(Math.round(base+eyes-srvFriendList().length*4-(S.tamco||0)/10),6,92)}
function srvBond(){const L=srvMen().filter(m=>m.tinh>=50&&m.rw!=="vương gia").sort((a,b)=>(b.tinh+(S.srv.vow===b.id?50:0))-(a.tinh+(S.srv.vow===a.id?50:0)));return L[0]||null}
function srvSeen(m,n){S.srv.rumor=(S.srv.rumor||0)+n;const L=liveRivals(true).filter(v=>v!==srvM());if(L.length&&roll(50)){S.srv.leak=pick(L).id}log(`Có người thấy ngươi với ${m.name}. Lời ra tiếng vào.`)}
function srvAffairCaught(m,how){if(!isSrv())return;const mis=srvM();const scheme=m&&rivals.some(v=>v.alive&&v.affair===m.id);
 const pre=`${how} Cung nữ thuộc về cung cấm: tư tình là tội.`;
 if(m){if(m.rw==="vương gia"){m.tinh=Math.max(0,m.tinh-20);log(`${m.name} là vương gia, chỉ bị Hoàng thượng quở trách.`)}else if(roll(35)){m.alive=false;log(`<span class="r">${m.name} bị cách chức, đày ra biên ải.</span>`)}else{m.tinh=Math.max(0,m.tinh-25);m.loyal=Math.max(0,(m.loyal||50)-20);log(`<span class="r">${m.name} bị đánh bốn mươi trượng.</span>`)}}
 S.srv.lover=null;S.srv.vow=null;S.srv.rumor=0;S.srv.leak=null;if(mis)S.tin=Math.max(0,S.tin-20);
 if(S.srv.preg){S.srv.preg=0;if(roll(50)){die(`${pre} Bụng mang dạ chửa, ngươi bị đánh chết ở Thận Hình ti`);return}over("Bị đuổi khỏi cung",`${pre} Mang thai hoang, ngươi bị đánh đòn rồi đuổi ra khỏi cửa Thần Vũ, không một đồng.`,"Bị đuổi khỏi cung vì mang thai",true);return}
 if(scheme&&roll(40)){die(`${pre} Chuyện dính vào mưu của phi tần, ngươi bị diệt khẩu`);return}
 const r=Math.random();if(r<.25){over("Bị đuổi khỏi cung",`${pre} Ngươi bị tước tên khỏi sổ cung nữ, đuổi về quê.`,"Bị đuổi khỏi cung vì tư tình",true);return}
 const d=20+R(10);apply({suc:-d});if(S.suc<=0){die(`${pre} Ngươi chết dưới đòn roi`);return}srvLaundry(`${pre} Ngươi bị đánh ${d>25?"ba mươi":"hai mươi"} roi.`,r<.6?8:12)}
/* the men stand where j22 put them; a maid meets them on her own roads */
(function(){const v0=srvVisitOf;srvVisitOf=function(k){const V=v0.apply(this,arguments);try{if(k!=="tgk"&&k!=="home"){const W=S.menW||{};for(const m of srvMen())if(W[m.id]===k){V.people.push({kind:"srv",sk:"man",ref:m,mid:m.id,name:m.name.split(" ").slice(-2).join(" "),ini:m.name.split(" ").pop()[0],col:"#6a8aa0",info:`${m.role} · ${m.trait} · ${tinhW(m.tinh)}`});m.seen=bkey()}
  const here=liveRivals(true).filter(v=>srvWhere(v)===k&&v.affair&&W[v.affair]===k);for(const v of here){S.srv.knowAff=S.srv.knowAff||[];if(!S.srv.knowAff.includes(v.id)&&roll(40)){S.srv.knowAff.push(v.id);log(`Ngươi bắt gặp ${v.name} lén trao đổi ánh mắt với ${manById(v.affair).name}.`)}}
  if(V.people.length&&/Không gặp ai/.test(V.msg||""))V.msg=`Ở đây có ${V.people.length} người.`}}catch(e){console.error(e)}return V}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="srv"&&p.sk==="man"){const m=manById(p.mid);return m?pMan(m):{src:"",ini:p.ini,col:p.col}}return f0(p)}})();
(function(){const t0=srvTalk;srvTalk=function(p){const A=t0.apply(this,arguments);try{const mis=srvM();
 const T=(n,o,x,run,more)=>A.push(Object.assign({n,o,w:{},l:{},x,run(){const ok=o>=100||roll(o);const r=run(ok)||"";return `${o<100?(ok?'<span class="g">thành</span>. ':'<span class="r">hỏng</span>. '):""}${r}`}},more||{}));
 if(p.sk==="man"){const m=manById(p.mid);if(!m||!srvAdult(m))return A;const risk=srvRisk(S.place);
  T("Chào hỏi đúng lễ",100,"hắn quý ngươi +5",()=>{m.af+=5;return `${m.name} gật đầu đáp lễ.`});
  T("Liếc mắt đưa tình",od(55+S.sac/5),`tình ý của hắn +12 · có thể bị người thấy: ${chanceW(Math.round(risk/3))}`,ok=>{if(ok)m.tinh+=12+(m.trait==="đa tình"?6:0);if(roll(risk/3))srvSeen(m,1);return ok?`${m.name} khẽ cười.`:"Hắn không để ý."});
  if(m.tinh>=30)T("Trao khăn tay, thư",od(60+S.tamco/5),"tình ý +15 · khăn thư là tang vật nếu bị lục",ok=>{if(ok){m.tinh+=15;m.letters++}if(roll(risk/4))srvSeen(m,1);return ok?"Hắn giấu vội vào tay áo.":"Hắn chần chừ không nhận."});
  if(m.tinh>=50){const fr=srvFriendList();T("Hẹn gặp riêng",fr.length?cl(100-risk,5,95):0,`cần bạn canh cửa · đêm kín đáo: Sức +8, tình ý +10 · có thai: ${chanceW(10)} · hỏng: bị bắt, roi vọt, Tân Giả khố hoặc bị đuổi`,ok=>{if(!ok){srvAffairCaught(m,`Đêm ngươi hẹn ${m.name} bị bắt gặp.`);return "Bị bắt gặp."}
    m.trysts++;m.tinh+=10;apply({suc:8});S.srv.lover=m.id;let r=`Đêm ấy rèm buông, đèn tắt; ${fr[0].name} canh ngoài hiên. Trời chưa sáng ngươi đã lẻn về.`;if(!S.srv.preg&&roll(10)){S.srv.preg=1;S.srv.pregM=0;r+=` <b class="r">Mấy hôm sau ngươi biết mình có thai.</b>`}return r},{lock:!fr.length,t:"cần một người bạn (quý ngươi từ 30) canh cửa",act:1});
   if(m.rw!=="vương gia"&&S.srv.vow!==m.id)T("Hẹn ước trăm năm",od(45+m.tinh/3),"hắn hứa chờ ngươi xuất cung · mở đường thành thân",ok=>{if(ok){S.srv.vow=m.id;return `${m.name} thề sẽ chờ ngươi.`}return "Hắn ngập ngừng, chưa dám hứa."})}
  if(m.tinh>=30)T("Cắt đứt",100,"hắn thôi tơ tưởng; bớt hẳn rủi ro",()=>{m.tinh=0;if(S.srv.lover===m.id)S.srv.lover=null;if(S.srv.vow===m.id)S.srv.vow=null;return "Ngươi trả lại khăn tay."})}
 if((p.sk==="rv"||p.sk==="hh")&&p.ref){const v=RV(p.ref.id);if(v&&v!==mis&&(S.srv.knowAff||[]).includes(v.id)&&v.affair){const lm=manById(v.affair);
  T(`Dọa tố chuyện tư tình`,od(45+S.tamco/3),`Bạc +30 · nàng phải che chở ngươi · hỏng: nàng oán ngươi, tìm cách hại ngươi`,ok=>{S.srv.knowAff=S.srv.knowAff.filter(x=>x!==v.id);if(ok){apply({bac:30});affAdd(v,S,15);S.srv.hold=v.id;return `${v.name} tái mặt, dúi bạc vào tay ngươi: “Câm miệng.”`}oanAdd(v,S,40);if(roll(35))srvLaundry(`${v.name} ra tay trước, vu cho ngươi ăn cắp.`,8);return `${v.name} cười lạnh.`},{act:1});
  if(mis)T(`Bẩm chủ chuyện của ${v.name}`,100,`Chủ tin +6 · ${mis.name} nắm 2 chứng cứ của ${v.name}`,()=>{S.srv.knowAff=S.srv.knowAff.filter(x=>x!==v.id);/*evok: affair*/evA(mis,v,2);apply({tin:6});return `${mis.name} ghi nhớ.${lm?" Chuyện "+v.name+" với "+lm.name+" thành thanh gươm trong tay chủ.":""}`})}}}catch(e){console.error(e)}return A}})();
/* the week: talk spreads, rivals use it; a token may be found */
(function(){const w0=srvWeek;srvWeek=function(){w0.apply(this,arguments);try{if(!isSrv()||S.dead||Q.length)return;const mis=srvM();const lover=S.srv.lover&&manById(S.srv.lover);
 const hot=srvMen().filter(m=>m.tinh>=30);if(!hot.length&&!S.srv.rumor)return;
 if(S.srv.leak&&roll(12)){const v=RV(S.srv.leak);if(v&&v.alive&&v!==mis){pushDil(mkP("cnvBlack",{r:v.id}),"Bị nắm thóp");return}}
 const m=lover||hot[0];if(m&&roll(1.5+(S.srv.rumor||0)*1.5+(mis&&mis.trait==="Đa nghi"?3:0)+m.letters*.5)){srvAffairCaught(m,`${mis?mis.name:"Quản sự"} lục rương, thấy khăn thư của ${m.name}.`)}}catch(e){console.error(e)}}})();
/* the month: the pregnancy clock, grants, a prince's ask, NPC maids, consorts' own affairs */
(function(){const m0=srvMonth;srvMonth=function(){let ev=m0.apply(this,arguments);try{
 ev+=srvW(()=>{try{return affairMonth()||""}catch(e){return""}})||"";
 ev+=maidLoveMonth();
 if(!isSrv()||S.dead)return ev;S.srv.rumor=Math.max(0,(S.srv.rumor||0)-1);
 if(S.srv.preg){S.srv.pregM=(S.srv.pregM||0)+1;if(S.srv.pregM>=3){const m=manById(S.srv.lover)||srvBond();srvAffairCaught(m,"Bụng ngươi lộ rõ, cung nhân xì xào.");return ev}}
 if(S.age<18||S.srv.lau>0||Q.length)return ev;const mis=srvM();
 const pr=srvMen().find(m=>m.rw==="vương gia"&&m.tinh>=40);if(pr&&roll(6)){pushDil(mkP("cnvPrince",{m:pr.id}),"Vương gia xin người");return ev}
 const thF=S.srv.thf||0;if((S.tin>=55||thF>=3)&&S.srv.rk>=1&&roll(2+(srvBond()?3:0)+thF)){const b=srvBond();pushDil(mkP("cnvGrant",{by:thF>=3&&roll(50)?"th":"mis",m:b&&roll(70)?b.id:null,w:R(WEDW.length)}),"Ban hôn")}}catch(e){console.error(e)}return ev}})();
/* Đức Thọ cung errands earn the Thái hậu's eye (a grant may come from her) */
(function(){const e0=srvErrandDone;srvErrandDone=function(){const sn=S.srv.sent;const r=e0.apply(this,arguments);if(sn&&sn.k==="tn"&&!S.thDead)S.srv.thf=(S.srv.thf||0)+1;return r}})();
/* NPC maids: the same road (love a palace man, caught or married off) */
function maidLoveMonth(){let ev="";try{const M=srvMen();if(!M.length)return"";const L=allServ().filter(s=>s.role==="maid"&&(s.age||20)>=18);
 if(L.length&&roll(25)){const s=pick(L.filter(x=>!x.manLove));if(s){const m=pick(M.filter(x=>x.rw!=="vương gia"));if(m)s.manLove=m.id}}
 for(const s of L.filter(x=>x.manLove)){const m=manById(s.manLove);const o=ownerOf(s);if(!m||!o){s.manLove=null;continue}
  const mine=isSrv()&&(o===srvM()||(S.srv.af[s.sid]||0)>=30);
  if(roll(4)){o.staff.splice(o.staff.indexOf(s),1);const t=roll(30)?`bị đuổi khỏi cung`:`bị đày xuống Tân Giả khố`;if(m.rw!=="vương gia"&&roll(35)){m.alive=false}const line=`${s.name}, cung nữ của ${NM(o)}, tư tình với ${m.name} bị lộ: ${t}${m.alive?"":"; hắn bị đày ra biên ải"}. `;log(line);if(mine)ev+=line;continue}
  if(roll(3)){o.staff.splice(o.staff.indexOf(s),1);const line=`${s.name}, cung nữ của ${NM(o)}, được chủ ban gả cho ${m.name}. `;log(line);if(mine)ev+=line}}}catch(e){console.error(e)}return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(!S.dead&&!isSrv())maidLoveMonth()}catch(e){}return ev}})();
/* the choice cards */
PEND.cnvBlack=pp=>{const v=RV(pp.r),mis=srvM();if(!isSrv()||!v||!v.alive)return null;
 return{t:`<p>Thái giám của ${v.name} chặn ngươi sau hòn non bộ: “Chuyện ngươi với nam nhân bên ngoài, chủ tử nhà ta biết cả. Muốn giữ mạng thì nghe lời.”</p>`,who:pv(v),o:[
  {n:"Nghe lời, làm tai mắt",fx:{},x:`thành tai mắt của ${v.name} (không bạc) · kèm: mỗi tháng chủ phát hiện: ${chanceW((srvM()||{}).trait==="Đa nghi"?25:8)}; khi ấy bị đánh chết: ${chanceW(30)}, không thì Tân Giả khố 10 tuần`,go:()=>{S.srv.spyFor=v.id;S.srv.leak=null}},
  {n:"Đút bạc bịt miệng",fx:{bac:-20},x:"lần này thôi; tin đồn bớt",go:()=>{S.srv.leak=null;S.srv.rumor=0}},
  {n:"Mặc kệ",fx:{},x:`${word(40)} · thành: nàng không nói · hỏng: nàng mách ${mis?mis.name:"quản sự"}, bị lục rương`,go:()=>{if(!roll(40)){const m=manById(S.srv.lover)||srvMen().filter(x=>x.tinh>=30)[0];if(m)srvAffairCaught(m,`${v.name} sai người mách chuyện tư tình của ngươi.`)}else S.srv.leak=null}}]}};
PEND.cnvGrant=pp=>{if(!isSrv()||(S.age||0)<18)return null;const m=pp.m&&manById(pp.m);const w=m?m.name:WEDW[pp.w||0];const by=pp.by==="th"&&!S.thDead?"Thái hậu":(srvM()?srvM().name:"Chủ nhân");
 return{t:`<p>${by} khen ngươi hầu hạ chu đáo, muốn ban gả ngươi cho <b>${w}</b>${m?`, người ngươi ${tinhW(m.tinh).replace("ngươi","")}`:""}.</p>`,who:pp.by==="th"?pTH():(srvM()?pv(srvM()):pMe()),o:[
  {n:"Tạ ơn, xuất giá",fx:{},x:"kết thúc kiếp này: được ban hôn",go:()=>over("Được ban hôn",`${by} ban gả ${S.name} cho ${w}. Ngươi rời cung có của hồi môn${m?", về với người mình thương":""}.`,`Được ${by} ban hôn cho ${w}`,true)},
  {n:"Xin ở lại",fx:{tin:pp.by==="th"?0:-5},x:"từ chối khéo"}]}};
PEND.cnvPrince=pp=>{const m=manById(pp.m);if(!isSrv()||!m||!srvAdult(m))return null;
 return{t:`<p>${m.name} dâng sớ xin Hoàng thượng ban cung nữ ${S.name} về phủ làm thiếp.</p>`,who:pMan(m),o:[
  {n:"Theo về vương phủ",fx:{},x:"kết thúc kiếp này: làm thiếp vương gia",go:()=>over("Vào vương phủ",`${S.name} được ban về phủ ${m.name} làm thiếp. Từ phòng cung nữ, ngươi bước vào một hậu viện khác.`,`Làm thiếp của ${m.name}`,true)},
  {n:"Xin ở lại hầu chủ",fx:{tin:3},x:"vương gia phật ý: tình ý -15",go:()=>{m.tinh=Math.max(0,m.tinh-15)}}]}};
/* release age: marry the man she is bound to */
(function(){const a0=PEND.cnvAge;PEND.cnvAge=pp=>{const d=a0(pp);try{const b=srvBond();if(d&&b)d.o.unshift({n:`Xuất cung thành thân với ${b.name}`,fx:{},x:`kết thúc kiếp này · ${b.name} ${tinhW(b.tinh)}`,go:()=>over("Thành thân",`${S.name} ${S.age} tuổi, rời cung theo lệ. Ngoài cửa Thần Vũ, ${b.name} đã đứng chờ. Hai người thành thân, sống nốt đời bên nhau.`,`Xuất cung thành thân với ${b.name}`)})}catch(e){}return d}})();
(function(){const o0=over;over=function(h,t,fate,alive){if(isSrv()&&h==="Xuất cung"&&/30 tuổi/.test(t)){const b=srvBond();if(b){h="Thành thân";t+=` ${b.name} chờ ngươi ngoài cửa cung; hai người thành thân.`;fate=`Xuất cung thành thân với ${b.name}`}}return o0.call(this,h,t,fate,alive)}})();
/* her road page shows her bonds */
(function(){const r0=srvRows;srvRows=function(){const L=r0.apply(this,arguments);try{const row=(a,b)=>[a,b,"t"];/* KIT §51: kit table rows (pcard group → kitRows) */const H=srvMen().filter(m=>m.tinh>=10||m.af>=10);
 L.push(row("Nam nhân",H.length?H.map(m=>`${m.role} ${m.name.split(" ").slice(-2).join(" ")}: ${tinhW(m.tinh)}${S.srv.vow===m.id?" · đã hẹn ước":""}${S.srv.lover===m.id?" · tư tình":""}`).join("; "):"chưa quen ai (gặp ở vườn, điện, Thái y viện)"));
 if(S.srv.rumor||S.srv.leak)L.push(row("Lời đồn",`${S.srv.rumor||0}${S.srv.leak&&RV(S.srv.leak)?" · "+RV(S.srv.leak).name+" biết chuyện":""}`));
 if(S.srv.preg)L.push(row("Mang thai",`tháng ${S.srv.preg?S.srv.pregM+1:0}/3 · tháng thứ 3 thì lộ: bị đánh chết: ${chanceW(50)}, không thì bị đuổi khỏi cung`));
 if((S.srv.knowAff||[]).length)L.push(row("Biết tư tình của",kitNameList(S.srv.knowAff.map(RV).filter(Boolean))))}catch(e){}return L}})();
/* a pregnancy she cannot show: the same hard road, priced */
(function(){const c0=srvCards;srvCards=function(){const X=c0.apply(this,arguments);try{if(isSrv()&&S.srv.preg&&!srvOnce("abort"))X.unshift({n:"Uống thuốc phá thai",t:"Mua thuốc của tiểu thái giám, uống lén trong đêm.",k:1,c:{bac:-20},o:od(60),w:{},l:{suc:-30},x:`hết thai, Sức -15 · hỏng: băng huyết Sức -30 · kèm khi hỏng: băng huyết mà chết: ${chanceW(20)}`,once:"abort",dom:"",go:()=>{S.srv.preg=0;apply({suc:-15})},fail:()=>{S.srv.preg=0;if(roll(20))die("Uống thuốc phá thai, băng huyết mà chết")}})}catch(e){}return X}})();
/* a friend's tip may be a consort's affair */
(function(){const f0=srvFriendTip;srvFriendTip=function(){const v=liveRivals(true).find(x=>x.affair&&x!==srvM()&&!(S.srv.knowAff||[]).includes(x.id));if(v&&srvFriendList().length&&roll(30)){S.srv.knowAff=(S.srv.knowAff||[]).concat([v.id]);log(`${srvFriendList()[0].name} thì thầm: ${v.name} lén gặp ${manById(v.affair)?manById(v.affair).name:"một nam nhân"}.`);return}return f0.apply(this,arguments)}})();
