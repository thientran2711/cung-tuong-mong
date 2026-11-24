/* khac-day run test: the spill really runs (owner 15/11 "Khắc check must use the whole DAY's khắc").
   usage: node dev/test/khac-day-run.js <page url> <W>x<H> <outdir>  → JSON results + screenshots (act tab, sáng with 1 khắc left) */
const {chromium}=require('./lib/pw-roulette');
const [,,URL,SZ,OUT]=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'})).newPage();await require('./lib/veil').guard(p);
 p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 const fresh=()=>p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;document.getElementById('modal').hidden=true;try{NLP=null}catch(e){}S.suc=80;S.bac=500;render()});
 const set=(bu,left,tb)=>p.evaluate(([bu,left,tb])=>{Q.length=0;document.getElementById('modal').hidden=true;S.buoi=bu;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.j76carry=0;S.j76ck="";try{deal()}catch(e){}used=4-left;tab=tb;render()},[bu,left,tb]);
 const drain=async()=>{for(let r=0;r<3;r++){for(let i=0;i<40;i++){const n=await p.evaluate(()=>{const M=document.getElementById('modal');if(Q.length||(M&&!M.hidden)){const b=M.querySelector('#mb .opts button:not([disabled])')||M.querySelector('#mclose, .dlg button, button');if(b)b.click();else{Q.length=0;M.hidden=true}return 1}if(S.mg){try{S.mg=null}catch(e){}return 1}return 0});if(!n)break;await p.waitForTimeout(250)}
  await p.evaluate(()=>{try{render()}catch(e){}});await p.waitForTimeout(3000)}};
 const st=()=>p.evaluate(()=>({buoi:S.buoi,used,carry:S.j76carry||0,place:S.place}));
 const R={};await fresh();
 /* A: deck card, 2 khắc, sáng with 1 left */
 await set(0,1,'act');
 R.A=await p.evaluate(()=>{const i=deck.findIndex(a=>a&&a.b==null&&!a.done&&cardCost(a)===2&&!cardWhy(a));if(i<0)return{skip:1};const a=deck[i];
  const chip=[...document.querySelectorAll('#panel button.ka')].map(b=>b.innerText.replace(/\s+/g,' ')).find(t=>t.includes(a.n))||"";const n0=(S.logs||[]).length;act(i);return{name:a.n,chip:(chip.match(/Cần.*?(?=Tốn|$)/i)||[""])[0],logGrew:(S.logs||[]).length>n0,after:{buoi:S.buoi,used,carry:S.j76carry}}});
 await drain();R.A.end=await st();R.A.pass=R.A.end.buoi===1&&R.A.end.used===1&&R.A.end.carry===0;
 /* B: person act (Hậu cung tab) trưa with 1 left */
 await set(1,1,'rv');
 R.B=await p.evaluate(()=>{const btn=[...document.querySelectorAll('#panel button[data-a]:not([disabled])')].find(b=>/sang buổi chiều/.test(b.innerText));if(!btn)return{skip:1};const t=btn.innerText.replace(/\s+/g,' ').slice(0,60);btn.click();return{t,after:{buoi:S.buoi,used,carry:S.j76carry}}});
 await drain();R.B.end=await st();R.B.pass=R.B.skip||(R.B.end.buoi===2&&R.B.end.used===1);
 /* C: palace visit (walk spill), sáng with 1 left */
 await set(0,1,'rv');
 R.C=await p.evaluate(()=>{for(const v of rivals){if(!v.alive||v.out)continue;const h=visitBtn(v)||"";if(!h||/\sdisabled/.test(h.slice(0,h.indexOf(">")+1))||!/data-kneed/.test(h))continue;const k=palaceOf(v);
  const need=JSON.parse(decodeURIComponent(h.match(/data-kneed="([^"]+)"/)[1]));visitPal(v.id);return{v:v.name,k,tc:travel("home",k),need}}return{skip:1}});
 await p.waitForTimeout(500);await drain();await p.waitForTimeout(800);await drain();R.C.end=await st();R.C.pass=R.C.skip||(R.C.end.buoi===1&&R.C.end.place===R.C.k);
 /* D: servant/event option spill: tsbKh(2) with 1 left */
 await set(2,1,'act');R.D=await p.evaluate(()=>{const n=tsbNeedKhac(2);tsbKh(2);render();return{need:n}});await drain();R.D.end=await st();R.D.pass=R.D.end.buoi===3&&R.D.end.used===1;
 /* E: buổi tối, 1 left: 2-khắc acts stay red with the day reason, a tap does nothing */
 await set(3,1,'act');
 R.E=await p.evaluate(()=>{const i=deck.findIndex(a=>a&&a.b==null&&!a.done&&cardCost(a)===2);if(i<0)return{skip:1};const a=deck[i];const chip=[...document.querySelectorAll('#panel button.ka')].map(b=>b.innerText.replace(/\s+/g,' ')).find(t=>t.includes(a.n))||"";
  act(i);return{name:a.n,chip:(chip.match(/Cần.*?(?=Tốn|$)/i)||[""])[0],after:{buoi:S.buoi,used}}});R.E.pass=R.E.skip||(/hết khắc trong ngày/.test(R.E.chip)&&R.E.after.used===3);
 /* F: thỉnh an (bound to sáng), 1 left */
 await set(0,1,'act');R.F=await p.evaluate(()=>{const t=[...document.querySelectorAll('#panel button.ka')].map(b=>(b.disabled?"[D] ":"")+b.innerText.replace(/\s+/g,' ')).filter(t=>/Thỉnh an/.test(t)).map(t=>t.replace(/^.*?(?=\[D\]|Thỉnh)/,'').slice(0,90)+' … '+(t.match(/CẦN.*?(?=TỐN|Tốn|$)/i)||[''])[0]);return{cards:t}});R.F.pass=R.F.cards.length>0&&R.F.cards.every(t=>/^\[D\]/.test(t)&&/không kịp xong trong buổi sáng/i.test(t));
 /* G: co-op re-sync safety (S.buoi moved without nextBuoi): the next buổi pays the carry; an older carry is dropped */
 R.G=await p.evaluate(()=>{Q.length=0;S.buoi=0;used=3;S.j76carry=0;spend(2);const c1={used,carry:S.j76carry};S.buoi=1;used=0;render();const g1={used,carry:S.j76carry};
  S.buoi=0;used=3;S.j76carry=0;spend(2);S.buoi=2;used=0;render();const g2={used,carry:S.j76carry};return{c1,g1,g2}});
 R.G.pass=R.G.c1.used===4&&R.G.c1.carry===1&&R.G.g1.used===1&&!R.G.g1.carry&&R.G.g2.used===0&&!R.G.g2.carry;
 /* shot: act tab, sáng, 1 left */
 await set(0,1,'act');await p.evaluate(()=>{const P=document.getElementById('panel');const b=[...P.querySelectorAll('button.ka')].find(x=>/sang buổi trưa/.test(x.innerText));if(b)b.scrollIntoView({block:'center'})});await p.waitForTimeout(800);
 await p.screenshot({path:`${OUT}/khac-day-${W}x${H}.jpg`,type:'jpeg',quality:70});
 R.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 console.log(JSON.stringify({SZ,R,errs:[...new Set(errs)].slice(0,6)},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
