/* review/srv-rank — LAW 11 family scan: every servant who climbs a ladder capped by the master's rank (j14 srkMax) — the maid player, an NPC
   maid, an NPC eunuch, a servant in HER household — in every state of the rung (below the cap / at the cap with full Công lao, trusted / the same,
   low trust / at the cap with no higher palace that has room). For each: which roads up are open (monthly rise, «Xin chủ tiến cử» for her,
   the ask to serve a higher palace, the buy-out by a higher consort).
   usage: node dev/measure/srv-rank-scan.js <URL> [label]   → markdown table */
const {chromium}=require('playwright');
const [,,URL,LBL]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.addInitScript(()=>{window.__nlInner=1;window.__bot=1});const p=await ctx.newPage();
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 const rows=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin="cnv";for(let i=0;i<20;i++){start();if(isSrv())break}Q.length=0;render=()=>{};const R=[];
  const L=liveRivals(true);let m=srvM();const lo=L.find(v=>rkOf(v)<4&&v!==m);if(lo)srvReassign("scan",lo);m=srvM();m.rank=Math.min(rkOf(m),2);
  const room=(v,i)=>{const c=capOf(v),h=hhHas(v);return h[i]<c[i]};
  const hi=L.filter(v=>v!==m&&rkOf(v)>=5);const fullHi=()=>{const keep=hi.map(v=>[v,v.staff]);hi.forEach(v=>{v.staff=(v.staff||[]).slice();const c=capOf(v);while(hhHas(v)[0]<c[0])v.staff.push(Object.assign(mkServ("maid"),{rk:1}));while(hhHas(v)[1]<c[1])v.staff.push(Object.assign(mkServ("eunuch"),{rk:1}))});return()=>keep.forEach(([v,s])=>v.staff=s)};
  const buyers=(mm)=>{try{const B=BAL.ag.why.srv.buy;return liveRivals(true).filter(x=>x!==mm&&rkOf(x)>rkOf(mm)+B.gap&&(x.bac||0)>=B.bac).length}catch(e){return -1}};
  const st=[["below cap",0,80,0],["at cap, full Công lao, trusted",1,80,0],["at cap, full Công lao, low trust",1,40,0],["at cap, trusted, every higher palace full (Nội vụ phủ swap)",1,80,1]];
  /* the maid player */
  for(const [nm,atCap,tin,noRoom] of st){const un=noRoom?fullHi():null;const cap=srvMax();S.srv.lau=0;S.srv.lvCd=0;S.srv.rk=atCap?cap:cap-1;S.srv.mp=srvMpNeed(S.srv.rk);S.tin=tin;
   const T=srvTalk({kind:"srv",sk:"mis"});const lv=T.find(x=>x.n==="Xin chủ cho đi hầu cung khác"),rc=T.find(x=>x.n==="Xin chủ tiến cử lên Nội vụ phủ");
   const mon=S.srv.rk<srvMax()&&S.tin>=BAL.srvx.tinUp;R.push(["maid player (cap "+SRK.maid[cap]+")",nm,mon?"yes":"no",rc?(rc.lock?"locked":"open"):"-",lv?(lv.lock?"locked":"open"):"-",buyers(m)]);if(un)un()}
  /* NPC maid / eunuch of a low NPC master, and a servant in HER household is n/a for a maid player (she has none) */
  for(const role of ["maid","eunuch"]){let s=null,o=null;for(const x of liveRivals(true)){if(x===srvM()||rkOf(x)>=4)continue;const y=(x.staff||[]).find(z=>z.role===role&&!z.coop);if(y){s=y;o=x;break}}
   if(!s){R.push(["NPC "+role,"(none found)","-","-","-","-"]);continue}
   for(const [nm,atCap,loy,noRoom] of st){const un=noRoom?fullHi():null;const cap=srkMax(o,s);s.rk=atCap?cap:Math.max(0,cap-1);s.mp=srvMpNeed(s.rk);s.loyal=loy;s.lvCd=0;
    let ask="-";try{ask=asOpts(s).some(z=>z.sk==="leave")?"open":"locked"}catch(e){ask="err"}
    R.push(["NPC "+role+" (cap "+SRK[role][cap]+")",nm,s.rk<cap?"yes":"no","n/a",ask,"n/a"]);if(un)un()}}
  return R});
 console.log(`# srv-rank family scan — ${LBL||URL}\n| servant | state | monthly rise | «Xin chủ tiến cử» | ask to serve a higher palace | higher consorts who may buy her |\n|---|---|---|---|---|---|`);
 for(const r of rows)console.log('| '+r.join(' | ')+' |');await b.close()})().catch(e=>{console.error(e);process.exit(2)});
