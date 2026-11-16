/* ================= jstaff: NAMED PALACE STAFF (owner 16/11, review/elder-staff) =================
   Five named servants hold the palace's offices, each with 3–4 duties (numbers and names in BAL.staff, jbal.js):
     gt  Giáo tập ma ma, Trữ Tú cung: sent by Thái hậu, in Thái hậu's household; teaches tú nữ, lễ nghi, tuyển tú; the tutorial guide.
     tn  Chưởng sự cô cô, Đức Thọ cung: Thái hậu's woman; her edicts, cung quy, punishments, Tân Giả khố.
     kn  Quản sự ma ma, Càn Ninh cung: Hoàng hậu's woman (kept in Thái hậu's household while the seat is empty); maid assignments,
         lệ bạc, Thượng cung cục, the monthly palace report.
     the Emperor's two eunuchs = the existing S.court.tq (Tổng quản) and S.court.ksp (Kính sự phòng), already in the Cung nhân list.
   The women are REAL servants: ordinary staff entries (j10 model: sid, role "maid", rk by SRK, tr, loyal, af, spyFor, lover) in their
   master's `staff`, so every household rule holds (srkMax rank cap, capOf household size, bribing, ageing, faces). Thái hậu's
   household is S.thO.staff (a world key in co-op, host-authoritative); allServ / ownerOf include it.
   Face: one identity for life, unique in the game (figUsed): a ma ma identity (img/FIGURES-servants.json role mama), else a plain maid
   identity; always the a51 art (the tiered maid art and the a36 art look young). staffFace(st) = pServ(st) = THE face used by the
   Cung nhân list, the person card, the stage, events and the tutorial guide (staffGuide()).
   Ageing: allServ ages them (j17 ageYear); at `retire` she leaves (cáo lão) and the next name of the post takes over. Mortality hook:
   window.STAFF_MORT (fn(st) -> true = she died this year) for review/mortality; nothing depends on it. */
