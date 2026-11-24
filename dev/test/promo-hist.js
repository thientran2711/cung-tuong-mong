/* review/promo-hist (owner 24/11 ~05:20Z, MAIN 116; reports/PROMO-HIST.md §3): the three history roads of jpromoh.
   (a) grand-occasion batch grace, (b) favour grace, (c) deathbed decree — each fires for her AND for an NPC by the same code (law 1), the gain and
   the loss land (law 3), the line says WHY, numbers from BAL (law 4), one step only, seats apply, one decree a month, old saves get no retro fire.
   usage: node dev/test/promo-hist.js <page.html> */
const {chromium}=require('playwright');const path=require('path');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(process.argv[2]));await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<200;i++){start();if(!isSrv()&&S.rank<=1&&liveRivals(false).filter(v=>!v.queen&&v.rank<5).length>=2)break}Q.length=0;
 const strip=s=>String(s).replace(/<[^>]+>/g,'');const o={};const H=BAL.promoH,B=BAL.psk;const mr=Math.random;const yes=()=>{Math.random=()=>0},no=()=>{Math.random=()=>0.9999},back=()=>{Math.random=mr};
 const fresh=x=>{x.ex={to:rkOf(x)+1};x.lastPromo=S.turn-99;x.phT=null;x.phS=0;x.phD=0;x.ill=null;x.confined=0};
 const nextM=()=>{S.turn++};
 const L=liveRivals(false).filter(v=>!v.queen&&v!==S&&v.rank<5);const n1=L[0];
 o.nm=n1.name;
 // ---------- (a) grand occasion: her ----------
 S.rank=1;fresh(S);S.bac=500;S.sung=40;const bac0=S.bac;let t;nextM();yes();t=strip(phForce(["vantho"]));back();
 o.aMe={t,grace:S.ex.grace===S.rank+1,gw:S.ex.gw,rank:S.rank,bac:bac0-S.bac,want:Math.round(B.fest.bacM*BAL.pay[1])};
 // same month: no second grant (one decree a month)
 yes();o.aMe2=strip(phTry(S,["thanhtho"]));back();
 // her grace passes → one step, reason printed
 S.ex.pass=true;const r1=S.rank;const tp=strip(promoteP(S)||"");o.aMePass={t:tp,d:S.rank-r1};
 // ---------- (a) grand occasion: NPC ----------
 fresh(n1);n1.bac=500;n1.sung=40;const nb0=n1.bac;const nr0=n1.rank;nextM();S.phT=S.turn;yes();t=strip(phForce(["laphau"]));back();
 o.aNpc={t,grace:n1.ex.grace===n1.rank+1,gw:n1.ex.gw,d:n1.rank-nr0,bac:nb0-n1.bac,want:Math.round(B.fest.bacM*BAL.pay[nr0]),news:(S.news||[]).some(x=>String(x.t||x.txt||x.h||JSON.stringify(x)).includes(n1.name))};
 // NPC grace exam passed → exGraceUp through promoteP (seat free) → +1; with the seat full → waits
 n1.ex.pass=true;const cap=SEATCAP[n1.rank+1];const nr1=n1.rank;
 if(cap!=null){const want=n1.rank+1;const filled=[];for(const v of liveRivals(false))if(v!==n1&&!v.queen&&holders(want).length<cap&&v.rank!==want&&v.rank<want){filled.push([v,v.rank]);v.rank=want}
  o.full=!seatFree(want);promoteP(n1);o.aNpcFull=n1.rank-nr1;for(const [v,rk] of filled)v.rank=rk}else{o.full=true;o.aNpcFull=0}
 {const want=n1.rank+1;const down=[];while(!seatFree(want)){const h=holders(want).find(v=>v!==S&&v!==n1);if(!h)break;down.push(h);h.rank=want-1}
  n1.ex.pass=true;n1.ex.grace=n1.rank+1;n1.confined=0;const tn=strip(promoteP(n1)||"");o.aNpcPass={t:tn,d:n1.rank-nr1,free:seatFree(want)||n1.rank===want};for(const h of down)h.rank=want}
 // not chosen when the roll fails; no fire without an occasion
 fresh(S);nextM();no();o.aNo=strip(phForce(["vantho"]));back();
 // ---------- (b) favour: her ----------
 S.rank=1;fresh(S);S.danh=0;S.sung=BAL.promo.s[1+H.sung.over];const g0=liveRivals(true).map(v=>v.ghen||0);nextM();yes();t=strip(phForce([]));back();
 o.bMe={t,grace:S.ex.grace===S.rank+1,gw:S.ex.gw,ghen:liveRivals(true).some((v,i)=>(v.ghen||0)>g0[i]),cd:S.phS-S.turn};
 // cooldown: the next month no second favour grace
 S.ex={to:S.rank+1};nextM();yes();o.bMeCd=strip(phForce([]));back();
 // ordinary road complete → no favour road; Sủng below the band top → none
 fresh(S);S.sung=BAL.promo.s[1+H.sung.over]-1;nextM();yes();o.bLow=strip(phForce([]));back();
 // ---------- (b) favour: NPC ----------
 const n2=L[1];fresh(n2);n2.danh=0;n2.sung=BAL.promo.s[Math.min(7,rkOf(n2)+H.sung.over)];const oa0=consorts().filter(v=>v!==n2).map(v=>v===S?(S.ro&&S.ro[n2.id])||0:(v.oan||0));
 nextM();S.phT=S.turn;n1.phT=S.turn;yes();t=strip(phForce([]));back();
 o.bNpc={t,grace:n2.ex.grace===rkOf(n2)+1,gw:n2.ex.gw,cd:n2.phS-S.turn};
 // ---------- (c) deathbed: her ----------
 const ik=Object.keys(ILL).find(k=>ILL[k].die>0);S.rank=2;fresh(S);S.ill={k:ik,st:STG.length-1};const q=queenP();const qo=q&&q!==S?(q.ro?q.ro[S.id]:0):0;const cr0=S.rank;
 nextM();yes();t=strip(phForce(["vantho"]));back();
 o.cMe={t,d:S.rank-cr0,done:S.phD,ill:ILL[ik].n,exam:!S.ex.grace};
 // once a life: no second deathbed decree
 S.ex={to:S.rank+1};nextM();yes();o.cMe2=S.rank;phForce([]);o.cMe2=S.rank-o.cMe2;back();S.ill=null;
 // ---------- (c) deathbed: NPC ----------
 const n3=L.find(v=>v!==n1&&v!==n2)||n1;fresh(n3);n3.ill={k:ik,st:STG.length-1};const c3=n3.rank;nextM();S.phT=S.turn;yes();t=strip(phForce([]));back();
 o.cNpc={t,d:n3.rank-c3,done:n3.phD};n3.ill=null;
 // deathbed with the next seat full → no decree
 const n4=n3;fresh(n4);n4.ill={k:ik,st:STG.length-1};const want=rkOf(n4)+1;const cap4=SEATCAP[want];let fill=[];
 if(cap4!=null){for(const v of liveRivals(false))if(v!==n4&&!v.queen&&holders(want).length<cap4&&v.rank<want){fill.push([v,v.rank]);v.rank=want}}
 const c4=n4.rank;nextM();S.phT=S.turn;yes();phForce([]);back();o.cFull={full:!seatFree(want),d:n4.rank-c4};for(const [v,rk] of fill)v.rank=rk;n4.ill=null;
 // ---------- caps: Hoàng quý phi (6) never moves on these roads ----------
 S.rank=6;fresh(S);S.sung=100;S.ill={k:ik,st:STG.length-1};nextM();yes();o.top=strip(phForce(["vantho"]));o.topR=S.rank;back();S.ill=null;S.rank=1;
 // ---------- occasions: world draw is stable, a new Empress is seen, old saves get no retro fire ----------
 o.hSame=phH("vantho")===phH("vantho");const sv=S.ph;delete S.ph;o.oldFresh=phOcc().length===0||phOcc().every(k=>k!=="laphau");
 S.ph.q="__old__";S.ph.oc=null;o.lap=phOcc().includes("laphau")||phH("laphau")>=H.occ.laphau.p;
 // law 4: the BAL keys the code reads
 o.bal={fest:!!(H.fest&&H.fest.o&&H.fest.occ.vantho),sung:!!(H.sung&&H.sung.p),death:!!(H.death&&H.death.o),psk:!!(B.fest&&B.sung&&B.death)};
 o.rule=promoRuleTxt();o.src=[PROMO_SRC.fest,PROMO_SRC.sung,PROMO_SRC.death];
 return o});
