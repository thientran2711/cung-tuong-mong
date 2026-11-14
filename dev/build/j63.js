/* ================= j63 ACT CARD (kit): ONE layout for every act card, person-card act, dialog option and action button =================
   [title row: name ............ odds chip]
   Vì sao  reason it is closed (disabled only)
   Tốn     price: time (dark), resources (red)
   Được    what she gains (green)
   Mất     what she loses if it fails (red)   ("hỏng" maps here)
   Kèm     side risks that come with it (red)
   Ghi chú notes (neutral, small)
   Empty rows are left out; rows are always in this order; a value is placed by meaning: a gain is green and in Được, a loss is red.
   kitParse() now returns these rows; kaNorm() rebuilds every button of the game into the frame (cards, .pcb, .opt, .btn, .rbtn). Spec: dev/kit/KIT.md "Act card". */
const KA_ROWS=[["why","Vì sao"],["ton","Tốn"],["duoc","Được"],["mat","Mất"],["kem","Kèm"],["note","Ghi chú"]];
const KA_ODDS=/^(Chắc chắn|Nắm chắc|Rất chắc|Khá chắc|Năm ăn năm thua|Chắc|Khó lường|Khó|Liều)$/;
const KA_TIME=/^(?:[●○]+\s*)?\d+(?:\s*[-–]\s*\d+)?\s*(khắc|việc)$/i;
const KA_STAT=/^(Bạc|Sức|Sủng|Danh|Đức|Sắc|Tài|Tâm cơ|Tai mắt|Ân tình|Thai)\s*-\s?\d/;
const kaPlain=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
/* sentiment of one value for her: g gain, r loss, n neutral word */
const kaWord=h=>String(h).replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${n}`).replace(/thân -(\d+)/g,"thiện cảm -$1").replace(/thân \+(\d+)/g,"thiện cảm +$1");
function kaSent(h,old){const s=kaPlain(h);if(!s)return"n";let c="n";try{c=kcls(h)}catch(e){}if(c==="n"&&(old==="g"||old==="r"))c=old;
 /* sign wins: a value whose only number is negative is a loss for her (unless it is harm to a rival or less hostility) */
 if(c!=="r"&&/[-−]\s?\d/.test(s)&&!/\+\s?\d/.test(s)&&!/(^|\s)(nàng|con nàng|của nàng|hắn)(\s|$)/.test(s)&&!/(ghen|oán|thù|nghi)\s*[-−]/.test(s))c="r";return c}
/* split one value "X +1 (note)" into value + trailing note */
function kaSplitNote(h){const s=kaPlain(h);const m=s.match(/^(.*\S)\s+(\([^()]*\))$/);if(m&&/[+-]\s?\d/.test(m[1])&&!/[<>]/.test(h))return[m[1],m[2]];return[h,""]}
/* read the old kit HTML (odds chip, kl labels, ef values, kwhy) into a model */
function kaModel(html){const t=document.createElement("template");t.innerHTML=String(html||"");const M={odds:"",oddsX:"",items:[]};let lab="",afterOdds=false;
 const push=(h,old,l)=>{h=kaWord(h);const p=kaPlain(h);if(!p||p==="·")return;
  const lm=p.match(/^(được ngay|ngay|tốn|thành|được|hỏng|mất|kèm)\s*:\s*/i);if(lm&&!/</.test(h)){l=lm[1].toLowerCase();h=p.slice(lm[0].length);if(!h)return}
  if(!M.odds&&KA_ODDS.test(p)){M.odds=p;return}
  M.items.push({h,old,l:l==null?lab:l})};
 const walk=nodes=>{for(const n of nodes){
  if(n.nodeType===3){const s=n.textContent;if(s.trim()&&s.trim()!=="·"){s.split(/\s·\s/).forEach(x=>push(x.trim(),"n"))}continue}
  if(n.nodeType!==1)continue;const cl=n.classList;
  if(cl.contains("oc")){M.odds=n.textContent.trim();afterOdds=true;continue}
  if(cl.contains("ksep"))continue;
  if(cl.contains("kl")){lab=n.textContent.trim().toLowerCase();afterOdds=false;continue}
  if(cl.contains("kwhy")){const w=kaPlain(n.innerHTML).replace(/[\s—-]+$/,"");if(w)M.items.push({h:w,old:"r",l:"why"});continue}
  if(cl.contains("ef")){const old=cl.contains("g")?"g":cl.contains("r")?"r":"n";if(afterOdds&&!lab){M.oddsX+=n.outerHTML;afterOdds=false;continue}afterOdds=false;push(n.innerHTML,old);continue}
  if(n.tagName==="BR")continue;
  if(n.tagName==="SPAN"&&!n.className||cl.contains("kgrid")||cl.contains("krow")||n.tagName==="SMALL"){walk(n.childNodes);continue}
  afterOdds=false;push(n.outerHTML,"n")}};
 walk(t.content.childNodes);return M}
/* read a raw line 'word · tốn: … · thành: … · hỏng: … · note' (segments keep whether they continue a label) */
function kaModelStr(str){str=String(str||"").replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${n}`).replace(/thân -(\d+)/g,"thiện cảm -$1").replace(/thân \+(\d+)/g,"thiện cảm +$1").trim();
 const M={odds:"",oddsX:"",items:[]};let lab="";const segs=str.split(/ · (?![^<]*>)/);
 for(const s0 of segs){const plain=kaPlain(s0);if(!plain)continue;
  if(!M.odds&&KA_ODDS.test(plain)){M.odds=plain;continue}
  if(/^Quẻ: /.test(plain)&&M.odds){const r=plain.slice(5);M.oddsX+=`<span class="ef ${/khó hơn/.test(r)?"r":/dễ hơn/.test(r)?"g":"n"}">Quẻ: ${r}</span>`;continue}
  let s=s0,cont=true;const ml=s.match(/^\s*(?:<[^>]+>)*\s*(được ngay|ngay|tốn|thành|thắng|được|hỏng|mất|kèm)\s*:\s*/i);
  if(ml){lab=ml[1].toLowerCase();if(lab==="thắng"||lab==="được")lab="thành";if(lab==="mất")lab="hỏng";if(lab==="được ngay")lab="ngay";cont=false;s=s.slice(ml[0].length);
   const open=(ml[0].match(/<(span|b)[^>]*>/g)||[]).length;if(open&&/^\s*</.test(ml[0])){const tg=ml[0].match(/<(span|b)( class="(g|r)")?[^>]*>/);s=(tg?tg[0]:"")+s}}
  else{const m2=plain.match(/^tốn (\d+ khắc)$/);if(m2){M.items.push({h:m2[1],old:"n",l:"tốn",cont:false});continue}}
  for(let v of (/(^|\s)nàng(\s|$)/.test(kaPlain(s))?[s]:s.split(/, (?![^<]*>)/))){const vp=kaPlain(v);if(!vp)continue;const om=v.match(/^\s*<(?:span|b) class="(g|r)"/);M.items.push({h:/^\s*<(span|b) class="[gr]">[^<]*<\/\1>\s*$/.test(v)?vp:v.trim(),old:om?om[1]:"n",l:lab,cont})}}
 return M}
