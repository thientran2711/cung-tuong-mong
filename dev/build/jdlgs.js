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
 let bg="";try{const a=typeof kitPlaceArt==="function"?kitPlaceArt(spec.at||c.at||"home"):null;bg=a&&a.src||""}catch(e){}
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
function dlgsActor(a,nm){if(!a)return null;if(a===S)return dlgsMe();return dlgsPer(a.f&&a.f.ref?a.f.ref:a.o,nm||a.n)}
function dlgsVoice(a){if(!a)return null;if(a===S)return S;try{return kSpk(a)||{srv:"f",name:a.n}}catch(e){return null}}
function dlgsCtx(act,fill,at){const maid=S.maid?{k:"maid",o:S.maid,n:S.maid.name}:null;const get=r=>r==="me"?S:r==="M"||r==="maid"?maid:act[r]||null;
 return{who:r=>dlgsActor(get(r)),txt:(t,a,b)=>{const v=dlgsVoice(get(a)),l=dlgsVoice(get(b));if(v&&l)t=kSay(v,l,t);return fill(t)},at}}
/* j72 việc nhờ (110 old templates + THIN P3 composed seeds): the offer card (pid q72o, pp.x). Unit id "j72:<seed id>" / "j72:<old tid>".
   Roles A requester · B second person · M her cung nữ. Place: A comes to her palace / she asked around (A's place). A family letter: L = M. */
function dlgsJ72Id(tid){return"j72:"+String(tid).replace(/^c:/,"")}
function dlgsJ72(x,how){const sp=dlgsGet(dlgsJ72Id(x.tid));if(!sp)return null;const X=q72X(x);if(!X)return null;
 const A=X.A&&X.A.k==="fam"?(S.maid?{k:"maid",o:S.maid,n:S.maid.name}:null):X.A;
 return dlgsResolve(sp,dlgsCtx({A,B:X.B},t=>q72Txt(t,X),how==="ask"?q72Home(X.A):"home"))}
DLGS.R.push({test:m=>m.pid==="q72o"&&m.pp&&m.pp.x,fn:m=>dlgsJ72(m.pp.x,m.pp.how)});
/* j68 composed decisions (THIN P4; pid "e68c:<seed id>", pp = the cast a0/a1). Roles A, B (the seed's), M. */
DLGS.R.push({test:m=>/^e68c:/.test(m.pid||""),fn:m=>{const sid=m.pid.slice(5),sp=dlgsGet("j68:"+sid);if(!sp)return null;const s=E68I["c:"+sid],sd=typeof J68C_SEEDS!=="undefined"&&J68C_SEEDS[sid];if(!s||!sd)return null;
 const X=e68X(s,m.pp||{});if(!X)return null;return dlgsResolve(sp,dlgsCtx({A:X.A,B:X.B},t=>e68Fill(j68cO(t,sd),X),null))}});
/* j7 composed intrigue (THIN P2; pid "j7c", pp.sid + pp.c cast). Roles = the seed's role ids (plotter, target, …) + maid. */
DLGS.R.push({test:m=>m.pid==="j7c"&&m.pp&&m.pp.sid,fn:m=>{const sp=dlgsGet("j7:"+m.pp.sid);if(!sp)return null;j7cSeeds();const sd=J7I[m.pp.sid];if(!sd)return null;const X=j7cActors(sd,m.pp.c||{});if(!X)return null;
 return dlgsResolve(sp,dlgsCtx(X,t=>j7cFill(t,X),null))}});
try{window.DLGS=DLGS;window.dlgsResolve=dlgsResolve;window.dlgsPlay=dlgsPlay;window.dlgsGet=dlgsGet}catch(e){}
