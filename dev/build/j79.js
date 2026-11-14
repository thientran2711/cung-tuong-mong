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
function kitPersonCol(p){try{if(typeof rivals!=="undefined"&&rivals.includes(p))return p.out?KIT_COLD_COL:RCOL[p.queen?7:cl(p.rank||0,0,7)];if(p===S)return S.out?KIT_COLD_COL:RCOL[cl(S.rank||0,0,7)];
 const d=kitDecor(kitFace(p));return d.col||"#8a7350"}catch(e){return"#8a7350"}}
function kitName(p,o){o=o||{};if(!p)return"";if(p===S&&o.named){const srv=typeof isSrv==="function"&&isSrv();return `<b class="kname" style="--rc:${kitPersonCol(S)}">${srv?"":`<span class="kti">${S.out?"Phế phi":RANKS[S.rank].n}</span> `}${S.name}</b>`}if(p===S)return `<b class="kname kme" style="--rc:${kitPersonCol(S)}">${o.cap?"Ngươi":"ngươi"}</b>`;
 const t=o.noTitle?"":kitTitle(p);const nm=S&&p===S.emp?"":S&&(p===S.thO||p.kind==="th")?"":(p.name||"");
 return `<b class="kname" style="--rc:${kitPersonCol(p)}">${t?`<span class="kti">${t}</span>${nm?" ":""}`:""}${nm}</b>`}
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
 return `<span class="kr"><span class="krl">${l}</span><span class="krv">${vals.map(x=>/^\s*<span class="(kchip|ef|kname)/.test(x)||/^\s*<b class="kname/.test(x)?x:`<span class="ef ${c||"n"}">${x}</span>`).join('<span class="ksep">·</span>')}</span></span>`}).join("")+`</span>`}
/* tiers / ladders: [{k:"30–59", n:"hại nhỏ", d:"Tung tin đồn, Dò la", on:true, c:"r"}] */
function kitTiers(list,o){o=o||{};const N=list.length;return `<div class="ktiers">${list.map((t,i)=>`<div class="ktier${t.on?" on":""}" style="--lv:${(i+1)/N}"><span class="ktk">${t.k}</span><span class="ktb"><b class="${t.c||""}">${t.n}</b>${t.d?`<small>${t.d}</small>`:""}</span>${t.on?`<span class="kchip n">${o.here||"đang ở"}</span>`:""}</div>`).join("")}</div>`}

