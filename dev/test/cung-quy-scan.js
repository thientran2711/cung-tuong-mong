/* CUNG QUY scan (LAW 11, owner OD 26/11 ~06:50Z (C)): every NPC act generator and every deed key, before (LIVE 6b5d3d05) / after (this build).
   usage: node dev/test/cung-quy-scan.js [game.html] [--md out.md]     exit 0 = PASS
   Checks: (1) every deed key of every registry (ACT, TW, AGRUN, SOC, AGSOC, AGSELF, H95/F95 motive kinds) is listed with its BAL.cq class
   (no class = "free": no rank rule — printed so a reviewer can see each one); (2) every BAL.cq.k key exists in a registry (no stale row);
   (3) every generator runs through the one gate (wrappers present); (4) the rule both ways on a real save: lower → higher breaks, higher → lower
   is proper, for every class (law 1: her as doer and as target too). */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');
const A=process.argv.slice(2);const GAME=A.find(x=>x.endsWith('.html'))||path.join(__dirname,'..','index.html');const GAMEP=path.resolve(GAME);const mi=A.indexOf('--md');
/* BEFORE = the inline rank checks found on LIVE 6b5d3d05 (git grep rkOf / fxAuth in the ok / req of each deed) */
const BEFORE={batnat:"jtsb tsbBulOK rkOf(a)>rkOf(t)",tat:"jface ok rkOf(a)>rkOf(t)",phatquy:"jface fxAuth (Hoàng hậu or +3)",humil:"jtwoway req rkOf(a)>=rkOf(t)",follow:"jtwoway req rkOf(t)>rkOf(a)+1",
 takeaway:"j8 ok rkOf(a)>rkOf(t)&&rkOf(t)<4",accuse:"j8 accOK (Hoàng hậu only)",admon:"jtwoway req Hoàng hậu",thHH:"jtwoway req q!==a","hh:judge":"agReg hh group (Hoàng hậu)",
 "hh:conf":"agReg hh group","hh:cutpay":"agReg hh group","hh:reward":"agReg hh group","hh:pardon":"agReg hh group"};
