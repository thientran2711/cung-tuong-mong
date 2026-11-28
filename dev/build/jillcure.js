/* ================= jillcure: ILLNESS WITH A CURE ROAD (worker ILLNESS-CURE, MAIN 182; Foreman E 23:36Z, robot R2-greedy-5 b1096) =================
   Fault: «Lao phổi · nặng» (her status chip) opened a card with only «Lui» while Sức read 91–95, then «nguy kịch, không qua khỏi».
   Roots: (1) the chip had no explain text → a bare card; (2) the Hành sự door «Bắt mạch, chữa bệnh» hid the cure behind the pulse-reading
   roads (jone tier fix); (3) turning nặng / nguy kịch was only a log line, no card; (4) Sức never reads illness, so a full Sức looked safe;
   (5) jbal2 / jmort rolled death in the same month the illness turned nguy kịch (no month to act).
   This module: ONE illness card (the door's tier card, kit DOOR.card / kitHand) with the honest monthly danger line in words, opened by
   the status chip, by the door, and once by itself when the illness turns nặng or nguy kịch; NPCs take the same roads at the same prices (law 1).
   Numbers: BAL.illCure (jbal2), BAL.odb.j13, BAL.illDie, BAL.mort (law 4). Words: chanceW (kèm risk words, j1). */
(function(){if(typeof illOf!=="function"||typeof ILL!=="object")return;
const IC={opened:0,alarm:0,npc:0};window.IC=IC;
const cl=(n)=>Math.max(0,Math.min(100,n));
/* the real monthly odds of an untreated illness (the same rolls as j13 illMonthP + jbal2 + jmort) */
function illMonthOdds(p){const i=illOf(p);if(!i)return null;const d=ILL[i.k];let c=0;try{c=careOdds(p)}catch(e){}
 const cure=cl(BAL.odb.j13.rbIllMonthP+c-(d.slow?BAL.illCure.slow:0))/100;
 const worse=i.st<3?(1-cure)*cl(BAL.odb.j13.rbIllMonthP_2-c/2)/100:0;
 const a=d.die?cl(25*d.die)/100:0,b=d.die&&BAL.illDie?cl(25*d.die*BAL.illDie)/100:0;let g=0;
 try{const M=BAL.mort,ag=typeof ageOf==="function"?ageOf(p):0;if(M&&M.on!==false&&M.dieAge&&d.die&&ag>M.dieAge[0])g=cl(M.dieAge[2]*d.die*(ag-M.dieAge[0])/M.dieAge[1])/100}catch(e){}
 const die3=(1-cure)*(1-(1-a)*(1-b)*(1-g));
 return{cure:Math.round(cure*100),worse:Math.round(worse*100),die3:Math.round(die3*100),deadly:!!d.die}}
IC.odds=illMonthOdds;
/* the danger line she reads on the illness card (words only, law 7) */
function illDanger(p){const i=illOf(p);if(!i)return"";const d=ILL[i.k];
 if(i.mort)return `${illName(p)}. Thái y nói mạch yếu dần; thuốc thang chỉ giữ được thêm ít lâu.`;
 const o=illMonthOdds(p);if(!o)return"";const P=[`${illName(p)}.`];
 if(!o.deadly){P.push(`Bệnh này không nguy đến tính mạng, nhưng còn bệnh thì mỗi tháng hao Sức. Không chữa, mỗi tháng tự khỏi: ${chanceW(o.cure)}.`);return P.join(" ")}
 if(i.st<3)P.push(`Không chữa, mỗi tháng tự khỏi: ${chanceW(o.cure)} · trở ${STG[i.st+1]}: ${chanceW(o.worse)}.`);
 P.push(i.st>=3?`Mỗi tháng không qua khỏi: ${chanceW(o.die3)}.`:`Đến lúc nguy kịch, mỗi tháng không qua khỏi: ${chanceW(o.die3)}.`);
 P.push("Sức còn đầy cũng không giữ được mạng; phải chạy chữa.");return P.join(" ")}
IC.danger=illDanger;window.illDanger=illDanger;
const DOOR_K="hs-thaiy";
/* the deck door row (DOOR.D: Hành sự doors; DOOR.byK reads only the talk doors DOOR.T) */
const doorRow=()=>{try{return typeof DOOR==="object"&&DOOR?((DOOR.D||[]).find(r=>r.k===DOOR_K)||(DOOR.byK&&DOOR.byK(DOOR_K))||null):null}catch(e){return null}};
/* the door card line: while she is ill, the danger line stands where «Chọn mức.» stood (the same card from the Hành sự door) */
if(typeof DOOR==="object"&&DOOR&&DOOR.card){const c0=DOOR.card;DOOR.card=function(t,h,rows,who){try{const r=doorRow();if(r&&t===r.n&&S&&illOf(S))h=`${illDanger(S)} Chọn mức.`}catch(e){}return c0.call(this,t,h,rows,who)}}
/* the cure cards stand in the deck as soon as she falls ill (a mid-buổi illness waited for the next deal before) */
function illDeck(){if(!S||!illOf(S)||!Array.isArray(deck)||typeof illCards!=="function")return;try{for(const c of illCards())if(c&&!deck.some(a=>a&&a.n===c.n))deck.push(c)}catch(e){console.error("illDeck",e)}}
IC.deck=illDeck;
/* ONE illness card: the door's tier rows (ONE.tierRows: nhẹ · vừa · nặng, one way per tier by the ONE pick) over the deck cards; every row runs act(i) */
function illOpen(){if(!S||S.dead||!illOf(S)||(typeof Q!=="undefined"&&Q.length))return false;IC.opened++;
 const r=doorRow();
 const srv=typeof isSrv==="function"&&isSrv();
 if(r&&!srv&&typeof ONE==="object"&&ONE&&ONE.tierRows){illDeck();
  const L=[];deck.forEach((a,i)=>{if(!a||!r.re||!r.re.test(String(a.n||"")))return;let why="";try{why=String(cardWhy(a)||"")}catch(e){}
   let k=1;try{k=cardCost(a)}catch(e){}const ok=!a.done&&!a.lock&&!why&&can(k)&&(typeof canPay!=="function"||canPay(a));
   if(!ok)why=why||(a.lock&&a.t)||(typeof canPay==="function"&&!canPay(a)?"không đủ bạc":"")||(typeof whyTime==="function"?whyTime(k):"")||"chưa làm được lúc này";
   let x=a.x||"";try{if(DOOR.lineOf)x=DOOR.lineOf(a)||x}catch(e){}
   L.push({id:"d:"+a.n,n:a.n,a,x,off:!ok,why:ok?"":why,cost:k,go:()=>{setTimeout(()=>{try{act(i)}catch(e){console.error("illOpen way",e)}},0)}})});
  const R=ONE.tierRows(r,L,"me");
  if(R.length){const sd=t=>[S.turn||0,S.buoi||0,"me",r.k,t||""].join(":");
   const rows=R.map(x=>{const o={n:x.n,x:x.x,ddoor:1,go:()=>{const m=ONE.pick(r,x.T,sd(x.t));if(m)ONE.runM(r,m,x.T,x.t)}};if(x.off)o.off=x.off;
    try{const a=x.m&&x.m.a;if(a&&!a.lock&&oddsOf(a)<100)o.p=optOdds(a)}catch(e){}return o});
   let wh=null;try{wh=typeof pMe==="function"?pMe():null}catch(e){}DOOR.card(r.n,"",rows,wh);try{showModal()}catch(e){}return true}}
 /* no deck road here (cung nữ life …): the honest card alone */
 Q.unshift({t:illName(S),h:`<p>${illDanger(S)}</p>`});try{showModal()}catch(e){}return true}
IC.open=illOpen;window.illOpen=illOpen;
/* her status chip (hud2 «data-hx=ill», top bar «data-k3=ill»): the illness card, never a bare «Lui» */
window.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-hx="ill"],[data-k3="ill"]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();
 try{if(typeof Q!=="undefined"&&Q.length)return;illOpen()}catch(x){console.error("ill chip",x)}},true);
