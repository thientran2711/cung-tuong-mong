/* jkcco: GAP OR13 co-op half (review/outside-coop; OUTSIDE_PLAN §1 + §13; brief dev/handover/briefs/b-gap-1.md J3b).
   A friend at home (tiểu thư road, jkc) and a friend in the palace help or harm each other with REAL acts, both ways (law 1):
     letter  thư (true intel on a consort + a real letter item)        home → palace and palace → home
     gift    a real item from her chest; it crosses on the next visiting day (next turn), traced in the item ledger (law 6c)
     so      a petition by her father: "up" = for the friend's house (accept-card), "dn" = against a consort's house (event)
     rumour  city / palace gossip raising or lowering the friend's name (Danh / Lời đồn) or an NPC consort's Danh
     join    the friend at home passes the tuyển tú (jkc kcHook "enter"): the palace friend may ask for her as a side-hall resident
   Each act = a normal act with price + odds on the sender's side (numbers in BAL.kcco, law 4); the receiver gets an accept-card (mutual
   acts) or an event card (things done TO her); every option has a gain (laws 2, 3).
   ONE path (owner co-op rule OD:L96): route(seat, op, m) runs a handler for a seat — on the host directly (seat a) or in her context
   (seat b, part D D.later → her card / her patch); on the guest for herself; otherwise the room's act relay (k "ctm-kc", no Worker
   change), resent until acked. World writes (j55 house power / relations, an NPC's Danh) run ONCE, on the host ("world" op).
   The roll is made where the act runs (thin level 6: the guest's act runs on the host = host-computed); the result and every number
   travel in the message, so both phones read the same number. Solo never runs any of it (kccoOn() needs a co-op room). */
