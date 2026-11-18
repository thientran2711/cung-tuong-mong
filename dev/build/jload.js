/* ================= jload: NHẬP CUNG LẦN ĐẦU — thỉnh tranh vẽ, tiếng nhạc về máy (owner 11/14) — KIT.md section 35 =================
   assets.json (dev/site/assets.py, built by build_site.sh) lists every image + sound as [path, sha256/16, bytes, group].
   The long-lived cache 'ctm-assets' holds them keyed by content ('<path>?h=<hash>'); sw.js serves it and never wipes it on a build.
   This module fills it:
   1. at every start it compares assets.json with the cache: only new or changed files download (a removed file is pruned by sw.js);
      legacy 'ctm-<timestamp>' caches from older builds are checked by content and moved over, then deleted (no second download).
   2. group 'core' (UI, kit, scenes, maps, items, sounds; ~80 MB) missing → the LOADING SCREEN (title backdrop, kit scene panel, bar with MB)
      blocks entry until done (resumes file by file after a cut or reload; "Vào cung ngay" appears when the line is cut or stalls).
   3. group 'fig' (figures, portraits, event/story/festival art; ~550 MB) then downloads in the background, 2 at a time, with a small
      kit status icon (kitStatusIcon, KIT §77.1: a small square download icon in the stage rail / title dock; tap = info panel with tạm ngưng / thỉnh tiếp, remembered). Save-Data or too little room = skipped (the worker still
      caches each picture the game actually shows).
   navigator.storage.persist() is asked once downloading starts; navigator.storage.estimate() is checked before the background sets.
   Requests carry 'x-ctm-load' so sw.js lets them through and this module writes the cache itself (one write, no copy through page script).
   Test hook: window.KLOAD {phase, core:{have,total,files,left}, fig:{…}, paused, err}. */
