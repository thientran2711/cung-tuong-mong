/* mg-allkinds (owner OD 20/11 ~08:40Z + ~08:45Z) — node dev/test/mg-allkinds.js [index.html]
   Owner 08:40Z: "mini game trang điểm nữa mà" → scan every mini-game OUTSIDE KG82_KIND. Owner 08:45Z (verbatim in OD): the makeup mirror «Trước gương đồng»
   (jtoil toilMakeup / jmkt tsMkSit) is NOT added to Thử tay now — it waits for the character faces, she tests it later. This test is the standing guard:
   1 Thử tay (mgCalKinds) lists EVERY KG82_KIND that has a name and an engine (none hidden), and every KG82_ENG engine is used by a kind
   2 every kind opens its kit rules screen (.kgr + «Hướng dẫn» #kgrtut) from Thử tay (mgCalRun) — rules before the board
   3 the old j5 lesson boards (gCam gKy gHoa gVu) are SHADOWED at every open (KG82_MGL → the kinds dan/co/ve/mua), so the "real" j5 Cờ board never runs
   4 every kg82Open art label in the assembled page is registered below (a new unlisted game FAILS here: add it to Thử tay or to the table with a reason)
   5 the makeup mirror is deliberately outside (no kind runs toilMakeup) until the owner says so — flip OUTSIDE.toil when she does
   6 no page errors
   GAP MG11 (MAIN ROOT-79 16:25Z, jmgx.js; report dev/handover/reports/mg11-thutay.md) — the boards outside KG82_KIND that are SKILL boards are kinds now:
   7 the seven MG11 kinds (nghe truyen mac thoico thu_tam thu_choi tuoi) are KG82 kinds listed by Thử tay; the non-hands stay out (Cho ăn, j5 gKy, envoy chess card)
   8 each reads the board ease: the middle ease (BAL.mgTier.mid) = the board as it was before MG11; the Thử tay ladder d −2 → +2 really gets harder
   9 every live play outside kg82Play goes through the ONE result path: mgPlayRes learns her hand b (S.mgB) and the live callers use it (sgPlay, petcBath, petcPlay, plant water)
   10 each MG11 board plays to an end from Thử tay's generic env (the engine ends with a 0..10 raw) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const URL0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
/* art label → why it is not its own Thử tay kind (all are wrappers / non-scored / waiting) */
const ARTS={"Thử tay":"the calibration itself","Khảo hạch":"wrapper of the exam kinds (jexam kgReady{kind})","Chải chuốt":"IS kind chai (j92) + wrapper",
 "Nghiệm thân":"jroute Lén / Giọt máu: one-off gate vs the Emperor, no NPC rival hand to calibrate (own kgReady + guided round)",
 "Phối đồ":"jts dress-up contest board: item picking, no skill hand; its skill games duho/den ARE kinds",
 "Điểm trang":"jtoil toilMakeup / jmkt tsMkSit «Trước gương đồng»: WAITS for the faces (owner OD 20/11 ~08:45Z)"};
