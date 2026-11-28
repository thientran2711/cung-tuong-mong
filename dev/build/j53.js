/* ================= j53 TÀI HỌC HOÀNG TỰ: Văn · Võ · Đức theo mẹ và cha, Thượng thư phòng, thầy dạy, khảo hạch; lập hiền (cùng một luật cho mọi người mẹ) ================= */
/* tv Văn, tw Võ, td Đức (số thực, hiện làm tròn); tal = trung bình (giữ cho mã cũ); _t = tal lần đồng bộ trước */
const KT={v:[.15,.3,.5,.75],d:[.1,.18,.27,.38],wm:[.25,.8],wf:[0,.7],fee:[0,4,12,25],feeFav:8,feeVo:10,cap:125,nat:.05,cool:2,exc:8,poor:-10,prep:8,prepC:15,favO:35};
const TUT=["Học chung","Thầy đồ","Hàn lâm biên tu","Đại học sĩ"];
const TUTD=["lớp chung của Thượng thư phòng","thầy đồ","một Hàn lâm biên tu","Đại học sĩ, bậc danh sư trong triều,"];
/* nết học: ẩn, mỗi nết có mặt lợi và mặt hại; lộ ra khi thầy tâu, khi khảo hạch hay khi mẹ tự dạy */
const DIL={"Chuyên cần":{v:1.3,d:1.15,w:.8,m:1,n:0,up:"học chữ, học lễ đều nhanh",dn:"ít ra sân tập, Võ chậm"},
 "Sáng dạ":{v:1.25,d:.75,w:1,m:1,n:0,up:"học chữ rất nhanh",dn:"hay khinh người, Đức chậm"},
 "Ham chơi":{v:.7,d:.8,w:1.25,m:.8,n:0,up:"lanh lợi, giỏi cưỡi ngựa, Hoàng thượng thấy đáng yêu",dn:"lười sách vở, Văn và Đức chậm"},
 "Hiền hậu":{v:1,d:1.3,w:.7,m:1.1,n:-5,up:"lễ độ, Đức nhanh",dn:"nhút nhát, Võ chậm, thi bắn cung run tay"},
 "Hiếu động":{v:.8,d:1,w:1.3,m:.9,n:3,up:"khỏe, Võ nhanh",dn:"ngồi không yên, Văn chậm"},
 "Bướng bỉnh":{v:1,d:.9,w:1,m:.5,n:5,up:"gan dạ, đi thi không sợ",dn:"không nghe mẹ dạy (mẹ dạy chỉ được nửa)"}};
const DILK=Object.keys(DIL);
const KTKID=["ksab","kpoison","pond","kframe"];
/* ---- TƯ CHẤT (owner 11/15): trẻ sinh ra chỉ có tư chất (bẩm sinh, từ cha mẹ + may rủi, ẩn, không đổi); Văn · Võ · Đức bắt đầu gần 0 và lớn
   dần mỗi tháng nhờ dạy dỗ (thầy, mẹ dạy, Tài/Đức của mẹ, Hoàng thượng để mắt), nhân theo tư chất; Hiền tài suy ra từ ba tài, chỉ hiện từ 6 tuổi.
   Tư chất chỉ lộ ra thành một chữ phỏng chừng khi có người nhìn (nhũ mẫu, thầy dạy; con người khác: lời đồn), con mình đọc sát hơn. Cùng một luật cho mọi người mẹ. */
Object.assign(BAL,{tc:{base:12,mom:.35,emp:.35,rnd:20,min:5,max:95,
 mul:[.45,1.55],     /* hệ số học nhanh ở tư chất 0 / 100 */
 born:2,              /* Văn, Võ, Đức lúc lọt lòng: 0..born */
 nat:[.12,.3,.1],     /* tự lớn mỗi tháng: 0–2 tuổi, 3–5 tuổi, từ 6 tuổi */
 momP:.12,            /* mẹ ở bên (Tài → Văn, Đức → Đức) mỗi tháng khi mẹ 100, từ 1 tuổi */
 empP:.06,empW:.5,    /* Hoàng thượng để mắt (thương 100) mỗi tháng; Võ nhận nửa */
 cam:.5,              /* mẹ giỏi đàn (Cầm 4+): Văn thêm mỗi tháng từ 3 tuổi */
 simTeach:.35,        /* phần mẹ dạy trung bình mỗi mùa (để quy đổi con cũ) */
 hienAge:6,barAge:3,nurseAge:1,rumAge:6,
 nzNurse:12,nzOwn:7,nzOther:15,  /* độ lệch khi đoán tư chất: nhũ mẫu, thầy dạy / mẹ, lời đồn */
 w:[30,45,60,75],     /* tư chất → chữ: chậm hiểu · tầm thường · khá · thông tuệ · hơn người */
 fw:[30,55,75],       /* lòng thương của Hoàng thượng → lời cả cung thấy (con người khác) */
 hw:[-12,-4,5,14],    /* Hiền tài so với mức thường của tuổi → chữ (con người khác, lời đồn) */
 exp:[25,5,70],       /* mức thường của tuổi (khảo hạch): min(exp[2], exp[0] + exp[1]·(tuổi − 6)) */
 old:[15,.75,10]}});  /* con cũ: tư chất = old[0] + old[1]·Tài cũ ± old[2] */
const TCW=["chậm hiểu","tầm thường","khá","thông tuệ","hơn người"];
const HTW=["kém chúng bạn","dưới chúng bạn","ngang chúng bạn","hơn chúng bạn","vượt chúng bạn"];
function tcMul(k){const T=BAL.tc;return T.mul[0]+(T.mul[1]-T.mul[0])*cl(k.tc==null?50:k.tc,0,100)/100}
function tcNz(n){return R(2*n+1)-n}
function tcLad(v,th,W){let i=0;while(i<th.length&&v>th[i])i++;return W[i]}
function tcWord(v){return tcLad(v,BAL.tc.w,TCW)}
function tcSeeOwn(k,by,nz){if(k.tc==null)return null;k.tcO={v:cl(k.tc+tcNz(nz),0,100),by};return k.tcO}
/* what she can say about a child's tư chất: {w, by} or null (never the number) */
function tcSeen(k,mine){const T=BAL.tc;if(!k||k.tc==null)return null;if(mine)return k.tcO?{w:tcWord(k.tcO.v),by:k.tcO.by}:null;
 if(k.age<T.rumAge)return null;if(k.tcR==null)k.tcR=cl(k.tc+tcNz(T.nzOther),0,100);return{w:tcWord(k.tcR),by:"lời đồn"}}
