/* jgoal: MỤC TIÊU ĐỜI MÌNH (owner 16/11 "Khi mới chọn nhân vật, không thấy khung báo nhiệm vụ chính tuyến, hoặc mục tiêu đời mình? Chơi bị
   lạc lối." + "Không bấm xem được" on the Hành sự goal strip) — KIT.md §72. One data source, three kit pieces:
   - kitGoalNow(): the main road of this life (QUEST67 + milestone chapters of j67), the current chapter goal in plain words, its steps with
     live progress, and 2–3 concrete next things to do, each with WHERE to tap ({tab, act} → "Đi làm").
   - (16/11) the goal strip is gone: the goal is the "Mục tiêu chương" icon of the stage rail (kitStageRail, KIT §77, jrail). Was laid on the main
     stage (room view) under the scene title. Tap → kitGoalDetail().
   - kitGoalDetail(): chapter detail (kit panel, event frame: origin picture band + her figure): goal, steps ✓/✗, tấn phong requirements for
     the rank chapter, acts of a story chapter, next things with "Đi làm" options. MINIMAL view of review/chapter-detail (C24, queued):
     C24 may grow it (story so far by hồi with pictures, evidence/witness steps) — keep kitGoalNow as the one data source.
   - kitGoalCard(): right after Nhập cung (new life only; each player of a co-op room on her own machine, own life): "Mệnh truyện kiếp
     này" in the event frame — main road + chapter goal + next steps + where to tap. Never for an old save, never for bots. */
