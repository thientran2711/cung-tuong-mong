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
 /* the 4 figure sizes = BODY height h (measured: head top → feet, crowns not counted) of an adult woman, × KIT_FIG.fac per person; cw = column width (a wide robe spreads under the text, KIT 56.4) */
 fig:{S:{h:142,cw:104},M:{h:218,cw:140},L:{h:294,cw:176},XL:{h:398,cw:220}},
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
 head:56,
 /* KIT 56.13 (reviewer, ROOT-55): the painted figure (robe, hem, sleeve) keeps at least this many px from the left edge of its frame / the screen: whole but never touching */
 edge:12};
window.KIT_SIZE=KIT_SIZE;KIT_SIZE.opt=window.KIT_OPT;
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
.kszfig>.kszfs{display:block;width:var(--kszcw);height:var(--kszfh);overflow:visible;position:relative}
.kszfig>.kszfs>img{position:absolute;left:0;bottom:0;height:100%;width:auto;max-width:none}
/* KIT 56.4: the figure is transparent and may spread out of its column; the info column is drawn ON TOP of it */
.kszfig{position:relative;z-index:0}.kszfig>.kt3{position:relative;z-index:2}.kszf .kszright,.ksz3 .k3right{position:relative;z-index:1}
/* frame pictures: portrait slot (no person), narrow banner (with person), long-story picture on TOP (XL) */
.kszpic{flex:none;width:var(--kszpw);height:var(--kszph)}
.kszban{width:min(100%,var(--kszbw));height:var(--kszbh);align-self:center;flex:none}
.kszpic>.ksart,.kszban>.ksart{width:100%;height:100%;aspect-ratio:auto}
.kszpic>.ksart img:not(.ksart-mark),.kszban>.ksart img:not(.ksart-mark),.kszll>.ksart img:not(.ksart-mark),.kszbp img{width:100%;height:100%;object-fit:cover;display:block}
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
/* owner 21/11 #81: when the left subject is HER, her rank / name tag gets «(ta)» under the name — she does not remember her own name */
function kszTa(tag,p){try{if(p!==S||!tag)return tag;const t='<small class="knr-ta">(ta)</small>';if(/<\/div><\/div>$/.test(tag))return tag.replace(/<\/div><\/div>$/,t+"</div></div>");if(/<\/div>$/.test(tag))return tag.replace(/<\/div>$/,t+"</div>")}catch(e){}return tag}
function kszFigHtml(p){let src=kitFigOf(p);if(p&&p.kind==="th"&&(!src||/unknown|sil/.test(src)))src=kszImg("img/fig-thaihau-h1-a51.webp");
 const [r,n]=kszRankName(p);let col="";try{col=kitPersonCol(p)}catch(e){}if(p&&(p.kind==="th"||(S&&(p===S.thO||p===S.emp)))&&typeof kitRankCol==="function")col=kitRankCol(7);
 const tag=kszTa(typeof kitTitleTag3==="function"?kitTitleTag3(p,r,n,col):kitNameRank(r,n,col),p);const age=p&&typeof p.age==="number"?p.age:null;
 return `<div class="kszfig">${tag}<span class="kszfs"><img src="${src}" alt="" crossorigin="anonymous" data-age="${age==null?"":age}"></span></div>`}
/* (6) ONE figure scale: the measured BODY (kitFigBody ht → b) of every figure = the layout's body height × KIT_FIG.fac (never the picture box) */
function kszFigFit(root){(root||document).querySelectorAll(".kszf .kszfig>.kszfs>img").forEach(im=>{const f=im.closest(".kszf");const lay=KIT_SIZE.lay[f.dataset.lay||"big"]||KIT_SIZE.lay.big;
 const v=(typeof kitFigBody==="function"?kitFigBody(im.src,()=>kszFigFit(f)):null)||(typeof kitFigWaitBody==="function"&&kitFigWaitBody(im,()=>kszFigFit(f)));if(!v)return;const age=im.dataset.age===""?null:+im.dataset.age;
 /* KIT 56.4 (owner 18/11 ~07:50Z, step 2 of 56.3): ONE body SKULL TOP -> feet for everybody of this layout (men are NOT taller: no x1.07; a child by age); crowns / robes / sleeves are not measured. */
 const kidf=typeof KIT_FIG==="object"&&age!=null?KIT_FIG.kid(age):1;f.__kszKid=kidf;const body=KIT_SIZE.fig[lay.fig].h*kidf*(f.__kszShrink||1);/* KIT 32.8 feet-fit: ×shrink only when the frame cap would cut the feet (kszFeetFit) */const H=body/Math.max(.2,v.b-kitFigTop(v));
 const ar=im.naturalWidth&&im.naturalHeight?im.naturalWidth/im.naturalHeight:v.ar,W=H*ar,cw=im.parentElement.clientWidth||KIT_SIZE.fig[lay.fig].cw;
 /* nothing is cut: .kszfs is overflow visible; the painted art is centred on the column, a wide robe spreads right under the text (drawn on top, z-index) */
 im.style.height=H+"px";im.style.width=W+"px";im.style.left=kitFullFigX(v,W,cw,kszLimL(im),cw).toFixed(1)+"px";im.style.translate="none";im.style.bottom=(-(1-v.b)*H)+"px";im.parentElement.style.height=Math.ceil(body*(1+kszCrown()))+"px"/* the same column height for everybody: skull top -> feet + the room of the tallest Hoàng hậu crown; a taller crown rises into the tag's free space (never cut) */})}
/* px the figure column has to its left inside the frame (the figure may spread that far left, never past the frame edge) */
function kszLimL(im){try{const d=im.closest(".kszf"),c=im.parentElement;return Math.max(0,c.getBoundingClientRect().left-d.getBoundingClientRect().left-(KIT_SIZE.edge||12))}catch(e){return 0}}
function kszCrown(){return(typeof BAL==="object"&&BAL.bookFrame&&BAL.bookFrame.cRef)||.131}
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
     opts:[op("Cúi đầu nhận lỗi",[["Được",ch("Thiện cảm",5)],["Mất",ch("Sủng",-1)]]),op("Thưa rằng do Hoàng thượng định",[["Thành",ch("Danh",2)],["Bại",ch("Oán",8)]]),op("Dâng lễ vật xin bỏ qua",[["Tốn",ch("Bạc",-20)],["Được",ch("Thiện cảm",8)]])]}],
   ["XL","VIỆC · Thái hậu · SAME layout (column, figure scale); only the info area is bigger · GỢI Ý = full-width box",{kind:"choice",title:"Thái hậu chê dung nhan",sub:"Trung tuần · buổi chiều",who:P.th,ban:"img/ev-thinh-an.webp",facts:[{who:P.th,text:"cho gọi ta đến trước mặt các phi tần, chê ta trang điểm lòe loẹt, không ra dáng người hầu hạ thánh giá."},"Các phi tần đứng quanh, có người che miệng cười."],
     opts:[op("Quỳ xuống nhận lỗi, xin Thái hậu dạy bảo",[["Tốn",`${BAL.kitpage.demo.k} khắc`],["Được",ch("Thiện cảm",6)+ch("Đức",1)],["Mất",ch("Danh",-1)],["Gợi ý","Thái hậu ưa người biết phận, nhận lỗi trước mặt mọi người thì bà nguôi giận nhanh"]]),op("Thưa rằng phấn son do Nội vụ phủ phát theo phẩm",[["Được",ch("Danh",1)],["Mất",ch("Thiện cảm",-4)],["Gợi ý","nói đúng lý nhưng làm bà mất mặt trước các phi tần"]]),op("Dâng chén trà, đổi sang chuyện kinh Phật",[["Cần","Tài nghệ Trà ≥ 2"],["Được",ch("Thiện cảm",4)],["Gợi ý","nếu trà không ngon bà càng giận"]]),op("Im lặng",[["Mất",ch("Thiện cảm",-2)]])]}]];
  for(const [k,lab,sp] of L)h+=`<div style="margin:10px 0 18px"><div class="kszlab">${lab}</div><div class="kszn" data-ksztbl></div><div data-want="${k}">${kszFrame(sp)}</div></div>`;
  h+=`<h3>(6)(7) ONE figure scale + ONE column per layout: every person's measured BODY = the same height (men are not taller, KIT 56.4); Thái hậu is never bigger than a consort</h3><p class="kszn">Layout "big" (VIỆC · ĐIỀU · LUẬT · BÁO · ĐÊM): figure L body ${Z.fig.L.h} px, column ${Z.fig.L.cw} · layout "small" (KẾT QUẢ · TIN): figure M body ${Z.fig.M.h} px, column ${Z.fig.M.cw}. The frame size S..XL changes only the info area.</p><div class="kszrow" style="align-items:flex-end">${[["Thái hậu",P.th],["Hoàng hậu",P.q],["phi tần",P.v2],["Hoàng thượng",P.emp]].filter(x=>x[1]).map(([l,p])=>`<div><div class="kszlab">${l}</div><div class="kszf" data-lay="big" style="width:auto;box-shadow:none;border:0;background:none">${kszFigHtml(p)}</div></div>`).join("")}</div>`}
 if(area==="buttons"){
  h+=`<h2>KIT SIZE 2 · THE action button + pictures</h2><p class="kszn">ONE button (kszBtn) everywhere: row 1 = picture LEFT + name, TỐN / ĐƯỢC / MẤT RIGHT; row 2 = GỢI Ý in one full-width box. Inside one frame every button is the SAME width and the same class (the largest one needed). The class (kitBtnSize) only sets the picture: S square 56 (≤ 2 rows, ≤ 70 characters) · LS square 72 (≤ 3 rows, ≤ 160) · LR 3:4 84x112 (more). The red tag on each sample = the kit class used.</p>`;
  h+=`<h3>S · in one frame (3.3 / 3.5): same width, square 56</h3><div class="kszopts" style="max-width:380px">${[op("Cúi đầu nhận lỗi",[["Tốn",`${BAL.kitpage.demo.k} khắc`]]),op("Thưa rằng do Hoàng thượng định",[["Tốn",`${BAL.kitpage.demo.k} khắc`]]),op("Dâng lễ vật xin bỏ qua",[["Tốn",ch("Bạc",-20)+` ${BAL.kitpage.demo.k} khắc`]]),op("Im lặng",[])].map(kszBtn).join("")}</div>`;
  h+=`<h3>LS · square 72 (moderate info)</h3><div class="kszopts" style="max-width:470px">${[op("Tâm sự",[["Tốn",`${BAL.kitpage.demo.k} khắc`],["Được",ch("Thiện cảm",6)],["Mất",ch("Sức",-5)]]),op("Sai đi dò la",[["Tốn",`${BAL.kitpage.demo.study.k} khắc`],["Được",`biết 2 điều thật về nàng ta, ${evSg(BAL.ag.ev.one)}`],["Mất",ch("Thiện cảm",-5)]])].map(kszBtn).join("")}</div>`;
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
 h+=`<h3>7.3 placeholder pictures: ONE set per real orientation (portrait 3:4 · landscape 2:1 · wide · square) × tone (light · dark) × size, painted at 2x (K-ICO-2, KIT §59)</h3><p class="kszn">Each slot shows the file that fits it: <code>kitPhPick(w,h,tone)</code> reads the slot's real aspect ratio + width (jph.js, the swap runs in <code>kitPhFit</code>).</p>`;
 h+=`<div>${[["portrait",["PS","PM","PL"]],["landscape",["LS","LM","LL"]],["square",["Q56","Q64","Q72"]]].map(([n,L])=>["light","dark"].map(t=>{const row=L.map(k=>{const p=Z[k];const w=typeof p.w==="number"?p.w:300,hh=typeof p.h==="number"?p.h:p.h[m];return box(k,kitPhPick(w,hh,t))}).join("");return `<div class="kszlab">${n} · ${t}</div><div class="kszrow" style="align-items:flex-end;margin-bottom:10px">${row}</div>`}).join("")).join("")}</div>`;
 return h}