function hienShown(k){return !!k&&k.age>=BAL.tc.hienAge}
function hienWord(k){if(!hienShown(k))return null;if(k.hn==null)k.hn=tcNz(Math.round(BAL.tc.nzOther/2));return tcLad(ktHien(k)+k.hn-ktExp(k.age),BAL.tc.hw,HTW)}
/* the mother of a new child: her Tài, Đức, Tâm cơ and arts; the Emperor's hidden fixed gifts; luck */
function tcBorn(p){const T=BAL.tc,a=(p&&p.arts)||{},E=ktEmp();const mom=cl(.4*(p.tai||40)+.3*(p.duc||40)+.3*(p.tamco||30)+(a.thi||0)+(a.ky||0)+(a.cam||0)+(a.vu||0),0,100);
 return cl(Math.round(T.base+T.mom*mom+T.emp*(E.v+E.w+E.d)/3+tcNz(T.rnd)),T.min,T.max)}
/* one month of growth (every child, every mother); o = {h health, nf teacher paid, live mother at hand, sim expected lessons} */
function tcGrowCore(k,p,o){const T=BAL.tc,m=tcMul(k),h=o.h,a=k.age||0,band=a<3?0:a<6?1:2;
 ["tv","tw","td"].forEach(f=>ktUp(k,f,T.nat[band]*h*m));
 if(a>=1&&o.live&&p){ktUp(k,"tv",T.momP*cl(p.tai||0,0,100)/100*h*m);ktUp(k,"td",T.momP*cl(p.duc||0,0,100)/100*h*m)}
 if(a>=1){const e=T.empP*cl(k.fond||0,0,100)/100*h*m;ktUp(k,"tv",e);ktUp(k,"td",e);ktUp(k,"tw",e*T.empW)}
 const R0=ktRates(k);ktUp(k,"tv",R0.v*h*o.nf*m);ktUp(k,"td",R0.d*h*o.nf*m);ktUp(k,"tw",R0.w*h*o.nf*m);
 if(o.live&&p&&a>=3&&(p.arts||{}).cam>=4)ktUp(k,"tv",T.cam*h*m);
 if(o.sim&&a>=3&&p){ktUp(k,"tv",o.sim/3*ktTeachG(k,p,"tv"));ktUp(k,"td",o.sim/3*ktTeachG(k,p,"td"))}}
/* stats a child of this age and tư chất would have (old saves, children already alive when a life starts); shape = old Văn/Võ/Đức leanings */
function tcAgeFill(k,shape){const T=BAL.tc,mom={tai:45,duc:50,arts:{}};const x={tc:k.tc,age:0,fond:k.fond||40,sex:k.sex,tut:0,vt:0,dil:k.dil,tv:T.born/2,tw:T.born/2,td:T.born/2};
 const n=Math.max(0,(k.age||0)*12);for(let i=0;i<n;i++){x.age=Math.floor(i/12);if(x.age>=6){x.tut=k.tut||0;x.vt=k.vt||0}tcGrowCore(x,mom,{h:1,nf:1,live:true,sim:T.simTeach})}
 const sh=shape||{tv:1,tw:1,td:1};["tv","tw","td"].forEach(f=>{k[f]=cl(x[f]*cl(sh[f]||1,.6,1.4),0,100)})}
function ktMom(k){const e=allKids().find(([x])=>x===k);return e?(e[1]||S):null}
function ktLive(p){return p===S?!S.dead&&!S.out:!!(p&&p.alive&&!p.out)}
function ktEmp(){const E=S.emp;if(!E.tp)E.tp={v:35+R(41),w:35+R(41),d:30+R(41)};return E.tp}
function ktTal(k){k.tal=Math.round((k.tv+k.tw+k.td)/3);k._t=k.tal}
/* con cũ (bản lưu cũ, con có sẵn lúc vào cung): chia Tài cũ làm ba, lệch chút ít */
function ktInit(k){if(k.tcv===1&&k.tv!=null)return;const T=BAL.tc;k.dil=k.dil||pick(DILK);k.tut=k.tut||0;k.vt=k.vt||0;
 /* old save (Văn/Võ/Đức were the inborn numbers) or a child made without a birth: the old talent becomes tư chất, the stats restart at what that age would have */
 let shape=null,base=k.tal==null?45:k.tal;if(k.tv!=null){const av=Math.max(1,(k.tv+k.tw+k.td)/3);base=av;shape={tv:k.tv/av,tw:k.tw/av,td:k.td/av}}
 if(k.tc==null)k.tc=cl(Math.round(T.old[0]+T.old[1]*base+tcNz(T.old[2])),T.min,T.max);
 tcAgeFill(k,shape);k.tcv=1;ktTal(k)}
/* mã cũ cộng/trừ thẳng vào tal (biến cố, mưu phá việc học): chia đều phần chênh cho ba tài */
function ktSync(k){if(!k)return;ktInit(k);if(k.tal!==k._t){const d=k.tal-k._t;k.tv=cl(k.tv+d,0,100);k.tw=cl(k.tw+d,0,100);k.td=cl(k.td+d,0,100)}ktTal(k)}
function ktSyncAll(){if(S)allKids().forEach(([k])=>ktSync(k))}
function ktR(x){return Math.round(x)}
function ktHien(k){ktSync(k);return Math.round(.4*k.tv+.4*k.td+.2*k.tw)}
/* thiên tư lúc sinh: mẹ (Tài, Tâm cơ, Đức, tài nghệ) + Hoàng thượng (tư chất ẩn, cố định) + may rủi; một công thức cho mọi người mẹ */
function ktBorn(k,p){const T=BAL.tc;k.tc=tcBorn(p);k.tv=R(T.born+1);k.tw=R(T.born+1);k.td=R(T.born+1);k.dil=pick(DILK);k.tut=0;k.vt=0;k.born53=1;k.tcv=1;k.tcO=null;k.tcR=null;k.hn=null;ktTal(k)}
(function(){const m0=mkKid;mkKid=function(){const k=m0.apply(this,arguments);try{ktInit(k)}catch(e){}return k}})();
(function(){const b0=birthP;birthP=function(p){const n0=(p.kids||[]).length;const r=b0.apply(this,arguments);try{(p.kids||[]).slice(n0).forEach(k=>ktBorn(k,p))}catch(e){}return r}})();
/* ---- học: thầy, nết, sức khỏe, mẹ còn hay mất ---- */
function ktD(k){return DIL[k.dil]||DIL["Chuyên cần"]}
function ktHp(k){return k.hp>=60?1:k.hp>=35?.5:.15}
function ktUp(k,f,r){k[f]=cl(k[f]+r*Math.max(0,1-k[f]/KT.cap),0,100)}
function ktRates(k,noDil){const D=noDil?{v:1,d:1,w:1}:ktD(k),t=k.tut||0;
 return{v:k.age>=6?KT.v[t]*D.v:0,d:k.age>=6?KT.d[t]*D.d:0,w:k.age>=6?(k.sex==="m"?KT.wm:KT.wf)[k.vt?1:0]*D.w:0}}
