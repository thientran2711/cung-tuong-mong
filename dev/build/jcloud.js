/* ================= jcloud: SỔ MÂY — one character on phone AND iPad (owner 15/11, C44, review/cloud-save) =================
   Chọn sổ › Một mình (top, above the 3 sổ; owner 16/11) AND Thiết lập › Sổ mây — the same part (miniHTML/sectionHTML + btnsHTML): "Giữ sổ trên mây" asks the Worker (coop/worker/src/vault.js, same ctm-coop Worker) for a private
   8-letter ám hiệu sổ (owner design; Crockford base32, guessing stopped by the Worker's per-network miss guard); "Nối sổ" + that ám hiệu links another device. Local-first: the sổ stay in localStorage
   (j6 SK(n)), the cloud is a copy.
   SYNC (run): base = the cloud version this device last matched (C.rev + per-sổ hashes C.h). For each sổ one/hai/ba:
     only this device changed it → send; only the cloud changed it → take it; both → CONFLICT: a kit panel shows both copies
     (Kiếp, Tuổi, Ngày, Ghi lúc · máy) and she picks; the copy she drops stays in the cloud's last 10 versions
     (a backup version is sent before a cloud copy overwrites this device). The sổ being played right now always counts as changed.
   WHEN: on opening the game and on every visit to the title (pull + push), at the end of every buổi and when the app is hidden (push).
   CO-OP: a co-op life lives on the room's server (newest personal state wins there); the cloud never carries or overwrites it.
     It carries the co-op ROOM LIST (jslots "ctm-coop-rooms") with the pid used in each room, so the other device rejoins the same
     seat (jcoop pidFor via "ctm-coop-pids"). Rooms merge by union (newest line wins), never conflict.
   Kit only (KIT §8 panel, §9 kitRows, §29 kitInput, .kslot card of j74, .kbtn/.kbtn.alt/.ksel, .kpnote). Words: VANPHONG.md. */
