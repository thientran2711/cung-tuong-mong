/* ================= jsfx — ÂM THANH SỰ KIỆN (sfx owner 11/15, review/sfx) — dev/audio/SFX_PLAN.md =================
   ONE table: SFXN (j11) maps every MOMENT → file (audio/<file>.mp3). Here it grows from 15 to every moment of the game; SFXL holds the
   layer of each file (ui = small taps, panels, minigame strokes: quieter; ev = events) and an optional gain trim.
   kitSfx(moment, {rate, g, at}) plays a moment; every older call (sfx(file), feedback(kind)) still works and goes through the same mixer:
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
/* "sfx-x" / "vo-x" / "bgm-x" = a file; a moment key ("tap") = its file; any other stem ("learn-good") = "sfx-"+stem */
function ksfxFile(n){n=String(n);if(/^(sfx|vo|bgm)-/.test(n))return n;return SFXN[n]||("sfx-"+n)}
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
 petFox:"sfx-pet-fox",petWeasel:"sfx-pet-weasel",petDeer:"sfx-pet-deer",
 /* main 15/11 (game-feel, gift-chest, econ-stipend, poison-gift, promo-exam, toilette, festivals): every FX kind has a sound; kitLose by why */
 verdict:"sfx-gloom",harm:"sfx-expose",ink:"sfx-notice",preg:"sfx-bloom",favour:"sfx-lot-good",death:"sfx-death-bell",demote:"sfx-gloom",ash:"sfx-gloom",
 mgwin:"sfx-learn-good",mglose:"sfx-learn-bad",lantern:"sfx-festival",lock:"sfx-lock",
 lidPouch:"sfx-tray-open",fade:"sfx-close",coinOut:"sfx-buy",skim:"sfx-item-lose",confiscate:"sfx-confiscate",search:"sfx-search",
 rob:"sfx-item-lose",extort:"sfx-item-lose",giftBack:"sfx-close",poisonFound:"sfx-expose",schemeOk:"sfx-scheme",
 examPass:"sfx-rank-new",examFail:"sfx-fail",rite:"sfx-rite",festival:"sfx-festival",
 birds:"sfx-wx-birds",cicada:"sfx-wx-cicada",crickets:"sfx-wx-crickets",
 mgStep:"sfx-step",mgFlower:"sfx-mg-brush",mgPuff:"sfx-mg-brush",mirror:"sfx-notice"});
/* layer + trim per file: ui = ×0.5 of the slider; g = extra gain (the files are equal loudness, g only shapes the mix) */
const SFXL={"sfx-tap":{ui:1},"sfx-page":{ui:1},"sfx-open":{ui:1},"sfx-close":{ui:1},"sfx-lock":{ui:1},"sfx-step":{ui:1},"sfx-notice":{ui:1,g:1.4},
 "sfx-mg-pluck":{ui:1,g:1.5},"sfx-mg-miss":{ui:1},"sfx-mg-stone":{ui:1,g:1.3},"sfx-mg-needle":{ui:1},"sfx-mg-brush":{ui:1},"sfx-mg-throw":{ui:1,g:1.3},
 "sfx-mg-arrow":{ui:1,g:1.3},"sfx-mg-fire":{ui:1},"sfx-item-pop":{g:.8},"sfx-item-fly":{g:.7},"sfx-coin-bounce":{g:.8},"sfx-chest-rattle":{g:.9},"sfx-cane":{g:1.4},"sfx-tablet-flip":{g:1.4},"sfx-tablet-shuffle":{g:1.4},"sfx-xam-drop":{g:1.3},
 "sfx-rain":{g:.6},"sfx-wx-birds":{g:.6},"sfx-wx-cicada":{g:.5},"sfx-wx-crickets":{g:.6},"sfx-step":{ui:1},"sfx-wind":{g:.6},"sfx-snow":{g:.6},"sfx-thunder":{g:.8},"sfx-firecracker":{g:.8},"sfx-banquet":{g:.7}};
