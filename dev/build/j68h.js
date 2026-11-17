/* ================= j68h: GROUNDING (owner rule 11/14): every event comes from the simulated world =================
   Preconditions read real state and bind real actors/facts; hearsay is labelled with its source and is either a true fact or that NPC's own lie/false belief,
   and checking it always reports the truth. Also grounds two stock sources that said nothing: the NPC 'rỉ tai' act (j28) and the j24 'kể chuyện trong cung' visit. */
const band6=v=>{try{return bandOf(danger(v,S))}catch(e){return 0}};
const spyOther6=s=>!!(s&&s.spyFor&&s.spyFor!=="me");
const planOnMe6=()=>liveRivals(true).find(v=>v.plan&&v.plan.t===key(S))||null;
/* a true fact about consort x, as one plain sentence (null if nothing notable) */
function fact6(x){if(!x)return null;const L=[];const kn=(x.kids||[]).filter(k=>k.alive).length;
 if(x.preg>0&&!x.hidden)L.push(`${x.name} đang có mang tháng thứ ${x.preg}`);if(x.confined>0)L.push(`${x.name} đang bị cấm túc`);
 if(x.sung>=60)L.push(`${x.name} đang được Hoàng thượng sủng ái hơn cả`);else if(x.sung<20)L.push(`${x.name} lâu rồi ít được lật thẻ`);
 if((x.th||0)>=40)L.push(`Thái hậu rất quý ${x.name}`);else if((x.th||0)<=-10)L.push(`Thái hậu không ưa ${x.name}`);
 if(kn)L.push(`${x.name} có ${kn} người con`);if((x.ghen||0)>=60)L.push(`${x.name} đang ghen tức với ngươi ra mặt`);
 if((x.bac||0)>=200)L.push(`cung ${x.name} dư dả bạc tiền`);else if((x.bac||0)<20)L.push(`cung ${x.name} đang túng thiếu`);
 return L.length?pick(L):null}
function factAny6(not){const L=liveRivals(true).filter(x=>x!==not);for(let i=0;i<6&&L.length;i++){const x=pick(L);const f=fact6(x);if(f)return f}return null}
const G6set=(id,o)=>{const s=E68I[id];if(s)Object.assign(s,o)};
/* --- stock sources --- */
try{if(typeof SOC==="object"&&SOC.gossip)SOC.gossip.run=(v,t)=>{const L=liveRivals(true).filter(y=>y!==v);if(!L.length)return"";const hate=L.filter(y=>aff(v,y)<0);const x=pick(hate.length?hate:L);ap(x,{danh:-1});const f=fact6(x);
 return f?`${v.name} rỉ tai với cung nhân rằng ${f} (danh tiếng ${x.name} -1)`:`${v.name} nói xấu ${x.name} với cung nhân (danh tiếng ${x.name} -1)`}}catch(e){}
(function(){const a0=approachOne;approachOne=function(){const r=a0.apply(this,arguments);try{if(r&&/sang chơi, kể chuyện trong cung\./.test(r.h||"")){const v=r.who&&r.who.w&&RV(r.who.w[1]);const f=factAny6(v);
  r.h=r.h.replace(/sang chơi, kể chuyện trong cung\./,f?`sang chơi, kể: ${f}. (Lời nàng kể; ngươi có thể tự dò cho chắc.)`:"sang chơi, kể chuyện ai đang được sủng.")}}catch(e){}return r}})();
/* --- daily life: causes in the world --- */
G6set("gossipTea",{pp:()=>{const a=rv6(fr6,v=>5+aff(v,S)/5);if(a==null)return null;const f=factAny6(RV(a));return f?{a0:a,f:`${RV(a).name} kể nhỏ: ${f}. <i>(Lời kể; ngươi có thể tự dò cho chắc.)</i>`}:null},
 o:X=>[c6("Nghe và giữ kín",{c:{suc:-3},r:[[X.A,6]],k:[R6("mất nửa buổi chiều")]}),
  c6("Gợi chuyện để dò thêm",{p:od(40+S.tamco/3),w:{mat:1},r:[[X.A,2]],lr:[[X.A,-6]],lt:[R6("nàng thấy ngươi tò mò quá")],ok:()=>{const f=factAny6(X.A.o);return f?`${X.A.n} kể thêm: ${f}.`:`${X.A.n} không biết gì thêm.`}}),
  c6("Khéo cáo mệt",{w:{suc:4},r:[[X.A,-3]]})]});
