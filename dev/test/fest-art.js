/* festival art check (coordinator 15/11): for every festival, set the date, check festToday(), the map picture for each of its buổi, and that the
   festival dialog shows its own banner (headArt .kdlgart img) and evId. usage: NODE_PATH=$(npm root -g) node dev/test/fest-art.js <url> <outdir> */
const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:800},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL);await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.querySelectorAll('#kroulw,.kroul').forEach(x=>x.remove());render()});
 const keys=await p.evaluate(()=>Object.keys(FEST));const res=[];
 for(const k of keys){
  const r=await p.evaluate(k=>{const f=FEST[k];S.month=f.m;S.tuan=f.t[0];const ft=festToday();const maps={};for(let bu=0;bu<3;bu++){S.buoi=bu;maps[BUK[bu]]=mapImg().split('/').pop()}
   Q.length=0;document.getElementById('modal').hidden=true;let src='',ev='';
   if(typeof FESTEV!=='undefined'&&FESTEV[k]){Q.push(Object.assign({who:pEmp(),evId:"fest:"+k,headArt:{src:`img/ev-fest-${k}-b.webp`,label:f.name}},FESTEV[k]()));showModal()}
   const im=document.querySelector('#mb .kdlgart img');src=im?im.src.split('/').pop():'';ev=Q[0]&&Q[0].evId||'';
   let fd='';try{const m=fDay7(k);fd=m?((m.headArt&&m.headArt.src||'').split('/').pop()+' '+m.evId):'(no plan)'}catch(e){fd='err '+e}
   return {k,today:ft&&ft.k,maps,dialogBanner:src,evId:ev,fDay7:fd}},k);
  res.push(r);if(r.dialogBanner)await p.screenshot({path:`${OUT}/fest-${k}.jpg`,type:'jpeg',quality:70})}
 console.log(JSON.stringify({res,errs:[...new Set(errs)]},null,0).replace(/\},\{/g,'},\n{'));await b.close()})();
