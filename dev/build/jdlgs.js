/* ================= jdlgs: SIDE-LINE DIALOGUE SCENES (owner OD 24/11 ~10:05Z «STORY = DIALOGUE SCENES»; Foreman B, review/sideline-dlg) =================
   Every side-line quest that involves a person opens with a short visual-novel scene before its card: the person who comes stands LEFT, she
   stands RIGHT, the speaker is lit and the other dimmed, the line types word by word, tap = finish / next (KIT §95 kitDialogue.play — the ONLY UI,
   law 9; this file draws nothing of its own). Schema: dev/handover/reports/sideline-dialogue.md «## SCHEMA» (one shape for side lines AND roads).
   DATA: DLGS_DATA (jdlgsd.js, built by dev/build/jdlgsd_build.py from dev/handover/content/dlg/*.md) = [{id:"<fam>:<unit id>", dlg:{L,R,watch,at,lines}}].
   RESOLVE: dlgsResolve(spec,{who,txt,at}) (txt(text, speakerRole, listenerRole): {goi}/{xung} are said BY the line's speaker TO the other figure, jvoice kSay) → the KIT §95 call data {bg, figs:[srcL,srcR], names, lines:[{fig,who,text,focus}]} (strings only: a saved
     card keeps it). Every role must be a REAL living person the family's own engine cast (law 6b); a role or placeholder that does not resolve =
     no scene (the card shows as before, never a scene with a wrong person).
   PLAY: a family adapter puts it on its card (m.dlg); the showModal wrapper below plays it ONCE before the card, then the card (the choice) shows.
     Co-op: the card is in this seat's own Q → the scene shows on the seat whose quest it is; nothing is sent (host computes the world only).
   Numbers (law 4): BAL.dlgs (jbal2.js). Off: BAL.dlgs.on=false. */
const DLGS={idx:null,playing:false,n:0,log:[]};
function dlgsData(){if(!DLGS.idx){DLGS.idx={};try{(typeof DLGS_DATA!=="undefined"&&Array.isArray(DLGS_DATA)?DLGS_DATA:[]).forEach(r=>{if(r&&r.id&&r.dlg)DLGS.idx[r.id]=r.dlg})}catch(e){}}return DLGS.idx}
function dlgsGet(id){return dlgsData()[id]||null}
function dlgsOn(){try{return !!(BAL.dlgs&&BAL.dlgs.on)&&typeof kitDialogue!=="undefined"&&typeof kitScene!=="undefined"}catch(e){return false}}
/* a person → {src,n}; her = S (figFor knows her dress / rank) */
function dlgsPer(o,n){try{if(!o)return null;const src=figFor(o)||"";if(!src)return null;return{src,n:n||o.name||""}}catch(e){return null}}
function dlgsMe(){return dlgsPer(S,S&&S.name)}
function dlgsResolve(spec,c){try{if(!spec||!dlgsOn()||!Array.isArray(spec.lines))return null;const B=BAL.dlgs;if(spec.lines.length<B.min||spec.lines.length>B.max)return null;
 const L=spec.L,R=spec.R||"me";if(!L||L===R)return null;const who=r=>r==="me"?dlgsMe():c.who(r);const pL=who(L),pR=who(R);if(!pL||!pR)return null;
 const lines=[];for(const ln of spec.lines){const f=ln.who==="nar"?null:ln.who===L?0:ln.who===R?1:-1;if(f<0)return null;
  const sp=f==null?null:[L,R][f],ls=f==null?null:[R,L][f];const t=String(c.txt?c.txt(ln.text,sp,ls):ln.text||"").trim();if(!t||/\{[^}]*\}/.test(t))return null;lines.push({fig:f,who:f==null?"":[pL.n,pR.n][f],text:t,focus:!!ln.focus&&f!=null})}
 let bg="";try{const a=typeof kitPlaceArt==="function"?kitPlaceArt(spec.at||c.at||(S&&S.place)||"home"):null;bg=a&&a.src||""}catch(e){}
 return{bg,figs:[pL.src,pR.src],names:[pL.n,pR.n],lines,watch:!!spec.watch}}catch(e){console.error(e);return null}}
