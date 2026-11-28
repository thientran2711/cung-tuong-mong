/* review/punish-reason (D1) — the punishment rules on the real page (dev/index.html), her and an NPC (law 1).
   usage: node dev/test/punish-reason.js <url> [W=755] [H=1000] [videoDir]
   Checks: one rank per punishment (Quý nhân → Thường tại, never Đáp ứng), no second rank punishment the same day (cấm túc instead),
   lãnh cung after a same-day demotion keeps the old rank, the reason notice has Ai tố / Vì sao / Chứng cứ / Hình phạt rows (real taps
   close it), an early Hoàng hậu ân xá waits until BAL.pun.coldMinDays days are served, then a one-rank-lower phục vị with its reason;
   an NPC: one rank, stay gate, one-rank release. Exit 1 on any failed check or page error. */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const [,,URL,W='755',H='1000',VID]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},serviceWorkers:'block',...(VID?{recordVideo:{dir:VID,size:{width:+W,height:+H}}}:{})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 const fails=[];const ok=(c,m)=>{if(!c)fails.push(m);console.log((c?'PASS ':'FAIL ')+m)};
 /* close every open notice by REAL taps on its button (#mr .kbtn / opts), reading each title + its kit rows */
 async function drain(max=12){const seen=[];for(let i=0;i<max;i++){const q=await p.evaluate(()=>Q.length);if(!q)break;
   const info=await p.evaluate(()=>{const M=document.getElementById('modal');showModal();return {t:Q[0]&&Q[0].t||'',body:M.innerText.replace(/\s+/g,' ')}});
   seen.push(info);await sleep(700);
   const btn=await p.$('#modal:not([hidden]) #mr .kbtn')||await p.$('#modal:not([hidden]) #mr button')||await p.$('#modal:not([hidden]) .kpopts button, #modal:not([hidden]) .opts button');
   if(btn){await btn.click({timeout:3000}).catch(async()=>{await p.evaluate(()=>closeModal())})}else await p.evaluate(()=>closeModal());await sleep(400)}return seen}
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());document.querySelectorAll("[class^=km],[id^=kr],.kchest,#kchest").forEach(e=>{if(getComputedStyle(e).position==="fixed")e.remove()});Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.buoi=0;used=0;deal();render()});await sleep(500);
 /* setup: she is Quý nhân (2); an accuser who holds 2 true pieces on her (a real deed in the jtruth ledger) */
 const setup=await p.evaluate(()=>{S.rank=2;S.out=0;S.punWk=null;S.punR=null;S.confined=0;const v=liveRivals(true).find(x=>!x.queen&&x.rank>=1);deedAdd(S,"rumor",v,1,"tung tin đồn hại người");deedAdd(S,"musk",v,2,"bỏ xạ hương vào túi thơm");evA(v,S,2);return {v:rivals.indexOf(v),name:v.name,ev:evG(v,S)}});
 console.log('setup',JSON.stringify(setup));
 /* 1. one fall: never two ranks (force the demotion branch, not lãnh cung) */
 await p.evaluate((id)=>{const v=rivals[id];const r0=Math.random;Math.random=()=>0.01;ACTX={a:v,pen:0};try{demote(S,"bị tố mưu hại phi tần")/* PUNISH-TIER: a single-rank road (fall is now giáng + lãnh cung) */}finally{ACTX={a:null,pen:0};Math.random=r0}render()},setup.v);
 let st=await p.evaluate(()=>({rank:S.rank,out:S.out,last:S.punLast}));ok(st.rank===1&&!st.out,`fall: Quý nhân → ${st.rank===1?'Thường tại':'rank '+st.rank} (one rank)`);
 let seen=await drain();const n1=seen.find(x=>/giáng/i.test(x.t));ok(!!n1,'reason notice shown: '+(n1?n1.t:'none'));
 const body=n1?n1.body:'';ok(/Ai tố/i.test(body)&&body.includes(setup.name),'notice names WHO ('+setup.name+')');ok(/Vì sao/i.test(body)&&/mưu hại/.test(body),'notice says WHY');
 ok(/Chứng cứ/i.test(body)&&/xạ hương/.test(body),'notice lists WHICH evidence (kind + piece)');ok(/Thường tại/.test(body)&&/Quý nhân/.test(body),'notice says the punishment from → to');
 /* 2. a second fall the same day: cấm túc, no second rank */
 await p.evaluate((id)=>{const v=rivals[id];ACTX={a:v,pen:0};try{demote(S,"bị tố lần nữa")}finally{ACTX={a:null,pen:0}}render()},setup.v);
 st=await p.evaluate(()=>({rank:S.rank,conf:S.confined}));ok(st.rank===1&&st.conf>0,`second fall same day: rank stays ${st.rank}, cấm túc ${st.conf}`);await drain();
 /* 3. lãnh cung the same day: the one punishment, the old rank (Quý nhân) is the one kept for phục vị */
 await p.evaluate((id)=>{ACTX={a:rivals[id],pen:0};try{cold("Ngươi bị tố tư thông")}finally{ACTX={a:null,pen:0}}render()},setup.v);
 st=await p.evaluate(()=>({out:S.out,cr:S.coldRank,cf:S.coldFrom,wk:S.coldWk,now:wk()}));ok(st.out&&st.cf===2&&st.cr===1,`lãnh cung after a same-day demotion: minh oan gives back Quý nhân (coldFrom ${st.cf}), the title kept inside stays Thường tại (coldRank ${st.cr}; PUNISH-TIER, one rank in all)`);
 seen=await drain();const n3=seen.find(x=>/Lãnh cung/.test(x.t));ok(!!n3&&/Ai tố/i.test(n3.body)&&/Vì sao/i.test(n3.body)&&/ít nhất/.test(n3.body),'lãnh cung notice: who / why / stay days');
 /* 4. Hoàng hậu ân xá on day 0: waits; after the stay: phục vị one rank below (Thường tại) with the reason */
 const q=await p.evaluate(()=>{let q=queenP&&queenP();if(!q||q===S){q=liveRivals(true).find(x=>!x.out);q.queen=true;q.rank=6}return rivals.indexOf(q)});
 await p.evaluate((id)=>{hhAct(rivals[id],S,"pardon");render()},q);st=await p.evaluate(()=>({out:S.out,pend:!!S.coldPend}));ok(st.out&&st.pend,'early ân xá waits (still in lãnh cung, pardon pending)');
 seen=await drain();ok(seen.some(x=>/Chờ ngày/.test(x.t)),'notice: «Chờ ngày ra lãnh cung»');
 const days=await p.evaluate(()=>BAL.pun.coldMinDays);let freedDay=-1;
 const w0=await p.evaluate(()=>S.coldWk);for(let d=1;d<=14;d++){await drain(25);await p.evaluate(()=>{used=BAL.time.khac;S.buoi=B4L;Q.length=0;nextBuoi()});await sleep(600);const o=await p.evaluate(()=>({out:S.out,wk:wk()}));seen=await drain(25);if(!o.out){freedDay=o.wk-w0;var nf=seen.find(x=>/Rời lãnh cung/.test(x.t));break}}
 st=await p.evaluate(()=>({out:S.out,rank:S.rank}));ok(!st.out&&freedDay>=days,`freed on day ${freedDay} (stay ${days})`);ok(st.rank===1,`phục vị one rank below Quý nhân: rank ${st.rank}`);
 ok(typeof nf!=='undefined'&&nf&&/Vì sao được ra/i.test(nf.body)&&/thiện cảm/.test(nf.body)&&/Vì sao phẩm này/i.test(nf.body),'release notice: why freed (Hoàng hậu, thiện cảm) + why this rank '+(typeof nf!=='undefined'&&nf?nf.body.slice(0,400):'none'));
 /* 5. NPC (law 1): one rank, stay gate, one-rank release */
 const r=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.queen&&x.rank>=3&&!x.out)||liveRivals(true).find(x=>!x.queen&&!x.out);v.rank=3;v.punWk=null;const r0=Math.random;Math.random=()=>0.01;try{demote(v,"bị tố")}finally{Math.random=r0}const a=v.rank;
   v.punWk=null;Math.random=()=>0.99;try{fall(v,"bị tố nặng",null,"nang")/* PUNISH-TIER nặng: giáng + lãnh cung */}finally{Math.random=r0}const out=!!v.out;const r1=v.rank;coldStamp(v);hhAct(queenP(),v,"pardon");const early=!!v.out;v.coldWk-=BAL.pun.coldMinDays;hhAct(queenP(),v,"pardon");return {a,out,early,late:!!v.out,r1,rel:v.rank,ob:!!BAL.pun.npcOneBelow}});
 ok(r.a===2,`NPC fall: Tần → rank ${r.a}`);ok(r.out&&r.early,'NPC lãnh cung: early ân xá refused');ok(!r.late&&r.rel===r.r1,`NPC release after the stay (title kept inside, seat-free): rank ${r.r1} → ${r.rel} (PUNISH-TIER rule 4)`);
 ok(!errs.length,'no page errors '+errs.slice(0,3).join(' | '));
 await ctx.close();await b.close();console.log(fails.length?`FAILED ${fails.length}`:'ALL PASS');process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
