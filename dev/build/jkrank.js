/* ================= jkrank: kitRankList / kitRankRow / kitRankHead / kitRankFoot — KIT §87 (kit keeper, review/kit-ico-rank) =================
   KIT REQUEST A + B of review/rank-port-r2 (sweep S3-41 / S3-84): the ONE ranked-list part. A ranking (Bảng vàng "Kiếp" / "Người chơi", any later list
   "place · face · name · numbers · score") is NEVER built from private rows; it is this frame + these rows.
   kitRankRow({rank, face, name, you, sub, cols:[a,b], line, score, unit, mine, cls})
        rank  = place number (top 3 get the gold numeral) · face = a kit face (mdH(...,"sm")) · name (+ the kit "Ta" chip `you` = text) with a small second line `sub`
        cols  = two value columns (wide page, html.kv2) · line = what the phone page (html.kv1) prints instead of the columns, on a second line
        score = number + small `unit` · mine = the own-row highlight (cream-gold, seal-red bar on the left)
   kitRankHead({rank, name, cols:[a,b], unit})  = the header row (hidden on the one-page layout html.kv1)
   kitRankList({head, rows:[kitRankRow…]})      = the frame (cream card, gold hairline, rows separated by the kit hair)
   kitRankFoot({label, row, note, btns})        = the own-life strip under a list: small label line ("Ta trên bảng · hạng N trên M"), ONE kitRankRow (mine),
                                                  a small queue note, then a button row (kit .kbtn, wraps; on kv1 the buttons share the width)
   Layout reads html.kv1 (one page: columns folded into the second line, header hidden) / html.kv2 (spread: all columns). No @media (KIT §0).
   Sample: kit page §87. Used by: jrank (Bảng vàng). */
const krlEsc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function kitRankRow(o){o=o||{};const c=o.cols||[];
 const nm=`<b class="krl-pn">${o.nameH||krlEsc(o.name)}${o.mine&&o.you?` ${kitChip(o.you,"n")}`:""}</b>`;
 return `<div class="krl-row${o.mine?" krl-mine":""}${o.cls?" "+o.cls:""}"><b class="krl-rk">${o.rank||""}</b><span class="krl-fc">${o.face||""}</span>`+
  `<span class="krl-who">${nm}${o.sub!=null?`<small>${o.sub}</small>`:""}</span><span class="krl-c krl-c1">${c[0]||"—"}</span><span class="krl-c krl-c2">${c[1]||"—"}</span>`+
  `<span class="krl-pe">${o.line!=null?o.line:""}</span><span class="krl-s"><b>${o.score!=null?o.score:""}</b>${o.unit?`<small>${krlEsc(o.unit)}</small>`:""}</span></div>`}
function kitRankHead(o){o=o||{};const c=o.cols||[];
 return `<div class="krl-row krl-hd" aria-hidden="true"><b class="krl-rk">${krlEsc(o.rank||"Hạng")}</b><span class="krl-fc"></span><span class="krl-who">${krlEsc(o.name)}</span><span class="krl-c krl-c1">${krlEsc(c[0])}</span><span class="krl-c krl-c2">${krlEsc(c[1])}</span><span class="krl-pe"></span><span class="krl-s">${krlEsc(o.unit)}</span></div>`}
function kitRankList(o){o=o||{};return `<div class="krl">${o.head||""}${(o.rows||[]).join("")}</div>`}
function kitRankFoot(o){o=o||{};
 return `<div class="krl-ft"><div class="krl-me">${o.label?`<small class="krl-ml">${o.label}</small>`:""}${o.row||""}${o.note?`<small class="krl-q">${o.note}</small>`:""}</div>${o.btns?`<div class="krl-btns">${o.btns}</div>`:""}</div>`}
