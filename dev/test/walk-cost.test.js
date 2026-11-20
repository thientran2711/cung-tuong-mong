/* WALK COST «về nhà» (review/walk-cost, ORDER MAIN ROOT-76 20/11; owner OD 19/11 ~22:00Z «tôi bấm về nhà là tốn một khắc»; law 1 two-way, law 4 one core)
   node dev/test/walk-cost.test.js [dev/index.html]
   1 the road home costs what the road out cost (j2 goTo / j9 travel, BAL.walk) — 3 places
   2 shown = charged: the Dư đồ home spot / j15 «Về tẩm cung thăm con» print the same khắc goTo charges
   3 too few khắc → the walk home spills into the next buổi (j9 walkSpill) and she is home in the new buổi
   4 a forced move (escorted home: window.__walkFree) charges nothing
   5 NPCs (jwalk): a far move in the record has its «on the way» khắc; fewer bare far jumps than with BAL.walk.npc = 0
   6 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const boot=`localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}window.__bot=1;Q.length=0;S.confined=0;`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(boot=>{eval(boot);const o={rows:[]};
  const home=()=>{used=0;S.buoi=0;S.place="home";S.visit={k:"home",people:[],talked:false,tk:{}}};
  const go=(fn,k)=>{Q.length=0;try{S.ent={d:j95sDay(),ids:[],at:k}}catch(x){}window.__accSilent=1;const u0=used;try{fn(k)}finally{Q.length=0;window.__accSilent=0}return used-u0};
  for(const k of ["vuon","tyv","ksp","thu"]){home();const out=go(goTo,k);if(S.place!==k){o.rows.push({k,skip:1});continue}
   const tc=travel(k,"home");let shown=null;try{tab="go";render();const sp=document.querySelector('[data-go="home"]')||[...document.querySelectorAll('[data-go]')].find(e=>/ngươi ở/.test(e.getAttribute("title")||""));shown=sp?((sp.getAttribute("title")||"").match(/đi (\d+) khắc/)||[])[1]:null}/* the walk part (a phối điện home is drawn on the chủ vị's palace spot, jres; «bái kiến» is that palace's own greeting) */catch(e){}
   let j15=null;try{j15=`${travel(S.place,"home")}`}catch(e){}
   const back=go(goTo,"home");o.rows.push({k,out,back,tc,at:S.place,shown,j15})}
  /* 3 spill */
  home();go(goTo,"vuon");used=BAL.time.khac-1;const b0=S.buoi||0;o.need=travel("vuon","home");Q.length=0;walkGo("home");o.spill={w:window.__walkSpill?{rest:window.__walkSpill.rest,b:window.__walkSpill.b}:null,b0};
  return o},boot);
 for(let i=0;i<10;i++){await p.waitForTimeout(400);await p.evaluate(()=>{Q.length=0;S.mg=0;const m=document.getElementById("modal");if(m)m.hidden=true})}/* the buổi-turn news card is closed, as a player would */const s3=await p.evaluate(()=>({at:S.place,b:S.buoi,w:!!window.__walkSpill}));
 r.forced=await p.evaluate(()=>{used=0;S.buoi=0;S.place="home";S.visit={k:"home",people:[],talked:false,tk:{}};Q.length=0;try{S.ent={d:j95sDay(),ids:[],at:"vuon"}}catch(x){}window.__accSilent=1;goTo("vuon");window.__accSilent=0;Q.length=0;
  const u4=used;window.__walkFree=1;try{goTo("home")}finally{window.__walkFree=0}return{cost:used-u4,at:S.place,from:"vuon"}});
 for(const x of r.rows){if(x.skip){console.log('skip',x.k);continue}
  ok(x.at==="home"&&x.back===x.out&&x.back===x.tc&&x.back>0,`1 ${x.k}: out ${x.out} = back ${x.back} = travel ${x.tc}`);
  ok(x.shown!=null&&+x.shown===x.back,`2 ${x.k}: Dư đồ home spot shows ${x.shown} khắc = charged ${x.back}`,x.j15)}
 ok(r.rows.filter(x=>!x.skip).length>=2,'1 at least 2 places measured');
 if(r.need>1)ok(r.spill.w&&r.spill.w.rest===r.need-1&&r.spill.w.b===r.spill.b0+1,'3 walk home with 1 khắc left spills into the next buổi',r.spill);else console.log('skip 3 (near home)');
 if(r.need>1)ok(s3.at==="home"&&!s3.w,'3 she is home in the new buổi',s3);
 ok(r.forced.cost===0&&r.forced.at==="home",'4 forced move home charges nothing',r.forced);
 /* 5 NPCs */
 const scan=async off=>{await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);return p.evaluate(([boot,off])=>{eval(boot);if(off)BAL.walk.npc=0;const o={far:0,bad:0};
  for(let s=0;s<16;s++){Q.length=0;S.mg=0;for(let u=0;u<4;u++){used=u;try{j95sync()}catch(e){}}const R=S.roster;if(R&&R.P)for(const id in R.P){if(id==="me")continue;const row=R.P[id];if(!Array.isArray(row))continue;
    for(let j=1;j<row.length;j++){const x=row[j];if(!x||x[0]==null||x[1]==="go"||(x[1]==="follow"&&x[2]==="me"))continue;let q=j-1,g=0;while(q>=0&&row[q]&&row[q][0]===x[0]&&row[q][1]==="go"){g++;q--}
     if(q<0||!row[q]||row[q][0]==null||row[q][0]===x[0])continue;const t=travel(row[q][0],x[0]);if(t<2)continue;o.far++;if(g<t-1)o.bad++}}
   try{nextBuoi()}catch(e){}}o.errs=JWALK.errs;return o},[boot,off])};
 const off=await scan(true),on=await scan(false);
 ok(on.far>0&&on.bad/on.far<off.bad/Math.max(1,off.far)&&on.bad/on.far<=0.4,'5 NPC far moves without «on the way» khắc: on '+on.bad+'/'+on.far+' vs off '+off.bad+'/'+off.far);
 ok(!on.errs.length,'5 jwalk pass no errors',on.errs);
 ok(!errs.length,'6 no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:'ALL OK');process.exit(n?1:0)})();
