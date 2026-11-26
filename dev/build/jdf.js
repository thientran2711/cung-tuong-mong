/* ================= jdf: Dư đồ FOCUS VIEW — data + act runner (review/duodo-focus; owner OD 21/11 ~06:20Z idea, ~06:50Z approval, ~06:55Z NPC-initiated) =================
   Plan + act table: dev/handover/reports/duodo-focus.md §PLAN. Numbers: BAL.df (jbaldf). View: the kit part kitFocus (K-FOCUS-1, kit keeper) — this file draws NOTHING itself.
   (1) dfActs(i)  → the groups of the person curPeople()[i] for the focus view: the SAME acts the stage pop-up offers (j2 talkOpts → kitActCat groups,
       «làm được/tổng», lock reasons, the §6.3 row html for the «!» popover) + the in-person Hậu cung acts (BAL.df.inPerson: Tát, Phạt quỳ, Hắt nước, Hắt trà,
       Quạt mực) for a consort she stands with — each still runs its OWN path (doAct: same price, same lock, same result card).
   (2) dfRun(i,id,res) → runs one act with the on-figure game result res = {raw 0..10, skipped}: class A (rolled) = ONE ladder step (sgShift, BAL.cut.sgStep)
       read by the talkOpts wrapper below only inside this call; class B (tiered: tat / nuoc / tea / ink) = the BAL.slap tier (SLAP.next / LOOKS tier);
       class C (sure) = numbers untouched; class D (open: gift picker, jsgame, jpma) = that flow opens as it is.
   (3) dfOpen(i) — the stage tap: kitFocus when the kit part exists and BAL.df.on, else the old pop-up (popIdx) so nothing changes until KIT READY.
   popIdx stays the source of truth (talk(), the log sync popMsg, co-op) — the focus view sets it on open and clears it on close.
   Co-op: everything here is her local view; acts go the existing runAct / jcoopworld path. ===================================================== */
const DF={i:null,step:0,cls:{}};window.DF=DF;
/* DELEGATE-NOMG (owner OD 25/11 ~04:12Z, canon overwrite of OD:L192/L195 for delegated acts): «Khi nào mà tôi là người tự làm thì mới có thể làm mini game
   cho tôi.» An act SHE ORDERS someone else to do never opens a mini-game: the doer's ability + the BAL odds decide it (law 4/7). ONE rule, by meaning:
   (1) the option carries a parallel-time send kind (jptime pk: every button where she sends ANOTHER person, BAL.ptime.kinds), or
   (2) it is an act done from afar / by others for her (jstagehere ACT_REMOTE), or
   (3) its name says she sends someone (Sai …, Nghe ngóng chung, Truyền / Mời thái y …, Nhờ thái giám …, Cài tai mắt / người hầu).
   Scan + before/after table: dev/test/delegate-nomg-audit.js, dev/handover/reports/delegate-nomg.md. */
/* r2 (MAIN 134, BIG rv note n3): «ask someone» acts — she only ASKS, the other person does the work or gives: «Xin bắt mạch» / «Bài thuốc dễ thụ thai» /
   «Xin thuốc …» (the Thái y examines / prescribes with his own skill), «Xin <elder> đỡ lời / che chở», «Xin / Mượn son phấn» (the other gives), «Nhờ …» (the
   other helps). Her OWN talk (Chào hỏi, Hỏi chuyện, Tâm sự, Kể tội, Mời làm thái y tâm phúc …) and her own hands (Tặng quà, Biếu, Đút lót, Lục rương …) keep their game. */