(function(){try{
const T=$("title");if(!T||typeof saveCode!=="function"||typeof readCode!=="function")return;
const KEY="ctm-cloud",NO={1:"một",2:"hai",3:"ba"};
const LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let C=null;function loadC(){let c=null;try{c=JSON.parse(LS.get(KEY)||"null")}catch(e){}C=c&&typeof c==="object"&&typeof c.k==="string"?c:{};if(!C.h)C.h={}}
function saveC(){if(C&&C.k)LS.set(KEY,JSON.stringify(C));else LS.del(KEY)}
loadC();
const url=()=>String(window.CTM_VAULT_URL||(window.COOP&&COOP.url)||"https://ctm-coop.victoria-tntt.workers.dev").replace(/\/+$/,"");
async function api(op,body,keep){const ac=typeof AbortController==="function"?new AbortController():null;const tm=ac?setTimeout(()=>ac.abort(),20000):0;
 try{const s=JSON.stringify(body||{});const r=await fetch(url()+"/api/vault/"+op,{method:"POST",headers:{"content-type":"application/json"},body:s,signal:ac&&ac.signal,keepalive:!!keep&&s.length<60000,cache:"no-store"});
  let j=null;try{j=await r.json()}catch(e){}return {s:r.status,j:j||{}}}catch(e){return {s:0,j:{}}}finally{clearTimeout(tm)}}
/* change detection: a sổ's text without its write time ("at") and without title-screen panels caught in the pending list
   (a save made while the title is up holds the title's own kptitle panel in P; that is not a change of the life) */
function norm(s){try{const d=JSON.parse(s);delete d.at;if(Array.isArray(d.P))d.P=d.P.filter(x=>!(x&&/kptitle/.test(x.cls||"")));return JSON.stringify(d)}catch(e){return String(s).replace(/"at":\d+/g,"")}}
function clean(s){try{const d=JSON.parse(s);if(Array.isArray(d.P)&&d.P.some(x=>x&&/kptitle/.test(x.cls||""))){d.P=d.P.filter(x=>!(x&&/kptitle/.test(x.cls||"")));return JSON.stringify(d)}}catch(e){}return s}
function hash(s){if(s==null)return "";s=norm(s);let h1=0xdeadbeef,h2=0x41c6ce57;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}
 h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return (h2>>>0).toString(36)+(h1>>>0).toString(36)}
function rawSlot(n){return loadSlot(n)?LS.get(SK(n)):null}
function devLabel(){const t=("ontouchstart" in window)||(navigator.maxTouchPoints>0);const m=Math.min(innerWidth,innerHeight);return !t?"Máy tính":m<800?"Điện thoại":"Máy tính bảng"}
function sumOf(raw){try{const d=JSON.parse(raw);const s=d.S;return {n:String(s.name||""),w:window.CTM_SLOTWHO?CTM_SLOTWHO(s):"",a:Number.isInteger(s.age)?s.age:null,d:[window.CTM_SLOTDATE?CTM_SLOTDATE(s):"",typeof BUOI!=="undefined"&&BUOI[s.buoi||0]?String(BUOI[s.buoi||0]).toLowerCase():""].filter(Boolean).join(", "),at:d.at||0}}catch(e){return null}}
const okPid=p=>typeof p==="string"&&/^[A-Za-z0-9]{8,32}$/.test(p);
function roomsOut(){let L=[];try{L=window.CTM_ROOMS?CTM_ROOMS.list():[]}catch(e){}
 return L.filter(r=>/^[A-Z0-9]{4}$/.test(r.room||"")).slice(0,3).map(r=>{let pid="";try{pid=window.COOP&&COOP.pidFor?COOP.pidFor(r.room):""}catch(e){}
  return {room:r.room,seat:r.seat==="a"||r.seat==="b"?r.seat:"",pid:okPid(pid)?pid:"",name:String(r.name||""),who:String(r.who||""),age:Number.isInteger(r.age)?r.age:null,date:String(r.date||""),fr:String(r.fr||""),at:+r.at||0}})}
const roomsKey=L=>hash(JSON.stringify((L||[]).map(r=>[r.room,r.seat,r.pid,r.name,r.who,r.age,r.date]).sort()));
/* rooms: union by code, the newer line wins; a room this device never joined takes the other device's pid (same seat) */
function mergeRooms(cl){if(!Array.isArray(cl)||!cl.length)return;let L=[];try{L=JSON.parse(LS.get("ctm-coop-rooms")||"[]")}catch(e){}if(!Array.isArray(L))L=[];
 let P={};try{P=JSON.parse(LS.get("ctm-coop-pids")||"{}")||{}}catch(e){}
 for(const r of cl){if(!r||!/^[A-Z0-9]{4}$/.test(r.room||""))continue;const i=L.findIndex(x=>x&&x.room===r.room);
  if(i<0){if(okPid(r.pid)&&!P[r.room])P[r.room]=r.pid;const o={room:r.room,seat:r.seat,at:r.at||0,name:r.name,who:r.who,age:r.age,date:r.date,fr:r.fr};L.push(o)}
  else if((+r.at||0)>(+L[i].at||0)){L[i]=Object.assign({},L[i],{seat:r.seat||L[i].seat,at:r.at,name:r.name,who:r.who,age:r.age,date:r.date,fr:r.fr})}}
 L.sort((a,b)=>(+b.at||0)-(+a.at||0));LS.set("ctm-coop-rooms",JSON.stringify(L.slice(0,3)));LS.set("ctm-coop-pids",JSON.stringify(P))}
async function bundle(L){const slots={},sum={};for(const n of [1,2,3]){const r=L[n];slots[n]=r?await saveCode(clean(r)):null;sum[n]=r?sumOf(r):null}
 return {dev:C.dev||(C.dev=devLabel()),slots,sum,rooms:roomsOut()}}
/* cloud sổ → text (undefined = this build cannot read it: never overwrite the local sổ with it) */
async function decode(slots){const o={};for(const n of [1,2,3]){const v=slots&&slots[n];if(v==null){o[n]=null;continue}try{o[n]=JSON.stringify(await readCode(v))}catch(e){o[n]=undefined}}return o}
/* a sổ overwritten under a life that is still in memory: that life must not write it back (j6 save) */
let STALE=null;
/* with Sổ mây on, a solo life is not written while the title is up: she left the game (☰ saved it), "Tiếp tục" reloads it from
   the sổ, and a background save there would only make a false "changed on this device" (→ a needless conflict) */
{const f=save;save=function(){if(STALE&&S&&S===STALE.s&&SLOT===STALE.n)return;if(C.k&&!T.hidden&&S&&typeof S==="object"&&!S.coopRoom&&!S.dead)return;return f.apply(this,arguments)}}
function writeSlot(n,raw){if(raw==null)LS.del(SK(n));else LS.set(SK(n),raw);if(n===SLOT&&S&&typeof S==="object"&&!S.coopRoom)STALE={s:S,n}}
const playing=()=>T.hidden&&typeof S==="object"&&S&&!S.dead;
let BUSY=null,AGAIN=false,STATE="";
function sync(o){if(!C.k)return Promise.resolve("");if(BUSY){AGAIN=true;return BUSY}
 STATE="busy";wire();BUSY=(async()=>{let r="";try{for(let i=0;i<3;i++){r=await run(o||{});if(r!=="retry")break}}catch(e){console.error(e);r="err"}
  BUSY=null;STATE="";if(r==="ok"||r==="same"){C.err="";C.sy=Date.now()}saveC();wire();if(AGAIN){AGAIN=false;setTimeout(()=>sync(o),50)}
  if(C.pend&&!T.hidden)setTimeout(()=>{if(!T.hidden&&PG!=="pick")open("pick")},30);return r})();return BUSY}
async function run(o){
 if(C.pend&&!o.resolve)return "conflict";
 const playN=playing()&&!S.coopRoom?SLOT:0;
 const L={},hl={};for(const n of [1,2,3]){L[n]=rawSlot(n);hl[n]=hash(L[n])}
 const hd=await api("head",{k:C.k},o.keep);
 if(hd.s!==200){C.err=hd.s===0?"net":hd.s===404?"gone":hd.s===429?"slow":"srv";return "err"}
 const head=hd.j;let cH=Object.assign({},C.h),cR=C.rh||"";
 if((head.rev||0)!==(C.rev||0)&&head.rev>0){
  const g=await api("get",{k:C.k});if(g.s!==200){C.err=g.s===0?"net":"srv";return "err"}
  if(g.j.rev!==head.rev)return "retry";
  const cl=await decode(g.j.slots);const conf=[];
  for(const n of [1,2,3]){if(cl[n]===undefined){cH[n]=hl[n];continue}const hc=hash(cl[n]);cH[n]=hc;if(hc===hl[n])continue;
   const lc=hl[n]!==(C.h[n]||"")||n===playN,cc=hc!==(C.h[n]||"");
   if(!cc)continue;if(!lc){writeSlot(n,cl[n]);L[n]=cl[n];hl[n]=hc}else conf.push(n)}
  mergeRooms(g.j.rooms||[]);cR=roomsKey(g.j.rooms||[]);
  if(conf.length){C.pend={rev:head.rev,slots:conf,at:head.at,dev:head.dev,sum:head.sum,h:cH,rh:cR};C.err="";refreshTitle();return "conflict"}
  refreshTitle()}
 const rk=roomsKey(roomsOut());
 const need=[1,2,3].some(n=>hl[n]!==(cH[n]||""))||rk!==cR||!head.rev&&([1,2,3].some(n=>L[n])||rk!==roomsKey([]));
 if(!need){C.rev=head.rev||0;C.h=hl;C.rh=rk;return "same"}
 const b=await bundle(L);
 const p=await api("put",{k:C.k,base:head.rev||0,b},o.keep);
 if(p.s===409)return "retry";
 if(p.s!==200){C.err=p.s===0?"net":p.s===429?"slow":p.s===413||p.s===400?"big":p.s===404?"gone":"srv";return "err"}
 C.rev=p.j.rev;C.h=hl;C.rh=rk;C.at=Date.now();C.err="";return "ok"}
/* she picked one copy per sổ in conflict */
async function resolve(pick){const P=C.pend;if(!P)return;STATE="busy";wire();
 try{const g=await api("get",{k:C.k,rev:P.rev});if(g.s!==200){C.err=g.s===0?"net":"srv";return}
  const cl=await decode(g.j.slots);
  if(P.slots.some(n=>pick[n]==="cloud")){const L={};for(const n of [1,2,3])L[n]=rawSlot(n);const bk=await api("put",{k:C.k,base:0,keep:1,b:await bundle(L)});if(bk.s!==200){C.err=bk.s===0?"net":"srv";return}}
  for(const n of P.slots)if(pick[n]==="cloud"&&cl[n]!==undefined)writeSlot(n,cl[n]);
  C.rev=P.rev;C.h=P.h;C.rh=P.rh;delete C.pend;saveC()}finally{STATE=""}
 await sync({resolve:1});refreshTitle()}
/* restore one of the 10 versions: this device's sổ go to a backup version first */
async function restore(rev){STATE="busy";wire();let ok=false;
 try{const g=await api("get",{k:C.k,rev});if(g.s!==200){C.err=g.s===0?"net":"srv";return false}const cl=await decode(g.j.slots);
  if([1,2,3].some(n=>cl[n]===undefined)){C.err="old";return false}
  const L={};for(const n of [1,2,3])L[n]=rawSlot(n);const bk=await api("put",{k:C.k,base:0,keep:1,b:await bundle(L)});if(bk.s!==200){C.err=bk.s===0?"net":"srv";return false}
  for(const n of [1,2,3])writeSlot(n,cl[n]);mergeRooms(g.j.rooms||[]);
  const hd=await api("head",{k:C.k});if(hd.s!==200){C.err="net";return false}
  for(let i=0;i<3;i++){const h=i?await api("head",{k:C.k}):hd;const p=await api("put",{k:C.k,base:h.j.rev||0,b:await bundle(cl)});
   if(p.s===200){const hh={};for(const n of [1,2,3])hh[n]=hash(cl[n]);C.rev=p.j.rev;C.h=hh;C.rh=roomsKey(roomsOut());C.at=Date.now();C.err="";ok=true;break}if(p.s!==409)break}
  delete C.pend;saveC()}finally{STATE=""}
 refreshTitle();wire();return ok}
function refreshTitle(){try{if(!T.hidden&&window.CTM_ROOMS){const s=$("slots");if(s&&typeof window.CTM_DRAWSLOTS==="function")CTM_DRAWSLOTS()}}catch(e){}}

/* ---------- words ---------- */
function fmtAt(t){if(!t)return "";const d=new Date(t);const p=x=>String(x).padStart(2,"0");return `${p(d.getHours())}:${p(d.getMinutes())} ngày ${d.getDate()}/${d.getMonth()+1}`}
const ERR={net:"Chưa nối được mây; có đường mạng là tự gửi lại.",gone:"Không thấy sổ mây mang ám hiệu này (bỏ đã lâu hay gõ sai).",slow:"Gửi dày quá, đợi chốc lát rồi gửi lại.",
 big:"Sổ quá lớn, mây không nhận.",many:"Gõ sai nhiều lần quá; đợi một lúc lâu rồi gõ lại.",srv:"Mây chưa nhận; chốc nữa tự gửi lại.",old:"Bản này do bản trò chơi khác ghi, máy này chưa đọc được."};
function stateWord(){if(STATE==="busy")return ["Đang gửi, đang lấy…","n"];if(C.pend)return ["Hai bản sổ khác nhau, chờ ngươi chọn","r"];if(C.err)return [ERR[C.err]||ERR.srv,"r"];return C.rev?["Khớp với mây","g"]:["Chưa gửi lần nào","n"]}
const group=k=>String(k||"").replace(/(.{4})(?=.)/g,"$1-");
function slotLine(s){return s?[`${s.w||""} ${s.n||""}`.trim(),s.d||""].filter(Boolean).join(" · "):"Chưa ghi"}

/* ---------- Thiết lập section (.cloudwrap, borrowed by j74 like .optwrap / .xiowrap) ---------- */
/* ONE button set for the two places that show Sổ mây (Chọn sổ › Một mình, Thiết lập): same words, same data-cl flows, no second implementation */
function btnsHTML(){if(!C.k)return `<div class="kslot-a"><button class="kbtn" data-cl="make">Giữ sổ trên mây<small>lập ám hiệu sổ mới</small></button><button class="kbtn alt" data-cl="link">Nối sổ<small>máy kia đã có ám hiệu</small></button></div>`;
 return `<div class="kslot-a">${C.pend?`<button class="kbtn" data-cl="pick">Chọn bản sổ</button>`:`<button class="kbtn" data-cl="now"${STATE==="busy"?" disabled":""}>Đồng bộ ngay</button>`}<button class="kbtn alt" data-cl="code">Ám hiệu sổ</button><button class="kbtn alt" data-cl="vers">Các bản đã giữ</button></div>`}
const mask=k=>{k=String(k||"");return k.length>=8?"••••-••"+esc(k.slice(-2)):"••••-••••"};
function sectionHTML(){let h=`<div class="kslot"><h4 class="kpst">Sổ mây</h4>`;
 if(!C.k)return h+kitRows([["Tình trạng","Chưa giữ trên mây","n"],["Để làm gì","Một kiếp chơi tiếp được trên cả điện thoại lẫn máy tính bảng, một mình hay cùng hảo hữu","t"]])+btnsHTML()+`</div>`;
 const w=stateWord();
 return h+kitRows([["Tình trạng",esc(w[0]),w[1]]].concat(C.at?[["Gửi sau cùng",esc(fmtAt(C.at)),"n"]]:[]))+btnsHTML()+`</div>`}
/* Chọn sổ › Một mình, above the 3 sổ (j74 drawSlots): one compact card, the state + the same buttons */
function miniHTML(){const h=`<div class="kslot cloudmini"><h4 class="kpst">Sổ mây</h4>`;
 if(!C.k)return h+kitRows([["Tình trạng","Chưa giữ trên mây · chơi tiếp trên máy khác","n"]])+btnsHTML()+`</div>`;
 const w=stateWord();
 return h+kitRows([["Tình trạng",esc(w[0]),w[1]],["Ám hiệu",mask(C.k)+(C.sy||C.at?" · đồng bộ lúc "+esc(fmtAt(C.sy||C.at)):""),"n"]])+btnsHTML()+`</div>`}
function wire(){let w=document.querySelector("#modal .cloudwrap")||T.querySelector(".cloudwrap");
 if(!w){const box=T.querySelector(".tbox");if(!box)return;w=document.createElement("div");w.className="cloudwrap";box.appendChild(w)}
 w.innerHTML=sectionHTML();try{document.querySelectorAll("#slots .cloudmini").forEach(e=>{e.outerHTML=miniHTML()})}catch(e){}if(LM&&PG&&Q[0]===LM&&!T.hidden&&STATE!=="busy")redraw()}

/* ---------- sub-panels: kit scene panels on the title backdrop (as the co-op lobby) ---------- */
let LM=null,PG="",MSG="",PICK={},VERS=null,ASK=0;
function drop(){if(!LM)return;const i=Q.indexOf(LM);if(i>=0)Q.splice(i,1);LM=null;const M=$("modal");if(M&&Q.length)showModal();else if(M){M.hidden=true;M.classList.remove("kptitle","kpscene")}}
const HEAD={code:["Ám hiệu sổ mây","Gõ ám hiệu này ở máy kia: Chọn sổ › Một mình › Sổ mây › Nối sổ."],link:["Nối sổ","Gõ ám hiệu sổ mây của máy kia."],
 pick:["Hai bản sổ khác nhau","Sổ này đã được chơi trên cả hai máy. Chọn bản giữ lại."],vers:["Các bản đã giữ","Mười bản gần nhất trên mây."]};
function body(pg){
 if(pg==="code")return kitInput({id:"cl-key",label:"Ám hiệu sổ mây",value:group(C.k),readonly:true})+
  `<div class="kpnote">Ám hiệu này là chìa khóa sổ: ai có nó đều mở được sổ của ngươi. Chớ đưa cho người khác.</div>`+
  `<div class="kslot-a"><button class="kbtn" data-cl="copy">Chép ám hiệu</button><button class="kbtn alt" data-cl="share">Gửi sang máy kia</button></div>`+
  `<div class="kslot"><h4 class="kpst">Thôi nối trên máy này</h4>${kitRows([["Sổ trên máy","vẫn giữ nguyên","n"],["Sổ trên mây","vẫn còn, nối lại bằng ám hiệu","n"]])}<div class="kslot-a"><button class="kbtn alt" data-cl="unlink">${ASK?"Chắc chắn?<small>máy này thôi gửi sổ lên mây</small>":"Thôi nối"}</button></div></div>`+
  (MSG?`<div class="kpnote">${esc(MSG)}</div>`:"");
 if(pg==="link")return kitInput({id:"cl-in",label:"Ám hiệu sổ mây",value:"",placeholder:"tám chữ và số, như ABCD-EFGH"})+
  `<div class="kslot-a"><button class="kbtn" data-cl="go"${STATE==="busy"?" disabled":""}>Nối sổ</button></div>`+
  `<div class="kpnote">${esc(MSG||"Sổ trên máy này và sổ trên mây được gộp lại. Sổ nào cả hai nơi đều đã chơi tiếp thì ngươi chọn bản giữ lại; bản kia vẫn được giữ trên mây.")}</div>`;
 if(pg==="pick"){const P=C.pend;if(!P)return `<div class="kpnote">Hai bên đã khớp.</div>`;let h="";
  for(const n of P.slots){const me=sumOf(rawSlot(n)||"null"),cl=P.sum&&P.sum[n];
   const rows=(s,at,dev)=>s?kitRows([["Kiếp",esc(`${s.w||""} ${s.n||""}`.trim()),"t"]].concat(s.a!=null?[["Tuổi",`${s.a} tuổi`,"n"]]:[],[["Ngày",esc(s.d||""),"n"],["Ghi lúc",esc([fmtAt(at),dev].filter(Boolean).join(" · ")),"n"]])):kitRows([["Kiếp","Chưa ghi (kiếp đã hết)","n"],["Ghi lúc",esc([fmtAt(at),dev].filter(Boolean).join(" · ")),"n"]]);
   h+=`<div class="kslot"><h4 class="kpst">Sổ ${NO[n]} · bản trên máy này</h4>${rows(me,me&&me.at,"máy này")}<div class="kslot-a"><button class="kbtn${PICK[n]==="me"?" ksel":""}" data-cl="keep" data-n="${n}" data-v="me">Giữ bản trên máy này</button></div></div>`+
      `<div class="kslot"><h4 class="kpst">Sổ ${NO[n]} · bản trên mây</h4>${rows(cl,P.at,P.dev)}<div class="kslot-a"><button class="kbtn${PICK[n]==="cloud"?" ksel":""}" data-cl="keep" data-n="${n}" data-v="cloud">Giữ bản trên mây</button></div></div>`}
  return h+`<div class="kpnote">${esc(MSG||"Bản không chọn vẫn nằm trong «Các bản đã giữ» trên mây, lấy lại được.")}</div>`}
 if(pg==="vers"){if(!VERS)return `<div class="kpnote">${esc(MSG||"Đang lấy danh sách…")}</div>`;if(!VERS.versions.length)return `<div class="kpnote">Mây chưa có bản nào.</div>`;
  return VERS.versions.map((v,i)=>{const s=v.sum||{};const r=(s.r||[]).map(x=>x.room).join(", ");
   const rows=[["Máy",esc(v.dev||""),"n"]].concat([1,2,3].map(n=>[`Sổ ${NO[n]}`,esc(slotLine(s[n])),s[n]?"t":"n"]),r?[["Phòng hảo hữu",esc(r),"n"]]:[],
    v.rev===VERS.head?[["Ghi chú","Bản đang theo","g"]]:v.keep?[["Ghi chú","Bản giữ lại khi chọn bản khác","n"]]:[]);
   return `<div class="kslot"><h4 class="kpst">Ghi lúc ${esc(fmtAt(v.at))}</h4>${kitRows(rows)}${v.rev===VERS.head?"":`<div class="kslot-a"><button class="kbtn alt" data-cl="restore" data-rev="${v.rev}"${ASK===v.rev?' data-ask="2"':""}>${ASK===v.rev?"Chắc chắn?<small>sổ trên máy này thành bản này; bản đang có được giữ lại trên mây</small>":"Lấy lại bản này"}</button></div>`}</div>`}).join("")+(MSG?`<div class="kpnote">${esc(MSG)}</div>`:"")}
 return ""}
function open(pg){if(T.hidden)return;PG=pg;drop();
 for(let i=Q.length-1;i>=0;i--)if(Q[i]&&/kptitle/.test(Q[i].cls||""))Q.splice(i,1);
 LM=kitModal({scene:true,kind:"notice",title:HEAD[pg][0],sub:HEAD[pg][1],html:`<div class="kcl-body" data-krn-skip>${body(pg)}</div>`,cls:"kptitle kcloud"});
 const M=$("modal");const s=M&&M.querySelector(".dlg > .kph .kpseal");if(s)s.remove();
 const mr=$("mr");if(mr)mr.innerHTML=`<button class="kbtn alt" data-cl="back">‹ Lui</button>`;
 const c=$("cl-in");if(c){c.setAttribute("autocapitalize","characters");c.setAttribute("autocomplete","off");c.setAttribute("spellcheck","false");c.maxLength=40}}
function redraw(){const b=document.querySelector("#modal.kcloud .kcl-body");if(b&&LM&&Q[0]===LM)b.innerHTML=body(PG)}
function back(){PG="";MSG="";ASK=0;VERS=null;drop();try{showTitle()}catch(e){}}
function copy(txt,b,msg){const done=()=>{b.innerHTML=msg};const old=()=>{try{const t=$("cl-key");t.focus();t.select();t.setSelectionRange(0,t.value.length);if(document.execCommand("copy"))done();else b.innerHTML="Giữ ngón tay lên ô ám hiệu để chép"}catch(x){}};
 try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done,old);else old()}catch(x){old()}}
