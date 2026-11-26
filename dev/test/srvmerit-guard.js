/* review/srvmerit-guard (MAIN 148 26/11): «Cannot read properties of undefined (reading 'mp') @ srvMerit».
   Root: a hand of cung nữ cards outlives the cung nữ life (the hand is dealt again only by deal(); a life swap that keeps it — co-op rebirth
   through fromCanon, a sổ loaded without deal — leaves cards whose go/run read S.srv). Fix: jsrvguard.js (ONE gate) + srvMerit guard (j42).
   usage: node dev/test/srvmerit-guard.js <game url (file:// or http://)>
   (1) STALE HAND: cung nữ life → a consort sổ deserialised with no deal → every act(i) on the hand: no throw, nothing paid, the hand is dealt
       again for the consort life (no cung nữ card left).
   (2) FAMILY: every cung nữ act (srvCards = the hand, srvTalk = every talk option: chủ, Hoàng thượng, phi tần, đồng liêu) run with S.srv gone:
       no throw; (3) the same acts in her cung nữ life still work (Công lao moves). */
const {chromium}=require('playwright');const URL=process.argv[2]||process.env.GAME;let bad=0;const ok=(c,t)=>{console.log((c?'ok   ':'BAD  ')+t);if(!c)bad++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});
 await ctx.addInitScript(`(function(){let a=20261126;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto(URL);await p.waitForFunction(()=>typeof start==='function'&&window.__ctmBuilt,null,{timeout:0});await p.waitForTimeout(1500);
 const life=async o=>p.evaluate(async o=>{try{$("title").hidden=true}catch(e){}window.__forceOrigin=o;window.__kcO="cung";start();await new Promise(r=>setTimeout(r,800));
   const k=document.querySelector('button[data-nl="ok"]');if(k)k.click();await new Promise(r=>setTimeout(r,1200));Q.length=0;try{const m=document.getElementById("modal");if(m)m.hidden=true}catch(e){}deal();return{o:S.origin&&S.origin.k,srv:!!S.srv}},o);
 const a=await life("tt");const cons=await p.evaluate(()=>JSON.stringify(ser()));
 const c=await life("cnv");ok(a.o==="tt"&&!a.srv&&c.o==="cnv"&&c.srv,`lives made: consort ${a.o}, cung nữ ${c.o} (srv ${c.srv})`);
 const R1=await p.evaluate(cons=>{const names=new Set((srvCards()||[]).map(x=>x.n));const hand0=deck.filter(x=>x&&names.has(x.n)).length;
   const d=JSON.parse(cons);quiet=true;deser(d);quiet=false;Q.length=0;/* no deal(): the old hand stays, as after a co-op rebirth */
   const stale0=deck.filter(x=>x&&names.has(x.n)).length;let thrown=[],tries=0;const k0=JSON.stringify([used,S.buoi,S.suc,S.bac]);
   for(let i=0;i<20&&deck.some(x=>x&&names.has(x.n));i++){const j=deck.findIndex(x=>x&&names.has(x.n));tries++;try{act(j)}catch(e){thrown.push(e.message)}Q.length=0}
   return{hand0,stale0,tries,thrown,left:deck.filter(x=>x&&names.has(x.n)).length,paid:JSON.stringify([used,S.buoi,S.suc,S.bac])!==k0,srv:!!S.srv,n:deck.length}},cons);
 ok(R1.stale0>0,`stale hand reproduced: ${R1.stale0} cung nữ cards in the consort life's hand (of ${R1.hand0} dealt)`);
 ok(!R1.thrown.length,`act() on the stale hand: no throw (${R1.thrown.slice(0,2).join(' | ')})`);
 ok(R1.left===0&&R1.n>0,`hand dealt again for the consort life: ${R1.left} cung nữ cards left, ${R1.n} cards`);
 ok(!R1.paid,`nothing paid for the refused stale act (khắc / buổi / Sức / Bạc unchanged)`);
 await life("cnv");
 const R2=await p.evaluate(()=>{const items=[];const add=(src,x)=>{if(x&&(x.go||x.run||x.fail))items.push([src,x])};
   for(const x of srvCards()||[])add("hand",x);const m=srvM();const pp=((S.visit&&S.visit.people)||[]);
   for(const sk of ["mis","emp","rv","hh"]){const who=sk==="mis"?m:((pp.find(y=>y&&y.ref&&y.ref!==m)||{}).ref||m);try{for(const x of srvTalk({kind:"srv",sk,ref:who,o:who})||[])add("talk:"+sk,x)}catch(e){}}
   for(const y of pp){try{if(y&&y.kind==="srv")for(const x of talkOpts(y)||[])add("talk:"+(y.sk||"?"),x)}catch(e){}}
   const keep=S.srv,out=[];for(const [src,x] of items){S.srv=undefined;let r="ok";try{if(x.go)x.go();else if(x.run)x.run();if(x.fail)x.fail()}catch(e){r=e.message}S.srv=keep;Q.length=0;if(r!=="ok")out.push(src+" «"+x.n+"»: "+r)}
   const L=(srvCards()||[]).find(x=>/lễ nghi/i.test(x.n));const mp0=S.srv.mp||0;if(L&&L.go)L.go();return{n:items.length,out,live:(S.srv.mp||0)-mp0,has:!!L}});
 ok(R2.n>=20,`family: ${R2.n} cung nữ acts collected (hand + talk)`);
 ok(!R2.out.length,`family with S.srv gone: ${R2.out.length} throw (${R2.out.slice(0,3).join(' | ')})`);
 ok(R2.has&&R2.live>0,`in her cung nữ life the acts still work: «Học lễ nghi» Công lao +${R2.live}`);
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`srvmerit-guard: ${bad} BAD`:'srvmerit-guard: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
