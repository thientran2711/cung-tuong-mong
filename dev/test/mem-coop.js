/* review/mem-upgrade: co-op state check (offline, one page). NPC memories + cause records live on the NPC (world state): host and guest each
   act on the same NPC in one week; canonical C of both sides is merged with the PROTOCOL.md §4 merge3 rule (re-implemented here);
   both sides rebuilt from the merged C must see the same NPC memories, each from her own point of view ("me" = herself).
   usage: node dev/test/mem-coop.js <build url>  (serve dev/ with a UTF-8 charset header) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.COOPW&&COOPW.toCanon,null,{timeout:90000});await p.waitForTimeout(2000);
 const R=await p.evaluate(()=>{const C={};const ok=(k,v,i)=>{C[k]={ok:!!v,info:i===undefined?null:i}};const J=x=>JSON.parse(JSON.stringify(x));
  const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);const isO=x=>x&&typeof x==="object"&&!Array.isArray(x);
  function merge3(base,A,B,under){if(eq(A,B))return J(A);if(eq(A,base))return J(B);if(eq(B,base))return J(A);
   if(typeof A==="number"&&typeof B==="number")return typeof base==="number"?A+(B-base):A;
   if(isO(A)&&isO(B)){const o={};const bs=isO(base)?base:{};for(const k of new Set([...Object.keys(A),...Object.keys(B)])){const a=A[k],bb=B[k],c=bs[k];
     if(a===undefined&&eq(bb,c))continue;if(bb===undefined&&eq(a,c))continue;const v=merge3(c,a,bb,under||k);if(v!==undefined)o[k]=v}return o}
   if(Array.isArray(A)&&Array.isArray(B)&&[...A,...B].every(x=>isO(x)&&x.id!=null)){const bs=Array.isArray(base)?base:[];const f=(L,id)=>L.find(x=>x.id===id);const out=[];
    for(const a of A){const bb=f(B,a.id),c=f(bs,a.id);if(!bb){if(c&&eq(a,c))continue;out.push(J(a));continue}out.push(merge3(c,a,bb,under))}
    for(const bb of B)if(!f(A,bb.id)&&!f(bs,bb.id)&&under==="P")out.push(J(bb));return out}
   return J(A)}
  SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(isSrv()||(typeof isKc==="function"&&isKc())))break}Q.length=0;
  const CW=COOPW;CW.seat="a";const vid=liveRivals(true).filter(v=>!v.queen)[0].id;RV(vid).mem={};RV(vid).cz={};
  const C0=CW.toCanon();C0.P.b=J(C0.P.a);C0.P.b.pid=902;C0.P.b.name="Bạn";C0.P.b.S.name="Bạn";CW.base=J(C0);
  /* host's week: she rumours the NPC, the NPC remembers her */
  memAdd(RV(vid),S,"rumor");causeAdd(S,RV(vid),"rumor",{s:-1,d:"rumor"});const Ca=CW.toCanon();Ca.P.b=J(C0.P.b);
  /* guest's week (same base): she gives the NPC a gift */
  CW.seat="b";CW.base=J(C0);fromCanon=CW.fromCanon;CW.fromCanon(J(C0));memAdd(RV(vid),S,"gift",{x:"Trâm ngọc"});causeAdd(S,RV(vid),"gift",{s:1,d:"gift"});
  const Cb=CW.toCanon();Cb.P.a=J(C0.P.a);
  const M=merge3(C0,Ca,Cb,"");const r=M.W.R.find(x=>x.id===vid);
  ok("canon_keys",r&&r.mem&&r.mem["901"]&&r.mem["902"]&&!r.mem.me,r&&r.mem&&Object.keys(r.mem));
  ok("canon_causes",r&&r.cz&&Object.values(r.cz).some(z=>z.by===901&&z.a==="rumor")&&Object.values(r.cz).some(z=>z.by===902&&z.a==="gift"),r&&r.cz);
  /* rebuild both sides from the merged C */
  CW.seat="a";CW.fromCanon(J(M));const hostMe=memList(RV(vid),S).map(m=>m.d),hostF=(RV(vid).mem["902"]||[]).map(m=>m.d);const hostC=causeQuery({to:RV(vid)}).map(z=>z.by+":"+z.a);
  CW.seat="b";CW.fromCanon(J(M));const gMe=memList(RV(vid),S).map(m=>m.d),gF=(RV(vid).mem["901"]||[]).map(m=>m.d);const gC=causeQuery({to:RV(vid)}).map(z=>z.by+":"+z.a);
  ok("host_view",eq(hostMe,["rumor"])&&eq(hostF,["gift"]),{hostMe,hostF});ok("guest_view",eq(gMe,["gift"])&&eq(gF,["rumor"]),{gMe,gF});
  ok("causes_both_sides",hostC.includes("me:rumor")&&hostC.includes("902:gift")&&gC.includes("me:gift")&&gC.includes("901:rumor"),{hostC,gC});
  /* the monthly fade is deterministic: both sides fade the merged state to the same numbers (merge3: equal → kept) */
  CW.seat="a";CW.fromCanon(J(M));S.turn++;memFade();const fa=J(RV(vid).mem);CW.seat="b";CW.fromCanon(J(M));S.turn++;memFade();const fb=J(RV(vid).mem);
  ok("fade_same_both_sides",eq(fa.me,fb["901"])&&eq(fa["902"],fb.me),{fa,fb});
  return C});
 let fail=0;for(const [k,c] of Object.entries(R)){console.log((c.ok?"ok  ":"FAIL")+" "+k+(c.ok?"":" "+JSON.stringify(c.info)));if(!c.ok)fail++}
 if(errs.length){fail++;console.log("FAIL errors",errs)}console.log(fail?`FAIL ${fail}`:"ALL OK");await b.close();process.exit(fail?1:0)})();
