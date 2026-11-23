/* ================= j68q (OR20): j68 life in LÃNH CUNG, as a SERVANT, and the HOÀNG HẬU's duties =================
   Plan: dev/handover/reports/road-triggers.md «HANDOVER — OR20» (E26). Wraps only (e68On / e68Cands / e68FuTick); edits no other module.
   (1) e68On also holds in her real lãnh cung (S.out from j14 cold(), not the srvW / kcW S.out=1 trick) and in a servant life (j42 isSrv).
   (2) e68Cands: in lãnh cung only s.life==="cold" templates, as a servant only s.life==="srv"; those two families never fire elsewhere;
       s.life==="hh" only when she is Hoàng hậu (S.rank ≥ BAL.voice.hq) and not in lãnh cung. Palace follow-ups wait until she is back.
   (3) Every amount from BAL.eff.j68q (one core). Every option gains AND costs (law 3); the three options of a card trade different things (law 2).
   (4) Real people only (law 6b): fallen consorts (rivals in lãnh cung), the one who framed her (S.framedBy), S.maid (the one the lãnh cung household cap keeps),
       the Tổng quản (S.court.tq), her mistress (srvM) and the maids of that palace, consorts, Thái hậu, the court doctor.
   (5) Two-way (law 1): a fallen consort takes her rice ⇄ she can take a fallen consort's; the framer gloats over her in lãnh cung ⇄ she can
       visit a consort SHE sent there; a fellow maid takes her credit ⇄ she can take that maid's; she judges consorts as Hoàng hậu ⇄ a consort
       she really wronged (a biased ruling, skimmed accounts: S.e68.q6, real proof, law 6a) accuses her before Thái hậu, and the defence can fail.
   (6) Harder as she climbs (law 5): every roll loses BAL.eff.j68q.rk[life] per rung (q6rk). */
function q6kc(){try{return typeof isKc==="function"&&isKc()}catch(e){return false}}
function q6srv(){try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}}
function q6cold(){return !!(S&&!S.dead&&S.out&&S.coldTurn!=null&&!q6srv()&&!q6kc())}
function q6hh(){return !!(S&&!S.out&&!q6srv()&&S.rank>=BAL.voice.hq)}
function q6life(){return q6cold()?"cold":q6srv()?"srv":"pal"}
function q6rk(){const L=q6life();return L==="cold"?(S.coldRank||0):L==="srv"?((S.srv&&S.srv.rk)||0):q6hh()?S.rank-BAL.voice.hq+1:0}
function q6od(b){const E=BAL.eff.j68q,L=q6life();return od(b-q6rk()*(E.rk[L==="pal"?"hh":L]||0))}
function q6st(){const e=e68();e.q6=e.q6||{bias:[],skim:0};return e.q6}
(function(){const o0=e68On;e68On=function(){if(o0.apply(this,arguments))return true;return !!(S&&!S.dead&&(q6cold()||q6srv()))}})();
(function(){const c0=e68Cands;e68Cands=function(){const L=c0.apply(this,arguments),lf=q6life(),hh=q6hh();
 return L.filter(([s])=>lf==="cold"?s.life==="cold":lf==="srv"?s.life==="srv":s.life!=="cold"&&s.life!=="srv"&&(s.life!=="hh"||hh))}})();
(function(){const f0=e68FuTick;e68FuTick=function(){const lf=q6life();if(lf==="pal")return f0.apply(this,arguments);const e=e68();
 const hold=e.fu.filter(f=>{const s=E68I[f.id];return !(s&&s.life===lf)});e.fu=e.fu.filter(f=>!hold.includes(f));try{return f0.apply(this,arguments)}finally{e.fu=e.fu.concat(hold)}}})();
