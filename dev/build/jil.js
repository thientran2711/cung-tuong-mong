/* ================= jil.js — ONE ITEM LEDGER + ITEM CONSERVATION (owner 16/11 13:30Z (3), 13:40Z ONE LEDGER, 13:42Z "cuốn sổ" = core rule) =================
   Law: no item in the game ever vanishes. Every piece is always in exactly one place:
     a person's chest (p.inv), worn (p.wd.tram / p.wd.y, p.vl), at the pawnshop (p.wdPawn[].e), or in the off-person BOX S.il.box:
       "mkt" market outside the palace (sold / pawn forfeited)      → comes back: her Nội vụ phủ tray (BAL.il.shopP) or a ransom visit by the ceiling
       "nvp" Nội vụ phủ store (confiscated, mending, a dead person's effects, returned stock) → atonement / mended / resold
       "cct" Cung Chính ti (tang vật: poisoned, planted, forbidden things seized as evidence) → kept
       "emp" / "th" held by Hoàng thượng / Thái hậu (gifts offered to them)                 → kept
       "srv" in a servant's hands (pilfered from the monthly goods)                          → back when the servant is caught
     Lost / stolen pieces stay in SOMEONE's chest (jlost cases; never "not found anywhere").
   ONE rule for everyone (player and NPCs): ilGone(p,e,how) routes any piece that leaves p's hands to where it really goes; ilGuard wraps the
   game functions that remove pieces so each removal is routed (LUẬT SỬA CẢ NHÓM: the whole family, table in dev/handover/reports/item-ledger.md).
   The ledger S.il.log records every move [week, id, item, from, to, how]; S.il.at = last census (id → item, holder) so a piece that disappears
   without a route is caught by the weekly census and put in the Nội vụ phủ store ("net": counted by ilAudit, must stay 0 in the bot audit).
   Consumables used up (food, medicine, poison, incense, tea, charcoal, ice, cloth sewn, letters/evidence/story pieces) are not "lost": ilDur.
   Numbers: BAL.il (jbal2.js). Kit only: kitShop tiles, kitItemTag, kitItem/kitChip/kitFacts rows, pbtn act cards, PEND dialogs. */
/* S.il.at (the last census) is NOT saved (non-enumerable: ser() and the co-op canon skip it); a loaded save takes a fresh census — save size bounded (reviewer r1) */
function ilS(){if(!S.il||typeof S.il!=="object")S.il={};const I=S.il;I.seq=I.seq||0;I.log=I.log||[];I.box=I.box||[];I.net=I.net||0;
 const d=Object.getOwnPropertyDescriptor(I,"at");if(!d||d.enumerable)Object.defineProperty(I,"at",{value:(d&&d.value)||null,writable:true,enumerable:false,configurable:true});return I}
function ilKey(p){return p===S?"me":(p&&p.id)||""}
function ilP(k){if(k==="me")return S;try{return typeof RV==="function"?RV(k):null}catch(e){return null}}
function ilAlive(p){return !!p&&(p===S?!S.dead:p.alive!==false)}
/* co-op (jcoopworld): the friend's proxy entry (coop:true) is HER game's chest, kept by her own ledger; NPC pieces are world state:
   each side routes only the removals its own acts make (world functions run on the host only), and no side "nets" an NPC piece
   (the other side may have moved it) — reviewer r1.
   item-ledger-solo (owner 17/11 02:05Z: no co-op patching): pieces travel between the two games ONLY on the live co-op path (jcoopworld
   res.items → her "Quà tặng" dialog, res.fam ops). The ledger does not carry pieces itself: it only RECORDS what that path delivers —
   a piece of mine that lands in her entry is logged "sang hảo hữu" (never also put in my box: one gift = one item), a piece the live
   path takes out of my chest (res.fam "rm") is logged "hảo hữu lấy" and not netted. Co-op transport of jil parked at 7aba5de9. */
function ilCoop(){try{return !!(window.COOPW&&COOPW.on)}catch(e){return false}}
function ilGuest(){return ilCoop()&&COOPW.seat!=="a"}
function ilPeople(){const L=[S];try{for(const v of rivals||[])if(v&&!v.coop&&L.indexOf(v)<0)L.push(v)}catch(e){}return L}
/* every container slot of a person: chest, worn hairpin / robe (not the base robe), veil, pawned */
function ilSlots(p){const o=[];if(!p)return o;for(const e of p.inv||[])if(e&&typeof e==="object"&&e.k)o.push(e);
 const w=p.wd;if(w&&typeof w==="object")for(const sl of ["tram","y"]){const e=w[sl];if(e&&typeof e==="object"&&e.k&&e.from!=="base")o.push(e)}
 if(p.vl&&typeof p.vl==="object"&&p.vl.k)o.push(p.vl);for(const P of p.wdPawn||[])if(P&&P.e)o.push(P.e);return o}