/* attach to the card the family just pushed (the last Q item pushed since n0, matched by test) */
function dlgsAttach(n0,d,test){if(!d)return false;for(let i=Q.length-1;i>=Math.max(0,n0);i--){const m=Q[i];if(m&&!m.dlg&&(!test||test(m))){m.dlg=d;DLGS.n++;return true}}return false}
/* the player: one kit scene, two full figures (her right), the KIT §95 dialogue; cb when the last line is read */
async function dlgsPlay(d,cb){let done=false;const fin=()=>{if(done)return;done=true;DLGS.playing=false;document.body.classList.remove("kdlgs-on");try{cb&&cb()}catch(e){console.error(e)}};
 DLGS.playing=true;document.body.classList.add("kdlgs-on");
 try{const B=BAL.dlgs,U=typeof IMG_U==="function"?IMG_U:(x=>x);const Sc=kitScene.open({bg:U(d.bg),intro:B.intro});const g=Sc.L.g,ip=document.documentElement.classList.contains("kv2"),K=ip?B.ipad:B.fold,fh=Math.round(g.H*K.fh);
  await Sc.fig(d.figs[0],{cx:g.w*K.lx,top:g.H-fh,fh,z:2});await Sc.fig(d.figs[1],{cx:g.w*K.rx,top:g.H-fh,fh,z:3});
  Sc.show();const bh=Math.round(g.H*K.boxH),bw=Math.round(g.w*K.boxW);
  DLGS.cur=kitDialogue.play(Sc,{lines:d.lines,box:()=>({x:Math.round((g.w-bw)/2),y:g.H-bh,w:bw}),onDone:()=>{DLGS.cur=null;Sc.close(fin)}});
  DLGS.log.unshift({t:Date.now(),n:d.lines.length,who:d.names.join(" · ")});DLGS.log.length=Math.min(DLGS.log.length,20)}catch(e){console.error(e);try{kitScene.close(true)}catch(x){}fin()}}
/* the card waits under the scene: showModal resolves the card's scene ONCE (m.dlg, or a family resolver by the card's pid / tag), plays it, then the card */
DLGS.R=[];/* [{test:m=>bool, fn:m=>resolved|null}] — one per family */
function dlgsFor(m){if(m.dlg)return m.dlg;if(m.__dlgk)return null;m.__dlgk=1;for(const r of DLGS.R){try{if(r.test(m)){const d=r.fn(m);if(d){m.dlg=d;DLGS.n++;return d}return null}}catch(e){console.error(e);return null}}return null}
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const M=$("modal");
  if(DLGS.playing){/* the card stays hidden under the scene; it shows when the last line is read */if(M)M.hidden=true;return}
  /* the card's own gates run first (evGate / j95 actor gate / clash filter may drop or replace it): only a card that is really shown gets its scene */
  const r=s0.apply(this,arguments);try{const m=Q[0];if(!M||M.hidden||!m||!dlgsOn()||!S||S.dead)return r;const d=dlgsFor(m);
   if(d&&!d.done){d.done=1;M.hidden=true;dlgsPlay(d,()=>{if(Q[0]===m){M.hidden=false;const f=M.querySelector(".opt:not(:disabled),#mclose");if(f)f.focus({preventScroll:true})}else if(Q.length)showModal()})}}catch(e){console.error(e)}
  return r};window.showModal=showModal})();

/* ---------- family adapters (each resolves its OWN cast: law 6b) ---------- */
/* shared: roles → people of a family actor table (A6 / q72A actors {k,o,n}); {goi}/{xung} said by the line's speaker to the listener (jvoice kSay) */
function dlgsActor(a,nm){if(!a)return null;if(a===S)return dlgsMe();
 /* Thái hậu / Hoàng thượng: figFor picks their painting by kind (figRole), their actor object carries none → pass the kind (law 11: every th/emp scene) */
 if(a.k==="th"||a.k==="emp"){const o=a.k==="emp"?(S.emp||a.o):(S.thO||a.o);return dlgsPer({kind:a.k,ref:o||{},name:a.n},nm||a.n)}
 /* her grown child (j72 req ak): the kid painting set (kidFig), never figFor */
 if((a.k==="ak"||a.k==="kid")&&a.o){try{const src=typeof kidFigSrc==="function"?kidFigSrc(a.o):"";return src?{src,n:nm||a.n||a.o.name||""}:null}catch(e){return null}}
 return dlgsPer(a.f&&a.f.ref?a.f.ref:a.o,nm||a.n)}
function dlgsVoice(a){if(!a)return null;if(a===S)return S;try{return kSpk(a)||{srv:"f",name:a.n}}catch(e){return null}}
function dlgsCtx(act,fill,at){const maid=S.maid?{k:"maid",o:S.maid,n:S.maid.name}:null;const get=r=>r==="me"?S:r==="M"||r==="maid"?maid:act[r]||null;
 return{who:r=>dlgsActor(get(r)),txt:(t,a,b)=>{const v=dlgsVoice(get(a)),l=dlgsVoice(get(b));if(v&&l)t=kSay(v,l,t);return dlgsGen(fill(t))},at}}
