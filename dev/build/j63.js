/* ================= j63 ACT CARD (kit): ONE layout for every act card, person-card act, dialog option and action button =================
   [title row: name ............ odds chip]
   Cần     every condition with live status (✗ unmet red, ✓ met green)
   Tốn     price: time (dark), resources (red)
   THÀNH / BẠI (kit-thanh-bai s34, owner 17/11 ~17:10Z): a roll act shows TWO blocks, each with its own Được / Mất / Kèm rows; Tốn (paid either way) sits ONCE above
   both blocks; a sure act shows ONE block (THÀNH). Kèm (others' feelings, side risks) sits inside the block it belongs to. Source strings keep "thành:" / "hỏng:"
   (alias "bại:") as INPUT labels; the player only sees THÀNH / BẠI.
   Ghi chú notes (neutral, small)
   Empty rows are left out; rows are always in this order; a value is placed by meaning: a gain is green and in Được, a loss is red.
   kitParse() now returns these rows; kaNorm() rebuilds every button of the game into the frame (cards, .pcb, .opt, .btn, .rbtn). Spec: dev/kit/KIT.md "Act card". */
const KA_ROWS=[["why","Cần"],["ton","Tốn"],["duoc","Được"],["mat","Mất"],["kem","Kèm"],["note","Ghi chú"]];
const KA_ODDS=new RegExp("^("+KIT_ODDS_ALT+")$");
/* "chờ N khắc" (parallel time, jptime: the khắc the person sent is away) sits in the Tốn row beside the order khắc */
const KA_TIME=/^(?:[●○]+\s*)?(?:chờ\s+)?\d+(?:\s*[-–]\s*\d+)?\s*(khắc|việc)$/i;
const KA_STAT=/^(Bạc|Hồi môn|Sức|Sủng|Danh|Đức|Sắc|Tài|Tâm cơ|Tai mắt|Ân tình|Thai)\s*-\s?\d/;
const kaPlain=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
/* sentiment of one value for her: g gain, r loss, n neutral word */
const kaWord=h=>String(h).replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${n}`).replace(/thân -(\d+)/g,"quý ngươi -$1").replace(/thân \+(\d+)/g,"quý ngươi +$1");
function kaSent(h,old){const s=kaPlain(h);if(!s)return"n";if(old!=="g"&&old!=="r"){const lo=s.match(/^(Áp lực hôn sự|Lời đồn)\s*([+−-])\s?\d/);if(lo)return lo[2]==="+"?"r":"g"}/* kit-cost-rows-home: pressure / rumour — less is better (j1 KLOW) */if(old==="g"||old==="r")return old; /* kit-rows-b KP12: the writer's explicit class g/r beats the word-meaning colouring */let c="n";try{c=kcls(String(h).replace(/<b>[^<]*<\/b>/g,"x"))}catch(e){} /* an unclassed <b>item name</b> never colours the row (e.g. "Son phần giáng") */
 /* sign wins: a value whose only number is negative is a loss for her (unless it is harm to a rival or less hostility) */
 if(c!=="r"&&/[-−]\s?\d/.test(s)&&!/\+\s?\d/.test(s)&&!/(^|\s)(nàng|con nàng|của nàng|hắn)(\s|$)/.test(s)&&!/(ghen|oán|thù|nghi)\s*[-−]/.test(s))c="r";return c}
/* split one value "X +1 (note)" into value + trailing note */
function kaSplitNote(h){const s=kaPlain(h);const m=s.match(/^(.*\S)\s+(\([^()]*\))$/);if(m&&/[+-]\s?\d/.test(m[1])&&!/[<>]/.test(h))return[m[1],m[2]];return[h,""]}
/* read the old kit HTML (odds chip, kl labels, ef values, kwhy) into a model */
function kaModel(html){const t=document.createElement("template");t.innerHTML=String(html||"");const M={odds:"",oddsX:"",items:[]};let lab="",afterOdds=false,bl="";
 const push=(h,old,l)=>{h=kaWord(h);const p=kaPlain(h);if(!p||p==="·")return;
  const lm=p.match(/^(được ngay|ngay|tốn|thành|được|hỏng|bại|mất|kèm)\s*:\s*/i);if(lm&&!/</.test(h)){l=lm[1].toLowerCase();if(l==="bại")l="hỏng";h=p.slice(lm[0].length);if(!h)return}
  else if(/</.test(h)){/* kit-rows-b KP21(1): a coloured item that starts with a label («kèm: <span class="g">…</span>») — strip the label from the html, keep the tags, route by the label */const lh=h.match(/^((?:\s*<[^>]+>)*)\s*(được ngay|ngay|tốn|thành|được|hỏng|bại|mất|kèm)\s*:\s*/i);if(lh){l=lh[2].toLowerCase();if(l==="bại")l="hỏng";h=lh[1]+h.slice(lh[0].length);if(!kaPlain(h))return}}
  if(!M.odds&&KA_ODDS.test(p)){M.odds=p;return}
  const ll=l==null?lab:l;if(ll==="thành"||ll==="hỏng")bl=ll;M.items.push({h,old,l:ll,b:ll==="kèm"?(bl||""):ll==="thành"||ll==="hỏng"?ll:""})};
 const walk=nodes=>{for(const n of nodes){
  if(n.nodeType===3){const s=n.textContent;if(s.trim()&&s.trim()!=="·"){kSplitTop(s,/\s·\s/y).forEach(x=>push(x.trim(),"n"))}continue}
  if(n.nodeType!==1)continue;const cl=n.classList;
  if(cl.contains("oc")){M.odds=n.textContent.trim();afterOdds=true;continue}
  if(cl.contains("ksep"))continue;
  if(cl.contains("kl")){lab=n.textContent.trim().toLowerCase();if(lab==="bại")lab="hỏng";if(lab==="thành"||lab==="hỏng")bl=lab;afterOdds=false;continue}
  if(cl.contains("kwhy")){const w=kaPlain(n.innerHTML).replace(/[\s—-]+$/,"");if(w)M.items.push({h:w,old:"r",l:"why"});continue}
  if(cl.contains("ef")){const old=cl.contains("g")?"g":cl.contains("r")?"r":"n";if(afterOdds&&!lab){M.oddsX+=n.outerHTML;afterOdds=false;continue}afterOdds=false;push(n.innerHTML,old);continue}
  if(n.tagName==="BR")continue;
  if(n.tagName==="SPAN"&&!n.className||cl.contains("kgrid")||cl.contains("krow")||n.tagName==="SMALL"){walk(n.childNodes);continue}
  afterOdds=false;push(n.outerHTML,"n")}};
 walk(t.content.childNodes);return M}
/* read a raw line 'word · tốn: … · thành: … · hỏng: … · note' (segments keep whether they continue a label) */
function kaModelStr(str){str=String(str||"").replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${n}`).replace(/thân -(\d+)/g,"quý ngươi -$1").replace(/thân \+(\d+)/g,"quý ngươi +$1").trim();
 const M={odds:"",oddsX:"",items:[]};let lab="",bl="";const segs=kSplitTop(str,/ · /y);
 for(const s0 of segs){const plain=kaPlain(s0);if(!plain)continue;
  if(!M.odds&&KA_ODDS.test(plain)){M.odds=plain;continue}
  if(/^Quẻ: /.test(plain)&&M.odds){const r=plain.slice(5);M.oddsX+=`<span class="ef ${/khó hơn/.test(r)?"r":/dễ hơn/.test(r)?"g":"n"}">Quẻ: ${r}</span>`;continue}
  let s=s0,cont=true;const ml=s.match(/^\s*(?:<[^>]+>)*\s*(được ngay|ngay|tốn|thành|thắng|được|hỏng|bại|mất|kèm)\s*:\s*/i);
  if(ml){lab=ml[1].toLowerCase();if(lab==="thắng"||lab==="được")lab="thành";if(lab==="mất"||lab==="bại")lab="hỏng";if(lab==="thành"||lab==="hỏng")bl=lab;if(lab==="được ngay")lab="ngay";cont=false;s=s.slice(ml[0].length);
   const open=(ml[0].match(/<(span|b)[^>]*>/g)||[]).length;if(open&&/^\s*</.test(ml[0])){const tg=ml[0].match(/<(span|b)( class="(g|r)")?[^>]*>/);s=(tg?tg[0]:"")+s}}
  else{const m2=plain.match(/^tốn (\d+ khắc)$/);if(m2){M.items.push({h:m2[1],old:"n",l:"tốn",cont:false,b:""});continue}}
  for(let v of [].concat(...kSplitTop(s,/; /y).map(q=>/(^|\s)nàng(\s|$)/.test(kaPlain(q))?[q]:kSplitTop(q,/, /y)))){const vp=kaPlain(v);if(!vp)continue;const om=v.match(/^\s*<(?:span|b) class="(g|r)"/);M.items.push({h:/^\s*<(span|b) class="[gr]">[^<]*<\/\1>\s*$/.test(v)?vp:v.trim(),old:om?om[1]:"n",l:lab,cont,b:lab==="kèm"?bl:lab==="thành"||lab==="hỏng"?lab:""})}}
 /* ODDS CAP: a Nắm chắc act that names no failure (a formerly-sure act, kitCapLine / capW hints) fails softly — say so (one form, kitSoftW) */
 if(M.odds&&M.odds===capW()&&!M.items.some(i=>i.l==="hỏng"))M.items.push({h:kitSoftWb(M.items.some(i=>i.l==="tốn"&&/Bạc\s*[-−]/.test(kaPlain(i.h)))),old:"r",l:"hỏng",cont:false,b:"hỏng"});
 return M}