for(const k of Object.keys(SFXN))if(/^sfx-pet-/.test(SFXN[k]))SFXL[SFXN[k]]={g:.8};
/* ---- the mixer (replaces j11 sfx; same name, every caller keeps working) ---- */
function ksfxBusy(){const now=performance.now();KSFX.live=KSFX.live.filter(v=>!v.a.ended&&!v.a.paused&&now<v.until);let n=KSFX.live.length;
 try{if(typeof VO!=="undefined"&&VO.cur&&!VO.cur.paused&&!VO.cur.ended)n++}catch(e){}return n}
sfx=function(n,o){o=o||{};if(!n)return false;n=ksfxFile(n);if(!auOk())return ksfxDrop(n,"off");if(ksfxMgOnce()&&!o.m&&(n==="sfx-learn-good"||n==="sfx-learn-bad"))return ksfxDrop(n,"result-once");if(window.__bot||(typeof quiet!=="undefined"&&quiet))return ksfxDrop(n,"quiet");
 const L=SFXL[n]||{},ui=!!L.ui,now=performance.now();if(now-(KSFX.last[n]||-1e9)<90)return ksfxDrop(n,"twice");
 if(ksfxBusy()>=3){if(ui)return ksfxDrop(n,"full");const v=KSFX.live.find(x=>x.ui)||KSFX.live.find(x=>now-x.t0>500);if(!v)return ksfxDrop(n,"full");try{v.a.pause()}catch(e){}KSFX.live.splice(KSFX.live.indexOf(v),1)}
 try{const vol=Math.max(0,Math.min(1,OPT.sfx*(ui?.5:1)*(L.g||1)*(o.g||1)));let b=null,dur=0,web=0;
  /* WebAudio first (iPhone ignores element.volume): a decoded buffer through a GainNode; until it is decoded the HTMLAudio clone plays */
  const cx=AU.ctx,buf=cx&&cx.state==="running"?auBuf(n):null;
  if(buf){try{const src=cx.createBufferSource(),g=cx.createGain();src.buffer=buf;g.gain.value=vol;if(o.rate&&o.rate!==1)src.playbackRate.value=o.rate;src.connect(g);g.connect(cx.destination);
   b={ended:false,paused:false,pause(){this.paused=true;try{src.stop()}catch(e){}}};src.onended=()=>{b.ended=true};src.start();web=1;dur=buf.duration*1000/(o.rate||1)+80}catch(e){b=null}}
  if(!b){let a=AU.cache[n];if(a&&a.dead&&now-(a.deadT||(a.deadT=now))>4000){a=null}if(!a){a=AU.cache[n]=mkAudio(n,false)}if(!a||a.dead)return ksfxDrop(n,"dead");b=a.cloneNode();
   b.volume=vol;
   if(o.rate&&o.rate!==1){try{b.preservesPitch=false;b.mozPreservesPitch=false;b.webkitPreservesPitch=false}catch(e){}b.playbackRate=o.rate}
   dur=(a.duration&&isFinite(a.duration)?a.duration*1000/(o.rate||1):2200)+80}
  KSFX.last[n]=now;KSFX.live.push({a:b,ui,t0:now,until:now+dur});
  KSFX.log.push({n,m:o.m||"",ui:ui?1:0,t:Math.round(now),w:web});if(KSFX.log.length>400)KSFX.log.splice(0,100);
  if(!web){const p=b.play();if(p&&p.catch)p.catch(()=>{})}
  if(!ui){AU.duck=.45;if(AU.cur)AU.cur.volume=musVol();clearTimeout(AU.dt);AU.dt=setTimeout(()=>{AU.duck=1;if(AU.cur)AU.cur.volume=musVol()},Math.min(2200,dur))}
  return true}catch(e){return ksfxDrop(n,"err "+e.message)}};
