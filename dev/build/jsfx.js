/* ================= jsfx — ÂM THANH SỰ KIỆN (sfx owner 11/15, review/sfx) — dev/audio/SFX_PLAN.md =================
   ONE table: SFXN (j11) maps every MOMENT → file (audio/<file>.mp3). Here it grows from 15 to every moment of the game; SFXL holds the
   layer of each file (ui = small taps, panels, minigame strokes: quieter; ev = events) and an optional gain trim.
   kitSfx(moment, {rate, g, at}) plays a moment; every older call (sfx("sfx-x"), feedback(kind)) still works and goes through the same mixer:
     - the "Tiếng" switch (OPT.snd / OPT.mute) and the "Tiếng động" slider (OPT.sfx) — nothing plays while sound is off or the tab is hidden;
     - UI sounds at ×0.5 of the slider, events at ×1 (files are normalised to the same loudness: max momentary −16 LUFS, peak −1.5 dBFS);
     - at most 3 sounds at once (voices of j36 count): a 4th UI sound is dropped, a 4th event sound stops the oldest UI sound, else the oldest event sound that has played > 0.5 s (the new moment wins), else it is dropped;
     - the same file twice within 90 ms plays once (wrappers that meet on one moment never double it);
     - bots (window.__bot) and quiet code paths: silent. Music ducks only under event sounds.
   Wiring (all by wrapping shared functions; no caller changes): motion pieces (j93 kmStage / kitXamPlay / kitResultFx / kitCalendar /
   kitDayShift / kitFlyItem / kitFlipNote / kitAlarm), the reward box steps (shake, lid, items, coins, Nhận), shop (buy, sellItem, wkSell,
   giveTo), takeItem, closeModal, podium (kitPodiumShow), page turns (kitSheetTurn), minigames (kg82Play / kg82Pluck / kg82Pop + a stroke
   per game), locked buttons, panels, weather / festival / sick / heal / miscarriage / confinement (state diff after render), card words
   (quỳ, trượng, tịch thu, yến…), co-op friend joining, pets (review/pets: petAdd + tap on a pet picture), kitGain / kitLose / kitFx
   (review/gift-chest, review/game-feel) when those modules are present.
   Test hook: window.KSFX {log:[{n,m,ui,t}], on, live}. */