/* actors */
function q6fallen(f){const L=rivals.filter(v=>v.alive&&v.out&&(!f||f(v)));return L.length?pick(L).id:null}
function q6framer(){const k=S.framedBy;if(k==null||k==="me"||k==="emp"||k==="th")return null;const v=RV(k);return v&&v.alive&&!v.out?v.id:null}
function q6mate(){const m=q6srv()?srvM():null;const L=m?(m.staff||[]).filter(s=>s&&s.sid!=null&&s.role==="maid"):[];return L.length?pick(L).sid:null}
function q6two(){const L=liveRivals(true).filter(v=>!v.confined);if(L.length<2)return null;const a=pick(L);const M=L.filter(v=>v!==a);const b=M.slice().sort((x,y)=>aff(y,a)-aff(x,a)).pop();return b?[a.id,b.id]:null}
/* real proof for the queen's accuser: a biased ruling (the consort ruled against) or skimmed lục cung accounts */
function q6accuser(){const q=q6st();for(const id of q.bias){const v=RV(id);if(v&&v.alive&&!v.out)return{a0:id,why:"b"}}
 if(q.skim>0){const v=rv6(v=>!v.queen);if(v!=null)return{a0:v,why:"s"}}return null}
function q6evAdd(){const E=BAL.eff.j68q;S.coldEv=(S.coldEv||0)+E.ev;if(S.coldEv>=BAL.coldEvNeed){restore(true,"Án được lật, ngươi được minh oan");return " Chứng cứ đã đủ."}return ` Chứng cứ: ${S.coldEv}/${BAL.coldEvNeed}.`}
const Q6=()=>BAL.eff.j68q;
/* the court office holders are real named people (S.court); no name → the card does not come */
function q6tq(){return S.court&&S.court.tq&&S.court.tq.name?0:null}
function q6ty(){return S.court&&S.court.ty&&S.court.ty.name?0:null}
/* ---------- LÃNH CUNG ---------- */
EV6("q6coldRice","day",{life:"cold",cd:Q6().cd,a:["eun"],pp:()=>q6cold()&&q6tq()!=null&&S.maid?{a0:0}:null,w:C=>q6cold()?Q6().w.mid:0,
 v:["{A} sai cắt khẩu phần lãnh cung; bát cơm đưa vào chỉ còn nửa, gạo mốc lẫn trấu.","Người của {A} mang cơm đến muộn hai ngày, cháo đã chua.","Nội vụ phủ dưới tay {A} quên phát dầu đèn cho lãnh cung; đêm đến chỉ còn ánh trăng."],
 o:X=>{const E=Q6();return[c6(`Dúi bạc cho người của ${X.A.n}`,{c:{bac:-E.bac.s},w:{suc:E.suc.m},r:[[X.A,E.rel.s]]}),
  c6("Chia phần ít ỏi cho người hầu",{c:{suc:-E.suc.s},w:{maid:E.loy.s,duc:E.st.s}}),
  c6("Nhịn đói, chép kinh qua ngày",{c:{suc:-E.suc.m},w:{duc:E.st.m,tamco:E.st.s}})]}});
EV6("q6coldMate","visit",{life:"cold",cd:Q6().cd,a:["rv"],pp:()=>{const a=q6cold()?q6fallen():null;return a==null?null:{a0:a}},w:C=>Q6().w.hi,
 v:["{A}, phế phi ở dãy phòng bên, gõ cửa xin ngươi một mảnh chăn; đêm qua nàng rét không ngủ được.","{A} ngồi bên giếng cạn, kể chuyện lục cung năm nàng còn được sủng.","Nửa đêm, {A} khóc gọi tên đứa con đã mất; cả dãy lãnh cung thức trắng."],
 o:X=>{const E=Q6();return[c6("Chia chăn, ngồi cùng nàng",{c:{suc:-E.suc.m},r:[[X.A,E.rel.l]],w:{duc:E.st.s}}),
  c6("Nghe chuyện cũ, dò tin lục cung",{c:{suc:-E.suc.s},p:q6od(E.od.talk+S.tamco/E.dv),w:{mat:E.st.m},wt:[G6("biết thêm chuyện cũ trong cung")],r:[[X.A,E.rel.s]],lr:[[X.A,-E.rel.m]],lt:[R6("nàng thấy ngươi dò hỏi")]}),
  c6("Đóng cửa, giữ sức mình",{w:{suc:E.suc.m},r:[[X.A,-E.rel.m]]})]}});