const DF_DLG=/^(Sai |Nghe ngóng chung$|Truyền (thái y|họa sư|nhạc sư)|Mời thái y|Nhờ |Cài (tai mắt|người hầu)|Xin |Mượn |Bài thuốc )/;
function dfDlg(a){if(!a)return false;const n=String(a.n||"").replace(/<[^>]+>/g,"").trim();return !!(a.pk||(typeof ACT_REMOTE==="object"&&ACT_REMOTE&&ACT_REMOTE[n])||DF_DLG.test(n))}
window.dfDlg=dfDlg;
/* class of a talk option: D = opens its own flow, E = delegated (someone else does it: no game, plain odds), A = rolled, C = sure */
function dfCls(a){if(!a)return"C";if(a.open)return"D";if(dfDlg(a))return"E";if(a.pm)return"D";const o=typeof oddsOf==="function"?oddsOf(a):(a.o==null?100:a.o);return o<100&&!a.lock?"A":"C"}
/* the engine of an act name (the act table, §PLAN 2): one rule by meaning, no per-person variant */
const DF_ENG=[
 [/^Tát$|^Hắt nước$|^Hắt trà$|^Quạt mực$/,"swipe"],[/Ngáng chân/,"swipe"],[/Đẩy nàng xuống hồ sen|Đẩy xuống hồ sen/,"tug"],
 [/^Chào hỏi|^Thỉnh an|^Nhún nhường|^Tạ lỗi/,"bow"],
 [/^Tặng quà|^Dâng |^Đưa cơm áo|^Mua |^Bài thuốc|^Xin thuốc|^Đút lót/,"drag"],[/son phấn/,"drag"],
 [/bí mật|^Rỉ tai|^Bàn tán|^Kể tội|^Cảnh báo|^Nói thật lòng|^Hỏi chuyện cũ|^Nghe ngóng|^Sai đi dò la|^Hỏi sở thích/,"ear"],
 [/^Khiêu khích|^Trút giận|^Hạ nhục|^Hặc |^Tố vượt phẩm|^Tố xa xỉ|^Phạt quỳ/,"stare"]];
function dfEng(n){const t=String(n||"").replace(/<[^>]+>/g,"");for(const [re,e] of DF_ENG)if(re.test(t))return e;return"words"}
/* the in-person Hậu cung acts of a consort she stands with (ONE act, its own lock: the same ok() the Hậu cung card asks) */
function dfInPerson(p){const v=p&&p.ref,L=[];if(!v||!(p.kind==="rival"||p.kind==="hh")||typeof ACT!=="object"||typeof rivals==="undefined")return L;
 const i=rivals.indexOf(v);if(i<0)return L;
 for(const k of (BAL.df&&BAL.df.inPerson)||[]){const a=ACT[k];if(!a)continue;let ok=false;try{ok=!!a.ok(S,v)&&together(S,v)&&(typeof k61Named!=="function"||k61Named(v))}catch(e){}/* j61: an act on a person she cannot name is blocked in doAct: never offered */if(ok)L.push({k,a,i})}
 return L}
/* the act picture: the same picture the person-card row shows (jopic kitOptPic, else the j79 act / category picture) — a url string for kitFocus */
function dfPic(n){try{const r=typeof kitOptPic==="function"?kitOptPic(n):null;if(r&&r.src)return r.src}catch(e){}try{const a=typeof kitActArt==="function"?kitActArt(n):null;if(a&&a.src)return a.src}catch(e){}return""}
function dfWord(o){return typeof KIT_ODDS!=="undefined"&&typeof oddsLv==="function"?KIT_ODDS[oddsLv(o)]:""}
/* (1) the groups — read from the person card the stage pop-up draws TODAY (j15 popCard + every wrapper: elders, servants, maids, the co-op friend …),
   so the focus view always offers exactly what the pop-up offers, for every kind of person (law 11), plus the in-person Hậu cung acts */
function dfCard(i){const p=curPeople()[i];if(!p)return null;const d=document.createElement("div");try{d.innerHTML=popCard(p,i)}catch(e){return null}return d}
function dfBtnTitle(b){const n=b.firstChild;return String(n&&n.nodeType===Node.TEXT_NODE?n.textContent:(b.childNodes[0]&&b.childNodes[0].textContent)||"").trim()}
/* a button's identity = its data-* attributes (the live card may be re-split by the kit observer; data stays) */
function dfSig(b){return Object.keys(b.dataset).filter(k=>!/^k/.test(k))/* kit decorations (ka, kart, kph, krv…) are added later by the kit observers */.sort().map(k=>k+"="+b.dataset[k]).join("&")}
/* a card with ONE pane has no tab row: its group takes the kit category name of its acts (never a nameless head tab) */
/* the kit fan draws n / word / ton / why as TEXT (escaped): game formatters (fmt, whyTime) give HTML, so every such field is reduced to its text here */
function dfTxt(h){if(!h)return"";const d=document.createElement("div");d.innerHTML=String(h);return d.textContent.replace(/\s+/g," ").trim()}
/* ONE rule: which button of a person card is an ACT. Not acts: group tabs (.pct), ✕ (#popx / .pcx / .kit-x), and the info chips of the card head
   — «Đã biết: N tin ›» (data-kintel), «Chứng cứ N ›» (data-kev), any .chip / .kchipb, anything inside .pcinfo (rv duodo-focus 43bc4ba2 #2) */
