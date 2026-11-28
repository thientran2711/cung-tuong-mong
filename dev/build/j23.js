/* ================= LEARNING: three roads, a milestone at every grade, gains shown on the button ================= */
const ARTDO={cam:"Tài: thơ, đàn, thi tài; dễ được Hoàng thượng để ý",ky:"Tài và Tâm cơ: đánh cờ, đoán ý người",thi:"Tài: làm thơ, bàn chuyện với Hoàng thượng",hoa:"Tài: vẽ tranh dâng tặng, Thái hậu quý",vu:"Sắc: múa ở yến tiệc, được chú ý",y:"Sắc: điều hương, nhận ra độc, chữa bệnh"};
const ARTMS={
 cam:["Tài {n:art.stUp}; mỗi tháng tự đàn: Sức {n:eff.j23.camSucMonth}","Đánh đàn ở Ngự hoa viên dễ thành hơn (mỗi bậc +4)","Mở «Phượng cầu hoàng»: cơ hội được thị tẩm","Dạy con đàn: mỗi tháng các con Tài {n:eff.j23.talArtMonth}","Danh {n:art.danh.5}; đàn ở yến tiệc dễ được ban thưởng"],
 ky:["Tài {n:art.stUp}, Tâm cơ {n:artB.ky.1.tamco}","Tâm cơ {n:artB.ky.2.tamco} (dò la, mưu kế dễ hơn)","Mở «Đánh cờ với Hoàng thượng»","Tâm cơ {n:artB.ky.4.tamco}","Danh {n:art.danh.5}, Tâm cơ {n:artB.ky.5.tamco}"],
 thi:["Tài {n:art.stUp}","Tuyến truyện thơ văn mở thêm lựa chọn","Mỗi tháng thơ đến tay Hoàng thượng: {sgRaw:tho.sung}","Bàn chuyện triều chính khéo hơn (mỗi bậc +3)","Danh {n:art.danh.5}; mỗi tháng {sgRaw:tho.sung5}"],
 hoa:["Tài {n:art.stUp}","Thái hậu: thiện cảm {n:artB.hoa.2.th}","Mở «Vẽ chân dung tặng Thái hậu»","Thái hậu: thiện cảm {n:artB.hoa.4.th}","Danh {n:art.danh.5}, Thái hậu: thiện cảm {n:artB.hoa.5.th}"],
 vu:["Sắc {n:art.stUp}","Múa trong yến tiệc dễ thành hơn (mỗi bậc +4)","Mở «Kinh hồng vũ»","Sắc {n:artB.vu.4.sac}","Danh {n:art.danh.5}"],
 y:["Sắc {n:art.stUp}","Nhận ra độc, xạ hương trong đồ","Bệnh tật nhẹ hơn; Sức hồi tốt hơn","Tự bào chế thuốc an thai, chữa bệnh cho con","Danh {n:art.danh.5}; các con ít bệnh"]};
for(const k in ARTMS)sgRuleArr(ARTMS[k]);/* r2 sg-card: Sủng tokens read from BAL when shown (typed-stat-bal: every stat amount too; j85 replaces these lines by ARTFX at load) */
/* grade bonuses beyond the base +2 (applied once when the grade is reached) */
(function(){const a0=addArt;addArt=function(k,g){const l0=S.arts[k];a0.apply(this,arguments);for(let l=l0+1;l<=S.arts[k];l++){const b=k==="theu"?null:BAL.artB[k];/* BAL.artB (jbal2); Thêu: j85 addArt applies it */if(b&&b[l]){apply(b[l]);log(`${ARTS.find(a=>a.k===k).n} bậc ${l}: ${fmt(b[l])}.`)}}}})();
function artMonth(){if(!S||S.out)return;if(S.arts.cam>=1)S.suc=cl(S.suc+BAL.eff.j23.camSucMonth,0,sucCap(S));if(S.arts.cam>=4)S.kids.filter(k=>k.alive).forEach(k=>k.tal=cl(k.tal+BAL.eff.j23.talArtMonth,0,100))}
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{if(!S.dead)artMonth()}catch(e){}return ev}})();
/* three roads */
/* teacher fee (jrcp: depends on the chosen teacher) and the favour paid when the session starts */
function tchFee(k){return artFee(S.arts[k])}
function tchPaid(k){}
function lessonMode(k,mode){const l=S.arts[k],cost=tchFee(k);if(!S||S.dead||Q.length||S.mg||l>=5)return;let c;
 if(mode==="self"){if(!can(BAL.artLes.k)||S.suc<BAL.sucNeed.self)return;c={suc:-BAL.artLes.self}}
 else if(mode==="th"){if(!can(BAL.artLes.k)||S.th<40||(S.buoi||0)!==0||S.thDead)return;c={suc:-BAL.artLes.th,th:3}}
 else{if(!can(BAL.artLes.k)||S.bac<cost)return;c={suc:-BAL.artLes.tch,bac:-cost,tch:k}}
 c.khac=BAL.artLes.k;/* KIT §13.9 (j82 kgDefer): the lesson's charge is taken on «Sẵn sàng»; the ✕ before it is a free back */
 const open=()=>{S.mg={k,l,mode};save();render();resumeMG()};if(typeof kgDefer==="function")kgDefer(c,open);else{const f={suc:c.suc};if(c.bac)f.bac=c.bac;if(c.th)f.th=c.th;apply(f);if(c.tch)tchPaid(k);spend(BAL.artLes.k);open()}}
