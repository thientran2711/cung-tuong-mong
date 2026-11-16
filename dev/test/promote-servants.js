/* review/promote-servants (D41, owner OD:L302 + gain-and-loss rule 16/11 07:15Z): she promotes her own servants (jaudit §4 Đề bạt +
   jpromsv). Logic (first size): caps per HER rank (srkMax) for maids + eunuchs on the real card button; the two-road card (Bạc / favour),
   both roads' real costs + gains + envy; favour road locked when favour is short, button still open when only Bạc is short; favour price
   by rank (bạc-equivalence); pride → monthly loyalty drop → leave card with 3 roads (keep / demote / let go); NPC mistress promotes by
   the favour road when her purse is short and a proud NPC servant moves to a higher palace; an OLD save (origin/main build) loads and
   the act works. Every size: the servant card with Đề bạt, the two-road card, the leave card — screenshot + no overflow, no page error.
   usage: node dev/test/promote-servants.js <newURL> <oldURL|-> <outdir> [WxH@dpr ...]   (file:// URLs work) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OLD0,OUT,...SZ]=process.argv;const OLD=OLD0&&OLD0!=='-'?OLD0:null;const SIZES=SZ.length?SZ:['755x1000@1','1180x820@1'];
if(OUT)fs.mkdirSync(OUT,{recursive:true});
const boot=async(p,u)=>{await p.goto(u,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<80;i++){start();if(!isSrv()&&S.rank<=2)break}Q.length=0;showModal();S.bac=300;S.suc=90;S.hh=60;S.th=60;
  S.staff.length=0;const m1=mkServ("maid"),m2=mkServ("maid"),e1=mkServ("eunuch");m1.rk=2;m2.rk=2;m2.age=(m1.age||20)+5;e1.rk=1;[m1,m2,e1].forEach(s=>{s.mp=5;s.loyal=70;s.kn=1;s.tr="trung"});S.staff.push(m1,m2,e1);render()})};
const clearQ=async p=>{for(let i=0;i<3;i++){await p.evaluate(()=>{if(!document.getElementById('tkmov')){const st=document.createElement('style');st.id='tkmov';st.textContent='.kmov{display:none!important}';document.head.appendChild(st)}/* test only: queued stage overlays (week flip, edicts) hidden for the shots */document.querySelectorAll('.kmov').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;showModal()});await p.waitForTimeout(700)}};
(async()=>{const b=await chromium.launch();const T=[];const errs=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':JSON.stringify(x).slice(0,220)]);
 for(const [si,SZs] of SIZES.entries()){const [wh,d]=SZs.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d||1,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox,#ktut,.ktip{display:none!important}';document.head.appendChild(s)})});
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(SZs+' '+e.message.slice(0,200)));p.setDefaultTimeout(60000);await boot(p,URL);
  if(si===0){
   /* 1. caps per rank: srkMax table + the real button state */
   const cap=await p.evaluate(()=>{const R=[];for(let r=0;r<=7;r++){S.rank=r;const m=srkMax(S,{role:"maid"}),e=srkMax(S,{role:"eunuch"});R.push([r,SRK.maid[m],SRK.eunuch[e]])}return R});
   const exp=[[0,'Đại cung nữ','Thái giám'],[3,'Đại cung nữ','Thủ lĩnh thái giám'],[4,'Chưởng sự cô cô','Thủ lĩnh thái giám'],[5,'Chưởng sự cô cô','Tổng quản thái giám'],[7,'Nữ quan','Tổng quản thái giám']];
   ok(exp.every(([r,m,e])=>cap[r][1]===m&&cap[r][2]===e),'cap per her rank (low rank: no Chưởng sự / no Tổng quản)',cap);
   const btn=await p.evaluate(()=>{const s=S.staff[0],e=S.staff[2];const st=r=>{S.rank=r;const h=servJudgeBtns(s).join(""),he=servJudgeBtns(e).join("");const g=x=>{const m=x.match(/<button data-kneed="[^"]*" data-dbsv[^>]*>/);return m?/disabled/.test(m[0]):null};return{m:g(h),e:g(he),mt:(h.match(/Đề bạt lên [^<]+/)||[""])[0],et:(he.match(/Đề bạt lên [^<]+/)||[""])[0],why:(h.match(/kwhy">([^<]+)/)||[])[1]}};return{r2:st(2),r4:st(4)}});
   ok(btn.r2.m===true&&/Đại cung nữ/.test(btn.r2.why||'')&&btn.r4.m===false&&/Chưởng sự cô cô/.test(btn.r4.mt),'maid card: rank 2 locked (reason names the cap), rank 4 open to Chưởng sự cô cô',btn);
   ok(btn.r2.e===true&&btn.r4.e===false&&/Thủ lĩnh/.test(btn.r4.et),'eunuch card: rank 2 locked, rank 4 open to Thủ lĩnh (Tổng quản needs rank 5)',btn);
   /* 2. favour price by rank (bạc-equivalence) */
   const fp=await p.evaluate(()=>{const s=S.staff[0];const R={};for(const r of [2,4,6,7]){S.rank=r;const f=spFav(S,s);R[r]={bac:dbCost(s),fav:f.n,k:f.k,pay:BAL.pay[r]}}S.rank=4;return R});
   ok(fp[2].fav>fp[4].fav&&fp[4].fav>fp[6].fav&&fp[2].k==='hh'&&fp[7].k==='th','favour price falls as her stipend rises; Hoàng hậu herself asks the Thái hậu',fp);
   /* 3. the two-road card from the real button; Bạc road */
   await p.evaluate(()=>{S.rank=4;tab="staff";render()});await p.waitForTimeout(300);
   await p.evaluate(()=>{const b=document.querySelector('#panel [data-pg="staff"][data-pi="1"]');if(b)b.click()});await p.waitForTimeout(300);
   const open=await p.evaluate(()=>{const b=document.querySelector('#panel [data-dbsv]');if(!b)return{nobtn:1};b.click();const m=Q[0];return{t:m&&m.t,n:m&&m.opts&&m.opts.map(o=>o.n),dis:m&&m.opts&&m.opts.map(o=>!!o.tsDis),shown:!document.getElementById('modal').hidden}});
   ok(open.t&&/Đề bạt/.test(open.t)&&open.n.length===2&&open.dis.every(x=>!x)&&open.shown,'button opens the two-road card (both open)',open);
   const rb=await p.evaluate(()=>{const s=S.staff[0],o2=S.staff[1],e=S.staff[2];const b0={bac:S.bac,hh:S.hh,rk:srk(s),l:s.loyal,l2:o2.loyal,le:e.loyal,k:S.used||0};const R=Math.random;Math.random=()=>0.01;try{chooseM(0)}finally{Math.random=R}
    return{b0,bac:S.bac,hh:S.hh,rk:srk(s),l:s.loyal,l2:o2.loyal,le:e.loyal,cost:BAL.dbCost[3],proud:!!s.proud,kh:(S.used||0)}});
   ok(rb.bac===rb.b0.bac-rb.cost&&rb.hh===rb.b0.hh&&rb.rk===rb.b0.rk+1,'Bạc road: Bạc −dbCost, favour untouched, rank +1',rb);
   ok(rb.l>=rb.b0.l+8-3&&rb.le===rb.b0.le-3&&rb.l2===rb.b0.l2-3-5,'gain + loss: promoted lòng +8, others −3 envy, the passed-over senior −5 more',rb);
   await clearQ(p);
   /* 4. favour road (a second servant, eunuch → Thủ lĩnh) */
   const fr=await p.evaluate(()=>{const e=S.staff[2];S.bac=0;const f=spFav(S,e);const h=servJudgeBtns(e).join("");const dis=/<button data-kneed="[^"]*" data-dbsv[^>]*disabled/.test(h);spOpen(e);const m=Q[0];
    const b0={bac:S.bac,hh:S.hh,rk:srk(e)};const R=Math.random;Math.random=()=>0.01;try{chooseM(1)}finally{Math.random=R}return{f:f.n,dis,locked0:m.opts[0].tsDis,b0,bac:S.bac,hh:S.hh,rk:srk(e),nm:srkName(e)}});
   ok(!fr.dis&&fr.locked0&&fr.bac===0&&fr.hh===fr.b0.hh-fr.f&&fr.rk===fr.b0.rk+1,'favour road: open with 0 Bạc, Bạc road locked, Hoàng hậu quý ngươi −price, rank +1',fr);
   const lk=await p.evaluate(()=>{Q.length=0;const s=S.staff[1];S.bac=0;S.hh=1;const h=servJudgeBtns(s).join("");const why=(h.match(/Đề bạt lên[\s\S]*?kwhy">([^<]+)/)||[])[1];S.bac=300;spOpen(s);const m=Q[0];const r={why,bacLock:m.opts[0].tsDis,favLock:m.opts[1].tsDis};Q.length=0;S.hh=60;return r});
   ok(lk.why&&/thiếu bạc/.test(lk.why)&&/Hoàng hậu quý ngươi/.test(lk.why)&&!lk.bacLock&&lk.favLock,'both short → button names both prices; with Bạc only the favour road is locked',lk);
   await clearQ(p);
   /* 5. pride → monthly → leave card with three roads */
   const pr=await p.evaluate(()=>{S.staff.forEach(x=>x.proud=0);const s=S.staff[0];s.proud=S.turn+6;s.loyal=58;const o=S.staff[1],l0=o.loyal;const R=Math.random;Math.random=()=>0.01;let ev;try{ev=spMonth()}finally{Math.random=R}
    const m=Q[0];return{l:s.loyal,lo:o.loyal,l0,t:m&&m.t,n:m&&m.opts.map(x=>x.n)}});
   ok(pr.l===55&&pr.lo===pr.l0-1&&pr.t==='Kẻ hầu xin đi'&&pr.n.length===3,'pride: lòng −3/month, others −1, leave card with 3 roads',pr);
   const dm=await p.evaluate(()=>{const s=S.staff[0];const rk=srk(s);chooseM(1);return{rk0:rk,rk:srk(s),proud:s.proud,l:s.loyal}});
   ok(dm.rk===dm.rk0-1&&!dm.proud&&dm.l===pr.l-15,'demote road: rank −1, pride ends, lòng −15',dm);
   const lg=await p.evaluate(()=>{const s=S.staff[1];s.proud=S.turn+3;spLeaveCard(s);const n0=S.staff.length;chooseM(2);return{n0,n:S.staff.length,gone:!S.staff.includes(s)}});
   ok(lg.gone&&lg.n===lg.n0-1,'let-go road: the servant leaves her household',lg);
   const kp=await p.evaluate(()=>{const s=S.staff[0];s.proud=S.turn+1;S.bac=100;spLeaveCard(s);const b0=S.bac,l0=s.loyal;chooseM(0);return{d:b0-S.bac,dl:s.loyal-l0,pm:s.proud-S.turn}});
   ok(kp.d>0&&kp.dl===6&&kp.pm===4,'keep road: Bạc paid, lòng +6, pride lasts 3 months more',kp);
   await clearQ(p);
   /* 6. NPC mistress: favour road when the purse is short; proud NPC servant moves to a higher palace */
   const np=await p.evaluate(()=>{const L=liveRivals(true);const v=L.find(x=>rkOf(x)>=4&&!x.queen&&x!==queenP());if(!v)return{none:1};v.staff=v.staff||[];v.staff.length=0;const s=mkServ("maid");s.rk=2;s.mp=9;s.loyal=80;v.staff.push(s);v.bac=0;
    const q=queenP();if(q&&q!==S){q.rl=q.rl||{};q.rl[v.id]=60}else v.th=60;const a0=q&&q!==S?aff(q,v):v.th;const R=Math.random;Math.random=()=>0.1;try{servRanks()}finally{Math.random=R}
    const a1=q&&q!==S?aff(q,v):v.th;return{rk:srk(s),a0,a1,bac:v.bac,who:q&&q!==S?'hh':'th'}});
   ok(np.none||(np.rk>=3&&np.a1<np.a0&&np.bac===0),'NPC: promotes by the favour road when her purse is short (her standing drops)',np);
   const nl=await p.evaluate(()=>{const L=liveRivals(true).filter(x=>!x.out).sort((a,b)=>rkOf(a)-rkOf(b));const lo=L[0],hi=L.find(x=>rkOf(x)>rkOf(lo));if(!lo||!hi)return{none:1};lo.staff=lo.staff||[];const s=mkServ("maid");s.rk=1;s.loyal=40;s.proud=S.turn+5;lo.staff.push(s);hi.staff=(hi.staff||[]).filter(x=>x.role!=="maid");
    const R=Math.random;Math.random=()=>0.01;try{spMonth()}finally{Math.random=R}const w=ownerOf(s);return{moved:w!==lo,toHigher:w?rkOf(w)>rkOf(lo):null,proud:s.proud}});
   ok(nl.none||(nl.moved&&nl.toHigher!==false&&!nl.proud),'NPC: a proud servant with low loyalty leaves for a higher palace (same rule as hers)',nl);
   await clearQ(p);
  }
  /* shots: the servant card with Đề bạt, the two-road card, the leave card */
  const tag=`${W}x${H}`;await clearQ(p);
  await p.evaluate(()=>{Q.length=0;showModal();S.used=0;try{used=0}catch(e){}S.buoi=0;S.rank=4;S.bac=300;S.hh=60;const s=S.staff.find(x=>x.role==="maid")||S.staff[0];s.rk=2;s.mp=5;s.loyal=70;s.proud=0;tab="staff";render()});await p.waitForTimeout(300);
  await p.evaluate(()=>{const b=document.querySelector('#panel [data-pg="staff"][data-pi="1"]');if(b)b.click()});await p.waitForTimeout(400);
  await p.evaluate(()=>{const b=document.querySelector('#panel [data-dbsv]');if(b)b.scrollIntoView({block:'center'})});await p.waitForTimeout(200);
  const ov=()=>p.evaluate(()=>({x:document.documentElement.scrollWidth>innerWidth+1,cut:[...document.querySelectorAll('#modal:not([hidden]) .opt, #panel [data-dbsv]')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<-1)}).length}));
  if(process.env.DBG)console.log(await p.evaluate(()=>{let e=document.elementFromPoint(innerWidth/2,innerHeight/2);const L=[];while(e&&e!==document.body){L.push(e.tagName+'#'+e.id+'.'+String(e.className).slice(0,40));e=e.parentElement}return L.join(' < ')}));
  let o1=await ov();ok(!o1.x&&!o1.cut,`${tag} card: no overflow`,o1);if(OUT)await p.screenshot({path:`${OUT}/card-${tag}.jpg`,type:'jpeg',quality:70});
  await clearQ(p);await p.evaluate(()=>{const b=document.querySelector('#panel [data-dbsv]');if(b)b.click()});await p.waitForTimeout(500);
  await p.waitForTimeout(1200);o1=await ov();const clip=await p.evaluate(()=>{const L=[...document.querySelectorAll('#modal .opt')];const R=L.map(e=>e.getBoundingClientRect());return{clipped:L.filter(e=>e.scrollHeight>e.clientHeight+2).length,overlap:R.some((r,i)=>i&&r.top<R[i-1].bottom-1)}});
  ok(!o1.x&&!o1.cut&&!clip.clipped&&!clip.overlap,`${tag} two-road card: no overflow, option cards not clipped / overlapping`,Object.assign(o1,clip));if(OUT)await p.screenshot({path:`${OUT}/roads-${tag}.jpg`,type:'jpeg',quality:70});
  await clearQ(p);await p.evaluate(()=>{Q.length=0;const s=S.staff.find(x=>x.role==="maid")||S.staff[0];s.proud=S.turn+3;spLeaveCard(s);showModal()});await p.waitForTimeout(500);
  o1=await ov();ok(!o1.x&&!o1.cut,`${tag} leave card: no overflow`,o1);if(OUT)await p.screenshot({path:`${OUT}/leave-${tag}.jpg`,type:'jpeg',quality:70});
  await ctx.close()}
 /* 7. old save (origin/main build) → this build */
 if(OLD){const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});await ctx.addInitScript(()=>{window.__nlInner=1});const p=await ctx.newPage();
  await boot(p,OLD);const sav=await p.evaluate(()=>{S.rank=4;return JSON.stringify(ser())});await ctx.close();
  const c2=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});await c2.addInitScript(()=>{window.__nlInner=1});const q=await c2.newPage();const e2=[];q.on('pageerror',e=>e2.push(e.message));
  await boot(q,URL);const r=await q.evaluate(sv=>{try{deser(JSON.parse(sv));render();const s=S.staff[0];const ev=servRanks();spOpen(s);const n=Q[0]&&Q[0].opts.length;Q.length=0;tab="staff";render();return{ok:true,n,proud:s.proud==null}}catch(e){return{err:String(e)}}},sav);
  await q.waitForTimeout(300);ok(r.ok&&r.n===2&&!e2.length,'old save (origin/main) loads; monthly + Đề bạt card work',{r,e2});await c2.close()}
 await b.close();ok(!errs.length,'no page errors',errs.slice(0,4));
 for(const t of T)console.log(t.join(' | '));const f=T.filter(t=>t[0]==='FAIL').length;console.log(`${T.length-f}/${T.length} PASS`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
