/* ================= MEN OF THE PALACE AND FORBIDDEN AFFAIRS (adults; man and woman only; fade to black; full consequences) ================= */
const MROLES=[["Thị vệ","thị vệ",["vuon","thu"],24,8],["Thái y","thái y",["tyv"],29,6],["Vương gia","vương gia",["vuon","tn"],27,6],["Nhạc sư","nhạc sư",["vuon"],31,10],["Sứ thần","sứ thần",["thu","vuon"],34,8],["Họa sư","họa sư",["vuon","tn"],30,10]];
const MTR=["phong lưu","trung hậu","tham vọng","đa tình","cẩn trọng"];
FPOOL.man=rng(1,8,i=>"face-man-"+i);
function menInit(){if(!S||S.men)return;const sur=["Tiêu","Lục","Hàn","Thẩm","Bùi","Tống","Mạnh"];S.men=MROLES.map((r,i)=>({id:"m"+i,role:r[0],rw:r[1],haunts:r[2],age:r[3]+R(r[4]),name:`${r[0]} ${pick(sur)} ${MALEN[(i*3+R(3))%MALEN.length]}`,loyal:40+R(50),af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[]}));S.menW={};S.aff={}}
function manById(id){return (S.men||[]).find(m=>m.id===id&&m.alive)||null}
function pMan(m){faceFor(m,m.rw==="vương gia"?"royal":"man",m.age);const fb=(AV.emperor||[]).filter((x,i)=>i!==S.emp.face)[Number(m.id.slice(1))%3]||"";return{rk:"off",rw:m.role,src:fsrc(m.fc,fb),hue:0,ini:m.name.split(" ").pop()[0],col:"#6a8aa0"}}
/* where the men are this buổi (silhouettes on the map, revealed on arrival) */
(function(){const pw=placeWhere;placeWhere=function(){pw.apply(this,arguments);try{menInit();S.menW={};for(const m of S.men){if(!m.alive)continue;if(roll(55))S.menW[m.id]=pick(m.haunts)}}catch(e){}}})();
(function(){const c0=countAt;countAt=function(k){let n=c0(k);try{for(const id in (S.menW||{}))if(S.menW[id]===k&&manById(id))n++}catch(e){}return n}})();
(function(){const g=goTo;goTo=function(k){const r=g.apply(this,arguments);try{if(S.place===k&&S.visit){for(const id in (S.menW||{})){const m=manById(id);if(m&&S.menW[id]===k){S.visit.people.push({kind:"man",ref:m,name:m.name.split(" ").slice(0,1).concat(m.name.split(" ").slice(-1)).join(" "),ini:m.name.split(" ").pop()[0],col:"#6a8aa0",info:`${m.role} · ${netTxt(m)}`});m.seen=bkey()}}if(S.visit.people.length&&/Không gặp ai/.test(S.visit.msg||""))S.visit.msg=`Ở đây có ${S.visit.people.length} người.`;renderStage()}}catch(e){}return r}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="man"&&p.ref)return pMan(p.ref);return f0(p)}})();
function tinhW(t){return t>=70?"si mê ngươi":t>=50?"thầm thương ngươi":t>=30?"để ý ngươi":t>=10?"có thiện cảm":"chưa để ý"}
/* risk of being seen: place, her watcher's loyalty, rivals' eyes */
function lộRisk(k){const base={vuon:28,thu:34,tyv:20,tn:40,home:15}[k]||26;const w=watcher();const eyes=liveRivals(true).reduce((s,v)=>s+(v.mat||0),0);return cl(Math.round(base+eyes*2-(w?w.loyal/5:0)-(S.mat||0)*2),6,92)}
function watcher(){const s=(S.staff||[]).filter(x=>x.loyal>=60).sort((a,b)=>b.loyal-a.loyal)[0];if(s)return{name:s.name,loyal:s.loyal,s};if(S.maid&&S.maid.loyal>=60)return{name:S.maid.name,loyal:S.maid.loyal};return null}
function whoMayKnow(){const w=watcher();return [w?w.name+" (canh cửa)":"",...liveRivals(true).filter(v=>(v.mat||0)>=3).map(v=>v.name)].filter(Boolean).slice(0,3).join(", ")||"không ai rõ"}
function affairExposed(m,how){/* full weight: the man dies; she faces death (first-year mercy aside) or lãnh cung */m.alive=false;log(`<span class="r">${how} ${m.name} bị xử trảm.</span>`);if(roll(50))deathSentence(`Bị ban chết vì tư thông với ${m.name}`);else cold(`Tư thông với ${m.name} bị lộ`)}
/* talk options with a man: every step carries its odds word and its risk */
(function(){const t0=talkOpts;talkOpts=function(p){if(!p||p.kind!=="man")return t0.apply(this,arguments);const m=p.ref;if(!m||!m.alive)return[];const k=S.place,risk=lộRisk(k);const A=[];
 A.push({n:"Chào hỏi đúng lễ",o:100,w:{danh:1},x:"hắn quý ngươi +5",go:()=>{m.af+=5}});
 A.push({n:"Liếc mắt đưa tình",o:od(55+S.sac/5),x:`tình ý của hắn +12 · có thể bị người thấy, một phi tần nắm 1 chứng cứ của ngươi: ${chanceW(Math.round(risk/3))}`,l:{},go:()=>{m.tinh+=12+(hasT(m,"Ham vui")?6:0);deedAdd(S,"flirt",null,1,`liếc mắt đưa tình với ${m.name}`);if(roll(risk/3)){const v=pick(liveRivals(true));if(v){/*evok: flirt deed written just before*/evA(v,S,1);log(`Có kẻ thấy ngươi liếc mắt với ${m.name}.`)}}}});
 if(m.tinh>=30)A.push({n:"Trao khăn tay",o:od(60+S.tamco/5),x:`hắn giữ khăn tay của ngươi (là tang vật nếu bị lục) · tình ý +15`,go:()=>{m.tinh+=15;m.letters++;S.aff=S.aff||{};S.aff[m.id]=(S.aff[m.id]||0)+1}});
 if(m.tinh>=50){const w=watcher();A.push({n:"Hẹn gặp riêng",o:w?cl(100-risk,5,95):0,lock:!w,t:"cần một người hầu trung thành (lòng 60+) canh cửa",act:1,x:`đêm ấy kín đáo: Sức +12, hắn thành người che chở · có thai: ${chanceW(trystCh(S))} · hỏng: bị bắt gặp, tội chết`,run:()=>tryst(m,risk)})}
 if(m.tinh>=30)A.push({n:"Cắt đứt",o:100,x:"hắn thôi tơ tưởng; giảm hẳn rủi ro",go:()=>{m.tinh=0}});
 return A}})();
