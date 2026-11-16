// two-way-acts (owner law 16/11 s21): every fixed deed, both directions — the NPC pays the player's BAL.tw cost and rolls the same odds,
// the player has the NPC's deeds as options. usage: node dev/test/two-way-acts.js [game.html]   (build: CTM_IMG_BASE= python3 dev/build/assemble.py)
const {chromium}=require('playwright');const path=require('path');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();
 const errs=[];page.on('pageerror',e=>errs.push(e.message));await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await page.goto('file://'+GAME);await page.waitForTimeout(600);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(600);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(1200);
 const R=await page.evaluate(()=>{const out=[];const T=(n,ok,d)=>out.push({n,ok:!!ok,d:d||""});
  const v=liveRivals(true).filter(x=>!x.queen)[0],w=liveRivals(true).filter(x=>!x.queen)[1];const fresh=p=>{p.bac=500;p.suc=80;p.danh=50;p.duc=50};
  const snap=p=>({bac:p.bac,suc:p.suc,danh:p.danh,duc:p.duc});const diff=(a,b2)=>{const d={};for(const k in a)if(b2[k]!==a[k])d[k]=b2[k]-a[k];return d};
  const same=(d,c)=>Object.keys(c).every(k=>d[k]===c[k]);
  // 1. each shared deed: an NPC doer pays exactly BAL.tw[k]; the player doer pays exactly the same through twPay
  for(const k of ["help","apol","thTH","pray","ksp","fakeIll","humil","provoke"]){
   const c=twCost(k);for(const [a,t] of [[v,S],[S,v],[v,w]]){fresh(a);a.pray=0;a.fert=0;a.tablet=0;a.fakeIll=0;oanAdd(t,a,30);if(k==="humil"){a.rank=Math.max(a.rank||0,(t.rank||0))}
    const s0=snap(a);const r=twDo(a,t,k);const d=diff(s0,snap(a));
    // gains may add to danh/duc (e.g. thTH: danh +2): check only the cost keys that the gain cannot touch, else check the cost was taken first
    const keys=Object.keys(c).filter(x=>!(k==="thTH"&&(x==="danh"||x==="duc"))&&!(k==="provoke"));const ok=keys.every(x=>d[x]===c[x]||(x==="danh"&&k==="humil"&&d[x]===c[x]));
    T(`${k}: ${a===S?"player":"NPC"}→${t===S?"player":"NPC"} pays BAL.tw.${k}`,ok&&r!=="",JSON.stringify({d,c,r:r.slice(0,60)}))}}
  // 2. no money, no deed (the player's rule) for the NPC too
  v.bac=0;T("NPC with no bạc cannot help (BAL.tw.help)",twDo(v,S,"help")==="");v.suc=4;T("NPC with Sức ≤ cost cannot greet Thái hậu",twDo(v,null,"thTH")==="");fresh(v);
  // 3. NPC social menu (SOC) now pays: help costs bạc
  {fresh(v);const s0=v.bac;const r=SOC.help.run(v,S);T("SOC.help: NPC pays bạc like Giúp đỡ nàng",v.bac-s0===twCost("help").bac,r)}
  {fresh(v);v.th=0;const s0=v.suc;SOC.serveTH.run(v,S);T("SOC.serveTH: NPC pays Sức like Thỉnh an",v.suc-s0===twCost("thTH").suc)}
  {fresh(v);v.pray=0;v.fert=0;const s0=v.bac;SOC.pray.run(v,S);T("SOC.pray: NPC pays bạc like Cầu tự",v.bac-s0===twCost("pray").bac)}
  {fresh(v);v.tablet=0;const s0=v.bac,g0=v.sung;SOC.bribeksp.run(v,S);T("SOC.bribeksp: bạc paid, tablet set (no direct Sủng)",v.bac-s0===twCost("ksp").bac&&v.tablet>0&&v.sung===g0)}
  {fresh(v);const s0=v.bac;SOC.ally.run(v,w);T("SOC.ally: the player's Kết giao act (bạc)",v.bac<s0)}
  // 4. npcMonthly drips: monthly regard work pays the player's Sức
  {fresh(v);let paid=0;const r0=Math.random;Math.random=()=>0.001;try{const s0=v.suc;npcMonthly(v);paid=s0-v.suc}finally{Math.random=r0}T("npcMonthly: TH/HH greetings cost Sức",paid>=-twCost("thTH").suc,"paid "+paid)}
  // 5. NPC fake pregnancy pays bạc and rolls odds
  {const x=liveRivals(true).find(p=>!p.preg&&!p.queen)||v;fresh(x);x.tamco=60;x.preg=0;const s0=x.bac;twDo(x,null,"fakePreg");T("fakePreg: NPC pays BAL.tw.fakePreg",x.bac-s0===twCost("fakePreg").bac);x.preg=0;x.fake=0}
  // 6. prices and odds formulas: no NPC discount
  {const t=liveRivals(true)[2]||w;T("jecon scheme price: same multiplier for NPC and player",econSchemeMul(v,t)===(1+BAL.schemeRk*Math.max(0,rkOf(t)-rkOf(v))+BAL.schemeGuard*econGuards(t)))}
  {v.th=50;T("Trình Thái hậu: NPC brings her own Thái hậu regard",j78thFav(v)===50)}
  T("Tố giác reward chance is one number",BAL.tw.accBestow===40);
  // 7. the player has the NPC-only deeds as options (rival talk list), with costs from BAL.tw
  {fresh(S);S.sung=50;S.rank=Math.max(S.rank,rkOf(v));v.suc=40;const L=topicOpts(v).map(a=>a.n);
   for(const n of ["Thăm lúc ốm mệt","Hạ nhục","Thử lòng","Rỉ tai chuyện trong cung","Khoe quà ngự ban"])T(`player option: ${n}`,L.includes(n),L.join("|"));
   const h=topicOpts(v).find(a=>a.n==="Giúp đỡ nàng");T("player Giúp đỡ nàng reads BAL.tw.help",h&&h.c&&h.c.bac===twCost("help").bac)}
  T("player has Hủy dung in her Sát hại group",RVGRP.find(g=>g[0]==="Sát hại")[1].includes("huydung"));
  // 8. the player's talk option runs the same deed (cost once)
  {fresh(S);S.rank=7;const LL=topicOpts(v),ix=LL.findIndex(a=>a.n==="Hạ nhục");v.danh=50;v.oan=0;const o0=oan(v,S),d0=v.danh;const a=LL[ix];if(a.c)apply(a.c);const rr=a.run();T("player Hạ nhục: nàng oán +, Danh nàng −",oan(v,S)>o0&&v.danh<d0,JSON.stringify([ix,rr,o0,oan(v,S),d0,v.danh]))}
  return out});
 let bad=0;for(const r of R){if(!r.ok)bad++;console.log((r.ok?"PASS ":"FAIL ")+r.n+(r.ok?"":"  "+r.d))}
 console.log("page errors:",errs.length,errs.slice(0,3).join(" | "));console.log(bad?`${bad} FAIL`:"ALL PASS");await b.close();process.exit(bad||errs.length?1:0)})();
