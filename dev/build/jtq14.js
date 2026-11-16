/* ================= jtq14: TUTORIAL QUESTS of chapters 1–3 (14-chapter frame, phase 2 of dev/STORY_ROADS_PLAN.md; ROAD_MAP Part 1) =================
   Owner rules: OD:L1233 (each tutorial quest makes her DO the task; the reward comes only when it is done), OD:L1242 (chapters 1–3 = tutorial,
   no skip-with-reward), OD:L1259 (the tutorial is PART OF THE STORY: every task is told as a beat of her first months in the palace),
   OD:L1432 (the narrator of a frame without its own person = the named palace official whose office covers the topic: Giáo tập ma ma for a
   new consort, Quản sự ma ma for a new palace maid; map in BAL.st14.q.narr, one core).
   - A tutorial chapter (jst14 nhap14 / sung14 / tap14) started on this build carries S.st.ms.q14 = {v, L:[{id,n}]}: the quests of its variant
     (v "c" consort, "s" cung nữ who still serves, read when the chapter opens). Each quest counts a REAL deed the player does herself (hooks
     below on the game's own functions: an act card, a place visit, wearing, selling, buying, a lesson, a deed to a consort / a colleague).
   - Quests are steps of the chapter (flag "q"): the chapter is done only when its milestone (jst14) AND every quest are done; the chapter
     reward (j67 reward67, BAL.st14.rw / danh) comes then. Each quest pays its own small reward the moment it is done (BAL.st14.q.bac).
     Time runs out first → the chapter closes «Lỡ dịp» with no chapter reward (jst14), quests not done pay nothing.
   - If she is raised from maid to Đáp ứng while maid quests are open, those quests lapse (not required, no reward): a consort cannot do them.
   - Displays: the chapter-open card (kit panel, narrator as the person), the quest-done card (same kit panel), the steps in the chapter detail
     / Mệnh truyện tab (kitChecks, unchanged), "Việc nên làm" with "Đi làm" (jgoal todo). No new kit part.
   SAVES: a chapter started before this build has no q14: nothing here touches it. Co-op: every player's own life (S); nothing is shared.
   Bots (window.__bot / quiet) count deeds the same way; only the cards are skipped (card67 rule). */
