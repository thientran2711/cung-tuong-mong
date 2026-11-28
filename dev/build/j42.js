
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
Object.assign(HX,{tin:`Chủ tin: lòng tin của chủ nhân với ngươi (0-100). Cao thì được thưởng, tiến cử; dưới ${BAL.srvx.tinOut} dễ bị đày Tân Giả khố.`,nt:`Hoàng thượng để ý: ngài có nhớ mặt ngươi không. Từ ${BAL.ntRise.at} trở lên, mỗi lần để ý ngươi ngài hỏi tên và phong Đáp ứng (càng cao càng dễ).`,srk:`Bậc cung nữ: ${SRK.maid.join(" → ")} (nhất đẳng là Đại cung nữ); từ ${SRK.maid[BAL.srvRk.cs]} trở lên, đến ${BAL.srvAge.ask} tuổi đỗ khảo hạch thì ở lại làm Ma ma. Bậc cao nhất tùy phẩm của chủ.`,merit:"Công lao: làm việc, được chủ tiến cử. Đủ thì cuối tháng Nội vụ phủ thăng bậc (cần Chủ tin 35).",wage:"Lương tháng theo bậc cung nữ.",age:"Cung nữ được xuất cung năm "+(BAL.srvAge.ask)+" tuổi. Chưởng sự được ở lại làm ma ma.",lau:"Tân Giả khố: giặt đồ chịu phạt. Hết hạn thì Nội vụ phủ chia về hầu chủ mới.",sec:"Số chuyện mờ ám của chủ mà ngươi biết. Có thể mật báo để lấy thưởng, nhưng chủ biết thì nguy.",spy:"Ngươi nhận bạc làm tai mắt cho người khác."});
Object.assign(HXN,{tin:"Chủ tin",nt:"Để ý"});
STORY.cnv={t:"Từ cung nữ lên phi tần",n:3,goal:"Ngươi vào cung làm cung nữ. Được Hoàng thượng để mắt mà phong Đáp ứng, rồi leo lên Tần.",init(){},
 hint:()=>["Được Hoàng thượng để mắt, phong Đáp ứng","Lên Thường tại","Lên Tần"][S.st.step]||"",
 calc:()=>!S.srv||!S.srv.risen?0:S.rank>=3?3:S.rank>=1?2:1,
 month(){if(S.srv&&S.srv.risen&&S.rank>=3&&!S.st.done){stEnd(1,"Từ cung nữ lên Tần");return `<b class="g">Từ thân cung nữ, ngươi đã lên Tần.</b> `}return ""}};
const CNV_WAGE=BAL.srvWage;/* maid-ladder-6: Bạc per month by rung lives in BAL (one core) */
const WEDW=["Thân vương Dụ","Thị lang bộ Lễ họ Trương","Tham tướng cấm quân họ Lục","Tiến sĩ họ Tô vừa đỗ khoa này"];
function isSrv(){return !!(S&&S.srv&&!S.srv.risen)}
function srvM(){return S&&S.srv?RV(S.srv.mid):null}
function bid(){return wk()*B4N+(S.buoi||0)}
function srvTitle(){if(!S||!S.srv)return"";if(S.srv.lau>0)return"Cung nữ Tân Giả khố";const m=srvM();const n=S.srv.mama?"Ma ma":SRK.maid[S.srv.rk]||"Cung nữ";return m?`${n} của ${m.name}`:n}
function srvRkN(){return S.srv.lau>0?"Cung nữ Tân Giả khố":S.srv.mama?"Ma ma":SRK.maid[S.srv.rk]||"Cung nữ"}
/* maid-8tabs: the consort panels open on her road too (Ân oán, Chí tôn …): her own title there is her servant rung, never «Đáp ứng» (as jkc says «Tiểu thư») */
(function(){const r0=rkName;rkName=function(p){if(p===S&&isSrv())return srvRkN();return r0.apply(this,arguments)}})();
(function(){const r0=rkOfFace;rkOfFace=function(kind,o){const g=r0.apply(this,arguments);if(o===S&&kind==="consort"&&isSrv()&&g)return[g[0],srvRkN()];return g}})();
function srvW(f){if(!isSrv())return f();const o=S.out;S.out=1;try{return f()}catch(e){console.error(e);return""}finally{S.out=o}}
function srvMerit(n){if(!S||!S.srv)return;/* srvmerit-guard: no cung nữ record, no Công lao (a stale act; jsrvguard is the gate) */S.srv.mp=(S.srv.mp||0)+n;/* s3e-display-fix (after the guard): công lao never banks past the rung's need (srvMonth already clamps it; mid-month orders printed «Công lao 11/10») */S.srv.mp=Math.min(srvMpNeed(S.srv.rk),S.srv.mp)}
/* công lao of an order done for the master (srvDoOrder; shown on every order card: ordRow, jptime receiver row) — ONE reader of the BAL key */
function srvOrdMerit(){return BAL.eff.j42.srvDoOrder_2}
function srvOnce(k,sc){const v=S.srv.once[k];return !!v&&(sc==="b"?v.b===bid():v.w===wk())}
function srvWhere(v){const w=whereOf(v);if(!w||w==="home"||w==="tgk")return palaceOf(v);try{return places().some(x=>x.k===w)?w:palaceOf(v)}catch(e){return palaceOf(v)}}
function srvMisHome(){const m=srvM();return !!m&&srvWhere(m)===palaceOf(m)}
function misAdj(m,a){return (nv(m,"misAdj"))+(srvTin(a||S)-40)/5}
/* ===== ONE maid act table (AG-ALL part B, OD 17/11 ~13:20Z: "có những cái nút chọn y chang tôi"): the player maid's cards
   (srvCards / srvTalk / srvStaffAct / the love acts) and every NPC maid's / eunuch's agent options (jagstaff.js) read the SAME
   odds (o, before odA), costs (c), gains (w), losses (l) and công lao (mp). a = the doer (S or a staff), m = her master, x = context. ===== */
function srvTin(a){return a===S?(S.tin||0):(a.loyal||0)}
function srvRkA(a){return a===S?((S.srv&&S.srv.rk)||0):srk(a)}
function srvSecA(a){return a===S?((S.srv&&S.srv.sec)||0):(a.sec||0)}
const SRVA={
 sweep:{k:1,c:a=>({suc:srvRkA(a)>=2?-2:-5}),o:()=>100,w:{tin:1},get mp(){return BAL.eff.j42.meritSweep}},
 tea:{k:1,c:{suc:-2},o:(a,m)=>BAL.odb.j42.odO_3+a.sac/10+a.tai/10+misAdj(m,a),w:{tin:2},l:{tin:-2},get mp(){return BAL.eff.j42.meritTea}},
 follow:{k:1,o:()=>100,fix:1,w:{tin:1}},/* fix: walking, never rolled (ODDS CAP oddsSure; her card and an NPC servant asRun) */
 nvp:{k:2,c:{suc:-8},o:()=>100,w:{tin:2},get mp(){return BAL.eff.j42.meritNvp},bully:25,get bullyC(){return {suc:-BAL.srvGate.bully}}},
 rite:{k:1,c:{suc:-3},o:()=>100,w:{duc:1},get mp(){return BAL.eff.j42.meritRite}},
 study:{k:1,c:{suc:-3},o:()=>BAL.odb.j42.odO_4,w:{tai:1}},
 groom:{k:1,c:{bac:-3},o:()=>BAL.odb.j42.odO_5,w:{sac:1}},
 rest:{k:1,o:(a,m,x)=>x&&x.strict?BAL.odb.j42.odO:100,w:{suc:12},l:{suc:6,tin:-3}},
 embro:{k:2,c:{suc:-6},o:()=>BAL.odb.j42.odO,w:{bac:6},l:{danh:-2,tin:-2}},
 med:{k:1,c:{bac:-8},o:()=>100,fix:1,w:{suc:20},at:50},
 books:{k:2,c:{suc:-4},o:()=>BAL.odb.j42.odO_6,w:{bac:4,tin:2,danh:1},l:{tin:-2},get mp(){return BAL.eff.j42.meritBooks},get rk(){return BAL.srvRk.cs}},
 errand:{k:1,o:()=>100,fix:1,w:{},get offer(){return BAL.errand.offer}},/* law 1 + 4: the ONE chance a master sends her servant on an errand this buổi — her card here and every NPC servant (j95plan) read BAL.errand.offer */
 spy:{k:1,o:a=>BAL.odb.j42.odO_7+a.tamco/5,w:{bac:8},l:{tin:-15},get ev(){return BAL.eff.j42.evGo},out:40},
 massage:{k:1,o:(a,m)=>BAL.odb.j42.odSrvTalk+a.sac/10+a.tai/10+misAdj(m,a),w:{tin:3},l:{tin:-1},get mp(){return BAL.eff.j42.meritMis}},
 askRew:{k:1,o:a=>BAL.odb.j42.odSrvTalk_2+srvTin(a)/2,w:(a,m)=>({bac:3+rkOf(m)}),l:{tin:-4},get tin(){return BAL.srvGate.rew}},
 tellMis:{k:1,o:()=>100,w:{tin:5},ev:1},
 askRec:{k:1,o:a=>BAL.odb.j42.odSrvTalk_3+srvTin(a)/2,w:{},l:{tin:-3},get mpOk(){return BAL.eff.j42.meritRec},get tin(){return BAL.srvGate.rec}},
 beside:{k:1,o:(a,m)=>BAL.odb.j42.odSrvTalk_5+misAdj(m,a),w:{tin:2},l:{tin:-1}},
 greet:{k:1,o:()=>100,w:{danh:1}},
 betray:{k:1,o:()=>100,w:{bac:15,danh:1},get ev(){return BAL.eff.j42.evSrvTalk_2}},/* caught: kill vs Tân Giả khố = npwPick(srvPunW), the same for her and an NPC servant (r1: the old kill:30 was the NPC-only roll and the card number) */
 accuse:{k:1,o:a=>BAL.odb.j42.odSrvTalk_4+srvSecA(a)*15+a.danh/5,w:{danh:3,bac:30},l:{suc:-20},get sec(){return BAL.srvx.secNeed}},
 chat:{k:1,o:a=>BAL.odb.j42.odSrvTalk_6+a.duc/5+a.sac/10,af:10,afL:-3,know:35},
 gift:{k:1,get c(){return {bac:-BAL.bacFee.cnvGift}},o:()=>100,af:12},
 ask:{k:1,o:()=>100,get af(){return BAL.srvx.friendAf}},
 frame:{k:1,o:a=>BAL.odb.j42.odOf+a.tamco/3,w:{tin:3},l:{tin:-5},get loy(){return BAL.srvGate.frameLoy},af:-40,get afL(){return BAL.eff.j42.cnvFrame},out:25},
 tonic:{k:1,c:{bac:-6},o:()=>100,w:{suc:15}},
 learn:{k:1,o:a=>BAL.odb.j42.odSrvTalk_7+a.tai/3,w:{tai:1},art:30},
 hail:{k:1,o:()=>100,af:5},
 flirt:{k:1,o:a=>BAL.odb.j42.odTop+a.sac/5,tinh:12,seen:3},
 token:{k:1,o:a=>BAL.odb.j42.odTop_2+a.tamco/5,tinh:15,seen:4,get at(){return BAL.tinhLv.warm}},
 tryst:{k:1,o:(a,m,x)=>100-x.risk,tinh:10,w:{suc:8},preg:10,get at(){return BAL.tinhLv.close}},
 vow:{k:1,o:(a,m,x)=>BAL.odb.j42.odTop_3+x.tinh/3,at:50},
 cut:{k:1,o:()=>100,get at(){return BAL.tinhLv.warm}},
 /* AG-ALL-2c (jagknow): a servant's own errands for her master — the player maid's cards and every NPC servant (numbers BAL.ag.know) */
 listen:{get k(){return BAL.ag.know.listen.k},o:a=>BAL.ag.know.listen.o+(a.tamco||0)/BAL.ag.know.listen.tc,get w(){return {tin:BAL.ag.know.listen.tin}},get mp(){return BAL.ag.know.listen.mp}},
 scout:{get k(){return BAL.ag.know.scout.k},o:()=>100,get w(){return {tin:BAL.ag.know.scout.tin}},get l(){return {tin:-BAL.ag.know.scout.lose}},get mp(){return BAL.ag.know.scout.mp}},
 watch:{get k(){return BAL.ag.know.watch.k},o:()=>100,get w(){return {tin:BAL.ag.know.watch.tin}},get mp(){return BAL.ag.know.watch.mp}},
 /* AG-ALL-2 G5 / G6 (owner OD 17/11 ~14:50Z: no NPC-only act): Bỏ độc a hostile palace's maid (jmline mlPoisonDo; o = not traced by Thái y),
    Lén giữ đồ Nội vụ phủ phát (jeitem eitPilTake; o = her master does not notice), Xin chủ cho đi hầu cung khác (jpromsv spAsk) — the maid player's
    cards and the NPC staff's options (jagstf2) read these rows; numbers in BAL.ag.stf2 / BAL.mline / BAL.eit.pil */
 poison:{get k(){return BAL.ag.stf2.poison.k},get c(){return {bac:-BAL.ag.stf2.poison.cost}},o:()=>100-BAL.mline.poisonCatch,w:{}},
 pil:{get k(){return BAL.ag.stf2.pil.k},o:(a,m)=>100-eitPilSee(m),w:{}},
 leave:{get k(){return BAL.ag.stf2.leave.k},o:()=>100,w:{}}};
function srvCa(k,a,m){const c=SRVA[k].c;return typeof c==="function"?c(a,m):(c||{})}
function srvWa(k,a,m){const w=SRVA[k].w;return typeof w==="function"?w(a,m):(w||{})}
function srvAf(s,n){S.srv.af[s.sid]=cl((S.srv.af[s.sid]||0)+n,-100,100)}
/* role-parity-drift (19/11, law 1): the list shows 10 people; with live servants she meets many more at places (S.srv.met grows), and a friend met
   late fell past the 10th row — «Nhờ dò tin» / «Trò chuyện» / «Biếu quà» with her were gone for the player while an NPC maid asks any friend.
   Same 10 rows, ordered: her own palace first, then the people she knows by liking (friends before strangers), so a friend is never pushed off. */
function srvColleagues(){const m=srvM();const L=(m&&m.staff||[]).slice();const af=(S.srv&&S.srv.af)||{};const M=[];
 for(const sid of S.srv.met||[]){const s=servById(sid);if(s&&!L.includes(s)&&!M.includes(s))M.push(s)}
 /* review r1 (law 6a): a plain liking sort put every ill-wisher (af<0) last, so past 10 rows srvFramedEvent («Bị vu oan», picks from af<0 here) never fired.
    Groups: friends (from BAL.srvx.friendAf) → ill-wishers → the rest; inside a group the stronger tie first; ties keep meeting order (stable sort). */
 const gr=s=>{const v=af[s.sid]||0;return v>=BAL.srvx.friendAf?0:v<0?1:2};M.sort((a,b)=>gr(a)-gr(b)||Math.abs(af[b.sid]||0)-Math.abs(af[a.sid]||0));return L.concat(M).slice(0,BAL.srvx.colN)}
function srvFriendList(){return srvColleagues().filter(s=>(S.srv.af[s.sid]||0)>=BAL.srvx.friendAf)}
function srvMax(){const m=srvM();return m?srkMax(m,{role:"maid"}):BAL.srvRk.dai}/* no master: the lowest cap (nhất đẳng), maid-ladder-6 r1 */
function srvToast(msg){if(window.__bot)return;let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}t.onclick=()=>t.classList.remove("on");
 t.className="rtoast bad";t.innerHTML=`<b class="seal">CẤM</b><div class="rt"><b>${msg}</b></div>`;void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),kitPace(2600))}

/* ---------- start: the consort start runs, then she is turned into a maid of a random rival ---------- */
function srvInit(){const L=liveRivals(true);if(!L.length)return;const m=pick(L.filter(v=>v.rank>=1).length?L.filter(v=>v.rank>=1):L);
 S.srv={mid:m.id,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:m.schemes||0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};
 S.tin=40+R(11);S.nt=0;S.sung=0;S.danh=2;S.bac=6+R(6);S.age=BAL.ageMin+R(3);S.rank=0;S.staff=[];S.lot=null;S.pal=null;S.resHead=null;S.mat=0;S.tonight=null;S.shop=[];
 if(!m.staff)m.staff=[];if(!m.staff.length)try{fillStaff(m,true)}catch(e){}
 for(const s of m.staff)S.srv.af[s.sid]=R(21)-5;
 for(const s of allServ().filter(x=>ownerOf(x)!==m&&ownerOf(x)!==S).sort(()=>Math.random()-.5).slice(0,3)){S.srv.met.push(s.sid);S.srv.af[s.sid]=R(41)-20}
 S.place="home";S.visit=srvVisitOf("home");tab="act";
 /* review/newgame-ui: event frame — palace-maid entering picture + her figure (KIT 32.2) */Q=[{t:"Nhập cung làm cung nữ",stage:[S],headArt:{src:"img/ev-nhap-cung-cn.webp",label:"Nhập cung"},h:`<p>${S.name}, ${S.age} tuổi, con nhà thường dân. Qua kỳ tuyển cung nữ, Nội vụ phủ chia ngươi về hầu <b>${rkName(m)} ${m.name}</b> ở ${palName(palaceOf(m))}.</p>
  ${kitRows([["Tính chủ",`${netTxt(m)}`,"t"],["Chủ tin ngươi",S.tin,"t"],["Lương tháng",`${CNV_WAGE[1]} bạc`,"t"],
   ["Đường lên","được Hoàng thượng để mắt mà phong Đáp ứng; lên Chưởng sự cô cô; được ban gả","t"],["Đường xuống","bị phạt, đày Tân Giả khố, chết trong mưu của người khác","t"]])}
  <p class="past">Mỗi buổi ${BAL.time.khac} khắc. Mục Hành sự: việc nặng và việc chủ sai. Dư đồ: chỉ nơi cung nữ được đến. Hậu cung › Đồng liêu: kết bạn, đề phòng kẻ vu cáo.</p>`}];
 log(`Ngươi vào cung làm cung nữ, hầu ${rkName(m)} ${m.name}.`)}
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&S.origin&&S.origin.k==="cnv"&&!S.srv){quiet=true;try{srvInit()}finally{quiet=false}deal();showModal();render()}}catch(e){console.error(e)}return r}})();

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
  if(k==="lc")return S.srv.rk>=BAL.srvRk.dai?{ok:true,why:""}:{ok:false,why:`chỉ từ ${SRK.maid[BAL.srvRk.dai]} trở lên mới được sai đưa cơm lãnh cung`};
  const why={dtd:"cung nữ không được tự vào tẩm điện",thu:"không có lệnh, không được bén mảng",tn:"chỉ khi chủ sai hoặc theo hầu chủ",ksp:"việc của thái giám",kn:"chỉ khi chủ sai"}[k];
  return{ok:false,why:why||"cung khác: chỉ khi chủ sai"}};
 if(typeof accRole==="function")accRole((p,k)=>{if(p!==S||!isSrv())return null;const h=window.placeEnterHook(S,k);return h?(h.ok?{ok:true}:{ok:false,why:h.why}):null});
 ["canEnter","accessOf"].forEach(nm=>{const f=window[nm];if(typeof f!=="function"||nm==="accessOf"&&typeof accRole==="function")return;window[nm]=function(p,place){const r=f.apply(this,arguments);
  try{if(isSrv()&&(p===S||typeof p==="string"||p==null)){const k=typeof p==="string"?p:typeof place==="string"?place:place&&place.k;const h=window.placeEnterHook(S,k);if(h){if(typeof r==="boolean")return h.ok;if(r&&typeof r==="object")return Object.assign({},r,{ok:h.ok,why:h.why||r.why});return h}}}catch(e){}return r}})})();

