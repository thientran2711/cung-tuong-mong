/* mg-allkinds (owner OD 20/11 ~08:40Z + ~08:45Z) — node dev/test/mg-allkinds.js [index.html]
   Owner 08:40Z: "mini game trang điểm nữa mà" → scan every mini-game OUTSIDE KG82_KIND. Owner 08:45Z (verbatim in OD): the makeup mirror «Trước gương đồng»
   (jtoil toilMakeup / jmkt tsMkSit) is NOT added to Thử tay now — it waits for the character faces, she tests it later. This test is the standing guard:
   1 Thử tay (mgCalKinds) lists EVERY KG82_KIND that has a name and an engine (none hidden), and every KG82_ENG engine is used by a kind
   2 every kind opens its kit rules screen (.kgr + «Hướng dẫn» #kgrtut) from Thử tay (mgCalRun) — rules before the board
   3 the old j5 lesson boards (gCam gKy gHoa gVu) are SHADOWED at every open (KG82_MGL → the kinds dan/co/ve/mua), so the "real" j5 Cờ board never runs
   4 every kg82Open art label in the assembled page is registered below (a new unlisted game FAILS here: add it to Thử tay or to the table with a reason)
   5 the makeup mirror is deliberately outside (no kind runs toilMakeup) until the owner says so — flip OUTSIDE.toil when she does
   6 no page errors */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const URL0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
/* art label → why it is not its own Thử tay kind (all are wrappers / non-scored / waiting) */
const ARTS={"Thử tay":"the calibration itself","Khảo hạch":"wrapper of the exam kinds (jexam kgReady{kind})","Chải chuốt":"IS kind chai (j92) + wrapper",
 "Nghiệm thân":"jroute Lén / Giọt máu: one-off gate vs the Emperor, no NPC rival hand to calibrate (own kgReady + guided round)",
 "Phối đồ":"jts dress-up contest board: item picking, no skill hand; its skill games duho/den ARE kinds",
 "Điểm trang":"jtoil toilMakeup / jmkt tsMkSit «Trước gương đồng»: WAITS for the faces (owner OD 20/11 ~08:45Z)"};
const OUTSIDE={toil:"toilMakeup waits (OD 08:45Z)",sg:["sgNghe","sgTruyen","sgMac","sgThoiCo"],j5:["gCam","gKy","gHoa","gVu"]};
(async()=>{const src=fs.readFileSync(path.resolve(URL0.replace(/^file:\/\//,'')),'utf8');
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(async()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};
  const all=Object.keys(KG82_KIND),cal=mgCalKinds();o.all=all.length;o.cal=cal.length;
  o.hidden=all.filter(k=>KG82_KIND[k].n&&typeof KG82_ENG[KG82_KIND[k].e]==="function"&&!cal.includes(k));
  o.noEng=all.filter(k=>!(typeof KG82_ENG[KG82_KIND[k].e]==="function"));
  const used=new Set(all.map(k=>KG82_KIND[k].e));o.orphan=Object.keys(KG82_ENG).filter(e=>!used.has(e));
  o.toilKind=all.filter(k=>/toil|makeup/i.test(KG82_KIND[k].e));
  o.rules=[];for(const k of cal){try{mgCalRun(k);await sleep(120);const bx=kg82Box();const rl=!!(bx&&bx.querySelector(".kgr .kpst"));const tut=!!(bx&&bx.querySelector("#kgrtut"));if(!rl||!tut)o.rules.push(k+":"+(rl?"":"norules ")+(tut?"":"notut"))}catch(e){o.rules.push(k+":"+e.message)}try{kg82Close()}catch(e){}}
  o.shadow={};const old={cam:typeof gCam!=="undefined"?gCam:0,ky:typeof gKy!=="undefined"?gKy:0,hoa:typeof gHoa!=="undefined"?gHoa:0,vu:typeof gVu!=="undefined"?gVu:0};
  for(const k of ["cam","ky","hoa","vu"]){try{openMG(k,0,()=>{});await sleep(80);o.shadow[k]=old[k]&&MG[k][2]!==old[k]}catch(e){o.shadow[k]=false}try{document.getElementById("ov").hidden=true;document.getElementById("mgb").innerHTML=""}catch(e){}}
  return o});
 console.log(JSON.stringify(r));
 ok(r.cal>=31&&!r.hidden.length&&!r.noEng.length,'1 Thử tay lists every named KG82_KIND with an engine; none hidden, none engine-less',{kinds:r.all,thuTay:r.cal,hidden:r.hidden,noEng:r.noEng});
 ok(!r.orphan.length,'1 every KG82_ENG engine is used by a kind',r.orphan);
 ok(!r.rules.length,'2 every Thử tay kind opens the kit rules screen with «Hướng dẫn»',r.rules);
 ok(Object.values(r.shadow).length===4&&Object.values(r.shadow).every(Boolean),'3 j5 gCam/gKy/gHoa/gVu are shadowed at every open (Cờ = kind co, the real board is already in Thử tay)',r.shadow);
 const arts=[...new Set((src.match(/kg82Open\(\{art:"[^"]+"/g)||[]).map(s=>s.replace(/^kg82Open\(\{art:"|"$/g,'')))];
 const unk=arts.filter(a=>!ARTS[a]);ok(!unk.length,'4 every kg82Open art label is registered (a new game must join Thử tay or be listed here with a reason)',{arts,unregistered:unk});
 ok(!r.toilKind.length,'5 makeup mirror «Trước gương đồng» is deliberately NOT a Thử tay kind yet (owner OD 20/11 ~08:45Z)',r.toilKind);
 ok(errs.length===0,'6 no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
