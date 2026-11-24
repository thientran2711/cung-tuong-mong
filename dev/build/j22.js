/* ================= MEN OF THE PALACE AND FORBIDDEN AFFAIRS (adults; man and woman only; fade to black; full consequences) ================= */
const MROLES=[["Thị vệ","thị vệ",["vuon","thu"],24,8],["Thái y","thái y",["tyv"],29,6],["Vương gia","vương gia",["vuon","tn"],27,6],["Nhạc sư","nhạc sư",["vuon"],31,10],["Sứ thần","sứ thần",["thu","vuon"],34,8],["Họa sư","họa sư",["vuon","tn"],30,10]];
const MTR=["phong lưu","trung hậu","tham vọng","đa tình","cẩn trọng"];
FPOOL.man=rng(1,8,i=>"face-man-"+i);
function menInit(){if(!S||S.men)return;S.men=MROLES.map((r,i)=>({id:"m"+i,role:r[0],rw:r[1],haunts:r[2],age:r[3]+R(r[4]),name:`${r[0]} ${nmNew("m")}`,loyal:40+R(50),af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[]}));S.menW={};S.aff={}}
function manById(id){return (S.men||[]).find(m=>m.id===id&&m.alive)||null}
function pMan(m){faceFor(m,m.rw==="vương gia"?"royal":"man",m.age);const fb=(AV.emperor||[]).filter((x,i)=>i!==S.emp.face)[Number(m.id.slice(1))%3]||"";return{rk:"off",rw:m.role,src:fsrc(m.fc,fb),hue:0,ini:m.name.split(" ").pop()[0],col:"#6a8aa0"}}
/* where the men are this buổi (silhouettes on the map, revealed on arrival) */
/* where the men are: jmen (loaded later) decides every buổi with a reason (owner 11/15 "no dice for men in the hậu cung", OD:L1386). This old
   flat roll(55) haunt is only the fallback when jmen is absent: while jmen's schedule runs it never rolls (npc-agent AG1: a placeWhere path
   where jmen's menPlace failed kept this dice, e.g. a guard in the garden while S.menWhy said duty at Kính sự phòng) */
