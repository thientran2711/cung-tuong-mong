/* review/charge-trinh-punish (STEP 4 after charge-followups): real game functions, both directions (law 1).
   (O2) a won «Trình Hoàng hậu» punishes by the PROVEN charge (chPunish), on every road: NPC→NPC / her→NPC / NPC→her with an NPC queen,
        and her card as the Hoàng hậu («Xét tội theo chứng cứ»); the family road jtsb «đem chứng cứ trình Hoàng hậu» (Ức hiếp) needs the pieces
        of the ức hiếp charge (not the total) and punishes by it (cấm túc + bồi bạc), for her and an NPC.
   (O1, OD 26/11 ~07:50Z) SHE is the bought servant (servant life, S.srv.spyFor = the guilty one): a proven «Mua chuộc» dismisses her like any
        bought servant — the end card «Bị đuổi khỏi cung» with the rows Ai tố / Vì sao / Chứng cứ / Hình phạt / Người hầu bị mua; a servant not
        bought by the guilty one stays; co-op: the friend's seat as a bought servant is marked, toCanon carries it to her seat (P.S.coopSrvOut),
        her client's week (onWeek) ends that life the same way.
   usage: node dev/test/charge-trinh-punish.js <index.html path or url> → exit 1 on a fail / page error */
const {chromium}=require('playwright');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv[2]||require('path').join(__dirname,'..','..','index.html');const URL=/^(file|https?):/.test(A)?A:'file://'+require('path').resolve(A);
async function page(b,errs){const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});
 for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}return p}
