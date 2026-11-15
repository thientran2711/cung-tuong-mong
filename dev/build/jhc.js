
/* ================= jhc: HẬU CUNG = mọi người trong cung · GIAO TÌNH = ân oán + phe phái (owner 11/15 04:15Z–06:00Z, review/hau-cung-ui) — KIT §36 =================
   1. Main tabs: Hành sự · Dư đồ · Hậu cung · Giao tình · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện.
      Hậu cung (group hc) sub-tabs: Hoàng thượng · Thái hậu (court) | Phi tần (rv) | Nam nhân (men) | Cung nhân (staff).
      Giao tình (group gt) sub-tabs: Ân oán (rel) | Phe phái (fac). The game's tab keys stay, so every [data-tab] link and old save keeps working.
   2. Ân oán: one row per person = THẺ QUAN HỆ 3 CỘT (kitRel3): portrait | relation bars | "Đã biết" bullets.
   3. Relation words (owner 05:25Z): "Nàng quý ngươi: <mức> · n", "Nàng oán ngươi: n", "Ngươi quý nàng …", "Ngươi oán nàng …" (role names where natural).
   4. Người chạy việc (was "Sai đi: …"): one line on the maid card, tap = what it means, "Đổi ›" lets her choose.
   5. Men: unique given names; the Nam nhân sub-tab lists only men she has met. */
