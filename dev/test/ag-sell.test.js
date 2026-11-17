/* AG-ALL-2g checks — INFO SELLERS (jagknow tail; owner OD 17/11 ~16:50Z (2); report dev/handover/reports/ag-all.md §22).
   1 who sells: a real servant of another palace, by nết (Ham lợi yes, none of the BAL.ag.sell.q nết no) and only when her lòng to her own master is low
   2 what: only TRUE news worth ≥ BAL.ag.sell.min that she does not know yet (no trivia: where / Sủng / trait never sold); the seller only sells what
     she can know (her own master's secrets, a scheme deed she stood at or her master does)
   3 price scales with worth (BAL.ag.sell.price × worth / 100); buying: bạc paid, khắc spent, the fact is in Đã biết (intel) / the deed in TIN BÁO, named seller
   4 refusing: she does not learn it, and no other path brings that same news this khắc (knFor / j78facts filtered)
   5 NPC buyer: same pick, same price; buys by worth vs price; a bought deed is known by knFor, a proof fact gives evidence; j67 'Mua tin' uses the engine
   6 old save without S.tb.sl / no; no page / agent errors over a bot run
   usage: node dev/test/ag-sell.test.js [dev/index.html] [days] → exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const DAYS=+process.argv[3]||4;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* helpers in page */
 await p.evaluate(()=>{window.__setNet=(s,ld)=>{netOf(s);s.net=s.net.slice();s.net[1]=ld;KN.m=null};
  window.__rig=()=>{const R=liveRivals(true).filter(v=>v.alive&&!v.out&&(v.staff||[]).length>=1);const v=R[0];const s=v.staff[0];
   for(const x of allServ()){if(x!==s){x.loyal=95}}s.loyal=10;s.spyFor=null;__setNet(s,"Ham lợi");v.affair=null;v.plan=null;v.inv=[];v.preg=0;v.hidden=false;S.intel={};
   v.preg=2;v.hidden=true;/* a hidden pregnancy: worth BAL.ag.sell.val.preg */return{v,s}}});
 /* 1 who sells */
 const r1=await p.evaluate(()=>{const {v,s}=__rig();const o={};o.wGreedy=knSellW(s);s.loyal=BAL.ag.sell.loy;o.wLoyal=knSellW(s);s.loyal=10;
  __setNet(s,"Thanh liêm");o.wClean=knSellW(s);__setNet(s,"Ham lợi");
  const own=(S.staff||[])[0];if(own){own.loyal=5;__setNet(own,"Ham lợi")}
  let picks={},n=0;for(let i=0;i<40;i++){const r=knSellPick(S);if(r){n++;picks[r.s.sid]=(picks[r.s.sid]||0)+1;o.ownSel=o.ownSel||(own&&r.s===own)}}o.picks=picks;o.n=n;o.sid=s.sid;
  s.spyFor="me";o.tmSel=!!knSellPick(S);s.spyFor=null;return o});
 ok(r1.wGreedy>0&&r1.wLoyal===0&&r1.wClean===0,'who: Ham lợi + low lòng sells; lòng ≥ BAL.ag.sell.loy or Thanh liêm never',r1);
 ok(r1.n===40&&Object.keys(r1.picks).length===1&&r1.picks[r1.sid]===40&&!r1.ownSel,'pick: the only greedy disloyal servant of another palace with news is the seller; never her own staff',{n:r1.n,p:r1.picks,own:r1.ownSel});
 ok(!r1.tmSel,'her own Tai mắt does not sell to her (she reports)',r1.tmSel);
 /* 2 what + 3 price + buying */
 const r2=await p.evaluate(()=>{const {v,s}=__rig();const o={};const N=knSellNews(S,s);o.kinds=N.map(n=>n.k);o.allTrue=N.every(n=>n.val>=BAL.ag.sell.min);
  o.trivia=N.some(n=>/^(where|sung|hate|ally|trait)/.test(n.k));o.preg=N.find(n=>n.k==="preg");
  /* add an affair → more valuable first */
  v.evm=v.evm||{};v.evm.me=2;{const N2=knSellNews(S,s);o.first=N2[0]&&N2[0].k;o.pAff=knSellPrice(N2[0].val,s);o.pPreg=knSellPrice(N2.find(n=>n.k==="preg").val,s)}v.evm.me=0;
  o.scale=[knSellPrice(100,S),knSellPrice(70,S),BAL.ag.sell.price];{const f=1+qv(BAL.ag.sell.ask,S,0);/* 2f3: the ask factor of whoever is passed (S has a random nết: was a flake) */o.scaleOk=o.scale[0]===Math.round(o.scale[2]*f)&&o.scale[1]===Math.round(o.scale[2]*.7*f)}
  /* buy */
  Q.length=0;S.bac=500;const b0=S.bac,u0=used;const n=knSellNews(S,s)[0];const c=knSellCard(s,n);Q.push(c);showModal();chooseM(0);
  o.paid=b0-S.bac;o.price=c.sell.price;o.kh=used-u0;o.intel=(S.intel[v.id]||[]).some(x=>x.k===n.k&&x.txt===n.txt&&x.how==="Mua tin");o.result=Q.some(m=>m.t==="Tin mua được"&&m.h.includes(n.txt));
  const T=knTb();const it=T.R[T.R.length-1];o.item=it&&it.by==="buy"&&it.line.includes(s.name);o.info=it&&informerInfo(it);o.again=knSellNews(S,s).some(q=>q.k===n.k);
  o.who=c.h.includes(s.name)&&/tin rất đắt giá/.test(c.h);Q.length=0;return o});
 ok(r2.preg&&r2.allTrue&&!r2.trivia,'what: the seller\'s master\'s real secret (hidden pregnancy); only news worth ≥ min; no trivia',r2.kinds);
 ok(r2.first==="evme"&&r2.pAff>r2.pPreg&&r2.scaleOk,'price scales with worth; the most valuable news is offered first',{first:r2.first,aff:r2.pAff,preg:r2.pPreg,scale:r2.scale,sok:r2.scaleOk});
 ok(r2.who,'card: the named seller says "… có một tin rất đắt giá …"');
 ok(r2.paid===r2.price&&r2.kh===1&&r2.intel&&r2.result,'buy: bạc paid = price, 1 khắc spent, the TRUE fact learnt (Đã biết, by the seller)',r2);
 ok(r2.item&&r2.info&&r2.info.kind==="seller"&&r2.info.code==="tin"&&!r2.again,'buy: TIN BÁO row names the seller (informerInfo kind seller / code tin); not sold twice',{info:r2.info,again:r2.again});
 /* 4 refuse: not known, and no leak this khắc */
 const r3=await p.evaluate(()=>{const {v,s}=__rig();const o={};Q.length=0;S.bac=500;const b0=S.bac;const n=knSellNews(S,s).find(q=>q.k==="preg");const c=knSellCard(s,n);Q.push(c);showModal();chooseM(1);
  o.paid=b0-S.bac;o.known=(S.intel[v.id]||[]).some(x=>x.k==="preg");o.leak=j78facts(v).some(f=>f.k==="preg");
  const t=intelLearn(v,9,{by:"x",how:"Nghe ngóng"});o.leak2=(S.intel[v.id]||[]).some(x=>x.k==="preg");o.reoffer=knSellNews(S,s).some(q=>q.k==="preg");
  /* next khắc: the refusal no longer hides it */
  const T=knTb();T.no.k="old";o.later=j78facts(v).some(f=>f.k==="preg");Q.length=0;return o});
 ok(r3.paid===0&&!r3.known&&!r3.leak&&!r3.leak2&&!r3.reoffer,'refuse: no bạc, she does not know it, and no other path (j78facts / intelLearn) gives it this khắc',r3);
 ok(r3.later,'refuse holds this khắc only',r3.later);
 /* deed happening: refuse blocks knFor; buy makes it known with the seller as informer */
 const r4=await p.evaluate(()=>{const o={};const R=liveRivals(true).filter(v=>v.alive&&!v.out&&(v.staff||[]).length);const v=R[0],w=R[1];if(!w)return{skip:1};const s=v.staff[0];s.loyal=10;__setNet(s,"Ham lợi");
  const h={k:palaceOf(w),id:"deed",x:{pid:"t:x:1",vid:v.id,t:w.id}};KN.m=null;
  const n={kind:"hap",h,hid:knHid(h),val:BAL.ag.sell.val.scheme,txt:"x",id:knHid(h),about:v};
  knNo()[n.hid]=1;o.refused=knFor(S,h)===null;delete knNo()[n.hid];
  knSellGive(S,s,n);const k=knFor(S,h);o.known=k&&k.by==="buy"&&k.e===s;o.sn=s.name;o.line=k?knLine(k,h):"";
  /* NPC: w buys a deed of v */
  const x=R[2]||w;KN.bk=null;KN.m=null;knSellGive(x,s,n);const kx=knFor(x,h);o.npcKnown=kx&&kx.how==="buy";return o});
 ok(r4.skip||(r4.refused&&r4.known&&r4.line.includes(r4.sn)),'deed news: refused → knFor null this khắc; bought → known, informer = the seller',r4);
 ok(r4.skip||r4.npcKnown,'NPC buyer: a bought deed is known by knFor (two-way: she may go Nghe lén)',r4.npcKnown);
 /* 5 NPC buyer: price, choice, proof → evidence */
 const r5=await p.evaluate(()=>{const o={};const {v,s}=__rig();const x=liveRivals(true).find(q=>q!==v&&q.alive&&!q.out);
  v.evm=v.evm||{};v.evm.me=2;const w=liveRivals(true).find(q=>q!==v&&q!==x&&q.alive)||S;S.deeds=S.deeds||[];S.deeds.unshift({a:v.id,t:key(w),k:"frame",w:wk(),when:j78when(),ok:true});v.schemes=(v.schemes||0)+3;
  const N=knSellNews(x,s);o.kinds=N.map(n=>n.k);o.noEvme=!N.some(n=>n.k==="evme");const n=N.find(q=>/^deed/.test(q.k))||N[0];v.evm.me=0;
  x.bac=1000;const e0=evG(x,v);let buys=0,tries=0;for(let i=0;i<30;i++){x.knB={};x.bac=1000;tries++;if(knSellNpcBuy(x,s,n))buys++}
  o.buys=buys;o.paid=1000-x.bac;o.price=knSellPrice(n.val,s);o.ev=evG(x,v)>e0;x.bac=0;o.poor=knSellNpcBuy(x,s,n)===false;
  x.knB={};x.knB[n.k]={t:n.txt};o.knownSkip=!knSellNews(x,s).some(q=>q.k===n.k);return o});
 ok(r5.buys>0&&r5.paid===r5.price&&r5.ev&&r5.poor,'NPC buyer: same price, buys by worth vs price, a proof fact gives evidence, cannot buy without bạc',r5);
 ok(r5.noEvme&&r5.knownSkip,'NPC buyer: news already known to her is not sold again; "evidence on the player" not sold to NPCs',r5);
 /* j67 story beat */
 const r6=await p.evaluate(()=>{const {v,s}=__rig();const o={};try{const op=GB67.spy.o[0];o.wrapped=/knSellArc/.test(String(op.go));const t=op.go({},true);o.t=t;o.has=t.includes(s.name)&&(S.intel[v.id]||[]).some(x=>x.how==="Mua tin");o.fail=GB67.spy.o[0].go({},false)===""}catch(e){o.err=e.message}return o});
 ok(r6.wrapped&&r6.has&&r6.fail,'j67 "Một kẻ gạ bán tin": Mua tin brings a real seller\'s true news through the same engine',r6);
 /* 6 tick + bot + old save */
 const r7=await p.evaluate((DAYS)=>{const o={offers:0,bad:[]};delete S.tb;KN.m=null;let tick=0;try{knSellTick();tick=1}catch(e){o.err=e.message}o.tick=tick;
  BAL.ag.sell.o=60;const st0=JSON.stringify({b:KN.stat.npcBuy||0,n:KN.stat.npcNo||0});
  const of0=KN.stat.offer||0;for(let d=0;d<DAYS;d++){for(let i=0;i<4;i++){Q.length=0;S.mg=0;S.bac=500;try{placeWhere();agFlush()}catch(e){}try{knSellTick()}catch(e){o.bad.push(e.message)}
   for(const m of Q)if(m.sell){if(!(m.sell.price>0))o.bad.push(m.sell);if(m.sell.price>0)o.chosen=(o.chosen||0)+1}Q.length=0;try{nextBuoi()}catch(e){}Q.length=0}}o.offers=(KN.stat.offer||0)-of0;
  o.npc={buy:KN.stat.npcBuy||0,no:KN.stat.npcNo||0,st0};BAL.ag.sell.o=15;return o},DAYS);
 ok(r7.tick&&r7.bad.length===0,'old save without S.tb: tick runs; every offer has a price',r7);
 console.log('bot: offers to her',r7.offers,'NPC buys / refusals',r7.npc);
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
