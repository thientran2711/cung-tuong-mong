
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
function kitServCol(role,r){const M=typeof MRCOL!=="undefined"?MRCOL:window.KIT_MRCOL,E=typeof ERCOL!=="undefined"?ERCOL:window.KIT_ERCOL;const L=role==="eunuch"?E:M;return L[Math.max(0,Math.min(L.length-1,+r||0))]}
const KIT_ORIGINS=["tt","dtq","muoi","cn","nc","td","ch","thd"];
/* the hook another worker implements; keep the name; override by assigning window.kitKnown */
if(typeof window.kitKnown!=="function")window.kitKnown=function(p){return true};
function kitIsKnown(p){try{return p==null||p===S||window.kitKnown(p)!==false}catch(e){return true}}
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
  if(S&&p===S.maid)return out((p.age||18)>=36||p.old?"mama":"maid",p.rk!=null?p.rk:2);
  if(p.role==="maid")return out((p.age||18)>=36||p.old?"mama":"maid",p.rk==null?1:p.rk);
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
/* face object (or person) -> everything the renderer needs */
function kitDecor(f){f=f||{};let r=f.__kr||(f.__kp?personRoleRank(f.__kp):null);if(!r){const x=kitRoleOfFace(f);r=Object.assign({origin:null,sex:(KIT_ROLES[x.role]||KIT_ROLES.other).sex,kid:false},x)}
 const known=f.__kp?kitIsKnown(f.__kp):true;const role=known?r.role:"unknown";let frame,bg,badge=null,emb=null,col,tint=null;
 const rank=r.rank;
 if(role==="player"||role==="consort"){frame=`frame-consort-${rank}`;/* her frame = the consort frame of her rank (owner 11/14); the stage marks her */bg=`bg-consort-${rank}`;badge=`gem-${rank}`;col=kitRankCol(rank);if(role==="player"&&r.origin)emb=`origin-${r.origin}`}
 else if(role==="eunuch"){const r=cl(rank||0,0,3);frame=`frame-eunuch-${r}`;bg=r>=3?"bg-eunuch-3":"bg-eunuch";badge=`tok-e${r}`;col=tint=kitServCol("eunuch",r)}
 else if(role==="maid"||role==="mama"){const r=cl(rank||0,0,4);frame=`frame-${role}-${r}`;bg=`bg-${role}`;badge=`tok-m${r}`;col=tint=kitServCol("maid",r)}
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
function kitFace(p){try{if(!p)return{src:"",ini:"?"};if(p===S)return pMe();if(p===S.emp)return pEmp();if(p===S.thO)return pTH();if(p===S.maid)return pMaid();
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
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const ppl=curPeople();document.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];if(!p)return;const who=p.ref||(p.kind==="emp"?S.emp:p.kind==="th"?S.thO:p.kind==="maid"?S.maid:null);if(who&&!kitIsKnown(who)){const t=b.querySelector(".tag");if(t)t.textContent="Người lạ";const r=personRoleRank(who);const fi=b.querySelector("img.figimg");if(fi)fi.src=KIT_DIR+`unknown-fig-${r.kid?"k":r.sex==="m"?"m":"f"}.webp`}})}catch(e){}return r}})();
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
.pcp.kit .kin>.klab{position:absolute;left:50%;top:68.737%;transform:translate(-50%,-100%);z-index:3;font-style:normal;font-size:.72rem;color:#f4f4f4;background:#4a4e54cc;padding:1px 8px;border-radius:8px;white-space:nowrap}
.pcp.kit.noimg .kin{color:#fff8e8;text-shadow:0 1px 3px #000a}
.md.kit{background:var(--kbg) center/cover no-repeat!important;border-color:var(--kc)!important;box-shadow:0 0 0 1.5px var(--km),0 2px 6px #5a3a2044!important}
.md.kit.xs{box-shadow:0 0 0 1px var(--km)!important}
`;document.head.appendChild(st)})();
