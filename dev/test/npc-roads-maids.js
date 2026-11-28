/* npc-roads U2 (review/npc-roads): maid roads of jnroad.js (reports/npc-roads.md, NEXT U2).
   - every maid (staff maids of every house + the player's trusted maid) lives a cnv road (one of the 4 cnv premises), chapters in order,
     closes after the last; her rival is a maid of ANOTHER house; her mistress is her real mistress;
   - a maid raised to consort (j8 sendMaid → j88 f88Carry) keeps her road state and goes on as a cn road (same log, pr = old road);
   - a maid's help hồi: title names her + road + chapter, she speaks as «nô tỳ» and calls the player tiểu chủ / nương nương (VANPHONG §2);
     option 0 feeds her chapter (hb>0) or fails honestly, betrayal hb<0; every option has a cost and a real loss;
   - her road line shows on her card in the Kẻ hầu tab; no page errors. usage: node dev/test/npc-roads-maids.js <url> [lives] [months] */
const {chromium}=require('playwright');
const [,,URL,NL,NM]=process.argv;const NLIV=+NL||2,MON=+NM||120;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log((c?'ok   ':'FAIL ')+n);if(!c)console.error('  ',JSON.stringify(x).slice(0,900))};
 let ctx=null,p=null;
 const open=async()=>{if(ctx)await ctx.close();ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});p=await ctx.newPage();p.setDefaultTimeout(0);await p.addInitScript(require('./lib/qdrain').init);/* headless month loop: __bot + answer the night choice (lib/qdrain.js) */
  p.on('pageerror',e=>errs.push(e.message.slice(0,300)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text().slice(0,300))});
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof nrMaidL==='function',null,{timeout:0});await p.waitForTimeout(1500);
  await p.evaluate(()=>{document.getElementById('title').hidden=true;
   window.__boot=k=>{for(let t=0;t<3;t++){quiet=true;window.__forceOrigin=k;start();quiet=false;Q.length=0;if(S&&S.origin)return true}return false};
   window.__life=(k,mons)=>{if(!__boot(k))return{err:'boot'};const seen=new Map(),bad=[];let err=null,mon=0;
    let eun0=new Set();/* eunuchs already on the staff at the previous month's end: a eunuch who joins this month gets his road at the next month tick (jnroad nrMMonth) */
    for(;mon<mons;mon++){if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}if(mon===mons-1)eun0=new Set(nrServL('eunuch'));
     const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){__qDrain();used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0;
     for(const s of nrMaidL()){if(!s.nr)continue;const z=seen.get(s)||{l:0,mis:nrMis(s)};seen.set(s,z);if(s.nr.l.length>z.l){z.l=s.nr.l.length;
       /* r2: a maid can change house between chapters (transfer, mistress gone); the rival is checked as the next chapter reads it (nrMRival recasts a stale one) */if(s.nr.c!=null&&!s.nr.x){const r=nrMRival(s);if(r&&nrMis(r)===nrMis(s))bad.push([s.name,'rival same house'])}}}}
    const M=[...seen.keys()].map(s=>({name:s.name,o:s.nr.o,r:s.nr.r,l:s.nr.l,x:s.nr.x,own:nrMis(s)===S,valid:!!ARC67[s.nr.r]&&ARC67[s.nr.r].o==='cnv',chs:[4,5,6,7,8,9,10,11].filter(n=>nrCh(s.nr.r,n))}));
    const raised=rivals.filter(v=>v.nr&&v.nr.pr).map(v=>({name:v.name,o:v.nr.o,r:v.nr.r,pr:v.nr.pr,l:v.nr.l,ok:ARC67[v.nr.r]&&ARC67[v.nr.r].o==='cn'}));
    const logs=S.logs.filter(l=>/Tin trong cung · [^·]*người hầu/.test(l)).length;
    const eun=nrServL('eunuch').map(s=>({n:s.name,r:s.nr&&s.nr.r,l:s.nr?s.nr.l.length:-1,ok:!!(s.nr&&NRM[s.nr.r]&&NRM[s.nr.r].k==='eun')||(!s.nr&&!eun0.has(s)),fresh:!eun0.has(s)||undefined}));
    return{k,M,raised,bad,err,mon,logs,eun,maids:nrMaidL().length,bytes:JSON.stringify(nrMaidL().map(s=>s.nr||null)).length}}})};
 for(let L=0;L<NLIV;L++){await open();const k=['muoi','thd','tt'][L%3];const R=await p.evaluate(([k,m])=>window.__life(k,m),[k,MON]);
  if(!R.M){chk(`life ${L+1}: ran`,false,R);continue}
  console.log(`life ${L+1} ${k} · ${R.mon} months · maids now ${R.maids} · maid roads seen ${R.M.length} · maid news ${R.logs} · bytes ${R.bytes} · raised ${R.raised.length}`);
  for(const x of R.M.slice(0,12))console.log(`  ${x.name}${x.own?' (own)':''} ${x.r} [${x.chs.join(',')}] ${x.l.map(z=>z[0]+(z[1]>0?'+':z[1]<0?'-':'=')).join(' ')}${x.x?' CLOSED':''}`);
  for(const x of R.raised)console.log(`  raised ${x.name} ${x.pr} → ${x.r} ${x.l.map(z=>z[0]).join(' ')}`);
  chk(`life ${L+1}: no bot error`,!R.err,R.err);
  chk(`life ${L+1}: every maid road is a cnv road`,R.M.length>0&&R.M.every(x=>x.valid&&x.o==='cnv'),R.M.filter(x=>!x.valid));
  chk(`life ${L+1}: maid chapters in order, registered`,R.M.every(x=>x.l.every((z,i)=>x.chs.includes(z[0])&&(i===0||z[0]>x.l[i-1][0]))),R.M.map(x=>[x.r,x.l]));
  chk(`life ${L+1}: some maid chapters played`,R.M.some(x=>x.l.length>0),R.M.length);
  chk(`life ${L+1}: rival maid always from another house`,!R.bad.length,R.bad);
  chk(`life ${L+1}: staff eunuchs live «Từ tiểu thái giám đi lên» (U3 template on the servant engine)`,R.eun.length>0&&R.eun.every(x=>x.ok)&&R.eun.some(x=>x.l>0),R.eun);
  chk(`life ${L+1}: raised maids go on as cn roads`,R.raised.every(x=>x.ok&&x.o==='cn'),R.raised)}
 await open();
 const H=await p.evaluate(()=>{window.__sqoff=1;/* sideq-trim: content test of the help quests, any asker (the rank gate has its own test, sideq-optscan) */if(!__boot('muoi'))return{err:'boot'};const out=[];
  /* forced raise: the trusted maid with two chapters behind her is sent to serve the night and raised */
  const m=S.maid;nrMInit(m);m.nr.l=[[4,1],[5,-1]];m.nr.n=6;const n0=rivals.length;let txt='';for(let t=0;t<40&&rivals.length===n0;t++){S.maid.nr=S.maid.nr||JSON.parse(JSON.stringify(m.nr));const mm=S.maid;mm.nr=m.nr;txt=sendMaid(S)}
  const nv=rivals.length>n0?rivals[rivals.length-1]:null;const raise=nv?{o:nv.nr&&nv.nr.o,r:nv.nr&&nv.nr.r,pr:nv.nr&&nv.nr.pr,l:nv.nr&&nv.nr.l,n:nv.nr&&nv.nr.n,cn:!!(nv.nr&&ARC67[nv.nr.r]&&ARC67[nv.nr.r].o==='cn')}:null;
  /* help quests from her own staff maid and from another house's maid */
  const own=S.staff.find(s=>s.role==='maid');const oth=allServ().find(s=>s.role==='maid'&&ownerOf(s)!==S);const kinds=Object.keys(T72I).filter(t=>/^nr_/.test(t));
  for(const [s,rk] of [[own,'sv'],[oth,'rsv'],[S.maid,'maid']]){if(!s)continue;for(const tid of kinds)for(const oi of [0,2]){s.nr=null;nrMInit(s);const r=nrMaidL().find(x=>x!==s&&nrMis(x)!==nrMis(s));
    S.bac=999;S.suc=90;used=0;const x=q72Make(T72I[tid],q72A(rk,rk==='maid'?null:s.sid));if(!x){out.push({tid,rk,err:'make'});continue}
    if(r){const kk=r===S.maid?['maid',null]:nrMis(r)===S?['sv',r.sid]:['rsv',r.sid];x.bk=kk[0];x.bi=kk[1]}x.p={nr:s.nr.r,nn:s.nr.n};const q=q72();q.a.push(x);const X=q72X(x);
    const title=plain(q72Title(X));const intro=plain(typeof X.T.h==='function'?X.T.h(X):X.T.h);let tries=0;while(q.a.includes(x)&&tries++<12){used=0;S.suc=90;Q.length=0;/* an NPC popup (jagent) must not block the step */q72Do(x.u,oi)}
    out.push({tid,rk,oi,title,intro,hb:s.nr.hb,done:!q.a.includes(x),hist:q.h[0]&&q.h[0].res})}}
  /* her road line on the Kẻ hầu card */
  let card='';try{tab='staff';if(own){own.nr.l=[[4,1]];own.nr.e='x'}card=staffTabHTML()}catch(e){card='ERR '+e.message}
  return{raise,txt,out,card:/Tuyến truyện: «/.test(card),goi:tsGoi(S)}});
 if(H.err)chk('forced: setup',false,H.err);else{
  console.log('  raise:',JSON.stringify(H.raise));
  chk('raised maid keeps her road log and goes on as cn from her next chapter',H.raise&&H.raise.cn&&H.raise.o==='cn'&&H.raise.l.length===2&&H.raise.pr&&(H.raise.n===0||H.raise.n>=6),H.raise);
  for(const z of H.out.filter(z=>z.oi===0).slice(0,3))console.log('  help',z.rk,z.tid,'|',z.title,'|',z.intro);
  chk('maid help: every quest made',H.out.every(z=>!z.err),H.out.filter(z=>z.err));
  chk('maid help: title names her, road and chapter',H.out.every(z=>/: «.+» · Chương \d+ «.+»/.test(z.title)),H.out.map(z=>z.title));
  chk('maid help: she says nô tỳ and calls the player '+H.goi+' (capitalised), never tỷ/muội',H.out.every(z=>/nô tỳ|Nô tỳ/.test(z.intro)&&z.intro.includes(H.goi.charAt(0).toUpperCase()+H.goi.slice(1))&&!/tỷ tỷ|muội muội/i.test(z.intro)),H.out.map(z=>z.intro));
  chk('maid help: option 0 feeds her chapter or fails honestly',H.out.filter(z=>z.oi===0).every(z=>z.done&&(z.hb>0||z.hist==='fail')),H.out.filter(z=>z.oi===0));
  chk('maid help: betrayal makes her chapter harder',H.out.filter(z=>z.oi===2).every(z=>z.done&&z.hb<0&&z.hist==='bad'),H.out.filter(z=>z.oi===2));
  chk('maid road line on her Kẻ hầu card',H.card,H.card)}
 chk('no page errors',!errs.length,errs.slice(0,8));
 const nb=ok.filter(x=>!x[1]).length;console.log(`npc-roads-maids: ${ok.length-nb}/${ok.length} pass`);await b.close();process.exit(nb?1:0)})();
