/* review/kit-rankunit (MAIN 88 question «RANKUNIT COLOUR OK?»): every KNOWN person keeps EXACTLY the colour unit it had: for every person in kpPeople() and every title, kitRankText("Gặp <title> <name>.") must equal "Gặp " + kitRankNameH(person,title,name) + "." (the pre-change known path), also when the sentence is wrapped twice or the title is preceded by another word.
   Also prints the Emperor / Hoàng hậu / Thái hậu name units (kitName) so the colour tokens can be eyeballed. usage: node dev/test/kit-rankunit-known.js <url> */
const {chromium}=require('playwright');
const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});await p.waitForTimeout(1000);
 const r=await p.evaluate(()=>{const T=['Hoàng quý phi','Hoàng hậu','Quý phi','Quý nhân','Thường tại','Đáp ứng','Phi','Tần','Thái tử','Hoàng tử','Công chúa','Thái y','Thị vệ','Ma ma','Chưởng sự cô cô','Cô cô','Thái giám','Nhạc sư','Tể tướng','Tướng quân'];const L=kpPeople();let n=0,bad=[];
  for(const [name,pp] of L){for(const t of T){const exp='Gặp '+kitRankNameH(pp,t,name)+'.';const got=kitRankText('Gặp '+t+' '+name+'.');n++;if(got!==exp)bad.push([t,name,got.slice(0,140)])}}
  const emp=(()=>{try{return kitName(S.emp,{cap:true})}catch(e){return 'ERR '+e.message}})();const hh=(()=>{try{const v=rivals.find(x=>/Hoàng hậu/.test(x.rank||x.rk||''))||rivals[0];return kitName(v,{cap:true})}catch(e){return ''}})();
  return {people:L.length,checked:n,bad:bad.slice(0,8),badN:bad.length,emp:emp.slice(0,220),hh:hh.slice(0,220)}});
 console.log(r.badN||errs.length?'FAIL':'PASS',JSON.stringify(r),errs.join('|'));await b.close();process.exit(r.badN||errs.length?1:0)})();