/* the alarm: the month her illness turns nặng or nguy kịch, the card opens by itself once (when the screen is free) */
if(typeof illMonth==="function"){const m0=illMonth;illMonth=function(){const i0=S&&illOf(S);const st0=i0?i0.st:0;const ev=m0.apply(this,arguments);
 try{const i=S&&!S.dead&&illOf(S);if(i&&i.st>=2&&i.st>st0){S.illAlarm=1;IC.alarm++}}catch(e){}return ev};window.illMonth=illMonth}
function alarmTick(){try{if(!S||!S.illAlarm||S.dead)return;if(!illOf(S)){delete S.illAlarm;return}if(typeof Q!=="undefined"&&Q.length)return;delete S.illAlarm;illOpen()}catch(e){console.error("ill alarm",e)}}
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(S&&S.illAlarm)setTimeout(alarmTick,0)}catch(e){}return r};window.render=render}
/* NPCs (law 1): a sick consort (nặng or worse) takes the best road she can pay, at her own prices (the same BAL roads as hers) */
const bestWay=p=>{const B=BAL.illCure;if((p.bac||0)>=B.tyBac)return["ty",{bac:-B.tyBac}];
 if(!p.out&&(p.sung||0)+B.cau.c.sung>=0)return["cau",B.cau.c];if(!p.out&&!p.confined&&(p.suc||0)+B.vien.c.suc>=0)return["vien",B.vien.c];return["rest",{}]};
IC.bestWay=bestWay;
if(typeof illMonthP==="function"){const p0=illMonthP;illMonthP=function(p){let ev="";
 try{const i=p&&p!==S&&p.alive!==false&&!p.dead&&!p.coop&&illOf(p);
  if(i&&!i.mort&&i.st>=2&&(typeof worldOn!=="function"||worldOn())&&roll(BAL.illCure.npc)){const [w,c]=bestWay(p);ap(p,c);const known=typeof illKnown==="function"&&illKnown(p);const nm=illName(p);
   const t=treat(p,w);IC.npc++;(IC.npcW=IC.npcW||{})[w]=(IC.npcW[w]||0)+1;
   if(known&&!illOf(p))ev+=`${p.name} ${w==="ty"?"truyền thái y":w==="cau"?"được ngự y chữa":w==="vien"?"xin thuốc Thái y viện":"tĩnh dưỡng"}, khỏi ${String(nm).split(" · ")[0].toLowerCase()}. `}}catch(e){console.error("ill npc",e)}
 return ev+p0.apply(this,arguments)};window.illMonthP=illMonthP}
})();
