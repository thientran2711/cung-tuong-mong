/* road-cut (review/f14role-inherit, CNVSTALL 27/11): a full road CUT SHORT — its next chapters cannot cast (the person they need is gone:
   cnv_chu's mistress dead / in the cold palace, a road rival nobody can replace) — must not close the 14-chapter frame early.
   Bug (road-full cnv_chu, 1 of 4 runs): mistress gone after ch.7 → cnv_chu_8..11 cast false; every shared arc is ok:nsrv67 so a maid got no
   filler; jst14 walked into "end:12" without jend14 eg12 (maid → ms:len14), and hau14/ke14 are nsrv too → S.st.ch.all at ch.7, no origin ending.
   For EVERY full road (ROAD14 + rdFull), one fresh life of its origin with that road (ctm-arcs history, as road-full), the frame is put at the
   end of chapter <CUT> (default 7; c.i on st:<road>_<CUT>, S.st.f14.re = that chapter), every later road chapter's cast() returns false, and
   chAdvance67 is called chapter after chapter (each started chapter is closed at once). Checks per road:
   1) the frame does not close at <CUT>: chapter <CUT>+1 opens;
   2) the origin ending is told once the frame has passed the road (S.st.ch.fin, jroad rdFinale fallback);
   3) the frame still reaches chapter 14 before S.st.ch.all (numbers 1..14 kept, shared arcs or the origin's own premises fill);
   4) a maid's chapter 12 is «Từ kẻ hầu thành tiểu chủ» (ms:len14) when she is still a maid;
   5) no page errors.
   usage: node dev/test/road-cut.js <url> [cut=7] [roads comma list]   (one browser, about 1–2 min for every road)
   MUTATE=fill: f14Shared without the origin-premise fallback → the maid roads must FAIL; MUTATE=eg12: eg12 never picks → must FAIL */
const {chromium}=require('playwright');
const [,,URL,CUTS,ONLY]=process.argv;const CUT=+CUTS||7;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.log('FAIL '+n+' '+JSON.stringify(x).slice(0,600))};
 let p;const boot=async()=>{if(p)await p.context().close();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});p=await ctx.newPage();p.setDefaultTimeout(0);
  await p.addInitScript(()=>{window.__bot=1});p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof ROAD14==='object'&&typeof rdFull==='function',null,{timeout:0});await p.waitForTimeout(1200);
  await p.evaluate(()=>{document.getElementById('title').hidden=true});
  if(process.env.MUTATE==='fill')await p.evaluate(()=>{f14Shared=function(E){const c=S.st.ch;const ids=arcIds67("*").filter(id=>!c.usedS.includes(id)&&arcOk67(ARC67[id]));if(!ids.length)return false;const id=choose67("*",ids);const B=newThread67(id,"m");if(!B)return false;c.usedS.push(id);histAdd67("*",id);chStartArc67(B,E);return true}});
  if(process.env.MUTATE==='eg12')await p.evaluate(()=>{eg12=()=>"end:12"})};await boot();
 const roads=(await p.evaluate(()=>Object.keys(ROAD14).filter(r=>rdFull(r)))).filter(r=>!ONLY||ONLY.split(',').includes(r));
 const T={};
 for(const rd of roads){const R=await p.evaluate(([rd,CUT])=>{const k=ARC67[rd]&&ARC67[rd].o&&ARC67[rd].o!=='rd'?ARC67[rd].o:rd.split('_')[0];
   quiet=true;try{localStorage.clear();localStorage.setItem('ctm-arcs',JSON.stringify({[k]:Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==rd)}));localStorage.setItem('ctm-tm96','1')}catch(e){}
   window.__forceOrigin=k;start();quiet=false;Q.length=0;if(!S||!S.st||!S.st.f14)return{rd,err:'no f14'};const c=S.st.ch,f=S.st.f14;
   if(f.rd!==rd)return{rd,skip:'road not rolled ('+f.road+')'};
   const j=c.plan.indexOf('st:'+ROAD14[rd][CUT]);if(j<0)return{rd,err:'no slot'};
   /* the frame at the end of chapter CUT: the road ran .4..CUT */
   c.i=j;c.n=CUT;f.r0=1;c.pool=c.pool.filter(x=>x!==rd);f.re={n:CUT,end:'mid',k:0};for(let n=BAL.road.first-1;n<=CUT;n++){const id=n===BAL.road.first-1?rd:ROAD14[rd][n];c.past.push({a:id,n:n,k:0,tag:'(thử) '+ARC67[id].t});f.ends[n]='mid'}
   const keep={};for(let n=CUT+1;n<=BAL.road.last;n++){const a=ARC67[ROAD14[rd][n]];keep[n]=a.cast;a.cast=()=>false}
   const maid=typeof isSrv67==='function'&&isSrv67();const seq=[];let err=null,finAt=null;
   try{for(let g=0;g<40&&!c.all;g++){const n0=c.n;chAdvance67({k:0});if(c.fin&&finAt==null)finAt=c.n;if(c.all)break;seq.push(c.n+':'+(S.st.ms?S.st.ms.id:S.st.M?S.st.M.a:'?'));
     if(c.n===n0&&!S.st.ms&&!S.st.M)break;S.st.ms=null;S.st.M=null}}catch(e){err=e.message+' '+String(e.stack||'').split('\n')[1]}
   for(const n in keep)ARC67[ROAD14[rd][n]].cast=keep[n];
   return{rd,k,maid,seq,n:c.n,all:!!c.all,fin:c.fin||'',finAt,err}},[rd,CUT]);
  T[rd]=R;if(R.skip){console.log(rd,'SKIP',R.skip);continue}
  console.log(rd,(R.maid?'maid':'    '),'n='+R.n,R.all?'ALL':'',`fin@${R.finAt}`,'|',(R.seq||[]).join(' '),R.err||'');
  chk(`${rd}: frame goes on after chapter ${CUT}`,!R.err&&R.seq&&R.seq.length&&+R.seq[0].split(':')[0]===CUT+1,R);
  chk(`${rd}: origin ending told after the road`,!!R.fin&&R.finAt!=null&&R.finAt<=BAL_LAST(R),R);
  chk(`${rd}: frame reaches 14`,R.n===14,R);
  if(R.maid){const s12=(R.seq||[]).find(x=>x.startsWith('12:'));chk(`${rd}: a maid's ch.12 is len14`,!!s12&&/len14/.test(s12),R.seq)}}
 function BAL_LAST(){return 14}
 chk('no page errors',!errs.length,errs.slice(0,5));
 const sk=Object.values(T).filter(r=>r.skip).length;const nb=ok.filter(x=>!x[1]).length;
 console.log(`ROAD-CUT ${nb?'FAIL':'PASS'} ${ok.length-nb}/${ok.length} (cut ${CUT}; roads ${roads.length}, skipped ${sk})`);await b.close();process.exit(nb?1:0)})();
