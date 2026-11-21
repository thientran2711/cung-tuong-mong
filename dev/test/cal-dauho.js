/* cal-p2 Đầu hồ owner-bug fix (OD 20/11 ~08:30Z: real broken boards are fixed as bugs; her first try 1.1/10). node dev/test/cal-dauho.js [new=index.html] [base=origin/main]
   1 Bắn cung untouched: kg82Aim source, KG82_KIND.ban, BAL.mgTier kAdj.ban / kG.ban / lev.ban / tol / gamma, and mgTier("ban").ease for every occasion × rank 0..7 × art level 0..5
     are byte-identical to the base build (git show <base>:index.html)
   2 Đầu hồ knobs in BAL only (law 4): BAL.mgTier.lev.dauho {aid, mouth, pull}; k91Fling reads pull through mgLev (no typed gain)
   3 law 5 kept: harder board (lower ease) = shorter aim dots, smaller mouth, more sensitive pull; the strongest throw (K·MAXD) is the same at every ease
   4 her Đầu hồ base from the broken board is out of the shared book (ROOT-74 06:04Z, she re-tests): no BAL.ag.mg2.cal.k.dauho, NPC dauho hands use the adult bell curve (BAL.ag.mg2.hand ctr / sd)
   5 no page errors */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');
const R=path.resolve(__dirname,'../..');const NEW=path.resolve(process.argv[2]||path.join(R,'index.html'));const BASE=process.argv[3]||'origin/main';
const bf=path.join(os.tmpdir(),'cal-dauho-base-'+process.pid+'.html');fs.writeFileSync(bf,cp.execSync(`git -C "${R}" show ${BASE}:index.html`,{maxBuffer:1<<28}));
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const probe=()=>{const B=BAL.mgTier,o={};o.aim=String(kg82Aim);o.kind=JSON.stringify(KG82_KIND.ban);o.eng=KG82_KIND.ban.e;
 o.bal=JSON.stringify([B.kAdj.ban,(B.kG||{}).ban,B.tol,B.gamma,B.mid,B.slope,B.easeMin,B.occ,B.big,B.stakeMax,B.band]);
 const E=[];Object.keys(B.occ).forEach(occ=>{for(let rank=0;rank<8;rank++)for(let lv=0;lv<6;lv++)E.push(mgTier("ban",{occ,rank,lv}).ease)});o.ease=E.join(",");
 const L=(B.lev||{}).dauho||{};o.calDh=!!(BAL.ag.mg2.cal.k||{}).dauho;o.band=JSON.stringify(mgCalBand("dauho"));{const H=BAL.ag.mg2.hand,T=H.ctr||{};o.bandDef=JSON.stringify({m:T.dauho!=null?T.dauho:T[""]})}/* bell curve (mg-fair-ratio): the adult curve centre, never her b */o.dh=L;o.fl=String(k91Fling);o.ev={};[0,1.6,3.2,4.8,5].forEach(e=>{const env={lv:e};o.ev[e]={aid:mgLev(env,"dauho","aid"),mouth:mgLev(env,"dauho","mouth"),pull:mgLev(env,"dauho","pull")}});return o};
(async()=>{const b=await chromium.launch();const get=async f=>{const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+f,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kg82Aim==='function'&&typeof mgTier==='function'&&typeof k91Fling==='function',null,{timeout:60000});
  const o=await p.evaluate(probe);await p.waitForTimeout(500);o.errs=errs;await p.close();return o};
 const n=await get(NEW),o=await get(bf);
 /* dauho-lv5 (owner 21/11, whole group): kg82Aim scores the PAINTED rings now (BAL.mgArt.ban + lev.ban.size, dev/test/dauho-hole.js B) — source may differ; the ease table stays */
 ok(/BAL\.mgArt\.ban/.test(n.aim),'1 kg82Aim (Bắn cung engine) scores the painted rings (BAL.mgArt.ban)');ok(n.kind===o.kind&&n.eng==='aim','1 KG82_KIND.ban identical (engine aim)');
 ok(n.bal===o.bal,'1 BAL knobs Bắn cung reads identical (except its own lev.ban.size, dauho-lv5)',n.bal===o.bal?undefined:[o.bal,n.bal]);ok(n.ease===o.ease,'1 mgTier("ban") ease identical for 5 occasions × 8 ranks × 6 levels');
 ok(['aid','mouth','pull'].every(k=>Array.isArray(n.dh[k])&&n.dh[k].length===2),'2 BAL.mgTier.lev.dauho has aid, mouth, pull',n.dh);
 ok(/mgLev\(env,"dauho","pull"\)/.test(n.fl)&&/K=5\.4\*PULL/.test(n.fl)&&/MAXD=U\*\.45\/PULL/.test(n.fl),'2 k91Fling reads the pull knob; strongest throw K·MAXD kept');
 const e0=n.ev[0],e5=n.ev[5],e3=n.ev[3.2];ok(e0.aid<e3.aid&&e3.aid<e5.aid&&e0.mouth<e3.mouth&&e3.mouth<e5.mouth&&e0.pull>e3.pull&&e3.pull>e5.pull,'3 law 5: harder board = shorter dots, smaller mouth, more sensitive pull',n.ev);
 ok(o.ev[3.2].aid<=e3.aid&&o.ev[3.2].mouth<=e3.mouth,'3 the matching board is not harder than the base build (cal-p2 owner bug: 1.1/10)',{before:o.ev[3.2],after:e3});
 ok(!n.calDh&&JSON.parse(n.band).m===JSON.parse(n.bandDef).m,'4 no cal.k.dauho; dauho NPC curve = the adult curve (BAL.ag.mg2.hand ctr)',{band:n.band,def:n.bandDef});
 ok(!n.errs.length,'5 no page errors',n.errs.slice(0,3));
 await b.close();fs.unlinkSync(bf);const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL OK');process.exit(f?1:0)})();
