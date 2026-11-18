/* nroadhp-unit (QUESTLINE Q2, jnroadhp.js): in the real build —
   (a) help record v.nr.hp: a help (+1) / betrayal (−1) played to the end through j72 writes [chapter, sign, turn]; the betrayal line no longer
       claims she knows; (b) the help chapter's end logs a «Phụ tuyến» line «nhờ ngươi …» / «vì ngươi bán đứng …» and the news carries it;
   (c) finale reward BAL.nroad.fin (rank tier; the test changes BAL and sees the change) on a won closing chapter after help; nothing on a loss,
       nothing after a betrayal; (d) strike-back: no carrier → never known and stops after sb.mo months; her Tai mắt / the rival's slip →
       oán + BAL.nroad.sb.oan exactly (hostility toward her rises); (e) Mệnh truyện «Phụ tuyến» sub-tab = kit skill cards (kskill) + kit rows;
   (f) old save (nr without hp, no S.nrpt) loads and plays a month; __nrhpoff / co-op guest → no record; no page errors.
   usage: node dev/test/nroadhp-unit.js <url> */
const {chromium}=require('playwright');const URL=process.argv[2]||'http://127.0.0.1:8731/index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof nhHp==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{const out=[],fail=[];const ok=(c,m)=>{out.push((c?'ok  ':'FAIL ')+m);if(!c)fail.push(m)};
  try{document.getElementById('title').hidden=true}catch(e){}
  quiet=true;window.__forceOrigin='muoi';start();quiet=false;Q.length=0;const B0=JSON.parse(JSON.stringify(BAL.nroad));const K0=JSON.parse(JSON.stringify(BAL.ag.know));
  const reset=()=>{Object.assign(BAL.nroad,JSON.parse(JSON.stringify(B0)));Object.assign(BAL.ag.know,JSON.parse(JSON.stringify(K0)))};
  const roll0=roll;const L=liveRivals(false).filter(v=>!v.queen);const v=L[0],w=L[1];if(!v||!w)return{out,fail:['no rivals']};
  const logs=()=>S.logs.map(x=>String(x).replace(/<[^>]+>/g,''));
  /* play one help hồi of kind tid to the end with option oi (0 = help, 2 = betray) */
  const help=(tid,oi)=>{v.nr=null;nrInit(v);v.nr.c=w.id;S.bac=999;S.suc=90;used=0;const q=q72();q.a.length=0;q.ch.length=0;
   const x=q72Make(T72I[tid],q72A('rv',v.id));x.bk='rv';x.bi=w.id;x.p={nr:v.nr.r,nn:v.nr.n};v.nr.hs=1;q.a.push(x);let t=0;
   roll=()=>true;while(q.a.includes(x)&&t++<12){used=0;S.suc=90;q72Do(x.u,oi)}roll=roll0;return x};
  /* (a) */
  let x=help('nr_thu',0);const N=v.nr;ok(N.hp.length===1&&N.hp[0][0]===x.p.nn&&N.hp[0][1]===1&&N.hp[0][2]===S.turn,'help → hp [chapter,+1,turn]: '+JSON.stringify(N.hp));
  ok(N.hpk==='rv:'+v.id,'asker key kept: '+N.hpk);ok(nhList().some(e=>e.w===N.hpk),'help → «Phụ tuyến» list entry');
  /* (b) chapter end after help */
  S.logs.length=0;N.t=S.turn;roll=()=>true;nrMonth();roll=roll0;let lg=logs();
  ok(lg.some(l=>/^.*Phụ tuyến · .+ · «.+» chương \d+:/.test(l)&&/nhờ ngươi giúp một tay/i.test(l)),'win after help → «nhờ ngươi …» line: '+lg.filter(l=>/Phụ tuyến/.test(l)).join(' | '));
  ok(lg.some(l=>/Tin trong cung/.test(l)&&/Nhờ ngươi giúp một tay/.test(l))||lg.filter(l=>/Tin trong cung/.test(l)).length>=BAL.nroad.newsMo,'the news line carries it (unless the month news cap is full)');
  const nLines=lg.filter(l=>/Phụ tuyến · .+ chương \d+:/.test(l)).length;N.t=S.turn;nrMonth();ok(logs().filter(l=>/Phụ tuyến · .+ chương \d+:/.test(l)).length===nLines,'the next chapter does not repeat the help line');
  /* betrayal */
  x=help('nr_thu',2);const N2=v.nr;ok(N2.hp.length===1&&N2.hp[0][1]===-1,'betray → hp [chapter,−1,turn]');ok(N2.sb&&N2.sb.k===0&&N2.sb.bn===w.name,'betray → sb fact kept (rival '+(N2.sb&&N2.sb.bn)+')');
  const hl=(q72().h[0]&&JSON.stringify(q72().h[0]))||'';ok(!/biết ngươi bán đứng/.test(logs().join(' ')+hl),'betray line no longer claims she knows');
  S.logs.length=0;N2.t=S.turn;roll=x=>false;BAL.ag.know.eye=0;nrMonth();roll=roll0;lg=logs();
  ok(lg.some(l=>/Phụ tuyến · /.test(l)&&/vì ngươi bán đứng/i.test(l)),'loss after betrayal → «vì ngươi bán đứng …» line');reset();
  /* (d) strike-back: nobody carries it */
  x=help('nr_thu',2);let sb=v.nr.sb;const o0=oan(v,S);v.staff=[];v.maid=null;(S.staff||[]).forEach(s=>s.spyFor=null);
  roll=()=>false;for(let m=0;m<BAL.nroad.sb.mo+3;m++){S.turn++;nhSbMonth()}roll=roll0;
  ok(sb.k===0&&sb.m===BAL.nroad.sb.mo&&oan(v,S)===o0,`no carrier → never known, checks stop at sb.mo=${BAL.nroad.sb.mo} (m=${sb.m}), oán unchanged`);
  /* her Tai mắt carries it; ONE CORE: sb.oan from BAL */
  x=help('nr_thu',2);sb=v.nr.sb;BAL.nroad.sb.oan=13;const o1=oan(v,S),h1=hostility(v,S);roll=()=>true;S.turn++;S.logs.length=0;nhSbMonth();roll=roll0;
  const exp=Math.min(100,Math.round(o1+13*persF(v,'slight',1)));ok(sb.k===1&&sb.by==='eye'&&Math.abs(oan(v,S)-exp)<=1,`Tai mắt → known, oán +BAL.nroad.sb.oan × her nết (persF slight) (${o1}→${oan(v,S)}, expected ${exp})`);ok(hostility(v,S)>h1,'hostility toward her rises (her agent deeds aim at her, jagent agSpite)');
  ok(logs().some(l=>/ghi hận ngươi/.test(l)&&/mách cho/.test(l)),'strike-back line names the rival and the grudge');reset();
  /* the rival lets it slip (she dislikes the player); Tai mắt off */
  x=help('nr_thu',2);sb=v.nr.sb;BAL.ag.know.eye=0;v.staff=[];v.maid=null;(S.staff||[]).forEach(s=>s.spyFor=null);affAdd(w,S,-200);const mp0=mindPick;mindPick=O=>O[0][0];S.turn++;nhSbMonth();mindPick=mp0;
  ok(sb.k===1&&sb.by==='riv','rival who dislikes her lets it slip → known by "riv"');reset();
  /* (c) finale */
  const fin=(oi,win)=>{x=help('nr_thu',oi);const M=v.nr;const last=nhChsLast(M.r);M.n=last;M.h=0;M.hs=2;M.hp=[[last,oi===0?1:-1,S.turn]];M.t=S.turn;
   const q=q72();q.a.length=0;q.ch.length=0;const a=q72A('rv',v.id),db0=q72Debt(a);const d=[];const ap0=apply;apply=o=>{if(o&&o.danh!=null&&Object.keys(o).length===1)d.push(o.danh);return ap0(o)};roll=()=>win;nrMonth();roll=roll0;apply=ap0;return{d,db:q72Debt(a)-db0,x:M.x,f:M.fin}};
  window.nhChsLast=r=>{let n=0;for(let i=BAL.road.first-1;i<=BAL.road.last;i++)if(nrCh(r,i))n=i;return n};
  S.danh=30;S.rank=0;BAL.nroad.fin.danh=[7,8,9,10];let F=fin(0,true);ok(F.x&&F.f&&F.d.includes(7)&&F.db===1,`won finale after help → Danh +fin.danh[tier] (BAL changed → ${F.d}), nợ ân +${F.db}`);
  S.danh=30;S.rank=4;F=fin(0,true);ok(F.d.includes(9),`rank tier read from fin.rk (rank 4 → ${F.d})`);
  S.danh=30;F=fin(0,false);ok(F.x&&!F.f&&!F.d.includes(9)&&F.db===0,'lost finale → nothing');S.danh=30;F=fin(2,true);ok(!F.f&&!F.d.includes(9)&&F.db===0,'won finale after betrayal → nothing');reset();
  /* (e) Mệnh truyện */
  KTSUB.story='pt';const H=ktStoryHTML();ok(/data-ktsv="pt"/.test(H)&&/kskill/.test(H)&&H.includes(v.name)&&/Phụ tuyến · «/.test(H),'Mệnh truyện «Phụ tuyến» tab = kit skill cards with the person');
  ok(!/%/.test(H.replace(/<[^>]+>/g,'')),'no % in the list');ok(/krow|kr |pcrow|krl/.test(H),'kit rows under the card');
  KTSUB.story='now';const H2=ktStoryHTML();ok(/data-ktsv="pt"/.test(H2)&&!/Phụ tuyến · «/.test(H2),'other sub-tab shows the tab, not the list');
  /* (f) off + old save */
  window.__nrhpoff=1;x=help('nr_thu',0);ok(!(v.nr.hp&&v.nr.hp.length),'__nrhpoff → no record');window.__nrhpoff=0;
  for(const u of rivals)if(u.nr){delete u.nr.hp;delete u.nr.sb;delete u.nr.hpk}delete S.nrpt;let e1=null;try{monthTick();Q.length=0}catch(e){e1=e.message}
  ok(!e1,'old save (nr without hp, no S.nrpt) plays a month '+(e1||''));KTSUB.story='pt';const H3=ktStoryHTML();ok(!/data-ktsv="pt"/.test(H3),'no list → no «Phụ tuyến» tab');
  return{out,fail}});
 console.log(r.out.join('\n'));console.log('page errors:',errs.length,errs.slice(0,5).join(' | '));
 const F=r.fail.length+errs.length;console.log(F?`NROADHP-UNIT FAIL (${F})`:`NROADHP-UNIT PASS (${r.out.length} checks)`);await b.close();process.exit(F?1:0)})();
