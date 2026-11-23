/* ================= LEARNING: three roads, a milestone at every grade, gains shown on the button ================= */
const ARTDO={cam:"Tài: thơ, đàn, thi tài; dễ được Hoàng thượng để ý",ky:"Tài và Tâm cơ: đánh cờ, đoán ý người",thi:"Tài: làm thơ, bàn chuyện với Hoàng thượng",hoa:"Tài: vẽ tranh dâng tặng, Thái hậu quý",vu:"Sắc: múa ở yến tiệc, được chú ý",y:"Sắc: điều hương, nhận ra độc, chữa bệnh"};
const ARTMS={
 cam:["Tài +2; mỗi tháng tự đàn: Sức +1","Đánh đàn ở Ngự hoa viên dễ thành hơn (mỗi bậc +4)","Mở «Phượng cầu hoàng»: cơ hội được thị tẩm","Dạy con đàn: mỗi tháng các con Tài +1","Danh +6; đàn ở yến tiệc dễ được ban thưởng"],
 ky:["Tài +2, Tâm cơ +1","Tâm cơ +1 (dò la, mưu kế dễ hơn)","Mở «Đánh cờ với Hoàng thượng»","Tâm cơ +2","Danh +6, Tâm cơ +2"],
 thi:["Tài +2","Tuyến truyện thơ văn mở thêm lựa chọn","Mỗi tháng thơ đến tay Hoàng thượng: {sgRaw:tho.sung}","Bàn chuyện triều chính khéo hơn (mỗi bậc +3)","Danh +6; mỗi tháng {sgRaw:tho.sung5}"],
 hoa:["Tài +2","Thái hậu: thiện cảm +3","Mở «Vẽ chân dung tặng Thái hậu»","Thái hậu: thiện cảm +5","Danh +6, Thái hậu: thiện cảm +5"],
 vu:["Sắc +2","Múa trong yến tiệc dễ thành hơn (mỗi bậc +4)","Mở «Kinh hồng vũ»","Sắc +2","Danh +6"],
 y:["Sắc +2","Nhận ra độc, xạ hương trong đồ","Bệnh tật nhẹ hơn; Sức hồi tốt hơn","Tự bào chế thuốc an thai, chữa bệnh cho con","Danh +6; các con ít bệnh"]};
for(const k in ARTMS)sgRuleArr(ARTMS[k]);/* r2 sg-card: Sủng tokens read from BAL when shown */
/* grade bonuses beyond the base +2 (applied once when the grade is reached) */
(function(){const a0=addArt;addArt=function(k,g){const l0=S.arts[k];a0.apply(this,arguments);for(let l=l0+1;l<=S.arts[k];l++){const b={ky:{1:{tamco:1},2:{tamco:1},4:{tamco:2},5:{tamco:2}},hoa:{2:{th:3},4:{th:5},5:{th:5}},vu:{4:{sac:2}}}[k];if(b&&b[l]){apply(b[l]);log(`${ARTS.find(a=>a.k===k).n} bậc ${l}: ${fmt(b[l])}.`)}}}})();
function artMonth(){if(!S||S.out)return;if(S.arts.cam>=1)S.suc=cl(S.suc+1,0,sucCap(S));if(S.arts.cam>=4)S.kids.filter(k=>k.alive).forEach(k=>k.tal=cl(k.tal+BAL.eff.j23.talArtMonth,0,100))}
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{if(!S.dead)artMonth()}catch(e){}return ev}})();
/* three roads */
/* teacher fee (jrcp: depends on the chosen teacher) and the favour paid when the session starts */
function tchFee(k){return artFee(S.arts[k])}
function tchPaid(k){}
function lessonMode(k,mode){const l=S.arts[k],cost=tchFee(k);if(!S||S.dead||Q.length||S.mg||l>=5)return;let c;
 if(mode==="self"){if(!can(2)||S.suc<BAL.sucNeed.self)return;c={suc:-BAL.artLes.self}}
 else if(mode==="th"){if(!can(2)||S.th<40||(S.buoi||0)!==0||S.thDead)return;c={suc:-BAL.artLes.th,th:3}}
 else{if(!can(2)||S.bac<cost)return;c={suc:-BAL.artLes.tch,bac:-cost,tch:k}}
 c.khac=2;/* KIT §13.9 (j82 kgDefer): the lesson's charge is taken on «Sẵn sàng»; the ✕ before it is a free back */
 const open=()=>{S.mg={k,l,mode};save();render();resumeMG()};if(typeof kgDefer==="function")kgDefer(c,open);else{const f={suc:c.suc};if(c.bac)f.bac=c.bac;if(c.th)f.th=c.th;apply(f);if(c.tch)tchPaid(k);spend(2);open()}}
