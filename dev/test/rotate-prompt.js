/* rotate-prompt (D22 example test): the "Xoay ngang điện thoại để chơi" prompt + design-canvas scaling on REAL device profiles, BUILT root index.html.
   HOST mode (what a phone really runs: rot.js frame, sideways when narrow portrait) and DIRECT mode (what tests used to see).
   usage: node dev/test/rotate-prompt.js [baseURL]    (no URL = serve the repo root on a free port; one Chromium, closed at the end)
   Expect: narrow portrait (iphone14, pixel, foldOuter) -> prompt in BOTH modes, host frame rotated, game sees 1180x820; Fold (one page 590x820, KIT §0) / iPads / landscape -> no prompt. */
const {chromium}=require('playwright');const D=require('./lib/device');
const CASES=[['iphone14',1,'1180x820'],['pixel',1,'1180x820'],['foldOuter',1,'1180x820'],['fold',0,'590x820'],['foldLand',0,'1180x820'],['iphone14Land',0,'1180x820'],
 ['ipadAir',0,'1180x820'],['ipadAirPort',0,'590x820'],['ipadPro',0,'1180x820']];
(async()=>{const srv=process.argv[2]?{url:process.argv[2],close(){}}:await D.serveRoot();
 const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let fails=0;
 for(const [name,wantTip,wantDesign] of CASES){const ctx=await D.newDeviceContext(b,name);const p=await ctx.newPage();
  for(const mode of ['host','direct']){const f=mode==='host'?await D.openHost(p,srv.url):(await D.openDirect(p,srv.url),p);await p.waitForTimeout(500);
   const r=await D.probe(p);const seen=await f.evaluate(()=>innerWidth+'x'+innerHeight);
   /* direct mode shows the prompt but the game sees the REAL viewport; host mode shows the design size */
   const okTip=r.tip===!!wantTip,okDesign=mode==='host'?seen===wantDesign:true,okRot=mode==='host'?r.rotated===!!wantTip:true;
   const ok=okTip&&okDesign&&okRot;if(!ok)fails++;
   console.log(ok?'PASS':'FAIL',name.padEnd(13),mode.padEnd(6),'tip',r.tip,'(want '+!!wantTip+') rotated',r.rotated,'game sees',seen,'(host wants '+wantDesign+')','s',r.s)}
  await ctx.close()}
 await b.close();srv.close();console.log(fails?fails+' FAIL':'ALL PASS');process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(2)});
