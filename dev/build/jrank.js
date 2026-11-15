/* ================= jrank: BẢNG VINH DANH — leaderboard of every player (dev/LEADERBOARD.md, sếp 15/11 08:30Z) =================
   Identity: the first open makes a random guest id (localStorage "ctm-rank-id", also written into the save as S.rkGid); the server names
   the guest "Khách vô danh #NNNN" and remembers everyone who opened the game (POST /hello), signed in or not. The name can be changed
   (Đổi tên hiệu: no obscene words, no duplicates — checked by the server).
   A life: tracked while played (S.rk: highest rank / servant title, a short trail of promotions and births, the roll seed), summarised when
   the end card opens (over), queued in localStorage "ctm-rank-q" and sent to the Worker ctm-rank (POST /life). Offline: the queue is sent
   later (load, back online, every minute). The Worker re-checks the summary and re-computes Công danh with the SAME rule table
   (rank/worker/src/score.js, concatenated before this module) — the game never sends a score.
   Screen: rkOpen(tab,{lid}) = full-screen kit panel: seal VINH DANH header, segmented tabs Kiếp | Người chơi, the kit podium stage (j90 kpodCol:
   full-body figure of that life + the player's name), the ranked list, and the player's own row always visible at the bottom.
   Opened from the title screen (and ☰, which opens the title screen), and from the end card ("Kiếp này đứng hạng N").
   Screen name in ONE place: RK_T (another worker is reviewing the cổ ngữ names). */
const RK_T={screen:"Bảng vinh danh",lives:"Kiếp",players:"Người chơi",open:"Xem Bảng vinh danh",unit:"Công danh"};
const RK_VER="rank-1",RK_ID="ctm-rank-id",RK_Q="ctm-rank-q",RK_RES="ctm-rank-res",RK_C="ctm-rank-cache-";
function rkUrl(){return (window.RANK_URL||"https://ctm-rank.victoria-tntt.workers.dev").replace(/\/+$/,"")}
function rkRand(n){const a="abcdefghijklmnopqrstuvwxyz0123456789";let s="";try{const b=new Uint8Array(n);crypto.getRandomValues(b);b.forEach(x=>s+=a[x%36])}catch(e){for(let i=0;i<n;i++)s+=a[Math.floor(Math.random()*36)]}return s}
function rkEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
/* ---------- identity ---------- */
function rkIdGet(){let d=store.get(RK_ID);if(d&&/^[a-z0-9]{16,40}$/.test(d.gid||""))return d;
 /* localStorage lost: take the id back from a save that carries it (sổ), else a new guest */
 let gid="";try{for(const n of [1,2,3]){const s=typeof loadSlot==="function"&&loadSlot(n);if(s&&s.S&&/^[a-z0-9]{16,40}$/.test(s.S.rkGid||"")){gid=s.S.rkGid;break}}}catch(e){}
 d={gid:gid||rkRand(24),at:Date.now()};store.set(RK_ID,d);return d}
function rkIdSet(o){const d=Object.assign(rkIdGet(),o);store.set(RK_ID,d);return d}
function rkMyName(){const d=rkIdGet();return d.pn||"Khách vô danh"}
/* ---------- network ---------- */
async function rkReq(m,path,body){const c=typeof AbortController==="function"?new AbortController():null;const t=c?setTimeout(()=>c.abort(),9000):0;
 try{const r=await fetch(rkUrl()+path,{method:m,headers:body?{"Content-Type":"application/json"}:{},body:body?JSON.stringify(body):undefined,signal:c?c.signal:undefined,cache:"no-store",credentials:"omit"});
  let j=null;try{j=await r.json()}catch(e){}return{st:r.status,j:j||{}}}catch(e){return{st:0,j:{}}}finally{if(t)clearTimeout(t)}}
let RK_HELLO=0;
async function rkHello(force){const d=rkIdGet();if(!force&&d.pn&&Date.now()-(d.hat||0)<6*3600000)return d;if(RK_HELLO)return d;RK_HELLO=1;
 try{const r=await rkReq("POST","/hello",{gid:d.gid});if(r.st===200&&r.j.me)return rkIdSet({pid:r.j.me.pid,pn:r.j.me.pn,hat:Date.now()})}finally{RK_HELLO=0}return d}
