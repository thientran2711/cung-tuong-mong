/* ================= jload: NHẬP CUNG LẦN ĐẦU — thỉnh tranh vẽ, tiếng nhạc về máy (owner 11/14) — KIT.md section 35 =================
   assets.json (dev/site/assets.py, built by build_site.sh) lists every image + sound as [path, sha256/16, bytes, group].
   The long-lived cache 'ctm-assets' holds them keyed by content ('<path>?h=<hash>'); sw.js serves it and never wipes it on a build.
   This module fills it:
   1. at every start it compares assets.json with the cache: only new or changed files download (a removed file is pruned by sw.js);
      legacy 'ctm-<timestamp>' caches from older builds are checked by content and moved over, then deleted (no second download).
   2. group 'core' (UI, kit, scenes, maps, items, sounds; ~80 MB) missing → the LOADING SCREEN (title backdrop, kit scene panel, bar with MB)
      blocks entry until done (resumes file by file after a cut or reload; "Vào cung ngay" appears when the line is cut or stalls).
   3. group 'fig' (figures, portraits, event/story/festival art; ~550 MB) then downloads in the background, 2 at a time, with a small
      kit chip at the bottom-left (tap = tạm ngưng / thỉnh tiếp, remembered). Save-Data or too little room = skipped (the worker still
      caches each picture the game actually shows).
   navigator.storage.persist() is asked once downloading starts; navigator.storage.estimate() is checked before the background sets.
   Requests carry 'x-ctm-load' so sw.js lets them through and this module writes the cache itself (one write, no copy through page script).
   Test hook: window.KLOAD {phase, core:{have,total,files,left}, fig:{…}, paused, err}. */
