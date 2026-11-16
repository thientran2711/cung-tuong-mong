/* road-end (review/road-b3): Phần cuối «Ngôi Trung cung», chapters 12–14 in hồi form (jend14.js, ROAD_MAP §2).
   For each case a NEW 14-chapter life of the origin is started, the frame is moved to the end of chapter 11 (test shortcut: plan pointer
   just before end:12, her state set for the case), then a story bot plays every due hồi (first option or random) and checks:
   - chapter 12 is the variant her state calls for: son → st_dong · child, no son → st_con · no child → noi14 · cnv still a maid → len14;
   - chapter 13 = hau14 (also when she already sits as Hoàng hậu: the «giữ ngôi» openings), chapter 14 = ke14; the frame closes at 14;
   - a won ke14 with no Thái tử and a dear son sets him (setHeir); the plan of an OLD f14 life (no eg flag) is unchanged (ms:hau / ms:ke);
   - no page errors.
   usage: node dev/test/road-end.js <url> [lives per case] */
const {chromium}=require('playwright');
const [,,URL,NL]=process.argv;const NLIV=+NL||2;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,JSON.stringify(x).slice(0,900))};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
 p.on('pageerror',e=>errs.push(e.message.slice(0,300)));await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof eg12==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{document.getElementById('title').hidden=true;
  const md0=msDone67;msDone67=function(m){return m.force14?true:md0.apply(this,arguments)};
  window.__end=(k,cs,pick)=>{quiet=true;window.__forceOrigin=k;start();quiet=false;Q.length=0;if(S.origin.k!==k||!S.st.f14)return{err:'origin '+S.origin.k};
   const c=S.st.ch,P=c.plan,j=P.indexOf('end:12');const eg=!!S.st.f14.eg;const plan0=P.join(',');if(j<0)return{err:'no end:12 '+plan0};
   /* her state for the case */
   if(k!=='cnv'||cs!=='maid'){if(S.srv&&!S.srv.risen){S.age=Math.max(S.age||0,18);srvRise('test')}}
   S.kids=[];S.heir=null;allKids().forEach(([x])=>x.heir=false);
   if(cs==='son'||cs==='queen'){const s=mkKid('m',6);s.fond=80;S.kids.push(s)}
   if(cs==='dau'){S.kids.push(mkKid('f',5))}
   if(cs==='queen'){S.rank=7;if(qOn()){rivals[0].queen=false;rivals[0].rank=6}}
   if(cs!=='queen'&&S.rank<4&&!(S.srv&&!S.srv.risen))S.rank=4;
   S.st.M=null;S.st.ms=null;c.i=j-1;c.n=11;c.done=1;chAdvance67(null);
   const seq=[],ends=[];let lastN=0,stuck=0,err=null,mon=0;
   for(;mon<300&&!S.st.ch.all;mon++){if(c.n!==lastN){seq.push(c.n+':'+(S.st.ms?S.st.ms.id:S.st.M?S.st.M.a:'?'));lastN=c.n;stuck=0}
    if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}
    const A=S.st.M;try{if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);if(!O.length)throw new Error('no option '+A.a+' '+A.cur);
      const i=pick==='rand'?Math.floor(Math.random()*O.length):0;const o=O[i];res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,bd):100);if(A.done)ends.push(A.a+'='+A.end)}}catch(e){err=err||('beat '+e.message+' '+(e.stack||'').split('\n')[1])}
    if(S.st.ms&&++stuck>2){if(S.st.ms.id==='len14'&&S.srv&&!S.srv.risen){S.age=Math.max(S.age||0,18);srvRise('bot')}else S.st.ms.force14=1}
    const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0}
   const s=mySons()[0];
   return{k,cs,eg,plan0,seq,ends,all:!!c.all,n:c.n,heir:!!(S.heir&&S.heir.k&&S.heir.k===s),months:mon,err}};
  window.__old=()=>{quiet=true;window.__forceOrigin='tt';start();quiet=false;Q.length=0;delete S.st.f14.eg;const P=S.st.ch.plan;
   /* an old f14 plan (as saved before this build): ms:hau / ms:ke / end:12 stay what they were */
   for(let i=0;i<P.length;i++){if(P[i]==='st:hau14')P[i]='ms:hau';if(P[i]==='st:ke14')P[i]='ms:ke'}
   const c=S.st.ch,j=P.indexOf('end:12');S.kids=[];S.st.M=null;S.st.ms=null;c.i=j-1;c.n=11;c.done=1;chAdvance67(null);
   return{plan:P.join(','),at:P[j],n:c.n,cur:S.st.ms?S.st.ms.id:S.st.M?S.st.M.a:''}}});
 const want12={son:'st_dong',dau:'st_con',none:'noi14',maid:'len14',queen:'st_dong'};
 const cases=[['tt','none'],['thd','son'],['muoi','dau'],['cnv','maid'],['ch','queen'],['cnv','none']];
 for(const [k,cs] of cases)for(let L=0;L<NLIV;L++){const R=await p.evaluate(([k,cs,pk])=>window.__end(k,cs,pk),[k,cs,L===0?0:'rand']);
  console.log(k,cs,'life',L+1,R.n,R.all?'ALL':'',R.months+'m','|',(R.seq||[]).join(' '),'|',(R.ends||[]).join(' '),R.err||'');
  chk(`${k}/${cs} L${L+1}: no error`,!R.err,R.err);
  chk(`${k}/${cs} L${L+1}: new life has the hồi-form frame`,R.eg&&/st:hau14,st:ke14$/.test(R.plan0),R.plan0);
  const ids=(R.seq||[]).map(x=>x.split(':')[1]),ns=(R.seq||[]).map(x=>+x.split(':')[0]);
  chk(`${k}/${cs} L${L+1}: chapter 12 = ${want12[cs]}`,ids[0]===want12[cs]&&ns[0]===12,R.seq);
  chk(`${k}/${cs} L${L+1}: 13 hau14, 14 ke14, frame closed`,R.all&&R.n===14&&ids[1]==='hau14'&&ids[2]==='ke14'&&ns[1]===13&&ns[2]===14,R.seq);
  if(cs==='son'&&L===0)chk(`${k}/son L1: a won ke14 with no Thái tử sets her dear son`,!R.ends.includes('ke14=win')||R.heir,[R.ends,R.heir])}
 const O=await p.evaluate(()=>window.__old());console.log('old f14 plan:',O.at,O.n,O.cur);
 chk('old f14 life (no eg flag): ms:hau / ms:ke kept, end:12 by the old rule',/ms:hau,ms:ke$/.test(O.plan)&&O.n===12&&O.cur!=='noi14',O);
 chk('no page errors',!errs.length,errs.slice(0,5));
 const nb=ok.filter(x=>!x[1]).length;console.log(`road-end: ${ok.length-nb}/${ok.length} pass`);await b.close();process.exit(nb?1:0)})();