/* ---------- the life being played ---------- */
function rkSrvNever(){return !!(S&&S.srv&&!S.srv.risen)}
function rkTrack(){if(!S||S.dead)return;const k=S.rk=S.rk||{t:[],mr:-1,sr:-1,k:(S.kids||[]).length,a0:S.age-((S.year||1)-1)};const y=(S.year||1)-1,m=S.month||1;
 try{S.rkGid=rkIdGet().gid}catch(e){}
 if(!rkSrvNever()){const r=S.rank|0;if(r>k.mr){if(k.t.length<70)k.t.push([y,m,"r",r]);k.mr=r}}
 if(S.srv){const r=S.srv.rk|0;if(r>k.sr){if(k.t.length<70)k.t.push([y,m,"s",r]);k.sr=r}if(S.srv.mama)k.mama=1}
 const nk=(S.kids||[]).length;while(nk>k.k){const c=S.kids[k.k];if(k.t.length<78)k.t.push([y,m,"k",c&&c.sex==="m"?1:0]);k.k++}}
function rkSummary(endk,fate){const k=S.rk||{};const kids=S.kids||[];const y=Math.max(0,(S.year||1)-1);
 const mr=rkSrvNever()?-1:Math.max(S.rank|0,S.maxRank|0,k.mr==null?-1:k.mr);const sr=S.srv?Math.max(S.srv.rk|0,k.sr==null?-1:k.sr):-1;
 let fig="",por="";try{fig=typeof figFor==="function"?figFor(S)||"":""}catch(e){}try{por=typeof figFor==="function"?figFor(S,"por")||"":""}catch(e){}
 if(!por)try{por=fsrc(S.fc,"")}catch(e){}
 const cut=s=>{s=String(s||"");const i=s.indexOf("img/");return i>0?s.slice(i):s};
 let alive=false;try{alive=typeof overAlive==="function"?!!overAlive(fate):false}catch(e){}
 return{n:S.name,o:S.origin&&S.origin.k||"",on:S.origin&&S.origin.n||"",mr,sr,mama:!!(k.mama||(S.srv&&S.srv.mama)),out:!!S.out,endk,fate:String(fate||"").slice(0,140),
  alive,rare:!!(S.rareEnd||S.rare||/Cơ duyên hiếm/.test(String(fate||""))),y,age:S.age|0,age0:Math.max(12,Math.min(40,(S.age|0)-y)),
  sons:kids.filter(x=>x&&x.sex==="m").length,daus:kids.filter(x=>x&&x.sex!=="m").length,tz:Math.min(kids.filter(x=>x&&x.sex==="m").length,(S.pdw&&S.pdw.tz||[]).length),
  danh:Math.round(S.danh||0),duc:Math.round(S.duc||0),tg:(S.pdN&&S.pdN.tg)|0,fig:cut(fig),por:cut(por),
  mode:typeof CW!=="undefined"&&CW&&CW.on?"coop":"solo",seed:(S.rkSeed>>>0)||0,ver:RK_VER,t0:S.rkT0||0,trail:(k.t||[]).slice(0,80)}}
/* ---------- queue (offline: kept until sent) ---------- */
function rkQ(){const q=store.get(RK_Q);return Array.isArray(q)?q:[]}
function rkRes(lid){const r=store.get(RK_RES)||{};return lid?r[lid]:r}
function rkResSet(lid,v){const r=store.get(RK_RES)||{};r[lid]=v;const ks=Object.keys(r);if(ks.length>30)ks.sort((a,b)=>(r[a].at||0)-(r[b].at||0)).slice(0,ks.length-30).forEach(k=>delete r[k]);store.set(RK_RES,r)}
let RK_FL=0,RK_RT=0;
async function rkFlush(){if(RK_FL)return;const q0=rkQ();if(!q0.length)return;RK_FL=1;let wait=0;
 try{await rkHello();const d=rkIdGet();
  for(const it of q0){const r=await rkReq("POST","/life",{gid:d.gid,lid:it.lid,life:it.life});
   if(r.st===200&&r.j.ok){rkResSet(it.lid,{score:r.j.score,rank:r.j.rank,of:r.j.of,at:Date.now()});if(r.j.me)rkIdSet({pid:r.j.me.pid,pn:r.j.me.pn})}
   else if(r.st===429){wait=Math.max(16000,Math.min(3600000,r.j.retry||16000));break}
   else if(r.st===0||r.st>=500){wait=60000;break}
   else rkResSet(it.lid,{refused:r.j.why||String(r.st),at:Date.now()});
   store.set(RK_Q,rkQ().filter(x=>x.lid!==it.lid));rkEndPaint(it.lid)}}
 finally{RK_FL=0}
 if(wait&&rkQ().length){clearTimeout(RK_RT);RK_RT=setTimeout(rkFlush,wait)}
 if(document.getElementById("krkov"))rkLoad(RK.tab,true)}
