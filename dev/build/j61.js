
/* ================= NGƯỜI LẠ: SHE KNOWS NOBODY AT FIRST (j61, appended last; wraps, edits nothing) =================
   S.known {key:stage} with three reveal stages: 1 Thấy mặt (face, figure and role by dress), 2 Biết tên (name),
   3 Quen biết (traits, bars, relations). S.known lists people she has met or had identified. A new life knows only herself, her own servants, her family
   (same house, her father's clan head) and whom her origin plausibly knows. Everyone else is a stranger: grey
   silhouette (kitKnown(p) -> false), a descriptor of what is visibly true instead of the name ("Một phi tần áo bậc Tần",
   "Một thái giám", "Một nam nhân áo vàng"), no traits, bars or numbers, and only meeting acts (greet, ask a servant,
   scout, go see, visit) until identified. Ways to know someone: greeting / talking face to face, them speaking to her,
   the first night (the Emperor), the morning audience (thỉnh an), festival banquets (names announced), a servant's true
   report, scouting. Logged once: "Ngươi đã biết: đó là …".
   Two-way: NPCs do not know newcomers either (her at the start, girls of a new tuyển tú). npcKnows(a,b) gates targeted NPC
   acts; they learn fast (each week, at audiences and festivals, when they act socially or meet her).
   Stages: greeting face to face -> 1; asking the name, a servant's true report, scouting, an introduction (audience,
   festival, someone addressing her) -> 2; further talk, spying or the first night (the Emperor) -> 3. The card shows
   the stage. Hooks: kitKnown(p) = face revealed (>=1), kitKnownName(p) = name known (>=2); unknown names show "???".
   Old saves: everyone present on load is fully known (3). */
let K61NEW=false,K61VER=0;const KREG={},K61SRC={};
function k61S(){if(!S)return null;if(!S.known){if(K61NEW)return null;S.known={};S.nkn={};k61All().forEach(e=>{S.known[kOf61(e)]=3});S.kRids=rivals.map(v=>v.id);K61VER++}return S.known}
function kOf61(e){if(!e||!S)return"";if(e===S)return"me";if(e===S.emp)return"emp";if(S.thO&&e===S.thO)return"th";let k;
 if((rivals||[]).includes(e))k="r"+e.id;else if(e.sid!=null)k="s"+e.sid;else{if(!e.kk)e.kk="x"+(S.kseq=(S.kseq||0)+1);k=e.kk}KREG[k]=e;return k}
function k61Ent(k){if(!k||!S)return null;if(k==="me")return S;if(k==="emp")return S.emp;if(k==="th")return S.thO||null;return KREG[k]||null}
function k61All(){const L=[];if(!S)return L;const add=e=>{if(e&&typeof e==="object"&&!L.includes(e))L.push(e)};
 add(S.emp);if(!S.thDead){S.thO=S.thO||{};add(S.thO)}add(S.maid);(S.staff||[]).forEach(add);(S.kids||[]).forEach(add);
 (rivals||[]).forEach(v=>{add(v);add(v.maid);(v.staff||[]).forEach(add);(v.kids||[]).forEach(add)});
 for(const c in (S.court||{}))add(S.court[c]);(S.men||[]).forEach(add);try{const T=S.trieu;if(T&&T.H)for(const c in T.H)add(T.H[c])}catch(e){}return L}
/* her own household (maid, servants hired later, her own children born later) lives with her: always fully known (review/face-reveal:
   new servants were "Thái giám ???" in her own guard-order and spy dialogs) */
/* kc-roads fix: her own family while she still lives at home (S.kc.fam, !S.kc.inPal) are her own people — known, mood and nature seen (all nine home roads) */
function k61Kin(e){try{return !!(e&&S&&S.kc&&!S.kc.inPal&&(S.kc.fam||[]).includes(e))}catch(x){return false}}
function k61Own(e){try{return e===S.maid||(S.staff||[]).includes(e)||(S.kids||[]).includes(e)||k61Kin(e)}catch(x){return false}}
function k61St(e){if(!e||!S||e===S)return 3;const K=k61S();if(!K)return 3;if(k61Own(e))return 3;return +K[kOf61(e)]||0}
/* owner 11/15 (stranger rule, KIT §49.3): a consort Ta has NOT MET is a grey silhouette everywhere (portraits, strips, news rows, figures,
   the week book) — her name may be known, her face is not. Met = she talked / acted with her (S.met), or lives in the same palace
   (the "Đã quen" level alone is not enough: owner case "listed in Ân oán, Ta chưa gặp"). Everyone else keeps the face level (>= 1). */
function met61(e){try{return !!(S&&S.met&&S.met[e.id]!=null)||/* a meeting in week 0 stores 0 (review ts-a r6) *//* a cung nữ has met the consort she serves (review/small-bugs-2) */!!(S&&S.srv&&e&&S.srv.mid===e.id)||(typeof sameHouse==="function"&&sameHouse(S,e))}catch(x){return false}}
/* ONE source of truth for "met" (review/small-bugs-2, LUẬT SỬA CẢ NHÓM): the chí tôn Hoàng thượng and Thái hậu are MET from the first
   day of palace life on every road (consort, cung nữ, lãnh cung): their face shows on the stage, in dialogs, news rows and the Tuần lục alike.
   The reigning Hoàng hậu is a consort: met61 (S.met / same palace). kitChiTonMet(k) answers the same for the stage chips (kitCourtKnown). */
function k61ChiTon(e){return !!(S&&e&&(e===S.emp||(S.thO&&e===S.thO)))}
function kitChiTonMet(k){try{if(!S)return true;if(k==="emp")return true;if(k==="th")return !S.thDead;if(k==="hh"){const q=typeof queenP==="function"?queenP():null;return !q||q===S||isKnown61(q)}}catch(e){}return true}
window.kitChiTonMet=kitChiTonMet;window.kitCourtKnown=kitChiTonMet;
function isKnown61(e){if(k61ChiTon(e))return true;if(k61St(e)<1)return false;if(S&&e&&e!==S&&(rivals||[]).includes(e))return met61(e);return true}
/* public figures (kit review): Hoàng thượng, Thái hậu and the reigning Hoàng hậu are known by name and title (stage 2) from the first
   day; their face (grey silhouette until then) shows after the first meeting / thỉnh an */