(function(){
const KLOAD=window.KLOAD={phase:"idle",core:{have:0,total:0,files:0,left:0},fig:{have:0,total:0,files:0,left:0},paused:false,err:""};
if(!("caches" in window)||!window.fetch||!/^https?:$/.test(location.protocol)||window.__bot)return;
const AC="ctm-assets",LS="ctm-bgpause";
const mb=n=>(n/1e6<10?(Math.round(n/1e5)/10):Math.round(n/1e6)).toLocaleString("vi-VN");
/* pictures (img/…) come from Cloudflare (jcdn.js IMG_BASE, dev/art/CDN.md): their key is IMG_BASE+'img/…?h=<md5/16>'; a CDN download is
   marked with &ctmload=1 instead of the x-ctm-load header (a custom header would cost a CORS preflight per file) */
const CDNB=(typeof IMG_BASE==="string"&&IMG_BASE)||"";
const keyOf=f=>new URL(f[0]+"?h="+f[1],CDNB&&f[0].startsWith("img/")?CDNB:location.href).href;
let el=null,chip=null,shown=false,speed=[],enterCb=[];
try{KLOAD.paused=localStorage.getItem(LS)==="1"}catch(e){}

/* ---------- kit CSS (section 35) ---------- */
(function(){const st=document.createElement("style");st.id="kit-load";st.textContent=`
.modal.kload{z-index:9600;transition:opacity .45s ease}
.modal.kload.out{opacity:0;pointer-events:none}
.modal.kload .dlg.kpsc{animation:none}
.kload .klb{padding:10px 14px 4px;display:flex;flex-direction:column;gap:9px}
.kload .klb .kpnote{margin:0}
.kprog{display:flex;flex-direction:column;gap:4px}
.kprog-r{display:flex;align-items:center;gap:10px}
.kprog-t{flex:1 1 auto;min-width:0;height:12px;border-radius:7px;border:1px solid var(--line);background:var(--k-card2,#f6ead6);overflow:hidden;box-shadow:inset 0 1px 2px #3a210f22}
.kprog-t>u{display:block;height:100%;width:var(--v,0%);border-radius:6px;background:linear-gradient(90deg,#b0402c,#c98a2a);box-shadow:inset 0 0 0 1px #f0d07055;transition:width .4s ease}
.kprog-n{flex:none;font-family:var(--display);font-weight:700;color:var(--gold);font-size:.86rem;white-space:nowrap}
.kprog-s{font-size:.76rem;color:var(--dim);min-height:1.2em}
.kload .kpopts{display:flex;justify-content:flex-end;gap:8px;padding:2px 14px 12px;margin:0}
.kload .kpopts:empty{display:none}
.kload .kpopts.ask{flex-direction:column;align-items:stretch;flex-wrap:wrap}
.kload .kpopts.ask .kbtn{width:100%;white-space:normal}
.kload .klh:empty{display:none}
/* kv3:.kv1 */:where(.kv1) .kload .klb{padding:8px 10px 2px}:where(.kv1) .kload .kpopts{padding:2px 10px 10px}
.kloadchip{position:fixed;left:calc(env(safe-area-inset-left,0px) + 8px);bottom:calc(env(safe-area-inset-bottom,0px) + 8px);z-index:8700;max-width:calc(100vw - 16px);opacity:.92}
.kloadchip .kchip{display:inline-flex;align-items:center;gap:7px;margin:0;font-size:.72rem;padding:3px 10px;border-color:var(--gold);background:#fffaf0f0;box-shadow:0 2px 8px #0003;cursor:pointer;font-family:inherit}
.kloadchip .kprog-t{width:64px;flex:none;height:6px}
.kloadchip.done{animation:kloadFade 1.2s 1.5s ease forwards}
body.kload-dock .game{box-sizing:border-box!important;padding-bottom:calc(env(safe-area-inset-bottom,0px) + 30px)!important}
/* review 11/15 (844x390 place card): the chip never sits over a dialog's text — it steps aside while a dialog / mini game is open */
body:has(#modal:not([hidden])) .kloadchip,body:has(#ov:not([hidden])) .kloadchip{visibility:hidden}
body.kload-dock .kloadchip{opacity:1}body.kload-dock .kloadchip .kchip{padding:2px 9px;box-shadow:none}
@keyframes kloadFade{to{opacity:0;visibility:hidden}}
`;document.head.appendChild(st)})();

/* ---------- the bar (kit 35): label above, track + "a / b MB" beside, sub line under ---------- */
function kitProgress(o){const v=o.total?Math.min(100,o.have/o.total*100):0;
 return `<div class="kprog">${o.label?`<h4 class="kpst">${o.label}</h4>`:""}<div class="kprog-r"><span class="kprog-t" role="progressbar" aria-valuemin="0" aria-valuemax="${Math.round(o.total/1e6)}" aria-valuenow="${Math.round(o.have/1e6)}"><u style="--v:${v.toFixed(1)}%"></u></span><b class="kprog-n">${mb(o.have)} / ${mb(o.total)} MB</b></div><small class="kprog-s">${o.sub||""}</small></div>`}
window.kitProgress=kitProgress;

const IOS=/iP(ad|hone|od)/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const STANDALONE=(window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true;
/* iOS/iPadOS: the Home-Screen app has its OWN storage (cache + localStorage), apart from Safari. In Safari the big download is NOT started first:
   a kit notice asks where she will play (add to Home Screen = download once, in the app; or play in the browser = download there, once more later).
   Her choice is remembered (localStorage 'ctm-ios-browser'). Android / desktop / the installed app: unchanged. */
const IOSB=IOS&&!STANDALONE,CHOICE="ctm-ios-browser";
let askMode="ask";
const chosen=()=>{try{return localStorage.getItem(CHOICE)==="1"}catch(e){return false}};
const hasSave=()=>{try{for(let n=1;n<=3;n++)if(localStorage.getItem("hclh-save-v2-"+n))return true}catch(e){}return false};
function eta(left){const now=Date.now();speed=speed.filter(s=>now-s[0]<10000);if(speed.length<8)return"";
 const bps=(speed[speed.length-1][1]-speed[0][1])/Math.max(1,(speed[speed.length-1][0]-speed[0][0])/1000);if(bps<=0)return"";
 const s=left/bps;return s<20?"sắp xong":s<45?"còn chừng nửa phút":s<90?"còn chừng một phút":`còn chừng ${Math.round(s/60)} phút`}
function screen(){if(el)return el;el=document.createElement("div");el.id="kload";el.className="modal kpscene kload";
 try{kitBackdrop(el,"title")}catch(e){}
 el.innerHTML=`<div class="dlg kpanel kpsc" data-kind="notice"><div class="klh">${typeof kpHeader==="function"?kpHeader("notice","Cung Tường Mộng","Lần đầu nhập cung · thỉnh tranh vẽ, tiếng nhạc về máy"):""}</div><div class="klb"></div><div class="kpopts"></div></div>`;
 document.body.appendChild(el);shown=true;return el}
function head(sub){const h=el.querySelector(".klh");if(h&&typeof kpHeader==="function"){try{h.innerHTML=kpHeader("notice","Cung Tường Mộng",sub)}catch(e){}}}
/* iOS Safari, before any download: the choice notice (mode "ask") or the how-to-add steps (mode "guide") — kit panel, kit buttons, .kpnote lines */
function paintAsk(){const b=el.querySelector(".klb"),o=el.querySelector(".kpopts"),c=KLOAD.core,left=mb(c.total-c.have);
 o.className="kpopts ask";
 if(askMode==="guide"){head("Thêm vào màn hình chính");
  b.innerHTML=`<div class="kpnote">1. Chạm nút Chia sẻ (ô vuông có mũi tên chỉ lên) trên thanh của Safari.</div><div class="kpnote">2. Kéo xuống, chọn “Thêm vào MH chính” (Thêm vào Màn hình chính), rồi chạm “Thêm”.</div><div class="kpnote">3. Đóng Safari, mở Cung Tường Mộng từ biểu tượng mới trên màn hình chính. Ở đó mới thỉnh tranh vẽ, tiếng nhạc, chỉ một lần.</div>`+
   (hasSave()?`<div class="kpnote">Sổ đang cất trong Safari không tự sang ứng dụng. Muốn mang theo, chọn “Mở sổ mây trước” bên dưới.</div>`:"");
  o.innerHTML=`<button class="kbtn alt" data-kl="back">Quay lại</button><button class="kbtn alt" data-kl="web">Chơi luôn trên trình duyệt</button>`+(hasSave()?`<button class="kbtn alt" data-kl="peek">Mở sổ mây trước (chưa thỉnh tranh)</button>`:"");return}
 head("Chọn nơi chơi trước khi thỉnh tranh");
 b.innerHTML=`<div class="kpnote">Trên iPad, iPhone, Safari và ứng dụng ở màn hình chính cất tranh riêng, không dùng chung. Thỉnh tranh ở Safari (${left} MB) rồi mở bằng màn hình chính là phải thỉnh lại một lần nữa.</div><div class="kpnote">Nên thêm Cung Tường Mộng vào màn hình chính trước, rồi mở từ đó: chỉ thỉnh một lần.</div>`+
  (hasSave()?`<div class="kpnote">Sổ đang cất trong Safari không tự sang ứng dụng. Trước khi chuyển, vào Thiết lập › Sổ mây › Giữ sổ trên mây; ở ứng dụng chọn Nối sổ.</div>`:"");
 o.innerHTML=`<button class="kbtn" data-kl="a2hs">Thêm vào màn hình chính (khuyên)</button><button class="kbtn alt" data-kl="web">Chơi luôn trên trình duyệt</button>`+(hasSave()?`<button class="kbtn alt" data-kl="peek">Mở sổ mây trước (chưa thỉnh tranh)</button>`:"")}
function paint(msg){if(!el)return;if(KLOAD.phase==="ask"){paintAsk();return}
 const c=KLOAD.core,b=el.querySelector(".klb"),o=el.querySelector(".kpopts");
 if(IOSB&&KLOAD.phase==="check"&&!MAN){b.innerHTML=`<div class="kpnote">Đang soát tranh đã cất trong máy</div>`;o.innerHTML="";return}
 o.className="kpopts";
 const sub=msg||(KLOAD.phase==="check"?"Đang soát tranh đã cất trong máy":eta(c.total-c.have));
 b.innerHTML=kitProgress({label:"Tranh cảnh · đồ vật · tiếng nhạc",have:c.have,total:c.total,sub})+
  `<div class="kpnote">Chỉ thỉnh một lần. Từ lần sau vào cung ngay, không cần mạng; bản mới chỉ thỉnh phần tranh đổi khác.</div>`+
  (KLOAD.fig.total?`<div class="kpnote">Tranh nhân vật (${mb(KLOAD.fig.total-KLOAD.fig.have)} MB) thỉnh dần sau khi ngươi đã vào cung.</div>`:"")+
  (IOSB?`<div class="kpnote">Safari và ứng dụng ở màn hình chính cất tranh riêng: nếu sau này ngươi thêm vào màn hình chính, ứng dụng sẽ thỉnh lại một lần nữa.</div>`:"");
 const stuck=KLOAD.err&&KLOAD.phase!=="done";
 o.innerHTML=stuck?`<button class="kbtn alt" data-kl="go">Vào cung ngay</button>${navigator.onLine!==false?`<button class="kbtn" data-kl="retry">Thỉnh tiếp</button>`:""}`:"";}
function close(){if(!el)return;const e=el;el=null;e.classList.add("out");setTimeout(()=>e.remove(),500);enterCb.splice(0).forEach(f=>{try{f()}catch(x){}})}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kl]");if(!b)return;e.stopPropagation();
 const kl=b.dataset.kl;
 if(kl==="a2hs"){askMode="guide";paint();return}if(kl==="back"){askMode="ask";paint();return}
 if(kl==="peek"){KLOAD.phase="deferred";close();return}  /* into the game with no download: she opens Sổ mây first; the notice returns on the next visit */
 if(kl==="web"){try{localStorage.setItem(CHOICE,"1")}catch(x){}head("Lần đầu nhập cung · thỉnh tranh vẽ, tiếng nhạc về máy");runCore();return}
 if(b.dataset.kl==="go"){KLOAD.phase="skipped";close();startBg()}else if(b.dataset.kl==="retry"){KLOAD.err="";paint();runCore()}},true);

