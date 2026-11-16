/* ================= jkitpage: TRANG MẪU KIT — the kit sample page (luật KIT TRƯỚC, owner 11/15 16:50Z; tabs-kit r7) =================
   Open the game with "#kit" at the end of the address (…/index.html#kit) or call kitSamplePage() in the console: a full-screen page shows
   every registered kit part drawn by the REAL kit functions (no copies), at the current screen size. Close = the kit ✕ or remove "#kit".
   Every new kit part adds its sample here in the same commit as its KIT.md section:
     KIT_SAMPLES.push({id:"§21", title:"kitSkillCard", html:()=>kitSkillCard({...})});
   Samples render inside .kpanel-like paper; act cards (pbtn) are normalised by j63 kaNorm and compacted by §43 like in the game. */
const KIT_SAMPLES=[];/* a real painting behind the "on a painting" sample rows (glow reads on a painting, not on a flat colour) */
function KP_PAINT(){let u="";try{u=kitInfoArt("Mệnh truyện").src}catch(e){}return u?`background:linear-gradient(#0008,#0008),url(${u}) center/cover`:"background:linear-gradient(#26304a,#121624)"}window.KIT_SAMPLES=KIT_SAMPLES;
function kitSamplePage(){try{let pg=document.getElementById("kitpage");if(!pg){pg=document.createElement("div");pg.id="kitpage";pg.setAttribute("role","dialog");pg.setAttribute("aria-label","Trang mẫu kit");document.body.appendChild(pg)}
 pg.innerHTML=`<div class="kitpg-h"><b>Trang mẫu kit</b><small>${KIT_SAMPLES.length} thành phần · dev/kit/KIT.md</small><button type="button" class="kitpg-x" aria-label="Đóng">✕</button></div>`+
  KIT_SAMPLES.map(x=>{let h="";try{h=x.html()}catch(e){h=(typeof S==="undefined"||!S)?`<em class="kitpg-nog">Mẫu này đọc dữ liệu của ván đang chơi: mở trang mẫu (#kit) sau khi đã vào game.</em>`:`<em class="r">lỗi: ${String(e.message||e).slice(0,80)}</em>`}
   return `<section class="kitpg-s" data-kit="${x.id}"><h4 class="kpst">${x.id} · ${x.title}</h4>${x.where?`<p class="kitpg-w">${x.where}</p>`:""}<div class="kitpg-b">${h}</div></section>`}).join("");
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
   acts:[pbtn('data-kitsample="1"',"Tự học","Chắc chắn · tốn: 2 khắc, Sức -15 · thành: tiến bộ một hai phần",""),pbtn('data-kitsample="2"',"Học với thầy","Chắc chắn · tốn: 2 khắc, Bạc -15 · thành: tiến bộ một đến ba phần","thiếu bạc (cần 15)")]})+
  kitSkillCard({kind:"story",k:"x",kicker:"Chương 2",name:"Tên chương",level:1,max:4,word:"Hồi",bar:false,next:"",img:kitInfoArt("Mệnh truyện").src})+
  kitEmpty("Việc nhờ","Chưa ai nhờ ngươi việc gì.")+`</div>`},
 {id:"§46",title:"kitChecks · kitInfo",html:()=>kitChecks([[false,"Sủng 8 (cần 38)"],[true,"Danh 33 (cần 30)"]])+(typeof kitInfo==="function"?kitInfo("Việc nhờ"):"")},
 {id:"§43",title:"Việc gọn (cột hẹp, kpanec)",html:()=>`<div class="pcb ktacts"><div class="kpanec">${pbtn('data-kitsample="3"',"Hỏi han ở tẩm cung ta: ai cần giúp?","tốn: 1 khắc · thành: người ở đây có việc thì ngỏ lời nhờ","")}</div></div>`},
 {id:"§43.1",title:"Việc gọn: dấu ! mở chi tiết (kitActZoom)",html:()=>`<div class="pcb ktacts"><div class="kpanec">${pbtn('data-kitsample="3"',"Hỏi han ở tẩm cung ta: ai cần giúp?","tốn: 1 khắc · thành: người ở đây có việc thì ngỏ lời nhờ","")}</div></div>`});
