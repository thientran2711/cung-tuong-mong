/* ================= jtabs: TÀI NGHỆ · MỆNH TRUYỆN · VIỆC NHỜ in the kit (owner 11/15, KIT §46) =================
   The three tabs read like documents (paragraphs, h2/h3, bare cards with no picture). Now they are built from kit parts only:
   - kitSubTabs: the tab's ACTIONS / content split into kit sub-tabs (the same .pctabs.kcattabs row as Hành sự, with "làm được/tổng"
     counts); the row goes into the pane bar (jpane) and the choice is remembered per tab;
   - kitSkillCard (KIT §21, the ONE head card, j79): skill / work / chapter / sắc phong heads and empty states (kitEmpty);
     pictures = kitSceneArt size "thumb" (§28.19); act cards = plain pbtn in a .kpanec area → compact acts of KIT §43 (jk4, from kit-fig2);
   - kitChecks: ✓/✗ chip rows; kitInfo: a rules text folded behind an ⓘ gloss;
   - person rows: kitPersonLine (portrait + name + what is owed).
   Doable first everywhere: a sub-tab opens on the first group with something she can do; inside, cards she can do come first.
   ===================================================================================================================== */
Object.assign(KIT_GLOSS,{
 "Cách học":"Mỗi buổi học tốn 2 khắc. Tự học không tốn bạc nhưng tiến chậm; theo thầy hay ma ma tốn bạc, tiến nhanh. Mỗi bậc cần thêm 2 phần tiến bộ so với bậc trước. Phi tần khác cũng học theo cùng luật.",
 "Tứ đức":"Bốn môn của nữ nhi trong cung (Công, Dung, Ngôn, Hạnh): mỗi bậc đổ vào Sắc, Đức, phần thắng và phẩm đồ tự làm.",
 "Luật chương":"Mỗi chương truyện có hạn. Mở từng hồi bằng thẻ «Mệnh truyện» ở mục Hành sự (Sức -5, 2 khắc). Theo đuổi thì giữ Lợi thế, có cơ thắng và phần thưởng (thắng: đồ quý, hiếm hay trân phẩm; vừa: đồ thường; thua: không). Bỏ mặc quá hạn thì chương tự khép ở kết cục xấu: mất Lợi thế, Danh -3, kết cục xuất thân xấu đi; không chết, đường lên ngôi Hoàng hậu vẫn mở.",
 "Việc nhờ":"Người trong cung tìm đến nhờ khi cần (nhiều nhất vài lời nhờ mỗi tháng); ngươi cũng có thể đến các nơi và hỏi han. Giúp xong một việc thì người nhờ nợ ngươi một ân; ngươi có thể nhờ họ trả lại sau. Từ chối người mình đang nợ thì mếch lòng gấp đôi."});
function ktEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
/* ---- sub-tabs ---- */
const KTSUB={};
function ktSubGet(key,list){let v=KTSUB[key];if(v==null){try{v=localStorage.getItem("ctm-ktsub-"+key)}catch(e){}}
 if(!list.some(x=>x.k===v)){const d=list.find(x=>x.doable>0)||list[0];v=d?d.k:""}return v}
function kitSubTabs(key,list){const cur=ktSubGet(key,list);
 return{cur,html:`<div class="pctabs kcattabs ktsub" role="tablist" data-ktsub="${key}">${kitTabRowHTML(list.map(x=>({k:x.k,label:x.label,n:x.total!=null?`${x.doable}/${x.total}`:x.n,tip:x.total!=null?`làm được ${x.doable} trên ${x.total} việc`:""})),cur,`data-ktsv`)}</div>`}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-ktsv]");if(!b)return;const row=b.closest("[data-ktsub]");if(!row)return;e.stopPropagation();
 const key=row.dataset.ktsub;KTSUB[key]=b.dataset.ktsv;try{localStorage.setItem("ctm-ktsub-"+key,b.dataset.ktsv)}catch(x){}const P=$("panel");if(P)P.scrollTop=0;renderPanel()},true);