EV6("q6coldTake","day",{life:"cold",cd:Q6().cd,a:["rv"],pp:()=>{const a=q6cold()?q6fallen():null;return a==null?null:{a0:a}},w:C=>Q6().w.mid,
 v:["Bát cơm của ngươi để ngoài hiên bị {A} lấy mất; nàng nói đói quá, không nhịn nổi.","{A} lén lấy nửa bó củi ngươi nhặt được, đem về sưởi phòng mình.","{A} đổi tấm chăn rách của nàng lấy tấm chăn lành của ngươi lúc ngươi ra giếng."],
 o:X=>{const E=Q6();return[c6(`Sang đòi lại từ ${X.A.n}`,{c:{suc:-E.suc.s},p:q6od(E.od.take+S.danh/E.dv),w:{suc:E.suc.m},wt:[G6("lấy lại được đồ")],r:[[X.A,-E.rel.s]],lr:[[X.A,-E.rel.m]],lt:[R6("nàng giằng co, không trả")]}),
  c6("Lấy phần của nàng bù lại",{w:{suc:E.suc.m,tamco:E.st.s},r:[[X.A,-E.rel.l]],k:[R6(`Đức -${E.st.s}`),R6("nàng sẽ tìm cách trả đũa")],ok:()=>{apply({duc:-E.st.s});return `Ngươi lấy lại bằng phần của ${X.A.n}.`}}),
  c6("Bỏ qua, thương người cùng cảnh",{c:{suc:-E.suc.s},w:{duc:E.st.m},r:[[X.A,E.rel.m]]})]}});
EV6("q6coldGloat","visit",{life:"cold",cd:Q6().cd,a:["rv"],pp:()=>{const a=q6cold()?q6framer():null;return a==null?null:{a0:a}},w:C=>Q6().w.hi,
 v:["{A} — kẻ đẩy ngươi vào đây — khoác áo gấm đến trước cửa lãnh cung, cười hỏi ngươi ăn ngủ có quen không.","{A} sai cung nữ mang đến một đĩa bánh thừa, nhắn: 'Nương nương nhà ta nhớ người cũ.'","{A} đứng ngoài song cửa, kể Hoàng thượng đã quên tên ngươi."],
 o:X=>{const E=Q6();return[c6("Nhẫn nhục, dụ nàng lỡ lời",{c:{suc:-E.suc.s},p:q6od(E.od.gloat+S.tamco/E.dv),wt:[G6(evSg(E.ev,1))],lt:[R6("nàng kín miệng, chỉ cười")],l:{danh:-E.st.s},ok:()=>`${X.A.n} đắc ý lỡ lời về vụ án năm ấy.`+q6evAdd()}),
  c6("Mắng trả cho hả giận",{w:{suc:E.suc.s,sac:E.st.s},wt:[G6("hả giận")],r:[[X.A,-E.rel.l]],k:[R6("nàng oán thêm, còn ở ngoài kia")]}),
  c6("Quỳ xin nàng nương tay",{w:{suc:E.suc.m},r:[[X.A,E.rel.m]],k:[R6(`Danh -${E.st.m}`)],ok:()=>{apply({danh:-E.st.m});return `${X.A.n} hả hê bỏ đi.`}})]}});
EV6("q6coldLetter","serv",{life:"cold",cd:Q6().cd,a:["maid"],pp:()=>q6cold()&&S.maid?{a0:0}:null,w:C=>Q6().w.mid,
 v:["{A} — người còn ở lại với ngươi — xin liều mang thư của ngươi ra ngoài.","{A} quen một thị vệ gác cổng; hắn chịu đưa tin, nhưng đòi bạc.","{A} nghe tin Hoàng thượng sắp ngự giá qua Tây cung, xin mang thư của ngươi ra đón đường."],
 o:X=>{const E=Q6();return[c6("Nhờ đưa thư lên Hoàng thượng",{c:{bac:-E.bac.s},p:q6od(E.od.letter+(S.an||0)/E.dv),w:{sung:E.st.m,an:E.st.s},r:[[X.A,E.loy.s]],l:{suc:-E.suc.s},lr:[[X.A,-E.loy.m]],lt:[R6("thư bị lính gác thu")]}),
  c6("Giữ người ấy lại, không cho liều",{w:{suc:E.suc.s},r:[[X.A,E.loy.m]],k:[R6("bỏ lỡ dịp đưa tin")]}),
  c6("Thưởng hết chút bạc còn lại",{c:{bac:-E.bac.m},r:[[X.A,E.loy.l]],w:{tamco:E.st.s}})]}});