const KSFX=window.KSFX={log:[],drop:[],live:[],last:{},mg:"",on:true};
function ksfxDrop(n,why){KSFX.drop.push({n,why,t:Math.round(performance.now())});if(KSFX.drop.length>300)KSFX.drop.splice(0,100);return false}
/* ---- THE TABLE: moment → file (existing keys of j11 kept: tap, open, coin, decree, promote, poison, expose, birth, night, page, step, good, bad, verdict, hit) ---- */
Object.assign(SFXN,{
 /* giao diện */
 close:"sfx-close",lock:"sfx-lock",tab:"sfx-page",turn:"sfx-page",notice:"sfx-notice",
 /* mua bán, của cải */
 buy:"sfx-buy",sell:"sfx-sell",give:"sfx-item-fly",itemFly:"sfx-item-fly",itemLose:"sfx-item-lose",coinBounce:"sfx-coin-bounce",
 /* ban thưởng, quà (mâm, rương, rương rồng phượng, hộp gấm) */
 rattle:"sfx-chest-rattle",lidTray:"sfx-tray-open",lidChest:"sfx-chest-open",lidRoyal:"sfx-chest-royal",lidGift:"sfx-gift-open",
 itemPop:"sfx-item-pop",itemRare:"sfx-item-rare",take:"sfx-reward-take",
 /* phẩm vị, phạt */
 edict:"sfx-edict-unroll",gloom:"sfx-gloom",doorShut:"sfx-door-shut",kneel:"sfx-kneel",cane:"sfx-cane",
 /* thị tẩm, quẻ, kết quả */
 tabletShuffle:"sfx-tablet-shuffle",tabletFlip:"sfx-tablet-flip",xamShake:"sfx-xam-shake",xamDrop:"sfx-xam-drop",lotGood:"sfx-lot-good",lotBad:"sfx-lot-bad",
 seal:"sfx-seal-stamp",win:"sfx-win",fail:"sfx-fail",
 /* thời gian */
 buoi:"sfx-buoi-bell",nightWatch:"sfx-night-watch",week:"sfx-week-drum",
 /* thân thể, sinh tử */
 bloom:"sfx-bloom",wither:"sfx-wither",sick:"sfx-sick",heal:"sfx-heal",death:"sfx-death-bell",alarm:"sfx-alarm",
 /* trò nhỏ */
 mgPluck:"sfx-mg-pluck",mgMiss:"sfx-mg-miss",mgStone:"sfx-mg-stone",mgNeedle:"sfx-mg-needle",mgBrush:"sfx-mg-brush",mgThrow:"sfx-mg-throw",
 mgArrow:"sfx-mg-arrow",mgFire:"sfx-mg-fire",mgwin:"sfx-learn-good",mglose:"sfx-learn-bad",podium:"sfx-podium",rankNew:"sfx-rank-new",
 /* lễ tết, yến, khách, hảo hữu */
 firecracker:"sfx-firecracker",banquet:"sfx-banquet",visitor:"sfx-visitor",join:"sfx-join",
 /* thời tiết */
 rain:"sfx-rain",wind:"sfx-wind",snow:"sfx-snow",thunder:"sfx-thunder",
 /* thú nuôi (review/pets) */
 petCat:"sfx-pet-cat",petDog:"sfx-pet-dog",petBird:"sfx-pet-bird",petMyna:"sfx-pet-myna",petParrot:"sfx-pet-parrot",petRabbit:"sfx-pet-rabbit",
 petFish:"sfx-pet-fish",petDuck:"sfx-pet-duck",petTurtle:"sfx-pet-turtle",petHorse:"sfx-pet-horse",petPeacock:"sfx-pet-peacock",petCrane:"sfx-pet-crane",
 petFox:"sfx-pet-fox",petWeasel:"sfx-pet-weasel",petDeer:"sfx-pet-deer"});
/* layer + trim per file: ui = ×0.5 of the slider; g = extra gain (the files are equal loudness, g only shapes the mix) */
const SFXL={"sfx-tap":{ui:1},"sfx-page":{ui:1},"sfx-open":{ui:1},"sfx-close":{ui:1},"sfx-lock":{ui:1},"sfx-step":{ui:1},"sfx-notice":{ui:1,g:1.4},
 "sfx-mg-pluck":{ui:1,g:1.5},"sfx-mg-miss":{ui:1},"sfx-mg-stone":{ui:1,g:1.3},"sfx-mg-needle":{ui:1},"sfx-mg-brush":{ui:1},"sfx-mg-throw":{ui:1,g:1.3},
 "sfx-mg-arrow":{ui:1,g:1.3},"sfx-mg-fire":{ui:1},"sfx-item-pop":{g:.8},"sfx-item-fly":{g:.7},"sfx-coin-bounce":{g:.8},"sfx-chest-rattle":{g:.9},"sfx-cane":{g:1.4},"sfx-tablet-flip":{g:1.4},"sfx-tablet-shuffle":{g:1.4},"sfx-xam-drop":{g:1.3},
 "sfx-rain":{g:.6},"sfx-wind":{g:.6},"sfx-snow":{g:.6},"sfx-thunder":{g:.8},"sfx-firecracker":{g:.8},"sfx-banquet":{g:.7}};
for(const k of Object.keys(SFXN))if(/^sfx-pet-/.test(SFXN[k]))SFXL[SFXN[k]]={g:.8};
/* ---- the mixer (replaces j11 sfx; same name, every caller keeps working) ---- */
function ksfxBusy(){const now=performance.now();KSFX.live=KSFX.live.filter(v=>!v.a.ended&&!v.a.paused&&now<v.until);let n=KSFX.live.length;
 try{if(typeof VO!=="undefined"&&VO.cur&&!VO.cur.paused&&!VO.cur.ended)n++}catch(e){}return n}