/* ---------- one file: straight into the cache under its content key; progress counts whole files ---------- */
async function getOne(c,f,grp){const g=KLOAD[grp];let got=0;
 for(let t=0;t<4;t++){try{
   const k=keyOf(f),r=await (CDNB&&k.startsWith(CDNB)?fetch(k+"&ctmload=1",{cache:"no-cache",mode:"cors",credentials:"omit"}):fetch(k,{headers:{"x-ctm-load":"1"},cache:"no-cache"}));if(!r.ok)throw new Error("http "+r.status);
   await c.put(keyOf(f),r);  /* the browser streams it into the cache; no page script per chunk (keeps the game smooth) */
   g.have+=f[2]-got;g.left--;g.files++;tick(grp);return true}
  catch(e){g.have-=got;got=0;if(e&&e.name==="QuotaExceededError"){KLOAD.err="quota";throw e}
   if(navigator.onLine===false){KLOAD.err="offline";throw e}
   await new Promise(ok=>setTimeout(ok,600*(t+1)))}}
 KLOAD.err="net";throw new Error("net")}
let tickT=0;function tick(grp){if(tickT)return;tickT=setTimeout(()=>{tickT=0;speed.push([Date.now(),KLOAD[grp].have]);if(grp==="core")paint();else paintChip()},250)}
async function pool(list,n,grp,stop){const c=await caches.open(AC);let i=0,dead=false;
 const w=async()=>{while(i<list.length&&!dead){if(stop&&stop())return;const f=list[i++];
   if(grp!=="core"&&await c.match(keyOf(f))){const g=KLOAD[grp];g.have+=f[2];g.left--;g.files++;continue}  /* the game showed it meanwhile (sw.js cached it) */
   try{await getOne(c,f,grp)}catch(e){dead=true;throw e}}};
 await Promise.all(Array.from({length:Math.min(n,list.length)},w))}