const KA_RISK=/^(có thể bị|bị lộ|bị khám|Đức \d+ → \d+|dễ lộ|có khi bị)/i;
/* place every value in its row by meaning */
function kaRows(M){const R={why:[],ton:[],duoc:[],mat:[],kem:[],note:[]};const add=(r,h,c)=>{if(!R[r].some(x=>kaPlain(x.h)===kaPlain(h)))R[r].push({h,c})};
 const sure=!M.odds||/^Chắc chắn/.test(M.odds);
 for(const it of M.items){let [h,nt]=kaSplitNote(it.h);if(nt)add("note",nt,"n");const p=kaPlain(h);if(!p)continue;const c=kaSent(h,it.old);const neu=KNEU.test(p);const l=it.l||"";const cont=!!it.cont;
  if(/[+−-]\s?0(?![\d.,])/.test(p)&&!/[+−-]\s?(0[.,]\d*[1-9]|[1-9])/.test(p)){add("note",p.replace(/\s?[+−-]\s?0(?![\d.,])/g," không đổi"),"n");continue}
  if(l==="why"){add("why",h,"r");continue}
  if(/^\(.*\)$/.test(p)){add("note",h,"n");continue}
  if(KA_TIME.test(p)){add("ton",p.replace(/^[●○]+\s*/,""),"t");continue}
  if(KA_RISK.test(p)){add("kem",h,"r");continue}
  if(l==="tốn"&&!cont){if(neu)add("ton",h,"n");else if(c==="g")add("duoc",h,"g");else if(/\d/.test(p)&&(c==="r"||/[-−]\s?\d/.test(p)))add("ton",h,"r");else add("kem",h,"r");continue}
  if(l==="ngay"&&!cont){if(neu)add("note",h,"n");else if(c==="r")add("ton",h,"r");else add("duoc",h,"g");continue}
  if(l==="thành"){if(neu)add("note",h,"n");else if(c==="r")add(sure?(KA_STAT.test(p)?"ton":/[-−]\s?\d/.test(p)?"mat":"kem"):"kem",h,"r");else if(c==="n"&&cont&&!/\d/.test(p)&&/(nếu|có khi|tang vật)/.test(p))add("note",h,"n");else add("duoc",h,"g");continue}
  if(l==="hỏng"&&!cont){add("mat",h,/^không (được )?mất gì$/i.test(p)?"n":c==="g"&&/\+\s?\d/.test(p)&&!/-\s?\d/.test(p)?"g":"r");continue}
  if(l==="hỏng"&&cont){if(c==="r")add("kem",h,"r");else add("note",h,"n");continue}
  if(l==="kèm"){add("kem",h,neu?"n":"r");continue}
  /* unlabelled or after tốn */
  if(neu){add("note",h,"n");continue}
  if(c==="g"){add("duoc",h,"g");continue}
  if(c==="r"){add(KA_STAT.test(p)?"ton":"kem",h,"r");continue}
  add("note",h,"n")}
 if(R.mat.length>1)R.mat=R.mat.filter(x=>!/^không mất gì$/i.test(kaPlain(x.h)));
 if(R.ton.length>1)R.ton=R.ton.filter(x=>!/^không(\s|$)/i.test(kaPlain(x.h)));
 return R}