/* ---------- places and people ---------- */
(function(){const p0=placeOf;placeOf=function(k){if(k==="tgk")return{k,n:"Tân Giả khố",d:"Nơi cung nhân bị phạt giặt giũ ngày đêm.",sc:"tgk"};
 if(k==="home"&&isSrv()){const m=srvM();return{k,n:`Phòng cung nữ · ${m?palName(palaceOf(m)):""}`,d:"Dãy phòng nhỏ sau hậu điện, nơi cung nữ ăn ngủ.",sc:"maid"}}return p0.apply(this,arguments)}})();
function srvVisitOf(k){const ppl=[];let msg="";const m=srvM();const W=S.where||{};const P=(sk,o)=>ppl.push(Object.assign({kind:"srv",sk},o));
 const rvP=v=>P(v.queen?"hh":v===m?"mis":"rv",{ref:v,name:(v.queen?"Hoàng hậu ":"")+v.name,ini:v.name.split(" ").pop()[0],col:RCOL[rkOf(v)],info:`${rkName(v)}${v===m?" · chủ nhân của ngươi":""} · ${netTxt(v)}`});
 const svP=(s,o)=>{P("sv",{ref:s,sid:s.sid,name:s.name,ini:s.name.split(" ").pop()[0],col:"#b9a48a",info:`${srkName(s)} · ${o===m?"cùng cung":o?"người của "+o.name:"Nội vụ phủ"}`});if(o!==m&&!S.srv.met.includes(s.sid))S.srv.met.push(s.sid)};
 if(k==="tgk")return{k,people:ppl,talked:false,tk:{},msg:"Nước giặt lạnh buốt, chậu gỗ chất cao. Quản sự cầm roi đứng canh."};
 if(k==="home"){const mk=m&&palaceOf(m);if(W.emp===mk)P("emp",{name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:"Hoàng thượng · đang ở cung chủ"});
  if(m&&srvWhere(m)===mk)rvP(m);else if(m)msg=`${m.name} đi vắng, đang ở ${placeOf(srvWhere(m)).n}.`;
  for(const s of (m&&m.staff||[]).slice(0,4))svP(s,m)}
 else{if(W.emp===k)P("emp",{name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:"Hoàng thượng"});
  for(const v of liveRivals(true).filter(v=>srvWhere(v)===k).slice(0,4))rvP(v);
  if(k[0]==="r"||k==="kn"){const hd=accHostK(k);for(const s of (hd&&hd.staff||[]).slice(0,2))svP(s,hd)}
  if(k==="tyv")P("ty",{name:(S.court&&S.court.ty&&S.court.ty.name)||"Thái y Trương",ini:"Y",col:"#8fc38a",info:"Thái y viện"})}
 const sn=S.srv.sent;if(sn&&!sn.done&&sn.k===k&&sn.until>=bid())P("task",{name:"Việc chủ sai",ini:"Vụ",col:"#c9a46a",info:sn.n});
 if(!msg)msg=ppl.length?`Ở đây có ${ppl.length} người.`:"Không gặp ai.";
 return{k,people:ppl,talked:false,tk:{},msg}}
function accHostK(k){if(k==="kn")return rivals.find(v=>v.queen&&v.alive&&!v.out)||null;return RV(+k.slice(1))}
(function(){const h0=homePeople;homePeople=function(){if(isSrv())return srvVisitOf("home").people;return h0.apply(this,arguments)}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="srv"){if(p.sk==="emp")return pEmp();if(p.sk==="ty")return f0({kind:"ty"});
 if(p.sk==="sv"){const s=servById(p.sid);return s?pServ(s):{src:"",ini:p.ini,col:p.col}}if(p.ref&&p.ref.id!=null){const v=RV(p.ref.id);if(v)return pv(v)}return{src:"",ini:p.ini,col:p.col}}return f0(p)}})();
function srvGoTo(k){if(!S||S.dead||Q.length)return false;popIdx=null;popMsg="";const m=srvM();if(m&&k===palaceOf(m))k="home";
 if(S.srv.lau>0||k==="tgk"){S.place="tgk";S.visit=srvVisitOf("tgk");if(k!=="tgk")srvToast("Đang chịu phạt ở Tân Giả khố");render();return k==="tgk"}
 if(k==="home"){if(S.place!=="home"&&m&&!window.__walkFree){const th=travel(S.place,palaceOf(m));if(!walkOk(th)&&!(typeof dayFit==="function"&&dayFit(th))){if(!S.visit||S.visit.k!==S.place)S.visit=srvVisitOf(S.place);srvToast((typeof dayWhy==="function"&&dayWhy(th))||walkWhy(th));render();return false}spend(th)}S.place="home";S.visit=srvVisitOf("home");render();return true}
 const h=window.placeEnterHook(S,k);if(h&&!h.ok){if(!S.visit||S.visit.k!==S.place)S.visit=srvVisitOf(S.place);srvToast(`${placeOf(k).n}: ${h.why}`);render();return false}
 const from=S.place==="home"&&m?palaceOf(m):S.place;const tc=travel(from,k);if(!walkOk(tc)&&!(typeof dayFit==="function"&&dayFit(tc))){if(!S.visit||S.visit.k!==S.place)S.visit=srvVisitOf(S.place);srvToast((typeof dayWhy==="function"&&dayWhy(tc))||walkWhy(tc));render();return false}
 /* a walk longer than this buổi runs on into the next one (time-spill sweep 16/11: j76 carry); she is there when the buổi turns */
 const late=!walkOk(tc);spend(tc);S.place=k;S.visit=srvVisitOf(k);log(late?`Đi đường xa, đến ${placeOf(k).n} thì đã sang ${String(BUOI[Math.min(B4L,(S.buoi||0)+1)]).toLowerCase()}.`:`Đến ${placeOf(k).n}.`);render();return true}
(function(){const g0=goTo;goTo=function(k){if(!isSrv())return g0.apply(this,arguments);const wasMap=tab==="go";const ok=srvGoTo(k);if(ok&&wasMap&&!S.dead&&S.place!=="home"){window.__fromMap=1;tab="act";render()}return ok}})();

/* ---------- talking to people as a maid ---------- */
function srvTalk(p){const m=srvM();const A=[];if(!m)return A;
 /* law 1 (review law1-maid-away r1): her master is ONE person whatever her title — when the master is the Hoàng hậu, the card builders (j42 srvVisitOf rvP,
    j95 stage ×2) tag her «hh»; she is still the master here, so the talk is the «mis» list (the NPC maid of a Hoàng hậu: asOpts, the same four acts at home) */
 if(p&&p.sk==="hh"&&p.ref&&RV(p.ref.id)===m)p=Object.assign({},p,{sk:"mis"});
 const T=(n,o,w,l,x,ex,more)=>A.push(Object.assign({n,o,w:w||{},l:l||{},x,run(){const ok=o>=100||roll(o);apply(ok?(w||{}):(l||{}));const r=ex?ex(ok)||"":"";return `${o<100?(ok?'<span class="g">thành</span>. ':'<span class="r">hỏng</span>. '):""}${fmt(ok?w:l)}${r?" "+r:""}`}},more||{}));
 if(p.sk==="mis"){/* law 1 (law1-audit row 10): ONE rule with an NPC maid (jagstaff asOpts): the four «to the master» acts only while her master is
   in her own palace; met anywhere else she may only attend her there («Hầu bên cạnh chủ», SRVA.beside, as an NPC maid does) */
  const misHome=srvMisHome();/* = jagstaff asMisHome(m), the NPC maid's gate; srvCards tea uses it too */if(!misHome)T("Hầu bên cạnh chủ",od(SRVA.beside.o(S,m)),SRVA.beside.w,SRVA.beside.l,"",null);
  if(misHome){T("Đấm lưng, hầu chuyện",od(SRVA.massage.o(S,m)),SRVA.massage.w,SRVA.massage.l,`công lao +${SRVA.massage.mp}`,ok=>{srvMerit(SRVA.massage.mp);return ok?`${m.name} dịu nét mặt.`:`${m.name} gắt: “Lui ra!”`});
  T("Xin chủ ban thưởng",od(SRVA.askRew.o(S,m)),srvWa("askRew",S,m),SRVA.askRew.l,"",null,{lock:S.tin<SRVA.askRew.tin,t:`Cần Chủ tin ${SRVA.askRew.tin}`});
  const iv=(S.srv.intel||[]).map(RV).filter(v=>v&&v.alive&&v!==m)[0];
  T("Bẩm tin dò được",100,SRVA.tellMis.w,{},iv?`chủ nắm ${balAb(BAL.eff.j42.evSrvTalk)} chứng cứ của ${iv.name}`:"",()=>{if(iv){/*evok: servant-mode intel; capped, preview only*/evA(m,iv,BAL.eff.j42.evSrvTalk);S.srv.intel.splice(S.srv.intel.indexOf(iv.id),1)}},{lock:!iv,t:"Chưa dò được tin gì"});
  T("Xin chủ tiến cử lên Nội vụ phủ",od(SRVA.askRec.o(S,m)),{},SRVA.askRec.l,`công lao +${SRVA.askRec.mpOk}`,ok=>{if(ok)srvMerit(SRVA.askRec.mpOk)},{lock:S.tin<SRVA.askRec.tin||S.srv.rk>=srvMax(),t:S.srv.rk>=srvMax()?"Đã ở bậc cao nhất cung này cho phép":`Cần Chủ tin ${SRVA.askRec.tin}`})}
  /* AG-ALL-2 G6: what a servant of hers may do (jpromsv spAsk, the same three answers an NPC master picks from / the player consort's card) */
  {const og=typeof spOutgrown==="function"&&spOutgrown(m,S);const v=og?spUpTo(m,S):typeof spGoTo==="function"?spGoTo(m,{role:"maid",rk:S.srv.rk}):null;const cd=(S.srv.lvCd||0)>S.turn;
   T("Xin chủ cho đi hầu cung khác",SRVA.leave.o(S,m),{},{},`${m.name} chọn: tăng tiền thưởng giữ ngươi lại, giáng một bậc, hoặc cho đi${v?og?` (sang hầu ${v.name}, cung cao hơn cho ngươi lên bậc)`:` (bên ${v.name} còn chỗ)`:" (Nội vụ phủ chia về cung khác)"}`,()=>spAsk(m,S),
    {lock:(S.tin>=BAL.sp.leaveLoyal&&!og)||cd,t:cd?"Vừa xin xong, chủ chưa nguôi":S.srv.rk>=srvMax()&&(S.srv.mp||0)>=srvMpNeed(S.srv.rk)?"Chưa có cung nào cao hơn nhận người bậc ngươi":`Chủ tin dưới ${BAL.sp.leaveLoyal} mới dám xin, hoặc đủ công lao ở bậc cao nhất cung này cho phép`})}}
 if(p.sk==="emp"){T("Quỳ dâng trà",od(amTeaO(S)),{},{tin:-BAL.ag.maid.tea.fail},`Hoàng thượng để ý +${amTeaG(S)} · kèm: chủ ghen, Chủ tin -${amJealN(m)}: ${chanceW(amJealP(m))}`,ok=>{if(ok)srvNotice("meet",BAL.ag.maid.tea.g);return ok?"Ngài nhận chén trà, liếc nhìn ngươi.":"Tay run, trà sóng ra khay."});
  T("Cúi đầu lui tránh",100,{duc:1},{},"giữ phận",null)}
 if(p.sk==="rv"||p.sk==="hh"){const v=p.ref&&RV(p.ref.id);if(v&&v!==m){{const gN=typeof trSrvGreet==="function"?trSrvGreet(v):2;T("Hành lễ thỉnh an",100,SRVA.greet.w,{},gN?`${v.name} ${pvQuy(v,gN,"quý ngươi")}`:`${v.name} không để tâm`,()=>{if(gN)affAdd(v,S,gN);if(typeof svtMet==="function")svtMet(S,v)/* d-followups-1: a greeting of this buổi (jsvt bất kính rule) */})}
   const hostile=p.sk==="hh"||hostility(v,m)>=netThK(v,"host","hostLo");
   T(`Mật báo chuyện của ${m.name}`,100,SRVA.betray.w,{},`${v.name} nắm ${SRVA.betray.ev} chứng cứ của ${m.name} · kèm: mỗi tháng chủ phát hiện: ${chanceW(nv(m,"betrayFind"))}; khi ấy bị giết: ${chanceW(npwShare(["kill","lau"],k=>srvPunW(m,k),"kill"))}, không thì Tân Giả khố ${BAL.ag.why.srv.pun.betrayWk} tuần`,()=>{/*evok: mistress schemed (sec>0)*/evA(v,m,SRVA.betray.ev);S.srv.sec=Math.max(0,S.srv.sec-1);S.srv.betray={by:v.id};return `${v.name} lặng nghe, dúi vào tay ngươi một túi bạc.`},{lock:!(S.srv.sec>0&&hostile),t:S.srv.sec>0?"Nàng không thù chủ ngươi":"Chưa biết chuyện gì của chủ"});
   if(p.sk==="hh")T(`Tố cáo ${m.name} trước Hoàng hậu`,od(SRVA.accuse.o(S,m)),SRVA.accuse.w,SRVA.accuse.l,`${m.name} bị xét tội · ngươi về hầu Hoàng hậu`,ok=>{if(ok){S.srv.sec=0;const a0=ACTX.a;ACTX.a=v;try{fall(m,"bị cung nữ tố giác, chứng cứ rành rành")}finally{ACTX.a=a0}srvReassign("Hoàng hậu giữ ngươi lại làm chứng.",v);return `${m.name} bị xét tội.`}S.srv.betray={by:v.id};return "Hoàng hậu không tin lời một cung nữ."},{lock:S.srv.sec<SRVA.accuse.sec,t:`Cần biết ít nhất ${SRVA.accuse.sec} chuyện của chủ`,act:1})}}/* her own master (also as Hoàng hậu) never reaches here: srvTalk «mis» above */
 if(p.sk==="sv"){const s=servById(p.sid);if(s){T("Trò chuyện",od(SRVA.chat.o(S)),{},{},`người ấy quý ngươi +${SRVA.chat.af}`,ok=>{srvAf(s,ok?SRVA.chat.af:SRVA.chat.afL);if(roll(SRVA.chat.know))S.srv.know[s.sid]=1;const sv=(typeof svtPeer==="function"?svtPeer(S,s,"chat",ok,S.place):"")/* servant-trust fix r1 */;return (ok?`${s.name} cười nói vui vẻ.`:`${s.name} lạnh nhạt.`)+(sv?" "+sv:"")});
   T("Biếu quà nhỏ",100,{},{},`người ấy quý ngươi +${SRVA.gift.af}`,()=>{srvAf(s,SRVA.gift.af);return (typeof svtPeer==="function"?svtPeer(S,s,"gift",true,S.place):"")||undefined},{c:SRVA.gift.c})}}
 if(p.sk==="ty"){T("Xin thuốc bổ",100,SRVA.tonic.w,{},"",null,{c:SRVA.tonic.c});T("Học lỏm nghề thuốc",od(SRVA.learn.o(S)),SRVA.learn.w,{},"",ok=>{if(ok&&roll(SRVA.learn.art))S.arts.y=Math.min(5,(S.arts.y||0)+1)})}
 if(p.sk==="task"){const sn=S.srv.sent;if(sn)T(`Làm xong: ${sn.n}`,100,{tin:3},{},`công lao ${balSg(BAL.eff.j42.srvErrandDone_2)}`,()=>srvErrandDone())}
 return A}
(function(){const t0=talkOpts;talkOpts=function(p){if(p&&p.kind==="srv")return isSrv()?srvTalk(p):[];return t0.apply(this,arguments)}})();
function srvErrandDone(){const sn=S.srv.sent;if(!sn||sn.done)return"";sn.done=1;srvMerit(BAL.eff.j42.srvErrandDone_2);const W=S.where||{};let r="Xong việc chủ sai.";
 if((sn.k==="thu"||sn.k==="vuon")&&W.emp===sn.k&&roll(od(BAL.odb.j42.odSrvErrandDone+S.sac/3))){srvNotice("errand",6);r+=" Hoàng thượng ngẩng lên nhìn ngươi."}
 if(sn.k==="tn"){apply({danh:1});r+=" Ma ma Đức Thọ cung khen ngươi lễ phép."}
 if(sn.v){const v=RV(sn.v),m=srvM();if(v&&m)relAdd(m,v,BAL.eff.j42.srvErrandDone)}
 return r}
function srvNotice(src,gain){if(!S||(S.age||0)<BAL.ageMin)return;const g=gain||(6+Math.round(S.sac/12));S.nt=cl(S.nt+amTeaG(S,g),0,100);const m=srvM();try{empMet(S,src,1)}catch(e){}/* AG3: his memory of her deed (jagmaid) */
 {const d=m?amJealD(m):0;if(d){apply({tin:-d});log(`<span class="r">${m.name} thấy Hoàng thượng nhìn ngươi, sa sầm nét mặt.</span> Chủ tin -${d}.`)}}
 /* AG3: with the loop on he calls her through his night pool (jagmaid), no 45 gate / "hỏi tên" dice */
 if(!amOn()&&S.nt>=BAL.ntRise.at&&roll(ntRiseOdds()))pushDil(mkP("cnvName",{src}),"Hoàng thượng hỏi tên")}

