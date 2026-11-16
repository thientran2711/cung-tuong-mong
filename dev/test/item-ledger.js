/* Item ledger + conservation (jil.js, review/item-ledger): flow test on the built site, one viewport per run.
   usage: node dev/test/item-ledger.js <url of root index.html> <W>x<H> [shotdir]
   1 she sells a piece → it is in the market box → it shows up in the Nội vụ phủ tray (kitShop tile "Đồ cũ của ta") → buy back → in her chest
   2 sold again → by the ceiling a ransom visit (PEND ilback, kit dialog) → "Chuộc về" → in her chest; unpaid → it stays out and comes again
   3 confiscated (vượt phẩm) → Nội vụ phủ store → after BAL.il.confW weeks the atonement dialog → back
   4 a ngự tứ robe lost by a servant → a lost case (never gone); broken → mended → back with a notice
   5 a higher-rank holder: the search button is "Tâu Hoàng thượng xin soát cung", locked until BAL.il.empEv real evidence
   6 Tư trang › Việc shows "Đồ ở nơi khác"; 7 cướp y phục → the robe is in the plotter's chest (a case)
   8 old save (no S.il): census gives every piece an id, nothing moves, no errors; 9 a dead consort's effects go to the store
   Checks: page errors, panel / document overflow, modal fits the viewport. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,SHOT]=process.argv;const [W,H]=(VP||'1180x820').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,300))});
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.addStyleTag({content:'#kroul,#kroulw,#kload,.krbox,#dawn,#curtain,.fxo,.kmalarm,.kmnote{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof ilAudit==='function',null,{timeout:0});await p.waitForTimeout(4000);
 const shot=async n=>{if(!SHOT)return;fs.mkdirSync(SHOT,{recursive:true});await p.screenshot({path:`${SHOT}/${W}x${H}-${n}.png`})};
 const fit=()=>p.evaluate(()=>{const o={};const pn=document.getElementById('panel');if(pn)o.panelOver=pn.scrollWidth>pn.clientWidth+2;const M=document.getElementById('modal');
  if(M&&!M.hidden){const d=M.querySelector('.dlg')||M;const r=d.getBoundingClientRect();o.modalFit=r.width<=innerWidth+1&&r.left>=-1}o.docOver=document.documentElement.scrollWidth>innerWidth+2;return o});
 const R={};
 await p.evaluate(()=>{document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();let ok=false;try{ok=!(typeof isSrv==="function"&&isSrv())&&liveRivals(true).length>=3}catch(e){}if(ok)break}
  for(let i=0;i<3&&!S.dead;i++){Q.length=0;endTurn()}Q.length=0;S.bac=900;window.__RND=Math.random;window.force=v=>{Math.random=()=>v};window.unforce=()=>{Math.random=window.__RND};
  window.durK=()=>Object.keys(IT).find(k=>IT[k]&&IT[k].pr>=40&&ilDur({k})&&!IT[k].nt&&!IT[k].keep&&!IT[k].sl);render()});
 /* 1 */
 R.s1=await p.evaluate(()=>{const k=durK();S.inv.push({k});const ix=S.inv.length-1;const e=S.inv[ix];const r=sellItem(S,ix);const x=ilS().box.find(b=>b.e===e);
  if(x)x.shop=1;return{k,sold:!!r,inMkt:!!x&&x.at==="mkt",ret:x?x.ret-wk():null}});
 await p.evaluate(()=>{invAct("shop")});await p.waitForTimeout(500);
 R.s1.tile=await p.evaluate(()=>/Đồ cũ của ta/.test(document.body.textContent));await shot('1-tray');R.s1.fit=await fit();
 R.s1.back=await p.evaluate(()=>{const t=ilShopTiles()[0];const n0=S.inv.length;if(t)t.onBuy();while(Q.length)closeModal();return{bought:S.inv.length===n0+1,boxLeft:ilS().box.filter(x=>x.at==="mkt"&&x.own==="me").length}});
 /* 2 */
 R.s2=await p.evaluate(()=>{const k=durK();S.inv.push({k});const e=S.inv[S.inv.length-1];sellItem(S,S.inv.length-1);const x=ilS().box.find(b=>b.e===e);x.ret=wk();Q.length=0;force(.99);ilWeek();unforce();showModal();render();
  const M=document.getElementById('modal');return{dialog:!M.hidden,title:document.getElementById('mt').textContent,txt:(document.getElementById('mb')||{}).textContent||"",u:e.iu}});
 await shot('2-ransom');R.s2.fit=await fit();
 R.s2.paid=await p.evaluate(u=>{const B=[...document.querySelectorAll('#modal button')].find(b=>/Chuộc về/.test(b.textContent));if(B)B.click();while(Q.length)closeModal();return{btn:!!B,inChest:S.inv.some(e=>e.iu===u)}},R.s2.u);
 /* 3 */
 R.s3=await p.evaluate(()=>{const k=Object.keys(IT).find(k=>IT[k]&&IT[k].sl&&IT[k].rk>S.rank&&ilDur({k})&&!IT[k].nt);S.inv.push({k,w:1});const e=S.inv[S.inv.length-1];ilFilter(S,x=>x!==e,"conf");const x=ilS().box.find(b=>b.e===e);
  if(x)x.rel=wk();Q.length=0;ilWeek();showModal();render();const M=document.getElementById('modal');return{k,conf:!!x&&x.why==="conf",dialog:!M.hidden,title:document.getElementById('mt').textContent,u:e.iu}});
 await shot('3-atone');R.s3.fit=await fit();
 R.s3.back=await p.evaluate(u=>{const B=[...document.querySelectorAll('#modal button')].find(b=>/sám hối/.test(b.textContent));if(B)B.click();while(Q.length)closeModal();return{btn:!!B,inChest:S.inv.some(e=>e.iu===u)}},R.s3.u);
 /* 4 */
 R.s4=await p.evaluate(()=>{const k=Object.keys(WD_ITEMS).find(k=>WD_ITEMS[k].nt);if(!k)return{skip:1};S.inv.push({k,own:"me",nt:1});const e=S.inv[S.inv.length-1];ilUid(e);wdNtRemove(S,e,"bị mất");
  const c=(S.lost||[]).find(c=>c.e&&c.e.iu===e.iu);S.inv.push({k,own:"me",nt:1});const e2=S.inv[S.inv.length-1];ilUid(e2);wdNtRemove(S,e2,"bị làm vỡ");const x=ilS().box.find(b=>b.e===e2);if(x)x.rel=wk();
  Q.length=0;endTurn();const back=S.inv.some(z=>z.iu===e2.iu);const note=Q.some(q=>q.t==="Đồ sửa xong")||document.getElementById('mt').textContent==="Đồ sửa xong";while(Q.length)closeModal();
  return{k,lostCase:!!c,where:ilWhere(e),fix:!!x,back,note}});
 /* 5 */
 R.s5=await p.evaluate(()=>{const h=liveRivals(true).filter(v=>rkOf(v)>S.rank)[0];if(!h)return{skip:1};const k=durK();S.inv.push({k});const e=S.inv[S.inv.length-1];
  const c=loLoseE(S,e,"srv");S.inv.splice(S.inv.indexOf(e),1);const x=Object.assign({},e,{lo:c.id,gh:"me"});h.inv.push(x);c.st="found";c.at=key(h);c.kn.me=1;c.cev=0;
  const btns=()=>loActs(c).join("");const a=btns();const lock=/Tâu Hoàng thượng xin soát cung/.test(a)&&/phẩm cao hơn/.test(a);c.cev=BAL.il.empEv;const b2=btns();
  window.__c5=c;return{lock,open:/Tâu Hoàng thượng xin soát cung/.test(b2)&&!/phẩm cao hơn/.test(b2)}});
 /* 6 */
 await p.evaluate(()=>{const k=durK();S.inv.push({k});const e=S.inv[S.inv.length-1];sellItem(S,S.inv.length-1);while(Q.length)closeModal();try{KINV_SUB="viec"}catch(x){}const t=document.querySelector('[data-tab="inv"]');if(t)t.click()});
 await p.waitForTimeout(600);R.s6=await p.evaluate(()=>{const v=document.querySelector('#panel [data-kinvpane="viec"]')||document.getElementById('panel');const t=v?v.textContent:'';return{sec:/Đồ ở nơi khác/.test(t),out:/Ở ngoài cung/.test(t),raise:/Tâu Hoàng thượng xin soát cung/.test(t)}});
 await shot('6-viec');R.s6.fit=await fit();
 /* 7 */
 R.s7=await p.evaluate(()=>{const v=liveRivals(true)[0];const k=Object.keys(WD_ITEMS).find(k=>WD_ITEMS[k].sl==="y"&&!WD_ITEMS[k].nt&&WD_ITEMS[k].pr>0);const w=wdOf(S);w.y={k};const e=w.y;S.tyOmen={by:v.id,until:wk()+2};
  const ok=tyRob(0);while(Q.length)closeModal();const c=(S.lost||[]).find(c=>c.rob&&c.own==="me");return{robbed:ok!==false,case:!!c,atPlotter:!!c&&c.at===v.id,inChest:(v.inv||[]).some(z=>z.iu===e.iu)}});
 /* 8 */
 R.s8=await p.evaluate(()=>{const n=ilSlots(S).length;delete S.il;for(const pp of ilPeople())for(const e of ilSlots(pp))delete e.iu;const s=JSON.stringify(S);ilCensus();const ids=ilPeople().flatMap(ilSlots).every(e=>e.iu>0);
  Q.length=0;endTurn();Q.length=0;return{n,ids,net:ilS().net,saveKB:Math.round(s.length/1024),ilKB:Math.round(JSON.stringify(S.il).length/1024)}});
 /* 9 */
 R.s9=await p.evaluate(()=>{const v=liveRivals(true).find(v=>ilSlots(v).some(ilDur));if(!v)return{skip:1};const n=ilSlots(v).filter(ilDur).length;v.alive=false;ilCensus();const L=ilS().box.filter(x=>x.why==="dead"&&x.own===v.id).length;return{n,toStore:L}});
 /* weeks of play, conservation holds */
 R.play=await p.evaluate(()=>{for(let i=0;i<20&&!S.dead;i++){Q.length=0;try{endTurn()}catch(e){console.error(e)}}Q.length=0;return{net:ilS().net,box:ilS().box.length,log:ilS().log.length}});
 R.errs=errs;console.log(JSON.stringify(R,null,1));await b.close()})();