function kitSfx(m,o){const f=SFXN[m];if(!f)return false;o=o||{};if(o.at){setTimeout(()=>sfx(f,Object.assign({m},o,{at:0})),o.at);return true}return sfx(f,Object.assign({m},o))}
window.kitSfx=kitSfx;window.SFXN=SFXN;window.SFXL=SFXL;
/* words on a card the player reads → the matching sound (first match; one per card). Sounds only, never a voice: voices follow the card's
   tone in j36 (voTone). Whole words where a syllable also lives inside other words (tát ≠ Bồ tát, trượng ≠ trượng phu). */
const SFXTXT=[[/bị phạt quỳ|phạt quỳ|quỳ ngoài sân|quỳ trước|quỳ suốt|quỳ đến/i,"kneel"],[/\d+ trượng|(đánh|ăn|chịu|phạt)[^.]{0,14}trượng|đánh đòn|ăn roi|vả miệng/iu,"cane"],[kRx("(?<!\\p{L})(?<!bồ\\s)tát(?!\\p{L})","iu"),"cane"],
 [/cấm túc/i,"doorShut"],[/tịch thu|sung công/i,"confiscate"],[/soát phòng|lục soát|soát quà|khám xét/i,"search"],[/bị cướp|giật lấy|giật mất|bị trộm|lấy cắp/i,"rob"],
 [/thu hồi|lấy mất|đánh mất|mất món/i,"itemLose"],[/sảy thai|mất con|hư thai/i,"wither"],[/kim bạc (hóa |chuyển |đổi )?(đen|màu)|có độc|bị bỏ độc|phát hiện (ra )?độc|thử độc thấy/i,"poisonFound"],
 [/trả lại quà|gửi trả|không dám nhận|khước từ món quà/i,"giftBack"],[/cắt xén|bớt xén|ăn bớt|cắt bớt bổng/i,"skim"],
 [/khỏi bệnh|bình phục|lành bệnh|khỏe lại/i,"heal"],[/lâm bệnh|ngã bệnh|nhiễm phong hàn|cảm mạo|sốt cao|ốm nặng/i,"sick"],
 [/yến tiệc|dự yến|ban yến|gia yến|cung yến/i,"banquet"],[/đốt pháo|pháo nổ|giao thừa/i,"firecracker"],[/đến thăm|ghé thăm|sang thăm|có người đến/i,"visitor"],
 [/dâng hương|thắp hương|lễ Phật|niệm Phật|tụng kinh|tế lễ|tế tổ|lễ tế|bái tổ|cầu phúc|lễ tạ|tế trời|tế Thái miếu/i,"rite"]];
function ksfxText(t){t=String(t||"").replace(/<[^>]+>/g," ");for(const [re,k] of SFXTXT)if(re.test(t))return k;return null}
/* weather kind (j12 S.wx.k) → sound */
const SFXWX={rain:"rain",storm:"thunder",wind:"wind",leaf:"wind",petal:"wind",snow:"snow",snowh:"snow",snowp:"snow",frost:"snow",sun:"birds",mist:"birds",dust:"birds"};
const SFXWXN={"hoa đào bay":"wind","mưa phùn":"rain","sương sớm":"birds","trời quang":"birds","nắng gắt":"cicada","ve kêu râm ran":"cicada","giông tố":"thunder",
 "đom đóm":"crickets","lá phong rơi":"wind","nắng vàng":"birds","gió heo may":"wind","trăng rằm":"crickets","tuyết nhẹ":"snow","tuyết dày":"snow","sương giá":"snow","mai nở trong tuyết":"snow"};