/* ---------- the day's cards (Việc) ---------- */
/* law 1: ONE errand list for a master m — her maid card (srvErrPick) and every NPC servant's errand in the day record (j95plan) pick from it */
function srvErrList(m){const L=[{k:"tyv",n:"Sang Thái y viện lấy thuốc cho chủ"},{k:"vuon",n:"Ra Ngự hoa viên hái hoa cắm bình"},{k:"thu",n:`Mang canh sang Cần Chính điện dâng thay ${m.name}`}];
 if(!S.thDead)L.push({k:"tn",n:"Mang kinh chép tay sang Đức Thọ cung"});
 const fr=liveRivals(true).filter(v=>v!==m&&aff(m,v)>=0&&palaceOf(v)!==palaceOf(m));if(fr.length){const v=pick(fr);L.push({k:palaceOf(v),n:`Mang quà sang cung ${v.name}`,v:v.id})}
 return L}
function srvErrPick(){return pick(srvErrList(srvM()))}
function srvCards(){const m=srvM();const X=[];if(!m)return X;const B=bid();const home=srvMisHome();
 const med={n:"Mua thuốc bổ",t:"Mua chén thuốc bổ của tiểu thái giám bán rong.",k:SRVA.med.k,c:SRVA.med.c,o:100,fix:1,w:SRVA.med.w,once:"med"};
 if(S.srv.lau>0){
  X.push({n:"Giặt đồ",t:"Vò từng chậu y phục của cung nhân trong nước lạnh.",k:2,c:{suc:-10},o:100,w:{},x:`6 lần giặt: được về sớm 1 tuần (nay ${S.srv.lw||0}/6)`,rep:1,go:()=>{S.srv.lw=(S.srv.lw||0)+1;if(S.srv.lw>=6){S.srv.lw=0;S.srv.lau=Math.max(1,S.srv.lau-1);log("Quản sự gật đầu: bớt một tuần phạt.")}}});
  X.push({n:"Nghỉ tay một lát",t:"Ngồi sau chồng chậu, thở một hơi.",k:1,c:{},o:od(BAL.odb.j42.odO),w:{suc:8},l:{suc:-3},x:"",rep:1,fail:()=>{S.srv.lau++;log("Bị quản sự bắt gặp: thêm một tuần phạt.")}});
  if(!srvOnce("plea"))X.push({n:"Cầu xin quản sự",t:"Dúi bạc, xin được tha về sớm.",k:1,c:{},o:od(BAL.odb.j42.odO_2+S.danh/2+srvFriendList().length*8),w:{bac:-10},l:{}/* bạc only when the quản sự takes it (canPay keeps the lock) */,x:"được về cuối tuần này",once:"plea",go:()=>{S.srv.lau=1}});
  if(S.suc<SRVA.med.at&&!srvOnce("med"))X.push(med);
  X.forEach(a=>a.dom="");return X}
 X.push({n:S.srv.rk>=BAL.srvRk.dai?"Đốc thúc cung nữ quét dọn":"Quét sân, lau điện",t:S.srv.rk>=BAL.srvRk.dai?"Đi một vòng hậu điện, sai bảo cung nữ dưới.":"Quét lá ngoài sân, lau bàn ghế trong điện.",k:SRVA.sweep.k,c:srvCa("sweep",S),o:100,w:SRVA.sweep.w,x:`công lao +${SRVA.sweep.mp}`,rep:1,go:()=>srvMerit(SRVA.sweep.mp)});
 X.push({n:"Dâng trà, hầu điểm tâm",t:home?`Pha trà dâng ${m.name}.`:`${m.name} đi vắng: chờ chủ về`,k:SRVA.tea.k,c:SRVA.tea.c,o:od(SRVA.tea.o(S,m)),w:SRVA.tea.w,l:SRVA.tea.l,x:`công lao +${SRVA.tea.mp}`,rep:1,lock:!home,go:()=>srvMerit(SRVA.tea.mp)});
 const mw=srvWhere(m);if(mw!==palaceOf(m)&&S.place!==mw&&!srvOnce("follow","b"))X.push({n:"Theo hầu chủ",t:`${m.name} đang ở ${placeOf(mw).n}. Ngươi theo hầu.`,k:SRVA.follow.k,c:{},o:100,fix:1,w:SRVA.follow.w,x:"đến nơi chủ đang ở",once:"follow",onceS:"b",go:()=>srvGoTo(mw)});
 if(!srvOnce("nvp","b"))X.push({n:"Lĩnh đồ ở Nội vụ phủ",t:"Lĩnh than, nến, vải vóc theo phần của cung.",k:SRVA.nvp.k,c:SRVA.nvp.c,o:100,w:SRVA.nvp.w,x:`công lao +${SRVA.nvp.mp} · có thể gặp người`,once:"nvp",onceS:"b",go:()=>{srvMerit(SRVA.nvp.mp);srvMeet()}});
 X.push({n:"Học lễ nghi với cô cô",t:"Đứng nghe cô cô dạy cách đi đứng, dâng trà, quỳ lạy.",k:SRVA.rite.k,c:SRVA.rite.c,o:100,w:SRVA.rite.w,x:`công lao +${SRVA.rite.mp}`,rep:1,go:()=>srvMerit(SRVA.rite.mp)});
 X.push({n:"Luyện thêu thùa, chữ nghĩa",t:"Lén học chữ, thêu hoa dưới đèn dầu.",k:SRVA.study.k,c:SRVA.study.c,o:od(SRVA.study.o(S)),w:SRVA.study.w,l:{},rep:1});
 X.push({n:"Chải chuốt, giữ nhan sắc",t:"Phấn rẻ, nước giếng, ngủ đủ giấc.",k:SRVA.groom.k,c:SRVA.groom.c,o:od(SRVA.groom.o(S)),w:SRVA.groom.w,l:{},rep:1});
 const strict=home&&(hasT(m,"Kiêu ngạo")||hasT(m,"Xảo quyệt"));
 X.push({n:"Nghỉ lấy sức",t:strict?`Chợp mắt; ${m.name} ghét kẻ lười.`:"Chợp mắt trong phòng cung nữ.",k:SRVA.rest.k,c:{},o:strict?od(SRVA.rest.o(S,m,{strict})):100,w:SRVA.rest.w,l:SRVA.rest.l,x:"",rep:1});
 X.push({n:"Thêu khăn bán ra ngoài",t:"Nhờ thái giám mang ra cửa Thần Vũ bán.",k:SRVA.embro.k,c:SRVA.embro.c,o:od(SRVA.embro.o(S)),w:SRVA.embro.w,l:SRVA.embro.l,rep:1});
 if(S.suc<SRVA.med.at&&!srvOnce("med"))X.push(med);
 /* AG-ALL-2 G6: the NPC servant's pilfering, as her card (jeitem eitPilTake: the same "notice" odds and the master's same four answers) */
 if(typeof eitPilMaidOk==="function"&&eitPilMaidOk()){const P=BAL.eit.pil;X.push({n:"Lén giữ đồ Nội vụ phủ phát",t:`Đồ Nội vụ phủ phát cho ${m.name} tháng này còn chưa kiểm; giấu đi một món đáng giá.`,k:SRVA.pil.k,c:{},o:SRVA.pil.o(S,m),w:{},l:{},
  x:`thành: bán đi được bạc · hỏng: ${m.name} bắt được, tùy chủ xử (phạt: Chủ tin -${P.punLoyal}; hoặc tha, trả về Nội vụ phủ, làm ngơ)`,once:"pil",go:()=>log(eitPilTake(true)),fail:()=>{const r=eitPilTake(false);if(r)log(r)}})}
 if(S.srv.rk>=SRVA.books.rk&&!srvOnce("so"))X.push({n:"Quản sổ sách trong cung",t:"Giữ sổ đồ dùng, sắp việc cho cung nữ dưới.",k:SRVA.books.k,c:SRVA.books.c,o:od(SRVA.books.o(S)),w:SRVA.books.w,l:SRVA.books.l,x:`công lao +${SRVA.books.mp}`,once:"so",go:()=>srvMerit(SRVA.books.mp)});
 if(!S.srv.err||S.srv.err.b!==B)S.srv.err=roll(SRVA.errand.offer)?Object.assign({b:B},srvErrPick()):{b:B,none:1};
 const er=S.srv.err;if(!er.none&&!er.acc)X.push({n:"Việc chủ sai",t:er.n+".",k:1,c:{},o:100,fix:1,w:{},x:"được vào nơi ấy buổi này · đến nơi chạm “Việc chủ sai”",go:()=>{er.acc=1;S.srv.sent={k:er.k,n:er.n,until:B,done:0,v:er.v||null};srvGoTo(er.k)}});
 if(S.tonight&&S.tonight!=="me"&&S.tonight.id===m.id&&!srvOnce("tea")){
  X.push({n:"Hầu trà khi ngự giá",t:`Tối nay Hoàng thượng ngự giá đến cung ${m.name}. Ngươi bưng khay trà vào điện.`,b:B4L,k:1,c:{},o:od(amTeaO(S,1)),w:{},l:{tin:-BAL.ag.maid.tea.fail},x:`Hoàng thượng để ý +${amTeaG(S)} · kèm: chủ ghen, Chủ tin -${amJealN(m)}: ${chanceW(amJealP(m))}`,once:"tea",go:()=>srvNotice("tea",BAL.ag.maid.tea.g)});
  X.push({n:"Lui sau bình phong",t:"Để chủ nhân một mình hầu ngài.",b:B4L,k:1,c:{},o:100,fix:1,w:{tin:2},once:"tea"})}
 if(S.srv.spyFor!=null&&!srvOnce("spy")){const v=RV(S.srv.spyFor);if(v&&v.alive)X.push({n:`Lén báo tin cho ${v.name}`,t:"Kể chuyện trong cung chủ cho người đã mua chuộc ngươi.",k:SRVA.spy.k,c:{},o:od(SRVA.spy.o(S)),w:SRVA.spy.w,l:SRVA.spy.l,x:`${v.name} nắm ${SRVA.spy.ev} chứng cứ của ${m.name}`,once:"spy",go:()=>/*evok: capped; preview only*/evA(v,m,SRVA.spy.ev),fail:()=>{if(roll(SRVA.spy.out))srvLaundry(`${m.name} bắt gặp ngươi lén lút với người của ${v.name}.`,BAL.ag.why.srv.pun.spyOutWk)}})}
 /* AG-ALL-2c: her own errands for her master (the same SRVA rows and run as every NPC servant, jagknow) */
 try{if(typeof knSrvCards==="function")for(const a of knSrvCards(m))X.push(a)}catch(e){console.error("jagknow cards",e)}
 X.forEach(a=>a.dom="");return X}
function srvMeet(){const m=srvM();const L=allServ().filter(s=>ownerOf(s)!==m&&!S.srv.met.includes(s.sid));
 if(roll(SRVA.nvp.bully)){apply({suc:BAL.rl.j42.sucSrvMeet});log(`Tiểu thái giám Nội vụ phủ bắt nạt, bắt ngươi xách thêm hai gánh nước. Sức ${balSg(BAL.rl.j42.sucSrvMeet)}.`);return}
 if(L.length){const s=pick(L);S.srv.met.push(s.sid);srvAf(s,5);log(`Ở Nội vụ phủ ngươi quen ${s.name}, ${srkName(s).toLowerCase()} của ${NM(ownerOf(s))}.`)}}
(function(){const d0=deal;deal=function(){if(isSrv()){deck=srvCards();return}return d0.apply(this,arguments)}})();
(function(){const a0=act;act=function(i){const a=deck[i];const was=a&&a.done;const r=a0.apply(this,arguments);
 try{if(isSrv()&&a&&a.done&&!was&&!S.dead){if(a.once){S.srv.once[a.once]={w:wk(),b:bid()};deck.forEach(x=>{if(x.once===a.once)x.done=1})}if(a.rep)a.done=0;render()}}catch(e){console.error(e)}return r}})();

/* ---------- the week, the month ---------- */
(function(){const n0=nextBuoi;nextBuoi=function(){if(!isSrv())return n0.apply(this,arguments);const b0=bid();const r=n0.apply(this,arguments);if(isSrv()&&!S.dead&&bid()!==b0&&(S.buoi||0)>0){deal();render()}return r}})();
(function(){const e0=endTurn;endTurn=function(){if(isSrv())return srvEndTurn();return e0.apply(this,arguments)}})();
/* review ag3-r1 (one world, LUẬT SỬA CẢ NHÓM with AG3's rest fix): the month's illness of the consorts, the Emperor and Thái hậu (j13 illMonth)
   runs in a maid life too; before, no NPC consort fell ill or got well on this road (bot: up to 38 % of her nights ill → Tiến cử by need).
   Her own illness roll stays out (the maid road has none); host only (worldOn). */
function srvIllWorld(){if(typeof illMonth!=="function"||(typeof worldOn==="function"&&!worldOn()))return"";const c0=consorts;consorts=function(){return c0.apply(this,arguments).filter(p=>p!==S)};
 try{return illMonth()||""}catch(e){console.error("srv ill",e);return""}finally{consorts=c0}}
function srvEndTurn(){if(S.dead||Q.length||S.mg)return;S.buoi=0;const q0=Q.length;let ev="";
 /* AG3 (one world): the consorts sleep and rest in a maid life as in hers (j3 nightRg + j76sleep); before, their Sức only fell on this road */
 try{if(typeof worldOn!=="function"||worldOn())liveRivals(true).forEach(v=>v.suc=cl(v.suc+nightRg()+(typeof j76sleep==="function"?j76sleep(v):0),0,typeof sucCap==="function"?sucCap(v):100))}catch(e){console.error("srv rest",e)}
 srvMisCheck();
 ev+=srvW(()=>resolveTonight()||"");ev+=srvW(()=>rivalsTurn()||"");if(S.dead)return;
 {const lb=typeof lsSnap==="function"?lsSnap():null;/* log-sync r1: the weekly rest gets its reason in the morning line */
 if(S.srv.lau>0){S.suc=cl(S.suc+5,0,sucCap(S));if(lb)lsNote(lb,{suc:"nghỉ qua tuần (giặt đồ)"},true);S.srv.lau--;if(S.srv.lau<=0)srvFromLaundry()}
 else{S.suc=cl(S.suc+10,0,sucCap(S));if(lb)lsNote(lb,{suc:"nghỉ qua tuần"},true);try{srvWeek()}catch(e){console.error(e)}}}
 if(S.dead)return;
 if(typeof kietDue==="function")kietDue();if(S.suc<=0&&!(typeof kietSave==="function"&&kietSave()))return die(S.srv.lau>0?"Kiệt sức chết giữa đống đồ giặt ở Tân Giả khố":"Lao lực kiệt sức mà chết");
 if(S.tuan===2){ev+=srvMonth();if(S.dead)return}else S.tuan++;
 if(!isSrv())return;
 rollWx();S.place=S.srv.lau>0?"tgk":"home";try{placeWhere()}catch(e){}used=0;popIdx=null;popMsg="";
 srvW(()=>flip());srvW(()=>{palFix();tuyenTu()});S.visit=srvVisitOf(S.place);
 const m=srvM();if(ev){log(ev);if(m&&ev.includes(m.name)&&!quiet)Q.splice(q0,0,{t:"Tin về chủ nhân",who:pv(m),h:`<p class="past">${when()}</p><p>${ev}</p>`})}
 curtain();deal();render();if(Q.length&&$("modal").hidden)showModal()}
function srvWeek(){srvMisCheck();const m=srvM();if(!m||!isSrv())return;
 const o=npcWhy("srvCard",{m});if(!o)return;/* npc-purpose G2a: the week's card comes from a person with a reason (her mistress's mood or malice, a rival who wants an eye in that palace, a colleague who hates her, a friend); nobody → a quiet week */
 if(o.who===m){if(npwPick(["mood","order"],k=>srvCardW(m,k))==="order")srvOrder();else srvMoodEvent()}else if(rivals.includes(o.who))srvBribeOffer(o.who);else if((S.srv.af[o.who.sid]||0)<0)srvFramedEvent(o.who);else srvFriendTip(o.who)}
function srvCardW(m,k){const B=BAL.ag.why.srvWk;return k==="mood"?B.moodB+Math.abs((S.tin||0)-B.mid)*B.moodW:Math.max(0,(m.malice||40)-B.malMin)*B.malW}
/* npc-purpose G2a scores (numbers: BAL.ag.why.srv): her anger's form, the order's deed, the punishment when she finds her maid out */
function srvAngryW(m,k){const B=BAL.ag.why.srv.angry,tin=S.tin||0;if(k==="out")return tin<BAL.srvx.tinOut?B.out:0;
 if(k==="beat")return tin<B.beatTin?(B.beatTin-tin)*B.beatW+(hasT(m,"Xảo quyệt")?B.sly:0)+Math.max(0,(m.malice||40)-B.malMin)*B.malW:0;return B.scold}
