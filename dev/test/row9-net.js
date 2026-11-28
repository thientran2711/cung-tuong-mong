/* ROW 9 test (review/row9-net): the Thái hậu's levels follow HER nết (holder "th" = her archetype's ONE pool nết, TH_ARCH[..].trait) and her
   behaviour changes with them; every S.th / p.th gate reads netTh("th",key) / netAt("th",..) (dev/measure/th-scan.py = 0).
   usage: python3 dev/build/assemble.py && node dev/test/row9-net.js [dev/index.html]   (exit 1 on any FAIL)
   (1) scan: 0 Thái hậu regard gates off netTh("th") · (2) each of the 5 archetypes gets base + her nết's offsets, ordered ghet < ky < quen < than < than2,
   the 5 are not all the same (Từ ái warms sooner than Quyền uy) · (3) SAME regard 32 → a Từ ái Thái hậu opens «Học với Thái hậu», protects her (jtsb),
   names her in the Hoàng hậu seat check; a Quyền uy one does not — the same rule for a consort's p.th (law 1) · (4) the printed need is her own level
   (no typed 40) · (5) crossing her «than» level up → ONE log line in her nết's voice; staying above → no second line; falling to «ghet» → the cold line;
   first look on an old save = silent · (6) deleted BAL copies have no reader (law 14) · (7) 8 weeks of play, no page error. */
