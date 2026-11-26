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
   acts.push({id:"g"+dfSig(b),n,cls:b.dataset.door?"D"/* ACT-MERGE J2: a door opens its own dialog (its acts keep their own games) */:o?dfCls(o):"C",eng:dfEng(n),word:oo!=null&&oo<100?dfWord(oo):"",ton:o?[talkK(o)+" khắc",o.c&&o.c.bac?(-o.c.bac)+" bạc":""].filter(Boolean).join(" · "):"",
    off:!!b.disabled,why,info:b.outerHTML,small:sm?sm.innerHTML:"",pic:dfPic(n)})});
  out.push({k:"g"+gi,n:(tabs[gi]||{}).n||dfCatName(acts),acts})});
 const done=S.visit&&(S.visit.talked===true||(S.visit.tk||{})[i]);
 if(!done)for(const x of dfInPerson(p)){if(typeof DOOR_M==="object"&&DOOR_M["a:"+x.k])continue;/* ACT-MERGE J2: inside its door (Hãm hại nhẹ / Ra uy) */const a=x.a,hk=typeof harmK==="function"?harmK(rivals[x.i],x.k):BAL.time.cost.harm;const why=can(hk)?"":dfTxt(whyTime(hk))||"hết khắc buổi này";
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
/* ================= ACT-MERGE J2 (MAIN CHÍNH 155, OD 26/11 ~07:25Z + ~07:32Z; plan review/act-merge §2 G1–G3, dup-report HANHSU_MERGE §3.1 P5–P14 / §3.4):
   ONE FEATURE = ONE BUTTON on the Hậu cung consort card AND the Dư đồ person pop-up (focus view). DOOR = the one table below (the ONLY place that says
   which old act sits in which door, at which tier, as which kind):
     rep  = the ONE representative act of a tier (her examples: Hãm hại nhẹ Hất trà · vừa Hủy dung · nặng Hạ độc)
     roll = the button goes, its outcome lives on as a result of that tier (§3.4 «roll»): the tier offers ONE act, picked among rep + rolls that can run
            now, fixed for this target this buổi (doorPick), so the card she reads is the act that runs (law 4: its own BAL line, nothing typed here)
     way  = a way chosen inside the door, it keeps its own cost, odds and full outcome
     hide = folded into another way (spyk «Tự đi dò la» → «sai người», MAIN 153 per OD ~05:35Z: no self-search way)
   Members: "a:<ACT key>" (card data-a / in-person act, run = the exact card click path: jsgame scheme game → doAct + every wrapper),
            "e:<k>" (Quyền Hoàng hậu data-e, empAct), "t:<talkOpts name>" (the pop-up option, run = talk(oi): every talk wrapper, same price/odds/result).
   The door opens the kit option dialog (pushDil → kitOptFinal option cards, KIT §6.2b: no new kit part); each option card shows the SAME kit rows the
   old button showed (its raw kit line, read back from its rows: doorRaw). Old outcomes, deeds (jtruth), evidence, minigames (jslap/jlooks/jsgame/j70 chains) unchanged.
   Two-way (law 1): NPCs run the same ACT keys (jagharm haOpts); doorOf(k) gives the door + tier of any key for both sides. ================= */
const DOOR=[
 {id:"P5",n:"Dò la",cat:"muu-ke",T:[[null,["a:spy","t:Dò la"],[],["a:bribe","a:bribel","t:Nghe lén câu chuyện"]]],hide:["a:spyk"]},
 {id:"P6",n:"Khiêu khích",cat:"giao-thiep",T:[["nhẹ",["t:Khoe quà ngự ban"],[],[]],["vừa",["t:Khiêu khích"],[],["t:Trút giận"]],["nặng",["t:Hạ nhục"],[],[]]]},
 {id:"P7",n:"Hãm hại",cat:"hai-nguoi",T:[["nhẹ",["a:tea"],["a:nuoc","a:ink","a:trip","t:Ngáng chân"],[]],["vừa",["a:huydung"],["a:rash"],["a:thathu"]],
   ["nặng",["a:poison","t:Hạ độc"],[],["a:slowpoison","a:pgift","a:pushp","t:Đẩy xuống hồ sen"]]]},
 {id:"P8",n:"Hạ uy thế",cat:"muu-ke",T:[["nhẹ",["a:rumor","t:Tung tin đồn"],[],[]],["vừa",["a:block"],[],["a:blockf","a:lygian"]],["nặng",["a:frame","t:Vu oan"],[],["a:plant","a:giahoa","a:xinhh"]]]},
 {id:"P9",n:"Hại hoàng tự",cat:"hai-nguoi",T:[["nhẹ",["a:ksab"],[],[]],["vừa",["a:musk"],[],["a:kframe"]],["nặng",["a:kpoison"],[],["a:catswap","a:pond","t:Đẩy con nàng xuống hồ"]]]},
 {id:"P10",n:"Lấy của",cat:"hai-nguoi",T:[["nhẹ",["a:batnat"],[],[]],["vừa",["a:laydo"],[],["a:laydol","a:petsteal","a:thaopet"]],["nặng",["a:phonghoa"],[],[]]]},
 {id:"P11",n:"Tố cáo",cat:"muu-ke",T:[[null,["a:accuse"],[],["a:tocao","a:expose","a:xx","a:vp","t:Tố xa xỉ","t:Hặc ăn mặc sai phẩm","a:trinhhh","a:trinhth"]]]},
 {id:"P12",n:"Mặc cả chứng cứ",cat:"muu-ke",T:[[null,["a:uyhiep"],[],["a:banphe","a:tieuhuy"]]]},
 {id:"P13",n:"Quyền Hoàng hậu",cat:"trung-phat",T:[[null,["e:judge"],[],["e:conf","e:reward","e:pardon","e:cutpay","a:takeaway"]]]},
 {id:"P14",n:"Ra uy",cat:"trung-phat",T:[["nhẹ",["a:tat"],[],[]],["vừa",["a:phatquy"],[],[]]]}];
window.DOOR=DOOR;
/* member → {d (door), ti (tier index), role} — ONE lookup for her card, her pop-up, the NPC side and the tests */
const DOOR_M=(()=>{const M={};for(const d of DOOR){d.T.forEach(([t,rep,roll,way],ti)=>{for(const [role,L] of [["rep",rep],["roll",roll],["way",way]])for(const m of L)M[m]={d,ti,tier:t,role}});for(const m of d.hide||[])M[m]={d,ti:-1,tier:null,role:"hide"}}return M})();
window.DOOR_M=DOOR_M;
/* the door + tier of an ACT key (her acts and NPC acts alike: jagharm haDoor reads this) */
function doorOf(k){const m=DOOR_M["a:"+k];return m?{id:m.d.id,n:m.d.n,tier:m.tier,role:m.role}:null}
window.doorOf=doorOf;
const DOOR_TIER={"nhẹ":"Nhẹ","vừa":"Vừa","nặng":"Nặng"};
/* parse one card / pop-up button html → {n, sm (kit rows html, lock span removed), why, off} */
function doorBtn(h){const d=document.createElement("div");d.innerHTML=String(h||"");const b=d.querySelector("button");if(!b)return null;
 const w=b.querySelector(".kwhy");const why=w?w.textContent.trim():"";if(w)w.remove();const s=b.querySelector("small");const sm=s?s.innerHTML.trim():"";if(s)s.remove();
 return {n:b.innerHTML.trim(),sm,x:doorRaw(s),why,off:b.disabled||!!why}}
/* the raw kit line of an old button (the input kitParse reads: «<odds word> · tốn: … · thành: … · hỏng: … · kèm: …»), read back from its kit rows, so the
   option card (kitOptFinal reads the raw line, dilLineRaw) shows the SAME rows the old button showed — no number typed here (law 4) */
const DOOR_LAB={"tốn":"tốn","thành":"thành","được":"thành","bại":"hỏng","hỏng":"hỏng","mất":"hỏng","kèm":"kèm"};
function doorRaw(s){if(!s)return"";const seg=[];const od=s.querySelector(".kodm b,.kodm");const w=od?(od.getAttribute("title")||od.textContent||"").trim():"";if(w)seg.push(w);
 const rows=[...s.querySelectorAll(".kr")];if(!rows.length){const t=s.textContent.replace(/\s+/g," ").trim();if(t&&t!==w)seg.push(t);return seg.join(" · ")}
 const notes=[],lab=[];for(const r of rows){const l=((r.querySelector(".krl")||{}).textContent||"").trim().toLowerCase();const it=[...r.querySelectorAll(".krv .ef, .krv .kwhy")].map(e=>e.textContent.replace(/\s+/g," ").trim()).filter(Boolean);
  if(!it.length)continue;const L=DOOR_LAB[l];if(!L){notes.push(...it);continue}lab.push(L==="tốn"?`tốn: ${it.join(", ")}`:`${L}: ${it.join(" · ")}`)}
 return seg.concat(notes,lab).join(" · ")}
/* the key of a card button: a:<k> (data-a) · e:<k> (data-e Quyền Hoàng hậu) */
function doorKeyOf(h){h=String(h||"");const m=h.match(/^\s*<button([^>]*)>/);if(!m)return"";let x;if((x=m[1].match(/\bdata-a="([^"]+)"/)))return"a:"+x[1];
 if((x=m[1].match(/\bdata-e="[^"]*"[^>]*\bdata-k="([^"]+)"/)))return"e:"+x[1];return""}
/* the tier's ONE act: rep, or (roll) one of rep + rolls that can run now, fixed per target and buổi (no re-roll by redraw) */
function doorPick(list,seed){const ok=list.filter(x=>!x.off);if(!ok.length)return list[0]||null;if(ok.length===1)return ok[0];
 let h=0;const s=String(seed);for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return ok[Math.abs(h)%ok.length]}
function doorSeed(v,d,ti){return [S.turn||0,S.buoi||0,v&&v.id,d.id,ti].join(":")}
/* build the options of a door from the members present (M = member → {n, sm, why, off, run}) */
function doorOpts(d,M,v){const O=[];
 d.T.forEach(([t,rep,roll,way],ti)=>{const reps=rep.filter(m=>M[m]).map(m=>Object.assign({m},M[m])),rolls=roll.filter(m=>M[m]).map(m=>Object.assign({m},M[m]));
  /* the rep: the first present rep member; a roll tier picks among rep + rolls */
  const pool=reps.slice(0,1).concat(rolls);const one=rolls.length?doorPick(pool,doorSeed(v,d,ti)):pool[0];
  if(one)O.push(Object.assign({tier:t,role:one.m===(reps[0]||{}).m?"rep":"roll"},one));
  for(const m of way)if(M[m])O.push(Object.assign({tier:t,role:"way",m},M[m]))});
 return O}
/* the door button line: the tiers she can pick (cổ trang words, VANPHONG) */
function doorLine(d,O){const tiers=d.T.map(x=>x[0]).filter(Boolean);
 if(tiers.length)return tiers.filter(t=>O.some(o=>o.tier===t)).map(t=>{const o=O.find(x=>x.tier===t&&x.role!=="way");return `${t}: ${(o||O.find(x=>x.tier===t)).n.replace(/<[^>]+>/g,"")}`}).join(" · ");
 return O.slice(0,3).map(o=>o.n.replace(/<[^>]+>/g,"")).join(" · ")+(O.length>3?" …":"")}
function doorWhy(O){if(O.some(o=>!o.off))return"";const o=O.find(o=>o.why)||O[0];return o?(o.why||"chưa đủ điều kiện"):""}
/* the door button (card: data-dr = rivals index · pop-up: data-dp = curPeople index) */
function doorButton(d,O,at){return pbtn(`${at} data-door="${d.id}"`,d.n,doorLine(d,O),doorWhy(O))}
/* ---- the consort card: the outermost rvGroups wrapper (jdf loads after every other rvGroups wrapper) ---- */
const DOORX={raw:0};
function doorCardMembers(v,i){DOORX.raw++;let G=[];try{G=rvGroups(v,i)}finally{DOORX.raw--}const M={};
 for(const g of G)for(const h of g[1]||[]){const k=doorKeyOf(h);if(!k||!DOOR_M[k])continue;const b=doorBtn(h);if(!b)continue;
  const [t,x]=[k.slice(0,1),k.slice(2)];b.run=t==="a"?()=>doorFireAct(i,x):()=>empAct(i,x);M[k]=b}
 return M}
(function(){if(typeof rvGroups!=="function")return;const g0=rvGroups;rvGroups=function(v,i){const G=g0.apply(this,arguments);if(DOORX.raw||!v)return G;
 try{const M={},left=[];for(const g of G){const keep=[];for(const h of g[1]||[]){const k=doorKeyOf(h);if(k&&DOOR_M[k]){if(DOOR_M[k].role!=="hide"){const b=doorBtn(h);if(b)M[k]=b}}else keep.push(h)}
   if(keep.filter(Boolean).length)left.push([g[0],keep])}
  const add={};for(const d of DOOR){const O=doorOpts(d,M,v);if(!O.length)continue;const c=KIT_CAT[d.cat]?KIT_CAT[d.cat][0]:d.cat;const gn=d.id==="P13"?"Quyền Hoàng hậu":c;
   (add[gn]=add[gn]||[]).push(doorButton(d,O,`data-dr="${i}"`))}
  for(const gn in add){const g=left.find(x=>x[0]===gn);if(g)g[1]=g[1].concat(add[gn]);else left.push([gn,add[gn]])}
  return left}catch(e){console.error("door rvGroups",e);return G}}})();
/* the card click path of an ACT key: the same as tapping its old button (jsgame scheme game first, then j6 → doAct with every wrapper) */
function doorFireAct(i,k){const v=rivals[i];if(!v)return;try{if(typeof SG==="object"&&SG&&SG.K&&SG.K[k]&&typeof sgCan==="function"&&sgCan(i,k)&&typeof sgAsk==="function"){sgAsk({j:"act",v:v.id,k},sgTitle(k));return}}catch(e){console.error(e)}doAct(i,k)}
window.doorFireAct=doorFireAct;
/* ---- the pop-up: popCard (j15) asks doorPop for the talk options of a consort she meets + her in-person Hậu cung acts ---- */
function doorPopMembers(p,i,opts){const v=p&&p.ref,M={};if(!v||!(p.kind==="rival"||p.kind==="hh")||typeof rivals==="undefined")return M;const ri=rivals.indexOf(v);
 const B=opts.map((a,j)=>{const k="t:"+String(a.n||"").replace(/<[^>]+>/g,"").trim();if(!DOOR_M[k])return null;const o=a.o==null?100:a.o;const tc=talkK(a);const poor=a.c&&a.c.bac&&S.bac+a.c.bac<0;
  const why=a.lock?a.t:poor?"không đủ bạc":whyTime(tc);return {k,j,why,sm:typeof optLine==="function"?optLine(a):"",n:a.n}});
 for(const x of B){if(!x||M[x.k])continue;const b=doorBtn(pbtn("",x.n,x.sm,x.why))||{};b.x=x.sm;/* the talk option's own raw line (optLine) */const nm=x.n;b.run=()=>{popIdx=i;const L=talkOpts(curPeople()[i]||p);const j=L.findIndex(a=>a&&a.n===nm);if(j>=0)talk(j)};b.j=x.j;M[x.k]=b}
 /* her in-person Hậu cung acts (BAL.df.inPerson: Tát, Phạt quỳ, Hắt nước, Hắt trà, Quạt mực) — the same lock dfInPerson asks; lines = her card's rows */
 const done=S.visit&&(S.visit.talked===true||(S.visit.tk||{})[i]);
 if(!done&&ri>=0){const ip=dfInPerson(p).map(x=>"a:"+x.k).filter(k=>DOOR_M[k]);if(ip.length){const C=doorCardMembers(v,ri);for(const k of ip)if(C[k])M[k]=C[k]}}
 return M}
function doorPop(p,i,opts){const out={skip:new Set(),doors:[]};try{const v=p&&p.ref;if(!v||!(p.kind==="rival"||p.kind==="hh"))return out;const M=doorPopMembers(p,i,opts);
  for(const k in M)if(M[k].j!=null)out.skip.add(M[k].j);
  opts.forEach((a,j)=>{const k="t:"+String(a.n||"").replace(/<[^>]+>/g,"").trim();if(DOOR_M[k]&&DOOR_M[k].role==="hide")out.skip.add(j)});
  for(const d of DOOR){const O=doorOpts(d,M,v);if(!O.length)continue;out.doors.push({cat:d.cat,html:doorButton(d,O,`class="opt" data-dp="${i}"`)})}}catch(e){console.error("doorPop",e)}return out}
window.doorPop=doorPop;
/* ---- the door dialog (kit option dialog) ---- */
PEND.door=pp=>{const d=DOOR.find(x=>x.id===pp.d);if(!d)return null;let v=null,M={};
 if(pp.r!=null){v=rivals[pp.r];if(!v)return null;M=doorCardMembers(v,pp.r)}
 else if(pp.p!=null){const p=curPeople()[pp.p];if(!p)return null;v=p.ref;let T=[];try{T=talkOpts(p)}catch(e){}M=doorPopMembers(p,pp.p,T)}
 const O=doorOpts(d,M,v);if(!O.length)return null;
 const tiers=d.T.map(x=>x[0]).filter(Boolean);
 const head=`<p>${d.n}${v?` ${v.name}`:""}: chọn ${tiers.length?"mức và cách":"cách"}.</p>`+(tiers.length?`<p class="past">${tiers.filter(t=>O.some(o=>o.tier===t)).map(t=>`${DOOR_TIER[t]}: ${O.filter(o=>o.tier===t).map(o=>o.n.replace(/<[^>]+>/g,"")).join(", ")}`).join(" · ")}. Càng nặng càng hại, lộ ra càng bị phạt nặng.</p>`:"");
 const opts=O.map(o=>{const c={n:o.n,fx:{},x:o.x||"",go:()=>o.run()};if(o.off&&typeof kitOff==="function")kitOff(c,o.why||"chưa đủ điều kiện","");else if(o.off)c.off={why:o.why||""};return c});
 /* who (her face on the dialog) only from the card: from the pop-up a «who» standing on the stage would turn the dialog into a focus-scene encounter (jdfv), losing the kit option card */
 return {who:pp.r!=null&&v&&typeof pv==="function"?pv(v):null,t:head,o:opts.concat([{n:"Thôi",fx:{}}])}};
function doorOpen(id,at){if(typeof S==="undefined"||!S||S.dead||Q.length)return;const d=mkP("door",at);if(!d)return;doorLeaveFocus();pushDil(d,(DOOR.find(x=>x.id===id)||{}).n);showModal();render()}
window.doorOpen=doorOpen;
/* the tap: capture before j6 (#panel / #stage) — a door button carries no act key of its own */
document.addEventListener("click",e=>{try{const b=e.target.closest&&e.target.closest("button[data-door]");if(!b||b.disabled)return;e.stopPropagation();e.preventDefault();
 const at={d:b.dataset.door};if(b.dataset.dr!=null)at.r=+b.dataset.dr;else if(b.dataset.dp!=null)at.p=+b.dataset.dp;else return;doorOpen(b.dataset.door,at)}catch(x){console.error("door tap",x)}},true);
/* the door dialog is only the old buttons in one place: the old card / pop-up buttons never passed the once-per-life «Kiếp này chưa trọn» gate (jkiep kpGate:
   it reads «chết» in a line, here the SENT servant's «có khi bị đánh chết»), so a door option does not either (behaviour unchanged; the act's own cards follow) */
(function(){const k0=window.kpGate;if(typeof k0!=="function")return;window.kpGate=function(i){try{const m=Q[0];if(m&&m.pid==="door")return false}catch(e){}return k0.apply(this,arguments)}})();
/* from the person view (jdfv focus, an «activity» for jdayq gate (c), which takes back any centre card painted inside it): a door is its own flow, so
   the person view closes first (as her ✕ would) and the kit option dialog opens on the free stage; the act's own scenes / games follow as before */
function doorLeaveFocus(){try{if(window.DF&&DF.F&&typeof dfGone==="function")dfGone()}catch(e){console.error("door focus",e)}}