sfx=function(n,o){o=o||{};if(!n)return false;if(!auOk())return ksfxDrop(n,"off");if(window.__bot||(typeof quiet!=="undefined"&&quiet))return ksfxDrop(n,"quiet");
 const L=SFXL[n]||{},ui=!!L.ui,now=performance.now();if(now-(KSFX.last[n]||-1e9)<90)return ksfxDrop(n,"twice");
 if(ksfxBusy()>=3){if(ui)return ksfxDrop(n,"full");const v=KSFX.live.find(x=>x.ui)||KSFX.live.find(x=>now-x.t0>500);if(!v)return ksfxDrop(n,"full");try{v.a.pause()}catch(e){}KSFX.live.splice(KSFX.live.indexOf(v),1)}
 try{let a=AU.cache[n];if(a&&a.dead&&now-(a.deadT||(a.deadT=now))>4000){a=null}if(!a){a=AU.cache[n]=mkAudio(n,false)}if(!a||a.dead)return ksfxDrop(n,"dead");const b=a.cloneNode();
  b.volume=Math.max(0,Math.min(1,OPT.sfx*(ui?.5:1)*(L.g||1)*(o.g||1)));
  if(o.rate&&o.rate!==1){try{b.preservesPitch=false;b.mozPreservesPitch=false;b.webkitPreservesPitch=false}catch(e){}b.playbackRate=o.rate}
  KSFX.last[n]=now;const dur=(a.duration&&isFinite(a.duration)?a.duration*1000/(o.rate||1):2200)+80;KSFX.live.push({a:b,ui,t0:now,until:now+dur});
  KSFX.log.push({n,m:o.m||"",ui:ui?1:0,t:Math.round(now)});if(KSFX.log.length>400)KSFX.log.splice(0,100);
  const p=b.play();if(p&&p.catch)p.catch(()=>{});
  if(!ui){AU.duck=.45;if(AU.cur)AU.cur.volume=musVol();clearTimeout(AU.dt);AU.dt=setTimeout(()=>{AU.duck=1;if(AU.cur)AU.cur.volume=musVol()},Math.min(2200,dur))}
  return true}catch(e){return ksfxDrop(n,"err "+e.message)}};
function kitSfx(m,o){const f=SFXN[m];if(!f)return false;o=o||{};if(o.at){setTimeout(()=>sfx(f,Object.assign({m},o,{at:0})),o.at);return true}return sfx(f,Object.assign({m},o))}
window.kitSfx=kitSfx;window.SFXN=SFXN;window.SFXL=SFXL;
/* words on a card the player reads → the matching sound (first match; one per card). Sounds only, never a voice: voices follow the card's
   tone in j36 (voTone). Whole words where a syllable also lives inside other words (tát ≠ Bồ tát, trượng ≠ trượng phu). */
const SFXTXT=[[/bị phạt quỳ|phạt quỳ|quỳ ngoài sân|quỳ trước|quỳ suốt|quỳ đến/i,"kneel"],[/\d+ trượng|(đánh|ăn|chịu|phạt)[^.]{0,14}trượng|đánh đòn|ăn roi|vả miệng|(?<!\p{L})(?<!bồ\s)tát(?!\p{L})/iu,"cane"],
 [/cấm túc/i,"doorShut"],[/tịch thu|thu hồi|lấy mất|bị trộm|đánh mất|mất món|soát quà/i,"itemLose"],[/sảy thai|mất con|hư thai/i,"wither"],
 [/khỏi bệnh|bình phục|lành bệnh|khỏe lại/i,"heal"],[/lâm bệnh|ngã bệnh|nhiễm phong hàn|cảm mạo|sốt cao|ốm nặng/i,"sick"],
 [/yến tiệc|dự yến|ban yến|gia yến|cung yến/i,"banquet"],[/đốt pháo|pháo nổ|giao thừa/i,"firecracker"],[/đến thăm|ghé thăm|sang thăm|có người đến/i,"visitor"]];
