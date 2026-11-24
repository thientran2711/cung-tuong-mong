/* ================= jselxsc: THE SCENE LAYER of the 3 opening days (SELSCENE-5, review/selection-scene) =================
   PURE DISPLAY over the beats of jselxday (the card logic stays there and stays synchronous: the beat pushes its card, the scene plays OVER it with the
   card hidden, the card shows when the scene ends). Kit only (law 9): KIT §93 kitScene (layer, full-body figures never clipped, kitDlgBox),
   §93.5 kitNameTagBox (half-known names), §95 kitDialogue / kitScene.light / kitScene.focus (spotlight, word-by-word typing, per-line cue hook, focus shot).
   No frame, chip or box of its own; numbers in BAL.selx.sc (law 4). Owner rows (verbatim, handover branch OD):
   ~08:50Z ROOM ASSIGNMENT (the ma ma lit, she calls each name → that girl's bust shot → shrinks into the row; after four «… sở» and the group stands aside; the
     roommates stay «Người lạ» until greeted); ~05:10Z ROYALS' REVEAL (Hoàng thượng first: bust big, then full body shrinking to his place, then Thái hậu, Hoàng hậu,
     the background blurred) + ~04:25Z s14 / ~04:45Z / ~04:50Z TỔNG QUẢN (he is big, the scene blurred; the roll-call types out and each girl lights + her name
     appears under her feet WHEN the typing reaches her line, never all at once); ~04:45Z SPOTLIGHT (two other girls quarrel: the speaker lit, the other dimmed,
     both full body left / right, the line box sits UNDER whoever speaks, OD ~04:10Z s9); ~09:30Z RESULT per girl (the called girl zooms up + lights from her row; hương nang → she steps
     aside; ban hoa → she backs out of the screen; next; HER turn on her own background, big) + ~04:40Z (kept / ban hoa have their OWN background).
   Off for bots / tests (window.__bot, window.__selxNoSc) and outside the 3 days. Calm / reduced motion = the kit shows lines at once (cues still fire). */
/* ONE placeholder table (CREDIT HOLD 24/11: no art generation here; Foreman C paints the keys on the right, then only this table changes) */
const SELX_ART={gate:"img/ev-nhap-cung.webp",rooms:"img/ev-nhap-cung.webp",sanh:"img/ev-nhap-cung.webp",dong:"img/ph-event-light.webp",tay:"img/ph-event-light.webp",bac:"img/ph-event-light.webp",
 yard:"img/ev-tuyen-tu.webp",hall:"img/ev-te-le.webp",call:"img/ev-te-le.webp",huong:"img/ev-tuyen-tu.webp",banhoa:"img/ev-tuyen-tu.webp"};
const SELX_ART_TODO={gate:"selx-gate (cửa Bắc, xe tú nữ)",rooms:"selx-rooms (sân Dưỡng Tú viện, ma ma chia sở)",sanh:"selx-tiensanh",dong:"selx-so-dong",tay:"selx-so-tay",bac:"selx-so-bac",
 yard:"selx-yard (sân chờ)",hall:"selx-hall (điện tuyển)",call:"selx-call (xướng danh)",huong:"selx-huongnang (her OWN background, kept)",banhoa:"selx-banhoa (her OWN background, sent home)",
 fig:"full figures: Giáo tập ma ma, Tổng quản thái giám (today: the maid / eunuch figure sets)"};
function selxArt(k){const s=SELX_ART[k]||SELX_ART.hall;try{return typeof IMG_U==="function"?IMG_U(s):s}catch(e){return s}}
function selxScOk(){try{return selxDaysOn()&&typeof kitScene==="object"&&typeof kitDialogue==="object"&&!window.__bot&&!window.__selxNoSc&&!!document.querySelector("header.hud")}catch(e){return false}}
/* ---- one scene at a time; the card under it is hidden while it plays; deferred steps (podium, ban hoa) run when it ends or is replaced ---- */
let SELX_SC=null;
function selxModal(hide){const M=document.getElementById("modal");if(M)M.style.visibility=hide?"hidden":""}
function selxScStop(me){if(!me||me.dead)return;me.dead=1;(me.res||[]).forEach(f=>{try{f()}catch(e){}});const A=me.after||[];me.after=[];A.forEach(f=>{try{f()}catch(e){console.error(e)}})}
async function selxScene(bg,build,keep){if(SELX_SC)selxScStop(SELX_SC);const me={after:[],res:[]};SELX_SC=me;selxModal(true);let Sc=null;
 const S0=S;try{Sc=kitScene.open({bg:selxArt(bg),intro:0});await build(Sc,me)}catch(e){/* a co-op rebuild / the room's edict can end her days (or swap her state) while a scene still plays: that scene just stops (selxRefill puts the beat back if the days go on) */
  let gone=false;try{gone=S!==S0||!S.selx2||!selxDaysOn()}catch(x){gone=true}if(!gone)console.error("selx scene",e)}
 if(me.dead&&SELX_SC!==me)return;await new Promise(r=>{try{Sc?Sc.close(r):r()}catch(e){r()}});
 if(SELX_SC===me)SELX_SC=null;if(!keep)selxModal(false);selxScStop(me);if(!keep)try{showModal();render()}catch(e){}}
