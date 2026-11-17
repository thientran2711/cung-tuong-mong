
/* ================= j76: THE DAY IS CONTINUOUS TIME (owner 11/14) =================
   A buổi still has 4 khắc, but an act that needs more khắc than are left in this buổi is allowed when the day
   (sáng → chiều → tối) still has enough khắc: it uses up this buổi and runs on into the next one. The clock
   really turns: once the act's result is closed the normal nextBuoi runs (rivals act, places redrawn, invitations,
   curtain), and the new buổi starts with the spilled khắc already used (S.j76carry holds them until then).
   Exceptions:
   - acts bound to a window ("Chỉ buổi …" cards, a.b != null; learning with the Thái hậu, sáng only) must start
     AND finish inside that buổi: no spill, reason "không kịp xong trong buổi …";
   - tối never spills into the next day: reason "hết khắc trong ngày".
   Travel: a trip longer than the khắc left first finishes this buổi (clock turns), then she arrives in the new
   buổi with the rest of the trip already spent, meeting whoever is there in that buổi.
   NPCs never use can/spend, so they are untouched. */
function j76left(){return !S?0:(BAL.time.khac-used)+BAL.time.khac*(B4L-(S.buoi||0))}
function j76nextName(){const b=Math.min(B4L,(S.buoi||0)+1);return BUOI[b].replace("Buổi ","buổi ")}
/* would an act of c khắc started now spill into the next buổi? (only when it is allowed) */
function j76spills(c){return !!S&&!S.dead&&c>0&&used<BAL.time.khac&&used+c>BAL.time.khac&&!S.j76carry&&!window.__j76win&&(S.buoi||0)<B4L&&c<=j76left()}
/* ===== THE KHẮC NEED CHIP READS THE DAY (owner 15/11, "Khắc check must use the whole DAY's khắc") =====
   One source for every "N khắc" item of a Cần row (act cards, person acts, servant / event options): j63/j79/jclose and jtsb used
   to test used+c<=4 (this buổi only) while can() above already let the act spill. Green when it fits this buổi ("còn N") or spills
   ("sang buổi trưa"); red only when it really cannot be done, saying why in words:
   - bound to this buổi (a card with a.b, a sáng-only lesson: window w) → "không kịp xong trong buổi sáng (cần N khắc)";
   - the day is short (buổi tối never runs past the night) → "hết khắc trong ngày (cần N, còn M)";
   - 0 left / a spill already running → "hết khắc buổi này (cần N)" (the buổi turns first).
   A card bound to ANOTHER buổi gets a plain ✓ "N khắc": its own Buổi chip says why it is closed now. */
function j76arrive(c){const left=Math.max(0,BAL.time.khac-used);let b=S.buoi||0,r=c-left;while(r>0&&b<B4L){b++;r-=BAL.time.khac}return BUOI[b].replace("Buổi ","buổi ")}
function j76need(c,a,win){if(!S||S.dead||!(c>0))return{t:`${c||0} khắc`,ok:true};const left=Math.max(0,BAL.time.khac-used),b=S.buoi||0;
 if(a&&a.b!=null&&a.b!==b)return{t:`${c} khắc`,ok:true};
 if(used+c<=BAL.time.khac)return{t:`${c} khắc (còn ${left})`,ok:true};
 const w=win||(a&&a.b!=null)||window.__j76win;
 if(left<=0||S.j76carry)return{t:`hết khắc buổi này (cần ${c})`,ok:false};
 if(w)return{t:`không kịp xong trong ${BUOI[b].toLowerCase()} (cần ${c} khắc)`,ok:false};
 if(c>j76left())return{t:`hết khắc trong ngày (cần ${c}, còn ${j76left()})`,ok:false};
 return{t:`${c} khắc (sang ${j76arrive(c)})`,ok:true}}
/* ===== ONE Sức FLOOR (folds the j80 hotfix in) =====
   Sức under 5 = kiệt sức: acts of 2+ khắc wait until she rests. A card that costs Sức needs more Sức than it costs.
   Exempt: 1-khắc acts, acts that restore Sức and cost none (rest), and walking (map, visits). */
