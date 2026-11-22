/* palace-life r1 (reviewer): the children rules through the REAL month (monthTick: S.turn++ comes BEFORE kidsMonth), not a direct kidLifeMonth() call.
   usage: node dev/test/palace-life-r1.js   (serves the built root; exit 1 on a failed check) */
const {chromium}=require('playwright');const D=require('./lib/device');
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'ipadAir');const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));const g=await D.openDirect(p,srv.url);
 await g.waitForFunction(()=>typeof start==='function',null,{timeout:180000});
 await g.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});
 await g.waitForFunction(()=>typeof S!=='undefined'&&S&&rivals&&rivals.length>0,null,{timeout:60000});
 const o=await g.evaluate(()=>{const o={},B=BAL.kid;Q.length=0;S.rank=4;S.out=0;S.confined=0;S.kids=[];const a=mkKid('m',8),c=mkKid('m',9);a.hM=60;c.hM=60;S.kids.push(a,c);
  const mt=()=>{try{monthTick()}catch(e){o.err=String(e)}Q.length=0};
  mt();o.base=[a.hM,c.hM];/* month 1: nobody seen → both estranged */
  /* month 2: she calls a home (seen), never sees c */a.hM=60;c.hM=60;S.buoi=1;used=0;o.why=kmCallWhy(a);kmCall(a);mt();o.seen=a.hM-60;o.unseen=c.hM-60;
  /* month 3: she walks to A ca sở */a.hM=60;S.buoi=1;used=0;S.place='home';try{accGrant&&accGrant(S,'acs')}catch(e){}goTo('acs');o.place=S.place;const h=a.hM;mt();o.visitNet=a.hM-60;o.afterVisit=h-60;
  o.B=B;return o});
 const C=[];const ck=(n,ok,v)=>{C.push(ok);console.log((ok?'ok   ':'FAIL ')+n+' :: '+JSON.stringify(v))};
 ck('month with no visit: estranged',o.base[0]===60+o.B.estr,o.base);
 ck('month she called him home: NOT estranged (net = +call)',o.seen===o.B.call,{seen:o.seen,why:o.why});
 ck('the son she did not see: estranged',o.unseen===o.B.estr,o.unseen);
 ck('month she visited A ca sở: NOT estranged (net = +visit)',o.place!=='acs'||o.visitNet===o.B.visit,{place:o.place,net:o.visitNet,at:o.afterVisit});
 ck('no page errors',!errs.length&&!o.err,[errs.slice(0,3),o.err]);
 await b.close();srv.close();process.exit(C.every(x=>x)?0:1)})();
