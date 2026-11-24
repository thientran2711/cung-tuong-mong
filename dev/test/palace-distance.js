/* palace-distance (OD 24/11 ~08:45Z, Foreman D order 08:46Z): the Emperor's tablet / visit odds and the night's Sủng scale with the palace's distance
   from Dưỡng Hòa điện (jpdist, BAL.palDist); a visit to a far palace = extra Sủng / Danh + the news line «… dù ở xa vẫn được ngự giá». Same for her and NPCs.
   (a) measure: pdFarIx = 1 − bcNear for every palace (one measure with jbancung); residence of her / an NPC / the queen / Ngọc Thanh các resolves;
   (b) tablet: nightCh near > far, ratio = 1 − night × far, her and an NPC alike; (c) visit: visCh near > far, ratio = 1 − visit × far, her and NPC;
   (d) night Sủng: her nightGain + round(nightSung × far); an NPC's night inside rivalNight gets her own far add;
   (e) far visit: her nightFx after a visit at a far palace → Danh + bonus + the news line; a near one → none; an NPC visGo the same;
   (f) Ban cung card: every option prints «ngự giá: <ladder word>» = word(pdVisOdds) with the reason, no %;
   (g) one core: BAL.palDist.night / visit = 0 → no distance effect; (h) gain-and-loss: tablet EV near vs far within 25 %; (i) no dice.
   usage: node dev/test/palace-distance.js [url] */
