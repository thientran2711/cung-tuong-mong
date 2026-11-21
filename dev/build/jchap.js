/* review/chapter-detail (owner 15/11 "Bấm vào báo thù cho nhà không có thông tin gì hiện ra à"; queue C24).
   ONE model of the chapter she is on (chapModel) feeds: (1) the chapter detail kit panel (chip / card / picture / check line tap), (2) the inline
   progress under the Mệnh truyện card, so the page is never empty under "Kế tiếp". Three states, one model: a milestone chapter (S.st.ms, checklist),
   an arc chapter (S.st.M, hồi by hồi) and an old v1 save (STORY[k], e.g. Báo thù cho nhà: chứng cứ 0/3, nhân chứng, bậc Tần, dâng sớ).
   Also the tap-through for the rest of the Mệnh truyện group (LUẬT SỬA CẢ NHÓM): Sắc phong card/picture/chips, Việc nhờ counter chips.
   Kit parts only: kitModal sections, kitSkillCard, kitChecks, kitRows, kitReqRows, kitSceneArt, .kchipb, .kbtn.alt, kpPop. */
const CHAP_HOW=[[/tấn phong|^Lên |Lên bậc/,"Tăng Sủng và Danh cho đủ điều kiện (mục Sắc phong); có thánh chỉ vào cuối tháng."],[/Qua .*tháng/,"Thời gian tự trôi; mỗi tháng qua là một bước."],[/thị tẩm/,"Đến lượt được lật thẻ bài."],[/Sủng/,"Ở gần Hoàng thượng: dự yến, hầu hạ, giữ mình đoan trang."],[/Đáp ứng/,"Làm tròn phận sự, để Hoàng thượng để ý thêm."],[/hoàng tử/,"Đợi trời ban con trai."],[/Thái tử/,"Giữ lòng Hoàng thượng thương con ngươi; chờ chiếu lập Thái tử."]];
function chapHow(t){const s=String(t).replace(/<[^>]+>/g,"");const r=CHAP_HOW.find(x=>x[0].test(s));return r?r[1]:""}
function chapRank(n){try{return RANKS[Math.max(0,Math.min(7,n))].n}catch(e){return""}}
function chapModel(){try{const st=S&&S.st;if(!st)return null;const c=st.ch,M=st.M,m=st.ms,k=S.origin&&S.origin.k;
 const Q0=(typeof QUEST67==="object"&&(QUEST67[k]||QUEST67.tt))||{t:""};const art=typeof kitOriginArt==="function"?kitOriginArt(k):"";
 const o={mode:"",kicker:"",title:"",sub:"",goal:"",art,cover:art,steps:[],past:[],next:"",risks:[],go:"",plan:c&&c.plan?c.plan.slice(c.i+1).filter(x=>x!=="fin").length:0,road:Q0.t};
 const done=c&&c.past?c.past:[];
 if(m&&c&&typeof MS67==="object"&&MS67[m.id]){const d=MS67[m.id],st0=d.steps(m);o.mode="ms";o.kicker=`Chương ${c.n}`;o.title=d.t();o.sub=`Chương ${c.n}/${c.max}`;o.goal=d.g();
  o.steps=st0.map(x=>({ok:!!x[1],t:x[0],d:x[1]?"":chapHow(x[0])}));const nx=st0.find(x=>!x[1]);o.next=nx?nx[0]:"đã xong mọi bước";
  o.risks=[msHan67(m,2)];o.go="Hành sự"}
 else if(M&&!M.done){const a=ARC67[M.a],P=pos67(M)||{c:M.chap||1,i:0,n:M.seq.length};o.mode="arc";o.kicker=`Chương ${P.c}`;o.title=a.t;o.sub=lab67(M);o.goal=fill67(a.g,M);
  o.cover=stArtOf(M.a,null,null)||art;
  M.seq.forEach((x,i)=>{const dn=i<M.i,cur=i===M.i;o.steps.push({ok:dn,t:`Hồi ${i+1}/${M.seq.length}${cur?" (đang tới)":""}`,d:dn?(M.hist[i]||""):(cur?hint67(M):"chưa mở")})});
  M.hist.forEach((h,i)=>o.past.push({t:`Hồi ${i+1}`,d:h,img:stArtOf(M.a,M.used&&M.used[i],null)||o.cover}));
  o.next=hint67(M);const left=Math.max(0,M.dl-S.turn);
  o.risks=[["Hạn",`còn ${left} tháng`+(left<=1?": sắp tới hạn":""),left<=1?"r":""],["Bỏ mặc","tới hạn mà chưa lo thì chương tự khép ở kết cục xấu","r"],["Lợi thế",`${M.sc||0}: mỗi phần thêm cơ may ở hồi cao trào`]];
  o.go=typeof isSrv67==="function"&&isSrv67()?"":"Hành sự"}
 else if(c&&c.all){o.mode="all";o.title="Mệnh truyện trọn vẹn";o.goal="Đã đi hết các chương của kiếp này.";o.risks=[]}
 else if(typeof STORY==="object"&&STORY[k]&&!(typeof v267==="function"&&v267())){const s=STORY[k],P=pos67()||{c:1,i:0,n:s.n||0};let hn="";try{hn=s.hint?s.hint():""}catch(e){}
  o.mode="v1";o.kicker="Chương 1";o.title=s.t;o.sub=lab67();o.goal=s.goal;o.next=st.done?(st.tag||""):(hn||"chờ hồi kế tiếp");o.go="Hành sự";
  if(k==="td"){const ce=Math.min(S.caseEv||0,3),w=!!st.wit,rk=S.rank>=3,av=!!S.avenged;
   for(let i=1;i<=3;i++)o.steps.push({ok:ce>=i,t:`Chứng cứ thứ ${i}/3`,d:ce>=i?"":"Điều tra án cũ ở Hành sự: tốn Bạc và Sức, có thể hỏng"});
   o.steps.push({ok:w,t:"Nhân chứng: lão thái giám Vương",d:w?"Đã giữ được, đang an toàn":ce>=2?`Đang nguy: người của ${S.foeDad||"kẻ thù"} truy sát. Tin báo tới thì chọn cách che chở (nhờ cung nữ thân tín giấu, hoặc dùng bạc)`:"Chưa lộ diện: gom được hai chứng cứ thì ông mới tìm tới"});
   o.steps.push({ok:rk,t:`Bậc Tần (nay ${chapRank(S.rank)})`,d:rk?"":"Lên bậc ở mục Sắc phong: đủ Sủng, Danh, rồi khảo hạch"});
   o.steps.push({ok:av,t:"Dâng sớ lật án",d:av?"":ce>=3&&w&&rk?"Đủ cả: dâng sớ ở Hành sự":"Mở được khi đủ chứng cứ, nhân chứng và bậc Tần"});
   o.risks=[["Hồ sơ cháy","Kho hồ sơ Hình bộ có thể bốc cháy trong đêm: mất một chứng cứ","r"],["Dâng sớ hỏng","Hoàng thượng nổi giận: chứng cứ bị thu hủy, Danh và Sủng giảm","r"],["Kẻ thù",S.foe?`${S.foe} và ${S.foeDad}`:"người đứng sau vụ án"]]}
  else{const nn=P.n||0;for(let i=1;i<=nn;i++)o.steps.push({ok:i<P.i||!!st.done,t:`Hồi ${i}/${nn}`,d:""});o.risks=[["Kết quả",st.done?(st.tag||""):"chưa định"]]}}
 else return null;
 o.past=o.past.length?o.past:[];return o}catch(e){console.error("chapModel",e);return null}}
