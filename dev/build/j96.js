/* ================= j96 THANH MAI TRÚC MÃ (owner 11/14): mạch tình kéo dài cả đời, ba chương trong chính tuyến j67 =================
   Ai: con gái Tể tướng (tt), Đại tướng quân (dtq), nhà buôn muối (muoi), thầy đồ (thd), cháu Thái hậu (ch), tội thần (td), công chúa Nam Chiếu (nc).
   Người ấy là một nam nhân THẬT trong S.men (j22): tên, mặt có sẵn (không hồng tím), vai trò, chỉ số tình (m.tinh, hắn với nàng),
   lui tới nơi hợp vai (S.menW, bản ghi vị trí của j22; nếu sau này có bản ghi j95 thì đọc từ đó). Lòng nàng với hắn: S.tm96.h.
   Ba chương: tm96a đầu đời (tiến cung, gặp lại, tín vật) · tm96b giữa đời (liều mình, nghi ngờ, giá họa, Hoàng thượng thử lòng) ·
   tm96c cuối đời (lựa chọn lớn, kết cục). Kết chương trước quyết định hồi mở đầu của chương sau (S.tm96.endA / endB).
   Kết cục cuối: đồng minh trên triều · tác thành cho chàng cưới người khác · chàng chết vì nàng · tư thông bại lộ (j22 affairExposed)
   · một đêm rồi thôi · lỡ làng (bỏ mặc quá hạn) · hiếm: giả chết rời cung cùng nhau (over()).
   Đăng ký vào ARC67 (o:"tm", không vào bể xuất thân hay bể chung); chèn "st:tm96a/b/c" vào kế hoạch chương lúc nhập cung, bỏ hai chương chung
   để đời vẫn khoảng mười bốn chương. Kiếp cũ (không có S.tm96) không đổi gì.
   Cờ: window.TM96_ON (mặc định bật) · trọng số TM96_W theo xuất thân · localStorage "ctm-tm96" = "1" (luôn có) / "0" (không bao giờ).
   Lựa chọn trong chương chỉ hiện chi phí (OWNER_DECISIONS 11/14); thẻ kết quả vẫn ghi đủ số. */
window.TM96_ON=window.TM96_ON!==false;
const TM96_W={tt:.55,dtq:.55,muoi:.55,thd:.65,ch:.5,td:.6,nc:.55};
const TM96V={
 tt:{role:"Hàn lâm học sĩ",pre:"Hàn lâm",up:"Ngự sử đại phu",fr:"official",fid:["official:o3","official:o6","official:o2"],haunts:["thu","vuon"],
  bg:"bạn học cùng tư thục trong phủ Tể tướng, môn sinh cha ngươi quý nhất",how:"đỗ đầu kỳ thi Hội, vào Hàn lâm viện, ngày ngày dâng sách vào Cần Chính điện",
  tok:"chiếc trâm bạch ngọc chàng tự tay khắc",force:"Cha ngươi cần một quân cờ bên long sàng. Đêm trước ngày tuyển tú, ngươi đứng sau bình phong nghe ông nói với chàng: “Ngươi còn muốn làm quan thì quên nó đi.”",
  route:"kẹp trong một tập thơ chép tay Hàn lâm viện dâng vào cung",risk:"dâng sớ can gián, đòi xét lại vụ tham ô người ta đang đổ lên đầu nhà ngươi",bride:"tiểu thư nhà Thượng thư bộ Lễ"},
 dtq:{role:"Thống lĩnh cấm quân",pre:"Thống lĩnh",up:"Cửu môn đề đốc",fr:"guard",fid:["man:thive-2","man:thive-1"],haunts:["thu","vuon"],
  bg:"phó tướng của cha ngươi ở biên ải, người dạy ngươi cưỡi ngựa bắn cung",how:"lập công ở biên ải, được điều về kinh nắm cấm quân, đêm đêm tuần quanh hậu cung",
  tok:"nửa mũi tên đầu bạc chàng bẻ đôi, mỗi người giữ một nửa",force:"Chiếu tuyển tú đến giữa lúc cha ngươi bị nghi nắm binh quyền quá lớn. Đưa con gái vào cung là lời thề trung thành. Chàng đứng ngoài cổng doanh trại suốt đêm, không vào.",
  route:"giấu trong ống tay áo một tên cấm quân đổi gác",risk:"tự ý đổi lịch tuần đêm để che một sai sót của cung nhân nhà ngươi",bride:"quận chúa con Tĩnh vương"},
 muoi:{role:"Thị lang Hộ bộ",pre:"Thị lang",up:"Thượng thư Hộ bộ",fr:"official",fid:["official:o6","official:o2","official:o1"],haunts:["thu"],
  bg:"con nhà buôn tơ lụa cạnh nhà, cùng ngươi lớn lên giữa những kiện hàng",how:"bán nửa gia sản mua một chức quan, nay là Thị lang Hộ bộ, ra vào Cần Chính điện",
  tok:"chiếc khăn lụa Tô Châu thêu đôi uyên ương",force:"Cha ngươi bỏ cả gia sản muối đổi lấy một chỗ trong danh sách tuyển tú. Nhà chàng mang lễ dạm hỏi đến chậm ba ngày.",
  route:"lẫn trong hòm vải cống của Hộ bộ",risk:"lấy bạc riêng bù khoản thiếu hụt mà kẻ khác vu cho người nhà ngươi trong sổ muối",bride:"tiểu thư con quan Tri phủ"},
 thd:{role:"Trạng nguyên, Hàn lâm tu soạn",pre:"Trạng nguyên",up:"Thị giảng học sĩ, thầy dạy các hoàng tử",fr:"official",fid:["official:o2","official:o1","official:o5"],haunts:["thu","vuon"],
  bg:"học trò nghèo cha ngươi nuôi ăn học, cùng ngươi chép sách dưới đèn dầu",how:"đỗ Trạng nguyên, được vào Hàn lâm viện, thường được gọi vào cung giảng sách",
  tok:"cây bút lông cũ chàng dùng viết bài thơ đầu tiên tặng ngươi",force:"Năm ấy nhà không còn tiền thuốc cho cha. Bạc thưởng của Nội vụ phủ cho nhà có con gái nhập cung đủ cứu ông một mạng. Chàng chưa thi, chưa có gì để giữ ngươi lại.",
  route:"kẹp giữa trang sách Hàn lâm viện gửi vào cung",risk:"từ chối mối hôn của nhà Tể tướng, đắc tội cả nửa triều đình",bride:"con gái Tể tướng"},
 ch:{role:"Vương gia",pre:"Vương gia",up:"Thân vương chưởng Tông nhân phủ",fr:"royal",fid:["man:vuonggia-1","man:vuonggia-2"],haunts:["vuon","tn"],
  bg:"biểu ca, con trai út của Thái hậu, cùng ngươi lớn lên trong Đức Thọ cung",how:"là em Hoàng thượng, ra vào Đức Thọ cung và Ngự hoa viên như nhà mình",
  tok:"miếng ngọc bội hình cá chép chàng tặng năm ngươi mười sáu tuổi",force:"Thái hậu cần người nhà ngồi cạnh Hoàng thượng. Bà nắm tay ngươi: “Con vào cung, nhà ta mới yên.” Biểu ca quỳ ngoài điện cả buổi, bà không cho vào.",
  route:"kẹp trong hộp điểm tâm Đức Thọ cung ban xuống",risk:"cãi lời Thái hậu ngay trước mặt các tông thân để bênh ngươi",bride:"tiểu thư nhà Đại học sĩ"},
 td:{role:"Thái y",pre:"Thái y",up:"Viện phán Thái y viện",fr:"physician",fid:["man:thaiy-1","physician:p1","physician:p3"],haunts:["tyv"],
  bg:"hôn phu đã định từ thuở nhỏ, trước khi nhà ngươi mang tội",how:"bỏ thi cử, học nghề y, vào Thái y viện để được ở gần ngươi",
  tok:"nửa tờ hôn thư đã cháy sém",force:"Nhà ngươi bị xử trảm, hôn ước tan theo. Ngươi đổi tên vào cung để báo thù. Đêm cuối, chàng tìm được ngươi ở bến sông, chỉ kịp nói: “Ta sẽ tìm nàng.”",
  route:"gói trong một thang thuốc bổ Thái y viện gửi sang",risk:"lén đổi bát thuốc có độc người ta dâng cho ngươi, rồi ghi bệnh án giả để che",bride:"con gái Viện sứ Thái y viện"},
 nc:{role:"Phó sứ Nam Chiếu",pre:"Phó sứ",up:"Đại sứ Nam Chiếu thường trú ở kinh thành",fr:"man",fid:["man:suthan-2","man:suthan-1"],haunts:["thu","vuon"],sur:["Đoàn","Mông"],
  bg:"võ sĩ hộ vệ của ngươi ở cố quốc Nam Chiếu",how:"xin theo sứ đoàn Nam Chiếu làm phó sứ, vượt núi đến kinh thành",
  tok:"chiếc vòng bạc chạm hoa trà, vật của mẹ chàng",force:"Phụ vương gả ngươi sang hòa thân để đổi lấy mười năm yên ổn nơi biên giới. Chàng cưỡi ngựa theo kiệu hoa đến tận cửa ải rồi phải quay về.",
  route:"giấu trong cống phẩm sứ đoàn dâng lên",risk:"đứng ra nhận tội thay khi sứ đoàn bị vu mang thư mật cho ngươi",bride:"một tiểu thư nhà quan được Hoàng thượng ban hôn để giữ chân sứ đoàn"}};