const SUC_FLOOR=BAL.time.sucMin;/* kept for old readers; the rule reads BAL.time.sucMin */
function j76isRest(a){return !!(a&&a.w&&a.w.suc>0&&!(a.c&&a.c.suc<0))}
function j76sucWhy(c){if(!S||S.dead||c<=1||window.__j76rest||window.__j76trip)return"";const cs=window.__j76cs||0;
 if(cs&&S.suc+cs<=0)return `cần Sức trên ${-cs} (có ${S.suc})`;return S.suc<BAL.time.sucMin?`kiệt sức (Sức ${S.suc}, cần ${BAL.time.sucMin}) — nghỉ ngơi trước`:""}
can=function(c){if(window.__j76paid)c=Math.max(0,c-window.__j76paid);if(!S||S.dead)return false;if(j76sucWhy(c))return false;
 if(used+c<=BAL.time.khac)return true;return j76spills(c)};

(function(){const s0=spend;spend=function(c){if(window.__j76paid){window.__j76paid=0;return}const before=used;const r=s0.apply(this,arguments);
 try{if(S&&!S.dead&&used>BAL.time.khac&&before<BAL.time.khac&&(S.buoi||0)<B4L&&!window.__j76win){S.j76carry=(S.j76carry||0)+(used-BAL.time.khac);S.j76ck=j76key();used=BAL.time.khac}}catch(e){}return r}})();
/* the clock turns: carry the spilled khắc into the new buổi; a new day drops nothing because tối never spills */
function j76key(){try{return wkKey()+"/"+(S.buoi||0)}catch(e){return String(S&&S.buoi)}}
/* co-op safety: a carry belongs to the buổi it was spent in. If the buổi changed without this wrapper (co-op re-sync sets S.buoi and
   used=0 directly), the next buổi still pays it; anything older is dropped, never charged to a later buổi. */
function j76carryFix(){try{if(!S||!S.j76carry||!S.j76ck||window.__j76nb)return;const k=j76key();if(k===S.j76ck)return;
 const [w0,b0]=S.j76ck.split("/");if(w0===wkKey()&&+b0+1===(S.buoi||0))used=Math.max(used,Math.min(BAL.time.khac,S.j76carry));S.j76carry=0;S.j76ck=""}catch(e){}}
(function(){const r0=render;render=function(){j76carryFix();return r0.apply(this,arguments)}})();
(function(){const n0=nextBuoi;nextBuoi=function(){if(!S)return n0.apply(this,arguments);const b0=S.buoi||0,c=(S.j76ck&&S.j76ck!==j76key())?0:(S.j76carry||0);if(!c&&S.j76carry){S.j76carry=0;S.j76ck=""}window.__j76nb=1;let r;try{r=n0.apply(this,arguments)}finally{window.__j76nb=0}
 try{if(c&&S&&(S.buoi||0)!==b0){if(!S.dead&&(S.buoi||0)>b0){used=Math.min(BAL.time.khac,c);S.j76carry=c>BAL.time.khac?c-BAL.time.khac:0;S.j76ck=S.j76carry?j76key():""}else{S.j76carry=0;S.j76ck=""}if(!S.dead){save();render()}}}catch(e){}return r}})();
/* why an act cannot be done now, in words */
(function(){const w0=whyTime;whyTime=function(c){if(!S||S.dead)return"";if(can(c))return"";const sw=j76sucWhy(c);if(sw)return sw;
 if(S.j76carry||used>=BAL.time.khac)return w0.call(this,c)||"hết khắc buổi này";if(used+c>BAL.time.khac&&window.__j76win)return `không kịp xong trong ${BUOI[S.buoi||0].toLowerCase()}`;
 if(used+c>BAL.time.khac)return "hết khắc trong ngày";return w0.call(this,c)}})();