const OUTSIDE={toil:"toilMakeup waits (OD 08:45Z)",j5:["gCam","gKy","gHoa","gVu"],feed:"petcFeed: knowledge pick, no hand",envoy:"jkc2 «Đánh cờ với sứ thần»: odds deck card, IS Cờ (kind co)"};
const MG11=["nghe","truyen","mac","thoico","thu_tam","thu_choi","tuoi"];
/* MG11 knob at the middle ease = the old typed board number */
const OLD={nghe:{cross:6500},truyen:{lim:12000},mac:{lim:10000},thoico:{lim:8000},thu_choi:{ms:820,dec:140,min:420,n:3},thu_tam:{k:1.6,n:5},tuoi:{f:1}};
/* the knob that must move toward HARDER as the gap d rises: +1 = the value grows when harder, −1 = it shrinks */
const HARD={nghe:['cross',-1],truyen:['lim',-1],mac:['lim',-1],thoico:['lim',-1],thu_choi:['ms',-1],thu_tam:['k',1],tuoi:['f',-1]};
(async()=>{const src=fs.readFileSync(path.resolve(URL0.replace(/^file:\/\//,'')),'utf8');
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(async({MG11,HARD})=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};
  const all=Object.keys(KG82_KIND),cal=mgCalKinds();o.all=all.length;o.cal=cal.length;
  o.hidden=all.filter(k=>KG82_KIND[k].n&&typeof KG82_ENG[KG82_KIND[k].e]==="function"&&!cal.includes(k));
  o.noEng=all.filter(k=>!(typeof KG82_ENG[KG82_KIND[k].e]==="function"));
  const used=new Set(all.map(k=>KG82_KIND[k].e));o.orphan=Object.keys(KG82_ENG).filter(e=>!used.has(e));
  o.toilKind=all.filter(k=>/toil|makeup/i.test(KG82_KIND[k].e));
  o.rules=[];for(const k of cal){try{mgCalRun(k);await sleep(120);const bx=kg82Box();const rl=!!(bx&&bx.querySelector(".kgr .kpst"));const tut=!!(bx&&bx.querySelector("#kgrtut"));if(!rl||!tut)o.rules.push(k+":"+(rl?"":"norules ")+(tut?"":"notut"))}catch(e){o.rules.push(k+":"+e.message)}try{kg82Close()}catch(e){}}
  o.shadow={};const old={cam:typeof gCam!=="undefined"?gCam:0,ky:typeof gKy!=="undefined"?gKy:0,hoa:typeof gHoa!=="undefined"?gHoa:0,vu:typeof gVu!=="undefined"?gVu:0};
  for(const k of ["cam","ky","hoa","vu"]){try{openMG(k,0,()=>{});await sleep(80);o.shadow[k]=old[k]&&MG[k][2]!==old[k]}catch(e){o.shadow[k]=false}try{document.getElementById("ov").hidden=true;document.getElementById("mgb").innerHTML=""}catch(e){}}
  /* MG11 */
  o.mg11={in:MG11.filter(k=>KG82_KIND[k]&&cal.includes(k)),feed:!!KG82_KIND.feed||!!KG82_KIND.cho_an,co:Object.keys(KG82_KIND).filter(k=>/^(ky|gky|envoy)/.test(k))};
  o.mid={};o.ladder={};for(const k of MG11){const L=(BAL.mgTier.lev||{})[k]||{};o.mid[k]={};for(const n in L)o.mid[k][n]=Math.round(mgLev({lv:BAL.mgTier.mid},k,n)*1000)/1000;
   const [n,dir]=HARD[k];const v=BAL.ag.mg2.cal.d.map(d=>mgLev({lv:mgTier(k,{occ:"hoc",lv:0,d}).ease},k,n));o.ladder[k]={n,v:v.map(x=>Math.round(x*1000)/1000),ok:v.every((x,i)=>!i||(dir>0?x>=v[i-1]:x<=v[i-1]))&&v[0]!==v[v.length-1]}}
  S.mgB={};const n0=0;mgSet("thu_choi",{occ:"hoc"});const r1=mgPlayRes("thu_choi",8);o.learn={r1,n:S.mgB.thu_choi&&S.mgB.thu_choi.n};
  /* 11 (review r1): a scheme play learns b but the odds step reads the GRADED play: a steady hand of 5 stays «giữ nguyên» (law 2 vs «Giao cho người làm») */
  S.mgB={};mgSet("nghe",{occ:"hoc"});for(let i=0;i<20;i++)mgPlayLearn("nghe",5);const g5=mgPlayLearn("nghe",5),rec5=mgPlayRes("nghe",5);
  o.law2={b:Math.round(mgIdB("nghe",S)*10)/10,g5,step:sgStep(g5),recentred:rec5,stepIfRecentred:sgStep(rec5),dur:sgDur(SG.K.rumor),lim:mgPlaySec("truyen","lim")};
  const src=f=>String(f);o.live={sgPlay:/mgPlayLearn\(G\.g/.test(src(sgPlay)),sgEng:/mgPlayLv\(G\.g\)/.test(src(sgEng)),bath:/mgPlayRes\("thu_tam"/.test(src(petcBath)),play:/mgPlayRes\("thu_choi"/.test(src(petcPlay))};
  o.ends={};for(const k of MG11){const box=document.createElement("div");box.className="kgbox";document.body.appendChild(box);let raw=null;
   const env={kind:k,lv:mgSet(k,{occ:"hoc",lv:0,d:0}).ease,hud:()=>{},end:x=>{raw=x}};let stop=null;try{stop=KG82_ENG[KG82_KIND[k].e](box,env)}catch(e){o.ends[k]="throw "+e.message;continue}
   await sleep(150);
   if(k==="thu_choi"){for(let i=0;i<5&&raw==null;i++){const b=box.querySelector('[data-ball].on')||box.querySelector('[data-ball]');b.click();await sleep(30)}}
   else if(k==="thu_tam"){const st=box.firstElementChild;const r=st.getBoundingClientRect();for(let i=0;i<5&&raw==null;i++){const x=r.left+r.width/2,y=r.top+10;st.dispatchEvent(new PointerEvent("pointerdown",{clientX:x,clientY:y,bubbles:true,pointerId:1}));st.dispatchEvent(new PointerEvent("pointerup",{clientX:x,clientY:y+60+i,bubbles:true,pointerId:1}))}}
   else if(k==="tuoi"){for(let i=0;i<3&&raw==null;i++){const b=box.querySelector('[data-shw]');if(b)b.click();await sleep(40)}}
   else{try{if(KG82.quit)KG82.quit()}catch(e){}if(raw==null){/* the scheme boards end on their own clock: started = a canvas + kit buttons drawn */raw=box.querySelector("canvas")&&box.querySelector("button")?"started":null}}
   o.ends[k]=raw;try{if(stop)stop()}catch(e){}box.remove()}
  return o},{MG11,HARD});
 console.log(JSON.stringify(r));
 ok(r.cal>=38&&!r.hidden.length&&!r.noEng.length,'1 Thử tay lists every named KG82_KIND with an engine; none hidden, none engine-less',{kinds:r.all,thuTay:r.cal,hidden:r.hidden,noEng:r.noEng});
 ok(!r.orphan.length,'1 every KG82_ENG engine is used by a kind',r.orphan);
 ok(!r.rules.length,'2 every Thử tay kind opens the kit rules screen with «Hướng dẫn»',r.rules);
 ok(Object.values(r.shadow).length===4&&Object.values(r.shadow).every(Boolean),'3 j5 gCam/gKy/gHoa/gVu are shadowed at every open (Cờ = kind co, the real board is already in Thử tay)',r.shadow);
 const arts=[...new Set((src.match(/kg82Open\(\{art:"[^"]+"/g)||[]).map(s=>s.replace(/^kg82Open\(\{art:"|"$/g,'')))];
 const unk=arts.filter(a=>!ARTS[a]);ok(!unk.length,'4 every kg82Open art label is registered (a new game must join Thử tay or be listed here with a reason)',{arts,unregistered:unk});
 ok(!r.toilKind.length,'5 makeup mirror «Trước gương đồng» is deliberately NOT a Thử tay kind yet (owner OD 20/11 ~08:45Z)',r.toilKind);
 ok(r.mg11.in.length===MG11.length&&!r.mg11.feed&&!r.mg11.co.length,'7 the seven MG11 kinds are in Thử tay; Cho ăn / j5 Kỳ / envoy card are not kinds',r.mg11);
 ok(MG11.every(k=>Object.keys(OLD[k]).every(n=>Math.abs(r.mid[k][n]-OLD[k][n])<1e-6)),'8a the middle ease gives the old board of every MG11 kind',{mid:r.mid,old:OLD});
 ok(MG11.every(k=>r.ladder[k].ok),'8b the Thử tay ladder d −2 → +2 makes every MG11 board harder',r.ladder);
 ok(r.law2.b<6&&r.law2.step===0&&r.law2.dur.includes(r.law2.lim+' giây'),'11 scheme odds step reads the graded play (steady hand 5 → step 0, not +1); card seconds = BAL board',r.law2);
 r.live.water=/mgPlayEnv\("tuoi"[^;]*mgPlayRes\("tuoi"/.test(src);ok(r.learn.n===1&&Object.values(r.live).every(Boolean),'9 live plays use the ONE result path (her hand b learns; sgPlay/sgEng/petcBath/petcPlay wired)',{learn:r.learn,live:r.live});
 ok(MG11.every(k=>r.ends[k]!=null&&!/^throw/.test(String(r.ends[k]))&&(r.ends[k]==="started"||(+r.ends[k]>=0&&+r.ends[k]<=10))),'10 every MG11 board starts from a generic env and the touch boards end with a 0..10 raw',r.ends);
 ok(errs.length===0,'6 no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
