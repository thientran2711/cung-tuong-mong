/* ================= jfamg.js — GIFTS TO HER OWN FAMILY (D-FAMILY-GIFT, OD 26/11 (c), PARKING_LOT row 35) =================
   Expert table: dev/handover/reports/d-family-gift.md §EXPERT (Qing: a consort's parcel home went through a eunuch and the gate, private and risky;
   what came back: letters, home goods, the family's standing). Before this file: family → her (jkcg letters / home gifts, jecon home money, j72 «fam»
   favours) and her → the five court houses (j55, her own father hidden); her → HER OWN family did not exist.
   ONE road for everyone (law 1): fgGo(p, tier, way) — the player (Tư trang › «Thư nhà», button «Gửi quà về nhà») and every NPC consort (monthly, fgNpcMonth)
   pay the same costs, roll the same gate odds and get the same results.
   Tiers (law 2) Nhẹ · Vừa · Nặng; Vừa / Nặng each have a silver way and a chest-piece way of the same tier (a bạc road always has a matching other road).
   Law 6c REAL OBJECTS: a piece sent home leaves her chest (ilOut) and sits in the ledger box "nha" (jil ilGone how "home"); a stopped parcel goes to the
   Nội vụ phủ store (ilGone "conf", the existing atonement road); the family's answer gift is a real new piece logged from "nha".
   Law 6b REAL PEOPLE: the receiver is a real person — on the Khuê các road her mother / grandmother (kcgMom, S.kc.fam); otherwise her mother at home S.fgh
   (made once, named, liking af), only for origins whose family at home really lives (BAL.gift.fam.orig).
   Numbers: BAL.gift.fam (jbal2.js). Kit only: pbtn act card, PEND option dialog (one choice formatter: Tốn exact, Được/Mất marks), kitRows, resultShow,
   the KINV_XTRA «Thư nhà» sub-tab (jkcg). ===== */
function fgF(){return BAL.gift.fam}
/* the real person at home who receives her parcel (null = nobody: no road) */
function fgHome(p){if(p!==S||!S||S.dead)return null;
 if(S.kc){try{return typeof kcgMom==="function"?kcgMom():null}catch(e){return null}}/* Khuê các road: her real family list only */
 const F=fgF();if(!S.origin||!F.orig.includes(S.origin.k)||(typeof isSrv==="function"&&isSrv()))return null;
 if(!S.fgh){let nm="";try{const sur=typeof tdSur==="function"?tdSur(S.name):"";nm=nmNew("mo",{avoidSur:new Set([sur])})}catch(e){}
  S.fgh={r:"me",t:"Mẫu thân",name:nm||"Mẫu thân",af:BAL.kcg.home.mid,alive:true}}
 return S.fgh.alive===false?null:S.fgh}
function fgAf(m,n){if(!m||!n)return;if(typeof kcAf==="function"&&S.kc)kcAf(m,n);else m.af=cl((m.af||0)+n,-100,100)}
/* a chest piece of the tier's value: durable, not worn, never an imperial bestowal (expert R3), not a work still in progress; the cheapest that fits */
function fgPiece(p,t){const V=fgF()[t]&&fgF()[t].v;if(!V)return null;let best=null,bv=1e9;
 for(const e of (p.inv||[])){if(!e||!e.k||e.from==="emp"||e.from==="base"||e.h||e.used)continue;try{if(typeof ilDur==="function"&&!ilDur(e))continue}catch(x){}
  const v=typeof ilVal==="function"?ilVal(e):((IT[e.k]||{}).pr|0);if(v>=V[0]&&v<=V[1]&&v<bv){best=e;bv=v}}
 return best}
function fgPieceN(e){return e?(e.wk?e.wk.n:itm(e.k).n):""}
/* gate odds (Vừa / Nặng): base + her Tâm cơ; Nhẹ has no check */
function fgO(p,t){const F=fgF(),T=F[t];if(!T||T.o==null)return 100;return oddsCl(T.o+Math.round(((p.tamco||0)-F.tcMid)*F.tcK))}
function fgCan(p,t,way){const F=fgF(),T=F[t];if(!T)return false;
 if(t==="nhe")return p===S?(S.suc||0)>=T.suc:true;
 if((p.bac||0)<F.fee+(way==="bac"?T.bac:0))return false;return way==="bac"||!!fgPiece(p,t)}
