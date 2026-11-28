/* review/charge-followups (b)+(c): D4 table A extras + Trình Hoàng hậu per proven piece. Real game functions, both directions (law 1).
   (b1) Ức hiếp quấy phá proven → the guilty pays BAL.charge.uhPay to each person she harmed (her too), her notice has a «Bồi thường» row;
   (b2) Mua chuộc người hầu proven → the servant she bought (spyFor = her, named by the deed) is dismissed (asOut "expel"), her notice row;
   (c)  «Trình Hoàng hậu» odds move with the pieces of the PROVEN charge only (BAL.charge.trinh), never with pieces of another charge.
   usage: node dev/test/charge-followups.js <index.html path or url> → exit 1 on a fail / page error */
const {chromium}=require('playwright');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv[2]||require('path').join(__dirname,'..','..','index.html');const URL=/^(file|https?):/.test(A)?A:'file://'+require('path').resolve(A);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1000);
 const R=await p.evaluate(()=>{BAL.charge.rep.n=99;/* PUNISH-TIER: the repeat-nhẹ rule is tested in punish-tier.js; these steps punish the same people many times */const out=[];const ok=(c,m)=>out.push([!!c,m]);const B=BAL.charge;
  const L=liveRivals(true).filter(x=>!x.queen&&!x.coop);const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.evc={};x.evq={};x.ev=0;x.out=x===S?0:false;x.confined=0;x.punWk=null};
  const [v,w,u]=L;[v,w,u,S].forEach(clean);S.evc={};S.evq={};S.rank=3;v.rank=2;w.rank=2;u.rank=2;
  /* ROW 12 r3 (no __awoff): a charge on HER brought by an NPC is HELD by the jaccw gate (warned 2 buổi ahead); the WHOLE penalty waits —
     nothing paid, nobody dismissed, no notice — then falls together with its rows when the record fires (awFire = its due buổi) */
  const HF=(f,tag)=>{const b=S.bac,st=(S.staff||[]).length,q0=Q.length,ids0=Object.keys(S.accw||{});f();const ids=Object.keys(S.accw||{}).filter(k=>!ids0.includes(k)&&S.accw[k]&&S.accw[k].k==="core");
   ok(ids.length===1&&S.accw[ids[0]].fn==="chPunish"&&S.bac===b&&!/Bồi thường|Người hầu bị mua/.test(Q.slice(q0).map(m=>String(m.h||"")+JSON.stringify(m.sections||m.kit||"")).join(" ")),`${tag}: held whole (record ${ids.map(k=>S.accw[k].fn)}, bạc ${S.bac-b}, no notice rows yet)`);ids.forEach(id=>awFire(id))};
  const notes=()=>Q.map(m=>String(m.h||"")+JSON.stringify(m.sections||m.kit||"")).join(" ").replace(/<[^>]+>/g," ");
  ok(B.uhPay>0&&B.mcFire>0&&B.trinh&&B.trinh.per>0,`BAL.charge keys uhPay ${B.uhPay} · mcFire ${B.mcFire} · trinh ${JSON.stringify(B.trinh)}`);
  /* (b1) NPC v bullied w and u → proven by her: v pays each */
  v.bac=Math.max(v.bac||0,3*B.uhPay);deedAdd(v,"trip",w,1,"ngáng chân "+w.name);deedAdd(v,"batnat",u,1,"bắt nạt "+u.name);const b0=[v.bac||0,w.bac||0,u.bac||0];
  Q.length=0;chPunish(v,"uh","bị tố giác",S);const b1=[v.bac||0,w.bac||0,u.bac||0];
  ok(b1[0]-b0[0]===-2*B.uhPay&&b1[1]-b0[1]===B.uhPay&&b1[2]-b0[2]===B.uhPay,`ức hiếp NPC: guilty ${b1[0]-b0[0]}, victims +${b1[1]-b0[1]} / +${b1[2]-b0[2]} (uhPay ${B.uhPay} each)`);
  /* her as the guilty one: she pays the victim; her notice shows the row */
  clean(S);clean(w);deedAdd(S,"trip",w,1,"ngáng chân "+w.name);const s0=S.bac,w0=w.bac||0;Q.length=0;HF(()=>chPunish(S,"uh","bị tố giác",v),"ức hiếp her");
  ok(S.bac-s0===-B.uhPay&&(w.bac||0)-w0===B.uhPay,`ức hiếp her: she ${S.bac-s0}, victim +${(w.bac||0)-w0}`);ok(/Bồi thường/.test(notes())&&new RegExp("bồi "+B.uhPay+" lượng bạc cho "+w.name).test(notes()),'her notice: «Bồi thường» row names the victim');
  /* her as the victim */
  clean(S);clean(v);S.confined=0;deedAdd(v,"trip",S,1,"ngáng chân ngươi");const s1=S.bac;chPunish(v,"uh","bị tố giác",S);ok(S.bac-s1===B.uhPay,`ức hiếp on her: she receives +${S.bac-s1}`);
  /* rv: a guilty one short of bạc pays only what she has; the victims get exactly that (no bạc made from nothing, law 6c) — NPC and her */
  clean(v);clean(w);clean(u);deedAdd(v,"trip",w,1,"ngáng chân "+w.name);deedAdd(v,"batnat",u,1,"bắt nạt "+u.name);v.bac=Math.round(B.uhPay/2);const p0=[v.bac,w.bac||0,u.bac||0];chPunish(v,"uh","bị tố giác",S);
  ok(v.bac===0&&(w.bac||0)-p0[1]+(u.bac||0)-p0[2]===p0[0],`ức hiếp NPC short of bạc: paid ${p0[0]}, victims got ${(w.bac||0)-p0[1]+(u.bac||0)-p0[2]}, left ${v.bac}`);
  clean(S);clean(w);deedAdd(S,"trip",w,1,"ngáng chân "+w.name);const sb=S.bac;S.bac=Math.round(B.uhPay/2);const q0=w.bac||0;HF(()=>chPunish(S,"uh","bị tố giác",v),"ức hiếp her short");
  ok(S.bac===0&&(w.bac||0)-q0===Math.round(B.uhPay/2),`ức hiếp her short of bạc: victim +${(w.bac||0)-q0} = what she had`);S.bac=sb;S.confined=0;
  /* (b2) NPC v bought a servant of w (real bribeServ when it exists, else the deed + spyFor) */
  clean(v);clean(w);w.staff=w.staff||[];if(!w.staff.length&&typeof mkServ==="function")w.staff.push(mkServ("maid"));const sv=w.staff[0];
  let viaReal=false;if(sv){try{const r0=Math.random;Math.random=()=>0;try{viaReal=!!bribeServ(v,sv)}finally{Math.random=r0}}catch(e){}if(sv.spyFor!==key(v)){sv.spyFor=key(v);const d=deedAdd(v,"sbribe",null,1,"mua chuộc người hầu của "+w.name);d.s=sv.sid;d.o=key(w)}}
  const dd=(v.wrongs||[]).filter(d=>d.k==="sbribe").pop();ok(!!sv&&!!dd&&(dd.s===sv.sid),`the bribe deed names the servant (real bribeServ ${viaReal}, d.s ${dd&&dd.s} = ${sv&&sv.sid})`);
  Q.length=0;chPunish(v,"mc","bị tố giác",S);ok(sv&&!w.staff.includes(sv)&&sv.out==="expel",`mua chuộc NPC: ${sv&&sv.name} dismissed (out ${sv&&sv.out}, in staff ${sv&&w.staff.includes(sv)})`);
  /* an NPC bought HER servant → proven: her servant is dismissed, her log says so */
  clean(v);S.staff=S.staff||[];if(!S.staff.some(s=>s&&!s.coop&&s!==S.maid))S.staff.push(mkServ("maid"));const ms=S.staff.find(s=>s&&!s.coop&&s!==S.maid);let mine=false;if(ms){ms.spyFor=key(v);const d=deedAdd(v,"sbribe",null,1,"mua chuộc người hầu của ngươi");d.s=ms.sid;d.o="me";chPunish(v,"mc","bị tố giác",S);mine=!S.staff.includes(ms)}
  ok(!!ms&&mine,`mua chuộc on her palace: her bought servant ${ms&&ms.name} dismissed`);
  /* her as the guilty one: her notice row */
  clean(S);clean(u);u.staff=u.staff||[];if(!u.staff.length&&typeof mkServ==="function")u.staff.push(mkServ("maid"));const su=u.staff[0];
  if(su){su.spyFor="me";const d=deedAdd(S,"sbribe",null,1,"mua chuộc người hầu của "+u.name);d.s=su.sid;d.o=key(u);Q.length=0;HF(()=>chPunish(S,"mc","bị tố giác",v),"mua chuộc her");
   ok(!u.staff.includes(su)&&/Người hầu bị mua/.test(notes()),`mua chuộc her: ${su.name} dismissed, notice row «Người hầu bị mua»`)}
  /* (c) Trình Hoàng hậu: pieces of another charge do not move the odds; pieces of the proven one do */
  const q=(rivals||[]).find(x=>x&&x.queen&&x.alive!==false);if(q&&ACT.trinhhh){clean(w);deedAdd(w,"poison",u,2,"bỏ độc");deedAdd(w,"trip",u,1,"ngáng chân");deedAdd(w,"vp",null,1,"vượt phẩm");
   for(const s of allServ().filter(s=>s&&s.sid!=null).slice(0,3))chSawAdd(w,"mh","s"+s.sid);/* REAL-PROOF: real servants saw it */S.evc={};S.ewc={};const nm=chNeed(w,"mh");/* PUNISH-TIER: mưu hại needs tier vừa = 2 */evA(S,w,nm+chWitNeed(w,"mh"),"mh");/* PUNISH-TIER-3: + its witness */const o1=chTrinhO(S,w,q);evA(S,w,1,"vp");const o2=chTrinhO(S,w,q);
   ok(o1===o2,`another charge's piece does not change Trình Hoàng hậu: ${o1} = ${o2}`);
   ok(Math.round(o1-(B.trinh.base+aff(q,S)/B.trinh.affD))===nm*B.trinh.per,`${nm} proven pieces × ${B.trinh.per}: ${Math.round(o1)}`);
   const oc=ACT.trinhhh.o(S,w);ok(typeof oc==="number"&&oc>0,`card odds read the rule: ${oc}`)}else ok(true,'no Hoàng hậu in this world: (c) skipped');
  return out});
 let bad=0;for(const [c,m] of R){if(!c)bad++;console.log((c?'PASS ':'FAIL ')+m)}
 console.log(`page errors: ${errs.length} ${JSON.stringify(errs.slice(0,3))}`);if(errs.length)bad++;
 console.log(bad?`charge-followups: ${bad} FAIL`:'charge-followups: ALL PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