(function(){try{
const QB=()=>BAL.st14.q;
/* she still serves: the cung nữ start before she is raised (jst14 f14Srv: true from the first moment of the life, before j42 fills S.srv) */
const srvNow=()=>{try{if(S&&S.origin&&S.origin.k==="cnv")return !(S.srv&&S.srv.risen);return typeof isSrv==="function"&&isSrv()}catch(e){return false}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nv=n=>typeof kitNumVi==="function"?kitNumVi(n):String(n);
const lc=s=>String(s).charAt(0).toLowerCase()+String(s).slice(1);
/* how the narrator speaks to her (VANPHONG §2): a maid is "ngươi" and the ma ma says "ta"; a consort below Tần "tiểu chủ", Tần and up "nương nương" */
function X(cap){/* j84 lowRank: below Tần (one rule for every speaker) */const w=srvNow()?"ngươi":(typeof lowRank==="function"&&!lowRank()?"nương nương":"tiểu chủ");return cap?w.charAt(0).toUpperCase()+w.slice(1):w}
function ME(){return srvNow()?"ta":"nô tỳ"}
function say(s){return String(s).replace(/\{X\}/g,X(true)).replace(/\{x\}/g,X(false)).replace(/\{m\}/g,ME())}
/* ---------- the quests: [variant][chapter] → list; need = how many times (BAL.st14.q.need[id] or 1) ---------- */
const A=re=>d=>!!(d&&re.test(String(d.n||"")));
const TQ={
 c:{
  nhap14:[
   {id:"an",ev:"act",m:A(/^Thỉnh an/),t:"Thỉnh an Thái hậu hoặc Hoàng hậu",tab:"act",act:/Thỉnh an (Thái hậu|Hoàng hậu)/,card:"Thỉnh an",
    why:"Người mới vào cung, việc đầu tiên là ra mắt bề trên; lễ đủ thì không ai bắt bẻ được.",ok:"“Lễ ra mắt đã đủ. Từ nay bề trên đã biết mặt {x}.”"},
   {id:"di",ev:"go",m:d=>!!d&&d.k!=="home",t:"Đi một nơi trong cung",tab:"go",
    why:"Biết lối đi lối về, khỏi lạc bước vào chỗ cấm.",ok:"“{X} đã biết đường. Chỗ nào được đến, chỗ nào phải tránh, xin nhớ cho kỹ.”"},
   {id:"trang",ev:"wear",t:"Thay y phục hay trang sức trong Tư trang",tab:"inv",
    why:"Áo xiêm chỉnh tề, hợp phẩm cấp, kẻo bị chê thất lễ ngay buổi đầu.",ok:"“Ăn vận như vậy là phải phép, không ai chê được.”"}],
  sung14:[
   {id:"ban",ev:"sell",t:"Bán đồ trong rương riêng",tab:"inv",
    why:"Muốn được để mắt phải có bạc lo quà cáp, lễ lạt. Rương mang theo từ nhà, món nào không dùng thì đổi lấy bạc.",ok:"“Bạc trong tay rồi, việc gì cũng dễ lo hơn.”"},
   {id:"diem",ev:"act",m:A(/^(Điểm trang|Dưỡng nhan)/),t:"Điểm trang hoặc Dưỡng nhan",tab:"act",act:/Điểm trang|Dưỡng nhan/,card:"Điểm trang, Dưỡng nhan",
    why:"Dung nhan là thứ Hoàng thượng thấy trước tiên.",ok:"“Dung nhan như thế, gặp ngự giá ắt được ngoái nhìn.”"},
   {id:"mua",ev:"buy",t:"Nhờ thái giám Nội vụ phủ mua một món",tab:"go",tl:"Dư đồ › Nội vụ phủ",
    why:"Biết chỗ sắm sửa, khi cần lễ vật dâng lên khỏi lúng túng.",ok:"“Đã biết đường mua sắm. Đồ tốt phải để dành lúc cần.”"}],
  tap14:[
   {id:"giao",ev:"rel",t:"Làm một việc với một phi tần trong Hậu cung",tab:"court",tl:"Hậu cung › Phi tần",
    why:"Thăm hỏi, tặng quà, trò chuyện: có qua có lại mới thành chị em, một mình thì khó đứng.",ok:"“Có người qua lại rồi. Trong cung, thêm một người quen là thêm một lối thoát.”"},
   {id:"hoc",ev:"art",t:"Học một buổi ở mục Tài nghệ",tab:"art",
    why:"Một môn sở trường là chỗ dựa lâu dài, yến tiệc thi tài đều cần đến.",ok:"“Chăm như vậy, ngày sau ắt có lúc trổ tài.”"},
   {id:"cn",ev:"act",m:A(/^Trò chuyện với cung nữ/),t:"Trò chuyện với cung nữ thân cận",tab:"act",act:/Trò chuyện với cung nữ/,card:"Trò chuyện với cung nữ",
    why:"Cung nữ thân cận là tai mắt, là người giữ lưng cho {x}.",ok:"“Người hầu có lòng thì chủ mới yên. {X} nhớ giữ lấy nàng.”"}]},
 s:{
  nhap14:[
   {id:"hau",ev:"act",m:A(/^(Quét sân|Dâng trà|Theo hầu chủ|Lĩnh đồ|Việc chủ sai)/),t:"Làm một việc hầu hạ",tab:"act",act:/Quét sân|Dâng trà|Theo hầu chủ|Lĩnh đồ/,card:"Quét sân, Dâng trà",
    why:"Kẻ hầu mới vào, chủ nhìn vào việc tay chân trước tiên.",ok:"“Làm được việc thì chủ mới nhớ tên. Cứ thế mà giữ.”"},
   {id:"le",ev:"act",m:A(/^Học lễ nghi/),t:"Học lễ nghi với cô cô",tab:"act",act:/Học lễ nghi/,card:"Học lễ nghi với cô cô",
    why:"Một bước sai lễ là một trận đòn. Học cho thuộc, đứng cho đúng chỗ.",ok:"“Thưa gửi, quỳ đứng đã có nề nếp. Thế là khỏi bị phạt oan.”"},
   {id:"di",ev:"go",m:d=>!!d&&d.k!=="home",t:"Đi một nơi trong cung",tab:"go",
    why:"Chủ sai đi đâu thì phải biết đường, chậm chân là bị mắng.",ok:"“Đã quen lối đi. Chỗ nào cấm thì đừng bén mảng.”"}],
  sung14:[
   {id:"chai",ev:"act",m:A(/^Chải chuốt/),t:"Chải chuốt, giữ nhan sắc",tab:"act",act:/Chải chuốt/,card:"Chải chuốt, giữ nhan sắc",
    why:"Kẻ hầu cũng có ngày lọt vào mắt rồng; mặt mũi lem luốc thì ai nhìn.",ok:"“Gọn gàng sạch sẽ, đứng hầu cũng sáng cả góc điện.”"},
   {id:"vuon",ev:"go",m:d=>!!d&&d.k==="vuon",t:"Đến Ngự hoa viên",tab:"go",tl:"Dư đồ › Ngự hoa viên",
    why:"Xuân thu Hoàng thượng hay dạo bước ở đó; đi qua đúng lúc là có duyên.",ok:"“Đã biết chỗ ngự giá hay qua. Duyên đến hay không là ở trời.”"},
   {id:"theu",ev:"act",m:A(/^Thêu khăn/),t:"Thêu khăn bán ra ngoài",tab:"act",act:/Thêu khăn/,card:"Thêu khăn bán ra ngoài",
    why:"Kẻ hầu cũng cần chút bạc riêng phòng thân, lúc cần lo lót.",ok:"“Có đồng bạc riêng rồi, lúc túng khỏi phải ngửa tay.”"}],
  tap14:[
   {id:"chat",ev:"cnv",m:d=>!!d&&d.k==="chat",t:"Trò chuyện với một đồng liêu",tab:"staff",
    why:"Đồng liêu nâng nhau thì sống, dìm nhau thì chết. Kết lấy một người.",ok:"“Có người nói chuyện được rồi. Đừng tin ai trọn lòng, nhưng phải có người.”"},
   {id:"bieu",ev:"cnv",m:d=>!!d&&d.k==="gift",t:"Biếu quà một đồng liêu",tab:"staff",
    why:"Một món quà nhỏ đổi được một lời nói đỡ lúc ngặt.",ok:"“Quà nhỏ mà lòng người thì nhớ lâu.”"},
   {id:"luyen",ev:"act",m:A(/^Luyện thêu/),t:"Luyện thêu thùa, chữ nghĩa",tab:"act",act:/Luyện thêu/,card:"Luyện thêu thùa, chữ nghĩa",
    why:"Có nghề trong tay, chủ mới giao việc lớn.",ok:"“Tay nghề lên rồi. Người có nghề không lo bị bỏ.”"}]}};
/* the chapter-open lines of the narrator (OD:L1259: the tasks are her story, not a feature tour) */
const INTRO={
 c:{nhap14:"{N} dẫn {x} về cung mới, cúi đầu thưa: “Vào cung rồi, mỗi bước đều có người nhìn. Ra mắt bề trên, biết lối đi, ăn vận phải phép: {x} làm trọn mấy việc đầu này, {m} mới yên lòng.”",
  sung14:"{N} ghé lại, hạ giọng: “Hoàng thượng còn chưa nhớ đến {x}. Muốn được để mắt phải có dung nhan, có chút bạc lo việc, biết chỗ sắm sửa. Đồ trong rương món nào không dùng, cứ đổi lấy bạc.”",
  tap14:"{N} dặn: “Được để mắt rồi thì người ghen cũng nhiều. Trong cung một mình thì khó đứng: phải có chị em, có nghề trong tay, có người hầu tin cẩn.”"},
 s:{nhap14:"{N} ghi tên ngươi vào sổ cung nữ, nghiêm giọng: “Đã vào làm kẻ hầu thì phải biết việc, biết lễ, biết đường. Mấy việc này làm trước, sai một là bị phạt.”",
  sung14:"{N} liếc nhìn ngươi: “Kẻ hầu cũng có ngày được Hoàng thượng để mắt, nhưng phải tự lo cho mình: mặt mũi gọn gàng, biết chỗ ngự giá hay qua, có chút bạc riêng.”",
  tap14:"{N} dặn: “Ở lâu trong cung mới biết, kẻ hầu sống nhờ đồng liêu. Kết lấy người, biếu chút quà, luyện tay nghề, thì mới có chỗ đứng.”"}};
function variant(){return srvNow()?"s":"c"}
function defOf(v,ch,id){return ((TQ[v]||{})[ch]||[]).find(q=>q.id===id)||null}
function need(id){const N=QB().need||{};return N[id]||1}
function active(){try{if(typeof f14!=="function"||!f14()||!S||S.dead)return null;const m=S.st.ms;if(!m||!m.q14||!F14T.test(m.id))return null;if(typeof f14Home==="function"&&f14Home())return null;return m}catch(e){return null}}
/* ---------- the narrator (OD:L1432): the named palace official of this topic, a real NPC with her face ---------- */
function narr(){try{const id=(QB().narr||{})[variant()]||"gt";if(typeof elderBy==="function"){let st=elderBy(id);if(!st&&typeof elderInit==="function"){elderInit();st=elderBy(id)}
  if(st){const f=typeof staffFace==="function"?staffFace(st):null;return{name:st.call,office:typeof elderOffice==="function"?elderOffice(st):"",face:f}}}
 const g=typeof staffGuide==="function"?staffGuide():null;if(g)return{name:g.name,office:g.office,face:g.face}}catch(e){}return{name:"Ma ma",office:"",face:null}}
function lapse(m){/* raised while maid quests are open: they cannot be done any more */try{if(m.q14.v==="s"&&!srvNow())for(const q of m.q14.L)if(!q.ok)q.x=1}catch(e){}}
/* steps shown for a quest chapter: [label, done, "q"] (a lapsed quest counts as done for the chapter, says so, pays nothing) */
function qSteps(m){if(!m||!m.q14)return[];lapse(m);return m.q14.L.map(q=>{const d=defOf(m.q14.v,m.id,q.id);if(!d)return null;const N=need(q.id);
 return[`${d.t}${N>1?` (${Math.min(q.n,N)}/${N})`:""}${q.x?" · không còn hợp thân phận mới":""}`,!!(q.ok||q.x),"q"]}).filter(Boolean)}
window.tq14Steps=qSteps;
/* "Việc nên làm" with "Đi làm" (jgoal nextSteps reads C.todo) */
function todo(m){if(!m||!m.q14)return null;const L=[];for(const q of m.q14.L){if(q.ok||q.x)continue;const d=defOf(m.q14.v,m.id,q.id);if(!d)continue;
  L.push({t:d.t,why:say(d.why),tab:d.tab,act:d.act,card:d.card,tl:d.tl})}return L.length?L:null}
window.tq14Todo=todo;
/* ---------- the chapter: steps, goal text, done rule ---------- */
for(const id of ["nhap14","sung14","tap14"]){const d=MS67[id];if(!d)continue;
 const s0=d.steps;d.steps=function(m){const st=s0.apply(this,arguments);if(!m||!m.q14)return st;const T=st.filter(x=>x[2]==="t"),R=st.filter(x=>!x[2]);
  /* a chapter whose milestone is "one of these" (any) shows it as ONE line, so every line left must be done */
  const M=d.any&&R.length>1?[[R.map((x,i)=>i?lc(x[0]):x[0]).join(" · hoặc "),R.some(x=>x[1])]]:R;return M.concat(qSteps(m),T)};
 const g0=d.g;d.g=function(){const g=g0.apply(this,arguments);try{const m=S.st.ms;if(m&&m.id===id&&m.q14){const n=narr();return `${g} Phải làm đủ ${nv(m.q14.L.length)} việc ${n.name} dặn thì chương mới tính là xong.`}}catch(e){}return g}}
(function(){const d0=msDone67;msDone67=function(m){if(m&&m.q14&&MS67[m.id]){const st=MS67[m.id].steps(m);return st.filter(x=>x[2]!=="t").every(x=>x[1])||st.some(x=>x[2]==="t"&&x[1])}return d0.apply(this,arguments)}})();
window.tq14Real=function(m,st){/* jst14 «Lỡ dịp» rule: did she really finish (milestone + every quest)? */return st.filter(x=>x[2]!=="t").every(x=>x[1])};
/* the chapter opens: quests given, the narrator tells the beat (one kit card instead of the plain chapter card) */
function init(m){const v=variant();const L=((TQ[v]||{})[m.id]||[]).map(q=>({id:q.id,n:0}));if(L.length)m.q14={v,L}}
function introCard(m){if(quiet||window.__bot||typeof kitPanel!=="function")return;const c=S.st.ch,d=MS67[m.id],n=narr();
 const rows=[["Lời dặn",say(INTRO[m.q14.v][m.id]).replace("{N}",esc(n.name)+(n.office?`, ${esc(n.office)},`:""))],["Mục tiêu",d.g()],
  ["Việc phải làm",m.q14.L.map(q=>{const x=defOf(m.q14.v,m.id,q.id);return `✗ ${x.t}`}).join("<br>")],
  ["Phần thưởng",`mỗi việc xong: Bạc +${QB().bac[m.q14.v]}; đủ việc và đạt mục tiêu: phần thưởng của chương`],msHan67(m,1)];
 kitPanel({kind:"info",title:`Chương ${c.n}: ${d.t()}`,sub:`${n.name} dặn`,sections:[{h:"",rows:rows.map(r=>[r[0],r[1],r[2]||""])}],subject:n.face||null,btn:"Đã hiểu"})}
(function(){const m0=msStart67;msStart67=function(id){if(!(typeof f14==="function"&&f14()&&F14T.test(id)))return m0.apply(this,arguments);
 /* the same steps as j67 msStart67, with the quests set before anything is shown */
 const c=S.st.ch;c.n++;S.st.ms={id,r0:S.rank,t0:S.turn};S.st.M=null;const d=MS67[id];init(S.st.ms);
 if(!S.st.ms.q14){c.n--;S.st.ms=null;return m0.apply(this,arguments)}
 log(`<b>Chương ${c.n}: ${d.t()}.</b> ${d.g()}`);introCard(S.st.ms);syncMain67()}})();
/* ---------- a deed is done ---------- */
function doneCard(m,d,b){if(quiet||window.__bot||typeof kitPanel!=="function")return;const n=narr(),c=S.st.ch,ch=MS67[m.id];
 const left=m.q14.L.filter(q=>!q.ok&&!q.x).map(q=>defOf(m.q14.v,m.id,q.id)).filter(Boolean).map(x=>x.t);
 const rows=[["Lời dặn",`${esc(n.name)}: ${say(d.ok)}`],["Phần thưởng",`Bạc +${b}`,"g"],
  ["Còn lại",left.length?left.join("<br>"):"Đủ việc ma ma dặn. Đạt mục tiêu của chương thì chương xong, có thưởng."]];
 kitPanel({kind:"result",title:`Xong việc: ${d.t}`,sub:`Chương ${c.n} · ${ch.t()}`,sections:[{h:"",rows:rows.map(r=>[r[0],r[1],r[2]||""])}],subject:n.face||null,btn:"Đã hiểu"})}
function note(ev,det){const m=active();if(!m)return;lapse(m);let hit=0;
 for(const q of m.q14.L){if(q.ok||q.x)continue;const d=defOf(m.q14.v,m.id,q.id);if(!d||d.ev!==ev||(d.m&&!d.m(det)))continue;
  q.n++;hit=1;if(q.n>=need(q.id)){q.ok=1;const b=QB().bac[m.q14.v]||0;try{apply({bac:b})}catch(e){S.bac=(S.bac||0)+b}
   log(`<b class="g">Xong việc «${d.t}».</b> ${esc(narr().name)} dặn thêm: ${say(d.ok)} Bạc +${b}.`);doneCard(m,d,b)}}
 if(hit)try{if(typeof syncMain67==="function")syncMain67()}catch(e){}}
window.tq14Note=note;
/* ---------- hooks on the game's own functions (every path of each kind, LUẬT SỬA CẢ NHÓM) ---------- */
/* every hooked name is a global function declaration (a window property in this classic script), so window[name]= rebinds it for every caller */
const W=(name,fn)=>{try{const o=window[name];if(typeof o==="function")window[name]=fn(o)}catch(e){console.error("tq14 hook",name,e)}};
const acts=()=>{try{return typeof stat==="function"?stat().act:0}catch(e){return 0}};
/* acts: every act card and every place / pop-up option runs through runOpt (j2); it returns null when she could not pay */
W("runOpt",o=>function(a){const r=o.apply(this,arguments);try{if(r!=null&&a)note("act",{n:a.n})}catch(e){}return r});
/* places: goTo moved her */
W("goTo",o=>function(k){const p0=S&&S.place;const r=o.apply(this,arguments);try{if(S&&S.place===k&&p0!==k)note("go",{k})}catch(e){}return r});
/* dress: wear (j8, items with a slot) and wdWear (j92, the wardrobe); her own body only */
W("wear",o=>function(p,ix){const e=p&&p.inv&&p.inv[ix];const w0=e&&e.w;const r=o.apply(this,arguments);try{if(p===S&&e&&e.w!==w0)note("wear",{})}catch(x){}return r});
W("wdWear",o=>function(p,ix){const e=p&&p.inv&&p.inv[ix];const r=o.apply(this,arguments);try{if(p===S&&e&&!S.inv.includes(e))note("wear",{})}catch(x){}return r});
/* selling: sellItem (j8), wkSell (j83, her handmade works), econSell (jecon, the Tư trang sell button and the Nội vụ phủ sell list);
   one sale counts once even when one calls another */
let sd=0;const SELL=o=>function(p){const n0=p&&p.inv?p.inv.length:0;sd++;let r;try{r=o.apply(this,arguments)}finally{sd--}try{if(!sd&&p===S&&S.inv.length<n0)note("sell",{})}catch(x){}return r};
W("sellItem",SELL);W("wkSell",SELL);W("econSell",SELL);
/* buying: buy (j8) and every kit shop item (kitShop, jinv: Nội vụ phủ, pets …); the shop's sell list goes through econSell above */
W("buy",o=>function(p){const r=o.apply(this,arguments);try{if(r&&p===S)note("buy",{})}catch(x){}return r});
W("kitShop",o=>function(sp){try{if(sp&&Array.isArray(sp.items))for(const x of sp.items){if(!x||typeof x.onBuy!=="function"||x.__tq)continue;const b0=x.onBuy;x.__tq=1;
  x.onBuy=function(){const n0=S.inv.length,c0=S.bac;const r=b0.apply(this,arguments);try{if(S.inv.length>n0||S.bac<c0)note("buy",{})}catch(e){}return r}}}catch(e){}return o.apply(this,arguments)});
/* a deed of hers to a consort: every path (Hậu cung person card j8 doAct, its gift / plant pickers, place pop-ups j9, schemes j70,
   the person-card game jsgame, a co-op friend's invitation) ends in runAct(S, consort, key) (j9), which returns its result line */
W("runAct",o=>function(a,t){const r=o.apply(this,arguments);try{if(a===S&&t&&t!==S&&r&&typeof rivals!=="undefined"&&rivals.includes(t))note("rel",{k:arguments[2]})}catch(x){}return r});
/* a lesson in the Tài nghệ tab, every kind (LUẬT SỬA CẢ NHÓM): tự học / học với thầy / với Thái hậu, Tứ đức tự rèn / theo ma ma, the
   recipe picker + its mini game (jwkr, j83), even "Để trời định": every one ends in progress through addArt (j2, arts) or addVir (j85, Tứ đức).
   A lesson left half-way (picker closed, «Thôi, để lúc khác») gives no progress and does not count. */
W("addArt",o=>function(k,g){const r=o.apply(this,arguments);try{if(g>0)note("art",{k})}catch(x){}return r});
W("addVir",o=>function(p,k,g){const r=o.apply(this,arguments);try{if(p===S&&g>0)note("art",{k})}catch(x){}return r});
/* a maid's deed to a colleague (j42 srvStaffAct: chat / gift / ask / frame) */
W("srvStaffAct",o=>function(k){const r=o.apply(this,arguments);try{if(r!=null)note("cnv",{k})}catch(x){}return r});
}catch(e){console.error("jtq14",e)}})();