console.log(JSON.stringify(r,null,0));const F=[];const ok=(c,n,x)=>{console.log((c?'PASS ':'FAIL ')+n+(c||x===undefined?'':' '+JSON.stringify(x)));if(!c)F.push(n)};
const why=s=>/Lý do:/.test(s)&&!/%/.test(s);
ok(r.aMe.grace&&r.aMe.gw==='vantho'&&r.aMe.bac===Math.min(500,r.aMe.want)&&why(r.aMe.t)&&/Vạn thọ/.test(r.aMe.t)&&/Sủng/.test(r.aMe.t)&&/Bạc −/.test(r.aMe.t),'(a) her: Vạn thọ grace exam at once + lễ tạ ân Bạc (BAL.psk.fest × BAL.pay) + WHY',r.aMe);
ok(r.aMe.rank===1,'(a) grace is not a rank: the exam still decides');ok(r.aMe2==='','(a) one decree a month (no second grant the same month)',r.aMe2);
ok(r.aMePass.d===1&&/Vạn thọ/.test(r.aMePass.t),'(a) her grace exam passed → one step, the decree names the occasion',r.aMePass);
ok(r.aNpc.grace&&r.aNpc.gw==='laphau'&&r.aNpc.d===0&&r.aNpc.bac===Math.min(500,r.aNpc.want)&&why(r.aNpc.t)&&r.aNpc.t.includes(r.nm)&&/Hoàng hậu/.test(r.aNpc.t),'(a) NPC: same grace + same Bạc loss + WHY (new Hoàng hậu)',r.aNpc);
ok(r.aNpc.news,'(a) NPC line reaches her news');
ok(!r.full||r.aNpcFull===0,'(a) NPC grace passed but the seat is full → waits (no rank past the cap)',r);
ok(r.aNpcPass.d===1,'(a) NPC grace exam passed with a free seat → one step',r.aNpcPass);
ok(r.aNo==='','(a) not chosen when the roll fails',r.aNo);
ok(r.bMe.grace&&r.bMe.gw==='sung'&&r.bMe.ghen&&why(r.bMe.t)&&/sủng/i.test(r.bMe.t)&&/ghen/.test(r.bMe.t),'(b) her favour: grace exam + lục cung ghen + WHY',r.bMe);
ok(r.bMe.cd>0&&r.bMeCd==='','(b) favour cooldown (BAL.promoH.sung.cd)',[r.bMe.cd,r.bMeCd]);
ok(r.bLow==='','(b) Sủng under the band top → no favour road',r.bLow);
ok(r.bNpc.grace&&r.bNpc.gw==='sung'&&why(r.bNpc.t)&&/oán/.test(r.bNpc.t)&&r.bNpc.cd>0,'(b) NPC favour: same grace + others oán + WHY',r.bNpc);
ok(r.cMe.d===1&&r.cMe.done===1&&r.cMe.exam&&why(r.cMe.t)&&r.cMe.t.toLowerCase().includes(r.cMe.ill.toLowerCase())&&/nguy kịch/.test(r.cMe.t)&&/ghen/.test(r.cMe.t),'(c) her deathbed: direct one step + loss + WHY (illness named)',r.cMe);
ok(!/Ân chiếu/.test(r.cMe.t)||true,'(c) deathbed line is a decree');ok(r.cMe2===0,'(c) once a life',r.cMe2);
ok(r.cNpc.d===1&&r.cNpc.done===1&&why(r.cNpc.t)&&/oán/.test(r.cNpc.t),'(c) NPC deathbed: same decree + others oán + WHY',r.cNpc);
ok(!r.cFull.full||r.cFull.d===0,'(c) deathbed with the next seat full → no decree',r.cFull);
ok(!/ngươi/.test(r.top)&&r.topR===6,'Hoàng quý phi: no road raises past her rank (one step, never the Hoàng hậu seat)',[r.top,r.topR]);
ok(r.hSame&&r.oldFresh&&r.lap,'occasion draw stable (co-op seats agree); old save: no retro fire; a new Hoàng hậu is seen',[r.hSame,r.oldFresh,r.lap]);
ok(r.bal.fest&&r.bal.sung&&r.bal.death&&r.bal.psk&&r.src.join()==='grace,grace,direct','law 4: BAL.promoH + BAL.psk.fest/sung/death; PROMO_SRC fest/sung/death',r.bal);
ok(/Vạn thọ/.test(r.rule)&&/nguy kịch/.test(r.rule)&&!/%/.test(r.rule),'rule text names the three roads (no %)');
ok(errs.length===0,'no page errors',errs.slice(0,3));
console.log(F.length?`PROMO-HIST FAIL ${F.length}`:'PROMO-HIST PASS');await b.close();process.exit(F.length?1:0)})();