function tryst(m,risk){if(roll(risk)){affairExposed(m,`Đêm ${S.name} hẹn ${m.name} bị bắt gặp.`);return "Bị bắt gặp."}
 m.trysts++;m.tinh+=10;S.lastTryst=wk();apply({suc:12});S.protector=m.id;S.an=S.an||0;let r=`Đêm ấy trôi qua kín đáo. Sức +12. ${m.name} nguyện che chở ngươi. Người dễ biết chuyện: ${whoMayKnow()}.`;
 if(!S.preg&&roll(trystCh(S))){S.preg=1;S.hidden=true;S.pregWk=wk();S.trueFather=m.id;const ok=(S.nightLog||[]).some(w=>Math.abs(w-wk())<=1);S.pregMismatch=!ok;r+=ok?" Mấy hôm sau ngươi biết mình có thai; ngày tháng trùng đêm thị tẩm.":` <b class="r">Ngươi có thai, mà sổ Kính sự phòng không có đêm thị tẩm nào khớp ngày.</b>`}
 return r}
/* pregnancy that the book cannot cover: her roads, each with its odds and cost */
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);if(!S||!S.preg||!S.pregMismatch||S.out)return;
 deck.unshift({n:"Hối lộ Kính sự phòng sửa sổ",t:"Nhờ Tổng quản ghi thêm một đêm thị tẩm cho khớp ngày.",c:{bac:-80},o:od(55+((S.court&&S.court.ksp&&S.court.ksp.af.me)||0)/2),w:{},l:{danh:-5},x:"sổ khớp ngày, hết bị nghi · hỏng: Tổng quản biết chuyện của ngươi",dom:"Mưu kế",go:()=>{S.pregMismatch=false;S.khBook=1},fail:()=>{S.ksKnows=1}});
 deck.unshift({n:"Uống thuốc phá thai",t:"Bài thuốc mạnh, hại thân.",c:{bac:-30},o:od(70+S.arts.y*5),w:{},l:{suc:-30},x:`mất đứa bé, Sức -20; hỏng: băng huyết, Sức -30 · kèm khi hỏng: băng huyết mà chết: ${chanceW(25)}`,dom:"Sức khỏe",go:()=>{S.preg=0;S.hidden=false;S.pregMismatch=false;S.trueFather=null;apply({suc:-20})},fail:()=>{S.preg=0;S.hidden=false;S.pregMismatch=false;S.trueFather=null;if(roll(25))die("Uống thuốc phá thai, băng huyết mà chết")}});
 deck.unshift({n:"Thú tội với Hoàng thượng",t:"Quỳ trước Dưỡng Hòa điện, nhận hết tội.",c:{},o:100,w:{},x:"giữ được mạng (vào lãnh cung), hắn bị xử trảm",dom:"Sủng",go:()=>{const m=manById(S.trueFather);if(m){m.alive=false;log(`${m.name} bị xử trảm.`)}S.pregMismatch=false;cold("Thú tội tư thông")}})}})();