/* steps that must wait for a multi-shot scene (the podium, her ban hoa ending) */
let SELX_RQ=null;function selxRqRun(){const A=SELX_RQ||[];SELX_RQ=null;A.forEach(f=>{try{f()}catch(e){console.error(e)}})}
function selxPlay(Sc,me,o){return new Promise(res=>{if(me.dead)return res();let d=null;try{d=kitDialogue.play(Sc,Object.assign({},o,{onDone:()=>res()}))}catch(e){console.error(e);return res()}me.res.push(()=>{try{d&&d.stop()}catch(e){}res()})})}
function selxWait(me,ms){return new Promise(r=>{if(me.dead)return r();const t=setTimeout(r,kscnCalm()?0:ms);me.res.push(()=>{clearTimeout(t);r()})})}
/* ---- geometry + people ---- */
function selxIp(){return document.documentElement.classList.contains("kv2")}
function selxFh(g){return Math.round(g.H*BAL.selx.sc.fh)}
function selxView(){const V=BAL.selx.sc.view;return selxIp()?V.ipad:V.fold}
function selxBoxB(g){return{x:Math.round(g.w*.04),y:Math.max(8,g.H-176),w:Math.round(g.w*.92)}}
function selxBoxT(g){return{x:Math.round(g.w*.04),y:8,w:Math.round(g.w*.92)}}
function selxFigP(p){if(p==="emp")return{kind:"emp"};if(p==="th")return{kind:"th"};if(p==="tq")return{kind:"maid",ref:{role:"eunuch",id:"tq",name:"Tổng quản"}};
 if(p==="ma"){let m=null;try{m=elderBy("gt")}catch(e){}const ok=m&&typeof figRoles==="function"&&figRoles(m).length;return{kind:"maid",ref:ok?m:{role:"maid",old:1,age:BAL.ageBand[1]/* an elder of the 39–50 band (law 4, RV-SELX) */,id:"selx-gt",name:"Giáo tập ma ma"}}}return p}
/* LAW 11 (whole group): a tú nữ of the selection is not in `rivals` yet, so the figure core (j39 figRoles) gave her no figure anywhere (scene, stage, podium);
   she takes the consort figure set like every other woman of her age (tier: none until the edict) */
(function(){if(typeof figRoles!=="function")return;const r0=figRoles;figRoles=function(who){const r=r0.apply(this,arguments);return !r.length&&who&&who.tuNu?["consort"]:r};window.figRoles=figRoles})();
/* LAW 11 (whole group): during the 3 days she is a TÚ NỮ, not rank 0 — the HUD rank chip (#me-r, as the maid / kc modes already do) and her rank word in the one face core rkOfFace (j59 name tags,
   stage portrait pMe, podium) said «Quý nhân» (RANKS[0]) before any edict */
(function(){const T=()=>{try{return selxDaysOn()}catch(e){return false}};
 if(typeof rkOfFace==="function"){const f0=rkOfFace;rkOfFace=function(kind,o){const g=f0.apply(this,arguments);return (o===S||o&&o.tuNu)&&kind==="consort"&&T()?[g[0],"Tú nữ"]:g};window.rkOfFace=rkOfFace}
 /* RV-SELX (same group): the other tú nữ too (day-3 «Thường tại Bạch Nghi Tu» before the edict; OD 23/11 ~22:53Z the rank is known only at the sắc phong), and rkName (j8: k61 name masks, Sổ ghi, news) as jkc / jkc2 do */
 if(typeof rkName==="function"){const n0=rkName;rkName=function(p){return (p===S||p&&p.tuNu)&&T()?"Tú nữ":n0.apply(this,arguments)};window.rkName=rkName}
 /* RV-SELX (same group): kitName(S,{named:true}) prints RANKS[S.rank] itself (podium «Quý nhân» over her name during the contest) → «Tú nữ» too */
 if(typeof kitName==="function"){const k0=kitName;kitName=function(p,o){const h=k0.apply(this,arguments);try{if(p===S&&o&&o.named&&T()&&!S.out&&RANKS[S.rank])return h.replace(`>${RANKS[S.rank].n}</span>`,">Tú nữ</span>")}catch(e){}return h};window.kitName=kitName}
 if(typeof renderHUD==="function"){const h0=renderHUD;renderHUD=function(){const r=h0.apply(this,arguments);try{if(T()){const m=document.getElementById("me-r");if(m&&m.textContent!=="Tú nữ")m.textContent="Tú nữ"}}catch(e){}return r};window.renderHUD=renderHUD}})();
