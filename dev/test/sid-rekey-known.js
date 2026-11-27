/* flight-sid-rebirth-r (review, law 6b): a reborn seat's own household is rekeyed at the join (jcoopworld lifeRekey: servant sid / «x<n>»
   past every id the world holds). The new life's j61 levels were written BEFORE the join under the old keys (k61InitNew runs inside start,
   attach after it), so they must move with the id: her own servant stays known, the old-world person on the old key stays a stranger.
   Before the review fix: her servant «Người lạ» (no level on the new key), the world servant on the old key «Quen biết» (3).
   usage: node dev/test/sid-rekey-known.js <page url | file>   Exit 1 on failure. */
const {chromium}=require('playwright');const path=require('path');const [,,U]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:900}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
 await p.goto(/^https?:/.test(U)?U:'file://'+path.resolve(U));await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
  for(let i=0;i<20;i++){try{nlNew()}catch(e){}start();if(S&&S.ps)break}Q.length=0;$("modal").hidden=true;
  if(!window.COOPW||typeof COOPW.lifeRekey!=='function')return{err:'no COOPW.lifeRekey hook'};k61S();
  /* a world servant (another consort's) and one of HER servants on the same sid, as a new life joining an old world gives */
  const mine=new Set([S.maid].concat(S.staff||[]).filter(Boolean));const w=allServ().find(s=>s&&s.sid!=null&&!mine.has(s)&&+s.sid<900);
  let own=(S.staff||[])[0];if(!own){own={name:'Tiểu Thử',sid:null,loyal:50,af:{}};S.staff=(S.staff||[]).concat(own)}
  if(!w)return{err:'no world servant'};own.sid=w.sid;for(const k in KREG)delete KREG[k];
  const k0=kOf61(own);S.known[k0]=3;/* k61InitNew: her own household known; the world servant on that key shares it before the fix */
  COOPW.lifeRekey();for(const k in KREG)delete KREG[k];
  const kOwn=kOf61(own),kW=kOf61(w);return{k0,kOwn,kW,own:S.known[kOwn]|0,world:S.known[kW]|0,sidOwn:own.sid,sidW:w.sid}});
 console.log(JSON.stringify(r),errs.length?errs:'');
 const ok=r&&!r.err&&r.kOwn!==r.kW&&r.own===3&&r.world<3&&!errs.length;
 console.log(ok?'SID-REKEY-KNOWN PASS':'SID-REKEY-KNOWN FAIL');await b.close();process.exit(ok?0:1)})();