/* ước mỗi năm ở mức hiện tại (không tính nết ẩn): con số "khoảng" trên nút */
function ktYear(k,f,rate){return Math.max(0,Math.round(12*rate*Math.max(0,1-k[f]/KT.cap)))}
function ktFee(k){if(!k.alive||k.age<6)return 0;return (k.tut===3&&k.fav?KT.feeFav:KT.fee[k.tut||0])+(k.vt?KT.feeVo:0)}
function ktGrow(k,p){if(!k.alive)return;ktSync(k);const live=ktLive(p);tcGrowCore(k,p,{h:ktHp(k),nf:live?1:.7,live});
 if(k.dil==="Ham chơi"&&k.age>=3&&S.turn%3===0)k.fond=cl(k.fond+BAL.eff.j53.fondKtGrow,0,100);ktTal(k)}
/* mẹ tự dạy: dạy chữ theo Tài của mẹ, dạy lễ nghi theo Đức của mẹ; mỗi thứ một lần mỗi tháng */
function ktSea(){return Math.floor((S.turn||0)/3)}/* mỗi mùa (3 tháng) mẹ dạy mỗi thứ một lần */
function ktTeachG(k,p,f){const st=f==="tv"?(p.tai||0):(p.duc||0);return Math.round((.8+cl(st,0,100)/60)*Math.max(0,1-k[f]/KT.cap)*ktD(k).m*tcMul(k)*10)/10}
function ktG(g){return String(g).replace(".",",")}
function ktTeach(k,p,f){ktSync(k);const g=ktTeachG(k,p,f);k[f]=cl(k[f]+g,0,100);k[f==="tv"?"mtv":"mtd"]=ktSea();ktTal(k);return g}
const KTPT={"Ân cần":[.35,.55,.3],"Khiêm nhường":[.35,.55,.35],"Tham vọng":[.45,.3,.6],"Kiêu ngạo":[.3,.25,.5],"Xảo quyệt":[.4,.15,.5],"Kín đáo":[.35,.3,.4]};
function ktPT(v){return tv(KTPT,v)||[.35,.35,.4]}
/* NPC chọn thầy theo tính nết và hầu bao (người cũng có khi chọn sai) */
function ktNpcTutor(k,v){if(!ktLive(v))return;const TB=BAL.ag.why.g2b.tier,ideal=nv(v,"tutorWant")+(ktHien(k)>=TB.hien?1:0);let want=npwPick([0,1,2,3],x=>TB.base-Math.abs(x-ideal)*TB.step)||0;/* npc-purpose G2: the master her nature and the child's promise ask for (near-best: she may misjudge by one) */
 if(want===3&&npcWhy("ktFav",{p:v,k})){/* npc-purpose G2: only a favoured or ambitious mother asks the Emperor */ap(v,{sung:-4});if(roll(oddsCl(KT.favO+v.sung/2))){k.tut=3;k.fav=1;return}want=2}
 while(want>0&&(v.bac||0)<KT.fee[want]*4)want--;k.tut=want;k.fav=0;
 if((v.bac||0)>=KT.feeVo*6&&npwPick(["vo","no"],x=>{const B=BAL.ag.why.g2b.vo;return x==="no"?B.no:ktPT(v)[2]*B.w*(k.sex==="m"?1:B.fMul)})==="vo")k.vt=1}/* npc-purpose G2: a martial-minded mother hires a martial master */
function ktMonth(){let ev="";if(!S||S.dead)return ev;
 for(const [k,v] of allKids()){if(!k.alive)continue;ktSync(k);const p=v||S;
  if(!ktLive(p)){if(k.tut||k.vt){k.tut=0;k.vt=0;k.fav=0}}/* mẹ mất hay vào lãnh cung: không ai trả học phí */
  if(v&&ktLive(v)&&k.age>=3&&S.turn%3===0&&!(typeof p3On==="function"&&p3On())){/* par3 on: the NPC mother chooses Dạy chữ / Dạy lễ nghi herself (jagacts3 cx3:teach*) */const P=ktPT(v);if(roll(P[0]*100))ktTeach(k,v,"tv");if(roll(P[1]*100))ktTeach(k,v,"td")}
  if(k.age>=6&&!k.enr){k.enr=1;if(v)ktNpcTutor(k,v);else{tcSeeOwn(k,"thầy dạy",BAL.tc.nzOwn);ev+=`${k.name} tròn 6 tuổi, vào Thượng thư phòng học chung; thầy dạy thưa: tư chất con ${tcWord(k.tcO.v)}. Có thể mời thầy riêng ở thẻ con. `}}
  if(!v&&k.age>=BAL.tc.nurseAge&&!k.tcO){if(k.age>=6){tcSeeOwn(k,"thầy dạy",BAL.tc.nzOwn);ev+=`Thầy dạy thưa: tư chất ${k.name} ${tcWord(k.tcO.v)}. `}/* reviewer: old saves / children already at school — the teacher speaks, not the nurse */
   else{tcSeeOwn(k,"nhũ mẫu",BAL.tc.nzNurse);ev+=`Nhũ mẫu thưa: ${k.name} ${tcWord(k.tcO.v)==="chậm hiểu"?(k.age<3?"chậm biết nói, chậm biết đi":"chậm hiểu lời"):"lanh lợi"}, tư chất ${tcWord(k.tcO.v)}. `}}
  ktGrow(k,p)}
 return ev}
