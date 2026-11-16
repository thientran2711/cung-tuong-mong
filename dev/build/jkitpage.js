/* ================= jkitpage: TRANG MẪU KIT — the kit sample page (luật KIT TRƯỚC, owner 11/15 16:50Z; tabs-kit r7) =================
   Open the game with "#kit" at the end of the address (…/index.html#kit) or call kitSamplePage() in the console: a full-screen page shows
   every registered kit part drawn by the REAL kit functions (no copies), at the current screen size. Close = the kit ✕ or remove "#kit".
   Every new kit part adds its sample here in the same commit as its KIT.md section:
     KIT_SAMPLES.push({id:"§21", title:"kitSkillCard", html:()=>kitSkillCard({...})});
   Samples render inside .kpanel-like paper; act cards (pbtn) are normalised by j63 kaNorm and compacted by §43 like in the game. */
const KIT_SAMPLES=[];window.KIT_SAMPLES=KIT_SAMPLES;
function kitSamplePage(){try{let pg=document.getElementById("kitpage");if(!pg){pg=document.createElement("div");pg.id="kitpage";pg.setAttribute("role","dialog");pg.setAttribute("aria-label","Trang mẫu kit");document.body.appendChild(pg)}
 pg.innerHTML=`<div class="kitpg-h"><b>Trang mẫu kit</b><small>${KIT_SAMPLES.length} thành phần · dev/kit/KIT.md</small><button type="button" class="kitpg-x" aria-label="Đóng">✕</button></div>`+
  KIT_SAMPLES.map(x=>{let h="";try{h=x.html()}catch(e){h=`<em class="r">lỗi: ${String(e.message||e).slice(0,80)}</em>`}
   return `<section class="kitpg-s" data-kit="${x.id}"><h4 class="kpst">${x.id} · ${x.title}</h4><div class="kitpg-b">${h}</div></section>`}).join("");
 pg.hidden=false;pg.querySelector(".kitpg-x").onclick=()=>{pg.hidden=true;if(location.hash==="#kit")history.replaceState(null,"",location.pathname+location.search)};
 try{if(typeof kitFix==="function")kitFix(pg);if(typeof kaNorm==="function")kaNorm(pg.querySelector(".kitpg-ev")||pg);if(typeof kitActCompactOn==="function")kitActCompactOn(pg)}catch(e){}return pg}catch(e){console.error("kitSamplePage",e)}}
window.kitSamplePage=kitSamplePage;
addEventListener("hashchange",()=>{if(location.hash==="#kit")kitSamplePage()});
if(location.hash==="#kit")setTimeout(kitSamplePage,1200);
/* samples of the parts added / changed by tabs-kit r7 (§21, §28.19 thumb, §43 compact acts, §45 pane bar, §46 tab parts) */
KIT_SAMPLES.push(
 {id:"§28.19",title:"kitSceneArt: wide · tall · thumb",html:()=>`<div class="kitpg-row"><div style="width:220px">${kitSceneArt(kitInfoArt("sắc phong").src,"Rộng 16:9",{shape:"wide"})}</div><div style="width:120px">${kitSceneArt(kitSkillArt("vir","cong","Công"),"Cao 3:4",{shape:"tall"})}</div>${kitSceneArt(kitSkillArt("art","cam","Cầm"),"Nhỏ",{shape:"tall",size:"thumb",cap:false})}</div>`},
 {id:"§21",title:"kitSkillCard: môn (có việc), chương, trống",html:()=>`<div class="kskills">`+
  kitSkillCard({kind:"art",k:"cam",name:"Cầm",level:2,max:5,prog:[1,4],desc:"Tài: thơ, đàn, thi tài",next:"Tài +2",stepsAttr:'data-v85tab="cam"',
   acts:[pbtn('data-kitsample="1"',"Tự học","Chắc chắn · tốn: 2 khắc, Sức -15 · thành: tiến bộ +1..2",""),pbtn('data-kitsample="2"',"Học với thầy","Chắc chắn · tốn: 2 khắc, Bạc -15 · thành: tiến bộ +1..3","thiếu bạc (cần 15)")]})+
  kitSkillCard({kind:"story",k:"x",kicker:"Chương 2",name:"Tên chương",level:1,max:4,word:"Hồi",bar:false,next:"",img:kitInfoArt("Mệnh truyện").src})+
  kitEmpty("Việc nhờ","Chưa ai nhờ ngươi việc gì.")+`</div>`},
 {id:"§46",title:"kitChecks · kitInfo",html:()=>kitChecks([[false,"Sủng 8 (cần 38)"],[true,"Danh 33 (cần 30)"]])+(typeof kitInfo==="function"?kitInfo("Việc nhờ"):"")},
 {id:"§43",title:"Việc gọn (cột hẹp, kpanec)",html:()=>`<div class="pcb ktacts"><div class="kpanec">${pbtn('data-kitsample="3"',"Hỏi han ở tẩm cung ta: ai cần giúp?","tốn: 1 khắc · thành: người ở đây có việc thì ngỏ lời nhờ","")}</div></div>`});
