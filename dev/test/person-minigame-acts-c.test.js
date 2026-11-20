/* PERSON MINIGAME ACTS — ROUND C test (owner OD 20/11 ~01:00Z "Làm cả 4 luôn đi"; plan: report §ROUND C PLAN):
   (C2) the real 7×7 Cờ: KG82_ENG.gomoku inside the kg82 frame (playArt o.eng): five in a row wins, the AI blocks/answers, KG82.peek gives a legal empty cell,
        the person acts open it for «co» (never the capture drill); the AI noise comes from BAL.pm.ky and falls as the occasion rank rises (law 5);
   (C3) onlookers = real people at that place only (none at a private palace); the winner gains Danh per watcher, the loser loses the same (conserved),
        a watcher who likes the winner likes her more, one who resents her gets jealous; the same rule for NPC ↔ NPC (law 1);
   (C4) the ladder: seeded from talent (old save without S.pmL), a lower winner takes the loser's place, a yield moves the yielder below, a refused
        ladder challenge drops BAL.pm.lad.refuseDrop place(s) and its preview says so, places 1..n earn Danh in monthPay, NPCs aim at the place right above
        (her too) and such challenges land over ≥ 10 game days;
   (C1) split-board data: the rival's raw drawn ONCE (startContest rows[].raw) is shown along the board clock (never above itself) and ends at itself;
        kitGameVs is only called when the kit has it (K-PM-1);
   (C5) one core: every round-C number is in BAL.pm (live / ky / eye / lad); no page error.
   usage: node dev/test/person-minigame-acts-c.test.js [dev/index.html]  → exit 1 on FAIL */
