/* dresscode-loan-scan (E30r3 review, law 6c REAL OBJECTS): EVERY lent piece is counted EVERY tuần over ≥ 2 bot years (real endTurn):
   it must sit in exactly ONE place (a chest / hair / robe slot / pawn of anyone, or the ledger box) — never 0 (lost), never 2 (copied).
   Loans come from the game's own roads: her festival gate «Mượn …», the NPC ask frame «Cho mượn» (dcWeek), NPC ↔ NPC (dcNpcFest);
   festivals are forced often (dcFestNow) so a run holds many loans. Disturbances on the way (seeded): a held piece moved to a third chest,
   confiscated into the ledger box, her portrait id changed (S.pid), she takes a borrowed trâm off her hair (dress change) — then at the end:
   a tuần she dies with a loan each way, and an old save's "me:<pid>" key. Also: no loan still marked past its tuần, no book line past due,
   no stale dcPrev (her own trâm put aside for a loan, the loan gone) and her off-season cost charged EVERY tuần like the NPCs' (law 1).
   Same boot as dresscode.test.js.   usage: node dev/test/dresscode-loan-scan.js [dev/index.html] [tuần=108]   → exit 1 on FAIL or page error */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'dev/index.html';const NT=+process.argv[3]||108;let fail=0;const ck=(n,c,x)=>{console.log((c?'ok  ':'FAIL')+' '+n+(x!==undefined?' · '+JSON.stringify(x):''));if(!c)fail++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('console',m=>{if(m.type()==='error'&&/^dc|dcReturn|dcLedger|dcTurn|dcWeek/.test(m.text()))errs.push('console: '+m.text().slice(0,200))});
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(async()=>{let sd=20261121;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());Q.length=0;used=0;S.suc=90;try{closeModal()}catch(e){}});
 p.setDefaultTimeout(0);
 const R=await p.evaluate(async NT=>{let rs=777;const rnd=()=>{rs=(rs*48271)%2147483647;return rs/2147483647};
  const st={loans:0,her:0,lend:0,npc:0,move:0,box:0,pid:0,off:0,weeks:0,fest:0,trans:[]};const bad=[];const T={};let seq=0;
  /* tag every lent piece at the moment it is lent (the copy the borrower gets carries the tag; so does the book's copy — a restored copy beside the real one counts 2) */
  const b0=dcBorrow;dcBorrow=function(to,from,e){if(e&&!e.sc)e.sc='s'+(++seq);const r=b0.apply(this,arguments);if(r){const t=T[e.sc]=T[e.sc]||{k:e.k,n:0};t.n++;t.lender=from===S?'me':from.id;t.due=dcWk();st.loans++;{const o=arguments[3];if(o&&o.why)st['w_'+o.why]=(st['w_'+o.why]||0)+1}if(to===S)st.her++;else if(from===S)st.lend++;else st.npc++}return r};
  const a0=aff;aff=(x,y)=>Math.max(a0(x,y),45);
  const TRC=[];window.__trc=TRC;const tw=(n)=>{const f0=window[n]||eval(n);const g=function(){const a=[...arguments];const r=f0.apply(this,a);try{const e=a.find(x=>x&&typeof x==='object'&&x.sc==='s15'||x&&x.e&&x.e.sc==='s15');if(e)TRC.push([dcWk(),n,JSON.stringify(a.map(x=>x===S?'S':x&&x.id!=null&&x.name?'v'+x.id:x&&x.k?{k:x.k,sc:x.sc,bor:x.bor,dcPrev:x.dcPrev}:typeof x==='object'?'obj':x)).slice(0,300)])}catch(z){}return r};eval(n+'=g')};
  ['dcGiveBack','dcTake','ilGone','loLose','dcBuy'].forEach(n=>{try{tw(n)}catch(z){}});
  const P=()=>[S].concat(rivals.filter(v=>v&&!v.coop));
  /* every object with .sc anywhere in her and the NPCs (book copies under dcLent excluded), plus the ledger box */
  const census=()=>{const M={};OBJ={};const seen=new Set();const PS=new Set([S].concat(rivals));const walk=(o,path,d)=>{if(!o||typeof o!=='object'||seen.has(o)||d>9)return;seen.add(o);
     if(o.sc&&o.k&&typeof o.sc==='string'){(M[o.sc]=M[o.sc]||[]).push(path);OBJ[o.sc]=o}
     for(const k in o){if(k==='dcLent'||k==='__inv0')continue;const v=o[k];if(v&&typeof v==='object'){if(PS.has(v))continue;walk(v,path+'.'+k,d+1)}}};
   for(const q of P()){walk(q,q===S?'me':'v'+q.id,0)}return M};
  const place=pth=>!/\.(lost|il\.log)/.test(pth);
  let PV=new Set(),LA={},OBJ={};const check=tag=>{const nv=new Set();const M=census();for(const sc in T){const L=(M[sc]||[]);const ph=L.filter(place);if(ph.length!==1){const c=L.filter(x=>!place(x));
     /* a rule that rebuilt the piece without the test tag (its ledger id kept): follow the id — exactly one holder of it = the piece still in one place */
   if(ph.length===0&&LA[sc]&&LA[sc].iu){const iu=LA[sc].iu;const hs=[];for(const q of P()){const w=wdOf(q)||{};for(const e of [w.tram,w.y].concat(q.inv||[]).concat((q.wdPawn||[]).map(x=>x&&x.e)))if(e&&e.iu===iu&&e.k===T[sc].k)hs.push(e)}for(const b of (S.il&&S.il.box)||[])if(b&&b.e&&b.e.iu===iu)hs.push(b.e);
    if(hs.length===1){hs[0].sc=sc;st.retag=(st.retag||0)+1;continue}}
   if(!(ph.length===0&&c.length)){const x={wk:dcWk(),tag,sc,k:T[sc].k,lender:T[sc].lender,at:L};if(!L.length&&LA[sc]){x.last=LA[sc];const iu=LA[sc].iu;x.il=((S.il&&S.il.log)||[]).filter(l=>iu&&l[1]===iu).slice(-5);x.box=((S.il&&S.il.box)||[]).filter(b=>b&&b.e&&iu&&b.e.iu===iu).map(b=>({at:b.at,why:b.why,own:b.own,w:b.w,keys:Object.keys(b.e)}));x.held=[S].concat(rivals).filter(p=>[wdOf(p).tram,wdOf(p).y].concat(p.inv||[]).some(e=>e&&iu&&e.iu===iu)).map(p=>p===S?'me':p.id);const nm=(WD_ITEMS[T[sc].k]||{}).n;x.log=(S.log||[]).slice(0,40).map(l=>typeof l==='string'?l:(l&&l.t)||JSON.stringify(l)).filter(s=>nm&&String(s).includes(nm)).slice(0,4)}bad.push(x)}}else{const o=OBJ[sc];LA[sc]={at:ph[0],iu:o&&o.iu,bor:o&&o.bor}}}
   /* a loan past its tuần + 1 still marked, or a book line past due: the loan never ended */
   for(const q of P()){const w=wdOf(q)||{};for(const e of [w.tram,w.y].concat(q.inv||[]))if(e&&e.bor&&e.bor.due<dcWk()-10)bad.push({wk:dcWk(),tag,stale:1,who:q===S?'me':q.id,k:e.k,bor:e.bor});
    for(const r of q.dcLent||[])if(r&&r.due<dcWk()-10)bad.push({wk:dcWk(),tag,book:1,who:q===S?'me':q.id,r:r.bid});
    /* a trâm put aside for a loan (dcPrev) while no borrowed piece is on the hair any more */
    const who=q===S?'me':q.id;if((q.inv||[]).some(e=>e&&e.dcPrev&&!e.bor)&&!(w.tram&&w.tram.bor)){if(PV.has(who))bad.push({wk:dcWk(),tag,dcPrev:1,who});nv.add(who)}}PV=nv};/* a mark made inside this endTurn (an NPC swaps a borrowed trâm for her own at a festival) is healed at the next tuần\'s return: only a mark that stays 2 tuần is stale */
  /* stock: her 1 trâm of each colour family; every NPC 2 trâm of random colours */
  const TR=Object.keys(BAL.dc.piece).filter(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==='tram'&&!WD_ITEMS[k].nt);
  const stock=()=>{const fams=[...new Set(TR.map(k=>BAL.dc.piece[k][0]))].filter(()=>rnd()<.3);S.inv=(S.inv||[]).filter(e=>!(e&&!e.bor&&!e.dcPrev&&!e.sc&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'));for(const f of fams){const k=TR.find(k=>BAL.dc.piece[k][0]===f);if(!(S.inv||[]).some(e=>e&&e.k===k))S.inv.push({k,from:'emp'})}
   for(const v of rivals)if(v&&!v.coop&&v.alive){v.inv=v.inv||[];if(v.inv.filter(e=>e&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram').length<2)for(let i=0;i<2;i++)v.inv.push({k:TR[Math.floor(rnd()*TR.length)],from:'emp'})}};
  stock();
  const F0=dcFestNow;let FK=null;dcFestNow=()=>FK?Object.assign({k:FK},FEST[FK]):F0();
  const FS=Object.keys(BAL.dc.fest).filter(k=>FEST[k]);
  const held=()=>{const o=[];for(const q of P()){const w=wdOf(q)||{};if(w.tram&&w.tram.bor&&w.tram.sc)o.push({q,e:w.tram,sl:1});for(const e of q.inv||[])if(e&&e.bor&&e.sc)o.push({q,e})}return o};
  for(let t=0;t<NT;t++){S.out=0;S.confined=0;S.dead=false;S.suc=90;used=0;if(t%12===0)stock();
   /* a festival code most tuần (each kind once a year: dcKey) */
   FK=null;if(rnd()<.6){const free=FS.filter(k=>S.dcNk!==`${S.year}-${k}`&&(S.dcF||{}).key!==`${S.year}-${k}`&&S.dcAk!==`${S.year}-${k}`);const miss=free.filter(k=>{const s=dcStat(S,k);return s&&s.miss});const L=miss.length&&rnd()<.85?miss:free;/* most often one she lacks: her gate borrows */if(L.length){FK=L[Math.floor(rnd()*L.length)];st.fest++;/* half the time her chest holds no trâm of her own (never a counted one): her gate must borrow */if(rnd()<.5)S.inv=S.inv.filter(e=>!(e&&!e.bor&&!e.dcPrev&&!e.sc&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'))}}
   /* disturbances while pieces are out */
   const H=held();
   if(H.length&&rnd()<.2){const h=H[Math.floor(rnd()*H.length)];const u=rivals.filter(v=>v&&!v.coop&&v!==h.q)[Math.floor(rnd()*10)];if(u&&h.q!==S){const w=wdOf(h.q);if(h.sl){w.tram=null;const pi=h.q.inv.findIndex(x=>x&&x.dcPrev);if(pi>=0){const pv=h.q.inv.splice(pi,1)[0];delete pv.dcPrev;w.tram=pv}}else h.q.inv.splice(h.q.inv.indexOf(h.e),1);dcInv(u).push(h.e);st.move++}}
   else if(H.length&&rnd()<.15){const h=H[Math.floor(rnd()*H.length)];if(h.q!==S){const w=wdOf(h.q);if(h.sl){w.tram=null;const pi=h.q.inv.findIndex(x=>x&&x.dcPrev);if(pi>=0){const pv=h.q.inv.splice(pi,1)[0];delete pv.dcPrev;w.tram=pv}}else h.q.inv.splice(h.q.inv.indexOf(h.e),1);ilS().box.push({e:h.e,at:'nvp',why:'scan',own:h.q.id,w:0});st.box++}}
   /* jlost «thất lạc» on a holder whose chest has a borrowed piece (the same loLose for everyone; her chest narrowed to that piece as jcoopworld famApply does) */
   {const h=held().find(h=>!h.sl);if(h&&rnd()<.7&&typeof loLose==='function'){const all=h.q.inv;h.q.inv=[h.e];let c=null;try{c=loLose(h.q,{cause:'srv'})}catch(x){}finally{h.q.inv=c?all.filter(x=>x!==h.e):all}st.lose=(st.lose||0)+1;if(c)st.lost=(st.lost||0)+1}}
   if(rnd()<.1){const ids=Object.keys(BAL.dc.who).filter(k=>/^c/.test(k));S.pid=ids[Math.floor(rnd()*ids.length)];st.pid++}
   {const w=wdOf(S);if(w.tram&&w.tram.bor&&rnd()<.5){S.inv.push(w.tram);w.tram=null;st.off++}}/* she takes the borrowed trâm off (dress change in Tư trang) */
   /* r4b (F1): the Hội phối đồ loan road (the contest announced: month 4 / 10) and the «Cho mượn» visit (j68g borrowDress) — both through dcBorrow */
   try{const s=tsS();if(!s.dress){const m=S.month<4?4:S.month<10?10:16;const ths=Object.keys(TS_THEME);s.dress={th:ths[Math.floor(rnd()*ths.length)],m:(m-1)%12+1,y:S.year+(m>12?1:0)}}
    if(!s.borrow&&rnd()<.5){const T=TS_THEME[s.dress.th];const L=rivals.filter(v=>v&&!v.coop&&v.alive&&!v.out);const v=L[Math.floor(rnd()*L.length)];const k=T.tags[Math.floor(rnd()*T.tags.length)];
     if(v&&IT[k]){S.inv=S.inv.filter(e=>!(e&&e.k===k&&!e.bor&&!e.sc));v.inv=v.inv||[];if(!v.inv.some(e=>e&&e.k===k))v.inv.push({k,from:'emp'})}const o=tsBorrowOpts(s.dress.th).find(o=>!o.tsDis);if(o)o.go()}}catch(x){bad.push({wk:dcWk(),go:'ts '+String(x).slice(0,160)})}
   try{if(rnd()<.25){const L=rivals.filter(v=>v&&!v.coop&&v.alive&&!v.out);const v=L[Math.floor(rnd()*L.length)];const vi=Math.floor(rnd()*3);
     const kd={0:Object.keys(IT).find(k=>IT[k].kd==='Y phục'),1:'dancoc',2:Object.keys(IT).find(k=>IT[k].kd==='Trâm cài')}[vi];
     const has=S.inv.some(e=>e&&!e.bor&&!e.w&&!e.h&&IT[e.k]&&(vi===0?itm(e.k).kd==='Y phục':vi===1?e.k==='dancoc':(itm(e.k).kd==='Trâm cài'||itm(e.k).sl==='hair')));if(!has&&kd)S.inv.push({k:kd,from:'emp'});
     const d=v&&PEND.e68borrowDress({a0:v.id,vi});if(d&&d.o)d.o[rnd()<.5?0:1].go()}}catch(x){bad.push({wk:dcWk(),go:'ev '+String(x).slice(0,160)})}
   const n0=Q.length;try{endTurn()}catch(x){bad.push({wk:dcWk(),err:String(x).slice(0,200)})}
   /* her answers: the gate takes a loan road when one is offered, the NPC ask is lent 80 % */
   for(let pass=0;pass<3;pass++)for(const q of Q.splice(0)){/* r4b: the contest itself — away (finish → the contest loan goes home) or the dialog dropped (the loan book brings it home after its tuần) */if(q&&/^Hội phối đồ ·/.test(q.t||'')&&Array.isArray(q.opts)){const o=q.opts.find(o=>/^Cáo bệnh/.test(o.n));st.tsHeld=(st.tsHeld||0)+1;if(o&&rnd()<.6){try{o.go()}catch(x){bad.push({wk:dcWk(),go:'tsHold '+String(x).slice(0,160)})}st.tsAway=(st.tsAway||0)+1}continue}
    if(q&&/^Hội phối đồ: báo đề/.test(q.t||'')&&Array.isArray(q.opts)){const o=q.opts.find(o=>/^Mượn /.test(o.n)&&!o.tsDis);if(o)try{o.go()}catch(x){}continue}
    if(!q||q.ev!=='dc'||!Array.isArray(q.opts))continue;/* a road gone meanwhile re-opens the gate (Q.unshift): up to 3 passes */let o=null;
    if(q.evId==='dc:ask')o=q.opts[rnd()<.8?0:1];else if(/^dc:/.test(q.evId)&&q.evId!=='dc:season'&&q.evId!=='dc:season0')o=q.opts.find(o=>/^Mượn /.test(o.n))||q.opts.find(o=>/^Cài /.test(o.n))||q.opts[0];
    if(/^dc:/.test(q.evId)&&q.evId!=='dc:ask'&&!/season/.test(q.evId)){st.gate=(st.gate||0)+1;if(q.opts.some(o=>/^Mượn /.test(o.n)))st.gm=(st.gm||0)+1;else (st.gx=st.gx||[]).length<4&&st.gx.push(q.opts.map(o=>o.n.slice(0,14)))}if(o&&o.go)try{o.go()}catch(x){bad.push({wk:dcWk(),go:String(x).slice(0,160)})}}
   /* the scan clears the queue each tuần: a dialog still holding a piece (a gift on its way, a found piece …) would be destroyed by the TEST, not the game — drop that tag */
   {const seen=new Set();const qw=(o,d)=>{if(!o||typeof o!=='object'||seen.has(o)||d>5)return;seen.add(o);if(typeof o.sc==='string'&&T[o.sc]&&o.k){delete T[o.sc];st.qd=(st.qd||0)+1}for(const k in o){const v=o[k];if(v&&typeof v==='object'&&v!==S&&!(v.id!=null&&v.name&&rivals.includes(v)))qw(v,d+1)}};for(const q of Q)qw(q,0)}
   Q.length=0;S.mg=null;FK=null;st.weeks++;check('t'+t);
   await new Promise(r=>setTimeout(r,0))}
  /* a tuần she dies: one loan each way, both come home in the death tuần */
  const dz={};{FK=null;S.dead=false;const v=rivals.find(v=>v&&!v.coop&&v.alive&&(v.inv||[]).some(e=>e&&!e.bor&&!e.dcPrev&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'));
   let mine=(S.inv||[]).find(e=>e&&!e.bor&&!e.dcPrev&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram');if(!mine){mine={k:TR[0],from:'emp'};S.inv.push(mine)}/* r4b: the visit loans may have her trâm out this tuần */const u=rivals.find(x=>x&&!x.coop&&x.alive&&x!==v);
   const theirs=v.inv.find(e=>e&&!e.bor&&!e.dcPrev&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram');dz.b=dcBorrow(S,v,theirs);dz.l=dcBorrow(u,S,mine);
   S.tuan=S.tuan===2?0:S.tuan+1;if(S.tuan===0)S.turn++;S.dead=true;dcTurn();S.dead=false;
   const M=census();dz.borHome=(M[theirs.sc]||[]).filter(place);dz.lendHome=(M[mine.sc]||[]).filter(place);dz.ok=dz.borHome.length===1&&dz.borHome[0].startsWith('v'+v.id)&&dz.lendHome.length===1&&dz.lendHome[0].startsWith('me')}
  /* an old save's key "me:<pid>" (before r4): the NPC still holds her piece under that key → it comes home */
  const old={};{const v=rivals.find(v=>v&&!v.coop&&v.alive);const e={k:TR[0],from:'emp',sc:'old1',bor:{from:'me:c99',due:dcWk()-1,id:'x:old'}};dcInv(v).push(e);T.old1={k:e.k,lender:'me'};dcReturn();const M=census();old.at=(M.old1||[]).filter(place);old.ok=old.at.length===1&&old.at[0].startsWith('me')}
  /* law 1: her off-season cost every tuần, as each NPC's (dcSeasonDue) */
  const sea={};{S.out=0;S.confined=0;S.dead=false;const w=wdOf(S);const y0=w.y;S.rank=4;S.month=6;S.tuan=1;const off=Object.keys(BAL.dc.season.y).find(k=>WD_ITEMS[k]&&!dcYSeasons(k).includes(dcSeason())&&WD_ITEMS[k].P<=wdPOf(S));
   w.y={k:off,src:'cap',nvp:1};const c=dcSeasonCost(S);sea.c=c;sea.d=[];for(let i=0;i<3;i++){S.danh=50;S.th=50;const d0=S.danh;Q.length=0;S.dcAk='x';dcWeek();sea.d.push(d0-S.danh);S.tuan=(S.tuan+1)%3;if(S.tuan===0){S.turn++;S.month=6}}
   sea.on=[dcHerOn(),dcOffSeason(S),dcSeasonRoad(S),off,S.rank,isSrv()];sea.ok=!!c.danh&&sea.d.every(x=>x===c.danh);w.y=y0;Q.length=0}
  const kind=x=>x.dcPrev?'dcPrev':x.stale?'stale':x.book?'book':x.err?'err':x.go?'go':'count';const by={};for(const x of bad)by[kind(x)]=(by[kind(x)]||0)+1;
  return {trc:(window.__trc||[]).slice(0,30),st,by,bad:['count','stale','book','err','go','dcPrev'].map(k=>bad.filter(x=>kind(x)===k).slice(0,3)).flat(),nbad:bad.length,tags:Object.keys(T).length,dz,old,sea}},NT);
 console.log(JSON.stringify(R.st));if(process.env.TRC)console.log('TRC',JSON.stringify(R.trc));
 ck(`≥ 2 bot years (${R.st.weeks} tuần, 36 a year) with real endTurn`,R.st.weeks>=72);
 ck(`many loans on every road (${R.st.loans}: her ${R.st.her} · she lends ${R.st.lend} · NPC↔NPC ${R.st.npc}; ${R.tags} pieces)`,R.st.her>=3&&R.st.lend>=3&&R.st.npc>=10);
 ck(`r4b: the Hội phối đồ loans (${R.st.w_ts||0}, contest dialogs ${R.st.tsHeld||0}, away ${R.st.tsAway||0}) and the «Cho mượn» visit loans (${R.st.w_ev||0}) went through the one loan rule`,(R.st.w_ts||0)>=3&&(R.st.w_ev||0)>=5);
 ck(`disturbances ran (moved ${R.st.move}, confiscated ${R.st.box}, «thất lạc» tried ${R.st.lose||0} (taken ${R.st.lost||0}), pid changed ${R.st.pid}, taken off ${R.st.off})`,R.st.move>0&&R.st.box>0&&R.st.pid>0&&(R.st.lose||0)>0);
 ck(`every lent piece in exactly ONE place every tuần, no loan / book line past due, no stale dcPrev (${R.nbad} bad ${JSON.stringify(R.by)})`,R.nbad===0,R.bad);
 ck('a tuần she dies: the piece she borrowed is the NPC\'s again, the piece she lent is hers again',R.dz.ok,R.dz);
 ck('an old save\'s "me:<pid>" key: the piece comes home to her',R.old.ok,R.old);
 ck('law 1: her off-season cost each tuần (as each NPC\'s), not once a month',R.sea.ok,R.sea);
 ck('no page errors',!errs.length,errs.slice(0,4));
 console.log(fail?`dresscode-loan-scan: ${fail} FAIL`:'dresscode-loan-scan: ALL PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