let MAN=null,HAVE=null,coreList=[],figList=[];
async function plan(){
 let r=null;try{r=await fetch("assets.json",{cache:"no-cache"})}catch(e){}
 if(!r||!r.ok)r=await caches.match("assets.json",{ignoreSearch:true});if(!r)return false;
 MAN=await r.json();const c=await caches.open(AC);HAVE=new Set((await c.keys()).map(q=>q.url));
 await migrate(c);
 coreList=[];figList=[];for(const f of MAN.files){if(f[3]==="fx"||f[3]==="lazy")continue;/* KIT §68 painted effects + "lazy" (perf budget, assets.py): on demand, never ahead; sw.js caches them when first shown */const g=f[3]==="core"?"core":"fig",G=KLOAD[g];G.total+=f[2];
  if(HAVE.has(keyOf(f))){G.have+=f[2];G.files++}else{(g==="core"?coreList:figList).push(f);G.left++}}
 return true}
/* older builds kept files in 'ctm-<timestamp>' under their plain path: move those whose content still matches, then drop the old cache */
async function migrate(c){await moveCdn(c);let olds=[];try{olds=(await caches.keys()).filter(k=>/^ctm-\d+$/.test(k))}catch(e){}if(!olds.length||!crypto.subtle)return;
 const byPath=new Map(MAN.files.map(f=>[new URL(f[0],location.href).href,f]));
 for(const k of olds){const o=await caches.open(k);for(const q of await o.keys()){const f=byPath.get(q.url.split("?")[0]);if(!f||HAVE.has(keyOf(f)))continue;
   try{const r=await o.match(q);const b=await r.arrayBuffer();if(b.byteLength!==f[2])continue;
    const h=[...new Uint8Array(await crypto.subtle.digest("SHA-256",b))].map(x=>x.toString(16).padStart(2,"0")).join("").slice(0,16);
    if(h===f[1]){await c.put(keyOf(f),new Response(b,{headers:{"Content-Type":r.headers.get("content-type")||"application/octet-stream"}}));HAVE.add(keyOf(f))}}catch(e){}}
  await caches.delete(k)}}