function kaOdds(M){if(!M.odds||/^Chắc chắn/.test(M.odds))return"";if(M.odds==="Khó lường")return `<span class="oc oc2">Khó lường</span>`;return oddsChip(M.odds)+M.oddsX}
function kaBody(R,dis){return `<small class="kb${dis?" kbdis":""}">`+KA_ROWS.filter(([k])=>R[k].length).map(([k,lab])=>`<span class="kr kr-${k}"><span class="krl">${lab}</span><span class="krv">${R[k].map(x=>k==="why"?`<span class="kwhy">${x.h}</span>`:`<span class="ef ${x.c}">${x.h}</span>`).join('<span class="ksep">·</span>')}</span></span>`).join("")+`</small>`}
/* kitParse: same input, kit rows out (odds chip first, the frame moves it to the title row) */
(function(){const kp0=kitParse;kitParse=function(str){const s=String(str||"");if(/class="kb/.test(s))return s;const M=kaModelStr(s);const R=kaRows(M);const o=kaOdds(M);return (o?`<span class="kodds">${o}</span>`:"")+kaBody(R).replace(/^<small class="kb">/,'<span class="kb">').replace(/<\/small>$/,"</span>")}})();
/* ---------- the frame: rebuild a button into [title + odds] + rows ---------- */
const KA_SEL="button.kcard,.pcb button,.rbtn button,button.btn,button.opt,.opts button,.srvb button";
function kaNorm1(b){if(b.dataset.ka==="1"){const kan=b.querySelector(":scope > .kat > .kan");if(kan)[...b.childNodes].reverse().forEach(n=>{if(n.nodeType===1&&!n.matches(".kat,.klead,.kb,.kinfo"))kan.prepend(n)});return}if(b.closest(".hud2,#hud2,.tabs,.mapnav"))return;
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
  R={why:[],ton:[],duoc:[],mat:[],kem:[],note:[]};
  t.content.querySelectorAll(".kr").forEach(r=>{const k=[...r.classList].find(c=>c.startsWith("kr-")).slice(3);if(!R[k])return;r.querySelectorAll(".krv>.ef,.krv>.kwhy").forEach(e=>R[k].push({h:e.innerHTML,c:k==="why"?"r":e.classList.contains("g")?"g":e.classList.contains("r")?"r":e.classList.contains("t")?"t":"n"}))});
  t.content.querySelectorAll(".kwhy").forEach(w=>{if(!w.closest(".kr-why")){const x=kaPlain(w.innerHTML).replace(/[\s—-]+$/,"");if(x&&!R.why.some(y=>y.h===x))R.why.push({h:x,c:"r"})}});}
 else{M=kaModel(bodyHTML);R=kaRows(M);odds=kaOdds(M)}
 extraTime.reverse().forEach(x=>R.ton.unshift({h:x,c:"t"}));if(R.ton.length>1)R.ton=R.ton.filter(x=>!/^không(\s|$)/i.test(kaPlain(x.h)));
 if(dis&&!R.why.length){let w="";try{w=typeof guessWhy==="function"?guessWhy(b):""}catch(e){}if(w)R.why.push({h:w,c:"r"})}
 const kinfo="";
 b.classList.add("ka");b.classList.toggle("kdis",dis);
 b.innerHTML=`<span class="kat"><span class="kan">${titleH||"&nbsp;"}</span>${odds?`<span class="kodds">${odds}</span>`:""}</span>`+(leadH?`<span class="klead">${leadH}</span>`:"")+kaBody(R,dis)+kinfo}
function kaNorm(root){try{(root||document).querySelectorAll(KA_SEL).forEach(b=>{try{kaNorm1(b)}catch(e){console.error("kaNorm",e)}})}catch(e){}}
/* disabled state can change after build: keep the class honest */
let kaQ=false;const kaMO=new MutationObserver(ms=>{if(kaQ)return;let hit=false;for(const m of ms){if(m.type==="attributes"){const b=m.target;if(b.classList&&b.classList.contains("ka"))b.classList.toggle("kdis",b.disabled);continue}if(m.addedNodes.length){hit=true}}if(hit){kaQ=true;queueMicrotask(()=>{kaQ=false;kaNorm(document)})}});
kaMO.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["disabled"]});
(function(){const kf=kitFix;kitFix=function(root){kf.apply(this,arguments);kaNorm(root)}})();
/* ---------- the look (scoped to .ka act cards / options) ---------- */
(function(){const st=document.createElement("style");st.id="ka-css";st.textContent=`
button.ka{display:flex!important;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:3px;text-align:left;background:#fffaf0;border:1px solid var(--line);border-radius:8px;padding:6px 9px 7px!important;color:var(--ink);font-family:inherit;font-size:.82rem;line-height:1.3;min-height:0;height:auto!important;max-height:none!important;overflow:visible!important;white-space:normal!important;box-shadow:inset 0 0 0 1px #fff8,0 1px 0 #d9c49a55}
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
button.ka .krv .ef.g{color:var(--good)}
button.ka .krv .ef.r{color:var(--bad)}
button.ka .krv .ef.t{color:var(--ink);font-weight:600}
button.ka .krv .ef.n{color:var(--dim);font-weight:400}
button.ka .krv .ksep{color:#b9a27a;margin:0 4px}
button.ka .kr-why .krl{color:var(--bad)}
button.ka .kr-why .kwhy{color:var(--bad);font-weight:600;display:inline}
button.ka .kr-note .krv{font-size:.7rem}
button.ka .kr-note .krv .ef{color:var(--dim);font-weight:400}
button.ka.kdis,button.ka:disabled{opacity:1!important;background:#eee7da!important;border-color:#d4c8b2;cursor:default;filter:none}
button.ka.kdis .kan,button.ka:disabled .kan{color:#7d7263}
button.ka.kdis .kodds,button.ka:disabled .kodds{filter:grayscale(1);opacity:.7}
button.ka.kdis .kr-mat,button.ka.kdis .kr-kem,button.ka:disabled .kr-mat,button.ka:disabled .kr-kem{display:none}
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
@media (max-width:1199px){.cards:has(> button.ka){grid-template-columns:repeat(2,minmax(0,1fr))!important}}
@media (max-width:599px){button.ka small.kb{grid-template-columns:3.3rem minmax(0,1fr)}.cards:has(> button.ka){grid-template-columns:1fr!important}.pcb:has(> button.ka){grid-template-columns:1fr!important}.opts:has(> button.ka),.rbtn:has(> button.ka){grid-template-columns:1fr!important}button.ka{padding:6px 8px 7px!important}}
`;document.head.appendChild(st)})();
/* ================= RESULT CARD (kit): after every act/choice — [seal THÀNH/HỎNG | act name] · one sentence · Được (green) · Mất (red, grouped per person) · "Xem đầy đủ ở Nhật ký" =================
   Built from REAL deltas (snapshot before → now), never from the option preview: no ranges, no "có thể"; two-way relations merged into one plain phrase. */
const KA_RANKRE=new RegExp("("+RANKS.map(r=>r.n).join("|")+")\\s*$","i");
function kaWho(v){const r=v&&RANKS[v.rank];return (r&&v!==S?r.n+" ":"")+(v&&v.name||"")}
function kaTitled(s){for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||!v.name||!s.includes(v.name)||!RANKS[v.rank])continue;const rn=RANKS[v.rank].n;s=s.split(v.name).map((x,i,a)=>i<a.length-1&&!KA_RANKRE.test(x)?x+rn+" ":x).join(v.name)}return s}
const kaN=n=>(n>0?"+":"−")+Math.abs(n);
function kaSentence(before){const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-before.seq));const L=S.logs.slice(0,n).reverse().map(h=>plain(String(h).replace(/<span class="ld">[^<]*<\/span>/,"")));
 const ok=L.filter(t=>t&&!/→/.test(t)&&!/(thành|hỏng|kèm|tốn|được ngay)\s*:/i.test(t)&&!/\+\d+\.\.\d/.test(t)&&!/^\[/.test(t)&&!/\b(Thành|Hỏng)\.\s*·/.test(t)&&!/(^|\s)có thể\s/.test(t));
 if(!ok.length)return"";const s=ok[0].split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ỹ"“])/)[0];return kaTitled(s)}
function kaResultRows(before){const G=[],B=[];const skip=new Set();
 const q=typeof queenP==="function"?queenP():null;const R=before.rel||{};
 const per=[];/* [who, goodParts, badParts] */
 for(const v of (typeof rivals!=="undefined"?rivals:[])){const b=R[v.id];if(!b)continue;const a=aff(v,S),m=aff(S,v),e=v.ev||0,g=v.ghen||0,o=Math.round(oan(v,S));const gp=[],bp=[];
  let da=a-b.a;if(v===q&&q!==S&&before.hh!=null){const dh=(S.hh||0)-before.hh;if(dh){skip.add("hh");if(!da)da=dh}}
  if(da)(da>0?gp:bp).push(`${da>0?"quý ngươi hơn":"ghét ngươi hơn"} (thiện cảm ${kaN(da)})`);else if(m!==b.m)(m>b.m?gp:bp).push(`ngươi ${m>b.m?"quý nàng hơn":"bớt ưa nàng"} (${kaN(m-b.m)})`);
  if(g!==b.g)(g<b.g?gp:bp).push(g>b.g?`ghen ${kaN(g-b.g)}`:`bớt ghen ${b.g-g}`);
  if(o!==b.o)(o<b.o?gp:bp).push(o>b.o?`oán ${kaN(o-b.o)}`:`bớt oán ${b.o-o}`);
  if(e!==b.e)(e>b.e?gp:bp).push(`chứng cứ về nàng ${kaN(e-b.e)}`);
  if(gp.length||bp.length)per.push([kaWho(v),gp,bp])}
 for(const [k,nm] of RKEYS){if(skip.has(k))continue;const now=S[k]||0,d=now-(before[k]||0);if(!d)continue;
  if(k==="th"||k==="hh"){const who=k==="th"?"Thái hậu":(q&&q!==S?kaWho(q):"Hoàng hậu");per.push([who,d>0?[`quý ngươi hơn (${before[k]}→${now}, ${kaN(d)})`]:[],d<0?[`ghét ngươi hơn (${before[k]}→${now}, ${kaN(d)})`]:[]]);continue}
  (d>0?G:B).push(`<span class="ef ${d>0?"g":"r"}">${nm} ${before[k]}→${now} (${kaN(d)})</span>`)}
 if(S.maid&&before.maid!=null&&S.maid.loyal!==before.maid){const d=S.maid.loyal-before.maid;(d>0?G:B).push(`<span class="ef ${d>0?"g":"r"}">Lòng ${S.maid.name} ${before.maid}→${S.maid.loyal} (${kaN(d)})</span>`)}
 for(const [who,gp,bp] of per){if(gp.length)G.push(`<span class="ef t">${who}:</span> <span class="ef g">${gp.join(", ")}</span>`);if(bp.length)B.push(`<span class="ef t">${who}:</span> <span class="ef r">${bp.join(", ")}</span>`)}
 return [G,B]}
resultShow=function(title,before,okHint){if(!S||!before||S.dead)return;
 const [G,B]=kaResultRows(before);const n=Math.max(0,(S.logSeq||0)-before.seq);let sen="";try{sen=kaSentence(before)}catch(e){}if(sen&&kaPlain(sen).replace(/[.!…\s]+$/,"").toLowerCase()===kaPlain(title||"").replace(/[.!…\s]+$/,"").toLowerCase())sen="";
 const why=S.logs.slice(0,Math.min(n,S.logs.length)).map(plain).join(" ");
 const ok=okHint==="sure"?true:okHint===false?false:okHint===true?true:!(/chặn kịp|phát giác|bị lộ|bị bắt|không thành|hỏng|từ chối|không ai tin/i.test(why));
 if(!G.length&&!B.length&&!sen)return;if(window.__bot)return;
 let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}
 t.onclick=e=>{if(e.target.closest(".kalog")){const tb=document.querySelector('[data-tab="log"]');if(tb)tb.click();else{try{tab="log";renderPanel()}catch(x){}}}t.classList.remove("on")};
 const row=(k,l,a)=>a.length?`<span class="kr kr-${k}"><span class="krl">${l}</span><span class="krv">${a.join('<span class="ksep">·</span>')}</span></span>`:"";
 t.className="rtoast karesult "+(ok?"ok":"bad");
 t.innerHTML=`<div class="rt"><span class="kat"><b class="seal">${ok?"THÀNH":"HỎNG"}</b><span class="kan">${title||""}</span></span>${sen?`<span class="ksen">${sen}</span>`:""}<span class="kb">${row("duoc","Được",G)}${row("mat","Mất",B)}${!G.length&&!B.length?row("note","Ghi chú",['<span class="ef n">không đổi chỉ số</span>']):""}</span><span class="kalog" role="button" tabindex="0">Xem đầy đủ ở Nhật ký</span></div>`;
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
.rtoast.karesult .kalog{align-self:flex-end;font-size:.74rem;color:var(--gold);text-decoration:underline;cursor:pointer}
`;document.head.appendChild(st)})();
