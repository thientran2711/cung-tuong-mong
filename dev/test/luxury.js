// review/luxury (D17) rules test: node dev/test/luxury.js [index.html]   (one Chromium; no pictures)
// 1 default ranges = jtoil's old thresholds (same verdict as the pre-D17 toilDress for every ratio) · 2 host / mourning / edict shift the range
// 3 extras on the card = applied (leAttire delta) · 4 Hội phối đồ: in-range beats lavish beats over-rank; theme tags on every wearable
// 5 monthly reputation → edict (world key), NPC same rules · 6 old save without the new keys loads and plays a month · 7 no page errors
const {chromium}=require('playwright');const path=require('path');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const pg=await b.newPage({viewport:{width:755,height:1000}});
 await pg.route(u=>!/^file:/.test(String(u)),r=>r.abort());await pg.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 const errs=[];pg.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await pg.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(400);await pg.evaluate(()=>localStorage.clear());await pg.reload({waitUntil:'domcontentloaded'});await pg.waitForTimeout(400);
 /* a consort life (a servant start has no dress verdict: jtoil is off for servants) — new game again until she is not a servant */
 for(let i=0;i<12;i++){if(i){await pg.evaluate(()=>localStorage.clear());await pg.reload({waitUntil:'domcontentloaded'});await pg.waitForTimeout(400)}
  await pg.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await pg.waitForTimeout(800);
  if(!(await pg.evaluate(()=>typeof isSrv==="function"&&isSrv())))break}
 const R=await pg.evaluate(()=>{const out=[];const ok=(n,c,x)=>out.push([n,!!c,x===undefined?"":JSON.stringify(x).slice(0,300)]);
  /* 1. defaults: re-implement the pre-D17 toilDress ratio rule and compare over a sweep of worn totals (no host taste, no context) */
  const old=(r,d,F)=>{const B=BAL.toil.dress[F];if(d<=B.under||r<B.rLo)return"giandi";if(B.showR!=null&&r>B.showR)return"photruong";if(d>=B.fitD&&r>=B.fitR&&(B.fitHi==null||r<=B.fitHi))return"hopdip";return"hoppham"};
  const sv={k:luxOf,t:S.luxEdict};let bad=[];S.luxEdict=null;
  for(let F=0;F<3;F++)for(let sc=0;sc<=100;sc+=1){luxOf=()=>({lv:sc>100?2:1,sc,bud:100});const V=luxVerdict(S,F,null);let d=0;try{d=wdLevel(S)-Math.min(8,wdPOf(S))}catch(e){}
   const o=sc>100?"photruong":old(sc/100,d,F);if(V.v!==o&&!(V.v==="vuot"||V.v==="tang"))bad.push([F,sc,V.v,o])}
  ok("1 default range = old thresholds",bad.length===0,bad.slice(0,5));
  /* 2. shifts */
  luxOf=()=>({lv:1,sc:88,bud:100});const leh=leHostKind;
  leHostKind=()=>"normal";const vN=luxVerdict(S,1,"th").v;leHostKind=()=>"frugal";const vF=luxVerdict(S,1,"th").v;leHostKind=leh;
  ok("2a frugal host: 88/100 at thỉnh an is phô trương, normal host hợp dịp",vN==="hopdip"&&vF==="photruong",[vN,vF]);
  S.luxEdict={until:S.turn+3,at:S.turn,by:"th"};const vE=luxVerdict(S,1,null).v;const tl=aaThieuLe0(S);
  luxOf=()=>({lv:1,sc:10,bud:100});const tl2=aaThieuLe0(S);S.luxEdict=null;
  ok("2b edict: 88/100 is phô trương (far above its ceiling: diêm dúa, makeup-lux BAL.lux.diem), plain is never thiếu lễ",(vE==="photruong"||vE==="diem")&&!tl2,[vE,tl2]);
  const wt=S.wdTang;S.wdTang=S.turn+3;luxOf=()=>({lv:1,sc:60,bud:100});const vT=luxVerdict(S,1,null);S.wdTang=wt;
  ok("2c quốc tang caps the range",vT.R.ctx==="tang"&&(vT.v==="photruong"||vT.v==="tang"),[vT.v,vT.R.pts]);
  /* 3. extras on the card = applied: phô trương before Thái hậu at thỉnh an costs Đức −1 and shows on the rider text */
  luxOf=()=>({lv:1,sc:95,bud:100});leHostKind=()=>"frugal";S.toilSeen=null;const L=leAttire(S,"","th");const txt=aaThieuLeTxt("th");
  const d0=S.duc;aaThieuLeApply("th");const dd=S.duc-d0;leHostKind=leh;
  ok("3 phô trương: card delta Đức = applied, text names Xa xỉ",L.delta.duc<0&&dd===L.delta.duc&&/Xa xỉ 95/.test(txt),[L.delta,dd,txt]);
  luxOf=sv.k;S.luxEdict=sv.t;S.toilSeen=null;
  /* 4. Hội phối đồ: same theme hits, three luxury levels */
  const rk0=S.rank;S.rank=5;const T=TS_THEME.thanh,Rg=luxThemeRange(S,T);const tags=T.tags;const set=k=>({hair:k});
  const hk=tags.find(k=>TS_SLOT[0][2](k)),ak=tags.find(k=>TS_SLOT[2][2](k));const pts=L2=>{const f=tsLuxK;tsLuxK=k=>k===hk?L2:0;const P={hair:hk,ao:ak};const r=tsDressPts(S,P,"thanh");tsLuxK=f;return r};
  const a=pts(Math.round((Rg.lo+Rg.hi)/2)),bb=pts(Rg.hi+1),c=pts(Rg.bud+5),p0=pts(0);S.rank=rk0;
  ok("4a contest: in range > phô trương > vượt phẩm; too plain < in range",a.raw>bb.raw&&bb.raw>c.raw&&p0.raw<a.raw&&a.st==="hop"&&bb.st==="photruong"&&c.st==="vuot"&&c.vp.length>0,[a,bb,c,p0,Rg]);
  const W=Object.keys(WD_ITEMS).filter(k=>k!=="y_tang").concat(Object.keys(IT).filter(k=>IT[k].sl||IT[k].dr));const none=W.filter(k=>!kidThemes(k).length);
  ok("4b every wearable shows a theme tag",none.length===0,none);
  ok("4c five themes, each with a range",Object.values(TS_THEME).length>=5&&Object.values(TS_THEME).every(t=>t.r&&t.r[0]<t.r[1]),Object.keys(TS_THEME));
  const v=liveRivals(true)[0];const P=tsNpcDress(Object.assign(v,{tamco:300}),"phu");const dv=tsDressPts(v,P,"phu");
  ok("4d NPC dresses for the contest from what she owns/wears",dv.lux>0,dv);
  /* 5. reputation and edict */
  const lo=luxOf;luxOf=p=>({lv:3,sc:160,bud:100});const C=[S].concat(liveRivals(true));C.forEach(p=>p.luxRep=0);S.luxEdict=null;
  for(let i=0;i<3;i++)C.forEach(p=>luxRepTick(p));const xh=C.filter(luxXaHoa).length;const pp=BAL.lux.edictP;BAL.lux.edictP=100;const q0=Q.length;const e=luxEdictTry();BAL.lux.edictP=pp;
  ok("5a three months far above the allowance = tiếng xa hoa; edict follows",xh===C.length&&luxEdictOn()&&Q.length===q0+1&&/tiết kiệm/.test(e),[xh,S.luxEdict,e]);
  const du=v.duc;luxMonthX(v);ok("5b NPC above the edict: Đức −2",v.duc===du+BAL.lux.edictDuc||v.duc===0,[du,v.duc]);
  ok("5c edict is a co-op world key",[...document.scripts].some(x=>/const W_KEYS=\[[^\]]*"luxEdict"/.test(x.textContent)));
  luxOf=lo;S.luxEdict=null;C.forEach(p=>p.luxRep=0);Q.length=q0;
  /* 5d co-op guest: never rolls its own edict; the host's edict (world key) is told once */
  {const W=window.COOPW;const s0={on:W.on,seat:W.seat};W.on=true;W.seat="b";luxOf=p=>({lv:3,sc:160,bud:100});C.forEach(p=>p.luxRep=9);BAL.lux.edictP=100;S.luxEdict=null;S.luxEdictSeen=null;
   const g1=luxEdictTry(),n1=Q.length;S.luxEdict={until:S.turn+3,at:S.turn,by:"th"};const g2=luxEdictTry(),n2=Q.length;const g3=luxEdictTry(),n3=Q.length;
   W.on=s0.on;W.seat=s0.seat;BAL.lux.edictP=pp;luxOf=lo;S.luxEdict=null;C.forEach(p=>p.luxRep=0);Q.length=q0;
   ok("5d co-op guest: no own edict; host's edict told once",g1===""&&n1===q0&&/tiết kiệm/.test(g2)&&n2===q0+1&&g3===""&&n3===n2,[g1,n1,g2,n2,g3,n3,q0])}
  /* 6. old save: no luxRep / luxEdict / luxRepD; a whole month plays */
  delete S.luxRep;delete S.luxEdict;delete S.luxRepD;liveRivals(true).forEach(v=>delete v.luxRep);let err="";try{const m0=S.turn;for(let i=0;i<60&&S.turn===m0;i++){Q.length=0;S.mg=null;endTurn()}}catch(x){err=String(x)}
  ok("6 old save (no new keys) plays a month",!err&&S.luxRep!=null,[err,S.luxRep]);
  /* gift API for D19 */
  const g=luxGift("vongvang",S,v);ok("7 luxGift API",g&&g.v>0&&["mon","vua","hop","hau"].includes(g.st),g);
  /* 8. family scan (LUẬT SỬA CẢ NHÓM): every Hành sự card with a side line (risk) shows it in Kèm */
  {const lo2=luxOf;const miss=[];let n=0;for(const f of [.95,.01]){luxOf=p=>{const x=lo2(p);return p===S?Object.assign({},x,{sc:Math.round(x.bud*f),lv:1}):x};S.buoi=0;S.toilSeen=null;deal();
   deck.forEach((a,i)=>{if(!a.risk)return;n++;const h=cardH(a,i).replace(/<[^>]+>/g," ");if(!/Kèm/.test(h))miss.push(a.n)})}luxOf=lo2;ok("8 deck cards with a side line show Kèm",miss.length===0,{n,miss})}
  return out});
 let fail=0;for(const [n,c,x] of R){console.log((c?"PASS ":"FAIL ")+n+(c?"":"  "+x));if(!c)fail++}
 console.log(errs.length?"PAGE ERRORS: "+errs.join(" | "):"no page errors");await b.close();process.exit(fail||errs.length?1:0)})();