function ilHas(p,e){return ilSlots(p).indexOf(e)>=0}
function ilSame(a,e){return a===e||(!!e.iu&&a.iu===e.iu)}
/* open lost cases (jlost) whose piece is not in any chest yet: the case holds it */
/* only a case still "lost" (not yet found) holds the piece itself; once found/held the piece is the copy in a chest, and if that copy leaves,
   the guard must route it (a found/held case left without its copy is closed by jlost; it must never hide the removal — reviewer r1) */
function ilCases(){try{return (S.lost||[]).filter(c=>c&&c.st==="lost"&&c.e&&!(typeof loEntry==="function"&&loEntry(c)))}catch(e){return[]}}
function ilWhere(e){if(!e)return null;for(const p of ilPeople())if(ilSlots(p).some(a=>ilSame(a,e)))return ilKey(p);const x=ilS().box.find(b=>ilSame(b.e,e));if(x)return x.at;
 const c=ilCases().find(c=>ilSame(c.e,e));if(c)return "lo"+c.id;
 try{for(const m of (typeof Q!=="undefined"?Q:[])){const d=m&&m.pp&&m.pp.e;if(d&&typeof d==="object"&&ilSame(d,e))return "dlg"}}catch(z){}return null}
/* identity (not id) location: is THIS object somewhere? (a stale twin with the same id — an old lost case, a gift copy — must never hide a real removal; reviewer r1) */
function ilAt(e){if(!e)return false;for(const p of ilPeople())if(ilSlots(p).indexOf(e)>=0)return true;if(ilS().box.some(x=>x.e===e))return true;
 if(ilCases().some(c=>c.e===e))return true;try{for(const m of (typeof Q!=="undefined"?Q:[]))if(m&&m.pp&&m.pp.e===e)return true}catch(z){}return false}
/* how many objects carry each id in ids, everywhere a piece can be (chests/worn/pawn, box, open lost cases, gifts on the way) */
function ilCount(ids){const C=new Map();if(!ids.size)return C;const f=e=>{if(e&&e.iu&&ids.has(e.iu))C.set(e.iu,(C.get(e.iu)||0)+1)};
 for(const p of ilPeople())ilSlots(p).forEach(f);for(const x of ilS().box)f(x.e);for(const c of ilCases())f(c.e);
 try{for(const m of (typeof Q!=="undefined"?Q:[]))if(m&&m.pp&&m.pp.e&&typeof m.pp.e==="object")f(m.pp.e)}catch(z){}return C}
function ilIt(e){try{const w=typeof wdItem==="function"?wdItem(e):null;if(w)return w}catch(x){}return (typeof IT==="object"&&e&&IT[e.k])||null}
function ilNm(e){if(!e)return"món đồ";if(e.wk&&e.wk.n)return e.wk.n;const it=ilIt(e);return it&&it.n||"món đồ"}
/* durable = must never vanish. Used-up kinds are not durable (eaten, drunk, burnt as incense, sewn, read, handed in for a story). */
const IL_USED_KD=["Thuốc","Thuốc bổ","Độc dược","Hương liệu","Trà","Than sưởi","Băng","Điểm tâm","Rượu","Thư từ","Vật chứng"];
function ilDur(e){if(!e||!e.k||e.from==="base")return false;if(e.wk)return e.wk.p==null;
 let w=null;try{w=typeof wdItem==="function"?wdItem(e):null}catch(x){}if(w)return true;const it=(typeof IT==="object"&&IT[e.k])||null;if(!it)return false;
 if(it.sl==="scent"||it.k==="tp")return true;if(it.use||it.anti||it.ant||it.fert||it.dr||it.il||it.evi||it.story)return false;if(IL_USED_KD.includes(it.kd))return false;
 if(["kimbac","giaycoi"].includes(e.k))return false;return true}