/* KIT §51 kit table (review/kit-table): kitRows (one label column per table, values at one x), kitRowsJoin, kitReqRows, relation chip */
KIT_SAMPLES.push(
 {id:"§51",title:"kitRows · bảng kit (nhãn dài xuống dòng, giá trị thẳng một cột)",html:()=>kitRows([["Đêm thị tẩm vui",["Trâm ngọc bích, Túi thơm",kitChip("Bạc",20,"g")],"t"],["Sinh hoàng tử",["Ngọc bội ngự ban",kitChip("Bạc",30,"g")],"t"],["Tiết Vạn thọ (tháng 8, người được sủng nhất)","Vòng ngọc","t"],["Chưa biết","chưa rõ","n"]])},
 {id:"§51",title:"kitRowsJoin · hai bảng nối thành một",html:()=>kitRowsJoin(kitRows([["Giá",kitChip("Bạc",-40,"r"),"t"]]),kitRows([["Phẩm","Thượng phẩm","t"],["Dùng để","dâng, tặng, bày ở yến tiệc","t"]]))},
 {id:"§51.1",title:"kitRowsAlign · một khối một cột nhãn (mục không tiêu đề nối vào bảng trên)",html:()=>{const d=document.createElement("div");d.innerHTML=`<div class="kpsec"><h4 class="kpst">Đang tác động</h4>${kitRows([["Lo âu","Khương Lạc Anh được tấn phong · 2 tuần trước","r"]])}</div><div class="kpsec">${kitRows([["Ảnh hưởng","vui thì dễ chịu nghe, giận hay ghen thì khó nói chuyện, dễ ra tay hơn"]])}</div>`;kitRowsAlign(d);return d.innerHTML}},
 {id:"§51",title:"kitReqRows · điều kiện (✓/✗)",html:()=>kitReqRows([[false,"Sủng 8 (cần 15)"],[true,"Ghế Phi: còn chỗ"],[false,"Hoàng hậu không chặn (Hoàng hậu -5)"],[true,"Đã qua một mùa ở phẩm này"]])},
 {id:"§51",title:"kitChip(kitRel(...)) · chip quan hệ trong câu luật",html:()=>`<p>mỗi lần: ${kitChip(kitRel("them","phi tần khác ghen ta"),3,"r")}</p>`});
