/* D38 lost items + item rivalry (jlost, review/lost-items-port): flow test on the built site, one viewport per run.
   usage: node dev/test/lost-items.js <url of root index.html> <W>x<H> [shotdir]
   Scenarios (each forces the dice where needed, then checks the real state):
    1 her item thất lạc → notice with the §64 item tag (.kiev) → Tư trang › Việc shows "Đồ thất lạc" with the tra xét act cards
    2 it turns up in another palace → she learns where → "Báo Cung Chính ti thu hồi" → hearing → item back in her chest (holder cleared:
      it only turned up there, no lie — evidence truth)
    3 an NPC's item lands openly in her chest, she never denies it → the owner raises it → CLEARED without a roll (no penalty)
    4 the same but she says "Nói không thấy" (a real lie) → the j92 hearing dialog with the owner field opens
    5 her own theft (act laydo, bạc road) → the item sits in her chest as a case; "Lén trả lại" sends it back, no one punished
    6 an NPC thief keeps her item → she investigates (Báo Cung Chính ti) → learns where → raises → loKeepHear → item back, thief punished
    7 person card of a rival: "Sai người lấy trộm đồ" + "Sai cung nữ thân tín lấy đồ" in Hại nặng
   Checks: page errors, horizontal overflow of the panel, modal fits the viewport. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,SHOT]=process.argv;const [W,H]=(VP||'1180x820').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,300))});
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.addStyleTag({content:'#kroul,#kroulw,#kload,.krbox,#dawn,#curtain,.fxo,.kmalarm,.kmnote{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof loLose==='function',null,{timeout:120000});await p.waitForTimeout(5000);
 const shot=async n=>{if(!SHOT)return;await p.evaluate(()=>window.unov&&unov());fs.mkdirSync(SHOT,{recursive:true});await p.screenshot({path:`${SHOT}/${W}x${H}-${n}.png`})};
 const fit=()=>p.evaluate(()=>{const o={};const pn=document.getElementById('panel');if(pn)o.panelOver=pn.scrollWidth>pn.clientWidth+2;const M=document.getElementById('modal');if(M&&!M.hidden){const d=M.querySelector('.dlg')||M;const r=d.getBoundingClientRect();o.modalFit=r.left>=-1&&r.right<=innerWidth+1&&r.top>=-1}o.docOver=document.documentElement.scrollWidth>innerWidth+2;return o});
 const R={};
 await p.evaluate(()=>{document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();let ok=false;try{ok=!(typeof isSrv==="function"&&isSrv())&&liveRivals(true).length>=3}catch(e){}if(ok)break}
  for(let i=0;i<6&&!S.dead;i++){Q.length=0;endTurn()}S.lost=[];S.loCd=0;
  Q.length=0;S.bac=500;window.__RND=Math.random;window.force=v=>{Math.random=()=>v};window.unforce=()=>{Math.random=window.__RND};
  window.unov=()=>document.querySelectorAll("#kroul").forEach(x=>x.remove());unov();setTimeout(unov,500);
  window.valK=()=>Object.keys(IT).find(k=>IT[k]&&IT[k].pr>=60&&!IT[k].nt&&!IT[k].evi&&!IT[k].story&&!IT[k].keep&&!IT[k].il&&!IT[k].dr);render()});
 /* 1 */
 R.s1=await p.evaluate(()=>{const k=valK();S.inv.push({k});S.loCd=0;const c=loLose(S,{cause:"srv",sv:"Tiểu Lan"});showModal();render();
  return{k,case:!!c,modal:!document.getElementById('modal').hidden,title:document.getElementById('mt').textContent,tag:!!document.querySelector('#mb .kiev'),ledger:(S.tsbLog||[]).some(x=>x.lo===c.id)}});
 await shot('1-notice');R.s1.fit=await fit();
 await p.evaluate(()=>{while(Q.length)closeModal();try{KINV_SUB="viec"}catch(e){}const t=document.querySelector('[data-tab="inv"]');if(t)t.click()});await p.waitForTimeout(600);
 R.s1.viec=await p.evaluate(()=>{const v=document.querySelector('#panel [data-kinvpane="viec"]');const t=v?v.textContent:'';return{sec:/Đồ thất lạc/.test(t),ask:/Hỏi cung nhân/.test(t),cct:/Báo Cung Chính ti/.test(t),book:/Đối chiếu sổ Nội vụ phủ/.test(t)}});
 await shot('1-tutrang-viec');R.s1.fit2=await fit();
 /* 2 */
 R.s2=await p.evaluate(()=>{const c=S.lost.find(x=>x.own==="me"&&x.st!=="done");LO.home.srv=0;LO.away.srv=100;c.due=wk();force(0.5);loWeek();unforce();
  const h=c.at&&byKey(c.at);if(!h)return{err:"not held",st:c.st};const x=loEntry(c);if(x&&x.worn){lostUnwear(h)}c.lied=0;c.wo=1;/* no NPC wearing in this run */
  loKnowAt(c,S,"Có người báo tin");Q.length=0;loUI("raise",c.id);const hear=c.hear;Q.length=0;c.hear=wk();const n0=S.inv.filter(e=>e.k===c.k).length;const d0=h.danh;loWeek();
  return{held:c.at,hearSet:!!hear,st:c.st,back:S.inv.filter(e=>e.k===c.k).length>n0,holderDanh:[d0,h.danh],ledgerBack:(S.tsbLog||[]).some(x=>x.lo===c.id&&x.back)}});
 await p.evaluate(()=>{showModal();render()});await shot('2-hearing');R.s2.fit=await fit();await p.evaluate(()=>{while(Q.length)closeModal()});
 /* 3 */
 R.s3=await p.evaluate(()=>{const v=liveRivals(true).find(x=>x.alive&&!x.out);const k=valK();v.inv.push({k});v.loCd=0;S.lost=S.lost.filter(c=>c.own!==key(v));
  const c=loLose(v,{cause:"mis"});const i=-1;const e=Object.assign({},c.e,{lo:c.id,gh:c.own});S.inv.push(e);c.st="held";c.at="me";c.open=1;
  const d0=S.danh,s0=S.sung;loRaise(c,v);Q.length=0;c.hear=wk();loWeek();const shown=Q.length;showModal();
  return{who:v.name,st:c.st,danh:[d0,S.danh],sung:[s0,S.sung],gone:!S.inv.includes(e),backToOwner:v.inv.some(x=>x.k===k&&!x.lo),notice:document.getElementById('mt').textContent,txt:(document.getElementById('mb').textContent||'').slice(0,160),shown}});
 await shot('3-cleared');R.s3.fit=await fit();await p.evaluate(()=>{while(Q.length)closeModal()});
 /* 4 */
 R.s4=await p.evaluate(()=>{const v=liveRivals(true).filter(x=>x.alive&&!x.out)[1];const k=valK();v.inv.push({k});S.lost=S.lost.filter(c=>c.own!==key(v));
  const c=loLose(v,{cause:"mis"});const e=Object.assign({},c.e,{lo:c.id,gh:c.own});S.inv.push(e);c.st="found";c.at="me";c.open=1;c.kn[c.own]=1;
  Q.length=0;pushDil(mkP("loask",{id:c.id}),"Đồ thất lạc");showModal();const tag=!!document.querySelector('#mb .kiev');const opts=[...document.querySelectorAll('#mb .opt')].map(b=>b.textContent.slice(0,30));return{tag,opts,id:c.id}});
 await shot('4-loask');R.s4.fit=await fit();
 R.s4b=await p.evaluate(id=>{const B=[...document.querySelectorAll('#mb .opt')];const nb=B.find(b=>/Nói không thấy/.test(b.textContent));if(nb)nb.click();const c=loGet(id);while(Q.length)closeModal();c.hear=wk();loWeek();showModal();
  return{lied:c.lied,dlg:document.getElementById('mt').textContent,opts:[...document.querySelectorAll('#mb .opt')].map(b=>b.textContent.slice(0,40))}},R.s4.id);
 await shot('4-hearing-dialog');R.s4b.fit=await fit();await p.evaluate(()=>{while(Q.length){if(Q[0].opts)chooseM(Q[0].opts.length-1);else closeModal()}});
 /* 5 */
 R.s5=await p.evaluate(()=>{const v=liveRivals(true).filter(x=>x.alive&&!x.out)[2];const k=valK();v.inv.push({k});S.lost=S.lost.filter(c=>c.own!==key(v));S.bac=500;
  const ok=ACT.laydo.ok(S,v);const c0=caught;caught=()=>"";force(0.01);let r="";try{r=ACT.laydo.f(S,v)}finally{unforce();caught=c0}
  const c=S.lost.find(x=>x.own===key(v)&&x.by==="me");const mine=c&&S.inv.find(e=>e.lo===c.id);Q.length=0;
  const grp=rvGroups(v,0).find(g=>g[0]==="Đồ thất lạc");return{ok,r:r.replace(/<[^>]+>/g,''),keep:c&&c.keep,mine:!!mine,id:c&&c.id,v:v.name,cardGroup:!!grp}});
 await p.evaluate(()=>{const t=document.querySelector('[data-tab="inv"]');if(t)t.click();render()});await p.waitForTimeout(500);
 R.s5.viec=await p.evaluate(()=>/Lén trả lại/.test((document.querySelector('#panel [data-kinvpane="viec"]')||{}).textContent||''));await shot('5-thief-viec');R.s5.fit=await fit();
 R.s5b=await p.evaluate(id=>{S.khac=Math.max(S.khac||0,4);const c=loGet(id);const v=byKey(c.own);loUI("sneak",id);const back=v.inv.some(e=>e.k===c.k&&!e.lo);while(Q.length)closeModal();return{st:c.st,back,stillMine:S.inv.some(e=>e.lo===id)}},R.s5.id);
 /* 6 */
 R.s6=await p.evaluate(()=>{const v=liveRivals(true).filter(x=>x.alive&&!x.out)[0];const k=valK();S.inv.push({k});S.lost=S.lost.filter(c=>c.own!=="me");S.loCd=0;
  const c=loLose(S,{cause:"riv",by:key(v),keep:1});Q.length=0;const inThief=v.inv.some(e=>e.lo===c.id);S.khac=8;S.bac=500;
  force(0.01);loUI("cct",c.id);unforce();Q.length=0;const known=c.st;const ev=evG(S,v);S.khac=8;loUI("raise",c.id);Q.length=0;c.hear=wk();const d0=v.danh;force(0.01);loWeek();unforce();
  return{inThief,known,ev,st:c.st,back:S.inv.some(e=>e.k===k&&!e.lo),thiefDanh:[d0,v.danh]}});
 await p.evaluate(()=>{showModal();render()});await shot('6-keep-hearing');R.s6.fit=await fit();await p.evaluate(()=>{while(Q.length)closeModal()});
 /* 7 */
 R.s7=await p.evaluate(()=>{const v=liveRivals(true).filter(x=>x.alive&&!x.out)[1];const k=valK();v.inv.push({k});S.lost=S.lost.filter(c=>c.own!==key(v));const G=rvGroups(v,0);const h=(G.find(g=>g[0]==="Hại nặng")||[,[]])[1].join(' ');
  return{laydo:/Sai người lấy trộm đồ/.test(h),laydol:/Sai cung nữ thân tín lấy đồ/.test(h)}});
 /* a few weeks of play with the module live */
 R.play=await p.evaluate(()=>{let w=0;for(let i=0;i<16&&!S.dead;i++){Q.length=0;endTurn();w++}Q.length=0;render();return{w,cases:(S.lost||[]).length}});
 R.errs=errs;console.log(JSON.stringify(R,null,1));await b.close()})();