G6set("lostItem",{a:["maid"],pp:()=>{if(!S.maid)return null;const th=(S.staff||[]).filter(s=>netIs(s,"greed")||spyOther6(s));if(th.length)return{a0:0,c:pick(th).sid};if(S.suc<40)return{a0:0,c:null};return null},
 vf:p=>p.c!=null?[0,3]:[2],
 o:X=>{const c=X.p.c!=null?servById(X.p.c):null;return[
  c6("Lục soát kỹ cả cung",{c:{suc:-6},p:od(50+S.mat*4),w:{tamco:1},wt:[G6(c?"tìm ra kẻ lấy":"tìm lại được")],l:{danh:-1},lt:[R6("cung nhân bất bình vì bị nghi")],ok:()=>{if(c){c.loyal=cl(c.loyal-BAL.eff.j68h.loyalOk,0,100);try{c.cause={txt:"ăn cắp đồ của chủ",fault:true,w:wk()}}catch(e){}return `Món đồ nằm trong tay nải của ${c.name}${netIs(c,"greed")?" (vốn tham của)":" (đang làm tai mắt cho người khác)"}. Ngươi có cớ để xử.`}return "Món đồ ngươi mệt quá để quên dưới gối; tìm lại được."}}),
  c6("Thưởng ai tìm được",{c:{bac:-10},p:c?55:85,w:{danh:1},wt:[G6("đồ trở về")],l:{bac:-5},lt:[R6("món đồ mất hẳn")],ok:()=>c?`${c.name} sợ lộ, lén trả lại đồ.`:"Một tiểu thái giám nhặt được, mang trả lấy thưởng."}),
  c6("Thôi, bỏ qua",{w:{duc:1},wt:[G6("cung nhân yên lòng")],k:[R6("mất món đồ"),R6(c?"kẻ lấy quen tay":"")].filter(x=>!/><\/span>/.test(x))})]}});
G6set("sickServant",{pp:()=>{const weak=s=>(s.age||20)>=45||(s.loyal||50)<BAL.loy.out;const a=sv6(s=>harsh()||wet()?true:weak(s));return a==null?null:{a0:a}},w:C=>(harsh()||wet())?2.2:.6});
G6set("maidQuarrel",{pp:()=>{const L=(S.staff||[]).filter(s=>s.sid!=null);const hot=L.filter(s=>netIs(s,"talk")||(s.loyal||50)<BAL.loy.low);if(L.length<2||!hot.length)return null;const a=pick(hot),b=pick(L.filter(x=>x!==a));return{a0:a.sid,a1:b.sid}}});
G6set("brokenHeirloom",{pp:()=>{const a=sv6(s=>netIs(s,"timid")||(s.loyal||50)<BAL.loy.bad);return a==null?null:{a0:a,it:R(4)}},v:E68I.brokenHeirloom.v.map(t=>t.replace("{A}","{A}, vốn hay run tay sợ sệt,"))});
G6set("servGamble",{pp:()=>{const a=sv6(s=>netIs(s,"greed"));return a==null?null:{a0:a}}});
G6set("spoiledFood",{w:C=>(S.rank<=2||S.sung<20)?(C.sea==="Hạ"?2:1.2):0,v:E68I.spoiledFood.v.map(t=>t+" (Cung ít được sủng thì bên dưới hay khinh nhờn.)")});
G6set("eunuchSqueeze",{w:C=>C.rank<=2?2:0});
/* --- visitors with motives --- */
G6set("slyVisit",{pp:()=>{const a=rv6(v=>band6(v)>=1);return a==null?null:{a0:a}},
 o:X=>[c6("Tiếp, nhưng cho người canh chừng",{c:{suc:-4},w:{tamco:1},wt:[G6("không lọt chuyện gì ra")],r:[[X.A,2]]}),
  c6("Dò ngược ý nàng",{p:od(35+S.tamco/2),w:{mat:1},wt:[G6(`biết ${X.A.n} có ý gì`)],l:{danh:-1},lt:[R6("nàng biết ngươi đề phòng")],lr:[[X.A,-6]],ok:()=>{const v=X.A.o,b=band6(v);try{S.dKnown=S.dKnown||{};S.dKnown[v.id]=wk();noteAdd(v.id,`Sang dò giờ giấc của ngươi; mức có thể hại: ${BANDS[b][1]}`)}catch(e){}return `Ngươi đọc được ý ${v.name}: có thể hại ngươi mức ${BANDS[b][1]}${v.plan&&v.plan.t===key(S)?"; nàng đang chuẩn bị ra tay":""}.`}}),
  c6("Lạnh nhạt tiễn khách",{w:{suc:2},r:[[X.A,-6]]})]});