function k61Pub(e){if(!e||!S)return false;if(e===S.emp)return true;if(S.thO&&e===S.thO)return true;if(k61IsKid(e))return true;return !!((rivals||[]).includes(e)&&e.queen&&!e.out&&e.alive!==false)}
/* the Emperor's children are announced at birth: every name is public; the FACE only after she has met the child (owner 11/15, jht) */
function k61IsKid(e){return !!(e&&typeof e==="object"&&(e.sex==="m"||e.sex==="f")&&"fond" in e&&allKids().some(([k])=>k===e))}
function k61SeedChiTon(){try{if(!S||!S.known)return;if(S.emp){const k=kOf61(S.emp);if((+S.known[k]||0)<2)S.known[k]=2}if(!S.thDead){S.thO=S.thO||{};const k=kOf61(S.thO);if((+S.known[k]||0)<2)S.known[k]=2}}catch(e){}}
function k61Named(e){return k61St(e)>=2||k61Pub(e)}
/* co-op friend (owner OD:L165: "Người lạ" until met, reborn = unknown again; OD:L1061 header chip): while she has not met the friend, ONE label everywhere —
   the owner's wording (OD:L1060 "hảo hữu của ta", = the header chip + panel title in jcooptimer): "Hảo hữu của ta" (no rank, no "???"); met -> her real name (k61Named) */
const K61FR="Hảo hữu của ta";
function k61Coop(e){try{return !!(e&&e.coop&&!k61Named(e))}catch(x){return false}}
/* the friend can sit in rivals OR in a consort's staff (guest maid): look in the whole world, not only rivals */
function k61CoopEnt(){try{return k61All().find(e=>e&&e.coop)||null}catch(x){return null}}
window.k61Coop=k61Coop;window.k61CoopEnt=k61CoopEnt;window.K61FR=K61FR;
function kitKnown(p){try{const e=k61PortEnt(p);return e?isKnown61(e):true}catch(e){return true}}
function kitKnownName(p){try{const e=k61PortEnt(p);return e?k61Named(e):true}catch(e){return true}}
/* the ONE helper for a list of people printed in a line: names she knows (fmt(v), default the name) + "thêm N vị chưa quen biết" for the rest -
   never "Quý phi ???, Tần ???" (owner 16/11 'Phi ???'; reign-road fix). Used by Triều cục, sổ thị tẩm, thiên điện, ứng viên, quà, tư tình... */
function kitNameList(L,fmt,none){const f=fmt||(v=>v.name),K=[],U=[];for(const v of L||[])(kitKnownName(v)?K:U).push(v);const A=K.map(f);if(U.length)A.push(`${K.length?"thêm ":""}${U.length} vị chưa quen biết`);return A.join(", ")||none||""}
const K61STN=["Người lạ","Thấy mặt","Biết tên","Quen biết"];
function k61PortEnt(p){if(!p)return null;if(p.kk)return k61Ent(p.kk);if(p.src&&K61SRC[p.src])return k61Ent(K61SRC[p.src]);if(p.__kp&&typeof p.__kp==="object")return p.__kp===S?null:p.__kp;
 if(S&&(p===S.emp||p===S.thO||(rivals||[]).includes(p)))return p;return null}
/* what she can see: the dress tells rank and role, nothing more */
function k61Kind(e){if(!S||!e)return"";if((rivals||[]).includes(e))return"consort";if(e===S.emp)return"emp";if(S.thO&&e===S.thO)return"th";
 for(const c in (S.court||{}))if(S.court[c]===e)return c==="ty"?"phys":c==="tq"?"tq":"eun";
 if((S.men||[]).includes(e))return"man";if(e.isMin)return"off";if(allKids().some(([k])=>k===e))return"kid";
 if(e.role==="maid"||(rivals||[]).some(v=>v.maid===e)||e===S.maid)return(e.age||18)>=36||e.old?"mama":"maid";if(e.role==="eunuch"||e.role==="eun")return"eun";return"other"}
function k61Desc(e){const k=k61Kind(e);
 if(k==="consort"){if(e.out)return"một phế phi";if(e.queen)return"Hoàng hậu";return`một phi tần áo bậc ${RANKS[e.rank].n}`}
 if(k==="emp")return"một nam nhân áo vàng";if(k==="th")return"một quý phụ mặc phượng bào";if(k==="tq")return"một thái giám áo bậc Tổng quản";
 if(k==="eun")return"một thái giám";if(k==="phys")return"một vị thái y";if(k==="maid")return"một cung nữ";if(k==="mama")return"một ma ma";if(k==="off")return"một vị quan";
 if(k==="kid")return e.sex==="m"?"một hoàng tử":"một công chúa";
 if(k==="man"){const r=e.role;return r==="Thị vệ"?"một thị vệ":r==="Thái y"?"một vị thái y":r==="Vương gia"?"một vị vương gia":r==="Sứ thần"?"một sứ thần ngoại bang":"một nam nhân áo gấm"}
 return"một người lạ"}
function k61Short(e){const k=k61Kind(e);if(k==="consort")return e.out?"Phế phi":e.queen?"Hoàng hậu":RANKS[e.rank].n;if(k==="emp")return"Áo vàng";if(k==="th")return"Phượng bào";
 const d=k61Desc(e).replace(/^một (vị )?/,"");return d[0].toUpperCase()+d.slice(1)}
const k61Cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
function k61Title(e){const k=k61Kind(e);if(k==="consort")return typeof kitTitled==="function"?kitTitled(rkName(e),e.name):`${rkName(e)} ${e.name}`;if(k==="emp")return"Hoàng thượng";if(k==="th")return"Thái hậu";
 const T=(t,x)=>typeof kitTitled==="function"?kitTitled(t,x):`${t} ${x}`;/* KIT 9 kitTitled: no "Tổng quản thái giám Tổng quản …" */
 if(k==="tq")return T("Tổng quản thái giám",e.name);if(k==="phys")return T("thái y",e.name);if(k==="eun")return T("thái giám",e.name);if(k==="maid")return T("cung nữ",e.name);if(k==="mama")return T("ma ma",e.name);
 if(k==="off")return T((typeof TDOFF!=="undefined"&&TDOFF[e.c])||"quan",e.name);return e.name||"người ấy"}