/* KIT §51 kit table (review/kit-table): kitRows (one label column per table, values at one x), kitRowsJoin, kitReqRows, relation chip */
KIT_SAMPLES.push(
 {id:"§51",title:"kitRows · bảng kit (nhãn dài xuống dòng, giá trị thẳng một cột)",html:()=>kitRows([["Đêm thị tẩm vui",["Trâm ngọc bích, Túi thơm",kitChip("Bạc",20,"g")],"t"],["Sinh hoàng tử",["Ngọc bội ngự ban",kitChip("Bạc",30,"g")],"t"],["Tiết Vạn thọ (tháng 8, người được sủng nhất)","Vòng ngọc","t"],["Chưa biết","chưa rõ","n"]])},
 {id:"§51",title:"kitRowsJoin · hai bảng nối thành một",html:()=>kitRowsJoin(kitRows([["Giá",kitChip("Bạc",-40,"r"),"t"]]),kitRows([["Phẩm","Thượng phẩm","t"],["Dùng để","dâng, tặng, bày ở yến tiệc","t"]]))},
 {id:"§51",title:"kitReqRows · điều kiện (✓/✗)",html:()=>kitReqRows([[false,"Sủng 8 (cần 15)"],[true,"Ghế Phi: còn chỗ"],[false,"Hoàng hậu không chặn (Hoàng hậu -5)"],[true,"Đã qua một mùa ở phẩm này"]])},
 {id:"§51",title:"kitChip(kitRel(...)) · chip quan hệ trong câu luật",html:()=>`<p>mỗi lần: ${kitChip(kitRel("them","phi tần khác ghen ta"),3,"r")}</p>`});
/* kit-fig2 parts (review r6): §48 kitNameRank, §49.1 kitRelRow (§50 kitEventDp is a live dialog: see dev/test/event-dp.js) */
KIT_SAMPLES.push(
 {id:"§48",title:"kitNameRank: phẩm + tên trên hình",html:()=>`<div class="kitpg-row">${kitNameRank("Quý nhân","Khương Mạn Châu","#3f62a8")}${kitNameRank("Đáp ứng","Trịnh Ngọc Hành","#9c8f74")}${kitNameRank("","Hoàng thượng","#b08a2a")}</div>`},
 {id:"§48.1",title:"Danh hiệu phẩm (kitRankTone): mọi phẩm · nền sáng, nền tối, cảnh",html:()=>{const L=[["Đáp ứng","Trịnh Ngọc Hành"],["Thường tại","Lâm Uyển"],["Quý nhân","Khương Mạn Châu"],["Tần","Tô Vân"],["Phi","Mộ Dung Yên"],["Quý phi","Hàn Hồng Diệp"],["Hoàng quý phi","Thẩm Khinh Vũ"],["Hoàng hậu","Phó Thanh"],["Phế phi · lãnh cung","Lục Ca"],["Thái hậu","Thái hậu"],["Hoàng thượng","Hoàng thượng"],["Cung nữ thô sử","Tiểu Đào"],["Cung nữ","Hồng Ngọc"],["Đại cung nữ","Thanh Trúc"],["Chưởng sự cô cô","Tần cô cô"],["Nữ quan","Bạch Lộ"],["Ma ma","Quế ma ma"],["Tiểu thái giám","Tiểu Lộc"],["Thái giám","Phúc An"],["Thủ lĩnh thái giám","Lý Trung"],["Tổng quản thái giám","Lý Liên Anh"],["Thái y","Thẩm Minh"],["Thị vệ","Mạc Thừa Vũ"],["Lễ bộ thượng thư","Vương Tuấn"],["Hoàng tử","Dận Hữu"],["Công chúa","Minh Châu"],["Người lạ","???"]];
  const row=cls=>`<div class="kitpg-row ${cls}" style="padding:10px;border-radius:8px;${cls==="krs"?"background:linear-gradient(#26304a,#121624)":"background:#fbf3e2"}">${L.map(([r,n])=>kitNameRank(r,r===n?"":n)).join("")}</div>`;
  const me=cls=>`<div class="kitpg-row ${cls}" style="margin-top:8px;padding:10px;border-radius:8px;${cls==="krs"?"background:linear-gradient(#26304a,#121624)":"background:#fbf3e2"}">${kitNameRank("Tần","Tên của nàng (48.1b)","",true)}${kitNameRank("Tần","Người khác","")}</div>`;
  return row("")+`<div style="height:8px"></div>`+row("krs")+me("")+me("krs")}},
 {id:"§49.1",title:"kitRelRow: thiện cảm · oán · sủng · chưa rõ",html:()=>`<div style="max-width:320px">${kitRelRow({kind:"quy",a:"Hoàng hậu",b:"ta",v:-24})}${kitRelRow({kind:"oan",a:"Ta",b:"Hoàng hậu",v:12})}${kitRelRow({kind:"pos",a:"Hoàng thượng",b:"ta",what:"sủng",gloss:"Sủng",v:41})}${kitRelRow({kind:"quy",a:"Tô Lan Chi",b:"Ôn Ngưng Sương",v:null})}</div>`});
