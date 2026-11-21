/* walk every top tab group, its sub-tabs (.ksubb[data-ksub] / [data-kinvsub]) and Tư trang filters; cb(path) at each view */
const GROUPS=[['act','Hành sự'],['go','Dư đồ'],['court','Hậu cung'],['rel','Giao tình'],['kid','Hoàng tự'],['inv','Tư trang'],['art','Tài nghệ'],['story','Mệnh truyện']];
module.exports=async function walk(f,cb,only){
 for(const [t,tn] of GROUPS){if(only&&!only.includes(t))continue;
  await f.evaluate(t=>{tab=t;render();const p=document.getElementById('panel');if(p)p.scrollTop=0},t);await f.waitForTimeout(400);
  const subs=await f.evaluate(()=>[...document.querySelectorAll('#panel .ksubb')].map(e=>[e.dataset.ksub?'ksub':'kinvsub',e.dataset.ksub||e.dataset.kinvsub,e.textContent.trim()]));
  if(!subs.length){await cb([tn]);continue}
  for(const [a,s,sn] of subs){
   await f.evaluate(([a,s])=>{const b=[...document.querySelectorAll('#panel .ksubb')].find(e=>e.dataset[a]===s);if(b)b.click();const p=document.getElementById('panel');if(p)p.scrollTop=0},[a,s]);await f.waitForTimeout(500);
   await cb([tn,sn]);
   if(a==='kinvsub'&&s===subs[0][1]){const fl=await f.evaluate(()=>[...document.querySelectorAll('#panel .pct[data-kinvkey]')].map(e=>[e.dataset.kinvtab,e.textContent.trim()]));
    for(const [k,kn] of fl.slice(1)){await f.evaluate(k=>{const b=document.querySelector(`#panel .pct[data-kinvtab="${k}"]`);if(b)b.click()},k);await f.waitForTimeout(400);await cb([tn,sn,kn])}
    await f.evaluate(k=>{const b=document.querySelector(`#panel .pct[data-kinvtab="${k}"]`);if(b)b.click()},fl[0][0])}
  }}};
