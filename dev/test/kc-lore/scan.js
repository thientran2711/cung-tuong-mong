/* KC LORE scan (LUẬT SỬA CẢ NHÓM): for each of the six home-road origins, start the home road, read who is alive / house / office / dress / wealth,
   then walk to the palace gate (kcEnter) and read the same facts on the palace side. usage: node scan.js <site url> [out.json]
   The same script runs on the old main build (before) and on review/kc-lore (after); the report table is built from the two JSONs. */
const {chromium}=require('playwright');const fs=require('fs');
const URL=process.argv[2],OUT=process.argv[3]||'';const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const rows=[];
 for(const o of ['tt','dtq','muoi','thd','ch','td']){
  const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});
  const p=await c.newPage();p.setDefaultTimeout(90000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);await skip();
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  await p.evaluate(og=>{for(let i=0;i<400&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}},o);await sleep(600);await skip();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');b.click()});await sleep(700);
  for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>{document.querySelector('#modal button[data-nl="ok"]').click()});await sleep(1500);
  const R=await p.evaluate(og=>{const g=r=>S.kc.fam.find(m=>m.r===r);const cha=g('cha'),hu=g('huynh');const E={o:og,j1:S.origin.t,n:S.origin.n};
   const hd=(()=>{try{return tdHead(KCCLAN[og])}catch(e){return null}})();
   E.home={title:(()=>{try{return pMe().rw}catch(e){return''}})(),house:KCDAD[og][1],office:KCDAD[og][0],father:cha&&cha.name,fatherAge:cha&&cha.age,courtHead:hd&&hd.name+(hd.dadOf==='me'?' (her father)':' (an NPC minister)'),clan:KCCLAN[og]||'none',
    mother:!!g('me'),stepmother:!g('me'),brother:hu&&hu.alive,sister:!!g('muoi'),dress:kcDress(),dowry:S.khm,bac:S.bac,gt:S.kgt,pow:kcPow(),contact:kcContact()};
   try{if(og==='dtq'){kcOriginFx('dtq',0,1);kcWhere();E.home.brotherWhere=kcAt(hu)}}catch(e){E.homeErr=String(e)}
   S.year=KC.ty;S.month=KC.tm;S.turn=24;
   try{kcEnter(0)}catch(e){E.enterErr=String(e)}
   const q=Q.map(m=>m.t);E.gate={Q:q,rank:S.rank,bac:S.bac,fam:S.kc.fam.map(m=>m.t+(m.alive?'':' (dead)')),sisterConsort:S.kc.fam.some(m=>m.r==='muoi'&&m.pal),famGone:S.kc.famGone||null,fell:!!S.kc.fell,
    palaceDad:(()=>{try{const d=dad67();return d?d.name:null}catch(e){return null}})(),foeDad:S.foeDad||null,letterMother:(()=>{try{return S.origin.k==='td'?'vú nuôi':S.kc.fam.some(m=>m.r==='me')?'mẹ già':'tổ mẫu'}catch(e){return''}})()};
   return E},o);
  R.errs=errs.slice(0,5);rows.push(R);await c.close()}
 await b.close();const j=JSON.stringify(rows,null,1);if(OUT)fs.writeFileSync(OUT,j);else console.log(j)})().catch(e=>{console.error(e);process.exit(1)});
