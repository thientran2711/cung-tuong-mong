/* ================= jglink: GOAL LINKS + «CÁCH LÀM» + «MUA BÁN» ON THE DƯ ĐỒ (review/goal-links) =================
   Owner OD 26/11 ~18:05Z (verbatim in dev/OWNER_DECISIONS.md): "tôi nhìn vô dư đồ, tôi không biết cái nơi nào là tôi để dùng để mua đồ ... phải tìm cái ông
   nào đó để mà mua đồ ... phải có mấy cái dấu gạch hướng dẫn dưới chân của cái dòng đó ... bấm vào là để hiện ra cái hướng dẫn, hoặc là hiện ra là đi tới nơi đó".
   MAIN recs (same OD row): (1) every goal / task line that names a person / place / item / act = an underlined link → «Cách làm» (who + painting, where + hours,
   cost) + «Đi tới» (walk, khắc shown) or the Dư đồ with that place ringed; (2) every buying place marked «Mua bán» on the Dư đồ levels 1+2 + a legend;
   (3) the chapter's «thái giám bán đồ» is REAL (S.court.ped, j95 roster c:ped, stands at Nội vụ phủ) and named in the goal text (jtq14 {ped}).
   ONE data source: glTarget(line) → {who, place, tab, act, card, why, cost}. Displays reuse kit parts only (interim until KIT REQUEST kitGoLink / kitMapMark
   of KK44 lands): the link = the kit tap-word underline `.kgl` (j79 §73.2); the panel = kitPanel kind info (rows kitRows, person kitPersonLine);
   the ring on the Dư đồ = kitCoach (jtut, the same ring as «Đi làm»); the shop mark = kitPlaceIcon("nvp") (KIT §78 `bac` = mua sắm) + the map legend `.mleg`.
   Hooks: kitChecks (every goal checklist: chapter detail, Mệnh truyện, quest cards), mapHTML. Nothing saved; old saves untouched. */