(function(){
const KLOAD=window.KLOAD={phase:"idle",core:{have:0,total:0,files:0,left:0},fig:{have:0,total:0,files:0,left:0},paused:false,err:""};
/* no Cache Storage / file:// / bot: no download sets, but the LIFE GATE below still runs (it only waits for the pictures the screen asks for) */
const OFF=!("caches" in window)||!window.fetch||!/^https?:$/.test(location.protocol)||!!window.__bot;
const AC="ctm-assets",LS="ctm-bgpause";
/* how much has arrived, in words (never MB / %): the number beside the kit bar and the panel row */
const dlPortion=g=>{const r=g.total?g.have/g.total:0,P=CTM_WAIT.dlPart;return r>=1?P[4]:r>=.9?P[3]:r>=.5?P[2]:r>=.25?P[1]:P[0]};
const mb=n=>(n/1e6<10?(Math.round(n/1e5)/10):Math.round(n/1e6)).toLocaleString("vi-VN");
/* pictures (img/…) come from Cloudflare (jcdn.js IMG_BASE, dev/art/CDN.md): their key is IMG_BASE+'img/…?h=<md5/16>'; a CDN download is
   marked with &ctmload=1 instead of the x-ctm-load header (a custom header would cost a CORS preflight per file) */
const CDNB=(typeof IMG_BASE==="string"&&IMG_BASE)||"";
const keyOf=f=>new URL(f[0]+"?h="+f[1],CDNB&&f[0].startsWith("img/")?CDNB:location.href).href;
let el=null,shown=false,speed=[],enterCb=[];
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
`;document.head.appendChild(st)})();

/* ---------- the bar (kit 35): label above, track + how much has come (words, KWAIT dlPart) beside, sub line under ---------- */
function kitProgress(o){const v=o.total?Math.min(100,o.have/o.total*100):0;
 return `<div class="kprog">${o.label?`<h4 class="kpst">${o.label}</h4>`:""}<div class="kprog-r"><span class="kprog-t" role="progressbar" aria-valuemin="0" aria-valuemax="${Math.round(o.total/1e6)}" aria-valuenow="${Math.round(o.have/1e6)}"><u style="--v:${v.toFixed(1)}%"></u></span><b class="kprog-n">${dlPortion(o)}</b></div><small class="kprog-s">${o.sub||""}</small></div>`}
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
  o.innerHTML=`<button class="kbtn alt" data-kl="back">Quay lại</button><button class="kbtn alt" data-kl="web">${CTM_WAIT.dlHere}</button>`+(hasSave()?`<button class="kbtn alt" data-kl="peek">${CTM_WAIT.dlPeek}</button>`:"");return}
 head("Chọn nơi chơi trước khi thỉnh tranh");
 b.innerHTML=`<div class="kpnote">${CTM_WAIT.dlAskNote}</div><div class="kpnote">Nên thêm Cung Tường Mộng vào màn hình chính trước, rồi mở từ đó: chỉ thỉnh một lần.</div>`+
  (hasSave()?`<div class="kpnote">Sổ đang cất trong Safari không tự sang ứng dụng. Trước khi chuyển, vào Chọn sổ › Một mình › Sổ mây › Giữ sổ trên mây; ở ứng dụng chọn Nối sổ.</div>`:"");
 o.innerHTML=`<button class="kbtn" data-kl="a2hs">Thêm vào màn hình chính (khuyên)</button><button class="kbtn alt" data-kl="web">${CTM_WAIT.dlHere}</button>`+(hasSave()?`<button class="kbtn alt" data-kl="peek">${CTM_WAIT.dlPeek}</button>`:"")}
function paint(msg){if(!el)return;if(KLOAD.phase==="ask"){paintAsk();return}
 const c=KLOAD.core,b=el.querySelector(".klb"),o=el.querySelector(".kpopts");
 if(IOSB&&KLOAD.phase==="check"&&!MAN){b.innerHTML=`<div class="kpnote">${CTM_WAIT.dlCheck}</div>`;o.innerHTML="";return}
 o.className="kpopts";
 const sub=msg||(KLOAD.phase==="check"?CTM_WAIT.dlCheck:eta(c.total-c.have));
 b.innerHTML=kitProgress({label:"Tranh cảnh · đồ vật · tiếng nhạc",have:c.have,total:c.total,sub})+
  `<div class="kpnote">${CTM_WAIT.dlOnce}</div>`+
  (KLOAD.fig.total?`<div class="kpnote">${CTM_WAIT.dlFig}</div>`:"")+
  (IOSB?`<div class="kpnote">Safari và ứng dụng ở màn hình chính cất tranh riêng: nếu sau này ngươi thêm vào màn hình chính, ứng dụng sẽ thỉnh lại một lần nữa.</div>`:"");
 const stuck=KLOAD.err&&KLOAD.phase!=="done";
 o.innerHTML=stuck?`<button class="kbtn alt" data-kl="go">Vào cung ngay</button>${navigator.onLine!==false?`<button class="kbtn" data-kl="retry">Thỉnh tiếp</button>`:""}`:"";}
function close(){if(!el)return;const e=el;el=null;e.classList.add("out");setTimeout(()=>e.remove(),500);enterCb.splice(0).forEach(f=>{try{f()}catch(x){}})}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kl]");if(!b)return;e.stopPropagation();
 const kl=b.dataset.kl;
 if(kl==="a2hs"){askMode="guide";paint();return}if(kl==="back"){askMode="ask";paint();return}
 if(kl==="peek"){KLOAD.phase="deferred";close();let n=0;const t=setInterval(()=>{const g=document.querySelector('#modal [data-tgo="opt"]');if(g){clearInterval(t);g.click();setTimeout(()=>{const c=document.querySelector(".cloudwrap");if(c)c.scrollIntoView({block:"start"})},350)}else if(++n>40)clearInterval(t)},150);return}  /* into the game with no download: she opens Sổ mây first; the notice returns on the next visit */
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
 const w=async()=>{while(i<list.length&&!dead){if(stop&&stop())return;while(grp!=="core"&&(LIFE.busy>0||LIFE.on))await new Promise(ok=>setTimeout(ok,300));/* the life set goes first */const f=list[i++];
   if(grp!=="core"&&await c.match(keyOf(f))){const g=KLOAD[grp];g.have+=f[2];g.left--;g.files++;continue}  /* the game showed it meanwhile (sw.js cached it) */
   try{await getOne(c,f,grp)}catch(e){dead=true;throw e}}};
 await Promise.all(Array.from({length:Math.min(n,list.length)},w))}

let MAN=null,HAVE=null,coreList=[],figList=[];
/* entry-blank-r3 (owner 18/11 ~18:25Z, blank first screen): NEVER cache.keys() on the whole picture cache. A player's 'ctm-assets' grows with every
   picture shown (lazy) and every build; past ~18 000 entries Chrome refuses it ("Operation too large") — plan() then died in 'check' (core never
   verified, fig never fetched) — and below that it is one huge serialized cache read that every picture of the first screen waits behind.
   Instead: ask the cache for exactly the keys of the listed files (small lookups, 16 at a time). */
async function cacheHave(c,files){const H=new Set();let i=0;const w=async()=>{while(i<files.length){const k=keyOf(files[i++]);try{if((await c.keys(k)).length)H.add(k)}catch(e){}}};
 await Promise.all(Array.from({length:Math.min(16,files.length)},w));return H}
async function plan(){
 let r=null;try{r=await fetch("assets.json",{cache:"no-cache"})}catch(e){}
 if(!r||!r.ok)r=await caches.match("assets.json",{ignoreSearch:true});if(!r)return false;
 MAN=await r.json();const c=await caches.open(AC);HAVE=await cacheHave(c,MAN.files.filter(f=>f[3]==="core"||f[3]==="fig"));
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
async function moveCdn(c){if(!CDNB)return;/* entry-blank-r3: a whole-cache walk — once per device (it moves the pre-CDN copies; nothing new lands under the site's own img/) */try{if(localStorage.getItem("ctm-movecdn"))return;localStorage.setItem("ctm-movecdn","1")}catch(e){return}try{const own=new URL("img/",location.href).href;const byPath=new Map(MAN.files.map(f=>[f[0],f]));let n=0;
 for(const q of await c.keys()){if(!q.url.startsWith(own))continue;const p=decodeURIComponent(q.url.split("?")[0].slice(own.length-4));const f=byPath.get(p);
  if(f&&!HAVE.has(keyOf(f))){const r=await c.match(q);const b=r&&await r.blob();if(b&&b.size===f[2]){await c.put(keyOf(f),new Response(b,{headers:{"Content-Type":r.headers.get("content-type")||"application/octet-stream"}}));HAVE.add(keyOf(f));n++}}
  await c.delete(q)}KLOAD.moved=n}catch(e){}}

async function runCore(){if(!coreList.length){KLOAD.phase="done";close();startBg();return}
 KLOAD.phase="core";screen();paint();
 try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{})}catch(e){}
 try{await pool(coreList,6,"core");coreList=[];KLOAD.phase="done";paint("Đã thỉnh đủ · mời nhập cung");setTimeout(()=>{close();startBg()},700)}
 catch(e){await new Promise(ok=>setTimeout(ok,300));await refresh("core");
  paint(KLOAD.err==="quota"?"Máy không còn chỗ cất tranh. Có thể vào cung ngay; tranh sẽ thỉnh khi cần.":
   KLOAD.err==="offline"?CTM_WAIT.dlOffline:CTM_WAIT.dlFlaky)}}
/* after a cut: re-read the cache so the next run only asks for what is still missing */
async function refresh(grp){const c=await caches.open(AC);const H=await cacheHave(c,MAN.files.filter(f=>(f[3]==="core")===(grp==="core")&&(f[3]==="core"||f[3]==="fig")));HAVE=new Set([...(HAVE||[])].concat([...H]));const G=KLOAD[grp];G.have=0;G.files=0;G.left=0;
 const l=[];for(const f of MAN.files){if(f[3]==="fx"||f[3]==="lazy"||(f[3]==="core")!==(grp==="core"))continue;if(HAVE.has(keyOf(f))){G.have+=f[2];G.files++}else{l.push(f);G.left++}}
 if(grp==="core")coreList=l;else figList=l}
addEventListener("online",()=>{if(KLOAD.err==="offline"){KLOAD.err="";if(KLOAD.phase==="core")runCore();else if(bgOn)runBg()}});

/* ---------- background sets: ONE status icon (KIT §77.1 kitStatusIcon; owner 16/11 16:25Z: no chip, no strip — a small download icon in the corner,
   a calm bobbing arrow while it runs, tap → kit info panel with the details + "Tạm ngưng / Thỉnh tiếp") ---------- */
let bgOn=false,bgRun=false,dlDoneAt=0;
const dlState=()=>{const g=KLOAD.fig,done=!g.left;return{g,done,paused:!!KLOAD.paused&&!done,err:!done&&!KLOAD.paused&&!!KLOAD.err}};
const dlWords=s=>s.done?CTM_WAIT.dlDone:s.paused?CTM_WAIT.dlPaused:KLOAD.err==="quota"?CTM_WAIT.dlQuota:KLOAD.err?CTM_WAIT.dlErrChip:CTM_WAIT.dlRun;
function dlPanel(){const s=dlState(),g=s.g;
 const o=[];if(!s.done&&KLOAD.err!=="quota")o.push({n:s.paused?"Thỉnh tiếp":"Tạm ngưng",x:s.paused?"Cho tranh tiếp tục về máy lúc rảnh.":CTM_WAIT.dlPauseX,fx:{},go:()=>{KLOAD.paused=!KLOAD.paused;try{localStorage.setItem(LS,KLOAD.paused?"1":"0")}catch(x){}paintChip();if(!KLOAD.paused)runBg()}});
 return{kind:"info",look:1,title:"Thỉnh tranh nhân vật",sub:dlWords(s),sections:[
  {h:"Tiến độ",html:kitProgress({have:g.have,total:g.total,sub:s.done?"Đã về đủ, không còn gì phải đợi.":"Tranh về ngầm lúc rảnh, chơi cứ như thường."})},
  {h:"Chi tiết",rows:[["Đang thỉnh","tranh vẽ các nhân vật trong cung"],[CTM_WAIT.dlGot,dlPortion(g)],[CTM_WAIT.dlLeft,s.done?CTM_WAIT.dlNone:CTM_WAIT.dlLeftN.replace("{n}",g.left)]]}],opts:o}}
function paintChip(){const g=KLOAD.fig;if(!bgOn||!g.total||typeof kitStatusIcon==="undefined")return;
 const s=dlState();if(s.done&&!dlDoneAt)dlDoneAt=Date.now();
 kitStatusIcon.set("dl",{title:"Thỉnh tranh nhân vật",order:40,icon:"img/kit/ico-download.webp",
  busy:()=>{const q=dlState();return !q.done&&!q.paused&&!KLOAD.err},done:()=>dlState().done,badge:()=>{const q=dlState();return q.paused||q.err},
  show:()=>!dlState().done||Date.now()-dlDoneAt<5000,panel:dlPanel});
 kitStatusIcon.refresh();if(s.done)setTimeout(()=>{try{kitStatusIcon.refresh()}catch(e){}},5200)}
/* test hook (dev/test, review/hau-cung-ui, review/status-icons): show the status icon with fake numbers, no download */
KLOAD.testChip=(have,total)=>{bgOn=true;KLOAD.fig.total=total||635e6;KLOAD.fig.have=have||12e6;KLOAD.fig.left=KLOAD.fig.have<KLOAD.fig.total?1:0;paintChip()};
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

/* ---------- LIFE GATE (owner OD 18/11 ~01:50Z "vô game mà thấy những cái ô nó trống ... cảm giác như nó bị lag"; review/life-preload; KIT §35.3) ----------
   The 'core' set above is the same for every life; the faces, figures, room and event pictures of ONE life are 'fig' / 'lazy' (on use).
   1. LIFE SET (kitLifeSet): the pictures this life needs now — her portrait + figure, the Emperor, the Thái hậu, her maid, the court physician and
      eunuch, her servants, the people standing in the place she is in, consorts whose figure is already chosen, the room scene, the pictures of the
      first queued dialogs (Q) — PLUS every picture the screen itself is showing and has not finished (Luân hồi wheel, identity card, top bar chips…).
   2. Whenever a life starts or changes (new life, Tiếp tục, Luân hồi, co-op join, a load: a new S object reaches render(), or start() is called),
      the kit loading screen of §35 covers the game at once (same frame, kitProgress, CTM_WAIT words; never % / MB) until every one of them is in
      and decoded, then fades out. A slow line: after 6 s the kit button "Vào cung ngay"; after 25 s she enters anyway.
   3. During play the life set is re-checked after renders (at most every 2.5 s) and anything new (people met, a new rank tier, a new palace) is
      fetched at once; the background 'fig' pool waits while the life set is busy (front of the line).
   4. A dialog whose picture is not in yet waits hidden for it (at most 3 s), never opens with an empty picture box.
   Test hook: KLOAD.life {n, bytes, ms, late, why}; node dev/test/life-preload.js. */
const LIFE={busy:0,on:false,keep:new Map(),done:new Set(),seen:new WeakSet(),again:false,go:false,dirty:0};
KLOAD.life=null;window.KLIFE=LIFE;LIFE.pend=()=>lPending();
const lAbs=u=>{u=String(u||"");if(!u||/^(data|blob):/.test(u))return"";try{return new URL(typeof IMG_U==="function"?IMG_U(u):u,location.href).href}catch(e){return""}};
let SIZE=null;function sizeOf(u){try{if(!MAN)return 0;if(!SIZE){SIZE=new Map();for(const f of MAN.files)SIZE.set(f[0],f[2])}const m=/img\/[^?#]*/.exec(u);return m?SIZE.get(decodeURIComponent(m[0]))||0:0}catch(e){return 0}}
const lOk=u=>LIFE.done.has(u)||((LIFE.keep.get(u)||{}).ok!=null);
/* one picture: load + decode (kept alive meanwhile, so it paints at once); raw = the string the game itself uses (PORK key of j39 porOf) */
function lWant(u,raw){if(LIFE.done.has(u))return Promise.resolve(true);let e=LIFE.keep.get(u);if(e)return e.p;const im=new Image();im.decoding="async";e={im,ok:null};LIFE.keep.set(u,e);LIFE.busy++;
 let res;e.p=new Promise(r=>{res=r});
 const fin=ok=>{if(e.ok!=null)return;e.ok=ok;LIFE.busy--;res(ok);
  /* entry-blank-r3: a full-body figure is measured (kit body box, kitFigBody) as soon as it is here — the room stage hides its people until every
     figure on it is measured (j59 'j59wait'), which was the ~2 s empty room after the gate / on Tiếp tục */
  if(ok&&/\/fig-/.test(u))try{if(typeof kitFigBody==="function")setTimeout(()=>{try{kitFigBody(raw||u,null)}catch(x){}},0)}catch(x){}
  if(ok&&/\/por-/.test(u))try{if(typeof PORK!=="undefined"){[u,raw].forEach(k=>{if(k&&PORK[k]!==1){PORK[k]=1;LIFE.dirty=1}})}}catch(x){}
  setTimeout(()=>{LIFE.keep.delete(u);LIFE.done.add(u)},90000)};
 im.onload=()=>{(im.decode?im.decode().catch(()=>0):Promise.resolve()).then(()=>fin(true))};im.onerror=()=>fin(false);im.src=u;setTimeout(()=>fin(false),45000)/* review r6: a picture that never answers (stalled line) no longer holds LIFE.busy (fig pool, title prefetch) forever */;return e.p/* review r6: the title prefetch chains on it (was undefined: pPump threw after the first picture) */}
/* the pictures of THIS life (raw strings → absolute); never assigns a figure to someone who has none yet (figFor would pick one) */
function kitLifeSet(){const M=new Map();const add=r=>{if(r&&typeof r==="string"){const a=lAbs(r);if(a)M.set(a,r)}};
 try{if(typeof S==="undefined"||!S||typeof figFor!=="function")return M;
  const ppl=[S,{kind:"emp"},{kind:"th"},S.maid,S.court&&S.court.ty,S.court&&S.court.ksp].concat(S.staff||[]);
  try{if(typeof curPeople==="function")curPeople().forEach(p=>ppl.push(p))}catch(e){}
  try{(typeof rivals!=="undefined"&&rivals||[]).forEach(v=>{if(v&&!v.dead&&v.fid)ppl.push(v)})}catch(e){}
  /* only people whose figure is already chosen (fid): never choose one here — a choice made on a save's copy (title prefetch) would differ
     from the one the game makes later, and someone without one has not been on screen yet (the gate's DOM scan covers the first screen) */
  for(const p of ppl){if(!p)continue;try{const w=typeof figWho==="function"?figWho(p):p;if(!w||!w.fid)continue;add(figFor(p,"por"));add(figFor(p))}catch(e){}}
  try{if(typeof evArt==="function")add(evArt())}catch(e){}
  try{if(typeof Q!=="undefined"&&typeof kitEvArt==="function")Q.slice(0,3).forEach(m=>{const a=kitEvArt(m);if(a&&a.src)add(a.src)})}catch(e){}}catch(e){}
 return M}
window.kitLifeSet=kitLifeSet;
/* pictures on screen that have not arrived yet (inside the viewport, a real box, not hidden) */
function lPending(root){const out=[],H=innerHeight,W=innerWidth;for(const im of (root||document).querySelectorAll("img")){if(im.complete)continue;const s=im.currentSrc||im.src;if(!s||/^data:/.test(s))continue;
 if(im.closest("#klife,#kload"))continue;const r=im.getBoundingClientRect();if(r.width<16||r.height<16||r.bottom<0||r.top>H||r.right<0||r.left>W)continue;
 if(!im.offsetParent&&getComputedStyle(im).position!=="fixed")continue;out.push(s)}return out}
/* CSS backgrounds of the visible screen (room scene, cards, icons drawn as backgrounds): absolute URLs, not yet here */
function lBgs(){const out=[],H=innerHeight,W=innerWidth;for(const e of document.body.getElementsByTagName("*")){const bg=getComputedStyle(e).backgroundImage;if(!bg||bg==="none"||bg.indexOf("url(")<0)continue;
 if(e.closest("#klife,#kload"))continue;const r=e.getBoundingClientRect();if(!r.width||!r.height||r.bottom<0||r.top>H||r.right<0||r.left>W)continue;
 for(const m of bg.matchAll(/url\("?([^")]+)"?\)/g)){const u=lAbs(m[1]);if(u&&!/^data:/.test(u))out.push(u)}}return out}
/* a core picture is in the local cache since the first loading screen: never a reason to show the gate */
/* entry-blank-r3: ...but only when this device really holds it — the core check finished ('done' / 'all') or the file was seen in the cache (HAVE).
   Before the check ends (a sổ tapped / reopened right after a new build), after 'Vào cung ngay' (skipped) or with no manifest, a core picture is
   NOT assumed here: the gate loads it like any other (a frame when it is cached, so the cover never shows then). */
let CORE=null;function lCore(u){try{if(!MAN)return false;if(!CORE)CORE=new Map(MAN.files.filter(f=>f[3]==="core").map(f=>[f[0],f]));const m=/img\/[^?#]*/.exec(u);const f=m&&CORE.get(decodeURIComponent(m[0]));if(!f)return false;
 return KLOAD.phase==="done"||KLOAD.phase==="all"||!!(HAVE&&HAVE.has(keyOf(f)))}catch(e){return false}}
let lel=null;
function lCover(){if(lel)return lel;lel=document.createElement("div");lel.id="klife";lel.className="modal kpscene kload klife";
 try{kitBackdrop(lel,"title")}catch(e){}
 lel.innerHTML=`<div class="dlg kpanel kpsc" data-kind="notice"><div class="klh">${typeof kpHeader==="function"?kpHeader("notice","Cung Tường Mộng",CTM_WAIT.lifeHead):""}</div><div class="klb"></div><div class="kpopts"></div></div>`;
 document.body.appendChild(lel);return lel}
function lPaint(have,total,slow){if(!lel)return;const b=lel.querySelector(".klb"),o=lel.querySelector(".kpopts");
 b.innerHTML=kitProgress({label:CTM_WAIT.lifeLabel,have,total,sub:slow?CTM_WAIT.lifeSlow:""})+`<div class="kpnote">${CTM_WAIT.lifeNote}</div>`;
 const want=slow?`<button class="kbtn alt" data-klife="go">${CTM_WAIT.lifeGo}</button>`:"";if(o.innerHTML!==want)o.innerHTML=want}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-klife]");if(!b)return;e.stopPropagation();LIFE.go=true},true);
const lSleep=t=>new Promise(ok=>setTimeout(ok,t));
async function lifeGate(why){(LIFE.calls=LIFE.calls||[]).push(why);/* test counter: gate runs per reason (dev/test/coop-lifegate.js) */if(LIFE.off)return;/* test hook: KLIFE.off = no gate (mid-load shots of §59.1) */if(LIFE.on){LIFE.again=true;return}
 if(why!=="start"){const L=kitLifeSet();lBgs().forEach(u=>{if(!lCore(u))L.set(u,u)});let miss=0;/* a background not yet seen this session counts as missing: a short gate (local cache) rather than one empty frame */const mw=[];L.forEach((raw,u)=>{if(!lOk(u)&&!lCore(u)){miss++;mw.push(u.split("/").pop());lWant(u,raw)}});
  /* pictures already on the device (core set, or brought in by the title prefetch) paint within a frame: not a reason for the screen */
  const pd=lPending().filter(u=>{const a=lAbs(u);return !lOk(a)&&!lCore(a)});KLOAD.lifeMiss=mw.concat(pd.map(u=>u.split("/").pop())).slice(0,12);if(!miss&&!pd.length){(KLOAD.lifes=KLOAD.lifes||[]).push({why,n:L.size,bytes:0,ms:0,late:0,cached:true});return}}
 LIFE.on=true;LIFE.go=false;const t0=Date.now();lCover();
 const st=KLOAD.life={why,n:0,bytes:0,ms:0,late:0};(KLOAD.lifes=KLOAD.lifes||[]).push(st);const all=new Set();let quiet=0,it=0,fin=false;
 try{for(;;){const L=kitLifeSet();if(it++%5===0)lBgs().forEach(u=>{if(!L.has(u))L.set(u,u)});L.forEach((raw,u)=>{lWant(u,raw);all.add(u)});const pend=lPending();pend.forEach(u=>all.add(u));
   if(LIFE.dirty&&![...L.keys()].some(u=>!lOk(u))&&Date.now()-t0<25000){LIFE.dirty=0;try{if(typeof S!=="undefined"&&S&&typeof render==="function")render()}catch(e){}quiet=0;await lSleep(60);continue}
   const lp=[...L.keys()].filter(u=>!lOk(u)),pset=new Set(pend);let have=0;all.forEach(u=>{if(!pset.has(u)&&(lOk(u)||!L.has(u)))have++});
   const slow=Date.now()-t0>6000;lPaint(have,Math.max(1,all.size),slow);
   if(!pend.length&&!lp.length){if(++quiet>=2){if(fin)break;/* last round: draw once more (icons that wait for a probe, e.g. letters → painted icon), then check again incl. backgrounds */
     fin=true;quiet=0;it=0;try{if(typeof S!=="undefined"&&S&&typeof render==="function")render()}catch(e){}}}else quiet=0;
   if(LIFE.go||Date.now()-t0>25000){st.late=pend.length+lp.length;break}
   await lSleep(120)}}catch(e){console.error("life gate",e)}
 st.n=all.size;st.bytes=[...all].reduce((s,u)=>s+sizeOf(u),0);st.ms=Date.now()-t0;
 const c=lel;lel=null;if(c){c.classList.add("out");setTimeout(()=>c.remove(),500)}
 LIFE.on=false;/* review r6: the loop above already re-reads kitLifeSet() of the CURRENT S every round; a re-run after the 25 s cap or 'Vào cung ngay' covered the game again for the same pictures (25 s + 25 s, one flash between) */
 if(LIFE.again){LIFE.again=false;if(!st.late&&!LIFE.go)setTimeout(()=>lifeGate("again"),0)}}
window.kitLifeGate=lifeGate;
/* entry-blank-r3: the two kit silhouettes (KIT §59.1 stand-in of a figure on its way) measured once at boot, so the first stage never waits for them */
/* entry-blank-r3: the two kit silhouettes (KIT §59.1 stand-in of a figure on its way): their body box is known (fixed kit art), so it is set at boot
   (KIT_SILBB = kitFigBody of img/kit/unknown-fig-f|m.webp; dev/test/entry-blank.js checks it against a live measure) — the room stage never waits
   seconds for a measure of the silhouette it shows while the real figure loads (was 2–3.5 s of empty room on Tiếp tục). */
const KIT_SILBB={f:{t:0,b:.998,l:.1764,r:.8606,ht:.044,ar:.5407,cl:.2074,cr:.8296},m:{t:0,b:1,l:.088,r:.8989,ht:.044,ar:.4563,cl:.1487,cr:.8382}};window.KIT_SILBB=KIT_SILBB;
try{const FB=window.__KITFB||(window.__KITFB={});["f","m"].forEach(g=>{const v=Object.assign({},KIT_SILBB[g]);v.wl=Array(21).fill(v.l);v.wr=Array(21).fill(v.r);
 [(typeof IMG_BASE!=="undefined"?IMG_BASE:"")+"img/kit/unknown-fig-"+g+".webp","img/kit/unknown-fig-"+g+".webp"].forEach(k=>{if(!FB[k])FB[k]={v,w:[]}})})}catch(e){}
setTimeout(()=>{try{["f","m"].forEach(g=>{if(typeof j59unkSrc==="function")j59unkSrc(g)})}catch(e){}},0);
/* TITLE PREFETCH (owner 18/11 02:06Z "không lẽ bây giờ tôi cứ bấm từng kiếp"): as soon as the game opens, the life sets of EVERY saved life
   (all slots, newest first) come in the background, 4 at a time, before the generic 'fig' set (it waits while LIFE.busy) — so tapping any life
   is usually instant and the gate above shows nothing. The set of a save is read by lending its S / rivals to kitLifeSet for one synchronous call. */
function kitSaveLifeSet(d){const M=new Map();if(!d||!d.S)return M;const S0=S,R0=rivals;
 try{S=d.S;rivals=Array.isArray(d.R)?d.R:[];try{if(!S.origin&&typeof originByKey==="function")S.origin=originByKey(d.ok)}catch(e){}return kitLifeSet()}catch(e){KLOAD.prefetchErr=String(e);return M}finally{S=S0;rivals=R0}}
window.kitSaveLifeSet=kitSaveLifeSet;
const PQ=[];let pAct=0;function pPump(){while(pAct<4&&PQ.length){const [u,raw]=PQ.shift();if(lOk(u))continue;pAct++;lWant(u,raw).then(()=>{pAct--;pPump()})}}
function titlePrefetch(){try{if(window.__bot||typeof SK!=="function"||typeof loadSlot!=="function")return;
 const L=[];for(let n=1;n<=3;n++){const d=loadSlot(n);if(d&&d.S)L.push(d)}L.sort((a,b)=>(b.at||0)-(a.at||0));
 const seen=new Set();let n=0,bytes=0;for(const d of L)kitSaveLifeSet(d).forEach((raw,u)=>{if(seen.has(u)||lOk(u))return;seen.add(u);PQ.push([u,raw]);n++;bytes+=sizeOf(u)});
 KLOAD.prefetch={lives:L.length,n,bytes};pPump()}catch(e){console.error("title prefetch",e)}}
(function wait(k){try{if(typeof FIGIX!=="undefined"&&Object.keys(FIGIX).length&&!(typeof S!=="undefined"&&S)){titlePrefetch();return}}catch(e){}if(k<90)setTimeout(()=>wait(k+1),1000)})(0);/* FIGIX (the figure index) is built a moment after FIGS */
/* a dialog never opens with an empty picture box: hidden (layout kept) until its pictures are in, at most 3 s */
function lDlgWait(){try{const M=document.getElementById("modal");if(!M||M.hidden||LIFE.on)return;const d=M.querySelector(".dlg");if(!d)return;
 if(!lPending(d).length){M.classList.remove("klifewait");return}const t0=Date.now();M.classList.add("klifewait");clearInterval(lDlgWait.t);
 lDlgWait.t=setInterval(()=>{if(!lPending(M).length||Date.now()-t0>3000||M.hidden){clearInterval(lDlgWait.t);M.classList.remove("klifewait")}},80)}catch(e){}}
(function(){const st=document.createElement("style");st.id="kit-life";st.textContent=`#modal.klifewait>.dlg{opacity:0;pointer-events:none}
.modal.klife{z-index:2147483500}.modal.klife .dlg.kpsc{opacity:0;animation:klifeIn .3s ease .45s forwards}@keyframes klifeIn{to{opacity:1}}`;document.head.appendChild(st)})();
let lReq=0;
function lArm(){try{if(window.__bot||(window.COOPW&&COOPW.ctx))return;if(typeof S==="undefined"||!S||typeof S!=="object")return;
 if(!LIFE.seen.has(S)){LIFE.seen.add(S);
  /* review/life-preload-fu (B): in co-op every week merge (fromCanon → deser) builds a NEW S for the SAME life; the cover is only for a REAL life change = this seat's life counter (COOPW.life) or her name changed since the last gate. Same life: no cover, no full DOM scan — the pictures are fetched quietly (set below) and §59.1 covers any that is late. Both seats run the same rule on their own S. */
  const cw=window.COOPW;if(cw&&cw.on){const k=(cw.life||0)+"|"+(S.name||"");if(LIFE.ck===k){try{kitLifeSet().forEach((raw,u)=>lWant(u,raw))}catch(e){}
   /* r2 (review r1 FAIL: 2/10 co-op runs left a queued dialog hidden, week never ended): the old per-merge gate ended with one render(), and the co-op render wrap (jcoopworld reshowQ) re-shows a queued dialog the merge rebuild dropped. Keep exactly that ONE post-merge redraw, without the cover, only when a dialog is queued. */
   setTimeout(()=>{try{if(cw.on&&typeof Q!=="undefined"&&Q&&Q.length&&typeof render==="function")render()}catch(e){}},150);return}LIFE.ck=k}
  lifeGate("life");return}
 const now=Date.now();if(now-lReq<2500)return;lReq=now;/* off the render path (perf): when the page is idle */
 (window.requestIdleCallback||(f=>setTimeout(f,200)))(()=>{try{kitLifeSet().forEach((raw,u)=>lWant(u,raw))}catch(e){}},{timeout:3000})}catch(e){}}
setTimeout(function(){try{
 if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);lArm();return r};window.render=render}
 if(typeof start==="function"){const s0=start;start=function(){if(!window.__bot&&!(window.COOPW&&COOPW.ctx))lifeGate("start");return s0.apply(this,arguments)};window.start=start}
 if(typeof showModal==="function"){const m0=showModal;showModal=function(){const r=m0.apply(this,arguments);if(!window.__bot)lDlgWait();return r};window.showModal=showModal}
}catch(e){console.error("life gate wiring",e)}},0);

if(!OFF)(async function(){try{KLOAD.phase="check";
 /* show the screen at once if this device has no cache yet; a returning player sees nothing unless something is missing */
 let first=false;try{first=!(await caches.has(AC))}catch(e){}
 if(first){screen();paint()}
 if(!await plan()){close();return}
 /* iOS Safari with (almost) nothing cached yet and no earlier choice: ask first, download nothing */
 if(IOSB&&!chosen()&&coreList.length){if(KLOAD.core.have<KLOAD.core.total*.5){KLOAD.phase="ask";askMode="ask";screen();paint();return}
  try{localStorage.setItem(CHOICE,"1")}catch(e){}}  /* already downloaded here before this notice existed: keep going as before */
 runCore()}catch(e){console.error("jload",e);KLOAD.err=String(e);close()}})();
})();
