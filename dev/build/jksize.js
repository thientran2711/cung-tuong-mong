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
function kszImg(p){p=String(p||"");if(p.indexOf("://")>0)return p;return typeof IMG_BASE!=="undefined"&&p.slice(0,4)==="img/"?IMG_BASE+p:p}
/* THE button: {t, pic, rows:[[label,value]…], size?}. "Gợi ý" rows go to the full-width box under the picture + info row. */
function kszBtn(o){const R=o.rows||[],hint=R.filter(r=>/^gợi ý$/i.test(r[0])),main=R.filter(r=>!/^gợi ý$/i.test(r[0]));
 const rows=main.map(([l,v])=>`<span class="kszr"><i>${l}</i><span>${v}</span></span>`).join("");
 const info={rows:main.length,chars:(o.t+main.map(r=>String(r[1]).replace(/<[^>]+>/g,"")).join(" ")).length};
 const k=o.size||kitBtnSize(info);return `<button type="button" class="kszb" data-kbs="${k}"><span class="kszbr"><span class="kszbp">${kitSceneArt(kszImg(o.pic||""),"",{shape:"tall",cap:false})}</span><span class="kszbi"><span class="kszbt">${o.t}</span>${rows}</span></span>${hint.map(([l,v])=>`<span class="kszhint"><i>${l}</i><span>${v}</span></span>`).join("")}</button>`}
/* rank + name of a person for the tag (kitTitle = the one rank / role word; Thái hậu / Hoàng thượng carry no own name) */
function kszRankName(p){if(!p)return["",""];if(typeof S!=="undefined"&&p===S)return[S.out?"Phế phi":RANKS[S.rank].n,S.name];let r="";try{r=kitTitleOf(p)}catch(e){}if(!r&&(p.kind==="th"||(S&&p===S.thO)))r="Thái hậu";if(!r&&S&&p===S.emp)r="Hoàng thượng";if(!r&&p.queen)r="Hoàng hậu";if(!r&&typeof p.rank==="number"&&typeof RANKS!=="undefined"&&RANKS[p.rank]&&rivals&&rivals.includes(p))r=RANKS[p.rank].n;
 let n=(S&&(p===S.emp||p===S.thO||p.kind==="th"))?"":(p.name||"");try{if(r&&n)n=kitTitledName(r,n)}catch(e){}/* review r1: a person whose name she does not know yet prints "???" on line 2 (as the 32.7 column does); never the half-masked "Bùi Thị vệ ???" the global name mask made of a bare name */try{if(n&&!(S&&(p===S||p===S.emp||p===S.thO||p.kind==="th"))&&typeof kitKnownName==="function"&&!kitKnownName(p))n="???"}catch(e){}return[r,n]}
function kszFigHtml(p){let src=kitFigOf(p);if(p&&p.kind==="th"&&(!src||/unknown|sil/.test(src)))src=kszImg("img/fig-thaihau-h1-a51.webp");
 const [r,n]=kszRankName(p);let col="";try{col=kitPersonCol(p)}catch(e){}if(p&&(p.kind==="th"||(S&&(p===S.thO||p===S.emp)))&&typeof kitRankCol==="function")col=kitRankCol(7);
 const tag=typeof kitTitleTag3==="function"?kitTitleTag3(p,r,n,col):kitNameRank(r,n,col);const age=p&&typeof p.age==="number"?p.age:null;
 return `<div class="kszfig">${tag}<span class="kszfs"><img src="${src}" alt="" crossorigin="anonymous" data-age="${age==null?"":age}"></span></div>`}
/* (6) ONE figure scale: the measured BODY (kitFigBody ht → b) of every figure = the layout's body height × KIT_FIG.fac (never the picture box) */
function kszFigFit(root){(root||document).querySelectorAll(".kszf .kszfig>.kszfs>img").forEach(im=>{const f=im.closest(".kszf");const lay=KIT_SIZE.lay[f.dataset.lay||"big"]||KIT_SIZE.lay.big;
 const v=typeof kitFigBody==="function"?kitFigBody(im.src,()=>kszFigFit(f)):null;if(!v)return;const age=im.dataset.age===""?null:+im.dataset.age;
 const body=KIT_SIZE.fig[lay.fig].h*(typeof KIT_FIG==="object"?KIT_FIG.fac(im.src,age):1)*(f.__kszShrink||1);/* KIT 32.8 feet-fit: ×shrink only when the frame cap would cut the feet (kszFeetFit) */const H=body/Math.max(.2,v.b-kitFigTop(v));
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
     opts:[op("Quỳ xuống nhận lỗi, xin Thái hậu dạy bảo",[["Tốn",`${BAL.kitpage.demo.k} khắc`],["Được",ch("Thiện cảm",6)+ch("Đức",1)],["Mất",ch("Danh",-1)],["Gợi ý","Thái hậu ưa người biết phận, nhận lỗi trước mặt mọi người thì bà nguôi giận nhanh"]]),op("Thưa rằng phấn son do Nội vụ phủ phát theo phẩm",[["Được",ch("Danh",1)],["Mất",ch("Thiện cảm",-4)],["Gợi ý","nói đúng lý nhưng làm bà mất mặt trước các phi tần"]]),op("Dâng chén trà, đổi sang chuyện kinh Phật",[["Cần","Tài nghệ Trà ≥ 2"],["Được",ch("Thiện cảm",4)],["Gợi ý","nếu trà không ngon bà càng giận"]]),op("Im lặng",[["Mất",ch("Thiện cảm",-2)]])]}]];
  for(const [k,lab,sp] of L)h+=`<div style="margin:10px 0 18px"><div class="kszlab">${lab}</div><div class="kszn" data-ksztbl></div><div data-want="${k}">${kszFrame(sp)}</div></div>`;
  h+=`<h3>(6)(7) ONE figure scale + ONE column per layout: every person's measured BODY = the same height (× 1.07 men); Thái hậu is never bigger than a consort</h3><p class="kszn">Layout "big" (VIỆC · ĐIỀU · LUẬT · BÁO · ĐÊM): figure L body ${Z.fig.L.h} px, column ${Z.fig.L.cw} · layout "small" (KẾT QUẢ · TIN): figure M body ${Z.fig.M.h} px, column ${Z.fig.M.cw}. The frame size S..XL changes only the info area.</p><div class="kszrow" style="align-items:flex-end">${[["Thái hậu",P.th],["Hoàng hậu",P.q],["phi tần",P.v2],["Hoàng thượng",P.emp]].filter(x=>x[1]).map(([l,p])=>`<div><div class="kszlab">${l}</div><div class="kszf" data-lay="big" style="width:auto;box-shadow:none;border:0;background:none">${kszFigHtml(p)}</div></div>`).join("")}</div>`}
 if(area==="buttons"){
  h+=`<h2>KIT SIZE 2 · THE action button + pictures</h2><p class="kszn">ONE button (kszBtn) everywhere: row 1 = picture LEFT + name, TỐN / ĐƯỢC / MẤT RIGHT; row 2 = GỢI Ý in one full-width box. Inside one frame every button is the SAME width and the same class (the largest one needed). The class (kitBtnSize) only sets the picture: S square 56 (≤ 2 rows, ≤ 70 characters) · LS square 72 (≤ 3 rows, ≤ 160) · LR 3:4 84x112 (more). The red tag on each sample = the kit class used.</p>`;
  h+=`<h3>S · in one frame (3.3 / 3.5): same width, square 56</h3><div class="kszopts" style="max-width:380px">${[op("Cúi đầu nhận lỗi",[["Tốn",`${BAL.kitpage.demo.k} khắc`]]),op("Thưa rằng do Hoàng thượng định",[["Tốn",`${BAL.kitpage.demo.k} khắc`]]),op("Dâng lễ vật xin bỏ qua",[["Tốn",ch("Bạc",-20)+` ${BAL.kitpage.demo.k} khắc`]]),op("Im lặng",[])].map(kszBtn).join("")}</div>`;
  h+=`<h3>LS · square 72 (moderate info)</h3><div class="kszopts" style="max-width:470px">${[op("Tâm sự",[["Tốn",`${BAL.kitpage.demo.k} khắc`],["Được",ch("Thiện cảm",6)],["Mất",ch("Sức",-5)]]),op("Sai đi dò la",[["Tốn",`${BAL.kitpage.demo.study.k} khắc`],["Được","biết 2 điều thật về nàng ta, chứng cứ +1"],["Mất",ch("Thiện cảm",-5)]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>LR · 3:4 picture (a lot of info) + GỢI Ý box under</h3><div class="kszopts" style="max-width:470px">${[op("Quỳ xuống nhận lỗi, xin Thái hậu dạy bảo",[["Cần","Lễ nghi ≥ 2"],["Tốn",`${BAL.kitpage.demo.k} khắc`],["Được",ch("Thiện cảm",6)+ch("Đức",1)],["Mất",ch("Danh",-1)],["Gợi ý","Thái hậu ưa người biết phận, nhận lỗi trước mặt mọi người thì bà nguôi giận nhanh"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.4 event option in cost mode = THE kit button (was: no picture, hand-drawn chips): picture + GỢI Ý box</h3><div class="kszopts" style="max-width:470px">${[op("Gọi bản cung Thái hậu",[["Gợi ý","an toàn"]]),op("Xin ân cho gia đình",[["Gợi ý","thêm thể diện, có thêm bạc"]]),op("Theo cha mưu đại sự",[["Gợi ý","Hoàng hậu bị phế, thêm thể diện; hỏng thì mất mạng"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.1 / 3.2 Hành sự compact card (§43, narrow Hành sự column, landscape) = THE kit button</h3><div class="kszopts" style="max-width:300px">${[op("Hỏi han ở tẩm cung ta: ai cần giúp?",[["Tốn",`${BAL.kitpage.demo.k} khắc`],["Được","người ở đây có việc thì ngỏ lời nhờ"]])].map(kszBtn).join("")}</div>`;
  h+=`<h3>3.7 skill cards: square picture, TWO columns</h3><div class="kszskills" style="max-width:560px">${[op("Tự học",[["Tốn",`${BAL.kitpage.demo.study.k} khắc · Sức -${BAL.kitpage.demo.study.suc}`],["Được","tiến bộ một hai phần"]]),op("Học với thầy",[["Tốn",`${BAL.kitpage.demo.study.k} khắc · Bạc -${BAL.kitpage.demo.study.bac}`],["Được","tiến bộ một đến ba phần"]])].map(o=>kszBtn(Object.assign(o,{size:"LS"}))).join("")}</div>`;
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
/* grade chip = kitItem's own chip ON the frame (KIT §54.1b), scaled with the frame; no sample-only chip */
.kszit{margin-bottom:.6em}
/* (owner 16:10Z / 16:15Z) Ngự: ONE mark only = the "Ngự tứ" grade chip; the red "Ngự" corner mark is dropped */
.kszit .kits{display:none}
/* (owner 16:15Z) XA XỈ = the game's corner tab (kitItem lux) made a SQUARE box: the word on line 1, the number on line 2; number only when the tile is too small (S) */
.kszit .kitx{position:absolute;top:3px;right:3px;left:auto;box-sizing:border-box;aspect-ratio:1;width:auto;min-width:2.5em;height:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:2px;white-space:nowrap;text-align:center;line-height:1;font-size:.5rem;border-radius:3px}
.kszit .kitx>b{font-size:1.25em}.kszit[data-s="S"] .kitx{min-width:1.9em}.kszit[data-s="S"] .kitx>.kxw{display:none}
.kszit[data-s="L"] .kitx{font-size:.62rem}.kszit[data-s="XL"] .kitx{font-size:.78rem}
.kszit .kitn{display:none}
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
 let lux=0;try{lux=typeof luxVal==="function"?luxVal(k):0}catch(e){}const it=kitItem({src:I.src,name:"",grade:I.grade,gname:I.gname,size:KSZ_ITEM[size],frame:true,lux:lux||0});
 return `<span class="kszit" data-s="${size}">${it}</span>`}
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
 const pk=Object.keys(IT).filter(k=>!itm(k).story&&itm(k).sl).slice(0,6);
 h+=`<h3>6.3 pick grid (Tặng quà · Dâng quà · Cài đồ): picture + name + effects only; full info on tap</h3><div class="kszpick" style="max-width:640px">${pk.map(k=>{const I=kipItem({k});const use=String(I.use||"").replace(/^[^:]*:\s*/,"");return `<div>${kszItemTile(k,"M")}<b style="color:${I.col}">${I.name}</b><small>${use}</small></div>`}).join("")}</div>`;
 h+=`<h3>6.5 item tag in events: tile with grade chip, name only</h3><div class="kszrow">${pk.slice(0,6).map(k=>`<div style="text-align:center;width:64px">${kszItemTile(k,"S")}<div style="font-size:.68rem">${kitItemInfo(k).name}</div></div>`).join("")}</div>`;
 const Z=KIT_SIZE.pic,m=kitSzMode();const box=(k,src)=>{const p=Z[k];const w=typeof p.w==="number"?p.w:300,hh=typeof p.h==="number"?p.h:p.h[m];return `<div><div class="kszlab">${k} ${w}x${hh}</div><div style="width:${w}px;height:${hh}px">${kitSceneArt(kszImg(src),"",{shape:w<hh?"tall":"wide",cap:false}).replace('class="ksart','style="height:100%;aspect-ratio:auto" class="ksart')}</div></div>`};
 h+=`<h3>7.1 thumbnails = the picture size table (replaces wide / tall / thumb): portrait PS · PM · PL · landscape LS · LM · LL · square Q56 · Q64 · Q72</h3><div class="kszrow" style="align-items:flex-end">${["PS","PM","PL"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}${["LS","LM"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}${["Q56","Q64","Q72"].map(k=>box(k,"img/ev-trieu-chinh.webp")).join("")}</div>`;
 h+=`<h3>7.3 placeholder pictures: ONE set per real orientation (portrait 3:4 · landscape · square) × tone (light · dark), shown at every size of that orientation</h3><p class="kszn">Today: 2 event (640x480) + 2 act (384x506) pictures stretched into every slot. Spec: ph-{light,dark}-{p,l,q}.webp painted at the largest size of its orientation (PL 162x216 → 3:4 at 486x648, LL 860x260 → 3.3:1 at 1720x520, Q72 → 1:1 at 288x288) — ART REQUEST → Foreman C (all drawing is C's, OD 15:35Z). Below: the slots with today's pictures.</p>`;
 h+=`<div>${[["portrait","img/ph-act-light.webp",["PS","PM","PL"]],["landscape","img/ph-event-light.webp",["LS","LM","LL"]],["square","img/ph-act-dark-v2.webp",["Q56","Q64","Q72"]]].map(([n,src,L])=>`<div class="kszlab">${n}</div><div class="kszrow" style="align-items:flex-end;margin-bottom:10px">${L.map(k=>box(k,src)).join("")}</div>`).join("")}</div>`;
 return h}