Object.assign(SFXWX,{cloud:"wind"});Object.assign(SFXWXN,{"trời âm u":"wind","mưa rào":"rain","mưa thu":"rain","gió lớn":"wind","gió bấc":"wind","sương mù":"wind"});  /* weather-khac day states */
function ksfxWx(w){return w?(SFXWXN[w.n]||SFXWXN[w.b]||SFXWX[w.k]||null):null}
/* festival (j31 FEST + festivals JSON) → sound: new year nights = firecrackers, solemn days = the rite, the rest = the festive drum */
const SFXFEST={newyear:"firecracker",giaothua:"firecracker",nguyentieu:"firecracker",thanhminh:"rite",trungcuu:"rite",dongchi:"rite",vulan:"rite",hanthuc:"rite"};
function ksfxFest(k){return k?(SFXFEST[k]||"festival"):null}
/* pets (review/pets, jpet PET keys) → sound */
const SFXPET={meomuop:"petCat",meo:"petCat",batu:"petCat",cho:"petDog",sutu:"petDog",tekhuyen:"petDog",hoami:"petBird",sao:"petMyna",vet:"petParrot",
 tho:"petRabbit",cavang:"petFish",cachep:"petFish",uyenuong:"petDuck",rua:"petTurtle",linhquy:"petTurtle",ngua:"petHorse",khongtuoc:"petPeacock",
 bachkt:"petPeacock",bachac:"petCrane",caotuyet:"petFox",tuyetdieu:"petWeasel",bachloc:"petDeer"};
