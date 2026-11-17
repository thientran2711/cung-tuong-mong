/* ================= jnf: THE NIGHT — FLIP AT THE END OF TỐI, ONE 10-SECOND CHOICE, RESOLVED ONCE (owner OD 16/11 22:45Z FINAL + 22:50Z + 22:10Z) =================
   Owner (22:45Z canon overwrite of every older night-flow line): tối keeps its full 4 khắc for normal evening acts; Tranh sủng / Chặn ngự giá
   are NOT acts any more (no Hành sự card, no person-menu act, no NPC agent act) — they exist ONLY inside the card-flip scene.
   1. THE FLIP when tối's 4th khắc ends ("Sang ngày mới", endTurn's first press of the day): flip() called earlier (the new day in endTurn,
      start(), the cycle answer…) only marks the tablet as waiting (S.nfP). The Emperor already spending the night with someone (j75 ntTaken:
      his own visit "Thắp đèn hầu rượu") = no flip and no choice. Old saves that flipped in the morning keep that pick (S.nightWhy of the day).
   2. THE CHOICE, right after the flip result (jflip scene ends): EVERY player gets a forced choice with a 10-second countdown (BAL.steal.choice.ms,
      kit §69 clock chip; timeout = Thôi): attackers 'Tranh sủng' / 'Chặn ngự giá' / 'Thôi'; the FLIPPED consort 'Giữ chân Hoàng thượng' / 'Thôi'
      (OD 22:50Z). No khắc, no Sức, no cost — only gain and loss. NPCs choose at the SAME moment (jsteal stealWant for attacks; BAL.steal.keep.npcP
      for a flipped NPC, which never costs anything), never earlier, never seen by her (OD 22:10Z: no rule rewards reacting faster; order of choosing never matters).
   3. RESOLVE ONCE when everyone has chosen: the defence rolls first (nfOdds keep): success → every attack that night drops BAL.steal.keep.rung odds rung(s)
      (jbalcore rungDown on the BAL.lad ladder); then each attack rolls once vs its own odds; one success → she takes the night; several → higher Sủng; equal →
      a fair seeded roll (seedPick; host in co-op); none → the flipped consort keeps it. Defended + kept → keepNoSteal (Sủng +keep.gain); defended + robbed →
      keepRobbed (oán toward the winner × keep.oan). A failed attack: jbalcore stealFail (the mode's own loss, BAL.steal.m[mode].lose). Winner: stealWin (oán / ghen vs the holder).
   4. Then the night: HER win → herWin (summons → bath → makeup → Emperor → talk → curtain, jnight ends the day); she kept her own flipped night →
      the Kính sự phòng summons "Tắm gội chờ giá" (ksp) plays; an NPC holder → resolveTonight / rivalNight at endTurn. Exactly ONE night record.
   ONE odds function: window.nfOdds(who, mode, ctx) — mode "feign" (Tranh sủng) / "road" (Chặn ngự giá) = oSteal; "keep" = oKeep (jbalcore: stats,
   her best art vs the Emperor's month art OD 23:05Z, trait fit, mood); ctx.down = keep successes (× BAL.steal.keep.rung rungs, jbalcore
   rungDown); ctx.adj = a hook for later odds terms. Numbers: BAL.steal.* only (balance-core).
   CO-OP (host-authoritative, owner OD:L96 one world): only the HOST's Emperor turns a card (friend included). The host sends {open} (holder +
   nightWhy) → the guest plays the same scene and its own choice → sends {ch} → the host resolves once (both seats' choices + NPCs) → {fin} with
   the friend's own result (gres / gdef) → each seat plays its own night. Each seat commits only ITS OWN night.
   Save: S.nfP / nfF / nfC / nfN / nfFin / nfW (as before) + S.nfX {d, st, t, role, me, fr, npc, nk, ksp, def} (the choice of the day; old saves: absent). */
