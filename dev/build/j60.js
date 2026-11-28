
/* ================= j60 PORTRAIT KIT (owner 11/14, dev/kit/KIT.md): every portrait = role/rank FRAME (rectangular 3:4, img/kit/frame-*.webp)
   + BROCADE ground (img/kit/bg-*.webp) + rank gem / servant token / origin emblem badge; small round avatars (mdH) get the
   simplified version (brocade ground + rank-colour ring + metal rim). Unknown people (kitKnown(p)===false) show the grey
   silhouette (img/kit/unknown-f|m|k.webp) in the stone frame and the label "Người lạ".
   API: personRoleRank(p) -> {role,rank,origin,sex,kid} · kitDecor(faceOrPerson) · kitFace(p) · kitPortrait(p,{size}) ·
        kitKnown(p) (hook, default true, overridable: assign window.kitKnown) · KIT_RANK_COL[rank|'cold'] (live view of RCOL).
   Wraps pcPort, mdH, pcard, renderStage and the face constructors; no other module is edited. ================= */
const KIT_DIR="img/kit/";
/* ONE rank palette: the global RCOL (j1) for ranks 0..7, plus lãnh cung grey; read live, never copied */
const KIT_COLD_COL=RCOL_COLD;
const KIT_RANK_COL=new Proxy({},{get:(t,k)=>k==="cold"||k==="8"?KIT_COLD_COL:(typeof RCOL!=="undefined"?RCOL[k]:undefined),has:(t,k)=>k==="cold"||(+k>=0&&+k<8)});
function kitRankCol(r){return r==="cold"?KIT_COLD_COL:RCOL[Math.max(0,Math.min(7,+r||0))]}
/* roles with their frame / ground / rim metal */
const KIT_ROLES={player:{n:"Ngươi",sex:"f",metal:null},consort:{n:"Phi tần",sex:"f",metal:null},cold:{n:"Lãnh cung",sex:"f",metal:"#9aa2a8"},
 emp:{n:"Hoàng thượng",sex:"m",metal:"#e8c04a"},thaihau:{n:"Thái hậu",sex:"f",metal:"#d9b25f"},heir:{n:"Thái tử",sex:"m",metal:"#e8c04a"},prince:{n:"Hoàng tử",sex:"m",metal:"#c9a24a"},
 princess:{n:"Công chúa",sex:"f",metal:"#e2b49a"},maid:{n:"Cung nữ",sex:"f",metal:"#c9a24a"},mama:{n:"Ma ma",sex:"f",metal:"#a8742f"},eunuch:{n:"Thái giám",sex:"m",metal:"#c9ccd2"},
 official:{n:"Quan",sex:"m",metal:"#a8742f"},physician:{n:"Thái y",sex:"m",metal:"#c9a86a"},man:{n:"Nam nhân",sex:"m",metal:"#c9ccd2"},royal:{n:"Vương gia",sex:"m",metal:"#d9b25f"},
 guard:{n:"Thị vệ",sex:"m",metal:"#9aa2a8"},unknown:{n:"Người lạ",sex:"f",metal:"#b8bcc2"},other:{n:"",sex:"f",metal:"#c9a24a"}};
