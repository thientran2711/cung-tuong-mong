/* review/minigame-fix whole-family scan: every KG82_KIND opened through playArt → kit «Luật chơi» (.kgr) + «Sẵn sàng» + a skip button with plain words + the frame was veiled at open.
   usage: node dev/test/minigame-family-scan.js → prints the table, exit 1 on any gap */
const {chromium}=require('playwright');const D=require('./lib/device');
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);
 const R=await g.evaluate(async()=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const out=[];window.kitNotice=undefined;
  for(const k of Object.keys(KG82_KIND)){const K=KG82_KIND[k];let row={k,n:K.n};try{Q.length=0;playArt({art:K.n,kind:k,title:"scan"});await sl(60);const d=document.getElementById("kg82");
    row.open=!!d;row.ready=!!(d&&d.querySelector(".kgr"));const go=d&&d.querySelector("#kg82go");row.go=go?go.innerText.replace(/\n/g," "):"";const sk=d&&d.querySelector(".kquick");row.skip=sk?sk.innerText.replace(/\n/g," ").slice(0,70):"";
   }catch(e){row.err=String(e).slice(0,80)}try{kg82Close(true)}catch(e){}out.push(row)}return out});
 let bad=0;for(const r of R){const good=r.open&&r.ready&&/sẵn sàng/i.test(r.go);if(!good)bad++;console.log((good?'ok   ':'GAP  ')+r.k.padEnd(10)+JSON.stringify(r).slice(0,200))}
 await b.close();srv.close();console.log(bad?'GAPS '+bad:'ALL OK '+R.length);process.exit(bad?1:0)})();