/* ---------- facts: one fact per row (never a run-on paragraph) ---------- */
/* split an HTML run into sentences, keeping inline tags balanced across the cut */
function kpSentences(html){const toks=String(html||"").split(/(<[^>]+>)/);const out=[];let cur="",stack=[];
 const cut=()=>{const close=stack.slice().reverse().map(t=>`</${t.n}>`).join("");if(kpPlain(cur))out.push(cur+close);cur=stack.map(t=>t.o).join("")};
 for(const tk of toks){if(!tk)continue;if(tk[0]==="<"){const m=tk.match(/^<\s*(\/)?\s*([a-z0-9]+)/i);if(m){const n=m[2].toLowerCase();if(/^(br|img|hr)$/.test(n)){if(n==="br"){cut();continue}cur+=tk;continue}
    if(m[1]){const i=stack.map(x=>x.n).lastIndexOf(n);if(i>=0)stack.splice(i,1)}else if(!/\/>$/.test(tk))stack.push({n,o:tk})}cur+=tk;continue}
  const parts=tk.split(/(?<=[.!?])\s+(?=["“(]?[A-ZÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ0-9])/);
  parts.forEach((p,i)=>{cur+=p;if(i<parts.length-1)cut()})}
 if(kpPlain(cur))out.push(cur);return out.map(s=>s.trim()).filter(s=>kpPlain(s)&&kpPlain(s)!==".")}
/* text segments only (never inside a tag) */
function kpMapText(html,fn){return String(html).split(/(<[^>]+>)/).map(s=>s&&s[0]==="<"?s:fn(s)).join("")}
const KP_DELTA=/((?:[A-Za-zÀ-ỹĐđ]+ ){0,2}[A-Za-zÀ-ỹĐđ]+) ([+\-−])(\d+(?:[.,]\d+)?)(?![\d.,]*\d)(?!\s*[–-]\s*\d)/g;
function kpChipify(html){return kpMapText(html,s=>s.replace(KP_DELTA,(m,l,sg,n)=>{if(/^(năm|tháng|tuần|ngày|tuổi|lần|khắc)$/i.test(l.split(" ").pop()))return m;const v=(sg==="+"?1:-1)*parseFloat(n.replace(",","."));return kitChip(l,v)}))}
/* decorate the first mention of each person: rank title + name in rank colour (title not doubled) */
function kpPeopleIn(html,people){const who=[];let h=html;const plain=kpPlain(html);
 for(const [n,p] of people){if(!plain.includes(n)||who.includes(p))continue;who.push(p);let done=false;
  h=kpMapText(h,s=>{if(done)return s;const i=s.indexOf(n);if(i<0)return s;done=true;const t=kitTitle(p);let pre=s.slice(0,i);if(t&&pre.endsWith(t+" "))pre=pre.slice(0,-(t.length+1));return pre+kitName(p,{named:p===S})+s.slice(i+n.length)})}
 const lead=plain.replace(/^[^A-Za-zÀ-ỹĐđ]+/,"");
 if(/^(Hoàng thượng|Thánh thượng)/.test(lead)&&S&&S.emp&&!who.length)who.push(S.emp);
 if(/^Thái hậu/.test(lead)&&S&&!who.length)who.push(S.thO||{kind:"th"});
 if(!who.length&&/(^|\s)(ngươi|Ngươi)(\s|[.,!?]|$)/.test(plain))who.push(S);
 if(!who.length&&/Hoàng thượng|Thánh thượng/.test(plain)&&S&&S.emp)who.push(S.emp);
 if(!who.length&&/Thái hậu/.test(plain)&&S)who.push(S.thO||{kind:"th"});
 return [h,who]}
/* one fact object -> row.  fact = "html" | {who, text, chips:[[label,n]], why, when, kind:"me"|"person"|"world"} */
function kpFactRow(f,people){const SKIP=window.__kpSkip;if(typeof f==="string")f={text:f};let text=f.text||"",who=f.who?[].concat(f.who):null;
 if(f.auto!==false){let w;[text,w]=kpPeopleIn(text,people);if(!who)who=w;text=kpChipify(text)}
 const p=who&&who[0];const world=f.kind==="world"||!p;const face=p&&p!==SKIP?kitFaceH(p,"sm"):`<span class="kfdot" aria-hidden="true"></span>`;
 const chips=f.chips&&f.chips.length?kitChips(f.chips):"";
 return `<div class="kfact${world?" kfworld":""}${p===S?" kfme":""}">${face}<span class="kft">${f.when?`<small class="kfwhen">${f.when}</small>`:""}${text}${f.why?`<small class="kfwhy">Vì: ${f.why}</small>`:""}${chips}</span></div>`}
/* kitFacts(facts, {group:true|false, title}) -> rows; groups (Ngươi / Người trong cung / Triều đình · thiên hạ) when there are 4+ facts of 2+ kinds */
function kitFacts(facts,o){o=o||{};const people=kpPeople();let F=[];
 for(const f of (facts||[])){if(typeof f==="string"){kpSentences(f).forEach(s=>F.push({text:s}))}else if(f)F.push(f)}
 F=F.map(f=>{let t=f.text||"";const pl=kpPlain(t);let kind=f.kind;
  const mm=pl.match(/^(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:\s*/);if(mm){t=t.replace(/^((?:<[^>]+>)*)\s*(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:\s*/,"$1");kind=kind||"world"}
  return Object.assign({},f,{text:t,kind})});
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
 kitRows([["Chứng minh",e.proves||e.what,"t"],["Có được",[e.how,e.when].filter(Boolean).join(" · "),"n"]])+(e.acts&&e.acts.length?`<div class="kpacts">${e.acts.map(kitActMini).join("")}</div>`:"")+`</div>`}
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
 "Đức":"Tiếng hiền đức. Hoàng hậu cần Đức 50 (mẹ Thái tử 40). Làm việc ác bị lộ thì mất Đức.",
 "Sắc":"Nhan sắc. Giúp múa, thị tẩm và được Hoàng thượng để ý.",
 "Tài":"Tài học: đàn, thơ, chữ. Giúp hầu chuyện Hoàng thượng và thi tài.",
 "Tâm cơ":"Mưu trí, sự khôn khéo. Giúp dò la, bày mưu, nhìn thấu mưu của người khác.",
 "Tai mắt":"Số người ngầm báo tin cho ngươi khắp cung. Nhiều thì biết trước mưu hại, dễ có chứng cứ.",
 "Ân tình":"Tình nghĩa riêng giữa Hoàng thượng và ngươi, tích qua những đêm hầu hạ. Giữ sủng lâu, khó bị bỏ rơi.",
 "Sức":"Sức khỏe. Dưới 20 thì không làm được việc nặng; về 0 là bệnh nặng có thể chết.",
 "Bạc":"Tiền riêng của ngươi: bổng lộc hằng tháng, ban thưởng. Dùng để mua đồ, đút lót, thưởng kẻ hầu.",
 "Chủ tin":"Chủ nhân tin ngươi bao nhiêu (0–100). Cao thì được thưởng, tiến cử; dưới 10 dễ bị đày Tân Giả khố.",
 "Lòng":"Kẻ hầu trung thành với ngươi bao nhiêu (0–100). Dưới 45 dễ bị người khác mua chuộc.",
 "Ghen":"Người ấy ghen với ngươi bao nhiêu. Ghen cao thì dễ ra tay hại ngươi.",
 "Oán":"Người ấy oán hận ngươi bao nhiêu (vì ngươi từng hại họ). Oán cao thì dễ trả thù.",
 "Thù":"Như Oán: người ấy thù ghét ngươi bao nhiêu. Cao thì dễ trả thù.",
 "Thiện cảm":"Người ấy quý ngươi bao nhiêu (âm là ghét). Cao thì giúp đỡ, che chở ngươi.",
 "Chứng cứ":"Số bằng chứng ngươi đang giữ về lỗi của người ấy. Đủ thì tố giác được, khó bị cho là vu cáo.",
 "Nguy hiểm":"Mức một người muốn hại người khác: lấy Ghen, Oán hoặc ghét cao nhất, cộng tính nết.",
 "Quẻ":"Quẻ đầu tuần: vận may tuần này. Cát thì việc dễ thành hơn, Hung thì khó hơn. Gieo lại tốn 10 bạc và 1 khắc.",
 "Quẻ tuần":"Quẻ đầu tuần: vận may tuần này. Cát thì việc dễ thành hơn, Hung thì khó hơn.",
 "Phục vị":"Được trả lại phẩm vị cũ sau khi bị giáng hay vào lãnh cung.",
 "khắc":"Đơn vị thời gian: mỗi buổi có 4 khắc. Mỗi việc tốn khắc; hết khắc thì sang buổi sau.",
 "Thị tẩm":"Được gọi hầu Hoàng thượng qua đêm. Có thể có thai, tăng Sủng và Ân tình.",
 "Lật thẻ":"Mỗi tối Hoàng thượng lật thẻ bài để chọn người hầu đêm. Khả năng ngươi được chọn mỗi tuần.",
 "Lãnh cung":"Cung lạnh: nơi giam phi tần bị phế. Mất phẩm vị, chỉ có thể xin phục vị.",
 "Cấm túc":"Bị giữ trong cung của mình một thời gian, không được ra ngoài, không được lật thẻ.",
 "Bổng lộc":"Bạc phát đầu mỗi tháng theo phẩm vị (30–320 bạc).",
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
(function(){try{if(typeof HX==="object"){const map={tamco:"Tâm cơ",an:"Ân tình",mat:"Tai mắt",duc:"Đức",sac:"Sắc",tai:"Tài"};for(const k in map)HX[k]=`${map[k]}: ${KIT_GLOSS[map[k]].charAt(0).toLowerCase()+KIT_GLOSS[map[k]].slice(1)}`;HX.lot=KIT_GLOSS["Quẻ"]}}catch(e){}})();

/* ---------- popover (odds ladder, glossary): never a modal, never covers the scene for long; any tap closes ---------- */
function kpPop(anchor,html){let p=document.getElementById("kpop");if(!p){p=document.createElement("div");p.id="kpop";p.className="kpop";document.body.appendChild(p)}
 p.innerHTML=html;p.hidden=false;const r=anchor.getBoundingClientRect();const W=Math.min(300,innerWidth-24);p.style.width=W+"px";
 let x=Math.max(12,Math.min(innerWidth-W-12,r.left+r.width/2-W/2));p.style.left=x+"px";p.style.top="0px";const h=p.offsetHeight;let y=r.bottom+6;if(y+h>innerHeight-8)y=Math.max(8,r.top-h-6);p.style.top=y+"px"}
document.addEventListener("click",e=>{const p=document.getElementById("kpop");const od=e.target.closest(".kodm"),gl=e.target.closest(".kgl");
 if(od||gl){e.stopPropagation();e.preventDefault();if(od)kpPop(od,kitOddsLadder(+od.dataset.kodds));else kpPop(gl,`<div class="kpopt">${gl.dataset.kgl}</div><div class="kpopx">${KIT_GLOSS[gl.dataset.kgl]||""}</div>`);return}
 if(p&&!p.hidden)p.hidden=true},true);
/* the HUD standing chances use the same 7-step meter (no second scale) */
(function(){if(typeof renderHud2!=="function")return;const r0=renderHud2;renderHud2=function(){r0.apply(this,arguments);const el=$("hud2");if(!el||!S)return;
 const set=(k,lab,n)=>{const b=el.querySelector(`.hc[data-hx="${k}"]`);if(!b)return;const i=b.querySelector("i");b.innerHTML=`${lab} ${kitOdds(n,{label:lab})}`+(i?i.outerHTML:"");b.classList.add("khc")};
 try{set("con","Có thai",conceiveCh())}catch(e){}try{set("dem","Lật thẻ",nightCh())}catch(e){}}})();
if(typeof HX==="object"){HX.con="Mỗi lần được thị tẩm, cơ hội có thai (thang 7 bậc, từ Liều đến Nắm chắc). Tăng nhờ Sủng, Sắc, cầu tự, thuốc bổ; giảm theo tuổi.";HX.dem="Mỗi tuần, cơ hội Hoàng thượng lật thẻ bài của ngươi (thang 7 bậc). Tăng nhờ Sủng, Sắc; không có khi đang mang thai, bị cấm túc, bị rút thẻ hay ở lãnh cung."}

/* ---------- the PANEL ---------- */
/* kitPanel({kind, title, sub, subject:person|face, sections:[{h, html}|{h, facts}|{h, rows}], facts, rows, opts, btn, cls, onClose}) -> pushed to the modal queue.
   kind: rule | info | news | notice | choice | result | night | end | intel | threat | evidence | reward.  Returns the queue item. */
function kitPanel(spec,front){const m={t:spec.title||"",h:"",kit:spec,opts:spec.opts,btn:spec.btn,cls:spec.cls,who:spec.subject&&(spec.subject.src!==undefined?spec.subject:kitFace(spec.subject))||null,onClose:spec.onClose};
 if(front)Q.unshift(m);else Q.push(m);return m}
function kitModal(spec){const m=kitPanel(spec,true);showModal();return m}
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
 if(opts){opts.classList.add("kpopts");mb.appendChild(opts)}
 let ph=dlg.querySelector(":scope > .kph");if(ph)ph.remove();mt.hidden=true;dlg.insertAdjacentHTML("afterbegin",head);
 const mr=$("mr");const cb=mr&&mr.querySelector("#mclose");if(cb){cb.classList.add("kbtn");if(/^\s*(Đã rõ|OK|Xong)\s*$/.test(cb.textContent))cb.textContent="Đã hiểu"}}
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const M=$("modal");if(M&&!M.hidden&&Q[0]){const d=M.querySelector(".dlg");d.classList.remove("kpanel","kp-person");delete d.dataset.kind;const ph=d.querySelector(":scope > .kph");if(ph)ph.remove();kpBuild(M,Q[0])}}catch(e){console.error("kpBuild",e)}return r}})();