function ilVal(e){try{if(e.wk&&typeof wkSellVal==="function")return wkSellVal(e.wk);if(typeof wdPrice==="function")return wdPrice(e)|0}catch(x){}return ((IT[e.k]||{}).pr)|0}
/* a new id given between two censuses (by a guard) is entered in the census map at once, so a later unrouted removal is still caught (reviewer r1) */
function ilUid(e,p){const I=ilS();if(!e.iu){e.iu=(ilGuest()?1e7:0)+(++I.seq);if(I.at&&p)I.at[e.iu]=[e.k,ilKey(p),e.wk?1:0]}return e.iu}
function ilLog(e,f,t,how){const I=ilS();I.log.push([typeof wk==="function"?wk():0,ilUid(e),e.k,f||"",t||"",how||""]);const cap=(BAL.il&&BAL.il.logCap)||600;if(I.log.length>cap)I.log.splice(0,I.log.length-cap)}
function ilRng(a){return a[0]+R(a[1]-a[0]+1)}
/* ---- the ONE rule: where a piece goes when it leaves p's hands ---- */
const IL_HOW={sell:"bán",pawn:"cầm cố quá hạn",conf:"bị tịch thu",evid:"tang vật",fix:"đem sửa",burn:"cháy, đem sửa",pil:"kẻ hầu bớt xén",lost:"thất lạc",maid:"tặng cung nữ",emp:"dâng Hoàng thượng",th:"dâng Thái hậu",dead:"di vật",kho:"trả Nội vụ phủ",net:"Nội vụ phủ nhặt được"};
function ilGone(p,e,how,o){if(!e||typeof e!=="object"||!e.k)return null;if(ilAt(e))return null;{const f=ilToFriend(e);if(f){ilSent(e,f);return null}}o=o||{};const I=ilS();const B=BAL.il;const own=o.own||ilKey(p);
 if(how!=="sell"&&how!=="pawn"&&!ilDur(e))return null;if((how==="sell"||how==="pawn")&&e.wk&&e.wk.p!=null)return null;
 if(how==="lost"&&p&&ilAlive(p)&&typeof loLoseE==="function"){const c=loLoseE(p,e,o.cause);if(c){ilUid(e);ilLog(e,own,"lo"+c.id,"thất lạc");return c}}
 for(const f of ["w","h","lo","gh","by"])if(how!=="lost")delete e[f];
 const at=how==="sell"||how==="pawn"?"mkt":how==="evid"?"cct":how==="emp"?"emp":how==="th"?"th":how==="pil"||how==="maid"?"srv":"nvp";
 const x={e,at,why:how,own,w:wk(),by:o.by||""};
 if(at==="mkt"){x.ret=wk()+ilRng(B.retW);x.pr=Math.max(1,Math.round(ilVal(e)*B.ransomPct/100))}
 if(how==="conf")x.rel=wk()+B.confW;if(how==="fix"||how==="burn")x.rel=wk()+ilRng(B.fixW);
 try{if(typeof dhIsItem==="function"&&dhIsItem(e))x.dh=1}catch(z){}/* sắc phong book / seal: jdh2 owns its road in the store */
 I.box.push(x);ilUid(e);ilLog(e,own,at,how);return x}
/* take a piece out of the box into a person's chest */
function ilTake(x,p,how){const I=ilS();const i=I.box.indexOf(x);if(i<0||!p)return false;I.box.splice(i,1);p.inv=p.inv||[];p.inv.push(x.e);ilLog(x.e,x.at,ilKey(p),how||"về");return true}
/* guard: wrap a game function; whatever durable piece leaves the listed people during the call and is nowhere afterwards is routed by ilGone */
function ilGuard(name,how,who){const f=window[name];if(typeof f!=="function"||f.__il)return;
 const g=function(){let P=[];try{P=(who?who.apply(null,arguments):[arguments[0]]).filter(x=>x&&typeof x==="object")}catch(e){}
  const before=P.map(p=>{const L=ilSlots(p);L.forEach(e=>ilUid(e,p));return [p,L]});const ids=new Set();for(const [,L] of before)for(const e of L)ids.add(e.iu);
  let C0=null;try{C0=ilCount(ids)}catch(e){}const A=arguments;const r=f.apply(this,A);
  /* a piece that left p: moved as a copy (a new object now carries its id: gift, plant, borrow) → fine; otherwise one object with that id is gone → route it */
  try{let C1=null;for(const [p,L] of before)for(const e of L){if(ilHas(p,e)||ilAt(e))continue;if(!C1)C1=ilCount(ids);if(C0&&(C1.get(e.iu)||0)>=(C0.get(e.iu)||0))continue;
   ilGone(p,e,typeof how==="function"?how(e,...A):how);C1=null}}catch(e){console.error("ilGuard "+name,e)}return r};
 g.__il=1;window[name]=g}
/* ---- census: ids for every piece, a dead person's effects to the store, anything vanished without a route caught ("net") ---- */
function ilStaleCases(){const held=new Map();for(const p of ilPeople())for(const a of ilSlots(p))if(a.iu)held.set(a.iu,[p,a]);
 for(const c of ilCases()){const h=c.e&&c.e.iu&&held.get(c.e.iu);if(!h||h[1]===c.e)continue;c.st="done";c.end=wk();c.how="tra";ilLog(c.e,"lo"+c.id,ilKey(h[0]),"đã ở rương")}}
