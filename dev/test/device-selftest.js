/* Self-test of dev/test/lib/device.js: every profile on the BUILT root index.html in HOST mode and DIRECT mode.
   usage: node dev/test/device-selftest.js [deviceName ...]   (one Chromium, closed at the end; serves the repo root on a free port) */
const {chromium}=require('playwright');const D=require('./lib/device');
(async()=>{const names=process.argv.slice(2).length?process.argv.slice(2):Object.keys(D.DEVICES);const srv=await D.serveRoot();
 const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;
 for(const n of names){const ctx=await D.newDeviceContext(b,n);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,100)));
  for(const mode of ['host','direct']){try{
   const f=mode==='host'?await D.openHost(p,srv.url):(await D.openDirect(p,srv.url),p);await p.waitForTimeout(600);const r=await D.probe(p);
   const inGame=await f.evaluate(()=>({iw:innerWidth,ih:innerHeight,kv:typeof kitView==='function'?kitView():null,ios:/iP(ad|hone|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)}));
   console.log(n.padEnd(13),mode.padEnd(6),'host',r.host,'rot',r.rotated,'s',r.s,'tip',r.tip,'| game sees',inGame.iw+'x'+inGame.ih,'IOS-sniff',inGame.ios,'| coarse',r.coarse,'hover',r.hover,'dpr',r.dpr,'plat',r.platform,'tp',r.touchPoints,errs.length?'ERR '+errs[0]:'');
   if(mode==='host'&&!r.host)bad++}catch(e){bad++;console.log(n,mode,'FAIL',e.message.slice(0,120))}}
  await ctx.close()}
 await b.close();srv.close();process.exit(bad?1:0)})();