(function(){const k0=kidsMonth;kidsMonth=function(){let ev=k0.apply(this,arguments)||"";try{ev+=ktMonth()}catch(e){}return ev}})();
/* Cầm ≥4 của nàng: thay +1 Tài chung bằng phần Văn trong ktGrow (cùng luật cho phi tần khác) */
(function(){if(typeof artMonth!=="function")return;const a0=artMonth;artMonth=function(){const L=S&&S.kids?S.kids.map(k=>[k,k.tal]):[];const r=a0.apply(this,arguments);L.forEach(([k,t])=>{k.tal=t});return r}})();
/* học phí trả cùng bổng lộc, cho mọi người mẹ; thiếu bạc thì thầy đắt nhất thôi dạy */
(function(){const s0=stipend;stipend=function(p){let line=s0.apply(this,arguments);try{const ks=(p.kids||[]).filter(k=>k.alive);ks.forEach(ktSync);let fee=ks.reduce((a,k)=>a+ktFee(k),0);const quit=[];
  while(fee>0&&(p.bac||0)<fee){const k=ks.filter(k=>ktFee(k)>0).sort((a,b)=>ktFee(b)-ktFee(a))[0];if(!k)break;if(k.vt){k.vt=0;quit.push(`thầy võ của ${k.name}`)}else{quit.push(`${TUT[k.tut]} của ${k.name}`);k.tut=0;k.fav=0}fee=ks.reduce((a,k)=>a+ktFee(k),0)}
  if(fee>0)ap(p,{bac:-fee});
  if(p===S&&line){if(fee)line=line.replace(/ = ([+-]?\d+) bạc/,(m,n)=>` · học phí các con -${fee} = ${(+n-fee)>=0?"+":""}${+n-fee} bạc`);if(quit.length)line+=` Không đủ bạc trả học phí: ${quit.join(", ")} thôi dạy.`}}catch(e){}return line}})();
/* ---- khảo hạch: Hoàng thượng thử tài các con (mọi hoàng tự cùng thi, kết quả thật) ---- */
const KTE={tet:{n:"Câu đối Tết",m:[12],p:70,f:{tv:.75,td:.25},a:6,dom:"Văn",t:"Cuối năm, Hoàng thượng cho các hoàng tự đề câu đối dán cửa cung đón Tết, ngài tự tay chấm."},
 khao:{n:"Khảo bài ở Thượng thư phòng",m:[4,5],p:35,f:{tv:.6,td:.4},a:6,dom:"Văn",t:"Hoàng thượng bất ngờ ngự đến Thượng thư phòng, gọi từng hoàng tự lên đọc bài, giảng sách."},
 tthu:{n:"Yến Trung thu",m:[8],p:50,f:{td:.6,tv:.4},a:6,dom:"Đức",t:"Yến Trung thu, các hoàng tự hành lễ dâng bánh, đọc thơ chúc thọ trước Hoàng thượng và Thái hậu."},
 san:{n:"Thu săn",m:[10],p:70,f:{tw:1},a:8,dom:"Võ",t:"Thu săn ở bãi săn hoàng gia: Hoàng thượng cho các hoàng tử (và công chúa có học võ) thi cưỡi ngựa bắn cung."}};
function ktExp(a){const E=BAL.tc.exp;return Math.min(E[2],E[0]+E[1]*(a-6))}/* mức thường của con ở tuổi ấy */
function ktDom(k,E){ktSync(k);return Object.entries(E.f).reduce((s,[f,w])=>s+k[f]*w,0)}
function ktEl(k,E){return k.alive&&k.age>=E.a&&(E.f.tw?(k.sex==="m"||k.vt):true)}
function ktEdge(k,E,prep){return ktDom(k,E)-ktExp(k.age)+(prep?KT.prep:0)+(E.f.tw||ktD(k).n>0?ktD(k).n:0)}
function ktPEx(d){return cl(Math.round((21-KT.exc+d)/41*100),0,100)}function ktPPoor(d){return cl(Math.round((21+KT.poor-d)/41*100),0,100)}
function ktOdds(k,E,prep){return oddsCl(ktPEx(ktEdge(k,E,prep)))}
function ktList(E){return allKids().filter(([k])=>ktEl(k,E))}
const KTG={ex:{fond:6,sung:3,danh:2},top:{fond:3,sung:2,danh:2},ok:{fond:1},poor:{fond:-3,danh:-1},skip:{fond:-2}};
function ktGain(){return `con xuất sắc: Hoàng thượng thương con +${KTG.ex.fond}, ${sgStat(KTG.ex.sung)}, Danh +${KTG.ex.danh} (đứng đầu thêm thương +${KTG.top.fond}, ${sgStat(KTG.top.sung)}, Danh +${KTG.top.danh})`}
function ktLoss(){return `con thi kém: Hoàng thượng thương con ${KTG.poor.fond}, Danh ${KTG.poor.danh}`}
PEND.kt53=pp=>{const E=KTE[pp.e];if(!E||!S)return null;const L=ktList(E);const mine=L.filter(([,v])=>!v).map(([k])=>k).filter(k=>k.hp>=35);if(!mine.length)return null;
 const row=([k,v])=>{const sick=k.hp<35;return `<div class="ktr"><span>${mdH(kidFace(k),"xs")}<span>${k.name} · ${k.age} tuổi · ${v?"con "+v.name:"<strong class=\"g\">con ngươi</strong>"}</span></span><b>${sick?"đang ốm, không dự":oddsChip(word(ktOdds(k,E,0)))+" được khen"}</b></div>`};const oth=L.filter(([,v])=>v).length;
 const best=Math.max(...mine.map(k=>ktOdds(k,E,0))),bestP=Math.max(...mine.map(k=>ktOdds(k,E,1)));
 const h=`<p>${E.t}</p><div class="ktlist">${L.filter(([,v])=>!v).map(row).join("")}</div>${oth?`<p>Cùng thi: ${oth} hoàng tự của các cung khác.</p>`:""}<p class="past">Thi ${E.dom.toLowerCase()}: tài ${E.dom}${E.f.td&&E.f.tv?(E.dom==="Văn"?" và Đức":" và Văn"):""} của con so với tuổi, thêm may rủi. Các phi tần khác cũng được chọn cho con ôn luyện hay ở nhà.</p>`;
 return{who:pEmp(),t:h,o:[{n:"Cho con dự thi",fx:{},x:`${word(best)} · thành: ${ktGain()} · hỏng: ${ktLoss()}`,go:()=>ktRun(pp.e,0)},
  {n:`Mời thầy kèm con ôn luyện trước`,fx:{bac:-KT.prepC},x:`${word(bestP)} · thành: dễ được khen hơn; ${ktGain()} · hỏng: ${ktLoss()}`,go:()=>ktRun(pp.e,1)},
  {n:"Cáo bệnh cho con ở nhà",fx:{},x:`không sợ con thi kém, không mất bạc · kèm: Hoàng thượng thương con ${KTG.skip.fond}, con không được khen`,go:()=>ktRun(pp.e,2)}]}};