function T96(){return S&&S.tm96||null}
function V96(){const t=T96();return t?TM96V[t.k]:null}
function man96(){const t=T96();if(!t)return null;return (S.men||[]).find(m=>m.id===t.mid)||null}
function live96(){const m=man96();return !!(m&&m.alive)}
function adj96(d){const t=T96(),m=man96();if(!t)return;if(d.h)t.h=cl((t.h||0)+d.h,0,100);if(d.t&&m)m.tinh=cl((m.tinh||0)+d.t,0,100);if(d.sus)t.sus=cl((t.sus||0)+d.sus,0,100);
 /*evok: affair-case store (j96), not consort evidence*/if(d.ev)t.ev=Math.max(0,(t.ev||0)+d.ev);if(d.rise)t.rise=(t.rise||0)+d.rise;if(d.lt&&m){m.letters=(m.letters||0)+d.lt;S.aff=S.aff||{};S.aff[m.id]=(S.aff[m.id]||0)+d.lt}}
function hasEv96(){const m=man96(),t=T96();return !!(t&&((t.ev||0)>0||(m&&(m.letters||0)>0)||t.tok))}
function tinh96(){const m=man96();return m?m.tinh||0:0}
/* where he is: the one location ledger (j95 if present, else j22 S.menW). If the ledger has him nowhere this buổi, he goes to his first haunt now
   and the ledger is written, so the story card never says a place the map contradicts. */
function loc96(){const m=man96();if(!m)return"vuon";try{if(typeof rosterWhere==="function"){const w=rosterWhere(m);if(w)return w}}catch(e){}
 S.menW=S.menW||{};if(!S.menW[m.id]){S.menW[m.id]=m.haunts[0]||"vuon"}return S.menW[m.id]}
/* motive gate: the shared gate when present (j95), else the real relation must give a reason */
function gate96(v,act){try{if(typeof motiveGate==="function")return motiveGate(v,S,act)!==false;if(typeof motiveOk==="function")return motiveOk(v,S,act)!==false}catch(e){}
 return !!(v&&(rel(v,S)<0||(v.ghen||0)>=55||oan(v,S)>=15))}
function foe96(A){const t=T96();if(t&&t.foe!=null){const v=RV(t.foe);if(rvOk67(v)&&gate96(v,"accuse")){A.act.v=v.id;return v}}const v=rv67(A,"v");if(v&&gate96(v,"accuse"))return v;
 const used=Object.values(A.act||{});const L=liveRivals(false).filter(x=>!used.includes(x.id)&&gate96(x,"accuse"));if(!L.length)return null;const w=mindPickBy(L,x=>Math.max(1,40+(x.ghen||0)/2-rel(x,S))*mindW(x,"frame"),null);/* npc-mind: was ARGMIN */A.act.v=w.id;if(t)t.foe=w.id;return w}
/* ---------- the man: a real NPC of S.men ---------- */
function mkMan96(k){try{menInit()}catch(e){}if(!S.men)return null;const V=TM96V[k];const used=new Set(S.men.map(m=>m.name.split(" ").slice(-2).join(" ")));
 let nm="";for(let i=0;i<20;i++){const s=pick(V.sur||SURN.filter(x=>x.indexOf(" ")<0)),g=pick(MALEN);nm=`${s} ${g}`;if(!used.has(g))break}
 const age=Math.max(19,Math.min(30,(S.age||18)+2+R(6)));const tr=k==="td"||k==="thd"?pick(["trung hậu","cẩn trọng"]):pick(MTR.filter(x=>x!=="phong lưu"));
 const m={id:"m96",role:V.role,rw:V.role.toLowerCase(),haunts:V.haunts.slice(),age,name:nm,trait:tr,loyal:70+R(25),af:20,tinh:62+R(14),letters:0,trysts:0,alive:true,knowsMe:[],tm96:k,known:1};
 S.men=S.men.filter(x=>x.id!=="m96");S.men.push(m);return m}
function tmRoll96(k){if(!window.TM96_ON)return false;let f=null;try{f=localStorage.getItem("ctm-tm96")}catch(e){}if(f==="0")return false;if(!TM96V[k])return false;if(f==="1")return true;
 let w=TM96_W[k]||0;const h=(hist67()["tm"]||[]);if(h[0]==="tm96a")w*=.6;return rnd67()<w}
/* a new life: maybe weave the three chapters into the plan */
(function(){const i0=a67init;a67init=function(k){const r=i0.apply(this,arguments);try{rareReg96();if(!tmRoll96(k))return r;const c=S.st&&S.st.ch;if(!c||!c.plan)return r;const m=mkMan96(k);if(!m)return r;
 S.tm96={k,mid:m.id,h:72,sus:0,ev:0,rise:0,tok:1,v:1};const P=c.plan;
 const iS=P.indexOf("ms:sung"),pA=iS>=0?iS+1:P.indexOf("ms:nhap")+1;P.splice(Math.max(c.i+1,pA),0,"st:tm96a");
 const os=P.map((x,i)=>x==="o"?i:-1).filter(i=>i>=0);P.splice(os.length>=2?os[1]+1:P.indexOf("st:tm96a")+1,0,"st:tm96b");
 const fi=P.indexOf("fin");P.splice(fi>=0?fi+1:P.length-2,0,"st:tm96c");
 for(let n=0;n<2;n++){const j=P.lastIndexOf("s");if(j>=0)P.splice(j,1)}
 c.max=P.filter(x=>x!=="fin").length;if(typeof f14Norm==="function")f14Norm();/* a 14-chapter life (jst14) keeps 14 */histAdd67("tm","tm96a")}catch(e){console.error(e)}return r}})();
