/* ================= jksize: KIT SIZE SYSTEM — 4 frame sizes S/M/L/XL, ONE figure scale per frame layout, picture sizes, ONE button (KIT §84) =================
   Owner 16/11 15:00Z (OD, s17 kit review, "chốt lại là 4 size"): every pop-up frame kind (ĐIỀU, LUẬT, VIỆC, KẾT QUẢ, TIN, VIỆC DÀI…) comes in
   4 sizes picked by its CONTENT; no large empty space; pictures have sizes per orientation; every action button has a picture on the LEFT.
   Owner 16/11 16:00Z (OD, s19 chat, sample review (1)–(9)):
   (1) every frame figure carries the name tag ABOVE the head: rank line 1, name line 2 (kitTitleTag3 = the live title-tag part; title plate on top when worn);
       painted scenes keep the tag UNDER the feet (j59 stage tags); the Tuần lục book alone has no tag.
   (2) info frames (ĐIỀU / LUẬT / TIN / KẾT QUẢ / BÁO) have NO "Đã hiểu" button: close = tap outside (first tap only closes, OD:L418) or the kit ✕ top-right.
   (3) the figure column and the info column are centred vertically in the frame body.
   (4) every choice button inside one frame has the SAME width (full info width) and the same button class (the largest one needed).
   (5) button = [picture | name + TỐN / ĐƯỢC / MẤT rows], then GỢI Ý as ONE full-width box under that row.
   (6)(7) ONE layout per frame kind (KIT_SIZE.lay): one figure column width + ONE figure scale = the measured BODY height (kitFigBody, × KIT_FIG.fac:
       men 1.07, children by age) for every person; the frame size (S..XL) changes ONLY the info area. Thái hậu is never drawn bigger than a consort.
   (9) narrow long pictures NS / NM / NL (≈ 3.5:1) = the banner of a frame that holds a person + info.
   ONE table (KIT_SIZE) holds every number; ONE function per family picks the size (kitFrameSize, kitBtnSize). Nobody sets a size per screen. */
const KIT_SIZE={
 /* frame: width w (design px; kv2 = landscape spread, kv1 = one page), body cap = the most the body may take before the info scrolls,
    pic = portrait picture of a frame without a person, ban = banner of a frame WITH a person (narrow strip, owner (9)), top = long-story picture. */
 frame:{
  S :{w:{kv1:380,kv2:380},cap:{kv1:262,kv2:262},pic:"PS",ban:"NS"},
  M :{w:{kv1:470,kv2:470},cap:{kv1:400,kv2:400},pic:"PM",ban:"NS"},
  L :{w:{kv1:560,kv2:560},cap:{kv1:518,kv2:518},pic:"PL",ban:"NM"},
  XL:{w:{kv1:562,kv2:860},cap:{kv1:732,kv2:732},pic:"PL",ban:"NL"}},
 /* the 4 figure sizes = BODY height h (measured: head top → feet, crowns not counted) of an adult woman, × KIT_FIG.fac per person; cw = column width (wide robes cut) */
 fig:{S:{h:150,cw:104},M:{h:230,cw:140},L:{h:310,cw:176},XL:{h:420,cw:220}},
 /* ONE layout per frame kind (owner (7)): figure size + column. "big" = VIỆC / ĐIỀU / LUẬT / BÁO / ĐÊM; "small" = KẾT QUẢ / TIN (two or three lines). */
 lay:{big:{fig:"L"},small:{fig:"M"}},
 kindLay:{choice:"big",info:"big",rule:"big",notice:"big",night:"big",result:"small",news:"small"},
 /* info kinds: no "Đã hiểu" button, close = tap outside or ✕ (owner (2)) */
 infoKinds:["info","rule","news","result","notice"],
 /* pictures by orientation: portrait 3:4 (3 sizes), landscape (3 sizes), NARROW landscape strips (3 sizes, owner (9)), square (button / skill thumbnails) */
 pic:{PS:{w:84,h:112},PM:{w:120,h:160},PL:{w:162,h:216},
      LS:{w:192,h:96},LM:{w:300,h:140},LL:{w:"100%",h:{kv1:200,kv2:260}},
      NS:{w:192,h:56},NM:{w:300,h:84},NL:{w:"100%",h:{kv1:110,kv2:140}},
      Q56:{w:56,h:56},Q64:{w:64,h:64},Q72:{w:72,h:72}},
 /* buttons: S = square 56; LS = square 72; LR = 3:4 rectangle 84x112. In a frame every button is full width; the class only sets the picture. */
 btn:{S:{pic:"Q56",maxRows:2,maxChars:70},LS:{pic:"Q72",maxRows:3,maxChars:160},LR:{pic:"PS"}},
 head:56};
window.KIT_SIZE=KIT_SIZE;
function kitSzMode(){try{return kitView().pages===2?"kv2":"kv1"}catch(e){return document.documentElement.classList.contains("kv2")?"kv2":"kv1"}}
/* kitBtnSize(info) — THE button rule. info = {rows:<Cần/Tốn/Được/Mất/Kèm rows; GỢI Ý not counted: it has its own box>, chars:<title + rows>} or a button element.
   S when ≤ 2 rows and ≤ 70 characters; LS when ≤ 3 rows and ≤ 160; else LR. */