function dfIsAct(b){return !(b.classList.contains("pct")||b.id==="popx"||b.classList.contains("pcx")||b.classList.contains("kit-x")||b.classList.contains("chip")||b.classList.contains("kchipb")||b.hasAttribute("data-kintel")||b.hasAttribute("data-kev")||!!b.closest(".pcinfo"))}
window.dfIsAct=dfIsAct;
function dfCatName(acts){for(const a of acts){let c="";try{c=(typeof kitActCat==="function"&&kitActCat(a.n))||""}catch(e){}if(c&&typeof KIT_CAT!=="undefined"&&KIT_CAT[c])return KIT_CAT[c][0]}return""}
function dfActs(i){const p=curPeople()[i],d=dfCard(i);if(!p||!d)return null;let T=null;try{T=talkOpts(p)}catch(e){T=[]}
 const tabs=[...d.querySelectorAll(".pctabs .pct")].map(t=>({n:t.dataset.pct||t.textContent.trim()}));
 const panes=[...d.querySelectorAll(".pcg")];const src=panes.length?panes:[d];const out=[];
 src.forEach((g,gi)=>{const acts=[];[...g.querySelectorAll("button")].forEach((b,bi)=>{if(!dfIsAct(b))return;
   const n=dfBtnTitle(b);if(!n)return;const sm=b.querySelector("small");const why=(b.querySelector(".kwhy")||{}).textContent||"";const o=b.dataset.o!=null?T[+b.dataset.o]:null;
   const oo=o?(typeof oddsOf==="function"?oddsOf(o):(o.o==null?100:o.o)):null;/* 100 = the game's own «sure» mark on an option (o:100), not a balance number */
   acts.push({id:"g"+dfSig(b),n,cls:o?dfCls(o):"C",eng:dfEng(n),word:oo!=null&&oo<100?dfWord(oo):"",ton:o?[talkK(o)+" khắc",o.c&&o.c.bac?(-o.c.bac)+" bạc":""].filter(Boolean).join(" · "):"",
    off:!!b.disabled,why,info:b.outerHTML,small:sm?sm.innerHTML:"",pic:dfPic(n)})});
  out.push({k:"g"+gi,n:(tabs[gi]||{}).n||dfCatName(acts),acts})});
 const done=S.visit&&(S.visit.talked===true||(S.visit.tk||{})[i]);
 const DIN=(T||[]).filter(a=>a&&a.door).map(a=>a.door);
 if(!done)for(const x of dfInPerson(p)){try{const m=typeof DOOR==="object"&&DOOR.ofId?DOOR.ofId("a:"+x.k):null;if(m&&DIN.includes(m.r.k))continue}catch(e){}/* ACT-MERGE J2: inside its door in the pop-up (Hãm hại / Ra uy) */const a=x.a,hk=typeof harmK==="function"?harmK(rivals[x.i],x.k):BAL.time.cost.harm;const why=can(hk)?"":dfTxt(whyTime(hk))||"hết khắc buổi này";
  const c=(()=>{try{return (typeof kitActCat==="function"&&kitActCat(a.n))||""}catch(e){return""}})(),cn=typeof KIT_CAT!=="undefined"&&KIT_CAT[c]?KIT_CAT[c][0]:"";
  let G=out.find(g=>g.n===cn)||(!cn&&out[0]);if(!G){G={k:"x"+c,n:cn,acts:[]};out.push(G)}
  G.acts.push({id:"a"+x.k,n:a.n,cls:x.k==="phatquy"?"C":"B",eng:dfEng(a.n),word:"",ton:[hk+" khắc",typeof fmt==="function"?dfTxt(fmt(a.c||{})):""].filter(Boolean).join(" · "),off:!!why,why,info:"",small:"",pic:dfPic(a.n)})}
 return out.filter(g=>g.acts.length).map(g=>Object.assign(g,{can:g.acts.filter(a=>!a.off).length,tot:g.acts.length}))}
