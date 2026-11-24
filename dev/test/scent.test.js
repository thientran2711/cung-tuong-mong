/* scent.test (review/scent; PARKING #10 HƯƠNG RIÊNG; module dev/build/jscent.js, numbers BAL.scent). Seeded bot lives.
   T1 objects (law 6c / 4 / 2): four boxes hg_<k>, kd Hương liệu, one equal price BAL.scent.pr, sold by the eunuch (SHOP_ALL), TAINT.doc lists all.
   T2 her pick (item panel kit pbtn «Xông làm hương riêng»): button shown; tap = S.sc set, one box burnt, the BAL gain applied; tap again = «Thôi xông».
   T3 month: one box a month burns; when none is left the scent fades (scOff) with a line; NPCs burn and restock by buying (bạc).
   T4 NPC inherited scent: seeded (same after re-init), boxes in her chest; scOf none when the box ran out.
   T5 Emperor: LIKES.scent / LIKEN.scent; liked night = Sủng +like.sung (her AND an NPC, parity); disliked (jdis) = Sủng dis.sung (both).
   T6 tell (law 6a): roll forced → NPC observers lose thiện cảm to the visited; her line names the one who wears the scent; her night → NPC Ghen up;
      a rival who wears HER scent can make others blame her (frame); tell odds rise with the visited one's rank (law 5); disliked < plain < liked.
   T7 poison (law 1): she taints her own box (taintItem doc) and gives it — NPC who burns it loses Sức; an NPC taints hers (scTaint) — she loses Sức
      when it burns; «Kiểm tra đồ» (inspect) finds the tainted box and the trail gives evidence; j70 route lohuong exec taints the target's box both ways.
   T8 old save: emp without likes.scent / rivals without sc load; normAll fills; scOf works.
   usage: python3 dev/build/assemble.py && node dev/test/scent.test.js dev/index.html [lives=2]   → PASS / FAIL (exit 0 / 1) */
