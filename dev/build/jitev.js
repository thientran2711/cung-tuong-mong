/* ================= jitev — ITEMS IN EVENTS (owner 15/11 ~18:10Z, review/item-events) — KIT §64 (coordinator registry) =================
   Owner rule: every event where an ITEM appears that could come into her hands (a letter delivered, a gift offered, a found object, a confiscated
   thing returned, a bribe, a poisoned dish, a token…) shows that ITEM'S ICON in the event dialog (kit item frame kitItem with its grade, in the
   banner / info area), and the choices act on it with an animation:
     keep  (nhận / giữ / cất / đọc…)       → the item flies into Tư trang (kitGain fly path, KIT §54) — a REAL entry in S.inv
     back  (trả lại / gửi trả / từ chối…)  → the item flies back to the giver (the person of the dialog)
     give  (dâng / trình / nộp / giao…)     → the item flies to that person (the dialog's person when named, else away up)
     burn · tear · smash · pour · well · bury → the item is destroyed on the spot (paper curls + embers + ash · torn in two · shatters ·
           tipped and poured out · thrown in an arc into water with ripples · sinks under a mound of earth)
     use   (uống / ăn / thoa…)              → the item glows and dissolves into motes
   ONE engine, read in one place (showModal + chooseM):
     ievOf(m)  → {I: kitItemInfo, e: entry|null, key, acts:[act per option], who} for the dialog m (Q[0]) — resolvers in order:
                 m.item (explicit) · IEV_PID[pid](pp, m) (gift / poisoned dish / goods events / story beats) · nouns in the dialog text (IEV_NOUN)
                 with at least one option acting on the item (IEV_VERB on the option name). Same function = the scan (dev/test/item-events-scan.js).
     kitItemTag(I) → the kit item frame (kitItem md, grade colour + grade word) placed on the event banner (bottom-right) or, without a banner,
                 at the top of the text column (§64.1).
     kitItemFx(act, I, {from, to, done}) → the animation (§64.2). Off: "Cảnh động" off / reduced motion → no flight (the item still goes into
                 Tư trang); bots / quiet → nothing. Any tap during an animation finishes it at once (catcher layer, pointer-events auto).
   Story items that had no IT entry (letters, notes, tokens…) are real IT items now (IEV_IT, art img/item-<k>.webp, gpt-2-6).
   Old saves: nothing stored (the dialog is resolved from pid + pp, which old saves already keep); new IT keys only add. */
try{BAL.itev=Object.assign({keep:900,back:1000,burn:1400,tear:1100,smash:1100,pour:1200,well:1300,bury:1300,use:900},BAL.itev||{})}catch(e){}
const IEV=window.IEV={log:[],cur:null,hold:null,claim:new WeakSet(),run:[]};
/* ---------- story items (gpt-2-6 sheet TdS42S9VNR, cut 88 %, CDN) ---------- */
const IEV_IT={
 thu:{n:"Bức thư",kd:"Thư từ",d:"Thư tay gửi đến ngươi · giữ làm kỷ niệm",g:0},
 matthu:{n:"Mật thư",kd:"Thư từ",d:"Thư niêm sáp đỏ · bị soát ra là rắc rối",g:1},
 giaymat:{n:"Mảnh giấy nhắn",kd:"Thư từ",d:"Mẩu giấy gấp nhỏ, chữ viết vội",g:0},
 tinvat:{n:"Tín vật",kd:"Kỷ vật",d:"Vật làm tin của người xưa",g:1},
 khantay:{n:"Khăn tay lụa",kd:"Kỷ vật",d:"Khăn lụa thêu một cành mai",g:0},
 chenthuoc:{n:"Chén thuốc",kd:"Thuốc",d:"Một chén thuốc sắc còn ấm",g:0},
 batcanh:{n:"Bát canh",kd:"Điểm tâm",d:"Bát canh hầm táo đỏ, hạt sen",g:0},
 sachchep:{n:"Tập sách chép tay",kd:"Thư từ",d:"Tập giấy khâu chỉ, chữ chép tay",g:0},
 canhhoa:{n:"Cành hoa ép",kd:"Kỷ vật",d:"Cành hoa khô ép giữa trang giấy",g:0},
 hinhnhan:{n:"Hình nhân bùa ngải",kd:"Vật chứng",d:"Hình nhân cắm kim, bùa vàng · bị soát ra là tội bùa ngải",g:0,il:1},
 lenhbai:{n:"Lệnh bài",kd:"Kỷ vật",d:"Thẻ gỗ viền vàng, ra vào cửa cung",g:1}};