const IL_DH=["sacphong","ngocan"];
const IL_BOXES=["mkt","nvp","cct","emp","th","srv","dlg"];
function ilCensus(){if(!S)return;const I=ilS();const now={};const seen=new Set();try{ilStaleCases()}catch(z){}
 /* a found/held lost case and the copy in the holder's chest are ONE piece: same id (old saves had none; lostReturn hands back a copy of c.e) */
 try{for(const c of (S.lost||[]))if(c&&c.st!=="done"&&c.e&&typeof loEntry==="function"){const x=loEntry(c);if(x&&x.e){ilUid(x.e);c.e.iu=x.e.iu}}}catch(z){}
 for(const p of ilPeople()){const k=ilKey(p);const dead=p!==S&&(p.alive===false)&&!ilGuest();
  for(const e of ilSlots(p)){if(e.iu&&seen.has(e.iu)){e.iu=0}const fresh=!e.iu;ilUid(e);seen.add(e.iu);
   if(fresh&&I.at)ilLog(e,e.from||e.giver||"",k,"nhận");
   if(dead&&ilDur(e)){const o=e.gh&&e.gh!==k?ilP(e.gh):null;ilOut(p,e);if(o&&ilAlive(o)&&typeof lostReturn==="function"&&e.lo){lostReturn(e,"nop")}else ilGone(p,e,"dead",{own:k});continue}
   now[e.iu]=[e.k,k,e.wk?1:0]}}
 for(const x of I.box){ilUid(x.e);seen.add(x.e.iu);now[x.e.iu]=[x.e.k,x.at,0]}
 for(const c of ilCases()){ilUid(c.e);seen.add(c.e.iu);now[c.e.iu]=[c.e.k,"lo"+c.id,0]}
 /* a gift on its way (a dialog still waiting for her answer) */
 try{for(const m of (typeof Q!=="undefined"?Q:[])){const e=m&&m.pp&&m.pp.e;if(e&&typeof e==="object"&&e.k&&e.iu){seen.add(e.iu);now[e.iu]=[e.k,"dlg",0]}}}catch(z){}
 if(I.at)for(const id in I.at){if(seen.has(+id))continue;const [k,h,wkf]=I.at[id];const e0={k,iu:+id};if(wkf||!ilDur(e0))continue;if(IL_DH.includes(k))continue;/* jdh2 census keeps one book + one seal per hiệu (drops copies, recreates a missing one) */if(ilCoop()&&h!=="me"&&!IL_BOXES.includes(h)&&!/^lo/.test(h))continue;
  /* vanished without a route: the piece is still in the game (Nội vụ phủ found it); ilAudit counts these (bot audit target 0) */
  I.net++;I.box.push({e:e0,at:"nvp",why:"net",own:h,w:wk()});ilLog(e0,h,"nvp","net");now[id]=[k,"nvp",0]}
 I.at=now}
function ilOut(p,e){const i=(p.inv||[]).indexOf(e);if(i>=0){p.inv.splice(i,1);return}const w=p.wd;if(w)for(const sl of ["tram","y"])if(w[sl]===e){w[sl]=null;return}if(p.vl===e){p.vl=null;return}
 if(p.wdPawn){const j=p.wdPawn.findIndex(P=>P&&P.e===e);if(j>=0)p.wdPawn.splice(j,1)}}
