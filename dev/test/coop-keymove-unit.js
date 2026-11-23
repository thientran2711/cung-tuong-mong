/* coop-keymove-unit (review/coop-flakes D20, law 6b ONE person ONE link): COOPW.keyMove + the guest's ask settle (jcoopask remapS) on a blob.
   Root (coop-guest-maid mb-5, LIVE ml-2/3/5): at the merge her link to the stand-in (1001, her own week) and the week's link to the world id
   (11, from 0 on the host) are the same person; remapS kept 11 and dropped 1001 (25 → −3). Now they ADD, clamped by BAL.linkRange (rv: the one range j9 affAdd / oanAdd clamp with); any other number keeps the larger.
   usage: python3 dev/build/assemble.py && node dev/test/coop-keymove-unit.js */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(BASE,{timeout:0,waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>window.COOPW&&COOPW.keyMove&&COOPW.askSettle&&typeof BAL==='object',null,{timeout:0});
 /* rv ONE CORE: j9 affAdd / oanAdd (wrapped many times at run time) read BAL.linkRange in their own source, no typed ±100 / 0…100 */
 const j9=require('fs').readFileSync(require('path').join(__dirname,'../build/j9.js'),'utf8');const fA=(j9.match(/function affAdd\(.*\n/)||[''])[0],fO=(j9.match(/function oanAdd\(.*\n/)||[''])[0];
 const J9OK=/BAL\.linkRange\.rl/.test(fA)&&/BAL\.linkRange\.ro/.test(fO)&&!/-100,100|,0,100\)/.test(fA+fO);
 const R=await p.evaluate(J9OK=>{const out=[];const ck=(n,ok,i)=>out.push([n,!!ok,i==null?"":JSON.stringify(i).slice(0,240)]);const CW=COOPW;const LR=BAL.linkRange;
  ck('BAL.linkRange holds rl and ro (one core)',LR&&LR.rl&&LR.ro,LR);
  ck('affAdd / oanAdd (j9) clamp with BAL.linkRange, no typed bound (one source)',J9OK,null);
  const blob=(S0,real)=>({S:Object.assign({coopAsk:[{id:'1:1001',k:'np',t:1001}]},S0),R:real?[{id:11,coopAsk:'1:1001',alive:true}]:[]});
  const run=d=>{const b0=CW.base;CW.base={P:{a:{S:{askDone:{}}}}};try{CW.askSettle(d)}finally{CW.base=b0}return d.S};
  let s=run(blob({rl:{1001:19,11:-3},ro:{}},1));ck('stand-in 19 + week −3 → 16 (never −3)',s.rl[11]===16&&!('1001' in s.rl),s.rl);
  s=run(blob({rl:{1001:25},ro:{1001:4}},1));ck('no week link: moved as is (25, oán 4)',s.rl[11]===25&&s.ro[11]===4&&!('1001' in s.rl),[s.rl,s.ro]);
  s=run(blob({rl:{1001:90,11:30}},1));ck('rl clamped to BAL.linkRange.rl',s.rl[11]===LR.rl[1],s.rl);
  s=run(blob({rl:{},ro:{1001:70,11:60}},1));ck('ro clamped to BAL.linkRange.ro',s.ro[11]===LR.ro[1],s.ro);
  s=run(blob({rl:{1001:-80,11:-50}},1));ck('rl lower bound',s.rl[11]===LR.rl[0],s.rl);
  s=run(blob({rl:{1001:5},met:{1001:40,11:42},askAt:{1001:41,11:39},known:{1001:true,11:{a:1}}},1));ck('other numbers (week stamps) keep the larger, never a sum (rv: met 40 + 42 → 82); other values keep the one at the world id',s.met[11]===42&&s.askAt[11]===41&&s.known[11]&&s.known[11].a===1&&!('1001' in s.known)&&!('1001' in s.met),[s.met,s.askAt,s.known]);
  s=run(blob({rl:{r1001:7,r11:1}},1));ck('"r"+id keys move too',s.rl.r11===8&&!('r1001' in s.rl),s.rl);
  {const d=blob({rl:{1001:12}},0);const b0=CW.base;CW.base={P:{a:{S:{askDone:{'1:1001':[0,1]}}}}};try{CW.askSettle(d)}finally{CW.base=b0}ck('refused: the stand-in key is dropped, nothing invented',!('1001' in d.S.rl)&&!Object.keys(d.S.rl).length,d.S.rl)}
  {const o={1001:3};CW.keyMove(o,'1001','11','ro');ck('keyMove alone (lens re path): moves',o[11]===3&&!('1001' in o),o);const q={5:2,9:4};CW.keyMove(q,'5','9','rl');ck('keyMove alone: adds',q[9]===6&&!('5' in q),q)}
  return out},J9OK);
 let bad=0;for(const [n,ok,i] of R){if(!ok)bad++;console.log((ok?'ok  ':'FAIL')+' '+n+(ok?'':' '+i))}
 if(errs.length){bad++;console.log('FAIL page errors',errs.slice(0,3))}console.log(`\n${R.length-bad}/${R.length} passed`);await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