function ktApply(k,p,g){k.fond=cl(k.fond+(g.fond||0),0,100);if(ktLive(p)){const o={};if(g.sung)o.sung=g.sung;if(g.danh)o.danh=g.danh;if(Object.keys(o).length)ap(p,o)}}
function ktReveal(k,why){if(k.dilK||!k.dil)return"";k.dilK=1;const D=ktD(k);return `${why} ${k.name} có nết <b>${k.dil}</b>: ${D.up}; nhưng ${D.dn}. `}
function ktRun(e,ch){const E=KTE[e];if(!E||!S)return;S.kt53t=S.turn;const L=ktList(E).filter(([k])=>k.hp>=35);const res=[];
 const npcPrep={},npcSkip={};
 for(const [k,v] of L){if(!v)continue;if(npcPrep[v.id]==null)npcPrep[v.id]=ktLive(v)&&(v.bac||0)>=KT.prepC&&roll(ktPT(v)[2]*100)?(ap(v,{bac:-KT.prepC}),1):0;
  if(ktPEx(ktEdge(k,E,npcPrep[v.id]))<20&&ktPPoor(ktEdge(k,E,npcPrep[v.id]))>40&&!hasT(v,"Kiêu ngạo")&&roll(30))npcSkip[k.name]=1}
 for(const [k,v] of L){const prep=v?npcPrep[v.id]:ch===1;const skip=v?npcSkip[k.name]:ch===2;
  if(skip){res.push({k,v,r:"skip",s:-99});continue}const d=ktEdge(k,E,prep);let s=d+R(41)-20;
  /* ODDS CAP: the noise draw keeps its result inside the one cap (capRes) */const ex=capRes(s>=KT.exc,ktPEx(d)),po=!ex&&capRes(s<=KT.poor,ktPPoor(d));if(ex)s=Math.max(s,KT.exc);else if(po)s=Math.min(s,KT.poor);else s=cl(s,KT.poor+1,KT.exc-1);res.push({k,v,s,r:ex?"ex":po?"poor":"ok"})}
 const top=res.filter(x=>x.r==="ex").sort((a,b)=>b.s-a.s)[0];let rev="";
 for(const x of res){const p=x.v||S,g=Object.assign({},KTG[x.r]);if(x===top)for(const kk in KTG.top)g[kk]=(g[kk]||0)+KTG.top[kk];ktApply(x.k,p,g);x.g=g;
  x.k.lt={n:E.n,y:S.year,r:x.r,top:x===top?1:0};if(!x.v&&x.r!=="skip"&&npwPick(["tell","quiet"],y=>{const B=BAL.ag.why.g2b.rev;return y==="tell"?B.base+(x.k.tut||0)*B.tut:B.quiet})==="tell")rev+=ktReveal(x.k,"Thầy dạy tâu riêng:")}
 if(top&&!top.v)ghenAll(BAL.ghen.kidTop,"con ngươi hơn con người khác");
 const RW={ex:"Xuất sắc",ok:"Khá",poor:"Kém",skip:"Ở nhà"};
 const eff=x=>{const g=x.g,o=[];if(g.fond)o.push(`<span class="${g.fond>0?"g":"r"}">Hoàng thượng thương con ${g.fond>0?"+":""}${g.fond}</span>`);if(!x.v&&g.sung)o.push(`<span class="g">${x.p?sgOf(x.p,g.sung):sgStat(g.sung)}</span>`);if(!x.v&&g.danh)o.push(`<span class="${g.danh>0?"g":"r"}">Danh ${g.danh>0?"+":""}${g.danh}</span>`);return o.join(" · ")};
 res.sort((a,b)=>b.s-a.s);const shown=res.filter(x=>!x.v||x===top||(x.r==="ex"&&res.indexOf(x)<4));const hid=res.filter(x=>!shown.includes(x));
 const cnt=r=>hid.filter(x=>x.r===r).length;const sum=hid.length?`Các hoàng tự khác (${hid.length}): ${["ex","ok","poor","skip"].filter(r=>cnt(r)).map(r=>`${cnt(r)} ${RW[r].toLowerCase()}`).join(", ")}.`:"";
 const rows=shown.map(x=>`<div class="ktr"><span>${mdH(kidFace(x.k),"xs")}<span>${x.k.name} · ${x.v?"con "+x.v.name:"<strong class=\"g\">con ngươi</strong>"}</span></span><b class="${x.r==="ex"?"g":x.r==="poor"||x.r==="skip"?"r":""}">${x===top?"Đứng đầu · ":""}${RW[x.r]}</b>${x.v?"":`<small>${eff(x)}</small>`}</div>`).join("");
 const mineT=res.filter(x=>!x.v).map(x=>`${x.k.name}: ${x===top?"đứng đầu, ":""}${RW[x.r].toLowerCase()}`).join("; ");
 log(`${E.n}: ${mineT}.${top&&top.v?` Đứng đầu: ${top.k.name} (con ${top.v.name}).`:""} ${rev}`);
 Q.unshift({t:`Kết quả ${E.n.toLowerCase()}`,h:`<div class="ktlist">${rows}</div>${sum?`<p>${sum}</p>`:""}${rev?`<p>${rev}</p>`:""}<p class="past">Xuất sắc: Hoàng thượng thương con +${KTG.ex.fond}, mẹ ${sgStat(KTG.ex.sung)}, Danh +${KTG.ex.danh}; đứng đầu thêm. Khá: thương +1. Kém: thương ${KTG.poor.fond}, mẹ Danh ${KTG.poor.danh}. Ở nhà: thương ${KTG.skip.fond}.</p>`})}
/* chỉ phi tần khác có con dự: một dòng tin, không hộp thoại */
function ktQuiet(e){const E=KTE[e];S.kt53t=S.turn;const L=ktList(E).filter(([k])=>k.hp>=35);let best=null;
 for(const [k,v] of L){const s=ktEdge(k,E,0)+R(41)-20,r=s>=KT.exc?"ex":s<=KT.poor?"poor":"ok";ktApply(k,v||S,KTG[r]);k.lt={n:E.n,y:S.year,r,top:0};if(r==="ex"&&(!best||s>best.s))best={k,v,s}}
 if(best){ktApply(best.k,best.v||S,KTG.top);best.k.lt.top=1;return `${E.n}: ${best.k.name}, con ${best.v?best.v.name:"ngươi"}, đứng đầu, được Hoàng thượng khen. `}return""}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments)||"";try{if(S&&!S.dead&&S.turn-(S.kt53t==null?-99:S.kt53t)>=KT.cool){
  const e=Object.keys(KTE).find(x=>KTE[x].m.includes(S.month));if(e&&roll(KTE[e].p)){const L=ktList(KTE[e]);const mine=L.some(([k,v])=>!v&&k.hp>=35);
   if(mine)pushDil(mkP("kt53",{e}),KTE[e].n);else if(L.length>=2)ev+=ktQuiet(e)}}}catch(err){}return ev}})();
