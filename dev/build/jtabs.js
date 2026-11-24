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
 "Luật chương":`Mỗi chương truyện có hạn. Mở từng hồi bằng thẻ «Mệnh truyện» ở mục Hành sự (Sức ${BAL.arc.card.c.suc}, 2 khắc). Theo đuổi thì giữ Lợi thế, có cơ thắng và phần thưởng (thắng: đồ quý, hiếm hay trân phẩm; vừa: đồ thường; thua: không). Bỏ mặc quá hạn thì chương tự khép ở kết cục xấu: mất Lợi thế, Danh ${BAL.arc.ign.danh}, «Khép nẻo đời» xấu đi; không chết, đường lên ngôi Hoàng hậu vẫn mở.`,
 "Việc nhờ":"Người trong cung tìm đến nhờ khi cần (nhiều nhất vài lời nhờ mỗi tháng); ngươi cũng có thể đến các nơi và hỏi han. Giúp xong một việc thì người nhờ nợ ngươi một ân; ngươi có thể nhờ họ trả lại sau. Từ chối người mình đang nợ thì mếch lòng gấp đôi."});
function ktEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
/* ---- sub-tabs ---- */
const KTSUB={};
function ktSubGet(key,list){let v=KTSUB[key];if(v==null){try{v=localStorage.getItem("ctm-ktsub-"+key)}catch(e){}}
 if(!list.some(x=>x.k===v)){const d=list.find(x=>x.doable>0)||list[0];v=d?d.k:""}return v}
/* kitSubTabs(key,list,info): the kit tab bar. `info` = the ONE trailing info slot at the RIGHT END of the bar (owner 17/11 07:55Z: no info band under the tabs; "ⓘ Cách học" etc. live here) */
function kitSubTabs(key,list,info){const cur=ktSubGet(key,list);
 return{cur,html:`<div class="pctabs kcattabs ktsub" role="tablist" data-ktsub="${key}">${kitTabRowHTML(list.map(x=>({k:x.k,label:x.label,n:x.total!=null?`${x.doable}/${x.total}`:x.n,tip:x.total!=null?`làm được ${x.doable} trên ${x.total} việc`:""})),cur,`data-ktsv`)}${info?`<span class="pctinfo">${info}</span>`:""}</div>`}}
/* kitSecHead(left,right): a section header row (title/ⓘ left, chips + ⓘ right) — info that belongs to ONE section sits in its header, not in a band under the tabs */
function kitSecHead(left,right){return `<div class="ksech"><span class="ksechl">${left||""}</span><span class="ksechr">${right||""}</span></div>`}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-ktsv]");if(!b)return;const row=b.closest("[data-ktsub]");if(!row)return;e.stopPropagation();
 const key=row.dataset.ktsub;KTSUB[key]=b.dataset.ktsv;try{localStorage.setItem("ctm-ktsub-"+key,b.dataset.ktsv)}catch(x){}const P=$("panel");if(P)P.scrollTop=0;renderPanel()},true);