/* becoming known (logged once); the other side learns her too when they meet */
/* the "how" of a meeting is appended to the log line as its own sentence: a bare fragment ("Thỉnh an", "gặp") must never dangle at the end of "Dạo này" (stat-fx-2) */
function k61How(h){h=String(h||"").trim();if(!h)return"";h=h.charAt(0).toLocaleUpperCase("vi")+h.slice(1);return /[.!?…"”)]$/.test(h)?h:h+"."}
function k61Know(list,how,quiet,st){st=st||2;how=k61How(how);if(!S||!k61S())return[];const L=(Array.isArray(list)?list:[list]).filter(e=>e&&e!==S&&k61St(e)<st);if(!L.length)return[];
 const nm=L.filter(e=>!k61Named(e)&&st>=2);const pubSeen=L.filter(e=>k61Pub(e)&&!isKnown61(e));const desc=L.filter(e=>!isKnown61(e)&&st===1).map(k61Desc);
 L.forEach(e=>{S.known[kOf61(e)]=st<2&&k61Pub(e)?2:st});K61VER++;
 if(!quiet){if(nm.length)log(`<span class="g">Ngươi đã biết: đó là ${nm.map(k61Title).join(", ")}.</span>${how?" "+how:""}`);else if(pubSeen.length&&st<3)log(`Ngươi đã được thấy mặt ${pubSeen.map(k61Title).join(", ")}.${how?" "+how:""}`);else if(desc.length)log(`Ngươi đã thấy mặt ${desc.join(", ")}; chưa biết tên.${how?" "+how:""}`);else if(st===3)log(`<span class="g">Ngươi đã quen biết ${L.map(k61Title).join(", ")}.</span>${how?" "+how:""}`)}return L}
function k61Meet(e,how,st){k61Know(e,how,false,st);if((rivals||[]).includes(e)){npcLearn(e,S);/* face to face = met (KIT §49.3 met61): a consort she meets is no longer a grey silhouette (review ts-a r6) */try{if(S&&e.id!=null){S.met=S.met||{};if(S.met[e.id]==null)S.met[e.id]=wk()}}catch(x){}}}
/* ---- NPCs and newcomers (light): S.nkn[target] = {npcKey:1}; a missing entry means everyone knows the target ---- */
function npcKnows(a,b){if(!S||!S.nkn||!a||!b||a===b)return true;const T=S.nkn[b===S?"me":"r"+b.id];if(!T)return true;return !!T[a===S?"me":"r"+a.id]}
function npcLearn(a,b){if(!S||!S.nkn||!a||!b)return;const kb=b===S?"me":"r"+b.id;const T=S.nkn[kb];if(!T)return;T[a===S?"me":"r"+a.id]=1;
 if(liveRivals(true).every(x=>x===b||T["r"+x.id]))delete S.nkn[kb]}
function npcLearnAll(){if(S)S.nkn={}}
function k61Week(){if(!S||!S.known)return;S.nkn=S.nkn||{};S.kRids=S.kRids||rivals.map(v=>v.id);
 for(const v of rivals)if(!S.kRids.includes(v.id)){S.kRids.push(v.id);if(v.alive&&!v.out)S.nkn["r"+v.id]={}}
 for(const kb in S.nkn){const b=kb==="me"?S:RV(+kb.slice(1));if(!b||(b!==S&&(!b.alive||b.out))){delete S.nkn[kb];continue}for(const a of liveRivals(true))if(a!==b&&!S.nkn[kb]["r"+a.id]&&roll(35))npcLearn(a,b)}}
/* ---- a new life: who she knows from the first day ---- */
function k61InitNew(){if(!S)return;S.known={me:3};k61SeedChiTon();S.nkn={me:{}};S.kRids=rivals.map(v=>v.id);const K=e=>{if(e)S.known[kOf61(e)]=3},o=S.origin&&S.origin.k;
 K(S.maid);(S.staff||[]).forEach(K);(S.kids||[]).forEach(K);
 rivals.forEach(v=>{try{if(sameHouse(S,v)){K(v);npcLearn(v,S)}}catch(e){}});
 try{const T=S.trieu;if(T&&T.H)for(const c in T.H)if(T.H[c].dadOf==="me")K(T.H[c])}catch(e){}
 if(o==="ch"){S.thO=S.thO||{};K(S.thO)}
 if(o==="cn"){K(S.emp);for(const c in (S.court||{}))if(c!=="ty")K(S.court[c]);rivals.forEach(v=>{K(v.maid);(v.staff||[]).forEach(K)})}
 if(o==="cnv"&&S.srv){const m=RV(S.srv.mid);if(m){K(m);npcLearn(m,S);K(m.maid);(m.staff||[]).forEach(K)}(S.srv.met||[]).forEach(id=>K(servById(id)))}
 rivals.forEach(v=>{if(v.oldmis){K(v);npcLearn(v,S)}});
 if(S.ally){const v=liveRivals(false).filter(x=>!sameHouse(S,x)).sort((a,b)=>aff(S,b)-aff(S,a))[0];if(v&&aff(S,v)>=25){K(v);npcLearn(v,S)}}
 K61VER++}
(function(){const s0=start;start=function(){K61NEW=true;let r;try{r=s0.apply(this,arguments)}finally{K61NEW=false}try{k61InitNew();if(Q.length)showModal();render()}catch(e){console.error(e)}return r}})();
(function(){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);try{if(K61NEW&&S&&!S.known)k61InitNew();k61SeedChiTon()}catch(e){}return r}})();
/* ---- portraits carry who they are (a key string); strangers render as the grey silhouette ---- */
(function(){const W=(name,get)=>{const f0=window[name];if(typeof f0!=="function")return;window[name]=function(){const r=f0.apply(this,arguments);try{const e=get.apply(this,arguments);if(e&&r){const k=kOf61(e);if(typeof r==="object")r.kk=k;else if(typeof r==="string"&&r)K61SRC[r]=k}}catch(x){}return r}};
 W("pv",v=>v);W("pEmp",()=>S.emp);W("pTH",()=>{S.thO=S.thO||{};return S.thO});W("pMaid",()=>S.maid);W("pDoc",()=>S.court&&S.court.ty);W("pServ",s=>s);W("pServ0",s=>s);
 W("pMan",m=>m);W("pMin",h=>h);W("kidFace",k=>k);W("pEunCourt",k=>S.court&&S.court[k]);W("pMsg",()=>S.court&&S.court.tq);W("courtSrc",(k,c)=>c);W("maidSrc",m=>m);
 W("pFaceOf",p=>{if(!p||p.kind==="chest")return null;if(p.kind==="ksp"&&!p.ref)return S.court&&S.court.ksp;if(p.kind==="peddler"&&!p.ref)return S.court&&S.court.ped;return null})})();
const K61U={};["f","m","k","fig-f","fig-m","fig-k"].forEach(g=>{try{const im=new Image();im.onload=()=>{K61U[g]=1;kitRenderSoon(250)};im.src=`img/kit/unknown-${g}.webp`}catch(e){}});
function k61G(e){const k=k61Kind(e);return k==="kid"?"k":["emp","man","eun","tq","phys","off"].includes(k)?"m":"f"}
function k61Sil(p){const e=k61PortEnt(p);if(!e||isKnown61(e))return p;const g=k61G(e);
 return Object.assign({},p,{src:K61U[g]?`img/kit/unknown-${g}.webp`:"",ini:"?",col:"#8a8a8a",rw:p.rw?(k61Named(e)?k61Lab(e):k61Short(e)):p.rw,stranger:1})}