async function selxFig(Sc,p,cx,o){o=o||{};const g=Sc.L.g,fh=o.fh||selxFh(g);const f=await Sc.fig(selxFigP(p),{cx,top:g.H-fh,fh,z:o.z||3});f.__p=p;if(o.hide){/* the kit slide-in (fill both) would hold it visible */try{f.getAnimations().forEach(a=>a.cancel())}catch(e){}f.style.opacity=0}return f}
/* the j59 name tag under the feet (kitNameTagBox: «Người lạ» / face known / name), kept on the layer */
function selxTag(Sc,f,p,o){try{const w=document.createElement("div");w.innerHTML=kitNameTagBox(p,o||{});const t=w.firstElementChild;const r=f.getBoundingClientRect(),lr=Sc.L.getBoundingClientRect();
 t.style.cssText+=`;position:absolute;z-index:9;left:${Math.round(r.left-lr.left+r.width/2)}px;top:${Math.round(Math.min(r.bottom,lr.bottom)-lr.top-38)}px;transform:translateX(-50%)`;Sc.L.appendChild(t);return t}catch(e){return null}}
function selxLabel(Sc,x,y,txt){const t=document.createElement("div");t.className="kscn-tag";t.dataset.selxSo="1";t.textContent=txt;t.style.cssText=`position:absolute;z-index:9;left:${Math.round(x)}px;top:${Math.round(y)}px;transform:translateX(-50%)`;Sc.L.appendChild(t);return t}
/* a focus shot shows ONE figure (kit §95: the others hidden) → the sở labels hide with them (iPad: a top group's label sat over the next focused girl) */
function selxLblSync(L){const on=L.classList.contains("kscn-focus");L.querySelectorAll("[data-selx-so]").forEach(t=>{t.style.visibility=on?"hidden":""})}
/* move a figure to a new box (left/top/height) — the size lives in its style, so the kit focus / light (transform + classes) never undoes it */
function selxMove(f,x,y,h,ms){const r={l:parseFloat(f.style.left)||0,t:parseFloat(f.style.top)||0,h:parseFloat(f.style.height)||0,w:parseFloat(f.style.width)||0};const w=r.w*h/Math.max(1,r.h);
 f.style.left=Math.round(x-w/2)+"px";f.style.top=Math.round(y)+"px";f.style.height=Math.round(h)+"px";f.style.width=Math.round(w)+"px";
 if(!kscnCalm())try{f.animate([{left:r.l+"px",top:r.t+"px",height:r.h+"px",width:r.w+"px"},{left:f.style.left,top:f.style.top,height:f.style.height,width:f.style.width}],{duration:ms||BAL.selx.sc.ms,easing:"cubic-bezier(.3,.7,.3,1)"})}catch(e){}}