/* ================= v3 · kit-size #3 (owner 16/11 16:45Z s20, OD "(16/11 16:45Z, s20 chat)" (1)–(6)) =================
   (1) EVERY frame shows BOTH the person AND the event picture (the event picture = the real game path: the event's own picture, else
       kitDefaultBanner(m,kind), jk4 §50.3 OD:L448). A frame with no person of its own shows its MAIN SUBJECT, else the event picture (owner 21/11 canon overwrite: the palace-official narrator is gone; was owner 16/11 19:23Z: the named
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
 pres:{S:"one",M:"fig",L:"fig",XL:"fig"},
 /* S = small content: body up to bodyS, body + its button rows up to capS */
 bodyS:200,capS:{kv1:340,kv2:340},
 colS:104,porS:88,picS:"PM",picMinS:KIT_SIZE.pic.PM.h,evMin:{one:46,fig:56},subjPad:.04,
 btn:{cellS:140,cellLong:280,gap:6,txtMin:200,stackBelow:80}};
/* v3 figure sizes (measured BODY px, × KIT_FIG.fac) of the "fig" presentations: big enough that M holds more than S, L more than M, XL more than L */
/* KIT 56.12 (owner 18/11 ~21:35Z, standard figure frame): XL3 = 393, measured on the crowned Hoàng hậu in the real XL frames on Fold 755x1000 AND iPad 1180x820 (the XL frame cap leaves exactly this body + crown room; the old 455 was always shrunk to 393 by kszFeetFit, so two XL frames could never agree) -> same class = same body everywhere, no shrink.
/* KIT 56.8 (owner 18/11 ~18:40Z): every body h of the classes = old h x (1+.072)/(1+.131): the column (body + the room of the tallest Hoang hau crown, .131) keeps its old height, the body shrinks so a crown never reaches the name tag */KIT_SIZE.fig3={M:{h:284,cw:140},L:{h:351,cw:162},XL:{h:393,cw:220}};Object.assign(KIT_SIZE.fig,{M3:KIT_SIZE.fig3.M,L3:KIT_SIZE.fig3.L,XL3:KIT_SIZE.fig3.XL});
Object.assign(KIT_SIZE.lay,{M:{fig:"M3"},L:{fig:"L3"},XL:{fig:"XL3"}});
/* narrow T3 ladder (kszNarrow3): figure height = f × modal height, at most max; column cw. NS = the small portrait ("one"). */
/* KIT 56.6 (owner 18/11 ~16:10Z, fullbody-frame s4): the scene picture of a frame is BIG (it fills what the text leaves) only while everything under it fits with NO scroll; when the frame would scroll it steps down this ladder of KIT_SIZE.pic classes (biggest first, never below the smallest) just far enough to remove the scroll. ONE rule (kszPicStep3), no per-frame size. */
KIT_SIZE.v3.picLadder=["LL","NL","NM","NS"];
KIT_SIZE.v3.narrow={minRight:274,NL:{f:.246,max:246,cw:112},NM:{f:.18,max:171,cw:96}};Object.assign(KIT_SIZE.v3.pres,{NL:"fig",NM:"fig",NS:"one"});
Object.assign(KIT_SIZE.fig,{NL3:{h:246,cw:112},NM3:{h:171,cw:96}});Object.assign(KIT_SIZE.lay,{NL:{fig:"NL3"},NM:{fig:"NM3"},NS:{fig:"NM3"}});
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
.ksz3[data-pres="fig"] .k3body>.kszfig{align-self:flex-start}
.ksz3 .k3main{flex:none;width:${V.colS}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.ksz3 .k3main>.kt3{text-align:center;width:max-content;max-width:${V.colS+24}px}
.ksz3 .k3mpor{align-self:center}.ksz3 .k3mitem{flex:none;align-self:center;width:${V.colS}px;min-height:${Z.pic[V.picS].h}px;display:flex;align-items:center;justify-content:center}.ksz3 .k3mitem>.kiev{margin:0;max-width:100%}.ksz3 .k3mpor>.pcp{width:${V.porS}px;flex:none}
.ksz3 .k3mpic,.ksz3 .k3ev{position:relative;overflow:hidden;border-radius:6px;border:1px solid var(--gold,#8f5f0c);box-shadow:inset 0 0 0 1px #fffaf0;box-sizing:border-box}
/* S event picture = ONE standard kit size (owner 16/11 19:54Z: no stretched ratio): KIT_SIZE.pic[V.picS] (PM 120x160, 3:4), centred in the body */
.ksz3 .k3main.k3mpic{flex:none;width:${Z.pic[V.picS].w}px;height:${Z.pic[V.picS].h}px;min-height:0;align-self:center}
.ksz3[data-pres="fig"] .k3body>.k3main.k3mpic.k3fill{align-self:stretch;height:auto;min-height:${Z.pic[V.picS].h}px}/* KIT 84c: person-less main picture fills its column */
.ksz3 .k3ev{flex:1 1 auto;min-height:${V.evMin.fig}px}.ksz3[data-pres="one"] .k3ev{min-height:${V.evMin.one}px}
.ksz3 .k3mpic>.ksart,.ksz3 .k3ev>.ksart{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto;margin:0;border:0;box-shadow:none;border-radius:0}
.ksz3 .k3mpic>.ksart img:not(.ksart-mark),.ksz3 .k3ev>.ksart img:not(.ksart-mark){width:100%;height:100%;object-fit:cover;display:block}
.ksz3 .k3btns{display:grid;grid-template-columns:repeat(var(--k3c,1),minmax(0,1fr));gap:${V.btn.gap}px;flex:none}
.ksz3[data-pres="one"]>.k3btns{padding:0 12px 12px}
.ksz3 .k3btns>.kszb{grid-column:span var(--k3s,1);width:auto;min-width:0}
.ksz3 .kszb[data-kbs="S"] .kszr{flex-wrap:wrap;row-gap:0;white-space:nowrap}.ksz3 .kszb .kchip{white-space:nowrap}.ksz3 .k3btns .kszb[data-kbs="S"] .kszbt{min-width:6.5em}.ksz3 .k3btns>.kszb{padding:5px}.ksz3 .k3btns>.kszb>.kszbr{gap:6px}.ksz3 .k3meas{display:block}
.ksz3 .kszfig>.kt3{max-width:calc(var(--kszcw) + 24px)}
.ksz3.kszf{max-height:none}`);
 const st=document.createElement("style");st.id="k-size3";st.textContent=css.join("\n");document.head.appendChild(st)})();
/* THE LEFT SLOT = THE MAIN SUBJECT (owner 21/11: #58 #67 #70 #76 #77, law 6b REAL PEOPLE; the default ma-ma narrator is GONE from every dialog):
   ONE helper, every frame goes through it (kitFrameLive3 + the kit sample frames). The left slot shows, first match wins:
   (1) the person the dialog names (sp.who / kitStagePeople) — an Emperor who judges, a thái y who is overheard…;
   (2) a choice she makes ALONE (a picker she opened: KIT_ACT_PIDS, the entourage picker, an act, a shop) → HER OWN figure;
   (3) the one person the lines are about (exactly ONE other person named in the text) → that person; many people (a list of visitors) → nobody in particular;
   (4) only her ("ta"), no other person → HER OWN figure (her own event: fear, tears…);
   (5) nobody → the event picture (the person-less frame: small frames keep the picture on the left).
   No palace official stands in a frame because of her office: a person is there only when the scene names her. */
function kszOwnAct3(m){try{if(!m)return false;return !!(m.entp||m.act||m.shop||m.ownAct||(m.pid&&typeof KIT_ACT_PIDS!=="undefined"&&KIT_ACT_PIDS.has(m.pid)))}catch(e){return false}}
function kszNormP(p){return p&&(p.__kp||p)}
function kszWho3(sp){if(sp.who)return sp.who;if(sp.m&&kszOwnAct3(sp.m))return S;return null}
function kszSubject3(m,main){try{if(m&&m.subject==="matter")return null;/* #76 the dialog forces "the matter itself" */let P=[];try{P=kitStagePeople(m)}catch(e){}if(P[0])return P[0];if(m&&m.kit&&m.kit.who)return m.kit.who;/* a kitPanel spec names its person */if(kszOwnAct3(m))return S;
 const ps=[];if(main)main.querySelectorAll(".kfact[data-kfp]").forEach(r=>{const p=typeof kfpGet==="function"?kfpGet(r.dataset.kfp):null;if(p&&!ps.some(q=>kszNormP(q)===kszNormP(p)))ps.push(p)});
 const oth=ps.filter(p=>kszNormP(p)!==S);if(oth.length===1)return oth[0];if(oth.length>1)return null;
 if(ps.length===1)return S;/* only she is named */
 const tx=main?String(main.textContent||""):"";if(/(^|[\s,.;:(])ta([\s,.;:)]|$)/i.test(tx))return S;return null}catch(e){return null}}
/* the player is the figure: her own small avatar beside her own line is a second copy of the same person (owner 21/11) — see kszAvatarRule3 */
function kszDropMe3(root){try{if(!root)return;root.querySelectorAll(".kfact.kfme > .md").forEach(x=>{const f=x.closest(".kfact");x.remove();if(f)f.classList.add("kfnodot")})}catch(e){}}
/* ONE AVATAR RULE (owner 21/11 #62 #64 #65 #78 #79, whole game; run at every layout of a live frame):
   - a line naming MANY people (≥ 2) → NO avatar (a list of visitors);
   - the left slot already shows a person (figure / framed portrait) → that same person NEVER again (no line avatar);
   - a SECOND person (not the left subject) in a frame whose left slot shows a person → her kit avatar sits ON the event picture (top-left corner overlay), never in the text;
   - left slot = the event picture (no subject): the one person who acts keeps her avatar beside her line (small picture-only notice), the same on Fold and iPad.
   An unnamed carrier ("thái giám mang bạc đến") has no person object → no avatar. */
function kszAvatarRule3(dlg){try{const X=dlg.__ksz3;if(!X||!X.right)return;const R=X.right;const leftPerson=!!X.who&&X.slot!=="item"&&X.slot!=="matter";const sub=kszNormP(X.who);const sec=[];
 R.querySelectorAll(".kfact[data-kfp]").forEach(row=>{const chip=row.querySelector(":scope > .md");row.classList.remove("kfav-off");if(!chip)return;const p=typeof kfpGet==="function"?kfpGet(row.dataset.kfp):null;const n=+row.dataset.kfn||1;let off=false;
  if(n>=2)off=true;else if(leftPerson&&p&&kszNormP(p)===sub)off=true;else if(leftPerson){off=true;if(p&&!sec.some(q=>kszNormP(q)===kszNormP(p)))sec.push(p)}
  row.classList.toggle("kfav-off",off)});
 R.querySelectorAll(":scope>.k3ev .kevav").forEach(x=>x.remove());const ev=R.querySelector(":scope>.k3ev");
 if(ev&&sec.length&&typeof kitFaceH==="function"){const h=sec.slice(0,2).map(p=>{let f="";try{f=kitFaceH(p,"big")}catch(e){}return f}).join("");if(h)ev.insertAdjacentHTML("beforeend",`<span class="kevav">${h}</span>`)}
 else if(sec.length)R.querySelectorAll(".kfact.kfav-off").forEach(r=>{/* no picture in this layout: the line keeps its avatar rather than losing the person */const c=r.querySelector(":scope > .md");if(c&&+r.dataset.kfn<2)r.classList.remove("kfav-off")})}catch(e){console.error("kszAvatarRule3",e)}}
/* the event picture = the real game path: the event's own picture, else kitDefaultBanner (kitInfoArt of the title, else one per kind) */
function kszEvSrc3(sp){if(sp.pic)return kszImg(sp.pic);let b=null;try{b=kitDefaultBanner({t:sp.title},sp.kind)}catch(e){}return b&&b.src?kszImg(b.src):""}
function kszPic3(src,cls,mk){const sj=kitPicSubj(src);return `<div class="${cls}"${sj?` data-subj="${sj.join(",")}"`:""}>${kitSceneArt(src,"",Object.assign({shape:"wide",cap:false},mk&&mk.mark?{mark:mk.mark,markAlt:mk.markAlt||""}:{})).replace(/ loading="lazy"/g,"")}</div>`/* a frame picture is on screen: never lazy */}
/* ---- #76 LEFT-SLOT KIT PART (owner 21/11 ~05:21Z «Đồ thất lạc»; one part for the builder kszFrame3 and the live frame kszLiveLay3) ----
   The left slot of a small ("one") frame holds the MAIN SUBJECT of the dialog: a PERSON (portrait frame + tag), an ITEM (the item tile) or a MATTER (the event picture itself).
   The event picture is only the left slot when there is no person or item; with a person or an item the event picture is the TOP of the right column (owner #80).
   WHO is decided by the dialog (dialog-person): `spec.subject` = "person" | "item" | "matter" (forces it), `spec.who` (explicit person), `spec.item` (item info of kitItemInfo, or {k}),
   or a leading item tag (.kiev) in the body text. Without any of them: the frame kind (KIT_SIZE.v3.focus) decides as before (person-centred kinds → the person, else the matter).
   kszSubject3(m,main) (dialog-person) resolves WHO the person is; kszSlotType3({who,item,subject}) -> "person" | "item" | "matter" decides what fills the slot (an item beats a person, `subject` forces).
   kszSlot3(type,{who,item,src,mk}) -> {left,evTop}: the left column html and whether the event picture goes to the top of the right column. */
function kszSlotType3(o){if(o.subject==="matter")return"matter";if(o.item&&o.subject!=="person")return"item";if(o.who)return"person";return"matter"}
function kszItemSlot3(item){let el=null;if(item&&item.nodeType===1)el=item;else if(item){try{el=document.createElement("div");el.innerHTML=kitItemTag(item.name?item:(typeof kitItemInfo==="function"?kitItemInfo(item):item));el=el.firstElementChild}catch(e){el=null}}
 return el}
function kszSlot3(type,o){if(type==="item"&&o.item){const el=kszItemSlot3(o.item);if(el){el.classList.remove("kiev-txt","kiev-ban");el.classList.add("kiev-slot");const w=document.createElement("div");w.className="k3main k3mitem";w.appendChild(el);return{left:w.outerHTML,evTop:!!o.src}}}
 if(type==="person"&&o.who)return{left:kszPor3(o.who),evTop:!!o.src};
 return{left:kszPic3(o.src,o.fill?"k3main k3mpic k3fill":"k3main k3mpic",o.mk),evTop:false}}
function kszPor3(p){const [r,n]=kszRankName(p);let col="";try{col=kitPersonCol(p)}catch(e){}
 if(p&&(p.kind==="th"||(S&&(p===S.thO||p===S.emp)))&&typeof kitRankCol==="function")col=kitRankCol(7);
 const tag=kszTa(typeof kitTitleTag3==="function"?kitTitleTag3(p,r,n,col):kitNameRank(r,n,col),p);let f;try{f=p&&p.kind==="th"?pTH():kitFace(p)}catch(e){f={src:"",ini:"?"}}
 return `<div class="k3main k3mpor">${tag}${pcPort(f)}</div>`}
/* spec {kind,title,sub,who?,pic?,facts,rows,opts} + size K → frame html (kitFrameApply3 after mount) */
function kszFrame3(sp,K){const V=KIT_SIZE.v3,pres=V.pres[K]||"fig",foc=V.focus[sp.kind]||"person",who=sp.noWho?null:kszWho3(sp),ev=kszEvSrc3(sp);
 const R=[];let left="";
 /* KIT 84c PERSON-LESS frame (sp.noWho / a place card): the main picture is the left column — standard size in "one" (S / narrow), FILLING the column (cover-crop, true ratio, k3fill) in "fig" (M/L/XL); no narrator, no second picture */
 if(!who)left=kszPic3(ev,pres==="one"?"k3main k3mpic":"k3main k3mpic k3fill",sp.mk);
 else if(pres==="one"){const T=kszSlotType3({who,item:sp.item,subject:sp.subject}),SL=kszSlot3(T,{who,item:sp.item,src:ev,mk:sp.mk});left=SL.left;if(SL.evTop)R.push(kszPic3(ev,"k3ev",sp.mk))}/* #76 left slot = the main subject; #80 the event picture on top of the right column */
 else{left=who?kszFigHtml(who):"";R.push(kszPic3(ev,"k3ev",sp.mk))}
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
 const base=KIT_SIZE.v3.evMin[(c.closest(".ksz3")||{dataset:{}}).dataset.pres]||56;if((c.closest(".ksz3")||{dataset:{}}).dataset.evfit==="s"&&c.classList.contains("k3ev"))return kszEvStrip3(c);/* LAW 10: options do not fit -> the picture is the standard strip (never dropped, KIT 56.6) */const sj=c.dataset.subj?c.dataset.subj.split(",").map(Number):null;if(!sj||!n||!c.classList.contains("k3ev"))return base;
 const w=c.clientWidth;const NM=KIT_SIZE.pic.NM;return Math.max(base,Math.min(Math.ceil(w*NM.h/NM.w),Math.ceil((sj[3]-sj[1])*n[1]*(w/n[0])*1.06)))/* the strip's floor is at most the standard NARROW strip ratio (NM 300x84): a taller subject is shown whole by kitPicFocus (zoom-out), never by a taller frame */}
function kszPicFit3(root){root.querySelectorAll(".k3ev,.k3mpic").forEach(c=>{const im=c.querySelector("img");if(c.classList.contains("k3ev"))c.style.minHeight=c.dataset.pstep?"0px":kszEvMin3(c)+"px";if(!im||!im.naturalWidth)return;kitPicFocus(c,im)})}

/* KIT 56.6 picture step-down. overflow = how many px the frame's info column / body / button area / option list (.opts, the scroll owner of L/XL frames, KIT 56.18) scroll (0 = fits). Kept only if it helps: a scroll the picture cannot remove (text + buttons alone too tall) leaves the picture as it was. Returns the class used ("" = big/fill). */
function kszOver3(dlg){const mb=document.getElementById("mb"),R=dlg.querySelector(".k3right"),B=dlg.querySelector(".k3body");let o=0;[R,B,mb,dlg.querySelector(".k3right>.opts")].forEach(e=>{if(e&&e.getClientRects().length)o=Math.max(o,e.scrollHeight-e.clientHeight)});return o>1?o:0}
function kszPicH3(k){const p=KIT_SIZE.pic[k];return typeof p.h==="number"?p.h:p.h[kitSzMode()]}
function kszPicStep3(dlg,again){try{const ev=dlg.querySelector(".k3right>.k3ev");dlg.dataset.picc="";if(!ev)return"";if(!again){clearTimeout(dlg.__pstT);dlg.__pstT=setTimeout(()=>{if(dlg.isConnected)kszPicStep3(dlg,1)},180)}/* the layout settles after the first pass (figure feet-fit, fonts): the step is decided again from scratch, so a picture is never smaller than the scroll needs */const foc=()=>{const im=ev.querySelector("img");if(im&&im.naturalWidth)kitPicFocus(ev,im)};const set=h=>{ev.dataset.pstep="1";ev.style.flex="none";ev.style.minHeight="0px";ev.style.height=h+"px";foc()};const reset=()=>{delete ev.dataset.pstep;ev.style.flex="";ev.style.height="";ev.style.minHeight=kszEvMin3(ev)+"px";foc()};reset();const base=kszOver3(dlg);if(!base)return"";const h0=ev.offsetHeight;let best="",bo=base;
 const strip=kszEvStrip3(ev);for(const k of KIT_SIZE.v3.picLadder){const h=kszPicH3(k);if(h>=h0)continue;set(h);const o=kszOver3(dlg);if(o<bo&&(!o||h>=strip)){bo=o;best=k}if(!o)break}/* KIT 56.6 (owner 19/11 ~04:15Z): a class below THE STRIP is used only when it removes the scroll; a scroll no class removes keeps the strip at least */
 if(!best){if(bo&&strip<h0){set(strip);dlg.dataset.picc="strip";return"strip"}reset();return""}
 set(kszPicH3(best));dlg.dataset.picc=best;return best}catch(e){console.error("kszPicStep3",e);return""}}
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
 if(bs.some(b=>b.classList.contains("kart")))need=Math.max(need,270);/* §6.2 option card = picture + text: never a cell under 270 px (149 px cells wrapped the Được/Mất text one word per line, owner 17/11) */
 need=kszNeedTxt(bs,need,B);const nar=g.closest(".dlg")&&g.closest(".dlg").dataset.narrow==="1";const cols=nar?1:Math.max(1,Math.floor((w+B.gap)/(need+B.gap)));const cell=(w-(cols-1)*B.gap)/cols,long=Math.min(cols,Math.ceil((B.cellLong+B.gap)/(cell+B.gap)));g.style.setProperty("--k3c",cols);
 bs.forEach(b=>b.style.setProperty("--k3s",b.dataset.kbs==="S"?1:long))})}
/* the left column decides the body height; the event picture in the info grows into what the text leaves */
function kitFrameApply3(dlg){try{kszFigFit(dlg)}catch(e){}kszBtnGrid3(dlg);const R=dlg.querySelector(".k3right"),L=dlg.querySelector(".k3body>.kszfig,.k3body>.k3mpor,.k3body>.k3mitem");
 if(R){R.style.minHeight=L?L.offsetHeight+"px":(dlg.dataset.pres==="one"?KIT_SIZE.v3.picMinS+"px":"");/* XL: the body stays the figure's height, more text scrolls inside the info column */if(dlg.dataset.ksz==="XL"&&L){R.style.maxHeight=L.offsetHeight+"px";R.style.overflow="auto"}}kszPicFit3(dlg);kszPicFit3(dlg);kszPicStep3(dlg);return dlg.dataset.ksz}
/* does the content fit this size? (info column measured with the event picture at its smallest) */
function kitFrameFits3(dlg,strict){const K=dlg.dataset.ksz,m=kitSzMode();if(K==="XL"&&!strict)return true;const R=dlg.querySelector(".k3right"),L=dlg.querySelector(".k3body>.kszfig,.k3body>.k3mpor,.k3body>.k3mitem"),ev=R&&R.querySelector(":scope>.k3ev");
 const mh=R.style.minHeight,mx=R.style.maxHeight;R.style.minHeight="";R.style.maxHeight="";const ef=ev&&ev.style.flex,eh=ev&&ev.style.height,em=ev&&ev.style.minHeight;if(ev){ev.style.flex="none";ev.style.minHeight="";ev.style.height=kszEvMin3(ev)+"px"}
 const need=R.offsetHeight;if(ev){ev.style.flex=ef;ev.style.height=eh;ev.style.minHeight=em}R.style.minHeight=mh;R.style.maxHeight=mx;const lh=L?L.offsetHeight:0;
 if(dlg.dataset.pres==="fig")return L||!dlg.querySelector(".k3fill")?need<=lh+2:true;const btn=dlg.querySelector(":scope>.k3btns");
 const body=Math.max(need,lh,KIT_SIZE.v3.picMinS);return (L?need<=lh+2:body<=KIT_SIZE.v3.bodyS)&&body+(btn?btn.offsetHeight:0)<=KIT_SIZE.v3.capS[m]}
/* THE picker: the smallest size whose presentation holds the content */
function kitFramePick3(sp,host){for(const K of ["S","M","L","XL"]){host.innerHTML=kszFrame3(sp,K);const d=host.firstElementChild;kitFrameApply3(d);if(kitFrameFits3(d))return K}return"XL"}
Object.assign(window,{kszPicStep3,kszFrame3,kitFrameApply3,kitFrameFits3,kitFramePick3,kszPicFit3,kszBtnGrid3});
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
 const fit=()=>kszKeep3(d,()=>d.querySelectorAll(".ksz3").forEach(kitFrameApply3));fit();d.querySelectorAll("img").forEach(i=>i.complete||i.addEventListener("load",fit,{once:true}));return d}
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
   left = the MAIN SUBJECT of the event (kszSubject3: named person / her own act / the one person the lines are about / her own event), else the event picture; full figure at M/L/XL, portrait pendant
   at S (person-centred kinds) or the event picture (event-centred kinds). Event picture = the dialog's own band / tall slot, else kitEvArt / kszEvSrc3.
   Size = the smallest of S/M/L/XL whose presentation holds the content (kitFrameFitsLive3); XL: more text scrolls inside the info column.
   NOT converted (pages, not event frames): identity card .kpid, person card (pcm), scene panels without a kind, and bodies holding a page part
   (KSZ_LIVE_SKIP: calendars, pickers, inventories, shops, relation tables, stat grids, tables, exam / card-flip pages). */
const KSZ_LIVE_SKIP=".kpt-mount,.kpid,.kmc,.kpick,.kpicks,.kinv,.kshg,.kshop,.kreltab,.krelt,.kstgrid,.kip,table,.kexam,.kflip,.kpl,.kmlist,.kslot,.kpets,.kgift,.kpkgrid";
KIT_SIZE.v3.live={maxOpts:7,maxSecs:4};/* kit-rank-name (OD:L1351): the tag's rank line is the RANK (Thái giám), never the office (Kính sự phòng) — the old office override is deleted */
/* owner 21/11 (mood-seal): the picture of a look-up frame (Tâm trạng · X) carries the mood seal in its corner (kitSceneArt o.mark, KIT 28.19b); the live frame rebuilds its picture, so it takes the seal along (from the dialog's own band, else the headArt) */
function kszLiveMark3(m,mb){let mark="",alt="";try{const i=mb.querySelector(":scope > .kdlgart .ksart-mark");if(i){const u=i.tagName==="IMG"?[0,i.getAttribute("src")]:/url\(["']?([^"')]+)/.exec(i.style.backgroundImage||"");if(u)mark=u[1];alt=i.getAttribute("aria-label")||""}}catch(e){}
 if(!mark){const h=m&&m.headArt;if(h&&typeof h!=="string"&&h.mark){mark=h.mark;alt=h.markAlt||""}}
 if(!mark&&typeof emoEvMark==="function"){const x=emoEvMark(m);if(x){mark=x.mark;alt=x.markAlt}}/* an event that comes from a feeling (mark #68): its seal on the picture even when the picture came from the left slot */
 return mark?{mark,markAlt:alt}:null}
function kszLiveSrc3(m,mb,kind){let src="";const im=mb.querySelector(":scope > .kdlgart img, :scope > .kpb > .kpsubj.kpev img, :scope > .kpb > .kpsubj.kpiart img");if(im)src=im.getAttribute("src")||"";
 if(!src&&m&&m.kit&&m.kit.pic)src=m.kit.pic;if(!src&&m&&m.headArt&&m.headArt.src)src=m.headArt.src;
 if(!src){try{const a=typeof kitEvArt==="function"?kitEvArt(m):null;if(a&&a.src)src=a.src}catch(e){}}
 return src?kszImg(src):kszEvSrc3({kind,title:m&&m.t})}
/* the option buttons of the game (.opt / .ka cards, §6.2) in the v3 grid: short ones one cell, long ones the cells for ≥ cellLong */
function kszBtnGridLive3(g){const B=KIT_SIZE.v3.btn,w=g.clientWidth;if(!w)return;const bs=[...g.children].filter(b=>b.tagName==="BUTTON"&&b.getClientRects().length);
 bs.forEach(b=>{b.dataset.kbs=kitBtnSize({rows:b.querySelectorAll(".kar,.kl,.kr-why,.kab>*").length,chars:((b.querySelector(".kabody")||b).textContent||"").replace(/\s+/g," ").trim().length})});
 g.classList.add("k3meas");let need=B.cellS;bs.filter(b=>b.dataset.kbs==="S").forEach(b=>{b.style.setProperty("width","min-content","important");b.style.setProperty("min-width","0","important");need=Math.max(need,Math.ceil(b.getBoundingClientRect().width));b.style.removeProperty("width");b.style.removeProperty("min-width")});g.classList.remove("k3meas");
 if(bs.some(b=>b.classList.contains("kart")))need=Math.max(need,270);/* §6.2 option card = picture + text: never a cell under 270 px (149 px cells wrapped the Được/Mất text one word per line, owner 17/11) */
 need=kszNeedTxt(bs,need,B);const nar=g.closest(".dlg")&&g.closest(".dlg").dataset.narrow==="1";const cols=nar?1:Math.max(1,Math.floor((w+B.gap)/(need+B.gap)));const cell=(w-(cols-1)*B.gap)/cols,long=Math.min(cols,Math.ceil((B.cellLong+B.gap)/(cell+B.gap)));g.style.setProperty("--k3c",cols);
 bs.forEach(b=>b.style.setProperty("--k3s",b.dataset.kbs==="S"?1:long));try{if(typeof kitOptTier==="function"&&bs.some(b=>b.matches("button.ka.kopt")))kitOptTier(g)}catch(e){}}
/* the height the info column may take: the modal box minus the frame's header, button row and body padding */
function kszLiveRoom3(dlg){const M=document.getElementById("modal");if(!M)return 9999;let ch=24+22+4;[...dlg.children].forEach(c=>{if(c.id!=="mb"&&c.getClientRects().length&&getComputedStyle(c).position!=="absolute")ch+=c.offsetHeight});
 const mb=document.getElementById("mb");if(mb)[...mb.children].forEach(c=>{if(!c.classList.contains("k3body")&&c.getClientRects().length)ch+=c.offsetHeight});return M.clientHeight-ch}
/* KIT 32.8 (fig-feet-crop-2, owner 17/11 "hình nào cũng bị crop mất chân", VIỆC timed choice on Fold + iPad): a live frame is capped (max-height, overflow hidden);
   at a size whose figure column (tag + the layout's figure height) is taller than the cap leaves room for, the bottom of the figure (hem, shoes) was clipped.
   The ONE rule: the figure column NEVER exceeds the room the frame has (cap − header − button row − body padding); when it would, the figure is scaled down
   (dlg.__kszShrink, read by kszFigFit) just enough; the bottom is never cropped. Not touched when it already fits. */
function kszFeetFit(dlg){try{const B=dlg.querySelector(".k3body"),L=B&&B.querySelector(":scope>.kszfig");dlg.__kszShrink=1;if(!L)return;kszFigFit(dlg);
 const cap=parseFloat(getComputedStyle(dlg).maxHeight);if(!(cap>0))return;
 /* KIT 56.4 (owner 18/11 ~07:50Z): the room is measured for the TALLEST crown (Hoàng hậu, BAL.bookFrame.cRef above the skull top), never for this person: every person of the frame gets the same body, nobody is shrunk for being an outlier */
 const lay=KIT_SIZE.lay[dlg.dataset.lay||"big"]||KIT_SIZE.lay.big,cRef=(typeof BAL==="object"&&BAL.bookFrame&&BAL.bookFrame.cRef)||0;
 for(let i=0;i<4;i++){const mbx=document.getElementById("mb");let fixed=2;[...dlg.children].forEach(c=>{if(c!==mbx&&c.getClientRects().length&&getComputedStyle(c).position!=="absolute")fixed+=c.offsetHeight});if(mbx)[...mbx.children].forEach(c=>{if(c!==B&&c.getClientRects().length)fixed+=c.offsetHeight});const room=cap-fixed-26;/* the room = the cap minus the frame's own parts (header, buttons, body padding): the same for every person, never read from the current figure */
  const fs=L.querySelector(".kszfs"),h=fs?fs.offsetHeight:0;if(h<=60)break;const body0=KIT_SIZE.fig[lay.fig].h*(dlg.__kszKid||1),tg=L.querySelector(":scope>.kt3"),part=L.offsetHeight-h+(tg&&!tg.querySelector(".kdh,.kdh-cap")?kszPlateH():0),allow=(room-part)/(1+cRef),cur=body0*dlg.__kszShrink;
  if(allow>=cur-.5)break;dlg.__kszShrink=Math.max(.3,allow/body0);kszFigFit(dlg)}
 if(dlg.__kszFill)kszFigFill3(dlg,cap,lay,cRef)
}catch(e){console.error("kszFeetFit",e)}}
/* KIT 56.17 FIGURE FILLS THE FRAME (owner 19/11 ~04:15Z "tại sao ông hoàng thượng á, đứng trên cao vậy mà không có giãn cái tỷ lệ ra cho đúng mấy cái khung?"; OD 18/11 ~21:20Z (1)
   "the figure FILLS the left column height of the frame ... never a short figure floating in a tall frame"). After the size is picked (kszLivePick3 sets dlg.__kszFill), when the
   frame body is taller than the class figure column (the info / option column is taller: XL, more text scrolls inside it), the ONE body of the frame grows so the column
   (name tag + the tallest Hoàng hậu crown room + skull -> feet) reaches the body floor: target = min(the room the frame cap leaves, the info column's own height).
   Same factor for every person of the frame (read from the frame, never from the figure shown); true proportions (height and width scale together); feet on the floor.
   Never runs inside the size picker (a grown figure would make every size "fit"). */
function kszFigFill3(dlg,cap,lay,cRef){const B=dlg.querySelector(".k3body"),L=B&&B.querySelector(":scope>.kszfig"),R=B&&B.querySelector(":scope>.k3right"),fs=L&&L.querySelector(".kszfs");if(!L||!R||!fs)return;
 const mbx=document.getElementById("mb");let fixed=2;[...dlg.children].forEach(c=>{if(c!==mbx&&c.getClientRects().length&&getComputedStyle(c).position!=="absolute")fixed+=c.offsetHeight});if(mbx)[...mbx.children].forEach(c=>{if(c!==B&&c.getClientRects().length)fixed+=c.offsetHeight});
 const pad=(parseFloat(getComputedStyle(B).paddingTop)||0)+(parseFloat(getComputedStyle(B).paddingBottom)||0);const M=document.getElementById("modal");if(!(cap>0))cap=M?M.clientHeight-24:0;if(!(cap>0))return;const room=cap-fixed-pad-4;
 const mh=R.style.minHeight,mx=R.style.maxHeight,ov=R.style.overflow;R.style.minHeight="";R.style.maxHeight="";R.style.overflow="visible";const want=Math.ceil(R.scrollHeight);R.style.minHeight=mh;R.style.maxHeight=mx;R.style.overflow=ov;
 const tall=dlg.dataset.ksz==='XL'||dlg.dataset.ksz==='L';/* OD 21/11 ~03:54Z (#47): every L / XL frame of a device has the SAME figure size + position: the figure column always fills the room the frame cap leaves, whatever the info / options say */
 const lh=L.offsetHeight,target=tall?room:Math.min(room,want);if(target<=lh+2)return;
 const tg=L.querySelector(":scope>.kt3"),part=lh-fs.offsetHeight+(tg&&!tg.querySelector(".kdh,.kdh-cap")?kszPlateH():0),body0=KIT_SIZE.fig[lay.fig].h*(dlg.__kszKid||1),allow=(target-part)/(1+cRef);
 if(allow>body0*dlg.__kszShrink+.5){dlg.__kszShrink=allow/body0;kszFigFit(dlg)}}
window.kszFigFill3=kszFigFill3;

window.kszFeetFit=kszFeetFit;
/* KIT 56.4: the height a worn-title plate adds to the name tag (measured once); the room of every frame is reckoned WITH the plate, so a person with a title and one without get the same body */
let KSZ_PLATEH=null;function kszPlateH(){if(KSZ_PLATEH!=null)return KSZ_PLATEH;let h=0;try{const T=typeof KIT_TITLES!=="undefined"&&KIT_TITLES[0],pl=T&&typeof kitTitlePlate==="function"?kitTitlePlate(T,{cls:"kdh-cap"}):"";if(pl){const x=document.createElement("div");x.className="kszf";x.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0";x.innerHTML=`<div class="kszfig"><div class="kt3">${pl}</div></div>`;document.body.appendChild(x);h=x.querySelector(".kt3").offsetHeight+2;x.remove()}}catch(e){}return KSZ_PLATEH=h}
function kitFrameApplyLive3(dlg){try{kszFeetFit(dlg)}catch(e){}const g=dlg.querySelector(".opts.k3btns");if(g)kszBtnGridLive3(g);
 const R=dlg.querySelector(".k3right"),L=dlg.querySelector(".k3body>.kszfig,.k3body>.k3mpor,.k3body>.k3mitem");
 if(R){R.style.maxHeight="";R.style.overflow="";R.style.minHeight=L?L.offsetHeight+"px":(dlg.dataset.pres==="one"?KIT_SIZE.v3.picMinS+"px":"");if(dlg.dataset.ksz==="XL"&&L){/* XL (approved #3): the body stays the figure's height; more content scrolls inside the info column */
  {const kb=dlg.querySelector(".k3body");R.style.maxHeight=Math.max(L.offsetHeight,kb?kb.clientHeight:0)+"px"}/* tall phone frame (kit §6.2c): the info column may use the whole grown body, not only the figure height */R.style.overflow="auto"}}
 kszPicFit3(dlg);kszPicFit3(dlg);kszPicStep3(dlg);kszEvLaw10(dlg);clearTimeout(dlg.__evT);dlg.__evT=setTimeout(()=>{if(dlg.isConnected){try{kszEvLaw10(dlg)}catch(e){}}},350);return dlg.dataset.ksz}
/* LAW 10 (START_CORE, owner 18/11 ~16:05Z) + KIT 56.6 (owner 19/11 ~04:15Z "Hình minh họa của cái sự kiện này đâu?"): a BIG scene picture only when the content fits without scrolling;
   when the option list still scrolls the picture becomes THE STRIP (kszEvStrip3: the standard narrow strip NM 300x84 at the column width, at most NL) and stays there.
   The picture is NEVER dropped: every event frame shows its own scene picture (whole group, every live option frame, every tier, Fold + iPad). */
function kszEvStrip3(c){const w=c.clientWidth||KIT_SIZE.pic.NM.w,NM=KIT_SIZE.pic.NM;return Math.max(KIT_SIZE.v3.evMin.fig,Math.min(kszPicH3("NL"),Math.ceil(w*NM.h/NM.w)))}
function kszEvLaw10(dlg){const R=dlg.querySelector(".k3right"),ev=R&&R.querySelector(":scope>.k3ev");if(!ev)return;const o=R.querySelector(":scope>.opts"),sc=()=>o&&o.scrollHeight>o.clientHeight+1;
 delete dlg.dataset.evfit;if(!sc())return;const h=kszEvStrip3(ev);if(ev.dataset.pstep&&ev.offsetHeight<=h+1)return;/* the 56.6 step already made it the strip or smaller */
 dlg.dataset.evfit="s";ev.dataset.pstep="1";ev.style.flex="none";ev.style.minHeight="0px";ev.style.height=h+"px";dlg.dataset.picc="strip";const im=ev.querySelector("img");if(im&&im.naturalWidth)kitPicFocus(ev,im)}
window.kszEvStrip3=kszEvStrip3;
function kitFrameFitsLive3(dlg,strict){const K=dlg.dataset.ksz;if(K==="XL"&&!strict)return true;if(/^N/.test(K)){const mb=document.getElementById("mb");return !mb||mb.scrollHeight<=mb.clientHeight+1}/* narrow: only the screen limits the stack: nothing may scroll inside the frame body */const R=dlg.querySelector(".k3right"),L=dlg.querySelector(".k3body>.kszfig,.k3body>.k3mpor,.k3body>.k3mitem"),ev=R&&R.querySelector(":scope>.k3ev");if(!R)return true;
 const mh=R.style.minHeight,mx=R.style.maxHeight;R.style.minHeight="";R.style.maxHeight="";const ef=ev&&ev.style.flex,eh=ev&&ev.style.height,em=ev&&ev.style.minHeight;if(ev){ev.style.flex="none";ev.style.minHeight="";ev.style.height=kszEvMin3(ev)+"px"}
 const need=R.offsetHeight;if(ev){ev.style.flex=ef;ev.style.height=eh;ev.style.minHeight=em}R.style.minHeight=mh;R.style.maxHeight=mx;const lh=L?L.offsetHeight:0;
 /* the frame must also stay inside the screen (modal box): Fold / iPad */
 const M=document.getElementById("modal"),room=M?M.clientHeight-24:9999;
 if(dlg.dataset.pres==="fig")return (L||!dlg.querySelector(".k3fill")?need<=lh+2:true)&&dlg.offsetHeight<=room;const btn=dlg.querySelector("#mb>.k3btns");
 const body=Math.max(need,lh,KIT_SIZE.v3.picMinS);return (L?need<=lh+2:body<=KIT_SIZE.v3.bodyS)&&body+(btn?btn.offsetHeight:0)<=KIT_SIZE.v3.capS[kitSzMode()]}
/* a live 3-part frame is still the one on screen: its body is in #mb and its options (if any) were not replaced by a rebuild */
function kszLive3Ok(dlg){const X=dlg&&dlg.__ksz3;return !!(X&&X.body.isConnected&&X.mb.isConnected&&X.mb.contains(X.body)&&(!X.opts||X.mb.contains(X.opts)))}
function kszLiveLay3(dlg,K){const X=dlg.__ksz3;if(!X||!kszLive3Ok(dlg))return;const V=KIT_SIZE.v3,pres=V.pres[K]||"fig",foc=V.focus[X.kind]||"person",nar=/^N/.test(K);
 Object.assign(dlg.dataset,{ksz:K,pres,focus:foc,lay:K});if(nar)dlg.dataset.narrow="1";else delete dlg.dataset.narrow;
 if(nar&&KIT_SIZE.fig[K+"3"]){const Z=V.narrow[K],F=KIT_SIZE.fig[K+"3"],Mm=document.getElementById("modal"),mh=Mm?Mm.clientHeight:900;F.h=Math.round(Math.min(Z.max,Z.f*mh));F.cw=Z.cw;dlg.style.setProperty("--kszfh",F.h+"px");dlg.style.setProperty("--kszcw",F.cw+"px")}else{dlg.style.removeProperty("--kszfh");dlg.style.removeProperty("--kszcw")}
 const body=X.body,right=X.right;const keepMk=dlg.querySelector(".k3ev .ksart>img.kemo.ksart-mark,.k3mpic .ksart>img.kemo.ksart-mark");if(keepMk)keepMk.remove();/* mark #68: the live corner seal keeps its own element through every re-lay (size pick, picture step), so its motion is never restarted */
 [...body.children].forEach(c=>{if(c!==right)c.remove()});right.querySelectorAll(":scope>.k3ev").forEach(c=>c.remove());
 let left="",ev=true;X.slot="matter";
 /* #76 ONE left-slot part (kszSlot3): the MAIN SUBJECT (item / person / matter); a person who is the subject = framed portrait on the left and the event picture on TOP of the right column (#80, approved small frame) */
 if(pres==="one"&&(X.who||X.item)){const T=kszSlotType3({who:X.who,item:X.item,subject:X.subject}),SL=kszSlot3(T,{who:X.who,item:X.item,src:X.src,mk:X.mk});left=SL.left;ev=SL.evTop;X.slot=T}
 else if(!X.who){left=kszPic3(X.src,pres==="one"?"k3main k3mpic":"k3main k3mpic k3fill",X.mk);ev=false}/* KIT 84c person-less frame (place card): its picture is the left main picture; fills the column in fig sizes */
 else{left=kszFigHtml(X.who);X.slot="person"}
 right.querySelectorAll(".kiev-back").forEach(x=>x.remove());if(pres!=="one"&&X.item&&X.item.nodeType===1){/* #76 the item is the left slot of a small frame only; a figure frame keeps it at the top of the text as before */const c=X.item.cloneNode(true);c.classList.remove("kiev-slot");c.classList.add("kiev-back","kiev-txt");(right.querySelector(".kpmain")||right).insertAdjacentElement("afterbegin",c)}
 if(left)body.insertAdjacentHTML("afterbegin",left);if(ev&&X.src)right.insertAdjacentHTML("afterbegin",kszPic3(X.src,"k3ev",X.mk));kszAvatarRule3(dlg);
 if(keepMk){const nu=dlg.querySelector(".k3ev .ksart,.k3mpic .ksart");if(nu){const m0=nu.querySelector(":scope>img.kemo.ksart-mark");if(m0)m0.replaceWith(keepMk);else nu.appendChild(keepMk)}}
 if(X.opts){if(pres==="one"||nar)X.mb.appendChild(X.opts);else right.appendChild(X.opts);/* narrow: option cards BELOW the figure row, full width; else kit-option-rows r2: stack label over value when the column is too narrow */const bs=[...X.opts.querySelectorAll(":scope>button")],w=X.opts.clientWidth;X.opts.classList.remove("kszstk")}
 /* KIT 56.19: an option card's picture sits in its fixed kit box (.kaart, KIT_OPT tier sizes), so its late (lazy) load changes no frame size and must not re-pick
    the frame: scrolling the list revealed lazy card pictures, their load re-picked the frame in the middle of her wheel and the wheel was lost */
 body.querySelectorAll("img").forEach(im=>{if(!im.complete&&!im.closest(".opts"))im.addEventListener("load",()=>kszLiveRepick3(dlg),{once:true})});
 right.querySelectorAll(":scope>.k3ev img:not(.ksart-mark)").forEach(im=>{if(!im.complete)im.addEventListener("load",()=>kszKeep3(dlg,()=>kitFrameApplyLive3(dlg)),{once:true})});
 kszListCols3(dlg);kitFrameApplyLive3(dlg)}
/* NARROW T3 (owner 17/11, 412x1058 Fold cover / 390x844 phone): at a frame width where even the smallest figure column (the M figure column) would leave the right column
   under the kit minimum (V.narrow.minRight = the option-card minimum, kitOptFit0), the frame STACKS: a reduced figure (+ the picture strip and text) on top,
   the option cards BELOW it full width, 1 column (kszBtnGridLive3), cards = ONE size per dialog (kitOptFill, tall 3:4 for person dialogs). The figure ladder
   NL > NM > NS (NS = the small-portrait "one" presentation) takes the biggest that keeps the frame inside the screen. Wider frames: untouched. */
function kszNarrow3(dlg){const V=KIT_SIZE.v3,M=document.getElementById("modal"),a=M?M.clientWidth-16:0;/* a = the width the screen leaves a frame; the M frame (the smallest figure + right column layout) needs 24 + 12 + its figure column + minRight */return a>0&&a-24-12-KIT_SIZE.fig3.M.cw<V.narrow.minRight}
/* KIT §56.19 (opt-scroll-reset): a re-pick (a picture loaded late, a resize) tries the smaller frames first, which shortens the option list for a moment and clamps its
   scrollTop — the player's scroll (or her first wheel) was lost. The re-pick keeps the scroll position of every scroller in the frame (option list, info column, #mb). */
/* KIT §56.20 part 2 (ksz-lost-tap): a re-pick that runs BEFORE her finger lands still moves the card she was already aiming at (her eye saw the old place: ~100–200 ms from sight to touch).
   For kszGrace3 ms after a re-pick, a pointer-down that lands where a button WAS (and is not on that button now) is delivered to that button: the tap is never dropped or misrouted. */
const kszGrace3=300;let kszStale3=null,kszRemap3=null;
function kszStaleSnap3(dlg){try{const L=[...dlg.querySelectorAll(".opts>button,.k3btns>button,#mr>button,.kpopts button")].filter(b=>b.getClientRects().length).map(b=>{const r=b.getBoundingClientRect();return[b,r.left,r.top,r.right,r.bottom]});return L}catch(e){return[]}}
/* every other late re-fit of a dialog (picture load -> kitFrameApplyLive3 / kitFrameApply3 / kitPersonDlgFit) goes through the same snapshot + grace */
function kszKeep3(root,fn){const SN=kszStaleSnap3(root);try{return fn()}finally{kszStaleMark3(root,SN)}}
function kszStaleMark3(dlg,L){const t=performance.now();kszStale3=L.length?{dlg,L:L.map(([b,l,t0,r,bt])=>{const n=b.getBoundingClientRect();return Math.abs(n.left-l)+Math.abs(n.top-t0)+Math.abs(n.right-r)+Math.abs(n.bottom-bt)>2?[b,l,t0,r,bt]:null}).filter(Boolean),t}:null;if(kszStale3&&!kszStale3.L.length)kszStale3=null}
(function(){let synth=0;
 document.addEventListener("pointerdown",e=>{kszRemap3=null;const S=kszStale3;if(!S||performance.now()-S.t>kszGrace3||!S.dlg.isConnected)return;const x=e.clientX,y=e.clientY;const hit=S.L.find(([b,l,t,r,bt])=>b.isConnected&&x>=l&&x<=r&&y>=t&&y<=bt);if(!hit)return;const el=document.elementFromPoint(x,y);if(el&&(el===hit[0]||hit[0].contains(el)))return;kszRemap3={b:hit[0],up:0}},true);
 document.addEventListener("pointerup",()=>{const R=kszRemap3;if(!R)return;R.up=1;setTimeout(()=>{if(kszRemap3===R)kszRemap3=null},600)},true);
 /* the native click (aimed at what is under the finger NOW) is swallowed; the card she aimed at gets the click instead */
 document.addEventListener("click",e=>{if(synth)return;const R=kszRemap3;if(!R||!R.up)return;kszRemap3=null;e.stopImmediatePropagation();e.preventDefault();try{if(R.b.isConnected&&!R.b.disabled){synth=1;try{R.b.click()}finally{synth=0}}}catch(er){console.error("kszRemap3",er)}},true);
 document.addEventListener("pointercancel",()=>{kszRemap3=null},true)})();
function kszLivePick3(dlg){const SNAP=kszStaleSnap3(dlg);const SC=[];try{const mb=document.getElementById("mb");[...dlg.querySelectorAll(".opts,.k3right,.k3body"),mb].forEach(e=>{if(e&&e.scrollTop>0)SC.push([e,e.scrollTop])})}catch(e){}
 const P=kszLivePick3_0(dlg);SC.forEach(([e,t])=>{if(e.isConnected&&e.scrollTop!==t)e.scrollTop=t});kszStaleMark3(dlg,SNAP);return P}
function kszLivePick3_0(dlg){dlg.__kszFill=0;if(kszNarrow3(dlg)){for(const K of["NL","NM","NS"]){kszLiveLay3(dlg,K);if(K==="NS"||kitFrameFitsLive3(dlg))return K}}
 let P="XL";for(const K of ["S","M","L","XL"]){kszLiveLay3(dlg,K);if(kitFrameFitsLive3(dlg)&&(K==="XL"||!kszListWantsWide3(dlg))){P=K;break}}
 /* KIT 56.17: the size is picked; now the figure fills the frame body (every later re-apply keeps it) */dlg.__kszFill=1;kitFrameApplyLive3(dlg);return P}
/* KIT §56.20 (ksz-lost-tap, owner LIVE fault 21/11): a re-pick (late picture, resize) moves the figure and the option block (kszLiveLay3 detaches + re-appends the same nodes), so a tap whose finger
   is DOWN on an option card when the re-pick runs loses its click (the node is detached between touch-down and touch-up). The re-pick therefore never runs while a pointer is down inside the modal:
   it waits for the pointer to go up and for the click to be delivered (kszPtrUp3 → 120 ms), then runs once. One place for every live frame. */
let kszRepT=0,kszPtrDown3=0,kszPtrT3=0,kszRepWait3=null;
function kszRepRun3(dlg){try{if(dlg.isConnected&&kszLive3Ok(dlg))kszLivePick3(dlg)}catch(e){console.error("kszLiveRepick3",e)}}
function kszLiveRepick3(dlg){clearTimeout(kszRepT);if(kszPtrDown3){kszRepWait3=dlg;return}kszRepT=setTimeout(()=>{if(kszPtrDown3){kszRepWait3=dlg;return}kszRepRun3(dlg)},30)}
(function(){const dn=e=>{const M=document.getElementById("modal");if(M&&!M.hidden&&e.target&&e.target.closest&&e.target.closest("#modal")){kszPtrDown3=1;clearTimeout(kszPtrT3);kszPtrT3=setTimeout(up,1500)/* safety: a lost pointerup never freezes the layout for good */}},up=()=>{if(!kszPtrDown3)return;kszPtrDown3=0;clearTimeout(kszPtrT3);if(kszRepWait3){const d=kszRepWait3;kszRepWait3=null;clearTimeout(kszRepT);kszRepT=setTimeout(()=>{if(kszPtrDown3){kszRepWait3=d;return}kszRepRun3(d)},120)}};
 document.addEventListener("pointerdown",dn,true);document.addEventListener("pointerup",up,true);document.addEventListener("pointercancel",up,true);document.addEventListener("touchend",up,true);document.addEventListener("touchcancel",up,true);document.addEventListener("dragend",up,true);window.addEventListener("blur",up)})();
function kitFrameLive3(m){try{const M=document.getElementById("modal"),mb=document.getElementById("mb");if(!M||M.hidden||!mb)return false;const dlg=M.querySelector(".dlg.kpanel");
 /* the same .dlg can be filled again (kpBuild rebuilds #mb while the dialog stays open): the old __ksz3 then points at nodes that left the page; drop it, lay the new body out again */
 if(dlg&&dlg.__ksz3&&!kszLive3Ok(dlg))delete dlg.__ksz3;
if(!dlg||dlg.classList.contains("kp-person")||dlg.__ksz3||dlg.contains(document.getElementById("kload")))return false;
 if(M.classList.contains("kptitle")||mb.querySelector(".kpmenu,.kpt-mount"))return false;/* menu-panel (owner 21/11): the ☰ / title menu is the one kit menu frame, never an event frame */
 const kind=dlg.dataset.kind;if(!KIT_SIZE.v3.focus[kind])return false;const body=mb.querySelector(":scope > .kpb");if(!body||body.matches(".kpid"))return false;
 const main=body.querySelector(":scope > .kpmain");if(!main||main.querySelector(KSZ_LIVE_SKIP)||body.querySelector(":scope > .kpsubj.kes2"))return false;
 /* menus and pages are not event frames: a pick-list (≥ KIT_SIZE.v3.live.maxOpts options) or a sectioned page (≥ maxSecs headed sections) keeps its page layout */
 const LV=KIT_SIZE.v3.live,o0=mb.querySelector(":scope > .opts");if(o0&&o0.querySelectorAll(":scope > button").length>=LV.maxOpts)return false;if(main.querySelectorAll(":scope > .kpsec > .kpst").length>=LV.maxSecs)return false;
 let P=[];try{P=kitStagePeople(m)}catch(e){}const who=m&&m.placeK?null:kszSubject3(m,main);/* a place card (jplace) has no person column (owner 18/11 map-tap-go) */const src=kszLiveSrc3(m,mb,kind),mk=kszLiveMark3(m,mb);const opts=mb.querySelector(":scope > .opts");
 /* the old layout classes go (their fit passes then find nothing to do); the game's nodes are moved, never rebuilt */
 dlg.classList.remove("kesdlg","kdper","kdpbanner","kdscroll","kdpall");dlg.classList.add("kszf","ksz3","kszlive");dlg.style.removeProperty("--dart");dlg.style.removeProperty("height");dlg.style.removeProperty("--kdpic");
 /* #76 an item tag leading the text (.kiev: Đồ thất lạc, Tìm thấy đồ …) or m.item is the main subject: it leaves the text and fills the left slot of a small frame */
 let itemEl=null;try{const k0=main.querySelector(":scope > .kiev, :scope > .kiev-txt");if(k0&&k0.matches(".kiev")){itemEl=k0;k0.remove()}else if(m&&m.item)itemEl=m.item}catch(e){}
 const B=document.createElement("div");B.className="k3body";const R=document.createElement("div");R.className="k3right";B.appendChild(R);R.appendChild(main);
 if(opts){opts.classList.add("k3btns");opts.classList.remove("k3grid","kdpo2")}
 [...mb.children].forEach(c=>{if(c!==opts)c.remove()});mb.prepend(B);
 dlg.__ksz3={kind,who,src,mk,mb,body:B,right:R,opts,m,item:itemEl,subject:m&&m.subject};kszLivePick3(dlg);return true}catch(e){console.error("kitFrameLive3",e);return false}}
Object.assign(window,{kitFrameLive3,kszLivePick3,kitFrameApplyLive3,kitFrameFitsLive3,kszBtnGridLive3});
(function(){const st=document.createElement("style");st.id="k-size3-live";st.textContent=`
html body #modal .dlg.kszlive.kszlive{width:var(--kszw)!important;max-width:calc(100% - 16px)!important;height:auto!important;min-height:0!important;max-height:calc(100% - 16px);padding:0;display:flex;flex-direction:column;overflow:hidden}
#modal .dlg.kszlive>#mb{padding:0;margin:0;display:block;max-height:none;overflow:visible;flex:none}
/* r4 (owner 17/11): option rows are label LEFT + value RIGHT at every size; the stacked label-over-value layout (r2 .kszstk) is gone */
#modal .dlg.kszlive>#mr:not(:has(button:not([hidden]))){display:none}
#modal .dlg.kszlive[data-narrow="1"]{overflow-x:hidden;overflow-y:auto}
#modal .dlg.kszlive[data-pres="one"] .k3right{justify-content:flex-start}#modal .dlg.kszlive[data-pres="one"] .k3right:not(:has(>.k3ev)){justify-content:center}/* #80 the event picture is the TOP of the right column (never centred with an empty band above); a frame with no picture there keeps its text centred */
#modal .dlg.kszlive .k3right>.kpmain{flex:none;min-width:0;display:block;padding:0;margin:0}
/* KIT §6.2 FINAL / frame rule (owner 18/11 07:25Z, EVERY layout): the portrait + the info (event picture, text, chips) STAND STILL; only the option list scrolls. The right column never scrolls as a whole. */
html.kv1 body #modal .dlg.kszlive:is([data-ksz="L"],[data-ksz="XL"]){--kph:calc(100*var(--kvh,1vh) - 24px)}/* VARIANT B: tall frames get the TALL height limit but no screen-ratio rectangle: frame height = content up to the screen */
html body #modal .dlg.kszlive.kszlive:is([data-ksz="L"],[data-ksz="XL"])>#mb{display:flex!important;flex-direction:column;flex:1 1 auto!important;min-height:0;overflow:clip}
html body #modal .dlg.kszlive:is([data-ksz="L"],[data-ksz="XL"])>#mb>.k3body{flex:1 1 auto;min-height:0}
/* VARIANT B (review/opt-card-short-b, ROOT-56): the frame height follows its CONTENT (the class whose content fits), no screen-ratio rectangle; the three rules of 16:05Z are removed here.
   (was) KIT §8.4 TALL DIALOG ON THE PHONE (owner 18/11 ~16:05Z CANON, replaces 09:20Z "every frame"): ONLY the TALL centre frames (frame class L and XL) grow at the top and the bottom into a rectangle with the SAME aspect ratio as the page
   (KIT_FRAME.page = the full screen's shape), never taller than the screen. S / M (short, small frames) and plain modals stay exactly as they are. html.kv1 only (iPad / spread unchanged). One rule for the whole L/XL group. */
html body #modal .dlg.kszlive .k3right{overflow:hidden!important;overflow:clip!important}
html body #modal .dlg.kszlive .k3right>:not(.opts){flex:none!important}
/* narrow / stacked frame (the options are a sibling of .k3body inside #mb): same rule — #mb never scrolls, .k3body (portrait + info) stands still, only .opts scrolls */
html body #modal .dlg.kszlive>#mb:has(>.opts.k3btns){display:flex!important;flex-direction:column!important;overflow:clip!important;min-height:0!important;flex:1 1 auto!important}
html body #modal .dlg.kszlive>#mb:has(>.opts.k3btns)>.k3body{flex:none!important}
html body #modal .dlg.kszlive>#mb>.opts.opts.opts.k3btns{flex:1 1 auto!important;min-height:112px!important;overflow-y:auto!important;overscroll-behavior:contain}
html body #modal .dlg.kszlive .k3right>.opts.opts.opts{flex:0 1 auto!important;min-height:112px!important;overflow-y:auto!important;overscroll-behavior:contain;max-height:none!important}
html body #modal .dlg.kszlive #mb .opts.opts.opts.k3btns.k3btns{display:grid!important;flex-direction:row!important;grid-template-columns:repeat(var(--k3c,1),minmax(0,1fr))!important;align-content:start!important;gap:${KIT_SIZE.v3.btn.gap}px;margin:0;flex:none;max-height:none;overflow:visible;position:static}
#modal .dlg.kszlive>#mb>.opts.k3btns{padding:0 12px 12px;box-sizing:border-box}
html body #modal .dlg.kszlive #mb .opts.opts.opts.k3btns.k3btns>button{grid-column:span var(--k3s,1)!important;order:0!important;width:auto;min-width:0;max-width:none;margin:0}
#modal .dlg.kszlive .opts.k3meas>button{grid-column:auto}
html body #modal .dlg.kszlive #mb .opts.k3btns>button .kabody{min-width:6.5em}html body #modal .dlg.kszlive #mb .opts.k3btns>button :is(.kan,.kat){word-break:normal;overflow-wrap:normal;hyphens:none}`;document.head.appendChild(st)})();
/* the #modal .dlg element is reused by every pop-up: the live frame is undone before the next render */
function kszLiveReset3(){const d=document.querySelector("#modal .dlg");if(!d||!d.__ksz3)return;d.__ksz3=null;d.classList.remove("kszf","ksz3","kszlive");["ksz","pres","focus","lay","narrow"].forEach(k=>delete d.dataset[k]);d.style.removeProperty("--kszfh");d.style.removeProperty("--kszcw")}
setTimeout(()=>{if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const m=typeof Q!=="undefined"?Q[0]:null;const d=document.querySelector("#modal .dlg");if(d&&d.__ksz3)kszLiveReset3();/* ANY new render rebuilds #mb: a live frame left over from the same message (showModal called twice / after a viewport resize) would keep its classes + __ksz3 on the fresh old-layout content (option block twice, squeezed) */const r=s0.apply(this,arguments);/* the same item shown again (e.g. the end card after its Bảng vàng line is added): s0 rebuilt #mb, so the old frame is gone, lay it again */const d2=document.querySelector("#modal .dlg");if(d2&&d2.__ksz3&&!d2.__ksz3.body.isConnected)kszLiveReset3();try{kitFrameLive3(m)}catch(e){}return r};window.showModal=showModal},5);
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
/* ===== kit-thanh-bai r2 (s34/s36): SCROLL CUE for every frame scroll column (reviewer r1 FAIL 1). A column of a modal frame (.k3right, #mb, .body, …) that scrolls and is NOT at its end gets a bottom fade + a small "Kéo xuống" chip (.kscue, sticky at the column's bottom, goes when she reaches the end). One place: kitScrollCues(); called after every showModal / frame pass / resize / scroll. ===== */
function kitScrollCues(root){try{const M=root||document.getElementById("modal");if(!M||M.hidden)return;
 const cand=[...M.querySelectorAll(".dlg, .dlg *")].filter(e=>{if(e.closest(".kscue"))return false;/* KIT 56.4 / owner OD 18/11 07:25Z: a person frame's figure column and info stay fixed, only the option / button list scrolls: no scroll hint on a container that holds the figure column */if(e.querySelector(":scope > .kszfig, :scope > .kpsubj.kes, :scope > .kpb > .kpsubj.kes, :scope > .k3body > .kszfig, :scope > .kpdb > .kpsubj.kes")){const k0=e.querySelector(":scope > .kscue");if(k0)k0.remove();return false}const cs=getComputedStyle(e);return(cs.overflowY==="auto"||cs.overflowY==="scroll")&&e.clientHeight>=100&&e.scrollHeight>e.clientHeight+6||(e.__kscue&&e.isConnected)});
 for(const e of cand){if(e.clientHeight<260&&e.clientHeight>0){/* a SHORT scroller (item grid, option list): the hint is its own 16 px strip BELOW it, never over its text */const k0=e.querySelector(":scope > .kscue");if(k0)k0.remove();let sb=e.__kscueSib;if(!sb||!sb.isConnected){sb=document.createElement("div");sb.className="kscue sib";sb.setAttribute("aria-hidden","true");sb.innerHTML='<b class="kscc">Kéo xuống ▾</b>';e.after(sb);e.__kscueSib=sb;e.__kscue=1;if(!e.__kscl){e.__kscl=1;e.addEventListener("scroll",()=>kitScrollCues(),{passive:true})}}sb.classList.toggle("on",e.scrollHeight>e.clientHeight+6&&e.scrollTop+e.clientHeight<e.scrollHeight-6);continue}let c=e.querySelector(":scope > .kscue");const more=e.scrollHeight>e.clientHeight+6&&e.scrollTop+e.clientHeight<e.scrollHeight-6;
  if(!c&&e.scrollHeight>e.clientHeight+6){c=document.createElement("div");c.className="kscue";c.setAttribute("aria-hidden","true");c.innerHTML='<i class="kscg"></i><b class="kscc">Kéo xuống</b>';e.appendChild(c);e.__kscue=1;
   if(!e.__kscl){e.__kscl=1;e.addEventListener("scroll",()=>kitScrollCues(),{passive:true});new MutationObserver(()=>{const k=e.querySelector(":scope > .kscue");if(k&&e.lastElementChild!==k)e.appendChild(k);else kitScrollCues()}).observe(e,{childList:true})}}
  if(c){c.classList.toggle("sm",e.clientHeight<260);/* a short scroller (item grid): a slim footer strip, never the tall fade over its text */if(e.lastElementChild!==c)e.appendChild(c);/* always the LAST child: sticky bottom only works from the end of the content */c.classList.toggle("on",!!more)}}}catch(err){console.error("kitScrollCues",err)}}
window.kitScrollCues=kitScrollCues;
(function(){const sm=window.showModal;if(typeof sm==="function"){window.showModal=showModal=function(){const r=sm.apply(this,arguments);try{setTimeout(kitScrollCues,120);setTimeout(kitScrollCues,700)}catch(e){}return r}}
 window.addEventListener("resize",()=>kitScrollCues());
 const st=document.createElement("style");st.id="k-scroll-cue";st.textContent=`
.kscue{position:sticky;bottom:0;flex:none;height:0;width:100%;margin:0;padding:0;pointer-events:none;display:none;z-index:5}
.kscue.on{display:block}
.kscue.sib{position:static;height:auto;width:auto;text-align:center;padding:1px 0 0;pointer-events:none}.kscue.sib.on{display:block}.kscue.sib .kscc{position:static;transform:none;display:inline-block;font-size:.64rem}
.kscue .kscg{position:absolute;left:0;right:0;bottom:0;height:36px;background:linear-gradient(to bottom,rgba(253,249,238,0),rgba(253,249,238,1) 42%)}/* r4: the chip sits in the SOLID lower part of the fade (never over readable text) */
.kscue .kscc{position:absolute;left:50%;bottom:2px;transform:translateX(-50%);font-size:.66rem;line-height:1.25;font-weight:700;color:#7a5a1e;background:#fbf1d6;border:1px solid #c9a24a;border-radius:999px;padding:0 9px;white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,.18)}`;document.head.appendChild(st)})();

/* ================= #71 EVERY DIALOG = A KIT FRAME SIZE (owner 21/11 ~05:02Z, kit-dialog-2) =================
   Owner (Fold «Sai … Bạch Lan đi dò la», a narrow dialog with one word per line): a dialog never has a size of its own; every dialog is S / M / L / XL (law 10).
   The live v3 frame (kszlive) picks its size by content. Every OTHER dialog (page frames: pick-lists, sectioned pages, the item card, tutorial coach / tips, co-op rooms,
   shop, the loading cover …, all of them "the one pop-up frame" of KIT §8.1) is a LEGACY page frame = KIT_SIZE.legacy.size (L), width from the SAME table:
   `--kszW-S/M/L/XL` (html.kv1 / html.kv2) is generated from KIT_SIZE.frame, and the pop-up width `--kpw` is min(--kszW-L, screen − 28) (j79 :root). Nothing types 560 any more.
   kitFrameTagAll() writes data-ksz on every .dlg / .dbox.kpanel that has none (one MutationObserver pass); the test dev/test/dialog-fixed.js (i) opens every dialog kind and fails on a
   dialog without a kit size or whose width is not its size's width. */
KIT_SIZE.legacy={size:"L"};
(function(){const css=[];css.push("html body .modal.kpscene .dlg.kpsc:not(.kszf)[data-ksz]{width:var(--kpw)!important;max-width:var(--kpw)!important}");/* the scene cover frames (loading cover …): the kit width, never a width of their own */for(const m of["kv1","kv2"])css.push(`html.${m}{${["S","M","L","XL"].map(k=>`--kszW-${k}:${KIT_SIZE.frame[k].w[m]}px`).join(";")}}`);
 const st=document.createElement("style");st.id="k-size-every";st.textContent=css.join("\n");document.head.appendChild(st)})();
function kitFrameTagAll(){try{document.querySelectorAll(".dlg:not([data-ksz]),.dbox.kpanel:not([data-ksz])").forEach(d=>{d.dataset.ksz=KIT_SIZE.legacy.size});if(typeof kszListCols3==="function")document.querySelectorAll(".dlg:not(.kszlive) .kfacts:not([data-kcols])").length&&kszListCols3(document.querySelector(".dlg:not(.kszlive)")||document)}catch(e){}}
window.kitFrameTagAll=kitFrameTagAll;
(function(){const go=()=>{kitFrameTagAll();try{new MutationObserver(()=>{kitFrameTagAll()}).observe(document.body,{childList:true,subtree:true})}catch(e){}};if(document.body)go();else addEventListener("DOMContentLoaded",go)})();

/* ================= #82 KIT LIST RULE (owner 21/11 ~05:37Z, «Sổ nguyệt sự», people lists) =================
   A list of SHORT rows (kit facts: .kfacts > .kfact, one person / one line each) on the iPad (kv2: the frame's text column is wide) is laid in TWO columns so it does not scroll
   a long way for nothing; the phone (kv1) keeps ONE column. Rule (KIT_SIZE.list): kv2 only · the list has at least minRows rows · every row is at most maxChars characters ·
   the list is wide enough for two columns of colMin px + gap. The whole group = every .kfacts in every frame (kszLiveLay3 runs it before the frame size is picked, so the
   smaller height can choose a smaller frame; the tag pass runs it for page frames). Test: dialog-fixed (k). */
KIT_SIZE.list={colMin:260,gap:12,minRows:3,maxChars:110};
function kszListCols3(root){try{const L=KIT_SIZE.list,two=kitSzMode()==="kv2";(root||document).querySelectorAll(".kfacts").forEach(f=>{f.removeAttribute("data-kcols");if(!two)return;const rows=[...f.children].filter(c=>c.classList.contains("kfact"));
 if(rows.length>=L.minRows&&f.clientWidth>=2*L.colMin+L.gap&&rows.every(r=>(r.textContent||"").replace(/\s+/g," ").trim().length<=L.maxChars))f.setAttribute("data-kcols","2")})}catch(e){}}
/* #82: on the iPad a long list of short rows that would scroll in a narrow text column takes the next size (wide enough for two columns) instead of scrolling */
function kszListWantsWide3(dlg){try{if(kitSzMode()!=="kv2")return false;const L=KIT_SIZE.list,R=dlg.querySelector(".k3right");if(!R||![dlg,...dlg.querySelectorAll("*:not(img):not(figure)")].some(e=>e.scrollHeight>e.clientHeight+8&&/(auto|scroll|hidden|clip)/.test(getComputedStyle(e).overflowY)))return false;
 return [...dlg.querySelectorAll(".kfacts")].some(f=>{const rows=[...f.children].filter(c=>c.classList.contains("kfact"));return !f.dataset.kcols&&rows.length>=L.minRows&&f.clientWidth<2*L.colMin+L.gap&&rows.every(r=>(r.textContent||"").replace(/\s+/g," ").trim().length<=L.maxChars)})}catch(e){return false}}
window.kszListCols3=kszListCols3;
(function(){const st=document.createElement("style");st.id="k-list-cols";st.textContent=`.kfacts[data-kcols="2"]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:${KIT_SIZE.list.gap}px;align-items:start}`;document.head.appendChild(st)})();
/* dialog-person CSS: «(ta)» line, hidden duplicate avatar, the second person's avatar ON the event picture (top-left overlay; phone: smaller) */
(function(){const st=document.createElement("style");st.id="k-dialog-person";st.textContent=`
.knr .knr-ta{display:block;font-size:.76rem;font-weight:700;letter-spacing:.02em;opacity:.85;line-height:1.1}
#mb .kfact.kfav-off>.md{display:none!important}
#mb .kfact.kfav-off{grid-template-columns:minmax(0,1fr)}
#mb .kfact.kfav-off:not(.kfnodot){padding-left:0}
.k3ev{position:relative}
.k3ev>.kevav{position:absolute;left:6px;top:6px;z-index:3;display:flex;gap:4px;pointer-events:none}
.k3ev>.kevav>span.md.kmini.kmini{width:clamp(34px,11%,62px)!important;max-width:62px;filter:drop-shadow(0 2px 4px #0006)}
`;document.head.appendChild(st)})();
