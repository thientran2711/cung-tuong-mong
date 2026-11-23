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
/* class of a talk option: D = opens its own flow, A = rolled, C = sure */
function dfCls(a){if(!a)return"C";if(a.open)return"D";if(a.pm)return"D";const o=typeof oddsOf==="function"?oddsOf(a):(a.o==null?100:a.o);return o<100&&!a.lock?"A":"C"}
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
 if(!done)for(const x of dfInPerson(p)){const a=x.a,hk=typeof harmK==="function"?harmK(rivals[x.i],x.k):BAL.time.cost.harm;const why=can(hk)?"":dfTxt(whyTime(hk))||"hết khắc buổi này";
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
