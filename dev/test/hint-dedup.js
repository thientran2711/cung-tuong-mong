/* LUẬT SỬA CẢ NHÓM for "hints read the same" (coordinator after opt-render r7): every event dialog the game pushes (endTurn × N, all modules) plus
   the named ones (night1, giu, prep), read at Tâm cơ 5 (vague) and 30 (plain): how many options share their hint with another option of the
   same dialog BEFORE (kitHint alone) and AFTER (jevb evbDedup). Writes dev/review/hint-dedup.md. Exit 1 if any dialog still has duplicates
   that a clearer level could have told apart.
   usage: NODE_PATH=$(npm root -g) node dev/test/hint-dedup.js <url> [turns=120] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const [,,URL,TN]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 const R=await p.evaluate(async(N)=>{const W=t=>new Promise(r=>setTimeout(r,t));const sm0=showModal;showModal=function(){};const out={};
  const T=s=>String(s||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  const dupN=L=>{const c={};L.forEach(h=>{if(h)c[h]=(c[h]||0)+1});return L.filter(h=>h&&c[h]>1).length};
  const read=(m,key)=>{if(!m||!m.opts||m.opts.length<2||!kitIsEventChoice(m))return;
   for(const [lvN,tc] of [["vague",5],["plain",30]]){S.tamco=tc;tmPlace(S,0);
    m.opts.forEach(o=>{if(o&&o.__dhA){delete o.hint;delete o.risk;delete o.__dhA}});
    const before=m.opts.map(o=>kitHint(o,m).hint);evbDedup(m);const after=m.opts.map(o=>kitHint(o,m).hint);
    let canFix=0;try{for(let l=kitHintLevel()+1;l<=2;l++){const L=m.opts.map(o=>{const c=Object.assign({},o);if(c.__dhA){delete c.hint;delete c.risk}return kitHint(c,m,l).hint});if(dupN(L)<dupN(after))canFix=1}}catch(e){}
    /* duplicates left that are NOT equal in data (odds number, chance word, gain size) = real misses */
    let miss=0;{const c={};after.forEach(h=>{if(h)c[h]=(c[h]||[]);});m.opts.forEach((o,i)=>{if(after[i])c[after[i]].push(i)});
     for(const L of Object.values(c)){if(L.length<2)continue;const sig=i=>[m.opts[i].od,evbGain(m.opts[i]),evbChance(m.opts[i])].join('|');if(new Set(L.map(sig)).size>1)miss+=L.length}}
    const k=key+" @"+lvN;const r=out[k]=out[k]||{n:0,opts:m.opts.length,b:dupN(before),a:dupN(after),miss,canFix,ex:[]};r.n++;
    if(!r.ex.length)r.ex=m.opts.map((o,i)=>`${T(o.n).slice(0,26)}: ${before[i]}${after[i]!==before[i]?` → ${after[i]}`:''}`);if(dupN(after)&&!r.od)r.od=m.opts.map(o=>o.od)}};
  try{
   for(const [pid,pp,t] of [["night1",{q:2,vp:0},"Đêm thị tẩm"],["giu",{},"Giữ hay không giữ"],["prep",{},"Chuẩn bị thị tẩm"]]){Q.length=0;try{const d=mkP(pid,pp);if(d){Q.push({t,h:d.t,opts:d.o,who:d.who,pid,pp});read(Q[0],pid+" · "+t)}}catch(e){}}
   for(let i=0;i<N;i++){if(!S||S.dead){start();await W(50)}Q.length=0;S.tamco=5;try{endTurn()}catch(e){}
    for(const m of Q.slice())read(m,(m.pid||'')+' · '+T(m.t).slice(0,44));Q.length=0;if(i%10===9)await W(20)}
  }finally{showModal=sm0;Q.length=0;document.getElementById('modal').hidden=true}return out},+TN||120);
 const rows=Object.entries(R).sort((a,b)=>b[1].b-a[1].b);const md=['# Event hints that read the same — before / after (jevb evbDedup)','',
  'Script: `dev/test/hint-dedup.js`. Dialogs the game pushed over '+(+TN||120)+' turns + night1 / giu / prep. "dup" = options whose hint equals another option\'s hint in the same dialog.','',
  `Totals: dialogs ${rows.length}; duplicate options left that differ in their data (odds / chance / gain): ${rows.reduce((s,r)=>s+r[1].miss,0)} (the rest are true ties: same odds, same outcome); with duplicates before ${rows.filter(r=>r[1].b).length}, after ${rows.filter(r=>r[1].a).length}; duplicate options before ${rows.reduce((s,r)=>s+r[1].b,0)}, after ${rows.reduce((s,r)=>s+r[1].a,0)}.`,'',
  '| dialog @ level | seen | options | dup before | dup after | of which not equal in data | hints (before → after) |','|---|---|---|---|---|---|---|'];
 for(const [k,v] of rows)md.push(`| ${k} | ${v.n} | ${v.opts} | ${v.b} | ${v.a} | ${v.miss} | ${v.ex.join('<br>').replace(/\|/g,'/')} |`);
 fs.writeFileSync(path.join(__dirname,'../review/hint-dedup.md'),md.join('\n')+'\n');
 const bad=rows.filter(r=>r[1].canFix||r[1].miss);console.log(JSON.stringify({dialogs:rows.length,dupBefore:rows.filter(r=>r[1].b).length,dupAfter:rows.filter(r=>r[1].a).length,optsBefore:rows.reduce((s,r)=>s+r[1].b,0),optsAfter:rows.reduce((s,r)=>s+r[1].a,0),fixableLeft:bad.map(r=>r[0]),missLeft:rows.reduce((s,r)=>s+r[1].miss,0),odLeft:rows.filter(r=>r[1].od).slice(0,6).map(r=>[r[0].slice(0,40),r[1].od]),errs}));
 await b.close();process.exit(bad.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
