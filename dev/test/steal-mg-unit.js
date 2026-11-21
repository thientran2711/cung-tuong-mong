/* review/steal-minigame (jsmg): unit scan. The rung applies ONCE per try, on BOTH acts (Tranh sủng feign / Chặn ngự giá road), and her tries and the
   NPC tries read the SAME odds hook (oSteal + this try's token). Odds are captured at the roll itself (roll(o)), so what is checked is what decides.
   usage: node dev/test/steal-mg-unit.js <dev/index.html>   → PASS/FAIL lines + a ladder table, exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1000,height:755}})).newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await p.waitForTimeout(2500);
 const R=await p.evaluate(async()=>{const out=[];const ok=(n,c,x)=>out.push([c?"PASS":"FAIL",n,x==null?"":JSON.stringify(x)]);const wait=ms=>new Promise(r=>setTimeout(r,ms));
  window.__bot=1;document.getElementById('title').hidden=true;window.render=function(){};
  /* ROOT CAUSE of the "deck deals servant cards" red (main too): j52 start() → nlBegin waits for the figures (setInterval, up to 2.5 s) when they are not ready, so a fast start() loop queued DEFERRED new lives that fired mid-test and replaced her (often a cung-nữ start). Wait until the figures are ready before each start(): it then runs at once. */const figs=async()=>{for(let j=0;j<40&&typeof nlFigsReady==="function"&&!nlFigsReady();j++)await wait(100)};/* each new life loads new faces, so wait before EVERY start() *//* j52: start() replays the STORED next life (nlGet: NL_KEY seed) until it is accepted, so when that seed is a cung-nữ start every retry gave the same cung-nữ life (the residual 1-in-20 "deck deals servant cards" red: 60/60 retries origin cnv) -> draw a fresh seed (nlNew) before each retry (test only) */for(let i=0;i<60;i++){await figs();if(typeof nlNew==="function")nlNew();start();if(!S.srv&&!(typeof isKc==="function"&&isKc())&&!(S.origin&&S.origin.k==="cnv"))break}/* !S.srv, not !isSrv(): a risen maid (S.srv.risen) was seen to read as a servant again by the deck section *//* a khuê-các / cung-nữ start turns her into a maid later (jkc2 / j42 srvInit): the deck then deals no Tranh sủng (main flake too) */Q.length=0;S.mg=0;S.rank=Math.max(S.rank,2);S.sung=40;S.duc=60;S.suc=70;
  const R0=liveRivals(true).filter(v=>!v.coop);
  const reset=()=>{S.ntk=null;S.ntTry=null;Q.length=0;used=0;S.dead=false;for(const v of R0){v.preg=0;v.confined=0;v.block=0;v.out=0;v.suc=70;v.duc=60;v.ill=null}S.cyb={};if(window.cyBase)S.tuan=(cyBase(S).t+1)%3;S.suc=70;S.duc=60;/* ag-all-2 land: her servant CHOOSES (jagstf2 stf2Ord, a mindPick, not roll) whether to carry out a dirty act (j29: «quỳ xin … đừng làm việc thất đức»); the case tests the game → try odds, not the servant -> she obeys (test only) */if(typeof stf2Ord==="function"&&!window.__stf0){window.__stf0=stf2Ord;stf2Ord=()=>"obey"}/* ag-all-2 land: the khắc an act spends ticks the NPC world (jagent agOn: NPC deeds, gifts, knowledge sales) and can move her odds between the case's base read and the try; the unit checks the game → odds hook, so the ag world sleeps here (test only; ag world: ag-* suites) */window.__agOff=1;/* npc-chain (jfeel): her feelings add odds inside runAct (FEEL.cur), not in the case's base read -> feelings sleep too (test only; feelings18.test.js covers them) */window.__feelOff=1;/* the emperor's mood (j1 mm(), read by oSteal) can change in the khắc the act spends (+10 / −8 …) -> pinned for the unit (test only) */if(!window.__mm0){window.__mm0=mm;mm=()=>0}};
  const roll0=roll;let cap=[];window.roll=o=>{cap.push(o);return false};   /* every try fails: no night scene, only the odds are read */
  const raw0=kg82NpcRaw;const B=BAL.steal.mg;
  /* 0 · ladder: one rung up from every band, cap at Nắm chắc */
  const T=[];for(const o of [5,20,30,31,40,45,46,50,55,56,60,65,66,75,80,81,85,90,91,95]){const u=stealRungUp(o,1);T.push([o,word(o),u,word(u)])}
  ok("ladder: every rung below Nắm chắc goes up exactly one rung",T.every(([o,,u])=>oddsLv(o)>=6?oddsLv(u)===6:oddsLv(u)===oddsLv(o)+1),T.filter(([o,,u])=>oddsLv(o)<6&&oddsLv(u)!==oddsLv(o)+1));
  ok("ladder: Nắm chắc stays Nắm chắc, never above BAL.odds.hi",T.every(([o,,u])=>u<=BAL.odds.hi&&u>=o));
  ok("ladder: order kept below Nắm chắc (a better start stays better)",T.filter(r=>oddsLv(r[0])<6).every((r,i,X)=>i===0||r[2]>=X[i-1][2]));
  window.__ladder=T;
  ok("one core: BAL.steal.mg has win / rung / art / occ",B&&B.win>0&&B.rung===1&&B.art.feign&&B.art.road&&KG82_KIND[B.art.feign]&&KG82_KIND[B.art.road]&&B.occ in BAL.mgTier.occ,B);
  /* 1 · NPC tries (stealNight, the same act as hers), both acts, win / lose */
  reset();const free=R0.filter(v=>!(typeof cyTray==="function"&&cyTray(v))&&v.alive&&!v.out);const A=free[0],H=free.find(v=>v!==A&&!(typeof sameHouse==="function"&&sameHouse(S,v)))||free[1];/* H must not share her palace (j9: «Người cùng cung, ngươi không thể ra tay» blocks the try after the game; seen when the start housed H with her) */
  for(const mode of ["feign","road"]){
   for(const [nm,raw,want] of [["wins",10,1],["loses",0,0]]){reset();S.tonight=H;kg82NpcRaw=()=>raw;const base=oSteal(A,mode);cap=[];const n0=__smgSt.length;
    const s=stealNight(A,H,mode);const exp=want?stealRungUp(base,1):base;
    ok(`NPC ${mode} game ${nm}: the roll uses ${want?"one rung up":"the plain odds"}`,cap.length===1&&cap[0]===exp,{base,exp,cap,s:String(s).slice(0,60)});
    ok(`NPC ${mode} ${nm}: one game record for one try, token gone after`,__smgSt.length-n0===1&&__smgSt[__smgSt.length-1].up===want&&stealMgDebug().tok.length===0,__smgSt.slice(n0));
}}
  kg82NpcRaw=raw0;
  /* 2 · the co-op friend never gets the NPC roll (she plays her own game) */
  reset();S.tonight=H;A.coop=true;kg82NpcRaw=()=>10;const bc=oSteal(A,"feign");cap=[];stealNight(A,H,"feign");ok("co-op friend: no NPC roll on her try",cap[0]===bc,{bc,cap});delete A.coop;kg82NpcRaw=raw0;
  /* 3–5 · ADAPTED to the night-final rule (owner OD 16/11 22:45Z: "Tranh sủng / Chặn ngự giá only in the flip choice … no cost"; night-final.js case 0):
     her Tranh sủng / Chặn ngự giá are NO person-menu act and NO Hành sự deck card any more — they live ONLY in the card-flip choice at the end of tối
     (jnf.js §2), where her game + rung + once-per-try are checked by steal-mg-nf.js. So here: the old entry points start no try and play no game. */
  const iH=rivals.indexOf(H);try{k61Meet(H,"gặp mặt",3)}catch(e){}
  const sn0=stealNight;let snHer=0;stealNight=function(a){if(a===S)snHer++;return sn0.apply(this,arguments)};
  /* 3 · HER person menu (doAct steal / road): no try, no game, no token (was: game → stealNight → roll) */
  for(const k of ["steal","road"]){
   for(const [nm,res] of [["wins",{raw:8}],["loses",{raw:2}],["skips",{raw:9,skipped:true}]]){reset();S.tonight=H;window.__smgFake=()=>res;const n0h=__smgSt.length;snHer=0;const t0=S.tonight;
    try{doAct(iH,k)}catch(e){}await wait(30);
    ok(`HER ${k} (person menu), game ${nm}: no try and no game there (OD 16/11 22:45Z: only the flip choice)`,__smgSt.slice(n0h).filter(r=>r.path==="her").length===0&&snHer===0&&S.tonight===t0,{games:__smgSt.slice(n0h),snHer,tonight:S.tonight===t0});
    ok(`HER ${k} ${nm}: token gone after the try`,stealMgDebug().tok.length===0)}}
  /* 4 · HER Hành sự deck: Tranh sủng / Chặn ngự giá are never dealt (was: dealt, game → runOpt roll) — 20 deals at buổi tối, rank 2 */
  for(const nm0 of ["Tranh sủng","Chặn ngự giá"]){
   for(const nm of ["wins","loses"]){let seen=0;const seen4=[];for(let d=0;d<10;d++){reset();S.tonight=H;S.buoi=B4L;deal();if(deck.some(a=>a&&a.n===nm0))seen++;if(d===0)seen4.push(...deck.map(a=>a&&a.n).slice(0,4))}
    ok(`deck card ${nm0} NOT dealt (${nm} run; OD 16/11 22:45Z: only the flip choice)`,seen===0,{seen,rank:S.rank,deck:seen4})}}
  window.__smgFake=null;
  /* 5 · once per try: from the person menu not even one game a night now (the once-per-try check of the flip choice is in steal-mg-nf.js) */
  reset();S.tonight=H;window.__smgFake=()=>({raw:10});const n5=__smgSt.length;snHer=0;try{doAct(iH,"steal")}catch(e){}await wait(30);try{doAct(iH,"steal")}catch(e){}await wait(30);
  ok("one try a night: the second tap plays no second game (person menu: none at all)",__smgSt.slice(n5).filter(r=>r.path==="her").length===0&&snHer===0,__smgSt.slice(n5));window.__smgFake=null;
  stealNight=sn0;
  /* 6 · same code path: her rung and the NPC rung come from the one hook (oSteal wrapper → stealRungUp), equal start → equal result */
  ok("same rung function for her and NPCs",String(oSteal).includes("stealRungUp")&&typeof stealMgNpc==="function");
  /* 7 · already Nắm chắc: no game offered (nothing to win) */
  {reset();S.tonight=H;window.__smgFake=null;const bot=window.__bot;delete window.__bot;const pa=playArt;let calls=0;playArt=function(o){calls++;try{o.onDone(9,{skipped:false})}catch(e){}};let got=null,got2=null;
   try{stealMgPlay("feign",93,(up,raw,sk)=>{got={up,sk}});stealMgPlay("feign",50,(up,raw,sk)=>{got2={up,raw,sk}})}finally{playArt=pa;window.__bot=bot}
   ok("at Nắm chắc the game is not offered (no __bot: playArt not called), below it is",got&&got.up===0&&got.sk===true&&calls===1&&got2&&got2.up===1,{got,got2,calls})}
  /* 8 · nothing new in the save */
  ok("save: no steal-game state written",!/smg|__smg|stealMg/.test(JSON.stringify(ser())));
  window.roll=roll0;if(window.__stf0){stf2Ord=window.__stf0;delete window.__stf0}delete window.__agOff;delete window.__feelOff;if(window.__mm0){mm=window.__mm0;delete window.__mm0}return out});
 let bad=0;for(const r of R){console.log(r.join(" | "));if(r[0]!=="PASS")bad++}
 const L=await p.evaluate(()=>window.__ladder);console.log("LADDER (odds → one rung up):");for(const r of L)console.log(`  ${r[0]} ${r[1]} → ${r[2]} ${r[3]}`);
 console.log("page errors:",errs.length?errs.slice(0,5):0);await b.close();process.exit(bad||errs.length?1:0)})();