function kitBtnSize(info){if(info&&info.nodeType===1){const b=info;info={rows:b.querySelectorAll(".kszbi .kszr,.kar,.kl").length,chars:((b.querySelector(".kszbi")||b).textContent||"").replace(/\s+/g," ").trim().length}}
 const B=KIT_SIZE.btn;if(info.rows<=B.S.maxRows&&info.chars<=B.S.maxChars)return"S";if(info.rows<=B.LS.maxRows&&info.chars<=B.LS.maxChars)return"LS";return"LR"}
const KSZ_ORD=["S","LS","LR"];
/* owner (4): one class per frame = the largest any of its buttons needs; every button full width */
function kitBtnUnify(root){const bs=[...root.querySelectorAll(".kszopts>.kszb")];if(!bs.length)return;const k=KSZ_ORD[Math.max(...bs.map(b=>KSZ_ORD.indexOf(b.dataset.kbs0||b.dataset.kbs)))];bs.forEach(b=>{b.dataset.kbs0=b.dataset.kbs0||b.dataset.kbs;b.dataset.kbs=k})}
/* kitFrameSize(dlg) — THE frame rule: the smallest size whose body cap holds the content measured AT THAT SIZE's width (the figure column is the
   same at every size of a layout, so only the info area grows). A person frame needs an info area ≥ 210 px. Long story without a person → XL. */
function kitFrameSize(dlg){const m=kitSzMode(),F=KIT_SIZE.frame;const fig=dlg.querySelector(".kszfig");
 for(const k of ["S","M","L","XL"]){dlg.dataset.ksz=k;dlg.style.setProperty("--kszw",F[k].w[m]+"px");const body=dlg.querySelector(".kszbody");if(!body)return k;
  const R=dlg.querySelector(".kszright"),ll=dlg.querySelector(".kszll");if(fig&&R&&R.clientWidth<210)continue;const cap=F[k].cap[m]-(ll?ll.offsetHeight+10:0);
  const need=Math.max(R?R.scrollHeight:body.scrollHeight,fig?fig.offsetHeight:0)+22;if(need<=cap)return k}
 return"XL"}
function kitFrameApply(dlg){kitBtnUnify(dlg);kszFigFit(dlg);const k=kitFrameSize(dlg);dlg.dataset.ksz=k;dlg.style.removeProperty("--kszw");return k}
window.kitBtnSize=kitBtnSize;window.kitFrameSize=kitFrameSize;window.kitFrameApply=kitFrameApply;window.kitBtnUnify=kitBtnUnify;