const {chromium}=require('playwright');const path=require('path');const {execSync}=require('child_process');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];
 page.on('pageerror',e=>errs.push(String(e.message).slice(0,160)));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|Fetch API cannot load/.test(m.text()))errs.push('console: '+m.text().slice(0,160))});
 await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await page.goto('file://'+path.resolve(GAME),{waitUntil:'domcontentloaded'});await page.waitForTimeout(400);await page.evaluate(()=>localStorage.clear());
 await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(400);await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 const R=await page.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);try{const N=BAL.net,K=["ghet","ky","quen","than","than2"];
  const setArch=t=>{S.thO=S.thO||{};S.thO.arch=Object.keys(TH_ARCH).find(k=>TH_ARCH[k].trait===t);return thArch().trait===t};
  const ARCH=[...new Set(Object.values(TH_ARCH).map(a=>a.trait))];ok(ARCH.length===5,'5 Thái hậu archetypes ('+ARCH.join(', ')+')');
  // (2) her levels = base + her one nết's offsets (same netTh0 as everyone), ordered, and they differ by archetype
  const seen={};for(const t of ARCH){ok(setArch(t),'archetype set: '+t);ok(traitsOf("th")[0]===t,'traitsOf("th") = '+t);
   const v=K.map(k=>netTh("th",k));seen[t]=v.join('/');let ord=true;for(let i=1;i<v.length;i++)if(!(v[i]>v[i-1]))ord=false;ok(ord,`${t}: ghet<ky<quen<than<than2 (${seen[t]})`);
   const R=N.T[t]&&N.T[t].th||{};for(const k of ["than","ghet","quen"]){const C=N.thClamp[k];const want=Math.max(C[0],Math.min(C[1],Math.round(N.th[k]+(R[k]||0))));ok(netTh("th",k)===want,`${t}: netTh(th,${k}) ${netTh("th",k)} = base ${N.th[k]} + ${R[k]||0}`)}
   ok(netAt("th","than2",80)===Math.min(100,80+netTh("th","than2")-N.th.than2),`${t}: netAt keeps the gap above than2 (${netAt("th","than2",80)})`)}
  ok(new Set(Object.values(seen)).size>=4,'archetypes have different levels ('+JSON.stringify(seen)+')');
  setArch("Ân cần");const warm=netTh("th","than");setArch("Kiêu ngạo");const proud=netTh("th","than");ok(warm<proud,`Từ ái warms sooner than Quyền uy (than ${warm} < ${proud})`);
  // (3) SAME regard, different archetype → different behaviour (her and a consort alike)
  const mid=Math.round((warm+proud)/2);const v=liveRivals(true).find(x=>!x.out)||liveRivals(true)[0];
  const look=()=>{S.th=mid;v.th=mid;S.buoi=0;S.thDead=false;const r={};
   try{r.learn=S.th>=netTh("th","than")}catch(e){r.learn='ERR '+e.message}
   try{const p=tsbProtector(liveRivals(true).find(x=>x!==v)||v);r.prot=!!(p&&p.n==="Thái hậu")}catch(e){r.prot='ERR '+e.message}
   try{r.hhNeed=hhNeed(S).th}catch(e){r.hhNeed='ERR '+e.message}
   return r};
  setArch("Ân cần");const A=look();setArch("Kiêu ngạo");const P=look();
  ok(A.learn===true&&P.learn===false,`regard ${mid}: Từ ái lets her learn, Quyền uy does not (${A.learn}/${P.learn})`);
  ok(A.prot===true&&P.prot===false,`regard ${mid}: Từ ái stands up for her (tsbProtector), Quyền uy does not (${A.prot}/${P.prot})`);
  const ct0=ct;if(!ct())ct=()=>({bk:{}});/* backers() reads the open contest's backer list */
  setArch("Ân cần");v.th=netTh("th","than2");const bA=backers(v).includes("Thái hậu");setArch("Kiêu ngạo");const bP=backers(v).includes("Thái hậu");ct=ct0;
  ok(bA===true&&bP===false,`a consort at the same p.th: Từ ái backs her, Quyền uy does not (law 1, p.th) (${bA}/${bP})`);
  ok(typeof A.hhNeed==='number'&&typeof P.hhNeed==='number'&&A.hhNeed<P.hhNeed,`Hoàng hậu seat: Thái hậu need follows her nết (${A.hhNeed} < ${P.hhNeed})`);
  // (4) the printed need is her own level
  setArch("Ân cần");S.th=0;let t1="";try{t1=(promoReqP(S)||[]).map(x=>x[1]).join(' | ')}catch(e){t1='ERR'}
  const nums=[...t1.matchAll(/hoặc Thái hậu (-?\d+)/g)].map(x=>+x[1]);ok(!/ERR/.test(t1)&&nums.every(n=>n===netTh("th","than2")||n===netTh("th","than")),'promotion needs print HER level (Ân cần: '+nums.join(',')+' ∈ {'+netTh("th","than")+','+netTh("th","than2")+'})');
  // (5) crossing her «than» level → ONE line in her nết's voice; staying → none; cold line at «ghet»; first look silent
  setArch("Ân cần");S.netX={};S.th=0;const n0=S.logs.length;netThCross();ok(S.logs.length===n0,'first look = silent baseline');
  const TL=()=>S.logs.filter(l=>/Thái hậu (nắm tay|nói thẳng|vốn|nói ngươi có phúc|từ nay|thở dài)/.test(l)).length;const c0=TL();
  S.th=netTh("th","than")-1;apply({th:1});while(S.th<netTh("th","than"))apply({th:5});const c1=TL();ok(c1===c0+1&&S.logs.some(l=>/Thái hậu nắm tay ngươi/.test(l)),'crossing «than» up: one Ân cần line');
  apply({th:1});netThCross();ok(TL()===c1,'still above: no second line');
  S.th=netTh("th","ghet");netThCross();const g=S.logs.find(l=>/Thái hậu thở dài/.test(l))||"";ok(TL()===c1+1&&g&&!/\d/.test(g.replace(/<[^>]+>[^<]*<\/span>/,'')),'falling to «ghet»: one cold line, no number');
  setArch("Kiêu ngạo");S.netX={};S.th=0;netThCross();S.th=netTh("th","than");netThCross();ok(/vốn khó chiều/.test(S.logs[0]),'Quyền uy speaks in her own voice');
  // (6) the deleted BAL copies (law 14)
  const gone=[["qBlockTh",BAL.qBlockTh],["hiOppTh",BAL.hiOppTh],["hhTh",BAL.hhTh],["ag.th.fondTh",BAL.ag.th.fondTh],["ag.th.mercyTh",BAL.ag.th.mercyTh],["ag.cx.thHelp.min",BAL.ag.cx.thHelp.min],
   ["succN.cTh",BAL.succN.cTh],["succN.thB",BAL.succN.thB],["succN.thOpp",BAL.succN.thOpp],["ag.why.ap.th",BAL.ag.why.ap.th],["ag.why.fav.th",BAL.ag.why.fav.th],["ag.why.fav.thLow",BAL.ag.why.fav.thLow],
   ["ag.why.job.th",BAL.ag.why.job.th],["ag.why.g2b.guard.th",BAL.ag.why.g2b.guard.th],["ag.why.g2rcp.thHi",BAL.ag.why.g2rcp.thHi],["dh.cond.th",BAL.dh.cond.th],["staff.say.tn",BAL.staff.say.tn],
   ["road.ch_co",BAL.road.ch_co],["road.ch_benh",BAL.road.ch_benh],["charge.tu.spare.thMin",BAL.charge.tu.spare.thMin],["promoR.sp.th.cut",BAL.promoR.sp.th.cut],["stp.fate.tuanTh",(BAL.mort&&BAL.mort.fate||{}).tuanTh]];
  for(const [k,x] of gone)ok(x===undefined,'BAL.'+k+' deleted in place');
  // (7) play
  S.thDead=false;for(let i=0;i<8;i++){try{endTurn()}catch(e){ok(false,'endTurn '+i+': '+e.message);break}}ok(true,'8 weeks played');
  }catch(e){ok(false,'test threw (feature missing?): '+e.message)}
  return out});
 let f=0;for(const [c,m] of R){if(!c){f++;console.log('FAIL',m)}else console.log('ok  ',m)}
 const sc=execSync('python3 '+path.join(__dirname,'..','measure','th-scan.py')+' '+path.join(__dirname,'..','build')).toString();const m=/netTh\("th"\): (\d+)/.exec(sc);
 if(!m||+m[1]!==0){f++;console.log('FAIL th-scan: '+(m?m[1]:'?')+' Thái hậu regard gates off netTh("th")')}else console.log('ok   th-scan 0');
 if(errs.length){f++;console.log('FAIL page errors',errs.slice(0,5))}
 console.log(`${R.length+2-f}/${R.length+2} ok`);console.log(f?'FAIL':'PASS: row9-net');await b.close();process.exit(f?1:0)})();