(function(){
if(typeof flip!=="function"||typeof endTurn!=="function"||typeof nightScene!=="function")return;
const day=()=>typeof wk==="function"?wk():(S.turn*3+(S.tuan||0));
const B4=()=>typeof B4L==="number"?B4L:2;
const B=()=>BAL.steal;
/* the palace night only (servant route j42 and the home route jkc keep their own week: the flip there is unchanged) */
function nfOn(){try{return !!(S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())&&!(typeof isKc==="function"&&isKc()))}catch(e){return false}}
window.nfOn=nfOn;
const CO=()=>{try{return window.COOPW&&COOPW.on&&typeof COOP==="object"?COOPW:null}catch(e){return null}};
const host=()=>{if(typeof window.worldOn==="function")return !!window.worldOn();const c=CO();return !c||c.seat==="a"};
const guest=()=>!!CO()&&!host();
const myPid=()=>{const c=CO();return c?(c.seat==="a"?901:902):0};
const friend=()=>(typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.coop)||null;
function flippedToday(){return S.nfF===day()||!!(S.nightWhy&&S.nightWhy.wk===day())}
function entOf(w){if(w==="me")return S;return (typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===w)||null}
const keyOf=a=>a===S||a==="me"?"me":a&&a.id;
const sungOf=a=>a===S?(S.sung||0):(a&&a.sung)||0;
let REAL=0,IN=0,SW=0,CUR=null,RR=null;

/* ---------- 0. Tranh sủng / Chặn ngự giá leave every act list (owner 22:45Z (2)) ----------
   her Hành sự deck (j2 deal: the two cards are deleted there), the person menu group "Hại nặng" (j15 RVGRP), the NPC harm bands (j24 BANDS:
   NPC agents pick their acts there), the weekly social act (j28 SOC.steal, already off in jsteal). ACT.steal / ACT.road stay defined (old
   callers) but can never be offered: ok() = false. */
try{for(const g of (typeof RVGRP!=="undefined"?RVGRP:[]))for(const k of ["steal","road"]){const i=g[1].indexOf(k);if(i>=0)g[1].splice(i,1)}}catch(e){}
try{for(const g of (typeof BANDS!=="undefined"?BANDS:[]))for(const k of ["steal","road"]){const i=(g[2]||[]).indexOf(k);if(i>=0)g[2].splice(i,1)}}catch(e){}
try{for(const k of ["steal","road"])if(typeof ACT==="object"&&ACT[k])ACT[k].ok=()=>false}catch(e){}
try{if(typeof SOC==="object"&&SOC.steal)SOC.steal.ok=()=>false}catch(e){}

/* ---------- ONE odds function (owner 22:45Z (4) + 22:50Z: Giữ chân also rolls) ---------- */
function nfOdds(a,mode,ctx){ctx=ctx||{};let o;
 o=mode==="keep"?oKeep(a):oSteal(a,mode==="road"?"road":"feign");
 if(ctx.adj)o+=ctx.adj;            /* later odds terms plug in here (the month art is already inside oSteal / oKeep) */
 o=Math.max(1,Math.min(99,Math.round(o)));if(ctx.down)o=rungDown(o,ctx.down*(B().keep.rung||1));return o}
window.nfOdds=nfOdds;window.nfRungDown=rungDown;

/* ---------- 1. the flip waits for the end of tối ---------- */
const f0=flip;
function realFlip(){S.nfP=null;S.nfF=day();
 const n=typeof ntTaken==="function"?ntTaken():null;
 if(n){S.tonight=n.who==="me"?"me":((typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===n.who)||null);return}
 REAL=1;let r;try{r=f0.apply(this,arguments)}finally{REAL=0}return r}
flip=function(){if(!S||REAL||!nfOn())return f0.apply(this,arguments);
 if(guest()){S.tonight=null;S.nfP=day();return}               /* co-op guest: the host's Emperor turns the card (relayed) */
 if(S.nfC===day()&&S.nfX&&S.nfX.d===day()&&S.nfX.st==="wait")return realFlip.apply(this,arguments);   /* inside the commit, before the choice (the cycle answer re-flips) */
 if(S.nfC===day())return;                                      /* the choice is running / done: tonight stays */
 S.tonight=null;S.nfP=day()};                                  /* the tablet waits for the end of tối */

/* his own visit (jvisit visRoll, "after the tablet flip") rolls AFTER the choice is resolved, never between the flip and the choice: no dialog
   may cover the flip choice (night-final #4, coop-steal family); the roll inside realFlip is only marked (S.nfVd) and run by finish() */
if(typeof window.visRoll==="function"){const vr0=window.visRoll;window.visRoll=function(){if(REAL&&nfOn()){S.nfVd=day();return""}return vr0.apply(this,arguments)}}
function visLate(){if(!S||S.nfVd!==day())return;S.nfVd=null;if(!host())return;try{window.visRoll()}catch(e){console.error("visit",e)}}
/* ---------- 2. the night itself plays only after the choice ---------- */
const sw0=stealWin;stealWin=function(){SW++;try{return sw0.apply(this,arguments)}finally{SW--}};
const ns0=nightScene;nightScene=function(){if(IN||!S||!nfOn())return ns0.apply(this,arguments);
 const n=typeof ntTaken==="function"?ntTaken():null;
 if(n&&n.who!=="me"){try{log(`${ntReason(S)}.`)}catch(e){}if(S.tonight==="me")S.tonight=null;return}
 if(SW>0){S.tonight="me";S.ntk={w:day(),who:"me",nm:"ngươi"};return}   /* a won try: nfResolve plays herWin after the batch */
 /* the summons "Tắm gội chờ giá" after the choice, his own visit "Thắp đèn hầu rượu": the night is hers NOW; the day ends after it (jnight) */
 S.nfN=day();S.tonight="me";try{if(used>=4)used=3}catch(e){}send();IN=1;try{return ns0.apply(this,arguments)}finally{IN=0}};
/* co-op: any answer that changes who holds tonight (her summons declined "Cáo bệnh", given to the maid…) is relayed */
if(typeof chooseM==="function"){const cm0=chooseM;chooseM=function(){const b=S&&S.tonight,c0=CUR;CUR=(Q[0]&&Q[0].pid)||"";let r;try{r=cm0.apply(this,arguments)}finally{CUR=c0}try{if(CO()&&S&&S.tonight!==b)send()}catch(e){}return r}}

/* one try a night each: the same mark j75 ntTry writes (S.ntTry {w: wk(), ids}) */
function tryMark(a){if(!S)return;const w=wk();if(!S.ntTry||S.ntTry.w!==w)S.ntTry={w,ids:[]};const k=keyOf(a);if(k!=null&&!S.ntTry.ids.includes(k))S.ntTry.ids.push(k)}
/* the failure line of a try whose loss is applied on another seat (co-op friend): same words and numbers as jbalcore stealFail, no ap */
function failTxt(a,t,mode){return `${NMc(a)} định giành đêm${t?" của "+NM(t):""} nhưng Hoàng thượng không động lòng. ${fmt(stealLose(mode))}. `}
/* a fair seeded roll among equals (same seed on any seat: the day, the batch, the ids) */
function seedPick(L,k){const id=x=>String(x.a===S?"me":x.a.id);const M=L.slice().sort((a,b)=>id(a)<id(b)?-1:id(a)>id(b)?1:0);
 const s=`${day()}|${k}|`+M.map(id).join(",");let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return M[h%M.length]}
/* resolve ONE batch (the flip's attacks, or a ledger night): L = [{a, mode, o, remote}] — each rolls once vs its own odds; one success wins;
   several → higher Sủng → seeded roll. Never 'earlier' or 'largest margin' (OD 22:10Z). */
function nfResolve(t,L,live,k){const out={holder:t,lines:[],tries:L.length,res:[]};if(!L.length)return out;
 const taken=typeof ntTaken==="function"?ntTaken():null;
 for(const x of L){x.ok=!!t&&!taken&&x.a!==t&&Math.random()*100<x.o}
 const OK=L.filter(x=>x.ok);let best=null;
 if(OK.length){const top=Math.max(...OK.map(x=>sungOf(x.a)));const T=OK.filter(x=>sungOf(x.a)===top);best=T.length>1?seedPick(T,k):T[0]}
 const ST=window.__stealSt||[];
 for(const x of L){const a=x.a;let txt;
  if(x===best){try{txt=String(stealWin(a,t,x.mode)||"").trim()}catch(e){console.error(e);txt=""}out.holder=a;
   try{const d=S.nightWhy;if(d&&d.wk===day()){d.pick=a===S?"me":a.id;d.cause="stolen"}}catch(e){}}
  else if(taken||!t)txt=`${NMc(a)} định giành đêm nhưng ${typeof ntReason==="function"?ntReason(a).replace(/^Đ/,"đ"):"đêm nay đã có người"}.`;
  else if(x.ok)txt=`${NMc(a)} cũng mời được Hoàng thượng, nhưng ngài chọn sang cung ${NM(best.a)}.`;
  else txt=(x.remote?failTxt(a,t,x.mode):stealFail(a,t,x.mode)).trim()
  out.res.push({w:a===S?"me":a.id,won:x===best,mode:x.mode,txt,lost:!x.ok&&!taken&&!!t});
  try{ST.push({w:day(),me:t===S,mode:x.mode,ok:x===best,live,n:L.length});if(ST.length>5000)ST.splice(0,1000)}catch(e){}
  try{if(typeof newsAdd==="function"&&a!==S&&t)newsAdd(a,"steal",txt.replace(/\.\s*$/,""),t===S)}catch(e){}
  if(!live){out.lines.push(txt);continue}
  if(a===S||t===S)log(txt);else if(x===best&&(S.mat||0)>=2)log(txt)}
 if(live&&best&&t===S&&best.a!==S){for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp"||Q[i].pid==="prep")Q.splice(i,1);
  const w=out.res.find(r=>r.won);Q.push({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng ${w?w.txt:""}</p>`})}
 if(live&&best&&best.a===S)herWin();
 return out}
/* the NPCs' own choice at the flip (agent law: stealWant; stealEligible; at most BAL.steal.maxTry attackers a night) — no cost (owner 22:45Z (3)) */
function npcAttackers(t){const R=[];if(!t)return R;
 const E=liveRivals(true).filter(v=>v&&!v.coop&&typeof stealEligible==="function"&&stealEligible(v,t)&&!(typeof cyTray==="function"&&cyTray(v)));
 for(let i=E.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[E[i],E[j]]=[E[j],E[i]]}
 for(const v of E){if(R.length>=B().maxTry)break;const w=stealWant(v,t);if(!w.mode||!(Math.random()<w.p))continue;R.push({w:v.id,mode:w.mode})}
 return R}
/* one whole-night pass of the NPCs' own choice, one batch, same tie rule: a NOT played night (10-night ledger, live:false: lines only), the
   servant / home routes (jsteal flip, !nfOn) */
function stealPassNF(t,opt){opt=opt||{};const live=opt.live!==false;const out0={holder:t,lines:[],tries:0,res:[]};if(!S||S.dead||!t)return out0;
 if(guest()&&t!==S)return out0;
 const L=npcAttackers(t).map(x=>{const v=entOf(x.w);tryMark(v);return{a:v,mode:x.mode,o:nfOdds(v,x.mode)}}).filter(x=>x.a);
 return nfResolve(t,L,live,"pass")}
if(typeof window.stealPass==="function")window.stealPass=stealPassNF;
window.nfResolve=nfResolve;window.nfSeedPick=seedPick;

/* HER win: the summons, then the night at once (the day ends after it, jnight) */
/* the painted "THỊ TẨM" seal on her card only once the choice is resolved and the night is hers (main s26 23:39Z; jflip cfSeal, once a day) */
const sealMe=()=>{try{if(typeof window.cfSeal==="function")window.cfSeal()}catch(e){console.error(e)}};
function herWin(){if(!S||S.dead)return;const d=day();if(S.nfN===d)return;S.nfN=d;sealMe();S.tonight="me";S.ntk={w:d,who:"me",nm:"ngươi"};if(CO())RR=d;
 try{if(used>=4)used=3}catch(e){}
 for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp")Q.splice(i,1);
 const P=PEND.nfsum();Q.unshift({t:"Kính sự phòng báo tin",h:P.t,opts:P.o,who:P.who,pid:"nfsum",pp:{nd:d},art:"img/ev-ksp.webp"});
 send();try{render()}catch(e){}showSoon()}
PEND.nfsum=()=>({who:typeof pEunCourt==="function"?pEunCourt("ksp"):undefined,t:"<p>Thái giám Kính sự phòng chạy tới báo: Hoàng thượng đổi ý, ngự giá đang sang cung ngươi. Tắm gội trang điểm cho kịp!</p>",
 o:[{n:"Tắm gội chờ giá",fx:{},x:"chuẩn bị thị tẩm",go:()=>{try{if(S.ntk&&S.ntk.w===day()&&S.ntk.who==="me")S.ntk=null}catch(e){}/* j75 takes the visit again when the night starts */IN=1;try{nightScene()}finally{IN=0}}}]});

/* ---------- 2b. THE FLIP CHOICE ---------- */
/* who may try against holder t: alive, in the palace, able to serve tonight (nightCh: not pregnant / ill / confined / cold palace), not in her
   cycle tray (jcycle), not tried yet tonight (j75) */
function canAtt(a,t){try{if(!a||!t||a===t)return false;if(a===S){if(S.dead)return false}else if(!a.alive||a.out)return false;
 if(typeof nightCh==="function"&&!(nightCh(a)>0))return false;if(typeof ntCan==="function"&&!ntCan(a))return false;
 if(typeof cyTray==="function"&&cyTray(a))return false;return true}catch(e){return false}}
function roleOf(a,t){if(!t)return null;if(a===t)return "def";return canAtt(a,t)?"att":null}
const VALID=v=>v==="feign"||v==="road"||v==="keep"?v:null;
/* S.nfX: st "wait" (flip done, other dialogs first) → "open" (choices running) → "done" */
function X(){const x=S&&S.nfX;return x&&x.d===day()?x:null}
const scene=()=>{try{return (typeof window.cfBusy==="function"&&window.cfBusy())||!!document.querySelector(".kmov.kcf")}catch(e){return false}};
/* no dialog may cover the flip choice (night-final #4, coop-steal family): while the card-flip scene or the choice is on screen, a tap on a
   look-up opener (mood seal → "Tâm trạng · X" jevb/jpcf, servant look j29) does nothing — the scene / the choice owns the screen; the seal's
   own popover (jemo emoTip) is a tooltip, not a dialog, and is not what is stopped here: the whole tap is. Window capture = before every other listener. */
const LOOKUP="img.kemo[data-emo],[data-emo-open],[data-svlook]";
window.addEventListener("click",e=>{try{const t=e.target;if(!t||!t.closest||!t.closest(LOOKUP)||!S||!nfOn())return;const x=X();
 if(!(scene()||(x&&x.st==="open"&&Q[0]&&Q[0].pid==="nfch")))return;e.stopPropagation();e.preventDefault()}catch(z){}},true);
let WT=null;
function wake(){step();if(!WT&&!window.__bot)WT=setInterval(step,250)}
function sleep(){if(WT){clearInterval(WT);WT=null}}
function step(){try{if(!S||S.dead||!nfOn()){sleep();return}const x=X();if(!x||x.st==="done"){sleep();return}
 if(x.st==="wait"){if(Q.some(m=>m&&m.pid!=="ksp"&&m.pid!=="prep"&&m.pid!=="nfch"))return;openChoice()}
 if(x.st!=="open")return;
 if(x.me===undefined&&!x.dlg){if(scene()&&Date.now()-(x.at||0)<B().choice.waitMs*2)return;showChoice()}
 if(guest())return;
 if(x.me!==undefined&&x.fr===undefined&&x.myAt&&Date.now()-x.myAt>B().choice.waitMs)x.fr=null;   /* the friend never answered: Thôi */
 if(x.me!==undefined&&x.fr!==undefined)resolveAll()}catch(e){console.error(e)}}
/* the tablet's result is out and no other dialog waits: the choices open (host / single player) */
function openChoice(){const x=X();if(!x)return;x.st="open";x.at=Date.now();
 for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp"||Q[i].pid==="prep"){Q.splice(i,1);if(S.tonight==="me")x.ksp=1}
 if(x.ksp&&!window.__bot)try{showModal()}catch(e){}   /* the summons shown by the flip waits until after the choice */
 const t=tonightOf();x.t=t?keyOf(t):null;
 x.fr=friend()&&CO()?undefined:null;
 if(!t||(typeof ntTaken==="function"&&ntTaken())){x.me=null;x.fr=null;x.st="done";send("open");finish();return}
 x.role=roleOf(S,t);
 /* the NPCs choose NOW, the same moment as the players (hidden from her) */
 x.npc=npcAttackers(t);x.nk=t!==S&&!t.coop?Math.random()<B().keep.npcP:false;
 send("open")}
/* the GỢI Ý line of each flip option (owner 22:50Z: the trade-off must be visible): only what DIFFERS between the two attacks, read from
   BAL.steal.m (what it leans on, art weight, win / loss size vs the other attack, Hoàng hậu) — short, so the card fits the kit frame */
function nfHint(mode){try{const M=BAL.steal.m,K=B().keep;
 const lean=w=>Object.keys(w||{}).sort((a,b)=>w[b]-w[a]).map(k=>({sung:"ân sủng",sac:"nhan sắc",tai:"tài học",danh:"danh tiếng"})[k]).filter(Boolean);
 if(mode==="keep")return `dựa vào ân sủng${K.sac?", nhan sắc":""}, tài nghệ · thành: kẻ tranh khó thêm một bậc · hỏng: chẳng mất gì`;
 const me=M[mode],ot=M[mode==="road"?"feign":"road"];const big=(a,b)=>Math.abs(a||0)>Math.abs(b||0);
 const art=me.art>ot.art?"tài nghệ nặng ký (môn ngài chuộng thì lợi, môn ngài chán thì hại)":"tài nghệ góp ít";
 const win=big(me.win.sung,ot.win.sung)?`sủng nhiều${me.win.danh?", nổi danh":""}`:"sủng chút ít";
 const lose=big(me.lose.sung,ot.lose.sung)?`mất sủng nhiều${me.lose.danh?", mất danh":""}${me.hh?", Hoàng hậu phật ý":""}`:`mất chút sủng${me.lose.duc?", chút đức":""}`;
 return `dựa vào ${lean(me.w).join(", ")}; ${art} · thành: ${win} · hỏng: ${lose}`}catch(e){return ""}}
/* her own choice: one kit dialog (option cards, ✕ = Thôi) with the §69 clock chip; the countdown starts when it is on screen */
function showChoice(){const x=X();if(!x||x.dlg)return;x.dlg=1;const t=entOf(x.t);
 if(!x.role||!t){mine(null);return}
 const E=B().choice.ms,clk=()=>`<p class="nfcd" id="nfcd">${typeof kitCoopClock==="function"?kitCoopClock({left:E,len:E}):""}</p>`;
 let h,o;
 if(x.role==="def"){const ok=typeof stealShown==="function"?stealShown(S,"keep"):nfOdds(S,"keep");
  h=`<p>Thẻ bài của ngươi được lật. Kẻ khác có thể tranh mất đêm nay; ngươi có giữ chân Hoàng thượng không?</p>${clk()}`;
  o=[{n:"Giữ chân Hoàng thượng",fx:{},showOdds:true,hint:nfHint("keep"),x:`${word(ok)} · thành: ai tranh đêm của ngươi cũng khó thêm ${B().keep.rung} bậc; không ai giành được thì Sủng +${B().keep.gain} · hỏng: không mất gì`,go:()=>mine("keep")},
     {n:"Thôi",fx:{},go:()=>mine(null)}]}
 else{const sh=m=>typeof stealShown==="function"?stealShown(S,m):nfOdds(S,m),o1=sh("feign"),o2=sh("road");/* the word she may know (the month's art unread = neutral, jbalcore) */const gx=r=>{try{return stealX(t,r)}catch(e){return ""}};
  h=`<p>Tối nay thẻ bài của ${NM(t)} được lật. Ngươi có ra tay giành đêm nay không?</p>${clk()}`;
  o=[{n:"Tranh sủng",fx:{},showOdds:true,hint:nfHint("feign"),x:`${word(o1)} · thành: ${gx(0)||"Hoàng thượng sang cung ngươi"} · hỏng: ${fmt(stealLose("feign"))}`,go:()=>mine("feign")},
     {n:"Chặn ngự giá",fx:{},showOdds:true,hint:nfHint("road"),x:`${word(o2)} · thành: ${gx(1)||"Hoàng thượng sang cung ngươi"} · hỏng: ${fmt(stealLose("road"))}`,go:()=>mine("road")},
     {n:"Thôi",fx:{},go:()=>mine(null)}]}
 Q.push({t:"Kính sự phòng",h,opts:o,who:typeof pEunCourt==="function"?pEunCourt("ksp"):undefined,pid:"nfch",pp:{d:day()}});
 try{render()}catch(e){}if(!window.__bot&&Q[0]&&Q[0].pid==="nfch")try{showModal()}catch(e){}else showSoon()}
function mine(v){const x=X();if(!x||x.me!==undefined)return;x.me=VALID(v);x.myAt=Date.now();TM.stop();
 if(guest())send("ch");step()}
/* the countdown (kit §69 kitCoopClock chip, words "Còn N giây"): starts when the dialog is first shown; at 0 → Thôi */
const TM={t0:0,id:null,stop(){if(this.id){clearInterval(this.id);this.id=null}this.t0=0},
 start(){if(this.id||window.__bot)return;this.t0=Date.now();const E=B().choice.ms;
  this.id=setInterval(()=>{try{const x=X();if(!x||x.me!==undefined){this.stop();return}const left=E-(Date.now()-this.t0);
   const el=document.querySelector("#mb .kchips.kctm");if(el&&typeof kitCoopClock==="function")el.outerHTML=kitCoopClock({left:Math.max(0,left),len:E});   /* the kit text pass drops the wrapper id: find the chip row itself */
   if(left<=0){this.stop();const i=Q.findIndex(m=>m&&m.pid==="nfch");
    if(i===0&&!$("modal").hidden){const j=Q[0].opts.findIndex(c=>c.n==="Thôi");chooseM(j)}else{if(i>=0)Q.splice(i,1);mine(null);try{showModal();render()}catch(e){}}}}catch(e){console.error(e)}},250)}};
if(typeof showModal==="function"){const sm0=showModal;showModal=function(){const r=sm0.apply(this,arguments);try{if(Q[0]&&Q[0].pid==="nfch"&&!$("modal").hidden)TM.start()}catch(e){}return r}}
/* everyone has chosen: ONE resolve (host / single player) */
function resolveAll(){const x=X();if(!x||x.st!=="open")return;x.st="done";sleep();
 const t=tonightOf();if(!t||(typeof ntTaken==="function"&&ntTaken())){finish();return}
 const f=friend();
 const keep=t===S?x.me==="keep":t.coop?x.fr==="keep":!!x.nk;
 const defOk=keep?Math.random()*100<nfOdds(t,"keep"):false;
 const L=[];
 if(x.me&&x.me!=="keep"&&t!==S&&canAtt(S,t))L.push({a:S,mode:x.me});
 if(f&&x.fr&&x.fr!=="keep"&&t!==f)L.push({a:f,mode:x.fr,remote:true});
 for(const n of x.npc||[]){const v=entOf(n.w);if(v&&v!==t&&canAtt(v,t))L.push({a:v,mode:n.mode})}
 for(const y of L){y.o=nfOdds(y.a,y.mode,{down:defOk?1:0});tryMark(y.a)}
 x.def={keep:keep?1:0,ok:defOk?1:0,n:L.length};
 if(keep&&t===S)log(defOk?"Ngươi khéo giữ chân Hoàng thượng: ai tranh đêm của ngươi cũng khó thêm "+B().keep.rung+" bậc.":"Ngươi cố giữ chân Hoàng thượng, nhưng ngài chẳng để tâm.");
 const out=nfResolve(t,L,true,"flip");const won=out.res.find(r=>r.won);
 if(keep&&L.length){
  if(!won){const n=t!==f?keepNoSteal(t):B().keep.gain;if(t===S&&n)log(`Đêm nay không ai giành được Hoàng thượng khỏi ngươi. Sủng +${n}.`);x.def.gain=n}
  else{const w=entOf(won.w);if(w)keepRobbed(t,w,won.mode);x.def.oan=B().keep.oan}}
 gres(out,t===f?x.def:null);
 if(t===S&&!won)sealMe();   /* she kept her own flipped night */
 if(S.tonight==="me"&&!won&&x.ksp&&S.nfN!==day()&&!Q.some(m=>m.pid==="ksp")){try{pushDil(mkP("ksp"),"Kính sự phòng báo tin")}catch(e){console.error(e)}}
 finish()}
/* co-op: the friend's own result goes back to her seat (she applies her own Sủng and plays her own night) */
function gres(o,def){try{const f=friend();if(!f)return;const r=o&&o.res&&o.res.find(z=>z.w===f.id);
 S.nfG={d:day(),L:r?[{k:"flip",won:r.won,mode:r.mode,lost:r.lost,txt:r.txt}]:[],def:def||null}}catch(e){}}
/* the choice is over: tell the guest, then the day goes on (the night, or the next morning) */
function finish(){S.nfFin=day();visLate();send("fin");RR=day();try{render()}catch(e){}showSoon()}

/* ---------- 3. the commit at "Sang ngày mới" (the end of tối's 4th khắc) ---------- */
const showSoon=()=>{if(window.__bot)return;setTimeout(()=>{try{if(S&&Q.length&&$("modal").hidden)showModal()}catch(e){}},0)};
/* after the choice and its dialogs, the seat runs its night step again (co-op: through the room's allowN gate; the room's night `go` ran
   nextBuoi once). Single player: only when her own night is not playing (jnight ends that day itself). */
function rerun(){if(RR!==day()||!S||S.dead||Q.length||S.mg||(S.buoi||0)<B4()||(guest()&&S.nfFin!==day())||scene())return;
 const x=X();if(!guest()&&x&&x.st!=="done")return;if(!CO()&&S.nfN===day())return;
 RR=null;
 setTimeout(()=>{try{if(!S||S.dead||Q.length||S.mg||(S.buoi||0)<B4())return;
  if(CO()){if(COOPW.pend)return;COOPW.allowN=true;try{nextBuoi()}finally{COOPW.allowN=false}}else nextBuoi()}catch(e){console.error(e)}},300)}
const rd0=render;render=function(){const r=rd0.apply(this,arguments);try{rerun()}catch(e){}return r};
function hold(){S.buoi=B4();RR=day();try{if(used>=4)used=3}catch(e){}/* no j6 auto "Sang ngày mới" while the choice / a dialog is open */try{render()}catch(e){}showSoon()}
function herNight(){S.buoi=B4();if(CO())RR=day();try{if(used>=4)used=3}catch(e){}/* no auto "Sang ngày mới" (j6 used>=4) between her night dialogs; jnight spends the day after nightFx */try{if(S.ntk&&S.ntk.w===day()&&S.ntk.who==="me")S.ntk=null}catch(e){}
 IN=1;try{nightScene()}finally{IN=0}try{render()}catch(e){}showSoon()}
const et0=endTurn;endTurn=function(){if(!S||S.dead||Q.length||S.mg||!nfOn())return et0.apply(this,arguments);
 const d=day();
 if(S.nfC!==d){S.nfC=d;
  if(!guest()){S.nfX={d,st:S.nfN===d?"done":"wait"};if(S.nfN!==d&&!flippedToday())realFlip()}   /* her night already played today (his visit, a summons): no flip, no choice */
  else ask()}
 if(!guest()){const x=X();if(x&&x.st!=="done"){hold();wake();return}}
 else if(S.nfFin!==d){S.nfW=d;ask();hold();wake();return}       /* the host's flip, then the host's last word on who holds tonight */
 if(Q.length)return hold();
 if(S.tonight==="me"&&S.nfN!==d){S.nfN=d;return herNight()}
 return et0.apply(this,arguments)};
/* each seat commits only its own night; an NPC's night is the host's (co-op) */
const rt0=resolveTonight;resolveTonight=function(){const t=S&&S.tonight;
 if(CO()&&t&&t!=="me"&&(t.coop||guest())){S.tonight=null;return ""}return rt0.apply(this,arguments)};
/* the record line names how he got there: a thief's card was never turned */
if(typeof rivalNight==="function"){const rn0=rivalNight;rivalNight=function(v){let r=rn0.apply(this,arguments);
 try{const w=S.nightWhy;if(typeof r==="string"&&v&&w&&w.wk===day()&&w.flip0!=null&&w.flip0!==v.id)r=r.replace(`thẻ bài của ${v.name} được lật`,`Hoàng thượng được mời sang cung ${v.name}`)}catch(e){}return r}}

/* ---------- 4. co-op relay (host-authoritative) ---------- */
const NK="ctm-nf";let LAST=null;
const enc=t=>{if(t==="me"||t===S)return{k:"p",v:myPid()};if(!t)return null;return t.coop?{k:"p",v:t.id}:{k:"n",v:t.id}};
const dec=h=>{if(!h)return null;if(h.k==="p")return h.v===myPid()?"me":(friend()&&friend().id===h.v?friend():null);return (rivals||[]).find(v=>v&&!v.coop&&v.id===h.v)||null};
const mapId=id=>id==="me"?{k:"p",v:myPid()}:(friend()&&id===friend().id)?{k:"p",v:id}:{k:"n",v:id};
const unId=x=>!x?null:x.k==="p"?(x.v===myPid()?"me":x.v):x.v;
function nwOut(){const w=S.nightWhy;if(!w||w.wk!==day())return null;return{pick:w.pick!=null?mapId(w.pick):null,flip0:w.flip0!=null?mapId(w.flip0):null,cause:w.cause,day:w.day,mood:w.mood,
 rows:(w.rows||[]).map(z=>Object.assign({},z,{id:mapId(z.id),name:z.id==="me"?S.name:z.name}))}}
function send(ph){const c=CO();if(!c||!S)return;try{const x=X();const m={t:"act",k:NK,mode:host()?"h":"g",ph:ph||null,d:day(),week:COOP.state.week,hold:enc(S.tonight),
  ntk:S.ntk&&S.ntk.w===day()?mapId(S.ntk.who):null,fin:host()&&S.nfFin===day()?1:0,open:host()&&x&&x.st!=="wait"?1:0,nw:host()?nwOut():null,
  ch:ph==="ch"&&x?{v:x.me}:null,gres:host()&&S.nfG&&S.nfG.d===day()?S.nfG.L:null,gdef:host()&&S.nfG&&S.nfG.d===day()?S.nfG.def:null,
  id:NK+Date.now().toString(36)+Math.random().toString(36).slice(2,6)};if(host())LAST=m;COOP.send(m)}catch(e){console.error(e)}}
function ask(){const c=CO();if(!c)return;try{COOP.send({t:"act",k:NK,mode:"ask",d:day(),week:COOP.state.week,id:NK+"a"+Date.now().toString(36)})}catch(e){}}
/* the guest applies the host's word: the holder, the flip (scene + her own choice), the result */
function apply(m){if(!S||S.dead||m.d!==day())return;
 const t=dec(m.hold);S.tonight=t;
 if(m.ntk){const who=unId(m.ntk);const v=who==="me"?null:(rivals||[]).find(z=>z&&z.id===who);S.ntk={w:day(),who,nm:who==="me"?"ngươi":(v&&v.name)||""}}
 if(!guest())return;
 if(m.nw){const w=m.nw;S.nightWhy={wk:day(),pick:unId(w.pick),flip0:unId(w.flip0),cause:w.cause,day:w.day,mood:w.mood,rows:(w.rows||[]).map(z=>Object.assign({},z,{id:unId(z.id)}))}}
 if(m.open||m.fin){S.nfF=day();S.nfP=null}
 /* the flip: the same scene on her seat, then her own choice */
 if(m.open&&!m.fin&&!X()){const x=S.nfX={d:day(),st:"open",at:Date.now()};
  const tt=tonightOf();x.t=tt?keyOf(tt):null;x.role=tt&&!(typeof ntTaken==="function"&&ntTaken())?roleOf(S,tt):null;x.fr=null;
  try{if(typeof window.cfShow==="function")window.cfShow()}catch(e){}wake()}
 if(m.fin&&S.nfFin!==day()){const x=X()||(S.nfX={d:day(),st:"done"});x.st="done";sleep();
  if(x.me===undefined){x.me=null;for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="nfch")Q.splice(i,1);TM.stop()}
  const hadMe=x.t==="me";
  /* her own results, resolved on the host (once) */
  let won=false;
  if(!S.nfR||S.nfR.d!==day())S.nfR={d:day(),k:[]};
  if(Array.isArray(m.gres))for(const g of m.gres){if(S.nfR.k.includes(g.k))continue;S.nfR.k.push(g.k);
   if(g.won){won=true;log(`Ngươi ${g.mode==="road"?"chặn ngự giá giữa đường":"sai người báo đau tim"}: Hoàng thượng sang cung ngươi.`);herWin()}
   else if(g.lost)log(stealFail(S,null,g.mode).trim())
   else if(g.txt)log(String(g.txt).replace(/^[^ ]+ [^ ]+ /,"Ngươi "))}
  const gd=m.gdef;if(gd&&gd.keep&&!S.nfR.k.includes("def")){S.nfR.k.push("def");
   log(gd.ok?"Ngươi khéo giữ chân Hoàng thượng: ai tranh đêm của ngươi cũng khó thêm "+B().keep.rung+" bậc.":"Ngươi cố giữ chân Hoàng thượng, nhưng ngài chẳng để tâm.");
   if(gd.gain){keepNoSteal(S);log(`Đêm nay không ai giành được Hoàng thượng khỏi ngươi. Sủng +${gd.gain}.`)}}
  if(hadMe&&t!=="me"&&!won){for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp"||Q[i].pid==="prep")Q.splice(i,1);
   Q.push({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng giữa đường, Hoàng thượng bị mời sang cung khác.</p>`})}
  if(t==="me"&&!won)sealMe();
  if(t==="me"&&!won&&!m.ntk&&S.nfN!==day()&&!Q.some(z=>z.pid==="ksp")&&typeof pushDil==="function"&&typeof mkP==="function")pushDil(mkP("ksp"),"Kính sự phòng báo tin");
  const w0=S.nfW===day();S.nfFin=day();RR=day();
  if(w0&&!Q.length&&(S.buoi||0)>=B4()){try{COOPW.allowN=true;nextBuoi()}catch(e){console.error(e)}finally{COOPW.allowN=false}}}
 try{if(!window.__bot&&Q.length)showModal();render()}catch(e){}}