function selxNmS(p){return p===S?(S.name||"ngươi"):p&&p.name||"một tú nữ"}
/* ================= DAY 1 · ROOM ASSIGNMENT (OD ~08:50Z) ================= */
async function selxScRooms(){const Z=S.selx2;const rooms=(Z.rooms||[]).slice();if(!rooms.length)return;
 await selxScene("rooms",async(Sc,me)=>{const L=Sc.L,g=L.g,fh=selxFh(g),side=BAL.selx.sc.side;await selxFig(Sc,"ma",g.w*.5);Sc.show();
  await selxPlay(Sc,me,{box:selxBoxB(g),lines:[{fig:0,who:"Giáo tập ma ma",focus:true,text:`Các ngươi nghe cho rõ. ${BAL.selx.lodge.n} có ${selxNumW(rooms.length)} sở, ${selxNumW(BAL.selx.room.perRoom)} người một phòng. Gọi tới tên ai, người ấy bước ra.`}]});
  L.figs[0].style.display="none";const spots=[[.24,0],[.76,0],[.5,1]];
  for(let ri=0;ri<rooms.length&&!me.dead;ri++){const R=rooms[ri];const ppl=R.ids.map(selxBy).filter(Boolean);const base=L.figs.length,n=ppl.length;
   for(let i=0;i<n;i++)await selxFig(Sc,ppl[i],g.w*(i+.5)/n,{hide:1});
   const lines=ppl.map((p,i)=>({fig:base+i,who:"Giáo tập ma ma",focus:true,text:`${selxNmS(p)}.`}));lines.push({fig:null,who:"Giáo tập ma ma",text:`${selxCap(selxNumW(n))} người này ở ${selxSo(R.so)}.`});
   await selxPlay(Sc,me,{box:selxBoxB(g),lines,onLine:i=>{const f=L.figs[base+i];if(f)f.style.opacity="";selxLblSync(L)}});selxLblSync(L);
   /* the group stands aside as one group, its sở name above the heads: HER sở (called first) = the front group (her room view: the roommates' tags stay clear of the box), the others top-left / top-right */
   const [sx,row]=spots[ri===0?2:ri===1?0:1];const bb=selxBoxB(g).y-8;const h=row?Math.min(fh*.55,bb*.62):fh*side,top=row?bb-h:Math.round(g.H*.04)+30;const gw=g.w*(row?.5:.4);
   for(let i=0;i<n;i++){const f=L.figs[base+i];selxMove(f,g.w*sx-gw/2+gw*(i+.5)/n,top,h)}
   await selxWait(me,BAL.selx.sc.ms);selxLabel(Sc,g.w*sx,Math.max(4,top-30),selxSo(R.so));
   for(let i=0;i<n;i++){const f=L.figs[base+i];if(ppl[i]!==S&&!selxMet(ppl[i]))f.classList.add("kscn-dim")}}
  /* her room: four people, the three roommates still strangers (grey «Người lạ» until she greets them) */
  const mine=rooms[0];const ix=L.figs.map((f,i)=>i).filter(i=>L.figs[i].__p&&mine.ids.includes(L.figs[i].__p===S?"me":L.figs[i].__p.id));
  await selxPlay(Sc,me,{box:selxBoxB(g),lines:[{fig:null,who:"Giáo tập ma ma",text:"Ai về sở nấy. Cất đồ rồi ra Tiền sảnh."}],onLine:()=>{ix.forEach(i=>{const f=L.figs[i];const p=f.__p;if(p!==S&&!selxMet(p))selxTag(Sc,f,p,{stage:0})})}})})}
/* ================= DAY 2 · THE HALL: royals' reveal + Tổng quản roll-call (OD ~05:10Z, ~04:25Z s14, ~04:50Z) ================= */
function selxRound(){const Z=S.selx2;if(!Z)return[];if(!Z.round){const L=selxAll();Z.round=L.slice(0,Math.max(0,BAL.selx.yard.perRound-1)).map(v=>v.id)}return Z.round.map(selxBy).filter(Boolean)}
async function selxScHall(){const RY=selxRoyals();await selxScene("hall",async(Sc,me)=>{const L=Sc.L,g=L.g;const order=["E","T","H"].map(k=>RY.find(x=>x[0]===k)).filter(Boolean);
  /* shot A — her eyes go to the throne first: each royal bust-big (focus), then back to the place, smaller, the background blurred */
  Sc.show();const cx={E:.5,T:.2,H:.8};for(const [k,nm,tok] of order)await selxFig(Sc,k==="E"?"emp":k==="T"?"th":tok,g.w*cx[k],{hide:1,z:k==="E"?3:2});
  const think={E:"Người ngồi giữa, áo vàng thêu rồng… hẳn là Hoàng thượng.",T:"Bên trái, một vị phu nhân tóc đã điểm sương, ánh mắt nghiêm: Thái hậu.",H:"Bên phải, một vị nương nương đoan trang, mũ phượng: hẳn là Hoàng hậu."};
  await selxPlay(Sc,me,{box:selxBoxB(g),lines:order.map(([k],i)=>({fig:i,who:"Ngươi nghĩ",focus:true,text:think[k]})),onLine:i=>{const f=L.figs[i];if(f)f.style.opacity=""}});
  L.figs.forEach(f=>f.style.display="none");
  /* shot B — Tổng quản big (the scene blurred), then the roll-call: each girl of her round lights + her name under her feet when the typing reaches her */
  const tq=L.figs.length;await selxFig(Sc,"tq",g.w*.5);const ppl=[S,...selxRound()];const base=L.figs.length;
  for(let i=0;i<ppl.length;i++)await selxFig(Sc,ppl[i],g.w*(i+.5)/ppl.length,{hide:1});
  const lines=[{fig:tq,who:"Tổng quản",focus:true,text:"Tú nữ lượt này vào điện, nghe xướng danh!"}].concat(ppl.map((p,i)=>({fig:base+i,who:"Tổng quản",text:`${selxNmS(p)}${p===S?"":" — "+(p.r0?"con nhà quan":"con nhà lành")}.`})));
  await selxPlay(Sc,me,{box:selxBoxT(g),lines,onLine:i=>{if(i===1)L.figs[tq].style.display="none";if(i>=1){const f=L.figs[base+i-1];if(f){f.style.opacity="";selxTag(Sc,f,ppl[i-1],{stage:2})}}}})})}
