/* npc-roads (review/npc-roads): NPC roads of jnroad.js (reports/npc-roads.md §6).
   A fast bot lives long lives (several origins) and checks for every NPC consort road:
   - origin/road valid (road = one of the 4 j67 premises of her origin; one father = one record: tt/dtq never shared with the player);
   - chapters walk in order .4 → .11 (only chapters registered in this build), each end has a sign and the road closes after the last;
   - a dead/out NPC's road is closed and never plays again; the rival is a real live person when a chapter plays;
   - at most one help hồi per NPC per life; its title names the person, the road and the chapter (Phụ tuyến, OD:L499);
   - one help quest played to the end (each option kind) feeds her next chapter (hb) and the j72 ledger;
   - no page errors. usage: node dev/test/npc-roads.js <url> [lives] [months] */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */
const [,,URL,NL,NM]=process.argv;const NLIV=+NL||3,MON=+NM||240;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,JSON.stringify(x).slice(0,900))};
 let ctx=null,p=null;/* a fresh page per life (one page over several long lives runs out of memory) */
 const open=async()=>{if(ctx)await ctx.close();ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});p=await ctx.newPage();p.setDefaultTimeout(0);await p.addInitScript(require('./lib/qdrain').init);/* headless month loop: __bot + answer the night choice (lib/qdrain.js) */
 p.on('pageerror',e=>errs.push(e.message.slice(0,300)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text().slice(0,300))});
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof nrMonth==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{document.getElementById('title').hidden=true;
  window.__life=(k,mons)=>{quiet=true;window.__forceOrigin=k;start();quiet=false;Q.length=0;if(!S||!S.origin)return{err:'boot'};
   const seen={},bad=[],offers={};let err=null,mon=0;
   for(;mon<mons;mon++){if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}
    const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){__qDrain();used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0;
    try{const q=q72();for(const c of q.ch.concat(q.a))if(/^nr_/.test(c.tid)){const id=c.ri;(offers[id]=offers[id]||new Set()).add(c.tid+':'+(c.p&&c.p.nn))}}catch(e){}
    for(const v of rivals){if(!v.nr)continue;const N=v.nr,s=seen[v.id]||(seen[v.id]={o:N.o,r:N.r,l:0,dead:0,x:0});
     if(N.l.length>s.l){const nl=N.l.slice(s.l);s.l=N.l.length;if(s.dead)bad.push([v.id,'played after death',nl]);if(s.x)bad.push([v.id,'played after close',nl]);if(s.out&&v.out)bad.push([v.id,'played in lãnh cung',nl])}
     /* fix: death closes her road, lãnh cung pauses it (a pardoned consort goes on) */
     if(!v.alive)s.dead=1;s.out=v.alive&&v.out?1:0;if(N.x)s.x=1}}
   const R=[];for(const v of rivals)if(v.nr)R.push({id:v.id,name:v.name,o:v.nr.o,r:v.nr.r,l:v.nr.l,x:v.nr.x,alive:v.alive&&!v.out,h:v.nr.h,hs:v.nr.hs,c:v.nr.c,
     valid:!!ARC67[v.nr.r]&&ARC67[v.nr.r].o===v.nr.o,chs:[4,5,6,7,8,9,10,11].filter(n=>nrCh(v.nr.r,n)),off:offers[v.id]?[...offers[v.id]]:[]});
   const logs=S.logs.filter(l=>/Tin trong cung/.test(l)).length;
   return{k,me:S.origin.k,myRoad:S.st&&S.st.f14&&S.st.f14.road,R,bad,err,mon,logs,save:JSON.stringify(rivals.map(v=>v.nr||null)).length,saveAll:(()=>{try{return JSON.stringify(S).length+JSON.stringify(rivals).length}catch(e){return -1}})()}}})};
 const ORG=(process.env.ORG||'tt,dtq,thd,muoi,td,ch,cn').split(',');/* ORG=pf (review/phutang-road): NPC roads around a Phù Tang player */
 for(let L=0;L<NLIV;L++){await open();const k=ORG[L%ORG.length];let R;for(let t=0;t<4;t++){R=await p.evaluate(([k,m])=>window.__life(k,m),[k,MON]);if(R&&R.err==='boot'){await p.waitForTimeout(5000);continue}break}
  if(!R.R){chk(`life ${L+1} ${k}: ran`,false,R);continue}
  console.log(`life ${L+1} origin ${R.me} road ${R.myRoad} · ${R.mon} months · NPC roads ${R.R.length} · news ${R.logs} · nr bytes ${R.save} / save ${R.saveAll}`);
  for(const x of R.R)console.log(`  ${x.name} ${x.o}/${x.r} [${x.chs.join(',')}] played ${x.l.map(z=>z[0]+(z[1]>0?'+':z[1]<0?'-':'=')).join(' ')}${x.x?' CLOSED':''}${x.alive?'':' (gone)'} h=${x.h} hs=${x.hs} riv=${x.c} off=${x.off.join(',')}`);
  chk(`life ${L+1}: no bot error`,!R.err,R.err);
  chk(`life ${L+1}: every NPC road is a road of her origin`,R.R.every(x=>x.valid),R.R.filter(x=>!x.valid));
  chk(`life ${L+1}: one father = one record (tt/dtq not shared with the player)`,!R.R.some(x=>['tt','dtq'].includes(x.o)&&x.o===R.me),R.R.map(x=>x.o));
  chk(`life ${L+1}: chapters played in order, each a registered chapter`,R.R.every(x=>x.l.every((z,i)=>x.chs.includes(z[0])&&(i===0||z[0]>x.l[i-1][0]))),R.R.map(x=>[x.r,x.l]));
  chk(`life ${L+1}: a road closes after its last chapter`,R.R.every(x=>!x.x||!x.alive||x.l.length&&x.l[x.l.length-1][0]===x.chs[x.chs.length-1]),R.R.filter(x=>x.x).map(x=>[x.r,x.l,x.chs]));
  chk(`life ${L+1}: no road plays after death/close or in lãnh cung`,!R.bad.length,R.bad);
  chk(`life ${L+1}: at most one help hồi per NPC`,R.R.every(x=>x.off.length<=1),R.R.filter(x=>x.off.length>1));
  chk(`life ${L+1}: long life walks some NPC road to its end`,MON<200||R.R.some(x=>x.x&&x.alive),R.R.map(x=>[x.r,x.l.length]))}
 await open();
 /* one help quest played to the end, each kind: title names person + road + chapter; ok → hb>0; bad → hb<0 */
 const H=await p.evaluate(()=>{window.__sqoff=1;/* sideq-trim: content test of the help quests, any asker (the rank gate has its own test, sideq-optscan) */quiet=true;window.__forceOrigin='muoi';start();quiet=false;Q.length=0;const out=[];
  const kinds=Object.keys(T72I).filter(t=>/^nr_/.test(t));for(const tid of kinds)for(const oi of [0,2]){
   const L=liveRivals(false);const v=L[0],w=L[1];if(!v||!w)return{err:'no rivals'};v.nr=null;nrInit(v);v.nr.c=w.id;S.bac=999;S.suc=90;used=0;
   const x=q72Make(T72I[tid],q72A('rv',v.id));if(!x)return{err:'make '+tid};x.bk='rv';x.bi=w.id;x.p={nr:v.nr.r,nn:v.nr.n};const q=q72();q.a.push(x);const X=q72X(x);
   const title=plain(q72Title(X));let tries=0;while(q.a.includes(x)&&tries++<12){used=0;S.suc=90;Q.length=0;/* an NPC popup (jagent) must not block the step */q72Do(x.u,oi)}
   out.push({tid,oi,title,hb:v.nr.hb,hs:v.nr.hs,done:!q.a.includes(x),hist:q.h[0]&&q.h[0].res})}
  /* gain-and-loss scan (OD:L582/L266): every option costs something and names a real loss; no option without effect */
  const scan=[];for(const tid of kinds)for(const st of T72I[tid].s)for(const o of(st.ch||[])){const c=Object.keys(o.c||{}).filter(k=>o.c[k]);const loss=Object.keys(o.l||{}).length||o.lx||o.to==='bad';if(!c.length||!loss)scan.push(tid+' «'+o.n+'»')}
  return{out,str:String(T72I.nr_emp.t),scan,nopt:kinds.reduce((a,t)=>a+T72I[t].s.reduce((b,st)=>b+(st.ch||[]).length,0),0)}});
 if(H.err)chk('help quests: setup',false,H.err);else{for(const z of H.out)console.log('  help',z.tid,'opt',z.oi,'→',z.hist,'hb',z.hb,'|',z.title);
  chk('help: title names person, road and chapter',H.out.every(z=>/: «.+» · Chương \d+ «.+»/.test(z.title)),H.out.map(z=>z.title));
  chk('help: option 0 played to the end feeds her chapter (hb>0) or fails honestly',H.out.filter(z=>z.oi===0).every(z=>z.done&&(z.hb>0||z.hist==='fail')),H.out.filter(z=>z.oi===0));
  chk('help: betrayal makes her chapter harder (hb<0)',H.out.filter(z=>z.oi===2).every(z=>z.done&&z.hb<0&&z.hist==='bad'),H.out.filter(z=>z.oi===2));
  console.log('  gain-and-loss scan:',H.nopt,'options,',H.scan.length,'without cost or loss');chk('help: every option has a cost and a real loss',!H.scan.length,H.scan);
  chk('help: title text never prints code',!/=>|function/.test(H.str),H.str)}
 chk('no page errors',!errs.length,errs.slice(0,8));
 const nb=ok.filter(x=>!x[1]).length;console.log(`npc-roads: ${ok.length-nb}/${ok.length} pass`);await b.close();process.exit(nb?1:0)})();
