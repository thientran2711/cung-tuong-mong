/* owner bug 11/15: an act that opens a mini-game must fire once per tap, cost nothing and show no result while the game intro is open;
   the cost is paid when the game is played or "Để trời định" is pressed, and ONE result card comes last.
   Two paths: (1) Tài nghệ › Tự học (lesson button → "làm ra tác phẩm gì?" → game), (2) the Hành sự deck card "Tự học …" (j83 wkDeckCard).
   usage: node dev/test/minigame-tap.js <url> */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,hasTouch:true,isMobile:true,serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 /* count result cards: every time #rtoast is turned on */
 await p.evaluate(()=>{window.__cards=[];const o=new MutationObserver(()=>{const t=document.getElementById('rtoast');if(t&&t.classList.contains('on')){const s=t.innerText.replace(/\s+/g,' ').slice(0,140);if(window.__cards[window.__cards.length-1]!==s)window.__cards.push(s)}});
  o.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class'],childList:true})});
 const reset=t=>p.evaluate(t=>{try{localStorage.clear()}catch(e){}window.__nlInner=1;for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}document.getElementById('title').hidden=true;for(let i=0;i<12;i++){start();if(!isSrv())break}Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=80;S.bac=100;used=0;S.buoi=0;S.mg=null;for(const k in S.arts)if(S.arts[k]>=5)S.arts[k]=1;tab=t;if(t==='art'){try{localStorage.setItem('ctm-ktsub-art','cktt')}catch(e){}if(typeof KTSUB==='object')KTSUB.art='cktt'}render();
  const r=document.getElementById('rtoast');if(r)r.classList.remove('on');window.__cards=[]},t);
 const snap=()=>p.evaluate(()=>({suc:S.suc,bac:S.bac,used,q:Q.length,qt:Q[0]&&Q[0].t,ov:!document.getElementById('ov').hidden,intro:!!document.getElementById('kg82go'),mg:!!S.mg,cards:window.__cards.slice()}));
 const btns=()=>p.evaluate(()=>[...document.querySelectorAll('#ov button,.kg82act button')].filter(b=>b.offsetParent).map(b=>(b.id||'')+':'+b.innerText.replace(/\s+/g,' ').slice(0,30)));
 const finish=async()=>{await p.evaluate(()=>{const s=document.getElementById('kg82skip')||document.getElementById('mgskip');if(s&&s.offsetParent)s.click()});await p.waitForTimeout(800);
  for(let i=0;i<3;i++){const n=await p.evaluate(()=>{const b=document.getElementById('kg82ok')||[...document.querySelectorAll('#ov button')].find(b=>b.offsetParent&&/Xong|Tiếp|Đóng|Lui|Nhận|Đã hiểu/.test(b.innerText));if(b){b.click();return 1}return 0});await p.waitForTimeout(700);if(!n)break}
  await p.waitForTimeout(1200)};
 const R={lesson:{},deck:{}};
 /* 1. lesson button */
 { const L=R.lesson;await reset('art');L.btn=await p.evaluate(()=>!!document.querySelector('[data-learn][data-mode="self"]:not([disabled])'));L.before=await snap();
   await p.evaluate(()=>{const b=document.querySelector('[data-learn][data-mode="self"]:not([disabled])');b.click();b.click()});await p.waitForTimeout(300);L.afterTaps=await snap();
   await p.evaluate(()=>{const o=document.querySelector('#modal .opts button');if(o)o.click()});await p.waitForTimeout(900);L.intro=await snap();L.introBtns=await btns();
   await finish();L.after=await snap();
   L.ok=L.btn&&L.afterTaps.q===1&&!L.afterTaps.cards.length&&L.intro.suc===L.before.suc&&L.intro.bac===L.before.bac&&L.intro.used===L.before.used&&!L.intro.cards.length&&(L.intro.ov||L.intro.intro||L.intro.mg)
     &&L.after.suc<L.before.suc&&L.after.used>L.before.used&&L.after.cards.length===1&&!L.after.mg }
 /* 2. Hành sự deck card */
 { const D=R.deck;await reset('act');D.i=await p.evaluate(()=>{for(let j=deck.length-1;j>=0;j--)if(deck[j].aaMG)deck.splice(j,1);let a;for(let n=0;n<60;n++){a=wkDeckCard();if(/Nấu/.test(a.n))break}deck.push(a);render();return deck.length-1});
   D.card=await p.evaluate(i=>({n:deck[i].n,c:deck[i].c,btn:!!document.querySelector(`.card[data-i="${i}"]:not([disabled])`)}),D.i);D.before=await snap();
   await p.evaluate(i=>{const b=document.querySelector(`.card[data-i="${i}"]`);if(b){b.click();b.click()}else{act(i);act(i)}},D.i);await p.waitForTimeout(900);
   D.intro=await snap();D.introBtns=await btns();
   await finish();D.after=await snap();
   D.ok=D.intro.suc===D.before.suc&&D.intro.bac===D.before.bac&&D.intro.used===D.before.used&&!D.intro.cards.length&&(D.intro.ov||D.intro.intro)
     &&D.after.suc===D.before.suc+(D.card.c.suc||0)&&D.after.bac===D.before.bac+(D.card.c.bac||0)&&D.after.used>D.before.used&&D.after.cards.length===1&&!D.after.mg }
 const ok=R.lesson.ok&&R.deck.ok;
 console.log(JSON.stringify({ok,R,errs},null,1));await b.close();process.exit(ok&&!errs.length?0:1)})();