/* ---------- faces: a man's figure already drawn, the preferred identity if free (never reused), frame by his real role ---------- */
MANSUB["thống lĩnh cấm quân"]=["guard","thive"];MANSUB["phó sứ nam chiếu"]=["envoy","suthan"];MANSUB["vương gia"]=MANSUB["vương gia"]||["prince","royal","vuonggia"];
(function(){const r0=figRoles;figRoles=function(who){try{if(who&&who.tm96){const V=TM96V[who.tm96];if(V.fr==="official")return["official","man"];if(V.fr==="physician")return["man","physician"];return["man"]}}catch(e){}return r0.apply(this,arguments)}})();
(function(){const p0=figPick;figPick=function(who){try{if(who&&who.tm96&&!who.fid&&typeof FIGIX!=="undefined"){const U=figUsed();for(const key of TM96V[who.tm96].fid){const r=key.split(":")[0];if(FIGIX[r]&&FIGIX[r][key]&&!U.includes(key)){who.fid=key;U.push(key);return key}}}}catch(e){}return p0.apply(this,arguments)}})();
if(typeof personRoleRank==="function")(function(){const r0=personRoleRank;personRoleRank=function(p,hint){try{if(p&&p.tm96&&S&&(S.men||[]).includes(p)){const r=r0.apply(this,arguments);r.role=TM96V[p.tm96].fr;return r}}catch(e){}return r0.apply(this,arguments)}})();
/* ---------- tokens and speaker ---------- */
Object.assign(TOK67,{lv:()=>{const m=man96();return m?m.name:"người xưa"},lvn:()=>{const m=man96();return m?m.name.split(" ").slice(-2).join(" "):"chàng"},
 lvr:()=>{const m=man96();return m?m.role.toLowerCase():""},lvbg:()=>(V96()||{}).bg||"",lvhow:()=>(V96()||{}).how||"",lvtok:()=>(V96()||{}).tok||"tín vật",lvforce:()=>(V96()||{}).force||"",
 lvroute:()=>(V96()||{}).route||"",lvrisk:()=>(V96()||{}).risk||"",lvbride:()=>(V96()||{}).bride||"một tiểu thư nhà quan",lvup:()=>(V96()||{}).up||"",lvp:()=>placeName(loc96()),
 lvtinh:()=>tinhW(tinh96())});
(function(){const w0=who67;who67=function(w,A){if(w==="lv"){const m=man96();try{return m?pMan(m):null}catch(e){return null}}return w0.apply(this,arguments)}})();
/* ---------- fixed beat order: each slot lists alternatives, the first whose condition holds is played ---------- */
(function(){const n0=newThread67;newThread67=function(id,kind){const A=n0.apply(this,arguments);try{if(A&&ARC67[id]&&ARC67[id].ord){A.seq=ARC67[id].ord.map((x,i,a)=>i===0?"s":i===a.length-1?"x":i===a.length-2&&ARC67[id].tslot?"t":"c")}}catch(e){console.error(e)}return A}})();
(function(){const p0=pickNext67;pickNext67=function(A){const a=ARC67[A.a];if(!a||!a.ord)return p0.apply(this,arguments);
 while(A.i<A.seq.length){const L=a.ord[A.i]||[];const id=L.find(x=>!A.used.includes(x)&&beatOk67(A,x));if(id){A.nb=id;return id}if(A.i===A.seq.length-1){A.nb=null;return null}A.seq.splice(A.i,1)}
 A.nb=null;return null}})();
/* event choices show only their cost (owner rule); the result card shows the true numbers */
(function(){const p0=PEND.j67;PEND.j67=function(p){const d=p0.apply(this,arguments);try{if(d&&p&&/^tm96/.test(p.a)){const A=th67(p.t),b=beatDef67(A,p.b);const O=opts67(A,b);
 d.o.forEach((x,i)=>{const o=O[i]||{},c=fmt(o.c||{});x.j67=o.rare?[c?"tốn: "+c:"","(Cơ duyên hiếm)"].filter(Boolean).join(" · "):(c?"tốn: "+c:"tốn: không");x.x="";if(o.rare){x.r97=1;rareReg96()}})}}catch(e){console.error(e)}return d}})();
/* the rare ending leaves the palace for good: the life closes after the chapter card */
(function(){const e0=end67;end67=function(A,k,ign){const r=e0.apply(this,arguments);try{if(A&&A.tron96&&!S.dead){const m=man96();A.tron96=0;
 over("Cao chạy xa bay",`${S.name} uống thuốc giả chết, được khiêng ra khỏi cung trong cỗ quan tài nhẹ bẫng. Ba ngày sau, trên con thuyền xuôi phương Nam, ${m?m.name.split(" ").slice(-2).join(" "):"người xưa"} nắm tay ngươi. Trong cung, người ta lập bài vị cho một phi tần bạc mệnh.`,`Giả chết, rời cung cùng ${m?m.name:"người xưa"}`,true)}}catch(e){console.error(e)}return r}})();