function rkPush(sum){const lid=rkRand(16);const q=rkQ();q.push({lid,life:sum,at:Date.now()});store.set(RK_Q,q.slice(-50));return lid}
/* ---------- end card: "Kiếp này đứng hạng N" ---------- */
function rkEndInner(lid){const it=rkQ().find(x=>x.lid===lid),res=rkRes(lid);let sc=null;try{const L=it?it.life:(RK.ends[lid]||null);if(L)sc=CTM_RANK.score(L).score}catch(e){}
 const s=res&&res.score!=null?res.score:sc;const head=s!=null?`<span class="krk-el">${RK_T.unit} kiếp này: <b>${s}</b></span>`:"";
 const line=res&&res.rank?`<span class="krk-el">Kiếp này đứng hạng <b>${res.rank}</b> trên ${res.of} kiếp.</span>`
  :res&&res.refused?`<span class="krk-el">${RK_T.screen} không nhận kiếp này.</span>`
  :navigator.onLine===false?`<span class="krk-el">Mạng đứt: kiếp này đã ghi lại, có mạng sẽ gửi lên ${RK_T.screen}.</span>`
  :`<span class="krk-el">Đang ghi lên ${RK_T.screen}.</span>`;
 return `${head}${line}<button class="kbtn alt krk-eb" data-krk-open="lives" data-lid="${lid}">${RK_T.open}</button>`}
function rkEndPaint(lid){document.querySelectorAll(`.krk-end[data-lid="${lid}"]`).forEach(e=>e.innerHTML=rkEndInner(lid));
 try{const m=Q.find(x=>x&&x.cls==="end"&&x.rkLid===lid);if(m)m.h=m.h.replace(/<div class="krk-end"[\s\S]*?<\/button><\/div>/,`<div class="krk-end" data-lid="${lid}">${rkEndInner(lid)}</div>`)}catch(e){}}
/* ---------- hooks into the game ---------- */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{rkTrack()}catch(e){}return r}})();
if(typeof nlAccept==="function")(function(){const a0=nlAccept;nlAccept=function(){const sd=typeof NLP!=="undefined"&&NLP?NLP.seed:0;const r=a0.apply(this,arguments);
 try{if(S&&sd){S.rkSeed=sd>>>0;S.rkT0=Date.now();S.rk=null;rkTrack()}}catch(e){}return r}})();
(function(){const o0=over;over=function(h,t,fate){const was=!S||S.dead;const r=o0.apply(this,arguments);if(was)return r;
 try{if(!S||!S.dead||(typeof NLP!=="undefined"&&NLP))return r;rkTrack();const m=Q.find(x=>x&&x.cls==="end"&&!x.rkLid)||null;
  const endk=(((m&&m.h||"").match(/<h3>([\s\S]*?)<\/h3>/)||[])[1]||h||"").replace(/<[^>]+>/g,"").trim();
  const sum=rkSummary(endk,S.fate||fate);const lid=rkPush(sum);RK.ends[lid]=sum;
  if(m){m.rkLid=lid;m.h+=`<div class="krk-end" data-lid="${lid}">${rkEndInner(lid)}</div>`;if(!$("modal").hidden&&Q[0]===m)showModal()}
  setTimeout(rkFlush,300)}catch(e){console.error(e)}return r}})();
