/* robot-fix-cnv-2 R3 scan (law 4 + law 11, family «her Sủng shown on a card ≠ the Sủng applied»): the kit draws HER literal Sủng through sgTxt
   (j1 SG-CARD, sg(): Hoàng thượng nồng nàn ×1.3 / lạnh lùng ×.7 on gains) and apply() adds sg(fx.sung). This probe plays the robot's bot (render off)
   under each Hoàng thượng temper (traits forced: none / lanhlung / nongnay) and lists every robot «number» row about Sủng, plus a direct check of
   every card option seen: the Sủng number the kit shows (sgTxt of the line) vs sg(o.fx.sung) when the line names a single Sủng change.
   usage: node dev/test/r10-sung-audit.js <origin> <road> <buoi> [seed]   exit 1 = a Sủng row */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [ORIGIN,ROAD,NB,SEED]=process.argv.slice(2);const M=path.join(__dirname,'..','measure');const rd=f=>fs.readFileSync(path.join(M,f),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});let bad=0;
 for(const T of ['','lanhlung','nongnay']){
 const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 await ctx.addInitScript(`(function(){let s=${+SEED||7}>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(()=>localStorage.clear());
 await p.evaluate(`window.__r10cfg=${JSON.stringify({origin:ORIGIN,road:ROAD,locked:false,pers:'skilled',uiEvery:0,lagMs:1e9,rtEvery:1e9})}`);
 await p.evaluate(rd('inpage6.js'));await p.evaluate(rd('inty.js'));await p.evaluate(rd('robot10-in.js'));const mode=await p.evaluate(()=>window.__r10.mode);
 await p.evaluate(T=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];start();
  const fix=()=>{if(S&&S.emp){S.emp.traits=(S.emp.traits||[]).filter(x=>x!=='lanhlung'&&x!=='nongnay');if(T)S.emp.traits.push(T)}};fix();
  window.__chk={n:0,bad:[]};const nb0=nextBuoi;nextBuoi=function(){fix();return nb0.apply(this,arguments)};
  const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&m.opts&&!m.__sa){m.__sa=1;for(const o of m.opts){if(!o||!o.fx||typeof o.fx.sung!=='number'||o.j67)continue;
   let raw;try{raw=typeof dilLineRaw==='function'?dilLineRaw(o):String(o.x||'')}catch(e){raw=String(o.x||'')}const t=String(sgTxt(raw)).replace(/<[^>]+>/g,' ');
   const seg=t.split(/(?=thành:|thắng:|hỏng:|thua:|mỗi\s)/i)[0];const L=[...seg.matchAll(/(^|[^\p{L}])Sủng(?: ngươi| ta)?[\s ]*([+\-−])(\d+)/gu)];if(L.length!==1)continue;
   const pre=seg.slice(Math.max(0,L[0].index-30),L[0].index+1);if(/nàng|hắn|của/.test(pre))continue;window.__chk.n++;
   const v=(L[0][2]==='+'?1:-1)*+L[0][3];const want=sg(o.fx.sung);if(v!==want&&!(/ /.test(L[0][0])&&v===o.fx.sung))window.__chk.bad.push('«'+seg.slice(0,90)+'» shows '+v+' · applies sg('+o.fx.sung+')='+want)}}}catch(e){}return c0.apply(this,arguments)}},T);
 for(let i=0;i<5000;i++){const r=await p.evaluate(([m])=>{try{window.__bot.step(m,5)}catch(e){}return {n:window.__r10.buoi,dead:!S||S.dead}},[mode]);if(r.n>=(+NB||200)||r.dead)break}
 const r=await p.evaluate(()=>({rows:window.__r10.bugs.filter(x=>x.type==='number'&&/Sủng|sung=/.test(x.msg)).map(x=>x.n+'× '+x.msg),chk:window.__chk,buoi:window.__r10.buoi,t:S&&S.emp&&S.emp.traits.join(',')}));
 const nb=r.rows.length+r.chk.bad.length;bad+=nb;
 console.log((nb?'BAD  ':'ok   ')+`${ORIGIN}/${ROAD} temper «${T||'none'}» buổi ${r.buoi} · options with one Sủng change checked ${r.chk.n} · card≠applied ${r.chk.bad.length} · robot Sủng number rows ${r.rows.length}`);
 [...new Set(r.chk.bad)].slice(0,5).forEach(x=>console.log('   card '+x));r.rows.slice(0,5).forEach(x=>console.log('   robot '+x));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