/* minigame stroke per kind (j82/j91 KG82_KIND keys): the touch that IS the move */
const SFXMG={co:["down","mgStone"],theu:["down","mgNeedle"],kim:["up","mgNeedle"],ve:["down","mgBrush"],hoa:["down","mgFlower"],mua:["down","mgStep"],hat:["down","mgPluck"],tho:["down","mgBrush"],doi:["down","mgBrush"],kinh:["down","mgBrush"],chai:["down","mgBrush"],huong:["down","mgPuff"],may:["down","mgNeedle"],dauho:["up","mgThrow"],ban:["down","mgArrow"],banh:["down","mgFire"]};
/* how each minigame kind sounds, by its engine (j82 KG82_KIND[k].e; exam kinds of jexam too): stroke · scored word (kg82Pop by colour) · end */
const SFXMGE={rhythm:"mgPluck",go:"mgStone",aim:"mgThrow",pattern:"mgBrush",steps:"mgStep",quiz:"tap",lay:"mgStone",sort:"mgStone",seat:"mgStone",clue:"tap"};
function ksfxMgStroke(k){const m=SFXMG[k];if(m)return m[1];try{const e=KG82_KIND[k]&&KG82_KIND[k].e;return SFXMGE[e]||null}catch(x){return null}}
window.SFXTXT=SFXTXT;window.SFXWX=SFXWX;window.SFXWXN=SFXWXN;window.SFXFEST=SFXFEST;window.ksfxWx=ksfxWx;window.ksfxFest=ksfxFest;window.SFXPET=SFXPET;window.SFXMG=SFXMG;window.SFXMGE=SFXMGE;window.ksfxMgStroke=ksfxMgStroke;
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
 /* the result card sound (seal + win / fail / expose / scheme + the card's own word) lives in kitResultSfx below, wrapped on resultShow itself (not on kitResultFx, which only runs when kmOn) */
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
 /* --- podium (j90): the gong, then her place (top three = a new honour) --- */
 W("kitPodiumShow",o=>function(list){const r=o.apply(this,arguments);try{if(r){KSFX.podAt=performance.now();kitSfx("podium");const L=Array.isArray(list)?list:[];const i=L.findIndex(x=>x&&x.who===S);
   if(i>=0&&i<3)kitSfx("rankNew",{at:1300})}}catch(e){}return r});
 /* --- page turns of the books (jbook §34) --- */
 W("kitSheetTurn",o=>function(){try{kitSfx("turn")}catch(e){}return o.apply(this,arguments)});
 /* --- minigames: the running kind, notes, hit / miss words, one stroke per move --- */
 W("kg82Play",o=>function(kind){KSFX.mg=kind||"";KSFX.mgShown=0;return o.apply(this,arguments)});
 W("kg82Close",o=>function(){KSFX.mg="";return o.apply(this,arguments)});
 const RATE=[1,1.122,1.26,1.498,1.682,2];
 W("kg82Pluck",o=>function(i,ok){try{if(typeof auOk==="function"&&auOk()&&!(AU.cache["sfx-mg-pluck"]&&AU.cache["sfx-mg-pluck"].dead)){KSFX.mgT=performance.now();
    if(ok)kitSfx("mgPluck",{rate:RATE[Math.abs(i|0)%5]});else kitSfx("mgMiss");return}}catch(e){}return o.apply(this,arguments)});
 W("kg82Pop",o=>function(list,x,y,t,col){const r=o.apply(this,arguments);try{if(performance.now()-(KSFX.mgT||0)>120){const s=String(t||"");
   const C=v=>{try{return String(kg82Col(v,"")).replace(/\s/g,"").toLowerCase()}catch(e){return""}},c=String(col||"").replace(/\s/g,"").toLowerCase();
   if(c&&(c===C("--red")||c==="#c23b22"))kitSfx("mgMiss");else if(c&&(c===C("--good")||c==="#2d7a52"))kitSfx("itemPop",{rate:1.12});
   else if(/Trượt|Lệch|Hết giờ|Chưa|Không có|sai|chưa đều|Hụt/i.test(s))kitSfx("mgMiss");
   else if(/Tuyệt|Hồng tâm|Trúng giữa|Đúng cả|Đẹp lắm|Giải đúng|Gỡ xong|Vừa lửa|liền|Ăn \d/i.test(s))kitSfx("itemPop",{rate:1.12});
   else kitSfx("mgPluck",{rate:1.26})}}catch(e){}return r});
 const mgStroke=ph=>e=>{try{if(!KSFX.mg||!e.target||!e.target.closest||!e.target.closest(".kgbox canvas,.kgbox"))return;const m=SFXMG[KSFX.mg]||(()=>{const k=ksfxMgStroke(KSFX.mg);return k&&k!=="tap"&&k!=="mgPluck"?["down",k]:null})();if(m&&m[0]===ph)kitSfx(m[1],{rate:.94+Math.random()*.12})}catch(x){}};
 document.addEventListener("pointerdown",mgStroke("down"),{capture:true,passive:true});document.addEventListener("pointerup",mgStroke("up"),{capture:true,passive:true});
 /* --- a locked button: a muted knock (jfx shakes it and shows the reason) --- */
 let lk=0;document.addEventListener("pointerdown",e=>{try{const t=e.target&&e.target.closest&&e.target.closest('button:disabled,.kdis,[aria-disabled="true"]');if(!t||!t.closest('button,.btn,.kbtn,.opt,.card,[role="button"]'))return;
   const n=Date.now();if(n-lk<350)return;lk=n;kitSfx("lock")}catch(x){}},{capture:true,passive:true});
 /* --- panels (kit sheets, pop cards) open / close --- */
 try{new MutationObserver(ms=>{for(const m of ms){for(const n of m.addedNodes){if(n.nodeType===1&&n.matches&&n.matches(".kpanel,#kpop,.kpop")&&!n.closest("#modal"))kitSfx("open")}
   for(const n of m.removedNodes){if(n.nodeType===1&&n.matches&&n.matches(".kpanel,#kpop,.kpop")&&!n.closest("#modal"))kitSfx("close")}}}).observe(document.body,{childList:true})}catch(e){}
 /* --- game-feel / gift-chest modules (when present): their gain / loss pieces get the sound too --- */
 const late=()=>{/* kitGain (jfx) plays its own grade sound on reveal + itemFly on Nhận */
  W("kitLose",o=>function(x,op){const r=o.apply(this,arguments);try{op=op||{};if(x&&!Array.isArray(x)&&typeof x==="object"&&x.bac!=null&&!x.k){ksfxOnce("coinOut");return r}
    const m=ksfxLoseKey(op);if(m)ksfxOnce(m)}catch(e){}return r});
  W("kitCoins",o=>function(dir){const r=o.apply(this,arguments);try{if(dir==="out")ksfxOnce("coinOut")}catch(e){}return r});
  W("kitFx",o=>function(kind){const r=o.apply(this,arguments);try{if((kind==="mgwin"||kind==="mglose")&&ksfxMgOnce()){KSFX.mgShown=0;return r}if(SFXN[kind]&&!SFXFX_SKIP.test(kind))kitSfx(kind,{g:kind==="lantern"?.7:1})}catch(e){}return r});
  W("exDone",o=>function(p,res){const r=o.apply(this,arguments);try{if(p===S&&res)kitSfx(res.pass?"examPass":"examFail",{at:200})}catch(e){}return r});
  W("petAdd",o=>function(p,t){const r=o.apply(this,arguments);try{if(r&&me(p)&&SFXPET[t])kitSfx(SFXPET[t],{at:400})}catch(e){}return r})};
 late();KSFX.late=late;
 /* --- pets: a tap on a pet picture --- */
 document.addEventListener("click",e=>{try{const im=e.target&&e.target.closest&&e.target.closest('img[src*="pet-"],[data-pet]');if(!im)return;
   const k=(im.dataset&&im.dataset.pet)||((im.getAttribute("src")||"").match(/pet-([a-z]+)\.webp/)||[])[1];if(k&&SFXPET[k])kitSfx(SFXPET[k])}catch(x){}},true);
 /* --- the weather chip (j93 kitWxChip): tap = the weather's own sound --- */
 document.addEventListener("click",e=>{try{if(e.target&&e.target.closest&&e.target.closest(".kmwx")&&S&&S.wx){const k=ksfxWx(S.wx);if(k)kitSfx(k)}}catch(x){}},true);
 /* --- co-op: the friend comes into the room --- */
 setInterval(()=>{try{if(typeof COOP==="undefined"||!COOP||!COOP.state||!COOP.other)return;const s=COOP.state,x=COOP.other(),p=s.seats&&x&&s.seats[x];const on=!!(p&&p.online);
   if(on&&KSFX.coop===false)kitSfx("join");KSFX.coop=on}catch(e){}},1000);
 /* --- render: state diff (her own state only; a loaded save only takes a snapshot) --- */
 W("render",o=>function(){const r=o.apply(this,arguments);try{ksfxDiff()}catch(e){console.error(e)}if(!KSFX.lateDone){KSFX.lateDone=1;try{late()}catch(e){}}return r})})();