/* the same grey silhouette for a person Ta has not met (knows(v) false), whatever her face level: Ân oán strips + panel (KIT §49.3) */
function kitStrangerOf(v){const p=pv(v);const g=k61G(v);return Object.assign({},p,{src:K61U[g]?`img/kit/unknown-${g}.webp`:"",ini:"?",col:"#8a8a8a",stranger:1})}
window.kitStrangerOf=kitStrangerOf;
(function(){const c0=pcPort;pcPort=function(f,col,status){const g=k61Sil(f||{});return c0.call(this,g,g.stranger?g.col:col,status)}})();
(function(){const m0=mdH;mdH=function(p,cls){return m0.call(this,k61Sil(p||{}),cls)}})();
(function(){const p0=pframe;pframe=function(f,col){const g=k61Sil(f||{});return k61Pass(g,()=>p0.call(this,g,g.stranger?g.col:col))}})();
/* full-body figures on place screens: none for strangers (the silhouette token stays) */
(function(){if(typeof figFor!=="function")return;const f0=figFor;figFor=function(p,kind){try{if(kind!=="por"&&p&&S){const f=p===S?null:p.kind?pFaceOf(p):null;const e=p===S?null:f?k61PortEnt(f):(typeof p==="object"&&!p.ref?p:null);if(e&&!isKnown61(e)){const g="fig-"+k61G(e);return K61U[g]?`img/kit/unknown-${g}.webp`:""}}}catch(e){}return f0.apply(this,arguments)}})();
/* ---- the person card: a stranger shows only what is visible, and meeting acts ---- */
const K61WHY="Chưa biết người này là ai";
function k61Dis(b){if(!b||!/^<button/.test(b)||/data-(see|scout|visit|k61|pct|pg)=/.test(b))return b;if(/data-o=/.test(b))return b;
 let h=b.replace(/^<button([^>]*?)( disabled)?>/,"<button$1 disabled>");
 if(/<span class="kwhy">/.test(h))h=h.replace(/<span class="kwhy">[\s\S]*?<\/span>/,`<span class="kwhy">${K61WHY}</span>`);else if(/<small>/.test(h))h=h.replace("<small>",`<small><span class="kwhy">${K61WHY}</span> `);else h=h.replace(/<\/button>$/,`<small><span class="kwhy">${K61WHY}</span></small></button>`);return h}
function k61AskBtn(e){const k=kOf61(e);const o=od(BAL.odb.j61.odO+(S.mat||0)*8+((S.maid&&S.maid.loyal)||40)/5);
 return pbtn(`data-k61="ask" data-kk="${k}"`,"Hỏi người hầu: đó là ai?",`${word(o)} · tốn: 1 khắc · thành: biết người này là ai (lời thật) · hỏng: người hầu cũng không biết`,whyTime(1))}
/* owner 11/15 08:00Z: no "3/3" — a plain level word, tap = what raises it and what it opens (KIT_GLOSS "Quen biết", jhc) */
const K61STW=["Người lạ","Mới thấy mặt","Biết tên","Đã quen"];
function k61StChip(st){const w=K61STW[st]||K61STN[st];return chip(typeof kitGloss==="function"?kitGloss("Quen biết",w):w,st>=3?"ok":"")}
(function(){const c0=pcard;pcard=function(o){try{const e=o&&k61PortEnt(o.f);if(e&&k61IsKid(e)){const a=arguments;return k61Pass(o.f,()=>c0.apply(this,a))}/* children: jht draws what the palace knows */const st=e?k61St(e):3;if(e&&!k61Named(e)){const pop=!!o.close;
  const G=(o.groups||[]).filter(g=>g&&g[1]).map(([hd,B])=>[hd,B.filter(b=>b&&/^<button/.test(String(b))).map(b=>pop?b:k61Dis(String(b)))]).filter(g=>g[1].length);
  if(!pop)G.unshift(["Làm quen",[k61AskBtn(e)]]);
  const chips=[k61StChip(st)].concat((o.chips||[]).filter(c=>c&&/class="chip loc/.test(c)));
  const how=st===0?"Chào hỏi khi gặp mặt, hỏi người hầu, hoặc sai tai mắt dò la thì mới biết.":"Đã thấy mặt, chưa biết tên: hỏi danh tính khi gặp, hỏi người hầu hoặc dò la.";
  return c0.call(this,Object.assign({},o,{name:k61Coop(e)?K61FR:"???",rank:k61Cap(k61Desc(e)),ghen:null,lines:[`<span class="past">${K61WHY}. ${how}</span>`],chips,groups:G,note:o.note&&pop?o.note:"",empty:o.empty}))}
 if(e&&st<=2&&e!==S)return k61Pass(o.f,()=>c0.call(this,Object.assign({},o,{ghen:null,lines:[`<span class="past">Mới biết tên: tính nết, sủng ái, quan hệ chưa rõ. Trò chuyện thêm hoặc dò la để quen biết.</span>`],chips:[k61StChip(2)].concat((o.chips||[]).filter(c=>c&&/class="chip loc/.test(c)))})));
 if(e&&e!==S&&S&&S.known&&e!==S.maid&&!(S.staff||[]).includes(e)&&!(S.kids||[]).includes(e))return c0.call(this,Object.assign({},o,{chips:[k61StChip(3)].concat(o.chips||[])}))}catch(x){console.error(x)}return c0.apply(this,arguments)}})();
/* face strips: the label is the descriptor */
(function(){const p0=pager;pager=function(key,items,mk){try{items=items.map(t=>{const e=t&&k61PortEnt(t.f);return e&&!k61Named(e)?Object.assign({},t,{name:k61Coop(e)?K61FR:isKnown61(e)?"???":"Người lạ"}):t})}catch(x){}return p0.call(this,key,items,mk)}})();
/* place screen tags */
function k61VisEnt(p){if(!p||p.kind==="chest")return null;try{return k61PortEnt(pFaceOf(p))}catch(e){return null}}
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const ppl=curPeople();document.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];const e=k61VisEnt(p);if(e&&!k61Named(e)){const t=b.querySelector(".tag");if(t)t.textContent=k61Coop(e)?K61FR:isKnown61(e)?"???":"Người lạ"}else if(e&&k61NoFace(e)){const t=b.querySelector(".tag");if(t&&t.textContent==="Người lạ"&&p.name)t.textContent=p.name}})}catch(e){}return r}})();
/* talking face to face: a stranger first; greeting (1 khắc, sure) reveals both ways and leaves the talk open */
let K61RAW=false;(function(){const d0=directActs;directActs=function(){K61RAW=true;try{return d0.apply(this,arguments)}finally{K61RAW=false}}})();
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(K61RAW)return A;try{const e=k61VisEnt(p);const st=e?k61St(e):3;if(e&&st<2){const k=k61Kind(e);const big=k==="emp"||k==="th";const riv=(rivals||[]).includes(e);
  const g=st===0?{n:big?"Hành lễ":"Chào hỏi",o:100,k61:"greet",kke:kOf61(e),x:`thấy mặt, rõ thân phận${riv?" · nàng cũng biết mặt ngươi":""} · chưa biết tên`}
   :{n:big?"Kính cẩn hỏi danh tính":"Hỏi danh tính",o:100,k61:"name",kke:kOf61(e),x:`biết tên người này${riv?" · nàng cũng biết ngươi":""}`};
  return [g].concat(A.map(a=>Object.assign({},a,{lock:true,t:K61WHY})))}}catch(x){}return A}})();
