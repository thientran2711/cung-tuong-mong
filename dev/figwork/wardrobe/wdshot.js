const {chromium}=require('playwright');const [,,BASE,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const pe=[];
 for(const [w,h,tag] of [[755,1000,'755'],[412,1058,'412']]){
 const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,serviceWorkers:'block'});const q=await c.newPage();q.on('pageerror',e=>pe.push(e.message));
 await q.goto(BASE+'new.html');await q.waitForTimeout(2000);await q.evaluate(()=>localStorage.clear());await q.reload();await q.waitForTimeout(2000);
 await q.click('#slots button[data-new="1"]');await q.waitForTimeout(800);
 await q.evaluate(()=>{while(Q.length)closeModal();for(const k of ["w_tan_y10","w_tan_t08","w_quynhan_y03","nt_kimlu","w_m2_t05"])wdGain(S,k,{from:"emp",giver:"Hoàng thượng"});while(Q.length)closeModal();tab="inv";render()});
 await q.waitForTimeout(800);await q.screenshot({path:`${OUT}/wd-tutrang-${tag}.png`});
 const el=await q.$('text=Sưu tập kiếp này');if(el){await el.scrollIntoViewIfNeeded();await q.waitForTimeout(300);await q.screenshot({path:`${OUT}/wd-tutrang2-${tag}.png`})}
 const ovf=await q.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);console.log(tag,'overflow',ovf);await c.close()}
 console.log('errors',pe.slice(0,5));await b.close()})();