(function(){
const T=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
/* ---------- 3. relation words ---------- */
window.quyW=function(v){return v<=-30?"Ghét":v<-10?"Không ưa":v<=10?"Bình thường":v<30?"Có cảm tình":v<60?"Quý mến":"Thân thiết"};
const sg=n=>(n>0?"+":"")+Math.round(n);
try{Object.assign(KIT_GLOSS,{
 "Quý":"Người này quý người kia bao nhiêu (từ -100 đến 100; âm là không ưa, ghét). Cao thì giúp đỡ, che chở; thấp thì gây khó dễ.",
 "Oán":"Người này oán hận người kia bao nhiêu (0 đến 100), thường vì từng bị hại. Oán cao thì dễ trả thù.",
 "Quen biết":"Ngươi biết người này đến đâu: Người lạ → Mới thấy mặt → Biết tên → Đã quen. Gặp mặt trò chuyện, hỏi kẻ hầu, dò la thì quen thêm; đã quen mới thấy tính nết, sủng ái, quan hệ của họ và làm được các việc riêng với họ.",
 "Người chạy việc":"Khi ngươi sai người dò la, đưa thư, mua đồ…, người này đi. Game chọn kẻ hầu có Lòng và tài cao nhất; ngươi có thể đổi người."})}catch(e){}
const gl=(k,l)=>typeof kitGloss==="function"?kitGloss(k,l):l;
/* signed bar (owner via review 11/15: "-3" drew half a red bar): a track with a clear midline at 0; the fill grows FROM the midline toward the
   sign (left red = dislike, right green = liking), length ∝ |v|; "Ghét" / "Thân" end marks are the level words around it */
function sbar(v,lo,hi){lo=lo==null?-100:lo;hi=hi==null?100:hi;const x=Math.max(lo,Math.min(hi,+v||0));const h=x>=0?x/hi*50:x/lo*50;
 return `<span class="ksbar" aria-hidden="true"><i class="ksb-mid"></i><u class="${x>=0?"g":"r"}" style="${x>=0?"left:50%":"right:50%"};width:${h.toFixed(1)}%"></u></span>`}
window.kitSignedBar=sbar;
/* one bar row: "<subj> quý <obj>: Bình thường · -5 [bar]" / "<subj> oán <obj>: 0 [bar]" */
function relBar(kind,subj,obj,v){const lab=`${subj} ${kind} ${obj}`;
 if(v==null)return `<div class="kr3b"><span class="kr3k">${gl(kind==="quý"?"Quý":"Oán",lab)}</span><span class="kr3v"><span class="ef n">chưa rõ</span></span></div>`;
 if(kind==="quý")return `<div class="kr3b"><span class="kr3k">${gl("Quý",lab)}</span><span class="kr3v"><span class="ef ${v>10?"g":v<-10?"r":"n"}">${quyW(v)} · ${sg(v)}</span>${sbar(v)}</span></div>`;
 return `<div class="kr3b"><span class="kr3k">${gl("Oán",lab)}</span><span class="kr3v"><span class="ef ${v>=30?"r":v>10?"r":"n"}">${Math.round(v)}</span>${fbar(v,0,100,false)}</span></div>`}
window.kitRelBar=relBar;
/* who "nàng" is, in words: the Empress by title, others "nàng" */
const subjOf=v=>v&&v.queen?"Hoàng hậu":"Nàng";
const objOf=v=>v&&v.queen?"Hoàng hậu":"nàng";
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

/* ---------- 2. Đã biết as bullets (newest first) ---------- */
function knownList(v){const out=[],seen=new Set();if(!v||v===S)return out;
 const nm=v.name,rk=typeof rkName==="function"?rkName(v):"";
 const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 const short=t=>{let s=T(t).replace(/\.\s*$/,"");s=s.replace(new RegExp("^(?:"+esc(rk)+"\\s+)?"+esc(nm)+"\\s+"),"");s=s.replace(new RegExp("(?:"+esc(rk)+"\\s+)?"+esc(nm),"g"),"nàng");s=s.replace(/^nàng\s+/i,"");return cap(s)};
 const add=(fact,src,when)=>{const f=short(fact);if(!f||f.length<3)return;const k=f.replace(/\d+/g,"#").toLowerCase();if(seen.has(k))return;seen.add(k);out.push({f,src:T(src),when:T(when)})};
 try{const L=typeof intelOf==="function"?intelOf(v):[];for(let i=L.length-1;i>=0;i--){const x=L[i];if(x.current===false)continue;add(x.fact,x.by&&typeof x.by==="object"?x.by.name:x.by,x.when)}}catch(e){}
 try{kn();for(const n of (S.notes[v.id]||[])){let t=T(n),when="",src="";const m=t.match(/^(T\d+\/\d+ \S+ tuần):\s*/);if(m){when=m[1];t=t.slice(m[0].length)}
   const s2=t.match(/^([^:]{2,30}?) (dò được|kể|báo|nghe được):\s*/);if(s2){src=s2[1]+" "+s2[2];t=t.slice(s2[0].length)}
   t.split(/(?<=\.)\s+/).forEach(x=>add(x.replace(/\.$/,""),src,when))}}catch(e){}
 return out}
window.kitKnownList=knownList;
function knownCol(v,max){const L=knownList(v);if(!L.length)return `<div class="kr3r"><b class="kr3h">Đã biết</b><p class="kr3none">Chưa biết gì thêm. Dò la, hỏi kẻ hầu để biết.</p></div>`;
 const li=L.slice(0,max||4).map(x=>`<li><span>${x.f}</span>${x.src||x.when?`<small>${[x.src,x.when].filter(Boolean).join(" · ")}</small>`:""}</li>`).join("");
 return `<div class="kr3r"><b class="kr3h">Đã biết</b><ul class="kr3l">${li}</ul>${L.length>(max||4)?`<button class="chip kchipb kr3more" data-kintel="${v.id}">Xem thêm ${L.length-(max||4)} điều ›</button>`:""}</div>`}

/* ---------- THẺ QUAN HỆ 3 CỘT ---------- */
function rel3(face,rank,name,col,mid,right,extra){
 return `<div class="krel3${right==null||right===""?" kr3two":""}"><div class="kr3p"><div class="kr3f">${pcPort(face,col)}</div><span class="kr3nm" style="--rc:${col||"#7a5530"}">${rank?`<small>${rank}</small>`:""}<b>${name}</b></span></div>`+
  `<div class="kr3m">${mid}${extra||""}</div>${right==null?"":right}</div>`}
window.kitRel3=rel3;
const fcol=f=>(f&&f.col)||"#7a5530";
function hcRelHTML(){kn();const P=consorts();const sel=relSel==="emp"||relSel==="th"?relSel:(byKey(relSel)||S);
 const chips=[["me","Ngươi",pMe()]].concat(liveRivals(true).map(v=>[v.id,v.name,pv(v)]),[["emp","Hoàng thượng",pEmp()]],S.thDead?[]:[["th","Thái hậu",pTH()]]);
 let h=`<div class="relsel kpplist"><span class="past kppl-h">Xem quan hệ của:</span>${chips.map(([k,n,f])=>`<button data-rel="${k}" aria-pressed="${String(k)===String(relSel)}">${mdH(f,"xs")}<span>${n}</span></button>`).join("")}</div>`;
 if(sel==="emp"){const f=pEmp();return h+rel3(f,"Hoàng thượng",empName(),fcol(f),`<div class="kr3b"><span class="kr3k">${gl("Sủng","Ngài sủng ngươi")}</span><span class="kr3v"><span class="ef g">${S.sung}</span>${fbar(S.sung,0,100,true)}</span></div><div class="kr3b"><span class="kr3k">${gl("Ân tình","Ân tình")}</span><span class="kr3v"><span class="ef g">${S.an||0}</span>${fbar(S.an||0,0,100,true)}</span></div>`,"")+
  liveRivals(true).map(v=>{const f=pv(v);return rel3(f,rkName(v),v.name,fcol(f),`<div class="kr3b"><span class="kr3k">Ngài sủng nàng</span><span class="kr3v">${favLine(v)}</span></div>`,knownCol(v))}).join("")}
 if(sel==="th"){const f=pTH();return h+rel3(f,"Thái hậu","Thái hậu",fcol(f),`<div class="kr3b"><span class="kr3k">Thái hậu thương ngươi</span><span class="kr3v"><span class="ef ${S.th>=0?"g":"r"}">${S.th}</span>${sbar(S.th)}</span></div>`,"")+
  liveRivals(true).map(v=>{const f=pv(v);return rel3(f,rkName(v),v.name,fcol(f),`<div class="kr3b"><span class="kr3k">Thái hậu thương nàng</span><span class="kr3v">${knows(v)?`<span class="ef ${v.th>=0?"g":"r"}">${v.th||0}</span>`:'<span class="ef n">chưa rõ</span>'}</span></div>`,knownCol(v))}).join("")}
 if(sel===S){return h+P.filter(p=>p!==S).map(v=>{const f=pv(v),k=knows(v),sj=subjOf(v),ob=objOf(v);
   const mid=relBar("quý",sj,"ngươi",k?aff(v,S):null)+relBar("oán",sj,"ngươi",k?oan(v,S):null)+relBar("quý","Ngươi",ob,aff(S,v))+relBar("oán","Ngươi",ob,oan(S,v))+
    (sameHouse(S,v)?`<p class="kr3note">Cùng ${houseName(v)} với ngươi.</p>`:"");
   const btn=seeBtn(v);return rel3(f,rkName(v),v.name,fcol(f),mid,knownCol(v),btn?`<div class="kr3act pcb">${btn}</div>`:"")}).join("")}
 if(!knows(sel))return h+`<p class="past">Ngươi chưa gặp ${sel.name}, chưa rõ nàng đối với người khác ra sao. Gặp nàng, dò la, hoặc có thêm tai mắt.</p>`;
 const sn=shortN(sel.name);
 return h+P.filter(p=>p!==sel).map(p=>{const me=p===S;const f=me?pMe():pv(p);const ob=me?"ngươi":objOf(p);const kp=me||knows(p);
  const mid=relBar("quý",sn,ob,aff(sel,p))+relBar("oán",sn,ob,oan(sel,p))+relBar("quý",me?"Ngươi":subjOf(p),sn,kp?aff(p,sel):null)+relBar("oán",me?"Ngươi":subjOf(p),sn,kp?oan(p,sel):null);
  return rel3(f,me?(S.out?"Phế phi":RANKS[S.rank].n):rkName(p),me?"Ngươi":p.name,fcol(f),mid,me?knownCol(sel):knownCol(p))}).join("")}
window.hcRelHTML=hcRelHTML;
relHTML=function(){if(!S)return"";if(S.known&&typeof k61Hide==="function"){const h=k61Hide(()=>hcRelHTML(),3);const n=typeof k61Unknown==="function"?k61Unknown(3).length:0;
  return h+(n?`<p class="past">Còn ${n} phi tần ngươi chưa quen biết: chưa xem được quan hệ. Gặp mặt trò chuyện, hỏi người hầu hoặc dò la để biết.</p>`:"")}return hcRelHTML()};

/* ---------- 1. tabs ---------- */
function mkTab(k,l,s,before){const T0=$("tabs");if(!T0||T0.querySelector(`[data-tab="${k}"]`))return;const b=document.createElement("button");b.dataset.tab=k;b.dataset.s=s;b.setAttribute("role","tab");b.textContent=l;b.dataset.l0=l;b.dataset.s0=s;
 const ref=T0.querySelector(`[data-tab="${before}"]`);if(ref)ref.after(b);else T0.appendChild(b);return b}
(function(){const T0=$("tabs");if(!T0)return;const rv=T0.querySelector('[data-tab="rv"]');
 if(rv&&!T0.querySelector('[data-tab="court"]')){const b=document.createElement("button");b.dataset.tab="court";b.dataset.s="Thánh thượng";b.setAttribute("role","tab");b.textContent="Hoàng thượng · Thái hậu";b.dataset.l0=b.textContent;b.dataset.s0=b.dataset.s;rv.before(b)}
 mkTab("men","Nam nhân","Nam nhân","rv");
 /* staff (Cung nhân) belongs to Hậu cung: place its button inside the group (after men) so the bar order stays Hậu cung · Giao tình */
 const st=T0.querySelector('[data-tab="staff"]'),mn=T0.querySelector('[data-tab="men"]');if(st&&mn)mn.after(st);
 const rl=T0.querySelector('[data-tab="rel"]'),fc=T0.querySelector('[data-tab="fac"]');if(rl&&st)st.after(rl);if(fc&&rl)rl.after(fc);
 /* servant road: its own tabs (j42 SRVTABS) — the new keys are not servant tabs */
})();
try{for(const k in KG)delete KG[k];Object.assign(KG,{hc:{keys:["court","rv","men","staff"],l:"Hậu cung",s:"Hậu cung"},gt:{keys:["rel","fac"],l:"Giao tình",s:"Giao tình"},mt:{keys:["story","nho","quest","req","log"],l:"Mệnh truyện",s:"Mệnh truyện"}})}catch(e){}
try{if(window.VP&&VP.tabs)Object.assign(VP.tabs,{court:["Hoàng thượng · Thái hậu","Thánh thượng"],men:["Nam nhân","Nam nhân"],rel:["Ân oán","Ân oán"]})}catch(e){}
/* the sub-tab label: long on wide panels, short ("Thánh thượng") where four segments are tight */
(function(){if(typeof kgSub!=="function")return;const k0=kgSub;kgSub=function(){const r=k0.apply(this,arguments);try{const P=$("panel");const b=P&&P.querySelector('.ksub [data-ksub="court"]');
  if(b){const w=P.clientWidth||innerWidth;b.innerHTML=w<640?"Thánh thượng":"Hoàng thượng · Thái hậu";b.title="Hoàng thượng · Thái hậu"}
  const r2=P&&P.querySelector('.ksub [data-ksub="rel"]');if(r2&&T(r2.textContent)!=="Ân oán")r2.textContent="Ân oán"}catch(e){}return r}})();

/* court sub-tab: Hoàng thượng + Thái hậu, the same pager + person card; their acts = the day's act cards about them (from the Hành sự deck) */
function deckFor(re){try{return (deck||[]).map((a,i)=>[a,i]).filter(([a])=>a&&!a.done&&re.test((a.n||"")+" "+(a.x||""))).map(([a,i])=>cardH(a,i))}catch(e){return[]}}
function thCard(){const known=typeof window.kitCourtKnown!=="function"||window.kitCourtKnown("th")!==false;
 const L=[typeof tuoi==="function"&&S.thAge?tuoi(S.thAge):"",known?`Thái hậu thương ngươi: <b>${S.th|0}</b>`:"Thái hậu thương ngươi: <b>chưa rõ</b>"].filter(Boolean);
 const acts=deckFor(/Thái hậu|Đức Thọ/);
 return pcard({f:pTH(),col:"#c9a0e0",name:"Thái hậu",rank:"Thái hậu · Đức Thọ cung",lines:L,groups:[["Việc hôm nay",acts.length?acts:[`<p class="kr3note">Hôm nay Hành sự không có việc nào về Thái hậu. Thỉnh an Thái hậu: sang Đức Thọ cung (Dư đồ) buổi sáng.</p>`]]],empty:""})}
function empCard(){const E=S.emp;const acts=deckFor(/Hoàng thượng|ngự giá|ngự thư phòng|Dưỡng Tâm|thị tẩm/i);
 const likes=Object.keys(LIKES).map(k=>`<div class="pcrow"><span>${LIKEN[k]}</span><b>${E.known[k]?E.likes[k]:"chưa rõ"}</b></div>`);
 return pcard({f:pEmp(),col:"#f0d070",name:empName(),rank:"Hoàng thượng",lines:[tuoi(E.age),`Tâm trạng: <b>${MOODS[E.mood][0]}</b>`,`Ngài sủng ngươi <b>${S.sung}</b> · Ân tình <b>${S.an||0}</b>`],
  note:E.traits.map(t=>`<b>${ETRAITS[t][0]}</b>: ${ETRAITS[t][1]}`).join("<br>"),
  groups:[["Việc hôm nay",acts.length?acts:[`<p class="kr3note">Hôm nay Hành sự không có việc nào về Hoàng thượng (việc đổi theo buổi và theo quẻ). Gặp ngài: Dư đồ → nơi ngài ngự buổi này; tối: chờ lật thẻ.</p>`]],["Điều ngài thích",likes.concat([`<p class="kr3note">Nói thật lòng với ngài, hoặc hỏi Kính sự phòng, để biết ngài thích gì.</p>`])]],empty:""})}
window.courtTabHTML=function(){const L=[{f:pEmp(),name:"Hoàng thượng",mk:empCard}];if(!S.thDead)L.push({f:pTH(),name:"Thái hậu",mk:thCard});
 return `<div class="pgwrap">`+pager("court",L.map(x=>({f:x.f,name:x.name})),i=>L[i].mk())+`</div>`};

/* ---------- 5. men: unique names, only the ones she has met ---------- */
/* (MALEN "Lục Trường", "Tiêu Viễn" carry a surname: "Lục Lục Trường" is renamed too) */
const MALEN2=["Cảnh Hoài","Tĩnh An","Dật Thanh","Mặc Trần","Quân Hạo","Thanh Diễn","Hựu Ninh","Tấn Lương","Cẩn Du","Hoằng Nghị","Thiệu Khang","Diệp Tùng"];
function menUnique(){try{if(!S||!S.men)return;const used=new Set();const pool=MALEN.concat(MALEN2);
 for(const m of S.men){const w=m.name.split(" ");const giv=w.slice(-2).join(" "),last=w[w.length-1];
  if(!used.has(last)&&w[w.length-3]!==w[w.length-2]){used.add(last);continue}
  const nw=pool.find(g=>!used.has(g.split(" ").pop())&&g.split(" ")[0]!==w[w.length-3]&&!S.men.some(x=>x!==m&&x.name.endsWith(" "+g)));if(!nw){continue}
  m.name=w.slice(0,-2).concat([nw]).join(" ");used.add(nw.split(" ").pop())}}catch(e){}}
window.menUnique=menUnique;
if(typeof menInit==="function"){const m0=menInit;menInit=function(){const r=m0.apply(this,arguments);menUnique();return r}}
function menMet(m){try{if(S.known&&typeof k61St==="function")return k61St(m)>=1;if(S.menMet&&S.menMet[m.id])return true;if(m.af||m.tinh||m.letters||m.trysts)return true;if(typeof k61St==="function"&&k61St(m)>=1)return true;if(m.seen)return true}catch(e){}return false}
window.menTabHTML=function(){try{menInit()}catch(e){}menUnique();const M=(S.men||[]).filter(m=>m.alive&&menMet(m));
 if(!M.length)return `<div class="pgwrap"><p class="past kr3empty">Ngươi chưa gặp nam nhân nào ngoài Hoàng thượng. Nam nhân (thị vệ, thái y, vương gia, nhạc sư…) chỉ hiện ở đây sau khi ngươi gặp mặt họ ở nơi họ hay lui tới (Dư đồ).</p></div>`;
 return `<div class="pgwrap">`+pager("men",M.map(m=>({f:pMan(m),name:m.name.split(" ").slice(-2).join(" ")})),i=>manCard(M[i]))+`</div>`};
/* the men leave the Phi tần strip (j22 appended them) */
/* (j22 no longer appends them: source edit) */
/* a man's card with no act says why (j22 manCard "empty" text, source edit) */
/* panel rendering of the two new keys (j6 renderPanel0 dispatches by key; these keys are new) */
if(typeof renderPanel0==="function"){const p0=renderPanel0;renderPanel0=function(){if(tab!=="court"&&tab!=="men")return p0.apply(this,arguments);
  const el=$("panel");faceInit();const gm=document.querySelector(".game");if(gm)gm.classList.add("cardtab");const h=tab==="court"?courtTabHTML():menTabHTML();
  const same=el.dataset.tab===tab,keep=same?el.scrollTop:0;el.innerHTML=h;el.dataset.tab=tab;el.dataset.pg=String(PG[tab]);el.scrollTop=keep;kitFix(el)}}
/* servant road keeps its own tab set */
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{const srv=typeof isSrv==="function"&&isSrv();document.querySelectorAll('#tabs [data-tab="court"],#tabs [data-tab="men"]').forEach(b=>{if(srv)b.style.display="none"})}catch(e){}return r}})();