function fgLogS(x){S.fgLog=S.fgLog||[];S.fgLog.unshift(x);if(S.fgLog.length>fgF().keep)S.fgLog.length=fgF().keep}
/* THE act (player and NPC). Returns {ok, txt}. */
function fgGo(p,t,way){const F=fgF(),T=F[t];if(!T||!fgCan(p,t,way))return null;const me=p===S;const m=me?fgHome(S):null;if(me&&!m)return null;
 let e=null,what="";
 if(t==="nhe"){if(me)S.suc=Math.max(0,S.suc-T.suc);e={k:T.item,from:me?"me":String(p.id)};invAdd(p,e);what=itm(T.item).n}
 else{ap(p,{bac:-F.fee});if(way==="bac"){ap(p,{bac:-T.bac});what=`Bạc ${T.bac}`}else{e=fgPiece(p,t);what=fgPieceN(e)}}
 const ok=t==="nhe"||roll(fgO(p,t));
 if(e){try{ilOut(p,e);ilGone(p,e,ok?"home":"conf",{by:ok?"":"gate",keep:1/* the Nhẹ handkerchief is a story item: kept in the ledger all the same (law 6c) */})}catch(x){console.error("fg ledger",x)}}
 const nm=me?"":p.name;
 if(ok){
  if(me){fgAf(m,T.af);apply({duc:T.duc||0,danh:T.danh||0});S.fgq={t,w:S.turn+F.wait};fgLogS({m:S.month,y:S.year,what:`Gửi về: ${what}`})}
  else{const d=F.npc.dad[["nhe","vua","nang"].indexOf(t)]||0;if(d)p.dad=cl((p.dad==null?40:p.dad)+d,0,100)}
  if(me)S.fgT=S.turn;
  return{ok:true,txt:me?`Thái giám mang ${what} ra cửa cung, đưa tận tay ${m.t.toLowerCase()} ${m.name}.`:`${nm} gửi ${t==="nang"?"một gói lớn":"ít quà"} về nhà mẹ đẻ.`}}
 /* stopped at the gate (expert E2/E6): the piece to the Nội vụ phủ store, talk of sending palace goods out */
 const L={danh:-(T.lostDanh||0),duc:-(T.lostDuc||0)};if(me){apply(L);S.fgT=S.turn;fgLogS({m:S.month,y:S.year,what:`Bị giữ ở cửa cung: ${what}`})}else ap(p,L);
 return{ok:false,txt:me?`Kính sự phòng giữ gói ${what} ở cửa cung${e?", đưa về kho Nội vụ phủ":""}. Người ta xì xào ngươi đưa của ra ngoài cung.`:`Kính sự phòng giữ gói đồ ${nm} gửi về nhà mẹ đẻ; người trong cung xì xào.`}}
/* one option row per tier way (kit option dialog; the formatter turns Được/Mất numbers into marks, Tốn stays exact) */
function fgOpt(t,way){const F=fgF(),T=F[t],m=fgHome(S);if(!m)return null;const why=!fgCan(S,t,way);
 const lab={nhe:"Nhẹ",vua:"Vừa",nang:"Nặng"}[t];const mt=m.t.toLowerCase();
 if(t==="nhe")return{n:`${lab}: thư kèm ${itm(T.item).n.toLowerCase()} tự tay thêu`,fx:{},dis:why?`Sức dưới ${T.suc}`:"",
  x:`${word(100)} · tốn: ${F.k} khắc, Sức -${T.suc} · thành: ${mt} thiện cảm +${T.af}, Đức +${T.duc}`,go:()=>fgDo(t,way)};
 const e=way==="item"?fgPiece(S,t):null;const pay=way==="bac"?`Bạc -${F.fee+T.bac}`:`Bạc -${F.fee}`;/* the piece itself is named in the option title (the Tốn row holds amounts only) */
 const ret=t==="nang"?`tháng sau nhà gửi đồ vào, tiền nhà gửi thêm Bạc +${T.up} trong ${T.m} kỳ`:"tháng sau nhà gửi đồ vào";
 return{n:`${lab}: ${way==="bac"?`gửi bạc giúp nhà`:`gửi ${e?fgPieceN(e).toLowerCase():"một món đồ trong rương"}`}`,fx:{},
  dis:why?(way==="item"&&!e?"không có món đồ hợp":"không đủ bạc"):"",
  x:`${word(fgO(S,t))} · tốn: ${F.k} khắc, ${pay} · thành: ${mt} thiện cảm +${T.af}, Đức +${T.duc}, Danh +${T.danh}, ${ret} · hỏng: Kính sự phòng giữ ở cửa cung${way==="item"?" (đồ về kho Nội vụ phủ)":""}, Danh -${T.lostDanh}${T.lostDuc?`, Đức -${T.lostDuc}`:""}`,go:()=>fgDo(t,way)}}
function fgDo(t,way){if(!S||S.dead||!can(fgF().k))return;const b=rsnap();spend(fgF().k);const r=fgGo(S,t,way);if(!r)return;log(r.txt);try{resultShow("Gửi quà về nhà",b,r.ok)}catch(e){}try{render()}catch(e){}}
PEND.fgSend=()=>{const m=fgHome(S);if(!m)return null;
 const o=[fgOpt("nhe"),fgOpt("vua","item"),fgOpt("vua","bac"),fgOpt("nang","item"),fgOpt("nang","bac")].filter(Boolean)
  .map(c=>{const w=c.dis;delete c.dis;return w&&typeof kitOff==="function"?kitOff(c,w,w==="không đủ bạc"?"khi có đủ bạc":/^Sức/.test(w)?"khi nghỉ lại sức":"khi rương có món đồ hợp"):c});/* kit §84 greyed option */
 return{who:pMe(),t:`<p>Gửi quà về cho ${m.t.toLowerCase()} ${m.name}. Thái giám mang ra cửa cung; gói càng nặng, Kính sự phòng càng soi kỹ.</p>`,o:o.concat([{n:"Thôi",fx:{}}])}};
