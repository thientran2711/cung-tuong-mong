/* review/staff-cap-apply (owner pick OD 18/11 ~02:15Z: live table A with Quý nhân 2+0, eunuchs from Tần; OD ~02:05Z Nữ đế harem style;
   OD ~02:10Z faces 52 maids / 30 eunuchs / 8 ma ma).
   1. BAL.promo.cap is the owner's table; every printed cap reads it (capLaw, staff tab).
   2. Old save: a Quý nhân household with a eunuch (allowed before) -> he leaves, and she is TOLD (grouped notice / farewell), never silent.
   3. roomFor counts the FIGURE identity pool (FIGIX), not the old face-*.webp files: with every image blocked (old faces "missing")
      the palace still hires; the forced worst palace (OD 17/11 04:32Z chủ vị HH, HQP, QP, Phi x2, Tần x3, every other consort Quý nhân,
      Thái hậu alive) at 12 / 16 / 20 / 24 consorts fills EVERY household to its table row.
   4. Nữ đế (succession path c) keeps BAL.promo.capNd.
   usage: node dev/test/staff-cap-apply.js  (build first: python3 dev/build/assemble.py). PASS/FAIL table; exit 1 on any FAIL. */
const {chromium}=require('playwright');const SV=require('./coop-serve.js');
const T=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':String(x).slice(0,400)]);
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block',reducedMotion:'reduce'});await SV.serve(ctx);
 await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(SV.BASE+'dev/index.html',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});
 await p.waitForFunction(()=>typeof FIGIX!=='undefined'&&FIGIX.maid&&Object.keys(FIGIX.maid).length>0,null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(1500);
 await p.evaluate(()=>{window.__T={
  fresh(o){for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;window.__forceOrigin=o||'muoi';start();window.__nlInner=0;Q.length=0;S.place="home";S.out=0;S.dead=false},
  sv(role,loyal){const s=mkServ(role);s.loyal=loyal;return s},
  told(){const L=[];for(const q of Q){if(!q)continue;const txt=((q.h||'')+' '+JSON.stringify((q.kit&&q.kit.facts)||[])).replace(/<[^>]+>/g,'');if(q.t==="Nội vụ phủ điều người")L.push({kind:q.kit?q.kit.kind:'legacy',txt})}return L}}});
 /* 1. the table */
 const t1=await p.evaluate(()=>({cap:BAL.promo.cap,th:BAL.promo.capTh,nd:BAL.promo.capNd}));
 ok(JSON.stringify(t1.cap)==='[[1,0],[2,0],[2,0],[2,1],[3,1],[3,2],[4,2],[5,2]]'&&JSON.stringify(t1.th)==='[5,2]'&&JSON.stringify(t1.nd)==='[5,3]','BAL.promo.cap = owner final table (QN 2+0, HQP 4+2, HH 5+2); Thái hậu 5+2; Nữ đế 5+3',JSON.stringify(t1));
 const t1b=await p.evaluate(()=>{__T.fresh('muoi');const out=[];for(let r=0;r<8;r++){S.rank=r;out.push(capLaw(capOf(S)))}
  S.rank=2;render();const tab=typeof staffTabHTML==='function'?staffTabHTML().replace(/<[^>]+>/g,' '):'';return{out,tab:(tab.match(/Kẻ hầu:[^·]*·[^ ]* *[^ ]* thái giám/)||[''])[0]}});
 ok(/Quý nhân theo lệ giữ 2 cung nữ .*không có thái giám/.test(t1b.out[2])&&/Tần theo lệ giữ 2 cung nữ .*, 1 thái giám/.test(t1b.out[3])&&/Hoàng hậu theo lệ giữ 5 cung nữ .*, 2 thái giám/.test(t1b.out[7])&&!/%/.test(t1b.out.join('')),'printed law per rank reads the table (capLaw), VANPHONG (no %)',t1b.out.join(' | '));
 ok(/\/2 cung nữ/.test(t1b.tab)&&/\/0 thái giám/.test(t1b.tab),'staff tab at Quý nhân prints x/2 cung nữ · y/0 thái giám',t1b.tab);
 /* 2. old saves at Quý nhân with a eunuch: untrusted (grouped notice) and trusted (farewell) */
 for(const [tag,loy] of [['untrusted',40],['trusted',85]]){
  const r=await p.evaluate(loy=>{__T.fresh('muoi');S.rank=2;S.staff=[__T.sv("maid",loy),__T.sv("eunuch",loy)];const eu=S.staff[1].name;const sv=JSON.stringify(ser());Q.length=0;deser(JSON.parse(sv));render();
   const h=hhHas(S),c=capOf(S),told=__T.told();return{eu,h,c,eunLeft:(S.staff||[]).some(s=>s.role==='eunuch'),told:told.map(t=>t.kind+':'+t.txt.slice(0,160))}},loy);
  ok(!r.eunLeft&&r.h[1]===0&&r.h[0]<=r.c[0]&&r.told.some(t=>t.includes(r.eu.replace(/^(Tiểu|Lão) /,''))),`old save Quý nhân + 1 ${tag} eunuch: he leaves and she is told`,JSON.stringify(r));}
 /* 3. roomFor = FIGIX identity pool, independent of the old face files */
 const r3=await p.evaluate(()=>{__T.fresh('muoi');const fav=Object.keys(FAV).length,favOk=Object.values(FAV).filter(v=>v===1).length;
  return{fav,favOk,maid:Object.keys(FIGIX.maid||{}).length,mama:Object.keys(FIGIX.mama||{}).length,eun:Object.keys(FIGIX.eunuch||{}).length,rm:roomFor('maid'),re:roomFor('eunuch')}});
 ok(r3.maid>=52&&r3.mama>=8&&r3.eun>=30&&r3.favOk===0&&r3.rm&&r3.re,'identity pool 52/30/8 loaded; every old face file blocked (FAV none) and hiring still has room',JSON.stringify(r3));
 for(const N of [12,16,20,24]){
  const r=await p.evaluate(N=>{__T.fresh('muoi');S.rank=2;
   /* forced worst palace: her (Quý nhân) + N-1 NPC consorts; chủ vị seats first */
   const seats=[7,6,5,4,4,3,3,3];rivals.length=0;for(let i=0;i<N-1;i++){const r=i<seats.length?seats[i]:2;const v=newRival(r===7?6:r,r===7);v.rank=r===7?6:r;v.queen=r===7;v.alive=true;v.out=false;v.staff=[];rivals.push(v)}
   S.staff=[];S.thDead=0;
   for(const v of [S].concat(rivals))fillStaff(v,true);
   const short=[];let tot=0;for(const v of [S].concat(rivals)){const c=capOf(v),h=hhHas(v);tot+=h[0]+h[1];if(h[0]<c[0]||h[1]>c[1]||h[1]<c[1]||h[0]>c[0])short.push((v===S?'her':v.name)+' r'+rkOf(v)+' '+h+'/'+c)}
   const th=S.thO&&S.thO.staff?S.thO.staff.length:0;
   return{N,consorts:1+rivals.length,tot,th,short,maidsLeft:roomFor('maid'),eunLeft:roomFor('eunuch')}},N);
  ok(!r.short.length&&r.consorts===N,`worst palace ${N} consorts: every household filled to its table row (old face files blocked)`,JSON.stringify(r));}
 /* 3b. before-fix probe for the report: how many staff maids the OLD face-pool rule would allow */
 const r3b=await p.evaluate(()=>{const n=poolOf('maid').length,ne=poolOf('eunuch').length;return{oldMaidPool:n,oldEunPool:ne}});
 ok(true,'info: old FPOOL sizes (the old cap)',JSON.stringify(r3b));
 /* 4. Nữ đế */
 const r4=await p.evaluate(()=>{__T.fresh('muoi');S.rank=7;S.succ={on:1,p:"c"};const c=capOf(S);S.succ=null;const c2=capOf(S);return{nd:c,hh:c2}});
 ok(JSON.stringify(r4.nd)===JSON.stringify(t1.nd)&&r4.nd[0]>=r4.hh[0]&&r4.nd[1]>=r4.hh[1],'Nữ đế (succession c) reads BAL.promo.capNd, >= the Hoàng hậu row',JSON.stringify(r4));
 ok(!errs.length,'no page errors',errs.join(' | '));
 await b.close();await SV.close&&SV.close();
 for(const r of T)console.log(r.join('\t'));const f=T.filter(r=>r[0]==='FAIL').length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(1)});
