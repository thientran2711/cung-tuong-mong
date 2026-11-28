/* ACCEPTANCE TEST FOR K-HINT-KEM (kit keeper, KIT_REQUESTS): it FAILS until the kit split «nhưng …» → Kèm on a rolled hint card lands; covHint is ready.
   TMK-WARN-5 (RV-189 FAIL item; laws 3 / 4 / 11): the OPENED «Xử nhân chứng» door card (jdoor doorOpen → PEND.door k:"wit", jone tier plaques,
   hidden-outcome card: the kit reads each plaque from the row's hint, jcover covHint → jopic kitOptFinal) shows, on all three tiers, Thành = the
   success only (no loss in it), Bại = only what failure adds, Kèm = what comes with the deed: nhẹ / nặng the deed's Đức (either way, written after
   Bại), vừa the bạc + Đức paid only when she accepts (written under Thành). Every number = the BAL value through the kit marks (no typed number).
   Reads the PLAQUE ROWS in the DOM (not x, not the hint string). Real game functions; only covSaw is stubbed (her maid saw a deed).
   usage: node dev/test/tmk-warn-witcard.js [index.html] [WxH]   MUTATE=oldhint (the pre-fix covHint) | nokem (kit: «nhưng» back into Bại) → must FAIL */
const {chromium}=require('playwright');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv[2]||require('path').join(__dirname,'..','index.html');const URL=/^(file|https?):/.test(A)?A:'file://'+require('path').resolve(A);const MUT=process.env.MUTATE||"";
const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 let who=null;for(let boot=0;boot<8&&!who;boot++){
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;start();quiet=false});
 for(let k=0;k<12;k++){const n=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden||!Q.length)return 0;const B=[...M.querySelectorAll('button')].filter(b=>/Nhận thân phận|Vào cung ngay|Tiếp|Đóng|Thôi|Được/.test(b.textContent));if(B[0]){B[0].click();return 1}return 2});if(!n)break;await sleep(700)}
 who=await p.evaluate((MUT)=>{try{Q.length=0;document.getElementById('modal').hidden=true;covSaw=()=>["x"];
  if(MUT==="oldhint")covHint=function(x,id){const wn=covWho(covPerson(id))||"người ấy";if(x==="nhe")return `${wn} sợ hãi, câm lặng; nhưng mang tiếng thất đức (chút ít); hỏng thì ${wn} càng ghét ta`;if(x==="vua")return `${wn} nhận ${covWitBac(S,id)} lượng bạc, câm lặng; nhưng mang tiếng thất đức (chút ít); hỏng thì ${wn} từ chối, ta không mất bạc`;return `${wn} không còn trên đời; nhưng mang tiếng thất đức (nhiều); hỏng thì bị lộ: mất thể diện (nhiều), ${wn} biết kẻ chủ mưu`};
  if(MUT==="nokem"){const h0=covHint;covHint=function(){return String(h0.apply(this,arguments)).replace(/; nhưng ([^;]*)(; hỏng thì )?([^;]*)?$/,(m,k,h,f)=>h?`; hỏng thì ${k}, ${f}`:`, ${k}`)}}
  let PL=[];try{PL=(places()||[]).map(x=>x.k)}catch(e){}for(const pl of ["home"].concat(PL)){try{goTo(pl)}catch(e){continue}render();const P=curPeople()||[];
   for(let i=0;i<P.length;i++){let c=null;try{c=PEND.door({i,k:"wit"})}catch(e){}if(c&&c.o&&c.o.filter(o=>o.go).length===3){window.__W=i;doorOpen(P[i],"wit");return {pl,kind:P[i].kind,boot:0}}}}}catch(e){}return null},MUT)}
 const out=[];const ok=(c,m)=>out.push([!!c,m]);ok(who,`a witness with the «Xử nhân chứng» door (${JSON.stringify(who)})`);
 if(who){await sleep(2500);
  const R=await p.evaluate(()=>{const V=covB(),mk=t=>markTxt(t);const id=covWitId(curPeople()[__W]);const M=document.getElementById('modal');const L={};
   for(const btn of M.querySelectorAll('button')){const t=(btn.querySelector('.kan,b')||btn).textContent;const k=/Đe dọa bịt miệng/.test(t)?"nhe":/Mua chuộc nhân chứng/.test(t)?"vua":/Thủ tiêu nhân chứng/.test(t)?"nang":null;if(!k)continue;
    const rr=[...btn.querySelectorAll('.kb > .kr')].filter(r=>!r.classList.contains('kofold')).map(r=>({l:((r.querySelector('.krl')||{}).textContent||"").trim(),v:[...r.querySelectorAll('.krv .ef')].map(e=>e.textContent.trim()).join(" | "),red:[...r.querySelectorAll('.krv .ef')].some(e=>e.classList.contains('r'))}));if(rr.length&&!L[k])L[k]=rr}
   return {L,hidden:M.hidden,exp:{nhe:mk(`Đức ${balSg(V.duc.nhe)}`),vua:mk(`Bạc ${balSg(-covWitBac(S,id))}, Đức ${balSg(V.duc[covTier("wbribe")])}`),nang:mk(`Đức ${balSg(V.duc[covTier("wkill")])}`),danh:mk(`Danh ${balSg(V.danh[covTier("wkill")])}`)}}});
  ok(!R.hidden,"the door card is open");const LOSS=/Đức|Bạc|Danh|thất đức|thể diện|ghét|lộ|từ chối/;
  for(const k of ["nhe","vua","nang"]){const rows=R.L[k]||[];const lab=rows.map(r=>r.l);const g=n=>rows.find(r=>r.l===n);const th=g("Thành"),ba=g("Bại"),ke=g("Kèm");
   ok(rows.length,`${k}: plaque rows ${lab.join(" · ")}`);
   ok(th&&!th.red&&!LOSS.test(th.v),`${k}: Thành = the success only «${th&&th.v}»`);
   ok(ke&&ke.v===R.exp[k],`${k}: Kèm «${ke&&ke.v}» = BAL «${R.exp[k]}»`);
   ok(ba&&!/Đức|thất đức/.test(ba.v),`${k}: Bại = only what failure adds «${ba&&ba.v}»`);
   const ik=lab.indexOf("Kèm"),ib=lab.indexOf("Bại"),it=lab.indexOf("Thành");
   ok(k==="vua"?(it<ik&&ik<ib):(ib>=0&&ib<ik),`${k}: Kèm ${k==="vua"?"under Thành (paid only when she accepts)":"after Bại (either way)"}: ${lab.join(" · ")}`)}
  {const ba=(R.L.vua||[]).find(r=>r.l==="Bại");ok(ba&&/không mất bạc/.test(ba.v),"vừa: Bại = she refuses, no bạc lost")}
  {const ba=(R.L.nang||[]).find(r=>r.l==="Bại");ok(ba&&ba.v.includes(R.exp.danh)&&/biết kẻ chủ mưu/.test(ba.v),`nặng: Bại = ${R.exp.danh} + the witness knows`)}
 }
 let f=0;for(const [c,m] of out){console.log((c?'PASS ':'FAIL ')+m);if(!c)f++}if(errs.length){console.log('PAGE ERRORS',errs.slice(0,5));f++}
 console.log(`TMK-WARN WITCARD ${W}x${H}${MUT?" (MUTATE="+MUT+")":""}: ${out.length-f}/${out.length}${f?' FAIL':' PASS'}`);await b.close();process.exit(f?1:0)})();
