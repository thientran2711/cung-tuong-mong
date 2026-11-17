/* AG-ALL-2c checks (jagknow; design dev/handover/reports/ag-all.md §19). A consort start (never a servant start: the Dư đồ '!' is hidden there).
   1 G1 no cap: three happenings at one place all fire on arrival (adHapArrive)
   2 G2 Tai mắt filter: the '!' she sees = the happenings she knows; few with Tai mắt 0 and no servants, all with a high Tai mắt; where she stands always shows
   3 ONE RULE two-way: knFor works the same for an NPC (Tai mắt, presence, servants, friends); a bought servant may sell the news to her buyer
   4 TIN BÁO API: tinBaoList() items {id,k,place,b,k0,k1,who,line,by,seen}; tinBaoOn fires once per newly known item; tinBaoSeen; a servant's line in her voice
   5 servants' own errands: NPC servants of every master (hers too) choose Nghe ngóng / Tự đi dò la / Canh chừng; scout odds = the consort's spyRoll (ONE formula);
     the player maid has the same three cards; a scheme landing at a watched palace is seen (chứng cứ +1 for the master)
   6 two-way hear: an NPC who knows a deed may go and listen ("know:hear" = the player's "Nghe lén" button, same odds function agHearO = knHearO)
   7 old save (no S.tb) loads; BAL.ag.on = 0 → every '!' shows again
   usage: node dev/test/ag-know.test.js [dev/index.html] [days] → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const DAYS=+process.argv[3]||8;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* 1 G1 */
 const r1=await p.evaluate(()=>{const fired=[];const f0=AD_HAP_FIX.slice();AD_HAP_FIX.length=0;for(let i=0;i<3;i++){const id="t"+i;AD_HAP_FIX.push(()=>({k:"tyv",id}));AD_HAP_FIRE[id]=()=>{fired.push(id);return true}}
  S.adHapD=null;S.adHap=null;const pl=S.place;S.place="tyv";Q.length=0;adHapArrive("tyv");S.place=pl;AD_HAP_FIX.length=0;f0.forEach(f=>AD_HAP_FIX.push(f));Q.length=0;return fired});
 ok(r1.length===3,'G1: every happening of a place fires on arrival (no cap of 2)',r1);
 /* 2 G2 over N days: raw happenings vs the '!' she sees, low vs high Tai mắt (her servants silenced for the low run) */
 const r2=await p.evaluate(async(DAYS)=>{BAL.ag.kh2.rd.see=0;BAL.ag.kh2.rd.go=0;/* AG-ALL-2d: routes only (relay khắc off); a happening not begun yet is known by nobody but its doer */const o={low:{raw:0,seen:0},high:{raw:0,seen:0},here:0,hereOk:0};const st0=S.staff,md0=S.maid;
  for(let d=0;d<DAYS;d++){const hi=d%2===1;S.mat=hi?40:0;S.tamco=hi?100:0;S.staff=hi?st0:[];S.maid=hi?md0:null;
   for(let bb=0;bb<4;bb++){placeWhere();agFlush();S.adHapD=null;let L=[];try{L=adHapNow()}catch(e){}const raw=KN.raw||[];const g=hi?o.high:o.low;const pr=h=>!h.done&&!knFixed(h)&&knWin(h)[0]<=agKh();g.raw+=raw.filter(pr).length;g.seen+=L.filter(h=>pr(h)&&h.k!==S.place).length;for(const h of L){const it=(S.tb&&S.tb.K||{})[knHid(h)];if(it){g.by=g.by||{};const kb=it.by[0]==='v'?'friend':it.by[0]==='s'?'srv':it.by;g.by[kb]=(g.by[kb]||0)+1}}

    Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}}
  S.staff=st0;S.maid=md0;S.mat=1;S.tamco=20;BAL.ag.kh2.rd.see=1;BAL.ag.kh2.rd.go=1;return o},DAYS);
 console.log('G2 raw vs seen: '+JSON.stringify(r2));
 ok(r2.low.raw>0&&r2.low.seen<r2.low.raw,'G2: with Tai mắt 0 and no servants she sees fewer \'!\' than happen',r2.low);
 ok(r2.high.raw===0||r2.high.seen>=Math.floor(r2.high.raw*0.85)-1,'G2: with a high Tai mắt she sees (almost) every happening',r2.high);
 /* arriving where a happening she did not know is taking place: she sees it there (presence) */
 const r2b=await p.evaluate(()=>{const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined);const a=L[0];const z=agZ();const kh=agKh();S.mat=0;S.tamco=0;const st0=S.staff,md0=S.maid;S.staff=[];S.maid=null;for(const v of L)v.rel=0;
  const pd={key:agKey(),id:"v"+a.id,vid:a.id,k:"gossip",kd:"",t:null,kh,pl:"tyv",act:"to nhỏ bàn tán",why:"thử"};z.pend.push(pd);KN.m=null;S.tb=null;S.adHapD=null;
  const before=adHapNow().some(h=>h.k==="tyv");let fired=0;const pl=S.place;S.place="tyv";Q.length=0;const f0=AD_HAP_FIRE.gossip;AD_HAP_FIRE.gossip=(h,k)=>{fired++;return true};try{adHapArrive("tyv")}finally{AD_HAP_FIRE.gossip=f0;S.place=pl;Q.length=0}
  const i=z.pend.indexOf(pd);if(i>=0)z.pend.splice(i,1);S.staff=st0;S.maid=md0;S.mat=1;S.tamco=20;return{before,fired}});
 ok(r2b.fired>=1,'G2: arriving where a happening takes place, she sees it even when nobody told her',r2b);
 /* 3 + 4 + 6 on a planted deed: gossip at the garden this buổi, a khắc still to come */
 const r3=await p.evaluate(()=>{const o={};/* AG-ALL-2d: the WHO-KNOWS routes are checked with the relay khắc off (news at once) on a deed running NOW; the khắc chain itself is §8 */BAL.ag.kh2.rd.see=0;BAL.ag.kh2.rd.go=0;const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined);const a=L[0],x=L[1],fr=L[2];const z=agZ();const kh=agKh();
  const pd={key:agKey(),id:"v"+a.id,vid:a.id,k:"gossip",kd:"",t:null,kh,pl:"vuon",act:"to nhỏ bàn tán",why:"thử"};z.pend.push(pd);z.log.push({w:wk(),b:S.buoi||0,kh,id:"v"+a.id,k:"gossip",t:null,pl:"vuon",why:"thử"});
  const h={k:"vuon",id:"gossip",x:{pid:a.id+":gossip:"+kh,vid:a.id,t:null},done:0};
  KN.m=null;S.mat=0;S.tamco=0;const st0=S.staff,md0=S.maid;S.staff=[];S.maid=null;fr.rel=-50;for(const v of L)v.rel=Math.min(v.rel||0,0);
  /* her own eyes: a draw at her watch odds oSee, once per happening (40 happenings) */let lo=0,hi=0;for(let i=0;i<40;i++){const hh=Object.assign({},h,{x:Object.assign({},h.x,{pid:h.x.pid+"#"+i})});KN.m=null;S.mat=0;S.tamco=0;if(knFor(S,hh))lo++;KN.m=null;S.mat=40;S.tamco=100;if(knFor(S,hh))hi++}
  S.mat=0;S.tamco=0;o.lowMe={n:lo,odds:oSee(S,false)};o.highMe={n:hi,odds:(S.mat=40,S.tamco=100,oSee(S,false))};S.mat=0;S.tamco=0;
  /* the same rule for an NPC */KN.m=null;x.mat=40;x.tamco=100;o.npcHigh=knFor(x,h);KN.m=null;x.mat=0;x.tamco=0;o.npcLow=(x.staff||[]).length?"skip":knFor(x,h);x.mat=40;x.tamco=100;o.doer=knFor(a,h);
  /* a friend passes it on */KN.m=null;S.mat=0;S.tamco=0;fr.rel=90;fr.mat=40;fr.tamco=100;let fb=null;for(let i=0;i<30&&!fb;i++){KN.m=null;S.tb=null;const f=knFor(S,h);if(f&&f.how==="friend")fb=f.by}o.friend=fb;fr.rel=0;
  /* her servant tells her (loyal) — and the line is in her voice */
  KN.m=null;S.maid=Object.assign({},md0||{name:"Thử"},{loyal:100,name:(md0&&md0.name)||"Thử"});S.maid.sid=undefined;let told=0,line="";for(let i=0;i<40&&!told;i++){S.tb=null;KN.m=null;const r=knFor(S,h);if(r&&r.s===S.maid){told=1;line=knLine(r,h)}}o.told=told;o.line=line;
  /* a bought servant: she sells the news to her buyer */
  const s={sid:99901,name:"Thử Bán",role:"maid",loyal:0,spyFor:key(x)};let sold=0;for(let i=0;i<60&&!sold;i++){KN.m=null;knTell(s,S,"hid"+i);const M=knMemo();if(M.x["v"+x.id+"|hid"+i])sold=1}o.sold=sold;
  S.maid=md0;S.staff=st0;
  /* 4 TIN BÁO API */
  KN.m=null;S.tb=null;S.mat=40;S.tamco=100;let n=0;const off=tinBaoOn(()=>n++);S.adHapD=null;const T=tinBaoList();const it=T.find(i=>i.place==="vuon"&&i.k==="gossip");o.item=it||null;
  const T2=tinBaoList();o.cbOnce=n>=1&&tinBaoList().length===T2.length;const n1=n;tinBaoList();o.noRefire=n===n1;o.new0=tinBaoNew();tinBaoSeen();o.new1=tinBaoNew();off();
  /* 6 the NPC who knows it may go and listen: same key / button / odds function */
  KN.m=null;const O=knOpts(x,agNeedsC(x),null);o.hearOpt=O.map(q=>q.k);o.sameOdds=agHearO()===knHearO(S)&&knHearO(x)===agHearOf(x);o.btn=agReact(pd,a,null).some(q=>q.n==="Nghe lén");
  const e0=KN.stat.hear;AGRUN["know:hear"](x,a,{pl:"vuon"});o.hearRan=KN.stat.hear===e0+1;
  z.pend.splice(z.pend.indexOf(pd),1);S.mat=1;S.tamco=20;BAL.ag.kh2.rd.see=1;BAL.ag.kh2.rd.go=1;return o});
 ok(r3.lowMe.n<=Math.round(40*r3.lowMe.odds/100)+8&&r3.highMe.n>=36,'ONE RULE (her): known by her own eyes and ears at her watch odds oSee (Tai mắt 0: few of 40; high: nearly all)',{low:r3.lowMe,high:r3.highMe});
 ok(r3.npcHigh&&(r3.npcLow==="skip"||!r3.npcLow),'ONE RULE (NPC): the same rule for a consort (her servants or her own Tai mắt)',{hi:r3.npcHigh&&r3.npcHigh.by,lo:r3.npcLow});
 ok(r3.doer&&r3.doer.how==="self",'the doer knows her own deed',r3.doer);
 ok(/^v\d+$/.test(r3.friend||""),'a consort who likes her passes the news on (informer = that consort)',r3.friend);
 ok(r3.told&&/\S/.test(r3.line)&&!/\{|\}/.test(r3.line),'her loyal confidant maid tells her; the line is in that maid\'s voice',r3.line);
 ok(r3.sold,'a bought servant may sell the news to the one who bought her',r3.sold);
 const it=r3.item;ok(it&&['id','k','place','b','k0','k1','who','line','by','seen'].every(f=>f in it)&&it.k0<=it.k1,'TIN BÁO API: tinBaoList() item fields',it);
 ok(r3.cbOnce&&r3.noRefire,'TIN BÁO API: tinBaoOn fires for a newly known item, not again on re-read',{once:r3.cbOnce,no:r3.noRefire});
 ok(r3.new0>0&&r3.new1===0,'TIN BÁO API: tinBaoNew / tinBaoSeen',{before:r3.new0,after:r3.new1});
 ok(r3.hearOpt.includes('know:hear')&&r3.btn&&r3.sameOdds&&r3.hearRan,'two-way: an NPC who knows it may go and listen = the player\'s "Nghe lén" (same odds function)',{O:r3.hearOpt,btn:r3.btn,odds:r3.sameOdds,ran:r3.hearRan});
 /* 5 servants' errands */
 const r5=await p.evaluate(()=>{const o={};const L=asStaff();const s=L.find(x=>ownerOf(x)!==S&&x.sid!=null)||L[0];const m=ownerOf(s);s.loyal=90;const O=asOpts(s,asNeeds(s));o.keys=O.map(q=>q.k);
  const sc=O.find(q=>/:scout$/.test(q.k));o.scoutOdds=sc?sc.p===spyRoll(m,sc.t,s):"none";
  /* hers too */const mine=asStaff().find(x=>ownerOf(x)===S);if(mine){mine.loyal=90;o.mine=asOpts(mine,asNeeds(mine)).map(q=>q.k).filter(k=>/:(listen|scout|watch)$/.test(k))}
  /* the watched palace sees a scheme landing there */
  const v=liveRivals(true).find(x=>x!==m&&x.alive&&!x.out);const ws=(m.staff||[]).find(x=>x.sid!=null);let seen=0;if(ws&&v){ws.loyal=100;const g0=evG(m,v);v.schemes=(v.schemes||0)+1;try{deedAdd(v,"rumor",m,1,"tung tin")}catch(e){}const cap=deedCap(v);
   const D=agDz();D.P["s"+ws.sid]=D.P["s"+ws.sid]||[];D.P["s"+ws.sid][S.buoi||0]={k:asGrp(ws)+":watch",pl:palaceOf(m)};D.d=wk();
   for(let i=0;i<20&&!seen;i++){KN.m=null;knWatchLand({k:"harm:rumor",vid:v.id,pl:palaceOf(m),kh:i,act:"tung tin"});if(evG(m,v)>g0)seen=1}}o.watchSeen=seen||(typeof deedCap==="function"&&deedCap(v)===0?"nocap":0);
  return o});
 ok(r5.keys.some(k=>/:listen$/.test(k))&&r5.keys.some(k=>/:watch$/.test(k)),'servants: Nghe ngóng / Canh chừng are an NPC servant\'s options (any master)',r5.keys.filter(k=>/:(listen|scout|watch)$/.test(k)));
 ok(r5.scoutOdds===true||r5.scoutOdds==="none",'servants: Tự đi dò la odds = the consort\'s spyRoll (ONE formula)',r5.scoutOdds);
 ok(!r5.mine||r5.mine.length>0,'servants: her own servants choose the same errands for her',r5.mine);
 ok(r5.watchSeen===1,'servants: a scheme landing at a watched palace is seen (chứng cứ +1 for the master)',r5.watchSeen);
 /* 5b the player maid has the same three cards */
 const r5b=await p.evaluate(()=>{const m=liveRivals(true).find(v=>v.alive&&!v.out);const A=knSrvCards(m).map(a=>a.n);return A});
 ok(['Nghe ngóng cho chủ','Canh chừng cung chủ'].every(n=>r5b.includes(n)),'the player maid has the same errands as cards',r5b);
 /* 7 old save + off */
 const r7=await p.evaluate(()=>{delete S.tb;let e=null;try{tinBaoList();adHapNow()}catch(x){e=x.message}const on=BAL.ag.on;BAL.ag.on=0;S.adHap=null;let L=[];try{L=adHapNow()}catch(x){e=x.message}BAL.ag.on=on;return{e,off:Array.isArray(L)}});
 ok(!r7.e&&r7.off,'old save without S.tb loads; the loop off → the old \'!\' path',r7);
 {const ae=await p.evaluate(()=>(AG.errs||[]).slice(0,5));ok(errs.length===0&&ae.length===0,'no page errors / agent errors',{page:errs.slice(0,3),ag:ae})}
 /* 8 AG-ALL-2d per-khắc chain (owner OD 17/11 ~15:45Z L1638): news carried by someone reaches the master at the START of the khắc after the bearer's
    trip — a happening at khắc q is known through her Tai mắt / a servant from q + see + go, never before it begins; presence knows at once */
 const r8=await p.evaluate(()=>{const o={};const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined);const a=L[0];const z=agZ();const D=knRelay();o.D=D;
  const pd={key:agKey(),id:"v"+a.id,vid:a.id,k:"gossip",kd:"",t:null,kh:0,k1:0,pl:"vuon",act:"to nhỏ bàn tán",why:"thử"};z.pend.push(pd);
  const h={k:"vuon",id:"gossip",x:{pid:a.id+":gossip:0",vid:a.id,t:null},done:0};const st0=S.staff,md0=S.maid,pl0=S.place;S.staff=[];S.maid=null;S.mat=100;S.tamco=100;S.place="home";
  const k0=agKh;o.at=[];try{for(let k=0;k<J95.KH;k++){agKh=()=>k;KN.m=null;const r=knFor(S,h);o.at.push(r?r.by:null)}}finally{agKh=k0}
  z.pend.splice(z.pend.indexOf(pd),1);S.staff=st0;S.maid=md0;S.place=pl0;S.mat=1;S.tamco=20;return o});
 ok(r8.D===2&&!r8.at[0]&&!r8.at[1]&&(r8.at[2]==="mat"||r8.at[2]==="pass")/* AG-ALL-2f: the eye route names a real person — her placed Tai mắt ("mat") or, none placed, a real passer-by ("pass") */,'8 khắc chain: a happening at khắc 1 reaches her Tai mắt at the start of khắc 3 (seen k1 → the bearer goes k2 → known k3), never before',r8);
 /* 9 (owner ~16:20Z (d)): the three scheme lies STAY (NO-LIES is only about what HER servants / Tai mắt report to her): the bribed physician's lie,
    NPC false rumours (j68f), the servant frame-up dilemma */
 const r9=await p.evaluate(()=>{const SRC=[...document.scripts].map(x=>x.textContent).join("\n");return{thy:BAL.thy&&BAL.thy.lie>0&&/roll\(T\(\)\.lie\)/.test(SRC),rumour:/j68f/.test(SRC)&&/Nghe đồn/.test(SRC),frame:typeof cnvFrameOpts==="function"}});
 ok(r9.thy&&r9.rumour&&r9.frame,'9 scheme lies stay: bribed Thái y lie (BAL.thy.lie), false rumours (j68f), servant frame-up (cnvFrameOpts)',r9);
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:`AG-KNOW: ALL ${res.length} PASS`);process.exit(f?1:0)})();
