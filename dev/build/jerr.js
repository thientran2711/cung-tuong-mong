/* jerr.js — ERRAND SCENE (owner OD 18/11 ~20:05Z, review/errand-scene; MOTION.md "Sai người đi").
   Owner: "khi tôi bấm cho cung nữ đi dò la … kết quả xuất hiện liền … phải thấy cái hình con nhỏ đi ra khỏi sân khấu … rồi khi nó về tôi thấy nó đi về,
   nó mang tin báo tới". The TIME RULE STAYS (an errand costs its khắc, the report is for the next khắc). This file only ADDS the picture:
     (1) the runner (the servant she sends, else her maid) walks OFF the stage (to the left);
     (2) a short beat while the khắc clock ticks (HUD redraw) with ONE kit notice pill `kitLine` («đang đi dò la…», wording per errand: ERRV);
     (3) she walks back ON;
     (4) then the report card (the render / dialog the action already asked for, held until now with the jrbatch hold RB).
   Nothing is computed twice: the action runs once, as before (no double charge); render()/showModal() are only DEFERRED (RB.d) until the scene ends.
   ~2.3 s, tap anywhere = skip, reduced motion / Gọn / bots / co-op / servant road = no walking (a still pill beat only, or nothing).
   Ledger (law 6b): S.roster.P[<runner id>][khắc spent] = ["ngoai","errand",…] so the book / audits show her away during that khắc.
   KIT: motion layer `.kmfly.kmerr` (cleaned by kmReset like every kit fly layer), notice = kitLine (§42.2); no private frame or chip. */