(function(){const t0=talk;talk=function(oi){try{if(S&&popIdx!=null&&!S.dead&&!Q.length){const p=curPeople()[popIdx];const a=p&&talkOpts(p)[oi];
  if(a&&(a.k61==="greet"||a.k61==="name")){const e=k61Ent(a.kke);if(e&&can(1)){spend(1);const k=k61Kind(e);
   if(a.k61==="greet"){/* jgreet: ONE greeting name rule (rank + nết), the line says why */const G=greetName(S,e);popMsg=G.line;log(G.line)}
   else{k61Meet(e,k==="emp"?"Nam nhân áo vàng chính là Hoàng thượng; ngươi vội quỳ xuống.":"Người ấy xưng danh.",2);popMsg=`<span class="g">Ngươi đã biết: đó là ${k61Title(e)}.</span>`}render()}return}
  const e=p&&k61VisEnt(p);const st0=e?k61St(e):3;const r=t0.apply(this,arguments);if(e&&st0===2&&S.visit&&(S.visit.tk||{})[popIdx])k61Know(e,"Trò chuyện thêm, ngươi hiểu người ấy hơn.",false,3);return r}}catch(x){console.error(x)}return t0.apply(this,arguments)}})();
/* asking a servant (true answers only) */
function k61Ask(k){const e=k61Ent(k);if(!e||!S||S.dead||Q.length||k61Named(e)||!can(1))return;spend(1);const o=od(BAL.odb.j61.odO+(S.mat||0)*8+((S.maid&&S.maid.loyal)||40)/5);
 if(roll(o))k61Know(e,`${S.maid.name} thưa: "Đó là ${k61Title(e)}."`);else log(`${S.maid.name} cũng không biết ${k61Desc(e)} ấy là ai.`);render()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-k61]");if(!b||b.disabled)return;e.preventDefault();e.stopPropagation();if(b.dataset.k61==="ask")k61Ask(b.dataset.kk)},true);
/* acts on a stranger need knowing her first */
(function(){const b0=rvButtons;rvButtons=function(v,i){try{if(v&&!k61Named(v))return `<p class="past">${K61WHY}.</p>`}catch(e){}return b0.apply(this,arguments)}})();
(function(){const d0=doAct;doAct=function(i,k){const v=rivals[i];if(v&&!k61Named(v))return;const st=v?k61St(v):3;const r=d0.apply(this,arguments);try{if(v&&st===2&&k==="spy"&&!/bị phát hiện|bị bắt|hỏng/i.test(String(S.logs[0]||"")))k61Know(v,"Tai mắt dò la được tính nết, sủng ái của nàng.",false,3)}catch(e){}return r}})();
(function(){const s0=seeBtn;seeBtn=function(v){const h=s0.apply(this,arguments);try{if(h&&v&&!k61Named(v))return h.replace(`Đến gặp ${v.name.split(" ").pop()}`,"Đến gặp nàng")}catch(e){}return h}})();
(function(){if(typeof inviteBtn!=="function")return;const i0=inviteBtn;inviteBtn=function(v){const h=i0.apply(this,arguments);try{if(h&&v&&!k61Named(v))return k61Dis(h)}catch(e){}return h}})();
/* relation and faction tabs: strangers left out (no numbers), counted at the end */
function k61Hide(fn,st){const L0=liveRivals;liveRivals=function(q){return L0(q).filter(v=>k61St(v)>=st)};try{return fn()}finally{liveRivals=L0}}
function k61Unknown(st){return (rivals||[]).filter(v=>v.alive&&!v.out&&k61St(v)<(st||2))}
(function(){const r0=relHTML;relHTML=function(){if(!S||!S.known)return r0.apply(this,arguments);const h=k61Hide(()=>r0.apply(this,arguments),3);const n=k61Unknown(3).length;
 return h+(n?`<p class="past">Còn ${n} phi tần ngươi chưa quen biết: chưa xem được quan hệ. Gặp mặt trò chuyện, hỏi người hầu hoặc dò la để biết.</p>`:"")}})();
(function(){if(typeof facHTML!=="function")return;const f0=facHTML;facHTML=function(){if(!S||!S.known)return f0.apply(this,arguments);return k61Hide(()=>f0.apply(this,arguments),2)}})();
/* ---- ways she gets to know people ---- */
/* someone speaking to her in an event (a dialog she must answer) */
/* FACE REVEAL (owner 15/11 ~21:00Z, whole class): EVERY event dialog that SHOWS a person to her — comes to talk, picks a quarrel,
   frames / harms her, summons her, a merit task, a toilette reaction, a j67 arc step, a j68 event, a gift handed over in person: any
   Q item that carries the person (who / who2 / stage / faces / kit.subject) — reveals that person's FACE (stage >= 1; a consort also
   counts as met, met61) the moment the dialog opens, so the dialog itself already draws the real face and full-body figure, and so
   does every other screen afterwards (stage, news, Tuần lục, Ân oán). The NAME (stage >= 2) comes with it when the person speaks to
   her (a dialog with options and the person as `who`) or the text names her / him. Hoàng thượng / Thái hậu / Hoàng hậu / the
   Emperor's children are named from day one (k61Pub); the dialog now gives their face too (was: grey in summons, Thái hậu triệu,
   lake-trip / festival invitations). People only MENTIONED (a name in a news list, a tuyển tú roll, a rumour) stay strangers. */
function k61ShownEnts(m){const L=[];if(!m||!S)return L;const add=x=>{if(!x||typeof x!=="object")return;let e=null;
  try{e=k61PortEnt(x)||(x.__kp&&typeof x.__kp==="object"?x.__kp:null)||(k61All().includes(x)?x:null)}catch(er){}if(e&&e!==S&&!L.includes(e))L.push(e)};
 (Array.isArray(m.stage)?m.stage:[]).forEach(add);add(m.who);add(m.who2);add(m.kit&&m.kit.subject);(Array.isArray(m.kit&&m.kit.stage)?m.kit.stage:[]).forEach(add);
 (Array.isArray(m.faces)?m.faces:[]).forEach(f=>add(f&&f[0]));return L}
function k61NameIn(e,txt){return k61Vars(e).some(v=>txt.includes(v))}
/* panels she opens herself to look something up (Chứng cứ về X, Đã biết về X, Tâm trạng · X) only SHOW what she already has:
   never a meeting (review face-reveal r1: opening the intel / evidence panel of an unmet consort made her met) */