/* pictures moved to the CDN (review/cdn-images): 'ctm-assets' entries still under the site's own img/ path move to their CDN key when the
   size matches (the hash changed from sha256 to md5, so content cannot be compared here; a redraw of the same byte size is very rare
   and is fixed by the next redraw/rename), then the old entry goes — no second download of ~700 MB */
async function moveCdn(c){if(!CDNB)return;try{const own=new URL("img/",location.href).href;const byPath=new Map(MAN.files.map(f=>[f[0],f]));let n=0;
 for(const q of await c.keys()){if(!q.url.startsWith(own))continue;const p=decodeURIComponent(q.url.split("?")[0].slice(own.length-4));const f=byPath.get(p);
  if(f&&!HAVE.has(keyOf(f))){const r=await c.match(q);const b=r&&await r.blob();if(b&&b.size===f[2]){await c.put(keyOf(f),new Response(b,{headers:{"Content-Type":r.headers.get("content-type")||"application/octet-stream"}}));HAVE.add(keyOf(f));n++}}
  await c.delete(q)}KLOAD.moved=n}catch(e){}}

async function runCore(){if(!coreList.length){KLOAD.phase="done";close();startBg();return}
 KLOAD.phase="core";screen();paint();
 try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{})}catch(e){}
 try{await pool(coreList,6,"core");coreList=[];KLOAD.phase="done";paint("Đã thỉnh đủ · mời nhập cung");setTimeout(()=>{close();startBg()},700)}
 catch(e){await new Promise(ok=>setTimeout(ok,300));await refresh("core");
  paint(KLOAD.err==="quota"?"Máy không còn chỗ cất tranh. Có thể vào cung ngay; tranh sẽ thỉnh khi cần.":
   KLOAD.err==="offline"?"Mạng đứt. Có mạng lại sẽ thỉnh tiếp phần còn thiếu.":"Mạng chập chờn. Thỉnh tiếp, hoặc vào cung ngay.")}}
