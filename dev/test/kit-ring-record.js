/* RING-BUILD review videos (owner look gate): real screen recordings of the REAL build, real touch taps / drags.
   usage: node dev/test/kit-ring-record.js <url> <outdir> <a|b|c> [WxH]   → <outdir>/<scene>-<WxH>.webm + marks.json (start of the scene in the recording)
   a = person ring: spin → bright centre changes → tap → zoom-left → plaques drop right → tap a plaque → its lines / answers in place → kit result card; no second figure
   b = group ring: «Từng nhóm» → spin → tap a group → group focus → «Đứng nghe» (result rows) → «Nói với …» (she steps out) → her act → result
   c = event choice as cards (kitHand «Bàn bài», the real frame «Tân quân lập uy · Chương 2») */
const {chromium}=require('playwright');const fs=require('fs');const boot=require('./kit-ring-boot.js');
const [,,URL,OUT,SC,WH]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const [W,H]=(WH||'755x1000').split('x').map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',recordVideo:{dir:OUT,size:{width:W,height:H}}});
 const p=await ctx.newPage();const T0=Date.now();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await boot(p,{url:URL});const w=ms=>p.waitForTimeout(ms);
 const at=async s=>p.evaluate(s=>{const e=typeof s==='string'?document.querySelector(s):null;if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},s);
 const tap=async s=>{const c=await at(s);if(!c)throw new Error('no '+s);await p.touchscreen.tap(c[0],c[1]);return c};
 const tapXY=(x,y)=>p.touchscreen.tap(x,y);
 const plaque=async re=>p.evaluate(re=>{const R=new RegExp(re);const n=[...document.querySelectorAll('.kpk .kpk-n')].find(n=>R.test(n.querySelector('.kpk-b b').textContent));if(!n)return null;const r=n.querySelector('.kpk-b').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},re);
 const pickPlaque=async re=>{if(await p.evaluate(()=>{const k=document.getElementById('kxcatch');return !!k&&k.offsetWidth>0})){/* the kit result card is open: a tap closes it first (kit §7) */const rc=await at('#rtoast');if(rc)await tapXY(rc[0],rc[1]);await w(500)}let c=await plaque(re);if(!c){/* other tab / page */for(const t of await p.$$('.kpk .kpk-tabs .pct')){const bb=await t.boundingBox();await tapXY(bb.x+bb.width/2,bb.y+bb.height/2);await w(500);c=await plaque(re);if(c)break}}if(!c)c=await plaque('.');await tapXY(c[0],c[1]);await w(700);const ok=await at('.kpk .khok');await tapXY(ok[0],ok[1]);await w(300)};
 const drag=async(x0,x1,y,steps)=>{await p.mouse.move(x0,y);await p.mouse.down();for(let i=1;i<=steps;i++){await p.mouse.move(x0+(x1-x0)*i/steps,y);await w(16)}await p.mouse.up()};
 const sayThrough=async()=>{for(let k=0;k<10&&await p.$('.kring-say');k++){await tapXY(W*.5,H*.42);await w(650)}};
 const frontSlot=()=>p.evaluate(()=>{const R=kitRing.cur;const s=R.slots[kitRing.front()];const r=s.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height*.45]});
 const slotC=i=>p.evaluate(i=>{const s=kitRing.cur.slots[i];const r=s.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height*.5]},i);
 const marks={};const mark=k=>{marks[k]=(Date.now()-T0)/1000};
 if(SC==='a'){
  /* fade in once more for the recording */await p.evaluate(()=>kitRing.close(true));await w(300);await p.evaluate(()=>kitRing.open({mode:'person'}));await w(200);mark('start');await w(1600);
  const gy=H*.62;await drag(W*.78,W*.30,gy,14);await w(1700);
  await tap('.kring-ar:last-of-type').catch(()=>{});await w(900);
  const N=await p.evaluate(()=>kitRing.cur.slots.length);const side=await p.evaluate(()=>{const R=kitRing.cur,N=R.slots.length;return (kitRing.front()+N-1)%N});const c=await slotC(side);await tapXY(c[0],c[1]);await w(1100);
  const f=await frontSlot();await tapXY(f[0],f[1]);await w(1700);
  await pickPlaque('Trò chuyện');await w(1200);await sayThrough();await w(900);
  await pickPlaque('Hỏi han|Khen|.');await w(3800);mark('result');
  await tap('.kring-x .kit-x');await w(1400);mark('end')}
 if(SC==='b'){
  await p.evaluate(()=>kitRing.close(true));await w(300);await p.evaluate(()=>kitRing.open({mode:'person'}));await w(1300);mark('start');await w(500);
  await tap('.kring-tabs [data-kr=group]');await w(1500);
  await drag(W*.75,W*.35,H*.62,12);await w(1600);
  /* bring the biggest group to the front with a tap on it */const gi=await p.evaluate(()=>{const R=kitRing.cur;let b=0;R.slots.forEach((s,i)=>{if(s.__g.members.length>R.slots[b].__g.members.length)b=i});return b});
  if(gi!==await p.evaluate(()=>kitRing.front())){const c=await slotC(gi);await tapXY(c[0],c[1]);await w(1200)}
  const f=await frontSlot();await tapXY(f[0],f[1]);await w(1700);
  await pickPlaque('Đứng nghe');await w(3000);
  await pickPlaque('Nói với');await w(1600);
  await pickPlaque('Chào hỏi|Trò chuyện');await w(1200);await sayThrough();await w(600);if(await p.$('.kpk .kpk-n')&&await p.evaluate(()=>!kitRing.cur||!document.querySelector('#rtoast.on'))){const has=await plaque('Hỏi han|Khen');if(has){await pickPlaque('Hỏi han|Khen');}}await w(3500);mark('result');
  await tap('.kring-x .kit-x');await w(1300);mark('end')}
 if(SC==='c'){
  await p.evaluate(()=>kitRing.close(true));await w(800);
  for(let k=0;k<6;k++){const ok=await p.evaluate(()=>{Q.length=0;try{S.evc=null;EVCW.length=0}catch(e){}if(!rgFire('c2a'))return false;Q.length=1;Q[0].__khT='c2a';showModal();return true});if(ok)break;await w(800)}
  mark('start');await w(3200);
  const cards=await p.$$('#modal .opts.khand > button.kopt');const cc=async i=>{const bb=await cards[i].boundingBox();await tapXY(bb.x+bb.width/2,bb.y+bb.height*.6)};
  if(cards.length){await cc(0);await w(1800);await cc(Math.min(2,cards.length-1));await w(1800);await tap('#modal .khx').catch(()=>{});await w(1200);await cc(1);await w(1600);await tap('#modal .khok');await w(4200)}mark('end')}
 fs.writeFileSync(`${OUT}/marks-${SC}-${W}x${H}.json`,JSON.stringify({marks,errs}));const v=p.video();await ctx.close();const src=await v.path();fs.renameSync(src,`${OUT}/${SC}-${W}x${H}.webm`);console.log(SC,W+'x'+H,JSON.stringify(marks),errs.slice(0,3));await b.close()})();
