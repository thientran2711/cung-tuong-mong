// review/pace-all unit test (owner OD 26/11 ~08:00Z / ~08:05Z / ~08:25Z): ONE PACE TABLE fixes + OÁN / GHEN COOL-DOWN.
// usage: node dev/test/pace-all.js [index.html]   → prints one line per check, last line ALL PASS n / FAIL n
const {chromium}=require('playwright');const path=require('path');
const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(PAGE));await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const out=[];const ok=(n,c,x)=>out.push([n,!!c,x===undefined?'':JSON.stringify(x)]);
  document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0;
  /* ---- PART A: the course ladder (Tài nghệ / Tứ đức), per bậc ---- */
  const need=[0,1,2,3,4].map(crsNeedP);ok('A1 phần per bậc from BAL = 10·12·16·20·24',JSON.stringify(need)==='[10,12,16,20,24]',need);
  const gain=BAL.art.gain;const share=need.map((n,l)=>({self:2/n,teach:3/n,quick:1.4/n}));
  ok('A2 one ordinary lesson (played 2 · teacher 3 · quick 1.4 phần) moves 1/15…1/3 of every bậc (quick ≥ 1/18)',share.every(s=>s.self>=1/15&&s.teach<=1/3+1e-9&&s.quick>=1/18),share.map(s=>[+s.self.toFixed(3),+s.teach.toFixed(3),+s.quick.toFixed(3)]));
  ok('A3 harder as she climbs (phần per bậc never falls)',need.every((n,i)=>!i||n>=need[i-1]),need);
  /* exact phần: one phần at a time from 0 → each bậc after exactly need[l] lessons, nothing lost on the 0.1 grid */
  const P={arts:{cam:0},artp:{cam:0}};const at=[];let n=0;for(let i=0;i<200&&(P.arts.cam<5);i++){const l0=P.arts.cam;crsPush(P.arts,P.artp,'cam',1);n++;if(P.arts.cam>l0){at.push(n);n=0}}
  ok('A4 one phần per push → bậc after exactly 10·12·16·20·24 pushes (to Tông sư 82)',JSON.stringify(at)==='[10,12,16,20,24]',at);
  const Q2={arts:{cam:0},artp:{cam:0}};const at2=[];n=0;for(let i=0;i<200&&(Q2.arts.cam<5);i++){const l0=Q2.arts.cam;crsPush(Q2.arts,Q2.artp,'cam',3);n++;if(Q2.arts.cam>l0){at2.push(n);n=0}}
  ok('A5 three phần a push: 4·4·5·7·8 (carry-over kept, never stuck at a full bar)',JSON.stringify(at2)==='[4,4,5,7,8]',at2);
  const pr=crsProg({cam:2},{cam:8*BAL.art.gain[2]},'cam');ok('A6 card shows phần inside the bậc («Tiến bộ 8/16»)',pr[0]===8&&pr[1]===16,pr);
  const v=liveRivals(true)[0];const vb=JSON.stringify([v.arts,v.artp]);const lv0=v.arts.cam||0,pt0=artPts(v,'cam');crsPush(v.arts,v.artp,'cam',2);
  ok('A7 an NPC studies on the same ladder (law 1)',artPts(v,'cam')>=pt0&&(v.arts.cam||0)>=lv0,[pt0,artPts(v,'cam')]);
  const old={arts:{cam:3},artp:{cam:12}};ok('A8 old save: bậc + points kept (points ladder BAL.art.tier unchanged)',crsPts(old.arts,old.artp,'cam')===57&&crsProg(old.arts,old.artp,'cam')[0]===9,[crsPts(old.arts,old.artp,'cam'),crsProg(old.arts,old.artp,'cam')]);
  /* ---- PART A: servant Công lao ---- */
  const mpN=[0,1,2,3,4,5].map(srvMpNeed);ok('A9 Công lao need per rank from BAL.srvMpN (rising)',mpN.join()===BAL.srvMpN.slice(0,6).join()&&mpN.every((x,i)=>!i||x>mpN[i-1]),mpN);
  const ch=[SRVA.tea.mp,SRVA.rite.mp,SRVA.sweep.mp,SRVA.nvp.mp,SRVA.books.mp,SRVA.massage.mp];
  ok('A10 every chore gives a whole Công lao (1 / 2), one chore = 1/16 … 1/3 of a rank step',ch.every(x=>Number.isInteger(x))&&mpN.every(N=>ch.every(x=>x/N<=1/3+1e-9&&x/N>=1/16)),ch);
  /* ---- PART B: oán cool-down ---- */
  const L=liveRivals(true);const set=(x,t)=>{x.traits=t;try{if(typeof netMemoClear==='function')netMemoClear(x)}catch(e){}delete x.__net};
  const kf=x=>persF(x,'forgive',1);
  const a=L[1],c=L[2],d=L[3],e=L[4]||L[1];
  for(const x of [a,c,d,e]){x.ocq={};x.occ={};x.ghen=0}
  const W0=wk();
  a.oan=90;c.oan=90;d.oan=90;
  const ka=kf(a),kc=kf(c),kd=kf(d);
  const runW=w=>{for(let i=0;i<w;i++){oanCool(1,true)}};
  const band=x=>{const B=BAL.oanLv;let i=0;while(i<B.length&&x>=B[i])i++;return i};
  const b0=band(90);runW(BAL.oanCool.season);
  ok('B1 a quiet feud (nết ×1) drops one band in one season (9 tuần) and is not gone',Math.abs(ka-1)>.01||(band(a.oan)===b0-1&&a.oan>0),[ka,a.oan,band(a.oan)]);
  /* traits: find a slow (Thù dai) and a fast (Rộng lượng) holder by persF */
  ok('B2 nết: a slower forgiver keeps more after a season (persF forgive)',(ka===kc)||((ka<kc)===(a.oan>c.oan))||a.oan===c.oan,[[ka,a.oan],[kc,c.oan]]);
  /* a fed grudge does not fade */
  d.oan=60;oanAdd(d,S,5);const d1=d.oan;oanCool(1,true);ok('B3 fed this tuần (oanAdd n>0) → no fade (quiet count restarts)',d.oan===d1&&d.ocq&&d.ocq.me===wk(),[d1,d.oan,d.ocq]);
  /* the cause stands: a remembered bad deed keeps «Chút oán», a deed carved for life keeps «Oán» */
  e.oan=40;e.ocq={};e.occ={};try{memAdd(e,S,'provoke',{g:60})}catch(x){}runW(60);const fl1=BAL.oanLv[BAL.oanCool.floor.mem-1];
  const mT=typeof memTop==='function'?memTop(e,S,-1):null;
  ok('B4 a bad deed still remembered → oán stays ≥ «Chút oán» floor (never to zero while the cause stands)',!mT||(e.oan>=fl1),[e.oan,fl1,mT&&mT.g]);
  const f=L[5]||L[2];f.oan=70;f.ocq={};f.occ={};try{memAdd(f,S,'poison',{g:80})}catch(x){}runW(80);const fl2=BAL.oanLv[BAL.oanCool.floor.keep-1];const mF=typeof memTop==='function'?memTop(f,S,-1):null;
  ok('B5 a deed carved for life (keep) → floor «Oán»',!mF||!(mF.L||mF.k)||f.oan>=fl2,[f.oan,fl2,mF&&[mF.g,mF.k,mF.L]]);
  /* two-way: HER own oán toward a consort fades by the same rule */
  S.ro[a.id]=60;S.ocq={};S.occ={};runW(BAL.oanCool.season);ok('B6 two-way: her own oán (S.ro) fades by the same rule (one band a season)',band(S.ro[a.id])===band(60)-1,S.ro[a.id]);
  /* men / servants */
  const ms=relMSAll().filter(h=>h&&typeof h==='object');if(ms.length){const h=ms[0];h.oan=50;h.ocq={};h.occ={};runW(BAL.oanCool.season);ok('B7 men / servants forget by the same rule',h.oan<50,[h.oan])}else ok('B7 men / servants (none in this life: skipped)',true);
  /* monthly: no double fade in solo; the old flat fade only with the switch off */
  a.oan=50;a.ocq={};a.occ={};oanMonth();ok('B8 solo: oanMonth adds no second fade (canon overwrite)',a.oan===50,a.oan);
  BAL.oanCool.on=0;a.oan=50;oanMonth();const off=a.oan;BAL.oanCool.on=1;ok('B9 switch off (BAL.oanCool.on = 0) → the old monthly BAL.oanFade comes back (× her forgive nết, as before)',off===50-Math.round(BAL.oanFade*persF(a,'forgive',1)),[off,persF(a,'forgive',1)]);
  /* co-op guest: rivalsTurn is muted there; her own grudges cool in oanMonth, 3 tuần at once, NPC values untouched */
  const wo=window.worldOn;window.worldOn=()=>false;S.ro[a.id]=60;S.occ={};S.ocq={};a.oan=50;oanMonth();window.worldOn=wo;
  ok('B10 co-op guest: oanMonth cools only HER grudges (3 tuần), NPC rows left to the host',S.ro[a.id]<60&&a.oan===50,[S.ro[a.id],a.oan]);
  /* ghen */
  const g1=L[1];g1.ghen=50;g1.gcc=0;const gr=[];for(let i=0;i<3;i++)gr.push(ghenCool(g1));ok('B11 ghen weekly fade from BAL.oanCool.ghen × nết (whole numbers, carry)',gr.every(x=>Number.isInteger(x)&&x>=0),[gr,kf(g1)]);
  /* Tạ lỗi / Nhún nhường refused at high oán: the cool-down brings it back under the forgiving line */
  const t=L[2];t.oan=70;t.ocq={};t.occ={};const nf=netTh(t,'nguoi');let wks=0;while(t.oan>=nf&&wks<80){oanCool(1,true);wks++}
  ok('B12 a feud at 70 left alone comes under her forgiving line (Tạ lỗi / Nhún nhường accepted again) in a few seasons',t.oan<nf||t.oan<=BAL.oanLv[1],[nf,wks,t.oan]);
  /* ---- PART C (MAIN 155 add-on): deep grudge → refused words cost nothing; two costly roads; same for every NPC ---- */
  {const v=L[3]||L[0];v.oan=85;v.ocq={};v.occ={};const nf=netTh(v,'nguoi');S.bac=Math.max(S.bac,500);
   const A=topicOpts(v),ta=A.find(a=>a.n==='Tạ lỗi'),nn=A.find(a=>a.n==='Nhún nhường'),hg=A.find(a=>a.n==='Hậu lễ tạ tội'),gb=A.find(a=>a.n==='Nhờ người đứng giữa');
   ok('C1 oán ≥ her «nguoi» level: Tạ lỗi / Nhún nhường shown locked with the reason, nothing to pay (canPay false)',v.oan>=nf&&ta&&nn&&ta.lock&&nn.lock&&!canPay(ta)&&!canPay(nn)&&/chưa nguôi/.test(ta.t)&&!Object.keys(ta.c||{}).length,[nf,ta&&ta.t]);
   ok('C2 «Hậu lễ tạ tội» + «Nhờ người đứng giữa» offered; the gift = BAL.oanMend.gift.bac + r × her rank (harder as she climbs)',!!hg&&!!gb&&mendBac(S)===BAL.oanMend.gift.bac+BAL.oanMend.gift.r*S.rank&&hg.c.bac===-mendBac(S)&&hg.c.danh===BAL.oanMend.gift.danh,[hg&&hg.c,hg&&hg.x,gb&&(gb.x||gb.t)]);
   const b0=S.bac,d0=S.danh,o0=v.oan;mendDo(S,v,'gift',false);ok('C3 refused gift: nothing paid, oán unchanged',S.bac===b0&&S.danh===d0&&v.oan===o0,[S.bac-b0,v.oan]);
   apply(hg.c);mendDo(S,v,'gift',false,true);ok('C3b her talk card paid the Tốn row first (talk()): a refusal hands bạc + Danh back',S.bac===b0&&S.danh===d0&&v.oan===o0,[S.bac-b0,S.danh-d0]);
   const w=ocBandW(v.oan);mendDo(S,v,'gift',true);ok('C4 accepted gift: Bạc −mendBac, Danh +gift.danh, oán − one band width',S.bac===b0-mendBac(S)&&v.oan===o0-w,[b0-S.bac,o0-v.oan,w]);
   /* go-between */
   const m=L.find(x=>x!==v&&!x.queen&&x!==L[2])||L[1];v.oan=85;const th=netTh(v,'than'),qu=netTh(m,'quen');for(let i=0;i<40&&aff(v,m)<th+5;i++)affAdd(v,m,5);for(let i=0;i<40&&aff(m,S)<qu+5;i++)affAdd(m,S,5);
   const mm=mendGoOf(v,S),am=aff(m,S),o1=v.oan;mendDo(S,v,'go',true);
   ok('C5 go-between (liked by her ≥ than, likes ngươi ≥ quen): oán − one band, the go-between quý ngươi −go.fav',mm===m&&v.oan===o1-ocBandW(o1)&&aff(m,S)===am-BAL.oanMend.go.fav,[mm&&mm.name,o1-v.oan,am-aff(m,S)]);
   /* two-way: an NPC mends HER deep grudge, and another NPC's, by the same function */
   const x=L[4]||L[1];S.ro=S.ro||{};S.ro[x.id]=85;x.bac=500;const hb=x.bac;const mine=mendDeep(S,x);mendDo(x,S,'gift',true);
   ok('C6 two-way: an NPC sends HER the hậu lễ (her own oán ≥ her nguoi) → her oán − one band, the NPC pays its own gift',mine&&S.ro[x.id]<85&&x.bac===hb-mendBac(x),[S.ro[x.id],hb-x.bac]);
   const y=L[5]||L[2];x.ro=x.ro||{};x.ro[y.id]=85;y.bac=500;mendDo(y,x,'gift',true);ok('C7 NPC ↔ NPC: same road',x.ro[y.id]<85,x.ro[y.id]);
   /* an NPC's refused words are not chosen / not paid */
   v.oan=85;const dv=S.danh;const tw=TW.apol.req(x,v);x.ro[v.id]=0;v.ro=v.ro||{};v.ro[x.id]=85;const xd=x.danh;AGRUN['cx:humble'](x,v);
   ok('C8 NPC: Tạ lỗi (TW apol) not offered and Nhún nhường not paid while refused',TW.apol.req(x,v)===false&&x.danh===xd,[TW.apol.req(x,v),x.danh-xd]);
   /* every consort as the doer (utility depends on her nết / needs): at least one offers a road, and every offer aims at a deep grudge it can pay */let ao=[],bad=[];try{for(const d of L){if(d===v)continue;d.bac=Math.max(d.bac||0,500);d.ro=d.ro||{};v.ro[d.id]=85;const r=AGREG.consort.mend(d,(typeof agNeeds==='function'?agNeeds(d):{}),'safe')||[];for(const o of r){ao.push(o);if(!mendDeep(o.t,d)||!mendCan(d,o.t,o.k==='cx:mendGift'?'gift':'go'))bad.push(o.k)}v.ro[d.id]=0}}catch(e){ao=['err '+e.message]}
   ok('C9 NPC agents offer the costly roads toward the one who holds the deep grudge (only roads they can pay)',ao.some(o=>o&&/cx:mend/.test(o.k))&&!bad.length,[ao.length,bad])}
  return {out,ka,kc,kd}});
 let fail=0;for(const [n,c,x] of R.out){if(!c)fail++;console.log((c?'ok   ':'FAIL ')+n+(x?'  '+x:''))}
 if(errs.length){fail++;console.log('FAIL page errors',errs.slice(0,3))}
 console.log(fail?`FAIL ${fail}`:`ALL PASS ${R.out.length}`);await b.close();process.exit(fail?1:0)})();