function srvOrdW(m,t,k){const B=BAL.ag.why.srv.ord,mal=m.malice||40,h=Math.max(0,hostility(m,t));if(k==="poison")return mal>=B.poison&&h>=B.pHost?h:0;if(k==="plant")return mal>=B.plant?h*B.plW:0;return B.spy}
function srvPunW(m,k){const B=BAL.ag.why.srv.pun;return k==="kill"?(m.malice||40)*B.malW:B.lau}
function srvMonth(){let ev="";S.turn++;const rk=S.srv.rk;apply({bac:CNV_WAGE[rk]});log(`Lĩnh lương tháng: Bạc +${CNV_WAGE[rk]}.`)/* log-sync r1: the Sổ ghi reads "Bạc +N" */;
 ev+=srvW(()=>{let e="";for(const v of liveRivals(true))stipend(v);e+=rivalsMonth()||"";e+=servRanks()||"";e+=servMonth()||"";oanMonth();restock();e+=heirMonth()||"";e+=moodMonth()||"";e+=srvIllWorld();return e})||"";
 if(S.dead)return ev;srvMisCheck();const m=srvM();
 if(isSrv()&&S.srv.lau<=0&&m){S.srv.mp+=1+Math.floor(rkOf(m)/3);const need=srvMpNeed(S.srv.rk),mx=srvMax();
  if(S.srv.mp>=need&&S.srv.rk<mx&&S.tin>=BAL.srvx.tinUp&&typeof exSrvGate==="function"&&exSrvGate(S.srv.rk+1)){S.srv.mp=need}
  else if(S.srv.mp>=need&&S.srv.rk<mx&&S.tin>=BAL.srvx.tinUp){S.srv.rk++;S.srv.mp=0;S.tin=cl(S.tin+BAL.eff.j42.tinSrvMonth,0,100);log(`<b class="g">Được thăng ${SRK.maid[S.srv.rk]}.</b>`);Q.push({t:"Thăng bậc",who:pMe(),h:`<p>Nội vụ phủ ghi công: ngươi được thăng <b>${SRK.maid[S.srv.rk]}</b> trong cung ${m.name}.</p><p class="past">Lương tháng ${CNV_WAGE[S.srv.rk]} bạc.</p>`})}
  else if(S.srv.mp>need)S.srv.mp=need;
  if(!amOn()&&S.srv.rk>=BAL.srvRk.dai&&S.age>=BAL.ageMin&&roll(BAL.odb.j42.rbSrvMonth+S.nt/25))/* AG3: no monthly dice while the loop is on (jagmaid) */pushDil(mkP("cnvName",{src:"month"}),"Hoàng thượng để mắt");
  else if(S.srv.rk>=BAL.srvRk.dai){const ob=npcWhy("srvBuy",{m},()=>roll(BAL.odb.j42.rlSrvBuy));const big=ob?ob.who:null;/* npc-purpose G2a: a higher consort who wants a skilled maid (or hates her mistress) buys her */if(big){ap(big,{bac:-40});srvReassign(`${big.name} ${ob.why}, bỏ bạc mua ngươi về cung mình.`,big)}}
  const mm2=srvM();const d=(mm2.schemes||0)-(S.srv.msch||0);S.srv.msch=mm2.schemes||0;if(d>0&&roll(BAL.odb.j42.rlSrvMonth)){S.srv.sec++;log(`Ngươi để ý thấy ${mm2.name} đang bày mưu hại người. (Biết chuyện của chủ: ${S.srv.sec})`)}
  const wt=(S.srv.spyFor!=null||S.srv.betray)&&npcWhy("srvWatch",{m:mm2});/* npc-purpose G2a: she only finds out when she distrusts her maid and watches (low Chủ tin, a close nết); roll = does she find it */if(S.srv.spyFor!=null){const v=RV(S.srv.spyFor);if(!v||!v.alive||v.out)S.srv.spyFor=null;else{apply({bac:BAL.ag.why.srv.pun.spyPay});if(d>0)evA(v,mm2,BAL.eff.j42.evSrvMonth);
   if(wt&&roll(nv(mm2,"spyFind"))){S.srv.spyFor=null;/* TAI-MAT-KNOW: the master caught her maid = she LEARNS who bought her */typeof spyLearn==="function"&&spyLearn(mm2,v);if(npwPick(["kill","lau"],k=>srvPunW(mm2,k))==="kill"){die(`Bị ${mm2.name} phát hiện làm tai mắt cho ${v.name}, sai đánh chết`);return ev}srvLaundry(`${mm2.name} phát hiện ngươi làm tai mắt cho ${v.name}.`,BAL.ag.why.srv.pun.lauWk);S.tin=BAL.ag.why.srv.pun.tin}}}
  if(isSrv()&&S.srv.betray&&wt&&roll(nv(mm2,"betrayFind"))){S.srv.betray=null;if(npwPick(["kill","lau"],k=>srvPunW(mm2,k))==="kill"){die(`${mm2.name} biết ngươi phản chủ, sai người dìm ngươi xuống giếng sau Ngự hoa viên`);return ev}srvLaundry(`${mm2.name} biết ngươi mật báo chuyện của nàng.`,BAL.ag.why.srv.pun.betrayWk);S.tin=BAL.ag.why.srv.pun.tin}
  if(isSrv()&&!S.srv.lau&&S.srv.rk>=BAL.srvRk.dai&&S.age>=BAL.ageMin&&S.danh>=BAL.danhG.srvWed&&npcWhy("srvWed",{m:mm2},()=>roll(BAL.odb.j42.rbSrvMonth_2+S.danh/15)))/* npc-purpose G2a: a mistress who trusts her marries her off */pushDil(mkP("cnvWed",{w:R(WEDW.length)}),"Ban gả")}
 S.nt=Math.max(0,S.nt-BAL.ag.maid.decay);
 S.month++;S.tuan=0;
 if(S.month>12){S.month=1;S.year++;S.age++;S.emp.age++;try{ageYear()}catch(e){}allKids().forEach(([k])=>{if(k.alive)k.age++});if(S.age>BAL.age.sacFrom)S.sac=Math.max(BAL.age.sacMin,S.sac-BAL.age.sacLoss)}
 if(!isSrv())return ev;
 if(S.srv.mama&&S.age>=BAL.srvAge.mama){over("Ma ma",`${S.name} làm ma ma trong cung đến năm ${BAL.srvAge.mama} tuổi, được ban bạc về dưỡng già. Đám cung nữ trẻ gọi bà là cô cô suốt đời.`,"Làm ma ma đến già",true);return ev}
 if(!S.srv.mama&&S.age>=BAL.srvAge.out){over("Xuất cung",`${S.name} ${BAL.srvAge.out} tuổi, Nội vụ phủ cho xuất cung theo lệ. Ngươi rời cung với ${S.bac} lạng bạc dành dụm.`,"Xuất cung tuổi "+BAL.srvAge.out);return ev}
 if(!S.srv.mama&&S.age>=BAL.srvAge.ask&&!S.srv.ageAsked&&S.srv.lau<=0){S.srv.ageAsked=1;pushDil(mkP("cnvAge",{}),"Đến tuổi xuất cung")}
 if((S.month===1||S.month===7)&&S.srv.lau<=0)pushDil(mkP("cnvFest",{m:S.month}),S.month===1?"Yến tiệc đầu xuân":"Tiệc Thất tịch");
 return ev}
function srvMisCheck(){if(!isSrv())return;const m=srvM();if(m&&m.alive&&!m.out)return;
 srvReassign(`${!m?"Chủ nhân không còn":!m.alive?m.name+" đã qua đời":m.name+" bị đày vào lãnh cung"}; cung nhân bị Nội vụ phủ chia đi nơi khác.`)}
function srvReassign(why,to){const old=S.srv.mid;const L=liveRivals(true).filter(v=>v.id!==old&&!v.coop/* review/srv-rank rv#1: never the co-op friend's proxy */);const n=to||npwPick(L,v=>Math.max(BAL.ag.why.srv.reMin,BAL.ag.why.srv.reNeed-(v.staff||[]).length)+rkOf(v)*BAL.ag.why.srv.reRk);if(!n)return;/* npc-purpose G2a: Nội vụ phủ sends her where hands are short */
 S.srv.mid=n.id;S.tin=to?50:40;S.srv.msch=n.schemes||0;S.srv.betray=null;S.srv.sent=null;if(S.srv.spyFor===n.id)S.srv.spyFor=null;S.srv.lau=0;
 S.srv.rk=Math.max(1,Math.min(S.srv.rk||1,srkMax(n,{role:"maid"})));if(!n.staff)n.staff=[];if(!n.staff.length)try{fillStaff(n,true)}catch(e){}
 for(const s of n.staff)if(S.srv.af[s.sid]==null)S.srv.af[s.sid]=R(21)-5;
 S.place="home";S.visit=srvVisitOf("home");log(`${why} Ngươi về hầu ${rkName(n)} ${n.name}.`);
 if(!quiet)Q.push({t:"Đổi chủ",who:pv(n),h:`<p>${why}</p><p>Từ nay ngươi là <b>${srvTitle()}</b>. Tính nàng: ${netTxt(n)}.</p>`})}
function srvLaundry(why,weeks){if(!isSrv())return;if(S.srv.lau<=0)S.srv.rk0=Math.max(1,S.srv.rk);S.srv.rk=0;S.srv.lau=weeks;S.srv.lw=0;S.place="tgk";S.visit=srvVisitOf("tgk");S.srv.sent=null;S.srv.spyFor=null;
 log(`<span class="r">${why} Ngươi bị đày xuống Tân Giả khố ${weeks} tuần.</span>`);
 Q.push({t:"Tân Giả khố",cls:"end",who:pMe(),h:`<p>${why}</p><p>Ngươi bị đày xuống <b>Tân Giả khố</b> giặt đồ ${weeks} tuần. Việc nặng, cơm hẩm; Sức cạn thì nguy đến tính mạng.</p>`,btn:"Cúi đầu"});if(!quiet)deal()}
function srvFromLaundry(){S.srv.lau=0;S.srv.rk=Math.max(1,(S.srv.rk0||1)-1);srvReassign("Hết hạn phạt ở Tân Giả khố.")}
function srvMoodEvent(){const m=srvM();const good=(S.tin-20)/100+(nv(m,"srvGood"))-(nv(m,"srvBad"));
 const k=npwPick(["rew","angry"],x=>x==="rew"?good*100:(1-good)*100,{all:1});/* npc-purpose G2a: reward or anger by her trust and nết (both are her real mood: weighted, the old odds — rates review: near-best made reward vanish) */if(k==="rew"){const g=3+rkOf(m);apply({bac:g,tin:BAL.eff.j42.tinSrvMoodEvent});log(`${m.name} vui lòng, thưởng ngươi ${g} lạng bạc.`);Q.push({t:"Chủ thưởng",who:pv(m),h:`<p>${m.name} vui lòng, thưởng ngươi ${g} lạng bạc.</p><p class="g">Bạc +${g} · Chủ tin ${balSg(BAL.eff.j42.tinSrvMoodEvent)}</p>`});return}
 const how=npwPick(["out","beat","scold"],x=>srvAngryW(m,x)),BL=BAL.ag.why.srv.lau;if(how==="out"){srvLaundry(`${m.name} chán ghét ngươi, sai người giải xuống Nội vụ phủ.`,BL.base+Math.min(BL.max,Math.max(0,Math.round((BAL.srvx.tinOut-S.tin)/BL.div))));return}
 if(how==="beat"){const d=20+R(15);apply({suc:-d});log(`<span class="r">${m.name} sai thái giám đánh ngươi hai mươi trượng.</span> Sức -${d}.`);
  Q.push({t:"Bị đánh đòn",cls:"end",who:pv(m),h:`<p>${m.name} nổi giận, sai thái giám đánh ngươi hai mươi trượng.</p><p class="r">Sức -${d}</p>`});if(S.suc<=0&&!(typeof kietSave==="function"&&kietSave()))die(`Bị ${m.name} sai đánh trượng đến chết`);return}
 pushDil(mkP("cnvScold",{}),`${m.name} quở mắng`)}
function ordOdds(k){const o=od(k==="spy"?45+S.tamco/5+S.tai/10:k==="plant"?30+S.tamco/4+S.srv.rk*3:25+S.tamco/4+S.srv.rk*3);return ORDHALF?oddsCl(o-ORDHALF):o}
function srvOrder(){const m=srvM();const t=srvW(()=>pickTarget(m));if(!t||t===S||!t.alive)return;const mal=m.malice||40;
 const k=npwPick(["poison","plant","spy"],x=>srvOrdW(m,t,x))||"spy";/* npc-purpose G2a: the deed fits her malice and her grudge against the target */pushDil(mkP("cnvOrd",{k,t:t.id}),`Lệnh của ${m.name}`)}
function srvDoOrder(k,t){const m=srvM();if(!m||!t)return;m.schemes=(m.schemes||0)+1;S.srv.msch=m.schemes;const o=ordOdds(k);
 if(roll(o)){if(k==="spy"){const n=chSearch(m,typeof knMeAg==="function"?knMeAg():null,()=>evA(m,t,BAL.eff.j42.evN));apply(Object.assign({},BAL.rl.j42.ord.spy));log(n?`Ngươi dò la được chuyện của ${t.name}, về bẩm ${m.name}: chủ nắm thêm ${balAb(BAL.eff.j42.evN)} chứng cứ.`:chMissed()?`Ngươi dò la ${t.name}: ${chMissTxt(t)} Về bẩm ${m.name} ${harmTxt(t)}.`:`Ngươi dò la ${t.name}: không tìm ra điều gì sai trái; về bẩm ${m.name} ${harmTxt(t)}.`)}
  else if(k==="plant"){const a0=ACTX.a;ACTX.a=m;let d=1;try{d=framed(t,"bị vu dùng bùa ngải")}finally{ACTX.a=a0}apply(Object.assign({},BAL.rl.j42.ord.plant));log(`Hình nhân bùa ngải được tìm thấy trong tẩm cung ${t.name}.${d===0?" "+FRAME_LAST:""}`)}
  else{const H=BAL.rl.j8.hit,d=H.lo+R(H.r);ap(t,{suc:-d});const dd=dieIf(t,"chết sau một bát canh");apply(Object.assign({},BAL.rl.j42.ord.poison));log(dd||`<span class="r">${t.name} trúng độc, thập tử nhất sinh.</span>`)}
  srvMerit(srvOrdMerit());return}
 apply(Object.assign({},BAL.rl.j42.ord.fail));if(!roll(BAL.odb.j42.rlSrvDoOrder)){log("Việc không thành, may chưa ai thấy.");return}
 if(roll(BAL.odb.j42.rlSrvDoOrder_2)){die(`Bị bắt quả tang khi ${k==="poison"?"bỏ độc":k==="plant"?"cài bùa ngải":"dò la"} ${t.name}, bị đánh chết ở Thận Hình ti`);return}
 if(roll(confessRisk({tr:S.tamco>=60?"lanh":"",loyal:S.tin}))){/*evok: ordered scheme (schemes++)*/evA(t,m,BAL.eff.j42.evSrvDoOrder);relAdd(m,t,BAL.eff.j42.srvDoOrder);srvLaundry(`Bị bắt, ngươi khai ra ${m.name}. ${t.name} nắm ${balAb(BAL.eff.j42.evSrvDoOrder)} chứng cứ; chủ hận ngươi.`,BAL.ag.why.srv.pun.orderWk);S.tin=BAL.ag.why.srv.pun.orderTin;return}
 apply({suc:BAL.eff.j42.sucSrvDoOrder,tin:3});log(`Bị bắt và tra khảo, ngươi cắn răng không khai. Sức ${balSg(BAL.eff.j42.sucSrvDoOrder)}. Chủ nhân nhớ ơn.`);if(S.suc<=0&&!(typeof kietSave==="function"&&kietSave()))die("Chết dưới đòn tra khảo ở Thận Hình ti")}
function srvBribeOffer(w){const m=srvM();const L=liveRivals(true).filter(v=>v!==m&&hostility(v,m)>=netThK(v,"host","hostLo")&&(v.bac||0)>=40);const v=w&&L.includes(w)?w:npwPick(L,x=>hostility(x,m));if(!v)return;pushDil(mkP("cnvBribe",{r:v.id}),"Bạc lạ")}/* npc-purpose G2a: the rival with the worst grudge against her mistress */
function srvFramedEvent(w){const m=srvM();const L=srvColleagues().filter(s=>(S.srv.af[s.sid]||0)<0);const s=w&&L.includes(w)?w:npwPick(L,x=>-(S.srv.af[x.sid]||0));if(!s)return;pushDil(mkP("cnvFrame",{sid:s.sid}),"Bị vu oan")}/* npc-purpose G2a: the colleague who hates her most */
function srvFriendTip(w){const f=srvFriendList();if(!f.length)return;const s=w&&f.includes(w)?w:npwPick(f,x=>S.srv.af[x.sid]||0);if(!s)return;const m=srvM();const L=liveRivals(true).filter(x=>x!==m);
 const v=ownerOf(s);const tk=npwPick(["intel","gift"],k=>k==="intel"?(v&&L.includes(v)?BAL.ag.why.srv.tipIntel+Math.max(0,hostility(m,v)):0):BAL.ag.why.srv.tipGift);/* npc-purpose G2a: a friend can only tell what goes on in the palace she serves */
 const sv=typeof svTouch==="function"?svTouch(S,s,"friend",undefined,s):""/* the friend came to her (mv = s) *//* servant-trust fix r1: a friend of another house who comes to her — her own master may come to know */;
 if(tk==="intel"){S.srv.intel.push(v.id);log(`${s.name} (thân với ngươi, hầu bên cung ${v.name}) kể nhỏ với ngươi chuyện trong cung ${v.name}. Ngươi có tin để bẩm chủ.${sv?" "+sv:""}`)}else{apply({bac:2});const gb=typeof goodsGive==="function"?goodsGive(S,"banhtrai",{from:"story",who:s.name}):"";log(`${s.name} chia cho ngươi ít bánh trái và 2 lạng bạc.${gb?` ${gb} vào rương.`:""}${sv?" "+sv:""}`)}}

/* ---------- saveable choices ---------- */
PEND.cnvScold=()=>{const m=srvM();if(!isSrv()||!m)return null;
 return{t:`<p>${m.name} ${hasT(m,"Kiêu ngạo")?"chê trà nguội, hắt cả chén vào người ngươi":hasT(m,"Kín đáo")?"nghi ngươi lén lút ra ngoài, gọi vào tra hỏi":"trách ngươi làm việc chậm chạp"}.</p>`,who:pv(m),o:cnvPend(S,cnvScoldOpts(S,m))}};
/* the one row of a master's order (the card here and the receiver card in jptime read it): what, the gain, the loss */
function ordRow(k,t){const desc={spy:`dò la cung ${t.name}, xem nàng gặp ai, nói gì`,plant:`lén giấu hình nhân bùa ngải vào tẩm cung ${t.name}`,poison:`bỏ thuốc độc vào bát canh dâng ${t.name}`}[k];
 const gain={spy:`Chủ tin ${balSg(BAL.rl.j42.ord.spy.tin)} · Bạc ${balSg(BAL.rl.j42.ord.spy.bac)} · chủ nắm ${balAb(BAL.eff.j42.evN)} chứng cứ của ${t.name}`,plant:`Chủ tin ${balSg(BAL.rl.j42.ord.plant.tin)} · Bạc ${balSg(BAL.rl.j42.ord.plant.bac)} · ${t.name} bị vu, mất Danh`,poison:`Chủ tin ${balSg(BAL.rl.j42.ord.poison.tin)} · Bạc ${balSg(BAL.rl.j42.ord.poison.bac)} · ${t.name} trúng độc · ${kpDeathWord(kpDeathP("poison",t),"nàng")}`}[k]+` · ngươi công lao +${srvOrdMerit()}`;/* her own gain (srvDoOrder srvMerit): shown = applied, law 3 */
 return{say:desc,gain,loss:`Chủ tin ${balSg(BAL.rl.j42.ord.fail.tin)}, nửa phần bị bắt`}}
PEND.cnvOrd=pp=>{const m=srvM(),t=RV(pp.t);if(!isSrv()||!m||!t||!t.alive||t.out)return null;const k=pp.k,o=ordOdds(k);const R=ordRow(k,t),desc=R.say;
 const tail=` · thành: ${R.gain} · hỏng: ${R.loss}`;const O=cnvOrdOpts(S,m,t,()=>srvDoOrder(k,t));O[0].x=word(o)+tail;const hf=O.find(x=>x.id==="half");if(hf)hf.x=word(oddsCl(o-BAL.road.hp.half))+tail;
 return{t:`<p>${m.name} gọi ngươi vào phòng trong, đóng cửa: “Ngươi đi ${desc}.”</p><p class="past">Kẻ hầu nào làm cũng một luật: hỏng thì nửa phần bị bắt; bị bắt thì 3 phần bị đánh chết ở Thận Hình ti, hoặc phải khai ra chủ.</p>`,who:pv(m),o:cnvPend(S,O)}};
