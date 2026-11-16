/* review/chapter-detail: tap the Mệnh truyện chapter chip / card / picture / check line -> chapter detail kit panel, inline progress under the card,
   "Đi làm" goes to Hành sự. Three states: milestone (new life), arc chapter, old v1 save (Báo thù cho nhà).
   usage: NODE_PATH=$(npm root -g) node dev/test/chapter-detail.js <url> [WxH] [shot-prefix]   exit 1 on a failed check */
const {chromium}=require('playwright');const [,,URL,VP,SHOT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||1),serviceWorkers:'block'});await ctx.addInitScript(()=>{/* merge-train-4: the card-flip scene now waits for its kit end button (KIT 81); hide it like main's tests do */document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf{display:none!important}';document.head.appendChild(s)})});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw,#ktut,.kmov{display:none!important}'});
 const reset=()=>p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kpop,.kmov').forEach(e=>e.remove());try{kitCatchOff()}catch(e){}const kc=document.getElementById('kxcatch');if(kc)kc.hidden=true;/* merge-train-4: a hand-hidden modal leaves the kit tap catcher */const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}Q.length=0});
 const states={milestone:()=>{},arc:()=>{const A=newThread67('td_an','m');S.st.ch.n=2;A.chap=2;A.i=1;pickNext67(A);A.due=0;A.dl=S.turn+6;A.hist.push('Hồi một: chọn đường');A.used.push(A.nb);S.st.M=A;S.st.ms=null},
  v1:()=>{S.st={step:1,done:0,tag:''};S.caseEv=2;S.foe='Lý Mai';S.foeDad='Thượng thư Lý';S.rank=1}};
 const res=[];const chk=(n,c)=>{res.push([n,!!c]);};
 for(const [sn,fn] of Object.entries(states)){await reset();await p.evaluate(s=>{new Function('return '+s)()()},fn.toString());
  await p.evaluate(()=>{tab='story';render()});await p.waitForTimeout(200);
  const inl=await p.evaluate(()=>{const e=document.querySelector('#panel');return{chip:!!e.querySelector('[data-chap]'),checks:e.querySelectorAll('.kchk').length,go:!!e.querySelector('[data-chapgo]'),txt:e.innerText.length}});
  chk(sn+': chip tappable + inline progress + Đi làm',inl.chip&&inl.go&&(sn==='milestone'||inl.checks>=2));
  if(SHOT){await p.screenshot({path:`${SHOT}-${sn}-tab.png`})}
  for(const [how,sel] of [['chip','#panel [data-chap]'],['card','#panel .kskill .kskinfo'],['picture','#panel .kskill .ksart'],['check line','#panel .kchk']]){
   await reset();await p.evaluate(()=>{tab='story';render()});if(!(await p.locator(sel).count())){chk(`${sn}: ${how} exists`,false);continue}await p.locator(sel).first().click({timeout:40000});await p.waitForTimeout(500);
   const r=await p.evaluate(()=>{const m=document.getElementById('modal');const d=m.querySelector('.dlg.kpanel');return{open:!m.hidden&&!!d,title:d&&d.querySelector('.kptitle')?d.querySelector('.kptitle').innerText:'',secs:d?d.querySelectorAll('.kpst').length:0,txt:d?d.innerText:'',hasGo:!!(d&&[...d.querySelectorAll('button')].some(b=>/Đi làm/.test(b.innerText))),imgs:d?d.querySelectorAll('img').length:0}});
   chk(`${sn}: tap ${how} -> detail panel`,r.open&&/Chương/.test(r.title)&&r.secs>=3&&r.txt.length>120);
   if(how==='chip'){if(SHOT){await p.waitForTimeout(600);await p.screenshot({path:`${SHOT}-${sn}-panel.png`});await p.evaluate(()=>{document.querySelector('#modal .kpb').scrollTop=9999;const m=document.querySelector('#modal .dlg.kpanel #mb');if(m)m.scrollTop=9999});await p.waitForTimeout(200);await p.screenshot({path:`${SHOT}-${sn}-panel2.png`})}
    if(sn!=='milestone'||true){chk(sn+': panel has pictures (cover)',r.imgs>=1)}
    if(sn==='v1')chk('v1 td: evidence/witness/rank/sớ lines',/Chứng cứ thứ 1\/3/.test(r.txt)&&/Nhân chứng/.test(r.txt)&&/Bậc Tần/.test(r.txt)&&/Dâng sớ/.test(r.txt));
    if(r.hasGo){await p.evaluate(()=>[...document.querySelectorAll('#modal button')].find(b=>/Đi làm/.test(b.innerText)).click());await p.waitForTimeout(400);const t=await p.evaluate(()=>({tab,open:!document.getElementById('modal').hidden}));chk(sn+': Đi làm -> Hành sự, panel closed',t.tab==='act'&&!t.open)}}}
  await reset()}
 /* rank + Việc nhờ chips */
 await reset();await p.evaluate(()=>{tab='story';render();document.querySelector('#panel [data-ktsv="rank"]').click()});await p.waitForTimeout(250);
 await p.click('#panel .kskill .ksart');await p.waitForTimeout(400);chk('rank picture -> Sắc phong panel',await p.evaluate(()=>/Sắc phong/.test((document.querySelector('#modal .kptitle')||{}).innerText||'')&&!document.getElementById('modal').hidden));
 await reset();await p.evaluate(()=>{tab='q72';render()});await p.waitForTimeout(250);await p.click('#panel .ktop .kchip');await p.waitForTimeout(300);chk('Việc nhờ counter chip -> explanation popup',await p.evaluate(()=>!!document.getElementById('kpop')&&document.getElementById('kpop').innerText.length>15));
 chk('no page errors',!errs.length);
 console.log(res.map(x=>(x[1]?'ok   ':'FAIL ')+x[0]).join('\n'));if(errs.length)console.log('ERRS',errs);await b.close();process.exit(res.every(x=>x[1])?0:1)})().catch(e=>{console.error(e);process.exit(2)});