/* ONE rule (kit-option-rows s34): a line that says nothing is never shown — "không được mất gì", "không được không mất", "không mất không được", "không được gì", "không mất gì" */
const KA_NOTHING=/^(chắc chắn · )?(không (được )?(không )?mất( không được)? gì|không được không mất|không mất không được|không được gì|không mất gì)( thêm)?\.?$/i;
const KA_RISK=/^(có thể bị|bị người của nàng phát giác|bị lộ|bị khám|Đức \d+ → \d+|dễ lộ|có khi bị)/i;
/* place every value in its row by meaning */
function kaRows(M){const R={why:[],ton:[],duoc:[],mat:[],kem:[],note:[],one:true};
 /* kaEfTag(html): add .kef1 to a pre-built «<span class="ef X">…</span>» item whose text is a stat unit (used by kitRows info rows, j79) */
function kaEfTag(x){x=String(x);return /^\s*<span class="ef [^"]*"/.test(x)&&!/kef1/.test(x.slice(0,60))&&kaUnit(x)?x.replace(/^(\s*<span class="ef [^"]*)"/,'$1 kef1"'):x}
/* kit-thanh-bai: every Được / Mất / Kèm value carries its block b: "t" THÀNH, "b" BẠI, "a" gained either way ("được ngay"); Cần / Tốn / Ghi chú carry none (Tốn = paid either way, shown once above both blocks).
    A sure act (no roll, nothing under "hỏng") has ONE block: every b collapses to "t". */
 const real=h=>{const p=kaPlain(h);return p&&!KA_NOTHING.test(p)};
 /* a no-roll card with a hỏng part is ONE block when it has no thành part (only a certain loss: "Cáo bệnh, không dự" Danh -1 — nothing to win, nothing to fail); with both parts it still shows both */
 const sure0=!M.odds,hasBad=M.items.some(it=>(it.l==="hỏng"||it.b==="hỏng")&&real(it.h)),hasWin=M.items.some(it=>it.l==="thành"&&real(it.h));
 const sure=sure0&&(!hasBad||!hasWin);R.one=sure;
 const add=(r,h,c,b)=>{b=(r==="why"||r==="ton"||r==="note")?"":sure||!b?"t":b;if(!R[r].some(x=>kaPlain(x.h)===kaPlain(h)&&x.b===b))R[r].push({h,c,b})};
 /* kit-rows-b KP21(2): a labelled value «a, Chủ tin với X +3» is split at the top-level «;» / «, » (not inside a clause about «nàng»), each piece routed alone — a pure gain inside a Kèm goes to Được, and a long list is one short line per value */
 const SPL=it=>{if(it.sp||!/^(kèm|hỏng|thành|ngay)$/.test(it.l||""))return[it];const parts=[].concat(...kSplitTop(it.h,/; /y).map(q=>/(^|\s)nàng(\s|$)/.test(kaPlain(q))?[q]:kSplitTop(q,/, /y))).map(x=>x.trim()).filter(x=>kaPlain(x));return parts.length>1?parts.map(h=>Object.assign({},it,{h,sp:1})):[it]};
 for(const it of [].concat(...M.items.map(SPL))){let [h,nt]=kaSplitNote(kRangeW(it.h));if(nt)add("note",nt,"n");const p=kaPlain(h);if(!p)continue;if(KA_NOTHING.test(p))continue; /* owner 11/15: a line that says nothing is not shown */const c=kaSent(h,it.old);const neu=KNEU.test(p);const l=it.l||"";const cont=!!it.cont;
  const kb=it.b==="hỏng"?"b":it.b==="thành"?"t":c==="r"?"b":"t";/* a Kèm belongs to the block label written before it; none → a bad thing is BẠI */
  if(/[+−-]\s?0(?![\d.,])/.test(p)&&!/[+−-]\s?(0[.,]\d*[1-9]|[1-9])/.test(p)){add("note",p.replace(/\s?[+−-]\s?0(?![\d.,])/g," không đổi"),"n");continue}
  if(l==="why"){add("why",h,"r");continue}
  if(/^\(.*\)$/.test(p)){add("note",h,"n");continue}
  if(KA_TIME.test(p)){add("ton",p.replace(/^[●○]+\s*/,""),"t");continue}
  if(KA_RISK.test(p)&&!(l==="hỏng"&&!cont)){add("kem",h,"r",l==="thành"?"t":l==="kèm"?kb:"b");continue}
  if(l==="tốn"&&!cont){if(neu)add("ton",h,"n");else if(c==="g")add("duoc",h,"g","t");else if(/\d/.test(p)&&(c==="r"||/[-−]\s?\d/.test(p)))add("ton",h,"r");else add("kem",h,"r","b");continue}
  if(l==="ngay"&&!cont){if(neu)add("note",h,"n");else if(c==="r")add("ton",h,"r");else add("duoc",h,"g","a");continue}
  if(l==="thành"){if(neu)add("note",h,"n");else if(c==="r")add(sure&&KA_STAT.test(p)?"ton":/[-−]\s?\d/.test(p)?"mat":"kem",h,"r","t");else if(c==="n"&&cont&&!/\d/.test(p)&&/(nếu|có khi|tang vật)/.test(p))add("note",h,"n");else add("duoc",h,"g","t");continue}
  if(l==="hỏng"&&!cont){const g=c==="g"&&/\+\s?\d/.test(p)&&!/-\s?\d/.test(p);add(g?"duoc":"mat",h,/^không (được )?mất gì$/i.test(p)?"n":g?"g":"r","b");continue}
  if(l==="hỏng"&&cont){if(c==="r")add("kem",h,"r","b");else add("note",h,"n");continue}
  if(l==="kèm"){if(c==="g")add("duoc",h,"g",kb);else add("kem",h,neu?"n":"r",kb);continue}/* owner 11/15: a positive never sits on the red Kèm line */
  /* unlabelled or after tốn */
  if(neu){add("note",h,"n");continue}
  if(c==="g"){add("duoc",h,"g","t");continue}
  if(c==="r"){if(KA_STAT.test(p))add("ton",h,"r");else add("kem",h,"r","b");continue}
  add("note",h,"n")}
 /* an empty Mất row ("không mất gì") is never shown (kit owner #2): sure acts and safe failures simply have no Mất row */
 {const E=KA_NOTHING;R.mat=R.mat.filter(x=>!E.test(kaPlain(x.h).trim()));R.duoc=R.duoc.filter(x=>!E.test(kaPlain(x.h).trim()))}/* owner 11/15 08:00Z: "không được gì" is no loss either */
 if(R.ton.length>1)R.ton=R.ton.filter(x=>!/^không(\s|$)/i.test(kaPlain(x.h)));
 R.why=R.why.map(x=>({h:kaWhyCut(x.h),c:"r"}));const wt=R.why.map(x=>kaPlain(x.h).toLowerCase());R.note=R.note.filter(x=>!wt.some(w=>w.includes(kaPlain(x.h).toLowerCase())));
 return R}
