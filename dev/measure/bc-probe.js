/* balance-core: start values per origin (12 starts each). usage: node dev/measure/bc-probe.js <index.html> */
const {chromium}=require('playwright');const path=require('path');
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755}});
await ctx.addInitScript(`window.__seed=4242;`+SEEDRNG+`window.__bot=1;`);
const p=await ctx.newPage();await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());p.on('pageerror',e=>console.error('ERR',e.message.slice(0,150)));
await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{window.render=function(){};const out={};out.origins=ORIGINS.map(o=>o.k);out.arts=ARTS.map(a=>a.k);
 for(const o of ORIGINS){const rows=[];for(let i=0;i<12;i++){window.__forceOrigin=o.k;for(let j=0;j<60;j++){try{localStorage.clear()}catch(e){}start();if(S.origin.k===o.k)break}Q.length=0;
   rows.push({rank:S.rank,sac:S.sac,tai:S.tai,tamco:S.tamco,duc:S.duc,danh:S.danh,sung:S.sung,bac:S.bac,suc:S.suc,mat:S.mat,th:S.th,hh:S.hh,arts:JSON.stringify(S.arts),vir:JSON.stringify(S.vir)})}
  const avg=k=>Math.round(rows.reduce((a,x)=>a+x[k],0)/rows.length);const mm=k=>Math.min(...rows.map(x=>x[k]))+'-'+Math.max(...rows.map(x=>x[k]));
  out[o.k]={rank:rows[0].rank,sac:mm('sac'),tai:mm('tai'),tamco:mm('tamco'),duc:mm('duc'),danh:mm('danh'),sung:mm('sung'),bac:mm('bac'),suc:mm('suc'),mat:mm('mat'),th:mm('th'),hh:mm('hh'),arts:rows[0].arts,arts2:rows[1].arts,vir:rows[0].vir}}
 return out});
console.log(JSON.stringify(r,null,1));await b.close()})();
