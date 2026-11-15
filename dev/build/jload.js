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
const keyOf=f=>new URL(f[0]+"?h="+f[1],location.href).href;
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
@media (max-width:599px){.kload .klb{padding:8px 10px 2px}.kload .kpopts{padding:2px 10px 10px}}
.kloadchip{position:fixed;left:calc(env(safe-area-inset-left,0px) + 8px);bottom:calc(env(safe-area-inset-bottom,0px) + 8px);z-index:8700;max-width:calc(100vw - 16px);opacity:.92}
.kloadchip .kchip{display:inline-flex;align-items:center;gap:7px;margin:0;font-size:.72rem;padding:3px 10px;border-color:var(--gold);background:#fffaf0f0;box-shadow:0 2px 8px #0003;cursor:pointer;font-family:inherit}
.kloadchip .kprog-t{width:64px;flex:none;height:6px}
.kloadchip.done{animation:kloadFade 1.2s 1.5s ease forwards}
@keyframes kloadFade{to{opacity:0;visibility:hidden}}
`;document.head.appendChild(st)})();

/* ---------- the bar (kit 35): label above, track + "a / b MB" beside, sub line under ---------- */
function kitProgress(o){const v=o.total?Math.min(100,o.have/o.total*100):0;
 return `<div class="kprog">${o.label?`<h4 class="kpst">${o.label}</h4>`:""}<div class="kprog-r"><span class="kprog-t" role="progressbar" aria-valuemin="0" aria-valuemax="${Math.round(o.total/1e6)}" aria-valuenow="${Math.round(o.have/1e6)}"><u style="--v:${v.toFixed(1)}%"></u></span><b class="kprog-n">${mb(o.have)} / ${mb(o.total)} MB</b></div><small class="kprog-s">${o.sub||""}</small></div>`}
window.kitProgress=kitProgress;

const IOS=/iP(ad|hone|od)/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const STANDALONE=(window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true;
function eta(left){const now=Date.now();speed=speed.filter(s=>now-s[0]<10000);if(speed.length<8)return"";
 const bps=(speed[speed.length-1][1]-speed[0][1])/Math.max(1,(speed[speed.length-1][0]-speed[0][0])/1000);if(bps<=0)return"";
 const s=left/bps;return s<20?"sắp xong":s<45?"còn chừng nửa phút":s<90?"còn chừng một phút":`còn chừng ${Math.round(s/60)} phút`}
function screen(){if(el)return el;el=document.createElement("div");el.id="kload";el.className="modal kpscene kload";
 try{kitBackdrop(el,"title")}catch(e){}
 el.innerHTML=`<div class="dlg kpanel kpsc" data-kind="notice">${typeof kpHeader==="function"?kpHeader("notice","Cung Tường Mộng","Lần đầu nhập cung · thỉnh tranh vẽ, tiếng nhạc về máy"):""}<div class="klb"></div><div class="kpopts"></div></div>`;
 document.body.appendChild(el);shown=true;return el}
function paint(msg){if(!el)return;const c=KLOAD.core,b=el.querySelector(".klb"),o=el.querySelector(".kpopts");
 const sub=msg||(KLOAD.phase==="check"?"Đang soát tranh đã cất trong máy":eta(c.total-c.have));
 b.innerHTML=kitProgress({label:"Tranh cảnh · đồ vật · tiếng nhạc",have:c.have,total:c.total,sub})+
  `<div class="kpnote">Chỉ thỉnh một lần. Từ lần sau vào cung ngay, không cần mạng; bản mới chỉ thỉnh phần tranh đổi khác.</div>`+
  (KLOAD.fig.total?`<div class="kpnote">Tranh nhân vật (${mb(KLOAD.fig.total-KLOAD.fig.have)} MB) thỉnh dần sau khi ngươi đã vào cung.</div>`:"")+
  (IOS&&!STANDALONE?`<div class="kpnote">Trên iPad, iPhone: thêm Cung Tường Mộng vào màn hình chính để tranh được cất lâu dài.</div>`:"");
 const stuck=KLOAD.err&&KLOAD.phase!=="done";
 o.innerHTML=stuck?`<button class="kbtn alt" data-kl="go">Vào cung ngay</button>${navigator.onLine!==false?`<button class="kbtn" data-kl="retry">Thỉnh tiếp</button>`:""}`:"";}
function close(){if(!el)return;const e=el;el=null;e.classList.add("out");setTimeout(()=>e.remove(),500);enterCb.splice(0).forEach(f=>{try{f()}catch(x){}})}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kl]");if(!b)return;e.stopPropagation();
 if(b.dataset.kl==="go"){KLOAD.phase="skipped";close();startBg()}else if(b.dataset.kl==="retry"){KLOAD.err="";paint();runCore()}},true);

/* ---------- one file: straight into the cache under its content key; progress counts whole files ---------- */
async function getOne(c,f,grp){const g=KLOAD[grp];let got=0;
 for(let t=0;t<4;t++){try{
   const r=await fetch(keyOf(f),{headers:{"x-ctm-load":"1"},cache:"no-cache"});if(!r.ok)throw new Error("http "+r.status);
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
 coreList=[];figList=[];for(const f of MAN.files){const g=f[3]==="core"?"core":"fig",G=KLOAD[g];G.total+=f[2];
  if(HAVE.has(keyOf(f))){G.have+=f[2];G.files++}else{(g==="core"?coreList:figList).push(f);G.left++}}
 return true}
/* older builds kept files in 'ctm-<timestamp>' under their plain path: move those whose content still matches, then drop the old cache */
async function migrate(c){let olds=[];try{olds=(await caches.keys()).filter(k=>/^ctm-\d+$/.test(k))}catch(e){}if(!olds.length||!crypto.subtle)return;
 const byPath=new Map(MAN.files.map(f=>[new URL(f[0],location.href).href,f]));
 for(const k of olds){const o=await caches.open(k);for(const q of await o.keys()){const f=byPath.get(q.url.split("?")[0]);if(!f||HAVE.has(keyOf(f)))continue;
   try{const r=await o.match(q);const b=await r.arrayBuffer();if(b.byteLength!==f[2])continue;
    const h=[...new Uint8Array(await crypto.subtle.digest("SHA-256",b))].map(x=>x.toString(16).padStart(2,"0")).join("").slice(0,16);
    if(h===f[1]){await c.put(keyOf(f),new Response(b,{headers:{"Content-Type":r.headers.get("content-type")||"application/octet-stream"}}));HAVE.add(keyOf(f))}}catch(e){}}
  await caches.delete(k)}}

async function runCore(){if(!coreList.length){KLOAD.phase="done";close();startBg();return}
 KLOAD.phase="core";screen();paint();
 try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{})}catch(e){}
 try{await pool(coreList,6,"core");coreList=[];KLOAD.phase="done";paint("Đã thỉnh đủ · mời nhập cung");setTimeout(()=>{close();startBg()},700)}
 catch(e){await new Promise(ok=>setTimeout(ok,300));await refresh("core");
  paint(KLOAD.err==="quota"?"Máy không còn chỗ cất tranh. Có thể vào cung ngay; tranh sẽ thỉnh khi cần.":
   KLOAD.err==="offline"?"Mạng đứt. Có mạng lại sẽ thỉnh tiếp phần còn thiếu.":"Mạng chập chờn. Thỉnh tiếp, hoặc vào cung ngay.")}}
/* after a cut: re-read the cache so the next run only asks for what is still missing */
async function refresh(grp){const c=await caches.open(AC);HAVE=new Set((await c.keys()).map(q=>q.url));const G=KLOAD[grp];G.have=0;G.files=0;G.left=0;
 const l=[];for(const f of MAN.files){if((f[3]==="core")!==(grp==="core"))continue;if(HAVE.has(keyOf(f))){G.have+=f[2];G.files++}else{l.push(f);G.left++}}
 if(grp==="core")coreList=l;else figList=l}
addEventListener("online",()=>{if(KLOAD.err==="offline"){KLOAD.err="";if(KLOAD.phase==="core")runCore();else if(bgOn)runBg()}});

/* ---------- background sets + chip ---------- */
let bgOn=false,bgRun=false;
function paintChip(){const g=KLOAD.fig;if(!bgOn||!g.total)return;
 if(!chip){chip=document.createElement("div");chip.className="kloadchip";document.body.appendChild(chip)}
 const done=!g.left,v=g.total?g.have/g.total*100:100;
 chip.classList.toggle("done",done);placeChip();
 chip.innerHTML=`<button class="kchip" data-klc="1" aria-label="Thỉnh tranh nhân vật">${done?"Đã thỉnh đủ tranh nhân vật":KLOAD.paused?"Tạm ngưng thỉnh tranh · chạm để thỉnh tiếp":KLOAD.err==="quota"?"Máy hết chỗ cất tranh":KLOAD.err?"Mạng đứt · tranh thỉnh tiếp khi có mạng":"Thỉnh tranh nhân vật"}<span class="kprog-t"><u style="--v:${v.toFixed(1)}%"></u></span><b class="kprog-n" style="font-size:.72rem">${mb(g.have)} / ${mb(g.total)} MB</b></button>`}
/* sits at the bottom-left, lifted above whatever kit bar/panel is docked at the bottom there (tab bar, title menu) so it covers no button */
function placeChip(){if(!chip)return;const H=innerHeight;let lift=0;
 document.querySelectorAll("#tabs,#modal:not([hidden]) .dlg,#kload .dlg,.kpopts").forEach(e=>{const r=e.getBoundingClientRect();
  if(!r.width||r.left>300||r.bottom<H-60||r.top<H*.35)return;lift=Math.max(lift,H-r.top)});
 chip.style.bottom=`calc(env(safe-area-inset-bottom,0px) + ${Math.round(lift)+8}px)`}
addEventListener("resize",placeChip);setInterval(placeChip,1500);
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-klc]");if(!b)return;e.stopPropagation();if(!KLOAD.fig.left)return;
 KLOAD.paused=!KLOAD.paused;try{localStorage.setItem(LS,KLOAD.paused?"1":"0")}catch(x){}paintChip();if(!KLOAD.paused)runBg()},true);
async function startBg(){if(bgOn||!MAN)return;if(!figList.length){KLOAD.phase="all";return}
 const sd=navigator.connection&&navigator.connection.saveData;if(sd)return;
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
 runCore()}catch(e){console.error("jload",e);KLOAD.err=String(e);close()}})();
})();