async function make(b){if(STATE==="busy")return;STATE="busy";if(b){b.disabled=true}
 const r=await api("new",{});STATE="";if(r.s!==200||!r.j.k){C.err=r.s===0?"net":r.s===429?"slow":"srv";wire();MSG=ERR[C.err];if(b)b.disabled=false;return}
 C={k:r.j.k,rev:0,h:{},dev:devLabel()};saveC();MSG="";open("code");await sync();redraw()}
async function link(v){const k=String(v||"").toUpperCase().replace(/[\s-]/g,"").replace(/O/g,"0").replace(/[IL]/g,"1");
 if(!/^[0-9A-HJKMNP-TV-Z]{8}$/.test(k)){MSG="Ám hiệu sổ mây có tám chữ và số. Xem lại rồi gõ lại.";redraw();return}
 STATE="busy";MSG="Đang nối…";redraw();const h=await api("head",{k});STATE="";
 if(h.s!==200){MSG=h.s===404?ERR.gone:h.s===429?ERR.many:ERR.net;redraw();return}
 C={k,rev:0,h:{},dev:devLabel()};saveC();MSG="";const r=await sync();
 if(r==="conflict"){PICK={};open("pick");return}
 MSG=r==="ok"||r==="same"?"Đã nối sổ. Sổ trên máy này đã khớp với mây.":ERR[C.err]||"";back()}
