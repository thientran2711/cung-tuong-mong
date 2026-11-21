/* dresscode NPC scan (review r1 fix 1, LUẬT SỬA CẢ NHÓM): every festival with a dress code × every consort alive, a real life played
   N years by the game's own endTurn; for each festival day: NPCs turned away / mocked (short of colours) / fit — BEFORE their festival
   roads (stat as they stand) and AFTER (dcNpcFest: own trâm, else borrow from a consort who likes them). Prints a markdown table.
   usage: node dev/test/dresscode-npc-scan.js [dev/index.html] [years=2] */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'dev/index.html',YEARS=+(process.argv[3]||2);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 const rows=await p.evaluate(async(YEARS)=>{let sd=777;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  const out=[];const cnt=k=>{let n=0,o=0,m=0,f=0;for(const v of rivals){if(!v||!v.alive||v.out||v.confined||v.coop)continue;const st=dcStat(v,k);if(!st)continue;n++;if(st.refused)o++;else if(st.miss)m++;else f++}return{n,o,m,f}};
  const y0=S.year;let guard=0;
  while(S.year<y0+YEARS&&guard++<200){Q.length=0;try{closeModal()}catch(e){}used=0;S.suc=90;S.dead=false;
   /* the real tuần change (NPC festival roads run inside dcWeek); measure BEFORE by stat just before the new festival's roads */
   const nx=(()=>{let m=S.month,t=S.tuan+1;if(t>2){t=0;m=m%12+1}return{m,t}})();const fk=Object.keys(FEST).find(k=>FEST[k].m===nx.m&&FEST[k].t.includes(nx.t)&&BAL.dc.fest[k]);
   let before=null;if(fk){before=cnt(fk)}
   try{endTurn()}catch(e){}
   const f=dcFestNow();if(f&&before)out.push({k:f.k,name:f.name,y:S.year-y0+1,strict:!!BAL.dc.fest[f.k].gate,before,after:cnt(f.k)})}
  return out},YEARS);
 console.log('| festival | year | strict | NPCs | turned away before → after | mocked before → after | fit before → after |');console.log('|---|---|---|---|---|---|---|');
 for(const r of rows)console.log(`| ${r.name} | ${r.y} | ${r.strict?'yes':''} | ${r.after.n} | ${r.before.o} → ${r.after.o} | ${r.before.m} → ${r.after.m} | ${r.before.f} → ${r.after.f} |`);
 const S0=rows.reduce((a,r)=>({bo:a.bo+r.before.o,ao:a.ao+r.after.o,bf:a.bf+r.before.f,af:a.af+r.after.f,n:a.n+r.after.n}),{bo:0,ao:0,bf:0,af:0,n:0});
 console.log(`TOTAL ${rows.length} festivals · NPC-days ${S0.n} · turned away ${S0.bo} → ${S0.ao} · fit ${S0.bf} → ${S0.af} · page errors ${errs.length}`);
 await b.close();process.exit(errs.length?1:0)})();