try{if(typeof COOP==="object"&&COOP.on){
 COOP.on("act",m=>{try{const c=CO();if(!m||m.k!==NK||!c||m.from===c.seat)return;
  if(m.mode==="ask"){if(host()&&LAST&&LAST.d===day())send(LAST.ph);return}
  if(m.mode==="h"&&guest())apply(m);
  else if(m.mode==="g"&&host()&&S&&m.d===day()){
   if(m.ph==="ch"){const x=X();if(x&&x.st==="open"&&x.fr===undefined){x.fr=m.ch?VALID(m.ch.v):null;step()}return}
   if(S.nfFin===day())return;
   apply(m);send()}}catch(e){console.error(e)}});
 const re=()=>setTimeout(()=>{try{if(!CO())return;if(host()&&LAST&&LAST.d===day())send(LAST.ph);else if(guest()&&S&&(S.buoi||0)>=B4()&&S.nfFin!==day())ask()}catch(e){}},400);
 COOP.on("room",re);COOP.on("peer",on=>{if(on)re()})}}catch(e){}
window.nfSend=()=>send();/* test hook: relay the holder now */
window.nfStep=step;
window.nfDebug=()=>({on:nfOn(),host:host(),guest:guest(),nfP:S&&S.nfP,nfF:S&&S.nfF,nfC:S&&S.nfC,nfN:S&&S.nfN,nfFin:S&&S.nfFin,tonight:S&&(S.tonight==="me"?"me":S.tonight&&S.tonight.id),ntk:S&&S.ntk,x:S&&S.nfX,Q:(typeof Q!=="undefined"?Q:[]).map(m=>m&&(m.pid||m.t))});
})();