/* ---- parts (kitSteps, kitBar, kitSkillCard, kitEmpty live in the kit: j79 §21) ---- */
function kitInfo(term,label){return `<span class="ktinfo">${kitGloss(term,`ⓘ ${label||term}`)}</span>`}
/* kit-rows-b KP19: one step list with THREE states — done ✓ / now ▸ / next · ; list = [[state,text,note?]…], state "done"|"now"|"next" (Việc nhờ steps; generalises kitChecks §46 / kitCoopSteps §69.3) */
function kitStepList(list){return `<div class="kchecks ksteps">${(list||[]).map(([st,t,note])=>`<div class="kchk ksp-${st==="done"||st==="now"?st:"next"}"><span class="kchm ${st==="done"?"g":st==="now"?"w":"m"}">${st==="done"?"✓":st==="now"?"▸":"·"}</span><span class="kchkt">${t}${note?` <small>${note}</small>`:""}</span></div>`).join("")}</div>`}window.kitStepList=kitStepList;
function kitChecks(list){return `<div class="kchecks">${list.map(([ok,t])=>`<div class="kchk ${ok?"y":"n"}"><span class="kchm ${ok?"g":"r"}">${kitMark(ok)}</span><span class="kchkt">${t}</span></div>`).join("")}</div>`}
const ktDoable=h=>(String(h).match(/<button(?![^>]*\bdisabled\b)[^>]*data-(learn|vlearn|charity|wkprac|wk="prac"|q72a|q72c)/g)||[]).length;
const ktTotal=h=>(String(h).match(/<button[^>]*data-(learn|vlearn|charity|wkprac|wk="prac"|q72a|q72c)/g)||[]).length;
/* ---------- TÀI NGHỆ ---------- */
function ktArtSkills(){const t2=whyTime(2);const out=[];
 for(const V of (typeof VIR!=="undefined"?VIR:[])){const l=S.vir[V.k],cost=virCost(l);const B=l>=5?[]:[
   pbtn(`data-vlearn="${V.k}" data-mode="self"`,"Tự học",`tốn: 2 khắc, Sức -${BAL.td.selfSuc} · chơi một trò nhỏ · thành: tiến bộ một hai phần`,t2||(S.suc<BAL.sucNeed.self?"Sức dưới "+BAL.sucNeed.self:"")),
   pbtn(`data-vlearn="${V.k}" data-mode="master"`,"Học với ma ma",`tốn: 2 khắc, Bạc -${cost}, Sức -${BAL.td.mSuc} · chơi một trò nhỏ · thành: tiến bộ hai ba phần`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:""))];
  if(V.k==="hanh")B.push(pbtn(`data-charity="1"${capAt({k:BAL.charity.khac},BAL.charity.bac)}`,"Phát bạc cứu giúp cung nhân nghèo",`${capW()} · tốn: ${BAL.charity.khac} khắc, Bạc -${BAL.charity.bac} · thành: Đức +${BAL.charity.duc}, Danh +${BAL.charity.danh} (mỗi tháng một lần)`,whyTime(BAL.charity.khac)||(S.bac<BAL.charity.bac?`thiếu bạc (cần ${BAL.charity.bac})`:S.charM===S.turn?"tháng này đã làm":"")));
  const fx=(typeof VIRFX==="object"&&VIRFX[V.k])||[];out.push({g:"duc",kind:"vir",k:V.k,name:`${V.n} · ${V.full}`,kicker:artNm(l),level:l,prog:[virPts(S,V.k),100],bar:l>=5?false:undefined,desc:V.d,next:fx[l]?fxItems(fx[l],"n").join(" "):"",acts:B,img:kitSkillArt("vir",V.k,V.n),stepsAttr:`data-v85tab="${V.k}"`})}
 for(const a of ARTS){const l=S.arts[a.k],cost=artFee(l);const img=kitSkillArt("art",a.k,a.n)||(typeof AIMG==="object"&&AIMG[a.k]?AIMG[a.k]:"");
  const B=l>=5?[]:[pbtn(`data-learn="${a.k}" data-mode="self"`,"Tự học",`tốn: 2 khắc, Sức -${BAL.artLes.self} · thành: tiến bộ một hai phần`,t2||(S.suc<BAL.sucNeed.self?"Sức dưới "+BAL.sucNeed.self:"")),
   pbtn(`data-learn="${a.k}" data-mode="teacher"`,"Học với thầy",`tốn: 2 khắc, Bạc -${cost}, Sức -${BAL.artLes.tch} · thành: tiến bộ hai ba phần, luôn hơn tự học 1, có khi nghe chuyện`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:"")),
   S.thDead?"":pbtn(`data-learn="${a.k}" data-mode="th"`,"Học với Thái hậu",`tốn: 2 khắc, Sức -${BAL.artLes.th} · thành: tiến bộ một đến ba phần, Thái hậu +3`,t2||(S.th<40?"cần Thái hậu thương 40":(S.buoi||0)!==0?"chỉ buổi sáng":""))].filter(Boolean);
  const extra=(a.k==="theu"||a.k==="nau")&&typeof artBonus==="function"?` · phẩm đồ tự làm ${artBonus(S,a.k).q}/100`:"";const fx=(typeof ARTFX==="object"&&ARTFX[a.k])||[];
  out.push({g:["cam","ky","thi","hoa"].includes(a.k)?"cktt":"nc",kind:"art",k:a.k,name:a.n,kicker:artNm(l),level:l,prog:[artPts(S,a.k),100],bar:l>=5?false:undefined,desc:((typeof ARTDO==="object"&&ARTDO[a.k])||"")+extra,next:fx[l]?fxItems(fx[l],"n").join(" "):"",acts:B,img,stepsAttr:`data-v85tab="${a.k}"`})}
 return out}
