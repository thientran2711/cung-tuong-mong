/* ================= jspread: D13 SPREAD EVENTS ACROSS BUỔI (owner 15/11 ~23:20Z, dev/OWNER_DECISIONS.md "spread events across buổi") =================
   Owner: events piled up in the MORNING (everything at once). Each event gets a fitting buổi (thỉnh an + edicts morning, gossip/visits midday /
   afternoon, banquets / intrigue evening, night things at night), a per-buổi cap on popups (the rest queued to later buổi), stipend / rewards
   not all on the same morning. Measured with bots: dev/measure/spread_hist.js, report dev/PROGRESS_spread-events.md.
   How (wraps nextBuoi, showModal, save, deser, start only; edits no other module):
   - A WORLD card = a card that enters Q while the game moves to a new buổi / tuần (nextBuoi, endTurn inside it). Her own acts' cards are never moved.
   - Each new world card gets a fitting slot (SP13SLOT, by title / pid / kind) and a due buổi = that slot today (never earlier than now; a slot that
     has passed today = now). At most BAL.spread.cap world cards are shown per buổi; the rest wait for the next buổi with room (carry-over),
     oldest first. No card is ever dropped: after BAL.spread.maxWait buổi it is shown even if the buổi is full.
   - Never moved: must / ending / forced cards, the buổi's own news card, warnings and plots (time matters), festival-day flows, j68 cards it already held.
   - Saving: waiting cards made of data (pid cards, notices, data-only choices — the same rule as jqsave) are written into S.sp13.q and come back on
     load. A card whose options run code cannot be written down: it may wait at most BAL.spread.codeWait (2) buổi, and while it waits the autosave is
     held (as jqsave does for an open code card), so a reload lands before it, never after a lost card.
   - People in a card are placed at the buổi it is SHOWN: the D29 ledger (j95b) records actors and places when the card is on screen. Before a waiting
     card is shown, its actor is checked in the ledger (S.roster via j95 API): a consort no longer alive / no longer in the record makes the card
     void (its text goes to the log as a line, counted in SP13.stat.void).
   - Off: co-op room (one shared world state; the ledger is off there too), window.__spreadOff (measuring "before").
   Numbers: BAL.spread (jbal2.js). No player-visible text, no UI.
   ===================================================================================================================================== */
const SP13SLOT=[ /* [slot 0 sáng | 1 trưa | 2 chiều | 3 tối, regex on title, regex on pid] — first match wins */
 [0,/( · Lời mời| · Lễ$| · Dâng lễ|^(Tết|Tiết|Lễ|Hội) [^·]+$)/,null],
 [1,/ · (Trò vui|Đặt cược)/,null],
 [2,/ · Thi /,null],
 [0,/^(Điềm báo|Thỉnh bình an mạch|Bổng lộc tháng|Hội phối đồ: báo đề|Sắp tới|Xét phẩm|Ban cung|Lễ tấn phong|Thánh chỉ|Ý chỉ|Kính sự phòng báo tin|Tin triều đình)/,/^(kspo?)$/],
 [3,/(Mưu hại|Yến tiệc|tiệc tối|Hoàng thượng đến|Đèn nến|Hỏa hoạn|Đêm |thị tẩm|Thị tẩm|Mật hội|Hẹn hò)/,/^(e68emp|e68night)/],
 [2,/(ban thưởng|Tin đồn|Lời nhận xét|Hàng chợ đen|Bổng lộc bị cắt xén|Tai mắt báo tin|Quà tặng|Thái hậu khen|Hoàng hậu khen)/,/^(e68rumor|giftin)/],
 [1,/^(Lời cảnh báo|Có người đến|Kẻ hầu xin|Kẻ hầu|Việc của kẻ hầu|Chuyện trong cung|Một ánh mắt|Thái hậu triệu|Phụ tuyến|Việc khó xử|Lập công|Hoàng thượng)/,/^(e68|rgo?|eunuch|rcp|j71m)/]];