/* after a cut: re-read the cache so the next run only asks for what is still missing */
async function refresh(grp){const c=await caches.open(AC);HAVE=new Set((await c.keys()).map(q=>q.url));const G=KLOAD[grp];G.have=0;G.files=0;G.left=0;
 const l=[];for(const f of MAN.files){if(f[3]==="fx"||f[3]==="lazy"||(f[3]==="core")!==(grp==="core"))continue;if(HAVE.has(keyOf(f))){G.have+=f[2];G.files++}else{l.push(f);G.left++}}
 if(grp==="core")coreList=l;else figList=l}
addEventListener("online",()=>{if(KLOAD.err==="offline"){KLOAD.err="";if(KLOAD.phase==="core")runCore();else if(bgOn)runBg()}});

/* ---------- background sets + chip ---------- */
let bgOn=false,bgRun=false;
function paintChip(){const g=KLOAD.fig;if(!bgOn||!g.total)return;
 if(!chip){chip=document.createElement("div");chip.className="kloadchip";document.body.appendChild(chip)}
 const done=!g.left,v=g.total?g.have/g.total*100:100;
 chip.classList.toggle("done",done);if(done&&!chip.__kgone){chip.__kgone=1;chip.addEventListener("animationend",()=>{chip.classList.add("gone");chip.hidden=true;placeChip()},{once:true})}placeChip();
 chip.innerHTML=`<button class="kchip" data-klc="1" aria-label="Thỉnh tranh nhân vật">${done?"Đã thỉnh đủ tranh nhân vật":KLOAD.paused?"Tạm ngưng thỉnh tranh · chạm để thỉnh tiếp":KLOAD.err==="quota"?"Máy hết chỗ cất tranh":KLOAD.err?"Mạng đứt · tranh thỉnh tiếp khi có mạng":"Thỉnh tranh nhân vật"}<span class="kprog-t"><u style="--v:${v.toFixed(1)}%"></u></span><b class="kprog-n" style="font-size:.72rem">${mb(g.have)} / ${mb(g.total)} MB</b></button>`}
/* sits at the bottom-left, lifted above whatever kit bar/panel is docked at the bottom there (tab bar, title menu) so it covers no button */
/* review/hau-cung-ui (owner 11/15 04:15Z: the chip covered "Kẻ hầu 1/1…" and the Hậu cung list): while a life is on screen the chip never floats
   over the game — the game frame gives up a slim strip UNDER the tab bar (body.kload-dock: .game padding-bottom) and the chip sits in it.
   Only a dialog's own buttons lift it (as before). Title screen / no game: the old placement below. */