/* ---- parts (kitSteps, kitBar, kitSkillCard, kitEmpty live in the kit: j79 §21) ---- */
function kitInfo(term,label){return `<span class="ktinfo">${kitGloss(term,`ⓘ ${label||term}`)}</span>`}
function kitChecks(list){return `<div class="kchecks">${list.map(([ok,t])=>`<div class="kchk ${ok?"y":"n"}"><span class="kchip ${ok?"g":"r"}">${ok?"✓":"✗"}</span><span class="kchkt">${t}</span></div>`).join("")}</div>`}
const ktDoable=h=>(String(h).match(/<button(?![^>]*\bdisabled\b)[^>]*data-(learn|vlearn|charity|wkprac|wk="prac"|q72a|q72c)/g)||[]).length;
const ktTotal=h=>(String(h).match(/<button[^>]*data-(learn|vlearn|charity|wkprac|wk="prac"|q72a|q72c)/g)||[]).length;
/* ---------- TÀI NGHỆ ---------- */
function ktArtSkills(){const t2=whyTime(2);const out=[];
 for(const V of (typeof VIR!=="undefined"?VIR:[])){const l=S.vir[V.k],cost=virCost(l);const B=l>=5?[]:[
   pbtn(`data-vlearn="${V.k}" data-mode="self"`,"Tự học",`Chắc chắn · tốn: 2 khắc, Sức -15 · chơi một trò nhỏ · thành: tiến bộ một hai phần`,t2||(S.suc<25?"Sức dưới 25":"")),
   pbtn(`data-vlearn="${V.k}" data-mode="master"`,"Học với ma ma",`Chắc chắn · tốn: 2 khắc, Bạc -${cost}, Sức -10 · chơi một trò nhỏ · thành: tiến bộ hai ba phần`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:""))];
  if(V.k==="hanh")B.push(pbtn(`data-charity="1"`,"Phát bạc cứu giúp cung nhân nghèo",`Chắc chắn · tốn: 1 khắc, Bạc -20 · thành: Đức +3, Danh +1 (mỗi tháng một lần)`,whyTime(1)||(S.bac<20?"thiếu bạc (cần 20)":S.charM===S.turn?"tháng này đã làm":"")));
  const fx=(typeof VIRFX==="object"&&VIRFX[V.k])||[];out.push({g:"duc",kind:"vir",k:V.k,name:`${V.n} · ${V.full}`,level:l,prog:S.virp[V.k],need:l+2,desc:V.d,next:fx[l]?fxItems(fx[l],"n").join(" "):"",acts:B,img:kitSkillArt("vir",V.k,V.n),stepsAttr:`data-v85tab="${V.k}"`})}
 for(const a of ARTS){const l=S.arts[a.k],cost=5+l*5;const img=kitSkillArt("art",a.k,a.n)||(typeof AIMG==="object"&&AIMG[a.k]?AIMG[a.k]:"");
  const B=l>=5?[]:[pbtn(`data-learn="${a.k}" data-mode="self"`,"Tự học",`Chắc chắn · tốn: 2 khắc, Sức -15 · thành: tiến bộ một hai phần`,t2||(S.suc<25?"Sức dưới 25":"")),
   pbtn(`data-learn="${a.k}" data-mode="teacher"`,"Học với thầy",`Chắc chắn · tốn: 2 khắc, Bạc -${cost}, Sức -10 · thành: tiến bộ hai ba phần, luôn hơn tự học 1, có khi nghe chuyện`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:"")),
   S.thDead?"":pbtn(`data-learn="${a.k}" data-mode="th"`,"Học với Thái hậu",`Chắc chắn · tốn: 2 khắc, Sức -10 · thành: tiến bộ một đến ba phần, Thái hậu +3`,t2||(S.th<40?"cần Thái hậu thương 40":(S.buoi||0)!==0?"chỉ buổi sáng":""))].filter(Boolean);
  const extra=(a.k==="theu"||a.k==="nau")&&typeof artBonus==="function"?` · phẩm đồ tự làm ${artBonus(S,a.k).q}/100`:"";const fx=(typeof ARTFX==="object"&&ARTFX[a.k])||[];
  out.push({g:["cam","ky","thi","hoa"].includes(a.k)?"cktt":"nc",kind:"art",k:a.k,name:a.n,level:l,prog:S.artp[a.k],need:l+2,desc:((typeof ARTDO==="object"&&ARTDO[a.k])||"")+extra,next:fx[l]?fxItems(fx[l],"n").join(" "):"",acts:B,img,stepsAttr:`data-v85tab="${a.k}"`})}
 return out}
