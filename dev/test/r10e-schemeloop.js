/* robot10 E-FIX-6 TIMEOUT family proof (R2 thd_tro/thd_hoc speed, R5 pt_su speed, R8 bd_tuyet speed-1/4 — all on game 14ba8768):
   «Bày mưu» → «Ra tay ngay» → jtamco road card «Hạ độc / Hủy dung / Rút thẻ bài» → «Làm như thường» → «Bày mưu» again, for ever.
   Fixed in the game by review/fix-hadoc-loop (a8004db6, j70Wants / __j70inst). Check on THIS build: for each scheme, doAct + always the FIRST
   option of every card (the speed bot) ends within 12 cards (the act runs: time spent or the card queue empties) — no ping-pong.
   usage: node dev/test/r10e-schemeloop.js <save.json>   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/';window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){}});
 await ctx.addInitScript(require('../measure/robot10-lag.js').BOT_INIT);
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
 const R=await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;const out=[];
  for(const k of ["poison","huydung","block"]){Q=[];deser(JSON.parse(JSON.stringify(d)));try{closeModal()}catch(e){}Q.length=0;S.bac=900;S.tamco=100;S.suc=100;S.duc=80;
   const i=rivals.findIndex(v=>v&&v.alive!==false&&!v.out&&ACT[k]&&ACT[k].ok(S,v));if(i<0){out.push({k,skip:"no target"});continue}
   const u0=S.turn+'_'+S.tuan+'_'+(S.buoi||0)+'_'+(typeof used!=="undefined"?used:0);const T=[];doAct(i,k);let n=0;
   while(Q.length&&n<40){const m=Q[0];T.push(String(m.t||m.title||"").replace(/<[^>]+>/g,"").slice(0,28));if(!m.opts||!m.opts.length){Q.shift();n++;continue}const j=m.opts.findIndex(o=>!o.off);chooseM(j<0?0:j);n++;if(Q[0]===m)Q.shift()}
   out.push({k,cards:n,titles:T.slice(0,6),moved:u0!==(S.turn+'_'+S.tuan+'_'+(S.buoi||0)+'_'+(typeof used!=="undefined"?used:0))||!Q.length})}
  return out},d);
 let bad=0;for(const r of R){const ok=r.skip||r.cards<=12;if(!ok)bad++;console.log((ok?'ok   ':'FAIL ')+JSON.stringify(r))}
 await b.close();process.exit(bad?1:0)})();
