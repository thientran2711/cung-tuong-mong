/* walk every top tab group, its sub-tabs (.ksubb[data-ksub] / [data-kinvsub]) and Tư trang filters; cb(path) at each view */
const GROUPS=[['act','Hành sự'],['go','Dư đồ'],['court','Hậu cung'],['rel','Giao tình'],['kid','Hoàng tự'],['inv','Tư trang'],['art','Tài nghệ'],['story','Mệnh truyện']];
module.exports=async function walk(f,cb,only,pre){
 for(const [t,tn] of GROUPS){if(only&&!only.includes(t))continue;
  await f.evaluate(t=>{tab=t;render();const p=document.getElementById('panel');if(p)p.scrollTop=0},t);await f.waitForTimeout(400);if(pre)await pre();
  const getSubs=()=>f.evaluate(()=>[...document.querySelectorAll('#panel .ksubb,.ksubb')].filter((e,i,a)=>a.indexOf(e)===i&&e.getClientRects().length).map(e=>[e.dataset.ksub?'ksub':'kinvsub',e.dataset.ksub||e.dataset.kinvsub,e.textContent.trim()]));
  let subs=await getSubs();/* groups that always have a sub-tab row: retry (a delayed overlay re-render can leave the row missing for a moment; 22/11 refresh) */
  for(let r=0;!subs.length&&['court','rel','kid','inv'].includes(t)&&r<10;r++){if(pre)await pre();await f.waitForTimeout(500);await f.evaluate(t=>{tab=t;render()},t);await f.waitForTimeout(300);subs=await getSubs()}
  if(!subs.length){if(['court','rel','kid','inv'].includes(t))console.error('walk: no sub-tabs for',t,JSON.stringify(await f.evaluate(()=>{const e=document.querySelector('.ksubb');if(!e)return 'none';let a=[];while(e&&a.length<6){a.push(e.tagName+'#'+e.id+'.'+String(e.className).slice(0,25));e=e.parentElement}return a})),'visible btns:',JSON.stringify(await f.evaluate(()=>[...document.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.closest('#panel')).map(b=>b.textContent.trim().slice(0,20)).slice(0,10))));await cb([tn]);continue}
  for(const [a,s,sn] of subs){
   await f.evaluate(([a,s])=>{const b=[...document.querySelectorAll('.ksubb')].filter(e=>e.getClientRects().length).find(e=>e.dataset[a]===s);if(b)b.click();const p=document.getElementById('panel');if(p)p.scrollTop=0},[a,s]);await f.waitForTimeout(500);
   await cb([tn,sn]);
   if(a==='kinvsub'&&s===subs[0][1]){const fl=await f.evaluate(()=>[...document.querySelectorAll('#panel .pct[data-kinvkey]')].map(e=>[e.dataset.kinvtab,e.textContent.trim()]));
    for(const [k,kn] of fl.slice(1)){await f.evaluate(k=>{const b=document.querySelector(`#panel .pct[data-kinvtab="${k}"]`);if(b)b.click()},k);await f.waitForTimeout(400);await cb([tn,sn,kn])}
    await f.evaluate(k=>{const b=document.querySelector(`#panel .pct[data-kinvtab="${k}"]`);if(b)b.click()},fl[0][0])}
  }}};
