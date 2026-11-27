/* pace-trim (review/pace-speed, MAIN 162 ruling 26/11 ~20:12Z under owner OD 26/11 ~19:10Z (A)): the safe trim jtrim skips ONLY zero-choice cards
   whose every sentence is already in her log. Unit checks of trimWhy on built cards, then a robot run (inpage6 «sens» bot) that records every card
   the game queues: each skipped card must have no opts / hook / stat chip, and the family table (cards met, skipped, kept by reason) is printed.
   usage: node dev/test/pace-trim.js <index.html> [months=6] → ok / FAIL lines, last line PASS / FAIL n; exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const [,,PAGE,MO]=process.argv;const NM=+MO||6;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await ctx.addInitScript(`(function(){let s=777;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
 const p=await ctx.newPage();p.setDefaultTimeout(600000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
 const U=await p.evaluate(()=>{const R=[];const ok=(c,m)=>R.push([!!c,m]);
  ok(typeof trimWhy==="function"&&BAL.trim&&BAL.trim.on,"jtrim loaded, BAL.trim on");if(typeof trimWhy!=="function")return R;
  const line="Hoàng thượng ngự giá đến Ngự hoa viên ngắm hoa đầu xuân.";log(line);
  ok(trimWhy({t:"Tin",kind:"news",h:`<p class="past">${when()}</p><p>${line}</p>`})==="","a news card whose sentence is in the log is skipped");
  ok(trimWhy({t:"Tin",kind:"news",h:`<p>${line} Một câu mới chưa có trong nhật ký.</p>`})==="new","a card with one sentence not in the log is kept");
  ok(trimWhy({t:"Tin",kind:"news",h:`<p>${line}</p>`,opts:[{n:"A"},{n:"B"}]})==="choice","a card with options is kept");
  ok(trimWhy({t:"Tin",kind:"news",h:`<p>${line}</p>`,onClose:()=>{}})==="choice","a card with an onClose hook is kept");
  ok(trimWhy({t:"Tin",kind:"harm",h:`<p>${line}</p>`})==="kind","a card of another kind (harm / plot / scene) is kept");
  log("Ngươi được ban thưởng, Danh +3 trong cung truyền tụng.");ok(trimWhy({t:"Thưởng",kind:"notice",h:"<p>Ngươi được ban thưởng, Danh +3 trong cung truyền tụng.</p>"})==="stat","a card that shows a stat change is kept");
  BAL.trim.on=0;ok(trimWhy({t:"Tin",kind:"news",h:`<p>${line}</p>`})==="off","switch off → nothing skipped");BAL.trim.on=1;
  return R});
 let src=fs.readFileSync(path.join(__dirname,'..','measure','inpage6.js'),'utf8');await p.evaluate(src);
 await p.evaluate(()=>{Q.length=0;const met=window.__met={};const bad=window.__bad2=[];
  const rec=(m,why)=>{const k=why||"skip";const e=met[k]=met[k]||{n:0,t:{}};e.n++;const t=String(m.t||"").replace(/\d+/g,"#").slice(0,30);e.t[t]=(e.t[t]||0)+1;
   if(!why){if(m.opts||m.onClose)bad.push("skipped a card with a choice: "+t);for(const x in m)if(typeof m[x]==="function")bad.push("skipped a card with a hook: "+t)}};
  const tw=trimWhy;window.trimWhy=trimWhy=function(m){const r=tw.apply(this,arguments);try{if(m&&!m.__tr){m.__tr=1;rec(m,r)}}catch(e){}return r}});
 const t0=Date.now();let mo=0;
 while(true){const st=await p.evaluate(()=>{window.__bot.step('sens',120);return S.turn});if(st>=NM||Date.now()-t0>600000)break}
 const F=await p.evaluate(()=>({met:window.__met,bad:window.__bad2,n:window.__trimN}));
 for(const [c,m] of U)console.log((c?'ok   ':'FAIL ')+m);
 console.log(`family: cards checked by kind of verdict (skip = not painted):`);for(const k in F.met){const top=Object.entries(F.met[k].t).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([t,n])=>`${t} ×${n}`).join(" · ");console.log(`  ${k}\t${F.met[k].n}\t${top}`)}
 const fails=U.filter(x=>!x[0]).length+F.bad.length;for(const x of F.bad.slice(0,10))console.log('FAIL '+x);
 if(errs.length)console.log('page errors: '+errs.slice(0,3).join(' | '));
 console.log(`skipped ${F.n} cards in ${NM} months`);console.log(fails?`FAIL ${fails}`:'PASS');await b.close();process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(2)});