/* ---- lập hiền: tài (chủ yếu Văn, Đức; một phần Võ) vào trọng số chọn Thái tử của j51 ---- */
function ktHeirW(k){return Math.max(0,ktHien(k)*1.1-12)}
/* cài sau khi mọi mô-đun đã nạp (j51 đứng trước hay sau j53 đều được) */
function ktHeirInstall(){if(window.__ktHeirOn)return;window.__ktHeirOn=1;
if(typeof kvW==="function"){const w0=kvW;kvW=function(k,v,dich,truong){const w=w0.apply(this,arguments);try{ktSync(k);if(!hienShown(k))return 5+(dich?60:0)+(truong?(S&&S.ps?BAL.ps.truongW:25):0)+(k.fond||0)/2;/* palace-start r1: same first-born edge as j51 kvW */return w-k.tal/2+ktHeirW(k)}catch(e){return w}}} 
else{const h0=heirMonth;heirMonth=function(){const L=allKids().map(([k])=>[k,k.tal]);try{L.forEach(([k])=>{ktSync(k);k.tal=2*ktHeirW(k)})}catch(e){}let r;try{r=h0.apply(this,arguments)}finally{L.forEach(([k,t])=>{k.tal=t})}return r}} 
if(typeof kvWhy==="function"){const y0=kvWhy;kvWhy=function(x){return String(y0.apply(this,arguments)).replace(/^Tài \d+ · được thương \d+/,!hienShown(x.k)?"còn nhỏ: chỉ xét đích, trưởng, lòng thương":x.v?`Hiền tài ${hienWord(x.k)} (lời đồn)`:`Hiền tài ${ktHien(x.k)} · được thương ${x.k.fond}`)}} 
(function(){const h0=heirMonth;heirMonth=function(){const r=h0.apply(this,arguments);try{if(r&&S.heir&&S.heir.k)return String(r).replace(/lập hiền: Tài \d+, được ngài thương \d+/,S.heir.v?`lập hiền: tiếng học hành ${hienWord(S.heir.k)}, được ngài thương`:`lập hiền: Văn ${ktR(S.heir.k.tv)}, Đức ${ktR(S.heir.k.td)}, Võ ${ktR(S.heir.k.tw)}, được ngài thương ${S.heir.k.fond}`)}catch(e){}return r}})();}
setTimeout(ktHeirInstall,0);
/* con tài giỏi khiến phi tần có con khác ghen: mưu nhắm vào con nàng nặng thêm chút ít (Hiền tài từ 80, tối đa ×1,35) */
function ktEnvy(v,t){if(!t||t===v||!S)return 1;const ks=(t===S?S.kids:(t.kids||[])).filter(k=>k.alive&&hienShown(k));if(!ks.length||!(v.kids||[]).some(k=>k.alive))return 1;const h=Math.max(...ks.map(ktHien));return h>=80?1+Math.min(.35,(h-80)/50):1}
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{const m=ktEnvy(v,t);if(m>1&&Array.isArray(O))return O.map(([k,w])=>KTKID.includes(k)?[k,w*m]:[k,w])}catch(e){}return O}})();
(function(){const t0=tKid;tKid=function(t){const r=t0.apply(this,arguments);try{if(!window.__kvS&&t){const ks=(t===S?S.kids:(t.kids||[])).filter(k=>k.alive&&hienShown(k)&&ktHien(k)>=80);const a=window.__ktSch;if(ks.length&&a&&a!==t&&ktEnvy(a,t)>1){const x=npwPick(ks,y=>ktHien(y));if(x)return x}}}catch(e){}return r}})();/* npc-purpose G2: the schemer goes for the bright child only when her grudge is about the succession (she has children of her own: ktEnvy) */
(function(){if(typeof ACT!=="object")return;for(const n of ["ksab","kpoison"]){const A0=ACT[n];if(!A0||typeof A0.f!=="function")continue;const f0=A0.f;A0.f=function(a,t){const s0=window.__ktSch;window.__ktSch=a;try{return f0.apply(this,arguments)}finally{window.__ktSch=s0}}}})();
/* ---- hành động của nàng: dạy chữ, dạy lễ nghi, chọn thầy, xin Hoàng thượng cử danh sư, thầy võ ---- */
function ktLast(k){const t=k.lt;if(!t)return "";const RW={ex:"xuất sắc",ok:"khá",poor:"kém",skip:"ở nhà"};return `${t.n} năm ${t.y}: ${t.top?"đứng đầu, ":""}${RW[t.r]}`}
function ktBtns(k){if(!k.alive)return[];ktSync(k);const B=[],t2=whyTime(2),t1=whyTime(1),young=k.age<3?"con còn quá nhỏ (cần 3 tuổi)":"";
 const gv=ktTeachG(k,S,"tv"),gd=ktTeachG(k,S,"td");
 B.push(pbtn(`data-kt53="tv" data-kn="${k.name}"`,"Dạy chữ",`tốn: ${BAL.kidTeach.k} khắc, Sức -${BAL.kidTeach.suc} · thành: Văn ${k.name} +${ktG(gv)} (mỗi mùa dạy một lần)`,t2||young||(k.mtv===ktSea()?"mùa này đã dạy chữ":S.suc<BAL.sucNeed.kid?"Sức dưới "+BAL.sucNeed.kid:"")));
 B.push(pbtn(`data-kt53="td" data-kn="${k.name}"`,"Dạy lễ nghi",`tốn: ${BAL.kidTeach.k} khắc, Sức -${BAL.kidTeach.suc} · thành: Đức ${k.name} +${ktG(gd)} (mỗi mùa dạy một lần)`,t2||young||(k.mtd===ktSea()?"mùa này đã dạy lễ nghi":S.suc<BAL.sucNeed.kid?"Sức dưới "+BAL.sucNeed.kid:"")));
 const small=k.age<6?"con chưa đủ 6 tuổi vào Thượng thư phòng":"";
 if(small){B.push(pbtn(`data-kt53="none"`,"Mời thầy riêng",`tốn: Bạc -${KT.fee[1]} đến -${KT.fee[3]} mỗi tháng · thành: ba môn (Văn, Đức, Võ) tăng nhanh hơn học chung`,small));return B}
 for(let t=0;t<4;t++){const r=ktRates(Object.assign({},k,{tut:t,age:Math.max(6,k.age)}),true);const cur=k.tut===t&&(t<3||!k.fav);
  const fee=KT.fee[t];const gain=`Văn khoảng +${ktYear(k,"tv",r.v)}/năm, Đức khoảng +${ktYear(k,"td",r.d)}/năm`;
  const sm=t===0?`thành: không tốn học phí · kèm: học chậm nhất (${gain})`:`tốn: ${BAL.btn.kidTut.k} khắc, Bạc -${fee} mỗi tháng · thành: ${gain}${t===3?" · kèm: con giỏi quá thì phi tần khác ghen, dễ nhắm vào con":""}`;
  if(cur&&!small)continue;/* thầy đang dạy: ghi ở dòng "Thầy" bên trái */
  B.push(pbtn(`data-kt53="tut" data-t="${t}" data-kn="${k.name}"`,t===0?"Cho con học chung":`Mời ${TUT[t]}`,sm,small||t1||(t&&S.bac<fee*2?`thiếu bạc (cần ${fee*2} cho hai tháng)`:"")))}
 const fo=od(KT.favO+S.sung/2);
 B.push(pbtn(`data-kt53="fav" data-kn="${k.name}"`,"Xin Hoàng thượng cử Đại học sĩ",`${word(fo)} · tốn: ${BAL.btn.kidFav.k} khắc, ${sgStat(BAL.eff.j53.sungFav)} · thành: Đại học sĩ dạy con, học phí chỉ Bạc -${KT.feeFav} mỗi tháng · hỏng: ngài không cho, mất Sủng`,small||(k.tut===3&&k.fav?"đã có Đại học sĩ do ngài cử":t2)||(S.out?"đang ở lãnh cung":"")));
 const vr=ktRates(Object.assign({},k,{vt:1,age:Math.max(6,k.age)}),true).w,v0=ktRates(Object.assign({},k,{vt:0,age:Math.max(6,k.age)}),true).w;
 B.push(k.vt?pbtn(`data-kt53="vo" data-t="0" data-kn="${k.name}"`,"Thôi học võ",`thành: bớt Bạc ${KT.feeVo} mỗi tháng · kèm: Võ chậm lại (khoảng +${ktYear(k,"tw",v0)}/năm)`,small||t1)
  :pbtn(`data-kt53="vo" data-t="1" data-kn="${k.name}"`,"Mời thầy cưỡi ngựa bắn cung",`tốn: ${BAL.btn.kidTut.k} khắc, Bạc -${KT.feeVo} mỗi tháng · thành: Võ khoảng +${ktYear(k,"tw",vr)}/năm${v0?"":" (không thầy: con gái không học võ)"}`,small||t1||(S.bac<KT.feeVo*2?`thiếu bạc (cần ${KT.feeVo*2})`:"")));
 return B}