EV6("q6coldWinter","sea",{life:"cold",cd:Q6().cd,a:["rv"],pp:()=>{const a=q6cold()?q6fallen():null;return a==null?null:{a0:a}},w:C=>q6cold()&&C.sea==="Đông"?Q6().w.hi:0,
 v:["Tuyết rơi dày; {A} nằm co trong phòng bên, hơi thở yếu dần.","Gió bấc thổi vỡ giấy song cửa phòng {A}; nàng sốt mê man.","{A} gom cỏ khô đốt sưởi, khói mù cả dãy lãnh cung."],
 o:X=>{const E=Q6();return[c6("Cởi áo bông đắp cho nàng",{c:{suc:-E.suc.l},r:[[X.A,E.rel.l]],w:{duc:E.st.l}}),
  c6("Dúi bạc xin lính gác ít than",{c:{bac:-E.bac.m},w:{suc:E.suc.m},r:[[X.A,E.rel.s]]}),
  c6("Lo thân mình trước",{w:{suc:E.suc.m},r:[[X.A,-E.rel.s]],k:[R6(`Đức -${E.st.s}`)],ok:()=>{apply({duc:-E.st.s});return "Ngươi đóng cửa, nghe gió rít suốt đêm."}})]}});
/* the reverse of q6coldGloat (law 1): she, free, may visit the consort she sent to lãnh cung */
EV6("q6visitCold","visit",{life:"",cd:Q6().cd,a:["rv"],pp:()=>{if(S.out||q6srv())return null;const a=q6fallen(v=>v.coldBy==="me");return a==null?null:{a0:a}},w:C=>Q6().w.lo,
 v:["Tin từ lãnh cung: {A}, người ngươi đưa vào đó, ốm liệt giường; ngươi có thể ghé qua.","Đi ngang Tây cung, ngươi nghe tiếng {A} đọc kinh sau bức tường lãnh cung.","{A} nhờ lính gác nhắn: muốn gặp ngươi một lần."],
 o:X=>{const E=Q6();return[c6("Đến xem nàng, nói cho nàng biết ai thắng",{c:{suc:-E.suc.s},w:{sac:E.st.s,tamco:E.st.s},r:[[X.A,-E.rel.l]],k:[R6(`Đức -${E.st.m}`)],ok:()=>{apply({duc:-E.st.m});return `${X.A.n} nhìn ngươi, không nói một lời.`}}),
  c6("Gửi áo ấm, không lộ mặt",{c:{bac:-E.bac.s},w:{duc:E.st.m},r:[[X.A,E.rel.m]]}),
  c6("Đến dò xem nàng còn giữ gì",{c:{suc:-E.suc.s},p:q6od(E.od.visit+eyes(S)*E.st.m),w:{mat:E.st.m},wt:[G6("biết nàng còn giữ gì")],lr:[[X.A,-E.rel.m]],lt:[R6("nàng đuổi ngươi ra")]})]}});
