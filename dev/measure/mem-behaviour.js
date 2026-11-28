/* review/mem-upgrade measure: does behaviour change with memory? Same controlled cases on two builds (before = main, after = this branch),
   then a natural run (sensible bot dev/measure/inpage4.js, seeded) on each build: memories formed, lifelong ones, cause records by family.
   usage: node dev/measure/mem-behaviour.js <urlBefore> <urlAfter> [botSteps=6]   → JSON to stdout */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,A,B,NS]=process.argv;const STEPS=+NS||6;const INP=fs.readFileSync(path.join(__dirname,'inpage4.js'),'utf8');
const CASES=()=>{const out={};const L=liveRivals(true).filter(v=>!v.queen);const v=L[0];const R0=Math.random;
 const fresh=x=>{x.mem={};x.cz={};x.oan=0;x.rel=0;x.ghen=0;x.slightAt=null;x.blamed={};for(const k in x.ro)x.ro[k]=0;for(const k in x.rl)x.rl[k]=0;try{delete S.mem[x.id+"|me"]}catch(e){}};
 const sv=(x,t)=>{x.trait=t[0];x.trait2=t[1]||null};
 /* M1 target: share of v's target picks that fall on her, no memory vs a remembered rumour */
 fresh(v);sv(v,["Kiêu ngạo"]);const pk=()=>{let n=0;for(let i=0;i<3000;i++)if(pickTarget(v)===S)n++;return +(n/3000).toFixed(3)};out.M1_target_her={none:pk()};memAdd(v,S,"rumor");out.M1_target_her.rumourRemembered=pk();
 /* M2 will to harm: band of danger(v,her) after she poisoned v (Oán 70), then 24 months of fade + Oán decay */
 fresh(v);sv(v,["Kiêu ngạo"]);v.oan=70;memAdd(v,S,"poison");const b0=bandOf(danger(v,S));for(let i=0;i<24;i++){S.turn++;memFade();oanMonth()}
 out.M2_band_after_poison={month0:b0,month24:bandOf(danger(v,S)),oan24:v.oan,mem24:(memTop(v,S)||{}).g};
 /* M3 revenge in kind: share of "rumor" in v's act menu at Oán 65, before / after remembering her rumour */
 fresh(v);sv(v,["Kiêu ngạo"]);v.oan=65;const sh=k=>{const O=mindMenu(v,S);const x=O.find(o=>o[0]===k);const t=O.reduce((a,b)=>a+b[1],0);return x&&t?+(x[1]/t).toFixed(3):0};
 out.M3_rumor_share={none:sh("rumor")};memAdd(v,S,"rumor");out.M3_rumor_share.remembered=sh("rumor");
 /* M4 everyday kindness: of v's "help" acts, how many go to her, before / after she pardoned v */
 fresh(v);sv(v,["Hiền lành"]);const ct=()=>{let n=0,tot=0;const R={};for(const k in SOC){R[k]=SOC[k].run;SOC[k].run=(a,t)=>{if(k==="help"){tot++;if(t===S)n++}return""}}
  try{for(let i=0;i<3000;i++){v.rel=30;npcSocial(v)}}finally{for(const k in R)SOC[k].run=R[k]}return{toHer:n,helps:tot}};out.M4_help_to_her={none:ct()};memAdd(v,S,"pardon");out.M4_help_to_her.pardoned=ct();
 /* M5 fade by person: weight left of the same rumour (25) after 12 months, per rival (trait → weight) */
 const F=[];for(const x of L.slice(0,8)){fresh(x);memAdd(x,S,"rumor")}for(let i=0;i<12;i++){S.turn++;memFade()}
 for(const x of L.slice(0,8)){const m=memTop(x,S);F.push([[x.trait,x.trait2].filter(Boolean).join("+"),m?m.g:0])}out.M5_rumour_left_12mo=F;
 /* M6 favour never harms: band at Oán 70 with / without a pardon remembered */
 fresh(v);sv(v,["Kiêu ngạo"]);v.oan=70;out.M6_band_oan70={none:bandOf(danger(v,S))};memAdd(v,S,"pardon");out.M6_band_oan70.pardoned=bandOf(danger(v,S));
 return out};
const NAT=()=>{const o={};const H=typeof memHolders==="function"?memHolders():null;let n=0,life=0;const byH={};
 if(H){for(const [hk,M] of H)for(const [a,L] of memPairs(hk,M)){const t=hk==="me"?"her":hk==="emp"?"emp":hk==="th"?"th":hk[0]==="s"?"servant":"consort";for(const m of L){n++;byH[t]=(byH[t]||0)+1;if(m.L)life++}}}
 else for(const k in (S.mem||{})){if(k[0]==="_")continue;n+=(S.mem[k]||[]).length}
 o.memories=n;o.byHolder=byH;o.lifelong=life;
 if(typeof causeQuery==="function"){const C=causeQuery({});o.causes=C.length;const fam={},why={};let noY=0;for(const r of C){fam[r.a]=(fam[r.a]||0)+1;if(!r.y||!r.y.k)noY++;else why[r.y.k]=(why[r.y.k]||0)+1}
  o.causeByAct=fam;o.causeWhy=why;o.withoutReason=noY;o.sample=causeLog({limit:8})}
 return o};
async function run(b,url){const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});
 await ctx.addInitScript(()=>{let s=12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};window.__bot={pre:1}});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const cases=await p.evaluate(`(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv())&&!(typeof isKc==='function'&&isKc()))break}
  Q.length=0;kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3)}catch(e){};return (${CASES.toString()})()})()`);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}start()});await p.evaluate(()=>document.querySelectorAll('.kroul').forEach(e=>e.remove()));await p.evaluate(INP);
 for(let i=0;i<STEPS;i++)await p.evaluate(()=>window.__bot.step('sens',300));
 const nat=await p.evaluate(`(${NAT.toString()})()`);await ctx.close();return{cases,natural:nat,errs:[...new Set(errs)].slice(0,5)}}
(async()=>{const b=await chromium.launch();const R={before:await run(b,A),after:await run(b,B)};console.log(JSON.stringify(R,null,1));await b.close()})();