function k61Look(m){return !!(m&&m.kit&&m.kit.look)}
function k61Shown(m){try{if(!m||!S||m.__k61||!k61S()||k61Look(m))return;const E=k61ShownEnts(m);m.__k61=1;if(!E.length)return;
  const txt=String((m.t||"")+" "+(m.h||"")).replace(/<[^>]+>/g," ");let w=null;try{w=m.who?k61PortEnt(m.who)||m.who.__kp||m.who:null}catch(x){}
  for(const e of E){const talk=!!(m.opts&&m.opts.length)&&e===w;const st=talk||k61NameIn(e,txt)?2:1;
   const how=k61Pub(e)?"":talk?"Người ấy đến tận nơi nói chuyện với ngươi.":"Người ấy hiện ra trước mặt ngươi.";
   if(k61St(e)<st||((rivals||[]).includes(e)&&!met61(e)))k61Meet(e,how,st)}}catch(x){console.error("k61Shown",x)}}
/* WHEN: only the dialog that is really drawn. j68 evGate (assembled before j61, so it runs INSIDE this wrapper) holds / drops optional
   events from Q right before drawing; revealing Q[0] before it ran met people whose dialog never opened (review face-reveal r1). So the
   reveal runs right after evGate; without j68 (or for an item left unrevealed) it runs here, before / after drawing. */
(function(){if(typeof evGate==="function"){const g0=evGate;/* D13 jspread (review spread-events-r3): evGate(1) = a dry sift inside a buổi change, nothing is drawn → no meeting */
 evGate=function(dry){const r=g0.apply(this,arguments);if(!dry)try{k61Shown(Q[0])}catch(e){}return r}}
 const s0=showModal;showModal=function(){try{if(typeof evGate!=="function")k61Shown(Q[0])}catch(e){}const r=s0.apply(this,arguments);
  try{const M=document.getElementById("modal");if(M&&!M.hidden&&Q[0]&&!Q[0].__k61)k61Shown(Q[0])}catch(e){}return r}})();
/* old saves (cheap backfill, once): a consort the old rule named in a dialog ("… đến tận nơi nói chuyện với ngươi") was never marked met,
   so she stayed a grey silhouette; her logged line marks her met now */
function k61Backfill(){try{if(!S||!S.known||S.k61bf)return;S.k61bf=1;const T=(S.logs||[]).map(x=>String(x).replace(/<[^>]+>/g," ")).filter(x=>/đến tận nơi nói chuyện với ngươi|tự đến gặp ngươi|tự tìm đến ngươi/.test(x));
  if(!T.length)return;S.met=S.met||{};for(const v of rivals||[])if(v.id!=null&&S.met[v.id]==null&&k61Named(v)&&T.some(x=>k61Vars(v).some(n=>x.includes(n))))S.met[v.id]=wk()}catch(e){}}
(function(){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);try{if(!K61NEW)k61Backfill()}catch(e){}return r}})();
/* morning audience */
(function(){const a0=act;act=function(i){const a=deck[i];const was=a&&a.done;const r=a0.apply(this,arguments);try{if(a&&a.done&&!was&&S&&S.known){
  if(/^Thỉnh an Thái hậu/.test(a.n)&&!S.thDead){S.thO=S.thO||{};k61Know(S.thO,"Buổi thỉnh an, ngươi được dẫn đến trước mặt Thái hậu.")}
  if(/^Thỉnh an Hoàng hậu/.test(a.n)&&qOn()){const q=rivals[0];const others=k61Unknown().filter(v=>v!==q).sort(()=>Math.random()-.5).slice(0,2);
   k61Know([q].concat(others),"Buổi thỉnh an ở Càn Ninh cung, từng người được xướng tên.");[q].concat(others).forEach(v=>greetName(S,v,{ann:1}))/* jgreet: herald = the rule's announce step */}}}catch(e){}return r}})();
/* festival banquets: every name is announced */
(function(){const f0=festival;festival=function(title){const r=f0.apply(this,arguments);try{if(r&&S&&S.known){S.thO=S.thO||{};k61Know(liveRivals(true).concat(S.thDead?[]:[S.thO]),`${title}: tên từng người được xướng lên trước yến.`);npcLearnAll()}}catch(e){}return r}})();
/* the first night: she sees the Emperor's face */
(function(){const n0=nightFx;nightFx=function(){const r=n0.apply(this,arguments);try{if(S&&S.known&&k61St(S.emp)<3)k61Know(S.emp,"Đêm ấy, lần đầu ngươi được nhìn rõ long nhan.",false,3)}catch(e){}return r}})();
/* scouting identifies */
(function(){if(typeof scout!=="function")return;const s0=scout;scout=function(id){const v=rivals.find(x=>x.id===id);const r=s0.apply(this,arguments);try{if(v&&locKnown(v)&&!k61Named(v)){k61Know(v,"Tai mắt chỉ mặt, nói tên cho ngươi.");render()}}catch(e){}return r}})();
/* NPCs acting on her face to face: she meets them; NPCs cannot target someone they do not know yet */
const K61FACE=["help","visit","warn","provoke","humiliate","test","ally","feign","apologise","drop"];
(function(){if(typeof SOC!=="object")return;for(const k in SOC){const s=SOC[k];const ok0=s.ok,run0=s.run;
  s.ok=function(v,t){if(t&&v&&!npcKnows(v,t))return false;return ok0.apply(this,arguments)};
  s.run=function(v,t){const r=run0.apply(this,arguments);try{if(t===S&&K61FACE.includes(k)&&S.known&&v)greetName(v,S)/* jgreet: ONE greeting rule */}catch(e){}return r}}})();
(function(){const r0=runAct;runAct=function(a,t,k){try{if(a&&t&&a!==S&&(rivals||[]).includes(a)&&!npcKnows(a,t)){if(roll(50))npcLearn(a,t);return""}
  if(a===S&&t&&(rivals||[]).includes(t))npcLearn(t,S);if(t===S&&a&&a!==S&&["ally","gift"].includes(k)&&S.known)greetName(a,S)/* jgreet: ONE greeting rule */}catch(e){}return r0.apply(this,arguments)}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{k61Week()}catch(e){}return r}})();
/* ---- names of strangers never reach the screen: every text node is rewritten to the descriptor ---- */
const K61T="(?:(Hoàng hậu|Hoàng quý phi|Quý phi|Phế phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng) )?";let K61RX=null,K61RN=-1,K61RV=-1,K61RT=0,K61MAP={};
function k61Vars(e){const n=e&&e.name;if(!n||typeof n!=="string")return[];const w=n.split(" ").filter(Boolean);const V=[n];if(w.length>=3){V.push(w.slice(-2).join(" "));V.push(w[0]+" "+w[w.length-1])}return V.filter(x=>x.length>=4&&x.split(" ").length>=2)}
function k61Table(){if(!S||!S.known)return null;const now=Date.now();const rn=(rivals||[]).length;if(K61RX!==null&&K61RV===K61VER&&K61RN===rn&&now-K61RT<1500)return K61RX;K61RV=K61VER;K61RT=now;K61RN=rn;/* name-mask: a new consort (tuyển tú, a maid promoted) is in the table the same tick */
 const M={},prot=new Set();const ents=k61All();ents.push(S);
 for(const e of ents){const kn=k61Named(e);for(const v of k61Vars(e)){if(kn){prot.add(v);M[v]=null}else if(!(v in M))M[v]=kOf61(e)}}
 for(const v of prot)M[v]=null;const keys=Object.keys(M).filter(v=>M[v]||prot.has(v));if(!keys.some(v=>M[v])){K61RX=false;return false}
 keys.sort((a,b)=>b.length-a.length);K61MAP=M;const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 K61RX=kRx(`(?<![\\p{L}\\p{M}])${K61T}(${keys.map(esc).join("|")})(?![\\p{L}\\p{M}])`,"gu");return K61RX}