/* ================= DRAMA SPOTLIGHT: two other girls, no choice yet (OD ~04:10Z s9, ~04:45Z) ================= */
function selxSplit(t){const out=[];String(t||"").replace(/«([^»]*)»|([^«»]+)/g,(m,q,n)=>{if(q)out.push({q:q.trim()});else if(n.trim())out.push({n:n.trim()});return m});return out}
async function selxScDrama(){const Z=S.selx2,C=SELX_CUR;if(!C||!C.c)return;const {c,her,type}=C;const A=c.bully&&c.bully!==S?c.bully:null,B=c.victim&&c.victim!==S?c.victim:null;if(!A)return;
 const bg=type==="yard"?"yard":type==="kept"?(Z.home||"sanh"):(Z.at===BAL.selx.lodge.sanh[0]?"sanh":Z.at||"sanh");
 await selxScene(bg,async(Sc,me)=>{const g=Sc.L.g;await selxFig(Sc,A,g.w*.27);if(B)await selxFig(Sc,B,g.w*.73);Sc.show();let turn=0;
  const lines=selxSplit(C.intro).map(x=>{if(!x.q)return{fig:null,who:"",text:x.n};const fig=B?(turn++%2):0;return{fig,who:selxCap(selxNm(fig===0?A:B)),text:`«${x.q}»`}});
  await selxPlay(Sc,me,{box:ln=>ln.fig===0?{x:Math.round(g.w*.04),y:Math.max(8,g.H-176),w:Math.round(g.w*.6)}:ln.fig===1?{x:Math.round(g.w*.36),y:Math.max(8,g.H-176),w:Math.round(g.w*.6)}:selxBoxB(g),lines})})}