/* ================= v3 · kit-size #3 (owner 16/11 16:45Z s20, OD "(16/11 16:45Z, s20 chat)" (1)–(6)) =================
   (1) EVERY frame shows BOTH the person AND the event picture (the event picture = the real game path: the event's own picture, else
       kitDefaultBanner(m,kind), jk4 §50.3 OD:L448). A frame with no person of its own gets its NARRATOR (BAL.staff.narrator, owner 16/11 19:23Z: the named
       palace official whose office covers the topic — Quản sự ma ma, Chưởng sự cô cô, Tổng quản thái giám, Kính sự phòng; jstaff).
   (2) every kind comes in S / M / L / XL and EACH SIZE HAS ITS OWN PRESENTATION (KIT_SIZE.v3.pres):
       S  = "one": ONE main picture LEFT, chosen by what the frame is about (KIT_SIZE.v3.focus):
            event-centred → the event picture LEFT (stretched to the body height), the person = small kit avatar (mdH) inside the info;
            person-centred → the person's portrait frame LEFT (pcPort, tag above), the event picture = a small strip at the top of the info.
       M / L / XL = "fig": the FULL FIGURE left (figure M / L / XL) + the event picture TOP-RIGHT, as wide as the info + button column.
       No empty space: the body is exactly as tall as its left column; the event picture in the info column GROWS to fill what the
       text leaves (never smaller than its subject needs); content taller than the left column → the next size (XL scrolls inside).
   (3) event pictures are cropped around their SUBJECT (KIT_PIC_SUBJ, box in 0..1 of the picture): the crop is centred on it and the
       strip is never shorter than the subject (ev-hh-viec: the gold seal whole). Pictures without a box: centred, smallest strip.
   (4) BUTTONS: the frame layout first, then its button area = a GRID: cell ≥ KIT_SIZE.v3.btn.cellS (140) → cols = what fits the
       area (S: the whole frame width under the body; M/L/XL: the info column). A short button (class S: ≤ 2 rows, ≤ 70 chars) takes ONE
       cell; a long one (LS / LR) takes the cells it needs for ≥ cellLong (280) (full row on narrow frames). So "Im lặng" is one compact cell.
   ONE builder kszFrame3(spec,size), ONE picker kitFramePick3(spec,host), ONE fitter kitFrameApply3(dlg). Nobody sets a size per screen. */
KIT_SIZE.v3={
 focus:{news:"event",rule:"event",notice:"event",night:"event",intel:"event",evidence:"event",reward:"event",week:"event",
        info:"person",result:"person",choice:"person",threat:"person",person:"person",end:"person"},
 /* narrator map = BAL.staff.narrator (jbal, one core; owner 16/11 19:23Z: the palace official whose office covers the topic); this is only the
    fallback when BAL has no map */
 narrator:{news:"kn",notice:"kn",week:"kn",choice:"kn",rule:"tn",info:"tn",evidence:"tn",night:"ksp",reward:"tq",intel:"maid",threat:"maid",person:"maid",end:"me",result:"me"},
 pres:{S:"one",M:"fig",L:"fig",XL:"fig"},
 /* S = small content: body up to bodyS, body + its button rows up to capS */
 bodyS:200,capS:{kv1:340,kv2:340},
 colS:104,porS:88,picS:"PM",picMinS:KIT_SIZE.pic.PM.h,evMin:{one:46,fig:56},subjPad:.04,
 btn:{cellS:140,cellLong:280,gap:6,txtMin:200}};
