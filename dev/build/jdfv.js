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
function dfFigBox(F,layer){/* the figure box inside the play layer (CSS px) */
 try{const fr=(F.figRect?F.figRect():null)||(F.figEl&&F.figEl.getBoundingClientRect()),lr=layer.getBoundingClientRect();if(fr)return{x:fr.left-lr.left,y:fr.top-lr.top,w:fr.width,h:fr.height}}catch(e){}
 return{x:layer.clientWidth/4,y:0,w:layer.clientWidth/2,h:layer.clientHeight}}
function dfData(i){return (dfActs(i)||[]).map(g=>({k:g.k,n:g.n,can:g.can,tot:g.tot,acts:g.acts.map(a=>({id:a.id,n:a.n,pic:a.pic,word:a.word,ton:a.ton,off:a.off,why:a.why,info:a.info}))}))}
/* kitFocus API glue (K-FOCUS-1, review/kit-focus): hud(mark "n/10", clock "N giây"); groups refresh; the play layer + «Làm luôn» (kit kitQuick in the kit HUD strip) + the kit back «◂» = cancel, no act */
function dfHud(F,o){try{const T=BAL.df.rawTop;if(!F||!o)return;F.hud(o.score!=null?o.score+"/"+T:null,o.time!=null?o.time+" giây":null)}catch(e){}}
function dfSetGroups(F,G){try{if(typeof F.setGroups==="function")return F.setGroups(G);F.groups=G;const k=F.group;F.group=null;F.setGroup(G.some(g=>g.k===k)?k:(G[0]||{}).k)}catch(e){}}
function dfPlay(F,onSkip,onBack){const L=F.play();if(!L)return null;try{const h=F.el&&F.el.querySelector(".kfoc-hud");if(h&&typeof kitQuick==="function"&&!h.querySelector("#dfskip")){h.insertAdjacentHTML("beforeend",kitQuick({id:"dfskip",n:"Làm luôn",sub:"không chơi: như thường"}));
  h.querySelector("#dfskip").onclick=e=>{e.stopPropagation();onSkip()}}
 const x=F.el&&F.el.querySelector(".kfoc-x");if(x){const f=e=>{x.removeEventListener("click",f,true);if(DF.play){onBack()}};x.addEventListener("click",f,true)}}catch(e){}return L}
function dfUnplay(F){try{const b=F.el&&F.el.querySelector("#dfskip");if(b)b.remove()}catch(e){}try{F.endPlay()}catch(e){}}
function dfLast(){try{const t=document.getElementById("rtoast");return t&&t.classList.contains("on")?t.innerText.trim().split("\n")[0]:""}catch(e){return""}}
function dfOpen(i){const p=curPeople()[i];if(!p)return false;if(!dfViewOn()){popIdx=i;popMsg="";renderStage();return false}
 const fig=dfFig(i);DF.i=i;popIdx=i;popMsg="";renderStage();
 DF.F=kitFocus.open({p:p.ref||p,person:p,fig,from:fig&&fig.getBoundingClientRect(),groups:dfData(i),onAct:id=>dfTap(i,id),onClose:()=>dfClosed(i)});return true}
function dfClosed(i){if(DF.i!==i)return;DF.i=null;DF.F=null;if(popIdx===i){popIdx=null;popMsg=""}try{renderStage()}catch(e){}}
function dfFind(i,id){for(const g of dfActs(i)||[])for(const a of g.acts)if(a.id===id)return a;return null}
function dfTap(i,id){const F=DF.F,a=dfFind(i,id);if(!F||!a||a.off||S.dead||Q.length||DF.play)return;
 if(a.cls==="D"){dfRun(i,id);dfAfter(i,a,null);return}
 const layer=dfPlay(F,()=>{if(DF.play)DF.play.skip()},()=>{const h=DF.play;DF.play=null;if(h)h.destroy();try{const b=F.el.querySelector("#dfskip");if(b)b.remove()}catch(e){}});if(!layer){dfRun(i,id);dfAfter(i,a,null);return}
 DF.play=dfGame(a.eng,{box:layer,fig:dfFigBox(F,layer),rank:typeof rkOf==="function"?rkOf(S):S.rank,at:/Ngáng chân/.test(a.n)?"feet":null,hud:o=>dfHud(F,o),
  onDone:res=>{DF.play=null;dfUnplay(F);dfRun(i,id,res);dfAfter(i,a,res)}});
 if(!DF.play){dfUnplay(F);dfRun(i,id);dfAfter(i,a,null)}}
