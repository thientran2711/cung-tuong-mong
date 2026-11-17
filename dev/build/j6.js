
/* rendering */
const RIMG=["rank-dap-ung","rank-thuong-tai","rank-quy-nhan","rank-tan","rank-phi","rank-quy-phi","rank-hoang-quy-phi","rank-hoang-hau"];
const SCIMG={vuon:"ngu-hoa-vien",thu:"ngu-thu-phong",dtd:"duong-tam-dien",tn:"tu-ninh-cung",kn:"khon-ninh-cung",rv:"phi-tan-cung",tyv:"thai-y-vien",ksp:"kinh-su-phong",lc:"lanh-cung"};
const AIMG={cam:"cam",ky:"ky",thi:"thi",hoa:"hoa",vu:"vu",y:"y-thuat"};
function ic(n,s){if(!n)return "";s=s||16;return `<img class="ic" src="img/${n}.webp" width="${s}" height="${s}" alt="" onerror="this.remove()">`}
function chip(t,cls){return `<span class="chip ${cls||""}">${t}</span>`}
/* warns when an act would drop Đức under the Hoàng hậu bar (40) */
function ducWarn(c){const t=ducWarnTxt(c);return t?`<span class="fx r"><b>${t}</b></span>`:""}
function cardH(a,i){const poor=a.c&&a.c.bac&&S.bac+a.c.bac<0,o=a.o==null?100:a.o;const dis=!can(cardCost(a))||a.done||poor||a.lock||S.dead||(a.b!=null&&(S.buoi||0)!==a.b);
 const gain=[fmt(a.w),a.x].filter(Boolean).join(" · ")||"không";
 return `<button class="card" data-i="${i}" ${dis?"disabled":""}><h4>${a.n}</h4><span class="fx">${pips(cardCost(a))} ${cardCost(a)} khắc${a.b!=null?` · <b>Chỉ ${BUOI[a.b].toLowerCase()}</b>`:""}</span><p>${a.t||""}</p>${o<100&&!a.lock?`<span class="odds">${word(cl(o+lotB(S,a.dom),5,95))}${lotTag(a.dom)}</span>`:`<span class="odds">Chắc chắn</span>`}<span class="fx">Tốn: ${fmt(a.c)||"không"}</span>${ducWarn(a.c)}<span class="fx">Thành: ${gain}</span>${o<100&&!a.lock?`<span class="fx">Hỏng: ${fmt(a.l)||"không mất gì"}</span>`:""}</button>`}
