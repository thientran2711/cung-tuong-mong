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
  /* E44e (V «hảo hữu lấy» vanish): HOST seat, a host NPC's theft from her ENTRY (jlost loLose riv, as laydo does; the NPC-turn diff b4Ops, same as the r1 runAct wrapper): the piece goes into a
     «thất lạc» case of her entry (kept as a COPY by the thief, or held by the case to plant) → the op is «rm lost» by that NPC (her seat opens her case),
     never «gone» (before: she lost it with no case, the host's case of her entry was the only trace) */
  reset();{const v=rivals.find(x=>x&&!x.coop&&x.alive!==false&&x.out!==true);const on7=CW.on,se7=CW.seat,sd=COOP.send,cg=window.caught,ar=window.aRoll,kp=window.loKeepPick,nk=window.npcKnows,jg=window.j95gate;const sn7=[],nkn0=S.nkn,j9=window.__j95off;
   const f={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[],rank:3,fav:50,maid:{loyal:50}};rivals.push(f);const res=[];
   try{CW.on=true;CW.seat="a";COOP.send=m=>sn7.push(m);caught=()=>null;aRoll=()=>true;S.nkn=null;window.__j95off=1;
    for(const kpv of ["keep","plant"]){loKeepPick=()=>kpv;const e=pc(P);e.ci=0;f.inv=[e];S.loSeq=S.loSeq||0;(S.lost||[]).forEach(c=>{if(c.own===902)c.st="done"});
     v.bac=Math.max(v.bac||0,9999);const n0=sn7.length;let er="";try{CW.b4Run(()=>{const c=loLose(f,{cause:"riv",by:key(v),keep:kpv==="keep"?1:0});er=c?c.st+"@"+(c.at||""):"no case"})}catch(z){er=z.message}
     const ops=sn7.slice(n0).flatMap(m=>m.fam||[]).filter(o=>o.op==="rm"&&o.iu===e.iu);const c=(S.lost||[]).find(c=>c.e&&c.e.iu===e.iu);res.push({kpv,er,left:!f.inv.includes(e),ops,cst:c&&c.st})}}
   finally{S.nkn=nkn0;window.__j95off=j9;CW.on=on7;CW.seat=se7;COOP.send=sd;caught=cg;aRoll=ar;loKeepPick=kp;rivals.splice(rivals.indexOf(f),1);v.inv=(v.inv||[]).filter(e=>!(e.iu>9e6))}
   const okr=r=>r.left&&r.ops.length===1&&r.ops[0].how==="lost"&&r.ops[0].by===v.id;
   ck("19 host NPC steals from her entry and KEEPS it (copy): «rm lost» by that NPC, never «gone»",okr(res[0]||{}),res[0]);
   ck("19b host NPC steals to PLANT (the case holds it): «rm lost» by that NPC, never «gone»",okr(res[1]||{}),res[1])}
  /* E44e: her entry REBUILT during a diffed NPC call (new objects, same ledger ids; the festival result diffs the snapshot from its start): nothing moved */
  reset();{const on8=CW.on,se8=CW.seat,sd=COOP.send;const sn8=[];const f={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[],rank:3,fav:50};rivals.push(f);let ops8=[];
   try{CW.on=true;CW.seat="a";COOP.send=m=>sn8.push(m);const e1=pc(P),e2=pc(P);e1.ci=0;e2.ci=1;f.inv=[e1,e2];f.kids=[{name:"Tiểu A",bt:7,alive:true,hp:50,tal:10,fond:50}];
    CW.b4Run(()=>{f.inv=f.inv.map(e=>Object.assign({},e));f.kids=f.kids.map(k=>Object.assign({},k))});ops8=sn8.flatMap(m=>m.fam||[])}
   finally{CW.on=on8;CW.seat=se8;COOP.send=sd;rivals.splice(rivals.indexOf(f),1)}
   {const f2={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[]};rivals.push(f2);const sn9=[];const sd9=COOP.send,o9=CW.on,s9=CW.seat;
    try{CW.on=true;CW.seat="a";COOP.send=m=>sn9.push(m);const g1=pc(P);g1.ci=0;const g2=Object.assign({},g1);f2.inv=[g1,g2];CW.b4Run(()=>{f2.inv.splice(1,1)})}
    finally{CW.on=o9;CW.seat=s9;COOP.send=sd9;rivals.splice(rivals.indexOf(f2),1)}
    ck("20b two objects of one id in her entry, one taken: still one «rm» (an id-set match sent none: dup)",sn9.flatMap(m=>m.fam||[]).filter(o=>o.op==="rm").length===1,sn9.map(m=>m.fam))}
   ck("20 her entry rebuilt (same ids): no «rm» / «add» / «ktake» (was: every piece taken and given again, every child taken)",!ops8.some(o=>o.op==="rm"||o.op==="add"||o.op==="ktake"||o.op==="kd"),ops8.map(o=>o.op+":"+(o.iu||(o.e&&o.e.iu))))}
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
  /* E44g T1 (coop-lost-scan vanish 10000013 / 10000014 / 10000078 / 10000165, both builds): the host's festival result waits for his contest
     minigame (fxFin7 later; CW.f7 may stay open for weeks). Meanwhile she puts on garment X on her own seat (X leaves her chest, the one she
     wore, G, comes back) → her relay rebuilds her entry; and the host's own act takes piece Q from her entry (that act sent its own op).
     Before: f7Done diffed the festival-START snapshot → «rm gone» X (her famItem finds it WORN → vanish), «add» G (a 2nd copy), «rm» Q again,
     «ktake» her child. Now: fxFin7 diffs its own call only; a synchronous festival still sends what it gave her. */
  {reset();const on21=CW.on,se21=CW.seat,sd21=COOP.send,f721=CW.f7,pu21=CW.pulled;const sn=[];const Y=Object.keys(WD_ITEMS).filter(k=>WD_ITEMS[k].sl==="y"&&IT[k]);
   const kid={name:"Tiểu B",bt:5,alive:true,hp:50,tal:10,fond:50};const f={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[Object.assign({},kid)],rank:3,fav:50};rivals.push(f);
   const X=pc(Y[0]),Pz=pc(P),Qz=pc(P),G={k:Y[1],from:"emp"},Z=pc(P);let o21=[],o21d=[],er21="",def21=null;const TT="Hội thi T21";
   try{CW.on=true;CW.seat="a";COOP.send=m=>{sn.push(m);return true};
    f.inv=[X,Pz,Qz].map((e,i)=>Object.assign({},e,{ci:i}));CW.pulled=[[0,f]];
    CW.b4Wrap("festival",t=>{Q.push({t,h:"<p>T21</p>",btn:"Đã hiểu"})})(TT);def21={open:!!CW.f7,b:CW.f7&&CW.f7.b};Q.length=0;CW.pulled=null;
    f.inv.splice(2,1);/* the host's own act took Qz (its op went with that act) */
    COOP.emit("act",{t:"act",k:"ctm-fam",mode:"fam",h:"t21",from:"b",name:f.name,pets:null,fam:{bag:[Pz,G].map((e,i)=>Object.assign({},e,{ci:i})),kids:[Object.assign({},kid)],preg:0,fake:0,fx7:null}});
    fxFin7(TT,[]);o21=sn.flatMap(m=>m.fam||[]);
    sn.length=0;CW.pulled=[[0,f]];CW.b4Wrap("festival",t=>{f.inv.push(Object.assign({},Z));CW.f7.L=[]})("Hội thi T21d");CW.pulled=null;o21d=sn.flatMap(m=>m.fam||[])}catch(e){er21=e.message}
   finally{CW.on=on21;CW.seat=se21;COOP.send=sd21;CW.f7=f721;CW.pulled=pu21;rivals.splice(rivals.indexOf(f),1)}
   const rmadd=o21.filter(o=>o&&(o.op==="rm"||o.op==="add"||o.op==="ktake"));
   ck("21 festival result pending: her relay rebuilt her entry (X put on) + a host act took Q: no «rm» / «add» / «ktake» at the result (was: X off her, G twice, Q again)",!er21&&def21&&def21.open&&def21.b===null&&!rmadd.length,{er21,def21:def21&&{open:def21.open,b:!!def21.b},ops:rmadd.map(o=>o.op+":"+(o.iu||(o.e&&o.e.iu)||0)+":"+(o.k||(o.e&&o.e.k)))});
   ck("21d a synchronous festival still sends what it gave her («add» of the prize, once)",!er21&&o21d.filter(o=>o&&o.op==="add"&&o.e&&o.e.iu===Z.iu).length===1,{er21,ops:o21d.map(o=>o&&o.op)});
   reset();S.inv=[Object.assign({},Pz),Object.assign({},G)];S.wd={tram:null,y:Object.assign({},X)};FA(o21);
   ck("21b her seat applies the host's ops: X still worn, ONE G in her chest",S.wd.y&&S.wd.y.iu===X.iu&&S.inv.filter(e=>e.k===G.k).length===1,{y:S.wd.y,inv:S.inv.map(e=>e.k)})}
  /* E44g T6 (coop-lost-scan vanish 934 / 3385 / 2028): an NPC gives a piece to her entry OUTSIDE the diffed calls (an agent act, a monthly gift):
     before, jil logged «sang hảo hữu» and no op carried it (the piece stayed on the host's copy of her entry). Now one «add» to her seat;
     inside a diffed call still exactly one (b4Ops). */
  {reset();const on22=CW.on,se22=CW.seat,sd22=COOP.send;const sn=[];const f={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[],rank:3,fav:50};rivals.push(f);
   const v=rivals.find(x=>x&&!x.coop&&x.alive!==false);v.inv=v.inv||[];let er22="",n1=-1,n2=-1,e1=null,e2=null;
   try{CW.on=true;CW.seat="a";COOP.send=m=>{sn.push(m);return true};
    e1=pc(P);v.inv.push(e1);giveTo(v,f,v.inv.indexOf(e1));n1=sn.flatMap(m=>m.fam||[]).filter(o=>o&&o.op==="add"&&o.e&&o.e.iu===e1.iu).length;
    e2=pc(P);v.inv.push(e2);CW.b4Run(()=>giveTo(v,f,v.inv.indexOf(e2)));n2=sn.flatMap(m=>m.fam||[]).filter(o=>o&&o.op==="add"&&o.e&&o.e.iu===e2.iu).length}catch(e){er22=e.message}
   finally{CW.on=on22;CW.seat=se22;COOP.send=sd22;rivals.splice(rivals.indexOf(f),1);v.inv=v.inv.filter(e=>!(e.iu>9e6))}
   ck("22 an NPC gives a piece to her entry outside a diffed call: ONE «add» to her seat (was: none, stranded on the host's copy)",!er22&&f.inv.some(e=>e.iu===e1.iu)&&n1===1,{er22,n1,inv:f.inv.map(e=>e.iu)});
   ck("22b the same gift inside a diffed NPC call: still exactly one «add»",!er22&&n2===1,{er22,n2})}
  /* E44g T5 (coop-lost-scan dup 10000030): the jil market buyer (npc-purpose ilBuy) picked HER entry on the host; with the stale festival diff
     gone the piece would be stranded on the host's copy. Now she is never an NPC buyer, and any box piece handed to her entry goes to her seat. */
  {reset();const on23=CW.on,se23=CW.seat,sd23=COOP.send;const sn=[];const f={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[],rank:3,fav:50,bac:9999};rivals.push(f);let er23="",w23=null,n23=-1;
   try{CW.on=true;CW.seat="a";COOP.send=m=>{sn.push(m);return true};const e=pc(P);const x={e,at:"mkt",own:"",w:wk(),pr:1};
    w23=NPW.reg.ilBuy.who({x,o:null});ilS().box.push(x);ilTake(x,f,"mua");n23=sn.flatMap(m=>m.fam||[]).filter(o=>o&&o.op==="add"&&o.e&&o.e.iu===e.iu).length}catch(z){er23=z.message}
   finally{CW.on=on23;CW.seat=se23;COOP.send=sd23;rivals.splice(rivals.indexOf(f),1)}
   ck("23 the market buyer list never holds her entry (a player seat)",!er23&&Array.isArray(w23)&&!w23.includes(f),{er23,n:w23&&w23.length});
   ck("23b a box piece handed to her entry on the host: ONE «add» to her seat",!er23&&n23===1,{er23,n23})}
  /* E44h (coop-lost-scan-traced 9001 vanish 10000200, «kyngo lead»): an NPC holds a piece of HERS (her case on the host); Kỳ ngộ returns it
     (lostReturn how «kyngo»): ONE «ret» to her seat and famSweep sends NO «gone» after it (was: «gone matdau» → her seat dropped it). Every
     return road of jlost (tra / xet / nop / soat / nha / kyngo) is covered by identity. */
  {const R24=[];for(const how of ["kyngo","tra","xet","nop","soat","nha"]){reset();const on24=CW.on,se24=CW.seat,sd24=COOP.send;const sn=[];const f={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[],rank:3,fav:50,bac:9999};rivals.push(f);
   const v=rivals.find(x=>x&&!x.coop&&x.alive!==false);let er24="",nr=-1,ng=-1;
   try{CW.on=true;CW.seat="a";COOP.send=m=>{sn.push(m);return true};CW.famSt={};CW.famSw=1;const e=pc(P);S.loSeq=(S.loSeq||0)+1;
    const c={id:S.loSeq,k:P,e,own:902,w:wk(),due:wk()+9,st:"held",at:key(v),by:key(v),keep:1,cause:"riv",kn:{},open:0,cev:0,hear:0};loL().push(c);
    const x=Object.assign({},e,{lo:c.id,gh:902,by:key(v)});v.inv=v.inv||[];v.inv.push(x);CW.famSweep();
    lostReturn(x,how);CW.famSweep();const ops=sn.flatMap(m=>m.fam||[]);nr=ops.filter(o=>o&&o.op==="ret").length;ng=ops.filter(o=>o&&o.op==="gone").length;
    v.inv=v.inv.filter(y=>y!==x);loL().splice(loL().indexOf(c),1)}catch(z){er24=z.message}
   finally{CW.on=on24;CW.seat=se24;COOP.send=sd24;rivals.splice(rivals.indexOf(f),1)}R24.push([how,er24,nr,ng])}
   ck("24 her piece returned by any road (kyngo, tra, xet, nop, soat, nha): ONE «ret», no «gone» after it",R24.every(([h,er,nr,ng])=>!er&&nr===1&&ng===0),R24)}
  /* E44h T8 (coop-lost-scan-traced SWAP dup 54): the npc-purpose roll (npwAsk) never makes her entry (a player seat) the NPC actor — loTake made her
     the keeping thief of an NPC's piece. Checked on a test kind whose who list is liveRivals(true) and on loTake itself. */
  {const f={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[],rank:3,fav:50,bac:9999};rivals.push(f);let er25="",a25=null,l25=null;
   try{NPW.reg.__t25={grp:"t",who:()=>liveRivals(true),why:()=>({s:9999})};a25=npwAsk("__t25",{}).map(o=>o.who);const v=rivals.find(x=>x&&!x.coop&&x.alive!==false);l25=npwAsk("loTake",{p:v}).map(o=>o.who)}catch(z){er25=z.message}
   finally{delete NPW.reg.__t25;rivals.splice(rivals.indexOf(f),1)}
   ck("25 the npc-purpose roll never picks her entry as the NPC actor (any kind; loTake)",!er25&&a25&&a25.length>0&&!a25.includes(f)&&l25&&!l25.includes(f),{er25,n:a25&&a25.length,hasF:a25&&a25.includes(f),lo:l25&&l25.includes(f)})}
  /* E44i T3 (coop-lost-scan LIVE SWAP 10000013: laydo w1, «ret» w4, her seat had no case): the host's «rm lost» takes a durable piece of hers that
     her own seat's loLose filter refuses (here: marked keep): before, the piece left with NO case (untraceable on her seat; the host's «ret» found
     nothing to close). Now her case is opened and held by the thief; the «ret» closes it with one piece home. */
  {reset();const t3=pc(P);t3.keep=1;S.inv.push(t3);const ok0=loOk(t3);FA([{op:"rm",ci:0,k:P,iu:t3.iu,how:"lost"}]);const c26=(S.lost||[]).find(c=>c.e&&c.e.iu===t3.iu);
   ck("26 rm lost of her durable piece her loLose refuses: her case opens, held by the thief (was: no case)",!ok0&&cnt(t3.iu)===0&&c26&&c26.st==="held"&&c26.own==="me"&&c26.at,{ok0,st:c26&&c26.st,at:c26&&c26.at,n:cnt(t3.iu)});
   const r26=FA([{op:"ret",k:P,iu:t3.iu,e:{k:P,iu:t3.iu}}]);ck("26b the host's «ret» closes that case, ONE piece home, no famMiss «no case»",c26&&c26.st==="done"&&cnt(t3.iu)===1&&!CW.famMiss.some(m=>/no case/.test(m.why)),{st:c26&&c26.st,n:cnt(t3.iu),miss:CW.famMiss});
   reset();const t3b={k:P,iu:++n,lo:4242};S.inv.push(t3b);FA([{op:"rm",ci:0,k:P,iu:t3b.iu,how:"lost"}]);ck("26c a piece marked lo (someone else's case piece) opens no case of hers",!(S.lost||[]).some(c=>c.e&&c.e.iu===t3b.iu),(S.lost||[]).length)}
  /* E44i T9 probe (coop-lost-scan-traced SWAP: a host case of an NPC's piece «held» by her entry): the month's maid sale (j8 maidMonthP, run by
     rivalsMonth WITH her entry in the harem) picks the buyer over others(p) = every consort: her entry (a player seat) could be the NPC buyer
     → maidTheft → loKeepBy(c, her entry): the NPC's piece lands on the host's copy of her entry, her silver paid by an NPC roll. */
  {reset();const on27=CW.on,se27=CW.seat,nw=window.npcWhy;const f={id:902,coop:1,name:"Hảo hữu",alive:true,inv:[],kids:[],rank:3,fav:50,bac:99999};rivals.push(f);let er27="",c27=null,bk=null;
   const v=rivals.find(x=>x&&!x.coop&&x.alive!==false&&!x.out&&x!==f);const sv=consorts().map(x=>[x,x.bac]);const e27=pc(P);
   try{CW.on=true;CW.seat="a";for(const x of consorts())if(x!==f)x.bac=0;v.inv=v.inv||[];v.inv.push(e27);v.schemes=0;v.loCd=0;if(!v.maid)v.maid=maidMk(v);v.maid.loyal=0;
    window.npcWhy=(k,c,d)=>k==="maidSell"?{who:v,s:1}:nw(k,c,d);(S.lost||[]).forEach(c=>{if(c.own===key(v))c.st="done"});
    maidMonthP(v);c27=(S.lost||[]).find(c=>c.e&&c.e.iu===e27.iu);bk=c27&&c27.at}catch(z){er27=z.message}
   finally{window.npcWhy=nw;CW.on=on27;CW.seat=se27;for(const [x,b] of sv)x.bac=b;rivals.splice(rivals.indexOf(f),1);v.inv=(v.inv||[]).filter(e=>e.iu!==e27.iu&&!(e.lo&&c27&&e.lo===c27.id));if(c27)c27.st="done"}
   ck("27 the month's maid sale never makes her entry the NPC buyer (no NPC piece held by her entry, her silver untouched)",!er27&&String(bk)!==String(key(f))&&f.bac===99999,{er27,at:bk,bac:f.bac,st:c27&&c27.st})}
  const fr2=CW.famRet({k:P,iu:5,hiu:6});ck("14b famRet sends the piece's hiu as alt",Array.isArray(fr2.alt)&&fr2.alt.includes(6),fr2);
  return out});
 let bad=0;for(const [n,ok,i] of R){if(!ok)bad++;console.log((ok?'ok  ':'FAIL')+' '+n+(ok?'':' '+i))}if(errs.length){bad++;console.log('FAIL page errors',errs.slice(0,3))}
 console.log(bad?`FAIL ${bad}`:`PASS ${R.length}/${R.length}`);await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