function dfAfter(i,a,res){const F=DF.F;if(!F||DF.i!==i)return;try{const ln=dfLast();F.react({line:ln?ln.slice(0,BAL.df.reactChars):"",seal:true})}catch(e){}dfSetGroups(F,dfData(i))}
/* the old pop-up stays hidden under the focus view (the global [hidden] rule; no CSS of its own) */
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const w=document.getElementById("popw");if(w)w.hidden=DF.i!=null}catch(e){}return r}})();
/* (1) the stage tap: capture before j6's #stage handler (which would open the pop-up) */
document.addEventListener("click",e=>{try{if(!dfViewOn()||typeof S==="undefined"||!S||S.dead||Q.length)return;const b=e.target.closest&&e.target.closest("#tokens .tok[data-p]");if(!b)return;
 e.stopPropagation();e.preventDefault();dfOpen(+b.dataset.p)}catch(x){}},true);
/* (3) NPC-initiated: the top person card whose speaker stands here */
function dfWhoIdx(m){try{const w=m&&m.who&&m.who.w;if(!w||w[0]!=="r")return -1;return curPeople().findIndex(p=>p.ref&&p.ref.id===w[1])}catch(e){return -1}}
function dfEncOn(){return dfViewOn()&&BAL.df.npc&&typeof tab!=="undefined"&&tab==="act"&&!!S.visit&&!S.out}
(function(){const s0=showModal;showModal=function(){const m=Q[0];const i=m&&!m.dfSeen&&m.opts&&m.opts.length&&dfEncOn()?dfWhoIdx(m):-1;if(i<0)return s0.apply(this,arguments);
 m.dfSeen=1;const p=curPeople()[i],fig=dfFig(i);try{const M=document.getElementById("modal");if(M)M.hidden=true}catch(e){}
 if(DF.F&&DF.i!==i){try{DF.F.destroy()}catch(e){}DF.F=null}DF.i=i;
 const F=DF.F||kitFocus.open({p:p.ref,person:p,fig,from:fig&&fig.getBoundingClientRect(),groups:[],encounter:true,onAct:id=>dfTap(i,id),onClose:()=>dfClosed(i)});DF.F=F;
 const txt=String(m.h||"").replace(/<\/p>\s*<p[^>]*>/g,"\n").replace(/<[^>]+>/g,"").split("\n").map(s=>s.trim()).filter(Boolean);
 const nm=(typeof k61Named!=="function"||k61Named(p.ref))?(p.ref.name||p.name||""):"";/* fog (j61): a stranger's name is not on the say box */
 F.say(txt.map(t=>({who:nm,face:nm?p.ref:null,text:t})),{onDone:()=>F.choices(m.opts.map((o,k)=>({id:"m"+k,n:o.n,pic:dfPic(o.n),off:!!o.off,why:o.x||""})),id=>{const k=+String(id).slice(1);DF.enc=1;try{chooseM(k)}finally{DF.enc=0}dfSetGroups(F,dfData(i))})});
 return undefined}})();
/* a dodge inside an encounter: played on the figure, the mark goes back to slapGame's own onDone (jslap / jlooks rules unchanged) */
(function(){if(typeof slapGame!=="function")return;const g0=slapGame;slapGame=function(o){if(!o||!o.dodge||!DF.F||DF.i==null||typeof window.__bot!=="undefined")return g0.apply(this,arguments);
 const F=DF.F;let backed=false;const layer=dfPlay(F,()=>{if(DF.play)DF.play.skip()},()=>{backed=true;if(DF.play)DF.play.skip()});if(!layer)return g0.apply(this,arguments);
 DF.play=dfGame("swipe",{box:layer,fig:dfFigBox(F,layer),rank:typeof rkOf==="function"&&o.by?rkOf(o.by):0,dodge:true,hud:x=>dfHud(F,x),
  onDone:res=>{DF.play=null;dfUnplay(F);const R=BAL.slap.raw;try{o.onDone(res.skipped?{raw:0,skipped:true}:{raw:res.raw>=BAL.df.swipe.mid[1]?R[3]:0,skipped:false})}catch(e){console.error(e)}}});
 if(!DF.play)return g0.apply(this,arguments)};window.slapGame=slapGame})();
window.dfOpen=dfOpen;window.dfTap=dfTap;
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
