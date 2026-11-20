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
 ck('trâm row "Màu" main + secondary',/Màu Đỏ \(chính\) · Vàng \(phụ\)/.test(ir.a),ir.a.slice(-120));ck('robe rows: colour of her painting + "Hợp mùa Đông"',/Màu Lam \(chính\) · Trắng \(phụ\)/.test(ir.y)&&/Hợp mùa Đông \(lông thú\)/.test(ir.y),ir.y.slice(-200));

 /* 4. season fit: her (cost by rank + frame) and an NPC (changes dress; forgets → same cost) */
 const s=await p.evaluate(()=>{S.month=5;Q.length=0;S.rank=4;const w=wdOf(S);w.y={k:'y_chimen',src:'cap',nvp:1};const off0=dcOffSeason(S);w.y={k:'y_haiduong',src:'cap',nvp:1};const off1=dcOffSeason(S);
  const d0=S.danh,t0=S.th;S.dcSw=null;dcWeek();const fr=Q.find(q=>q.evId==='dc:season');const lab=kitWearSlots(S,{size:'sm'}).indexOf('Trái mùa')>=0;
  const v=rivals.find(x=>x.alive&&!x.out&&!x.coop);wdOf(v).y={k:'y_vancam',from:'gift'};const keep=BAL.dc.season.npcMiss;BAL.dc.season.npcMiss=100;const vd0=v.danh||0;dcWeek();const vd1=v.danh||0;const vStill=dcOffSeason(v);
  BAL.dc.season.npcMiss=0;dcWeek();const vNow=wdOf(v).y.k,vOff=dcOffSeason(v),back=(v.inv||[]).some(e=>e.k==='y_vancam');BAL.dc.season.npcMiss=keep;
  return{off0,off1,dD:S.danh-d0,dT:S.th-t0,want:BAL.dc.season.danh[4],wantT:BAL.dc.season.th[4],fr:!!fr,lab,vD:vd1-vd0,vWant:-BAL.dc.season.danh[dcRk(v)],vStill,vNow,vOff,back}});
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
  const sx=dcStat(x,'newyear');const pres=present7(x);
  x.fid='consort:c09';wdOf(x).tram={k:'tram_maudon',src:'cap',nvp:1};const sy=dcStat(x,'newyear');const fy=SC7[kd].f(x),cut=dcCutPhan(x);
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
  aff=(x,y)=>y===S&&x!==S?(x===v?70:-50):window.__aff0(x,y);S.inv.push({k:'thoa_vang',from:'emp'});dcWeek();aff=window.__aff0;const r0=v.rel;const A=Q.find(q=>q.evId==='dc:ask');if(!A)return{none:Q.map(q=>q.t)};
  const rb=v.rel;A.opts[0].go();const lent=wdOf(v).tram&&wdOf(v).tram.k;const gone=!S.inv.some(e=>e.k==='thoa_vang');const rel=v.rel-rb;S.turn++;dcReturn();
  return{t:A.t,lent,gone,rel,back:S.inv.some(e=>e.k==='thoa_vang'&&!e.bor),vt:wdOf(v).tram&&wdOf(v).tram.k}});
 ck('NPC asks to borrow her trâm; lending moves it, thiện cảm +BAL.dc.bor.thanks',ak.lent==='thoa_vang'&&ak.gone&&ak.rel>0,ak);ck('lent trâm comes back next tuần, the NPC wears her own again',ak.back&&ak.vt==='tramngoc',ak);

 /* 10. calendar popover, old save, round trip */
 const z=await p.evaluate(()=>{const h=mcPopHTML('newyear',0)||'';const z0=JSON.parse(JSON.stringify({d:1}));let ok=true,err='';
  try{const raw=ser();const str=typeof raw==='string';const o=JSON.parse(str?raw:JSON.stringify(raw));delete o.dcF;delete o.dcSw;delete o.dcNk;delete o.dcAk;deser(str?JSON.stringify(o):o);dcTurn();dcWeek()}catch(e){ok=false;err=String(e)}
  let rt=true;try{wdOf(S).tram=Object.assign({k:'tram_hong'},{bor:{from:'id:1',due:S.turn}});deser(ser());rt=!!(wdOf(S).tram&&wdOf(S).tram.bor)}catch(e){rt=false;err=String(e)}
  return{pop:h.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(-140),ok,rt,err}});
 ck('calendar popover: "Y phục: Đỏ, Vàng · kiêng áo Trắng, Đen · … chặn ngoài cửa"',/Y phục: Đỏ, Vàng · kiêng áo Trắng, Đen/.test(z.pop),z.pop);ck('old save without dresscode fields loads and plays',z.ok,z.err);ck('save round trip keeps a borrowed piece',z.rt,z.err);

 /* 11. wording (VANPHONG): no %, no "điểm" in the player text of this feature */
 const w=await p.evaluate(()=>{const T=[];const f=Object.assign({k:'vantho'},FEST.vantho);S.rank=4;T.push(...dcFacts(dcStat(S,'vantho'),f));T.push(dcGateItem(f,dcStat(S,'vantho')).opts.map(o=>o.n+' '+o.x).join(' '));
  T.push(wdItemRowsE({k:'y_saxanh'}).replace(/<[^>]+>/g,' '));return T.filter(s=>/%|điểm|chỉ số|OK\b/i.test(s))});
 ck('wording: no %, điểm, chỉ số',!w.length,w);
 ck('no page errors',!errs.length,errs.slice(0,4));
 await b.close();console.log(fail?`dresscode: ${fail} FAIL`:'dresscode: ALL PASS');process.exit(fail?1:0)})();
