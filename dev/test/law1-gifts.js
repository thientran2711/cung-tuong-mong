/* review/law1-gifts — LAW 1 (two-way) for likes / dislikes / gifts + law 6c (real pieces). usage: node dev/test/law1-gifts.js [dev/index.html]
   1. the scan (dev/tools/law1-gift-scan.js): 0 one-way rows, 0 unclassified gift sites, no page errors
   2. law 6c: a piece moved NPC→NPC / NPC→her / a refused piece is never duplicated or lost (count of that piece across every chest + her cards);
      a visit gift (giftHand) with an empty chest and no bạc gives nothing (no piece from nothing)
   3. old save: a save without the NPC taste records (v.gk) loads, plays a gift, and the record is made then
   4. the NPC agent's gift (cx:gift runner) never hands a piece it knows the receiver dislikes                                   exit 1 on any FAIL */
const path=require('path');const {scan}=require('../tools/law1-gift-scan.js');
(async()=>{const html=process.argv[2]||path.join(__dirname,'..','index.html');let fail=0;const ok=(c,m)=>{console.log((c?"ok   ":"FAIL ")+m);if(!c)fail++};
 const X=await scan(html);ok(X.gaps.length===0,`scan: one-way gaps ${X.gaps.length}${X.gaps.length?" — "+X.gaps.join(" | "):""}`);ok(!X.err.length,`scan errors ${JSON.stringify(X.err)}`);ok(!X.pageErr.length,`page errors ${X.pageErr.length}`);
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(html),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:90000});await p.waitForTimeout(2000);
 const R=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;
  const r={};const L=liveRivals(true).filter(v=>!v.queen&&v.alive&&!v.out);const A=L[0],B=L[1];const mr=Math.random;
  const k=Object.keys(IT).find(x=>itm(x).kd==="Vải vóc"&&!(itm(x).tg||[]).includes("rv"))||"vaitho";
  const cnt=()=>{let n=0;const chests=[S.inv].concat(rivals.map(v=>v.inv||[]));for(const c of chests)n+=c.filter(e=>e&&e.k===k).length;return n};/* every piece of that kind, in every chest (a piece in transit to her sits in her card, counted apart) */
  /* NPC→NPC, refused (dislike, roll pinned low): the piece stays with the giver */
  A.dis=["kd:Vải vóc"];B.inv=(B.inv||[]).concat([{k,from:"t6c"}]);let n0=cnt();Math.random=()=>0;let out;try{out=giveTo(B,A,B.inv.length-1)}finally{Math.random=mr}
  r.refuseKept=cnt()===n0&&B.inv.some(e=>e.from==="t6c");r.refuseTxt=String(out).replace(/<[^>]+>/g,"");
  /* NPC→NPC accepted: moves, never doubles */
  Math.random=()=>.99;try{giveTo(B,A,B.inv.findIndex(e=>e.from==="t6c"))}finally{Math.random=mr}r.moveOne=cnt()===n0;
  /* NPC→her: a choice card, the piece is in the card (not yet in her chest), never two */
  A.inv=(A.inv||[]).filter(e=>e.from!=="t6c").concat([{k,from:"t6c"}]);const q0=(S.inv||[]).filter(e=>e.from==="t6c").length;Math.random=()=>.99;try{giveTo(A,S,A.inv.length-1)}finally{Math.random=mr}
  r.toHer=!A.inv.some(e=>e.from==="t6c")&&(S.inv||[]).filter(e=>e.from==="t6c").length===q0;
  /* visit gift with nothing to give and no bạc: nothing */
  const inv0=B.inv,bac0=B.bac;B.inv=[];B.bac=0;const g=giftHand(B,S,["tuithom"]);r.noConjure=g===null;B.inv=inv0;B.bac=bac0;
  /* visit gift with a real piece: it leaves her chest and lands in the receiver's */
  B.inv=(B.inv||[]).concat([{k:"tuithom",from:"t6c"}]);const nb=B.inv.length,ns=S.inv.length;const g2=giftHand(B,S);r.handMoves=!!g2&&B.inv.length===nb-1&&S.inv.length===ns+1&&S.inv.includes(g2);
  /* the agent never hands a known-disliked piece */
  B.gk={};B.gk[mindKey(A)]={l:[],d:["kd:Vải vóc"]};B.inv=[{k,from:"t6c"}];if(!itm(k).gv)IT[k].gv=1;const ix=giftPickIx(B,A);r.agentSkips=ix===-1;
  /* old save: no .gk anywhere → loads, a gift makes the record */
  const raw=JSON.parse(JSON.stringify(ser()));(raw.R||[]).forEach(v=>delete v.gk);try{deser(raw)}catch(e){r.deserErr=e.message}const A2=liveRivals(true).filter(v=>!v.queen&&v.alive&&!v.out);
  r.oldLoads=!r.deserErr&&A2.every(v=>!v.gk);const X2=A2[0],Y2=A2[1];X2.dis=["kd:Vải vóc"];Y2.inv=(Y2.inv||[]).concat([{k,from:"t6c"}]);Math.random=()=>.99;try{giveTo(Y2,X2,Y2.inv.length-1)}finally{Math.random=mr}
  r.oldLearns=!!(Y2.gk&&Y2.gk[mindKey(X2)]&&Y2.gk[mindKey(X2)].d.includes("kd:Vải vóc"));return r});
 ok(R.refuseKept,`refused NPC→NPC piece stays with the giver (${R.refuseTxt.slice(0,90)})`);ok(R.moveOne,"accepted NPC→NPC piece moves once");ok(R.toHer,"NPC→her piece waits in her choice card, never doubled");
 ok(R.noConjure,"visit gift: no piece from nothing");ok(R.handMoves,"visit gift: a real piece moves chest→chest");ok(R.agentSkips,"NPC never hands a known-disliked piece");
 ok(R.oldLoads,"old save without v.gk loads"+(R.deserErr?" "+R.deserErr:""));ok(R.oldLearns,"old save: a gift makes the giver's record");ok(!errs.length,`page errors ${errs.length} ${errs.slice(0,2).join(" | ")}`);
 await b.close();console.log(fail?`LAW1-GIFTS FAIL ${fail}`:"LAW1-GIFTS PASS");process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(1)});