(function(){
const B=()=>(typeof BAL!=="undefined"&&BAL.staff)||{posts:[]};
const postOf=id=>B().posts.find(p=>p.id===id)||null;
const rint=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const isGuest=()=>{try{return !!(window.COOPW&&COOPW.on&&COOPW.seat==="b")}catch(e){return false}};
const thH=()=>{if(!S)return null;S.thO=S.thO||{};if(!Array.isArray(S.thO.staff))S.thO.staff=[];return S.thO};
/* ---------- Thái hậu's household joins the servant model ---------- */
if(typeof allServ==="function"){const a0=allServ;allServ=function(){const L=a0.apply(this,arguments);try{if(S&&S.thO&&Array.isArray(S.thO.staff))for(const s of S.thO.staff)if(!L.includes(s))L.push(s)}catch(e){}return L}}
if(typeof ownerOf==="function"){const o0=ownerOf;ownerOf=function(s){const r=o0.apply(this,arguments);if(r)return r;try{if(S&&S.thO&&(S.thO.staff||[]).includes(s))return S.thO}catch(e){}return null}}
/* Thái hậu ranks above every consort: the highest servant rank, the biggest household */
if(typeof srkMax==="function"){const m0=srkMax;srkMax=function(o,s){if(S&&o&&o===S.thO)return s&&s.role==="maid"?4:3;return m0.apply(this,arguments)}}
if(typeof capOf==="function"){const c0=capOf;capOf=function(p){if(S&&p&&p===S.thO)return[4,2];return c0.apply(this,arguments)}}
/* her title is her post (SRK has no "ma ma" word: rank 4 is the Nữ quan dress) */
if(typeof srkName==="function"){const n0=srkName;srkName=function(s){const p=s&&s.eid&&postOf(s.eid);return p?p.title:n0.apply(this,arguments)}}
function elders(){try{return allServ().filter(s=>s&&s.eid&&postOf(s.eid))}catch(e){return[]}}
function elderBy(id){return elders().find(s=>s.eid===id)||null}
function masterFor(post){if(post.master==="hh"){const q=typeof queenP==="function"?queenP():null;if(q&&(q===S||(q.alive!==false&&!q.out)))return q}return thH()}
function masterName(m){if(!m)return"";if(m===S.thO)return"Thái hậu";if(m===S)return"ngươi";return m.queen?`Hoàng hậu ${m.name}`:m.name}
function mk(post,i,age){const nm=post.names[i%post.names.length];if(typeof sidN!=="undefined")sidN=Math.max(sidN,...allServ().map(s=>s.sid||0),0);
 return{sid:typeof sidN!=="undefined"?++sidN:Date.now(),eid:post.id,n:i,name:nm[0],call:nm[1],role:"maid",rk:post.rk,age,retire:rint(...(B().retire||[63,68])),
  tr:post.tr||"trung",loyal:70+R(16),spyFor:null,lover:null,af:{},hue:0,face:-1,fc:"",fk:"",fid:"",elder:1,since:S?S.year:1}}
const elderCallOf=m=>{const st=(m.staff||[]).find(s=>s.eid);return st?st.call:"ma ma"};
/* keep the household rule: a master over her cap sends an ordinary maid back to Nội vụ phủ (never a named one, a spy of hers, a lover) */
function fitCap(m){try{if(!m||!m.staff||m===S.thO)return;const cap=capOf(m)[0];let n=m.staff.filter(s=>s.role==="maid").length+1;
 while(n>cap){const L=m.staff.filter(s=>s.role==="maid"&&!s.eid&&s.spyFor!=="me"&&!s.lover);const x=L[L.length-1]||m.staff.find(s=>s.role==="maid"&&!s.eid);if(!x)break;
  m.staff.splice(m.staff.indexOf(x),1);try{if(x.fid){const U=figUsed();const i=U.indexOf(x.fid);if(i>=0)U.splice(i,1)}}catch(e){}n--;if(m===S)log(`Nội vụ phủ điều ${x.name} sang cung khác để ${elderCallOf(m)} về hầu.`)}}catch(e){}}
/* every post filled, each woman in the right household; her rank within the master's cap (srkMax) */
function place(st){const post=postOf(st.eid);if(!post)return;const m=masterFor(post);if(!m)return;if(!m.staff)m.staff=[];
 for(const o of [S,S.thO].concat(rivals||[]))if(o&&o!==m&&Array.isArray(o.staff)&&o.staff.includes(st))o.staff.splice(o.staff.indexOf(st),1);
 if(!m.staff.includes(st)){m.staff.push(st);fitCap(m)}st.rk=Math.min(post.rk,srkMax(m,st));if(st.spyFor&&m===S)st.spyFor=null}
function giveFace(st){if(!S||!st||isGuest())return;
 if(!st.fc&&typeof drawF==="function"){try{st.fc=drawF(["mama","womid"],st.age)||"";st.fk="mama"}catch(e){}}
 if(st.fid||typeof FIGS==="undefined"||!FIGS.length)return;
 const U=new Set(figUsed());const keys=r=>Object.keys((typeof FIGIX!=="undefined"&&FIGIX[r])||{}).sort();
 let k=keys("mama").find(x=>!U.has(x));
 if(!k){const fm=keys("maid").filter(x=>!U.has(x)&&((FIGIX.maid||{})[x]||[]).some(f=>(f.tier==null||f.tier==="")&&f.ageBand==="a51"&&f.por));if(fm.length)k=fm[Math.floor(Math.random()*fm.length)]}
 if(k){st.fid=k;figUsed().push(k)}}
function elderInit(){if(!S||isGuest())return;thH();
 for(const post of B().posts){let st=elderBy(post.id);if(!st)st=mk(post,0,rint(post.age[0],post.age[1]));place(st);giveFace(st)}
 for(const st of elders()){st.elder=1;try{const K=typeof k61S==="function"?k61S():S.known;if(K&&typeof kOf61==="function"){const k=kOf61(st);if((+K[k]||0)<2)K[k]=2}}catch(e){}}}
/* the identity's picture: the a51 art of her identity */
function figRec(st){try{if(!st||!st.fid||typeof FIGIX==="undefined")return null;const r=st.fid.split(":")[0];const L=(FIGIX[r]||{})[st.fid]||[];if(!L.length)return null;
 if(r==="maid")return L.find(f=>(f.tier==null||f.tier==="")&&f.ageBand==="a51")||null;
 return L.find(f=>f.ageBand==="a51"&&f.por)||L.find(f=>f.ageBand==="a51")||figBest(L,null,st.age||55)}catch(e){return null}}
const porSrc=st=>{const f=figRec(st);return f?figPath(f.por||f.file||f.src):""};
const figSrc=st=>{const f=figRec(st);return f?figPath(f.file||f.src):""};
if(typeof figFor==="function"){const ff=figFor;figFor=function(p,kind){try{let w=p&&(p.ref||p);if(w&&w.kind==="elder"&&w.ref)w=w.ref;if(w&&w.eid&&postOf(w.eid)){giveFace(w);const s=kind==="por"?porSrc(w):figSrc(w);if(s)return s}}catch(e){}return ff.apply(this,arguments)}}
/* THE face object: the same pServ() the Cung nhân list draws, with the kit role/rank and the person attached */
function staffFace(st){if(!st)return null;giveFace(st);let f;try{f=pServ(st)}catch(e){f={src:porSrc(st),hue:0,col:"#a0584a"}}
 if(!f.src)f.src=porSrc(st)||(typeof fsrc==="function"?fsrc(st.fc,""):"");f.ini=String(st.call||st.name).split(" ")[0];f.rw=postOf(st.eid)?postOf(st.eid).title:f.rw;
 try{f.__kr=personRoleRank(st)}catch(e){f.__kr={role:"mama",rank:st.rk,origin:null,sex:"f",kid:false}}f.__kp=st;return f}
function office(st){const p=postOf(st.eid);return p?`${p.title} ${p.palace}`:""}
window.elders=elders;window.elderBy=elderBy;window.staffFace=staffFace;window.elderInit=elderInit;window.elderOffice=office;
window.elderCall=id=>{const st=elderBy(id);return st?st.call:""};
/* the tutorial guide (review/tutorial-r2 jtut.js): {id,name,title,office,face,kr}; face = the same object as everywhere */
window.staffGuide=function(){try{if(!S)return null;if(!elderBy("gt"))elderInit();const st=elderBy("gt");if(!st)return null;const p=postOf("gt");const f=staffFace(st);
 return{id:"gt",sid:st.sid,name:st.call,full:st.name,title:p.title,office:`${p.title} ${p.palace}`,palace:p.palace,master:"Thái hậu",face:f,kr:f.__kr,age:st.age}}catch(e){return null}};
/* ---------- hooks: seed + re-place (new game, old saves silently, a new or fallen Hoàng hậu), retirement ---------- */
if(typeof staffInit==="function"){const s0=staffInit;staffInit=function(){const r=s0.apply(this,arguments);try{elderInit()}catch(e){console.error("elder",e)}return r}}
window.STAFF_MORT=window.STAFF_MORT||null;
function succeed(st,why){const post=postOf(st.eid);if(!post)return"";const m=ownerOf(st);const used=new Set(allServ().map(e=>e.name));let i=st.n+1;
 for(let j=0;j<post.names.length&&used.has(post.names[i%post.names.length][0]);j++)i++;
 const nw=mk(post,i,rint(...(B().succAge||[46,54])));try{if(st.fid){const U=figUsed();const x=U.indexOf(st.fid);if(x>=0)U.splice(x,1)}}catch(e){}
 if(m&&m.staff)m.staff.splice(m.staff.indexOf(st),1,nw);place(nw);giveFace(nw);try{const K=typeof k61S==="function"?k61S():S.known;if(K)K[kOf61(nw)]=2}catch(e){}
 return `${st.call}, ${post.title.toLowerCase()} ${post.palace}, ${why}; ${nw.call} lên thay. `}
if(typeof ageYear==="function"){const a0=ageYear;ageYear=function(){const r=a0.apply(this,arguments);try{if(isGuest())return r;let ev="";
 for(const st of elders()){let dead=false;try{dead=typeof window.STAFF_MORT==="function"&&!!window.STAFF_MORT(st)}catch(e){}
  if(dead)ev+=succeed(st,"qua đời");else if(st.age>=st.retire)ev+=succeed(st,"cáo lão về quê dưỡng già")}
 if(ev)log(ev.trim())}catch(e){}return r}}
/* ---------- monthly palace report (Quản sự ma ma, Càn Ninh cung); re-place after a change of Hoàng hậu ---------- */
function monthReport(){try{if(!isGuest())elderInit();const st=elderBy("kn");if(!st||S.dead)return"";const L=(typeof liveRivals==="function"?liveRivals(true):[]).filter(v=>v.alive&&!v.out);
 const top=L.slice().sort((a,b)=>(b.nights||0)-(a.nights||0))[0];const sick=L.filter(v=>v.ill&&v.ill.known).length;
 const parts=["lệ bạc đã phát đủ các cung"];if(top&&(top.nights||0)>0)parts.push(`sổ Kính sự phòng ghi ${typeof rkName==="function"?rkName(top):""} ${top.name} được gọi nhiều nhất`);if(sick)parts.push(`${sick} cung có người ốm`);
 return `${st.call} (${office(st)}) bẩm sổ tháng: ${parts.join(", ")}. `}catch(e){return""}}
if(typeof heirMonth==="function"){const h0=heirMonth;heirMonth=function(){const r=h0.apply(this,arguments)||"";return r+monthReport()}}
/* ---------- Cung nhân list (j15 staffTabHTML): Thái hậu's household rows; the named women's card groups ---------- */
window.elderTabRows=function(){try{const T=S&&S.thO&&S.thO.staff||[];return T.map((s,j)=>({t:"thh",s,f:pServ(s),name:typeof shortN==="function"?shortN(s.name):s.name,sep:j?"":"Cung Thái hậu"}))}catch(e){return[]}};
function giaoBtns(st){const p=postOf(st.eid);const t2=typeof whyTime==="function"?whyTime(B().talk||2):"";const g=B().gift||20;
 return [pbtn(`data-elder="bieu" data-eid="${st.eid}"`,"Biếu",`Bạc -${g} · người ấy quý ngươi +${B().giftAf||10}`,S.bac<g?`cần ${g} bạc`:""),
  pbtn(`data-elder="hoi" data-eid="${st.eid}"`,"Hỏi chuyện",`Chắc chắn · ${B().talk||2} khắc · thành: nghe chuyện ${p.palace}`,t2)]}
function dutyRows(st){const p=postOf(st.eid);const m=ownerOf(st);return[["Chức",`${p.title} ${p.palace}`,"t"],["Chủ",masterName(m)+(p.master==="hh"&&m===S.thO?" (giữ thay Hoàng hậu)":p.id==="gt"?" sai đến Trữ Tú cung":""),"t"],["Việc",p.duties.join(", "),"t"]]}
window.elderGroups=st=>{try{return st&&st.eid&&postOf(st.eid)?[["Chức việc",dutyRows(st)],["Giao thiệp",giaoBtns(st)]]:[]}catch(e){return[]}};
/* ---------- the stage: where each one works; her card = the kit pcard ---------- */
function stageP(st){const p=postOf(st.eid);return{kind:"elder",ref:st,eid:st.eid,name:st.call,ini:String(st.call).split(" ")[0],col:staffFace(st).col,info:`${p.title} ${p.palace}`}}
function addStage(V){try{if(!V||!V.people)return V;const k=V.k;if(V.people.some(p=>p.kind==="elder"))return V;
 const put=id=>{const st=elderBy(id);if(st)V.people.push(stageP(st))};
 if(k==="tn"&&!S.thDead)put("tn");if(k==="kn")put("kn");if(k==="tgk")put("tn");
 if(k==="home"&&(S.turn||0)<=4&&!S.out)put("gt")}catch(e){}return V}
const tgkMsg=st=>`Nước giặt lạnh buốt, chậu gỗ chất cao. ${st.call} của Đức Thọ cung cầm roi đứng canh.`;
if(typeof goTo==="function"){const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(S&&S.visit&&S.visit.k===k&&k!=="home"){addStage(S.visit);render()}}catch(e){}return r}}
if(typeof homePeople==="function"){const h0=homePeople;homePeople=function(){const L=h0.apply(this,arguments);try{return addStage({k:"home",people:L}).people}catch(e){return L}}}
if(typeof srvVisitOf==="function"){const v0=srvVisitOf;srvVisitOf=function(k){const V=v0.apply(this,arguments);try{if(k!=="home")addStage(V);const st=elderBy("tn");if(k==="tgk"&&st&&V)V.msg=tgkMsg(st)}catch(e){}return V}}
if(typeof pFaceOf==="function"){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="elder"&&p.ref)return staffFace(p.ref);return f0.apply(this,arguments)}}
if(typeof personRoleRank==="function"){const r0=personRoleRank;personRoleRank=function(p){if(p&&p.kind==="elder"&&p.ref)return r0.call(this,p.ref);return r0.apply(this,arguments)}}
/* palace women are known by name and office from the first day (Biết tên); talking makes her Quen biết (j61 familiarity rules) */
if(typeof k61St==="function"){const k0=k61St;k61St=function(e){const v=k0.apply(this,arguments);return e&&e.eid&&e.elder?Math.max(2,v):v}}
const STAFF_SAY={
 tnDead:["“Từ ngày Thái hậu đi, Đức Thọ cung chỉ còn khói hương.”","“Chuỗi tràng hạt của Thái hậu, nô tỳ vẫn lau mỗi sớm.”","“Đức Thọ cung giờ vắng lắm, đêm nghe cả tiếng lá rơi.”","“Thỉnh thoảng nô tỳ vẫn pha trà cho Thái hậu, rồi mới nhớ ra người không còn.”","“Thái hậu đi rồi, nô tỳ chỉ mong giữ được hương khói cho tử tế.”"],
 tnHi:["“Thái hậu dạo này hay nhắc đến {goi}.”","“Hôm qua Thái hậu hỏi nô tỳ, {goi} dạo này ăn ngủ có ngon không.”","“Thái hậu bảo trà {goi} dâng hôm trước rất vừa miệng.”","“Có người nói xấu {goi} trước mặt Thái hậu, Thái hậu chỉ cười cho qua.”","“Thái hậu dặn nô tỳ, hễ {goi} sang thì pha trà Long Tỉnh.”"],
 tnMid:["“Thái hậu chưa nói gì về {goi}. {Goi} chăm thỉnh an thì hơn.”","“Thái hậu ít khi nhắc đến {goi}. Lửa gần rơm lâu ngày mới bén, {goi} cứ thong thả.”","“Lòng Thái hậu như mặt hồ, chưa gợn sóng vì ai. {Goi} chịu khó lui tới.”","“Thái hậu thích người biết giữ lễ, chẳng thích người khéo miệng. Nô tỳ chỉ dám thưa vậy.”","“Thái hậu ít lời, nhưng ai đến ai không, người đều nhớ cả.”"],
 tnLo:["“Thái hậu không vui khi nghe nhắc đến {goi}. {Goi} chớ để lỡ lễ nữa.”","“Hôm trước có người nhắc tên {goi}, Thái hậu đặt chén trà xuống chẳng nói gì. {Goi} nên cẩn trọng.”","“Thái hậu đang phật ý. Nước chảy đá mòn, {goi} cứ chăm thỉnh an, đừng nóng vội.”","“Nô tỳ không dám nói nhiều. Chỉ xin {goi} dạo này đến Đức Thọ cung cho đúng giờ.”","“Hôm qua có người kể chuyện {goi} trước mặt Thái hậu. Nô tỳ không dám nói là chuyện gì.”"],
 knNone:["“Càn Ninh cung còn để trống. Việc lục cung tạm bẩm lên Thái hậu.”","“Ngôi Trung cung còn trống, sổ sách lục cung nô tỳ đưa sang Đức Thọ cung cả.”","“Chưa có chủ mới, Càn Ninh cung đêm nào cũng chỉ thắp một ngọn đèn.”","“Việc lục cung giờ chia cho mấy vị nương nương lớn, sổ sách rối lắm.”","“Thái hậu nói ngôi Trung cung chẳng thể để trống lâu.”"],
 knMe:["“{Goi} cứ dặn, sổ sách lục cung nô tỳ giữ đủ.”","“Bẩm {goi}, sổ chi tiêu tháng này đã kê xong, xin {goi} xem qua.”","“Các cung đều đã nộp sổ. {Goi} có điều gì cần hỏi, nô tỳ xin thưa.”","“Nội vụ phủ xin {goi} duyệt bổng lộc các cung tháng này.”","“Mấy cung vừa cãi nhau vì than sưởi, xin {goi} phân xử.”"],
 knHi:["[lo]“Hoàng hậu bảo, {goi} mới vào cung mà biết phép, hiếm có.”","[lo]“Hoàng hậu hỏi nô tỳ, {goi} ở cung có thiếu thốn gì không.”","“Hoàng hậu có lời khen {goi} biết giữ lễ.”","“Hoàng hậu bảo, trong các cung chỉ có {goi} là hiểu chuyện.”","“Hôm qua Hoàng hậu cho người cất phần điểm tâm, dặn để dành cho {goi}.”","“Hoàng hậu nói, {goi} hiền mà không yếu, khó gặp lắm.”","[mid,hi]“Hoàng hậu có ý cho {goi} giúp việc lục cung, nô tỳ nghe phong thanh vậy.”"],
 knMid:["“Hoàng hậu chưa nói gì về {goi}.”","“Hoàng hậu bận việc lục cung, ít khi nhắc tên ai. {Goi} chớ bận lòng.”","“Hoàng hậu xưa nay xét người lâu. {Goi} cứ giữ lễ là hơn.”","“Hoàng hậu không nói gì, nhưng người vẫn để ý từng cung.”","“Hoàng hậu thích người chăm chỉ thỉnh an, {goi} nhớ cho.”"],
 knLo:["“Hoàng hậu thấy {goi} chưa biết phận.”","“Nô tỳ nói thật lòng: Hoàng hậu dạo này nhắc đến {goi} chẳng mấy vui.”","“Cây cao thì gió lay. Hoàng hậu đang để mắt đến {goi} đấy.”","“Hoàng hậu bảo, có người nên bớt khoe khoang. Nô tỳ chẳng dám nói là ai.”","“Hôm qua Hoàng hậu xem lại sổ cung {goi}, rất lâu.”"]};