function ktArtHTML(){try{vNormAll()}catch(e){}const SK=ktArtSkills();const G=[["duc","Tứ đức"],["cktt","Cầm kỳ thi họa"],["nc","Vũ · Y · Nữ công"]];
 let works="";try{works=ktWorksHTML()}catch(e){works=""}
 const list=G.map(([k,label])=>{const L=SK.filter(s=>s.g===k);const h=L.map(s=>s.acts.join("")).join("");return{k,label,doable:ktDoable(h),total:ktTotal(h)}});
 if(works&&works.replace(/<[^>]+>/g,"").trim())list.push({k:"wk",label:"Tác phẩm",doable:ktDoable(works),total:ktTotal(works)||null,n:null});
 /* owner 17/11 07:55Z: NO info band under the tabs. "ⓘ Cách học" (or "ⓘ Tác phẩm") = the tab bar's trailing slot; Tứ đức · Đức chip · ⓘ luật Đức = the Tứ đức section header; only a real status chip (Danh sư) keeps a one-line row */
 const cur0=ktSubGet("art",list);const sub=kitSubTabs("art",list,kitInfo(cur0==="wk"?"Tác phẩm":"Cách học"));let h=sub.html+(S.master?`<div class="ktop"><span class="kchip g">Danh sư còn dạy ${S.master} tháng</span></div>`:"")+(sub.cur==="duc"?kitSecHead(kitInfo("Tứ đức"),`<button class="lnk ladi" data-v85tab="duc">ⓘ luật Đức</button>`):"");
 if(sub.cur==="wk")return h+`<div class="kskills">${works}</div>`;
 const L=SK.filter(s=>s.g===sub.cur).map(s=>Object.assign(s,{can:s.acts.some(a=>!/\sdisabled[\s>]/.test(a.slice(0,a.indexOf(">")+1)))}));
 L.sort((a,b)=>(b.can-a.can)||((a.level>=5)-(b.level>=5)));
 return h+`<div class="kskills">${L.map(kitSkillCard).join("")}</div>`}
/* Tác phẩm (j83 works): one skill head per art that makes works = picture, bậc, what it makes as chips, the quality ladder;
   "Tự học, làm tác phẩm" (mastered only) as a compact act. Rules behind the ⓘ "Tác phẩm" gloss (was a paragraph + bare divs). */
function ktWorksHTML(){if(typeof wkKindsOf!=="function"||typeof WK!=="object")return"";const why=whyTime(2)||(S.suc<BAL.sucNeed.wk?"Sức dưới "+BAL.sucNeed.wk:"");
 const L=ARTS.map(a=>{const l=S.arts[a.k],ks=wkKindsOf(a.k);if(!ks.length)return null;const img=kitSkillArt("art",a.k,a.n)||(typeof AIMG==="object"&&AIMG[a.k]?AIMG[a.k]:"");
  const acts=l>=5?[pbtn(`data-wk="prac" data-art="${a.k}"`,"Tự học, làm tác phẩm",`tốn: Sức -${BAL.artLes.prac}, 2 khắc · thành: một tác phẩm, ${wkOddsTxt(S,ks[0],0)}`,why)]:[];
  const kinds=ks.map(k=>`<span class="kchip n">${WK[k].w}${WK[k].per?" · để 1 tuần":""}</span>`).join(" ");
  return{kind:"wk",k:a.k,name:a.n,kicker:artNm(l),level:l,prog:[artPts(S,a.k),100],bar:l>=5?false:undefined,desc:`${kinds} <span class="kchip g">phẩm +${wkLvQ(S,a.k)}</span><br>${wkTierTxt(S,ks[0],0)}`,next:"",acts,img,can:!!(acts.length&&!why)}}).filter(Boolean);
 L.sort((a,b)=>(b.can-a.can)||(b.level-a.level));return L.map(kitSkillCard).join("")}