window.kitRankRow=kitRankRow;window.kitRankHead=kitRankHead;window.kitRankList=kitRankList;window.kitRankFoot=kitRankFoot;
(function(){const st=document.createElement("style");st.id="kitrankcss";st.textContent=`
.krl{background:#fffaf0f2;border:1px solid var(--line,#c9a46a);border-radius:var(--k-rad,8px);box-shadow:inset 0 0 0 1px #ffffff80}
.krl-row{display:grid;grid-template-columns:2.4em 40px minmax(0,2.3fr) minmax(0,1.2fr) minmax(0,1.3fr) minmax(4.6em,auto);grid-template-areas:"rk fc who c1 c2 s";
 align-items:center;gap:4px 10px;padding:6px 10px;border-bottom:1px solid var(--k-hair,#e6d3ac);font-size:.86rem;line-height:1.3}
.krl-row:last-child{border-bottom:0}
.krl-row>.krl-rk{grid-area:rk;text-align:center;font-family:var(--display);font-size:1rem;color:var(--gold,#8a5a12)}
.krl-row>.krl-fc{grid-area:fc}.krl-row>.krl-fc .md{display:block}
.krl-row>.krl-who{grid-area:who;min-width:0;overflow-wrap:anywhere}.krl-who b{display:block;font-weight:700;color:var(--ink)}.krl-who small{display:block;font-size:.76rem;color:var(--dim)}
.krl-row>.krl-c1{grid-area:c1}.krl-row>.krl-c2{grid-area:c2}
.krl-c{min-width:0;overflow-wrap:anywhere}
.krl-row>.krl-pe{display:none}
.krl-row>.krl-s{grid-area:s;text-align:right;white-space:nowrap}.krl-s b{display:block;font-family:var(--display);font-size:1.02rem;color:var(--k-seal,#9a2c1c)}.krl-s small{display:block;font-size:.68rem;color:var(--dim)}
.krl-hd{font-size:.72rem;font-weight:700;color:var(--k-lab,#8a7350);padding-top:8px;padding-bottom:4px;background:var(--k-card2,#f6ead6);border-radius:var(--k-rad,8px) var(--k-rad,8px) 0 0}
.krl-hd>.krl-rk{font-family:inherit;font-size:inherit;color:inherit}.krl-hd>.krl-s{white-space:normal}
.krl>.krl-row:nth-child(2)>.krl-rk,.krl>.krl-row:nth-child(3)>.krl-rk,.krl>.krl-row:nth-child(4)>.krl-rk{font-size:1.15rem;color:#a8781c}
.krl-mine{background:#fff3c4;box-shadow:inset 3px 0 0 #a8740c}
.krl-ft{display:flex;flex-direction:column;gap:6px}
.krl-me{background:#fffaf0f5;border:1px solid #a8740c;border-radius:var(--k-rad,8px);overflow:hidden}
.krl-me .krl-ml{display:block;padding:4px 10px 0;font-size:.74rem;font-weight:700;color:var(--k-lab,#8a7350)}
.krl-me .krl-row{border-bottom:0}.krl-me .krl-q{display:block;padding:0 10px 6px;font-size:.74rem;color:var(--dim)}
.krl-btns{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}
/* kv3:.kv1 */:where(.kv1) .krl-row{grid-template-columns:2em 36px minmax(0,1fr) auto;grid-template-areas:"rk fc who s" "rk fc pe s";gap:2px 8px;padding:6px 8px;font-size:.84rem}
:where(.kv1) .krl-row>.krl-c{display:none}:where(.kv1) .krl-row>.krl-pe{display:block;grid-area:pe;font-size:.76rem;color:var(--ink);min-width:0;overflow-wrap:anywhere}
:where(.kv1) .krl-hd{display:none}:where(.kv1) .krl-btns .kbtn{flex:1 1 0}
`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§87",title:"kitRankList · kitRankRow · kitRankFoot (bảng xếp hạng: hạng · mặt · tên · hai cột · điểm; hàng của ta; dải chân)",html:()=>{
 const f=n=>`<span class="md" style="display:block;width:36px;height:36px;border-radius:6px;background:#e6d3ac;text-align:center;line-height:36px">${n}</span>`;
 const R=[{rank:1,face:f("L"),name:"Lan Quý nhân",sub:"Hoàng hậu · Tô Uyển Như",cols:["Hoàng hậu","Thọ chung"],line:"Hoàng hậu · Thọ chung",score:412,unit:"Công danh"},
  {rank:2,face:f("M"),name:"Mai Tần",sub:"Quý phi",cols:["Quý phi","Xuất gia"],line:"Quý phi · Xuất gia",score:356,unit:"Công danh",mine:true,you:"Ta"},
  {rank:3,face:f("T"),name:"Trúc Nhi",sub:"Phi",cols:["Phi","Thọ chung"],line:"Phi · Thọ chung",score:301,unit:"Công danh"}].map(kitRankRow);
 return `<div style="max-width:640px">${kitRankList({head:kitRankHead({name:"Tên hiệu · thân phận",cols:["Phẩm cao nhất","Kết cục"],unit:"Công danh"}),rows:R})}<div style="height:8px"></div>`+
  kitRankFoot({label:"Ta trên bảng · hạng 2 trên 3 kiếp",row:kitRankRow({rank:2,face:f("M"),name:"Mai Tần",sub:"Quý phi",cols:["Quý phi","Xuất gia"],line:"Quý phi · Xuất gia",score:356,unit:"Công danh",mine:true,you:"Ta"}),note:"1 kiếp chờ gửi, có mạng sẽ gửi.",btns:`<button class="kbtn alt">Đổi tên hiệu</button><button class="kbtn alt">Mã khôi phục</button>`})+`</div>`}})}catch(e){}
