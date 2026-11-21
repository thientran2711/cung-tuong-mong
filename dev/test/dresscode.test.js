/* dresscode (review/dresscode, dev/build/jdc.js + jdc0.js, BAL.dc in jbal2): PARKING #11 SEASON + COLOUR DRESS CODE.
   Checks: the one colour table (10 families, Foreman C palette c01–c32 + m01–m52, every trâm / hoa điền pair, every robe fabric), robe colours
   = the painting (tier t7/t8, lãnh cung), item rows in Tư trang, season fit (her + NPC, cost by rank, the frame), festival gate queued BEFORE the
   festival events (real endTurn), borrow → the piece really moves and comes back, the shared contest formula cut for her AND an NPC, an NPC turned
   away, stay → festival events gone, NPC asks to borrow hers, calendar popover line, wear-slot label, old save + save round trip.
   usage: node dev/test/dresscode.test.js [dev/index.html]   → exit 1 on FAIL or page error */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'dev/index.html';let fail=0;const ck=(n,c,x)=>{console.log((c?'ok  ':'FAIL')+' '+n+(x!==undefined?' · '+JSON.stringify(x):''));if(!c)fail++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(async()=>{let sd=20261120;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());Q.length=0;used=0;S.suc=90;try{closeModal()}catch(e){}});

 /* 1. the ONE table */
 const t=await p.evaluate(()=>{const D=BAL.dc;const fam=Object.keys(D.fam);const ok=a=>Array.isArray(a)&&a.length===2&&a.every(f=>D.fam[f]);
  const c=[...Array(32)].map((_,i)=>'c'+String(i+1).padStart(2,'0')),m=[...Array(52)].map((_,i)=>'m'+String(i+1).padStart(2,'0'));
  const acc=WD_LIST.filter(r=>r[1]!=='y').map(r=>r[0]),ys=WD_LIST.filter(r=>r[1]==='y').map(r=>r[0]);
  return{fam,miss:c.concat(m).filter(k=>!ok(D.who[k])),accMiss:acc.filter(k=>!ok(D.piece[k])),yMiss:ys.filter(k=>!D.season.y[k]||!D.season.fab[D.season.y[k]]),
   fest:Object.keys(D.fest).filter(k=>!FEST[k]),festNeed:Object.values(D.fest).every(x=>x.need.length===2&&x.need.concat(x.ky).every(f=>D.fam[f])),
   rk:[D.needN,D.cut.phan,D.cut.danh,D.season.danh,D.season.th].every(a=>a.length===8&&a.every((v,i)=>!i||v>=a[i-1])),
   perSeason:[...BAL.dc.season.k].map((_,s)=>s).map(s=>[1,2,3,4,5,6,7,8].filter(P=>!wdPool('y',P,true).some(k=>dcYSeasons(k).includes(s))))}});
 ck('10 basic colour families',t.fam.length===10&&['hong','cam','do','vang','luc','lam','tim','trang','den','nau'].every(f=>t.fam.includes(f)),t.fam);
 ck('Foreman C palette: c01–c32 + m01–m52 each a [main, secondary] pair of families',!t.miss.length,t.miss);
 ck('every trâm / hoa điền has a colour pair',!t.accMiss.length,t.accMiss);ck('every robe has a fabric → seasons',!t.yMiss.length,t.yMiss);
 ck('festival codes only for real FEST keys, 2 colours each',!t.fest.length&&t.festNeed,t.fest);ck('rank ladders (law 5) never go down',t.rk);
 ck('robe pools: every phẩm from Tần has a robe for every season (lower ranks pay no season cost where a gap exists)',t.perSeason.every(L=>L.every(P=>P<=3)),t.perSeason);

 /* 2. robe colours = the painting */
 const r=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.out);v.fid='consort:c23';v.rank=2;v.queen=0;const a=dcRobe(v);v.rank=6;const b=dcRobe(v);v.rank=7;v.queen=1;const c=dcRobe(v);v.queen=0;v.rank=2;
  v.out=1;const d=dcRobe(v);v.out=0;S.pid='consort:c29';const me=dcRobe(S);return{a,b,c,d,me}});
 ck('robe = Foreman C pair (c23 đỏ + vàng)',r.a.join()==='do,vang',r.a);ck('t7 adds gold as secondary',r.b.join()==='do,vang',r.b);ck('t8 Hoàng hậu: gold first',r.c[0]==='vang',r.c);
 ck('lãnh cung: undyed linen (trắng)',r.d.join()==='trang,trang',r.d);ck('her robe from her identity (c29 lam + trắng)',r.me.join()==='lam,trang',r.me);

 /* 3. item rows (Tư trang) */
 const ir=await p.evaluate(()=>{const a=wdItemRowsE({k:'tram_maudon'}),y=wdItemRowsE({k:'nt_longchon'});return{a:a.replace(/<[^>]+>/g,' ').replace(/\s+/g,' '),y:y.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ')}});
 ck('trâm row "Màu" main + secondary',/Màu Đỏ (\(chính\)|chính) · Vàng (\(phụ\)|phụ)/.test(ir.a),ir.a.slice(-120));ck('robe rows: colour of her painting + "Hợp mùa Đông"',/Màu Lam (\(chính\)|chính) · Trắng (\(phụ\)|phụ)/.test(ir.y)&&/Hợp mùa Đông \(lông thú\)/.test(ir.y),ir.y.slice(-200));

 /* 4. season fit: her (cost by rank + frame) and an NPC (changes dress; forgets → same cost) */
 const s=await p.evaluate(()=>{S.month=5;S.tuan=1;Q.length=0;S.rank=4;const w=wdOf(S);w.y={k:'y_chimen',src:'cap',nvp:1};const off0=dcOffSeason(S);w.y={k:'y_haiduong',src:'cap',nvp:1};const off1=dcOffSeason(S);
  const d0=S.danh,t0=S.th;S.dcSw=null;dcWeek();const fr=Q.find(q=>q.evId==='dc:season');const lab=kitWearSlots(S,{size:'sm'}).indexOf('Trái mùa')>=0;
  const v=rivals.find(x=>x.alive&&!x.out&&!x.coop);wdOf(v).y={k:'y_vancam',from:'gift'};const keep=BAL.dc.season.npcMiss;BAL.dc.season.npcMiss=100;const vd0=v.danh||0;dcWeek();const vd1=v.danh||0;const vStill=dcOffSeason(v);
  BAL.dc.season.npcMiss=0;dcWeek();const vNow=wdOf(v).y.k,vOff=dcOffSeason(v),back=(v.inv||[]).some(e=>e.k==='y_vancam');BAL.dc.season.npcMiss=keep;
  return{off0,off1,dD:S.danh-d0,dT:S.th-t0,want:BAL.dc.season.danh[4],wantT:BAL.dc.season.th[4],fr:!!fr,lab,vD:vd1-vd0,vWant:dcSeasonRoad(v)?-BAL.dc.season.danh[dcRk(v)]:0,vTh:v.th,vStill,vNow,vOff,back}});
 ck('summer: lụa robe fits, brocade robe is off-season',!s.off0&&s.off1,s);ck('her cost = BAL.dc.season by rank (Danh, Thái hậu)',s.dD===-s.want&&s.dT===-s.wantT,s);
 ck('event frame "Áo trái mùa" (OD:L473)',s.fr);ck('wear-slot label "Trái mùa"',s.lab);
 ck('NPC who forgets pays the same rule (law 1)',s.vStill&&s.vD===s.vWant,s);ck('NPC changes into a robe of the season; her real fur robe goes to her chest (law 6c)',!s.vOff&&s.vNow!=='y_vancam'&&s.back,s);

 /* 5. festival gate queued BEFORE the festival events (real endTurn into Tết Nguyên đán) */
 const g=await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}S.month=12;S.tuan=2;S.rank=4;S.pid='consort:c29';S.dcF=null;const w=wdOf(S);w.y={k:'y_haiduong',src:'cap',nvp:1};w.tram={k:'tramngoc',src:'cap',nvp:1};
  const v=rivals.find(x=>x.alive&&!x.out&&!x.coop&&!x.confined);v.rel=60;v.inv=(v.inv||[]).filter(e=>e.k!=='tram_maudon');v.inv.push({k:'tram_maudon',from:'emp'});window.__L=v;
  S.suc=90;used=0;try{endTurn()}catch(e){return{err:String(e)}}const f=festToday();const iG=Q.findIndex(q=>q.evId==='dc:newyear'),iF=Q.findIndex(q=>q.ev==='fest'||/^fest:/.test(q.evId||'')||(q.must&&/^(Nguyên đán|Tết Nguyên đán)/.test(q.t||'')));
  const G=Q[iG]||{};const L=window.__L;return{dbg:[aff(L,S),L.alive,L.out,(L.inv||[]).filter(e=>WD_ITEMS[e.k]).map(e=>e.k),L.coop],f:f&&f.k,iG,iF,n:Q.length,t:G.t,opts:(G.opts||[]).map(o=>o.n),h:(G.h||'').replace(/<[^>]+>/g,' ')}});
 ck('gate built for Tết Nguyên đán on the real endTurn',g.t==='Y phục dự Tết Nguyên đán',g.t);ck('gate frame queued before the festival events',g.iG>=0&&(g.iF<0||g.iG<g.iF),g);
 ck('gate: strict festival, no needed colour → turned away, the rest road is always there',/không cho vào/.test(g.h)&&g.opts.some(o=>/Cáo lỗi/.test(o)),g.opts);

 /* 6. borrow → the piece moves; contest formula cut for her and an NPC (law 1); NPC turned away */
 const bw=await p.evaluate(()=>{S.month=1;S.tuan=0;const v=window.__L;v.rel=60;v.out=0;v.confined=0;v.alive=true;v.inv=(v.inv||[]).filter(e=>!(WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'));v.inv.push({k:'tram_maudon',from:'emp'});S.inv=S.inv.filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='tram'||e.dcPrev);window.__aff0=window.__aff0||aff;aff=(x,y)=>y===S&&x!==S?(x===v?60:-50):window.__aff0(x,y);const G=dcGateItem(Object.assign({k:'newyear'},FEST.newyear),dcStat(S,'newyear'));const o=G.opts.find(o=>/^Mượn Trâm hồng ngọc mẫu đơn/.test(o.n));if(!o)return{noBorrow:G.opts.map(o=>o.n),dbg:[aff(v,S),window.aff===aff,v.alive,v.out,v.coop,v.id,(v.inv||[]).filter(e=>e.k==='tram_maudon'),rivals.includes(v),dcLenders(S,['do','vang']).map(L=>L.v.name),v.name]};const u0=used,d0=S.danh;o.go();
  const st=dcStat(S,'newyear');const kd=Object.keys(SC7)[0];
  const x=rivals.find(y=>y.alive&&!y.out&&!y.coop&&y!==v&&!y.confined);x.fid='consort:c29';x.rank=4;x.queen=0;wdOf(x).tram={k:'tramngoc',src:'cap',nvp:1};x.inv=(x.inv||[]).filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='tram');
  S.month=1;S.tuan=0;const sx=dcStat(x,'newyear');const pres=present7(x);
  x.fid='consort:c09';wdOf(x).tram={k:'tram_maudon',src:'cap',nvp:1};S.month=1;S.tuan=0;const sy=dcStat(x,'newyear');const fy=SC7[kd].f(x),cut=dcCutPhan(x);
  aff=window.__aff0;return{held:wdOf(S).tram.k,bor:wdOf(S).tram.bor,lost:!(v.inv||[]).some(e=>e.k==='tram_maudon'),prev:S.inv.some(e=>e.k==='tramngoc'&&e.dcPrev),khac:used-u0,ch:S.dcF.ch,
   miss:st.miss,dD:S.danh-d0,wantD:-st.cutDanh,refused:sx.refused,pres,syMiss:sy.miss,cut,wantCut:sy.miss*BAL.dc.cut.phan[4],herCut:dcCutPhan(S),herWant:st.miss*BAL.dc.cut.phan[4]}});
 ck('borrowed trâm is worn, marked borrowed, gone from the lender (law 6c)',bw.held==='tram_maudon'&&bw.bor&&bw.lost&&bw.prev,bw);ck('borrow costs BAL.dc.bor.khac khắc',bw.khac===1,bw);
 ck('after borrowing: Tần needs 2 of đỏ+vàng → the rest is a cut (Danh)',bw.miss===1&&bw.dD<0&&bw.dD>=bw.wantD,bw);
 ck('NPC with no needed colour at a strict festival is turned away (not present in contests)',bw.refused&&bw.pres===false,bw);
 ck('shared contest formula: the same cut for an NPC and for her (BAL.dc.cut.phan × missing)',bw.cut===bw.wantCut&&bw.herCut===bw.herWant&&bw.cut>0,bw);

 /* 7. the piece goes back next tuần */
 const rt=await p.evaluate(()=>{const v=window.__L;S.turn++;dcReturn();return{mine:wdOf(S).tram&&wdOf(S).tram.k,back:(v.inv||[]).some(e=>e.k==='tram_maudon'&&!e.bor),noPrev:!S.inv.some(e=>e.dcPrev)}});
 ck('next tuần: borrowed trâm back to its owner, her own trâm back in her hair',rt.mine==='tramngoc'&&rt.back&&rt.noPrev,rt);

 /* 8. stay → the festival events are taken out, Sức gain, no new festival mini-event for her */
 const sy=await p.evaluate(()=>{const f=FEST.newyear;Q.length=0;S.dcF={key:`${S.year}-newyear`,ch:null};S.month=1;S.tuan=0;const G=dcGateItem(Object.assign({k:'newyear'},f),dcStat(S,'newyear'));Q.push(G);
  Q.push({t:'Tết Nguyên đán',ev:'fest',evId:'fest:newyear',opts:[]});Q.push({t:'Nguyên đán · Lễ',must:1,opts:[]});Q.push({t:'Khác',opts:[]});S.suc=40;const s0=S.suc;
  const o=G.opts.find(o=>/Cáo lỗi/.test(o.n));if(!o)return{noOpt:G.opts.map(o=>o.n)};o.go();return{left:Q.map(q=>q.t),dS:S.suc-s0,out:dcHerOut(),mk:fMake7('newyear')}});
 ck('stay: the festival events are gone, other events stay',sy.left&&sy.left.length===2&&sy.left.includes('Khác'),sy);ck('stay: Sức +BAL.dc.stay.suc, she is out, no festival mini-event',sy.dS>0&&sy.out&&sy.mk===null,sy);

 /* 9. two-way: an NPC asks to borrow hers */
 const ak=await p.evaluate(()=>{Q.length=0;S.dcF={key:'x',ch:'ok'};S.dcAk=null;S.dcNk=null;const v=rivals.find(x=>x.alive&&!x.out&&!x.coop&&!x.confined);v.rel=70;v.fid='consort:c09';v.rank=3;v.queen=0;wdOf(v).tram={k:'tramngoc',src:'cap',nvp:1};
  window.__aff0=window.__aff0||aff;aff=(x,y)=>(x===v&&y===S)?70:-50;S.inv.push({k:'thoa_vang',from:'emp'});dcWeek();aff=window.__aff0;const r0=v.rel;const A=Q.find(q=>q.evId==='dc:ask');if(!A)return{none:Q.map(q=>q.t)};
  const rb=v.rel;A.opts[0].go();const lent=wdOf(v).tram&&wdOf(v).tram.k;const gone=!S.inv.some(e=>e.k==='thoa_vang');const rel=v.rel-rb;S.turn++;dcReturn();
  return{t:A.t,ox:A.opts.map(o=>o.x),lent,gone,rel,back:S.inv.some(e=>e.k==='thoa_vang'&&!e.bor),vt:wdOf(v).tram&&wdOf(v).tram.k}});
 ck('NPC asks to borrow her trâm; lending moves it, thiện cảm +BAL.dc.bor.thanks',ak.lent==='thoa_vang'&&ak.gone&&ak.rel>0,ak);ck('lent trâm comes back next tuần, the NPC wears her own piece again',ak.back&&ak.vt&&ak.vt!=='thoa_vang',ak);
 ck('r2: the NPC ask frame names what each answer costs / gives (lend: tốn + thiện cảm; refuse: keeps it)',ak.ox&&/tốn:/.test(ak.ox[0])&&/thiện cảm/.test(ak.ox[0])&&/thành:/.test(ak.ox[1]),ak.ox);

 /* 10. calendar popover, old save, round trip */
 const z=await p.evaluate(()=>{const h=mcPopHTML('newyear',0)||'';const z0=JSON.parse(JSON.stringify({d:1}));let ok=true,err='';
  try{const raw=ser();const str=typeof raw==='string';const o=JSON.parse(str?raw:JSON.stringify(raw));delete o.dcF;delete o.dcSw;delete o.dcNk;delete o.dcAk;deser(str?JSON.stringify(o):o);dcTurn();dcWeek()}catch(e){ok=false;err=String(e)}
  let rt=true;try{wdOf(S).tram=Object.assign({k:'tram_hong'},{bor:{from:'id:1',due:S.turn}});deser(ser());rt=!!(wdOf(S).tram&&wdOf(S).tram.bor)}catch(e){rt=false;err=String(e)}
  return{pop:h.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(-140),ok,rt,err}});
 ck('calendar popover: "Y phục: Đỏ, Vàng · … chặn ngoài cửa" (no taboo line while kyOn 0)',/Y phục: Đỏ ?, Vàng/.test(z.pop)&&/chặn ngoài cửa/.test(z.pop)&&!/kiêng/.test(z.pop),z.pop);ck('old save without dresscode fields loads and plays',z.ok,z.err);ck('save round trip keeps a borrowed piece',z.rt,z.err);


 /* 12. review r1 fixes: season road + first-tuần grace + NPC Thái hậu part; taboo off; equal-value gate; NPC festival roads; co-op guest; loan guards; contest rows; wording */
 const r1=await p.evaluate(()=>{const o={};Q.length=0;window.__aff0=window.__aff0||aff;
  /* fix 5: Quý nhân (P3) in winter has no robe of her phẩm → no cost */
  S.rank=2;S.month=11;S.tuan=1;S.inv=S.inv.filter(e=>!(WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='y'));const w=wdOf(S);w.y={k:'y_lan',src:'cap',nvp:1};S.dcSw=null;const d0=S.danh;dcWeek();o.noRoad={off:dcOffSeason(S),road:dcSeasonRoad(S),dD:S.danh-d0,frame:Q.some(q=>/^dc:season/.test(q.evId||''))};
  /* fix 6: first tuần of a season = warning, no cost */
  Q.length=0;S.rank=4;S.month=4;S.tuan=0;w.y={k:'y_haiduong',src:'cap',nvp:1};S.dcSw=null;const d1=S.danh;dcWeek();o.first={dD:S.danh-d1,warn:Q.some(q=>q.evId==='dc:season0'),cost:Q.some(q=>q.evId==='dc:season')};
  /* fix 7: NPC pays the Thái hậu part too */
  S.month=5;S.tuan=1;Q.length=0;const v=rivals.find(x=>x.alive&&!x.out&&!x.coop&&!x.confined);v.rank=4;v.queen=0;wdOf(v).y={k:'y_vancam',src:'gift'};const keep=BAL.dc.season.npcMiss;BAL.dc.season.npcMiss=100;const th0=v.th||0;dcWeek();BAL.dc.season.npcMiss=keep;
  o.npcTh={dTh:(v.th||0)-th0,want:-BAL.dc.season.th[4]};
  /* fix 4: taboo off while the robe is her painting */
  S.pid='consort:c32';S.rank=4;o.taboo=dcStat(S,'newyear').taboo;
  /* fix 2 + 3: own trâm of a colour → no borrow for that colour; stay always offered */
  S.month=1;S.tuan=0;S.pid='consort:c29';w.tram={k:'tramngoc',src:'cap',nvp:1};S.inv=S.inv.filter(e=>!(WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'));S.inv.push({k:'tram_maudon',from:'emp'});
  aff=(x,y)=>y===S?60:window.__aff0(x,y);for(const y of rivals){if(y.alive&&!y.out){y.inv=y.inv||[];y.inv.push({k:'tram_maudon',from:'emp'})}}
  const f=Object.assign({k:'newyear'},FEST.newyear);const G=dcGateItem(f,dcStat(S,'newyear'));aff=window.__aff0;
  o.gate={opts:G.opts.map(x=>x.n+' | '+x.x),borDo:G.opts.some(x=>/^Mượn .*\(Đỏ\)/.test(x.n)),ownDo:G.opts.some(x=>/^Cài Trâm hồng ngọc mẫu đơn/.test(x.n)),stay:G.opts.some(x=>/Cáo lỗi/.test(x.n)),road:G.opts.length};
  /* fix 1: an NPC dresses from her own chest, else borrows from a consort who likes her (law 1) */
  const R=rivals.filter(x=>x.alive&&!x.out&&!x.coop&&!x.confined);const a=R[0],b=R[1],c=R[2];
  for(const x of [a,b,c]){x.fid='consort:c29';x.rank=4;x.queen=0;wdOf(x).tram={k:'tramngoc',src:'cap',nvp:1};x.inv=(x.inv||[]).filter(e=>!(WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'))}
  a.inv.push({k:'thoa_vang',from:'emp'});c.inv.push({k:'tram_maudon',from:'emp'});
  aff=(x,y)=>(x===c&&y===b)?60:(y===S?-50:-50);const m0=dcStat(a,'newyear').miss,mb0=dcStat(b,'newyear').miss;dcNpcFest(a,'newyear');dcNpcFest(b,'newyear');aff=window.__aff0;
  o.npc={aOwn:wdOf(a).tram.k,aMiss:[m0,dcStat(a,'newyear').miss],bBor:wdOf(b).tram.k,bFrom:(wdOf(b).tram.bor||{}).from,cLost:!c.inv.some(e=>e.k==='tram_maudon'),bMiss:[mb0,dcStat(b,'newyear').miss]};
  S.turn++;const t0=S.turn;dcReturn();o.npcBack={c:c.inv.some(e=>e.k==='tram_maudon'&&!e.bor),b:wdOf(b).tram.k};
  /* fix 9: worldOn false WITHOUT the request path (no room / thin room): no NPC lending, no NPC ask; the guest of an ordinary room borrows through jcoopask (dev/test/coop-dresscode.js) */
  const wo=window.worldOn;window.worldOn=()=>false;try{worldOn=window.worldOn}catch(e){}aff=(x,y)=>60;o.guest={lenders:dcLenders(S,['do','vang']).length};S.dcAk=null;Q.length=0;dcWeek();o.guest.ask=Q.some(q=>q.evId==='dc:ask');aff=window.__aff0;window.worldOn=wo;try{worldOn=wo}catch(e){}
  /* fix 8: a borrowed piece cannot be sold / pawned / given; the item detail shows the loan */
  S.inv.push({k:'tram_hong',from:'emp',bor:{from:'id:'+a.id,due:S.turn}});const ix=S.inv.length-1;o.guard={sell:wdSell(S,ix),pawn:wdPawn(S,ix),give:giveTo(S,a,ix),still:!!(S.inv[ix]&&S.inv[ix].bor),acts:wdActBtns(S.inv[ix],{i:ix}).length,
   row:/Mượn/.test(kitItemDetailRows({e:S.inv[ix]})||kitItemDetailRows(S.inv[ix])||'')};S.inv.splice(ix,1);
  /* fix 11: contest rows name the dress cut */
  S.month=1;S.tuan=0;const kd=Object.keys(SC7)[0];a.fid='consort:c29';wdOf(a).tram={k:'tramngoc',src:'cap',nvp:1};o.det=det7(kd,a);o.cut=dcCutPhan(a);
  /* fix 10: no doubled head word */
  const T=[];for(const k of Object.keys(BAL.dc.fest)){const ff=Object.assign({k},FEST[k]);T.push(...dcFacts(dcStat(S,k),ff))}o.dbl=T.filter(x=>/Lễ (Lễ|Tết|Tiết|Đêm)/.test(x));
  return o});
 ck('fix 5: no robe of her phẩm for the season → no season cost',r1.noRoad.off&&!r1.noRoad.road&&r1.noRoad.dD===0&&!r1.noRoad.frame,r1.noRoad);
 ck('fix 6: first tuần of a season = warning frame, no cost',r1.first.dD===0&&r1.first.warn&&!r1.first.cost,r1.first);
 ck('fix 7: NPC season cost includes the Thái hậu part',r1.npcTh.dTh===r1.npcTh.want,r1.npcTh);
 ck('fix 4: taboo does not count against the painted robe (kyOn 0)',r1.taboo===false,r1.taboo);
 ck('fix 2: borrow is never offered for a colour her own chest covers (no dominated road)',r1.gate.ownDo&&!r1.gate.borDo,r1.gate.opts);
 ck('fix 3: every gate offers more than one road, stay always there, roads name what they give',r1.gate.stay&&r1.gate.road>=2&&r1.gate.opts.every(x=>/thành:/.test(x)),r1.gate.opts);
 ck('r2: borrow names the lender thiện cảm it spends; buy names the piece it keeps',r1.gate.opts.filter(x=>/^Mượn/.test(x)).every(x=>/kèm: thiện cảm/.test(x))&&r1.gate.opts.filter(x=>/^Sai người mua/.test(x)).every(x=>/giữ lại trong rương/.test(x)),r1.gate.opts);
 ck('fix 1: NPC puts on her own trâm of the missing colour',r1.npc.aOwn==='thoa_vang'&&r1.npc.aMiss[1]<r1.npc.aMiss[0],r1.npc);
 ck('fix 1: NPC borrows from a consort who likes her; the piece moves and comes back',r1.npc.bBor==='tram_maudon'&&r1.npc.cLost&&r1.npc.bMiss[1]<r1.npc.bMiss[0]&&r1.npcBack.c&&r1.npcBack.b==='tramngoc',[r1.npc,r1.npcBack]);
 ck('fix 9: no world, no request path: no NPC lending, no NPC ask',r1.guest.lenders===0&&!r1.guest.ask,r1.guest);
 ck('fix 8: a borrowed piece cannot be sold, pawned or given; no acts; the detail shows the loan',!r1.guard.sell&&!r1.guard.pawn&&!r1.guard.give&&r1.guard.still&&r1.guard.acts===0&&r1.guard.row,r1.guard);
 ck('fix 11: contest rows show the dress cut',r1.cut>0&&new RegExp('y phục −'+r1.cut).test(r1.det),[r1.det,r1.cut]);
 ck('fix 10: no doubled head word (Lễ Lễ / Lễ Tết …)',!r1.dbl.length,r1.dbl);

 const by=await p.evaluate(()=>{window.__aff0=window.__aff0||aff;const v=rivals.find(x=>x.alive&&!x.out&&!x.coop&&!x.confined);v.fid='consort:c29';v.rank=4;v.queen=0;wdOf(v).tram={k:'tramngoc',src:'cap',nvp:1};
  v.inv=(v.inv||[]).filter(e=>!(WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'));v.bac=500;aff=()=>-50;const b0=v.bac;dcNpcFest(v,'newyear');aff=window.__aff0;const k=wdOf(v).tram.k;
  S.pid='consort:c29';S.rank=4;S.bac=500;wdOf(S).tram={k:'tramngoc',src:'cap',nvp:1};S.inv=S.inv.filter(e=>!(WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'));aff=()=>-50;
  const G=dcGateItem(Object.assign({k:'newyear'},FEST.newyear),dcStat(S,'newyear'));aff=window.__aff0;const o=G.opts.find(x=>/^Sai người mua/.test(x.n));const sb=S.bac;if(o)o.go();
  return{npcK:k,npcPaid:b0-v.bac,price:(WD_ITEMS[k]||{}).pr,fam:(dcPiece(k)||[])[0],her:!!o,herPaid:sb-S.bac,herK:wdOf(S).tram.k,opts:G.opts.map(x=>x.n)}});
 ck('buy road, same for her and an NPC: the cheapest trâm of a missing colour at her phẩm from Nội vụ phủ, paid in Bạc',by.npcPaid===by.price&&['do','vang'].includes(by.fam)&&by.her&&by.herPaid>0&&by.herK!=='tramngoc',by);

 /* 11. wording (VANPHONG): no %, no "điểm" in the player text of this feature */
 const w=await p.evaluate(()=>{const T=[];const f=Object.assign({k:'vantho'},FEST.vantho);S.rank=4;T.push(...dcFacts(dcStat(S,'vantho'),f));T.push(dcGateItem(f,dcStat(S,'vantho')).opts.map(o=>o.n+' '+o.x).join(' '));
  T.push(wdItemRowsE({k:'y_saxanh'}).replace(/<[^>]+>/g,' '));return T.filter(s=>/%|điểm|chỉ số|OK\b/i.test(s))});
 ck('wording: no %, điểm, chỉ số',!w.length,w);
 ck('no page errors',!errs.length,errs.slice(0,4));
 await b.close();console.log(fail?`dresscode: ${fail} FAIL`:'dresscode: ALL PASS');process.exit(fail?1:0)})();