function j76cap(s){return s?s[0].toUpperCase()+s.slice(1):s}
/* deck cards: a card bound to a buổi may not spill */
function j76win(a,f){const w=window.__j76win,r0=window.__j76rest,c0=window.__j76cs;window.__j76win=a&&a.b!=null?1:w;window.__j76rest=j76isRest(a)?1:0;window.__j76cs=a&&a.c&&a.c.suc<0?a.c.suc:0;
 try{return f()}finally{window.__j76win=w;window.__j76rest=r0;window.__j76cs=c0}}
/* walking is never locked by the Sức floor */
["goTo","mapHTML","seeBtn","visitBtn","goSee","visitPal"].forEach(f=>{try{const o=window[f];if(typeof o!=="function")return;window[f]=function(){const t=window.__j76trip;window.__j76trip=1;try{return o.apply(this,arguments)}finally{window.__j76trip=t}}}catch(e){}});
(function(){const cw=cardWhy;cardWhy=function(a){return j76win(a,()=>{const r=cw.apply(this,arguments);if(/^Hết khắc buổi này — chờ buổi sau$/.test(r||"")){const w=whyTime(cardCost(a));return j76cap(w)||r}return /^(không kịp xong|hết khắc trong ngày)/.test(r||"")?j76cap(r):r})}})();
/* deck cards: the spill is said once, on the Cần khắc chip (j76need: "2 khắc (sang buổi trưa)"), no second Ghi chú line */
(function(){const ch=cardH;cardH=function(a,i){return j76win(a,()=>ch.apply(this,arguments))}})();
(function(){const a0=act;act=function(i){return j76win(deck[i],()=>a0.apply(this,arguments))}})();
/* learning with the Thái hậu is a sáng-only lesson: it must finish in sáng */
(function(){const l0=lessonMode;lessonMode=function(k,mode){if(mode!=="th")return l0.apply(this,arguments);const w=window.__j76win;window.__j76win=1;try{return l0.apply(this,arguments)}finally{window.__j76win=w}}})();
(function(){const a0=artTabHTML;artTabHTML=function(){window.__j76c=2;let h=a0.apply(this,arguments);
 try{if(used+2>BAL.time.khac&&used<BAL.time.khac&&!S.j76carry){const why=(S.buoi||0)!==0?"chỉ buổi sáng":`không kịp xong trong ${BUOI[0].toLowerCase()}`;
  h=h.replace(/<button data-learn="(\w+)" data-mode="th"(?![^>]*disabled)>([^<]*)<small>([\s\S]*?)<\/small><\/button>/g,(m,k,n,sm)=>`<button data-learn="${k}" data-mode="th" disabled>${n}<small><span class="kwhy">${why}</span> ${sm.replace(/<span class="kl">ghi chú<\/span><span class="ef n">[^<]*<\/span>/,"")}</small></button>`)}}catch(e){}
 window.__j76c=0;return h}})();
/* buttons (pbtn): say honestly that an act runs into the next buổi, or why it cannot; travel arrives in the next buổi */
(function(){const p0=pbtn;pbtn=function(at,n,sm,why){let h=p0.apply(this,arguments);
 try{if(!S||S.dead)return h;const trip=/data-(see|visit|follow)=/.test(at||"");const m=String(sm||"").replace(/<[^>]+>/g,"").match(/(\d+)\s*khắc/);
  let c=m?+m[1]:(window.__j76c||window.__j76lastC||0);if(trip&&m)c=+m[1]+1;
  if(why&&/^(đến nơi sẽ hết khắc — chờ buổi sau|hết khắc buổi này|Hết khắc buổi này — chờ buổi sau|hết khắc)$/.test(why)&&c){const w=whyTime(c);if(w&&w!==why)h=h.replace(`<span class="kwhy">${why}</span>`,`<span class="kwhy">${w}</span>`)}
  else if(!why&&c&&!trip&&j76spills(c)&&!/data-kneed=/.test(h))h=h.replace(/^<button /,`<button data-kneed="${encodeURIComponent(JSON.stringify([j76need(c)]))}" `)}catch(e){}return h}})(); /* the spill is said on the kit Cần chip ("✓ 2 khắc (sang buổi trưa)"), like the deck cards */
