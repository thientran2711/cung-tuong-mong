/* ================= jsmg: THE STEAL MINI-GAME (owner 16/11 ~22:20Z, PARKING_LOT row 3b; numbers BAL.steal.mg, jbal2) =================
   Owner: "nếu mà tôi win cái mini game đó thì sẽ tăng cái cơ hội tranh sủng của tôi lên một bậc. Từ 5 ăn 5 thua lên thành chắc hay cái gì đó,
   nói chung là lên một bậc. Tranh sủng với lại có hai option ... tranh sủng với lại chặn ngự giá đó."
   1. Before a Tranh sủng / Chặn ngự giá TRY the one who tries may play ONE short game: an EXISTING tài nghệ game (BAL.steal.mg.art: Hát for
      Tranh sủng, Múa for Chặn ngự giá) inside the KIT tài nghệ frame (j82 playArt → kg82Open / kitGameFrame), board set by mgTier occasion
      BAL.steal.mg.occ. raw ≥ BAL.steal.mg.win → THAT try's odds go up BAL.steal.mg.rung rung(s) on the word ladder (stealRungUp: BAL.odds.cut,
      the place inside the band kept, capped at Nắm chắc / BAL.odds.hi). Lose or skip ("Thôi, không chơi") → odds unchanged, nothing else lost.
      Already at Nắm chắc → no game (nothing to win).
   2. ONE odds path for everyone: the rung rides on oSteal(a, mode) (j8, the formula every try reads — her deck card, her person-menu act, the
      NPC stealNight, and review/balance-chain's nfOdds) through a per-try token; the token is made once per try and dropped when the try ends.
      NPCs (never the co-op friend, who plays her own game on her own seat): the same game "played" by the NPC roll every contest uses
      (kg82NpcRaw: BAL.mgTier.npc by her bậc in that art) against the same win line; BAL.steal.mg.npcP = chance an NPC plays at all.
   3. Words: the odds words come from word() (the ladder); no typed odds text, no %.
   4. Night rule of review/balance-chain (OD 16/11 22:45Z FINAL, jnf): when jnf is present, her pick "Tranh sủng" / "Chặn ngự giá" in the
      flip choice opens the game AFTER her 10-second choice and BEFORE the one resolve (S.nfX.st "mg" holds jnf's step; back to "open" after);
      NPC attackers roll at the resolve. Absent jnf → nothing of this part runs.
   Save: nothing new (tokens live in memory; a save made while the game is open reopens the choice step as "open", without the rung).
   ======================================================================================================================== */
