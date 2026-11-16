/* ================= jksize: KIT SIZE SYSTEM — 4 frame sizes S/M/L/XL, 4 figure sizes, picture sizes, button classes (KIT §84) =================
   Owner 16/11 15:00Z (OD, s17 kit review, "chốt lại là 4 size"): every pop-up frame kind (ĐIỀU, LUẬT, VIỆC, KẾT QUẢ, TIN, VIỆC DÀI…) comes in
   4 sizes picked by its CONTENT; each frame size uses the MATCHING figure size; no large empty space; pictures have sizes per orientation;
   every action button has a picture on the LEFT (small = square picture, shrinks to its info; long only when the info is a lot).
   ONE table (KIT_SIZE) holds every number; ONE function per family picks the size (kitFrameSize, kitBtnSize). Nobody sets a size per screen.
   Refines OD:L963 ("same frame size per viewport") → same size per SIZE CLASS per viewport. */
const KIT_SIZE={
 /* frame: width w (design px; kv2 = landscape spread, kv1 = one page), body cap = the most the body (under the header) may take before it scrolls.
    fig = matching full-body figure: body height h (feet → top of the painted head), column width cw (wide robes are CUT by the column, never squeezed). */
 frame:{
  S :{w:{kv1:380,kv2:380},cap:{kv1:262,kv2:262},fig:"S", pic:"PS",ban:"LS"},
  M :{w:{kv1:470,kv2:470},cap:{kv1:400,kv2:400},fig:"M", pic:"PM",ban:"LS"},
  L :{w:{kv1:560,kv2:560},cap:{kv1:518,kv2:518},fig:"L", pic:"PL",ban:"LM"},
  XL:{w:{kv1:562,kv2:860},cap:{kv1:732,kv2:732},fig:"XL",pic:"PL",ban:"LL"}},
 fig:{S:{h:200,cw:96},M:{h:300,cw:140},L:{h:420,cw:192},XL:{h:560,cw:250}},
 /* pictures by orientation: portrait 3:4 (3 sizes), landscape (3 sizes), square (button / skill thumbnails) */
 pic:{PS:{w:84,h:112},PM:{w:120,h:160},PL:{w:162,h:216},
      LS:{w:192,h:96},LM:{w:300,h:140},LL:{w:"100%",h:{kv1:200,kv2:260}},
      Q56:{w:56,h:56},Q64:{w:64,h:64},Q72:{w:72,h:72}},
 /* buttons: S = square 56 picture, width shrinks to the info (several per line); LS = long, square 72; LR = long, 3:4 rectangle 84x112 */
 btn:{S:{pic:"Q56",maxRows:2,maxChars:70},LS:{pic:"Q72",maxRows:3,maxChars:160},LR:{pic:"PS"}},
 chip:34,head:56};
window.KIT_SIZE=KIT_SIZE;
function kitSzMode(){try{return kitView().pages===2?"kv2":"kv1"}catch(e){return document.documentElement.classList.contains("kv2")?"kv2":"kv1"}}
/* kitBtnSize(info) — THE button rule. info = {rows:<number of Cần/Tốn/Được/Mất/Kèm/Gợi ý rows>, chars:<characters of title + rows>} or a button element.
   S when ≤ 2 rows and ≤ 70 characters; LS when ≤ 3 rows and ≤ 160; else LR. */
function kitBtnSize(info){if(info&&info.nodeType===1){const b=info;info={rows:b.querySelectorAll(".kar,.kszr,.kl").length,chars:(b.textContent||"").replace(/\s+/g," ").trim().length}}
 const B=KIT_SIZE.btn;if(info.rows<=B.S.maxRows&&info.chars<=B.S.maxChars)return"S";if(info.rows<=B.LS.maxRows&&info.chars<=B.LS.maxChars)return"LS";return"LR"}
/* kitFrameSize(dlg) — THE frame rule: the smallest size whose body cap holds the content measured AT THAT SIZE's width
   (a person frame also needs its matching figure + name chip to fit). Long story text (VIỆC DÀI: more than the L cap) → XL, picture on top. */
function kitFrameSize(dlg){const m=kitSzMode(),F=KIT_SIZE.frame;const per=!!dlg.querySelector(".kszfig");
 for(const k of ["S","M","L","XL"]){dlg.dataset.ksz=k;dlg.style.setProperty("--kszw",F[k].w[m]+"px");const body=dlg.querySelector(".kszbody");if(!body)return k;
  const R=dlg.querySelector(".kszright"),ll=dlg.querySelector(".kszll");const cap=F[k].cap[m]-(ll?ll.offsetHeight+10:0);
  const need=Math.max(R?R.scrollHeight:body.scrollHeight,per?KIT_SIZE.fig[F[k].fig].h+KIT_SIZE.chip:0)+22;if(need<=cap)return k}
 return"XL"}