function ksfxText(t){t=String(t||"").replace(/<[^>]+>/g," ");for(const [re,k] of SFXTXT)if(re.test(t))return k;return null}
/* weather kind (j12 S.wx.k) → sound */
const SFXWX={rain:"rain",storm:"thunder",wind:"wind",leaf:"wind",snow:"snow",snowh:"snow",snowp:"snow",frost:"snow"};
/* pets (review/pets, jpet PET keys) → sound */
const SFXPET={meomuop:"petCat",meo:"petCat",batu:"petCat",cho:"petDog",sutu:"petDog",tekhuyen:"petDog",hoami:"petBird",sao:"petMyna",vet:"petParrot",
 tho:"petRabbit",cavang:"petFish",cachep:"petFish",uyenuong:"petDuck",rua:"petTurtle",linhquy:"petTurtle",ngua:"petHorse",khongtuoc:"petPeacock",
 bachkt:"petPeacock",bachac:"petCrane",caotuyet:"petFox",tuyetdieu:"petWeasel",bachloc:"petDeer"};
/* minigame stroke per kind (j82/j91 KG82_KIND keys): the touch that IS the move */
const SFXMG={co:["down","mgStone"],theu:["down","mgNeedle"],kim:["up","mgNeedle"],ve:["down","mgBrush"],dauho:["up","mgThrow"],ban:["down","mgArrow"],banh:["down","mgFire"]};
window.SFXTXT=SFXTXT;window.SFXWX=SFXWX;window.SFXPET=SFXPET;window.SFXMG=SFXMG;
/* ---------- wiring ---------- */
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function"||o.__ksfx)return false;const w=f(o);w.__ksfx=1;window[n]=w;return true};
 const me=p=>typeof S!=="undefined"&&S&&(p===S||typeof p==="string");
 /* --- motion pieces: a sound at each beat, timed to j93's CSS --- */
 W("kmStage",o=>function(cls,html){const st=o.apply(this,arguments);try{const red=st.ov.classList.contains("km-red");const h=String(html||"");
   if(/km-tablet/.test(cls)){kitSfx("tabletShuffle");kitSfx("tabletFlip",{at:red?0:850})}
   else if(/km-edict/.test(cls)){kitSfx("edict",{at:red?0:300});kitSfx("itemPop",{at:red?0:1500,rate:1.25})}
   else if(/km-gloom/.test(cls)){kitSfx("gloom");if(/lãnh cung/i.test(h))kitSfx("doorShut",{at:red?0:700})}
   else if(/km-bloom/.test(cls)){kitSfx("bloom")}
   else if(/km-inkov/.test(cls)){kitSfx("death")}
   else if(/km-reward/.test(cls))ksfxReward(st.ov)}catch(e){console.error(e)}return st});
 W("kitFlipNote",o=>function(p){const r=o.apply(this,arguments);try{if(p&&p!==S)kitSfx("notice",{at:120})}catch(e){}return r});
 W("kitXamPlay",o=>function(el,lot){const x=o.apply(this,arguments);try{ksfxXam(x,lot)}catch(e){}return x});
 W("kitResultFx",o=>function(card){const r=o.apply(this,arguments);try{if(card){const ok=card.classList.contains("ok");const red=typeof kmReduced==="function"&&kmReduced();
   kitSfx("seal",{at:red?0:280});kitSfx(ok?"win":"fail",{at:red?60:520});const k=ksfxText(card.textContent);if(k)kitSfx(k,{at:red?120:900})}}catch(e){}return r});
 W("kitCalendar",o=>function(){const r=o.apply(this,arguments);try{kitSfx("week");kitSfx("turn",{at:350})}catch(e){}return r});
 /* the week book (j87 Sổ tuần) shows the lot as a page, without j93's tube: the lot's bell / wooden fish after the calendar */
 W("dawn",o=>function(){const r=o.apply(this,arguments);try{const w=document.getElementById("dawn");if(w&&S&&S.lot&&!w.querySelector(".kmxam")&&typeof LVB!=="undefined"){
   const good=LVB[S.lot.lv]>0,bad=LVB[S.lot.lv]<0||(S.lot.dom==="Hung"&&S.lot.lv>=3);if(good||bad)kitSfx(good?"lotGood":"lotBad",{at:1500})}}catch(e){}return r});
 W("kitDayShift",o=>function(){const r=o.apply(this,arguments);try{const night=typeof B4L!=="undefined"&&S&&(S.buoi||0)===B4L;kitSfx(night?"nightWatch":"buoi")}catch(e){}return r});
 W("kitFlyItem",o=>function(k){const r=o.apply(this,arguments);try{if(k)kitSfx("itemFly",{at:150})}catch(e){}return r});
 W("kitAlarm",o=>function(){const r=o.apply(this,arguments);try{kitSfx("alarm")}catch(e){}return r});
 /* the lot shown again inside a card (Gieo lại, Phật đường): j93 swaps the old .xam for the kit tube */
 W("showModal",o=>function(){const r=o.apply(this,arguments);try{const x=document.querySelector("#modal .kmxam:not([data-ksfx])");if(x&&typeof S!=="undefined"&&S&&S.lot)ksfxXam(x,S.lot);
   const m=typeof Q!=="undefined"&&Q[0];if(m&&m!==KSFX.card){KSFX.card=m;const k=ksfxText((m.t||"")+" "+(m.h||""));if(k)kitSfx(k,{at:220})}}catch(e){}return r});
 /* --- closing a card: a soft silk swish when nothing follows --- */
 W("closeModal",o=>function(){const r=o.apply(this,arguments);try{setTimeout(()=>{const md=document.getElementById("modal");if(!md||md.hidden||!(typeof Q!=="undefined"&&Q.length))kitSfx("close")},30)}catch(e){}return r});
 /* --- shop and things --- */
 W("buy",o=>function(p,k){const r=o.apply(this,arguments);try{if(r&&me(p))kitSfx("buy")}catch(e){}return r});
 W("sellItem",o=>function(p){const r=o.apply(this,arguments);try{if(r&&me(p))kitSfx("sell")}catch(e){}return r});
 W("wkSell",o=>function(p){const r=o.apply(this,arguments);try{if(r&&me(p))kitSfx("sell")}catch(e){}return r});
 W("giveTo",o=>function(a){const r=o.apply(this,arguments);try{if(r&&me(a))kitSfx("give")}catch(e){}return r});
 W("takeItem",o=>function(p){const r=o.apply(this,arguments);try{if(r&&me(p))kitSfx("itemLose")}catch(e){}return r});
 /* --- podium (j90): the gong, then her place (top three = a new honour) --- */
 W("kitPodiumShow",o=>function(list){const r=o.apply(this,arguments);try{if(r){kitSfx("podium");const L=Array.isArray(list)?list:[];const i=L.findIndex(x=>x&&x.who===S);
   if(i>=0&&i<3)kitSfx("rankNew",{at:1300})}}catch(e){}return r});
 /* --- page turns of the books (jbook §34) --- */
 W("kitSheetTurn",o=>function(){try{kitSfx("turn")}catch(e){}return o.apply(this,arguments)});
 /* --- minigames: the running kind, notes, hit / miss words, one stroke per move --- */
 W("kg82Play",o=>function(kind){KSFX.mg=kind||"";return o.apply(this,arguments)});
 W("kg82Close",o=>function(){KSFX.mg="";return o.apply(this,arguments)});
 const RATE=[1,1.122,1.26,1.498,1.682,2];
 W("kg82Pluck",o=>function(i,ok){try{if(typeof auOk==="function"&&auOk()&&!(AU.cache["sfx-mg-pluck"]&&AU.cache["sfx-mg-pluck"].dead)){KSFX.mgT=performance.now();
    if(ok)kitSfx("mgPluck",{rate:RATE[Math.abs(i|0)%5]});else kitSfx("mgMiss");return}}catch(e){}return o.apply(this,arguments)});
 W("kg82Pop",o=>function(list,x,y,t){const r=o.apply(this,arguments);try{if(performance.now()-(KSFX.mgT||0)>120){const s=String(t||"");
   if(/Trượt|Lệch|Hết giờ|Chưa|Không có|sai|chưa đều|Hụt/i.test(s))kitSfx("mgMiss");
   else if(/Tuyệt|Hồng tâm|Trúng giữa|Đúng cả|Đẹp lắm|Giải đúng|Gỡ xong|Vừa lửa|liền|Ăn \d/i.test(s))kitSfx("itemPop",{rate:1.12});
   else kitSfx("mgPluck",{rate:1.26})}}catch(e){}return r});
 const mgStroke=ph=>e=>{try{if(!KSFX.mg||!e.target||!e.target.closest||!e.target.closest(".kgbox canvas,.kgbox"))return;const m=SFXMG[KSFX.mg];if(m&&m[0]===ph)kitSfx(m[1],{rate:.94+Math.random()*.12})}catch(x){}};
 document.addEventListener("pointerdown",mgStroke("down"),{capture:true,passive:true});document.addEventListener("pointerup",mgStroke("up"),{capture:true,passive:true});
 /* --- a locked button: a muted knock (jfx shakes it and shows the reason) --- */
 let lk=0;document.addEventListener("pointerdown",e=>{try{const t=e.target&&e.target.closest&&e.target.closest('button:disabled,.kdis,[aria-disabled="true"]');if(!t||!t.closest('button,.btn,.kbtn,.opt,.card,[role="button"]'))return;
   const n=Date.now();if(n-lk<350)return;lk=n;kitSfx("lock")}catch(x){}},{capture:true,passive:true});
 /* --- panels (kit sheets, pop cards) open / close --- */
 try{new MutationObserver(ms=>{for(const m of ms){for(const n of m.addedNodes){if(n.nodeType===1&&n.matches&&n.matches(".kpanel,#kpop,.kpop")&&!n.closest("#modal"))kitSfx("open")}
   for(const n of m.removedNodes){if(n.nodeType===1&&n.matches&&n.matches(".kpanel,#kpop,.kpop")&&!n.closest("#modal"))kitSfx("close")}}}).observe(document.body,{childList:true})}catch(e){}
 /* --- game-feel / gift-chest modules (when present): their gain / loss pieces get the sound too --- */
 const late=()=>{W("kitGain",o=>function(){const r=o.apply(this,arguments);try{kitSfx("itemPop")}catch(e){}return r});
  W("kitLose",o=>function(){const r=o.apply(this,arguments);try{kitSfx("itemLose")}catch(e){}return r});
  W("kitFx",o=>function(kind){const r=o.apply(this,arguments);try{if(kind==="lantern")kitSfx("firecracker",{g:.6})}catch(e){}return r});
  W("petAdd",o=>function(p,t){const r=o.apply(this,arguments);try{if(r&&me(p)&&SFXPET[t])kitSfx(SFXPET[t],{at:400})}catch(e){}return r})};
 late();KSFX.late=late;
 /* --- pets: a tap on a pet picture --- */
 document.addEventListener("click",e=>{try{const im=e.target&&e.target.closest&&e.target.closest('img[src*="pet-"],[data-pet]');if(!im)return;
   const k=(im.dataset&&im.dataset.pet)||((im.getAttribute("src")||"").match(/pet-([a-z]+)\.webp/)||[])[1];if(k&&SFXPET[k])kitSfx(SFXPET[k])}catch(x){}},true);
 /* --- the weather chip (j93 kitWxChip): tap = the weather's own sound --- */
 document.addEventListener("click",e=>{try{if(e.target&&e.target.closest&&e.target.closest(".kmwx")&&S&&S.wx&&SFXWX[S.wx.k])kitSfx(SFXWX[S.wx.k])}catch(x){}},true);
 /* --- co-op: the friend comes into the room --- */
 setInterval(()=>{try{if(typeof COOP==="undefined"||!COOP||!COOP.state||!COOP.other)return;const s=COOP.state,x=COOP.other(),p=s.seats&&x&&s.seats[x];const on=!!(p&&p.online);
   if(on&&KSFX.coop===false)kitSfx("join");KSFX.coop=on}catch(e){}},1000);
 /* --- render: state diff (her own state only; a loaded save only takes a snapshot) --- */
 W("render",o=>function(){const r=o.apply(this,arguments);try{ksfxDiff()}catch(e){console.error(e)}if(!KSFX.lateDone){KSFX.lateDone=1;try{late()}catch(e){}}return r})})();
