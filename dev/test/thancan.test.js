/* thancan.test (review/thancan; owner OD 20/11 ~15:55Z = OD:L2051 CUNG NỮ THÂN CẬN; module dev/build/jtc.js). Seeded bot lives.
   T1 new life: nobody (her, any consort, Thái hậu) has a thân cận; the record (j95s) marks no one close.
   T2 her person card (j15 staff tab, kit pbtn) shows «Chọn làm cung nữ thân cận» on a trusted tam–nhất đẳng maid; the tap raises her:
      master.tc set, her lòng +BAL.thc.pick.loy, Bạc -pick.bac, every other maid of the house lòng -pick.envy; the record marks her close (q.close)
      and labels her "Cung nữ thân cận của ngươi"; her card then offers «Thôi làm cung nữ thân cận».
   T3 refused with the reason: lòng under BAL.loy.trust, thô sử (rk 0), short of bạc; a eunuch's card has no such button.
   T4 dismiss: tc cleared, her lòng +drop.loy, the others +drop.calm. Replace: choosing another one steps the first down.
   T5 stale pointer: the thân cận sent away (removed from staff) → thcOf none.
   T6 NPC masters (two-way): 24 months of thcNpcAll with every maid trusted → some consorts and Thái hậu pick one; one whose lòng falls under
      npc.drop is let go.
   T7 figure look slot: a fake uniform record "maid-thancan-<m>-t<n>" on her maid's identity is worn only while she is thân cận; never by an
      ordinary maid.
   T8 old save (no S.thcV): loadSlot keeps every house's personal maid as its thân cận.
   usage: python3 dev/build/assemble.py && node dev/test/thancan.test.js dev/index.html [lives=2]   → PASS / FAIL (exit 0 / 1) */