/* the placeholders every family may use (validator GEN): {S} season, {E} Hoàng thượng, {M} her cung nữ — filled the same way for every family (law 11: a family fill that lacks one made the scene silently drop) */
function dlgsGen(t){try{const sea=SEASON[S.month-1];return String(t).replace(/\{S\}/g,sea.toLowerCase()).replace(/\{E\}/g,"Hoàng thượng").replace(/\{M\}/g,S.maid?S.maid.name:"cung nữ")}catch(e){return t}}
/* j72 việc nhờ (110 old templates + THIN P3 composed seeds): the offer card (pid q72o, pp.x). Unit id "j72:<seed id>" / "j72:<old tid>".
   Roles A requester · B second person · M her cung nữ. Place: A comes to where she is / she asked around (A's place). Default background = the place she stands (S.place). A family letter: L = M. */
function dlgsJ72Id(tid){return"j72:"+String(tid).replace(/^c:/,"")}
function dlgsJ72(x,how){const sp=dlgsGet(dlgsJ72Id(x.tid));if(!sp)return null;const X=q72X(x);if(!X)return null;
 const A=X.A&&X.A.k==="fam"?(S.maid?{k:"maid",o:S.maid,n:S.maid.name}:null):X.A;
 return dlgsResolve(sp,dlgsCtx({A,B:X.B},t=>q72Txt(t,X),how==="ask"?q72Home(X.A):null))}
DLGS.R.push({test:m=>m.pid==="q72o"&&m.pp&&m.pp.x,fn:m=>dlgsJ72(m.pp.x,m.pp.how)});
/* j68 composed decisions (THIN P4; pid "e68c:<seed id>", pp = the cast a0/a1). Roles A, B (the seed's), M. */
DLGS.R.push({test:m=>/^e68c:/.test(m.pid||""),fn:m=>{const sid=m.pid.slice(5),sp=dlgsGet("j68:"+sid);if(!sp)return null;const s=E68I["c:"+sid],sd=typeof J68C_SEEDS!=="undefined"&&J68C_SEEDS[sid];if(!s||!sd)return null;
 const X=e68X(s,m.pp||{});if(!X)return null;return dlgsResolve(sp,dlgsCtx({A:X.A,B:X.B},t=>e68Fill(j68cO(t,sd),X),null))}});
/* j7 composed intrigue (THIN P2; pid "j7c", pp.sid + pp.c cast). Roles = the seed's role ids (plotter, target, …) + maid. */
DLGS.R.push({test:m=>m.pid==="j7c"&&m.pp&&m.pp.sid,fn:m=>{const sp=dlgsGet("j7:"+m.pp.sid);if(!sp)return null;j7cSeeds();const sd=J7I[m.pp.sid];if(!sd)return null;const X=j7cActors(sd,m.pp.c||{});if(!X)return null;
 return dlgsResolve(sp,dlgsCtx(X,t=>j7cFill(t,X),null))}});
/* WAVE 2 — old j68 situations (EV6 tables j68e/f/g/q; card pid "e68<id>", pp = cast a0..a2 + vi). Unit "j68:<id>". Roles A B C (the EV6 slots a:[kinds], A6 real people) + M.
   Placeholders = the card's own: {A}{B}{C}{M}{S}{W}{P}{E}{it} (e68Fill). A unit with no person slot: L = M (her cung nữ brings it). */
DLGS.R.push({test:m=>{const p=m.pid||"";return /^e68/.test(p)&&!/^e68c:/.test(p)&&typeof E68I!=="undefined"&&!!E68I[p.slice(3)]},fn:m=>{const id=m.pid.slice(3),sp=dlgsGet("j68:"+id);if(!sp)return null;const s=E68I[id],pp=m.pp||{};
 const X=e68X(s,pp);if(!X)return null;const it=s.items&&pp.it!=null?s.items[pp.it%s.items.length]:null;
 return dlgsResolve(sp,dlgsCtx({A:X.A,B:X.B,C:X.C},t=>{t=e68Fill(t,X);return it!=null?t.replace(/\{it\}/g,it):t},null))}});
/* WAVE 2 — old j7 intrigue cards (ev() in j7.js + rcpMama jrcp.js; card pid = the ev id, pp = its params). Unit "j7:<ev id>".
   Cast per card = ONLY the people the card itself shows or names (law 6b); a hidden schemer (pp.a of poisongift / comet / fire, pp.v of doll / guardrumour /
   ghost / taster) is never cast. role → [A6 kind, pp key | null]. M (her cung nữ) is always there. Placeholder {<role>} = that person's name. */