function ktArtHTML(){try{vNormAll()}catch(e){}const SK=ktArtSkills();const G=[["duc","Tứ đức"],["cktt","Cầm kỳ thi họa"],["nc","Vũ · Y · Nữ công"]];
 let works="";try{works=ktWorksHTML()}catch(e){works=""}
 const list=G.map(([k,label])=>{const L=SK.filter(s=>s.g===k);const h=L.map(s=>s.acts.join("")).join("");return{k,label,doable:ktDoable(h),total:ktTotal(h)}});
 if(works&&works.replace(/<[^>]+>/g,"").trim())list.push({k:"wk",label:"Tác phẩm",doable:ktDoable(works),total:ktTotal(works)||null,n:null});
 const sub=kitSubTabs("art",list);let h=sub.html+`<div class="ktop">${kitInfo("Cách học")}${sub.cur==="duc"?` ${kitInfo("Tứ đức")} <span class="kchip n">Đức <b>${S.duc}</b></span> <button class="lnk ladi" data-v85tab="duc">ⓘ luật Đức</button>`:""}${S.master?` <span class="kchip g">Danh sư còn dạy ${S.master} tháng</span>`:""}</div>`;
 if(sub.cur==="wk")return h.replace(`${kitInfo("Cách học")}`,`${kitInfo("Tác phẩm")}`)+`<div class="kskills">${works}</div>`;
 const L=SK.filter(s=>s.g===sub.cur).map(s=>Object.assign(s,{can:s.acts.some(a=>!/\sdisabled[\s>]/.test(a.slice(0,a.indexOf(">")+1)))}));
 L.sort((a,b)=>(b.can-a.can)||((a.level>=5)-(b.level>=5)));
 return h+`<div class="kskills">${L.map(kitSkillCard).join("")}</div>`}
/* Tác phẩm (j83 works): one skill head per art that makes works = picture, bậc, what it makes as chips, the quality ladder;
   "Tự học, làm tác phẩm" (mastered only) as a compact act. Rules behind the ⓘ "Tác phẩm" gloss (was a paragraph + bare divs). */
function ktWorksHTML(){if(typeof wkKindsOf!=="function"||typeof WK!=="object")return"";const why=whyTime(2)||(S.suc<15?"Sức dưới 15":"");
 const L=ARTS.map(a=>{const l=S.arts[a.k],ks=wkKindsOf(a.k);if(!ks.length)return null;const img=kitSkillArt("art",a.k,a.n)||(typeof AIMG==="object"&&AIMG[a.k]?AIMG[a.k]:"");
  const acts=l>=5?[pbtn(`data-wk="prac" data-art="${a.k}"`,"Tự học, làm tác phẩm",`Chắc chắn · tốn: Sức -10, 2 khắc · thành: một tác phẩm, ${wkOddsTxt(S,ks[0],0)}`,why)]:[];
  const kinds=ks.map(k=>`<span class="kchip n">${WK[k].w}${WK[k].per?" · để 1 tuần":""}</span>`).join(" ");
  return{kind:"wk",k:a.k,name:a.n,level:l,prog:S.artp[a.k],need:l+2,desc:`${kinds} <span class="kchip g">phẩm +${l}</span><br>${wkTierTxt(S,ks[0],0)}`,next:"",acts,img,can:!!(acts.length&&!why)}}).filter(Boolean);
 L.sort((a,b)=>(b.can-a.can)||(b.level-a.level));return L.map(kitSkillCard).join("")}
