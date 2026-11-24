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
/* the card waits under the scene: showModal plays a card's scene first (once), keeps the modal hidden while it plays */
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){try{const M=$("modal");
  if(DLGS.playing){if(M)M.hidden=true;return}const m=Q[0];
  if(m&&m.dlg&&!m.dlg.done&&dlgsOn()&&S&&!S.dead){m.dlg.done=1;if(M)M.hidden=true;dlgsPlay(m.dlg,()=>{if(Q.length)showModal()});return}}catch(e){console.error(e)}
 return s0.apply(this,arguments)};window.showModal=showModal})();

/* ---------- family adapters (each resolves its OWN cast: law 6b) ---------- */
/* j72 việc nhờ (110 old templates + THIN P3 composed seeds): the offer card. Unit id = "j72:<seed id>" for a composed seed (tid "c:<id>"), "j72:<tid>" for an old one.
   Roles: A requester · B second person · M her cung nữ · me. Place: A comes to her palace (offer) / she asked around (A's place). */
function dlgsJ72Id(tid){return"j72:"+String(tid).replace(/^c:/,"")}
function dlgsJ72(x,how){try{const sp=dlgsGet(dlgsJ72Id(x.tid));if(!sp)return null;const X=q72X(x);if(!X)return null;
 const per=a=>a?dlgsPer(a.k==="fam"?S.maid:a.o,a.k==="fam"&&S.maid?S.maid.name:a.n):null;
 const mai=S.maid?{srv:"f",name:S.maid.name}:null,vo=r=>r==="me"?S:r==="A"?(X.A.k==="fam"?mai:kSpk(X.A)||{srv:"f"}):r==="B"?(X.B&&kSpk(X.B)):r==="M"?mai:null;
 return dlgsResolve(sp,{who:r=>r==="A"?per(X.A):r==="B"?per(X.B):r==="M"?(S.maid?dlgsPer(S.maid,S.maid.name):null):null,
  txt:(t,a,b)=>{const v=vo(a),l=vo(b);if(v&&l)t=kSay(v,l,t);return q72Txt(t,X)},at:how==="ask"?q72Home(X.A):"home"})}catch(e){console.error(e);return null}}
if(typeof q72Offer==="function"){const f0=q72Offer;q72Offer=function(x,how){const n0=Q.length;const r=f0.apply(this,arguments);try{if(r)dlgsAttach(n0,dlgsJ72(x,how),m=>m.t==="Việc nhờ")}catch(e){console.error(e)}return r};window.q72Offer=q72Offer}
try{window.DLGS=DLGS;window.dlgsResolve=dlgsResolve;window.dlgsPlay=dlgsPlay;window.dlgsGet=dlgsGet}catch(e){}
