/* BẠC ↔ OTHER ROAD (owner rule via coordinator 15/11): every choice that costs bạc has another road whose cost is EQUIVALENT in value.
   Reads every bạc choice the game builds and its road without silver, at ranks 1 / 3 / 5, and prices both roads in KHẮC (her real limit,
   16 a tuần), from bot economy numbers:
     1 bạc  = 16 / (bạc she earns per tuần at that rank)        (sensible-bot flow, dev/measure/inpromo.js; --val file or defaults below)
     1 Sức  = BAL.restLatK / BAL.restLatSuc khắc                 ("Nghỉ ngơi một lát": the free way to buy Sức back)
     1 Danh / Đức / Sủng = 16 / (what she earns of it per tuần)  (same flow data)
     1 point of thiện cảm / Lòng / Thái hậu / Hoàng hậu = BAL-free estimate: a talk act gives ~3 for 1 khắc → 1/3 khắc
     odds: E = p·V(success) − (1−p)·V(failure) − costs; V(success) = max(value of its gains, the silver price) (paying shows it is worth it)
   gap = (E_alt − E_silver) / (silver price in khắc): > +0.3 the free road is the obvious pick, < −0.3 the silver road is; |gap| ≤ 0.3 = hesitate.
   Groups: j67 chapter beats, j72 phụ tuyến, jecon scheme pairs, jrest, monthly duty, j68 common events (EV6), act = Hành sự deck +
   talk options + tài nghệ (value per khắc vs the best act without Bạc for the same main gain). Static census: dev/measure/bacsites.py.
   usage: NODE_PATH=$(npm root -g) node dev/measure/bacroad.js <page url> <out.json> [val.json]   → also prints a markdown table */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,VALF]=process.argv;
