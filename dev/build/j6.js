
/* rendering */
const RIMG=["rank-dap-ung","rank-thuong-tai","rank-quy-nhan","rank-tan","rank-phi","rank-quy-phi","rank-hoang-quy-phi","rank-hoang-hau"];
const SCIMG={vuon:"ngu-hoa-vien",thu:"ngu-thu-phong",dtd:"duong-tam-dien",tn:"tu-ninh-cung",kn:"khon-ninh-cung",rv:"phi-tan-cung",tyv:"thai-y-vien",ksp:"kinh-su-phong",lc:"lanh-cung"};
const AIMG={cam:"cam",ky:"ky",thi:"thi",hoa:"hoa",vu:"vu",y:"y-thuat"};
function ic(n,s){if(!n)return "";s=s||16;return `<img class="ic" src="img/${n}.webp" width="${s}" height="${s}" alt="" onerror="this.remove()">`}
function chip(t,cls){return `<span class="chip ${cls||""}">${t}</span>`}
/* warns when an act would drop Đức under the Hoàng hậu bar (40) */
function ducWarn(c){const t=ducWarnTxt(c);return t?`<span class="fx r"><b>${t}</b></span>`:""}
function render(){if(!S)return;renderHUD();renderStage();renderPanel();$("next").disabled=S.dead||Q.length>0||!!S.mg;$("next").textContent=(S.buoi||0)>=B4L?"Sang ngày mới":"Sang buổi";if(!S.dead&&!Q.length&&!S.mg&&used>=BAL.time.khac&&!advLock){advLock=true;setTimeout(()=>{advLock=false;if(used>=BAL.time.khac&&!Q.length&&!S.dead)nextBuoi()},350)}
 document.querySelectorAll("#tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===tab));
 if(Q.length&&$("modal").hidden)showModal();save()}
/* the text a HUD cell shows for a value (one hook for every writer of the cell: renderHUD, hudTween j11, k3Hud jk3); jkh makes Sức read "N/M" */
function hudFmt(k,v){return v}
function renderHUD(){if(typeof renderHud2==="function")renderHud2();$("me-n").textContent=S.name;$("me-r").innerHTML=ic(RIMG[S.rank],14)+rkName(S);$("me-d").textContent=`T${S.month}/${S.year} · ${TUAN[S.tuan]} · ${BUOI[S.buoi||0]} · ${S.wx?S.wx.n:""} ${"●".repeat(Math.max(0,BAL.time.khac-used))}${"○".repeat(Math.min(BAL.time.khac,used))}`;
 $("me-p").innerHTML=mdH(pMe(),"sm");
 for(const k of ["bac","suc","sung","danh"]){const e=$("hud-"+k);e.querySelector("span").textContent=hudFmt(k,S[k]);const u=e.querySelector("u");if(u)u.style.width=S[k]+"%"}
 $("emp-p").innerHTML=mdH(pEmp(),"sm");$("emp-n").textContent=S.emp.era;const m=MOODS[S.emp.mood];$("emp-m").innerHTML=`<span class="${m[1]}">${m[0]}</span>`}
function renderStage(){const P=placeOf(S.place);try{if(S.visit&&typeof stageCapFix==="function")stageCapFix(S.visit)}catch(e){}$("stage").className="stage sc-"+P.sc;$("scimg").style.backgroundImage=SCIMG[P.sc]?`url(img/${SCIMG[P.sc]}.webp)`:"none";const ppl=curPeople();
 {const raw=S.visit&&S.visit.msg?S.visit.msg:P.d;const btns=(raw.match(/<button[\s\S]*?<\/button>/g)||[]).join("");const txt=raw.replace(/<button[\s\S]*?<\/button>/g,"").replace(/<[^>]+>/g,"");$("sc-t").innerHTML=`<h2><span class="rt1">${P.n}</span><span class="rmsg" title="${txt.replace(/"/g,"")}"> · ${txt}</span></h2>${btns}`}
 $("tokens").innerHTML=ppl.length?ppl.map((p,i)=>{const f=pFaceOf(p);
   if(p.kind==="hh")f.ini="Phượng";return `<button class="tok" data-p="${i}">${mdH(f)}<span class="tag">${p.name}</span></button>`}).join(""):`<p class="empty">Không có ai ở đây.</p>`;
 let pw="";if(popIdx!=null&&ppl[popIdx])pw=`<div class="pop pcpop">${popCard(ppl[popIdx],popIdx)}</div>`;
 $("popw").innerHTML=pw;kitFix($("popw"))}
function rvButtons(v,i){const dis=!can(2)||!v.alive||v.out||S.dead;const b=(k,extra)=>{const a=ACT[k];if(!a||(a.kid&&!a.ok(S,v)))return"";const ok=a.ok(S,v),o=a.o?actOdds(S,v,k):null;
  return `<button data-r="${i}" data-a="${k}" ${dis||!ok?"disabled":""}>${k==="poison"||k==="kpoison"?ic("doc",14):""}${a.n}<small>${[o!=null&&ok?word(oddsCl(o))+lotTag(ACTDOM[k]):"",a.xw&&ok?a.xw(S,v):"",fmt(a.c),!ok&&a.x?a.x:ok&&a.x?a.x:""].filter(Boolean).join(" · ")||"không tốn"}</small></button>`};
 if(sameHouse(S,v))return `<p class="past">${houseLine(v,"ngươi")}: không thể lấy lòng hay ra tay.</p>`;let h=`<p class="past" style="margin:2px 0">${together(S,v)?"Đang cùng chỗ với nàng":`Không cùng chỗ: phải sai người đi (khó hơn; việc hại: kẻ đi bị bắt, khai ra ngươi: ${chanceW(confessRisk(bestSent(S)))})`}</p><div class="rbtn">${["spy","ally","gift","rumor","bribe","block","frame","poison","accuse","vp","plant","musk","catswap","ksab","kpoison","pond","kframe","takeaway"].map(k=>b(k)).join("")}</div>`;
 if(S.rank>=7)h+=`<div class="rbtn"><button data-e="${i}" data-k="judge" ${dis||!chOK(S,v)?"disabled":""}>Xử tội<small>${chOK(S,v)?"theo chứng cứ":chNeedTxt(S,v)}</small></button><button data-e="${i}" data-k="conf" ${dis?"disabled":""}>Tịch thu trang sức<small>nàng thù -20</small></button><button data-e="${i}" data-k="reward" ${dis||S.bac<-BAL.tw.reward.bac?"disabled":""}>Ban thưởng<small>Bạc ${BAL.tw.reward.bac} · ${pvQuy(v,BAL.tw.g.reward[0],"thiện cảm")}</small>
</button>${v.confined?`<button data-e="${i}" data-k="pardon" ${dis?"disabled":""}>Ân xá<small>hết cấm túc</small></button>`:""}</div>`;
 return h}
/* KIT TAB MODE (design-scale p2): every .game class that depends on the open tab. Reset before EVERY panel render; the renderer of the open
   tab sets its own (j6 cardtab, j38 maptab, jhc/jht/j72 cardtab). Was: each renderer set only its class, so a renderer that short-circuits the
   chain (jhc Hậu cung, jht, j72, j42, jkc) left the previous tab's class on — Dư đồ → Hậu cung kept .maptab (full-width panel, stage hidden). */
const KIT_TABMODE=["maptab","cardtab"];
function renderPanel(){try{const gm=document.querySelector(".game");if(gm)gm.classList.remove(...KIT_TABMODE);renderPanel0()}catch(e){console.error(e);const el=$("panel");el.innerHTML=`<p class="past">Mục này đang lỗi, ngươi chọn mục khác.</p>`}}
function renderPanel0(){const el=$("panel");let h="";faceInit();const gm=document.querySelector(".game");if(gm)gm.classList.toggle("cardtab",["rv","kid","staff","court","men"].includes(tab));
 if(tab==="act"){const pr=S.preg?`${S.hidden?"Đang giấu thai":"Mang thai"} tháng ${S.preg}${S.preg<=3||S.preg>=7?" · tháng hiểm":""}`:`Có thai mỗi lần thị tẩm: <b>${chanceLvl(conceiveCh())}</b>`;
   h=`<div class="cards">${deck.map(cardH).join("")}</div>`}
 if(tab==="go")h=mapHTML();
 if(tab==="rv")h=rvTabHTML();
 if(tab==="kid"){const hl=S.heir?(S.heir.v?`Thái tử: ${S.heir.k.name}, con của ${S.heir.v.name}.`:`<span class="g">Con ngươi, ${S.heir.k.name}, là Thái tử.</span>`):"Chưa lập Thái tử. Hoàng tử từ 6 tuổi mới được xét.";
   h=kidTabHTML(hl)}
 if(tab==="art")h=artTabHTML();
 if(tab==="story"){const s=STORY[S.origin.k];if(s.calc)S.st.step=s.calc();
   h=`<div class="story"><h3>${s.t}</h3><p style="margin:0 0 4px">${s.goal}</p><p style="margin:0"><b>${typeof lab67==="function"&&lab67()||`Bước ${S.st.step}/${s.n}`}</b> · ${S.st.done===1?`<span class="g">Thành: ${S.st.tag}</span>`:S.st.done===-1?`<span class="r">Bại: ${S.st.tag}</span>`:s.hint()}</p></div>`;
   h+=S.rank>=7?`<div class="req"><h3>Ngươi là Hoàng hậu</h3>Đưa con mình lên ngôi để thành Hoàng thái hậu.</div>`:S.out?`<div class="req"><h3>Lãnh cung</h3>Không bàn chuyện sắc phong. Được minh oan thì phục vị ${RANKS[Math.max(0,Math.min(6,S.coldRank||0))].n} (hoặc thấp hơn một bậc).</div>`:`<div class="req"><h3>Điều kiện sắc phong ${RANKS[S.rank+1].n}</h3>${kitReqRows(promoReq())}<span class="past">Ngôi Hoàng hậu về sau cần: ngôi bỏ trống, có hoàng tử và Thái hậu ${netTh("th","than2")} (không con trai: Thái hậu ${netAt("th","than2",has("hieuthao")?BAL.hhThNoSonHieu:BAL.hhThNoSon)}), và <b class="${S.duc>=hhNeed(S).duc?"g":"r"}">Đức ${S.duc} (cần ${hhNeed(S).duc})</b> (mẹ Thái tử chỉ cần ${BAL.hhDucHeir}). Khi ngôi trống, Hoàng thượng chọn trong những người đủ điều kiện (nặng ở hoàng tử, Thái hậu, Danh).</span><br><span class="past">Đủ điều kiện thì được dự khảo hạch tấn phong; đỗ thì có thánh chỉ. ${typeof promoRuleTxt==="function"?promoRuleTxt():""}</span></div>`}
 if(tab==="inv")h=invHTML();
 if(tab==="rel")h=relHTML();
 if(tab==="staff")h=staffTabHTML();
 if(tab==="fac")h=facHTML();
 if(tab==="log")h=`<h3>Nhật ký</h3><div class="logs">${S.logs.map(x=>{const v=rivals.find(r=>x.includes(r.name));return `<div>${v?mdH(pv(v),"xs"):x.includes("Hoàng thượng")?mdH(pEmp(),"xs"):""}${x}</div>`}).join("")||"<div>Chưa có gì.</div>"}</div>`+pastHTML();
 const same=el.dataset.tab===tab&&el.dataset.pg===String(PG[tab]),keep=el.dataset.tab===tab?el.scrollTop:0,rc=el.querySelector(".pcr"),rk=same&&rc?rc.scrollTop:0,lc=el.querySelector(".pcl"),lk=same&&lc?lc.scrollTop:0;el.innerHTML=h;el.dataset.tab=tab;el.dataset.pg=String(PG[tab]);kitFix(el);panelScrollKeep(el,keep,rk,lk)}
/* oi-render: the panel keeps its scroll place after a redraw. Setting scrollTop right after innerHTML forced a full layout of the new panel,
   and the card fixes after it (kitFix, kaNorm) changed the panel again, so the next read laid it all out a second time. Inside a render the
   scroll is set once when the outermost render returns (jlag2 renderAfter, same task, before the frame); outside a render, at once.
   Every panel renderer (j6, j42, j72, jhc, jht, jkc) uses this one helper. */
function panelScrollKeep(el,keep,rk,lk){const f=()=>{if(!el.isConnected)return;el.scrollTop=keep;if(rk!=null){const r2=el.querySelector(".pcr");if(r2)r2.scrollTop=rk}if(lk!=null){const l2=el.querySelector(".pcl");if(l2)l2.scrollTop=lk}};
 (window.renderAfter||((k,g)=>g()))("pscroll",f)}
function showSelf(){Q.unshift({t:S.name,cls:"pcm",h:selfCardHTML()});showModal()}
function showEmp(){Q.unshift({t:empNm(),cls:"pcm",h:empCardHTML()});showModal()}

/* save / load: three slots */
let SLOT=1;const SK=n=>"hclh-save-v2-"+n;
/* save-growth (d): ONE sync codec for every big browser store of a life (save slots, co-op week copy, guest copy).
   LZ77 on UTF-16 code units (64 k window), bit-packed 15 bits per char into U+0020..U+801F (no surrogates, no control chars,
   safe for every browser's localStorage). Stored form "CTMZ" + length (2 chars) + stream. Anything else (old saves = plain JSON)
   is returned unchanged by slotDec, so every old save still loads. */
const SLOTZ="CTMZ";
function slotEnc(s){
 const n=s.length;let out=new Uint16Array(Math.ceil(n*17/15/4)+64),o=0,acc=0,nb=0;
 const put=(v,bits)=>{acc=(acc<<bits)|v;nb+=bits;if(nb>=15){nb-=15;if(o>=out.length){const t=new Uint16Array(out.length*2);t.set(out);out=t}out[o++]=32+((acc>>>nb)&0x7fff);acc&=(1<<nb)-1}};
 const W=65536,M=W-1,head=new Int32Array(W).fill(-1),prev=new Int32Array(W),MAXL=259,MINL=4;
 const hash=i=>(Math.imul((s.charCodeAt(i)<<5)^(s.charCodeAt(i+1)<<3)^(s.charCodeAt(i+2)<<1)^s.charCodeAt(i+3),-1640531535)>>>16);
 put(n>>>15&0x7fff,15);put(n&0x7fff,15);
 let ls=0,ll=0;
 const flush=()=>{while(ll>0){const m=ll>128?128:ll;put(0,1);put(m-1,7);for(let j=0;j<m;j++){const c=s.charCodeAt(ls+j);if(c<128)put(c,8);else{put(1,1);put(c>>>8,8);put(c&255,8)}}ls+=m;ll-=m}};
 let i=0;
 while(i<n){let bl=0,bd=0;
  if(i+MINL<=n){const h=hash(i);let p=head[h],t=16;prev[i&M]=p;head[h]=i;
   while(p>=0&&i-p<W&&t-->0){if(s.charCodeAt(p+bl)===s.charCodeAt(i+bl)){let l=0;const mx=n-i<MAXL?n-i:MAXL;while(l<mx&&s.charCodeAt(p+l)===s.charCodeAt(i+l))l++;if(l>bl){bl=l;bd=i-p;if(l>=mx)break}}const q=prev[p&M];if(q>=p)break;p=q}}
  if(bl>=MINL){if(ll)flush();put(1,1);put(bl-MINL,8);put((bd-1)>>>8,8);put((bd-1)&255,8);
   /* a long match: index only its first and last few positions (speed; the ratio hardly moves) */const e=i+bl,e1=bl>64?i+4:e;for(let k=i+1;k<e1&&k+MINL<=n;k++){const h=hash(k);prev[k&M]=head[h];head[h]=k}if(e1<e)for(let k=e-3;k<e&&k+MINL<=n;k++){const h=hash(k);prev[k&M]=head[h];head[h]=k}i=e;ls=i}
  else{if(!ll)ls=i;ll++;i++}}
 flush();if(nb>0)put(0,15-nb);
 let r=SLOTZ;for(let k=0;k<o;k+=8192)r+=String.fromCharCode.apply(null,out.subarray(k,Math.min(o,k+8192)));return r}
function slotDec(z){
 if(typeof z!=="string"||z.slice(0,4)!==SLOTZ)return z;
 let zi=4,acc=0,nb=0;const L=z.length;
 const get=bits=>{while(nb<bits){if(zi>=L)throw new Error("slotDec: short");acc=(acc<<15)|(z.charCodeAt(zi++)-32);nb+=15}nb-=bits;const v=(acc>>>nb)&((1<<bits)-1);acc&=(1<<nb)-1;return v};
 const n=get(15)*32768+get(15),out=new Uint16Array(n);let o=0;
 while(o<n){if(get(1)===0){const m=get(7)+1;if(o+m>n)throw new Error("slotDec: run");for(let j=0;j<m;j++){const c=get(8);out[o++]=c<128?c:((c&127)<<9|get(9))}}
  else{const l=get(8)+4,d=(get(8)<<8|get(8))+1;if(d>o||o+l>n)throw new Error("slotDec: ref");for(let j=0;j<l;j++,o++)out[o]=out[o-d]}}
 let r="";for(let k=0;k<n;k+=8192)r+=String.fromCharCode.apply(null,out.subarray(k,Math.min(n,k+8192)));return r}
/* every reader/writer of a big life store goes through these two (j6 save/loadSlot, j16 Sổ › export/import, jcloud rawSlot/writeSlot,
   jcoopworld week copy, jcoopthine guest copy); the text handed around (cloud, export code, hash) stays the plain JSON */
function slotGet(k){let r=null;try{r=localStorage.getItem(k)}catch(e){return null}if(r==null)return null;try{return slotDec(r)}catch(e){console.error("slotDec",k,e);return null}}
function slotPut(k,json){localStorage.setItem(k,json==null?json:slotEnc(json))}
window.slotGet=slotGet;window.slotPut=slotPut;window.slotEnc=slotEnc;window.slotDec=slotDec;
function ser(){const rs=new Set(rivals),ks=new Set(allKids().map(x=>x[0]));
 const walk=(o,top)=>{if(o===null||typeof o!=="object")return o;if(!top&&rs.has(o))return{$r:o.id};if(!top&&ks.has(o))return{$k:o.name};
  if(Array.isArray(o))return o.map(x=>walk(x,false));const r={};
  for(const k in o){const v=o[k];if(typeof v==="function"||k==="origin")continue;r[k]=(k==="kids"&&Array.isArray(v))?v.map(x=>walk(x,true)):walk(v,false)}return r};
 return{v:6,b4:1,buoi:S.buoi||0,ok:S.origin.k,S:walk(S,true),R:rivals.map(x=>walk(x,true)),rid,tab,used,P:serQ(),at:Date.now()}}
function deser(d){trMigrate(d);rivals=d.R;rid=d.rid;S=d.S;S.origin=originByKey(d.ok);/* a country branch (old "bd" saves: Bắc Địch branch of hòa thân) resolves too */
 const kid=n=>allKids().map(x=>x[0]).find(k=>k.name===n)||null;
 const fix=o=>{if(!o||typeof o!=="object")return o;if(o.$r!=null&&Object.keys(o).length===1)return rivals.find(v=>v.id===o.$r)||null;if(o.$k!=null&&Object.keys(o).length===1)return kid(o.$k);
  for(const k in o)o[k]=fix(o[k]);return o};
 for(const k in S)if(k!=="kids")S[k]=fix(S[k]);
 tab=d.tab||"act";used=d.used||0;popIdx=null;popMsg="";
 const vk=S.visit&&S.visit.k;if(d.v<3||!vk||vk==="home"||placeOf(vk).k!==vk||!Array.isArray(S.visit.people)){S.visit={k:"home",people:homePeople(),talked:false};S.place="home"}else S.place=vk;
 if(d.v<3)S.mg=null;if(d.v<5){used=0;S.buoi=0}try{srvLad6()}catch(e){console.error(e)}/* maid-ladder-6: 5-rung save → 6 rungs (j14) */normAll();Q=deserQ(d.P||[])}
let SAVE_N=0;/* save-unseen-lists: counts the writes that really reached the slot (a wrapper that holds or drops a save never moves it: jqsave marks a buổi as written only when this moved) */
function save(){if(!S||quiet)return;try{if(S.dead)localStorage.removeItem(SK(SLOT));else{slotPut(SK(SLOT),JSON.stringify(ser()));SAVE_N++}localStorage.setItem("hclh-slot",String(SLOT))}catch(e){if(!S.dead)saveBlocked()}}
/* robot10 E-FIX-3: a save the browser refuses (storage full / blocked) was dropped silently — her progress stopped being kept. ONE notice for
   EVERY save writer (j6 save, jcloud writeSlot, co-op jcoopworld snapSave, jcoopthine guest copy; j16 Sổ › Ghi vào ô prints the same words): the kit notice, once */
function saveBlocked(){try{if(typeof window.kitNotice==="function"&&typeof CTM_WAIT==="object"&&CTM_WAIT.saveBlocked)window.kitNotice({id:"saveBlocked",line:CTM_WAIT.saveBlocked,sticky:true})}catch(z){}}
window.saveBlocked=saveBlocked;
function loadSlot(n){try{const d=JSON.parse(slotGet(SK(n))||"null");if(d&&d.v===2)d.P=[];/* v2: no pending choices; v2/v3 get items, stat blocks, records via normAll */
 return d&&d.v>=2&&d.v<=6?d:null}catch(e){return null}}
function showTitle(){const T=$("title");const L=[1,2,3].map(n=>{const d=loadSlot(n);
  if(!d)return `<div class="slot"><b>Ô ${n}</b><span class="past">Trống</span><button class="main" data-new="${n}">Bắt đầu kiếp mới</button></div>`;
  const s=d.S;return `<div class="slot"><b>Ô ${n}: ${s.name}</b><span class="past">${RANKS[s.rank].n} · năm ${s.year}, tháng ${s.month}, ${TUAN[s.tuan]}</span><div class="srow"><button class="main" data-load="${n}">Tiếp tục kiếp này</button><button class="btn" data-new="${n}" data-ask="1">Kiếp mới</button></div></div>`}).join("");
 $("slots").innerHTML=L;T.hidden=false;const f=T.querySelector("button");if(f)f.focus({preventScroll:true})}
$("slots").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 if(b.dataset.load){const d=loadSlot(+b.dataset.load);if(!d)return;SLOT=+b.dataset.load;try{if(typeof kmReset==="function")kmReset()}catch(e){}quiet=true;d.tab="act";/* owner 16/11: entering the game always opens her room (Hành sự), never the last tab */try{deser(d)}finally{quiet=false}/* save-year-rollback: a throw in a load step never leaves quiet on (no save would be written for the rest of the life) */$("title").hidden=true;deal();showModal();render();if(S.mg)resumeMG();return}
 /* OB-M3UI (fault 3, SYSTEM act, OD 24/11 ~08:40Z keeps system confirms): a new life over a sổ that holds one = the ONE kit confirm (kitConfirm), not a «Chắc chắn?» second tap */
 if(b.dataset.new){if(b.dataset.ask==="1"){kitConfirm({title:"Bỏ kiếp trong sổ này?",lines:["Kiếp đang ghi trong sổ này sẽ mất, không lấy lại được."],yes:"Bắt đầu kiếp mới",no:"Thôi",onYes:()=>{setTimeout(()=>{try{b.dataset.ask="2";b.click()}catch(x){console.error(x)}},0)}});return}
  /* OB-M3UI-sololh (law 6c, nothing vanishes): a LIVING life that is already «trọn» (S.kpTron, no nghiệp) and is overwritten here still gets its Sổ luân hồi row «Bỏ ngang»;
     an unfinished life is written by jkiep (with its nghiệp), a dead one was written at death */
  if(b.dataset.ask==="2"){try{const d=loadSlot(+b.dataset.new),s=d&&d.S;if(s&&!s.dead&&s.kpTron&&typeof lifeLog==="function"){const p=lifeLog();p.unshift({n:s.name,o:((typeof originByKey==="function"&&originByKey(d.ok))||{}).n||(s.origin&&s.origin.n)||""/* a save keeps the origin KEY (d.ok), not S.origin */,r:(m=>m>=7?"Hoàng hậu":RANKS[m].n)(Math.max(s.rank||0,s.maxRank||0)),age:s.age,y:s.year,kids:(s.kids||[]).filter(k=>k.alive).length,fc:s.fc||"",f:"Bỏ ngang",foes:[]});store.set("cung-luanhoi",p.slice(0,40))}}catch(x){console.error(x)}}
  SLOT=+b.dataset.new;$("title").hidden=true;start()}};