/* inline progress (under the card): the steps as check lines with where/how, the risks, the "Đi làm" link */
function chapGoBtn(M){return M&&M.go?`<p class="chapgo"><button type="button" class="kbtn alt" data-chapgo="1">Đi làm: ${M.go}</button></p>`:""}
function chapInline(M,skipSteps){if(!M||M.mode==="all")return"";if(M.mode==="ms")return chapGoBtn(M);const L=M.steps.map(x=>[x.ok,`${x.t}${x.d?`<small class="past"> · ${x.d}</small>`:""}`]);
 return (skipSteps||!L.length?"":kitChecks(L))+(M.risks.length?rows67(M.risks.map(r=>[r[0],r[1],r[2]||""])):"")+chapGoBtn(M)}
function chapThumb(src,n){return src?kitSceneArt(src,n||"",{shape:"tall",size:"thumb",cap:false}):""}
/* the detail panel = kitGoalDetail (jgoal.js, KIT §72), grown with chapModel; no second panel */
function chapOpen(){if(typeof kitGoalDetail==="function"){if(Q.some(m=>m.kit&&m.kit.chap))return;kitGoalDetail()}}
/* the rank card: what is still needed for the next rank */
function chapRankOpen(){if(Q.some(m=>m.kit&&m.kit.chap))return;if(S.rank>=7||S.out||typeof promoReq!=="function")return;const R=promoReq().slice().sort((a,b)=>a[0]-b[0]);const ok=R.filter(x=>x[0]).length;
 kitModal({kind:"info",title:`Sắc phong: ${chapRank(S.rank+1)}`,sub:`Đạt ${ok}/${R.length} điều`,sections:[{h:"Điều kiện",html:kitReqRows(R)},{h:"",html:`<p class="chapgo"><button type="button" class="kbtn alt" data-chapgo="1">Đi làm: Hành sự</button></p>`}],btn:"Lui",chap:1})}