(async()=>{const b=await chromium.launch();const errs=[];const out=[];
 /* ---- consort life: O2 ---- */
 let p=await page(b,errs);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1000);
 out.push(...await p.evaluate(()=>{const o=[];const ok=(c,m)=>o.push([!!c,m]);const B=BAL.charge;
  const L=liveRivals(true).filter(x=>!x.queen&&!x.coop);const [v,w,u]=L;const clean=x=>{x.wrongs=[];x.dw=0;x.evc={};x.evq={};x.ev=0;x.out=x===S?0:false;x.confined=0;x.punWk=null;x.tsbBul={}};
  let cp=[],gp=[];const c0=chPunish;chPunish=function(t,c,why){cp.push([t===S?"S":t.name,c]);return c0.apply(this,arguments)};
  let inC=0;const c1=chPunish;chPunish=function(){inC++;try{return c1.apply(this,arguments)}finally{inC--}};
  const p0=punish;punish=function(t,why){if(inC)return p0.apply(this,arguments);const n0=cp.length;const r=p0.apply(this,arguments);if(!cp.slice(n0).some(x=>x[0]===(t===S?"S":t.name)))gp.push([t===S?"S":t.name,why]);return r}/* a generic punish = one that did not end in chPunish for that person */;
  const NM2=x=>x===S?"S":x.name;
  const prove=(a,t)=>{clean(t);const x=t===v?w:v;deedAdd(t,"trip",x,1,"ngáng chân "+x.name);deedAdd(t,"batnat",x,1,"bắt nạt "+x.name);a.evc={};evA(a,t,chNeed(t,"uh"),"uh")};
  const win=f=>{const r0=Math.random;Math.random=()=>0;try{return f()}finally{Math.random=r0}};
  const q0=queenP();ok(q0&&q0!==S,`an NPC Hoàng hậu: ${q0&&q0.name}`);
  for(const [a,t] of [[v,w],[S,w],[v,S]]){[v,w,S].forEach(clean);S.confined=0;prove(a,t);const c=chReady(a,t);cp=[];gp=[];win(()=>ACT.trinhhh.f(a,t));
   ok(c==="uh"&&cp.some(x=>x[0]===NM2(t)&&x[1]==="uh")&&!gp.some(x=>x[0]===NM2(t)),`Trình Hoàng hậu ${NM2(a)}→${NM2(t)} (NPC queen): chPunish ${JSON.stringify(cp)} · generic ${JSON.stringify(gp)}`)}
  /* her as the Hoàng hậu: the card, «Xét tội theo chứng cứ» */
  if(q0){q0.queen=false;q0.rank=6}S.queen=true;const sr=S.rank;S.rank=8;[v,w].forEach(clean);prove(v,w);cp=[];gp=[];const r=win(()=>ACT.trinhhh.f(v,w));const d=PEND.rcvJudge({k:"trinhhh",a:key(v),t:key(w)});
  ok(cp.length===0&&d&&d.o[0].n==="Xét tội theo chứng cứ",`her as the Hoàng hậu: the card first, no punishment before her answer (${d&&d.o.map(x=>x.n).join(" | ")})`);
  if(d){const c1=w.confined||0;d.o[0].go();ok(cp.some(x=>x[0]===w.name&&x[1]==="uh")&&!gp.some(x=>x[0]===w.name)&&(w.confined||0)>c1,`her card «Xét tội theo chứng cứ»: chPunish ${JSON.stringify(cp)}, cấm túc ${w.confined}`)}
  S.queen=false;S.rank=sr;if(q0){q0.queen=true;q0.rank=7}
  /* family: jtsb «đem chứng cứ trình Hoàng hậu» — the bully a, the bullied t (tsbBulNpc) */
  const tsb=(a,t,kind)=>{clean(a);clean(t);t.evc={};a.bac=Math.max(a.bac||0,100);if(a===S)S.bac=Math.max(S.bac,100);
   if(kind==="uh"){deedAdd(a,"batnat",t,1,"ép nộp của "+NM2(t));deedAdd(a,"trip",t,1,"ngáng chân");evA(t,a,chNeed(a,"uh"),"uh")}else{deedAdd(a,"vp",null,1,"vượt phẩm");evA(t,a,1,"vp")}
   t.tsbBul={[key(a)]:{n:1,calm:0,stop:0}};aff(t,queenP())<0&&affAdd(t,queenP(),20);oanAdd(t,a,90);
   const nw=npcWhy;npcWhy=(k,c)=>k==="bulTell"?{}:nw(k,c);cp=[];gp=[];const t0=t===S?S.bac:t.bac;let r;try{r=tsbBulNpc(a,t,"batnat")}finally{npcWhy=nw}return {r:String(r||""),pay:(t===S?S.bac:t.bac)-t0}};
  let x=tsb(v,w,"uh");ok(/trình Hoàng hậu/.test(x.r)&&cp.some(y=>y[0]===v.name&&y[1]==="uh")&&!gp.some(y=>y[0]===v.name)&&x.pay>0,`jtsb NPC bully, ức hiếp pieces: chPunish ${JSON.stringify(cp)}, the bullied one gets ${x.pay} lượng`);
  Q.length=0;x=tsb(S,w,"uh");ok(/trình Hoàng hậu/.test(x.r)&&cp.some(y=>y[0]==="S"&&y[1]==="uh")&&!gp.some(y=>y[0]==="S"),`jtsb SHE is the bully: chPunish ${JSON.stringify(cp)} (her notice by charge)`);
  const nt=Q.map(m=>String(m.h||"")+JSON.stringify(m.sections||m.kit||"")).join(" ").replace(/<[^>]+>/g," ");window.__nt=nt.slice(0,600);ok(/Chứng cứ/.test(nt)&&/ức hiếp/.test(nt)&&/Bồi thường/.test(nt),'her notice: Chứng cứ (tội ức hiếp…) + Bồi thường rows · '+nt.slice(0,400)+' · Q '+Q.length+' confined '+S.confined);
  x=tsb(v,w,"vp");ok(!/trình Hoàng hậu/.test(x.r)&&!cp.length,`jtsb with a piece of ANOTHER charge only: no telling (${x.r.slice(0,60)})`);
  S.confined=0;return o}));
 /* co-op seat (host side, seat a): the friend serves as a bought servant in an NPC's staff → marked → toCanon carries it */
 out.push(...await p.evaluate(()=>{const o=[];const ok=(c,m)=>o.push([!!c,m]);const CW=COOPW;const L=liveRivals(true).filter(x=>!x.queen&&!x.coop);const [v,w]=L;
  v.wrongs=[];v.evc={};w.staff=w.staff||[];const fsv={sid:902,coop:true,name:"Bạn Hiền",role:"maid",spyFor:v.id,loyal:60,af:{}};w.staff.push(fsv);
  deedAdd(v,"sbribe",null,1,"mua chuộc người hầu của "+w.name);S.evc={};evA(S,v,chNeed(v,"mc"),"mc");const n=chHave(S,v,"mc");const px=CHX;CHX={a:S,t:v,c:"mc",n};try{chPunish(v,"mc","bị tố giác",S)}finally{CHX=px}
  ok(fsv.coopMcOut&&/Bạn Hiền/.test(fsv.coopMcOut.x)&&w.staff.includes(fsv),`co-op: the friend's seat as bought servant is marked (${fsv.coopMcOut&&fsv.coopMcOut.x}), her entry stays until the merge`);
  const sv={seat:CW.seat,base:CW.base,on:CW.on};CW.seat="a";CW.base={P:{b:{pid:902,name:"Bạn Hiền",rank:0,srv:true,S:{name:"Bạn Hiền",srv:{mid:w.id,spyFor:v.id,rk:1}}}},W:{S:{},R:[]}};let C=null;try{C=CW.toCanon()}catch(e){o.push([false,"toCanon threw "+e.message])}finally{CW.seat=sv.seat;CW.base=sv.base}
  const cs=C&&C.P&&C.P.b&&C.P.b.S&&C.P.b.S.coopSrvOut;ok(cs&&cs.g===v.name&&/Bạn Hiền/.test(cs.x),`toCanon: P.b.S.coopSrvOut = ${JSON.stringify(cs).slice(0,160)}`);
  w.staff.splice(w.staff.indexOf(fsv),1);window.__CSO=cs;return o}));
 await p.close();
 /* ---- servant life: O1 ---- */
 p=await page(b,errs);
 const srv=await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<80&&!isSrv();i++)start();window.__nlInner=0;quiet=false;return isSrv()});await sleep(800);
 if(!srv)out.push([false,'no servant life after 80 starts']);else out.push(...await p.evaluate(()=>{const o=[];const ok=(c,m)=>o.push([!!c,m]);
  const mis=srvM();const L=liveRivals(true).filter(x=>x!==mis&&!x.coop&&!x.queen);const [g,h,acc]=L;[g,h].forEach(x=>{x.wrongs=[];x.evc={}});
  /* not bought by the guilty one: she stays */
  S.srv.spyFor=h.id;deedAdd(g,"sbribe",null,1,"mua chuộc người hầu của "+mis.name);acc.evc={};evA(acc,g,chNeed(g,"mc"),"mc");let px=CHX;CHX={a:acc,t:g,c:"mc",n:chHave(acc,g,"mc")};try{chPunish(g,"mc","bị tố giác",acc)}finally{CHX=px}
  ok(!S.dead&&isSrv()&&S.srv.spyFor===h.id,`bought by another (${h.name}): ${g.name}'s proven Mua chuộc leaves her in service`);
  /* bought by the guilty one: dismissed */
  S.srv.spyFor=g.id;g.wrongs=[];deedAdd(g,"sbribe",null,1,"mua chuộc người hầu của "+mis.name);acc.evc={};evA(acc,g,chNeed(g,"mc"),"mc");px=CHX;CHX={a:acc,t:g,c:"mc",n:chHave(acc,g,"mc")};try{chPunish(g,"mc","bị tố giác",acc)}finally{CHX=px}
  const e=Q[0]||{};const tx=String(e.h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
  ok(S.dead&&/Bị đuổi khỏi cung vì nhận bạc mua chuộc/.test(S.fate||"")&&e.kend,`bought by ${g.name}, her charge proven: the life ends «${S.fate}» (card «${e.t}»)`);
  for(const r of ["Ai tố","Vì sao","Chứng cứ","Hình phạt","Người hầu bị mua"])ok(new RegExp(r).test(tx),`end card row «${r}»`);
  ok(new RegExp(acc.name).test(tx)&&new RegExp(g.name).test(tx)&&/mua chuộc người hầu/.test(tx),`end card names the accuser ${acc.name}, the guilty ${g.name} and the charge`);
  window.__tx=tx.slice(0,900);return o}));
 const tx=await p.evaluate(()=>window.__tx||"");console.log("   end card: "+tx);console.log("   notice: "+await p.evaluate(()=>window.__nt||""));
 /* co-op: her client receives the room week with P.<seat>.S.coopSrvOut → onWeek ends the life the same way */
 await p.evaluate(()=>{window.__nlInner=1;start();for(let i=0;i<80&&!isSrv();i++)start();window.__nlInner=0});await sleep(800);
 out.push(...await p.evaluate(()=>{const o=[];const ok=(c,m)=>o.push([!!c,m]);if(!isSrv())return [[false,'co-op: no servant life']];const CW=COOPW;
  const sv={on:CW.on,seat:CW.seat,base:CW.base,wkIn:CW.wkIn};let C;try{CW.seat="b";CW.base=null;C=CW.toCanon()}catch(e){return [[false,'toCanon '+e.message]]}
  const g=liveRivals(true).find(x=>x!==srvM()&&!x.coop);C.P.b=C.P.b||C.P[Object.keys(C.P)[0]];C.P.b.S.coopSrvOut={g:g.name,a:"Phi X (Phi)",ev:"tội mua chuộc người hầu, 2 món chứng",x:"ngươi (người hầu cung Y) nhận bạc mua chuộc, bị đuổi khỏi cung"};
  try{CW.on=true;CW.wkIn=-9;CW.onWeek({week:(C.week||0)+1,state:C})}catch(e){o.push([false,'onWeek threw '+e.message])}finally{Object.assign(CW,sv)}
  ok(S.dead&&/nhận bạc mua chuộc/.test(S.fate||"")&&/Người hầu bị mua/.test(String((Q[0]||{}).h||"")),`co-op week in: her seat's life ends «${S.fate}» with the row «Người hầu bị mua»`);return o}));
 let bad=0;for(const [c,m] of out){if(!c)bad++;console.log((c?'PASS ':'FAIL ')+m)}
 console.log(`page errors: ${errs.length} ${JSON.stringify(errs.slice(0,3))}`);if(errs.length)bad++;
 console.log(bad?`charge-trinh-punish: ${bad} FAIL`:'charge-trinh-punish: ALL PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
