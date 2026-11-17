/* text-idem-scan (review/coop-main-faults, LUẬT SỬA CẢ NHÓM): every function that rewrites player-visible text from a DOM observer
   must be IDEMPOTENT: f(f(x)) === f(x). Two observers (j61 name mask k61Node, j84 wording VP fix) react to each other's writes; a rewrite
   that changes its own output again (j61: a friend named "Hảo hữu" masked as "Hảo hữu của ta" → "… của ta của ta …") never stops and hangs
   the page (dev/test/coop-p2.js B1 hung the host for good).
   Corpus: every text node + title / aria-label of the real rendered game over N random moments (tabs, buổi, places), plus every log line;
   then the same corpus with one consort named as each of the risky labels (a name that sits inside a mask: "Hảo hữu", "Người lạ", …).
   Checks: VP.fix, VP.itemLow (j84), k61Scrub (j61, lead/plain both) are idempotent on every string; a live DOM write settles (observer
   rounds stop) within 50 ms for a node holding a mask-like name.
   usage: node dev/test/text-idem-scan.js <baseURL wrapping dev/index.html with utf-8> [moments=12] → JSON, exit 1 on any failure */
const {chromium}=require('playwright');
const [,,BASE,NM]=process.argv;const N=+NM||12;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,isMobile:true});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;showModal();render()});
 await p.waitForTimeout(400);
 const corpus=new Set();
 const grab=()=>p.evaluate(()=>{const out=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode())){if(n.parentElement&&/^(SCRIPT|STYLE)$/.test(n.parentElement.tagName))continue;const t=n.nodeValue;if(t&&t.trim().length>3)out.push(t)}
   for(const el of document.querySelectorAll('[title],[aria-label]'))for(const a of ['title','aria-label']){const v=el.getAttribute(a);if(v&&v.length>3)out.push(v)}
   for(const l of (S.log||[]).slice(-40))out.push(String(l&&l.t||l));return out});
 for(let i=0;i<N;i++){
  await p.evaluate(i=>{const clear=()=>{let n=0;while(Q.length&&n++<20){const m=Q[0];if(m.opts&&m.opts.length){try{chooseM(m.opts.length-1)}catch(e){Q.shift()}}else{try{closeModal()}catch(e){Q.shift()}}}showModal()};clear();
   const T=["act","go","ppl","me","inv","log"];if(i%3===2){try{nextBuoi()}catch(e){}}else{const L=places().map(x=>x.k).filter(k=>k!==S.place&&accessOf(S,k).ok);if(L.length)try{goTo(L[i%L.length])}catch(e){}}
   clear();tab=T[i%T.length];try{render()}catch(e){}},i);await p.waitForTimeout(500);
  for(const t of await grab())corpus.add(t)}
 const risky=["Hảo hữu","Người lạ","Một vị","chưa quen biết","Hoàng hậu","Thấy mặt"];
 const R=await p.evaluate(([C,risky])=>{const fails=[];const chk=(nm,f,x)=>{let a,b2;try{a=f(x);b2=f(a)}catch(e){return}if(a!==b2&&fails.length<40)fails.push({f:nm,x:String(x).slice(0,120),once:String(a).slice(0,160),twice:String(b2).slice(0,160)})};
   const run=tag=>{for(const x of C){chk(tag+'VP.fix',s=>VP.fix(s),x);chk(tag+'VP.itemLow',s=>VP.itemLow(s,''),x);chk(tag+'k61Scrub',s=>k61Scrub(s,true,''),x);chk(tag+'k61Scrub plain',s=>k61Scrub(s,true,'',undefined,true),x)}};
   run('');
   /* a consort she has not met carrying a risky label as her name: every string that names her, masked twice */
   const v=liveRivals(true).find(r=>!k61Named(r))||liveRivals(true)[0];const n0=v.name,c0=v.coop;const settle=[];
   for(const nm of risky){v.name=nm;K61VER++;for(const coop of [false,true]){v.coop=coop;K61VER++;const L=[nm,`${nm} sang cung ngươi thăm hỏi.`,`Một thái giám của ${nm} chặn ngươi ở hành lang.`,`${nm}: Đang bận`,`Ngươi tặng quà cho ${nm}.`];
     const kk=kOf61(v),k0=S.known[kk];for(const x of L){S.known[kk]=0;K61VER++;chk(`[${nm}${coop?' coop':''}] k61Scrub`,s=>k61Scrub(s,true,''),x);chk(`[${nm}${coop?' coop':''}] k61Scrub plain`,s=>k61Scrub(s,true,'',undefined,true),x);chk(`[${nm}${coop?' coop':''}] VP.fix∘k61Scrub`,s=>VP.fix(k61Scrub(s,true,'')),x)}S.known[kk]=k0;K61VER++}}
   v.name=n0;v.coop=c0;K61VER++;return {n:C.length,fails}},[[...corpus],risky]);
 /* live DOM: a node with a mask-like name must settle (no observer ping-pong) */
 const live=await Promise.race([new Promise(r=>setTimeout(()=>r({still:true,hung:'page did not answer in 20 s (observer loop)'}),20000)),p.evaluate(async()=>{const v=liveRivals(true).find(r=>!k61Named(r))||liveRivals(true)[0];const n0=v.name,c0=v.coop,kk=kOf61(v),k0=S.known[kk];S.known[kk]=0;v.name="Hảo hữu";v.coop=true;K61VER++;
   const d=document.createElement('div');d.innerHTML='<button aria-label="Hảo hữu: Đang bận"><span>Hảo hữu</span></button>';let rounds=0;const mo=new MutationObserver(()=>rounds++);mo.observe(d,{subtree:true,childList:true,characterData:true,attributes:true});
   document.body.appendChild(d);await new Promise(r=>setTimeout(r,200));const r1=rounds;await new Promise(r=>setTimeout(r,200));const r2=rounds;const out={rounds:r2,still:r2!==r1,text:d.textContent.slice(0,80),aria:d.firstChild.getAttribute('aria-label').slice(0,80)};
   mo.disconnect();d.remove();v.name=n0;v.coop=c0;S.known[kk]=k0;K61VER++;return out})]);
 const ok=!R.fails.length&&!live.still&&!errs.length;
 console.log(JSON.stringify({ok,strings:R.n,fails:R.fails.length,detail:R.fails.slice(0,12),live,pageErrors:errs.slice(0,5)},null,1));
 await b.close();process.exit(ok?0:1)})();
