/* ================= jctn: FIRST PLACE IN A CONTEST ⇒ THỊ TẨM THAT NIGHT (owner 26/11 ~01:25Z, OD row «26/11 ~01:25Z» ruling (1); FOREMAN D job D3) =================
   Owner (verbatim): "Tôi thấy hiện tại tỉ lệ được lật thẻ bài thấp quá. Tôi muốn khi thắng hạng nhất các cuộc thi, ngoài phần thưởng hiện tại, còn được thị tẩm đêm đó"
   RULE (BAL.ctn.on): whoever takes FIRST PLACE in ANY contest kind — her, an NPC consort, the co-op friend's entry (law 1, two-way) — also
   serves the Emperor THAT night. ctnWin(winner, title) is called by every contest's own finish (list + scan: dev/tools/contest-thitam-scan.py):
   it keeps tonight for the winner at once with the SAME «night taken» mark his own visit uses (j75 S.ntk {w: wk(), who, nm}), so
     - no tablet is turned that tối (jnf / jfe realFlip: «the Emperor already spends the night with someone = no flip and no choice»),
     - nobody can take that night from the winner (every steal / visit path reads j75 ntTaken / ntReason; the same for her and for NPCs),
     - the winner's normal night plays at the end of tối: hers = jnf herNight → Chuẩn bị thị tẩm → the night cards (BAL.night); an NPC's =
       resolveTonight → rivalNight; the co-op friend's = the host's flip relay, as any night held for her.
   Current rewards are unchanged (each contest keeps its own prize code; this only ADDS the night) and the lật thẻ odds are unchanged
   (nightCh, BAL.ag.emp.summon untouched: on every other day the tablet is turned exactly as before).
   Not given (her log says why, the same rule for everyone): the winner cannot serve tonight (nightCh 0: with child, ill, cấm túc, lãnh cung,
   her monthly days, …), tonight is already taken (his own visit, an earlier contest the same day), or the day's tablet was already turned.
   The live night path (a parked co-op room: jfe start-of-tối flip, no jnf herNight) plays her night through the Kính sự phòng summons
   card PEND.ctnsum (kit modal, the same card pattern as ksp / nfsum).
   Save: S.ctn = {w, who, t} (the last promised night; absent in old saves = nothing promised). Kit: modal card + log line only (no new part). */
