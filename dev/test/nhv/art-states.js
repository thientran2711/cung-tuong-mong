/* NHV ART STATES (MAIN 150, 26/11): every mùa × buổi loads ITS OWN painting — garden map 16 + 5 areas × 16 = 96 — through the game's own path
   functions (kpmArt slot p:vuon, jnhv areaArt via NHV), no «tạm». usage: node dev/test/nhv/art-states.js  (Fold boot, then HTTP 200 + decode of each URL) */
const {boot}=require('./boot');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 const r=await g.evaluate(async()=>{const SE=["Xuân","Hạ","Thu","Đông"],SK={"Xuân":"xuan","Hạ":"ha","Thu":"thu","Đông":"dong"},BW=["sang","trua","chieu","toi"];const out=[];const m0=S.month,b0=S.buoi;
  for(const se of SE){S.month=SEASON.indexOf(se)+1;for(let b=0;b<4;b++){S.buoi=b;const s=SK[se],bw=kpmBuoiW();
   const A=kpmArt('p:vuon');out.push({k:'map',st:s+'-'+bw,src:A.src,tam:A.tam,own:A.src.endsWith(`ngu-hoa-vien-${s}-${bw}.webp`)});
   for(const a of BAL.area.vuon){const P=NHV.areaArt(a.k);const f={ngudao:'ngu-dao',vuonhoa:'vuon-hoa',thuyta:'thuy-ta',dinhco:'dinh-co',nonbo:'non-bo'}[a.k];out.push({k:a.k,st:s+'-'+bw,src:P.src,tam:P.tam,own:P.src.endsWith(`${f}-${s}-${bw}.webp`)})}}}
  S.month=m0;S.buoi=b0;
  await Promise.all(out.map(x=>new Promise(res=>{const im=new Image();im.onload=()=>{x.ok=im.naturalWidth>1000;res()};im.onerror=()=>{x.ok=false;res()};im.src=x.src})));return out});
 const bad=r.filter(x=>!x.own||x.tam||!x.ok);bad.slice(0,10).forEach(x=>console.log('FAIL',JSON.stringify(x)));
 console.log(`NHV ART STATES ${bad.length?'FAIL':'PASS'} · ${r.length-bad.length}/${r.length} (map ${r.filter(x=>x.k==='map').length} + areas ${r.filter(x=>x.k!=='map').length}) each its own painting, loaded, no tạm`);
 await o.b.close();o.srv.close();process.exit(bad.length?1:0)})();
