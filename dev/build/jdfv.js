/* ================= jdfv: Dư đồ FOCUS VIEW — the controller (review/duodo-focus; owner OD 21/11 ~06:20Z / ~06:50Z / ~06:55Z) =================
   Glue only: kit part kitFocus (K-FOCUS-1) draws, jdf gives the acts + runs them, jdfg plays the on-figure games. Nothing here draws or holds a number.
   (1) THE STAGE TAP: a tap on a person on the place stage opens the focus view (she walks forward, map dims, head tabs = the card's groups, acts fan L/R).
       The old pop-up card stays the hidden source under it (popIdx = that person) so every existing handler, the log sync and co-op keep working.
   (2) AN ACT: locked → kitFocus shows the reason; class D (own flow: gift picker, jsgame, jpma) → that flow opens as it is; else the act's on-figure game
       (DF_ENG) plays in F.play() with «Làm luôn» = skip → dfRun(i,id,{raw|skipped}) → the result card / log as today + the reaction on the figure.
   (3) NPC-INITIATED (OD 06:55Z): a person card (Q) whose speaker stands with her at this place, while she looks at the place stage, plays in the SAME
       scene: the person walks in, the bottom SAY box carries the card text, «Tiếp» → the card's options fan out L/R; picking one = chooseM (the card's
       own code). A dodge inside it (jslap / jlooks slapGame {dodge}) is played ON the figure (swipe dodge: strike the incoming hand away) and hands its
       mark back to slapGame's own onDone — the dodge rule (one tier lower, nhẹ = miss) is unchanged.
   Off when BAL.df.on = 0, under bots, or before the kit part exists (dfViewOn). ===================================================== */
function dfFig(i){const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);return t?(t.querySelector("img.figimg")||t):null}
/* the focus needs HER stage figure picture (people in the «+N» overflow have no token / picture): without one the old pop-up / centre card is used, never an empty frame */
function dfHasFig(i){const f=dfFig(i);return !!(f&&f.tagName==="IMG"&&(f.currentSrc||f.getAttribute("src")))}
function dfFigBox(F,layer){/* the figure box inside the play layer (CSS px) */
 try{const fr=(F.figRect?F.figRect():null)||(F.figEl&&F.figEl.getBoundingClientRect()),lr=layer.getBoundingClientRect();if(fr)return{x:fr.left-lr.left,y:fr.top-lr.top,w:fr.width,h:fr.height}}catch(e){}
 return{x:layer.clientWidth/4,y:0,w:layer.clientWidth/2,h:layer.clientHeight}}