KIT_GLOSS["Tác phẩm"]="Mỗi buổi học hay tự học mà tự tay chơi trò tài nghệ thì ra một tác phẩm (Học nhanh: không ra thành phẩm), cất vào rương để dâng, tặng, bán, bày ở yến tiệc. Phẩm = phần chơi trò tài nghệ (từ 0 đến 10) + chút bậc tài nghệ + vật liệu. Đồ mua bằng bạc vẫn quý hơn. Môn đạt "+BAL.art.nm[5]+" thì tự học là ra tác phẩm ngay.";
artTabHTML=function(){return ktArtHTML()};
/* MỤC LỤC CHƯƠNG (owner 24/11 f10-mucluc): EVERY chapter of her road by number + NAME with its state. Past = S.st.ch.past, now = the running chapter (milestone or arc), later = the rest of the plan:
   a named step (ms:/st:) shows its real name; an open slot (the origin's next premise «o», a shared arc «s») is not chosen yet, so it shows the part's name (BAL.st14.parts via F14). One source: ARC67 / MS67 / F14; no typed names. null = no chapter frame (old v1 save). */
function ktChapToc(){try{const c=S&&S.st&&S.st.ch;if(!c||!Array.isArray(c.plan))return null;const out=[];
 (c.past||[]).forEach(x=>{if(x.n!=null)out.push(["done",`Chương ${x.n} · ${msName67(x)}`,x.tag||"đã qua"])});
 let n=c.n||0;
 if(!c.all){const m=S.st.ms,M=S.st.M;let t="";try{t=m?MS67[m.id].t():M?ARC67[M.a].t:""}catch(e){}
  if(t)out.push(["now",`Chương ${n} · ${t}`,"đang làm"]);
  const max=c.max||14;
  let road=0;try{const f=S.st.f14;if(f&&f.road&&!f.r0&&ARC67[f.road])road=f.road}catch(e){}
  /* slots whose arc is not chosen yet («o» next premise of the origin, «s» shared arc): the REAL titles of the arcs still to come, in list order (never a typed name); none left = that chapter cannot run, so it is not listed */
  const played=new Set((c.past||[]).map(x=>x.a)),Mx=S.st.M?S.st.M.a:"";
  const rdId=(S.st.f14&&S.st.f14.road)||"";const qo=(c.pool||[]).filter(id=>ARC67[id]&&!played.has(id)&&id!==Mx&&id!==rdId).map(id=>ARC67[id].t);
  let qs=[];try{qs=arcIds67("*").filter(id=>!(c.usedS||[]).includes(id)&&!played.has(id)&&id!==Mx&&arcOk67(ARC67[id])).map(id=>ARC67[id].t)}catch(e){}
  c.plan.slice(Math.max(0,(c.i||0)+1)).filter(x=>x!=="fin").forEach(p=>{if(n>=max)return;let nm="",gu=0;
   if(p==="o"&&road){nm=ARC67[road].t;road=0}
   try{if(p==="end:12"&&typeof eg12==="function")p=eg12();
    if(/^ms:/.test(p))nm=MS67[p.slice(3)].t();else if(/^st:/.test(p))nm=ARC67[p.slice(3)].t}catch(e){}
   if(!nm&&p==="o"){nm=qo.shift()||qs.shift()||"";gu=1}else if(!nm&&p==="s"){nm=qs.shift()||"";gu=1}
   if(!nm)return;if(gu&&out.some(x=>x[1].endsWith(" · "+nm)))return;n++;out.push(["next",`Chương ${n} · ${nm}`,gu?"dự kiến":"chưa tới"])})}
 return out.length?out:null}catch(e){console.error(e);return null}}