/* (2) run one act. res = {raw, skipped} from the on-figure game (undefined = no game played: plain odds) */
function dfStep(res){if(!res||res.skipped||res.raw==null)return 0;return typeof sgStep==="function"?sgStep(res.raw):0}
function dfRun(i,id,res){const p=curPeople()[i];DF.why="";if(!p||S.dead||Q.length){DF.why=!p?"nobody":"busy";return false}
 if(id[0]==="g"){/* the SAME button of the live pop-up card (hidden under the focus view): every existing click handler runs as before */
  popIdx=i;try{renderStage()}catch(e){}let host=document.querySelector("#popw .pcpop");if(!host){/* a re-render in between dropped it: draw the same card the stage draws (j6 renderStage line) into its own place */try{const w=document.getElementById("popw");w.innerHTML=`<div class="pop pcpop">${popCard(p,i)}</div>`;if(typeof kitFix==="function")kitFix(w)}catch(e){}host=document.querySelector("#popw .pcpop")}if(!host){DF.why="no card";return false}const sig=id.slice(1);
  const b=[...host.querySelectorAll("button")].find(x=>dfSig(x)===sig&&dfBtnTitle(x));if(!b||b.disabled){DF.why=b?"locked":"no button "+sig+" in "+[...host.querySelectorAll("button")].map(dfSig).join("|");return false}
  DF.step=dfStep(res);try{b.click()}finally{DF.step=0}return true}
 if(id[0]==="a"){const k=id.slice(1),v=p.ref,ri=rivals.indexOf(v);if(ri<0)return false;
  const tier=res&&!res.skipped&&res.raw!=null&&typeof slapTierOf==="function"?slapTierOf(res.raw):(BAL.slap?BAL.slap.def:1);
  if(k==="tat"&&typeof SLAPG==="object"&&typeof SLAP==="object"){SLAPG.busy=1;SLAP.next=tier;try{doAct(ri,k)}finally{SLAPG.busy=0;SLAP.next=0}return true}
  if(typeof LKG==="object"&&LKG&&typeof LK_ACT==="object"&&LK_ACT[k]){LKG.busy=1;LKG.next=tier;try{doAct(ri,k)}finally{LKG.busy=0;LKG.next=0}return true}
  doAct(ri,k);return true}
 return false}
/* class A: inside dfRun only, every talk option's odds move the game's ONE ladder step (the same sgShift the scheme games use) */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(!DF.step||!Array.isArray(A)||typeof sgShift!=="function")return A;
 return A.map(a=>{if(!a||a.lock||a.o==null||a.o>=100)return a;return Object.assign({},a,{o:sgShift(a.o,DF.step)})})}})();
/* (3) the stage tap */
function dfViewOn(){return !!(BAL.df&&BAL.df.on)&&typeof kitFocus==="object"&&kitFocus&&typeof kitFocus.open==="function"&&typeof window.__bot==="undefined"}
window.dfActs=dfActs;window.dfRun=dfRun;window.dfEng=dfEng;window.dfCls=dfCls;
/* ================= ACT-MERGE J2 (harm / scheme / accuse doors P5–P14; OD 26/11 ~07:25Z + ~07:32Z; plan review/act-merge §2 G1–G3): the PARTS OF THE ONE
   DOOR ENGINE (jdoor.js, J1) that read the Hậu cung card and her in-person acts. The rows (which act sits in which door, tier, roll, way) live in jdoor.js
   (DOOR.add, «J2 ext»); this file only: (1) folds the card's member buttons into door buttons (the outermost rvGroups wrapper), (2) gives PEND «door» its
   members from the card (DOOR.cardM) and from her in-person acts in the pop-up (DOOR.more), each running its OLD click path (jsgame scheme game →
   doAct + every wrapper: j70 chains, jtamco ways, jslap / jlooks games, jptime sends; empAct), with the old button's own kit line (law 4: nothing typed). ==== */