(function(){try{
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plain=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').trim();
const srv=()=>{try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}};
/* ---------- the real people a goal can name ---------- */
function pedRec(){try{const R=S.roster;if(R&&R.P&&R.P["c:ped"]&&typeof j95kh==="function"){const e=R.P["c:ped"][j95kh()];if(e)return e}}catch(e){}return null}
/* where the Nội vụ phủ eunuch is NOW (the one ledger, j95); Nội vụ phủ when the ledger is off */
function pedAt(){const e=pedRec();if(e&&e[0])return e[0];try{if(typeof places==="function"&&places().some(x=>x.k==="nvp"))return "nvp"}catch(e){}return ""}
/* r2 (MAIN LOOK: «???» / «chưa biết tên» reached her; owner asked to NAME him): he is a named person from the first day (j61 k61SeedChiTon seeds
   his name + face), so the panel always shows his name and painting (kit person column) */
function pedPerson(){const c=S&&S.court&&S.court.ped;return {kind:"peddler",name:c&&c.name?`Thái giám ${c.name}`:"Thái giám Nội vụ phủ",ini:"Hoạn",col:"#b9a48a",info:"lo mua đồ ở Nội vụ phủ"}}
function hh(){try{return typeof qOn==="function"&&qOn()&&rivals[0]&&rivals[0].alive?rivals[0]:null}catch(e){return null}}
const WHO={
 ped:()=>({p:pedPerson(),k:pedAt(),does:(pedRec()||[])[3]||"bày hàng mua từ ngoài cung",sell:1}),
 th:()=>S.thDead?null:({p:{kind:"th",name:"Thái hậu",info:"Hoàng thái hậu"},k:(S.where||{}).th||"tn",does:"nhận thỉnh an buổi sáng"}),
 hh:()=>{const v=hh();return v?{p:{kind:"hh",ref:v,name:v.name,info:"Hoàng hậu"},k:typeof whereOf==="function"?whereOf(v):"kn",does:"nhận thỉnh an buổi sáng"}:null},
 emp:()=>({p:{kind:"emp",name:"Hoàng thượng"},k:(S.where||{}).emp||"dtd",does:"ngự ở đây"})};
/* ---------- phrase rules: a line → who / place / tab (first match wins); quest lines (jtq14 todo) carry their own fields ---------- */
const RULES=[
 [/Nội vụ phủ|thái giám[^.]*mua|mua (một |giúp )?món|mua sắm|mua đồ/i,{who:"ped",cost:"bạc theo giá từng món; xem hàng thì không tốn"}],
 [/Thái hậu/,{who:"th"}],[/Hoàng hậu/,{who:"hh"}],[/Hoàng thượng|ngự giá/,{who:"emp"}],
 [/Tư trang|y phục|trang sức|Bán đồ|rương/i,{tab:"inv"}],[/Tài nghệ|Học một/i,{tab:"art"}],[/Hậu cung|phi tần/i,{tab:"court"}],
 [/Đi một nơi|Đi làm quen|nơi được đến/i,{tab:"go"}],
 /* r2 family scan: an arc hồi hint «Chơi thẻ «Mệnh truyện: …» ở mục Hành sự» (j67 hint67) → the Hành sự tab */
 [/ở mục Hành sự|ở Hành sự/,{tab:"act"}]];
function placeName(k){try{if(typeof accName==="function"){const n=accName(k);if(n)return n}}catch(e){}try{if(PLNAME[k])return PLNAME[k][0]}catch(e){}try{const p=places().find(x=>x.k===k);if(p)return p.n}catch(e){}return k}
function placeByName(t){try{for(const p of places())if(p&&p.n&&p.k!=="home"&&t.includes(p.n))return p.k}catch(e){}return ""}
/* open hours in plain words + why not now (accState, j77) */
function hours(k){try{const st=typeof accState==="function"?accState(k):{};const day=st.kind==="hour"||(typeof ACC_DAY==="object"&&ACC_DAY[k]);
  return {h:day?"buổi sáng, trưa và chiều":"mọi buổi",why:String(st.why||"").replace(/\.$/,"")}}catch(e){return {h:"",why:""}}}
function walkK(k){try{if(!k||k===S.place)return 0;return typeof j77Tc==="function"?j77Tc(k):travel(S.place,k)}catch(e){return 1}}
function glTarget(line,q){const t=plain(line);const T={t,tab:"",act:null,card:"",why:"",cost:"",who:null,k:""};
 if(q){T.tab=q.tab||"";T.act=q.act||null;T.card=q.card||"";T.why=plain(q.why||"");if(q.place)T.k=q.place;if(q.who&&WHO[q.who])T.w=q.who}
 for(const [re,o] of RULES){if(!re.test(t))continue;if(o.who&&!T.w)T.w=o.who;if(o.tab&&!T.tab)T.tab=o.tab;if(o.cost&&!T.cost)T.cost=o.cost;if(T.w||T.tab)break}
 if(T.w){const W=WHO[T.w]();if(W){T.who=W;if(!T.k||W.sell)T.k=W.k||T.k}}
 if(!T.k){const k=placeByName(t);if(k)T.k=k}
 if(!T.k&&!T.tab)return null;return T}
window.glTarget=glTarget;
/* the open goal lines of her current chapter (jtq14 quests with their own fields) — matched by text */
function questOf(t){try{const m=S&&S.st&&S.st.ms;const L=m&&typeof tq14Todo==="function"?tq14Todo(m):null;if(L)for(const q of L)if(t.indexOf(plain(q.t))===0)return q;
 const G=typeof kitGoalNow==="function"?kitGoalNow():null;if(G&&G.next)for(const q of G.next)if(t.indexOf(plain(q.t))===0)return q}catch(e){}return null}
/* ---------- (1) the link on every open goal line (kitChecks is the ONE checklist of the goal family) ----------
   r2b (MAIN 161 KIT READY §6.2l): the link + the «Cách làm» panel are the KIT part kitGoalLink / kitHowPanel (jopic); this file only gives the DATA
   (glTarget → how = {who, where, hours, cost, note, go, goK}); no private panel or link look is left here (law 9). */
function glSpec(T){const W=T.who;const k=T.k;const H=k?hours(k):{h:"",why:""};const kh=k?walkK(k):0;
 const note=[];if(W&&W.does)note.push(`${W.p&&W.p.name?W.p.name+" ":""}đang ${W.does}`);if(H.why)note.push(`lúc này: ${H.why}`);
 if(T.tab&&!k){let tn=T.tab;try{tn=(typeof road8Name==="function"&&road8Name(T.tab))||T.tab}catch(e){}note.push(`chỗ bấm: ${tn}${T.card?` › thẻ ${T.card}`:""}`)}if(T.why)note.push(T.why);
 const cost=[k&&k!==S.place?`đường đi ${kh} khắc`:"",T.cost||""].filter(Boolean).join(" · ");
 /* who: his real record (S.court.ped, named + face from day one) so the kit draws his painting; th / hh / emp: their own person objects */
 const who=W&&W.p?(W.p.kind==="peddler"?(S.court&&S.court.ped)||W.p.name:(W.p.ref||W.p)):undefined;
 /* navigation leaves the info frames she opened it from (the chapter detail under «Cách làm»), so the walk / shop / tab can open */
 const closeInfo=()=>{try{for(let i=Q.length-1;i>=0;i--)if(Q[i]&&Q[i].kit&&Q[i].kit.kind==="info")Q.splice(i,1);showModal()}catch(e){}};
 let go=null,goK=null;
 if(k&&k!==S.place){go=()=>{closeInfo();setTimeout(()=>glGo(T),60)};goK=kh}
 else if(k&&W&&W.sell)go=()=>{closeInfo();setTimeout(()=>glShop(),60)};
 else if(T.tab&&typeof kitGoalGo==="function")go=()=>{closeInfo();setTimeout(()=>kitGoalGo({tab:T.tab,act:T.act,t:T.t}),80)};
 /* «Xem Dư đồ» (kit §6.2l how.map, ed3b8ad9): the Dư đồ tab with the place (or the zone tag holding it) ringed by the kit guide ring (jtut kitCoach) */
 const map=k&&k!==S.place?()=>{closeInfo();setTimeout(()=>glMap(T),60)}:null;
 return {who,where:k||"",hours:H.h,cost,note:note.join(". "),go,goK,map}}
function glMap(T){try{if(!S||S.dead)return;const b=document.querySelector('#tabs [data-tab="go"]');if(typeof tab!=="undefined"&&tab!=="go"){if(b&&b.offsetParent)b.click();else{tab="go";render()}}
 const find=()=>document.querySelector(`#panel .mspot[data-go="${T.k}"]`)||[...document.querySelectorAll("#panel .mspot.mzone")].find(z=>(" "+(z.dataset.mzk||"")+" ").includes(" "+T.k+" "))||null;
 setTimeout(()=>{const el=find();if(!el||typeof kitCoach!=="function")return;const w=T.who&&T.who.p?`<p>${esc(T.who.p.name)} ở đây: ${esc(T.who.does||"")}.</p>`:"";
  kitCoach({title:placeName(T.k),sub:"Cách làm · nơi cần đến",html:`${w}<p>Chạm vào nơi đang sáng để đi tới.</p>`,target:find,pad:4,interact:true,btns:[{k:"ok",t:"Đã hiểu"}],on(){kitCoachOff()}});
  const off=e=>{if(e.target.closest&&e.target.closest("#panel .mspot")){document.removeEventListener("click",off,true);try{kitCoachOff()}catch(x){}}};document.addEventListener("click",off,true)},420)}catch(e){console.error("glink map",e)}}
function glWrap(html,q){const T=glTarget(html,q);if(!T||typeof kitGoalLink!=="function")return html;return kitGoalLink(html,glSpec(T))}
window.glWrap=glWrap;window.glHow=T=>typeof kitHowPanel==="function"?kitHowPanel(glSpec(T)):null;
if(typeof kitChecks==="function"){const c0=kitChecks;kitChecks=function(list){try{if(Array.isArray(list)&&S&&!S.dead&&S.st)list=list.map(x=>{if(!Array.isArray(x)||x[0]||!x[1]||/data-kglink=/.test(x[1]))return x;
  const q=questOf(plain(x[1]));if(!q&&!isGoalLine(plain(x[1])))return x;const y=x.slice();y[1]=glWrap(x[1],q);return y})}catch(e){console.error("glink checks",e)}return c0.call(this,list)};window.kitChecks=kitChecks}
/* a chapter step that is not a quest: link it only when it is one of her chapter's steps (never other checklists: kit page, reign, route) */
function isGoalLine(t){try{const m=S.st.ms;if(m&&typeof MS67==="object"&&MS67[m.id]){const st=MS67[m.id].steps(m);if(st.some(x=>t.indexOf(plain(x[0]))===0))return true}
 const CM=typeof chapModel==="function"?chapModel():null;if(CM&&CM.steps.some(x=>t.indexOf(plain(x.t))===0))return true}catch(e){}return false}
/* his wares: standing at Nội vụ phủ with him there = his own «Để ta xem» (jact talkOpts peddler → kitShopNvp); elsewhere nothing opens (she taps him herself) */
function glShop(){try{if(Q.length||!S||S.dead)return;const here=S.visit&&S.visit.people&&S.visit.people.some(x=>x.kind==="peddler");if(here&&S.place==="nvp"&&typeof kitShopNvp==="function"){kitShopNvp();render()}}catch(e){console.error("glink shop",e)}}
function glGo(T){try{if(!S||S.dead||Q.length)return;const k=T.k;if(typeof j77Tap==="function")j77Tap(k);else goTo(k);
  /* a seller: once she stands there (after the «Chọn người theo hầu» card of her first walk of the day, if any) his wares open */
  if(T.who&&T.who.sell){let n=0;const iv=setInterval(()=>{n++;try{if(S.place===k&&!Q.length){clearInterval(iv);glShop()}else if(n>120||S.dead||(S.place!==k&&!Q.length&&n>4))clearInterval(iv)}catch(e){clearInterval(iv)}},250)}}catch(e){console.error("glink go",e)}}
/* ---------- NAVIGATION IS NOT A CHOICE: now the KIT flag §6.2m nav:1 (j3 chooseM: no effects, no log, no result card). The r2 interim
   wrappers that lived here are removed; the family carries nav:1 itself (kit «Cách làm» buttons, jgoal «Đi làm», jge «Xem bảng vàng», bare «Đóng»). */
/* r2: an old save whose eunuch is called «Tiểu Thái Tử» (= «little crown prince»; «Thái» left the jname pool) gets a fresh eunuch name, once (jname nmNew) */
function fixEunName(){try{if(!S||typeof nmNew!=="function")return;const L=[S.court&&S.court.ped].concat((S.staff||[]).filter(x=>x&&x.role==="eunuch"));
 for(const o of L)if(o&&o.name==="Tiểu Thái Tử")o.name=nmNew("eun")}catch(e){}}
if(typeof normAll==="function"){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);fixEunName();return r};window.normAll=normAll}
/* r2 whole family (MAIN LOOK (1): a person she must find is NAMED, never «???»): a «Việc nhờ» text that names its people ({A} the asker, {B} the one
   to visit / help) tells her who they are — the same rule as the arc lines (j67 arcReveal67: name + face, j61 stage 2, nothing logged) */