function talkLine(st){const warm=((st.af&&st.af.me)||0)>=30;
 if(st.eid==="gt")return kLine("staff:gt",[`[lo]“Đi đứng chớ ngẩng cao đầu quá vai người trên. Cung quy là thế.”`,`[lo]“Gặp Hoàng hậu thì quỳ trước, thưa sau. Gặp Thái hậu thì chờ người cho đứng dậy.”`,`[lo]“Tú nữ mới năm nay có mấy người lanh lợi. Chớ để bị lấn.”`,`“Lời nói trong cung như nước đổ, không hốt lại được.”`,`“Ăn không nói, ngủ không than. Trong cung, cái miệng phải theo phép.”`,`[lo]“Bước nhỏ, đầu cúi, tay đặt trước người. Người trên nhìn xuống, chỉ nên thấy sự nhu thuận.”`,`“Cẩn ngôn thận hành, bốn chữ ấy giữ mạng người trong cung.”`,`[mid]“{Goi} nay đã làm chủ một cung, người dưới học theo từng bước đi của {goi}.”`,`[mid]“Chủ vị giữ lễ thì cả cung yên. Lão nô chỉ dám nhắc vậy.”`,`[mid]“Cung riêng thì việc riêng nhiều. Kẻ hầu phải dạy từ sớm, {goi} ạ.”`,`[hi]“Phẩm càng cao, lễ càng phải đủ. Lão nô dạy cả đời, chỉ nói được vậy.”`,`[hi]“Ngồi gần Trung cung thì phải biết lùi một bước.”`,`[hi]“Các phi đều nhìn {goi}. Một cái nhíu mày cũng thành chuyện.”`,`[hq]“Mẫu nghi thiên hạ, một lời ban ra là lệ của lục cung.”`,`[hq]“Trung cung khoan hòa thì lục cung yên ổn.”`,`[hq]“Lão nô dạy {goi} từ ngày mới vào cung. Nay {goi} ngồi Trung cung, lão nô chỉ biết mừng.”`],{sp:{srv:"f"},ls:S});
 /* palace voice: each answer is a pool by how things stand (jvoice kLine, no repeat within BAL.voice.noRepeat tuần), address from the one core */
 if(st.eid==="tn"){if(S.thDead)return kLine("staff:tn:dead",STAFF_SAY.tnDead);const t=S.th||0;
  return kLine("staff:tn:"+(t>=30?"hi":t>=0?"mid":"lo"),STAFF_SAY["tn"+(t>=30?"Hi":t>=0?"Mid":"Lo")],{sp:{srv:"f"},ls:S})+(warm?` Thái hậu → ngươi: thiện cảm <b>${t}</b>.`:"")}
 if(st.eid==="kn"){const q=typeof queenP==="function"?queenP():null;if(!q)return kLine("staff:kn:none",STAFF_SAY.knNone);if(q===S)return kLine("staff:kn:me",STAFF_SAY.knMe,{sp:{srv:"f"},ls:S});
  const v=typeof rel==="function"?rel(q,S):0;return kLine("staff:kn:"+(v>=10?"hi":v>-10?"mid":"lo"),STAFF_SAY["kn"+(v>=10?"Hi":v>-10?"Mid":"Lo")],{sp:{srv:"f"},ls:S})+(warm?` Hoàng hậu → ngươi: thiện cảm <b>${v}</b>.`:"")}
 return""}