(function(){const pw=placeWhere;placeWhere=function(){pw.apply(this,arguments);try{menInit();if(typeof menSchedRoad==="function"&&menSchedRoad()){S.menW={};return}S.menW={};for(const m of S.men){if(!m.alive)continue;if(roll(55))S.menW[m.id]=pick(m.haunts)}}catch(e){}}})();
(function(){const c0=countAt;countAt=function(k){let n=c0(k);try{for(const id in (S.menW||{}))if(S.menW[id]===k&&manById(id))n++}catch(e){}return n}})();
(function(){const g=goTo;goTo=function(k){const r=g.apply(this,arguments);try{if(S.place===k&&S.visit){for(const id in (S.menW||{})){const m=manById(id);if(m&&S.menW[id]===k){S.visit.people.push({kind:"man",ref:m,name:m.name.split(" ").slice(0,1).concat(m.name.split(" ").slice(-1)).join(" "),ini:m.name.split(" ").pop()[0],col:"#6a8aa0",info:`${m.role} · ${netTxt(m)}`});m.seen=bkey()}}if(S.visit.people.length&&/Không gặp ai/.test(S.visit.msg||""))S.visit.msg=`Ở đây có ${S.visit.people.length} người.`;renderStage()}}catch(e){}return r}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="man"&&p.ref)return pMan(p.ref);return f0(p)}})();
function tinhW(t){return t>=BAL.tinhLv.love?"si mê ngươi":t>=BAL.tinhLv.close?"thầm thương ngươi":t>=BAL.tinhLv.warm?"để ý ngươi":t>=BAL.tinhLv.known?"có thiện cảm":"chưa để ý"}
/* risk of being seen: place, her watcher's loyalty, rivals' eyes */
/* p = the woman (her by default; an NPC consort on the same road, role-parity part 2): the others' eyes against her own watcher and eyes */
function lộRisk(k,p){p=p||S;const base={vuon:28,thu:34,tyv:20,tn:40,home:15}[k]||26;const w=watcher(p);const eN=(p===S?liveRivals(true):[S].concat(liveRivals(true))).filter(v=>v&&v!==p).reduce((s,v)=>s+eyes(v),0);return cl(Math.round(base+eN*2-(w?w.loyal/5:0)-eyes(p)*2),6,92)}
function watcher(p){p=p||S;const s=(p.staff||[]).filter(x=>x&&x.loyal>=BAL.loy.close).sort((a,b)=>b.loyal-a.loyal)[0];if(s)return{name:s.name,loyal:s.loyal,s};if(p.maid&&p.maid.loyal>=BAL.loy.close)return{name:p.maid.name,loyal:p.maid.loyal};return null}
function whoMayKnow(){const w=watcher();return [w?w.name+" (canh cửa)":"",...liveRivals(true).filter(v=>eyes(v)>=3).map(v=>v.name)].filter(Boolean).slice(0,3).join(", ")||"không ai rõ"}
function affairExposed(m,how){/* full weight: the man dies; she faces death (first-year mercy aside) or lãnh cung */m.alive=false;log(`<span class="r">${how} ${m.name} bị xử trảm.</span>`);/* npc-purpose: death or lãnh cung = Hoàng thượng's mercy from his own regard for her (kind empMercy: her Sủng, her children) */if(npcWhy("empMercy",{p:S}))cold(`Tư thông với ${m.name} bị lộ`);else deathSentence(`Bị ban chết vì tư thông với ${m.name}`)}
/* ONE builder (role-parity part 2, law 1 two-way + law 4): the steps with a man, for her talk card and an NPC consort's day plan
   (jagacts4 cx4:man<step>, run by p4Run) — same odds of the doer, same tình ý, same eyes and the same death if caught.
   His tình ý is kept per woman: m.tinh for her (old saves), m.tw[id] for an NPC consort; khăn / thư are real things he keeps (m.letters / m.lw[id]). */
function mTinh(m,p){return p===S?(m.tinh||0):((m.tw||{})[p.id]||0)}
function mTinhAdd(m,p,n,set){if(p===S){m.tinh=set?n:(m.tinh||0)+n;return}m.tw=m.tw||{};m.tw[p.id]=Math.max(0,set?n:(m.tw[p.id]||0)+n)}
function manWit(p){const L=(p===S?liveRivals(true):[S].concat(liveRivals(true))).filter(v=>v&&v!==p&&v.alive!==false&&!v.out);const W=npcWit(whereOf(p),null,{vs:p,not:[p],pool:L});return W.length?W[0].p:null} /* npc-purpose G1 (two-way): the one who sees is a woman really there (npcWit), never a dice + a random name */
function manCards(p,m,k){if(!m||!m.alive)return[];const me=p===S,risk=lộRisk(k,p),t=mTinh(m,p),ng=me?"ngươi":p.name;const A=[];
 A.push({id4:"manHail",n:"Chào hỏi đúng lễ",o:100,w:{danh:1},x:`hắn quý ngươi +${BAL.relMS.hail}`,go:()=>{relAdd(p,m,BAL.relMS.hail)/* rel-men-servants: a greeting moves both ways (j9 relAdd: m.af / m.afw[id] ↔ her S.rl / v.rl) */}});
 A.push({id4:"manFlirt",n:"Liếc mắt đưa tình",o:odA(p,BAL.odb.j22.odO+(p.sac||0)/BAL.manRd.sacD),x:`tình ý của hắn +12 · có thể bị người thấy, một phi tần nắm ${balAb(BAL.eff.j22.evGo)} chứng cứ của ngươi: ${manWit(p)?"quanh đây có người":"quanh đây vắng người"}`,l:{},
  go:()=>{mTinhAdd(m,p,12+(nv(m,"flirtTinh")));deedAdd(p,"flirt",null,1,`liếc mắt đưa tình với ${m.name}`);{const v=manWit(p);if(v){/*evok: flirt deed written just before*/evA(v,p,BAL.eff.j22.evGo);if(me)log(`Có kẻ thấy ngươi liếc mắt với ${m.name}.`);else if(v===S)log(`Ngươi thấy ${p.name} liếc mắt đưa tình với ${m.name}.`)}}}});
 if(t>=BAL.tinhLv.warm)A.push({id4:"manToken",n:"Trao khăn tay",o:odA(p,BAL.odb.j22.odO_2+(p.tamco||0)/BAL.manRd.tcD),x:`hắn giữ khăn tay của ngươi (là tang vật nếu bị lục) · tình ý +15`,go:()=>{mTinhAdd(m,p,15);if(me){m.letters++;S.aff=S.aff||{};S.aff[m.id]=(S.aff[m.id]||0)+1}else{m.lw=m.lw||{};m.lw[p.id]=(m.lw[p.id]||0)+1}}});
 if(t>=BAL.tinhLv.close){const w=watcher(p);A.push({id4:"manTryst",n:"Hẹn gặp riêng",o:w?oddsCl(100-risk):0,lock:!w,inner:1,t:`cần một người hầu trung thành (thiện cảm ${balAb(BAL.loy.close)}+, Chủ tin ${balAb(BAL.tinLv.watch)}+) canh cửa`,act:1,x:`đêm ấy kín đáo: Sức +12, hắn thành người che chở · có thai: ${chanceW(trystCh(p))} · hỏng: bị bắt gặp, tội chết`,run:()=>tryst(m,risk,p)})}
 if(t>=BAL.tinhLv.warm)A.push({id4:"manCut",n:"Cắt đứt",o:100,fix:1,x:"hắn thôi tơ tưởng; giảm hẳn rủi ro",go:()=>{mTinhAdd(m,p,0,1)}});
 return A}