/* the mask for a name she does not know: "<title> ???" (title = what the dress shows), never a descriptor sentence */
function k61MaskT(e){const k=k61Kind(e);if(k==="consort")return e.out?"Phế phi":e.queen?"Hoàng hậu":RANKS[cl(e.rank||0,0,7)].n;if(k==="emp")return"Hoàng thượng";if(k==="th")return"Thái hậu";
 if(k==="tq")return"Tổng quản thái giám";if(k==="eun")return"thái giám";if(k==="phys")return"thái y";if(k==="maid")return"cung nữ";if(k==="mama")return"ma ma";
 if(k==="off")return(typeof TDOFF!=="undefined"&&TDOFF[e.c])||"quan";if(k==="kid")return e.sex==="m"?"Hoàng tử":"Công chúa";
 if(k==="man"){const r=e.role;return r&&!/^(Công tử|Nam nhân)$/i.test(r)?r:"công tử"}return"người"}
function k61Mask(e,before,plain){if(k61Coop(e))return K61FR;const t=k61MaskT(e);if(plain)return `một vị ${t} chưa quen biết`;/* plain = prose/log wording (no literal ???; name-mask) */const b=String(before||"").replace(/\s+$/,"").toLowerCase();return b.endsWith(t.toLowerCase())?"???":`${t} ???`}
/* public announcements (thẻ bài lật, sớ hặc tội at court, thánh chỉ, tấn phong / giáng / phế, births): everyone named in them
   becomes known by name and title (stage 2) the moment it is announced */
const K61ANN=/thẻ bài của|sớ hặc tội|thánh chỉ|sắc phong|tấn phong|được phong|phong (?:Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng) |lập .{1,60}? làm (Hoàng hậu|Thái tử|Hoàng quý phi)|bị giáng|giáng xuống|bị phế|xướng tên|hạ sinh|băng hà/i;
function k61Announce(text){try{if(!S||!S.known||!text)return false;const t=String(text).replace(/<[^>]+>/g," ");if(!K61ANN.test(t))return false;const L=[];
 for(const e of k61All()){if(k61Named(e))continue;if(k61Vars(e).some(v=>t.includes(v)))L.push(e)}if(L.length){k61Know(L,"",true,2);K61RX=null}return L.length>0}catch(e){return false}}
/* name-mask (LUẬT SỬA CẢ NHÓM): EVERY log line (= Nhật ký, result sentences, toasts) passes the one kit mask once: a person she has not met by name
   never prints as a raw name ("Hà Thục Lan sang cung ngươi thăm hỏi" -> "Một vị Tần chưa quen biết sang cung ngươi thăm hỏi"); announcements first */
(function(){const l0=log;log=function(h){try{k61Announce(h);if(typeof h==="string"&&S&&S.known)h=k61Scrub(h,true,"",h,true)}catch(e){}return l0.call(this,h)}})();
/* plain prose (log lines): the 1st stranger of a line is "một vị <title> chưa quen biết"; the SAME person again is "nàng ta" / "y";
   another stranger in the same line is "một <title> lạ mặt" (owner 17/11 03:18Z: "Một vị Quý phi chưa quen biết báo thị vệ: Một vị Thị vệ chưa
   quen biết…" read like a machine). k61MaskP = the one wording table. */
function k61Pron(e){const k=k61Kind(e);return ["consort","maid","mama","th"].includes(k)?"nàng ta":k==="kid"?"đứa trẻ ấy":"y"}
function k61MaskP(e,seen){if(k61Coop(e))return K61FR;if(seen.has(e))return k61Pron(e);const first=!seen.size;seen.add(e);if(first)return k61Mask(e,"",true);
 const k=k61Kind(e),t=k61MaskT(e);return ["consort","emp","th","kid"].includes(k)?`một vị ${t} khác`:`một ${String(t).toLowerCase()} lạ mặt`}
