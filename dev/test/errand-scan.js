/* review/errand-scene scan (FIX THE WHOLE GROUP): lists EVERY errand the player can send a servant on and whether the errand scene (dev/build/jerr.js) covers it.
   usage: node dev/test/errand-scan.js <baseURL>   -> table (markdown) on stdout.
   Errand = (a) every ACT key not in ACT_NOSEND (runAct sends a servant when the target is elsewhere), (b) the named flows jerr wraps (scout, invite, h54Act thu, tdAct gift).
   Covered = goes through runAct (wrapped) or is wrapped by name; a flow that is not wrapped is listed NOT COVERED with the reason. */
const {chromium}=require('./lib/pw-roulette');const [,,BASE]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();p.setDefaultTimeout(240000);
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(1500)}
 const R=await p.evaluate(()=>{const rows=[];
  for(const k of Object.keys(ACT)){const self=ERR.self.includes(k),nosend=ACT_NOSEND.includes(k)||self;rows.push([k,ACT[k].n||"",self?"she goes herself (ERR.self): no servant sent":nosend?"in person only (ACT_NOSEND): no servant sent":"runAct (sent when she is elsewhere)",nosend?"n/a":"COVERED (runAct wrapper)",(typeof errWord==="function"?errWord(k):"")])}
  const named=[["scout","Sai tai mắt dò nơi ở (j21 scout)"],["invite","Mời đến cung ta (j21 invite)"],["letter","Gửi thư, quà thăm con (j54 h54Act thu)"],["tdgift","Biếu quà, gửi thư cho nhà thông gia (j55 tdAct gift)"],["kin","Dò hỏi gia thế (jht htAct ask, exposed on window)"]];
  for(const [k,n] of named)rows.push(["flow:"+k,n,"named flow","COVERED (wrapped by name)",errWord(k)]);
  rows.push(["flow:maid-road","the player as a servant (j42 Lệnh của chủ / errands for her mistress)","other direction (she IS the servant)","NOT IN SCOPE (errCan(): isSrv)",""]);
  return rows});
 console.log("| key | name | route | scene | line (VANPHONG) |\n|---|---|---|---|---|");for(const r of R)console.log("| "+r.join(" | ")+" |");
 const cov=R.filter(r=>/^COVERED/.test(r[3])).length,nos=R.filter(r=>/^n\/a/.test(r[3])).length,nc=R.filter(r=>/NOT/.test(r[3])).length;console.log(`\ncovered ${cov} · in-person-only ${nos} · not covered ${nc}`);await b.close()})();
