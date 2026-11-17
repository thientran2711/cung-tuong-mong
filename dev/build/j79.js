/* ================= j79 PANEL KIT (kit owner, 11/14): ONE frame for every modal / panel / pop-up =================
   Spec: dev/kit/KIT.md section 8 (panels), 9 (facts, rows, chips, people), 10 (intel / evidence / threat), 11 (odds meter), 12 (glossary), 6 (Cần row).
   Workers pass DATA only: kitPanel({...}) / kitFacts([...]) / kitRows([...]) / kitChip(...) / kitPersonLine(p) / kitIntel / kitEvidence / kitThreat / kitOdds.
   Every legacy modal (Q.push({t,h,opts,who})) is converted here automatically: kit header + seal, subject portrait only when it is a person,
   run-on text split into one fact per row (face + rank title + name), deltas as green/red chips, one button style. No random room art. */
const KP_SEAL={rule:"LUẬT",info:"ĐIỀU",news:"TIN",notice:"BÁO",choice:"VIỆC",result:"KẾT QUẢ",night:"ĐÊM",end:"KIẾP",intel:"MẬT BÁO",threat:"CẢNH GIÁC",evidence:"CHỨNG CỨ",person:"NGƯỜI",reward:"BAN THƯỞNG"};
const kpPlain=h=>String(h==null?"":h).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
const kpEsc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const kpN=n=>(n>0?"+":n<0?"−":"")+Math.abs(Math.round(n*100)/100);

/* ---------- people: title (rank word) + name coloured by rank, face ---------- */
function kitTitle(p){try{if(!p)return"";if(p===S)return"";if(S&&p===S.emp)return"Hoàng thượng";if(S&&(p===S.thO||p.kind==="th"))return"Thái hậu";
 const f=kitFace(p);let rw=String(f&&f.rw||"").split("·")[0].trim();if(/^(Hoàng tử|Công chúa|Thái tử)/.test(p.name||""))return"";return rw}catch(e){return""}}
/* KIT 48.1: the rank-title colour of a title (kitRankTone lives in jk4, later in the build; until then the CSS falls back to --rc) */
function kitRtOf(t,col){try{return typeof kitRankTone==="function"?kitRankTone(t,col):""}catch(e){return""}}
function kitPersonCol(p){try{if(typeof rivals!=="undefined"&&rivals.includes(p))return p.out?KIT_COLD_COL:RCOL[p.queen?7:cl(p.rank||0,0,7)];if(p===S)return S.out?KIT_COLD_COL:RCOL[cl(S.rank||0,0,7)];
 const d=kitDecor(kitFace(p));return d.col||KIT_ROLE.slate}catch(e){return KIT_ROLE.slate}}
function kitName(p,o){o=o||{};if(!p)return"";if(p===S&&o.named){const srv=typeof isSrv==="function"&&isSrv();return `<b class="kname kmy" style="--rc:${kitPersonCol(S)}">${srv||o.noTitle?"":`<span class="kti" style="--rt:${kitRtOf(S.out?"Phế phi":RANKS[S.rank].n)}">${S.out?"Phế phi":RANKS[S.rank].n}</span> `}${S.name}</b>`}if(p===S)return `<b class="kname kme" style="--rc:${kitPersonCol(S)}">${o.cap?"Ngươi":"ngươi"}</b>`;
 const t=o.noTitle?"":kitTitleOf(p);let nm=S&&p===S.emp?"":S&&(p===S.thO||p.kind==="th")?"":(p.name||"");if(t&&nm)nm=kitTitledName(t,nm);else if(o.pre&&nm)nm=kitTitledName(String(o.pre).trim().split(" ").slice(-5).join(" "),nm);/* old saves: "Tổng quản thái giám Tổng quản Lý Liên Anh" in a stored log */
 return `<b class="kname" style="--rc:${kitPersonCol(p)}">${t?`<span class="kti" style="--rt:${kitRtOf(t,kitPersonCol(p))}">${t}</span>${nm?" ":""}`:""}${nm}</b>`}
/* KIT 9 (owner 11/15 "Cung nữ Cung nữ thân tín …", "Tổng quản thái giám Tổng quản Lý Liên Anh"): ONE rule for every title + name builder —
   some names carry their own title ("Tổng quản Lý Liên Anh"); the words of the name's start that the title already says are dropped.
   kitTitledName(t,n) → the name part to print after t; kitTitled(t,n) → "t n" without a repeat (case ignored). */
/* only words that are titles, never a surname that is also a rank word (Tần Khinh Vũ, rank Tần) */
const KIT_NAME_TITLE_RX=/^(tổng quản|thái giám|cung nữ|cung nữ thân tín|thái y|ma ma|cô cô|thị vệ|nữ quan|nhũ mẫu|nhạc sư|họa sư|thợ \S+|tể tướng|thượng thư|thị lang|tướng quân|công tử|vương gia|hoàng tử|công chúa|phế phi|quản sự|sứ thần|quan)$/;
/* KIT 48.2 (owner 17/11 "Kính sự phòng là cái phẩm hả?", OD:L1351): ONE tag rule for every figure that is not a consort — line 1 = the person's RANK / post grade (Thái giám, Tổng quản thái giám,
   Cung nữ, Thái y, Thị vệ, Vương gia, Hoàng tử…), line 2 = the bare NAME. The office or place (Kính sự phòng, Thái y viện…) is the dialog title, never the rank line. kitTitleOf = kitTitle,
   and for a person with no rank field (court men, children, bare NPCs) the title words their name starts with ("Thị vệ Mạnh Tử Khiêm" → Thị vệ + Mạnh Tử Khiêm). Read by kszRankName (v3 frame tag)
   and kitName (32.7 column tag, inline names); kitTitledName then drops the repeat from the name. */
const KIT_TAG_TITLE_RX=/^(tổng quản|thái giám|cung nữ|cung nữ thân tín|thái y|ma ma|cô cô|thị vệ|nữ quan|nhũ mẫu|nhạc sư|họa sư|thợ \S+|tể tướng|thượng thư|thị lang|tướng quân|công tử|vương gia|hoàng tử|công chúa|phế phi|quản sự|sứ thần)$/;
function kitTitleOf(p){let t="";try{t=kitTitle(p)}catch(e){}if(t||!p||typeof p.name!=="string")return t;const w=p.name.trim().split(/\s+/);
 for(let k=Math.min(3,w.length-1);k>=1;k--){if(KIT_TAG_TITLE_RX.test(w.slice(0,k).join(" ").toLowerCase()))return w.slice(0,k).join(" ")}return""}
window.kitTitleOf=kitTitleOf;
function kitTitledName(t,n){t=String(t||"").trim();n=String(n||"").trim();if(!t||!n)return n;const tl=t.toLowerCase(),w=n.split(" ");
 for(let k=Math.min(4,w.length-1);k>=1;k--){const pre=w.slice(0,k).join(" ").toLowerCase();if(!KIT_NAME_TITLE_RX.test(pre))continue;if(tl===pre||tl.startsWith(pre+" ")||tl.endsWith(" "+pre)||tl.includes(" "+pre+" "))return w.slice(k).join(" ")}return n}
function kitTitled(t,n){const m=kitTitledName(t,n);return t?(m?`${t} ${m}`:t):m}
window.kitTitled=kitTitled;window.kitTitledName=kitTitledName;
function kitFaceH(p,size){try{if(!p)return"";if(p.src!==undefined||p.ini!==undefined)return mdH(p,size||"sm");return mdH(kitFace(p),size||"sm")}catch(e){return""}}
/* one person line: face + title/name + sub line (chips allowed) */
function kitPersonLine(p,o){o=o||{};return `<div class="kpl">${kitFaceH(p,o.size||"sm")}<span class="kplt">${kitName(p,{cap:true})}${o.sub?`<small>${o.sub}</small>`:""}</span>${o.chips?`<span class="kplc">${o.chips}</span>`:""}</div>`}
/* every named person the text can mention, longest name first */
function kpPeople(){const L=[];const add=(n,p)=>{if(n&&p&&n.length>=4&&!L.some(x=>x[0]===n))L.push([n,p])};
 try{(typeof rivals!=="undefined"?rivals:[]).forEach(v=>add(v.name,v));(S.staff||[]).forEach(s=>add(s.name,s));if(S.maid)add(S.maid.name,S.maid);
  (typeof allKids==="function"?allKids():[]).forEach(([k])=>add(k.name,k));if(S.court)Object.values(S.court).forEach(c=>c&&add(c.name,c));(S.men||[]).forEach(m=>add(m.name,m));
  if(S.name)add(S.name,S)}catch(e){}
 L.sort((a,b)=>b[0].length-a[0].length);return L}

/* ---------- chips: one delta / tag ---------- */
function kpSent(label,n){const t=`${label} ${n>0?"+":"-"}${Math.abs(n)}`;let c="n";try{c=kcls(t)}catch(e){}if(c==="n")c=n>0?"g":n<0?"r":"n";return c}
/* kitChip(label, n)        -> green/red delta chip "Kho lúa +12" (sentiment for her: ghen +, oán + are red)
   kitChip(text, "g"|"r"|"n"|"ok"|"no") -> plain chip; ok = ✓ green, no = ✗ red */
function kitChip(label,v,cls){if(typeof v==="number"){const c=cls||kpSent(label,v);return `<span class="kchip ${c}">${kitGloss(label)} <b>${kpN(v)}</b></span>`}
 const k=v||"n";const mark=k==="ok"?"✓ ":k==="no"?"✗ ":"";const c=k==="ok"?"g":k==="no"?"r":k;return `<span class="kchip ${c}">${mark}${label}</span>`}
function kitChips(list){return `<span class="kchips">${(list||[]).map(x=>Array.isArray(x)?kitChip(x[0],x[1],x[2]):x).join("")}</span>`}

/* ---------- rows: the act-card label grid (same .kb as j63) ---------- */
/* kitRows([[label, value(html|array of chips/values), cls]]) cls: g|r|n|t (value colour), "need" for a Cần row of chips */
function kitRows(rows){return `<span class="kb kpkb">`+(rows||[]).filter(r=>r&&r[1]!=null&&r[1]!==""&&!(Array.isArray(r[1])&&!r[1].length)).map(([l,v,c])=>{const vals=Array.isArray(v)?v:[v];
 return `<span class="kr"><span class="krl">${l}</span><span class="krv">${vals.map(x=>/^\s*<span class="(kchip|ef|kname)/.test(x)||/^\s*<b class="kname/.test(x)?x:`<span class="ef ${c||"n"}">${x}</span>`).join(vals.every(x=>/^\s*<span class="kchip/.test(x))?'':'<span class="ksep">·</span>')/* chips carry their own border: no "·" between them (a wrapped line never starts with a stray "·", owner kit review 15:00Z) */}</span></span>`}).join("")+`</span>`}
/* KIT §51 kitRowsJoin(kitRows(a), kitRows(b), …) -> ONE table: kit tables written one after another (price rows + the item's rows)
   are merged into a single grid, so their values line up too. Pass only kitRows / kitItemRows output (or ""). */
function kitRowsJoin(){return [...arguments].filter(Boolean).join("").replace(/(<\/span><\/span>)<\/span>\s*<span class="kb kpkb">/g,"$1")}
/* KIT §51 kitReqRows([[ok, "Sủng 8 (cần 15)"], ...]) -> a requirement list as ONE kit table: label = what is needed, value = ✓/✗ + the
   numbers (green met / red unmet). "Sủng 8 (cần 15)" -> Sủng | ✗ 8 (cần 15); "Ghế Phi: còn chỗ" -> Ghế Phi | ✓ còn chỗ;
   "Hoàng hậu không chặn (Hoàng hậu -5, …)" -> Hoàng hậu không chặn | ✗ Hoàng hậu -5, …; a bare sentence -> sentence | ✓ đủ / ✗ chưa đủ. */