let KSFXS=null,KSFXP=null;
function ksfxSnap(){let fest=null;try{fest=typeof festToday==="function"&&festToday()}catch(e){}
 return{conf:S.confined||0,ill:!!(S.ill||(S.sick||0)>0),preg:!!S.preg,kids:(S.kids||[]).length,wx:S.wx&&S.wx.k,wxn:S.wx&&S.wx.n,fest:fest?fest.k:"",out:!!S.out,dead:!!S.dead}}
function ksfxDiff(){if(typeof S==="undefined"||!S)return;if(KSFXP!==S||!KSFXS){KSFXP=S;KSFXS=ksfxSnap();return}const a=KSFXS,b=ksfxSnap();KSFXS=b;if(b.dead||window.__bot)return;
 if(b.conf>a.conf&&!b.out)kitSfx("doorShut");
 if(b.ill&&!a.ill)kitSfx("sick",{at:300});else if(!b.ill&&a.ill)kitSfx("heal",{at:300});
 if(a.preg&&!b.preg&&b.kids<=a.kids)kitSfx("wither",{at:200});
 if(b.wxn&&b.wxn!==a.wxn&&SFXWX[b.wx])kitSfx(SFXWX[b.wx],{at:900});
 if(b.fest&&b.fest!==a.fest&&/newyear|nguyentieu/.test(b.fest))kitSfx("firecracker",{at:1600})}