KIT_GLOSS["Tác phẩm"]="Mỗi buổi học hay tự học mà tự tay chơi trò tài nghệ thì ra một tác phẩm (Học nhanh: không ra thành phẩm), cất vào rương để dâng, tặng, bán, bày ở yến tiệc. Phẩm = phần chơi trò tài nghệ (từ 0 đến 10) + bậc tài nghệ + vật liệu. Đồ mua bằng bạc vẫn quý hơn. Môn đã tinh thông (bậc 5) thì tự học là ra tác phẩm ngay.";
artTabHTML=function(){return ktArtHTML()};
/* ---------- MỆNH TRUYỆN ---------- */
function ktStoryHTML(){const c=S.st.ch,M=S.st.M,m=S.st.ms,Q0=(typeof QUEST67==="object"&&(QUEST67[S.origin.k]||QUEST67.tt))||{t:""};
 const past=c&&c.past?c.past:[];const rare=(S.r97||[]);
 const list=[{k:"now",label:"Chương này",n:""},{k:"rank",label:"Sắc phong",n:""},{k:"past",label:"Đã qua",n:String(past.length+rare.length)}];
 const sub=kitSubTabs("story",list);let h=sub.html;
 const art=typeof kitOriginArt==="function"?kitOriginArt(S.origin.k):"";
 if(sub.cur==="now"){let card="";/* KIT §51.1: "Kết cục xuất thân" joins the chapter rows (one block = one label column), not a 2nd table under the checklist */
  const fin=c&&c.done?["Kết cục xuất thân",c.fin,S.st.tag&&c.fin?"g":""]:null;let finIn=false;
  if(m&&c){const d=MS67[m.id],st=d.steps(m);const done=st.filter(x=>x[1]).length;const nx=st.find(x=>!x[1]);
   card=kitSkillCard({kind:"story",k:"ms",kicker:`Chương ${c.n}`,name:d.t(),level:done,max:st.length,word:"Bước",bar:false,next:"",img:art})+(finIn=!!fin,rows67([["Mục tiêu",d.g()],["Bước này",nx?nx[0]:"đã xong mọi bước",nx?"":"g"],["Hạn","không có hạn"],fin]))+kitChecks(st.map(x=>[x[1],x[0]]))}
  else if(M){const a=ARC67[M.a],P=pos67(M)||{c:M.chap||1,i:0,n:M.seq.length};/* kicker Chương N, steps "Hồi i/n" = the act she is on, as in the story dialog title (lab67) */
   card=kitSkillCard({kind:"story",k:M.a,kicker:`Chương ${P.c}`,name:a.t,level:P.i,max:P.n,word:"Hồi",bar:false,next:"",img:art})+rows67([["Mục tiêu",fill67(a.g,M)],["Hồi kế tiếp",hint67(M)],["Hạn",`còn ${Math.max(0,M.dl-S.turn)} tháng`,M.dl-S.turn<=1?"r":""],["Lợi thế",`${M.sc} · mỗi phần thêm cơ may ở hồi cao trào`],fin]);finIn=!!fin}
  else if(c&&c.all)card=kitEmpty("Mệnh truyện","Đã đi hết các chương của kiếp này.");
  else if(!v267()&&S.st&&STORY[S.origin.k]){/* old save from before chapters (v1 story): one chapter, its steps as acts */const s=STORY[S.origin.k],P=pos67()||{c:1,i:0,n:s.n||0};let hn="";try{hn=s.hint?s.hint():""}catch(e){}
   card=kitSkillCard({kind:"story",k:"v1",kicker:`Chương ${P.c}`,name:s.t,level:P.i,max:P.n,word:"Hồi",bar:false,next:"",img:art})+rows67([["Mục tiêu",s.goal],
    S.st.done?["Kết cục",S.st.tag||(S.st.done>0?"Thành":"Hỏng"),S.st.done>0?"g":"r"]:["Kế tiếp",hn||"chờ hồi kế tiếp"]])}
  else card=kitEmpty("Mệnh truyện","Chưa mở chương nào. Mở bằng thẻ «Mệnh truyện» ở Hành sự.");
  const nx=c?c.plan.slice(c.i+1).filter(x=>x!=="fin").length:0;
  h+=`<div class="ktop"><span class="kchip n" data-chap="1">${ktEsc(Q0.t)}</span>${nx?` <span class="kchip n" data-chap="1">còn khoảng ${nx} chương</span>`:""} ${kitInfo("Luật chương")}</div>`+card;
  try{if(typeof chapModel==="function"){const CM=chapModel();h+=chapInline(CM,CM&&CM.mode==="ms")}}catch(e){console.error(e)}
  if(fin&&!finIn)h+=rows67([fin])}
 else if(sub.cur==="rank"){
  if(S.rank>=7)h+=kitEmpty("Sắc phong","Ngươi là Hoàng hậu. Đưa con mình lên ngôi để thành Hoàng thái hậu.");
  else if(S.out)h+=kitEmpty("Sắc phong",`Ngươi đang ở lãnh cung: không bàn chuyện sắc phong. Được minh oan thì phục vị ${RANKS[Math.max(0,Math.min(6,S.coldRank||0))].n} (hoặc thấp hơn một bậc).`);
  else{const R=promoReq();const ok=R.filter(x=>x[0]).length;
   h+=kitSkillCard({kind:"rank",k:String(S.rank+1),kicker:"Điều kiện sắc phong",name:RANKS[S.rank+1].n,level:ok,max:R.length,word:"Đạt",bar:false,next:"",img:kitInfoArt("sắc phong").src||art});
   R.sort((a,b)=>a[0]-b[0]);/* KIT §51 (owner 11/15 17:27Z): the requirement list is ONE kit table (kitReqRows: label | ✓/✗ + numbers), unmet first */h+=kitReqRows(R);
   h+=`<div class="ktop">${kitInfo("Ngôi Hoàng hậu")} <span class="kchip ${S.duc>=hhNeed(S).duc?"g":"r"}">Đức <b>${S.duc}/${hhNeed(S).duc}</b></span> ${typeof exChips==="function"?`${kitInfo("Khảo hạch tấn phong")} ${exChips()}`:`<span class="kchip n">đủ điều kiện: cuối tháng có thánh chỉ</span>`}</div>`}}
 else{const R=past.map(x=>[`Chương ${x.n}`,`${msName67(x)} · <b class="${x.k>0?"g":x.k<0?"r":""}">${x.tag}</b>`]);
  rare.forEach(x=>R.push([`✦ ${ARC67[x.a]?ARC67[x.a].t:x.a}`,x.ti&&x.ti!==x.tag?`${x.tag} · danh hiệu «${x.ti}»`:x.tag]));
  h+=R.length?rows67(R):kitEmpty("Mệnh truyện","Chưa qua chương nào.")}
 return h}
