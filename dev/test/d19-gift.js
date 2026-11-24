/* d19-gift (review/d19-gift-work, owner OD:L752): "Biếu quà làm lành" = ONE act with three roads — lễ bạc / a handmade work / an item.
   Checks: the act card opens ONE choice of three kit option cards; each road runs (bạc spent / piece given, ghen + oán eased, result logged
   with Được AND Mất); pieces not enough are greyed with the reason; an old save's pending picker (no kind) still opens; an NPC uses the same
   rule (tsNpcGift); VALUE PARITY TABLE: bạc share vs work vs item for several receivers (tastes, traits) — cost to her in bạc (econPrice, the
   ONE sale API) and what the receiver gets.  Shots (Fold + iPad) of the option cards go OUTSIDE the repo.
   usage: node dev/test/d19-gift.js [outdir]      exit 1 on any FAIL */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const D=require('./lib/device');const out=process.argv[2]||'/home/user/wt/d19-shots';require('fs').mkdirSync(out,{recursive:true});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const R={};const F=[];
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
  const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);const r={};
  r.start=await g.evaluate(()=>{try{SLOT=3;document.getElementById('title').hidden=true;start();try{NLP=null}catch(e){}Q.length=0;{const k=document.getElementById('kload');if(k)k.hidden=true;const m=document.getElementById('modal');if(m)m.hidden=true}try{render()}catch(e){}return {rank:S.rank,rivals:rivals.length}}catch(e){return{err:String(e)}}});
  try{await g.waitForSelector('#kroul',{timeout:20000});await p.waitForTimeout(1500);await g.evaluate(()=>{const b=[...document.querySelectorAll('#kroul button')].find(x=>/Bỏ qua/.test(x.textContent));b&&b.click()});await g.waitForSelector('#kroul',{state:'detached',timeout:20000})}catch(e){r.rouErr=String(e).slice(0,80)}
  await p.waitForTimeout(1500);await g.evaluate(()=>{document.querySelectorAll('.krbox,#kroul').forEach(x=>{const o=x.id==='kroul'?x:x.parentElement;o&&o.remove()});const c=document.getElementById('curtain');if(c)c.hidden=true;Q.length=0;try{NLP=null}catch(e){}const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}render()});
  /* --- the act + the three roads --- */
  r.roads=await g.evaluate(()=>{try{const G=BAL.tsGift;const ref0=BAL.dis&&BAL.dis.refuse;if(BAL.dis)BAL.dis.refuse=0;/* review r1: the random jdis refusal is tested on its own below */const V=rivals.filter(x=>x.alive!==false&&!x.out&&!x.queen&&!traitsOf(x).includes("Kiêu ngạo")&&!traitsOf(x).includes("Tham vọng")).slice(0,3);V.forEach(v=>{v.ghen=40;oanAdd(v,S,30)});
   const liked=Object.keys(IT).filter(k=>Array.isArray(IT[k].tg)&&IT[k].tg.includes("rv")&&IT[k].pr>=20&&IT[k].pr<=80&&!IT[k].il&&!IT[k].keep&&!IT[k].nt).slice(0,2);
   S.inv=S.inv.filter(e=>e.h);for(const k of liked)S.inv.push({k});
   S.inv.push({k:"tp",wk:{kind:"theu",a:"hoa",ti:2,q:6,n:"Khăn thêu uyên ương",m:1,bn:"ngươi",d:"x",lv:2}});S.inv.push({k:"tp",wk:{kind:"theu",a:"hoa",ti:0,q:1,n:"Khăn thêu tạm",m:0,bn:"ngươi",d:"x"}});
   const Dx={top:V.map((v,i)=>({v,q:.3-i*.05,b:2})),n:40,unk:0};const act=tsOptGifts(Dx);
   S.bac=200;const d=PEND.tsgift({L:V.map(v=>v.id)});const names=d.o.map(o=>o.n);
   const res={act:act&&{n:act.n,x:act.x,dis:act.tsDis},names,cards:d.o.map(o=>({n:o.n,x:o.x,dis:!!o.tsDis,need:(o.need||[]).map(n=>n.t+(n.ok?"":" ✗"))}))};
   /* road 1: bạc */
   const g0=V.map(v=>[v.ghen,oan(v,S)]),b0=S.bac;apply(d.o[0].fx);d.o[0].go();res.bac={spent:b0-S.bac,want:V.length*G.bac,ghen:V.map((v,i)=>g0[i][0]-v.ghen),oan:V.map((v,i)=>g0[i][1]-oan(v,S)),log:plain(S.logs[0]||"")};
   /* road 2: a work → the picker → give */
   const v=V[0];const pw=PEND.tsgiftpick({v:v.id,k:"wk"});res.wkPick=pw.o.map(o=>({n:o.n,x:o.x,dis:!!o.tsDis,need:(o.need||[]).map(n=>n.t)}));
   const iw=pw.o.findIndex(o=>o.ik!=null&&!o.tsDis);if(iw>=0){const G1=[v.ghen,oan(v,S),aff(v,S)],n0=S.inv.length;pw.o[iw].go();res.wk={gave:pw.o[iw].n,ghen:G1[0]-v.ghen,oan:G1[1]-oan(v,S),aff:aff(v,S)-G1[2],inv:n0-S.inv.length,log:plain(S.logs[0]||"")}}else res.wk={none:true};
   /* road 3: an item */
   const pi=PEND.tsgiftpick({v:v.id,k:"it"});res.itPick=pi.o.map(o=>({n:o.n,x:o.x,dis:!!o.tsDis,need:(o.need||[]).map(n=>n.t)}));
   const ii=pi.o.findIndex(o=>o.ik!=null&&!o.tsDis);if(ii>=0){const G1=[v.ghen,oan(v,S),aff(v,S)],n0=S.inv.length;pi.o[ii].go();res.it={gave:pi.o[ii].n,ghen:G1[0]-v.ghen,oan:G1[1]-oan(v,S),aff:aff(v,S)-G1[2],inv:n0-S.inv.length,log:plain(S.logs[0]||"")}}else res.it={none:true};
   /* review r1: a refused piece (jdis: it stays in her chest) eases nothing and the log says so (no free peace) */
   {S.inv.push({k:"tp",wk:{kind:"theu",a:"hoa",ti:2,q:6,n:"Khăn thêu thử",m:1,bn:"ngươi",d:"x",lv:2}});const g0=giveTo;giveTo=function(){return "Nàng không nhận. "};
    try{const pr=PEND.tsgiftpick({v:v.id,k:"wk"});const j=pr.o.findIndex(o=>o.n&&/Khăn thêu thử/.test(o.n)&&!o.tsDis);const G1=[v.ghen,oan(v,S)],n0=S.inv.length;if(j>=0)pr.o[j].go();
     res.refused={found:j>=0,ghen:G1[0]-v.ghen,oan:G1[1]-oan(v,S),inv:n0-S.inv.length,log:plain(S.logs[0]||"")}}finally{giveTo=g0}}
   if(BAL.dis)BAL.dis.refuse=ref0;
   /* old save: a pending picker saved before this branch has no kind */
   const po=PEND.tsgiftpick({v:v.id});res.old={n:po&&po.o.length};
   /* the act is greyed only when no road is open */
   S.bac=0;S.inv=S.inv.filter(e=>e.h);const a0=tsOptGifts(Dx);res.noRoad={dis:a0.tsDis,need:a0.need.map(n=>n.t)};S.bac=200;
   return res}catch(e){return{err:String(e.stack||e)}}});
  /* --- NPC: the same rule --- */
  r.npc=await g.evaluate(()=>{try{const L=rivals.filter(x=>x.alive!==false&&!x.out);const a=L[3]||L[1],v=L[4]||L[2];a.ro=a.ro||{};v.ro=v.ro||{};
   const k=Object.keys(IT).find(k=>{const w=tsGiftWorth({k},v,a);return w.ok&&w.bac<=BAL.tsGift.bac});a.inv=(a.inv||[]).filter(e=>e.h);a.inv.push({k});
   oanAdd(v,a,30);const o0=oan(v,a),n0=a.inv.length,vi0=(v.inv||[]).length,b0=a.bac;const t=tsNpcGift(a,{top:[{v,q:.3,b:2}],n:30,unk:0});
   const r1={item:k,txt:plain(t||""),oan:o0-oan(v,a),aInv:n0-a.inv.length,vInv:(v.inv||[]).length-vi0,bac:b0-a.bac};
   /* no piece: bạc */
   a.inv=a.inv.filter(e=>e.h);a.bac=100;const o1=oan(v,a);const t2=tsNpcGift(a,{top:[{v,q:.3,b:2}],n:30,unk:0});r1.bacRoad={txt:plain(t2||""),oan:o1-oan(v,a),bac:100-a.bac};
   return r1}catch(e){return{err:String(e.stack||e)}}});
  /* --- VALUE PARITY TABLE (bạc vs work vs item, several receivers) --- */
  if(dev==='fold')r.parity=await g.evaluate(()=>{try{const G=BAL.tsGift;const V=rivals.filter(x=>x.alive!==false&&!x.out).slice(0,6);const rows=[];
   const items=Object.keys(IT).filter(k=>IT[k].pr&&!IT[k].il&&!IT[k].keep&&!IT[k].nt&&Array.isArray(IT[k].tg)).sort((a,b)=>IT[a].pr-IT[b].pr);
   const pickI=[items.find(k=>IT[k].tg.includes("rv")&&IT[k].pr>=20),items.find(k=>IT[k].tg.includes("rv")&&IT[k].pr>=100),items.find(k=>!IT[k].tg.includes("rv")&&IT[k].pr>=20&&IT[k].pr<=60),items.find(k=>!IT[k].tg.includes("rv")&&IT[k].pr>=100)].filter(Boolean);
   const works=[0,1,2,3].map(ti=>({k:"tp",wk:{kind:"theu",a:"hoa",ti,q:ti*2+1,n:`Khăn thêu (${WTIER[ti]})`,m:0,bn:"ngươi",d:"x",lv:2}}));
   for(const v of V){const tr=traitsOf(v).join(", ");rows.push({who:v.name,traits:tr,road:"Lễ bạc",piece:`${G.bac} bạc`,q:G.bac,ok:true,bac:G.bac,rel:G.aff});
    for(const e of works){const w=tsGiftWorth(e,v,S);let rel="";try{const ev=wkEval(S,e.wk,v);rel=ev.ok?ev.rel:""}catch(x){}rows.push({who:v.name,traits:tr,road:"Tác phẩm",piece:e.wk.n,q:w.wb,ok:w.ok,bac:w.bac,rel,why:w.why,note:w.note})}
    for(const k of pickI){const e={k};const w=tsGiftWorth(e,v,S);rows.push({who:v.name,traits:tr,road:"Đồ",piece:`${IT[k].n} (${IT[k].pr} bạc${IT[k].tg.includes("rv")?", phi tần ưa":""})`,q:w.wb,ok:w.ok,bac:w.bac,rel:w.ok?giftVal(Object.assign({k},IT[k]),v)+3:"",why:w.why,note:w.note})}}
   return{eq:G.eq,bacShare:G.bac,rows}}catch(e){return{err:String(e.stack||e)}}});
  /* --- shots: the three option cards, then the work picker (scratch, LOOK at them) --- */
  await g.evaluate(()=>{try{Q.length=0;const V=rivals.filter(x=>x.alive!==false&&!x.out&&!x.queen&&!traitsOf(x).includes("Kiêu ngạo")).slice(0,3);V.forEach(v=>{v.ghen=40});S.bac=60;
   S.inv.push({k:"tp",wk:{kind:"theu",a:"hoa",ti:2,q:6,n:"Khăn thêu uyên ương",m:1,bn:"ngươi",d:"x",lv:2}});S.inv.push({k:"tp",wk:{kind:"theu",a:"hoa",ti:0,q:1,n:"Khăn thêu tạm",m:0,bn:"ngươi",d:"x"}});
   pushDil(mkP("tsgift",{L:V.map(v=>v.id)}),"Biếu quà làm lành");showModal()}catch(e){console.error(e)}});
  await p.waitForTimeout(900);await p.screenshot({path:`${out}/${dev}-d19-roads.png`});
  r.cardsDom=await g.evaluate(()=>[...document.querySelectorAll('#modal .opts > button')].map(b=>({t:(b.textContent||"").replace(/\s+/g," ").trim().slice(0,160),dis:b.disabled,w:b.scrollWidth>b.clientWidth+2})));
  await g.evaluate(()=>{try{Q.length=0;const v=rivals.filter(x=>x.alive!==false&&!x.out&&!x.queen&&!traitsOf(x).includes("Kiêu ngạo"))[0];pushDil(mkP("tsgiftpick",{v:v.id,k:"wk"}),"Biếu quà làm lành");showModal()}catch(e){console.error(e)}});
  await p.waitForTimeout(900);await p.screenshot({path:`${out}/${dev}-d19-pick.png`});
  const cardShots=async(tag,n)=>{const bs=await g.$$('#modal .opts > button');for(let i=0;i<Math.min(n,bs.length);i++){try{await bs[i].scrollIntoViewIfNeeded();await bs[i].screenshot({path:`${out}/${dev}-d19-${tag}${i}.png`})}catch(e){}}};
  await cardShots('pickcard',2);
  await g.evaluate(()=>{try{Q.length=0;const V=rivals.filter(x=>x.alive!==false&&!x.out&&!x.queen&&!traitsOf(x).includes("Kiêu ngạo")).slice(0,3);pushDil(mkP("tsgift",{L:V.map(v=>v.id)}),"Biếu quà làm lành");showModal()}catch(e){console.error(e)}});
  await p.waitForTimeout(900);await cardShots('card',3);
  r.errs=errs;R[dev]=r;await ctx.close();
  /* verdicts */
  const x=r.roads||{};const ck=(c,m)=>{if(!c)F.push(`${dev}: ${m}`)};
  ck(!x.err,'roads threw '+x.err);ck(x.act&&x.act.n==="Biếu quà làm lành"&&!x.act.dis,'act card');
  ck(JSON.stringify(x.names)===JSON.stringify(["Lễ bạc","Tác phẩm tự tay làm","Đồ trong rương","Thôi"]),'three roads + Thôi: '+JSON.stringify(x.names));
  ck(x.bac&&x.bac.spent===x.bac.want&&x.bac.ghen.every(n=>n===8)&&x.bac.oan.every(n=>n>0)&&/Mất:/.test(x.bac.log)&&/Được:/.test(x.bac.log),'bạc road '+JSON.stringify(x.bac));
  ck(x.wk&&x.wk.inv===1&&x.wk.ghen===8&&x.wk.oan>0&&x.wk.aff>0&&/Mất:/.test(x.wk.log),'work road '+JSON.stringify(x.wk));
  ck(x.wkPick&&x.wkPick.some(o=>o.dis&&o.need.length),'a work not enough is greyed with its reason');
  ck(x.it&&x.it.inv===1&&x.it.ghen===8&&x.it.oan>0&&x.it.aff>0&&/Mất:/.test(x.it.log),'item road '+JSON.stringify(x.it));
  ck(x.refused&&x.refused.found&&x.refused.ghen===0&&x.refused.oan===0&&x.refused.inv===0&&/không thành/.test(x.refused.log),'refused piece eases nothing '+JSON.stringify(x.refused));
  ck(x.old&&x.old.n>1,'old-save picker (no kind) opens');ck(x.noRoad&&x.noRoad.dis,'act greyed when no road is open');
  const n=r.npc||{};ck(!n.err&&n.aInv===1&&n.vInv===1&&n.oan>0&&n.bac===0,'NPC piece road '+JSON.stringify(n));ck(n.bacRoad&&n.bacRoad.bac>0&&n.bacRoad.oan>0,'NPC bạc road '+JSON.stringify(n.bacRoad));
  ck(!errs.length,'page errors '+errs.join(' | '));ck((r.cardsDom||[]).length===3&&!(r.cardsDom||[]).some(c=>c.w),'3 cards (Thôi = kit ✕), no overflow '+JSON.stringify(r.cardsDom));
 }
 /* parity table (markdown) */
 const P=R.fold&&R.fold.parity;if(P&&P.rows){const L=[`| Receiver | Traits | Road | Piece | Worth to her, bạc (need ≥ ${P.bacShare}) | Enough | Cost to the giver (bạc, sale price) | Thiện cảm | Why not / note |`,'|---|---|---|---|---|---|---|---|---|'];
  for(const x of P.rows)L.push(`| ${x.who} | ${x.traits||""} | ${x.road} | ${x.piece} | ${x.q} | ${x.ok?"yes":"no"} | ${x.bac} | ${x.rel} | ${x.why||x.note||""} |`);require('fs').writeFileSync(`${out}/parity.md`,L.join('\n')+'\n')}
 console.log(JSON.stringify(R,null,1));console.log(F.length?`D19-GIFT FAIL ${F.length}:\n - `+F.join('\n - '):'D19-GIFT PASS');await b.close();srv.close();process.exit(F.length?1:0)})();