/* each month: the book may be checked; rivals carry on affairs too and can be found out */
function affairMonth(){if(!S||!S.men)return"";let ev="";
 if(S.preg&&S.pregMismatch){const q=queenP();const foes=liveRivals(true).filter(v=>rel(v,S)<-20);if((q&&q!==S&&rel(q,S)<0||foes.length)&&roll(10+(S.ksKnows?15:0))){const who=q&&q!==S?q:pick(foes);evA(who,S,3);ev+=`<span class="r">${who.name} cho người tra sổ Kính sự phòng: ngày ngươi có thai không khớp đêm thị tẩm nào.</span> `}}
 if(S.lastTryst!=null&&wk()-S.lastTryst<=3&&roll(4)){const v=pick(liveRivals(true).filter(x=>rel(x,S)<0)||[]);if(v){evA(v,S,2);if((S.mat||0)>=3)ev+=`Tai mắt báo: ${v.name} có vẻ biết chuyện riêng của ngươi. `}}
 for(const v of liveRivals(false)){if(!v.affair&&v.sung<30&&roll(2)){const m=pick(S.men.filter(x=>x.alive));if(m)v.affair=m.id}
  if(v.affair){const m=manById(v.affair);if(!m){v.affair=null;continue}if(roll(3)){m.alive=false;v.affair=null;ev+=`<span class="r">${v.name} tư thông với ${m.name} bị lộ.</span> `;deathSentence(v,`tư thông với ${m.name}`)}}}
 return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(!S.dead)ev+=affairMonth()}catch(e){}return ev}})();
/* spying on a rival may reveal her affair: true, kept as a note and as proof */
(function(){const d0=doAct;doAct=function(i,k){const v=rivals[i];const r=d0.apply(this,arguments);try{if(k==="spy"&&v&&v.affair&&roll(40)){const m=manById(v.affair);if(m){/*evok: affair (deedSync)*/evA(S,v,2);noteAdd(v.id,`tư thông với ${m.name} (tai mắt tận mắt thấy)`);log(`Tai mắt bắt gặp ${v.name} lén gặp ${m.name}. Chứng cứ +2.`)}}}catch(e){}return r}})();
/* the man's dossier: only known facts */
function manCard(m){const f=pMan(m);const known=m.seen===bkey();
 const lines=[tuoi(m.age),`Tính: <b>${netTxt(m)}</b>`,m.tinh>=10||m.letters?`Hắn quý ngươi: <span class="ef ${m.tinh>=50?"r":"g"}">${tinhW(m.tinh)}</span>`:`Hắn quý ngươi: <span class="ef n">chưa rõ</span>`,`Ngươi quý hắn: <span class="ef ${m.af>10?"g":"n"}">${typeof quyW==="function"?quyW(m.af):affW(m.af)} · ${m.af}</span>`,known?`Thấy ở ${placeName(S.menW[m.id]||"")} (buổi này)`:"Nơi ở: không rõ"];
 const tt=[m.letters?`${m.letters} lần trao khăn, thư (tang vật nếu bị lục)`:"",m.trysts?`${m.trysts} lần hẹn riêng · người dễ biết chuyện: ${whoMayKnow()}`:"",S.trueFather===m.id&&S.preg?"Cha thật của đứa bé trong bụng ngươi":""].filter(Boolean);
 return pcard({f,col:"#6a8aa0",name:m.name,rank:m.role,lines,chips:[m.trysts?chip("Tư tình","hot"):""],note:tt.length?`<b>Tư tình</b> (chỉ ngươi biết): ${tt.join(" · ")}`:"Gặp hắn ở nơi hắn hay lui tới để trò chuyện.",groups:[["Gặp mặt",[known&&S.place!==S.menW[m.id]?pbtn(`data-go="${S.menW[m.id]}"`,"Đến chỗ hắn",`Chắc chắn · tốn: ${travel(S.place,S.menW[m.id])} khắc`,walkBlock(S.menW[m.id])):""]]],empty:`<p>Lúc này chưa có việc nào làm được với hắn từ thẻ này: chỉ gặp được hắn ở nơi hắn hay lui tới (${m.haunts.map(placeName).join(", ")}), đúng buổi hắn có mặt (xem Dư đồ).</p><p class="past">Khi bắt gặp hắn làm điều khuất tất, ngươi sẽ được chọn: báo thị vệ, báo Cung Chính ti, giấu giúp, núp nghe lén hoặc làm như không thấy.</p>`})}