/* ===== ONE CORE (AG-ALL-2 G10, OD 17/11 ~14:50Z): the options of a servant's dilemma — ordered by her master (cnvOrdOpts), bribed by another
   palace (cnvBribeOpts), framed by a colleague (cnvFrameOpts) — built ONCE. a = the servant: S on the maid road (the PEND card renders them,
   cnvPend) or an NPC staff (jagstf2 stf2Pick weighs them by her needs / nết, with jmind's slip). Option: id, n, x (the card text), fx (sure,
   on a; tin = Chủ tin / lòng), o (odds) with w / l (on a when it holds / fails), go(ok) = what else follows (returns a line). ===== */
function stfAp(a,fx){if(!a||!fx)return;if(a===S)apply(fx);else if(typeof asAp==="function")asAp(a,fx);else for(const k in fx)if(k==="tin")a.loyal=cl((a.loyal||0)+fx[k],0,100)}
/* x's liking of y (y = the maid player: S.srv.af, "người ấy quý ngươi") */
function stfLike(x,y,n){if(!x||!y||x===y||x===S)return;if(y===S){if(isSrv())srvAf(x,n);return}x.af=x.af||{};x.af[y.sid]=cl((x.af[y.sid]||0)+n,-100,100)}
function stfNm(a){return a===S?"ngươi":a.name}
function cnvRun(a,op,fxDone){if(!op)return"";if(!fxDone)stfAp(a,op.fx);let ok=true;if(op.o!=null){ok=roll(op.o);stfAp(a,ok?op.w:op.l)}return op.go?op.go(ok)||"":""}
function cnvPend(a,O){return O.map(op=>({n:op.n,fx:op.fx||{},x:op.x||"",p:op.o!=null?op.o:undefined/* law 4: cnvRun rolls op.o */,go:()=>{const r=cnvRun(a,op,true);if(r)log(r)}}))}
function cnvOrdOpts(a,m,t,obey){const mal=m.malice||40;const q=queenP();const who=q&&q!==m&&q!==t&&q!==S?q:t;
 return [{id:"obey",n:"Giúp hết lòng",tag:"work",fx:{},x:"",go:obey},
  /* the 4 answers of OD L1876 for every order (owner 18/11 ~21:15Z): «Giúp qua loa» = the same deed, odds − BAL.road.hp.half (ordHalf, the ONE qua-loa number of OD L1876) */
  {id:"half",n:"Giúp qua loa",tag:"half",fx:{},x:"",go:obey?()=>ordHalf(obey):null},
  {id:"refuse",n:"Từ chối",tag:"help",fx:{tin:mal>=60?-15:-10},x:`kèm: bị phạt quỳ đá vụn, Sức ${balSg(BAL.eff.j42.sucGo_2)}: ${chanceW(mal/2)}`,go:()=>{if(!roll(mal/2))return"";stfAp(a,{suc:BAL.eff.j42.sucGo_2});
    if(a===S){log(`${m.name} sai người phạt ngươi quỳ trên đá vụn. Sức ${balSg(BAL.eff.j42.sucGo_2)}.`);if(S.suc<=0&&!(typeof kietSave==="function"&&kietSave()))die("Quỳ phạt đến kiệt sức mà chết");return""}if((a.suc||0)<=0&&!(typeof kietNpcSave==="function"&&kietNpcSave(a))&&typeof asOut==="function")asOut(a,"dead");return""}},
  {id:"tell",n:`Mách lẻo: báo cho ${who.queen?"Hoàng hậu":who.name}`,tag:"flee",fx:{bac:20,danh:2},x:`${who.name} nắm ${balAb(BAL.ag.ev.two)} chứng cứ của ${m.name} · chủ biết thì ngươi bị đánh chết hoặc đày Tân Giả khố`,
   go:()=>{/*evok: mistress schemed (sec>0)*/const d=evA(who,m,BAL.ag.ev.two);if(a===S){S.srv.betray={by:who.id};return `Ngươi lén báo cho ${who.name} mưu của ${m.name}.`}a.betray={by:key(who)};return who===S&&d?`${a.name}, người hầu của ${m.name}, lén đến mật báo mưu của chủ: ${evSg(d)}.`:""}}]}
/* reviewer r2 (review/coop-b1b5-r2, ONE CORE OD:L1267): the tai mắt terms, one text for every bribe card (solo j42 + co-op jcoopworld); pay / Chủ tin from BAL.coopBribe */
function cnvSpyX(m,noPay){return `${noPay?"":`mỗi tháng Bạc +${BAL.ag.why.srv.pun.spyPay} · kèm: `}mỗi tháng chủ phát hiện: ${chanceW(nv(m,"spyFind"))}; khi ấy bị đánh chết: ${chanceW(npwShare(["kill","lau"],k=>srvPunW(m,k),"kill"))}, không thì Tân Giả khố ${BAL.ag.why.srv.pun.lauWk} tuần`}
PEND.cnvBribe=pp=>{const m=srvM(),v=RV(pp.r);if(!isSrv()||!m||!v||!v.alive)return null;
 return{t:`<p>Một thái giám của ${v.name} chặn ngươi ở hành lang, dúi vào tay ngươi một túi bạc: “Chủ tử nhà ta muốn biết chuyện trong cung ${m.name}.”</p>`,who:pv(v),o:cnvPend(S,cnvBribeOpts(S,v,m,BAL.coopBribe.pay))}};
function cnvBribeOpts(a,v,m,pay){return [
  {id:"take",n:"Nhận bạc, làm tai mắt",tag:"bribe",fx:{bac:pay},x:a===S?cnvSpyX(m):"",go:()=>{if(a===S){ap(v,{bac:-pay});deedAdd(v,"sbribe",null,deedW("sbribe"),`mua chuộc người hầu của ${m.name}`);S.srv.spyFor=v.id;try{if(typeof svTouch==="function"){const x=svTouch(v,S,"bribe");if(x)log(x)}}catch(e){}/* servant-trust: her own master may come to know (law 1) */}else a.spyFor=key(v);affAdd(a,v,BAL.relMS.bribe);return""}},
  {id:"tell",n:"Từ chối, bẩm chủ",tag:"help",fx:{tin:BAL.coopBribe.tin},x:`${m.name} nắm ${balAb(BAL.ag.ev.one)} chứng cứ của ${v.name} · kèm: ${v.name} ghi hận ngươi, thiện cảm ${affSg(v,a,-BAL.coopBribe.grudge)}`,go:()=>{cnvBribeAff(v,a,-1);if(a===S)deedAdd(v,"sbribe",null,deedW("sbribe"),`mua chuộc người hầu của ${m.name}`);/*evok: bribe deed written just before (bribeServ: jtruth)*/evA(m,v,BAL.ag.ev.one);/* TAI-MAT-KNOW: told = the master LEARNS it */typeof spyLearn==="function"&&spyLearn(m,v,BAL.ag.ev.rel);return""}},
  {id:"quiet",n:"Từ chối, im lặng",tag:"work",fx:{},x:`thành: trả lại bạc, giữ hòa khí với ${v.name}, thiện cảm ${affSg(v,a,BAL.coopBribe.grudge)/* PVQUY-POST-2: the partner is the servant a (cnvBribeAff: affAdd(v,a)) */}`,go:()=>{cnvBribeAff(v,a,1);return""}}]}
/* law 2 «Bạc lạ» (D #7 19/11): the briber's thiện cảm for the servant who refused — ONE constant BAL.coopBribe.grudge, sign by the answer (an NPC servant without an id: no regard row) */
function cnvBribeAff(v,a,sg){try{if(v&&a&&(a===S||a.id!=null))affAdd(v,a,sg*BAL.coopBribe.grudge)}catch(e){}}
PEND.cnvFrame=pp=>{const s=servById(pp.sid),m=srvM();if(!isSrv()||!s||!m)return null;const fr=srvFriendList().length;const item=pick(["cây trâm vàng","chiếc vòng ngọc","hộp phấn ngự ban","túi hương thêu chỉ vàng"]);
 return{t:`<p>${s.name} (${srkName(s)}) tố với ${m.name} rằng ngươi lấy trộm ${item}.</p>${fr?`<p class="past">${fr} người bạn sẽ làm chứng cho ngươi.</p>`:""}`,who:pServ(s),o:cnvPend(S,cnvFrameOpts(S,s,m))}};
/* a = the framed one, s = the accuser (S when the maid player framed an NPC colleague), m = their master */
function cnvFrameOpts(a,s,m){const fr=a===S?srvFriendList().length:(typeof asFriends==="function"?asFriends(a):0);const o=odA(a,BAL.odb.j42.odO_9+(a.tamco||0)/BAL.odb.j42.frTcDiv+(a.duc||0)/BAL.odb.j42.frDucDiv+fr*8);
 return [
  {id:"clear",n:"Thanh minh",tag:"social",o,fx:{},w:{tin:BAL.eff.j42.tinGo_3},l:{tin:BAL.eff.j42.tinGo_4,suc:BAL.eff.j42.sucGo_3},x:`${word(o)} · thành: ${s.name} bị phạt, Chủ tin ${balSg(BAL.eff.j42.tinGo_3)} · hỏng: Chủ tin ${balSg(BAL.eff.j42.tinGo_4)}, bị đánh đòn Sức ${balSg(BAL.eff.j42.sucGo_3)}`,
   go:ok=>{if(ok){const P=BAL.ag.stf2.accPen;if(s===S)apply({tin:-P});else{s.loyal=cl(s.loyal-P,0,100);s.trouble=wk()}stfLike(s,a,-20);return a===S?`Ngươi thanh minh được; ${s.name} bị phạt vì vu cáo.`:`${a.name} thanh minh được; ${stfNm(s)} bị phạt vì vu cáo.`}
    if(a===S){log(`${m.name} không tin ngươi, sai đánh đòn.`);if(S.suc<=0&&!(typeof kietSave==="function"&&kietSave()))die("Bị đánh đòn vì tội trộm cắp, không qua khỏi");else if(S.tin<BAL.ag.why.srv.pun.stealTin)srvLaundry(`${m.name} cho rằng ngươi là kẻ cắp.`,BAL.ag.why.srv.pun.stealWk);return""}
    a.trouble=wk();if((a.suc||0)<=0&&!(typeof kietNpcSave==="function"&&kietNpcSave(a))&&typeof asOut==="function")asOut(a,"dead");else if((a.loyal||0)<8&&typeof asOut==="function")asOut(a,"tgk");return `${m.name} không tin ${a.name}, sai đánh đòn.`}},
  {id:"confess",n:"Nhận tội, xin tha",tag:"confess",fx:{...BAL.cv.confessTha},x:"thành: tránh được trận đòn, không bị đẩy xuống giặt",go:()=>{if(a!==S)a.trouble=wk();return""}},
  {id:"pay",n:`Đút bạc cho ${s.name} rút lời`,tag:"bribe",fx:{bac:-10},x:`${s.name} thôi tố, người ấy quý ngươi +10`,lock:(a===S?S.bac:(a.bac||0))<10,go:()=>{stfLike(s,a,10);return""}}]}
/* ===== ONE CORE (AG-ALL-2e4 parity, OD 17/11 ~15:25Z (3)): the maid's other dilemmas, built ONCE for the maid player's PEND card / person-card buttons
   and an NPC maid (jagacts3: stf2Pick by her needs × nết, mindPick slip). Numbers BAL.ag.par3.cnv; odds clamped BAL.odds.lo/hi (cnvOd). ===== */
function cnvOd(b){return cl(Math.round(b),BAL.odds.lo,BAL.odds.hi)}
function cnvGo(a,op,ok){stfAp(a,op.fx);if(op.o!=null)stfAp(a,ok?op.w:op.l);return op.go?op.go(ok)||"":""}
/* bị chủ quở mắng (her srvMoodEvent; an NPC maid when her master punishes her, j10 servDo "phat") */
function cnvScoldOpts(a,m){const X=BAL.ag.par3.cnv.scold;const o=odA(a,X.beg.o+(a.sac||0)/X.beg.sacD);
 return [{id:"humble",n:"Cúi đầu nhận lỗi",tag:"confess",fx:{...X.humble},x:""},
  {id:"beg",n:"Khóc lóc xin tha",tag:"social",o,fx:{},w:{tin:X.beg.tin},l:{tin:X.beg.tinL},x:`${word(o)} · thành: Chủ tin ${balSg(X.beg.tin)} · hỏng: Chủ tin ${balSg(X.beg.tinL)}`,
   go:ok=>{if(a===S)log(ok?"Chủ mềm lòng.":"Chủ càng bực.");return a===S?"":`${a.name} khóc lóc xin tha; ${m.name} ${ok?"mềm lòng":"càng bực"}`}},
  {id:"talk",n:"Cãi lại",tag:"flee",fx:{danh:X.talk.danh,tin:-X.talk.tin},x:`đám cung nhân nể · kèm: bị phạt quỳ, Sức ${balSg(-X.talk.suc)}: ${chanceW(X.talk.kneel)}`,
   go:()=>{if(!roll(cnvOd(X.talk.kneel)))return a===S?"":`${a.name} cãi lại ${m.name}`;stfAp(a,{suc:-X.talk.suc});if(a===S){log(`Bị phạt quỳ giữa sân. Sức ${balSg(-X.talk.suc)}.`);if(S.suc<=0&&!(typeof kietSave==="function"&&kietSave()))die("Quỳ phạt đến kiệt sức mà chết");return""}
    if((a.suc||0)<=0&&!(typeof kietNpcSave==="function"&&kietNpcSave(a))&&typeof asOut==="function")asOut(a,"dead");return `${a.name} cãi lại ${m.name}, bị phạt quỳ giữa sân`}}]}
/* yến tiệc đầu xuân / Thất tịch (months 1 and 7): she serves at her master's side */
function cnvFestOpts(a,m){const X=BAL.ag.par3.cnv.fest;const o=odA(a,X.pour.o+(a.sac||0)/X.pour.sacD+(a.tai||0)/X.pour.taiD);
 return [{id:"pour",n:"Rót rượu gần ngự tọa",tag:"social",o,fx:{},w:a===S?{}:{sung:amTeaG(a,X.pour.nt)},l:{tin:-X.pour.tin},x:`${word(o)} · thành: Hoàng thượng để ý +${X.pour.nt} · hỏng: Chủ tin -${X.pour.tin}`,
   go:ok=>{if(!ok)return a===S?"":`${a.name} rót rượu gần ngự tọa, lỡ tay làm chủ mất mặt`;if(a===S){srvNotice("fest",X.pour.nt);return""}try{empMet(a,"fest",1)}catch(e){}
    return `${a.name}, cung nữ của ${m?NM(m):"một cung"}, rót rượu gần ngự tọa, được Hoàng thượng để mắt`}},
  {id:"stand",n:"Đứng sau hầu chủ",tag:"work",fx:{tin:X.stand.tin},x:""}]}
/* bị nắm thóp (her affair seen, S.srv.leak; an NPC servant whose đối thực is known: j10 threatServ) — v = the one who threatens, m = her master */
function cnvBlackOpts(a,v,m){const X=BAL.ag.par3.cnv.black;const o=cnvOd(X.ignore.o);
 return [{id:"obey",n:"Nghe lời, làm tai mắt",tag:"work",fx:{},x:a===S?`thành tai mắt của ${v.name} (không bạc) · kèm: ${cnvSpyX(m||{},1)}`:"",
   go:()=>{oanAdd(a,v,BAL.relMS.threat);if(a===S){S.srv.spyFor=v.id;S.srv.leak=null;try{if(typeof svTouch==="function"){const x=svTouch(v,S,"threat");if(x)log(x)}}catch(e){}/* servant-trust: her master may come to know (law 1) */return""}a.spyFor=key(v);return `${a.name} sợ hãi, thành tai mắt của ${NM(v)}`}},
  /* split-merge A4 (owner 26/11 ~21:35Z): no «Đút bạc bịt miệng» — a witness is not bought off here; two roads (obey / mặc kệ), same for an NPC maid */
  {id:"ignore",n:"Mặc kệ",tag:"flee",o,fx:{},w:{},l:{},x:`${word(o)} · thành: nàng không nói · hỏng: nàng mách ${m?m.name:"quản sự"}, bị lục rương`,
   go:ok=>{if(a===S){if(!ok){const mm=manById(S.srv.lover)||srvMen().filter(x=>x.tinh>=BAL.tinhLv.warm)[0];if(mm)srvAffairCaught(mm,`${v.name} sai người mách chuyện tư tình của ngươi.`)}else S.srv.leak=null;return""}
    if(ok)return `${a.name} mặc kệ lời dọa của ${NM(v)}; không ai nói ra`;if(m){m.knowDT=(m.knowDT||[]).concat([a.sid,a.lover]);stfAp(a,{tin:-X.caught.tin});if(roll(cnvOd(X.caught.tgk))&&typeof asOut==="function")asOut(a,"tgk")}
    return `${NM(v)} mách ${m?NM(m):"quản sự"} chuyện đối thực của ${a.name}${a.out?"; bị đày xuống Tân Giả khố":""}`}}]}
