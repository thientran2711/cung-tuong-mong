/* npc-roads U3 (review/npc-roads): men roads of jnroadm.js (ROAD_MAP §4.10 proposal; reports/npc-roads.md).
   - every real man (S.men by role, court men, staff eunuchs, house heads, sons of NPC consorts ≥ BAL.nroad.men.kidAge) lives one template of
     HIS kind; chapters .4 → .11 in order; closes after .11; every end has a tag; the player's father, the m96 man and her own children never get one;
   - real fields stay in range (loyal, af, house pow, prince fond/tal/hp); co-op guest plays nothing (host only);
   - a man's help hồi (kinds man/doc/eun/ksp/off): title names him + road + chapter; he speaks as thần / nô tài / bản vương and calls the player
     tiểu chủ / nương nương; option 0 feeds his chapter or fails honestly, betrayal hb<0;
   - his road line on his card (manCard); no page errors. usage: node dev/test/npc-roads-men.js <url> [lives] [months] */
const {chromium}=require('playwright');
const [,,URL,NL,NM]=process.argv;const NLIV=+NL||2,MON=+NM||120;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log((c?'ok   ':'FAIL ')+n);if(!c)console.error('  ',JSON.stringify(x).slice(0,900))};
 let ctx=null,p=null;
 const open=async()=>{if(ctx)await ctx.close();ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});p=await ctx.newPage();p.setDefaultTimeout(0);
  p.on('pageerror',e=>errs.push(e.message.slice(0,300)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text().slice(0,300))});
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof nrMenL==='function',null,{timeout:0});await p.waitForTimeout(1500);
  await p.evaluate(()=>{document.getElementById('title').hidden=true;
   window.__boot=k=>{for(let t=0;t<3;t++){quiet=true;window.__forceOrigin=k;start();quiet=false;Q.length=0;if(S&&S.origin)return true}return false};
   window.__life=(k,mons)=>{if(!__boot(k))return{err:'boot'};let err=null,mon=0;const seen=new Map(),bad=[];
    for(;mon<mons;mon++){if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}
     const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0;
     for(const e of nrMenL())if(e.p.nr)seen.set(e.p,{k:e.k,g:e.g,n:e.n})}
    const M=[...seen.entries()].map(([p,z])=>({n:z.n,k:z.k,g:z.g,r:p.nr.r,l:p.nr.l,x:p.nr.x,e:p.nr.e,valid:!!NRM[p.nr.r]&&NRM[p.nr.r].k===z.k}));
    /* never: the player's father, the m96 man, the player's children */
    const T=trS();const dad=Object.values(T.H).find(h=>h.dadOf==='me');if(dad&&dad.nr)bad.push('player father has a road');
    (S.men||[]).forEach(m=>{if(m.id==='m96'&&m.nr)bad.push('m96 has a road')});(S.kids||[]).forEach(kd=>{if(kd.nr)bad.push('own child has a road')});
    const rng=[];(S.men||[]).forEach(m=>{if(m.loyal<0||m.loyal>100)rng.push(['loyal',m.name,m.loyal])});Object.values(T.H).forEach(h=>{if(h.pow<0||h.pow>100)rng.push(['pow',h.name,h.pow])});
    allKids().forEach(([kd])=>{if(kd.nr&&kd.alive)for(const f of['fond','tal','hp'])if(kd[f]<0||kd[f]>100)rng.push([f,kd.name,kd[f]])});
    const logs=S.logs.filter(l=>/Tin trong (cung|triều) · /.test(l)).length;
    return{k,M,bad,rng,err,mon,logs,bytes:JSON.stringify(nrMenL().map(e=>e.p.nr||null)).length}}})};
 for(let L=0;L<NLIV;L++){await open();const k=['tt','muoi','dtq'][L%3];const R=await p.evaluate(([k,m])=>window.__life(k,m),[k,MON]);
  if(!R.M){chk(`life ${L+1}: ran`,false,R);continue}
  const by={};R.M.forEach(x=>{by[x.g]=(by[x.g]||0)+1});
  console.log(`life ${L+1} ${k} · ${R.mon} months · men roads ${R.M.length} ${JSON.stringify(by)} · news ${R.logs} · bytes ${R.bytes}`);
  for(const x of R.M)console.log(`  ${x.n} [${x.k}] ${x.r} ${x.l.map(z=>z[0]+(z[1]>0?'+':z[1]<0?'-':'=')).join(' ')}${x.x?' CLOSED':''} ${x.e?'— '+x.e:''}`);
  chk(`life ${L+1}: no bot error`,!R.err,R.err);
  chk(`life ${L+1}: every man lives a template of his kind`,R.M.length>0&&R.M.every(x=>x.valid),R.M.filter(x=>!x.valid));
  chk(`life ${L+1}: men, court men, house heads all get roads`,['men','court','off'].every(g=>by[g]>0),by);
  chk(`life ${L+1}: chapters .4→.11 in order, close after .11`,R.M.every(x=>x.l.every((z,i)=>z[0]===4+i)&&(!x.x||x.l.length===8)),R.M.map(x=>[x.r,x.l]));
  chk(`life ${L+1}: every played chapter has an ending tag`,R.M.every(x=>!x.l.length||x.e),R.M.filter(x=>x.l.length&&!x.e));
  chk(`life ${L+1}: no road for her father, the m96 man, her own children`,!R.bad.length,R.bad);
  chk(`life ${L+1}: real fields stay in range`,!R.rng.length,R.rng)}
 await open();
 const H=await p.evaluate(()=>{if(!__boot('muoi'))return{err:'boot'};const out=[];const kinds=Object.keys(T72I).filter(t=>/^nr_/.test(t));
  const L=nrMenL();const pickE=(g,f)=>L.find(e=>e.g===g&&(!f||f(e)));
  const E=[pickE('men',e=>e.p.role!=='Vương gia'),pickE('men',e=>e.p.role==='Vương gia'),pickE('court',e=>e.a&&e.a[0]==='doc'),pickE('court',e=>e.a&&e.a[0]==='eun'),pickE('court',e=>e.a&&e.a[0]==='ksp'),pickE('off')].filter(Boolean);
  for(const e of E)for(const tid of kinds)for(const oi of [0,2]){e.p.nr=null;nrMenInit(e);const riv=nrMenRival(e);S.bac=999;S.suc=90;used=0;
   const A=q72A(e.a[0],e.a[1]);if(!A){out.push({tid,k:e.a[0],err:'actor'});continue}const x=q72Make(T72I[tid],A);if(!x){out.push({tid,k:e.a[0],err:'make'});continue}
   if(e.g==='men'&&riv){x.bk='man';x.bi=riv.id}else if(e.g==='off'&&riv){x.bk='off';x.bi=riv}else{const v=liveRivals(false)[0];if(v){x.bk='rv';x.bi=v.id}}
   x.p={nr:e.p.nr.r,nn:e.p.nr.n};const q=q72();q.a.push(x);const X=q72X(x);const title=plain(q72Title(X));const intro=plain(typeof X.T.h==='function'?X.T.h(X):X.T.h);
   let tries=0;while(q.a.includes(x)&&tries++<12){used=0;S.suc=90;q72Do(x.u,oi)}
   out.push({tid,k:e.a[0],vg:e.p.role==='Vương gia',oi,title,intro,hb:e.p.nr.hb,done:!q.a.includes(x),hist:q.h[0]&&q.h[0].res})}
  let hz=null;try{const v=liveRivals(false)[0];const kd=mkKid('m',nrB().men.kidAge);v.kids=v.kids||[];v.kids.push(kd);const e=nrMenL().find(z=>z.p===kd);
   if(e){nrMenInit(e);const f0=[kd.fond,kd.tal,kd.hp];for(let i=0;i<8;i++){kd.nr.t=0;nrMenMonth(0)}hz={r:kd.nr.r,k:NRM[kd.nr.r]&&NRM[kd.nr.r].k,l:kd.nr.l,x:kd.nr.x,f0,f1:[kd.fond,kd.tal,kd.hp]}}else hz={err:'no entry'}}catch(x){hz={err:x.message}}
  let card='';try{const m=(S.men||[]).find(m=>m.id!=='m96');nrMenInit(L.find(e=>e.p===m));m.nr.l=[[4,1]];m.nr.e='x';try{k61Know(m,'meet',true)}catch(e){}card=manCard(m)}catch(e){card='ERR '+e.message}
  /* co-op guest: nothing plays */
  let guest=-1;try{const e=L[0];e.p.nr=null;nrMenInit(e);e.p.nr.t=0;const n0=e.p.nr.l.length;window.COOPW={on:1,seat:'b'};nrMonth();guest=e.p.nr.l.length-n0;window.COOPW=null}catch(x){guest='ERR '+x.message;window.COOPW=null}
  return{out,card:/Tuyến truyện: «/.test(card),goi:tsGoi(S),guest,hz}});
 if(H.err)chk('forced: setup',false,H.err);else{
  for(const z of H.out.filter(z=>z.oi===0&&z.tid==='nr_emp'))console.log('  help',z.k,'|',z.title,'|',z.intro);
  const G=H.goi.charAt(0).toUpperCase()+H.goi.slice(1);
  chk('men help: every quest made',H.out.length>0&&H.out.every(z=>!z.err),H.out.filter(z=>z.err));
  chk('men help: title names him, road and chapter',H.out.every(z=>/: «.+» · Chương \d+ «.+»/.test(z.title)),H.out.map(z=>z.title));
  chk('men help: voice thần / nô tài / bản vương + '+G+', never tỷ/muội/nô tỳ',H.out.every(z=>(z.k==='eun'||z.k==='ksp'?/nô tài|Nô tài/:z.vg?/bản vương|Bản vương/:/thần|Thần/).test(z.intro)&&z.intro.includes(G)&&!/tỷ tỷ|muội muội|nô tỳ/i.test(z.intro)),H.out.map(z=>[z.k,z.intro]));
  chk('men help: option 0 feeds his chapter or fails honestly',H.out.filter(z=>z.oi===0).every(z=>z.done&&(z.hb>0||z.hist==='fail')),H.out.filter(z=>z.oi===0));
  chk('men help: betrayal makes his chapter harder',H.out.filter(z=>z.oi===2).every(z=>z.done&&(z.hb<0&&z.hist==='bad'||!z.title)),H.out.filter(z=>z.oi===2&&!(z.hb<0)));
  console.log('  prince:',JSON.stringify(H.hz));
  chk('a son of an NPC consort lives a prince road .4→.11 with real fond/tal/hp moves',H.hz&&H.hz.k==='hz'&&H.hz.l.length===8&&H.hz.x&&H.hz.f1.every(v=>v>=0&&v<=100)&&H.hz.f1.join()!==H.hz.f0.join(),H.hz);
  chk('men road line on his card (manCard, once he is known)',H.card,H.card);
  chk('co-op guest plays no men chapter (host only)',H.guest===0,H.guest)}
 chk('no page errors',!errs.length,errs.slice(0,8));
 const nb=ok.filter(x=>!x[1]).length;console.log(`npc-roads-men: ${ok.length-nb}/${ok.length} pass`);await b.close();process.exit(nb?1:0)})();