const {chromium}=require('playwright');const path=require('path');
const [,,F,L0]=process.argv;const LIVES=+L0||2;
(async()=>{const b=await chromium.launch();const fails=[];
for(let seed=1;seed<=LIVES;seed++){const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
 await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},seed);
 await p.goto('file://'+path.resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}window.render=render=function(){};});
 const r=await p.evaluate(()=>{const bad=[],B=BAL.scent,K=Object.keys(B.list);const roll0=roll;
  const box=k=>"hg_"+k,cnt=(x,k)=>(x.inv||[]).filter(e=>e.k===box(k)&&!e.h).length;
  /* T1 */
  for(const k of K){const it=IT[box(k)];if(!it){bad.push("T1 no item "+k);continue}if(it.kd!=="Hương liệu")bad.push("T1 kd "+k);if(it.pr!==B.pr)bad.push("T1 price "+k);if(it.sc!==k)bad.push("T1 sc "+k);
   if(!SHOP_ALL.includes(box(k)))bad.push("T1 not sold "+k);if(!TAINT.doc.on.includes(box(k)))bad.push("T1 taint "+k);if(!/hương/.test(it.n))bad.push("T1 name "+it.n)}
  const G=K.map(k=>Object.values(B.list[k].g).length);if(new Set(G).size!==1)bad.push("T1 unequal gain shapes");
  /* T2 her pick */
  S.inv=S.inv.filter(e=>!/^hg_/.test(e.k));S.inv.push({k:box("lan")},{k:box("lan")});S.sc=undefined;Q.length=0;const ix=S.inv.findIndex(e=>e.k===box("lan"));
  let h="";const km=kitModal;kitModal=o=>{h=o.html||""};try{kinvOpen({g:{k:box("lan"),i:ix,n:2},grade:0})}catch(e){bad.push("T2 kinvOpen "+e.message)}kitModal=km;
  if(!/data-kinvact="scent"/.test(h)||!/Xông làm hương riêng/.test(h))bad.push("T2 no pick button");
  const s0=JSON.stringify(Object.keys(B.list.lan.g).map(k=>S[k]));itemAct("scent",ix);
  if(S.sc!=="lan")bad.push("T2 sc "+S.sc);if(cnt(S,"lan")!==1)bad.push("T2 box not burnt "+cnt(S,"lan"));
  const st=Object.keys(B.list.lan.g)[0];if(JSON.stringify([S[st]])===s0&&S[st]<100)bad.push("T2 no gain "+st);
  if(!/hương riêng/.test(S.logs[0]||""))bad.push("T2 no log");
  h="";kitModal=o=>{h=o.html||""};kinvOpen({g:{k:box("lan"),i:S.inv.findIndex(e=>e.k===box("lan")),n:1},grade:0});kitModal=km;if(!/Thôi xông/.test(h))bad.push("T2 no stop button");
  /* T3 month */
  scMonth();if(cnt(S,"lan")!==0||S.scOff)bad.push("T3 month burn "+cnt(S,"lan")+" off "+S.scOff);
  scMonth();if(!S.scOff)bad.push("T3 no fade");if(!/phai dần/.test(S.logs[0]||""))bad.push("T3 no fade line");if(scOf(S))bad.push("T3 scOf after fade");
  const v=liveRivals(false)[0],w=liveRivals(false)[1],u=liveRivals(false)[2];
  /* T4 NPC inherited */
  const sv=v.sc;delete v.sc;const n0=v.inv.length;scInit(v);if(v.sc!==sv)bad.push("T4 not seeded "+sv+"→"+v.sc);v.inv.length=n0;
  if(!scOf(v))bad.push("T4 npc no scent");const nb=cnt(v,v.sc);v.bac=0;for(let i=0;i<nb+1;i++)scMonth();if(scOf(v))bad.push("T4 npc scent after boxes gone");
  v.bac=500;scMonth();if(!scOf(v))bad.push("T4 npc did not restock");if(v.bac>=500)bad.push("T4 restock cost no bạc");
  /* T5 Emperor */
  if(!Object.keys(LIKES).includes("scent")||LIKEN.scent!=="Hương")bad.push("T5 LIKES");const E=scEmp();
  S.inv.push({k:box("que")},{k:box("que")});itemAct("scent",S.inv.findIndex(e=>e.k===box("que")));
  E.likes.scent=scName("que");v.sc="que";v.scOff=0;v.inv.push({k:box("que")});S.emp.dis=[];
  roll=()=>false;let a=S.sung=50;scNight(S);if(!(S.sung>a))bad.push(`T5 her liked ${a}→${S.sung}`);if(!S.emp.known.scent)bad.push("T5 not learnt");
  a=v.sung;scNight(v);if(v.sung-a!==B.like.sung&&v.sung<100)bad.push(`T5 npc liked ${a}→${v.sung}`);
  E.likes.scent=scName("mai");S.emp.dis=["scent:"+scName("que")];a=S.sung=50;scNight(S);if(!(S.sung<a))bad.push(`T5 her dis ${a}→${S.sung}`);
  a=v.sung=50;scNight(v);if(v.sung-a!==B.dis.sung)bad.push(`T5 npc dis ${a}→${v.sung}`);S.emp.dis=[];E.likes.scent=scName("tram");
  /* T6 tell */
  roll=()=>true;for(const x of liveRivals(true)){x.sc="mai";x.scOff=0;x.inv.push({k:box("mai")})}w.sc="lan";w.inv.push({k:box("lan")});S.sc="que";
  const af=aff(u,w);S.logs.unshift("-");scTell(w,"lan",0);if(!(aff(u,w)<af))bad.push(`T6 npc observer aff ${af}→${aff(u,w)}`);
  if(!new RegExp("vương hương lan; xem ra đêm qua ngài ở chỗ ("+w.name+"|một vị)").test(JSON.stringify(S.logs.slice(0,8))))bad.push("T6 her line does not name "+w.name+" :: "+JSON.stringify(S.logs.slice(0,3)).slice(0,300));
  const g0=+u.ghen||0;scTell(S,"que",0);if(!((+u.ghen||0)>g0||u.ghen>=100))bad.push(`T6 her night no ghen ${g0}→${u.ghen}`);
  /* frame: v wears her scent; when v is visited, some observer may blame her */
  v.sc="que";v.inv.push({k:box("que")});let fr=0;for(let i=0;i<20;i++){const o=scTell(v,"que",0);if(o.some(([x,y])=>y===S))fr++}if(!fr)bad.push("T6 copy never frames her");
  roll=roll0;
  const rk0=v.rank;v.rank=1;const o1=scTellOdds(u,v,0);v.rank=5;const o5=scTellOdds(u,v,0);v.rank=rk0;if(!(o5>o1))bad.push(`T6 rank odds ${o1}≥${o5}`);
  if(!(scTellOdds(u,v,B.dis.tell)<scTellOdds(u,v,0)&&scTellOdds(u,v,0)<scTellOdds(u,v,B.like.tell)))bad.push("T6 like/dis tell order");
  /* T7 poison both ways */
  S.inv=S.inv.filter(e=>!/^hg_/.test(e.k));S.inv.push({k:box("lan")});S.bac=200;const ti=S.inv.findIndex(e=>e.k===box("lan"));const tr=taintItem(S,ti,"doc");if(!tr||S.inv[ti].t!=="doc")bad.push("T7 her taint "+tr);
  u.inv=u.inv.filter(e=>!/^hg_/.test(e.k));u.sc="lan";u.scOff=0;u.inv.push(Object.assign({},S.inv[ti],{from:"me"}));S.inv.splice(ti,1);
  let sc0=u.suc=60;scBurn(u);if(u.suc!==sc0+B.doc.suc+(B.list.lan.g.suc||0))bad.push(`T7 npc burnt poison ${sc0}→${u.suc}`);
  S.inv.push({k:box("lan")},{k:box("lan")});S.sc="lan";S.scOff=0;const e1=scTaint(v,S);if(!e1||e1.by!==v.id)bad.push("T7 npc taint her");
  sc0=S.suc=60;const fb=S.inv.indexOf(e1);S.inv.splice(fb,1);S.inv.unshift(e1);scMonth();if(S.suc!==sc0+B.doc.suc)bad.push(`T7 her burnt poison ${sc0}→${S.suc}`);if(!/nồng gắt/.test(S.logs.join(" ")))bad.push("T7 no line");
  const e2=scTaint(v,S);roll=()=>true;const ev0=typeof evG==="function"?evG(S,v):0;const f=inspect(S);roll=roll0;if(!f.length||!/tẩm hương độc/.test(f.join(" ")))bad.push("T7 inspect "+JSON.stringify(f));
  if(typeof evG==="function"&&!(evG(S,v)>ev0))bad.push("T7 no evidence");
  /* j70 route both ways */
  try{S.inv.push({k:box("lan")});relAdd(v,S,-90);v.ghen=95;v.malice=90;const P1=newPlot70(v,S,"poison2","lohuong","band",{});if(!P1)bad.push("T7 no plot npc→her");else{P1.foil=0;P1.trap=0;exec70(P1,"night");if(!S.inv.some(e=>e.k===box("lan")&&e.t==="doc"&&e.by===v.id)&&P1.end==="done")bad.push("T7 j70 npc→her not tainted")}
   w.inv.push({k:box(w.sc)});w.scOff=0;const P2=newPlot70(S,w,"poison2","lohuong","band",{});if(!P2)bad.push("T7 no plot her→npc");else{P2.foil=0;P2.trap=0;exec70(P2,"night");if(!w.inv.some(e=>e.t==="doc"&&e.by==="me")&&P2.end==="done")bad.push("T7 j70 her→npc not tainted")}}catch(e){bad.push("T7 j70 "+e.message)}
  /* T8 old save */
  delete S.emp.likes.scent;for(const x of rivals){delete x.sc;delete x.scOff}delete S.sc;try{normAll()}catch(e){bad.push("T8 normAll "+e.message)}if(!S.emp.likes.scent)bad.push("T8 emp scent not filled");if(!scOf(rivals.find(x=>x.alive&&!x.out)))bad.push("T8 rival scOf");
  try{const s=JSON.stringify(S);JSON.parse(s)}catch(e){bad.push("T8 save "+e.message)}
  return bad});
 if(r.length)fails.push(...r.map(x=>`seed ${seed}: ${x}`));if(errs.length)fails.push(...errs.slice(0,3).map(x=>`seed ${seed} pageerror: ${x}`));await p.close()}
await b.close();if(fails.length){console.log("FAIL\n"+fails.join("\n"));process.exit(1)}console.log("PASS scent.test ("+LIVES+" lives)")})();
