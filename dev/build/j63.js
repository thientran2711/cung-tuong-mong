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
const kaWord=h=>String(h).replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${spSee("oan",+n)}`).replace(/thân -(\d+)/g,"quý ngươi -$1").replace(/thân \+(\d+)/g,"quý ngươi +$1");
function kaSent(h,old){const s=kMk(kaPlain(h));if(!s)return"n";if(old!=="g"&&old!=="r"){const lo=s.match(/^(Áp lực hôn sự|Lời đồn)\s*([+−-])\s?\d/);if(lo)return lo[2]==="+"?"r":"g"}/* kit-cost-rows-home: pressure / rumour — less is better (j1 KLOW) */if(old==="g"||old==="r")return old; /* kit-rows-b KP12: the writer's explicit class g/r beats the word-meaning colouring */let c="n";try{c=kcls(String(h).replace(/<b>[^<]*<\/b>/g,"x"))}catch(e){} /* an unclassed <b>item name</b> never colours the row (e.g. "Son phần giáng") */
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
function kaModelStr(str){str=String(str||"").replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${spSee("oan",+n)}`).replace(/thân -(\d+)/g,"quý ngươi -$1").replace(/thân \+(\d+)/g,"quý ngươi +$1").trim();
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
  if(l==="tốn"&&!cont){if(neu)add("ton",h,"n");else if(c==="g")add("ton",h,/\d/.test(p)?"r":"n");/* KK56 (E-GAIN3b #1, law 3): a piece written under «tốn:» is ALWAYS a cost («Chứng cứ 1 (tội …)» paid, never a green «Được») */else if(/\d/.test(p)&&(c==="r"||/[-−]\s?\d/.test(p)))add("ton",h,"r");else add("kem",h,"r","b");continue}
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
/* KIT §6.6 GAIN LIST (OB-KIEP, owner 25/11 ~22:40Z, iPad «Thân phận kiếp này» ĐƯỢC = ~12 items in one «·» run: "chữ tràn lan đại hải thế này đọc không hiểu gì cả ...
   nó xuống hàng, hay là nó chia làm 2 cột, 3 cột"; OD 23/11 ~20:30Z line-break law: short pairs never split, text breaks where the meaning breaks).
   ONE rule for every TỐN / ĐƯỢC / MẤT / KÈM / THÀNH / BẠI row of every option / act card (kaRowH is the only row writer):
   a short row (few short items, KA_LIST.chars in all) stays ONE line with «·»; a longer row becomes a LIST = one item per line (.klist),
   or 2–3 columns when every item is short (.klist2, ≤ KA_LIST.col characters; the columns fit the card width by CSS, never measured).
   Cần (its own chip flow) and Ghi chú are not lists. */
const KA_LIST={chars:56,long:40,col:22,skip:new Set(["why","note"])};
function kaListCls(k,L){try{if(KA_LIST.skip.has(k)||!L||L.length<2)return"";const n=L.map(x=>kaPlain(x.h).length),tot=n.reduce((a,b)=>a+b,0)+3*(L.length-1),mx=Math.max(...n);
 if(tot<=KA_LIST.chars&&mx<=KA_LIST.long)return"";return mx<=KA_LIST.col&&L.length>=3?" klist klist2":" klist"}catch(e){return""}}
/* kaListFix(krv): the same rule for a value cell assembled from copied chips (jopic kitOptFinal: the Mất row of copies, the Được row merged from Thành + Được) */
function kaListFix(v){try{if(!v)return;const k=((v.parentElement&&[...v.parentElement.classList].find(c=>/^kr-/.test(c)))||"kr-duoc").slice(3);
 const L=[...v.children].filter(e=>!e.classList.contains("ksep")).map(e=>({h:e.textContent}));const c=kaListCls(k,L);/* touch the class only when it changes: a no-op class write still wakes every MutationObserver on the dialog */
 const a=/klist/.test(c),a2=/klist2/.test(c);if(v.classList.contains("klist")!==a)v.classList.toggle("klist",a);if(v.classList.contains("klist2")!==a2)v.classList.toggle("klist2",a2)}catch(e){}}