(function(){const c0=chEnd67;chEnd67=function(A,E,ign){if(S&&S.dead){const c=S.st&&S.st.ch;if(c)c.past.push({a:A.a,tag:A.tag,k:ign?-1:E.k,n:c.n,ign:!!ign});return}return c0.apply(this,arguments)}})();
RPOOL67.love=["thunha","huongtram","nghien","tranhco"];RTHEME67.tm96a="love";RTHEME67.tm96b="emp";RTHEME67.tm96c="family";
const ok96=()=>!!(T96()&&live96());
const OUT96=(A,ok)=>"";
/* ================= CHƯƠNG ĐẦU ĐỜI: NGÀY TỪ BIỆT ================= */
ARC67.tm96a={o:"tm",ok:ok96,t:"Thanh mai trúc mã: Ngày từ biệt",w:"lv",sj:"người xưa của ngươi",tslot:0,p:[[],[],[],[]],
 g:"{lvn}, {lvbg}, là người ngươi từng hẹn ước. Ngày ngươi bị đưa vào cung, hai người chỉ kịp nhìn nhau một lần. Nay chàng đã {lvhow}. Giữ lời hẹn trong tim, hay chôn nó trước khi kẻ khác đào lên.",
 ord:[["a1"],["a2"],["a3"],["a4"],["a5"],["a6"]],
 B:{
 a1:{h:"Ngày từ biệt",w:"lv",t:"Đêm nào ngươi cũng mơ lại ngày ấy. {lvforce} Lúc kiệu rời cổng, trong tay áo ngươi vẫn còn {lvtok}.",l:"Ngày từ biệt",o:[
  {n:"Giữ tín vật, coi như lời hẹn kiếp sau",c:{},w:{suc:3},go:()=>{adj96({h:10,t:6});T96().tok=1},rt:"Ngươi giấu tín vật dưới đáy rương, như giấu một ngọn đèn."},
  {n:"Nhờ người gửi trả tín vật, dặn chàng quên mình",c:{bac:-10},w:{duc:3},go:()=>{adj96({h:-12,t:-8});T96().tok=0;A96f("cut")},rt:"Tín vật theo một người nhà về lại phủ cũ."},
  {n:"Viết một dòng: “Hãy lập công danh”",c:{suc:-3},w:{tai:1},go:()=>{adj96({t:4,rise:1})},rt:"Ngươi gửi đi một dòng chữ, không ký tên."}]},
 a2:{h:"Gặp lại ở {lvp}",w:"lv",t:"Đi ngang {lvp}, ngươi khựng lại. {lv} đứng đó, y phục chỉnh tề. Chàng cúi đầu hành lễ như với mọi phi tần, chỉ có đôi mắt là không giấu được.",o:[
  {n:"Cúi đầu đi qua như người lạ",c:{},w:{duc:2},go:()=>{adj96({h:-4,t:-4});A96f("cold")},rt:"Ngươi bước qua, không ngoái lại."},
  {n:"Dừng lại hỏi một câu xã giao",c:{},o:()=>50+S.tamco/4+(S.mat||0)*2,w:{suc:4},l:{danh:-3},go:(A,ok)=>{adj96({h:6,t:8,sus:ok?0:6});if(!ok){const v=pick(liveRivals(true));if(v)evA(v,S,1)}},rt:"Hai câu hỏi thăm, chỉ hai người hiểu nghĩa thật.",rf:"Một cung nữ của phi tần khác thấy hai người đứng hơi lâu."},
  {n:"Sai cung nữ chuyển lời: “Đừng tìm ta”",c:{bac:-10},w:{tamco:1},go:()=>{adj96({h:-6,t:-6});A96f("cut")},rt:"{maid} chuyển lời. Chàng lặng người, rồi gật đầu."}]},
 a3:{h:"Tín vật trở lại",w:"maid",t:"{maid} run run đặt lên bàn một gói nhỏ: {lvtok}, {lvroute}. Bên trong có một mảnh giấy: “Vật này vẫn là của nàng.”",o:[
  {n:"Giữ lại, giấu thật kỹ",c:{},w:{suc:3},go:()=>{adj96({h:8,t:4});T96().tok=1},rt:"Ngươi khâu tín vật vào lớp lót gối."},
  {n:"Đốt mảnh giấy, cất tín vật vào kho chung",c:{suc:-2},w:{tamco:2},go:()=>{adj96({h:-3});T96().tok=0},rt:"Mảnh giấy cháy. Tín vật lẫn vào trăm món đồ khác."},
  {n:"Gửi trả kèm một câu thật lạnh",c:{bac:-10},w:{duc:3},go:()=>{adj96({h:-8,t:-12});T96().tok=0;A96f("cut")},rt:"Chàng nhận lại tín vật, không hồi âm."}]},
 a4:{h:"Bức thư không ký tên",w:"maid",t:"Một bức thư lạ đến tay ngươi, {lvroute}. Nét chữ của {lvn}: chàng hỏi ngươi có ổn không, và chỉ cần một chữ trả lời.",o:[
  {n:"Đốt thư, không hồi âm",c:{},w:{duc:3},go:()=>{adj96({h:-4,t:-5})},rt:"Ngươi đốt thư, tro bay qua song cửa."},
  {n:"Hồi âm một chữ “An”",c:{suc:-2},o:()=>45+(watcher()?watcher().loyal/3:0)+S.tamco/6,w:{suc:4},l:{danh:-3},go:(A,ok)=>{adj96({h:8,t:10,lt:1});if(!ok){adj96({ev:1,sus:5})}},rt:"Thư đi trót lọt. Từ nay chàng biết ngươi vẫn sống tốt.",rf:"Người đưa thư bị một thái giám chặn hỏi. Thư đi được, nhưng có kẻ đã nhìn thấy phong bì."},
  {n:"Giữ thư, không hồi âm",c:{},w:{suc:2},go:()=>{adj96({h:4,t:-2,lt:1})},rt:"Bức thư nằm dưới đáy rương, cạnh những thứ không được phép có."}]},
 a5:{h:"Người hầu đã biết",w:"maid",t:"{maid} quỳ xuống: “Nô tỳ không mù. Tiểu thư và {lvn}… Nô tỳ chỉ sợ một ngày người khác cũng thấy.”",o:[
  {n:"Tin nàng, nhờ nàng canh cửa",c:{bac:-20},w:{tamco:1},go:()=>{if(S.maid){S.maid.loyal=cl((S.maid.loyal||50)+8,0,100);S.maid.tin=cl((S.maid.tin==null?50:S.maid.tin)+10,0,100)}A96f("maid")},rt:"{maid} gật đầu: từ nay cửa sau có người canh."},
  {n:"Dặn nàng quên chuyện này",c:{},w:{duc:2},go:()=>{adj96({h:-3})},rt:"{maid} cúi đầu vâng dạ."},
  {n:"Đổi nàng sang việc khác cho yên",c:{suc:-2},w:{tamco:2},go:()=>{if(S.maid)S.maid.loyal=cl((S.maid.loyal||50)-12,0,100)},rt:"{maid} đi, mắt đỏ hoe."}]},
 a6:{h:"Đêm rằm tháng tám",w:"lv",t:"Đêm rằm, cả hậu cung ra Ngự hoa viên ngắm trăng. Qua hàng đèn lồng, ngươi thấy {lvn} đứng hầu sau xa giá. Chàng {lvtinh}. Đêm nay ngươi phải định lòng mình.",o:[
  {n:"Giữ lời hẹn trong tim, không để ai biết",c:{},o:()=>50+S.tamco/4+(A96has("maid")?10:0)-(T96().ev||0)*10-(T96().sus||0)/5,e:["a_hen","a_lo"],w:{},go:()=>adj96({h:5}),rt:"Ngươi chỉ nhìn trăng. Không ai đọc được gì trên mặt ngươi.",rf:"Ngươi nhìn chàng lâu hơn một nhịp. Có kẻ đã ghi nhớ."},
  {n:"Gửi trả tín vật, xin chàng quên ta",c:{bac:-10},e:"a_dut",w:{},go:()=>{adj96({h:-15,t:-15});T96().tok=0},rt:"Ngươi tự tay đặt tín vật vào hộp, sai người đưa trả."},
  {n:"Lẻn ra sau giả sơn, nói với chàng một lời",c:{suc:-4},if:()=>tinh96()>=50,o:()=>cl(100-lộRisk(loc96())-(T96().sus||0)/5,10,90),e:["a_hen","a_lo"],go:(A,ok)=>{adj96({h:10,t:10});if(!ok)adj96({ev:1,sus:8})},rt:"“Ta đợi.” Chàng chỉ nói một câu, rồi biến vào bóng tối.",rf:"Một tiếng cành khô gãy. Có người đã thấy bóng hai người."}]}},
 E:{a_lo:{k:-1,tag:"Có kẻ nắm được thóp",w:"maid",t:"Không có gì xảy ra ngay. Nhưng ngươi biết, ở đâu đó trong hậu cung, có người đang giữ một mẩu chuyện của ngươi và {lvn}.",fx:{danh:-3},go:A=>{adj96({ev:1});T96().endA="a_lo";const v=foe96(A);return v?`${v.name} có vẻ đã biết điều gì đó.`:""}},
  a_dut:{k:1,tag:"Dứt tình, giữ mình",t:"Ngươi chọn con đường trong cung. {lvn} nhận lại tín vật, từ đó chỉ hành lễ từ xa.",fx:{duc:5,tamco:2},go:()=>{T96().endA="a_dut";return ""}},
  a_hen:{k:1,tag:"Lời hẹn còn nguyên",w:"lv",t:"Không một lời, không một dấu vết. Chỉ hai người biết lời hẹn năm xưa vẫn còn đó.",fx:{suc:6},go:()=>{T96().endA="a_hen";return ""}}}};