function ktAct(a,name,t){const k=S&&S.kids.find(x=>x.name===name&&x.alive);if(!k||S.dead||Q.length)return;ktSync(k);const b=rsnap();let title="Việc học của con",ok="sure";
 if(a==="tv"||a==="td"){if(!can(BAL.kidTeach.k)||k.age<BAL.kidTeach.age||S.suc<BAL.kidTeach.suc||k[a==="tv"?"mtv":"mtd"]===ktSea())return;spend(BAL.kidTeach.k);apply({suc:-BAL.kidTeach.suc});const g=ktTeach(k,S,a);title=a==="tv"?"Dạy chữ":"Dạy lễ nghi";
  log(`Tự tay ${a==="tv"?"dạy":"dạy lễ nghi cho"} ${k.name}${a==="tv"?" học chữ":""}: ${a==="tv"?"Văn":"Đức"} con +${ktG(g)}. ${roll(25)?(()=>{const r=ktReveal(k,"Dạy con, ngươi thấy");if(r)try{kitKnow({key:"kid:"+k.name,text:r.replace(/<[^>]+>/g,"")})}catch(e){}return r})():""}`)}
 else if(a==="tut"){t=+t;if(k.age<6||!can(BAL.btn.kidTut.k)||(t&&S.bac<KT.fee[t]*2)||(k.tut===t&&(t<3||!k.fav)))return;if(t)spend(BAL.btn.kidTut.k);k.tut=t;k.fav=0;title=t?`Mời ${TUT[t]}`:"Cho con học chung";
  log(t?`Mời ${TUTD[t]} dạy ${k.name}: học phí Bạc ${KT.fee[t]} mỗi tháng, trả cùng bổng lộc.`:`${k.name} về học lớp chung của Thượng thư phòng, không tốn học phí.`)}
 else if(a==="fav"){if(k.age<6||!can(BAL.btn.kidFav.k)||S.out||(k.tut===3&&k.fav))return;const fo=od(KT.favO+S.sung/2);/* the odds on the card, read before the spend and the Sủng cost (shown-odds r2-rv) */spend(BAL.btn.kidFav.k);apply({sung:BAL.eff.j53.sungFav});title="Xin Hoàng thượng cử Đại học sĩ";
  if(roll(fo)){k.tut=3;k.fav=1;log(`Hoàng thượng chuẩn tấu, cử một Đại học sĩ dạy ${k.name}; học phí chỉ Bạc ${KT.feeFav} mỗi tháng.`);ok=true}
  else{log(`Hoàng thượng không cho: “Thượng thư phòng đã có thầy.” Xin không thành.`);ok=false}}
 else if(a==="vo"){t=+t;if(k.age<6||!can(t?BAL.btn.kidTut.k:0)||(t&&S.bac<KT.feeVo*2))return;if(t)spend(BAL.btn.kidTut.k);k.vt=t;title=t?"Mời thầy cưỡi ngựa bắn cung":"Thôi học võ";
  log(t?`Mời thầy cưỡi ngựa bắn cung dạy ${k.name}: Bạc ${KT.feeVo} mỗi tháng.`:`${k.name} thôi học võ riêng.`)}
 else return;ktTal(k);resultShow(title,b,ok);render()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-kt53]");if(b&&!b.disabled){e.stopPropagation();ktAct(b.dataset.kt53,b.dataset.kn,b.dataset.t)}},true);
/* thẻ bài "Dạy dỗ" trong bộ việc: đổi thành Dạy chữ cho đứa yếu chữ nhất chưa được dạy tháng này */
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);try{if(!S||!Array.isArray(deck))return;const i=deck.findIndex(a=>/^Dạy dỗ/.test(a.n||""));if(i<0)return;
  const L=S.kids.filter(k=>k.alive&&k.age>=3&&k.mtv!==ktSea());L.forEach(ktSync);const k=L.sort((a,b)=>a.tv-b.tv)[0];if(!k){deck.splice(i,1);return}const g=ktTeachG(k,S,"tv");
  deck[i]=Object.assign({},deck[i],{n:`Dạy ${k.sex==="m"?"hoàng tử":"công chúa"} học chữ`,t:`Tự tay dạy ${k.name} chữ nghĩa.`,c:{suc:-BAL.kidTeach.suc},x:`Văn ${k.name} +${ktG(g)}`,go:()=>{ktTeach(k,S,"tv")}})}catch(e){}}})();