/* ================= DAY 2 · RESULT per girl (OD ~09:30Z / ~09:00Z / ~04:40Z) ================= */
async function selxScResult(L){SELX_RQ=SELX_RQ||[];try{await selxScResult0(L)}finally{selxModal(false);try{showModal();render()}catch(e){}selxRqRun()}}
async function selxScResult0(L){const mine=L.find(x=>x.v===S);const others=L.filter(x=>x.v!==S);const per=Math.max(1,BAL.selx.yard.perRound);
 const rounds=[];for(let i=0;i<others.length;i+=per)rounds.push(others.slice(i,i+per));
 await selxScene("call",async(Sc,me)=>{const Lr=Sc.L,g=Lr.g,fh=selxFh(g);Sc.show();
  for(const rd of rounds){if(me.dead)return;const base=Lr.figs.length;for(let i=0;i<rd.length;i++)await selxFig(Sc,rd[i].v,g.w*(i+.5)/rd.length);
   const lines=rd.map((x,i)=>({fig:base+i,who:"Thái giám",focus:true,text:`${selxNmS(x.v)} — ${x.kept?"ban hương nang!":"ban hoa!"}`}));lines.push({fig:null,who:"Thái giám",text:"Lượt sau vào điện."});
   const go=i=>{const x=rd[i],f=Lr.figs[base+i];if(!x||!f)return;if(x.kept){selxMove(f,g.w*(.08+.06*i),g.H-fh*.5,fh*.5);f.classList.add("kscn-dim")}
    else{try{if(!kscnCalm())f.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateY(40px) scale(.9)"}],{duration:BAL.selx.sc.ms,easing:"ease-in"})}catch(e){}setTimeout(()=>{f.style.display="none"},kscnCalm()?0:BAL.selx.sc.ms)}};
   await selxPlay(Sc,me,{box:selxBoxT(g),lines,onLine:i=>{if(i>0)go(i-1)}});Lr.figs.slice(base).forEach(f=>f.style.display="none")}},true);
 if(!mine)return;/* HER turn: her own background (kept / ban hoa), her figure the star */
 await selxScene(mine.kept?"huong":"banhoa",async(Sc,me)=>{const g=Sc.L.g;await selxFig(Sc,S,g.w*.5,{fh:Math.round(g.H*.97)});Sc.show();
  await selxPlay(Sc,me,{box:selxBoxB(g),lines:[{fig:null,who:"Thái giám",text:`${S.name||"Tú nữ"} — ${mine.kept?"lưu bài tử, ban hương nang!":"ban hoa!"}`},
   {fig:0,who:selxCap(S.name||"Ngươi"),focus:true,text:mine.kept?"Hai tay ngươi đón lấy chiếc hương nang thêu chỉ vàng. Từ hôm nay, ngươi là người của cung này.":"Một cành hoa đặt vào tay ngươi. Cửa điện sau lưng khép lại."}]})},true)}
/* ================= WIRING: the beat pushes its card (unchanged), the scene plays over it ================= */
(function(){const on=fn=>{try{if(selxScOk())fn()}catch(e){console.error("selxsc",e)}};
 const r1=selxD1Rooms;selxD1Rooms=function(){const r=r1.apply(this,arguments);on(selxScRooms);return r};
 const r2=selxHall;selxHall=function(){const r=r2.apply(this,arguments);on(selxScHall);return r};
 const r3=selxDrama;selxDrama=function(){SELX_CUR=null;const r=r3.apply(this,arguments);on(()=>{const C=SELX_CUR;if(C&&!C.her)selxScDrama()});return r};
 /* the podium waits for the result scene (it would cover it); her ban hoa ending is a #modal card, hidden under the scene until it ends */
 const p0=selxPodShow;selxPodShow=function(L){if(!selxScOk())return p0.apply(this,arguments);const a=arguments;selxScResult(L);SELX_RQ.push(()=>p0.apply(this,a));return null};
})();
try{Object.assign(window,{SELX_ART,SELX_ART_TODO,selxScRooms,selxScHall,selxScDrama,selxScResult,selxScOk})}catch(e){}
/* ================= DƯỠNG TÚ VIỆN ON THE DƯ ĐỒ (owner OD 24/11 ~05:35Z «đi ra khỏi phòng … tương tác với cái dư đồ … nó sẽ hiện ra cái tầng thứ 2 của dư đồ»,
   ~08:20Z: 3 sở + Tiền sảnh) — the EXISTING Dư đồ level 2 (jpm kitPalaceMap: courtyard picture + hall hotspots + kit hall rows + «‹ Dư đồ» back), fed with the
   lodging as one more place: slot "p:dtv", parts Đông / Tây / Bắc sở + Tiền sảnh, people per part from the one day plan (selxWhere), «tạm» chip while the courtyard
   painting is the placeholder (SELX_ART.rooms). Replaces the in-card «Sang …» menu (days 1–2; day 3 the map shows where everyone is, but the kept stay in her sở). During the 3 days the map opens on this
   level (the rest of the palace is shut to a tú nữ, OD ~05:35Z) and «‹ Dư đồ» / any other tab goes back to her free-khắc card. «Sang buổi» stays shut (the day runs on khắc). */
const SELX_DTV="p:dtv";
(function(){if(typeof kitPalaceMap!=="function"||typeof KPM_DATA!=="object")return;const on=()=>{try{return selxDaysOn()}catch(e){return false}};
 const P=()=>BAL.selx.lodge;const parts=()=>[...P().so,P().sanh].map(x=>[x[0],x[1]]);
 KPM_HALLS["selx-dtv"]=parts().map(x=>x[0]);
 /* hotspots on the courtyard picture (fractions): Tây sở left, Đông sở right, Bắc sở at the back, Tiền sảnh in front */
 (KPM_DATA.spots=KPM_DATA.spots||{})["selx-dtv"]={tay:{x:.02,y:.3,w:.24,h:.4},dong:{x:.74,y:.3,w:.24,h:.4},bac:{x:.32,y:.05,w:.36,h:.32},sanh:{x:.32,y:.55,w:.36,h:.32}};
 const w=(n,f)=>{const o=window[n];if(typeof o!=="function")return;window[n]=f(o)};
 w("kpmKeyOf",f0=>function(i){return i===SELX_DTV?(on()?"dtv":null):f0.apply(this,arguments)});
 w("kpmName",f0=>function(s){return s===SELX_DTV?P().n:f0.apply(this,arguments)});
 w("kpmParts",f0=>function(s){return s===SELX_DTV?parts():f0.apply(this,arguments)});
 w("kpmArt",f0=>function(s){return s===SELX_DTV?{src:selxArt("rooms"),dir:"selx-dtv",tam:true}:f0.apply(this,arguments)});
 w("kpmSplit",f0=>function(k){if(k!=="dtv")return f0.apply(this,arguments);const O={};parts().forEach(([h])=>O[h]={ppl:[],n:0,res:[]});
  const Z=S.selx2;[S,...selxAll()].forEach(v=>{const at=v===S?Z.at:selxWhere(v);if(O[at]){O[at].ppl.push(v);O[at].n++}});return O});
 w("kpmTapPart",f0=>function(part){const o=window.__kpm;if(!o||o.slot!==SELX_DTV)return f0.apply(this,arguments);selxMapGo(part)});
 /* during the 3 days the Dư đồ opens on the lodging; «‹ Dư đồ» = back to her card */
 w("mapHTML",f0=>function(){if(on()){window.__kpm={slot:SELX_DTV,k:"dtv"};const Z=S.selx2;
   try{const h=kitPalaceMap({slot:SELX_DTV,k:"dtv",why:`ngươi đang ở ${selxSo(Z.at)} · còn ${selxNumW(Math.max(0,Z.kh))} khắc`});
   /* the part she stands in = the kit «here» state (row .sel, hotspot .here, no walk price), as jpm marks her current hall */
   const d=document.createElement("div");d.innerHTML=h;const r=d.querySelector(`[data-kpmpart="${Z.at}"]`);if(r){r.classList.add("sel");[...r.querySelectorAll(".kpm-rs")].filter(x=>/^tốn:/.test(x.textContent)).forEach(x=>x.remove())}
   /* the walk price printed = the price selxMapGo takes (BAL.walk.near, law 4), in words (law 7) */
   d.querySelectorAll(".kpm-row .kpm-rs").forEach(x=>{if(/^tốn:/.test(x.textContent))x.textContent=`tốn: ${selxNumW(BAL.walk.near)} khắc`});
   const sp=d.querySelector(`[data-go="kpm:${Z.at}"]`);if(sp)sp.classList.add("here");return d.innerHTML}catch(e){console.error(e)}}return f0.apply(this,arguments)});
 w("render",f0=>function(){const r=f0.apply(this,arguments);try{if(on()){const n=document.getElementById("next");if(n)n.disabled=true}}catch(e){}return r});
 /* SELSCENE-9 (MAIN 121 ruling): the free card STAYS in Q under the map (state only: Q[0].selxMapUp) — hidden while the map is on screen, shown
    again on return; so a save / co-op rebuild / any driver that reads Q never finds the days without their card */
 const up=()=>{try{const m=Q[0];return !!(m&&m.selxMapUp&&on()&&window.__kpm&&window.__kpm.slot===SELX_DTV)}catch(e){return false}};
 w("showModal",f0=>function(){try{const m=Q[0];if(m&&m.selxMapUp){if(up()){const M=document.getElementById("modal");if(M)M.hidden=true;return}delete m.selxMapUp}}catch(e){}return f0.apply(this,arguments)});
 /* the stage rail «Về Dư đồ» (jplfs kplBack) on her days map = back to her card too */
 w("kplBack",f0=>function(){try{if(up())return{t:"Về Dư đồ",go:()=>{window.__kpm=null;selxMapBack()}}}catch(e){}return f0.apply(this,arguments)});
 window.kpmBackHook=()=>{try{if(!up())return false;window.__kpm=null;selxMapBack();return true}catch(e){console.error(e);return false}};
 window.addEventListener("click",e=>{try{if(!on()||(Q.length&&!up()))return;const t=e.target.closest("#tabs [data-tab]");
  if(t&&t.dataset.tab!=="go"){e.preventDefault();e.stopImmediatePropagation();window.__kpm=null;selxMapBack()}}catch(err){console.error(err)}},true)})();
/* back from the map: the card that opened it is dropped and her free card is made again where she now stands */
function selxMapBack(){try{tab="act"}catch(e){}const Z=S.selx2;for(let i=Q.length-1;i>=0;i--)if(Q[i]&&Q[i].selxMapUp)Q.splice(i,1);if(Z&&Z.qHold){Q.push(...Z.qHold);Z.qHold=null}selxFree();try{showModal();render()}catch(e){}}
/* walk to a part: the walk price of the old menu (BAL.walk.near), then her free card there */
function selxMapGo(part){const Z=S.selx2;if(!Z||!selxDaysOn())return;window.__kpm=null;if(part!==Z.at&&Z.days!==3){selxSpend(BAL.walk.near);Z.at=part}selxMapBack()}
/* the free card: «Ra Dư đồ» in place of the «Sang …» rows (days 1–2) */
(function(){if(typeof selxFree!=="function")return;const f0=selxFree;selxFree=function(){const r=f0.apply(this,arguments);try{const m=Q[0];const Z=S.selx2;
  if(m&&m.pid==="selxD"&&m.opts&&Z.days!==3&&!window.__bot){const nm=[...BAL.selx.lodge.so,BAL.selx.lodge.sanh].map(x=>`Sang ${x[1]}`);const i=m.opts.findIndex(o=>nm.includes(o.n));
   m.opts=m.opts.filter(o=>!nm.includes(o.n));if(i>=0)m.opts.splice(i,0,selxO("Ra Dư đồ",()=>selxMapOpen(),{selxMap:1}))}}catch(e){console.error(e)}return r}})();
/* «Ra Dư đồ» is a way out of the card, not a deed: no result card, no log line (the chooseM path would show «Ra Dư đồ — không đổi gì») */
function selxMapOpen(){/* her free card stays first in Q, marked; showModal hides it while the map is up (MAIN 121) */
 const m=Q[0];if(m&&m.pid==="selxD")m.selxMapUp=1;try{tab="go"}catch(e){}window.__kpm={slot:SELX_DTV,k:"dtv"};try{showModal();render()}catch(e){}}
document.addEventListener("click",e=>{try{const b=e.target.closest("#modal button[data-m]");if(!b)return;const c=Q[0]&&Q[0].opts&&Q[0].opts[+b.dataset.m];if(!c||!c.selxMap)return;
 e.preventDefault();e.stopImmediatePropagation();selxMapOpen()}catch(err){console.error(err)}},true);
try{Object.assign(window,{selxMapGo,selxMapBack})}catch(e){}
/* ================= SELSCENE-9 (RV-SELX FAIL 3; law 6 b/c; OD 24/11 ~09:20Z phân cung after the sắc phong) =================
   During the 3 days she is a tú nữ living in Dưỡng Tú viện: no residence, no personal maid, no palace deeds until the edict.
   The stage = a place "dtv" (as j42 Tân Giả khố / jkc KCPL): name «Dưỡng Tú viện · <sở>», the painting of the part she stands in (SELX_ART),
   the people = the girls of that part (selxHere; strangers stay §59.1 «Người lạ» through the stage's own token rule) + the ma ma at Tiền sảnh.
   The Hành sự / Cung nhân tabs show the kit empty card (§37.2) instead of the palace deck / her staff. Solo and co-op alike (a seat's own screen). */
(function(){const on=()=>{try{return !!(S&&!S.dead&&selxDaysOn())}catch(e){return false}};
 const base=()=>{const p=placeOf;placeOf=function(k){if(k==="dtv"){const Z=S.selx2||{};return{k,n:`${BAL.selx.lodge.n} · ${selxSo(Z.at)||BAL.selx.lodge.sanh[1]}`,d:"",sc:"dtv"}}return p.apply(this,arguments)};window.placeOf=placeOf};
 const visit=()=>{const Z=S.selx2;let ppl=[];try{ppl=selxHere().slice()}catch(e){}if(Z.at===BAL.selx.lodge.sanh[0]){try{const m=elderBy("gt");if(m&&!ppl.includes(m))ppl.push(m)}catch(e){}}
  return{k:"dtv",people:ppl,talked:false,tk:{},msg:""}};
 const art=()=>{try{const s=SELX_ART[S.selx2.at]||SELX_ART.rooms;if(typeof SCIMG==="object")SCIMG.dtv=String(s).replace(/^.*?\bimg\//,"").replace(/\.webp.*$/,"")}catch(e){}};
 const wrap=()=>{base();
  const r0=renderStage;renderStage=function(){if(!on())return r0.apply(this,arguments);const p=S.place;art();S.place="dtv";
   try{return r0.apply(this,arguments)}finally{S.place=p}};window.renderStage=renderStage;
  /* the people of the stage (tokens, counts, taps read curPeople at any time, also after the render): the girls of her part */
  const c0=curPeople;curPeople=function(){return on()?visit().people:c0.apply(this,arguments)};window.curPeople=curPeople;
  /* the «Về phòng» head button (her room) and anything keyed on the html class: no room yet */
  const r1=render;render=function(){try{document.documentElement.classList.toggle("selxdays",on())}catch(e){}return r1.apply(this,arguments)};window.render=render;
  const p0=renderPanel;renderPanel=function(){if(!on()||typeof tab==="undefined"||!["act","staff"].includes(tab))return p0.apply(this,arguments);
   try{const el=document.getElementById("panel");el.innerHTML=kitEmpty(BAL.selx.lodge.n,tab==="act"?["Ba ngày tuyển tú, mọi việc theo lời ma ma.","Ngươi chưa có cung riêng; tới sắc phong mới được phân cung."]:["Tú nữ chưa có cung nhân hầu hạ.","Cung nữ được phân tới sau sắc phong."],{art:selxArt(S.selx2.at)||selxArt("rooms")});return}catch(e){console.error(e)}return p0.apply(this,arguments)};window.renderPanel=renderPanel};
 /* her «Cung nhân» rail button (her own staff) has no place in Dưỡng Tú viện: hidden on the dtv stage only */
 try{const st=document.createElement("style");st.textContent='.stage.sc-dtv [data-kgf="cn"],html.selxdays #k3room{display:none!important}';document.head.appendChild(st)}catch(e){}
 /* outermost: after every other file has wrapped renderStage / renderPanel (the inner wrappers all see S.place "dtv") */
 setTimeout(()=>{try{wrap()}catch(e){console.error(e)}},0)})();