/* the fortune tube: shake → stick lands → the lot word (good bell / bad wooden fish) */
function ksfxXam(x,lot){if(!x||x.dataset.ksfx)return;x.dataset.ksfx=1;const skip=x.classList.contains("km-skip");
 let kd=0;try{kd=parseFloat(getComputedStyle(x).getPropertyValue("--kd"))||0}catch(e){}kd*=1000;
 const good=typeof LVB!=="undefined"&&lot&&LVB[lot.lv]>0,bad=typeof LVB!=="undefined"&&lot&&(LVB[lot.lv]<0||(lot.dom==="Hung"&&lot.lv>=3));
 if(!skip){kitSfx("xamShake",{at:kd});kitSfx("xamDrop",{at:kd+1350})}
 if(good||bad)kitSfx(good?"lotGood":"lotBad",{at:skip?0:kd+1700})}
/* the reward box: watch its steps (j93 adds km-shake → km-open → km-done; km-fast = all at once) */
function ksfxReward(ov){const root=ov&&ov.querySelector(".kmrew");if(!root)return;const kind=(root.className.match(/kmrew-(\w+)/)||[])[1]||"chest";
 const lid={tray:"lidTray",chest:"lidChest",royal:"lidRoyal",gift:"lidGift"}[kind]||"lidChest";const T=[];const at=(ms,f)=>T.push(setTimeout(f,ms));
 const items=[...root.querySelectorAll(".kmitems .kmit:not(.kmcoin)")];const coin=!!root.querySelector(".kmitems .kmcoin");
 if(kind==="gift"||kind==="tray")kitSfx("notice",{at:200});
 let seen="";const mo=new MutationObserver(()=>{const c=root.className;
  if(/km-shake/.test(c)&&!/s/.test(seen)){seen+="s";kitSfx("rattle",{g:kind==="tray"?.6:1})}
  if(/km-open/.test(c)&&!/o/.test(seen)){seen+="o";kitSfx(lid);
   items.forEach((it,i)=>{const t=+((it.className.match(/\bt(\d)\b/)||[])[1]||0);at(260+i*180,()=>{if(/km-fast/.test(root.className))return;kitSfx(t>=3?"itemRare":"itemPop",{rate:1+i*.06})})});
   if(coin)at(260+items.length*180,()=>kitSfx("coinBounce"))}
  if(/km-fast/.test(c)&&!/f/.test(seen)){seen+="f";T.forEach(clearTimeout);const best=items.reduce((m,it)=>Math.max(m,+((it.className.match(/\bt(\d)\b/)||[])[1]||0)),0);kitSfx(best>=3?"itemRare":"itemPop");if(coin)kitSfx("coinBounce",{at:120})}});
 mo.observe(root,{attributes:true,attributeFilter:["class"]});
 const take=root.querySelector(".kmtake");if(take)take.addEventListener("click",()=>{kitSfx("take");mo.disconnect();T.forEach(clearTimeout)},true)}