function dfData(i){return (dfActs(i)||[]).map(g=>({k:g.k,n:g.n,can:g.can,tot:g.tot,acts:g.acts.map(a=>({id:a.id,n:a.n,pic:a.pic,word:a.word,ton:a.ton,off:a.off,why:a.why,info:a.info}))}))}
/* kitFocus API glue (K-FOCUS-1, review/kit-focus): hud(mark "n/10", clock "N giây"); groups refresh; the play layer + «Làm luôn» (kit kitQuick in the kit HUD strip) + the kit back «◂» = cancel, no act */
function dfHud(F,o){try{const T=BAL.df.rawTop;if(!F||!o)return;F.hud(o.score!=null?o.score+"/"+T:null,o.time!=null?o.time+" giây":null)}catch(e){}}
function dfSetGroups(F,G){try{F.setGroups(G)}catch(e){}}
/* the kit play layer (K-FOCUS-1 r2): ONE kit skip button «Làm luôn» + ◂ = onBack (cancel, no act) — nothing drawn here */
function dfPlay(F,onSkip,onBack){return F.play({skip:{n:"Bỏ qua",sub:"kết quả thường, không tính điểm",onSkip},onBack})}
/* owner 24/11 ~22:02Z item 6: EVERY on-figure game first shows its rules (kit «Luật chơi» block, same words as the Điểm trang rules screen) and starts only on «Sẵn sàng» */
const DF_RULE={
 swipe:["Vuốt","Vòng đỏ lướt qua mặt nàng: vuốt ngón tay ngang qua nó, vuốt càng nhanh càng nặng tay.","Trúng và nhanh thì thành hẳn; hụt thì hỏng."],
 tug:["Chạm liên tục","Chạm nhanh để đẩy thanh lên đầy; nàng kéo ngược lại.","Thanh đầy trước khi kịp tụt thì thành."],
 bow:["Chạm đúng nhịp","Vòng khép dần quanh nàng: chạm đúng lúc vòng chuyển xanh, ba nhịp.","Đúng nhịp càng nhiều càng thành."],
 drag:["Kéo","Kéo vật vào đôi tay nàng đang đưa qua lại; thả đúng lúc tay ở vòng xanh.","Trúng giữa vòng thì trọn vẹn."],
 ear:["Giữ","Giữ ngón tay ở bên tai nàng; buông khi người bên cạnh liếc sang (thanh đỏ), giữ lại khi họ quay đi.","Giữ đủ lâu mà không bị bắt gặp thì thành."],
 words:["Chạm dấu ✓","Dấu trôi lên: chạm dấu ✓ xanh (lời hợp ý), tránh dấu ✗ đỏ (lời hỏng).","Chạm đúng nhiều dấu ✓ thì thành; chạm nhầm dấu ✗ thì mất điểm."],
 stare:["Giữ ngón tay","Giữ ngón tay để thanh áp lực nằm trong dải xanh; nàng đẩy lại nên buông và giữ cho khéo.","Ở trong dải xanh càng lâu càng thành."]};
function dfIntro(layer,a,onGo){try{const R=DF_RULE[a.eng]||DF_RULE.words;const nm=String(a.n||"").replace(/<[^>]+>/g,"");
 const rows=[["Việc",nm,"t"],["Chạm",R[1],"t"],["Được",R[2],"t"]];
 const el=document.createElement("div");el.className="kgr dfintro";el.style.cssText="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(88%,460px);max-height:90%;display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px;z-index:3;overflow:auto;box-sizing:border-box;background:var(--paper,#f6eedc);color:var(--ink,#3b2a1c);border:1px solid var(--gold,#c99a1e);border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.35)";
 el.innerHTML=`<h4 class="kpst">Luật chơi · ${R[0]}</h4>${kg82Rows(rows)}<button type="button" class="${kg82Btn(false)} kgr-go dfgo">Sẵn sàng<small>bắt đầu chơi</small></button>`;
 layer.appendChild(el);const b=el.querySelector(".dfgo");b.onclick=e=>{e.stopPropagation();el.remove();onGo()};return el}catch(e){return null}}
function dfUnplay(F){try{if(F.playing)F.endPlay()}catch(e){}}
function dfLast(){try{const t=document.getElementById("rtoast");return t&&t.classList.contains("on")?t.innerText.trim().split("\n")[0]:""}catch(e){return""}}
/* the focus holds the PERSON (DF.p), never a frozen index: S.visit.people can shift while it is up (co-op refreshHere unshifts the Emperor,
   people leave); her index is looked up at every use, and if she is gone the focus closes (rv duodo-focus 43bc4ba2 #1) */
