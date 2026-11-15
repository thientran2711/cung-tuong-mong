/* LUẬT SỬA CẢ NHÓM scan for "Điều kiện sắc phong names the wrong next rank" (review/promo-exam):
   for every rank 0..6 and the special states (lãnh cung, cấm túc), read every surface that NAMES the next rank and check it against
   the rank the header shows + 1: Mệnh truyện › Sắc phong card name, every requirement row that names a rank (Ghế …, Khảo hạch …),
   the Sủng/Danh thresholds (must be RANKS[next].s/.d), the Hậu cung rank board line "Lên …", and the exam plan's target.
   usage: node dev/test/promo-next-rank.js <url> [W]x[H]   -> JSON table, exit 1 on any mismatch */
const {chromium}=require('playwright');const URL=process.argv[2];const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof promoReqP==='function',null,{timeout:90000});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  const RN=r=>r>=7?"Hoàng hậu":RANKS[r].n;const out=[];
  const states=[0,1,2,3,4,5,6].map(r=>({r,k:"rank "+r})).concat([{r:4,k:"cấm túc (Phi)",conf:2},{r:4,k:"lãnh cung (từ Phi)",cold:1}]);
  for(const st of states){S.out=0;S.confined=0;S.rank=st.r;if(st.conf)S.confined=st.conf;if(st.cold){S.coldRank=st.r;S.out=1;S.rank=0}delete S.ex;
   tab='story';render();const sb=document.querySelector('#panel [data-ktsv="rank"]');if(sb)sb.click();
   const P=document.getElementById('panel');const card=P.querySelector('.kskill[data-skill^="rank-"]');
   const head=(document.querySelector('#hud .kname .kti,#hud .rk,#hdr .kti')||{}).textContent||RN(S.rank);
   const hdrRank=S.out?"Phế phi":RN(S.rank);const want=S.out?null:RN(S.rank+1);
   const cardName=card?(card.querySelector('.kskn,.ksk-name,h3,b')||{}).textContent:null;
   const rows=promoReqP(S).map(x=>x[1]);const bad=[];
   const named=card?card.textContent:"";
   if(S.out){if(card&&/Điều kiện sắc phong/.test(named))bad.push("cold palace shows a promotion card: "+named.slice(0,60))}
   else{if(!card||!named.includes(want))bad.push(`card names "${(named||"").slice(0,50)}" want ${want}`);
    for(const t of rows){const mm=t.match(/^(?:Ghế|Chờ ghế trống \(|Khảo hạch tấn phong) ?([^:(]+?)(?: \d+\/\d+|:|\))/);if(mm&&!/^(Đã|Khảo hạch tấn phong:)/.test(t)){const nm=mm[1].trim();if(nm&&nm!==want&&RANKS.some(x=>x.n===nm))bad.push(`row "${t}" names ${nm}`)}
     const s=t.match(/^Sủng \d+ \(cần (\d+)\)/);if(s&&+s[1]!==RANKS[S.rank+1].s)bad.push(`row "${t}" threshold ≠ ${RANKS[S.rank+1].s}`);
     const d=t.match(/^Danh \d+ \(cần (\d+)\)/);if(d&&+d[1]!==RANKS[S.rank+1].d)bad.push(`row "${t}" threshold ≠ ${RANKS[S.rank+1].d}`)}
    if(typeof exPlan==="function"){const pl=exPlan(S);if(pl.to!==S.rank+1)bad.push(`exam target ${RN(pl.to)} want ${want}`)}
    try{const rb=rankBoard();const mm=rb.match(/Ngươi<\/b>[\s\S]*?Lên ([^:]+):/);if(mm&&mm[1].trim()!==want)bad.push(`rank board "Lên ${mm[1]}" want ${want}`)}catch(e){}}
   out.push({state:st.k,header:hdrRank,next:want,card:card?named.replace(/\s+/g," ").slice(0,60):null,bad})}
  S.out=0;S.confined=0;return out});
 let n=0;for(const x of R){n+=x.bad.length;console.log(`${x.state.padEnd(20)} header=${String(x.header).padEnd(14)} next=${String(x.next).padEnd(14)} ${x.bad.length?'BAD: '+x.bad.join(' | '):'ok'}`)}
 console.log('errors',errs.length?errs:'none');await b.close();process.exit(n||errs.length?1:0)})();