/* kit-fig2 parts (review r6): §48 kitNameRank, §49.1 kitRelRow (§50 kitEventDp is a live dialog: see dev/test/event-dp.js) */
KIT_SAMPLES.push(
 {id:"§48",title:"kitNameRank: phẩm + tên trên hình",html:()=>`<div class="kitpg-row">${kitNameRank("Quý nhân","Khương Mạn Châu",kitRankCol(2))}${kitNameRank("Đáp ứng","Trịnh Ngọc Hành",kitRankCol(0))}${kitNameRank("","Hoàng thượng",KIT_ROLE.emp)}</div>`},
 {id:"§1.3",title:"Bảng màu phẩm DUY NHẤT (RCOL · MRCOL · ERCOL · lãnh cung): màu gốc tươi + màu chữ trên giấy (kitToneOf) + hàng chọn",html:()=>{
  const S3=[["Đáp ứng",RCOL[0]],["Thường tại",RCOL[1]],["Quý nhân",RCOL[2]],["Tần",RCOL[3]],["Phi",RCOL[4]],["Quý phi",RCOL[5]],["Hoàng quý phi",RCOL[6]],["Hoàng hậu",RCOL[7]],["Lãnh cung",RCOL_COLD],
   ["Thô sử",MRCOL[0]],["Cung nữ",MRCOL[1]],["Đại cung nữ",MRCOL[2]],["Chưởng sự cô cô",MRCOL[3]],["Nữ quan",MRCOL[4]],["Tiểu thái giám",ERCOL[0]],["Thái giám",ERCOL[1]],["Thủ lĩnh",ERCOL[2]],["Tổng quản",ERCOL[3]]];
  const sw=([n,c])=>`<span style="display:inline-flex;align-items:center;gap:6px;margin:3px 10px 3px 0"><i class="rk-swatch" style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${c};border:2px solid #fff;box-shadow:0 0 0 1px ${c}"></i><b class="kname"><span class="kti" style="--rt:${kitToneOf(c)}">${n}</span></b></span>`;
  return `<div style="padding:10px;border-radius:8px;background:#fbf3e2">${S3.map(sw).join("")}</div><div style="padding:10px;margin-top:8px;border-radius:8px;background:#fbf3e2">${RCOL.map((c,i)=>`<span class="md rk-c${i}" style="display:inline-block;width:34px;height:34px;border-radius:50%;margin:2px 6px 2px 0;border:2px solid;--c:${c}"></span>`).join("")}</div>`}},
 {id:"§48.1",title:"Danh hiệu phẩm (kitRankTone): mọi phẩm · nền sáng, nền tối, cảnh",html:()=>{const L=[["Đáp ứng","Trịnh Ngọc Hành"],["Thường tại","Lâm Uyển"],["Quý nhân","Khương Mạn Châu"],["Tần","Tô Vân"],["Phi","Mộ Dung Yên"],["Quý phi","Hàn Hồng Diệp"],["Hoàng quý phi","Thẩm Khinh Vũ"],["Hoàng hậu","Phó Thanh"],["Phế phi · lãnh cung","Lục Ca"],["Thái hậu","Thái hậu"],["Hoàng thượng","Hoàng thượng"],["Cung nữ thô sử","Tiểu Đào"],["Cung nữ","Hồng Ngọc"],["Đại cung nữ","Thanh Trúc"],["Chưởng sự cô cô","Tần cô cô"],["Nữ quan","Bạch Lộ"],["Ma ma","Quế ma ma"],["Tiểu thái giám","Tiểu Lộc"],["Thái giám","Phúc An"],["Thủ lĩnh thái giám","Lý Trung"],["Tổng quản thái giám","Lý Liên Anh"],["Thái y","Thẩm Minh"],["Thị vệ","Mạc Thừa Vũ"],["Lễ bộ thượng thư","Vương Tuấn"],["Hoàng tử","Dận Hữu"],["Công chúa","Minh Châu"],["Người lạ","???"]];
  const row=cls=>`<div class="kitpg-row ${cls}" style="padding:10px;border-radius:8px;${cls==="krs"?KP_PAINT():"background:#fbf3e2"}">${L.map(([r,n])=>kitNameRank(r,r===n?"":n)).join("")}</div>`;
  const me=cls=>`<div class="kitpg-row ${cls}" style="margin-top:8px;padding:10px;border-radius:8px;${cls==="krs"?KP_PAINT():"background:#fbf3e2"}">${kitNameRank("Tần","Tên của nàng (48.1b)","",true)}${kitNameRank("Tần","Người khác","")}</div>`;
  const night=`<div class="modal night" style="position:static;display:block;background:none;margin-top:8px"><div class="kitpg-row" style="padding:10px;border-radius:8px;background:#140b08">${L.map(([r,n])=>kitNameRank(r,r===n?"":n)).join("")}</div></div>`;
  /* rows: 1 paper · 2 a PAINTING (stage rule: rank tone + glow, name ink + gold glow) · 3 night panel (plain lightened tone, no glow) */
  return `<p class="kitpg-w"><b>Giấy / khung</b> (chữ thường, không viền) · <b>Tranh</b> (phẩm + tên phát sáng) · <b>Khung đêm</b> (chữ sáng thường)</p>`+row("")+`<div style="height:8px"></div>`+row("krs")+night+me("")+me("krs")}},
 {id:"§48.3",title:"Phẩm + tên trong dòng chữ (kitRankNameH / kitRankPaint): hàng chọn người, nhật ký · nền sáng, nền tối",html:()=>{const P=[["Hoàng hậu","Chu Thục Nghi",kitRankCol(7)],["Quý phi","Tần Kiều Nguyệt",kitRankCol(5)],["Phi","Hạ Tố Tâm",kitRankCol(4)],["Thường tại","Lâm Uyển",kitRankCol(1)],["Cung nữ thân tín","Ngọc Lan",MRCOL[1]]];
  const nm=([t,n,c])=>`<b class="kname" style="--rc:${c}"><span class="kti" style="--rt:${kitRankTone(t,c)}">${t}</span> ${n}</b>`;
  const box=(cls,bg)=>`<div class="${cls}" style="padding:10px;border-radius:8px;background:${bg}">${P.slice(0,3).map(x=>`<div style="padding:6px 8px;margin:4px 0;border:1px solid #c9a46a66;border-radius:6px">${nm(x)}</div>`).join("")}<p style="margin:6px 0 0">${nm(P[4])} nghe lén được chuyện của ${nm(P[1])}; ${nm(P[3])} được ban thưởng.</p></div>`;
  return box("","#fbf3e2")+`<div class="modal night" style="position:static;display:block;background:none;margin-top:8px">${box("","#140b08;color:#f3e6cf")}</div>`}},
 {id:"§49.1",title:"kitRel2 · quan hệ hai cột (Ân oán: hai người · Hoàng thượng · chưa rõ)",where:"<b>Ân oán</b> (pair view), Gia tộc card, every place that shows how two people stand. LEFT box = that person → me, RIGHT box = me → that person. Short words, number in its colour, no bars.",html:()=>`<div style="max-width:360px">${kitRel2([{head:"Hoàng hậu → ta",dir:"them",rows:[{w:"Thiện cảm",now:-24,kind:"good"},{w:"Oán",now:12,kind:"bad"}]},{head:"Ta → Hoàng hậu",dir:"me",rows:[{w:"Thiện cảm",now:41,kind:"good"},{w:"Oán",unk:"chưa rõ"}]}])}${kitRel2([{head:"Hoàng thượng → ta",dir:"them",rows:[{w:"Sủng",now:42,kind:"pos"},{w:"Ân tình",now:5,kind:"pos"}]}])}${kitRel2([{head:"Tô Lan Chi → Ôn Ngưng Sương",dir:"x",rows:[{w:"Thiện cảm",unk:"chưa rõ"}]}])}</div>`});/* §53 (KIT 28.6 event options + §7 result card parts) (review/opt-render, moved here by reviewer r7 — ONE kit sample page). The event option is the
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
.kitpg-w{margin:2px 0 6px;font-size:.78rem;color:var(--k-lab,#8a7350)}.kitpg-w b{color:var(--ink)}
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

/* §8 PANEL KIT — the ONE pop-up frame (review/kit-popup-sample, owner 11/15 "cho xem kit pop-up"): the kit page cannot draw #modal inline
   (one modal, fixed, above the game), so this sample lists the variants and each button opens the REAL pop-up with kitModal (same data
   path as the game: kpBuild + kitEventStage + kitEvArt + kitDlgFit); the kit page hides while it is open and comes back on close.
   Variants: ĐIỀU info about a person · LUẬT rule with its small 3:4 picture slot · VIỆC event (stage figure column + scene band + act-card
   options) · KẾT QUẢ result · TIN news without a person (picture in its type frame, 32.3). Real sample people: Thái hậu, Hoàng hậu. */