/* never moved: the buổi's own news card */
const SP13KEEP=/^Tin trong cung/;
/* moved only inside the same tuần (a warning must come before the plot it warns of, which resolves at the turn of the tuần) */
const SP13DAY=/^(Lời cảnh báo|Mưu hại|Sau vụ mưu hại|Điềm báo|Tai mắt báo tin)|( · Lời mời| · Lễ$| · Dâng lễ| · Trò vui| · Đặt cược| · Thi |^(Tết|Tiết|Lễ|Hội) [^·]+$)/;
/* review r1: the last buổi of this tuần, for a card that must stay in its tuần (warnings / plots / festival-day cards), else null */
function sp13End(m,now,cs){const t=String(m.t||m.title||"").replace(/<[^>]+>/g,"");return SP13DAY.test(t)?now-cs+B4N-1:null}
const SP13={vo:0,L:[],stat:{plan:0,moved:0,carried:0,released:0,forced:0,void:0,held:0,flushed:0,load:0,keep:0},nb:0,held:0,
 off(){return !!(window.__spreadOff||(window.COOPW&&COOPW.on)||!S||S.dead)},
 now(){return wk()*B4N+(S.buoi||0)},
 st(){const z=S.sp13=S.sp13||{q:[],k:-1,n:0};if(!Array.isArray(z.q))z.q=[];return z},
 waiting(m){return SP13.L.some(x=>x.m===m)},
 reset(){SP13.L=[];SP13.held=0;try{if(S)S.sp13={q:[],k:-1,n:0}}catch(e){}}};
function sp13Cap(){return BAL.spread.cap}
/* the fitting slot of a card, or null (no preference: now if there is room) */
function sp13Slot(m){const t=String(m.t||m.title||"").replace(/<[^>]+>/g,""),p=m.pid||"";for(const [s,rt,rp] of SP13SLOT)if(rt.test(t)||(p&&rp&&rp.test(p)))return s;
 /* FLIGHT-DAYQ (owner 24/11 (5)): at the first buổi of a day an unslotted world card goes to BAL.spread.dawnSlot (not at dawn, never over the book) */
 return (S&&(S.buoi||0)===0&&BAL.spread.dawnSlot!=null)?BAL.spread.dawnSlot:null}
function sp13Movable(m){if(!m||typeof m!=="object"||m.nl||m.mg||m.__held||m.kind==="news"||m.kind==="end")return false;
 if(/end|pcm|nlcard|death|tut/.test(m.cls||""))return false;
 /* OPTIONAL cards (j68 evOptional: visits, j68 events, merit, rewards …) are paced by the j68 scheduler (one at a time, 1 per buổi, 2 per day,
    held at day start); moving them too made j68 hold / drop many more of them, so D13 leaves them to j68 and only counts them in the cap */
 try{if(!window.__e68off&&typeof evOptional==="function"&&evOptional(m))return false}catch(e){}const t=String(m.t||"");if(SP13KEEP.test(t))return false;
 return true}
/* one card as save data (the same rule as serQ + jqsave), or null when it runs code */
function sp13Ser(m){try{const q0=Q;Q=[m];let r;try{r=serQ()}finally{Q=q0}return r&&r.length===1?r[0]:null}catch(e){return null}}
function sp13Code(m){return typeof jqSaveable==="function"?!jqSaveable(m):!(m.pid||!m.opts)}
/* the actor of a waiting card still in the palace? (D29 ledger: S.roster.P has every living person in the palace) */
function sp13Alive(m){try{const w=m.who&&m.who.w;if(!w||w[0]!=="r")return true;const v=RV(w[1]);if(!v||!v.alive)return false;
  const R=S.roster;if(R&&R.P&&typeof j95on==="function"&&j95on()&&!R.P["v"+v.id])return false;return true}catch(e){return true}}
