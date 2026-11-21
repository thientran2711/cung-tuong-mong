/* dresscode-ts-loan (r4b, E30c): F1 of E30r3 ROUND 3 — the Hội phối đồ «Mượn … để dự hội phối đồ» and the «Cho mượn» visit (j68g borrowDress)
   are loans of THE ONE LOAN RULE (jdc dcBorrow / loan book / dcGiveBack), never a second mark (e.tsB) or a loan with no object (law 6c, 11, 14).
   Same boot as dresscode-loans.js.   usage: node dev/test/dresscode-ts-loan.js [dev/index.html]   → exit 1 on FAIL or page error
   Checks: (1) borrow → one copy, on her, e.bor {why ts, due = contest tuần}, on the lender's book; real endTurn ×3 before the contest: still hers,
   not lendable (dcOwnFit), not sellable / giftable; contest end (real tsDressHold, her away → finish) → back to the lender, once, book empty.
   (2) stale dialog: the piece left the lender's chest → nothing moves. (3) old save: e.tsB → migrated by deser to e.bor + the lender's book;
   contest end → home. (4) old e.tsB with no contest pending → home at the next real endTurn. (5) lender gone from the world → the ledger box,
   never kept. (6) «Cho mượn» visit: her named piece really goes to the NPC (one copy), back the next tuần. (7) no tsB mark left anywhere. */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'dev/index.html';let fail=0;const ck=(n,c,x)=>{console.log((c?'ok  ':'FAIL')+' '+n+(x!==undefined?' · '+JSON.stringify(x):''));if(!c)fail++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('console',m=>{if(m.type()==='error'&&/^dc|dcReturn|dcLedger|dcTurn|dcWeek|dcMigTs|tsBor/.test(m.text()))errs.push('console: '+m.text().slice(0,200))});
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(async()=>{let sd=20261121;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());Q.length=0;used=0;S.suc=90;try{closeModal()}catch(e){}});
 const R=await p.evaluate(()=>{const out={};const a0=aff;
  const where=tg=>{const L=[];for(const q of [S].concat(rivals.filter(x=>!x.coop))){const w=wdOf(q);for(const sl of ['tram','y'])if(w&&w[sl]&&w[sl].tg===tg)L.push((q===S?'me':q.id)+':'+sl);for(const e of q.inv||[])if(e&&e.tg===tg)L.push((q===S?'me':q.id)+':i');for(const x of q.wdPawn||[])if(x&&x.e&&x.e.tg===tg)L.push((q===S?'me':q.id)+':pawn')}
   for(const x of (S.il&&S.il.box)||[])if(x&&x.e&&x.e.tg===tg)L.push('box');return L};
  const live=()=>rivals.filter(v=>v&&v.alive&&!v.out&&!v.confined&&!v.coop);
  const turn=n=>{for(let i=0;i<n;i++){used=0;S.suc=90;S.out=0;S.confined=0;try{endTurn()}catch(x){out.err=String(x)}Q.length=0;S.mg=null}};
  const setDress=(ahead)=>{const m0=S.year*12+S.month-1+ahead;tsS().dress={th:'thanh',m:m0%12+1,y:Math.floor(m0/12)};tsS().borrow=0};
  /* (1) the real option */
  const v=live()[0];const K='vongngoc';S.inv=(S.inv||[]).filter(e=>!TS_THEME.thanh.tags.includes(e.k));v.inv=(v.inv||[]).filter(e=>!TS_THEME.thanh.tags.includes(e.k));v.inv.push({k:K,from:'emp',tg:'t1'});
  setDress(2);aff=(x,y)=>(x===v&&y===S)?80:a0(x,y);let O;try{O=tsBorrowOpts('thanh')}finally{aff=a0}
  const o=O.find(o=>o.n.indexOf(v.name)>=0);out.opt=o?o.n:null;
  if(o){const due0=tsBorDue();o.go();const e=S.inv.find(e=>e.tg==='t1');out.b1={at:where('t1'),why:e&&e.bor&&e.bor.why,due:e&&e.bor&&e.bor.due,due0,book:(v.dcLent||[]).filter(r=>r.k===K).length,iu:e&&e.iu};
   out.b1.lendable=dcOwnFit(S,Object.keys(BAL.dc.fam||{}).concat(['do','vang','xanh','tim','trang','den','hong','lam','luc','nau']),'tram').some(x=>x.e.tg==='t1')||(typeof dcFree==='function'&&dcFree(e));
   const ix=S.inv.indexOf(e);out.b1.sell=(typeof sellItem==='function'?sellItem(S,ix):'')||'';out.b1.give=(typeof giveTo==='function'?giveTo(S,live()[1]||v,S.inv.indexOf(e)):'')||'';
   turn(3);out.b1.mid=where('t1');out.b1.midWk=dcWk();
   /* contest day: real tsDressHold (her away → finish(null) → tsDressReturn) */
   const D=tsS().dress;S.month=D.m;S.year=D.y;const so=S.out;S.out=1;try{tsDressHold()}catch(x){out.err1=String(x)}S.out=so||0;Q.length=0;
   out.b1.end=where('t1');out.b1.bookEnd=(v.dcLent||[]).filter(r=>r.k===K).length;out.b1.bor=(v.inv.find(e=>e.tg==='t1')||{}).bor||null}
  /* (2) stale dialog */
  {const v2=live()[1];v2.inv=(v2.inv||[]).filter(e=>!TS_THEME.thanh.tags.includes(e.k));v2.inv.push({k:'tuithom',from:'emp',tg:'t2'});S.inv=S.inv.filter(e=>e.k!=='tuithom');setDress(2);aff=(x,y)=>(x===v2&&y===S)?80:a0(x,y);let O2;try{O2=tsBorrowOpts('thanh')}finally{aff=a0}
   const o2=O2.find(o=>o.n.indexOf(v2.name)>=0);const e2=v2.inv.find(e=>e.tg==='t2');const v3=live()[2];v2.inv.splice(v2.inv.indexOf(e2),1);v3.inv.push(e2);if(o2)o2.go();out.b2={opt:!!o2,at:where('t2'),flag:tsS().borrow}}
  /* (3) old save: e.tsB */
  {const v4=live()[3]||v;S.inv.push({k:'huongtram',from:'emp',tg:'t3',tsB:v4.id});setDress(2);const raw=ser();deser(typeof raw==='string'?raw:JSON.parse(JSON.stringify(raw)));
   const e=S.inv.find(e=>e.tg==='t3');const v4b=rivals.find(x=>x.id===v4.id);out.b3={at:where('t3'),tsB:e?e.tsB:null,why:e&&e.bor&&e.bor.why,book:(v4b.dcLent||[]).some(r=>r.k==='huongtram'),due:e&&e.bor&&e.bor.due,cw:tsBorDue()};
   tsDressReturn();out.b3.end=where('t3');out.b3.home=where('t3').join()===v4.id+':i';out.b3.bookEnd=(v4b.dcLent||[]).some(r=>r.k==='huongtram')}
  /* (4) old e.tsB, no contest pending */
  {const v5=live()[4]||v;tsS().dress=null;S.inv.push({k:'luahang',from:'emp',tg:'t4',tsB:v5.id});const raw=ser();deser(typeof raw==='string'?raw:JSON.parse(JSON.stringify(raw)));turn(2);out.b4={at:where('t4'),home:where('t4').join()===v5.id+':i'}}
  /* (5) lender gone */
  {const v6=live()[5]||v;v6.inv=(v6.inv||[]).filter(e=>!TS_THEME.thanh.tags.includes(e.k));v6.inv.push({k:'tramngoc',from:'emp',tg:'t5'});S.inv=S.inv.filter(e=>e.k!=='tramngoc');setDress(2);aff=(x,y)=>(x===v6&&y===S)?80:a0(x,y);let O5;try{O5=tsBorrowOpts('thanh')}finally{aff=a0}
   const o5=O5.find(o=>o.n.indexOf(v6.name)>=0);if(o5)o5.go();const at0=where('t5');const ri=rivals.indexOf(v6);rivals.splice(ri,1);tsDressReturn();out.b5={opt:!!o5,at0,at:where('t5')};rivals.splice(ri,0,v6)}
  /* (6) «Cho mượn» visit */
  {const v7=live()[0];const P=PEND.e68borrowDress;S.inv.push({k:'dancoc',from:'emp',tg:'t6'});const pp={a0:v7.id,vi:1};const d=P(pp);out.b6={built:!!d,t:d&&d.t,bk:pp.bk};
   if(d){d.o[0].go();out.b6.lent=where('t6');const e=v7.inv.find(e=>e.tg==='t6');out.b6.bor=e&&e.bor;turn(2);out.b6.back=where('t6')}
   const d2=P({a0:v7.id,vi:1});if(d2){const e=S.inv.find(e=>e.tg==='t6');if(e){S.inv.splice(S.inv.indexOf(e),1);live()[1].inv.push(e)}d2.o[0].go();out.b6.stale=where('t6')}}
  /* (8) the reviewer's P1 (jky × jlost): a lost case found by Kỳ ngộ goes home once — no «dead» copy in the ledger box, case closed */
  {const o=live()[2];const e={k:'tram_ngoclan',from:'emp',tg:'t8'};o.inv.push(e);const c=loLoseE(o,o.inv.splice(o.inv.indexOf(e),1)[0],'srv');const bx0=((S.il&&S.il.box)||[]).length;
   const F=live()[3];const r1=KY.SPEC.item({F,X:{lc:c},oi:0},{});const r2=KY.SPEC.ev({F,X:{lc:c}},{});out.b8={c:!!c,st:c&&c.st,at:where('t8'),box:((S.il&&S.il.box)||[]).length-bx0,r1,r2}}
  out.tsB=[S].concat(rivals).flatMap(q=>q.inv||[]).filter(e=>e&&e.tsB!=null).length;
  return out});
 const b1=R.b1||{};
 ck('(1) the Hội phối đồ offers «Mượn … của …»',!!R.opt,R.opt);
 ck('(1) borrow: one copy, in her chest, loan mark why ts, due = the contest tuần, on the lender book',b1.at&&b1.at.join()==='me:i'&&b1.why==='ts'&&b1.due===b1.due0&&b1.book===1&&!!b1.iu,b1);
 ck('(1) a contest loan is not hers: not lendable, not sold, not given',!b1.lendable&&!b1.sell&&!b1.give,{l:b1.lendable,s:b1.sell,g:b1.give});
 ck('(1) 3 real tuần before the contest: still with her, one copy',b1.mid&&b1.mid.join()==='me:i',b1.mid);
 ck('(1) contest end (real tsDressHold): back to the lender once, no loan mark, book empty',b1.end&&b1.end.length===1&&!/^me/.test(b1.end[0])&&b1.end[0].endsWith(':i')&&!b1.bor&&b1.bookEnd===0,{end:b1.end,bor:b1.bor,book:b1.bookEnd,err:R.err1});
 ck('(2) stale dialog: the piece left the lender meanwhile → nothing moves, no borrow flag',R.b2&&R.b2.at.length===1&&!/^me/.test(R.b2.at[0])&&!R.b2.flag,R.b2);
 ck('(3) old save e.tsB → loan mark (why ts) + lender book, no tsB',R.b3&&R.b3.why==='ts'&&R.b3.tsB==null&&R.b3.book&&R.b3.at.join()==='me:i',R.b3);
 ck('(3) migrated loan home at the contest end, book empty',R.b3&&R.b3.home&&!R.b3.bookEnd,R.b3&&R.b3.end);
 ck('(4) old e.tsB with no contest pending → home at the next real tuần',R.b4&&R.b4.home,R.b4);
 ck('(5) lender gone from the world → the ledger box, not kept by her',R.b5&&R.b5.opt&&R.b5.at.join()==='box',R.b5);
 ck('(6) «Cho mượn» visit names her real piece and it really goes to the NPC (one copy, loan mark)',R.b6&&R.b6.built&&R.b6.lent&&R.b6.lent.length===1&&!/^me/.test(R.b6.lent[0])&&R.b6.bor&&R.b6.bor.why==='ev'&&/Tiêu Vĩ/.test(R.b6.t||''),R.b6);
 ck('(6) back to her the next tuần, one copy',R.b6&&R.b6.back&&R.b6.back.join()==='me:i',R.b6&&R.b6.back);
 ck('(6) stale visit: her piece already elsewhere → nothing moves',R.b6&&R.b6.stale&&R.b6.stale.length===1&&!/^me/.test(R.b6.stale[0]),R.b6&&R.b6.stale);
 ck('(8) Kỳ ngộ finds a lost case: the piece home once (owner), case done, no ledger copy — also when found twice',R.b8&&R.b8.c&&R.b8.st==='done'&&R.b8.at.length===1&&R.b8.at[0].endsWith(':i')&&!/^me/.test(R.b8.at[0])&&R.b8.box===0,R.b8);
 ck('(7) no e.tsB mark anywhere',R.tsB===0,R.tsB);
 ck('no page errors',!errs.length&&!R.err,errs.slice(0,4).concat(R.err?[R.err]:[]));
 console.log(fail?`dresscode-ts-loan: ${fail} FAIL`:'dresscode-ts-loan: ALL PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