function dfSame(a,b){return !!a&&!!b&&(a===b||(!!a.ref&&a.ref===b.ref)||(!a.ref&&!b.ref&&a.kind===b.kind&&a.name===b.name))}
function dfIdx(p){p=p||DF.p;if(!p)return -1;try{return curPeople().findIndex(x=>dfSame(x,p))}catch(e){return -1}}
function dfGone(){const F=DF.F;if(F){try{F.close()}catch(e){try{F.destroy()}catch(x){}}}else dfClosed(DF.tk)}
function dfHere(){const k=dfIdx();if(k<0){dfGone();return -1}DF.i=k;popIdx=k;return k}
function dfOpen(i){const p=curPeople()[i];if(!p)return false;if(!dfViewOn()||!dfHasFig(i)){popIdx=i;popMsg="";renderStage();return false}
 /* kitFocus.open destroys the focus already up (e.g. an NPC encounter): its onClose must not clear THIS one — each open has its own token */
 const fig=dfFig(i);const tk={};DF.tk=tk;DF.encM=null;DF.p=p;DF.i=i;popIdx=i;popMsg="";renderStage();
 DF.F=kitFocus.open({p,person:p,fig,from:fig&&fig.getBoundingClientRect(),groups:dfData(i),onAct:id=>dfTap(id),onClose:()=>dfClosed(tk)});return true}
function dfClosed(tk){if(DF.tk!==tk)return;const i=DF.i;DF.i=null;DF.p=null;DF.F=null;DF.tk=null;DF.encM=null;if(popIdx===i){popIdx=null;popMsg=""}try{renderStage()}catch(e){}}
function dfFind(i,id){for(const g of dfActs(i)||[])for(const a of g.acts)if(a.id===id)return a;return null}
function dfTap(id){const F=DF.F;if(!F||S.dead||Q.length||DF.play)return;const i=dfHere();if(i<0)return;const a=dfFind(i,id);if(!a||a.off)return;
 /* run = the act on HER index at the moment it lands (the game takes seconds; the list may shift meanwhile) */
 const run=res=>{const j=dfHere();if(j<0)return;dfRun(j,id,res);dfAfter(a,res)};
 if(a.cls==="D"){run();return}
 const layer=dfPlay(F,()=>{if(DF.play)DF.play.skip()},()=>{const h=DF.play;DF.play=null;if(h)h.destroy()});if(!layer){run();return}
 const go=()=>{DF.play=dfGame(a.eng,{box:layer,fig:dfFigBox(F,layer),rank:typeof rkOf==="function"?rkOf(S):S.rank,at:/Ngáng chân/.test(a.n)?"feet":null,hud:o=>dfHud(F,o),
  onDone:res=>{DF.play=null;dfUnplay(F);run(res)}});
  if(!DF.play){dfUnplay(F);run()}};
 /* intro first: DF.play is a stub (skip = the quick result) until «Sẵn sàng» */
 DF.play={skip(){DF.play=null;dfUnplay(F);run({raw:null,skipped:true})},destroy(){}};
 if(!dfIntro(layer,a,()=>{DF.play=null;go()})){DF.play=null;go()}}
function dfAfter(a,res){const F=DF.F;if(!F)return;const i=dfIdx();if(i<0){dfGone();return}try{const ln=dfLast();F.react({line:ln?ln.slice(0,BAL.df.reactChars):"",seal:true})}catch(e){}dfSetGroups(F,dfData(i))}
/* the old pop-up stays hidden under the focus view (the global [hidden] rule; no CSS of its own) */
(function(){const r0=renderStage;renderStage=function(){if(DF.p&&DF.F&&!DF.play){const k=dfIdx();if(k<0){setTimeout(()=>{if(DF.p&&dfIdx()<0)dfGone()},0)}else{DF.i=k;popIdx=k}}
 const r=r0.apply(this,arguments);try{const w=document.getElementById("popw");if(w)w.hidden=DF.i!=null}catch(e){}return r}})();
/* (1) the stage tap: capture before j6's #stage handler (which would open the pop-up) */
document.addEventListener("click",e=>{try{if(!dfViewOn()||typeof S==="undefined"||!S||S.dead||Q.length)return;const b=e.target.closest&&e.target.closest("#tokens .tok[data-p]");if(!b)return;
 e.stopPropagation();e.preventDefault();dfOpen(+b.dataset.p)}catch(x){}},true);