/* ---------- CUNG NỮ (servant life) ---------- */
EV6("q6srvCredit","serv",{life:"srv",cd:Q6().cd,a:["sv","rv"],pp:()=>{if(!q6srv())return null;const a=q6mate(),m=srvM();return a==null||!m?null:{a0:a,a1:m.id}},w:C=>Q6().w.hi,
 v:["Áo của {B} do ngươi thêu suốt đêm, nhưng {A} dâng lên và nhận lời khen.","{A} nhận công pha trà ngươi đã pha, {B} thưởng nàng một chiếc vòng bạc.","Ngươi thấy {A} lười trực đêm; sáng ra, việc của nàng nằm sẵn trên tay ngươi."],
 o:X=>{const E=Q6();return[c6("Nhịn, giữ hòa khí",{w:{duc:E.st.s},r:[[X.A,E.loy.m]],k:[R6(`Chủ tin -${E.tin.s}`)],ok:()=>{apply({tin:-E.tin.s});return `${X.A.n} nhìn ngươi, có phần áy náy.`}}),
  c6(`Tâu thật với ${X.B.n}`,{c:{suc:-E.suc.s},p:q6od(E.od.credit+S.tamco/E.dv),w:{tin:E.tin.m},r:[[X.A,-E.loy.m]],l:{tin:-E.tin.s},lt:[R6("chủ nhân cho ngươi đặt điều")]}),
  c6(`Nhận luôn việc của ${X.A.n}`,{w:{tin:E.tin.m},r:[[X.A,-E.loy.l]],k:[R6("nàng sẽ trả đũa")]})]}});
EV6("q6srvMood","serv",{life:"srv",cd:Q6().cd,a:["rv"],pp:()=>{const m=q6srv()?srvM():null;return m&&m.alive?{a0:m.id}:null},w:C=>Q6().w.mid,
 v:["{A} mất ngủ, cả cung phải thức; người gọi ngươi vào xoa bóp.","{A} vừa bị Hoàng hậu trách, về cung ném vỡ chén trà.","{A} thèm bánh hoa quế ở quê nhà, hỏi trong cung ai làm được."],
 o:X=>{const E=Q6();return[c6("Thức hầu đến sáng",{c:{suc:-E.suc.m},w:{tin:E.tin.m}}),
  c6("Bỏ bạc nhờ bếp làm cho người",{c:{bac:-E.bac.s},w:{tin:E.tin.s},r:[[X.A,E.rel.s]]}),
  c6("Dỗ khéo vài câu rồi lui",{p:q6od(E.od.cheer+S.tai/E.dv),w:{tin:E.tin.s,suc:E.suc.s},l:{tin:-E.tin.s},lt:[R6("người càng bực")]})]}});
EV6("q6srvQuan","serv",{life:"srv",cd:Q6().cd,a:["eun"],pp:()=>q6srv()&&q6tq()!=null?{a0:0}:null,w:C=>Q6().w.mid,
 v:["Người của {A} chia việc: ai không có 'lệ phí' phải gánh nước giếng xa.","Dưới tay {A}, quản sự bắt cung nữ mới giặt đồ cho cả dãy.","{A} dò xét cung nữ các cung; ai không vừa mắt sẽ bị điều đi Tân Giả khố."],
 o:X=>{const E=Q6();return[c6("Đút bạc cho quản sự",{c:{bac:-E.bac.s},w:{suc:E.suc.m},r:[[X.A,E.rel.s]]}),
  c6("Làm cật lực, không kêu ca",{c:{suc:-E.suc.m},w:{tin:E.tin.s,duc:E.st.s}}),
  c6("Tố quản sự lên chủ nhân",{p:q6od(E.od.quan+S.danh/E.dv),w:{tin:E.tin.s,danh:E.st.s},r:[[X.A,-E.rel.m]],l:{suc:-E.suc.m},lt:[R6("bị gánh thêm việc nặng")]})]}});
EV6("q6srvPass","emp",{life:"srv",cd:Q6().cd,a:["emp"],pp:()=>q6srv()?{a0:0}:null,w:C=>Q6().w.lo,
 v:["Hoàng thượng đi ngang hành lang lúc ngươi đang quét lá.","Ngài dừng ở ngự hoa viên, hỏi cung nữ nào biết tên loài hoa ấy.","Ngài ghé cung chủ nhân, ngươi được sai dâng trà."],
 o:X=>{const E=Q6();return[c6("Cúi đầu đúng phép",{w:{duc:E.st.s,tin:E.tin.s},k:[R6("ngài không nhìn ngươi")]}),
  c6("Ngẩng lên, đáp một câu khéo",{p:q6od(E.od.pass+S.sac/E.dv),w:{nt:E.nt.m},l:{tin:-E.tin.m},lt:[R6("chủ nhân thấy ngươi lẳng lơ")]}),
  c6("Lánh vào trong",{w:{suc:E.suc.s,tin:E.tin.s},k:[R6("lỡ một dịp được ngài để ý")]})]}});
