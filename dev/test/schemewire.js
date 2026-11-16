/* jsgame wiring (review/scheme-games-port): place acts (j9 placeHarms), Nghe lén (j78 overhear), servant Mua chuộc (bribeServ),
   first-time how-to card (S.mgSeen), Gợi ý button, save/load of a pending choice, #ov (the co-op timer's mini-game pause signal) open during a game.
   usage: node dev/test/schemewire.js <baseURL> <W>x<H>@<dpr> */
const {chromium}=require('playwright');const [,,BASE,SZ]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1)});await ctx.addInitScript(()=>{/* merge-train-4: the card-flip scene now waits for its kit end button (KIT 81); hide it like main's tests do */document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf{display:none!important}';document.head.appendChild(s)})});const p=await ctx.newPage();const errs=[],fails=[],res={};
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push(m.text().slice(0,200))});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});
 const clean=()=>p.evaluate(()=>{NLP=null;Q.length=0;const m=document.getElementById('modal');m.hidden=true;m.className='modal';S.bac=400;S.suc=100;S.kpWarn=1;S.dead=false;S.confined=0;used=0;S.mat=3;S.mgSeen={};KG82.noDemo=false;try{kg82Close(true)}catch(e){}});
 await clean();
 /* 1. talkOpts: rival at a place -> Nghe lén + scheme acts carry open (no run) */
 res.place=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.out&&!x.queen&&!sameHouse(S,x));const r=[];
  const k=S.place;const others=rivals.filter(x=>x!==v&&x.alive&&!x.out);others.slice(0,2).forEach(x=>{try{x.at=k;x.place=k}catch(e){}});
  try{const A=talkOpts({kind:"rival",ref:v});A.forEach(a=>{if(/Nghe lén|Dò la|Tung tin|Vu oan|Bỏ độc|xạ hương|Đẩy con/.test(a.n))r.push([a.n,typeof a.open,typeof a.run])})}catch(e){r.push("ERR "+e.message)}return{place:S.place,r}});
 /* 2. Nghe lén choice -> Giao cho người làm pays 1 khắc once, runs the plain overhear */
 const pick=async(q,title)=>{await p.evaluate(([q,t])=>{Q.length=0;const d=mkP('sgpick',q);if(!d)throw new Error('no dialog');pushDil(d,t);showModal()},[q,title]);await p.waitForTimeout(500)};
 await clean();await pick({j:'over'},'Nghe ngóng');
 res.overDlg=await p.evaluate(()=>({n:document.querySelectorAll('#modal .opts button').length,t:$('modal').innerText.slice(0,260)}));
 await p.evaluate(()=>{window.__u0=used});await p.locator('#modal .opts button').nth(1).click();await p.waitForTimeout(800);
 res.overSkip=await p.evaluate(()=>({used:used-window.__u0,game:!!$('kg82')}));if(res.overSkip.used!==1)fails.push('over skip: khắc '+res.overSkip.used);
 /* 3. Nghe lén -> play: first-time card, Gợi ý, #ov visible */
 await clean();await pick({j:'over'},'Nghe ngóng');await p.locator('#modal .opts button').nth(0).click();await p.waitForTimeout(900);
 res.game1=await p.evaluate(()=>({kg:!!$('kg82'),first:/cách chơi, lần đầu/i.test($('kg82').innerText),go:$('sggo')&&$('sggo').innerText,ov:(()=>{const o=$('ov');const r=o.getBoundingClientRect();return !o.hidden&&r.width>0&&r.height>0})(),used}));
 if(!res.game1.first)fails.push('first-time card missing');if(!res.game1.ov)fails.push('#ov not visible during game (co-op timer pause)');
 await p.locator("#sggo").click();await p.waitForFunction(()=>$("sghint"),null,{timeout:8000}).catch(()=>{});
 res.hint=await p.evaluate(()=>({btn:!!$('sghint'),seen:JSON.stringify(S.mgSeen)}));if(!res.hint.btn)fails.push('no Gợi ý button');
 await p.locator('#sghint').click();await p.waitForTimeout(400);
 await p.evaluate(()=>{kg82Close()});await p.waitForTimeout(300);
 /* second time: no card */
 await pick({j:'over'},'Nghe ngóng');await p.locator('#modal .opts button').nth(0).click();await p.waitForTimeout(900);
 res.game2=await p.evaluate(()=>({first:/cách chơi, lần đầu/i.test($('kg82').innerText)}));if(res.game2.first)fails.push('how-to card shown twice');
 await p.evaluate(()=>{kg82Close()});
 /* 4. servant bribe */
 await clean();
 res.serv=await p.evaluate(()=>{const o=rivals.find(x=>x.alive&&x.staff&&x.staff.length);if(!o)return{none:1};const s=o.staff[0];const d=mkP('sgpick',{j:'serv',sid:s.sid});return{ok:!!d,t:d&&d.o.map(x=>x.n),x:d&&d.o[0].x.slice(0,200),sid:s.sid}});
 if(!res.serv.none){await pick({j:'serv',sid:res.serv.sid},'Mua chuộc');await p.evaluate(()=>{window.__u0=used;window.__b0=S.bac});await p.locator('#modal .opts button').nth(1).click();await p.waitForTimeout(800);
  res.servSkip=await p.evaluate(()=>({used:used-window.__u0,bac:window.__b0-S.bac,log:String(S.logs[0]||'').replace(/<[^>]+>/g,'').slice(0,120)}));if(res.servSkip.used!==2)fails.push('serv skip khắc '+res.servSkip.used)}
 /* 5. every new job survives save/load */
 await clean();
 res.save=await p.evaluate(()=>{const o=rivals.find(x=>x.alive&&x.staff&&x.staff.length);const i=rivals.findIndex(v=>v.alive&&!v.out&&!v.queen);const ps=[{j:'over'},{j:'place',v:rivals[i].id,k:'spy'},{j:'act',v:rivals[i].id,k:'rumor'}];if(o)ps.push({j:'serv',sid:o.staff[0].sid});const out=[];
  for(const q of ps){Q.length=0;const d=mkP('sgpick',q);pushDil(d,'x');save();Q.length=0;quiet=true;deser(loadSlot(3));quiet=false;out.push(Q[0]&&Q[0].pid+":"+Q[0].opts.length)}return out});
 console.log(JSON.stringify({size:SZ,errs,fails,res},null,1));await b.close()})();
