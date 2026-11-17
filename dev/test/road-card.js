/* road-card (review/road-b3): one road chapter card per origin (the kit j67 event card), screenshot + overflow check.
   usage: node dev/test/road-card.js <url> <WxH> <outdir> <chapterId>[,<chapterId>…]   e.g. thd_sach_9,cnv_mat_8,hau14 */
const {chromium}=require('playwright');const [,,URL,VP,DIR,IDS]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));let bad=0;
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 for(const id of IDS.split(',')){const k=id.startsWith('cnv')?'cnv':id.startsWith('thd')?'thd':'tt';
  await p.evaluate(k=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin=k;document.getElementById('title').hidden=true;start()},k);
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
  const r=await p.evaluate(id=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());const md=document.getElementById('modal');md.hidden=true;md.className='modal';Q.length=0;
   if(id.startsWith('cnv')&&S.srv&&!S.srv.risen&&/_(9|10|11)$/.test(id)){S.age=Math.max(S.age||0,18);srvRise('test')}
   if(S.rank<3&&!(S.srv&&!S.srv.risen))S.rank=3;
   const A=newThread67(id,'m');if(!A)return{err:'cast '+id};A.chap=9;A.i=1;A.due=0;S.st.M=A;pickNext67(A);A.due=0;fireBeat67(A);showModal();render();return{beat:A.cur}},id);
  await p.waitForTimeout(2500);const o=await p.evaluate(()=>({ov:document.documentElement.scrollWidth>innerWidth+1,modal:!document.getElementById('modal').hidden}));
  console.log(id,VP,JSON.stringify(r),JSON.stringify(o));if(r.err||o.ov||!o.modal)bad++;
  await p.screenshot({path:`${DIR}/${id}-${W}.png`})}
 console.log('errors',errs.length,errs.slice(0,3));await b.close();process.exit(bad||errs.length?1:0)})();