/* v3 figure sizes (measured BODY px, × KIT_FIG.fac) of the "fig" presentations: big enough that M holds more than S, L more than M, XL more than L */
KIT_SIZE.fig3={M:{h:300,cw:140},L:{h:370,cw:162},XL:{h:480,cw:220}};Object.assign(KIT_SIZE.fig,{M3:KIT_SIZE.fig3.M,L3:KIT_SIZE.fig3.L,XL3:KIT_SIZE.fig3.XL});
Object.assign(KIT_SIZE.lay,{M:{fig:"M3"},L:{fig:"L3"},XL:{fig:"XL3"}});
/* subject boxes of EVERY event picture (ev-*, info-*, act-cat-*: 329, each one looked at, 16/11 s23) [x0,y0,x1,y1] (0..1). One registry; a picture added later MUST get its box here (test kit-size7-focus.js fails a picture without one). */
const KIT_PIC_SUBJ={"act-cat-ban-thuong":[.05,.2,.98,.75],"act-cat-bong-de-dang-h":[.15,.3,.6,.7],"act-cat-buon-ban":[0,.45,.95,.92],"act-cat-cham-con":[.1,.3,.95,.85],"act-cat-di-lai":[.3,.15,.7,.6],"act-cat-giao-thiep":[.1,.18,.95,.65],"act-cat-giu-con-tin-h":[.1,.25,.95,.7],"act-cat-hai-nguoi":[.1,.35,.75,.65],"act-cat-hau-ha":[0,.25,.8,.75],"act-cat-hoc-tap":[0,.4,1,.85],"act-cat-le-nghi":[.2,.25,.85,.9],"act-cat-muu-ke":[.1,.4,1,.85],"act-cat-nghi-ngoi":[.1,.4,1,.9],"act-cat-sung-ai":[0,.2,.95,.85],"act-cat-tai-nghe":[0,.3,.95,.75],"act-cat-trang-diem":[.15,.05,.85,.88],"act-cat-trieu-chinh":[0,.3,.95,.8],"act-cat-tu-tinh":[.05,.35,.95,.85],"act-cat-y-duoc":[.15,.25,.75,.8],"ev-am-muu":[.1,.2,.85,.8],"ev-bac-tien":[0,.3,1,.95],"ev-benh-tat":[0,.3,.9,.85],"ev-bien-ai":[0,.2,.95,.7],"ev-bien-ai-2":[0,.4,1,.95],"ev-canh-phong":[.36,.25,.6,.75],"ev-ch1":[.15,.1,.92,.7],"ev-ch2":[.2,.1,.95,.75],"ev-chuyen-la":[.4,.4,.95,.85],"ev-con-tre":[.02,.38,.9,.9],"ev-con-tre-2":[.1,.45,.95,.92],"ev-cung-nhan":[.5,.28,.9,.75],"ev-cung-nu":[.05,.25,.6,.75],"ev-cung-nu-2":[.3,.5,1,.95],"ev-cyrep":[.2,.1,.95,.85],"ev-dai-xa":[.4,.4,1,.9],"ev-dau-doc":[.05,.4,.95,.72],"ev-di-san":[0,.3,.9,.75],"ev-dich-benh":[.15,.3,.85,.95],"ev-dieu-lanh":[.05,.3,.95,.85],"ev-dieu-troi":[.1,.05,.9,.65],"ev-duoc-mua":[.2,.25,1,.8],"ev-e68-allyoffer":[.1,.15,.6,.7],"ev-e68-autumnmoon":[.2,.1,.85,.7],"ev-e68-bordernews":[.3,.25,.75,.75],"ev-e68-borrowdress":[.05,.1,.85,.7],"ev-e68-clanfather":[.1,.15,.9,.85],"ev-e68-doccheck":[.15,.15,.85,.75],"ev-e68-doubtvisit":[.15,.1,.95,.7],"ev-e68-droughtprayer":[.45,.1,.98,.85],"ev-e68-embroidery":[.3,.15,.9,.8],"ev-e68-envoygift":[.2,.15,.8,.75],"ev-e68-eunrequest":[.15,.15,.95,.85],"ev-e68-faminedonate":[.1,.2,.9,.75],"ev-e68-flowerbloom":[.05,.35,.85,.85],"ev-e68-fortunenun":[.4,.2,.95,.75],"ev-e68-giftarrive":[.1,.1,.95,.75],"ev-e68-heatstroke":[.15,.2,.65,.7],"ev-e68-hhsummons":[.4,.2,.95,.8],"ev-e68-kindvisit":[.2,.1,.9,.75],"ev-e68-leakroof":[.1,.25,.95,.85],"ev-e68-letterhome":[.3,.1,.72,.72],"ev-e68-lotusseason":[.15,.1,.85,.8],"ev-e68-musician":[.3,.15,.9,.75],"ev-e68-newgirladvice":[.1,.1,.95,.75],"ev-e68-officialwife":[.05,.1,.95,.8],"ev-e68-painter":[.15,.1,.85,.8],"ev-e68-poisonedfish":[.2,.05,.9,.85],"ev-e68-proudvisit":[.1,.1,.9,.75],"ev-e68-rumoremplove":[0,.2,.85,.8],"ev-e68-rumorfavor":[.1,.1,.95,.75],"ev-e68-rumorpreg":[.15,.15,.85,.8],"ev-e68-rumorth":[.15,.15,.85,.8],"ev-e68-servhero":[.3,.3,.85,.85],"ev-e68-servleave":[.2,.15,.95,.85],"ev-e68-sickservant":[0,.15,.65,.9],"ev-e68-silkallot":[.1,.1,.75,.75],"ev-e68-snowday":[.1,.25,.85,.85],"ev-e68-spoiledfood":[.05,.25,.75,.95],"ev-e68-springallergy":[.15,.1,.95,.8],"ev-e68-stormnight":[.1,.25,.9,.85],"ev-e68-straycat":[.35,.3,.92,.75],"ev-e68-templerite":[.05,.25,.75,.85],"ev-e68-thmama":[.15,.1,.9,.75],"ev-evpick":[.25,.2,.9,.85],"ev-fest-doanngo":[.1,.4,.8,.92],"ev-fest-doanngo-b":[.03,.35,.7,.9],"ev-fest-dongchi":[0,.45,.75,.95],"ev-fest-dongchi-b":[.05,.5,.95,.9],"ev-fest-giaothua":[0,.1,.95,.7],"ev-fest-giaothua-b":[0,.15,.95,.85],"ev-fest-lapbat":[0,.45,.95,.92],"ev-fest-lapbat-b":[.1,.35,.95,.85],"ev-fest-newyear":[.2,.2,.85,.95],"ev-fest-newyear-b":[.3,.15,.85,.85],"ev-fest-nguyentieu":[.1,.05,.8,.75],"ev-fest-nguyentieu-b":[0,.15,.9,.75],"ev-fest-phoenix":[.1,.3,.95,.75],"ev-fest-phoenix-b":[.05,.3,.98,.75],"ev-fest-thanhminh":[.1,.4,.85,.8],"ev-fest-thanhminh-b":[.15,.35,.85,.8],"ev-fest-thanhtho":[.2,.2,1,.9],"ev-fest-thanhtho-b":[.1,.2,1,.75],"ev-fest-thattich":[0,.1,.95,.75],"ev-fest-thattich-b":[.15,.1,.95,.75],"ev-fest-trungcuu":[0,.1,.6,.92],"ev-fest-trungcuu-b":[0,.15,.6,.85],"ev-fest-trungthu":[.4,.15,.95,.8],"ev-fest-trungthu-b":[.3,.05,.85,.8],"ev-fest-vantho":[.12,.15,.88,.55],"ev-fest-vantho-b":[.2,.4,.95,.92],"ev-fest-vulan":[0,.45,.6,.95],"ev-fest-vulan-b":[.2,.3,.85,.85],"ev-giftpick":[.3,.35,.8,.9],"ev-hai-thai":[.2,.52,.92,.8],"ev-han-han":[.05,.3,.7,.9],"ev-hao-huu":[.33,.15,.68,.75],"ev-hh-viec":[.42,.22,.79,.5],"ev-hh-viec-2":[.05,.35,.95,.85],"ev-hinh-phat":[.18,.15,.85,.9],"ev-hoa-hoan":[.42,.22,1,.65],"ev-hoa-than":[.3,.4,.9,.95],"ev-hoang-de-dem":[.3,.25,.75,.8],"ev-hoang-de-gian":[.5,.2,.9,.7],"ev-hoang-de-vui":[.1,.2,.7,.65],"ev-hoang-de-vui-2":[.05,.45,.75,.9],"ev-hoi-lo":[.05,.35,.75,.75],"ev-j70thr":[.2,.1,.65,.6],"ev-j71f-doanngo":[.2,.1,.85,.8],"ev-j71f-dongchi":[.1,.3,.75,.8],"ev-j71f-giaothua":[.2,.1,.85,.8],"ev-j71f-lapbat-1":[.3,.2,.75,.95],"ev-j71f-lapbat-2":[.3,.25,.7,.85],"ev-j71f-lapbat-3":[.15,.15,.8,.85],"ev-j71f-newyear":[.25,.1,.6,.7],"ev-j71f-nguyentieu":[.3,.2,.8,.8],"ev-j71f-phoenix":[.25,.15,.98,.65],"ev-j71f-thanhminh":[.25,.2,.75,.75],"ev-j71f-thanhtho-1":[.15,.3,.85,.85],"ev-j71f-thanhtho-2":[.25,.15,.85,.8],"ev-j71f-thanhtho-3":[.45,.25,1,.85],"ev-j71f-thanhtho-4":[.15,.3,.85,.85],"ev-j71f-thanhtho-5":[.15,.3,.85,.85],"ev-j71f-thanhtho-6":[.2,.25,.8,.9],"ev-j71f-thattich":[.2,.25,.85,.8],"ev-j71f-trungcuu":[.15,.2,.75,.7],"ev-j71f-trungthu":[.15,.2,.8,.75],"ev-j71f-vantho-1":[.3,.1,.85,.7],"ev-j71f-vantho-2":[.3,.15,.95,.8],"ev-j71f-vantho-3":[.1,.25,.9,.95],"ev-j71f-vantho-4":[.15,.25,.85,.85],"ev-j71f-vulan":[.15,.25,.75,.95],"ev-j71x-sac":[.2,.2,.9,.85],"ev-j71x-tai":[.2,.2,.85,.9],"ev-khach-den":[.2,.5,.95,.85],"ev-khach-den-2":[.05,.35,.9,.8],"ev-ksp":[.17,.3,.95,.92],"ev-lanh-cung":[.3,.15,.98,.68],"ev-lanh-cung-2":[.1,.45,.95,.78],"ev-lanh-cung-3":[.05,.45,.9,.85],"ev-le-dong":[.1,.3,.9,.75],"ev-le-dong-2":[0,.05,.75,.6],"ev-le-ha":[0,.6,.6,1],"ev-le-thu":[.15,.55,.85,.9],"ev-le-thu-2":[.1,.25,.9,.85],"ev-le-thu-3":[.3,.4,.95,.9],"ev-le-xuan":[.25,.2,.85,.9],"ev-le-xuan-2":[.1,.4,.95,.95],"ev-lu-lut":[.25,.35,1,.85],"ev-mat-bao":[.05,.1,.55,.85],"ev-mat-uoc":[.1,.4,.9,.75],"ev-mood-an":[.3,.05,1,.8],"ev-mood-an-2":[.35,.1,.95,.85],"ev-mood-binh":[.15,.3,.85,.85],"ev-mood-binh-2":[.2,.3,.85,.85],"ev-mood-buon":[.2,.15,.85,.85],"ev-mood-buon-2":[.2,.15,.85,.85],"ev-mood-dau":[.15,.15,.85,.85],"ev-mood-dau-2":[.2,.15,.9,.85],"ev-mood-ghen":[.15,.05,.95,.75],"ev-mood-ghen-2":[.3,.05,.98,.75],"ev-mood-gian":[.25,.05,.95,.9],"ev-mood-gian-2":[.25,.05,.95,.9],"ev-mood-lo":[.45,.5,.98,.92],"ev-mood-lo-2":[.45,.45,.95,.92],"ev-mood-muu":[.3,.45,.9,.88],"ev-mood-muu-2":[.3,.45,.9,.9],"ev-mood-so":[.15,.1,.75,.8],"ev-mood-so-2":[.3,.15,.95,.8],"ev-mood-vui":[.2,.15,.95,.85],"ev-mood-vui-2":[.2,.2,.95,.85],"ev-morning-after-b":[.25,.15,.85,.75],"ev-nc1":[.3,.15,.95,.75],"ev-news-tin-trong-cung":[.15,.15,.85,.75],"ev-nguy-gia":[.2,.2,.95,.95],"ev-nhap-cung":[.3,.3,.75,.95],"ev-nhap-cung-cn":[.1,.25,.95,.95],"ev-night1":[.3,.3,.85,.85],"ev-night1-v2":[.1,.15,.7,.75],"ev-night2":[.3,.2,.95,.75],"ev-night2-normal":[.35,.15,.9,.8],"ev-night2-tender":[.45,.15,.98,.8],"ev-night2-warm":[.1,.1,.75,.8],"ev-plantpick":[.3,.25,.95,.9],"ev-plantsv":[.1,.15,.98,.8],"ev-prep":[.05,.4,.85,.95],"ev-q72-dich-thu":[.25,.2,.8,.75],"ev-q72-doi-thuoc":[.35,.1,.85,.9],"ev-q72-don-ta":[.15,.1,.95,.85],"ev-q72-dong-tam":[.2,.35,.8,.85],"ev-q72-dt-hen":[.15,.35,.85,.7],"ev-q72-dt-thu":[.25,.25,.8,.7],"ev-q72-emp-co":[.3,.2,.9,.85],"ev-q72-fam-thd":[.25,.2,.8,.85],"ev-q72-hh-doanngo":[.1,.15,.9,.85],"ev-q72-hh-trungcuu":[.2,.2,.75,.9],"ev-q72-hh-trungthu":[.05,.15,.9,.8],"ev-q72-kho-tet":[.36,.15,.66,.62],"ev-q72-loi-thoi":[.18,.15,.52,.6],"ev-q72-maid-tet":[.18,.15,.72,.65],"ev-q72-mama-nghi":[.17,.1,.42,.6],"ev-q72-mat-tram":[.12,.1,.55,.75],"ev-q72-mat-tram2":[.15,.12,.58,.65],"ev-q72-ns-doi":[.28,.15,.7,.65],"ev-q72-off-con":[.18,.15,.48,.65],"ev-q72-off-hoa":[.05,.1,.72,.6],"ev-q72-qua-tet":[.22,.15,.65,.72],"ev-q72-quat-rv":[.18,.1,.55,.65],"ev-q72-su-tet":[.05,.2,.7,.75],"ev-q72-th-aodong":[.2,.12,.78,.65],"ev-q72-th-kinh2":[.35,.1,.75,.65],"ev-q72-th-mai":[.12,.12,.6,.65],"ev-q72-th-thanhminh":[.32,.1,.72,.75],"ev-q72-th-trungcuu":[.15,.2,.75,.68],"ev-q72-tho-te":[.4,.15,.9,.75],"ev-q72-tin-doi":[.25,.12,.7,.65],"ev-q72-tu-nu":[.35,.12,.88,.6],"ev-q72-tv-mua":[.28,.2,.85,.7],"ev-quoc-tang":[.4,.28,.95,.62],"ev-runner":[.3,.05,1,.55],"ev-shop":[.15,.25,.75,.75],"ev-sinh-no":[.25,.3,.8,.78],"ev-su-than":[.28,.38,.75,.88],"ev-su-than-2":[.2,.32,.82,.75],"ev-tai-mat":[.35,.12,.8,.62],"ev-tai-nghe":[.1,.2,.9,.75],"ev-taintpick":[.3,.15,.72,.9],"ev-tan-phong":[.03,.42,.75,.88],"ev-tang-le":[.3,.3,.8,.65],"ev-td1":[.02,.2,.8,.75],"ev-te-le":[.25,.45,.75,.85],"ev-tham-quan":[.05,.4,.75,.85],"ev-thang-tran":[.35,.42,.8,.95],"ev-thd1":[.15,.15,.55,.62],"ev-thinh-an":[.3,.42,.68,.95],"ev-thoi-tiet":[.3,.15,.95,.7],"ev-thoi-tiet-2":[.25,.25,.85,.65],"ev-thoi-tiet-3":[.35,.03,.85,.55],"ev-thu-nha":[.05,.38,.6,.82],"ev-tien-de-bang-ha":[.28,.2,.75,.9],"ev-tin-don":[.3,.22,.78,.68],"ev-toil-crowd-jealous":[.3,.15,.75,.75],"ev-toil-emp-dislike":[.12,.05,.45,.55],"ev-toil-emp-like":[.1,.08,.8,.55],"ev-toil-hh-praise":[.35,.1,.98,.7],"ev-toil-hh-scold":[.35,.12,.92,.65],"ev-toil-rival-jealous":[.75,.05,.98,.6],"ev-toil-rival-praise":[.15,.03,.75,.55],"ev-toil-rival-tease":[.3,.08,.92,.6],"ev-toil-th-praise":[.25,.12,.78,.7],"ev-toil-th-scold":[.2,.12,.78,.7],"ev-tranh-sung":[.03,.3,.6,.85],"ev-trieu-chinh":[.3,.28,.85,.7],"ev-trieu-chinh-2":[.2,.4,.95,.8],"ev-tt1":[.3,.1,.68,.75],"ev-tt2":[.08,.15,.68,.85],"ev-tt3":[.3,.25,.82,.75],"ev-tu-tinh":[.15,.5,.75,.9],"ev-tuyen-tu":[.3,.35,.75,.9],"ev-vi-hanh":[.22,.4,.62,.88],"ev-vi-hanh-2":[.28,.3,.78,.75],"ev-vlcraft":[.25,.1,.65,.75],"ev-vlget":[.33,.3,.98,.75],"ev-vlnvp":[.3,.15,.95,.7],"ev-vlout":[.12,.15,.62,.75],"ev-vu-oan":[.08,.5,.55,.88],"ev-vulan":[.4,.35,.75,.85],"ev-wk-cam":[.3,.05,.75,.8],"ev-wk-hoa":[.38,.05,.85,.8],"ev-wk-kimchi":[.1,.1,.62,.75],"ev-wk-ky":[.25,.05,.88,.78],"ev-wk-nau":[.35,.05,.85,.8],"ev-wk-phanson":[.28,.05,.85,.8],"ev-wk-phucthien":[.25,.08,.82,.82],"ev-wk-theu":[.22,.05,.85,.75],"ev-wk-thi":[.3,.05,.8,.85],"ev-wk-thuchuc":[.32,.05,.75,.75],"ev-wk-vu":[.38,.3,.78,.72],"ev-wk-y":[.2,.08,.72,.85],"ev-yen-tiec":[.15,.4,.85,.8],"info-an-thuong":[.1,.3,.75,.85],"info-an-tinh":[.35,.35,1,.82],"info-bac":[.08,.3,.68,.75],"info-bong-loc":[.15,.28,.88,.8],"info-cam-tuc":[.4,.3,.85,.75],"info-chung-cu":[.05,.48,.6,.8],"info-duc":[.18,.35,.75,.8],"info-hoang-hau":[.2,.25,.85,.78],"info-khac":[.18,.1,.85,.75],"info-lanh-cung":[.5,.15,1,.75],"info-lat-the":[.02,.42,.98,.78],"info-lich":[.22,.05,.85,.95],"info-long":[.08,.35,.78,.72],"info-nguy-hiem":[.3,.3,.85,.88],"info-noi-vu":[.15,.5,.98,.88],"info-phe-phai":[0,.38,.98,.68],"info-phuc-duyen":[.1,.05,.9,.85],"info-que":[.3,.3,.62,.8],"info-ra-vao":[.08,.2,.92,.92],"info-sac":[.2,.1,.75,.85],"info-suc":[.05,.4,.9,.8],"info-tai":[.02,.45,.9,.8],"info-tai-mat":[.38,.3,.75,.8],"info-tam-co":[.18,.33,.88,.82],"info-tan-gia-kho":[.15,.45,.85,.92],"info-thai":[.18,.32,.78,.68],"info-thai-hau":[.12,.1,.92,.75],"info-tin":[.3,.45,.7,.7],"info-tranh-ghe":[.15,.2,.85,.78],"info-tuyen-tu":[0,.45,.72,.78]};
window.KIT_PIC_SUBJ=KIT_PIC_SUBJ;
function kitPicSubj(src){const k=String(src||"").replace(/[?#].*$/,"").replace(/^.*\//,"").replace(/\.\w+$/,"");return KIT_PIC_SUBJ[k]||null}
window.kitPicSubj=kitPicSubj;
(function(){const V=KIT_SIZE.v3,Z=KIT_SIZE,css=[];
 for(const k of ["M","L","XL"]){const g=Z.fig[Z.lay[k].fig];css.push(`.ksz3[data-lay="${k}"]{--kszfh:${g.h}px;--kszcw:${g.cw}px}`)}
 css.push(`
.ksz3 .k3body{display:flex;gap:12px;padding:10px 12px 12px;align-items:stretch;box-sizing:border-box}
.ksz3 .k3right{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}
.ksz3 .k3right>.kfacts,.ksz3 .k3right>.kb{flex:none}
.ksz3[data-pres="fig"] .k3body>.kszfig{align-self:center}
.ksz3 .k3main{flex:none;width:${V.colS}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.ksz3 .k3main>.kt3{text-align:center;width:max-content;max-width:${V.colS+24}px}
.ksz3 .k3mpor{align-self:center}.ksz3 .k3mpor>.pcp{width:${V.porS}px;flex:none}
.ksz3 .k3mpic,.ksz3 .k3ev{position:relative;overflow:hidden;border-radius:6px;border:1px solid var(--gold,#8f5f0c);box-shadow:inset 0 0 0 1px #fffaf0;box-sizing:border-box}
/* S event picture = ONE standard kit size (owner 16/11 19:54Z: no stretched ratio): KIT_SIZE.pic[V.picS] (PM 120x160, 3:4), centred in the body */
.ksz3 .k3main.k3mpic{flex:none;width:${Z.pic[V.picS].w}px;height:${Z.pic[V.picS].h}px;min-height:0;align-self:center}
.ksz3 .k3ev{flex:1 1 auto;min-height:${V.evMin.fig}px}.ksz3[data-pres="one"] .k3ev{min-height:${V.evMin.one}px}
.ksz3 .k3mpic>.ksart,.ksz3 .k3ev>.ksart{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto;margin:0;border:0;box-shadow:none;border-radius:0}
.ksz3 .k3mpic>.ksart img,.ksz3 .k3ev>.ksart img{width:100%;height:100%;object-fit:cover;display:block}
.ksz3 .k3btns{display:grid;grid-template-columns:repeat(var(--k3c,1),minmax(0,1fr));gap:${V.btn.gap}px;flex:none}
.ksz3[data-pres="one"]>.k3btns{padding:0 12px 12px}
.ksz3 .k3btns>.kszb{grid-column:span var(--k3s,1);width:auto;min-width:0}
.ksz3 .kszb[data-kbs="S"] .kszr{flex-wrap:wrap;row-gap:0;white-space:nowrap}.ksz3 .kszb .kchip{white-space:nowrap}.ksz3 .k3btns .kszb[data-kbs="S"] .kszbt{min-width:6.5em}.ksz3 .k3btns>.kszb{padding:5px}.ksz3 .k3btns>.kszb>.kszbr{gap:6px}.ksz3 .k3meas{display:block}
.ksz3 .kszfig>.kt3{max-width:calc(var(--kszcw) + 24px)}
.ksz3.kszf{max-height:none}`);
 const st=document.createElement("style");st.id="k-size3";st.textContent=css.join("\n");document.head.appendChild(st)})();
/* narrator (owner 16/11 19:23Z): BAL.staff.narrator (one core) → the named palace official of that office (jstaff elderBy / S.court) */
function kszWho3(sp){if(sp.who)return sp.who;const N=(typeof BAL!=="undefined"&&BAL.staff&&BAL.staff.narrator)||KIT_SIZE.v3.narrator;const n=N[sp.kind]||"maid";
 try{if(n==="me")return S;if(n==="emp")return S.emp;if(n==="maid")return S.maid;if(n==="tq"||n==="ksp")return S.court&&S.court[n]||S.maid;
  if(typeof elderBy==="function"){let st=elderBy(n);if(!st&&typeof elderInit==="function"){elderInit();st=elderBy(n)}if(st)return st}return S.maid}catch(e){return null}}
/* the event picture = the real game path: the event's own picture, else kitDefaultBanner (kitInfoArt of the title, else one per kind) */
function kszEvSrc3(sp){if(sp.pic)return kszImg(sp.pic);let b=null;try{b=kitDefaultBanner({t:sp.title},sp.kind)}catch(e){}return b&&b.src?kszImg(b.src):""}
function kszPic3(src,cls){const sj=kitPicSubj(src);return `<div class="${cls}"${sj?` data-subj="${sj.join(",")}"`:""}>${kitSceneArt(src,"",{shape:"wide",cap:false}).replace(/ loading="lazy"/g,"")}</div>`/* a frame picture is on screen: never lazy */}
function kszPor3(p){const [r,n]=kszRankName(p);let col="";try{col=kitPersonCol(p)}catch(e){}
 if(p&&(p.kind==="th"||(S&&(p===S.thO||p===S.emp)))&&typeof kitRankCol==="function")col=kitRankCol(7);
 const tag=typeof kitTitleTag3==="function"?kitTitleTag3(p,r,n,col):kitNameRank(r,n,col);let f;try{f=p&&p.kind==="th"?pTH():kitFace(p)}catch(e){f={src:"",ini:"?"}}
 return `<div class="k3main k3mpor">${tag}${pcPort(f)}</div>`}
/* spec {kind,title,sub,who?,pic?,facts,rows,opts} + size K → frame html (kitFrameApply3 after mount) */
function kszFrame3(sp,K){const V=KIT_SIZE.v3,pres=V.pres[K]||"fig",foc=V.focus[sp.kind]||"person",who=kszWho3(sp),ev=kszEvSrc3(sp);
 const R=[];let left="";
 if(pres==="one"){if(foc==="event")left=kszPic3(ev,"k3main k3mpic");else{left=who?kszPor3(who):"";R.push(kszPic3(ev,"k3ev"))}}
 else{left=who?kszFigHtml(who):"";R.push(kszPic3(ev,"k3ev"))}
 let facts=(sp.facts||[]).slice();
 /* event-centred S: a person is a small avatar INSIDE the info → when no fact row carries anyone, the narrator's line is added */
 if(pres==="one"&&foc==="event"&&who&&!facts.some(f=>f&&typeof f==="object"&&f.who)&&sp.say)facts.unshift({who,text:sp.say});
 if(facts.length)R.push(kitFacts(facts,{group:false}));if(sp.rows&&sp.rows.length)R.push(kitRows(sp.rows));
 const btns=sp.opts&&sp.opts.length?`<div class="k3btns">${sp.opts.map(kszBtn).join("")}</div>`:"";
 if(pres==="fig"&&btns)R.push(btns);
 let head=kpHeader(sp.kind,sp.title,sp.sub);if(!(sp.opts&&sp.opts.length))head=head.replace(/<\/div>$/,kitXHTML('data-kszx="1"',"Đóng")+"</div>");
 return `<div class="dlg kszf ksz3 kpanel" data-kind="${sp.kind}" data-ksz="${K}" data-pres="${pres}" data-focus="${foc}" data-lay="${K}">${head}<div class="k3body">${left}<div class="k3right">${R.join("")}</div></div>${pres==="one"?btns:""}</div>`}
/* crop every event picture around its subject; strips never shorter than the subject (returns nothing; sets min-height + object-position) */
const KSZ_NAT={};/* natural sizes of event pictures seen, so a frame built later (picker) knows its subject's height before the picture decodes */
function kszEvMin3(c){const im=c.querySelector("img"),src=im&&im.getAttribute("src")||"";if(im&&im.naturalWidth)KSZ_NAT[src]=[im.naturalWidth,im.naturalHeight];const n=KSZ_NAT[src];
 const base=KIT_SIZE.v3.evMin[(c.closest(".ksz3")||{dataset:{}}).dataset.pres]||56;const sj=c.dataset.subj?c.dataset.subj.split(",").map(Number):null;if(!sj||!n||!c.classList.contains("k3ev"))return base;
 const w=c.clientWidth;const NM=KIT_SIZE.pic.NM;return Math.max(base,Math.min(Math.ceil(w*NM.h/NM.w),Math.ceil((sj[3]-sj[1])*n[1]*(w/n[0])*1.06)))/* the strip's floor is at most the standard NARROW strip ratio (NM 300x84): a taller subject is shown whole by kitPicFocus (zoom-out), never by a taller frame */}
function kszPicFit3(root){root.querySelectorAll(".k3ev,.k3mpic").forEach(c=>{const im=c.querySelector("img");if(c.classList.contains("k3ev"))c.style.minHeight=kszEvMin3(c)+"px";if(!im||!im.naturalWidth)return;kitPicFocus(c,im)})}
/* kitPicFocus(box, img) — THE focal crop (owner 16/11 19:54Z "cái lá thư chưa có đúng vị trí"; owner 21:1xZ: the picture ALWAYS FILLS its frame, never letterboxed / blur-padded):
   `cover` at every size, positioned so the centre of the subject box (KIT_PIC_SUBJ) sits at the centre of the visible window (clamped to the picture). When the subject is
   bigger than the window the window still shows its centre (the frame, not the picture, adapts: kszEvMin3 grows the strip up to the standard NARROW ratio). No box: centred. */
function kitPicFocus(c,im){const W=im.naturalWidth,H=im.naturalHeight,w=c.clientWidth,h=c.clientHeight;if(!W||!w||!h)return;const src=im.getAttribute("src")||"";
 const sj=c.dataset.subj?c.dataset.subj.split(",").map(Number):kitPicSubj(src);
 Object.assign(im.style,{width:"",height:"",left:"",top:""});
 const s=Math.max(w/W,h/H),vw=w/s,vh=h/s,bb=sj||[.5,.5,.5,.5],cx=(bb[0]+bb[2])/2*W,cy=(bb[1]+bb[3])/2*H;
 const px=W-vw>1?Math.min(1,Math.max(0,(cx-vw/2)/(W-vw))):.5,py=H-vh>1?Math.min(1,Math.max(0,(cy-vh/2)/(H-vh))):.5;im.style.objectPosition=`${(px*100).toFixed(1)}% ${(py*100).toFixed(1)}%`}
window.kitPicFocus=kitPicFocus;
/* kit option-rows (s34): a card's TEXT column keeps >= B.txtMin px (values never wrap word by word, no clipped line): the cell = text min + the picture column + paddings, so 2 options use the whole width (1 column) when the area is narrow */
function kszNeedTxt(bs,need,B){const TX=B.txtMin||190;let pic=0,any=false;bs.forEach(b=>{const a=b.querySelector(".kaart");if(a){any=true;pic=Math.max(pic,Math.ceil(a.getBoundingClientRect().width||0))}});return Math.max(need,TX+(any?pic+44:16))}
/* (4) button grid: cols from the area width, short buttons one cell, long ones the cells they need */
function kszBtnGrid3(root){root.querySelectorAll(".k3btns").forEach(g=>{const B=KIT_SIZE.v3.btn,w=g.clientWidth;if(!w)return;const bs=[...g.querySelectorAll(":scope>.kszb")];
 /* the cell = what the widest SHORT button needs at its narrowest (title ≥ 7 em, a row may put its value under its label, chips never break), never less than cellS */
 g.classList.add("k3meas");let need=B.cellS;bs.filter(b=>b.dataset.kbs==="S").forEach(b=>{b.style.width="min-content";need=Math.max(need,Math.ceil(b.getBoundingClientRect().width));b.style.width=""});g.classList.remove("k3meas");
 need=kszNeedTxt(bs,need,B);const cols=Math.max(1,Math.floor((w+B.gap)/(need+B.gap)));const cell=(w-(cols-1)*B.gap)/cols,long=Math.min(cols,Math.ceil((B.cellLong+B.gap)/(cell+B.gap)));g.style.setProperty("--k3c",cols);
 bs.forEach(b=>b.style.setProperty("--k3s",b.dataset.kbs==="S"?1:long))})}
/* the left column decides the body height; the event picture in the info grows into what the text leaves */
function kitFrameApply3(dlg){try{kszFigFit(dlg)}catch(e){}kszBtnGrid3(dlg);const R=dlg.querySelector(".k3right"),L=dlg.querySelector(".k3body>.kszfig,.k3body>.k3mpor");
 if(R){R.style.minHeight=L?L.offsetHeight+"px":(dlg.dataset.pres==="one"?KIT_SIZE.v3.picMinS+"px":"");/* XL: the body stays the figure's height, more text scrolls inside the info column */if(dlg.dataset.ksz==="XL"&&L){R.style.maxHeight=L.offsetHeight+"px";R.style.overflow="auto"}}kszPicFit3(dlg);kszPicFit3(dlg);return dlg.dataset.ksz}
/* does the content fit this size? (info column measured with the event picture at its smallest) */
function kitFrameFits3(dlg,strict){const K=dlg.dataset.ksz,m=kitSzMode();if(K==="XL"&&!strict)return true;const R=dlg.querySelector(".k3right"),L=dlg.querySelector(".k3body>.kszfig,.k3body>.k3mpor"),ev=R&&R.querySelector(":scope>.k3ev");
 const mh=R.style.minHeight,mx=R.style.maxHeight;R.style.minHeight="";R.style.maxHeight="";if(ev){ev.style.flex="none";ev.style.height=kszEvMin3(ev)+"px"}
 const need=R.offsetHeight;if(ev){ev.style.flex="";ev.style.height=""}R.style.minHeight=mh;R.style.maxHeight=mx;const lh=L?L.offsetHeight:0;
 if(dlg.dataset.pres==="fig")return need<=lh+2;const btn=dlg.querySelector(":scope>.k3btns");
 const body=Math.max(need,lh,KIT_SIZE.v3.picMinS);return (L?need<=lh+2:body<=KIT_SIZE.v3.bodyS)&&body+(btn?btn.offsetHeight:0)<=KIT_SIZE.v3.capS[m]}
/* THE picker: the smallest size whose presentation holds the content */
function kitFramePick3(sp,host){for(const K of ["S","M","L","XL"]){host.innerHTML=kszFrame3(sp,K);const d=host.firstElementChild;kitFrameApply3(d);if(kitFrameFits3(d))return K}return"XL"}
Object.assign(window,{kszFrame3,kitFrameApply3,kitFrameFits3,kitFramePick3,kszPicFit3,kszBtnGrid3});
/* ---- v3 sample content: every kind × S / M / L / XL with a REALISTIC length for that size (kit page + dev/test/kit-size3.js) ---- */
function kszSpecs3(){const P=kszPeople(),ch=(l,v,c)=>kitChip(l,v,c),op=(t,rows)=>({t,pic:kszOptPic(t),rows}),me=S,mx=S&&S.maid,q=P.q,th=P.th,v2=P.v2,emp=P.emp;
 const pay=i=>{try{return BAL.pay[i]}catch(e){return null}};const pr=i=>[RANKS[i].n,pay(i)!=null?ch("Bạc",pay(i),"g"):"theo phẩm","t"];
 const cut=(a,n)=>a.slice(0,n);const mk=(base,F,Rw,N)=>({S:Object.assign({},base,{facts:cut(F,N.S[0]),rows:cut(Rw,N.S[1])}),M:Object.assign({},base,{facts:cut(F,N.M[0]),rows:cut(Rw,N.M[1])}),
  L:Object.assign({},base,{facts:cut(F,N.L[0]),rows:cut(Rw,N.L[1])}),XL:Object.assign({},base,{facts:cut(F,N.XL[0]),rows:cut(Rw,N.XL[1])})});
 const X={};
 X.news=mk({kind:"news",title:"Tin trong cung",sub:"Thượng tuần · tháng Ba",say:"thưa: sáng nay trong cung có tin mới."},
  [{who:v2,text:"được lật thẻ bài đêm qua.",chips:[["Sủng",3]]},"Tháng này được mùa khắp nơi.",{who:q,text:"ban lụa cho các cung nhân giữ lễ trong tháng."},{who:th,text:"đau đầu, miễn thỉnh an hai buổi."},
   "Tin triều đình: sứ thần Tây Vực sắp vào kinh dâng cống.",{who:emp,text:"ngự giá Ngự hoa viên ngắm mẫu đơn, gọi đàn sáo hầu.",chips:[["Vui",2]]},"Nội vụ phủ phát than sưởi sớm hơn mọi năm.",{who:v2,text:"sai cung nữ đi dò hỏi ở Thượng y cục."},"Thái y viện đổi người trực đêm."],[],
  {S:[2,0],M:[4,0],L:[6,0],XL:[9,0]});
 X.rule=mk({kind:"rule",title:"Bổng lộc",sub:"Luật hậu cung",say:"thưa: luật bổng lộc như sau."},
  ["Mỗi tháng Nội vụ phủ phát bổng lộc theo phẩm vị.","Phẩm càng cao, bạc càng nhiều.","Bổng phát vào ngày mùng một; ai bị phạt bổng thì tháng đó không được lĩnh.","Bạc dư có thể thưởng cung nhân, mua lễ vật hay góp việc thiện."],
  [pr(0),pr(1),pr(2),pr(3),pr(4),pr(5),pr(6)],{S:[2,0],M:[2,3],L:[3,5],XL:[4,7]});
 X.notice=mk({kind:"notice",title:"Nội vụ phủ báo",sub:"Trung tuần · tháng Mười",say:"thưa: Nội vụ phủ vừa sai người đến báo."},
  ["Than sưởi mùa đông phát từ tuần sau.","Mỗi cung được hai giỏ, cung chủ vị được bốn giỏ.","Ai cần thêm thì xin ở Nội vụ phủ, trừ vào bổng tháng sau.","Cung nào để than ẩm sẽ bị nhắc nhở.","Đêm có gió bấc, các cung giữ lửa cẩn thận, không để cháy rèm."],
  [["Giỏ than",ch("Bạc",-5,"g"),"t"],["Áo bông mới",ch("Bạc",-12,"g"),"t"],["Lò sưởi tay",ch("Bạc",-8,"g"),"t"]],{S:[2,0],M:[3,1],L:[4,2],XL:[5,3]});
 X.night=mk({kind:"night",title:"Đêm thượng tuần",sub:"Canh hai",say:"cho gọi ta đến Dưỡng Tâm điện."},
  [{who:emp,text:"lật thẻ bài của ta.",chips:[["Sủng",4]]},"Đêm yên, trăng sáng.",{who:me,kind:"me",text:"được hầu tẩm, sáng mai về cung.",chips:[["Sức",-10]]},"Kính sự phòng ghi tên ta vào sổ.",{who:v2,text:"nghe tin, đóng cửa cung sớm.",chips:[["Ghen",3]]},"Sáng mai các cung sẽ biết.","Nếu có tin vui, Thái y sẽ bắt mạch sau một tháng."],[],
  {S:[2,0],M:[3,0],L:[5,0],XL:[7,0]});
 X.intel=mk({kind:"intel",title:"Mật báo",sub:"Tai mắt ở Cảnh Nhân cung",say:"thưa nhỏ: tai mắt vừa báo về."},
  [{who:v2,text:"sai người mang thư ra ngoài cung lúc canh ba."},"Người mang thư là thái giám họ Lưu.",{who:v2,text:"gặp riêng Thái y Trương hai lần trong tuần."},"Chưa rõ thư gửi cho ai.","Nếu sai người theo dõi tiếp thì có thể biết thêm, nhưng dễ lộ.","Tai mắt xin thêm bạc để giữ miệng người gác cửa."],
  [["Chứng cứ",ch("Chứng cứ",1)],["Độ tin","Khá chắc","t"]],{S:[2,0],M:[3,0],L:[4,2],XL:[6,2]});
 X.evidence=mk({kind:"evidence",title:"Chứng cứ: bức thư",sub:"Tìm được ở Cảnh Nhân cung",say:"thưa: nô tỳ tìm được thứ này."},
  [{who:v2,text:"giấu bức thư dưới đáy hộp phấn."},"Thư niêm sáp đỏ, nét chữ của người trong nhà.","Thư nhắc đến việc đổi thuốc an thai.","Ngày ghi trong thư trùng với ngày Thái y Trương đến bắt mạch.","Còn thiếu người làm chứng."],
  [["Đủ để","Hặc tội nhẹ","t"],["Thiếu","Người làm chứng","t"],["Giữ trong","Hộp gỗ ở tẩm cung","t"]],{S:[2,0],M:[3,1],L:[4,2],XL:[5,3]});
 X.reward=mk({kind:"reward",title:"Hoàng thượng ban thưởng",sub:"Sau đêm Trung thu",say:"sai Lý tổng quản mang đồ ban đến."},
  [{who:emp,text:"khen ta đàn khúc Xuân giang hay.",chips:[["Sủng",3]]},"Đồ ban: một đôi vòng ngọc, hai xấp lụa Hàng Châu.",{who:q,text:"sai người đến chúc mừng."},"Các cung đều biết ta được ban thưởng.",{who:v2,text:"đóng cửa không ra ngoài.",chips:[["Ghen",4]]}],
  [["Vòng ngọc",ch("Sắc",2)],["Lụa Hàng Châu",ch("Bạc",30,"g")],["Danh tiếng",ch("Danh",2)]],{S:[2,0],M:[2,2],L:[3,3],XL:[5,3]});
 X.week=mk({kind:"week",title:"Tuần lục · tuần đầu tháng Ba",sub:"Tổng kết bảy ngày",say:"thưa: tuần này có mấy việc."},
  [{who:me,kind:"me",text:"thỉnh an Hoàng hậu đủ bảy buổi.",chips:[["Đức",2]]},{who:emp,text:"lật thẻ bài của ta một lần.",chips:[["Sủng",4]]},{who:v2,text:"ganh ghét ta ra mặt.",chips:[["Oán",3]]},"Bổng tháng phát đủ.",{who:th,text:"khen ta chép kinh chăm.",chips:[["Thiện cảm",3]]},"Trời trở lạnh, các cung phát than.",{who:mx,text:"ốm hai ngày, đã khỏi."}],[],
  {S:[2,0],M:[3,0],L:[5,0],XL:[7,0]});
 X.info=mk({kind:"info",title:"Thái hậu",sub:"Từ Ninh cung",who:th},
  ["Thái hậu là mẹ của Hoàng thượng, đứng đầu hậu cung.","Người trọng lễ nghi, ghét kẻ phô trương.","Mỗi sáng mùng một, các phi tần đến Từ Ninh cung thỉnh an.","Người thích nghe kinh Phật và ngắm hoa mai."],
  [["Lòng người với ta",[ch("Thiện cảm",12),ch("Đức",3)]],["Thỉnh an mỗi tuần",ch("Thiện cảm",2),"t"],["Dâng kinh chép tay",ch("Thiện cảm",5),"t"],["Dâng trà ngon",ch("Thiện cảm",3),"t"],["Phô trương",ch("Thiện cảm",-4),"t"]],
  {S:[1,1],M:[2,2],L:[3,3],XL:[4,5]});
 /* KẾT QUẢ frame = big / rare events only (owner 17:25Z): routine actions keep the small result toast (j63 rtoast .karesult) */
 X.result=mk({kind:"result",title:"Kết quả tranh ghế",sub:"Ghế Tần · Cảnh Nhân cung",who:v2},
  [{who:v2,text:"thắng, được lên Tần, dọn về Cảnh Nhân cung."},{who:me,kind:"me",text:"thua, thêm Oán với người thắng.",chips:[["Oán",10]]},"Các phi tần khác ghen thêm với người thắng.",{who:q,text:"ban cho người thắng một đôi trâm ngọc."},{who:emp,text:"ghé Cảnh Nhân cung ngay tối đó.",chips:[["Sủng",2]]},"Ghế Tần tiếp theo trống ít nhất ba tháng nữa."],
  [[v2?v2.name:"Người thắng",ch("Điểm",86,"g")],[S.name,ch("Điểm",79,"g")],["Người thứ ba",ch("Điểm",71,"g")]],{S:[2,0],M:[3,1],L:[4,2],XL:[6,3]});
 X.threat=mk({kind:"threat",title:"Cảnh giác: có kẻ dòm ngó",sub:"Hạ tuần · tối",who:v2},
  [{who:v2,text:"sai cung nữ đứng ngoài cửa cung ta hai đêm liền."},"Có người đổi chén trà trên bàn ta khi ta vắng.","Thái giám gác cửa nói thấy bóng người lúc canh ba.","Đồ ăn đưa đến muộn, hộp thức ăn bị mở.","Nên đổi người hầu trà và giữ chìa khóa kho riêng.","Cung nữ mới đến tuần trước hay hỏi giờ ta ngủ.","Người của Thượng thực cục nói có kẻ hỏi món ta thích ăn."],
  [["Nguy",ch("Nguy",2)],["Đề phòng","Đổi người hầu trà","t"],["Hỏi","Thái giám gác cửa","t"]],{S:[2,0],M:[3,1],L:[4,2],XL:[7,3]});
 X.person=mk({kind:"person",title:v2?v2.name:"Phi tần",sub:"Cảnh Nhân cung",who:v2},
  [{who:v2,text:"vào cung cùng đợt với ta."},"Nhà làm quan ở Giang Nam.","Giỏi thêu, thích hoa lan.","Từng bị Hoàng hậu phạt quỳ một lần.","Không ưa người khoe khoang.","Thân với Thục phi, hay qua lại Trường Xuân cung.","Mỗi tháng gửi thư về nhà một lần."],
  [["Nàng với ta",[ch("Thiện cảm",-4),ch("Ghen",6)]],["Ta với nàng",ch("Thiện cảm",2)],["Quen biết","Vừa phải","t"],["Phe","Hoàng hậu","t"]],{S:[1,1],M:[2,2],L:[3,3],XL:[7,4]});
 X.end=mk({kind:"end",title:"Hết một kiếp",sub:"Năm thứ mười hai",who:me},
  [{who:me,kind:"me",text:"khép mắt ở Vĩnh Thọ cung, tuổi năm mươi tám."},"Một đời từ Đáp ứng lên đến Quý phi.","Hai con đã thành gia thất.","Hoàng thượng truy phong, an táng ở phi lăng.","Người trong cung nhớ ta là người hiền hậu.","Cung nữ thân tín ở lại giữ mộ ba năm."],
  [["Phẩm cao nhất","Quý phi","t"],["Con cái","Hai người","t"],["Tiếng để lại",ch("Đức",30)],["Điểm kiếp",ch("Điểm",420,"g")]],{S:[2,0],M:[3,1],L:[4,2],XL:[6,4]});
 const hh={kind:"choice",title:"Hoàng hậu triệu kiến",sub:"Thượng tuần · buổi sáng",who:q,pic:"img/ev-hh-viec.webp"};
 X.choice={S:Object.assign({},hh,{facts:[{who:q,text:"cho gọi ta đến Khôn Ninh cung."}],opts:[op("Đi ngay",[["Tốn",`${BAL.kitpage.demo.k} khắc`]]),op("Cáo bệnh",[["Mất",ch("Thiện cảm",-2)]])]}),
  M:Object.assign({},hh,{facts:[{who:q,text:"cho gọi ta đến Khôn Ninh cung, hỏi chuyện đêm qua."}],opts:[op("Cúi đầu nhận lỗi",[["Được",ch("Thiện cảm",5)]]),op("Im lặng",[["Mất",ch("Thiện cảm",-2)]])]}),
  L:Object.assign({},hh,{facts:[{who:q,text:"cho gọi ta đến Khôn Ninh cung, hỏi chuyện đêm qua ta được lật thẻ bài."}],opts:[op("Cúi đầu nhận lỗi",[["Được",ch("Thiện cảm",5)]]),op("Thưa do Hoàng thượng định",[["Được",ch("Danh",2)]]),op("Dâng lễ vật",[["Tốn",ch("Bạc",-20)]]),op("Im lặng",[["Mất",ch("Thiện cảm",-2)]])]}),
  XL:Object.assign({},hh,{facts:[{who:q,text:"cho gọi ta đến Khôn Ninh cung trước mặt các phi tần, hỏi chuyện đêm qua ta được lật thẻ bài mà không đến thỉnh an sớm."},"Các phi tần đứng quanh, có người che miệng cười.","Cung nữ của Hoàng hậu đứng chặn ở cửa."],
   opts:[op("Cúi đầu nhận lỗi",[["Được",ch("Thiện cảm",5)]]),op("Im lặng",[["Mất",ch("Thiện cảm",-2)]]),
    op("Thưa rằng do Hoàng thượng định",[["Được",ch("Danh",1)],["Mất",ch("Thiện cảm",-4)],["Gợi ý","đúng lý nhưng làm nàng mất mặt"]]),
    op("Dâng chén trà, đổi chuyện",[["Cần","Trà ≥ 2"],["Được",ch("Thiện cảm",4)]]),
    op("Quỳ xuống nhận lỗi, xin Hoàng hậu dạy bảo",[["Tốn",`${BAL.kitpage.demo.k} khắc`],["Được",ch("Thiện cảm",6)+ch("Đức",1)],["Mất",ch("Danh",-1)],["Gợi ý","Hoàng hậu ưa người biết phận, nhận lỗi trước mặt mọi người thì nàng nguôi giận nhanh"]])]})};
 return X}
window.kszSpecs3=kszSpecs3;
/* sheet: one kind, the 4 sizes side by side (+ what the content picks), or area "items3" */
const KSZ3_NAME={news:"TIN",rule:"LUẬT",notice:"BÁO",choice:"VIỆC",result:"KẾT QUẢ",info:"ĐIỀU",night:"ĐÊM",intel:"MẬT BÁO",evidence:"CHỨNG CỨ",reward:"BAN THƯỞNG",week:"TUẦN",threat:"CẢNH GIÁC",person:"NGƯỜI",end:"KIẾP"};
function kszSheet3(kind){const old=document.getElementById("kszsheet");if(old)old.remove();const kk=window.kitKnown;window.kitKnown=()=>true;let X;try{X=kszSpecs3()[kind];{const host=document.createElement("div");host.style.cssText="position:absolute;left:-5000px;top:0;width:900px";document.body.appendChild(host);try{X=Object.assign({},X,kszFill3(X.XL,host))}finally{host.remove()}}}finally{}
 const V=KIT_SIZE.v3,foc=V.focus[kind];const d=document.createElement("div");d.id="kszsheet";
 let h=`<h2>${KSZ3_NAME[kind]||kind} · S / M / L / XL (${kitSzMode()==="kv2"?"iPad landscape 1180x820":"Fold portrait 755x1000"})</h2><p class="kszn">${foc==="event"?"Event-centred kind: S leads with the EVENT picture (person = small avatar inside the info).":"Person-centred kind: S leads with the PERSON's portrait frame (event picture = strip at the top of the info)."} M / L / XL: full figure left + event picture top-right, as wide as the info + button column; the picture grows into what the text leaves, so no frame has empty space.${(kind==="info"||kind==="choice"||kind==="news"||kind==="week")?" Thái hậu art: current files kept — Foreman C is redrawing every Thái hậu picture (slimmer robes).":""}${kind==="result"?" KẾT QUẢ frame = big / rare events only (tranh ghế, kỳ thi, mưu kế); routine actions keep today's small result toast at the bottom.":""}</p><div class="ksz3col" style="display:flex;flex-direction:column;gap:18px;align-items:flex-start">`;
 try{for(const K of ["S","M","L","XL"])h+=`<div data-k3="${K}"><div class="kszlab">${K}</div>${kszFrame3(X[K],K)}<div class="kszn k3pick"></div></div>`}finally{window.kitKnown=kk}
 window.__ksz3X=X;h+=`</div>`;d.innerHTML=h.replace(/ loading="lazy"/g,"");document.body.appendChild(d);
 const fit=()=>d.querySelectorAll(".ksz3").forEach(kitFrameApply3);fit();d.querySelectorAll("img").forEach(i=>i.complete||i.addEventListener("load",fit,{once:true}));return d}
/* after the pictures are in: what does each sample's content pick (proof that the content is realistic for that size)? */
function kszPick3Report(kind){const kk=window.kitKnown;window.kitKnown=()=>true;const X=window.__ksz3X||kszSpecs3()[kind];const host=document.createElement("div");host.style.cssText="position:absolute;left:-5000px;top:0";document.body.appendChild(host);
 const out={};try{for(const K of ["S","M","L","XL"])out[K]=kitFramePick3(X[K],host)}finally{host.remove();window.kitKnown=kk}return out}
/* sample content per size = the MOST of this kind's content that the picker puts in that size (so every sample is full, none spills) */
function kszLevels3(sp){const F=sp.facts||[],R=sp.rows||[],O=sp.opts||[],T=F.length+R.length+O.length,L=[];for(let n=1;n<=T;n++){const nf=Math.min(F.length,Math.max(1,Math.round(n*F.length/T))),no=Math.min(O.length,Math.round(n*O.length/T)),nr=Math.max(0,Math.min(R.length,n-nf-no));
 if(O.length&&!no)continue;L.push(Object.assign({},sp,{facts:F.slice(0,nf),rows:R.slice(0,nr),opts:O.length?O.slice(0,no):undefined}))}return L}
function kszFill3(pool,host){const out={},L=kszLevels3(pool);let xl0=null;for(const sp of L){const K=kitFramePick3(sp,host);let ok=true;if(K==="XL"){xl0=xl0||sp;host.innerHTML=kszFrame3(sp,"XL");const d=host.firstElementChild;kitFrameApply3(d);ok=kitFrameFits3(d,true)}if(ok)out[K]=sp}if(!out.XL&&xl0)out.XL=xl0;return out}
Object.assign(window,{kszSheet3,kszPick3Report,kszFill3,kszLevels3});
/* ---- v3 ITEMS (owner 16/11 17:20Z, OD, overrides the corner-badge idea; grade chip moved ON the frame by owner 16/11 ~23:18Z s26, KIT §54.1b): the item sizes are the real kitItem sizes (XL 150 · L 104 · M 72 · bag slot = its cell);
   the Xa xỉ box and the grade chip are written in container units of the frame, so both keep the same place relative to the frame at every size. Only the Xa xỉ CONTENT changes: word + number (XL, L), number only (M, slot). */
KIT_SIZE.item3={master:150,size:{XL:150,L:104,M:72,slot:72},word:{XL:true,L:true,M:false,slot:false}};
(function(){const st=document.createElement("style");st.id="k-size3-items";st.textContent=`
.kszit3{position:relative;display:inline-block;vertical-align:bottom;width:var(--w);margin-bottom:.8em}
.kszit3 .kits,.kszit3 .kitn{display:none}
.ksz3pick{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px}
.ksz3pick>div{display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center;padding:6px 4px;border:1px solid var(--line,#d2b071);border-radius:6px;background:var(--panel2,#f6ead6)}
.ksz3pick>div>b{font:600 .74rem/1.2 var(--body)}.ksz3pick>div>small{font-size:.7rem;color:var(--good,#2d7a52)}
.ksz3wear{display:flex;gap:6px;align-items:flex-start}.ksz3wear>div{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:.66rem;max-width:96px;text-align:center}`;document.head.appendChild(st)})();
function kszItem3(o,size,gname,gcol){const I3=KIT_SIZE.item3;
 /* the REAL kitItem at the real size (XL 150 / L 104 / M 72 / bag slot): frame, Xa xỉ box and the grade chip ON the frame (KIT §54.1b) are the kit's own, scaled in container units; no transform copy, no sample-only chip */
 const it=kitItem(Object.assign({},o,{name:"",gname,size:{XL:"xl",L:"lg",M:"md",slot:"slot"}[size]||"md",frame:true}));
 return `<span class="kszit3" data-s="${size}" data-w="${I3.word[size]?1:0}" style="--w:${I3.size[size]||72}px">${it}</span>`}
function kszItemTile3(k,size){const I=kitItemInfo(k);const G=KIT_GRADE[Math.max(0,Math.min(4,I.grade|0))];let lux=0;try{lux=typeof luxVal==="function"?luxVal(k):0}catch(e){}
 return kszItem3({src:I.src,grade:I.grade,lux:lux||0},size,I.gname||G.n,G.c)}
function kszItemDetail3(k){return kszItemDetail(k).replace(/^<div class="kszidc">/,'<div class="kszidc ksz3card">').replace(/<span class="kszit" data-s="M">[\s\S]*?<\/b><\/span>/,()=>kszItemTile3(k,"M"))}
function kszWearRow3(p){try{return `<div class="ksz3wear">${wdSlots(p).map(x=>{const G=KIT_GRADE[Math.max(0,Math.min(4,x.grade|0))];return `<div>${kszItem3({src:x.empty?"":kitItemSrc(x.k,x.icon),grade:x.grade,empty:x.empty},"M",x.gradeName||G.n,G.c)}<span>${x.name}</span></div>`}).join("")}</div>`}catch(e){return""}}
function kszItemsSheet3(){const ks=["tramngoc","vongngoc","luahang","nhansam","thu"].concat(typeof WD_ITEMS==="object"?["y_haiduong","nt_nhuy"]:[]).filter(k=>{try{return kitItemInfo(k)}catch(e){return false}});
 let h=`<h2>Items · the real kitItem at XL / L / M / bag slot (Xa xỉ box + grade chip ON the frame, both scale with it)</h2>`;
 h+=`<h3>Item sizes · frame, picture, Xa xỉ box (L / XL word + number, M / slot number only) and the grade chip ON the bottom edge keep the same proportions at every size · S 52 dropped</h3><div class="kszrow" style="align-items:flex-end;gap:22px">${["XL","L","M","slot"].map(s=>`<div><div class="kszlab">${s==="slot"?"bag slot (72 here; fills its cell)":s}</div>${kszItemTile3(ks[1]||ks[0],s)}</div>`).join("")}</div>`;
 const ng=Object.keys(IT).find(k=>{try{return kitItemInfo(k).grade===4}catch(e){return false}});if(ng)h+=`<div class="kszrow" style="align-items:flex-end;margin-top:8px;gap:22px">${["XL","L","M","slot"].map(s=>`<div><div class="kszlab">Ngự · ${s}</div>${kszItemTile3(ng,s)}</div>`).join("")}</div>`;
 h+=`<h3>6.2 detail card · the same items as sheet 8 (Áo gấm thêu hải đường: the robe is no longer covered)</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px;max-width:1120px">${ks.map(kszItemDetail3).join("")}</div>`;
 const pk=Object.keys(IT).filter(k=>!itm(k).story&&itm(k).sl).slice(0,6);
 h+=`<h3>6.3 pick grid (M = the master scaled)</h3><div class="ksz3pick" style="max-width:640px">${pk.map(k=>{const I=kipItem({k});const use=String(I.use||"").replace(/^[^:]*:\s*/,"");return `<div>${kszItemTile3(k,"M")}<b style="color:${I.col}">${I.name}</b><small>${use}</small></div>`}).join("")}</div>`;
 h+=`<h3>6.5 item tag in events · M tile (S dropped), name under</h3><div class="kszrow" style="gap:18px">${pk.slice(0,6).map(k=>`<div style="text-align:center;width:96px">${kszItemTile3(k,"M")}<div style="font-size:.68rem">${kitItemInfo(k).name}</div></div>`).join("")}</div>`;
 h+=`<h3>Wear row on the person card · grade = the chip ON the frame (no grade line under the picture)</h3>${kszWearRow3(S)}`;return h}
function kszItemsSheet3Show(){const old=document.getElementById("kszsheet");if(old)old.remove();const d=document.createElement("div");d.id="kszsheet";d.innerHTML=kszItemsSheet3().replace(/ loading="lazy"/g,"");document.body.appendChild(d);return d}
Object.assign(window,{kszItemTile3,kszItemsSheet3,kszItemsSheet3Show,kszWearRow3});
/* kit page hook: kitSizeSheet("v3:<kind>") = one kind at S / M / L / XL; kitSizeSheet("items3") = the v3 items sheet */
(function(){const k0=window.kitSizeSheet;window.kitSizeSheet=function(area){if(/^v3:/.test(area||""))return kszSheet3(area.slice(3));if(area==="items3")return kszItemsSheet3Show();return k0(area)}})();
/* ================= PHASE 2 · THE LIVE FRAME (owner 16/11 19:22Z s22: approval of #3/#4 → apply game-wide) =================
   kitFrameLive3(m) = the LAST step of showModal (outermost wrapper): every #modal kit panel (kpBuild) of a KP_SEAL kind is re-laid as the v3 frame,
   KEEPING the nodes the game made (its info blocks .kpmain, its option buttons .opts with their handlers, the header .kph with its ✕):
   #mb > .k3body(left + .k3right[event picture .k3ev · .kpmain · (M/L/XL) .opts.k3btns]) + (S) .opts.k3btns.
   left = the event's own person (kitStagePeople) or the NARRATOR of the kind (kszWho3, BAL.staff.narrator), full figure at M/L/XL, portrait pendant
   at S (person-centred kinds) or the event picture (event-centred kinds). Event picture = the dialog's own band / tall slot, else kitEvArt / kszEvSrc3.
   Size = the smallest of S/M/L/XL whose presentation holds the content (kitFrameFitsLive3); XL: more text scrolls inside the info column.
   NOT converted (pages, not event frames): identity card .kpid, person card (pcm), scene panels without a kind, and bodies holding a page part
   (KSZ_LIVE_SKIP: calendars, pickers, inventories, shops, relation tables, stat grids, tables, exam / card-flip pages). */
const KSZ_LIVE_SKIP=".kpt-mount,.kpid,.kmc,.kpick,.kpicks,.kinv,.kshg,.kshop,.kreltab,.krelt,.kstgrid,.kip,table,.kexam,.kflip,.kpl,.kmlist,.kslot,.kpets,.kgift,.kpkgrid";
KIT_SIZE.v3.office={ksp:"Kính sự phòng"};KIT_SIZE.v3.live={maxOpts:7,maxSecs:4};/* (s22) the ĐÊM narrator's tag names his office, not the bare "Thái giám" */
(function(){const r0=kszRankName;kszRankName=function(p){const R=r0(p);try{if(p&&S&&S.court&&p===S.court.ksp&&KIT_SIZE.v3.office.ksp)R[0]=KIT_SIZE.v3.office.ksp}catch(e){}return R};window.kszRankName=kszRankName})();
function kszLiveSrc3(m,mb,kind){let src="";const im=mb.querySelector(":scope > .kdlgart img, :scope > .kpb > .kpsubj.kpev img, :scope > .kpb > .kpsubj.kpiart img");if(im)src=im.getAttribute("src")||"";
 if(!src&&m&&m.kit&&m.kit.pic)src=m.kit.pic;if(!src&&m&&m.headArt&&m.headArt.src)src=m.headArt.src;
 if(!src){try{const a=typeof kitEvArt==="function"?kitEvArt(m):null;if(a&&a.src)src=a.src}catch(e){}}
 return src?kszImg(src):kszEvSrc3({kind,title:m&&m.t})}
/* the option buttons of the game (.opt / .ka cards, §6.2) in the v3 grid: short ones one cell, long ones the cells for ≥ cellLong */
function kszBtnGridLive3(g){const B=KIT_SIZE.v3.btn,w=g.clientWidth;if(!w)return;const bs=[...g.children].filter(b=>b.tagName==="BUTTON"&&b.getClientRects().length);
 bs.forEach(b=>{b.dataset.kbs=kitBtnSize({rows:b.querySelectorAll(".kar,.kl,.kr-why,.kab>*").length,chars:((b.querySelector(".kabody")||b).textContent||"").replace(/\s+/g," ").trim().length})});
 g.classList.add("k3meas");let need=B.cellS;bs.filter(b=>b.dataset.kbs==="S").forEach(b=>{b.style.setProperty("width","min-content","important");b.style.setProperty("min-width","0","important");need=Math.max(need,Math.ceil(b.getBoundingClientRect().width));b.style.removeProperty("width");b.style.removeProperty("min-width")});g.classList.remove("k3meas");
 need=kszNeedTxt(bs,need,B);const cols=Math.max(1,Math.floor((w+B.gap)/(need+B.gap)));const cell=(w-(cols-1)*B.gap)/cols,long=Math.min(cols,Math.ceil((B.cellLong+B.gap)/(cell+B.gap)));g.style.setProperty("--k3c",cols);
 bs.forEach(b=>b.style.setProperty("--k3s",b.dataset.kbs==="S"?1:long))}
/* the height the info column may take: the modal box minus the frame's header, button row and body padding */
function kszLiveRoom3(dlg){const M=document.getElementById("modal");if(!M)return 9999;let ch=24+22+4;[...dlg.children].forEach(c=>{if(c.id!=="mb"&&c.getClientRects().length&&getComputedStyle(c).position!=="absolute")ch+=c.offsetHeight});
 const mb=document.getElementById("mb");if(mb)[...mb.children].forEach(c=>{if(!c.classList.contains("k3body")&&c.getClientRects().length)ch+=c.offsetHeight});return M.clientHeight-ch}
/* KIT 32.8 (fig-feet-crop-2, owner 17/11 "hình nào cũng bị crop mất chân", VIỆC timed choice on Fold + iPad): a live frame is capped (max-height, overflow hidden);
   at a size whose figure column (tag + the layout's figure height) is taller than the cap leaves room for, the bottom of the figure (hem, shoes) was clipped.
   The ONE rule: the figure column NEVER exceeds the room the frame has (cap − header − button row − body padding); when it would, the figure is scaled down
   (dlg.__kszShrink, read by kszFigFit) just enough; the bottom is never cropped. Not touched when it already fits. */
function kszFeetFit(dlg){try{const B=dlg.querySelector(".k3body"),L=B&&B.querySelector(":scope>.kszfig");dlg.__kszShrink=1;if(!L)return;kszFigFit(dlg);
 const cap=parseFloat(getComputedStyle(dlg).maxHeight);if(!(cap>0))return;
 for(let i=0;i<4;i++){const mbx=document.getElementById("mb"),fixed=dlg.clientHeight-(mbx?mbx.clientHeight:B.offsetHeight),room=cap-fixed-22,over=L.offsetHeight-room;if(over<=0.5)break;
  const fs=L.querySelector(".kszfs"),h=fs?fs.offsetHeight:0;if(h<=60)break;dlg.__kszShrink=Math.max(.3,dlg.__kszShrink*Math.max(.3,(h-over-1)/h));kszFigFit(dlg)}}catch(e){console.error("kszFeetFit",e)}}
window.kszFeetFit=kszFeetFit;
function kitFrameApplyLive3(dlg){try{kszFeetFit(dlg)}catch(e){}const g=dlg.querySelector(".opts.k3btns");if(g)kszBtnGridLive3(g);
 const R=dlg.querySelector(".k3right"),L=dlg.querySelector(".k3body>.kszfig,.k3body>.k3mpor");
 if(R){R.style.maxHeight="";R.style.overflow="";R.style.minHeight=L?L.offsetHeight+"px":(dlg.dataset.pres==="one"?KIT_SIZE.v3.picMinS+"px":"");if(dlg.dataset.ksz==="XL"&&L){/* XL (approved #3): the body stays the figure's height; more content scrolls inside the info column */
  R.style.maxHeight=L.offsetHeight+"px";R.style.overflow="auto"}}
 kszPicFit3(dlg);kszPicFit3(dlg);return dlg.dataset.ksz}
function kitFrameFitsLive3(dlg,strict){const K=dlg.dataset.ksz;if(K==="XL"&&!strict)return true;const R=dlg.querySelector(".k3right"),L=dlg.querySelector(".k3body>.kszfig,.k3body>.k3mpor"),ev=R&&R.querySelector(":scope>.k3ev");if(!R)return true;
 const mh=R.style.minHeight,mx=R.style.maxHeight;R.style.minHeight="";R.style.maxHeight="";if(ev){ev.style.flex="none";ev.style.height=kszEvMin3(ev)+"px"}
 const need=R.offsetHeight;if(ev){ev.style.flex="";ev.style.height=""}R.style.minHeight=mh;R.style.maxHeight=mx;const lh=L?L.offsetHeight:0;
 /* the frame must also stay inside the screen (modal box): Fold / iPad */
 const M=document.getElementById("modal"),room=M?M.clientHeight-24:9999;
 if(dlg.dataset.pres==="fig")return need<=lh+2&&dlg.offsetHeight<=room;const btn=dlg.querySelector("#mb>.k3btns");
 const body=Math.max(need,lh,KIT_SIZE.v3.picMinS);return (L?need<=lh+2:body<=KIT_SIZE.v3.bodyS)&&body+(btn?btn.offsetHeight:0)<=KIT_SIZE.v3.capS[kitSzMode()]}
function kszLiveLay3(dlg,K){const X=dlg.__ksz3;if(!X)return;const V=KIT_SIZE.v3,pres=V.pres[K]||"fig",foc=V.focus[X.kind]||"person";
 Object.assign(dlg.dataset,{ksz:K,pres,focus:foc,lay:K});
 const body=X.body,right=X.right;[...body.children].forEach(c=>{if(c!==right)c.remove()});right.querySelectorAll(":scope>.k3ev").forEach(c=>c.remove());
 let left="",ev=true;if(pres==="one"){if(foc==="event"){left=kszPic3(X.src,"k3main k3mpic");ev=false}else left=X.who?kszPor3(X.who):""}else left=X.who?kszFigHtml(X.who):"";
 if(left)body.insertAdjacentHTML("afterbegin",left);if(ev&&X.src)right.insertAdjacentHTML("afterbegin",kszPic3(X.src,"k3ev"));
 if(X.opts){if(pres==="one")X.mb.appendChild(X.opts);else right.appendChild(X.opts)}
 body.querySelectorAll("img").forEach(im=>{if(!im.complete)im.addEventListener("load",()=>kszLiveRepick3(dlg),{once:true})});
 right.querySelectorAll(":scope>.k3ev img").forEach(im=>{if(!im.complete)im.addEventListener("load",()=>kitFrameApplyLive3(dlg),{once:true})});
 kitFrameApplyLive3(dlg)}
function kszLivePick3(dlg){for(const K of ["S","M","L","XL"]){kszLiveLay3(dlg,K);if(kitFrameFitsLive3(dlg))return K}return"XL"}
let kszRepT=0;function kszLiveRepick3(dlg){clearTimeout(kszRepT);kszRepT=setTimeout(()=>{try{if(dlg.isConnected&&dlg.__ksz3)kszLivePick3(dlg)}catch(e){console.error("kszLiveRepick3",e)}},30)}
function kitFrameLive3(m){try{const M=document.getElementById("modal"),mb=document.getElementById("mb");if(!M||M.hidden||!mb)return false;const dlg=M.querySelector(".dlg.kpanel");
 if(!dlg||dlg.classList.contains("kp-person")||dlg.__ksz3||dlg.contains(document.getElementById("kload")))return false;
 const kind=dlg.dataset.kind;if(!KIT_SIZE.v3.focus[kind])return false;const body=mb.querySelector(":scope > .kpb");if(!body||body.matches(".kpid"))return false;
 const main=body.querySelector(":scope > .kpmain");if(!main||main.querySelector(KSZ_LIVE_SKIP)||body.querySelector(":scope > .kpsubj.kes2"))return false;
 /* menus and pages are not event frames: a pick-list (≥ KIT_SIZE.v3.live.maxOpts options) or a sectioned page (≥ maxSecs headed sections) keeps its page layout */
 const LV=KIT_SIZE.v3.live,o0=mb.querySelector(":scope > .opts");if(o0&&o0.querySelectorAll(":scope > button").length>=LV.maxOpts)return false;if(main.querySelectorAll(":scope > .kpsec > .kpst").length>=LV.maxSecs)return false;
 let P=[];try{P=kitStagePeople(m)}catch(e){}const who=P[0]||kszWho3({kind});const src=kszLiveSrc3(m,mb,kind);const opts=mb.querySelector(":scope > .opts");
 /* the old layout classes go (their fit passes then find nothing to do); the game's nodes are moved, never rebuilt */
 dlg.classList.remove("kesdlg","kdper","kdpbanner","kdscroll");dlg.classList.add("kszf","ksz3","kszlive");dlg.style.removeProperty("--dart");dlg.style.removeProperty("height");dlg.style.removeProperty("--kdpic");
 const B=document.createElement("div");B.className="k3body";const R=document.createElement("div");R.className="k3right";B.appendChild(R);R.appendChild(main);
 if(opts){opts.classList.add("k3btns");opts.classList.remove("k3grid","kdpo2")}
 [...mb.children].forEach(c=>{if(c!==opts)c.remove()});mb.prepend(B);
 dlg.__ksz3={kind,who,src,mb,body:B,right:R,opts,m};kszLivePick3(dlg);return true}catch(e){console.error("kitFrameLive3",e);return false}}
Object.assign(window,{kitFrameLive3,kszLivePick3,kitFrameApplyLive3,kitFrameFitsLive3,kszBtnGridLive3});
(function(){const st=document.createElement("style");st.id="k-size3-live";st.textContent=`
html body #modal .dlg.kszlive.kszlive{width:var(--kszw)!important;max-width:calc(100% - 16px)!important;height:auto!important;min-height:0!important;max-height:calc(100% - 16px);padding:0;display:flex;flex-direction:column;overflow:hidden}
#modal .dlg.kszlive>#mb{padding:0;margin:0;display:block;max-height:none;overflow:visible;flex:none}
#modal .dlg.kszlive>#mr:not(:has(button:not([hidden]))){display:none}
#modal .dlg.kszlive[data-pres="one"] .k3right{justify-content:center}
#modal .dlg.kszlive .k3right>.kpmain{flex:none;min-width:0;display:block;padding:0;margin:0}
html body #modal .dlg.kszlive #mb .opts.opts.opts.k3btns.k3btns{display:grid!important;flex-direction:row!important;grid-template-columns:repeat(var(--k3c,1),minmax(0,1fr))!important;align-content:start!important;gap:${KIT_SIZE.v3.btn.gap}px;margin:0;flex:none;max-height:none;overflow:visible;position:static}
#modal .dlg.kszlive>#mb>.opts.k3btns{padding:0 12px 12px;box-sizing:border-box}
html body #modal .dlg.kszlive #mb .opts.opts.opts.k3btns.k3btns>button{grid-column:span var(--k3s,1)!important;order:0!important;width:auto;min-width:0;max-width:none;margin:0}
#modal .dlg.kszlive .opts.k3meas>button{grid-column:auto}
html body #modal .dlg.kszlive #mb .opts.k3btns>button .kabody{min-width:6.5em}html body #modal .dlg.kszlive #mb .opts.k3btns>button :is(.kan,.kat){word-break:normal;overflow-wrap:normal;hyphens:none}`;document.head.appendChild(st)})();
/* the #modal .dlg element is reused by every pop-up: the live frame is undone before the next render */
function kszLiveReset3(){const d=document.querySelector("#modal .dlg");if(!d||!d.__ksz3)return;d.__ksz3=null;d.classList.remove("kszf","ksz3","kszlive");["ksz","pres","focus","lay"].forEach(k=>delete d.dataset[k])}
setTimeout(()=>{if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const m=typeof Q!=="undefined"?Q[0]:null;const d=document.querySelector("#modal .dlg");if(d&&d.__ksz3&&(d.__ksz3.m!==m||!d.__ksz3.body.isConnected))kszLiveReset3();const r=s0.apply(this,arguments);try{kitFrameLive3(m)}catch(e){}return r};window.showModal=showModal},5);
addEventListener("resize",()=>{const d=document.querySelector("#modal .dlg.kszlive");if(d)kszLiveRepick3(d)});
/* the older fit passes (rAF / resize) leave a live v3 frame alone: one layout owner per frame */
["kitDlgFit","kitDpFit","kitDpApply","kitCompactFit","kitOnePic","kitSlotFit"].forEach(n=>{try{const f=window[n];if(typeof f!=="function")return;const g=function(){const d=document.querySelector("#modal .dlg");if(d&&d.__ksz3)return;return f.apply(this,arguments)};window[n]=g;eval(n+"=g")}catch(e){}});
/* focal point on EVERY event picture outside the v3 frames too (owner 16/11 19:54Z, whole group): kitSceneArt — the one picture part — starts its
   cover crop on the subject box (object-position = the box centre); v3 frames then run the exact fit (kitPicFocus). */
(function(){if(typeof kitSceneArt!=="function")return;const a0=kitSceneArt;kitSceneArt=function(src,label,o){let h=a0.apply(this,arguments);try{const b=src&&kitPicSubj(src);
 if(b){const x=((b[0]+b[2])/2*100).toFixed(1),y=((b[1]+b[3])/2*100).toFixed(1);h=h.replace(/<img /,`<img style="object-position:${x}% ${y}%" `)}}catch(e){}return h};window.kitSceneArt=kitSceneArt})();
/* AGENDA / TODAY rows (owner 16/11 21:18Z, Tư trang "HÔM NAY": Thỉnh an Thái hậu had the Thái hậu picture, Thỉnh an Hoàng hậu and Tiết Thanh minh none):
   kitAgendaFact({k,n}) → a kitFacts row WITH its picture for every kind: th = Thái hậu · hh = the Empress (no Empress: kit vacant portrait) · emp / night =
   Hoàng thượng · fest = the festival picture (ev-fest-<key>, else the rite category picture) · anything else = act / category picture of its name.
   Whole group: every today / agenda list builds its rows with this. */
function kitAgendaPic(o){const ok=s=>s&&(typeof kitOptOnCdn!=="function"||kitOptOnCdn(s));try{
 if(o.k==="th")return typeof pTH==="function"?pTH():null;
 if(o.k==="hh"){const q=typeof rivals!=="undefined"&&rivals[0]&&rivals[0].alive?rivals[0]:null;return q||(typeof kitVacantFace==="function"?kitVacantFace():{src:"",ini:"?"})}
 if(o.k==="emp"||o.k==="night")return typeof pEmp==="function"?pEmp():null;
 if(o.k==="thuong")return S;
 if(o.k==="fest"){const f=typeof festToday==="function"?festToday():null;const s=f&&`img/ev-fest-${f.k}.webp`;if(ok(s))return{src:s,ini:""}}
 const a=typeof kitActArt==="function"?kitActArt(o.n||""):null;if(a&&ok(a.src))return{src:a.src,ini:""}}catch(e){}return null}
function kitAgendaFact(o,text){const p=kitAgendaPic(o);return p?{text:text||o.n,who:p,auto:false}:{text:text||o.n}}
Object.assign(window,{kitAgendaPic,kitAgendaFact});