/* a maid who knows a consort's affair (her S.srv.knowAff, person card; an NPC maid s.knowAff, jagacts3): Dọa tố chuyện tư tình · Bẩm chủ chuyện của X · (NPC only) keep it */
function cnvAffOpts(a,v,mis){const X=BAL.ag.par3.cnv.aff;const o=odA(a,X.threat.o+(a.tamco||0)/X.threat.tcD);const drop=()=>{if(a===S)S.srv.knowAff=(S.srv.knowAff||[]).filter(x=>x!==v.id);else a.knowAff=(a.knowAff||[]).filter(x=>x!==v.id)};const lm=manById(v.affair);
 const O=[{id:"threat",n:"Dọa tố chuyện tư tình",tag:"bribe",o,fx:{},w:{bac:X.threat.bac},l:{},x:`Bạc +${X.threat.bac} · nàng phải che chở ngươi · hỏng: nàng oán ngươi, tìm cách hại ngươi`,
   go:ok=>{drop();if(ok){if(a===S){affAdd(v,S,BAL.eff.j42.top);S.srv.hold=v.id}else a.hold=v.id;return a===S?`${v.name} tái mặt, dúi bạc vào tay ngươi: “Câm miệng.”`:`${a.name} dọa tố chuyện tư tình của ${v.name}, được bạc bịt miệng`}
    if(a===S){oanAdd(v,S,BAL.eff.j42.top_2);if(roll(cnvOd(X.threat.lau)))srvLaundry(`${v.name} ra tay trước, vu cho ngươi ăn cắp.`,X.threat.lauW);return `${v.name} cười lạnh.`}
    if(roll(cnvOd(X.threat.lau))&&typeof asOut==="function")asOut(a,"tgk");return `${a.name} dọa ${v.name}, bị nàng ra tay trước${a.out?", đày xuống Tân Giả khố":""}`}}];
 if(mis&&mis!==v)O.push({id:"tell",n:`Bẩm chủ chuyện của ${v.name}`,tag:"help",fx:{tin:X.tell.tin},x:`Chủ tin +${X.tell.tin} · ${mis.name} nắm ${balAb(BAL.eff.j42.evTop)} chứng cứ của ${v.name}`,
   go:()=>{drop();/*evok: affair*/evA(mis,v,BAL.eff.j42.evTop);return a===S?`${mis.name} ghi nhớ.${lm?" Chuyện "+v.name+" với "+lm.name+" thành thanh gươm trong tay chủ.":""}`:`${a.name} bẩm ${NM(mis)} chuyện tư tình của ${v.name}`}});
 if(a!==S)O.push({id:"quiet",n:"Giữ kín",tag:"work",fx:{},x:""});return O}
PEND.cnvName=pp=>{if(!isSrv()||(S.age||0)<BAL.ageMin)return null;const m=srvM();const o=od(BAL.odb.j42.odO_10+S.nt/2+S.sac/5);const risky=!amOn()&&!!m&&(m.malice||0)>=60&&S.tin<40;/* AG3: the mistress harms her by her own acts, no extra line */
 return{t:`<p>${pp.src==="month"?"Tổng quản Càn Thanh cung đến hỏi: Hoàng thượng còn nhớ cung nữ dâng trà hôm nọ.":"Hoàng thượng đặt chén trà xuống, hỏi: “Ngươi tên gì? Hầu ở cung nào?”"}</p>${risky?`<p class="r">${m.name} vốn nhiều ác ý, lại chẳng ưa ngươi: nàng ra tay trước ngày sắc phong: ${chanceW(BAL.rk.riseKill)}.</p>`:""}`,who:pEmp(),o:[
  {n:"Cúi đầu thưa tên",fx:{},x:`${word(o)} · thành: được phong ${RANKS[0].n}${risky?`, nhưng chủ giết ngươi trước ngày sắc phong: ${chanceW(BAL.rk.riseKill)}`:""} · hỏng: Chủ tin ${balSg(BAL.eff.j42.tinGo_5)}`,go:()=>{if(roll(o)){if(risky&&roll(BAL.rk.riseKill)){die(`Trước ngày sắc phong, ${m.name} sai người đẩy ngươi xuống giếng`);return}srvRise(pp.src==="month"?"Hoàng thượng nhớ đến ngươi":"Hoàng thượng để mắt đến cung nữ dâng trà")}else{apply({tin:BAL.eff.j42.tinGo_5});if(m)log(`${m.name} biết chuyện, giận ngươi lả lơi. Chủ tin -15.`)}}},
  {n:"Lui về sau chủ",fx:{tin:5},x:"Hoàng thượng để ý -10",go:()=>{S.nt=Math.max(0,S.nt-10)}}]}};
PEND.cnvWed=pp=>{if(!isSrv()||(S.age||0)<BAL.ageMin)return null;const w=WEDW[pp.w||0];
 return{t:`<p>${w} dâng sớ xin Hoàng thượng ban gả một cung nữ hiền thục. Nội vụ phủ dâng tên ngươi.</p>`,who:pEmp(),o:[
  {n:"Tạ ơn, xuất giá",fx:{},x:"kết thúc kiếp này: làm vợ ngoài cung",go:()=>over("Xuất giá",`${S.name} được ban gả cho ${w}, rời cung bằng kiệu hoa. Từ thân cung nữ, ngươi thành chính thất một nhà, sống nốt đời ngoài bức tường son.`,`Được ban gả cho ${w}`,true)},
  {n:"Xin ở lại hầu chủ",fx:{tin:BAL.eff.j42.tinWedStay},x:"ở lại hầu chủ"}]}};
PEND.cnvAge=()=>{if(!isSrv())return null;const hi=S.srv.rk>=BAL.srvRk.cs;const fate=hi?"Chưởng sự xuất cung, an hưởng tuổi già":S.bac>=100?"Xuất cung, mở tiệm nhỏ ở kinh thành":"Xuất cung về quê";
 const o=[{n:"Xuất cung về quê",fx:{},x:"kết thúc kiếp này",go:()=>over("Xuất cung",`${S.name} ${S.age} tuổi, rời cung theo lệ với ${S.bac} lạng bạc. ${hi?"Là chưởng sự cô cô, ngươi được ban thêm bạc và một mảnh ruộng.":S.bac>=100?"Ngươi mở một tiệm thêu nhỏ ở kinh thành.":"Ngươi về quê, sống đời bình dị."}`,fate,true)}];
 if(hi)o.push({n:"Ở lại làm ma ma",fx:{danh:3},x:typeof exSrvMama==="function"?"dự khảo hạch Nội vụ phủ; đỗ thì ở lại đến già, dạy cung nữ mới":"ở lại đến già, dạy cung nữ mới",go:()=>{if(typeof exSrvMama==="function")exSrvMama();else{S.srv.mama=1;log("Ngươi ở lại cung làm ma ma.")}}});
 else if(S.tin>=BAL.srvx.keepTin)o.push({n:"Xin chủ giữ lại",fx:{tin:BAL.eff.j42.tinKeep},x:`ở lại đến ${BAL.srvAge.out} tuổi · chủ xin Nội vụ phủ giữ ngươi`,go:()=>log(`${srvM()?srvM().name:"Chủ"} xin Nội vụ phủ giữ ngươi lại.`)});
 /* cnv-exit-promo: below keepTin the chủ does not speak for her; she asks Nội vụ phủ herself and truly stays to BAL.srvAge.out (j42 srvMonth), the chủ is displeased. The line names no threshold (the kit hint read «Chủ tin dưới 60» as a Chủ tin gain) */
 else o.push({n:"Xin ở lại",fx:{tin:BAL.eff.j42.tinGo_6},x:`ở lại đến ${BAL.srvAge.out} tuổi · chủ không đứng ra giữ, ngươi tự xin Nội vụ phủ`});
 return{t:`<p>Năm nay ngươi ${S.age} tuổi, đến tuổi cung nữ được xuất cung.</p>`,who:pMe(),o}};
PEND.cnvFest=pp=>{if(!isSrv())return null;const m=srvM();
 return{t:`<p>${pp.m===1?"Yến tiệc đầu xuân ở Thái Hòa điện":"Tiệc Thất tịch bên hồ sen"}. Ngươi theo hầu ${m?m.name:"chủ"}.</p>`,who:pMe(),o:cnvPend(S,cnvFestOpts(S,m))}};

/* ---------- rising: she joins the consort game ---------- */
function srvRise(why){if(!S||(S.age||0)<BAL.ageMin)return;const m=srvM();const tin=S.tin;S.srv.risen=1;S.srv.wasMis=m?m.id:null;S.srv.sent=null;forgetSafe(S);/* promo-root: a raised maid enters as a consort, same «Bị bỏ quên» grace *//* balance-2 fault 9 (only BAL.danhG.srvRise of her servant Danh carries over) lives in riseCore, the same rule for an NPC maid (role-parity-bundle-fix) *//* ROLE PARITY: ONE promotion rule for her and an NPC maid (jagmaid riseCore: Sủng, Danh, Bạc, old master) */S.lastPromo=S.turn;const loyR=typeof riseCore==="function"?riseCore(S,S,m,tin):null;if(loyR==null){S.rank=0;S.sung=15+Math.round(S.nt/5);apply({danh:5,bac:20})}
 S.maid=newMaid(nmNew("maid"),50);S.staff=[];try{fillStaff(S,true)}catch(e){}
 if(loyR==null&&m&&m.alive){relAdd(S,m,tin>=60?BAL.eff.j42.srvRise[0]:BAL.eff.j42.srvRise[1]);ghenUp(m,tin>=60?5:25,"thấy cung nữ cũ của mình được nâng lên làm phi tần",S)}
 try{palFix()}catch(e){}S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};tab="act";
 log(`<b class="g">${why}: ngươi được phong ${RANKS[0].n}.</b>`);
 Q.push({t:"Thánh chỉ",cls:"end",who:pEmp(),h:`<p>${why}. Thánh chỉ: cung nữ ${S.name} được phong <b>${RANKS[0].n}</b>, ở ${palName("home")}.</p><p>${m?`${m.name} ${tin>=60?"vẫn coi ngươi như người nhà.":"nhìn ngươi bằng ánh mắt lạnh như băng."}`:""}</p><p class="past">Từ nay ngươi theo luật của phi tần: Sủng, thị tẩm, phẩm vị.</p>`,btn:"Tạ ơn"});
 deal();render();if($("modal").hidden)showModal()}

/* ---------- endings keep her servant title in the record: ONE CORE lifeTopRank (j32) prints her maid post on the end card, Sổ luân hồi and the board (D-ENDRANK;
   the old regex rewrite here matched the pre-kit «<span>…</span><b>…</b>» rows and silently failed on kit rows: «Phẩm cao nhất: Đáp ứng» for a maid) ---------- */

/* ---------- UI: HUD, tabs, panels, self card, map ---------- */
/* maid-8tabs (owner 21/11 ~03:15Z mark #32, ~03:22Z mark #35 ONE SHELL): the cung nữ road shows the consort's 8 bottom tabs (Hành sự · Dư đồ · Hậu cung · Giao tình ·
   Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện) with the same groups and sub-tabs; what each tab shows on her road = ONE table, ROAD8 in jroad8.js
   (Đồng liêu = Hậu cung › sub-tab, Thân phận = Mệnh truyện › sub-tab). No servant tab bar, no servant tab names left here. */
function srvHud(){const e=$("hud-sung");if(!e)return;const sm=e.querySelector("small");if(sm&&sm.dataset.o0==null)sm.dataset.o0=sm.innerHTML;
 if(isSrv()){$("me-r").textContent=srvTitle();if(sm)sm.innerHTML=sm.dataset.o0.replace("Sủng","Chủ tin");e.querySelector("span").textContent=S.tin;const u=e.querySelector("u");if(u)u.style.width=S.tin+"%";e.title=HX.tin}
 else if(sm&&sm.innerHTML!==sm.dataset.o0){sm.innerHTML=sm.dataset.o0;e.title=""}}
(function(){const h0=renderHUD;renderHUD=function(){const r=h0.apply(this,arguments);try{srvHud()}catch(e){console.error(e)}return r}})();
(function(){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{if(isSrv())srvHud2()}catch(e){console.error(e)}return r}})();
function srvHud2(){const el=$("hud2");if(!el)return;const col=el.classList.contains("col");const m=srvM();
 const c=(k,l,v,cls)=>`<button class="hc ${cls||""}${["buoi","date","srk"].includes(k)?" keep":""}" data-hx="${k}">${l}${v!==""&&v!=null?` <b>${v}</b>`:""}</button>`;
 el.innerHTML=`<button class="h2t" data-h2t="1" aria-label="${col?"Mở rộng":"Thu gọn"}">${col?"▾":"▴"}</button>`+c("date",`T${S.month}/${S.year} · ${TUAN[S.tuan]}`,"")+c("buoi",`${BUOI[S.buoi||0].replace("Buổi ","")} · còn`,`${BAL.time.khac-used} khắc`)+c("srk",srvRkN(),"",S.srv.lau>0?"hot":"")
  +c("tin","Chủ tin",S.tin,S.tin<BAL.tinLv.lo?"hot":S.tin>=BAL.tinLv.hi?"ok":"")+c("nt","Hoàng thượng để ý",S.nt,S.nt>=BAL.ntRise.at?"ok":"")+c("sac","Sắc",S.sac)+c("tai","Tài",S.tai)+c("tamco","Tâm cơ",S.tamco)+c("duc","Đức",S.duc)
  +c("merit","Công lao",`${kitNeed(S.srv.mp,srvMpNeed(S.srv.rk))}`)+c("wage","Lương tháng",`${CNV_WAGE[S.srv.rk]} bạc`)+c("age","Tuổi",`${S.age} · xuất cung ${S.srv.mama?BAL.srvAge.mama:BAL.srvAge.ask}`)
  +(S.srv.lau>0?c("lau","Tân Giả khố",`${S.srv.lau} tuần`,"hot"):"")+(S.srv.sec?c("sec","Biết chuyện của chủ",S.srv.sec,"hot"):"")+(S.srv.spyFor!=null?c("spy","Tai mắt cho người khác","","hot"):"")+(m?c("mis",`Chủ: ${m.name}`,netTxt(m)):"")}
(function(){const r0=render;render=function(){/* maid-8tabs: every consort tab is hers too (jroad8 guards unknown keys) */const r=r0.apply(this,arguments);try{if(isSrv()&&tab==="go")srvMapFix()}catch(e){console.error(e)}return r}})();
function srvMapFix(){const m=srvM(),mk=m&&palaceOf(m);document.querySelectorAll('#panel .mspot[data-go="home"]').forEach(b=>b.remove());
 document.querySelectorAll("#panel button.mspot[data-go]").forEach(b=>{const k=b.dataset.go;if(k===mk){b.classList.add("srvmine");if(S.place==="home")b.classList.add("here");const l=b.querySelector(".mlab");if(l&&!l.querySelector(".srvtag"))l.insertAdjacentHTML("beforeend",' <i class="srvtag">cung chủ</i>');b.disabled=false;return}
  const h=window.placeEnterHook(S,k);if(h&&!h.ok&&!b.disabled){b.disabled=true;b.classList.add("off","srvno");b.title=`${b.title.split(":")[0]}: ${h.why}`;let mt=b.querySelector(".mmeta");if(!mt){mt=document.createElement("span");mt.className="mmeta";b.appendChild(mt)}mt.innerHTML=`<em>${h.why}</em>`}})}
(function(){const p0=renderPanel0;renderPanel0=function(){if(!isSrv()||!["staff","story","act"].includes(tab))return p0.apply(this,arguments);
 const el=$("panel");if(tab==="act")return p0.apply(this,arguments);/* owner 21/11 ~03:18Z mark #33: no «Cung nữ … của … · Chủ tin» strip under the tabs (the header already says it; Chủ tin = stage right column, jk3) */
 const gm=document.querySelector(".game");if(gm)gm.classList.remove("cardtab","maptab");const keep=el.dataset.tab===tab?el.scrollTop:0;el.innerHTML=tab==="staff"?srvStaffTabHTML():srvRoadHTML();el.dataset.tab=tab;el.dataset.pg="";kitFix(el);panelScrollKeep(el,keep)}})();
function srvRows(){const m=srvM();const need=srvMpNeed(S.srv.rk),mx=srvMax();const row=(a,b)=>[a,b,"t"];/* KIT §51: kit table rows (pcard group → kitRows) */
 return [row("Thân phận",srvTitle()),row("Công lao",`${kitNeed(S.srv.mp,need)}${S.srv.rk>=mx?` · bậc cao nhất cung ${m?m.name:""} cho phép`:` · đủ thì lên ${SRK.maid[S.srv.rk+1]||""}`}`),row("Lương tháng",`${CNV_WAGE[S.srv.rk]} bạc · đang có ${S.bac}`),
  row("Hoàng thượng để ý",amOn()?`${S.nt}/100 · ngài nhớ việc ngươi làm gần ngài trong ${BAL.ag.emp.met.keep} tuần; càng để ý, càng dễ được ngài cho gọi đến hầu`:`${S.nt}/100 · từ ${BAL.ntRise.at}, mỗi lần để ý ngươi ngài hỏi tên, phong ${RANKS[0].n}: ${chanceW(ntRiseOdds())}`),row("Ban gả",S.srv.rk>=BAL.srvRk.dai?`Danh ${kitNeed(S.danh,BAL.danhG.srvWed)} · đủ thì có người xin cưới`:`cần ${SRK.maid[BAL.srvRk.dai]}, Danh ${BAL.danhG.srvWed}`),
  row("Xuất cung",S.srv.mama?"ma ma: ở đến "+(BAL.srvAge.mama)+" tuổi":`${kitNeed(S.age,BAL.srvAge.ask)} tuổi · từ ${SRK.maid[BAL.srvRk.cs]} trở lên, đỗ khảo hạch, được ở lại làm ma ma`),
  row("Đường xuống",`Chủ tin ${S.tin}: dưới ${BAL.srvx.tinOut} dễ bị đày Tân Giả khố`),row("Biết chuyện của chủ",`${S.srv.sec}${S.srv.betray?" · đã mật báo, chủ biết thì nguy":""}`),
  row("Bạn trong cung",`${srvFriendList().length} người (quý ngươi từ ${BAL.srvx.friendAf})`)].concat(S.srv.spyFor!=null&&RV(S.srv.spyFor)?[row("Tai mắt cho",RV(S.srv.spyFor).name)]:[])}
/* maid-ladder-6 (owner OD 19/11 ~01:26Z + L1935, expert hist-mama-ladder): the whole servant ladder on the kit ladder part (kitTiers, j79):
   six rungs, then «Ma ma» = the stay-on standing (age BAL.srvAge.ask + rung ≥ BAL.srvRk.cs + Nội vụ phủ exam), never a hidden side road */
function srvLadderHTML(){const K=BAL.srvRk,r=S.srv.lau>0?-1:S.srv.mama?K.mama:(S.srv.rk|0),mx=srvMax();
 const T=SRK.maid.map((n,i)=>({k:`Bậc ${i+1}`,n,c:i<=r?"g":"",on:i===r,
  d:(i===K.dai?"Tức Đại cung nữ · ":"")+(i>mx&&i>r?"Cung chủ phẩm này chưa cho lên tới bậc này":`${CNV_WAGE[i]} bạc mỗi tháng`)}));
 T.push({k:"Ở lại",n:"Ma ma",c:S.srv.mama?"g":"",on:!!S.srv.mama,d:`Đến ${BAL.srvAge.ask} tuổi, từ ${SRK.maid[K.cs]} trở lên, đỗ khảo hạch Nội vụ phủ thì ở lại làm ma ma đến ${BAL.srvAge.mama} tuổi; không thì xuất cung`});
 return `<div class="kpsec"><h4 class="kpst">Thang bậc cung nữ</h4>${kitTiers(T)}</div>`}