const {chromium}=require('playwright');const path=require('path');
const [,,F,L0]=process.argv;const LIVES=+L0||2;
(async()=>{const b=await chromium.launch();const fails=[];const notes=[];
for(let seed=1;seed<=LIVES;seed++){const p=await b.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
 await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},seed);
 await p.goto('file://'+path.resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}window.render=render=function(){};window.showModal=showModal=function(){};});
 const r=await p.evaluate(()=>{const bad=[],note=[];const B=BAL.thc;
  /* T1 */
  if(S.thc!=null)bad.push("T1 her tc at start");for(const v of rivals)if(v.thc!=null)bad.push("T1 rival tc at start "+v.name);if(S.thO&&S.thO.thc!=null)bad.push("T1 TH tc at start");
  try{j95sync(false,true)}catch(e){}const ppl=j95ppl(S.roster);const H=j95sHouses(ppl);let nc=0;for(const [o,L] of H)for(const q of L)if(q.close)nc++;if(nc)bad.push("T1 record has "+nc+" close at start");
  /* make a household: 3 maids rk 1,2,3 loyal 80, one eunuch */
  S.staff=S.staff||[];while(S.staff.filter(s=>s.role==="maid").length<3)S.staff.push(mkServ("maid"));if(!S.staff.some(s=>s.role==="eunuch"))S.staff.push(mkServ("eunuch"));
  const M=S.staff.filter(s=>s.role==="maid");M.forEach((s,i)=>{s.rk=1+i;s.loyal=80});S.bac=200;S.maid.loyal=80;
  const a=M[1],o1=M[0],o2=M[2];const idx=1+S.staff.indexOf(a);PG.staff=idx;let h=staffTabHTML();
  if(!/data-thcp="\d+" data-thcon="1"/.test(h)||!/Chọn làm cung nữ thân cận/.test(h))bad.push("T2 no choose button on her card");
  const bac0=S.bac,la=a.loyal,l1=o1.loyal,lm=S.maid.loyal;
  document.body.insertAdjacentHTML("beforeend",`<div id="tct">${h}</div>`);const btn=document.querySelector('#tct button[data-thcp][data-thcon="1"]');if(!btn)bad.push("T2 no DOM button");else if(btn.disabled)bad.push("T2 button disabled: "+btn.textContent);else btn.click();document.getElementById("tct").remove();
  if(S.thc!==a.sid)bad.push("T2 tc not set "+S.thc);if(a.loyal!==Math.min(100,la+B.pick.loy))bad.push(`T2 her lòng ${la}→${a.loyal}`);if(S.bac!==bac0-B.pick.bac)bad.push(`T2 bạc ${bac0}→${S.bac}`);
  if(o1.loyal!==l1-B.pick.envy)bad.push(`T2 envy ${l1}→${o1.loyal}`);if(S.maid.loyal!==lm-B.pick.envy)bad.push(`T2 personal maid envy ${lm}→${S.maid.loyal}`);
  try{J95S.last=null;j95sync(false,true)}catch(e){}const H2=j95sHouses(j95ppl(S.roster));const mine=H2.get(S)||[];const cq=mine.filter(q=>q.close);
  if(cq.length!==1||cq[0].id!=="s"+a.sid)bad.push("T2 record close "+JSON.stringify(cq.map(q=>q.id)));
  const row=j95ppl(S.roster).find(q=>q.id==="s"+a.sid);if(!row||!/Cung nữ thân cận của ngươi/.test(JSON.stringify(row)))bad.push("T2 label "+JSON.stringify(row&&row.name));
  h=staffTabHTML();if(!/Thôi làm cung nữ thân cận/.test(h))bad.push("T2 no dismiss button");
  if(!S.logs[0]||!/cung nữ thân cận/.test(S.logs[0]))bad.push("T2 no log line");
  /* T3 */
  o2.loyal=BAL.loy.trust-1;if(!/chưa đủ tin/.test(thcWhyNot(S,o2)))bad.push("T3 trust why "+thcWhyNot(S,o2));o2.loyal=80;o2.rk=0;if(!/tam đẳng/.test(thcWhyNot(S,o2)))bad.push("T3 rank why");o2.rk=3;
  const bb=S.bac;S.bac=B.pick.bac-1;if(!/bạc/.test(thcWhyNot(S,o2)))bad.push("T3 bạc why");S.bac=bb;
  const eu=S.staff.find(s=>s.role==="eunuch");if(thcGroups(eu).length)bad.push("T3 eunuch has a group");
  PG.staff=1+S.staff.indexOf(o2);o2.loyal=10;h=staffTabHTML();if(!/<button data-thcp="\d+" data-thcon="1" disabled>/.test(h))bad.push("T3 untrusted button not disabled");o2.loyal=80;
  /* T4 replace + dismiss */
  const la2=a.loyal;thcPick(o2.sid,1);if(S.thc!==o2.sid)bad.push("T4 replace failed");if(a.loyal!==la2+B.drop.loy)bad.push(`T4 stepped-down lòng ${la2}→${a.loyal}`);
  const lo=o2.loyal,l1b=o1.loyal;thcPick(o2.sid,0);if(S.thc!=null)bad.push("T4 dismiss failed");if(o2.loyal!==lo+B.drop.loy)bad.push("T4 dismissed lòng");if(o1.loyal!==l1b+B.drop.calm)bad.push("T4 calm");
  /* personal maid can be chosen */
  S.maid.loyal=90;thcPick("m:"+S.maid.name,1);if(S.thc!=="m:"+S.maid.name)bad.push("T4 personal maid not chosen "+S.thc);
  /* T9 (r1): an ineligible pick (lòng under the bar when the tap lands) changes nothing — the current one stays, no cost */
  {const cur=S.thc,lm9=S.maid.loyal,b9=S.bac;o1.loyal=BAL.loy.trust-1;thcPick(o1.sid,1);if(S.thc!==cur)bad.push("T9 ineligible pick stepped the current one down "+S.thc);if(S.maid.loyal!==lm9||S.bac!==b9)bad.push("T9 ineligible pick cost something");o1.loyal=80}
  /* T10 (r1): j68g servHero «Thăng làm người thân cận» (its own ok()) on a trusted maid really raises her through thcSet */
  {const x=S.staff.find(s=>s.role==="maid"&&s!==o1&&s.rk>=1&&s.rk<=3);const E=E68I.servHero;if(x&&E){x.loyal=90;S.bac=Math.max(S.bac,200);const A={o:x,n:x.name,k:"sv"};const O=E.o({A});const c=O.find(o=>/thân cận/.test(JSON.stringify(o)||"")||/thân cận/.test(o.n||o.t||""));
    const okf=c&&c.go;S.bac=Math.max(S.bac,200);const b10=S.bac;const fb=c.fx&&c.fx.bac;if(!(fb<0))bad.push("T10 card hides the uniform Bạc: "+JSON.stringify(c.fx));else apply(c.fx);/* shown cost (jbac fair-prices event bạc, law 2); the runner pays it, then go() *//* the event runner pays the shown cost, then go() */if(!okf)note.push("T10 option shape "+Object.keys(c||{}).join(","));else{okf();if(S.thc!==x.sid)bad.push("T10 j68g did not raise her "+S.thc);if(S.bac!==b10+fb)bad.push(`T10 j68g bạc ${b10}→${S.bac} (want the shown ${fb} once)`)}
    thcPick("m:"+S.maid.name,1)}else note.push("T10 skipped")}
  /* T5 stale */
  thcPick(o1.sid,1);if(S.thc!==o1.sid)bad.push("T5 setup");S.staff.splice(S.staff.indexOf(o1),1);if(thcOf(S))bad.push("T5 stale tc still read");if(S.thc!=null)bad.push("T5 stale not cleared");
  /* T6 NPC */
  const hs=[];for(const v of liveRivals(true)){(v.staff||[]).forEach(s=>{if(s.role==="maid"){s.loyal=90;if(s.rk==null||s.rk<1||s.rk>3)s.rk=2}});if(v.maid)v.maid.loyal=90;v.bac=Math.max(v.bac||0,200)}
  if(S.thO)(S.thO.staff||[]).forEach(s=>{if(s.role==="maid"){s.loyal=90;s.rk=2}});
  for(let i=0;i<24;i++)thcNpcAll();const nv=liveRivals(true).filter(v=>v.alive&&!v.out&&thcOf(v)).length;const all=liveRivals(true).filter(v=>v.alive&&!v.out).length;
  note.push(`T6 NPC consorts with thân cận ${nv}/${all}, TH ${S.thO&&thcOf(S.thO)?"yes":"no"}, counters ${JSON.stringify(window.__tcN)}`);
  if(!nv)bad.push("T6 no NPC picked");if(S.thO&&(S.thO.staff||[]).some(s=>s.role==="maid")&&!thcOf(S.thO))bad.push("T6 Thái hậu never picked");
  const v1=liveRivals(true).find(v=>thcOf(v));if(v1){const c=thcOf(v1);c.loyal=B.npc.drop-1;thcNpc(v1);if(thcOf(v1)===c)bad.push("T6 low-lòng thân cận kept")}
  /* T7 look slot */
  S.bac=Math.max(S.bac,200);const s7=S.staff.find(s=>s.role==="maid"&&s.rk>=1&&s.rk<=3);s7.loyal=90;thcPick(s7.sid,1);const k7=thcLookKey(s7);if(!/^maid-thancan-(p\d+|hh|x)-t\d$/.test(k7||""))bad.push("T7 key "+k7);
  if(!s7.fid){s7.fid="maid:m99";FIGIX.maid=FIGIX.maid||{};FIGIX.maid["maid:m99"]=[{file:"img/fake-base.webp"}]}const fk=s7.fid;note.push("T7 key "+k7+" fid "+fk);
  if(fk&&FIGIX){const r0=fk.split(":")[0];FIGIX[r0]=FIGIX[r0]||{};const L=FIGIX[r0][fk]=FIGIX[r0][fk]||[];const before=figFor(s7);L.push({file:"img/fake-tc.webp",tier:k7});L.push({file:"img/fake-tc-other.webp",tier:"maid-thancan-p99-t3"});
   if(!FIGS.length)FIGS.push({});
   const on=figFor(s7);if(!/fake-tc\.webp/.test(on))bad.push("T7 uniform not worn: "+on);thcPick(s7.sid,0);const off=figFor(s7);if(/fake-tc/.test(off))bad.push("T7 uniform worn after dismiss: "+off);
   L.splice(L.length-2,2)}else note.push("T7 figure part skipped (no identity)");
  /* T8 old save */
  save();const raw=JSON.parse(localStorage.getItem(SK(SLOT)));delete raw.S.thcV;delete raw.S.thc;if(raw.R)for(const v of raw.R){delete v.thc;delete v.thcV}localStorage.setItem(SK(SLOT),JSON.stringify(raw));
  return{bad,note,slot:SLOT}});
 fails.push(...r.bad.map(x=>`seed ${seed}: ${x}`));notes.push(...r.note.map(x=>`seed ${seed}: ${x}`));
 const r8=await p.evaluate(slot=>{const bad=[];try{deser(loadSlot(slot))}catch(e){bad.push("T8 load threw "+e.message)}
  if(!S||S.thcV!==1)bad.push("T8 thcV not set");if(S.maid&&S.thc!=="m:"+S.maid.name)bad.push("T8 her personal maid not kept: "+S.thc);
  for(const v of rivals)if(v.alive&&v.maid&&v.maid.name&&v.thc==null)bad.push("T8 rival maid not kept "+v.name);return bad},r.slot);
 fails.push(...r8.map(x=>`seed ${seed}: ${x}`));
 if(errs.length)fails.push(`seed ${seed}: page errors ${errs.slice(0,3).join(" | ")}`);await p.close()}
await b.close();notes.forEach(x=>console.log("  "+x));
if(fails.length){console.log("FAIL\n"+fails.join("\n"));process.exit(1)}console.log("PASS thancan ("+LIVES+" lives)")})();