function k61Scrub(s,lead,prev,ann,plain){const rx=k61Table();if(!rx||!s)return s;rx.lastIndex=0;if(!rx.test(s))return s;rx.lastIndex=0;const seen=new Set();
 return s.replace(rx,(m,ti,nm,off,str)=>{const k=K61MAP[nm];if(!k)return m;const e=k61Ent(k);if(!e||k61Named(e))return m;
  if(ann&&k61Announce(ann))return m;
  const before=(ti?"":(prev||""))+str.slice(0,off);let d=plain?k61MaskP(e,seen):k61Mask(e,before,plain);
  /* idempotent (review/coop-main-faults): a mask that holds the name itself (a friend named "Hảo hữu" → "Hảo hữu của ta") is already
     in place when the text around the name reads the mask; masking it again grew the line forever and hung the page (the two DOM observers, this one
     and j84's, kept answering each other) */
  {const dl=String(d||"").toLowerCase(),j=dl.indexOf(m.toLowerCase());if(j>=0&&off>=j&&str.slice(off-j,off-j+dl.length).toLowerCase()===dl)return m}
  const capit=/^(\s|<[^>]+>)*$/.test(str.slice(0,off))?lead:/[.!?:(“"]\s*$/.test(str.slice(0,off));return capit?k61Cap(d):d})}
function k61PrevText(n){let x=n;for(let i=0;i<6&&x;i++){let p=x.previousSibling;while(p){const t=p.textContent;if(t&&t.trim())return t;p=p.previousSibling}x=x.parentNode;if(!x||/^(DIV|P|LI|BUTTON|H\d|FIGCAPTION|SECTION|TD)$/.test(x.nodeName))return""}return""}
/* the title-screen pages (Chọn sổ, Sổ luân hồi, Thiết lập: .kpt-mount) and every .kslot card show OTHER lives (a saved sổ, a co-op room, the cloud copy): their names are real, never masked by the knowledge of the life now loaded (owner 17/11 "Kiếp Đáp ứng Hạ Thị vệ ???": a slot's own name matched a palace person the loaded life does not know yet) */
const K61SKIP="[data-k61skip],.kpt-mount,.kslot,.mspot .mlab,.mtile>b";/* Dư đồ place names (map spots + tiles): a place called like an unknown servant ("Vĩnh Thọ") must never read "Thái giám ???" (map-portrait-r2) */
function k61Node(n){if(n.nodeType===3){const t=n.nodeValue;if(!t||t.length<4)return;const p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(p.nodeName))return;if(p.closest&&p.closest(K61SKIP))return;/* co-op chat Thư từ (KIT §76): real players' names are shown as they are */
  const pv=k61PrevText(n);const lead=!pv.trim()||/[.!?:]\s*$/.test(pv);const blk=p.closest&&p.closest(".kft,.kitem,.logs > div,p,li,.rt,.spkt,.krv,.tag,figcaption");
  const s=k61Scrub(t,lead,pv,blk?blk.textContent:t);if(s!==t)n.nodeValue=s;return}
 if(n.nodeType!==1||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(n.nodeName)||(n.closest&&n.closest(K61SKIP)))return;
 for(const a of ["title","aria-label"]){const v=n.getAttribute&&n.getAttribute(a);if(v){const s=k61Scrub(v,true);if(s!==v)n.setAttribute(a,s)}}
 const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let c;const L=[];while((c=w.nextNode()))L.push(c);for(const x of L){if(x.nodeType===3)k61Node(x);else for(const a of ["title","aria-label"]){const v=x.getAttribute(a);if(v){const s=k61Scrub(v,true);if(s!==v)x.setAttribute(a,s)}}}}
(function(){try{if(typeof MutationObserver!=="function")return;const ob=new MutationObserver(ms=>{if(!S||!S.known||!k61Table())return;for(const m of ms){if(m.type==="characterData")k61Node(m.target);else if(m.type==="attributes")k61Node(m.target);else m.addedNodes.forEach(k61Node)}});
 const go=()=>ob.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["title","aria-label"]});if(document.body)go();else addEventListener("DOMContentLoaded",go)}catch(e){}})();
/* the map's anonymous "hữu duyên" silhouettes: the kit's grey full-body figures (f/m/k by who is truly there), in the
   same .msil chip; until the kit art is present the old drawn silhouette stays */
function k61SexAt(k){const W=S.where||{},L=[];for(const v of rivals)if(v.alive&&!v.out&&W[v.id]===k)L.push("f");if(W.emp===k&&["vuon","thu","dtd"].includes(k))L.push("m");
 if(k==="tn"&&!S.thDead)L.push("f");if(k==="home"){L.push("f");S.kids.filter(x=>x.alive).forEach(()=>L.push("k"))}if(k==="tyv"||k==="ksp")L.push("m");
 if(k==="lc")for(let i=0;i<Math.min(3,typeof lcPeople==="function"?lcPeople("").length:rivals.filter(v=>v.alive&&v.out).length);i++)L.push("f");
 for(const id in (S.menW||{}))if(S.menW[id]===k&&manById(id))L.push("m");return L}
function k61SilChip(k,n){return"";const L=k61SexAt(k);while(L.length<n)L.push("f");const im=g=>K61U["fig-"+g]?`<svg viewBox="0 0 10 14" aria-hidden="true"><image href="img/kit/unknown-fig-${g}.webp" width="10" height="14" preserveAspectRatio="xMidYMax meet"/></svg>`:SILH;
 return `<span class="msil" aria-label="${n} bóng người">${L.slice(0,Math.min(n,3)).map(im).join("")}${n>1?`<b>${n}</b>`:""}</span>`}
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);try{if(S&&typeof SILH==="string"&&(K61U["fig-f"]||K61U["fig-m"]||K61U["fig-k"]))
 h=h.replace(/(<(?:button|div) class="mspot[^"]*" data-(?:go|ak)="([^"]+)"[^>]*>(?:(?!class="mspot)[\s\S])*?)<span class="msil" aria-label="(\d+) bóng người">[\s\S]*?<\/span>/g,(all,open,k,n)=>open+k61SilChip(k,+n))}catch(e){}return h}})();

/* kit names for strangers: j79's kitName/kitPersonLine draw "<title> ???" (rank colour kept: the dress shows the rank) */
setTimeout(()=>{try{if(typeof kitName!=="function")return;const n0=kitName;kitName=function(p,o){try{if(p&&p!==S&&S&&S.known){const e=k61PortEnt(p)||p;
  if(e&&k61All().includes(e)&&!k61Named(e)){if(k61Coop(e))return `<b class="kname" style="--rc:${typeof kitPersonCol==="function"?kitPersonCol(e):"#8a7350"}">${K61FR}</b>`;const t=o&&o.noTitle?"":k61MaskT(e);return `<b class="kname" style="--rc:${typeof kitPersonCol==="function"?kitPersonCol(e):"#8a7350"}">${t?`<span class="kti" style="--rt:${kitRtOf(t)}">${k61Cap(t)}</span> `:""}???</b>`}}}catch(x){}return n0.apply(this,arguments)}}catch(e){}},0);
/* ---- kit review (FAIL 11/14): a NAME she knows is never hidden. Stage 2 "Biết tên" and the public figures (Hoàng thượng, Thái hậu,
   Hoàng hậu) whose face she has not seen yet: grey silhouette in the grey stone frame (j60), but the name stays (card name, strip,
   stage tag, kitName, podium) and the frame label is the title (tước) instead of "Người lạ". Only stage 0 reads "Người lạ" (j60) or
   "<tước> ???" (kitName above). j60 is not edited: its "Người lạ" checks (pcard, pframe) are passed once for these people. ---- */
function k61NoFace(e){try{return !!e&&!!S&&e!==S&&!!S.known&&k61Named(e)&&!isKnown61(e)}catch(x){return false}}
function k61Lab(e){const k=k61Kind(e);return k==="tq"?"Tổng quản":k61Cap(k61MaskT(e))}
let K61PASS=null;
function k61Pass(f,fn){const kp=f&&f.__kp;const e=f&&(k61PortEnt(f)||kp);if(!kp||!k61NoFace(e))return fn();K61PASS=kp;try{return fn()}finally{K61PASS=null}}
(function(){const i0=kitIsKnown;kitIsKnown=function(p){if(K61PASS&&p===K61PASS){K61PASS=null;return true}return i0.apply(this,arguments)}})();
(function(){const d0=kitDecor;kitDecor=function(f){const d=d0.apply(this,arguments);try{if(d&&!d.known&&f){const e=k61PortEnt(f)||f.__kp;if(k61NoFace(e))d.label=k61Lab(e)}}catch(x){}return d}})();
/* podium (j90): a stranger by name stands as a silhouette but is called by name */
setTimeout(()=>{try{if(typeof kpodName!=="function")return;const k0=kpodName;kpodName=function(p){try{if(p&&p!==S&&k61NoFace(k61PortEnt(p)||p))return kitName(p)}catch(x){}return k0.apply(this,arguments)}}catch(e){}},0);