/* ---------- 4. Người chạy việc ---------- */
if(typeof bestSent==="function"){const b0=bestSent;bestSent=function(p){try{if(p===S&&S.runner!=null){const s=(S.staff||[]).find(x=>x.sid===S.runner&&!x.spyFor);if(s)return s;S.runner=null}}catch(e){}return b0.apply(this,arguments)}}
PEND.runner=()=>({t:"<p>Ai làm người chạy việc? Khi ngươi sai người dò la, đưa thư, mua đồ…, người này đi. Lòng cao thì ít khi khai ra ngươi.</p>",
 o:(S.staff||[]).filter(s=>!s.spyFor).map(s=>({n:`${s.name} (${s.role==="maid"?"cung nữ":"thái giám"})`,fx:{},x:`Lòng ${s.loyal}${s.tr==="lanh"?" · lanh lợi":""}${bestSent(S)===s?" · đang chạy việc":""}`,go:()=>{S.runner=s.sid;log(`Từ nay ${s.name} lo chạy việc cho ngươi.`)}})).concat(S.runner!=null?[{n:"Để game tự chọn",fx:{},x:"chọn theo Lòng và tài",go:()=>{S.runner=null}}]:[],[{n:"Thôi",fx:{}}])});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-runner]");if(!b)return;e.preventDefault();e.stopPropagation();if(!S||Q.length)return;pushDil(mkP("runner"),"Người chạy việc");render()},true);
