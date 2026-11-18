/* review/monthly-ration FIX 1 — balance law C (OD 17/11 ~08:25Z (C): "high ranks feel as tight as low ranks") for the cosmetics ration (jration, BAL.ration).
   Bot per rank, in the real page: 24 months × 3 sittings (one makeup a tuần), ration only (the real jstip stipGoods issue, no skimming),
   aims Đoan trang / Kiều diễm every sitting. Reports per rank:
     cov<L>  = share of sittings whose aimed level the boxes allow (cap by parts owned + lượt left), ration only
     topup   = silver to buy (mua gấp = lxPrice × rush, her rank's tier) the boxes missing to hold Kiều diễm every sitting, as a share of the month's bổng
     npc     = NPC of that rank after 12 real months of lxNpcSpend → issue → roads: average parts owned (0..4) and share of months at 0 parts
   Target (review E4r): cov within ±0.05 across ranks, topup share within ±10 points.
   usage: node dev/measure/ration-lawc.js <worktree|url>   (prints a markdown table; JSON on the last line) */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');let [,,URL]=process.argv;
function serve(root){const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp'};return new Promise(res=>{const s=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(new (require('url').URL)(q.url,'http://x').pathname).replace(/^\/+/,'')||'index.html');
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r)});s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/index.html',close:()=>s.close()}))})}
(async()=>{let SV=null;if(!/^https?:/.test(URL)){SV=await serve(path.resolve(URL));URL=SV.url}const b=await chromium.launch();const p=await b.newPage();p.setDefaultTimeout(300000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await new Promise(r=>setTimeout(r,2500));
 const R=await p.evaluate(()=>{window.__bot=1;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;
  const B=BAL.ration,need=(lv,part)=>B.use[lv];const out=[];const roll0=roll;
  for(let r=0;r<8;r++){const row={rank:r,pay:BAL.pay[r]};S.rank=r;S.out=false;
   for(const lv of ["vua","dep"]){S.inv=S.inv.filter(e=>!lxOf(e.k));let hit=0,n=0,buy=0;
    for(let m=0;m<24;m++){S.month=1+m%12;const L=lxLines(r,false);for(const [k] of L)S.inv.push({k,from:"noivu",d:S.turn});lxFix(S);
     for(let s=0;s<3;s++){n++;const cap=B.cap[lxCount(S)];const okLv=lxLvIx(cap)>=lxLvIx(lv);if(okLv)hit++;
      if(lv==="dep"){const M=lxMiss(S);buy+=M.length*Math.ceil(lxPrice(S,lxTierOf(S))*B.rush);const t=lxTierOf(S);for(const part of M)S.inv.push({k:lxKey(part,t),from:"buy",d:S.turn});lxFix(S)}
      lxSpend(S,{makeup:true,score:90,look:lv},{})}}
    row["cov_"+lv]=+(hit/n).toFixed(2);if(lv==="dep")row.topup=+(buy/24/BAL.pay[r]).toFixed(3)}
   /* NPC of this rank, real month order (spend, issue, roads), 12 months, pay as jecon */
   const v=consorts().find(x=>x!==S&&x.alive!==false&&!x.out&&!x.coop);const r0=v.rank,b0=v.bac,i0=v.inv.slice();v.rank=r;v.inv=v.inv.filter(e=>!lxOf(e.k));let parts=0,zero=0;
   for(let m=0;m<12;m++){S.month=1+m;v.bac=(v.bac||0)+BAL.pay[r];stipGoods(v,null);const c=lxCount(v);parts+=c;if(!c)zero++}
   row.npcParts=+(parts/12).toFixed(2);row.npcZero=+(zero/12).toFixed(2);v.rank=r0;v.bac=b0;v.inv=i0;out.push(row)}
  return out});
 const sp=(k)=>{const a=R.map(x=>x[k]);return +(Math.max(...a)-Math.min(...a)).toFixed(3)};
 console.log("| rank | bổng | cov Đoan trang | cov Kiều diễm | top-up Kiều diễm / bổng | NPC parts | NPC 0-part months |\n|---|---|---|---|---|---|---|");
 for(const x of R)console.log(`| ${x.rank} | ${x.pay} | ${x.cov_vua} | ${x.cov_dep} | ${(x.topup*100).toFixed(1)} phần trăm | ${x.npcParts} | ${x.npcZero} |`);
 const S2={spreadVua:sp("cov_vua"),spreadDep:sp("cov_dep"),spreadTopup:sp("topup")};console.log(`spread: cov Đoan trang ${S2.spreadVua}, cov Kiều diễm ${S2.spreadDep}, top-up ${(S2.spreadTopup*100).toFixed(1)} points`);
 console.log(JSON.stringify({rows:R,spread:S2,pass:S2.spreadVua<=.05&&S2.spreadDep<=.05&&S2.spreadTopup<=.10}));await b.close();if(SV)SV.close()})();