(function(){
const CW=()=>window.COOPW;
const J=x=>x==null?x:JSON.parse(JSON.stringify(x));
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const K=()=>BAL.kcco;
const seat=()=>{const c=CW();return c&&(c.ctx||c.seat)||null};
const oth=s=>s==="a"?"b":"a";
const pidOf=s=>s==="a"?901:902;
function kccoS(){S.kcco=S.kcco||{};const o=S.kcco;o.out=o.out||[];o.done=o.done||{};o.last=o.last||{};o.log=o.log||[];return o}
function fBlob(){const c=CW();try{const P=c&&c.base&&c.base.P&&c.base.P[oth(seat())];return P&&!P.dead&&P.S&&!P.S.dead?P:null}catch(e){return null}}
function sideOf(P){return P&&P.S&&P.S.kc&&!P.S.kc.inPal?"h":"p"}
function mySide(){return typeof isKc==="function"&&isKc()?"h":"p"}
/* on: a co-op room, both alive, one at home and one in the palace (both in the palace = the normal co-op acts) */
function kccoOn(){try{const c=CW();if(!c||!c.on||!S||S.dead||S.srv||(typeof isSrv==="function"&&isSrv()))return false;const P=fBlob();return !!P&&sideOf(P)!==mySide()}catch(e){return false}}
window.kccoOn=kccoOn;
/* fog (owner OD:L165 / OD:L1060, j61 K61FR): the friend is "Hảo hữu của ta" until met — one at home and one in the palace have never met */
function fLabel(){const FR=window.K61FR||"Hảo hữu của ta";try{const e=typeof k61CoopEnt==="function"?k61CoopEnt():null;if(e&&!k61Coop(e))return e.name}catch(x){}return FR}
function fName(){return fBlob()?fLabel():"hảo hữu"}
function fPid(){return pidOf(oth(seat()))}
function bond(n){if(!n)return;S.rl=S.rl||{};const k=fPid();S.rl[k]=cl((S.rl[k]||0)+n,-100,100)}
const HOUSE={tt:"Tể tướng",dtq:"Đại tướng quân",thd:"Hàn lâm",td:"Lễ bộ"};
function clanOfS(s){const c=s&&s.origin&&HOUSE[s.origin.k];return c&&typeof CLANS!=="undefined"&&CLANS.includes(c)?c:null}
function myClan(){return clanOfS(S)}
function fClan(){const P=fBlob();if(!P)return null;const c=HOUSE[P.ok]||(P.S&&P.S.origin&&HOUSE[P.S.origin.k]);/* P.ok = her origin key (jcoopworld P) */return c&&typeof CLANS!=="undefined"&&CLANS.includes(c)?c:null}
function hist(t){const o=kccoS();o.log.unshift({y:S.year,m:S.month,t});if(o.log.length>K().keep)o.log.length=K().keep}
/* who grants a side hall (law 6b: a real person): the living Hoàng hậu; none, or she is the Hoàng hậu herself → the Emperor */
function grantBy(){try{const q=typeof queenP==="function"?queenP():null;return q&&q!==S?"Hoàng hậu":"Hoàng thượng"}catch(e){return"Hoàng thượng"}}
function mid(){return seat()+"-"+(S.turn||0)+"-"+Math.random().toString(36).slice(2,8)}
/* ---------- transport ---------- */
const H={};           /* op → handler(m), runs in the context of the seat it is meant for */
const RQ=[];          /* relay queue (this phone): {to, op, m, rid, at} until the peer acks */
const LSK=()=>{try{return "ctm-kcco:"+(COOP.state.room||COOP.code||"")}catch(e){return "ctm-kcco:"}};
function rqSave(){try{localStorage.setItem(LSK(),JSON.stringify(RQ.slice(-30)))}catch(e){}}
function rqLoad(){try{const L=JSON.parse(localStorage.getItem(LSK())||"[]");for(const x of L)if(x&&x.rid&&!RQ.some(y=>y.rid===x.rid))RQ.push(x)}catch(e){}}
function relaySend(x){try{COOP.send({t:"act",k:"ctm-kc",to:x.to,op:x.op,m:x.m,rid:x.rid});x.at=Date.now()}catch(e){}}
function relay(to,op,m){const x={to,op,m:J(m),rid:m.id+":"+op+":"+to};if(!RQ.some(y=>y.rid===x.rid)){RQ.push(x);rqSave()}relaySend(x)}
function run(op,m){const f=H[op];if(!f||!S||!m)return;const o=kccoS(),dk=m.id+":"+op;if(o.done[dk])return;
 /* law 6c (review r1): a gift that reaches a receiver who has died goes back to the sender's chest (once), never vanishes */
 if(S.dead){if(op==="card"&&m.kind==="gift"&&m.pl&&m.pl.e){o.done[dk]=S.turn||1;answer(m,"gone")}return}
 o.done[dk]=S.turn||1;
 try{f(m)}catch(e){console.error("kcco "+op,e)}
 /* old done keys: keep the last ~60 */const ks=Object.keys(o.done);if(ks.length>80)for(const k of ks.slice(0,ks.length-60))delete o.done[k]}
function route(to,op,m){const c=CW();if(!c||!c.on)return;const me=c.seat;
 if(me==="a"){if(to==="a"){setTimeout(()=>{run(op,m);try{if(Q.length)showModal();render()}catch(e){}},0);return}
  const TH=c.thin;if(TH&&TH.D&&TH.dOn&&TH.dOn()){TH.D.later(to,()=>run(op,m));return}relay(to,op,m);return}
 if(to===me&&!c.ctx){setTimeout(()=>{run(op,m);try{if(Q.length)showModal();render()}catch(e){}},0);return}
 relay(to,op,m)}
window.kccoRoute=route;
(function(){if(typeof COOP!=="object"||typeof COOP.on!=="function")return;
 COOP.on("act",x=>{try{const c=CW();if(!x||x.k!=="ctm-kc"||!c||!c.on||x.from===c.seat)return;
  if(x.ack){const i=RQ.findIndex(y=>y.rid===x.ack);if(i>=0){RQ.splice(i,1);rqSave()}return}
  if(x.to!==c.seat||!x.m||!x.op)return;COOP.send({t:"act",k:"ctm-kc",ack:x.rid});route(c.seat,x.op,x.m)}catch(e){console.error("kcco relay",e)}});
 COOP.on("peer",on=>{if(on)setTimeout(()=>{rqLoad();for(const x of RQ)relaySend(x)},500)});
 COOP.on("room",()=>{RQ.length=0;rqLoad()})})();
/* resend + gifts that wait for the visiting day (this phone, its own person) */
setInterval(()=>{try{const c=CW();if(!c||!c.on||!S||S.dead||c.ctx)return;const now=Date.now();for(const x of RQ)if(now-(x.at||0)>K().resend*1000)relaySend(x);
 const o=S.kcco;if(!o||!o.out)return;for(const m of o.out)if(m.wait&&(S.turn||0)>=m.due){m.wait=0;route(m.to,"card",m)}}catch(e){}},1500);
function send(kind,pl,extra){const s=seat(),m=Object.assign({id:mid(),kind,from:s,to:oth(s),fs:mySide(),fn:S.name,fc:myClan(),t:S.turn||0,pl:pl||{}},extra||{});
 const o=kccoS();o.out.unshift(m);if(o.out.length>K().keep)o.out.length=K().keep;o.last[kind]=S.turn;
 if(extra&&extra.noCard)return m;if(m.due!=null&&m.due>(S.turn||0))m.wait=1;else route(m.to,"card",m);return m}
/* ---------- the receiver's cards ---------- */
const who=()=>pMe()/* the sender never stands on the receiver's stage (law 6b): she reads it in her own room */;
function answer(m,a,extra){const r=Object.assign({},J(m),{ans:a,rc:myClan(),rn:S.name},extra||{});route(m.from,"ans",r);return r}
function itIn(e,m){const x=Object.assign({},e);x.from="coop:"+pidOf(m.from);S.inv=S.inv||[];S.inv.push(x);try{if(typeof ilLog==="function")ilLog(x,"coop:"+pidOf(m.from),"me",m.kind==="letter"?"thư hảo hữu":"quà hảo hữu")}catch(er){}return x}
function intel(id){const v=typeof RV==="function"?RV(id):null;if(!v||!v.alive)return null;try{if(mySide()==="h"&&typeof kcIntel1==="function")kcIntel1(v,K().letter.know);else if(typeof k61Know==="function")k61Know(v,"thư hảo hữu",true,K().letter.know)}catch(e){}return v}
const nameKey=()=>mySide()==="h"?"Lời đồn":"Danh";
function nameMove(n){/* her name with the world: palace Danh up = good; at home Lời đồn (kld) down = good */if(mySide()==="h")S.kld=Math.max(0,(S.kld||0)-n);else statSet(S,"danh",(S.danh||0)+n)}
const nameTxt=n=>mySide()==="h"?`Lời đồn ${balSg(-n)}`:`Danh ${balSg(n)}`;
PEND.kcco=p=>{const m0=p&&p.m;if(!m0||!S||S.dead)return null;const m=Object.assign({},m0,{fn:fLabel()});const C=K(),fn=esc(fLabel()),go=f=>()=>{const b=rsnap();const t=f();if(t)log(t);try{resultShow("Hảo hữu",b,true)}catch(e){}};
 const at=m.fs==="h"?"ở nhà":"trong cung";
 if(m.kind==="letter"){const v=m.pl.v!=null&&RV(m.pl.v);const tin=v?`${v.name}: ${RANKS[v.rank]?RANKS[v.rank].n:""}, ${v.trait||"tính chưa rõ"}`:"lời hỏi thăm";
  return{who:who(),t:`<p>Thư của hảo hữu ${fn} ${at} gửi đến.</p>`+kitRows([["Tin trong thư",tin,"t"]]),o:[
   {n:"Đọc thư, cất vào rương",fx:{},x:`an toàn · được: biết thêm${v?" về "+v.name:""}, giữ thư · tình hảo hữu ${balSg(C.letter.bond)}`,go:go(()=>{if(v)intel(v.id);itIn({k:"thunha"},m);bond(C.letter.bond);answer(m,"keep");hist(`Nhận thư của ${m.fn}`);return`Ngươi đọc thư của ${m.fn}, cất vào rương.`})},
   {n:"Đọc xong đốt đi",fx:{},x:`an toàn · được: biết thêm${v?" về "+v.name:""}, Tâm cơ ${balSg(C.letter.burn)} (cẩn trọng, không để lại dấu vết)`,go:go(()=>{if(v)intel(v.id);apply({tamco:C.letter.burn});answer(m,"burn");hist(`Đọc rồi đốt thư của ${m.fn}`);return`Ngươi đọc xong, đốt thư của ${m.fn}.`})}]}}
 if(m.kind==="gift"){const e=m.pl.e;if(!e||!e.k)return null;const it=itm(e.k);
  return{who:who(),t:`<p>Ngày thăm nuôi, hảo hữu ${fn} ${at} gửi đến <b>${esc(it.n)}</b>.</p><p class="past">${it.d||""}</p>`,o:[
   {n:"Nhận",fx:{},x:`cất vào rương · tình hảo hữu ${balSg(C.gift.bond)}`,go:go(()=>{itIn(e,m);bond(C.gift.bond);answer(m,"take");hist(`Nhận ${it.n} của ${m.fn}`);return`Ngươi nhận ${it.n} của ${m.fn}.`})},
   {n:"Trả lại quà",fx:{},x:`được: Đức ${balSg(C.gift.backDuc)} (giữ lễ, không nợ ai) · mất: tình hảo hữu ${balSg(-C.gift.backBond)} · món đồ về tay nàng`,go:go(()=>{apply({duc:C.gift.backDuc});bond(-C.gift.backBond);answer(m,"back");hist(`Trả lại ${it.n} cho ${m.fn}`);return`Ngươi gửi trả ${it.n} cho ${m.fn}.`})}]}}
 if(m.kind==="so"&&m.pl.dir==="up"){if(!myClan())return null;
  return{who:who(),t:`<p>Phụ thân của hảo hữu ${fn} muốn dâng sớ tiến cử nhà họ ngươi (nhà ${esc(myClan())}).</p>`,o:[
   {n:"Đội ơn, xin nhận",fx:{},x:`được: nhà ${myClan()} thế lực ${balSg(C.so.pow)}, ${nameTxt(C.so.danh)} · mất: Đức ${balSg(-C.so.beDuc)} (bị coi là cùng phe nhà ${m.fc||"nàng"})`,go:go(()=>{nameMove(C.so.danh);apply({duc:-C.so.beDuc});bond(C.so.bond);answer(m,"ok");hist(`Nhận sớ tiến cử của nhà ${m.fn}`);return`Sớ tiến cử dâng lên. Người ta nhắc đến nhà ${myClan()}.`})},
   {n:"Xin thôi, tránh tiếng kết bè",fx:{},x:`an toàn · được: Đức ${balSg(C.so.noDuc)} · không ai nói ngươi kéo bè`,go:go(()=>{apply({duc:C.so.noDuc});answer(m,"no");hist(`Từ chối sớ tiến cử của nhà ${m.fn}`);return"Ngươi khéo léo xin thôi."})}]}}
 if(m.kind==="so"){const v=RV(m.pl.v);return{who:who(),t:`<p>Phụ thân của hảo hữu ${fn} đã dâng sớ hặc nhà ${esc(m.pl.c||"")}${v?` (nhà của ${esc(v.name)})`:""}.</p>`+kitRows([["Nhà "+(m.pl.c||""),`thế lực ${balSg(-m.pl.pow)}`,"r"]]),o:[
   {n:"Biết rồi",fx:{},x:"an toàn",go:go(()=>{hist(`Nhà ${m.fn} hặc nhà ${m.pl.c}`);return""})}]}}
 if(m.kind==="rumour"){const n=m.pl.n;
  if(m.pl.dir>0)return{who:who(),t:`<p>Có lời khen ngươi lan ${m.fs==="h"?"khắp kinh thành":"từ trong cung ra"}: hảo hữu ${fn} nói tốt cho ngươi.</p>`,o:[
   {n:"Biết rồi",fx:{},x:`được: ${nameTxt(n)} · tình hảo hữu ${balSg(C.rumour.bond)}`,go:go(()=>{nameMove(n);bond(C.rumour.bond);hist(`${m.fn} nói tốt cho ngươi`);return""})}]};
  const o=C.rumour.fix,oo=oddsCl(o.o+Math.round((S.danh||0)*o.k)),hurt=()=>{nameMove(-n);bond(-C.rumour.bond);hist(`Lời đồn xấu về ngươi`)};
  return{who:who(),t:`<p>Có lời xấu về ngươi lan ${m.fs==="h"?"khắp kinh thành":"từ trong cung ra"}. Người ta bảo gốc gác từ phía hảo hữu ${fn}.</p>`,o:[
   {n:"Mặc kệ",fx:{},x:`được: Đức ${balSg(o.duc)} (không chấp) · mất: ${nameTxt(-n)}`,go:go(()=>{apply({duc:o.duc});hurt();return"Ngươi mặc kệ lời đồn."})},
   {n:"Bỏ bạc thuê người dập tin",fx:{bac:-o.bac},x:`${word(oo)} · tốn: Bạc ${o.bac} · thành: lời đồn tắt · hỏng: ${nameTxt(-n)}`,go:go(()=>{if(roll(oo)){hist("Dập được lời đồn");return"Lời đồn tắt dần."}hurt();return"Lời đồn vẫn lan."})},
   {n:"Tự đi giải thích",fx:{suc:-o.suc},x:`${word(oo)} · tốn: Sức ${o.suc} · thành: lời đồn tắt · hỏng: ${nameTxt(-n)}`,go:go(()=>{if(roll(oo)){hist("Giải thích, lời đồn tắt");return"Người ta tin lời ngươi."}hurt();return"Chẳng ai nghe ngươi giải thích."})}]}}
 if(m.kind==="join"){const J0=C.join,host=S.rank>=PAL_HEAD&&!S.out,oo=oddsCl(J0.o+Math.round((S.sung||0)*J0.k)),qw=grantBy();
  return{who:who(),t:`<p>Hảo hữu ${fn} qua kỳ tuyển tú, nay vào cung, phong ${esc(RANKS[m.pl.rank]?RANKS[m.pl.rank].n:"")}.</p>`,o:[
   host?{n:"Xin ban nàng về ở cung mình",fx:{suc:-J0.suc},x:`${word(oo)} · tốn: Sức ${J0.suc} · thành: nàng ở thiên điện cung ngươi, tình hảo hữu ${balSg(J0.bond)} · hỏng: Sủng ${balSg(-J0.sung)}`,go:go(()=>{
    if(roll(oo)){bond(J0.bond);answer(m,"ok",{rh:pidOf(seat()),qw});hist(`${m.fn} về ở thiên điện cung ngươi`);return`${qw} chuẩn tấu: ${m.fn} về ở thiên điện cung ngươi.`}
    apply({sung:-J0.sung});answer(m,"fail",{qw});return`${qw} không chuẩn.`})}:null,
   {n:"Gửi lời mừng",fx:{},x:`an toàn · được: tình hảo hữu ${balSg(J0.greet)}${host?"":" · ngươi chưa làm chủ vị, chưa xin được nàng về cung"}`,go:go(()=>{bond(J0.greet);answer(m,"greet");hist(`Mừng ${m.fn} vào cung`);return""})}].filter(Boolean)}}
 return null};
H.card=m=>{if(m.kind==="so"&&m.pl.dir==="dn"){pushDil(mkP("kcco",{m}),"Sớ hặc");return}
 const d=mkP("kcco",{m});if(!d){answer(m,"gone");return}pushDil(d,{letter:"Thư hảo hữu",gift:"Quà hảo hữu",so:"Sớ tiến cử",rumour:"Lời đồn",join:"Đón hảo hữu"}[m.kind]||"Hảo hữu")};
/* the sender's side of the answer */
H.ans=r=>{const o=kccoS();const m=o.out.find(x=>x.id===r.id);if(m)m.ans=r.ans;const fn=fLabel();
 if(r.kind==="gift"&&(r.ans==="back"||r.ans==="gone")&&r.pl&&r.pl.e){const e=Object.assign({},r.pl.e);delete e.from;S.inv=S.inv||[];S.inv.push(e);try{if(typeof ilLog==="function")ilLog(e,"coop:"+pidOf(r.to),"me","hảo hữu trả lại")}catch(x){}
  log(`${fn} gửi trả ${itm(e.k).n}.`);hist(`${fn} trả lại ${itm(e.k).n}`)}
 else if(r.kind==="gift"&&r.ans==="take"){log(`${fn} đã nhận ${itm(r.pl.e.k).n}.`);hist(`${fn} nhận quà`)}
 else if(r.kind==="letter"){log(`${fn} đã nhận thư của ngươi.`)}
 else if(r.kind==="so"&&r.pl.dir==="up"){if(r.ans==="ok"){bond(K().so.bond);log(`${fn} nhận sớ tiến cử của nhà ngươi.`)}else log(`${fn} khéo léo xin thôi, không nhận sớ.`)}
 else if(r.kind==="join"){if(r.ans==="ok"&&!S.dead&&S.rank<PAL_HEAD){S.resHead=r.rh;bond(K().join.bond);Q.push({t:"Về ở cung hảo hữu",who:pMe(),h:`<p>${esc(r.qw||"Hoàng thượng")} chuẩn tấu: ngươi về ở thiên điện cung của ${esc(fn)}.</p>`});hist(`Về ở cung ${fn}`)}
  else if(r.ans==="greet"){bond(K().join.greet);log(`${fn} gửi lời mừng ngươi vào cung.`)}else if(r.ans==="fail")log(`${fn} xin ngươi về cung mình, ${r.qw||"Hoàng thượng"} không chuẩn.`)}
 if(r.kind==="so"&&r.pl.dir==="up"&&r.ans==="ok"&&r.rc)route("a","world",Object.assign({},r,{wk:"soUp"}))};
/* world part: ONCE, on the host (seat a's own context) */
H.world=m=>{if(typeof worldOn==="function"&&!worldOn())return;const C=K();
 if(m.wk==="soUp"){if(m.rc&&typeof tdPowAdd==="function"){tdPowAdd(m.rc,C.so.pow);if(m.fc&&typeof tdRelAdd==="function")tdRelAdd(m.fc,m.rc,C.so.rel)}return}
 if(m.wk==="soDn"){if(m.pl.c&&typeof tdPowAdd==="function"){tdPowAdd(m.pl.c,-m.pl.pow);if(m.fc&&typeof tdRelAdd==="function")tdRelAdd(m.fc,m.pl.c,-C.so.rel)}return}
 if(m.wk==="ruNpc"){const v=RV(m.pl.v);if(!v||!v.alive)return;statSet(v,"danh",(v.danh||0)+m.pl.dir*m.pl.n);try{if(typeof newsAdd==="function")newsAdd(v,"rumor",`Kinh thành đồn ${m.pl.dir>0?"khen":"chê"} ${v.name}.`)}catch(e){}}};
/* ---------- the sender's acts (shared by both sides) ---------- */
const U=()=>S.kcco&&S.kcco.last||{};
const usedNow=k=>U()[k]===S.turn;
function giftable(){return (S.inv||[]).map((e,i)=>[e,i]).filter(([e])=>e&&e.k&&IT[e.k]&&!itm(e.k).evi&&e.k!=="thunha"&&!e.t)}
function npcTargets(){const fc=fClan(),mc=myClan();const fp=fPid(),hate=v=>v.rl&&v.rl[fp]||0;/* OUTSIDE_PLAN §13 "attacking her enemy's clan": the consort who likes the friend least first (her row toward the friend, jcoopworld rl[pid]), then rank */
 return liveRivals(true).filter(v=>!v.coop&&v.alive&&!v.out).map(v=>[v,typeof tdHouse==="function"?tdHouse(v):null]).filter(([v,c])=>c&&c!==fc&&c!==mc).sort((a,b)=>hate(a[0])-hate(b[0])||b[0].rank-a[0].rank)}
function knownConsort(){const L=liveRivals(true).filter(v=>!v.coop&&v.alive&&!v.out);if(!L.length)return null;
 if(mySide()==="h"&&S.kc&&S.kc.intel){const k=L.filter(v=>S.kc.intel.includes(v.id));if(k.length)return pick(k)}
 try{const k=L.filter(v=>k61St(v)>=2);if(k.length)return pick(k)}catch(e){}return pick(L)}
function soOdds(){const C=K().so;if(mySide()==="h"){const c=typeof kcR==="function"?kcR("cha"):null;const pow=typeof kcPow==="function"?kcPow():C.mid;return oddsCl(C.o+Math.round(pow*C.powK)+(c?Math.round((c.af-C.mid)*C.afK):0))}
 const c=myClan();return oddsCl(C.o+Math.round((c&&typeof tdPow==="function"?tdPow(c):C.mid)*C.powK))}
function soLock(){if(mySide()==="h"){if(!(typeof kcR==="function"&&kcR("cha")))return"cha không còn";if(S.kc&&S.kc.tdFall)return"nhà đã sa cơ"}if(!myClan())return"nhà ngươi không có người trong triều";return""}
/* do: one act — kind, the choice inside it; returns the result line */
function kccoDo(kind,a){const C=K();a=a||{};
 if(kind==="letter"){const v=knownConsort();send("letter",{v:v?v.id:null});return`Thư đã gửi cho ${fName()}.`}
 if(kind==="gift"){const L=S.inv||[];const e=L[a.ix];if(!e||!IT[e.k])return"";L.splice(a.ix,1);
  try{if(typeof ilS==="function"){const I=ilS();if(typeof ilUid==="function")ilUid(e);ilLog(e,"me","coop:"+fPid(),"gửi hảo hữu");if(I.at&&e.iu)delete I.at[e.iu]}}catch(x){}
  send("gift",{e:J(e)},{due:(S.turn||0)+C.gift.wait});return`${itm(e.k).n} gói cẩn thận, ngày thăm nuôi tới sẽ đến tay ${fName()}.`}
 if(kind==="so"){if(a.dir==="up"){send("so",{dir:"up"});return`Sớ tiến cử nhà ${fName()} đã viết xong, chờ nàng nhận lời.`}
  const t=npcTargets()[0];if(!t)return"";const m=send("so",{dir:"dn",v:t[0].id,c:t[1],pow:C.so.pow});route("a","world",Object.assign({},m,{wk:"soDn"}));return`Sớ hặc nhà ${t[1]} đã dâng lên.`}
 if(kind==="rumour"){const n=C.rumour.n;if(a.v!=null){const m=send("rumour",{v:a.v,dir:a.dir,n},{noCard:1});route("a","world",Object.assign({},m,{wk:"ruNpc"}));const v=RV(a.v);return`Lời ${a.dir>0?"khen":"chê"} ${v?v.name:""} lan ra.`}
  send("rumour",{dir:a.dir,n});return`Lời ${a.dir>0?"khen":"chê"} ${fName()} lan ra.`}
 return""}
window.kccoDo=kccoDo;
/* the act list both sides show (home: kc cards in «Thư từ»; palace: Tư trang › «Hảo hữu ở nhà»): [key, name, text, khắc, cost, odds, win, lose, lock] */
function kccoActs(){const C=K(),f=fName(),out=[],so=soOdds(),sl=soLock(),ru=oddsCl(C.rumour.o),le=oddsCl(C.letter.o);
 out.push({k:"letter",n:`Viết thư cho ${f}`,t:mySide()==="h"?"Nhờ người đưa thư vào cung.":"Nhờ thái giám ra cung đưa thư.",kh:C.letter.kh,c:{suc:-C.letter.suc},o:le,x:`biết thêm một phi tần, giữ thư · tình hảo hữu ${balSg(C.letter.bond)}`,l:`thư thất lạc, ${mySide()==="h"?"Lời đồn "+balSg(C.letter.lost):"Danh "+balSg(-C.letter.lost)}`,lock:usedNow("letter")?"tháng này đã gửi":""});
 out.push({k:"gift",n:`Gửi quà cho ${f}`,t:"Chọn một món trong rương; ngày thăm nuôi tới sẽ đến tay nàng.",kh:C.gift.kh,c:{},o:100,x:"món đồ sang tay nàng, nàng nhận hay trả lại tùy ý",lock:usedNow("gift")?"tháng này đã gửi":!giftable().length?"rương không có món nào gửi được":""});
 out.push({k:"soUp",n:`Nhờ cha dâng sớ tiến cử nhà ${f}`,t:"Sớ dâng lên nếu nàng nhận lời.",kh:C.so.kh,c:{suc:-C.so.suc},o:so,x:`nhà nàng thế lực ${balSg(C.so.pow)}, nàng ${mySide()==="h"?"Danh":"Lời đồn giảm"}`,l:`cha phật ý, ${mySide()==="h"?"cha thiện cảm "+balSg(-C.so.af):"Danh "+balSg(-C.so.lost)}`,lock:sl||(usedNow("so")?"tháng này đã dâng":"")||(!fClan()?"nhà nàng không có người trong triều":"")});
 const t=npcTargets()[0];out.push({k:"soDn",n:t?`Nhờ cha dâng sớ hặc nhà ${t[1]}`:"Nhờ cha dâng sớ hặc một nhà",t:t?`Nhà của ${t[0].name}.`:"",kh:C.so.kh,c:{suc:-C.so.suc},o:so,x:t?`nhà ${t[1]} thế lực ${balSg(-C.so.pow)}, hai nhà thêm hiềm khích`:"",l:`cha phật ý, ${mySide()==="h"?"cha thiện cảm "+balSg(-C.so.af):"Danh "+balSg(-C.so.lost)}`,lock:sl||(usedNow("so")?"tháng này đã dâng":"")||(!t?"không có nhà nào để hặc":"")});
 for(const [r,c,nm] of [["bac",{bac:-C.rumour.bac},"Thuê người tung tin"],["suc",{suc:-C.rumour.suc},"Tự kể chuyện ở chốn đông người"]])
  out.push({k:"ru_"+r,n:nm,t:mySide()==="h"?"Lời ra tiếng vào ở trà lâu, phố chợ; chọn khen hay chê ai.":"Lời ra tiếng vào giữa các cung; chọn khen hay chê ai.",kh:C.rumour.kh,c,o:ru,x:`người được nói tới ${mySide()==="h"?"Danh":"Danh / Lời đồn"} ±${C.rumour.n}`,l:`lộ ra là ngươi, Danh ${balSg(-C.rumour.lost)}`,lock:usedNow("rumour")?"tháng này đã tung tin":""});
 return out}
window.kccoActs=kccoActs;
/* failL: the stat part of a failure as an effect (home cards: runOpt applies a.l and the card's «Bại» column prints it); failLf: the home part as kcCard lf (Lời đồn under the fog rule, the father's liking); failOf(k, noStat) runs both when not a card, then the rest */
function failL(k){const C=K();if(k==="letter")return mySide()==="h"?{}:{danh:-C.letter.lost};if(/^ru_/.test(k))return{danh:-C.rumour.lost};if((k==="soUp"||k==="soDn")&&mySide()!=="h")return{danh:-C.so.lost};return{}}
function failLf(k){const C=K();if(mySide()!=="h")return[];if(k==="letter")return[["ld",C.letter.lost]];if(k==="soUp"||k==="soDn")return[["af",kcR("cha"),-C.so.af]];return[]}
function failOf(k,noStat){const C=K();if(!noStat){const l=failL(k);if(l.danh)statSet(S,"danh",(S.danh||0)+l.danh);kcLfRun(failLf(k).filter(Boolean))}
 if(k==="letter"){kccoS().last.letter=S.turn;return"Thư thất lạc giữa đường."}
 if(k==="soUp"||k==="soDn"){kccoS().last.so=S.turn;return"Cha không chịu dâng sớ."}
 if(/^ru_/.test(k)){kccoS().last.rumour=S.turn;return"Người ta lần ra lời đồn từ chỗ ngươi."}return""}
/* the choices inside gift / rumour (kit dialog) */
PEND.kccoPick=p=>{if(!kccoOn())return null;const C=K();
 if(p.k==="gift"){const L=giftable().reverse().slice(0,C.gift.pickMax)/* newest first */;if(!L.length)return null;
  return{who:pMe(),t:`<p>Chọn món gửi cho ${esc(fName())}.</p>`,o:L.map(([e,i])=>({n:itm(e.k).n,fx:{},x:"rời rương ngươi, ngày thăm nuôi tới đến tay nàng",go:()=>{const r=kccoDo("gift",{ix:i});if(r)log(r);try{render()}catch(x){}}})).concat([{n:"Thôi, không gửi",fx:{},x:"an toàn · giữ đồ lại",go:()=>{}}])}}
 if(p.k==="ru"){const f=fName(),t=npcTargets().slice(0,2);const o=[{n:`Khen ${f}`,v:null,dir:1},{n:`Chê ${f}`,v:null,dir:-1}].concat(t.map(([v])=>({n:`Chê ${v.name}`,v:v.id,dir:-1})));
  return{who:pMe(),t:"<p>Ngươi muốn người ta nói gì?</p>",o:o.map(x=>({n:x.n,fx:{},x:`${x.v==null?f:"nàng"} ${x.dir>0?"được tiếng tốt":"mang tiếng xấu"} (±${C.rumour.n})`,go:()=>{const r=kccoDo("rumour",{v:x.v,dir:x.dir});if(r)log(r);try{render()}catch(e){}}}))}}
 return null};
function kccoStart(a){/* after the price and the roll: what the act does */
 if(a.k==="letter")return kccoDo("letter");if(a.k==="soUp")return kccoDo("so",{dir:"up"});if(a.k==="soDn")return kccoDo("so",{dir:"dn"});
 if(a.k==="gift"){kccoS().last.gift=S.turn;pushDil(mkP("kccoPick",{k:"gift"}),"Gửi quà");return""}
 if(/^ru_/.test(a.k)){kccoS().last.rumour=S.turn;pushDil(mkP("kccoPick",{k:"ru"}),"Tung tin");return""}return""}
/* ---------- home side: kc cards in «Thư từ» (j2 act → runOpt: price, roll, go / fail) ---------- */
function kccoCards(have){const X=[];if(!kccoOn()||mySide()!=="h")return X;for(const a of kccoActs()){if(a.lock||(have&&have.has(a.k)))continue;
  X.push(kcCard({g:"mail",n:a.n,t:a.t,k:a.kh,c:a.c,o:a.o>=100?100:od(a.o),w:{},l:failL(a.k),lf:failLf(a.k),x:a.x,kcco:a.k,go:()=>{const r=kccoStart(a);if(r)log(r)},fail:()=>{const r=failOf(a.k,true);if(r)log(r)}}))}return X}
(function(){if(typeof kcCards!=="function")return;const k0=kcCards;kcCards=function(){const X=k0.apply(this,arguments);try{X.push(...kccoCards())}catch(e){console.error("kcco cards",e)}return X}})();
/* the room became ready (or the friend changed side) after this week's hand was dealt: the co-op cards join the END of the hand (the
   indices of the cards already dealt never move); played ones (done) stay as they are */
(function(){if(typeof render!=="function")return;const r0=render;render=function(){try{if(S&&!S.dead&&Array.isArray(deck)&&typeof isKc==="function"&&isKc()&&!(window.COOPW&&COOPW.ctx)){const have=new Set(deck.filter(a=>a&&a.kcco).map(a=>a.kcco));const add=kccoCards(have);if(add.length)deck.push(...add)}}catch(e){console.error("kcco top-up",e)}return r0.apply(this,arguments)}})();
/* ---------- palace side: Tư trang › «Hảo hữu ở nhà» (kit sub-tab, jinv KINV_XTRA; same pbtn act buttons as «Thư nhà») ---------- */
function kccoPalHTML(){if(!kccoOn()||mySide()!=="p")return"";const P=fBlob();
 const acts=`<div class="rbtn">`+kccoActs().map(a=>pbtn(`data-kcco="${a.k}"`,a.n,`${a.o>=100?"an toàn":word(a.o)} · tốn: ${a.kh} khắc${a.c.suc?`, Sức ${a.c.suc}`:""}${a.c.bac?`, Bạc ${a.c.bac}`:""} · thành: ${a.x}${a.l?` · hỏng: ${a.l}`:""}`,a.lock||(!can(a.kh)?"hết khắc":"")||(a.c.bac&&S.bac<-a.c.bac?"không đủ bạc":"")||(a.c.suc&&S.suc<-a.c.suc?"không đủ Sức":""))).join("")+`</div>`;
 const L=kccoS().log;const rows=L.length?L.map(x=>[`Tháng ${x.m}, năm thứ ${x.y}`,x.t,"t"]):[["Chưa có tin","Hai người chưa gửi gì cho nhau","n"]];
 return kitRows([["Hảo hữu",`${fName()} · đang ở nhà chờ tuyển tú · tình hảo hữu ${(S.rl||{})[fPid()]||0}`,"t"]])+acts+`<h4 class="kpst">Thư từ qua lại</h4>`+kitRows(rows)}
window.kccoPalHTML=kccoPalHTML;
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kcco]");if(!b||!kccoOn()||mySide()!=="p")return;e.stopPropagation();e.preventDefault();if(b.disabled||S.dead||Q.length)return;
 const a=kccoActs().find(x=>x.k===b.dataset.kcco);if(!a||a.lock||!can(a.kh)||!canPay(a))return;const bs=rsnap();spend(a.kh);apply(a.c);
 const ok=a.o>=100||roll(a.o);const r=ok?kccoStart(a):failOf(a.k);log(`${a.n}${a.o<100?(ok?': <span class="g">thành</span>.':': <span class="r">hỏng</span>.'):"."}${r?" "+r:""}`);
 try{resultShow(a.n,bs,true)}catch(x){}try{showModal()}catch(x){}render()},true);
(function(){if(typeof KINV_XTRA!=="object")return;KINV_XTRA.push({k:"hh",label:"Hảo hữu ở nhà",on:()=>kccoOn()&&mySide()==="p",html:kccoPalHTML})})();
/* ---------- join: the friend at home enters the palace (jkc kcEnter / jkc2 → kcHook("enter")) ---------- */
(function(){if(typeof kcHook!=="function")return;const h0=kcHook;kcHook=function(kind,pl){const r=h0.apply(this,arguments);
 try{const c=CW();if(kind==="enter"&&c&&c.on&&S&&!S.dead){const P=fBlob();if(P&&sideOf(P)==="p")send("join",{rank:S.rank})}}catch(e){console.error("kcco join",e)}return r};window.kcHook=kcHook})();
window.KCCO={H,RQ,route,send:(...a)=>send(...a),acts:kccoActs};
})();