/* servant rank palettes (owner 11/14): maids thô sử..nữ quan, eunuchs tiểu thái giám..tổng quản; a global MRCOL/ERCOL wins when defined */
window.KIT_MRCOL=window.MRCOL;window.KIT_ERCOL=window.ERCOL;/* aliases of the j1 palette, never copies of values */
function kitServCol(role,r){const M=typeof MRCOL!=="undefined"?MRCOL:window.KIT_MRCOL,E=typeof ERCOL!=="undefined"?ERCOL:window.KIT_ERCOL;const L=role==="eunuch"?E:M;/* a maid RUNG reads its colour tier (BAL.srvRk.tier, maid-ladder-6) */if(role!=="eunuch"&&typeof srkTier==="function")r=srkTier(+r||0);return L[Math.max(0,Math.min(L.length-1,+r||0))]}
const KIT_ORIGINS=["tt","dtq","muoi","cn","nc","td","ch","thd"];
/* the hook another worker implements; keep the name; override by assigning window.kitKnown */
if(typeof window.kitKnown!=="function")window.kitKnown=function(p){return true};
function kitIsKnown(p){try{return p==null||p===S||window.kitKnown(p)!==false}catch(e){return true}}
/* sil-eunuch (owner order main 172, ACT-MOVE-6): ONE rule for the letter of the grey stranger silhouette (img/kit/unknown-fig-<g>, unknown-<g>): k = child, e = eunuch /
   Thái giám / Tổng quản (soft cap, belted robe, no official hat), m = the other men's ROLES (Emperor, official, physician, guard, prince, man), f = women. It reads the ROLE, never the picture name and never a per-place
   guess. Stage description records ({kind:"ksp"|"peddler"|"npc"|"elder"|"serv", ini, info, sid, lid}) carry no .role, so a stranger eunuch used to fall to «other» = f and
   stood as a lady. Every place that picks a stranger silhouette (j59 stage + slot fill, j60 stone frame, j87 week book, j90 dialog figure, jreveal, kitSilFig) calls this. */
function kitSilG(p){try{if(!p||typeof p!=="object")return"f";let r=null;try{if(p.ref&&typeof p.ref==="object")r=personRoleRank(p.ref);if(!r||r.role==="other")r=personRoleRank(p)}catch(e){}
 if(r&&r.role!=="other")return r.kid||r.sex==="k"?"k":r.role==="eunuch"?"e":r.sex==="m"?"m":"f";
 const k=p.kind,ini=p.ini,info=String(p.info||p.rw||""),rk=String(p.rk||"");
 if(/^(ksp|peddler)$/.test(k))return"e";if(/^(emp|ty|man|min|guard|royal)$/.test(k)||p.sk==="man"||p.sk==="emp"||p.sk==="ty")return"m";
 if(ini==="Hoạn"||/^eu\d$/.test(rk))return"e";if(ini==="Y"||ini==="Quan"||ini==="帝"||/^(off|emp)$/.test(rk))return"m";
 if(typeof p.lid==="string"&&/^c:/.test(p.lid))return"e";/* a ledger court person (c:*) is a Thái giám (j95 default name) */
 if(p.sid!=null&&typeof j95sv==="function"){const s=j95sv("s"+p.sid);if(s&&(s.role==="eunuch"||s.role==="eun"))return"e"}
 if(/Thái giám|Tổng quản|Kính sự phòng/i.test(info))return"e";if(/thị vệ|Thái y|Vương gia/i.test(info))return"m";
 const sx=p.sex||(p.ref&&p.ref.sex);if(typeof p.age==="number"&&BAL.m90&&p.age<BAL.m90.kidAge)return"k";return sx==="m"?"m":"f"}catch(e){return"f"}}