/* ---------- HOÀNG HẬU (duties of the seat) ---------- */
EV6("q6hhLate","day",{life:"hh",cd:Q6().cd,a:["rv"],pp:()=>{const a=q6hh()?rv6(v=>!v.queen):null;return a==null?null:{a0:a}},w:C=>Q6().w.hi,
 v:["Buổi thỉnh an sớm ở Khôn Ninh cung, {A} lại đến muộn, cả lục cung chờ.","{A} cáo bệnh không đến thỉnh an đã ba buổi, nhưng chiều nào cũng ra ngự hoa viên.","{A} đến thỉnh an, ăn mặc lộng lẫy hơn cả ngươi."],
 o:X=>{const E=Q6();return[c6("Phạt quỳ trước lục cung",{w:{danh:E.st.m},r:[[X.A,-E.rel.m]],k:[R6("nàng oán")]}),
  c6("Khoan dung, nhắc nhẹ",{w:{duc:E.st.m},r:[[X.A,E.rel.s]],k:[R6(`Danh -${E.st.s}, kẻ khác bắt chước`)],ok:()=>{apply({danh:-E.st.s});return `${X.A.n} cúi đầu tạ ơn.`}}),
  c6("Gặp riêng, hỏi rõ duyên cớ",{c:{suc:-E.suc.s},p:q6od(E.od.late+S.tamco/E.dv),w:{mat:E.st.m},wt:[G6("biết duyên cớ thật")],l:{danh:-E.st.s},lt:[R6("nàng nói quanh")]})]}});
EV6("q6hhLedger","day",{life:"hh",cd:Q6().cd,a:["eun"],pp:()=>q6hh()&&q6tq()!=null?{a0:0}:null,w:C=>Q6().w.mid,
 v:["Cuối quý, {A} dâng sổ chi tiêu lục cung lên ngươi duyệt.","Sổ bổng lộc tháng này lệch; {A} nói là do Nội vụ phủ chép nhầm.","Kho lụa thiếu ba chục xấp, {A} xin ngươi định đoạt."],
 o:X=>{const E=Q6();return[c6("Tự tra từng trang",{c:{suc:-E.suc.m},p:q6od(E.od.ledger+S.tai/E.dv),w:{danh:E.st.m,mat:E.st.s},l:{suc:-E.suc.s},lt:[R6("không tìm ra chỗ lệch")]}),
  c6(`Giao cho ${X.A.n} lo`,{w:{suc:E.suc.m},r:[[X.A,E.rel.m]],k:[R6("sai sót thì ngươi chịu tiếng")]}),
  c6("Lặng lẽ giữ phần dư",{w:{bac:E.bac.l},k:[R6(`Đức -${E.st.m}`),R6("sổ còn đó, có người tra ra được")],ok:()=>{apply({duc:-E.st.m});q6st().skim++;return "Phần dư vào kho riêng của ngươi."}})]}});
EV6("q6hhJudge","day",{life:"hh",cd:Q6().cd,a:["rv","rv"],pp:()=>{const t=q6hh()?q6two():null;return t?{a0:t[0],a1:t[1]}:null},w:C=>Q6().w.hi,
 v:["{A} và {B} cãi nhau giữa ngự hoa viên vì một cành mẫu đơn, cùng đến xin ngươi phân xử.","{A} tố {B} xui cung nữ đổ nước bẩn trước cửa cung nàng.","{A} và {B} tranh nhau buổi hầu Thái hậu, kêu lên ngươi."],
 o:X=>{const E=Q6();return[c6("Xử theo lý, tra cho rõ",{c:{suc:-E.suc.m},p:q6od(E.od.judge+S.duc/E.dv),w:{danh:E.st.m,duc:E.st.s},lr:[[X.A,-E.rel.s],[X.B,-E.rel.s]],lt:[R6("cả hai cho ngươi xử ẩu")]}),
  c6(`Xử cho ${X.A.n} thắng`,{r:[[X.A,E.rel.l],[X.B,-E.rel.l]],w:{tamco:E.st.s},k:[R6(`${X.B.n} ghi hận, có thể kêu lên Thái hậu`)],ok:()=>{const q=q6st();if(!q.bias.includes(X.B.o.id))q.bias.push(X.B.o.id);return `${X.A.n} đắc ý; ${X.B.n} cắn môi lui ra.`}}),
  c6("Hòa giải, mỗi người nhường một bước",{c:{suc:-E.suc.s},r:[[X.A,E.rel.s],[X.B,E.rel.s]],w:{duc:E.st.s},k:[R6("chuyện chưa dứt hẳn")]})]}});