window.runnerLine=function(){const s=bestSent(S);return `<span class="krun">${gl("Người chạy việc","Người chạy việc:")} <b>${s?s.name:"chưa có ai"}</b>${(S.staff||[]).filter(x=>!x.spyFor).length>1?` <button class="chip kchipb" data-runner="1">Đổi ›</button>`:""}</span>`};

/* ---------- portrait swap (owner 05:45Z "khung nhảy"): same box, the old portrait fades out over the new one (180 ms; none with reduced motion
   / Cảnh động off). The box itself never moves: constant headroom trim (jk3 KIT_PORT_TRIM), the strip already loaded the same frame pictures ---------- */
if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){const P=$("panel");let snap=null,t0=P&&P.dataset.tab;const top0=P?P.scrollTop:0;
  try{const rm=(typeof reducedMotion==="function"&&reducedMotion())||(typeof kitCurlOff==="function"&&kitCurlOff());const o=!rm&&P&&P.querySelector(".pc>.pcl>.pcp.kit .kin");if(o)snap=o.cloneNode(true)}catch(e){}
  const r=r0.apply(this,arguments);
  /* same tab (another person): keep the panel where it was — j6 restored scrollTop before the sticky sub-tab bar came back, which
     shifted the card by the bar's height for one frame */
  try{if(P&&P.dataset.tab===t0&&Math.abs(P.scrollTop-top0)>0.5)P.scrollTop=top0}catch(e){}
  try{if(snap&&P.dataset.tab===t0){const n=P.querySelector(".pc>.pcl>.pcp.kit");const nk=n&&n.querySelector(".kin");if(nk&&nk.innerHTML!==snap.innerHTML){
    snap.removeAttribute("id");snap.classList.add("kpxf");nk.after(snap);snap.animate([{opacity:1},{opacity:0}],{duration:180,easing:"ease-out",fill:"forwards"}).onfinish=()=>snap.remove();setTimeout(()=>snap.remove(),400)}}}catch(e){}
  return r}}