async function vers(){VERS=null;MSG="";open("vers");const r=await api("list",{k:C.k});if(r.s===200)VERS=r.j;else MSG=r.s===0?ERR.net:ERR.srv;redraw()}
$("modal").addEventListener("click",async e=>{const b=e.target.closest("button[data-cl]");if(!b||b.disabled)return;e.stopPropagation();
 try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 const a=b.dataset.cl;
 if(a==="back")return back();
 if(a==="make")return make(b);
 if(a==="link"){MSG="";return open("link")}
 if(a==="go"){const i=$("cl-in");return link(i?i.value:"")}
 if(a==="code"){MSG="";ASK=0;return open("code")}
 if(a==="copy")return copy(group(C.k),b,"Đã chép ám hiệu");
 if(a==="share"){if(navigator.share)navigator.share({title:"Cung Tường Mộng · Sổ mây",text:"Ám hiệu sổ mây: "+group(C.k)}).catch(()=>{});else copy(group(C.k),b,"Đã chép ám hiệu, dán sang máy kia");return}
 if(a==="unlink"){if(!ASK){ASK=1;redraw();return}ASK=0;C={};saveC();back();return}
 if(a==="now"){await sync();return}
 if(a==="pick"){PICK={};MSG="";return open("pick")}
 if(a==="keep"){PICK[+b.dataset.n]=b.dataset.v;const P=C.pend;if(P&&P.slots.every(n=>PICK[n])){MSG="Đang giữ bản đã chọn…";redraw();await resolve(PICK);PICK={};
   if(C.pend){MSG="";open("pick")}else{MSG="";back()}}else redraw();return}
 if(a==="vers")return vers();
 if(a==="restore"){const rev=+b.dataset.rev;if(ASK!==rev){ASK=rev;redraw();return}ASK=0;MSG="Đang lấy lại…";redraw();const ok=await restore(rev);
  if(ok){MSG="";back()}else{MSG=ERR[C.err]||ERR.srv;await vers();}return}},true);
