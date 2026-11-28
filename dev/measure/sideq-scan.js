// review/sideq-trim — WHOLE FAMILY SCAN (law 11): every source of a Việc nhờ / Phụ tuyến and who can ask her at each rank band, LIVE vs branch.
// usage: node dev/measure/sideq-scan.js <branch.html>   (LIVE has no rank gate: every listed kind asks at every band)
// (1) offer sites: every call of q72Offer / q72Make / q72().ch.push in dev/build (grep) — all pass through the jsideq gate.
// (2) templates by requester spec × band: how many can be dealt at band 0/1/2 (before = all; after = BAL.sideq.who / rvDn·rvUp by band).
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');
const BUILD=path.join(__dirname,'../build');
const sites=cp.execSync(`grep -n "q72Offer(\\|q72Make(\\|\\.ch\\.push({tid" ${BUILD}/*.js | grep -v "^${BUILD}/all.js" | grep -v "function q72Offer\\|function q72Make\\|window.q72Test"`,{encoding:'utf8'}).trim().split('\n')
 .map(l=>{const m=l.match(/build\/([^:]+):(\d+):/);return m?`${m[1]}:${m[2]}`:l.slice(0,60)});
console.log('OFFER SITES ('+sites.length+'):');for(const s of sites)console.log('  '+s);
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const Q=BAL.sideq;const kindOf=sp=>{sp=String(sp);if(/^rv/.test(sp))return"rv";if(sp==="akf")return"ak";if(/^sv/.test(sp))return"sv";return sp};
  const by={};for(const T of T72){const sp=(T.fu?"fu:":"")+T.r;const k=kindOf(T.r);const o=by[sp]=by[sp]||{n:0,k,steps:0,dl0:0,dl:0};o.n++;if(T.s.length>Q.stepMax)o.steps++;o.dl0=Math.max(o.dl0,T.dl0||T.dl||6);o.dl=Math.max(o.dl,T.dl)}
  const rows=Object.entries(by).sort((a,b)=>b[1].n-a[1].n).map(([sp,o])=>{const w=o.k==="rv"?null:(Q.who[o.k]||(o.k.indexOf("man:")===0?Q.who.man:null));
   const at=[0,1,2].map(bd=>o.k==="rv"?`±${Q.rvDn}/${Q.rvUp} rank`:(!w||(bd>=w[0]&&bd<=w[1]))?"yes":"no");return{sp,n:o.n,at,steps:o.steps,dl0:o.dl0,dl:o.dl}});
  return{rows,open:Q.open,mo:Q.mo,gapW:Q.gapW,dlMax:Q.dlMax,stepMax:Q.stepMax}});
 console.log('\nBAL.sideq open by band',JSON.stringify(r.open),'mo',r.mo,'gapW',r.gapW,'dlMax',r.dlMax,'stepMax',r.stepMax);
 console.log('\n| requester spec | templates | band 0 ≤Quý nhân (LIVE→now) | band 1 Tần·Phi | band 2 Quý phi+ | >stepMax | max deadline LIVE→now |');
 console.log('|---|---|---|---|---|---|---|');
 for(const x of r.rows)console.log(`| ${x.sp} | ${x.n} | yes→${x.at[0]} | yes→${x.at[1]} | yes→${x.at[2]} | ${x.steps} | ${x.dl0}→${x.dl} tuần |`);
 await b.close()})();
