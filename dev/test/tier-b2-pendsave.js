/* tier-b2-pendsave (review/f-tier-b2): a j67 beat left PENDING in a save made on the LIVE build resolves on the retuned build (no option removed,
   indices stable; the save's option snapshot keeps its old numbers). Starts a life on OLD, fires the beat, saves sổ 3; loads it on NEW and
   picks the named option with the game's own chooseM. usage: node dev/test/tier-b2-pendsave.js <old site url> <new site url> */
const {chromium}=require('playwright');const [,,OLD,NEW]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];
 const mk=async url=>{const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(url+' '+e.message.slice(0,200)));
  await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);return p};
 const out={};
 for(const [id,bk,pick] of [['tt_co','s2','Gửi trả về phủ'],['tt_co_5','c2','Đổi người đưa thư'],['dtq_vu_9','t1','Nhờ Thái hậu giữ tráp']]){
 let p=await mk(OLD);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(4000);
 const sv=await p.evaluate(([id,bk])=>{const md=document.getElementById('modal');md.hidden=true;Q.length=0;const A=newThread67(id,'m');A.chap=/_\d+$/.test(id)?9:1;A.i=1;A.due=0;S.st.M=A;A.nb=bk;fireBeat67(A);
  const s=JSON.stringify(ser());localStorage.setItem(SK(3),s);return {k:SK(3),s,cur:A.cur,P:(ser().P||[]).length}},[id,bk]);
 await p.context().close();
 p=await mk(NEW);
 const r=await p.evaluate(([k,s])=>{localStorage.setItem(k,s);const d=loadSlot(3);SLOT=3;document.getElementById('title').hidden=true;deser(d);['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();showModal();
  const A=S.st.M;return {cur:A&&A.cur,P:(S.P||[]).length}},[sv.k,sv.s]);
 await p.waitForTimeout(3000);const clicked=await p.evaluate(pick=>{const m=Q[0];if(!m||!m.opts)return 'no Q[0] '+Q.length;const i=m.opts.findIndex(o=>String(o.n||'').includes(pick));if(i<0)return 'no option';chooseM(i);return 'chooseM '+i},pick);
 await p.waitForTimeout(2500);
 const after=await p.evaluate(bk=>{const A=S.st.M;return {cur:A&&A.cur,used:A&&A.used&&A.used.includes(bk),modal:document.getElementById('modal').innerText.slice(0,160).replace(/\n+/g,' | ')}},bk);
 out[id+'.'+bk]={saved:{cur:sv.cur,P:sv.P},loaded:r,clicked,after};await p.context().close()}
 for(const k in out)if(k!=="btns")console.log(k,out[k].clicked,'resolved:',JSON.stringify(out[k].after.used),out[k].after.cur,out[k].after.modal.slice(0,90));console.log('errors',errs.length,errs.slice(0,3));await b.close()})();
