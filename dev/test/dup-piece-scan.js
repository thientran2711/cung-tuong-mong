/* RV-163D §1 family scan (law 6a/6c, law 11): the pieces of ONE deed must never print as identical rows (a counter in disguise).
   usage: node dev/test/dup-piece-scan.js <url> [W=755] [H=1000]   (exit 1 on a duplicate row / page error)
   Family = every place that lists evidence pieces:
     P1 evidence panel «Chứng cứ đang giữ» (j79 kitEvidencePanel ← j78 evidenceOf items)
     P2 her verdict notice «Chứng cứ» row (jcharge punEvTxt, «deed · kind» per piece)
     P3 the «Ngươi có thêm chứng cứ» find line (j78 j78gainTxt)
   Cases: one vừa deed (hủy dung, pk 1 kind) with 3 pieces · one nặng deed (bỏ độc, pk 2 kinds) with 4 pieces · two deeds of one charge.
   Prints the duplicate-row count per place (before/after table in the report). */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});
 const R=await p.evaluate(()=>{const out=[];const r0=Math.random;
  const L=liveRivals(true).filter(x=>!x.queen);
  const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.ev=0;x.evc={};x.ewc={};x.evq={};x.evm={};x.punWk=null;x.punR=null;x.confined=0;x.nheWk=[];x.punDefer=null;x.out=false;x.alive=true;x.coldFrom=null;x.wsee={}};
  const reset=()=>{try{CHM.clear()}catch(e){}for(const x of L.concat([S]))clean(x);S.evd={};S.out=0;S.coldFrom=null;S.coldRank=0;S.coldPend=null;S.confined=0;Q.length=0};
  const dups=a=>{const M={};a.forEach(x=>M[x]=(M[x]||0)+1);return Object.entries(M).filter(([,n])=>n>1)};
  const panel=v=>{const E=evidenceOf(v);return (E&&E.items||[]).map(e=>e.proves)};
  const sec=x=>JSON.stringify(x&&(x.kit&&x.kit.sections||x.sections)||"");
  const A=L[0],C=L[1],D=L[2],X=L[3];
  const cases=[["vừa · hủy dung · 1 deed · 3 pieces",v=>{deedAdd(v,"huydung",C,1,"hủy dung "+C.name);evA(S,v,3,"hd")}],
   ["nặng · bỏ độc · 1 deed · 4 pieces",v=>{deedAdd(v,"poison",C,2,"bỏ độc "+C.name);evA(S,v,4,"mh")}],
   ["vừa · 2 deeds · 4 pieces",v=>{deedAdd(v,"huydung",C,1,"hủy dung "+C.name);deedAdd(v,"huydung",D,1,"hủy dung "+D.name);evA(S,v,4,"hd")}]];
  for(const [n,f] of cases){reset();A.rank=3;f(A);const P=panel(A);const d=dups(P);out.push(["P1 panel",n,P.length,d.length,JSON.stringify(P)])}
  /* P2 notice: an NPC proves her deed (law 1: the same punEvTxt for every accused) */
  const ncases=[["vừa · hủy dung · 1 deed",()=>{deedAdd(S,"huydung",D,1,"hủy dung "+D.name);evA(A,S,chNeed(S,"hd"),"hd")},"hd"],
   ["nặng · bỏ độc · 1 deed",()=>{deedAdd(S,"poison",D,2,"bỏ độc "+D.name);chSawAdd(S,"mh",ledgerId(X));evA(A,S,chNeed(S,"mh")+chWitNeed(S,"mh"),"mh")},"mh"]];
  for(const [n,f,c] of ncases){reset();A.rank=3;S.rank=3;f();Math.random=()=>0;try{chOK(A,S);ACT.accuse.f(A,S)}catch(e){out.push(["P2 notice",n,0,-1,"ERR "+e.message])}finally{Math.random=r0}
   const q=Q.find(x=>x&&/Chứng cứ/.test(sec(x)));const t=q?((sec(q).match(/Chứng cứ","([^"]*)/)||[])[1]||""):"";const segs=(t.split(/: /).slice(1).join(": ")||"").split(/; /).filter(s=>/ · /.test(s));
   out.push(["P2 notice",n,segs.length,dups(segs).length,t])}
  /* P3 find line: several pieces found in one go */
  {reset();A.rank=3;deedAdd(A,"huydung",C,1,"hủy dung "+C.name);evA(S,A,3,"hd");const E=(S.evd[A.id]||[]).slice(-3);const t=j78gainTxt(A,E).replace(/<[^>]+>/g,"");const segs=t.split(": ").slice(1).join(": ").replace(/\.$/,"").split("; ");out.push(["P3 find line","3 pieces at once",segs.length,dups(segs).length,t])}
  return out});
 let fails=0;console.log("place | case | rows | duplicate rows | text");for(const r of R){console.log(r.slice(0,4).join(" | ")+" | "+String(r[4]).slice(0,260));if(r[3]!==0)fails++}
 console.log('page errors:',errs.length,JSON.stringify(errs.slice(0,3)));if(errs.length)fails++;
 console.log(fails?`dup-piece-scan: ${fails} FAIL`:'dup-piece-scan: ALL PASS (0 duplicate rows)');await b.close();process.exit(fails?1:0)})();