/* other players' characters are not people of this life: the stranger mask of j61 ("<tước> ???") never touches the board or its end-card line */
if(typeof k61Node==="function")(function(){const n0=k61Node;k61Node=function(n){try{const el=n&&(n.nodeType===1?n:n.parentNode);if(el&&el.closest&&el.closest("#krkov,.krk-end"))return}catch(e){}return n0.apply(this,arguments)}})();
/* a page that opened straight into a save: baseline (no back pay of the trail) */
function rkBase(){try{if(S&&!S.dead){if(!S.rk)rkTrack();if(!S.rkT0)S.rkT0=Date.now();S.rkGid=rkIdGet().gid}}catch(e){}}
rkBase();if(typeof deser==="function")(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);rkBase();return r}})();
/* ---------- the screen ---------- */
const RK={tab:"lives",data:{},busy:0,err:0,view:"list",lid:"",ends:{},msg:""};
function rkFace(row){return{src:row.por||"",ini:String(row.n||row.pn||"?").trim().charAt(0)||"?",col:"#b08a5a"}}
function rkFig(row){return row.fig||KIT_DIR+"unknown-fig-f.webp"}
function rkMine(row){const d=rkIdGet();return !!(d.pid&&row&&row.pid===d.pid)}
function rkEnd(row){return row.e||""}
function rkPodList(rows,tab){return rows.slice(0,3).map(x=>{const L=tab==="players"?(x.best||{}):x;const mine=rkMine(x);
 return{who:{name:x.pn},place:x.r,fig:L.fig?L.fig:rkFig({}),face:rkFace(L),mine,you:"Ngươi",
  nameH:`<b class="kname" style="--rc:#8a5a12">${rkEsc(x.pn)}</b>`,
  sub:L.n?`${rkEsc(L.p)} ${rkEsc(L.n)}`:"Chưa có kiếp nào",score:`${RK_T.unit} ${x.s}`,prize:L.e?`<span class="kpod-fx2">${rkEsc(L.e)}</span>`:null}})}
function rkRowH(x,tab,o){o=o||{};const L=tab==="players"?(x.best||{}):x;const mine=rkMine(x)||o.mine;
 const who=`<span class="krk-who"><b class="krk-pn">${rkEsc(x.pn)}${mine?` <i class="krk-you">Ngươi</i>`:""}</b><small>${L.n?`${rkEsc(L.n)} · ${rkEsc(L.o)}`:"Chưa có kiếp nào được ghi"}</small></span>`;
 const c1=tab==="players"?[L.n?`${rkEsc(L.p)}`:"",`${x.k} kiếp`]:[rkEsc(L.p),rkEsc(rkEnd(L))];
 const pe=tab==="players"?`${L.n?rkEsc(L.p)+" · ":""}${x.k} kiếp · tổng ${x.t}`:`${rkEsc(L.p)} · ${rkEsc(rkEnd(L))}`;
 return `<div class="krk-row${mine?" krk-mine":""}${o.cls?" "+o.cls:""}"><b class="krk-rk">${x.r||""}</b><span class="krk-fc">${mdH(rkFace(L),"sm")}</span>${who}`+
  `<span class="krk-c krk-c1">${c1[0]||"—"}</span><span class="krk-c krk-c2">${c1[1]||"—"}</span><span class="krk-pe">${pe}</span>`+
  `<span class="krk-s"><b>${x.s}</b><small>${RK_T.unit.toLowerCase()}</small></span></div>`}
function rkHeadH(tab){const l=tab==="players"?["Kiếp tốt nhất","Số kiếp"]:["Phẩm cao nhất","Kết cục"];
 return `<div class="krk-row krk-hd" aria-hidden="true"><b class="krk-rk">Hạng</b><span class="krk-fc"></span><span class="krk-who">${tab==="players"?"Tên hiệu":"Tên hiệu · thân phận"}</span><span class="krk-c krk-c1">${l[0]}</span><span class="krk-c krk-c2">${l[1]}</span><span class="krk-pe"></span><span class="krk-s">${RK_T.unit}</span></div>`}