window.kitSilG=kitSilG;
/* any person object -> role + rank (+ origin for the player) */
function personRoleRank(p,hint){const out=(role,rank,extra)=>Object.assign({role,rank:rank==null?null:rank,origin:null,sex:(KIT_ROLES[role]||KIT_ROLES.other).sex,kid:false},extra||{});
 try{if(!p)return out(hint||"other");
  if(p.kind&&!p.name&&typeof p.kind==="string"){/* place-people records {kind,ref} */
   if(p.kind==="emp")return personRoleRank(S.emp,"emp");if(p.kind==="th")return out("thaihau");if(p.kind==="maid")return personRoleRank(S.maid,"maid");
   if(p.kind==="ty")return out("physician");if(p.kind==="ksp"||p.kind==="peddler")return out("eunuch",1);if(p.kind==="man"&&p.ref)return personRoleRank(p.ref,"man");
   if(p.ref)return personRoleRank(p.ref,p.kind==="kid"?"prince":hint)}
  if(p===S){if(typeof isSrv==="function"&&isSrv())return out("maid",S.srv&&S.srv.rk!=null?S.srv.rk:1);if(S.out)return out("cold","cold");
   return out("player",cl(S.rank||0,0,7),{origin:S.origin&&KIT_ORIGINS.includes(S.origin.k)?S.origin.k:null})}
  if(S&&p===S.emp)return out("emp");if(S&&(p===S.thO||p.kind==="th"))return out("thaihau");
  if(typeof rivals!=="undefined"&&rivals.includes(p)){if(p.out)return out("cold","cold");return out("consort",p.queen?7:cl(p.rank||0,0,7))}
  if(typeof allKids==="function"&&allKids().some(([k])=>k===p)||(p.sex&&p.hp!=null&&/^(Hoàng tử|Công chúa)/.test(p.name||""))){const kid=(p.age||0)<13;
   return out(p.heir?"heir":p.sex==="m"?"prince":"princess",null,{kid,sex:kid?"k":p.sex==="m"?"m":"f"})}
  if(S&&p===S.maid)return out((p.age||BAL.ageMin)>=BAL.ageBand[1]||p.old?"mama":"maid",p.rk!=null?p.rk:BAL.srvRk.dai);
  if(p.role==="maid")return out((p.age||BAL.ageMin)>=BAL.ageBand[1]||p.old?"mama":"maid",p.rk==null?1:p.rk);
  if(p.role==="eunuch")return out("eunuch",p.rk==null?1:p.rk);
  if(S&&S.court){const k=Object.keys(S.court).find(x=>S.court[x]===p);if(k)return k==="ty"?out("physician"):out("eunuch",k==="tq"?3:2)}
  if(S&&(S.men||[]).includes(p)){const rw=String(p.rw||"");return out(/thái y/i.test(rw)?"physician":/thị vệ/i.test(rw)?"guard":/vương gia/i.test(rw)?"royal":"man")}
  if(typeof CLANS!=="undefined"&&p.c&&CLANS.includes(p.c))return out("official");
  if(p.off||p.house)return out("man");
  if(hint)return out(hint)}catch(e){}
 return out(hint||"other")}
/* fallback for face objects built without a known person: read the rank ground class and label */
function kitRoleOfFace(f){const rk=String(f.rk||""),rw=String(f.rw||"");let m;
 if((m=rk.match(/(?:^|\s)c(\d)/))&&!/^kid/.test(rk))return f.w&&f.w[0]==="me"?{role:"player",rank:+m[1],origin:S&&S.origin?S.origin.k:null}:{role:"consort",rank:+m[1]};
 if(rk==="cold")return{role:"cold",rank:"cold"};if(rk==="emp")return{role:"emp"};if(rk==="th")return{role:"thaihau"};
 if((m=rk.match(/^sv(\d)/)))return{role:"maid",rank:+m[1]};if((m=rk.match(/^eu(\d)/)))return{role:"eunuch",rank:+m[1]};
 if(/^kid/.test(rk))return{role:/Công chúa/.test(rw)?"princess":"prince"};
 if(rk==="off")return{role:/Thái y/i.test(rw)?"physician":/thị vệ/i.test(rw)?"guard":/vương gia/i.test(rw)?"royal":/Công tử|nhạc|họa|sứ/i.test(rw)?"man":"official"};
 if(f.ini==="Hoạn")return{role:"eunuch",rank:1};if(f.ini==="Quan")return{role:"official"};if(f.ini==="Y")return{role:"physician"};return{role:"other"}}
/* KIT §4.3a: she is not yet a palace woman (home road, isKc) — her portrait shows no consort rank sign (gem, crest); the frame stays the plain
   consort-0 frame until a painted home frame exists (ART REQUEST K-FRAME-HOME). kitNoCrest(f): true when f (face object or person) is HER before the palace. */