for(const k in IEV_IT){const x=IEV_IT[k];if(!IT[k])IT[k]={n:x.n,kd:x.kd,d:x.d,pr:0,tg:[],story:1,il:x.il||undefined};try{if(!(k in ITEM_ART_G))ITEM_ART_G[k]=x.g}catch(e){}}
/* ---------- nouns in the dialog text → item (specific first) ---------- */
const IEV_NOUN=[
 [/mật thư|thư mật|mật ước|mật hàm|mật tín|thư niêm/i,"matthu"],
 [/thư nhà|thư của (mẹ|cha|phụ thân|mẫu thân|huynh|ca ca|tỷ)/i,"thunha"],
 [/mảnh giấy|mẩu giấy|tờ giấy nhỏ|mảnh thư/i,"giaymat"],
 [/bức thư|lá thư|phong thư|thư tay|tờ thư|thư không ký|hồi âm|bức hòa thư|thư (cầu|xin|tình|riêng|của)/i,"thu"],
 [/bài thơ|tờ thơ/i,"giaymat"],[/tập thơ|bản thảo|quyển sách|bộ sách|sách chép|quốc sách/i,"sachchep"],[/cành hoa|hoa ép|hoa khô/i,"canhhoa"],
 [/tín vật/i,"tinvat"],[/lệnh bài|kim bài/i,"lenhbai"],[/ngọc bội/i,"ngocboi"],
 [/khăn tay|khăn lụa/i,"khantay"],[/túi thơm|túi hương/i,"tuithom"],[/hình nhân|bùa (chú|ngải)/i,"hinhnhan"],
 [/bát thuốc|chén thuốc|thang thuốc/i,"chenthuoc"],[/bát canh|bát chè|chén chè|canh hầm|chén canh/i,"batcanh"],
 [/hộp điểm tâm|hộp mứt|đĩa bánh|bánh trái/i,"banhtrai"],[/bình rượu|vò rượu|hũ rượu/i,"ruoucuc"],
 [/cây trâm|chiếc trâm/i,"tramngoc"],[/chiếc vòng/i,"vongngoc"],[/bức tranh|bức họa/i,"tranhco"],
 [/tập chứng cứ|xấp chứng cứ|cuốn sổ|sổ sách|sổ nợ|giấy nợ|văn tự/i,"chungcu"],
 [/(đốt|giữ|dâng|xé|trả|nhận|cất|đọc|mở|gửi|trình|nộp) (lại |hết |cả )?(bức |lá |phong )?thư|thư từ/i,"thu"],[/(đốt|giữ|cất|trả|ném|giặt) (lại |chiếc )?khăn|chiếc khăn/i,"khantay"],[/túi bạc|nén bạc|thỏi bạc|hộp vàng bạc|đút lót|hối lộ/i,"vangbac"]];
/* ---------- option name → what it does to the item (earliest verb in the name wins) ---------- */
const IEV_VERB=[["burn",kRx("(?<!đã )(đốt|thiêu|châm lửa|hơ (lên )?lửa)","i")],["tear",/(^|\s)xé(?=\s|,|$)/i],["smash",/đập (vỡ|nát|bỏ|tan)|bẻ gãy|bẻ đôi|nghiền nát|đánh vỡ|ném vỡ/i],
 ["pour",/đổ (đi|bỏ|xuống|ra)|hắt (đi|bỏ)/i],["well",/giếng|(ném|thả|vứt) (xuống|vào) (hồ|sông|ao)|xuống hồ|xuống sông/i],["bury",/chôn(?! chặt)/i],
 ["back",/trả (lại|về)(?! cho)|gửi trả|đưa trả|hoàn trả/i],["refuse",/từ chối|khước từ|không nhận|chối từ/i],
 ["give",/dâng|trình (lên|với)?|(^|\s)nộp|giao (cho|nộp|lại|ra)|đưa (cho|lên|tới|đến)|chuyển (cho|tới)|tặng lại|đem (đến|tới|cho|lên)|mang (đến|tới|lên|cho)|chia cho|trả (\S+ ){0,2}cho/i],
 ["use",/(^|\s)uống|ăn (ngay|hết|thử|luôn)|nếm|thoa lên|dùng ngay/i],
 ["keep",kRx("(?<!vờ)(?:^|\\s)nhận(?! (lỗi|tội|sai|phạt|việc|lời|lệnh|thật|ra|nuôi|xét))","i")],/* lookbehind leading (kRx, Safari < 16.4) */
 ["keep",kRx("(^|\\s)giữ(?! (kín|phép|mình|lễ|lời|khoảng|bí mật|miệng|im|thể diện|đèn|gìn|ý|chừng|nghiêm))|(^|\\s)cất(?! (lời|tiếng|bước))|mở (thư|ra|xem)|(^|\\s)đọc|nhặt|cầm lấy|lấy (thư|lại|về|sổ|khăn)|xem thư|đeo|cài lên","i")]];
/* option names whose first verb is not what happens to the item shown (the token is kept away, only the note burns) */
const IEV_OPT=[[/đốt mảnh giấy, cất tín vật/i,"give"]];
const IEV_DESTROY=["burn","tear","smash","pour","well","bury"];
function ievTxt(h){return String(h==null?"":h).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()}
function ievVerb(n){const s=ievTxt(n);for(const [re,a] of IEV_OPT)if(re.test(s))return a;let best=null,at=1e9;for(const [a,re] of IEV_VERB){const m=re.exec(s);if(m&&m.index<at){at=m.index;best=a}}return best}
function ievNoun(txt){const s=ievTxt(txt);let best=null,at=1e9;
 for(const [re,k] of IEV_NOUN){const m=re.exec(s);if(m&&m.index<at){at=m.index;best=k}}
 /* an IT name in bold (gift / goods texts) beats the generic nouns */
 try{const B=[...String(txt||"").matchAll(/<b>([^<]{2,40})<\/b>/g)].map(x=>x[1]);for(const b of B){const k=Object.keys(IT).find(k=>IT[k]&&itm(k).n===b&&k!=="tp");if(k)return k}}catch(e){}
 return best}