(function(){const t0=talkOpts;talkOpts=function(p){if(!p||p.kind!=="man")return t0.apply(this,arguments);const m=p.ref;if(!m||!m.alive)return[];return manCards(S,m,S.place)}})();
function tryst(m,risk,p){p=p||S;if(p!==S)return trystNpc(m,risk,p);if(roll(risk)){affairExposed(m,`Đêm ${S.name} hẹn ${m.name} bị bắt gặp.`);return "Bị bắt gặp."}
 m.trysts++;m.tinh+=10;S.lastTryst=wk();apply({suc:BAL.eff.j22.sucTryst});S.protector=m.id;S.an=S.an||0;let r=`Đêm ấy trôi qua kín đáo. Sức ${balSg(BAL.eff.j22.sucTryst)}. ${m.name} nguyện che chở ngươi. Người dễ biết chuyện: ${whoMayKnow()}.`;
 if(!S.preg&&roll(trystCh(S))){S.preg=1;S.hidden=true;S.pregWk=wk();S.trueFather=m.id;const ok=(S.nightLog||[]).some(w=>Math.abs(w-wk())<=1);S.pregMismatch=!ok;r+=ok?" Mấy hôm sau ngươi biết mình có thai; ngày tháng trùng đêm thị tẩm.":` <b class="r">Ngươi có thai, mà sổ Kính sự phòng không có đêm thị tẩm nào khớp ngày.</b>`}
 return r}
/* the same night for an NPC consort: caught = he dies and she faces the same sentence; kept = v.affair (the world's affair record: the book,
   a conception by him, spies — affairMonth), Sức, a pregnancy by trystCh with the same book check */
function trystNpc(m,risk,v){if(roll(risk)){m.alive=false;v.affair=null;log(`<span class="r">Đêm ${v.name} hẹn ${m.name} bị bắt gặp. ${m.name} bị xử trảm.</span>`);try{deathSentence(v,`tư thông với ${m.name}`)}catch(e){}return `${v.name} hẹn gặp ${m.name} bị bắt gặp`}
 m.trysts++;mTinhAdd(m,v,10);v.affair=m.id;v.lastTryst=wk();ap(v,{suc:BAL.eff.j22.sucTryst});
 if(!v.preg&&roll(trystCh(v))){v.preg=1;v.hidden=true;v.pregWk=wk();v.trueFather=m.id;const ok=(v.nightLog||[]).some(w=>Math.abs(w-wk())<=1);v.pregMismatch=!ok}
 return `${v.name} lén gặp riêng ${m.name}`}
