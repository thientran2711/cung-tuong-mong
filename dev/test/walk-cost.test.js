/* WALK COST «về nhà» (review/walk-cost, ORDER MAIN ROOT-76 20/11; owner OD 19/11 ~22:00Z «tôi bấm về nhà là tốn một khắc»; law 1 two-way, law 4 one core)
   node dev/test/walk-cost.test.js [dev/index.html]
   1 the road home costs what the road out cost (j2 goTo / j9 travel, BAL.walk) — 3 places
   2 shown = charged: the Dư đồ home spot / j15 «Về tẩm cung thăm con» print the same khắc goTo charges
   3 too few khắc → the walk home spills into the next buổi (j9 walkSpill) and she is home in the new buổi
   4 a forced move (escorted home: window.__walkFree) charges nothing
   5 NPCs (jwalk): a far move in the record has its «on the way» khắc; fewer bare far jumps than with BAL.walk.npc = 0
   7 the palace-room road home (j77Tap("home"), jpm kpmEnter → her phối điện) with too few khắc spills like every walk — no dead end (r3 FAIL 1)
   8 «Thôi, lui về cung» (jagent) prints the walk home it charges (r3 FAIL 2)
   9 phối điện resident: Dư đồ home spot label = the walk home charged, no «bái kiến»; palace-view hall rows print their cost (r3 FAIL 3)
   10 «đi chậm» (jface penalty) adds BAL.walk.pen to HER walk (shown = charged), never to an NPC's road (j9 travel per walker) (r3 FAIL 4)
   11 DEED WALKS (review/jagday-walk, FOLLOW-UP GAP): a deed is never placed where the walk from / to the kept rows around it does not fit
      (jagday agWalkShort, travel per walker); a deed that lost its road to a later fixed row moves to a later khắc (agWalkGuard); 16 buổi of
      play: NPC far moves between two deed rows, and errand-ledger rows (jptime ptLedger: road there / back inside the window), without their «on the way» khắc = 0 (and vs BAL.walk.npc = 0)
   12 ROUND 4 (review/jagday-walk-rv FAIL 1): rows next to a deed written AFTER the guard of a khắc (a mistress's later move → her maid's
      retinue row, a deed slice / reaction landing frames after j95sync, a carried deed at khắc 0, a meeting re-applied after a deed) —
      (b) a deed AT the khắc now starts from row kh−1; the first pass of a khắc re-checks deeds starting now; seeds 1–10 × 16 buổi, seeded
      Math.random (mulberry32), AGL flushed every khắc, travel per walker, ag_tell = road, «ngoai» / forced «confined» / card-bound «here»
      not a walk: bare far jumps in every class (deed / deed↔other / follow / errand / other) = 0
   6 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const boot=`localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}window.__bot=1;Q.length=0;S.confined=0;`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(boot=>{eval(boot);const o={rows:[]};
  const home=()=>{used=0;S.buoi=0;S.place="home";S.visit={k:"home",people:[],talked:false,tk:{}}};
  const go=(fn,k)=>{Q.length=0;try{S.ent={d:j95sDay(),ids:[],at:k}}catch(x){}window.__accSilent=1;const u0=used;try{fn(k)}finally{Q.length=0;window.__accSilent=0}return used-u0};
  for(const k of ["vuon","tyv","ksp","thu"]){home();const out=go(goTo,k);if(S.place!==k){o.rows.push({k,skip:1});continue}
   const tc=travel(k,"home");let shown=null;try{tab="go";render();const sp=document.querySelector('[data-go="home"]')||[...document.querySelectorAll('[data-go]')].find(e=>/ngươi ở/.test(e.getAttribute("title")||""));shown=sp?((sp.getAttribute("title")||"").match(/đi (\d+) khắc/)||[])[1]:null}/* the walk part (a phối điện home is drawn on the chủ vị's palace spot, jres; «bái kiến» is that palace's own greeting) */catch(e){}
   let j15=null;try{j15=`${travel(S.place,"home")}`}catch(e){}
   const back=go(goTo,"home");o.rows.push({k,out,back,tc,at:S.place,shown,j15})}
  /* 3 spill */
  home();go(goTo,"vuon");used=BAL.time.khac-1;const b0=S.buoi||0;o.need=travel("vuon","home");Q.length=0;walkGo("home");o.spill={w:window.__walkSpill?{rest:window.__walkSpill.rest,b:window.__walkSpill.b}:null,b0};
  return o},boot);
 for(let i=0;i<10;i++){await p.waitForTimeout(400);await p.evaluate(()=>{Q.length=0;S.mg=0;const m=document.getElementById("modal");if(m)m.hidden=true})}/* the buổi-turn news card is closed, as a player would */const s3=await p.evaluate(()=>({at:S.place,b:S.buoi,w:!!window.__walkSpill}));
 r.forced=await p.evaluate(()=>{used=0;S.buoi=0;S.place="home";S.visit={k:"home",people:[],talked:false,tk:{}};Q.length=0;try{S.ent={d:j95sDay(),ids:[],at:"vuon"}}catch(x){}window.__accSilent=1;goTo("vuon");window.__accSilent=0;Q.length=0;
  const u4=used;window.__walkFree=1;try{goTo("home")}finally{window.__walkFree=0}return{cost:used-u4,at:S.place,from:"vuon"}});
 for(const x of r.rows){if(x.skip){console.log('skip',x.k);continue}
  ok(x.at==="home"&&x.back===x.out&&x.back===x.tc&&x.back>0,`1 ${x.k}: out ${x.out} = back ${x.back} = travel ${x.tc}`);
  ok(x.shown!=null&&+x.shown===x.back,`2 ${x.k}: Dư đồ home spot shows ${x.shown} khắc = charged ${x.back}`,x.j15)}
 ok(r.rows.filter(x=>!x.skip).length>=2,'1 at least 2 places measured');
 if(r.need>1)ok(r.spill.w&&r.spill.w.rest===r.need-1&&r.spill.w.b===r.spill.b0+1,'3 walk home with 1 khắc left spills into the next buổi',r.spill);else console.log('skip 3 (near home)');
 if(r.need>1)ok(s3.at==="home"&&!s3.w,'3 she is home in the new buổi',s3);
 ok(r.forced.cost===0&&r.forced.at==="home",'4 forced move home charges nothing',r.forced);
 /* 5 NPCs */
 const scan=async off=>{await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);return p.evaluate(([boot,off])=>{eval(boot);if(off)BAL.walk.npc=0;const o={far:0,bad:0,kfar:0,kbad:0};
  for(let s=0;s<48;s++){/* 48 buổi */Q.length=0;S.mg=0;for(let u=0;u<4;u++){used=u;try{j95sync()}catch(e){}}const R=S.roster;if(R&&R.P)for(const id in R.P){if(id==="me")continue;const row=R.P[id];if(!Array.isArray(row))continue;
    for(let j=1;j<row.length;j++){const x=row[j];if(!x||x[0]==null||x[1]==="go"||x[1]==="ag_tell"||(x[1]==="follow"&&x[2]==="me"))continue;let q=j-1,g=0;while(q>=0&&row[q]&&row[q][0]===x[0]&&(row[q][1]==="go"||row[q][1]==="ag_tell")){g++;q--}
     /* jagday-walk final gate: an «ag_tell» row is the TIN BÁO bearer's road (written only on her road khắc, at her master's place = a «go» row);
        the road is the NPC's own (travel per walker, test 10) — travel(a,b) alone added HER «đi chậm» to every NPC road */
     if(q<0||!row[q]||row[q][0]==null||row[q][0]===x[0])continue;const t=travel(row[q][0],x[0],walkWho(id));if(t<2)continue;o.far++;const kp=walkKeepRow(row[q])||walkKeepRow(x)||/^(errand|follow)$/.test(row[q][1])||/^(errand|follow)$/.test(x[1]);if(kp)o.kfar++;if(g<t-1){o.bad++;if(kp)o.kbad++}}}
   try{nextBuoi()}catch(e){}}o.errs=JWALK.errs;return o},[boot,off])};
 const off=await scan(true),on=await scan(false);
 /* WALK-COST #4 root cause of the 0.42 tail (probe = this scan; ffd22ea6 and this branch alike): EVERY bare far jump left with jwalk on
    touches (1) a KEPT row (ag_* deed, tryst, meet, called… j95sKeep — jwalk never rewrites kept rows, by design), or (2) an errand-ledger row
    (jptime ptLedger / jerr errLedger, written after the pass), or (3) a maid «follow» row whose mistress jumped (follows a deed / a move decided
    in the khắc now). All three are the deed→deed walk job review/jagday-walk (stacked on this branch: deed 18→0, errand 0, follow 0), which
    should put the 0.4 bar back on ALL rows. Moves outside those families (sleep, eat, clean, visit, nightw, shift…) had 0 bare jumps over
    6 runs × 96 buổi → their bar is 0.1 (stricter than the old 0.4). Old all-rows numbers: 0.15–0.39 here, 0.19–0.37 on walk-cost-rv. */
 const fr=o=>({far:o.far-o.kfar,bad:o.bad-o.kbad});const onF=fr(on),offF=fr(off);
 /* review walk-cost r4: a tripwire on ALL rows until jagday-walk puts the 0.4 bar back (seen here 0.19–0.45, off ≈ 0.97) */ok(on.far>0&&on.bad/on.far<off.bad/Math.max(1,off.far)&&on.bad/on.far<=0.6,'5 NPC far moves without «on the way» khắc (all rows, tripwire 0.6): on '+on.bad+'/'+on.far+' < off '+off.bad+'/'+off.far+' (deed/errand/follow jumps on '+on.kbad+'/'+on.kfar+' = jagday-walk job)');
 /* review/jagday-walk (deed / errand / follow families now walk too): the 0.4 bar is back on ALL rows; the 0.6 tripwire above stays */ok(on.far>0&&on.bad/on.far<=0.4,'5 NPC far moves without «on the way» khắc (ALL rows, bar 0.4): on '+on.bad+'/'+on.far+' (deed/errand/follow on '+on.kbad+'/'+on.kfar+')');
 ok(onF.far>0&&onF.bad/onF.far<offF.bad/Math.max(1,offF.far)&&onF.bad/onF.far<=0.1,'5 NPC far moves jwalk owns (no deed/errand/follow row) without «on the way» khắc: on '+onF.bad+'/'+onF.far+' vs off '+offF.bad+'/'+offF.far+' (bar 0.1)');
 ok(!on.errs.length,'5 jwalk pass no errors',on.errs);
 /* 7–10 (walk-cost r3) */
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r3=await p.evaluate(boot=>{eval(boot);const o={};const home=()=>{used=0;S.buoi=0;S.place="home";S.visit={k:"home",people:[],talked:false,tk:{}};Q.length=0};
  const at=k=>{home();try{S.ent={d:j95sDay(),ids:[],at:k}}catch(x){}window.__accSilent=1;try{goTo(k)}finally{window.__accSilent=0;Q.length=0}};
  o.res=!!resMeHoused();o.etq=null;
  /* 7: far place, 1 khắc left, tap her room the palace-view way */
  let far=["vuon","tyv","ksp","thu"].find(k=>travel(k,"home")>1);o.far=far;
  if(far){at(far);used=BAL.time.khac-1;const b0=S.buoi||0,need=travel(far,"home"),st=accState("home").why||"";window.__kpmGo=1;try{j77Tap("home","")}finally{window.__kpmGo=0}const W=window.__walkSpill;o.t7={w:W?{k:W.k,rest:W.rest,b:W.b}:null,b0,need,st};window.__walkSpill=null}
  /* 8 */
  if(far){at(far);const v=liveRivals(true).find(x=>x.alive&&!x.out);let O=[];try{O=agReact({k:"__none"},v,null)}catch(e){o.e8=e.message}const L=O.find(x=>x.r==="leave");o.t8={x:L&&L.x,tc:travel(S.place,"home")};
   if(L){const u0=used;try{L.go()}catch(e){}Q.length=0;o.t8.paid=used-u0;o.t8.at=S.place}}
  /* 9 */
  if(o.res&&far){at(far);const hk=accResHomeK();const hd=resMeHoused().head;S.where=S.where||{};S.where[hd.id]=hk;whereOf=(f=>function(q){return q===hd?hk:f.apply(this,arguments)})(whereOf);o.etq=!!accEtq(S,hk);/* the chủ vị at home: the greeting is owed in her main hall */tab="go";window.__kpm=null;window.__mapList=false;render();const sp=document.querySelector(`#panel .mspot[data-go="${hk}"]`);
   const lab=sp?(sp.querySelector(".mmeta")||{}).textContent||"":"";o.t9={lab,tc:travel(S.place,"home")};
   const r=resMeHoused();const html=kitPalaceMap({slot:r.pal,k:hk});const d=document.createElement("div");d.innerHTML=html;const row=d.querySelector(`[data-kpmpart="${r.part}"]`);o.t9.row=row?row.textContent:"";
   const oth=[...d.querySelectorAll("[data-kpmpart]")].filter(x=>x.dataset.kpmpart!==r.part&&x.dataset.kpmpart!=="cungnhan").map(x=>x.textContent);o.t9.oth=oth;o.t9.othTxt=accWalkTxt(hk);o.t9.chinh=d.querySelector('[data-kpmpart="chinh"]').textContent;
   const u0=used;window.__kpmGo=1;try{j77Tap("home","")}finally{window.__kpmGo=0}Q.length=0;o.t9.paid=used-u0;o.t9.at=S.place}
  /* 10 */
  if(far){home();const base=travel("home",far);S.pen={k:"quy",until:wk()+2,why:"test"};const pen=travel("home",far);const v=liveRivals(true).find(x=>x.alive&&!x.out&&!(x.pen&&x.pen.until>wk()));
   const npc=travel("home",far,v),bare=travel("home",far,null);let lab=null;try{tab="go";window.__kpm=null;render();const sp=document.querySelector(`#panel [data-go="${far}"]`);lab=sp?((sp.getAttribute("title")||"").match(/đi (\d+) khắc/)||[])[1]:null}catch(e){}
   const u0=used;at.call(null,far);/* at() resets used */const paid=used;v.pen={k:"quy",until:wk()+2};const npcPen=travel("home",far,v);delete v.pen;S.pen=null;
   o.t10={base,pen,npc,bare,npcPen,paid,lab,B:BAL.walk.pen}}
  return o},boot);
 if(r3.t7)ok(r3.t7.w&&r3.t7.w.k==="home"&&r3.t7.w.rest===r3.t7.need-1&&r3.t7.w.b===r3.t7.b0+1,'7 palace-room road home with 1 khắc left spills (no dead end)',r3.t7);else ok(false,'7 no far place',r3);
 ok(r3.t8&&/tốn: (\d+) khắc đi đường/.test(r3.t8.x||"")&&+(r3.t8.x.match(/tốn: (\d+) khắc/)||[])[1]===r3.t8.tc&&r3.t8.paid===r3.t8.tc&&r3.t8.at==="home",'8 «Thôi, lui về cung» prints tốn = walk home charged',r3.t8||r3.e8);
 if(r3.res){const n=+((r3.t9.lab.match(/(\d+) khắc/)||[])[1]);ok(r3.etq&&n===r3.t9.tc&&!/bái kiến/.test(r3.t9.lab)&&r3.t9.paid===r3.t9.tc&&r3.t9.at==="home",'9 resident home spot label = walk home charged, no bái kiến',r3.t9);
  ok(new RegExp(`tốn: ${r3.t9.tc} khắc`).test(r3.t9.row)&&r3.t9.oth.length&&r3.t9.oth.every(x=>x.includes("tốn: "+r3.t9.othTxt))&&/tốn: \d+ khắc · bái kiến/.test(r3.t9.chinh),'9 palace-view hall rows print their cost (her room = walk home; other halls = accWalkTxt)',r3.t9)}else console.log('skip 9 (not a phối điện resident in this game)');
 if(r3.t10){const t=r3.t10;ok(t.pen===t.base+t.B&&t.paid===t.pen&&+t.lab===t.pen,'10 đi chậm: her walk +BAL.walk.pen, shown = charged',t);ok(t.npc===t.base&&t.bare===t.base&&t.npcPen===t.base+t.B,'10 her penalty never on an NPC road; an NPC\'s own penalty is',t)}

 /* 11 DEED WALKS */
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r11=await p.evaluate(boot=>{eval(boot);const o={};used=0;try{j95sync()}catch(e){}const R=S.roster;const v=liveRivals(true).find(x=>x.alive&&!x.out&&!x.confined&&R.P["v"+x.id]);if(!v)return{none:1};const id="v"+v.id;
  const K=["home","vuon","tyv","ksp","thu","kn","tn","nvp"];let A=null,B=null;for(const a of K)for(const b of K)if(!A&&a!==b&&travel(a,b,v)===BAL.walk.far){A=a;B=b}if(!A)return{nofar:1};o.A=A;o.B=B;o.far=BAL.walk.far;
  const keep=R.P[id].map(x=>x.slice()),pend=agZ().pend.slice();agZ().pend=agZ().pend.filter(x=>x.id!==id);
  /* round 4: a deed row is held by its pend deed (a label alone is the plan) — the fixture books its deeds like agPlan */const dp=(k,kh)=>{const x={key:R.key,id,vid:v.id,k,kd:"",t:null,kh,k1:kh,kc:1,pl:A,act:"",why:"t"};agZ().pend.push(x);return x};dp("testA",0);
  try{R.P[id]=[[A,"ag_testA",null,"t"],[A,"rest",null,""],[A,"rest",null,""],[A,"rest",null,""]];
   o.s1=agWalkShort(R,id,1,1,B,v,0);o.s2=agWalkShort(R,id,2,1,B,v,0);o.s3=agWalkShort(R,id,3,1,B,v,0);o.near=agWalkShort(R,id,1,1,A,v,0);
   const pC=dp("testC",3);R.P[id][3]=[A,"ag_testC",null,"t"];o.after=agWalkShort(R,id,1,1,B,v,0);o.after2=agWalkShort(R,id,2,1,B,v,0);agZ().pend.splice(agZ().pend.indexOf(pC),1);
   /* a slot the deed planner offers: never one without the road */
   R.P[id]=[[A,"ag_testA",null,"t"],[A,"rest",null,""],[A,"rest",null,""],[A,"rest",null,""]];const sl=[];for(let kh=0;kh<4;kh++)if(agWalkOk(R,id,kh,1,B,v,0))sl.push(kh);o.slots=sl;
   /* errand ledger (r1): an NPC sends a servant far (n = 3 khắc, the walk included) → road there | errand | road back; due + away unchanged */
   {const sid=Object.keys(R.P).find(k=>/^s\d+$|^mm:\d/.test(k));if(sid){const ke=R.P[sid].map(x=>x.slice()),b0=bid()*ptKH();R.P[sid][0]=[A,"serve",null,"t"];
     const a={id:"t11e",who:sid,by:"v"+v.id,byNm:"t",lbl:"đi việc",t0:b0+1,due:b0+4,place:B,tgt:null};ptZ().push(a);
     try{ptLedger();o.err={rows:R.P[sid].map(x=>x[0]+"/"+x[1]).join(" | "),due:a.due,t0:a.t0,b0,away:ptAwayOf(sid)===a,keep:R.P[sid].slice(1).every(x=>j95sBusy(x))}}finally{ptZ().splice(ptZ().indexOf(a),1);R.P[sid]=ke}}else o.err={none:1}}
   /* guard: a deed placed at khắc 1, then a fixed row lands right before it → it moves on to where the road fits */
   R.P[id]=[[A,"rest",null,""],[A,"rest",null,""],[B,"ag_testG",null,"t"],[A,"rest",null,""]];const pp={key:R.key,id,vid:v.id,k:"testG",kd:"",t:null,kh:2,k1:2,kc:1,pl:B,act:"",why:"t"};agZ().pend.push(pp);
   o.g0=agWalkShort(R,id,2,1,B,v,0);R.P[id][0]=[A,"ag_testA",null,"t"];o.g1=agWalkShort(R,id,2,1,B,v,0);const n=agWalkGuard(R,0);o.guard={n,kh:pp.kh,drop:!!pp.drop,row:R.P[id].map(x=>x[0]+"/"+x[1]).join(" | ")};
  }finally{R.P[id]=keep;agZ().pend=pend}
  return o},boot);
 if(r11.none||r11.nofar)ok(false,'11 setup',r11);else{
  ok(r11.s1===r11.far&&r11.s2===r11.far-1&&r11.s3===0&&r11.near===0,'11 after a kept deed the next far deed needs the whole walk between (short '+[r11.s1,r11.s2,r11.s3]+')',r11);
  ok(r11.after>0&&r11.after2>0,'11 and the walk on to the next kept row must fit too',r11);
  ok(JSON.stringify(r11.slots)===JSON.stringify([r11.far+1]),'11 the planner offers only khắc with the road ('+r11.slots+')',r11.slots);
  ok(r11.g0===0&&r11.g1>0&&r11.guard.kh===r11.far+1&&!r11.guard.drop,'11 guard: a deed that lost its road moves on (kh '+r11.guard.kh+')',r11.guard)}
 ok(r11.err&&r11.err.rows===`${r11.A}/serve | ${r11.B}/go | ${r11.B}/errand | ${r11.A}/go`&&r11.err.due===r11.err.b0+4&&r11.err.away&&r11.err.keep,'11 errand ledger: NPC sender, far place → road there | errand | road back, due + away unchanged, busy',r11.err);
 const scan11=async off=>{await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);return p.evaluate(([boot,off])=>{eval(boot);if(off)BAL.walk.npc=0;const o={far:0,bad:0,deed:0,L:[]};
  for(let s=0;s<16;s++){Q.length=0;S.mg=0;for(let u=0;u<4;u++){used=u;try{j95sync()}catch(e){}}const R=S.roster;if(R&&R.P)for(const id in R.P){if(id==="me")continue;const row=R.P[id];if(!Array.isArray(row))continue;
    for(let j=1;j<row.length;j++){const x=row[j];if(!x||x[0]==null||x[1]==="go"||x[1]==="ag_tell"||(x[1]==="follow"&&x[2]==="me"))continue;let q=j-1,g=0;while(q>=0&&row[q]&&row[q][0]===x[0]&&(row[q][1]==="go"||row[q][1]==="ag_tell")){g++;q--}
     if(q<0||!row[q]||row[q][0]==null||row[q][0]===x[0]||row[q][1]==="ag_tell")continue;const t=travel(row[q][0],x[0],walkWho(id));/* the NPC's own road (not her «đi chậm») */if(t<2)continue;o.far++;if(g<t-1){o.bad++;if(/^ag_/.test(x[1])&&/^ag_/.test(row[q][1])){o.deed++;o.L.push(id+" "+row.map(e=>e[0]+"/"+e[1]).join("|"))}else if(x[1]==="errand"||row[q][1]==="errand"){o.errand=(o.errand||0)+1;o.L.push(id+" "+row.map(e=>e[0]+"/"+e[1]).join("|"))}}}}
   try{nextBuoi()}catch(e){}}o.errs=JWALK.errs.concat(AGD.errs.filter(e=>/walk/.test(e)));return o},[boot,off])};
 const on11=await scan11(false),off11=await scan11(true);
 ok(on11.deed===0,'11 16 buổi: NPC far moves deed → deed without «on the way» khắc: on '+on11.deed+' (all far jumps '+on11.bad+'/'+on11.far+') vs off '+off11.deed+' ('+off11.bad+'/'+off11.far+')',on11.L.slice(0,3));
 ok(!on11.errand,'11 16 buổi: errand far moves without their road: on '+(on11.errand||0)+' vs off '+(off11.errand||0),on11.L.slice(0,3));
 ok(!on11.errs.length,'11 no walk errors',on11.errs);

 /* 12 ROUND 4: unit — (b) a deed AT the khắc now walks from row kh−1; the fresh-khắc guard moves a deed starting now that lost its road */
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r12=await p.evaluate(boot=>{eval(boot);const o={};used=0;try{j95sync()}catch(e){}const R=S.roster;const v=liveRivals(true).find(x=>x.alive&&!x.out&&!x.confined&&R.P["v"+x.id]);if(!v)return{none:1};const id="v"+v.id;
  const K=["home","vuon","tyv","ksp","thu","kn","tn","nvp"];let A=null,B=null;for(const a of K)for(const b of K)if(!A&&a!==b&&travel(a,b,v)===BAL.walk.far){A=a;B=b}if(!A)return{nofar:1};
  const keep=R.P[id].map(x=>x.slice()),pend=agZ().pend.slice(),rk=R.kh;agZ().pend=agZ().pend.filter(x=>x.id!==id);
  try{R.P[id]=[[A,"rest",null,""],[A,"rest",null,""],[B,"rest",null,""],[B,"rest",null,""]];
   o.b=agWalkShort(R,id,1,1,B,v,1);/* at the khắc now (1): from row 0 (A), not from its own row */o.bNear=agWalkShort(R,id,1,1,A,v,1);
   R.P[id]=[[A,"rest",null,""],[B,"ag_testF",null,"t"],[B,"rest",null,""],[B,"rest",null,""]];const pp={key:R.key,id,vid:v.id,k:"testF",kd:"",t:null,kh:1,k1:1,kc:1,pl:B,act:"",why:"t"};agZ().pend.push(pp);
   o.stay=agWalkGuard(R,1,false);o.kh0=pp.kh;/* not fresh: a deed of the khắc now is never moved */
   const n=agWalkGuard(R,1,true);o.f={n,kh:pp.kh,drop:!!pp.drop,row:R.P[id].map(x=>x[0]+"/"+x[1]).join(" | ")};
   /* a plan label no pend deed holds is free (world-forced «ag_routine», a repainted label) */R.P[id][3]=[B,"ag_routine",null,""];o.free=!agWalkHeld(R,id,3);
  }finally{R.P[id]=keep;agZ().pend=pend;R.kh=rk}
  return o},boot);
 if(r12.none||r12.nofar)ok(false,'12 setup',r12);else{
  ok(r12.b>0&&r12.bNear===0,'12 (b) a deed at the khắc now walks from row kh−1 (short '+r12.b+', same place '+r12.bNear+')',r12);
  ok(r12.stay===0&&r12.kh0===1&&r12.f.n===1&&(r12.f.drop||r12.f.kh>=2),'12 first pass of a khắc: a deed starting now with no road from row kh−1 moves on / drops',r12.f);
  ok(r12.free,'12 an «ag_» plan label no deed holds is free (jwalk may walk it)',r12)}
 const scan12=async(s0,s1,NB)=>{const T={far:0,deed:0,mix:0,follow:0,errand:0,other:0,forced:0,land:0},L=[],E=[];
  for(let seed=s0;seed<=s1;seed++){const ctx=await b.newContext({viewport:{width:755,height:1000}});
   await ctx.addInitScript(sd=>{let a=sd>>>0;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},seed*7919);
   const q=await ctx.newPage();q.on('pageerror',e=>E.push(e.message));await q.goto(URL,{waitUntil:'domcontentloaded'});await q.waitForTimeout(2500);
   const o=await q.evaluate(([boot,NB,seed])=>{eval(boot);const o={far:0,deed:0,mix:0,follow:0,errand:0,other:0,forced:0,L:[]};const fl=()=>{for(let i=0;i<30&&AGL.L.length;i++){try{agFlush()}catch(e){}agLaterRun()}};const l0=AG.stat.land||0;
    for(let s=0;s<NB;s++){Q.length=0;S.mg=0;for(let u=0;u<4;u++){used=u;try{j95sync()}catch(e){}fl()}const R=S.roster;if(R&&R.P)for(const id in R.P){if(id==="me")continue;const row=R.P[id];if(!Array.isArray(row))continue;
      for(let j=1;j<row.length;j++){const x=row[j];if(!x||x[0]==null||x[1]==="go"||x[1]==="ag_tell"||(x[1]==="follow"&&x[2]==="me"))continue;let k=j-1,g=0;while(k>=0&&row[k]&&row[k][0]===x[0]&&(row[k][1]==="go"||row[k][1]==="ag_tell")){g++;k--}
       if(k<0||!row[k]||row[k][0]==null||row[k][0]===x[0]||row[k][1]==="ag_tell"||/ngoai|__out/.test(row[k][0]+x[0]))continue;const t=travel(row[k][0],x[0],walkWho(id));if(t<2)continue;o.far++;if(g>=t-1)continue;
       if(x[1]==="confined"||row[k][1]==="confined"||(x[1]==="here"&&agBound(id,j,R.key))||(row[k][1]==="here"&&agBound(id,k,R.key))){o.forced++;continue}/* a forced move / a card said she was there (by design) */
       const A=/^ag_/.test(x[1]),B=/^ag_/.test(row[k][1]);const c=A&&B?"deed":(A||B)?"mix":/follow/.test(x[1]+row[k][1])?"follow":/errand/.test(x[1]+row[k][1])?"errand":"other";o[c]++;o.L.push(`s${seed} b${s} ${c} ${id}: `+row.map(e=>e[0]+"/"+e[1]).join(" | "))}}
     try{nextBuoi()}catch(e){}fl()}
    o.land=(AG.stat.land||0)-l0;o.errs=(JWALK.errs||[]).concat((AGD.errs||[]).filter(e=>/walk/.test(e)));return o},[boot,NB,seed]);
   for(const k in T)T[k]+=o[k]||0;L.push(...o.L);E.push(...o.errs);await ctx.close()}
  return{T,L,E}};
 const s12=await scan12(1,10,16);const bad12=s12.T.deed+s12.T.mix+s12.T.follow+s12.T.errand+s12.T.other;
 ok(bad12===0,`12 seeds 1–10 × 16 buổi, AGL flushed every khắc: bare far jumps ${bad12} (deed ${s12.T.deed} / deed↔other ${s12.T.mix} / follow ${s12.T.follow} / errand ${s12.T.errand} / other ${s12.T.other}) of ${s12.T.far} far moves; forced ${s12.T.forced}; deeds landed ${s12.T.land}`,s12.L.slice(0,4));
 ok(!s12.E.length,'12 no walk / page errors',s12.E.slice(0,3));
 ok(!errs.length,'6 no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:'ALL OK');process.exit(n?1:0)})();
