/* AG-ALL-2d4 — TIN BÁO TIMING BY THE REAL DƯ ĐỒ WALK (owner OD 17/11 ~17:55Z (3), verbatim: "theo đường đi thật, gần thì khắc 2, xa thì khắc 3 trở đi").
   node dev/test/ag-walk.test.js [dev/index.html]
   A happening at khắc 1 (index 0) at a place NEAR her (travel 1) or FAR (travel 2). The bearer walks the same road the player walks (travel()).
   1 her Tai mắt / a passer-by: near → known from khắc 2, far → from khắc 3 (table, one row per khắc)
   2 her own servant standing there: same timing
   3 the timing reads the one walk (BAL.walk): far = 3 → known from khắc 4; relay off (see + go = 0) → known at once
   4 buổi-end carry (knCarryOut / knCarryIn): a last-khắc happening reaches her in the next buổi at khắc (arrival − KH): near → khắc 1 of the
     next buổi, far → khắc 2; not before
   5 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;window.__agAll=1;Q.length=0;for(let i=0;i<8&&(S.buoi||0)!==1;i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}placeWhere();agFlush();
  window.__tmOff=1;S.tamco=100;BAL.mind.slip=0;const KH=J95.KH;o.KH=KH;const me=knAt("me",0)||S.place||"home";o.me=me;
  const PL=["thu","dtd","tn","kn","vuon","ksp","tyv","lc","home"];const near=PL.find(k=>k!==me&&travel(k,me)===1),far=PL.find(k=>k!==me&&travel(k,me)===2);o.near=near;o.far=far;
  const v=liveRivals(true).find(x=>x.alive&&!x.out&&!x.confined);const z=agZ();const k0=agKh;
  const mk=(pl,tag,kh)=>{const pd={key:agKey(),id:"v"+v.id,vid:v.id,k:"gossip",kd:"",t:null,kh,k1:kh,pl,act:"to nhỏ bàn tán",why:"thử"};z.pend.push(pd);return{pd,h:{k:pl,id:"gossip",x:{pid:v.id+":gossip:"+kh,vid:v.id,t:null},done:0}}};
  const run=(pl,route,tag)=>{const {pd,h}=mk(pl,tag,0);const st0=S.staff,md0=S.maid,mat0=S.mat;S.maid=null;const row=[];let sp=null;
   if(route==="eye"){S.staff=[];S.mat=100}else{sp=(st0||[]).find(s=>s&&!s.out&&s.sid!=null);S.staff=sp?[sp]:[];S.mat=0;if(sp){sp.loyal=100;const R=agRec();R.P["s"+sp.sid]=[0,1,2,3].map(()=>[pl,"errand",null,""])}}
   const eye0=BAL.ag.know.eye;if(route!=="eye")BAL.ag.know.eye=0;
   try{for(let k=0;k<KH;k++){agKh=()=>k;KN.m=null;let x=null;try{x=knFor(S,h)}catch(e){x={by:"ERR "+e.message}}row.push(x?x.by:"-")}}finally{agKh=k0;BAL.ag.know.eye=eye0}
   z.pend.splice(z.pend.indexOf(pd),1);S.staff=st0;S.maid=md0;S.mat=mat0;return row};
  o.eyeN=run(near,"eye","n1");o.eyeF=run(far,"eye","f1");o.srvN=run(near,"srv","n2");o.srvF=run(far,"srv","f2");
  const wf=BAL.walk.far;BAL.walk.far=3;o.eyeF3=run(far,"eye","f3");BAL.walk.far=wf;
  const sv=[BAL.ag.kh2.rd.see,BAL.ag.kh2.rd.go];BAL.ag.kh2.rd.see=0;BAL.ag.kh2.rd.go=0;o.eyeOff=run(far,"eye","o1");BAL.ag.kh2.rd.see=sv[0];BAL.ag.kh2.rd.go=sv[1];
  /* 4 carry: a happening in the LAST khắc */
  const carry=(pl,tag)=>{const {pd,h}=mk(pl,tag,KH-1);const st0=S.staff,mat0=S.mat,md0=S.maid;S.staff=[];S.maid=null;S.mat=100;/* the eye route only (her confidant maid walks with her: one khắc) */const A0=adHapNow;adHapNow=function(){const L=A0.apply(this,arguments);KN.raw=(KN.raw||[]).concat([h]);return L};
   const out={};try{used=KH-1;KN.m=null;out.now=knFor(S,h);out.walk=travel(pl,knAt("me",KH-1)||"home");const T=knTb();delete T.K[knHid(h)];knCarryOut();out.C=(T.C||[]).map(x=>({id:x.id,due:x.due}));
    Q.length=0;S.mg=0;nextBuoi();Q.length=0;adHapNow=A0;z.pend.splice(z.pend.indexOf(pd),1);S.staff=st0;S.mat=mat0;S.maid=md0;used=0;const c=out.C.find(x=>x.id.includes(":"+pl+":gossip"));const id=c&&c.id;out.due=c?c.due:null;out.at=[];
    for(let k=0;k<KH;k++){used=k;KN.m=null;const L=tinBaoList();const it=L.find(x=>x.id===id);out.at.push(it?(it.ended?"ended":"live"):"-")}}catch(e){out.err=e.message}finally{adHapNow=A0;S.staff=st0;S.mat=mat0;S.maid=md0;used=0}return out};
  /* the carry: her place in the LAST khắc (her row may differ from khắc 1) */
  const meL=knAt("me",KH-1)||"home";o.meL=meL;o.cN=carry(PL.find(k=>k!==meL&&travel(k,meL)===1),"cn");o.cF=carry(PL.find(k=>k!==meL&&travel(k,meL)===2),"cf");
  o.errs=AG.errs.slice(0,5);return o});
 console.log(`her place ${r.me}; near ${r.near}, far ${r.far}; KH ${r.KH}`);
 console.log('| route | where | k1 | k2 | k3 | k4 |\n|---|---|---|---|---|---|');
 for(const [n,w,a] of [["Tai mắt","near",r.eyeN],["Tai mắt","far",r.eyeF],["her servant","near",r.srvN],["her servant","far",r.srvF],["Tai mắt (BAL.walk.far 3)","far",r.eyeF3],["relay off","far",r.eyeOff]])console.log(`| ${n} | ${w} | ${(a||[]).join(' | ')} |`);
 const first=a=>a.findIndex(x=>x!=="-");
 ok(r.near&&r.far,'setup: a near place (travel 1) and a far place (travel 2) from her',{near:r.near,far:r.far});
 ok(first(r.eyeN)===1&&/^(mat|pass)$/.test(r.eyeN[1]),'1 Tai mắt / passer-by NEAR: seen k1 → known from khắc 2, not before',r.eyeN);
 ok(first(r.eyeF)===2&&/^(mat|pass)$/.test(r.eyeF[2]),'1 Tai mắt / passer-by FAR: seen k1 → known from khắc 3, not before',r.eyeF);
 ok(first(r.srvN)===1&&/^s/.test(r.srvN[1]),'2 her own servant there NEAR: known from khắc 2',r.srvN);
 ok(first(r.srvF)===2&&/^s/.test(r.srvF[2]),'2 her own servant there FAR: known from khắc 3',r.srvF);
 ok(first(r.eyeF3)===3,'3 the timing reads the one walk table (BAL.walk.far = 3 → khắc 4)',r.eyeF3);
 ok(first(r.eyeOff)===0,'3 relay off (BAL.ag.kh2.rd see + go = 0) → known at once',r.eyeOff);
 console.log('carry (her place in the last khắc '+r.meL+') near',JSON.stringify(r.cN),'far',JSON.stringify(r.cF));
 ok(!r.cN.err&&r.cN.walk===1&&r.cN.now===null&&r.cN.at[0]==="ended"&&r.cN.due===0,'4 carry NEAR: a last-khắc happening reaches her at the START of the next buổi (khắc 1), as ended',r.cN);
 ok(!r.cF.err&&r.cF.walk===2&&r.cF.now===null&&r.cF.at[0]==="-"&&r.cF.at[1]==="ended"&&r.cF.due===1,'4 carry FAR: reaches her at khắc 2 of the next buổi, not before',r.cF);
 ok(!errs.length&&!r.errs.length,'5 no page / agent errors',errs.concat(r.errs).slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:`AG-WALK: ALL ${res.length} PASS`);process.exit(n?1:0)})().catch(e=>{console.error(e);process.exit(1)});