/* pregnancy that the book cannot cover: her roads, each with its odds and cost */
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);if(!S||!S.preg||!S.pregMismatch||S.out)return;
 deck.unshift({n:"Hối lộ Kính sự phòng sửa sổ",t:"Nhờ Tổng quản ghi thêm một đêm thị tẩm cho khớp ngày.",c:{},o:od(BAL.odb.j22.odO_3+((S.court&&S.court.ksp&&S.court.ksp.af.me)||0)/2),w:{bac:-80},l:{danh:-5}/* bạc only when Tổng quản takes it (canPay keeps the lock) */,x:"sổ khớp ngày, hết bị nghi · hỏng: Tổng quản biết chuyện của ngươi",dom:"Mưu kế",go:()=>{S.pregMismatch=false;S.khBook=1},fail:()=>{S.ksKnows=1}});
 deck.unshift({n:"Uống thuốc phá thai",t:"Bài thuốc mạnh, hại thân.",c:{bac:-30},o:od(BAL.odb.j22.odO_4+careY(S)),w:{},l:{suc:BAL.eff.j22.sucL},x:`mất đứa bé, Sức ${balSg(BAL.eff.j22.sucGo)} · hỏng: băng huyết — có thể băng huyết mà chết: ${chanceW(BAL.rk.abortDie)}`,dom:"Sức khỏe",go:()=>{S.preg=0;S.hidden=false;S.pregMismatch=false;S.trueFather=null;apply({suc:BAL.eff.j22.sucGo})},fail:()=>{S.preg=0;S.hidden=false;S.pregMismatch=false;S.trueFather=null;if(roll(BAL.rk.abortDie))die("Uống thuốc phá thai, băng huyết mà chết")}});
 const CF=BAL.confess;deck.unshift({n:"Thú tội với Hoàng thượng",t:"Quỳ trước Dưỡng Hòa điện, nhận hết tội.",c:{},o:oddsCl(Math.round(CF.base+(S.sung||0)/CF.sungDiv+(S.th||0)/CF.thDiv)),w:{},l:{},x:"giữ được mạng (vào lãnh cung), hắn bị xử trảm · hỏng: Hoàng thượng không tha — có thể bị ban chết",dom:"Sủng",go:()=>{const m=manById(S.trueFather);if(m){m.alive=false;log(`${m.name} bị xử trảm.`)}S.pregMismatch=false;cold("Thú tội tư thông")},fail:()=>{const m=manById(S.trueFather);if(m)m.alive=false;S.pregMismatch=false;deathSentence("Thú tội tư thông, Hoàng thượng không tha")}})}})();
