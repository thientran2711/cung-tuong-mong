/* ================= jvoice: PALACE VOICE — ONE address core + varied line pools (owner 16/11 19:38Z; VANPHONG §2; one core OD:L1267) =================
   kAddr(sp, ls, o) → {goi, xung}: how speaker `sp` calls listener `ls` and calls itself. Every quoted line in the game takes its address
   from here (no module types "tiểu chủ / nương nương / thần thiếp / bổn cung" by hand any more).
     sp / ls: "emp" | "th" | "hh" | S (the player) | a consort (rivals[]) | a man of S.men (role) | {srv:"f"|"m", name?} (servant, eunuch) |
              S.emp (= "emp"). A consort with .queen = Hoàng hậu.
     o.m   mood: "warm" | "cool" | "cold" (angry). Missing → from the real relation (BAL.voice thresholds: S.sung, S.th, S.hh, aff()).
     o.own true when a servant speaks to HER OWN mistress (default true when the listener is the player and the speaker a servant).
     o.close (own servant, worried / pleading) → "chủ tử". o.full → "‹phẩm› tiểu chủ / nương nương" (formal greeting, another's servant).
     kSpk(actor) maps an event / quest actor {k, o} (j68 evActor, j72 q72A) to a speaker.
   kSay(sp, ls, s, o): fills {goi} {Goi} {xung} {Xung} {ten} (listener's title) {Ten} in s.
   kLine(key, pool, o): picks a line from a pool without repeating any line used for that key in the last BAL.voice.noRepeat tuần
     (least-recently-used when the pool is exhausted). pool = array of strings, or an object {warm:[…], cool:[…], cold:[…], any:[…]}
     picked by o.m (falls back to any). Lines may carry the {goi}… tokens: pass o.sp / o.ls to fill them. Memory S.vl (personal, old saves
     start empty, co-op safe). kLines(key) = the pool registry for the repetition audit (dev/test/voice-rep.js). */
