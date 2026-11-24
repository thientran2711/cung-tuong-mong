/* review/bal-ranks-law4 — 0-diff proof: the rank / promotion numbers moved to BAL give the SAME values as the typed code they replace.
   usage: node dev/test/bal-ranks-law4.js [oldRef=origin/main]
   Serves this worktree over http; page OLD = index.html of oldRef (git show), page NEW = this worktree's index.html. Same synthetic people in both:
   RANKS s/d, promoGap(0..7), petMax, seatW, facStr-style weights … must be equal. NEW page: every BAL.rkT table = the old ternary for rank 0..7, every
   BAL.rkW value = the literal it replaced, BAL.kiepCap present. Last line: PASS / FAIL. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http'),cp=require('child_process');
const ROOT=path.join(__dirname,'../..');const REF=process.argv[2]||'origin/main';const OLDF='.law4-old.html';
fs.writeFileSync(path.join(ROOT,OLDF),cp.execSync(`git show ${REF}:index.html`,{cwd:ROOT,maxBuffer:1<<30}));
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png'};
const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';const f=path.join(ROOT,u);
 fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(b)})});
const PROBE=()=>{const o={};const P=r=>({rank:r,danh:40,th:20,dad:50,kids:[{sex:"m",alive:true},{sex:"f",alive:true}],sung:40,alive:true});
 o.ranks=RANKS.map(r=>[r.n,r.s,r.d]);o.gap=[0,1,2,3,4,5,6,7].map(r=>promoGap(r));
 const tryF=(n,f)=>{try{o[n]=[0,1,2,3,4,5,6,7].map(f)}catch(e){o[n]='ERR '+e.message}};
 tryF('petMax',r=>petMax(P(r)));tryF('seatW',r=>seatW(P(r)));
 o.reqText=(()=>{try{const s=S.rank;const out=[];for(let r=0;r<7;r++){S.rank=r;S.lastPromo=S.turn;out.push(promoReq().slice(0,3).map(x=>x[1]).join(' | '))}S.rank=s;return out}catch(e){return 'ERR '+e.message}})();
 return o};
(async()=>{await new Promise(r=>sv.listen(0,r));const port=sv.address().port;const b=await chromium.launch();const T2=[];const ok=(c,n,x)=>T2.push([c?'PASS':'FAIL',n,x==null?'':String(x).slice(0,300)]);
 const boot=async u=>{const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(u,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof BAL==='object'&&typeof promoReq==='function',null,{timeout:180000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}window.__nlInner=1;for(let i=0;i<60;i++){start();if(typeof isSrv!=='function'||!isSrv())break}Q.length=0});return [p,errs]};
 const [po,eo]=await boot(`http://127.0.0.1:${port}/${OLDF}`);const [pn,en]=await boot(`http://127.0.0.1:${port}/index.html`);
 // same seed-free numbers: copy the old page's S stats into the new page's S for the req text
 const sStats=await po.evaluate(()=>({sung:S.sung,danh:S.danh,turn:S.turn,hh:S.hh,th:S.th}));await pn.evaluate(x=>Object.assign(S,x),sStats);
 const O=await po.evaluate(PROBE),N=await pn.evaluate(PROBE);
 for(const k of Object.keys(O))ok(JSON.stringify(O[k])===JSON.stringify(N[k]),`old = new: ${k}`,JSON.stringify(N[k]));
 const R=await pn.evaluate(()=>{const old={srvRise:r=>r>=3?3:r>=1?2:1,eunSqH:r=>r<=2?2:0,eunSqE:r=>r<=3?2:.4,lowRival:r=>r>=2?1.4:0,riteDanh:r=>r>=3?6:2,soke:r=>r>=3?1:0,
   favQueen:r=>r>=7?5:0,accuseQueen:r=>r>=7?30:0,seat:r=>r>=6?10:0,petMax:r=>[1,1,2,2,3,3,4,4][r]};const bad=[];
  for(const k in old)for(let r=0;r<8;r++)if(balRk(k,r)!==old[k](r))bad.push(`${k}[${r}] ${balRk(k,r)} vs ${old[k](r)}`);
  const W={rivalSung:[20,9],startDanh:[8,8],startBac:[40,20],kcSung:[8,5],kcEnterPd:{at:2,hi:10,lo:5},feast:[40,8],accAsk:{mid:4,w:8},pkQueen:15,facStr:10,ordOdds:3,h54Pull:5,pkPull:5,
   giftO:3,takeaway:4,gJoin:3,lostCct:3,routeRival:10,j68e_6:8,j68e_7:9,j68e_9:8,j68f_9:7,j68f_12:8,j71odP:4,j71odP2:5,j71odP_15:3};
  for(const k in W)if(JSON.stringify(BAL.rkW[k])!==JSON.stringify(W[k]))bad.push(`rkW.${k} ${JSON.stringify(BAL.rkW[k])} vs ${JSON.stringify(W[k])}`);
  const extra=Object.keys(BAL.rkT).filter(k=>!(k in old)).concat(Object.keys(BAL.rkW).filter(k=>!(k in W)));
  const gapOld=[0,1,2,3,4,5,6,7].map(r=>r<3?3:3+(r-2)*2);if(JSON.stringify(gapOld)!==JSON.stringify(BAL.promo.gap))bad.push('promo.gap');
  return {bad,extra,cap:BAL.kiepCap,srvWed:BAL.danhG&&BAL.danhG.srvWed,promoKeys:Object.keys(BAL.promo).sort().join(',')}});
 ok(!R.bad.length,'BAL.rkT / rkW / promo.gap = the typed code they replaced (rank 0..7)',R.bad.join('; '));ok(!R.extra.length,'no untested rank key',R.extra.join(','));
 ok(R.cap&&R.cap.realMin===120&&R.cap.kyngo===6,'BAL.kiepCap PROVISIONAL 120 min / 6 kỳ ngộ',JSON.stringify(R.cap));ok(R.srvWed===20,'Ban gả text reads BAL.danhG.srvWed (20)',R.srvWed);
 ok(/cap/.test(R.promoKeys)&&/gap/.test(R.promoKeys)&&/extra/.test(R.promoKeys),'BAL.promo keeps jpromo keys + s/d/gap',R.promoKeys);
 ok(!en.length,'no page error (new)',en.join(' | '));
 for(const t of T2)console.log(t.join(' · '));const f=T2.filter(t=>t[0]==='FAIL').length;console.log(f?`bal-ranks-law4 FAIL ${f}/${T2.length}`:`bal-ranks-law4 PASS ${T2.length}/${T2.length}`);
 await b.close();sv.close();fs.unlinkSync(path.join(ROOT,OLDF));process.exit(f?1:0)})().catch(e=>{console.error(e);try{fs.unlinkSync(path.join(ROOT,OLDF))}catch(_){}process.exit(1)});