function kitFrameApply(dlg){const k=kitFrameSize(dlg);dlg.dataset.ksz=k;dlg.style.removeProperty("--kszw");return k}
window.kitBtnSize=kitBtnSize;window.kitFrameSize=kitFrameSize;window.kitFrameApply=kitFrameApply;

/* ---- CSS: one rule set per size class, read from KIT_SIZE (generated, never typed twice) ---- */
(function(){const Z=KIT_SIZE,css=[];
 for(const k in Z.frame){const f=Z.frame[k],g=Z.fig[f.fig];
  for(const m of ["kv1","kv2"])css.push(`html.${m} .kszf[data-ksz="${k}"]{--kszw:${f.w[m]}px;--kszcap:${f.cap[m]}px}`);
  css.push(`.kszf[data-ksz="${k}"]{--kszfh:${g.h}px;--kszcw:${g.cw}px;--kszpw:${Z.pic[f.pic].w}px;--kszph:${Z.pic[f.pic].h}px;--kszbw:${typeof Z.pic[f.ban].w==="number"?Z.pic[f.ban].w+"px":Z.pic[f.ban].w}}`)}
 for(const m of ["kv1","kv2"])css.push(`html.${m} .kszf[data-ksz="XL"]{--kszll:${Z.pic.LL.h[m]}px}`);
 css.push(`
.kszf,.dlg.kszf{box-sizing:border-box;padding:0;max-height:none;animation:none;width:var(--kszw);max-width:calc(100vw - 20px);background:var(--k-card,#fffaf0);border:1px solid var(--gold,#8f5f0c);border-radius:8px;
 box-shadow:0 0 0 3px #fffaf0,0 0 0 4px #d8c08a,0 8px 22px #3a24124d;display:flex;flex-direction:column;overflow:hidden;font-size:.82rem;color:var(--ink,#2a1a12)}
.kszf>.kph{position:static;flex:none}
.kszbody{display:flex;gap:12px;padding:10px 12px 12px;max-height:var(--kszcap);box-sizing:border-box;align-items:flex-start;overflow:hidden}
.kszright{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;max-height:calc(var(--kszcap) - 22px);overflow:auto}
/* matching figure: name chip ABOVE (KIT §48), body height = the size's figure height, column width = the size's column (wide robes cut) */
.kszfig{flex:none;width:var(--kszcw);display:flex;flex-direction:column;align-items:center;gap:2px;overflow:hidden}
.kszfig{overflow:visible}.kszfig>.kszname{font:600 .74rem/1.2 var(--display,serif);text-align:center;width:max-content;max-width:calc(var(--kszcw) + 24px);overflow-wrap:anywhere}
.kszfig>.kszname small{display:block;font-size:.66rem;color:var(--rc,#8f5f0c)}
.kszfig>span{display:block;width:var(--kszcw);height:var(--kszfh);overflow:hidden;position:relative}
.kszfig>span>img{position:absolute;left:50%;bottom:0;height:100%;width:auto;max-width:none;translate:-50% 0}
/* frame pictures: portrait slot (no person) and landscape banner (with person); XL = landscape picture on TOP across the frame */
.kszpic{flex:none;width:var(--kszpw);height:var(--kszph)}
.kszban{width:min(100%,var(--kszbw));align-self:center}
.kszpic>.ksart,.kszban>.ksart{width:100%;height:100%}
.kszpic>.ksart img,.kszban>.ksart img,.kszll>.ksart img,.kszb>.kszbp img{width:100%;height:100%;object-fit:cover;display:block}
.kszban>.ksart{aspect-ratio:auto;height:calc(var(--kszbw) * .47)}
.kszll{flex:none;margin:10px 12px 0;height:var(--kszll)}.kszll>.ksart{height:100%;aspect-ratio:auto}
.kszf.kszlong>.kszbody{flex-direction:column;align-items:stretch;max-height:calc(var(--kszcap) - var(--kszll,0px) - 10px)}
.kpkb .krv>.kchip+.kchip{margin-left:4px}
.kszf.kszper>.kszbody{align-items:center}
.kszopts{display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start}
.kszfoot{display:flex;justify-content:center;padding:0 12px 12px}
/* ---- BUTTONS (every button: picture LEFT, info RIGHT) ---- */
.kszb{box-sizing:border-box;display:flex;gap:8px;align-items:flex-start;text-align:left;padding:6px;border:1px solid var(--line,#d2b071);border-radius:6px;background:var(--panel2,#f6ead6);font:inherit;color:inherit;cursor:pointer}
.kszb>.kszbp{flex:none;border-radius:4px;overflow:hidden;border:1px solid var(--gold,#8f5f0c);box-shadow:inset 0 0 0 1px #fffaf0}
.kszb>.kszbi{min-width:0;display:flex;flex-direction:column;gap:2px}
.kszb .kszbt{font-weight:700;line-height:1.25}
.kszb .kszr{display:flex;gap:6px;align-items:baseline;font-size:.74rem;line-height:1.3}
.kszb .kszr>i{font-style:normal;font-size:.64rem;letter-spacing:.04em;color:var(--dim,#6b5643);text-transform:uppercase;flex:none;min-width:34px}
.kszb[data-kbs="S"]{flex:0 1 auto;max-width:100%}
.kszb[data-kbs="S"]>.kszbp{width:56px;height:56px}
.kszb[data-kbs="LS"]{flex:1 1 100%}
.kszb[data-kbs="LS"]>.kszbp{width:72px;height:72px}
.kszb[data-kbs="LR"]{flex:1 1 100%}
.kszb[data-kbs="LR"]>.kszbp{width:84px;height:112px}
.kszskills{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.kszskills>.kszb>.kszbp{width:64px;height:64px}
/* ---- sample sheet ---- */
#kszsheet{position:fixed;inset:0;z-index:2147483600;overflow:auto;background:#f3e8d4;padding:14px;box-sizing:border-box;font-family:var(--body,sans-serif)}
#kszsheet h2{font:700 1.15rem var(--display,serif);color:#7a1f1a;margin:6px 0 2px}
#kszsheet h3{font:700 .92rem var(--display,serif);color:#5a3a12;margin:14px 0 4px}
#kszsheet .kszn{font-size:.72rem;color:#6b5643;margin:0 0 6px}
#kszsheet .kszrow{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}
#kszsheet .kszlab{font:600 .72rem var(--body);color:#7a1f1a;margin-bottom:4px}
#kszsheet .kszgrid{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:.74rem;max-width:760px}
#kszsheet .kszgrid b{color:#7a1f1a}`);
 const st=document.createElement("style");st.id="k-size";st.textContent=css.join("\n");document.head.appendChild(st)})();