function kaWhyCut(h){return String(h).split(/\s·\s(?=(?:thành|hỏng|kèm|tốn|được)\s*:)/i)[0].replace(/[\s·—-]+$/,"")}
function kaOdds(M){if(!M.odds)return"";/* review/odds-no-unknown: only the 7 ladder words exist (law 7); a rolled option names its odds by p (j17 oddsLead) */return oddsChip(M.odds)+M.oddsX}
/* owner 11/15 05:50Z: a GHI CHÚ that only repeats CẦN ("(chỉ buổi tối)" when CẦN shows "Buổi tối") is dropped — a note must add real information */
function kaNoteDedup(R){try{if(!R.note||!R.note.length)return;const why=R.why.map(x=>kaPlain(x.h).toLowerCase()).join(" ");
 R.note=R.note.filter(x=>{const p=kaPlain(x.h).toLowerCase().replace(/^[(\s]+|[)\s.]+$/g,"");const m=p.match(/^(?:chỉ )?(buổi (?:sáng|trưa|chiều|tối))$/);return !(m&&why.includes(m[1]))})}catch(e){}}
const KA_BLK=[["duoc","Được"],["mat","Mất"],["kem","Kèm"]];
function kaRowH(k,lab,L,b){return `<span class="kr kr-${k}${b?" kb-"+b:""}"><span class="krl">${lab}</span><span class="krv">${L.map(x=>k==="why"?`<span class="kwhy${x.c==="g"?" kok":""}">${x.c==="g"?"✓":"✗"} ${String(x.h).replace(/^[✓✗]\s*/,"")}</span>`:`<span class="ef ${x.c}${kaUnit(x.h)?" kef1":""}">${x.h}</span>`).join('<span class="ksep">·</span>')}</span></span>`}
/* K-EF-UNIT (KIT_REQUESTS 21/11 econ-tamco RE-CHECK #2): a STAT item («Bạc -94», «Tâm cơ -3», «Sủng +2», «2 khắc») is ONE unbreakable unit on every option/act card row — it never splits «Bạc» / «-94» at a line end; items still wrap as wholes. Long word items keep wrapping. */
/* r3 perf (LAND CHAIN 2 QC): one result per item text, cached — the same items are re-rendered every render()/buổi (5.8k calls ≈ 86 ms at CPU x4 before) */
function kaUnit(h){const C=kaUnit.c||(kaUnit.c=new Map()),k=String(h);let v=C.get(k);if(v===undefined){if(C.size>3000)C.clear();v=kaUnit0(k);C.set(k,v)}return v}
function kaUnit0(h){const t=kaPlain(h).trim();return t.length<=28&&(/^[\p{L}][\p{L}\s]{0,22}(?:\s*[+\-−]\s?|\s)\d+(?:\s*khắc)?$/u.test(t)||/^\d+\s*khắc$/u.test(t)||/^[\p{L}][\p{L}\s]{0,22}\s\d+\s*→\s*\d+(\s*\([+\-−]\d+\))?$/u.test(t))}
/* kit-thanh-bai: [Cần][Tốn] once, then THÀNH block (Được/Mất/Kèm), then BẠI block; a sure act (R.one) has the THÀNH block only; an empty BẠI says so in one dim line */
function kaBody(R,dis){kaNoteDedup(R);const one=R.one!==false;let h="";
 for(const [k,lab] of [["why","Cần"],["ton","Tốn"]])if(R[k].length)h+=kaRowH(k,lab,R[k]);
 {const A=R.duoc.filter(x=>x.b==="a");if(A.length)h+=kaRowH("duoc","Được ngay",A,"a")}
 if(one){const rows=KA_BLK.map(([k,lab])=>[k,lab,R[k].filter(x=>x.b==="t")]).filter(r=>r[2].length);h+=rows.map(([k,lab,L])=>kaRowH(k,lab,L,"t")).join("")}
 else for(const b of ["t","b"]){
  /* kit-thanh-bai r4 (owner 17/11): NO head rows. A rolled card's gain/loss row of each block is labelled THÀNH (green, replaces Được) / BẠI (red, replaces Mất); Được+Mất of one block share that one row; Kèm keeps its own row after it */
  let L=[...R.duoc.filter(x=>x.b===b),...R.mat.filter(x=>x.b===b)];if(dis&&b==="t")L=L.filter(x=>x.c!=="r");
  h+=L.length?kaRowH(b==="t"?"thanh":"bai",b==="t"?"Thành":"Bại",L,b):`<span class="kr kr-none kr-${b==="t"?"thanh":"bai"} kb-${b}"><span class="krl">${b==="t"?"Thành":"Bại"}</span><span class="krv"><span class="ef n">${b==="t"?"Không được gì thêm":"Tốn công, không được gì"}</span></span></span>`;
  const K=R.kem.filter(x=>x.b===b);if(K.length)h+=kaRowH("kem","Kèm",K,b)}
 if(R.note.length)h+=kaRowH("note","Ghi chú",R.note);
 return `<small class="kb${dis?" kbdis":""}">`+h+`</small>`}