function fgWhy(){const F=fgF();if(!fgHome(S))return"không còn người nhà";if(S.fgT!=null&&S.turn-S.fgT<F.cd)return"tháng này đã gửi";if(S.fgq&&S.fgq.w>S.turn)return"đang chờ thư nhà";if(!can(F.k))return"hết khắc";return""}
function fgHTML(){const m=fgHome(S);if(!m)return"";const head=S.kc?"":kitRows([[m.t,`${m.name} · thiện cảm ${m.af}`,"t"]]);
 const btn=`<div class="rbtn">`+pbtn(`data-fgh="1"`,"Gửi quà về nhà",`tốn: ${fgF().k} khắc trở lên · thành: ${m.t} vui lòng, tháng sau nhà hồi âm`,fgWhy())+`</div>`;
 const L=S.fgLog||[];const rows=L.length?L.map(x=>[`Tháng ${x.m}, năm thứ ${x.y}`,x.what,"t"]):[["Chưa gửi","Ngươi chưa gửi gì về nhà","n"]];
 return head+btn+`<h4 class="kpst">Quà gửi về nhà</h4>`+kitRows(rows)}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-fgh]");if(!b)return;e.stopPropagation();e.preventDefault();if(b.disabled||fgWhy())return;
 pushDil(mkP("fgSend",{}),"Gửi quà về nhà");try{showModal()}catch(x){}},true);
/* the Tư trang «Thư nhà» sub-tab: on the Khuê các road jkcg's letters + this road; otherwise this road alone */
(function(){if(typeof KINV_XTRA!=="object")return;const x=KINV_XTRA.find(z=>z.k==="nha");
 if(x){const on0=x.on,h0=x.html;x.on=()=>{try{if(on0())return true}catch(e){}return !!fgHome(S)};x.html=()=>{let h="";try{if(on0())h=h0()}catch(e){}return h+fgHTML()}}
 else KINV_XTRA.push({k:"nha",label:"Thư nhà",on:()=>!!fgHome(S),html:fgHTML})})();
/* the family's answer (two-way, expert E7): a letter, and for Vừa / Nặng a real home gift; Nặng also more home money for a few rounds */
function fgReply(){const q=S.fgq;if(!q||S.turn<q.w)return;S.fgq=null;const m=fgHome(S);if(!m)return;const F=fgF();const rows=[];
 if(q.t!=="nhe"){const k=pick(BAL.kcg.home.gifts.filter(x=>IT[x]));if(k){const e={k,from:"nha"};invAdd(S,e);try{lgr(e,"nha","me","quà nhà")}catch(x){}rows.push(["Nhận",itm(k).n,"g"])}}
 if(q.t==="nang"){S.fgUp={u:S.turn+F.nang.m*BAL.homeEvery,n:F.nang.up};rows.push(["Tiền nhà",`mỗi kỳ thêm Bạc ${F.nang.up}, ${F.nang.m} kỳ tới`,"g"])}
 fgLogS({m:S.month,y:S.year,what:`${m.t} hồi âm${rows.length?": "+rows.map(r=>r[1]).join(", "):""}`});
 Q.push({t:"Thư nhà",who:pMe(),h:`<p>${m.t} ${m.name} viết thư vào cung: nhà đã nhận quà, cả nhà mừng rỡ, dặn ngươi giữ gìn sức khỏe.</p>`+kitRows(rows.concat([["Cất ở","Tư trang › Thư nhà","n"]]))})}
/* Nặng: the home money (jecon econHome) is larger for a few rounds */
(function(){if(typeof econHome!=="function")return;const h0=econHome;econHome=function(p){const r=h0.apply(this,arguments);try{if(p===S&&S.fgUp&&S.turn<S.fgUp.u&&S.origin&&!S.out&&!S.homeCut&&(S.month%BAL.homeEvery)===1)return r+S.fgUp.n}catch(e){}return r}})();
/* law 1: NPC consorts send home too, same act; a stopped NPC parcel is palace news she hears */
function fgNpcMonth(){const N=fgF().npc;for(const v of (typeof liveRivals==="function"?liveRivals(true):[])){if(!v||v===S||!v.alive||v.out||!roll(N.p))continue;
 const t=roll(N.nang)?"nang":"vua";const way=fgPiece(v,t)&&roll(50)?"item":"bac";if(!fgCan(v,t,way))continue;const r=fgGo(v,t,way);if(r&&!r.ok)log(r.txt)}}
(function(){const e0=endTurn;endTurn=function(){const t0=S&&S.turn;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&S.turn!==t0&&!(typeof isKc==="function"&&isKc())){fgReply();fgNpcMonth();if(Q.length&&$("modal").hidden)showModal()}}catch(e){console.error("fg month",e)}return r}})();
window.fgGo=fgGo;window.fgHome=fgHome;