EV6("q6hhRite","court",{life:"hh",cd:Q6().cd,a:["th","rv"],pp:()=>{if(!q6hh()||S.thDead)return null;const a=rv6(v=>!v.queen);return a==null?null:{a0:0,a1:a}},w:C=>(C.m===3||C.m===9)?Q6().w.hi:Q6().w.lo,
 v:["Sắp đến lễ Thân tằm; Hoàng hậu phải dẫn lục cung hái dâu tế Tiên tằm.","Lễ tế Tiên nông, ngươi phải lo nghi trượng cho cả hậu cung.","Thái hậu muốn ngươi đứng ra lo yến mừng thọ, {B} xin được phụ."],
 o:X=>{const E=Q6();return[c6("Tự lo trọn lễ",{c:{suc:-E.suc.l},w:{th:E.rel.m,danh:E.st.m}}),
  c6(`Giao phần việc cho ${X.B.n}`,{w:{suc:E.suc.s},r:[[X.B,E.rel.m]],k:[R6(`Thái hậu với ngươi -${E.st.m}`)],ok:()=>{apply({th:-E.st.m});return `${X.B.n} lo được nửa phần, Thái hậu chê ngươi lười.`}}),
  c6("Bỏ bạc làm lễ thật lớn",{c:{bac:-E.bac.l},w:{th:E.rel.s,sung:E.st.m}})]}});
EV6("q6hhAccused","visit",{life:"hh",cd:Q6().cd,a:["rv","th"],pp:()=>{if(!q6hh()||S.thDead)return null;const r=q6accuser();return r?{a0:r.a0,a1:0,why:r.why}:null},w:C=>Q6().w.hi,
 v:["{A} quỳ trước Đức Thọ cung, tâu Hoàng hậu xử việc thiên lệch; Thái hậu cho gọi ngươi sang.","{A} dâng thư lên Thái hậu: sổ sách lục cung có chỗ khuất tất.","Thái hậu nghe {A} kể chuyện lục cung, cho người mời ngươi đến đối chất."],
 vf:p=>p.why==="s"?[1]:[0,2],
 o:X=>{const E=Q6(),why=X.p.why,clr=()=>{const q=q6st();if(why==="s")q.skim=0;else q.bias=q.bias.filter(i=>i!==X.A.o.id)};return[
  c6("Nhận lỗi trước Thái hậu",{w:{duc:E.st.m},r:[[X.A,E.rel.m]],k:[R6(`Danh -${E.st.m}`)],ok:()=>{apply({danh:-E.st.m});clr();return "Thái hậu gật đầu, việc khép lại."}}),
  c6("Một mực chối",{p:q6od(E.od.deny+S.tamco/E.dv),w:{danh:E.st.s},wt:[G6("Thái hậu bỏ qua")],r:[[X.A,-E.rel.m]],l:{th:-E.rel.m,danh:-E.st.l},lt:[R6("chứng cứ rõ ràng, Thái hậu không tin ngươi")],no:()=>{clr();return `${X.A.n} đưa chứng cứ ra trước mặt Thái hậu.`}}),
  c6(`Bù đắp cho ${X.A.n}`,{c:{bac:-E.bac.m},r:[[X.A,E.rel.l]],w:{th:E.st.s},ok:()=>{clr();return `${X.A.n} rút đơn, không nhắc lại.`}})]}});