/* ---- weekly: the box moves on (returns, ransom, atonement, mending, resale) ---- */
function ilWeek(){if(!S||S.dead)return;const I=ilS(),B=BAL.il;let ask=false;
 for(const x of I.box.slice()){const o=ilP(x.own);const live=o&&ilAlive(o)&&!(o!==S&&o.out);
  if(x.at==="mkt"){
   if(live&&o===S){if(!x.shop&&roll(B.shopP)){x.shop=1;log(`Thái giám Nội vụ phủ báo: khay đồ mua ngoài cung có ${ilNm(x.e)}, giống đồ cũ của ngươi.`)}
    /* the ceiling holds (reviewer r1): due → queued even when other dialogs wait (one ransom visit a week) */if(!ask&&wk()>=x.ret){ask=true;x.ret=wk()+ilRng(B.againW);pushDil(mkP("ilback",{u:x.e.iu}),"Đồ cũ trở về")}continue}
   if(live&&o!==S&&(o.bac||0)>=x.pr&&roll(B.npcBackP)){ap(o,{bac:-x.pr});ilTake(x,o,"chuộc về");continue}
   if(roll(B.npcBuyP)){const L=liveRivals(true).filter(v=>v!==o&&(v.bac||0)>=x.pr+20);if(L.length){const v=pick(L);ap(v,{bac:-x.pr});ilTake(x,v,"mua");continue}}
   if(!live&&!x.shop&&roll(B.shopP))x.shop=1;continue}
  /* the box keeps moving so it stays small (save size bounded; reviewer r1): a servant sells what she pocketed (→ market: it comes back to the owner like any sold piece);
     tang vật is released to the Nội vụ phủ store after cctW weeks; Hoàng thượng / Thái hậu hand pieces beyond heldCap down to the Nội vụ phủ store */
  if(x.at==="srv"&&x.why==="pil"&&wk()-x.w>=B.srvW){x.at="mkt";x.why="sell";x.ret=wk()+ilRng(B.retW);x.pr=Math.max(1,Math.round(ilVal(x.e)*B.ransomPct/100));ilLog(x.e,"srv","mkt","kẻ hầu bán ra ngoài");continue}
  if(x.at==="cct"&&wk()-x.w>=B.cctW){x.at="nvp";x.why="kho";x.own="";x.w=wk();ilLog(x.e,"cct","nvp","tang vật trả kho");continue}
  if(x.at!=="nvp")continue;
  if(x.dh)continue;/* jdh2 (sắc phong book / seal): its own atonement / census road; never resold */
  if((x.why==="fix"||x.why==="burn")&&wk()>=x.rel){if(live){ilTake(x,o,"sửa xong");if(o===S)Q.push({t:"Đồ sửa xong",who:pMe(),h:`${ilTag(x.e)}<p>Nội vụ phủ sửa xong <b>${ilNm(x.e)}</b>, sai người đem trả về rương ngươi.</p>`,btn:"Đã hiểu"})}else{x.why="dead";x.own=""}continue}
  if(x.why==="conf"&&wk()>=x.rel){if(live&&o===S){if(!ask){ask=true;x.rel=wk()+ilRng(B.againW);pushDil(mkP("ilconf",{u:x.e.iu}),"Đồ bị tịch thu")}}
   else if(live&&roll(B.npcConfP))ilTake(x,o,"xin lại");else if(!live){x.why="dead";x.own=""}continue}
  if((x.why==="dead"||x.why==="kho"||x.why==="net")&&!live&&roll(B.resaleP)){x.at="mkt";x.why="sell";x.own="";x.pr=Math.max(1,Math.round(ilVal(x.e)*B.ransomPct/100));x.ret=1e9;ilLog(x.e,"nvp","mkt","bán lại")}}
 /* ownerless pieces outside (a dead person's effects resold, released stock) beyond mktCap: Nội vụ phủ buys them back and hands them out
    as allotment to a consort (they stay in the game, the box stays small) */
 {const M=I.box.filter(x=>x.at==="mkt"&&!x.own);if(M.length>B.mktCap){const L=liveRivals(true).filter(v=>v&&!v.out&&!v.coop&&ilAlive(v));if(L.length)for(const x of M.slice(0,M.length-B.mktCap))ilTake(x,pick(L),"Nội vụ phủ cấp phát")}}
 for(const at of ["emp","th"]){const L=I.box.filter(x=>x.at===at);for(const x of L.slice(0,Math.max(0,L.length-B.heldCap))){x.at="nvp";x.why="kho";x.own="";x.w=wk();ilLog(x.e,at,"nvp",at==="emp"?"Hoàng thượng ban xuống kho":"Thái hậu ban xuống kho")}}
 ilCensus()}
function ilFind(u){return ilS().box.find(x=>x.e&&x.e.iu===u)||null}
function ilTag(e){try{if(typeof kitItemTag==="function"&&typeof kitItemInfo==="function")return kitItemTag(kitItemInfo(e)).replace('class="kiev"','class="kiev kiev-own kiev-txt"')}catch(x){}return""}
/* ransom visit (owner: "có người mang đến cho mình chuộc", ceiling time; cannot pay → it comes again later) */
PEND.ilback=pp=>{const x=ilFind(pp.u);if(!x||x.at!=="mkt"||x.own!=="me")return null;const nm=ilNm(x.e),pr=x.pr;const ok=S.bac>=pr;
 const O=[];if(ok)O.push({n:"Chuộc về",fx:{bac:-pr},j67:`tốn: Bạc -${pr} · thành: ${nm} về lại rương`,go:()=>{ilTake(x,S,"chuộc về");log(`Ngươi chuộc lại ${nm}: Bạc -${pr}.`)}});
 O.push({n:ok?"Thôi, không chuộc":"Chưa đủ bạc, hẹn lần sau",fx:{},j67:"tốn: không tốn gì · kèm: món đồ còn ở ngoài cung, ít lâu sau có thể lại có người mang đến",go:()=>{log(`Ngươi chưa chuộc ${nm}; món đồ còn ở ngoài cung.`)}});
 return{who:pEunCourt("ped"),t:`<p>Thái giám Nội vụ phủ dò được <b>${nm}</b>, đồ cũ của ngươi, đang ở ngoài cung. Người giữ chịu đem vào nếu được chuộc Bạc ${pr}.</p>${ok?"":`<p class="past">Ngươi đang có Bạc ${S.bac}.</p>`}`,o:O}};