/* ---------- Cần row (j63 supplies it as .kr-why with ✓/✗ items): drawn as kit status chips here ---------- */
/* the second chance scale (Rất thấp…Rất cao) is retired: every standing chance or risk reads on the ONE 7-step ladder */
if(typeof chanceLvl==="function"){chanceLvl=function(n){return n<=0?"Không có":KIT_ODDS[kitOddsLv(n)]}}
/* ---------- the look ---------- */
(function(){const st=document.createElement("style");st.id="kp-css";st.textContent=`
:root{--k-hair:#e6d3ac;--k-lab:#8a7350;--k-card:#fffaf0;--k-card2:#f6ead6;--k-seal:#9a2c1c;--k-rad:8px}
/* panel frame */
.dlg.kpanel{padding:0;max-width:560px;background:var(--k-card);border:1px solid var(--gold);box-shadow:0 0 0 3px #f6ead6,0 0 0 4px #c9a46a,0 14px 40px #2a1a1260;overflow:auto}
.dlg.kpanel::before{display:none}
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
.kname{color:var(--rc,var(--ink));color:color-mix(in srgb,var(--rc,#2a1a12) 62%,#2a1a12);font-weight:700}.kname .kti{font-weight:600;font-size:.92em}
.kname.kme{color:var(--ink)}
.kchips{display:inline-flex;flex-wrap:wrap;gap:4px}
.kchip{display:inline-flex;align-items:baseline;gap:3px;font-size:.76rem;line-height:1.25;padding:1px 7px;border-radius:10px;border:1px solid var(--line);background:#fff;color:var(--dim);white-space:normal;overflow-wrap:anywhere;margin:1px 2px;vertical-align:baseline}
.kchip b{font-weight:700}.kchip.g{color:var(--good);border-color:#8fbf9f;background:#eef7f0}.kchip.r{color:var(--bad);border-color:#e3a497;background:#fcefeb}.kchip.n{color:var(--ink)}
.kpl{display:flex;align-items:center;gap:8px}.kplt{display:flex;flex-direction:column;min-width:0}.kplt small{color:var(--dim);font-size:.74rem}
/* facts */
.kfacts{display:flex;flex-direction:column}
.kfact{display:grid;grid-template-columns:34px minmax(0,1fr);gap:8px;align-items:start;padding:5px 0;border-bottom:1px dotted var(--k-hair)}
.kfact:last-child{border-bottom:0}
.kfact>.md{width:34px!important;height:34px!important;margin:0!important;position:static!important}
.kfdot{width:34px;height:34px;border-radius:50%;background:radial-gradient(circle,#c9a46a 0 4px,transparent 5px),url(img/kit/bg-default.webp) center/80px;border:1px solid var(--line);box-sizing:border-box}
.kft{font-size:.88rem;color:var(--ink);overflow-wrap:anywhere;align-self:center}.kft p{margin:0}
.kfwhen{display:block;color:var(--dim);font-size:.7rem}.kfwhy{display:block;color:var(--dim);font-size:.74rem}
.kintel{display:flex;flex-direction:column}.kint{display:grid;grid-template-columns:34px minmax(0,1fr);gap:8px;padding:5px 0;border-bottom:1px dotted var(--k-hair)}.kint>.md{width:34px!important;height:34px!important;margin:0!important}
.kisrc{display:block;color:var(--dim);font-size:.72rem}
/* rows inside panels: same grid as the act card */
.kpkb{font-size:.84rem}.kpkb .krl{padding-top:.18rem}
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
.kbtn.alt{background:var(--k-card);color:var(--ink);border-color:var(--line);box-shadow:none}
/* night / end keep their mood, same structure */
.modal.night .dlg.kpanel{background:#140b08;color:#f3e6cf;border-color:#6a3a28;box-shadow:0 0 0 3px #2a1610,0 0 30px #ff9a3c33}
.modal.night .dlg.kpanel .kph{background:linear-gradient(#2a1610f0,#140b08f0);border-color:#4a2a20;box-shadow:none}.modal.night .kptitle{color:#e9c07a}.modal.night .kpsub,.modal.night .kfwhen{color:#c8b89c}
.modal.night .kft{color:#f3e6cf}.modal.night .kfact{border-color:#4a2a20}.modal.night .kname{color:color-mix(in srgb,var(--rc) 55%,#fff)}
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
@media (max-width:599px){.dlg.kpanel{max-width:100%}.kpb.kphas{grid-template-columns:84px minmax(0,1fr);gap:9px}.dlg.kpanel .kph{padding:8px 10px}.dlg.kpanel #mb{padding:8px 10px 2px}.dlg.kpanel #mr{padding:4px 10px 10px}.kft{font-size:.84rem}.kpacts{grid-template-columns:1fr}.ktier{grid-template-columns:4.4rem minmax(0,1fr) auto}}
@media (min-width:1200px){.dlg.kpanel{max-width:620px}}
`;document.head.appendChild(st)})();