function kitPrePal(){try{return typeof isKc==="function"&&!!isKc()}catch(e){return false}}
function kitNoCrest(f){try{if(!f||!kitPrePal())return false;if(typeof S!=="undefined"&&(f===S||f.__kp===S))return true;const rk=String(f.rk||"");return !!(f.w&&f.w[0]==="me"&&/(?:^|\s)c\d/.test(rk))}catch(e){return false}}
/* her frame at home by home kind (kc2D: "" tiểu thư · dan thôn nữ · nc foreign princess at her own court, bd/pf too): a kit frame family name or null
   (= plain frame-consort-0). MAIN 156: the princess uses the existing frame-princess; K-FRAME-HOME (KK41, MAIN 157 GO 26/11): Foreman C's frame-home (red lacquer, tiểu thư)
   and frame-dan (plain wood, thôn nữ) are wired. KIT_HOME_BG: the card background of that family where one is painted (bg-princess); none for home / dan → the plain consort-0 background. */
const KIT_HOME_FRAME={"":"home",dan:"dan",nc:"princess"},KIT_HOME_BG={princess:"princess"};
function kitHomeFrame(){try{if(!kitPrePal())return null;const d=typeof kc2D==="function"?kc2D():"";return KIT_HOME_FRAME[d]||null}catch(e){return null}}
window.KIT_HOME_FRAME=KIT_HOME_FRAME;window.kitHomeFrame=kitHomeFrame;window.kitPrePal=kitPrePal;window.kitNoCrest=kitNoCrest;
/* face object (or person) -> everything the renderer needs */
function kitDecor(f){f=f||{};let r=f.__kr||(f.__kp?personRoleRank(f.__kp):null);if(!r){const x=kitRoleOfFace(f);r=Object.assign({origin:null,sex:(KIT_ROLES[x.role]||KIT_ROLES.other).sex,kid:false},x)}
 const known=f.__kp?kitIsKnown(f.__kp):true;const role=known?r.role:"unknown";let frame,bg,badge=null,emb=null,col,tint=null;
 const rank=r.rank;
 if(role==="player"||role==="consort"){frame=`frame-consort-${rank}`;/* her frame = the consort frame of her rank (owner 11/14); the stage marks her */bg=`bg-consort-${rank}`;badge=`gem-${rank}`;col=kitRankCol(rank);if(role==="player"&&r.origin)emb=`origin-${r.origin}`;/* KIT §4.3a (pre-palace, OB-NGOAICUNG): before the palace (isKc: Tiểu thư / Thôn nữ / Công chúa at home) she holds no consort rank → no rank gem, no rank crest (kitNoCrest); her frame by home kind (KIT_HOME_FRAME) */if(role==="player"&&kitPrePal()){badge=null;const hf=kitHomeFrame();if(hf){frame=`frame-${hf}`;if(KIT_HOME_BG[hf])bg=`bg-${KIT_HOME_BG[hf]}`}}}
 else if(role==="eunuch"){const r=cl(rank||0,0,3);frame=`frame-eunuch-${r}`;bg=r>=3?"bg-eunuch-3":"bg-eunuch";badge=`tok-e${r}`;col=tint=kitServCol("eunuch",r)}
 else if(role==="maid"||role==="mama"){/* rank = the maid RUNG; art / frame / badge by its tier (BAL.srvRk.tier, maid-ladder-6) */const r=cl(typeof srkTier==="function"?srkTier(rank||0):rank||0,0,4);frame=`frame-${role}-${r}`;bg=`bg-${role}`;badge=`tok-m${r}`;col=tint=kitServCol("maid",rank||0)}
 else if(role==="cold"){frame="frame-cold";bg="bg-cold";col=KIT_COLD_COL}
 else if(role==="unknown"){frame="frame-unknown";bg="bg-unknown";badge="tok-unknown";col="#9aa0a6"}
 else if(role==="other"){frame="frame-man";bg="bg-default";col=f.col||"#c9a24a"}
 else{frame=`frame-${role}`;bg=`bg-${role}`;col=f.col||"#c9a24a"}
 const metal=(KIT_ROLES[role]||{}).metal||(rank>=4?"#d9b25f":rank>=2?"#c9ccd2":"#b08a5a");
 const sex=r.kid?"k":r.sex==="m"?"m":"f";
 return{role,realRole:r.role,rank,origin:r.origin,known,frame:KIT_DIR+frame+".webp",bg:KIT_DIR+bg+".webp",badge:badge&&KIT_DIR+badge+".webp",emb:emb&&KIT_DIR+emb+".webp",col,metal,
  tint,embName:r.origin&&typeof ORIGINS!=="undefined"?((originByKey(r.origin)||{}).n||""):"",unknownSrc:KIT_DIR+`unknown-${sex}.webp`,label:known?"":"Người lạ"}}