/* each month: the book may be checked; rivals carry on affairs too and can be found out */
function affairMonth(){if(!S||!S.men)return"";let ev="";
 if(S.preg&&S.pregMismatch){const q=queenP();const foes=liveRivals(true).filter(v=>rel(v,S)<-20);const kc=(q&&q!==S&&rel(q,S)<0||foes.length)?npcWhy("kspCheck",{C:(q&&q!==S&&rel(q,S)<0?[q]:[]).concat(foes.filter(x=>x!==q))}):null;if(kc){const who=kc.who;evA(who,S,BAL.eff.j22.evAffairMonth);ev+=`<span class="r">${who.name} cho người tra sổ Kính sự phòng: ngày ngươi có thai không khớp đêm thị tẩm nào.</span> `}}
 if(S.lastTryst!=null&&wk()-S.lastTryst<=BAL.manRd.seenW){const tk=npcWhy("trystKnow",{C:liveRivals(true).filter(x=>rel(x,S)<0)});const v=tk&&tk.who;if(v){evA(v,S,BAL.eff.j22.evAffairMonth_2);if(eyes(S)>=3)ev+=`Tai mắt báo: ${v.name} có vẻ biết chuyện riêng của ngươi. `}}
 /* a rival's affair begins only by her own steps (jagacts4 cx4:man*, role-parity part 2: was a flat roll 2 for v.sung < 30) */
 for(const v of liveRivals(false)){
  /* two-way with her own row above (law 1 + law 6a real evidence): a recent tryst may leave a hostile woman holding proof; the sentence comes
     only through that proof (accusations), the book check (wrapper below) or a tryst caught in the act — no flat monthly death roll */
  if(v.affair){const m=manById(v.affair);if(!m){v.affair=null;continue}if(v.lastTryst!=null&&wk()-v.lastTryst<=BAL.manRd.seenW){const L=[S].concat(liveRivals(true)).filter(x=>x&&x!==v&&x.alive!==false&&!x.out&&rel(x,v)<0);const mw=L.length?npcWhy("trystKnow",{C:L,v}):null;const w=mw&&mw.who;/* npc-purpose G1: the same rule as her own row above (trystKnow: the foe whose tai mắt dig it up) */
   if(w){evA(w,v,BAL.eff.j22.evAffairMonth_2);if(w===S)ev+=`Tai mắt báo: ${v.name} có vẻ lén gặp riêng ${m.name}. `}}}}
 return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(!S.dead)ev+=affairMonth()}catch(e){}return ev}})();
/* spying on a rival may reveal her affair: true, kept as a note and as proof */
(function(){const d0=doAct;doAct=function(i,k){const v=rivals[i];const r=d0.apply(this,arguments);try{if(k==="spy"&&v&&v.affair&&roll(40)){const m=manById(v.affair);if(m){/*evok: affair (deedSync)*/evA(S,v,BAL.eff.j22.evTop);noteAdd(v.id,`tư thông với ${m.name} (tai mắt tận mắt thấy)`);log(`Tai mắt bắt gặp ${v.name} lén gặp ${m.name}. Chứng cứ ${balSg(BAL.eff.j22.evTop)}.`)}}}catch(e){}return r}})();
/* the man's dossier: only known facts */
function manCard(m){const f=pMan(m);const known=m.seen===bkey();
 const lines=[tuoi(m.age),`Tính: <b>${netTxt(m)}</b>`,/* rel-men-servants (law 4/11): his regard / oán both ways are NOT printed here — the card carries the kit relation block (KIT §52 kitRelRows, j9 aff/oan); his tình ý keeps its own line */
  m.tinh>=BAL.tinhLv.known||m.letters?`Tình ý: <span class="ef ${m.tinh>=BAL.tinhLv.close?"r":"g"}">${tinhW(m.tinh)}</span>`:`Tình ý: <span class="ef n">chưa rõ</span>`,known?`Thấy ở ${placeName(S.menW[m.id]||"")} (buổi này)`:"Nơi ở: không rõ"];
 const tt=[m.letters?`${m.letters} lần trao khăn, thư (tang vật nếu bị lục)`:"",m.trysts?`${m.trysts} lần hẹn riêng · người dễ biết chuyện: ${whoMayKnow()}`:"",S.trueFather===m.id&&S.preg?"Cha thật của đứa bé trong bụng ngươi":""].filter(Boolean);
 return pcard({f,col:"#6a8aa0",name:m.name,rank:m.role,lines,chips:[m.trysts?chip("Tư tình","hot"):""],note:tt.length?`<b>Tư tình</b> (chỉ ngươi biết): ${tt.join(" · ")}`:"Gặp hắn ở nơi hắn hay lui tới để trò chuyện.",groups:[["Gặp mặt",[known&&S.place!==S.menW[m.id]?pbtn(`data-go="${S.menW[m.id]}"`,"Đến chỗ hắn",`tốn: ${travel(S.place,S.menW[m.id])} khắc`,walkBlock(S.menW[m.id])):""]]],empty:`<p>Lúc này chưa có việc nào làm được với hắn từ thẻ này: chỉ gặp được hắn ở nơi hắn hay lui tới (${m.haunts.map(placeName).join(", ")}), đúng buổi hắn có mặt (xem Dư đồ).</p><p class="past">Khi bắt gặp hắn làm điều khuất tất, ngươi sẽ được chọn: báo thị vệ, báo Cung Chính ti, giấu giúp, núp nghe lén hoặc làm như không thấy.</p>`})}
