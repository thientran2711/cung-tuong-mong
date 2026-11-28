/* K-HINT-KEM census (kit keeper KK73 28/11; RV-189 FAIL-HOLD on TMK-WARN-5, law 9 / 11 / 3): the whole group of ROLLED hint-mode option cards
   (no Thành/Được row of their own → jopic kitOptFinal builds Thành / Bại from the hint) whose hint carries «nhưng …».
   The kit rule (KIT.md §6.2b ROWS): the «nhưng …» part = what comes WITH the deed (jk2b kitHint's kèm / side losses) → its own red Kèm row;
   Bại keeps ONLY the «hỏng thì …» part; Thành holds none of it. A SURE card is unchanged («nhưng …» = its Mất row).
   Walks: every place × every person there × every door kind (DOOR.T, PEND.door) + every PEND card that builds with no params; lists each
   rolled option whose kitHint carries «nhưng»; opens each such card (doorOpen / pushDil) and reads the visible plaque rows in the DOM.
   Census table on stdout (CENSUS lines), plus the kit hook window.__kitKem (every Kèm row kitOptFinal made).
   usage: node dev/test/kit-hint-kem.js [site index.html (root, built)] [WxH]     KMUT=1 → the Kèm chips are put back into Bại after the kit ran (the pre-fix look) → must FAIL; KMUT=flat → jk2b kitRowsLine off (the pre-K-DOLA-HINT flattened hint) → must FAIL */