/* kitParse: same input, kit rows out (odds chip first, the frame moves it to the title row) */
(function(){const kp0=kitParse;kitParse=function(str){const s=String(str||"");if(/class="kb/.test(s))return s;const M=kaModelStr(typeof sgTxt==="function"?sgTxt(s):s)/* SG-CARD: her literal Sủng drawn as applied (j1 sgTxt) */;const R=kaRows(M);const o=kaOdds(M);return (o?`<span class="kodds">${o}</span>`:"")+kaBody(R).replace(/^<small class="kb">/,'<span class="kb">').replace(/<\/small>$/,"</span>")}})();
/* ---------- the frame: rebuild a button into [title + odds] + rows ---------- */
const KA_SEL="button.kcard,.pcb button,.rbtn button,button.btn,button.opt,.opts button,.srvb button";
function kaNorm1(b){if(b.classList.contains("kquick"))return;/* KIT §13.6: the quick button keeps its own one look (never an option card) */if(b.dataset.ka==="1"){const kan=b.querySelector(":scope > .kat > .kan");if(kan)[...b.childNodes].reverse().forEach(n=>{if(n.nodeType===1&&!n.matches(".kat,.klead,.kb,.kinfo"))kan.prepend(n)});return}if(b.closest(".hud2,#hud2,.tabs,.mapnav"))return;
 const isCard=b.classList.contains("kcard");const sm=isCard?null:[...b.children].find(c=>c.tagName==="SMALL");
 if(!isCard&&!sm)return;
 b.dataset.ka="1";const dis=b.disabled;
 let titleH="",leadH="",bodyHTML="",extraTime=[];
 if(isCard){const h4=b.querySelector("h4"),kt=b.querySelector(".ktime"),p=b.querySelector(":scope > p");
  titleH=h4?h4.innerHTML:"";leadH=p?p.innerHTML:"";
  const parts=[];if(kt){const tt=kaPlain(kt.innerHTML).replace(/^[●○]+\s*/,"");tt.split(/\s·\s/).forEach(x=>{if(KA_TIME.test(x))extraTime.push(x);else if(x)parts.push(`<span class="ef n">(${x.toLowerCase()})</span>`)})}
  [...b.querySelectorAll(":scope > .kwhy")].forEach(w=>parts.push(w.outerHTML));
  const kr=b.querySelector(".krow"),kg=b.querySelector(".kgrid");bodyHTML=(kr?kr.innerHTML:"")+(parts.length?'<span class="kl">note</span>'+parts.join(" "):"")+(kg?kg.outerHTML:"");}
 else{const pre=[];for(const n of [...b.childNodes]){if(n===sm)break;pre.push(n)}
  const post=[];let seen=false;for(const n of [...b.childNodes]){if(n===sm){seen=true;continue}if(seen)post.push(n)}
  const box=document.createElement("span");pre.forEach(n=>box.appendChild(n));titleH=box.innerHTML.trim();
  const pb=document.createElement("span");post.forEach(n=>pb.appendChild(n));bodyHTML=sm.innerHTML+(pb.textContent.trim()?" · "+pb.innerHTML:"");}
 let M,R,odds="";
 if(/class="kb/.test(bodyHTML)){const t=document.createElement("template");t.innerHTML=bodyHTML;const od=t.content.querySelector(".kodds");odds=od?od.innerHTML:"";
  /* already rows: re-read them (adds a kwhy that was inserted later) */
  R={why:[],ton:[],duoc:[],mat:[],kem:[],note:[],one:!t.content.querySelector(".kr-bai,.kr-none.kb-b")};
  t.content.querySelectorAll(".kr").forEach(r=>{const k0=[...r.classList].find(c=>c.startsWith("kr-")).slice(3);if(k0==="none")return;const tb=k0==="thanh"||k0==="bai";const k=tb?"duoc":k0;if(!R[k])return;const bb=r.classList.contains("kb-b")?"b":r.classList.contains("kb-a")?"a":r.classList.contains("kb-t")?"t":"";r.querySelectorAll(".krv>.ef,.krv>.kwhy").forEach(e=>R[tb&&e.classList.contains("r")?"mat":k].push({b:bb,h:k==="why"?e.innerHTML.replace(/^[✓✗]\s*/,""):e.innerHTML,c:k==="why"?(e.classList.contains("kok")?"g":"r"):e.classList.contains("g")?"g":e.classList.contains("r")?"r":e.classList.contains("t")?"t":"n"}))});
  t.content.querySelectorAll(".kwhy").forEach(w=>{if(!w.closest(".kr-why")){const x=kaPlain(w.innerHTML).replace(/[\s—-]+$/,"");if(x&&!R.why.some(y=>y.h===x))R.why.push({h:x,c:"r"})}});}
 else{M=kaModel(bodyHTML);R=kaRows(M);odds=kaOdds(M)}
 extraTime.reverse().forEach(x=>R.ton.unshift({h:x,c:"t"}));R.why=R.why.map(x=>({h:kaWhyCut(x.h),c:"r"}));{const wt=R.why.map(x=>kaPlain(x.h).toLowerCase());R.note=R.note.filter(x=>!wt.some(w=>w.includes(kaPlain(x.h).toLowerCase())))}if(R.ton.length>1)R.ton=R.ton.filter(x=>!/^không(\s|$)/i.test(kaPlain(x.h)));
 let needs=null;try{needs=b.dataset.kneed?JSON.parse(decodeURIComponent(b.dataset.kneed)):null}catch(e){}
 if(needs&&needs.length){const kn=t=>kaPlain(t).replace(/^[✓✗]\s*/,"").toLowerCase().replace(/^cần\s+/,"").replace(/\s*\(có [^)]*\)$/,"").trim();const un=needs.filter(n=>!n.ok).map(n=>kn(n.t));const gen=/^(chưa đủ điều kiện|hết khắc|sức dưới 20|chỉ buổi|đã qua|đang cấm túc|đã làm trong buổi|đã mất|ở lãnh cung)/i;
  const extra=R.why.filter(w=>{const x=kn(w.h);if(w.c==="g")return false;if(un.length&&gen.test(x))return false;return !un.some(u=>u.includes(x)||x.includes(u))});
  R.why=[...needs.filter(n=>!n.ok).map(n=>({h:n.t,c:"r"})),...extra.map(w=>({h:w.h,c:"r"})),...needs.filter(n=>n.ok).map(n=>({h:n.t,c:"g"}))]}
 /* owner 09:40Z (KIT 31.11): never the same fact twice. A Cần item that is only "afford the cost" (Bạc) goes: the Tốn line already
    shows the cost; when she is short, Tốn says so in red ("thiếu bạc, có N"). Cần keeps only conditions that are not the cost. */
 let costOnly=false;{const tb=R.ton.find(x=>/Bạc\s*[-−]\s*\d+/.test(kaPlain(x.h)));if(tb){const isCost=w=>/^(✗\s*)?(thiếu bạc|không đủ bạc|cần bạc|chưa đủ bạc|bạc\s*[-−]?\s*\d+(\s*\(có -?\d+\))?$|cần \d+ bạc)/i.test(kaPlain(w.h).trim());
   const had=R.why.filter(isCost);if(had.length){R.why=R.why.filter(w=>!isCost(w));if(had.some(w=>w.c!=="g")){R.ton.push({h:`thiếu bạc (có ${typeof S!=="undefined"&&S?S.bac:0})`,c:"r"});costOnly=true}}}}
 if(dis&&!costOnly&&!R.why.some(x=>x.c!=="g")){let w="";try{w=typeof guessWhy==="function"?guessWhy(b):""}catch(e){}if(w)R.why.push({h:w,c:"r"})}
 const kinfo="";
 b.classList.add("ka");b.classList.toggle("kdis",dis);
 b.innerHTML=`<span class="kat"><span class="kan">${titleH||"&nbsp;"}</span>${odds?`<span class="kodds">${odds}</span>`:""}</span>`+(leadH?`<span class="klead">${leadH}</span>`:"")+kaBody(R,dis)+kinfo}
function kaNorm(root){try{(root||document).querySelectorAll(KA_SEL).forEach(b=>{try{kaNorm1(b);if(typeof kitNoUnkDom==="function")kitNoUnkDom(b)}catch(e){console.error("kaNorm",e)}})}catch(e){}}
/* disabled state can change after build: keep the class honest */
let kaQ=false;const kaMO=new MutationObserver(ms=>{if(kaQ)return;let hit=false;for(const m of ms){if(m.type==="attributes"){const b=m.target;if(b.classList&&b.classList.contains("ka"))b.classList.toggle("kdis",b.disabled);continue}if(m.addedNodes.length){hit=true}}if(hit){kaQ=true;queueMicrotask(()=>{kaQ=false;kaNorm(document)})}});
kaMO.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["disabled"]});
(function(){const kf=kitFix;kitFix=function(root){kf.apply(this,arguments);kaNorm(root)}})();
/* ---------- the look (scoped to .ka act cards / options) ---------- */
(function(){const st=document.createElement("style");st.id="ka-css";st.textContent=`
button.ka{display:flex!important;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:3px;text-align:left;background:var(--k-card,#fffaf0);border:1px solid var(--line);border-radius:8px;padding:6px 9px 7px!important;color:var(--ink);font-family:inherit;font-size:.82rem;line-height:1.3;min-height:0;height:auto!important;max-height:none!important;overflow:visible!important;white-space:normal!important;box-shadow:inset 0 0 0 1px #fff8,0 1px 0 #d9c49a55}
button.ka:hover:not(:disabled){border-color:var(--gold)}
button.ka .kat{display:flex;align-items:flex-start;gap:6px;justify-content:space-between;padding-bottom:3px;border-bottom:1px solid #e6d3ac}
button.ka .kan{flex:1 1 auto;min-width:0;display:block;font-weight:700;color:var(--ink);overflow-wrap:anywhere}
button.ka .kan .md{display:inline-flex!important;position:static!important;margin:0 4px 0 0!important;vertical-align:middle}button.ka .kan .ic{vertical-align:middle}button.ka .kan .md.xs{width:22px!important;height:22px!important}button.ka .kan .ic{flex:0 0 auto}
button.ka .kodds{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:1px}
button.ka .kodds .oc{margin:0;white-space:nowrap;text-align:center}
button.ka .kodds .ef{font-size:.68rem;text-align:right}
button.ka .klead{display:block;font-size:.76rem;color:var(--dim);line-height:1.3}
.kb{display:grid;grid-template-columns:max-content minmax(0,1fr);column-gap:7px;row-gap:2px;text-align:left;align-content:start}.kb .kr{display:contents}.kb .krl{font-size:.64rem;font-weight:700;color:#8a7350;text-transform:uppercase;white-space:nowrap;padding-top:.12rem}.kb .krv{min-width:0;overflow-wrap:anywhere}.kb .ef.g{color:var(--good)}.kb .ef.r{color:var(--bad)}.kb .ef.t{color:var(--ink)}.kb .ksep{color:#b9a27a;margin:0 4px}.kb .kr-why .krl,.kb .kwhy{color:var(--bad)}
button.ka small.kb{display:grid!important;grid-template-columns:3.4rem minmax(0,1fr);column-gap:7px;row-gap:2px;font-size:.76rem!important;line-height:1.35!important;color:var(--ink);margin:0;align-content:start}
button.ka .kr{display:contents}
button.ka .krl{font-size:.64rem;font-weight:700;letter-spacing:.02em;color:#8a7350;text-transform:uppercase;padding-top:.12rem;white-space:nowrap}
button.ka .krv{min-width:0;overflow-wrap:anywhere}
button.ka .krv .ef{font-weight:600}
button.ka .krv .ef.kef1,.kr .krv .ef.kef1{white-space:nowrap}
/* rv-kit-ef-unit FAIL fix: the §6.3 square-card / compact-card / Fold rules (jk4 kitCompactCSS «small.kb>.kr>.krv>*{white-space:normal!important}», jk4 .kpabox, j79 .art …) set normal !important on EVERY value item of .kart / .kopt cards, so the unit split again. ONE rule that wins over the whole family: !important + an id-weighted :is() (specificity 1,x,x, matches the same elements) so no card host can undo it; overflow-wrap normal so «anywhere» cannot cut inside the unit either. */
.kr>.krv>.ef.kef1:is(#kef1-unit,.kef1),.kr .krv .ef.kef1:is(#kef1-unit,.kef1){white-space:nowrap!important;overflow-wrap:normal!important;word-break:normal!important}
button.ka .krv .ef.g{color:var(--good)}
button.ka .krv .ef.r{color:var(--bad)}
button.ka .krv .ef.t{color:var(--ink);font-weight:600}
button.ka .krv .ef.n{color:var(--dim);font-weight:400}
.kb .krv .ef.i{color:var(--dim);font-weight:500;font-style:italic}/* KIT 28.6 kitHintRow: the word hint of an event option (also the kit sample page) */
button.ka .krv .ksep{color:#b9a27a;margin:0 4px}
button.ka .kr-why .krl{color:var(--bad)}
button.ka .kr-why .kwhy{color:var(--bad);font-weight:600;display:inline}button.ka .kr-why .kwhy.kok{color:var(--good);font-weight:500}button.ka .kr-why .krl{color:#8a7350}
button.ka .kr-note .krv{font-size:.7rem}
button.ka .kr-note .krv .ef{color:var(--dim);font-weight:400}
button.ka.kdis,button.ka:disabled{opacity:1!important;background:#eee7da!important;border-color:#d4c8b2;cursor:default;filter:none}
button.ka.kdis .kan,button.ka:disabled .kan{color:#7d7263}
button.ka.kdis .kodds,button.ka:disabled .kodds{filter:grayscale(1);opacity:.7}
button.ka.kdis .kr-mat,button.ka.kdis .kr-kem,button.ka.kdis .kr-bai,button.ka:disabled .kr-mat,button.ka:disabled .kr-kem,button.ka:disabled .kr-bai{display:none}
/* kit-thanh-bai: the THÀNH / BẠI block heads (full grid row) and their rows; a disabled card shows no BẠI block (same rule as its hidden Mất / Kèm) */
/* r4: no head rows — the row label itself is THÀNH (green) / BẠI (red); label column LEFT, value RIGHT at every size */
.kb .kr-thanh .krl{color:var(--good);font-weight:800}.kb .kr-bai .krl{color:var(--bad);font-weight:800}
.kb .kr-none.kr-thanh .krl{color:var(--good)}.kb .kr-none.kr-bai .krl{color:var(--bad)}
.kb .kr-duoc.kb-a .krl{white-space:normal;line-height:1.1}
.kb .kr-none .ef{color:var(--dim);font-weight:400;font-style:italic}
button.ka.kdis .kr.kb-b,button.ka:disabled .kr.kb-b{display:none}
button.ka.kdis .krv .ef.g,button.ka.kdis .krv .ef.r,button.ka.kdis .krv .ef.t{opacity:.75}
button.ka.kcard{border-radius:8px}
button.ka.kcard .kan{font-family:var(--title,inherit);font-size:calc(var(--kfs,.82rem) + .12rem)}
button.ka.kcard small.kb,button.ka.kcard .klead{font-size:var(--kfs,.8rem)!important}
button.ka.kcard .kinfo{display:none}
.cards:has(> button.ka){display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;grid-auto-rows:1fr!important;gap:8px!important;align-items:stretch}
.cards>button.ka.kcard{width:auto!important;min-width:0!important;flex:none!important}
.pcb:has(> button.ka){grid-template-columns:repeat(auto-fill,minmax(230px,1fr))!important;grid-auto-rows:1fr;align-items:stretch;gap:5px!important}
.opts:has(> button.ka){display:grid!important;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));grid-auto-rows:1fr;gap:6px;align-items:stretch}
.rbtn:has(> button.ka){display:grid!important;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));grid-auto-rows:1fr;gap:6px;align-items:stretch}
.opts>button.ka,.pcb>button.ka,.cards>button.ka,.rbtn>button.ka{height:auto!important;min-height:100%!important}
/* kv:(max-width:1199px) */.cards:has(> button.ka){grid-template-columns:repeat(2,minmax(0,1fr))!important}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();
/* ================= RESULT CARD (kit): after every act/choice — [seal THÀNH/BẠI | act name] · one sentence · Được (green) · Mất (red, grouped per person) · "Xem đầy đủ ở Nhật ký" =================
   Built from REAL deltas (snapshot before → now), never from the option preview: no ranges, no "có thể"; two-way relations merged into one plain phrase. */
const KA_RANKRE=new RegExp("("+RANKS.map(r=>r.n).join("|")+")\\s*$","i");
function kaWho(v){const r=v&&RANKS[v.rank];return (r&&v!==S?r.n+" ":"")+(v&&v.name||"")}
function kaTitled(s){for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||!v.name||!s.includes(v.name)||!RANKS[v.rank])continue;const rn=RANKS[v.rank].n;s=s.split(v.name).map((x,i,a)=>i<a.length-1&&!KA_RANKRE.test(x)?x+rn+" ":x).join(v.name)}return s}
const kaN=n=>(n>0?"+":"−")+Math.abs(n);
function kaSentence(before){if(window.__kaSenOvr){const o=window.__kaSenOvr;window.__kaSenOvr=null;return kaTitled(o)}/* review person-dialog-restore: an act that only logs (greet) passes its own line (the oldest span line is the ambient weather line) */const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-before.seq));const L=S.logs.slice(0,n).reverse().map(h=>plain((typeof kShort==="function"?kShort(h):String(h)).replace(/<span class="ld">[^<]*<\/span>/,"")));/* the result card = the SHORT form (jvoice kShort, owner 16/11 ~21:05Z) */
 const ok=L.filter(t=>t&&!/→/.test(t)&&!/(thành|hỏng|bại|kèm|tốn|được ngay)\s*:/i.test(t)&&!/\+\d+\.\.\d/.test(t)&&!/^\[/.test(t)&&!/\b(Thành|Hỏng|Bại)\.\s*·/.test(t)&&!/(^|\s)có thể\s/.test(t));
 if(!ok.length)return"";const P=ok[0].split(kRx("(?<=[.!?…])\\s+(?=[A-ZÀ-Ỹ\"“])",""));let s=P[0];if(s.length<40&&P[1])s+=" "+P[1];return kaTitled(s)}
/* owner 11/15: other people's feelings (ghen / oán of the consorts) are not HER gains or losses — they go to a separate KÈM line,
   collapsed ("12 phi tần ghen thêm 8"), tap to see who; a person she has not met is "người chưa quen" (no name) */
function kaNamed(v){try{return v===S||typeof k61Named!=="function"||k61Named(v)}catch(e){return true}}
/* KIT PART kitWhy (KIT 7, owner 18/11 09:03Z): every result line says SHORTLY WHY. ONE source = the Sổ ghi lines of this span (S.logs since before.seq),
   never a second wording: a clause "lead: … Sức +10" gives the lead; a person is matched by name in the log; no log clause → the act's own title →
   a short fixed cause per stat (KA_WHYD). Never a colon, never a % — it stays one short phrase after the value ("Sức +18 · nghỉ qua đêm"). */
const KA_WHYD={suc:{"+":"nghỉ ngơi","-":"mệt vì việc trong cung"},sung:{"+":"được Hoàng thượng để mắt","-":"lâu không được gặp Hoàng thượng"},bac:{"+":"bổng lộc và quà tặng","-":"chi tiêu trong cung"},danh:{"+":"tiếng lành đồn xa","-":"tiếng không hay đồn ra"},duc:{"+":"giữ nết tốt","-":"lỡ lời lỡ việc"},sac:{"+":"chăm dưỡng nhan sắc","-":"nhan sắc kém đi"},tai:{"+":"luyện thêm tài nghệ","-":"bỏ bê tài nghệ"},tamco:{"+":"thêm kinh nghiệm cung đình","-":"bớt cảnh giác"},tin:{"+":"được tin cậy","-":"mất lòng tin"}};
const KA_WHYM="chuyện trong cung";const KA_WHYBAD=/^(thành|hỏng|bại|không thành|thành công|thất bại)[.!]?$/i;
function kaWhyClip(t){t=String(t||"").replace(/\s+/g," ").replace(/[:：]/g," ").replace(/\s*\([^)]*\)\s*$/,"").replace(/[\s.!?…·,;]+$/,"").trim();if(!t)return"";t=t.charAt(0).toLocaleLowerCase("vi")+t.slice(1);if(t.length>44){t=t.slice(0,44);const i=t.lastIndexOf(" ");t=(i>20?t.slice(0,i):t).replace(/[\s,;]+$/,"")+"…"}return t}
function kaWhyCl(before){try{const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-before.seq));const out=[];for(const h of S.logs.slice(0,n).reverse()){const t=plain(String(h).replace(/<span class="ld">[^<]*<\/span>/,""));for(const s of t.split(kRx("(?<=[.!?…])\\s+(?=[A-ZÀ-Ỹ\"“])",""))){for(const c of s.split(/\s·\s/))if(c.trim())out.push(c.trim())}}return out}catch(e){return[]}}
function kaWhyLead(c,i){const m=c.match(/^([^:]{3,50}):\s/);return m&&!/^Vì sao/i.test(m[1])&&!/→|\d/.test(m[1])&&!KA_WHYBAD.test(m[1].trim())?m[1]:null}
/* stat line: the clause of the log that states this stat's change */
function kaWhyStat(C,nm,d,title,key){const re=new RegExp("(^|[^\\p{L}])"+nm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*(?:[+−-]\\s*\\d|\\d+\\s*→)","u");const sg=d>0?"+":"-";
 let c=C.find(x=>re.test(x));let r=c&&kaWhyLead(c);
 if(!r&&key==="bac"){c=C.find(x=>/[+−-]\s*\d+\s*bạc/i.test(x)&&(d>0)===!/[−-]\s*\d+\s*bạc/i.test(x));r=c&&kaWhyLead(c)}
 if(!r&&title&&!/^Trong cung vừa qua$/.test(title))r=title;
 if(!r&&KA_WHYD[key])r=KA_WHYD[key][sg];
 return kaWhyClip(r||KA_WHYM)}
/* person line: "Vì sao: <name>: <why> → …" first, then the log sentence that names her (strangers: "chưa quen biết …"), then the act title */
function kaWhyWho(C,v,named,title){try{const nm=v&&v.name;const subj=named&&nm?nm:null;
 const vs=subj&&C.find(x=>/^Vì sao:/i.test(x)&&x.includes(subj));if(vs){const m=vs.replace(/^Vì sao:\s*/i,"").replace(subj,"").replace(/^[^:]*?:\s*/,"").replace(/\s*→.*$/,"");if(m.trim().length>3)return kaWhyClip(m)}
 const hit=C.find(x=>!/^Vì sao:/i.test(x)&&!/→/.test(x)&&(subj?x.includes(subj):/chưa quen biết/.test(x)));
 if(hit){let t=hit;if(subj)t=t.replace(new RegExp("^.*?"+subj.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*"),"");else t=t.replace(/^.*?chưa quen biết\s*/,"").replace(/^[Mm]ột vị (Hoàng quý phi|Hoàng hậu|Quý phi|Quý nhân|Thường tại|Đáp ứng|Phi|Tần|phi tần|cung nữ|thái giám|Thị vệ|Thái y)\s*/,"");t=t.replace(/\s*\(.*$/,"");if(t.length>3){const c=kaWhyClip(t);if(c&&!KA_WHYBAD.test(c))return c}}
 }catch(e){}
 return kaWhyClip(title&&!/^Trong cung vừa qua$/.test(title)?title:KA_WHYM)}
function kaWhyHtml(r){return r?`<span class="kwy"> · ${r}</span>`:""}
function kaResultRows(before,title){const G=[],B=[];const K=[];const skip=new Set();const WC=kaWhyCl(before);
 const q=typeof queenP==="function"?queenP():null;const R=before.rel||{};
 const per=[];const U={g:[],b:[]};/* [who, goodParts, badParts] */
 for(const v of (typeof rivals!=="undefined"?rivals:[])){const b=R[v.id];if(!b)continue;const a=aff(v,S),m=aff(S,v),e=v.ev||0,g=v.ghen||0,o=Math.round(oan(v,S));const gp=[],bp=[];
  let da=a-b.a,lo=b.a,hi=a;if(v===q&&q!==S&&before.hh!=null){const dh=(S.hh||0)-before.hh;if(dh){skip.add("hh");if(!da){da=dh;lo=before.hh;hi=S.hh||0}}}
  /* hotfix 11/15: the real before→after, never the bare word "thiện cảm" */
  if(da)(da>0?gp:bp).push(`${da>0?"quý ngươi hơn":"ghét ngươi hơn"} (${lo}→${hi}, ${kaN(da)})`);else if(m!==b.m)(m>b.m?gp:bp).push(`ngươi ${m>b.m?"quý nàng hơn":"bớt ưa nàng"} (${b.m}→${m}, ${kaN(m-b.m)})`);
  if(g!==b.g)K.push({v,k:"ghen",d:g-b.g});
  if(o!==b.o)K.push({v,k:"oán",d:o-b.o});
  if(e!==b.e)(e>b.e?gp:bp).push(`chứng cứ về nàng ${kaN(e-b.e)}`);
  if(gp.length||bp.length){if(kaNamed(v))per.push([kaWho(v),gp,bp,kaWhyWho(WC,v,true,title)]);else{/* name-mask: strangers are ONE aggregate row per direction, never "<tước> ???" rows */if(gp.some(t=>/^(quý ngươi|ngươi quý)/.test(t)))U.g.push(v);if(bp.some(t=>/^(ghét ngươi|ngươi bớt)/.test(t)))U.b.push(v)}}}
 {/* the ONE shared list helper kitNameList: all strangers -> "N vị chưa quen biết" */if(U.g.length)per.push([kitNameList(U.g),["quý ngươi hơn"],[],kaWhyWho(WC,null,false,title)]);if(U.b.length)per.push([kitNameList(U.b),[],["ghét ngươi hơn"],kaWhyWho(WC,null,false,title)])}
 for(const [k,nm] of RKEYS){if(skip.has(k))continue;const now=S[k]||0,d=now-(before[k]||0);if(!d)continue;
  if(k==="th"||k==="hh"){const who=k==="th"?"Thái hậu":(q&&q!==S?kaWho(q):"Hoàng hậu");per.push([who,d>0?[`quý ngươi hơn (${before[k]}→${now}, ${kaN(d)})`]:[],d<0?[`ghét ngươi hơn (${before[k]}→${now}, ${kaN(d)})`]:[],kaWhyWho(WC,k==="th"?{name:"Thái hậu"}:(q&&q!==S?q:{name:"Hoàng hậu"}),true,title)]);continue}
  {const up=typeof kGood==="function"?kGood(k,d):d>0;(up?G:B).push(`<span class="ef ${up?"g":"r"}">${nm} ${before[k]}→${now} (${kaN(d)})</span>`+kaWhyHtml(kaWhyStat(WC,nm,d,title,k)))}}
 if(S.maid&&before.maid!=null&&S.maid.loyal!==before.maid){const d=S.maid.loyal-before.maid;(d>0?G:B).push(`<span class="ef ${d>0?"g":"r"}">Thiện cảm ${S.maid.name} ${before.maid}→${S.maid.loyal} (${kaN(d)})</span>`+kaWhyHtml(kaWhyStat(WC,"Thiện cảm",d,title,"maid")))}
 for(const [who,gp,bp,why] of per){const W=kaWhyHtml(why);if(gp.length)G.push(`<span class="ef t">${who}:</span> <span class="ef g">${gp.join(", ")}</span>${W}`);if(bp.length)B.push(`<span class="ef t">${who}:</span> <span class="ef r">${bp.join(", ")}</span>${W}`)}
 K.why=WC;K.ttl=title;
 return [G,B,K]}
/* KIT PART kitKemRow(K) (KIT 7 + 28.6, kit sample page): the KÈM line of a result — other people's feelings, one summary per kind and
   direction ("12 phi tần ghen thêm 8" / "3 phi tần bớt oán 2–5"), the names behind a tap (.kkem.on); K = [{v, k:"ghen"|"oán", d}] */
/* the reason of a KÈM line (ghen / oán of the others): a Sổ ghi clause naming that feeling, else the act title, else the fixed cause */
const KA_WHYK={ghen:{"+":"lời đồn về ngươi lan ra","-":"lòng ghen nguôi dần theo ngày"},"oán":{"+":"chuyện cũ chưa nguôi","-":"oán nguôi dần theo ngày"}};
function kaWhyKem(K,k,up){try{const C=K.why||[];const c=C.find(x=>new RegExp("(^|[^\\p{L}])"+k+"\\s*(?:[+−-]\\s*\\d)","u").test(x));const r=c&&kaWhyLead(c);if(r)return kaWhyClip(r);const t=K.ttl;if(t&&!/^Trong cung vừa qua$/.test(t))return kaWhyClip(t);return KA_WHYK[k][up?"+":"-"]}catch(e){return""}}
function kitKemRow(K){if(!K||!K.length)return"";const grp={};for(const x of K){const key=x.k+(x.d>0?"+":"-");(grp[key]=grp[key]||[]).push(x)}
 const parts=Object.entries(grp).map(([key,L])=>{const up=key.endsWith("+"),k=key.slice(0,-1);const ds=L.map(x=>Math.abs(x.d));const lo=Math.min(...ds),hi=Math.max(...ds);
  const amt=lo===hi?`${lo}`:`${lo}–${hi}`;const verb=up?`${k} thêm ${amt}`:`bớt ${k} ${amt}`;
  const names=L.map(x=>`${kaNamed(x.v)?kaWho(x.v):"người chưa quen"} ${up?"+":"−"}${Math.abs(x.d)}`);
  const wy=kaWhyHtml(kaWhyKem(K,k,up));return `<span class="kkem" role="button" tabindex="0" aria-expanded="false"><span class="kkems">${L.length} ${L.length>1?"phi tần":"người"} ${verb}</span>${wy}<span class="kkeml">${names.join(" · ")}</span></span>`});
 return `<span class="kr kr-kem"><span class="krl">Kèm</span><span class="krv">${parts.join('<span class="ksep">·</span>')}</span></span>`}
const kaKemHTML=kitKemRow;
/* KIT PART oddsSoft(n,c) — the ONE soft failure of a formerly-sure act (ODDS CAP, owner 17/11 ~17:35Z "việc chắc ăn mà hỏng thì chỉ hỏng nhẹ"):
   the act rolled at the cap (BAL.odds.hi) and failed: of its cost only the effort (BAL.odds.softFail.spend: Sức) is spent, never the bạc
   (owner 17:10Z (1)) nor Danh / Đức…; nothing is gained, no other loss. Writes the one BẠI line to the log and returns it (window.__oddsSoft holds it for the caller's card). The khắc of the act
   are spent by its caller as before. kitSoftW(c) = the same words for the act's own hint ('hỏng: …' of a Nắm chắc act, optLine / kitCapLine). */
function oddsSoftCost(c){const o={};for(const k of BAL.odds.softFail.spend)if(c&&c[k]<0)o[k]=c[k];return o}
function kitSoftW(c){return kitSoftWb(!!(c&&c.bac<0))}
function kitSoftWb(hasBac){return `chỉ uổng công${hasBac&&!BAL.odds.softFail.spend.includes("bac")?", không mất bạc":""}, không mất gì khác`}
function oddsSoft(n,c){apply(oddsSoftCost(c));const t=`<span class="r">bại</span> — người tính không bằng trời tính: ${kitSoftW(c)}.`;window.__oddsSoft=t;log(`${n?n+": ":""}${t}`);return t}
/* a formerly-sure option of a dialog / button (no o): its hint starts with the cap word and ends with the soft 'hỏng' (ONE line form) */
function kitCapLine(rest,c){return [capW(),rest,"hỏng: "+kitSoftW(c)].filter(Boolean).join(" · ")}
/* a formerly-sure BUTTON act (pbtn / kitActMini…): its attrs carry capAt(BAL key {k,suc}, bạc) = data-cap / data-capsuc / data-capbac, and its hint kitCapLine(…).
   ONE capture listener rolls it at the cap BEFORE its own handler; a failure stops the click and is the one soft failure (oddsSoft):
   the khắc and the Sức it names are spent, nothing else. Bots never click (they call the act functions, which roll themselves). */
function capAt(K,bac){K=K||{};return ` data-cap="${K.k||0}"${K.suc>0?` data-capsuc="${K.suc}"`:""}${bac>0?` data-capbac="${bac}"`:""}`}/* K = the act's BAL key {k, suc}; bac = its bạc cost (BAL), so the one BẠI line says no bạc is lost */
document.addEventListener("click",e=>{const b=e.target&&e.target.closest&&e.target.closest("button[data-cap]");if(!b||b.disabled||typeof S==="undefined"||!S||S.dead)return;
 if(roll(BAL.odds.hi))return;e.stopImmediatePropagation();e.preventDefault();const k=+b.dataset.cap||0;if(k&&can(k))spend(k);
 const kn=b.querySelector(".kan");const n=String(kn?kn.textContent:(b.childNodes[0]&&b.childNodes[0].nodeType===3?b.childNodes[0].textContent:"")).trim();
 let bf=null;try{bf=rsnap()}catch(x){}oddsSoft(n,{suc:-(+b.dataset.capsuc||0),bac:-(+b.dataset.capbac||0)});try{if(bf)resultShow(n,bf,false)}catch(x){}render()},true);
/* KIT PART kitResultSeal(ok) (KIT 7): the result seal — true → THÀNH (.ok), false → BẠI (.bad), no roll → "KẾT QUẢ" (.sure, the kit's grey seal, no stamp) */
function kitResultSeal(ok){return ok===true?{cls:"ok",t:"THÀNH"}:ok===false?{cls:"bad",t:"BẠI"}:{cls:"sure",t:"KẾT QUẢ"}}
resultShow=function(title,before,okHint){if(!S||!before||S.dead)return;
 const [G,B,K]=kaResultRows(before,title);const n=Math.max(0,(S.logSeq||0)-before.seq);let sen="";try{sen=kaSentence(before)}catch(e){}if(sen&&kaPlain(sen).replace(/[.!…\s]+$/,"").toLowerCase()===kaPlain(title||"").replace(/[.!…\s]+$/,"").toLowerCase())sen="";
 const why=S.logs.slice(0,Math.min(n,S.logs.length)).map(plain).join(" ");
 /* the seal follows the outcome FOR HER (net real changes + what the log says), not which branch fired */
 const failTxt=/chặn kịp|phát giác|bị lộ|bị bắt|không thành|hỏng|từ chối|không ai tin|trách ngươi|quở|bị phạt|mắng|thư giả|vu khống|thất bại|không dò ra|không biết gì|cũng không biết|không thấy gì|không tìm ra|chưa duyệt/i.test(why);/* act audit: a failed search/scout read THÀNH */
 const realLoss=B.some(x=>!/^<span class="ef r">(Sức|Bạc) /.test(x));
 const netBad=!G.length&&realLoss;
 /* owner 11/15: THÀNH / BẠI come ONLY from the act's own roll (okHint true / false); no roll ("sure", null) → no seal, the neutral header
    "KẾT QUẢ" — never inferred from the log words or from how many lines are Được / Mất (failTxt / netBad stay for the old callers' log) */
 const ok=okHint===true?true:okHint===false?false:null;const SL=kitResultSeal(ok),seal=SL.t;void failTxt;void netBad;
 /* ODDS CAP: a soft failure changes nothing but still shows its one BẠI line (j63 oddsSoft) */
 if(okHint===false&&window.__oddsSoft&&!sen)sen=window.__oddsSoft;window.__oddsSoft="";
 if(!G.length&&!B.length&&!sen&&!(K&&K.length))return;if(window.__bot)return;
 let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}
 t.onclick=e=>{const kk=e.target.closest(".kkem");if(kk){e.stopPropagation();const on=!kk.classList.contains("on");kk.classList.toggle("on",on);kk.setAttribute("aria-expanded",String(on));clearTimeout(window.__rtT);return}
  if(e.target.closest(".kalog")){const tb=document.querySelector('[data-tab="log"]');if(tb)tb.click();else{try{tab="log";renderPanel()}catch(x){}}}t.classList.remove("on")};
 const rows=[];if(G.length)rows.push({k:"duoc",label:"Được",items:G});if(B.length)rows.push({k:"mat",label:"Mất",items:B});if(!rows.length&&!(K&&K.length))rows.push({k:"note",label:"Ghi chú",items:['<span class="ef n">không đổi chỉ số</span>']});
 window.kaLastResult={title,ok,seal,sentence:sen,rows:rows.map(r=>({k:r.k,label:r.label,items:r.items.map(kaPlain)}))};
 const row=r=>`<span class="kr kr-${r.k}"><span class="krl">${r.label}</span><span class="krv">${r.items.map(x=>`<span class="kitem">${x}</span>`).join("")}</span></span>`;
 t.className="rtoast karesult "+SL.cls;
 t.innerHTML=`<div class="rt"><span class="kat"><b class="seal">${seal}</b><span class="kan">${title||""}</span></span>${sen?`<span class="ksen">${sen}</span>`:""}<span class="kb">${rows.map(row).join("")}${kitKemRow(K)}</span><span class="kalog" role="button" tabindex="0">Xem đầy đủ ở Nhật ký</span></div>`;
 void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),9000)};
(function(){const st=document.createElement("style");st.id="ka-res-css";st.textContent=`
.rtoast.karesult{display:block;max-width:min(94vw,520px);width:max-content;min-width:min(94vw,300px);padding:9px 12px 8px}
.rtoast.karesult .rt{display:flex;flex-direction:column;gap:4px;font-size:.84rem}
.rtoast.karesult .kat{display:flex;align-items:center;gap:8px;padding-bottom:4px;border-bottom:1px solid #e6d3ac}
.rtoast.karesult .seal{font-size:.9rem;padding:3px 8px;flex:0 0 auto}
.rtoast.karesult .kan{font-weight:700;color:var(--ink);overflow-wrap:anywhere}
.rtoast.karesult .ksen{color:var(--ink);line-height:1.35}
.rtoast.karesult .kb{grid-template-columns:3.4rem minmax(0,1fr);font-size:.8rem;line-height:1.4}
.rtoast.karesult .kb .ef{font-weight:600}.rtoast.karesult .kb .ef.t{color:var(--ink);font-weight:700}
.rtoast.karesult .kitem{display:block;text-align:left;align-items:flex-start;justify-content:flex-start;width:auto;min-width:0}/* .kitem is also the item cell (centred): a result line is left-aligned, value next to its label */
.rtoast.karesult .kwy,.kb .kwy{color:var(--dim);font-weight:400;font-size:.74rem}

.kb .kr-kem .krl{color:var(--dim)}
.kb .kkem{display:block;cursor:pointer;color:var(--ink)}
.kb .kkem .kkems{text-decoration:underline dotted;text-underline-offset:3px}
.kb .kkem .kkeml{display:none;font-size:.76rem;color:var(--dim);line-height:1.35;margin-top:2px}
.kb .kkem.on .kkeml{display:block}
.rtoast.karesult .kalog{align-self:flex-end;font-size:.74rem;color:var(--gold);text-decoration:underline;cursor:pointer}
`;document.head.appendChild(st)})();
/* "có thể bị người của nàng phát giác" -> the real chance word for this target (same formula as caught(), j8), never % */
const KA_PS=["poison","musk","kpoison"];
function kaCaughtTxt(v,k){/* previews: caught */try{const n=caughtOdds(S,v,KA_PS.includes(k));return `bị người của nàng phát giác: ${chanceW(n)} — nàng nắm ${balAb(BAL.eff.j8.evCaught)} chứng cứ`}catch(e){return null}}
(function(){if(typeof rvGroups!=="function")return;const g0=rvGroups;rvGroups=function(v){const G=g0.apply(this,arguments);try{for(const g of G)g[1]=g[1].map(h=>{const m=String(h).match(/data-a="(\w+)"/);const CW=caughtW();if(!m||!String(h).includes(CW))return h;const t=kaCaughtTxt(v,m[1]);return t?String(h).split(CW).join(t):h})}catch(e){}return G}})();
/* ---------- "Cần" row: every condition an act needs, with its current status, from the real checks (can/whyTime/cardWhy/ok/LACK/evG) ---------- */
function kaNeedAttr(L){return L&&L.length?` data-kneed="${encodeURIComponent(JSON.stringify(L))}"`:""}
function kaTimeNeeds(c,bacCost){const L=[];const left=BAL.time.khac-used;L.push(j76need(c,window.__cbCard));if(c>1)L.push({t:`Sức ≥${BAL.time.sucMin} (có ${S.suc})`,ok:S.suc>=BAL.time.sucMin});if(bacCost>0)L.push({t:`Bạc ${bacCost} (có ${S.bac})`,ok:S.bac>=bacCost});return L}
(function(){const ch=cardH;cardH=function(a,i){let h=ch.apply(this,arguments);try{if(!S||S.dead)return h;const c=cardCost(a);const L=kaTimeNeeds(c,a.c&&a.c.bac<0?-a.c.bac:0);
  if(a.b!=null)L.push({t:`${BUOI[a.b]} (đang ${BUOI[S.buoi||0].toLowerCase()})`,ok:(S.buoi||0)===a.b});
  if(a.done)L.push({t:"chưa làm trong buổi này",ok:false});
  if(a.lock&&a.t)L.push({t:kaPlain(a.t),ok:false});
  h=h.replace(/^<button /,`<button${kaNeedAttr(L)} `)}catch(e){}return h}})();
(function(){if(typeof rvGroups!=="function")return;const g0=rvGroups;rvGroups=function(v){const G=g0.apply(this,arguments);try{for(const g of G)g[1]=g[1].map(h=>{const m=String(h).match(/data-a="(\w+)"/);const a=m&&ACT[m[1]];if(!a)return h;const k=m[1];
  const L=[];if(!v.alive)L.push({t:"nàng còn sống",ok:false});if(v.out)L.push({t:"nàng không ở lãnh cung",ok:false});
  L.push(...kaTimeNeeds(2,a.c&&a.c.bac<0?-a.c.bac:0));
  if(typeof CRIME!=="undefined"&&CRIME.includes(k))L.push({t:"không bị cấm túc",ok:!S.confined});
  let ok=false;try{ok=!!a.ok(S,v)}catch(e){}const x=String(a.x||"").split(/\s·\s/)[0];const ev=/chứng cứ/.test(x)?` (có ${evG(S,v)})`:"";
  if(ok){if(/^cần /i.test(x))L.push({t:x.replace(/^cần /i,"")+ev,ok:true})}
  else{let lw="";try{lw=typeof LACK!=="undefined"&&LACK[k]?LACK[k](v):""}catch(e){}L.push({t:lw||(x?x.replace(/^cần /i,"")+ev:"điều kiện riêng của việc này chưa có"),ok:false})}
  return String(h).replace(/^<button /,`<button${kaNeedAttr(L)} `)})}catch(e){}return G}})();