/* §53 (KIT 28.6 event options + §7 result card parts) (review/opt-render, moved here by reviewer r7 — ONE kit sample page). The event option is the
   game's own modal option markup (button.opt + dilLine) run through kaNorm → kitHideOut (data-khide), so hint + risk come from the real kitHint. */
function kitPgEvOpts(){const W=o=>typeof word==="function"?word(o):"Khó lường";const O=[{n:"Gói bánh ú dâng Thái hậu",fx:{suc:-5,th:4},x:"Thái hậu thiện cảm +4"},
  {n:"Xin ân cho gia đình",fx:{},x:`${W(55)} · thành: Danh +3, Bạc +40 · hỏng: Sủng -4`},
  {n:"Theo cha mưu đại sự",fx:{},x:`${W(20)} · thành: Hoàng hậu bị phế, Danh +10 · hỏng: cả họ bị tru di`}];
 return `<div class="opts kitpg-ev">${O.map((c,i)=>`<button class="opt" data-m="${i}" data-khide="1" data-kitsample="ev${i}">${c.n}<small>${typeof dilLine==="function"?dilLine(c):c.x}</small></button>`).join("")}</div>`}
function kitPgSeals(){const s=ok=>{const r=kitResultSeal(ok);return `<span class="rtoast karesult ${r.cls}"><b class="seal">${r.t}</b></span>`};return `<div class="kitpg-row kitpg-seal">${s(true)}${s(false)}${s(null)}</div>`}
function kitPgKem(){let L=[];try{L=liveRivals(true).slice(0,3)}catch(e){}if(!L.length)L=[{name:"Phi tần A"},{name:"Phi tần B"}];
 return `<span class="kb" onclick="const k=event.target.closest('.kkem');if(k)k.classList.toggle('on')">${kitKemRow(L.map((v,i)=>({v,k:"ghen",d:4+i*2})))}</span>`}
KIT_SAMPLES.push(
 {id:"§53",title:"kitChip tones · kitRisk",html:()=>`<p>${kitChip("Sủng",3)}${kitChip("Danh",-2)}${kitChip("Thường","n")}${kitChip("có rủi ro","w")}${kitChip("đủ Sức","ok")}${kitChip("thiếu bạc","no")}</p><p>${kitRisk("an toàn")}${kitRisk("có rủi ro")}${kitRisk("liều")}</p>`},
 {id:"§53",title:"Event option in cost mode: Tốn + kitHintRow + kitRisk (no Tốn when free)",html:kitPgEvOpts},
 {id:"§53",title:"kitResultSeal: THÀNH · HỎNG · KẾT QUẢ",html:kitPgSeals},
 {id:"§53",title:"kitKemRow (tap for names)",html:kitPgKem});
/* §27.1 the Tuần lục cover title picture (review/book-title): the real cover label slot of kitBook, at a fixed small size */
KIT_SAMPLES.push({id:"§27.1",title:"KBK_TITLE_IMG: tên sổ viết tay trên nhãn bìa (ấn Trân nữ)",html:()=>typeof KBK_TITLE_IMG==="undefined"?"":
 `<div class="kitpg-row">${Object.entries(KBK_TITLE_IMG).map(([t,u])=>`<div class="kitpg-bkl"><img src="${u}" alt="${t}"></div>`).join("")}</div>`});