window.ktChapToc=ktChapToc;
/* cung nữ road (owner 24/11, MAIN 127): Thân phận has no chapter slide, so its Mục lục is one kit chip button (data-ktoc) that opens the same Mục lục frame */
(function(){if(typeof srvRoadHTML!=="function")return;const r0=srvRoadHTML;srvRoadHTML=function(){const h=r0.apply(this,arguments);try{if(ktChapToc())return `<div class="ktop"><button type="button" class="kchip n" data-ktoc="1">Mục lục chương</button></div>`+h}catch(e){}return h}})();
/* ---------- MỆNH TRUYỆN ---------- */
function ktStoryHTML(){const c=S.st.ch,M=S.st.M,m=S.st.ms,Q0=(typeof QUEST67==="object"&&(QUEST67[S.origin.k]||QUEST67.tt))||{t:""};
 const past=c&&c.past?c.past:[];const rare=(S.r97||[]);
 const list=[{k:"now",label:"Chương này",n:""},{k:"rank",label:"Sắc phong",n:""},{k:"past",label:"Đã qua",n:String(past.length+rare.length)}];
 const sub=kitSubTabs("story",list,kitInfo("Luật chương"));let h=sub.html;/* "ⓘ Luật chương" = the tab bar's trailing slot (owner 17/11 07:55Z) */
 const art=typeof kitOriginArt==="function"?kitOriginArt(S.origin.k):"";
 if(sub.cur==="now"){/* chapter-card (owner #28/#29): the chapters are ONE SLIDE (kitSlide): wide picture with «Chương N · tên · hồi» on it, arrows + swipe, the rows below follow the slide, «Mục lục» in the corner */
  const fin=c&&c.done?["Khép nẻo đời",c.fin,S.st.tag&&c.fin?"g":""]:null;let finIn=false,cur=null,card="";
  const CM=(()=>{try{return typeof chapModel==="function"?chapModel():null}catch(e){return null}})();
  const inl=sk=>{try{return CM?chapInline(CM,sk):""}catch(e){console.error(e);return""}};
  if(m&&c){const d=MS67[m.id],st=d.steps(m);const done=st.filter(x=>x[1]).length;const nx=st.find(x=>!x[1]);finIn=!!fin;
   cur={kicker:`Chương ${c.n}`,title:d.t(),sub:`Bước ${done}/${st.length}`,img:art,tap:"chapOpen",body:rows67([["Mục tiêu",d.g()],["Bước này",nx?nx[0]:"đã xong mọi bước",nx?"":"g"],msHan67(m),fin])+kitChecks(st.map(x=>[x[1],x[0]]))+inl(true)}}
  else if(M){const a=ARC67[M.a],P=pos67(M)||{c:M.chap||1,i:0,n:M.seq.length};finIn=!!fin;
   cur={kicker:`Chương ${P.c}`,title:a.t,sub:`Hồi ${P.i}/${P.n}`,img:art,tap:"chapOpen",body:rows67([["Mục tiêu",fill67(a.g,M)],["Hồi kế tiếp",hint67(M)],["Hạn",`còn ${Math.max(0,M.dl-S.turn)} tháng`,M.dl-S.turn<=1?"r":""],["Lợi thế",`${M.sc} · mỗi phần thêm cơ may ở hồi cao trào`],fin])+inl(false)}}
  else if(c&&c.all)card=kitEmpty("Đã đi hết các chương của kiếp này",["Kiếp này không còn chương nào để mở."],{topic:"Mệnh truyện"});
  else if(!v267()&&S.st&&STORY[S.origin.k]){/* old save from before chapters (v1 story): one chapter, its steps as acts */const s=STORY[S.origin.k],P=pos67()||{c:1,i:0,n:s.n||0};let hn="";try{hn=s.hint?s.hint():""}catch(e){}
   cur={kicker:`Chương ${P.c}`,title:s.t,sub:`Hồi ${P.i}/${P.n}`,img:art,tap:"chapOpen",body:rows67([["Mục tiêu",s.goal],
    S.st.done?["Kết quả",S.st.tag||(S.st.done>0?"Thành":"Bại"),S.st.done>0?"g":"r"]:["Kế tiếp",hn||"chờ hồi kế tiếp"]])+inl(false)}}
  else card=kitEmpty("Ta chưa mở chương nào",["Mở bằng thẻ «Mệnh truyện» ở Hành sự."],{topic:"Mệnh truyện"});
  const F=typeof f14Info==="function"?f14Info():null;/* the 14-chapter frame (jst14): part chip + exact chapters left */
  const nx=F?F.left:c?c.plan.slice(c.i+1).filter(x=>x!=="fin").length:0;
  if(cur&&fin&&!finIn)cur.body+=rows67([fin]);
  const sl=past.map(x=>{let im=art;try{if(x.a&&typeof stArtOf==="function")im=stArtOf(x.a,null,null)||art}catch(e){}return{kicker:`Chương ${x.n}`,title:msName67(x),sub:x.tag,img:im,body:rows67([["Kết cục",`<b class="${x.k>0?"g":x.k<0?"r":""}">${x.tag}</b>`]]),toc:["done",`Chương ${x.n} · ${msName67(x)}`,x.tag]}});
  if(cur){cur.toc=["now",`Chương ${cur.kicker.replace(/^Chương /,"")} · ${cur.title}`,"đang làm"];sl.push(cur)}
  h+=`<div class="ktop"><span class="kchip n" data-chap="1">${ktEsc(Q0.t)}</span>${F?` <span class="kchip n" data-chap="1">Chương ${F.n}/${F.max} · ${ktEsc(F.part)}</span>`:""}${(()=>{const T=ktChapToc(),k=T?T.filter(x=>x[0]==="next").length:nx;return k?` <span class="kchip n" data-chap="1">còn ${F||T?"":"khoảng "}${k} chương</span>`:""})()}</div>`+
   (sl.length?kitSlide("story-now",sl,{cur:sl.length-1,tocAll:ktChapToc(),tocMore:nx?[["next",`Còn ${F?"":"khoảng "}${nx} chương nữa`,"chưa tới"]]:[]}):card)}
 else if(sub.cur==="rank"){
  if(S.rank>=7)h+=kitEmpty("Ta là Hoàng hậu, không còn bậc để lên",["Đưa con mình lên ngôi để thành Hoàng thái hậu."],{topic:"Sắc phong"});
  else if(S.out)h+=kitEmpty("Ta đang ở lãnh cung, chưa bàn chuyện sắc phong",[`Được minh oan thì phục vị ${RANKS[Math.max(0,Math.min(6,S.coldRank||0))].n} (hoặc thấp hơn một bậc).`],{topic:"Sắc phong"});
  else{const R=promoReq();const ok=R.filter(x=>x[0]).length;
   h+=kitSlide("story-rank",[{kicker:"Điều kiện sắc phong",title:RANKS[S.rank+1].n,sub:`Đạt ${ok}/${R.length}`,img:kitInfoArt("sắc phong").src||art,tap:"chapRankOpen",
    body:`<div class="ktop">${kitInfo("Ngôi Hoàng hậu")} <span class="kchip ${S.duc>=hhNeed(S).duc?"g":"r"}">Đức <b>${S.duc}/${hhNeed(S).duc}</b></span> ${typeof exChips==="function"?`${kitInfo("Khảo hạch tấn phong")} ${exChips()}`:`<span class="kchip n">đủ điều kiện: cuối tháng có thánh chỉ</span>`}</div>`}]);
   R.sort((a,b)=>a[0]-b[0]);/* KIT §51 (owner 11/15 17:27Z): the requirement list is ONE kit table (kitReqRows: label | ✓/✗ + numbers), unmet first */h+=kitReqRows(R)}}
 else{const R=[];
  past.forEach(x=>{let im=art;try{if(x.a&&typeof stArtOf==="function")im=stArtOf(x.a,null,null)||art}catch(e){}R.push({kicker:`Chương ${x.n}`,title:msName67(x),sub:x.tag,img:im,body:rows67([["Kết cục",`<b class="${x.k>0?"g":x.k<0?"r":""}">${x.tag}</b>`]]),toc:["done",`Chương ${x.n} · ${msName67(x)}`,x.tag]})});
  rare.forEach(x=>{const tt=ARC67[x.a]?ARC67[x.a].t:x.a;R.push({kicker:"Kết cục hiếm",title:tt,sub:x.tag,img:art,body:rows67([["Kết cục",x.ti&&x.ti!==x.tag?`${x.tag} · danh hiệu «${x.ti}»`:x.tag]]),toc:["done",`✦ ${tt}`,x.tag]})});
  h+=R.length?kitSlide("story-past",R,{cur:R.length-1,tocAll:ktChapToc()}):kitEmpty("Ta chưa qua chương nào",["Mỗi chương khép lại sẽ ghi vào đây."],{topic:"Mệnh truyện"})}
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
 const sub=kitSubTabs("q72",list,kitInfo("Việc nhờ"));
 let h=sub.html+`<div class="ktop"><span class="kchip n">Đang làm <b>${q.a.length}/${Q72CFG.max}</b></span> <span class="kchip n">Lời nhờ tháng này <b>${mo}/${Q72CFG.mo}</b></span> <span class="kchip g">Xong <b>${q.n.ok||0}</b></span> <span class="kchip r">Hỏng <b>${(q.n.fail||0)+(q.n.bad||0)}</b></span> <span class="kchip n">Từ chối <b>${q.n.dec||0}</b></span></div>`;
 if(sub.cur==="now"){if(q.a.length||q.h.length)h+=`<div class="pcb ktacts"><div class="kpanec">${ask}</div></div>`;
  const items=q.a.map((x,i)=>{const X=q72X(x);return{f:X?X.A.f:{ini:"?",col:"#888"},name:X?q72PgN(X.A):"",sep:i===0?"Đang làm":""}}).concat(q.h.slice(0,8).map((z,i)=>({f:z.f||{ini:"?",col:"#888"},name:z.pn||shortN(z.n||"?"),dim:true,sep:i===0?"Đã qua":""})));
  h+=items.length?`<div class="pgwrap">`+pager("q72",items,i=>i<q.a.length?q72Card(q.a[i]):q72HCard(q.h[i-q.a.length]))+`</div>`:kitEmptyTab("Chưa ai nhờ ta việc gì",["Người trong cung sẽ tìm đến khi cần.","Ta cũng có thể đến các nơi và hỏi han để nghe ai cần giúp."],{topic:"Việc nhờ"},ask)}
 else if(sub.cur==="debt"){
  if(calls.length)h+=`<h4 class="kpst">Họ nợ ngươi</h4><div class="ktpeople">${calls.map(x=>`<div class="ktprow">${ktPerson(x.a,`nợ ngươi ${x.n} ân`)}<div class="pcb kpanec">${x.btn}</div></div>`).join("")}</div>`;
  if(owe.length)h+=`<h4 class="kpst">Ngươi nợ họ</h4><div class="ktpeople">${owe.map(([k,v])=>`<div class="ktprow">${ktPersonK(k,(q.dn&&q.dn[k])||k,`ngươi nợ ${-v} ân · họ có thể nhờ lại`)}</div>`).join("")}</div>`;
  if(!calls.length&&!owe.length)h+=kitEmpty("Ta chưa nợ ai, ai chưa nợ ta",["Giúp xong một việc thì người nhờ nợ ta một ân.","Ta cũng có thể nhờ họ trả lại."],{topic:"Việc nhờ"})}
 else{h+=q.np.length?`<div class="ktpeople">${q.np.map(z=>{const v=RV(z.a);return `<div class="ktprow">${v?kitPersonLine(v,{sub:`${z.w} · ${z.t}`}):`<div class="kpl"><span class="kplt">${z.t}<small>${z.w}</small></span></div>`}</div>`}).join("")}</div>`:kitEmpty("Ta chưa nghe chuyện gì",["Chuyện trong cung dồn về đây khi người trong cung có việc cần nhờ."],{topic:"Việc nhờ"})}
 return h}