function render(){if(!S)return;renderHUD();renderStage();renderPanel();$("next").disabled=S.dead||Q.length>0||!!S.mg;$("next").textContent=(S.buoi||0)>=B4L?"Sang ngày mới":"Sang buổi";if(!S.dead&&!Q.length&&!S.mg&&used>=BAL.time.khac&&!advLock){advLock=true;setTimeout(()=>{advLock=false;if(used>=BAL.time.khac&&!Q.length&&!S.dead)nextBuoi()},350)}
 document.querySelectorAll("#tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===tab));
 if(Q.length&&$("modal").hidden)showModal();save()}
function renderHUD(){if(typeof renderHud2==="function")renderHud2();$("me-n").textContent=S.name;$("me-r").innerHTML=ic(RIMG[S.rank],14)+rkName(S);$("me-d").textContent=`T${S.month}/${S.year} · ${TUAN[S.tuan]} · ${BUOI[S.buoi||0]} · ${S.wx?S.wx.n:""} ${"●".repeat(Math.max(0,BAL.time.khac-used))}${"○".repeat(Math.min(BAL.time.khac,used))}`;
 $("me-p").innerHTML=mdH(pMe(),"sm");
 for(const k of ["bac","suc","sung","danh"]){const e=$("hud-"+k);e.querySelector("span").textContent=S[k];const u=e.querySelector("u");if(u)u.style.width=S[k]+"%"}
 $("emp-p").innerHTML=mdH(pEmp(),"sm");$("emp-n").textContent=S.emp.era;const m=MOODS[S.emp.mood];$("emp-m").innerHTML=`<span class="${m[1]}">${m[0]}</span>`}
function renderStage(){const P=placeOf(S.place);$("stage").className="stage sc-"+P.sc;$("scimg").style.backgroundImage=SCIMG[P.sc]?`url(img/${SCIMG[P.sc]}.webp)`:"none";const ppl=curPeople();
 {const raw=S.visit&&S.visit.msg?S.visit.msg:P.d;const btns=(raw.match(/<button[\s\S]*?<\/button>/g)||[]).join("");const txt=raw.replace(/<button[\s\S]*?<\/button>/g,"").replace(/<[^>]+>/g,"");$("sc-t").innerHTML=`<h2><span class="rt1">${P.n}</span><span class="rmsg" title="${txt.replace(/"/g,"")}"> · ${txt}</span></h2>${btns}`}
 $("tokens").innerHTML=ppl.length?ppl.map((p,i)=>{const f=pFaceOf(p);
   if(p.kind==="hh")f.ini="Phượng";return `<button class="tok" data-p="${i}">${mdH(f)}<span class="tag">${p.name}</span></button>`}).join(""):`<p class="empty">Không có ai ở đây.</p>`;
 let pw="";if(popIdx!=null&&ppl[popIdx])pw=`<div class="pop pcpop">${popCard(ppl[popIdx],popIdx)}</div>`;
 $("popw").innerHTML=pw;kitFix($("popw"))}
function rvButtons(v,i){const dis=!can(2)||!v.alive||v.out||S.dead;const b=(k,extra)=>{const a=ACT[k];if(!a||(a.kid&&!a.ok(S,v)))return"";const ok=a.ok(S,v),o=a.o?a.o(S,v):null;
  return `<button data-r="${i}" data-a="${k}" ${dis||!ok?"disabled":""}>${k==="poison"||k==="kpoison"?ic("doc",14):""}${a.n}<small>${[o!=null&&ok?word(cl(o+lotB(S,ACTDOM[k]),5,95))+lotTag(ACTDOM[k]):"",fmt(a.c),!ok&&a.x?a.x:ok&&a.x?a.x:""].filter(Boolean).join(" · ")||"không tốn"}</small></button>`};
 if(sameHouse(S,v))return `<p class="past">Cùng ${houseName(v)} với ngươi: không thể lấy lòng hay ra tay.</p>`;let h=`<p class="past" style="margin:2px 0">${together(S,v)?"Đang cùng chỗ với nàng":`Không cùng chỗ: phải sai người đi (khó hơn; việc hại: kẻ đi bị bắt, khai ra ngươi: ${chanceW(confessRisk(bestSent(S)))})`}</p><div class="rbtn">${["spy","ally","gift","rumor","bribe","block","frame","poison","accuse","vp","plant","musk","catswap","ksab","kpoison","pond","kframe","takeaway"].map(k=>b(k)).join("")}</div>`;
 if(S.rank>=7)h+=`<div class="rbtn"><button data-e="${i}" data-k="judge" ${dis||evG(S,v)<2?"disabled":""}>Xử tội<small>${evG(S,v)>=2?"theo chứng cứ":"cần 2 chứng cứ"}</small></button><button data-e="${i}" data-k="conf" ${dis?"disabled":""}>Tịch thu trang sức<small>nàng thù -20</small></button><button data-e="${i}" data-k="reward" ${dis||S.bac<30?"disabled":""}>Ban thưởng<small>Bạc -30 · thiện cảm +20</small></button>${v.confined?`<button data-e="${i}" data-k="pardon" ${dis?"disabled":""}>Ân xá<small>hết cấm túc</small></button>`:""}</div>`;
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
   h+=S.rank>=7?`<div class="req"><h3>Ngươi là Hoàng hậu</h3>Đưa con mình lên ngôi để thành Hoàng thái hậu.</div>`:S.out?`<div class="req"><h3>Lãnh cung</h3>Không bàn chuyện sắc phong. Được minh oan thì phục vị ${RANKS[Math.max(0,Math.min(6,S.coldRank||0))].n} (hoặc thấp hơn một bậc).</div>`:`<div class="req"><h3>Điều kiện sắc phong ${RANKS[S.rank+1].n}</h3>${kitReqRows(promoReq())}<span class="past">Ngôi Hoàng hậu về sau cần: ngôi bỏ trống, có hoàng tử và Thái hậu ${BAL.hhTh} (không con trai: Thái hậu ${has("hieuthao")?BAL.hhThNoSonHieu:BAL.hhThNoSon}), và <b class="${S.duc>=hhNeed(S).duc?"g":"r"}">Đức ${S.duc} (cần ${hhNeed(S).duc})</b> (mẹ Thái tử chỉ cần ${BAL.hhDucHeir}). Khi ngôi trống, Hoàng thượng chọn trong những người đủ điều kiện (nặng ở hoàng tử, Thái hậu, Danh).</span><br><span class="past">Đủ điều kiện thì được dự khảo hạch tấn phong; đỗ thì có thánh chỉ. ${typeof promoRuleTxt==="function"?promoRuleTxt():""}</span></div>`}
 if(tab==="inv")h=invHTML();
 if(tab==="rel")h=relHTML();
 if(tab==="staff")h=staffTabHTML();
 if(tab==="fac")h=facHTML();
 if(tab==="log")h=`<h3>Nhật ký</h3><div class="logs">${S.logs.map(x=>{const v=rivals.find(r=>x.includes(r.name));return `<div>${v?mdH(pv(v),"xs"):x.includes("Hoàng thượng")?mdH(pEmp(),"xs"):""}${x}</div>`}).join("")||"<div>Chưa có gì.</div>"}</div>`+pastHTML();
 const same=el.dataset.tab===tab&&el.dataset.pg===String(PG[tab]),keep=el.dataset.tab===tab?el.scrollTop:0,rc=el.querySelector(".pcr"),rk=same&&rc?rc.scrollTop:0,lc=el.querySelector(".pcl"),lk=same&&lc?lc.scrollTop:0;el.innerHTML=h;el.dataset.tab=tab;el.dataset.pg=String(PG[tab]);el.scrollTop=keep;kitFix(el);const r2=el.querySelector(".pcr");if(r2)r2.scrollTop=rk;const l2=el.querySelector(".pcl");if(l2)l2.scrollTop=lk}