function srvRoadHTML(){const m=srvM();return `<div class="story"><h3>Thân phận cung nữ</h3><p style="margin:0 0 4px">Ngươi là ${srvTitle()}${m?` (${rkName(m)}, tính ${netTxt(m)})`:""}. Leo lên bằng công lao và lòng tin của chủ; được Hoàng thượng để mắt thì thành phi tần.</p></div>${kitRows(srvRows())}${srvLadderHTML()}`}/* tut-followups: srvRows returns kit rows (§51) since the kit table switch; the road tab printed the raw array */
/* owner 21/11 ~03:22Z mark #35 (verbatim in OD): «cái đồng liêu này mình đưa qua bên hậu cung … cung nhân thì mình sẽ đổi thành là đồng liêu … cái khung của nhân vật
   … phải để hiển thị những cái thông tin, những cái khung đó cho giống chứ». Hậu cung › Đồng liêu = the SAME person-tab layout as Cung nhân (j15 staffTabHTML):
   kit pager strip (faces, ‹ ›, n/N) + ONE kit person card (pcard) for the chosen colleague, with her act buttons (data-cnv, srvStaffAct) in card groups.
   Order and rows = srvColleagues (her palace first, then the people she knows). Nothing yet = the kit empty card. */
function srvStaffTabHTML(){const L0=srvColleagues();const m=srvM();if(!L0.length)return kitEmpty("Đồng liêu","Chưa quen ai.");
 const oc=od(SRVA.chat.o(S)),of=od(SRVA.frame.o(S));let s0=false,s1=false;
 const L=L0.map(s=>{const own=ownerOf(s)===m&&!!m;const sep=own&&!s0?(s0=true,"Cùng cung"):!own&&!s1?(s1=true,"Người quen"):"";return{s,p:s,f:pServ(s),name:shortN(s.name),sep}});
 const mk=i=>{const s=L[i].s;const a=S.srv.af[s.sid]||0;const o=ownerOf(s);const kn=S.srv.know[s.sid];const t1=!can(1)?"Hết khắc buổi này":"";
  const B=[pbtn(`data-cnv="chat" data-sid="${s.sid}"`,"Trò chuyện",`${word(oc)} · tốn: ${SRVA.chat.k} khắc · thành: người ấy quý ngươi ${balSg(spSee("rel",SRVA.chat.af))} · hỏng: người ấy quý ngươi ${balSg(spSee("rel",SRVA.chat.afL))}`,t1),
   pbtn(`data-cnv="gift" data-sid="${s.sid}"${capAt(BAL.btn.cnv,BAL.bacFee.cnvGift)}`,"Biếu quà",`${capW()} · tốn: Bạc -${BAL.bacFee.cnvGift}, ${BAL.btn.cnv.k} khắc · thành: người ấy quý ngươi ${balSg(spSee("rel",SRVA.gift.af))}`,S.bac<BAL.bacFee.cnvGift?"Thiếu bạc (cần "+BAL.bacFee.cnvGift+")":t1),
   pbtn(`data-cnv="ask" data-sid="${s.sid}"${capAt(BAL.btn.cnv)}`,"Nhờ dò tin",`${capW()} · tốn: ${BAL.btn.cnv.k} khắc · thành: có tin để bẩm chủ`,a<BAL.srvx.friendAf?`Cần người ấy quý ngươi từ ${BAL.srvx.friendAf}`:t1)];
  const H=[pbtn(`data-cnv="frame" data-sid="${s.sid}"`,"Tố lỗi với chủ",`${word(of)} · tốn: ${SRVA.frame.k} khắc · thành: ${s.name} bị phạt, Chủ tin ${balSg(SRVA.frame.w.tin)} · hỏng: người ấy quý ngươi ${balSg(spSee("rel",SRVA.frame.afL))}, Chủ tin ${balSg(SRVA.frame.l.tin)}`,o!==m?"Chỉ tố người cùng cung":S.srv.lau>0?"Đang ở Tân Giả khố":t1),
   (o&&o!==m&&s.role==="maid"?pbtn(`data-cnv="poison" data-sid="${s.sid}"`,"Bỏ độc vào bát cơm",`${word(od(SRVA.poison.o(S,m)))} · tốn: Bạc ${srvCa("poison",S,m).bac}, ${SRVA.poison.k} khắc · thành: không ai tra ra · hỏng: Thái y tra ra, ngươi bị giải sang Thận hình ti · kèm: ${s.name} trúng độc; không qua khỏi: ${chanceW(BAL.mline.poisonDie)}`,!stfPoisonOk(S,m,s)?(S.bac<-srvCa("poison",S,m).bac?"Thiếu bạc":"Cung ấy không thù cung chủ"):!can(SRVA.poison.k)?"Hết khắc buổi này":""):"")].filter(Boolean);
  return pcard({f:L[i].f,name:s.name,rank:srkName(s),lines:[tuoi(s.age),`${o?(o===m?"Cùng cung":"Người của "+o.name):"Nội vụ phủ"} · ${kn?"tính "+netTxt(s):"chưa rõ tính"}`,`Thiện cảm <b class="${a>=BAL.srvx.friendAf?"g":a<0?"r":""}">${a}</b>`],
   chips:[a>=BAL.srvx.friendAf?chip("bạn của ngươi","ok"):"",a<0?chip("ghét ngươi","hot"):""],
   note:`Bạn (quý ngươi từ ${BAL.srvx.friendAf}) làm chứng khi ngươi bị vu, mách tin; kẻ ghét ngươi (dưới 0) tìm dịp vu cáo.`,groups:[["Giao thiệp",B],["Mưu kế",H]]})};
 return `<div class="pgwrap">`+pager("staff",L,mk)+`</div>`}
/* owner 21/11 ~03:20Z mark #34 (verbatim in OD): «khi mà tôi bấm vào cái thông tin của thường tại … ở cái cột bên phải … thì thường nó sẽ để là chủ tin 50.
   Tôi bấm vào thì nó hiện những cái thông tin của người chủ đó». Her chủ is the FIRST row of the stage right column's court box (kit .kcrow, jk3 k3court; the
   portrait status sheet's «Trong cung» too): face · «<phẩm> <tên>» · «Chủ tin N»; tap = her chủ's kit person card (Hậu cung › Chủ tử pager), like Hoàng hậu's row. */
/* rv maid-8tabs (owner 21/11 ~03:20Z mark #34 verbatim: «chủ kín đáo, thật thà, ham vui … Tôi bấm vào thì nó hiện những cái thông tin của người chủ đó»): the removed strip
   printed her chủ's nature (netTxt); her chủ's card keeps it — a cung nữ knows the nature of the one she serves (same as k61Own: her chủ is known) */
(function(){const t0=trKnown;trKnown=function(v){try{if(typeof isSrv==="function"&&isSrv()&&v&&v===srvM())return traitsOf(v).slice()}catch(e){}return t0.apply(this,arguments)}})();
function srvCourtRow(){const m=srvM();if(!m)return null;const t=S.tin|0;return{k:"mis",who:`${rkName(m)} ${shortN(m.name)}`,f:pv(m),mood:[`Chủ tin ${t}`,t<BAL.tinLv.lo?"r":t>=BAL.tinLv.hi?"g":"n"],att:null,ref:m}}
(function(){const k0=kitCourtRows;kitCourtRows=function(){const R=k0.apply(this,arguments);try{if(isSrv()&&!S.dead){const r=srvCourtRow();if(r)R.unshift(r)}}catch(e){console.error("srvCourtRow",e)}return R}})();
(function(){const o0=kitCourtOpen;kitCourtOpen=function(k){if(k!=="mis")return o0.apply(this,arguments);try{if(Q.length&&!/pcm/.test(Q[0].cls||""))return;const m=srvM();const i=typeof rvPgOf==="function"?rvPgOf(m):rivals.indexOf(m);/* strip position (j27) */if(i>=0)PG.rv=i;
 const b=document.querySelector('[data-tab="rv"]');if(b)b.click();else{tab="rv";render()}}catch(e){console.error("kitCourtOpen mis",e)}}})();
function srvStaffAct(k,s){if(!can(1))return null;const m=srvM();
 if(k==="chat"){const o=od(SRVA.chat.o(S));/* odds read before the spend (shown-odds r2) */spend(1);const ok=roll(o);srvAf(s,ok?SRVA.chat.af:SRVA.chat.afL);if(roll(SRVA.chat.know))S.srv.know[s.sid]=1;const sv=(typeof svtPeer==="function"?svtPeer(S,s,"chat",ok):"")/* servant-trust fix r1: a colleague of another house (greeting + her master may come to know) */;log(`Trò chuyện với ${s.name}: ${ok?"thân hơn":"bị lạnh nhạt"}.${sv?" "+sv:""}`);return ok}
 if(k==="gift"){if(S.bac<-SRVA.gift.c.bac)return null;spend(BAL.btn.cnv.k);apply(SRVA.gift.c);srvAf(s,SRVA.gift.af);const sv=(typeof svtPeer==="function"?svtPeer(S,s,"gift",true):"");log(`Biếu ${s.name} chút quà.${sv?" "+sv:""}`);return true}
 if(k==="ask"){if((S.srv.af[s.sid]||0)<SRVA.ask.af)return null;spend(BAL.btn.cnv.k);const L=liveRivals(true).filter(x=>x!==m);const sv=(typeof svtPeer==="function"?svtPeer(S,s,"ask",true):"");if(L.length){const v=pick(L);S.srv.intel.push(v.id);log(`${s.name} kể cho ngươi chuyện trong cung ${v.name}: có tin để bẩm chủ.${sv?" "+sv:""}`)}else log(`${s.name} không biết gì mới.${sv?" "+sv:""}`);return true}
 if(k==="frame"){if(ownerOf(s)!==m||S.srv.lau>0)return null;const o=od(SRVA.frame.o(S));/* odds read before the spend (shown-odds r2) */spend(1);const ok=roll(o);
  /* AG-ALL-2 G10: the framed colleague answers with the maid's own "Bị vu oan" options (cnvFrameOpts), chosen by her needs (jagstf2 stf2Framed) */
  const R=ok&&typeof stf2Framed==="function"?stf2Framed(s,S,m):null;if(R&&!R.stands){srvAf(s,SRVA.frame.af);log(`Ngươi tố ${s.name} lười nhác. ${R.r}`);return R.id==="pay"}
  if(ok){if(!R)s.loyal=cl(s.loyal+SRVA.frame.loy,0,100);s.trouble=wk();srvAf(s,SRVA.frame.af);apply(SRVA.frame.w);let r=`Ngươi tố ${s.name} lười nhác; ${m.name} phạt hắn.${R&&R.r?" "+R.r:""}`;if(roll(SRVA.frame.out)&&m.staff.includes(s)){m.staff.splice(m.staff.indexOf(s),1);r+=` ${s.name} bị đuổi về Nội vụ phủ.`}log(r);return true}
  srvAf(s,SRVA.frame.afL);apply(SRVA.frame.l);log(`Ngươi tố ${s.name} nhưng ${m.name} không tin, còn trách ngươi gây chuyện.`);return false}
 if(k==="poison"){const t=ownerOf(s);if(!stfPoisonOk(S,m,s))return null;const oP=od(SRVA.poison.o(S,m));/* odds read before the spend (shown-odds r2-rv) */spend(SRVA.poison.k);apply(srvCa("poison",S,m));const ok=roll(oP);const r=typeof mlPoisonDo==="function"?mlPoisonDo(m,S,t,s,!ok,1):"";if(r)log(r);return ok}
 return null}
/* AG-ALL-2 G5: Bỏ độc — a maid of a palace hostile to her master (netThK host·hostLo), the poison bought (SRVA.poison.c); the same gate for an NPC staff */
function stfPoisonOk(a,m,x){try{const t=ownerOf(x);const bac=a===S?S.bac:(a.bac||0);return !!(m&&t&&t!==m&&x.role==="maid"&&x!==a&&hostility(m,t)>=netThK(m,"host","hostLo")&&bac>=-srvCa("poison",a,m).bac&&!(a===S&&S.srv.lau>0))}catch(e){return false}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-cnv]");if(!b)return;e.stopPropagation();e.preventDefault();if(b.disabled||!isSrv()||S.dead||Q.length)return;
 const s=servById(+b.dataset.sid);if(!s)return;const bf=rsnap();const r=srvStaffAct(b.dataset.cnv,s);if(r!=null)resultShow(b.firstChild.textContent,bf,r);render()},true);
(function(){const s0=selfCardHTML;selfCardHTML=function(){if(!isSrv())return s0.apply(this,arguments);const m=srvM();
 return pcard({f:pMe(),col:"#b9a48a",name:S.name,rank:srvTitle(),lines:[`${S.age} tuổi · ${S.origin.n}`,`Sắc ${S.sac} · Tài ${S.tai} · Tâm cơ ${S.tamco} · Đức ${S.duc}`,`Sức ${S.suc} · Bạc ${S.bac} · Danh ${S.danh}`,`Chủ tin ${S.tin} · Hoàng thượng để ý ${S.nt}`],note:m?`Chủ: <b>${rkName(m)} ${m.name}</b>, tính ${netTxt(m)}.`:"",groups:[["Đường đi",srvRows()]].concat(typeof kcuHonorRows==="function"&&kcuHonorRows(1).length?[["Danh hiệu thi tài",kcuHonorRows(5)]]:[]),empty:""})}})();
/* the Chọn sổ rows say who the sổ is through j74 slotWho (one place, srv lives included); the old #slots .slot text patch is gone with the old rows */
(function(){const st=document.createElement("style");st.textContent=`.mspot .srvtag{font-style:normal}`;document.head.appendChild(st)})();
(function(){const h0=hudTween;hudTween=function(){if(!isSrv())return h0.apply(this,arguments);const s=S.sung;S.sung=S.tin;try{return h0.apply(this,arguments)}finally{S.sung=s}}})();

/* ================= CUNG NỮ II: the palace men (j22), forbidden love and marriage roads for a maid =================
   Same men, same bars (m.af thiện cảm, m.tinh tình ý, m.letters tang vật, m.trysts) and the same ladder as a consort:
   glances -> tokens / letters -> secret meetings (fade to black). Adults only (she and he 18+), man and woman only.
   The risk differs: a maid belongs to the court, so a found-out romance means beating, Tân Giả khố or expulsion;
   death only when it touches a consort's scheme or a pregnancy. The man is punished too. NPC maids live by the same rules. */
function srvMen(){try{menInit()}catch(e){}return (S.men||[]).filter(m=>m.alive&&(m.age||0)>=BAL.ageMin)}
function srvAdult(m){return (S.age||0)>=BAL.ageMin&&!!m&&(m.age||0)>=BAL.ageMin}
function srvRiskOf(k,eyes,fr,tc){const T=BAL.srvRisk;const base=T[k]!=null&&k!=="def"?T[k]:T.def;return cl(Math.round(base+eyes-fr*T.fr-(tc||0)/T.tc),T.min,T.max)}
function srvMpNeed(rk){const N=BAL.srvMpN;return N[Math.max(0,Math.min(N.length-1,rk|0))]}
function srvRisk(k){const eN=liveRivals(true).reduce((s,v)=>s+eyes(v),0);return srvRiskOf(k,eN,srvFriendList().length,S.tamco)}
function srvBond(){const L=srvMen().filter(m=>m.tinh>=BAL.tinhLv.close&&m.rw!=="vương gia").sort((a,b)=>(b.tinh+(S.srv.vow===b.id?50:0))-(a.tinh+(S.srv.vow===a.id?50:0)));return L[0]||null}
function srvSeen(m,n){S.srv.rumor=(S.srv.rumor||0)+n;const mi=srvM(),W=npcWit(S.place,null,{not:[mi,S],vs:S}).map(x=>x.p).filter(v=>rivals.includes(v));const lv=npwPick(W,x=>hostility(x,S)+(mi?hostility(x,mi):0)-BAL.ag.why.srv.leakMin);if(lv&&roll(BAL.odb.j42.rlSrvSeen)){S.srv.leak=lv.id}/* npc-purpose G2a: only one who was really there, with a grudge to use it, holds it over her */log(`Có người thấy ngươi với ${m.name}. Lời ra tiếng vào.`)}
function srvAffairCaught(m,how){if(!isSrv())return;const mis=srvM();const scheme=m&&rivals.some(v=>v.alive&&v.affair===m.id);
 const pre=`${how} Cung nữ thuộc về cung cấm: tư tình là tội.`;
 if(m){if(m.rw==="vương gia"){m.tinh=Math.max(0,m.tinh-20);log(`${m.name} là vương gia, chỉ bị Hoàng thượng quở trách.`)}else if(roll(BAL.odb.j42.rlSrvAffairCaught)){m.alive=false;dieMk(m,"crime");log(`<span class="r">${m.name} bị cách chức, đày ra biên ải.</span>`)}else{m.tinh=Math.max(0,m.tinh-25);m.loyal=Math.max(0,(m.loyal||50)-BAL.eff.j42.loyalSrvAffairCaught);log(`<span class="r">${m.name} bị đánh bốn mươi trượng.</span>`)}}
 S.srv.lover=null;S.srv.vow=null;S.srv.rumor=0;S.srv.leak=null;if(mis)S.tin=Math.max(0,S.tin-BAL.eff.j42.tinSrvAffairCaught);
 if(S.srv.preg){S.srv.preg=0;if(roll(BAL.odb.j42.rlSrvAffairCaught_2)){die(`${pre} Bụng mang dạ chửa, ngươi bị đánh chết ở Thận Hình ti`);return}over("Bị đuổi khỏi cung",`${pre} Mang thai hoang, ngươi bị đánh đòn rồi đuổi ra khỏi cửa Thần Vũ, không một đồng.`,"Bị đuổi khỏi cung vì mang thai",true);return}
 if(scheme&&roll(BAL.odb.j42.rlSrvAffairCaught_3)){die(`${pre} Chuyện dính vào mưu của phi tần, ngươi bị diệt khẩu`);return}
 const r=Math.random();if(r<.25){over("Bị đuổi khỏi cung",`${pre} Ngươi bị tước tên khỏi sổ cung nữ, đuổi về quê.`,"Bị đuổi khỏi cung vì tư tình",true);return}
 const d=20+R(10);apply({suc:-d});if(S.suc<=0&&!(typeof kietSave==="function"&&kietSave())){die(`${pre} Ngươi chết dưới đòn roi`);return}srvLaundry(`${pre} Ngươi bị đánh ${d>25?"ba mươi":"hai mươi"} roi.`,r<.6?8:12)}