/* a note never stays on a button that ended up greyed by a later gate (rank, access) */
["visitBtn","seeBtn"].forEach(f=>{try{const o=window[f];if(typeof o!=="function")return;window[f]=function(){const h=o.apply(this,arguments);return /^<button[^>]*\sdisabled/.test(h||"")?h.replace(/<span class="kl">ghi chú<\/span><span class="ef n">[^<]*<\/span>/,""):h}}catch(e){}});
(function(){const w0=whyTime;whyTime=function(c){window.__j76lastC=c;return w0.apply(this,arguments)}})();
(function(){const r0=renderPanel;renderPanel=function(){window.__j76lastC=0;return r0.apply(this,arguments)}})();
(function(){const g0=guessWhy;guessWhy=function(b){const r=g0.apply(this,arguments);if(r==="Sức dưới "+(BAL.time.sucMin)+"")return whyTime(2)||(S&&S.suc<BAL.time.sucMin?j76sucWhy(2):"")||r;return r}})();
/* travel: finish this buổi on the road, the clock turns, then arrive in the new buổi */
(function(){const g0=goTo;goTo=function(k){
 try{if(S&&!S.dead&&!Q.length&&!S.mg&&!S.out&&!S.confined&&k&&k!=="home"&&k!==S.place&&!S.j76carry&&!(typeof isSrv==="function"&&isSrv())&&!(window.COOPW&&COOPW.on)){
  const tc=travel(S.place,k),room=BAL.time.khac-used;
  if(tc>room&&room>0&&can(tc+1)&&!(typeof accessOf==="function"&&!accessOf(S,k).ok)){const b0=S.buoi||0;
   S.j76carry=tc-room;S.j76ck=j76key();used=BAL.time.khac;log(`Đường xa: đi hết ${BUOI[b0].toLowerCase()}, đến nơi đã sang ${j76nextName()}.`);nextBuoi();
   if(S.dead||(S.buoi||0)===b0){S.j76carry=0;return}
   const q=Q.splice(0);window.__j76paid=tc;let r;try{r=g0.apply(this,arguments)}finally{window.__j76paid=0;Q.unshift(...q)}render();return r}}}catch(e){window.__j76paid=0}
 return g0.apply(this,arguments)}})();
/* the help line for the buổi chip */
try{HX.buoi="Mỗi buổi có "+(BAL.time.khac)+" khắc, ngày có "+(B4N)+" buổi (sáng, trưa, chiều, tối). Việc cần nhiều khắc hơn số còn lại thì kéo sang buổi sau (đường xa thì đến nơi vào buổi sau); việc chỉ làm trong một buổi phải xong trong buổi ấy, và buổi tối không kéo qua đêm."}catch(e){}
/* ===== NO DEAD ENDS (owner 11/14): with any khắc left there is always something worth doing =====
   The deck is dealt once a day and each card is done once that day, the Sức floor locks 2-khắc acts, and
   bạc can run dry: so after a few acts every card went grey with khắc still left. Three standing 1-khắc acts are
   now in every day's deck, free of bạc and Sức, and come back each buổi (rest may be repeated): rest, talk with the trusted maid, read.
   A card already done shows the true reason ("Đã làm hôm nay — mai chia bài mới"); it is a per-day deck. */