/* the dossier tab lists the men after the consorts */
/* owner 11/15 05:35Z: men have their own Hậu cung sub-tab (jhc "Nam nhân"); Phi tần lists consorts only */
(function(){const r0=rvTabHTML;rvTabHTML=function(){menInit();const M=(S.men||[]).filter(m=>m.alive);if(M.length||!M.length)return r0();const n=rivals.length;
 return `<div class="pgwrap">`+pager("rv",rivals.map(v=>({f:pv(v),name:shortN(v.name),dim:!v.alive||v.out})).concat(M.map((m,j)=>({f:pMan(m),name:m.name.split(" ").pop(),sep:j?"":"Nam nhân"}))),i=>i<n?rvCard(rivals[i],i):manCard(M[i-n]))+`</div>`}})();
/* two-way: a consort with a lover may conceive by him; the Kính sự phòng book can expose her the same way it exposes the player */
(function(){const a0=affairMonth;affairMonth=function(){let ev=a0.apply(this,arguments);try{if(!S||S.dead)return ev;
 for(const v of liveRivals(false)){const m=v.affair&&manById(v.affair);
  const cO=trystCh(v);/* conception = nature's odds (BAL), not an NPC choice */if(m&&!v.preg&&!khOcu(v)&&roll(cO)){v.preg=1;v.hidden=true;v.pregWk=wk();v.trueFather=m.id;v.pregMismatch=!(v.nightLog||[]).some(w=>Math.abs(w-wk())<=1)&&roll(70)}
  if(v.preg&&v.pregMismatch){const foes=others(v).filter(x=>x!==S&&x.alive&&rel(x,v)<-20);const mf=foes.length?npcWhy("trystKnow",{C:foes,v}):null;if(mf){const x=mf.who;evA(x,v,BAL.eff.j22.evTop_2)}
   const tw=watcher();const tw0=tw?(tw.s||S.maid):(S.maid||(S.staff||[]).find(x=>x&&x.name));/* G1 #9 (RE-CHECK 3 item 3): her own people (the loyal watcher first, else her maid / a servant of her house) pick up the talk; the finding = the old odds (done roll) */if(tw0&&npcWhy("taimat",{w:tw0,v},()=>roll(npw1B("j22").see+eyes(S)*npw1B("j22").seeEye))){/*evok: pregMismatch (deedSync)*/evA(S,v,BAL.eff.j22.evTop_3);v.pregMismatch=false;noteAdd(v.id,`Tai mắt: ngày ${v.name} có thai không khớp đêm thị tẩm nào trong sổ Kính sự phòng (chứng cứ ${balSg(BAL.eff.j22.evTop_3)})`,1);ev+=`Tai mắt báo: ngày ${v.name} có thai không khớp sổ Kính sự phòng. `}}
  if(!v.preg){v.pregMismatch=false;v.trueFather=null}}}catch(e){}return ev}})();
/* older lives get the men added later (the họa sư) */
(function(){const m0=menInit;menInit=function(){const r=m0.apply(this,arguments);try{if(S&&S.men&&S.men.length<MROLES.length){for(let i=S.men.length;i<MROLES.length;i++){const r2=MROLES[i];S.men.push({id:"m"+i,role:r2[0],rw:r2[1],haunts:r2[2],age:r2[3]+R(r2[4]),name:`${r2[0]} ${nmNew("m")}`,loyal:40+R(50),af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[]})}}}catch(e){}return r}})();