(function(){try{
const isS=()=>{try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}};
const bot=()=>{try{return screenOff()}catch(e){return false}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plain=s=>String(s==null?"":s).replace(/<[^>]+>/g,"");
/* where a tab lives in today's bottom bar (Hành sự / Dư đồ / Hậu cung / Giao tình / Hoàng tự / Tư trang / Tài nghệ / Mệnh truyện) */
function tabName(k){try{{const r8=typeof road8Name==="function"?road8Name(k):"";if(r8)return r8}/* cung nữ / home road: the same 8 tabs, her sub-tab names (jroad8) */if(k==="act")return "Hành sự";const b=document.querySelector(`#tabs [data-tab="${k}"]`);
  if(b&&b.offsetParent)return (b.dataset.l0||b.textContent).trim();if(typeof KG==="object")for(const g in KG)if(KG[g].keys.includes(k))return KG[g].l;
  return b?(b.dataset.l0||b.textContent).trim():k}catch(e){return k}}
/* ---------- data ---------- */
function road(){try{const Q0=(typeof QUEST67==="object"&&(QUEST67[S.origin.k]||QUEST67.tt))||null;return Q0?Q0.t:""}catch(e){return""}}
function chapter(){try{/* a road with its own chapter (jkc at home before the tuyển tú) */if(typeof window.kitGoalAlt==="function"){const a=window.kitGoalAlt();if(a)return a}if(!S||!S.st)return null;const c=S.st.ch,m=S.st.ms,M=S.st.M;
 if(typeof v267==="function"&&v267()&&c){
  if(m&&typeof MS67==="object"&&MS67[m.id]){const d=MS67[m.id],st=d.steps(m);/* a tutorial chapter with quests (jtq14): every line must be done; its open quests are the "Việc nên làm" with "Đi làm" */
  return{kind:"ms",id:m.id,n:c.n,max:c.max,t:d.t(),g:d.g(),steps:st.map(x=>({t:x[0],ok:!!x[1]})),any:!!d.any&&!m.q14,todo:m.q14&&typeof tq14Todo==="function"?tq14Todo(m):null}}
  if(M&&typeof ARC67==="object"&&ARC67[M.a]){const a=ARC67[M.a],P=(typeof pos67==="function"&&pos67(M))||{c:M.chap||1,i:M.i||0,n:M.seq.length};
   return{kind:"arc",n:P.c,max:c.max,t:a.t,g:fill67(a.g,M),act:P.i,acts:P.n,next:hint67(M),wait:!!M.cur,hist:M.hist||[],sc:M.sc||0,dl:M.dl}}
  if(c.all)return{kind:"all",n:c.n,max:c.max,t:"Mệnh truyện trọn vẹn",g:c.fin||""}}
 const s=typeof STORY==="object"&&S.origin&&STORY[S.origin.k];if(s){let hn="";try{hn=s.hint?s.hint():""}catch(e){}return{kind:"v1",n:1,max:s.n||0,t:s.t,g:plain(s.goal),next:hn}}}catch(e){console.error("goal",e)}return null}
/* act: matched anywhere in the card title (.kan may start with a small portrait label, e.g. "Hoàng hậu")
   the 2–3 concrete things to do next, each with where to tap (tab + act card) */
function nextSteps(C){if(C&&C.todo)return C.todo.slice(0,3).map(x=>Object.assign({},x,{where:((typeof road8Name==="function"&&road8Name(x.tab))||x.tl||tabName(x.tab))+(x.card?` › thẻ ${x.card}`:"")}));const L=[];const when=(S.buoi||0)===0?"sáng nay":"sáng mai";
 const hh=(()=>{try{return typeof qOn==="function"&&qOn()&&rivals[0]&&rivals[0].alive}catch(e){return false}})();
 if(C&&C.kind==="arc"&&C.wait)L.push({t:"Quyết hồi truyện đang chờ",why:"hồi truyện chờ lựa chọn của ngươi",tab:"story"});
 if(isS()){
  L.push({t:"Làm tròn phận sự hầu chủ",why:"chủ tin thì được nâng đỡ, có ngày được phong Đáp ứng",tab:"act"});
  L.push({t:"Đi làm quen các nơi được đến",why:"biết đường, biết người thì làm việc chủ sai mới khéo",tab:"go"});
  L.push({t:"Kết thân một người cùng làm",why:"có người đỡ đần thì bớt bị hãm hại",tab:"staff"})}
 else if(S.out)L.push({t:"Giữ Sức, chờ dịp xin phục vị",why:"còn sống là còn đường về",tab:"act"});
 else{
  if(hh)L.push({t:`Đi thỉnh an Hoàng hậu ${when}`,why:"Hoàng hậu thương thì được che chở; Danh, Đức tăng",tab:"act",act:/Thỉnh an Hoàng hậu/,card:"Thỉnh an Hoàng hậu"});
  else if(!S.thDead)L.push({t:`Đi thỉnh an Thái hậu ${when}`,why:"Thái hậu thương thì đường tấn phong rộng mở",tab:"act",act:/Thỉnh an Thái hậu/,card:"Thỉnh an Thái hậu"});
  if(C&&C.kind==="ms"&&/^(nhap|nhap14|sung14)$/.test(C.id))/* the 14-chapter tutorial (jst14 nhap14 / sung14, r3) is the same goal */L.push({t:"Làm Hoàng thượng để mắt tới",why:"đủ Sủng, đủ Danh thì được tấn phong một bậc",tab:"act",act:/Múa trong yến tiệc|Dưỡng nhan|Điểm trang|Đánh đàn|Dâng canh/,card:"Múa trong yến tiệc, Dưỡng nhan"});
  L.push({t:"Học một môn tài nghệ",why:"bậc cao mở việc mới, thắng thi tài, được để mắt",tab:"art"});
  L.push({t:"Kết giao một người",why:"có chị em che chở thì bớt bị hãm hại",tab:"rv"})}
 return L.slice(0,3).map(x=>Object.assign(x,{where:tabName(x.tab)+(x.card?` › thẻ ${x.card}`:"")}))}
function kitGoalNow(){if(typeof S==="undefined"||!S||S.dead)return null;const C=chapter();if(!C)return null;
 let step="";if(C.kind==="ms"){const nx=C.steps.find(x=>!x.ok);step=nx?nx.t:"sắp xong"}else step=plain(C.next||C.g);
 return{road:C.road||road(),C,kicker:`Chương ${C.n}`,title:C.t,goal:C.g,step,next:nextSteps(C)}}
/* ---------- "Đi làm": open the tab, ring the act card with the guide's spotlight (kitCoach, jtut) when it is on screen ---------- */
function goWhere(x){try{if(!x||!x.tab)return;const b=document.querySelector(`#tabs [data-tab="${x.tab}"]`);
 /* tapping the tab that is already open sends a phone back to the room (jk3), so only tap another tab */
 const open=tab===x.tab&&!document.querySelector(".game.k3home")&&!!document.querySelector("#panel")&&!!document.querySelector("#panel").getClientRects().length;
 if(!open){if(b&&b.offsetParent)b.click();else{tab=x.tab;if(typeof render==="function")render()}}
 if(!x.act)return;/* the panel re-renders: the ring follows the card by a finder, not a node */
 const find=()=>[...document.querySelectorAll("#panel button.ka")].find(e=>e.offsetParent&&x.act.test(((e.querySelector(".kan")||e).textContent||"").trim()))||null;
 setTimeout(()=>{try{const c=find();if(!c)return;c.scrollIntoView({block:"center"});
  if(typeof kitCoach==="function")setTimeout(()=>{kitCoach({title:x.t,sub:"Mệnh truyện · việc kế",html:`<p>Thẻ đang sáng là việc này. Chạm vào thẻ để làm.</p>`,target:find,pad:4,interact:true,btns:[{k:"ok",t:"Đã hiểu"}],on(){kitCoachOff()}});
   const off=e=>{if(e.target.closest&&e.target.closest("#panel button.ka")){document.removeEventListener("click",off,true);try{kitCoachOff()}catch(x){}}};document.addEventListener("click",off,true)},300)}catch(e){}},450)}catch(e){console.error("goal go",e)}}
/* ---------- chapter detail (kit panel, event frame) ---------- */
function art(){try{return{src:typeof kitOriginWide==="function"?kitOriginWide(S.origin.k):kitOriginArt(S.origin.k),label:road()}}catch(e){return null}}
function nextRows(N){return N.map((x,i)=>[`Việc ${i+1}`,`<b>${esc(x.t)}</b><br><span class="past">${esc(x.why)} · chạm: ${esc(x.where)}</span>`,""])}
function nextOpts(N){return N.map(x=>({n:`Đi làm: ${x.t}`,fx:{},x:`tới ${x.where}`,go:()=>{setTimeout(()=>goWhere(x),80)}}))}
function kitGoalDetail(){const G=kitGoalNow();if(!G)return;const C=G.C;
 const sec=[{h:"Mục tiêu chương",rows:[["Chương",`${G.kicker} · ${esc(C.t)}`],["Mục tiêu",esc(C.g)]]}];
 /* the 14-chapter frame of a new life (jst14): which part she is in, chapters left */
 try{const F=typeof f14Info==="function"?f14Info():null;if(F)sec.push({h:`Đời người · ${F.max} chương`,rows:F.rows.concat([["Còn lại",F.left?`${F.left} chương`:"đã đi hết các chương"]])})}catch(e){}
 if(C.kind==="ms")sec.push({h:C.any?"Tiến độ · xong một điều là đủ":"Tiến độ",html:typeof kitChecks==="function"?kitChecks(C.steps.map(x=>[x.ok,esc(x.t)])):""});
 if(C.kind==="ms"&&/^nhap(14)?$/.test(C.id)&&!isS()&&!S.out&&S.rank<7&&typeof promoReq==="function"){try{const R=promoReq();R.sort((a,b)=>a[0]-b[0]);
  sec.push({h:`Muốn lên ${RANKS[S.rank+1].n}`,html:typeof kitReqRows==="function"?kitReqRows(R):""})}catch(e){}}
 /* C24 (review/chapter-detail): the same panel grown with the whole progress (chapModel, jchap.js): steps with how/where, the hồi so far with their pictures, risks */
 const CM=typeof chapModel==="function"?chapModel():null;
 if(CM&&(CM.mode==="arc"||CM.mode==="v1")){
  sec.push({h:CM.mode==="arc"?"Các hồi":"Tiến độ",html:CM.steps.length&&typeof kitChecks==="function"?kitChecks(CM.steps.map(x=>[x.ok,`${esc(x.t)}${x.d?`<small class="past"> · ${esc(x.d)}</small>`:""}`])):""});
  if(!CM.steps.length||CM.mode==="arc")sec.push({h:"Kế tiếp",rows:[["Kế tiếp",esc(plain(CM.next||C.next||"")),C.wait?"g":""]]});
  if(CM.past.length&&typeof kitSkillCard==="function")sec.push({h:"Chuyện đã qua",html:CM.past.map(x=>kitSkillCard({kind:"hoi",name:x.t,max:0,img:x.img,desc:x.d})).join("")});
  else if(CM.mode==="arc")sec.push({h:"Chuyện đã qua",html:`<p class="kpnote">Chương này chưa có hồi nào khép lại.</p>`});
  if(CM.risks.length)sec.push({h:"Cần lưu ý",rows:CM.risks.map(r=>[r[0],r[1],r[2]||""])})}
 else{
 if(C.kind==="arc"){const R=[["Hồi",`${C.act}/${C.acts}`],["Kế tiếp",esc(plain(C.next)),C.wait?"g":""],["Lợi thế",`${C.sc} · mỗi phần thêm cơ may ở hồi cao trào`]];
  if(C.dl!=null)R.push(["Hạn",`còn ${Math.max(0,C.dl-S.turn)} tháng`,C.dl-S.turn<=1?"r":""]);if(C.hist.length)R.push(["Đã qua",C.hist.map(esc).join("<br>")]);sec.push({h:"Tiến độ",rows:R})}
 if(C.kind==="v1"&&C.next)sec.push({h:"Tiến độ",rows:[["Kế tiếp",esc(plain(C.next))]]});
 /* a milestone chapter: its HẠN row, the same words as the card, the Mệnh truyện tab and the panel (msHan67, j67; review/story14-p1-r2 item 7) */
 if(C.kind==="ms"&&S.st&&S.st.ms&&typeof msHan67==="function")sec.push({h:"Cần lưu ý",rows:[msHan67(S.st.ms,2)]})}
 sec.push({h:"Việc nên làm",rows:nextRows(G.next)});
 kitPanel({kind:"info",title:`${G.kicker} · ${C.t}`,sub:G.road?`Mệnh truyện: ${G.road}`:"",headArt:(CM&&CM.cover&&typeof CM.cover==="string"?{src:CM.cover,label:road()}:CM&&CM.cover&&CM.cover.src?{src:CM.cover.src,label:CM.cover.label||road()}:art()),/* kit-rows-b KP20: the chapter cover (chapModel .cover) replaces the topic picture in the headArt band */sections:sec,opts:nextOpts(G.next).concat([{n:"Đóng",fx:{},go:()=>{}}])},true);showModal()}  /* "Đóng" = the close option → kit ✕ + tap outside + Esc (32.10) */
/* ---------- "Mệnh truyện kiếp này": right after Nhập cung ---------- */
function kitGoalCard(){const G=kitGoalNow();if(!G)return null;const C=G.C;
 const life=isS()?"Từ thân cung nữ, đi lên bằng lòng tin của chủ và ánh mắt của Hoàng thượng.":`Từ ${RANKS[S.rank].n} leo dần lên Hoàng hậu, rồi Hoàng thái hậu; giữ mình, giữ nhà.`;
 const sec=[{h:"Đường đời kiếp này",rows:[["Đường lớn",life],G.road?["Truyện riêng",`«${esc(G.road)}» · từng chương mở dần theo thời gian`]:null,["Chương này",`${G.kicker} · ${esc(C.t)}`],["Mục tiêu",esc(C.g)]].filter(Boolean)},
  {h:"Việc nên làm trước",rows:nextRows(G.next)},
  {h:"Xem lại",rows:[["Mục tiêu chương","cuộn chiếu ở cột nút bên trái màn; chạm vào để xem chi tiết chương"],["Mệnh truyện",`mục ${tabName("story")} ở hàng dưới`]]}];
 return {kind:"notice",title:"Mệnh truyện kiếp này",sub:`${G.kicker} · ${C.t}`,headArt:art(),sections:sec,btn:"Đã hiểu"}}
/* queued right after the Nhập cung card of a new life (each machine, own life; co-op guest too). The new life is made inside Luân hồi
   (j52 nlBegin → the inner start, maybe after the figures load), so this watches the queue: a "Nhập cung" card with no goal card yet. */
function nhapAt(){return Q.findIndex(x=>x&&(/^Nhập cung/.test(String(x.t||""))||(x.kit&&/^Nhập cung/.test(String(x.kit.title||"")))))}
function queueCard(){try{if(bot()||typeof S==="undefined"||!S||S.dead||S.goalCard||typeof Q==="undefined"||!Q)return;const at=nhapAt();if(at<0)return;
 const spec=kitGoalCard();if(!spec)return;S.goalCard=1;const m=kitPanel(spec);m.goal=1;const i0=Q.indexOf(m);if(i0>=0)Q.splice(i0,1);Q.splice(nhapAt()+1,0,m)}catch(e){console.error("goal card",e)}}
setInterval(queueCard,300);
try{const sm0=showModal;showModal=function(){queueCard();return sm0.apply(this,arguments)};window.showModal=showModal}catch(e){}
/* owner 16/11 (shot 1b571e3a): the goal strip is REPLACED by the goal icon of the stage rail (kitStageRail §77, jrail): no strip on the
   stage, none on top of Hành sự (the strip and its CSS are deleted); a stale #kgoalst is removed. */
try{const r0=render;render=function(){const r=r0.apply(this,arguments);try{const el=document.getElementById("kgoalst");if(el)el.remove()}catch(e){}return r};window.render=render}catch(e){}
/* the chapter card on Mệnh truyện › Chương này opens the same detail (no dead taps) */
document.addEventListener("click",e=>{try{if(typeof tab==="undefined"||tab!=="story")return;const c=e.target.closest&&e.target.closest('#panel .kskill[data-skill^="story-"]');if(!c||e.target.closest("button,a,[data-v85tab]"))return;kitGoalDetail()}catch(x){}});
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§72",title:"kitGoalDetail · chi tiết chương (khung sự kiện: tranh trái, hàng kit phải) — mở từ nút Mục tiêu của cột §77",
 html:()=>`<div class="kitpg-row"><button type="button" class="kbtn" onclick="kitGoalDetail()">Mở chi tiết chương</button></div>`})}catch(e){}
window.kitGoalNow=kitGoalNow;window.kitGoalDetail=kitGoalDetail;window.kitGoalCard=kitGoalCard;window.kitGoalGo=goWhere;
}catch(e){console.error("jgoal",e)}})();