(function(){
const on=()=>!!(typeof BAL==="object"&&BAL.ctn&&BAL.ctn.on);
const day=()=>typeof wk==="function"?wk():(S.turn*3+(S.tuan||0));
const keyOf=p=>p===S?"me":p&&p.id;
/* the gain printed on every contest entry card, FIRST among its own gains (the kit hint jk2b kitHint keeps the first two: rv #2); «đêm ấy»
   = the night of the contest day, the card may be read days before (fInv7 «tuần tới», PEND.j71x a month before: rv #3) */
window.ctnF=function(){return on()?"đêm ấy được thị tẩm, ":""};
window.ctnX=function(){return on()?", đêm ấy được thị tẩm":""};
/* the line her log / result shows */
function line(p,t){return p===S?`<span class="g">${t}: ngươi đứng đầu, Hoàng thượng truyền đêm nay ngươi thị tẩm.</span>`:`${t}: ${p.name} đứng đầu, đêm nay ${p.name} thị tẩm.`}
/* CO-OP (one world, the host's Emperor turns every tablet: jnf / jcoopworld): the night is the HOST's to keep. The host keeps it for whoever
   wins there (itself, an NPC, the friend's entry: S.ntk.who = her entry id → his flip hands her the night through the usual relay) and tells
   the friend when it is hers. A contest the GUEST seat plays on her own screen (her j71 entry, Hội phối đồ, …) sends her first place to the
   host (free-form act k "ctm-ctn", no Worker change, an old client ignores it); the host keeps the night for her entry by the same rule and
   answers ok / no; her own card and log follow the answer. An NPC first place seen on the guest's copy of the world changes nothing there
   (the host's own contest decides the NPC nights). */
const CK="ctm-ctn";
const CWo=()=>{try{return window.COOPW&&COOPW.on&&typeof COOP==="object"?COOPW:null}catch(e){return null}};
const host=()=>{if(typeof window.worldOn==="function")return !!window.worldOn();const c=CWo();return !c||c.seat==="a"};
const fEnt=()=>(typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.coop&&v.alive!==false&&!v.out)||null;
const say=(mode,o)=>{try{COOP.send(Object.assign({t:"act",k:CK,mode,id:CK+":"+mode+":"+Date.now()+":"+Math.random().toString(36).slice(2,7)},o||{}))}catch(e){console.error(e)}};
function herCard(t){try{Q.push({t:"Kính sự phòng báo tin",who:typeof pEunCourt==="function"?pEunCourt("ksp"):undefined,art:"img/ev-ksp.webp",
  h:`<p>Hoàng thượng khen tài nghệ của ngươi ở ${t}. Thái giám Kính sự phòng tới báo: tối nay ngài truyền ngươi thị tẩm.</p><p class="past">Hết buổi tối, ngươi tắm gội chờ giá; đêm nay không ai tranh được.</p>`})}catch(e){console.error(e)}}
/* rv #4 ORDER: her night card comes AFTER the contest's own result — the kit result toast «KẾT QUẢ» (#rtoast, j63 resultShow, shown after
   the option's go), the podium (#kpodov) or the mini-game board: it waits until none is on screen; the toast's «Được» row also lists the
   night (the same kit item markup as every gain there). No result toast within BAL.ctn.waitMs → the card follows anyway. Bots: at once. */
let PC=null;
const busy=()=>{try{const t=document.getElementById("rtoast");const pod=document.getElementById("kpodov");const vis=x=>!!(x&&!x.hidden&&x.offsetParent!==null);
 return !!((t&&t.classList.contains("on"))||vis(pod)||vis(document.getElementById("kg82"))||(S&&S.mg))}catch(e){return false}};
/* the toast is painted AFTER resultShow returns (and can be repainted): the night item is added on every tick while it is up */
function tagToast(){try{const t=document.getElementById("rtoast");if(!t||!t.classList.contains("on")||t.querySelector("[data-ctn]"))return;
 const v=t.querySelector(".kr-duoc .krv");if(v){v.insertAdjacentHTML("afterbegin",'<span class="kitem" data-ctn="1"><span class="ef g">đêm ấy được thị tẩm</span></span>');if(PC)PC.rs=1}}catch(e){console.error(e)}}
function cardTick(){if(!PC)return;tagToast();const age=Date.now()-PC.at;
 if((!busy()&&(PC.rs||age>=((BAL.ctn&&BAL.ctn.waitMs)||1500)))||age>60000){const t=PC.t;PC=null;herCard(t);try{render()}catch(e){}try{if($("modal").hidden&&!S.mg)showModal()}catch(e){}return}
 setTimeout(cardTick,300)}
function cardLater(t){if(window.__bot){herCard(t);return}PC={t,at:Date.now(),rs:0};setTimeout(cardTick,300)}
if(typeof resultShow==="function"){const rs0=resultShow;resultShow=function(){const r=rs0.apply(this,arguments);try{if(PC){PC.rs=1;setTimeout(tagToast,0);setTimeout(tagToast,60)}}catch(e){console.error(e)}return r}}
/* why the night cannot be kept for p today ("" = it can) */
function why(p){const me=p===S;const d=day();const n=typeof ntTaken==="function"?ntTaken():null;
 if(n){if(n.who===keyOf(p))return "same";return String(typeof ntReason==="function"?ntReason(S):"đêm nay Hoàng thượng đã có hẹn").replace(/^Đ/,"đ")}
 if(S.nfF===d||(S.nightWhy&&S.nightWhy.wk===d)||S.nfN===d)return "thẻ bài đêm nay đã lật";
 if(!(typeof nightCh!=="function"||nightCh(p)>0))return me?"đêm nay ngươi không thể hầu giá":"đêm nay nàng không thể hầu giá";return ""}
window.ctnWin=function(p,title){try{
 if(!on()||typeof S==="undefined"||!S||S.dead||!p)return "";
 const me=p===S;const t=title||"Hội thi";
 if(CWo()&&!host()){/* the guest seat: only her own first place, through the host */if(!me||S.out||(typeof isSrv==="function"&&isSrv())||(typeof isKc==="function"&&isKc()))return "";
  const w=why(S);if(w&&w!=="same"){log(`${t}: ngươi đứng đầu, nhưng ${w}.`);return ""}if(w==="same")return "";say("win",{w:day(),tt:t});return ""}
 if(me){if((typeof isSrv==="function"&&isSrv())||(typeof isKc==="function"&&isKc())||S.out)return ""}
 else if(p.alive===false||p.out)return "";
 const w=why(p);if(w==="same")return "";if(w){if(me)log(`${t}: ngươi đứng đầu, nhưng ${w}.`);return ""}
 const d=day();S.ntk={w:d,who:me?"me":p.id,nm:me?"ngươi":(p.name||"")};S.ctn={w:d,who:keyOf(p),t};
 const L=line(p,t);log(L);
 if(!me&&p.coop&&CWo()&&host())say("ok",{w:d,tt:t});
 if(me)cardLater(t);
 return L}catch(e){console.error("ctnWin",e);return ""}};
if(typeof COOP==="object"&&COOP&&typeof COOP.on==="function")COOP.on("act",m=>{try{const c=CWo();if(!m||m.k!==CK||!c||m.from===c.seat||!S||S.dead||!on())return;
 if(m.mode==="win"&&host()){/* the friend won on her seat: keep tonight for her entry (the same rule as every winner here) */const f=fEnt();
  if(!f||m.w!==day()){say("no",{w:m.w,tt:m.tt,why:"thẻ bài đêm nay đã lật"});return}const w=why(f);if(w==="same")return;
  if(w){say("no",{w:m.w,tt:m.tt,why:w});return}window.ctnWin(f,m.tt);return}
 if(!host()&&m.w===day()){if(m.mode==="ok"){S.ntk={w:m.w,who:"me",nm:"ngươi"};S.ctn={w:m.w,who:"me",t:m.tt};log(line(S,m.tt));cardLater(m.tt)}
  else if(m.mode==="no")log(`${m.tt}: ngươi đứng đầu, nhưng ${m.why||"thẻ bài đêm nay đã lật"}.`)}}catch(e){console.error("ctn relay",e)}});
window.ctnOf=function(){const c=S&&S.ctn;return c&&c.w===day()?c:null};
/* the live night path (no jnf: a parked co-op room, jfe flips at the start of tối): realFlip leaves S.tonight = "me" for a taken night but
   nothing plays it (j3 resolveTonight skips "me"): her summons card plays it. jnf rooms play it themselves (endTurn → herNight). */
PEND.ctnsum=()=>({who:typeof pEunCourt==="function"?pEunCourt("ksp"):undefined,
 t:`<p>Thái giám Kính sự phòng tới báo: Hoàng thượng nhớ ngươi đứng đầu ${(S.ctn&&S.ctn.t)||"hội thi"} hôm nay, đêm nay truyền ngươi thị tẩm.</p>`,
 o:[{n:"Tắm gội chờ giá",fx:{},x:"thành: được thị tẩm, gần Hoàng thượng đêm nay",go:()=>{try{if(S.ntk&&S.ntk.w===day()&&S.ntk.who==="me")S.ntk=null}catch(e){}/* j75 takes the visit again when the night starts */nightScene()}}]});
if(typeof flip==="function"){const f0=flip;flip=function(){const r=f0.apply(this,arguments);try{
 if(on()&&S&&!S.dead&&host()/* a co-op guest gets the host's relay (ksp) */&&!(typeof window.nfOn==="function"&&window.nfOn())&&S.tonight==="me"){const c=window.ctnOf();
  if(c&&c.who==="me"&&S.ntk&&S.ntk.w===day()&&S.ntk.who==="me"&&!Q.some(m=>m&&(m.pid==="ctnsum"||m.pid==="ksp"||m.pid==="prep"||m.pid==="nfsum")))pushDil(mkP("ctnsum"),"Kính sự phòng báo tin")}}catch(e){console.error(e)}return r}}
})();