function kitPopSample(k){try{if(typeof S==="undefined"||!S||typeof kitModal!=="function")return false;
 const R=typeof liveRivals==="function"?liveRivals(true):[];const qp=typeof queenP==="function"?queenP():null;
 const q=(qp&&qp!==S?qp:null)||R.find(v=>v.queen)||R[0]||null;const v2=R.find(v=>v!==q)||q;const nop=()=>{};
 const pg=document.getElementById("kitpage");const was=!!(pg&&!pg.hidden);const back=()=>{if(was)pg.hidden=false};
 if(typeof Q!=="undefined"&&Q.length)return false;if(pg)pg.hidden=true;
 const S0={
  info:{kind:"info",title:"Thái hậu",sub:"Từ Ninh cung",subject:pTH(),facts:["Thái hậu là mẹ của Hoàng thượng, đứng đầu hậu cung.","Người trọng lễ nghi, ghét kẻ phô trương."],
   sections:[{h:"Lòng người với ta",chips:[kitChip("Thiện cảm",12),kitChip("Đức",3)]},{h:"Cách lấy lòng",rows:[["Thỉnh an mỗi tuần",kitChip("Thiện cảm",2),"t"],["Dâng kinh chép tay",kitChip("Thiện cảm",5),"t"]]}],btn:"Đã hiểu"},
  rule:{kind:"rule",title:"Bổng lộc",facts:["Mỗi tháng Nội vụ phủ phát bổng lộc theo phẩm vị.","Phẩm càng cao, bạc càng nhiều."],rows:[["Thường tại",kitChip("Bạc",20,"g"),"t"],["Quý nhân",kitChip("Bạc",40,"g"),"t"]],btn:"Đã hiểu"},
  event:q&&{kind:"choice",title:"Hoàng hậu triệu kiến",sub:"Thượng tuần · buổi sáng",subject:q,facts:[{who:q,text:"cho gọi ta đến Khôn Ninh cung, hỏi chuyện đêm qua ta được lật thẻ bài."}],
   opts:[{n:"Cúi đầu nhận lỗi",fx:{duc:2},x:"Chắc · nàng thiện cảm +5 · Sủng -1",go:nop},{n:"Thưa rằng do Hoàng thượng định",fx:{danh:1},x:"Năm ăn năm thua · thành: Danh +2 · hỏng: nàng oán +8",go:nop},{n:"Dâng lễ vật xin bỏ qua",fx:{bac:-20},x:"Khá chắc · Bạc -20 · nàng thiện cảm +8",go:nop}]},
  result:q&&{kind:"result",title:"Kết quả: Thỉnh an Hoàng hậu",sub:"Thượng tuần · buổi sáng",subject:q,facts:[{who:q,text:"hài lòng vì ta giữ lễ.",chips:[["Thiện cảm",5]]},{who:S,kind:"me",text:"được tiếng hiền thục trong cung.",chips:[["Đức",2],["Sức",-10]]}],btn:"Đã hiểu"},
  long:{kind:"choice",title:"Việc dài lời kể",sub:"Thượng tuần · buổi sáng",facts:Array.from({length:9},(_,i)=>"Lời kể số "+(i+1)+": người trong cung kể rằng chuyện này kéo dài suốt cả buổi, hết người này đến người khác đến thưa, nên khung phải cuộn phần chữ mà giữ nguyên tiêu đề, tranh và các lựa chọn."),
   opts:[{n:"Nghe hết rồi mới định",fx:{duc:1},x:"Chắc · Đức +1",go:nop},{n:"Cho lui, để mai bàn",fx:{},x:"Chắc",go:nop}]},
  news:{kind:"news",title:"Tin trong cung",sub:"Tháng 3 · Năm 1",facts:[v2?{who:v2,text:"được lật thẻ bài đêm qua",chips:[["Sủng",3]]}:"Đêm qua Hoàng thượng lật thẻ bài.","Tháng này: Được mùa khắp nơi. Kho lúa +12."],btn:"Đã rõ"}};
 const sp=S0[k];if(!sp){back();return false}sp.onClose=back;
 if(sp.opts)sp.opts.forEach(o=>{const g=o.go;o.go=()=>{g();setTimeout(back,0)}});kitModal(sp);return true}catch(e){console.error("kitPopSample",e);const pg=document.getElementById("kitpage");if(pg)pg.hidden=false;return false}}
