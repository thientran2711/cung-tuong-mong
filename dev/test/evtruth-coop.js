/* review/evidence-truth-r1: co-op — the friend's wrongs ledger travels in her blob, so (1) true evidence I hold on a GUILTY friend is
   not swept into rumour, (2) evidence on a CLEAN friend still is, (3) an NPC spy can find the guilty friend's real deed.
   One page, no server: builds the canonical C with COOPW.toCanon, adds seat b from my own blob, rebuilds with COOPW.fromCanon.
   usage: NODE_PATH=$(npm root -g) node dev/test/evtruth-coop.js http://127.0.0.1:PORT/index.html */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:755}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.COOPW&&COOPW.toCanon);await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name);await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{Q.length=0;const CW=COOPW;CW.seat="a";const out={};
  const mk=guilty=>{const C=CW.toCanon();const B=JSON.parse(JSON.stringify(C.P.a));B.pid=902;B.name="Hảo Hữu";B.S.name="Hảo Hữu";
   B.S.wrongs=guilty?[{k:"poison",t:null,w:2,at:wk(),x:"bỏ độc vào trà người khác"}]:[];B.S.dw=guilty?2:0;B.S.schemes=guilty?1:0;B.S.dws=guilty?1:0;C.P.b=B;
   S.cev=S.cev||{};C.P.a.S.cev={902:2};return C};
  for(const g of [true,false]){const C=mk(g);CW.fromCanon(C);const f=rivals.find(v=>v.coop);const n=g?"guilty":"clean";
   out[n]={friend:!!f,ev0:f&&evG(S,f),cap:f&&deedCap(f)};evTruthSweep();out[n].evAfterSweep=f&&evG(S,f);out[n].rum=f&&rumG(S,f);
   const v=liveRivals(false).find(x=>!x.coop);if(v&&f){v.evm=v.evm||{};v.evm[key(f)]=0;const R0=Math.random;Math.random=()=>0.01;let t="";try{t=spyFind(v,f)}finally{Math.random=R0}out[n].npcSpy=t.replace(/<[^>]+>/g,"");out[n].npcEv=evG(v,f)}}
  return out});
 console.log(JSON.stringify({r,errs},null,1));
 const ok=r.guilty.friend&&r.guilty.evAfterSweep===2&&r.guilty.rum===0&&r.guilty.npcEv>=1&&r.clean.friend&&r.clean.evAfterSweep===0&&r.clean.npcEv===0&&!errs.length;
 console.log(ok?"PASS":"FAIL");await b.close();process.exit(ok?0:1)})();
