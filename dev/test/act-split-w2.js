/* ACT SPLIT waves 2 + 3 checks (review/act-split-w2): festivals have ONE dialog per day (j71) and their light acts at the festival's place
   ("!", fired on arrival, once a year); j7 festival events + coldvisit out of the random pool; no act of the light event repeats this year's
   j71 act (AS_SAME); "Thả đèn cầu con" → the Hành sự card wish "Cầu con"; stroll takes the first "!" slot (≤2 per buổi) + frequency over
   300 buổi before/after; night sneaking (odds + BAL.ad.nightSneak, caught Danh + BAL.ad.nightCaught); the night cold-palace call; one door
   for "Nghe lén câu chuyện"; old save loads.   usage: node dev/test/act-split-w2.js <url> [W]x[H]@dpr  → "ok/FAIL" lines + "FAIL n" */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [,,URL,SZ]=process.argv;const [WH,DPR]=(SZ||'1180x820@1').split('@');const [W,H]=WH.split('x').map(Number);
/* the wave-1 roll (before this branch), to compare the stroll frequency on the same states */
const OLD=`window.__oldRoll=function(){const L=[],W=S.where||{};const used=new Set();const add=(k,id,x)=>{if(!k||used.has(k)||!adOpenOk(k))return false;used.add(k);L.push({k,id,x:x||null,done:0});return true};
 const C=[];if(W.emp==="vuon")C.push(()=>add("vuon","emp"));if(liveRivals(true).filter(v=>!v.confined).length>=2)C.push(()=>add("vuon","quarrel"));
 for(const p of places()){if(p.k==="home")continue;if(adPresent(p.k).length>=2){C.push(()=>add(p.k,"gossip"));break}}
 const n=roll(65)?(roll(35)?2:1):0;const S2=shuf(C);for(const f of S2){if(L.length>=n)break;f()}return L}`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);await p.evaluate(OLD);let fail=0;const ck=(n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(info!=null?' · '+JSON.stringify(info).slice(0,400):''))};
 const r=await p.evaluate(()=>{const scen=n=>{for(let i=0;i<12;i++){AA.scen(n);if(!adSrv()&&!S.out&&!S.dead&&!S.confined)return true}return false};scen('cao');const out={};S.bac=500;S.suc=90;const clr=()=>{Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}};
  const setDay=(k,bu)=>{const F=FEST[k];S.month=F.m;S.tuan=F.t[0];S.buoi=bu||0;used=0;S.adHap=null;clr();try{goTo("home")}catch(e){}clr()};
  /* 1. day start of a festival: no j31 light dialog, festDone set, the j71 dialog still comes */
  {const k="nguyentieu",F=FEST[k];S.month=F.m;S.tuan=F.t[0]-1>=0?F.t[0]-1:0;if(F.t[0]===0){S.month=F.m-1||12;S.tuan=2}S.buoi=BUOI.length-1;S.festDone="";clr();delete (S.j71||{}).fy;
   try{endTurn()}catch(e){out.etErr=e.message}out.startDay=[S.month,S.tuan];out.startQ=Q.map(m=>({t:String(m.t||"").slice(0,60),pid:m.pid||"",light:m.ev==="fest"&&!m.pid}));out.festDone=S.festDone;clr();scen('cao');S.bac=500;S.suc=90}
  /* 2. j7 festival events + coldvisit out of the random pool */
  {const ids=[];for(const m of [5,7,9,10,11,12]){S.month=m;S.seen={};rivals.forEach(v=>{});ids.push(...freshEvents().map(e=>e.id))}out.j7out=ids.filter(i=>["doanngo","trungcuu","vulan","dongchi","thbirthday","coldvisit"].includes(i))}
  /* 3. every festival with light acts: "!" at its place, open, fires once, options */
  out.fest={};for(const k of Object.keys(AS_FPLACE)){setDay(k,0);S.adFest={};S.adF71=null;try{S.seen={}}catch(e){}
   const L=adHapNow();const h=L.find(x=>x.id==="fest");const pk=AS_FPLACE[k];const acc=accessOf(S,pk);
   const st={hap:L.map(x=>x.k+":"+x.id),atPlace:h&&h.k===pk,open:!!acc.ok,n:L.length};
   used=0;clr();goTo(pk);st.arrived=S.place===pk;st.q=Q.map(m=>String(m.t||"").slice(0,40)+": "+(m.opts||[]).map(o=>o.n).join(" / "));st.done=asFestDone(k);
   clr();goTo("home");clr();S.adHap=null;const L2=adHapNow();st.again=L2.some(x=>x.id==="fest");out.fest[k]=st}
  /* 4. the same act as this year's j71 dialog is left out */
  {setDay("newyear",0);S.adFest={};S.adF71={y:S.year,k:"newyear",t:"Tết Nguyên đán · Lời mời: Thi câu đối Tết"};used=0;goTo(AS_FPLACE.newyear);out.sameQ=Q.map(m=>(m.opts||[]).map(o=>o.n));clr();goTo("home");clr()}
  {setDay("doanngo",0);S.adFest={};S.seen={};S.adF71={y:S.year,k:"doanngo",t:"Tết Đoan ngọ · Đặt cược"};used=0;goTo(AS_FPLACE.doanngo);out.sameQ7=Q.map(m=>(m.opts||[]).map(o=>o.n));clr();goTo("home");clr()}
  /* 5. Thả đèn: one home (the Hành sự card), wish "Cầu con" on Nguyên tiêu */
  {setDay("nguyentieu",BUOI.length-1);deal();const i=deck.findIndex(a=>a.n==="Thả đèn hoa đăng");out.denCard=i;if(i>=0){clr();act(i);const m=Q.find(x=>/thả đèn$/.test(x.t||""));out.denQ=Q.map(x=>x.t);out.denOpts=(m&&m.opts||[]).map(o=>o.n);clr()}
   out.lightNoDen=!AS_LIGHT.nguyentieu().opts.filter(o=>o.n==="Thả đèn cầu con").length?"in source (filtered at fire)":"absent";}
  /* 6. stroll first, ≤2 per buổi, frequency over 300 buổi (same states, old vs new roll) */
  {scen('cao');S.bac=500;let emp=0,nNew=0,nOld=0,max=0,first=0,firstBad=0,tot=0,totOld=0;for(let t=0;t<300;t++){clr();S.adHap=null;const W=S.where||{};const inG=W.emp==="vuon";if(inG)emp++;
    const Ln=adHapRoll();const Lo=__oldRoll();tot+=Ln.length;totOld+=Lo.length;max=Math.max(max,Ln.length);if(Ln.some(x=>x.id==="emp")){nNew++;if(Ln[0].id==="emp")first++;else firstBad++}if(Lo.some(x=>x.id==="emp"))nOld++;
    used=0;clr();try{if((S.buoi||0)>=B4L){S.buoi=0;endTurn()}else nextBuoi()}catch(e){}if(S.dead)break}
   out.stroll={buoi:300,empInGarden:emp,before:nOld,after:nNew,first,firstBad,max,marksBefore:totOld,marksAfter:tot}}
  /* 7. night sneaking */
  {scen('cao');const k="dtd";S.buoi=0;const od=accSneakO(k),pd=accSneakPen(k).danh,ld=accSneakLine(k,1);S.buoi=BUOI.length-1;const on=accSneakO(k),pn=accSneakPen(k).danh,ln=accSneakLine(k,1);
   out.sneak={day:[od,pd],night:[on,pn],dayLine:ld,nightLine:ln,bal:[BAL.ad.nightSneak,BAL.ad.nightCaught]}}
  /* 8. the cold-palace call: night only, at Trường Môn viện */
  {scen('cao');clr();const v=liveRivals(false).find(x=>!x.queen);if(v){v.out=true}S.seen={};S.month=4;S.tuan=1;S.buoi=0;S.adHap=null;const Ld=adHapNow();S.buoi=BUOI.length-1;S.adHap=null;const Ln=adHapNow();
   out.cold={day:Ld.some(x=>x.id==="cold"),night:Ln.some(x=>x.id==="cold"&&x.k==="lc"),inPool:freshEvents().some(e=>e.id==="coldvisit")};used=0;clr();goTo("lc");out.cold.q=Q.map(m=>String(m.t||"").slice(0,40)+": "+(m.opts||[]).map(o=>o.n).join(" / "));
   out.cold.seen=S.seen&&S.seen.coldvisit!=null;clr();goTo("home");clr()}
  /* 9. one door for Nghe lén câu chuyện */
  {scen('cao');let k=null;const two=x=>{used=0;clr();goTo(x);clr();const ok=S.place===x&&curPeople().filter(q=>q.kind==="rival").length>=2;if(!ok){goTo("home");clr()}return ok};
   for(let t=0;t<60&&!k;t++){clr();k=places().map(x=>x.k).find(x=>x!=="home"&&adPresent(x).filter(v=>!v.queen).length>=2&&accessOf(S,x).ok&&two(x))||null;if(!k){used=0;try{if((S.buoi||0)>=B4L){S.buoi=0;endTurn()}else nextBuoi()}catch(e){}}}
   out.nghe={k};if(k){used=0;clr();goTo(k);clr();const P=curPeople();const I=P.map((x,i)=>i).filter(i=>P[i].kind==="rival");out.nghe.people=P.map(x=>x.kind+":"+x.name);
    if(I.length>=2){const [ia,ib]=I;popIdx=ia;const A=talkOpts(P[ia]);const j=A.findIndex(a=>a.n==="Nghe lén câu chuyện");out.nghe.has=j>=0;if(j>=0){talk(j);clr()}
     popIdx=ib;const B=talkOpts(P[ib]);const o=B.find(a=>a.n==="Nghe lén câu chuyện");out.nghe.lockB=!!(o&&o.lock);out.nghe.whyB=o&&o.t;
     /* next buổi: open again */S.adDoor.__nghe="x";const B2=talkOpts(P[ib]);out.nghe.reopen=!(B2.find(a=>a.n==="Nghe lén câu chuyện")||{}).lock;popIdx=null}}}
  /* 10. old save (no adFest / adF71 / adDoor.__nghe) loads and deals */
  {scen('dau');const d=JSON.parse(JSON.stringify(ser()));delete d.S.adFest;delete d.S.adF71;delete d.S.adHap;try{deser(d);deal();render();out.oldSave=deck.length}catch(e){out.oldSave="ERR "+e.message}}
  return out});
 const R=r;
 ck('day start: no j31 light dialog in the queue',R.startQ&&!R.startQ.some(x=>x.light),R.startQ);
 ck('day start: festDone still set (Phúc duyên dự lễ, co-op world key)',/nguyentieu/.test(R.festDone||""),R.festDone);
 ck('j7 festival events + coldvisit out of the random pool',R.j7out&&R.j7out.length===0,R.j7out);
 for(const k in R.fest){const s=R.fest[k];ck(`festival ${k}: "!" at its place, open, ≤2`,s.atPlace&&s.open&&s.n<=2,s.hap);ck(`festival ${k}: fires on arrival, once a year`,s.arrived&&s.q.length>=1&&s.done&&!s.again,s.q)}
 ck('same act as this year j71 (câu đối) left out',R.sameQ&&R.sameQ.length&&!R.sameQ.flat().includes('Dâng câu đối chúc Tết'),R.sameQ);
 ck('same act as this year j71 (Đặt cược thuyền rồng) left out',R.sameQ7&&R.sameQ7.length&&!R.sameQ7.flat().includes('Đặt cược thuyền rồng'),R.sameQ7);
 ck('Thả đèn: Hành sự card has the wish "Cầu con"',R.denCard>=0&&(R.denOpts||[]).includes('Cầu con'),R.denOpts);
 ck('Thả đèn cầu con not fired from the place (filtered)',R.fest.nguyentieu&&!R.fest.nguyentieu.q.join('|').includes('Thả đèn cầu con'),R.fest.nguyentieu&&R.fest.nguyentieu.q);
 ck('stroll takes the first slot, ≤2 per buổi',R.stroll.firstBad===0&&R.stroll.max<=2,R.stroll);
 ck('stroll more frequent after (300 buổi)',R.stroll.after>R.stroll.before,R.stroll);
 ck('night sneak: odds + nightSneak, caught Danh + nightCaught',R.sneak.night[0]===Math.min(95,R.sneak.day[0]+R.sneak.bal[0])&&R.sneak.night[1]===R.sneak.day[1]+R.sneak.bal[1]&&/đêm/.test(R.sneak.nightLine)&&!/đêm vắng/.test(R.sneak.dayLine),R.sneak);
 ck('cold-palace call: night only at lc, fires there, out of the pool',R.cold&&!R.cold.day&&R.cold.night&&!R.cold.inPool&&R.cold.q.length>=1&&R.cold.seen,R.cold);
 ck('Nghe lén câu chuyện: one door per place per buổi',R.nghe&&R.nghe.has&&R.nghe.lockB&&R.nghe.reopen,R.nghe);
 ck('old save loads and deals',typeof R.oldSave==="number"&&R.oldSave>5,R.oldSave);
 ck('no page errors',perr.length===0,perr.slice(0,5));
 console.log('STROLL',JSON.stringify(R.stroll));console.log('FAIL',fail);await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
