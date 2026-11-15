/* BẠC ↔ OTHER ROAD (owner rule via coordinator 15/11): every choice that costs bạc has another road whose cost is EQUIVALENT in value.
   Reads every bạc choice the game builds and its road without silver, at ranks 1 / 3 / 5, and prices both roads in KHẮC (her real limit,
   16 a tuần), from bot economy numbers:
     1 bạc  = 16 / (bạc she earns per tuần at that rank)        (sensible-bot flow, dev/measure/inpromo.js; --val file or defaults below)
     1 Sức  = BAL.restLatK / BAL.restLatSuc khắc                 ("Nghỉ ngơi một lát": the free way to buy Sức back)
     1 Danh / Đức / Sủng = 16 / (what she earns of it per tuần)  (same flow data)
     1 point of thiện cảm / Lòng / Thái hậu / Hoàng hậu = BAL-free estimate: a talk act gives ~3 for 1 khắc → 1/3 khắc
     odds: E = p·V(success) − (1−p)·V(failure) − costs; V(success) = max(value of its gains, the silver price) (paying shows it is worth it)
   gap = (E_alt − E_silver) / (silver price in khắc): > +0.3 the free road is the obvious pick, < −0.3 the silver road is; |gap| ≤ 0.3 = hesitate.
   usage: NODE_PATH=$(npm root -g) node dev/measure/bacroad.js <page url> <out.json> [val.json]   → also prints a markdown table */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,VALF]=process.argv;