const VAL=VALF?JSON.parse(fs.readFileSync(VALF,'utf8')):null;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:900}});
 /* seeded Math.random (BACSEED, default 7): the same start every run, so before/after differ only by the code */
 await p.addInitScript(([sd])=>{let s=sd*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},[+(process.env.BACSEED||7)]);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
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
   /* 6. common events (j68e–h EV6): every option paying Bạc vs the best option of the same card without Bạc (c6 spec captured) */
   if(typeof E68!=='undefined'){const c0=window.__c6o||(window.__c6o=c6);c6=function(n,sp){const r=c0(n,sp);try{r.__s=sp}catch(e){}return r};
    /* a gain/cost in words only (wt / lt / k tokens) = 3 khắc each (BAL.bacVal.tok) */
    const tok=(L,cls)=>(L||[]).filter(t=>typeof t==='string'&&t.indexOf('class="'+cls+'"')>=0).length*((BAL.bacVal&&BAL.bacVal.tok)||3);
    const relV=sp=>{let v=0;for(const [a,x] of (sp.r||[]))v+=(a&&a.k==='emp'?x*vSung:x*vRel);return v},relL=sp=>{let v=0;for(const [a,x] of (sp.lr||[]))v+=(a&&a.k==='emp'?x*vSung:x*vRel);return v};
    const r6=(o)=>{const sp=o.__s||{};const c=o.fx||sp.c||{};return road({n:T(o.n),bac:-(c.bac<0?c.bac:0),p:sp.p==null?100:Math.max(5,Math.min(95,Math.round(sp.p))),suc:-(c.suc<0?c.suc:0),
      other:Object.entries(c).filter(([k,x])=>k!=='bac'&&k!=='suc'&&x<0).reduce((a,[k,x])=>a-statV({[k]:x}),0)+tok(sp.k,'r'),Vw:statV(sp.w)+relV(sp)+(c.suc>0?c.suc*vSuc:0)+tok(sp.wt,'g')+tok(sp.k,'g'),Vl:-(statV(sp.l)+relL(sp))+tok(sp.lt,'r')})};
    for(const ev of E68){let O=null;for(let t=0;t<6&&!O;t++){try{const pp=ev.pp?ev.pp():{};if(pp==null)continue;const X=e68X(ev,pp);if(!X)continue;O=ev.o(X)}catch(e){O=null}}
     if(!O)continue;const sil=O.filter(o=>o&&o.fx&&o.fx.bac<0);if(!sil.length)continue;const alt=O.filter(o=>o&&!(o.fx&&o.fx.bac<0));
     for(const s1 of sil){const S1=r6(s1);if(!alt.length){rows.push({src:'j68',id:ev.id,rank:rk,sil:S1,alt:null,gap:null,note:'NO ROAD WITHOUT SILVER'});continue}
      /* different options = different outcomes: each road is valued by ITS OWN gains (E = p·Vw − (1−p)·Vl − costs); gap over max(price, 4 khắc = one buổi) */
      const A=alt.map(r6);const price=S1.bac*vB(S.rank);const Eo=x=>E(x,x.Vw);const best=A.sort((a,b)=>Eo(b)-Eo(a))[0];const es=Eo(S1),ea=Eo(best);
      rows.push({src:'j68',id:ev.id+' · '+S1.n,rank:rk,sil:S1,alt:best,price:+price.toFixed(2),Vs:+S1.Vw.toFixed(2),es:+es.toFixed(2),ea:+ea.toFixed(2),gap:+((ea-es)/Math.max(4,price)).toFixed(2),note:'own values'})}}
    c6=c0}
   /* 7. acts (Hành sự deck, talk options of the people she meets, tài nghệ): an act paying Bạc vs the best act WITHOUT Bạc giving the same main gain.
      Unit cost C = khắc (cardCost) + Bạc + Sức + other costs + expected failure loss; U = p·value of gains. ratio = (U/C other) / (U/C silver):
      gap = ratio − 1 (> +0.3 other act obvious, < −0.3 silver act obvious). Gains only in words (no numbers in w) are listed as UNPRICED. */
   {const acts=[];const seen=new Set();const take=(a,from)=>{if(!a||typeof a!=='object'||!a.n)return;const nm=T(typeof a.n==='function'?a.n():a.n);if(seen.has(nm))return;seen.add(nm);acts.push(Object.assign({},a,{__n:nm,__f:from}))};
    const r0=Math.random;for(let i=0;i<40;i++){try{deal();(deck||[]).forEach(a=>take(a,'deck'))}catch(e){}}
    const ppl=[{kind:'emp'},{kind:'th'},{kind:'maid'},{kind:'ty'},{kind:'ksp'},{kind:'peddler'},{kind:'fallen'}];try{if(typeof queenP==='function'&&queenP())ppl.push({kind:'hh',ref:queenP()})}catch(e){}
    try{liveRivals(true).slice(0,4).forEach(v=>ppl.push({kind:'rival',ref:v}))}catch(e){}
    for(const q of ppl){try{(talkOpts(q)||[]).forEach(a=>take(a,'talk:'+q.kind))}catch(e){}}
    try{(artActs()||[]).forEach(a=>take(a,'art'))}catch(e){}
    const xV=a=>{/* gains written only in x ("Sủng +3", "Y thuật +1"): price the known names */let v=0;const x=T(a.x||'');const M=[[/Sủng \+(\d+)/,vSung],[/Danh \+(\d+)/,vD],[/Đức \+(\d+)/,vDuc],[/(?:Sắc|Tài|Tâm cơ|Tai mắt|thuật|nghệ)[^+·]{0,12}\+(\d+)/,2],[/(?:thiện cảm|quý ngươi|Lòng|thương)[^+·]{0,20}\+(\d+)/,vRel],[/Sức[^+·]{0,6}\+(\d+)/,vSuc]];for(const [re,u] of M){const m=x.match(re);if(m)v+=(+m[1])*u}return v};
    const main=a=>{const w=Object.assign({},a.w||{});let best=null,bv=0;for(const [k,x] of Object.entries(w)){if(typeof x!=='number'||x<=0)continue;const v=statV({[k]:x});if(v>bv){bv=v;best=k}}
      if(!best){const x=T(a.x||'');best=/Sủng/.test(x)?'sung':/Danh/.test(x)?'danh':/Đức/.test(x)?'duc':/thuật|nghệ/.test(x)?'art':/Sắc/.test(x)?'sac':/Tài/.test(x)?'tai':/thiện cảm|quý ngươi|Lòng|thương/.test(x)?'rel':null}return best};
    const U=a=>{const p=Math.max(5,Math.min(95,typeof a.o==='number'?a.o:100))/100;const c=a.c||{};const vw=statV(a.w)+xV(a)+(c.suc>0?c.suc*vSuc:0);
      const C=(typeof cardCost==='function'?cardCost(a):2)+(c.bac<0?-c.bac*vB(S.rank):0)+(c.suc<0?-c.suc*vSuc:0)+Object.entries(c).filter(([k,x])=>k!=='bac'&&k!=='suc'&&x<0).reduce((s,[k,x])=>s-statV({[k]:x}),0)+(1-p)*Math.max(0,-statV(a.l));
      return{p:Math.round(p*100),vw,C,u:p*vw,eff:vw>0?p*vw/C:0}};
    const A=acts.map(a=>Object.assign(a,{__m:main(a),__u:U(a)}));
    for(const a of A){const c=a.c||{};if(!(c.bac<0))continue;const S1={n:a.__n,bac:-c.bac,p:a.__u.p,k:typeof cardCost==='function'?cardCost(a):2,suc:-(c.suc<0?c.suc:0),Vw:+a.__u.vw.toFixed(2),Vl:0};
     if(!(a.__u.vw>0)){rows.push({src:'act',id:a.__f+' · '+a.__n,rank:rk,sil:S1,alt:null,gap:null,note:'UNPRICED (gain only in words: '+T(a.x||'').slice(0,60)+')'});continue}
     const free=A.filter(b=>b!==a&&b.__m===a.__m&&!((b.c||{}).bac<0)&&b.__u.eff>0&&!b.lock).sort((x,y)=>y.__u.eff-x.__u.eff)[0];
     if(!free){rows.push({src:'act',id:a.__f+' · '+a.__n,rank:rk,sil:S1,alt:null,gap:null,note:'NO ACT WITHOUT SILVER for '+a.__m});continue}
     const A1={n:free.__n,bac:0,p:free.__u.p,k:typeof cardCost==='function'?cardCost(free):2,suc:-((free.c||{}).suc<0?free.c.suc:0),Vw:+free.__u.vw.toFixed(2),Vl:0};
     rows.push({src:'act',id:a.__f+' · '+a.__n+' ['+a.__m+']',rank:rk,sil:S1,alt:A1,price:+(S1.bac*vB(S.rank)).toFixed(2),es:+a.__u.eff.toFixed(3),ea:+free.__u.eff.toFixed(3),gap:+(free.__u.eff/a.__u.eff-1).toFixed(2),note:'value per khắc'})}}
  }
  return out},[VAL]);
 R.errs=errs;fs.writeFileSync(OUT,JSON.stringify(R,null,1));
 const L=['| source | choice | rank | bạc | silver road (odds, khắc, Sức) | other road (odds, khắc, Sức, other) | price (khắc) | E silver | E other | gap | verdict |','|---|---|---|---|---|---|---|---|---|---|---|'];
 const vd=g=>g==null?'NO ROAD':g>0.3?'other road obvious':g<-0.3?'silver obvious':'ok (hesitate)';
 for(const r of R.rows)L.push(`| ${r.src} | ${r.id} | ${r.rank} | ${r.sil.bac} | ${r.sil.p}%, ${r.sil.k}k, Sức ${r.sil.suc} | ${r.alt?`${r.alt.p}%, ${r.alt.k}k, Sức ${r.alt.suc}${r.alt.other?`, +${r.alt.other.toFixed(1)}k`:''}`:'—'} | ${r.price??''} | ${r.es??''} | ${r.ea??''} | ${r.gap??''} | ${r.gap==null?(r.note||'NO ROAD'):vd(r.gap)} |`);
 const n=R.rows.length,bad=R.rows.filter(r=>r.gap==null||Math.abs(r.gap)>0.3);
 const by={};for(const r of R.rows){const k=r.src+' r'+r.rank;by[k]=by[k]||{n:0,ok:0,alt:0,sil:0,none:0,unp:0};by[k].n++;if(r.gap==null){if(/UNPRICED/.test(r.note))by[k].unp++;else by[k].none++}else if(r.gap>0.3)by[k].alt++;else if(r.gap<-0.3)by[k].sil++;else by[k].ok++}
 console.log('values (khắc):',JSON.stringify(R.vals));console.log('| group | pairs | ok | other road obvious | silver obvious | no road | unpriced |\n|---|---|---|---|---|---|---|');
 for(const [k,v] of Object.entries(by))console.log(`| ${k} | ${v.n} | ${v.ok} | ${v.alt} | ${v.sil} | ${v.none} | ${v.unp} |`);
 console.log(`total ${n}, off by >30%: ${bad.length}, errors ${JSON.stringify(errs.slice(0,3))}`);fs.writeFileSync(OUT.replace(/\.json$/,'.md'),L.join('\n')+'\n');
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