function j76stand(){if(!S||S.dead)return[];const A=[{n:"Nghỉ ngơi một lát",t:"Nằm nghỉ trong tẩm cung, uống chén trà sen.",k:1,c:{},o:100,w:{suc:6},dom:"Sức khỏe",j76:1,rep:1}];
 if(!S.out&&S.maid)A.push({n:"Trò chuyện với cung nữ",t:`Ngồi nghe ${S.maid.name} kể chuyện trong cung.`,k:1,c:{},o:100,w:{maid:3},x:"có khi nghe được tin",dom:"Giao thiệp",j76:1,go:()=>{if(roll(15)){const t=liveRivals(true);if(t.length){const v=pick(t);seeLoc&&seeLoc(v);log(`${S.maid.name} kể: ${v.name} đang ở ${placeName(whereOf(v))} buổi này.`)}}}});
 A.push({n:"Đọc sách giải khuây",t:"Mở một cuốn sử, đọc vài trang bên cửa sổ.",k:1,c:{},o:100,w:{suc:2},x:"có khi Tâm cơ +1",dom:"Tài nghệ",j76:1,go:()=>{if(roll(20))apply({tamco:1})}});
 return A}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())&&Array.isArray(deck)&&!deck.some(a=>a.j76))deck.unshift(...j76stand())}catch(e){}return r}})();
/* resting can be repeated as long as khắc remain (it is never the last thing greyed) */
(function(){const a0=act;act=function(i){const a=deck[i];const r=a0.apply(this,arguments);try{if(a&&a.j76&&a.rep)a.done=0}catch(e){}return r}})();
/* the standing acts come back every buổi */
(function(){const n0=nextBuoi;nextBuoi=function(){const b0=S&&S.buoi;const r=n0.apply(this,arguments);try{if(S&&S.buoi!==b0&&Array.isArray(deck))deck.forEach(a=>{if(a.j76)a.done=0})}catch(e){}return r}})();
(function(){const cw=cardWhy;cardWhy=function(a){const r=cw.apply(this,arguments);return r==="Đã làm trong buổi này"&&!(a&&a.j76)?"Đã làm hôm nay — mai chia bài mới":r}})();
/* a loaded game gets them too (the deck is not saved) */
(function(){const r0=render;let t=0;render=function(){try{if(S&&!S.dead&&Array.isArray(deck)&&deck.length&&!deck.some(a=>a.j76)&&!(typeof isSrv==="function"&&isSrv()))deck.unshift(...j76stand())}catch(e){}return r0.apply(this,arguments)}})();
/* ===== ONE NIGHT-RECOVERY RULE (owner 11/14; folds the j80 hotfix in) =====
   endTurn's old +4 (+1 in harsh weather) stays; on top of it a night's sleep gives +14 (harsh weather +8), +6 more
   when Sức was under 30, +4 with a trusted physician (S.doctor, hers only). Same base rule for every consort.
   Applied before the night is resolved; the morning news shows the whole night's gain in green. */
function j76sleep(p){let n=(typeof harsh==="function"&&harsh())?8:14;if(p.suc<30)n+=6;if(p===S&&S.doctor)n+=4;return n}
(function(){const e0=endTurn;endTurn=function(){if(!S||S.dead||Q.length||S.mg||(typeof isSrv==="function"&&isSrv()))return e0.apply(this,arguments);
 const t0=S.turn,tu=S.tuan,s0=S.suc;S.suc=cl(S.suc+j76sleep(S),0,100);try{liveRivals(true).forEach(v=>v.suc=cl(v.suc+j76sleep(v),0,100))}catch(e){}const mid=S.suc;
 const r=e0.apply(this,arguments);
 try{if(S&&!S.dead&&(S.turn!==t0||S.tuan!==tu)){const g=Math.min(100,mid+((typeof harsh==="function"&&harsh())?1:4))-s0;if(g>0){
  log(`<span class="g">Ngủ một đêm: Sức +${g}</span>`);const line=`<p>Ngươi ngủ một đêm: <span class="g">Sức +${g}</span>${S.doctor?" (có thái y tâm phúc)":""}</p>`;
  const m=Q.find(x=>x&&/^Tin trong cung/.test(x.t||"")&&typeof x.h==="string");if(m)m.h+=line;else{try{popNum&&popNum("suc",g)}catch(e){}}}
  if(Q.length&&$("modal").hidden)showModal();render()}}catch(e){}return r}})();