const path=require('path');const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const HTML=process.argv[2]||'dev/index.html';
(async()=>{
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;window.kitNotice=undefined;window.ptOn=()=>false});
 /* ---- C2: the board itself (DOM) ---- */
 const g=await p.evaluate(async()=>{const out={};let raw=null;KG82.kyNoise=0;
  playArt({art:"co",eng:PM_KY,title:"thử",occ:"pm",rank:0,quick:{n:"Để tài nghệ quyết định",sub:"5/10"},onDone:r=>{raw=r}});
  out.rules=(document.querySelector("#kg82 .kgr")||{}).textContent||"";out.tut=!!document.querySelector("#kgrtut");document.getElementById("kg82go").click();
  await new Promise(r=>setTimeout(r,2800));const cells=()=>[...document.querySelectorAll("#kg82 .goban button")];out.cells=cells().length;
  const pk=KG82.peek&&KG82.peek();out.peek=!!(pk&&pk.sel&&document.querySelector(pk.sel)&&!document.querySelector(pk.sel).disabled);
  /* she plays row 0; the AI (noise 0) must block a four */for(const i of [0,1,2]){const c=cells()[i];if(c&&!c.disabled)c.click();await new Promise(r=>setTimeout(r,BAL.pm.ky.ai.think+120))}
  out.blocked=[1,2,3,4].some(i=>cells()[i].classList.contains("wh"))||!!KG82.kyOut;
  /* play on until the board ends (any free cell, prefer peek) */for(let k=0;k<40&&!KG82.kyOut;k++){const q=KG82.peek&&KG82.peek();const el=q&&q.sel?document.querySelector(q.sel):cells().find(c=>!c.disabled);if(el)el.click();await new Promise(r=>setTimeout(r,BAL.pm.ky.ai.think+120))}
  out.outcome=KG82.kyOut;await new Promise(r=>setTimeout(r,1200));const okb=document.getElementById("kg82ok");if(okb)okb.click();out.raw=raw;
  out.noise=[0,3,7].map(R=>{const o=liveRivals(true).find(v=>v!==S);return pmKyNoise(o,S,R)});return out});
 ok(/Năm quân liền hàng/.test(g.rules)&&g.tut,'7×7 Cờ opens in the kg82 frame with the rules screen + «Hướng dẫn» (KIT §13.7)',{tut:g.tut});
 ok(g.cells===49&&g.peek,'the board has 49 cells and KG82.peek points at a free legal cell',{cells:g.cells,peek:g.peek});
 ok(g.blocked,'the AI (noise 0) answers her line on row 1 (blocks it)',g.blocked);
 ok(["win","lose","draw"].includes(g.outcome)&&g.raw!=null,'the board ends with a real outcome and hands a raw back',{o:g.outcome,raw:g.raw});
 ok(g.noise[0]>=g.noise[1]&&g.noise[1]>=g.noise[2],'law 5: the opponent blunders less as the occasion rank rises (BAL.pm.ky)',g.noise);
 /* ---- the rest headless ---- */
 const r=await p.evaluate(()=>{const out={};const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop&&!x.confined);const a=V[0],t=V[1],w1=V[2],w2=V[3];
  /* C2 routing: a person act on «co» goes to the 7×7 board */let used=null;const pa0=window.playArt;window.playArt=o=>{used=o.eng&&o.eng.e};
  const sc0=window.startContest;window.startContest=o=>{used="contest:"+o.art};S.place=whereOf(a);try{pmRun(a,S,{a:"play",kind:"co",ak:"ky",n:"Cờ"})}catch(e){used="err:"+e.message}
  out.coPlay=used;used=null;a.bac=Math.max(a.bac||0,300);S.bac=Math.max(S.bac,300);try{pmRun(S,a,{a:"duel",kind:"co",ak:"ky",n:"Cờ",s:"bac"})}catch(e){used="err:"+e.message}out.coDuel=used;
  used=null;try{pmRun(S,a,{a:"duel",kind:"dauho",ak:null,n:"Đầu hồ",s:"bac"})}catch(e){used="err"}out.other=used;window.playArt=pa0;window.startContest=sc0;try{kg82Close(true)}catch(e){}
  /* C3 onlookers */S.where=S.where||{};const pub=BAL.pm.pub[0];S.where[a.id]=pub;S.where[t.id]=pub;S.where[w1.id]=pub;S.where[w2.id]=pub;S.place="home";
  const E=pmEyes(a,t,pub);out.eyes=E.map(x=>x.id).sort();out.eyesWant=liveRivals(true).filter(v=>v!==a&&v!==t&&!v.confined&&(S.where[v.id]||palaceOf(v))===pub).map(v=>v.id).slice(0,BAL.pm.eye.max).sort();const nE=E.length;
  S.where[w2.id]=palaceOf(w2);out.eyesReal=pmEyes(a,t,pub).map(x=>x.id);out.nE=nE;const nq=V.find(v=>!v.queen);out.priv=pmEyes(a,t,palaceOf(nq)).length+pmEyes(a,t,"home").length;S.where[w2.id]=pub;
  a.danh=50;t.danh=50;w1.rl=w1.rl||{};w1.rl[a.id]=BAL.pm.eye.likeMin+5;const af0=aff(w1,a);const d0=a.danh+t.danh;
  const fx=pmEyeFx(a,t,{n:"Đầu hồ"},pub);out.cons=a.danh+t.danh===d0&&a.danh>50;out.kinh=aff(w1,a)-af0;out.kinhW=BAL.pm.eye.kinh;out.fxTxt=fx;
  /* her win in public: a watcher who resents her gets jealous */S.where[S.id]=pub;S.place=pub;w2.rel=-60;w2.oan=40;const g0=+w2.ghen||0;S.danh=40;const sd=S.danh;pmEyeFx(S,t,{n:"Đầu hồ"},pub);out.ghen=(+w2.ghen||0)-g0;out.herDanh=S.danh-sd;S.place="home";
  /* C4 ladder */delete S.pmL;const L0=pmLad("dan").map(x=>x===S?"me":x.id);const tal=pmLad("dan").map(x=>kg82Parts(x,"dan").total);out.seed=tal.every((v,i)=>i===0||tal[i-1]>=v);out.n=L0.length;
  const L=pmLad("dan");const lo=L[L.length-1],hi=L[0];const m=pmLadWin(lo,hi,"dan");out.swap=pmLadPos(lo,"dan")===1&&pmLadPos(hi,"dan")===2&&!!m;
  const L2=pmLad("dan");const x2=L2[2],y2=L2[1];out.noUp=pmLadWin(y2,x2,"dan")===""&&pmLadPos(y2,"dan")===2;
  const a3=L2[3],t3=L2[2];out.lfor=pmLadFor(a3,t3,{a:"duel",kind:"dan"})&&!pmLadFor(t3,a3,{a:"duel",kind:"dan"})&&!pmLadFor(a3,t3,{a:"play",kind:"dan"});
  /* refusal of a ladder challenge: preview + drop */if(a3!==S&&t3!==S){const O=pmDuelOpts(a3,t3,{a:"duel",kind:"dan",n:"Đàn",s:"bac"});const no=O.find(o=>o.id==="no");out.refPrev=!!no&&/tụt/.test(no.x);const p0=pmLadPos(t3,"dan");no.go();out.refDrop=pmLadPos(t3,"dan")-p0}
  /* month pay */const top=pmLad("dan")[0];const td=top===S?S.danh:top.danh;const mt=pmLadMonth();out.month=(top===S?S.danh:top.danh)-td>=BAL.pm.lad.top[0];
  /* old save: no S.pmL → seeded on demand, nothing breaks */delete S.pmL;out.old=pmLadPos(S,"co")>0;
  /* aim: someone below her in an art she plays aims at the place right above */let aim=null;for(const v of V){const A=window.pmLadAim?pmLadAim(v):null;if(A){aim={v:v.id,p:A.p===S?"me":A.p.id,kind:A.kind,ok:pmLadPos(A.p,A.kind)<pmLadPos(v,A.kind)&&pmLadPos(v,A.kind)-pmLadPos(A.p,A.kind)<=BAL.pm.lad.reach};break}}out.aim=aim;
  /* C1 split board data */let vsCalls=0;const kv0=window.kitGameVs;window.kitGameVs=()=>{vsCalls++};KG82.onHud=null;
  pmVsGo([{p:a,raw:7}],a,"dan");const vs=KG82.vs;const sh=[];for(let n=30;n>=0;n-=5){KG82.onHud({score:`${Math.round((30-n)/6)}/10`,time:`${n} giây`});sh.push(vs.opp[0].shown)}
  out.vs={sh,me:vs.me,calls:vsCalls,mono:sh.every((v,i)=>i===0||v>=sh[i-1]),end:sh[sh.length-1],max:Math.max(...sh)};window.kitGameVs=kv0;KG82.onHud=null;KG82.vs=null;
  pmVsGo([{p:a,raw:6}],a,"mua");for(let i=1;i<=5;i++)KG82.onHud({score:`${i*2}/10`,round:`Hồi ${i}/5`});out.vsRound=KG82.vs.opp[0].shown;KG82.onHud=null;KG82.vs=null;
  return out});
 ok(r.coPlay==="gomoku"&&r.coDuel==="gomoku"&&r.other==="contest:dauho",'person acts on «co» open the 7×7 board (both acts); other arts keep the contest',[r.coPlay,r.coDuel,r.other]);
 ok(JSON.stringify(r.eyes)===JSON.stringify(r.eyesWant)&&r.eyesReal.length===r.nE-1&&r.priv===0,'onlookers = the real people standing there (none at a private palace)',{eyes:r.eyes,real:r.eyesReal,priv:r.priv});
 ok(r.cons&&r.kinh>=r.kinhW,'winner gains Danh per watcher, loser loses the same (conserved); a watcher who likes the winner likes her more',{cons:r.cons,kinh:r.kinh,txt:r.fxTxt});
 ok(r.ghen>0&&r.herDanh>0,'her win in public: Danh up, a watcher who resents her gets jealous (law 3: a cost of winning)',{ghen:r.ghen,danh:r.herDanh});
 ok(r.seed&&r.n>3,'ladder seeded from talent (best first) on a save without S.pmL',{n:r.n});
 ok(r.swap&&r.noUp,'a lower winner takes the loser\'s place (others shift down); a higher winner stays',{swap:r.swap,noUp:r.noUp});
 ok(r.lfor,'a ladder challenge = a duel from below within reach (not a pastime, not from above)',r.lfor);
 ok(r.refPrev===undefined||(r.refPrev&&r.refDrop===1),'refusing a ladder challenge: the preview says «tụt», she drops refuseDrop place',{prev:r.refPrev,drop:r.refDrop});
 ok(r.month&&r.old,'places 1..n earn Danh in the month pay; an old save gets a ladder on demand',{month:r.month,old:r.old});
 ok(r.aim&&r.aim.ok,'an NPC aims at the place right above her, within reach (law 1: her too)',r.aim);
 ok(r.vs.mono&&r.vs.end===7&&r.vs.max<=7&&r.vs.calls>0&&r.vsRound>=4,'split board: the drawn raw shows along the clock, never above itself, ends at itself (K-PM-1 hook called)',r.vs);
 /* ---- NPC ladder challenges land over ≥ 10 game days ---- */
 const d=await p.evaluate(()=>{let n=0,me=0;const L0=JSON.stringify(S.pmL||{});const rc0=rcvAsk;window.rcvAsk=function(k,a,t,x){if(k==="pmDuel"&&x&&pmLadFor(a,t,x)){n++;if(t===S)me++}return rc0.apply(this,arguments)};
  for(let i=0;i<200&&!S.dead;i++){try{Q.length=0;S.mg=null;nextBuoi()}catch(e){}if(S.dead||S.out||isSrv())break}window.rcvAsk=rc0;return{n,me,moved:JSON.stringify(S.pmL||{})!==L0,dead:!!S.dead}}).catch(e=>({err:e.message}));
 ok(d.n>=1&&d.moved,'NPC ladder challenges land in the day plan and move the ladder over 200 buổi',d);
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 const nb=res.filter(x=>!x).length;console.log(nb?`FAIL ${nb}/${res.length}`:`ALL PASS ${res.length}`);await b.close();process.exit(nb?1:0)})();