/* ---- CSS: one rule set per size class, read from KIT_SIZE (generated, never typed twice) ---- */
(function(){const Z=KIT_SIZE,css=[];const px=v=>typeof v==="number"?v+"px":v;
 for(const k in Z.frame){const f=Z.frame[k];
  for(const m of ["kv1","kv2"])css.push(`html.${m} .kszf[data-ksz="${k}"]{--kszw:${f.w[m]}px;--kszcap:${f.cap[m]}px}`);
  const bn=Z.pic[f.ban];css.push(`.kszf[data-ksz="${k}"]{--kszpw:${Z.pic[f.pic].w}px;--kszph:${Z.pic[f.pic].h}px;--kszbw:${px(bn.w)};--kszbh:${typeof bn.h==="number"?bn.h+"px":"var(--ksznl)"}}`)}
 for(const m of ["kv1","kv2"])css.push(`html.${m} .kszf{--kszll:${Z.pic.LL.h[m]}px;--ksznl:${Z.pic.NL.h[m]}px}`);
 for(const l in Z.lay){const g=Z.fig[Z.lay[l].fig];css.push(`.kszf[data-lay="${l}"]{--kszfh:${g.h}px;--kszcw:${g.cw}px}`)}
 css.push(`
.kszf,.dlg.kszf{box-sizing:border-box;padding:0;max-height:none;animation:none;width:var(--kszw);max-width:calc(100vw - 20px);background:var(--k-card,#fffaf0);border:1px solid var(--gold,#8f5f0c);border-radius:8px;
 box-shadow:0 0 0 3px #fffaf0,0 0 0 4px #d8c08a,0 8px 22px #3a24124d;display:flex;flex-direction:column;overflow:hidden;font-size:.82rem;color:var(--ink,#2a1a12)}
.kszf>.kph{position:static;flex:none}.kszf>.kph>.kit-x{margin-left:auto;align-self:flex-start}
/* (3) body: figure column and info column centred vertically */
.kszbody{display:flex;gap:12px;padding:10px 12px 12px;max-height:var(--kszcap);box-sizing:border-box;align-items:center;overflow:hidden}
.kszright{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:8px;max-height:calc(var(--kszcap) - 22px);overflow:auto}
/* (1)(6)(7) figure: tag ABOVE the head (kitTitleTag3: rank line 1, name line 2), ONE column width per layout, body height = layout size × KIT_FIG.fac (kszFigFit) */
.kszfig{flex:none;width:var(--kszcw);display:flex;flex-direction:column;align-items:center;gap:2px}
.kszfig>.kt3{text-align:center;width:max-content;max-width:calc(var(--kszcw) + 24px)}
.kszfig>.kszfs{display:block;width:var(--kszcw);height:var(--kszfh);overflow:hidden;position:relative}
.kszfig>.kszfs>img{position:absolute;left:50%;bottom:0;height:100%;width:auto;max-width:none;translate:-50% 0}
/* frame pictures: portrait slot (no person), narrow banner (with person), long-story picture on TOP (XL) */
.kszpic{flex:none;width:var(--kszpw);height:var(--kszph)}
.kszban{width:min(100%,var(--kszbw));height:var(--kszbh);align-self:center;flex:none}
.kszpic>.ksart,.kszban>.ksart{width:100%;height:100%;aspect-ratio:auto}
.kszpic>.ksart img,.kszban>.ksart img,.kszll>.ksart img,.kszbp img{width:100%;height:100%;object-fit:cover;display:block}
.kszll{flex:none;margin:10px 12px 0;height:var(--kszll)}.kszll>.ksart{height:100%;aspect-ratio:auto}
.kszf.kszlong>.kszbody{flex-direction:column;align-items:stretch;max-height:calc(var(--kszcap) - var(--kszll,0px) - 10px)}
.kpkb .krv>.kchip+.kchip{margin-left:4px}
/* (4) options in a frame: one column, every button the same (full) width */
.kszopts{display:flex;flex-direction:column;gap:6px}
.kszgrid2{display:grid;grid-template-columns:1fr 1fr;gap:6px}
/* ---- THE BUTTON (5): row 1 = picture LEFT + name / TỐN / ĐƯỢC / MẤT RIGHT; row 2 = GỢI Ý full-width box ---- */
.kszb{box-sizing:border-box;width:100%;display:flex;flex-direction:column;gap:6px;text-align:left;padding:6px;border:1px solid var(--line,#d2b071);border-radius:6px;background:var(--panel2,#f6ead6);font:inherit;color:inherit;cursor:pointer}
.kszb>.kszbr{display:flex;gap:8px;align-items:center;min-width:0}
.kszbp{flex:none;border-radius:4px;overflow:hidden;border:1px solid var(--gold,#8f5f0c);box-shadow:inset 0 0 0 1px #fffaf0}
.kszbi{min-width:0;display:flex;flex-direction:column;gap:2px}
.kszb .kszbt{font-weight:700;line-height:1.25}
.kszb .kszr{display:flex;gap:6px;align-items:baseline;font-size:.74rem;line-height:1.3}
.kszb .kszr>i,.kszhint>i{font-style:normal;font-size:.64rem;letter-spacing:.04em;color:var(--dim,#6b5643);text-transform:uppercase;flex:none;min-width:34px}
.kszhint{display:flex;gap:6px;align-items:baseline;font-size:.74rem;line-height:1.35;padding:5px 8px;border-radius:4px;background:#fffaf0b3;border:1px dashed var(--line,#d2b071)}
.kszb[data-kbs="S"] .kszbp{width:56px;height:56px}
.kszb[data-kbs="LS"] .kszbp{width:72px;height:72px}
.kszb[data-kbs="LR"] .kszbp{width:84px;height:112px}
.kszskills{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.kszskills .kszbp{width:64px!important;height:64px!important}
/* ---- sample sheet ---- */
#kszsheet{position:fixed;inset:0;z-index:2147483600;overflow:auto;background:#f3e8d4;padding:14px;box-sizing:border-box;font-family:var(--body,sans-serif)}
#kszsheet h2{font:700 1.15rem var(--display,serif);color:#7a1f1a;margin:6px 0 2px}
#kszsheet h3{font:700 .92rem var(--display,serif);color:#5a3a12;margin:14px 0 4px}
#kszsheet .kszn{font-size:.72rem;color:#6b5643;margin:0 0 6px}
#kszsheet .kszrow{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}
#kszsheet .kszlab{font:600 .72rem var(--body);color:#7a1f1a;margin-bottom:4px}
#kszsheet .kszb{position:relative}#kszsheet .kszbt{padding-right:40px}#kszsheet .kszb::after{content:"nút " attr(data-kbs);position:absolute;top:3px;right:4px;font:700 .58rem/1 var(--body);color:#fff;background:#7a1f1a;padding:2px 4px;border-radius:3px}
#kszsheet .kszgrid{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:.74rem;max-width:760px}
#kszsheet .kszgrid b{color:#7a1f1a}`);
 const st=document.createElement("style");st.id="k-size";st.textContent=css.join("\n");document.head.appendChild(st)})();