function rkRulesH(){const R=CTM_RANK.RULES;const join=(N,V)=>N.map((n,i)=>`${n} ${V[i]}`).join(", ");
 const E=Object.entries(R.end).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k} ${v}`).join(", ");
 return `<div class="krk-rules"><h4 class="kpst">Cách tính ${RK_T.unit}</h4>${kitRows([
  ["Phẩm cao nhất",join(R.consortN,R.consort),"t"],["Cung nữ",join(R.servantN,R.servant)+`, Ma ma ${R.servant[3]}`,"t"],
  ["Kết cục",E+`; kết cục khác (chết, lãnh cung, bị đuổi) không thêm`,"t"],["Cơ duyên hiếm",`thêm ${R.rare}`,"t"],
  ["Năm trong cung",`${R.year} mỗi năm tròn, nhiều nhất ${R.yearCap} năm`,"t"],["Con cái",`hoàng tử ${R.son}, công chúa ${R.dau}, nhiều nhất ${R.kidCap} người con`,"t"],
  ["Thái tử",`${R.tz} mỗi con trai được lập Thái tử, nhiều nhất ${R.tzCap}`,"t"],["Danh, Đức",`lúc cuối kiếp, mỗi bậc được ${R.danh}, tính đến 100`,"t"],
  ["Tranh ghế",`${R.tg} mỗi lần thắng, nhiều nhất ${R.tgCap} lần`,"t"],["Kiếp dở dang","chưa tròn một năm mà chưa lên Quý nhân (cung nữ: Chưởng sự cô cô): chỉ tính một nửa","t"],
  ["Người chơi","xếp theo kiếp tốt nhất, bằng nhau thì theo tổng công danh mọi kiếp","t"]])}
  <p class="past">Công danh do ${RK_T.screen} tự tính lại từ sổ kiếp gửi lên; số tự khai không được nhận.</p></div>`}
function rkNameH(){return `<div class="krk-name"><h4 class="kpst">Đổi tên hiệu</h4>${kitInput({id:"krk-in",label:"Tên hiệu",value:rkIdGet().pn&&!/^Khách vô danh/.test(rkIdGet().pn)?rkIdGet().pn:"",placeholder:"Tên hiệu mới"})}
 <p class="past">Từ hai đến hai mươi bốn chữ; không trùng tên người khác, không dùng lời tục.</p>${RK.msg?`<p class="krk-msg">${rkEsc(RK.msg)}</p>`:""}
 <div class="krk-nb"><button class="kbtn" data-krk="save">Ghi tên</button><button class="kbtn alt" data-krk="list">Lui</button></div></div>`}
function rkBodyH(){const tab=RK.tab,d=RK.data[tab];
 if(RK.view==="name")return rkNameH();if(RK.view==="rules")return rkRulesH()+`<div class="krk-nb"><button class="kbtn alt" data-krk="list">Lui</button></div>`;
 if(!d)return `<p class="krk-note">${RK.err?`Mạng đứt, chưa mở được ${RK_T.screen}.`:"Đang mở bảng."}</p>`;
 const rows=d.rows||[];const note=RK.err?`<p class="krk-note">Mạng đứt: đây là bảng lần trước.</p>`:"";
 if(!rows.length)return note+`<p class="krk-note">Chưa có ${tab==="players"?"người chơi":"kiếp"} nào trên bảng.</p>`;
 const pod=rows.length>=2?`<div class="kpod-stage krk-stage">${(()=>{const L=rkPodList(rows,tab);const t=[L[1],L[0],L[2]].filter(Boolean);return t.map(kpodCol).join("")})()}</div>`:"";
 return note+pod+`<div class="krk-list">${rkHeadH(tab)}${rows.map(x=>rkRowH(x,tab)).join("")}</div>`}
function rkMeH(){const tab=RK.tab,d=RK.data[tab]||{};const q=rkQ().length;const qn=q?`<small class="krk-q">${q} kiếp chờ gửi, có mạng sẽ gửi.</small>`:"";
 let row=null;if(tab==="players")row=d.mine||null;else{const L=RK.lid&&d.last&&d.last.lid===RK.lid?d.last:d.mine;row=L||null}
 const me={r:"",pn:rkMyName(),s:0,k:0,t:0,best:null,n:"",p:"",e:""};
 const h=row?rkRowH(row,tab,{mine:true,cls:"krk-merow"}):rkRowH(me,tab,{mine:true,cls:"krk-merow"});
 const lab=tab==="players"?"Ngươi trên bảng":(RK.lid&&d.last&&d.last.lid===RK.lid?"Kiếp vừa rồi":"Kiếp tốt nhất của ngươi");
 return `<div class="krk-me"><small class="krk-ml">${lab}${row&&row.r?` · hạng ${row.r} trên ${tab==="players"?d.of:d.of} ${tab==="players"?"người":"kiếp"}`:""}</small>${h}${qn}</div>`}
function rkSub(){const d=RK.data[RK.tab];if(!d)return "Công danh của mọi người chơi";return RK.tab==="players"?`${d.of} người chơi đã vào cung`:`${d.of} kiếp đã ghi`}
function rkPaint(){const ov=document.getElementById("krkov");if(!ov)return;const root=ov.firstElementChild;
 root.querySelector(".kpod-hd").innerHTML=kpHeader("honor",RK_T.screen,rkSub());
 root.querySelectorAll(".krk-tabs .ksubb").forEach(b=>{const on=b.dataset.krt===RK.tab;b.classList.toggle("on",on);b.setAttribute("aria-selected",on?"true":"false")});
 const body=root.querySelector(".krk-body");body.innerHTML=rkBodyH();root.querySelector(".krk-meb").innerHTML=RK.view==="list"?rkMeH():"";
 const nb=root.querySelector('[data-krk="name"]');if(nb)nb.hidden=RK.view!=="list";const rb=root.querySelector('[data-krk="rules"]');if(rb)rb.hidden=RK.view!=="list";
 const fit=()=>{try{kpodFit(root)}catch(e){}};fit();root.querySelectorAll(".krk-stage img").forEach(im=>{if(!im.complete)im.addEventListener("load",fit,{once:true})});setTimeout(fit,300);
 const inp=root.querySelector("#krk-in");if(inp){inp.maxLength=24;setTimeout(()=>{try{inp.focus({preventScroll:true})}catch(e){}},50)}}
async function rkLoad(tab,quiet){const d=rkIdGet();const c=store.get(RK_C+tab);if(c&&!RK.data[tab])RK.data[tab]=c;if(!quiet)rkPaint();
 const r=await rkReq("GET",`/top/${tab}?n=50&gid=${encodeURIComponent(d.gid)}`);
 if(r.st===200&&r.j.ok){RK.err=0;RK.data[tab]=r.j;store.set(RK_C+tab,r.j);if(r.j.me)rkIdSet({pid:r.j.me.pid,pn:r.j.me.pn})}else RK.err=1;
 if(RK.tab===tab)rkPaint()}
function rkOpen(tab,o){o=o||{};RK.tab=tab==="players"?"players":"lives";RK.view="list";RK.lid=o.lid||"";RK.msg="";rkClose();
 const ov=document.createElement("div");ov.id="krkov";
 ov.innerHTML=`<div class="kpod krk" role="dialog" aria-label="${RK_T.screen}"><div class="kpod-hd"></div>
  <div class="ksub krk-tabs" role="tablist"><button class="ksubb" role="tab" data-krt="lives">${RK_T.lives}</button><button class="ksubb" role="tab" data-krt="players">${RK_T.players}</button></div>
  <div class="krk-body"></div><div class="krk-ft"><div class="krk-meb"></div><div class="krk-btns"><button class="kbtn alt" data-krk="name">Đổi tên hiệu</button><button class="kbtn alt" data-krk="rules">Cách tính</button><button class="kbtn" data-krk="close">Lui</button></div></div></div>`;
 document.body.appendChild(ov);const root=ov.firstElementChild;
 ov.__key=e=>{if(e.key==="Escape"){e.preventDefault();if(RK.view!=="list"){RK.view="list";rkPaint()}else rkClose()}else if(e.key==="Enter"&&e.target&&e.target.id==="krk-in"){e.preventDefault();rkSaveName()}};addEventListener("keydown",ov.__key);
 const onR=()=>{try{kpodFit(root)}catch(e){}};addEventListener("resize",onR);ov.__off=()=>removeEventListener("resize",onR);
 root.addEventListener("click",e=>{const t=e.target.closest("[data-krt],[data-krk]");if(!t)return;try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
  if(t.dataset.krt){if(RK.tab!==t.dataset.krt){RK.tab=t.dataset.krt;RK.view="list";rkPaint();rkLoad(RK.tab,true)}return}
  const k=t.dataset.krk;if(k==="close")rkClose();else if(k==="name"){RK.view="name";RK.msg="";rkPaint()}else if(k==="rules"){RK.view="rules";rkPaint()}
  else if(k==="list"){RK.view="list";RK.msg="";rkPaint()}else if(k==="save")rkSaveName()});
 rkPaint();rkFlush();rkHello().then(()=>rkLoad(RK.tab,true));try{root.querySelector('[data-krk="close"]').focus({preventScroll:true})}catch(e){}return ov}
function rkClose(){const ov=document.getElementById("krkov");if(!ov)return;try{ov.__off&&ov.__off();removeEventListener("keydown",ov.__key)}catch(e){}ov.remove()}
async function rkSaveName(){const inp=document.getElementById("krk-in");if(!inp)return;const v=inp.value.replace(/\s+/g," ").trim();
 if(!v){RK.msg="Xin viết tên hiệu.";rkPaint();return}RK.msg="Đang ghi tên.";rkPaint();const i2=document.getElementById("krk-in");if(i2)i2.value=v;
 await rkHello();const r=await rkReq("POST","/name",{gid:rkIdGet().gid,name:v});
 if(r.st===200&&r.j.ok){rkIdSet({pid:r.j.me.pid,pn:r.j.me.pn});RK.view="list";RK.msg="";RK.data={};rkPaint();rkLoad(RK.tab,true);return}
 RK.msg=r.st===0?"Mạng đứt, chưa đổi được tên.":(r.j.why||"Chưa đổi được tên.");rkPaint();const i3=document.getElementById("krk-in");if(i3)i3.value=v}
window.rkOpen=rkOpen;window.rkClose=rkClose;window.rkFlush=rkFlush;
document.addEventListener("click",e=>{const b=e.target.closest("[data-krk-open]");if(!b)return;e.preventDefault();e.stopPropagation();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}rkOpen(b.dataset.krkOpen,{lid:b.dataset.lid||""})},true);
/* title screen (☰ opens it too): one more kit button beside Sổ luân hồi */
function rkMenu(){const m=document.querySelector("#modal.kptitle .kpmenu");if(!m||m.querySelector("[data-krk-open]"))return;m.classList.add("krk-m");
 const b=document.createElement("button");b.className="kbtn alt";b.dataset.krkOpen="lives";b.textContent=RK_T.screen;const past=m.querySelector('[data-tgo="past"]');
 if(past)past.after(b);else m.appendChild(b);
 /* half-width buttons in pairs; an odd one out takes the whole row */
 const half=[...m.children].filter(x=>x.offsetWidth&&x.offsetWidth<m.clientWidth*.75);if(half.length%2)half[half.length-1].style.gridColumn="1/-1"}
setTimeout(()=>{try{const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{rkMenu()}catch(e){}return r};window.showModal=showModal;rkMenu()}catch(e){console.error(e)}},0);
/* send what waits: on load, back online, back in front, every minute while something waits */
addEventListener("online",()=>{rkFlush();rkHello()});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&rkQ().length)rkFlush()});
setInterval(()=>{if(rkQ().length&&navigator.onLine!==false)rkFlush()},60000);
setTimeout(()=>{rkHello().then(()=>rkFlush())},1500);
/* ---------- kit CSS (tokens of j79; frame and stage of j90) ---------- */
(function(){const st=document.createElement("style");st.id="kitrank";st.textContent=`
#krkov{position:fixed;inset:0;z-index:8990;display:flex;align-items:stretch;justify-content:center;background:#2a1a12b8}
.kpod.krk{grid-template-rows:auto auto minmax(0,1fr) auto;cursor:auto;user-select:text;-webkit-user-select:text}
.krk-tabs{margin:8px clamp(8px,2.5vw,32px) 0;position:relative;top:auto}
.krk-tabs .ksubb.on{background:linear-gradient(#c9952a,#a8781c);color:#fff8e6}
.krk-body{overflow-y:auto;overflow-x:hidden;min-height:0;-webkit-overflow-scrolling:touch;padding:0 0 8px}
.krk .krk-stage{height:clamp(250px,44vh,440px);flex:none;cursor:default}
.krk .krk-stage .kpod-plq .kname{display:block}
.krk-list,.krk-rules,.krk-name,.krk-note{margin:10px clamp(8px,2.5vw,32px) 0;background:#fffaf0f2;border:1px solid var(--line,#c9a46a);border-radius:var(--k-rad,8px);box-shadow:inset 0 0 0 1px #ffffff80}
.krk-note{padding:10px 12px;font-size:.88rem;color:var(--ink)}
.krk-rules,.krk-name{padding:10px 12px}.krk-rules .kpst,.krk-name .kpst{margin:0 0 6px}
.krk-name .krk-msg{margin:6px 0 0;font-size:.84rem;font-weight:700;color:var(--bad,#a8301f)}
.krk-nb{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;margin:10px clamp(8px,2.5vw,32px) 0}.krk-name .krk-nb{margin:10px 0 0}
.krk-row{display:grid;grid-template-columns:2.4em 40px minmax(0,2.3fr) minmax(0,1.2fr) minmax(0,1.3fr) minmax(4.6em,auto);grid-template-areas:"rk fc who c1 c2 s";
 align-items:center;gap:4px 10px;padding:6px 10px;border-bottom:1px solid var(--k-hair,#e6d3ac);font-size:.86rem;line-height:1.3}
.krk-row:last-child{border-bottom:0}
.krk-row>.krk-rk{grid-area:rk;text-align:center;font-family:var(--display);font-size:1rem;color:var(--gold,#8a5a12)}
.krk-row>.krk-fc{grid-area:fc}.krk-row>.krk-fc .md{display:block}
.krk-row>.krk-who{grid-area:who;min-width:0;overflow-wrap:anywhere}.krk-who b{display:block;font-weight:700;color:var(--ink)}.krk-who small{display:block;font-size:.76rem;color:var(--dim)}
.krk-row>.krk-c1{grid-area:c1}.krk-row>.krk-c2{grid-area:c2}
.krk-c{min-width:0;overflow-wrap:anywhere}
.krk-row>.krk-pe{display:none}
.krk-row>.krk-s{grid-area:s;text-align:right;white-space:nowrap}.krk-s b{display:block;font-family:var(--display);font-size:1.02rem;color:var(--k-seal,#9a2c1c)}.krk-s small{display:block;font-size:.68rem;color:var(--dim)}
.krk-hd{font-size:.72rem;font-weight:700;color:var(--k-lab,#8a7350);text-transform:none;padding-top:8px;padding-bottom:4px;background:var(--k-card2,#f6ead6);border-radius:var(--k-rad,8px) var(--k-rad,8px) 0 0}
.krk-hd>.krk-rk{font-family:inherit;font-size:inherit;color:inherit}.krk-hd>.krk-s{white-space:normal}
.krk-list>.krk-row:nth-child(2)>.krk-rk,.krk-list>.krk-row:nth-child(3)>.krk-rk,.krk-list>.krk-row:nth-child(4)>.krk-rk{font-size:1.15rem;color:#a8781c}
.krk-mine{background:#fff3c4;box-shadow:inset 3px 0 0 #a8740c}
.krk-you{font-style:normal;font-family:var(--display);font-size:.7rem;color:#5a3a10;background:#fff3c4;border:1px solid #a8740c;border-radius:10px;padding:0 7px;white-space:nowrap;vertical-align:1px}
.krk-ft{display:flex;flex-direction:column;gap:6px;padding:8px clamp(8px,2.5vw,32px) 12px;background:linear-gradient(#f5ecdc00,#f5ecdcf2 30%)}
.krk-me{background:#fffaf0f5;border:1px solid #a8740c;border-radius:var(--k-rad,8px);overflow:hidden}
.krk-me .krk-ml{display:block;padding:4px 10px 0;font-size:.74rem;font-weight:700;color:var(--k-lab,#8a7350)}
.krk-me .krk-row{border-bottom:0}.krk-me .krk-q{display:block;padding:0 10px 6px;font-size:.74rem;color:var(--dim)}
.krk-btns{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}.krk-btns .kbtn{min-height:42px;padding:6px 14px}
.krk-end{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:10px 0 0;padding:8px 10px;border:1px solid #a8740c;border-radius:var(--k-rad,8px);background:#fff3c4;font-size:.9rem}
.krk-end .krk-el{flex:1 1 220px}.krk-end .kbtn{min-height:40px;padding:6px 14px;font-size:.84rem}
.kpmenu.krk-m{grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:639px){
 .krk-row{grid-template-columns:2em 36px minmax(0,1fr) auto;grid-template-areas:"rk fc who s" "rk fc pe s";gap:2px 8px;padding:6px 8px;font-size:.84rem}
 .krk-row>.krk-c{display:none}.krk-row>.krk-pe{display:block;grid-area:pe;font-size:.76rem;color:var(--ink);min-width:0;overflow-wrap:anywhere}
 .krk-hd{display:none}.krk-btns .kbtn{flex:1 1 0;padding:6px 8px}
}
@media (orientation:landscape) and (max-height:820px){.krk .krk-stage{height:clamp(230px,48vh,400px)}.krk-ft{padding-bottom:8px}}
`;document.head.appendChild(st)})();
