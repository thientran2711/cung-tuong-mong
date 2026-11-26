/* lux-band (DRESS-FIX point 4, owner OD 26/11 ~18:50Z (4) «đeo full 7 món, 8 món thì nó vẫn nằm đủ đúng trong cái bậc của tôi»)
   node dev/measure/lux-band.js [dev/index.html]
   Per rank 0..7: a FULL rank-fitting outfit (robe + trâm at her phẩm, one piece per jewellery slot at her rank, hoa điền at her phẩm, a good face)
   → total xa xỉ (luxOf(S).sc, THE one total) vs her allowance (luxOf(S).bud) and the verdict per occasion (luxVerdict). Also 2–3 pieces, and a set
   with ONE piece above her rank. PASS = every full rank set ≤ allowance (inside her band), every set with an above-rank piece > the full set. */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof luxOf==='function');await p.waitForTimeout(2000);
 const R=await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const out=[];const JS=["ear","wrist","waist","shoe"].filter(sl=>Object.keys(IT).some(k=>IT[k]&&IT[k].sl===sl));
  const pickIT=(sl,r,above)=>{const L=Object.keys(IT).filter(k=>IT[k]&&itm(k).sl&&wearGrp(itm(k).sl)===sl&&typeof IT[k].rk==="number"&&!IT[k].keep&&!IT[k].wsl);let c=L.filter(k=>(itm(k).rk|0)===(above?r+1:r));if(!c.length&&!above){const m=Math.max(-1,...L.filter(k=>(itm(k).rk|0)<=r).map(k=>itm(k).rk|0));c=L.filter(k=>(itm(k).rk|0)===m)}
   return c.sort((a,b)=>luxVal(b)-luxVal(a))[0]||null};
  const pickWD=(sl,P)=>{const L=WD_LIST.filter(x=>x[1]===sl&&x[3]===P).map(x=>x[0]);return L.sort((a,b)=>wdLux(b)-wdLux(a))[0]||null};
  for(let r=0;r<8;r++){S.rank=r;S.sung=30;S.inv=(S.inv||[]).filter(e=>!(IT[e.k]&&itm(e.k).sl)&&!(WD_ITEMS[e.k]));S.dress=null;
   const set=(n,above)=>{S.inv=S.inv.filter(e=>!(IT[e.k]&&itm(e.k).sl)&&!WD_ITEMS[e.k]);const w=wdOf(S);const P=Math.min(8,r+1);
    const ky=pickWD("y",P),kt=pickWD("tram",P);if(ky){S.inv.push({k:ky});wdWear(S,S.inv.length-1)}if(kt){S.inv.push({k:kt});wdWear(S,S.inv.length-1)}
    let i=0,ab=false;const used=[];for(const sl of JS){if(i>=n)break;let k=null;if(above&&!ab){k=pickIT(sl,r,true);if(k)ab=true}if(!k)k=pickIT(sl,r);if(!k)continue;S.inv.push({k});const ix=S.inv.length-1;if(!S.inv[ix].w)wear(S,ix);used.push(k+"@"+(itm(k).rk|0));i++}
    const hd=pickWD("hd",P);S.toilette={day:toilWk()*10,wk:toilWk(),score:70,makeup:true,look:"dep",dv:"hoppham",style:"fit",F:1,occ:["thinhan"]};if(hd&&n>=6){S.inv.push({k:hd});S.toilette.hd={k:hd,q:.9}}
    const x=luxOf(S);let v={};try{for(const o of ["thuong","thinhan","yen"]){const V=luxVerdict(S,o);v[o]=V&&(V.v||V.k||V.name||JSON.stringify(V).slice(0,40))}}catch(e){v.err=String(e)}
    return{n,above:!!above,ab,sc:x.sc,bud:x.bud,lv:x.lv,r:+(x.sc/x.bud).toFixed(2),v,used:used.join(" ")}};
   out.push(Object.assign({rank:r,name:RANKS[r]},{p3:set(2),full:set(9),over:set(9,true)}))}
  return out});
 console.log('PASS rule: full set <= allowance; full set with one piece above her rank > allowance (Hoàng hậu: nothing above)');console.log('rank | 2 jewels + robe + trâm: sc/bud (r) | FULL set: sc/bud (r) lv · thỉnh an | FULL + 1 above rank: sc (r)');
 let pass=true;for(const x of R){const f=x.full,o=x.over,q=x.p3;const okF=f.sc<=f.bud,okO=x.rank===7||!o.ab||o.sc>f.bud;pass=pass&&okF&&okO;
  console.log(`${x.rank} ${(x.name&&x.name.n)||x.name} | ${q.sc}/${q.bud} (${q.r}) | ${f.sc}/${f.bud} (${f.r}) lv${f.lv} · ${f.v.thinhan} | ${o.sc} (${o.r}) ${okF&&okO?'ok':'FAIL'}`)}
 console.log('full items rank 2:',R[2].full.used);console.log(errs.length?'page errors '+errs.slice(0,3):'no page errors');console.log(pass?'PASS':'FAIL');await b.close()})();