/* tap-through for the chips on the Mệnh truyện group */
function chapChipHint(c){const t=(c.innerText||"").replace(/\s+/g," ").trim();const C=typeof Q72CFG==="object"?Q72CFG:{max:4,mo:2};
 if(/^Đang làm/.test(t))return [`Đang làm ${t.replace(/^Đang làm\s*/,"")}`,`Số việc nhờ ngươi đang nhận; nhận tối đa ${C.max} việc một lúc.`];
 if(/^Lời nhờ tháng/.test(t))return ["Lời nhờ tháng này",`Mỗi tháng người trong cung ngỏ lời nhờ ngươi tối đa ${C.mo} lần.`];
 if(/^Xong/.test(t))return ["Xong","Số việc nhờ ngươi đã làm trọn."];if(/^(Hỏng|Bại)/.test(t))return ["Bại","Số việc nhờ ngươi làm hỏng hoặc bỏ dở."];if(/^Từ chối/.test(t))return ["Từ chối","Số lời nhờ ngươi đã từ chối; từ chối thì người nhờ mếch lòng."];
 if(/^Đức/.test(t))return ["Đức",KIT_GLOSS["Ngôi Hoàng hậu"]||"Đức là điều kiện của ngôi Hoàng hậu."];if(/khảo hạch|điều kiện/i.test(t))return ["Khảo hạch tấn phong",(typeof kitGlossText==="function"&&kitGlossText("Khảo hạch tấn phong"))||"Đủ điều kiện thì được dự khảo hạch tấn phong; đỗ mới được thăng bậc."];
 return null}
document.addEventListener("click",e=>{try{const t=e.target;if(!t||!t.closest)return;const go=t.closest("[data-chapgo]");if(go){e.stopPropagation();e.preventDefault();if(Q.length&&Q[0].kit&&Q[0].kit.chap){Q.shift();showModal()}tab="act";render();return}
 const pn=t.closest("#panel");if(!pn||t.closest("button,a,input,select,textarea,.kgl,.kpanec,.pcb,.ksub,.pctabs,.kpbar,.opts"))return;
 const RK=".kskill[data-skill^='rank-'],.kslide[data-ksk='story-rank']";if(t.closest(RK)||(tab==="story"&&t.closest(".ktop .kchip")&&pn.querySelector(RK))){const ch=t.closest(".ktop .kchip");
  const h=ch&&chapChipHint(ch);if(h){e.stopPropagation();kpPop(ch,`<div class="kpopt">${h[0]}</div><div class="kpopx">${h[1]}</div>`);return}if(!ch){e.stopPropagation();chapRankOpen()}return}
 if(tab==="story"&&(t.closest("[data-chap]")||t.closest(".kskill[data-skill^='story-']")||t.closest(".kchk")||t.closest(".ktop .kchip"))&&pn.querySelector(".kskill[data-skill^='story-'],.kslide[data-ksk='story-now']")){e.stopPropagation();chapOpen();return}
 if(tab==="q72"){const ch=t.closest(".ktop .kchip");const h=ch&&chapChipHint(ch);if(h){e.stopPropagation();kpPop(ch,`<div class="kpopt">${h[0]}</div><div class="kpopx">${h[1]}</div>`)}}}catch(err){console.error("chap tap",err)}},true);
(function(){const st=document.createElement("style");st.id="chap-css";st.textContent=`.chapgo{margin:8px 0 2px;text-align:center}#panel .ktop .kchip,#panel .kchk,#panel .kskill[data-skill^="story-"],#panel .kskill[data-skill^="rank-"]{cursor:pointer}`;document.head.appendChild(st)})();