/* confiscated: after the minimum wait she may atone to ask for it back (owner 13:20Z (5): back only through atonement, minimum wait) */
PEND.ilconf=pp=>{const x=ilFind(pp.u);if(!x||x.at!=="nvp"||x.why!=="conf"||x.own!=="me")return null;const nm=ilNm(x.e),s=BAL.il.confSuc;
 return{who:pEunCourt("ped"),t:`<p>Đã ${BAL.il.confW} tuần từ khi <b>${nm}</b> bị tịch thu. Thái giám Nội vụ phủ ngầm báo: chép kinh sám hối dâng lên, có thể xin lại.</p>`,o:[
  {n:"Chép kinh sám hối, xin lại",fx:{suc:-s},j67:`tốn: Sức -${s} · thành: ${nm} về lại rương`,go:()=>{ilTake(x,S,"sám hối xin lại");log(`Ngươi chép kinh sám hối, xin lại ${nm}.`)}},
  {n:"Để sau",fx:{},j67:"tốn: không tốn gì · kèm: món đồ còn ở Nội vụ phủ, ít lâu sau lại xin được",go:()=>{}}]}};
/* Nội vụ phủ tray: her sold pieces that came back appear as one more tile (kitShop, same tile as every other) */
function ilShopTiles(){const I=ilS();return I.box.filter(x=>x.at==="mkt"&&x.shop&&(x.own==="me"||!ilAlive(ilP(x.own)))).map(x=>{const e=x.e,nm=ilNm(e);
 const info=(()=>{try{return typeof kitItemInfo==="function"?kitItemInfo(e):null}catch(z){return null}})()||{};const a=typeof itemArt==="function"?itemArt(e.k):null;
 const pr=Math.max(1,Math.round(ilVal(e)));const crafted=!!e.wk;
 return{k:crafted?"il"+e.iu:e.k,crafted,src:info.src||(typeof kitItemSrc==="function"?kitItemSrc(e.k,""):""),src512:a&&a.src512||"",name:nm,sub:x.own==="me"?"Đồ cũ của ta":"Đồ cũ",
  grade:info.grade!=null?info.grade|0:(a?a.grade|0:0),lux:0,price:pr,eff:crafted?"tự tay làm":(typeof kitShopEff==="function"?kitShopEff(e.k):""),rows:crafted?"":(typeof kitItemRows==="function"&&IT[e.k]?kitItemRows(e.k):""),
  stock:1,have:()=>0,onBuy:()=>{if(S.bac<pr||ilS().box.indexOf(x)<0)return;apply({bac:-pr});ilTake(x,S,"mua lại");log(`Mua lại ${nm}. Bạc -${pr}`)}}})}
(function(){if(typeof kitShop!=="function")return;const k0=kitShop;kitShop=function(o){try{if(o&&o.key==="nvp"&&Array.isArray(o.items))o.items=o.items.concat(ilShopTiles())}catch(e){console.error("ilShop",e)}return k0.apply(this,arguments)}})();
/* Tư trang › Việc: where her pieces are now (box) — same rows as Đồ thất lạc (kitItem + kitChip + kitFacts) */
function ilMineHTML(){if(!S||S.dead)return"";const L=ilS().box.filter(x=>x.own==="me"&&x.at!=="emp"&&x.at!=="th"&&x.why!=="maid");if(!L.length)return"";
 const ST={mkt:["Ở ngoài cung","no"],nvp:["Ở Nội vụ phủ","no"],cct:["Cung Chính ti giữ làm tang vật","no"],srv:["Lọt vào tay kẻ hầu","no"]};
 let h=`<div class="kwd"><div class="kpsec"><h4 class="kpst">Đồ ở nơi khác</h4>`;
 for(const x of L){const st=ST[x.at]||["Ở nơi khác","no"];const f=[`${ilNm(x.e)} · ${IL_HOW[x.why]||""}`];
  if(x.at==="mkt")f.push(x.shop?"Đang có trong khay đồ của thái giám Nội vụ phủ":"Có thể quay lại: trong khay đồ Nội vụ phủ, hoặc có người mang đến chuộc");
  if(x.why==="conf"&&!x.dh)f.push(wk()<x.rel?`Còn ${x.rel-wk()} tuần mới xin lại được`:"Đã xin lại được: chờ Nội vụ phủ báo");
  if(x.why==="fix"||x.why==="burn")f.push(`Còn ${Math.max(0,x.rel-wk())} tuần sửa xong`);
  let pic="";try{pic=typeof loPic==="function"?loPic(x.e,"md"):""}catch(z){}
  h+=`<div class="kwdsel">${pic}<div>${kitChip(st[0],st[1])}${kitFacts(f)}</div></div>`}
 return h+`</div></div>`}
