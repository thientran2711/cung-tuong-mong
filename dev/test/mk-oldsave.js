/* make an OLD save with the published build (repo root index.html): a started life with a few chest items, saved to slot 2.
   usage: node dev/test/mk-oldsave.js <baseURL of root index.html> <out.json> */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 const r=await p.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S.origin.k!=='cnv')break}
  Q.length=0;S.inv.push({k:'tramngoc',w:1},{k:'nhansam'},{k:'nhansam'},{k:'tranhco',from:'th'});save();
  quiet=false;let er='';try{localStorage.setItem(SK(2),JSON.stringify(ser()))}catch(e){er=e.message}const k=SK(2);if(er)return{er};return{k,len:k&&(window.slotGet?slotGet(k):localStorage.getItem(k)).length,name:S.name}});
 const d=await p.evaluate(k=>(window.slotGet?slotGet(k):localStorage.getItem(k)),r.k);fs.writeFileSync(OUT,d);console.log(JSON.stringify({r,errs}));await b.close()})();