/* ============ ONE RESULT SOUND (review/result-sfx) ============
   Every result the player sees plays exactly ONE result sound, once, whatever path made it:
   - result card (resultShow, all wrappers j19/j25/j63/j65/jaudit/...): seal stamp, then win / fail / expose / scheme (+ the card's own word) — on resultShow itself, independent of kmOn;
   - minigame result panel (kg82ShowRes(html, ok): contest j82, lesson/work j82 playArt, grooming j92, exam round jexam, toilette jtoil, tsGame jts):
     ok=true -> mgwin, ok=false -> mglose, ok=null/undefined -> no sound (exam final: exDone owns it; contest podium: kitPodiumShow owns it);
   kitResultSfx(ok,o) drops a second call within 1.5 s (KSFX.rsDrop counts them), so no path can double. Legacy j11 openMG feedback(good/bad) right after a panel is dropped too. */
KSFX.rs=-1e9;KSFX.rsDrop=0;KSFX.rsLog=[];
function kitResultSfx(ok,o){o=o||{};const now=performance.now();
 if(ok!==true&&ok!==false)return false;
 if(now-KSFX.rs<1500){KSFX.rsDrop++;return false}KSFX.rs=now;KSFX.rsLog.push({ok,src:o.src||"",t:Math.round(now)});if(KSFX.rsLog.length>200)KSFX.rsLog.splice(0,50);
 const red=typeof kmReduced==="function"&&kmReduced();
 if(o.mg){kitSfx(ok?"mgwin":"mglose",{m:"result"});return true}
 kitSfx("seal",{at:red?0:280,m:"result"});kitSfx(ksfxOutcome(ok,o.text),{at:red?60:520,m:"result"});const k=ksfxText(o.text);if(k)kitSfx(k,{at:red?120:900,m:"result"});return true}