(function(){const r0=resumeMG;resumeMG=function(){const m=S.mg;if(!m)return;const a=ARTS.find(x=>x.k===m.k);openMG(m.k,m.l,g=>{S.mg=null;const gg=lesG(m.mode,g);/* review/balance-pace: ONE rule (jbalcore lesG, BAL.art.les) */log(`${m.mode==="self"?"Tự học":m.mode==="th"?"Học với Thái hậu":"Học với thầy"} ${a.n}. Tiến bộ +${gg} · ${crsAfterW(S.arts,S.artp,m.k,gg)}.`);addArt(m.k,gg);
  if(m.mode==="teacher"&&roll(30)){if(roll(50)&&discover())log("Thầy dạy kể một sở thích của Hoàng thượng.");else{const t=evGuilty(S,liveRivals(true));if(t&&evA(S,t,BAL.eff.j23.evTop))log(`Thầy dạy buột miệng chuyện của ${t.name}: chứng cứ ${balSg(BAL.eff.j23.evTop)}.`);else log("Thầy dạy kể chuyện trong cung, toàn chuyện vô hại.")}}render()})}})();
function artTabHTML(){const nx=ARTS.map(a=>S.arts[a.k]);let h=`<div class="ph"><span>Mỗi buổi học tốn ${BAL.artLes.k} khắc. Ba cách học, giá trị ngang nhau, tốn thứ khác nhau.</span>${S.master?`<span class="g">Danh sư còn dạy ${S.master} tháng</span>`:""}</div><div class="arts">`;
 h+=ARTS.map(a=>{const l=S.arts[a.k],need=l+2,cost=artFee(l),ms=ARTMS[a.k]||[];const t2=whyTime(BAL.artLes.k);
  const B=l>=5?[`<span class="ef g">${artNm(5)}</span>`]:[pbtn(`data-learn="${a.k}" data-mode="self"`,"Tự học",`tốn: Sức ${balSg(-BAL.artLes.self)} · thành: tiến bộ ${crsGainW("self",l)}`,t2||(S.suc<BAL.sucNeed.self?"Sức dưới "+BAL.sucNeed.self:"")),
   pbtn(`data-learn="${a.k}" data-mode="teacher"`,"Học với thầy",`tốn: Bạc -${cost}, Sức ${balSg(-BAL.artLes.tch)} · thành: tiến bộ ${crsGainW("teacher",l)}, luôn hơn tự học 1, có khi nghe chuyện`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:"")),
   S.thDead?"":pbtn(`data-learn="${a.k}" data-mode="th"`,"Học với Thái hậu",`tốn: Sức ${balSg(-BAL.artLes.th)} · thành: tiến bộ ${crsGainW("th",l)}, Thái hậu +3`,t2||(S.th<40?"cần Thái hậu → ta: thiện cảm 40":(S.buoi||0)!==0?"chỉ buổi sáng":""))];
  return `<div class="art"><b>${ic(AIMG[a.k],20)}${a.n} · Bậc ${l}/5</b><span class="u">${ARTDO[a.k]||""} · lên bậc: ${a.st==="sac"?"Sắc":"Tài"} ${balSg(BAL.art.stUp)}</span>${l<5?`<span class="lv">Tiến bộ ${kitNeed(S.artp[a.k],need)}</span><div class="mini"><u style="width:${S.artp[a.k]/need*100}%"></u></div>`:""}
  <div class="ams">${ms.map((m,i)=>`<span class="${i<l?"ef g":i===l?"ef nx":"ef n"}" title="${m}">B${i+1}: ${m}</span>`).join("")}</div><div class="pcb">${B.join("")}</div></div>`}).join("")+`</div>`;
 return h}
document.addEventListener("click",e=>{const b=e.target.closest("[data-learn]");if(b&&!b.disabled){e.stopPropagation();lessonMode(b.dataset.learn,b.dataset.mode)}},true);