KIT_GLOSS["Ngôi Hoàng hậu"]="";
(function(){const t=()=>{try{KIT_GLOSS["Ngôi Hoàng hậu"]=`Ngôi Hoàng hậu cần: ngôi bỏ trống, có hoàng tử và Thái hậu ${BAL.hhTh} (không con trai: Thái hậu ${has("hieuthao")?BAL.hhThNoSonHieu:BAL.hhThNoSon}), và Đức ${hhNeed(S).duc} (mẹ Thái tử: ${BAL.hhDucHeir}). Khi ngôi trống, Hoàng thượng chọn trong những người đủ điều kiện (nặng ở hoàng tử, Thái hậu, Danh). Đủ điều kiện thì được dự khảo hạch tấn phong; đỗ mới được chọn. ${typeof promoRuleTxt==="function"?promoRuleTxt():""}`}catch(e){}};
 const r0=renderPanel0;renderPanel0=function(){if(S&&tab==="story"&&!(typeof isSrv==="function"&&isSrv())&&S.st&&typeof panel67==="function"){t();const el=$("panel");try{faceInit()}catch(e){}
   try{const s=STORY[S.origin.k];if(s&&s.calc)S.st.step=s.calc()}catch(e){}el.innerHTML=ktStoryHTML();el.dataset.tab=tab;kitFix(el);return}return r0.apply(this,arguments)}})();