function showSelf(){Q.unshift({t:S.name,cls:"pcm",h:selfCardHTML()});showModal()}
function showEmp(){Q.unshift({t:empName(),cls:"pcm",h:empCardHTML()});showModal()}

/* save / load: three slots */
let SLOT=1;const SK=n=>"hclh-save-v2-"+n;
function ser(){const rs=new Set(rivals),ks=new Set(allKids().map(x=>x[0]));
 const walk=(o,top)=>{if(o===null||typeof o!=="object")return o;if(!top&&rs.has(o))return{$r:o.id};if(!top&&ks.has(o))return{$k:o.name};
  if(Array.isArray(o))return o.map(x=>walk(x,false));const r={};
  for(const k in o){const v=o[k];if(typeof v==="function"||k==="origin")continue;r[k]=(k==="kids"&&Array.isArray(v))?v.map(x=>walk(x,true)):walk(v,false)}return r};
 return{v:6,b4:1,buoi:S.buoi||0,ok:S.origin.k,S:walk(S,true),R:rivals.map(x=>walk(x,true)),rid,tab,used,P:serQ(),at:Date.now()}}
function deser(d){rivals=d.R;rid=d.rid;S=d.S;S.origin=originByKey(d.ok);/* a country branch (old "bd" saves: Bắc Địch branch of hòa thân) resolves too */
 const kid=n=>allKids().map(x=>x[0]).find(k=>k.name===n)||null;
 const fix=o=>{if(!o||typeof o!=="object")return o;if(o.$r!=null&&Object.keys(o).length===1)return rivals.find(v=>v.id===o.$r)||null;if(o.$k!=null&&Object.keys(o).length===1)return kid(o.$k);
  for(const k in o)o[k]=fix(o[k]);return o};
 for(const k in S)if(k!=="kids")S[k]=fix(S[k]);
 tab=d.tab||"act";used=d.used||0;popIdx=null;popMsg="";
 const vk=S.visit&&S.visit.k;if(d.v<3||!vk||vk==="home"||placeOf(vk).k!==vk||!Array.isArray(S.visit.people)){S.visit={k:"home",people:homePeople(),talked:false};S.place="home"}else S.place=vk;
 if(d.v<3)S.mg=null;if(d.v<5){used=0;S.buoi=0}normAll();Q=deserQ(d.P||[])}
function save(){if(!S||quiet)return;try{if(S.dead)localStorage.removeItem(SK(SLOT));else localStorage.setItem(SK(SLOT),JSON.stringify(ser()));localStorage.setItem("hclh-slot",String(SLOT))}catch(e){}}
function loadSlot(n){try{const d=JSON.parse(localStorage.getItem(SK(n))||"null");if(d&&d.v===2)d.P=[];/* v2: no pending choices; v2/v3 get items, stat blocks, records via normAll */
 return d&&d.v>=2&&d.v<=6?d:null}catch(e){return null}}
