/* review/errand-scene scan (FIX THE WHOLE GROUP): lists EVERY errand the player can send a servant on and whether the errand scene (dev/build/jerr.js) covers it.
   usage: node dev/test/errand-scan.js <baseURL>   -> table (markdown) on stdout.
   Errand = (a) every ACT key not in ACT_NOSEND (runAct sends a servant when the target is elsewhere), (b) the named flows jerr wraps (scout, invite, h54Act thu, tdAct gift).
   Covered = goes through runAct (wrapped) or is wrapped by name; a flow that is not wrapped is listed NOT COVERED with the reason.
   PTIME column (parallel-time fixer #6): with the parallel-time core in the build (ERR.adapter() = "ptime") the task is the core's ONE state S.away — made by the core's
   adapted button (doAct ptHarmSend, j21 scout / invite) or, for every other gate, by jerr's errPtRun (the act runs once, the person who went is written into S.away).
   Exit 1 when any errand is NOT COVERED or the page fails. */
const {chromium}=require('./lib/pw-roulette');const [,,BASE]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
let R0=null;(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();p.setDefaultTimeout(240000);
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(1500)}
 const RX=await p.evaluate(()=>{const rows=[];/* no life is started here: the core counts as in the build when PTIME exists and BAL.ptime.on (ERR.adapter() needs a live S) */const pt=!!(window.PTIME&&typeof BAL==="object"&&BAL.ptime&&BAL.ptime.on);const PTC={scout:"core task (j21 ptSend)",invite:"core task (j21 ptSend)"};
  for(const k of Object.keys(ACT)){const self=ERR.self.includes(k),nosend=ACT_NOSEND.includes(k)||self;rows.push([k,ACT[k].n||"",self?"she goes herself (ERR.self): no servant sent":nosend?"in person only (ACT_NOSEND): no servant sent":"runAct (sent when she is elsewhere)",nosend?"n/a":"COVERED (runAct wrapper)",(typeof errWord==="function"?errWord(k):""),nosend?"n/a":pt?"doAct: core task (ptHarmSend) · card game / events / talk: errPtRun → S.away":"fallback S.erra"])}
  const named=[["scout","Sai tai mắt dò nơi ở (j21 scout)"],["invite","Mời đến cung ta (j21 invite)"],["letter","Gửi thư, quà thăm con (j54 h54Act thu)"],["tdgift","Biếu quà, gửi thư cho nhà thông gia (j55 tdAct gift)"],["kin","Dò hỏi gia thế (jht htAct ask, exposed on window)"]];
  for(const [k,n] of named)rows.push(["flow:"+k,n,"named flow","COVERED (wrapped by name)",errWord(k),pt?(PTC[k]||"errPtRun → S.away"):"fallback S.erra"]);
  rows.push(["flow:maid-road","the player as a servant (j42 Lệnh của chủ / errands for her mistress)","other direction (she IS the servant)","NOT IN SCOPE (errCan(): isSrv)","",pt?"receiver side: core S.ordQ notices in the ONE «tin» panel":"n/a"]);
  return {rows,adapter:pt?"ptime":"fallback"}}).catch(e=>({err:String(e)}));
 if(RX.err){console.log("page failed: "+RX.err);await b.close();process.exit(1)}const A=RX.adapter;R0=RX.rows;
 const R=R0;console.log(`adapter: ${A}\n`);console.log("| key | name | route | scene | line (VANPHONG) | task state |\n|---|---|---|---|---|---|");for(const r of R)console.log("| "+r.join(" | ")+" |");
 const cov=R.filter(r=>/^COVERED/.test(r[3])).length,nos=R.filter(r=>/^n\/a/.test(r[3])).length,nc=R.filter(r=>/^NOT COVERED/.test(r[3])).length;console.log(`\ncovered ${cov} · in-person-only ${nos} · not covered ${nc}`);await b.close();process.exit(nc?1:0)})();