/* attach the person to every face object the constructors build */
(function(){const W=(name,who,hint)=>{const f0=window[name];if(typeof f0!=="function")return;window[name]=function(){const r=f0.apply(this,arguments);try{if(r&&typeof r==="object"){const p=who.apply(this,arguments);if(p&&!r.__kp)r.__kp=p;if(!r.__kr)r.__kr=personRoleRank(p,hint)}}catch(e){}return r}};
 W("pv",v=>v);W("pMe",()=>S);W("pEmp",()=>S.emp,"emp");W("pTH",()=>S.thO||{kind:"th"},"thaihau");W("pMaid",()=>S.maid,"maid");W("pDoc",()=>(S.court&&S.court.ty)||null,"physician");
 W("pServ0",s=>s);W("pServ",s=>s);W("kidFace0",k=>k,"prince");W("kidFace",k=>k,"prince");W("pEunCourt",k=>S.court&&S.court[k],"eunuch");W("pMan",m=>m,"man");W("pMin",h=>h,"official");
 W("h54Face",s=>s,"man");W("pMsg",()=>(S.court&&S.court.tq)||null,"eunuch")})();
/* person -> face object through the same constructors */
function kitFace(p){try{if(typeof kitFigWho==="function")p=kitFigWho(p);/* K-SRV-OWNFIG (KK63): servant-shaped Emperor / Thái y → the real person */if(!p)return{src:"",ini:"?"};if(p===S)return pMe();if(p.kind==="ty"&&!p.ref&&p.id==="ty"&&typeof pDoc==="function")return pDoc();if(p===S.emp)return pEmp();if(p===S.thO)return pTH();if(p===S.maid)return pMaid();
 if(p.kind&&typeof pFaceOf==="function"&&!p.name)return pFaceOf(p);if(rivals.includes(p))return pv(p);if(allKids().some(([k])=>k===p))return kidFace(p);
 if(p.role==="maid"||p.role==="eunuch")return pServ(p);if(S.court){const k=Object.keys(S.court).find(x=>S.court[x]===p);if(k)return k==="ty"?pDoc():pEunCourt(k)}
 if((S.men||[]).includes(p))return pMan(p);if(typeof pMin==="function"&&typeof CLANS!=="undefined"&&p.c&&CLANS.includes(p.c))return pMin(p);if(typeof h54Face==="function"&&(p.off||p.house))return h54Face(p)}catch(e){}
 const f={src:"",ini:String(p.name||"?").split(" ").pop()[0]||"?",col:KIT_ROLE.slate};f.__kp=p;f.__kr=personRoleRank(p);return f}