function cardHTML(st){const p=postOf(st.eid);const f=staffFace(st);
 const lines=[typeof tuoi==="function"?tuoi(st.age):"",`Thiện cảm <b>${(st.af&&st.af.me)||0}</b>`].filter(Boolean);
 const close=`<button type="button" class="kit-x pcx" id="popx" aria-label="Đóng" title="Đóng">✕</button>`;
 return pcard({f,col:f.col,name:`${st.call} · ${st.name}`,rank:p.title,lines,chips:[],close,note:popMsg||"",groups:window.elderGroups(st),empty:""})}
window.staffTalkLine=st=>talkLine(typeof st==="string"?elderBy(st):st);/* palace-voice audit (dev/test/voice-pool-sim.js) */
window.elderCardHTML=st=>{try{return cardHTML(typeof st==="string"?elderBy(st):st)}catch(e){return""}};
if(typeof popCard==="function"){const c0=popCard;popCard=function(p){if(p&&p.kind==="elder"&&p.ref)return cardHTML(p.ref);return c0.apply(this,arguments)}}
function act(a,id){const st=elderBy(id);if(!st||!S||S.dead||Q.length)return;let r="";
 if(a==="bieu"){const g=B().gift||20;if(S.bac<g)return;apply({bac:-g});st.af.me=(st.af.me||0)+(B().giftAf||10);r=`Biếu ${st.call} ${g} lượng: người ấy quý ngươi +${B().giftAf||10}.`}
 if(a==="hoi"){const n=B().talk||2;if(!can(n))return;spend(n);st.af.me=(st.af.me||0)+1;try{if(typeof k61Meet==="function"&&k61St(st)<3)k61Meet(st,"trò chuyện",3)}catch(e){}r=`${st.call}: ${talkLine(st)}`}
 if(r){log(r);popMsg=r;render()}}