/* ---------- VIỆC NHỜ ---------- */
function ktQ72HTML(){const q=q72();const mo=q.mo[S.turn]||0;const D=q72Debtors();const owe=Object.entries(q.d).filter(([k,v])=>v<0);
 const left=evCooldownLeft("q72ask",Q72CFG.cdAsk);const aw=S.dead?"đã hết kiếp":S.out?"đang ở lãnh cung":Q.length?"đang có việc chờ":left>0?`mới hỏi han, đợi ${left} tuần`:!can(1)?"hết khắc":q.a.length>=Q72CFG.max?`đang làm đủ ${Q72CFG.max} việc`:mo>=Q72CFG.mo?`tháng này đã có ${Q72CFG.mo} lời nhờ`:"";
 const ask=pbtn(`data-q72a="ask"`,`Hỏi han ở ${q72PlN(S.place)}: ai cần giúp?`,`tốn: 1 khắc · thành: người ở đây có việc thì ngỏ lời nhờ, ngươi nhận hay từ chối tùy ý`,aw);
 const calls=D.slice(0,8).map(([a,n,k])=>{const r=q72CallFx(a);const cd=evCooldownLeft("q72call:"+k,Q72CFG.cdCall);const tk=q72Fx(r.fx);if(r.rel)tk.push(q72Tok(a,r.rel));
  return{a,n,k,btn:pbtn(`data-q72c="${k}"`,`Nhờ ${q72Short(a)} trả ân`,`tốn: 1 khắc, ${R72(`nợ ân của ${q72Short(a)} -1`)} · thành: ${r.t}, ${tk.join(", ")}`,S.dead?"đã hết kiếp":Q.length?"đang có việc chờ":cd>0?`vừa nhờ, đợi ${cd} tuần`:!can(1)?"hết khắc":"")}});
 const callH=calls.map(x=>x.btn).join("");
 const list=[{k:"now",label:"Đang làm",doable:ktDoable(ask),total:null,n:`${q.a.length}/${Q72CFG.max}`},{k:"debt",label:"Nợ ân",doable:ktDoable(callH),total:null,n:String(D.length+owe.length)},{k:"news",label:"Trong cung",n:String(q.np.length)}];
 const sub=kitSubTabs("q72",list);
 let h=sub.html+`<div class="ktop"><span class="kchip n">Đang làm <b>${q.a.length}/${Q72CFG.max}</b></span> <span class="kchip n">Lời nhờ tháng này <b>${mo}/${Q72CFG.mo}</b></span> <span class="kchip g">Xong <b>${q.n.ok||0}</b></span> <span class="kchip r">Hỏng <b>${(q.n.fail||0)+(q.n.bad||0)}</b></span> <span class="kchip n">Từ chối <b>${q.n.dec||0}</b></span> ${kitInfo("Việc nhờ")}</div>`;
 if(sub.cur==="now"){h+=`<div class="pcb ktacts"><div class="kpanec">${ask}</div></div>`;
  const items=q.a.map((x,i)=>{const X=q72X(x);return{f:X?X.A.f:{ini:"?",col:"#888"},name:X?q72PgN(X.A):"",sep:i===0?"Đang làm":""}}).concat(q.h.slice(0,8).map((z,i)=>({f:z.f||{ini:"?",col:"#888"},name:z.pn||shortN(z.n||"?"),dim:true,sep:i===0?"Đã qua":""})));
  h+=items.length?`<div class="pgwrap">`+pager("q72",items,i=>i<q.a.length?q72Card(q.a[i]):q72HCard(q.h[i-q.a.length]))+`</div>`:kitEmpty("Việc nhờ","Chưa ai nhờ ngươi việc gì.")}
 else if(sub.cur==="debt"){
  if(calls.length)h+=`<h4 class="kpst">Họ nợ ngươi</h4><div class="ktpeople">${calls.map(x=>`<div class="ktprow">${ktPerson(x.a,`nợ ngươi ${x.n} ân`)}<div class="pcb kpanec">${x.btn}</div></div>`).join("")}</div>`;
  if(owe.length)h+=`<h4 class="kpst">Ngươi nợ họ</h4><div class="ktpeople">${owe.map(([k,v])=>`<div class="ktprow">${ktPersonK(k,(q.dn&&q.dn[k])||k,`ngươi nợ ${-v} ân · họ có thể nhờ lại`)}</div>`).join("")}</div>`;
  if(!calls.length&&!owe.length)h+=kitEmpty("Việc nhờ","Chưa ai nợ ngươi, ngươi cũng chưa nợ ai.")}
 else{h+=q.np.length?`<div class="ktpeople">${q.np.map(z=>{const v=RV(z.a);return `<div class="ktprow">${v?kitPersonLine(v,{sub:`${z.w} · ${z.t}`}):`<div class="kpl"><span class="kplt">${z.t}<small>${z.w}</small></span></div>`}</div>`}).join("")}</div>`:kitEmpty("Việc nhờ","Chưa nghe chuyện gì.")}
 return h}
