/* opt-greyed: a known option she cannot take (cost/rank/item) is shown GREYED with a reason chip, not tappable; kitTam on stand-in pictures.
   usage: node dev/test/opt-greyed.js <url> <shotdir> [WxH,...]   Exit 1 on failure. */
const {chromium}=require('playwright');const [,,URL,DIR,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  const r=await p.evaluate(async()=>{Q.length=0;document.getElementById('modal').hidden=true;S.bac=3;
   const hit=[];const o1=kitOff({n:"Ma ma giáo tập (thử)",fx:{},x:"Nắm chắc · tốn: 2 khắc, Sức -10, Bạc -40 · thành: tiến bộ +2..3",go:()=>{window.__took=1}},kitWhyBac(40),kitWhenBac());
   const o2={n:"Việc bình thường",fx:{},x:"Chắc chắn · tốn: 1 khắc · thành: không đổi gì",go:()=>{window.__ok=1}};
   Q.push({t:"Thử lựa chọn xám",h:"<p>Một lựa chọn đã biết nhưng chưa thể chọn.</p>",opts:[o1,o2,{n:"Thôi",fx:{},x:""}]});showModal();await new Promise(r=>setTimeout(r,700));
   const bs=[...document.querySelectorAll("#modal .opt")];const g=bs.find(x=>/Ma ma/.test(x.textContent));
   const out={n:bs.length,dis:g&&g.disabled,txt:g&&g.textContent.replace(/\s+/g," "),grey:g&&g.classList.contains("kdis")};
   if(g)g.click();out.took=!!window.__took;return out});
  await p.screenshot({path:`${DIR}/opt-${sz}.png`});
  const tm=await p.evaluate(async()=>{Q.length=0;document.getElementById('modal').hidden=true;let a=null;try{a=kpmArt(0)}catch(e){}
   const h=kitPalaceMap({slot:0,k:null});const pn=document.getElementById('panel');pn.innerHTML=h;{const o=document.createElement('div');o.id='tamov';o.style.cssText='position:fixed;left:20px;top:20px;width:'+Math.min(innerWidth-40,700)+'px;z-index:99999;background:#f5ecdc';o.innerHTML=h.replace(/<img class="mapimg"[^>]*>/,'<div class="mapimg" style="height:360px;background:#7a6a55"></div>');document.body.appendChild(o)}await new Promise(r=>setTimeout(r,900));
   const has=!!pn.querySelector('.ktam');return{tam:a&&a.tam,has,none:kitTam(false)===''&&kitTam(true).includes('tạm')}});
  await p.screenshot({path:`${DIR}/tam-${sz}.png`});console.log(sz,'tam',JSON.stringify(tm));if(!tm.none||(tm.tam&&!tm.has)||(!tm.tam&&tm.has))bad++;

  /* opt-greyed-2: engine need[] -> kitWhy chip for the item / evidence gated options (jface, jtruth, jtoilr, j70 accuse) */
  const r2=await p.evaluate(async()=>{const out={};{const o=document.getElementById('tamov');if(o)o.remove()}const v=liveRivals(true).find(r=>rkOf(r)<7);if(!v)return{err:"no rival"};
   const find=(o,re)=>(o||[]).find(c=>re.test(c.n));const st=c=>c?{off:!!c.off,why:c.off&&c.off.why,when:c.off&&c.off.when}:null;
   S.inv=(S.inv||[]).filter(e=>e.k!=="giaidoc");S.pz={until:wk()+4,sev:1,by:null};
   let d=PEND.pzcard({});out.antNo=st(find(d.o,/thuốc giải trong rương/));S.inv.push({k:"giaidoc"});d=PEND.pzcard({});out.antYes=st(find(d.o,/thuốc giải trong rương/));S.pz=null;
   S.maid=S.maid||{name:"Tiểu Hà"};S.maid.loyal=10;S.doctor=false;S.arts=S.arts||{};S.arts.y=0;v.ev=0;
   let t=PEND.vuoan({a:key(v),why:"bị vu dùng bùa ngải"});out.maidNo=st(find(t.o,/làm chứng/));out.tyNo=st(find(t.o,/Thái y nghiệm/));out.evNo=st(find(t.o,/Trình chứng cứ/));
   S.maid.loyal=BAL.truth.witLoy;S.doctor=true;v.ev=1;t=PEND.vuoan({a:key(v),why:"bị vu dùng bùa ngải"});out.maidYes=st(find(t.o,/làm chứng/));out.tyYes=st(find(t.o,/Thái y nghiệm/));out.evYes=st(find(t.o,/Trình chứng cứ/));
   const inv0=S.inv;S.inv=[];let rx=toilRxOpts({host:v,n:1,name:v.name});out.give=st(find(rx,/^Tặng lại: |^Tặng lại bằng/));out.giveName=find(rx,/^Tặng lại: |^Tặng lại bằng/).n;S.inv=[];{const c=toilGiveCost();for(const k of Object.keys(IT)){S.inv=[{k}];if(toilGiveItem(c))break;S.inv=[]}}out.giveYes=st(find(toilRxOpts({host:v,n:1,name:v.name}),/^Tặng lại: /));out.giveN=rx.filter(c=>/^Tặng lại/.test(c.n)).map(c=>c.n);
   const pl={a:v.id,t:"me",m:"poison",r:"tyv",dig:0,wt:0,pend:1,g:0};v.ev=0;let o=optsSeen70(pl);out.accNo=st(find(o,/^Tố giác/));
   v.ev=accNeed(v);o=optsSeen70(pl);out.accYes=st(find(o,/^Tố giác/));
   /* render one greyed evidence option through the real dialog */
   v.ev=0;Q.length=0;document.getElementById('modal').hidden=true;t=PEND.vuoan({a:key(v),why:"bị vu dùng bùa ngải"});Q.push({t:"Bị vu oan",h:"<p>thử</p>",opts:t.o});showModal();await new Promise(r=>setTimeout(r,700));
   const b=[...document.querySelectorAll("#modal .opt")].find(x=>/Trình chứng cứ/.test(x.textContent));out.dom=b?{dis:b.disabled,kneed:!!b.dataset.kneed,txt:b.textContent.replace(/\s+/g," ").slice(0,160)}:null;if(b)b.click();out.clicked=!!(b&&!document.getElementById('modal').hidden);return out});
  await p.screenshot({path:`${DIR}/g2-${sz}.png`});
  const ck=(x,re)=>x&&x.off&&re.test(x.why||"");
  const ok2=!r2.err&&ck(r2.antNo,/thiếu thuốc giải/)&&r2.antYes&&!r2.antYes.off&&ck(r2.maidNo,/lòng .* chưa tới/)&&ck(r2.tyNo,/thiếu thái y/)&&ck(r2.evNo,/thiếu chứng cứ/)&&r2.maidYes&&!r2.maidYes.off&&r2.tyYes&&!r2.tyYes.off&&r2.evYes&&!r2.evYes.off&&r2.give&&r2.give.off&&/thiếu món đồ/.test(r2.give.why)&&r2.giveYes&&!r2.giveYes.off&&ck(r2.accNo,/thiếu chứng cứ/)&&r2.accYes&&!r2.accYes.off&&r2.dom&&r2.dom.dis&&r2.dom.kneed&&r2.clicked&&errs.length===0;
  console.log(sz,ok2?'PASS2':'FAIL2',JSON.stringify(r2));if(!ok2)bad++;
  const ok=r.dis&&r.grey&&/thiếu 37 bạc/.test(r.txt)&&/mở lại khi đủ bạc/.test(r.txt)&&!r.took&&errs.length===0;
  console.log(sz,ok?'PASS':'FAIL',JSON.stringify(r),errs.join('|'));if(!ok)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
