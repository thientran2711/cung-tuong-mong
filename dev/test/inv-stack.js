/* inv-stack (MAIN 154 ORDER 26/11 ~07:50Z): stacks keep every piece, the late-game save loads small and fast.
   usage: python3 dev/build/assemble.py && node dev/test/inv-stack.js [s7.json] [--shots DIR]
   Save: F's robot save s7 (year 18, S.inv 1,437 entries) — the path given, else $CTM_S7, else read from git
   (<handover ref>:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz), else a synthesized 18-year bag (same shape).
   Checks: (1) load: S.inv entries small, every kind's total equal for her, every NPC and the ledger store (no piece lost);
   (2) Tư trang bag grid + «Dâng quà» + «Biếu quà làm lành» pickers: DOM < 2,000 nodes, the bag tile shows the full count ×N;
   (3) one unit: sell 1 (bạc +, total −1), sell ×5 (beyond the real pieces: −5), give 1 to an NPC (hers +1, mine −1), burn 1 candle (−1);
   (4) a turn folds the month's new pieces without losing one; (5) save → reload: totals equal, still folded;
   (6) MUTATE: a stack that forgets its count / a fold that drops a piece / a bag that ignores the stack → the checks above FAIL. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),zlib=require('zlib'),cp=require('child_process'),path=require('path');
const argv=process.argv.slice(2);const SHOTS=argv.includes('--shots')?argv[argv.indexOf('--shots')+1]:null;const file=argv.find(a=>!a.startsWith('--')&&a!==SHOTS);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
function s7(){const f=file||process.env.CTM_S7;if(f&&fs.existsSync(f))return {src:f,D:JSON.parse(fs.readFileSync(f,'utf8'))};
 for(const ref of ['origin/handover','origin/claude/cung-tuong-mong-handover-hj0h8w']){try{const b=cp.execSync(`git show ${ref}:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz`,{cwd:path.resolve(__dirname,'../..'),maxBuffer:1<<28,stdio:['ignore','pipe','ignore']});
  return {src:ref,D:JSON.parse(zlib.gunzipSync(b).toString('utf8'))}}catch(e){}}return null}
(async()=>{const got=s7();console.log('save:',got?got.src:'synthesized');
 const b=await chromium.launch();
 const run=async(vw,vh,mut)=>{const ctx=await b.newContext({viewport:{width:vw,height:vh},deviceScaleFactor:SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);
  if(got)await ctx.addInitScript(d=>{if(!sessionStorage.getItem('ivs')){for(const k in d)localStorage.setItem(k,d[k]);sessionStorage.setItem('ivs','1')}},got.D);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&typeof invAdd==='function'&&window.COOPW,null,{timeout:90000});
  if(!got)await p.evaluate(()=>{SLOT=1;document.getElementById('title').hidden=true;start();while(Q.length)Q.shift();
   /* 18 years of lệ tháng in the old shape (one entry per piece, ledger ids), NPC bags, the store's «kho» records */
   const K=[['alnen0',518],['aldau0',154],['tragoi',145],['vaibong',127],['vaitho',56],['thanbac',33],['thanden',18]];let id=1;
   S.inv=[];for(const [k,n] of K)for(let i=0;i<n;i++)S.inv.push(Object.assign({k,from:'noivu',d:i%216,iu:id++},k==='aldau0'?{u:6}:{}));
   for(const v of rivals.slice(0,10)){v.inv=v.inv||[];for(const [k,n] of K)for(let i=0;i<n/3;i++)v.inv.push({k,from:'noivu',d:i,iu:id++})}
   S.il=S.il||{};S.il.box=S.il.box||[];for(let i=0;i<3000;i++)S.il.box.push({e:{k:'alnen0',from:'noivu',d:i%216,iu:id++},at:'nvp',why:'kho',own:rivals[i%5].id,w:i%800,by:''});
   localStorage.setItem(SK(1),JSON.stringify(ser()))});
  /* MUTATE: break the core the checks stand on */
  if(mut)await p.evaluate(m=>{if(m==='count')window.invMoreOnce=()=>0;if(m==='drop'){const f=window.invFold;window.invFold=function(q,all){const L=(q&&q.inv||[]).slice();const r=f.apply(this,arguments);if(q&&q.invS&&q.invS[0])q.invS[0].n--;return r};invFold=window.invFold}if(m==='nostack'){invMoreOnce=()=>0}},mut);
  const pre=await p.evaluate(()=>{const d=JSON.parse(localStorage.getItem(SK(1)));const T=L=>{const o={};for(const e of L||[])o[e.k]=(o[e.k]||0)+1;return o};
   const R={};for(const v of d.R)R[v.id]=T(v.inv);const B={};for(const x of (d.S.il&&d.S.il.box)||[])B[x.e.k]=(B[x.e.k]||0)+1;return{n:d.S.inv.length,S:T(d.S.inv),R,B,len:localStorage.getItem(SK(1)).length}});
  const t0=Date.now();
  await p.evaluate(()=>{const d=loadSlot(1);SLOT=1;quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;while(Q.length)Q.shift();try{deal();render()}catch(e){console.error(e)}});
  const ms=Date.now()-t0;
  const tot=()=>p.evaluate(()=>{const R={};for(const v of rivals)R[v.id]=invTotals(v);const B={};for(const x of S.il.box||[])B[x.e.k]=(B[x.e.k]||0)+1;for(const st of S.il.bs||[])B[st.e.k]=(B[st.e.k]||0)+(st.e.n|0);
   return{n:S.inv.length,ns:(S.invS||[]).length,S:invTotals(S),R,B,box:(S.il.box||[]).length}});
  const eq=(a,b)=>{const d=[];for(const k of new Set(Object.keys(a||{}).concat(Object.keys(b||{}))))if((a[k]||0)!==(b[k]||0))d.push(k+':'+(a[k]||0)+'→'+(b[k]||0));return d};
  const eqR=(a,b)=>{const d=[];for(const id of new Set(Object.keys(a).concat(Object.keys(b))))d.push(...eq(a[id]||{},b[id]||{}).map(x=>id+' '+x));return d};
  const A=await tot();const tag=`${vw}x${vh}${mut?' MUT:'+mut:''}`;const out={};
  out.small=A.n<=200;out.her=eq(pre.S,A.S).length===0;out.npc=eqR(pre.R,A.R).length===0;out.box=eq(pre.B,A.B).length===0;
  if(!mut){ok(out.small,`${tag} load: S.inv ${pre.n} → ${A.n} real pieces + ${A.ns} stacks (≤ 200), ${ms} ms`);ok(out.her,`${tag} her totals equal (every kind)`,eq(pre.S,A.S).slice(0,6));
   ok(out.npc,`${tag} every NPC's totals equal`,eqR(pre.R,A.R).slice(0,6));ok(out.box,`${tag} ledger store totals equal (box ${A.box} records + stacks)`,eq(pre.B,A.B).slice(0,6))}
  /* (2) the bag grid + the two gift pickers */
  const ui=await p.evaluate(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const big=Object.entries(invTotals(S)).sort((a,b)=>b[1]-a[1])[0];const it=IT[big[0]];
   try{KINV.cur.tutrang=kinvCat(it.kd);localStorage.setItem('hclh-kinv-tutrang',kinvCat(it.kd))}catch(e){}while(Q.length)Q.shift();tab='inv';render();await w(400);
   const tiles=[...document.querySelectorAll('#panel .kitem')];const t=tiles.find(x=>(x.getAttribute('title')||x.textContent||'').includes(it.n));
   const q=t?((t.querySelector('.kitq')||{}).textContent||''):'';const bag=document.querySelectorAll('#panel *').length;
   while(Q.length)Q.shift();closeModal();pushDil(mkP('giftto',{t:'emp'}),'Dâng quà');showModal();await w(400);const g1=document.querySelectorAll('#modal *').length;const g1t=document.querySelectorAll('#modal .kipc').length;
   const gq=[...document.querySelectorAll('#modal .kipc .kitq')].map(x=>x.textContent);
   while(Q.length)Q.shift();closeModal();const v=liveRivals(true)[0];pushDil(mkP('tsgiftpick',{v:v.id,k:'it'}),'Biếu quà');showModal();await w(400);
   const g2=document.querySelectorAll('#modal *').length;while(Q.length)Q.shift();closeModal();tab='act';render();
   return{bag,big,q,g1,g1t,gq:gq.slice(0,5),g2,all:document.querySelectorAll('*').length}});
  out.dom=ui.bag<2000&&ui.g1<2000&&ui.g2<2000;out.qty=ui.q.replace(/\D/g,'')===String(ui.big[1]);
  if(!mut){ok(out.dom,`${tag} DOM: bag ${ui.bag} · Dâng quà ${ui.g1} (${ui.g1t} tiles) · Biếu quà làm lành ${ui.g2} nodes (< 2,000)`,{page:ui.all});
   ok(out.qty,`${tag} bag tile of ${ui.big[0]} shows the full count`,{tile:ui.q,total:ui.big[1]});ok(ui.gq.length>0,`${tag} gift picker shows the kit stack badge ×N`,ui.gq)}
  /* (3) one unit */
  const u=await p.evaluate(()=>{const C=k=>invCount(S,e=>e.k===k&&!e.h);const k=Object.entries(invTotals(S)).filter(([k])=>IT[k]&&IT[k].pr>0&&!IT[k].keep).sort((a,b)=>b[1]-a[1])[0][0];
   const r={k};r.c0=C(k);const b0=S.bac;const it=kitShopSellItems().find(x=>x.k==='e:'+k+'|'+itm(k).n||x.k==='it:'+k)||kitShopSellItems().find(x=>x.name===itm(k).n);r.sellRow=!!it;
   if(it){used=0;it.onBuy(it,1);r.c1=C(k);r.bac1=S.bac-b0;used=-20;it.onBuy(it,5);r.c5=C(k);used=0}/* each sale costs 1 khắc: a fresh buổi for the check */
   const v=liveRivals(true).find(x=>x&&!x.coop);const vc0=invCount(v,e=>e.k===k);render();/* a tap = a render (her real pieces out of the stack) */const ix=S.inv.findIndex(e=>e.k===k&&!e.h);const c6=C(k);r.gs=String(giveTo(S,v,ix)).slice(0,120);r.ix=ix;r.v=v.id;r.give=[c6-C(k),invCount(v,e=>e.k===k)-vc0];
   S.buoi=typeof B4L!=='undefined'?B4L:3;const n0=C('alnen0')+C('alnen1')+C('alnen2');const L=alLight(S,'arts');r.burn=[!!L,n0-(C('alnen0')+C('alnen1')+C('alnen2'))];
   render();r.after=S.inv.filter(e=>e.k===k).length;return r});
  out.unit=u.sellRow&&u.c0-u.c1===1&&u.bac1>0&&u.c1-u.c5===5&&u.give[0]===1&&u.give[1]===1&&u.burn[0]&&u.burn[1]===1;
  if(!mut)ok(out.unit,`${tag} one unit: sell 1 / sell ×5 / give 1 / burn 1 candle`,u);
  /* (4) a turn: the month's pieces fold, nothing lost */
  const tr=await p.evaluate(()=>{const before=invTotals(S);for(let i=0;i<6;i++)invAdd(S,{k:'tragoi',from:'noivu',d:S.turn});const want=(before.tragoi||0)+6;
   const t0=S.turn;let g=0;while(S.turn===t0&&g++<8){try{endTurn()}catch(e){}while(Q.length)Q.shift()}invFoldAll(true);const n=S.inv.filter(e=>e.k==='tragoi'&&!e.h).length;return{want,have:invTotals(S).tragoi||0,real:n}});
  out.turn=tr.have>=tr.want-1&&tr.real<=3;/* a turn may use one tea (host a guest) */
  if(!mut)ok(out.turn,`${tag} after a turn: tea folded (real ≤ live+1), none lost`,tr);
  /* (5) save → reload */
  const rl=await p.evaluate(()=>{const T0=invTotals(S);const B0=boxCount();quiet=false;save();const d=loadSlot(SLOT);quiet=true;deser(d);quiet=false;while(Q.length)Q.shift();const T1=invTotals(S);
   const df=[];for(const k of new Set(Object.keys(T0).concat(Object.keys(T1))))if((T0[k]||0)!==(T1[k]||0))df.push(k);return{df,b:[B0,boxCount()],n:S.inv.length,len:localStorage.getItem(SK(SLOT)).length}});
  out.reload=rl.df.length===0&&rl.b[0]===rl.b[1]&&rl.n<=200;
  if(!mut)ok(out.reload,`${tag} save → reload: totals + store equal, save ${pre.len} → ${rl.len} chars`,rl);
  if(SHOTS&&!mut){fs.mkdirSync(SHOTS,{recursive:true});await p.evaluate(()=>{tab='inv';render()});await p.waitForTimeout(500);await p.screenshot({path:`${SHOTS}/bag-${vw}x${vh}.png`});
   await p.evaluate(()=>{while(Q.length)Q.shift();closeModal();pushDil(mkP('giftto',{t:'emp'}),'Dâng quà');showModal()});await p.waitForTimeout(600);await p.screenshot({path:`${SHOTS}/giftto-${vw}x${vh}.png`});
   await p.evaluate(()=>{while(Q.length)Q.shift();closeModal();const v=liveRivals(true)[0];pushDil(mkP('tsgiftpick',{v:v.id,k:'it'}),'Biếu quà');showModal()});await p.waitForTimeout(600);await p.screenshot({path:`${SHOTS}/tsgift-${vw}x${vh}.png`})}
  if(!mut)ok(errs.length===0,`${tag} no page errors`,errs.slice(0,4));
  await ctx.close();return out};
 for(const [w,h] of [[755,1000],[1180,820]])await run(w,h,null);
 /* MUTATE: each broken core must be caught */
 const m1=await run(755,1000,'count');ok(!m1.qty,'MUTATE stack count ignored → bag-count check FAILS',m1);
 const m2=await run(755,1000,'drop');ok(!m2.her||!m2.reload,'MUTATE fold drops a piece → totals check FAILS',m2);
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`INV-STACK FAIL ${f}/${res.length}`:`INV-STACK PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