/* ---- giao diện: thẻ con, dòng tin ở tẩm cung, bảng Thượng thư phòng ---- */
(function(){if(typeof kidActs!=="function")return;const a0=kidActs;kidActs=function(k){return a0.apply(this,arguments).filter(h=>!/data-kid="teach"/.test(h))}})();
function tcLine(k,mine){const s=tcSeen(k,mine);const t=typeof kitGloss==="function"?kitGloss("Tư chất hoàng tự","Tư chất"):"Tư chất";
 if(s)return `${t}: <b>${s.w}</b> <small class="past">(${s.by}${s.by==="lời đồn"?"":" thưa"})</small>`;return `${t}: <b>chưa rõ</b>${k.age<1?' <small class="past">(con còn đỏ hỏn)</small>':""}`}
function hienLine(k,mine){const t=typeof kitGloss==="function"?kitGloss("Hiền tài","Hiền tài"):"Hiền tài";if(!hienShown(k))return `${t}: <b>còn nhỏ, chưa rõ</b>`;
 return mine?`${t} <b>${ktHien(k)}</b>`:`${t}: <b>${hienWord(k)}</b> <small class="past">(lời đồn)</small>`}
function ktBars(k){return k.age>=BAL.tc.barAge?`<span class="ktbars">${sbar("Văn",k.tv,"kv")}${sbar("Võ",k.tw,"kw")}${sbar("Đức",k.td,"kd")}</span>`:""}
function ktLines(k){ktSync(k);const L=[tcLine(k,true),hienLine(k,true),k.age>=BAL.tc.barAge?ktBars(k):"Văn, Võ, Đức: con còn bế ẵm, chưa học gì"];
 L.push(k.age<6?"Chưa vào Thượng thư phòng (6 tuổi)":`Thầy: <b>${TUT[k.tut||0]}</b>${k.tut===3&&k.fav?" (Hoàng thượng cử)":""}${k.vt?" · có thầy võ":""}${ktFee(k)?` · Bạc ${ktFee(k)}/tháng`:""}`);
 L.push(k.dilK?`Nết học: <b>${k.dil}</b> (${ktD(k).up}; ${ktD(k).dn})`:"Nết học: chưa rõ");
 const lt=ktLast(k);if(lt)L.push(`Lần thi gần nhất: ${lt}`);return L}
(function(){const kc=kidCard;kidCard=function(k){if(k&&k.alive)try{ktSync(k)}catch(e){}let h=kc.apply(this,arguments);if(!k||!k.alive)return h;try{
  h=h.replace(`<span>Tài <b>${k.tal}</b></span>`,ktLines(k).map(x=>`<span>${x}</span>`).join(""));
  h=h.replace('<div class="pcr">',`<div class="pcr"><h5>Học hành</h5><div class="pcb">${ktBtns(k).join("")}</div>`)}catch(e){}return h}})();
(function(){const h0=homePeople;homePeople=function(){const P=h0.apply(this,arguments);try{P.forEach(p=>{if(p.kind==="kid"&&p.ref&&p.info){ktSync(p.ref);p.info=p.info.replace(/ · Tài \d+/,p.ref.age>=BAL.tc.barAge?` · Văn ${ktR(p.ref.tv)} · Võ ${ktR(p.ref.tw)} · Đức ${ktR(p.ref.td)}`:"")}})}catch(e){}return P}})();
function ktBoxHTML(){const A=allKids().filter(([k])=>k.alive&&k.age>=6);const L=A.filter(([k,v])=>!v||k.lt).sort((a,b)=>(!!a[1])-(!!b[1])||((b[0].lt&&b[0].lt.r==="ex")-(a[0].lt&&a[0].lt.r==="ex")));if(!A.length)return "";const rest=A.length-L.length;
 const rows=kitRows(L.map(([k,v])=>[`${mdH(kidFace(k),"xs")}<span>${k.name} · ${k.age} tuổi · con ${v?v.name:"<strong class=\"g\">ngươi</strong>"}</span>`,ktLast(k)||"chưa thi lần nào",ktLast(k)?"t":"n"]));
 return `<div class="ktbox"><h5>Thượng thư phòng</h5>${rows}<p class="past">${rest?`Còn ${rest} hoàng tự chưa dự kỳ thử tài nào. `:""}Kết quả các kỳ Hoàng thượng thử tài (cả cung đều biết). Câu đối Tết tháng 12, khảo bài tháng 4–5, yến Trung thu tháng 8, thu săn tháng 10.</p></div>`}
(function(){const k0=kidTabHTML;kidTabHTML=function(){let h=k0.apply(this,arguments);try{ktSyncAll();const i=h.lastIndexOf("</div>");if(i>=0)h=h.slice(0,i)+ktBoxHTML()+h.slice(i)}catch(e){}return h}})();
(function(){const st=document.createElement("style");st.textContent=".ktbars{display:flex;flex-wrap:wrap;gap:2px 0}.sbar.kv .sbt u{background:#4a6fa5}.sbar.kw .sbt u{background:#a5583a}.sbar.kd .sbt u{background:#5a9a6a}"+
 ".ktlist{display:flex;flex-direction:column;gap:4px;margin:6px 0}.ktr{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:2px 8px;padding:3px 0;border-bottom:1px solid rgba(0,0,0,.08)}.ktr>span{min-width:0;overflow-wrap:anywhere;display:flex;align-items:center;gap:5px}.ktr>span .md{flex-shrink:0;margin:0}.ktr small{flex-basis:100%;font-size:.75rem}.ktr .md{vertical-align:middle}"+
 ".pgwrap:has(.ktbox),.pgwrap:has(.kvbox){height:auto;max-height:none}.pgwrap:has(.ktbox)>.pc,.pgwrap:has(.kvbox)>.pc{flex:0 0 auto;min-height:min(480px,calc(100dvh - 150px))}.ktbox{margin:8px 0 0}.ktbox .pcrow{align-items:center}.ktbox .pcrow>span{min-width:0;overflow-wrap:anywhere;display:flex;align-items:center;gap:5px}.ktbox .pcrow>span .md{flex-shrink:0;margin:0}.ktbox .pcrow b{text-align:right;flex-shrink:1;max-width:48%;overflow-wrap:anywhere}.ktbox .past{margin:2px 0 0;font-size:.72rem}";document.head.appendChild(st)})();
