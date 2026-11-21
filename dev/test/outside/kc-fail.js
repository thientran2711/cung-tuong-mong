/* review/kc-fail-effects (GAP J3c, laws 3 + 7 + one core): every home-road card (jkc / jkc2) prints in its BẠI column exactly what a failure does.
   usage: node dev/test/outside/kc-fail.js <site url> [out.json] [ld=0|1]
   Per home origin (KC.ok) and per place, with the card's person / proof / maid present: deal the deck, and for every card that can fail
   (o < 100) restore the same state, pay it as runOpt's failure branch does (c, then l, then fail()), diff the state
   (her stats, each family member's liking + Oán, Lời đồn, house power, proofs, the 6-month wait, a new dialog, the maid's liking) and check
   each real change is named in that card's BẠI (or KÈM, for a price paid either way) — and that BẠI names nothing that did not happen.
   Prints one JSON report (rows: origin | card | shown BẠI | real effect | ok); exit 1 on any fail. Runs against any build (the BEFORE table). */
const {chromium}=require('playwright');const fs=require('fs');
const URL=process.argv[2];const OUT=process.argv[3]||'';const LD=+(process.argv[4]||0);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});
 const p=await c.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();document.querySelector('#slots button[data-new="1"]').click()});await sleep(2500);
 const rep=await p.evaluate(async(LD)=>{window.__bot=1;const rows=[];const fails=[];
  const txt=h=>{const d=document.createElement('div');d.innerHTML=h;const o={};d.querySelectorAll('.kl').forEach(k=>{o[k.textContent.trim()]=(k.nextElementSibling?k.nextElementSibling.textContent:'').replace(/\s+/g,' ').trim()});return o};
  const sg=n=>(n>0?'+':'-')+Math.abs(n);
  for(const ok of KC.ok){
   try{for(let i=0;i<60&&(S.srv||S.kc);i++){try{store.set(NL_KEY,null)}catch(e){}start()}}catch(e){}
   S.origin=ORIGINS.find(x=>x.k===ok);if(!S.origin)continue;S.kc=null;S.kcPick='nha';try{kcInit()}catch(e){fails.push(ok+' kcInit '+e.message);continue}
   if(!isKc()){fails.push(ok+' not home');continue}
   Q.length=0;S.kc.ldSeen=LD;try{kcFix()}catch(e){}
   /* every person present, a proof against Di nương, a maid, the old flame */
   for(const m of S.kc.fam){m.af=20;m.oan=0}S.kc.sx=1;/* nc: the envoy is in town */const di=S.kc.fam.find(m=>m.r==='di');if(di)S.kc.proof[di.id]=1;
   const snap=JSON.stringify(S);const PL=Object.keys(typeof KCPL!=='undefined'?KCPL:{}).concat([S.place]);const seen=new Set();
   for(const P of PL)for(const maid of [1,0]){
    S=JSON.parse(snap);try{kcFix()}catch(e){}if(!maid)S.maid=null;S.place=P;Q.length=0;deal();
    const names=deck.map(a=>a.n);
    for(const n of names){const key=ok+'|'+n+'|'+(maid?1:0);if(seen.has(key))continue;
     S=JSON.parse(snap);try{kcFix()}catch(e){}if(!maid)S.maid=null;S.place=P;Q.length=0;deal();const i=deck.findIndex(a=>a.n===n);const a=deck[i];if(!a||(a.o==null?100:a.o)>=100&&!a.fail)continue;if((a.o==null?100:a.o)>=100)continue;seen.add(key);
     a.lock=false;/* the BẠI row shows when she can act (a locked card has no odds row) */const sh=txt(cardH(a,i));const bai=sh['Bại']||'',kem=sh['Kèm']||'';
     const st0={};for(const k of Object.keys(S))if(typeof S[k]==='number')st0[k]=S[k];
     const f0=S.kc.fam.map(m=>[m.af,m.oan||0]);const pw0=JSON.stringify(Object.values((typeof trS==='function'&&trS()&&trS().H)||{}).map(h=>h.pow));const pr0=JSON.stringify(S.kc.proof);const g70=S.kc.g7;const q0=Q.length;const mz0=S.maid?S.maid.loyal:null;
     try{if(a.c)apply(a.c);apply(a.l||{});if(a.fail)a.fail()}catch(e){fails.push(ok+' '+n+' run '+e.message)}
     const real=[];
     for(const k of Object.keys(st0))if(S[k]!==st0[k]&&!(a.c&&a.c[k])){const d=S[k]-st0[k];if(k==='kld')real.push(['ld',d]);else if(!/^(turn|logSeq)$/.test(k))real.push(['st',k,d])}
     S.kc.fam.forEach((m,j)=>{const da=m.af-f0[j][0],dO=(m.oan||0)-f0[j][1];if(da)real.push(['af',m.t,da]);if(dO)real.push(['oan',m.t,dO])});
     if(JSON.stringify(Object.values((typeof trS==='function'&&trS()&&trS().H)||{}).map(h=>h.pow))!==pw0)real.push(['pow']);if(JSON.stringify(S.kc.proof)!==pr0)real.push(['proof']);if(S.kc.g7!==g70)real.push(['cd']);if(Q.length>q0)real.push(['dil']);
     if(S.maid&&S.maid.loyal!==mz0)real.push(['mz',S.maid.loyal-mz0]);
     const miss=[];const has=(s,t)=>s.includes(t);
     for(const r of real){const [k,x,y]=r;let ok2=true;
      if(k==='ld')ok2=S.kc.ldSeen?has(bai,'Lời đồn '+sg(x)):has(bai,'lời ra tiếng vào');
      else if(k==='st')ok2=NAMES[x]?has(bai,NAMES[x]):true;/* a stat she cannot see is not printed (fog) */
      else if(k==='af')ok2=has(bai,x+' với ngươi '+sg(y));else if(k==='oan')ok2=has(bai,x+' oán '+sg(y));
      else if(k==='pow')ok2=has(bai,'Thế lực nhà');else if(k==='proof')ok2=has(bai,'chứng cứ');else if(k==='cd')ok2=has(bai,'tháng sau mới xin lại');
      else if(k==='dil')ok2=has(bai,'bắt gặp');else if(k==='mz')ok2=has(kem,'thiện cảm '+sg(x));
      if(!ok2)miss.push(r.join(' '))}
     const nothing=/không mất gì|Tốn công/.test(bai)&&real.some(r=>r[0]!=='mz'&&!(r[0]==='st'&&!NAMES[r[1]]));
     const row={o:ok,card:n,maid,bai,real:real.map(r=>r.join(' ')).join(', '),ok:!miss.length&&!nothing};if(!row.ok){row.miss=miss;fails.push(`${ok} ${n}: shown «${bai}» real ${row.real}`)}rows.push(row)}}}
  return{rows,fails}},LD);
 rep.errs=errs;const bad=rep.fails.length+errs.length;
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(rep,null,1));
 console.log(JSON.stringify({cards:rep.rows.length,fails:rep.fails,errs},null,1));await b.close();process.exit(bad?1:0)})();