/* ================= CHƯƠNG GIỮA ĐỜI: LỬA THỬ VÀNG ================= */
ARC67.tm96b={o:"tm",ok:ok96,t:"Thanh mai trúc mã: Lửa thử vàng",w:"lv",sj:"chuyện ngươi và {lvn}",tslot:0,p:[[],[],[],[]],
 g:"Năm tháng trôi, {lvn} đã thành {lvr} có tiếng trong triều. Mối tình cũ vẫn nằm đó như than dưới tro: chàng có thể vì ngươi mà liều, kẻ thù có thể nhân đó giá họa, và Hoàng thượng không phải người dễ lừa.",
 ord:[["b1l","b1h","b1d"],["b2a","b2b"],["b3a","b3b"],["b4"],["b5"],["b6"]],
 B:{
 b1l:{h:"Kẻ nắm thóp đòi giá",w:"v",need:["v"],vf:v=>gate96(v,"blackmail"),if:()=>T96().endA==="a_lo"||(T96().ev||0)>0,t:"{v} hẹn gặp ngươi ở đình nghỉ, cười rất ngọt: “Chuyện của muội với {lv}, tỷ tỷ chưa nói với ai. Chỉ là dạo này tỷ tỷ thiếu một chỗ dựa.”",o:[
  {n:"Đưa bạc cho nàng ta im miệng",c:{bac:-80},w:{},go:A=>{const v=rv67(A,"v");if(v)relAdd(S,v,8)},rt:"{v} nhận bạc, nhưng kẻ nắm thóp hiếm khi chỉ đòi một lần."},
  {n:"Giả vờ không hiểu nàng nói gì",c:{suc:-2},o:()=>40+S.tamco/3-(T96().ev||0)*8,w:{tamco:2},l:{danh:-4},go:(A,ok)=>{if(!ok)adj96({sus:6})},rt:"{v} không moi được gì, đành bỏ đi.",rf:"{v} bỏ đi, ánh mắt như đã chắc chắn."},
  {n:"Thu thập chứng cứ nàng ta, nắm lại thóp",c:{suc:-4},o:()=>35+(S.mat||0)*6+S.tamco/5,w:{mat:1},l:{danh:-3},go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok){evA(S,v,2);A96f("leverage")}},rt:"Ngươi có được chuyện riêng của {v}. Hai bên cùng nắm thóp nhau.",rf:"{v} phát hiện ngươi cho người theo dõi."}]},
 b1h:{h:"Tin chàng thăng chức",w:"lv",if:()=>T96().endA==="a_hen",t:"Tin từ Cần Chính điện: {lv} vừa được thăng chức. Đêm ấy, {lvroute}, có một cành hoa khô gửi đến cho ngươi.",o:[
  {n:"Ép cành hoa vào sách, giữ lại",c:{},w:{suc:4},go:()=>adj96({h:6,t:4,lt:1}),rt:"Cành hoa nằm giữa hai trang thơ."},
  {n:"Mừng thầm, nhưng đốt đi",c:{},w:{duc:2},go:()=>adj96({h:-2}),rt:"Ngươi đốt cành hoa, lòng vẫn mừng cho chàng."},
  {n:"Khen chàng một câu trước mặt Hoàng thượng",c:{sung:-2},o:()=>50+S.sung/5,w:{sung:2},l:{sung:-3},go:(A,ok)=>{if(ok)adj96({rise:1});else adj96({sus:6})},rt:"Hoàng thượng gật gù: “Người này dùng được.”",rf:"Hoàng thượng nhìn ngươi: “Nàng biết hắn sao?”"}]},
 b1d:{h:"Ánh mắt từ xa",w:"lv",t:"Đã lâu ngươi không nhắc đến {lvn}. Nhưng mỗi lần ngươi đi qua {lvp}, chàng vẫn dừng việc mà nhìn theo. Chàng {lvtinh}.",o:[
  {n:"Đổi đường đi, tránh hẳn {lvp}",c:{suc:-2},w:{duc:2},go:()=>adj96({t:-6,h:-3}),rt:"Ngươi đổi đường. Ánh mắt kia dần thưa."},
  {n:"Gật đầu chào chàng một lần",c:{},w:{suc:3},go:()=>adj96({h:5,t:8}),rt:"Chỉ một cái gật đầu, mà đủ để chàng mỉm cười cả ngày."}]},
 b2a:{h:"Chàng vì ngươi mà liều",w:"lv",if:()=>tinh96()>=50,t:"Tin truyền vào hậu cung: {lv} vừa {lvrisk}. Ai tinh ý đều hiểu chàng làm vậy vì ai. Tiền đồ, có khi cả tính mạng, chàng đặt cược hết.",o:[
  {n:"Lén gửi lời ngăn chàng lại",c:{bac:-20},w:{duc:2},go:()=>adj96({t:-4,h:3}),rt:"Chàng dừng tay. Nhưng ai cũng đã thấy chàng định làm gì."},
  {n:"Để chàng làm, âm thầm đỡ đòn phía sau",c:{bac:-50},o:()=>45+(S.mat||0)*5+S.tamco/6,w:{danh:3},l:{},sc:1,go:(A,ok)=>{adj96({h:8,t:6});if(ok)adj96({rise:1});else{T96().hurt=(T96().hurt||0)+1;adj96({sus:6})}},rt:"Việc chàng làm thành. Người được cứu là người nhà ngươi; người đứng sau, không ai biết là ngươi.",rf:"Chàng bị phạt bổng một năm, suýt mất chức. Có kẻ bắt đầu hỏi vì sao chàng liều đến vậy."},
  {n:"Đòi chàng cắt hẳn mọi liên lạc",c:{},w:{tamco:2},go:()=>{adj96({t:-15,h:-10});A96f("cut")},rt:"Chàng đọc thư ngươi, im lặng rất lâu."}]},
 b2b:{h:"Chàng chọn tiền đồ",w:"lv",t:"Nghe nói {lv} đang được một nhà quyền thế để mắt. Chàng bận rộn, đi qua cửa cung ngươi mà không còn dừng bước. Lòng chàng nay chỉ còn {lvtinh}.",o:[
  {n:"Mừng cho chàng, buông tay",c:{},w:{duc:4},go:()=>{adj96({h:-8});A96f("cut")},rt:"Ngươi buông. Lạ thay, lòng nhẹ hơn ngươi tưởng."},
  {n:"Hẹn gặp, hỏi cho ra lẽ",c:{suc:-3},o:()=>cl(90-lộRisk(loc96()),10,90),w:{suc:3},l:{danh:-3},go:(A,ok)=>{adj96({h:4});if(ok)adj96({t:12});else adj96({sus:8})},rt:"Chàng cúi đầu: “Ta tưởng nàng đã quên.” Ngọn lửa cũ cháy lại.",rf:"Chàng không đến. Người đến là một thái giám hay hóng chuyện."}]},
 b3a:{h:"Kẻ thù để ý",w:"v",need:["v"],vf:v=>gate96(v,"accuse"),t:"{v} bắt đầu cho người theo dõi ngươi. Mấy hôm nay, người của nàng ta cứ lảng vảng quanh {lvp}.",o:[
  {n:"Tạm ngừng mọi liên lạc với chàng",c:{},w:{duc:2},go:()=>adj96({t:-3,sus:-4}),rt:"Một tháng trôi qua, kẻ theo dõi không thấy gì."},
  {n:"Đánh lạc hướng: để lộ một chuyện vô hại",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},l:{danh:-3},sc:1,go:(A,ok)=>{if(!ok)adj96({sus:5,ev:1})},rt:"{v} đuổi theo một cái bóng không có thật.",rf:"Mưu đánh lạc hướng vụng về, {v} càng chắc mình đúng."},
  {n:"Bỏ bạc mua người của nàng ta",c:{bac:-60},o:()=>45+(S.mat||0)*4,w:{mat:1},sc:1,go:(A,ok)=>{if(!ok)adj96({sus:4})},rt:"Kẻ theo dõi từ nay báo về cho cả hai bên.",rf:"Kẻ ấy nhận bạc rồi báo lại cho {v}."}]},
 b3b:{h:"Thái giám đánh hơi",w:"eun",t:"Một thái giám Nội vụ phủ nháy mắt với ngươi: “{Xung} với {lvn} là đồng hương nhỉ? Nô tài nghe nói nhiều chuyện lắm.” Hắn chỉ muốn bạc.",o:[
  {n:"Đút bạc bịt miệng",c:{bac:-50},w:{},rt:"Hắn cười hì hì, cất bạc."},
  {n:"Dọa tố hắn với Tổng quản",c:{},o:()=>45+(S.mat||0)*5,w:{tamco:2},l:{danh:-4},go:(A,ok)=>{if(!ok)adj96({sus:6})},rt:"Hắn tái mặt, chuồn thẳng.",rf:"Hắn chạy đi kể khắp nơi."}]},
 b4:{h:"Tang vật trong cung ngươi",w:"maid",t:()=>hasEv96()?"{maid} hớt hải: có kẻ sắp dẫn người đến soát cung ngươi. Mà trong rương ngươi thật sự còn giữ đồ của {lvn}.":"{maid} hớt hải: có kẻ đã lén nhét một bức thư giả nét chữ {lvn} vào rương ngươi, sắp dẫn người đến soát.",o:[
  {n:"Soát cung trước, tiêu hủy mọi thứ",c:{suc:-5},o:()=>40+(S.mat||0)*6+(A96has("maid")?15:0),w:{tamco:2},l:{danh:-5},go:(A,ok)=>{if(ok){const m=man96();if(m){m.letters=0;if(S.aff)S.aff[m.id]=0}T96().ev=0;T96().tok=0;adj96({h:-4})}else adj96({ev:1,sus:10})},rt:"Khi người soát cung đến, rương ngươi sạch như gương.",rf:"Người soát cung đến sớm hơn ngươi tưởng, kịp thấy một góc thư."},
  {n:"Nhờ {lvn} ra tay xóa dấu",c:{},if:()=>tinh96()>=40,o:()=>40+tinh96()/3,w:{},l:{},go:(A,ok)=>{adj96({t:4,h:6});if(ok){T96().ev=0}else{T96().hurt=(T96().hurt||0)+1;adj96({sus:8})}},rt:"Đêm ấy, mọi dấu vết biến mất. Người làm việc đó là chàng.",rf:"Chàng bị bắt gặp gần cung ngươi lúc nửa đêm, phải viện cớ tuần tra mới thoát."},
  {n:"Bình thản chờ, tin mình trong sạch",c:{},if:()=>!hasEv96(),o:()=>55+S.duc/5,w:{duc:3},l:{danh:-4},go:(A,ok)=>{if(!ok)adj96({sus:8})},rt:"Bức thư giả bị thái y nghiệm ra mực mới. Kẻ giá họa mất mặt.",rf:"Không ai chứng minh được thư giả, lời đồn vẫn bay."}]},
 b5:{h:"Hoàng thượng thử lòng",w:"emp",need:["nsrv"],t:"Yến tiệc trong cung. Hoàng thượng chợt gọi {lv} đến trước mặt, rồi quay sang ngươi: “Ái phi rót cho khanh ấy một chén. Trẫm nghe nói hai người là chỗ quen biết cũ.”",o:[
  {n:"Thản nhiên rót rượu như với mọi quan",c:{},o:()=>45+S.tamco/3+(A96has("cut")?15:0)-(T96().sus||0)/3,w:{sung:4},l:{sung:-6},go:(A,ok)=>{adj96({sus:ok?-10:12})},rt:"Tay ngươi không run. Hoàng thượng cười, uống cạn chén của mình.",rf:"Rượu sóng sánh ra ngoài. Hoàng thượng đặt chén xuống, không nói gì."},
  {n:"Tiến cử chàng hết lời trước mặt ngài",c:{sung:-2},o:()=>40+S.danh/5+(T96().rise||0)*5-(T96().sus||0)/4,w:{danh:3},l:{sung:-5},go:(A,ok)=>{if(ok)adj96({rise:1,sus:-4});else adj96({sus:12})},rt:"Hoàng thượng gật đầu: “Trẫm sẽ trọng dụng.”",rf:"Hoàng thượng nheo mắt: “Nàng lo cho hắn quá nhỉ.”"},
  {n:"Xin ngài ban hôn cho chàng",c:{},w:{duc:3},go:()=>{T96().wedAsk=1;adj96({sus:-8,h:-5})},rt:"Hoàng thượng bật cười: “Được, trẫm sẽ để ý.”"}]},
 b6:{h:"Phiên tra hỏi",w:"emp",t:"Chuyện đến tai Hoàng thượng. Ngài cho gọi ngươi vào Dưỡng Hòa điện, trên án là {lvtok}. “Nàng nói đi.”",o:[
  {n:"Thẳng thắn: chuyện trước khi vào cung, nay đã không còn",c:{sung:-3},o:()=>40+S.duc/6+((man96()||{}).letters?-10:10)-(T96().sus||0)/5+(A96has("cut")?10:0),e:["b_tin","b_nghi"],rt:"Hoàng thượng nhìn ngươi rất lâu, rồi đẩy tín vật sang: “Trẫm tin nàng.”",rf:"Hoàng thượng không tin, chỉ phẩy tay cho lui."},
  {n:"Để chàng đứng ra nhận hết tội",c:{},if:()=>tinh96()>=50,o:70,e:["b_ton","b_nghi"],rt:"{lvn} quỳ ngoài điện, nhận rằng mình đơn phương tơ tưởng. Ngươi được giữ sạch; chàng phải trả giá.",rf:"Lời nhận tội của chàng chẳng ai tin, chỉ làm mọi chuyện rối thêm."},
  {n:"Chối, nói tang vật là đồ giả",c:{},o:()=>35+(hasEv96()?0:30)+S.tamco/5,e:["b_tin","b_nghi"],rt:"Người làm chứng khai lắp bắp. Hoàng thượng phạt kẻ tố cáo.",rf:"Thái y nghiệm ra mực cũ. Lời chối của ngươi thành lời nói dối."}]}},
 E:{b_nghi:{k:-1,tag:"Hoàng thượng sinh nghi",w:"emp",t:"Không có tội danh, nhưng từ nay Hoàng thượng nhìn ngươi khác. Một cái gai đã cắm vào lòng ngài.",fx:{sung:-8,danh:-4},go:()=>{adj96({sus:25});T96().endB="b_nghi";return "Hoàng thượng nghi ngươi hơn trước."}},
  b_ton:{k:0,tag:"Chàng gánh tội thay",w:"lv",t:"{lvn} bị giáng chức, phạt bổng, suýt bị đuổi khỏi kinh. Ngươi giữ được thanh danh; chàng giữ được lời hẹn theo cách của chàng.",fx:{duc:2},go:()=>{T96().hurt=(T96().hurt||0)+1;T96().rise=Math.max(0,(T96().rise||0)-1);adj96({t:8,h:8,sus:-5});T96().endB="b_ton";return `${(man96()||{}).name||"Chàng"} bị giáng chức.`}},
  b_tin:{k:1,tag:"Qua được lửa thử",w:"emp",t:"Hoàng thượng tin ngươi. Kẻ đứng sau bị phạt, và chẳng ai dám nhắc lại chuyện cũ nữa.",fx:{sung:5,danh:4},go:A=>{adj96({sus:-20});T96().endB="b_tin";const v=rv67(A,"v");return v?e67pun(v,6):""}}}};