if(typeof q72Txt==="function"){const t0=q72Txt;q72Txt=function(t,X){try{if(typeof k61Know==="function"&&X&&typeof t==="string"){const L=[];/* q72A record = {o: the real person, n, f} */if(t.includes("{A}")&&X.A&&X.A.o&&typeof X.A.o==="object")L.push(X.A.o);if(t.includes("{B}")&&X.B&&X.B.o&&typeof X.B.o==="object")L.push(X.B.o);
  const need=L.filter(e=>typeof k61Named!=="function"||!k61Named(e));if(need.length)k61Know(need,"",true,2)}}catch(e){}return t0.apply(this,arguments)};window.q72Txt=q72Txt}
/* ---------- (2) «Mua bán» on the Dư đồ: every place where she can buy NOW — its own tag (level 2 / no zones) and the zone tag holding it (level 1) ---------- */
function shopKeys(){const s=new Set();try{if(srv())return s;const L=places().map(x=>x.k);if(L.includes("nvp"))s.add("nvp");const k=pedAt();if(k&&k!=="home")s.add(k)}catch(e){}return s}
window.glShopKeys=()=>[...shopKeys()];
function markMap(h){try{if(h.indexOf('class="mspot')<0)return h;const K=shopKeys();if(!K.size)return h;const t=document.createElement("template");t.innerHTML=h;let ch=0;
 const icon=typeof kitPlaceIcon==="function"?kitPlaceIcon("nvp",14):"";
 for(const sp of t.content.querySelectorAll(".mspot")){const z=sp.classList.contains("mzone");const k=sp.dataset.go||"";
  const hit=z?(sp.dataset.mzk||"").split(/\s+/).some(x=>K.has(x)):K.has(k);if(!hit||sp.classList.contains("kglban"))continue;
  sp.classList.add("kglban");ch=1;sp.title=(sp.title||"")+" · Mua bán";
  const lab=sp.querySelector(".mlab");if(lab&&icon&&!lab.querySelector('img.kplic[src*="/bac."],img.kplic[src$="bac.webp"]')){if(z||!lab.querySelector(".kplic"))lab.insertAdjacentHTML("afterbegin",icon)}
  /* r2 (MAIN LOOK: «· Mua bán» in the grey info row was tiny): the word sits IN the kit paper name slip (.mlab, 13 px ink, §34.1d) as its own line
     under the name, so it reads like the name; interim until KK44 kitMapMark (its own mark + a visible legend row) */
  if(lab&&!lab.querySelector(".kglmb"))lab.insertAdjacentHTML("beforeend",'<br class="kglmb">Mua bán')}
 let out=ch?t.innerHTML:h;
 if(icon&&out.indexOf('class="mleg"')>=0&&out.indexOf("kglleg")<0)out=out.replace(/(<span class="mleg">)/,`$1<span class="kglleg">${icon.replace('class="ic kplic"','class="ic"')}Mua bán: ${esc([...K].map(placeName).join(", "))} · </span>`);
 return out}catch(e){console.error("glink map",e);return h}}
window.glMarkMap=markMap;
if(typeof mapHTML==="function"){const m0=mapHTML;mapHTML=function(){return markMap(m0.apply(this,arguments))}}
}catch(e){console.error("jglink",e)}})();