/* tuyển tú (plan point 3): the girls are real NPCs only once they have entered (j27 tuyenTu → rivals); the Hoàng hậu then receives them */
(function(){if(typeof tuyenTu!=="function")return;const t0=tuyenTu;tuyenTu=function(){const n0=rivals.length;const r=t0.apply(this,arguments);try{if(S)rivals.slice(n0).forEach(v=>{v.ttY=S.year})}catch(x){}return r}})(); /* the stamp lives on the consort (one world: both co-op seats read it) */
function q6new(){const q=q6st();q.met=q.met||[];const L=rivals.filter(v=>v.alive&&!v.out&&v.ttY!=null&&S.year-v.ttY<=1&&!q.met.includes(v.id));return L.length?pick(L).id:null}
EV6("q6hhNew","day",{life:"hh",cd:Q6().cd,a:["rv"],pp:()=>{const a=q6hh()?q6new():null;return a==null?null:{a0:a}},w:C=>Q6().w.hi,
 v:["Tân nhân của kỳ tuyển tú vào Khôn Ninh cung bái kiến; {A} quỳ hàng đầu.","{A}, tú nữ mới vào, chưa thuộc lễ nghi, đi sai chỗ trong buổi thỉnh an.","Nội vụ phủ xin Hoàng hậu định chỗ ở cho {A} và các tân nhân."],
 o:X=>{const E=Q6(),done=()=>{const q=q6st();q.met=q.met||[];if(!q.met.includes(X.A.o.id))q.met.push(X.A.o.id)};return[c6("Tự dạy lễ nghi cho tân nhân",{c:{suc:-E.suc.m},w:{danh:E.st.m},r:[[X.A,E.rel.s]],ok:()=>{done();return `${X.A.n} khấu đầu tạ ơn Hoàng hậu.`}}),
  c6(`Ban lễ, kéo ${X.A.n} về bên mình`,{c:{bac:-E.bac.m},r:[[X.A,E.rel.l]],k:[R6("phi tần cũ dè chừng ngươi")],ok:()=>{done();return `${X.A.n} nhận lễ, từ nay hay lui tới cung ngươi.`}}),
  c6(`Thử tài ${X.A.n} trước lục cung`,{c:{suc:-E.suc.s},p:q6od(E.od.newT+S.tai/E.dv),w:{mat:E.st.m,danh:E.st.s},wt:[G6("biết tài tân nhân")],lr:[[X.A,-E.rel.m]],lt:[R6("nàng thấy bị làm nhục")],ok:()=>{done();return `Ngươi đã biết ${X.A.n} giỏi gì.`},no:()=>{done();return `${X.A.n} lúng túng giữa lục cung.`}})]}});
EV6("q6hhSick","visit",{life:"hh",cd:Q6().cd,a:["rv","doc"],pp:()=>{const a=q6hh()&&q6ty()!=null?rv6(v=>!v.queen):null;return a==null?null:{a0:a,a1:0}},w:C=>Q6().w.mid,
 v:["{A} lâm bệnh đã mấy ngày; theo lệ, Hoàng hậu phải hỏi han lục cung.","Cung {A} báo nàng ho ra máu, {B} chưa kịp đến.","{A} sinh nở xong yếu sức, Thái hậu nhắc ngươi lo cho chu toàn."],
 o:X=>{const E=Q6();return[c6("Tự sang thăm, ngồi bên giường",{c:{suc:-E.suc.m},r:[[X.A,E.rel.l]],w:{duc:E.st.s}}),
  c6(`Sai ${X.B.n} sang, ban thuốc quý`,{c:{bac:-E.bac.m},r:[[X.A,E.rel.m]],w:{danh:E.st.s}}),
  c6("Chỉ sai người hỏi han",{w:{suc:E.suc.s},r:[[X.A,-E.rel.s]],k:[R6("lục cung chê Hoàng hậu lạnh nhạt")],wt:[G6("giữ sức cho việc lớn")]})]}});
