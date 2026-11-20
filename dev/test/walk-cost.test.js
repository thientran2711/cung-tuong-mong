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
  for(let s=0;s<48;s++){/* 48 buổi (was 16): the ratio over ~20 far moves ranged 0.08–0.55 on any build (a 0.48 tail failed 2/40 runs); over ~100 moves it holds 0.20–0.33 — same 0.4 bar, more evidence */Q.length=0;S.mg=0;for(let u=0;u<4;u++){used=u;try{j95sync()}catch(e){}}const R=S.roster;if(R&&R.P)for(const id in R.P){if(id==="me")continue;const row=R.P[id];if(!Array.isArray(row))continue;
    for(let j=1;j<row.length;j++){const x=row[j];if(!x||x[0]==null||x[1]==="go"||(x[1]==="follow"&&x[2]==="me"))continue;let q=j-1,g=0;while(q>=0&&row[q]&&row[q][0]===x[0]&&row[q][1]==="go"){g++;q--}
     if(q<0||!row[q]||row[q][0]==null||row[q][0]===x[0])continue;const t=travel(row[q][0],x[0]);if(t<2)continue;o.far++;const kp=walkKeepRow(row[q])||walkKeepRow(x);if(kp)o.kfar++;if(g<t-1){o.bad++;if(kp)o.kbad++}}}
   try{nextBuoi()}catch(e){}}o.errs=JWALK.errs;return o},[boot,off])};
 const off=await scan(true),on=await scan(false);
 /* the 0.4 bar is on the moves jwalk may rewrite (both rows free). A move from/to a KEPT row (deed ag_*, tryst, meet, called… j95sKeep) is
    never rewritten by jwalk by design (header: kept rows are never rewritten); those deed→deed jumps are the jagday-walk job (review/jagday-walk,
    stacked on this branch, deed jumps 18→0), which brings the all-rows bar back. Measured (WALK-COST #4, 10 runs × 48 buổi each): all rows
    0.15–0.39 on this branch and 0.19–0.37 on walk-cost-rv ffd22ea6 (same tail, kept rows = ~75 % of the bare jumps); free rows 0.09–0.30. */
 const fr=o=>({far:o.far-o.kfar,bad:o.bad-o.kbad});const onF=fr(on),offF=fr(off);
 ok(on.far>0&&on.bad/on.far<off.bad/Math.max(1,off.far),'5 NPC far moves without «on the way» khắc (all rows): on '+on.bad+'/'+on.far+' < off '+off.bad+'/'+off.far+' (kept-row jumps on '+on.kbad+'/'+on.kfar+' = jagday-walk job)');
 ok(onF.far>0&&onF.bad/onF.far<offF.bad/Math.max(1,offF.far)&&onF.bad/onF.far<=0.4,'5 NPC far moves jwalk may rewrite (free rows) without «on the way» khắc: on '+onF.bad+'/'+onF.far+' vs off '+offF.bad+'/'+offF.far+' (bar 0.4)');
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
 ok(!errs.length,'6 no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:'ALL OK');process.exit(n?1:0)})();
