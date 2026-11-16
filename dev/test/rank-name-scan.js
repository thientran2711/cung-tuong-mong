/* LUẬT SỬA CẢ NHÓM for "rank and name always together" (owner 15/11, review/pick-hint): visits every tab (+ Hậu cung sub-tabs), the
   mood dialog of every consort, the spy picker, the log, and every dialog endTurn pushes over N turns; on each screen lists the
   full person names written WITHOUT their title (kitRankNamePaint dry run). Run twice in one page: paint OFF (before) and ON (after).
   Writes dev/review/rank-name-scan.md. usage: NODE_PATH=$(npm root -g) node dev/test/rank-name-scan.js <url> [turns=40] */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const path=require('path');const [,,URL,TN]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 const pass=async(off)=>p.evaluate(async([off,N])=>{const W=t=>new Promise(r=>setTimeout(r,t));window.__krnOff=off;const R={};
  const scan=async(site,root)=>{await W(60);if(!off)kitRankNamePaint(root||document.body);for(const x of kitRankNamePaint(root||document.body,true)){const k=site;(R[k]=R[k]||[]).push(x)}};
  const close=()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true};
  const tabs=[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab);
  for(const t of tabs){tab=t;try{render()}catch(e){}await scan('tab '+t,document.getElementById('panel')||document.body);
   const subs=[...document.querySelectorAll('#panel [data-hc],#panel [data-sub],#panel .ktabs button')].slice(0,6);for(const s of subs){try{s.click()}catch(e){}await scan('tab '+t+' › '+s.textContent.trim().slice(0,20),document.getElementById('panel'))}}
  for(const v of rivals.filter(v=>v.alive).slice(0,4)){close();try{emoBox(typeof emoKey==='function'?emoKey(v):v.id)}catch(e){}await scan('mood dialog',document.getElementById('modal'))}
  close();try{spyPick(0)}catch(e){}await scan('spy picker',document.getElementById('modal'));close();
  const sm0=showModal;
  for(let i=0;i<N;i++){Q.length=0;try{showModal=function(){};endTurn()}catch(e){}finally{showModal=sm0}
   for(const m of Q.slice(0,4)){Q.length=0;Q.push(m);try{showModal()}catch(e){}await scan('dialog: '+String(m.t||'').replace(/<[^>]+>/g,'').slice(0,40),document.getElementById('modal'))}close()}
  tab=tabs.find(t=>/log|so/i.test(t))||tab;try{render()}catch(e){}await scan('log tab',document.getElementById('panel'));
  await scan('whole page (header, toasts)',document.body);return R},[off,+TN||40]);
 const before=await pass(true);await p.reload({waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 const after=await pass(false);
 const fam=s=>s.replace(/^dialog: .*/,'dialogs (endTurn)');const agg=R=>{const o={};for(const [k,L] of Object.entries(R)){const f=fam(k);o[f]=o[f]||{n:0,ex:[]};o[f].n+=L.length;for(const x of L)if(o[f].ex.length<3&&!o[f].ex.some(e=>e.text===x.text))o[f].ex.push(x)}return o};
 const A=agg(before),B=agg(after);const keys=[...new Set([...Object.keys(A),...Object.keys(B)])];
 const md=['# Rank + name together — bare full names before / after (kitRankNamePaint)','','Script: `dev/test/rank-name-scan.js`. Two fresh games (same steps); "bare" = a full person name with no title before it and not inside a kit name.','',
  `Totals: before ${Object.values(A).reduce((s,x)=>s+x.n,0)}, after ${Object.values(B).reduce((s,x)=>s+x.n,0)}.`,'','| site | bare before | bare after | example before | example after |','|---|---|---|---|---|'];
 for(const k of keys)md.push(`| ${k} | ${(A[k]||{n:0}).n} | ${(B[k]||{n:0}).n} | ${((A[k]||{}).ex||[]).map(x=>`**${x.name}** (${x.title}): ${x.text}`).join('<br>').replace(/\|/g,'/')} | ${((B[k]||{}).ex||[]).map(x=>`**${x.name}**: ${x.text}`).join('<br>').replace(/\|/g,'/')} |`);
 fs.mkdirSync(path.join(__dirname,'../review'),{recursive:true});fs.writeFileSync(path.join(__dirname,'../review/rank-name-scan.md'),md.join('\n')+'\n');
 console.log(JSON.stringify({before:Object.fromEntries(Object.entries(A).map(([k,v])=>[k,v.n])),after:Object.fromEntries(Object.entries(B).map(([k,v])=>[k,v.n])),errs:errs.slice(0,5)}));
 await b.close();process.exit(Object.values(B).some(x=>x.n)||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