function placeChip(){if(!chip)return;const H=innerHeight;
 const g=document.querySelector(".game"),tt=document.getElementById("title");const play=!!(g&&g.getClientRects().length&&!(tt&&!tt.hidden&&tt.getClientRects().length));
 const dock=play&&!chip.classList.contains("gone");if(document.body.classList.contains("kload-dock")!==dock){document.body.classList.toggle("kload-dock",dock);try{dispatchEvent(new Event("resize"))}catch(e){}}
 /* a full-screen book (Sổ tuần) owns the whole screen, its page-turn bar included: the chip waits behind it */
 const book=document.body.classList.contains("kbk-open");chip.style.visibility=book?"hidden":"";
 if(dock){let up=0;document.querySelectorAll("#modal:not([hidden]) .dlg,.kpopts").forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||r.left>300||r.bottom<H-60||r.top<H*.35)return;up=Math.max(up,H-r.top)});
  chip.style.bottom=up?`calc(env(safe-area-inset-bottom,0px) + ${Math.round(up)+6}px)`:"calc(env(safe-area-inset-bottom,0px) + 2px)";return}
 let lift=0;
 document.querySelectorAll("#tabs,#modal:not([hidden]) .dlg,#kload .dlg,.kpopts").forEach(e=>{const r=e.getBoundingClientRect();
  if(!r.width||r.left>300||r.bottom<H-60||r.top<H*.35)return;lift=Math.max(lift,H-r.top)});
 /* review 11/15: never over the stage name chips (names are never covered) — sit above the name row it would touch */
 const cw=(chip.firstElementChild||chip).getBoundingClientRect().width||300;
 document.querySelectorAll("#stage .tag,#j59metag>*,#stage .j59more").forEach(e=>{const r=e.getBoundingClientRect();
  if(!r.width||r.left>cw+12||r.right<4||r.top<H*.35||H-r.bottom>lift+60)return;lift=Math.max(lift,H-r.top+2)});
 chip.style.bottom=`calc(env(safe-area-inset-bottom,0px) + ${Math.round(lift)+8}px)`}
addEventListener("resize",placeChip);setInterval(placeChip,1500);
/* test hook (dev/test, review/hau-cung-ui): show the background chip with fake numbers, no download */
KLOAD.testChip=(have,total)=>{bgOn=true;KLOAD.fig.total=total||635e6;KLOAD.fig.have=have||12e6;KLOAD.fig.left=KLOAD.fig.have<KLOAD.fig.total?1:0;paintChip()};
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-klc]");if(!b)return;e.stopPropagation();if(!KLOAD.fig.left)return;
 KLOAD.paused=!KLOAD.paused;try{localStorage.setItem(LS,KLOAD.paused?"1":"0")}catch(x){}paintChip();if(!KLOAD.paused)runBg()},true);
async function startBg(){if(bgOn||!MAN)return;if(!figList.length){KLOAD.phase="all";return}
 const cn=navigator.connection;/* perf budget: no background set on Data-saver, a mobile-data line or a slow line (the pictures the game shows still cache on use) */
 if(cn&&(cn.saveData||cn.type==="cellular"||/^(slow-2g|2g|3g)$/.test(cn.effectiveType||"")))return;
 try{if(navigator.storage&&navigator.storage.estimate){const q=await navigator.storage.estimate();const need=figList.reduce((s,f)=>s+f[2],0);
   if(q&&q.quota&&q.quota-q.usage<need*1.1+50e6){KLOAD.err="quota";bgOn=true;paintChip();return}}}catch(e){}
 bgOn=true;setTimeout(()=>{paintChip();runBg()},2500)}
async function runBg(){if(bgRun||KLOAD.paused||!figList.length)return;bgRun=true;KLOAD.err="";paintChip();
 try{await pool(figList,2,"fig",()=>KLOAD.paused);if(!KLOAD.paused){await refresh("fig");if(!figList.length)KLOAD.phase="all"}}
 catch(e){await refresh("fig").catch(()=>{})}
 bgRun=false;paintChip()}

window.kitLoadReady=function(cb){if(!el)cb();else enterCb.push(cb)};
(async function(){try{KLOAD.phase="check";
 /* show the screen at once if this device has no cache yet; a returning player sees nothing unless something is missing */
 let first=false;try{first=!(await caches.has(AC))}catch(e){}
 if(first){screen();paint()}
 if(!await plan()){close();return}
 /* iOS Safari with (almost) nothing cached yet and no earlier choice: ask first, download nothing */
 if(IOSB&&!chosen()&&coreList.length){if(KLOAD.core.have<KLOAD.core.total*.5){KLOAD.phase="ask";askMode="ask";screen();paint();return}
  try{localStorage.setItem(CHOICE,"1")}catch(e){}}  /* already downloaded here before this notice existed: keep going as before */
 runCore()}catch(e){console.error("jload",e);KLOAD.err=String(e);close()}})();
})();