document.addEventListener("click",e=>{const b=e.target&&e.target.closest&&e.target.closest("[data-elder]");if(!b||b.disabled)return;e.stopPropagation();e.preventDefault();act(b.dataset.elder,b.dataset.eid)},true);
/* ---------- they speak by name in events and the log (LUẬT SỬA CẢ NHÓM: one table for every generic "ma ma" of these offices) ---------- */
function tx(s){if(!s||typeof s!=="string"||!S)return s;const tn=elderBy("tn"),gt=elderBy("gt");let o=s;
 if(tn&&!S.thDead){o=o.replace(/Ma ma thân tín của Thái hậu/g,`${tn.call}, người thân tín của Thái hậu,`).replace(/Ma ma bên Đức Thọ cung/g,`${tn.call} bên Đức Thọ cung`)
  .replace(/Ma ma Đức Thọ cung/g,`${tn.call} ở Đức Thọ cung`).replace(/Ma ma của Thái hậu/g,`${tn.call} của Thái hậu`)}
 if(gt)o=o.replace(/[Tt]heo ma ma giáo tập học/g,`Theo ${gt.call}, giáo tập ma ma Trữ Tú cung, học`);
 return o}
window.elderTx=tx;
function eventLines(m){try{if(!m||m.__el||typeof m.h!=="string")return;m.__el=1;m.h=tx(m.h);const gt=elderBy("gt"),tn=elderBy("tn"),kn=elderBy("kn");
 if(m.t==="Tuyển tú"&&gt)m.h+=`<p>${gt.call}, giáo tập ma ma Trữ Tú cung, phụng chỉ Thái hậu dạy quy củ cho tú nữ mới: đi, đứng, quỳ, thưa, từng bước một.</p>`;
 if(m.t==="Tân Giả khố"&&tn)m.h+=`<p>${tn.call}, chưởng sự cô cô Đức Thọ cung, đọc lệnh phạt: “Cung quy không tha ai. Giặt cho sạch, đủ hạn thì ra.”</p>`;
 if(m.t==="Đổi chủ"&&kn)m.h+=`<p>${kn.call}, quản sự ma ma Càn Ninh cung, ghi tên ngươi vào sổ cung nữ của cung mới.</p>`}catch(e){}}
if(typeof showModal==="function"){const s0=showModal;showModal=function(){try{if(Q&&Q[0])eventLines(Q[0])}catch(e){}return s0.apply(this,arguments)}}
if(typeof log==="function"){const l0=log;log=function(h){return l0.call(this,tx(h))}}
})();