window.kitPopSample=kitPopSample;
KIT_SAMPLES.push({id:"§8",title:"kitModal · khung pop-up chung: ĐIỀU · LUẬT · VIỆC · KẾT QUẢ · TIN (chạm để mở pop-up thật)",html:()=>{
 const L=[["info","ĐIỀU · Thái hậu (người)"],["rule","LUẬT · Bổng lộc (tranh nhỏ 3:4)"],["event","VIỆC · Hoàng hậu triệu kiến (hình người + lựa chọn)"],["result","KẾT QUẢ · Thỉnh an Hoàng hậu"],["news","TIN · Tin trong cung (không người)"],["long","VIỆC DÀI · lời kể dài (chữ cuộn trong khung, tranh + nút đứng yên · KIT 32.5b)"]];
 const ok=typeof S!=="undefined"&&S;return `<div class="kitpg-row">${L.map(([k,t])=>`<button type="button" class="kbtn${k==="info"?"":" alt"}" data-kpop="${k}"${ok?"":" disabled"}>${t}</button>`).join("")}</div>`+
  (ok?"":kitFacts(["Vào một kiếp rồi mở lại trang mẫu để xem pop-up."],{group:false}))}});
KIT_SAMPLES.push({id:"§28.13b",title:"kitItem lớn · không khung, ảnh 512 (lg 150 px · xl 260 px) — so với ô có khung (md · slot)",html:()=>{const s=kitItemSrc("nhansam","img/item-nhansam.webp");
 return `<div class="kitpg-row" style="align-items:flex-end;gap:18px">${kitItem({src:s,name:"Nhân sâm",grade:3,size:"xl"})}${kitItem({src:s,name:"Nhân sâm",grade:4,size:"lg",qty:2})}${kitItem({src:s,name:"Nhân sâm",grade:1,size:"md"})}</div>`}});