G6set("bribedServ",{pp:()=>{const b=rv6(v=>band6(v)>=1&&(v.bac||0)>=10);const a=sv6(s=>(s.loyal||50)>=BAL.loy.mid&&!spyOther6(s));return a==null||b==null?null:{a0:a,a1:b}},
 v:["{A} lén báo: người của {B} dúi cho hắn mười lượng, hỏi giờ ngươi đi ngủ.","{A} tự khai: {B} hứa cho hắn sang hầu cung nàng, lương gấp đôi, nếu chịu kể chuyện cung ngươi.","{A} mang về một túi bạc, nói người bên {B} ép nhận để đổi lấy tin tức.","{A} kể người của {B} hỏi xem ngươi có giữ thư từ gì của nhà ngoại không."]});
G6set("newServSus",{pp:()=>{const a=sv6(s=>spyOther6(s)||netIs(s,"talk"));return a==null?null:{a0:a}}});
G6set("servHero",{pp:()=>{const a=sv6(s=>netIs(s,"loyal")||netIs(s,"sharp"));return a==null?null:{a0:a}}});
G6set("servRomance",{w:C=>.7});
/* --- mysteries need a real culprit with a motive --- */
G6set("hairpinThief",{pp:()=>{const L=(S.staff||[]).filter(s=>s.sid!=null);const bad=L.filter(s=>netIs(s,"greed")||spyOther6(s));if(L.length<3||!bad.length)return null;const g0=pick(bad);const T=shuf(L.filter(s=>s!==g0)).slice(0,2).concat([g0]);const o=shuf(T.slice());return{a0:o[0].sid,a1:o[1].sid,a2:o[2].sid,g:o.indexOf(g0),it:R(MYST6.length)}}});
G6set("nightSteps",{pp:()=>(S.maid&&(planOnMe6()||(S.staff||[]).some(spyOther6)))?{a0:0}:null,
 o:X=>[c6("Thức đêm rình bắt",{c:{suc:-10},p:od(40+S.mat*5),w:{mat:1},wt:[G6("biết là ai")],l:{suc:-3},lt:[R6("không bắt được ai")],ok:()=>{const v=planOnMe6();if(v){evA(S,v,BAL.eff.j68h.evOk);return `Bóng người chạy về cung ${v.name}; nàng đang chuẩn bị mưu với ngươi. Chứng cứ ${v.name} ${balSg(BAL.eff.j68h.evOk)}.`}const s=(S.staff||[]).find(spyOther6);if(s){return `Là ${s.name}, người trong cung ngươi, lén mang tin ra ngoài.`}return "Không còn ai lảng vảng."}}),
  c6("Thuê thêm người gác",{c:{bac:-25},w:{tamco:1},wt:[G6("tuần tới kẻ hại ngươi khó ra tay hơn")],ok:()=>{S.guardWarn=Math.max(S.guardWarn||0,1);return "Cung ngươi có thêm người canh."}}),
  c6(`Bảo ${S.maid?S.maid.name:"cung nữ"} im lặng`,{w:{suc:1},r:[[X.A,-3]],k:[R6("không biết thật hư")]})]});
/* --- rumours: a named source with a motive; true or that source's lie; checking reveals the truth --- */
G6set("rumorPreg",{a:["rv","rv"],pp:()=>{const a=rv6(v=>v.rank>=1);if(a==null)return null;const b=rv6(v=>v.id!==a&&(aff(v,RV(a))<0||(v.ghen||0)>=40))??rv6(v=>v.id!==a);return b==null?null:{a0:a,a1:b}},
 v:["Người bên cung {B} rỉ tai: {A} có mang đã hai tháng, đang giấu. <i>(Lời đồn; thật hư chưa rõ.)</i>","Cung nữ của {B} kể khắp nơi: {A} lén mời bà đỡ ngoài cung vào. <i>(Lời đồn.)</i>","{B} bóng gió với các cung: dạo này {A} hay nôn, chỉ ăn đồ chua. <i>(Lời đồn.)</i>","Người bên {B} bảo {A} xin Thái y viện thuốc an thai. <i>(Lời đồn.)</i>","Người của {B} đồn {A} đã giả có mang để giữ sủng. <i>(Lời đồn.)</i>"]});
G6set("rumorEvidence",{pp:()=>{const a=rv6(v=>evG(v,S)>0||band6(v)>=1);return a==null?null:{a0:a}},v:E68I.rumorEvidence.v.map(t=>t+" <i>(Lời đồn.)</i>")});
G6set("rumorEmpLove",{a:["rv","rv"],pp:()=>{const a=rv6();if(a==null)return null;const b=rv6(v=>v.id!==a);return b==null?null:{a0:a,a1:b}},
 v:["Người bên cung {B} đồn: Hoàng thượng sắp phong {A} lên một bậc. <i>(Lời đồn.)</i>","{B} kể với các cung: Hoàng thượng đã chán {A}, cả tháng không lật thẻ nàng. <i>(Lời đồn.)</i>","Cung nữ của {B} bảo {A} được Thái hậu chấm làm Hoàng hậu tương lai. <i>(Lời đồn.)</i>","Người của {B} rỉ tai: {A} sắp bị đưa ra lãnh cung vì phạm lỗi. <i>(Lời đồn.)</i>"]});