/* S.sp13.q always mirrors the waiting data cards, so any ser() (save, co-op, the bots' save round trip) carries them */
function sp13Sync(){try{const z=SP13.st();z.q=SP13.L.filter(x=>!x.code).map(x=>{const e=x.ser||(x.ser=sp13Ser(x.m));return e?{e,b0:x.b0,due:x.due,end:x.end}:null}).filter(Boolean)}catch(e){}}
function sp13Load(){const z=SP13.st(),k=SP13.now();if(z.k!==k){z.k=k;z.n=0}return z}
/* cards already in Q at the front that count for this buổi */
function sp13Count(m){const z=sp13Load(),k=SP13.now();if(m.__sp13c===k)return;m.__sp13c=k;z.n++}
/* release waiting cards that are due, oldest first, while the buổi has room; a card that waited maxWait (code: codeWait) goes now anyway */
function sp13Release(){if(SP13.off()||!SP13.L.length)return 0;const now=SP13.now(),z=sp13Load(),cap=sp13Cap(),B=BAL.spread;let n=0;
 SP13.L.sort((a,b)=>(b.code?1:0)-(a.code?1:0)||a.due-b.due||a.b0-b.b0);/* code cards first: they cannot be saved, so they never wait long */const keep=[];
 for(const x of SP13.L){if(x.due>now){keep.push(x);continue}
  if(!sp13Alive(x.m)){x.m.__sp13r="void";SP13.stat.void++;try{if(typeof evDropInfo==="function")evDropInfo(x.m)}catch(e){}continue}
  const lim=x.code?B.codeWait:B.maxWait;const force=now-x.b0>=lim||(x.end!=null&&now>=x.end);
  if(z.n<cap||force){if(force&&z.n>=cap)SP13.stat.forced++;if(now>x.slotDue)SP13.stat.carried++;x.m.__sp13c=now;x.m.__sp13r="rel"+now;z.n++;Q.push(x.m);SP13.stat.released++;n++}
  else{x.due=now+1;keep.push(x)}}
 SP13.L=keep;sp13Sync();return n}
/* plan the world cards that just entered Q (called inside a buổi change) */
function sp13Plan(){if(SP13.off())return;const now=SP13.now(),cs=S.buoi||0,cap=sp13Cap(),z=sp13Load();
 /* the card on screen (if any) stays; new world cards: keep the unmovable, then the movable ones due now while there is room */
 const shown=!$("modal").hidden&&Q[0]&&Q[0].__sp13?Q[0]:null;const out=[];
 for(let i=0;i<Q.length;i++){const m=Q[i];if(!m||typeof m!=="object"||m.__sp13||m===shown)continue;m.__sp13={b0:now};SP13.stat.plan++;
  if(!sp13Movable(m)){sp13Count(m);SP13.stat.keep++;continue}
  const ps=sp13Slot(m);const due=ps!=null&&ps>cs?now+(ps-cs):now;
  const code=sp13Code(m);const lim=code?BAL.spread.codeWait:BAL.spread.maxWait;
  if(due===now&&z.n<cap){sp13Count(m);continue}
  const end=sp13End(m,now,cs);let d=due===now?now+1:Math.min(due,now+lim);if(end!=null&&d>end)d=end;if(d<=now){sp13Count(m);continue}
  out.push(i);m.__sp13.due=d;SP13.L.push({m,b0:now,due:d,slotDue:d,code,end,ser:code?null:sp13Ser(m)});SP13.stat.moved++}
 for(let j=out.length-1;j>=0;j--)Q.splice(out[j],1);if(out.length)sp13Sync()}
/* review r1 FAIL 1 (LUẬT SỬA CẢ NHÓM): the generators that run inside a buổi change gate on the queue length (j70 show70 Q>2, j68 e68Tick Q>2,
   j72 q72Tick Q>3, jpet petMonth Q>2, jkc kcWeek Q>2, jthaiy routine Q<3, j71 merit Q<=5, jreign Q<=1). Without D13 the first showModal of the
   change already sifts the queue (j68 evGate holds / drops the extra optional cards, j95b drops warnings the ledger makes false), so those gates
   see the sifted queue. D13 blocks that showModal; a blocked call now runs the same sifting, minus the "shown" marks (evGate dry), so every
   gate sees the same queue as without D13 — the cards this change really brings — and makes neither fewer nor more cards. D13 only paces. */
function sp13Pre(){if(!Q.length)return;SP13.vo=1;SP13.stat.pre=(SP13.stat.pre||0)+1;
 try{if(typeof evGate==="function")evGate(1)}catch(e){console.error("spread pre",e)}
 try{if(typeof j95bPurgeWarn==="function")j95bPurgeWarn(0)}catch(e){console.error("spread pre",e)}}