/* wiring */
$("panel").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;const d=b.dataset;
 if(d.pg){PG[d.pg]=+d.pi;renderPanel();const on=$("panel").querySelector(".pface.on");if(on)on.scrollIntoView({block:"nearest",inline:"nearest"});return}
 if(d.i!==undefined)act(+d.i);else if(d.r!==undefined)doAct(+d.r,d.a);else if(d.e!==undefined)empAct(+d.e,d.k);else if(d.it)itemAct(d.it,+d.ix);else if(d.inv)invAct(d.inv);else if(d.go)walkGo(d.go);else if(d.sv)servAct(d.sv,+d.sid);else if(d.cv)courtAct(d.cv,d.ck);else if(d.hire){const ci=d.hire==="maid"?0:1;if(S.bac>=BAL.house.hireBac&&roomFor(d.hire)&&hhHas(S)[ci]<capOf(S)[ci]){apply({bac:-BAL.house.hireBac});S.staff.push(mkServ(d.hire));render()}}else if(d.plantsv){pushDil(mkP("plantsv"),"Cài người");render()}else if(d.fa)facAct(d.fa,d);else if(d.rec)recommend(+d.rec);else if(d.smaid)searchMaids();else if(d.relot)reLot(false);else if(d.rel){relSel=isNaN(+d.rel)?d.rel:+d.rel;render()}else if(d.art)lesson(d.art);else if(b.id==="master")hireMaster()};