$("modal").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target&&e.target.id==="cl-in"){e.preventDefault();link(e.target.value)}});

/* ---------- when ---------- */
let lastPull=0;
function pull(){const gap=window.CTM_CLOUD_GAP!=null?+window.CTM_CLOUD_GAP:15000;/* tests set CTM_CLOUD_GAP=0 */if(!C.k||Date.now()-lastPull<gap)return;lastPull=Date.now();sync()}
{const t0=showTitle;showTitle=function(){const r=t0.apply(this,arguments);try{if(!LM||Q[0]!==LM)setTimeout(pull,400)}catch(e){}return r};window.showTitle=showTitle}
/* end of every buổi: j6 save() runs after every render, so a changed buổi / tuần seen there = a buổi ended (any path:
   the Sang buổi button, co-op auto-advance, night). The upload waits 1.5 s so the render's save is in the sổ. */
let lastB="";
function buoiKey(){try{return S&&!S.dead?[S.year,S.month,S.tuan,S.buoi||0].join():""}catch(e){return ""}}
{const f=save;save=function(){const r=f.apply(this,arguments);try{const k=buoiKey();if(k&&lastB&&k!==lastB&&C.k&&playing())setTimeout(()=>sync(),1500);if(k)lastB=k}catch(e){}return r}}
document.addEventListener("visibilitychange",()=>{if(!C.k)return;if(document.visibilityState==="hidden"){try{if(playing())save()}catch(e){}sync({keep:1})}else if(!T.hidden)pull()});
addEventListener("pagehide",()=>{if(C.k)sync({keep:1})});
window.CTM_CLOUD={mini:miniHTML,wire,sync,get state(){return C},open:pg=>pg==="vers"?vers():open(pg),hash,_reload(){loadC();wire()}};
wire();
setTimeout(()=>{if(C.k&&!T.hidden)pull()},1500);
}catch(e){console.error(e)}})();