/* the men stand where j22 put them; a maid meets them on her own roads */
(function(){const v0=srvVisitOf;srvVisitOf=function(k){const V=v0.apply(this,arguments);try{if(k!=="tgk"&&k!=="home"){const W=S.menW||{};for(const m of srvMen())if(W[m.id]===k){V.people.push({kind:"srv",sk:"man",ref:m,mid:m.id,name:m.name.split(" ").slice(-2).join(" "),ini:m.name.split(" ").pop()[0],col:"#6a8aa0",info:`${m.role} · ${netTxt(m)} · ${tinhW(m.tinh)}`});m.seen=bkey()}
  const here=liveRivals(true).filter(v=>srvWhere(v)===k&&v.affair&&W[v.affair]===k);for(const v of here){S.srv.knowAff=S.srv.knowAff||[];if(!S.srv.knowAff.includes(v.id)&&roll(BAL.odb.j42.rlTop)){S.srv.knowAff.push(v.id);log(`Ngươi bắt gặp ${v.name} lén trao đổi ánh mắt với ${manById(v.affair).name}.`)}}
  if(V.people.length&&/Không gặp ai/.test(V.msg||""))V.msg=`Ở đây có ${V.people.length} người.`}}catch(e){console.error(e)}return V}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="srv"&&p.sk==="man"){const m=manById(p.mid);return m?pMan(m):{src:"",ini:p.ini,col:p.col}}return f0(p)}})();
(function(){const t0=srvTalk;srvTalk=function(p){const A=t0.apply(this,arguments);try{const mis=srvM();
 const T=(n,o,x,run,more)=>A.push(Object.assign({n,o,w:{},l:{},x,run(){const ok=o>=100||roll(o);const r=run(ok)||"";return `${o<100?(ok?'<span class="g">thành</span>. ':'<span class="r">hỏng</span>. '):""}${r}`}},more||{}));
 if(p.sk==="man"){const m=manById(p.mid);if(!m||!srvAdult(m))return A;const risk=srvRisk(S.place);
  T("Chào hỏi đúng lễ",100,`hắn ${pvQuy(m,SRVA.hail.af,"quý ngươi")}`,()=>{relAdd(S,m,SRVA.hail.af);return `${m.name} gật đầu đáp lễ.`});
  T("Liếc mắt đưa tình",od(SRVA.flirt.o(S)),`tình ý của hắn +${SRVA.flirt.tinh} · có thể bị người thấy: ${chanceW(Math.round(risk/SRVA.flirt.seen))}`,ok=>{if(ok)m.tinh+=SRVA.flirt.tinh+(nv(m,"flirtTinh"));if(roll(risk/SRVA.flirt.seen))srvSeen(m,1);return ok?`${m.name} khẽ cười.`:"Hắn không để ý."});
  if(m.tinh>=SRVA.token.at)T("Trao khăn tay, thư",od(SRVA.token.o(S)),`tình ý +${SRVA.token.tinh} · khăn thư là tang vật nếu bị lục`,ok=>{if(ok){m.tinh+=SRVA.token.tinh;m.letters++}if(roll(risk/SRVA.token.seen))srvSeen(m,1);return ok?"Hắn giấu vội vào tay áo.":"Hắn chần chừ không nhận."});
  if(m.tinh>=SRVA.tryst.at){const fr=srvFriendList();T("Hẹn gặp riêng",fr.length?oddsCl(SRVA.tryst.o(S,m,{risk})):0,`cần bạn canh cửa · đêm kín đáo: Sức +${SRVA.tryst.w.suc}, tình ý +${SRVA.tryst.tinh} · có thai: ${chanceW(SRVA.tryst.preg)} · hỏng: bị bắt, roi vọt, Tân Giả khố hoặc bị đuổi, có thai hay dính mưu phi tần thì có khi mất mạng`,ok=>{if(!ok){srvAffairCaught(m,`Đêm ngươi hẹn ${m.name} bị bắt gặp.`);return "Bị bắt gặp."}
    m.trysts++;m.tinh+=SRVA.tryst.tinh;apply(SRVA.tryst.w);S.srv.lover=m.id;let r=`Đêm ấy rèm buông, đèn tắt; ${fr[0].name} canh ngoài hiên. Trời chưa sáng ngươi đã lẻn về.`;if(!S.srv.preg&&roll(SRVA.tryst.preg)){S.srv.preg=1;S.srv.pregM=0;r+=` <b class="r">Mấy hôm sau ngươi biết mình có thai.</b>`}return r},{lock:!fr.length,t:`cần một người bạn (quý ngươi từ ${BAL.srvx.friendAf}) canh cửa`,act:1});
   if(m.rw!=="vương gia"&&S.srv.vow!==m.id)T("Hẹn ước trăm năm",od(SRVA.vow.o(S,null,{tinh:m.tinh})),"hắn hứa chờ ngươi xuất cung · mở đường thành thân",ok=>{if(ok){S.srv.vow=m.id;return `${m.name} thề sẽ chờ ngươi.`}return "Hắn ngập ngừng, chưa dám hứa."})}
  if(m.tinh>=SRVA.cut.at)T("Cắt đứt",100,"hắn thôi tơ tưởng; bớt hẳn rủi ro",()=>{m.tinh=0;if(S.srv.lover===m.id)S.srv.lover=null;if(S.srv.vow===m.id)S.srv.vow=null;return "Ngươi trả lại khăn tay."})}
 if((p.sk==="rv"||p.sk==="hh")&&p.ref){const v=RV(p.ref.id);if(v&&v!==mis&&(S.srv.knowAff||[]).includes(v.id)&&v.affair){const lm=manById(v.affair);
  {const O=cnvAffOpts(S,v,mis);for(const op of O)if(op.id!=="quiet")T(op.n,op.o==null?100:op.o,op.x,ok=>cnvGo(S,op,ok),op.id==="threat"?{act:1}:{})}}}}catch(e){console.error(e)}return A}})();
/* the week: talk spreads, rivals use it; a token may be found */
(function(){const w0=srvWeek;srvWeek=function(){w0.apply(this,arguments);try{if(!isSrv()||S.dead||Q.length)return;const mis=srvM();const lover=S.srv.lover&&manById(S.srv.lover);
 const hot=srvMen().filter(m=>m.tinh>=BAL.tinhLv.warm);if(!hot.length&&!S.srv.rumor)return;
 if(S.srv.leak){const v=RV(S.srv.leak);if(v&&v.alive&&v!==mis&&npcWhy("srvBlack",{v,mis},()=>roll(BAL.odb.j42.rlSrvBlack))){/* npc-purpose G2a: she uses it when she wants an eye in that palace or hates the maid */pushDil(mkP("cnvBlack",{r:v.id}),"Bị nắm thóp");return}}
 const m=lover||hot[0];if(m&&mis&&npcWhy("srvSearch",{mis},()=>roll(BAL.odb.j42.rbTop+(S.srv.rumor||0)*1.5+(nv(mis,"affairRumor"))+m.letters*.5))){srvAffairCaught(m,`${mis?mis.name:"Quản sự"} lục rương, thấy khăn thư của ${m.name}.`)}}catch(e){console.error(e)}}})();
/* the month: the pregnancy clock, grants, a prince's ask, NPC maids, consorts' own affairs */
(function(){const m0=srvMonth;srvMonth=function(){let ev=m0.apply(this,arguments);try{
 ev+=srvW(()=>{try{return affairMonth()||""}catch(e){return""}})||"";
 ev+=maidLoveMonth();
 if(!isSrv()||S.dead)return ev;S.srv.rumor=Math.max(0,(S.srv.rumor||0)-1);
 if(S.srv.preg){S.srv.pregM=(S.srv.pregM||0)+1;if(S.srv.pregM>=3){const m=manById(S.srv.lover)||srvBond();srvAffairCaught(m,"Bụng ngươi lộ rõ, cung nhân xì xào.");return ev}}
 if(S.age<BAL.ageMin||S.srv.lau>0||Q.length)return ev;const mis=srvM();
 const pr=srvMen().find(m=>m.rw==="vương gia"&&m.tinh>=BAL.tinhLv.prince);if(pr&&npcWhy("srvPrince",{pr},()=>roll(BAL.odb.j42.rlSrvPrince))){pushDil(mkP("cnvPrince",{m:pr.id}),"Vương gia xin người");return ev}
 const thF=S.srv.thf||0;const G=BAL.srvGrant;const GW=BAL.ag.why.srv.grant;const by=S.srv.rk>=1?npwPick(["th","mis"],k=>k==="th"?(thF>=3&&!S.thDead?thF*GW.th:0):(S.tin>=G.tin?S.tin*GW.mis:0)):null;/* npc-purpose G2a: the one who grants: the Thái hậu she served on errands, or a mistress who trusts her */
 if(by&&roll(G.base+(srvBond()?G.bond:0)+thF)){const b=srvBond();pushDil(mkP("cnvGrant",{by,m:b&&npwPick(["b","w"],k=>k==="b"?b.tinh:GW.wed)==="b"?b.id:null,w:R(WEDW.length)}),"Ban hôn")}}catch(e){console.error(e)}return ev}})();
/* Đức Thọ cung errands earn the Thái hậu's eye (a grant may come from her) */
(function(){const e0=srvErrandDone;srvErrandDone=function(){const sn=S.srv.sent;const r=e0.apply(this,arguments);if(sn&&sn.k==="tn"&&!S.thDead)S.srv.thf=(S.srv.thf||0)+1;return r}})();
/* NPC maids: the same road (love a palace man, caught or married off) */
function maidLoveMonth(){let ev="";if((typeof asOn==="function"&&asOn()))return"";/* AG-ALL B: love acts + grant are her choices (jagstaff) */try{const M=srvMen();if(!M.length)return"";const L=allServ().filter(s=>s.role==="maid"&&(s.age||20)>=BAL.ageMin&&!(typeof asSelfOn==="function"&&asSelfOn(ownerOf(s))));/* coop-guest-agent r2: a co-op guest's own maids love / are granted by their agent acts + month (jagstaff), never also by these dice */
 if(L.length&&roll(BAL.odb.j42.rlMaidLoveMonth)){const s=pick(L.filter(x=>!x.manLove));if(s){const m=pick(M.filter(x=>x.rw!=="vương gia"));if(m)s.manLove=m.id}}
 for(const s of L.filter(x=>x.manLove)){const m=manById(s.manLove);const o=ownerOf(s);if(!m||!o){s.manLove=null;continue}
  const mine=isSrv()&&(o===srvM()||(S.srv.af[s.sid]||0)>=30);
  if(roll(BAL.odb.j42.rlMaidLoveMonth_2)){o.staff.splice(o.staff.indexOf(s),1);const t=roll(BAL.odb.j42.rlT)?`bị đuổi khỏi cung`:`bị đày xuống Tân Giả khố`;if(m.rw!=="vương gia"&&roll(BAL.odb.j42.rlMaidLoveMonth_3)){m.alive=false;dieMk(m,"crime")}const line=`${s.name}, cung nữ của ${NM(o)}, tư tình với ${m.name} bị lộ: ${t}${m.alive?"":"; hắn bị đày ra biên ải"}. `;log(line);if(mine)ev+=line;continue}
  if(roll(BAL.odb.j42.rlMaidLoveMonth_4)){o.staff.splice(o.staff.indexOf(s),1);const line=`${s.name}, cung nữ của ${NM(o)}, được chủ ban gả cho ${m.name}. `;log(line);if(mine)ev+=line}}}catch(e){console.error(e)}return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(!S.dead&&!isSrv())maidLoveMonth()}catch(e){}return ev}})();
/* the choice cards */
PEND.cnvBlack=pp=>{const v=RV(pp.r),mis=srvM();if(!isSrv()||!v||!v.alive)return null;
 return{t:`<p>Thái giám của ${v.name} chặn ngươi sau hòn non bộ: “Chuyện ngươi với nam nhân bên ngoài, chủ tử nhà ta biết cả. Muốn giữ mạng thì nghe lời.”</p>`,who:pv(v),o:cnvPend(S,cnvBlackOpts(S,v,mis))}};
PEND.cnvGrant=pp=>{if(!isSrv()||(S.age||0)<BAL.ageMin)return null;const m=pp.m&&manById(pp.m);const w=m?m.name:WEDW[pp.w||0];const by=pp.by==="th"&&!S.thDead?"Thái hậu":(srvM()?srvM().name:"Chủ nhân");
 return{t:`<p>${by} khen ngươi hầu hạ chu đáo, muốn ban gả ngươi cho <b>${w}</b>${m?`, người ngươi ${tinhW(m.tinh).replace("ngươi","")}`:""}.</p>`,who:pp.by==="th"?pTH():(srvM()?pv(srvM()):pMe()),o:[
  {n:"Tạ ơn, xuất giá",fx:{},x:"kết thúc kiếp này: được ban hôn",go:()=>over("Được ban hôn",`${by} ban gả ${S.name} cho ${w}. Ngươi rời cung có của hồi môn${m?", về với người mình thương":""}.`,`Được ${by} ban hôn cho ${w}`,true)},
  {n:"Xin ở lại",fx:{tin:pp.by==="th"?0:BAL.eff.j42.tinGrantStay},x:"từ chối khéo, ở lại hầu chủ"}]}};
PEND.cnvPrince=pp=>{const m=manById(pp.m);if(!isSrv()||!m||!srvAdult(m))return null;
 return{t:`<p>${m.name} dâng sớ xin Hoàng thượng ban cung nữ ${S.name} về phủ làm thiếp.</p>`,who:pMan(m),o:[
  {n:"Theo về vương phủ",fx:{},x:"kết thúc kiếp này: làm thiếp vương gia",go:()=>over("Vào vương phủ",`${S.name} được ban về phủ ${m.name} làm thiếp. Từ phòng cung nữ, ngươi bước vào một hậu viện khác.`,`Làm thiếp của ${m.name}`,true)},
  {n:"Xin ở lại hầu chủ",fx:{tin:BAL.eff.j42.tinPrinceStay},x:`vương gia phật ý: tình ý ${balSg(BAL.eff.j42.tinhPrinceStay)}`,go:()=>{m.tinh=Math.max(0,m.tinh+BAL.eff.j42.tinhPrinceStay)}}]}};
/* release age: marry the man she is bound to */
(function(){const a0=PEND.cnvAge;PEND.cnvAge=pp=>{const d=a0(pp);try{const b=srvBond();if(d&&b)d.o.unshift({n:`Xuất cung thành thân với ${b.name}`,fx:{},x:`kết thúc kiếp này · ${b.name} ${tinhW(b.tinh)}`,go:()=>over("Thành thân",`${S.name} ${S.age} tuổi, rời cung theo lệ. Ngoài cửa Thần Vũ, ${b.name} đã đứng chờ. Hai người thành thân, sống nốt đời bên nhau.`,`Xuất cung thành thân với ${b.name}`)})}catch(e){}return d}})();
(function(){const o0=over;over=function(h,t,fate,alive){if(isSrv()&&h==="Xuất cung"&&/30 tuổi/.test(t)){const b=srvBond();if(b){h="Thành thân";t+=` ${b.name} chờ ngươi ngoài cửa cung; hai người thành thân.`;fate=`Xuất cung thành thân với ${b.name}`}}return o0.call(this,h,t,fate,alive)}})();
/* her road page shows her bonds */
(function(){const r0=srvRows;srvRows=function(){const L=r0.apply(this,arguments);try{const row=(a,b)=>[a,b,"t"];/* KIT §51: kit table rows (pcard group → kitRows) */const H=srvMen().filter(m=>m.tinh>=BAL.tinhLv.known||aff(m,S)>=netTh(m,"quen"));/* j9 one relation model */
 L.push(row("Nam nhân",H.length?H.map(m=>`${m.role} ${m.name.split(" ").slice(-2).join(" ")}: ${tinhW(m.tinh)}${S.srv.vow===m.id?" · đã hẹn ước":""}${S.srv.lover===m.id?" · tư tình":""}`).join("; "):"chưa quen ai (gặp ở vườn, điện, Thái y viện)"));
 if(S.srv.rumor||S.srv.leak)L.push(row("Lời đồn",`${S.srv.rumor||0}${S.srv.leak&&RV(S.srv.leak)?" · "+RV(S.srv.leak).name+" biết chuyện":""}`));
 if(S.srv.preg)L.push(row("Mang thai",`tháng ${S.srv.preg?S.srv.pregM+1:0}/3 · tháng thứ 3 thì lộ: bị đánh chết: ${chanceW(BAL.odb.j42.rlSrvAffairCaught_2)}, không thì bị đuổi khỏi cung`));
 if((S.srv.knowAff||[]).length)L.push(row("Biết tư tình của",kitNameList(S.srv.knowAff.map(RV).filter(Boolean))))}catch(e){}return L}})();
/* a pregnancy she cannot show: the same hard road, priced */
(function(){const c0=srvCards;srvCards=function(){const X=c0.apply(this,arguments);try{if(isSrv()&&S.srv.preg&&!srvOnce("abort"))X.unshift({n:"Uống thuốc phá thai",t:"Mua thuốc của tiểu thái giám, uống lén trong đêm.",k:1,c:{bac:-20},o:od(BAL.odb.j42.odO_4),w:{},l:{suc:BAL.eff.j42.sucL},x:`hết thai, Sức ${balSg(BAL.eff.j42.sucGo_4)} · hỏng: băng huyết — có thể băng huyết mà chết: ${chanceW(BAL.rk.abortDieSrv)}`,once:"abort",dom:"",go:()=>{S.srv.preg=0;apply({suc:BAL.eff.j42.sucGo_4})},fail:()=>{S.srv.preg=0;if(roll(BAL.rk.abortDieSrv))die("Uống thuốc phá thai, băng huyết mà chết")}})}catch(e){}return X}})();
/* a friend's tip may be a consort's affair */
(function(){const f0=srvFriendTip;srvFriendTip=function(){const F=srvFriendList(),mi=srvM();const v=npwPick(liveRivals(true).filter(x=>x.affair&&x!==mi&&!(S.srv.knowAff||[]).includes(x.id)&&F.some(s=>ownerOf(s)===x)),x=>1+Math.max(0,mi?hostility(mi,x):0));const fr=v&&npwPick(F.filter(s=>ownerOf(s)===v),s=>1+(S.srv.af[s.sid]||0));/* npc-purpose G2a: only a friend who serves that consort really knows */if(fr&&roll(BAL.odb.j42.rlTop_2)){S.srv.knowAff=(S.srv.knowAff||[]).concat([v.id]);log(`${fr.name} (thân với ngươi, hầu cung ${v.name}) thì thầm: ${v.name} lén gặp ${manById(v.affair)?manById(v.affair).name:"một nam nhân"}.`);return}return f0.apply(this,arguments)}})();