function sp13Tick(){/* inside / right after a buổi change: this buổi's own unmovable cards (news…) first, then the waiting cards that are due
   (older first), then the new movable cards (planned against what is left of the cap) */
 if(SP13.off())return;const z=SP13.st(),now=SP13.now();const fresh=Q.filter(m=>m&&typeof m==="object"&&!m.__sp13);if(z.rk===now&&!fresh.length)return;
 const old=Q.filter(m=>!fresh.includes(m));Q=old.concat(fresh.filter(m=>!sp13Movable(m)));
 for(const m of old)if(m&&typeof m==="object"&&m.__sp13)sp13Count(m);/* planned earlier, back in Q now (a card j68 held and released): counts here */sp13Plan();
 if(z.rk!==now){z.rk=now;sp13Release()}const mv=fresh.filter(m=>sp13Movable(m));Q=Q.concat(mv.filter(m=>sp13Code(m)),mv.filter(m=>!sp13Code(m)));sp13Plan()}
(function(){
 const nb0=nextBuoi;nextBuoi=function(){if(SP13.off())return nb0.apply(this,arguments);const k0=S&&SP13.now();SP13.nb++;let r;
  try{r=nb0.apply(this,arguments)}finally{SP13.nb--;if(!SP13.nb)SP13.vo=0}
  try{if(S&&!S.dead&&!SP13.off()&&SP13.now()!==k0){
   /* review r3: a module that paints the modal itself during the change (j95b after() calls its inner showModal when a false warning is
      purged and the modal READS open) leaves a card on screen; if planning moves that card, repaint so the screen shows Q[0] */
   const hd=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"hidden"),M=$("modal"),p0=M&&!hd.get.call(M)?Q[0]:null;
   sp13Tick();if(Q.length&&(M.hidden||(p0&&Q[0]!==p0)))showModal()}}catch(e){console.error("spread",e)}return r};
 /* during the buổi change the cards arrive in several batches (endTurn, news, j70, j68 …): nothing is shown until the change is over,
    then the whole batch is planned at once and the first card shown. Each blocked call still runs the queue's show-time sifting (sp13Pre) and
    from the first card on the modal reads as open to the game code (SP13.vo, a JS-only view of M.hidden: no DOM change, nothing painted), so the
    callers that skip showModal while a card is open skip it here too and the sifting runs at the same calls as without D13 */
 try{const M=$("modal"),hd=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"hidden");if(M&&hd&&hd.get)Object.defineProperty(M,"hidden",{configurable:true,
  get(){return SP13.vo?false:hd.get.call(this)},set(v){hd.set.call(this,v)}})}catch(e){console.error("spread",e)}
 const sm0=showModal;showModal=function(){if(SP13.nb&&S&&!S.dead&&!SP13.off()&&(SP13.vo||$("modal").hidden)){sp13Pre();return}return sm0.apply(this,arguments)};
 /* save: data cards written into S.sp13.q; a waiting code card holds the autosave (jqsave rule) */
 const sv0=save;save=function(){if(!S||quiet||S.dead||SP13.off())return sv0.apply(this,arguments);
  if(SP13.L.some(x=>x.code)){SP13.held=1;SP13.stat.held++;return}SP13.held=0;
  sp13Sync();return sv0.apply(this,arguments)};
 const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(SP13.held&&S&&!S.dead&&!quiet&&!SP13.L.some(x=>x.code)){SP13.held=0;SP13.stat.flushed++;save()}}catch(e){}return r};
 /* load: rebuild the waiting list from the save (old saves: none) */
 const ds0=deser;deser=function(){const id0=S&&S.sp13&&S.sp13.id,all=SP13.L.slice();const r=ds0.apply(this,arguments);try{SP13.L=[];SP13.held=0;const z=S&&S.sp13;
   if(z&&z.id&&z.id===id0){SP13.L=all;return r}/* same life still in memory (co-op rejoin, a save round trip): the waiting cards stay as they are */if(z&&Array.isArray(z.q))for(const x of z.q){const c=deserQ([x.e])[0];
   if(c){c.__sp13={b0:x.b0};SP13.L.push({m:c,b0:x.b0,due:x.due,slotDue:x.due,code:false,end:x.end==null?null:x.end,ser:x.e});SP13.stat.load++}}}catch(e){console.error("spread load",e)}return r};
 const st0=start;start=function(){SP13.L=[];SP13.held=0;const r=st0.apply(this,arguments);try{if(S)S.sp13={q:[],k:-1,n:0,id:Date.now().toString(36)+R(1e6)}}catch(e){}return r};
})();
window.SP13=SP13;