/* (3) NPC-initiated: the top person card whose speaker stands here */
function dfWhoIdx(m){try{const w=m&&m.who&&m.who.w;if(!w||w[0]!=="r")return -1;return curPeople().findIndex(p=>p.ref&&p.ref.id===w[1])}catch(e){return -1}}
function dfEncOn(){return dfViewOn()&&BAL.df.npc&&typeof tab!=="undefined"&&tab==="act"&&!!S&&!!S.visit&&!S.out}
(function(){const s0=showModal;showModal=function(){const m=Q[0];/* the same card is already playing in the scene (say / choices): a repeated showModal (render, timers) keeps the centre modal hidden */
 if(m&&m.dfSeen&&DF.encM===m&&DF.F){try{const M=document.getElementById("modal");if(M)M.hidden=true}catch(e){}return undefined}const i=m&&!m.dfSeen&&m.opts&&m.opts.length&&dfEncOn()?dfWhoIdx(m):-1;if(i<0||!dfHasFig(i))return s0.apply(this,arguments);
 m.dfSeen=1;DF.encM=m;const p=curPeople()[i],fig=dfFig(i);try{const M=document.getElementById("modal");if(M)M.hidden=true}catch(e){}
 if(DF.F&&!dfSame(DF.p,p)){const o=DF.F;DF.F=null;DF.tk=null;try{o.destroy()}catch(e){}}DF.p=p;DF.i=i;popIdx=i;let F=DF.F;if(!F){const tk={};DF.tk=tk;F=kitFocus.open({p,person:p,fig,from:fig&&fig.getBoundingClientRect(),groups:[],encounter:true,onAct:id=>dfTap(id),onClose:()=>dfClosed(tk)})}DF.F=F;
 const txt=String(m.h||"").replace(/<\/p>\s*<p[^>]*>/g,"\n").replace(/<[^>]+>/g,"").split("\n").map(s=>s.trim()).filter(Boolean);
 const nm=(typeof k61Named!=="function"||k61Named(p.ref))?(p.ref.name||p.name||""):"";/* fog (j61): a stranger's name is not on the say box */
 F.say(txt.map(t=>({who:nm,face:nm?p.ref:null,text:t})),{onDone:()=>F.choices(m.opts.map((o,k)=>({id:"m"+k,n:o.n,pic:dfPic(o.n),off:!!o.off,why:dfTxt(o.x)})),id=>{const k=+String(id).slice(1);DF.enc=1;DF.encM=null;try{chooseM(k)}finally{DF.enc=0}const j=dfIdx(p);if(j<0){dfGone();return}dfSetGroups(F,dfData(j))})});
 return undefined}})();
/* a dodge inside an encounter: played on the figure, the mark goes back to slapGame's own onDone (jslap / jlooks rules unchanged) */
(function(){if(typeof slapGame!=="function")return;const g0=slapGame;slapGame=function(o){if(!o||!o.dodge||!DF.F||DF.i==null||typeof window.__bot!=="undefined")return g0.apply(this,arguments);
 const F=DF.F;let backed=false;const layer=dfPlay(F,()=>{if(DF.play)DF.play.skip()},()=>{backed=true;if(DF.play)DF.play.skip()});if(!layer)return g0.apply(this,arguments);
 DF.play=dfGame("swipe",{box:layer,fig:dfFigBox(F,layer),rank:typeof rkOf==="function"&&o.by?rkOf(o.by):0,dodge:true,hud:x=>dfHud(F,x),
  onDone:res=>{DF.play=null;dfUnplay(F);const R=BAL.slap.raw;try{o.onDone(res.skipped?{raw:0,skipped:true}:{raw:res.raw>=BAL.df.swipe.mid[1]?R[3]:0,skipped:false})}catch(e){console.error(e)}}});
 if(!DF.play)return g0.apply(this,arguments)};window.slapGame=slapGame})();