/* a minigame panel sounded < 2 min ago: the old openMG feedback("good"/"bad") that follows the "Đã hiểu" tap (sfx + kitFx mgwin / mglose) must stay silent; consumed by kitFx */
function ksfxMgOnce(){return KSFX.mgShown&&performance.now()-KSFX.mgShown<120000}
window.kitResultSfx=kitResultSfx;
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function"||o.__ksfx)return false;const w=f(o);w.__ksfx=1;window[n]=w;return true};
 const RS=o=>function(){const t0=window.__rtT;const r=o.apply(this,arguments);try{const t=document.getElementById("rtoast");
   if(t&&t.classList.contains("on")&&window.__rtT!==t0&&!window.__bot)kitResultSfx(t.classList.contains("ok"),{text:t.textContent,src:"card"})}catch(e){console.error(e)}return r};
 W("resultShow",RS);
 /* jaudit (loaded before this file) replays a held / late result card through window.__aaR0 = the resultShow it wrapped, i.e. BELOW the wrapper above: wrap that entry too (its own closure keeps the unwrapped one, so no card is wrapped twice) */
 W("__aaR0",RS);
 W("kg82ShowRes",o=>function(html,ok){const p0=KSFX.podAt||0;const r=o.apply(this,arguments);try{if(ok===true||ok===false){if((KSFX.podAt||0)!==p0)KSFX.rs=performance.now();/* the podium sounded: it is this contest's result sound */
    else if(kitResultSfx(ok,{mg:1,src:"mg"}))KSFX.mgShown=performance.now()}}catch(e){console.error(e)}return r});
})();
/* one sound for a moment that two paths announce (sellItem then kitLose "sell"; buy then kitCoins "out"): skip when the same file played < 1.5 s ago */
/* kitFx kinds whose sound another path owns: the result card (kitResultFx: seal + outcome), the locked button (pointerdown) */
const SFXFX_SKIP=/^(win|fail|expose|verdict|lock)$/;
function ksfxOnce(m,o){const f=SFXN[m];if(!f)return false;if(performance.now()-(KSFX.last[f]||-1e9)<1500)return false;return kitSfx(m,o)}
/* KIT §54.2 kitLose why / title → moment */
const SFXLOSE={sell:"sell",give:"give",fade:"fade"},SFXLOSET={"Bị tịch thu":"confiscate","Bị soát phòng":"search","Soát ra đồ bẩn":"search","Bị cướp":"rob","Bị lấy trộm":"rob","Bị ép giao đồ":"extort","Mất đồ":"itemLose"};
function ksfxLoseKey(o){o=o||{};const w=o.why||"lose";if(SFXLOSE[w])return SFXLOSE[w];return SFXLOSET[o.title]||"itemLose"}
window.SFXLOSE=SFXLOSE;window.SFXLOSET=SFXLOSET;window.ksfxLoseKey=ksfxLoseKey;
let KSFXS=null,KSFXP=null;
function ksfxSnap(){let fest=null;try{fest=typeof festToday==="function"&&festToday()}catch(e){}
 return{conf:S.confined||0,ill:!!(S.ill||(S.sick||0)>0),preg:!!S.preg,kids:(S.kids||[]).length,wx:S.wx&&S.wx.k,wxn:S.wx&&S.wx.n,fest:fest?fest.k:"",out:!!S.out,dead:!!S.dead}}