function ktPerson(a,what){const v=a&&a.id!=null&&typeof RV==="function"?RV(a.id):null;if(v&&v.name)return kitPersonLine(v,{sub:what});
 const f=a&&a.f||{ini:"?",col:KIT_ROLE.slate};return `<div class="kpl">${typeof mdH==="function"?mdH(f,"sm"):""}<span class="kplt"><b>${ktEsc(q72Short(a))}</b><small>${what}</small></span></div>`}
function ktPersonK(k,name,what){let v=null;try{const m=/^r(\d+)$/.exec(k)||/^(\d+)$/.exec(k);if(m)v=RV(+m[1])}catch(e){}if(v&&v.name)return kitPersonLine(v,{sub:what});return `<div class="kpl"><span class="kplt"><b>${ktEsc(name)}</b><small>${what}</small></span></div>`}
if(typeof q72HTML==="function")q72HTML=function(){return ktQ72HTML()};
(function(){const st=document.createElement("style");st.id="kit-tabs";st.textContent=`
.ktop{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 10px}
/* owner 24/11 (OD L1867): the info chips under a sub-tab bar stay FIXED with the bar (only the content below scrolls); top = bar height, set by ktPinTop */
.ksub+.ktop,.kpbar+.ktop{position:sticky;top:var(--ktt,40px);z-index:4;background:var(--panel,#f6ead6);padding:4px 0 6px;margin:0 0 6px}
/* the tab bar's trailing info slot: pinned to the RIGHT END of the bar (stays visible while the tabs scroll) */
.pctabs>.pctinfo{flex:0 0 auto;margin-left:auto;align-self:center;position:sticky;right:0;padding:0 2px 0 10px;background:var(--panel);white-space:nowrap}
.pctabs>.pctinfo .kgl{font-size:.82rem}
/* KIT RULE (review/kit-subtabs-overflow, K-Q2-1, laws 10+11): a kitSubTabs bar NEVER scrolls sideways and the ⓘ never covers a tab: when the tabs do not fit
   one line they WRAP to a 2nd row at the SAME fixed tab size (one size per tier; no shrinking, no clipping); ⓘ keeps the right end of the last row.
   Every kitSubTabs bar (.ktsub: Tài nghệ, Mệnh truyện, Việc nhờ, Ân oán pickers, outside Người nhà/Ra phố, kit page) = this one rule. */
html body :is(#panel,#kitpage) .kcattabs.ktsub{flex-wrap:wrap!important;overflow:visible!important;row-gap:4px}
html body :is(#panel,#kitpage) .kcattabs.ktsub>.pctinfo{position:static}
/* a section header row: title left, chips + ⓘ right, one line */
.ksech{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:4px 10px;margin:0 0 8px}.ksech .ksechr{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap}
.ktinfo .kgl{font-size:.82rem;color:var(--gold,#8a5a12);font-weight:600;cursor:pointer;border-bottom:1px dotted currentColor}
.kchecks{display:flex;flex-direction:column;gap:5px;margin:8px 0}
.kchk{display:flex;align-items:flex-start;gap:8px;font-size:.88rem;line-height:1.35}.kchk .kchm{flex:0 0 auto;width:1.2em;display:inline-flex;justify-content:center;font-size:1.05rem;line-height:1.2}.kchk .kchm.g{color:var(--good,#2d7a52)}.kchk .kchm.r{color:var(--bad,#c23b22)}.kchk .kchm .kmk{margin:0}
.kchk.y .kchkt{color:var(--dim,#6b5a44)}.kchk .kchm.w{color:var(--gold,#b8860b)}.kchk .kchm.m{color:var(--dim,#6b5a44)}.ksp-now .kchkt{font-weight:700}.ksp-next .kchkt,.ksp-done .kchkt{color:var(--dim,#6b5a44)}.ksteps .kchkt small{display:block;color:var(--dim,#6b5a44);font-size:.78rem}
/* .pcb.ktacts: p1 .pcb (auto-fill 168 px) sits in a later <style> (body) and won at equal specificity -> a lone act was 1/4 wide (reviewer r7) */
.ktacts,.pcb.ktacts{display:grid;grid-auto-rows:auto;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:6px;margin:0 0 10px}
.ktprow>.pcb.kpanec{grid-template-columns:minmax(0,1fr);grid-auto-rows:auto}
.ktpeople{display:flex;flex-direction:column;gap:6px;margin:0 0 10px}
.ktprow{display:grid;grid-template-columns:minmax(0,1fr);gap:6px;padding:8px;border:1px solid var(--line);border-radius:var(--k-rad,8px);background:var(--k-card,#fffaf0)}
/* kv:(min-width:700px) */.ktprow:has(.pcb){grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);align-items:center}
`;document.head.appendChild(st)})();
/* compact acts (KIT §43) after every panel render: the sub-tab click and the Mệnh truyện pane render through renderPanel, not render */
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{if(typeof kitActCompactOn==="function")kitActCompactOn($("panel"))}catch(e){}return r}})();

/* ktPinTop: the chip row (.ktop) right under a sub-tab bar (.ksub) sticks just below it: its top = the bar's real height */
(function(){let RO=null;const pin=()=>{try{document.querySelectorAll(".ksub+.ktop,.kpbar+.ktop").forEach(t=>{const b=t.previousElementSibling,h=b.offsetHeight;if(h>0)t.style.setProperty("--ktt",(h-1)+"px");/* the bar may not be laid out yet (0 px) or wrap to 2 rows later (Fold 755): follow its real height */if(window.ResizeObserver){if(!RO)RO=new ResizeObserver(()=>pin());if(!b.__ktro){b.__ktro=1;RO.observe(b)}}})}catch(e){}};window.addEventListener("resize",()=>pin());try{document.fonts&&document.fonts.ready.then(()=>pin())}catch(e){}
 try{const P=document.getElementById("panel");if(P){let r=0;new MutationObserver(()=>{if(r)return;r=requestAnimationFrame(()=>{r=0;pin()})}).observe(P,{childList:true,subtree:true})}}catch(e){}window.ktPinTop=pin})();