/* ---------- converted panels: the rule ladder (Thang nguy hiểm) as kit tiers ---------- */
(function(){if(typeof bandCard!=="function")return;bandCard=function(){const T=BANDS.map((b,i)=>({k:i<BANDS.length-1?`${b[0]}–${BANDS[i+1][0]-1}`:`${b[0]} trở lên`,n:i?`hại ${b[1]}`:"không ra tay",c:i?"r":"g",d:i?b[2].map(k=>ACT[k]?ACT[k].n:k).join(", "):""}));
 return `<div class="kpsec"><h4 class="kpst">Cách tính</h4>${kitRows([["Nguy hiểm",`${kitGloss("Ghen")}, ${kitGloss("Oán")} hoặc ghét: lấy số cao nhất`,"t"],["Cộng",[kitChip("Hiểm độc",10,"r"),kitChip("Hiền lành",-15,"g"),kitChip("Nhu mì",-10,"g")]],["Áp cho","mọi người, cùng một thang","n"]])}</div><div class="kpsec"><h4 class="kpst">Thang 4 mức</h4>${kitTiers(T)}</div><div class="kpsec"><h4 class="kpst">Ghi nhớ</h4><div class="kfacts">${["Trong mỗi mức, càng gần mức trên càng hay ra tay.","Ngươi hại ai thì Oán của người đó tăng và có thể leo lên mức trên."].map(t=>kpFactRow({text:t,kind:"world",auto:false},[])).join("")}</div></div>`}})();