const GENS=[["npcAct (harm menu)","j28.js","runAct"],["npcSocial (social menu, agent off)","j28.js","twDo"],["rivalsTurn judge (Hoàng hậu)","j8.js","hh rule (queen)"],
 ["agOpts / agOptsG (agent options, every group)","jagent.js / jagday.js","agOptsG"],["agLand0 (agent deed lands)","jagent.js / jagday.js","agLand0"],
 ["AGRUN cx/cx2/cx3/cx4/hh/th/emp/maid/srv/see/know deeds","jagacts*.js jagstaff.js jagday.js jagknow.js jpma.js","agLand0"],
 ["approachOne (người tìm đến, visitor)","j24.js","motiveOK + approachOne"],["newPlot70 / j70 plans","j70.js","motiveOK"],["wkGive / wkPoison (handmade works)","j83.js","motiveOK"],
 ["jemoact Phạm thượng outburst (deliberate breach, own cấm túc roll)","jemoact.js","own consequence = the same BAL.ea.pick.phamP"],
 ["her talk options (Khiêu khích / Trút giận)","j2.js","talkOpts"],["her rv act buttons","j6.js","runAct + xw warning"],["giveTo gift words","j8.js","cqGiftVerb"],["shelfNpcAccuse (monthly NPC charge: bày biện xa xỉ / vượt phẩm)","jshelf.js","cqRun (static check)"],["j95accuse / j95 NPC catch-charge (tryst caught)","j95.js","own consequence: punish «vu cáo … không đủ chứng cứ» on any failed charge (no double)"]];
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();
 const errs=[];page.on('pageerror',e=>errs.push(e.message));await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await page.goto('file://'+GAMEP);await page.waitForTimeout(800);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(800);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(1500);
 const R=await page.evaluate(()=>{const out={keys:{},bad:[],gate:{},both:[]};const add=(k,src)=>{const c=typeof cqCls==="function"?cqCls(k):null;(out.keys[k]=out.keys[k]||{cls:c||"free",src:[]}).src.push(src)};
  for(const k in ACT)add(k,"ACT");for(const k in TW)add(k,"TW");for(const k in AGRUN)add(k,"AGRUN");for(const k in SOC)add(k,"SOC");for(const k in AGSELF)add(k,"AGSELF");for(const k in AGSOC)add(AGSOC[k][0],"AGSOC");
  for(const k of H95)add(k,"H95");for(const k of F95)add(k,"F95");
  if(typeof BAL.cq!=="object")out.bad.push("BAL.cq missing");else for(const c in BAL.cq.k)for(const k of BAL.cq.k[c])if(!out.keys[k])out.bad.push("stale BAL.cq.k."+c+": "+k);
  const has=(f,s)=>typeof window[f]==="function"&&String(window[f]).includes(s);
  out.gate={runAct:has("runAct","cqRun"),twDo:has("twDo","cqRun"),agOptsG:has("agOptsG","cqOK"),agLand0:has("agLand0","cqRun"),motiveOK:has("motiveOK","cqRule"),approachOne:has("approachOne","cqRule"),talkOpts:has("talkOpts","cqRule")};
  {/* runAct / twDo are re-wrapped at load by other layers: check them by a real call (a low NPC's Phạt quỳ / Hạ nhục on a high one is stopped) */const L0=liveRivals(true).filter(v=>!v.queen).sort((a,b)=>a.rank-b.rank);const l0=L0[0],h0=L0[L0.length-1];if(l0&&h0&&h0.rank>l0.rank){const sv=[l0.sung,l0.cqB];l0.sung=0;CQN.blk={};runAct(l0,h0,"phatquy");twDo(l0,h0,"humil");out.gate.runAct=!!CQN.blk.phatquy;out.gate.twDo=!!CQN.blk.humil;l0.sung=sv[0];CQN.blk={}}}
  for(const g in out.gate)if(!out.gate[g])out.bad.push("gate missing: "+g);
  /* both ways on the real save: a low and a high consort (and her) */
  const L=liveRivals(true).filter(v=>!v.queen).sort((a,b)=>a.rank-b.rank);const lo=L[0],hi=L[L.length-1];const sr=S.rank;
  const T=(a,t,w)=>{for(const c of ["up","down","downNB","high","auth","take"]){const k=c==="up"?"follow":BAL.cq.k[c][0];const r1=cqRule(a,t,k),r2=cqRule(t,a,k);
    const ok=c==="up"?(!r1&&!!r2):(!!r1&&!r2);out.both.push({w,c,k,low_to_high:r1?r1.w:"đúng lễ",high_to_low:r2?r2.w:"đúng lễ",ok});if(!ok)out.bad.push("rule "+c+" "+w)}};
  if(lo&&hi&&hi.rank-lo.rank>=BAL.cq.auth.gap){T(lo,hi,"NPC low ↔ NPC high");S.rank=0;T(S,hi,"her low ↔ NPC high");S.rank=Math.min(6,lo.rank+BAL.cq.auth.gap);T(lo,S,"NPC low ↔ her high")}
  else out.bad.push("no pair of consorts "+BAL.cq.auth.gap+" ranks apart on the save");S.rank=sr;
  out.gift=[cqGiftVerb(hi,lo),cqGiftVerb(lo,hi),cqGiftVerb(lo,lo)];
  /* (5) every surface where SHE starts a breachable ACT shows the warning (person-card row j6 xw; the Dư đồ focus view jdf reads the same cqWarn, checked statically below) */
  out.surf=[];{const v=hi,sr0=S.rank;for(const c of ["down","high","auth"])for(const k of BAL.cq.k[c]){if(!ACT[k])continue;S.rank=c==="down"?Math.max(0,v.rank-1):v.rank;const w=ACT[k].xw?ACT[k].xw(S,v):"";const exp=!!(cqRule(S,v,k)&&cqRule(S,v,k).br);const ok=!exp||/trái cung quy/.test(w);out.surf.push({k,c,warn:w?"yes":"no",ok});if(!ok)out.bad.push("no breach warning on her row: "+k)}S.rank=sr0}
  /* (8) runtime, every open charge: her (Đáp ứng) vs the highest consort, the roll forced to FAIL → «vu cáo» line (unless the act punished her itself), forced WIN → no line */
  out.acc=[];{const r0=window.roll,a0=window.aRoll,sr=S.rank,sv=[S.danh,S.confined];S.rank=0;const T=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x)).sort((a,b)=>b.rank-a.rank)[0]||hi,T0={rank:T.rank,out:T.out,confined:T.confined||0,alive:T.alive,queen:T.queen,danh:T.danh};for(const k of BAL.cq.k.accuse){if(!ACT[k])continue;const row={k};for(const win of [false,true]){window.roll=()=>win;window.aRoll=()=>win;S.confined=0;S.out=false;Object.assign(T,T0);try{evA(S,T,9);const st=[S.confined||0,S.rank,!!S.out].join();const r=String(runAct(S,T,k)||"");const pun=[S.confined||0,S.rank,!!S.out].join()!==st;row[win?"win":"fail"]=!r?"—":/Trái cung quy/.test(r)?(win&&/tố bừa/.test(r)?"tố bừa (nothing to find) → vu cáo line":"vu cáo line"):/cùng cung/.test(r)?"same palace":pun?"own punishment":"no line"}catch(e){row[win?"win":"fail"]="ERR "+e.message}S.rank=0}
    row.ok=(row.fail==="vu cáo line"||row.fail==="own punishment"||row.fail==="—")&&row.win!=="vu cáo line"&&row.win!=="same palace";out.acc.push(row);if(!row.ok)out.bad.push("runtime charge "+k+" fail:"+row.fail+" win:"+row.win)}window.roll=r0;window.aRoll=a0;Object.assign(T,T0);S.rank=sr;S.danh=sv[0];S.confined=sv[1]}
  out.keysAcc=BAL.cq.k.accuse.slice();return out});
 const rows=Object.entries(R.keys).sort((x,y)=>(x[1].cls==="free")-(y[1].cls==="free")||x[0].localeCompare(y[0]));
 const md=[];md.push("| # | generator | file | gate after |","|---|---|---|---|");GENS.forEach((g,i)=>md.push(`| ${i+1} | ${g[0]} | ${g[1]} | ${g[2]} ${R.gate[g[2].split(" ")[0]]===false?"MISSING":"✓"} |`));
 md.push("","| key | registries | class (after) | before (LIVE) | after |","|---|---|---|---|---|");
 for(const [k,v] of rows)md.push(`| ${k} | ${[...new Set(v.src)].join(",")} | ${v.cls} | ${BEFORE[k]?"checked: "+BEFORE[k]:v.cls==="free"?"— (no rank rule)":"UNCHECKED"} | ${v.cls==="free"?"free (no rank rule)":"checked: cqRule "+v.cls}${v.cls==="up"||v.cls==="downNB"||v.cls==="take"?" (never breached)":v.cls==="accuse"?" (failed charge upward = breach consequence)":v.cls==="free"?"":" (deliberate breach only, own consequence)"} |`);
 md.push("","| pair | class | key | lower → higher | higher → lower | ok |","|---|---|---|---|---|---|");for(const x of R.both)md.push(`| ${x.w} | ${x.c} | ${x.k} | ${x.low_to_high} | ${x.high_to_low} | ${x.ok?"✓":"FAIL"} |`);
 const n={};for(const [,v] of rows)n[v.cls]=(n[v.cls]||0)+1;const nb=rows.filter(([k,v])=>v.cls!=="free"&&!BEFORE[k]).length,nc=rows.filter(([k,v])=>v.cls!=="free").length;
 const sum=`keys ${rows.length} · classes ${JSON.stringify(n)} · rank-ruled ${nc}: before checked ${nc-nb} / unchecked ${nb} → after checked ${nc} / unchecked 0 · gift words ${R.gift.join(" / ")} · page errors ${errs.length}`;

 {/* static: (6) every open charge marks its fail branch (cqAccFail = the structured fail signal); (7) the focus view warns */const src=f=>fs.readFileSync(path.join(__dirname,'../build',f),'utf8');const SRC={accuse:["j8.js",'A("accuse"'],vp:["j8.js","function vpAccuse"],xx:["jdress.js","function xxAccuse"],tocao:["j30.js",'A("tocao"'],expose:["j30.js",'A("expose"'],xinhh:["j30.js",'A("xinhh"'],trinhth:["j78.js",'A("trinhth"'],trinhhh:["j78.js",'A("trinhhh"'],"xx (shelf: bày biện)":["jshelf.js","function shelfAccuse"],"vp (shelf: bày đồ)":["jshelf.js","function shelfVpAccuse"],"shelfFalse (tố bừa)":["jshelf.js","function shelfFalse"],"xinhh (jaudit, live f)":["jaudit.js","const X=ACT.xinhh"],"trinhhh (jaudit, live f)":["jaudit.js","const T=ACT.trinhhh"],"xinhh (jrcv Hoàng hậu «no»)":["jrcv.js","RCVJ.xinhh="],"trinhhh (jrcv Hoàng hậu «no»)":["jrcv.js","RCVJ.trinhhh="]};
  md.push("","| open charge | file | fail branch marked (cqAccFail) |","|---|---|---|");for(const k in SRC){const t=src(SRC[k][0]);const i=t.indexOf(SRC[k][1]);const body=i<0?"":t.slice(i,t.indexOf("\nA(",i+5)>0?t.indexOf("\nA(",i+5):i+3000);const ok=/cqAccFail\(a,t[,)]/.test(body);md.push(`| ${k} | ${SRC[k][0]} | ${ok?"✓":"MISSING"} |`);if(!ok)R.bad.push("accuse fail not marked: "+k)}
  for(const k of (R.keysAcc||[]))if(!SRC[k]&&k!=="xx (shelf)")R.bad.push("accuse key without a fail-signal row: "+k);
  if(!/cqRun\(a,t,kind,run\)/.test(src("jshelf.js")))R.bad.push("shelfNpcAccuse bypasses the gate");
  if(!/cqWarn\(S,rivals\[x\.i\],x\.k\)/.test(src("jdf.js")))R.bad.push("jdf focus view has no cqWarn");
  md.push("","| open charge (runtime, her Đáp ứng → the highest consort) | forced fail | forced win | ok |","|---|---|---|---|");for(const x of R.acc||[])md.push(`| ${x.k} | ${x.fail} | ${x.win} | ${x.ok?"✓":"FAIL"} |`);
  md.push("","| her breachable act | class | warning on her row |","|---|---|---|");for(const x of R.surf)md.push(`| ${x.k} | ${x.c} | ${x.warn}${x.ok?" ✓":" FAIL"} |`);md.push("| Dư đồ focus view (jdf dfInPerson rows) | all in-person acts | cqWarn ✓ |","| talk options Khiêu khích / Trút giận (j2 talkOpts) | down | cqWarn ✓ |")}
 if(mi>=0)fs.writeFileSync(A[mi+1],md.join("\n")+"\n\n"+sum+"\n");
 console.log(sum);if(errs.length)console.log("ERR",errs.slice(0,3));const fail=R.bad.concat(errs.length?["page errors"]:[]);console.log(fail.length?"FAIL "+fail.join("; "):"PASS");await b.close();process.exit(fail.length?1:0)})();