window.dfOpen=dfOpen;window.dfTap=dfTap;window.dfIdx=dfIdx;window.dfHere=dfHere;
/* (4) MOOD BUBBLES on the place stage (owner OD 06:50Z «idle animations + mood bubbles»): kit parts kitIdle (CSS, the kit applies it) + kitMoodSay (K-FOCUS-1b).
   Rare (BAL.df.idle), one person whose feeling she may see (jemo emoKnown) and who is not calm, a short cổ trang line for that feeling (VANPHONG; no emoji). */
const DF_MOOD={vui:["Hôm nay lòng thật nhẹ nhõm.","Hoa nở đẹp quá."],buon:["Chuyện cũ cứ vương vấn mãi.","Lòng nặng trĩu."],gian:["Hừ, chớ để ta gặp lại kẻ ấy.","Thật tức chết đi được."],
 so:["Nơi này sao lạnh lẽo thế.","Mong mọi chuyện bình yên."],ghen:["Người ta được sủng ái thật.","Sao lại là nàng ấy chứ."],lo:["Không biết rồi sẽ ra sao.","Lòng cứ thấp thỏm không yên."]};
function dfMoodPick(){try{const P=curPeople();const L=[];P.forEach((p,i)=>{const v=p.ref;if(!v||typeof emoGet!=="function")return;if(typeof emoKnown==="function"&&!emoKnown(v))return;
  const e=emoGet(v);const g=typeof feelGrp==="function"?feelGrp(e.k):e.k;if(!e||e.k==="binh"||!DF_MOOD[g])return;const f=dfFig(i);if(f)L.push({i,f,g})});
 if(!L.length)return null;const x=L[Math.floor(Math.random()*L.length)];const T=DF_MOOD[x.g];return{fig:x.f,text:T[Math.floor(Math.random()*T.length)],i:x.i}}catch(e){return null}}
function dfMoodNext(first){const I=BAL.df.idle;return first?I.first:I.every[0]+Math.random()*(I.every[1]-I.every[0])}
(function(){let tm=0,plc=null;const tick=()=>{tm=0;try{if(typeof kitMoodSay==="function"&&typeof S!=="undefined"&&S&&!S.dead&&!Q.length&&DF.i==null&&!DF.play&&typeof tab!=="undefined"&&tab==="act"&&S.visit&&typeof window.__bot==="undefined"){
  const x=dfMoodPick();if(x)kitMoodSay(x.fig,x.text,{p:curPeople()[x.i].ref})}}catch(e){}arm(false)};
 const arm=first=>{if(tm)clearTimeout(tm);tm=setTimeout(tick,dfMoodNext(first))};
 const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{if(S&&S.place!==plc){plc=S.place;arm(true)}}catch(e){}return r}})();
window.dfMoodPick=dfMoodPick;
/* robot10 nc-fix (text over text, Fold story / rel tabs): the focus layer and the mood bubble are drawn on #game over the STAGE, but a tap on another
   tab (the tab bar stays free under the focus) left them standing over that tab's panel. They belong to «Hành sự» only: hidden while another tab
   is up (the open focus — a talk, an encounter or a mini-game on it — comes back as it was when she returns), the short mood bubble just goes. */
function dfTabLayers(){try{const off=typeof tab!=="undefined"&&tab!=="act";const F=typeof kitFocus==="object"&&kitFocus&&kitFocus.current?kitFocus.current():null;
 if(F&&F.el&&F.open){if(F.el.hidden!==off){F.el.hidden=off;if(!off&&kitFocus.reposition)kitFocus.reposition()}}
 if(off)document.querySelectorAll("#game>.kfoc-mood,body>.kfoc-mood").forEach(b=>b.remove())}catch(e){console.error("dfTabLayers",e)}}
(function(){const r0=window.renderPanel;if(typeof r0!=="function")return;window.renderPanel=renderPanel=function(){const r=r0.apply(this,arguments);dfTabLayers();return r}})();/* renderPanel: every tab change draws the panel (render() and the j63 log jump) */
window.dfTabLayers=dfTabLayers;