/* in the Việc pane right under "Đồ thất lạc" (jlost's section, which jinv places in Tư trang › Việc) */
(function(){if(typeof loInvHTML!=="function")return;const i0=loInvHTML;loInvHTML=function(){const h=i0.apply(this,arguments)||"";let x="";try{x=ilMineHTML()}catch(e){console.error(e)}return h+x}})();
/* ---- guards: every function that removes pieces (audit table in the report) ---- */
ilGuard("sellItem","sell");ilGuard("wkSell","sell");ilGuard("wdSell","sell");ilGuard("econSell","sell");ilGuard("wdPawnMonth","pawn");
ilGuard("vpAccuse","conf",(a,t)=>[t,a]);ilGuard("wdAccuse","conf",(a,t)=>[t,a]);
ilGuard("inspect","evid");ilGuard("search","evid");ilGuard("npcMonth","evid",()=>ilPeople());
ilGuard("tsbBurn","burn");ilGuard("wkGive",(e,a,r)=>r==="emp"?"emp":r==="th"?"th":r==="maid"?"maid":"net",(a,r)=>[a,typeof r==="object"?r:null]);
ilGuard("giveTo",(e,a,r)=>r==="emp"?"emp":r==="th"?"th":"evid",(a,r)=>[a,r]);ilGuard("itemAct","evid",()=>[S]);ilGuard("stipGoods","kho");ilGuard("stipRestore","kho");
ilGuard("eitPilfer","pil");ilGuard("rivalsMonth",e=>e.t?"evid":"conf",()=>ilPeople());ilGuard("empAct","conf",()=>ilPeople());
(function(){if(typeof eitPilBack!=="function")return;const b0=eitPilBack;eitPilBack=function(X){try{const I=ilS();const i=I.box.findIndex(x=>x.at==="srv"&&x.own==="me"&&x.e.k===X.k);if(i>=0){const x=I.box[i];I.box.splice(i,1);ilLog(x.e,"srv","me","lấy lại")}}catch(e){}return b0.apply(this,arguments)}})();
/* weekly hook (after every other weekly rule) + census at load (old saves: every piece gets its id, nothing to move) */
(function(){const e0=endTurn;endTurn=function(){const w0=S&&wk();const r=e0.apply(this,arguments);try{if(S&&!S.dead&&wk()!==w0){const q=Q.length;ilWeek();if(Q.length>q){render();showModal()}}}catch(e){console.error("ilWeek",e)}return r}})();
setTimeout(()=>{try{if(typeof S!=="undefined"&&S&&!S.dead&&(!S.il||!S.il.at))ilCensus()}catch(e){}},0);
/* a new life (start / co-op rebuild): census at once, so a piece that leaves her chest before the first week is known (co-op res log) */
(function(){if(typeof start!=="function")return;const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&!S.dead&&(!S.il||!S.il.at))ilCensus()}catch(e){console.error("ilCensus start",e)}return r}})();
/* a save loaded from the title (deser): an old save has no S.il → census at once (ids for every piece, nothing moves) — reviewer r1 */
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(S&&!S.dead&&(!S.il||!S.il.at))ilCensus()}catch(e){console.error("ilCensus load",e)}return r}})();
/* co-op rebirth (jcoopworld: the new life is put into the SAME world): her past life's pieces stay in that world —
   her chest / worn / pawned pieces become her effects in the Nội vụ phủ store ("di vật", later resold), and everything of hers
   still out (market, store, tang vật…) stays there, ownerless; ids continue (no reuse) — reviewer r1 */
function ilInherit(old){const O=(old&&old.il)||{};const I=ilS();I.seq=Math.max(I.seq||0,O.seq||0);
 for(const x of O.box||[]){if(x.own==="me")x.own="";if(x.why==="conf"||x.why==="fix"||x.why==="burn")x.why="dead";I.box.push(x)}
 for(const e of ilSlots(old))if(ilDur(e)&&!ilAt(e)){I.box.push({e,at:"nvp",why:"dead",own:"",w:wk(),by:""});ilUid(e);ilLog(e,"me","nvp","di vật")}
 I.at=null;ilCensus()}
(function(){if(typeof nlRun!=="function")return;const f=nlRun;nlRun=function(){let old=null;try{if(ilCoop()&&S&&S.dead)old=S}catch(e){}const r=f.apply(this,arguments);
 try{if(old&&S&&S!==old)ilInherit(old);else if(S&&!S.dead&&(!S.il||!S.il.at))ilCensus()}catch(e){console.error("ilInherit",e)}return r}})();
/* dev audit (main / bots): every piece and where it is now; "net" = removals with no route (must be 0) */
function ilAudit(){const I=ilS();const rows=[];for(const p of ilPeople())for(const e of ilSlots(p))rows.push([e.iu||0,ilNm(e),ilKey(p),p===S?"":(p.alive===false?"chết":"")]);
 for(const x of I.box)rows.push([x.e.iu,ilNm(x.e),x.at,x.why+(x.own?" · của "+x.own:"")]);return{n:rows.length,net:I.net,box:I.box.length,rows,log:I.log.slice(-50)}}
