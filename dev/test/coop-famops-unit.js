/* coop-famops-unit (E44, law 6c REAL OBJECTS): jcoopworld famApply — every friend-act item op moves exactly THAT piece, by its ledger id.
   Runs the real famApply (COOPW.famApply) on a solo page with the seat set to the guest ("b"); no network.
   usage: python3 dev/build/assemble.py && node dev/test/coop-famops-unit.js [url, default the built dev/index.html via coop-serve] */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(process.argv[2]||'http://127.0.0.1:8744/index.html',{timeout:0,waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&window.COOPW&&COOPW.famApply&&typeof loLose==='function',null,{timeout:0});
 await p.evaluate(()=>{document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});/* LIVE: the new life lands a moment after start() */
 await p.waitForFunction(()=>typeof S==='object'&&S&&S.name,null,{timeout:60000});
 const R=await p.evaluate(()=>{const out=[];const ck=(n,ok,i)=>out.push([n,!!ok,i==null?"":JSON.stringify(i).slice(0,240)]);
  Q.length=0;const CW=COOPW;CW.seat="b";
  const T=Object.keys(WD||{}).find(k=>WD[k]&&WD[k].sl==="tram")||Object.keys(IT).find(k=>/tram/.test(k));const P=Object.keys(IT).find(k=>k!==T&&loOk({k})&&ilDur({k})&&!(typeof wdItem==="function"&&wdItem({k})));
  const cnt=iu=>ilSlots(S).filter(e=>e.iu===iu).length;let n=9e6;const pc=k=>({k,iu:++n});const FA=o=>CW.famApply(o);
  const reset=()=>{S.inv=[];S.wd={tram:null,y:null};S.lost=[];Q.length=0;CW.famMiss=[]};
  const mkc=(k,e,by)=>{S.loSeq=(S.loSeq||0)+1;const c={id:S.loSeq,k,e,own:"me",w:wk(),due:wk()+9,st:"held",by:by||901,at:by||901,keep:1,kn:{},open:0,cev:0,hear:0};loL().push(c);return c};
  /* 1 rm by id: the piece is worn (her entry on the host was a step behind) → taken off her, nothing else moves */
  reset();const a=pc(T),a2=pc(T);S.inv.push(a2);S.wd.tram=a;FA([{op:"rm",ci:0,k:T,iu:a.iu,how:"gone"}]);
  ck("1 rm by id finds the worn piece, the other of that kind stays",cnt(a.iu)===0&&cnt(a2.iu)===1&&!S.wd.tram,{w:S.wd.tram,inv:S.inv.map(e=>e.iu)});
  /* 2 rm of a piece that is not hers (id elsewhere): before = «any piece of that kind» was taken */
  reset();const b0=pc(P),b1=pc(T);S.inv.push(b0,b1);FA([{op:"rm",ci:0,k:T,iu:12345,how:"lost"}]);ck("2 rm with an unknown id: another kind in that slot, nothing moves (never «any of that kind»)",cnt(b0.iu)===1&&cnt(b1.iu)===1&&CW.famMiss.length===1,CW.famMiss);
  /* 2b her piece numbered on her seat, the host's copy numbered on the host: same slot, same kind = that piece; the host's id rides as hiu, his «ret» finds her case */
  reset();const z1=pc(P);S.inv.push(z1);FA([{op:"rm",ci:0,k:P,iu:4444,how:"lost"}]);const cz=S.lost.find(c=>c.e&&c.e.iu===z1.iu);
  const zr=FA([{op:"ret",k:P,iu:4444,e:{k:P,iu:4444}}]);ck("2b differing ids: taken by slot, case held, the host's ret (his id) brings HER piece home once",cz&&cz.e.hiu===4444&&cz.st==="done"&&cnt(z1.iu)===1&&S.inv.length===1&&zr.loud,{st:cz&&cz.st,inv:S.inv});
  /* 2c the host's side of her case closed without a return (seized as tang vật): «gone» closes hers, nothing comes home */
  reset();const y1=pc(P);S.inv.push(y1);FA([{op:"rm",ci:0,k:P,iu:y1.iu,how:"lost"}]);const cy=S.lost.find(c=>c.e&&c.e.iu===y1.iu);FA([{op:"gone",k:P,iu:y1.iu,how:"matdau"}]);
  ck("2c gone: her case closes «mất dấu», no copy",cy&&cy.st==="done"&&cy.how==="matdau"&&cnt(y1.iu)===0,{st:cy&&cy.st,how:cy&&cy.how});
  /* 3 rm with no id (old room): only the same slot of the same kind */
  reset();const c1=pc(P),c2=pc(T);S.inv.push(c1,c2);FA([{op:"rm",ci:0,k:T,how:"gone"}]);ck("3 rm without id: a different kind in that slot is not taken",cnt(c1.iu)===1&&cnt(c2.iu)===1);
  /* 4 rm lost: her case is HELD by the friend (the piece is in his chest on the other seat), never «lost» (= counted twice) */
  reset();const d1=pc(P),d2=pc(P);S.inv.push(d2,d1);FA([{op:"rm",ci:1,k:P,iu:d1.iu,how:"lost"}]);const cs=S.lost.find(c=>c.e&&c.e.iu===d1.iu);
  ck("4 rm lost: one case, held by the friend; the other piece stays ("+P+" loOk "+loOk(d1)+")",cs&&cs.st==="held"&&cs.own==="me"&&cnt(d1.iu)===0&&cnt(d2.iu)===1,cs&&{st:cs.st,by:cs.by,at:cs.at});
  /* 5 ret: the piece comes home ONCE (a second identical ret puts nothing) */
  const r1=FA([{op:"ret",k:P,iu:d1.iu,e:{k:P,iu:d1.iu}}]);FA([{op:"ret",k:P,iu:d1.iu,e:{k:P,iu:d1.iu}}]);
  ck("5 ret closes her case, one copy home, a repeat adds none",cs&&cs.st==="done"&&cnt(d1.iu)===1&&r1.loud,{st:cs&&cs.st,n:cnt(d1.iu)});
  /* 6 ret while the piece is already hers (worn): the case closes, no 2nd copy (E30d: guest trâm 2 copies) */
  reset();const e1=pc(T);S.wd.tram=e1;const C6=mkc(T,Object.assign({},e1));
  FA([{op:"ret",k:T,iu:e1.iu,e:{k:T,iu:e1.iu}}]);ck("6 ret of a piece already worn: case done, still one",C6.st==="done"&&cnt(e1.iu)===1,{st:C6.st,n:cnt(e1.iu),w:S.wd.tram,lost:loL().length});
  /* 7 ret, old room (no id): the case the friend holds; its piece home once */
  reset();const f1=pc(P);const C7=mkc(P,f1);FA([{op:"ret",k:P}]);
  ck("7 ret without id: the friend's case, one copy",C7.st==="done"&&cnt(f1.iu)===1,{st:C7.st});
  /* 8 ret with no case and nothing of that id: the piece the friend let go lands with her (it left his chest); never a bare {k} stub */
  reset();FA([{op:"ret",k:P,iu:777777,e:{k:P,iu:777777}}]);FA([{op:"ret",k:P}]);ck("8 ret with no case: the real piece once, no stub",cnt(777777)===1&&S.inv.length===1,S.inv);
  /* 9 add of a piece already hers (by id) → none; add of her lost piece (an NPC on the host handed it back) → her case closes */
  reset();const g1=pc(P);S.inv.push(g1);FA([{op:"add",e:{k:P,iu:g1.iu}}]);ck("9a add of a piece already hers: no 2nd copy",cnt(g1.iu)===1);
  reset();const h1=pc(P);const C9=mkc(P,h1,"x");FA([{op:"add",e:{k:P,iu:h1.iu}}]);
  ck("9b add of her lost piece = the return: case done, one copy",C9.st==="done"&&cnt(h1.iu)===1,{st:C9.st});
  /* 10 a failed loLose (nothing it may take) never spliced her LAST piece (before: indexOf -1) */
  reset();const j1={k:Object.keys(IT).find(k=>!IT[k].pr&&!ilDur({k}))||"tra",iu:++n},j2=pc(P);S.inv.push(j1,j2);FA([{op:"rm",ci:0,k:j1.k,iu:j1.iu,how:"lost"}]);
  ck("10 rm lost that makes no case: that piece leaves, the last piece stays",cnt(j2.iu)===1&&!S.inv.includes(j1),S.inv.map(e=>e.k));
  /* 11 plant of a piece already hers by id: none */
  reset();const k1=pc(P);S.inv.push(k1);FA([{op:"plant",e:{k:P,iu:k1.iu,h:1}}]);ck("11 plant of an id already hers: none",cnt(k1.iu)===1);
  /* 12 famRet strips marks, keeps the id */
  const fr=CW.famRet({k:P,iu:5,lo:3,gh:902,by:"me",h:1,w:1,ci:2});ck("12 famRet: id kept, lo/gh/by/h/w/ci dropped",fr.iu===5&&fr.e.iu===5&&!("lo" in fr.e)&&!("ci" in fr.e)&&!("gh" in fr.e));
  /* E44b 13 (E44r seed 4242 dup 10000054): the host's act takes a piece that on her seat already sits in HER open «thất lạc» case (no holder):
     the case is held by the thief (lost) / closes «mất dấu» (any other road); no famMiss, no copy anywhere on her side */
  reset();const m1=pc(P);const C13={id:(S.loSeq=(S.loSeq||0)+1),k:P,e:Object.assign({},m1),own:"me",w:wk(),due:wk()+9,st:"lost",kn:{},open:0,cev:0,hear:0};loL().push(C13);
  FA([{op:"rm",ci:0,k:P,iu:m1.iu,how:"lost"}]);ck("13 rm of a piece in her own lost case: case held by the thief, no miss",C13.st==="held"&&C13.at&&CW.famMiss.length===0&&cnt(m1.iu)===0,{st:C13.st,at:C13.at,miss:CW.famMiss});
  reset();const m2=pc(P);const C13b={id:(S.loSeq=(S.loSeq||0)+1),k:P,e:Object.assign({},m2),own:"me",w:wk(),due:wk()+9,st:"lost",kn:{},open:0,cev:0,hear:0};loL().push(C13b);
  FA([{op:"rm",ci:0,k:P,iu:m2.iu,how:"gone"}]);ck("13b same, another road: her case closes «mất dấu», no miss",C13b.st==="done"&&C13b.how==="matdau"&&CW.famMiss.length===0,{st:C13b.st,how:C13b.how});
  /* E44b 14 (E44r seed 4242 vanish 1073 / 144): the returned piece carries another id than the case on this seat; `alt` names the case's id */
  reset();const q1=pc(P);const C14=mkc(P,Object.assign({},q1));const r14=FA([{op:"ret",k:P,iu:88888,alt:[q1.iu],e:{k:P,iu:88888}}]);
  ck("14 ret with a split id: alt finds her case, it closes, one piece home",C14.st==="done"&&S.inv.length===1&&r14.loud,{st:C14.st,inv:S.inv.map(e=>[e.k,e.iu]),miss:CW.famMiss});
  reset();const q2=pc(P);const C14c=mkc(P,Object.assign({},q2));FA([{op:"ret",k:P,iu:99991,e:{k:P,iu:99991}}]);
  ck("14c ret whose ids all miss: the case of that kind the friend holds closes, one piece home",C14c.st==="done"&&S.inv.length===1,{st:C14c.st,inv:S.inv.map(e=>[e.k,e.iu])});
  /* 15 a person carrying ANOTHER case's lo mark (the host's numbering) with a piece of another kind is not this case's holder */
  reset();const u1=pc(P);const C15=mkc(P,Object.assign({},u1),"me");const other=Object.keys(IT).find(k=>k!==P&&loOk({k})&&ilDur({k}));S.inv.push({k:other,iu:++n,lo:C15.id});
  const at0=C15.at,on0=CW.on;CW.on=true;const x15=loEntry(C15);CW.on=on0;ck("15 loEntry (co-op on): a piece of another kind with the same lo mark is no entry, case untouched",!x15&&C15.at===at0&&C15.e.iu===u1.iu,{at:C15.at,iu:C15.e.iu});
  /* 16 (c): a piece OWNED by the friend that leaves me with no live owner entry never goes into MY box as «di vật» (seed 4242 vanish 148) */
  reset();const bx0=ilS().box.length;const on1=CW.on;CW.on=true;let r16;try{r16=ilGone(S,{k:P,iu:++n},"dead",{own:901})}finally{CW.on=on1}
  ck("16 friend-owned piece, owner gone here: not in my box (sent to her seat)",r16==null&&ilS().box.length===bx0,{box:ilS().box.length-bx0});
  /* 16b (c) whole group: a piece of the friend's I hold (gh = her key) seized as tang vật goes into MY box, unowned by her; my case of it closes «mất dấu» */
  reset();const sn=[];const s0=COOP.send;COOP.send=m=>sn.push(m);const on2=CW.on;CW.on=true;let r16b;const pe={k:P,iu:++n,gh:901,lo:0};
  try{r16b=ilGone(S,pe,"evid",{})}finally{CW.on=on2;COOP.send=s0}
  const g16=sn.flatMap(m=>m.fam||[]).find(o=>o.op==="gone");
  ck("16b friend's piece seized here: in my box (not hers to reclaim), «gone» sent to her seat",r16b&&r16b.at==="cct"&&String(r16b.own)!=="901"&&g16&&g16.iu===pe.iu,{at:r16b&&r16b.at,own:r16b&&r16b.own,sent:sn.map(m=>m.fam)});
  /* 16c (E48r): «dead» of a friend-owned piece that still sits in a living slot (ilAt) never goes home as «ret»: the ONE box rule's guard holds */
  reset();const sn3=[];const s3=COOP.send;COOP.send=m=>sn3.push(m);const on3=CW.on;CW.on=true;const pz={k:P,iu:++n};S.inv.push(pz);let r16c;
  try{r16c=ilGone(S,pz,"dead",{own:901})}finally{CW.on=on3;COOP.send=s3}
  const rt16c=sn3.flatMap(m=>m.fam||[]).filter(o=>o.op==="ret");
  ck("16c friend-owned piece still in my chest: no «ret» home, the piece stays (no 2nd copy)",r16c==null&&!rt16c.length&&S.inv.indexOf(pz)>=0,{sent:sn3.map(m=>m.fam),inv:S.inv.length});
  /* E44c P1/P2: on the GUEST seat a host-NPC copy's own road (sell / box, NPC→NPC robbery) never reaches HER box or HER S.lost; host seat unchanged */
  reset();{const v=rivals.find(x=>x&&!x.coop&&x.alive!==false);const on4=CW.on;CW.on=true;const bx=ilS().box.length,ls=(S.lost||[]).length;let r17,r17b,r17c;
   try{r17=ilGone(v,{k:P,iu:++n},"sell");r17b=loLoseE(v,{k:P,iu:++n},"riv");CW.seat="a";r17c=ilGone(v,{k:P,iu:++n},"evid")}finally{CW.seat="b";CW.on=on4}
   ck("17 guest seat: a host-NPC copy's sale never enters HER box (P1 dup)",r17==null&&ilS().box.length===bx+1&&!!r17c,{box:ilS().box.length-bx});
   ck("17b guest seat: no case over a host-NPC copy's piece in HER S.lost (P2 vanish)",r17b==null&&(S.lost||[]).length===ls,{lost:(S.lost||[]).length-ls});
   ck("17c host seat: the NPC's box road unchanged",r17c&&r17c.at==="cct",{at:r17c&&r17c.at})}
  /* E44d: a host-NPC copy robs HER piece on the guest seat (jty robbers → ilRob): her case keeps the piece, the copy gets nothing */
  reset();{const v=rivals.find(x=>x&&!x.coop&&x.alive!==false);const on6=CW.on;CW.on=true;v.inv=v.inv||[];const vi=v.inv.length;let c18,c18h;const e18=pc(P),e18h=pc(P);
   try{c18=ilRob(S,e18,v);CW.seat="a";c18h=ilRob(S,e18h,v)}finally{CW.seat="b";CW.on=on6}
   ck("17d guest seat: a copy's robbery leaves HER case «thất lạc» holding the piece (P2 vanish 10000137)",c18&&c18.st==="lost"&&c18.e===e18&&!v.inv.some(e=>e.iu===e18.iu),{st:c18&&c18.st});
   ck("17e host seat: the robber keeps it as before",c18h&&c18h.st==="held"&&v.inv.some(e=>e.iu===e18h.iu),{st:c18h&&c18h.st});v.inv=v.inv.filter(e=>!(e.iu>9e6))}
  /* E44d (law 6c): a lost piece a holder keeps comes back as THAT copy, from THAT holder (lost-one-home-scan DUP: Kỳ ngộ «Giữ lại» → «Lén trả lại» pressed on a case she owns) */
  {reset();const on5=CW.on;CW.on=false;const v=rivals.find(x=>x&&!x.coop&&x.alive!==false&&x.out!==true);v.inv=v.inv||[];const vi=v.inv.length;
   try{const mk=()=>{const e=pc(P);S.inv.push(e);const c=loLoseE(S,e,"srv");S.inv.splice(S.inv.indexOf(e),1);loKeepBy(c,v,"kyngo: giữ lại");return c};
    const c1=mk();const k0=S.kh,u0=typeof used!=="undefined"?used:0;loUI("sneak",c1.id);
    ck("18 «Lén trả lại» on a case she OWNS (an NPC keeps it): refused, nothing moves",c1.st==="held"&&cnt(c1.e.iu)===0&&v.inv.filter(e=>e.lo===c1.id).length===1,{st:c1.st,me:cnt(c1.e.iu),v:v.inv.filter(e=>e.lo===c1.id).length});
    loUI("giveback",c1.id);loUI("handin",c1.id);ck("18b «Trả về chủ» / «Nộp» on it: refused too",c1.st==="held"&&cnt(c1.e.iu)===0,{st:c1.st});
    const c2=mk();loEvBack({lc:c2.id},"tra");
    ck("18c loEvBack on a held case: the holder's copy comes home, ONE piece",c2.st==="done"&&cnt(c2.e.iu)===1&&!v.inv.some(e=>e.lo===c2.id),{st:c2.st,me:cnt(c2.e.iu),v:v.inv.filter(e=>e.lo===c2.id).length});
    const e3=pc(P);v.inv.push(e3);const c3=loLoseE(v,e3,"srv");v.inv.splice(v.inv.indexOf(e3),1);loKeepBy(c3,S,"");Object.assign(c3,{keep:0,by:null,open:1});c3.kn.ome=1;
    used=0;loUI("giveback",c3.id);ck("18d «Trả về chủ» while SHE holds it: still works (one piece, at its owner)",c3.st==="done"&&cnt(e3.iu)===0&&v.inv.filter(e=>e.iu===e3.iu).length===1,{st:c3.st,me:cnt(e3.iu),v:v.inv.filter(e=>e.iu===e3.iu).length})}
   finally{CW.on=on5;v.inv=v.inv.filter(e=>!e.lo&&!(e.iu>9e6))}}
  const fr2=CW.famRet({k:P,iu:5,hiu:6});ck("14b famRet sends the piece's hiu as alt",Array.isArray(fr2.alt)&&fr2.alt.includes(6),fr2);
  return out});
 let bad=0;for(const [n,ok,i] of R){if(!ok)bad++;console.log((ok?'ok  ':'FAIL')+' '+n+(ok?'':' '+i))}if(errs.length){bad++;console.log('FAIL page errors',errs.slice(0,3))}
 console.log(bad?`FAIL ${bad}`:`PASS ${R.length}/${R.length}`);await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
