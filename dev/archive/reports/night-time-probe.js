const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext();await ctx.addInitScript(`window.__seed=777;(function(){let s=777;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);const p=await ctx.newPage();
await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());await p.goto('file://'+path.resolve('../pr/index.html'));await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{window.render=function(){};cyAsk=()=>false;const out={snap:[],her:{},npcRank:{},traits:{},trays:[]};
 const herW=(sg)=>{const k={sung:S.sung,preg:S.preg,cyb:S.cyb?Object.assign({},S.cyb):null};S.sung=sg;S.preg=0;if(S.cyb)S.cyb.lie=wk();const w=nightCh(S);S.sung=k.sung;S.preg=k.preg;if(k.cyb)S.cyb=k.cyb;return w};
 for(let l=0;l<40;l++){start();Q.length=0;for(let w=0;w<360&&!S.dead;w++){S.suc=Math.max(S.suc,60);S.sung=Math.max(S.sung,20);S.rank=Math.max(S.rank,1);if(S.tonight==="me")S.tonight=null;Q.length=0;S.mg=0;try{endTurn()}catch(e){break}
  if(w%9===4){const C=consorts().filter(q=>q!==S);const ws=C.map(q=>nightCh(q));const tot=ws.reduce((a,b)=>a+b,0);
   const yr=Math.floor(w/36);for(const sg of [10,25,45,60,80]){const h=herW(sg);const k=yr+"_"+sg;(out.her[k]=out.her[k]||[]).push(h/(tot+h))}
   out.trays.push({n:C.length,elig:ws.filter(x=>x>0).length,tot});
   C.forEach((q,i)=>{const rk=(typeof rkName==="function"?rkName(q):q.rank);const a=out.npcRank[rk]=out.npcRank[rk]||{n:0,w:0,sung:0,share:0,zero:0};a.n++;a.w+=ws[i];a.sung+=q.sung;a.share+=tot?ws[i]/tot:0;if(!ws[i])a.zero++;out.traits[q.trait]=(out.traits[q.trait]||0)+1})}}}
 return out});
fs.writeFileSync('probe.json',JSON.stringify(r));
const her={};for(const k in r.her){const a=r.her[k];her[k]=(a.reduce((x,y)=>x+y,0)/a.length*100).toFixed(1)+"% n"+a.length}console.log(her);
for(const k in r.npcRank){const a=r.npcRank[k];console.log(k,"n",a.n,"sung",(a.sung/a.n).toFixed(0),"w",(a.w/a.n).toFixed(1),"share",(100*a.share/a.n).toFixed(1)+"%","off-tray",(100*a.zero/a.n).toFixed(0)+"%")}
console.log(r.traits);const T=r.trays;console.log("consorts",(T.reduce((a,t)=>a+t.n,0)/T.length).toFixed(1),"eligible",(T.reduce((a,t)=>a+t.elig,0)/T.length).toFixed(1),"tot w",(T.reduce((a,t)=>a+t.tot,0)/T.length).toFixed(0));await b.close()})();
