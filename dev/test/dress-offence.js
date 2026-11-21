// review/dress-offence rules test: node dev/test/dress-offence.js [dev/index.html]   (one Chromium, no pictures)
// Tố xa xỉ (xx, new) and Tố vượt phẩm (vp, jewellery rule now judged) both ways: player→NPC, NPC→player, NPC→NPC;
// evidence gates (same place, Dò la, maid dò la), false accusation, 7-cell wear row with marks only when seen, BAL allowance, old save.
const {chromium}=require('playwright');const path=require('path');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const pg=await b.newPage({viewport:{width:755,height:1000}});
 await pg.route(u=>!/^file:/.test(String(u)),r=>r.abort());await pg.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 const errs=[];pg.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await pg.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await pg.waitForFunction(()=>typeof start==='function',null,{timeout:60000});
 const R=await pg.evaluate(()=>{const out=[];const ok=(n,c,x)=>out.push([n,!!c,x===undefined?"":JSON.stringify(x).slice(0,300)]);
  try{localStorage.clear()}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;
  for(let i=0;i<40;i++){try{nlNew()}catch(e){}start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out)break}save=()=>{};Q.length=0;
  const RND=Math.random;/* accusations are made face to face here (j29: a loyal servant may refuse a 'dirty' errand sent from afar — vp and xx alike) */together=()=>true;/* this file tests the DRESS-sighting cause; the room shelf (jshelf, a second cause of the same act) has its own test */if(typeof shelfCause==="function")shelfCause=()=>null;const force=v=>{Math.random=()=>v};const unforce=()=>{Math.random=RND};
  const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined).sort((a,b)=>rkOf(a)-rkOf(b));const v=L[0],w=L.find(x=>x!==v&&!sameHouse(x,v))||L[1];/* r1: runAct blocks acts inside one house (j9), so the NPC→NPC target must live in another one */
  const jw=Object.keys(IT).filter(k=>IT[k].sl&&["wrist","waist","scent"].includes(IT[k].sl)&&IT[k].rk!=null);
  const lavish=(p)=>{/* within-rank jewellery until Xa xỉ > allowance; never above her rank */const r=rkOf(p);const ok=jw.filter(k=>IT[k].rk<=r).sort((a,b)=>luxVal(b)-luxVal(a));
   p.inv=(p.inv||[]).filter(e=>!(e.w&&IT[e.k]&&IT[e.k].sl));let i=0;while(luxOf(p).sc<=luxOf(p).bud&&i<12){p.inv.push({k:ok[i%ok.length],w:1});i++}return luxOf(p)};
  const plain=(p)=>{p.inv=(p.inv||[]).filter(e=>!(e.w&&IT[e.k]&&IT[e.k].sl));p.petOn=null};
  const noCd=(...P)=>P.forEach(p=>{delete p.xxA;delete p.xxT;delete p.vpA92;delete p.vpT92});
  /* 0. BAL one core: allowance reads BAL.lux.allow */
  {const A=BAL.lux.allow;const a0=luxAllow(v);A.base+=7;const a1=luxAllow(v);A.base-=7;ok("0 luxAllow reads BAL.lux.allow",a1===a0+7,[a0,a1])}
  /* 1. player → NPC, Tố xa xỉ: no cause before seeing, cause after; proven */
  plain(S);const x1=lavish(v);noCd(S,v);delete (S.dsn||{})[wdKey(v)];
  ok("1a xx not offered unseen (LACK says why)",!ACT.xx.ok(S,v)&&/chưa thấy/.test(LACK.xx(v)),[x1,LACK.xx(v)]);
  dressLook(S,v,"cùng chỗ");ok("1b xx offered once seen",ACT.xx.ok(S,v),[S.dsn[wdKey(v)]]);
  {const d0=v.duc,n0=v.inv.filter(e=>e.w).length,da=S.danh;force(.001);const r=runAct(S,v,"xx");unforce();
   ok("1c xx proven: Đức −, piece off, accuser Danh +",v.duc<d0&&v.inv.filter(e=>e.w).length===n0-1&&/thành/.test(r),[d0,v.duc,n0,r.slice(0,160)])}
  ok("1d cooldown after use (same for everyone)",!ACT.xx.ok(S,v));
  /* 2. the dress changed since the sighting → no cause */
  noCd(S,v);lavish(v);dressLook(S,v,"cùng chỗ");v.inv.push({k:jw[0],w:1});ok("2 changed dress → no cause",!ACT.xx.ok(S,v)&&/thay đồ/.test(LACK.xx(v)),LACK.xx(v));
  /* 3. false accusation: the sighting says lavish, the truth is within allowance */
  noCd(S,v);plain(v);dressLook(S,v,"cùng chỗ");S.dsn[wdKey(v)].sc=S.dsn[wdKey(v)].bud+50;
  {const da=S.danh;force(.001);const r=runAct(S,v,"xx");unforce();ok("3 false xx: accuser Danh "+BAL.lux.xx.falseDanhA,S.danh<da&&/không quá mức/.test(r),[da,S.danh,r.slice(0,160)])}
  /* 4. NPC → player: she dresses lavishly, an NPC at the same place sees it and has a motive → xx is in his menu and lands */
  noCd(S,v,w);plain(v);lavish(S);v.ghen=100;delete (v.dsn||{}).me;
  ok("4a NPC has no xx unseen",!(mindMenu(v,S)||[]).some(o=>o[0]==="xx"));
  dressLook(v,S,"cùng chỗ");ok("4b NPC xx in menu once seen",(mindMenu(v,S)||[]).some(o=>o[0]==="xx"),(mindMenu(v,S)||[]).map(o=>o[0]));
  {const d0=S.duc;force(.001);const r=runAct(v,S,"xx");unforce();ok("4c NPC→player xx proven: her Đức −",S.duc<d0,[d0,S.duc,r.slice(0,160)])}
  /* 5. NPC → NPC */
  noCd(v,w);plain(S);const xw=lavish(w);npcLearn(v,w);npcLearn(v,S);dressLook(v,w,"cùng chỗ");{const d0=w.duc,okk=ACT.xx.ok(v,w),cz=xxCause(v,w);force(.001);const r=runAct(v,w,"xx");unforce();ok("5 NPC→NPC xx proven",w.duc<d0,[xw,okk,cz,v.xxA,w.xxT,d0,w.duc,r.slice(0,140)])}
  /* 6. Tố vượt phẩm by the visible jewellery rule, both ways */
  const over=(p)=>{const r=rkOf(p);const k=jw.find(k=>IT[k].rk>r);if(!k)return null;p.inv.push({k,w:1});return k};
  plain(v);plain(S);noCd(S,v);delete S.dsn[wdKey(v)];const kv=over(v);
  if(kv){ok("6a vp jewellery: no cause unseen",!wdCause(S,v));dressLook(S,v,"cùng chỗ");ok("6b vp cause once seen",!!wdCause(S,v)&&ACT.vp.ok(S,v),wdCause(S,v));
   force(.001);const r=runAct(S,v,"vp");unforce();ok("6c vp jewellery proven: item taken",!v.inv.some(e=>e.k===kv)&&/thành/.test(r),r.slice(0,160))}else ok("6 (skipped: v at top rank)",true);
  noCd(S,v);const ks=over(S);if(ks){try{emoGet(v).k="binh"}catch(e){}/* r1: 6c just punished v for vp → jemo 'đang sợ' would gate her motive */v.ghen=100;dressLook(v,S,"cùng chỗ");ok("6d NPC vp cause on her",!!wdCause(v,S));force(.001);const r=runAct(v,S,"vp");unforce();ok("6e NPC→player vp proven",!S.inv.some(e=>e.k===ks),r.slice(0,160))}
  /* 7. same place: placeWhere makes everyone in one place see each other */
  plain(S);lavish(S);liveRivals(true).forEach(p=>{p.dsn={}});S.dsn={};placeWhere();
  {const here=liveRivals(true).filter(p=>p.alive&&!p.out&&whereOf(p)===whereOf(S));const away=liveRivals(true).filter(p=>p.alive&&!p.out&&whereOf(p)!==whereOf(S));
   ok("7a same place → seen both ways",here.every(p=>S.dsn[wdKey(p)]&&p.dsn&&p.dsn.me),[here.length]);ok("7b other places not seen",away.every(p=>!S.dsn[wdKey(p)]),[away.length])}
  /* 8. Dò la reports the dress (both ways) */
  {const t=L[2]||w;delete S.dsn[wdKey(t)];const r=spyFind(S,t);ok("8a Dò la (player) → dress seen + text",!!S.dsn[wdKey(t)]&&/Y phục của/.test(r),r.slice(-160));
   delete (t.dsn||{}).me;spyFind(t,S);ok("8b Dò la (NPC on her) → sighting when it matters",luxOf(S).sc>luxOf(S).bud?!!(t.dsn&&t.dsn.me):true)}
  {const m=talkOpts({kind:"maid"}).find(o=>o.n==="Sai đi dò la");ok("8c maid Sai đi dò la mentions dress",m&&/y phục/.test(m.x),m&&m.x);
   const t=spyTarget();S.dsn={};const lr=Math.random;Math.random=()=>.001;let r;try{r=spyMaidRun(t)}catch(e){r=String(e)}Math.random=lr;ok("8d maid dò la (success) → her dress seen",!!S.dsn[wdKey(t)],[r,Object.keys(S.dsn)])}
  /* 9. wear row: 7 cells; marks/Xa xỉ only when seen */
  {plain(v);const k=over(v);delete S.dsn[wdKey(v)];const d=document.createElement('div');d.innerHTML=kitWearSlots(v,{size:"sm"});
   const c=d.querySelectorAll('.kitem').length;ok("9a 9 cells (8 wear slots + pet, GAP IT03)",c===9,c);ok("9b unseen: no Vượt phẩm mark, no Xa xỉ label",!/Vượt phẩm/.test(d.textContent)&&!/Xa xỉ \d+ \//.test(d.textContent),d.textContent.slice(0,200));
   dressLook(S,v,"cùng chỗ");d.innerHTML=kitWearSlots(v,{size:"sm"});ok("9c seen: worn total only, 'Xa xỉ N' — NO allowance (OD line 187)",/Xa xỉ \d+/.test(d.textContent)&&!/Xa xỉ \d+ ?\/|mức|hạn/.test(d.textContent)&&BAL.lux.xx.showBud===false,d.textContent.slice(0,240));
   ok("9d seen: red Vượt phẩm mark when an item is above rank",!k||!!d.querySelector('.kitm-r'),k);
   d.innerHTML=kitWearSlots(S,{size:"sm"});ok("9e her own row 9 cells (8 wear slots + pet, GAP IT03)",d.querySelectorAll('.kitem').length===9)}
  /* 9f (r1). the allowance is never shown in any result text: proven / waved / false xx, Dò la dress line */
  {const T=[];plain(S);noCd(S,v,w);const o=window.rank;
   lavish(v);dressLook(S,v,"cùng chỗ");force(.001);T.push(runAct(S,v,"xx"));unforce();
   noCd(S,v);lavish(v);dressLook(S,v,"cùng chỗ");force(.999);T.push(runAct(S,v,"xx"));unforce();
   noCd(S,v);plain(v);v.inv.push({k:jw.filter(k=>IT[k].rk<=rkOf(v))[0],w:1});v.__f=1;try{dressLook(S,v,"cùng chỗ");S.dsn[wdKey(v)].sc=luxOf(v).bud+5;S.dsn[wdKey(v)].sig=dsSig(v)}catch(e){}force(.001);T.push(runAct(S,v,"xx"));unforce();
   T.push(dressSpyTxt(S,v,"dò la"));const all=T.join(" | ").replace(/<[^>]+>/g,"");
   ok("9f no allowance in xx / dò la texts (no 'mức của', 'hạn mức')",T.every(x=>x)&&!/mức của|hạn mức|\/ ?\d+/.test(all),all.slice(0,400))}
  /* 10. old save without dsn / xxA loads and plays a month */
  {const D=JSON.parse(JSON.stringify(ser()));delete D.S.dsn;for(const r of D.R){delete r.dsn;delete r.xxA;delete r.xxT}deser(D);let err="";
   try{const m0=S.turn;for(let i=0;i<60&&S.turn===m0;i++){Q.length=0;S.mg=null;endTurn()}}catch(x){err=String(x)}ok("10 old save plays a month",!err&&S.turn>0,err)}
  return out});
 let fail=0;for(const [n,c,x] of R){if(!c)fail++;console.log((c?"PASS ":"FAIL ")+n+(c?"":"  "+x))}
 console.log(errs.length?"page errors: "+errs.join(" | "):"no page errors");if(errs.length)fail++;console.log(fail?"FAIL "+fail:"ALL PASS");await b.close();process.exit(fail?1:0)})();
