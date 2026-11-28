/* K-RING-WHY (KK70-W1; LIVE law 3 «no hidden loss / honest locks», law 9 kit first, law 11 the whole group; KIT §98.1d):
   EVERY closed kit plaque (off + why), whatever host hangs the board, shows its reason in the kit word pop-up (#kpop, kpPop) when she taps the plaque or its «!» badge.
   Host families (every kitPick.open caller, dev/build grep):
     ring   kitRing (jkring pickOpen, host = the ring layer R.L) — the ring adapter's choices(): the jone door TIER card «Khiêu khích · nhẹ|vừa|nặng» (STALE-TESTS-9 gateNo repro)
     focus  kitFocus (jfocus fillPick, host = .kfoc) — a focus view whose act is closed
     stage  kitStage answers (jkstage kstgTalkAsk, host = #modal .dlg) — a talk card whose answer is closed (after its lines, real taps on the speech box)
     bare   any other kitPick host with NO onOff (jkpcard entry / hang, host = #stage) — kitPick.open on the place stage
   Each family: «Khiêu khích · vừa» closed «chưa có cớ» → a REAL tap on the plaque shows «chưa có cớ» in #kpop; a REAL tap on its «!» shows it again;
   the open plaque «Khiêu khích · nhẹ» keeps two-tap: 1st tap lifts (green ✓ shows, nothing chosen), 2nd tap chooses (ring / focus / bare).
   0 page errors.  MUTATE: env KMUT=1 serves a build with the old kitPick binding (no whyTap / whyShow) → must FAIL.
   usage: node dev/test/kit-ring-why.js <dev/index.html path> <outdir>   (shots go OUTSIDE the repo; env SIZES default 755x1000,1180x820) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const boot=require('./kit-ring-boot.js');
const [,,SRC,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
let FILE=path.resolve(SRC);
if(process.env.KMUT==='1'){let s=fs.readFileSync(FILE,'utf8');const n0=s.length;
 s=s.replace('if(whyTap(P,a,n,b,ev))return;','').replace('if(a.off){whyShow(P,a,b);try{P.o.onOff','if(a.off){try{P.o.onOff');
 if(s.length===n0)throw new Error('KMUT: anchors not found');FILE=FILE.replace(/\.html$/,'-kmut.html');fs.writeFileSync(FILE,s)}
const URL='file://'+FILE;
(async()=>{const b=await chromium.launch();let fail=0;const ALL={};
 for(const wh of (process.env.SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await boot(p,{url:URL});await p.evaluate(()=>{window.__why=[]});const res={};
  const tapAt=async(x,y)=>{await p.touchscreen.tap(x,y);await sleep(450)};
  /* a real tap on an element's centre; returns what the finger hit (must be the element or inside it) */
  const tapEl=async(js)=>{const r=await p.evaluate(js=>{const e=eval(js);if(!e)return null;const b=e.getBoundingClientRect();const x=b.left+b.width/2,y=b.top+b.height/2,h=document.elementFromPoint(x,y);return {x,y,hit:!!h&&(h===e||e.contains(h)),hn:h?(h.tagName+"."+String(h.className).slice(0,40)+"/"+(h.parentElement?String(h.parentElement.className).slice(0,30):"")):""}},js);if(!r)return {ok:false};await tapAt(r.x,r.y);return {ok:true,hit:r.hit,hn:r.hn}};
  const pop=()=>p.evaluate(()=>{const e=document.getElementById('kpop');if(!e||e.hidden)return "";const r=e.getBoundingClientRect(),cs=getComputedStyle(e);if(r.width<2||cs.display==='none'||cs.visibility==='hidden'||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)return "";return e.textContent.replace(/\s+/g," ").trim()});
  const PLQ=(root,n)=>`[...document.querySelectorAll(${JSON.stringify(root+' .kpk .kpk-b')})].find(b=>b.textContent.includes(${JSON.stringify(n)}))`;
  const awayTap=async()=>{/* a tap on empty sky (top-left of the page, away from plaques) closes the pop-up and drops the lift */await tapAt(8,Math.round(H*.5))};
  /* one family: the closed plaque «… vừa» by a tap on its body, then by its «!»; the open plaque «… nhẹ» two-tap */
  const family=async(nm,root,pickedJs,opt)=>{opt=opt||{};const r={};for(let w=0;w<30&&!(await p.evaluate(js=>!!eval(js),PLQ(root,'Khiêu khích · vừa')));w++)await sleep(200);
   /* a player taps once the plaques have dropped in and settled */for(let w=0;w<30&&await p.evaluate(rt=>!!document.querySelector(rt+' .kpk .kpk-n.kpk-drop'),root||'body');w++)await sleep(150);await sleep(200);
   r.closed=await p.evaluate(js=>{const e=eval(js);return e?{off:e.classList.contains('kfoc-off'),bang:!!e.querySelector('.kfoc-i')}:null},PLQ(root,'Khiêu khích · vừa'));
   if(!r.closed){r.ok=false;return r}
   const t1=await tapEl(PLQ(root,'Khiêu khích · vừa'));await sleep(250);r.tapHit=t1.hit;r.tapHn=t1.hn;r.popTap=await pop();await p.screenshot({path:`${OUT}/${wh}-${nm}-tap.jpg`,type:'jpeg',quality:60});
   await awayTap();r.popAfterAway=await pop();
   const t2=await tapEl(PLQ(root,'Khiêu khích · vừa')+'.querySelector(".kfoc-i")');await sleep(250);r.bangHit=t2.hit;r.popBang=await pop();await p.screenshot({path:`${OUT}/${wh}-${nm}-bang.jpg`,type:'jpeg',quality:60});
   await awayTap();
   r.reason=/chưa có cớ/.test(r.popTap)&&/chưa có cớ/.test(r.popBang)&&!r.popAfterAway;
   if(opt.two){/* two-tap of the open plaque: 1st = lift + ✓, nothing chosen; 2nd = chosen */
    await tapEl(PLQ(root,'Khiêu khích · nhẹ'));await sleep(300);r.lift=await p.evaluate(js=>{const e=eval(js);const n=e&&e.closest('.kpk-n');const c=n&&n.parentElement.querySelector(':scope>.khconf');return {up:!!n&&n.classList.contains('kpk-up'),tick:!!c&&!c.hidden}},PLQ(root,'Khiêu khích · nhẹ'));
    r.chosen1=await p.evaluate(pickedJs);await tapEl(PLQ(root,'Khiêu khích · nhẹ'));await sleep(400);r.chosen2=await p.evaluate(pickedJs);
    r.two=r.lift.up&&r.lift.tick&&!r.chosen1&&r.chosen2==='n'}else r.two=true;
   r.ok=!!(r.closed.off&&r.closed.bang&&r.tapHit&&r.bangHit&&r.reason&&r.two);return r};
  /* RING: real tap on the bright front slot → focus (her real acts drop) → the jone door tier card through the ring adapter (DF.F.choices) */
  {const f=await p.evaluate(()=>{const R=kitRing.cur;const s=R&&R.slots[kitRing.front()];if(!s)return null;const b=s.getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height*.45}});
   if(f){await tapAt(f.x,f.y);for(let w=0;w<30&&!(await p.evaluate(()=>!!(kitRing.cur&&kitRing.cur.F&&document.querySelector('.kring .kpk,.kpk'))));w++)await sleep(200)}
   const ok=await p.evaluate(()=>{const R=kitRing.cur;if(!R||!R.F)return false;window.__pk=null;R.F.choices([{id:'n',n:'Khiêu khích · nhẹ',word:'Có cơ',ton:'1 khắc'},{id:'v',n:'Khiêu khích · vừa',off:true,why:'chưa có cớ'},{id:'h',n:'Khiêu khích · nặng',off:true,why:'chưa có cớ'}],id=>{window.__pk=id});return true});
   res.ring=ok?await family('ring','',`window.__pk`,{two:true}):{ok:false,why:'no ring focus'};
   res.ring.host=await p.evaluate(()=>{const k=document.querySelector('.kpk');return k&&k.parentElement?k.parentElement.className.toString().slice(0,40):''});
   await p.evaluate(()=>{try{kitRing.close(true)}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});await sleep(800)}
  /* FOCUS: kitFocus.open on a stage figure with the closed act */
  {await p.evaluate(()=>{window.__pk=null;const im=[...document.querySelectorAll('#tokens .tok img')].find(i=>i.getClientRects().length)||null;const p0=curPeople().find(x=>x.ref)||{};
    window.__F=kitFocus.open({p:p0.ref||null,fig:im,groups:[{k:'a',n:'Việc',acts:[{id:'n',n:'Khiêu khích · nhẹ',word:'Có cơ',ton:'1 khắc'},{id:'v',n:'Khiêu khích · vừa',off:true,why:'chưa có cớ'},{id:'h',n:'Khiêu khích · nặng',off:true,why:'chưa có cớ'}]}],onAct:id=>{window.__pk=id}})});await sleep(1500);
   res.focus=await family('focus','.kfoc',`window.__pk`,{two:true});await p.evaluate(()=>{try{window.__F.destroy()}catch(e){}});await sleep(500)}
  /* STAGE: a talk card (kitStage) whose answer is closed; her real taps on the speech box step the lines, then the answers hang */
  {await p.evaluate(()=>{Q.length=0;Q.push({talk:1,h:"Thử",t:"Nàng định làm gì?",opts:[{n:"Khiêu khích · nhẹ",x:"Có cơ",go(){window.__pk='n'}},{n:"Khiêu khích · vừa",x:"",off:{why:"chưa có cớ"}}]});render()});await sleep(1500);
   for(let k=0;k<8&&!(await p.$('#modal .kpk .kpk-b'));k++){const s=await p.evaluate(()=>{const e=document.querySelector('#modal .dlg .kpmain')||document.querySelector('#modal .dlg');const b=e.getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+Math.min(b.height-6,24)}});await tapAt(s.x,s.y);await sleep(300)}
   res.stage=await family('stage','#modal',`window.__pk`,{});res.stage.dlg=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg');return d?d.className.toString().slice(0,60):''});
   await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{kitPick.destroy()}catch(e){}render()});await sleep(800)}
  /* BARE: any other host, no onOff (as jkpcard entry on #stage) */
  {await p.evaluate(()=>{window.__pk=null;try{kitRing.close(true)}catch(e){}const st=document.getElementById('stage');kitPick.open({host:st,acts:[{id:'n',n:'Khiêu khích · nhẹ',word:'Có cơ',ton:'1 khắc'},{id:'v',n:'Khiêu khích · vừa',off:true,why:'chưa có cớ'}],dismiss:false,onPick:id=>{window.__pk=id}})});await sleep(1300);
   res.bare=await family('bare','#stage',`window.__pk`,{two:true});await p.evaluate(()=>{try{kitPick.destroy()}catch(e){}})}
  res.errs=errs;res.hs=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  for(const k of ['ring','focus','stage','bare']){const r=res[k];console.log(wh,k.padEnd(5),r&&r.ok?'PASS':'FAIL',JSON.stringify({tap:r&&r.popTap,bang:r&&r.popBang,two:r&&r.two,lift:r&&r.lift,c1:r&&r.chosen1,c2:r&&r.chosen2,closed:r&&r.closed,hit:[r&&r.tapHit,r&&r.bangHit,r&&r.tapHn],host:r&&(r.host||r.dlg)}));if(!r||!r.ok)fail++}
  console.log(wh,'page errors',errs.length,errs.slice(0,3).join(' | '));if(errs.length)fail++;ALL[wh]=res;await ctx.close()}
 fs.writeFileSync(`${OUT}/kit-ring-why.json`,JSON.stringify(ALL,null,1));await b.close();
 if(process.env.KMUT==='1')try{fs.unlinkSync(FILE)}catch(e){}
 console.log(fail?`FAIL (${fail})`:'PASS',process.env.KMUT==='1'?'[KMUT=1 old binding]':'');process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