const VAL=VALF?JSON.parse(fs.readFileSync(VALF,'utf8')):null;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 const R=await p.evaluate(([VAL])=>{const T=s=>String(s||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  /* --- values in khắc --- */
  const V=Object.assign({bacTuan:[30,34,40,48,58,70,85,100],danhTuan:6,ducTuan:3,sungTuan:6,rel:1/3},VAL||{});
  const vSuc=(BAL.restLatK||1)/(BAL.restLatSuc||6),vB=r=>16/V.bacTuan[Math.min(7,r)],vD=16/V.danhTuan,vDuc=16/V.ducTuan,vSung=16/V.sungTuan,vRel=V.rel;
  const statV=o=>{let s=0;if(!o||typeof o!=='object')return 0;for(const [k,x] of Object.entries(o)){if(typeof x!=='number')continue;
    if(k==='bac')s+=x*vB(S.rank);else if(k==='suc')s+=x*vSuc;else if(k==='danh')s+=x*vD;else if(k==='duc')s+=x*vDuc;else if(k==='sung')s+=x*vSung;
    else if(/^(th|hh|rel|maid|loyal|tin|an|nt|aff)$/.test(k))s+=x*vRel;else if(/^(tamco|mat|tai|sac)$/.test(k))s+=x*2;else if(k==='ev')s+=x*3}return s};
  const pr=(o,A)=>{let x=typeof o==='function'?(()=>{try{return o(A)}catch(e){return null}})():o;return x==null?100:Math.max(5,Math.min(95,+x))};
  /* E of a road: p·Vs − (1−p)·Vf − costs (khắc) */
  const road=(r)=>({n:r.n,bac:r.bac||0,p:r.p,k:r.k||0,suc:r.suc||0,other:r.other||0,Vw:r.Vw,Vl:r.Vl});
  const E=(x,Vs)=>x.p/100*Vs-(1-x.p/100)*x.Vl-x.bac*vB(S.rank)-x.suc*vSuc-x.k-x.other;
  const rows=[];const add=(src,id,sil,alt,note)=>{const price=sil.bac*vB(S.rank);const Vs=Math.max(sil.Vw,alt.Vw,price);const es=E(sil,Vs),ea=E(alt,Vs);
   rows.push({src,id,rank:S.rank,sil,alt,price:+price.toFixed(2),Vs:+Vs.toFixed(2),es:+es.toFixed(2),ea:+ea.toFixed(2),gap:+((ea-es)/Math.max(.5,price)).toFixed(2),note:note||''})};
  const out={V,vals:{vSuc,vB:[0,1,2,3,4,5,6,7].map(vB),vD,vDuc,vSung,vRel},rows,ranks:[]};S.bac=9999;
  for(const rk of [1,3,5]){S.rank=rk;
   /* 1. j67 chapter beats (jstory adds the road without silver) */
   for(const id of Object.keys(ARC67)){const a=ARC67[id];let A=null;try{A=newThread67(id,'m')}catch(e){}if(!A)A={a:id,kind:'m',act:{},f:{},sc:0,used:[],hist:[],i:0,seq:['s','c','x']};
    for(const bid of Object.keys(a.B||{})){let O=[];try{A.cur=bid;O=opts67(A,a.B[bid])}catch(e){O=[]}
     const sil=O.filter(o=>o.c&&o.c.bac<0&&!o.alt67),alt=O.filter(o=>o.alt67);if(!sil.length)continue;
     const s=sil[0],al=alt[0];const nm=o=>T(typeof o.n==='function'?o.n(A):o.n);
     const S1=road({n:nm(s),bac:-s.c.bac,p:pr(s.o,A),suc:-(s.c.suc||0),Vw:statV(s.w),Vl:-statV(s.l)});
     if(!al){rows.push({src:'j67',id:id+'.'+bid,rank:rk,sil:S1,alt:null,gap:null,note:'NO ROAD WITHOUT SILVER'});continue}
     const A1=road({n:nm(al),p:pr(al.o,A),suc:-((al.c&&al.c.suc)||0),Vw:statV(al.w),Vl:-statV(al.l)});add('j67',id+'.'+bid,S1,A1)}}
   /* 2. j72 phụ tuyến steps */
   if(typeof T72!=='undefined')for(const Tq of T72)(Tq.s||[]).forEach((st,i)=>{if(!st.ch)return;const sil=st.ch.find(o=>o.c&&o.c.bac<0&&!o.alt72),al=st.ch.find(o=>o.alt72)||st.ch.find(o=>!(o.c&&o.c.bac<0));if(!sil)return;
    const S1=road({n:T(sil.n),bac:-sil.c.bac,p:sil.p==null?100:sil.p,k:sil.k==null?1:sil.k,suc:-(sil.c.suc||0),Vw:statV(sil.w),Vl:-statV(sil.l)});
    if(!al){rows.push({src:'j72',id:Tq.id+'#'+(i+1),rank:rk,sil:S1,alt:null,gap:null,note:'NO ROAD WITHOUT SILVER'});return}
    add('j72',Tq.id+'#'+(i+1),S1,road({n:T(al.n),p:al.p==null?100:al.p,k:al.k==null?1:al.k,suc:-((al.c&&al.c.suc)||0),Vw:statV(al.w),Vl:-statV(al.l)}))});
   /* 3. scheme acts with a road without bạc (jecon §5); target = a consort of the same rank */
   const t=liveRivals(true).find(v=>!v.out&&v.rank===rk)||liveRivals(true).find(v=>!v.out);
   if(t){const ev=3;/* one chứng cứ ≈ 3 khắc (a spy act costs 2 khắc + bạc for one) */
    try{const ps=pr(ACT.spy.o?ACT.spy.o(S,t):60);const pa=pr(ACT.spyk.o(S,t));const bac=econSchemePrice('spy',S,t);
     add('jecon','Dò la ↔ Tự đi dò la',road({n:'Dò la',bac,p:ps,k:2,Vw:ev,Vl:8*vRel}),road({n:'Tự đi dò la',p:pa,k:2,Vw:ev+2,Vl:2*vD+8*vRel}))}catch(e){}
    try{const ps=pr(ACT.bribe.o?ACT.bribe.o(S,t):60);const pa=pr(ps-BAL.selfMinus);const bac=econSchemePrice('bribe',S,t);
     add('jecon','Mua chuộc ↔ Sai cung nữ lấy lòng',road({n:'Mua chuộc cung nữ',bac,p:ps,k:2,Vw:ev,Vl:ev}),road({n:'Sai cung nữ thân tín lấy lòng',p:pa,k:2,other:BAL.loyalCost*vRel,Vw:ev,Vl:ev}))}catch(e){}
    try{const ps=pr(ACT.block.o?ACT.block.o(S,t):60);const bac=econSchemePrice('block',S,t);
     add('jecon','Rút thẻ bài ↔ Nhờ ơn người quen',road({n:'Rút thẻ bài (đút lót)',bac,p:ps,k:2,Vw:6,Vl:0}),road({n:'Nhờ ơn người quen rút thẻ bài',p:ps,k:2,other:BAL.favorCost*vRel,Vw:6,Vl:0}))}catch(e){}}
   /* 4. rest: dưỡng sức (bạc or a tonic) vs nghỉ một lát, both bought up to Sức +restDsSuc */
   add('jrest','Nghỉ ngơi dưỡng sức ↔ Nghỉ ngơi một lát ×N',road({n:'Dưỡng sức (mua thuốc)',bac:BAL.restDsBac,p:100,k:BAL.restDsMinK,Vw:BAL.restDsSuc*vSuc,Vl:0}),
    road({n:`Nghỉ một lát ×${(BAL.restDsSuc/BAL.restLatSuc).toFixed(1)}`,p:100,k:BAL.restDsSuc/BAL.restLatSuc*BAL.restLatK,Vw:BAL.restDsSuc*vSuc,Vl:0}),'both reach Sức +'+BAL.restDsSuc);
   /* 5. monthly duty: Chu toàn lễ nghĩa (bạc) vs Bớt lễ nghĩa (Danh, Đức) */
   try{const d=econDuty(S),bt=econBan(S);if(d+bt>0){const sk=BAL.dutySkip.danh+Math.floor(Math.min(7,rk)/2);
    add('jecon','Chu toàn lễ nghĩa ↔ Bớt lễ nghĩa',road({n:'Chu toàn lễ nghĩa',bac:d+bt,p:100,Vw:0,Vl:0}),road({n:'Bớt lễ nghĩa',p:100,other:sk*vD+BAL.dutySkip.duc*vDuc,Vw:0,Vl:0}))}}catch(e){}
  }
  return out},[VAL]);
 R.errs=errs;fs.writeFileSync(OUT,JSON.stringify(R,null,1));
 const L=['| source | choice | rank | bạc | silver road (odds, khắc, Sức) | other road (odds, khắc, Sức, other) | price (khắc) | E silver | E other | gap | verdict |','|---|---|---|---|---|---|---|---|---|---|---|'];
 const vd=g=>g==null?'NO ROAD':g>0.3?'other road obvious':g<-0.3?'silver obvious':'ok (hesitate)';
 for(const r of R.rows)L.push(`| ${r.src} | ${r.id} | ${r.rank} | ${r.sil.bac} | ${r.sil.p}%, ${r.sil.k}k, Sức ${r.sil.suc} | ${r.alt?`${r.alt.p}%, ${r.alt.k}k, Sức ${r.alt.suc}${r.alt.other?`, +${r.alt.other.toFixed(1)}k`:''}`:'—'} | ${r.price??''} | ${r.es??''} | ${r.ea??''} | ${r.gap??''} | ${vd(r.gap)} |`);
 const n=R.rows.length,bad=R.rows.filter(r=>r.gap==null||Math.abs(r.gap)>0.3);
 const by={};for(const r of R.rows){const k=r.src+' r'+r.rank;by[k]=by[k]||{n:0,ok:0,alt:0,sil:0,none:0};by[k].n++;if(r.gap==null)by[k].none++;else if(r.gap>0.3)by[k].alt++;else if(r.gap<-0.3)by[k].sil++;else by[k].ok++}
 console.log('values (khắc):',JSON.stringify(R.vals));console.log('| group | pairs | ok | other road obvious | silver obvious | no road |\n|---|---|---|---|---|---|');
 for(const [k,v] of Object.entries(by))console.log(`| ${k} | ${v.n} | ${v.ok} | ${v.alt} | ${v.sil} | ${v.none} |`);
 console.log(`total ${n}, off by >30%: ${bad.length}, errors ${JSON.stringify(errs.slice(0,3))}`);fs.writeFileSync(OUT.replace(/\.json$/,'.md'),L.join('\n')+'\n');
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
