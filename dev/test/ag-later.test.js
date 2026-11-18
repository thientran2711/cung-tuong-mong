/* AG LATER (npc-chain-land #2): node dev/test/ag-later.test.js [dev/index.html]
   1 a dialog queued by a deferred ag job shows at once (before: "Có người bán tin" sat in Q unseen and swallowed the next "Sẵn sàng")
   2 nextBuoi drains the pending jobs FIRST: the job runs in the buổi it was queued in, never after the boundary; a dialog it queues holds the step
   3 a job queued for one world never runs on another (S swapped: co-op seat swap / load / new life) — dropped, counted in AGL.stat.drop
   4 a job queued in one buổi never runs in the next (the timer fires after the buổi moved without nextBuoi): dropped
   5 the real deferred paths go through it: a buổi of play queues + runs agLater jobs (AGL.stat.run > 0), no caught ag errors, no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  Q.length=0;S.mg=0;const m=document.getElementById('modal');if(m)m.hidden=true;window.__e0=AG.errs.length});
 const dlg='{t:"Thử tin",h:"<p>thử</p>",opts:[{n:"Đã hiểu",fx:{},x:"",go:()=>{}}]}';
 /* 1 */
 await p.evaluate(d=>{agLater("t1",()=>Q.push(eval('('+d+')')))},dlg);await sleep(300);
 const r1=await p.evaluate(()=>({q:Q.length,hidden:document.getElementById('modal').hidden}));ok(r1.q===1&&!r1.hidden,'1 a dialog queued by a deferred job is shown at once',r1);
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 /* 2 */
 const r2=await p.evaluate(d=>{const b0=S.buoi||0,w0=wk();let ranIn=null;agLater("t2",()=>{ranIn=wk()+"-"+(S.buoi||0);Q.push(eval('('+d+')'))});nextBuoi();
  return{ranIn,at:w0+"-"+b0,moved:(S.buoi||0)!==b0||wk()!==w0,q:Q.length,hidden:document.getElementById('modal').hidden,pend:AGL.L.filter(x=>x.k==="t2").length}},dlg);
 ok(r2.ranIn===r2.at&&!r2.moved&&r2.q===1&&!r2.hidden&&r2.pend===0,'2 nextBuoi drains first: the job runs in its own buổi, its dialog shows and holds the step',r2);
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 /* 3 */
 const r3=await p.evaluate(()=>{let ran=0;const d0=AGL.stat.drop;const S0=S;agLater("t3",()=>{ran=1});S=Object.assign(Object.create(Object.getPrototypeOf(S0)),S0);agDrain();const out={ran,drop:AGL.stat.drop-d0};S=S0;return out});
 ok(r3.ran===0&&r3.drop===1,'3 a job of another world is dropped, never run',r3);
 /* 4 */
 const r4=await p.evaluate(()=>{let ran=0;const d0=AGL.stat.drop;const b0=S.buoi||0;agLater("t4",()=>{ran=1});S.buoi=(b0+1)%4;agDrain();const out={ran,drop:AGL.stat.drop-d0};S.buoi=b0;return out});
 ok(r4.ran===0&&r4.drop===1,'4 a job of an earlier buổi is dropped, never run in the next',r4);
 /* 5 */
 const r5=await p.evaluate(async()=>{const r0=AGL.stat.run;for(let i=0;i<8;i++){Q.length=0;S.mg=0;document.getElementById('modal').hidden=true;try{nextBuoi()}catch(e){}await new Promise(r=>setTimeout(r,120))}
  return{run:AGL.stat.run-r0,drain:AGL.stat.drain,errs:AG.errs.slice(window.__e0)}});
 ok(r5.run>0&&!r5.errs.length,'5 real play goes through agLater, no caught ag errors',r5);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`FAIL ag-later ${res.length-n}/${res.length}`:`PASS ag-later ${res.length}/${res.length}`);process.exit(n?1:0)})();