/* one card button html → {n, x (its raw kit line), why, off} */
const DOOR_LAB={"tốn":"tốn","thành":"thành","được":"thành","bại":"hỏng","hỏng":"hỏng","mất":"hỏng","kèm":"kèm"};
/* the raw kit line of an old button («<odds word> · tốn: … · thành: … · hỏng: … · kèm: …»), read back from its kit rows (a card button is kit-parsed
   already; the option card reads the raw line, dilLineRaw / kitOptFinal), so the option shows the SAME rows the old button showed */
function doorLineOf(s){if(!s)return"";const seg=[];const od=s.querySelector(".kodm");const w=od?(od.getAttribute("title")||od.textContent||"").trim():"";if(w)seg.push(w);
 const rows=[...s.querySelectorAll(".kr")];if(!rows.length){const t=s.textContent.replace(/\s+/g," ").trim();if(t&&t!==w)seg.push(t);return seg.join(" · ")}
 const notes=[],lab=[];for(const r of rows){const l=((r.querySelector(".krl")||{}).textContent||"").trim().toLowerCase();const it=[...r.querySelectorAll(".krv .ef, .krv .kwhy")].map(e=>e.textContent.replace(/\s+/g," ").trim()).filter(Boolean);
  if(!it.length)continue;const L=DOOR_LAB[l];if(!L){notes.push(...it);continue}lab.push(L==="tốn"?`tốn: ${it.join(", ")}`:`${L}: ${it.join(" · ")}`)}
 return seg.concat(notes,lab).join(" · ")}
function doorCardBtn(h){const d=document.createElement("div");d.innerHTML=String(h||"");const b=d.querySelector("button");if(!b)return null;
 const w=b.querySelector(".kwhy");const why=w?w.textContent.trim():"";if(w)w.remove();const s=b.querySelector("small");const x=doorLineOf(s);if(s)s.remove();
 return {n:b.innerHTML.trim(),x,why,off:b.disabled||!!why}}