/* explicit resolvers per saved-dialog id (pid + pp survive a reload, so old saves resolve the same way) */
const IEV_PID={
 /* "Đem đến Thái y viện": the outcome decides (j8: found tainted → kept as evidence, else back into her chest) → "probe" (§64.2) */
 giftin:(p,m)=>p&&p.e?{e:p.e,who:p.f,acts:(m.opts||[]).map(o=>/thái y|nghiệm/i.test(ievTxt(o&&o.n))?"probe":"auto"),offer:1,own:1}:null,
 pgin:(p,m)=>p&&p.e?{e:p.e,who:p.f,acts:(m.opts||[]).map(o=>/kim bạc|nếm/i.test(ievTxt(o&&o.n))?"test":"auto"),offer:1,own:1}:null,
 cnvBribe:()=>({key:"vangbac",offer:1}),
 /* a higher consort demands one of HER items (jtsb): "Giao" = it flies to her; the §54.2 loss card still follows */
 tsbBul:(p,m)=>{const e=p&&p.ix>=0?S.inv[p.ix]:null;if(!e||e.h)return false;return{e,acts:(m.opts||[]).map(o=>/^Giao$/.test(ievTxt(o&&o.n))?"give":null)}},
 tsbPetGift:()=>false,
 j67:(p)=>{try{const A=th67(p.t);const b=A&&beatDef67(A,p.b);if(b&&b.gi){const k=Array.isArray(b.gi)?b.gi[0]:b.gi;return{key:Array.isArray(k)?k[0]:k}}}catch(e){}return null}};
/* E68 events that hand her goods (econ STIP_EV): the item + which options refuse it */
function ievE68(m){try{if(!/^e68/.test(m.pid||"")||typeof stipEvItem!=="function")return null;const id=m.pid.slice(3);const r=stipEvItem(id,{p:m.pp||{},vi:(m.pp||{}).vi||0});
 if(!r)return null;const no=r[4]||[];return{key:r[2],acts:(m.opts||[]).map((o,i)=>{if(!no.includes(i))return"keep";const v=ievVerb(o.n);return !v||v==="refuse"?"back":v})}}catch(e){return null}}
function ievActsFor(m,base,offer){const O=m.opts||[];return O.map((o,i)=>{if(o&&o.ia)return o.ia;if(base&&base[i]&&base[i]!=="auto")return base[i]==="test"?null:base[i];const v=ievVerb(o&&o.n);return v==="refuse"?(offer?"back":null):v})}
/* THE resolver: dialog → item + acts (null = no item in this dialog) */
function ievOf(m){if(!m||!m.opts||!m.opts.length)return null;let r=null;
 try{if(m.item)r=typeof m.item==="string"?{key:m.item}:m.item;
  if(!r&&m.pid&&IEV_PID[m.pid]){r=IEV_PID[m.pid](m.pp||{},m);if(r===false)return null}
  if(!r)r=ievE68(m);
  if(!r){const k=ievNoun(`${m.t||""} ${m.h||""}`)||ievNoun((m.opts||[]).map(o=>o&&o.n).join(" · "));if(k&&IT[k]){const acts=ievActsFor(m);if(acts.some(Boolean))r={key:k,acts,txt:1}}}}catch(e){console.error("ievOf",e);r=null}
 if(!r)return null;const e=r.e||null,key=e?e.k:r.key;if(!key||!(IT[key]||(typeof WD_ITEMS==="object"&&WD_ITEMS[key])))return null;
 const I=kitItemInfo(e||key);const acts=r.acts&&!r.txt?ievActsFor(m,r.acts,r.offer):r.acts||ievActsFor(m,null,r.offer);return{I,e,key,acts,who:r.who||null,own:!!r.own}}
window.ievOf=ievOf;window.ievVerb=ievVerb;window.ievNoun=ievNoun;
/* ---------- §64.1 kitItemTag: the item frame on the event banner / at the top of the text ---------- */
function kitItemTag(I){/* KIT §70: tap the tag → kitItemCard (the shared item detail) */const tap=typeof kitItemTap==="function"&&I.k?kitItemTap({k:I.k}):"";
 return `<div class="kiev" data-kiev="${I.k}">${kitItem({src:I.src,name:I.name,grade:I.grade,size:"md",tip:`${I.name} · ${I.gname} · chạm để xem`,data:tap})}</div>`}
window.kitItemTag=kitItemTag;
function ievPlace(R){const mb=document.getElementById("mb");if(!mb)return null;mb.querySelectorAll(".kiev:not(.kiev-own)").forEach(x=>x.remove());if(!R)return null;
 const own=mb.querySelector(".tsbtile");if(own){own.classList.add("kiev","kiev-own");return own}
 const h=kitItemTag(R.I);const ban=mb.querySelector(":scope > .kdlgart .ksart");
 if(ban){ban.insertAdjacentHTML("beforeend",h);const t=ban.lastElementChild;t.classList.add("kiev-ban");return t}
 const col=mb.querySelector(".kpmain")||mb.querySelector(".spkt")||mb.querySelector(".kpb")||mb;col.insertAdjacentHTML("afterbegin",h);const t=col.firstElementChild;t.classList.add("kiev-txt");return t}