(function(){
const ER=window.ERR={live:null,n:0,skips:0,h:0,defer:[]};
/* wording per errand (VANPHONG: cổ trang, no %, no odds numbers). Key = ACT key or a named flow. Harm acts all read as a quiet errand. */
const ERRV={spy:"dò la",ally:"đưa lời kết giao",bribe:"mua chuộc người",bribel:"đưa quà lót tay",block:"lo việc thẻ bài",blockf:"nhờ ơn người quen",rumor:"rỉ tai tin đồn",lygian:"gieo lời ly gián",
 tocao:"đưa chứng cứ tố tội",expose:"đưa tin tư tình",xinhh:"dâng lời lên Hoàng hậu",laydo:"lấy đồ",laydol:"lấy đồ",plant:"cài đồ",petcare:"chăm thú nuôi",
 scout:"dò nơi ở",invite:"đưa lời mời",letter:"gửi thư, quà",tdgift:"biếu quà, đưa thư",kin:"dò hỏi gia thế"};
/* acts where she goes HERSELF (no servant leaves): jecon spyk "Tự đi dò la" */
const ERR_SELF=["spyk"];ER.self=ERR_SELF;
const ERRV_DEFAULT="làm việc kín";
function errWord(k){return "đang đi "+(ERRV[k]||ERRV_DEFAULT)+"…"}
window.errWord=errWord;
const MS0={off:650,beat:1000,on:650};/* ~2.3 s; ERR.slow multiplies it (tests take mid-scene frames) */
function MSv(){const k=ER.slow||1;return{off:MS0.off*k,beat:MS0.beat*k,on:MS0.on*k}}
function errReduced(){try{return typeof kmReduced==="function"?kmReduced():false}catch(e){return false}}
function errCan(){try{return !!(typeof S!=="undefined"&&S&&!S.dead&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)&&!(window.COOPW&&COOPW.on)&&!(typeof isSrv==="function"&&isSrv())&&typeof RB==="object"&&typeof kmOn==="function"&&kmOn())}catch(e){return false}}
/* the runner = the servant the game sends (bestSent) else her maid; her stage token by name */
function errRunner(){let sv=null;try{sv=typeof bestSent==="function"?bestSent(S):null}catch(e){}return sv||S.maid||null}
function errTok(sv){const tk=document.getElementById("tokens");if(!tk||!sv)return null;const t=[...tk.querySelectorAll(".tok.fig")].find(x=>{const g=x.querySelector(".tag");return g&&g.textContent.includes(sv.name)&&x.offsetParent!==null});return t||null}
/* law 6b ledger: she is away during the khắc(s) the errand took */
function errAway(sv,n){try{if(!sv||typeof j95on!=="function"||!j95on()||!S.roster||!S.roster.P)return;const id=sv===S.maid?"mm:me":"s"+sv.sid;const e=S.roster.P[id];if(!e)return;const end=Math.min(3,Math.max(0,(typeof used==="number"?used:0)-1));const from=Math.max(0,end-Math.max(1,n||1)+1);
  for(let i=from;i<=end;i++)if(e[i])e[i]=["ngoai","errand",null,"đi việc cho chủ"]}catch(e){}}
function errCss(){if(document.getElementById("kerr-css"))return;const s=document.createElement("style");s.id="kerr-css";s.textContent=`
.kmerr-shield{position:fixed;inset:0;z-index:2147483000;background:transparent;touch-action:manipulation}
.kmerr-lay{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:40}
.kmerr-fig{position:absolute;will-change:transform;pointer-events:none;transition:transform var(--kme-off,650ms) cubic-bezier(.5,0,.8,.6)}
.kmerr-fig.on{transition:transform var(--kme-on,650ms) cubic-bezier(.2,.5,.4,1)}
.pip.kmerr-tick{display:inline-block;animation:kmerrtick .7s ease-out 1}
@keyframes kmerrtick{0%{transform:scale(1);color:inherit}35%{transform:scale(1.5);color:#b8860b}100%{transform:scale(1);color:inherit}}
.kmerr-fig img{display:block;width:100%;height:100%;object-fit:contain;transform-origin:50% 100%;animation:kmerrbob .32s ease-in-out infinite}
.kmerr-fig.still img{animation:none}
@keyframes kmerrbob{0%,100%{transform:translateY(0) rotate(-.8deg)}50%{transform:translateY(-6px) rotate(.8deg)}}
`;document.head.appendChild(s)}
/* hold render()/showModal() with the jrbatch counter until the scene is over (the action already ran once; the report is only deferred) */
function errHold(){RB.d++;ER.h++;let done=false;return function(){if(done)return;done=true;RB.d--;ER.h--;if(RB.d===0){const s=RB.s,p=RB.p;RB.s=RB.p=0;try{if(s)showModal()}catch(e){console.error(e)}try{if(p)render()}catch(e){console.error(e)}}
  if(ER.h===0)while(ER.defer.length){const a=ER.defer.shift();try{resultShow.apply(null,a)}catch(e){console.error(e)}}}}
/* the act result card (#rtoast, resultShow) is drawn by the action itself, not by render(): it is the REPORT, so it waits for the scene too */
{const rs0=resultShow;resultShow=function(){if(ER.h>0){ER.defer.push(Array.prototype.slice.call(arguments));return}return rs0.apply(this,arguments)}}
function errClean(L){try{if(L.shield)L.shield.remove();if(L.lay)L.lay.remove();if(L.tok)L.tok.style.visibility=""}catch(e){}}
function errPlay(spec,rel){
  const L=ER.live={rel,shield:null,lay:null,tok:null,timers:[],gen:typeof kmGen==="number"?kmGen:0};ER.n++;
  const fin=()=>{if(ER.live!==L)return;ER.live=null;L.timers.forEach(clearTimeout);errClean(L);rel()};L.fin=fin;
  const after=(ms,f)=>{L.timers.push(setTimeout(()=>{if(ER.live===L)try{f()}catch(e){console.error(e);fin()}},ms))};
  L.timers.push(setTimeout(fin,6000*(ER.slow||1)));/* watchdog: never keep the screen held */
  const sh=document.createElement("div");sh.className="kmfly kmerr kmerr-shield";sh.setAttribute("aria-hidden","true");sh.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();ER.skips++;fin()},true);document.body.appendChild(sh);L.shield=sh;
  const MS=MSv();errCss();
  const tick=()=>{try{if(typeof renderHUD==="function")renderHUD()}catch(e){}try{document.querySelectorAll(".pip").forEach(e=>{e.classList.remove("kmerr-tick");void e.offsetWidth;e.classList.add("kmerr-tick")})}catch(e){}try{if(typeof kitLine==="function")kitLine(spec.line,MS.beat+200)}catch(e){}};
  const st=document.getElementById("stage"),tok=!errReduced()?errTok(spec.sv):null;
  if(!st||!tok){/* reduced motion / Gọn, or the runner is not on this stage: no walking, a still beat with the same pill and the same clock */
    tick();after(errReduced()?700:MS.beat,fin);return}
  const img=tok.querySelector(".figimg")||tok.querySelector("img");if(!img){tick();after(MS.beat,fin);return}
  const sr=st.getBoundingClientRect(),r=img.getBoundingClientRect(),sc=st.offsetWidth?sr.width/st.offsetWidth:1;
  const lay=document.createElement("div");lay.className="kmfly kmerr kmerr-lay";const fig=document.createElement("div");fig.className="kmerr-fig";
  fig.style.cssText=`--kme-off:${MS.off}ms;--kme-on:${MS.on}ms;left:${(r.left-sr.left)/sc}px;top:${(r.top-sr.top)/sc}px;width:${r.width/sc}px;height:${r.height/sc}px`;
  const c=document.createElement("img");c.src=img.currentSrc||img.src;c.alt="";c.draggable=false;fig.appendChild(c);lay.appendChild(fig);st.appendChild(lay);L.lay=lay;L.tok=tok;
  const out=-((r.right-sr.left)/sc+24);/* off the LEFT edge of the stage */
  tok.style.visibility="hidden";
  requestAnimationFrame(()=>requestAnimationFrame(()=>{if(ER.live!==L)return;fig.style.transform=`translateX(${out}px)`}));
  after(MS.off,()=>{c.parentNode.classList.add("still");tick();/* (2) beat: she is away, the khắc clock ticks */});
  after(MS.off+MS.beat,()=>{fig.classList.remove("still");fig.classList.add("on");fig.style.transform="translateX(0)";/* (3) walks back on */});
  after(MS.off+MS.beat+MS.on+60,fin)/* (4) the held report card is released */}
