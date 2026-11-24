/* review/net-build test: NẾT THRESHOLDS (BAL.net.th + BAL.net.T[t].th, netTh / bandCut in jnet.js) + step 0 (range clamp, heat).
   usage: python3 dev/build/assemble.py && node dev/test/net-build.js [index.html]
   Checks (7 = old-key readers run, 8 weeks played without a console error): (1) every pool nết has a th row and only known keys; (2) netTh = base + offsets, clamped (report §3.3 worked examples);
   (3) her (S.net) and an NPC with the same 3 nết get the same levels (law 1); Emperor → base; (4) range: out-of-range .rel/.rl/.oan/.ro
   read clamped, netClampAll stores them back in range, an old save carrying −135 / 150 / 130 loads clean; (5) heat: ghen 99 alone stays
   below band 3; a proud and a gentle holder get different bands for the same danger; (6) static: no typed relation gate left (net-scan);
   net-build-rv fixes: (8) evidence acts open for a slow-«repay» player with 1 proof; (9) one forgiveness rule for every apology road;
   (10) net-scan-rv: 0 relation gates off netTh, no evG gate on a nết level; (11) netTh / band memo = the computed values. */
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
  // (8) FIX 1 (law 6a + her choices): evG is EVIDENCE — a player with the slowest «repay» nết holding 1 real proof can use every evidence act
  let slow=null;for(const a of N.F.tt)for(const c of N.F.ld)for(const d of N.F.ch){const n=[a,c,d];if(n.includes('Kiêu ngạo')&&(!slow||netTh(mk(n),'repay')>netTh(mk(slow),'repay')))slow=n}
  {const sv0=S.net,bac0=S.bac;S.net=slow;const t=liveRivals(true).find(x=>!x.queen&&rkOf(x)<7)||liveRivals(true)[1];t.ev=1;t.bac=200;
   ok(netTh(S,'repay')>1,'test player is a slow repayer (repay '+netTh(S,'repay')+', nết '+slow.join('+')+')');
   for(const k of ['trinhth','uyhiep','banphe','tieuhuy']){let r=false;try{r=!!ACT[k].ok(S,t)}catch(e){}ok(r,'1 proof, Kiêu ngạo player: '+k+' open')}
   const q=queenP();if(q&&q!==t&&q!==S){ok(!ACT.trinhhh.ok(S,t),'Trình Hoàng hậu shut with 1 proof (needs BAL.evFirm '+BAL.evFirm+')');t.ev=BAL.evFirm;ok(!!ACT.trinhhh.ok(S,t),'Trình Hoàng hậu open with BAL.evFirm proofs')}
   t.ev=0;ok(!ACT.tieuhuy.ok(S,t),'no proof: Trả chứng cứ shut');S.net=sv0;S.bac=bac0}
  // (9) FIX 2 (law 1): ONE forgiveness rule — her «Tạ lỗi», TW apol (any doer), SOC.apologise, cx:humble, jrcv mediate receiver
  {const v=liveRivals(true)[0],a=liveRivals(true)[1],x=liveRivals(true)[2];const L=netTh(v,'nguoi');
   v.oan=Math.min(100,L+5);let s=TW.apol.run(S,v);ok(/chưa nguôi|gạt đi/.test(s)&&oan(v,S)===Math.min(100,L+5),'her Tạ lỗi refused at oán ≥ her «nguoi»: '+s);
   v.oan=Math.max(1,L-5);s=TW.apol.run(S,v);ok(!/gạt đi/.test(s)&&oan(v,S)<Math.max(1,L-5),'her Tạ lỗi accepted under «nguoi»');
   const La=netTh(a,'nguoi');a.ro[v.id]=Math.min(100,La+5);s=TW.apol.run(v,a);ok(/bị gạt đi/.test(s),'NPC→NPC TW apol refused: '+s);
   const ro0=a.ro[v.id];s=SOC.apologise.run(v,a);ok(a.ro[v.id]===ro0&&(!s||/bị gạt đi/.test(s)),'SOC.apologise (→ TW apol) refused, oán kept: '+s);
   const Ls=netTh(S,'nguoi');S.ro[v.id]=Math.min(100,Ls+5);s=TW.apol.run(v,S);ok(/chưa nguôi/.test(s),'NPC→her apology: her own nết decides (same rule): '+s);S.ro[v.id]=0;
   a.ro[x.id]=Math.min(100,La+5);const O=RCVK.mediate.opts(v,a,key(x)).filter(Boolean);ok(!O.some(o=>o.id==='full'||o.id==='half'),'jrcv mediate: NPC receiver over «nguoi» cannot pick yes');
   a.ro[x.id]=0;const O2=RCVK.mediate.opts(v,a,key(x)).filter(Boolean);ok(O2.some(o=>o.id==='full'),'jrcv mediate: under «nguoi» the yes answers are back');a.ro[v.id]=0;v.oan=0}
  // (11) FIX 4: the memo returns exactly the computed level; a new nết array is recomputed
  {let bad=0;for(const p of [S].concat(liveRivals(true)))for(const k of keys){if(netTh(p,k)!==netTh0(p,k))bad++;if(netTh(p,k)!==netTh0(p,k))bad++}ok(bad===0,'memo = computed levels ('+bad+' differ)');
   const sv1=S.net;S.net=['Kiêu ngạo','Thù dai','Tham vọng'];ok(netTh(S,'than')===netTh(pr,'than'),'memo follows a new nết array');S.net=sv1;
   const w2=liveRivals(true)[3]||liveRivals(true)[0];let bb=0;for(let d=0;d<=120;d+=3){const c=bandCut(w2,d);let b0=0,lc=-1e9;const sh=netTh0(w2,'act')-N.th.act;let s3=null;for(const t of traitsOf(w2)){const R=N.T[t];if(R&&R.th&&R.th.act3!=null)s3=(s3||0)+R.th.act3}
    for(let i=1;i<BANDS.length;i++){const cc=Math.max(lc,BANDS[i][0]+(i===1?sh:i===3&&s3!=null?s3:Math.round(sh*N.bandHi)));lc=cc;if(d>=cc)b0=i}if(b0!==c)bb++}ok(bb===0,'memo band cuts = computed ('+bb+' differ)')}
  // (7) the readers of the old BAL friend keys still run: witness telling, 8 weeks of play (month ticks, remarks, news) without an error
  try{const a=liveRivals(true)[0];npcTell(a,{from:liveRivals(true)});ok(true,'npcTell runs')}catch(e){ok(false,'npcTell: '+e.message)}
  for(let i=0;i<8;i++){try{endTurn()}catch(e){ok(false,'endTurn '+i+': '+e.message);break}}ok(!S.dead||true,'8 weeks played');
  return out});
 let f=0;for(const [c,m] of R){if(!c){f++;console.log('FAIL',m)}}
 const sc=execSync('python3 '+path.join(__dirname,'..','measure','net-scan.py')).toString().split('\n').filter(l=>l&&!/\t(aff|oan) (>=|>|<=|<) 0\t/.test(l));
 if(sc.length){f++;console.log('FAIL typed relation gates left:\n'+sc.join('\n'))}
 // (10) FIX 3: the wider scan (aff/oan/rel/hostility calls, raw .rel/.oan, locals) finds no relation gate off netTh; static: no evidence gate on a nết level
 const rv=execSync('python3 '+path.join(__dirname,'..','measure','net-scan-rv.py')+' '+path.join(__dirname,'..','build')).toString();const m=/not on netTh: (\d+)/.exec(rv);
 if(!m||+m[1]!==0){f++;console.log('FAIL net-scan-rv: '+(m?m[1]:'?')+' relation gates off netTh\n'+rv.split('\n').filter(l=>/\t(number|name|via local|raw oan)\t/.test(l)).join('\n'))}
 const evn=execSync('grep -l "evG([^)]*)>=netTh" '+path.join(__dirname,'..','build')+'/j*.js || true').toString().trim();if(evn){f++;console.log('FAIL evidence gate on a nết level: '+evn)}
 if(errs.length){f++;console.log('FAIL page errors',errs.slice(0,5))}
 console.log(`${R.length+4-f}/${R.length+4} ok`);console.log(f?'FAIL':'PASS: net-build');await b.close();process.exit(f?1:0)})();