/* ONE helper: size "lg" = the tall 3:4 frame (pframe), "big"/"sm"/"xs"/"" = round avatar */
function kitPortrait(p,o){o=o||{};const f=kitFace(p);return o.size==="lg"||o.size==="frame"?pframe(f):mdH(f,o.size||"")}
/* the tall frame: one picture per frame (550x1037: every frame has the SAME portrait opening 384x506 at (83,214); crests, side dragons and the pendant + tassel stay inside the shared canvas); crests, side dragons and the pendant + tassel stay inside the shared canvas); crests, side dragons and the pendant + tassel stay inside the shared canvas); crests, side dragons and the pendant + tassel stay inside the shared canvas); crests, side dragons and the pendant + tassel stay inside the shared canvas); the box is 480 canvas units wide and as tall as the canvas, the stage (.kin) is scaled by the opening (box width / 480) and centred, so every opening is identical; side ornaments may reach past the box edges, crest and tassel are inside its height */
(function(){const p0=pcPort;pcPort=function(f,col,status){f=f||{};let d;try{d=kitDecor(f)}catch(e){return p0.apply(this,arguments)}
 const g=d.known?f:Object.assign({},f,{src:d.unknownSrc,ini:"",rk:"",w:null});let h=p0.call(this,g,d.known?col:"#9aa0a6",status);
 h=h.replace(/<img class="pcb2"[^>]*>/,"").replace('class="pcp',`class="pcp kit kr-${d.role}`).replace(/style="--c:([^"]*)"/,`style="--c:$1;--kc:${d.col};--km:${d.metal}"`);
 const i=h.indexOf(">"),j=h.lastIndexOf("</div>");let inner=h.slice(i+1,j);let pcs="";inner=inner.replace(/<em class="pcs">[\s\S]*?<\/em>/,m=>{pcs=m;return""});
 /* portrait crop = the live por framing the owner chose (11/14): whole head, face large, cut below the chest; the por sits 9 % lower than the
    opening top so frame crests never cover the hair (brocade shows as headroom) */
 inner=inner.replace(/<img src=/,'<img class="kpor" src=');
 const deco=`<img class="kfr" src="${d.frame}" alt="" aria-hidden="true" onerror="this.remove()">`+(d.badge?`<img class="kgem" src="${d.badge}" alt="" aria-hidden="true" onerror="this.remove()">`:"")+(d.emb?`<img class="kemb" src="${d.emb}" alt="${d.embName}" title="Xuất thân: ${d.embName}" onerror="this.remove()">`:"")+(d.label?`<em class="klab">${d.label}</em>`:"");
 return h.slice(0,i+1)+`<span class="kin"><span class="kbg" style="background-image:${d.tint?`linear-gradient(${d.tint}38,${d.tint}38),`:""}url(${d.bg})"></span>${inner}${deco}</span>${pcs}</div>`}})();