const {chromium}=require('playwright');const path=require('path');
const URL=process.argv[2]||'file://'+path.resolve(__dirname,'../../index.html');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof pdFar==='function',null,{timeout:120000});await p.waitForTimeout(1000);
 const r=await p.evaluate(()=>{const out=[],fail=[];const ok=(c,m)=>{out.push((c?'ok  ':'FAIL ')+m);if(!c)fail.push(m)};
  quiet=true;start();quiet=false;Q.length=0;const B=BAL.palDist,B0=JSON.parse(JSON.stringify(B));
  const idx=n=>PALN.indexOf(n);const HA=idx("Hàm An cung"),DH=idx("Diên Huy cung");ok(HA>=0&&DH>=0,'palaces on the plan');
  S.srv=null;S.resHead=null;/* a consort life (a random start may be a maid's) */
  for(const v of rivals)v.pal=null;
  /* (a) */
  ok(PALN.every((_,i)=>Math.abs(pdFarIx(i)-(1-bcNear(i)))<1e-9),'pdFarIx = 1 − bcNear for all '+PALN.length+' palaces');
  ok(pdFarIx(DH)===0&&pdFarIx(HA)===1,'Diên Huy nearest (0), Hàm An farthest (1)');
  const tbl=PALN.map((n,i)=>n+' '+pdFarIx(i).toFixed(2)).join(' · ');out.push('     far: '+tbl);
  S.cyb={lie:wk()};/* her monthly days (jcycle cyTray) off for this test */
  S.rank=3;S.sung=60;S.an=30;S.preg=0;S.block=0;S.confined=0;S.out=0;S.tablet=0;S.pal=DH;ok(pdFar(S)===0,'her at Diên Huy: far 0');
  S.pal=HA;ok(pdFar(S)===1,'her at Hàm An: far 1');
  const v=rivals.find(x=>x.alive&&!x.out&&!x.queen&&!x.coop&&!x.preg&&!illOf(x)&&!(typeof cyTray==='function'&&cyTray(x)));v.ill=null;v.admonWk=null;v.rank=3;v.sung=60;v.an=30;v.preg=0;v.block=0;v.confined=0;v.out=0;v.tablet=0;v.pal=HA;
  ok(pdFar(v)===1,'NPC at Hàm An: far 1');
  const q=queenP&&queenP();if(q&&q!==S)ok(Math.abs(pdFar(q)-pdFarD(pdDistPt(MAPH.places.kn)))<1e-9,'Hoàng hậu measured at Càn Ninh: '+pdFar(q).toFixed(2));
  /* (b) tablet */
  const nc=(p,i)=>{p.pal=i;return nightCh(p)};
  const set0=()=>{B.night=0;B.visit=0},rs=()=>Object.assign(B,B0);
  for(const [who,P] of [['her',S],['NPC',v]]){set0();const raw=nc(P,HA);rs();const far=nc(P,HA),near=nc(P,DH);
   ok(near>far&&Math.abs(far-Math.max(1,Math.round(raw*(1-B.night))))<=1,`${who} tablet: near ${near} > far ${far} (= ${raw} × ${1-B.night})`)}
  /* (c) visit */
  for(const [who,P] of [['her',S],['NPC',v]]){P.pal=HA;set0();const raw=visCh(P);rs();const far=visCh(P);P.pal=DH;const near=visCh(P);
   ok(raw>0&&near>far&&Math.abs(far-raw*(1-B.visit))<1e-9,`${who} visit odds: near ${near.toFixed(2)} > far ${far.toFixed(2)} (= ${raw.toFixed(2)} × ${1-B.visit})`)}
  /* (d) night Sủng */
  S.pal=DH;const gN=nightGain(2).sung;S.pal=HA;const gF=nightGain(2).sung;ok(gF-gN===Math.round(B.nightSung),`her night Sủng: far ${gF} = near ${gN} + ${B.nightSung}`);
  {v.pal=HA;const ng=nightGain,seen=[];nightGain=function(s){const r=ng.apply(this,arguments);seen.push([s,r.sung]);return r};S.pal=DH;
   try{const sv=Math.random;Math.random=()=>.5;try{rivalNight(v)}finally{Math.random=sv}}catch(e){out.push('     rivalNight: '+e.message)}finally{nightGain=ng}
   const hit=seen.find(x=>x[1]===BAL.night.sung+Math.max(0,Math.round(x[0]/2))+pdNightAdd(v));ok(seen.length&&hit&&pdNightAdd(v)===2,`NPC night inside rivalNight gets her own far add (+${pdNightAdd(v)}), not hers (+${pdNightAdd(S)})`)}
  /* (e) far visit — her */
  const runVis=i=>{S.pal=i;Q.length=0;const d0=S.danh=30;S.visNight=wk();S.visLost=null;S.visQ=0;const L0=S.logSeq||0;nightFx(2);Q.length=0;return{dd:S.danh-d0,log:S.logs.slice(0,(S.logSeq||0)-L0).join(' ')}};
  const vf=runVis(HA),vn=runVis(DH),g=pdVisBonus(1);
  ok(g&&vf.dd-vn.dd===g.danh,`her far visit: Danh +${vf.dd} vs near +${vn.dd} (bonus +${g&&g.danh})`);
  ok(/dù ở xa vẫn được ngự giá/.test(vf.log)&&new RegExp('Danh '+(30+vf.dd-g.danh)+' → '+(30+vf.dd)+'\\.').test(vf.log)&&!/dù ở xa/.test(vn.log),'her far visit: news line «dù ở xa vẫn được ngự giá» (near: none)'+(/dù ở xa/.test(vf.log)?'':' LOG: '+vf.log.slice(0,400)));
  /* NPC */
  const runNpc=i=>{v.pal=i;v.danh=30;v.visW=null;S.tonight=null;if(S.emp)S.emp.visit=null;const L0=S.logSeq||0;const r=window.visGo(v);return{r,dd:v.danh-30,log:S.logs.slice(0,(S.logSeq||0)-L0).join(' ')}};
  const nf=runNpc(HA),nn=runNpc(DH);ok(nf.r==="npc"&&nf.dd-nn.dd===g.danh,`NPC far visit: Danh +${nf.dd} vs near +${nn.dd}`);
  ok(/dù ở xa vẫn được ngự giá/.test(nf.log)&&!/dù ở xa/.test(nn.log),'NPC far visit: the same news line (her name, or masked when she does not know her yet)');
  ok((S.news||[]).some(n=>n.k==="farvisit"&&n.id===v.id),'NPC far visit reaches her news');
  S.tonight=null;
  /* (f) Ban cung card */
  S.rank=3;S.pal=HA;S.palCer=1;Q.length=0;palCeremony();const d=Q[Q.length-1];ok(d&&d.t==="Ban cung",'Ban cung dialog');
  const cards=d.opts.filter(o=>!o.off);const W=KIT_ODDS.join('|');
  ok(cards.length>=2&&cards.every(o=>new RegExp('ngự giá: ('+W+') \\(').test(o.x)),'every open card prints «ngự giá: <ladder word> (why)»');
  const pal=o=>PALN.find(n=>o.n.endsWith(n));
  ok(cards.every(o=>o.x.includes('ngự giá: '+word(pdVisOdds(S,idx(pal(o))))+' (')),'card word = word(pdVisOdds) (shown = applied)');
  ok(!/%/.test(JSON.stringify(d.opts.map(o=>[o.n,o.x]))),'no % on the cards');
  const take=d.opts[0];ok(/xa ngự tẩm/.test(take.x)&&/Danh \+/.test(take.x),'«Nhận Hàm An»: far reason + the far-visit bonus: '+take.x.split(' · ').pop());
  out.push('     cards: '+cards.map(o=>o.n+' → '+o.x.split(' · ').pop()).join(' | '));Q.length=0;
  /* (g) one core */
  set0();S.pal=HA;const a=nightCh(S),c1=visCh(S);S.pal=DH;const a2=nightCh(S),c2=visCh(S);rs();ok(a===a2&&Math.abs(c1-c2)<1e-9,'BAL.palDist night/visit 0 → no distance effect (one core)');
  /* (h) gain-and-loss: Sủng per night × tablet weight, near vs far */
  S.pal=DH;const wN=nightCh(S),GN=nightGain(2).sung;S.pal=HA;const wF=nightCh(S),GF=nightGain(2).sung;const eN=wN*GN,eF=wF*GF;
  ok(Math.abs(eF-eN)/eN<=.25,`tablet EV near ${wN}×${GN}=${eN} vs far ${wF}×${GF}=${eF} (within 25 %)`);
  /* (i) no dice */
  const s=new Set();for(let k=0;k<50;k++)s.add(pdFar(S)+'|'+pdVisOdds(S,HA)+'|'+nightCh(S));ok(s.size===1,'pure: 50 calls same');
  return{out,fail}});
 for(const l of r.out)console.log(l);if(errs.length)console.log('page errors:',errs.slice(0,3));
 const n=r.out.filter(l=>/^ok|^FAIL/.test(l)).length;console.log(r.fail.length||errs.length?`palace-distance FAIL ${r.fail.length}/${n}`:`palace-distance PASS ${n}/${n}`);
 await b.close();process.exit(r.fail.length||errs.length?1:0)})();