(function(){
if(typeof oSteal!=="function"||typeof stealNight!=="function")return;
const M=()=>(BAL.steal&&BAL.steal.mg)||{};
const mo=m=>m==="road"?"road":"feign";
/* the word ladder moved n rungs UP, keeping the place inside the band (mirror of balance-chain jbalcore rungDown) */
function stealRungUp(o,n){const F=[0].concat(BAL.odds.cut),top=100;let i=0;for(let j=0;j<F.length;j++)if(o>=F[j])i=j;const lo=F[i],hi=i+1<F.length?F[i+1]:top;
 const t=Math.min(F.length-1,i+(n|0)),lo2=F[t],hi2=t+1<F.length?F[t+1]:top;
 return Math.min(BAL.odds.hi,Math.max(o,Math.min(t+1<F.length?hi2-1:top,Math.round(lo2+(o-lo)*(hi2-lo2)/Math.max(1,hi-lo)))))}
window.stealRungUp=stealRungUp;
const topRung=o=>oddsLv(o)>=BAL.odds.cut.length;
const ST=window.__smgSt=window.__smgSt||[];   /* measuring / tests only, never saved */
const stat=r=>{ST.push(r);if(ST.length>3000)ST.splice(0,1000)};
const TOK=new Map();   /* actor → {mode, up, by} for the try running now */
let BUSY=0;
const day=()=>{try{return wk()}catch(e){return 0}};

/* ---------- the one odds hook: oSteal + this try's rung ---------- */
const o0=oSteal;
oSteal=function(a,m){const o=o0.apply(this,arguments);let t=TOK.get(a);
 if(!t){const z=nfCtxUp(a,mo(m));if(z)t=z}
 if(!t||t.mode!==mo(m)||!t.up)return o;return stealRungUp(o,t.up)};

/* ---------- NPC: the contest roll of the same game ---------- */
function npcUp(v,mode){const B=M();if(!B.on||!v||v===S||v.coop||!(Math.random()<(B.npcP==null?1:B.npcP)))return 0;let raw=0;
 try{raw=kg82NpcRaw(v,B.art[mode])}catch(e){return 0}return raw>=B.win?(B.rung||1):0}
window.stealMgNpc=npcUp;

/* every try that runs through stealNight (her person-menu act, every NPC try on main): the token lives exactly for this call */
const sn0=stealNight;
stealNight=function(a,t,mode){const m=mo(mode);let mine=false;
 if(a&&!TOK.has(a)&&a!==S&&!a.coop){TOK.set(a,{mode:m,up:npcUp(a,m),by:"npc"});mine=true}
 const k=TOK.get(a);let r;try{r=sn0.apply(this,arguments)}
 finally{if(r&&k)stat({w:day(),who:a===S?"me":a.id,mode:m,up:k.up||0,by:k.by,path:"stealNight"});if(mine||(k&&k.by==="mg"))TOK.delete(a)}
 return r};

/* ---------- her game ---------- */
/* cb(up, raw, skipped) — up = rungs won (0 on lose / skip). Bots and pages without the kit frame skip at once. */
function herGame(mode,o,cb){const B=M();const kind=B.art&&B.art[mode];const nm=mode==="road"?"Chặn ngự giá":"Tranh sủng";
 const fin=(raw,sk)=>{if(typeof window.__smgEnd==="function"&&window.__smgEnd(mode,raw,sk)){BUSY=0;return}/* co-op thin F6b: her end is the intent (jcoopthinf6b) */const up=!sk&&raw>=B.win?(B.rung||1):0;stat({w:day(),who:"me",mode,up,by:"mg",raw:sk?null:raw,path:"her"});BUSY=0;
  if(up)try{log(`${nm}: ${KG82_KIND[kind].n.toLowerCase()} được ${raw}/10, cơ duyên lần này lên ${word(stealRungUp(o,up))}.`)}catch(e){}
  try{cb(up,raw,sk)}catch(e){console.error(e)}};
 if(typeof window.__smgFake==="function"){BUSY=1;const r=window.__smgFake(mode)||{};if(r.sync)fin(+r.raw||0,!!r.skipped);else setTimeout(()=>fin(+r.raw||0,!!r.skipped),0);return}   /* tests */
 if(!B.on||!kind||topRung(o)||typeof window.__bot!=="undefined"||typeof playArt!=="function"||typeof KG82_KIND!=="object"||!KG82_KIND[kind]){try{cb(0,null,true)}catch(e){console.error(e)}return}
 if(typeof window.__smgOpen==="function"&&window.__smgOpen(mode,o))return;/* co-op thin F6b: the game opens on HER phone (jcoopthinf6b) */
 BUSY=1;const n1=word(stealRungUp(o,B.rung||1)),n0=word(o),diff=()=>{try{return mgDiffTxt(mgTier(kind,{occ:B.occ}),kind)}catch(e){return ""}};
 const pa=()=>playArt({art:kind,artName:nm,occ:B.occ,rowsHead:"Trước khi ra tay",
  rows:[["Thắng",`cơ duyên lần này lên một bậc: ${n0} → ${n1}`,"g"],["Thua hay không chơi",`cơ duyên giữ nguyên ${n0}, không mất thêm gì`,"n"]].concat(diff()?[["Độ khó",diff(),"n"]]:[]),
  go:"Bắt đầu",quick:{n:"Thôi, không chơi",sub:`giữ nguyên ${n0}`},
  resRows:(raw,sk)=>[["Kết quả",sk?`không chơi: cơ duyên giữ nguyên ${n0}`:raw>=B.win?`${raw}/10 · ${kg82Word(raw)}: cơ duyên lên ${n1}`:`${raw}/10 · ${kg82Word(raw)}: cơ duyên giữ nguyên ${n0}`,!sk&&raw>=B.win?"g":"n"]],
  onDone:(raw,x)=>fin(raw,!!(x&&x.skipped))});
 /* jaudit's playArt hook marks a paid game (window.__aaL); this game is free: keep its mark as it was */
 const L=window.__aaL;try{pa()}catch(e){console.error(e);BUSY=0;try{cb(0,null,true)}catch(e2){}}finally{window.__aaL=L}}
window.stealMgPlay=herGame;window.stealIsCard=a=>isStealCard(a);window.stealO0=(p,m)=>o0(p,m);

/* her Hành sự deck cards (j2 deal; j75 marks them __steal where its buổi check matches): the game first, then the card as before with that try's odds */
const isStealCard=a=>!!(a&&a.o!=null&&(a.__steal||((a.n==="Tranh sủng"||a.n==="Chặn ngự giá")&&a.b===(typeof B4L==="number"?B4L:2))));
if(typeof act==="function"){const a0=act;act=function(i){const a=Array.isArray(deck)&&deck[i];
 if(!isStealCard(a)||BUSY||!M().on||(a.b!=null&&(S.buoi||0)!==a.b)||!can(cardCost(a))||a.done||S.dead||Q.length||!canPay(a)||a.lock)return a0.apply(this,arguments);
 const self=this,args=arguments,mode=a.n==="Chặn ngự giá"?"road":"feign";
 herGame(mode,a.o,up=>{const ob=a.o;if(up)a.o=stealRungUp(ob,up);try{a0.apply(self,args)}finally{a.o=ob}try{render()}catch(e){}})}}

/* her person-menu act (j8 doAct "steal" / "road"): the game first, then the act with the token on */
if(typeof doAct==="function"){const d0=doAct;doAct=function(i,k){if((k!=="steal"&&k!=="road")||BUSY||!M().on)return d0.apply(this,arguments);
 const v=typeof rivals!=="undefined"&&rivals[i],A=typeof ACT==="object"&&ACT[k];
 if(!v||!A||!can(BAL.actK||2)||S.dead||Q.length||!v.alive||v.out||!A.ok(S,v))return d0.apply(this,arguments);
 const self=this,args=arguments,mode=k==="road"?"road":"feign";
 herGame(mode,o0(S,mode),up=>{TOK.set(S,{mode,up,by:"mg"});try{d0.apply(self,args)}finally{TOK.delete(S)}try{render()}catch(e){}})}}

/* ---------- review/balance-chain night (jnf): her choice → game → the one resolve; NPCs roll at the resolve ---------- */
/* CO-OP (host-authoritative, jnf relay "ctm-nf"): each player plays HER OWN game on her own seat; the rung she wins reaches the one resolve on the host.
   GUEST: her pick tells the host at once that she is playing (SMG "mg"); jnf's "ch" message is held until her game ends, then sent right after a
   SMG "up" message {mode, up} (same socket, so the host has her rung before it has her choice). HOST: a friend's "ch" that arrives while the host is
   in her own game (S.nfX.st "mg", which jnf's own handler skips) is taken here; jnf's friend timeout (choice.waitMs from the choice opening x.at, or from x.mgAt) restarts (x.mgAt) when the
   host's game ends and is held open while the friend's game runs (at most BAL.steal.mg.coopMs). The friend's try then reads her rung (FRUP) through
   the same oSteal hook. jnf.js itself is unchanged. */
let NFUP=null,FRUP=null,FRW=null,GHOLD=0,HELD=null,PEND=0;   /* PEND: her pick is being recorded (chooseM renders inside), the game opens next */const NPCR=new Map();let PASS=0;
const SMG="ctm-smg",NFK="ctm-nf";
function nfX(){const x=S&&S.nfX;return x&&x.d===day()?x:null}
function inResolve(){const x=nfX();return !!(x&&x.st==="done"&&!x.def)}
const CO=()=>{try{return window.COOPW&&COOPW.on&&typeof COOP==="object"?COOPW:null}catch(e){return null}};
const isHost=()=>{if(typeof window.worldOn==="function")return !!window.worldOn();const c=CO();return !c||c.seat==="a"};
const isGuest=()=>!!CO()&&!isHost();
const VALIDM=v=>v==="feign"||v==="road"||v==="keep"?v:null;
function nfCtxUp(a,mode){if(typeof window.nfStep!=="function"||!a)return null;
 const live=inResolve();if(!live&&!PASS)return null;
 if(a===S){if(live&&NFUP&&NFUP.d===day()&&NFUP.mode===mode)return{mode,up:NFUP.up,by:"mg"};return null}
 if(a.coop){if(live&&FRUP&&FRUP.d===day()&&FRUP.mode===mode)return{mode,up:FRUP.up,by:"friend"};return null}
 const key=`${day()}|${a.id}|${mode}`;
 if(!NPCR.has(key)){if(NPCR.size>400)NPCR.clear();const up=npcUp(a,mode);NPCR.set(key,up);stat({w:day(),who:a.id,mode,up,by:"npc",path:live?"nfResolve":"nfPass"})}
 return{mode,up:NPCR.get(key),by:"npc"}}
function smgSend(m){try{COOP.send(Object.assign({t:"act",k:SMG,mode:isHost()?"h":"g",d:day(),week:COOP.state&&COOP.state.week,id:SMG+Date.now().toString(36)+Math.random().toString(36).slice(2,6)},m))}catch(e){console.error(e)}}
/* host: keep jnf's friend wait open while her game runs (bounded) */
let FRT=null;function frHold(on){if(FRT){clearInterval(FRT);FRT=null}if(!on)return;
 FRT=setInterval(()=>{try{const x=nfX();if(!FRW||FRW.d!==day()||Date.now()>FRW.until||!x||x.fr!==undefined||x.st==="done"){FRW=null;clearInterval(FRT);FRT=null;return}x.mgAt=Date.now();if(x.myAt)x.myAt=Date.now()}catch(e){}},250)}
let NFON=0;function nfInstall(){if(NFON||typeof window.nfStep!=="function"||typeof chooseM!=="function")return;NFON=1;
 const cm0=chooseM;chooseM=function(j){const m=Q[0],op=m&&m.pid==="nfch"&&m.opts&&m.opts[j];const mode=op&&(op.n==="Tranh sủng"?"feign":op.n==="Chặn ngự giá"?"road":null);
  const x=nfX();if(!mode||!x||x.st!=="open"||BUSY||!M().on)return cm0.apply(this,arguments);
  const o=typeof stealShown==="function"?stealShown(S,mode):o0(S,mode);const gst=isGuest();
  if(gst){GHOLD=1;HELD=null;smgSend({ph:"mg",v:mode})}
  x.st="mg";PEND=1;let r;try{r=cm0.apply(this,arguments)}catch(e){x.st="open";GHOLD=0;PEND=0;throw e}
  PEND=0;herGame(mode,o,up=>{NFUP=up?{d:day(),mode,up}:null;const y=nfX();if(y&&y.st==="mg")y.st="open";
   if(gst){GHOLD=0;smgSend({ph:"up",v:mode,up:up||0});const h=HELD;HELD=null;if(h)try{COOP.send(h)/* GHOLD is 0 now: goes out */}catch(e){console.error(e)}return}
   if(y){y.mgAt=Date.now();if(y.myAt)y.myAt=Date.now()};   /* the friend's wait restarts after the host's own game */
   try{window.nfStep()}catch(e){console.error(e)}});
  return r};
 /* guest: jnf's "ch" waits for her game (sent after the SMG "up") */
 try{if(typeof COOP==="object"&&typeof COOP.send==="function"){const s0=COOP.send;COOP.send=function(m){try{if(GHOLD&&m&&m.k===NFK&&m.ph==="ch"){HELD=m;return}}catch(e){}return (window.__coopSendTap||s0).apply(this,arguments)}}}catch(e){}
 /* host: the friend's game notice / rung, and her "ch" while the host is in her own game */
 try{if(typeof COOP==="object"&&typeof COOP.on==="function")COOP.on("act",m=>{try{const c=CO();if(!m||!c||m.from===c.seat||!isHost()||!S||m.d!==day()||m.mode!=="g")return;
  if(m.k===SMG){if(m.ph==="mg"){FRW={d:day(),until:Date.now()+(M().coopMs||120000)};FRUP=null;frHold(true)}
   else if(m.ph==="up"){FRUP={d:day(),mode:VALIDM(m.v),up:Math.max(0,Math.min(M().rung||1,m.up|0))};FRW=null;frHold(false);const x=nfX();if(x){x.mgAt=Date.now();if(x.myAt)x.myAt=Date.now()}}return}
  if(m.k===NFK&&m.ph==="ch"){const x=nfX();if(x&&x.st==="mg"&&x.fr===undefined){x.fr=m.ch?VALIDM(m.ch.v):null;FRW=null;frHold(false)}}}catch(e){console.error(e)}})}catch(e){}
 /* a save made while the game was open: the choice stands, the step resumes (no rung) */
 if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{const x=nfX();if(x&&x.st==="mg"&&!BUSY&&!PEND){x.st="open";setTimeout(()=>{try{window.nfStep()}catch(e){}},0)}}catch(e){}return r}}
 if(typeof window.stealPass==="function"){const sp0=window.stealPass;window.stealPass=function(){PASS++;try{return sp0.apply(this,arguments)}finally{PASS--}}}}
/* jnf may load after this file (assemble order): install now, else once the page has loaded */
nfInstall();if(!NFON)try{window.addEventListener("load",nfInstall)}catch(e){}
window.stealMgDebug=()=>({tok:[...TOK.entries()].map(([a,t])=>[a===S?"me":a&&a.id,t]),nfup:NFUP,frup:FRUP,frw:FRW,ghold:GHOLD,held:!!HELD,busy:BUSY,st:ST.slice(-20)});
})();
