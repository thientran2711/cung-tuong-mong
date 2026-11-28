/* review/srvmerit-guard (MAIN 148 26/11): «Cannot read properties of undefined (reading 'mp') @ srvMerit».
   Root: a hand of cung nữ cards outlives the cung nữ life (the hand is dealt again only by deal(); a life swap that keeps it — co-op rebirth
   through fromCanon, a sổ loaded without deal — leaves cards whose go/run read S.srv). Fix: jsrvguard.js (ONE gate) + srvMerit guard (j42).
   usage: node dev/test/srvmerit-guard.js <game url (file:// or http://)>
   (1) STALE HAND: cung nữ life → a consort sổ deserialised with no deal → every act(i) on the hand: no throw, nothing paid, the hand is dealt
       again for the consort life (no cung nữ card left).
   (r2) the 4 directions of the same root (cung nữ↔consort, kc ở nhà↔palace): gate on render + defence on the tap; see below.
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
 /* r2 (RV-SRVMERIT-GUARD FAIL 1–4): the 4 directions of ONE root — a hand kept across a life swap with no deal (deser of another life's sổ).
    lives: P = consort «tt» in the palace · V = cung nữ «cnv» · K = kc «ở nhà» (tt + kcInit). Wrong-life cards = names of the old hand that never
    come in 8 fresh deals of the new life (measured without the fix's own stamp, so the same test runs on the base). (a) GATE: render() → 0 wrong-life
    cards before she can tap; (b) TAP: act() on every wrong-life card with no render since the swap → no throw, nothing paid, hand dealt again, one
    kit notice (never a silent swallowed tap); (c) a card of her current life still runs. */
 const mkLife=async(o,home)=>{await life(o);return p.evaluate(home=>{if(home){S.srv=null;kcInit();Q.length=0;deck=[];deal()}return{sv:JSON.stringify(ser()),o:S.origin.k,srv:!!(S.srv&&!S.srv.risen),kc:!!(S.kc&&!S.kc.inPal),name:S.name}},home)};
 const LV={P:await mkLife("tt",0),V:await mkLife("cnv",0),K:await mkLife("tt",1)};
 ok(!LV.P.srv&&!LV.P.kc&&LV.V.srv&&LV.K.kc&&!LV.K.srv,`r2 lives: P ${LV.P.o} palace, V ${LV.V.o} cung nữ, K ${LV.K.o} ở nhà`);
 for(const [A,B,label] of [["V","P","cung nữ → consort"],["P","V","consort → cung nữ"],["K","P","kc ở nhà → palace"],["P","K","palace → kc ở nhà"]])for(const mode of ["gate","tap"]){
  const R=await p.evaluate(([a,b,mode])=>{const lv=sv=>{const d=JSON.parse(sv);quiet=true;deser(d);quiet=false;Q.length=0;try{const m=document.getElementById("modal");if(m)m.hidden=true}catch(e){}};
    lv(b);const bn=new Set();for(let i=0;i<8;i++){deck=[];deal();for(const x of deck)if(x&&x.n)bn.add(x.n)}
    lv(a);deck=[];deal();const old=deck.slice();const wrong=()=>deck.filter(x=>x&&old.includes(x)&&!bn.has(x.n));
    lv(b);/* no deal: the old hand stays, as after a co-op new face (show → fromCanon) */const w0=wrong().length,wn=wrong().map(x=>x.n).slice(0,4);
    const nt0=(typeof kitNoticeList==="function"?kitNoticeList():[]).filter(x=>x.id==="life-redeal").length;window.__nt0=nt0;
    const k0=JSON.stringify([used,S.buoi,S.suc,S.bac,S.sung,S.danh,S.duc]);let thrown=[],tries=0,ran=0;
    if(mode==="gate"){try{render()}catch(e){thrown.push(e.message)}}
    else for(let i=0;i<30&&wrong().length;i++){const c=wrong()[0],j=deck.indexOf(c);tries++;try{act(j)}catch(e){thrown.push(e.message)}/* ran = act() went on to the card itself (j2 act sets a.done before it pays and runs); a world log line from the new hand's deal/render (an NPC visit) is not the card */if(c.done)ran++;Q.length=0}
    const nt=(typeof kitNoticeList==="function"?kitNoticeList():[]).filter(x=>x.id==="life-redeal");
    return{w0,wn,left:wrong().length,n:deck.length,tries,ran,thrown,paid:JSON.stringify([used,S.buoi,S.suc,S.bac,S.sung,S.danh,S.duc])!==k0,note:nt.length>0}},[LV[A].sv,LV[B].sv,mode]);
  const tg=`r2 ${label} [${mode}]`;
  ok(R.w0>0,`${tg}: stale hand reproduced: ${R.w0} wrong-life cards (${R.wn.join(", ")})`);
  ok(!R.thrown.length,`${tg}: no throw (${R.thrown.slice(0,2).join(' | ')})`);
  ok(R.left===0&&R.n>0,`${tg}: ${R.left} wrong-life cards left, hand of ${R.n} dealt for the life she lives`);
  ok(!R.paid,`${tg}: nothing paid, nothing run (khắc / buổi / Sức / Bạc / Sủng / Danh / Đức unchanged${mode==="tap"?`; ${R.tries} taps, ${R.ran} ran`:""})`);
  if(mode==="tap")ok(R.ran===0&&R.note,`${tg}: the refused tap is told by one kit notice (§42.2), not swallowed silently`)}
 {const R=await p.evaluate(sv=>{const d=JSON.parse(sv);quiet=true;deser(d);quiet=false;Q.length=0;deck=[];deal();render();const i=deck.findIndex(x=>x&&!x.done&&typeof canPay==="function"&&canPay(x)&&cardCost(x)<=1);
   if(i<0)return{i};const u0=used,lg=(S.logs||[]).length;act(i);return{i,ran:used!==u0||(S.logs||[]).length>lg}},LV.P.sv);
  ok(R.i>=0&&R.ran,`r2 a card of her current life still runs at once (card ${R.i})`)}
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`srvmerit-guard: ${bad} BAD`:'srvmerit-guard: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