/* ---------- week summary (dawn): same kit panel on the dawn sky; facts untruncated, deltas as chips ---------- */
KP_SEAL.week="TUẦN";
(function(){if(typeof dawn!=="function")return;dawn=function(){const sum=wkSummary();S.wkSnap=wkSnap();let w=$("dawn");if(!w){w=document.createElement("div");w.id="dawn";w.className="dawn";document.body.appendChild(w)}
 const dl=sum.D.filter(([,v])=>v).map(([k,v])=>kitChip(k,v));
 const secs=[];
 if(S.lot){const bad=LVB[S.lot.lv]<0||(S.lot.dom==="Hung"&&S.lot.lv>=3),good=LVB[S.lot.lv]>0;secs.push(`<div class="kpsec"><h4 class="kpst">${kitGloss("Quẻ tuần")}</h4>${kitRows([["Quẻ",`<span class="ef t">${LV[S.lot.lv]} · ${S.lot.dom}</span>`],["Lời quẻ",(LOTS[S.lot.i]||[])[2]||"","n"],["Tuần này",lotEffect(S.lot),bad?"r":good?"g":"n"]])}</div>`)}
 const me=[];if(sum.rank)me.push({text:`<b class="g">${sum.rank}</b>`,who:S});if(sum.kids>0)me.push({text:`Thêm ${sum.kids} con.`,who:S});
 secs.push(`<div class="kpsec"><h4 class="kpst">Tuần qua</h4>${dl.length?kitChips(dl):`<span class="kchip n">Chỉ số không đổi</span>`}${me.length?kitFacts(me,{group:false}):""}</div>`);
 const G=sum.groups.filter(g=>g[1].length);for(const [h,L] of G)secs.push(`<div class="kpsec"><h4 class="kpst">${h}</h4>${kitFacts(L,{group:false})}</div>`);
 if(!G.length&&!me.length)secs.push(`<div class="kpsec">${kitFacts([{text:"Một tuần yên ả.",kind:"world",auto:false}])}</div>`);
 w.innerHTML=`<div class="dsky"><i class="lan l1"></i><i class="lan l2"></i><i class="lan l3"></i><i class="sun"></i></div><div class="dbox kpanel kpdawn">${kpHeader("week",`Năm ${S.year} · Tháng ${S.month} · ${TUAN[S.tuan][0].toUpperCase()+TUAN[S.tuan].slice(1)}`,`${SEASON[S.month-1]}${S.wx?" · "+S.wx.n:""}`)}<div class="kpb"><div class="kpmain">${secs.join("")}</div></div><div class="kpfoot"><button class="kbtn" id="dawn-go">Vào ngày mới</button></div></div>`;
 w.hidden=false;w.classList.toggle("rm",reducedMotion());void w.offsetWidth;w.classList.add("on");setTimeout(bell,reducedMotion()?0:1400);
 const close=()=>{w.classList.remove("on");setTimeout(()=>{w.hidden=true},reducedMotion()?0:350);w.onclick=null};w.onclick=e=>{if(e.target.closest(".kodm,.kgl"))return;close()};const b=$("dawn-go");if(b)b.focus({preventScroll:true})}})();
(function(){const st=document.createElement("style");st.id="kp-dawn-css";st.textContent=`
.dawn .dbox.kpanel{position:relative;z-index:1;width:100%;max-width:560px;max-height:calc(100dvh - 32px);overflow:auto;background:var(--k-card);border:1px solid var(--gold);border-radius:10px;box-shadow:0 0 0 3px #f6ead6,0 0 0 4px #c9a46a,0 14px 40px #000a;padding:0;text-align:left;color:var(--ink)}
.dawn .dbox.kpanel .kph{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 14px 9px;background:linear-gradient(#f6ead6e6,#fffaf0f0),url(img/kit/bg-default.webp) center/240px repeat;border-bottom:1px solid var(--line)}
.dawn .dbox.kpanel .kpseal{background:#a8781c;border-color:#6e4d0e}
.dawn .dbox.kpanel .kpb{padding:10px 14px 4px}.dawn .kpfoot{display:flex;justify-content:flex-end;padding:6px 14px 12px}
@media (max-width:599px){.dawn .dbox.kpanel .kph{padding:8px 10px}.dawn .dbox.kpanel .kpb{padding:8px 10px 2px}.dawn .kpfoot{padding:6px 10px 10px}}
`;document.head.appendChild(st)})();

/* ---------- MINI-GAME FRAME (for j82 and the lesson games): header + how-to + score/timer + game box + result rows ---------- */
KP_SEAL.game="TÀI NGHỆ";
/* kitGameFrame({art:"Cầm", title:"Tấu khúc", how:"Chạm đúng dây khi nốt chạm vạch đỏ.", hud:[["score","Điểm",0],["time","Thời gian","30 giây"]], id:"kgbox"})
   -> HTML of the frame; the game draws into #<id> (.kgbox). Update a HUD cell with kitGameSet("score", 12). */
function kitGameFrame(g){g=g||{};return `<div class="kgame">${kpHeader("game",`${g.art?g.art+": ":""}${g.title||""}`,"")}`+
 (g.how?`<div class="kghow"><span class="krl">Cách chơi</span><span>${g.how}</span></div>`:"")+
 (g.hud&&g.hud.length?`<div class="kghud">${g.hud.map(([k,l,v])=>`<span class="kgc"><small>${l}</small><b data-kg="${k}">${v==null?"":v}</b></span>`).join("")}</div>`:"")+
 `<div class="kgbox" id="${g.id||"kgbox"}"></div><div class="kgres" id="${(g.id||"kgbox")}-res" hidden></div></div>`}
function kitGameSet(k,v){document.querySelectorAll(`[data-kg="${k}"]`).forEach(e=>e.innerHTML=v)}
/* kitGameResult({raw, talent, prep, total, place:"Nhất", of:4, rivals:[{who:person, score}], gains:[["Sủng",3]], losses:[["Sức",-10]], note})
   -> result block: score rows (true numbers), standings with face + rank title, Được / Mất chips. */
