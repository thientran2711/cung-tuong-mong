/* FIRSTCARD: per origin, N new lives play «Cúi đầu chờ xét» on the first selection card: how many end (ban hoa), drop, stay, rise + the mean odds the card SHOWED. usage: N=25 [OG='["bd"]'] [WT=<root>] node dev/test/firstcard/stat.js */
/* FIRSTCARD measure: how many NEW lives end at the first selection card (ban hoa) per origin, playing «Cúi đầu chờ xét» (her own level), N lives each */
const {open}=require('./lib.js');(async()=>{const {b,p}=await open();
 await p.evaluate(og=>{window.__OG=og;SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()},process.env.OG?JSON.parse(process.env.OG):null);await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const r=await p.evaluate(N=>{const out={};for(const og of (window.__OG||["bd","pf","nc","cn"])){let n=0,dead=0,dn=0,eq=0,up=0,shown=[];window.__forceOrigin=og;for(let k=0;k<N*3&&n<N;k++){try{store.set(NL_KEY,null)}catch(e){}start();if(!S||!S.origin||S.origin.k!==og)continue;
   S.kcPick="cung";nlAccept();const m=Q.find(x=>x.pid==="kc2Sel");if(!m)continue;n++;if(m.opts){const o=m.opts.find(x=>/^Cúi đầu/.test(x.n));shown.push(o&&o.oddsP!=null?o.oddsP:"sure")}
   Q.length=0;S.selx.art="";S.selx.done=1;const r0=S.rank;kc2SelDo(entSkipRaw());if(S.dead)dead++;else if(S.rank<r0)dn++;else if(S.rank>r0)up++;else eq++}
  out[og]={n,dead,dn,eq,up,shown:shown.length?Math.round(shown.filter(x=>x!=="sure").reduce((a,x)=>a+x,0)/Math.max(1,shown.filter(x=>x!=="sure").length)):null,sure:shown.filter(x=>x==="sure").length}}return out},+(process.env.N||40));
 console.log(JSON.stringify(r));await b.close()})();