/* run an errand action once; if it really happened (the khắc moved or the Sổ ghi grew) play the scene before its report shows */
function errRun(fn,ctx,args,spec){
  if(ER.live||!errCan())return fn.apply(ctx,args);
  const u0=used,l0=S.logSeq||0,rel=errHold();let r;
  try{r=fn.apply(ctx,args)}catch(e){rel();throw e}
  if(!spec.always&&used===u0&&(S.logSeq||0)===l0&&!Q.length){rel();return r}
  const sv=errRunner();errAway(sv,spec.n);errPlay({line:errWord(spec.k),sv},rel);return r}
ER.run=errRun;
try{kmOnReset(()=>{ER.defer.length=0;if(ER.live)ER.live.fin()})}catch(e){}
/* ---- entry points (the scan table in dev/handover/reports/errand-scene.md lists every one) ---- */
{/* every ACT sent to someone elsewhere: runAct, the one gate for player acts (doAct, the card game, the picked plant / gift flows) */
 const r0=runAct;runAct=function(a,t,k,extra){if(a!==S||typeof together!=="function"||together(a,t)||ACT_NOSEND.includes(k)||ERR_SELF.includes(k)||(typeof sameHouse==="function"&&sameHouse(a,t)))return r0.apply(this,arguments);
  /* doAct already spent the khắc before runAct: this call IS the errand (always) */
  return errRun(r0,this,arguments,{k,n:(typeof BAL==="object"&&BAL.time&&BAL.time.cost&&BAL.time.cost.harm)||1,always:1})}}
{const f0=scout;scout=function(){return errRun(f0,this,arguments,{k:"scout",n:1})}}
{const f0=invite;invite=function(){return errRun(f0,this,arguments,{k:"invite",n:1})}}
/* her child far away: letter + gift (j54 h54Act "thu") and the in-law house gift (j55 tdAct "gift"); jht htAct is IIFE-local: not wrapped (see report) */
{const f0=h54Act;h54Act=function(a){return a==="thu"?errRun(f0,this,arguments,{k:"letter",n:1}):f0.apply(this,arguments)}}
{const f0=tdAct;tdAct=function(a){return a==="gift"?errRun(f0,this,arguments,{k:"tdgift",n:2}):f0.apply(this,arguments)}}
})();