function kitGameResult(r){r=r||{};const rows=[];
 (r.parts||[]).forEach(([l,v])=>{const n=parseFloat(String(v).replace("−","-"));rows.push([l,isNaN(n)?`<span class="ef t">${v}</span>`:`<span class="ef ${n>0?"g":n<0?"r":"t"}"><b>${String(v)}</b></span>`])});
 if(r.raw!=null)rows.push(["Điểm chơi",`<span class="ef t">${r.raw}</span>`]);if(r.talent!=null)rows.push(["Tài nghệ",kitChip("cộng",r.talent,"g")]);if(r.prep!=null)rows.push(["Chuẩn bị",kitChip("cộng",r.prep,"g")]);
 if(r.total!=null)rows.push(["Tổng",`<span class="ef t"><b>${r.total}</b></span>`]);if(r.place)rows.push(["Hạng",`<span class="ef t">${r.place}${r.of?` / ${r.of}`:""}</span>`]);
 const st=(r.rivals||[]).slice().sort((a,b)=>b.score-a.score);
 return `<div class="kgr">${kitRows(rows)}`+(st.length?`<h4 class="kpst">Bảng điểm</h4><div class="kfacts">${st.map((x,i)=>`<div class="kfact${x.who===S?" kfme":""}">${kitFaceH(x.who,"sm")}<span class="kft kgrow"><span><b class="kgpl">${i+1}.</b> ${kitName(x.who,{cap:true})}${x.sub?`<small class="kfwhy">${x.sub}</small>`:""}</span><b>${x.score}</b></span></div>`).join("")}</div>`:"")+
 ((r.gains||[]).length||(r.losses||[]).length?`<h4 class="kpst">Kết quả</h4>`+kitRows([["Được",(r.gains||[]).map(x=>kitChip(x[0],x[1],"g"))],["Mất",(r.losses||[]).map(x=>kitChip(x[0],x[1],"r"))]]):"")+
 (r.note?`<div class="kpnote">${r.note}</div>`:"")+`</div>`}
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
.kgrow{display:flex;justify-content:space-between;gap:8px;align-items:center}.kgr .kpkb .krl{white-space:normal;max-width:9rem}
.kgbox .btn,.kgbtn{font-family:inherit;font-weight:600;background:var(--k-card);color:var(--ink);border:1px solid var(--line);border-radius:var(--k-rad);min-height:40px;padding:6px 12px;cursor:pointer}.kgbox .btn:hover,.kgbtn:hover{border-color:var(--gold)}.kgbtn.on,.kgbox .btn.on{background:#f0d07055;border-color:var(--gold)}.kgpl{color:var(--k-lab)}
#ov .mg.kpanel{padding:0;max-width:560px;background:var(--k-card);box-shadow:0 0 0 3px #f6ead6,0 0 0 4px #c9a46a,0 14px 40px #2a1a1260}
#ov .mg.kpanel .kph{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 14px 9px;background:linear-gradient(#f6ead6e6,#fffaf0f0),url(img/kit/bg-default.webp) center/240px repeat;border-bottom:1px solid var(--line)}
#ov .mg.kpanel .kpseal{background:#5a4a7a;border-color:#3a2e52}
#ov .mg.kpanel #mgb{padding:8px 14px}#ov .mg.kpanel>div:last-child{padding:0 14px 12px}
.kpseal.kp-game{background:#5a4a7a;border-color:#3a2e52}
@media (max-width:599px){.kgame .kghow,.kghud{padding-left:10px;padding-right:10px}.kgbox{margin:8px 10px}}
`;document.head.appendChild(st)})();

/* a "; " inside a price line joins two different values (a gain and a risk): split them so each lands in its own row and colour */
(function(){if(typeof kitParse!=="function")return;const k0=kitParse;kitParse=function(str){let s=String(str==null?"":str);if(!/class="kb/.test(s))s=s.split(/(<[^>]+>)/).map(x=>x&&x[0]==="<"?x:x.replace(/;\s+/g," · ")).join("");return k0.call(this,s)}})();
/* words that read as a gain / a risk for her even without a number */
(function(){if(typeof kcls!=="function")return;const k0=kcls;kcls=function(t){const s=String(t==null?"":t).replace(/<[^>]+>/g,"").trim();
 if(/(có thể |dễ )?(bị )?(lật tẩy|phát giác|bị lộ|bị bắt|bị phạt|bị nghi)/i.test(s)&&!/\+\s?\d/.test(s))return"r";if(/^(dễ được|được (thăm|ban|thưởng|sủng|để ý|gặp|mời))/i.test(s))return"g";return k0.apply(this,arguments)}})();

/* ---------- SCENE PANEL (identity card, opening story, title screen): compact, translucent, to one side (landscape) or the lower part (portrait),
   fits ONE screen with no scrolling, background art stays visible, each fact once, buttons always visible ---------- */
function kitTiles(list){return `<div class="ktiles">${list.map(([l,v,c])=>`<div class="ktile"><small>${kitGloss(l)}</small><b class="${c||""}">${v}</b></div>`).join("")}</div>`}
function kpIsScene(m){return !!(m&&(m.nl||/\bnlcard\b/.test(m.cls||"")||/^Nhập cung/.test(String(m.t||""))||(m.kit&&m.kit.scene)))}
function kpIdentity(M,m){const dlg=M.querySelector(".dlg"),mb=$("mb");const o=S.origin,srv=typeof isSrv==="function"&&isSrv();
 const pos=srv||o.k==="cnv"?"Cung nữ":RANKS[S.rank].n;const pts=typeof pdGet==="function"?pdGet():0;
 const opts=mb.querySelector(".nlopts");if(opts)opts.remove();
 const name=`<b class="kname" style="--rc:${srv?kitServCol("maid",1):RCOL[cl(S.rank||0,0,7)]}"><span class="kti">${pos}</span> ${S.name}</b>`;
 const tiles=[["Tài",S.tai],["Sắc",S.sac],["Tâm cơ",S.tamco],["Đức",S.duc],["Danh",S.danh],["Thái hậu ưa",S.th],["Bạc",S.bac],["Hoàng thượng",`${S.emp.era} · ${S.emp.age} tuổi`]];
 mb.innerHTML=`<div class="kpb kphas kpid"><div class="kpsubj">${pframe(pMe())}</div><div class="kpmain"><div class="kpidn">${name}<small>${o.n} · ${S.age} tuổi</small></div><div class="kpidt">${o.t||""}</div></div></div>${kitTiles(tiles)}<div class="kpnote">Thân phận đã định: tải lại trang, đổi ô hay bấm Kiếp mới vẫn ra thân phận này.</div>`;
 if(opts){opts.classList.add("kpopts","kpscopts");mb.appendChild(opts)}
 dlg.querySelector(":scope > .kph").outerHTML=kpHeader("end","Thân phận kiếp này",`${kitGloss("Phúc duyên")} đang có: ${pts}`)}
KIT_GLOSS["Phúc duyên"]="Điểm tích qua các kiếp. Dùng để đổi thân phận khi bắt đầu kiếp mới.";
(function(){const b0=kpBuild;kpBuild=function(M,m){b0.apply(this,arguments);try{const sc=kpIsScene(m);M.classList.toggle("kpscene",sc);if(!sc)return;
 M.querySelector(".dlg").classList.add("kpsc");if(m.nl&&typeof S!=="undefined"&&S&&S.origin)kpIdentity(M,m)}catch(e){console.error("kpScene",e)}}})();
(function(){const st=document.createElement("style");st.id="kp-scene-css";st.textContent=`
.modal.kpscene{align-items:flex-end;justify-content:center;padding:8px}
@media (min-aspect-ratio:1/1){.modal.kpscene{align-items:center;justify-content:flex-end;padding:12px 16px}}
.modal.kpscene .dlg.kpsc{max-width:min(560px,100%);width:100%;max-height:calc(100dvh - 16px);background:rgba(255,250,240,.90);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);animation:none}
@media (min-aspect-ratio:1/1){.modal.kpscene .dlg.kpsc{max-width:min(440px,44vw)}}
.modal.kpscene .dlg.kpsc .kph{background:linear-gradient(#f6ead6d8,#fffaf0d8);padding:7px 12px}
.modal.kpscene .dlg.kpsc #mb{padding:8px 12px 2px}
.dlg.kpsc .kpb.kphas{grid-template-columns:clamp(72px,22%,104px) minmax(0,1fr);gap:10px}
.dlg.kpsc .kpmain{gap:4px}.dlg.kpsc .kft{font-size:.82rem}.dlg.kpsc .kfact{padding:3px 0}
.kpidn{display:flex;flex-direction:column;font-size:1rem}.kpidn small{color:var(--dim);font-size:.78rem}.kpidt{font-size:.82rem;color:var(--ink);line-height:1.35}
.ktiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin:8px 0 6px}
.ktile{display:flex;flex-direction:column;align-items:flex-start;padding:3px 7px;border:1px solid var(--k-hair);border-radius:6px;background:#fffdf8d0;min-width:0}
.ktile small{font-size:.62rem;font-weight:700;color:var(--k-lab);text-transform:uppercase;letter-spacing:.02em}.ktile b{font-size:.86rem;color:var(--ink);overflow-wrap:anywhere;line-height:1.2}
.ktile:last-child:nth-child(4n+1),.ktile:nth-child(8){grid-column:span 1}
.dlg.kpsc .kpnote{font-size:.72rem;margin:0 0 4px}
.dlg.kpsc .kpscopts{display:grid!important;grid-template-columns:1fr 1fr!important;grid-auto-rows:1fr;gap:6px;margin:4px 0 8px}
.dlg.kpsc .kpfaces{display:flex;gap:6px;justify-content:flex-start}.dlg.kpsc .kpfaces figure{flex:0 1 92px;margin:0;max-width:92px}@media (max-width:599px){.dlg.kpsc .kpfaces figure{max-width:66px}}.dlg.kpsc .kpfaces figcaption{font-size:.7rem;text-align:center}
.dlg.kpsc .kpfaces figcaption small{display:block;color:var(--dim)}
@media (max-width:599px){.ktiles{grid-template-columns:repeat(4,minmax(0,1fr))}.ktile{padding:2px 5px}.ktile b{font-size:.8rem}.dlg.kpsc .kpb.kphas{grid-template-columns:70px minmax(0,1fr)}}
`;document.head.appendChild(st)})();
(function(){const st=document.createElement("style");st.id="kp-title-css";st.textContent=`
.title{align-items:flex-end!important;justify-content:center!important;padding:10px!important}
@media (min-aspect-ratio:1/1){.title{align-items:center!important;justify-content:flex-end!important;padding:16px 4vw!important}}
@media (max-width:599px),(max-height:820px){.title .tbox{padding:12px 14px!important}.title .tbox img{width:56px!important;height:56px!important;border-radius:12px!important}.title .tbox h1{font-size:1.4rem!important;margin:4px 0 0!important}.title .tbox .sub{font-size:.76rem!important;margin:0 0 6px!important}.title .slot{padding:5px 8px!important;margin:0 0 5px!important;gap:3px!important}.title .slot .main,.title .slot .btn{min-height:36px!important;padding:5px 10px!important}.title .past{font-size:.74rem!important}}
.title .tbox{max-width:min(440px,100%)!important;width:100%;max-height:calc(100dvh - 20px);overflow:auto;border:1px solid var(--gold)!important;border-radius:10px!important;box-shadow:0 0 0 3px #f6ead6cc,0 0 0 4px #c9a46a,0 10px 40px rgba(60,25,10,.35)!important;background:rgba(255,250,240,.90)!important}
`;document.head.appendChild(st)})();
/* "có thể chết" on scheme buttons -> the real death chance on the ONE ladder (same formulas as ACT.poison / kpoison / pond, j8) */
function kpDeathWord(p,who){return p<=0?`${who} không chết (có thuốc giải)`:`${who} chết: ${KIT_ODDS[kitOddsLv(Math.max(1,Math.round(p*100)))]}`}
function kpDeathP(k,v){try{const inv=x=>(x.inv||[]).some(e=>e.k===x.__k&&!e.h);const has=(p,key)=>(p.inv||[]).some(e=>e.k===key&&!e.h);
 if(k==="poison"){if(has(v,"giaidoc"))return 0;if(has(S,"hacdinh"))return v.suc<=120?1:0;let n=0;for(let i=0;i<30;i++)if(35+i>=v.suc)n++;return n/30}
 if(k==="kpoison"){const kid=tKid(v);if(!kid)return null;let n=0;for(let i=0;i<40;i++){const d=50+i;if((v.doctor?Math.round(d/2):d)>=kid.hp)n++}return n/40}
 if(k==="pond")return .45}catch(e){}return null}
(function(){if(typeof rvGroups!=="function")return;const g0=rvGroups;rvGroups=function(v){const G=g0.apply(this,arguments);try{for(const g of G)g[1]=g[1].map(h=>{const m=String(h).match(/data-a="(\w+)"/);if(!m)return h;const p=kpDeathP(m[1],v);if(p==null)return h;
  return String(h).replace(/,\s*có thể chết( đuối)?/g,(x,d)=>` · ${kpDeathWord(p,m[1]==="poison"?"nàng":"con nàng")}`)})}catch(e){}return G}})();
/* Cần: the Sức rule follows the live game rule (j80 SUC_FLOOR; one source, never a hard-coded 20) */
if(typeof kaTimeNeeds==="function"){kaTimeNeeds=function(c,bacCost,sucCost){const L=[];const left=4-used;L.push({t:`${c} khắc (còn ${left})`,ok:used+c<=4});
 const fl=typeof SUC_FLOOR!=="undefined"?SUC_FLOOR:20;if(c>1)L.push({t:`Sức ≥${fl} (có ${S.suc})`,ok:S.suc>=fl});if(bacCost>0)L.push({t:`Bạc ${bacCost} (có ${S.bac})`,ok:S.bac>=bacCost});return L}}
/* "có thể gặp người" (Lĩnh đồ, j42 srvMeet: 25 % bị bắt nạt Sức -5, else quen một người mới if anyone is left) -> real ladder words */
(function(){if(typeof srvCards!=="function")return;const c0=srvCards;srvCards=function(){const D=c0.apply(this,arguments);try{for(const a of D||[]){if(!a||!/có thể gặp người/.test(a.x||""))continue;
 let left=0;try{const m=srvM();left=allServ().filter(s=>ownerOf(s)!==m&&!S.srv.met.includes(s.sid)).length}catch(e){}
 a.x=a.x.replace(/có thể gặp người/,left?`quen một người mới: ${word(75)}`:"không còn ai mới để quen")+` · kèm: bị bắt nạt, Sức -5: ${word(25)}`}}catch(e){}return D}})();

/* ---------- ACT ART SLOT (kit 6.1): square illustration left of every act card, rows right ----------
   Manifest img/ACTS.json {acts:{"<card title>|<slug>":"<key>"}, have:["act-cat-hoc-tap", ...]} -> img/act-<key>.webp;
   no specific picture -> img/act-cat-<category>.webp; no file yet -> the neutral brocade tile with the category word. */
const KIT_ACT_CATS=[["hai-nguoi",/hạ độc|đẩy|vu |vu oan|trù ẻo|ngáng|hại|bỏ xạ|xạ hương|cài đồ|tráo|phá |chặn ngự giá|tố |bóc chuyện|ly gián|rút thẻ|mua chuộc/i],
 ["muu-ke",/dò la|mưu|tai mắt|tung tin|giấu|hối lộ|đút lót|lẻn|nghe lén|theo dõi|kế /i],["hoc-tap",/học|luyện|đọc|thêu|đàn|thơ|vẽ|họa|múa|cờ|sách|chữ/i],
 ["hau-ha",/hầu|dâng|chăm|phục dịch|quét|lau|lĩnh đồ|theo hầu|việc chủ|canh|nấu|pha trà/i],["nghi-ngoi",/nghỉ|ngủ|tắm|dưỡng|chải chuốt|giả bệnh|tĩnh dưỡng/i],
 ["buon-ban",/bán|mua|buôn|chợ|đổi|bạc/i],["le-nghi",/vấn an|thỉnh an|lễ|cầu|chùa|phật|xin xăm|cúng|bái/i],["giao-thiep",/thăm|tặng|kết|trò chuyện|mời|gặp|tâm sự|làm thân|nói/i],["di-lai",/đi |dạo|sang|ra |vào |đến /i]];
let KIT_ACTS={acts:{},have:[]};try{fetch("img/ACTS.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j){KIT_ACTS=j;try{document.querySelectorAll("button.ka.kcard[data-kart]").forEach(b=>{b.removeAttribute("data-kart");kpActArt(b)})}catch(e){}}}).catch(()=>{})}catch(e){}
const kpSlug=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function kitActCat(name){for(const [c,re] of KIT_ACT_CATS)if(re.test(name))return c;return"giao-thiep"}
function kitActArt(name){const A=KIT_ACTS.acts||{};const key=A[name]||A[kpSlug(name)];const cat=kitActCat(name);const have=KIT_ACTS.have||[];
 return{src:key?`img/act-${key}.webp`:have.includes("act-cat-"+cat)?`img/act-cat-${cat}.webp`:"",cat,label:(KIT_ACTS.cats||{})[cat]||{"hau-ha":"Hầu hạ","hoc-tap":"Học tập","giao-thiep":"Giao thiệp","muu-ke":"Mưu kế","hai-nguoi":"Hại người","nghi-ngoi":"Nghỉ ngơi","buon-ban":"Buôn bán","le-nghi":"Lễ nghi","di-lai":"Đi lại"}[cat]}}
function kpActArt(b){if(b.dataset.kart)return;const kan=b.querySelector(":scope > .kat > .kan");if(!kan)return;const name=kpPlain(kan.textContent);const a=kitActArt(name);b.dataset.kart=a.cat;
 let body=b.querySelector(":scope > .kabody");if(!body){body=document.createElement("span");body.className="kabody";[...b.childNodes].forEach(n=>{if(!(n.nodeType===1&&n.classList.contains("kaart")))body.appendChild(n)});b.appendChild(body)}
 let art=b.querySelector(":scope > .kaart");if(!art){art=document.createElement("span");art.className="kaart";b.prepend(art)}
 art.innerHTML=`<span class="kaph">${a.label}</span>`+(a.src?`<img src="${a.src}" alt="" loading="lazy" onerror="this.remove()">`:"");b.classList.add("kart")}
(function(){if(typeof kaNorm1!=="function")return;const n0=kaNorm1;kaNorm1=function(b){n0.apply(this,arguments);try{if(b.classList.contains("ka")&&b.classList.contains("kcard"))kpActArt(b)}catch(e){}}})();
(function(){const st=document.createElement("style");st.id="kp-art-css";st.textContent=`
:root{--kas:88px}@media (max-width:1199px){:root{--kas:76px}}@media (max-width:599px){:root{--kas:64px}}
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
@media (max-width:599px){.cards:has(> button.ka){grid-template-columns:1fr!important}}
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