G6set("rumorSpy",{pp:()=>{const a=sv6(s=>spyOther6(s)||netIs(s,"talk")||(s.loyal||50)<BAL.loy.low);return a==null||!S.maid?null:{a0:a}},v:E68I.rumorSpy.v.map(t=>t+" <i>(Lời đồn; có thể kiểm chứng.)</i>")});
G6set("rumorFavor",{vf:()=>S.sung<BAL.sungLv.th[0]?[0,3]:S.sung>=BAL.sungLv.th[1]?[1,2]:[0,1,2,3],v:E68I.rumorFavor.v.map(t=>t+" <i>(Lời đồn.)</i>")});
G6set("rumorTH",{vf:()=>S.th<10?[0]:S.th>=40?[1,2,3]:[0,1,2,3],v:E68I.rumorTH.v.map(t=>t+" <i>(Lời đồn.)</i>")});
/* --- children: real health and talent --- */
G6set("kidSick",{pp:()=>{const a=kid6(k=>k.age<=12&&((k.hp||100)<95||harsh()||wet()));return a==null?null:{a0:a,a1:0}}});
G6set("kidTutor",{vf:p=>{const k=(S.kids||[]).find(x=>x.name===p.a0);const t=k?k.tal||40:40;return t<40?[0,3]:t>=65?[1]:[2,3]}});
G6set("kidGift",{pp:()=>{const a=kid6(k=>k.age>=5&&(k.fond||0)>=35);return a==null?null:{a0:a}}});
/* --- court: the real house behind the consort --- */
G6set("clanFather",{pp:()=>{if(!td6())return null;const a=rv6(v=>{try{return !!tdHeadOf(v)}catch(e){return false}});return a==null?null:{a0:a}},vf:p=>{let h=null;try{h=tdHeadOf(RV(p.a0))}catch(e){}if(!h)return[];return h.corrupt?[0,1]:h.pow>=60?[2]:[1,3]}});
/* j7 rumours named a random consort as the culprit; now the culprit is a consort who really bears her ill will (or nobody) */
(function(){try{const h=()=>{const L=liveRivals(false).filter(v=>band6(v)>=1);return L.length?pick(L).id:null};
 if(EVI.ghost)EVI.ghost.pp=()=>({v:h()});if(EVI.guardrumour){const p0=EVI.guardrumour.pp;EVI.guardrumour.pp=()=>Object.assign(p0?p0():{},{v:h()})}}catch(e){}})();
/* the theft's options must not name the culprit before she finds out; the reporter is her maid */
G6set("hairpinThief",{who:()=>S.maid?pMaid():null,o:X=>{const G=[X.A,X.B,X.C][X.p.g];const hit=()=>relDo(G,BAL.eff.j68h.relHit);return[
 c6("Tra xét kỹ từng manh mối",{c:{suc:-6},p:od(40+S.tamco/3+S.mat*4),w:{tamco:1},wt:[G6("tìm ra kẻ lấy, lấy lại đồ"),R6(`kẻ lấy mất lòng ${balSg(BAL.eff.j68h.relHit)}`)],l:{danh:-1},lt:[R6("không ra manh mối, đồ mất")],ok:()=>{hit();try{G.o.cause={txt:"ăn cắp đồ của chủ",fault:true,w:wk()}}catch(e){}return `Vết sáp nến trên tay áo và lời chứng của tiểu thái giám chỉ đúng ${G.n}; đồ tìm thấy dưới gối ${G.n}. Ngươi có cớ để xử.`},no:()=>"Manh mối đứt, không ai bị buộc tội oan."}),
 c6("Nhờ Cung Chính ti tra",{c:{bac:-25},p:80,wt:[G6("tìm ra kẻ lấy"),R6(`kẻ lấy mất lòng ${balSg(BAL.eff.j68h.relHit)}`)],k:[R6("chuyện xấu lan ra ngoài: Danh -1")],l:{danh:-1},lt:[R6("tra không ra")],ok:()=>{hit();apply({danh:-1});try{G.o.cause={txt:"ăn cắp đồ của chủ",fault:true,w:wk()}}catch(e){}return `Cung Chính ti tra ra ${G.n}.`}}),
 c6("Cho kẻ lấy một đêm tự trả lại",{w:{duc:2},p:55,wt:[G6("đồ được trả, không ai mất mặt")],lt:[R6("không ai trả, đồ mất hẳn")],l:{tamco:-1},ok:()=>{relDo(G,BAL.eff.j68h.relOk);return "Sáng hôm sau đồ nằm lại trong tráp; ngươi không truy nữa."}})]}});