window.kaListFix=kaListFix;
function kaRowH(k,lab,L,b){return `<span class="kr kr-${k}${b?" kb-"+b:""}"><span class="krl">${lab}</span><span class="krv${kaListCls(k,L)}">${L.map(x=>k==="why"?`<span class="kwhy${x.c==="g"?" kok":""}">${x.c==="g"?"✓":"✗"} ${String(x.h).replace(/^[✓✗]\s*/,"")}</span>`:`<span class="ef ${x.c}${kaUnit(x.h)?" kef1":""}">${x.h}</span>`).join('<span class="ksep">·</span>')}</span></span>`}
/* K-EF-UNIT (KIT_REQUESTS 21/11 econ-tamco RE-CHECK #2): a STAT item («Bạc -94», «Tâm cơ -3», «Sủng +2», «2 khắc») is ONE unbreakable unit on every option/act card row — it never splits «Bạc» / «-94» at a line end; items still wrap as wholes. Long word items keep wrapping. */
/* r3 perf (LAND CHAIN 2 QC): one result per item text, cached — the same items are re-rendered every render()/buổi (5.8k calls ≈ 86 ms at CPU x4 before) */
function kaUnit(h){const C=kaUnit.c||(kaUnit.c=new Map()),k=String(h);let v=C.get(k);if(v===undefined){if(C.size>3000)C.clear();v=kaUnit0(k);C.set(k,v)}return v}
function kaUnit0(h){const t=kaPlain(h).trim();return t.length<=28&&(/^[\p{L}][\p{L}\s]{0,22}(?:\s*[+\-−]\s?|\s)\d+(?:\s*khắc)?$/u.test(t)||/^[\p{L}][\p{L}\s]{0,22}\s[+−]{1,3}$/u.test(t)/* MARKS: «Sủng ++» is one unit too */||/^\d+\s*khắc$/u.test(t)||/^[\p{L}][\p{L}\s]{0,22}\s\d+\s*→\s*\d+(\s*\([+\-−]\d+\))?$/u.test(t))}
/* kit-thanh-bai: [Cần][Tốn] once, then THÀNH block (Được/Mất/Kèm), then BẠI block; a sure act (R.one) has the THÀNH block only; an empty BẠI says so in one dim line */
function kaBody(R,dis){kaNoteDedup(R);if(typeof markTxt==="function")for(const k of["ton","duoc","mat","kem","note"])R[k]=R[k].map(x=>Object.assign({},x,{h:markTxt(x.h,k)}));/* MARKS: every choice card row says a stat change in marks (jk2b markTxt, BAL.mark) */const one=R.one!==false;let h="";
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
function kaNorm1(b){if(b.classList.contains("kquick"))return;/* KIT §13.6: the quick button keeps its own one look (never an option card) */if(b.dataset.ka==="1"){const kan=b.querySelector(":scope > .kat > .kan");if(kan)[...b.childNodes].reverse().forEach(n=>{if(n.nodeType===1&&!n.matches(".kat,.klead,.kb,.kinfo,.kscue"))kan.prepend(n)});return}if(b.closest(".hud2,#hud2,.tabs,.mapnav"))return;
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
 if(needs&&needs.length){const kn=t=>kaPlain(t).replace(/^[✓✗]\s*/,"").toLowerCase().replace(/^cần\s+/,"").replace(/\s*\(có [^)]*\)$/,"").trim();const un=needs.filter(n=>!n.ok).map(n=>kn(n.t));const gen=/^(chưa đủ điều kiện|hết khắc|sức dưới 20|chỉ buổi|đã qua|đang cấm túc|đã làm trong buổi|đã mất|đã khuất|ở lãnh cung)/i;
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
function kaNorm(root){try{(root||document).querySelectorAll(KA_SEL).forEach(b=>{try{kaNorm1(b);if(typeof kitNoUnkDom==="function")kitNoUnkDom(b,true)}catch(e){console.error("kaNorm",e)}})}catch(e){}}
/* disabled state can change after build: keep the class honest */
/* F10 member 3 (26/11, Foreman E E-S1 iPad y13 b2239 «Biếu quà làm lành», 1351 option cards from a long save; R1 cnv_ban y16–17): the
   normaliser woke on EVERY added node in the page (a picture's loading mark, a memory mark, a word inside a card …) and each wake re-ran kaNorm
   over the WHOLE document (7 s with 1386 cards: every card goes through kpOptArt again) → the page never idled. A wake now sorts its records
   (kaSort): a NEW card (a KA_SEL button with no data-ka yet) → kaNorm over the place that holds it (the added node, or the card's parent),
   never the whole page; a node added INSIDE an already normalised card → that card alone (kaNorm1 + the «???» mask); anything else (not a
   card) → nothing. A card the normaliser still wants anywhere in the page (kaWants) is picked up on the next card wake. */
let kaQ=false;const kaTouch=new Set(),kaRoots=new Set();
function kaWants(b){return !b.dataset.ka&&!b.classList.contains("kquick")&&!b.closest(".hud2,#hud2,.tabs,.mapnav")&&(b.classList.contains("kcard")||[...b.children].some(c=>c.tagName==="SMALL"))}/* = what kaNorm1 rebuilds */
function kaNew(n){if(n.nodeType!==1||!n.isConnected)return null;if(n.matches(KA_SEL)&&!n.dataset.ka)return n.parentElement||n;return n.querySelector(KA_SEL)&&[...n.querySelectorAll(KA_SEL)].some(b=>!b.dataset.ka)?n:null}
function kaSort(ms){let hit=false;for(const m of ms){if(m.type==="attributes"){const b=m.target;if(b.classList&&b.classList.contains("ka"))b.classList.toggle("kdis",b.disabled);continue}
 if(!m.addedNodes.length)continue;for(const n of m.addedNodes){if(n.nodeType===1&&n.classList&&n.classList.contains("kscue"))continue;/* F10: a scroll cue (jksize) is not a card: it never wakes the normaliser (the two fed each other forever) */
  const r=kaNew(n);if(r){kaRoots.add(r);hit=true;continue}
  const t=m.target.nodeType===1?m.target:m.target.parentElement;const c=t&&t.isConnected&&(t.matches(KA_SEL)?t:t.closest(KA_SEL));if(c){if(c.dataset.ka==="1")kaTouch.add(c);else kaRoots.add(c.parentElement||c);hit=true}}}return hit}
const kaMO=new MutationObserver(ms=>{if(kaSort(ms)&&!kaQ){kaQ=true;queueMicrotask(kaRun)}});
/* F10 (26/11, robots A2 nc_su b703 / R1 / T1d): kaNorm's own DOM edits (kaNorm1 → kpOptArt / kitOptUnify / kitOptFinal rebuilding a card) were
   records for kaMO → another kaNorm → … a chain that never let the page breathe when one card's rebuild never settles. A pass takes back
   the records it made itself; it runs again only for a card that is really new, at most BAL.kobs.kaPass passes per wake. */
function kaRun(){kaQ=false;const N=BAL.kobs.kaPass;/* ONE CORE: BAL.kobs (jbal2) */
 if(kaRoots.size)document.querySelectorAll(KA_SEL).forEach(b=>{if(kaWants(b))kaRoots.add(b.parentElement||b)});/* a card made outside a record (class set later) */
 for(let i=0;i<N&&(kaRoots.size||kaTouch.size);i++){const R=[...kaRoots].filter(r=>r.isConnected);kaRoots.clear();const T=[...kaTouch];kaTouch.clear();
  const top=R.filter(r=>!R.some(o=>o!==r&&o.contains(r)));top.forEach(r=>kaNorm(r===document.documentElement?document:r));
  T.forEach(c=>{if(!c.isConnected||top.some(r=>r.contains(c)))return;try{kaNorm1(c);if(typeof kitNoUnkDom==="function")kitNoUnkDom(c,true)}catch(e){console.error("kaNorm",e)}});
  for(const m of kaMO.takeRecords()){if(m.type!=="childList")continue;for(const n of m.addedNodes){const r=kaNew(n);if(r)kaRoots.add(r)}}/* own edits dropped; only a really new card runs again */
  kaTouch.clear()}}
kaMO.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["disabled"]});
(function(){const kf=kitFix;kitFix=function(root){kf.apply(this,arguments);kaNorm(root)}})();
/* ---------- the look (scoped to .ka act cards / options) ---------- */
(function(){const st=document.createElement("style");st.id="ka-css";st.textContent=`
button.ka{display:flex!important;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:3px;text-align:left;background:var(--k-card,#fffaf0);border:1px solid var(--line);border-radius:8px;padding:6px 9px 7px!important;color:var(--ink);font-family:inherit;font-size:.82rem;line-height:1.3;min-height:0;height:auto!important;max-height:none!important;overflow:visible!important;white-space:normal!important;box-shadow:inset 0 0 0 1px #fff8,0 1px 0 #d9c49a55}
button.ka:hover:not(:disabled){border-color:var(--gold)}
.knw{white-space:nowrap}
button.ka .kat{display:flex;align-items:flex-start;gap:6px;justify-content:space-between;padding-bottom:3px;border-bottom:1px solid #e6d3ac}
button.ka .kan{flex:1 1 auto;min-width:0;display:block;font-weight:700;color:var(--ink);overflow-wrap:anywhere}
button.ka .kan .md{display:inline-flex!important;position:static!important;margin:0 4px 0 0!important;vertical-align:middle}button.ka .kan .ic{vertical-align:middle}button.ka .kan .md.xs{width:22px!important;height:22px!important}button.ka .kan .ic{flex:0 0 auto}
button.ka .kodds{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:1px}
button.ka .kodds .oc{margin:0;white-space:nowrap;text-align:center}
button.ka .kodds .ef{font-size:.68rem;text-align:right}
button.ka .klead{display:block;font-size:.76rem;color:var(--dim);line-height:1.3}
.kb{display:grid;grid-template-columns:max-content minmax(0,1fr);column-gap:7px;row-gap:2px;text-align:left;align-content:start}.kb .kr{display:contents}.kb .krl{font-size:.64rem;font-weight:700;color:#8a7350;text-transform:uppercase;white-space:nowrap;padding-top:.12rem}.kb .krv{min-width:0;overflow-wrap:anywhere}.kb .ef.g{color:var(--good)}.kb .ef.r{color:var(--bad)}.kb .ef.t{color:var(--ink)}.kb .ksep{color:#b9a27a;margin:0 4px}.kb .kr-why .krl,.kb .kwhy{color:var(--bad)}
/* KIT §6.6 GAIN LIST: one rule wins over every per-card value-flow rule (jopic #modal#modal option cards, jk4 compact cards): the :is() id list only lifts the specificity (as .kef1) */
.krv.klist:is(#kl1#kl2#kl3,.klist){display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;align-items:stretch!important;gap:1px!important;white-space:normal!important}
.krv.klist:is(#kl1#kl2#kl3,.klist)>.ksep{display:none!important}
.krv.klist:is(#kl1#kl2#kl3,.klist)>:not(.ksep){display:block!important;position:relative!important;padding-left:.8em!important;max-width:100%!important;text-align:left!important}
.krv.klist:is(#kl1#kl2#kl3,.klist)>:not(.ksep):not(.kef1){white-space:normal!important}/* a stat unit (.kef1, K-EF-UNIT) stays ONE unbreakable unit */
.krv.klist:is(#kl1#kl2#kl3,.klist)>:not(.ksep)::before{content:"";position:absolute;left:.12em;top:.6em;width:.3em;height:.3em;border-radius:50%;background:currentColor;opacity:.5}
.krv.klist2:is(#kl1#kl2#kl3,.klist2){display:grid!important;grid-template-columns:repeat(auto-fill,minmax(10.5em,1fr))!important;column-gap:10px!important;row-gap:1px!important}
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
button.ka.kdis:not(.kopinfo) .kr-mat,button.ka.kdis:not(.kopinfo) .kr-kem,button.ka.kdis:not(.kopinfo) .kr-bai,button.ka:disabled:not(.kopinfo) .kr-mat,button.ka:disabled:not(.kopinfo) .kr-kem,button.ka:disabled:not(.kopinfo) .kr-bai,button.ka.kopinfo.khlock .kr-mat,button.ka.kopinfo.khlock .kr-kem,button.ka.kopinfo.khlock .kr-bai{display:none}/* KIT §6.2o K-HAND-MAT (KK63): a read-only COPY (.kopinfo: hand plate, «!» overlay) is a disabled button only so it cannot be pressed — it shows every Mất / Kèm / Bại row unless it copies a locked card (.khlock) */
/* kit-thanh-bai: the THÀNH / BẠI block heads (full grid row) and their rows; a disabled card shows no BẠI block (same rule as its hidden Mất / Kèm) */
/* r4: no head rows — the row label itself is THÀNH (green) / BẠI (red); label column LEFT, value RIGHT at every size */
.kb .kr-thanh .krl{color:var(--good);font-weight:800}.kb .kr-bai .krl{color:var(--bad);font-weight:800}
.kb .kr-none.kr-thanh .krl{color:var(--good)}.kb .kr-none.kr-bai .krl{color:var(--bad)}
.kb .kr-duoc.kb-a .krl{white-space:normal;line-height:1.1}
.kb .kr-none .ef{color:var(--dim);font-weight:400;font-style:italic}
button.ka.kdis:not(.kopinfo) .kr.kb-b,button.ka:disabled:not(.kopinfo) .kr.kb-b,button.ka.kopinfo.khlock .kr.kb-b{display:none}/* K-HAND-MAT (KK63): same exemption for the read-only copy */
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
/* ================= RESULT CARD (kit): after every act/choice — [seal THÀNH/BẠI | act name] · one sentence · Được (green) · Mất (red, grouped per person) · "Xem đủ trong Sổ ghi" =================
   Built from REAL deltas (snapshot before → now), never from the option preview: no ranges, no "có thể"; two-way relations merged into one plain phrase. */
const KA_RANKRE=new RegExp("("+RANKS.map(r=>r.n).join("|")+")\\s*$","i");
function kaWho(v){const r=v&&RANKS[v.rank];return (r&&v!==S?r.n+" ":"")+(v&&v.name||"")}
function kaTitled(s){for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||!v.name||!s.includes(v.name)||!RANKS[v.rank])continue;const rn=RANKS[v.rank].n;s=s.split(v.name).map((x,i,a)=>i<a.length-1&&!KA_RANKRE.test(x)?x+rn+" ":x).join(v.name)}return s}
const kaN=n=>(n>0?"+":"−")+Math.abs(n);
/* KIT §7.1 PERSON NUMBER + NEW TOTAL (owner OD 26/11 ~03:55Z «Hoàng hậu thiện cảm +8 (42)»; ACT-MERGE J0, canon overwrite of the 24/11 «never (…)» line):
   every person number a result moves reads «<change> (<new total>)»; the bracket holds the NEW TOTAL only (no arrow, no repeated change); a negative total «(−4)».
   kitRelW(kind, change, total) = the same words for act-card Được / Mất rows (J1–J5 callers), e.g. kitRelW("thiện cảm",6,48) → «thiện cảm +6 (48)». */
const kaNT=(n,t)=>kaN(n)+(t==null||!isFinite(t)?"":` (${Math.round(t)<0?"−"+Math.abs(Math.round(t)):Math.round(t)})`);
function kitRelW(kind,d,total){return `${kind} ${kaNT(Math.round(d),total)}`}
window.kitRelW=kitRelW;window.kaNT=kaNT;
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
/* KAWHY-VERDICT (law 11, OD 26/11): a side roll's sentence (the sent servant caught and confessing, j9 runAct KA_SIDE) is flagged EXPLICITLY:
   it is the cause of no stat / Kèm row of hers (its own loss is the target's chứng cứ, not her numbers); out.side = those clauses.
   A sentence also ends at «)» before a capital: «… (sai X đi) Tâm cơ 50 → 52» are two clauses (old saves' glued choice lines, j3 logChoice) */
const KA_SIDE_RX=/<span class="kwside">([\s\S]*?)<\/span>/g;
function kaWhyCl(before){try{const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-before.seq));const out=[];out.side=new Set();for(const h of S.logs.slice(0,n).reverse()){const raw=String(h).replace(/<span class="ld">[^<]*<\/span>/,"");const sd=[];raw.replace(KA_SIDE_RX,(m,x)=>{sd.push(plain(x).replace(/\s+/g," ").trim());return m});const t=plain(raw);for(const s of t.split(kRx("(?<=[.!?…)])\\s+(?=[A-ZÀ-Ỹ\"“])",""))){for(const c of s.split(/\s·\s/)){const x=c.trim();if(!x)continue;out.push(x);if(sd.some(d=>d&&(x===d||d.startsWith(x)||x.startsWith(d.replace(/[.\s]+$/,"")))))out.side.add(x)}}}return out}catch(e){return[]}}
/* the verdict of the card (true THÀNH / false BẠI / else none) filters the leads: on THÀNH a lead that tells a failure (bị bắt, phát giác …) is no
   cause of a row, on BẠI a lead that tells a success is none either; a flagged side-roll clause (C.side) never is (KAWHY-VERDICT) */
const KA_WHYFAIL=/bị bắt|bị lộ|phát giác|khai ra|không thành|chặn kịp|từ chối|thoái thác|thất bại|hỏng|bại lộ|bị phạt|không ai tin/i;
const KA_WHYWIN=/thành công|đắc thủ|được việc|việc thành|mưu thành|như ý|tìm thấy/i;
function kaWhyLead(c,i,C){const m=c.match(/^([^:]{3,50}):\s/);if(!m||/^Vì sao/i.test(m[1])||/→|\d/.test(m[1])||KA_WHYBAD.test(m[1].trim()))return null;
 if(C&&C.side&&C.side.has(c))return null;const ok=C?C.ok:undefined;if(ok===true&&KA_WHYFAIL.test(m[1]))return null;if(ok===false&&KA_WHYWIN.test(m[1]))return null;return m[1]}
/* stat line: the clause of the log that states this stat's change */
function kaWhyStat(C,nm,d,title,key){const re=new RegExp("(^|[^\\p{L}])"+nm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*(?:[+−-]\\s*\\d|\\d+\\s*→)","u");const sg=d>0?"+":"-";
 let c=C.find(x=>re.test(x));let r=c&&kaWhyLead(c,0,C);
 if(!r&&key==="bac"){c=C.find(x=>/[+−-]\s*\d+\s*bạc/i.test(x)&&(d>0)===!/[−-]\s*\d+\s*bạc/i.test(x));r=c&&kaWhyLead(c,0,C)}
 /* owner 24/11 ~21:57Z + BIG rv F1: a stat row says only «<stat> ±N»; a cause is printed ONLY when it is a real clause of the log that is NOT the card title (never the title, never a generic filler) */
 void sg;if(!r)return"";const cl=kaWhyClip(r),tn=kaPlain(String(title||"")).toLowerCase(),cn=cl.toLowerCase();if(!cl||!tn||tn.includes(cn)||cn.includes(tn.split(":")[0].trim()))return"";return cl}
/* person line: "Vì sao: <name>: <why> → …" first, then the log sentence that names her (strangers: "chưa quen biết …"), then the act title */
function kaWhyWho(C,v,named,title){try{const nm=v&&v.name;const subj=named&&nm?nm:null;
 const vs=subj&&C.find(x=>/^Vì sao:/i.test(x)&&x.includes(subj));if(vs){const m=vs.replace(/^Vì sao:\s*/i,"").replace(subj,"").replace(/^[^:]*?:\s*/,"").replace(/\s*→.*$/,"");if(m.trim().length>3)return kaWhyClip(m)}
 }catch(e){}
 return ""}
function kaWhyHtml(r){return r?`<span class="kwy"> · ${r}</span>`:""}
/* NB2 (W8, LAW 11 whole family): a result card names EVERY real change of the tap, not only hers + the consorts' — every servant's
   thiện cảm (own staff: loyal; others, the named elders and the Thái hậu household: af.me = aff(c,S)), the court (S.court af.me),
   the familiarity step she reached (S.known, K61STN word) and what she learned (kaLearn(text): an act that hands her news/knowledge
   says so once, listed under Được). rsnap keeps plain numbers only (co-op / saves never carry object references). */
function kaSrvList(){const L=[];try{L.push(...allServ())}catch(e){}try{if(S.thO&&S.thO.staff)for(const x of S.thO.staff)if(!L.includes(x))L.push(x)}catch(e){}return L.filter(x=>x&&x.sid!=null&&x!==S.maid)}
function kaSrvV(st){let v=(st.af&&st.af.me)||0;try{if(typeof ownerOf==="function"&&ownerOf(st)===S&&typeof st.loyal==="number")v+=st.loyal}catch(e){}return v}
window.__kaLearnN=window.__kaLearnN||0;window.__kaLearn=window.__kaLearn||[];
function kaLearn(t){if(!t)return;window.__kaLearnN++;window.__kaLearn.push({n:window.__kaLearnN,t:String(t)});if(window.__kaLearn.length>12)window.__kaLearn.shift()}
window.kaLearn=kaLearn;
(function(){const rs=rsnap;rsnap=function(){const b=rs.apply(this,arguments);if(b&&S)try{const o={};for(const st of kaSrvList())o[st.sid]=kaSrvV(st);b.srv=o;
 const c={};for(const k in (S.court||{})){const x=S.court[k];if(x&&x.af)c[k]=x.af.me||0}b.court=c;b.kn=Object.assign({},S.known||{});b.learn=window.__kaLearnN;/* W9: evidence held AGAINST her (evG(holder,S), j8 evm) by every consort / servant */const ev={};for(const h of kaEvHolders())ev[kaEvKey(h)]=evG(h,S);b.evOn=ev}catch(e){}return b}})();
/* W9 (LAW 11, real tap: Tung tin đồn failed → «nàng ta nắm 1 chứng cứ» applied, card silent): a person who now holds MORE / less evidence
   against her (evG(h,S)) is a real change of the tap → «<tên>: nắm chứng cứ về ta ±N» (Mất when it rises). Plain numbers by key only. */
function kaEvHolders(){const L=[].concat(typeof rivals!=="undefined"?rivals:[]);for(const x of kaSrvList())if(!L.includes(x))L.push(x);return L.filter(h=>h&&h!==S)}
function kaEvKey(h){return rivals.includes(h)?"r"+h.id:"s"+h.sid}
function kaKnRows(kn0){const per=[];if(kn0&&S&&S.known&&typeof K61STN!=="undefined"&&typeof KREG!=="undefined"){const SV=kaSrvList();
  for(const k in S.known){const a=+kn0[k]||0,n=+S.known[k]||0;if(!(n>a)||!K61STN[n]||k==="me")continue;const p=KREG[k];if(!p||p===S)continue;
   const rv=rivals.includes(p),nd=kaNamed(p);let who;
   if(SV.includes(p))who=nd?(p.call||p.name):"một cung nhân";
   else if(rv)who=nd?kaWho(p):String(typeof whyWho==="function"?whyWho(p):"Một vị phi tần").replace(/^M/,"m");
   else{try{who=nd&&typeof k61Title==="function"?k61Title(p):typeof k61Desc==="function"?k61Desc(p):""}catch(e){who=""}if(!who)who=nd?(p.name||"người ấy"):"một người lạ"}
   per.push([who,[K61STN[n].toLowerCase()],[],""])}}return per}
function kaMorePeople(before,per,G){const per0=per;per={push(e){const x=per0.find(y=>y[0]===e[0]);if(x){x[1]=x[1].concat(e[1]);x[2]=x[2].concat(e[2])}else per0.push(e)}};/* one row per person */
 if(before.srv){for(const st of kaSrvList()){const b=before.srv[st.sid];if(b==null)continue;const d=Math.round(kaSrvV(st)-b);if(!d)continue;
  const named=kaNamed(st);const who=named?(st.call||st.name):"một cung nhân";const tt=Math.round(kaSrvV(st));/* merge lr4: totals like the LIVE consort rows (kaNT) */per.push([who,d>0?[`thiện cảm ${kaNT(d,tt)}`]:[],d<0?[`thiện cảm ${kaNT(d,tt)}`]:[],""])}}
 if(before.court)for(const k in (S.court||{})){const x=S.court[k],b=before.court[k];if(!x||!x.af||b==null)continue;const d=Math.round((x.af.me||0)-b);if(d)per.push([x.name,d>0?[`thiện cảm ${kaNT(d,x.af.me||0)}`]:[],d<0?[`thiện cảm ${kaNT(d,x.af.me||0)}`]:[],""])}
 /* W9 (LAW 11): EVERY person whose familiarity step rose (S.known key → the person, KREG of j61): consorts, servants, and also the men,
    the Thái y, the court officials (rc-scan: Thái y viện / Biếu quà, gửi thư were not named). Same who-words as the rows above so one person = one row. */
 if(before.kn)for(const e of kaKnRows(before.kn))per.push(e);
 if(before.evOn){for(const h of kaEvHolders()){const b=before.evOn[kaEvKey(h)];if(b==null)continue;const d=Math.round(evG(h,S)-b);if(!d)continue;const rv=rivals.includes(h),nd=kaNamed(h);
  const who=rv?(nd?kaWho(h):String(typeof whyWho==="function"?whyWho(h):"Một vị phi tần").replace(/^M/,"m")):(nd?(h.call||h.name):"một cung nhân");const t=`nắm chứng cứ về ta ${kaN(d)}`;per.push([who,d<0?[t]:[],d>0?[t]:[],""])}}
 if(before.learn!=null)for(const x of (window.__kaLearn||[]))if(x.n>before.learn)G.push(`<span class="ef g">${x.t}</span>`)}
/* W10b (LAW 11 «shown == applied», act walk family): S.known can rise AFTER an act's result card was built: (1) j61's morning-audience
   wrapper (Thỉnh an Hoàng hậu / Thái hậu: k61Know of the people named) runs after the base act; (2) jstagehere actMove walks her into the
   act's place (goTo) and the people met on arrival are known (Múa / Để ý một nam nhân → the man there). resultShow keeps the S.known its
   card reflects (window.__kaKnAt); the jstagehere act wrapper passes that as kn0. kaWalkKn(kn0,title) names every familiarity step that rose since kn0 with the SAME rows as the card (kaKnRows, KREG + K61STN):
   the act's card still up → the rows join its «Được» line (one person = one row); the card already closed → the kit result card (§93.8
   kitResultCard) shows them under the act's title. No number of its own. Returns 0 nothing rose / 1 merged / 2 own card. */
function kaWalkKn(kn0,title){try{if(!kn0||!S||S.dead)return 0;const per=kaKnRows(kn0);if(!per.length)return 0;
 const t=document.getElementById("rtoast"),L=window.kaLastResult;
 if(t&&t.classList.contains("on")&&L&&Array.isArray(L.rows)){let r=L.rows.find(x=>x.k==="duoc");if(!r){L.rows=L.rows.filter(x=>x.k!=="note");r={k:"duoc",label:"Được",items:[]};L.rows.unshift(r)}
  const kb=t.querySelector(".kb");if(kb){const nt=kb.querySelector(".kr-note");if(nt)nt.remove()}
  let d=kb&&kb.querySelector(".kr-duoc .krv");if(kb&&!d){kb.insertAdjacentHTML("afterbegin",`<span class="kr kr-duoc"><span class="krl">Được</span><span class="krv"></span></span>`);d=kb.querySelector(".kr-duoc .krv")}
  for(const [who,gp] of per){const w=gp.join(", "),pw=kaPlain(who)+":";const i=r.items.findIndex(x=>String(x).startsWith(pw+" "));
   if(i>=0)r.items[i]+=", "+w;else r.items.push(`${pw} ${w}`);
   const el=d&&[...d.querySelectorAll(".kitem")].find(x=>{const h=x.querySelector(".ef.t");return h&&h.textContent.trim()===pw});
   if(el){const g=el.querySelector(".ef.g");if(g)g.textContent+=", "+w;else el.insertAdjacentHTML("beforeend",` <span class="ef g">${w}</span>`)}
   else if(d)d.insertAdjacentHTML("beforeend",`<span class="kitem"><span class="ef t">${who}:</span> <span class="ef g">${w}</span></span>`)}
  window.__kaKnAt=Object.assign({},S.known||{});clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),9000);return 1}
 if(window.__bot||typeof kitResultCard!=="function")return 0;
 kitResultCard({title:title||"",ok:null,rows:[{k:"duoc",label:"Được",items:per.map(([who,gp])=>`<span class="ef t">${who}:</span> <span class="ef g">${gp.join(", ")}</span>`)}]});window.__kaKnAt=Object.assign({},S.known||{});return 2}catch(e){console.error("kaWalkKn",e);return 0}}
window.kaWalkKn=kaWalkKn;
/* KIT PART kitAim (KIT 7.3, owner OD 26/11 ~08:30Z «nói xấu xong ... không biết được là có nói xấu thành công hay không»): the ACT PAYLOAD
   of a result card. An act aimed at a person registers kaAim(v, {ok, n, sen, by, later}) when it starts (jverdict hooks runAct / talk / pillowDo /
   gifts / servant + court acts); v's numbers are taken THEN (b0). The card of that span reads it: the seal from the act's own roll
   (THÀNH / BẠI / BỎ DỞ), the act's own plain sentence, ONE «Người ấy» row per target with the REAL change
   «Lệ phi Tô Mạn: Sủng −5 (42 → 37), thiện cảm −3» (a stranger / a deed that lands later: «chưa rõ — tai mắt sẽ báo»), and for an NPC's
   deed on HER (two-way, law 1) one «Ai làm» row «Lệ phi Tô Mạn: nói xấu ngươi bên gối · thành» — only when the span's Sổ ghi names that person
   (law 6: what she cannot know stays hidden). ok may be a function (read when the card is built). */
const KA_AIM=[];
const KA_AIMK=[["sung","Sủng"],["danh","Danh"],["suc","Sức"],["loyal","thiện cảm"]];
function kaAim(v,o){try{if(!S||!v)return null;const b0={};for(const [k] of KA_AIMK)if(typeof v[k]==="number")b0[k]=v[k];b0.rank=v.rank;b0.confined=v.confined||0;b0.out=!!v.out;b0.alive=v.alive!==false;
  const x=Object.assign({seq:S.logSeq||0,t:Date.now(),v,b0},o||{});KA_AIM.push(x);if(KA_AIM.length>40)KA_AIM.splice(0,KA_AIM.length-40);return x}catch(e){return null}}
function kaAimOk(x){let o=null;try{o=typeof x.ok==="function"?x.ok():x.ok}catch(e){}return o===true||o===1?true:o===false||o===0?false:o==="soft"?"soft":null}
function kaAimsOf(b){if(!b)return[];/* RV r1 #5: the span is the log seq + «used» only (no wall clock: a card held behind a dialog / minigame may come minutes later); an OPEN act's aim (x.open: doAct / talk / a dialog option, closed only by its card, its cancel or the idle board — jverdict) belongs to every card until then, even one whose snapshot was taken inside that act */return KA_AIM.filter(x=>!x.used&&(x.open||x.seq>=(b.seq||0)))}
/* the verdict of HER act carried by this span (the last own aim with a roll) + its sentence; kaAimUse marks the aims shown (once) */
function kaAimVerdict(b){const AIM=kaAimsOf(b);let ok=null,sen="",n="";for(const x of AIM){if(x.by)continue;const o=kaAimOk(x);if(o!==null){ok=o;n=x.n||"";sen=x.sen?(typeof x.sen==="function"?x.sen(o):x.sen):""}}return {AIM,ok,sen,n}}
function kaAimUse(L){for(const x of L||[])if(!x.outer)x.used=1}/* an outer act's aim (doAct, talk …) is closed by its wrapper when the act ends: two cards of one act both show it */
function kaEsc(t){return String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function kaAimPart(k,nm,a,b){return `<span class="ef ${b<a?"r":"g"}">${nm} ${kaN(b-a)} (${a} → ${b})</span>`}
/* the target's own change since the act began: stats, rank, cấm túc, phế, mất (status words VANPHONG) */
function kaAimStat(x){const v=x.v,b=x.b0||{},P=[];for(const [k,nm] of KA_AIMK){if(b[k]==null||typeof v[k]!=="number")continue;const a=Math.round(b[k]),n=Math.round(v[k]);if(a!==n)P.push(kaAimPart(k,nm,a,n))}
 if(typeof rivals==="undefined"||!rivals.includes(v))return P;/* rank / cấm túc / phế: consorts only (a servant's rank is another ladder) */
 if(b.alive&&v.alive===false)P.push('<span class="ef r">đã khuất</span>');else if(!b.out&&v.out)P.push('<span class="ef r">bị phế, ra khỏi cung</span>');
 else{if(b.rank!=null&&v.rank!=null&&v.rank!==b.rank&&typeof RANKS!=="undefined"&&RANKS[v.rank])P.push(`<span class="ef ${v.rank<b.rank?"r":"g"}">${v.rank<b.rank?"bị giáng xuống":"được thăng"} ${RANKS[v.rank].n}</span>`);
  if(!b.confined&&(v.confined||0)>0)P.push('<span class="ef r">bị cấm túc</span>')}
 return P}
function kaResultRows(before,title,ok){const G=[],B=[];const K=[];const skip=new Set();const WC=kaWhyCl(before);WC.ok=ok===true?true:ok===false?false:null;/* KAWHY-VERDICT: the card's verdict (resultShow / kitNightEnd) */
 const q=typeof queenP==="function"?queenP():null;const R=before.rel||{};
 const AIM=kaAimsOf(before),TG=new Map();for(const x of AIM)if(!x.by&&x.v&&x.v!==S){if(!TG.has(x.v))TG.set(x.v,{x,rel:[]});else TG.get(x.v).ran=1/* the deed itself ran (a card game / picker after the button): not «chưa rõ» */}/* KIT 7.3: her act's target(s) */
 const per=[];const U={g:[],b:[],d:new Map()};/* [who, goodParts, badParts] */
 for(const v of (typeof rivals!=="undefined"?rivals:[])){const b=R[v.id];if(!b)continue;const a=aff(v,S),m=aff(S,v),e=v.ev||0,g=v.ghen||0,o=Math.round(oan(v,S));const gp=[],bp=[];
  let da=a-b.a,lo=b.a,hi=a;if(v===q&&q!==S&&before.hh!=null){const dh=(S.hh||0)-before.hh;if(dh){skip.add("hh");if(!da){da=dh;lo=before.hh;hi=S.hh||0}}}
  /* hotfix 11/15: the real before→after, never the bare word "thiện cảm" */
  if(da)(da>0?gp:bp).push(`thiện cảm ${kaNT(da,hi)}`);else if(m!==b.m)(m>b.m?gp:bp).push(`ta quý nàng ${kaNT(m-b.m,m)}`);void lo;
  if(TG.has(v)){const T=TG.get(v).rel;if(da)T.push(`<span class="ef ${da>0?"g":"r"}">thiện cảm ${kaNT(da,hi)}</span>`);else if(m!==b.m)T.push(`<span class="ef ${m>b.m?"g":"r"}">ta quý nàng ${kaNT(m-b.m,m)}</span>`);if(g!==b.g)T.push(`<span class="ef ${g>b.g?"r":"g"}">ghen ${kaNT(g-b.g,g)}</span>`);if(o!==b.o)T.push(`<span class="ef ${o>b.o?"r":"g"}">oán ${kaNT(o-b.o,o)}</span>`);if(e!==b.e)T.push(`<span class="ef ${e>b.e?"g":"r"}">chứng cứ về nàng ${kaNT(e-b.e,e)}</span>`);continue}
  if(g!==b.g)K.push({v,k:"ghen",d:g-b.g,t:g});
  if(o!==b.o)K.push({v,k:"oán",d:o-b.o,t:o});
  if(e!==b.e)(e>b.e?gp:bp).push(`chứng cứ về nàng ${kaNT(e-b.e,e)}`);
  if(gp.length||bp.length){if(kaNamed(v))per.push([kaWho(v),gp,bp,kaWhyWho(WC,v,true,title),v,(da||(m-b.m)||(e-b.e))]);else{/* name-mask: strangers are ONE aggregate row per direction, never "<tước> ???" rows */if(gp.some(t=>/^(thiện cảm|ta quý)/.test(t)))U.g.push(v);if(bp.some(t=>/^(thiện cảm|ta quý)/.test(t)))U.b.push(v);U.d.set(v,da||(m-b.m));U.t=U.t||new Map();U.t.set(v,da?hi:m);/* NB2 W8: a stranger's chứng cứ is a real change too (was dropped) */const ep=gp.filter(t=>/^chứng cứ/.test(t)),eb=bp.filter(t=>/^chứng cứ/.test(t));if(ep.length||eb.length)per.push([String(typeof whyWho==="function"?whyWho(v):"Một vị phi tần").replace(/^M/,"m"),ep,eb,"",v,(e-b.e)])}}}
 {/* strangers: ONE line per person with the signed number, «một vị <tước>: thiện cảm +6» (owner 22:14Z + BIG rv N2) */const lo=v=>String(typeof whyWho==="function"?whyWho(v):"Một vị phi tần").replace(/^M/,"m");const tt=v=>U.t&&U.t.get(v);for(const v of U.g)per.push([lo(v),[`thiện cảm ${kaNT(U.d.get(v)||1,tt(v))}`],[],"",v,U.d.get(v)||1]);for(const v of U.b)per.push([lo(v),[],[`thiện cảm ${kaNT(U.d.get(v)||-1,tt(v))}`],"",v,U.d.get(v)||-1])}
 for(const [k,nm] of RKEYS){if(skip.has(k))continue;const now=S[k]||0,d=now-(before[k]||0);if(!d)continue;
  if(k==="th"||k==="hh"){const who=k==="th"?"Thái hậu":(q&&q!==S?kaWho(q):"Hoàng hậu");per.push([who,d>0?[`thiện cảm ${kaNT(d,now)}`]:[],d<0?[`thiện cảm ${kaNT(d,now)}`]:[],kaWhyWho(WC,k==="th"?{name:"Thái hậu"}:(q&&q!==S?q:{name:"Hoàng hậu"}),true,title)]);continue}
  {const up=typeof kGood==="function"?kGood(k,d):d>0;(up?G:B).push(`<span class="ef ${up?"g":"r"}">${nm} ${kaN(d)}</span>`+kaWhyHtml(kaWhyStat(WC,nm,d,title,k)))}}
 if(S.maid&&before.maid!=null&&S.maid.loyal!==before.maid){const d=S.maid.loyal-before.maid;(d>0?G:B).push(`<span class="ef ${d>0?"g":"r"}">${S.maid.name}: thiện cảm ${kaNT(d,S.maid.loyal)}</span>`+kaWhyHtml(kaWhyStat(WC,"Thiện cảm",d,title,"maid")))}
 try{kaMorePeople(before,per,G)}catch(e){console.error(e)}
 /* ONE SIEVE (jnsieve nsCard, owner OD 26/11 ~06:50Z (B)): other people's rows that do not touch her fold into ONE «Trong cung: …» line + the Sổ ghi */
 const SV=typeof nsCard==="function"?nsCard(per,K,WC,title,[...TG.keys()]):null;if(SV){per.length=0;per.push(...SV.keep);K.length=0;K.push(...SV.kem);K.more=SV.more;K.fold=SV.fold;K.sum=SV.sum}
 for(const [who,gp,bp,why] of per){const W=kaWhyHtml(why);if(gp.length)G.push(`<span class="ef t">${who}:</span> <span class="ef g">${gp.join(", ")}</span>${W}`);if(bp.length)B.push(`<span class="ef t">${who}:</span> <span class="ef r">${bp.join(", ")}</span>${W}`)}
 K.why=WC;K.ttl=title;K.tgt=[];K.by=[];
 for(const [v,{x,rel,ran}] of TG){const cons=typeof rivals!=="undefined"&&rivals.includes(v);const named=true/* MAIN 155 (OB-VERDICT LOOK): she CHOSE this person, so she knows the name — the target of her own act always shows its real name (the «???» mask stays for doers she cannot know, law 6) */;const who=`<span data-k61skip>${kaEsc(!cons?(v.name||""):kaWho(v))}</span>`;
  const okx=kaAimOk(x);const P0=named?kaAimStat(x):[];/* a failed / slipped deed: say first that nothing hit her, then the feelings that did move */
  const P=named?((okx===false||okx==="soft")&&!P0.length&&rel.length?['<span class="ef n">không hề hấn gì</span>']:P0).concat(rel):[];
  const txt=P.length?P.join(", "):!ran&&(typeof x.later==="function"?x.later():x.later)?`<span class="ef n">chưa rõ — ${typeof x.later==="function"?x.later():x.later}</span>`:!named||okx===true?'<span class="ef n">chưa rõ — tai mắt sẽ báo</span>'/* done, but nothing she can see yet (planted proof, a sent hand) */:okx===false||okx==="soft"?'<span class="ef n">không hề hấn gì</span>':"";/* no number moved on a done deed: the sentence says what happened (a wet robe, a gift) — no empty row */
  if(txt)K.tgt.push(`<span class="ef t">${who}:</span> ${txt}`)}
 {const C=WC.join(" ");const seen=new Set();for(const x of AIM){const bn=x.pub||x.by&&x.by.name;/* pub: the Emperor / Thái hậu, known to all by title */if(!x.by||x.v!==S||seen.has(x.by)||!bn||!(x.pub||kaNamed(x.by))||!C.includes(bn))continue;seen.add(x.by);const o=kaAimOk(x);
  K.by.push(`<span class="ef t">${x.pub||kaWho(x.by)}:</span> ${kaPlain(x.n||"")}${o===true?' · <span class="ef r">thành</span>':o===false?' · <span class="ef g">không thành</span>':o==="soft"?' · <span class="ef n">bỏ dở</span>':""}`);if(K.by.length>=4)break}}
 /* KIT §54.2 ITEMS (RV-182 §3, law 4): the card reads the SAME item delta as the ring pane / kmDiff (kitInvDelta on the act's rsnap .inv) — a piece given away
    is «Mất», a piece that came in is «… vào Tư trang», a piece sent back in the same step (HOME AGAIN) is neither; snapshots without .inv (night / aims) skip it */
 try{if(before&&before.inv&&typeof kitInvDelta==="function"){const DL=kitInvDelta(before.inv,typeof kitOwned==="function"?kitOwned():S.inv);const nm=e=>String(kitInvName(e)).replace(/&/g,"&amp;").replace(/</g,"&lt;");
  DL.gone.forEach(e=>B.push(`<span class="ef r">${nm(e)}</span>`));DL.add.forEach(e=>G.push(`<span class="ef g">${nm(e)} vào Tư trang</span>`))}}catch(e){}
 return [G,B,K]}
/* KIT PART kitKemRow(K) (KIT 7 + 28.6, kit sample page): the KÈM line of a result — other people's feelings, one summary per kind and
   direction ("12 phi tần ghen thêm 8" / "3 phi tần bớt oán 2–5"), the names behind a tap (.kkem.on); K = [{v, k:"ghen"|"oán", d}] */
/* the reason of a KÈM line (ghen / oán of the others): a Sổ ghi clause naming that feeling, else the act title, else the fixed cause */
const KA_WHYK={ghen:{"+":"lời đồn về ngươi lan ra","-":"lòng ghen nguôi dần theo ngày"},"oán":{"+":"chuyện cũ chưa nguôi","-":"oán nguôi dần theo ngày"}};
function kaWhyKem(K,k,up){try{const C=K.why||[];const c=C.find(x=>new RegExp("(^|[^\\p{L}])"+k+"\\s*(?:[+−-]\\s*\\d)","u").test(x));const r=c&&kaWhyLead(c,0,C);if(r)return kaWhyClip(r);void up;return""/* the cause is the card title, said once (owner 24/11 ~21:57Z): no title copy, no filler after the Kèm number */}catch(e){return""}}
function kitKemRow(K){if(!K||!K.length&&!K.more)return"";/* K.all (ONE-SIEVE-2 Sổ ghi «kèm theo» record): every line, no 8-line cap (K.more still counted) */const CAP=K.all?Infinity:8;/* ONE-SIEVE (MAIN 158 order 26/11): K.more = people the sieve folded away (jnsieve nsCard) — counted in the tail *//* owner 24/11 ~21:57Z + MAIN 129: ONE line per person, exact signed number: «<Tên>: oán +12»; no group summary, no cause copy.
   MAIN 157 26/11 (night card wall «Hoàng hậu …:một vị Quý phi: ghen +8 ghen +8 …»): each person is ONE block line (.kkemi, every card: rtoast, night card, kitRows);
   the people she cannot name with the SAME feeling and number are one line «4 vị khác: ghen +8» (one alone keeps «một vị <tước>: ghen +8») */
 const R=K.filter(x=>Math.round(x.d));const L=[],U=new Map();
 /* KIT 7.1 (ONE-SIEVE): a named person or a single unnamed one shows the new total «ghen +8 (42)» (kaNT, K items carry t); a group «N vị khác» none */
 const line=(nm,k,d,t)=>`<span class="kitem kkemi"><span class="ef t">${nm}:</span> <span class="ef ${d>0?"r":"g"}">${k} ${t!=null&&typeof kaNT==="function"?kaNT(d,t):kaN(d)}</span></span>`;
 const seen=new Set();for(const x of R){const d=Math.round(x.d);if(kaNamed(x.v)){const sk=(x.v&&x.v.id||kaWho(x.v))+"|"+x.k;if(seen.has(sk))continue;seen.add(sk);L.push([0,line(kaWho(x.v),x.k,d,x.t)]);continue}const key=x.k+"|"+d;if(!U.has(key))U.set(key,{k:x.k,d,v:[],t:[]});U.get(key).v.push(x.v);U.get(key).t.push(x.t)}
 for(const {k,d,v,t} of U.values()){const nm=v.length===1?String(typeof whyWho==="function"?whyWho(v[0]):"Một vị phi tần").replace(/^m/,"M")/* KK41: a line that starts its row starts with a capital («Một vị Phi …»; owner 24/11) */:`${v.length} vị khác`;L.push([1,line(nm,k,d,v.length===1?t[0]:null)])}
 const more=Math.max(0,L.length-CAP)+(+K.more||0);const out=L.slice(0,CAP).map(x=>x[1]);
 /* KIT §7.4a (the ONE fold, jnsieve nsCard K.sum): the folded people are ONE line per group «Hậu cung: thiện cảm −4 (10 người) · oán +1 (9 người)» */
 const SUM=!K.all&&Array.isArray(K.sum)&&K.sum.length?K.sum:null;
 if(SUM)for(const [g,L2] of SUM)out.push(`<span class="kitem kkemi kresum"><span class="ef t">${g}:</span> <span class="ef n">${L2.map(([k,d,n])=>`${k} ${d?kaN(d):"±0"} (${n} người)`).join(" · ")}</span></span>`);
 else if(more)out.push(`<span class="kitem kkemi"><span class="ef n">${out.length?`… và ${more} người khác`:`${more} người khác trong cung đổi lòng chút ít`}</span></span>`);
 return out.length?`<span class="kr kr-kem"><span class="krl">Kèm</span><span class="krv kklist">${out.join("")}</span></span>`:""}
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
/* KNOW IN THE RESULT CARD (LAW 11 family, ROOT D 25/11, review/talk-others-people): what she LEARNS is a gain. Every learned fact passes
   noteAdd (j21: «every line written in her Sổ is something she learned»), kitKnow (jnotice KNOW-NOTICE) and intelAdd (j78 tin / secrets), also when the act's own card
   already told it (shown) — so the result card lists those lines under «Được» and never says «ta không được gì» after a talk taught a nết,
   a secret or a tin. rsnap() marks where the act starts (before.kak); one line per key, the richer text (higher pri) wins. */
const KAK={L:[],base:0,on:0};
function kaKnowHook(){if(KAK.on)return;KAK.on=1;const add=(k,p,t)=>{KAK.L.push({k,p,t});if(KAK.L.length>400){KAK.L.splice(0,200);KAK.base+=200}};
 if(typeof noteAdd==="function"){const n0=noteAdd;noteAdd=function(id,t){const r=n0.apply(this,arguments);try{let v=null;try{v=typeof RV==="function"&&id!=null?RV(+id):null}catch(e){}
  add("n:"+id,-1,`Sổ ghi thêm${v&&typeof knowWho==="function"?" về "+knowWho(v):""}: ${String(t).replace(/<[^>]+>/g,"")}`)}catch(e){}return r}}
 if(typeof intelAdd==="function"){const i0=intelAdd;intelAdd=function(v,f){const r=i0.apply(this,arguments);try{if(v&&v!==S&&f&&f.txt)add("i:"+v.id+":"+f.k,1,String(f.txt).replace(/<[^>]+>/g,""))}catch(e){}return r}}/* tin / secrets (j78 S.intel) */
 if(typeof kitKnow==="function"){const k0=kitKnow;kitKnow=function(o){const r=k0.apply(this,arguments);try{if(o&&o.text)add(String(o.key||o.text),o.pri|0,String(o.text).replace(/<[^>]+>/g,""))}catch(e){}return r}}}
function kaKnowSince(n){if(n==null)return[];const m=new Map();for(const x of KAK.L.slice(Math.max(0,n-KAK.base))){const e=m.get(x.k);if(!e||x.p>=e.p)m.set(x.k,x)}const T=[...m.values()].map(x=>x.t);return T.filter((t,i)=>!T.some((u,j)=>j!==i&&u!==t&&t.includes(u)))/* a Sổ line that repeats an intel fact gives way to the fact */}
(function(){const r0=rsnap;rsnap=function(){kaKnowHook();const b=r0.apply(this,arguments);if(b)b.kak=KAK.base+KAK.L.length;return b}})();/* key «kak»: «kn» is the net-ghen-2 familiarity snapshot (S.known, line ~259) — one key per meaning (stack d-worklist-land) */
/* KIT PART kitResultSeal(ok) (KIT 7): the result seal — true → THÀNH (.ok), false → BẠI (.bad), no roll → "KẾT QUẢ" (.sure, the kit's grey seal, no stamp) */
function kitResultSeal(ok){return ok===true?{cls:"ok",t:"THÀNH"}:ok===false?{cls:"bad",t:"BẠI"}:ok==="soft"?{cls:"sure",t:"BỎ DỞ"}/* KIT 7.3: a capped act that slipped — nothing done, nothing lost but the effort */:{cls:"sure",t:"KẾT QUẢ"}}
/* KIT 7 (MAIN 162 LOOK on OB-VERDICT-3, whole family): the sentence under the title never repeats the title. A Sổ ghi choice line
   «<việc>: <title> — Đức +2 vì nhịn.» keeps only what follows the title («Đức +2 vì nhịn.»); a sentence that IS the title is dropped. */
function kaSenDeTitle(sen,title){try{if(!sen)return sen;const t=kaPlain(title||"").replace(/[.!…\s]+$/,"").replace(/\s+/g," ").trim();if(!t)return sen;const P=kaPlain(sen).replace(/\s+/g," ").trim();
 /* the title's words in order; a name may carry its rank in the sentence («… của Điền Chỉ Lan» → «… của Hoàng hậu Điền Chỉ Lan»): up to 3 extra words between */
 const esc=w=>w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");const re=new RegExp("^((?:[^:]{0,60}:\\s*)?)"+t.split(" ").map(esc).join("(?:\\s+\\S+){0,3}?\\s+")+"(?=$|\\s*[.!…:;,—–-])","i");
 const m=P.match(re);if(!m)return sen;/* «Lệ phi giận ngươi» under «Lệ phi»: the title runs on into the sentence — keep it */
 const rest=P.slice(m[0].length).replace(/^[\s.:;,—–-]+/,"").trim();if(!rest||/^[.!…]*$/.test(rest))return "";return rest.charAt(0).toUpperCase()+rest.slice(1)}catch(e){return sen}}
window.kaSenDeTitle=kaSenDeTitle;
resultShow=function(title,before,okHint){if(!S||!before||S.dead||window.__kNav)return;/* §6.2m a nav option shows no result card (kit-k44-parts) */
 /* KAWHY-VERDICT: the reasons follow the card's final verdict (own roll, else the carried act's kaAim); kaAimVerdict reads only — the aims are closed below by kaAimUse */
 const ok0=okHint===true?true:okHint===false?false:(()=>{try{return kaAimVerdict(before).ok}catch(e){return null}})();const [G,B,K]=kaResultRows(before,title,ok0);try{for(const t of kaKnowSince(before.kak))G.push(`<span class="ef g">${t}</span>`)}catch(e){}/* knowledge learned by the act (KAK) is a gain */const n=Math.max(0,(S.logSeq||0)-before.seq);let sen="";try{sen=kaSentence(before)}catch(e){}const sen0=sen;/* the card still shows when its only sentence repeated the title (OD ~17:55Z: «không» rows kept — Ghi chú «ta không được gì») */sen=kaSenDeTitle(sen,title);
 const why=S.logs.slice(0,Math.min(n,S.logs.length)).map(plain).join(" ");
 /* the seal follows the outcome FOR HER (net real changes + what the log says), not which branch fired */
 const failTxt=/chặn kịp|phát giác|bị lộ|bị bắt|không thành|hỏng|từ chối|không ai tin|trách ngươi|quở|bị phạt|mắng|thư giả|vu khống|thất bại|không dò ra|không biết gì|cũng không biết|không thấy gì|không tìm ra|chưa duyệt/i.test(why);/* act audit: a failed search/scout read THÀNH */
 const realLoss=B.some(x=>!/^<span class="ef r">(Sức|Bạc) /.test(x));
 const netBad=!G.length&&realLoss;
 /* owner 11/15: THÀNH / BẠI come ONLY from the act's own roll (okHint true / false); no roll ("sure", null) → no seal, the neutral header
    "KẾT QUẢ" — never inferred from the log words or from how many lines are Được / Mất (failTxt / netBad stay for the old callers' log) */
 /* KIT 7.3: an act with no seal of its own (null / "sure", e.g. the night card) takes the verdict of the act it carries (kaAim) */
 const AV=kaAimVerdict(before);const av=AV.ok;if(AV.sen)sen=kaSenDeTitle(AV.sen,title)||AV.sen;kaAimUse(AV.AIM);
 const ok=okHint===true?true:okHint===false?false:av;const SL=kitResultSeal(ok),seal=SL.t;void failTxt;void netBad;
 /* ODDS CAP: a soft failure changes nothing but still shows its one BẠI line (j63 oddsSoft) */
 if(okHint===false&&window.__oddsSoft&&!sen)sen=window.__oddsSoft;window.__oddsSoft="";
 if(!G.length&&!B.length&&!sen&&!sen0&&!(K&&(K.length||K.more))/* KK42: a K.more-only Kèm still makes the card */&&!(K&&K.tgt&&K.tgt.length)&&!(K&&K.by&&K.by.length)&&!(K&&K.lo&&K.lo.length))return;if(window.__bot)return;
 let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}
 t.onclick=e=>{const kk=e.target.closest(".kkem");if(kk){e.stopPropagation();const on=!kk.classList.contains("on");kk.classList.toggle("on",on);kk.setAttribute("aria-expanded",String(on));clearTimeout(window.__rtT);return}
  if(e.target.closest(".kalog")){const tb=document.querySelector('[data-tab="log"]');if(tb)tb.click();else{try{tab="log";renderPanel()}catch(x){}}}t.classList.remove("on")};
 const rows=[];if(K.tgt&&K.tgt.length)rows.push({k:"tgt",label:"Người ấy",items:K.tgt});if(K.by&&K.by.length)rows.push({k:"by",label:"Ai làm",items:K.by});if(G.length)rows.push({k:"duoc",label:"Được",items:G});if(B.length)rows.push({k:"mat",label:"Mất",items:B});if(K.lo&&K.lo.length)rows.push({k:"lo",label:"Ẩn lộ",items:K.lo});/* REAL-PROOF-2 (OD 27/11 ~00:15Z, jcover): ONE exposure line after her bad deed, the same kit row */if(!G.length&&!B.length&&!(K&&(K.length||K.more))/* KK42: a K.more-only Kèm still makes the card */)rows.push({k:"note",label:"Ghi chú",items:['<span class="ef n">ta không được gì, cũng không mất gì</span>']});
 window.__kaKnAt=Object.assign({},S.known||{});/* W10b: the familiarity this card reflects (kaWalkKn names what rises after it) */
 window.kaLastResult={title,ok,seal,sentence:sen,fold:K.fold||null,rows:rows.map(r=>({k:r.k,label:r.label,items:r.items.map(kaPlain)})),kem:(K||[]).filter(x=>Math.round(x.d)).map(x=>`${x.v&&x.v.name||""}: ${x.k} ${kaN(Math.round(x.d))}`)};/* kem: the Kèm line as data (scans) */
 const row=r=>`<span class="kr kr-${r.k}"><span class="krl">${r.label}</span><span class="krv">${r.items.map(x=>`<span class="kitem">${typeof kitLineCap==="function"?kitLineCap(x):x}</span>`).join("")}</span></span>`;/* KK41: each result line starts its row with a capital */
 t.className="rtoast karesult "+SL.cls;
 t.innerHTML=`<div class="rt"><span class="kat"><b class="seal">${seal}</b><span class="kan">${title||""}</span></span>${sen?`<span class="ksen">${sen}</span>`:""}<span class="kb">${rows.map(row).join("")}${kitKemRow(K)}</span><span class="kalog" role="button" tabindex="0">Xem đủ trong Sổ ghi</span></div>`;
 void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),9000)};
(function(){const st=document.createElement("style");st.id="ka-res-css";st.textContent=`
.rtoast.karesult{display:block;max-width:min(94vw,520px);width:max-content;min-width:min(94vw,300px);padding:9px 12px 8px}
.rtoast.karesult .rt{display:flex;flex-direction:column;gap:4px;font-size:.84rem}
.rtoast.karesult .kat{display:flex;align-items:center;gap:8px;padding-bottom:4px;border-bottom:1px solid #e6d3ac}
.rtoast.karesult .seal{font-size:.9rem;padding:3px 8px;flex:0 0 auto}
/* K-TAG-WRAP (KK66, rule X23): a result seal word (THÀNH · BẠI · KẾT QUẢ · BỎ DỞ · CẤM · XONG) never breaks over two lines — every toast seal and the ring result card .kri-res */
.rtoast .seal,.karesult .seal{white-space:nowrap}
.rtoast.karesult .kan{font-weight:700;color:var(--ink);overflow-wrap:anywhere}
.rtoast.karesult .ksen{color:var(--ink);line-height:1.35}
.rtoast.karesult .kb{grid-template-columns:3.4rem minmax(0,1fr);font-size:.8rem;line-height:1.4}
.rtoast.karesult .kb .ef{font-weight:600}.rtoast.karesult .kb .ef.t{color:var(--ink);font-weight:700}
.rtoast.karesult .kitem{display:block;text-align:left;align-items:flex-start;justify-content:flex-start;width:auto;min-width:0}/* .kitem is also the item cell (centred): a result line is left-aligned, value next to its label */
.rtoast.karesult .kwy,.kb .kwy{color:var(--dim);font-weight:400;font-size:.74rem}

.kb .kr-kem .krl{color:var(--dim)}
/* KK41 (one kit part with OB-VERDICT-2): ANY row listing people (Kèm + a kitRows Được / Mất of person lines, j79 KIT_PLINE) = .krv.kklist > .kitem.kkemi, one line each in every container (the night card's .kitem is the centred item cell otherwise) */
html body .kr>.krv.kklist{display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:flex-start!important;gap:1px!important;text-align:left!important;min-width:0}
html body .kr>.krv.kklist>.kitem.kkemi{display:block!important;width:auto!important;max-width:100%!important;min-width:0!important;margin:0!important;padding:0!important;text-align:left!important;white-space:normal!important;border:0!important;background:none!important;box-shadow:none!important;aspect-ratio:auto!important;height:auto!important}
html body .kr>.krv.kklist>.kitem.kkemi>.ef{display:inline!important;margin:0!important;white-space:normal!important}/* MAIN 157: one person per line in every card that lists people (rtoast, night card) */
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