/* ================= CHƯƠNG CUỐI ĐỜI: LỰA CHỌN CUỐI ================= */
function rare96(){const t=T96(),m=man96(),w=watcher();return !!(t&&m&&m.alive&&(t.h||0)>=80&&(m.tinh||0)>=80&&w&&w.loyal>=70&&!S.preg&&(t.sus||0)<40&&!S.out)}
ARC67.tm96c={o:"tm",ok:ok96,t:"Thanh mai trúc mã: Lựa chọn cuối",w:"lv",sj:"mối tình cũ của ngươi",tslot:1,p:[[],[],[],[]],
 g:"Bao năm đã qua, mối tình ấy chưa bao giờ thật sự tắt. Nay triều đình định hôn sự cho {lvn}, kẻ thù sắp ra đòn cuối, và chàng đến xin ngươi một lời. Lần này, ngươi phải chọn hẳn.",
 ord:[["c1n","c1o","c1t"],["c2"],["c3a","c3b"],["c4a","c4b"],["c5"],["c6"]],
 B:{
 c1n:{h:"Mắt ở khắp nơi",w:"emp",if:()=>T96().endB==="b_nghi"||(T96().sus||0)>=50,t:"Từ ngày sinh nghi, Hoàng thượng cho người của Kính sự phòng ghi chép từng bước ngươi đi. Ngay {maid} cũng bị gọi đi hỏi chuyện.",o:[
  {n:"Sống thật thanh tĩnh một thời gian",c:{sung:-3},w:{duc:4},go:()=>adj96({sus:-12,t:-3}),rt:"Ba tháng chép kinh, ngắm hoa. Người theo dõi chán nản rút dần."},
  {n:"Dồn sức lấy lại lòng Hoàng thượng",c:{suc:-6},o:()=>45+S.sac/5+S.sung/5,w:{sung:5},l:{sung:-3},go:(A,ok)=>adj96({sus:ok?-15:4}),rt:"Hoàng thượng lại ghé cung ngươi như xưa.",rf:"Ngài đến, nhưng vẫn lạnh lùng dò xét."}]},
 c1o:{h:"Người bị giáng",w:"lv",if:()=>T96().endB==="b_ton"||(T96().hurt||0)>=1,t:"{lv} sau lần gánh tội vẫn chưa ngóc đầu lên được. Nghe nói chàng sống thanh bần, đêm đêm vẫn đọc lại mấy chữ ngươi viết năm nào.",o:[
  {n:"Lén gửi bạc giúp chàng",c:{bac:-60},w:{},go:()=>adj96({t:8,h:5}),rt:"Bạc đến tay chàng qua ba người trung gian."},
  {n:"Xin Hoàng thượng phục chức cho chàng",c:{sung:-4},o:()=>40+S.sung/4-(T96().sus||0)/4,w:{danh:2},l:{sung:-3},go:(A,ok)=>{if(ok)adj96({rise:1});else adj96({sus:8})},rt:"Chàng được phục chức. Không ai biết ai đã nói giúp.",rf:"Hoàng thượng hỏi lại: “Sao nàng quan tâm hắn vậy?”"},
  {n:"Để mặc, giữ mình",c:{},w:{tamco:2},go:()=>adj96({h:-4}),rt:"Ngươi không nhúng tay. Lòng ngươi biết thế là phải."}]},
 c1t:{h:"Người được trọng dụng",w:"lv",t:"{lv} nay là cánh tay đắc lực trong triều, lời chàng nói Hoàng thượng đều nghe. Lần đầu tiên, chàng có đủ sức để giúp ngươi, hoặc để hại chính mình vì ngươi.",o:[
  {n:"Nhờ chàng đỡ một việc của nhà ngươi",c:{},w:{danh:4},go:()=>adj96({t:2,rise:1}),rt:"Chàng làm gọn gàng. Nhà ngươi qua được một cơn sóng."},
  {n:"Giữ khoảng cách, để chàng tự lên",c:{},w:{duc:3},go:()=>adj96({rise:1,h:-3}),rt:"Chàng lên cao, sạch sẽ, không dính dáng gì tới ngươi."}]},
 c2:{h:"Hôn sự của chàng",w:"th",t:()=>`${T96().wedAsk?"Hoàng thượng nhớ lời ngươi xin năm trước.":"Thái hậu muốn giữ chân người tài."} Trong cung bàn chuyện chỉ hôn {lvbride} cho {lv}. Người ta hỏi ý ngươi, như hỏi ý một người ngoài cuộc.`,o:[
  {n:"Tán thành, khen đôi lứa xứng đôi",c:{},w:{duc:3},go:()=>{T96().wed=1;adj96({h:-6,t:-4})},rt:"Ngươi nói đúng những lời một phi tần nên nói."},
  {n:"Âm thầm ngăn cản mối hôn",c:{bac:-60},o:()=>40+S.tamco/4+S.danh/6,w:{tamco:1},l:{danh:-4},go:(A,ok)=>{if(ok){T96().wed=0;adj96({t:6})}else adj96({sus:10})},rt:"Mối hôn tự dưng gặp trắc trở, rồi gác lại.",rf:"Có người lần ra ai đứng sau, và tự hỏi vì sao."},
  {n:"Im lặng",c:{},w:{},go:()=>adj96({h:2}),rt:"Ngươi không nói gì. Hôn sự còn bỏ ngỏ."}]},
 c3a:{h:"“Theo ta đi”",w:"lv",if:()=>tinh96()>=80,t:"{lvn} tìm được cách gặp ngươi một khắc ở {lvp}. Chàng nói rất khẽ: “Ta có đường đưa nàng ra khỏi cung. Chỉ cần nàng gật đầu.”",o:[
  {n:"Lắc đầu: “Ta còn gia tộc, còn trách nhiệm”",c:{},w:{duc:4},go:()=>adj96({h:-6,t:-6}),rt:"Chàng gật đầu, như đã đoán trước."},
  {n:"Không trả lời, chỉ nắm tay chàng",c:{},o:()=>cl(95-lộRisk(loc96())-(T96().sus||0)/5,10,90),w:{suc:5},l:{},go:(A,ok)=>{adj96({h:10,t:6});A96f("vow");if(!ok)adj96({sus:10,ev:1})},rt:"Một khắc ấy không ai thấy.",rf:"Có tiếng bước chân. Hai người buông tay, nhưng đã muộn một nhịp."}]},
 c3b:{h:"Xin một lời dứt khoát",w:"lv",t:"{lvn} nhờ người chuyển một câu: chàng không cầu gì, chỉ xin ngươi nói thật lòng mình một lần, để chàng biết đường mà sống tiếp.",o:[
  {n:"“Hãy sống tốt, đừng chờ ta”",c:{},w:{duc:3},go:()=>{adj96({h:-5,t:-8});A96f("cut")},rt:"Chàng đọc xong, đốt thư, rồi đi uống rượu suốt đêm."},
  {n:"“Lòng ta vẫn như năm ấy”",c:{},w:{suc:4},go:()=>adj96({h:8,t:12,lt:1}),rt:"Một dòng chữ, mà đủ làm chàng sống lại."}]},
 c4a:{h:"Đòn cuối của kẻ thù",w:"v",need:["v"],vf:v=>gate96(v,"accuse"),t:"{v} quỳ trước Hoàng thượng, dâng lên một xấp giấy: lời khai của một cung nhân về ngươi và {lv}. Thật giả lẫn lộn.",o:[
  {n:"Tìm ra kẽ hở trong lời khai",c:{suc:-4},o:()=>40+S.tamco/4+(S.mat||0)*5+(A96has("leverage")?15:0),w:{tamco:2},l:{danh:-5},sc:1,go:(A,ok)=>{const v=rv67(A,"v");if(ok&&v)e67pun(v,8);else adj96({sus:12})},rt:"Ngươi chỉ ra ba chỗ mâu thuẫn. Lời khai sụp đổ, {v} bị trách phạt.",rf:"Lời khai có phần thật. Hoàng thượng nhìn ngươi lâu hơn."},
  {n:"Đổi chác: im chuyện của nàng ta lấy chuyện của mình",c:{},if:()=>A96has("leverage"),w:{},go:()=>adj96({sus:-4}),rt:"{v} rút đơn, nói rằng mình nghe lầm."},
  {n:"Nhận phần nhỏ, che phần lớn",c:{sung:-4},o:()=>50+S.duc/6,w:{duc:2},l:{sung:-4},go:(A,ok)=>adj96({sus:ok?2:12}),rt:"Ngươi nhận có quen biết cũ, mọi thứ khác đều là bịa đặt. Hoàng thượng tạm tin.",rf:"Thừa nhận một nửa, người ta đoán được nửa kia."}]},
 c4b:{h:"Sóng ngầm trong triều",w:"lv",t:"Có người dâng sớ hặc tội {lv}, kể cả những việc chàng từng làm vì ngươi. Chàng có thể khai ra ngươi để tự cứu, mà chàng không khai.",o:[
  {n:"Âm thầm lo lót cứu chàng",c:{bac:-80},o:()=>45+(S.mat||0)*5,w:{},sc:1,go:(A,ok)=>{if(!ok)T96().hurt=(T96().hurt||0)+1;adj96({t:6})},rt:"Tờ sớ bị gác lại.",rf:"Bạc đi mà việc không thành. Chàng bị đánh ba mươi trượng."},
  {n:"Đứng ngoài, mặc chàng tự lo",c:{},w:{tamco:2},go:()=>adj96({t:-8,h:-4}),rt:"Chàng tự gỡ được, nhưng biết ngươi đã không đưa tay."}]},
 c5:{h:"Chuẩn bị cho ngày cuối",w:"maid",t:"Ngươi biết ngày phải chọn đã gần. {maid} ghé tai: “Tiểu thư định thế nào, nô tỳ đều theo.”",o:[
  {n:"Tìm một bài thuốc giả chết",c:()=>({bac:(V96()&&T96().k==="td")?-60:-150}),if:()=>(T96().h||0)>=70&&tinh96()>=70,o:()=>35+(S.arts&&S.arts.y||0)*8+(T96().k==="td"?30:0),w:{},l:{},go:(A,ok)=>{if(ok)A96f("thuoc");else adj96({sus:6})},rt:"Một gói bột trắng, uống vào thì mạch tắt ba ngày. Ngươi giấu nó trong trâm cài.",rf:"Thầy thuốc ngoài cung nhận bạc rồi biệt tăm."},
  {n:"Lo đường lui cho chàng trên triều",c:{bac:-60},w:{danh:2},go:()=>adj96({rise:1}),rt:"Ngươi khéo léo gửi gắm chàng với một vị đại thần."},
  {n:"Đốt hết thư từ, xóa mọi dấu vết",c:{suc:-3},w:{tamco:2},go:()=>{const m=man96();if(m){m.letters=0;if(S.aff)S.aff[m.id]=0}T96().ev=0;T96().tok=0;adj96({h:-10,sus:-6})},rt:"Lửa liếm hết những năm tháng ấy."}]},
 c6:{h:"Lựa chọn cuối",w:"lv",t:"Đêm cuối thu. Ngươi đứng trước gương rất lâu. {lvn} vẫn ở đó, {lvtinh}. Lòng ngươi thì ngươi biết rõ hơn ai hết.",o:[
  {n:"Chôn chặt tình cũ, nâng chàng lên trên triều",c:{},o:()=>45+S.tamco/6+S.danh/8+(T96().rise||0)*6-(T96().sus||0)/4+(A96has("cut")?10:0),e:["c_ally","c_dead"],rt:"Từ đêm ấy, ngươi chỉ còn là một phi tần, và chàng là một vị quan ngươi tin cậy.",rf:"Kẻ thù không buông tha. Để cắt đứt mọi lời đồn về ngươi, chàng nhận hết tội về mình."},
  {n:"Xin Hoàng thượng ban hôn, tác thành cho chàng",c:{},if:()=>!(man96()||{}).wed,e:"c_wed",rt:"Ngươi tự tay chọn sính lễ."},
  {n:"Gặp chàng một đêm cuối rồi dứt",c:{suc:-5},if:()=>(T96().h||0)>=55&&tinh96()>=55,o:()=>cl(100-lộRisk(loc96())-(T96().sus||0)/4,8,90),e:["c_bimat","c_lo"],rt:"Đêm ấy, đèn tắt sớm.",rf:"Đêm ấy, có kẻ đã chờ sẵn ngoài cửa."},
  {n:"✦ Giả chết, theo chàng rời cung",rare:1,c:{suc:-6},if:()=>rare96()&&A96has("thuoc"),o:A=>20+(A.sc||0)*7+(T96().k==="td"?15:0)+S.tamco/6-(T96().sus||0)/3,e:["c_tron","c_lo"],rt:"Thuốc ngấm. Ngươi nghe tiếng {maid} khóc như từ rất xa.",rf:"Thái y bắt mạch lần thứ hai và nhận ra mạch vẫn còn."}]}},
 E:{c_lang:{k:-1,tag:"Lỡ làng",w:"lv",t:"Ngươi để năm tháng trôi qua mà không chọn. {lvn} cuối cùng cũng thôi chờ, xin đi trấn nhậm xa, chỉ còn là một cái tên trong sổ triều.",fx:{danh:-2},go:()=>{const m=man96();if(m){m.tinh=10;m.haunts=["thu"]}T96().endC="c_lang";return ""}},
  c_ally:{k:1,tag:"Tình cũ thành đồng minh trên triều",w:"lv",t:"Ngươi chôn chặt tình cũ. {lvn} lên cao, thành {lvup}; mỗi lời chàng nói trên triều đều nghiêng về phía ngươi. Không ai biết vì sao, ngoài hai người.",fx:{danh:6,mat:2},go:()=>{const m=man96(),V=V96();if(m&&V){m.role=V.up;m.tinh=Math.min(m.tinh,35);m.ally96=1}T96().endC="c_ally";T96().ally=1;return m?`${m.name} nay là ${V.up}, đồng minh của ngươi trên triều.`:""}},
  c_wed:{k:1,tag:"Tác thành cho người xưa",w:"lv",t:"{lvn} cưới {lvbride}. Ngày ấy ngươi gửi một đôi gối thêu uyên ương. Chàng hướng về hậu cung vái ba vái, rồi bước vào kiệu hoa của người khác.",fx:{duc:6,sung:2},go:()=>{const m=man96(),V=V96();if(m&&V){m.wed=V.bride;m.tinh=15}try{if(!S.thDead)apply({th:4})}catch(e){}T96().endC="c_wed";return ""}},
  c_dead:{k:-1,tag:"Chàng chết vì ngươi",w:"lv",t:"{lvn} nhận hết tội, chết trong ngục, đến cuối cùng không nhắc tên ngươi. Người ta trả về cho ngươi {lvtok}, dính một vệt máu khô.",fx:{suc:-15,duc:4},go:A=>{const m=man96();if(m)m.alive=false;T96().endC="c_dead";const v=rv67(A,"v");return (m?`${m.name} đã chết. `:"")+(v?`Ngươi biết ai đã dồn chàng vào chỗ chết: ${v.name}.`:"")}},
  c_lo:{k:-1,tag:"Tư thông bại lộ",w:"emp",t:"Chuyện của ngươi và {lvn} bị phơi bày trước Hoàng thượng. Lần này không còn đường chối.",fx:{},go:()=>{const m=man96();T96().endC="c_lo";if(m&&m.alive){affairExposed(m,`Chuyện của ${S.name} và ${m.name} bị phơi bày.`);return `${m.name} bị xử trảm.`}return ""}},
  c_bimat:{k:0,tag:"Một đêm, rồi thôi",w:"lv",t:"Một đêm duy nhất, rồi đèn tắt và chuyện cũ khép lại mãi mãi. Sáng hôm sau, ngươi lại là phi tần đoan trang của hậu cung.",fx:{suc:8},go:()=>{const m=man96();let r="";try{if(m)r=tryst(m,0)}catch(e){}if(m)m.tinh=Math.min(m.tinh,40);T96().endC="c_bimat";return r}},
  c_tron:{k:1,tag:"Giả chết, cao chạy xa bay",w:"lv",t:"Hai người rời kinh thành trên một con thuyền nhỏ. Kiếp này, ngươi không còn là phi tần nữa.",fx:{},go:A=>{A.tron96=1;T96().endC="c_tron";try{rareReg96();if(window.RARE97)RARE97.meet("tm96c","Giả chết, cao chạy xa bay")}catch(e){}return ""}}}};