const DLGS_J7O={doll:{},poisongift:{v:["rv","v"]},guardrumour:{},ghost:{},pact:{v:["rv","v"]},eunuch:{sv:["sv","sid"]},empnight:{emp:["emp",null]},minister:{emp:["emp",null]},
 jealousprince:{emp:["emp",null],kid:["kid","k"]},flood:{},newgirl:{},princefever:{kid:["kid","k"],doc:["doc",null]},foreignwed:{emp:["emp",null],kid:["kid","k"]},maidhostage:{v:["rv","v"]},
 doctorblack:{doc:["doc",null]},comet:{v:["rv","v"]},phoenix:{},doanngo:{},trungcuu:{emp:["emp",null]},vulan:{},dongchi:{},thbirthday:{th:["th",null]},caning:{v:["rv","v"]},condemnedmaid:{},
 coldvisit:{f:["rv","f"]},taster:{},letterhome:{},fire:{v:["rv","v"]},rvframe:{a:["rv","a"],b:["rv","b"]},rvquarrel:{a:["rv","a"],b:["rv","b"]},rvmusk:{a:["rv","a"],b:["rv","b"]},
 rvbribe:{a:["rv","a"],b:["rv","b"],ksp:["ksp",null]},rcpMama:{}};
DLGS.R.push({test:m=>!!(m.pid&&m.pid!=="j7c"&&DLGS_J7O[m.pid]&&typeof EVI!=="undefined"&&EVI[m.pid]),fn:m=>{const sp=dlgsGet("j7:"+m.pid);if(!sp)return null;const pp=m.pp||{},C=DLGS_J7O[m.pid],act={};
 for(const r in C){const[k,key]=C[r];if(key&&pp[key]==null)continue;const a=A6(k,key?pp[key]:null);if(a)act[r]=a}
 return dlgsResolve(sp,dlgsCtx(act,t=>String(t).replace(/\{(\w+)\}/g,(x,r)=>act[r]?act[r].n:x),null))}});
/* families whose card is built inside their own closure (j71c, jworldc) call this when they build it: id = unit id, act = their cast table */
function dlgsMk(id,act,fill,at){try{const sp=dlgsGet(id);return sp?dlgsResolve(sp,dlgsCtx(act||{},fill||(t=>t),at)):null}catch(e){console.error(e);return null}}
/* kỳ ngộ (jky + THIN P5 jkyc): the encounter card (pid "kyngo" with choices, or the no-choice card) of KY.cur; ONE scene per encounter. Role W = the person met. */
DLGS.R.push({test:m=>/^kyngo:/.test(m.evId||"")&&typeof KY!=="undefined"&&KY.cur&&m.evId==="kyngo:"+KY.cur.id&&!KY.cur.__dlg,fn:m=>{const c=KY.cur;c.__dlg=1;const w=c.W;if(!w)return null;
 /* law 6b: a hidden person (th_tham plotter, hide:1) is never shown or named; a W that is she herself is no second figure; kind maid (vat_minh) = her own cung nữ */
 if(w.hide||w.ref===S)return dlgsMk("ky:"+c.id,{},t=>t,null);if(w.kind==="maid"&&!w.ref){if(!S.maid)return null;return dlgsMk("ky:"+c.id,{W:{k:"maid",o:S.maid,n:S.maid.name,f:null}},t=>String(t).replace(/\{W\}/g,S.maid.name),null)}
 const n=c.wn||(typeof wName==="function"?wName(w):(w.ref&&w.ref.name)||"");const W={k:w.kind==="el"?"mama":w.kind,o:w.ref||w,n,f:null};
 return dlgsMk("ky:"+c.id,{W},t=>String(t).replace(/\{W\}/g,n),null)}});
/* j70 unit id: composed seed "j70:<seed id>"; old route "j70:<method>:<route>" (old route ids repeat across methods: tsv ×5, bup/thay/chu/son ×2) */
function dlgsJ70Id(p){const r=String(p.r||"");return /^j70c-/.test(r)?"j70:"+r:"j70:"+p.m+":"+r}
/* she saw the tell HERSELF on the spot (j70 goTo): no cung nữ report scene for that plot (law 6b: the scene must match who really saw it) */
if(typeof goTo==="function"){const g0=goTo;goTo=function(k){let pre=null;try{const z=typeof j70==="function"?j70():null;pre=z?new Set(z.pl.filter(p=>p.pend==="seen").map(p=>p.id)):null}catch(e){}
 const r=g0.apply(this,arguments);try{const z=pre&&j70();if(z)for(const p of z.pl)if(p.pend==="seen"&&!pre.has(p.id))p.dlgSelf=1}catch(e){}return r}}
/* j70 plots (51 routes + THIN P6 composed): her people saw a TELL of a plot aimed at her (pid "j70", stage "seen"); L = her cung nữ who saw it. Unit id "j70:<route id>". */
DLGS.R.push({test:m=>m.pid==="j70"&&m.pp&&m.pp.s==="seen",fn:m=>{const p=P70(m.pp.id);if(!p||pt70(p)!==S||!S.maid||p.dlgSelf)return null;return dlgsMk(dlgsJ70Id(p),{},t=>t,null)}});
try{window.DLGS=DLGS;window.dlgsResolve=dlgsResolve;window.dlgsPlay=dlgsPlay;window.dlgsGet=dlgsGet;window.dlgsMk=dlgsMk}catch(e){}