/* ---------- §64.2 kitItemFx: the animations ---------- */
function ievStill(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)}catch(e){return false}}
function ievOn(){return !window.__bot&&!(typeof quiet!=="undefined"&&quiet)}
function ievBag(){const t=[...document.querySelectorAll('#tabs [data-tab="inv"],[data-tab="inv"]')].find(x=>{const r=x.getBoundingClientRect();return r.width&&r.bottom>0&&r.top<innerHeight});return t||null}
function ievClone(I,r){const w=document.createElement("div");w.className="kievfx";w.style.cssText=`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;
 w.innerHTML=I.src?`<img src="${I.src}" alt="">`:"";document.body.appendChild(w);return w}
function ievCatch(){let c=document.getElementById("kievcatch");if(!c){c=document.createElement("div");c.id="kievcatch";c.setAttribute("aria-hidden","true");
  c.addEventListener("pointerdown",e=>{e.stopPropagation();e.preventDefault();kitItemFxSkip()},true);document.body.appendChild(c)}clearTimeout(IEV.catchT);IEV.catchT=setTimeout(()=>{const k=document.getElementById("kievcatch");if(k)k.remove()},2200);return c}
function ievUncatch(){if(IEV.run.some(a=>a.playState==="running"||a.playState==="pending"))return;const k=document.getElementById("kievcatch");if(k)k.remove()}
function kitItemFxSkip(){const L=IEV.run.splice(0);for(const a of L)try{a.finish()}catch(e){}document.querySelectorAll(".kievfx,.kievring,.kievmound").forEach(x=>x.remove());const c=document.getElementById("kievcatch");if(c)c.remove()}
window.kitItemFxSkip=kitItemFxSkip;
function ievAnim(el,K,o){const a=el.animate(K,Object.assign({fill:"both",easing:"cubic-bezier(.4,.05,.45,1)"},o));IEV.run.push(a);a.finished.catch(()=>{}).then(()=>{const i=IEV.run.indexOf(a);if(i>=0)IEV.run.splice(i,1)});return a}
function ievPx(name,x,y){try{if(typeof kfPx==="function")kfPx(name,{x,y})}catch(e){}}
const ievT=(x,y,s,r)=>`translate(${x}px,${y}px) scale(${s==null?1:s}) rotate(${r||0}deg)`;
function ievCenter(r){return{x:r.left+r.width/2,y:r.top+r.height/2}}
/* act ∈ keep back give burn tear smash pour well bury use; o.from = rect of the item in the dialog; o.to = rect / element (back, give) */
function kitItemFx(act,I,o){o=o||{};if(!ievOn())return 0;if(typeof I==="string"||(I&&!I.name&&I.k))I=kitItemInfo(I);
 IEV.log.push({act,name:I&&I.name});if(IEV.log.length>80)IEV.log.shift();
 const RB=(typeof BAL==="object"&&BAL.itev)||{};
 if(ievStill()||!I||!document.body.animate){if(act==="keep"){const tb=ievBag();if(tb){tb.classList.remove("kfhit");void tb.offsetWidth;tb.classList.add("kfhit");setTimeout(()=>tb.classList.remove("kfhit"),2700)}}return 0}
 let r=o.from&&o.from.width?o.from:null;if(!r){const s=Math.min(110,innerWidth*.22);r={left:innerWidth/2-s/2,top:innerHeight*.4-s/2,width:s,height:s}}
 const w=ievClone(I,r),c=ievCenter(r);ievCatch();let d=RB[act]||1200;const end=()=>{w.remove();setTimeout(ievUncatch,0)};
 try{try{const KS={keep:"itemFly",back:"giftBack",give:"give",burn:"mgFire",well:"mgThrow",use:"heal"};/* jsfx moments (dev/audio/SFX_PLAN.md) */if(typeof kitSfx==="function")kitSfx(KS[act]||"itemLose");else if(typeof sfx==="function")sfx(act==="keep"?"sfx-coin":"sfx-open")}catch(e){}
 if(act==="keep"){const tb=ievBag();const b=tb?tb.getBoundingClientRect():{left:innerWidth/2,top:innerHeight-40,width:0,height:0};const t=ievCenter(b);
  const dx=t.x-c.x,dy=t.y-c.y,sc=Math.max(.15,Math.min(b.width||40,b.height||40)/Math.max(1,r.width));d=RB.keep||900;
  ievAnim(w,[{transform:ievT(0,0,1),opacity:1},{transform:ievT(0,-18,1.12),opacity:1,offset:.2},{transform:ievT(dx*.5,dy*.5-70,.7),opacity:1,offset:.6},{transform:ievT(dx,dy,sc),opacity:.25}],{duration:d}).finished.then(()=>{end();
   if(tb){tb.classList.remove("kfhit");void tb.offsetWidth;tb.classList.add("kfhit");setTimeout(()=>tb.classList.remove("kfhit"),2700);ievPx("pop",t.x,t.y)}try{vib("coin")}catch(e){}}).catch(end)}
 else if(act==="back"||act==="give"){let t=null;const to=o.to&&o.to.getBoundingClientRect?o.to.getBoundingClientRect():o.to;
  if(to&&to.width)t={x:to.left+to.width/2,y:to.top+to.height*.42};else t={x:act==="back"?-r.width:innerWidth/2,y:act==="back"?c.y-40:-r.height};
  const dx=t.x-c.x,dy=t.y-c.y;d=RB.back||1000;
  ievAnim(w,[{transform:ievT(0,0,1),opacity:1},{transform:ievT(0,-14,1.06),opacity:1,offset:.18},{transform:ievT(dx*.55,dy*.55-50,.8,act==="back"?-8:0),opacity:1,offset:.6},{transform:ievT(dx,dy,.4),opacity:0}],{duration:d}).finished.then(end).catch(end)}
 else if(act==="burn"){d=RB.burn||1400;w.classList.add("kievburn");const fr=document.createElement("i");fr.className="kievflame";w.appendChild(fr);
  ievAnim(w,[{transform:ievT(0,0,1,0),filter:"sepia(0) brightness(1)",clipPath:"inset(0 0 0% 0)",opacity:1},{transform:ievT(0,-6,1.02,-3),filter:"sepia(.6) brightness(.9)",clipPath:"inset(0 0 22% 0)",opacity:1,offset:.3},
   {transform:ievT(0,-10,.97,4),filter:"sepia(1) brightness(.55)",clipPath:"inset(0 0 62% 0)",opacity:.95,offset:.7},{transform:ievT(0,-16,.9,-2),filter:"sepia(1) brightness(.2)",clipPath:"inset(0 0 100% 0)",opacity:0}],{duration:d,easing:"ease-in"});
  ievAnim(fr,[{bottom:"0%",opacity:0},{bottom:"5%",opacity:1,offset:.12},{bottom:"62%",opacity:1,offset:.75},{bottom:"100%",opacity:0}],{duration:d,easing:"ease-in"}).finished.then(end).catch(end);
  ievPx("embers",c.x,r.top+r.height*.8);setTimeout(()=>ievPx("embers",c.x,r.top+r.height*.45),d*.4);setTimeout(()=>ievPx("ashfall",c.x,r.top+r.height*.3),d*.55)}
 else if(act==="tear"){d=RB.tear||1100;w.style.visibility="hidden";const mk=cl=>{const h=ievClone(I,r);h.style.clipPath=cl;return h};
  const L=mk("polygon(0 0,52% 0,46% 18%,55% 34%,45% 52%,54% 70%,47% 86%,52% 100%,0 100%)"),Rr=mk("polygon(52% 0,100% 0,100% 100%,52% 100%,47% 86%,54% 70%,45% 52%,55% 34%,46% 18%)");
  ievAnim(L,[{transform:ievT(0,0,1,0),opacity:1},{transform:ievT(-4,0,1,-2),opacity:1,offset:.25},{transform:ievT(-r.width*.45,r.height*.9,.92,-24),opacity:0}],{duration:d});
  ievAnim(Rr,[{transform:ievT(0,0,1,0),opacity:1},{transform:ievT(4,0,1,2),opacity:1,offset:.25},{transform:ievT(r.width*.45,r.height*.95,.92,26),opacity:0}],{duration:d}).finished.then(()=>{L.remove();Rr.remove();end()}).catch(()=>{L.remove();Rr.remove();end()});
  setTimeout(()=>ievPx("scraps",c.x,c.y),d*.25)}
 else if(act==="smash"){d=RB.smash||1100;w.style.visibility="hidden";const P=["polygon(0 0,50% 0,40% 45%,0 35%)","polygon(50% 0,100% 0,100% 40%,60% 50%,40% 45%)","polygon(0 35%,40% 45%,35% 100%,0 100%)","polygon(40% 45%,60% 50%,70% 100%,35% 100%)","polygon(60% 50%,100% 40%,100% 100%,70% 100%)"];
  const V=[[-1,-1],[1,-1.1],[-1.2,.6],[0,1],[1.2,.6]];const S=P.map(p=>{const h=ievClone(I,r);h.style.clipPath=p;return h});let last=null;
  S.forEach((h,i)=>{const [vx,vy]=V[i];last=ievAnim(h,[{transform:ievT(0,0,1,0),opacity:1},{transform:ievT(i%2?3:-3,0,1,0),opacity:1,offset:.12},{transform:ievT(i%2?-3:3,0,1,0),opacity:1,offset:.22},
   {transform:ievT(vx*r.width*.5,vy*r.height*.35-10,1,vx*30),opacity:1,offset:.5},{transform:ievT(vx*r.width*.7,vy*r.height*.3+r.height*.9,.85,vx*70),opacity:0}],{duration:d})});
  last.finished.then(()=>{S.forEach(h=>h.remove());end()}).catch(()=>{S.forEach(h=>h.remove());end()});setTimeout(()=>ievPx("dust",c.x,c.y),d*.24)}
 else if(act==="pour"){d=RB.pour||1200;ievAnim(w,[{transform:ievT(0,0,1,0),opacity:1},{transform:ievT(-6,-10,1,-30),opacity:1,offset:.25},{transform:ievT(-10,-14,1,-115),opacity:1,offset:.5},{transform:ievT(-12,-14,.95,-120),opacity:1,offset:.8},{transform:ievT(-12,-6,.9,-110),opacity:0}],{duration:d,easing:"ease-in-out"}).finished.then(end).catch(end);
  const lip={x:r.left+r.width*.15,y:r.top+r.height*.4};setTimeout(()=>ievPx("drops",lip.x,lip.y),d*.38);setTimeout(()=>ievPx("drops",lip.x,lip.y),d*.55)}
 else if(act==="well"){d=RB.well||1300;const land={x:c.x+Math.min(140,innerWidth*.18),y:Math.min(innerHeight-40,c.y+r.height*1.3)};const dx=land.x-c.x,dy=land.y-c.y;
  ievAnim(w,[{transform:ievT(0,0,1,0),opacity:1},{transform:ievT(dx*.4,-r.height*.7,.85,60),opacity:1,offset:.35},{transform:ievT(dx*.9,dy*.8,.45,170),opacity:1,offset:.7},{transform:ievT(dx,dy+8,.25,200),opacity:0,offset:.78},{transform:ievT(dx,dy+8,.2,200),opacity:0}],{duration:d,easing:"cubic-bezier(.3,0,.6,1)"}).finished.then(end).catch(end);
  setTimeout(()=>{for(let i=0;i<3;i++){const g=document.createElement("i");g.className="kievring";g.style.cssText=`left:${land.x}px;top:${land.y}px`;document.body.appendChild(g);
    ievAnim(g,[{transform:"translate(-50%,-50%) scale(.2)",opacity:.9},{transform:"translate(-50%,-50%) scale(1.6)",opacity:0}],{duration:d*.55,delay:i*150,easing:"ease-out"}).finished.then(()=>g.remove()).catch(()=>g.remove())}
   ievPx("splash",land.x,land.y)},d*.74)}
 else if(act==="bury"){d=RB.bury||1300;const land={x:c.x,y:Math.min(innerHeight-30,c.y+r.height*.9)};const mo=document.createElement("i");mo.className="kievmound";mo.style.cssText=`left:${land.x}px;top:${land.y}px;width:${r.width*1.5}px;height:${r.height*.55}px`;document.body.appendChild(mo);
  ievAnim(w,[{transform:ievT(0,0,1,0),opacity:1,clipPath:"inset(0 0 0 0)"},{transform:ievT(0,r.height*.55,.8,0),opacity:1,clipPath:"inset(0 0 0 0)",offset:.4},{transform:ievT(0,r.height*1.05,.75,0),opacity:1,clipPath:"inset(0 0 65% 0)",offset:.75},{transform:ievT(0,r.height*1.2,.7,0),opacity:0,clipPath:"inset(0 0 100% 0)"}],{duration:d,easing:"ease-in"}).finished.then(end).catch(end);
  ievAnim(mo,[{transform:"translate(-50%,-30%) scaleY(0)",opacity:0},{transform:"translate(-50%,-60%) scaleY(.6)",opacity:1,offset:.45},{transform:"translate(-50%,-80%) scaleY(1)",opacity:1,offset:.8},{transform:"translate(-50%,-80%) scaleY(1)",opacity:0}],{duration:d*1.15}).finished.then(()=>mo.remove()).catch(()=>mo.remove());
  setTimeout(()=>ievPx("dust",land.x,land.y-10),d*.45)}
 else if(act==="use"){d=RB.use||900;ievAnim(w,[{transform:ievT(0,0,1),filter:"brightness(1)",opacity:1},{transform:ievT(0,-8,1.12),filter:"brightness(1.5)",opacity:1,offset:.4},{transform:ievT(0,-20,.6),filter:"brightness(2)",opacity:0}],{duration:d,easing:"ease-out"}).finished.then(end).catch(end);
  setTimeout(()=>ievPx("stars",c.x,c.y),d*.3)}
 else{end();return 0}}catch(e){console.error("kitItemFx",e);end()}
 return d}
window.kitItemFx=kitItemFx;
/* new particle kinds for the shared Pixi layer (jfx KF_SPAWN): embers, ash falling at a point, paper scraps, dust, water drops, splash */
(function(){if(typeof KF_SPAWN!=="object")return;const Rr=(a,b)=>a+Math.random()*(b-a);
 Object.assign(KF_SPAWN,{
  embers(p){const n=kfBudget(16);for(let i=0;i<n;i++)kfSp("ember",p.x+Rr(-36,36),p.y+Rr(-8,8),{vx:Rr(-.5,.5),vy:Rr(-2.4,-1),drag:.985,life:Rr(45,75),sway:.5,fade:"out",a0:.95},null,Rr(.7,1.3))},
  ashfall(p){const n=kfBudget(12);for(let i=0;i<n;i++)kfSp("ash",p.x+Rr(-40,40),p.y+Rr(-10,10),{vx:Rr(-.6,.6),vy:Rr(.2,.9),g:.02,life:Rr(90,130),spin:Rr(-.08,.08),sway:.6,fade:"inout",a0:.9},null,Rr(.5,.9))},
  scraps(p){const n=kfBudget(8);for(let i=0;i<n;i++)kfSp("paper",p.x+Rr(-14,14),p.y+Rr(-30,30),{vx:Rr(-1.6,1.6),vy:Rr(-1.2,.4),g:.08,life:Rr(60,90),spin:Rr(-.2,.2),sway:.4,fade:"out",a0:.95},null,Rr(.5,.85))},
  dust(p){const n=kfBudget(8);for(let i=0;i<n;i++){const a=Rr(Math.PI*1.05,Math.PI*1.95),sp=Rr(1,2.6);kfSp("smoke",p.x+Rr(-20,20),p.y,{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp*.5,drag:.94,life:Rr(45,70),grow:.004,fade:"out",a0:.5},0x9a7a55,Rr(.4,.7))}},
  drops(p){const n=kfBudget(10);for(let i=0;i<n;i++)kfSp("ink",p.x+Rr(-6,6),p.y+Rr(-4,4),{vx:Rr(-.8,.2),vy:Rr(.5,1.8),g:.22,life:Rr(40,60),fade:"out",a0:.85},null,Rr(.12,.2))},
  splash(p){const n=kfBudget(12);for(let i=0;i<n;i++){const a=Rr(-Math.PI*.9,-Math.PI*.1),sp=Rr(1.5,3.4);kfSp("orb",p.x,p.y,{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,g:.16,life:Rr(35,55),fade:"out",a0:.85},0xbfe0f0,Rr(.2,.35))}}})})();
/* painted kinds these spawners need (KIT §68 painted-fx; loaded by jfx kfPx before spawning) */
try{Object.assign(KF_KINDS,{embers:["ember"],ashfall:["ash"],scraps:["paper"],dust:["smoke"],drops:["ink"],splash:["orb"]})}catch(e){}
/* ---------- wiring: showModal places the tag; chooseM plays the act ---------- */
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function")return;window[n]=f(o)};
 W("showModal",o=>function(){const r=o.apply(this,arguments);try{const m=typeof Q!=="undefined"&&Q[0];const M=document.getElementById("modal");
   const R=M&&!M.hidden&&m?ievOf(m):null;IEV.cur=R?{m,R}:null;ievPlace(R);
   if(R){const B=[...document.querySelectorAll("#mb .opts [data-m]")];B.forEach(b=>{const a=R.acts[+b.dataset.m];if(a)b.dataset.kia=a;else delete b.dataset.kia})}}catch(e){console.error("iev show",e)}return r});
 /* goods given INSIDE the choice (econ goodsGive → its box) are claimed by the flight; entries pushed by the choice are not revealed twice */
 W("stipReveal",o=>function(E){if(IEV.hold&&Array.isArray(E)){const k=IEV.hold.key;const mine=E.filter(e=>e&&e.k===k);if(mine.length){mine.forEach(e=>{IEV.claim.add(e);IEV.hold.got.push(e);try{if(KMSNAP&&KMSNAP.inv)KMSNAP.inv.push(e)}catch(x){}});
   const rest=E.filter(e=>!mine.includes(e));if(!rest.length)return;arguments[0]=rest}}return o.apply(this,arguments)});
 W("kgGroups",o=>function(add){const H=IEV.hold;const L=(add||[]).filter(x=>{if(IEV.claim.has(x))return false;if(H&&x&&(x.k===H.key||(H.e&&x.wk&&H.e.wk&&x.wk.n===H.e.wk.n))){IEV.claim.add(x);H.got.push(x);return false}return true});
  if(L.length)return o.call(this,L)});
 W("kitLose",o=>function(x,op){const H=IEV.hold;if(H&&x&&Array.isArray(x)&&!(op&&op.why==="lose")){const L=x.filter(e=>!(e&&e.k===H.key));if(!L.length)return;arguments[0]=L}return o.apply(this,arguments)});
 W("chooseM",o=>function(i){const C=IEV.cur,m=typeof Q!=="undefined"?Q[0]:null;if(!C||C.m!==m||!m||!m.opts||!m.opts[i]||!ievOn())return o.apply(this,arguments);
  const R=C.R;let act=R.acts[i];if(!act)return o.apply(this,arguments);
  const tag=document.querySelector("#mb .kiev .kitb")||document.querySelector("#mb .kiev");const from=tag?tag.getBoundingClientRect():null;
  const fig=document.querySelector("#mb .kpsubj .kesf .kesimg")||document.querySelector("#mb .kpsubj .kesf");let to=fig?fig.getBoundingClientRect():null;
  /* give: to the dialog's person only when the option names that person ("Dâng lại cho Hoàng thượng" with Hoàng thượng shown); "đem cho cung nữ",
     "nộp Hàn lâm viện"… → the item goes away (up), never to the giver shown */
  if((act==="give"||act==="probe")&&to){const nm=ievTxt((document.querySelector("#mb .kpsubj .kpsn")||{}).textContent||"").toLowerCase(),on=ievTxt(m.opts[i].n).toLowerCase();
   const P=nm.split(/\s*[·,]\s*|\s+/).filter(w=>w.length>1);const hit=nm&&(on.includes(nm)||P.length>=2&&P.some((w,j)=>j<P.length-1&&on.includes(w+" "+P[j+1])));if(!hit)to=null}
  const inv0=(S.inv||[]).slice();IEV.hold={key:R.key,e:R.e,got:[],bac0:S.bac||0};let r;
  try{r=o.apply(this,arguments)}finally{const H=IEV.hold;IEV.hold=null;
   try{if(act==="probe")act=(S.inv||[]).some(x=>x&&!inv0.includes(x)&&x.k===R.key)?"keep":"give";
    /* keep = a REAL entry in Tư trang: the one the choice added, else one made here */
    if(act==="keep"&&R.key==="vangbac"){const fr=from?{x:from.left+from.width/2,y:from.top+from.height/2}:null;try{kitCoins("in",Math.max(10,(S.bac||0)-(H.bac0||0)),fr)}catch(e){}IEV.last={act:"coins",name:R.I.name,key:R.key,opt:m.opts[i].n};return r}
    if(act==="keep"){let got=[...new Set(H.got.concat((S.inv||[]).filter(x=>x&&!inv0.includes(x)&&x.k===R.key)))].filter(x=>(S.inv||[]).includes(x));
     if(!got.length&&R.own)act="use";/* the dialog's own logic decided (a poisoned dish eaten / thrown away): nothing goes to the bag */
     else if(!got.length&&!S.dead){const e=R.e?Object.assign({},R.e):{k:R.key};e.from=e.from||(R.who&&typeof R.who==="string"?R.who:"story");e.d=S.turn;delete e.h;S.inv.push(e);got=[e]}
     got.forEach(x=>{IEV.claim.add(x);try{if(KMSNAP&&KMSNAP.inv&&!KMSNAP.inv.includes(x))KMSNAP.inv.push(x);kfSeen.add(x)}catch(e){}})}
    else if(IT[R.key]&&itm(R.key).story&&!R.e){/* a story item she kept earlier (letter, token…) that this choice sends back / destroys leaves Tư trang for real */
     const gone=inv0.some(x=>x&&x.k===R.key&&!(S.inv||[]).includes(x));const j=(S.inv||[]).findIndex(x=>x&&x.k===R.key&&!x.h);
     if(!gone&&j>=0){const x=S.inv.splice(j,1)[0];try{KFX.lt.set(x,{why:"use"})}catch(e){}render()}}
    IEV.last={act,name:R.I.name,key:R.key,opt:m.opts[i].n,to:!!(to&&(act==="back"||act==="give"))};kitItemFx(act,R.I,{from,to:act==="back"||act==="give"?to:null});
    if(act==="keep")render()}catch(e){console.error("iev choose",e)}}
  return r})})();
(function(){const st=document.createElement("style");st.id="kit-itev";st.textContent=`
/* §64.1 item frame on the event banner (bottom-right) or at the top of the text column */
#mb .ksart>.kiev-ban{position:absolute;right:8px;bottom:8px;z-index:3;padding:5px 5px 3px;border-radius:10px;background:rgba(255,250,240,.93);box-shadow:0 2px 8px #0003;line-height:1}
#mb .kiev-txt{float:right;margin:0 0 6px 10px;padding:4px 4px 2px;border-radius:10px;background:rgba(255,250,240,.9);box-shadow:0 1px 5px #0002}
#mb .kiev .kitem{cursor:default}
/* short landscape (844x390): the banner is ~95 px tall → a 40 px picture, name + grade on one line each, so the frame stays inside the banner (r1) */

/* §64.2 animation pieces (WAAPI on fixed clones; particles on the jfx Pixi layer) */
.kievfx{position:fixed;z-index:9480;pointer-events:none;will-change:transform,opacity}
.kievfx>img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 4px 6px #0005)}
.kievfx.kievburn{overflow:visible}
.kievflame{position:absolute;left:-6%;right:-6%;height:16%;bottom:0;border-radius:50%;background:radial-gradient(ellipse at 50% 60%,#fff4c0 0,#ffb040 30%,#e0501a 60%,#e0501a00 75%);filter:blur(2px);mix-blend-mode:screen}
.kievring{position:fixed;z-index:9479;width:120px;height:34px;border-radius:50%;border:2px solid #a8d4ec;box-shadow:0 0 6px #ffffffaa;pointer-events:none}
.kievmound{position:fixed;z-index:9481;border-radius:50% 50% 8% 8%/90% 90% 10% 10%;background:radial-gradient(ellipse at 50% 30%,#a8845a 0,#7a5a38 60%,#5e4228 100%);pointer-events:none;transform-origin:50% 100%}
#kievcatch{position:fixed;inset:0;z-index:9478;background:transparent}
@media (prefers-reduced-motion:reduce){.kievfx,.kievring,.kievmound,#kievcatch{display:none!important}}
`;document.head.appendChild(st)})();
/* §47 kit page samples */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§64",title:"kitItemTag · kitItemFx (vật phẩm trong sự kiện)",
 html:()=>`<div class="kitpg-row">${["thu","matthu","giaymat","tinvat","khantay","chenthuoc","batcanh","lenhbai"].map(k=>kitItemTag(kitItemInfo(k))).join(" ")}</div>`+
  `<div class="kitpg-row">${["keep","back","give","burn","tear","smash","pour","well","bury","use"].map(a=>`<button type="button" class="kbtn alt" onclick="kitItemFx('${a}',kitItemInfo('${a==="pour"||a==="use"?"chenthuoc":a==="smash"?"vongngoc":"thu"}'),{from:this.getBoundingClientRect()})">${a}</button>`).join(" ")}</div>`})}catch(e){}
