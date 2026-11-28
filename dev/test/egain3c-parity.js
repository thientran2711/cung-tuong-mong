/* E-GAIN3c parity (law 4, «no silent balance change»): every ACT's cost object (c, getters read) and the moved numbers are the SAME in the
   new build as in the old one (origin/main build at .tmp/old.html). usage: node dev/test/egain3c-parity.js <old.html> <new.html> → exit 1 on a difference. */
const {chromium}=require('./lib/pw-roulette');
const DUMP=()=>{const o={};for(const k of Object.keys(ACT).sort()){const c=ACT[k].c;let v=null;try{v=c&&typeof c==="object"?JSON.parse(JSON.stringify(c)):typeof c}catch(e){v="ERR"}o["ACT."+k+".c"]=v}
 /* the f-side numbers moved to BAL: read them where the code reads them now (new) or the old literal (old build has no key) */
 const g=(f,d)=>{try{const v=f();return v===undefined?d:v}catch(e){return d}};
 o["trip.duc"]=g(()=>-BAL.actDuc.trip,-4);o["banphe.bacPerEv"]=g(()=>BAL.eff.j78.bacBanphe,15);o["phatquy.danh"]=g(()=>BAL.rl.jface.danhQuy,1);
 o["thaopet.rareP"]=g(()=>BAL.rl.jpet.rareP,25);o["thaopet.danh"]=g(()=>BAL.rl.jpet.danhRare,-1);o["uyhiep.min"]=g(()=>BAL.eff.j78.uyhiepMin,10);o["j78pay.cap"]=g(()=>BAL.eff.j78.payCap,60);
 o["phatvoco.duc"]=g(()=>BAL.eff.j24.ducJudgeServ,-3);o["tiencu.merit"]=g(()=>BAL.ag.par3.house.merit,5);return o};
(async()=>{const b=await chromium.launch();const R=[];for(const u of process.argv.slice(2,4)){const p=await b.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message));
  await p.goto(u.startsWith('file:')?u:'file://'+require('path').resolve(u),{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof ACT==='object'&&typeof BAL==='object'&&Object.keys(ACT).length>20,null,{timeout:0});
  R.push(await p.evaluate(DUMP));await p.close()}
 const [A,B]=R;let n=0,same=0;for(const k of new Set(Object.keys(A).concat(Object.keys(B)))){if(!(k in A)||!(k in B)){console.log('only in '+(k in A?'old':'new')+': '+k);continue}
  if(JSON.stringify(A[k])!==JSON.stringify(B[k])){n++;console.log('DIFF '+k+' old='+JSON.stringify(A[k])+' new='+JSON.stringify(B[k]))}else same++}
 console.log('parity: '+same+' same, '+n+' different');await b.close();process.exit(n?1:0)})();