function ktPerson(a,what){const v=a&&a.id!=null&&typeof RV==="function"?RV(a.id):null;if(v&&v.name)return kitPersonLine(v,{sub:what});
 const f=a&&a.f||{ini:"?",col:"#8a7a6a"};return `<div class="kpl">${typeof mdH==="function"?mdH(f,"sm"):""}<span class="kplt"><b>${ktEsc(q72Short(a))}</b><small>${what}</small></span></div>`}
function ktPersonK(k,name,what){let v=null;try{const m=/^r(\d+)$/.exec(k)||/^(\d+)$/.exec(k);if(m)v=RV(+m[1])}catch(e){}if(v&&v.name)return kitPersonLine(v,{sub:what});return `<div class="kpl"><span class="kplt"><b>${ktEsc(name)}</b><small>${what}</small></span></div>`}
if(typeof q72HTML==="function")q72HTML=function(){return ktQ72HTML()};
(function(){const st=document.createElement("style");st.id="kit-tabs";st.textContent=`
.ktop{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 10px}
.ktinfo .kgl{font-size:.82rem;color:var(--gold,#8a5a12);font-weight:600;cursor:pointer;border-bottom:1px dotted currentColor}
.kchecks{display:flex;flex-direction:column;gap:5px;margin:8px 0}
.kchk{display:flex;align-items:flex-start;gap:8px;font-size:.88rem;line-height:1.35}.kchk .kchip{flex:0 0 auto;min-width:26px;justify-content:center}
.kchk.y .kchkt{color:var(--dim,#6b5a44)}
/* .pcb.ktacts: p1 .pcb (auto-fill 168 px) sits in a later <style> (body) and won at equal specificity -> a lone act was 1/4 wide (reviewer r7) */
.ktacts,.pcb.ktacts{display:grid;grid-auto-rows:auto;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:6px;margin:0 0 10px}
.ktprow>.pcb.kpanec{grid-template-columns:minmax(0,1fr);grid-auto-rows:auto}
.ktpeople{display:flex;flex-direction:column;gap:6px;margin:0 0 10px}
.ktprow{display:grid;grid-template-columns:minmax(0,1fr);gap:6px;padding:8px;border:1px solid var(--line);border-radius:var(--k-rad,8px);background:var(--k-card,#fffaf0)}
/* kv:(min-width:700px) */.ktprow:has(.pcb){grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);align-items:center}
`;document.head.appendChild(st)})();
/* compact acts (KIT §43) after every panel render: the sub-tab click and the Mệnh truyện pane render through renderPanel, not render */
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{if(typeof kitActCompactOn==="function")kitActCompactOn($("panel"))}catch(e){}return r}})();