window.ilGone=ilGone;window.ilAudit=ilAudit;window.ilCensus=ilCensus;window.ilWhere=ilWhere;window.ilDur=ilDur;
/* inline removals (filter a chest) go through the same rule */
function ilFilter(p,keep,how){const out=(p.inv||[]).filter(e=>!keep(e));p.inv=(p.inv||[]).filter(keep);for(const e of out)ilGone(p,e,how);return p.inv}
window.ilFilter=ilFilter;
/* co-op, RECORD ONLY (item-ledger-solo): the live path (jcoopworld) carries the piece; the ledger writes the line and the census does not net it */
function ilFriends(){if(!ilCoop())return[];try{return (rivals||[]).filter(v=>v&&v.coop)}catch(e){return[]}}
/* the friend's entry that now holds this piece (same object, or the live path's copy carrying its id: Cài đồ) */
function ilToFriend(e){if(!e||!ilCoop())return null;for(const f of ilFriends())if(ilSlots(f).some(a=>a===e||(!!e.iu&&a.iu===e.iu)))return f;return null}
const IL_SENT=new WeakSet();
function ilSent(e,f){if(IL_SENT.has(e))return;IL_SENT.add(e);const I=ilS();ilUid(e);ilLog(e,"me","coop:"+((f&&f.id)||""),"sang hảo hữu");if(I.at)delete I.at[e.iu]}
/* my acts on her entry: whatever left my hands and now sits in her entry goes to her game on the live path (gift, Cài đồ, a work given) */
(function(){if(typeof runAct!=="function")return;const f0=runAct;runAct=function(a,t){if(!ilCoop()||a!==S||!t||!t.coop)return f0.apply(this,arguments);
 let L0=[];try{L0=ilSlots(S).slice();L0.forEach(e=>ilUid(e,S))}catch(e){}const r=f0.apply(this,arguments);
 try{for(const e of L0)if(!ilHas(S,e)&&!ilAt(e)&&ilToFriend(e))ilSent(e,t)}catch(e){console.error("ilSent",e)}return r}})();
/* her acts on me reach me as a "res" (jcoopworld onRes → famApply): a piece its "rm" op took out of my chest is in HER game now
   (stolen → her chest, burnt, handed over); the ledger records it and the census does not net it (one piece, one place) */
function ilCoopRes(m){try{if(!ilCoop()||!m||m.from===COOPW.seat||!S||S.dead||!Array.isArray(m.fam))return;const I=ilS();if(!I.at)return;
 const now=new Set();for(const e of ilSlots(S))if(e.iu)now.add(e.iu);const RM={lost:"hảo hữu lấy (thất lạc)",burn:"hảo hữu đốt",taken:"nộp cho hảo hữu",gone:"hảo hữu lấy"};
 for(const o of m.fam){if(!o||o.op!=="rm"||!o.k)continue;
  for(const id in I.at){const [k,h]=I.at[id];if(h!=="me"||k!==o.k||now.has(+id)||ilWhere({k,iu:+id}))continue;
   const e0={k,iu:+id};ilLog(e0,"me","coop:"+(m.from||""),RM[o.how]||RM.gone);delete I.at[id];break}}}catch(e){console.error("ilCoopRes",e)}}
setTimeout(()=>{try{if(typeof COOP==="object"&&COOP&&typeof COOP.on==="function")COOP.on("res",m=>Promise.resolve().then(()=>ilCoopRes(m)))}catch(e){}},0);
/* cướp y phục (jty): the robe goes to whoever sent the robber (kept in her chest: a lost case, found by tra xét / recognised when worn);
   an unknown thug → a lost case (it turns up in someone's chest, or hidden) — never into thin air */
function ilRob(p,e,by){if(!e||!ilDur(e)||!p)return null;ilUid(e);
 if(by&&by!==p&&ilAlive(by)&&typeof loLoseE==="function"){const c=loLoseE(p,e,"riv");if(c){c.by=ilKey(by);const x=Object.assign({},e,{lo:c.id,gh:c.own,by:c.by});delete x.from;delete x.giver;delete x.w;
  by.inv=by.inv||[];by.inv.push(x);c.keep=1;c.st="held";c.at=c.by;c.rob=1;try{c.tip=wk()+LO.tipW[0]+R(LO.tipW[1]-LO.tipW[0]+1)}catch(z){}ilUid(e);ilLog(e,ilKey(p),c.by,"cướp");return c}}
 return ilGone(p,e,"lost",{cause:"srv"})}
window.ilRob=ilRob;
/* §64 item events: the ransom / atonement dialogs show the piece in the picture frame; "Chuộc về" / "xin lại" fly it into the chest */
setTimeout(()=>{try{IEV_PID.ilback=pp=>{const x=ilFind(pp&&pp.u);return x?{e:x.e,acts:["back",null]}:null};IEV_PID.ilconf=pp=>{const x=ilFind(pp&&pp.u);return x?{e:x.e,acts:["back",null]}:null}}catch(e){}},0);