function showTitle(){const T=$("title");const L=[1,2,3].map(n=>{const d=loadSlot(n);
  if(!d)return `<div class="slot"><b>Ô ${n}</b><span class="past">Trống</span><button class="main" data-new="${n}">Bắt đầu kiếp mới</button></div>`;
  const s=d.S;return `<div class="slot"><b>Ô ${n}: ${s.name}</b><span class="past">${RANKS[s.rank].n} · năm ${s.year}, tháng ${s.month}, ${TUAN[s.tuan]}</span><div class="srow"><button class="main" data-load="${n}">Tiếp tục kiếp này</button><button class="btn" data-new="${n}" data-ask="1">Kiếp mới</button></div></div>`}).join("");
 $("slots").innerHTML=L;T.hidden=false;const f=T.querySelector("button");if(f)f.focus({preventScroll:true})}
$("slots").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 if(b.dataset.load){const d=loadSlot(+b.dataset.load);if(!d)return;SLOT=+b.dataset.load;try{if(typeof kmReset==="function")kmReset()}catch(e){}quiet=true;d.tab="act";/* owner 16/11: entering the game always opens her room (Hành sự), never the last tab */deser(d);quiet=false;$("title").hidden=true;deal();showModal();render();if(S.mg)resumeMG();return}
 if(b.dataset.new){if(b.dataset.ask==="1"){b.dataset.ask="2";b.innerHTML="Chắc chắn?<small>Kiếp đang chơi sẽ mất</small>";return}SLOT=+b.dataset.new;$("title").hidden=true;start()}};

/* wiring */
$("panel").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;const d=b.dataset;
 if(d.pg){PG[d.pg]=+d.pi;renderPanel();const on=$("panel").querySelector(".pface.on");if(on)on.scrollIntoView({block:"nearest",inline:"nearest"});return}
 if(d.i!==undefined)act(+d.i);else if(d.r!==undefined)doAct(+d.r,d.a);else if(d.e!==undefined)empAct(+d.e,d.k);else if(d.it)itemAct(d.it,+d.ix);else if(d.inv)invAct(d.inv);else if(d.go)walkGo(d.go);else if(d.sv)servAct(d.sv,+d.sid);else if(d.cv)courtAct(d.cv,d.ck);else if(d.hire){if(S.bac>=20&&roomFor(d.hire)){apply({bac:-20});S.staff.push(mkServ(d.hire));render()}}else if(d.plantsv){pushDil(mkP("plantsv"),"Cài người");render()}else if(d.fa)facAct(d.fa,d);else if(d.rec)recommend(+d.rec);else if(d.smaid)searchMaids();else if(d.relot)reLot(false);else if(d.rel){relSel=isNaN(+d.rel)?d.rel:+d.rel;render()}else if(d.art)lesson(d.art);else if(b.id==="master")hireMaster()};
$("stage").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 if(b.id==="popx"){popIdx=null;popMsg="";renderStage();return}
 if(b.dataset.p!==undefined){popIdx=+b.dataset.p;popMsg="";renderStage();return}
 if(b.dataset.o!==undefined&&!b.disabled)talk(+b.dataset.o)};
$("tabs").onclick=e=>{const b=e.target.closest("button");if(!b)return;tab=b.dataset.tab;render()};
$("modal").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;if(b.id==="mclose")closeModal();else if(b.dataset.m!==undefined)chooseM(+b.dataset.m)};
$("next").onclick=nextBuoi;$("me").onclick=()=>{if(!S.dead&&!Q.length)showSelf()};$("emp").onclick=()=>{if(!S.dead&&!Q.length)showEmp()};
$("menu").onclick=()=>{if(Q.length&&!S.dead)return;save();showTitle()};
try{const H=window.claude&&window.claude.hot;if(H){if(typeof H.snapshot==="function")H.snapshot(()=>S&&!S.dead?ser():null);if(typeof H.ready==="function")H.ready()}}catch(e){}
(()=>{let s=1;try{s=+localStorage.getItem("hclh-slot")||1}catch(e){}SLOT=s;showTitle()})();
