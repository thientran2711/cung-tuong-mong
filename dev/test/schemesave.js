/* old saves load: a life started and played on the OLD build (<oldURL>) is saved to slot 3, then the NEW build (<newURL>, same origin) loads it.
   Also a save holding a pending scheme choice (PEND sgpick) reloads into the same choice.  usage: node dev/test/schemesave.js <oldURL> <newURL> */
const {chromium}=require('playwright');const [,,OLD,NEW]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:686,height:880}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(OLD);await p.waitForTimeout(2500);
 const o=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();try{nlAccept(false)}catch(e){}Q.length=0;quiet=false;save();return{name:S.name,week:S.week,bac:S.bac,keys:Object.keys(localStorage),has:!!localStorage.getItem(SK(3))}});
 console.log(JSON.stringify(o));await p.goto(NEW);await p.waitForTimeout(2500);console.log(await p.evaluate(()=>[Object.keys(localStorage),typeof SK==="function"&&SK(3)]));
 const n=await p.evaluate(()=>{const d=loadSlot(3);const ok=!!d;SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;deal();showModal();return{ok:!!ok,name:S&&S.name,week:S&&S.week,bac:S&&S.bac,sg:typeof SG}});
 await p.evaluate(()=>{render()});await p.waitForTimeout(500);
 /* pending scheme choice survives save/load */
 const q=await p.evaluate(()=>{Q.length=0;const i=rivals.findIndex(v=>v.alive&&!v.out&&!v.queen);const d=mkP('sgpick',{j:'act',v:rivals[i].id,k:'spy'});pushDil(d,'Dò la');save();Q.length=0;quiet=true;deser(loadSlot(3));quiet=false;showModal();return{q:Q.length,pid:Q[0]&&Q[0].pid,opts:Q[0]&&Q[0].opts.map(o=>o.n)}});
 console.log(JSON.stringify({old:o,loaded:n,pending:q,errs},null,1));await b.close()})();