/* pframe shows the label under the frame: unknown people are "Người lạ" */
(function(){const f0=pframe;pframe=function(f,col){try{if(f&&f.__kp&&!kitIsKnown(f.__kp))f=Object.assign({},f,{rw:"Người lạ"})}catch(e){}return f0.call(this,f,col)}})();
/* the small round avatar: same ground, rank-colour ring, metal rim */
(function(){const m0=mdH;mdH=function(p,cls){p=p||{};let d;try{d=kitDecor(p)}catch(e){return m0.apply(this,arguments)}
 const g=d.known?p:Object.assign({},p,{src:d.unknownSrc,ini:"?",rk:""});let h=m0.call(this,g,cls);
 return h.replace('class="md',`class="md kit kr-${d.role}`).replace(/style="--c:([^"]*)"/,`style="--c:$1;--kc:${d.col};--km:${d.metal};--kbg:url(${d.bg})"${d.label?` title="${d.label}"`:""}`)}})();
/* person card: unknown people are named "Người lạ" */
(function(){const c0=pcard;pcard=function(o){try{if(o&&o.f&&o.f.__kp&&!kitIsKnown(o.f.__kp))o=Object.assign({},o,{name:"Người lạ",rank:""})}catch(e){}return c0.call(this,o)}})();
/* scene: name tags and full-body figures follow the same hook (strangers stand as grey silhouettes img/kit/unknown-fig-f|m|k.webp) */
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const ppl=curPeople();document.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];if(!p)return;const who=p.ref||(p.kind==="emp"?S.emp:p.kind==="th"?S.thO:p.kind==="maid"?S.maid:null);if(who&&!kitIsKnown(who)){const t=b.querySelector(".tag");if(t)t.textContent="Người lạ";const r=personRoleRank(who);const fi=b.querySelector("img.figimg");if(fi)fi.src=KIT_DIR+`unknown-fig-${kitSilG(who)}.webp`}})}catch(e){}return r}})();
/* kit CSS: portrait pieces only; nothing else changes */
(function(){const st=document.createElement("style");st.id="kit60";st.textContent=`
.pcp.kit{border:0!important;box-shadow:none!important;background:transparent!important;border-radius:0!important;overflow:visible!important;container-type:size;aspect-ratio:480/1037!important}
.pcp.kit>.kin{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:calc(min(100cqw / 480,100cqh / 1037) * 550);height:calc(min(100cqw / 480,100cqh / 1037) * 1037);display:grid;place-items:center;isolation:isolate}
.pcp.kit .kin>.kbg{position:absolute;left:14.655%;top:20.289%;width:70.691%;height:49.373%;background:#5a1e16 center/cover no-repeat;z-index:-1;border-radius:3px}
.pcp.kit .kin>img:not(.kfr):not(.kgem):not(.kemb){position:absolute;inset:auto!important;left:14.655%!important;top:24.733%!important;right:auto!important;bottom:auto!important;width:70.691%!important;height:44.930%!important;border-radius:0 0 3px 3px!important}
.pcp.kit .kin>img.kpor{object-fit:cover!important;object-position:50% 0!important}
.pcp.kit .kin>img.kpor[src*="face-"]{top:20.289%!important;height:49.373%!important;-webkit-mask-image:radial-gradient(ellipse 58% 56% at 50% 46%,#000 62%,transparent 100%);mask-image:radial-gradient(ellipse 58% 56% at 50% 46%,#000 62%,transparent 100%)}
.pcp.kit .kin>img.kfr{position:absolute;inset:0!important;width:100%!important;height:100%!important;border-radius:0!important;object-fit:fill!important;z-index:2;pointer-events:none}
.pcp.kit .kin>img.kgem{position:absolute;inset:auto!important;left:73.564%!important;top:64.609%!important;right:auto!important;bottom:auto!important;width:18.327%!important;height:auto!important;aspect-ratio:1;border-radius:0!important;object-fit:contain!important;z-index:3;opacity:1;filter:drop-shadow(0 1px 2px #0007)}
.pcp.kit .kin>img.kemb{position:absolute;inset:auto!important;left:62.218%!important;top:65.718%!important;right:auto!important;bottom:auto!important;width:13.964%!important;height:auto!important;aspect-ratio:1;border-radius:0!important;object-fit:contain!important;z-index:3;filter:drop-shadow(0 1px 2px #0007)}
.pcp.kit>.pcs{z-index:4}
.pfwrap>.pcp.kit{max-height:none!important}
/* kit-rank-name: a person card's header (rank over name, pcHead) already carries the label of its own frame, so the frame pendant never repeats the rank */.pc>.pcl>.pcp.kit .kin>.klab{display:none!important}
.pcp.kit .kin>.klab{position:absolute;left:50%;top:68.737%;transform:translate(-50%,-100%);z-index:3;font-style:normal;font-size:.72rem;color:#f4f4f4;background:#4a4e54cc;padding:1px 8px;border-radius:8px;white-space:nowrap}
.pcp.kit.noimg .kin{color:#fff8e8;text-shadow:0 1px 3px #000a}
.md.kit{background:var(--kbg) center/cover no-repeat!important;border-color:var(--kc)!important;box-shadow:0 0 0 1.5px var(--km),0 2px 6px #5a3a2044!important}
.md.kit.xs{box-shadow:0 0 0 1px var(--km)!important}
`;document.head.appendChild(st)})();
