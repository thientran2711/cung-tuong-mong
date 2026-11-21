/* dresscode-loans (r4, E30b): THE LOAN BOOK, law 6c — a lent piece comes home on every path, exactly once (coop-dresscode «4 back» fault).
   Same boot as dresscode.test.js.   usage: node dev/test/dresscode-loans.js [dev/index.html]   → exit 1 on FAIL or page error
   (boot copied from:) dresscode (review/dresscode, dev/build/jdc.js + jdc0.js, BAL.dc in jbal2): PARKING #11 SEASON + COLOUR DRESS CODE.
   Checks: the one colour table (10 families, Foreman C palette c01–c32 + m01–m52, every trâm / hoa điền pair, every robe fabric), robe colours
   = the painting (tier t7/t8, lãnh cung), item rows in Tư trang, season fit (her + NPC, cost by rank, the frame), festival gate queued BEFORE the
   festival events (real endTurn), borrow → the piece really moves and comes back, the shared contest formula cut for her AND an NPC, an NPC turned
   away, stay → festival events gone, NPC asks to borrow hers, calendar popover line, wear-slot label, old save + save round trip.
   usage: node dev/test/dresscode.test.js [dev/index.html]   → exit 1 on FAIL or page error */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'dev/index.html';let fail=0;const ck=(n,c,x)=>{console.log((c?'ok  ':'FAIL')+' '+n+(x!==undefined?' · '+JSON.stringify(x):''));if(!c)fail++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('console',m=>{if(m.type()==='error'&&/^dc|dcReturn|dcLedger|dcTurn|dcWeek/.test(m.text()))errs.push('console: '+m.text().slice(0,200))});
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(async()=>{let sd=20261120;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());Q.length=0;used=0;S.suc=90;try{closeModal()}catch(e){}});

 /* r4 (E30b, coop-dresscode «4 back» fault, law 6c): THE LOAN BOOK — a lent piece comes home on every path, exactly once.
    For every festival with a code: an NPC asks to borrow her trâm (real dcWeek frame, «Cho mượn»), then one of 4 things happens to the piece
    while the NPC holds it — nothing / another rule moves it to a third consort's chest / it is confiscated into the ledger box / it vanishes from
    the world (the co-op guest's stale copy) — then real endTurn ×2: one tagged copy is hers again (chest or hair), nobody else holds it, book empty. */
 const lb=await p.evaluate(()=>{const out=[];const tram=f=>Object.keys(BAL.dc.piece).find(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==='tram'&&!WD_ITEMS[k].nt&&BAL.dc.piece[k][0]===f);
  const R=()=>rivals.filter(v=>v&&v.alive&&!v.out&&!v.confined&&!v.coop);const a0=window.__aff0||aff;const f0=festToday;let n=0;
  for(const fk of Object.keys(BAL.dc.fest).filter(k=>FEST[k]))for(const how of ['none','move','box','gone']){n++;
   S.out=0;S.confined=0;S.dead=false;/* each case starts with her in the harem (a long run of real endTurns may have sent her away) */
   const v=R().find(v=>{const st=dcStat(v,fk);return st&&st.missing.length&&tram(st.missing[0])});if(!v){out.push({fk,how,skip:1});continue}
   const st=dcStat(v,fk);const k=tram(st.missing[0]);const tg='lb'+n;
   S.inv=(S.inv||[]).filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='tram'||e.dcPrev);S.inv.push({k,from:'emp',tg});S.dcAk=null;S.dcSw=dcWk();S.dcNk=`${S.year}-${fk}`;/* the NPCs' own festival roads (buy / borrow) are tested above; here the NPC must still lack the colour */Q.length=0;
   const nd0=dcNpcDress;dcNpcDress=()=>{};/* the NPCs' season change is tested in dresscode.test; here v must keep the robe that lacks the colour */
   festToday=()=>Object.assign({k:fk},FEST[fk]);aff=(x,y)=>y===S?(x===v?60:-50):a0(x,y);try{dcWeek()}finally{festToday=f0;aff=a0;dcNpcDress=nd0}
   const q=Q.find(q=>q.evId==='dc:ask');if(!q){out.push({fk,how,noask:1,dbg:[dcHerOn(),!!S.dead,S.out,S.confined,isSrv(),dcLend(),dcOwnFit(S,st.missing,'tram').length,aff(v,S),v.alive,Q.map(q=>q.evId||q.t).slice(0,3)]});continue}Q.length=0;q.opts[0].go();
   const where=()=>{const L=[];for(const p of [S].concat(rivals.filter(x=>!x.coop))){const w=wdOf(p);if(w.tram&&w.tram.tg===tg)L.push((p===S?'me':p.id)+':w');for(const e of p.inv||[])if(e&&e.tg===tg)L.push((p===S?'me':p.id)+':i')}
    for(const x of (S.il&&S.il.box)||[])if(x&&x.e&&(x.e.tg===tg))L.push('box');for(const c of S.lost||[])if(c&&c.e&&c.e.tg===tg&&c.st!=='done')L.push('lost:'+c.st+':'+c.own);return L};
   const lent=where().join();const w=wdOf(v);const e=w.tram&&w.tram.tg===tg?w.tram:null;
   if(e&&how==='move'){const u=R().find(x=>x!==v);w.tram=null;dcInv(u).push(e)}
   if(e&&how==='box'){w.tram=null;ilS().box.push({e,at:'nvp',why:'test',own:v.id,w:0})}
   if(e&&how==='gone'){w.tram=null}
   const trace=[];const dt0=dcTurn;dcTurn=function(){trace.push('t'+dcWk()+(S.dead?'D':''));return dt0.apply(this,arguments)};
   for(let i=0;i<2;i++){used=0;S.suc=90;trace.push('e'+dcWk());try{endTurn()}catch(x){out.push({fk,how,err:String(x)})}Q.length=0;S.mg=null}dcTurn=dt0;trace.push('end'+dcWk())
   if(S.dead){out.push({fk,how,skip:1,dead:1});continue}/* she died in those tuần (a long run of real endTurns): not a loan path */const L=where();const fnd=[S].concat(rivals).map(p=>[wdOf(p).tram].concat(p.inv||[])).flat().filter(e=>e&&e.tg===tg);const iu=(fnd[0]||{}).iu;out.push({fk,how,lent,after:L.join(),dbg:{trace,book:(S.dcLent||[]).map(r=>[r.bid,r.due,r.iu]),now:dcWk(),got:S.dcGot,pc:fnd.map(e=>[e.iu,e.bor,e.from]),log:((S.il&&S.il.log)||[]).filter(l=>iu&&l[1]===iu).slice(-6)},ok:(c=>{const phys=L.filter(x=>!/^lost:/.test(x)),cs=L.filter(x=>/^lost:/.test(x));/* home, then lost by HER own later event: a «lost» case holds the piece itself, a «held / found» case's piece IS the copy in the holder's chest (jil) */
    if(cs.length)return cs.length===1&&/:me$/.test(cs[0])&&(phys.length===0?/^lost:lost/.test(cs[0]):phys.length===1);return phys.length===1&&/^me:/.test(phys[0])})()&&!((S.dcLent||[]).some(r=>r.k===k&&r.e&&r.e.tg===tg))})}
  return out});
 {const sk=x=>x.skip||x.noask;/* noask: the NPC changed into a fitting robe that tuần (her season dress), so she no longer lacks the colour */const bad=lb.filter(x=>!sk(x)&&!x.ok);ck(`loan book: lent piece home exactly once on every festival × path (${lb.filter(x=>x.ok).length}/${lb.filter(x=>!sk(x)).length}, no ask ${lb.filter(sk).length})`,!bad.length&&lb.filter(x=>x.ok).length>=30,bad.slice(0,4))}
 ck('no page errors',!errs.length,errs.slice(0,4));
 console.log(fail?`dresscode-loans: ${fail} FAIL`:'dresscode-loans: ALL PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