function kitReqSplit(t){t=String(t||"").trim();let m=t.match(/^([^(\d:]+?)(?::\s*|\s+)(-?\d[\s\S]*)$/);if(m)return [m[1],m[2]];
 m=t.match(/^([^:(]+?):\s+([\s\S]+)$/);if(m)return [m[1],m[2]];m=t.match(/^([^(]+?)\s*\(([\s\S]+)\)$/);if(m)return [m[1],m[2]];return [t,""]}
function kitReqRows(list){return kitRows((list||[]).filter(Boolean).map(([ok,t])=>{const [l,v]=kitReqSplit(t);return [l,`${ok?"✓":"✗"} ${v||(ok?"đủ":"chưa đủ")}`,ok?"g":"r"]}))}
/* tiers / ladders: [{k:"30–59", n:"hại nhỏ", d:"Tung tin đồn, Dò la", on:true, c:"r"}] */
function kitTiers(list,o){o=o||{};const N=list.length;return `<div class="ktiers">${list.map((t,i)=>`<div class="ktier${t.on?" on":""}" style="--lv:${(i+1)/N}"><span class="ktk">${t.k}</span><span class="ktb"><b class="${t.c||""}">${t.n}</b>${t.d?`<small>${t.d}</small>`:""}</span>${t.on?`<span class="kchip n">${o.here||"đang ở"}</span>`:""}</div>`).join("")}</div>`}

/* ---------- facts: one fact per row (never a run-on paragraph) ---------- */
/* split an HTML run into sentences, keeping inline tags balanced across the cut */
const KP_UP="A-ZÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ0-9";
const KP_ENDS=/[.!?]["”)]?\s+$/,KP_ENDS0=/[.!?]["”)]?\s*$/,KP_STARTS=new RegExp(`^\\s+["“(]?[${KP_UP}]`);
function kpSentences(html){const toks=String(html||"").split(/(<[^>]+>)/);const out=[];let cur="",stack=[],qd=0;const qOn=(String(html).match(/“/g)||[]).length===(String(html).match(/”/g)||[]).length;
 /* a quoted speech “…” stays ONE row (review/toilette, KIT 31.14): no cut while inside the quotes (qd>0) */
 const qc=s=>{if(qOn)for(const c of s){if(c==="“")qd++;else if(c==="”")qd=Math.max(0,qd-1)}};
 const cut=()=>{const close=stack.slice().reverse().map(t=>`</${t.n}>`).join("");if(kpPlain(cur))out.push(cur+close);cur=stack.map(t=>t.o).join("")};
 for(const tk of toks){if(!tk)continue;if(tk[0]==="<"){const m=tk.match(/^<\s*(\/)?\s*([a-z0-9]+)/i);if(m){const n=m[2].toLowerCase();if(/^(br|img|hr)$/.test(n)){if(n==="br"){cut();continue}cur+=tk;continue}
    /* owner 11/15 ("chứng cứ dính vào dòng tấn phong"): a sentence that ends right before an opening tag ("… 42. <b>Thánh chỉ …") is a row of its own */
    if(!m[1]&&qd===0&&KP_ENDS0.test(kpPlain(cur))&&/\s$/.test(cur.replace(/<[^>]*>/g,"")))cut();
    if(m[1]){const i=stack.map(x=>x.n).lastIndexOf(n);if(i>=0)stack.splice(i,1)}else if(!/\/>$/.test(tk))stack.push({n,o:tk})}cur+=tk;continue}
  /* … and one that ends inside a tag, the next text starting a new sentence ("…nặng.</span> Hoàng hậu …") */
  if(qd===0&&KP_ENDS0.test(kpPlain(cur))&&KP_STARTS.test(tk))cut();
  const parts=tk.split(kRx("(?<=[.!?][\"”)]?)\\s+(?=[\"“(]?[A-ZÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ0-9])",""));
  parts.forEach((p,i)=>{cur+=p;qc(p);if(i<parts.length-1){if(qd===0)cut();else cur+=" "}})}
 if(kpPlain(cur))out.push(cur);const R=out.map(s=>s.trim()).filter(s=>kpPlain(s)&&kpPlain(s)!==".");
 /* the reason of a fact ("Lý do: …", "Vì …:") stays on the fact's row */
 /* … and so does a note in brackets right after it ("(Chứng cứ X +1.)" = what that act gave); a reason said twice is kept once */
 for(let i=R.length-1;i>0;i--){const pl=kpPlain(R[i]);/* review r6: a sentence that is ONLY stat changes ("Danh -1.", "Kho lúa -8, nhà X thế lực -6.") is the result of the fact before it: same row */const onlyD=!/[:“"]/.test(pl)&&pl.replace(/\.\s*$/,"").split(/\s*[,;·]\s*/).every(x=>/^[A-Za-zÀ-ỹĐđ][^.!?]{0,40} [+\-−]\d+(?:[.,]\d+)?$/.test(x.trim()));if(onlyD){R.splice(i-1,2,R[i-1]+" "+R[i]);continue}if(/^(Lý do|Vì)\b/.test(pl)||/^\(/.test(pl)){if(kpPlain(R[i-1]).includes(pl))R.splice(i,1);else R.splice(i-1,2,R[i-1]+" "+R[i])}}return R}
/* text segments only (never inside a tag) */
function kpMapText(html,fn){return String(html).split(/(<[^>]+>)/).map(s=>s&&s[0]==="<"?s:fn(s)).join("")}
const KP_DELTA=/((?:[A-Za-zÀ-ỹĐđ]+ ){0,2}[A-Za-zÀ-ỹĐđ]+) ([+\-−])(\d+(?:[.,]\d+)?)(?![\d.,]*\d)(?!\s*[–-]\s*\d)/g;
function kpChipify(html){return kpMapText(html,s=>s.replace(KP_DELTA,(m,l,sg,n)=>{if(/^(năm|tháng|tuần|ngày|tuổi|lần|khắc)$/i.test(l.split(" ").pop()))return m;const v=(sg==="+"?1:-1)*parseFloat(n.replace(",","."));return kitChip(l,v)}))}
/* decorate the first mention of each person: rank title + name in rank colour (title not doubled) */
/* the text already names a (different) title right before the name, e.g. "Thái tử" + a Hoàng tử: keep the text's title, never "Thái tử Hoàng tử X" */
const KP_CONS_RX=/(Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng) $/;
/* owner 11/15 ("Cung nữ Cung nữ thân tín Tiểu Đào"): ANY title the text already puts before the name keeps the text's words — court ranks,
   servants, officials, artisans, family words — and so does the start of the person's own title ("Cung nữ" before a "Cung nữ thân tín") */
const KP_TITLE_RX=/(Thái tử|Hoàng tử|Công chúa|Hoàng hậu|Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Thái hậu|Hoàng thượng|Phế phi|Thái y|Thị vệ|Ma ma|Cô cô|[Cc]ung nữ(?: thân tín)?|[Tt]hái giám|[Tt]ổng quản|[Nn]ữ quan|[Nn]hũ mẫu|[Nn]hạc sư|[Hh]ọa sư|[Tt]hợ [^ ]+|[Tt]ể tướng|[Tt]hượng thư|[Tt]hị lang|[Tt]ướng quân|[Cc]ông tử|[Tt]iểu chủ|[Cc]hủ tử|[Nn]ương nương|[Tt]ú nữ) $/;
/* the text ends with the first word(s) of t (her own title, shortened) */
function kpTitleTail(pre,t){const w=String(t||"").split(" ").filter(Boolean);for(let k=w.length;k>=1;k--){const x=w.slice(0,k).join(" ")+" ";if(pre.endsWith(x)||pre.toLowerCase().endsWith(x.toLowerCase()))return true}return false}
/* whole names only (flip-newlife / outside-r2 bug: "Lan Chi" was painted INSIDE the already-painted "Mộc Lan Chi", giving "Đoan Cung nữ thân tín Mộc Lan Chi"):
   an occurrence counts only if it is not glued to letters and does not lie inside an occurrence of a longer, already-painted name (cov) */
function kpFindName(s,n,cov){const L=/[A-Za-zÀ-ỹĐđ]/;const rg=[];for(const c of cov||[])if(c!==n&&c.includes(n)){let j=-1;while((j=s.indexOf(c,j+1))>=0)rg.push([j,j+c.length])}
 let i=-1;while((i=s.indexOf(n,i+1))>=0){const e=i+n.length;if(L.test(s[i-1]||"")||L.test(s[e]||""))continue;if(rg.some(r=>i>=r[0]&&e<=r[1]))continue;return i}return -1}
function kpPeopleIn(html,people){const who=[];let h=html;const plain=kpPlain(html);const cov=[];
 for(const [n,p] of people){if(!plain.includes(n)||who.includes(p)||kpFindName(plain,n,cov)<0)continue;who.push(p);cov.push(n);let done=false;
  h=kpMapText(h,s=>{if(done)return s;const i=kpFindName(s,n,cov.slice(0,-1));if(i<0)return s;done=true;const t=kitTitle(p);let pre=s.slice(0,i);if(t&&pre.endsWith(t+" "))pre=pre.slice(0,-(t.length+1));
   /* owner 11/15 16:55Z (fix-float): an older line still carries her rank of that day ("Đáp ứng X" after she became Thường tại): a consort is
      always drawn with her CURRENT title, the old one is dropped */
   else if(t&&KP_CONS_RX.test(pre)&&(p===S||(typeof rivals!=="undefined"&&rivals.includes(p))))pre=pre.replace(KP_CONS_RX,"");
   /* review night-end-r2: HER name (kitTitle "") after a rank in the text ("Thánh chỉ: Thường tại X …", "Đêm qua Đáp ứng X hầu giá") — kitName(named)
      draws her current rank itself, so the rank in the text is dropped (it doubled: "Thường tại Thường tại X") */
   else if(p===S&&/(Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Phế phi) $/.test(pre))pre=pre.replace(/(Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Phế phi) $/,"");
   const rest=s.slice(i+n.length);const tr=p===S&&S?(S.out?"Phế phi":RANKS[S.rank].n):t;/* her own rank is drawn by kitName(named) */
   const own=!!t&&(KP_TITLE_RX.test(pre)||kpTitleTail(pre,t))||!!tr&&/^\s*(?:được\s+)?(?:tấn phong|sắc phong|phong|thăng|làm|lên|thành)\s/.test(rest)&&rest.includes(tr);/* KIT 48.3 (owner 15/11 s8): the text's own title before the name goes INSIDE the name block, in its rank tone (it stayed plain ink) */
   const tm=KP_TITLE_RX.exec(pre);if(tm&&p!==S){const k=kitName(p,{noTitle:true,pre});const j=k.indexOf(">");if(j>0&&/^<b class="kname/.test(k)){const tt=tm[1];const col=typeof kitPersonCol==="function"?kitPersonCol(p):"";
    return pre.slice(0,pre.length-tm[0].length)+k.slice(0,j+1)+`<span class="kti" style="--rt:${typeof kitRankTone==="function"?kitRankTone(tt,col):""}">${tt}</span> `+k.slice(j+1)+s.slice(i+n.length)}}
   return pre+kitName(p,{named:p===S,noTitle:own,pre:own||KP_TITLE_RX.test(pre)?pre:""})/* review r6: a name that carries its own title (kitTitle "") after a title in the text: "Tổng quản thái giám Tổng quản X" */+s.slice(i+n.length)})}
 /* owner 11/15 (news rows showed the wrong person): the row's face = the person named FIRST in the sentence (the subject), not the one
    with the longest name — names are matched longest-first (no partial overlaps), then ordered by where they stand in the text */
 if(who.length>1){const at=p=>{const e=people.find(x=>x[1]===p);const i=e?plain.indexOf(e[0]):-1;return i<0?1e9:i};who.sort((a,b)=>at(a)-at(b))}
 const lead=plain.replace(/^[^A-Za-zÀ-ỹĐđ]+/,"");
 if(/^(Hoàng thượng|Thánh thượng)/.test(lead)&&S&&S.emp&&!who.length)who.push(S.emp);
 if(/^Thái hậu/.test(lead)&&S&&!who.length)who.push(S.thO||{kind:"th"});
 if(!who.length&&/(^|\s)(ngươi|Ngươi)(\s|[.,!?]|$)/.test(plain))who.push(S);
 if(!who.length&&/Hoàng thượng|Thánh thượng/.test(plain)&&S&&S.emp)who.push(S.emp);
 if(!who.length&&/Thái hậu/.test(plain)&&S)who.push(S.thO||{kind:"th"});
 return [h,who]}
/* one fact object -> row.  fact = "html" | {who, text, chips:[[label,n]], why, when, kind:"me"|"person"|"world"} */
/* KIT 9: a title said twice in a row in stored text (old saves / old logs): "Tổng quản thái giám Tổng quản X" → "Tổng quản thái giám X",
   "Cung nữ Cung nữ thân tín X" → "Cung nữ thân tín X" */
const KIT_DUP_T=/(^|[\s>(:,])(Tổng quản|Thái giám|thái giám|Cung nữ|cung nữ|Thái y|thái y|Ma ma|ma ma|Cô cô|cô cô|Thị vệ|thị vệ)((?: (?:thái giám|thân tín))?) ((?:<[^>]+>)*)\2(?=[\s<])/g;
function kitDedupTitle(h){return String(h||"").replace(KIT_DUP_T,(m,a,t,suf,tags)=>suf?`${a}${t}${suf}${tags?" "+tags:""}`:`${a}${tags}${t}`)}
window.kitDedupTitle=kitDedupTitle;
/* owner 11/15 ("Sủng nàng ta 30 → 30"): a number that did not move says nothing — every "label N → N" clause is dropped from a fact row
   (all producers, old logs too); a row left with no words is not drawn (kitFacts) */
const KIT_NOCH=/(^|[.;·,:]\s*|\s)((?:[^\s.;·,:<>]+ ){0,5}?)(−?-?\d+(?:[.,]\d+)?)\s*→\s*\3(?=\s*(?:[.;·,]|$))\s*[;·,]?\s*/g;
/* review/pick-hint: the tidy-up runs only on a text piece where a "N → N" clause was really dropped — before, every piece that ended in ", "
   just before a name/chip tag lost its comma ("thái giám canh cung, <name>" → "canh cungCung nữ …") */
/* review/pick-hint-r1: the harmless tidies (double space, space before a full stop) still run on every piece as before; only the
   separator strip at the end of a piece waits for a dropped clause */
function kitNoChange(h){try{return kpMapText(String(h||""),s=>{KIT_NOCH.lastIndex=0;const hit=KIT_NOCH.test(s);KIT_NOCH.lastIndex=0;
 if(!hit)return s.replace(/ {2,}/g," ").replace(/\s+\./g,".");
 return s.replace(KIT_NOCH,(m,a)=>/[.;·,:]/.test(a)?a.replace(/\s+$/,"")+" ":a).replace(/ {2,}/g," ").replace(/\s+\./g,".").replace(/[;·,]\s*(\.|$)/g,"$1")})}catch(e){return h}}
window.kitNoChange=kitNoChange;
/* a row that starts in lower case after a clause was dropped gets a capital first letter */
function kitCapFirst(h){let done=false;try{return kpMapText(String(h||""),s=>{if(done)return s;const i=s.search(/\S/);if(i<0)return s;done=true;return s.slice(0,i)+s[i].toLocaleUpperCase("vi")+s.slice(i+1)})}catch(e){return h}}
function kpFactRow(f,people){const SKIP=window.__kpSkip;if(typeof f==="string")f={text:f};let text=kitCapFirst(kitNoChange(kitDedupTitle(f.text||""))),who=f.who?[].concat(f.who):null;
 if(f.auto!==false){let w;[text,w]=kpPeopleIn(text,people);if(!who)who=w;text=kpChipify(kitRankText(text)).replace(/(<b>[^<]*<\/b><\/span>)\s*\.\s*$/,"$1").replace(/(<b>[^<]*<\/b><\/span>)\s*[,;·]\s*(?=<span class="kchip)/g,"$1 ")/* review r6: no lone "." after a row-end chip */}
 const p=who&&who[0];const world=f.kind==="world"||!p;const face=p&&p!==SKIP?kitFaceH(p,"sm"):`<span class="kfdot" aria-hidden="true"></span>`;
 const chips=f.chips&&f.chips.length?kitChips(f.chips):"";
 return `<div class="kfact${world?" kfworld":""}${p===S?" kfme":""}">${face}<span class="kft">${f.when?`<small class="kfwhen">${f.when}</small>`:""}${text}${f.why?`<small class="kfwhy">Vì: ${f.why}</small>`:""}${chips}</span></div>`}
/* kitFacts(facts, {group:true|false, title}) -> rows; groups (Ngươi / Người trong cung / Triều đình · thiên hạ) when there are 4+ facts of 2+ kinds */
function kitFacts(facts,o){o=o||{};const people=kpPeople();let F=[];
 for(const f of (facts||[])){if(typeof f==="string"){kpSentences(f).forEach(s=>F.push({text:s}))}else if(f)F.push(f)}
 F=F.map(f=>{let t=f.text||"";const pl=kpPlain(t);let kind=f.kind;
  const mm=pl.match(/^(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:\s*/);if(mm){t=t.replace(/^((?:<[^>]+>)*)\s*(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:\s*/,"$1");kind=kind||"world"}
  return Object.assign({},f,{text:t,kind})});
 F=F.filter(f=>{const t=kpPlain(kitNoChange(f.text||""));return !(f.text&&!/[A-Za-zÀ-ỹĐđ]{2}/.test(t))&&!/^[\s.;·,:]*$/.test(t)||(f.chips&&f.chips.length)});
 const rows=F.map(f=>{const [h,w]=f.who?[f.text,[].concat(f.who)]:kpPeopleIn(f.text,people);const k=f.kind||(w[0]===S?"me":w.length?"person":"world");return{k,html:kpFactRow(Object.assign({},f,{text:h,who:w.length?w:null}),[])}});
 const kinds=[...new Set(rows.map(r=>r.k))];
 if(o.group!==false&&rows.length>=4&&kinds.length>=2){const G=[["me","Ngươi"],["person","Người trong cung"],["world","Triều đình · thiên hạ"]];
  return G.filter(([k])=>rows.some(r=>r.k===k)).map(([k,l])=>`<div class="kpsec"><h4 class="kpst">${l}</h4><div class="kfacts">${rows.filter(r=>r.k===k).map(r=>r.html).join("")}</div></div>`).join("")}
 return `${o.title?`<h4 class="kpst">${o.title}</h4>`:""}<div class="kfacts">${rows.map(r=>r.html).join("")}</div>`}

/* ---------- intel list / evidence card / threat card ---------- */
/* kitIntel([{src:person|"text", week:"T3/1 thượng tuần", fact:"html", about:person}]) */
function kitIntel(list,o){o=o||{};if(!list||!list.length)return `<div class="kfacts"><div class="kfact kfworld"><span class="kfdot"></span><span class="kft">${o.empty||"Chưa nghe được tin nào."}</span></div></div>`;
 return `<div class="kintel">${list.map(x=>`<div class="kint">${x.about?kitFaceH(x.about,"sm"):`<span class="kfdot"></span>`}<span class="kft">${x.about?kitName(x.about,{cap:true})+": ":""}${kpChipify(x.fact||"")}<small class="kisrc">Nguồn: ${x.src&&typeof x.src==="object"?kitName(x.src,{cap:true}):(x.src||"tai mắt")}${x.week?` · ${x.week}`:""}</small></span></div>`).join("")}</div>`}
/* kitEvidence({what, against:person, how, when, strength:n, acts:[{n, odds, ton, duoc, mat, kem}]}) */
function kitEvidence(e){return `<div class="kcardp kev"><div class="kcph">${e.against?kitFaceH(e.against,"sm"):""}<span class="kcpt"><b>${e.what}</b>${e.against?`<small>chống lại ${kitName(e.against)}</small>`:""}</span>${e.strength!=null?kitChip(`Sức nặng ${e.strength}`,"n"):""}</div>`+
 kitRows([["Chứng minh",e.proves&&e.proves!==e.what?e.proves:"","t"],["Có được",[e.how,e.when].filter(Boolean).join(" · "),"n"]])+(e.acts&&e.acts.length?`<div class="kpacts">${e.acts.map(kitActMini).join("")}</div>`:"")+`</div>`}
/* kitThreat({who:person, how, sure:"Khá chắc", when, defs:[{n, odds, ton, duoc, mat, kem}]}) */
function kitThreat(t){return `<div class="kcardp kth"><div class="kcph">${t.who?kitFaceH(t.who,"sm"):`<span class="kfdot"></span>`}<span class="kcpt"><b>${t.who?kitName(t.who,{cap:true}):"Kẻ chưa rõ mặt"}</b><small>${t.how}</small></span>${t.sure?kitOdds(t.sure,{label:"Tin này"}):""}</div>`+
 kitRows([["Khi nào",t.when,"t"]])+(t.defs&&t.defs.length?`<h4 class="kpst">Cách đỡ</h4><div class="kpacts">${t.defs.map(kitActMini).join("")}</div>`:"")+`</div>`}
/* a priced option through the ONE act-card frame (j63 kitParse + kaNorm) */
function kitActMini(a){const line=[a.odds||"Chắc chắn",a.ton&&`tốn: ${a.ton}`,a.duoc&&`thành: ${a.duoc}`,a.mat&&`hỏng: ${a.mat}`,a.kem&&`kèm: ${a.kem}`].filter(Boolean).join(" · ");
 return `<button class="opt kmini"${a.attrs?" "+a.attrs:""}${a.dis?" disabled":""}>${a.n}<small>${kitParse(line)}</small></button>`}

/* ---------- odds meter: 7 steps, red → amber → green, word beside, tap = whole ladder ---------- */
const KIT_ODDS=["Liều","Khó","Năm ăn năm thua","Khá chắc","Chắc","Rất chắc","Nắm chắc"];
const KIT_ODDS_TXT=["thường hỏng","hỏng nhiều hơn thành","nửa thành nửa hỏng","thành nhiều hơn hỏng","thường thành","hiếm khi hỏng","gần như chắc thành"];
const KIT_ODDS_COL=["#b8321f","#d0662a","#c99a1e","#a3a52a","#6f9a34","#3f8a43","#2d7a52"];
function kitOddsLv(w){if(typeof w==="number")return w<=0?-1:w>=91?6:w>=81?5:w>=66?4:w>=56?3:w>=46?2:w>=31?1:0;const i=KIT_ODDS.indexOf(String(w).trim());return i}
function kitOdds(w,o){o=o||{};const lv=kitOddsLv(w);const word=lv<0?(o.none||"Không có"):KIT_ODDS[lv];
 return `<span class="kodm" data-kodds="${lv}" role="button" tabindex="0" title="${o.label?o.label+": ":""}${word}${lv>=0?` — bậc ${lv+1}/7`:""}" style="--oc:${lv<0?"#9a8f80":KIT_ODDS_COL[lv]}"><span class="kseg">${KIT_ODDS.map((x,i)=>`<i${i<=lv?` style="background:${KIT_ODDS_COL[i]}"`:""}></i>`).join("")}</span><b>${word}</b></span>`}
function kitOddsLadder(lv){return `<div class="kpopt">Thang cơ hội · 7 bậc</div>`+KIT_ODDS.map((x,i)=>`<div class="kpopr${i===lv?" on":""}"><span class="kseg">${KIT_ODDS.map((y,j)=>`<i${j<=i?` style="background:${KIT_ODDS_COL[j]}"`:""}></i>`).join("")}</span><b style="color:${KIT_ODDS_COL[i]}">${x}</b><small>${KIT_ODDS_TXT[i]}</small></div>`).reverse().join("")}
/* the existing odds chip (j19 oddsChip) now draws the meter, keeping .oc for old selectors */
(function(){if(typeof oddsChip!=="function")return;const o0=oddsChip;oddsChip=function(w){const s=String(w==null?"":w);if(/^Chắc chắn\b/.test(s))return"";const k=KIT_ODDS.find(x=>s===x||s.startsWith(x+" "))||KIT_ODDS.slice().sort((a,b)=>b.length-a.length).find(x=>s.includes(x));
 if(!k)return o0.apply(this,arguments);const rest=s.replace(k,"").replace(/^\s*·\s*/,"").trim();return kitOdds(k).replace('class="kodm"','class="kodm oc"')+(rest?` <span class="ef n">${rest}</span>`:"")}})();

/* ---------- glossary: plain-word meaning of every game term, tap to read ---------- */
const KIT_GLOSS={
 "Sủng":"Hoàng thượng thương ngươi bao nhiêu (0–100). Cao thì hay được lật thẻ, được ban thưởng, dễ thăng bậc.",
 "Danh":"Tiếng tăm của ngươi trong cung. Cần để thăng bậc; mất khi bị bắt quả tang hay bị chê cười.",
 "Đức":`Tiếng hiền đức. Hoàng hậu cần Đức ${BAL.hhDuc} (mẹ Thái tử ${BAL.hhDucHeir}). Làm việc ác bị lộ thì mất Đức.`,
 "Sắc":"Nhan sắc. Giúp múa, thị tẩm và được Hoàng thượng để ý.",
 "Tài":"Tài học: đàn, thơ, chữ. Giúp hầu chuyện Hoàng thượng và thi tài.",
 "Tâm cơ":"Mưu trí, sự khôn khéo. Giúp dò la, bày mưu, nhìn thấu mưu của người khác.",
 "Tai mắt":"Số người ngầm báo tin cho ngươi khắp cung. Nhiều thì biết trước mưu hại, dễ có chứng cứ.",
 "Ân tình":"Tình nghĩa riêng giữa Hoàng thượng và ngươi, tích qua những đêm hầu hạ. Giữ sủng lâu, khó bị bỏ rơi.",
 "Sức":"Sức khỏe. Dưới 20 thì không làm được việc nặng; về 0 là bệnh nặng, nguy đến tính mạng.",
 "Bạc":"Tiền riêng của ngươi: bổng lộc hằng tháng, ban thưởng. Dùng để mua đồ, đút lót, thưởng kẻ hầu.",
 "Chủ tin":"Chủ nhân tin ngươi bao nhiêu (0–100). Cao thì được thưởng, tiến cử; dưới 10 dễ bị đày Tân Giả khố.",
 "Lòng":"Kẻ hầu trung thành với ngươi bao nhiêu (0–100). Dưới 45 dễ bị người khác mua chuộc.",
 "Ghen":"Người ấy ghen với ngươi bao nhiêu. Ghen cao thì dễ ra tay hại ngươi.",
 "Oán":"Người ấy oán hận ngươi bao nhiêu (vì ngươi từng hại họ). Oán cao thì dễ trả thù.",
 "Thù":"Như Oán: người ấy thù ghét ngươi bao nhiêu. Cao thì dễ trả thù.",
 "Thiện cảm":"Thiện cảm của người ấy với ngươi (âm là ghét). Cao thì giúp đỡ, che chở ngươi.",
 "Chứng cứ":"Số bằng chứng ngươi đang giữ về lỗi của người ấy. Đủ thì tố giác được, khó bị cho là vu cáo.",
 "Nguy hiểm":"Mức một người muốn hại người khác: lấy Ghen, Oán hoặc ghét cao nhất, cộng tính nết.",
 get "Quẻ"(){return `Quẻ đầu tuần: vận may tuần này. Cát thì việc dễ thành hơn, Hung thì khó hơn. Gieo lại tốn ${BAL.lot.bac} bạc và ${BAL.lot.k} khắc.`},
 "Quẻ tuần":"Quẻ đầu tuần: vận may tuần này. Cát thì việc dễ thành hơn, Hung thì khó hơn.",
 "Phục vị":"Được trả lại phẩm vị cũ sau khi bị giáng hay vào lãnh cung.",
 get "khắc"(){return `Đơn vị thời gian: mỗi buổi có ${BAL.time.khac} khắc. Mỗi việc tốn khắc; hết khắc thì sang buổi sau.`},
 "Thị tẩm":"Được gọi hầu Hoàng thượng qua đêm. Có thể có thai, tăng Sủng và Ân tình.",
 "Lật thẻ":"Mỗi tối Hoàng thượng lật thẻ bài để chọn người hầu đêm. Khả năng ngươi được chọn mỗi tuần.",
 "Lãnh cung":"Cung lạnh: nơi giam phi tần bị phế. Mất phẩm vị, chỉ còn đường xin phục vị.",
 "Cấm túc":"Bị giữ trong cung của mình một thời gian, không được ra ngoài, không được lật thẻ.",
 get "Bổng lộc"(){return `Bạc phát đầu mỗi tháng theo phẩm vị (${BAL.pay[0]}–${BAL.pay[BAL.pay.length-1]} bạc).`},
 "Ân thưởng":"Những lần ngươi được Hoàng thượng, Thái hậu ban thưởng và vật đã nhận.",
 "Tranh ghế":"Cuộc thi giành một ghế phẩm vị còn trống: thi tài nghệ rồi xét đức hạnh.",
 "Tuyển tú":"Ba năm một lần, cung đón thêm tú nữ mới.",
 "Thế lực":"Sức mạnh của một nhà quan trong triều. Thế lực nhà ngoại cao thì ngươi được nể.",
 "Công lao":"Điểm công việc của cung nữ/thái giám. Đủ thì được thăng bậc.",
 "Kính sự phòng":"Nơi giữ thẻ bài các phi tần và ghi chép việc thị tẩm.",
 "Nội vụ phủ":"Nơi lo đồ dùng, kẻ hầu và việc vặt của hậu cung.",
 "Tân Giả khố":"Nơi đày cung nữ, thái giám có tội làm việc nặng.",
 "Thai":"Khả năng có thai mỗi lần thị tẩm.",
 "Cơ hội":"Thang 7 bậc: Liều < Khó < Năm ăn năm thua < Khá chắc < Chắc < Rất chắc < Nắm chắc."};
const KP_GLRE=new RegExp("^("+Object.keys(KIT_GLOSS).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")$");
/* kitGloss("Tâm cơ") -> the term with a dotted underline; tap shows its meaning. Unknown terms come back as plain text. */
function kitGloss(term,label){const t=String(term||"").trim();const k=Object.keys(KIT_GLOSS).find(x=>x.toLowerCase()===t.toLowerCase());return k?`<span class="kgl" data-kgl="${kpEsc(k)}">${label||t}</span>`:(label||t)}
/* HUD help texts read the glossary too (one source) */
(function(){try{if(typeof HX==="object"){const map={tamco:"Tâm cơ",an:"Ân tình",mat:"Tai mắt",duc:"Đức",sac:"Sắc",tai:"Tài",sung:"Sủng",danh:"Danh",bac:"Bạc",suc:"Sức"};for(const k in map)HX[k]=`${map[k]}: ${KIT_GLOSS[map[k]].charAt(0).toLowerCase()+KIT_GLOSS[map[k]].slice(1)}`;/* HX.lot reads KIT_GLOSS["Quẻ"] itself (j19 getter) */0}}catch(e){}})();

/* ---------- ROAD-AWARE GLOSSES (review/small-bugs-2, LUẬT SỬA CẢ NHÓM): a stat's meaning follows her road. On the cung nữ road
   (isSrv) and in lãnh cung (S.out) the consort-only goals (lập Hoàng hậu, thăng bậc phi tần, thị tẩm, bổng lộc) mean nothing, so every
   header cell, tap explanation (HX) and glossary popover reads the road's own text. kitGlossText(term) = the one lookup; kitRoad() = the road. */
function kitRoad(){try{if(typeof isSrv==="function"&&isSrv())return"srv";if(S&&S.out)return"cold"}catch(e){}return""}
const KIT_GLOSS_ROAD={
 srv:{"Sủng":"Hoàng thượng thương một phi tần bao nhiêu (0–100). Phận cung nữ chưa có Sủng; điều ngươi có là Hoàng thượng để ý.",
  "Đức":"Tiếng hiền đức. Đức cao thì chủ nhân và người trong cung dễ tin, việc nhờ cậy dễ thành. Làm việc ác bị lộ thì mất Đức.",
  "Danh":"Tiếng tăm của ngươi trong đám cung nhân. Danh cao thì được tin cậy, có người để ý xin cưới; mất khi bị bắt quả tang hay bị chê cười.",
  "Sắc":"Nhan sắc. Giúp được người khác quý, được Hoàng thượng để ý.",
  "Tài":"Tài học: đàn, thơ, chữ. Giúp làm tròn việc chủ giao, được Hoàng thượng để ý.",
  "Bạc":"Tiền riêng của ngươi: lương tháng, tiền thưởng. Dùng để mua đồ, đút lót, nhờ người.",
  "Ân tình":"Tình nghĩa riêng giữa Hoàng thượng và một phi tần. Phận cung nữ chưa có Ân tình; được Hoàng thượng để ý, nâng làm phi tần rồi mới có."},
 cold:{"Sủng":"Hoàng thượng còn thương ngươi bao nhiêu (0–100). Còn sủng thì dễ được nhớ đến, được ân xá ra khỏi lãnh cung.",
  "Đức":"Tiếng hiền đức. Giữ được Đức thì dễ được minh oan, được ân xá. Làm việc ác bị lộ thì mất Đức.",
  "Danh":"Tiếng tăm của ngươi trong cung. Ở lãnh cung Danh mòn dần; còn Danh thì người ngoài còn nhớ đến mà nói giúp.",
  "Sắc":"Nhan sắc. Giúp Hoàng thượng còn nhớ đến ngươi.",
  "Tài":"Tài học: đàn, thơ, chữ. Thơ văn gửi ra ngoài có thể làm Hoàng thượng động lòng.",
  "Bạc":"Tiền riêng của ngươi. Ở lãnh cung không còn tiền phát hằng tháng; dùng để đút lót, nhờ người đưa tin.",
  "Ân tình":"Tình nghĩa riêng giữa Hoàng thượng và ngươi, còn lại từ những ngày được gần ngài. Còn Ân tình thì thư từ lãnh cung được ngài đọc, xin tha tội dễ thành. Ở đây không gặp được ngài nên Ân tình phai dần."}};
function kitGlossText(term){const r=kitRoad();const R=r&&KIT_GLOSS_ROAD[r];return R&&R[term]!=null?R[term]:(KIT_GLOSS[term]||"")}
window.kitRoad=kitRoad;window.kitGlossText=kitGlossText;
/* HX (header tap texts) follows the road: rebuilt from kitGlossText when the road changes; the consort texts are kept as they were */
const KIT_HXMAP={tamco:"Tâm cơ",an:"Ân tình",mat:"Tai mắt",duc:"Đức",sac:"Sắc",tai:"Tài",sung:"Sủng",danh:"Danh",bac:"Bạc",suc:"Sức"};let KIT_HX0=null,KIT_HXR="";
function kitHxRoad(){try{if(typeof HX!=="object")return;const r=kitRoad();if(r===KIT_HXR&&KIT_HX0)return;if(!KIT_HX0){KIT_HX0={};for(const k in KIT_HXMAP)KIT_HX0[k]=HX[k]}KIT_HXR=r;
 for(const k in KIT_HXMAP){const R=r&&KIT_GLOSS_ROAD[r],t=KIT_HXMAP[k];HX[k]=R&&R[t]!=null?`${t}: ${R[t].charAt(0).toLowerCase()+R[t].slice(1)}`:KIT_HX0[k]}}catch(e){}}
window.kitHxRoad=kitHxRoad;
/* ---------- popover (odds ladder, glossary): never a modal, never covers the scene for long; any tap closes ---------- */
function kpPop(anchor,html,o){o=o||{};let p=document.getElementById("kpop");if(!p){p=document.createElement("div");p.id="kpop";p.className="kpop";document.body.appendChild(p)}
 p.innerHTML=html;p.hidden=false;const r=anchor.getBoundingClientRect();
 /* o.inside (act-dedupe UI): the pop-up sits ON the tapped card (never below it), so it cannot cover the next card in the list/grid */
 const W=o.inside?Math.max(120,Math.min(300,r.width-8,innerWidth-24)):Math.min(300,innerWidth-24);p.style.width=W+"px";
 let x=Math.max(o.inside?4:12,Math.min(innerWidth-W-(o.inside?4:12),r.left+r.width/2-W/2));p.style.left=x+"px";p.style.top="0px";const h=p.offsetHeight;
 if(o.inside){const vt=Math.max(r.top,8),vb=Math.min(r.bottom,innerHeight-8);/* the visible part of the card */let y=vt+Math.max(4,(vb-vt-h)/2);if(h>r.height-8)y=r.top+4;p.style.top=Math.max(4,y)+"px";return}
 let y=r.bottom+6;if(y+h>innerHeight-8)y=Math.max(8,r.top-h-6);p.style.top=y+"px"}
document.addEventListener("click",e=>{const p=document.getElementById("kpop");const od=e.target.closest(".kodm"),gl=e.target.closest(".kgl");
 if(od||gl){e.stopPropagation();e.preventDefault();if(od)kpPop(od,kitOddsLadder(+od.dataset.kodds));else kpPop(gl,`<div class="kpopt">${gl.dataset.kgl}</div><div class="kpopx">${kitGlossText(gl.dataset.kgl)}</div>`);return}
 if(p&&!p.hidden)p.hidden=true},true);
/* the HUD standing chances (Có thai, Lật thẻ) read on the chance scale Rất thấp…Rất cao (j64 + chanceLvl in j1), never the act ladder */

/* ---------- the PANEL ---------- */
/* kitPanel({kind, title, sub, subject:person|face, sections:[{h, html}|{h, facts}|{h, rows}], facts, rows, opts, btn, cls, onClose}) -> pushed to the modal queue.
   kind: rule | info | news | notice | choice | result | night | end | intel | threat | evidence | reward.  Returns the queue item. */
function kitPanel(spec,front){const m={t:spec.title||"",h:"",kit:spec,opts:spec.opts,btn:spec.btn,cls:spec.cls,who:spec.subject&&(spec.subject.src!==undefined?spec.subject:kitFace(spec.subject))||null,onClose:spec.onClose};
 if(front)Q.unshift(m);else Q.push(m);return m}
/* KIT §51.1 ONE BLOCK = ONE LABEL COLUMN (owner 15/11 "Hàng trên hàng dưới chưa alignment"): kit tables (.kpkb) that read as one block
   are joined into ONE grid, so the widest label of the block sets the column and every value starts on one vertical line:
   (a) a kit table right after another kit table; (b) a section with no heading whose first child is a kit table, right after a section
   (or table) that ends with a kit table; (c) a bare kit table right after such a section. A heading (h4.kpst) always starts a new block.
   Runs on every kit panel (kpBuild), for spec sections and legacy html alike. */
function kitRowsAlign(root){if(!root)return;const KB=e=>e&&e.matches&&e.matches(".kb.kpkb")?e:null;
 const tail=e=>KB(e)||(e&&e.matches&&e.matches(".kpsec")?KB(e.lastElementChild):null);
 const head=e=>KB(e)||(e&&e.matches&&e.matches(".kpsec")&&!e.querySelector(":scope>.kpst,:scope>h1,:scope>h2,:scope>h3,:scope>h4,:scope>h5,:scope>h6")?KB(e.firstElementChild):null);
 [...root.querySelectorAll(".kpkb")].map(k=>k.parentElement).filter((p,i,a)=>p&&a.indexOf(p)===i).concat([root]).forEach(par=>{
  let prev=null;for(const e of [...par.children]){const h=head(e),t0=prev&&tail(prev);
   if(h&&t0&&t0!==h){while(h.firstChild)t0.appendChild(h.firstChild);h.remove();if(e!==h&&!e.children.length&&!e.textContent.trim()){e.remove();continue}}
   if(e.parentElement===par)prev=e}})}
function kitModal(spec){const m=kitPanel(spec,true);showModal();return m}
/* ================= KIT 83.9 · DANGER BUTTON + kitConfirm (kit request cloud-del / Foreman D, s18) =================
   `.kbtn.kdanger` = the button for an IRREVERSIBLE action: same size and shape as `.kbtn`, but charcoal with a cinnabar rim (never the lacquer red of `.kbtn`).
   `kitConfirm({title, lines:[…], yes, no, type?, onYes, onNo})` = a centre pop-up on kitModal: the lines, optional "type <code> to confirm" field (kitInput; the danger button stays
   disabled until it matches), `.kbtn.alt` no (the panel's own button) and `.kbtn.kdanger` yes. onYes runs once, then the pop-up closes. */
function kitConfirm(o){o=o||{};const id="kcf"+(window.__kcf=(window.__kcf||0)+1),need=o.type?String(o.type):"";let done=false;
 const body=`<div class="kcf" data-kcf-id="${id}">${(o.lines||[]).map(l=>`<p>${l}</p>`).join("")}${need?`<p class="kcf-t">Gõ <b>${need}</b> để xác nhận.</p>${typeof kitInput==="function"?kitInput({id:id+"i",label:"Xác nhận",placeholder:need}):`<input id="${id}i" class="kinput">`}`:""}<div class="kcf-b"><button type="button" class="kbtn kdanger" data-kcf-yes="${id}"${need?" disabled":""}>${o.yes||"Xóa"}</button></div></div>`;
 window.__kcfH=window.__kcfH||{};window.__kcfH[id]=()=>{if(done)return;done=true;try{o.onYes&&o.onYes()}catch(e){console.error(e)}try{closeModal()}catch(e){}};
 return kitModal({kind:"notice",title:o.title||"Chắc chắn?",sections:[{h:"",html:body}],btn:o.no||"Thôi",onClose:()=>{if(!done){done=true;try{o.onNo&&o.onNo()}catch(e){}}}})}
window.kitConfirm=kitConfirm;
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kcf-yes]");if(b&&!b.disabled){const h=window.__kcfH&&window.__kcfH[b.dataset.kcfYes];if(h)h()}});
document.addEventListener("input",e=>{const i=e.target;if(!i||!i.id||!/^kcf\d+i$/.test(i.id))return;const id=i.id.slice(0,-1),w=i.closest(".kcf"),need=w&&w.querySelector(".kcf-t b"),y=w&&w.querySelector("[data-kcf-yes]");if(y&&need)y.disabled=i.value.trim()!==need.textContent});
(function(){const st=document.createElement("style");st.id="kit-danger";st.textContent=`html body .kbtn.kdanger{background:linear-gradient(#3a2d28,#241a16)!important;color:#ffe9dc!important;border:1px solid #d9482b!important;box-shadow:inset 0 0 0 1px #ff9c7a40,0 1px 0 #d9c49a!important}
html body .kbtn.kdanger:disabled{opacity:1;background:#d8cdbd!important;color:#6b5643!important;border-color:#b9a98f!important;box-shadow:none!important;cursor:not-allowed}
.kcf p{margin:.3em 0}.kcf-t{color:var(--k-lab,#8a7350)}.kcf-b{display:flex;justify-content:center;margin-top:.7em}`;document.head.appendChild(st)})();
function kpKind(m){if(m.kit&&m.kit.kind)return m.kit.kind;const t=String(m.t||""),c=String(m.cls||"");
 if(/night/.test(c))return"night";if(/\bend\b/.test(c))return"end";if(/^Tin trong cung/.test(t))return"news";if(/^Tai mắt|báo tin/.test(t))return"intel";
 if(/^Kết quả|^Bị bắt|^Bị từ chối|^Được (yết kiến|mời)/.test(t))return"result";if(/ban thưởng|Ân thưởng|Bổng lộc/.test(t))return m.opts?"choice":/Bổng lộc|Ân thưởng$/.test(t)?"rule":"reward";
 if(m.opts)return"choice";if(/^(Thang|Ra vào|Quẻ)/.test(t)||(typeof HX==="object"&&Object.keys(HXN||{}).some(k=>HXN[k]===t)))return"rule";return"notice"}
/* convert the rendered legacy body into kit blocks */
function kpConvert(root,m){const blocks=[];let sub="",prose=[],chipsLine="";
 const flush=()=>{if(prose.length){const h=prose.join(" ");prose=[];if(kpPlain(h))blocks.push(kitFacts([h],{group:kpKind(m)==="news"}))}};
 const nodes=[...root.childNodes];let first=true;
 for(const n of nodes){
  if(n.nodeType===3){if(n.textContent.trim())prose.push(kpEsc(n.textContent));continue}
  if(n.nodeType!==1)continue;const tg=n.tagName;
  if(tg==="P"&&n.classList.contains("past")){const pl=kpPlain(n.innerHTML);
   if(first&&!sub&&pl.length<90){sub=n.innerHTML;first=false;continue}
   flush();if((pl.match(/ · /g)||[]).length>=2){blocks.push(`<div class="kpsec">${kitChips(n.innerHTML.split(/ · /).map(x=>`<span class="kchip n">${x}</span>`))}</div>`)}
   else blocks.push(`<div class="kpnote">${kpChipify(n.innerHTML)}</div>`);continue}
  first=false;
  if(tg==="P"||tg==="SPAN"&&!n.className||tg==="B"||tg==="I"||tg==="EM"||tg==="STRONG"||tg==="SMALL"&&!n.className||tg==="A"){prose.push(tg==="P"?n.innerHTML:n.outerHTML);if(tg==="P")flush();continue}
  if(/^(SPAN|B)$/.test(tg)&&/^(g|r|ef)/.test(n.className)){prose.push(n.outerHTML);continue}
  if(tg==="BR"){flush();continue}
  if(/^H[1-6]$/.test(tg)){flush();blocks.push(`<h4 class="kpst">${n.innerHTML}</h4>`);continue}
  flush();n.classList.add("kpraw");blocks.push(n)}
 flush();return{sub,blocks}}
function kpHeader(kind,title,sub){return `<div class="kph"><b class="kpseal kp-${kind}">${KP_SEAL[kind]||"BÁO"}</b><span class="kpht"><span class="kptitle">${title||""}</span>${sub?`<small class="kpsub">${sub}</small>`:""}</span></div>`}
function kpSubject(f,m){if(!f)return"";const p=f.__kp||null;let name="",role="";
 try{if(p){name=kitName(p,{cap:true})}else{name=`<b class="kname" style="--rc:${f.col||"#8a7350"}">${f.rw||""}</b>`}}catch(e){}
 return `<div class="kpsubj">${pframe(f)}<div class="kpsn">${name}</div></div>`}
/* build the kit panel from the queue item; keeps the nodes the old renderer made (options, faces, person cards) */
function kpBuild(M,m){const dlg=M.querySelector(".dlg"),mb=$("mb"),mt=$("mt");if(!dlg||!mb)return;
 if(/pcm/.test(m.cls||"")){dlg.classList.add("kpanel","kp-person");return}
 const kind=kpKind(m);dlg.classList.add("kpanel");dlg.dataset.kind=kind;dlg.style.setProperty("--dart","none");
 const opts=mb.querySelector(":scope > .opts");if(opts)opts.remove();
 const faces=mb.querySelector(":scope > .faces");if(faces)faces.remove();
 let src=mb.querySelector(":scope > .spk > .spkt")||mb;const spec=m.kit||null;
 let sub=spec&&spec.sub||"",blocks=[];
 if(spec){window.__kpSkip=m.who&&m.who.__kp||null;if(spec.facts)blocks.push(kitFacts(spec.facts,{group:spec.group}));if(spec.rows)blocks.push(kitRows(spec.rows));
  (spec.sections||[]).forEach(s=>{if(!s)return;blocks.push(`<div class="kpsec">${s.h?`<h4 class="kpst">${s.h}</h4>`:""}${s.facts?kitFacts(s.facts,{group:false}):""}${s.rows?kitRows(s.rows):""}${s.tiers?kitTiers(s.tiers,s):""}${s.chips?kitChips(s.chips):""}${s.html||""}</div>`)});
  if(spec.html)blocks.push(spec.html);window.__kpSkip=null}
 else{window.__kpSkip=m.who&&m.who.__kp||null;try{const c=kpConvert(src,m);sub=c.sub;blocks=c.blocks}finally{window.__kpSkip=null}}
 const showSubj=!!m.who&&!faces;
 const head=kpHeader(kind,m.t,sub);
 const body=document.createElement("div");body.className="kpb"+(showSubj?" kphas":"");
 if(showSubj)body.insertAdjacentHTML("beforeend",kpSubject(m.who,m));
 const main=document.createElement("div");main.className="kpmain";
 if(faces){faces.classList.add("kpfaces");main.appendChild(faces)}
 for(const b of blocks){if(typeof b==="string")main.insertAdjacentHTML("beforeend",b);else main.appendChild(b)}
 body.appendChild(main);mb.innerHTML="";mb.appendChild(body);
 try{kitRowsAlign(main)}catch(e){}
 /* KIT §8.1 SHORT NOTICE (kit keeper): only facts (≤ 3), ≤ 220 characters, no sections / rows / opts / subject → .kpshort, centred in the frame (CSS below) */
 try{if(!showSubj&&!opts&&!faces&&!main.querySelector(".kpsec,.kpkb,.kpfaces,.kmlist,table")&&main.querySelectorAll(".kfacts>*").length<=3&&main.textContent.trim().length<=220)body.classList.add("kpshort")}catch(e){}
 if(opts){opts.classList.add("kpopts");mb.appendChild(opts)}
 let ph=dlg.querySelector(":scope > .kph");if(ph)ph.remove();mt.hidden=true;dlg.insertAdjacentHTML("afterbegin",head);
 const mr=$("mr");const cb=mr&&mr.querySelector("#mclose");if(cb){cb.classList.add("kbtn");if(/^\s*(Đã rõ|OK|Xong)\s*$/.test(cb.textContent))cb.textContent="Đã hiểu"}}
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const M=$("modal");if(M&&!M.hidden&&Q[0]){const d=M.querySelector(".dlg");d.classList.remove("kpanel","kp-person");delete d.dataset.kind;const ph=d.querySelector(":scope > .kph");if(ph)ph.remove();kpBuild(M,Q[0])}}catch(e){console.error("kpBuild",e)}return r}})();

/* ---------- Cần row (j63 supplies it as .kr-why with ✓/✗ items): drawn as kit status chips here ---------- */
/* standing chances and side risks read on the chance scale (chanceLvl / chanceW, j1); the 7-step ladder is for the act's own odds only */
/* ---------- the look ---------- */
(function(){const st=document.createElement("style");st.id="kp-css";st.textContent=`
:root{--k-hair:#e6d3ac;--k-lab:#8a7350;--k-card:#fffaf0;--k-card2:#f6ead6;--k-seal:#9a2c1c;--k-rad:8px}
/* panel frame */
.dlg.kpanel{padding:0;max-width:560px;background:var(--k-card);border:1px solid var(--gold);box-shadow:0 0 0 3px #f6ead6,0 0 0 4px #c9a46a,0 14px 40px #2a1a1260;overflow:auto}
.dlg.kpanel::before{display:none}
/* ONE FRAME SIZE (owner 15/11 "kích thước khung khác nhau", KIT §8.1): every pop-up has the same width and the same height at a given viewport; only the
   seal word and the content differ. The header and the button stay fixed; the text / option area scrolls inside (rule L191). */
:root{--kpw:min(560px,calc(100vw - 28px));--kph:min(calc(100dvh - 32px),max(420px,calc(70*var(--kvh,1dvh))),720px)}

html body #modal:not(.pcm) .dlg.kpanel{box-sizing:border-box;width:var(--kpw)!important;min-width:0!important;max-width:var(--kpw)!important;height:var(--kph)!important;min-height:var(--kph)!important;max-height:var(--kph)!important;display:flex!important;flex-direction:column;overflow:hidden!important}
html body #modal:not(.pcm) .dlg.kpanel>.kph{position:relative;flex:0 0 auto}
html body #modal:not(.pcm) .dlg.kpanel>#mb{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain}
html body #modal:not(.pcm) .dlg.kpanel>#mr{flex:0 0 auto}
/* KIT §8.1 short notice: centred in the one-size frame (margin:auto 0 centres when it fits, top-aligned + scroll when it does not — nothing is clipped) */
html body #modal:not(.pcm) .dlg.kpanel>#mb{display:flex;flex-direction:column}
html body #modal:not(.pcm) .dlg.kpanel>#mb>*{flex:0 0 auto}
/* KIT §8.1 SCROLL CHAIN (owner 16/11 "Không vuốt được"): only the panel's own scroller (#mb, the dawn .kpb, the person card .pc) holds the
   swipe. A nested scroller (.kshg grid, .opts list, .pcl ...) hands the swipe on when it has nothing (more) to scroll: with
   overscroll-behavior:contain the browser latches the finger to it and #mb never moves (the 10-piece Học Cầm grid was unreachable by touch). */
html body #modal .dlg>#mb *,html body #modal .pc *,.dawn .dbox.kpanel>.kpb *{overscroll-behavior:auto}
html body #modal:not(.pcm) .dlg.kpanel .kpb.kpshort{margin:auto 0;text-align:center;align-items:center}
html body #modal:not(.pcm) .dlg.kpanel .kpb.kpshort .kpmain{align-items:center}
.dlg.kpanel .kph{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 14px 9px;background:linear-gradient(#f6ead6e6,#fffaf0f0),url(img/kit/bg-default.webp) center/240px repeat;border-bottom:1px solid var(--line);box-shadow:inset 0 -2px 0 #fffaf0,0 1px 0 #e6d3ac}
.kpseal{flex:0 0 auto;font-family:var(--display);font-size:.7rem;letter-spacing:.06em;color:#fff8e6;background:var(--k-seal);border:1px solid #6e1d12;border-radius:5px;padding:4px 6px;line-height:1;box-shadow:inset 0 0 0 1px #ffffff30;white-space:nowrap}
.kpseal.kp-news,.kpseal.kp-intel{background:#7a5a1e;border-color:#4d3810}.kpseal.kp-rule,.kpseal.kp-info{background:#3f5f6e;border-color:#253c47}
.kpseal.kp-result{background:var(--good);border-color:#1d5236}.kpseal.kp-threat{background:#b8321f}.kpseal.kp-evidence{background:#5a4a7a;border-color:#3a2e52}
.kpseal.kp-end{background:#3a2a22;border-color:#1c120d}.kpseal.kp-night{background:#4a2a20}.kpseal.kp-reward{background:#a8781c;border-color:#6e4d0e}
.kpht{display:flex;flex-direction:column;min-width:0}.kptitle{font-family:var(--display);color:var(--gold);font-size:1.12rem;font-weight:700;line-height:1.2;overflow-wrap:anywhere}
.kpsub{font-size:.74rem;color:var(--dim)}
.dlg.kpanel #mb{padding:10px 14px 4px}.dlg.kpanel #mr{padding:4px 14px 12px;margin:0}.dlg.kpanel #mr:empty{display:none}
.kpb{display:block}.kpb.kphas{display:grid;grid-template-columns:clamp(84px,24%,128px) minmax(0,1fr);gap:12px;align-items:start}
.kpsubj{display:flex;flex-direction:column;gap:4px;align-items:center;text-align:center}.kpsubj .pfr,.kpsubj .pfwrap{width:100%!important;max-width:none;margin:0!important;float:none!important}.kpsn{font-size:.78rem;line-height:1.25}.kpsubj .pfrw{display:none}
.kpmain{display:flex;flex-direction:column;gap:8px;min-width:0;line-height:1.4}
.kpsec{display:flex;flex-direction:column;gap:4px}
.kpst{margin:2px 0 0;font-family:var(--display);font-size:.78rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--k-lab);border-bottom:1px solid var(--k-hair);padding-bottom:2px}
.kpnote{font-size:.78rem;color:var(--dim);border-left:3px solid var(--k-hair);padding:2px 0 2px 8px}
/* names, faces, chips */
.kname{color:var(--rc,var(--ink));color:color-mix(in srgb,var(--rc,#2a1a12) 62%,#2a1a12);color:var(--rtn,color-mix(in srgb,var(--rc,#2a1a12) 62%,#2a1a12));font-weight:700}.kname .kti{font-weight:600;font-size:.92em}
.kname.kme{color:var(--ink)}
.kchips{display:inline-flex;flex-wrap:wrap;gap:4px}
.kchip{display:inline-flex;flex-wrap:nowrap;align-items:baseline;gap:3px;font-size:.76rem;line-height:1.25;padding:1px 7px;border-radius:10px;border:1px solid var(--line);background:#fff;color:var(--dim);white-space:normal;overflow-wrap:anywhere;margin:1px 2px;vertical-align:baseline}
.kchip b{font-weight:700;white-space:nowrap;flex:0 0 auto}.kchip.g{color:var(--good);border-color:#8fbf9f;background:#eef7f0}.kchip.r{color:var(--bad);border-color:#e3a497;background:#fcefeb}.kchip.n{color:var(--ink)}.kchip.w{color:var(--gold);border-color:var(--trim);background:#fbf3df}/* KIT 28.6 kitRisk "có rủi ro" (amber), with g = an toàn, r = liều */.kat>.kchip.krisk{flex:0 0 auto;margin-left:auto;font-weight:700;white-space:nowrap}
.kpl{display:flex;align-items:center;gap:8px}.kplt{display:flex;flex-direction:column;min-width:0}.kplt small{color:var(--dim);font-size:.74rem}
/* facts */
.kfacts{display:flex;flex-direction:column}
.kfact{display:grid;grid-template-columns:34px minmax(0,1fr);gap:8px;align-items:start;padding:5px 0;border-bottom:1px dotted var(--k-hair)}
.kfact:last-child{border-bottom:0}
.kfact>.md{width:34px!important;height:34px!important;margin:0!important;position:static!important}
.kfdot{width:34px;height:34px;border-radius:50%;background:radial-gradient(circle,#c9a46a 0 4px,transparent 5px),url(img/kit/bg-default.webp) center/80px;border:1px solid var(--line);box-sizing:border-box}
/* KIT §51 (owner 11/15 17:27Z): a fact with no person shows NO blank dot (an empty round icon means nothing); the text takes the row.
   The week book keeps its small diamond bullet (j87 .kbk-pg .kfdot). */
.kfact>.kfdot{display:none}.kfact:has(>.kfdot){grid-template-columns:minmax(0,1fr)}.kbk-pg .kfact>.kfdot{display:block}
.kft{font-size:.88rem;color:var(--ink);overflow-wrap:anywhere;align-self:center}.kft p{margin:0}
.kfwhen{display:block;color:var(--dim);font-size:.7rem}.kfwhy{display:block;color:var(--dim);font-size:.74rem}
.kintel{display:flex;flex-direction:column}.kint{display:grid;grid-template-columns:34px minmax(0,1fr);gap:8px;padding:5px 0;border-bottom:1px dotted var(--k-hair)}.kint>.md{width:34px!important;height:34px!important;margin:0!important}
.kisrc{display:block;color:var(--dim);font-size:.72rem}
/* rows inside panels: same grid as the act card. KIT §51 KIT TABLE (owner 11/15 17:27Z): every label|value list is ONE kitRows grid;
   the label column is fixed per table = its longest label, capped at --kt-lab (34% of the table, never under 7rem so a label is never
   one word per line); labels wrap inside that column, every value starts at the same x. */
.kpkb{font-size:.84rem;grid-template-columns:fit-content(var(--kt-lab,max(34%,7rem))) minmax(0,1fr)}
.kpkb .krl{padding-top:.18rem;white-space:normal;overflow-wrap:normal;word-break:normal;hyphens:none;line-height:1.25}
/* a person label: small face, name beside it (wraps beside the face) */
.kpkb .krl:has(>.md){display:flex;align-items:center;gap:5px}.kpkb .krl>.md{flex:none;margin:0}
/* tiers */
.ktiers{display:flex;flex-direction:column;gap:4px}
.ktier{display:grid;grid-template-columns:5.2rem minmax(0,1fr) auto;gap:8px;align-items:center;padding:5px 8px;border:1px solid var(--k-hair);border-radius:var(--k-rad);background:linear-gradient(90deg,rgba(194,59,34,calc(var(--lv)*.16)),transparent 70%),var(--k-card)}
.ktier.on{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold)}
.ktk{font-weight:700;font-size:.8rem;color:var(--ink);white-space:nowrap}.ktb{display:flex;flex-direction:column;min-width:0}.ktb b{font-size:.86rem}.ktb b.r{color:var(--bad)}.ktb b.g{color:var(--good)}.ktb small{font-size:.74rem;color:var(--dim);overflow-wrap:anywhere}
/* cards inside panels (evidence, threat) */
.kcardp{border:1px solid var(--line);border-radius:var(--k-rad);background:var(--k-card);padding:7px 9px;display:flex;flex-direction:column;gap:5px}
.kcph{display:flex;align-items:center;gap:8px;padding-bottom:4px;border-bottom:1px solid var(--k-hair)}.kcph>.md{width:34px!important;height:34px!important;margin:0!important}.kcpt{display:flex;flex-direction:column;flex:1;min-width:0}.kcpt small{color:var(--dim);font-size:.76rem}
.kth{border-color:#e3a497;background:linear-gradient(#fcefeb,var(--k-card) 40px)}
.kpacts{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));grid-auto-rows:1fr;gap:6px}
/* legacy blocks kept inside a panel get the kit look */
.kpmain .pcb.rows{border:1px solid var(--k-hair);border-radius:var(--k-rad);padding:2px 8px;background:#fffdf8}
.kpmain .pcrow{font-size:.82rem;padding:4px 0;border-bottom:1px dotted var(--k-hair)}.kpmain .pcrow:last-child{border-bottom:0}
.kpmain table{border-collapse:collapse;width:100%;font-size:.82rem}.kpmain td,.kpmain th{border-bottom:1px dotted var(--k-hair);padding:3px 4px;text-align:left}
.kpmain ul{margin:0;padding-left:18px}.kpmain li{padding:2px 0}
.kpfaces{margin:0 0 4px}
/* options + the ONE button */
.dlg.kpanel .kpopts{margin:8px 0 6px}
.dlg.kpanel #mr{display:flex;justify-content:flex-end;gap:8px}
.kbtn,.dlg.kpanel #mr .main{font-family:var(--display);font-weight:700;letter-spacing:.02em;color:#fff8e6;background:linear-gradient(#b0402c,#8a2a1e);border:1px solid #6e1d12;box-shadow:inset 0 0 0 1px #f0d07066,0 1px 0 #d9c49a;border-radius:8px;min-height:42px;padding:8px 22px;cursor:pointer;white-space:normal}
.kbtn:hover{filter:brightness(1.06)}
/* RULE (owner 17/11, every button in the game): a word never breaks inside a button; a button that is too narrow grows or wraps to a new row, it never breaks letters */
html body .kbtn,html body .kbtn *{word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}
.kbtn.alt{background:var(--k-card);color:var(--ink);border-color:var(--line);box-shadow:none}
/* night: same light paper panel as every pop-up (owner s8 "Tại sao khung này màu tối"); the night feel comes from the backdrop + seal */
.modal.end .dlg.kpanel{text-align:left}
/* odds meter */
.kodm{display:inline-flex;align-items:center;gap:5px;cursor:pointer;vertical-align:middle;line-height:1;white-space:nowrap}
.kodm b{font-size:.72rem;font-weight:700;color:var(--oc)}
.kseg{display:inline-flex;gap:1.5px;padding:2px;border-radius:4px;background:#efe3cc;border:1px solid #d9c49a}
.kseg i{display:block;width:5px;height:9px;border-radius:1.5px;background:#fffaf0;box-shadow:inset 0 0 0 1px #d9c49a}
.kodm.oc{background:none!important;border:0!important;padding:0!important;margin:0}
button.ka .kodds .kodm{flex-direction:row}
.hc.khc{display:inline-flex;align-items:center;gap:4px}.hc.khc .kodm b{font-size:.68rem}
.kpop{position:fixed;z-index:60;background:var(--k-card);border:1px solid var(--gold);border-radius:var(--k-rad);box-shadow:0 0 0 3px #f6ead6,0 10px 30px #2a1a1250;padding:8px 10px;font-size:.82rem;color:var(--ink)}
.kpopt{font-family:var(--display);font-weight:700;color:var(--gold);border-bottom:1px solid var(--k-hair);padding-bottom:3px;margin-bottom:4px}
.kpopx{line-height:1.4}
.kpopr{display:grid;grid-template-columns:auto auto minmax(0,1fr);gap:6px;align-items:center;padding:3px 4px;border-radius:5px}.kpopr.on{background:#f0d07055;box-shadow:inset 0 0 0 1px var(--gold)}.kpopr b{font-size:.78rem;white-space:nowrap}.kpopr small{color:var(--dim);font-size:.72rem}
.kgl{text-decoration:underline dotted #b9a27a;text-underline-offset:2px;cursor:help}
/* Cần row (act card, j63 .kr-why): status chips */
button.ka .kr-why .krv{display:flex;flex-wrap:wrap;gap:3px;align-items:flex-start}
button.ka .kr-why .kwhy{display:inline-block!important;font-size:.7rem;line-height:1.3;font-weight:600;padding:0 6px;border-radius:10px;border:1px solid #e3a497;background:#fcefeb;color:var(--bad)!important;white-space:normal;overflow-wrap:anywhere}
button.ka .kr-why .kwhy.kok{border-color:#8fbf9f;background:#eef7f0;color:var(--good)!important;font-weight:600}
button.ka .kr-why .ksep{display:none}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();

/* ---------- converted panels: the rule ladder (Thang nguy hiểm) as kit tiers ---------- */
(function(){if(typeof bandCard!=="function")return;bandCard=function(){const T=BANDS.map((b,i)=>({k:i<BANDS.length-1?`${b[0]}–${BANDS[i+1][0]-1}`:`${b[0]} trở lên`,n:i?`hại ${b[1]}`:"không ra tay",c:i?"r":"g",d:i?b[2].map(k=>ACT[k]?ACT[k].n:k).join(", "):""}));
 return `<div class="kpsec"><h4 class="kpst">Cách tính</h4>${kitRows([["Nguy hiểm",`${kitGloss("Ghen")}, ${kitGloss("Oán")} hoặc ghét: lấy số cao nhất`,"t"],["Cộng",[kitChip("Hiểm độc",10,"r"),kitChip("Hiền lành",-15,"g"),kitChip("Nhu mì",-10,"g")]],["Áp cho","mọi người, cùng một thang","n"]])}</div><div class="kpsec"><h4 class="kpst">Thang 4 mức</h4>${kitTiers(T)}</div><div class="kpsec"><h4 class="kpst">Ghi nhớ</h4><div class="kfacts">${["Trong mỗi mức, càng gần mức trên càng hay ra tay.","Ngươi hại ai thì Oán của người đó tăng; Oán đủ cao thì người đó lên mức trên."].map(t=>kpFactRow({text:t,kind:"world",auto:false},[])).join("")}</div></div>`}})();

/* ---------- week summary (dawn): same kit panel on the dawn sky; facts untruncated, deltas as chips ---------- */
KP_SEAL.week="TUẦN";
(function(){if(typeof dawn!=="function")return;dawn=function(){const sum=wkSummary();S.wkSnap=wkSnap();let w=$("dawn");if(!w){w=document.createElement("div");w.id="dawn";w.className="dawn";document.body.appendChild(w)}
 const dl=sum.D.filter(([,v])=>v).map(([k,v])=>kitChip(k,v));
 const secs=[];
 if(S.lot){const bad=LVB[S.lot.lv]<0||(S.lot.dom==="Hung"&&S.lot.lv>=3),good=LVB[S.lot.lv]>0;secs.push(`<div class="kpsec"><h4 class="kpst">${kitGloss("Quẻ tuần")}</h4>${kitRows([["Quẻ",`<span class="ef t">${LV[S.lot.lv]} · ${S.lot.dom}</span>`],["Lời quẻ",(LOTS[S.lot.i]||[])[2]||"","n"],["Tuần này",lotEffect(S.lot),bad?"r":good?"g":"n"]])}</div>`)}
 const me=[];if(sum.rank)me.push({text:`<b class="g">${sum.rank}</b>`,who:S});if(sum.kids>0)me.push({text:`Thêm ${sum.kids} con.`,who:S});
 secs.push(`<div class="kpsec"><h4 class="kpst">Tuần qua</h4>${dl.length?kitChips(dl):`<span class="kchip n">Không đổi gì</span>`}${me.length?kitFacts(me,{group:false}):""}</div>`);
 const G=sum.groups.filter(g=>g[1].length);for(const [h,L] of G)secs.push(`<div class="kpsec"><h4 class="kpst">${h}</h4>${kitFacts(L,{group:false})}</div>`);
 if(!G.length&&!me.length)secs.push(`<div class="kpsec">${kitFacts([{text:"Một tuần yên ả.",kind:"world",auto:false}])}</div>`);
 w.innerHTML=`<div class="dsky"><i class="lan l1"></i><i class="lan l2"></i><i class="lan l3"></i><i class="sun"></i></div><div class="dbox kpanel kpdawn">${kpHeader("week",kitDate(S.month,S.year,S.tuan),`${SEASON[S.month-1]}${S.wx?" · "+S.wx.n:""}`)}<div class="kpb"><div class="kpmain">${secs.join("")}</div></div><div class="kpfoot"><button class="kbtn" id="dawn-go">Vào ngày mới</button></div></div>`;
 w.hidden=false;w.classList.toggle("rm",reducedMotion());void w.offsetWidth;w.classList.add("on");setTimeout(bell,reducedMotion()?0:kitPace(1400));
 const close=()=>{w.classList.remove("on");setTimeout(()=>{w.hidden=true},reducedMotion()?0:350);w.onclick=null};w.onclick=e=>{if(e.target.closest("#dawn-go"))close()};/* KIT 81 (owner OD:L1261): only the button closes the week-change scene */const b=$("dawn-go");if(b)b.focus({preventScroll:true})}})();
(function(){const st=document.createElement("style");st.id="kp-dawn-css";st.textContent=`
.dawn .dbox.kpanel{position:relative;z-index:1;width:var(--kpw);max-width:var(--kpw);height:var(--kph);max-height:var(--kph);overflow:auto;background:var(--k-card);border:1px solid var(--gold);border-radius:10px;box-shadow:0 0 0 3px #f6ead6,0 0 0 4px #c9a46a,0 14px 40px #000a;padding:0;text-align:left;color:var(--ink)}
.dawn .dbox.kpanel .kph{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 14px 9px;background:linear-gradient(#f6ead6e6,#fffaf0f0),url(img/kit/bg-default.webp) center/240px repeat;border-bottom:1px solid var(--line)}
.dawn .dbox.kpanel .kpseal{background:#a8781c;border-color:#6e4d0e}
.dawn .dbox.kpanel{display:flex;flex-direction:column;overflow:hidden}.dawn .dbox.kpanel>.kph{position:relative;flex:0 0 auto}.dawn .dbox.kpanel>.kpb{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain}.dawn .dbox.kpanel>.kpfoot{flex:0 0 auto}
.dawn .dbox.kpanel .kpb{padding:10px 14px 4px}.dawn .kpfoot{display:flex;justify-content:flex-end;padding:6px 14px 12px}
/* kv3:.kv1 */:where(.kv1) .dawn .dbox.kpanel .kph{padding:8px 10px}:where(.kv1) .dawn .dbox.kpanel .kpb{padding:8px 10px 2px}:where(.kv1) .dawn .kpfoot{padding:6px 10px 10px}
`;document.head.appendChild(st)})();

/* ---------- MINI-GAME FRAME (for j82 and the lesson games): header + how-to + score/timer + game box + result rows ---------- */
KP_SEAL.game="TÀI NGHỆ";
/* kitGameFrame({art:"Cầm", title:"Tấu khúc", how:"Chạm đúng dây khi nốt chạm vạch đỏ.", hud:[["score","Điểm",0],["time","Thời gian","30 giây"]], id:"kgbox"})
   -> HTML of the frame; the game draws into #<id> (.kgbox). Update a HUD cell with kitGameSet("score", 12). */
function kitGameFrame(g){g=g||{};const fg=g.fig?kitGameFig(g):"";return `<div class="kgame">${kpHeader("game",`${g.art?g.art+": ":""}${g.title||""}`,"")}`+
 `<div class="kgbody${fg?" kgfig-on":g.pic?" kgpic-on":""}">`+(fg||(g.pic?`<div class="kgpic"><img src="${g.pic}" alt="" draggable="false" onerror="this.parentNode.parentNode.classList.remove('kgpic-on');this.parentNode.remove()"></div>`:""))+`<div class="kginfo">`+
 (g.how?`<div class="kghow"><span class="krl">Cách chơi</span><span>${g.how}</span></div>`:"")+
 (g.hud&&g.hud.length?`<div class="kghud">${g.hud.map(([k,l,v])=>`<span class="kgc"><small>${l}</small><b data-kg="${k}">${v==null?"":v}</b></span>`).join("")}</div>`:"")+
 `<div class="kgbox" id="${g.id||"kgbox"}"></div><div class="kgres" id="${(g.id||"kgbox")}-res" hidden></div></div></div></div>`}
/* KIT §N.1 kitGameFig (owner 16/11 ~21:30Z, mini-game layout): the LEFT column of every tài nghệ frame on a wide screen (html.kv2) = HER full figure in the
   outfit she wears NOW (kitStageFig: kit figure at the KIT_FIG ratio + the face layers, so makeup / scar / veil show live), the game's prop picture small in the
   corner (never a second big picture), a play animation while the game runs (.kg-idle off). html.kv1 (Fold portrait / one page): NO column, the game alone at full width.
   g.fig = true (her) | a person; g.pic = the prop picture. kitGameFigRefresh(p) redraws the figure in place after an outfit / makeup change. */
function kitGameFig(g){g=g||{};try{const p=g.fig&&g.fig!==true?g.fig:(typeof S!=="undefined"?S:null);if(!p||typeof kitStageFig!=="function")return"";const f=kitStageFig(p,{cap:false});if(!f)return"";
 const an=typeof OPT!=="undefined"&&OPT.fxon&&!(typeof RM!=="undefined"&&RM);
 return `<div class="kgfig${an?" kgf-anim":""}" data-kgf="${p===S?"me":"other"}">${f}${g.prop&&g.pic?`<img class="kgprop" src="${g.pic}" alt="" draggable="false" onerror="this.remove()">`:""}</div>`}catch(e){return""}}
function kitGameFigRefresh(p){try{const c=document.querySelector(".kgame .kgfig");if(!c||typeof kitStageFig!=="function")return;p=p||(c.dataset.kgf==="me"?S:null)||S;const f=kitStageFig(p,{cap:false});if(!f)return;
 const t=document.createElement("div");t.innerHTML=f;const n=t.firstElementChild,o=c.querySelector(".kesf");if(!n)return;if(o)o.replaceWith(n);else c.prepend(n)}catch(e){}}
window.kitGameFig=kitGameFig;window.kitGameFigRefresh=kitGameFigRefresh;
function kitGameSet(k,v){document.querySelectorAll(`[data-kg="${k}"]`).forEach(e=>e.innerHTML=v)}
/* kitGameResult({raw, talent, prep, total, place:"Nhất", of:4, rivals:[{who:person, score}], gains:[["Sủng",3]], losses:[["Sức",-10]], note})
   -> result block: score rows (true numbers), standings with face + rank title, Được / Mất chips. */
function kitGameResult(r){r=r||{};const rows=[];
 (r.parts||[]).forEach(([l,v])=>{const n=parseFloat(String(v).replace("−","-"));rows.push([l,isNaN(n)?`<span class="ef t">${v}</span>`:`<span class="ef ${n>0?"g":n<0?"r":"t"}"><b>${String(v)}</b></span>`])});
 if(r.raw!=null)rows.push(["Phần chơi",`<span class="ef t">${r.raw}</span>`]);if(r.talent!=null)rows.push(["Tài nghệ",kitChip("cộng",r.talent,"g")]);if(r.prep!=null)rows.push(["Chuẩn bị",kitChip("cộng",r.prep,"g")]);
 if(r.total!=null)rows.push(["Tổng",`<span class="ef t"><b>${r.total}</b></span>`]);if(r.place)rows.push(["Hạng",`<span class="ef t">${r.place}${r.of?` / ${r.of}`:""}</span>`]);
 const st=(r.rivals||[]).slice().sort((a,b)=>b.score-a.score);
 return `<div class="kgr">${kitRows(rows)}`+(st.length?`<h4 class="kpst">Bảng định thứ</h4><div class="kfacts kgrv">${st.map((x,i)=>`<div class="kfact${x.who===S?" kfme":""}">${kitFaceH(x.who,"sm")}<span class="kft kgrow"><span><b class="kgpl">${i+1}.</b> ${kitName(x.who,{cap:true})}${x.sub?`<small class="kfwhy">${x.sub}</small>`:""}</span><b>${x.score}</b></span></div>`).join("")}</div>`:"")+
 ((r.gains||[]).length||(r.losses||[]).length?`<h4 class="kpst">Kết quả</h4>`+kitRows([["Được",(r.gains||[]).map(x=>kitChip(x[0],x[1],"g"))],["Mất",(r.losses||[]).map(x=>kitChip(x[0],x[1],"r"))]]):"")+
 (r.extra||"")+(r.note?`<div class="kpnote">${r.note}</div>`:"")+`</div>`}
(function(){const st=document.createElement("style");st.id="kgfig-css";st.textContent=`
.kgame .kgbody.kgfig-on{display:grid;grid-template-columns:minmax(150px,30%) minmax(0,1fr);grid-template-rows:minmax(0,1fr);gap:0;overflow:hidden}
.kgfig{position:relative;margin:10px 0 10px 14px;min-height:240px;border:1px solid var(--line);border-radius:var(--k-rad);overflow:hidden;background:linear-gradient(#f8efdc,#ecdcbc);box-shadow:0 0 0 2px #fffaf0 inset}
.kgfig>.kesf{position:absolute;inset:8px 6px 0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0;flex:none}
.kgfig .kesfi{position:relative;display:flex;height:calc(100%*var(--kfr,1));max-width:100%;justify-content:center}
.kgfig .kesfi>.kesimg{display:block;height:100%;width:auto;max-width:100%;max-height:none;object-fit:contain;object-position:50% 100%}
.kgfig .kesfi>.kesfx{position:absolute;inset:0;pointer-events:none}
.kgprop{position:absolute;right:6px;bottom:6px;width:32%;max-width:92px;aspect-ratio:1;object-fit:cover;border-radius:8px;border:1px solid var(--line);box-shadow:0 0 0 2px #fffaf0 inset,0 2px 6px #3a20104d;background:#f1e6d2}
.kgf-anim .kesfi{transform-origin:50% 100%}
.kgame:not(.kg-idle) .kgf-anim .kesfi{animation:kgfBreath 3.2s ease-in-out infinite}
.kgame:not(.kg-idle) .kgf-anim .kgprop{animation:kgfProp 1.6s ease-in-out infinite}
@keyframes kgfBreath{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-1.2%) rotate(.5deg)}}
@keyframes kgfProp{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
/* kv3:.kv1 */:where(.kv1) .kgame .kgbody.kgfig-on{display:block;overflow:visible}:where(.kv1) .kgfig{display:none}
`;document.head.appendChild(st)})();
/* the lesson overlay (#ov .mg) wears the same frame */
(function(){if(typeof openMG!=="function")return;const o0=openMG;openMG=function(k,lv,cb){const r=o0.apply(this,arguments);try{const mg=document.querySelector("#ov .mg");mg.classList.add("kpanel","kgame");
  let h=mg.querySelector(":scope > .kph");if(h)h.remove();const t=$("mgt").textContent;const [art,ti]=t.split(":");mg.insertAdjacentHTML("afterbegin",kpHeader("game",t,""));$("mgt").hidden=true;
  const sub=$("mgh");sub.classList.add("kghow");sub.innerHTML=`<span class="krl">Cách chơi</span><span>${sub.textContent}</span>`;
  const sk=$("mgskip");if(sk)sk.classList.add("kbtn","alt")}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kp-game-css";st.textContent=`
.kgame .kghow{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:8px;align-items:baseline;font-size:.84rem;color:var(--ink);padding:8px 14px 0;margin:0}
.kgame .kghow .krl{font-size:.64rem;font-weight:700;color:var(--k-lab);text-transform:uppercase}
.kghud{display:flex;gap:6px;padding:6px 14px 0;flex-wrap:wrap}.kgc{flex:1 1 0;min-width:80px;display:flex;flex-direction:column;align-items:center;border:1px solid var(--k-hair);border-radius:var(--k-rad);background:#fffdf8;padding:3px 6px}
.kgc small{font-size:.66rem;color:var(--k-lab);text-transform:uppercase;font-weight:700}.kgc b{font-family:var(--display);font-size:1.05rem;color:var(--ink)}
.kgbox{margin:8px 14px;min-height:120px}.kgres{padding:0 14px 10px}
.kgrow{display:flex;justify-content:space-between;gap:8px;align-items:center}.kgrow>b{flex:none;white-space:nowrap}.kgr .kpkb .krl{white-space:normal;max-width:9rem}
.kgbox .btn,.kgbtn{font-family:inherit;font-weight:600;background:var(--k-card);color:var(--ink);border:1px solid var(--line);border-radius:var(--k-rad);min-height:40px;padding:6px 12px;cursor:pointer}.kgbox .btn:hover,.kgbtn:hover{border-color:var(--gold)}.kgbtn.on,.kgbox .btn.on{background:#f0d07055;border-color:var(--gold)}.kgpl{color:var(--k-lab)}
#ov .mg.kpanel{padding:0;max-width:560px;background:var(--k-card);box-shadow:0 0 0 3px #f6ead6,0 0 0 4px #c9a46a,0 14px 40px #2a1a1260}
#ov .mg.kpanel .kph{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 14px 9px;background:linear-gradient(#f6ead6e6,#fffaf0f0),url(img/kit/bg-default.webp) center/240px repeat;border-bottom:1px solid var(--line)}
#ov .mg.kpanel .kpseal{background:#5a4a7a;border-color:#3a2e52}
#ov .mg.kpanel #mgb{padding:8px 14px}#ov .mg.kpanel>div:last-child{padding:0 14px 12px}
.kpseal.kp-game{background:#5a4a7a;border-color:#3a2e52}
/* kv3:.kv1 */:where(.kv1) .kgame .kghow,:where(.kv1) .kghud{padding-left:10px;padding-right:10px}:where(.kv1) .kgbox{margin:8px 10px}
`;document.head.appendChild(st)})();

/* a "; " inside a price line joins two different values (a gain and a risk): split them so each lands in its own row and colour */
(function(){if(typeof kitParse!=="function")return;const k0=kitParse;kitParse=function(str){let s=String(str==null?"":str);if(!/class="kb/.test(s))s=s.split(/(<[^>]+>)/).map(x=>x&&x[0]==="<"?x:x.replace(/;\s+/g," · ")).join("");return k0.call(this,s)}})();
/* words that read as a gain / a risk for her even without a number */
(function(){if(typeof kcls!=="function")return;const k0=kcls;kcls=function(t){const s=String(t==null?"":t).replace(/<[^>]+>/g,"").trim();
 if(/(có thể |dễ )?(bị )?(lật tẩy|phát giác|bị lộ|bị bắt|bị phạt|bị nghi)/i.test(s)&&!/\+\s?\d/.test(s))return"r";if(/^(dễ được|được (thăm|ban|thưởng|sủng|để ý|gặp|mời))/i.test(s))return"g";return k0.apply(this,arguments)}})();

/* ---------- SCENE PANEL (identity card, opening story, title screen): compact, translucent, to one side (landscape) or the lower part (portrait),
   fits ONE screen with no scrolling, background art stays visible, each fact once, buttons always visible ---------- */
/* kitTiles: a grid of kit stat cells, tile size (kitStatCell, jk4 KIT 32) */
function kitTiles(list){return `<div class="kstgrid">${list.map(([l,v,c])=>kitStatCell(null,kitGloss(l),v,{cls:"kst-tile",vcls:c,nobar:true})).join("")}</div>`}
/* review/newgame-ui: the opening "Nhập cung" card that names its stage (j2: stage + headArt) is an EVENT panel (KIT 32.2 frame), not a scene panel */
function kpIsScene(m){return !!(m&&(m.nl||/\bnlcard\b/.test(m.cls||"")||(/^Nhập cung/.test(String(m.t||""))&&!m.stage)||(m.kit&&m.kit.scene)))}
function kpIdentity(M,m){const dlg=M.querySelector(".dlg"),mb=$("mb");const o=S.origin,srv=typeof isSrv==="function"&&isSrv();
 const pos=srv||o.k==="cnv"?"Cung nữ":RANKS[S.rank].n;const pts=typeof pdGet==="function"?pdGet():0;
 const opts=mb.querySelector(".nlopts");if(opts)opts.remove();
 const name=`<b class="kname kmy" style="--rc:${srv?kitServCol("maid",1):RCOL[cl(S.rank||0,0,7)]}"><span class="kti" style="--rt:${kitRtOf(pos)}">${pos}</span> ${S.name}</b>`;
 const tiles=[["Tài",S.tai],["Sắc",S.sac],["Tâm cơ",S.tamco],["Đức",S.duc],["Danh",S.danh],["Thái hậu ưa",S.th],["Bạc",S.bac],["Hoàng thượng",`${S.emp.era} · ${S.emp.age} tuổi`]];
 mb.innerHTML=`<div class="kpb kphas kpid"><div class="kpsubj">${pframe(pMe())}</div><div class="kpmain"><div class="kpidn">${name}<small>${o.n} · ${S.age} tuổi</small></div><div class="kpidt">${o.t||""}</div></div></div>${kitTiles(tiles)}<div class="kpnote">Thân phận đã định: nạp lại sổ, đổi sổ hay bắt đầu kiếp mới vẫn ra đúng thân phận này.</div>`;
 if(opts){opts.classList.add("kpopts","kpscopts");mb.appendChild(opts)}
 dlg.querySelector(":scope > .kph").outerHTML=kpHeader("end","Thân phận kiếp này",`${kitGloss("Phúc duyên")} đang có: ${pts}`)}
KIT_GLOSS["Phúc duyên"]="Điểm tích qua các kiếp. Dùng để đổi thân phận khi bắt đầu kiếp mới.";
(function(){const b0=kpBuild;kpBuild=function(M,m){b0.apply(this,arguments);try{const sc=kpIsScene(m);M.classList.toggle("kpscene",sc);if(!sc)return;
 M.querySelector(".dlg").classList.add("kpsc");if(m.nl&&typeof S!=="undefined"&&S&&S.origin)kpIdentity(M,m)}catch(e){console.error("kpScene",e)}}})();
(function(){const st=document.createElement("style");st.id="kp-scene-css";st.textContent=`
.modal.kpscene{align-items:flex-end;justify-content:center;padding:8px}
/* kv3:.kv2 */:where(.kv2) .modal.kpscene{align-items:center;justify-content:flex-end;padding:12px 16px}
.modal.kpscene .dlg.kpsc{max-width:min(560px,100%);width:100%;max-height:calc(100dvh - 16px);background:rgba(255,250,240,.90);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);animation:none}
/* kv3:.kv2 */:where(.kv2) .modal.kpscene .dlg.kpsc{max-width:min(440px,44vw)}
.modal.kpscene .dlg.kpsc .kph{background:linear-gradient(#f6ead6d8,#fffaf0d8);padding:7px 12px}
.modal.kpscene .dlg.kpsc #mb{padding:8px 12px 2px}
.dlg.kpsc .kpb.kphas{grid-template-columns:clamp(72px,22%,104px) minmax(0,1fr);gap:10px}
.dlg.kpsc .kpmain{gap:4px}.dlg.kpsc .kft{font-size:.82rem}.dlg.kpsc .kfact{padding:3px 0}
.kpidn{display:flex;flex-direction:column;font-size:1rem}.kpidn small{color:var(--dim);font-size:.78rem}.kpidt{font-size:.82rem;color:var(--ink);line-height:1.35}
.kstgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin:8px 0 6px}
.kst-tile{display:flex;flex-direction:column;align-items:flex-start;padding:3px 7px;border:1px solid var(--k-hair);border-radius:6px;background:#fffdf8d0;min-width:0}
.kst-tile>.kstl{font-size:.62rem;font-weight:700;color:var(--k-lab);text-transform:uppercase;letter-spacing:.02em}.kst-tile>.kstv{font-size:.86rem;color:var(--ink);overflow-wrap:anywhere;line-height:1.2}
.kst-tile:last-child:nth-child(4n+1),.kst-tile:nth-child(8){grid-column:span 1}
.dlg.kpsc .kpnote{font-size:.72rem;margin:0 0 4px}
.dlg.kpsc .kpscopts{display:grid!important;grid-template-columns:1fr 1fr!important;grid-auto-rows:1fr;gap:6px;margin:4px 0 8px}
.dlg.kpsc .kpfaces{display:flex;gap:6px;justify-content:flex-start}.dlg.kpsc .kpfaces figure{flex:0 1 92px;margin:0;max-width:92px}/* kv3:.kv1 */:where(.kv1) .dlg.kpsc .kpfaces figure{max-width:66px}.dlg.kpsc .kpfaces figcaption{font-size:.7rem;text-align:center}
.dlg.kpsc .kpfaces figcaption small{display:block;color:var(--dim)}
/* kv3:.kv1 */:where(.kv1) .kstgrid{grid-template-columns:repeat(4,minmax(0,1fr))}:where(.kv1) .kst-tile{padding:2px 5px}:where(.kv1) .kst-tile>.kstv{font-size:.8rem}:where(.kv1) .dlg.kpsc .kpb.kphas{grid-template-columns:70px minmax(0,1fr)}
`;document.head.appendChild(st)})();
(function(){const st=document.createElement("style");st.id="kp-title-css";st.textContent=`
.title{align-items:flex-end!important;justify-content:center!important;padding:10px!important}
/* kv3:.kv2 */:where(.kv2) .title{align-items:center!important;justify-content:flex-end!important;padding:16px 4vw!important}
/* kv3:unwrap */.title .tbox{padding:12px 14px!important}.title .tbox img{width:56px!important;height:56px!important;border-radius:12px!important}.title .tbox h1{font-size:1.4rem!important;margin:4px 0 0!important}.title .tbox .sub{font-size:.76rem!important;margin:0 0 6px!important}.title .slot{padding:5px 8px!important;margin:0 0 5px!important;gap:3px!important}.title .slot .main,.title .slot .btn{min-height:36px!important;padding:5px 10px!important}.title .past{font-size:.74rem!important}
.title .tbox{max-width:min(440px,100%)!important;width:100%;max-height:calc(100dvh - 20px);overflow:auto;border:1px solid var(--gold)!important;border-radius:10px!important;box-shadow:0 0 0 3px #f6ead6cc,0 0 0 4px #c9a46a,0 10px 40px rgba(60,25,10,.35)!important;background:rgba(255,250,240,.90)!important}
`;document.head.appendChild(st)})();
/* "có thể chết" on scheme buttons -> the real death chance on the ONE ladder (same formulas as ACT.poison / kpoison / pond, j8) */
function kpDeathWord(p,who){return p<=0?`${who} không chết (có thuốc giải)`:`${who} chết: ${chanceW(Math.max(1,Math.round(p*100)))}`}
function kpDeathP(k,v){try{const inv=x=>(x.inv||[]).some(e=>e.k===x.__k&&!e.h);const has=(p,key)=>(p.inv||[]).some(e=>e.k===key&&!e.h);
 if(k==="poison"){if(has(v,"giaidoc"))return 0;if(has(S,"hacdinh"))return v.suc<=120?1:0;let n=0;for(let i=0;i<30;i++)if(35+i>=v.suc)n++;return n/30}
 if(k==="kpoison"){const kid=tKid(v);if(!kid)return null;let n=0;for(let i=0;i<40;i++){const d=50+i;if((v.doctor?Math.round(d/2):d)>=kid.hp)n++}return n/40}
 if(k==="pond")return .45}catch(e){}return null}
(function(){if(typeof rvGroups!=="function")return;const g0=rvGroups;rvGroups=function(v){const G=g0.apply(this,arguments);try{for(const g of G)g[1]=g[1].map(h=>{const m=String(h).match(/data-a="(\w+)"/);if(!m)return h;const p=kpDeathP(m[1],v);if(p==null)return h;
  return String(h).replace(/,\s*có thể chết( đuối)?/g,(x,d)=>` · ${kpDeathWord(p,m[1]==="poison"?"nàng":"con nàng")}`)})}catch(e){}return G}})();
/* Cần: the Sức rule follows the live game rule (j80 SUC_FLOOR; one source, never a hard-coded 20) */
if(typeof kaTimeNeeds==="function"){kaTimeNeeds=function(c,bacCost,sucCost){const L=[];const left=BAL.time.khac-used;L.push(j76need(c,window.__cbCard));
 const fl=BAL.time.sucMin;if(c>1)L.push({t:`Sức ≥${fl} (có ${S.suc})`,ok:S.suc>=fl});if(bacCost>0)L.push({t:`Bạc ${bacCost} (có ${S.bac})`,ok:S.bac>=bacCost});return L}}
/* "có thể gặp người" (Lĩnh đồ, j42 srvMeet: 25 % bị bắt nạt Sức -5, else quen một người mới if anyone is left) -> real ladder words */
(function(){if(typeof srvCards!=="function")return;const c0=srvCards;srvCards=function(){const D=c0.apply(this,arguments);try{for(const a of D||[]){if(!a||!/có thể gặp người/.test(a.x||""))continue;
 let left=0;try{const m=srvM();left=allServ().filter(s=>ownerOf(s)!==m&&!S.srv.met.includes(s.sid)).length}catch(e){}
 a.x=a.x.replace(/có thể gặp người/,left?`quen một người mới: ${chanceW(75)}`:"không còn ai mới để quen")+` · kèm: bị bắt nạt, Sức -5: ${chanceW(25)}`}}catch(e){}return D}})();

/* ---------- ACT ART SLOT (kit 6.1): square illustration left of every act card, rows right ----------
   Manifest img/ACTS.json {acts:{"<card title>|<slug>":"<key>"}, have:["act-cat-hoc-tap", ...]} -> img/act-<key>.webp;
   no specific picture -> img/act-cat-<category>.webp; no file yet -> the neutral brocade tile with the category word. */
const KIT_ACT_CATS=[["hai-nguoi",/hạ độc|đẩy|vu |vu oan|trù ẻo|ngáng|hại|bỏ xạ|xạ hương|cài đồ|tráo|phá |chặn ngự giá|tố |bóc chuyện|ly gián|rút thẻ|mua chuộc/i],
 ["muu-ke",/dò la|mưu|tai mắt|tung tin|giấu|hối lộ|đút lót|lẻn|nghe lén|theo dõi|kế /i],["hoc-tap",/học|luyện|đọc|thêu|đàn|thơ|vẽ|họa|múa|cờ|sách|chữ/i],
 ["hau-ha",/hầu|dâng|chăm|phục dịch|quét|lau|lĩnh đồ|theo hầu|việc chủ|canh|nấu|pha trà/i],["nghi-ngoi",/nghỉ|ngủ|tắm|dưỡng|chải chuốt|giả bệnh|tĩnh dưỡng/i],
 ["buon-ban",/bán|mua|buôn|chợ|đổi|bạc/i],["le-nghi",/vấn an|thỉnh an|lễ|cầu|chùa|phật|xin xăm|cúng|bái/i],["giao-thiep",/thăm|tặng|kết|trò chuyện|mời|gặp|tâm sự|làm thân|nói/i],["di-lai",/đi |dạo|sang|ra |vào |đến /i]];
let KIT_ACTS={acts:{},have:[]};try{fetch("img/ACTS.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j){KIT_ACTS=j;try{document.querySelectorAll("button.ka.kcard[data-kart]").forEach(b=>{b.removeAttribute("data-kart");kpActArt(b)})}catch(e){}}}).catch(()=>{})}catch(e){}
/* memoised (pure; hot in act-card lookups) */
const KPSLUG_C=new Map();const kpSlug=s=>{const k=String(s||"");let v=KPSLUG_C.get(k);if(v===undefined){v=kpSlug0(k);if(KPSLUG_C.size>8000)KPSLUG_C.clear();KPSLUG_C.set(k,v)}return v};
const kpSlug0=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function kitActCat(name){for(const [c,re] of KIT_ACT_CATS)if(re.test(name))return c;return"giao-thiep"}
function kitActArt(name){const A=KIT_ACTS.acts||{};const key=A[name]||A[kpSlug(name)];const cat=kitActCat(name);const have=KIT_ACTS.have||[];
 return{src:key?`img/act-${key}.webp`:have.includes("act-cat-"+cat)?`img/act-cat-${cat}.webp`:"",cat,label:(KIT_ACTS.cats||{})[cat]||{"hau-ha":"Hầu hạ","hoc-tap":"Học tập","giao-thiep":"Giao thiệp","muu-ke":"Mưu kế","hai-nguoi":"Hại người","nghi-ngoi":"Nghỉ ngơi","buon-ban":"Buôn bán","le-nghi":"Lễ nghi","di-lai":"Đi lại"}[cat]}}
function kpActArt(b){if(b.dataset.kart)return;const kan=b.querySelector(":scope > .kat > .kan");if(!kan)return;const name=kpPlain(kan.textContent);const a=kitActArt(name);b.dataset.kart=a.cat;
 let body=b.querySelector(":scope > .kabody");if(!body){body=document.createElement("span");body.className="kabody";[...b.childNodes].forEach(n=>{if(!(n.nodeType===1&&n.classList.contains("kaart")))body.appendChild(n)});b.appendChild(body)}
 let art=b.querySelector(":scope > .kaart");if(!art){art=document.createElement("span");art.className="kaart";b.prepend(art)}
 art.innerHTML=`<span class="kaph">${a.label}</span>`+(a.src?`<img src="${a.src}" alt="" loading="lazy" onerror="this.remove()">`:"");b.classList.add("kart")}
(function(){if(typeof kaNorm1!=="function")return;const n0=kaNorm1;kaNorm1=function(b){n0.apply(this,arguments);try{if(b.classList.contains("ka")&&b.classList.contains("kcard"))kpActArt(b)}catch(e){}}})();
(function(){const st=document.createElement("style");st.id="kp-art-css";st.textContent=`
:root{--kas:88px}/* kv:(max-width:1199px) */:root{--kas:76px}/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
button.ka.kcard.kart{flex-direction:row!important;align-items:flex-start;gap:9px}
button.ka.kcard.kart>.kabody{display:flex;flex-direction:column;gap:3px;flex:1 1 auto;min-width:0}
.kaart{position:relative;flex:0 0 var(--kas);width:var(--kas);height:var(--kas);border-radius:6px;overflow:hidden;background:url(img/kit/bg-default.webp) center/cover;box-shadow:0 0 0 1px #8a6a32,0 0 0 3px #e9d29a,0 0 0 4px #b08a4a,inset 0 0 12px #5a3a1a40;margin:4px}
.kaart img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.kaph{position:absolute;inset:0;display:grid;place-items:center;text-align:center;font-family:var(--display);font-size:.7rem;font-weight:700;color:#7a5a2a;padding:4px;line-height:1.15}
button.ka.kdis .kaart{filter:grayscale(.7);opacity:.8}
/* equal height per ROW, fitted to that row's content (no empty space from a tall card elsewhere) */
.cards:has(> button.ka),.pcb:has(> button.ka),.opts:has(> button.ka),.rbtn:has(> button.ka),.kpacts{grid-auto-rows:auto!important;align-items:stretch!important}
/* columns follow the space the grid really has (the panel is half the screen in landscape): at most 3, each at least 280px */
.cards:has(> button.ka){grid-template-columns:repeat(auto-fill,minmax(max(280px,31%),1fr))!important}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();

/* ================= STAGE OVERLAYS (owner 11/14): nothing on the stage covers a figure =================
   - the status chips (#hud2) leave the stage: they become a slim second row of the header; expanding it grows the header (the stage shrinks), never overlays
   - the date shows once, in the header line, in plain words ("Tháng 3 · Năm 1 · Thượng tuần · Buổi sáng"); the duplicate date chip is gone
   - the place title on the stage is the name only (the description line is dropped for every place); a visit message stays as a short line
   - "T3/1" anywhere in the UI (logs, news, intel, summaries, old saves) reads "Tháng 3 · Năm 1" */
const KP_MON=["giêng","hai","ba","tư","năm","sáu","bảy","tám","chín","mười","mười một","chạp"];
const KP_NUM=["nhất","hai","ba","tư","năm","sáu","bảy","tám","chín","mười"];
const kpYear=y=>`năm thứ ${y>=1&&y<=10?KP_NUM[y-1]:y}`;
/* dates in the wording guide (dev/kit/VANPHONG.md): full "Tháng ba, năm thứ nhất, thượng tuần, buổi chiều"; short "Tháng ba · thượng tuần · năm thứ nhất" */
function kitDate(m,y,t,b,full){if(window.VP&&typeof VP.date==="function"){try{return VP.date(m,y,t,b)}catch(e){}}const mo=`Tháng ${KP_MON[(m-1)%12]||m}`,tu=t!=null?TUAN[t]:null,bu=b!=null?String(BUOI[b]).toLowerCase():null;
 return full?[mo,kpYear(y),tu,bu].filter(Boolean).join(", "):[mo,tu,kpYear(y)].filter(Boolean).join(" · ")}
const KP_TDATE=/\bT(\d{1,2})\/(\d{1,3})\b(\s*·?\s*(thượng|trung|hạ) tuần)?/g;
function kpDateText(s){return s.replace(KP_TDATE,(m,mo,y,x,tu)=>`Tháng ${KP_MON[(+mo-1)%12]||mo}`+(tu?` · ${tu} tuần`:"")+` · ${kpYear(+y)}`)}
function kpDateFix(root){try{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const L=[];while((n=w.nextNode()))if(/\bT\d{1,2}\/\d/.test(n.nodeValue))L.push(n);L.forEach(n=>{n.nodeValue=kpDateText(n.nodeValue)})}catch(e){}}
(function(){let q=false;const mo=new MutationObserver(ms=>{if(q)return;q=true;queueMicrotask(()=>{q=false;for(const m of ms){m.addedNodes.forEach(x=>{if(x.nodeType===1)kpDateFix(x);else if(x.nodeType===3&&/\bT\d{1,2}\/\d/.test(x.nodeValue))x.nodeValue=kpDateText(x.nodeValue)});if(m.type==="characterData"&&/\bT\d{1,2}\/\d/.test(m.target.nodeValue))m.target.nodeValue=kpDateText(m.target.nodeValue)}})});
 mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true})})();
/* move the status chips into the header (once) */
function kpHudMove(){const h=$("hud2"),hd=document.querySelector("header.hud");if(h&&hd&&h.parentElement!==hd){hd.appendChild(h);h.classList.add("khud")}}
(function(){if(typeof renderHud2!=="function")return;const r0=renderHud2;renderHud2=function(){kpHudMove();return r0.apply(this,arguments)}})();
/* place title: the name only */
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const t=$("sc-t");const m=t&&t.querySelector(".rmsg");if(m){const vm=S&&S.visit&&S.visit.msg;if(!vm)m.remove()}}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kp-stage-css";st.textContent=`
header.hud{flex-wrap:wrap}
header.hud>.hud2.khud{order:9;flex:1 0 100%;position:static!important;max-width:none!important;width:auto!important;max-height:none!important;box-shadow:none!important;background:transparent!important;border:0!important;border-top:1px solid var(--k-hair)!important;border-radius:0!important;padding:3px 30px 0 0!important;margin:0;display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;gap:3px!important;overflow:visible!important;backdrop-filter:none!important}
header.hud>.hud2.khud .hc{white-space:nowrap!important;font-size:.68rem}
header.hud>.hud2.khud .hc[data-hx="date"]{display:none!important}
header.hud>.hud2.khud .h2t{top:3px;right:0}
.stop .scene-t{flex:0 1 auto!important;max-width:60%}
.stop .scene-t .rmsg{font-size:.7rem}
/* KIT 15.1 (review/small-bugs-3): the place subtitle ("· Ở đây còn 1 người.") never shrinks under its longest word (390x844 showed one letter per
   line); when the title row is too narrow it drops under the place name */
.stop .scene-t{flex-wrap:wrap}.stop .scene-t .rmsg{min-width:min-content;flex:1 1 auto}
/* no truncation anywhere: names, date line, stage tags wrap */
.me b,#me-d,.dt,.emp b,.pface span,.tok .tag,.stop .scene-t .rmsg{white-space:normal!important;overflow:visible!important;text-overflow:clip!important;-webkit-line-clamp:unset!important;display:block}
.tok .tag{max-width:140px}
`;document.head.appendChild(st)})();
/* the real condition text of every scheme whose ok() had no words (j63 Cần row reads LACK[k](v); "" = met) */
if(typeof LACK==="object"){const bac=n=>S.bac<n?`Bạc ${n} (có ${S.bac})`:"";const P=()=>{try{return(PLACES&&PLACES[whereOf(S)]||{}).n||whereOf(S)}catch(e){return whereOf(S)}};Object.assign(LACK,{
 spy:t=>bac(15),ally:t=>bac(30),bribe:t=>bac(40),lygian:t=>bac(20)||(rkOf(t)<1?"nàng từ Thường tại trở lên":""),slowpoison:t=>bac(40),
 accuse:t=>{const n=accNeed(t),h=evG(S,t);return h<n?`${n} chứng cứ về nàng (có ${h})`:rkOf(t)>=7&&rkOf(S)<3?"ngươi từ Tần trở lên mới tố được Hoàng hậu":""},
 ksab:t=>tKid(t)?"":"nàng có con từ 3 tuổi",kpoison:t=>tKid(t)?"":"nàng có con từ 3 tuổi",pond:t=>kidsOf(t).some(k=>k.age>=2)?"":"nàng có con từ 2 tuổi",
 kframe:t=>sonsOf(t).some(k=>k.age>=6)?"":"nàng có con trai từ 6 tuổi",
 takeaway:t=>rkOf(S)<=rkOf(t)?"phẩm ngươi cao hơn nàng":rkOf(t)>=4?"nàng dưới bậc Phi":!kidsOf(t).some(k=>k.age<6)?"nàng có con dưới 6 tuổi":"",
 steal:t=>tonightOf()===t?"":"tối nay nàng được lật thẻ",road:t=>tonightOf()===t?"":"tối nay nàng được lật thẻ",
 tocao:t=>!realCrime(t)?"nàng có tội thật (ngươi biết)":evG(S,t)<1?`1 chứng cứ về nàng (có ${evG(S,t)})`:"",
 expose:t=>!hasScandal(t)?"nàng có chuyện tư tình (ngươi biết)":evG(S,t)<2?`2 chứng cứ về nàng (có ${evG(S,t)})`:"",
 xinhh:t=>{const q=queenP();return bac(30)||(!q||q===S?"có Hoàng hậu (không phải ngươi)":q===t?"nàng không phải Hoàng hậu":aff(q,S)<40?`Hoàng hậu quý ngươi ≥40 (có ${aff(q,S)})`:rkOf(t)<1?"nàng từ Thường tại trở lên":"")},
 pushp:t=>whereOf(S)!=="vuon"?"ngươi đang ở Ngự hoa viên":!together(S,t)?"nàng ở cùng chỗ với ngươi":"",trip:t=>together(S,t)?"":"nàng ở cùng chỗ với ngươi"})}

/* ================= wiring j78 (intel + evidence data) to the kit ================= */
if(typeof j78when==="function"){j78when=function(){return kitDate(S.month,S.year,S.tuan)}}
function kitEvidencePanel(v){if(!v||typeof evidenceOf!=="function")return;const E=evidenceOf(v);if(!E)return;
 const items=E.items.length?E.items.map(e=>kitEvidence({what:e.proves,how:e.how,when:e.when})).join(""):`<div class="kpnote">Ngươi chưa giữ chứng cứ nào về nàng.</div>`;
 const acts=(E.acts||[]).map(a=>`<button class="opt" data-kev="${v.id}" data-kevact="${a.k}"${a.why?" disabled":""}>${a.n||(ACT[a.k]?ACT[a.k].n:a.k)}<small>${a.why?`<span class="kwhy">${a.why}</span> `:""}${kitParse(a.line||"")}</small></button>`).join("");
 const m=kitPanel({kind:"evidence",look:1,title:`Chứng cứ về ${kpPlain(kitName(v))}`,sub:`Đang giữ: ${E.count}`,subject:v,sections:[{h:`Chứng cứ đang giữ (${E.count})`,html:`<div class="kevs">${items}</div>`},E.rumours?{h:`Tin đồn (${E.rumours})`,html:`<div class="kevs">${kitEvidence({what:`${E.rumours} tin đồn chưa ai chứng thực`,proves:"Không có việc thật nào đứng sau: không dùng để tố được",how:"Nghe từ trước khi sổ chứng cứ đối chiếu việc thật"})}</div>`}:null,acts?{h:"Dùng chứng cứ",html:`<div class="opts">${acts}</div>`}:null]},true);m.evd=1;showModal()}
function kitIntelPanel(v){if(!v)return;const L=typeof intelOf==="function"?intelOf(v):[];const old=(S.notes&&S.notes[v.id])||[];
 const list=L.map(x=>({about:null,fact:x.fact+(x.current===false?` <span class="kchip n">nay đã khác</span>`:""),src:x.by?(typeof x.by==="object"?x.by:String(x.by)):"tai mắt",week:[x.how,x.when].filter(Boolean).join(" · ")}));
 old.forEach(t=>{if(!L.some(x=>kpPlain(x.fact).includes(kpPlain(t))))list.push({fact:t,src:"nghe được",week:""})});
 const m=kitPanel({kind:"intel",look:1,title:`Đã biết về ${kpPlain(kitName(v))}`,sub:`${list.length} tin`,subject:v,sections:[{html:kitIntel(list,{empty:"Ngươi chưa biết gì thêm về nàng. Dò la để biết."})}]},true);showModal()}
/* person card: the evidence chip and the "Đã biết" line open the kit panels */
(function(){if(typeof rvCard!=="function")return;const r0=rvCard;rvCard=function(v,i){let h=r0.apply(this,arguments);try{
  h=h.replace(/<span class="chip hot">((?:<img[^>]*>)?Chứng cứ \d+)<\/span>/,`<button class="chip hot kchipb" data-kev="${v.id}" title="Xem chứng cứ">$1 ›</button>`);
  h=h.replace(/<span class="past">Đã biết: [\s\S]*?<\/span>/,"");
  const n=(typeof intelOf==="function"?intelOf(v).length:0)||((S.notes&&S.notes[v.id])||[]).length;
  if(n)h=h.replace('<div class="pcinfo">',`<div class="pcinfo"><button class="chip kchipb" data-kintel="${v.id}">Đã biết: ${n} tin ›</button>`)}catch(e){}return h}})();
document.addEventListener("click",e=>{const a=e.target.closest("[data-kevact]");if(a){e.stopPropagation();if(a.disabled)return;evidenceDo(+a.dataset.kev||a.dataset.kev,a.dataset.kevact);return}
 const c=e.target.closest(".kchipb[data-kev]");if(c){e.stopPropagation();const v=RV(+c.dataset.kev||c.dataset.kev);if(v){if(Q.length&&/pcm/.test(Q[0].cls||""))Q.shift();kitEvidencePanel(v)}return}
 const t=e.target.closest(".kchipb[data-kintel]");if(t){e.stopPropagation();const v=RV(+t.dataset.kintel||t.dataset.kintel);if(v){if(Q.length&&/pcm/.test(Q[0].cls||""))Q.shift();kitIntelPanel(v)}}},true);
(function(){const st=document.createElement("style");st.id="kp-ev-css";st.textContent=`.kchipb{cursor:pointer;font-family:inherit;background:#fff;font-size:.75rem}.kchipb:hover{border-color:var(--gold)}.kevs{display:flex;flex-direction:column;gap:6px}`;document.head.appendChild(st)})();

/* when(): the full date in the wording guide's words, season kept */
if(typeof when==="function"){when=function(){return `${kitDate(S.month,S.year,S.tuan,null,true)} (${SEASON[S.month-1]})`}}
(function(){const st=document.createElement("style");st.id="kp-kat-css";st.textContent=`button.ka .kat{flex-wrap:wrap}button.ka .kat>.kan{min-width:min(9em,100%)}button.ka .kat>.kodds{margin-left:auto}`;document.head.appendChild(st)})();
/* Tranh sủng / Chặn ngự giá: no ranges, no "có thể" — the night's floor (nightFx: Sủng +3, Ân tình +2 at least) and the reward chance on the ladder (roll 10+4s, s≤3) */
if(typeof stealX==="function"){stealX=function(v,road){let c=0;try{c=conceiveCh(S)}catch(e){}const NG=nightGain(0),BN=BAL.night;return `thị tẩm đêm nay: Sủng +${NG.sung}, Ân tình +${NG.an} trở lên${S.preg?"":` · có thai: ${chanceW(c)}`} · ban thưởng: ${chanceW(BN.bestow+BN.bestowS*BN.stealS)} · kèm: ${stealKem(v)}`}}
/* wording guide fixes in merged copies */
(function(){const fix=root=>{try{root.querySelectorAll&&root.querySelectorAll(".kalog").forEach(e=>{if(/Nhật ký/.test(e.textContent))e.textContent="Xem đầy đủ trong Sổ ghi"})}catch(e){}};new MutationObserver(ms=>{for(const m of ms)m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.classList&&n.classList.contains("kalog"))fix(n.parentNode);else fix(n)}})}).observe(document.documentElement,{childList:true,subtree:true})})();
/* Tài nghệ rows "Bậc 3: Mở «…»": wrap, never cut */
(function(){const st=document.createElement("style");st.id="kp-art-wrap";st.textContent=`.art .pcb button,.art .ams,.art .ams span,.art .lv,.art .pcrow span,.art .pcrow b{white-space:normal!important;overflow:visible!important;text-overflow:clip!important;-webkit-line-clamp:unset!important}`;document.head.appendChild(st)})();

/* =====================================================================================================================
   KIT 2 (kit owner #2, owner feedback 11/14 on the Fold 755x1000@2):
   1. ONE frame: act art and info-panel art sit in the SAME rectangular portrait frame and size as the consort card (pcPort .pcp.kit).
   2. Info / rule / help panels: a representative image (img/info-<key>.webp, manifest img/INFO.json {have:[keys]}; fallback act-category art,
      then brocade + topic word) in that frame beside the structured body.
   3. Identity card: one well-composed larger panel (portrait large, tiles beside it, choices under), no scroll, background visible.
   4. Status: grouped by purpose into columns (Tư chất · Nhân tâm · Ân sủng · Thời gian); while collapsed, a Tư chất block sits on the stage
      top-left only when it covers no figure (measured every render).
   5. No round avatars: mdH draws the small rectangular kit frame (the consort frame cropped to its body) everywhere.
   ===================================================================================================================== */
/* ---- 5. small rectangular frame for every mdH avatar ---- */
(function(){if(typeof mdH!=="function"||typeof kitDecor!=="function")return;const m0=mdH;mdH=function(p,cls){let h=m0.apply(this,arguments);try{p=p||{};const d=kitDecor(p);
 h=h.replace('class="md',`class="md kmini`).replace(/style="/,`style="--kfr:url(${d.frame});`);
 const i=h.indexOf(">");return h.slice(0,i+1)+`<i class="kmb" aria-hidden="true"></i>`+h.slice(i+1).replace(/<\/span>\s*$/,`<i class="kmf" aria-hidden="true"></i></span>`)}catch(e){return h}}})();
/* ---- 1. the ONE portrait frame for pictures that are not people (act art, info art): same markup/classes as pcPort, her rank frame ---- */
/* act categories: one colour each (tinted brocade + ring + ribbon with the category name); legend in KIT.md 6.1 */
const KIT_CAT={"giao-thiep":["Giao thiệp","#c4607a"],"hau-ha":["Hầu hạ","#3f8f8c"],"le-nghi":["Lễ nghi","#b8901c"],"hoc-tap":["Học tập · Tài nghệ","#3f62a8"],
 "ban-thuong":["Ban thưởng","#d98a1c"],"trung-phat":["Trừng phạt","#5a3a2a"],"muu-ke":["Mưu kế","#5a3f8f"],"hai-nguoi":["Hại người","#7a0f14"],"nghi-ngoi":["Nghỉ ngơi","#5f9a5f"],
 "buon-ban":["Buôn bán","#a8692a"],"di-lai":["Đi lại","#7d8456"],"cham-con":["Chăm con","#e08a6a"],"trieu-chinh":["Triều chính","#22405f"]};
try{KIT_ACT_CATS.splice(1,0,["trung-phat",/phạt|trách phạt|quở|đánh đòn|quỳ|tịch thu|giáng|cấm túc|đuổi|đổi người/i],["ban-thuong",/thưởng|ban cho|ban ơn|ân thưởng/i],
 ["cham-con",/(^|\s)con(\s|$)|hoàng tử|công chúa|bế |dạy dỗ|nuôi/i],["trieu-chinh",/triều|tấu|sớ|quan |nhà ngoại|tham ô|thế lực|phe/i])}catch(e){}
(function(){const k0=kitActArt;kitActArt=function(name){const r=k0.apply(this,arguments);if(KIT_CAT[r.cat])r.label=KIT_CAT[r.cat][0];r.col=(KIT_CAT[r.cat]||[])[1]||"";return r}})();
/* kitArtFrame = kitSceneArt (jk2b, KIT 31.10): ONE simple picture frame for every non-person picture, no tassel */
function kitArtFrame(src,label,cls,col){return kitSceneArt(src,label,{shape:"tall",cls:"kartf2"+(cls?" "+cls:""),col:col||"",cap:!!col})}
kpActArt=function(b){if(b.dataset.kart)return;const kan=b.querySelector(":scope > .kat > .kan");if(!kan)return;const name=kpPlain(kan.textContent);const a=kitActArt(name);b.dataset.kart=a.cat;
 let body=b.querySelector(":scope > .kabody");if(!body){body=document.createElement("span");body.className="kabody";[...b.childNodes].forEach(n=>{if(!(n.nodeType===1&&n.classList.contains("kaart")))body.appendChild(n)});b.appendChild(body)}
 let art=b.querySelector(":scope > .kaart");if(!art){art=document.createElement("span");art.className="kaart";b.prepend(art)}
 art.innerHTML=kitArtFrame(a.src,a.label,"kcat-"+a.cat,a.col);art.title=a.label;if(a.col)b.style.setProperty("--kcc0",a.col);b.classList.add("kart")};
/* act art lookup fix (owner 11/14: every act with its own picture shows it). The card title (.kan) can hold the target's mini portrait
   (its name text was glued to the act name: "Hoàng hậuThỉnh an Hoàng hậu") or run-time words after the act name ("Thỉnh an Hoàng hậu", "Phô tài: Đàn").
   Name = .kan text without portraits; key = exact, slug, ACTS.json "prefix", names with "*", then the longest act name the title starts with.
   Re-run after ACTS.json arrives: the title then sits inside .kabody (was missed, the card kept its first, pre-manifest picture).
   New category sung-ai "Tranh sủng" (Chặn ngự giá, Tranh sủng, lật thẻ…): winning the Emperor's night is not "Hại người". */
try{KIT_CAT["sung-ai"]=["Tranh sủng","#b03a7a"];KIT_ACT_CATS.unshift(["sung-ai",/chặn ngự giá|tranh sủng|lật thẻ|rút thẻ|giữ thẻ|liếc mắt đưa tình/i])}catch(e){}
/* review/placeholder-pics3 (LUẬT SỬA CẢ NHÓM): the Tài nghệ / Tứ đức buttons say only "Tự rèn" / "Tự học" — the course sits in the button's data-vlearn / data-learn.
   Without it "Tự rèn" resolved to the FIRST key of its prefix (Công's embroidery for Dung, Ngôn, Hạnh) and "Tự học" to the generic book for every art.
   The act name used for the picture now carries the course: "Tự rèn Dung", "Theo ma ma giáo tập học Ngôn", "Tự học Cầm" (the keys ACTS.json already has). */
function kpActCtx(kan,n){try{const b=kan.closest&&kan.closest("button[data-vlearn],button[data-learn]");if(!b)return n;const md=b.dataset.mode;
  if(b.dataset.vlearn&&typeof VIR!=="undefined"){const V=VIR.find(x=>x.k===b.dataset.vlearn);if(V){if(md==="self"&&(n==="Tự rèn"||n==="Tự học"))return"Tự rèn "+V.n;if(md==="master"&&(n==="Theo ma ma giáo tập"||n==="Học với ma ma"))return"Theo ma ma giáo tập học "+V.n}}
  if(b.dataset.learn&&typeof ARTS!=="undefined"){const a=ARTS.find(x=>x.k===b.dataset.learn);if(a&&md==="self"&&n==="Tự học")return"Tự học "+a.n}}catch(e){}
  /* merge-train-4: act-text-r1 renamed the labels (one word "Tự học", "Học với Thái hậu"); the pictures keep their ACTS.json keys */
  if(n==="Học với Thái hậu")return"Xin Thái hậu cho học cùng";if(n==="Tự học, làm tác phẩm")return"Tự luyện, làm tác phẩm";return n}
function kpActName(kan){const c=kan.cloneNode(true);c.querySelectorAll(".md,.kit,.pcp,.kodds,img,svg").forEach(e=>e.remove());return kpActCtx(kan,kpPlain(c.textContent))}
const kpReEsc=s=>s.replace(/[.+?^$|()[\]{}\\]/g,"\\$&");
/* lag-play (owner 16/11 15:05Z, lag = first priority): kitActKey is pure in (name, KIT_ACTS) but walked every act table entry
   (kpSlug of each) and was called for every act card on every DOM change (kaNorm MutationObserver + kpActArt wrappers): ~300 ms per
   buổi on a 4x-slow phone. Memoised per KIT_ACTS object (a new ACTS.json load starts a fresh cache). */
var KAK_SRC=null,KAK_C=new Map();
function kitActKey(name){if(KAK_SRC!==KIT_ACTS){KAK_SRC=KIT_ACTS;KAK_C=new Map()}const k=typeof name==="string"?name:String(name==null?"":name);let v=KAK_C.get(k);
 if(v===undefined){v=kitActKey0(name);if(KAK_C.size>5000)KAK_C.clear();KAK_C.set(k,v)}return v}
function kitActKey0(name){const A=KIT_ACTS.acts||{},P=KIT_ACTS.prefix||{};name=kpPlain(name);if(!name)return"";if(A[name])return A[name];const sl=kpSlug(name);if(A[sl])return A[sl];
 let best="",key="";const take=(n,k)=>{if(n.length>best.length){best=n;key=k}};
 for(const p in P)if(name.startsWith(p))take(p,P[p]);
 for(const n in A){if(n.includes("*")){if(new RegExp("^"+n.split("*").map(kpReEsc).join(".+")+"$").test(name))take(n,A[n])}
  else if(n!==kpSlug(n)&&(name.startsWith(n+" ")||name.startsWith(n+":")||name.startsWith(n+",")))take(n,A[n])}
 if(key)return key;
 if(name.length>=6)for(const n in A)if(!n.includes("*")&&n.startsWith(name+" "))return A[n];
 try{if(typeof kbkRules==="function")for(const [re,k] of kbkRules())if(re.test(name)||re.test(name+".")){if(k&&k!=="-"&&!k.includes(":"))return k;break}}catch(e){}
 return""}
(function(){const k0=kitActArt;kitActArt=function(name){const r=k0.apply(this,arguments);try{const key=kitActKey(name);if(key)r.src=`img/act-${key}.webp`}catch(e){}return r}})();
kpActArt=function(b){if(b.dataset.kart)return;const kan=b.querySelector(":scope > .kat > .kan, :scope > .kabody > .kat > .kan");if(!kan)return;const name=kpActName(kan);const a=kitActArt(name);b.dataset.kart=a.cat;
 let body=b.querySelector(":scope > .kabody");if(!body){body=document.createElement("span");body.className="kabody";[...b.childNodes].forEach(n=>{if(!(n.nodeType===1&&n.classList.contains("kaart")))body.appendChild(n)});b.appendChild(body)}
 let art=b.querySelector(":scope > .kaart");if(!art){art=document.createElement("span");art.className="kaart";b.prepend(art)}
 art.innerHTML=kitArtFrame(a.src,a.label,"kcat-"+a.cat,a.col);art.title=a.label;if(a.col)b.style.setProperty("--kcc0",a.col);b.classList.add("kart")};
/* ---- 2. info art: title -> key; manifest img/INFO.json {have:[...]} ---- */
const KIT_INFO=[["nguy-hiem",/nguy hiểm/i],["ra-vao",/ra vào/i],["que",/^qu[eẻ]|gieo quẻ/i],["bong-loc",/bổng lộc/i],["an-thuong",/ân thưởng|ban thưởng/i],
 ["sac",/^sắc\b/i],["tai",/^tài\b(?! nghệ)/i],["tam-co",/tâm cơ/i],["duc",/^đức\b/i],["tai-mat",/tai mắt/i],["thai-hau",/thái hậu/i],["hoang-hau",/hoàng hậu|mẫu nghi/i],
 ["long",/lòng|chủ tin/i],["an-tinh",/ân tình/i],["khac",/khắc|^(sáng|chiều|tối)\b|buổi/i],["lich",/tháng|tuần/i],["thai",/thai/i],["lat-the",/lật thẻ|kính sự phòng/i],
 ["lanh-cung",/lãnh cung/i],["cam-tuc",/cấm túc/i],["tranh-ghe",/tranh ghế/i],["tuyen-tu",/tuyển tú/i],["noi-vu",/nội vụ/i],["tan-gia-kho",/tân giả/i],["phe-phai",/phe/i],
 ["chung-cu",/chứng cứ/i],["suc",/^sức\b/i],["bac",/^bạc\b/i],["phuc-duyen",/phúc duyên|thân phận/i],["tin",/^tin |tin trong cung/i]];
const KIT_INFO_CAT={"nguy-hiem":"hai-nguoi","tai-mat":"muu-ke","chung-cu":"muu-ke","que":"le-nghi","an-thuong":"le-nghi","thai-hau":"le-nghi","hoang-hau":"le-nghi","sac":"nghi-ngoi","tai":"hoc-tap","tam-co":"muu-ke","duc":"le-nghi","bac":"buon-ban","bong-loc":"buon-ban","long":"hau-ha","an-tinh":"hau-ha","lat-the":"hau-ha","ra-vao":"di-lai"};
let KIT_INFOM={have:[]};try{fetch("img/INFO.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j)KIT_INFOM=j}).catch(()=>{})}catch(e){}
function kitInfoKey(title){const t=kpPlain(String(title||"")).trim();for(const [k,re] of KIT_INFO)if(re.test(t))return k;return""}
function kitInfoArt(title){const k=kitInfoKey(title);const have=KIT_INFOM.have||[];const cat=KIT_INFO_CAT[k]||kitActCat(kpPlain(String(title||"")));const ah=(KIT_ACTS.have||[]);
 const src=k&&have.includes(k)?`img/info-${k}.webp`:ah.includes("act-cat-"+cat)?`img/act-cat-${cat}.webp`:"";return{key:k,src,label:kpPlain(String(title||"")).replace(/\s*[·:].*$/,"")}}
(function(){const b0=kpBuild;kpBuild=function(M,m){b0.apply(this,arguments);try{const dlg=M.querySelector(".dlg");if(!dlg||!/^(rule|info)$/.test(dlg.dataset.kind||""))return;
 const body=M.querySelector("#mb > .kpb");if(!body||body.querySelector(":scope > .kpsubj"))return;const a=kitInfoArt(m.t);
 body.classList.add("kphas","kpinfo");body.insertAdjacentHTML("afterbegin",`<div class="kpsubj kpiart" data-info="${a.key}">${kitArtFrame(a.src,a.label)}</div>`)}catch(e){console.error("kpInfo",e)}}})();
/* the HUD help panels use the same structured layout as the rule panel: what it is · what you have now */
(function(){const s0=showModal;showModal=function(){try{const m=Q[0];if(m&&!m.kit&&!m.opts&&typeof m.h==="string"&&/^<p>[^<]*<\/p>$/.test(m.h)&&typeof HX==="object"){
  const txt=m.h.replace(/<\/?p>/g,"");const k=Object.keys(HX).find(x=>HX[x]===txt);if(k){const lab=kpPlain(m.t);const gl=txt.replace(/^[^:]{1,24}:\s*/,"");const cur=(m.t.match(/(-?\d+)\s*$/)||[])[1];
   const now=document.querySelector(`#hud2 .hc[data-hx="${k}"] b, #hud2 .hc[data-hx="${k}"] .kodm`);m.kit={kind:"rule",title:lab,sections:[{h:"Là gì",rows:[[lab.replace(/\s*\d+$/,""),gl.charAt(0).toUpperCase()+gl.slice(1),"t"]]}].concat(now?[{h:"Ngươi đang có",html:`<div class="kpnow">${now.outerHTML}</div>`}]:[])};m.t=lab.replace(/\s*-?\d+$/,"")}}}catch(e){}return s0.apply(this,arguments)}})();
/* ---- 3. identity card: larger, balanced; tiles beside the portrait; no stale result toast over the buttons ---- */
(function(){const k0=kpIdentity;kpIdentity=function(M,m){k0.apply(this,arguments);try{const mb=$("mb");const id=mb.querySelector(".kpid"),tl=mb.querySelector(":scope > .kstgrid"),main=id&&id.querySelector(".kpmain");if(main&&tl)main.appendChild(tl);
  const t=$("rtoast");if(t){t.classList.remove("on");t.hidden=true;setTimeout(()=>{t.hidden=false},50)}}catch(e){}try{kpIdFig(M)}catch(e){console.error("kpIdFig",e)}}})();
/* identity: her FULL-BODY figure stands on the origin background, the panel beside her (landscape and wide portrait) or under her (narrow portrait);
   the figure follows her current look, so a face picked in the panel (j86) shows on the standing figure at the next build */
function kpIdFig(M,tries){let src="";try{src=typeof figFor==="function"?figFor(S):""}catch(e){}let im=M.querySelector(":scope > img.kidfig2");
 /* review/stage-fig-size (owner 15/11: the identity card showed NO figure): the figure list (FIGURES.json, CDN) can arrive seconds after the
    card opens. The kit's unknown-lady silhouette stands in her place while it loads, retried every 400 ms for up to 30 s; a picture that
    fails to load is retried once. review/newgame-ui: the silhouette STAYS after 30 s (the card never loses its layout / kpfig class). */
 const ph=(typeof KIT_DIR==="string"?KIT_DIR:"img/kit/")+"unknown-fig-f.webp";
 if(!src){src=ph;if((tries||0)<75)setTimeout(()=>{if(!M.hidden&&M.classList.contains("kpscene")&&$("mb").querySelector(".kpid"))kpIdFig(M,(tries||0)+1)},400)}
 if(!im){im=document.createElement("img");im.className="kidfig2";im.alt="";im.decoding="async";M.prepend(im)}
 if(!im.dataset.kerr){im.dataset.kerr=1;im.addEventListener("error",()=>{const s0=im.getAttribute("src")||"";if(/\/tn\//.test(s0))return;if(im.dataset.kerr==="1"){im.dataset.kerr="2";setTimeout(()=>{if(im.isConnected)im.src=s0+(s0.includes("?")?"&":"?")+"r=1"},600)}})}
 M.classList.add("kpfig");const id=$("mb").querySelector(".kpid");if(id)id.classList.add("kpidf");
 /* review/newgame-ui (owner 15/11 "mỗi người 1 chiều cao … che cả nhân vật … 1 lúc sau mới thấy hình"):
    1) ONE standard figure tier: every face is drawn with the same BODY height (head top → feet, kitFigBody, as KIT 33.6) on the same floor
       line, whatever the picture's margins or width (was object-fit:contain in a fixed box: wide robes came out shorter);
    2) a FIXED column left of the panel, the panel a fixed width per viewport (kpIdLay); robe / sleeve wider than the column is cut with a
       soft fade at the column edge, so the panel never covers her;
    3) the low-res copy (kitTn, ~4 KB, prefetched with the page of faces) shows at once, the crisp figure swaps in once decoded. */
 const lo=kitTn(src);const crisp=src;M.__kidWant=crisp;
 const show=s1=>{if(M.__kidWant!==crisp)return;if(im.getAttribute("src")!==s1){im.src=s1}im.classList.toggle("kidlo",s1!==crisp);kpIdLay(M)};
 if(KPID_OK[crisp]||!lo)show(crisp);
 else{show(lo);const pre=new Image();pre.decoding="async";pre.src=crisp;const fin=()=>{KPID_OK[crisp]=1;show(crisp)};(pre.decode?pre.decode().then(fin,()=>{pre.complete&&pre.naturalWidth?fin():0}):(pre.onload=fin))}
 if(!M.__kidRes){M.__kidRes=1;addEventListener("resize",()=>{clearTimeout(M.__kidT);M.__kidT=setTimeout(()=>{if(M.classList.contains("kpfig"))kpIdLay(M)},60)})}}
const KPID_OK={};const KPID_WR=.5;/* widest painted width / body height over all faces (see kpIdLay) */
/* the geometry (screen px, from the modal box — the design canvas): phone portrait keeps the figure-on-top layout (CSS, --kidh) */
function kpIdLay(M){try{const im=M.querySelector(":scope > img.kidfig2"),d=M.querySelector(".dlg");if(!im||!d)return;const W=M.clientWidth||innerWidth,H=M.clientHeight||innerHeight;
 /* KIT 32.2b EQUAL GAPS (owner 16/11 s21 + s22 "whole group"): her full figure stands between the two frame lines of the card scene —
    one page (html.kv1, portrait): the screen top and the panel's top edge (figure ABOVE the panel); spread: the screen top and bottom
    (figure in the column left of the panel). Gap above the painted head = gap under the feet, each ≥ KIT_DP_GAP (5 % of that height,
    ≥ 14 px); a figure the column width keeps shorter is centred between the lines (equal larger gaps), never left on the floor. */
 const one=typeof kitView==="function"?kitView().pages===1:(W<600&&H>W);
 d.style.removeProperty("width");d.style.removeProperty("max-width");
 /* the panel is the ONE frame size (KIT 8.1 tokens --kpw/--kph, never set here; merge review/newgame-ui-r1); the figure column is the space
    left of it (its left edge minus 8 px), so a tab with more cells can never widen it over her */
 const port=H>W;const mr=M.getBoundingClientRect(),dr=d.getBoundingClientRect();
 const colR=one?W:Math.round(dr.left-mr.left)-8,colL=one?0:port?0:Math.round(W*.01);const colW=colR-colL;
 const lt=0,lb=one?Math.max(120,Math.round(dr.top-mr.top)):H;M.style.setProperty("--kidh",Math.max(120,Math.round(dr.top-mr.top-10))+"px");
 const want=M.__kidWant||im.getAttribute("src")||"";const s1=kitTn(want)||want;/* measured on the small copy (same fractions, tiny canvas) */
 const fb0=kitFigBody(s1,()=>{if((M.__kidWant||"")===want)kpIdLay(M)});
 /* not measured yet: the whole picture stands in (no hidden flash), re-laid when the measure arrives */
 const fb=fb0||{t:0,b:1,ht:0,l:0,r:1,ar:(im.naturalWidth&&im.naturalHeight)?im.naturalWidth/im.naturalHeight:.33};if(!fb0&&!im.naturalWidth)im.addEventListener("load",()=>kpIdLay(M),{once:true});
 const A=lb-lt,G=typeof KIT_DP_GAP!=="undefined"?Math.max(KIT_DP_GAP.min,KIT_DP_GAP.pct*A):Math.max(14,A*.05);
 const ar=fb.ar||.35,bf=Math.max(.3,fb.b-kitFigTop(fb)),pf=Math.max(bf,fb.b-fb.t);/* body = head top → feet (28.11a); painted = top of the crown / hairpin → feet (the gap is measured on it) */
 let Hs=Math.min((A-2*G)*bf/pf,H*(port?.80:.84));/* the standard body height: same for every face on this screen */
 /* ONE common tier per screen (coordinator 16/11, KIT 28.11a): the body height is capped so the WIDEST painted figure of the 420 faces a new
    game can show (KPID_WR = widest painted width / body height, measured .496 on consort-c05-t4-a18, dev/test/newgame-ui.js) still fits the
    column whole; every face, consort and maid, gets that same body height — no robe cut, no spill, no per-face shrink */
 Hs=Math.max(40,Math.min(Hs,colW*.98/KPID_WR));let ih=Hs/bf,iw=ih*ar;
 const floor=lb-(A-ih*pf)/2;/* 32.2b: the painted figure centred between the two lines → gap above the crown = gap under the feet */
 let left=Math.round((colL+colW/2)-((fb.l+fb.r)/2)*iw);const top=Math.round(floor-fb.b*ih);
 Object.assign(im.style,{left:left+"px",top:top+"px",bottom:"auto",width:Math.round(iw)+"px",height:Math.round(ih)+"px",objectFit:"fill"});
 im.style.removeProperty("-webkit-mask-image");im.style.removeProperty("mask-image");
 /* review/fig-cutout-code: the HD twin is picked from `sizes` (jfighd kitFigHD); refresh it to the width just set, or a stale smaller
    width left from an earlier layout keeps the 900 px file and the browser upscales her face */
 try{if(typeof kitFigHD==="function")kitFigHD(im)}catch(e){}
 M.dataset.kidcol=colL+","+colR}catch(e){console.error("kpIdLay",e)}}
/* review/newgame-ui (perf budget 22:35Z "one shared Pixi layer, paused when hidden"): while a full-screen scene panel (identity card,
   opening story, title — .modal.kpscene with its painted backdrop) or the Luân hồi deck covers the stage, the stage Pixi layer stops
   (its 60 fps WebGL redraw competed with the face picker's decodes: one page turn waited ~470 ms on the GPU read-back); it restarts when
   the stage shows again. */
function kitStageCovered(){try{const M=$("modal");if($("kroul"))return true;if(!M||M.hidden||!M.classList.contains("kpscene"))return false;const bg=getComputedStyle(M).backgroundImage;return !!bg&&bg!=="none"}catch(e){return false}}
function kitStagePause(){try{if(typeof PX==="undefined"||!PX.app)throw 0;const st0=$("stage");const cov=kitStageCovered()||!!(st0&&!st0.clientHeight)/* lag-play: a 0-px (hidden) stage draws nothing visible */;const t=PX.app.ticker;if(cov&&t.started){t.stop();PX.app.canvas.style.visibility="hidden"}else if(!cov&&!t.started&&!document.hidden){PX.app.canvas.style.visibility="";t.start()}}catch(e){}
 try{if(typeof KFX!=="undefined"&&KFX.app){const t=KFX.app.ticker;if(kitStageCovered()){if(t.started){t.stop();KFX.__kpause=1}}else if(KFX.__kpause){KFX.__kpause=0;if(typeof kfWake==="function")kfWake()}}}catch(e){}}
(function(){let q=0;const kick=()=>{if(!q)q=requestAnimationFrame(()=>{q=0;kitStagePause()})};const go=()=>{const M=$("modal");if(!M||!document.body)return setTimeout(go,300);
 new MutationObserver(kick).observe(M,{attributes:true,attributeFilter:["class","hidden"]});new MutationObserver(kick).observe(document.body,{childList:true});setInterval(kitStagePause,1500)};go()})();
(function(){const c0=closeModal;if(typeof c0!=="function")return;closeModal=function(){const r=c0.apply(this,arguments);try{const M=$("modal");if(M&&!M.classList.contains("kpscene")){const im=M.querySelector(":scope > img.kidfig2");if(im)im.remove();M.classList.remove("kpfig");const d=M.querySelector(".dlg");if(d&&!(Q[0]&&Q[0].nl)){d.style.removeProperty("width");d.style.removeProperty("max-width")}}}catch(e){}return r}})();
(function(){const b0=kpBuild;kpBuild=function(M,m){try{if(!(m&&m.nl)){const d=M.querySelector(".dlg");if(d){d.style.removeProperty("width");d.style.removeProperty("max-width")}M.__kidWant=""}}catch(e){}b0.apply(this,arguments);try{if(!(m&&m.nl)){const im=M.querySelector(":scope > img.kidfig2");if(im)im.remove();M.classList.remove("kpfig")}}catch(e){}}})();
(function(){const b0=kpBuild;kpBuild=function(M,m){b0.apply(this,arguments);try{if(kpIsScene(m)){const t=$("rtoast");if(t)t.classList.remove("on")}}catch(e){}}})();
/* ---- 4. status grouped by purpose ---- */
const KH_GRP=[["Tư chất",["sac","tai","tamco","duc","mat","srk","merit"]],["Nhân tâm",["th","hh","maid","tin","chu"]],["Ân sủng",["con","dem","an","aw","nt"]],["Thời gian",["buoi","lot","bl","wage","date"]]];
function khGroup(el){const hcs=[...el.querySelectorAll(":scope > .hc")];if(!hcs.length)return;const used=new Set();const cols=[];
 for(const [h,keys] of KH_GRP){const L=hcs.filter(b=>keys.includes(b.dataset.hx));L.forEach(b=>used.add(b));if(L.length)cols.push([h,L])}
 const rest=hcs.filter(b=>!used.has(b));if(rest.length)cols.push(["Tình trạng",rest]);
 const wrap=document.createElement("div");wrap.className="khg";for(const [h,L] of cols){const c=document.createElement("div");c.className="khc";c.innerHTML=`<b class="khh">${h}</b>`;L.forEach(b=>c.appendChild(b));wrap.appendChild(c)}
 const pulse=el.querySelector(":scope > .h2pulse");el.insertBefore(wrap,pulse||null)}
function khStage(){try{let o=document.getElementById("kstat");const st=$("stage"),el=$("hud2");if(!st||!el)return;const col=el.classList.contains("col");
 if(!col||!S||S.dead||(typeof isSrv==="function"&&isSrv())){if(o)o.remove();return}
 const keys=[["sac","Sắc",S.sac],["tai","Tài",S.tai],["tamco","Tâm cơ",S.tamco],["duc","Đức",S.duc],["mat","Tai mắt",S.mat]];
 if(!o){o=document.createElement("div");o.id="kstat";o.className="kstat";st.appendChild(o)}
 o.innerHTML=`<b class="khh">Tư chất</b>`+keys.map(([k,l,v])=>`<button class="kst" data-hx="${k}">${kitGloss?kitGloss(l):l}<b>${v}</b></button>`).join("");
 o.onclick=e=>{const b=e.target.closest(".kst");if(!b)return;e.stopPropagation();const hb=el.querySelector(`.hc[data-hx="${b.dataset.hx}"]`);if(hb){el.classList.remove("col");hb.click();el.classList.add("col")}};
 o.style.visibility="hidden";o.classList.remove("kright");try{const t=st.querySelector(".stop");const tr=t&&t.getBoundingClientRect(),sr=st.getBoundingClientRect();o.style.setProperty("--kstt",Math.max(8,Math.round((tr?tr.bottom:sr.top+44)-sr.top+6))+"px")}catch(e){}
 requestAnimationFrame(()=>{try{const figs=kitFigRects();const fits=()=>{const r=o.getBoundingClientRect(),s=st.getBoundingClientRect();if(r.bottom>s.bottom-8||r.right>s.right)return false;return !figs.some(f=>Math.min(f.right,r.right)-Math.max(f.left,r.left)>0&&Math.min(f.bottom,r.bottom)-Math.max(f.top,r.top)>0)};
  if(fits()){o.style.visibility="";return}o.classList.add("kright");if(fits()){o.style.visibility="";return}o.style.visibility="hidden";o.classList.remove("kright")}catch(e){}})}catch(e){}}
/* the visible body of every figure on the stage (opaque box of fig art when known by j59, else the element box) */
function kitFigRects(){const st=$("stage");if(!st)return[];const out=[];st.querySelectorAll("#mefig, #tokens .tok img.figimg, #tokens .tok:not(.fig) .md").forEach(e=>{if(!e.offsetParent&&e.id!=="mefig")return;const r=e.getBoundingClientRect();if(r.width<8||r.height<8)return;
  let bb=null;try{bb=window.J59BB&&J59BB[e.currentSrc||e.src]}catch(x){}out.push(bb?{left:r.left+r.width*bb.l,right:r.left+r.width*bb.r,top:r.top+r.height*bb.t,bottom:r.top+r.height*bb.b}:{left:r.left,right:r.right,top:r.top,bottom:r.bottom})});return out}
/* expanded status = a SHEET over the lower panel (never over the stage, never shrinking it) */
function khSheet(){try{const el=$("hud2"),g=el&&el.querySelector(".khg");if(!g)return;const P=$("panel")||document.querySelector(".panel");const st=$("stage");if(!P)return;const r=P.getBoundingClientRect(),s=st?st.getBoundingClientRect():{bottom:0};
 const top=Math.max(r.top,s.bottom+4);g.style.setProperty("--shL",Math.round(r.left)+"px");g.style.setProperty("--shT",Math.round(top)+"px");g.style.setProperty("--shW",Math.round(r.width)+"px");g.style.setProperty("--shH",Math.max(140,Math.round(r.bottom-top))+"px")}catch(e){}}
addEventListener("resize",()=>{clearTimeout(window.__khS);window.__khS=setTimeout(khSheet,100)});
(function(){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{const el=$("hud2");if(el&&!el.classList.contains("col")){khGroup(el);const g=el.querySelector(".khg");if(g){g.insertAdjacentHTML("afterbegin",`<div class="khsh"><b>Tư chất · trạng thái</b><button class="khx h2t" data-h2t="1" aria-label="Thu lại">Thu lại</button></div>`);requestAnimationFrame(khSheet)}}el&&el.classList.toggle("kgrp",!el.classList.contains("col"))}catch(e){}try{khStage()}catch(e){}return r}})();
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{setTimeout(khStage,60)}catch(e){}return r}})();
addEventListener("resize",()=>{clearTimeout(window.__khT);window.__khT=setTimeout(khStage,120)});
(function(){const st=document.createElement("style");st.id="kit2-css";st.textContent=`
/* selection outline (any picked item: face picker, chosen option): gold ring + pale-gold halo, readable on the cream panel */
:root{--k-sel:#fff3c4;--k-sel-ring:#a8740c}
.ksel,[aria-pressed="true"].kselable{outline:3px solid var(--k-sel-ring)!important;outline-offset:1px;box-shadow:0 0 0 7px var(--k-sel),0 0 14px 4px #a8740c66!important;border-radius:6px}
/* 5 · small rectangular kit frame (consort frame cropped to its body: canvas x 37–513, y 140–770) */
span.md.kmini.kmini{border:0!important;border-radius:2px!important;box-shadow:none!important;background:none!important;overflow:visible!important;position:relative!important;aspect-ratio:476/630;height:auto!important;max-height:none!important;display:inline-grid;place-items:center;animation:none!important;transform:none!important;flex:0 0 auto}
span.md.kmini.kmini.xs{width:22px!important}span.md.kmini.kmini.sm{width:32px!important}
span.md.kmini.kmini>.kmb{position:absolute;left:9.66%;top:11.75%;width:80.67%;height:80.3%;background:var(--kbg,#5a1e16) center/cover;border-radius:1px}
span.md.kmini.kmini>img{position:absolute!important;inset:auto!important;left:9.66%!important;top:18.5%!important;width:80.67%!important;height:73.9%!important;object-fit:cover!important;object-position:50% 0!important;border-radius:0!important}
span.md.kmini.kmini>img[src*="face-"]{top:11.75%!important;height:80.3%!important}
span.md.kmini.kmini>.kmf{position:absolute;inset:0;background:var(--kfr) 50% 34.4%/115.55% 164.6% no-repeat;pointer-events:none;z-index:1}
/* 1 · act art in the consort-card frame, same size as the Phi tần card portrait */
:root{--kaw:150px;--kah:226px}/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
.kaart{flex:0 0 var(--kaw)!important;width:var(--kaw)!important;height:var(--kah)!important;border-radius:0!important;overflow:visible!important;background:none!important;box-shadow:none!important;margin:0!important}
.cards:has(> button.ka.kart){grid-template-columns:repeat(auto-fill,minmax(min(100%,max(440px,31%)),1fr))!important}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
button.ka.kcard.kart{gap:10px!important;min-height:calc(var(--kah) + 12px)}
button.ka.kcard.kart{border-left:4px solid var(--kcc0,var(--line))!important}
/* 2 · info art beside the body */
.dlg.kpanel .kpb.kpinfo{grid-template-columns:var(--kaw) minmax(0,1fr)!important}
.kpiart{height:var(--kah);align-self:start}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
.kpnow{display:flex;gap:6px;align-items:center;font-size:1rem}.kpnow .kodm{font-size:.9rem}
/* 3 · identity card */
.dlg.kpsc .kpb.kpid{grid-template-columns:clamp(104px,22%,156px) minmax(0,1fr)!important;gap:16px!important;align-items:center}
.dlg.kpsc .kpid .kpsubj .pcp{width:100%!important;max-height:none!important}
.dlg.kpsc .kpid .kpidn{font-size:1.2rem}.dlg.kpsc .kpid .kpidn small{font-size:.86rem}.dlg.kpsc .kpid .kpidt{font-size:.92rem;margin:2px 0 4px}
.dlg.kpsc .kpid .kstgrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;margin:4px 0 0}
.dlg.kpsc .kpid .kst-tile{flex-direction:row;justify-content:space-between;align-items:baseline;gap:6px;padding:4px 9px}.dlg.kpsc .kpid .kst-tile>.kstv{font-size:.95rem;text-align:right}
.dlg.kpsc .kpid .kst-tile:nth-child(8){grid-column:auto}
/* kv3:.kv1 */:where(.kv1) .modal.kpscene{align-items:flex-end!important;padding:12px 4vw 16px!important}:where(.kv1) .modal.kpscene .dlg.kpsc{max-width:min(680px,100%)!important}
/* kv3:.kv1 */:where(.kv1) .dlg.kpsc .kpb.kpid{grid-template-columns:104px minmax(0,1fr)!important;gap:10px!important}:where(.kv1) .dlg.kpsc .kpid .kpidn{font-size:1.02rem}:where(.kv1) .dlg.kpsc .kpid .kpidt{font-size:.84rem}:where(.kv1) .dlg.kpsc .kpid .kstgrid{grid-template-columns:1fr 1fr}:where(.kv1) .dlg.kpsc .kpid .kst-tile{padding:2px 6px}:where(.kv1) .dlg.kpsc .kpid .kst-tile>.kstv{font-size:.84rem}
/* 3b · identity with her standing figure */
.modal.kpscene.kpfig>img.kidfig2{position:fixed;z-index:0;pointer-events:none;object-fit:contain;object-position:50% 100%;bottom:0;left:2vw;width:42vw;height:calc(94*var(--kvh,1dvh));filter:url(#kfa) drop-shadow(0 6px 18px #0006)}
.modal.kpscene.kpfig>.dlg{position:relative;z-index:1}
.modal.kpscene.kpfig{justify-content:flex-end!important;align-items:center!important;padding:12px 2.5vw!important}
.modal.kpscene.kpfig .dlg.kpsc{max-width:min(560px,54vw)!important}
.dlg.kpsc .kpid.kpidf{grid-template-columns:1fr!important}.dlg.kpsc .kpid.kpidf>.kpsubj{display:none}

/* kv3:.kv1 */:where(.kv1) .modal.kpscene.kpfig{justify-content:center!important;align-items:flex-end!important;padding:8px!important}:where(.kv1) .modal.kpscene.kpfig .dlg.kpsc{max-width:100%!important}
 :where(.kv1) .modal.kpscene.kpfig>img.kidfig2{top:6px;bottom:auto;left:0;width:100vw;height:var(--kidh,calc(40*var(--kvh,1dvh)))}
 :where(.kv1) .dlg.kpsc .kpid.kpidf .kstgrid{grid-template-columns:repeat(4,minmax(0,1fr))}:where(.kv1) .dlg.kpsc .kpid.kpidf .kst-tile{flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:0}:where(.kv1) .dlg.kpsc .kpid.kpidf .kst-tile>.kstv{text-align:left}
/* 4 · status grouped by purpose */
#hud2.kgrp{flex-wrap:wrap}
#hud2 .khg{position:fixed;z-index:40;left:var(--shL,8px);top:var(--shT,calc(40*var(--kvh,1vh)));width:var(--shW,calc(100vw - 16px));max-height:var(--shH,calc(50*var(--kvh,1vh)));overflow:auto;box-sizing:border-box;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));align-content:start;gap:6px 10px;padding:8px;background:var(--k-card,#fffaf0);border:1px solid var(--gold);border-radius:10px;box-shadow:0 8px 28px #3a201055}
#hud2 .khsh{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;font-family:var(--display);color:var(--gold);border-bottom:1px solid var(--k-hair);padding-bottom:4px}
#hud2 .khsh .khx{min-height:32px;padding:2px 12px;border:1px solid var(--line);border-radius:6px;background:#fffaf0;font:inherit;font-size:.8rem;color:var(--ink);cursor:pointer}
#hud2 .khc{display:flex;flex-direction:column;gap:2px;min-width:0;padding:4px 6px;border:1px solid var(--k-hair);border-radius:8px;background:#fffdf8}
#hud2 .khc .hc[data-hx="date"]{display:none!important}
#hud2 .khc .hc{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto;justify-items:start;align-items:center;column-gap:5px;border:0!important;background:none!important;padding:1px 0!important;min-height:0!important;border-radius:0!important;text-align:left;white-space:normal;font-size:.76rem}
#hud2 .khc .hc+.hc{border-top:1px dotted var(--k-hair)!important}
#hud2 .khc .hc>b,#hud2 .khc .hc>.kodm{grid-column:3;justify-self:end;text-align:right;white-space:normal}
.stop .scene-t,.stop .scene-t *{white-space:normal!important;overflow-wrap:anywhere}#hud2 .khc .hc>img{grid-column:1}
/* stage name tags: one line, never cut, never three lines over a child figure (reviewer 11/14) */
#tokens .tok .tag{white-space:nowrap!important;text-overflow:clip!important;max-width:none!important;width:max-content!important;overflow:visible!important}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
.khh{font-family:var(--display);font-size:.72rem;color:var(--k-lab);letter-spacing:.04em;text-transform:uppercase;padding-bottom:2px;border-bottom:1px solid var(--k-hair)}
/* kv: dropped @media (max-width:899px) (one page = spread page, KIT §0) *//* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
/* Tư chất block on the stage (only where it covers no figure) */
.kstat{position:absolute;left:8px;top:calc(var(--kstt,52px));z-index:3;display:flex;flex-direction:column;gap:1px;padding:5px 8px;min-width:118px;border-radius:8px;background:rgba(255,250,240,.86);border:1px solid var(--k-hair);box-shadow:0 2px 8px #5a3a2030;backdrop-filter:blur(2px)}
.kstat.kright{left:auto;right:8px}
.kstat .kst{display:flex;justify-content:space-between;gap:10px;border:0;background:none;padding:1px 0;font:inherit;font-size:.76rem;color:var(--ink);cursor:pointer;text-align:left}
.kstat .kst b{font-weight:700}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();
/* ---- true outcome words for harm acts (AOUT): death / miscarriage / heir loss computed for the card's target (J78.cardV, or the person being talked to) ---- */
function kitTgt(){try{if(typeof J78==="object"&&J78.cardV)return J78.cardV}catch(e){}try{if(typeof popIdx!=="undefined"&&popIdx!=null){const p=curPeople()[popIdx];return p&&(p.ref||null)}}catch(e){}return null}
(function(){if(typeof AOUT!=="object")return;const base={};const D=(k,f)=>{base[k]=AOUT[k];try{Object.defineProperty(AOUT,k,{configurable:true,enumerable:true,get(){try{const v=kitTgt();const r=f(v);if(r)return r}catch(e){}return base[k]}})}catch(e){}};
 const fail=k=>(base[k]||["",""])[1];
 D("poison",v=>v?[`nàng trúng độc · ${kpDeathWord(kpDeathP("poison",v),"nàng")}`,fail("poison")]:null);
 D("kpoison",v=>{const p=v&&kpDeathP("kpoison",v);return p==null?null:[`con nàng trúng độc · ${kpDeathWord(p,"con nàng")}`,fail("kpoison")]});
 D("pond",v=>v?[`con nàng rơi xuống hồ · ${kpDeathWord(kpDeathP("pond",v),"con nàng")}`,fail("pond")]:null);
 D("kframe",v=>{if(!v||typeof sonsOf!=="function")return null;const k=sonsOf(v).filter(k=>k.age>=6).sort((x,y)=>(+y.heir)-(+x.heir))[0];if(!k)return null;
  return[`Hoàng thượng thương ${k.name} -35, Danh nàng -10, nàng bị phạt${k.heir?`, ${k.name} bị phế ngôi Thái tử`:""}`,fail("kframe")]});
 D("trip",v=>[`nàng vấp ngã: Danh nàng -3${v&&v.preg&&!v.hidden?` · nàng động thai: ${chanceW(25)}`:""}`,fail("trip")]);
 D("pushp",v=>[`nàng rơi xuống hồ sen: Sức nàng -25${v&&v.preg&&!v.hidden?` · nàng sảy thai: ${chanceW(60)}`:""}`,fail("pushp")]);
 if(typeof actLineRaw==="function"){const a0=actLineRaw;actLineRaw=function(k,w,c){let r=a0.apply(this,arguments);try{if(typeof CAUGHT==="string"&&String(r).includes(CAUGHT)){const v=kitTgt();const t=v&&kaCaughtTxt(v,k);r=String(r).split(CAUGHT).join(t||"kèm: bị người của nàng phát giác, nàng nắm 2 chứng cứ")}}catch(e){}return r}}})();
/* ---- TAB GROUPS (owner 11/14: 8 bottom tabs): Hậu cung = Phi tần · Giao tình · Phe phái; Mệnh truyện = Mệnh truyện · Việc nhờ · Sổ ghi.
   The game's own tab keys stay (rv, rel, fac, story, nho/quest, log), so every "open the Sổ ghi" link keeps working; the bar shows one button per
   group and the panel gets the kit SUB-TABS (segmented control .ksub); the last sub-tab of each group is remembered. Servant mode keeps its tabs. */
const KG={hc:{keys:["rv","rel","fac"],l:"Hậu cung",s:"Hậu cung"},mt:{keys:["story","nho","quest","req","log"],l:"Mệnh truyện",s:"Mệnh truyện"}};
function kgOf(t){for(const g in KG)if(KG[g].keys.includes(t))return g;return null}
function kgOn(){try{return !(typeof isSrv==="function"&&isSrv())&&!(S&&S.dead)}catch(e){return true}}
function kgLast(g){let v=null;try{v=localStorage.getItem("hclh-kg-"+g)}catch(e){}const ks=kgKeys(g);return ks.includes(v)?v:ks[0]}
function kgKeys(g){return KG[g].keys.filter(k=>document.querySelector(`#tabs [data-tab="${k}"]`))}
function kgLabel(k){const b=document.querySelector(`#tabs [data-tab="${k}"]`);if(!b)return k;return (b.dataset.kl0||b.dataset.l0||b.textContent).trim()}
function kgBar(){const T=$("tabs");if(!T)return;const on=kgOn();
 for(const g in KG){const ks=kgKeys(g);ks.forEach((k,i)=>{const b=T.querySelector(`[data-tab="${k}"]`);if(!b)return;
  if(!on){if(b.dataset.kg){b.textContent=b.dataset.kl0;b.dataset.s=b.dataset.ks0;delete b.dataset.kg}b.classList.remove("kghide");return}
  if(i===0){if(!b.dataset.kg){b.dataset.kl0=b.textContent;b.dataset.ks0=b.dataset.s||"";}b.dataset.kg=g;b.classList.remove("kghide");/* a group head is always shown (a key that was a member of another group before KG changed keeps no stale kghide — review 11/15: Giao tình vanished) */if(b.textContent!==KG[g].l)b.textContent=KG[g].l;b.dataset.s=KG[g].s;b.setAttribute("aria-selected",String(kgOf(tab)===g));b.classList.toggle("kgon",kgOf(tab)===g)}
  else b.classList.add("kghide")})}}
function kgSub(){const P=$("panel");if(!P)return;const g=kgOf(tab);let nav=P.querySelector(":scope > .ksub:not(.kpgsub), :scope > .kpbar > .ksub:not(.kpgsub)");if(!g||!kgOn()){if(nav)nav.remove();return}
 try{localStorage.setItem("hclh-kg-"+g,tab)}catch(e){}
 const html=kgKeys(g).map(k=>`<button class="ksubb${k===tab?" on":""}" role="tab" aria-selected="${k===tab}" data-ksub="${k}">${kgLabel(k)}</button>`).join("");
 if(!nav){nav=document.createElement("nav");nav.className="ksub";nav.setAttribute("role","tablist");P.prepend(nav)}nav.innerHTML=html}
document.addEventListener("click",e=>{const s=e.target.closest&&e.target.closest("[data-ksub]");if(s){e.preventDefault();e.stopPropagation();tab=s.dataset.ksub;render();return}
 const b=e.target.closest&&e.target.closest("#tabs [data-kg]");if(b&&kgOn()){e.preventDefault();e.stopPropagation();const g=b.dataset.kg;tab=kgOf(tab)===g?tab:kgLast(g);try{feedback("page")}catch(x){}render()}},true);
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{kgSub()}catch(e){}return r}})();
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{kgBar();kgSub();if(typeof tabsFit==="function")tabsFit()}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kit2-tabs";st.textContent=`
html body #tabs.tabs button.kghide{display:none!important}
/* SUB-TABS: the ONE segmented control (same look everywhere a tab has sub-tabs) */
.ksub{display:flex;gap:0;margin:0 0 8px;border:1px solid var(--line);border-radius:9px;overflow:hidden;background:var(--k-card2,#f6ead6);position:sticky;top:0;z-index:5;flex:0 0 auto}
.ksubb{flex:1 1 0;min-height:38px;border:0;border-right:1px solid var(--line);background:transparent;font:inherit;font-size:.86rem;font-weight:600;color:var(--dim);padding:6px 8px;cursor:pointer;white-space:nowrap}
.ksubb:last-child{border-right:0}.ksubb.on{background:var(--k-card,#fffaf0);color:var(--gold);box-shadow:inset 0 -3px 0 var(--gold)}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();
/* ---- KIT §21 · SKILL CARD = THE ONE HEAD CARD (owner 11/14; one form since tabs-kit r7, owner 11/15 "tab như trang chữ"):
   every art (Cầm, Kỳ, Thi, Họa, Vũ, Y, Thêu, Nấu…), every Tứ đức course, every Tác phẩm line, the Mệnh truyện chapter / Sắc phong head and
   an empty state are ONE card: small painted picture LEFT (kitSceneArt size "thumb", §28.19), RIGHT: kicker, name + kitSteps (segments + "Bậc l/max";
   tap = the levels when stepsAttr is given), one desc line, tiến bộ bar (or "Đã tinh thông"), "Bậc n mở" chip + what it gives; act cards BELOW in a
   grid of act cells, each cell a kpanec (§43 compact acts under 640 px). levels:[text per level] still works: the next level's text becomes the "Bậc n mở" line.
   kitSkillCard({kind, k, name, kicker, level, max, word:"Bậc", prog:[cur,need] | prog:cur+need:n, bar:false, desc, next, levels, acts:[pbtn…], img, stepsAttr, can}) */
function kitSkillArt(kind,k,name){const key=`${kind}-${k}`;const have=(KIT_INFOM.have||[]);const ah=(KIT_ACTS.have||[]);
 return have.includes(key)?`img/${key}.webp`:ah.includes("act-cat-hoc-tap")?"img/act-cat-hoc-tap.webp":""}
function kitSteps(l,max,attr,word){max=max||5;word=word||"Bậc";const seg=Array.from({length:max},(_,i)=>`<i class="${i<l?"on":""}"></i>`).join("");
 return `<${attr?"button type=\"button\"":"span"} class="ksteps" ${attr||""} aria-label="${word} ${l} trên ${max}"><span class="kstepd">${seg}</span><b>${word} ${l}/${max}</b></${attr?"button":"span"}>`}
function kitBar(label,cur,need){return `<div class="kskp"><span>${label}</span><span class="kskb"><u style="width:${need?Math.min(100,Math.round(cur/need*100)):0}%"></u></span><b>${cur}/${need}</b></div>`}
function kitSkillCard(o){o=o||{};const l=o.level||0,max=o.max!=null?o.max:((o.levels||[]).length||5);
 const pr=Array.isArray(o.prog)?o.prog:[o.prog||0,o.need||0];const [cur,need]=pr;
 const img=o.img!=null?o.img:(o.k?kitSkillArt(o.kind||"art",o.k,o.name):"");
 const next=o.next!=null?o.next:((o.levels||[])[l]||"");
 const bar=o.bar===false||!max?"":l<max?(need?kitBar("Tiến bộ",cur,need):""):`<span class="kchip g">Đã tinh thông</span>`;
 const acts=(o.acts||[]).filter(Boolean);
 return `<div class="kskill${o.can===false?" kdone":""}" data-skill="${o.kind||"art"}-${o.k||""}"><div class="kskh2">${img?kitSceneArt(img,o.name||"",{shape:"tall",size:"thumb",cap:false}):""}`+
  `<div class="kskinfo">${o.kicker?`<small class="kskk">${o.kicker}</small>`:""}<div class="kskh"><b>${o.name||""}</b>${max?kitSteps(l,max,o.stepsAttr,o.word):""}</div>${o.desc?`<div class="kskdo">${o.desc}</div>`:""}${bar}`+
  `${max&&l<max&&next?`<span class="kskx"><span class="kchip n">${o.word||"Bậc"} ${l+1} mở</span> ${next}</span>`:""}</div></div>`+
  `${acts.length?`<div class="kskacts pcb">${acts.map(a=>`<div class="kpanec">${a}</div>`).join("")}</div>`:""}${o.note?`<div class="kpnote">${o.note}</div>`:""}</div>`}
/* kitEmpty(title,line): an empty state = the same card with no steps: the topic's painted picture (kitInfoArt) + one short line */
function kitEmpty(title,line){const a=typeof kitInfoArt==="function"?kitInfoArt(title):{src:""};return kitSkillCard({kind:"empty",name:"",max:0,img:a&&a.src||"",desc:line})}
(function(){const st=document.createElement("style");st.id="kit2-skill";st.textContent=`
.kskills{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,460px),1fr));gap:10px}
.kskill{display:flex;flex-direction:column;gap:8px;padding:10px;margin:0 0 8px;border:1px solid var(--line);border-radius:var(--k-rad,8px);background:var(--k-card,#fffaf0)}
.kskills>.kskill{margin:0}.kskill.kdone{opacity:.92}
.kskh2{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:start}.kskh2:not(:has(>.ksart)){grid-template-columns:minmax(0,1fr)}
.kskinfo{display:flex;flex-direction:column;gap:5px;min-width:0}.kskk{color:var(--dim);font-size:.78rem}
.kskh{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:4px 10px}.kskh:has(>b:empty){justify-content:flex-end}.kskh b{font-family:var(--display);font-size:1.05rem;color:var(--gold)}
.kskdo{font-size:.82rem;color:var(--dim);line-height:1.35}.kskx{display:flex;flex-wrap:wrap;align-items:center;gap:4px;font-size:.8rem}
.kskp{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;font-size:.78rem;color:var(--k-lab)}.kskp b{color:var(--ink)}
.kskb{height:8px;border-radius:5px;background:#eadfca;overflow:hidden}.kskb u{display:block;height:100%;background:linear-gradient(90deg,#c9a24a,#8f5f0c)}
.ksteps{display:inline-flex;align-items:center;gap:6px;border:0;background:none;padding:0;font:inherit;color:inherit;cursor:default}button.ksteps{cursor:pointer}
.kstepd{display:inline-flex;gap:3px}.kstepd i{width:14px;height:8px;border-radius:4px;background:var(--k-hair,#e6d3ac);box-shadow:inset 0 0 0 1px #5a3a2018}.kstepd i.on{background:var(--gold,#b8862b)}
.ksteps b{font-size:.78rem;color:var(--dim);font-weight:600;white-space:nowrap}
.kskacts.pcb{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))!important;gap:6px}
`;document.head.appendChild(st)})();
/* ---- PERSON STATS (owner 11/14): every consort shows the SAME stat set as the player, as kit tiles: Sủng · Đức · Danh · Sắc · Tài · Tâm cơ.
   A value shows only once known, else "chưa rõ". Hook for the reveal stages (j61/j85 Đức, tai mắt/intel): window.kitStatKnown(v, key) -> true|false.
   Defaults: Sủng = the Kính sự phòng book (S.kf, with when); Danh = known to the whole court; Sắc = seen once met; Đức = ducKnown(v) when present;
   Tài / Tâm cơ / Đức otherwise from S.kstat[v.id][key] (set by any reveal: kitStatReveal(v,key)). */
function kitStatReveal(v,key){try{S.kstat=S.kstat||{};const o=S.kstat[v.id]=S.kstat[v.id]||{};o[key]=wk()}catch(e){}}
function kitStatKnown0(v,key){try{if(window.kitStatKnown&&window.kitStatKnown!==kitStatKnown0){const r=window.kitStatKnown(v,key);if(r!=null)return r}}catch(e){}
 if(key==="danh")return true;if(key==="sac")return typeof kitIsKnown==="function"?kitIsKnown(v):true;if(key==="sung"){try{kn();return !!S.kf[v.id]}catch(e){return false}}
 if(key==="duc"&&typeof ducKnown==="function"){try{if(ducKnown(v))return true}catch(e){}}return !!(S.kstat&&S.kstat[v.id]&&S.kstat[v.id][key]!=null)}
function kitPersonStats(v){const val=k=>{if(!kitStatKnown0(v,k))return["chưa rõ","kunk"];if(k==="sung"){try{const f=S.kf[v.id];return[`${f.s}`,""]}catch(e){}}const n=v[k];return[n==null?"chưa rõ":Math.round(n),n==null?"kunk":""]};
 const L=[["Sủng","sung"],["Đức","duc"],["Danh","danh"],["Sắc","sac"],["Tài","tai"],["Tâm cơ","tamco"]].map(([l,k])=>{const [x,c]=val(k);return[l,x,c]});
 return `<div class="kpstats">${kitTiles(L)}</div>`}
(function(){if(typeof rvCard!=="function")return;const r0=rvCard;rvCard=function(v,i){let h=r0.apply(this,arguments);try{if(v&&v.alive)h=h.replace('<div class="pcinfo">',`<div class="pcinfo">${kitPersonStats(v)}`)}catch(e){}return h}})();
(function(){const st=document.createElement("style");st.id="kit2-pstats";st.textContent=`
.kpstats .kstgrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:3px;margin:2px 0 4px}.kpstats .kst-tile{flex-direction:column;align-items:flex-start;gap:0;padding:2px 6px}
.kpstats .kst-tile>.kstv{font-size:.84rem}.kpstats .kst-tile>.kstv.kunk{font-weight:500;font-size:.72rem;color:#9a8a78}
`;document.head.appendChild(st)})();
/* ---- PORTRAIT PICKER (kit component; owner/reviewer 11/14): choose one of N portraits.
   kitPicker({id, title, items:[{k, face, label}], cur, filters:[[key,label]], filter, rows:2, note, onPick(k), onFilter(key)}) -> html.
   Small rectangular kit frames (mdH .kmini: no tassels), whole rows only, pages with ‹ › and "trang 1/4" (no half-cut row, no inner scroll),
   selection = gold ring + check badge (.ksel), radio semantics, arrow keys move, Enter/Space picks. Filter tabs use the sub-tab look (.ksub). */
const KIT_PICK={};
function kitPicker(o){o=o||{};KIT_PICK[o.id]=o;const items=o.items||[];
 const flt=o.filters&&o.filters.length>1?`<nav class="ksub kpkf" role="tablist">${o.filters.map(([k,l])=>`<button type="button" class="ksubb${k===o.filter?" on":""}" data-pkf="${k}" role="tab" aria-selected="${k===o.filter}">${l}</button>`).join("")}</nav>`:"";
 const it=items.map(x=>{const on=x.k===o.cur;return `<button type="button" class="kpki${on?" on ksel":""}" role="radio" aria-checked="${on}" tabindex="${on?0:-1}" data-pk="${x.k}" aria-label="${x.label||x.k}">${mdH(x.face||{},"")}</button>`}).join("");
 return `<div class="kpsec kpick" data-pick="${o.id}" data-rows="${o.rows||2}">${o.title?`<h4 class="kpst">${o.title}</h4>`:""}${flt}<div class="kpkwrap"><button type="button" class="kpkpg" data-pkpg="-1" aria-label="Trang trước">‹</button><div class="kpkgrid" role="radiogroup" aria-label="${o.title||"Chọn"}">${it}</div><button type="button" class="kpkpg" data-pkpg="1" aria-label="Trang sau">›</button></div><div class="kpkpn"></div>${o.note?`<div class="kpnote">${o.note}</div>`:""}</div>`}
function kitPickerLayout(root,keepPage){try{const g=root.querySelector(".kpkgrid");const B=[...g.querySelectorAll(".kpki")];if(!B.length)return;B.forEach(b=>b.hidden=false);
 const cs=getComputedStyle(g);const gap=parseFloat(cs.columnGap)||6;const iw=B[0].getBoundingClientRect().width||58;const cols=Math.max(3,Math.floor((g.clientWidth+gap)/(iw+gap)));const rows=+root.dataset.rows||2;const per=cols*rows;
 const pages=Math.max(1,Math.ceil(B.length/per));let pg=keepPage&&root.dataset.pg!=null?+root.dataset.pg:Math.floor(Math.max(0,B.findIndex(b=>b.classList.contains("on")))/per);pg=Math.min(Math.max(0,pg),pages-1);root.dataset.pg=pg;
 g.style.setProperty("--kpcols",cols);root.__kpc={cols,per,pages,B};kitPickerShow(root,pg)}catch(e){}}
/* review/newgame-ui (owner 15/11 "bấm nút trái phải … lag cực kỳ"): paging never measures the layout again (cols/per kept from the last
   kitPickerLayout); the next page's pictures are decoded BEFORE the swap (≤ 80 ms wait, then swap anyway), and the pages either side are
   decoded in idle time, so a page turn is one class toggle on already-decoded thumbnails (small WebP, kitTn). */
function kitPickerShow(root,pg){const c=root.__kpc;if(!c)return;const {per,pages,B}=c;pg=Math.min(Math.max(0,pg),pages-1);root.dataset.pg=pg;
 B.forEach((b,i)=>{const on=i>=pg*per&&i<(pg+1)*per;if(b.hidden===on)b.hidden=!on});
 const [pv,nx]=root.querySelectorAll(".kpkpg");pv.disabled=pg<=0;nx.disabled=pg>=pages-1;pv.hidden=nx.hidden=pages<2;root.querySelector(".kpkpn").textContent=pages>1?`trang ${pg+1}/${pages}`:"";
 const idle=window.requestIdleCallback||(f=>setTimeout(f,60));idle(()=>{[pg+1,pg-1].forEach(q=>kitPickerDecode(root,q))});try{const o=KIT_PICK[root.dataset.pick];o&&o.onPage&&o.onPage(kitPickerPage(root,pg))}catch(e){}}
function kitPickerPage(root,pg){const c=root.__kpc;if(!c||pg<0||pg>=c.pages)return[];return c.B.slice(pg*c.per,(pg+1)*c.per)}
function kitPickerDecode(root,pg){return Promise.all(kitPickerPage(root,pg).flatMap(b=>[...b.querySelectorAll("img")]).map(im=>im.decode?im.decode().catch(()=>0):0))}
function kitPickerGo(root,pg){const c=root.__kpc;if(!c){root.dataset.pg=pg;kitPickerLayout(root,true);return}pg=Math.min(Math.max(0,pg),c.pages-1);if(pg===+root.dataset.pg)return;
 root.dataset.want=pg;let done=false;const go=()=>{if(done||+root.dataset.want!==pg)return;done=true;kitPickerShow(root,pg)};kitPickerDecode(root,pg).then(go);setTimeout(go,80)}
/* KIT 28.11a kitTn(src): the small pre-sized copy of a face picture (img/tn/<por|fig>-….webp, dev/art/tn_make.py) when img/TN.json lists it,
   else "" — pickers show the thumbnail, the identity card shows the low-res figure at once and swaps in the crisp one when decoded */
let KIT_TN=null;try{fetch("img/TN.json").then(r=>r.ok?r.json():null).then(j=>{if(j&&j.have){KIT_TN=new Set(j.have);try{window.dispatchEvent(new Event("kittn"))}catch(e){}}}).catch(()=>{})}catch(e){}
function kitTn(src){try{if(!KIT_TN||!src)return"";const m=/^(.*\/)(por|fig)-([^/]+)\.webp$/.exec(src);if(!m||!KIT_TN.has(m[3]))return"";return m[1]+"tn/"+m[2]+"-"+m[3]+".webp"}catch(e){return""}}
window.kitTn=kitTn;
function kitPickerInit(scope){(scope||document).querySelectorAll(".kpick").forEach(r=>kitPickerLayout(r,false))}
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest(".kpick [data-pk],.kpick [data-pkpg],.kpick [data-pkf]");if(!t)return;const root=t.closest(".kpick");const o=KIT_PICK[root.dataset.pick]||{};e.preventDefault();e.stopPropagation();
 if(t.dataset.pkpg){kitPickerGo(root,(+root.dataset.pg||0)+(+t.dataset.pkpg));return}
 if(t.dataset.pkf){if(o.onFilter)o.onFilter(t.dataset.pkf);return}
 if(t.dataset.pk&&o.onPick)o.onPick(t.dataset.pk)},true);
document.addEventListener("keydown",e=>{const b=e.target.closest&&e.target.closest(".kpick .kpki");if(!b)return;const V=[...b.parentNode.querySelectorAll(".kpki:not([hidden])")];const i=V.indexOf(b);const cols=+getComputedStyle(b.parentNode).getPropertyValue("--kpcols")||4;
 const d={ArrowRight:1,ArrowLeft:-1,ArrowDown:cols,ArrowUp:-cols}[e.key];if(d==null)return;e.preventDefault();const n=V[Math.min(V.length-1,Math.max(0,i+d))];if(n){V.forEach(x=>x.tabIndex=-1);n.tabIndex=0;n.focus()}});
addEventListener("resize",()=>{clearTimeout(window.__kpkT);window.__kpkT=setTimeout(()=>kitPickerInit(),120)});
(function(){const st=document.createElement("style");st.id="kit2-pick";st.textContent=`
.kpick{display:flex;flex-direction:column;gap:4px;margin:4px 0}
.kpick .kpkf{margin:0 0 2px}
.kpkwrap{display:grid;grid-template-columns:28px minmax(0,1fr) 28px;align-items:center;gap:4px}
.kpkgrid{display:grid;grid-template-columns:repeat(var(--kpcols,6),58px);justify-content:center;gap:6px;padding:6px 2px;border:1px solid var(--k-hair);border-radius:var(--k-rad,8px);background:#fffdf8c8;min-width:0}
.kpki{all:unset;box-sizing:border-box;position:relative;width:58px;display:grid;place-items:center;padding:3px;border-radius:6px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.kpki[hidden]{display:none!important}
.kpki span.md.kmini.kmini{width:52px!important}
.kpki:hover{background:#f6ead6}
.kpki:focus-visible{outline:2px dashed var(--gold);outline-offset:1px}
.kpki.on{background:#fff3c4}
.kpki .kpkck{position:absolute;right:-3px;top:-3px;width:20px;height:20px;border-radius:50%;display:none;place-items:center;font-style:normal;font-size:.8rem;font-weight:800;color:#fff;background:var(--k-sel-ring,#a8740c);box-shadow:0 0 0 2px #fff,0 1px 3px #0006;z-index:3}
.kpki.on .kpkck{display:grid}
.kpkpg{min-height:44px;border:1px solid var(--line);border-radius:6px;background:#fffaf0;font-size:1.2rem;color:var(--gold);cursor:pointer;padding:0}
.kpkpg:disabled{opacity:.35;cursor:default}.kpkpg[hidden]{visibility:hidden;display:block}
.kpkpn{font-size:.72rem;color:var(--k-lab);text-align:center;min-height:1em}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();
/* ---- compact header on phones (owner 11/14: the stage must keep room): menu · her · Hoàng thượng on one row, the four bars under, status row last ---- */
(function(){const st=document.createElement("style");st.id="kit2-phonehud";st.textContent=`
/* kv3:.kv1 */
 :where(.kv1) header.hud{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto!important;grid-template-areas:"menu me emp" "stats stats stats" "h2 h2 h2"!important;gap:3px 6px!important;padding:5px 6px!important;align-items:center}
 :where(.kv1) header.hud>#menu{grid-area:menu;min-height:34px!important;min-width:34px!important;padding:0 6px!important}
 :where(.kv1) header.hud>.me{grid-area:me;min-width:0}:where(.kv1) header.hud>.me .mi b{font-size:1rem!important}:where(.kv1) header.hud>.me .dt{font-size:.7rem!important;line-height:1.25}
 :where(.kv1) header.hud>.emp{grid-area:emp;padding:2px 6px!important;min-height:0!important;gap:4px!important;max-width:42vw}:where(.kv1) header.hud>.emp b{font-size:.8rem!important}:where(.kv1) header.hud>.emp span#emp-m{font-size:.68rem!important}
 :where(.kv1) header.hud>.emp span.md.kmini.kmini{width:26px!important}
 
 :where(.kv1) header.hud>.hud2{grid-area:h2;margin:0!important;flex-wrap:nowrap!important;overflow-x:auto;gap:4px!important}:where(.kv1) header.hud>.hud2 .hc{font-size:.68rem!important;min-height:26px!important;padding:1px 6px!important;white-space:nowrap}
 :where(.kv1) header.hud>.hud2>.h2t{min-height:26px!important;padding:0 8px!important;font-size:.72rem!important}
 :where(.kv1) .game{grid-template-rows:auto minmax(0,1fr) minmax(0,40%) auto!important}
`;document.head.appendChild(st)})();
/* ---- face strip (pager): only WHOLE faces, never a name cut at the edge; the window follows the chosen person; group labels wrap ---- */
function kitStripFit(){document.querySelectorAll(".pstrip .pfaces").forEach(P=>{try{const F=[...P.querySelectorAll(".pface")];if(!F.length)return;const ST=P.closest(".pstrip");
  /* KIT 49.2c (owner 15/11, review/rel-picker): the ‹ › pager and the N/M count appear ONLY when the faces do not all fit: first measure with them hidden (.kpall), keep that when every face is whole, else show them and measure again */
  const fit=()=>{F.forEach(f=>f.classList.remove("kpfh"));P.querySelectorAll(".pgrp").forEach(g=>g.classList.remove("kpfh"));
  P.scrollLeft=0;const W=P.clientWidth;const w=F.map(f=>f.getBoundingClientRect().width+8);let on=F.findIndex(f=>f.classList.contains("on"));if(on<0)on=0;
  let s=on,e=on,sum=w[on];let turn=0;while(true){const canL=s>0&&sum+w[s-1]<=W,canR=e<F.length-1&&sum+w[e+1]<=W;if(!canL&&!canR)break;if((turn++%2===0&&canR)||!canL){e++;sum+=w[e]}else{s--;sum+=w[s]}}
  F.forEach((f,i)=>{if(i<s||i>e)f.classList.add("kpfh")});const gh=()=>P.querySelectorAll(".pgrp").forEach(g=>g.classList.toggle("kpfh",!g.querySelector(".pface:not(.kpfh)")));gh();
  /* group labels ("Thừa Minh cung") can be wider than their faces: drop the face farthest from the chosen one until nothing is cut (review fold-layout FAIL 3) */
  for(let k=0;k<F.length&&P.scrollWidth>P.clientWidth+1&&e>s;k++){if(e-on>=on-s){F[e].classList.add("kpfh");e--}else{F[s].classList.add("kpfh");s++}gh()}};
  if(ST)ST.classList.add("kpall");fit();if(ST&&F.some(f=>f.classList.contains("kpfh"))){ST.classList.remove("kpall");fit()}}catch(x){}})}
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{requestAnimationFrame(kitStripFit)}catch(e){}return r}})();
addEventListener("resize",()=>{clearTimeout(window.__ksfT);window.__ksfT=setTimeout(kitStripFit,120)});
(function(){const st=document.createElement("style");st.id="kit2-strip";st.textContent=`
.pstrip .pfaces{overflow:hidden!important}.pstrip .kpfh{display:none!important}
.pstrip .psep{white-space:normal!important;overflow:visible!important;text-overflow:clip!important;max-width:100%;display:block;line-height:1.15}
.pstrip .pface span{white-space:nowrap!important;overflow:visible!important;text-overflow:clip!important;max-width:none!important}
.pstrip .pgrp{min-width:0}
.pstrip.kpall>.parr,.pstrip.kpall>.pcount{display:none!important}
`;document.head.appendChild(st)})();
/* ---- dilemma options without risk data: the rows come from the option's own outcome branches (go/fail source): every `roll(N)`-guarded
   apply/ap/die becomes "<effect>: <ladder word>" (gain → Được, loss → Kèm), unguarded apply → certain; never "Khó lường" or "xem ở bước sau" ---- */
function kitBranchFx(src){const out={sure:[],gain:[],risk:[]};const fxOf=t=>{const o={};String(t).replace(/(\w+):(-?\d+)/g,(m,k,v)=>{o[k]=+v;return m});return fmt(o)};
 const re=/if\s*\(\s*roll\(\s*(\d+)\s*\)\s*\)\s*\{?\s*([^;{}]*?)(apply\(\{([^}]*)\}\)|ap\(S,\{([^}]*)\}\)|die\()/g;let m;const seen=new Set();
 while((m=re.exec(src))){const n=+m[1];if(m[3]==="die("){out.risk.push(`chết: ${chanceW(n)}`);continue}const t=fxOf(m[4]||m[5]);if(!t||seen.has(t+n))continue;seen.add(t+n);
  (/-\d/.test(t)&&!/\+\d/.test(t)?out.risk:out.gain).push(`${t}: ${chanceW(n)}`)}
 const flat=src.replace(re,"");String(flat).replace(/(?:^|[;{}]\s*)apply\(\{([^}]*)\}\)/g,(x,b)=>{const t=fxOf(b);if(t)out.sure.push(t);return x});return out}
(function(){const d0=dilLine;dilLine=function(c){try{const x=c.x||"";const src=String(c.go||"")+String(c.fail||"");if(!ODDW.test(x)&&!CHW.test(x)&&/roll\(/.test(src)){const B=kitBranchFx(src);
  if(!B.gain.length&&!B.risk.length&&!B.sure.length){const m=src.match(/roll\(((?:[^()]|\((?:[^()]|\([^()]*\))*\))*)\)/);if(m){let n=null;try{n=Function("return ("+m[1]+")")()}catch(e){n=null}
   if(typeof n==="number"&&isFinite(n))return d0.call(this,Object.assign({},c,{x:`${word(cl(Math.round(n),0,100))}${x?" · thành: "+x:""}`}))}}
  if(B.gain.length||B.risk.length||B.sure.length){const fx=fmt(c.fx||{});return kitParse(["Chắc chắn",fx?"tốn: "+fx:"",[x,...B.sure,...B.gain].filter(Boolean).length?"thành: "+[x,...B.sure,...B.gain].filter(Boolean).join(", "):"",B.risk.length?"kèm: "+B.risk.join(", "):""].filter(Boolean).join(" · "))}}}catch(e){}return d0.apply(this,arguments)}})();
/* ---- VEIL (j70 scars): a person whose scarOf(p).veil is set wears the veil over the face in EVERY portrait (tall frame, small frame) and on
   the stage figure. Assets KIT_VEIL.por (covers the portrait image box) and KIT_VEIL.fig
   (placed at the head of the figure's opaque box from j59: top 4–15 % of the visible body height). Missing asset -> nothing drawn. ---- */
/* asset names: set when review/wardrobe lands its pearl-string veil (the old img/veil*.png was rejected by the owner); empty = nothing drawn */
window.KIT_VEIL=window.KIT_VEIL||{por:"",fig:""};
function kitVeiled(p){if(!(window.KIT_VEIL&&(KIT_VEIL.por||KIT_VEIL.fig)))return false;try{if(!p||typeof scarOf!=="function")return false;const s=scarOf(p);return !!(s&&s.veil)}catch(e){return false}}
(function(){const p0=pcPort;pcPort=function(f,col,status){let h=p0.apply(this,arguments);try{if(f&&f.__kp&&kitVeiled(f.__kp))h=h.replace(/(<img class="kfr")/,`${KIT_VEIL.por?`<img class="kveil" src="${KIT_VEIL.por}" alt="" aria-hidden="true" onerror="this.remove()">`:""}$1`)}catch(e){}return h}})();
(function(){const m0=mdH;mdH=function(p,cls){let h=m0.apply(this,arguments);try{if(p&&p.__kp&&kitVeiled(p.__kp))h=h.replace(/<i class="kmf"/,`${KIT_VEIL.por?`<img class="kveil" src="${KIT_VEIL.por}" alt="" aria-hidden="true" onerror="this.remove()">`:""}<i class="kmf"`)}catch(e){}return h}})();
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const ppl=curPeople();document.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];const who=p&&(p.ref||null);const old=b.querySelector(".kveilf");
  if(!who||!kitVeiled(who)){if(old)old.remove();return}const fi=b.querySelector("img.figimg");if(!fi||old||!KIT_VEIL.fig)return;const v=document.createElement("img");v.className="kveilf";v.alt="";v.src=KIT_VEIL.fig;v.onerror=()=>v.remove();b.appendChild(v);
  const place=()=>{try{const bb=(window.J59BB&&J59BB[fi.currentSrc||fi.src])||{t:0,b:1,l:0,r:1};const R=fi.getBoundingClientRect(),B=b.getBoundingClientRect();const H=R.height*(bb.b-bb.t),W=R.width*(bb.r-bb.l);
   v.style.cssText=`position:absolute;pointer-events:none;z-index:2;left:${R.left-B.left+R.width*bb.l+W*.3}px;width:${W*.4}px;top:${R.top-B.top+R.height*bb.t+H*.04}px;height:${H*.11}px;object-fit:contain`}catch(e){}};
  if(fi.complete)place();else fi.addEventListener("load",place,{once:true})})}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kit2-veil";st.textContent=`
.pcp.kit .kin>img.kveil{position:absolute!important;inset:auto!important;left:14.655%!important;top:20.289%!important;width:70.691%!important;height:49.373%!important;object-fit:fill!important;z-index:1;pointer-events:none;border-radius:0!important}
span.md.kmini.kmini>img.kveil{left:9.66%!important;top:11.75%!important;width:80.67%!important;height:80.3%!important;object-fit:fill!important;z-index:1}
`;document.head.appendChild(st)})();
/* ================= KIT 48.3 · kitRankPaint — rank title + name in RANK COLOUR everywhere (owner 15/11, session 8: "Phẩm bậc trong mấy ô
   chọn này chưa theo màu phẩm, màu phẩm xuất hiện mới nơi có tên và phẩm của người.") ==========
   ONE rule: wherever a person's rank / role title stands right before that person's name ("Quý phi Tần Kiều Nguyệt", "Cung nữ thân tín
   Ngọc Lan", "Thường tại <her name>"), the pair is drawn as kitName (§28 / 48.1): title in its rank tone (`kitRankTone`, plain text in framed
   UI, lightened on .modal.night), the name in the person's colour (hers black, .kmy). New code writes `kitName(p)`; text already written as
   plain words by ANY builder (picker rows of every act, cards, dialogs, lists, logs, toasts, popups, co-op) is painted here by one
   MutationObserver pass, the same way kitRelPaint (§11.2) paints relation labels. The words are never changed (textContent stays equal):
   only the matched "title name" run is wrapped. Skipped: anything already a kit name block (.kname .knr .krt .krn .kpsn .pcrk .pcname,
   stage tags .j59t/.j59n, podium plates), [data-vp-skip], [data-norank], form fields, script/style. */
const KIT_RP_TITLES="Hoàng quý phi|Hoàng hậu|Quý phi|Quý nhân|Thường tại|Đáp ứng|Phế phi|Phi|Tần|Thái tử|Hoàng tử|Công chúa|Thái y|Thị vệ|Ma ma|Chưởng sự cô cô|Cô cô|[Cc]ung nữ thân tín|[Cc]ung nữ thô sử|[Đđ]ại cung nữ|[Cc]ung nữ|[Tt]iểu thái giám|[Tt]ổng quản thái giám|[Tt]ổng quản|[Tt]hái giám|[Nn]ữ quan|[Nn]hũ mẫu|[Nn]hạc sư|[Hh]ọa sư|[Tt]ể tướng|[Tt]hượng thư|[Tt]hị lang|[Tt]ướng quân|[Cc]ông tử";
const KIT_RP_SKIP=".kname,.knr,.krt,.krn,.kpsn,.pcrk,.pcname,.j59t,.j59n,.kpod-plq,.kbk-pname,[data-vp-skip],[data-norank],[contenteditable]";
let kitRpKey="",kitRpRe=null,kitRpMap=null;
function kitRpRx(){const L=typeof kpPeople==="function"?kpPeople():[];const key=L.map(x=>x[0]).join("|");kitRpMap=new Map(L);if(key!==kitRpKey||!kitRpRe){kitRpKey=key;
  const N=L.map(x=>x[0].replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
  /* "title name" (m[1], m[2]) or "name (title, …)" (m[3], m[4]: lists such as "Mạnh Bích Dao (Tần, chủ vị)") */
  kitRpRe=L.length?new RegExp(`(?<![\\p{L}])(?:(${KIT_RP_TITLES}) (${N})|(${N}) \\((${KIT_RP_TITLES})(?=[,;)·]))(?![\\p{L}])`,"gu"):null}
 return kitRpRe}
/* the kit markup for one "title name" pair (= kitName with the text's own title) */
function kitRankNameH(p,title,name){const col=typeof kitPersonCol==="function"?kitPersonCol(p):"#8a7350";const me=typeof S!=="undefined"&&p===S;
 const rt=typeof kitRankTone==="function"?kitRankTone(title,col):"";const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 return `<b class="kname${me?" kmy":""}" style="--rc:${col}"><span class="kti" style="--rt:${rt}">${esc(title)}</span> ${esc(name)}</b>`}
window.kitRankNameH=kitRankNameH;
/* one match → kit html: "title name" = kitRankNameH; "name (title" = the name block + " (" + the title in its tone */
function kitRpOne(t,n,n2,t2){if(n){const p=kitRpMap&&kitRpMap.get(n);return p?kitRankNameH(p,t,n):""}const p=kitRpMap&&kitRpMap.get(n2);if(!p)return"";
 const col=typeof kitPersonCol==="function"?kitPersonCol(p):"#8a7350";const me=typeof S!=="undefined"&&p===S;
 return `<b class="kname${me?" kmy":""}" style="--rc:${col}">${n2}</b> (<b class="kname" style="--rc:${col}"><span class="kti" style="--rt:${typeof kitRankTone==="function"?kitRankTone(t2,col):""}">${t2}</span></b>`}
/* the same on an HTML string (text segments only): every later mention too, BEFORE kpChipify, so a delta chip never eats the end of a name
   ("(Thường tại Bạch Thục Nghi thiện cảm +8)" made the chip "Thục Nghi thiện cảm +8" and left the title plain) */
function kitRankText(h){try{const re=kitRpRx();if(!re||!h)return h;return kpMapText(h,s=>s.replace(re,(m,t,n,n2,t2)=>kitRpOne(t,n,n2,t2)||m))}catch(e){return h}}
window.kitRankText=kitRankText;
function kitRankPaint(root){try{if(!root||typeof S==="undefined"||!S)return 0;const re=kitRpRx();if(!re)return 0;
 if(root.nodeType===3)root=root.parentElement;if(!root||root.nodeType!==1||!root.isConnected)return 0;if(root.closest(KIT_RP_SKIP))return 0;
 const W=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{/* review/lag-play-2: the cheap name test first; the ancestor walk (closest) only for the few text nodes that hold a name */
  re.lastIndex=0;if(!re.test(n.nodeValue))return NodeFilter.FILTER_REJECT;const p=n.parentElement;
  return !p||/^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION|SELECT|TITLE)$/.test(p.tagName)||p.closest(KIT_RP_SKIP)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
 const L=[];while(W.nextNode())L.push(W.currentNode);let k=0;
 for(const n of L){const v=n.nodeValue;re.lastIndex=0;let m,last=0;const f=document.createDocumentFragment();
  while((m=re.exec(v))){const h=kitRpOne(m[1],m[2],m[3],m[4]);if(!h)continue;if(m.index>last)f.appendChild(document.createTextNode(v.slice(last,m.index)));
   const t=document.createElement("template");t.innerHTML=h;f.appendChild(t.content);last=m.index+m[0].length;k++}
  if(!last)continue;if(last<v.length)f.appendChild(document.createTextNode(v.slice(last)));n.parentNode.replaceChild(f,n)}
 return k}catch(e){return 0}}
window.kitRankPaint=kitRankPaint;
/* ================= KIT 54.2 · THE INK-BRUSH MARK ✓ / ✗ (owner 11/16 15:00Z 4.5: "no circles around ✗ / ✓; the ✓ used in the game earlier looked nicer, mút mực") =====
   ONE mark everywhere: a bare brush-stroke tick (green) / cross (red) drawn from an SVG mask in the colour of its text (no circle, no box, no chip behind it).
   `kitMark(ok)` → `<span class="kmk y|n"><b>✓|✗</b></span>` (the glyph stays inside, hidden, so textContent / searches / screen readers read the same);
   `kitMarkPaint(root)` (same MutationObserver pass as kitRankPaint) wraps every ✓ / ✗ / ✔ / ✘ character an older builder typed into text.
   Colour: the mark inherits the colour of its row (met = --good, unmet = --bad); inside a neutral line .y / .n force green / red. */
function kitMark(ok){return ok?'<span class="kmk y"><b>✓</b></span>':'<span class="kmk n"><b>✗</b></span>'}
window.kitMark=kitMark;
function kitMarkPaint(root){try{if(!root)return;if(root.nodeType===3)root=root.parentElement;if(!root||root.nodeType!==1||!root.isConnected)return;if(root.closest&&root.closest(".kmk,script,style,textarea,input,option,select,[data-nomark]"))return;
 if(!/[✓✔✗✘]/.test(root.textContent))return;/* play-time budget: most panels carry no mark at all, skip the walk */
 const W=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;return p&&/[✓✔✗✘]/.test(n.nodeValue)&&!p.closest(".kmk,script,style,textarea,input,option,select,title,[data-nomark]")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
 const L=[];while(W.nextNode())L.push(W.currentNode);
 for(const n of L){const v=n.nodeValue,f=document.createDocumentFragment();let last=0;v.replace(/[✓✔✗✘]/g,(m,i)=>{if(i>last)f.appendChild(document.createTextNode(v.slice(last,i)));const t=document.createElement("template");t.innerHTML=kitMark(m==="✓"||m==="✔");f.appendChild(t.content);last=i+1;return m});
  if(last<v.length)f.appendChild(document.createTextNode(v.slice(last)));n.parentNode.replaceChild(f,n)}}catch(e){}}
window.kitMarkPaint=kitMarkPaint;
(function(){const T="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M1.8 13.4c1.4-1.2 3.6-.8 5 1.2.3.4.6.9.8 1.3C10.4 11.2 15.4 5.4 22.4 2.4c-5.3 4.5-9.3 10.9-11.4 18.5-.4 1.4-2 1.7-2.9.5C6.5 18.2 4 15.7 1.8 13.4z'/%3E%3C/svg%3E\")",X="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 3.3c2.7.8 6.2 4.2 9.2 7.9 2.4 3 5.4 7.2 8.8 9.6-3.4-.4-7-3.6-9.8-7C8.3 10.7 5.3 6.6 3 3.3zM21 3.1c-2.8 2.9-5.6 5.8-8.1 9.3-2.4 3.3-5.3 6.2-9.4 8.3 2.5-3.5 4.7-6.7 7-10 2.4-3.4 5.4-6 10.5-7.6z'/%3E%3C/svg%3E\")";const st=document.createElement("style");st.id="kit-mark";
 st.textContent=`.kmk{display:inline-block;width:1.05em;height:1.05em;vertical-align:-.2em;margin:0 .12em 0 0;background:currentColor;-webkit-mask:${T} center/contain no-repeat;mask:${T} center/contain no-repeat;font-style:normal;line-height:1}
.kmk.n{-webkit-mask-image:${X};mask-image:${X}}.kmk>b{display:none}
.kmk.y{color:var(--good,#2d7a52)}.kmk.n{color:var(--bad,#c23b22)}
.g .kmk.y,.ok .kmk.y,.kok .kmk.y,.y .kmk.y{color:inherit}.r .kmk.n,.no .kmk.n,.n .kmk.n{color:inherit}`;document.head.appendChild(st)})();
/* KIT 48.3b (owner 11/16 15:00Z 2.6): inside a TEXT LINE the name wears the SAME rank tone as its title (not a second shade): copy the title's --rt to --rtn on the name block;
   `.kname{color:var(--rtn,…)}`. Her own name (.kmy) and "ngươi" (.kme) keep their ink. Painting captions keep their stage rule (higher-specificity CSS in jk4). */
function kitNameTone(root){try{if(!root||root.nodeType!==1)return;const L=root.matches&&root.matches(".kname")?[root]:[];root.querySelectorAll&&L.push(...root.querySelectorAll(".kname"));
 for(const n of L){if(n.style.getPropertyValue("--rtn")||n.classList.contains("kmy")||n.classList.contains("kme"))continue;const t=n.querySelector(":scope>.kti");const v=t&&t.style.getPropertyValue("--rt");if(v)n.style.setProperty("--rtn",v)}}catch(e){}}
window.kitNameTone=kitNameTone;
(function(){let q=0;const R=new Set();const run=()=>{q=0;const L=[...R].filter(n=>n&&n.isConnected);R.clear();/* review/lag-play-2: a root inside another queued root is walked once */for(const r of L)if(!L.some(m=>m!==r&&m.contains(r))){kitRankPaint(r);kitNameTone(r);kitMarkPaint(r)}};
 const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==="characterData")R.add(m.target.parentElement);else m.addedNodes.forEach(x=>R.add(x.nodeType===3?x.parentElement:x))}
  if(!q&&R.size)q=requestAnimationFrame(run)});
 const go=()=>{try{mo.observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}kitRankPaint(document.body);kitNameTone(document.body);kitMarkPaint(document.body)};
 if(document.body)go();else document.addEventListener("DOMContentLoaded",go)})();