const {chromium}=require('playwright');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv[2]||require('path').join(__dirname,'..','..','index.html');const URL=/^(file|https?):/.test(A)?A:'file://'+require('path').resolve(A);const KMUT=process.env.KMUT==="1",KFLAT=process.env.KMUT==="flat";
const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 const BOOT=async()=>{
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;start();quiet=false});
 for(let k=0;k<12;k++){const n=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden||!Q.length)return 0;const B=[...M.querySelectorAll('button')].filter(b=>/Nhận thân phận|Vào cung ngay|Tiếp|Đóng|Thôi|Được/.test(b.textContent));if(B[0]){B[0].click();return 1}return 2});if(!n)break;await sleep(700)}
 if(KFLAT)await p.evaluate(()=>{kitRowsLine=r=>r});
 };await BOOT();
 /* 1. data census: which (card source, option) is rolled + carries «nhưng» in its hint */
 const LIST=PH=>p.evaluate(PH=>{const out=[];const rowsX=window.__rowsX=window.__rowsX||[];const NH=/(^|;\s*|\s)nhưng\s/;const hintOf=o=>{try{return String(kitHint(o,null).hint||"")}catch(e){return""}};
  const rolled=o=>{try{return !!(kitOptModel(o).odds)}catch(e){return false}};
  const scan=(src,d,open)=>{if(!d||!Array.isArray(d.o))return;d.o.forEach(o=>{try{if(o&&/class="kb/.test(String(typeof dilLineRaw==="function"?dilLineRaw(o):o.x)))rowsX.push(`${src} | ${String(o.n).slice(0,40)} | ${hintOf(o).slice(0,120)}`)}catch(e){}});const hit=d.o.filter(o=>o&&o.n&&!/^Thôi/.test(o.n)&&NH.test(hintOf(o))/* rolled or not is read on the card itself (.kodds): a door option's odds sit in its built x */).map(o=>({n:String(o.n).slice(0,40),h:hintOf(o).slice(0,140)}));if(hit.length)out.push({src,hit,open})};
  try{Q.length=0;document.getElementById('modal').hidden=true;if(typeof covSaw==="function")covSaw=()=>["x"]/* her maid saw a deed: the «Xử nhân chứng» door is in the census (as tmk-warn-witcard) */}catch(e){}
  if(PH==="door"){let PL=[];const seen=new Set();try{PL=(places()||[]).map(x=>x.k)}catch(e){}
  for(const pl of ["home"].concat(PL)){try{goTo(pl);render()}catch(e){continue}const P=(typeof curPeople==="function"&&curPeople())||[];
   for(let i=0;i<P.length;i++)for(const r of (DOOR.T||[])){let d=null;try{d=PEND.door({i,k:r.k})}catch(e){}{const nm=(P[i]&&(P[i].name||P[i].kind))||"";const key=r.k+"|"+nm;if(seen.has(key))continue;seen.add(key);scan(`door ${r.k} @${pl} #${i} ${nm}`,d,{door:1,pl,i,k:r.k})}/* one open per door kind × person (the same person stands in many places) */}}
  try{goTo("home");render()}catch(e){}}
  else for(const k of Object.keys(PEND)){if(k==="door")continue;let d=null;try{d=PEND[k]({})}catch(e){}scan(`PEND.${k}`,d,{pend:k})}
  return out},PH);
 const L=[];const skip=[];let cards=0,kemRows=0;const out=[];const ok=(c,m)=>out.push([!!c,m]);
 for(const PH of ["door","pend"]){let LL=await LIST(PH);const hasWit=X=>X.some(x=>/^door wit /.test(x.src));for(let t=0;PH==="door"&&!hasWit(LL)&&t<8;t++){await BOOT();await p.evaluate(()=>{window.__rowsX=[]});LL=await LIST(PH)}/* a life with no witness door yet (or not in the palace yet): boot again (as tmk-warn-witcard) — the wit tiers are the known members of the group */L.push(...LL);
 for(const s of LL)for(const h of s.hit)console.log(`CENSUS ${s.src} | ${h.n} | ${h.h}`);
 /* 2. open each card and read the visible plaque rows */
 for(const s of LL){
  const opened=await p.evaluate(({o,KMUT})=>{try{Q.length=0;const M=document.getElementById('modal');M.hidden=true;
   if(o.door){goTo(o.pl);render();const P=curPeople();if(!P[o.i])return false;doorOpen(P[o.i],o.k)}else{const d=mkP(o.pend,{});if(!d)return false;pushDil(d,"Chọn việc");showQ()}
   if(KMUT)setTimeout(()=>{document.querySelectorAll('#modal button.ka.kopt').forEach(b=>{const k=b.querySelector('.kb > .kr-kem');const f=b.querySelector('.kb > .kr-bai');if(k&&f){f.querySelector('.krv').append(...k.querySelectorAll('.krv .ef'));k.remove()}})},900);
   return true}catch(e){return false}},{o:s.open,KMUT});
  if(!opened){ok(true,`${s.src}: does not open in this state (data only)`);continue}
  await sleep(2500);
  if(await p.evaluate(()=>document.getElementById('modal').hidden)){await p.evaluate(()=>{try{showQ()}catch(e){}});await sleep(1500)}
  const R=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return null;const NH=/\s*;\s*nhưng\s+|\s+nhưng\s+/;const res=[];
   for(const b of M.querySelectorAll('button.ka.kopt')){const rolled=!!b.querySelector('.kat .kodds,:scope > .kaart .kodb');const hr=b.querySelector('.kb > .kr-hint');const ht=hr?(hr.querySelector('.krv')||hr).textContent.trim():"";
    const th=b.querySelector('.kb > .kr-thanh');if(!rolled||!th||!th.classList.contains('kfill')||!NH.test(ht))continue;/* hint-mode rolled card only */
    const parts=ht.split(NH).slice(1).map(x=>x.split(/\s*;\s*(?=hỏng thì\s)/)[0].trim()).filter(Boolean);
    const vis=r=>r&&!r.classList.contains('kofold');const txt=r=>r?[...r.querySelectorAll('.krv .ef')].map(e=>e.textContent.trim()).join("; "):"";
    const ke=b.querySelector('.kb > .kr-kem.kdup'),ba=b.querySelector('.kb > .kr-bai');
    res.push({t:(b.querySelector('.kan,b')||b).textContent.trim().slice(0,40),parts,kem:vis(ke)?txt(ke):null,kemRed:!!(ke&&ke.querySelector('.ef.r')),bai:vis(ba)?txt(ba):"",thanh:txt(th)})}
   return res});
  if(!R){skip.push(s.src);console.log(`SKIP ${s.src}: no modal after doorOpen / pushDil (opens a scene, or needs params) — listed, not read`);continue}
  for(const c of R){cards++;if(c.kem!=null)kemRows++;
   ok(!/(Tốn|Thành|Bại|Kèm|Gợi ý)[^\s:·,;)]/.test(c.thanh+" "+(c.kem||"")+" "+c.bai),`${s.src} «${c.t}»: no glued row label in Thành / Kèm / Bại (K-DOLA-HINT: a prebuilt kit card in o.x is read back by jk2b kitRowsLine, never flattened) «${(c.thanh+" | "+(c.kem||"")).slice(0,90)}»`);
   ok(c.kem!=null&&c.kemRed&&c.parts.every(x=>c.kem.includes(x)),`${s.src} «${c.t}»: Kèm «${c.kem}» holds the «nhưng» part «${c.parts.join("; ")}»`);
   ok(!c.parts.some(x=>c.bai.includes(x)),`${s.src} «${c.t}»: Bại «${c.bai}» = only «hỏng thì …»`);
   ok(!c.parts.some(x=>c.thanh.includes(x)),`${s.src} «${c.t}»: Thành «${c.thanh}» holds no «nhưng» part`)}
  await p.evaluate(()=>{try{Q.length=0;document.getElementById('modal').hidden=true}catch(e){}})}}
 const hook=await p.evaluate(()=>(window.__kitKem||[]).length);const RX=await p.evaluate(()=>[...new Set(window.__rowsX||[])]);RX.forEach(x=>{console.log(`CENSUS-ROWSX ${x}`);const h=x.split(" | ").slice(2).join(" | ");ok(h&&!/(Tốn|Thành|Bại|Kèm|Ghi chú|Gợi ý)[^\s:·,;)]|^(Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững)\S/.test(h),`prebuilt-card option ${x.split(" | ").slice(0,2).join(" | ")}: kitHint «${h.slice(0,80)}» has no glued row label (K-DOLA-HINT)`)});
 ok(cards>0,`census found ${L.length} card sources, ${cards} rolled hint-mode «nhưng» cards opened, ${kemRows} with a Kèm row, kit hook __kitKem ${hook}`);
 let f=0;for(const [c,m] of out){if(!c||process.env.V)console.log((c?'PASS ':'FAIL ')+m);if(!c)f++}if(errs.length){console.log('PAGE ERRORS',errs.slice(0,5));f++}
 console.log(`KIT-HINT-KEM ${W}x${H}${KMUT?" (KMUT)":KFLAT?" (KMUT=flat)":""}: ${out.length-f}/${out.length}${f?' FAIL':' ALL OK'} · sources ${L.length} · cards ${cards} · Kèm ${kemRows} · skipped ${skip.length} · prebuilt-card lines ${RX.length}`);await b.close();process.exit(f?1:0)})();