function ksfxDiff(){if(typeof S==="undefined"||!S)return;if(KSFXP!==S||!KSFXS){KSFXP=S;KSFXS=ksfxSnap();return}const a=KSFXS,b=ksfxSnap();KSFXS=b;if(b.dead||window.__bot)return;
 if(b.conf>a.conf&&!b.out)kitSfx("doorShut");
 if(b.ill&&!a.ill)kitSfx("sick",{at:300});else if(!b.ill&&a.ill)kitSfx("heal",{at:300});
 if(a.preg&&!b.preg&&b.kids<=a.kids)kitSfx("wither",{at:200});
 if(b.wxn&&b.wxn!==a.wxn){const k=ksfxWx(S.wx);if(k)kitSfx(k,{at:900})}
 if(b.fest&&b.fest!==a.fest){const k=ksfxFest(b.fest);if(k)kitSfx(k,{at:1600})}}
/* the outcome sound of a result card (KIT §7 THÀNH / HỎNG): exposure and dark schemes have their own sound */
const SFXEXPOSE=/bị lộ|bị phát giác|lộ tẩy|bị bắt quả tang|truy ra|lần ra (ngươi|kẻ)|định tội/i,SFXSCHEME=/hạ độc|bỏ độc|đầu độc|hãm hại|vu oan|vu cáo|gài bẫy|ly gián|trúng kế/i;
function ksfxOutcome(ok,t){t=String(t||"");if(!ok&&SFXEXPOSE.test(t))return"expose";if(ok&&SFXSCHEME.test(t))return"schemeOk";return ok?"win":"fail"}
window.ksfxOutcome=ksfxOutcome;
/* the fortune tube: shake → stick lands → the lot word (good bell / bad wooden fish) */
function ksfxXam(x,lot){if(!x||x.dataset.ksfx)return;x.dataset.ksfx=1;const skip=x.classList.contains("km-skip");
 let kd=0;try{kd=parseFloat(getComputedStyle(x).getPropertyValue("--kd"))||0}catch(e){}kd*=1000;
 const good=typeof LVB!=="undefined"&&lot&&LVB[lot.lv]>0,bad=typeof LVB!=="undefined"&&lot&&(LVB[lot.lv]<0||(lot.dom==="Hung"&&lot.lv>=3));
 if(!skip){kitSfx("xamShake",{at:kd});kitSfx("xamDrop",{at:kd+1350})}
 if(good||bad)kitSfx(good?"lotGood":"lotBad",{at:skip?0:kd+1700})}
/* the reward box: watch its steps (j93 adds km-shake → km-open → km-done; km-fast = all at once) */
function ksfxReward(ov){const root=ov&&ov.querySelector(".kmrew");if(!root)return;const kind=(root.className.match(/kmrew-(\w+)/)||[])[1]||"chest";
 const lid=SFXBOX[kind]||"lidChest";const head=(root.querySelector(".kmrew-h")||{}).textContent||"";
 if(kind==="gift"||kind==="tray"||kind==="pouch")kitSfx("notice",{at:200});
 let seen="";const mo=new MutationObserver(()=>{const c=root.className;
  if(/km-shake/.test(c)&&!/s/.test(seen)){seen+="s";kitSfx("rattle",{g:kind==="tray"||kind==="pouch"?.6:1})}
  if(/km-open/.test(c)&&!/o/.test(seen)){seen+="o";kitSfx(lid);if(SFXTXT.find(x=>x[1]==="skim")[0].test(head))kitSfx("skim",{at:500})}
  if(/km-fast/.test(c)&&!/f/.test(seen)){seen+="f";kitSfx("itemPop")}});
 mo.observe(root,{attributes:true,attributeFilter:["class"]});
 const take=root.querySelector(".kmtake");if(take)take.addEventListener("click",()=>{kitSfx("take");mo.disconnect()},true)}
/* box kind (j93 KM_BOX) → lid sound */
const SFXBOX={tray:"lidTray",chest:"lidChest",royal:"lidRoyal",gift:"lidGift",pouch:"lidPouch"};window.SFXBOX=SFXBOX;
