/* F2 HELPER family scan (LAW 11). Insert these lines right after the 'G9 a host sync' ok(...) line of dev/test/coop-thin-g.js, save as dev/test/zz-fam.tmp.js (untracked); run: FAMSCAN=1 FAMONLY=1 WEEKS=1 node dev/test/zz-fam.tmp.js http://127.0.0.1:8787 13 1 → one FAMSCAN line = per place × (fc 0 = no sync, 1 = under a host sync) the keys of HER S that her phone wrote locally. */
 /* FAMSCAN (F2 HELPER, LAW 11): under a host sync (inFC) on her phone, for every place: full render (+ renderStage) — which keys of HER S change locally? */
 if(process.env.FAMSCAN){const r=await G.p.evaluate(()=>{const PL=["home","vuon","tn","nvp","ksp","tyv","kn","lc"];const out=[];const p0=S.place,v0=S.visit;const W=wdOf(S),y0=W&&W.y;if(W)W.y=null;
   const snap=()=>{const o={};for(const k of Object.keys(S)){try{o[k]=JSON.stringify(S[k])}catch(e){o[k]='?'}}return o};
   for(const pl of PL)for(const fc of [0,1]){S.place=pl;if(!S.visit)S.visit=1;const a=snap();if(fc)COOPW.inFC=(COOPW.inFC||0)+1;
     try{try{render()}catch(e){}try{if(typeof renderStage==="function")renderStage()}catch(e){}}finally{if(fc)COOPW.inFC--}
     const b=snap();const ks=[...new Set(Object.keys(a).concat(Object.keys(b)))].filter(k=>a[k]!==b[k]);out.push({pl,fc,ks:ks.map(k=>{let A,B;try{A=JSON.parse(a[k]);B=JSON.parse(b[k])}catch(e){}if(A&&B&&typeof A==='object'&&typeof B==='object'){const sk=[...new Set(Object.keys(A).concat(Object.keys(B)))].filter(x=>JSON.stringify(A[x])!==JSON.stringify(B[x]));return k+'{'+sk.map(x=>x+':'+JSON.stringify(A[x]).slice(0,60)+'→'+JSON.stringify(B[x]).slice(0,60)).join(' ; ')+'}'}return k+':'+String(a[k]).slice(0,60)+'→'+String(b[k]).slice(0,60)})})}
   {const on0=window.tyOn,cp0=window.curPeople;const v=(rivals||[]).filter(x=>x&&!x.coop&&x.alive!==false&&!x.out).pop();window.tyOn=()=>true;window.curPeople=()=>v?[{ref:v}]:[];S.place='home';S.tyPaid=null;if((S.danh|0)<5)S.danh=20;
   for(const fc of [0,1]){const a=snap();if(fc)COOPW.inFC=(COOPW.inFC||0)+1;try{try{render()}catch(e){}try{if(typeof renderStage==="function")renderStage()}catch(e){}}finally{if(fc)COOPW.inFC--}const b=snap();
    out.push({pl:'home+visitor+trungy',fc,ks:Object.keys(b).filter(k=>a[k]!==b[k]).map(k=>k+':'+String(a[k]).slice(0,40)+'→'+String(b[k]).slice(0,40))});S.tyPaid=null}
   window.tyOn=on0;window.curPeople=cp0}
   S.place=p0;S.visit=v0;if(W)W.y=y0;return out});
  console.log('FAMSCAN',JSON.stringify(r));if(process.env.FAMONLY){console.log('FAMONLY end');process.exit(0)}}
