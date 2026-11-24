/* review/entry-exam: every origin, "Vào cung ngay": new life → Tiền truyện (origin painting) → Tuyển chọn card (no word game offered) →
   the exam frame (kg82, rows Giám khảo / Môn thi / Độ khó / Xét thêm / odds words) → play or "Để tài nghệ quyết định" → rank within
   [ceiling−2, ceiling] (cnv: palace maid) → "Nhập cung" card → its button → entry scene (kitPersonReveal, ONE button) closes only by it.
   usage: node direct.js <url> [WxH] [shotdir|-] [origins,comma] */
const {chromium}=require('playwright');const URL=process.argv[2];const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);const SH=process.argv[4]&&process.argv[4]!=='-'?process.argv[4]:'';
const OR=(process.argv[5]||'tt,dtq,muoi,cn,nc,thd,ch,td,cnv').split(',');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const out=[];let bad=0;
 for(const o of OR){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());/* card-flip scenes left over from rolling many lives (start() loop) */document.querySelectorAll('.kmov.kcf').forEach(o=>{const b=o.querySelector('.kmend,button');if(b)b.click();else o.click()})},300)});
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3000);
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  await p.evaluate(og=>{for(let i=0;i<400&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}},o);await sleep(500);await skip();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="cung"]');if(b)b.click()});await sleep(600);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>document.querySelector('#modal button[data-nl="ok"]').click());await sleep(1200);
  const R={o};const f=[];
  R.q0=await p.evaluate(()=>Q.map(m=>m.t));
  R.intro=await p.evaluate(()=>{const m=Q[0];return m&&(m.entI||m.oiP)?{t:m.t,art:m.art,btn:document.getElementById('mclose')&&document.getElementById('mclose').textContent}:null});
  if(!R.intro)f.push('no intro');else{if(SH)await p.screenshot({path:`${SH}/intro-${o}-${W}.jpg`,type:'jpeg',quality:55});for(let i=0;i<6&&await p.evaluate(()=>{const m=Q[0];return !!(m&&(m.entI||m.oiP))});i++){await p.evaluate(()=>document.getElementById('mclose').click());await sleep(700)}}
  /* SELSCENE-8 (RV-SELX FAIL 2; owner OD 24/11 ~07:05Z three playable days, ~06:15Z contest of 12 → top 4, ~05:40Z ban hoa ends the life): a NEW tú nữ
     life (not cnv / cn / hòa thân) opens DAY 1 «Ngày thứ nhất — Nhập cung» in place of the one kc2Sel card. The days are played card by card (first
     open option, like a player who takes the first road; the scene dressing off — it only dresses the same cards); Hoàng thượng's test on day 2 is the
     same kc2Sel card → the exam frame checks below; then the days run on to the edict (kept) or ban hoa (the life ends). */
  const days=await p.evaluate(()=>{const m=Q[0];return !!(m&&/^Ngày thứ nhất — Nhập cung/.test(m.t||'')&&S.selx2&&S.selx2.days===1)});R.days=days;
  const dayRun=async()=>{for(let i=0;i<600;i++){const r=await p.evaluate(()=>{window.__selxNoSc=1;document.querySelectorAll('#kpod,.kpod').forEach(x=>x.remove());
     if(S.dead||!(typeof selxDaysOn==='function'&&selxDaysOn()))return 'end';const m=Q[0];if(!m)return 'wait';if(m.pid==='kc2Sel')return 'sel';
     if(m.opts&&m.opts.length){const i=m.opts.findIndex(c=>!c.off&&!c.selxMap);chooseM(Math.max(0,i))}else closeModal();return 'go'});
    if(r==='end'||r==='sel')return r;if(r==='wait')await sleep(300)}return 'stuck'};
  if(days){const r=await dayRun();R.dayStop=r;if(r==='stuck')f.push('days stuck')}
  const sel=await p.evaluate(()=>{const m=Q[0];if(!m||m.pid!=='kc2Sel')return null;return m.opts.map(x=>x.n)});R.opts=sel;
  if(!sel&&!(days&&R.dayStop==='end'&&false))f.push('no selection card');else if(sel){
   /* pick the first art option (a real game) → the exam frame (the days' card puts «Cúi đầu chờ xét» first: take the first art one) */
   await p.evaluate(()=>{const m=Q[0];const i=m.opts.findIndex(x=>!/^Cúi đầu chờ xét/.test(x.n||''));chooseM(Math.max(0,i))});await sleep(1500);
   const fr=await p.evaluate(()=>{const d=document.getElementById('kg82');if(!d)return null;const t=d.innerText;const ov=d.scrollWidth>d.clientWidth+2;return{t:t.slice(0,700),ov,kind:KG82.tier&&KG82.tier.occ,word:KG82.tier&&KG82.tier.word}});
   R.frame=fr;if(!fr)f.push('no exam frame');else{if(!/Giám khảo/i.test(fr.t)||!/Độ khó/i.test(fr.t))f.push('frame rows');if(fr.kind!=='tuyen')f.push('tier occ '+fr.kind);
    if(/\d+\s*%/.test(fr.t))f.push('percent shown');if(SH)await p.screenshot({path:`${SH}/exam-${o}-${W}.jpg`,type:'jpeg',quality:55});
    const word=await p.evaluate(()=>{const W=BAL.entry.word;const m=document.querySelector('#kg82 .kgame,#kg82');return W.some(k=>KG82_KIND[k]&&m.innerText.includes(KG82_KIND[k].n+' · '))});if(word)f.push('word game offered');
    /* real play for 2 origins, skip for the rest */
    if(o==='tt'||o==='cnv'){await p.evaluate(()=>document.getElementById('kg82go').click());for(let i=0;i<120&&await p.evaluate(()=>!document.getElementById('kg82ok'));i++)await sleep(1000)}
    else await p.evaluate(()=>document.getElementById('kg82skip').click());
    await sleep(500);R.res=await p.evaluate(()=>{const d=document.getElementById('kg82');return d?d.innerText.slice(0,200):''});
    await p.evaluate(()=>{const b=document.getElementById('kg82ok');if(b)b.click()});await sleep(1200)}
   if(days){const r=await dayRun();R.dayEnd=r;if(r!=='end')f.push('days did not end: '+r)}}
  const st=await p.evaluate(()=>({top:S.origin.r||0,rank:S.rank,srv:!!S.srv,sel:S.selx,q:Q.map(m=>m.t),danh:S.danh,sung:S.sung,gloom:!!document.querySelector('.km-gloom')}));Object.assign(R,st);
  /* SELSCENE (review/selection-scene, MAIN 117 Q7): a NEW life (S.selx2) runs the contest: kept → origin −1 / 0 / +1 within the cap (Tần, hòa thân Phi),
     or ban hoa (the life ends; the entry-scene checks below do not apply). An OLD save (no S.selx2) keeps the old check [ceiling−2, ceiling]. */
  const nw=await p.evaluate(()=>!!S.selx2);const capR=await p.evaluate(()=>typeof selxTop==='function'?selxTop():0);R.newRule=nw;R.ban=await p.evaluate(()=>!!S.dead);
  if(o==='cnv'){if(!st.srv)f.push('not a maid')}else if(nw){if(R.ban){if(!/ban hoa/i.test(await p.evaluate(()=>S.fate||'')))f.push('dead without ban hoa')}else if(!(st.rank>=Math.max(0,st.top-1)&&st.rank<=Math.max(st.top,capR)))f.push('rank '+st.rank)}
  else if(!(st.rank<=st.top&&st.rank>=Math.max(0,st.top-2)))f.push('rank '+st.rank);
  if(R.ban){R.fail=f;R.errs=errs.slice(0,3);if(f.length||errs.length)bad++;out.push(R);await c.close();continue}
  if(st.gloom)f.push('demotion scene at entry');
  /* close cards up to Nhập cung, then its button → entry scene */
  for(let i=0;i<8;i++){const t=await p.evaluate(()=>Q[0]&&Q[0].t);if(!t)break;if(/^Nhập cung/.test(t)){R.card=await p.evaluate(()=>({btn:(document.getElementById('mclose')||{}).textContent,h:String(Q[0].h).replace(/<[^>]+>/g,'').slice(0,240)}));
    await p.evaluate(()=>document.getElementById('mclose').click());break}
   await p.evaluate(()=>{const m=Q[0];if(m.opts)chooseM(0);else document.getElementById('mclose').click()});await sleep(500)}
  for(let i=0;i<12&&!await p.evaluate(()=>!!document.getElementById('kprevov'));i++)await sleep(500);
  const rv=await p.evaluate(()=>{const o=document.getElementById('kprevov');if(!o)return {none:1,kmq:KMQ.length,busy:kmBusy,ov:[...document.querySelectorAll('.kmov')].map(x=>x.className),entIn:S.entIn,q:Q.map(m=>m.t)};const bs=[...o.querySelectorAll('button')].filter(x=>x.offsetParent);return{n:bs.length,b:bs.map(x=>x.textContent),t:o.innerText.slice(0,200)}});R.reveal=rv;
  if(!rv||rv.none)f.push('no entry scene');else{if(rv.n!==1)f.push('scene buttons '+rv.n);await sleep(2500);if(SH)await p.screenshot({path:`${SH}/enter-${o}-${W}.jpg`,type:'jpeg',quality:55});
   await p.mouse.click(10,10);await sleep(500);if(!await p.evaluate(()=>!!document.getElementById('kprevov')))f.push('scene closed by outside tap');
   await p.evaluate(()=>document.querySelector('#kprevov button').click());await sleep(800);if(await p.evaluate(()=>!!document.getElementById('kprevov')))f.push('scene not closed by button')}
  if(errs.length)f.push('errors');R.fail=f;R.errs=errs.slice(0,3);if(f.length)bad++;out.push(R);await c.close()}
 console.log(JSON.stringify(out,null,1));console.log(bad?`FAIL ${bad}/${out.length}`:`PASS ${out.length}/${out.length}`);await b.close();process.exit(bad?1:0)})();