/* ---- markup builders (data only; used by the sample sheet now, by kpBuild after the owner's OK) ---- */
function kszImg(p){return typeof IMG_BASE!=="undefined"&&/^img\//.test(p)?IMG_BASE+p:p}
function kszBtn(o){const rows=(o.rows||[]).map(([l,v])=>`<span class="kszr"><i>${l}</i><span>${v}</span></span>`).join("");
 const info={rows:(o.rows||[]).length,chars:(o.t+(o.rows||[]).map(r=>String(r[1]).replace(/<[^>]+>/g,"")).join(" ")).length};
 const k=o.size||kitBtnSize(info);return `<button type="button" class="kszb" data-kbs="${k}"><span class="kszbp">${kitSceneArt(kszImg(o.pic||""),"",{shape:"tall",cap:false})}</span><span class="kszbi"><span class="kszbt">${o.t}</span>${rows}</span></button>`}
function kszFigHtml(p){let src=kitFigOf(p);if(p&&p.kind==="th"&&(!src||/unknown|sil/.test(src)))src=kszImg("img/fig-thaihau-h1-a51.webp");let nm="";try{nm=kitName(p,{cap:true})}catch(e){nm=p.name||""}
 return `<div class="kszfig"><div class="kszname">${nm}</div><span><img src="${src}" alt="" crossorigin="anonymous"></span></div>`}
/* spec: {kind,title,sub,who,pic,ban,facts,rows,opts,btn,long} → frame html (size picked after mount by kitFrameApply) */
function kszFrame(sp){const right=[];if(sp.long==null)sp.long=!sp.who&&(sp.facts||[]).join(" ").length>600;
 if(sp.ban)right.push(`<div class="kszban">${kitSceneArt(kszImg(sp.ban),"",{shape:"wide",cap:false})}</div>`);
 if(sp.facts)right.push(kitFacts(sp.facts,{group:false}));if(sp.rows)right.push(kitRows(sp.rows));
 if(sp.opts)right.push(`<div class="kszopts">${sp.opts.map(kszBtn).join("")}</div>`);
 const left=sp.who?kszFigHtml(sp.who):sp.pic&&!sp.long?`<div class="kszpic">${kitSceneArt(kszImg(sp.pic),"",{shape:"tall",cap:false})}</div>`:"";
 const top=sp.long&&sp.pic?`<div class="kszll">${kitSceneArt(kszImg(sp.pic),"",{shape:"wide",cap:false})}</div>`:"";
 return `<div class="dlg kszf kpanel${sp.long?" kszlong":""}${sp.who?" kszper":""}" data-kind="${sp.kind}">${kpHeader(sp.kind,sp.title,sp.sub)}${top}<div class="kszbody">${left}<div class="kszright">${right.join("")}</div></div>${sp.btn?`<div class="kszfoot"><button class="kbtn">${sp.btn}</button></div>`:""}</div>`}
window.kszFrame=kszFrame;window.kszBtn=kszBtn;

/* ---- SAMPLE SHEET (kit page §84 + dev/test/kit-size-sheet.js): kitSizeSheet(area) area = "frames" | "buttons" | "long" ---- */
function kszPeople(){const R=typeof liveRivals==="function"?liveRivals(true):[];const qp=typeof queenP==="function"?queenP():null;
 const q=(qp&&qp!==S?qp:null)||R.find(v=>v.queen)||R[0];return{th:{kind:"th",name:"Thái hậu"},q,v2:R.find(v=>v!==q)||q,emp:S&&S.emp}}
function kszOptPic(t){try{const r=kitOptPic(t);return r&&r.src||""}catch(e){return""}}
function kitSizeSheet(area){const kk=window.kitKnown;window.kitKnown=()=>true;/* sample: show the real people, not the stranger silhouette */try{return kszSheet(area)}finally{window.kitKnown=kk}}
function kszSheet(area){const old=document.getElementById("kszsheet");if(old)old.remove();const P=kszPeople(),m=kitSzMode();
 const ch=(l,v,c)=>kitChip(l,v,c);const op=(t,rows)=>({t,pic:kszOptPic(t),rows});
 const Z=KIT_SIZE,F=Z.frame;let h="";
 const tbl=window.kszTbl=k=>{const f=F[k],g=Z.fig[f.fig];return `${k}: ${f.w[m]} px wide · body up to ${f.cap[m]} px · figure ${f.fig} ${g.h} px tall (column ${g.cw}) · portrait picture ${f.pic} ${Z.pic[f.pic].w}x${Z.pic[f.pic].h}`};
 if(area==="frames"){
  h+=`<h2>KIT SIZE 1 · Pop-up frames S / M / L / XL + matching figure (${m==="kv2"?"landscape 1180x820":"portrait one page"})</h2>
  <p class="kszn">ONE rule (kitFrameSize): the smallest size whose body holds the content; a person frame also holds its matching figure. No size is set per screen. Every kind (ĐIỀU, LUẬT, VIỆC, KẾT QUẢ, TIN, BÁO, ĐÊM…) uses the same 4 sizes.</p>`;
  const L=[
   ["S","TIN · short news, no person (1.5 before: big empty frame)",{kind:"news",title:"Tin trong cung",sub:"Tháng 3 · Năm 1",pic:"img/ev-tin-don.webp",facts:[{who:P.v2,text:"được lật thẻ bài đêm qua",chips:[["Sủng",3]]},"Tháng này được mùa khắp nơi."],btn:"Đã rõ"}],
   ["S","KẾT QUẢ · person, 2 short lines → small figure (1.4 before: figure absurdly tall)",{kind:"result",title:"Kết quả: Thỉnh an",sub:"Thượng tuần · sáng",who:P.q,facts:[{who:P.q,text:"hài lòng vì ta giữ lễ.",chips:[["Thiện cảm",5]]},{who:S,kind:"me",text:"được tiếng hiền thục.",chips:[["Đức",2],["Sức",-10]]}],btn:"Đã hiểu"}],
   ["M","ĐIỀU · person + info (1.1 before: empty space, empty banner)",{kind:"info",title:"Thái hậu",sub:"Từ Ninh cung",who:P.th,facts:["Thái hậu là mẹ của Hoàng thượng, đứng đầu hậu cung.","Người trọng lễ nghi, ghét kẻ phô trương."],rows:[["Lòng người với ta",[ch("Thiện cảm",12),ch("Đức",3)]],["Thỉnh an mỗi tuần",ch("Thiện cảm",2),"t"],["Dâng kinh chép tay",ch("Thiện cảm",5),"t"]],btn:"Đã hiểu"}],
   ["M","LUẬT · rule with portrait picture, no person",{kind:"rule",title:"Bổng lộc",pic:"img/ev-trieu-chinh.webp",facts:["Mỗi tháng Nội vụ phủ phát bổng lộc theo phẩm vị.","Phẩm càng cao, bạc càng nhiều."],rows:[["Thường tại",ch("Bạc",20,"g"),"t"],["Quý nhân",ch("Bạc",40,"g"),"t"],["Tần",ch("Bạc",60,"g"),"t"]],btn:"Đã hiểu"}],
   ["L","VIỆC · person + banner + 3 choices (1.3 before: empty figure column)",{kind:"choice",title:"Hoàng hậu triệu kiến",sub:"Thượng tuần · buổi sáng",who:P.q,ban:"img/ev-hh-viec.webp",facts:[{who:P.q,text:"cho gọi ta đến Khôn Ninh cung, hỏi chuyện đêm qua ta được lật thẻ bài."}],
     opts:[op("Cúi đầu nhận lỗi",[["Được",ch("Thiện cảm",5)],["Mất",ch("Sủng",-1)]]),op("Thưa rằng do Hoàng thượng định",[["Thành",ch("Danh",2)],["Hỏng",ch("Oán",8)]]),op("Dâng lễ vật xin bỏ qua",[["Tốn",ch("Bạc",-20)],["Được",ch("Thiện cảm",8)]])]}],
   ["XL","VIỆC · person + many long choices",{kind:"choice",title:"Thái hậu chê dung nhan",sub:"Trung tuần · buổi chiều",who:P.th,ban:"img/ev-thinh-an.webp",facts:[{who:P.th,text:"cho gọi ta đến trước mặt các phi tần, chê ta trang điểm lòe loẹt, không ra dáng người hầu hạ thánh giá."},"Các phi tần đứng quanh, có người che miệng cười."],
     opts:[op("Quỳ xuống nhận lỗi, xin Thái hậu dạy bảo",[["Tốn","1 khắc"],["Được",ch("Thiện cảm",6)+ch("Đức",1)],["Mất",ch("Danh",-1)],["Gợi ý","Thái hậu ưa người biết phận, nhận lỗi trước mặt mọi người thì bà nguôi giận nhanh"]]),op("Thưa rằng phấn son do Nội vụ phủ phát theo phẩm",[["Được",ch("Danh",1)],["Mất",ch("Thiện cảm",-4)],["Gợi ý","nói đúng lý nhưng làm bà mất mặt trước các phi tần"]]),op("Dâng chén trà, đổi sang chuyện kinh Phật",[["Cần","Tài nghệ Trà ≥ 2"],["Được",ch("Thiện cảm",4)],["Gợi ý","nếu trà không ngon bà càng giận"]]),op("Im lặng",[["Mất",ch("Thiện cảm",-2)]])]}]];
  for(const [k,lab,sp] of L)h+=`<div style="margin:10px 0 18px"><div class="kszlab">${lab}</div><div class="kszn" data-ksztbl></div><div data-want="${k}">${kszFrame(sp)}</div></div>`;
  h+=`<h3>The 4 figure sizes (small frame ↔ small figure)</h3><div class="kszrow" style="align-items:flex-end">${["S","M","L","XL"].map(k=>`<div><div class="kszlab">Figure ${k} · ${Z.fig[k].h} px · column ${Z.fig[k].cw}</div><div class="kszf" data-ksz="${k}" style="width:auto;box-shadow:none;border:0;background:none">${kszFigHtml(P.th)}</div></div>`).join("")}</div>`}
 if(area==="buttons"){
  h+=`<h2>KIT SIZE 2 · Action buttons + pictures</h2><p class="kszn">EVERY button: picture LEFT, info RIGHT. ONE rule (kitBtnSize): S when ≤ 2 rows and ≤ 70 characters (square 56 picture, the button shrinks to its info, several per line) · LS long when ≤ 3 rows and ≤ 160 characters (square 72) · LR long otherwise (3:4 rectangle 84x112). Used by dialog options, Hành sự compact cards (narrow column), person-card acts, event options in cost mode.</p>`;
  h+=`<h3>S · small button (3.3 / 3.5 before: too big, empty right side)</h3><div class="kszopts" style="max-width:560px">${[op("Cúi đầu nhận lỗi",[["Tốn","1 khắc"]]),op("Thưa rằng do Hoàng thượng định",[["Tốn","1 khắc"]]),op("Dâng lễ vật xin bỏ qua",[["Tốn",ch("Bạc",-20)+" 1 khắc"]]),op("Im lặng",[])].map(kszBtn).join("")}</div>`;
  h+=`<h3>LS · long button, square picture (moderate info)</h3><div class="kszopts" style="max-width:560px">${[op("Tâm sự",[["Tốn","1 khắc"],["Được",ch("Thiện cảm",6)],["Mất",ch("Sức",-5)]]),op("Sai đi dò la",[["Tốn","2 khắc"],["Được","biết 2 điều thật về nàng ta, chứng cứ +1"],["Mất",ch("Thiện cảm",-5)]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>LR · long button, rectangle picture (a lot of info)</h3><div class="kszopts" style="max-width:560px">${[op("Quỳ xuống nhận lỗi, xin Thái hậu dạy bảo",[["Tốn","1 khắc"],["Được",ch("Thiện cảm",6)+ch("Đức",1)],["Mất",ch("Danh",-1)],["Gợi ý","Thái hậu ưa người biết phận, nhận lỗi trước mặt mọi người thì bà nguôi giận nhanh"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.4 event option in cost mode — now WITH its picture (S)</h3><div class="kszopts" style="max-width:560px">${[op("Gọi bản cung Thái hậu",[["Gợi ý","an toàn"]]),op("Xin ân cho gia đình",[["Gợi ý","thêm thể diện, có thêm bạc"]]),op("Theo cha mưu đại sự",[["Gợi ý","Hoàng hậu bị phế, thêm thể diện; hỏng thì mất mạng"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.1 / 3.2 Hành sự compact card in the narrow column (was: picture on top, empty right) → S / LS</h3><div class="kszopts" style="max-width:280px">${[op("Hỏi han ở tẩm cung ta: ai cần giúp?",[["Tốn","1 khắc"],["Được","người ở đây có việc thì ngỏ lời nhờ"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.7 skill cards: square picture, TWO columns</h3><div class="kszskills" style="max-width:560px">${[op("Tự học",[["Tốn","2 khắc · Sức -15"],["Được","tiến bộ một hai phần"]]),op("Học với thầy",[["Tốn","2 khắc · Bạc -15"],["Được","tiến bộ một đến ba phần"]])].map(o=>kszBtn(Object.assign(o,{size:"LS"}))).join("")}</div>`;
  const pv=(k,src,shape)=>{const p=Z.pic[k];const w=typeof p.w==="number"?p.w:420,hh=typeof p.h==="number"?p.h:p.h[m];return `<div><div class="kszlab">${k} · ${typeof p.w==="number"?p.w:"frame width"}x${hh}</div><div style="width:${w}px;height:${hh}px">${kitSceneArt(kszImg(src),"",{shape,cap:false}).replace('class="ksart','style="height:100%;aspect-ratio:auto" class="ksart')}</div></div>`};
  h+=`<h3>Pictures by orientation — portrait 3:4 (3 sizes) · landscape (3 sizes) · square (buttons, skills)</h3><div class="kszrow" style="align-items:flex-end">${pv("PS","img/ev-trieu-chinh.webp","tall")}${pv("PM","img/ev-trieu-chinh.webp","tall")}${pv("PL","img/ev-trieu-chinh.webp","tall")}</div><div class="kszrow" style="align-items:flex-end;margin-top:10px">${pv("LS","img/ev-hh-viec.webp","wide")}${pv("LM","img/ev-hh-viec.webp","wide")}${pv("LL","img/ev-hh-viec.webp","wide")}</div><div class="kszrow" style="align-items:flex-end;margin-top:10px">${pv("Q56","img/ev-trieu-chinh.webp","tall")}${pv("Q64","img/ev-trieu-chinh.webp","tall")}${pv("Q72","img/ev-trieu-chinh.webp","tall")}</div>`}
 if(area==="long"){
  h+=`<h2>KIT SIZE 3 · VIỆC DÀI (long story) = XL, landscape picture on TOP, info + buttons BELOW</h2><p class="kszn">Rule: a frame whose story text does not fit the L body and has no person → XL with the landscape picture LL across the top; text scrolls inside, the picture and the buttons stay.</p>`;
  h+=`<div data-want="XL">${kszFrame({kind:"choice",title:"Việc dài lời kể",sub:"Thượng tuần · buổi sáng",pic:"img/ev-hh-viec.webp",facts:Array.from({length:6},(_,i)=>"Lời kể số "+(i+1)+": người trong cung kể rằng chuyện này kéo dài suốt cả buổi, hết người này đến người khác đến thưa, nên khung phải cuộn phần chữ mà giữ nguyên tiêu đề, tranh và các lựa chọn."),
   opts:[op("Nghe hết rồi mới định",[["Được",ch("Đức",1)]]),op("Cho lui, để mai bàn",[])]})}</div>`}
 if(area==="items")h+=kszItemsSheet();
 h=h.replace(/ loading="lazy"/g,"");const d=document.createElement("div");d.id="kszsheet";d.innerHTML=h;document.body.appendChild(d);
 const fit=()=>d.querySelectorAll(".kszf.kpanel").forEach(f=>{const k=kitFrameApply(f);const w=f.parentElement.dataset.want;f.title=k;f.parentElement.dataset.got=k;const t=f.parentElement.previousElementSibling;if(t&&t.hasAttribute("data-ksztbl"))t.textContent="picked → "+tbl(k)});
 fit();d.querySelectorAll("img").forEach(i=>i.complete||i.addEventListener("load",fit,{once:true}));return d}
window.kitSizeSheet=kitSizeSheet;

/* ---- ITEMS (owner kit review part 2, 16/11 15:10Z: 6.2 / 6.3 / 6.5 / 7.1 / 7.3) ----
   6.2 item detail card: name · row 1 = kind ("Trâm cài · cài tóc") · row 2 = gains / losses chips; the rest (Hợp đề, Xa xỉ, Lai lịch, Ghi chú) as kit rows.
       Xa xỉ on EVERY item that has a luxury value (was: wearables of the player only).
   6.3 / 6.5 grade = a chip ON the item frame (top-left), no grade word under the tile; pick grids show picture + name + effects only ("Sắc +5, Danh +2");
       the kind text is dropped there (full info on tap = the 6.2 card); the gift-chest reveal (first appearance, §54) keeps the full info.
   Item sizes = the 4 kit sizes: S 52 · M 72 · L 104 · XL 150 (kitItem sm/md/lg/xl). */
const KSZ_ITEM={S:"sm",M:"md",L:"lg",XL:"xl"};
(function(){const st=document.createElement("style");st.id="k-size-items";st.textContent=`
.kszit{position:relative;display:inline-block;line-height:0}
.kszit>.kszgc{position:absolute;left:50%;translate:-50% 0;bottom:3px;white-space:nowrap;z-index:3;font:700 .58rem/1 var(--body,sans-serif);color:#fff;background:var(--kgc);padding:2px 4px;border-radius:3px;box-shadow:0 0 0 1px #fffaf0;pointer-events:none;letter-spacing:.02em}
.kszit[data-s="S"]>.kszgc{font-size:.5rem;padding:1px 3px}
.kszit .kitn,.kszit .kitg{display:none}
.kszidc{box-sizing:border-box;border:1px solid var(--line,#d2b071);border-radius:8px;background:var(--panel,#fffaf0);padding:8px 10px;display:flex;flex-direction:column;gap:6px;font-size:.8rem}
.kszidh{display:flex;gap:10px;align-items:flex-start}
.kszidt{display:flex;flex-direction:column;gap:3px;min-width:0}
.kszidt>b{font:700 1rem/1.2 var(--display,serif)}
.kszidt>.kszk{font-size:.74rem;color:var(--dim,#6b5643)}
.kszidt>.kszfx{display:flex;flex-wrap:wrap;gap:4px}.kszidt>.kszloss,.kszidt>.kszloss .ef{color:var(--bad,#c23b22)}
.kszpick{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px}
.kszpick>div{display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center;padding:6px 4px;border:1px solid var(--line,#d2b071);border-radius:6px;background:var(--panel2,#f6ead6)}
.kszpick>div>b{font:600 .74rem/1.2 var(--body)}.kszpick>div>small{font-size:.7rem;color:var(--good,#2d7a52)}
.kszphg{display:grid;grid-template-columns:auto repeat(3,auto);gap:8px 14px;align-items:end;font-size:.7rem}`;document.head.appendChild(st)})();
function kszItemTile(k,size){const I=kitItemInfo(k);const G=KIT_GRADE[Math.max(0,Math.min(4,I.grade|0))];
 return `<span class="kszit" data-s="${size}">${kitItem({src:I.src,name:"",grade:I.grade,size:KSZ_ITEM[size],frame:true})}<b class="kszgc" style="--kgc:${G.c}">${I.gname||G.n}</b></span>`}
function kszItemDetail(k){const I=kitItemInfo(k);const tmp=document.createElement("div");tmp.innerHTML=kitItemDetail(k,{cls:"kidet-strip"});
 const rows=[...tmp.querySelectorAll(".kidrows .kr")];const fx=[],loss=[],keep=[];let kind="";
 for(const r of rows){const l=(r.querySelector(".krl")||{}).textContent||"";const v=r.querySelector(".krv");
  if(/^(Được|dùng)/i.test(l))fx.push(v.innerHTML);else if(/^(Mất|Kèm)/i.test(l))loss.push(v.innerHTML);else if(/^Loại/.test(l))kind=v.textContent;else if(/^Phẩm/.test(l)){}else keep.push(r.outerHTML)}
 if(!rows.some(r=>/^Xa xỉ/.test(r.textContent))){let lux=0;try{lux=typeof luxVal==="function"?luxVal(k):0}catch(e){}if(lux)keep.unshift(`<span class="kr"><span class="krl">Xa xỉ</span><span class="krv"><span class="ef n">món này ${lux}</span></span></span>`)}
 return `<div class="kszidc"><div class="kszidh">${kszItemTile(k,"M")}<div class="kszidt"><b style="color:${I.col||"inherit"}">${I.name}</b><span class="kszk">${kind||tmp.querySelector(".kidkind")?.textContent||""}</span><span class="kszfx">${fx.join('<span class="ksep">·</span>')}</span>${loss.length?`<span class="kszfx kszloss">${loss.join('<span class="ksep">·</span>')}</span>`:""}</div></div>${keep.length?`<span class="kb kpkb">${keep.join("")}</span>`:""}</div>`}
function kszItemsSheet(){const ks=["tramngoc","vongngoc","luahang","nhansam","thu"].concat(typeof WD_ITEMS==="object"?["y_haiduong","nt_nhuy"]:[]).filter(k=>{try{return kitItemInfo(k)}catch(e){return false}});
 let h=`<h2>KIT SIZE 4 · Items (owner part 2: 6.2 · 6.3 · 6.5) + thumbnails (7.1) + placeholder sets (7.3)</h2>`;
 h+=`<h3>Item sizes = the 4 kit sizes · GRADE as a chip ON the frame (no grade line under it)</h3><div class="kszrow" style="align-items:flex-end">${["S","M","L","XL"].map(s=>`<div><div class="kszlab">${s} · ${{S:52,M:72,L:104,XL:150}[s]} px</div>${kszItemTile(ks[1]||ks[0],s)}</div>`).join("")}</div>`;
 h+=`<h3>6.2 item detail card: kind on the upper row, gains / losses on the row below; Xa xỉ on every item with a luxury value</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px;max-width:1120px">${ks.map(kszItemDetail).join("")}</div>`;
 const pk=Object.keys(IT).filter(k=>!IT[k].story&&IT[k].sl).slice(0,6);
 h+=`<h3>6.3 pick grid (Tặng quà · Dâng quà · Cài đồ): picture + name + effects only; full info on tap</h3><div class="kszpick" style="max-width:640px">${pk.map(k=>{const I=kipItem({k});const use=String(I.use||"").replace(/^[^:]*:\s*/,"");return `<div>${kszItemTile(k,"M")}<b style="color:${I.col}">${I.name}</b><small>${use}</small></div>`}).join("")}</div>`;
 h+=`<h3>6.5 item tag in events: tile with grade chip, name only</h3><div class="kszrow">${pk.slice(0,6).map(k=>`<div style="text-align:center;width:64px">${kszItemTile(k,"S")}<div style="font-size:.68rem">${kitItemInfo(k).name}</div></div>`).join("")}</div>`;
 const Z=KIT_SIZE.pic,m=kitSzMode();const box=(k,src)=>{const p=Z[k];const w=typeof p.w==="number"?p.w:300,hh=typeof p.h==="number"?p.h:p.h[m];return `<div><div class="kszlab">${k} ${w}x${hh}</div><div style="width:${w}px;height:${hh}px">${kitSceneArt(kszImg(src),"",{shape:w<hh?"tall":"wide",cap:false}).replace('class="ksart','style="height:100%;aspect-ratio:auto" class="ksart')}</div></div>`};
 h+=`<h3>7.1 thumbnails = the picture size table (replaces wide / tall / thumb): portrait PS · PM · PL · landscape LS · LM · LL · square Q56 · Q64 · Q72</h3><div class="kszrow" style="align-items:flex-end">${["PS","PM","PL"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}${["LS","LM"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}${["Q56","Q64","Q72"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}</div>`;
 h+=`<h3>7.3 placeholder pictures: ONE set per real orientation (portrait 3:4 · landscape · square) × tone (light · dark), shown at every size of that orientation</h3><p class="kszn">Today: 2 event (640x480) + 2 act (384x506) pictures stretched into every slot. Spec: ph-{light,dark}-{p,l,q}.webp painted at the largest size of its orientation (PL 162x216 → 3:4 at 486x648, LL 860x260 → 3.3:1 at 1720x520, Q72 → 1:1 at 288x288) — ART REQUEST → Foreman C (all drawing is C's, OD 15:35Z). Below: the slots with today's pictures.</p>`;
 h+=`<div>${[["portrait","img/ph-act-light.webp",["PS","PM","PL"]],["landscape","img/ph-event-light.webp",["LS","LM","LL"]],["square","img/ph-act-dark-v2.webp",["Q56","Q64","Q72"]]].map(([n,src,L])=>`<div class="kszlab">${n}</div><div class="kszrow" style="align-items:flex-end;margin-bottom:10px">${L.map(k=>box(k,src)).join("")}</div>`).join("")}</div>`;
 return h}