/* the member id of a card button: a:<k> (data-a) · e:<k> (data-e Quyền Hoàng hậu) */
function doorCardId(h){h=String(h||"");const m=h.match(/^\s*<button([^>]*)>/);if(!m)return"";let x;if((x=m[1].match(/\bdata-a="([^"]+)"/)))return"a:"+x[1];
 if((x=m[1].match(/\bdata-e="[^"]*"[^>]*\bdata-k="([^"]+)"/)))return"e:"+x[1];return""}
function doorJ2Id(id){const m=id&&typeof DOOR==="object"&&DOOR.ofId?DOOR.ofId(id):null;return m&&m.r.kinds.includes("card")?m:null}
/* the card click path of an ACT key: the same as tapping its old button (jsgame scheme game first, then j6 → doAct with every wrapper) */
function doorFireAct(i,k){const v=rivals[i];if(!v)return;try{if(typeof SG==="object"&&SG&&SG.K&&SG.K[k]&&typeof sgCan==="function"&&sgCan(i,k)&&typeof sgAsk==="function"){sgAsk({j:"act",v:v.id,k},sgTitle(k));return}}catch(e){console.error(e)}doAct(i,k)}
window.doorFireAct=doorFireAct;
const DOORC={raw:0};
/* the card members of row r: every old button of the card in that row (raw rvGroups, every other wrapper applied) */
function doorCardAll(i){const v=rivals[i];if(!v)return[];DOORC.raw++;let G=[];try{G=rvGroups(v,i)}finally{DOORC.raw--}
 const L=[];for(const g of G)for(const h of g[1]||[]){const id=doorCardId(h);const m=doorJ2Id(id);if(!m)continue;const b=doorCardBtn(h);if(!b)continue;
  const k=id.slice(2);b.id=id;b.r=m.r;b.go=id[0]==="a"?()=>doorFireAct(i,k):()=>empAct(i,k);L.push(b)}return L}
function doorJ2Attach(){if(typeof DOOR!=="object"||!DOOR||DOOR.cardM)return;
 DOOR.cardM=(i,r)=>doorCardAll(i).filter(b=>b.r===r);/* card members (J1 owns DOOR.card = the generic card) */
 /* her in-person Hậu cung acts in the pop-up (dfInPerson: Tát, Phạt quỳ, Hắt nước, Hắt trà, Quạt mực) — same lock; lines = her card's rows */
 DOOR.more=(p,r)=>{try{const v=p&&p.ref;if(!v||!(p.kind==="rival"||p.kind==="hh"))return[];const done=S.visit&&(S.visit.talked===true||(S.visit.tk||{})[curPeople().indexOf(p)]);if(done)return[];
  const ks=dfInPerson(p).map(x=>"a:"+x.k).filter(id=>{const m=DOOR.ofId(id);return m&&m.r===r});if(!ks.length)return[];const ri=rivals.indexOf(v);return doorCardAll(ri).filter(b=>ks.includes(b.id))}catch(e){console.error("door more",e);return[]}}}
/* (1) the consort card: the outermost rvGroups wrapper folds the member buttons into ONE door button per row (kit group = the row's cat) */
(function(){if(typeof rvGroups!=="function")return;const g0=rvGroups;rvGroups=function(v,i){const G=g0.apply(this,arguments);if(DOORC.raw||!v)return G;
 try{doorJ2Attach();if(typeof DOOR!=="object"||!DOOR.cardM)return G;const left=[],M=new Map();
  for(const g of G){const keep=[];for(const h of g[1]||[]){const id=doorCardId(h);const m=doorJ2Id(id);if(m){if(m.role!=="hide"){const b=doorCardBtn(h);if(b){b.id=id;if(!M.has(m.r))M.set(m.r,[]);M.get(m.r).push(b)}}}else keep.push(h)}
   if(keep.filter(Boolean).length)left.push([g[0],keep])}
  const add={};for(const r of DOOR.T){const L=M.get(r);if(!L||!L.length)continue;const gn=r.k==="P13"?"Quyền Hoàng hậu":(KIT_CAT[r.cat]||[r.cat])[0];
   const O=DOOR.rowsJ2(r,L,v);const line=O.map(o=>o.n.replace(/<[^>]+>/g,"")).slice(0,4).join(" · ")+(O.length>4?" …":"");const why=O.some(o=>!o.off)?"":((O.find(o=>o.off)||{}).off||{}).why||"chưa làm được";
   (add[gn]=add[gn]||[]).push(L.length===1&&!(r.roll||[]).length?(G.flatMap(g=>g[1]).find(h=>doorCardId(h)===L[0].id)||""):pbtn(`data-door="${r.k}" data-dr="${i}"`,r.n,line,why))}
  for(const gn in add){const g=left.find(x=>x[0]===gn);if(g)g[1]=g[1].concat(add[gn]);else left.push([gn,add[gn]])}
  return left}catch(e){console.error("door rvGroups",e);return G}}})();
/* the card door tap (capture before j6 #panel): the ONE PEND «door» (jdoor), card mode */
document.addEventListener("click",e=>{try{const b=e.target.closest&&e.target.closest("button[data-door][data-dr]");if(!b||b.disabled)return;e.stopPropagation();e.preventDefault();
 if(typeof S==="undefined"||!S||S.dead||Q.length)return;const d=mkP("door",{r:+b.dataset.dr,k:b.dataset.door});if(!d)return;pushDil(d,(DOOR.byK(b.dataset.door)||{}).n);showModal();render()}catch(x){console.error("door tap",x)}},true);
/* a door is only the old buttons in one place: the old card / pop-up buttons never passed the once-per-life «Kiếp này chưa trọn» gate (jkiep kpGate
   reads «chết» in a line — here the SENT servant's «có khi bị đánh chết»), so a door row does not either; the act's own cards follow as before */
(function(){const k0=window.kpGate;if(typeof k0!=="function")return;window.kpGate=function(i){try{const m=Q[0];if(m&&m.pid==="door")return false}catch(e){}return k0.apply(this,arguments)}})();
setTimeout(doorJ2Attach,0);