/* the shared rare-endings book (j97, review/story-rare): register this arc's rare ending; works whichever module loads first */
function rareReg96(){try{if(window.RARE97&&!rareReg96.d){RARE97.add("tm96c",{t:"Thanh mai trúc mã",tag:"Giả chết, cao chạy xa bay"});rareReg96.d=1}}catch(e){}}
rareReg96();
/* flags on the life record (across the three chapters) */
function A96f(f){const t=T96();if(!t)return;t.f=t.f||{};t.f[f]=1}
function A96has(f){const t=T96();return !!(t&&t.f&&t.f[f])}
/* the option cost may be a function (thuốc giả chết is cheaper for the physician) */
(function(){const o0=opts67;opts67=function(A,b){const L=o0.apply(this,arguments);if(!A||!/^tm96/.test(A.a))return L;return L.map(o=>typeof o.c==="function"?Object.assign({},o,{c:o.c(A)}):o)}})();
/* two-way, month by month: his heart follows hers; a man in love reaches out by himself (true news, real evidence) */
function tm96Month(){const t=T96(),m=man96();if(!t||!m||!m.alive||S.dead||t.endC)return"";let ev="";
 if((t.h||0)<35&&m.tinh>20&&roll(30))m.tinh=cl(m.tinh-1,0,100);
 if(m.trait==="tham vọng"&&m.tinh>30&&roll(8))m.tinh=cl(m.tinh-2,0,100);
 if(m.tinh>=72&&(t.h||0)>=50&&roll(4)){adj96({lt:1});ev+=`Có người lén đưa đến cho ngươi một mảnh giấy của ${m.name}: chàng vẫn nhớ. `}
 if(t.sus>0&&roll(25))t.sus=Math.max(0,t.sus-1);
 return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(S&&!S.dead)ev+=tm96Month()}catch(e){console.error(e)}return ev}})();
/* dev/test hook (no UI): jump the plan to one of the three chapters */
window.__tm96={jump(ch){const c=S.st&&S.st.ch;if(!c)return false;const j=c.plan.indexOf("st:"+ch);if(j<0)return false;c.i=j-1;S.st.M=null;S.st.ms=null;chAdvance67(null);return !!(S.st.M&&S.st.M.a===ch)}};