(function(){
const V=()=>BAL.voice;
const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
function who(x){
  if(x==null)return{k:"nar"};
  if(x==="emp"||(typeof S!=="undefined"&&S&&x===S.emp)||x.kind==="emp")return{k:"emp",r:9};
  if(x==="th"||x.kind==="th")return{k:"th",r:10};
  if(x==="hh")return{k:"hh",r:7};
  if(typeof S!=="undefined"&&x===S){const srv=typeof isSrv==="function"&&isSrv();return srv?{k:"srv",f:1,me:1,name:S.name}:{k:"con",r:S.rank|0,me:1,o:S,out:!!S.cold}}
  if(x.srv)return{k:x.srv==="m"?"eun":"srv",name:x.name};
  if(x.kid)return{k:"kid",name:x.name};
  if(x.role&&x.rw)return{k:x.rw==="thị vệ"?"guard":"off",name:x.name};
  if(x.rank!=null||x.queen)return{k:x.queen?"hh":"con",r:x.queen?7:x.rank|0,o:x,out:!!x.out};
  return{k:"srv",name:x.name};
}
function title(w){if(!w||!w.o)return"";try{const r=w.o.queen?"Hoàng hậu":(RANKS[w.r]||{}).n||"";return typeof kitHieuJoin==="function"?kitHieuJoin(r,w.o):r}catch(e){return""}}
function hon(w){return w.k==="hh"||w.r>=7?"Hoàng hậu nương nương":w.r>=V().nuong?"nương nương":"tiểu chủ"}
function mood(sw,lw,sp,ls,o){if(o&&o.m)return o.m;const b=V();let n=null;
  try{if(lw.me){if(sw.k==="emp")n=(S.sung||0)-b.sungMid;else if(sw.k==="th")n=(S.th||0)-b.favMid;else if(sw.k==="hh")n=(S.hh||0)-b.favMid;else if(sw.o)n=aff(sw.o,S)}
   else if(sw.me&&lw.o)n=aff(S,lw.o);else if(sw.o&&lw.o)n=aff(sw.o,lw.o)}catch(e){}
  if(n==null)return"cool";return n>=b.warm?"warm":n<=b.cold?"cold":"cool"}
function kAddr(sp,ls,o){o=o||{};const s=who(sp),l=who(ls),m=mood(s,l,sp,ls,o),T=title(l);let goi="",xung="";
  /* listener: the three above */
  if(l.k==="emp")goi="Hoàng thượng";else if(l.k==="th")goi=s.k==="emp"?"mẫu hậu":"Thái hậu";
  else if(l.k==="hh"&&!(s.k==="emp"||s.k==="th"))goi="Hoàng hậu nương nương";
  else if(l.k==="srv"||l.k==="eun"||l.k==="off"||l.k==="guard")goi=o.name||l.name||"ngươi";
  else{/* a consort (the player, a rival, the Empress heard by Emperor / Thái hậu) */
    const H=l.k==="hh";
    if(s.k==="emp")goi=H?"Hoàng hậu":m==="cold"?"ngươi":m==="warm"?"ái phi":T;
    else if(s.k==="th")goi=H?"Hoàng hậu":m==="cold"?"ngươi":m==="warm"?"con":T;
    else if(s.k==="hh")goi=m==="cold"?"ngươi":m==="warm"?"muội muội":T||"muội muội";
    else if(s.k==="con"){const d=(s.r|0)-(l.r|0);
      if(d>0)goi=m==="cold"?"ngươi":"muội muội";
      else if(d<0)goi=m==="warm"?"tỷ tỷ":l.r>=V().nuong?T+" nương nương":T;
      else goi=m==="warm"?(older(s.o,l.o)?"muội muội":"tỷ tỷ"):m==="cold"?T+" muội muội":(older(s.o,l.o)?"muội muội":"tỷ tỷ")}
    else{/* servants, eunuchs, officials, guards */
      const own=o.own!=null?o.own:!!l.me;if(l.out&&m==="cold")goi="ngươi";
      else if(s.k==="kid")goi=H||l.r>=7?"mẫu hậu":"mẫu phi";
      else goi=own&&o.close?"chủ tử":o.full&&!H?T+" "+hon(l):hon(l)}}
  /* speaker's self word */
  if(s.k==="emp")xung="trẫm";else if(s.k==="th")xung="ai gia";
  else if(s.k==="srv")xung="nô tỳ";else if(s.k==="eun"||s.k==="guard")xung="nô tài";else if(s.k==="kid")xung="nhi thần";else if(s.k==="off")xung="vi thần";
  else if(s.k==="hh")xung=l.k==="emp"||l.k==="th"?"thần thiếp":"bổn cung";
  else if(s.k==="con"){if(l.k==="emp"||l.k==="th"||l.k==="hh")xung="thần thiếp";
    else if(l.k==="con"){const d=(s.r|0)-(l.r|0);xung=d<0?(m==="warm"?"muội":"tần thiếp"):m==="warm"?(d>0||older(s.o,l.o)?"tỷ":"muội"):s.r>=V().nuong?"bổn cung":"ta"}
    else xung=s.r>=V().nuong?"bổn cung":"ta"}
  else xung="ta";
  return{goi,xung,m,ten:T}}
/* an event / quest actor ({k, o} of j68 evActor, j72 q72A) → a kAddr speaker */
function kSpk(a){if(!a)return null;const k=a.k,o=a.o;try{
  if(k==="emp")return"emp";if(k==="th")return"th";if(k==="hh")return o&&o.queen?o:"hh";
  if(k==="sv"||k==="rsv"||k==="serv")return{srv:o&&o.role==="maid"?"f":"m",name:o&&o.name};
  if(k==="maid"||k==="fam"||k==="mama")return{srv:"f",name:o&&o.name};if(k==="eun"||k==="ksp")return{srv:"m",name:o&&o.name};
  if(k==="doc"||k==="off")return{role:"x",rw:"quan",name:o&&o.name};if(k==="ak"||k==="kid")return{kid:1,name:o&&o.name};
  if(k==="man")return o;if(o&&(o.rank!=null||o.queen))return o}catch(e){}return null}
function older(a,b){try{return (a&&a.age||0)>=(b&&b.age||0)}catch(e){return true}}
function kSay(sp,ls,s,o){if(s==null)return s;s=String(s);if(!/\{(?:[Gg]oi|[Xx]ung|[Tt]en)\}/.test(s))return s;const a=kAddr(sp,ls,o);
  return s.replace(/\{goi\}/g,a.goi).replace(/\{Goi\}/g,cap(a.goi)).replace(/\{xung\}/g,a.xung).replace(/\{Xung\}/g,cap(a.xung)).replace(/\{ten\}/g,a.ten).replace(/\{Ten\}/g,cap(a.ten))}
/* ---- varied pools, no repeat within BAL.voice.noRepeat tuần ---- */
const REG={};
function now(){try{return typeof wk==="function"?wk():0}catch(e){return 0}}
function kLine(key,pool,o){o=o||{};let L=pool;if(!Array.isArray(L)){const m=o.m||(o.sp!=null||o.ls!=null?kAddr(o.sp,o.ls,o).m:"cool");L=(L[m]&&L[m].length?L[m]:[]).concat(L.any||[]);if(!L.length)L=[].concat(...Object.values(pool))}
  REG[key]=pool;if(!L.length)return"";let mem={};try{S.vl=S.vl||{};mem=S.vl[key]=S.vl[key]||{}}catch(e){}
  const t=now(),gap=V().noRepeat;
  const fresh=L.filter(x=>mem[x]==null||t-mem[x]>=gap||t<mem[x]);
  const pickFrom=fresh.length?fresh:L.slice().sort((a,b)=>(mem[a]==null?-1e9:mem[a])-(mem[b]==null?-1e9:mem[b])).slice(0,1);
  const line=pickFrom[Math.floor(Math.random()*pickFrom.length)];
  try{mem[line]=t;const ks=Object.keys(mem);if(ks.length>40)for(const k of ks)if(t-mem[k]>gap*4)delete mem[k]}catch(e){}
  return o.sp!=null||o.ls!=null?kSay(o.sp,o.ls,line,o):line}
/* ---- outcome flavour (VANPHONG §2.5): one short court-voice sentence before the plain numbers of a talk / visit result ----
   kOutcome(kind, ok): kind = the person's kind on the stage (th, emp, hh, rival, fallen, maid, ksp, ty, elder, man, kid); pooled, no repeat */
const OUT={
 th:{ok:["Thái hậu khẽ gật đầu, tràng hạt lần chậm lại","Thái hậu cho ngồi, sai người dâng trà sen","Thái hậu cười hiền, hỏi han đôi câu chuyện nhà","Thái hậu nghe xong, vẻ mặt dịu đi hẳn","Ma ma Đức Thọ cung tiễn ta ra tận cửa","Thái hậu kể cho ta nghe chuyện thời còn trẻ","Thái hậu ban cho ta một hộp mứt sen","Thái hậu bảo ta mai lại sang"],
  no:["Thái hậu chỉ ừ một tiếng, rồi nhắm mắt lần tràng hạt","Thái hậu bảo mệt, cho lui sớm","Thái hậu nhìn ta một lượt, chẳng nói thêm","Lời ta chưa dứt, Thái hậu đã chuyển sang chuyện khác","Thái hậu thở dài, chẳng biết vì ta hay vì chuyện khác","Ma ma ra hiệu cho ta lui, Thái hậu đã thiếp đi","Thái hậu chỉ dặn một câu: biết phận thì hơn"]},
 hh:{ok:["Hoàng hậu mỉm cười, giọng ôn tồn hẳn","Hoàng hậu gọi ta ngồi gần, hỏi chuyện cung ta","Hoàng hậu khen ta biết lễ trước mặt các cung","Hoàng hậu sai người gói điểm tâm cho ta mang về","Hoàng hậu cho ta xem bức thêu đang làm dở","Hoàng hậu gật đầu, bảo ta là người hiểu chuyện","Hoàng hậu nhắc ta giữ gìn sức khỏe, giọng ân cần"],
  no:["Hoàng hậu vẫn cười, nhưng ý cười chẳng tới đáy mắt","Hoàng hậu phẩy khăn, chuyển sang hỏi người khác","Các phi tần đưa mắt nhìn nhau, Hoàng hậu chẳng nói gì","Hoàng hậu bảo ta về nghỉ sớm, giọng nhạt như nước","Hoàng hậu bận xem sổ sách, chẳng ngẩng lên","Hoàng hậu bảo: việc ấy để sau hãy bàn","Ma ma Càn Ninh cung tiễn ta ra, mặt lạnh như tiền"]},
 emp:{ok:["Hoàng thượng bật cười, mệt mỏi như tan đi","Hoàng thượng nắm tay ta, chẳng vội buông","Hoàng thượng gác bút, ngồi nghe ta nói hết","Ánh mắt Hoàng thượng dừng ở ta lâu hơn thường lệ","Hoàng thượng bảo ta ngồi lại thêm chút nữa","Hoàng thượng khen ta hiểu ý, giọng ấm hẳn","Hoàng thượng sai người mang trà ngon nhất ra mời"],
  no:["Hoàng thượng ừ một tiếng rồi cầm tấu chương lên","Hoàng thượng khẽ nhíu mày, chẳng nói thêm","Hoàng thượng phất tay cho lui","Hoàng thượng đang bận lòng việc triều, chẳng để ý lời ta","Hoàng thượng nhìn ra ngoài cửa sổ, lòng để tận đâu","Tổng quản thái giám ra hiệu, Hoàng thượng còn bận việc","Hoàng thượng nghe xong, chỉ nói: để trẫm nghĩ đã"]},
 rival:{ok:["Nàng ta nắm tay ta, cười như chị em lâu ngày","Nàng ta tiễn ta ra tận cửa cung","Hai bên trò chuyện rôm rả, chén trà nguội lúc nào chẳng hay","Nàng ta ghé tai kể cho ta mấy chuyện trong cung","Nàng ta mời ta ở lại dùng bữa","Nàng ta tặng ta một túi hương tự tay khâu","Nàng ta tiễn ta, hẹn hôm sau sang chơi"],
  no:["Nàng ta cười nhạt, tay mân mê chén trà","Nàng ta bảo đang mệt, chẳng tiện tiếp lâu","Lời qua tiếng lại, ai cũng giữ ý","Nàng ta phe phẩy quạt, giọng mát như nước giếng","Nàng ta nói chuyện thời tiết, khéo tránh mọi điều ta hỏi","Người hầu bên nàng ta cứ đứng sát, chẳng nói được gì riêng","Nàng ta cười khẽ, ánh mắt như dò xét"]},
 maid:{ok:["Người hầu cúi đầu vâng dạ, mắt sáng lên","Kẻ dưới thấy ta tử tế, làm việc càng chăm","Người hầu lui ra, bước chân nhẹ hẳn"],no:["Người hầu cúi gằm, chẳng dám nói thêm","Kẻ dưới vâng dạ cho qua, lòng chẳng phục","Người hầu lui ra, sắc mặt khó coi"]},
 any:{ok:["Mọi việc trôi chảy như ý","Người nghe gật gù, lòng đã xuôi","Lời ta nói ra, người kia nghe lọt tai"],no:["Việc chẳng thành, đành hẹn dịp khác","Người kia lắc đầu, chẳng chịu nghe","Ta về tay không, lòng chẳng vui"]}};
OUT.fallen=OUT.rival;OUT.ksp=OUT.maid;OUT.ty=OUT.any;OUT.elder=OUT.maid;OUT.man=OUT.any;OUT.kid=OUT.any;
function kOutcome(kind,ok){const P=OUT[kind]||OUT.any;return kLine("out:"+(OUT[kind]?kind:"any")+":"+(ok?"ok":"no"),ok?P.ok:P.no)}
window.kOutcome=kOutcome;
window.kAddr=kAddr;window.kSay=kSay;window.kLine=kLine;window.kLines=()=>REG;window.kVoiceWho=who;window.kSpk=kSpk;
})();