/* ---- markup builders (data only; used by the sample sheet now, by kpBuild after the owner's OK) ---- */
function kszImg(p){return typeof IMG_BASE!=="undefined"&&/^img\//.test(p)?IMG_BASE+p:p}
/* THE button: {t, pic, rows:[[label,value]…], size?}. "Gợi ý" rows go to the full-width box under the picture + info row. */
function kszBtn(o){const R=o.rows||[],hint=R.filter(r=>/^gợi ý$/i.test(r[0])),main=R.filter(r=>!/^gợi ý$/i.test(r[0]));
 const rows=main.map(([l,v])=>`<span class="kszr"><i>${l}</i><span>${v}</span></span>`).join("");
 const info={rows:main.length,chars:(o.t+main.map(r=>String(r[1]).replace(/<[^>]+>/g,"")).join(" ")).length};
 const k=o.size||kitBtnSize(info);return `<button type="button" class="kszb" data-kbs="${k}"><span class="kszbr"><span class="kszbp">${kitSceneArt(kszImg(o.pic||""),"",{shape:"tall",cap:false})}</span><span class="kszbi"><span class="kszbt">${o.t}</span>${rows}</span></span>${hint.map(([l,v])=>`<span class="kszhint"><i>${l}</i><span>${v}</span></span>`).join("")}</button>`}
/* rank + name of a person for the tag (kitTitle = the one rank / role word; Thái hậu / Hoàng thượng carry no own name) */
function kszRankName(p){if(!p)return["",""];if(typeof S!=="undefined"&&p===S)return[S.out?"Phế phi":RANKS[S.rank].n,S.name];let r="";try{r=kitTitle(p)}catch(e){}if(!r&&(p.kind==="th"||(S&&p===S.thO)))r="Thái hậu";if(!r&&S&&p===S.emp)r="Hoàng thượng";if(!r&&p.queen)r="Hoàng hậu";if(!r&&typeof p.rank==="number"&&typeof RANKS!=="undefined"&&RANKS[p.rank]&&rivals&&rivals.includes(p))r=RANKS[p.rank].n;
 let n=(S&&(p===S.emp||p===S.thO||p.kind==="th"))?"":(p.name||"");try{if(r&&n)n=kitTitledName(r,n)}catch(e){}return[r,n]}
function kszFigHtml(p){let src=kitFigOf(p);if(p&&p.kind==="th"&&(!src||/unknown|sil/.test(src)))src=kszImg("img/fig-thaihau-h1-a51.webp");
 const [r,n]=kszRankName(p);let col="";try{col=kitPersonCol(p)}catch(e){}if(p&&(p.kind==="th"||(S&&(p===S.thO||p===S.emp)))&&typeof kitRankCol==="function")col=kitRankCol(7);
 const tag=typeof kitTitleTag3==="function"?kitTitleTag3(p,r,n,col):kitNameRank(r,n,col);const age=p&&typeof p.age==="number"?p.age:null;
 return `<div class="kszfig">${tag}<span class="kszfs"><img src="${src}" alt="" crossorigin="anonymous" data-age="${age==null?"":age}"></span></div>`}
/* (6) ONE figure scale: the measured BODY (kitFigBody ht → b) of every figure = the layout's body height × KIT_FIG.fac (never the picture box) */
function kszFigFit(root){(root||document).querySelectorAll(".kszf .kszfig>.kszfs>img").forEach(im=>{const f=im.closest(".kszf");const lay=KIT_SIZE.lay[f.dataset.lay||"big"]||KIT_SIZE.lay.big;
 const v=typeof kitFigBody==="function"?kitFigBody(im.src,()=>kszFigFit(f)):null;if(!v)return;const age=im.dataset.age===""?null:+im.dataset.age;
 const body=KIT_SIZE.fig[lay.fig].h*(typeof KIT_FIG==="object"?KIT_FIG.fac(im.src,age):1);const H=body/Math.max(.2,v.b-v.ht);
 im.style.height=H+"px";im.style.bottom=(-(1-v.b)*H)+"px";im.parentElement.style.height=Math.ceil(H*(v.b-v.t))+"px"})}
window.kszFigFit=kszFigFit;
/* spec: {kind,title,sub,who,pic,ban,facts,rows,opts,btn,long} → frame html (size picked after mount by kitFrameApply) */
function kszFrame(sp){const right=[];if(sp.long==null)sp.long=!sp.who&&(sp.facts||[]).join(" ").length>600;
 const info=KIT_SIZE.infoKinds.includes(sp.kind)&&!sp.opts;const lay=KIT_SIZE.kindLay[sp.kind]||"big";
 if(sp.ban)right.push(`<div class="kszban">${kitSceneArt(kszImg(sp.ban),"",{shape:"wide",cap:false})}</div>`);
 if(sp.facts)right.push(kitFacts(sp.facts,{group:false}));if(sp.rows)right.push(kitRows(sp.rows));
 if(sp.opts)right.push(`<div class="kszopts">${sp.opts.map(kszBtn).join("")}</div>`);
 const left=sp.who?kszFigHtml(sp.who):sp.pic&&!sp.long?`<div class="kszpic">${kitSceneArt(kszImg(sp.pic),"",{shape:"tall",cap:false})}</div>`:"";
 const top=sp.long&&sp.pic?`<div class="kszll">${kitSceneArt(kszImg(sp.pic),"",{shape:"wide",cap:false})}</div>`:"";
 let head=kpHeader(sp.kind,sp.title,sp.sub);if(info)head=head.replace(/<\/div>$/,kitXHTML('data-kszx="1"',"Đóng")+"</div>");
 return `<div class="dlg kszf kpanel${sp.long?" kszlong":""}${sp.who?" kszper":""}" data-kind="${sp.kind}" data-lay="${lay}">${head}${top}<div class="kszbody">${left}<div class="kszright">${right.join("")}</div></div>${sp.btn&&!info?`<div class="kszfoot"><button class="kbtn">${sp.btn}</button></div>`:""}</div>`}
window.kszFrame=kszFrame;window.kszBtn=kszBtn;

/* ---- SAMPLE SHEET (kit page §84 + dev/test/kit-size-sheet.js): kitSizeSheet(area) area = "frames" | "buttons" | "long" ---- */
function kszPeople(){const R=typeof liveRivals==="function"?liveRivals(true):[];const qp=typeof queenP==="function"?queenP():null;
 const q=(qp&&qp!==S?qp:null)||R.find(v=>v.queen)||R[0];return{th:{kind:"th",name:"Thái hậu"},q,v2:R.find(v=>v!==q)||q,emp:S&&S.emp}}
function kszOptPic(t){try{const r=kitOptPic(t);return r&&r.src||""}catch(e){return""}}
function kitSizeSheet(area){const kk=window.kitKnown;window.kitKnown=()=>true;/* sample: show the real people, not the stranger silhouette */try{return kszSheet(area)}finally{window.kitKnown=kk}}
function kszSheet(area){const old=document.getElementById("kszsheet");if(old)old.remove();const P=kszPeople(),m=kitSzMode();
 const ch=(l,v,c)=>kitChip(l,v,c);const op=(t,rows)=>({t,pic:kszOptPic(t),rows});
 const Z=KIT_SIZE,F=Z.frame;let h="";
 const tbl=window.kszTbl=k=>{const f=F[k];return `${k}: ${f.w[m]} px wide · body up to ${f.cap[m]} px · portrait picture ${f.pic} ${Z.pic[f.pic].w}x${Z.pic[f.pic].h} · person banner ${f.ban}`};
 if(area==="frames"){
  h+=`<h2>KIT SIZE 1 · Pop-up frames S / M / L / XL + matching figure (${m==="kv2"?"landscape 1180x820":"portrait one page"})</h2>
  <p class="kszn">ONE rule (kitFrameSize): the smallest size whose body holds the content; a person frame also holds its matching figure. No size is set per screen. Every kind (ĐIỀU, LUẬT, VIỆC, KẾT QUẢ, TIN, BÁO, ĐÊM…) uses the same 4 sizes.</p>`;
  const L=[
   ["S","TIN · short news, no person · no \"Đã rõ\" button: tap outside or ✕ closes",{kind:"news",title:"Tin trong cung",sub:"Tháng 3 · Năm 1",pic:"img/ev-tin-don.webp",facts:[{who:P.v2,text:"được lật thẻ bài đêm qua",chips:[["Sủng",3]]},"Tháng này được mùa khắp nơi."],btn:"Đã rõ"}],
   ["S","KẾT QUẢ · person (layout small: figure M) · tag rank / name above the head · no \"Đã hiểu\"",{kind:"result",title:"Kết quả: Thỉnh an",sub:"Thượng tuần · sáng",who:P.q,facts:[{who:P.q,text:"hài lòng vì ta giữ lễ.",chips:[["Thiện cảm",5]]},{who:S,kind:"me",text:"được tiếng hiền thục.",chips:[["Đức",2],["Sức",-10]]}],btn:"Đã hiểu"}],
   ["M","ĐIỀU · person (layout big: figure L) · tag above the head (was: no name) · no \"Đã hiểu\"",{kind:"info",title:"Thái hậu",sub:"Từ Ninh cung",who:P.th,facts:["Thái hậu là mẹ của Hoàng thượng, đứng đầu hậu cung.","Người trọng lễ nghi, ghét kẻ phô trương."],rows:[["Lòng người với ta",[ch("Thiện cảm",12),ch("Đức",3)]],["Thỉnh an mỗi tuần",ch("Thiện cảm",2),"t"],["Dâng kinh chép tay",ch("Thiện cảm",5),"t"]],btn:"Đã hiểu"}],
   ["M","LUẬT · rule with portrait picture, no person · no \"Đã hiểu\"",{kind:"rule",title:"Bổng lộc",pic:"img/ev-trieu-chinh.webp",facts:["Mỗi tháng Nội vụ phủ phát bổng lộc theo phẩm vị.","Phẩm càng cao, bạc càng nhiều."],rows:[["Thường tại",ch("Bạc",20,"g"),"t"],["Quý nhân",ch("Bạc",40,"g"),"t"],["Tần",ch("Bạc",60,"g"),"t"]],btn:"Đã hiểu"}],
   ["L","VIỆC · Hoàng hậu · layout big: same column + same body scale as the Thái hậu VIỆC below · narrow banner NM · buttons same width",{kind:"choice",title:"Hoàng hậu triệu kiến",sub:"Thượng tuần · buổi sáng",who:P.q,ban:"img/ev-hh-viec.webp",facts:[{who:P.q,text:"cho gọi ta đến Khôn Ninh cung, hỏi chuyện đêm qua ta được lật thẻ bài."}],
     opts:[op("Cúi đầu nhận lỗi",[["Được",ch("Thiện cảm",5)],["Mất",ch("Sủng",-1)]]),op("Thưa rằng do Hoàng thượng định",[["Thành",ch("Danh",2)],["Hỏng",ch("Oán",8)]]),op("Dâng lễ vật xin bỏ qua",[["Tốn",ch("Bạc",-20)],["Được",ch("Thiện cảm",8)]])]}],
   ["XL","VIỆC · Thái hậu · SAME layout (column, figure scale); only the info area is bigger · GỢI Ý = full-width box",{kind:"choice",title:"Thái hậu chê dung nhan",sub:"Trung tuần · buổi chiều",who:P.th,ban:"img/ev-thinh-an.webp",facts:[{who:P.th,text:"cho gọi ta đến trước mặt các phi tần, chê ta trang điểm lòe loẹt, không ra dáng người hầu hạ thánh giá."},"Các phi tần đứng quanh, có người che miệng cười."],
     opts:[op("Quỳ xuống nhận lỗi, xin Thái hậu dạy bảo",[["Tốn","1 khắc"],["Được",ch("Thiện cảm",6)+ch("Đức",1)],["Mất",ch("Danh",-1)],["Gợi ý","Thái hậu ưa người biết phận, nhận lỗi trước mặt mọi người thì bà nguôi giận nhanh"]]),op("Thưa rằng phấn son do Nội vụ phủ phát theo phẩm",[["Được",ch("Danh",1)],["Mất",ch("Thiện cảm",-4)],["Gợi ý","nói đúng lý nhưng làm bà mất mặt trước các phi tần"]]),op("Dâng chén trà, đổi sang chuyện kinh Phật",[["Cần","Tài nghệ Trà ≥ 2"],["Được",ch("Thiện cảm",4)],["Gợi ý","nếu trà không ngon bà càng giận"]]),op("Im lặng",[["Mất",ch("Thiện cảm",-2)]])]}]];
  for(const [k,lab,sp] of L)h+=`<div style="margin:10px 0 18px"><div class="kszlab">${lab}</div><div class="kszn" data-ksztbl></div><div data-want="${k}">${kszFrame(sp)}</div></div>`;
  h+=`<h3>(6)(7) ONE figure scale + ONE column per layout: every person's measured BODY = the same height (× 1.07 men); Thái hậu is never bigger than a consort</h3><p class="kszn">Layout "big" (VIỆC · ĐIỀU · LUẬT · BÁO · ĐÊM): figure L body ${Z.fig.L.h} px, column ${Z.fig.L.cw} · layout "small" (KẾT QUẢ · TIN): figure M body ${Z.fig.M.h} px, column ${Z.fig.M.cw}. The frame size S..XL changes only the info area.</p><div class="kszrow" style="align-items:flex-end">${[["Thái hậu",P.th],["Hoàng hậu",P.q],["phi tần",P.v2],["Hoàng thượng",P.emp]].filter(x=>x[1]).map(([l,p])=>`<div><div class="kszlab">${l}</div><div class="kszf" data-lay="big" style="width:auto;box-shadow:none;border:0;background:none">${kszFigHtml(p)}</div></div>`).join("")}</div>`}
 if(area==="buttons"){
  h+=`<h2>KIT SIZE 2 · THE action button + pictures</h2><p class="kszn">ONE button (kszBtn) everywhere: row 1 = picture LEFT + name, TỐN / ĐƯỢC / MẤT RIGHT; row 2 = GỢI Ý in one full-width box. Inside one frame every button is the SAME width and the same class (the largest one needed). The class (kitBtnSize) only sets the picture: S square 56 (≤ 2 rows, ≤ 70 characters) · LS square 72 (≤ 3 rows, ≤ 160) · LR 3:4 84x112 (more). The red tag on each sample = the kit class used.</p>`;
  h+=`<h3>S · in one frame (3.3 / 3.5): same width, square 56</h3><div class="kszopts" style="max-width:380px">${[op("Cúi đầu nhận lỗi",[["Tốn","1 khắc"]]),op("Thưa rằng do Hoàng thượng định",[["Tốn","1 khắc"]]),op("Dâng lễ vật xin bỏ qua",[["Tốn",ch("Bạc",-20)+" 1 khắc"]]),op("Im lặng",[])].map(kszBtn).join("")}</div>`;
  h+=`<h3>LS · square 72 (moderate info)</h3><div class="kszopts" style="max-width:470px">${[op("Tâm sự",[["Tốn","1 khắc"],["Được",ch("Thiện cảm",6)],["Mất",ch("Sức",-5)]]),op("Sai đi dò la",[["Tốn","2 khắc"],["Được","biết 2 điều thật về nàng ta, chứng cứ +1"],["Mất",ch("Thiện cảm",-5)]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>LR · 3:4 picture (a lot of info) + GỢI Ý box under</h3><div class="kszopts" style="max-width:470px">${[op("Quỳ xuống nhận lỗi, xin Thái hậu dạy bảo",[["Cần","Lễ nghi ≥ 2"],["Tốn","1 khắc"],["Được",ch("Thiện cảm",6)+ch("Đức",1)],["Mất",ch("Danh",-1)],["Gợi ý","Thái hậu ưa người biết phận, nhận lỗi trước mặt mọi người thì bà nguôi giận nhanh"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.4 event option in cost mode = THE kit button (was: no picture, hand-drawn chips): picture + GỢI Ý box</h3><div class="kszopts" style="max-width:470px">${[op("Gọi bản cung Thái hậu",[["Gợi ý","an toàn"]]),op("Xin ân cho gia đình",[["Gợi ý","thêm thể diện, có thêm bạc"]]),op("Theo cha mưu đại sự",[["Gợi ý","Hoàng hậu bị phế, thêm thể diện; hỏng thì mất mạng"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.1 / 3.2 Hành sự compact card (§43, narrow Hành sự column, landscape) = THE kit button</h3><div class="kszopts" style="max-width:300px">${[op("Hỏi han ở tẩm cung ta: ai cần giúp?",[["Tốn","1 khắc"],["Được","người ở đây có việc thì ngỏ lời nhờ"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.7 skill cards: square picture, TWO columns</h3><div class="kszskills" style="max-width:560px">${[op("Tự học",[["Tốn","2 khắc · Sức -15"],["Được","tiến bộ một hai phần"]]),op("Học với thầy",[["Tốn","2 khắc · Bạc -15"],["Được","tiến bộ một đến ba phần"]])].map(o=>kszBtn(Object.assign(o,{size:"LS"}))).join("")}</div>`;
  const pv=(k,src,shape)=>{const p=Z.pic[k];const w=typeof p.w==="number"?p.w:420,hh=typeof p.h==="number"?p.h:p.h[m];return `<div><div class="kszlab">${k} · ${typeof p.w==="number"?p.w:"frame width"}x${hh}</div><div style="width:${w}px;height:${hh}px">${kitSceneArt(kszImg(src),"",{shape,cap:false}).replace('class="ksart','style="height:100%;aspect-ratio:auto" class="ksart')}</div></div>`};
  h+=`<h3>Pictures by orientation — portrait 3:4 (3 sizes) · landscape (3 sizes) · narrow strip (3 sizes) · square (buttons, skills)</h3><div class="kszrow" style="align-items:flex-end">${pv("PS","img/ev-trieu-chinh.webp","tall")}${pv("PM","img/ev-trieu-chinh.webp","tall")}${pv("PL","img/ev-trieu-chinh.webp","tall")}</div><div class="kszrow" style="align-items:flex-end;margin-top:10px">${pv("LS","img/ev-hh-viec.webp","wide")}${pv("LM","img/ev-hh-viec.webp","wide")}${pv("LL","img/ev-hh-viec.webp","wide")}</div><h3>(9) NEW narrow landscape strips ≈ 3.5:1 — the banner of a frame that holds a person + info</h3><div class="kszrow" style="align-items:flex-end;margin-top:4px">${pv("NS","img/ev-hh-viec.webp","wide")}${pv("NM","img/ev-hh-viec.webp","wide")}${pv("NL","img/ev-hh-viec.webp","wide")}</div><div class="kszrow" style="align-items:flex-end;margin-top:10px">${pv("Q56","img/ev-trieu-chinh.webp","tall")}${pv("Q64","img/ev-trieu-chinh.webp","tall")}${pv("Q72","img/ev-trieu-chinh.webp","tall")}</div>`}
 if(area==="long"){
  h+=`<h2>KIT SIZE 3 · VIỆC DÀI (long story) = XL, landscape picture on TOP, info + buttons BELOW</h2><p class="kszn">Rule: a frame whose story text does not fit the L body and has no person → XL with the landscape picture LL across the top; text scrolls inside, the picture and the buttons stay.</p>`;
  h+=`<div data-want="XL">${kszFrame({kind:"choice",title:"Việc dài lời kể",sub:"Thượng tuần · buổi sáng",pic:"img/ev-hh-viec.webp",facts:Array.from({length:6},(_,i)=>"Lời kể số "+(i+1)+": người trong cung kể rằng chuyện này kéo dài suốt cả buổi, hết người này đến người khác đến thưa, nên khung phải cuộn phần chữ mà giữ nguyên tiêu đề, tranh và các lựa chọn."),
   opts:[op("Nghe hết rồi mới định",[["Được",ch("Đức",1)]]),op("Cho lui, để mai bàn",[])]})}</div>`}
 if(area==="items")h+=kszItemsSheet();
 h=h.replace(/ loading="lazy"/g,"");const d=document.createElement("div");d.id="kszsheet";d.innerHTML=h;document.body.appendChild(d);
 const fit=()=>(kszFigFit(d),d.querySelectorAll(".kszf.kpanel")).forEach(f=>{const k=kitFrameApply(f);const w=f.parentElement.dataset.want;f.title=k;f.parentElement.dataset.got=k;const t=f.parentElement.previousElementSibling;if(t&&t.hasAttribute("data-ksztbl"))t.textContent="picked → "+tbl(k)});
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
.kszit>.kszgc{position:absolute;left:50%;translate:-50% 50%;bottom:0;white-space:nowrap;z-index:3;font:700 .58rem/1 var(--body,sans-serif);color:#fff;background:var(--kgc);padding:2px 4px;border-radius:3px;box-shadow:0 0 0 1px #fffaf0;pointer-events:none;letter-spacing:.02em}
.kszit[data-s="S"]>.kszgc{font-size:.5rem;padding:1px 3px}
/* (owner 16:10Z) grade chip size follows the item size: S small · M · L · XL LARGE */
.kszit[data-s="L"]>.kszgc{font-size:.7rem;padding:3px 6px}.kszit[data-s="XL"]>.kszgc{font-size:.86rem;padding:4px 8px;border-radius:4px}
.kszit{margin-bottom:.6em}
/* (owner 16:10Z / 16:15Z) Ngự: ONE mark only = the "Ngự tứ" grade chip; the red "Ngự" corner mark is dropped */
.kszit .kits{display:none}
/* (owner 16:15Z) XA XỈ = the game's corner tab (kitItem lux) made a SQUARE box: the word on line 1, the number on line 2; number only when the tile is too small (S) */
.kszit .kitx{position:absolute;top:3px;right:3px;left:auto;box-sizing:border-box;aspect-ratio:1;width:auto;min-width:2.5em;height:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:2px;white-space:nowrap;text-align:center;line-height:1;font-size:.5rem;border-radius:3px}
.kszit .kitx>b{font-size:1.25em}.kszit[data-s="S"] .kitx{min-width:1.9em}.kszit[data-s="S"] .kitx>.kxw{display:none}
.kszit[data-s="L"] .kitx{font-size:.62rem}.kszit[data-s="XL"] .kitx{font-size:.78rem}
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
 let lux=0;try{lux=typeof luxVal==="function"?luxVal(k):0}catch(e){}const it=kitItem({src:I.src,name:"",grade:I.grade,size:KSZ_ITEM[size],frame:true,lux:lux||0}).replace(/>Xa xỉ (\d+)<\/i>/,'><span class="kxw">Xa xỉ</span><b>$1</b></i>');
 return `<span class="kszit" data-s="${size}">${it}<b class="kszgc" style="--kgc:${G.c}">${I.gname||G.n}</b></span>`}
function kszItemDetail(k){const I=kitItemInfo(k);const tmp=document.createElement("div");tmp.innerHTML=kitItemDetail(k,{cls:"kidet-strip"});
 const rows=[...tmp.querySelectorAll(".kidrows .kr")];const fx=[],loss=[],keep=[];let kind="";
 for(const r of rows){const l=(r.querySelector(".krl")||{}).textContent||"";const v=r.querySelector(".krv");
  if(/^(Được|dùng)/i.test(l))fx.push(v.innerHTML);else if(/^(Mất|Kèm)/i.test(l))loss.push(v.innerHTML);else if(/^Loại/.test(l))kind=v.textContent;else if(/^(Phẩm|Xa xỉ)/.test(l)){}else keep.push(r.outerHTML)}

 return `<div class="kszidc"><div class="kszidh">${kszItemTile(k,"M")}<div class="kszidt"><b style="color:${I.col||"inherit"}">${I.name}</b><span class="kszk">${kind||tmp.querySelector(".kidkind")?.textContent||""}</span><span class="kszfx">${fx.join('<span class="ksep">·</span>')}</span>${loss.length?`<span class="kszfx kszloss">${loss.join('<span class="ksep">·</span>')}</span>`:""}</div></div>${keep.length?`<span class="kb kpkb">${keep.join("")}</span>`:""}</div>`}
function kszItemsSheet(){const ks=["tramngoc","vongngoc","luahang","nhansam","thu"].concat(typeof WD_ITEMS==="object"?["y_haiduong","nt_nhuy"]:[]).filter(k=>{try{return kitItemInfo(k)}catch(e){return false}});
 let h=`<h2>KIT SIZE 4 · Items (owner part 2: 6.2 · 6.3 · 6.5) + thumbnails (7.1) + placeholder sets (7.3)</h2>`;
 h+=`<h3>Item sizes · GRADE chip centred ON the frame\'s bottom edge, chip size follows the item size (XL = large chip) · Xa xỉ square box (word / number; S: number only) · Ngự: only the "Ngự tứ" chip</h3><div class="kszrow" style="align-items:flex-end">${["S","M","L","XL"].map(s=>`<div><div class="kszlab">${s}${s==="S"?" (proposal: drop)":""}</div>${kszItemTile(ks[1]||ks[0],s)}</div>`).join("")}</div>`;
 const ng=Object.keys(IT).find(k=>{try{return kitItemInfo(k).grade===4}catch(e){return false}});if(ng)h+=`<div class="kszrow" style="align-items:flex-end;margin-top:8px">${["S","M","L","XL"].map(s=>`<div><div class="kszlab">Ngự · ${s}</div>${kszItemTile(ng,s)}</div>`).join("")}</div>`;
 h+=`<h3>6.2 item detail card: kind on the upper row, gains / losses below; Xa xỉ = the square box ON the item frame (no text row)</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px;max-width:1120px">${ks.map(kszItemDetail).join("")}</div>`;
 const pk=Object.keys(IT).filter(k=>!IT[k].story&&IT[k].sl).slice(0,6);
 h+=`<h3>6.3 pick grid (Tặng quà · Dâng quà · Cài đồ): picture + name + effects only; full info on tap</h3><div class="kszpick" style="max-width:640px">${pk.map(k=>{const I=kipItem({k});const use=String(I.use||"").replace(/^[^:]*:\s*/,"");return `<div>${kszItemTile(k,"M")}<b style="color:${I.col}">${I.name}</b><small>${use}</small></div>`}).join("")}</div>`;
 h+=`<h3>6.5 item tag in events: tile with grade chip, name only</h3><div class="kszrow">${pk.slice(0,6).map(k=>`<div style="text-align:center;width:64px">${kszItemTile(k,"S")}<div style="font-size:.68rem">${kitItemInfo(k).name}</div></div>`).join("")}</div>`;
 const Z=KIT_SIZE.pic,m=kitSzMode();const box=(k,src)=>{const p=Z[k];const w=typeof p.w==="number"?p.w:300,hh=typeof p.h==="number"?p.h:p.h[m];return `<div><div class="kszlab">${k} ${w}x${hh}</div><div style="width:${w}px;height:${hh}px">${kitSceneArt(kszImg(src),"",{shape:w<hh?"tall":"wide",cap:false}).replace('class="ksart','style="height:100%;aspect-ratio:auto" class="ksart')}</div></div>`};
 h+=`<h3>7.1 thumbnails = the picture size table (replaces wide / tall / thumb): portrait PS · PM · PL · landscape LS · LM · LL · square Q56 · Q64 · Q72</h3><div class="kszrow" style="align-items:flex-end">${["PS","PM","PL"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}${["LS","LM"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}${["Q56","Q64","Q72"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}</div>`;
 h+=`<h3>7.3 placeholder pictures: ONE set per real orientation (portrait 3:4 · landscape · square) × tone (light · dark), shown at every size of that orientation</h3><p class="kszn">Today: 2 event (640x480) + 2 act (384x506) pictures stretched into every slot. Spec: ph-{light,dark}-{p,l,q}.webp painted at the largest size of its orientation (PL 162x216 → 3:4 at 486x648, LL 860x260 → 3.3:1 at 1720x520, Q72 → 1:1 at 288x288) — ART REQUEST → Foreman C (all drawing is C's, OD 15:35Z). Below: the slots with today's pictures.</p>`;
 h+=`<div>${[["portrait","img/ph-act-light.webp",["PS","PM","PL"]],["landscape","img/ph-event-light.webp",["LS","LM","LL"]],["square","img/ph-act-dark-v2.webp",["Q56","Q64","Q72"]]].map(([n,src,L])=>`<div class="kszlab">${n}</div><div class="kszrow" style="align-items:flex-end;margin-bottom:10px">${L.map(k=>box(k,src)).join("")}</div>`).join("")}</div>`;
 return h}