(function(){const r0=resumeMG;resumeMG=function(){const m=S.mg;if(!m)return;const a=ARTS.find(x=>x.k===m.k);openMG(m.k,m.l,g=>{S.mg=null;const gs=Math.max(1,Math.round(g*.6)),gg=m.mode==="self"?gs:m.mode==="teacher"?Math.max(g,gs+((typeof BAL!=="undefined"&&BAL.tchMin)||1)):g;log(`${m.mode==="self"?"Tự học":m.mode==="th"?"Học với Thái hậu":"Học với thầy"} ${a.n}. Tiến bộ +${gg}.`);addArt(m.k,gg);
  if(m.mode==="teacher"&&roll(30)){if(roll(50)&&discover())log("Thầy dạy kể một sở thích của Hoàng thượng.");else{const t=evGuilty(S,liveRivals(true));if(t&&evA(S,t,BAL.eff.j23.evTop))log(`Thầy dạy buột miệng chuyện của ${t.name}: chứng cứ ${balSg(BAL.eff.j23.evTop)}.`);else log("Thầy dạy kể chuyện trong cung, toàn chuyện vô hại.")}}render()})}})();
function artTabHTML(){const nx=ARTS.map(a=>S.arts[a.k]);let h=`<div class="ph"><span>Mỗi buổi học tốn 2 khắc. Ba cách học, giá trị ngang nhau, tốn thứ khác nhau.</span>${S.master?`<span class="g">Danh sư còn dạy ${S.master} tháng</span>`:""}</div><div class="arts">`;
 h+=ARTS.map(a=>{const l=S.arts[a.k],need=l+2,cost=artFee(l),ms=ARTMS[a.k]||[];const t2=whyTime(2);
  const B=l>=5?[`<span class="ef g">${artNm(5)}</span>`]:[pbtn(`data-learn="${a.k}" data-mode="self"`,"Tự học",`tốn: Sức -15 · thành: tiến bộ một hai phần`,t2||(S.suc<BAL.sucNeed.self?"Sức dưới "+BAL.sucNeed.self:"")),
   pbtn(`data-learn="${a.k}" data-mode="teacher"`,"Học với thầy",`tốn: Bạc -${cost}, Sức -10 · thành: tiến bộ hai ba phần, luôn hơn tự học 1, có khi nghe chuyện`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:"")),
   S.thDead?"":pbtn(`data-learn="${a.k}" data-mode="th"`,"Học với Thái hậu",`tốn: Sức -10 · thành: tiến bộ một đến ba phần, Thái hậu +3`,t2||(S.th<40?"cần Thái hậu → ta: thiện cảm 40":(S.buoi||0)!==0?"chỉ buổi sáng":""))];
  return `<div class="art"><b>${ic(AIMG[a.k],20)}${a.n} · Bậc ${l}/5</b><span class="u">${ARTDO[a.k]||""} · lên bậc: ${a.st==="sac"?"Sắc":"Tài"} +2</span>${l<5?`<span class="lv">Tiến bộ ${S.artp[a.k]}/${need}</span><div class="mini"><u style="width:${S.artp[a.k]/need*100}%"></u></div>`:""}
  <div class="ams">${ms.map((m,i)=>`<span class="${i<l?"ef g":i===l?"ef nx":"ef n"}" title="${m}">B${i+1}: ${m}</span>`).join("")}</div><div class="pcb">${B.join("")}</div></div>`}).join("")+`</div>`;
 return h}
document.addEventListener("click",e=>{const b=e.target.closest("[data-learn]");if(b&&!b.disabled){e.stopPropagation();lessonMode(b.dataset.learn,b.dataset.mode)}},true);