/* the dossier tab lists the men after the consorts */
/* owner 11/15 05:35Z: men have their own Hậu cung sub-tab (jhc "Nam nhân"); Phi tần lists consorts only */
(function(){const r0=rvTabHTML;rvTabHTML=function(){menInit();const M=(S.men||[]).filter(m=>m.alive);if(M.length||!M.length)return r0();const n=rivals.length;
 return `<div class="pgwrap">`+pager("rv",rivals.map(v=>({f:pv(v),name:shortN(v.name),dim:!v.alive||v.out})).concat(M.map((m,j)=>({f:pMan(m),name:m.name.split(" ").pop(),sep:j?"":"Nam nhân"}))),i=>i<n?rvCard(rivals[i],i):manCard(M[i-n]))+`</div>`}})();
/* two-way: a consort with a lover may conceive by him; the Kính sự phòng book can expose her the same way it exposes the player */
(function(){const a0=affairMonth;affairMonth=function(){let ev=a0.apply(this,arguments);try{if(!S||S.dead)return ev;
 for(const v of liveRivals(false)){const m=v.affair&&manById(v.affair);
  if(m&&!v.preg&&!khOcu(v)&&roll(trystCh(v))){v.preg=1;v.hidden=true;v.pregWk=wk();v.trueFather=m.id;v.pregMismatch=!(v.nightLog||[]).some(w=>Math.abs(w-wk())<=1)&&roll(70)}
  if(v.preg&&v.pregMismatch){const foes=others(v).filter(x=>x!==S&&x.alive&&rel(x,v)<-20);if(foes.length&&roll(10)){const x=pick(foes);evA(x,v,3)}
   if(roll(8+(S.mat||0)*5)){/*evok: pregMismatch (deedSync)*/evA(S,v,2);v.pregMismatch=false;noteAdd(v.id,`Tai mắt: ngày ${v.name} có thai không khớp đêm thị tẩm nào trong sổ Kính sự phòng (chứng cứ +2)`);ev+=`Tai mắt báo: ngày ${v.name} có thai không khớp sổ Kính sự phòng. `}}
  if(!v.preg){v.pregMismatch=false;v.trueFather=null}}}catch(e){}return ev}})();
/* older lives get the men added later (the họa sư) */
(function(){const m0=menInit;menInit=function(){const r=m0.apply(this,arguments);try{if(S&&S.men&&S.men.length<MROLES.length){for(let i=S.men.length;i<MROLES.length;i++){const r2=MROLES[i];S.men.push({id:"m"+i,role:r2[0],rw:r2[1],haunts:r2[2],age:r2[3]+R(r2[4]),name:`${r2[0]} ${pick(["Tiêu","Lục","Hàn","Bùi","Tống","Mạnh"])} ${pick(MALEN)}`,loyal:40+R(50),af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[]})}}}catch(e){}return r}})();