/* ---------- CSS ---------- */
const st=document.createElement("style");st.id="kit-hc";st.textContent=`
/* KIT §36.1 PEOPLE-CHIP LIST (owner 04:25Z): one grid, equal columns that line up across rows, same portrait size, name left beside it, long names wrap in their cell */
.kpplist,.relsel.kpplist,.kbk-toc{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(min(100%,11.5em),1fr))!important;gap:4px 8px!important;align-items:stretch!important;flex-wrap:nowrap!important}
.kpplist>.kppl-h{grid-column:1/-1}
.kpplist>button,.kbk-toc>.kbk-tc{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:6px!important;min-width:0!important;text-align:left!important;white-space:normal!important}
.kpplist>button>span:last-child,.kbk-toc>.kbk-tc>:last-child{min-width:0;overflow-wrap:anywhere;line-height:1.2}
.kpplist>button span.md,.kbk-toc>.kbk-tc span.md{flex:0 0 auto}
/* KIT §36.2 THẺ QUAN HỆ 3 CỘT: portrait (person-card size) | bars | Đã biết bullets; narrow = three blocks stacked in one card */
#panel{container-type:inline-size}
.krel3{display:grid;grid-template-columns:minmax(120px,170px) minmax(0,1fr) minmax(0,1.15fr);gap:10px 14px;align-items:start;padding:10px;margin:0 0 8px;border:1px solid var(--line);border-radius:10px;background:var(--k-card,#fffaf0)}
.kr3p{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0}
.kr3f{width:100%}.kr3f .pcp.kit{width:100%!important;max-width:none!important;margin:0!important;float:none!important}
.kr3nm{display:flex;flex-direction:column;align-items:center;text-align:center;line-height:1.2;max-width:100%}
.kr3nm small{font-size:.74rem;font-weight:600;color:color-mix(in srgb,var(--rc) 75%,#2a1a12)}
.kr3nm b{font-size:.95rem;color:color-mix(in srgb,var(--rc) 45%,#2a1a12);overflow-wrap:anywhere}
.kr3m{display:flex;flex-direction:column;gap:6px;min-width:0;font-size:.82rem}
.kr3b{display:flex;flex-direction:column;gap:1px;min-width:0}
.kr3k{color:var(--dim);font-size:.76rem;font-weight:600}
.kr3v{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.krel3.kr3two{grid-template-columns:minmax(120px,170px) minmax(0,1fr)}
.ksbar{position:relative;display:inline-block;width:92px;height:8px;flex:0 0 auto;border-radius:4px;background:var(--k-card2,#efe4cc);box-shadow:inset 0 0 0 1px #b89a6a55;overflow:hidden;vertical-align:middle}
.ksbar>.ksb-mid{position:absolute;left:calc(50% - 1px);top:-1px;bottom:-1px;width:2px;background:#7a5530;opacity:.7;z-index:1}
.ksbar>u{position:absolute;top:1px;bottom:1px;border-radius:3px}.ksbar>u.g{background:var(--good,#3d8a5a)}.ksbar>u.r{background:var(--bad,#b0402c)}.kr3v .fbar{width:70px;flex:0 0 auto}
.kr3note{margin:0;font-size:.74rem;color:var(--dim)}
.kr3act{margin-top:4px;min-width:0;max-width:100%}
html body #panel .krel3 .kr3act button.ka,html body #panel .krel3 .kr3act .card,html body #panel .krel3 .kr3act .kcard{width:100%!important;min-width:0!important;max-width:100%!important;box-sizing:border-box!important;flex:1 1 auto!important}
.kr3r{min-width:0;font-size:.82rem}
.kr3h{display:block;font-size:.76rem;color:var(--dim);margin:0 0 3px;letter-spacing:.02em}
.kr3l{margin:0;padding:0 0 0 1.05em;display:flex;flex-direction:column;gap:4px}
.kr3l li{line-height:1.35}.kr3l li small{display:block;font-size:.7rem;color:var(--dim);opacity:.85}
.kr3none{margin:0;font-size:.76rem;color:var(--dim)}
.kr3more{margin-top:4px}
@container (max-width:560px){.krel3,.krel3.kr3two{grid-template-columns:1fr;justify-items:stretch}.kr3p{max-width:180px;margin:0 auto}.kr3m,.kr3r{border-top:1px dashed var(--line);padding-top:6px}}
.krun{display:inline-flex;align-items:center;gap:4px;flex-wrap:wrap}
.kr3empty{margin:12px 4px}
.pcp.kit>.kin.kpxf{z-index:6;pointer-events:none}
/* KIT §36.4 one portrait box: constant headroom trim, in CSS (first frame = settled frame). Cell: .kin = 130.44 % of the .pcp height,
   .pcp height = 1037/718 of its width (measured 338/234) → trim = KIT_PORT_TRIM .015 × 1.3044 × 1.4444 = 2.83 % of the column width */
.pc.kpwide[data-k2]>.pcl>.pcp.kit{margin-top:calc(4px - 2.83%)!important}
/* the name block above the box always takes two lines (a long name wraps inside it), so the box starts at the same height for everyone */
.pc.kpwide[data-k2]>.pcl>.pcname{min-height:2.4em;display:flex!important;align-items:flex-end}
/* narrow card (phones): the box sits at the top of its cell, never centred against the info beside it (which differs per person) */
.pc[data-k2]:not(.kpwide) .pcl>.pcp.kit,.pc[data-k2]:not(.kpwide) .pcl>.kwear{align-self:start!important}
`;document.head.appendChild(st);
})();