(function(){const st=document.createElement("style");st.id="kit-page";st.textContent=`
#kitpage{position:fixed;inset:0;z-index:2147483000;overflow:auto;background:var(--panel,#fffaf0);padding:0 16px 24px;color:var(--ink)}
#kitpage[hidden]{display:none}
.kitpg-h{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 0;background:var(--panel,#fffaf0);border-bottom:1px solid var(--k-hair,#e6d3ac)}
.kitpg-h b{font-family:var(--display,serif);color:var(--gold);font-size:1.1rem}.kitpg-h small{color:var(--dim);flex:1}
.kitpg-x{min-width:44px;min-height:44px;border:1px solid var(--line);border-radius:var(--k-rad,8px);background:var(--k-card,#fffaf0);font-size:1.1rem;cursor:pointer}
.kitpg-s{margin:14px 0}.kitpg-b{padding:10px;border:1px dashed var(--k-hair,#e6d3ac);border-radius:var(--k-rad,8px)}
.kitpg-row{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}
.kitpg-seal .rtoast.karesult{position:static;transform:none;opacity:1;display:inline-flex;padding:4px 8px}
/* review/small-bugs-3: every sample is its own stacking layer under the sticky page header (z 2) — a sample built from a floating part (the
   result card seals, z 45; stamps; pills) never draws over the header */
.kitpg-s{position:relative;z-index:0;isolation:isolate}
.kitpg-bkl{width:64px;height:400px;padding:0;background:linear-gradient(#efe2c4,#e3d1aa);border:2px solid #6b5a44;outline:1px solid #6b5a44;outline-offset:-6px}
.kitpg-bkl img{display:block;width:calc(100% - 12px);height:calc(100% - 20px);margin:10px auto 0;object-fit:contain;object-position:50% 0}
`;document.head.appendChild(st)})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kitsample]");if(b){e.stopPropagation();e.preventDefault()}},true);
/* §32.1 / §32.12 the top bar's stat row (owner 15/11 ~17:50Z: LEFT Sắc · Tài · Tâm cơ · Đức · Danh · Sủng | RIGHT Bạc · Sức), review/header-danh */
KIT_SAMPLES.push({id:"§32.1",title:"kitStatRow: thanh đầu trang (trái 6 | phải 2)",html:()=>{const c=(k,ic,l,v,b)=>kitStatCell("img/"+ic+".webp",l,v,{k,bar:b==null?null:b,title:l+" "+v+" · chạm để xem đủ"});
 return kitStatRow([{cells:[c("sac","sac","Sắc",51),c("tai","tai","Tài",87),c("tamco","tam-co","Tâm cơ",12),c("duc","duc","Đức",40),c("danh","danh","Danh",14,14),c("sung","sung","Sủng",22,22)]},{cells:[c("bac","bac","Bạc",120),c("suc","suc","Sức",90,90)]}])}});
/* §28.0 / §28.1 portrait frame cell (review/tassel-fix, owner 15/11 06:35Z): the whole frame canvas 550x1037 — crest, photo window, band,
   jade pendant + tassel — in the person-card cell (.pc>.pcl>.pcp.kit, width --kpcw) and in every small frame mdH (xs 26 · sm 38 · 60 · big 84 px
   wide), tops on one line; a list row (xs frame + text) as in Sổ ghi / Tuần lục / gift recipients. */
KIT_SAMPLES.push({id:"§28.1",title:"pcPort · mdH: khung chân dung đủ ngọc bội + tua rua",html:()=>{
 /* review/small-bugs-3: the kit page opens before any game (#kit, no S): sample people are the kit's soft silhouettes, never pMe()/pEmp() */
 const live=typeof S!=="undefined"&&S&&S.emp&&S.name;const sf=(rk,rw,ini,src,col)=>({rk,rw,w:[rk],src,hue:0,ini,col});
 const me=live?pMe():sf("c3","Quý nhân","Ta","img/kit/unknown-f.webp","#c9a0e0"),em=live?pEmp():sf("emp","Hoàng thượng","Đế","img/kit/unknown-m.webp","#f0d070"),th=live?pTH():sf("th","Thái hậu","Từ","img/kit/unknown-f.webp","#c9a0e0");
 const v=live&&typeof rivals!=="undefined"?rivals.filter(x=>x.alive)[0]:null;const pv0=v?pv(v):me;
 return `<div class="kitpg-row" style="align-items:flex-start"><div class="pc" style="overflow:visible;max-width:240px"><div class="pcl">${pcPort(me)}</div></div>`+
  `<div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap">${mdH(em,"xs")}${mdH(th,"sm")}${mdH(pv0,"")}${mdH(me,"big")}</div></div>`+
  `<div class="pcb rows" style="max-width:360px">${[em,pv0,me].map(f=>`<div class="pcrow"><span>${mdH(f,"xs")} ${f.rw||""}: dòng tin mẫu</span></div>`).join("")}</div>`}});

/* §28.19b corner mark (review/mood-dialog) */
KIT_SAMPLES.push({id:"§28.19b",title:"kitSceneArt o.mark: dấu tâm trạng ở góc tranh",html:()=>`<div class="kitpg-row">${[["vui","img/ev-mood-vui.webp","Vui"],["lo","img/ev-tan-phong.webp","Khương Lạc Anh được tấn phong"],["m-gian","img/ev-mood-gian.webp","Giận"],["an","img/ev-mood-an.webp","Chưa rõ lòng người"]].map(([k,src,lab])=>`<div style="width:220px">${kitSceneArt(src,lab,{shape:"wide",mark:`img/kit/emo-${k}.webp`,markAlt:lab})}</div>`).join("")}</div>`});