KIT_SAMPLES.push({id:"§81",title:"Nút kết cảnh · cảnh hoạt hình nào cũng kết bằng MỘT nút ngắn, không tự đóng (chạm để mở cảnh thật)",html:()=>{const ok=typeof S!=="undefined"&&S;
 const L=[["bloom","Có hỷ → «Tiếp theo»"],["edict","Thánh chỉ tấn phong → «Đã hiểu»"],["flipme","Lật thẻ bài: thẻ của ta → «Chuẩn bị thị tẩm»"],["flipother","Lật thẻ bài: người khác → «Ta biết rồi»"]];
 return `<div class="kitpg-row">${L.map(([k,t])=>`<button type="button" class="kbtn alt" data-kscene="${k}"${ok?"":" disabled"}>${t}</button>`).join("")}</div>`+(ok?"":kitFacts(["Vào một kiếp rồi mở lại trang mẫu để xem cảnh."],{group:false}))}});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kitpage [data-kscene]");if(!b)return;e.stopPropagation();e.preventDefault();try{const k=b.dataset.kscene,R=typeof liveRivals==="function"?liveRivals(true):[];
 if(k==="bloom")kitBloom({title:"Có hỷ",sub:"Thái y báo tin mừng"});else if(k==="edict")kitEdict({who:S,from:Math.max(0,S.rank-1),to:S.rank});else if(k==="flipme")kitFlipTablet(S,{me:true});else if(R[0])kitFlipTablet(R[0])}catch(x){console.error("kscene",x)}},true);
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kitpage [data-kpop]");if(!b)return;e.stopPropagation();e.preventDefault();kitPopSample(b.dataset.kpop)},true);
/* §50.2 kitPersonDlg (owner 16/11 07:35Z, OD:L448): the person pop-up outside #modal — figure left, picture right top, info, buttons; one frame size per event */
KIT_SAMPLES.push({id:"§50.2",title:"kitPersonDlg: hộp thoại có người ngoài #modal (lời dặn, mẹo)",html:()=>`<div class="kitpg-row"><button type="button" class="kbtn" data-kpd2="tip">Mở lời dặn mẫu (cỡ coach)</button><button type="button" class="kbtn alt" data-kpd2="tour">Mở lời dặn tân thủ (4 trang cùng cỡ)</button></div>`});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kitpage [data-kpd2]");if(!b)return;e.stopPropagation();e.preventDefault();try{if(b.dataset.kpd2==="tip")kitTip({id:"kitpg",title:"Lời dặn mẫu",html:"<p>Một lời dặn ngắn của ma ma.</p>"});else window.kitTour()}catch(x){console.error(x)}},true);

/* KIT 83.9 danger button + kitConfirm (kit sample) */
KIT_SAMPLES.push({id:"§83.9",title:"kitDanger · .kbtn.kdanger + kitConfirm",where:"<b>Irreversible actions</b> (delete the cloud sổ, new life, …). Same size as <code>.kbtn</code>; yes = danger button, no = the panel's own quiet button; optional type-to-confirm field. Samples: button, disabled button, and a live pop-up trigger.",
 html:()=>`<div class="kitpg-row"><button class="kbtn">Đã hiểu</button><button class="kbtn alt">Thôi</button><button class="kbtn kdanger">Xóa sổ mây</button><button class="kbtn kdanger" disabled>Xóa sổ mây</button></div><p><button class="lnk" style="font-size:.95rem" onclick="kitConfirm({title:'Xóa sổ trên mây?',lines:['Sổ trên mây sẽ mất, không lấy lại được.'],yes:'Xóa sổ mây',type:'XOA'})">Mở thử hộp xác nhận (gõ XOA)</button></p>`});
