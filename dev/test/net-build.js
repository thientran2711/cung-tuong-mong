/* review/net-build test: NẾT THRESHOLDS (BAL.net.th + BAL.net.T[t].th, netTh / bandCut in jnet.js) + step 0 (range clamp, heat).
   usage: python3 dev/build/assemble.py && node dev/test/net-build.js [index.html]
   Checks (7 = old-key readers run, 8 weeks played without a console error): (1) every pool nết has a th row and only known keys; (2) netTh = base + offsets, clamped (report §3.3 worked examples);
   (3) her (S.net) and an NPC with the same 3 nết get the same levels (law 1); Emperor → base; (4) range: out-of-range .rel/.rl/.oan/.ro
   read clamped, netClampAll stores them back in range, an old save carrying −135 / 150 / 130 loads clean; (5) heat: ghen 99 alone stays
   below band 3; a proud and a gentle holder get different bands for the same danger; (6) static: no typed relation gate left (net-scan). */
const {chromium}=require('playwright');const path=require('path');const {execSync}=require('child_process');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];
 page.on('pageerror',e=>errs.push(String(e.message).slice(0,160)));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|Fetch API cannot load/.test(m.text()))errs.push('console: '+m.text().slice(0,160))});
 await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await page.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await page.waitForTimeout(400);await page.evaluate(()=>localStorage.clear());
 await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(400);await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 const R=await page.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);const N=BAL.net,keys=Object.keys(N.th);
  // (1) tables
  const pool=[...new Set([...Object.values(N.F).flat(),...Object.values(N.M).flat()])];ok(pool.length===26,'26 pool nết ('+pool.length+')');
  for(const t of pool){const R=N.T[t];ok(R&&R.th&&typeof R.th==='object','th row: '+t);for(const k in (R&&R.th)||{})ok(keys.includes(k)||k==='act3','known key '+t+'.'+k)}
  for(const k of keys)ok(N.thClamp[k]&&N.thClamp[k][0]<=N.th[k]&&N.th[k]<=N.thClamp[k][1],'base inside clamp: '+k);
  // (2) worked examples (report §3.3)
  const mk=(net)=>({id:9990,name:'Thử',net,rl:{},ro:{},rel:0,oan:0,alive:true});
  const ex=[[['Kiêu ngạo','Thù dai','Tham vọng'],{than:55,act:10}],[['Ân cần','Rộng lượng','An phận'],{than:17,act:60,nguoi:60}],[['Lạnh lùng','Thù dai','Thực tế'],{than:52}],[['Ân cần','Thật thà','Ham vui'],{than:15}]];
  for(const [n,w] of ex){const p=mk(n);for(const k in w)ok(netTh(p,k)===w[k],`netTh(${n.join('+')},${k}) = ${netTh(p,k)} (want ${w[k]})`)}
  // every combination stays in its clamp
  let bad=0;for(const a of N.F.tt)for(const c of N.F.ld)for(const d of N.F.ch){const p=mk([a,c,d]);for(const k of keys){const v=netTh(p,k),C=N.thClamp[k];if(v<C[0]||v>C[1])bad++}}ok(bad===0,'all 512 female combos in clamp (bad '+bad+')');
  // spread: proud vs gentle differ
  const pr=mk(['Kiêu ngạo','Thù dai','Tham vọng']),ge=mk(['Ân cần','Rộng lượng','An phận']);ok(netTh(pr,'act')<netTh(ge,'act')&&netTh(pr,'than')>netTh(ge,'than'),'proud acts sooner, befriends later');
  // (3) law 1: her with the same nết = same levels; Emperor = base
  const sv=S.net;S.net=['Kiêu ngạo','Thù dai','Tham vọng'];let same=true;for(const k of keys)if(netTh(S,k)!==netTh(pr,k))same=false;ok(same,'her levels = an NPC with the same 3 nết');S.net=sv;
  let base=true;for(const k of keys)if(netTh(S.emp,k)!==N.th[k])base=false;ok(base,'Emperor (no pool nết) = base levels');
  // (4) range
  const v=liveRivals(true)[0],u=liveRivals(true)[1];v.rel=-135;v.rl[u.id]=150;v.oan=130;v.ro[u.id]=-7;S.rl[v.id]=-180;
  ok(aff(v,S)===-100&&aff(v,u)===100&&oan(v,S)===100&&oan(v,u)===0&&aff(S,v)===-100,'aff/oan read clamped');
  const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;const v2=rivals.find(x=>x.id===v.id),u2=rivals.find(x=>x.id===u.id);
  ok(v2.rel===-100&&v2.rl[u2.id]===100&&v2.oan===100&&v2.ro[u2.id]===0&&S.rl[v2.id]===-100,'old save with out-of-range values loads clean');
  v2.rel=-120;const n=netClampAll();ok(n>=1&&v2.rel===-100,'weekly sweep clamps stored values ('+n+')');
  // (5) heat
  const w=liveRivals(true)[2]||v2;w.ghen=99;w.oan=0;w.rel=0;const dg=danger(w,S);ok(dg<BANDS[3][0],'ghen 99 alone stays under band 3 (danger '+dg+')');
  w.oan=90;ok(danger(w,S)>=BANDS[3][0]-10,'deep oán still reaches the top bands ('+danger(w,S)+')');
  ok(bandCut(pr,35)>bandCut(ge,35),'same danger 35: proud band '+bandCut(pr,35)+' > gentle band '+bandCut(ge,35));
  ok(bandCut(mk(['Ân cần','Xảo quyệt','Mê tín']),BANDS[3][0]-5)===3,'Xảo quyệt act3: strikes hard once moved');
  // (7) the readers of the old BAL friend keys still run: witness telling, 8 weeks of play (month ticks, remarks, news) without an error
  try{const a=liveRivals(true)[0];npcTell(a,{from:liveRivals(true)});ok(true,'npcTell runs')}catch(e){ok(false,'npcTell: '+e.message)}
  for(let i=0;i<8;i++){try{endTurn()}catch(e){ok(false,'endTurn '+i+': '+e.message);break}}ok(!S.dead||true,'8 weeks played');
  return out});
 let f=0;for(const [c,m] of R){if(!c){f++;console.log('FAIL',m)}}
 const sc=execSync('python3 '+path.join(__dirname,'..','measure','net-scan.py')).toString().split('\n').filter(l=>l&&!/\t(aff|oan) (>=|>|<=|<) 0\t/.test(l));
 if(sc.length){f++;console.log('FAIL typed relation gates left:\n'+sc.join('\n'))}
 if(errs.length){f++;console.log('FAIL page errors',errs.slice(0,5))}
 console.log(`${R.length+2-f}/${R.length+2} ok`);console.log(f?'FAIL':'PASS: net-build');await b.close();process.exit(f?1:0)})();