$("stage").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 if(b.id==="popx"){popIdx=null;popMsg="";renderStage();return}
 if(b.dataset.p!==undefined){popIdx=+b.dataset.p;popMsg="";renderStage();return}
 if(b.dataset.o!==undefined&&!b.disabled)talk(+b.dataset.o)};
$("tabs").onclick=e=>{const b=e.target.closest("button");if(!b)return;tab=b.dataset.tab;render()};
$("modal").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;if(b.id==="mclose")closeModal();else if(b.dataset.m!==undefined)chooseM(+b.dataset.m)};
/* SANGBUOI-HELD r2: the button calls the GLOBAL nextBuoi at tap time = the outermost wrapped chain (every module's nextBuoi wrapper), the same as the khắc-spent auto-advance; wired here before any wrapper, so a bare reference would skip them all */
$("next").onclick=()=>nextBuoi();$("me").onclick=()=>{if(!S.dead&&!Q.length)showSelf()};$("emp").onclick=()=>{if(!S.dead&&!Q.length)showEmp()};
$("menu").onclick=()=>{if(Q.length&&!S.dead)return;save();showTitle()};
try{const H=window.claude&&window.claude.hot;if(H){if(typeof H.snapshot==="function")H.snapshot(()=>S&&!S.dead?ser():null);if(typeof H.ready==="function")H.ready()}}catch(e){}
(()=>{let s=1;try{s=+localStorage.getItem("hclh-slot")||1}catch(e){}SLOT=s;showTitle()})();
